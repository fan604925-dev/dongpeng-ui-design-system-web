const refreshIcons = () => {
  if (window.lucide) window.lucide.createIcons({ attrs: { "stroke-width": 2 } });
};

refreshIcons();

document.querySelectorAll(".nav-group").forEach((button) => {
  button.addEventListener("click", () => {
    const children = button.nextElementSibling;
    const expanded = button.getAttribute("aria-expanded") === "true";
    button.setAttribute("aria-expanded", String(!expanded));
    children.classList.toggle("collapsed", expanded);
    const icon = button.querySelector("svg");
    if (icon) {
      icon.outerHTML = `<i data-lucide="${expanded ? "chevron-right" : "chevron-down"}"></i>`;
      refreshIcons();
    }
  });
});

const navLinks = [...document.querySelectorAll(".nav-item")];
const sections = [...document.querySelectorAll(".doc-section")];

const setActive = (hash) => {
  navLinks.forEach((link) => link.classList.toggle("active", link.getAttribute("href") === hash));
};

navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    setActive(link.getAttribute("href"));
    document.querySelector(".sidebar").classList.remove("open");
  });
});

const observer = new IntersectionObserver((entries) => {
  const visible = entries.filter((entry) => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
  if (visible) setActive(`#${visible.target.id}`);
}, { rootMargin: "-20% 0px -65% 0px", threshold: [0, .1, .5] });
sections.forEach((section) => observer.observe(section));

document.querySelector(".mobile-menu").addEventListener("click", () => {
  document.querySelector(".sidebar").classList.toggle("open");
});

document.querySelectorAll(".demo-card").forEach((card) => {
  const tabs = card.querySelectorAll(".segmented button");
  tabs.forEach((tab, index) => {
    tab.addEventListener("click", () => {
      tabs.forEach((item) => item.classList.remove("active"));
      tab.classList.add("active");
      card.classList.toggle("show-code", index === 1);
    });
  });
  card.querySelector(".copy-button")?.addEventListener("click", async () => {
    const code = card.querySelector("code")?.textContent || "";
    try {
      await navigator.clipboard.writeText(code);
    } catch {
      const textarea = document.createElement("textarea");
      textarea.value = code;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      textarea.remove();
    }
    const toast = document.querySelector("#toast");
    toast.classList.add("show");
    setTimeout(() => toast.classList.remove("show"), 1600);
  });
});

const search = document.querySelector("#doc-search");
const runSearch = () => {
  const query = search.value.trim().toLowerCase();
  sections.forEach((section) => {
    const haystack = `${section.dataset.search || ""} ${section.querySelector("h2")?.textContent || ""}`.toLowerCase();
    section.classList.toggle("search-hidden", Boolean(query) && !haystack.includes(query));
  });
};
search.addEventListener("input", runSearch);

document.addEventListener("keydown", (event) => {
  if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
    event.preventDefault();
    search.focus();
  }
  if (event.key === "Escape") {
    search.value = "";
    runSearch();
    search.blur();
    document.querySelector(".sidebar").classList.remove("open");
  }
});
