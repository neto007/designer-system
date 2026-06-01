/* =============================================================
   SHIELDAI · DESIGN SYSTEM · Shared sidebar + topbar injector
   Drop <div id="ds-shell"></div> in <body> before page content.
   ============================================================= */

(function () {
  const NAV = [
    { section: "Overview", items: [
      { num: "00", href: "00 Index.html",        label: "introduction" },
    ]},
    { section: "Foundations", items: [
      { num: "01", href: "01 Foundations.html",  label: "foundations" },
    ]},
    { section: "Library", items: [
      { num: "02", href: "02 Components.html",   label: "components" },
      { num: "03", href: "03 Patterns.html",     label: "patterns" },
      { num: "08", href: "08 Catalog.html",      label: "catalog · 85" },
    ]},
    { section: "Surfaces", items: [
      { num: "04", href: "04 Chat.html",         label: "chat" },
      { num: "05", href: "05 Workflow.html",     label: "workflow" },
    ]},
    { section: "Guidelines", items: [
      { num: "06", href: "06 Voice & A11y.html", label: "voice & a11y" },
      { num: "07", href: "07 Resources.html",    label: "resources" },
    ]},
  ];

  // current page name from URL (decode spaces)
  const path = decodeURIComponent(location.pathname.split("/").pop() || "");

  function sidebarHTML() {
    return `
      <aside class="ds-sidebar">
        <div class="ds-sidebar__brand">
          <div class="mark" aria-hidden="true">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
              <rect x="4" y="4" width="16" height="16" rx="2"/><rect x="9" y="9" width="6" height="6"/>
              <path d="M9 1v3M15 1v3M9 20v3M15 20v3M20 9h3M20 14h3M1 9h3M1 14h3"/>
            </svg>
          </div>
          <div>
            <div class="wordmark">Shield<em>AI</em></div>
            <div class="subtitle">design_system · v1.0</div>
          </div>
        </div>
        <nav class="ds-sidebar__nav" aria-label="Design system navigation">
          ${NAV.map(group => `
            <div class="ds-sidebar__section">// ${group.section}</div>
            ${group.items.map(it => `
              <a class="ds-sidebar__link"
                 href="${it.href}"
                 ${path === it.href ? 'aria-current="page"' : ''}>
                <span class="num">${it.num}</span>
                <span>${it.label}</span>
              </a>
            `).join("")}
          `).join("")}
        </nav>
        <div class="ds-sidebar__footer">
          <span>// build_2026.05.24</span>
          <span>// © Evolution · MIT</span>
        </div>
      </aside>
    `;
  }

  function topbarHTML(crumbs) {
    return `
      <header class="ds-topbar">
        <div class="crumbs">
          <span>shieldai_ds</span>
          <span style="color:var(--ds-current)">/</span>
          ${crumbs.map((c, i) => `
            <span ${i === crumbs.length - 1 ? '' : ''}>${i === crumbs.length - 1 ? `<strong>${c}</strong>` : c}</span>
            ${i < crumbs.length - 1 ? '<span style="color:var(--ds-current)">/</span>' : ''}
          `).join("")}
        </div>
        <div class="meta">
          <span><span class="dot"></span>system_online</span>
          <span>build_2026.05.24</span>
          <span>v1.0.0</span>
        </div>
      </header>
    `;
  }

  // Read crumbs from data attribute on body
  const crumbs = (document.body.dataset.crumbs || "introduction").split("|").map(s => s.trim());

  // Inject into placeholder
  const root = document.getElementById("ds-shell");
  if (!root) return;

  root.outerHTML = `
    <div class="ds-app">
      ${sidebarHTML()}
      <div class="ds-main">
        ${topbarHTML(crumbs)}
        <main class="ds-canvas">${root.innerHTML}</main>
      </div>
    </div>
  `;
})();
