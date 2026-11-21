/* ==========================================================================
   CONFIGURAÇÃO — Edite os links abaixo antes de publicar
   ========================================================================== */

const GOOGLE_FORMS_URL = "https://docs.google.com/forms/d/e/1FAIpQLSdHlc8xgtKt1j9A7Llr_vZY_brbmym0kdulgWadSFaTOxz2PA/viewform?usp=publish-editor";
const INSTAGRAM_URL = "https://www.instagram.com/a.cascavet?avpt=bHNoa21mYmx5dzc4";

// URLs opcionais com pré-preenchimento por cor (Google Forms pre-fill)
// Se não configuradas, os botões usam GOOGLE_FORMS_URL
const GOOGLE_FORMS_URL_VERDE = "COLE_AQUI_O_LINK_PREFILL_VERDE"; // ou mesmo valor de GOOGLE_FORMS_URL
const GOOGLE_FORMS_URL_PRETA = "COLE_AQUI_O_LINK_PREFILL_PRETA";

/* ==========================================================================
   Lógica do site — não é necessário editar abaixo
   ========================================================================== */

(function () {
  "use strict";

  const PLACEHOLDER = "COLE_AQUI_O_LINK";

  function isConfigured(url) {
    return url && !url.includes(PLACEHOLDER);
  }

  function getOrderUrl(type) {
    if (type === "verde" && isConfigured(GOOGLE_FORMS_URL_VERDE)) {
      return GOOGLE_FORMS_URL_VERDE;
    }
    if (type === "preta" && isConfigured(GOOGLE_FORMS_URL_PRETA)) {
      return GOOGLE_FORMS_URL_PRETA;
    }
    return GOOGLE_FORMS_URL;
  }

  function applyLinks() {
    document.querySelectorAll(".js-order-link").forEach(function (link) {
      const orderType = link.getAttribute("data-order") || "geral";
      const url = getOrderUrl(orderType);

      if (isConfigured(url)) {
        link.href = url;
        link.target = "_blank";
        link.rel = "noopener noreferrer";
      } else {
        link.href = "#pedido";
        link.addEventListener("click", function (e) {
          if (!isConfigured(url)) {
            e.preventDefault();
            alert("Configure o link do Google Forms em script.js (GOOGLE_FORMS_URL) antes de publicar.");
          }
        });
      }
    });


    document.querySelectorAll(".js-instagram-link").forEach(function (link) {
      if (isConfigured(INSTAGRAM_URL)) {
        link.href = INSTAGRAM_URL;
      } else {
        link.href = "#";
        link.addEventListener("click", function (e) {
          e.preventDefault();
          alert("Configure o link do Instagram em script.js (INSTAGRAM_URL) antes de publicar.");
        });
      }
    });
  }

  function initMobileMenu() {
    const toggle = document.getElementById("menu-toggle");
    const nav = document.getElementById("nav");
    if (!toggle || !nav) return;

    function closeMenu() {
      toggle.setAttribute("aria-expanded", "false");
      toggle.setAttribute("aria-label", "Abrir menu de navegação");
      nav.classList.remove("is-open");
      document.body.style.overflow = "";
    }

    function openMenu() {
      toggle.setAttribute("aria-expanded", "true");
      toggle.setAttribute("aria-label", "Fechar menu de navegação");
      nav.classList.add("is-open");
      document.body.style.overflow = "hidden";
    }

    toggle.addEventListener("click", function () {
      const isOpen = toggle.getAttribute("aria-expanded") === "true";
      if (isOpen) {
        closeMenu();
      } else {
        openMenu();
      }
    });

    nav.querySelectorAll(".nav__link").forEach(function (link) {
      link.addEventListener("click", closeMenu);
    });

    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && toggle.getAttribute("aria-expanded") === "true") {
        closeMenu();
        toggle.focus();
      }
    });

    window.addEventListener("resize", function () {
      if (window.innerWidth >= 768) {
        closeMenu();
      }
    });
  }

  function initScrollAnimations() {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const elements = document.querySelectorAll(".fade-in");

    if (prefersReduced) {
      elements.forEach(function (el) {
        el.classList.add("is-visible");
      });
      return;
    }

    if (!("IntersectionObserver" in window)) {
      elements.forEach(function (el) {
        el.classList.add("is-visible");
      });
      return;
    }

    const observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );

    elements.forEach(function (el) {
      observer.observe(el);
    });
  }

  function initYear() {
    const yearEl = document.getElementById("year");
    if (yearEl) {
      yearEl.textContent = new Date().getFullYear();
    }
  }

  document.addEventListener("DOMContentLoaded", function () {
    applyLinks();
    initMobileMenu();
    initScrollAnimations();
    initYear();
  });
})();
