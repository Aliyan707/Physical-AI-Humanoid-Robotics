import React, { useState, useEffect, useRef } from 'react';
import { useTextSelection } from '../hooks/useTextSelection';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  mode?: 'book' | 'selected-text';
}

interface BookChatProps {
  chapterId?: string;
  apiBaseUrl?: string;
}

export const BookChat: React.FC<BookChatProps> = ({
  chapterId,
  apiBaseUrl = 'http://localhost:8000',
}) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [mode, setMode] = useState<'book' | 'selected-text'>('book');
  const [isOpen, setIsOpen] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { text: selectedText, hasSelection } = useTextSelection();

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = async () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
      mode,
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: '',
        mode,
      };

      setMessages((prev) => [...prev, assistantMessage]);

      const endpoint =
        mode === 'selected-text' ? '/chat/selected-text' : '/chat/query';

      const body =
        mode === 'selected-text'
          ? {
              question: input,
              selected_text: selectedText,
            }
          : {
              question: input,
              chapter_id: chapterId,
            };

      const response = await fetch(`${apiBaseUrl}${endpoint}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      });

      if (!response.ok) {
        throw new Error('Failed to get response');
      }

      const reader = response.body?.getReader();
      const decoder = new TextDecoder();

      if (!reader) {
        throw new Error('No reader available');
      }

      let accumulatedContent = '';

      while (true) {
        const { done, value } = await reader.read();

        if (done) break;

        const chunk = decoder.decode(value, { stream: true });
        const lines = chunk.split('\n');

        for (const line of lines) {
          if (line.startsWith('data: ')) {
            const data = line.substring(6);
            try {
              const parsed = JSON.parse(data);
              if (parsed.content) {
                accumulatedContent += parsed.content;
                setMessages((prev) => {
                  const newMessages = [...prev];
                  const lastMessage = newMessages[newMessages.length - 1];
                  if (lastMessage.role === 'assistant') {
                    lastMessage.content = accumulatedContent;
                  }
                  return newMessages;
                });
              }
              if (parsed.done) {
                break;
              }
            } catch (e) {
              console.error('Failed to parse SSE data:', e);
            }
          }
        }
      }
    } catch (error) {
      console.error('Error sending message:', error);
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now().toString(),
          role: 'assistant',
          content: 'Sorry, there was an error processing your request.',
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const toggleMode = () => {
    if (mode === 'book') {
      if (hasSelection) {
        setMode('selected-text');
      } else {
        alert('Please select some text first to use selected-text mode.');
      }
    } else {
      setMode('book');
    }
  };

  // Show popup button when chat is closed
  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        style={{
          position: 'fixed',
          bottom: '20px',
          right: '20px',
          width: '60px',
          height: '60px',
          borderRadius: '50%',
          background: 'linear-gradient(135deg, #00D4FF 0%, #9D4EDD 100%)',
          color: '#fff',
          border: 'none',
          fontSize: '28px',
          cursor: 'pointer',
          boxShadow: '0 8px 32px rgba(0, 212, 255, 0.4)',
          zIndex: 1000,
          transition: 'all 0.3s ease',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'scale(1.1)';
          e.currentTarget.style.boxShadow = '0 12px 40px rgba(0, 212, 255, 0.6)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'scale(1)';
          e.currentTarget.style.boxShadow = '0 8px 32px rgba(0, 212, 255, 0.4)';
        }}
        title="Open Book Assistant"
      >
        🤖
      </button>
    );
  }

  return (
    <div
      style={{
        position: 'fixed',
        bottom: '20px',
        right: '20px',
        width: '420px',
        height: '650px',
        border: '1px solid rgba(0, 212, 255, 0.3)',
        borderRadius: '20px',
        background: 'rgba(10, 10, 15, 0.95)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.5), 0 0 60px rgba(0, 212, 255, 0.2)',
        display: 'flex',
        flexDirection: 'column',
        zIndex: 1000,
      }}
    >
      {/* Header */}
      <div
        style={{
          padding: '18px 20px',
          borderBottom: '1px solid rgba(0, 212, 255, 0.2)',
          background: 'linear-gradient(135deg, #00D4FF 0%, #9D4EDD 100%)',
          color: '#fff',
          borderTopLeftRadius: '20px',
          borderTopRightRadius: '20px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          boxShadow: '0 4px 20px rgba(0, 212, 255, 0.3)',
        }}
      >
        <h3 style={{ margin: 0, fontSize: '17px', fontWeight: 700, letterSpacing: '0.5px' }}>
          🤖 AI Book Assistant
        </h3>
        <button
          onClick={() => setIsOpen(false)}
          style={{
            background: 'rgba(255, 255, 255, 0.2)',
            border: '1px solid rgba(255, 255, 255, 0.3)',
            borderRadius: '8px',
            color: '#fff',
            fontSize: '20px',
            cursor: 'pointer',
            padding: '4px',
            width: '32px',
            height: '32px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'all 0.2s ease',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = 'rgba(255, 255, 255, 0.3)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'rgba(255, 255, 255, 0.2)';
          }}
          title="Close"
        >
          ✕
        </button>
      </div>

      {/* Mode Toggle */}
      <div
        style={{
          padding: '14px 18px',
          background: 'rgba(16, 16, 26, 0.7)',
          borderBottom: '1px solid rgba(0, 212, 255, 0.15)',
        }}
      >
        <div style={{ display: 'flex', gap: '10px' }}>
          <button
            onClick={toggleMode}
            style={{
              padding: '8px 16px',
              fontSize: '13px',
              fontWeight: 600,
              border: mode === 'book' ? '1px solid #00D4FF' : '1px solid rgba(255, 255, 255, 0.1)',
              borderRadius: '8px',
              background: mode === 'book' ? 'linear-gradient(135deg, #00D4FF 0%, #9D4EDD 100%)' : 'rgba(255, 255, 255, 0.05)',
              color: mode === 'book' ? '#fff' : 'rgba(255, 255, 255, 0.7)',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              boxShadow: mode === 'book' ? '0 4px 15px rgba(0, 212, 255, 0.4)' : 'none',
            }}
          >
            📚 Full Book
          </button>
          <button
            onClick={toggleMode}
            style={{
              padding: '8px 16px',
              fontSize: '13px',
              fontWeight: 600,
              border: mode === 'selected-text' ? '1px solid #00D4FF' : '1px solid rgba(255, 255, 255, 0.1)',
              borderRadius: '8px',
              background: mode === 'selected-text' ? 'linear-gradient(135deg, #00D4FF 0%, #9D4EDD 100%)' : 'rgba(255, 255, 255, 0.05)',
              color: mode === 'selected-text' ? '#fff' : 'rgba(255, 255, 255, 0.7)',
              cursor: 'pointer',
              opacity: hasSelection ? 1 : 0.5,
              transition: 'all 0.3s ease',
              boxShadow: mode === 'selected-text' ? '0 4px 15px rgba(0, 212, 255, 0.4)' : 'none',
            }}
            disabled={!hasSelection && mode === 'book'}
          >
            📝 Selected Text
          </button>
        </div>
        {mode === 'selected-text' && hasSelection && (
          <div
            style={{
              marginTop: '10px',
              padding: '10px 12px',
              background: 'rgba(0, 212, 255, 0.1)',
              border: '1px solid rgba(0, 212, 255, 0.3)',
              borderRadius: '8px',
              fontSize: '12px',
              color: '#00D4FF',
              fontWeight: 500,
            }}
          >
            ✓ Text selected ({selectedText.length} chars)
          </div>
        )}
      </div>

      {/* Messages */}
      <div
        style={{
          flex: 1,
          overflowY: 'auto',
          padding: '20px',
          display: 'flex',
          flexDirection: 'column',
          gap: '16px',
          background: 'rgba(10, 10, 15, 0.5)',
        }}
      >
        {messages.length === 0 && (
          <div
            style={{
              textAlign: 'center',
              color: 'rgba(255, 255, 255, 0.6)',
              marginTop: '40px',
              fontSize: '14px',
            }}
          >
            <div style={{ fontSize: '48px', marginBottom: '16px' }}>🤖</div>
            <p style={{ fontSize: '16px', fontWeight: 600, color: '#00D4FF', marginBottom: '8px' }}>
              Salam! Ask me anything about the book!
            </p>
            <p style={{ fontSize: '13px', marginTop: '8px', color: 'rgba(255, 255, 255, 0.5)' }}>
              Main aapko Hinglish mein answers dunga, pure book ke context se.
            </p>
            <p style={{ fontSize: '12px', marginTop: '12px', color: 'rgba(255, 255, 255, 0.4)' }}>
              Switch to "Selected Text" mode to ask about specific sections.
            </p>
          </div>
        )}

        {messages.map((msg) => (
          <div
            key={msg.id}
            style={{
              alignSelf: msg.role === 'user' ? 'flex-end' : 'flex-start',
              maxWidth: '85%',
            }}
          >
            <div
              style={{
                padding: '12px 16px',
                borderRadius: '16px',
                background: msg.role === 'user'
                  ? 'linear-gradient(135deg, #00D4FF 0%, #9D4EDD 100%)'
                  : 'rgba(255, 255, 255, 0.08)',
                border: msg.role === 'user'
                  ? 'none'
                  : '1px solid rgba(0, 212, 255, 0.2)',
                color: '#fff',
                fontSize: '14px',
                lineHeight: '1.6',
                boxShadow: msg.role === 'user'
                  ? '0 4px 15px rgba(0, 212, 255, 0.3)'
                  : '0 2px 10px rgba(0, 0, 0, 0.2)',
              }}
            >
              {msg.content}
            </div>
            {msg.mode && (
              <div
                style={{
                  fontSize: '11px',
                  color: 'rgba(255, 255, 255, 0.4)',
                  marginTop: '6px',
                  textAlign: msg.role === 'user' ? 'right' : 'left',
                  fontWeight: 500,
                }}
              >
                {msg.mode === 'selected-text' ? '📝 Selected' : '📚 Book'}
              </div>
            )}
          </div>
        ))}

        {isLoading && (
          <div
            style={{
              alignSelf: 'flex-start',
              padding: '12px 16px',
              borderRadius: '16px',
              background: 'rgba(255, 255, 255, 0.08)',
              border: '1px solid rgba(0, 212, 255, 0.2)',
              color: 'rgba(255, 255, 255, 0.7)',
              fontSize: '14px',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
            }}
          >
            <span style={{
              display: 'inline-block',
              animation: 'pulse 1.5s ease-in-out infinite',
            }}>💭</span>
            Thinking...
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div
        style={{
          padding: '18px 20px',
          borderTop: '1px solid rgba(0, 212, 255, 0.2)',
          background: 'rgba(16, 16, 26, 0.8)',
          borderBottomLeftRadius: '20px',
          borderBottomRightRadius: '20px',
        }}
      >
        <div style={{ display: 'flex', gap: '12px' }}>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder={
              mode === 'selected-text'
                ? 'Ask about selected text...'
                : 'Apna sawal poochein...'
            }
            style={{
              flex: 1,
              padding: '12px 14px',
              border: '1px solid rgba(0, 212, 255, 0.3)',
              borderRadius: '12px',
              fontSize: '14px',
              resize: 'none',
              minHeight: '60px',
              fontFamily: 'inherit',
              background: 'rgba(255, 255, 255, 0.05)',
              color: '#fff',
              transition: 'all 0.3s ease',
            }}
            onFocus={(e) => {
              e.currentTarget.style.border = '1px solid #00D4FF';
              e.currentTarget.style.boxShadow = '0 0 20px rgba(0, 212, 255, 0.3)';
            }}
            onBlur={(e) => {
              e.currentTarget.style.border = '1px solid rgba(0, 212, 255, 0.3)';
              e.currentTarget.style.boxShadow = 'none';
            }}
            disabled={isLoading}
          />
          <button
            onClick={handleSendMessage}
            disabled={isLoading || !input.trim()}
            style={{
              padding: '12px 24px',
              background: isLoading || !input.trim()
                ? 'rgba(255, 255, 255, 0.1)'
                : 'linear-gradient(135deg, #00D4FF 0%, #9D4EDD 100%)',
              color: '#fff',
              border: 'none',
              borderRadius: '12px',
              cursor: isLoading || !input.trim() ? 'not-allowed' : 'pointer',
              fontSize: '14px',
              fontWeight: 700,
              opacity: isLoading || !input.trim() ? 0.5 : 1,
              transition: 'all 0.3s ease',
              boxShadow: isLoading || !input.trim()
                ? 'none'
                : '0 4px 20px rgba(0, 212, 255, 0.4)',
            }}
            onMouseEnter={(e) => {
              if (!isLoading && input.trim()) {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 6px 25px rgba(0, 212, 255, 0.5)';
              }
            }}
            onMouseLeave={(e) => {
              if (!isLoading && input.trim()) {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 4px 20px rgba(0, 212, 255, 0.4)';
              }
            }}
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookChat;
