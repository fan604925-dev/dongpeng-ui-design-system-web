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

document.querySelectorAll("[data-design-action]").forEach((button) => {
  button.addEventListener("click", () => {
    const original = button.textContent.trim();
    button.innerHTML = '<i data-lucide="check"></i>已创建';
    refreshIcons();
    window.setTimeout(() => {
      button.innerHTML = `<i data-lucide="plus"></i>${original}`;
      refreshIcons();
    }, 1600);
  });
});

document.querySelectorAll("[data-close-design-alert]").forEach((button) => {
  button.addEventListener("click", () => {
    button.closest("[data-design-alert]")?.classList.add("is-dismissed");
  });
});

const search = document.querySelector("#doc-search");
const searchResults = document.querySelector("#search-results");
const searchIndex = sections.map((section) => {
  const link = navLinks.find((item) => item.getAttribute("href") === `#${section.id}`);
  const heading = link?.textContent?.trim() || section.querySelector("h2")?.textContent?.trim() || section.id;
  const keywords = section.dataset.search || "";
  const content = section.textContent.replace(/\s+/g, " ").trim();
  return { id: section.id, heading, keywords, content, link };
});
let activeSearchIndex = -1;
let currentMatches = [];

const closeSearch = () => {
  searchResults.hidden = true;
  activeSearchIndex = -1;
};

const openSearchResult = (item) => {
  if (!item) return;
  closeSearch();
  search.blur();
  history.pushState(null, "", `#${item.id}`);
  document.querySelector(`#${CSS.escape(item.id)}`)?.scrollIntoView({ behavior: "smooth", block: "start" });
  setActive(`#${item.id}`);
};

const renderSearchResults = () => {
  const query = search.value.trim().toLowerCase();
  if (!query) {
    currentMatches = [];
    searchResults.innerHTML = "";
    closeSearch();
    return;
  }

  currentMatches = searchIndex
    .map((item) => {
      const title = item.heading.toLowerCase();
      const keywords = item.keywords.toLowerCase();
      const content = item.content.toLowerCase();
      const score = title === query ? 0 : title.startsWith(query) ? 1 : title.includes(query) ? 2 : keywords.includes(query) ? 3 : content.includes(query) ? 4 : 99;
      return { ...item, score };
    })
    .filter((item) => item.score < 99)
    .sort((a, b) => a.score - b.score)
    .slice(0, 8);

  activeSearchIndex = currentMatches.length ? 0 : -1;
  if (!currentMatches.length) {
    searchResults.innerHTML = `<div class="search-empty"><strong>没有找到“${query.replace(/[&<>"']/g, "")}”</strong><span>试试“按钮”“RTM”“助销宝”或“PPT”</span></div>`;
  } else {
    searchResults.innerHTML = currentMatches.map((item, index) => `
      <button class="search-result${index === 0 ? " is-active" : ""}" type="button" role="option" data-index="${index}">
        <span class="search-result-icon"><i data-lucide="file-text"></i></span>
        <span class="search-result-copy"><strong>${item.heading}</strong><span>${item.keywords}</span></span>
        ${index === 0 ? "<kbd>↵</kbd>" : ""}
      </button>`).join("");
    refreshIcons();
  }
  searchResults.hidden = false;
};

search.addEventListener("input", renderSearchResults);
search.addEventListener("focus", renderSearchResults);
searchResults.addEventListener("mousedown", (event) => {
  const result = event.target.closest(".search-result");
  if (!result) return;
  event.preventDefault();
  openSearchResult(currentMatches[Number(result.dataset.index)]);
});
search.addEventListener("keydown", (event) => {
  if (!currentMatches.length) return;
  if (event.key === "ArrowDown" || event.key === "ArrowUp") {
    event.preventDefault();
    const direction = event.key === "ArrowDown" ? 1 : -1;
    activeSearchIndex = (activeSearchIndex + direction + currentMatches.length) % currentMatches.length;
    searchResults.querySelectorAll(".search-result").forEach((item, index) => item.classList.toggle("is-active", index === activeSearchIndex));
  }
  if (event.key === "Enter") {
    event.preventDefault();
    openSearchResult(currentMatches[Math.max(activeSearchIndex, 0)]);
  }
});
document.addEventListener("mousedown", (event) => {
  if (!event.target.closest(".search-box")) closeSearch();
});

document.addEventListener("keydown", (event) => {
  if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
    event.preventDefault();
    search.focus();
  }
  if (event.key === "Escape") {
    search.value = "";
    closeSearch();
    search.blur();
    document.querySelector(".sidebar").classList.remove("open");
  }
});

document.querySelectorAll("[data-zxb-tab]").forEach((button) => {
  button.addEventListener("click", () => {
    const group = button.closest(".zxb-customer-tabs");
    if (!group) return;
    group.querySelectorAll("[data-zxb-tab]").forEach((item) => {
      const active = item === button;
      item.classList.toggle("is-active", active);
      item.setAttribute("aria-selected", String(active));
    });
  });
});

document.querySelectorAll("[data-zxb-filter]").forEach((button) => {
  button.addEventListener("click", () => {
    const group = button.closest(".zxb-customer-filters");
    if (!group) return;
    group.querySelectorAll("[data-zxb-filter]").forEach((item) => {
      item.classList.toggle("is-active", item === button);
    });
  });
});

document.querySelectorAll(".zxb-customer-select").forEach((button) => {
  button.addEventListener("click", () => {
    const selected = button.getAttribute("aria-pressed") !== "true";
    button.setAttribute("aria-pressed", String(selected));
    button.closest(".zxb-customer-card")?.classList.toggle("is-selected", selected);
  });
});

document.querySelectorAll(".zxb-pin-action").forEach((button) => {
  button.addEventListener("click", () => {
    const pinned = button.getAttribute("aria-pressed") !== "true";
    button.setAttribute("aria-pressed", String(pinned));
    button.classList.toggle("is-pinned", pinned);
    const label = button.querySelector("span");
    if (label) label.textContent = pinned ? "取消置顶" : "置顶";
    const icon = button.querySelector("svg");
    if (icon) icon.outerHTML = `<i data-lucide="${pinned ? "pin-off" : "pin"}"></i>`;
    refreshIcons();
  });
});

const followStatusOptions = ["已加微", "待回访", "已到店"];
document.querySelectorAll("[data-zxb-follow-status]").forEach((button) => {
  button.addEventListener("click", () => {
    const current = followStatusOptions.indexOf(button.textContent.trim());
    button.textContent = followStatusOptions[(current + 1) % followStatusOptions.length];
  });
});

document.querySelectorAll("[data-zxb-follow-time]").forEach((button) => {
  button.addEventListener("click", () => {
    const label = button.querySelector("b");
    if (!label) return;
    const isDefault = label.textContent.replace(/\s+/g, " ").trim() === "2022.10.16 12:00";
    label.textContent = isDefault ? "请选择回访时间" : "2022.10.16  12:00";
  });
});

document.querySelectorAll(".zxb-reason-chips button").forEach((button) => {
  button.addEventListener("click", () => {
    const selected = button.getAttribute("aria-pressed") !== "true";
    button.setAttribute("aria-pressed", String(selected));
    button.classList.toggle("is-selected", selected);
  });
});

document.querySelectorAll(".zxb-record-button").forEach((button) => {
  button.addEventListener("click", () => {
    const recording = button.getAttribute("aria-pressed") !== "true";
    button.setAttribute("aria-pressed", String(recording));
    button.classList.toggle("is-recording", recording);
    const label = button.querySelector("span");
    if (label) label.textContent = recording ? "录音中..." : "点击录音";
  });
});

document.querySelectorAll(".zxb-loss-selector").forEach((selector) => {
  const summary = selector.querySelector(".zxb-selector-summary");
  selector.querySelector("[data-zxb-cancel]")?.addEventListener("click", () => {
    selector.querySelectorAll(".zxb-reason-chips button").forEach((button) => {
      button.classList.remove("is-selected");
      button.setAttribute("aria-pressed", "false");
    });
    const textarea = selector.querySelector("textarea");
    if (textarea) textarea.value = "";
    const record = selector.querySelector(".zxb-record-button");
    if (record) {
      record.classList.remove("is-recording");
      record.setAttribute("aria-pressed", "false");
      const label = record.querySelector("span");
      if (label) label.textContent = "点击录音";
    }
    if (summary) {
      summary.textContent = "已清空";
      setTimeout(() => { summary.textContent = ""; }, 1200);
    }
  });
  selector.querySelector("[data-zxb-confirm]")?.addEventListener("click", (event) => {
    const count = selector.querySelectorAll(".zxb-reason-chips .is-selected").length;
    if (summary) summary.textContent = count ? `已选择 ${count} 项` : "请至少选择一项";
    const original = event.currentTarget.textContent;
    if (count) event.currentTarget.textContent = "已保存";
    setTimeout(() => {
      if (summary) summary.textContent = "";
      event.currentTarget.textContent = original;
    }, 1500);
  });
});

const heroVideo = document.querySelector(".dp-hero-video-forward");
const heroVideoReverse = document.querySelector(".dp-hero-video-reverse");
const heroStage = document.querySelector(".dp-hero-stage");
if (heroVideo && heroVideoReverse && heroStage) {
  let heroDirection = 1;
  let appliedHeroDirection = 0;

  const videoReady = (video) => Number.isFinite(video.duration) && video.duration > 0;
  const alignVideoTime = (source, target) => {
    if (!videoReady(source) || !videoReady(target)) return;
    const sourceProgress = Math.min(1, Math.max(0, source.currentTime / source.duration));
    const alignedTime = (1 - sourceProgress) * target.duration;
    target.currentTime = Math.min(Math.max(0, target.duration - 0.05), Math.max(0, alignedTime));
  };

  const applyHeroDirection = () => {
    if (document.hidden) return;
    const target = heroDirection === -1 ? heroVideoReverse : heroVideo;
    const source = heroDirection === -1 ? heroVideo : heroVideoReverse;
    if (!videoReady(target)) return;
    if (appliedHeroDirection !== heroDirection && videoReady(source)) alignVideoTime(source, target);
    source.pause();
    heroStage.classList.toggle("is-reversing", heroDirection === -1);
    target.playbackRate = 1;
    target.play().catch(() => {});
    appliedHeroDirection = heroDirection;
  };

  const setHeroDirection = (direction) => {
    if (direction === heroDirection && appliedHeroDirection === direction) return;
    heroDirection = direction;
    applyHeroDirection();
  };

  heroVideo.addEventListener("loadedmetadata", applyHeroDirection);
  heroVideoReverse.addEventListener("loadedmetadata", applyHeroDirection);
  window.addEventListener("pointermove", (event) => {
    if (event.pointerType && event.pointerType !== "mouse") return;
    setHeroDirection(event.clientX < window.innerWidth / 2 ? -1 : 1);
  }, { passive: true });
  document.addEventListener("visibilitychange", () => {
    if (document.hidden) {
      heroVideo.pause();
      heroVideoReverse.pause();
    } else {
      appliedHeroDirection = 0;
      applyHeroDirection();
    }
  });
}
