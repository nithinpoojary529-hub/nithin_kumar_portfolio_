/**
 * NITHIN KUMAR - DEVELOPER PORTFOLIO JAVASCRIPT
 * Modern, accessible, vanilla ES6+ interactions
 */

document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  /* ------------------------------------------------------------------------
     1. Theme Switcher (Dark / Light Mode with localStorage & OS detection)
     ------------------------------------------------------------------------ */
  const themeToggle = document.getElementById('themeToggle');
  const htmlRoot = document.documentElement;
  const themeMeta = document.querySelector('meta[name="theme-color"]');

  // Determine initial theme: check saved preference or OS preference
  const savedTheme = localStorage.getItem('nk_theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const initialTheme = savedTheme || (prefersDark ? 'dark' : 'light');

  applyTheme(initialTheme);

  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const currentTheme = htmlRoot.getAttribute('data-theme') || 'light';
      const newTheme = currentTheme === 'light' ? 'dark' : 'light';
      applyTheme(newTheme);
      showToast(`Switched to ${newTheme.toUpperCase()} theme`, 'success');
    });
  }

  function applyTheme(theme) {
    htmlRoot.setAttribute('data-theme', theme);
    localStorage.setItem('nk_theme', theme);
    if (themeMeta) {
      themeMeta.setAttribute('content', theme === 'dark' ? '#0b0f19' : '#2563eb');
    }
  }

  /* ------------------------------------------------------------------------
     2. Sticky Header & Back-to-Top Button Visibility
     ------------------------------------------------------------------------ */
  const header = document.getElementById('header');
  const backToTopBtn = document.getElementById('backToTopBtn');

  window.addEventListener('scroll', () => {
    const scrollPos = window.scrollY || window.pageYOffset;

    // Sticky header shadow
    if (header) {
      if (scrollPos > 30) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    }

    // Back to top floating button
    if (backToTopBtn) {
      if (scrollPos > 400) {
        backToTopBtn.classList.add('visible');
      } else {
        backToTopBtn.classList.remove('visible');
      }
    }

    // ScrollSpy: highlight active nav link
    updateActiveNavLink();
  }, { passive: true });

  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  /* ------------------------------------------------------------------------
     3. ScrollSpy: Active Link Highlight
     ------------------------------------------------------------------------ */
  const sections = document.querySelectorAll('section[id]');
  const desktopNavLinks = document.querySelectorAll('.desktop-nav .nav-link');
  const drawerLinks = document.querySelectorAll('.drawer-nav .drawer-link');

  function updateActiveNavLink() {
    const scrollY = window.pageYOffset;

    sections.forEach(current => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop - 120;
      const sectionId = current.getAttribute('id');

      if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
        desktopNavLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
          }
        });

        drawerLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
          }
        });
      }
    });
  }

  /* ------------------------------------------------------------------------
     4. Mobile Navigation Drawer Controls
     ------------------------------------------------------------------------ */
  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  const drawerCloseBtn = document.getElementById('drawerCloseBtn');
  const mobileDrawer = document.getElementById('mobileDrawer');
  const drawerBackdrop = document.getElementById('drawerBackdrop');

  function openMobileMenu() {
    if (!mobileDrawer || !drawerBackdrop) return;
    mobileDrawer.classList.add('active');
    drawerBackdrop.classList.add('active');
    mobileDrawer.setAttribute('aria-hidden', 'false');
    if (mobileMenuBtn) mobileMenuBtn.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
  }

  function closeMobileMenu() {
    if (!mobileDrawer || !drawerBackdrop) return;
    mobileDrawer.classList.remove('active');
    drawerBackdrop.classList.remove('active');
    mobileDrawer.setAttribute('aria-hidden', 'true');
    if (mobileMenuBtn) mobileMenuBtn.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }

  if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener('click', openMobileMenu);
  }

  if (drawerCloseBtn) {
    drawerCloseBtn.addEventListener('click', closeMobileMenu);
  }

  if (drawerBackdrop) {
    drawerBackdrop.addEventListener('click', closeMobileMenu);
  }

  // Close drawer when any nav link inside is clicked
  drawerLinks.forEach(link => {
    link.addEventListener('click', () => {
      closeMobileMenu();
    });
  });

  // Close on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      if (mobileDrawer && mobileDrawer.classList.contains('active')) {
        closeMobileMenu();
      }
      if (resumeModalBackdrop && resumeModalBackdrop.classList.contains('active')) {
        closeResumeModal();
      }
    }
  });

  /* ------------------------------------------------------------------------
     5. Skills Categorization Tabs
     ------------------------------------------------------------------------ */
  const skillTabs = document.querySelectorAll('.skills-tabs .tab-btn');
  const skillGroups = document.querySelectorAll('.skills-category-group');

  skillTabs.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetCategory = btn.getAttribute('data-tab');

      // Update active state of tabs
      skillTabs.forEach(b => {
        b.classList.remove('active');
        b.setAttribute('aria-selected', 'false');
      });
      btn.classList.add('active');
      btn.setAttribute('aria-selected', 'true');

      // Filter groups
      skillGroups.forEach(group => {
        const groupCategory = group.getAttribute('data-category');
        if (targetCategory === 'all' || groupCategory === targetCategory) {
          group.classList.remove('hidden');
        } else {
          group.classList.add('hidden');
        }
      });
    });
  });

  /* ------------------------------------------------------------------------
     6. Projects Filter Tabs
     ------------------------------------------------------------------------ */
  const projectFilters = document.querySelectorAll('.projects-filter-bar .filter-btn');
  const projectCards = document.querySelectorAll('.projects-grid .project-card');

  projectFilters.forEach(btn => {
    btn.addEventListener('click', () => {
      const filterValue = btn.getAttribute('data-filter');

      projectFilters.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      projectCards.forEach(card => {
        const categories = card.getAttribute('data-project-category') || '';
        if (filterValue === 'all' || categories.includes(filterValue)) {
          card.style.display = 'flex';
          card.style.opacity = '1';
        } else {
          card.style.display = 'none';
          card.style.opacity = '0';
        }
      });
    });
  });

  /* ------------------------------------------------------------------------
     7. Copy to Clipboard Functionality (Email & Phone)
     ------------------------------------------------------------------------ */
  const copyButtons = document.querySelectorAll('.btn-copy');

  copyButtons.forEach(btn => {
    btn.addEventListener('click', async () => {
      const textToCopy = btn.getAttribute('data-copy');
      if (!textToCopy) return;

      try {
        await navigator.clipboard.writeText(textToCopy);
        showToast(`Copied to clipboard: ${textToCopy}`, 'success');

        // Visual indicator on the button
        const originalHtml = btn.innerHTML;
        btn.innerHTML = `<svg class="icon-sm" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>`;
        btn.style.color = 'var(--success)';

        setTimeout(() => {
          btn.innerHTML = originalHtml;
          btn.style.color = '';
        }, 2000);
      } catch (err) {
        // Fallback for older browsers
        const tempInput = document.createElement('input');
        tempInput.value = textToCopy;
        document.body.appendChild(tempInput);
        tempInput.select();
        document.execCommand('copy');
        document.body.removeChild(tempInput);
        showToast(`Copied: ${textToCopy}`, 'success');
      }
    });
  });

  /* ------------------------------------------------------------------------
     8. Toast Notification System
     ------------------------------------------------------------------------ */
  const toastContainer = document.getElementById('toastContainer');

  function showToast(message, type = 'info') {
    if (!toastContainer) return;

    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.innerHTML = `
      <span class="toast-icon">✓</span>
      <span class="toast-message">${message}</span>
    `;

    toastContainer.appendChild(toast);

    setTimeout(() => {
      toast.classList.add('toast-hide');
      setTimeout(() => {
        if (toast.parentNode) {
          toast.parentNode.removeChild(toast);
        }
      }, 300);
    }, 3200);
  }

  /* ------------------------------------------------------------------------
     9. Interactive Contact Form Handler (Client validation & Mailto)
     ------------------------------------------------------------------------ */
  const contactForm = document.getElementById('contactForm');

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const nameInput = document.getElementById('senderName');
      const emailInput = document.getElementById('senderEmail');
      const subjectInput = document.getElementById('messageSubject');
      const messageInput = document.getElementById('messageBody');

      let isValid = true;

      // Validate Name
      if (!nameInput.value.trim()) {
        nameInput.parentElement.classList.add('has-error');
        isValid = false;
      } else {
        nameInput.parentElement.classList.remove('has-error');
      }

      // Validate Email
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailInput.value.trim() || !emailRegex.test(emailInput.value.trim())) {
        emailInput.parentElement.classList.add('has-error');
        isValid = false;
      } else {
        emailInput.parentElement.classList.remove('has-error');
      }

      // Validate Message
      if (!messageInput.value.trim()) {
        messageInput.parentElement.classList.add('has-error');
        isValid = false;
      } else {
        messageInput.parentElement.classList.remove('has-error');
      }

      if (!isValid) {
        showToast('Please fill in all required fields accurately.', 'warning');
        return;
      }

      // Construct mailto link
      const toEmail = 'nithinpoojary529@gmail.com';
      const subject = encodeURIComponent(subjectInput.value.trim() || 'Software Engineering Inquiry');
      const body = encodeURIComponent(
        `Hello Nithin,\n\nName: ${nameInput.value.trim()}\nEmail: ${emailInput.value.trim()}\n\nMessage:\n${messageInput.value.trim()}\n\n--- Sent from Nithin Kumar Portfolio Website`
      );

      showToast('Launching email client...', 'success');

      // Trigger mailto link
      window.location.href = `mailto:${toEmail}?subject=${subject}&body=${body}`;

      // Reset form
      contactForm.reset();
    });

    // Clear error on input
    contactForm.querySelectorAll('.form-control').forEach(input => {
      input.addEventListener('input', () => {
        input.parentElement.classList.remove('has-error');
      });
    });
  }

  /* ------------------------------------------------------------------------
     10. Resume Modal Logic
     ------------------------------------------------------------------------ */
  const openResumeBtn = document.getElementById('openResumeBtn');
  const mobileResumeBtn = document.getElementById('mobileResumeBtn');
  const closeResumeModalBtn = document.getElementById('closeResumeModalBtn');
  const closeModalFooterBtn = document.getElementById('closeModalFooterBtn');
  const resumeModalBackdrop = document.getElementById('resumeModalBackdrop');
  const printResumeBtn = document.getElementById('printResumeBtn');

  function openResumeModal() {
    if (!resumeModalBackdrop) return;
    resumeModalBackdrop.classList.add('active');
    resumeModalBackdrop.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    closeMobileMenu();
  }

  function closeResumeModal() {
    if (!resumeModalBackdrop) return;
    resumeModalBackdrop.classList.remove('active');
    resumeModalBackdrop.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  if (openResumeBtn) openResumeBtn.addEventListener('click', openResumeModal);
  if (mobileResumeBtn) mobileResumeBtn.addEventListener('click', openResumeModal);
  if (closeResumeModalBtn) closeResumeModalBtn.addEventListener('click', closeResumeModal);
  if (closeModalFooterBtn) closeModalFooterBtn.addEventListener('click', closeResumeModal);

  if (resumeModalBackdrop) {
    resumeModalBackdrop.addEventListener('click', (e) => {
      if (e.target === resumeModalBackdrop) {
        closeResumeModal();
      }
    });
  }

  if (printResumeBtn) {
    printResumeBtn.addEventListener('click', () => {
      window.print();
    });
  }

  /* ------------------------------------------------------------------------
     11. Dynamic Year
     ------------------------------------------------------------------------ */
  const yearSpan = document.getElementById('currentYear');
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }

  /* ------------------------------------------------------------------------
     12. Profile Image Fallback Handling
     ------------------------------------------------------------------------ */
  const profileImg = document.getElementById('profileImg');
  if (profileImg) {
    profileImg.addEventListener('error', function errorHandler() {
      // If profile.jpg is missing or broken, display an elegant initials avatar placeholder
      if (this.src.indexOf('data:image/svg+xml') === -1) {
        this.src = "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 200 250' width='200' height='250'><rect width='200' height='250' fill='%231e293b'/><circle cx='100' cy='95' r='45' fill='%233b82f6'/><path d='M40 210 c0 -35 25 -55 60 -55 s60 20 60 55' fill='%233b82f6'/><text x='100' y='105' font-family='sans-serif' font-size='28' font-weight='700' fill='white' text-anchor='middle'>NK</text></svg>";
      }
    });
  }
});
