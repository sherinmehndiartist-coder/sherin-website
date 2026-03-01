import { createClient } from '@supabase/supabase-js'

// Supabase Initialization
// NOTE: Provide proper URL and KEY here
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://placeholder-supabase-url.supabase.co';
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'placeholder-key';
export const supabase = createClient(supabaseUrl, supabaseKey);

// Navigation & Scroll Logic
const header = document.getElementById('header');
const menuToggle = document.getElementById('menu-toggle');
const navLinks = document.getElementById('nav-links');

if (header) {
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });
}

if (menuToggle && navLinks) {
  menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');

    // Animate hamburger
    const hamburger = menuToggle.querySelector('.hamburger');
    if (navLinks.classList.contains('active')) {
      hamburger.style.background = 'transparent';
      hamburger.style.setProperty('--pseudo-top', '0');
      hamburger.style.setProperty('--pseudo-bottom', '0');
      hamburger.style.setProperty('--pseudo-rotate-before', '45deg');
      hamburger.style.setProperty('--pseudo-rotate-after', '-45deg');
    } else {
      hamburger.style.background = 'var(--text-primary)';
    }
  });

  // Close menu when clicking a link (mobile)
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('active');
    });
  });
}

// Fade In Animation using Intersection Observer
const fadeElements = document.querySelectorAll('.fade-in');
if (fadeElements.length > 0) {
  const appearOptions = {
    threshold: 0,
    rootMargin: "0px 0px -100px 0px"
  };

  const appearOnScroll = new IntersectionObserver(function (entries, observer) {
    entries.forEach(entry => {
      if (!entry.isIntersecting) {
        return;
      } else {
        entry.target.classList.add('appear');
        observer.unobserve(entry.target);
      }
    });
  }, appearOptions);

  fadeElements.forEach(el => {
    appearOnScroll.observe(el);
  });
}

// Page Loader
window.addEventListener('load', () => {
  const loader = document.getElementById('page-loader');
  if (loader) {
    // Add small delay to ensure smooth skeletal pulse visibility before hiding
    setTimeout(() => {
      loader.classList.add('hidden');
      setTimeout(() => loader.remove(), 500); // Fully remove from DOM
    }, 300);
  }
});
