// 模拟引擎数据（实际项目中应通过JSON文件加载）
const defaultEngines = [
  // 🌐 综合搜索引擎
  { name: '百度', url: 'https://www.baidu.com/s?wd=%s' },
  { name: '谷歌', url: 'https://www.google.com/search?q=%s' },
  { name: '必应', url: 'https://cn.bing.com/search?q=%s' },
  { name: '搜狗', url: 'https://www.sogou.com/web?query=%s' },
  { name: '360搜索', url: 'https://www.so.com/s?q=%s' },
  { name: 'DuckDuckGo', url: 'https://duckduckgo.com/?q=%s' },
  { name: 'Yahoo', url: 'https://search.yahoo.com/search?p=%s' },
  { name: 'Yandex', url: 'https://yandex.com/search/?text=%s' },
  { name: 'StartPage', url: 'https://www.startpage.com/sp/search?q=%s' },
  { name: 'Ecosia', url: 'https://www.ecosia.org/search?q=%s' },

  // 📚 知识 / 问答 / 社区
  { name: '知乎', url: 'https://www.zhihu.com/search?type=content&q=%s' },
  { name: '豆瓣', url: 'https://www.douban.com/search?q=%s' },
  { name: '百度百科', url: 'https://baike.baidu.com/item/%s' },
  { name: '维基百科（中文）', url: 'https://zh.wikipedia.org/wiki/%s' },
  { name: '维基百科（英文）', url: 'https://en.wikipedia.org/wiki/%s' },
  { name: 'Quora', url: 'https://www.quora.com/search?q=%s' },
  { name: 'Reddit', url: 'https://www.reddit.com/search/?q=%s' },

  // 💻 技术 / 编程
  { name: 'GitHub', url: 'https://github.com/search?q=%s' },
  { name: 'Stack Overflow', url: 'https://stackoverflow.com/search?q=%s' },
  { name: '掘金', url: 'https://juejin.cn/search?query=%s' },
  { name: 'CSDN', url: 'https://so.csdn.net/so/search?q=%s' },
  { name: 'SegmentFault', url: 'https://segmentfault.com/search?q=%s' },

  // 📷 图片 / 视频 / 翻译
  { name: 'Google 图片', url: 'https://www.google.com/search?tbm=isch&q=%s' },
  { name: 'Bing 图片', url: 'https://cn.bing.com/images/search?q=%s' },
  { name: 'YouTube', url: 'https://www.youtube.com/results?search_query=%s' },
  { name: 'Bilibili', url: 'https://search.bilibili.com/all?keyword=%s' },
  { name: '抖音', url: 'https://www.douyin.com/search/%s' },
  { name: '腾讯视频', url: 'https://v.qq.com/x/search/?q=%s' },
  { name: '谷歌翻译', url: 'https://translate.google.com/?sl=auto&tl=zh-CN&text=%s' },
  { name: '有道翻译', url: 'https://fanyi.youdao.com/index.html#/?keyfrom=dict2.index&q=%s' },

  // 🛒 购物 / 电商
  { name: '淘宝', url: 'https://s.taobao.com/search?q=%s' },
  { name: '京东', url: 'https://search.jd.com/Search?keyword=%s' },
  { name: '拼多多', url: 'https://mobile.yangkeduo.com/search_result.html?search_key=%s' },
  { name: '小红书', url: 'https://www.xiaohongshu.com/search_result/%s' },
  { name: 'Amazon', url: 'https://www.amazon.com/s?k=%s' },
  { name: 'eBay', url: 'https://www.ebay.com/sch/i.html?_nkw=%s' },

  // 📰 新闻 / 学术
  { name: 'Google News', url: 'https://news.google.com/search?q=%s' },
  { name: '百度新闻', url: 'https://news.baidu.com/ns?word=%s' },
  { name: 'CNKI（知网）', url: 'https://search.cnki.net/search.aspx?q=%s' },
  { name: 'Google Scholar', url: 'https://scholar.google.com/scholar?q=%s' }
];


class SearchEngines {
  constructor() {
    this.loadEngines();
  }

  async loadEngines() {
    try {
      const response = await fetch('engines.json');
      const data = await response.json();
      this.engines = this.flattenCategories(data);
    } catch (error) {
      console.error('Failed to load engines:', error);
    }
  }

  flattenCategories(categories) {
    return categories.flatMap(category => category.items);
  }
}

const searchEngines = new SearchEngines();
// 在这里可以继续处理 searchEngines 对象

/**
 * 提取URL的主域名
 * @param {string} url - 要解析的URL
 * @returns {string} - 主域名
 */
function extractMainDomain(url) {
  try {
    const parsedUrl = new URL(url);
    let domain = parsedUrl.hostname;
    
    // 处理IP地址
    if (/^\d+\.\d+\.\d+\.\d+$/.test(domain)) {
      return domain;
    }
    
    // 处理特殊域名后缀
    const parts = domain.split('.');
    if (parts.length > 2) {
      // 简单处理常见的多级域名情况
      return parts.slice(-2).join('.');
    }
    
    return domain;
  } catch (e) {
    console.error('无效的URL:', url);
    return '';
  }
}

/**
 * 搜索引擎管理模块
 */
class EngineManager {
  constructor() {
    this.engines = [];
    this.customEngines = [];
    this.engineTabs = document.getElementById('engine-tabs');
  }
  
  init() {
    this.engines = defaultEngines;
    this.loadCustomEngines();
    this.renderEngines();
    this.setPreferredEngine();
  }
  
  loadCustomEngines() {
    const saved = localStorage.getItem('custom_engines');
    if (saved) {
      try {
        this.customEngines = JSON.parse(saved);
      } catch (e) {
        console.error('Failed to parse custom engines', e);
        this.customEngines = [];
      }
    }
  }
  
  renderEngines() {
    if (!this.engineTabs) return;
    
    this.engineTabs.innerHTML = '';
    const allEngines = [...this.engines, ...this.customEngines];
    
    allEngines.forEach(engine => {
      const btn = document.createElement('button');
      btn.textContent = engine.name;
      btn.className = 'px-4 py-2 rounded-md transition-all hover:bg-primary/10';
      btn.onclick = () => this.setEngine(engine.url, btn);
      this.engineTabs.appendChild(btn);
    });
  }
  
  setEngine(url, btn) {
    localStorage.setItem('engine', url);
    
    // 更新UI
    document.querySelectorAll('#engine-tabs button').forEach(b => {
      b.classList.remove('bg-primary', 'text-white');
      b.classList.add('hover:bg-primary/10');
    });
    
    btn.classList.add('bg-primary', 'text-white');
    btn.classList.remove('hover:bg-primary/10');
  }
  
  setPreferredEngine() {
    const url = localStorage.getItem('engine');
    if (!url || !this.engineTabs) return;

    Array.from(this.engineTabs.children).forEach(btn => {
      const engine = [...this.engines, ...this.customEngines].find(e => e.name === btn.textContent);
      if (engine && engine.url === url) {
        this.setEngine(url, btn);
      }
    });
  }
  
  addEngine() {
    const nameInput = document.getElementById('engine-name');
    const urlInput = document.getElementById('engine-url');
    
    if (!nameInput || !urlInput) return;
    
    const name = nameInput.value.trim();
    const url = urlInput.value.trim();
    
    if (!name || !url) {
      this.showNotification('请输入名称和URL', 'error');
      return;
    }
    
    // 检查是否已存在相同名称或URL的引擎
    const exists = [...this.engines, ...this.customEngines].some(
      e => e.name === name || e.url === url
    );
    
    if (exists) {
      this.showNotification('该搜索引擎已存在', 'error');
      return;
    }
    
    this.customEngines.push({ name, url });
    localStorage.setItem('custom_engines', JSON.stringify(this.customEngines));
    this.renderEngines();
    
    // 清空输入框
    nameInput.value = '';
    urlInput.value = '';
    
    this.showNotification(`已添加搜索引擎: ${name}`, 'success');
  }
  
  showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `fixed top-4 right-4 px-4 py-2 rounded-md shadow-lg z-50 transition-all duration-300 transform translate-x-full ${
      type === 'success' ? 'bg-green-500 text-white' : 
      type === 'error' ? 'bg-red-500 text-white' : 
      'bg-blue-500 text-white'
    }`;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    // 显示通知
    setTimeout(() => {
      notification.classList.remove('translate-x-full');
    }, 10);
    
    // 自动关闭
    setTimeout(() => {
      notification.classList.add('translate-x-full');
      setTimeout(() => {
        document.body.removeChild(notification);
      }, 300);
    }, 3000);
  }
}

/**
 * 搜索功能模块
 */
class SearchManager {
  constructor() {
    this.searchInput = document.getElementById('search');
    this.historyBox = document.getElementById('search-history');
    this.maxHistoryItems = 10;
  }
  
  init() {
    if (!this.searchInput || !this.historyBox) return;
    
    this.setupEventListeners();
    this.renderHistory();
    
    // 添加事件委托处理快捷热词
    const hotKeysContainer = document.querySelector('.hot-keys');
    if (hotKeysContainer) {
      hotKeysContainer.addEventListener('click', (e) => {
        if (e.target.tagName === 'SPAN') {
          this.setKeyword(e.target.textContent);
        }
      });
    }
  }
  
  setupEventListeners() {
    // 搜索输入框事件
    this.searchInput.addEventListener('keypress', e => {
      if (e.key === 'Enter') this.doSearch();
    });
    
    // 搜索按钮事件
    const searchButton = document.getElementById('search-button');
    if (searchButton) {
      searchButton.addEventListener('click', () => this.doSearch());
    }
    
    // 语音搜索按钮事件
    const voiceButton = document.getElementById('voice-button');
    if (voiceButton) {
      voiceButton.addEventListener('click', () => this.startVoice());
    }
  }
  
  doSearch() {
    if (!this.searchInput) return;
    
    const query = this.searchInput.value.trim();
    if (!query) {
      this.showNotification('请输入搜索关键词', 'error');
      return;
    }
    
    const engineUrl = localStorage.getItem('engine') || defaultEngines[0]?.url;
    if (!engineUrl) {
      this.showNotification('未配置搜索引擎', 'error');
      return;
    }
    
    window.open(engineUrl.replace('%s', encodeURIComponent(query)), '_blank');
    this.saveHistory(query);
  }
  
  saveHistory(query) {
    if (!query || !this.historyBox) return;
    
    let history = JSON.parse(localStorage.getItem('search_history') || '[]');
    
    // 移除已存在的相同查询
    const index = history.indexOf(query);
    if (index !== -1) {
      history.splice(index, 1);
    }
    
    // 添加到历史记录开头
    history.unshift(query);
    
    // 限制历史记录数量
    if (history.length > this.maxHistoryItems) {
      history.pop();
    }
    
    localStorage.setItem('search_history', JSON.stringify(history));
    this.renderHistory();
  }
  
  renderHistory() {
    if (!this.historyBox) return;
    
    const history = JSON.parse(localStorage.getItem('search_history') || '[]');
    
    this.historyBox.innerHTML = '';
    
    if (history.length === 0) {
      const emptyMsg = document.createElement('div');
      emptyMsg.className = 'text-gray-500 text-sm mt-2';
      emptyMsg.textContent = '暂无搜索历史';
      this.historyBox.appendChild(emptyMsg);
      return;
    }
    
    const title = document.createElement('div');
    title.className = 'text-gray-500 text-sm mb-1';
    title.textContent = '搜索历史：';
    this.historyBox.appendChild(title);
    
    const historyContainer = document.createElement('div');
    historyContainer.className = 'flex flex-wrap gap-2 mt-1';
    
    history.forEach(query => {
      const span = document.createElement('span');
      span.className = 'px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded-md text-sm cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors';
      span.textContent = query;
      span.onclick = () => this.setKeyword(query);
      historyContainer.appendChild(span);
    });
    
    this.historyBox.appendChild(historyContainer);
  }
  
  setKeyword(text) {
    if (this.searchInput) {
      this.searchInput.value = text;
      this.searchInput.focus();
    }
  }
  
  startVoice() {
    if (!('webkitSpeechRecognition' in window)) {
      this.showNotification('浏览器不支持语音识别', 'error');
      return;
    }
    
    const recognition = new webkitSpeechRecognition();
    recognition.lang = 'zh-CN';
    recognition.continuous = false;
    
    recognition.onresult = e => {
      if (this.searchInput) {
        this.searchInput.value = e.results[0][0].transcript;
        this.doSearch();
      }
    };
    
    recognition.onerror = e => {
      console.error('语音识别错误', e);
      this.showNotification('语音识别失败，请重试', 'error');
    };
    
    recognition.start();
    
    // 显示语音识别状态
    this.showNotification('正在聆听...', 'info');
  }
  
  showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `fixed top-4 right-4 px-4 py-2 rounded-md shadow-lg z-50 transition-all duration-300 transform translate-x-full ${
      type === 'success' ? 'bg-green-500 text-white' : 
      type === 'error' ? 'bg-red-500 text-white' : 
      'bg-blue-500 text-white'
    }`;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    // 显示通知
    setTimeout(() => {
      notification.classList.remove('translate-x-full');
    }, 10);
    
    // 自动关闭
    setTimeout(() => {
      notification.classList.add('translate-x-full');
      setTimeout(() => {
        document.body.removeChild(notification);
      }, 300);
    }, 3000);
  }
}

/**
 * 自定义网站管理模块
 */
class SiteManager {
  constructor() {
    this.searchInput = document.getElementById('bookmark-search');
    this.categoryList = document.getElementById('category-list');
    this.sitesContainer = document.getElementById('sites-by-category');
    this.currentCategory = '';
    this.searchQuery = '';
  }
  
  init() {
    if (!this.searchInput || !this.categoryList || !this.sitesContainer) return;
    
    this.setupEventListeners();
    this.filterSites();
    this.updateCategoryList();
    this.restoreSectionState();
  }
  
  setupEventListeners() {
    // 添加网站按钮事件
    const addSiteBtn = document.getElementById('add-site');
    if (addSiteBtn) {
      addSiteBtn.addEventListener('click', () => this.openAddModal());
    }
    
    // 编辑/删除按钮切换事件
    const toggleEditBtn = document.getElementById('toggle-edit-btn');
    if (toggleEditBtn) {
      toggleEditBtn.addEventListener('click', () => this.toggleEditButtons());
    }
    
    const toggleDeleteBtn = document.getElementById('toggle-delete-btn');
    if (toggleDeleteBtn) {
      toggleDeleteBtn.addEventListener('click', () => this.toggleDeleteButtons());
    }
    
    // 分类筛选事件
    const filterCategory = document.getElementById('filter-category');
    if (filterCategory) {
      filterCategory.addEventListener('change', () => this.filterByCategory());
    }
    
    // 提交网站事件
    const submitSiteBtn = document.getElementById('submit-site');
    if (submitSiteBtn) {
      submitSiteBtn.addEventListener('click', () => this.submitSite());
    }
    
    // 弹窗关闭事件
    const modalOverlay = document.getElementById('modal-overlay');
    const closeModalBtn = document.getElementById('close-modal');
    
    if (modalOverlay) {
      modalOverlay.addEventListener('click', this.closeModal.bind(this));
    }
    
    if (closeModalBtn) {
      closeModalBtn.addEventListener('click', this.closeModal.bind(this));
    }
    
    // 书签搜索事件
    this.searchInput.addEventListener('input', () => {
      this.searchQuery = this.searchInput.value.trim().toLowerCase();
      this.filterSites();
    });
    
    // 侧边栏切换事件
    const sidebarToggle = document.getElementById('sidebar-toggle');
    if (sidebarToggle) {
      sidebarToggle.addEventListener('click', () => {
        document.getElementById('sidebar')?.classList.toggle('hidden');
        document.getElementById('search-container')?.classList.toggle('ml-64');
        document.getElementById('custom-sites-panel')?.classList.toggle('ml-64');
      });
    }
    
    // 监听站点容器的点击事件（用于折叠/展开）
    this.sitesContainer.addEventListener('click', (e) => {
      const h4 = e.target.closest('h4.sec-h4-a');
      if (h4) {
        const section = h4.parentElement;
        const ul = section.querySelector('ul');
        if (ul) {
          ul.classList.toggle('collapsed');
          section.classList.toggle('sec-collapsed');
          
          // 保存折叠状态
          const sectionId = section.id;
          const isCollapsed = ul.classList.contains('collapsed');
          this.saveSectionState(sectionId, isCollapsed);
        }
      }
    });
  }
  
  openAddModal(isEdit = false, site = null) {
    const modalTitle = document.getElementById('modal-title');
    const nameInput = document.getElementById('modal-site-name');
    const urlInput = document.getElementById('modal-site-url');
    const categoryInput = document.getElementById('modal-site-category');
    
    if (!modalTitle || !nameInput || !urlInput || !categoryInput) return;
    
    if (isEdit && site) {
      modalTitle.textContent = '编辑网站';
      nameInput.value = site.name;
      urlInput.value = site.url;
      categoryInput.value = site.category || '';
    } else {
      modalTitle.textContent = '添加网站';
      nameInput.value = '';
      urlInput.value = '';
      categoryInput.value = '';
    }
    
    const modalOverlay = document.getElementById('modal-overlay');
    const modalBox = document.getElementById('modal-box');
    
    if (modalOverlay && modalBox) {
      modalOverlay.style.display = 'block';
      modalBox.style.display = 'block';
    }
  }
  
  closeModal() {
    const modalOverlay = document.getElementById('modal-overlay');
    const modalBox = document.getElementById('modal-box');
    
    if (modalOverlay && modalBox) {
      modalOverlay.style.display = 'none';
      modalBox.style.display = 'none';
    }
  }
  
  toggleEditButtons() {
    const editButtons = document.querySelectorAll('.edit-btn');
    const btn = document.getElementById('toggle-edit-btn');
    
    if (!btn || editButtons.length === 0) return;
    
    const firstDisplay = window.getComputedStyle(editButtons[0]).display;
    const shouldShow = firstDisplay === 'none';
    
    editButtons.forEach(btnEl => {
      btnEl.style.display = shouldShow ? 'inline-block' : 'none';
    });
    
    btn.innerHTML = shouldShow ? '<i class="fa-solid fa-pen-to-square"></i>' : '<i class="fa-solid fa-file-pen"></i>';
  }
  
  toggleDeleteButtons() {
    const deleteButtons = document.querySelectorAll('.delete-btn');
    const btn = document.getElementById('toggle-delete-btn');
    
    if (!btn || deleteButtons.length === 0) return;
    
    const firstDisplay = window.getComputedStyle(deleteButtons[0]).display;
    const shouldShow = firstDisplay === 'none';
    
    deleteButtons.forEach(btnEl => {
      btnEl.style.display = shouldShow ? 'inline-block' : 'none';
    });
    
    btn.innerHTML = shouldShow ? '<i class="fa-solid fa-trash-can"></i>' : '<i class="fa-regular fa-trash-can"></i>';
  }
  
  submitSite() {
    const nameInput = document.getElementById('modal-site-name');
    const urlInput = document.getElementById('modal-site-url');
    const categoryInput = document.getElementById('modal-site-category');
    
    if (!nameInput || !urlInput) return;
    
    const name = nameInput.value.trim();
    const url = urlInput.value.trim();
    const category = categoryInput?.value.trim() || '';
    
    if (!name || !url) {
      this.showNotification('请输入网站名称和URL', 'error');
      return;
    }
    
    // 确保URL以协议开头
    let formattedUrl = url;
    if (!url.startsWith('http://') && !url.startsWith('https://')) {
      formattedUrl = 'https://' + url;
    }
    
    let sites = JSON.parse(localStorage.getItem('custom_sites') || '[]');
    const existingSiteIndex = sites.findIndex(site => site.url === formattedUrl);
    
    if (existingSiteIndex > -1) {
      // 编辑已有网站
      sites[existingSiteIndex] = { name, url: formattedUrl, category };
      this.showNotification(`已更新网站: ${name}`, 'success');
    } else {
      // 新增网站
      sites.push({ name, url: formattedUrl, category });
      this.showNotification(`已添加网站: ${name}`, 'success');
    }
    
    localStorage.setItem('custom_sites', JSON.stringify(sites));
    this.closeModal();
    this.filterSites();
    this.updateCategoryList();
  }
  
  deleteSite(urlToDelete) {
    if (!confirm('确定要删除这个网站吗？')) return;
    
    let sites = JSON.parse(localStorage.getItem('custom_sites') || '[]');
    const siteToDelete = sites.find(site => site.url === urlToDelete);
    
    if (siteToDelete) {
      sites = sites.filter(site => site.url !== urlToDelete);
      localStorage.setItem('custom_sites', JSON.stringify(sites));
      this.filterSites();
      this.updateCategoryList();
      this.showNotification(`已删除网站: ${siteToDelete.name}`, 'info');
    }
  }
  
  filterSites() {
    if (!this.sitesContainer) return;
    
    const filter = document.getElementById('filter-category')?.value || '';
    this.currentCategory = filter;
    const sites = JSON.parse(localStorage.getItem('custom_sites') || '[]');
    this.sitesContainer.innerHTML = '';
    
    // 先处理没有分类的网站
    const hotSites = sites.filter(s => {
      const hasNoCategory = !s.category || s.category.trim() === '';
      const categoryMatch = !filter || (s.category && s.category === filter);
      const searchMatch = this.searchQuery === '' || 
                          (s.name && s.name.toLowerCase().includes(this.searchQuery)) || 
                          (s.url && s.url.toLowerCase().includes(this.searchQuery)) ||
                          (s.category && s.category.toLowerCase().includes(this.searchQuery));
      return (hasNoCategory || categoryMatch) && searchMatch;
    });
    
    if (hotSites.length > 0) {
      const hotSection = this.createSection('HOT');
      hotSites.forEach(site => this.addSiteToSection(hotSection, site));
    }
    
    // 处理有分类的网站
    const categorizedSites = sites.filter(s => {
      const hasCategory = s.category && s.category.trim() !== '';
      const categoryMatch = !filter || s.category === filter;
      const searchMatch = this.searchQuery === '' || 
                          (s.name && s.name.toLowerCase().includes(this.searchQuery)) || 
                          (s.url && s.url.toLowerCase().includes(this.searchQuery)) ||
                          (s.category && s.category.toLowerCase().includes(this.searchQuery));
      return hasCategory && categoryMatch && searchMatch;
    });
    
    // 按分类分组
    const sitesByCategory = {};
    categorizedSites.forEach(site => {
      const category = site.category;
      if (!sitesByCategory[category]) {
        sitesByCategory[category] = [];
      }
      sitesByCategory[category].push(site);
    });
    
    // 创建分类区块
    Object.keys(sitesByCategory).forEach(category => {
      const section = this.createSection(category);
      sitesByCategory[category].forEach(site => this.addSiteToSection(section, site));
    });
    
    // 恢复折叠状态
    this.restoreSectionState();
  }
  
  filterByCategory() {
    this.currentCategory = document.getElementById('filter-category')?.value || '';
    this.filterSites();
    
    // 更新侧边栏选中状态
    if (this.categoryList) {
      this.categoryList.querySelectorAll('.category-item').forEach(item => {
        item.classList.remove('active');
        if (item.dataset.category === this.currentCategory) {
          item.classList.add('active');
        }
      });
    }
  }
  
  addSiteToSection(section, site) {
    if (!section) return;
    
    const li = document.createElement('li');
    li.className = 'list-item flex items-center p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors';
    
    // 检查是否匹配搜索关键词，添加高亮类
    if (this.searchQuery && (
        (site.name && site.name.toLowerCase().includes(this.searchQuery)) || 
        (site.url && site.url.toLowerCase().includes(this.searchQuery)) ||
        (site.category && site.category.toLowerCase().includes(this.searchQuery))
      )) {
      li.classList.add('bg-yellow-50', 'dark:bg-yellow-900/30');
    }
    
    // 创建网站链接
    const a = document.createElement('a');
    a.href = site.url;
    a.target = '_blank';
    a.className = 'flex items-center w-full';
    a.title = site.name;
    
    // 创建图标容器
    const iconContainer = document.createElement('div');
    iconContainer.className = 'w-8 h-8 flex items-center justify-center rounded-md mr-3 bg-gray-100 dark:bg-gray-700';
    
    // 创建网站图标
    const img = document.createElement('img');
    img.src = `https://t3.gstatic.cn/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&size=128&url=${site.url}`;
    img.className = 'lazy favicon-icon w-5 h-5 object-cover';
    img.alt = site.name;
    img.title = site.name;
    img.onerror = function() {
      this.src = 'https://picsum.photos/200/200?random=' + site.name;
    };
    
    // 高亮搜索关键词
    let name = site.name;
    if (this.searchQuery && name) {
      name = name.replace(new RegExp(this.searchQuery, 'gi'), match => {
        return `<span class="bg-yellow-200 dark:bg-yellow-700 rounded px-1">${match}</span>`;
      });
    }
    
    const nameSpan = document.createElement('span');
    nameSpan.innerHTML = name;
    
    // 编辑按钮
    const editBtn = document.createElement('button');
    editBtn.className = 'edit-btn management-button text-gray-500 hover:text-primary mr-2 hidden';
    editBtn.innerHTML = '<i class="fa-solid fa-pencil"></i>';
    editBtn.onclick = (e) => {
      e.stopPropagation();
      this.openAddModal(true, site);
    };
    
    // 删除按钮
    const delBtn = document.createElement('button');
    delBtn.className = 'delete-btn management-button text-gray-500 hover:text-red-500 hidden';
    delBtn.innerHTML = '<i class="fa-solid fa-trash"></i>';
    delBtn.onclick = (e) => {
      e.stopPropagation();
      this.deleteSite(site.url);
    };
    
    // 按钮容器
    const btnContainer = document.createElement('div');
    btnContainer.className = 'ml-auto flex items-center';
    btnContainer.appendChild(editBtn);
    btnContainer.appendChild(delBtn);
    
    // 组装元素
    iconContainer.appendChild(img);
    a.appendChild(iconContainer);
    a.appendChild(nameSpan);
    li.appendChild(a);
    li.appendChild(btnContainer);
    
    // 添加到列表
    section.querySelector('ul')?.appendChild(li);
  }
  
  createSection(category) {
    if (!this.sitesContainer) return null;
    
    const section = document.createElement('section');
    section.id = this.sanitizeId(category);
    section.className = 'mb-6';
    
    // 检查是否有保存的折叠状态
    const storedState = JSON.parse(localStorage.getItem('sectionState') || '{}');
    const isCollapsed = storedState[section.id];
    
    section.innerHTML = `
      <h4 class="sec-h4-a flex items-center justify-between cursor-pointer mb-2 px-3 py-2 bg-gray-100 dark:bg-gray-800 rounded-md">
        <span>${category}</span>
        <i class="arrow fa fa-chevron-down transition-transform duration-300 ${isCollapsed ? '' : 'open'}"></i>
      </h4>
      <ul class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2 ${isCollapsed ? 'collapsed' : ''}">
      </ul>
    `;
    
    this.sitesContainer.appendChild(section);
    return section;
  }
  
  updateCategoryList() {
    if (!this.categoryList) return;
    
    const sites = JSON.parse(localStorage.getItem('custom_sites') || '[]');
    const categories = new Set(['']); // 包含空类别（所有书签）
    
    sites.forEach(site => {
      if (site.category) {
        categories.add(site.category);
      }
    });
    
    this.categoryList.innerHTML = '';
    
    categories.forEach(category => {
      const item = document.createElement('li');
      item.className = `category-item px-3 py-2 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md transition-colors ${
        category === this.currentCategory ? 'bg-primary/10 text-primary' : ''
      }`;
      item.dataset.category = category;
      item.textContent = category || '所有书签';
      
      item.addEventListener('click', () => {
        // 更新筛选下拉框
        const filterCategory = document.getElementById('filter-category');
        if (filterCategory) {
          filterCategory.value = category;
        }
        
        this.filterByCategory();
        
        // 滚动跳转到对应分类区块
        const sectionId = this.sanitizeId(category);
        const targetSection = document.getElementById(sectionId);
        if (targetSection) {
          targetSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      });
      
      this.categoryList.appendChild(item);
    });
  }
  
  sanitizeId(str) {
    if (!str) return 'section-unknown';
    // 使用 encodeURIComponent 对字符串进行编码，保留中文和其他特殊字符
    return encodeURIComponent(str).replace(/[^\w]/g, '_').toLowerCase();
  }
  
  saveSectionState(sectionId, isCollapsed) {
    const storedState = JSON.parse(localStorage.getItem('sectionState') || '{}');
    storedState[sectionId] = isCollapsed;
    localStorage.setItem('sectionState', JSON.stringify(storedState));
  }
  
  restoreSectionState() {
    const storedState = JSON.parse(localStorage.getItem('sectionState') || '{}');
    document.querySelectorAll('#sites-by-category section').forEach(section => {
      const sectionId = section.id;
      const ul = section.querySelector('ul');
      const arrow = section.querySelector('h4 .arrow');

      if (ul && sectionId) {
        const isCollapsed = storedState[sectionId];
        ul.classList.toggle('collapsed', isCollapsed);
        section.classList.toggle('sec-collapsed', isCollapsed);
        arrow?.classList.toggle('open', !isCollapsed);
      }
    });
  }
  
  showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `fixed top-4 right-4 px-4 py-2 rounded-md shadow-lg z-50 transition-all duration-300 transform translate-x-full ${
      type === 'success' ? 'bg-green-500 text-white' : 
      type === 'error' ? 'bg-red-500 text-white' : 
      'bg-blue-500 text-white'
    }`;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    // 显示通知
    setTimeout(() => {
      notification.classList.remove('translate-x-full');
    }, 10);
    
    // 自动关闭
    setTimeout(() => {
      notification.classList.add('translate-x-full');
      setTimeout(() => {
        document.body.removeChild(notification);
      }, 300);
    }, 3000);
  }
}

/**
 * 主题管理模块
 */
class ThemeManager {
  constructor() {
    this.toggleBtn = document.getElementById('toggle-theme');
  }
  
  init() {
    if (!this.toggleBtn) return;
    
    // 首先应用存储的主题
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      this.applyTheme(true);
    } else if (savedTheme === 'light') {
      this.applyTheme(false);
    } else {
      // 默认使用亮色主题
      this.applyTheme(false);
    }
    
    // 绑定切换按钮事件
    this.toggleBtn.addEventListener('click', () => {
      this.applyTheme(!document.body.classList.contains('dark'));
    });
  }
  
  applyTheme(dark) {
    // 明确设置主题类
    document.body.classList.toggle('dark', dark);
    document.body.classList.toggle('light', !dark);
    
    // 更新本地存储
    localStorage.setItem('theme', dark ? 'dark' : 'light');
    
    // 更新按钮图标
    this.updateToggleButton(dark);
  }
  
  updateToggleButton(dark) {
    if (this.toggleBtn) {
      this.toggleBtn.innerHTML = dark
        ? '<i class="fa-solid fa-sun"></i>'
        : '<i class="fa-solid fa-moon"></i>';
    }
  }
}

/**
 * 书签栏显示管理模块
 */
class BookmarksManager {
  constructor() {
    this.toggleBtn = document.getElementById('toggle-sidebar');
  }
  
  init() {
    if (!this.toggleBtn) return;
    
    // 首先应用存储的状态
    const savedState = localStorage.getItem('bookmarks');
    if (savedState === 'hide') {
      this.applyState(true);
    } else if (savedState === 'display') {
      this.applyState(false);
    } else {
      // 默认显示
      this.applyState(false);
    }
    
    // 绑定切换按钮事件
    this.toggleBtn.addEventListener('click', () => {
      this.applyState(!document.body.classList.contains('sidebar-hidden'));
    });
  }
  
  applyState(hide) {
    // 明确设置状态类
    document.body.classList.toggle('sidebar-hidden', hide);
    document.body.classList.toggle('sidebar-visible', !hide);
    
    // 更新本地存储
    localStorage.setItem('bookmarks', hide ? 'hide' : 'display');
    
    // 更新按钮图标
    this.updateToggleButton(hide);
  }
  
  updateToggleButton(hide) {
    if (this.toggleBtn) {
      this.toggleBtn.innerHTML = hide
        ? '<i class="fa-solid fa-eye"></i>'
        : '<i class="fa-solid fa-eye-slash"></i>';
    }
  }
}

/**
 * 配置面板管理模块
 */
class ConfigPanelManager {
  constructor() {
    this.panel = document.getElementById('config-panel');
    this.toggleBtn = document.getElementById('config-toggle');
  }
  
  init() {
    if (!this.toggleBtn) return;
    
    this.toggleBtn.addEventListener('click', () => this.toggleConfigPanel());
    
    // 绑定添加搜索引擎按钮事件
    const addEngineBtn = document.getElementById('add-engine');
    if (addEngineBtn) {
      addEngineBtn.addEventListener('click', () => {
        const engineManager = new EngineManager();
        engineManager.addEngine();
      });
    }
  }
  
  toggleConfigPanel() {
    if (this.panel) {
      this.panel.style.display = this.panel.style.display === 'block' ? 'none' : 'block';
    }
  }
}

/**
 * 背景设置管理模块
 */
class BackgroundManager {
  constructor() {
    this.panel = document.getElementById('bg-settings-panel');
    this.settingsBtn = document.getElementById('bg-settings-btn');
  }
  
  init() {
    if (!this.settingsBtn) return;
    
    // 初始化面板显示
    this.settingsBtn.addEventListener('click', () => {
      if (this.panel) {
        this.panel.style.display = this.panel.style.display === 'block' ? 'none' : 'block';
      }
    });
    
    // 加载保存的背景设置
    this.loadSavedSettings();
    
    // 预设背景按钮事件
    document.querySelectorAll('.bg-preset').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('.bg-preset').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        
        const type = btn.dataset.type;
        if (type === 'bing') {
          this.setBingBackground();
        } else if (type === 'solid') {
          this.setSolidBackground(btn.dataset.color);
        } else if (type === 'gradient') {
          this.setGradientBackground(btn.dataset.color.split(','));
        }
      });
    });
    
    // 保存按钮事件
    const saveBtn = document.getElementById('save-bg-settings');
    if (saveBtn) {
      saveBtn.addEventListener('click', () => {
        this.saveCustomSettings();
      });
    }
    
    // 重置按钮事件
    const resetBtn = document.getElementById('reset-bg-settings');
    if (resetBtn) {
      resetBtn.addEventListener('click', () => {
        if (confirm('确定要重置背景设置吗？')) {
          this.resetSettings();
        }
      });
    }
    
    // 图片上传事件
    const bgImageFile = document.getElementById('bg-image-file');
    if (bgImageFile) {
      bgImageFile.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (file) {
          const reader = new FileReader();
          reader.onload = (event) => {
            const bgImageUrl = document.getElementById('bg-image-url');
            if (bgImageUrl) {
              bgImageUrl.value = event.target.result;
              this.previewCustomBackground();
            }
          };
          reader.readAsDataURL(file);
        }
      });
    }
    
    // 实时预览
    const bgColor = document.getElementById('bg-color');
    const bgImageUrl = document.getElementById('bg-image-url');
    const bgOpacity = document.getElementById('bg-opacity');
    const bgPosition = document.getElementById('bg-position');
    const bgRepeat = document.getElementById('bg-repeat');
    
    if (bgColor) bgColor.addEventListener('input', () => this.previewCustomBackground());
    if (bgImageUrl) bgImageUrl.addEventListener('input', () => this.previewCustomBackground());
    if (bgOpacity) bgOpacity.addEventListener('input', () => this.previewCustomBackground());
    if (bgPosition) bgPosition.addEventListener('change', () => this.previewCustomBackground());
    if (bgRepeat) bgRepeat.addEventListener('change', () => this.previewCustomBackground());
  }
  
  loadSavedSettings() {
    const savedBg = JSON.parse(localStorage.getItem('background_settings') || '{}');
    
    if (savedBg.type === 'bing') {
      this.setBingBackground();
      document.querySelector('.bg-preset[data-type="bing"]')?.classList.add('active');
    } else if (savedBg.type === 'solid') {
      this.setSolidBackground(savedBg.color);
      document.querySelector(`.bg-preset[data-type="solid"][data-color="${savedBg.color}"]`)?.classList.add('active');
    } else if (savedBg.type === 'gradient') {
      this.setGradientBackground(savedBg.colors);
      document.querySelector(`.bg-preset[data-type="gradient"][data-color="${savedBg.colors.join(',')}"]`)?.classList.add('active');
    } else if (savedBg.type === 'custom') {
      // 恢复自定义设置
      const bgColor = document.getElementById('bg-color');
      const bgImageUrl = document.getElementById('bg-image-url');
      const bgOpacity = document.getElementById('bg-opacity');
      const bgPosition = document.getElementById('bg-position');
      const bgRepeat = document.getElementById('bg-repeat');
      
      if (bgColor) bgColor.value = savedBg.color || '#ffffff';
      if (bgImageUrl) bgImageUrl.value = savedBg.imageUrl || '';
      if (bgOpacity) bgOpacity.value = savedBg.opacity || 100;
      if (bgPosition) bgPosition.value = savedBg.position || 'center';
      if (bgRepeat) bgRepeat.value = savedBg.repeat || 'no-repeat';
      
      this.previewCustomBackground();
    } else {
      // 默认使用Bing壁纸
      this.setBingBackground();
      document.querySelector('.bg-preset[data-type="bing"]')?.classList.add('active');
    }
  }
  
  setBingBackground() {
    fetch('https://corsproxy.io/?https://www.bing.com/HPImageArchive.aspx?format=js&idx=0&n=1')
      .then(res => res.json())
      .then(data => {
        const imageUrl = 'https://bing.com' + data.images[0].url;
        document.body.style.backgroundImage = `url(${imageUrl})`;
        document.body.style.backgroundColor = '';
        document.body.style.backgroundPosition = 'center';
        document.body.style.backgroundRepeat = 'no-repeat';
        document.body.style.backgroundSize = 'cover';
        document.body.style.opacity = '1';
        
        // 保存设置
        localStorage.setItem('background_settings', JSON.stringify({
          type: 'bing'
        }));
        
        this.showNotification('已设置为Bing每日壁纸', 'success');
      })
      .catch(err => {
        console.error('Failed to load Bing background', err);
        this.showNotification('获取Bing壁纸失败，使用默认背景', 'error');
        this.setSolidBackground('#f8f9fa');
      });
  }
  
  setSolidBackground(color) {
    document.body.style.backgroundColor = color;
    document.body.style.backgroundImage = '';
    document.body.style.opacity = '1';
    
    // 保存设置
    localStorage.setItem('background_settings', JSON.stringify({
      type: 'solid',
      color
    }));
    
    this.showNotification(`已设置纯色背景: ${color}`, 'success');
  }
  
  setGradientBackground(colors) {
    document.body.style.backgroundImage = `linear-gradient(45deg, ${colors.join(',')})`;
    document.body.style.backgroundColor = '';
    document.body.style.opacity = '1';
    
    // 保存设置
    localStorage.setItem('background_settings', JSON.stringify({
      type: 'gradient',
      colors
    }));
    
    this.showNotification('已设置渐变背景', 'success');
  }
  
  previewCustomBackground() {
    const bgColor = document.getElementById('bg-color')?.value || '#ffffff';
    const bgImageUrl = document.getElementById('bg-image-url')?.value || '';
    const bgOpacity = (document.getElementById('bg-opacity')?.value || 100) / 100;
    const bgPosition = document.getElementById('bg-position')?.value || 'center';
    const bgRepeat = document.getElementById('bg-repeat')?.value || 'no-repeat';
    
    // 应用背景颜色
    document.body.style.backgroundColor = bgColor;
    
    // 应用背景图片
    if (bgImageUrl) {
      document.body.style.backgroundImage = `url(${bgImageUrl})`;
      document.body.style.backgroundPosition = bgPosition === 'cover' ? 'center' : bgPosition;
      document.body.style.backgroundRepeat = bgRepeat;
      document.body.style.backgroundSize = bgPosition === 'cover' ? 'cover' : 'auto';
    } else {
      document.body.style.backgroundImage = '';
    }
    
    // 应用透明度
    document.body.style.opacity = bgOpacity;
  }
  
  saveCustomSettings() {
    const bgColor = document.getElementById('bg-color')?.value || '#ffffff';
    const bgImageUrl = document.getElementById('bg-image-url')?.value || '';
    const bgOpacity = document.getElementById('bg-opacity')?.value || 100;
    const bgPosition = document.getElementById('bg-position')?.value || 'center';
    const bgRepeat = document.getElementById('bg-repeat')?.value || 'no-repeat';
    
    // 保存设置
    localStorage.setItem('background_settings', JSON.stringify({
      type: 'custom',
      color: bgColor,
      imageUrl: bgImageUrl,
      opacity: bgOpacity,
      position: bgPosition,
      repeat: bgRepeat
    }));
    
    this.showNotification('背景设置已保存！', 'success');
  }
  
  resetSettings() {
    // 清除本地存储
    localStorage.removeItem('background_settings');
    
    // 重置UI
    document.querySelectorAll('.bg-preset').forEach(b => b.classList.remove('active'));
    
    const bgColor = document.getElementById('bg-color');
    const bgImageUrl = document.getElementById('bg-image-url');
    const bgOpacity = document.getElementById('bg-opacity');
    const bgPosition = document.getElementById('bg-position');
    const bgRepeat = document.getElementById('bg-repeat');
    
    if (bgColor) bgColor.value = '#ffffff';
    if (bgImageUrl) bgImageUrl.value = '';
    if (bgOpacity) bgOpacity.value = 100;
    if (bgPosition) bgPosition.value = 'center';
    if (bgRepeat) bgRepeat.value = 'no-repeat';
    
    // 重置背景
    this.setBingBackground();
    
    this.showNotification('背景设置已重置！', 'info');
  }
  
  showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `fixed top-4 right-4 px-4 py-2 rounded-md shadow-lg z-50 transition-all duration-300 transform translate-x-full ${
      type === 'success' ? 'bg-green-500 text-white' : 
      type === 'error' ? 'bg-red-500 text-white' : 
      'bg-blue-500 text-white'
    }`;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    // 显示通知
    setTimeout(() => {
      notification.classList.remove('translate-x-full');
    }, 10);
    
    // 自动关闭
    setTimeout(() => {
      notification.classList.add('translate-x-full');
      setTimeout(() => {
        document.body.removeChild(notification);
      }, 300);
    }, 3000);
  }
}

/**
 * 书签管理模块（支持分类导入导出）
 */
class BookmarkManager {
  // 导出书签为HTML格式，支持分类
  static exportBookmarks() {
    const sites = JSON.parse(localStorage.getItem('custom_sites') || '[]');
    if (sites.length === 0) {
      alert('没有可导出的书签');
      return;
    }
    
    const timestamp = Math.floor(Date.now() / 1000);
    let html = `<!DOCTYPE NETSCAPE-Bookmark-file-1>
    <META HTTP-EQUIV="Content-Type" CONTENT="text/html; charset=UTF-8">
    <TITLE>聚合搜索收藏</TITLE>
    <H1>聚合搜索收藏</H1>
    <DL><p>
      <DT><H3 ADD_DATE="${timestamp}">聚合搜索导入</H3>
      <DL><p>`;
    
    // 按类别分组
    const sitesByCategory = {};
    sites.forEach(site => {
      const category = site.category || '未分类';
      if (!sitesByCategory[category]) {
        sitesByCategory[category] = [];
      }
      sitesByCategory[category].push(site);
    });
    
    // 生成带分类的HTML
    Object.keys(sitesByCategory).forEach(category => {
      const categorySites = sitesByCategory[category];
      // 创建文件夹
      html += `<DT><H3 ADD_DATE="${timestamp}">${category}</H3>\n`;
      html += `<DL><p>\n`;
      
      // 添加该分类下的所有网站
      categorySites.forEach(site => {
        html += `<DT><A HREF="${site.url}" ADD_DATE="${timestamp}">${site.name}</A>\n`;
      });
      
      html += `</DL><p>\n`;
    });
    
    html += `</DL><p>
    </DL><p>`;
    
    // 创建下载链接
    const blob = new Blob([html], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'aggregator-bookmarks.html';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    alert(`成功导出 ${sites.length} 个书签，分为 ${Object.keys(sitesByCategory).length} 个类别`);
  }
  
  // 导入书签HTML文件，支持分类
  static importBookmarks() {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.html, .htm';
    input.onchange = (e) => {
      const file = e.target.files[0];
      if (!file) return;
      
      const reader = new FileReader();
      reader.onload = (event) => {
        const content = event.target.result;
        this.parseBookmarkHTML(content);
      };
      reader.readAsText(file);
    };
    input.click();
  }
  
  // 解析书签HTML内容，支持分类
  static parseBookmarkHTML(html) {
    try {
      const parser = new DOMParser();
      const doc = parser.parseFromString(html, 'text/html');
      const allNodes = Array.from(doc.querySelectorAll('dt, h3, a'));
      
      if (allNodes.length === 0) {
        alert('未找到有效书签链接');
        return;
      }
      
      const newSites = [];
      let currentCategory = '未分类';
      
      allNodes.forEach(node => {
        if (node.tagName === 'H3') {
          // 这是一个文件夹标题
          currentCategory = node.textContent.trim() || '未分类';
        } else if (node.tagName === 'A' && node.hasAttribute('href')) {
          // 这是一个书签链接
          const name = node.textContent.trim() || '未命名网站';
          let url = node.getAttribute('href').trim();
          
          // 补全URL协议（如果缺失）
          if (!url.startsWith('http://') && !url.startsWith('https://')) {
            url = 'https://' + url;
          }
          
          if (url) {
            newSites.push({ 
              name, 
              url, 
              category: currentCategory 
            });
          }
        }
      });
      
      if (newSites.length === 0) {
        alert('未找到有效的书签');
        return;
      }
      
      // 合并现有网站（避免重复）
      let existingSites = JSON.parse(localStorage.getItem('custom_sites') || '[]');
      const uniqueSites = existingSites.filter(s => 
        !newSites.some(n => n.url === s.url)
      );
      
      // 添加新网站
      uniqueSites.push(...newSites);
      localStorage.setItem('custom_sites', JSON.stringify(uniqueSites));
      
      // 刷新界面
      const siteManager = new SiteManager();
      siteManager.filterSites();
      siteManager.updateCategoryList();
      
      alert(`成功导入 ${newSites.length} 个书签，分为 ${new Set(newSites.map(s => s.category)).size} 个类别`);
      
    } catch (error) {
      console.error('书签解析失败', error);
      alert('书签格式解析失败，请确保上传的是Chrome/Edge导出的书签文件');
    }
  }
}
/**
 * 切换视图模式（网格/列表）
 */
class ViewManager {
  constructor() {
    this.viewMode = localStorage.getItem('view_mode') || 'grid';
    this.toggleBtn = document.getElementById('sites-by-Waterfall');
  }
  
  init() {
    if (!this.toggleBtn) return;
    
    // 应用保存的视图模式
    this.applyViewMode(this.viewMode);
    
    // 绑定切换按钮事件
    this.toggleBtn.addEventListener('click', () => {
      this.viewMode = 
      this.viewMode === 'grid' ? 'list' : 
      this.viewMode === 'list' ? 'waterfall' : 'grid';
      this.applyViewMode(this.viewMode);
      localStorage.setItem('view_mode', this.viewMode);
    });
  }
  
  applyViewMode(mode) {
    const sitesContainer = document.getElementById('sites-by-category');
    if (!sitesContainer) return;
    
    // 移除所有视图模式类
    sitesContainer.classList.remove('sites-by-grid', 'sites-by-list', 'sites-by-waterfall');
    
    // 添加当前视图模式类
    sitesContainer.classList.add(`sites-by-${mode}`);
    
    // 更新按钮图标
    this.updateToggleButton(mode);
  }
  
  updateToggleButton(mode) {
    if (this.toggleBtn) {
      this.toggleBtn.innerHTML = 
      mode === 'grid' ? '<i class="fa-solid fa-th-large"></i>' : 
      mode === 'list' ? '<i class="fa-solid fa-list"></i>' : 
                     '<i class="fa-solid fa-grip"></i>';
    }
  }
}
// 页面初始化
window.onload = () => {
  // 检查必要的DOM元素是否存在
  if (!document.getElementById('search-container')) {
    console.error('Missing search container element');
    return;
  }
  // 初始化各模块
  const themeManager = new ThemeManager();
  themeManager.init();
  
  const engineManager = new EngineManager();
  engineManager.init();
  
  const searchManager = new SearchManager();
  searchManager.init();
  
  const siteManager = new SiteManager();
  siteManager.init();
  
  const bookmarksManager = new BookmarksManager();
  bookmarksManager.init();
  
  const configPanelManager = new ConfigPanelManager();
  configPanelManager.init();
  
  const backgroundManager = new BackgroundManager();
  backgroundManager.init();

  // 初始化视图管理器
  const viewManager = new ViewManager();
  viewManager.init();
  
  // 绑定书签导入导出按钮事件
  const exportBtn = document.getElementById('export-bookmarks');
  const importBtn = document.getElementById('import-bookmarks');
  
  if (exportBtn) {
    exportBtn.addEventListener('click', () => BookmarkManager.exportBookmarks());
  }
  
  if (importBtn) {
    importBtn.addEventListener('click', () => BookmarkManager.importBookmarks());
  }
  
  // 监听键盘快捷键
  document.addEventListener('keydown', (e) => {
    // Ctrl + K 聚焦搜索框
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
      e.preventDefault();
      const searchInput = document.getElementById('search');
      if (searchInput) {
        searchInput.focus();
      }
    }
    
    // Ctrl + B 切换书签栏显示/隐藏
    if ((e.ctrlKey || e.metaKey) && e.key === 'b') {
      e.preventDefault();
      const toggleBtn = document.getElementById('toggle-sidebar');
      if (toggleBtn) {
        toggleBtn.click();
      }
    }
    
    // Ctrl + Shift + I 打开配置面板
    if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === 'i') {
      e.preventDefault();
      const configToggle = document.getElementById('config-toggle');
      if (configToggle) {
        configToggle.click();
      }
    }
    
    // Ctrl + Shift + B 打开背景设置面板
    if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === 'b') {
      e.preventDefault();
      const bgSettingsBtn = document.getElementById('bg-settings-btn');
      if (bgSettingsBtn) {
        bgSettingsBtn.click();
      }
    }
  });
  
  // 初始化热词（实际项目中应从API获取）
  const initHotKeys = () => {
    const hotKeys = [
      '人工智能', 'Python教程', '前端开发', '机器学习', '大数据', 
      'Java编程', 'Linux命令', '网络安全', '区块链', 'Web开发'
    ];
    
    const hotKeysContainer = document.querySelector('.hot-keys');
    if (!hotKeysContainer) return;
    
    hotKeys.forEach(key => {
      const span = document.createElement('span');
      span.className = 'px-3 py-1.5 bg-gray-100 dark:bg-gray-800 rounded-full text-sm cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors';
      span.textContent = key;
      span.onclick = () => {
        const searchInput = document.getElementById('search');
        if (searchInput) {
          searchInput.value = key;
          searchManager.doSearch();
        }
      };
      hotKeysContainer.appendChild(span);
    });
  };
  
  initHotKeys();
  
  // 监听窗口大小变化，调整布局
  window.addEventListener('resize', () => {
    const sitesContainer = document.getElementById('sites-by-category');
    if (sitesContainer) {
      const sections = sitesContainer.querySelectorAll('section');
      sections.forEach(section => {
        const ul = section.querySelector('ul');
        if (ul && ul.classList.contains('collapsed')) {
          // 重新应用折叠状态样式
          section.classList.add('sec-collapsed');
        }
      });
    }
  });
  
  // 初始化加载动画
  const loadingIndicator = document.getElementById('loading-indicator');
  if (loadingIndicator) {
    setTimeout(() => {
      loadingIndicator.style.opacity = '0';
      setTimeout(() => {
        loadingIndicator.style.display = 'none';
      }, 300);
    }, 500);
  }
};  

// 获取到达顶部和到达底部按钮 
const goToTopButton = document.getElementById('go-to-top'); 
const goToBottomButton = document.getElementById('go-to-bottom');

// 平滑滚动函数（兼容处理）
function smoothScrollTo(targetY) {
    if ('scrollBehavior' in document.documentElement.style) {
        // 原生支持平滑滚动
        window.scrollTo({
            top: targetY,
            behavior: 'smooth'
        });
    } else {
        // 兼容性实现
        const startY = window.scrollY;
        const distance = targetY - startY;
        const duration = 800; // 滚动持续时间（毫秒）
        const startTime = performance.now();
        
        function scrollStep(timestamp) {
            const elapsedTime = timestamp - startTime;
            const progress = Math.min(elapsedTime / duration, 1);
            const easeProgress = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
            window.scrollTo(0, startY + distance * easeProgress);
            
            if (progress < 1) {
                requestAnimationFrame(scrollStep);
            }
        }
        
        requestAnimationFrame(scrollStep);
    }
}

// 为到达顶部按钮绑定点击事件
goToTopButton.addEventListener('click', () => {
    smoothScrollTo(0);
});

// 为到达底部按钮绑定点击事件
goToBottomButton.addEventListener('click', () => {
    const bottomY = document.documentElement.scrollHeight - window.innerHeight;
    smoothScrollTo(bottomY);
});

// 监听滚动事件，控制按钮显示/隐藏
window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;
    
    // 显示/隐藏到达顶部按钮
    if (scrollY > 300) {
        goToTopButton.classList.add('visible');
        goToTopButton.classList.remove('hidden');
    } else {
        goToTopButton.classList.remove('visible');
        goToTopButton.classList.add('hidden');
    }
    
    // 显示/隐藏到达底部按钮
    if (scrollY + windowHeight < documentHeight - 100) {
        goToBottomButton.classList.add('visible');
        goToBottomButton.classList.remove('hidden');
    } else {
        goToBottomButton.classList.remove('visible');
        goToBottomButton.classList.add('hidden');
    }
});

    // 获取搜索引擎选项卡容器
    const engineTabs = document.getElementById('engine-tabs');
    
    // 鼠标滚轮事件 - 水平滚动
    engineTabs.addEventListener('wheel', (e) => {
      e.preventDefault();
      // 根据滚轮方向决定滚动方向
      engineTabs.scrollBy({
        left: e.deltaY > 0 ? 100 : -100,
        behavior: 'smooth'
      });
    });
    
    // 鼠标左键拖拽滑动
    let isDragging = false;
    let startX;
    let scrollLeft;
    
    // 鼠标按下
    engineTabs.addEventListener('mousedown', (e) => {
      isDragging = true;
      engineTabs.classList.add('cursor-grabbing');
      startX = e.pageX - engineTabs.offsetLeft;
      scrollLeft = engineTabs.scrollLeft;
    });
    
    // 鼠标离开容器
    engineTabs.addEventListener('mouseleave', () => {
      isDragging = false;
      engineTabs.classList.remove('cursor-grabbing');
    });
    
    // 鼠标松开
    engineTabs.addEventListener('mouseup', () => {
      isDragging = false;
      engineTabs.classList.remove('cursor-grabbing');
    });
    
    // 鼠标移动
    engineTabs.addEventListener('mousemove', (e) => {
      if (!isDragging) return;
      e.preventDefault();
      const x = e.pageX - engineTabs.offsetLeft;
      const walk = (x - startX) * 1.5; // 滚动速度
      engineTabs.scrollLeft = scrollLeft - walk;
    });
    
    // 为选项卡添加点击事件
    const tabs = engineTabs.querySelectorAll('button');
    tabs.forEach(tab => {
      tab.addEventListener('click', () => {
        // 移除所有选项卡的活动状态
        tabs.forEach(t => t.classList.remove('text-white'));
        // 添加当前选项卡的活动状态
        tab.classList.add('text-white');
      });
    });
    
    // 响应式处理 - 根据屏幕宽度调整滚动行为
    function handleResponsiveScroll() {
      // 如果容器宽度大于内容宽度，不需要滚动，隐藏提示
      const containerWidth = engineTabs.clientWidth;
      const contentWidth = engineTabs.scrollWidth;
      
      const scrollHint = engineTabs.parentElement.querySelector('.absolute.bottom-0');
      if (contentWidth <= containerWidth) {
        if (scrollHint) scrollHint.style.display = 'none';
      } else {
        if (scrollHint) scrollHint.style.display = 'block';
      }
    }
    
    // 初始化和窗口大小变化时处理响应式
    window.addEventListener('load', handleResponsiveScroll);
    window.addEventListener('resize', handleResponsiveScroll);
