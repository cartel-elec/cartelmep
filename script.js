/* =====================================================
   CARTEL MULTI-ENGINEERING LTD - Main JavaScript
   ===================================================== */

(function () {
  'use strict';

  // ---------- Mobile Navigation ----------
  const menuToggle = document.querySelector('.menu-toggle');
  const navOverlay = document.querySelector('.nav-overlay');
  const body = document.body;

  if (menuToggle && navOverlay) {
    menuToggle.addEventListener('click', function () {
      const isOpen = navOverlay.classList.toggle('open');
      menuToggle.classList.toggle('active', isOpen);
      menuToggle.setAttribute('aria-expanded', isOpen);
      body.style.overflow = isOpen ? 'hidden' : '';
    });

    // Close on link click
    navOverlay.querySelectorAll('.nav-link').forEach(function (link) {
      link.addEventListener('click', function () {
        navOverlay.classList.remove('open');
        menuToggle.classList.remove('active');
        menuToggle.setAttribute('aria-expanded', 'false');
        body.style.overflow = '';
      });
    });

    // Close on Escape
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && navOverlay.classList.contains('open')) {
        navOverlay.classList.remove('open');
        menuToggle.classList.remove('active');
        menuToggle.setAttribute('aria-expanded', 'false');
        body.style.overflow = '';
      }
    });
  }

  // ---------- Header scroll effect ----------
  const header = document.querySelector('.header');
  if (header) {
    function onScroll() {
      if (window.scrollY > 40) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  // ---------- Active nav link ----------
  // Already handled by adding .active class in each HTML page

  // ---------- Back to top ----------
  const backToTop = document.querySelector('.back-to-top');
  if (backToTop) {
    window.addEventListener('scroll', function () {
      if (window.scrollY > 400) {
        backToTop.classList.add('visible');
      } else {
        backToTop.classList.remove('visible');
      }
    }, { passive: true });

    backToTop.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // ---------- FAQ Accordion ----------
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(function (item) {
    const question = item.querySelector('.faq-question');
    const answer = item.querySelector('.faq-answer');

    if (question && answer) {
      question.addEventListener('click', function () {
        const isActive = item.classList.contains('active');

        // Close all
        faqItems.forEach(function (other) {
          other.classList.remove('active');
          const otherAnswer = other.querySelector('.faq-answer');
          if (otherAnswer) otherAnswer.style.maxHeight = null;
          const otherBtn = other.querySelector('.faq-question');
          if (otherBtn) otherBtn.setAttribute('aria-expanded', 'false');
        });

        // Open clicked if it was closed
        if (!isActive) {
          item.classList.add('active');
          answer.style.maxHeight = answer.scrollHeight + 'px';
          question.setAttribute('aria-expanded', 'true');
        }
      });
    }
  });

  // ---------- Project Filtering ----------
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  if (filterBtns.length && projectCards.length) {
    filterBtns.forEach(function (btn) {
      btn.addEventListener('click', function () {
        const filter = btn.getAttribute('data-filter');

        filterBtns.forEach(function (b) {
          b.classList.remove('active');
          b.setAttribute('aria-pressed', 'false');
        });
        btn.classList.add('active');
        btn.setAttribute('aria-pressed', 'true');

        projectCards.forEach(function (card) {
          const category = card.getAttribute('data-category');
          if (filter === 'all' || category === filter) {
            card.style.display = '';
            // Trigger reflow for animation
            requestAnimationFrame(function () {
              card.style.opacity = '1';
              card.style.transform = 'translateY(0)';
            });
          } else {
            card.style.opacity = '0';
            card.style.transform = 'translateY(10px)';
            setTimeout(function () {
              card.style.display = 'none';
            }, 250);
          }
        });
      });
    });
  }

  // ---------- Scroll Animations (Intersection Observer) ----------
  const fadeElements = document.querySelectorAll('.fade-up');
  if (fadeElements.length && 'IntersectionObserver' in window) {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReduced) {
      fadeElements.forEach(function (el) {
        el.classList.add('visible');
      });
    } else {
      const observer = new IntersectionObserver(
        function (entries) {
          entries.forEach(function (entry) {
            if (entry.isIntersecting) {
              entry.target.classList.add('visible');
              observer.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
      );

      fadeElements.forEach(function (el) {
        observer.observe(el);
      });
    }
  } else {
    fadeElements.forEach(function (el) {
      el.classList.add('visible');
    });
  }

  // ---------- Contact Form (Formspree) ----------
const contactForm = document.getElementById('contactForm');
if (contactForm) {
  contactForm.addEventListener('submit', function (e) {
    e.preventDefault();

    const name = document.getElementById('name');
    const email = document.getElementById('email');
    const phone = document.getElementById('phone');
    const subject = document.getElementById('subject');
    const message = document.getElementById('message');
    const successMsg = document.getElementById('formSuccess');
    const submitBtn = contactForm.querySelector('button[type="submit"]');

    let valid = true;

    // Clear previous errors
    contactForm.querySelectorAll('.error-msg').forEach(el => el.remove());
    [name, email, subject, message].forEach(f => {
      if (f) f.style.borderColor = '';
    });

    function showError(field, msg) {
      valid = false;
      field.style.borderColor = '#ef4444';
      const err = document.createElement('div');
      err.className = 'error-msg';
      err.style.color = '#ef4444';
      err.style.fontSize = '0.8rem';
      err.style.marginTop = '0.3rem';
      err.textContent = msg;
      field.parentNode.appendChild(err);
    }

    if (!name.value.trim()) showError(name, 'Please enter your name.');
    if (!email.value.trim()) {
      showError(email, 'Please enter your email.');
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)) {
      showError(email, 'Please enter a valid email address.');
    }
    if (subject && !subject.value) showError(subject, 'Please select a subject.');
    if (!message.value.trim()) showError(message, 'Please enter your message.');

    if (!valid) return;

    // Send to Formspree
    const originalText = submitBtn.innerHTML;
    submitBtn.disabled = true;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending…';

    fetch(contactForm.action, {
      method: 'POST',
      body: new FormData(contactForm),
      headers: { 'Accept': 'application/json' }
    })
    .then(response => {
      if (response.ok) {
        contactForm.style.display = 'none';
        if (successMsg) {
          successMsg.hidden = false;
          successMsg.style.display = 'block';
        }
        contactForm.reset();
      } else {
        alert('Something went wrong. Please try again or call us.');
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalText;
      }
    })
    .catch(() => {
      alert('Could not send. Please try again or contact us by phone.');
      submitBtn.disabled = false;
      submitBtn.innerHTML = originalText;
    });
  });
}
      // Reset previous errors
      contactForm.querySelectorAll('.error-msg').forEach(function (el) {
        el.remove();
      });
      contactForm.querySelectorAll('.input-error').forEach(function (el) {
        el.classList.remove('input-error');
      });

      function showError(field, msg) {
        valid = false;
        field.classList.add('input-error');
        field.style.borderColor = '#ef4444';
        const err = document.createElement('div');
        err.className = 'error-msg';
        err.style.color = '#ef4444';
        err.style.fontSize = '0.8rem';
        err.style.marginTop = '0.3rem';
        err.textContent = msg;
        field.parentNode.appendChild(err);
      }

      if (!name.value.trim()) showError(name, 'Please enter your name.');
      if (!email.value.trim()) {
        showError(email, 'Please enter your email.');
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)) {
        showError(email, 'Please enter a valid email address.');
      }
      if (subject && !subject.value) showError(subject, 'Please select a subject.');
      if (!message.value.trim()) showError(message, 'Please enter your message.');

      if (valid) {
        // ===== BACKEND CONFIG =====
        // After you deploy the backend, put your API URL here, for example:
        // const API_URL = 'https://your-backend.onrender.com/api/quote';
        // Leave empty to keep the form in demo mode (shows success without sending).
        const API_URL = ''; // <-- PASTE YOUR BACKEND URL HERE

        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const originalBtnText = submitBtn ? submitBtn.innerHTML : '';

        function showSuccess(msg) {
          if (successMsg) {
            contactForm.style.display = 'none';
            successMsg.hidden = false;
            successMsg.style.display = 'block';
            if (msg) {
              const p = successMsg.querySelector('p');
              if (p) p.textContent = msg;
            }
          }
          contactForm.reset();
          [name, email, phone, subject, message].forEach(function (f) {
            if (f) f.style.borderColor = '';
          });
        }

        if (!API_URL) {
          // Demo mode – no backend configured yet
          showSuccess('Thank you! Your message was validated. Connect the form to the backend (see README) to receive real quote requests.');
          return;
        }

        // Send to backend
        if (submitBtn) {
          submitBtn.disabled = true;
          submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending…';
        }

        fetch(API_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name: name.value.trim(),
            email: email.value.trim(),
            phone: phone ? phone.value.trim() : '',
            subject: subject.value,
            message: message.value.trim()
          })
        })
          .then(function (res) { return res.json().then(function (data) { return { ok: res.ok, data: data }; }); })
          .then(function (result) {
            if (result.ok && result.data.success) {
              showSuccess(result.data.message || 'Thank you! We have received your request and will contact you soon.');
            } else {
              alert(result.data.error || 'Something went wrong. Please try again or call us directly.');
              if (submitBtn) {
                submitBtn.disabled = false;
                submitBtn.innerHTML = originalBtnText;
              }
            }
          })
          .catch(function () {
            alert('Could not reach the server. Please try again later or contact us by phone/email.');
            if (submitBtn) {
              submitBtn.disabled = false;
              submitBtn.innerHTML = originalBtnText;
            }
          });
      }
    });

    // Clear error styling on input
    contactForm.querySelectorAll('input, textarea, select').forEach(function (field) {
      field.addEventListener('input', function () {
        field.style.borderColor = '';
        const err = field.parentNode.querySelector('.error-msg');
        if (err) err.remove();
      });
    });
  }

  // ---------- Current year in footer ----------
  const yearEls = document.querySelectorAll('.current-year');
  yearEls.forEach(function (el) {
    el.textContent = new Date().getFullYear();
  });

})();
