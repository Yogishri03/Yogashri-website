document.addEventListener('DOMContentLoaded', () => {
  // ==========================================
  // 1. Dark Mode / Theme Toggle
  // ==========================================
  const themeToggleBtn = document.getElementById('theme-toggle');
  const themeToggleDarkIcon = document.getElementById('theme-toggle-dark-icon');
  const themeToggleLightIcon = document.getElementById('theme-toggle-light-icon');

  // Change the icons inside the button based on previous settings
  if (localStorage.getItem('color-theme') === 'dark' || (!('color-theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
    themeToggleLightIcon.classList.remove('hidden');
    themeToggleDarkIcon.classList.add('hidden');
    document.documentElement.classList.add('dark');
  } else {
    themeToggleLightIcon.classList.add('hidden');
    themeToggleDarkIcon.classList.remove('hidden');
    document.documentElement.classList.remove('dark');
  }

  themeToggleBtn.addEventListener('click', () => {
    // Toggle icons inside button
    themeToggleDarkIcon.classList.toggle('hidden');
    themeToggleLightIcon.classList.toggle('hidden');

    // If set via local storage previously
    if (localStorage.getItem('color-theme')) {
      if (localStorage.getItem('color-theme') === 'light') {
        document.documentElement.classList.add('dark');
        localStorage.setItem('color-theme', 'dark');
      } else {
        document.documentElement.classList.remove('dark');
        localStorage.setItem('color-theme', 'light');
      }
    } else {
      // If not set previously
      if (document.documentElement.classList.contains('dark')) {
        document.documentElement.classList.remove('dark');
        localStorage.setItem('color-theme', 'light');
      } else {
        document.documentElement.classList.add('dark');
        localStorage.setItem('color-theme', 'dark');
      }
    }
  });

  // ==========================================
  // 2. Mobile Hamburger Menu Toggle
  // ==========================================
  const mobileMenuButton = document.getElementById('mobile-menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');
  const mobileMenuLinks = document.querySelectorAll('.mobile-menu-link');

  function toggleMenu() {
    mobileMenu.classList.toggle('hidden');
    mobileMenu.classList.toggle('flex');
    
    // Toggle hamburger icon states
    const burgerIcon = mobileMenuButton.querySelector('.burger-icon');
    const closeIcon = mobileMenuButton.querySelector('.close-icon');
    if (burgerIcon && closeIcon) {
      burgerIcon.classList.toggle('hidden');
      closeIcon.classList.toggle('hidden');
    }
  }

  mobileMenuButton.addEventListener('click', toggleMenu);

  mobileMenuLinks.forEach(link => {
    link.addEventListener('click', () => {
      // Close menu when a link is clicked
      if (!mobileMenu.classList.contains('hidden')) {
        toggleMenu();
      }
    });
  });

  // ==========================================
  // 3. Typing Effect (Hero Section)
  // ==========================================
  // Using Typed.js library via script tag, wait for it to load
  if (typeof Typed !== 'undefined') {
    new Typed('#typing-text', {
      strings: [
        'Full Stack Java Developer',
        'AI & Data Science Graduate',
        'Machine Learning Enthusiast',
        'Problem Solver'
      ],
      typeSpeed: 50,
      backSpeed: 30,
      backDelay: 2000,
      loop: true,
      cursorChar: '|'
    });
  } else {
    // Fallback simple native typing effect
    const words = [
      'Full Stack Java Developer',
      'AI & Data Science Graduate',
      'Machine Learning Enthusiast',
      'Problem Solver'
    ];
    let i = 0;
    let timer;

    function typingEffect() {
      let word = words[i].split("");
      var loopTyping = function() {
        if (word.length > 0) {
          document.getElementById('typing-text').innerHTML += word.shift();
        } else {
          setTimeout(deletingEffect, 2000);
          return false;
        }
        timer = setTimeout(loopTyping, 70);
      };
      loopTyping();
    }

    function deletingEffect() {
      let word = words[i].split("");
      var loopDeleting = function() {
        if (word.length > 0) {
          word.pop();
          document.getElementById('typing-text').innerHTML = word.join("");
        } else {
          if (words.length > (i + 1)) {
            i++;
          } else {
            i = 0;
          }
          setTimeout(typingEffect, 500);
          return false;
        }
        timer = setTimeout(loopDeleting, 45);
      };
      loopDeleting();
    }
    
    const typingSpan = document.getElementById('typing-text');
    if (typingSpan) {
      // Add cursor class
      typingSpan.classList.add('border-r-2', 'border-primary', 'dark:border-accent', 'pr-1');
      typingEffect();
    }
  }

  // ==========================================
  // 4. Scroll Active Navigation Link Highlight
  // ==========================================
  const sections = document.querySelectorAll('section');
  const navLinks = document.querySelectorAll('.nav-link');

  window.addEventListener('scroll', () => {
    let currentSectionId = '';
    
    // Determine which section is currently on screen
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 120; // offset navbar height
      const sectionHeight = section.clientHeight;
      if (window.pageYOffset >= sectionTop) {
        currentSectionId = section.getAttribute('id');
      }
    });

    // Toggle active link styling
    navLinks.forEach(link => {
      link.classList.remove('text-primary', 'dark:text-accent', 'font-semibold');
      link.classList.add('text-slate-600', 'dark:text-slate-300');
      
      if (link.getAttribute('href') === `#${currentSectionId}`) {
        link.classList.add('text-primary', 'dark:text-accent', 'font-semibold');
        link.classList.remove('text-slate-600', 'dark:text-slate-300');
      }
    });
  });

  // ==========================================
  // 5. Count-Up Animation (About Section)
  // ==========================================
  const statsSection = document.getElementById('about');
  const statNumbers = document.querySelectorAll('.stat-number');
  let hasAnimatedStats = false;

  const countUp = (element) => {
    const target = parseInt(element.getAttribute('data-target'), 10);
    const speed = 2000 / target; // count finishes in 2 seconds
    let count = 0;

    const updateCount = () => {
      if (count < target) {
        count++;
        element.innerText = count + (element.getAttribute('data-suffix') || '');
        setTimeout(updateCount, speed);
      } else {
        element.innerText = target + (element.getAttribute('data-suffix') || '');
      }
    };

    updateCount();
  };

  // ==========================================
  // 6. Skill Progress Bars Animation
  // ==========================================
  const skillsSection = document.getElementById('skills');
  const progressBars = document.querySelectorAll('.progress-bar-fill');
  let hasAnimatedSkills = false;

  const animateSkills = () => {
    progressBars.forEach(bar => {
      const width = bar.getAttribute('data-width');
      bar.style.width = width;
    });
  };

  // Intersection Observer for Statistics and Skills Section
  const observerOptions = {
    root: null,
    threshold: 0.2
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        if (entry.target.id === 'about' && !hasAnimatedStats) {
          statNumbers.forEach(num => countUp(num));
          hasAnimatedStats = true;
        }
        if (entry.target.id === 'skills' && !hasAnimatedSkills) {
          animateSkills();
          hasAnimatedSkills = true;
        }
      }
    });
  }, observerOptions);

  if (statsSection) observer.observe(statsSection);
  if (skillsSection) observer.observe(skillsSection);

  // ==========================================
  // 7. Contact Form Handling & Validation
  // ==========================================
  const contactForm = document.getElementById('contact-form');
  const formStatus = document.getElementById('form-status');

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = document.getElementById('name').value.trim();
      const email = document.getElementById('email').value.trim();
      const subject = document.getElementById('subject').value.trim();
      const message = document.getElementById('message').value.trim();

      if (!name || !email || !subject || !message) {
        showStatus('Please fill in all fields.', 'error');
        return;
      }

      if (!validateEmail(email)) {
        showStatus('Please enter a valid email address.', 'error');
        return;
      }

      // Simulate sending email
      showStatus('Sending message...', 'info');
      
      setTimeout(() => {
        showStatus('Thank you! Your message has been sent successfully.', 'success');
        contactForm.reset();
      }, 1500);
    });
  }

  function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  }

  function showStatus(msg, type) {
    if (!formStatus) return;
    
    formStatus.innerText = msg;
    formStatus.className = 'mt-4 text-sm font-medium transition-all duration-300 p-3 rounded-lg ';

    if (type === 'error') {
      formStatus.className += 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400 border border-red-200 dark:border-red-900/50';
    } else if (type === 'success') {
      formStatus.className += 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-900/50';
    } else {
      formStatus.className += 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400 border border-blue-200 dark:border-blue-900/50';
    }
    
    formStatus.classList.remove('hidden');
    
    if (type === 'success') {
      setTimeout(() => {
        formStatus.classList.add('opacity-0');
        setTimeout(() => {
          formStatus.classList.add('hidden');
          formStatus.classList.remove('opacity-0');
        }, 500);
      }, 5000);
    }
  }

  // ==========================================
  // 8. AOS & Lucide Icons Initialization
  // ==========================================
  if (typeof lucide !== 'undefined') {
    lucide.createIcons();
  }

  if (typeof AOS !== 'undefined') {
    AOS.init({
      duration: 800,
      easing: 'ease-out-cubic',
      once: true,
      offset: 50
    });
  }
});
