/* ShelemJ — shared site behaviors: custom animated selects + hero scroll cue.
   Loaded on every page. Vanilla JS, no build step, no dependencies. */
(function () {
  "use strict";

  /* ---------------------------------------------------------------------
     CUSTOM SELECT — progressively enhances every <select class="js-select">
     Keeps the original <select> in the DOM (visually hidden) so the form
     still submits normally and screen readers / keyboard users are fine.
     --------------------------------------------------------------------- */
  function buildCustomSelect(select) {
    if (select.dataset.csEnhanced) return;
    select.dataset.csEnhanced = "true";

    const wrap = document.createElement("div");
    wrap.className = "cs";
    select.parentNode.insertBefore(wrap, select);
    wrap.appendChild(select);

    const trigger = document.createElement("button");
    trigger.type = "button";
    trigger.className = "cs-trigger";
    trigger.setAttribute("aria-haspopup", "listbox");
    trigger.setAttribute("aria-expanded", "false");

    const valueSpan = document.createElement("span");
    valueSpan.className = "cs-value";

    const chevron = document.createElement("span");
    chevron.className = "cs-chevron";
    chevron.innerHTML =
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M6 9l6 6 6-6"/></svg>';

    trigger.appendChild(valueSpan);
    trigger.appendChild(chevron);
    wrap.appendChild(trigger);

    const panel = document.createElement("div");
    panel.className = "cs-panel";
    panel.setAttribute("role", "listbox");
    wrap.appendChild(panel);

    const options = Array.from(select.options);
    const optionEls = [];

    function syncValue() {
      const opt = select.options[select.selectedIndex];
      const text = opt ? opt.textContent.trim() : "";
      const isEmpty = !opt || opt.value === "";
      valueSpan.textContent = text || select.dataset.placeholder || "Select one";
      valueSpan.dataset.empty = isEmpty ? "true" : "false";
      optionEls.forEach((el, i) => {
        el.classList.toggle("selected", i === select.selectedIndex);
      });
    }

    options.forEach((opt, i) => {
      const el = document.createElement("div");
      el.className = "cs-option";
      el.setAttribute("role", "option");
      el.dataset.index = String(i);

      const label = document.createElement("span");
      label.textContent = opt.textContent.trim();

      const check = document.createElement("span");
      check.className = "cs-check";
      check.innerHTML =
        '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7"/></svg>';

      el.appendChild(label);
      el.appendChild(check);
      panel.appendChild(el);
      optionEls.push(el);

      el.addEventListener("click", () => {
        select.selectedIndex = i;
        select.dispatchEvent(new Event("change", { bubbles: true }));
        syncValue();
        closePanel();
        trigger.focus();
      });
    });

    function openPanel() {
      wrap.classList.add("open");
      trigger.setAttribute("aria-expanded", "true");
    }
    function closePanel() {
      wrap.classList.remove("open");
      trigger.setAttribute("aria-expanded", "false");
    }
    function togglePanel() {
      wrap.classList.contains("open") ? closePanel() : openPanel();
    }

    trigger.addEventListener("click", togglePanel);

    trigger.addEventListener("keydown", (e) => {
      if (e.key === "ArrowDown" || e.key === "ArrowUp") {
        e.preventDefault();
        const dir = e.key === "ArrowDown" ? 1 : -1;
        let next = select.selectedIndex + dir;
        next = Math.max(0, Math.min(options.length - 1, next));
        select.selectedIndex = next;
        select.dispatchEvent(new Event("change", { bubbles: true }));
        syncValue();
        openPanel();
      } else if (e.key === "Escape") {
        closePanel();
      }
    });

    document.addEventListener("click", (e) => {
      if (!wrap.contains(e.target)) closePanel();
    });

    select.addEventListener("change", syncValue);
    syncValue();
  }

  function initCustomSelects() {
    document.querySelectorAll("select.js-select").forEach(buildCustomSelect);
  }

  /* ---------------------------------------------------------------------
     HERO SCROLL-DOWN CUE — smooth-scrolls to the next section on click.
     Auto-fades once the visitor has actually started scrolling.
     --------------------------------------------------------------------- */
  function initScrollCue() {
    const cue = document.querySelector("[data-scroll-cue]");
    if (!cue) return;

    cue.addEventListener("click", () => {
      const targetSel = cue.getAttribute("data-scroll-cue");
      const target = targetSel
        ? document.querySelector(targetSel)
        : cue.closest("section")?.nextElementSibling;
      if (target) {
        target.scrollIntoView({ behavior: "smooth", block: "start" });
      } else {
        window.scrollTo({ top: window.innerHeight * 0.92, behavior: "smooth" });
      }
    });

    // Tie visibility to whether the hero section itself is still on screen,
    // rather than a raw scroll-pixel threshold — this avoids the cue
    // vanishing permanently from a tiny layout shift on load, and lets it
    // reappear naturally if the visitor scrolls back up to the hero.
    const heroSection = cue.closest("section") || cue.parentElement;
    if ("IntersectionObserver" in window && heroSection) {
      const io = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            const visible = entry.intersectionRatio > 0.35;
            cue.style.opacity = visible ? "" : "0";
            cue.style.pointerEvents = visible ? "" : "none";
          });
        },
        { threshold: [0, 0.35, 1] }
      );
      io.observe(heroSection);
    }
  }

  /* ---------------------------------------------------------------------
     DATE FIELD — clicking anywhere in the field opens the native picker
     (not just the tiny calendar icon), so it behaves like a real dropdown.
     --------------------------------------------------------------------- */
  function initDateFields() {
    document.querySelectorAll('input[type="date"]').forEach((input) => {
      input.addEventListener("click", () => {
        if (typeof input.showPicker === "function") {
          try {
            input.showPicker();
          } catch (e) {
            /* showPicker can throw if not user-triggered in some browsers; ignore */
          }
        }
      });
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", () => {
      initCustomSelects();
      initScrollCue();
      initDateFields();
    });
  } else {
    initCustomSelects();
    initScrollCue();
    initDateFields();
  }
})();
