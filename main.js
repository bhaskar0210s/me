// Vue.js application for Bhaskar's portfolio
const { createApp, ref, onMounted } = Vue;

const app = createApp({
  setup() {
    // Mobile menu state
    const mobileMenuOpen = ref(false);

    // Toggle mobile menu
    const toggleMobileMenu = () => {
      mobileMenuOpen.value = !mobileMenuOpen.value;
    };

    // Close mobile menu
    const closeMobileMenu = () => {
      mobileMenuOpen.value = false;
    };

    // Download resume function
    const downloadResume = () => {
      alert("Resume download functionality will be implemented soon!");
      // This would typically trigger a download of your resume file
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
        status: "🚧 In Development",
        link: "#",
      },
      {
        id: 2,
        title: "Handwritten Math Solver",
        description:
          "Developed a personal project that converts handwritten equations into computed results using a custom CNN for character recognition — utilizing GANs for data augmentation and VAEs for noise reduction.",
        icon: "fa-square-root-variable",
        gradient: "from-green-600 to-teal-600",
        tags: ["CNNs", "GANs", "VAEs"],
        status: "🚧 In Development",
        link: "#",
      },
    ]);

    // Handle scroll events for animations
    onMounted(() => {
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

      // Add scroll event for navbar
      window.addEventListener("scroll", () => {
        const nav = document.querySelector("nav");
        if (window.scrollY > 50) {
          nav.classList.add("shadow-lg");
        } else {
          nav.classList.remove("shadow-lg");
        }
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
    };
  },
});

app.mount("#app");
