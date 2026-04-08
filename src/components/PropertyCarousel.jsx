import React, { useRef, useEffect, useState } from 'react';

const videos = [
  {
    src: new URL('../assets/images/Dholera2.mp4', import.meta.url).href,
    caption: "Dholera — Where India's Future Is Taking Shape!",
    tags: '#Dholera #FutureReady #Infrastructure',
  },
  {
    src: new URL('../assets/images/dholera3.mp4', import.meta.url).href,
    caption: 'Dholera — Where growth meets opportunity',
    tags: '#Dholera #Growth #Investment',
  },
  {
    src: new URL('../assets/images/Looking to buy your dream homeDiscover spacious and intelligently planned 3+1 BHK residences des.mp4', import.meta.url).href,
    caption: 'Discover spacious and intelligently planned 3+1 BHK residences',
    tags: '#DreamHome #3BHK #Residences',
  },
];

const VideoCard = ({ video, index }) => {
  const videoRef = useRef(null);
  const cardRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setIsVisible(true), index * 200);
        } else {
          setIsVisible(false); // reset on scroll away so it re-animates
        }
      },
      { threshold: 0.15 }
    );
    observer.observe(card);
    return () => observer.disconnect();
  }, [index]);

  useEffect(() => {
    const el = videoRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.play().catch(() => {});
        } else {
          el.pause();
        }
      },
      { threshold: 0.5 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={cardRef}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0) scale(1)' : 'translateY(60px) scale(0.95)',
        transition: 'opacity 0.7s ease, transform 0.7s cubic-bezier(0.22, 1, 0.36, 1)',
        position: 'relative',
      }}
    >
      {/* Outer glow layer */}
      <div
        style={{
          position: 'absolute',
          inset: '-6px',
          borderRadius: '20px',
          background: 'radial-gradient(ellipse at center, rgba(234,179,8,0.35) 0%, rgba(161,118,0,0.15) 50%, transparent 75%)',
          filter: 'blur(12px)',
          opacity: isVisible ? 1 : 0,
          transition: 'opacity 1s ease',
          pointerEvents: 'none',
          zIndex: 0,
        }}
      />

      {/* Pulsing ring glow */}
      <div
        style={{
          position: 'absolute',
          inset: '-2px',
          borderRadius: '18px',
          background: 'linear-gradient(135deg, rgba(234,179,8,0.4), rgba(180,83,9,0.2), rgba(234,179,8,0.4))',
          opacity: isVisible ? 0.6 : 0,
          transition: 'opacity 1s ease',
          animation: isVisible ? 'pulseGlow 3s ease-in-out infinite' : 'none',
          pointerEvents: 'none',
          zIndex: 0,
        }}
      />

      <style>{`
        @keyframes pulseGlow {
          0%, 100% { opacity: 0.4; filter: blur(4px); }
          50% { opacity: 0.8; filter: blur(8px); }
        }
      `}</style>

      {/* Card body */}
      <div
        style={{
          position: 'relative',
          zIndex: 1,
          backgroundColor: '#000',
          borderRadius: '16px',
          overflow: 'hidden',
          border: '1px solid rgba(234,179,8,0.25)',
        }}
      >
        {/* Header */}
        <div style={{
          display: 'flex', alignItems: 'center', gap: '10px',
          padding: '10px 14px',
          background: 'linear-gradient(to right, #111, #000)',
        }}>
          <div style={{
            width: '32px', height: '32px', borderRadius: '50%',
            background: 'linear-gradient(135deg, #facc15, #d97706)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: '#000', fontWeight: '700', fontSize: '11px', flexShrink: 0,
          }}>
            DD
          </div>
          <div>
            <p style={{ color: '#fff', fontSize: '12px', fontWeight: '600', margin: 0, lineHeight: 1 }}>
              devine_dwellings
            </p>
            <p style={{ color: 'rgba(234,179,8,0.6)', fontSize: '10px', margin: '3px 0 0' }}>
              Dholera Smart City
            </p>
          </div>
        </div>

        {/* Video */}
        <div style={{ position: 'relative', width: '100%', aspectRatio: '9/16' }}>
          <video
            ref={videoRef}
            src={video.src}
            style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
            autoPlay
            muted
            loop
            playsInline
          />
          <div style={{
            position: 'absolute', inset: 0,
            background: 'linear-gradient(to top, rgba(0,0,0,0.55) 0%, transparent 40%)',
            pointerEvents: 'none',
          }} />
        </div>

        {/* Caption */}
        <div style={{
          padding: '10px 14px 12px',
          background: 'linear-gradient(to right, #111, #000)',
        }}>
          <p style={{ color: '#fff', fontSize: '12px', margin: 0, lineHeight: 1.5,
            display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
            <strong>devine_dwellings</strong>{' '}
            <span style={{ color: '#ccc' }}>{video.caption}</span>
          </p>
          <p style={{ color: '#eab308', fontSize: '10px', marginTop: '5px', marginBottom: 0,
            whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
            {video.tags}
          </p>
        </div>
      </div>
    </div>
  );
};

const InstagramIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" strokeWidth="1.8">
    <defs>
      <linearGradient id="igGrad" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#f09433" />
        <stop offset="50%" stopColor="#e6683c" />
        <stop offset="100%" stopColor="#bc1888" />
      </linearGradient>
    </defs>
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" stroke="url(#igGrad)" fill="none" />
    <circle cx="12" cy="12" r="4" stroke="url(#igGrad)" fill="none" />
    <circle cx="17.5" cy="6.5" r="1" fill="#bc1888" />
  </svg>
);

const PropertyCarousel = () => {
  const headerRef = useRef(null);
  const footerRef = useRef(null);
  const [headerVisible, setHeaderVisible] = useState(false);
  const [footerVisible, setFooterVisible] = useState(false);

  useEffect(() => {
    const observe = (ref, setter) => {
      if (!ref.current) return;
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setter(true);
          else setter(false);
        },
        { threshold: 0.2 }
      );
      obs.observe(ref.current);
      return obs;
    };

    const h = observe(headerRef, setHeaderVisible);
    const f = observe(footerRef, setFooterVisible);
    return () => { h && h.disconnect(); f && f.disconnect(); };
  }, []);

  return (
    <div style={{ width: '100%', backgroundColor: '#000', padding: '40px 16px' }}>

      {/* Header */}
      <div
        ref={headerRef}
        style={{
          textAlign: 'center',
          marginBottom: '36px',
          opacity: headerVisible ? 1 : 0,
          transform: headerVisible ? 'translateY(0)' : 'translateY(-30px)',
          transition: 'opacity 0.7s ease, transform 0.7s ease',
        }}
      >
        <h2 style={{
          fontSize: 'clamp(22px, 4vw, 32px)',
          fontWeight: '700',
          background: 'linear-gradient(to right, #facc15, #d97706)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          margin: '0 0 6px',
        }}>
          Property Reels
        </h2>
        <p style={{ color: 'rgba(253,224,71,0.6)', fontSize: '14px', margin: 0 }}>
          Explore Dholera's smartest living spaces
        </p>
      </div>

      {/* Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
        gap: '28px',
        maxWidth: '1100px',
        margin: '0 auto',
      }}>
        {videos.map((video, i) => (
          <VideoCard key={i} video={video} index={i} />
        ))}
      </div>

      {/* Footer */}
      <div
        ref={footerRef}
        style={{
          marginTop: '40px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '10px',
          opacity: footerVisible ? 1 : 0,
          transform: footerVisible ? 'translateY(0)' : 'translateY(30px)',
          transition: 'opacity 0.7s ease 0.3s, transform 0.7s ease 0.3s',
        }}
      >
        <div style={{ width: '64px', height: '1px', background: 'rgba(234,179,8,0.3)' }} />
        
        <a
          href="https://www.instagram.com/devine_dwellings"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: 'flex', alignItems: 'center', gap: '8px',
            background: '#111',
            border: '1px solid rgba(234,179,8,0.3)',
            borderRadius: '999px',
            padding: '8px 20px',
            textDecoration: 'none',
            transition: 'border-color 0.3s',
          }}
          onMouseEnter={e => e.currentTarget.style.borderColor = 'rgba(234,179,8,0.8)'}
          onMouseLeave={e => e.currentTarget.style.borderColor = 'rgba(234,179,8,0.3)'}
        >
          <InstagramIcon />
          <span style={{ color: '#fff', fontSize: '13px', fontWeight: '500' }}>
            @devine_dwellings
          </span>
        </a>
        <p style={{ color: '#555', fontSize: '11px', margin: 0 }}>
          For more properties visit{' '}
          <span style={{ color: '#eab308' }}>@devine_dwellings</span>
          {' '}on Instagram
        </p>
      </div>
    </div>
  );
};

export default PropertyCarousel;