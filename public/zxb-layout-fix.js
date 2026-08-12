(() => {
  const organizeZxbContent = () => {
    const tabStyleSection = document.querySelector("#zxb-tab-style-spec");
    const customerSummaryCard = document.querySelector(
      ".zxb-customer-summary-card"
    );
    const businessStage = customerSummaryCard?.closest(".zxb-component-stage");
    const componentSection = businessStage?.closest("section");

    if (
      tabStyleSection &&
      componentSection &&
      componentSection !== tabStyleSection &&
      tabStyleSection.parentElement !== componentSection
    ) {
      componentSection.insertBefore(tabStyleSection, businessStage);
    }

    document
      .querySelectorAll(".zxb-customer-summary-card")
      .forEach((card) => {
        const topRow = card.querySelector(".zxb-customer-card-top");
        const pinAction = card.querySelector(".zxb-pin-action");

        if (topRow && pinAction) {
          topRow.classList.add("zxb-summary-top-aligned");
          pinAction.classList.add("zxb-pin-action-aligned");
        }
      });
  };

  const style = document.createElement("style");
  style.textContent = `
    #zxb-tab-style-spec {
      width: 100%;
      margin-top: 24px;
      margin-bottom: 24px;
    }

    .zxb-customer-summary-card .zxb-customer-card-top.zxb-summary-top-aligned {
      display: flex !important;
      align-items: center !important;
      width: 100%;
      gap: 8px;
    }

    .zxb-customer-summary-card .zxb-pin-action.zxb-pin-action-aligned {
      margin-left: auto !important;
      margin-right: 0 !important;
      flex: 0 0 auto;
      align-self: center;
      justify-content: flex-end;
      text-align: right;
    }
  `;
  document.head.appendChild(style);

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", organizeZxbContent, {
      once: true,
    });
  } else {
    organizeZxbContent();
  }

  window.addEventListener("hashchange", organizeZxbContent);
})();
