// Vue.js application for Bhaskar's portfolio
const { createApp, ref, onMounted } = Vue;

const app = createApp({
  setup() {
    // Mobile menu state
    const mobileMenuOpen = ref(false);

    // Scroll to top button state
    const showScrollToTop = ref(false);

    // Toggle mobile menu
    const toggleMobileMenu = () => {
      mobileMenuOpen.value = !mobileMenuOpen.value;
    };

    // Close mobile menu
    const closeMobileMenu = () => {
      mobileMenuOpen.value = false;
    };

    // Scroll to top function
    const scrollToTop = () => {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    };

    // Download resume function
    const downloadResume = () => {
      alert("Resume download functionality will be implemented soon!");
      // This would typically trigger a download of your resume file
    };

    // Private visit logging (set your own webhook URL)
    const trackPrivateVisit = async () => {
      const visitLogEndpoint =
        "https://script.google.com/macros/s/AKfycbztjcwten-b9S_rSEZkh3XVMMO07gAoT6DslyubeVuXSoFv5MQyxXhBHTFYc_VGc4-W/exec";
      if (!visitLogEndpoint) {
        return;
      }

      try {
        await fetch(visitLogEndpoint, {
          method: "POST",
          mode: "no-cors",
          headers: {
            "Content-Type": "text/plain;charset=utf-8",
          },
          body: JSON.stringify({
            visitedAt: new Date().toISOString(),
            websiteUrl: window.location.href,
            userAgent: navigator.userAgent,
            timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
          }),
          keepalive: true,
        });
      } catch (error) {
        console.error("Unable to log visit:", error);
      }
    };

    // Project data
    const projects = ref([
      {
        id: 1,
        title: "MicroGPT Reasoning Model",
        description:
          "Engineered a lightweight transformer module incorporating chain-of-thought reasoning (inspired by O1) to break down complex tasks and support multi-step logical reasoning in natural language.",
        icon: "fa-robot",
        gradient: "from-blue-600 to-purple-600",
        tags: ["Transformers", "NLP"],
        status: "",
        link: "#",
      },
      {
        id: 2,
        title: "NotebookLM Clone",
        description:
          "Built a NotebookLM-inspired AI workspace that lets users interact with uploaded knowledge sources through contextual chat and summarization workflows.",
        icon: "fa-book-open",
        gradient: "from-amber-500 to-orange-600",
        tags: ["LLMs", "RAG", "Full Stack"],
        status: "",
        link: "https://github.com/bhaskar0210s/notebooklm-clone",
      },
      {
        id: 3,
        title: "Hand Written Recognition",
        description:
          "Interactive web application that recognizes handwritten digits (0-9) using machine learning models. Draw digits on the canvas and get real-time predictions with confidence scores.",
        icon: "fa-pen-fancy",
        gradient: "from-purple-600 to-pink-600",
        tags: ["CNNs", "Web App"],
        status: "",
        link: "https://bhaskar0210s.github.io/Hand-Written-Recognition/",
      },
      {
        id: 4,
        title: "AirCursor",
        description:
          "Building an Apple Vision-style interaction system where users control the mouse through coordinated eye gaze and fingertip pointing.",
        icon: "fa-hand-pointer",
        gradient: "from-cyan-600 to-blue-600",
        tags: ["Computer Vision", "Eye + Hand Tracking"],
        status: "Under Development",
        link: "https://github.com/bhaskar0210s/air-cursor",
      },
    ]);

    // Simple starry background animation
    const initStarryBackground = () => {
      const canvas = document.getElementById("starryCanvas");
      const ctx = canvas.getContext("2d");

      // Set canvas size
      const resizeCanvas = () => {
        const dpr = window.devicePixelRatio || 1;
        canvas.width = window.innerWidth * dpr;
        canvas.height = window.innerHeight * dpr;
        canvas.style.width = window.innerWidth + "px";
        canvas.style.height = window.innerHeight + "px";
        ctx.scale(dpr, dpr);
      };

      resizeCanvas();
      window.addEventListener("resize", resizeCanvas);

      // Simple Star class
      class Star {
        constructor() {
          this.x = Math.random() * window.innerWidth;
          this.y = Math.random() * window.innerHeight;
          this.size = Math.random() * 2 + 0.5;
          this.speed = Math.random() * 0.3 + 0.1;
          this.opacity = Math.random() * 0.8 + 0.2;
          this.twinkleSpeed = Math.random() * 0.02 + 0.01;
          this.twinklePhase = Math.random() * Math.PI * 2;
          this.baseOpacity = this.opacity;
        }

        update() {
          this.twinklePhase += this.twinkleSpeed;
          this.opacity = this.baseOpacity + Math.sin(this.twinklePhase) * 0.3;

          // Move stars slowly
          this.y += this.speed;
          if (this.y > window.innerHeight) {
            this.y = 0;
            this.x = Math.random() * window.innerWidth;
          }
        }

        draw() {
          ctx.globalAlpha = this.opacity;
          ctx.fillStyle = "#ffffff";
          ctx.beginPath();
          ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      // Initialize stars
      const stars = [];
      const numStars = Math.min(
        Math.floor((window.innerWidth * window.innerHeight) / 15000),
        25
      );

      for (let i = 0; i < numStars; i++) {
        stars.push(new Star());
      }

      let lastTime = 0;
      const targetFPS = 30;
      const frameInterval = 1000 / targetFPS;

      // Animation loop
      const animate = (currentTime) => {
        if (currentTime - lastTime >= frameInterval) {
          ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

          stars.forEach((star) => {
            star.update();
            star.draw();
          });

          lastTime = currentTime;
        }

        requestAnimationFrame(animate);
      };

      animate(0);
    };

    // Handle scroll events for animations
    onMounted(() => {
      // Initialize starry background
      initStarryBackground();
      trackPrivateVisit();

      // Add intersection observer for scroll animations
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add("opacity-100", "translate-y-0");
              entry.target.classList.remove("opacity-0", "translate-y-10");
            }
          });
        },
        { threshold: 0.1 }
      );

      // Observe all sections
      document.querySelectorAll("section").forEach((section) => {
        section.classList.add(
          "transition-all",
          "duration-1000",
          "opacity-0",
          "translate-y-10"
        );
        observer.observe(section);
      });

      // Add scroll event for navbar and scroll to top button
      window.addEventListener("scroll", () => {
        const nav = document.querySelector("nav");
        if (window.scrollY > 50) {
          nav.classList.add("shadow-lg");
        } else {
          nav.classList.remove("shadow-lg");
        }

        // Show/hide scroll to top button
        showScrollToTop.value = window.scrollY > 300;
      });

      // Close mobile menu when clicking outside
      document.addEventListener("click", (e) => {
        if (mobileMenuOpen.value && !e.target.closest("nav")) {
          mobileMenuOpen.value = false;
        }
      });
    });

    return {
      mobileMenuOpen,
      toggleMobileMenu,
      closeMobileMenu,
      projects,
      downloadResume,
      showScrollToTop,
      scrollToTop,
    };
  },
});

app.mount("#app");
