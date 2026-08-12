const app = document.querySelector('.app');
const toggle = document.querySelector('.collapse');
const renderIcons = () => window.lucide?.createIcons({ attrs: { 'stroke-width': 2 } });
const label = (expanded) => expanded ? '收起侧边栏' : '展开侧边栏';
const setSidebar = (expanded) => {
  app.dataset.sidebar = expanded ? 'expanded' : 'collapsed';
  toggle.setAttribute('aria-expanded', String(expanded));
  toggle.setAttribute('aria-label', label(expanded));
  document.documentElement.style.setProperty('--side', expanded ? '210px' : '64px');
  document.querySelectorAll('.sidebar .side').forEach(item => item.querySelector('b').hidden = !expanded);
  document.querySelectorAll('.sidebar .side em,.sidebar .sub').forEach(item => item.hidden = !expanded);
};
setSidebar(new URLSearchParams(location.search).get('sidebar') !== 'collapsed');
toggle.addEventListener('click', () => setSidebar(app.dataset.sidebar !== 'expanded'));
const sidebarItems = document.querySelectorAll('.sidebar .side');
sidebarItems.forEach(item => {
  item.addEventListener('click', () => {
    sidebarItems.forEach(side => side.classList.toggle('active', side === item));
    document.querySelectorAll('.sidebar .sub').forEach(sub => sub.classList.remove('active'));
  });
});
document.querySelector('[data-page="home"]')?.addEventListener('click', () => window.parent?.postMessage({ type: 'rtm-navigate', page: 'home' }, '*'));
document.querySelectorAll('.sidebar .sub').forEach(item => {
  item.addEventListener('click', () => {
    document.querySelectorAll('.sidebar .sub').forEach(sub => sub.classList.toggle('active', sub === item));
    sidebarItems.forEach(side => side.classList.toggle('active', side.title === '工作台'));
  });
});
const fundEyeSources = {
  open: '../assets/fund-eye-open.svg',
  closed: '../assets/fund-eye-closed.svg'
};
const setFundVisibility = (button, visible) => {
  const card = button.closest('.fund-card');
  const amount = card.querySelector('.fund-value');
  amount.firstChild.nodeValue = visible ? amount.dataset.value : '＊ ＊ ＊';
  button.dataset.visible = String(visible);
  button.setAttribute('aria-pressed', String(visible));
  button.setAttribute('aria-label', `${visible ? '隐藏' : '显示'}${card.querySelector('.amount-label').firstChild.textContent.trim()}`);
  button.querySelector('img').src = visible ? fundEyeSources.open : fundEyeSources.closed;
};
document.querySelectorAll('.visibility-toggle').forEach(button => {
  button.addEventListener('click', () => setFundVisibility(button, button.dataset.visible !== 'true'));
});
renderIcons();
