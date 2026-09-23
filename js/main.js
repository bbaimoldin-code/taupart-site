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

  var REFERRAL_DISCOUNT = 0.135; // 13.5% — см. ИСТОРИЯ_ПРОЕКТА.md (5 МРП на примере квартиры)

  function initPriceCalculator() {
    var select = document.getElementById("lead-object");
    var qtyInput = document.getElementById("lead-qty");
    var referralCheckbox = document.getElementById("lead-referral");
    var referralNameField = document.getElementById("lead-referral-name-field");
    var referralNote = document.getElementById("lead-referral-note");
    var totalValue = document.getElementById("lead-total-value");
    var totalHidden = document.getElementById("lead-total-hidden");
    var fromPrefixEl = document.getElementById("i18n-price-from");
    var negotiableEl = document.getElementById("i18n-price-negotiable");
    if (!select || !totalValue) return;

    function formatMoney(n) {
      return Math.round(n).toLocaleString("ru-RU") + " ₸";
    }

    function update() {
      var option = select.options[select.selectedIndex];
      var isReferral = referralCheckbox && referralCheckbox.checked;

      referralNameField && referralNameField.toggleAttribute("hidden", !isReferral);
      referralNote && referralNote.toggleAttribute("hidden", !isReferral);

      if (!option || !option.value || option.value === "other") {
        totalValue.textContent = "—";
        if (totalHidden) totalHidden.value = "";
        return;
      }

      if (option.dataset.negotiable) {
        var negotiableText = negotiableEl ? negotiableEl.textContent : "по договорённости";
        totalValue.textContent = negotiableText;
        if (totalHidden) totalHidden.value = negotiableText;
        return;
      }

      var price = parseInt(option.dataset.price, 10);
      if (!price) return;
      var qty = qtyInput ? Math.max(1, parseInt(qtyInput.value, 10) || 1) : 1;
      var total = price * qty;
      if (isReferral) total = total * (1 - REFERRAL_DISCOUNT);

      var formatted = formatMoney(total);
      if (option.dataset.from) {
        var fromPrefix = fromPrefixEl ? fromPrefixEl.textContent : "от";
        formatted = fromPrefix + " " + formatted;
      }

      totalValue.textContent = formatted;
      if (totalHidden) totalHidden.value = formatted;
    }

    select.addEventListener("change", update);
    qtyInput && qtyInput.addEventListener("input", update);
    referralCheckbox && referralCheckbox.addEventListener("change", update);
    document.querySelectorAll("[data-lang-btn]").forEach(function (btn) {
      btn.addEventListener("click", update);
    });

    update();
  }

  document.addEventListener("DOMContentLoaded", function () {
    initMobileNav();
    initNavDropdowns();
    initScrollReveal();
    initCounter();
    initPriceCalculator();
  });
})();
