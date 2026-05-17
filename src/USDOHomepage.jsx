import { useState, useEffect, useRef } from "react";

const colors = {
  green: "#2a7d5c",
  greenDark: "#1e5a45",
  greenLight: "#dceee4",
  greenMid: "#3d9a6e",
  gold: "#c8882a",
  goldLight: "#f5e6c8",
  cream: "#faf6ef",
  sand: "#ede8df",
  bark: "#5c3d1e",
  text: "#1c1a16",
  textMid: "#4a4237",
  textLight: "#8a7e6e",
  white: "#ffffff",
};

const img = (file) => `${import.meta.env.BASE_URL}images/${file}`;

const fonts = `
  @import url('https://fonts.googleapis.com/css2?family=Lora:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500&family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500&display=swap');
`;

const styles = `
  ${fonts}
  * { margin: 0; padding: 0; box-sizing: border-box; }
  html {
    -webkit-text-size-adjust: 100%;
    scroll-behavior: auto;
  }
  body { background: ${colors.cream}; }
  img { max-width: 100%; height: auto; }

  .usdo-root {
    font-family: 'DM Sans', sans-serif;
    color: ${colors.text};
    background: ${colors.cream};
    overflow-x: clip;
  }
  #impact,
  #mission,
  #programs,
  #gallery,
  #news {
    scroll-margin-top: 4.5rem;
  }
  @media (min-width: 1024px) {
    #impact,
    #mission,
    #programs,
    #gallery,
    #news {
      scroll-margin-top: 5.5rem;
    }
  }

  /* NAV — mobile first */
  .nav {
    position: fixed; top: 0; left: 0; right: 0; z-index: 100;
    display: flex; align-items: center; justify-content: space-between;
    padding: 0 1rem;
    height: 56px;
    background: rgba(250,246,239,0.96);
    backdrop-filter: blur(12px);
    border-bottom: 1px solid rgba(92,61,30,0.1);
    box-shadow: none;
    transition: box-shadow 0.25s ease;
  }
  .nav.is-scrolled {
    box-shadow: 0 2px 20px rgba(30,90,69,0.08);
  }
  .nav-logo {
    display: flex; align-items: center; gap: 10px;
    min-width: 0;
    flex: 1;
  }
  .nav-logo-mark {
    width: 36px; height: 36px; border-radius: 50%;
    background: ${colors.greenDark};
    display: flex; align-items: center; justify-content: center;
    flex-shrink: 0;
  }
  .nav-logo-mark svg { width: 20px; height: 20px; }
  .nav-org-name {
    font-family: 'Lora', serif;
    font-size: 11px; font-weight: 600;
    color: ${colors.greenDark};
    line-height: 1.25;
    min-width: 0;
  }
  .nav-actions {
    display: flex; align-items: center; gap: 0.5rem;
    flex-shrink: 0;
  }
  .nav-toggle {
    display: flex;
    align-items: center; justify-content: center;
    width: 40px; height: 40px;
    border: 1px solid ${colors.sand};
    border-radius: 8px;
    background: ${colors.white};
    color: ${colors.greenDark};
    font-size: 1.25rem;
    line-height: 1;
    cursor: pointer;
    transition: background 0.2s, border-color 0.2s;
  }
  .nav-toggle:hover { border-color: ${colors.green}; }
  .nav-backdrop {
    position: fixed; inset: 0;
    top: 56px;
    background: rgba(28,26,22,0.45);
    z-index: 98;
    border: none; padding: 0; cursor: pointer;
  }
  .nav-links {
    display: none;
    list-style: none;
    position: fixed;
    top: 56px; left: 0; right: 0;
    z-index: 99;
    flex-direction: column;
    align-items: stretch;
    gap: 0;
    padding: 0.75rem 1rem 1.25rem;
    background: ${colors.cream};
    border-bottom: 1px solid rgba(92,61,30,0.12);
    box-shadow: 0 16px 40px rgba(30,90,69,0.12);
    max-height: calc(100dvh - 56px);
    overflow-y: auto;
  }
  .nav-links.is-open { display: flex; }
  .nav-links li { width: 100%; }
  .nav-links a,
  .nav-links .nav-lang {
    display: block;
    width: 100%;
    padding: 0.85rem 0.5rem;
    font-size: 15px;
    border-radius: 6px;
  }
  .nav-links a:hover { background: ${colors.greenLight}; }
  .nav-links .nav-donate {
    text-align: center;
    margin-top: 0.5rem;
    padding: 12px 20px !important;
  }
  .nav-links .nav-lang {
    margin-top: 0.25rem;
    text-align: center;
  }
  .nav-links a {
    font-size: 13.5px; font-weight: 400;
    color: ${colors.textMid}; text-decoration: none;
    letter-spacing: 0.01em;
    transition: color 0.2s;
  }
  .nav-links a:hover { color: ${colors.green}; }
  .nav-donate {
    background: ${colors.green};
    color: ${colors.white} !important;
    padding: 8px 20px;
    border-radius: 100px;
    font-weight: 500 !important;
    transition: background 0.2s !important;
  }
  .nav-donate:hover { background: ${colors.greenDark} !important; }
  .nav-lang {
    font-size: 12px; color: ${colors.textLight};
    border: 1px solid ${colors.sand};
    padding: 4px 10px; border-radius: 100px;
    cursor: pointer; background: transparent;
    transition: all 0.2s;
  }
  .nav-lang:hover { border-color: ${colors.green}; color: ${colors.green}; }

  /* HERO — mobile first */
  .hero {
    min-height: auto;
    display: flex;
    flex-direction: column;
    padding-top: 56px;
    position: relative;
    overflow: hidden;
  }
  .hero-bg-pattern {
    position: absolute; inset: 0; pointer-events: none;
    opacity: 0.045;
    background-image: radial-gradient(circle, ${colors.greenDark} 1px, transparent 1px);
    background-size: 28px 28px;
  }
  .hero-left {
    padding: 1.75rem 1.25rem 2.5rem;
    display: flex; flex-direction: column;
    justify-content: center;
    position: relative;
    order: 2;
  }
  .hero-eyebrow {
    display: inline-flex; align-items: center; gap: 8px;
    font-size: 11px; font-weight: 500; letter-spacing: 0.12em;
    text-transform: uppercase; color: ${colors.gold};
    margin-bottom: 1.5rem;
  }
  .hero-eyebrow::before {
    content: '';
    width: 24px; height: 1.5px;
    background: ${colors.gold};
    display: block;
  }
  .hero-title {
    font-family: 'Lora', serif;
    font-size: clamp(1.65rem, 6.5vw, 2.35rem);
    font-weight: 700;
    line-height: 1.2;
    color: ${colors.greenDark};
    margin-bottom: 1rem;
  }
  .hero-title em {
    font-style: italic;
    color: ${colors.greenMid};
  }
  .hero-subtitle {
    font-size: 0.95rem;
    color: ${colors.textMid};
    line-height: 1.7;
    max-width: none;
    margin-bottom: 1.5rem;
  }
  .hero-bengali {
    font-family: 'Lora', serif;
    font-size: 1.1rem;
    color: ${colors.textLight};
    font-style: italic;
    margin-bottom: 2rem;
    line-height: 1.6;
  }
  .hero-actions {
    display: flex;
    flex-direction: column;
    align-items: stretch;
    gap: 0.65rem;
  }
  .hero-actions .btn-primary {
    width: 100%;
    text-align: center;
    padding: 13px 20px;
  }
  .hero-actions .btn-secondary {
    justify-content: center;
    padding: 0.5rem;
  }
  .btn-primary {
    background: ${colors.green};
    color: ${colors.white};
    padding: 14px 28px;
    border-radius: 6px;
    font-size: 14px; font-weight: 500;
    border: none; cursor: pointer;
    text-decoration: none; display: inline-block;
    transition: all 0.2s;
    letter-spacing: 0.01em;
  }
  .btn-primary:hover { background: ${colors.greenDark}; transform: translateY(-1px); }
  .btn-secondary {
    color: ${colors.greenDark};
    font-size: 14px; font-weight: 500;
    border: none; background: none; cursor: pointer;
    text-decoration: none; display: inline-flex;
    align-items: center; gap: 6px;
    transition: gap 0.2s;
  }
  .btn-secondary:hover { gap: 10px; }
  .hero-right {
    position: relative;
    background: ${colors.greenDark};
    display: flex; flex-direction: column;
    justify-content: flex-end;
    overflow: hidden;
    order: 1;
    min-height: min(52vw, 320px);
    max-height: 380px;
  }
  .hero-img-overlay {
    position: absolute; inset: 0;
    background: linear-gradient(135deg, rgba(30,90,69,0.7) 0%, rgba(30,90,69,0.2) 60%);
    z-index: 1;
  }
  .hero-img-bg {
    position: absolute; inset: 0;
    background: ${colors.greenDark};
  }
  .hero-photo {
    width: 100%; height: 100%;
    object-fit: cover;
    object-position: center 30%;
  }
  .hero-illustrated {
    width: 100%; height: 100%;
    position: absolute; inset: 0;
  }
  .cover-photo {
    width: 100%; height: 100%;
    object-fit: cover;
    display: block;
  }
  .contain-photo {
    width: 100%; height: 100%;
    object-fit: contain;
    display: block;
    background: ${colors.cream};
  }
  .hero-card-float {
    position: relative; z-index: 2;
    margin: 1rem;
    background: rgba(250,246,239,0.12);
    backdrop-filter: blur(20px);
    border: 1px solid rgba(255,255,255,0.2);
    border-radius: 10px;
    padding: 1rem 1.1rem;
    color: ${colors.white};
  }
  .hero-card-label {
    font-size: 10px; letter-spacing: 0.1em; text-transform: uppercase;
    color: rgba(255,255,255,0.6); margin-bottom: 0.5rem;
  }
  .hero-card-name {
    font-family: 'Lora', serif; font-size: 0.95rem;
    color: ${colors.white}; margin-bottom: 0.25rem;
    line-height: 1.35;
  }
  .hero-card-sub {
    font-size: 12px; color: rgba(255,255,255,0.7);
  }
  .hero-since {
    position: absolute; top: 1rem; right: 1rem; z-index: 2;
    font-size: 10px; color: rgba(255,255,255,0.6);
    letter-spacing: 0.1em; text-transform: uppercase;
    display: flex; flex-direction: column; align-items: flex-end; gap: 2px;
  }
  .hero-since strong {
    font-family: 'Lora', serif;
    font-size: 1.5rem; color: rgba(255,255,255,0.25);
    font-weight: 700; line-height: 1;
  }

  /* IMPACT STRIP */
  .impact-strip {
    background: ${colors.greenDark};
    padding: 2.25rem 1.25rem;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 1.5rem 1rem;
    position: relative;
    overflow: hidden;
  }
  .impact-strip::before {
    content: '';
    position: absolute; inset: 0;
    background-image: radial-gradient(circle, rgba(255,255,255,0.04) 1px, transparent 1px);
    background-size: 20px 20px;
  }
  .impact-item {
    text-align: center; position: relative;
  }
  .impact-num {
    font-family: 'Lora', serif;
    font-size: clamp(1.75rem, 8vw, 2.25rem); font-weight: 700;
    color: ${colors.white}; line-height: 1;
    margin-bottom: 0.25rem;
    font-variant-numeric: tabular-nums;
    min-height: 1.15em;
  }
  .impact-num span { color: ${colors.gold}; }
  .impact-label {
    font-size: 12px; color: rgba(255,255,255,0.55);
    letter-spacing: 0.08em; text-transform: uppercase;
    line-height: 1.5;
  }
  .impact-divider { display: none; }

  /* MISSION */
  .mission {
    padding: 3rem 1.25rem;
    display: grid;
    grid-template-columns: 1fr;
    gap: 2.5rem;
    align-items: start;
    position: relative;
  }
  .mission-left { position: relative; }
  .mission-quote-mark {
    font-family: 'Lora', serif;
    font-size: 5rem;
    color: ${colors.greenLight};
    position: absolute;
    top: -1rem; left: -0.5rem;
    line-height: 1;
    pointer-events: none;
    font-weight: 700;
  }
  .mission-text {
    font-family: 'Lora', serif;
    font-size: clamp(1.15rem, 4.5vw, 1.45rem);
    line-height: 1.6;
    color: ${colors.greenDark};
    font-style: italic;
    position: relative;
    z-index: 1;
  }
  .mission-attr {
    margin-top: 2rem;
    display: flex; align-items: center; gap: 12px;
  }
  .mission-attr-line {
    width: 32px; height: 2px; background: ${colors.gold};
  }
  .mission-attr-text {
    font-size: 12px; font-weight: 500;
    color: ${colors.textLight}; letter-spacing: 0.08em;
    text-transform: uppercase;
  }
  .mission-right {}
  .mission-tag {
    display: inline-block;
    font-size: 10px; letter-spacing: 0.12em; text-transform: uppercase;
    color: ${colors.gold}; font-weight: 500;
    margin-bottom: 1rem;
  }
  .mission-heading {
    font-family: 'Lora', serif;
    font-size: clamp(1.35rem, 5vw, 1.75rem); font-weight: 600;
    color: ${colors.greenDark};
    line-height: 1.35;
    margin-bottom: 1rem;
  }
  .mission-body {
    font-size: 0.95rem;
    color: ${colors.textMid};
    line-height: 1.85;
    margin-bottom: 1rem;
  }
  .mission-pillars {
    display: flex; flex-wrap: wrap; gap: 8px;
    margin-top: 1.5rem;
  }
  .pillar-chip {
    font-size: 12px;
    padding: 6px 14px;
    border-radius: 100px;
    background: ${colors.greenLight};
    color: ${colors.greenDark};
    font-weight: 500;
    border: 1px solid rgba(42,125,92,0.2);
  }

  /* PROGRAMS */
  .programs {
    background: ${colors.sand};
    padding: 3rem 1.25rem;
    position: relative;
  }
  .section-header {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 0.75rem;
    margin-bottom: 2rem;
  }
  .section-eyebrow {
    font-size: 11px; font-weight: 500; letter-spacing: 0.12em;
    text-transform: uppercase; color: ${colors.gold};
    margin-bottom: 0.75rem;
  }
  .section-title {
    font-family: 'Lora', serif;
    font-size: clamp(1.5rem, 6vw, 2rem); font-weight: 700;
    color: ${colors.greenDark};
    line-height: 1.2;
  }
  .section-link {
    font-size: 13px; color: ${colors.green};
    text-decoration: none; font-weight: 500;
    display: inline-flex; align-items: center; gap: 6px;
    transition: gap 0.2s;
  }
  .section-link:hover { gap: 10px; }
  .programs-grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: 1rem;
  }
  .prog-card {
    background: ${colors.white};
    border-radius: 10px;
    overflow: hidden;
    transition: transform 0.25s, box-shadow 0.25s;
    cursor: pointer;
    position: relative;
  }
  .prog-card:hover { transform: translateY(-4px); box-shadow: 0 16px 40px rgba(30,90,69,0.12); }
  .prog-card-top {
    height: 8px;
  }
  .prog-card-body {
    padding: 1.75rem 1.75rem 2rem;
  }
  .prog-icon {
    width: 48px; height: 48px;
    border-radius: 10px;
    display: flex; align-items: center; justify-content: center;
    margin-bottom: 1.25rem;
    font-size: 22px;
  }
  .prog-name {
    font-family: 'Lora', serif;
    font-size: 1.15rem; font-weight: 600;
    color: ${colors.greenDark};
    margin-bottom: 0.75rem;
    line-height: 1.35;
  }
  .prog-desc {
    font-size: 0.88rem;
    color: ${colors.textMid};
    line-height: 1.75;
  }
  .prog-featured {
    grid-column: auto;
    display: flex;
    flex-direction: column;
  }
  .prog-featured-visual {
    background: ${colors.greenDark};
    min-height: 200px;
    display: flex; align-items: center; justify-content: center;
    position: relative; overflow: hidden;
  }
  .prog-featured-visual-inner {
    position: absolute; inset: 0;
  }
  .prog-featured-visual-inner img {
    width: 100%; height: 100%;
    object-fit: cover;
    object-position: center 20%;
  }
  .prog-autism-badge {
    position: absolute; top: 1rem; left: 1rem;
    background: ${colors.gold};
    color: ${colors.white};
    font-size: 10px; font-weight: 600;
    letter-spacing: 0.08em; text-transform: uppercase;
    padding: 4px 10px; border-radius: 100px;
  }

  /* SPOTLIGHT */
  .spotlight {
    padding: 3rem 1.25rem;
    display: grid;
    grid-template-columns: 1fr;
    gap: 2rem;
    align-items: start;
  }
  .spotlight-left {}
  .spotlight-img-block {
    background: ${colors.greenDark};
    border-radius: 12px;
    aspect-ratio: 4/3;
    position: relative;
    overflow: hidden;
    display: flex; align-items: center; justify-content: center;
  }
  .spotlight-img-placeholder {
    font-size: 4rem; color: rgba(255,255,255,0.12);
  }
  .spotlight-photo {
    position: absolute; inset: 0;
    width: 100%; height: 100%;
    object-fit: cover;
    object-position: center top;
  }

  /* GALLERY SCROLLER */
  .gallery {
    padding: 3rem 1.25rem 3.5rem;
    background: ${colors.sand};
    border-top: 1px solid rgba(92,61,30,0.08);
  }
  .gallery-carousel {
    position: relative;
    max-width: 1080px;
    margin: 1.5rem auto 0;
    border-radius: 10px;
    overflow: hidden;
    background: ${colors.greenDark};
    box-shadow: 0 24px 60px rgba(30,90,69,0.14);
  }
  .gallery-slide-wrap {
    position: relative;
    aspect-ratio: 16 / 9;
    overflow: hidden;
    contain: layout style paint;
  }
  .gallery-slide {
    position: absolute; inset: 0;
    opacity: 0;
    transition: opacity 0.65s ease;
    pointer-events: none;
  }
  .gallery-slide.active {
    opacity: 1;
    pointer-events: auto;
  }
  .gallery-slide img {
    width: 100%; height: 100%;
    object-fit: cover;
    display: block;
  }
  .gallery-slide.graphic img {
    object-fit: contain;
    background: ${colors.cream};
  }
  .gallery-caption {
    position: absolute; left: 0; right: 0; bottom: 0;
    padding: 2rem 1rem 1rem;
    background: linear-gradient(transparent, rgba(30,90,69,0.9));
    color: ${colors.white};
    font-size: 0.82rem;
    line-height: 1.5;
  }
  .gallery-caption strong {
    display: block;
    font-family: 'Lora', serif;
    font-size: 1rem;
    margin-bottom: 0.25rem;
  }
  .gallery-footer {
    max-width: 1080px;
    margin: 0 auto;
  }
  .gallery-controls {
    display: flex; align-items: center; justify-content: center;
    gap: 1rem; margin-top: 1.25rem;
  }
  .gallery-btn {
    width: 42px; height: 42px; border-radius: 50%;
    border: 1px solid rgba(42,125,92,0.25);
    background: ${colors.white};
    color: ${colors.greenDark};
    cursor: pointer;
    font-size: 1.1rem;
    display: flex; align-items: center; justify-content: center;
    transition: all 0.2s;
  }
  .gallery-btn:hover {
    background: ${colors.green};
    color: ${colors.white};
    border-color: ${colors.green};
  }
  .gallery-dots {
    display: flex; gap: 8px; flex-wrap: wrap;
    justify-content: center;
  }
  .gallery-dot {
    width: 8px; height: 8px; border-radius: 50%;
    border: none; padding: 0;
    background: rgba(42,125,92,0.25);
    cursor: pointer;
    transition: all 0.25s;
  }
  .gallery-dot.active {
    background: ${colors.green};
    width: 24px;
    border-radius: 100px;
  }
  .gallery-thumbs-shell {
    margin-top: 1.25rem;
    overflow-x: auto;
    overflow-y: hidden;
    padding: 4px 8px 8px;
    -webkit-overflow-scrolling: touch;
    scrollbar-width: thin;
    overflow-anchor: none;
    overscroll-behavior-x: contain;
  }
  .gallery-thumbs-shell::-webkit-scrollbar { height: 6px; }
  .gallery-thumbs-shell::-webkit-scrollbar-thumb {
    background: rgba(42,125,92,0.3);
    border-radius: 100px;
  }
  .gallery-thumbs {
    display: flex;
    gap: 10px;
    width: max-content;
    margin-inline: auto;
    justify-content: center;
  }
  .gallery-thumb {
    flex: 0 0 88px;
    height: 66px;
    border-radius: 8px;
    overflow: hidden;
    border: 2px solid transparent;
    cursor: pointer;
    opacity: 0.65;
    transition: all 0.2s;
    padding: 0;
    background: ${colors.greenDark};
  }
  .gallery-thumb.active {
    opacity: 1;
    border-color: ${colors.green};
    box-shadow: 0 4px 12px rgba(42,125,92,0.25);
  }
  .gallery-thumb img {
    width: 100%; height: 100%;
    object-fit: cover;
    object-position: center;
    display: block;
  }
  .gallery-thumb.graphic img {
    object-fit: contain;
    object-position: center;
    background: ${colors.cream};
  }
  .spotlight-img-caption {
    position: absolute; bottom: 0; left: 0; right: 0;
    padding: 1.5rem;
    background: linear-gradient(transparent, rgba(0,0,0,0.7));
    color: rgba(255,255,255,0.85);
    font-size: 12px;
  }
  .spotlight-right {}
  .spotlight-tag {
    display: inline-block;
    font-size: 10px; letter-spacing: 0.12em; text-transform: uppercase;
    color: ${colors.gold}; font-weight: 500;
    margin-bottom: 1rem;
  }
  .spotlight-heading {
    font-family: 'Lora', serif;
    font-size: clamp(1.35rem, 5vw, 1.85rem); font-weight: 700;
    color: ${colors.greenDark};
    line-height: 1.3;
    margin-bottom: 1rem;
  }
  .spotlight-body {
    font-size: 0.93rem;
    color: ${colors.textMid};
    line-height: 1.85;
    margin-bottom: 1.5rem;
  }
  .spotlight-facts {
    display: grid; grid-template-columns: 1fr 1fr;
    gap: 0.65rem; margin-bottom: 1.5rem;
  }
  .fact-item {
    background: ${colors.greenLight};
    border-radius: 8px;
    padding: 1rem 1.25rem;
  }
  .fact-num {
    font-family: 'Lora', serif;
    font-size: 1.6rem; font-weight: 700;
    color: ${colors.greenDark};
  }
  .fact-label {
    font-size: 11px; color: ${colors.green};
    margin-top: 2px;
  }

  /* NEWS */
  .news {
    background: ${colors.greenDark};
    padding: 3rem 1.25rem;
    position: relative;
    overflow: hidden;
  }
  .news::before {
    content: '';
    position: absolute; inset: 0;
    background-image: radial-gradient(circle, rgba(255,255,255,0.03) 1px, transparent 1px);
    background-size: 24px 24px;
  }
  .news .section-title { color: ${colors.white}; }
  .news .section-eyebrow { color: ${colors.gold}; }
  .news-grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: 1rem;
    position: relative; z-index: 1;
  }
  .news-card {
    background: rgba(255,255,255,0.06);
    border: 1px solid rgba(255,255,255,0.1);
    border-radius: 10px;
    padding: 1.75rem;
    transition: background 0.2s;
    cursor: pointer;
  }
  .news-card:hover { background: rgba(255,255,255,0.1); }
  .news-date {
    font-size: 11px; color: rgba(255,255,255,0.4);
    letter-spacing: 0.06em; margin-bottom: 0.75rem;
    text-transform: uppercase;
  }
  .news-headline {
    font-family: 'Lora', serif;
    font-size: 1.05rem; font-weight: 600;
    color: ${colors.white};
    line-height: 1.45;
    margin-bottom: 0.75rem;
  }
  .news-snippet {
    font-size: 0.85rem;
    color: rgba(255,255,255,0.55);
    line-height: 1.7;
  }
  .news-tag {
    display: inline-block;
    margin-top: 1rem;
    font-size: 10px; font-weight: 500;
    letter-spacing: 0.08em; text-transform: uppercase;
    color: ${colors.gold};
  }

  /* CTA */
  .cta-section {
    padding: 3rem 1.25rem;
    display: grid;
    grid-template-columns: 1fr;
    gap: 1rem;
    background: ${colors.cream};
    position: relative;
  }
  .cta-card {
    border-radius: 12px;
    padding: 1.75rem 1.25rem;
    position: relative;
    overflow: hidden;
  }
  .cta-card-donate {
    background: ${colors.green};
    color: ${colors.white};
  }
  .cta-card-volunteer {
    background: ${colors.goldLight};
    border: 1px solid rgba(200,136,42,0.2);
  }
  .cta-card-icon {
    font-size: 2.5rem; margin-bottom: 1.5rem;
  }
  .cta-card-title {
    font-family: 'Lora', serif;
    font-size: clamp(1.35rem, 5vw, 1.8rem); font-weight: 700;
    line-height: 1.25;
    margin-bottom: 0.75rem;
  }
  .cta-card-donate .cta-card-title { color: ${colors.white}; }
  .cta-card-volunteer .cta-card-title { color: ${colors.bark}; }
  .cta-card-body {
    font-size: 0.9rem;
    line-height: 1.75;
    margin-bottom: 2rem;
  }
  .cta-card-donate .cta-card-body { color: rgba(255,255,255,0.75); }
  .cta-card-volunteer .cta-card-body { color: ${colors.textMid}; }
  .btn-white {
    background: ${colors.white};
    color: ${colors.green};
    padding: 12px 24px;
    border-radius: 6px;
    font-size: 14px; font-weight: 600;
    border: none; cursor: pointer;
    display: inline-flex; align-items: center; gap: 8px;
    transition: all 0.2s;
  }
  .btn-white:hover { transform: translateY(-1px); box-shadow: 0 6px 20px rgba(0,0,0,0.15); }
  .btn-bark {
    background: ${colors.bark};
    color: ${colors.white};
    padding: 12px 24px;
    border-radius: 6px;
    font-size: 14px; font-weight: 600;
    border: none; cursor: pointer;
    display: inline-flex; align-items: center; gap: 8px;
    transition: all 0.2s;
  }
  .btn-bark:hover { background: ${colors.text}; transform: translateY(-1px); }
  .payment-methods {
    display: flex; align-items: center; gap: 8px;
    margin-top: 1.25rem;
    flex-wrap: wrap;
  }
  .pay-badge {
    font-size: 11px; font-weight: 600;
    padding: 4px 10px; border-radius: 4px;
    background: rgba(255,255,255,0.15);
    color: rgba(255,255,255,0.9);
    letter-spacing: 0.03em;
  }

  /* FOOTER */
  .footer {
    background: ${colors.text};
    padding: 2.5rem 1.25rem 2rem;
    color: rgba(255,255,255,0.55);
  }
  .footer-grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: 2rem;
    margin-bottom: 2rem;
  }
  .footer-brand {}
  .footer-logo {
    display: flex; align-items: center; gap: 10px;
    margin-bottom: 1rem;
  }
  .footer-logo-mark {
    width: 36px; height: 36px; border-radius: 50%;
    background: ${colors.greenMid};
    display: flex; align-items: center; justify-content: center;
  }
  .footer-org {
    font-family: 'Lora', serif;
    font-size: 13px; font-weight: 600;
    color: ${colors.white}; line-height: 1.3;
  }
  .footer-tagline {
    font-size: 13px; line-height: 1.75; margin-bottom: 1.25rem;
  }
  .footer-email {
    font-size: 13px; color: ${colors.gold};
    text-decoration: none;
  }
  .footer-col-title {
    font-size: 11px; font-weight: 600;
    letter-spacing: 0.1em; text-transform: uppercase;
    color: rgba(255,255,255,0.7);
    margin-bottom: 1rem;
  }
  .footer-links { list-style: none; display: flex; flex-direction: column; gap: 8px; }
  .footer-links a {
    font-size: 13px; color: rgba(255,255,255,0.45);
    text-decoration: none; transition: color 0.2s;
  }
  .footer-links a:hover { color: ${colors.white}; }
  .footer-bottom {
    border-top: 1px solid rgba(255,255,255,0.08);
    padding-top: 1.5rem;
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
    align-items: flex-start;
  }
  .footer-copy { font-size: 12px; }
  .footer-reg { font-size: 12px; color: rgba(255,255,255,0.3); }

  /* ANIMATE IN */
  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(24px); }
    to { opacity: 1; transform: translateY(0); }
  }
  .fade-up { animation: fadeUp 0.7s ease forwards; }
  .fade-up-2 { animation: fadeUp 0.7s 0.15s ease forwards; opacity: 0; }
  .fade-up-3 { animation: fadeUp 0.7s 0.3s ease forwards; opacity: 0; }
  .fade-up-4 { animation: fadeUp 0.7s 0.45s ease forwards; opacity: 0; }

  @keyframes countUp {
    from { opacity: 0; transform: translateY(10px); }
    to { opacity: 1; transform: translateY(0); }
  }
  .count-anim { animation: countUp 0.6s ease forwards; }

  /* STICKY DONATE */
  .sticky-donate {
    position: fixed;
    bottom: max(1rem, env(safe-area-inset-bottom));
    right: max(1rem, env(safe-area-inset-right));
    background: ${colors.green};
    color: ${colors.white};
    padding: 12px 18px;
    border-radius: 100px;
    font-size: 13px; font-weight: 600;
    border: none; cursor: pointer;
    box-shadow: 0 8px 24px rgba(30,90,69,0.3);
    z-index: 50;
    display: flex; align-items: center; gap: 6px;
    transition: all 0.2s;
  }
  .sticky-donate:hover { background: ${colors.greenDark}; transform: translateY(-2px); box-shadow: 0 12px 32px rgba(30,90,69,0.4); }

  /* TABLET — 768px+ */
  @media (min-width: 768px) {
    .nav { padding: 0 1.5rem; height: 60px; }
    .nav-org-name { font-size: 12px; }
    .nav-backdrop { top: 60px; }
    .nav-links { top: 60px; }
    .hero { padding-top: 60px; }
    .hero-right { min-height: 360px; max-height: 440px; }
    .hero-left { padding: 2.5rem 2rem 3rem; }
    .hero-actions {
      flex-direction: row;
      flex-wrap: wrap;
      align-items: center;
    }
    .hero-actions .btn-primary { width: auto; }
    .impact-strip {
      grid-template-columns: repeat(4, 1fr);
      padding: 2.5rem 2rem;
      gap: 1.5rem;
    }
    .impact-num { font-size: 2.5rem; }
    .mission { padding: 4rem 2rem; gap: 3rem; }
    .mission-quote-mark { font-size: 7rem; }
    .programs, .spotlight, .gallery, .news, .cta-section {
      padding-left: 2rem;
      padding-right: 2rem;
    }
    .programs-grid { grid-template-columns: repeat(2, 1fr); }
    .news-grid { grid-template-columns: repeat(2, 1fr); }
    .cta-section { grid-template-columns: 1fr 1fr; gap: 1.5rem; }
    .footer-grid { grid-template-columns: 1fr 1fr; gap: 2rem; }
    .footer-bottom {
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
    }
    .gallery-caption { padding: 2rem 1.5rem 1.25rem; font-size: 0.9rem; }
    .gallery-caption strong { font-size: 1.1rem; }
  }

  /* DESKTOP — 1024px+ */
  @media (min-width: 1024px) {
    .nav {
      padding: 0 2.5rem;
      height: 68px;
    }
    .nav-logo-mark { width: 40px; height: 40px; }
    .nav-logo-mark svg { width: 22px; height: 22px; }
    .nav-org-name { font-size: 14px; max-width: 200px; }
    .nav-toggle, .nav-backdrop { display: none !important; }
    .nav-links {
      display: flex !important;
      position: static;
      flex-direction: row;
      align-items: center;
      gap: 2rem;
      padding: 0;
      background: transparent;
      border: none;
      box-shadow: none;
      max-height: none;
      overflow: visible;
    }
    .nav-links li { width: auto; }
    .nav-links a,
    .nav-links .nav-lang {
      display: inline;
      width: auto;
      padding: 0;
      font-size: 13.5px;
      border-radius: 0;
    }
    .nav-links a:hover { background: transparent; }
    .nav-links .nav-donate {
      margin-top: 0;
      padding: 8px 20px !important;
    }
    .nav-links .nav-lang {
      margin-top: 0;
      padding: 4px 10px;
    }
    .hero {
      display: grid;
      grid-template-columns: 1fr 1fr;
      min-height: 100svh;
      padding-top: 68px;
    }
    .hero-left {
      order: unset;
      padding: 5rem 3rem 5rem 4rem;
    }
    .hero-right {
      order: unset;
      min-height: auto;
      max-height: none;
    }
    .hero-title { font-size: clamp(2.2rem, 3.5vw, 3.6rem); margin-bottom: 1.5rem; }
    .hero-subtitle { font-size: 1.05rem; max-width: 420px; margin-bottom: 2.5rem; }
    .hero-actions { gap: 1rem; }
    .hero-card-float { margin: 2rem; padding: 1.5rem; }
    .hero-card-name { font-size: 1.1rem; }
    .hero-since { top: 2.5rem; right: 2.5rem; font-size: 11px; }
    .hero-since strong { font-size: 2rem; }
    .impact-strip { padding: 3.5rem 4rem; gap: 2rem; }
    .impact-num { font-size: 3rem; }
    .impact-divider {
      display: block;
      position: absolute; right: 0; top: 10%; bottom: 10%;
      width: 1px; background: rgba(255,255,255,0.1);
    }
    .mission {
      padding: 6rem 4rem;
      grid-template-columns: 1fr 1fr;
      gap: 5rem;
      align-items: center;
    }
    .mission-quote-mark { font-size: 10rem; top: -2.5rem; left: -2rem; }
    .mission-text { font-size: 1.65rem; line-height: 1.65; }
    .mission-heading { font-size: 2rem; margin-bottom: 1.5rem; }
    .programs { padding: 6rem 4rem; }
    .section-header {
      flex-direction: row;
      justify-content: space-between;
      align-items: flex-end;
      margin-bottom: 3rem;
    }
    .section-title { font-size: 2.4rem; }
    .programs-grid { grid-template-columns: repeat(3, 1fr); gap: 1.5rem; }
    .prog-featured {
      grid-column: span 2;
      display: grid;
      grid-template-columns: 1fr 1fr;
    }
    .prog-featured-visual { min-height: 220px; }
    .spotlight {
      padding: 6rem 4rem;
      grid-template-columns: 1fr 1fr;
      gap: 4rem;
    }
    .spotlight-heading { font-size: 1.85rem; margin-bottom: 1.25rem; }
    .spotlight-facts { gap: 1rem; margin-bottom: 2rem; }
    .gallery {
      padding: 5rem 4rem 6rem;
    }
    .gallery-carousel { margin-top: 2.5rem; border-radius: 14px; }
    .gallery-caption {
      padding: 2.5rem 2rem 1.5rem;
      font-size: 0.95rem;
    }
    .gallery-caption strong { font-size: 1.15rem; margin-bottom: 0.35rem; }
    .news { padding: 6rem 4rem; }
    .news-grid { grid-template-columns: repeat(3, 1fr); gap: 1.5rem; }
    .cta-section { padding: 6rem 4rem; gap: 3rem; }
    .cta-card { padding: 3rem; }
    .cta-card-title { font-size: 1.8rem; margin-bottom: 1rem; }
    .footer { padding: 4rem; }
    .footer-grid {
      grid-template-columns: 2fr 1fr 1fr 1fr;
      gap: 3rem;
      margin-bottom: 3rem;
    }
    .sticky-donate {
      bottom: 2rem;
      right: 2rem;
      padding: 14px 24px;
      font-size: 14px;
    }
  }
`;

const programs = [
  {
    name: "Education & Lifelong Learning",
    desc: "Combining formal and non-formal education to break cycles of poverty through accessible, community-centered learning.",
    icon: "📚",
    color: "#2a7d5c",
    bg: "#d4ede0",
  },
  {
    name: "Healthcare for Marginal Communities",
    desc: "Mobile health teams delivering essential medical care to underserved families in Dighirpar and surrounding regions.",
    icon: "🏥",
    color: "#c8882a",
    bg: "#f5e6c8",
  },
  {
    name: "Social Equality & Empowerment",
    desc: "Increasing public awareness of human rights, gender roles, and creativity through research and workshops.",
    icon: "⚖️",
    color: "#2a7d5c",
    bg: "#d4ede0",
  },
  {
    name: "Cultural & Architectural Heritage",
    desc: "Preserving the architectural and cultural identity of Dhaka and Bangladesh's major cities for future generations.",
    icon: "🏛️",
    color: "#5c3d1e",
    bg: "#f0e8d8",
  },
  {
    name: "Environmental Development",
    desc: "Fostering innovation and community resilience through sustainable environmental and agricultural initiatives.",
    icon: "🌿",
    color: "#1e5a45",
    bg: "#d4ede0",
  },
];

const news = [
  {
    date: "April 19, 2026",
    headline: "Teacher Appreciation Ceremony Honours Educators in Dighirpar",
    snippet: "USDO gathered students, guardians, and community members to celebrate the dedication of local teachers shaping the next generation.",
    tag: "Education",
  },
  {
    date: "May 11, 2026",
    headline: "Rukon Uddin Ahmed Autism School — Opening Soon in Keranigang & Munshiganj",
    snippet: "In response to rising autism prevalence across Bangladesh, USDO announces two specialized schools to serve children with special needs.",
    tag: "Healthcare",
  },
  {
    date: "April 17, 2026",
    headline: "Uttarbon Field Trip: 9–13 April 2026 — North Bengal Journey",
    snippet: "USDO team members embarked on a landmark field visit to North Bengal to strengthen regional development partnerships.",
    tag: "Community",
  },
];

const impactData = [
  { num: "2001", label: "Year Founded", suffix: "" },
  { num: "5,000", label: "Families Supported", suffix: "+" },
  { num: "12", label: "Active Programs", suffix: "" },
  { num: "3", label: "Districts Served", suffix: "" },
];

const galleryPhotos = [
  {
    src: img("community-garden.jpeg"),
    graphic: false,
    titleEn: "Growing Together",
    titleBn: "একসাথে বৃদ্ধি",
    captionEn:
      "USDO families nurture home gardens — building food security and environmental resilience in Munshiganj.",
    captionBn:
      "উত্তরণ পরিবারগুলোর সাথে বাগান গড়ে তোলা — মুন্সীগঞ্জে খাদ্য নিরাপত্তা ও পরিবেশগত স্থিতিস্থাপকতা।",
  },
  {
    src: img("education-award.jpeg"),
    graphic: false,
    titleEn: "Celebrating Students",
    titleBn: "শিক্ষার্থীদের সম্মান",
    captionEn:
      "Recognizing achievement in the classroom — because every child deserves encouragement and opportunity.",
    captionBn:
      "শ্রেণিকক্ষে সাফল্য উদযাপন — প্রতিটি শিশু প্রোৎসাহন ও সুযোগের যোগ্য।",
  },
  {
    src: img("team-gathering.jpeg"),
    graphic: false,
    titleEn: "Our Community",
    titleBn: "আমাদের সম্প্রদায়",
    captionEn:
      "Volunteers, partners, and leaders united — the people behind two decades of grassroots change.",
    captionBn:
      "স্বেচ্ছাসেবক, অংশীদার ও নেতৃবৃন্দ একত্র — দুই দশকের তৃণমূল পরিবর্তনের মানুষগুলো।",
  },
  {
    src: img("advocacy-rally.jpeg"),
    graphic: false,
    titleEn: "Voice for Change",
    titleBn: "পরিবর্তনের কণ্ঠ",
    captionEn:
      "Raising awareness on rights and equality — USDO stands with communities at the forefront of advocacy.",
    captionBn:
      "অধিকার ও সমতা সম্পর্কে সচেতনতা — উত্তরণ সমাজের পাশে দাঁড়ায়।",
  },
  {
    src: img("human-rights-paris.jpeg"),
    graphic: false,
    titleEn: "Human Rights on the World Stage",
    titleBn: "বিশ্বমঞ্চে মানবাধিকার",
    captionEn:
      "USDO representatives abroad — connecting Bangladeshi communities with global dialogue on dignity and rights.",
    captionBn:
      "বিদেশে উত্তরণ প্রতিনিধি — বাংলাদেশি সম্প্রদায়কে মর্যাদা ও অধিকারের বৈশ্বিক সংলাপের সাথে যুক্ত করা।",
  },
  {
    src: img("community-outreach.jpeg"),
    graphic: false,
    titleEn: "Reaching Every Doorstep",
    titleBn: "প্রতিটি ঘরে পৌঁছানো",
    captionEn:
      "From Qurbani drives to neighbourhood outreach — meeting families where they are with compassion and care.",
    captionBn:
      "কুরবানি থেকে পাড়া-পরিচয় — সহানুভূতি ও যত্ন নিয়ে পরিবারের কাছে পৌঁছানো।",
  },
  {
    src: img("childrens-day-2023.jpeg"),
    graphic: true,
    titleEn: "World Children's Day 2023",
    titleBn: "বিশ্ব শিশু দিবস ২০২৩",
    captionEn:
      "My Day · My Rights · My Childhood — USDO's commitment to every child's health, education, and future.",
    captionBn:
      "আমার দিন · আমার অধিকার · আমার শৈশব — প্রতিটি শিশুর স্বাস্থ্য, শিক্ষা ও ভবিষ্যতের প্রতি প্রতিশ্রুতি।",
  },
];

function PhotoGallery({ lang }) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const thumbsShellRef = useRef(null);
  const thumbsRef = useRef(null);
  const thumbScrollSmooth = useRef(false);

  useEffect(() => {
    if (paused) return undefined;
    const timer = setInterval(
      () => setIndex((i) => (i + 1) % galleryPhotos.length),
      5500
    );
    return () => clearInterval(timer);
  }, [paused]);

  useEffect(() => {
    const shell = thumbsShellRef.current;
    const thumbs = thumbsRef.current;
    const thumb = thumbs?.children[index];
    if (!shell || !thumb) return;

    const targetLeft =
      thumb.offsetLeft - (shell.clientWidth - thumb.offsetWidth) / 2;
    const max = Math.max(0, shell.scrollWidth - shell.clientWidth);
    shell.scrollTo({
      left: Math.max(0, Math.min(targetLeft, max)),
      behavior: thumbScrollSmooth.current ? "smooth" : "auto",
    });
    thumbScrollSmooth.current = false;
  }, [index]);

  const pickSlide = (i) => {
    thumbScrollSmooth.current = true;
    setIndex(i);
  };

  const go = (dir) => {
    thumbScrollSmooth.current = true;
    setIndex((i) => (i + dir + galleryPhotos.length) % galleryPhotos.length);
  };

  return (
    <section
      id="gallery"
      className="gallery"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="section-header" style={{ marginBottom: 0 }}>
        <div>
          <div className="section-eyebrow">
            {lang === "en" ? "In the Field" : "মাঠে আমরা"}
          </div>
          <div className="section-title">
            {lang === "en" ? "Life at USDO" : "উত্তরণের জীবন"}
          </div>
        </div>
      </div>

      <div className="gallery-carousel">
        <div className="gallery-slide-wrap">
          {galleryPhotos.map((photo, i) => (
            <div
              key={photo.src}
              className={`gallery-slide${i === index ? " active" : ""}${photo.graphic ? " graphic" : ""}`}
              aria-hidden={i !== index}
            >
              <img
                src={photo.src}
                alt={lang === "en" ? photo.titleEn : photo.titleBn}
                loading={i === 0 ? "eager" : "lazy"}
              />
              <div className="gallery-caption">
                <strong>{lang === "en" ? photo.titleEn : photo.titleBn}</strong>
                {lang === "en" ? photo.captionEn : photo.captionBn}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="gallery-footer">
        <div className="gallery-controls">
          <button type="button" className="gallery-btn" onClick={() => go(-1)} aria-label="Previous">
            ‹
          </button>
          <div className="gallery-dots">
            {galleryPhotos.map((photo, i) => (
              <button
                key={photo.src}
                type="button"
                className={`gallery-dot${i === index ? " active" : ""}`}
                onClick={() => pickSlide(i)}
                aria-label={`Slide ${i + 1}`}
              />
            ))}
          </div>
          <button type="button" className="gallery-btn" onClick={() => go(1)} aria-label="Next">
            ›
          </button>
        </div>

        <div className="gallery-thumbs-shell" ref={thumbsShellRef}>
          <div className="gallery-thumbs" ref={thumbsRef}>
            {galleryPhotos.map((photo, i) => (
              <button
                key={`thumb-${photo.src}`}
                type="button"
                className={`gallery-thumb${i === index ? " active" : ""}${photo.graphic ? " graphic" : ""}`}
                onClick={() => pickSlide(i)}
                aria-label={lang === "en" ? photo.titleEn : photo.titleBn}
              >
                <img src={photo.src} alt="" loading="lazy" />
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function AnimatedCounter({ target, suffix }) {
  const [count, setCount] = useState(null);
  const ref = useRef(null);
  const ran = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;

    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting || ran.current) return;
      ran.current = true;
      observer.disconnect();

      if (target === "2001") {
        setCount(2001);
        return;
      }

      const numeric = parseInt(target.replace(/,/g, ""), 10) || 0;
      const duration = 1200;
      const start = performance.now();

      const tick = (now) => {
        const t = Math.min((now - start) / duration, 1);
        const eased = 1 - (1 - t) ** 3;
        setCount(Math.floor(numeric * eased));
        if (t < 1) requestAnimationFrame(tick);
        else setCount(numeric);
      };
      requestAnimationFrame(tick);
    }, { threshold: 0.35, rootMargin: "0px 0px -5% 0px" });

    observer.observe(el);
    return () => observer.disconnect();
  }, [target]);

  const isYear = target === "2001";
  if (isYear) return <span ref={ref}>2001</span>;
  const display = count === null ? target.replace(/,/g, "") : count.toLocaleString();
  return (
    <span ref={ref}>
      {display}
      {suffix ? <span>{suffix}</span> : null}
    </span>
  );
}

export default function USDOHomepage() {
  const [lang, setLang] = useState("en");
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    let ticking = false;
    const handler = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const next = window.scrollY > 40;
        setScrolled((prev) => (prev === next ? prev : next));
        ticking = false;
      });
    };
    handler();
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  useEffect(() => {
    if (!menuOpen) return undefined;
    const scrollY = window.scrollY;
    const { style } = document.body;
    style.position = "fixed";
    style.top = `-${scrollY}px`;
    style.left = "0";
    style.right = "0";
    style.width = "100%";
    style.overflow = "hidden";
    return () => {
      style.position = "";
      style.top = "";
      style.left = "";
      style.right = "";
      style.width = "";
      style.overflow = "";
      window.scrollTo(0, scrollY);
    };
  }, [menuOpen]);

  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 1024) setMenuOpen(false);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  return (
    <>
      <style>{styles}</style>
      <div className="usdo-root">

        {/* NAV */}
        <nav className={`nav${scrolled ? " is-scrolled" : ""}`}>
          <div className="nav-logo">
            <div className="nav-logo-mark">
              <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5">
                <path d="M12 2C8 6 4 8 4 13a8 8 0 0016 0c0-5-4-7-8-11z"/>
                <path d="M12 8v8M9 13h6" strokeLinecap="round"/>
              </svg>
            </div>
            <div className="nav-org-name">Uttaran Social Development Organization</div>
          </div>
          <div className="nav-actions">
            <button
              type="button"
              className="nav-toggle"
              aria-expanded={menuOpen}
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              onClick={() => setMenuOpen((o) => !o)}
            >
              {menuOpen ? "✕" : "☰"}
            </button>
          </div>
          {menuOpen && (
            <button
              type="button"
              className="nav-backdrop"
              aria-label="Close menu"
              onClick={() => setMenuOpen(false)}
            />
          )}
          <ul className={`nav-links${menuOpen ? " is-open" : ""}`}>
            <li><a href="#mission" onClick={() => setMenuOpen(false)}>About</a></li>
            <li><a href="#programs" onClick={() => setMenuOpen(false)}>Programs</a></li>
            <li><a href="#gallery" onClick={() => setMenuOpen(false)}>Projects</a></li>
            <li><a href="#impact" onClick={() => setMenuOpen(false)}>Impact</a></li>
            <li><a href="#news" onClick={() => setMenuOpen(false)}>News</a></li>
            <li><a href="#" className="nav-donate" onClick={() => setMenuOpen(false)}>Donate</a></li>
            <li>
              <button
                type="button"
                className="nav-lang"
                onClick={() => {
                  setLang((l) => (l === "en" ? "bn" : "en"));
                  setMenuOpen(false);
                }}
              >
                {lang === "en" ? "বাংলা" : "English"}
              </button>
            </li>
          </ul>
        </nav>

        {/* HERO */}
        <section className="hero">
          <div className="hero-bg-pattern" />
          <div className="hero-left">
            <div className="hero-eyebrow fade-up">
              {lang === "en" ? "Since 2001 · Dighirpar, Bangladesh" : "২০০১ থেকে · দিঘিরপার, বাংলাদেশ"}
            </div>
            <h1 className="hero-title fade-up-2">
              {lang === "en" ? (
                <>Building a more <em>equitable,</em> healthier Bangladesh</>
              ) : (
                <>একটি <em>ন্যায়সংগত,</em> সুস্বাস্থ্যের বাংলাদেশ গড়ছি</>
              )}
            </h1>
            {lang === "bn" && (
              <p className="hero-subtitle fade-up-3">
                উত্তরণ সামাজিক উন্নয়ন সংস্থা শিক্ষা, স্বাস্থ্য ও সংস্কৃতির মাধ্যমে সমাজের পিছিয়ে পড়া মানুষদের জীবন উন্নত করতে কাজ করছে।
              </p>
            )}
            {lang === "en" && (
              <p className="hero-subtitle fade-up-3">
                USDO is a non-governmental organization working on education, healthcare, social equality, and cultural preservation — empowering marginal communities across Dhaka Division since 2001.
              </p>
            )}
            <div className="hero-actions fade-up-4">
              <button className="btn-primary">
                {lang === "en" ? "Explore Our Work" : "আমাদের কাজ দেখুন"} →
              </button>
              <button className="btn-secondary">
                {lang === "en" ? "Donate Now" : "দান করুন"} →
              </button>
            </div>
          </div>
          <div className="hero-right">
            <div className="hero-img-bg">
              <img
                className="hero-photo"
                src={img("community-garden.jpeg")}
                alt={lang === "en" ? "USDO community members tending a shared garden" : "উত্তরণ সম্প্রদায়ের সদস্যরা যৌথ বাগানে কাজ করছেন"}
              />
            </div>
            <div className="hero-img-overlay" />
            <div className="hero-since">
              <span>Est.</span>
              <strong>2001</strong>
            </div>
            <div className="hero-card-float">
              <div className="hero-card-label">Featured Initiative</div>
              <div className="hero-card-name">🌟 Rukon Uddin Ahmed Autism School</div>
              <div className="hero-card-sub">Opening Soon · Keranigang & Munshiganj</div>
            </div>
          </div>
        </section>

        {/* IMPACT STRIP */}
        <section id="impact" className="impact-strip">
          {impactData.map((item, i) => (
            <div className="impact-item" key={i}>
              <div className="impact-num">
                <AnimatedCounter target={item.num} suffix={item.suffix} />
              </div>
              <div className="impact-label">{item.label}</div>
              {i < impactData.length - 1 && <div className="impact-divider" />}
            </div>
          ))}
        </section>

        {/* MISSION */}
        <section id="mission" className="mission">
          <div className="mission-left">
            <div className="mission-quote-mark">"</div>
            <p className="mission-text">
              {lang === "en"
                ? "To contribute to sustainable development, intercultural dialogue, and the eradication of poverty — ensuring good health and education for all."
                : "টেকসই উন্নয়ন, আন্তঃসাংস্কৃতিক সংলাপ এবং দারিদ্র্য বিমোচনে অবদান রাখা — সবার জন্য সুস্বাস্থ্য ও শিক্ষা নিশ্চিত করা।"}
            </p>
            <div className="mission-attr">
              <div className="mission-attr-line" />
              <div className="mission-attr-text">USDO Mission Statement</div>
            </div>
          </div>
          <div className="mission-right">
            <div className="mission-tag">Who We Are</div>
            <h2 className="mission-heading">
              {lang === "en" ? "Rooted in community. Driven by purpose." : "সমাজে প্রোথিত। উদ্দেশ্যে পরিচালিত।"}
            </h2>
            <p className="mission-body">
              Founded in 2001 in Munshiganj, USDO has grown into a trusted force for change across Dhaka Division. We integrate culture into development strategies — because lasting change requires both social progress and the preservation of what makes communities whole.
            </p>
            <p className="mission-body">
              From mobile health teams reaching remote villages, to autism-specialized schools, to architectural conservation in Dhaka — every initiative is guided by the belief that <em>every person deserves dignity, health, and opportunity.</em>
            </p>
            <div className="mission-pillars">
              {["Education", "Health", "Social Equality", "Cultural Heritage", "Environment", "Special Needs"].map(p => (
                <span key={p} className="pillar-chip">{p}</span>
              ))}
            </div>
          </div>
        </section>

        <PhotoGallery lang={lang} />

        {/* PROGRAMS */}
        <section id="programs" className="programs">
          <div className="section-header">
            <div>
              <div className="section-eyebrow">What We Do</div>
              <div className="section-title">Our Programs</div>
            </div>
            <a href="#" className="section-link">View all programs →</a>
          </div>
          <div className="programs-grid">
            {/* Featured autism card */}
            <div className="prog-card prog-featured" style={{ borderTop: `4px solid ${colors.gold}` }}>
              <div className="prog-featured-visual">
                <div className="prog-autism-badge">Opening Soon</div>
                <div className="prog-featured-visual-inner">
                  <img
                    src={img("education-award.jpeg")}
                    alt="USDO education program — student recognition ceremony"
                  />
                </div>
              </div>
              <div className="prog-card-body" style={{ display:"flex", flexDirection:"column", justifyContent:"center" }}>
                <div className="prog-icon" style={{ background: colors.goldLight, fontSize:"24px" }}>🧩</div>
                <div className="prog-name">Rukon Uddin Ahmed Autism School</div>
                <p className="prog-desc">
                  Dedicated specialized schools opening in Keranigang and Munshiganj Sadar — bringing expert autism care to children and families who need it most. In partnership with UNICEF guidelines on early intervention.
                </p>
                <div style={{ marginTop:"1.25rem" }}>
                  <button className="btn-primary" style={{ fontSize:"13px", padding:"10px 20px" }}>
                    Learn More →
                  </button>
                </div>
              </div>
            </div>

            {programs.slice(0, 4).map((prog, i) => (
              <div className="prog-card" key={i} style={{ borderTop: `4px solid ${prog.color}` }}>
                <div className="prog-card-body">
                  <div className="prog-icon" style={{ background: prog.bg, fontSize:"22px" }}>
                    {prog.icon}
                  </div>
                  <div className="prog-name">{prog.name}</div>
                  <p className="prog-desc">{prog.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* SPOTLIGHT */}
        <section className="spotlight">
          <div className="spotlight-left">
            <div className="spotlight-img-block">
              <img
                className="spotlight-photo"
                src={img("community-outreach.jpeg")}
                alt="USDO community outreach — meeting families across Bangladesh"
              />
              <div className="spotlight-img-caption">
                {lang === "en"
                  ? "Uttaran Qurbani Season 2 — delivering Eid meat to low-income families across Bangladesh"
                  : "উত্তরণ কুরবানি সিজন ২ — সারা বাংলাদেশে নিম্নআয়ের পরিবারের দোরগোড়ায় ঈদের মাংস পৌঁছে দেওয়া"}
              </div>
            </div>
          </div>
          <div className="spotlight-right">
            <div className="spotlight-tag">Project Spotlight</div>
            <h2 className="spotlight-heading">
              Uttaran Qurbani Season 2: Delivering Hope, Home to Home
            </h2>
            <p className="spotlight-body">
              On the occasion of Eid-ul-Azha, USDO launched "Uttaran Qurbani Season 2" — a community-driven initiative to deliver sacrificial meat directly to low-income and underprivileged families in different parts of the country. Our core objective: <em>the right meat to the right people's homes.</em>
            </p>
            <div className="spotlight-facts">
              <div className="fact-item">
                <div className="fact-num">2nd</div>
                <div className="fact-label">Season running</div>
              </div>
              <div className="fact-item">
                <div className="fact-num">100%</div>
                <div className="fact-label">Community-funded</div>
              </div>
              <div className="fact-item">
                <div className="fact-num">∞</div>
                <div className="fact-label">Volunteer-powered</div>
              </div>
              <div className="fact-item">
                <div className="fact-num">Eid</div>
                <div className="fact-label">Annual tradition</div>
              </div>
            </div>
            <button className="btn-primary">Read the full story →</button>
          </div>
        </section>

        {/* NEWS */}
        <section id="news" className="news">
          <div className="section-header" style={{ position:"relative", zIndex:1 }}>
            <div>
              <div className="section-eyebrow">Latest Updates</div>
              <div className="section-title">News & Stories</div>
            </div>
            <a href="#" className="section-link" style={{ color: colors.gold }}>All stories →</a>
          </div>
          <div className="news-grid">
            {news.map((item, i) => (
              <div className="news-card" key={i}>
                <div className="news-date">{item.date}</div>
                <div className="news-headline">{item.headline}</div>
                <p className="news-snippet">{item.snippet}</p>
                <div className="news-tag">#{item.tag}</div>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="cta-section">
          <div className="cta-card cta-card-donate">
            <div className="cta-card-icon">❤️</div>
            <div className="cta-card-title">
              {lang === "en" ? "Support our mission with a donation" : "দান করে আমাদের সহায়তা করুন"}
            </div>
            <p className="cta-card-body">
              Every contribution — large or small — directly funds health camps, education programs, and community development. Your generosity changes lives in Dighirpar and beyond.
            </p>
            <button className="btn-white">Donate Now →</button>
            <div className="payment-methods">
              <span style={{ fontSize:"11px", color:"rgba(255,255,255,0.5)" }}>Pay via:</span>
              <span className="pay-badge">bKash</span>
              <span className="pay-badge">Nagad</span>
              <span className="pay-badge">Bank Transfer</span>
            </div>
          </div>
          <div className="cta-card cta-card-volunteer">
            <div className="cta-card-icon">🤝</div>
            <div className="cta-card-title" style={{ color: colors.bark }}>
              Volunteer with us &amp; build something lasting
            </div>
            <p className="cta-card-body">
              Whether you're a doctor, teacher, organizer, or student — your skills can transform lives. Join our growing network of dedicated volunteers across Bangladesh.
            </p>
            <button className="btn-bark">Join as a Volunteer →</button>
            <div style={{ marginTop:"1.25rem", fontSize:"12px", color: colors.textLight }}>
              ✦ Partner institutions welcome · CSR collaborations open
            </div>
          </div>
        </section>

        {/* FOOTER */}
        <footer className="footer">
          <div className="footer-grid">
            <div className="footer-brand">
              <div className="footer-logo">
                <div className="footer-logo-mark">
                  <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="white" strokeWidth="1.5">
                    <path d="M12 2C8 6 4 8 4 13a8 8 0 0016 0c0-5-4-7-8-11z"/>
                    <path d="M12 8v8M9 13h6" strokeLinecap="round"/>
                  </svg>
                </div>
                <div className="footer-org">Uttaran Social Development Organization</div>
              </div>
              <p className="footer-tagline">
                USDO is a non-governmental organization working on all addressable social and cultural development issues. Est. 2001, Munshiganj, Bangladesh.
              </p>
              <a href="mailto:usdobd.org@gmail.com" className="footer-email">usdobd.org@gmail.com</a>
            </div>
            <div>
              <div className="footer-col-title">Organization</div>
              <ul className="footer-links">
                {["About Us", "Our Team", "History", "Annual Reports", "Registration"].map(l => (
                  <li key={l}><a href="#">{l}</a></li>
                ))}
              </ul>
            </div>
            <div>
              <div className="footer-col-title">Programs</div>
              <ul className="footer-links">
                {["Education", "Healthcare", "Social Equality", "Heritage", "Autism Schools"].map(l => (
                  <li key={l}><a href="#">{l}</a></li>
                ))}
              </ul>
            </div>
            <div>
              <div className="footer-col-title">Get Involved</div>
              <ul className="footer-links">
                {["Donate", "Volunteer", "Partner With Us", "Contact", "Newsroom"].map(l => (
                  <li key={l}><a href="#">{l}</a></li>
                ))}
              </ul>
              <div style={{ marginTop:"1.5rem" }}>
                <div className="footer-col-title">Location</div>
                <p style={{ fontSize:"12px", lineHeight:"1.7" }}>
                  Dighirpar, Munshiganj<br />
                  Dhaka Division, Bangladesh 1211
                </p>
              </div>
            </div>
          </div>
          <div className="footer-bottom">
            <div className="footer-copy">© 2026 Uttaran Social Development Organization. All rights reserved.</div>
            <div className="footer-reg">USDO · Nonprofit · Dighirpar, Dhaka Division, Bangladesh</div>
          </div>
        </footer>

        {/* STICKY DONATE */}
        <button className="sticky-donate">
          ❤️ {lang === "en" ? "Donate" : "দান করুন"}
        </button>

      </div>
    </>
  );
}
