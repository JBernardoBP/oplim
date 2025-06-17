document.addEventListener("DOMContentLoaded", function () {
  // Mobile menu toggle
  const menuBtn = document.querySelector(".mobile-menu-btn");
  const navMenu = document.querySelector("nav ul");

  menuBtn.addEventListener("click", () => {
    menuBtn.classList.toggle("active");
    navMenu.classList.toggle("active");
  });

  // Close menu when clicking a link
  document.querySelectorAll("nav a").forEach((link) => {
    link.addEventListener("click", () => {
      menuBtn.classList.remove("active");
      navMenu.classList.remove("active");
    });
  });

  // Theme toggle
  const themeToggle = document.getElementById("theme-toggle");
  const themeIcon = themeToggle.querySelector(".theme-icon");

  // Check for saved theme preference or use system preference
  const savedTheme = localStorage.getItem("theme");
  const systemPrefersDark = window.matchMedia(
    "(prefers-color-scheme: dark)"
  ).matches;

  if (savedTheme === "dark" || (!savedTheme && systemPrefersDark)) {
    document.body.classList.add("dark-mode");
    themeIcon.textContent = "☀️";
  }

  // Theme toggle button
  themeToggle.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
    const isDark = document.body.classList.contains("dark-mode");
    themeIcon.textContent = isDark ? "☀️" : "🌙";
    localStorage.setItem("theme", isDark ? "dark" : "light");
  });

  // Watch for system theme changes
  window
    .matchMedia("(prefers-color-scheme: dark)")
    .addEventListener("change", (e) => {
      const newTheme = e.matches ? "dark" : "light";
      document.body.classList.toggle("dark-mode", newTheme === "dark");
      themeIcon.textContent = newTheme === "dark" ? "☀️" : "🌙";
      localStorage.setItem("theme", newTheme);
    });

  // Form submission
  const contactForm = document.getElementById("contact-form");
  if (contactForm) {
    contactForm.addEventListener("submit", async function (e) {
      e.preventDefault();

      const submitBtn = this.querySelector('button[type="submit"]');
      const btnText = submitBtn.querySelector(".btn-text");
      const spinner = submitBtn.querySelector(".loading-spinner");
      const formStatus = document.getElementById("form-status");

      // Show loading state
      submitBtn.disabled = true;
      btnText.textContent = "Sending...";
      spinner.style.display = "block";
      formStatus.style.display = "none";

      try {
        // Simulate form submission
        await new Promise((resolve) => setTimeout(resolve, 1500));

        // Show success message
        formStatus.textContent =
          "Thank you! Your message has been sent. We'll get back to you soon.";
        formStatus.className = "success";
        contactForm.reset();
      } catch (error) {
        // Show error message
        formStatus.textContent =
          "There was an error sending your message. Please try again later.";
        formStatus.className = "error";
      } finally {
        // Reset button state
        submitBtn.disabled = false;
        btnText.textContent = "Send Message";
        spinner.style.display = "none";
        formStatus.style.display = "block";
      }
    });
  }

  // Scroll animations
  const animateOnScroll = () => {
    const elements = document.querySelectorAll(".animate-on-scroll");
    elements.forEach((el) => {
      const elementTop = el.getBoundingClientRect().top;
      const windowHeight = window.innerHeight;

      if (elementTop < windowHeight - 100) {
        el.classList.add("animate-in");
      }
    });
  };

  // Initial check
  animateOnScroll();

  // Check on scroll
  window.addEventListener("scroll", animateOnScroll);

  // Set current year in footer
  document.getElementById("current-year").textContent =
    new Date().getFullYear();

  // Logo animation on load
  const logo = document.querySelector(".logo-hover");
  if (logo) {
    logo.style.transform = "scale(0.8)";
    setTimeout(() => {
      logo.style.transform = "scale(1)";
    }, 300);
  }

  // Progress bar animation
  const progressBar = document.querySelector(".progress-bar");
  if (progressBar) {
    setTimeout(() => {
      progressBar.style.width = "100%";
    }, 500);
  }

  // Typewriter effect - Versão melhorada
  const typedText = document.querySelector(".typed-text");
  const heroTitle = document.querySelector(".hero-title");

  if (typedText && heroTitle) {
    const wordGroups = [
      {
        prefix: "Your money.",
        words: ["Effortlessly", "Smartly", "Oplim", "Proactively"],
      },
      { prefix: "Oplim", words: ["Innovates", "Simplifies", "Empowers"] },
    ];

    let groupIndex = 0;
    let wordIndex = 0;
    let animationInterval;

    function rotateWords() {
      const currentGroup = wordGroups[groupIndex % wordGroups.length];
      const currentWord =
        currentGroup.words[wordIndex % currentGroup.words.length];

      // Atualiza o texto
      heroTitle.innerHTML = `${currentGroup.prefix} <span class="typed-text rotate-words">${currentWord}</span>`;

      // Adiciona a animação
      const typedElement = heroTitle.querySelector(".typed-text");
      typedElement.style.animation = "none";
      void typedElement.offsetWidth; // Trigger reflow
      typedElement.style.animation = "rotateWords 6s infinite";

      wordIndex++;
      if (wordIndex % currentGroup.words.length === 0) {
        groupIndex++;
      }
    }

    // Inicia o efeito
    rotateWords();
    animationInterval = setInterval(rotateWords, 3000);

    // Limpa o intervalo quando a página é desfocada para performance
    document.addEventListener("visibilitychange", () => {
      if (document.hidden) {
        clearInterval(animationInterval);
      } else {
        rotateWords();
        animationInterval = setInterval(rotateWords, 3000);
      }
    });
  }

  // Ripple effect for button
  const buttons = document.querySelectorAll("[data-ripple]");
  buttons.forEach((button) => {
    button.addEventListener("click", function (e) {
      e.preventDefault();
      const x = e.clientX - e.target.getBoundingClientRect().left;
      const y = e.clientY - e.target.getBoundingClientRect().top;

      const ripple = document.createElement("span");
      ripple.className = "ripple-effect";
      ripple.style.left = `${x}px`;
      ripple.style.top = `${y}px`;

      this.appendChild(ripple);

      setTimeout(() => {
        ripple.remove();
      }, 1000);
    });
  });
});

// Cookie Consent Banner
function initCookieBanner() {
  if (!localStorage.getItem("cookieConsent")) {
    const banner = document.createElement("div");
    banner.innerHTML = `
      <div class="cookie-banner" style="position:fixed; bottom:0; background:#1e1e1e; color:white; padding:1rem; width:100%; z-index:1000; display:flex; justify-content:space-between; align-items:center;">
        <p>We use cookies to enhance your experience. <a href="cookies.html" style="color:var(--primary-light);">Learn more</a></p>
        <div>
          <button id="accept-cookies" style="background:var(--primary); color:white; border:none; padding:0.5rem 1rem; margin-right:1rem; cursor:pointer;">Accept</button>
          <button id="reject-cookies" style="background:transparent; color:white; border:1px solid white; padding:0.5rem 1rem; cursor:pointer;">Reject</button>
        </div>
      </div>
    `;
    document.body.appendChild(banner);

    document.getElementById("accept-cookies").addEventListener("click", () => {
      localStorage.setItem("cookieConsent", "accepted");
      banner.remove();
    });

    document.getElementById("reject-cookies").addEventListener("click", () => {
      localStorage.setItem("cookieConsent", "rejected");
      banner.remove();
      // Optional: Disable non-essential cookies here
    });
  }
}

// Run on page load
document.addEventListener("DOMContentLoaded", initCookieBanner);

function openCookieSettings() {
  const panel = document.createElement("div");
  panel.innerHTML = `
    <div class="cookie-settings-panel">
      <div class="panel-header">
        <h3>Cookie Preferences</h3>
        <button class="close-panel">&times;</button>
      </div>
      <div class="panel-body">
        <div class="cookie-category">
          <div class="category-header">
            <h4>Essential Cookies</h4>
            <label class="toggle-switch">
              <input type="checkbox" checked disabled>
              <span class="slider"></span>
            </label>
          </div>
          <p>Required for basic site functionality. Cannot be disabled.</p>
        </div>
        
        <div class="cookie-category">
          <div class="category-header">
            <h4>Performance Cookies</h4>
            <label class="toggle-switch">
              <input type="checkbox" id="performance-cookies" checked>
              <span class="slider"></span>
            </label>
          </div>
          <p>Help us understand how visitors interact with our site.</p>
        </div>
        
        <div class="cookie-category">
          <div class="category-header">
            <h4>Marketing Cookies</h4>
            <label class="toggle-switch">
              <input type="checkbox" id="marketing-cookies">
              <span class="slider"></span>
            </label>
          </div>
          <p>Used to personalize ads and measure ad performance.</p>
        </div>
      </div>
      <div class="panel-footer">
        <button class="save-settings">Save Preferences</button>
      </div>
    </div>
    <div class="panel-overlay"></div>
  `;
  document.body.appendChild(panel);

  // Close panel functionality
  panel.querySelector(".close-panel").addEventListener("click", () => {
    panel.remove();
  });

  panel.querySelector(".save-settings").addEventListener("click", () => {
    const performance = document.getElementById("performance-cookies").checked;
    const marketing = document.getElementById("marketing-cookies").checked;
    localStorage.setItem(
      "cookieSettings",
      JSON.stringify({ performance, marketing })
    );
    panel.remove();
    alert("Preferences saved!");
  });
}
