(() => {
  const toolIcons = {
    "学院": "assets/zxb-icons/学院.svg",
    "同城审核": "assets/zxb-icons/同城审核.svg",
    "分享名片": "assets/zxb-icons/分享案例.svg",
    "群发助手": "assets/zxb-icons/渠道活动.svg",
    "预约表单": "assets/zxb-icons/正式报价.svg"
  };

  const addStyles = () => {
    if (document.querySelector("#zxb-home-fixes-style")) return;
    const style = document.createElement("style");
    style.id = "zxb-home-fixes-style";
    style.textContent = `
      #zxb-home .zxb-phone.home > .zxb-status {
        display: none !important;
      }

      #zxb-home .zxb-tool-svg {
        display: block;
        width: 30px;
        height: 30px;
        margin: 0 auto 7px;
        object-fit: contain;
      }
    `;
    document.head.appendChild(style);
  };

  const findExactTextElement = (root, text) =>
    [...root.querySelectorAll("*")].find(
      (element) =>
        element.children.length === 0 &&
        element.textContent.trim() === text
    );

  const replaceToolIcons = () => {
    const toolCard = [...document.querySelectorAll("#zxb-home .zxb-mobile-card")]
      .find((card) => card.textContent.includes("常用工具"));
    if (!toolCard) return;

    Object.entries(toolIcons).forEach(([label, source]) => {
      const labelElement = findExactTextElement(toolCard, label);
      if (!labelElement) return;
      const item =
        labelElement.closest(".zxb-tool-item, .tool-item, .zxb-tool") ||
        labelElement.parentElement;
      if (!item) return;

      const currentIcon = item.querySelector(
        ".zxb-tool-svg, .zxb-tool-icon, .tool-icon, svg, img"
      );
      const image = document.createElement("img");
      image.className = "zxb-tool-svg";
      image.src = source;
      image.alt = "";
      image.setAttribute("aria-hidden", "true");

      if (currentIcon && currentIcon !== labelElement && currentIcon.parentElement === item) {
        currentIcon.replaceWith(image);
      } else if (currentIcon && currentIcon !== labelElement && currentIcon.parentElement) {
        currentIcon.parentElement.replaceChildren(image);
      } else {
        item.prepend(image);
      }
    });
  };

  const moveTabsToComponents = () => {
    const tabsSection = [...document.querySelectorAll("section")].find(
      (section) =>
        /标签样式/.test(section.querySelector("h1, h2, h3")?.textContent || "")
    );
    const componentLink = [...document.querySelectorAll('a[href^="#"]')].find(
      (link) => link.textContent.trim() === "移动组件"
    );
    const componentSection =
      document.querySelector("#zxb-components, #zxb-component") ||
      (componentLink ? document.querySelector(componentLink.getAttribute("href")) : null);

    if (tabsSection && componentSection) {
      componentSection.insertAdjacentElement("afterend", tabsSection);
      if (tabsSection.id) {
        const tabsLink = document.querySelector(
          `a[href="#${CSS.escape(tabsSection.id)}"]`
        );
        if (tabsLink && componentLink) {
          componentLink.insertAdjacentElement("afterend", tabsLink);
        }
      }
    }
  };

  const applyFixes = () => {
    addStyles();
    document.querySelector("#zxb-home .zxb-phone.home > .zxb-status")?.remove();
    replaceToolIcons();
    moveTabsToComponents();
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", applyFixes);
  } else {
    applyFixes();
  }
  window.addEventListener("load", applyFixes);
  setTimeout(applyFixes, 0);
})();
