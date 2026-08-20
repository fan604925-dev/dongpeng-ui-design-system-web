(() => {
  const initZxbTabs = () => {
    const foundation = document.querySelector("#zxb-foundation");
    if (!foundation) return;

    const phoneTabGroups = foundation.querySelectorAll(".zxb-customer-tabs");
    if (phoneTabGroups[0]) phoneTabGroups[0].classList.add("zxb-tabs-native-status");
    if (phoneTabGroups[1]) phoneTabGroups[1].classList.add("zxb-tabs-native-filter");

    if (!foundation.querySelector("#zxb-tab-style-spec")) {
      const grids = foundation.querySelectorAll(".zxb-foundation-grid");
      const anchor = grids[grids.length - 1];
      if (anchor) {
        anchor.insertAdjacentHTML("afterend", `
          <section class="zxb-tab-spec" id="zxb-tab-style-spec" aria-labelledby="zxb-tab-style-title">
            <div class="zxb-tab-spec__head">
              <div>
                <h3 class="zxb-tab-spec__title" id="zxb-tab-style-title">标签页样式</h3>
              </div>
              <p class="zxb-tab-spec__note">四种业务场景，统一字号、间距与东鹏红选中态</p>
            </div>
            <div class="zxb-tab-spec__grid">
              <article class="zxb-tab-demo">
                <div class="zxb-tab-demo__name"><span class="zxb-tab-demo__index">01</span> 状态计数</div>
                <div class="zxb-native-tabs zxb-tabs--status" role="tablist" aria-label="客户状态">
                  <button class="zxb-native-tab" type="button" role="tab" aria-selected="false">未接单 <span class="zxb-native-tab__count">622</span></button>
                  <button class="zxb-native-tab is-active" type="button" role="tab" aria-selected="true">跟进中 <span class="zxb-native-tab__count">56</span></button>
                  <button class="zxb-native-tab" type="button" role="tab" aria-selected="false">已完成 <span class="zxb-native-tab__count">28</span></button>
                  <button class="zxb-native-tab" type="button" role="tab" aria-selected="false">已流失 <span class="zxb-native-tab__count">28</span></button>
                </div>
              </article>
              <article class="zxb-tab-demo">
                <div class="zxb-tab-demo__name"><span class="zxb-tab-demo__index">02</span> 业务导航</div>
                <div class="zxb-native-tabs zxb-tabs--underline" role="tablist" aria-label="业务导航">
                  <button class="zxb-native-tab is-active" type="button" role="tab" aria-selected="true">员工</button>
                  <button class="zxb-native-tab" type="button" role="tab" aria-selected="false">跟进</button>
                  <button class="zxb-native-tab" type="button" role="tab" aria-selected="false">更多</button>
                  <button class="zxb-native-tab" type="button" role="tab" aria-selected="false">排序</button>
                </div>
              </article>
              <article class="zxb-tab-demo">
                <div class="zxb-tab-demo__name"><span class="zxb-tab-demo__index">03</span> 条件筛选</div>
                <div class="zxb-native-tabs zxb-tabs--chips" role="tablist" aria-label="流失原因">
                  <button class="zxb-native-tab is-active" type="button" role="tab" aria-selected="true">价格原因</button>
                  <button class="zxb-native-tab" type="button" role="tab" aria-selected="false">产品原因</button>
                  <button class="zxb-native-tab" type="button" role="tab" aria-selected="false">客户原因</button>
                  <button class="zxb-native-tab" type="button" role="tab" aria-selected="false">服务原因</button>
                </div>
              </article>
              <article class="zxb-tab-demo">
                <div class="zxb-tab-demo__name"><span class="zxb-tab-demo__index">04</span> 分段切换</div>
                <div class="zxb-native-tabs zxb-tabs--segment" role="tablist" aria-label="客户类型">
                  <button class="zxb-native-tab is-active" type="button" role="tab" aria-selected="true">全部客户</button>
                  <button class="zxb-native-tab" type="button" role="tab" aria-selected="false">待跟进</button>
                  <button class="zxb-native-tab" type="button" role="tab" aria-selected="false">已完成</button>
                </div>
              </article>
            </div>
          </section>
        `);
      }
    }

    foundation.querySelectorAll(".zxb-native-tabs").forEach((group) => {
      group.addEventListener("click", (event) => {
        const tab = event.target.closest('[role="tab"]');
        if (!tab || !group.contains(tab)) return;
        group.querySelectorAll('[role="tab"]').forEach((item) => {
          const active = item === tab;
          item.classList.toggle("is-active", active);
          item.setAttribute("aria-selected", active ? "true" : "false");
        });
      });
    });
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initZxbTabs, { once: true });
  } else {
    initZxbTabs();
  }
})();
