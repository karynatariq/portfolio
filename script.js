(() => {
  'use strict';

  // --- Spotlight Effect ---
  const spotlight = document.getElementById('spotlight');
  const spotlightInner = document.getElementById('spotlightInner');
  let mouseX = 0, mouseY = 0, spotX = 0, spotY = 0, innerX = 0, innerY = 0;

  if (spotlight && spotlightInner) {
    document.addEventListener('mousemove', (e) => { mouseX = e.clientX; mouseY = e.clientY; });
    (function loop() {
      spotX += (mouseX - spotX) * 0.04; spotY += (mouseY - spotY) * 0.04;
      spotlight.style.left = spotX + 'px'; spotlight.style.top = spotY + 'px';
      innerX += (mouseX - innerX) * 0.08; innerY += (mouseY - innerY) * 0.08;
      spotlightInner.style.left = innerX + 'px'; spotlightInner.style.top = innerY + 'px';
      requestAnimationFrame(loop);
    })();
    document.querySelectorAll('.project-card,.skill-card,.featured-project,.timeline__content,.btn').forEach((el) => {
      el.addEventListener('mouseenter', () => { spotlight.classList.add('active'); spotlightInner.classList.add('active'); });
      el.addEventListener('mouseleave', () => { spotlight.classList.remove('active'); spotlightInner.classList.remove('active'); });
    });
  }

  // --- Background Particles ---
  const canvas = document.getElementById('particles');
  if (canvas) {
    const ctx = canvas.getContext('2d'); let pts = [];
    function resize() { canvas.width = window.innerWidth; canvas.height = window.innerHeight; }
    resize(); window.addEventListener('resize', resize);
    class P {
      constructor() { this.reset(); }
      reset() { this.x=Math.random()*canvas.width; this.y=Math.random()*canvas.height; this.s=Math.random()*1.5+0.5; this.sx=(Math.random()-0.5)*0.3; this.sy=(Math.random()-0.5)*0.3; this.o=Math.random()*0.4+0.1; this.h=Math.random()>0.5?260:45; }
      update() { this.x+=this.sx; this.y+=this.sy; if(this.x<0||this.x>canvas.width||this.y<0||this.y>canvas.height) this.reset(); }
      draw() { ctx.beginPath(); ctx.arc(this.x,this.y,this.s,0,Math.PI*2); ctx.fillStyle=this.h===260?`rgba(108,60,224,${this.o})`:`rgba(212,175,55,${this.o*0.6})`; ctx.fill(); }
    }
    for(let i=0;i<50;i++) pts.push(new P());
    (function loop(){ ctx.clearRect(0,0,canvas.width,canvas.height); pts.forEach(p=>{p.update();p.draw();}); requestAnimationFrame(loop); })();
  }

  // ============================================================
  // MULTI-EFFECT SYSTEM (default: golden embers)
  // ============================================================
  let currentFx = 'embers';
  const fxColors = {
    sparkle: ['#d4af37','#e8c957','#f5e17d','#6c3ce0','#8b5cf6','#a78bfa','#fff'],
    smoke: ['rgba(108,60,224,0.5)','rgba(139,92,246,0.4)','rgba(212,175,55,0.3)','rgba(167,139,250,0.3)'],
    embers: ['#d4af37','#e8c957','#ff8c00','#ff6b00','#ff4500'],
    code: ['#6c3ce0','#8b5cf6','#d4af37','#4ade80','#22d3ee'],
    ink: ['rgba(108,60,224,0.6)','rgba(30,20,60,0.7)','rgba(212,175,55,0.3)'],
    lightning: ['#fff','#d4af37','#8b5cf6']
  };
  const codeChars = '01{}[]<>/=;()const let async await return =>'.split('');

  function createFx(x, y) {
    const fx = currentFx;
    if (fx === 'none') return;
    const el = document.createElement('div');
    const c = fxColors[fx] || fxColors.embers;
    const color = c[Math.floor(Math.random() * c.length)];

    if (fx === 'sparkle') {
      el.className = Math.random()>0.5 ? 'fx-particle star' : 'fx-particle';
      const s=Math.random()*8+3, a=Math.random()*Math.PI*2, d=Math.random()*120+40;
      el.style.cssText = `left:${x}px;top:${y}px;width:${s}px;height:${s}px;background:${color};box-shadow:0 0 ${s*2}px ${color};--dx:${Math.cos(a)*d}px;--dy:${Math.sin(a)*d-30}px;--rot:${Math.random()*360}deg;--dur:${0.6+Math.random()*0.6}s;`;
    } else if (fx === 'embers') {
      el.className = 'fx-ember';
      const s=Math.random()*5+2;
      el.style.cssText = `left:${x}px;top:${y}px;width:${s}px;height:${s}px;background:${color};box-shadow:0 0 ${s*3}px ${color},0 0 ${s*6}px ${color};--dx:${(Math.random()-0.5)*40}px;--dy:${-80-Math.random()*120}px;--dur:${1.5+Math.random()*1.5}s;`;
    } else if (fx === 'smoke') {
      el.className = 'fx-smoke';
      const s=Math.random()*60+30;
      el.style.cssText = `left:${x}px;top:${y}px;width:${s}px;height:${s}px;background:radial-gradient(circle,${color},transparent);--dx:${(Math.random()-0.5)*60}px;--dy:${-40-Math.random()*80}px;--dur:${1+Math.random()}s;`;
    } else if (fx === 'code') {
      el.className = 'fx-code';
      el.textContent = codeChars[Math.floor(Math.random()*codeChars.length)];
      el.style.cssText = `left:${x}px;top:${y-20}px;color:${color};text-shadow:0 0 8px ${color};--dy:${60+Math.random()*80}px;--dur:${0.8+Math.random()*0.8}s;`;
    } else if (fx === 'ink') {
      el.className = 'fx-ink';
      const s=Math.random()*40+15;
      el.style.cssText = `left:${x}px;top:${y}px;width:${s}px;height:${s}px;background:radial-gradient(circle,${color},transparent 70%);--dur:${0.6+Math.random()*0.5}s;`;
    } else if (fx === 'lightning') {
      el.className = 'fx-bolt';
      const w=Math.random()*3+1, h=Math.random()*80+40, sk=(Math.random()-0.5)*40;
      el.style.cssText = `left:${x}px;top:${y}px;width:${w}px;height:${h}px;background:linear-gradient(180deg,transparent,${color},transparent);box-shadow:0 0 10px ${color},0 0 30px ${color};transform:skewX(${sk}deg);--dur:${0.15+Math.random()*0.2}s;`;
      setTimeout(() => { const b=el.cloneNode(); b.style.left=(x+(Math.random()-0.5)*30)+'px'; document.body.appendChild(b); setTimeout(()=>b.remove(),400); }, 50);
    }
    document.body.appendChild(el);
    setTimeout(() => el.remove(), 3000);
  }

  function burstFx(el) {
    if (currentFx === 'none') return;
    const r = el.getBoundingClientRect();
    const count = currentFx === 'lightning' ? 3 : Math.min(Math.floor(r.width / 15), 25);
    for (let i = 0; i < count; i++) {
      const x = r.left + Math.random() * r.width;
      const y = r.top + Math.random() * r.height * 0.5;
      setTimeout(() => createFx(x, y), Math.random() * 250);
    }
  }

  // ============================================================
  // MAGIC QUILL TYPEWRITER
  // ============================================================
  function typeWrite(el, onDone) {
    const text = el.getAttribute('data-text') || '';
    el.textContent = ''; el.classList.remove('done');
    let i = 0;
    function next() {
      if (i < text.length) {
        const span = document.createElement('span');
        span.className = 'typewriter-glow'; span.textContent = text[i];
        el.appendChild(span);
        const cr = span.getBoundingClientRect();
        createFx(cr.right, cr.top + cr.height / 2);
        if (Math.random() > 0.4) createFx(cr.right + 2, cr.top + cr.height * 0.3);
        i++; setTimeout(next, 35 + Math.random() * 45);
      } else {
        setTimeout(() => { el.classList.add('done'); if (onDone) onDone(); }, 400);
      }
    }
    next();
  }

  const typeName = document.getElementById('typeName');
  const typeTagline = document.getElementById('typeTagline');
  const typeDot = document.getElementById('typeDot');

  function startHeroTypewriter() {
    if (!typeName || !typeTagline) return;
    setTimeout(() => {
      typeWrite(typeName, () => {
        if (typeDot) typeDot.classList.add('show');
        burstFx(typeName.parentElement);
        setTimeout(() => { typeWrite(typeTagline, () => burstFx(typeTagline.parentElement)); }, 300);
      });
    }, 600);
  }

  let twObs;
  function setupScrollTypewriters() {
    const els = document.querySelectorAll('.typewriter-scroll');
    if (!('IntersectionObserver' in window)) { els.forEach(e => { e.textContent = e.getAttribute('data-text'); }); return; }
    if (twObs) twObs.disconnect();
    twObs = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !entry.target.classList.contains('done')) {
          setTimeout(() => typeWrite(entry.target), 200);
          twObs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -20px 0px' });
    els.forEach(e => {
      if (!e.classList.contains('done')) twObs.observe(e);
    });
  }

  // ============================================================
  // SCROLL REVEAL ENGINE
  // ============================================================
  function reveal(el, delay) {
    setTimeout(() => { el.classList.add('visible'); burstFx(el); }, delay);
  }

  const soloElements = document.querySelectorAll('[data-animate]');
  const staggerContainers = document.querySelectorAll('[data-stagger]');

  // Assign direction classes once
  staggerContainers.forEach((container) => {
    const dir = container.getAttribute('data-stagger-dir') || 'up';
    Array.from(container.children).forEach((child, i) => {
      if (dir === 'alternate') child.classList.add(i % 2 === 0 ? 'stagger-from-left' : 'stagger-from-right');
      else if (dir === 'left') child.classList.add('stagger-from-left');
      else if (dir === 'right') child.classList.add('stagger-from-right');
    });
  });

  // Observers (module-level so replay can re-use them)
  let soloObs, staggerObs;

  function initObservers() {
    if (!('IntersectionObserver' in window)) {
      soloElements.forEach(el => el.classList.add('visible'));
      staggerContainers.forEach(c => Array.from(c.children).forEach(el => el.classList.add('visible')));
      return;
    }

    soloObs = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          reveal(entry.target, parseInt(entry.target.getAttribute('data-delay') || '0', 10));
          soloObs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.08, rootMargin: '0px 0px -60px 0px' });
    soloElements.forEach(el => soloObs.observe(el));

    staggerObs = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const gap = parseInt(entry.target.getAttribute('data-stagger') || '100', 10);
          Array.from(entry.target.children).forEach((child, i) => reveal(child, gap * i));
          staggerObs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.05, rootMargin: '0px 0px -40px 0px' });
    staggerContainers.forEach(el => staggerObs.observe(el));

    // Safety fallback
    setTimeout(() => {
      document.querySelectorAll('[data-animate],[data-stagger] > *').forEach(el => {
        if (!el.classList.contains('visible')) {
          const r = el.getBoundingClientRect();
          if (r.top < window.innerHeight && r.bottom > 0) el.classList.add('visible');
        }
      });
    }, 1500);
  }

  // ============================================================
  // REPLAY (called when switching effects)
  // ============================================================
  function replayAll() {
    // 1. Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });

    // 2. After a moment, reset everything and replay
    setTimeout(() => {
      // Reset all animated elements
      document.querySelectorAll('[data-animate].visible').forEach(el => el.classList.remove('visible'));
      document.querySelectorAll('[data-stagger] > .visible').forEach(el => el.classList.remove('visible'));

      // Reset typewriters
      document.querySelectorAll('.typewriter-scroll').forEach(el => { el.textContent = ''; el.classList.remove('done'); });
      if (typeName) { typeName.textContent = ''; typeName.classList.remove('done'); }
      if (typeTagline) { typeTagline.textContent = ''; typeTagline.classList.remove('done'); }
      if (typeDot) typeDot.classList.remove('show');

      // Disconnect old observers
      if (soloObs) soloObs.disconnect();
      if (staggerObs) staggerObs.disconnect();

      // Re-init everything
      setTimeout(() => {
        initObservers();
        setupScrollTypewriters();
        startHeroTypewriter();
      }, 300);
    }, 400);
  }

  // ============================================================
  // EFFECT SWITCHER UI
  // ============================================================
  const fxToggle = document.getElementById('fxToggle');
  const fxMenu = document.getElementById('fxMenu');

  if (fxToggle && fxMenu) {
    fxToggle.addEventListener('click', () => fxMenu.classList.toggle('open'));
    document.addEventListener('click', (e) => { if (!e.target.closest('.fx-switcher')) fxMenu.classList.remove('open'); });

    fxMenu.querySelectorAll('.fx-btn').forEach((btn) => {
      btn.addEventListener('click', () => {
        fxMenu.querySelectorAll('.fx-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        currentFx = btn.getAttribute('data-fx');
        fxMenu.classList.remove('open');
        replayAll();
      });
    });
  }

  // ============================================================
  // INIT
  // ============================================================
  startHeroTypewriter();
  setupScrollTypewriters();
  initObservers();

  // ============================================================
  // NAV CLICK → REPLAY SECTION ANIMATIONS
  // ============================================================
  function replaySection(section) {
    if (!section) return;

    // Reset animated elements in this section
    section.querySelectorAll('[data-animate].visible').forEach(el => el.classList.remove('visible'));
    section.querySelectorAll('[data-stagger] > .visible').forEach(el => el.classList.remove('visible'));

    // Reset typewriter titles in this section
    section.querySelectorAll('.typewriter-scroll').forEach(el => {
      el.textContent = '';
      el.classList.remove('done');
    });

    // After scroll settles, trigger reveals and typewriters
    setTimeout(() => {
      // Reveal solo animated elements with their delays
      section.querySelectorAll('[data-animate]').forEach(el => {
        reveal(el, parseInt(el.getAttribute('data-delay') || '0', 10));
      });

      // Reveal stagger containers
      section.querySelectorAll('[data-stagger]').forEach(container => {
        const gap = parseInt(container.getAttribute('data-stagger') || '100', 10);
        Array.from(container.children).forEach((child, i) => reveal(child, gap * i));
      });

      // Trigger typewriter on section titles
      section.querySelectorAll('.typewriter-scroll').forEach(el => {
        if (twObs) twObs.unobserve(el);
        setTimeout(() => typeWrite(el), 200);
      });
    }, 500);
  }

  // --- Navbar ---
  const nav = document.getElementById('nav');
  window.addEventListener('scroll', () => nav.classList.toggle('nav--scrolled', window.scrollY > 50));

  // --- Mobile Nav ---
  const navToggle = document.getElementById('navToggle');
  const navLinks = document.getElementById('navLinks');
  if (navToggle && navLinks) {
    navToggle.addEventListener('click', () => { navToggle.classList.toggle('active'); navLinks.classList.toggle('active'); });
    navLinks.querySelectorAll('.nav__link,.btn').forEach(link => {
      link.addEventListener('click', () => { navToggle.classList.remove('active'); navLinks.classList.remove('active'); });
    });
  }

  // Nav link click: scroll to section then replay its animations
  document.querySelectorAll('.nav__link').forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = link.getAttribute('href').replace('#', '');
      const section = document.getElementById(targetId);
      if (!section) return;
      section.scrollIntoView({ behavior: 'smooth' });
      replaySection(section);
    });
  });

  // --- Active Section ---
  const sections = document.querySelectorAll('section[id]');
  const navLinkEls = document.querySelectorAll('.nav__link');
  window.addEventListener('scroll', () => {
    let cur = '';
    sections.forEach(s => { if (window.scrollY >= s.offsetTop - 200) cur = s.id; });
    navLinkEls.forEach(l => { l.style.color = l.getAttribute('href') === '#' + cur ? 'var(--accent-gold)' : ''; });
  });

  // --- Magnetic Buttons ---
  document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('mousemove', (e) => {
      const r = btn.getBoundingClientRect();
      btn.style.transform = `translate(${(e.clientX-r.left-r.width/2)*0.15}px,${(e.clientY-r.top-r.height/2)*0.15}px)`;
    });
    btn.addEventListener('mouseleave', () => { btn.style.transform = ''; });
  });

  // --- Card Tilt ---
  document.querySelectorAll('.project-card,.skill-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const r = card.getBoundingClientRect();
      const x = (e.clientX-r.left)/r.width-0.5, y = (e.clientY-r.top)/r.height-0.5;
      card.style.transform = `perspective(800px) rotateY(${x*5}deg) rotateX(${-y*5}deg) translateY(-4px)`;
    });
    card.addEventListener('mouseleave', () => { card.style.transform = ''; });
  });
})();
