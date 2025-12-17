import React from 'react';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import styles from './index.module.css';

function HomepageHeader() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <header className={styles.heroBanner}>
      <div className="container">
        <div className={styles.heroContent}>
          <div className={styles.heroLeft}>
            <div className={styles.badge}>
              🤖 Advanced Robotics Education
            </div>
            <h1 className={styles.heroTitle}>
              Physical AI &<br/>
              Humanoid Robotics
            </h1>
            <p className={styles.heroSubtitle}>
              From Digital Intelligence to Embodied Action
            </p>
            <p className={styles.heroDescription}>
              Master the complete stack: ROS 2, Digital Twins, NVIDIA Isaac, and Vision-Language-Action systems.
              Build autonomous humanoid robots that perceive, reason, and act in the physical world.
            </p>
            <div className={styles.buttons}>
              <Link
                className="button button--primary button--lg"
                to="/docs/intro/what-is-physical-ai">
                Start Learning →
              </Link>
              <Link
                className="button button--outline button--secondary button--lg"
                to="https://github.com/yourusername/Physical-AI-Humanoid-Robotics">
                GitHub
              </Link>
            </div>
          </div>
          <div className={styles.heroRight}>
            <div className={styles.heroImageContainer}>
              <svg viewBox="0 0 400 400" className={styles.heroImage}>
                <defs>
                  <linearGradient id="robotGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" style={{stopColor: '#00D4FF', stopOpacity: 1}} />
                    <stop offset="100%" style={{stopColor: '#9D4EDD', stopOpacity: 1}} />
                  </linearGradient>
                  <linearGradient id="glowGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" style={{stopColor: '#00D4FF', stopOpacity: 0.8}} />
                    <stop offset="100%" style={{stopColor: '#C77DFF', stopOpacity: 0.8}} />
                  </linearGradient>
                  <filter id="glow">
                    <feGaussianBlur stdDeviation="6" result="coloredBlur"/>
                    <feMerge>
                      <feMergeNode in="coloredBlur"/>
                      <feMergeNode in="SourceGraphic"/>
                    </feMerge>
                  </filter>
                  <filter id="strongGlow">
                    <feGaussianBlur stdDeviation="10" result="coloredBlur"/>
                    <feMerge>
                      <feMergeNode in="coloredBlur"/>
                      <feMergeNode in="SourceGraphic"/>
                    </feMerge>
                  </filter>
                </defs>

                {/* Background circles */}
                <circle cx="200" cy="200" r="180" fill="none" stroke="url(#robotGrad)" strokeWidth="1" opacity="0.2"/>
                <circle cx="200" cy="200" r="150" fill="none" stroke="url(#robotGrad)" strokeWidth="1" opacity="0.3"/>

                {/* Humanoid Robot */}
                <g id="humanoid-robot">
                  {/* Head with visor */}
                  <rect x="170" y="50" width="60" height="70" rx="12" fill="url(#robotGrad)" filter="url(#glow)" opacity="0.9"/>

                  {/* Visor/Eyes */}
                  <rect x="175" y="70" width="50" height="20" rx="10" fill="#00D4FF" filter="url(#strongGlow)" opacity="0.9"/>
                  <circle cx="190" cy="80" r="4" fill="#ffffff" opacity="0.9"/>
                  <circle cx="210" cy="80" r="4" fill="#ffffff" opacity="0.9"/>

                  {/* Antenna */}
                  <line x1="200" y1="50" x2="200" y2="30" stroke="url(#robotGrad)" strokeWidth="3" strokeLinecap="round"/>
                  <circle cx="200" cy="25" r="5" fill="#00D4FF" filter="url(#glow)"/>

                  {/* Neck */}
                  <rect x="190" y="120" width="20" height="15" rx="3" fill="url(#robotGrad)" opacity="0.8"/>

                  {/* Torso/Chest */}
                  <rect x="160" y="135" width="80" height="100" rx="15" fill="url(#robotGrad)" filter="url(#glow)" opacity="0.85"/>

                  {/* Chest core (arc reactor style) */}
                  <circle cx="200" cy="175" r="18" fill="none" stroke="#00D4FF" strokeWidth="3" filter="url(#strongGlow)"/>
                  <circle cx="200" cy="175" r="12" fill="#00D4FF" opacity="0.3"/>
                  <circle cx="200" cy="175" r="6" fill="#00D4FF" filter="url(#glow)"/>

                  {/* Shoulders */}
                  <circle cx="155" cy="145" r="15" fill="url(#robotGrad)" opacity="0.9"/>
                  <circle cx="245" cy="145" r="15" fill="url(#robotGrad)" opacity="0.9"/>

                  {/* Arms */}
                  <rect x="120" y="145" width="30" height="90" rx="15" fill="url(#robotGrad)" filter="url(#glow)" opacity="0.8"/>
                  <rect x="250" y="145" width="30" height="90" rx="15" fill="url(#robotGrad)" filter="url(#glow)" opacity="0.8"/>

                  {/* Elbow joints */}
                  <circle cx="135" cy="190" r="8" fill="#9D4EDD" filter="url(#glow)"/>
                  <circle cx="265" cy="190" r="8" fill="#9D4EDD" filter="url(#glow)"/>

                  {/* Forearms */}
                  <rect x="118" y="195" width="34" height="70" rx="17" fill="url(#robotGrad)" opacity="0.85"/>
                  <rect x="248" y="195" width="34" height="70" rx="17" fill="url(#robotGrad)" opacity="0.85"/>

                  {/* Hands */}
                  <ellipse cx="135" cy="280" rx="18" ry="22" fill="url(#robotGrad)" filter="url(#glow)" opacity="0.9"/>
                  <ellipse cx="265" cy="280" rx="18" ry="22" fill="url(#robotGrad)" filter="url(#glow)" opacity="0.9"/>

                  {/* Pelvis/Hip */}
                  <rect x="175" y="235" width="50" height="30" rx="8" fill="url(#robotGrad)" opacity="0.85"/>

                  {/* Thighs */}
                  <rect x="170" y="265" width="28" height="70" rx="14" fill="url(#robotGrad)" filter="url(#glow)" opacity="0.85"/>
                  <rect x="202" y="265" width="28" height="70" rx="14" fill="url(#robotGrad)" filter="url(#glow)" opacity="0.85"/>

                  {/* Knee joints */}
                  <circle cx="184" cy="315" r="8" fill="#C77DFF" filter="url(#glow)"/>
                  <circle cx="216" cy="315" r="8" fill="#C77DFF" filter="url(#glow)"/>

                  {/* Lower legs */}
                  <rect x="168" y="320" width="32" height="60" rx="16" fill="url(#robotGrad)" opacity="0.9"/>
                  <rect x="200" y="320" width="32" height="60" rx="16" fill="url(#robotGrad)" opacity="0.9"/>

                  {/* Feet */}
                  <ellipse cx="184" cy="385" rx="20" ry="12" fill="url(#robotGrad)" filter="url(#glow)"/>
                  <ellipse cx="216" cy="385" rx="20" ry="12" fill="url(#robotGrad)" filter="url(#glow)"/>
                </g>

                {/* Circuit/Neural network background */}
                <g opacity="0.4">
                  {/* Left side circuits */}
                  <line x1="60" y1="100" x2="110" y2="150" stroke="#00D4FF" strokeWidth="2"/>
                  <circle cx="60" cy="100" r="6" fill="#00D4FF" filter="url(#glow)"/>
                  <line x1="80" y1="250" x2="110" y2="280" stroke="#9D4EDD" strokeWidth="2"/>
                  <circle cx="80" cy="250" r="6" fill="#9D4EDD" filter="url(#glow)"/>

                  {/* Right side circuits */}
                  <line x1="340" y1="100" x2="290" y2="150" stroke="#00D4FF" strokeWidth="2"/>
                  <circle cx="340" cy="100" r="6" fill="#00D4FF" filter="url(#glow)"/>
                  <line x1="320" y1="250" x2="290" y2="280" stroke="#9D4EDD" strokeWidth="2"/>
                  <circle cx="320" cy="250" r="6" fill="#9D4EDD" filter="url(#glow)"/>

                  {/* Hexagons */}
                  <polygon points="200,20 220,30 220,50 200,60 180,50 180,30" fill="none" stroke="#00D4FF" strokeWidth="1.5"/>
                  <polygon points="80,350 100,360 100,380 80,390 60,380 60,360" fill="none" stroke="#9D4EDD" strokeWidth="1.5"/>
                  <polygon points="320,350 340,360 340,380 320,390 300,380 300,360" fill="none" stroke="#C77DFF" strokeWidth="1.5"/>
                </g>

                {/* Data streams */}
                <g opacity="0.3">
                  <circle cx="50" cy="180" r="3" fill="#00D4FF"/>
                  <circle cx="350" cy="180" r="3" fill="#9D4EDD"/>
                  <circle cx="200" cy="400" r="3" fill="#C77DFF"/>
                </g>
              </svg>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

function FeatureCard({icon, title, description}) {
  return (
    <div className={styles.featureCard}>
      <div className={styles.featureIcon}>{icon}</div>
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  );
}

export default function Home() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout
      title={`${siteConfig.title}`}
      description="Master Physical AI and Humanoid Robotics with ROS 2, NVIDIA Isaac, and VLA systems">
      <HomepageHeader />

      <main className={styles.mainContent}>
        {/* What You'll Master */}
        <section className={styles.featuresSection}>
          <div className="container">
            <h2 className={styles.sectionTitle}>What You'll Master</h2>
            <div className={styles.featuresGrid}>
              <FeatureCard
                icon="🤖"
                title="ROS 2 Fundamentals"
                description="Master nodes, topics, services, actions, and URDF modeling. Build the robotic nervous system."
              />
              <FeatureCard
                icon="🌐"
                title="Digital Twins"
                description="Create physics-accurate simulations in Gazebo and Unity. Test before deploying to hardware."
              />
              <FeatureCard
                icon="🧠"
                title="NVIDIA Isaac"
                description="GPU-accelerated perception with Isaac ROS. Real-time SLAM, object detection, and Nav2 planning."
              />
              <FeatureCard
                icon="🎯"
                title="Vision-Language-Action"
                description="Integrate Whisper and GPT-4. Build voice-commanded autonomous systems that understand language."
              />
            </div>
          </div>
        </section>

        {/* Tech Stack */}
        <section className={styles.techSection}>
          <div className="container">
            <h2 className={styles.sectionTitle}>The Complete Technology Stack</h2>
            <div className={styles.techStack}>
              <div className={styles.techLayer}>
                <div className={styles.techBadge}>Module 4</div>
                <h4>Vision-Language-Action (Whisper + LLM)</h4>
              </div>
              <div className={styles.techLayer}>
                <div className={styles.techBadge}>Module 3</div>
                <h4>Isaac ROS (Perception) + Nav2 (Planning)</h4>
              </div>
              <div className={styles.techLayer}>
                <div className={styles.techBadge}>Module 2</div>
                <h4>Digital Twins (Gazebo, Unity, Isaac Sim)</h4>
              </div>
              <div className={styles.techLayer}>
                <div className={styles.techBadge}>Module 1</div>
                <h4>ROS 2 Middleware (Topics, Services, Actions)</h4>
              </div>
              <div className={styles.techLayer}>
                <div className={styles.techBadge}>Foundations</div>
                <h4>Sensors, Actuators, Hardware</h4>
              </div>
            </div>
          </div>
        </section>

        {/* Bonus Features */}
        <section className={styles.bonusSection}>
          <div className="container">
            <div className={styles.bonusBox}>
              <h2>📚 Comprehensive Learning Resources</h2>
              <div className={styles.bonusGrid}>
                <div className={styles.bonusCard}>
                  <h4>26 Detailed Chapters</h4>
                  <p>Progressive learning from basics to advanced topics</p>
                </div>
                <div className={styles.bonusCard}>
                  <h4>Hands-On Code Examples</h4>
                  <p>Copy-paste ready Python, C++, and YAML code</p>
                </div>
                <div className={styles.bonusCard}>
                  <h4>Complete Capstone Project</h4>
                  <p>Build a voice-commanded fetch-and-deliver robot</p>
                </div>
                <div className={styles.bonusCard}>
                  <h4>Production-Ready Patterns</h4>
                  <p>Best practices for real-world deployment</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className={styles.ctaSection}>
          <div className="container">
            <h2 className={styles.ctaTitle}>Ready to Build the Future of Robotics?</h2>
            <p className={styles.ctaDescription}>
              Start your journey from foundational concepts to building autonomous humanoid systems
            </p>
            <Link
              className="button button--primary button--lg"
              to="/docs/intro/what-is-physical-ai">
              Begin Learning Now →
            </Link>
          </div>
        </section>
      </main>
    </Layout>
  );
}
