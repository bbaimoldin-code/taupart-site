(function () {
  "use strict";

  function initMobileNav() {
    var toggle = document.querySelector(".nav-toggle");
    var nav = document.querySelector(".main-nav");
    if (!toggle || !nav) return;
    toggle.addEventListener("click", function () {
      var isOpen = document.body.classList.toggle("nav-open");
      toggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
    });
    nav.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        document.body.classList.remove("nav-open");
        toggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  function initNavDropdowns() {
    var dropdowns = document.querySelectorAll(".nav-item-dropdown");
    if (!dropdowns.length) return;

    function closeAll() {
      dropdowns.forEach(function (d) {
        d.classList.remove("is-open");
        var trigger = d.querySelector(".nav-dropdown-trigger");
        if (trigger) trigger.setAttribute("aria-expanded", "false");
      });
    }

    dropdowns.forEach(function (dropdown) {
      var trigger = dropdown.querySelector(".nav-dropdown-trigger");
      if (!trigger) return;
      trigger.addEventListener("click", function (e) {
        e.stopPropagation();
        var wasOpen = dropdown.classList.contains("is-open");
        closeAll();
        if (!wasOpen) {
          dropdown.classList.add("is-open");
          trigger.setAttribute("aria-expanded", "true");
        }
      });
      dropdown.addEventListener("mouseenter", function () {
        dropdowns.forEach(function (d) {
          if (d !== dropdown) d.classList.remove("is-open");
        });
      });
    });

    document.addEventListener("click", closeAll);
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") closeAll();
    });
  }

  function initScrollReveal() {
    var items = document.querySelectorAll("[data-reveal]");
    if (!items.length) return;
    if (!("IntersectionObserver" in window)) {
      items.forEach(function (el) { el.classList.add("is-visible"); });
      return;
    }
    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );
    items.forEach(function (el) { observer.observe(el); });
  }

  function initCounter() {
    var el = document.querySelector("[data-count]");
    if (!el) return;
    var target = parseInt(el.getAttribute("data-count"), 10);
    if (!target) return;

    var animate = function () {
      var duration = 1200;
      var start = null;
      var format = function (n) { return n.toLocaleString("ru-RU"); };
      function step(timestamp) {
        if (start === null) start = timestamp;
        var progress = Math.min((timestamp - start) / duration, 1);
        var eased = 1 - Math.pow(1 - progress, 3);
        el.textContent = format(Math.round(target * eased));
        if (progress < 1) window.requestAnimationFrame(step);
      }
      window.requestAnimationFrame(step);
    };

    if (!("IntersectionObserver" in window)) {
      el.textContent = target.toLocaleString("ru-RU");
      return;
    }
    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            animate();
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.6 }
    );
    observer.observe(el);
  }

  document.addEventListener("DOMContentLoaded", function () {
    initMobileNav();
    initNavDropdowns();
    initScrollReveal();
    initCounter();
  });
})();
