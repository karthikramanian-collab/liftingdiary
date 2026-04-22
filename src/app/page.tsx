import { HeroCTAs, BannerCTA } from './_components/PageCTAs';

const features = [
  {
    number: '01',
    title: 'LOG EVERY SESSION',
    body: 'Capture sets, reps, weight, and RPE the moment you finish. No memory, no guessing — raw data from every lift.',
  },
  {
    number: '02',
    title: 'TRACK YOUR PROGRESS',
    body: 'Visualize PRs, volume trends, and strength curves over time. See exactly where you are and how far you\'ve come.',
  },
  {
    number: '03',
    title: 'REVIEW & ADJUST',
    body: 'Your diary becomes your coach. Spot patterns, catch plateaus early, and make data-driven programming decisions.',
  },
];

export default function Home() {
  return (
    <main style={{ paddingTop: '64px', minHeight: '100vh' }}>

      {/* ── Hero ── */}
      <section
        style={{
          position: 'relative',
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '100px 24px 80px',
          overflow: 'hidden',
        }}
      >
        {/* Background numeral */}
        <div
          aria-hidden
          style={{
            position: 'absolute',
            right: '-20px',
            top: '20px',
            fontFamily: 'var(--font-bebas), sans-serif',
            fontSize: 'clamp(200px, 28vw, 380px)',
            lineHeight: 1,
            color: 'var(--bg-surface)',
            userSelect: 'none',
            pointerEvents: 'none',
            letterSpacing: '-0.04em',
          }}
        >
          RX
        </div>

        {/* Accent line */}
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '10px',
            marginBottom: '28px',
          }}
        >
          <div style={{ width: '28px', height: '2px', background: 'var(--accent)' }} />
          <span
            style={{
              fontFamily: 'var(--font-dm-sans), sans-serif',
              fontSize: '11px',
              fontWeight: 600,
              letterSpacing: '0.2em',
              color: 'var(--accent)',
              textTransform: 'uppercase',
            }}
          >
            Training Log
          </span>
        </div>

        {/* Main headline */}
        <h1
          style={{
            fontFamily: 'var(--font-bebas), sans-serif',
            fontSize: 'clamp(72px, 11vw, 148px)',
            lineHeight: 0.92,
            letterSpacing: '-0.01em',
            color: 'var(--text-primary)',
            margin: 0,
            marginBottom: '8px',
            position: 'relative',
            zIndex: 1,
          }}
        >
          EVERY REP
        </h1>
        <h1
          style={{
            fontFamily: 'var(--font-bebas), sans-serif',
            fontSize: 'clamp(72px, 11vw, 148px)',
            lineHeight: 0.92,
            letterSpacing: '-0.01em',
            margin: 0,
            marginBottom: '40px',
            position: 'relative',
            zIndex: 1,
          }}
        >
          <span style={{ color: 'var(--accent)' }}>REMEMBERED</span>
        </h1>

        {/* Sub-copy + CTA row */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'flex-end',
            gap: '40px',
            position: 'relative',
            zIndex: 1,
          }}
        >
          <p
            style={{
              fontFamily: 'var(--font-dm-sans), sans-serif',
              fontSize: '17px',
              lineHeight: 1.65,
              color: 'var(--text-secondary)',
              maxWidth: '400px',
              margin: 0,
            }}
          >
            The diary built for serious lifters. Log workouts, track progressive overload, and build the evidence of your effort — one session at a time.
          </p>

          <HeroCTAs />
        </div>

        {/* Stats bar */}
        <div
          style={{
            display: 'flex',
            gap: '0',
            marginTop: '80px',
            borderTop: '1px solid var(--border)',
            borderBottom: '1px solid var(--border)',
            position: 'relative',
            zIndex: 1,
          }}
        >
          {[
            { value: 'Unlimited', label: 'Workouts' },
            { value: 'Every', label: 'Set & Rep' },
            { value: 'Your', label: 'Data Forever' },
          ].map((stat, i) => (
            <div
              key={i}
              style={{
                flex: 1,
                padding: '24px 0',
                paddingLeft: i === 0 ? 0 : '32px',
                borderLeft: i > 0 ? '1px solid var(--border)' : 'none',
                marginLeft: i > 0 ? '32px' : 0,
              }}
            >
              <div
                style={{
                  fontFamily: 'var(--font-bebas), sans-serif',
                  fontSize: '28px',
                  letterSpacing: '0.04em',
                  color: 'var(--accent)',
                  lineHeight: 1,
                }}
              >
                {stat.value}
              </div>
              <div
                style={{
                  fontFamily: 'var(--font-dm-sans), sans-serif',
                  fontSize: '12px',
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  color: 'var(--text-muted)',
                  marginTop: '4px',
                }}
              >
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Features ── */}
      <section
        style={{
          borderTop: '1px solid var(--border-subtle)',
          background: 'var(--bg-surface)',
          padding: '80px 24px',
        }}
      >
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>

          {/* Section label */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              marginBottom: '48px',
            }}
          >
            <div style={{ width: '28px', height: '2px', background: 'var(--accent)' }} />
            <span
              style={{
                fontFamily: 'var(--font-dm-sans), sans-serif',
                fontSize: '11px',
                fontWeight: 600,
                letterSpacing: '0.2em',
                color: 'var(--text-muted)',
                textTransform: 'uppercase',
              }}
            >
              Why LiftingDiary
            </span>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '1px',
              background: 'var(--border)',
              border: '1px solid var(--border)',
              borderRadius: '6px',
              overflow: 'hidden',
            }}
          >
            {features.map((f) => (
              <div
                key={f.number}
                className="feature-card"
                style={{ padding: '40px 32px' }}
              >
                <div
                  style={{
                    fontFamily: 'var(--font-bebas), sans-serif',
                    fontSize: '13px',
                    letterSpacing: '0.2em',
                    color: 'var(--accent)',
                    marginBottom: '20px',
                  }}
                >
                  {f.number}
                </div>
                <h3
                  style={{
                    fontFamily: 'var(--font-bebas), sans-serif',
                    fontSize: '28px',
                    letterSpacing: '0.06em',
                    color: 'var(--text-primary)',
                    margin: '0 0 14px',
                    lineHeight: 1.1,
                  }}
                >
                  {f.title}
                </h3>
                <p
                  style={{
                    fontFamily: 'var(--font-dm-sans), sans-serif',
                    fontSize: '14px',
                    lineHeight: 1.7,
                    color: 'var(--text-secondary)',
                    margin: 0,
                  }}
                >
                  {f.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA Banner ── */}
      <section
        style={{
          padding: '80px 24px',
          borderTop: '1px solid var(--border-subtle)',
        }}
      >
        <div
          style={{
            maxWidth: '1200px',
            margin: '0 auto',
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '32px',
          }}
        >
          <h2
            style={{
              fontFamily: 'var(--font-bebas), sans-serif',
              fontSize: 'clamp(40px, 6vw, 72px)',
              letterSpacing: '0.02em',
              lineHeight: 1,
              margin: 0,
              color: 'var(--text-primary)',
            }}
          >
            READY TO{' '}
            <span style={{ color: 'var(--accent)' }}>FORGE</span>
            <br />
            YOUR LEGACY?
          </h2>
          <BannerCTA />
        </div>
      </section>

      {/* ── Footer ── */}
      <footer
        style={{
          borderTop: '1px solid var(--border)',
          padding: '24px',
          textAlign: 'center',
        }}
      >
        <span
          style={{
            fontFamily: 'var(--font-dm-sans), sans-serif',
            fontSize: '12px',
            letterSpacing: '0.06em',
            color: 'var(--text-muted)',
          }}
        >
          © {new Date().getFullYear()} LiftingDiary — Built for lifters, by lifters.
        </span>
      </footer>

    </main>
  );
}
