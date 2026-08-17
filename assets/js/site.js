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
     CUSTOM DATE PICKER — replaces the native <input type="date"> with a
     fully styled calendar dropdown that matches the rest of the site.
     The real <input type="date"> stays in the DOM (visually hidden) so
     the value still submits normally and it degrades gracefully.
     --------------------------------------------------------------------- */
  function buildDatePicker(input) {
    if (input.dataset.dpEnhanced) return;
    input.dataset.dpEnhanced = "true";

    const MONTHS = [
      "January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December",
    ];
    const WEEKDAYS = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

    const wrap = document.createElement("div");
    wrap.className = "dp";
    input.parentNode.insertBefore(wrap, input);
    wrap.appendChild(input);

    const trigger = document.createElement("button");
    trigger.type = "button";
    trigger.className = "dp-trigger";
    trigger.setAttribute("aria-haspopup", "dialog");
    trigger.setAttribute("aria-expanded", "false");

    const valueSpan = document.createElement("span");
    valueSpan.className = "dp-value";

    const iconSpan = document.createElement("span");
    iconSpan.className = "dp-icon";
    iconSpan.innerHTML =
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75"><rect x="3.5" y="5" width="17" height="16" rx="2.5"/><path stroke-linecap="round" d="M8 3v4M16 3v4M3.5 10h17"/></svg>';

    trigger.appendChild(valueSpan);
    trigger.appendChild(iconSpan);
    wrap.appendChild(trigger);

    const panel = document.createElement("div");
    panel.className = "dp-panel";
    panel.setAttribute("role", "dialog");
    panel.innerHTML = `
      <div class="dp-head">
        <button type="button" class="dp-nav" data-dp-prev aria-label="Previous month">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M15 18l-6-6 6-6"/></svg>
        </button>
        <span class="dp-month-label" data-dp-label></span>
        <button type="button" class="dp-nav" data-dp-next aria-label="Next month">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M9 18l6-6-6-6"/></svg>
        </button>
      </div>
      <div class="dp-weekdays">${WEEKDAYS.map((d) => `<span>${d}</span>`).join("")}</div>
      <div class="dp-days" data-dp-days></div>
      <div class="dp-foot">
        <button type="button" class="dp-link" data-dp-clear>Clear</button>
        <button type="button" class="dp-link dp-link--gold" data-dp-today>Today</button>
      </div>
    `;
    wrap.appendChild(panel);

    const labelEl = panel.querySelector("[data-dp-label]");
    const daysEl = panel.querySelector("[data-dp-days]");

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    let selected = input.value ? new Date(input.value + "T00:00:00") : null;
    let viewYear = (selected || today).getFullYear();
    let viewMonth = (selected || today).getMonth();

    function fmtDisplay(d) {
      return `${MONTHS[d.getMonth()].slice(0, 3)} ${d.getDate()}, ${d.getFullYear()}`;
    }
    function fmtISO(d) {
      const y = d.getFullYear();
      const m = String(d.getMonth() + 1).padStart(2, "0");
      const day = String(d.getDate()).padStart(2, "0");
      return `${y}-${m}-${day}`;
    }
    function syncValue() {
      if (selected) {
        valueSpan.textContent = fmtDisplay(selected);
        valueSpan.dataset.empty = "false";
        input.value = fmtISO(selected);
      } else {
        valueSpan.textContent = input.dataset.placeholder || "Select a date";
        valueSpan.dataset.empty = "true";
        input.value = "";
      }
    }

    function render() {
      labelEl.textContent = `${MONTHS[viewMonth]} ${viewYear}`;
      daysEl.innerHTML = "";
      const firstDay = new Date(viewYear, viewMonth, 1).getDay();
      const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();

      for (let i = 0; i < firstDay; i++) {
        const pad = document.createElement("span");
        pad.className = "dp-day dp-day--pad";
        daysEl.appendChild(pad);
      }
      for (let d = 1; d <= daysInMonth; d++) {
        const cellDate = new Date(viewYear, viewMonth, d);
        const btn = document.createElement("button");
        btn.type = "button";
        btn.className = "dp-day";
        btn.textContent = String(d);
        if (
          selected &&
          cellDate.getFullYear() === selected.getFullYear() &&
          cellDate.getMonth() === selected.getMonth() &&
          cellDate.getDate() === selected.getDate()
        ) {
          btn.classList.add("selected");
        }
        if (cellDate.getTime() === today.getTime()) {
          btn.classList.add("today");
        }
        btn.addEventListener("click", () => {
          selected = cellDate;
          syncValue();
          input.dispatchEvent(new Event("change", { bubbles: true }));
          render();
          closePanel();
          trigger.focus();
        });
        daysEl.appendChild(btn);
      }
    }

    function openPanel() {
      wrap.classList.add("open");
      trigger.setAttribute("aria-expanded", "true");
      render();
    }
    function closePanel() {
      wrap.classList.remove("open");
      trigger.setAttribute("aria-expanded", "false");
    }
    function togglePanel() {
      wrap.classList.contains("open") ? closePanel() : openPanel();
    }

    trigger.addEventListener("click", togglePanel);

    panel.querySelector("[data-dp-prev]").addEventListener("click", () => {
      viewMonth -= 1;
      if (viewMonth < 0) {
        viewMonth = 11;
        viewYear -= 1;
      }
      render();
    });
    panel.querySelector("[data-dp-next]").addEventListener("click", () => {
      viewMonth += 1;
      if (viewMonth > 11) {
        viewMonth = 0;
        viewYear += 1;
      }
      render();
    });
    panel.querySelector("[data-dp-clear]").addEventListener("click", () => {
      selected = null;
      syncValue();
      input.dispatchEvent(new Event("change", { bubbles: true }));
      closePanel();
    });
    panel.querySelector("[data-dp-today]").addEventListener("click", () => {
      selected = new Date(today);
      viewYear = selected.getFullYear();
      viewMonth = selected.getMonth();
      syncValue();
      input.dispatchEvent(new Event("change", { bubbles: true }));
      render();
      closePanel();
    });

    document.addEventListener("click", (e) => {
      if (!wrap.contains(e.target)) closePanel();
    });
    trigger.addEventListener("keydown", (e) => {
      if (e.key === "Escape") closePanel();
    });

    syncValue();
  }

  function initDatePickers() {
    document.querySelectorAll("input.js-datepicker").forEach(buildDatePicker);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", () => {
      initCustomSelects();
      initScrollCue();
      initDatePickers();
    });
  } else {
    initCustomSelects();
    initScrollCue();
    initDatePickers();
  }
})();
