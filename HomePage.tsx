import { useEffect, useRef } from 'react';
import { ButtonLink } from '../components/Buttons';
import { FallbackNotice, LoadingState } from '../components/LoadingState';
import { SectionHeader } from '../components/SectionHeader';
import { useAsyncResource } from '../hooks/useAsyncResource';
import { usePageMetadata } from '../hooks/usePageMetadata';
import { getHomeContent } from '../services/contentService';

export function HomePage() {
  const { data: result, loading } = useAsyncResource(getHomeContent);
  const heroRef = useRef<HTMLElement>(null);
  const orbitRef = useRef<HTMLDivElement>(null);

  usePageMetadata(
    'IndraAstra | AI Research & Innovation',
    'IndraAstra focuses on AI performance engineering and next-generation LLM architecture.',
  );

  useEffect(() => {
    const hero = heroRef.current;
    const orbit = orbitRef.current;
    if (!hero || !orbit) return;

    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 20;
      const y = (e.clientY / window.innerHeight - 0.5) * 20;
      orbit.style.transform = `translate(${x}px, ${y}px)`;
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  if (loading || !result) {
    return (
      <div className="page-loading container">
        <LoadingState label="Preparing the IndraAstra overview" />
      </div>
    );
  }

  const content = result.data;

  return (
    <>
      {/* Hero Section */}
      <section className="hero" id="home" aria-labelledby="home-title" ref={heroRef}>
        <div className="orbit" ref={orbitRef} aria-hidden="true" />
        <div className="container hero-content">
          <div className="eyebrow">
            <span className="status-dot" aria-hidden="true" />
            <span>{content.eyebrow}</span>
          </div>

          <h1 id="home-title">
            Enterprise-grade AI at the
            <br />
            <span className="gradient-text">cost of a database.</span>
          </h1>

          <p className="hero-lead">{content.heroLead}</p>

          <div className="hero-buttons">
            <ButtonLink to="/#delivery">Explore our research</ButtonLink>
            <ButtonLink to="/team" variant="secondary">
              Meet our team
            </ButtonLink>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="about" id="about">
        <div className="container about-grid">
          <div>
            <div className="section-header">
              <div className="section-label">01 / Who we are</div>
              <h2>{content.aboutTitle}</h2>
            </div>
            <div className="about-text">
              <p>{content.aboutBody}</p>
              <p>
                Alongside fundamental research into brain-inspired intelligence, we translate novel algorithms
                into measurable performance gains for production AI deployments.
              </p>
            </div>
          </div>

          <div className="about-card">
            <h3>Intelligence, engineered differently.</h3>
            <p>
              Today's AI systems require massive compute infrastructure. IndraAstra builds alternative
              computational paradigms to deliver dramatic efficiency gains and database-like scaling economics
              without sacrificing capability.
            </p>
          </div>
        </div>
      </section>

      {/* What We Deliver - AI Performance Engineering */}
      <section className="section" id="delivery" aria-labelledby="delivery-title">
        <div className="container">
          <SectionHeader
            eyebrow="02 / What we deliver"
            title={content.deliveryTitle}
            lead={content.deliveryLead}
          />
          <div className="lever-grid">
            {content.performanceLevers.map((lever, index) => (
              <article className="lever-card" key={lever.title}>
                <div className="research-number">0{index + 1} / {lever.title.toUpperCase()}</div>
                <h3>{lever.title}</h3>
                <p>{lever.description}</p>
                <span className="lever-card__line" aria-hidden="true" />
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Approach / Engagement Model */}
      <section className="approach section" id="approach">
        <div className="container">
          <SectionHeader
            eyebrow="03 / How we engage"
            title={content.engagementTitle}
            lead="A disciplined methodology for evaluating and deploying high-performance AI optimizations."
          />
          <div className="approach-grid">
            {content.engagementSteps.map((step, index) => (
              <div className="approach-item" key={step.title}>
                <span>0{index + 1}</span>
                <h3>{step.title}</h3>
                <p>{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What We Are Building - Next-Gen LLM Architecture */}
      <section className="section vision-section" id="vision" aria-labelledby="vision-title">
        <div className="container">
          <SectionHeader
            eyebrow={content.visionEyebrow || 'What we are building'}
            title={content.visionTitle}
            lead={content.visionLead}
          />
          <div className="research-grid">
            {content.researchFocuses.map((focus, index) => (
              <article className="research-card" key={focus.title}>
                <div className="research-number">
                  0{index + 1} / {focus.title.toUpperCase()}
                </div>
                <h3>{focus.title}</h3>
                <p>{focus.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action Box */}
      <section className="cta section" id="contact-cta">
        <div className="container">
          <div className="cta-box">
            <h2>{content.ctaTitle}</h2>
            <p>{content.ctaBody}</p>
            <ButtonLink to="/contact">Get in touch</ButtonLink>
          </div>
        </div>
      </section>

      {result.warning && (
        <div className="container">
          <FallbackNotice message={result.warning} />
        </div>
      )}
    </>
  );
}

