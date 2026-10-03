(() => {
  "use strict";

  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const $ = <T extends Element = Element>(sel: string, root: ParentNode = document): T | null =>
    root.querySelector<T>(sel);
  const $$ = <T extends Element = Element>(sel: string, root: ParentNode = document): T[] =>
    Array.from(root.querySelectorAll<T>(sel));

  /* ---------- Reveal on scroll (.anim -> .anim.in) ---------- */
  const anims = $$(".anim");
  if (reduceMotion || !("IntersectionObserver" in window)) {
    anims.forEach((el) => el.classList.add("in"));
  } else {
    const revealIO = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("in");
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -6% 0px" }
    );
    anims.forEach((el) => revealIO.observe(el));
  }

  /* ---------- Stat counters ---------- */
  const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);
  const format = (value: number, decimals: number, suffix: string) =>
    value.toLocaleString("en-US", {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
      useGrouping: false,
    }) + suffix;

  const counters = $$<HTMLElement>(".stat-value[data-count]");
  const readCounter = (el: HTMLElement) => ({
    target: parseFloat(el.dataset.count ?? "") || 0,
    decimals: parseInt(el.dataset.decimals || "0", 10),
    suffix: el.dataset.suffix || "",
  });
  const runCounter = (el: HTMLElement, i: number) => {
    const { target, decimals, suffix } = readCounter(el);
    const duration = 1500 + i * 80;
    const startOffset = 480 + i * 90;
    window.setTimeout(() => {
      const start = performance.now();
      const tick = (now: number) => {
        const t = Math.min(1, (now - start) / duration);
        el.textContent = format(target * easeOutCubic(t), decimals, suffix);
        if (t < 1) requestAnimationFrame(tick);
        else el.textContent = format(target, decimals, suffix);
      };
      requestAnimationFrame(tick);
    }, startOffset);
  };

  if (reduceMotion || !("IntersectionObserver" in window)) {
    counters.forEach((el) => {
      const { target, decimals, suffix } = readCounter(el);
      el.textContent = format(target, decimals, suffix);
    });
  } else {
    counters.forEach((el) => {
      const { decimals, suffix } = readCounter(el);
      el.textContent = format(0, decimals, suffix);
    });
    const countIO = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const el = entry.target;
          if (!(el instanceof HTMLElement)) return;
          runCounter(el, counters.indexOf(el));
          observer.unobserve(el);
        });
      },
      { threshold: 0.25 }
    );
    counters.forEach((el) => countIO.observe(el));
  }

  /* ---------- Accessible tablists (arrows / Home / End) ---------- */
  $$<HTMLElement>("[data-tabs]").forEach((list) => {
    const tabs = $$<HTMLElement>('[role="tab"]', list);
    const select = (tab: HTMLElement, focus: boolean) => {
      tabs.forEach((t) => {
        const on = t === tab;
        t.setAttribute("aria-selected", String(on));
        t.tabIndex = on ? 0 : -1;
        const panelId = t.getAttribute("aria-controls");
        const panel = panelId ? document.getElementById(panelId) : null;
        if (panel) panel.hidden = !on;
      });
      if (focus) tab.focus();
    };
    tabs.forEach((tab, i) => {
      tab.addEventListener("click", () => select(tab, false));
      tab.addEventListener("keydown", (e) => {
        let next: HTMLElement | null = null;
        if (e.key === "ArrowRight" || e.key === "ArrowDown") next = tabs[(i + 1) % tabs.length] ?? null;
        else if (e.key === "ArrowLeft" || e.key === "ArrowUp") next = tabs[(i - 1 + tabs.length) % tabs.length] ?? null;
        else if (e.key === "Home") next = tabs[0] ?? null;
        else if (e.key === "End") next = tabs[tabs.length - 1] ?? null;
        if (next) {
          e.preventDefault();
          select(next, true);
        }
      });
    });
  });

  /* ---------- Copy buttons ---------- */
  const copyText = async (text: string) => {
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(text);
        return true;
      }
    } catch {
      /* fall through */
    }
    const ta = document.createElement("textarea");
    ta.value = text;
    ta.setAttribute("readonly", "");
    ta.style.position = "fixed";
    ta.style.opacity = "0";
    document.body.appendChild(ta);
    ta.select();
    let ok = false;
    try {
      ok = document.execCommand("copy");
    } catch {
      ok = false;
    }
    ta.remove();
    return ok;
  };
  $$<HTMLButtonElement>(".copy[data-copy-for]").forEach((btn) => {
    const label = $("span", btn);
    const icon = $("i", btn);
    const original = btn.getAttribute("aria-label");
    let timer: number | undefined;
    btn.addEventListener("click", () => {
      void (async () => {
        const src = document.getElementById(btn.dataset.copyFor ?? "");
        if (!src) return;
        const ok = await copyText(src.textContent ?? "");
        btn.classList.toggle("copied", ok);
        if (label) label.textContent = ok ? "Copied" : "Copy failed";
        if (icon) icon.className = ok ? "fa-solid fa-check" : "fa-regular fa-copy";
        btn.setAttribute("aria-label", ok ? "Copied to clipboard" : "Copy failed");
        clearTimeout(timer);
        timer = window.setTimeout(() => {
          btn.classList.remove("copied");
          if (label) label.textContent = "Copy";
          if (icon) icon.className = "fa-regular fa-copy";
          if (original === null) btn.removeAttribute("aria-label");
          else btn.setAttribute("aria-label", original);
        }, 1800);
      })();
    });
  });

  /* ---------- FAQ accordion ---------- */
  $$<HTMLButtonElement>(".qa-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      const open = btn.getAttribute("aria-expanded") !== "true";
      btn.setAttribute("aria-expanded", String(open));
      btn.closest(".qa-item")?.classList.toggle("open", open);
    });
  });

  /* ---------- First-match-wins diagram (mirrors the example policy) ---------- */
  type Action = "allow" | "deny" | "ask";
  const rules: { glob: RegExp; prefix: string | null; action: Action }[] = [
    { glob: /^read_.*$/, prefix: null, action: "allow" },
    { glob: /^write_.*$/, prefix: "/etc", action: "deny" },
    { glob: /^write_.*$/, prefix: null, action: "ask" },
    { glob: /^.*$/, prefix: null, action: "ask" },
  ];
  const inPrefix = (path: string, prefix: string) => path === prefix || path.startsWith(prefix + "/");
  const decide = (tool: string, path: string): { i: number; action: Action } => {
    for (let i = 0; i < rules.length; i++) {
      const r = rules[i];
      if (!r || !r.glob.test(tool)) continue;
      if (r.prefix && !inPrefix(path, r.prefix)) continue;
      return { i, action: r.action };
    }
    return { i: -1, action: "ask" }; // no match: default ask
  };
  const probes = [
    { tool: "write_file", path: "/etc/hosts" },
    { tool: "read_file", path: "src/index.ts" },
    { tool: "write_file", path: "src/app.ts" },
    { tool: "move_file", path: "src/old.ts" },
  ];
  const colors: Record<Action, string> = { allow: "#35dfb4", deny: "#ff5c6c", ask: "#f5b83d" };
  const steps = $$<HTMLElement>("#steps .step");
  const ylines = $$<HTMLElement>("#yaml .yl[data-r]");
  const probeV = $("#probe-v");
  const probeCall = $("#probe-call");
  if (steps.length && probeV && probeCall) {
    let pi = 0;
    const showProbe = (p: { tool: string; path: string }) => {
      const d = decide(p.tool, p.path);
      probeCall.textContent = p.tool + " " + p.path;
      steps.forEach((s, k) => {
        s.className = "step " + (k < d.i ? "skip" : k === d.i ? "match" : "idle");
        s.style.setProperty("--vc", colors[d.action]);
        const small = $("small", s);
        if (small) small.textContent = k < d.i ? "no match" : k === d.i ? "match → " + d.action : "not checked";
      });
      ylines.forEach((l) => {
        const on = Number(l.dataset.r) === d.i;
        l.className = "yl" + (on ? " on " + d.action : "");
      });
      probeV.className = "chip v-" + d.action;
      probeV.textContent = d.action.toUpperCase();
    };
    showProbe(probes[0]!);
    if (!reduceMotion) {
      setInterval(() => {
        pi = (pi + 1) % probes.length;
        const next = probes[pi];
        if (next) showProbe(next);
      }, 2600);
    }
  }

  /* ---------- Active nav link (scroll spy) ---------- */
  const spyLinks = $$<HTMLAnchorElement>("[data-spy]");
  const spyIds = Array.from(
    new Set(spyLinks.map((a) => a.dataset.spy).filter((id): id is string => Boolean(id)))
  );
  const spyTargets = spyIds
    .map((id) => document.getElementById(id))
    .filter((el): el is HTMLElement => el !== null);
  const setActive = (id: string) => {
    spyLinks.forEach((a) => {
      const on = a.dataset.spy === id;
      a.classList.toggle("is-active", on);
      if (on) a.setAttribute("aria-current", "page");
      else a.removeAttribute("aria-current");
    });
  };
  if (spyTargets.length) {
    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        ticking = false;
        const line = window.innerHeight * 0.35;
        const first = spyTargets[0];
        if (!first) return;
        let current = first.id;
        spyTargets.forEach((t) => {
          if (t.getBoundingClientRect().top <= line) current = t.id;
        });
        setActive(current);
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
  }

  /* ---------- Mobile menu ---------- */
  const burger = $<HTMLButtonElement>(".burger");
  const menu = document.getElementById("mobile-menu");
  const overlay = $<HTMLElement>(".menu-overlay");
  if (!burger || !menu || !overlay) return;

  const isOpen = () => burger.getAttribute("aria-expanded") === "true";
  const setOpen = (open: boolean) => {
    burger.setAttribute("aria-expanded", String(open));
    burger.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    menu.hidden = !open;
    overlay.hidden = !open;
    document.body.classList.toggle("menu-open", open);
  };

  burger.addEventListener("click", () => setOpen(!isOpen()));
  overlay.addEventListener("click", () => setOpen(false));
  $$("a", menu).forEach((a) => a.addEventListener("click", () => setOpen(false)));
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && isOpen()) {
      setOpen(false);
      burger.focus();
    }
  });
  window.addEventListener("resize", () => {
    if (window.innerWidth > 720 && isOpen()) setOpen(false);
  });
})();
