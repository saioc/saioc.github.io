
const defaultEngines = [
  { name: 'Google', url: 'https://www.google.com/search?q=%s' },
  { name: 'Bing', url: 'https://www.bing.com/search?q=%s' },
  { name: 'DuckDuckGo', url: 'https://duckduckgo.com/?q=%s' },
  { name: 'Yahoo', url: 'https://search.yahoo.com/search?p=%s' },
  { name: 'Yandex', url: 'https://yandex.com/search/?text=%s' },
  { name: 'StartPage', url: 'https://www.startpage.com/sp/search?q=%s' },
  { name: 'Ecosia', url: 'https://www.ecosia.org/search?q=%s' },
  { name: 'Wikipedia (English)', url: 'https://en.wikipedia.org/wiki/%s' },
  { name: 'Quora', url: 'https://www.quora.com/search?q=%s' },
  { name: 'Reddit', url: 'https://www.reddit.com/search/?q=%s' },
  { name: 'GitHub', url: 'https://github.com/search?q=%s' },
  { name: 'Stack Overflow', url: 'https://stackoverflow.com/search?q=%s' },
  { name: 'SegmentFault', url: 'https://segmentfault.com/search?q=%s' },  
  { name: 'Google Images', url: 'https://www.google.com/search?tbm=isch&q=%s' },
  { name: 'Bing Images', url: 'https://www.bing.com/images/search?q=%s' },
  { name: 'YouTube', url: 'https://www.youtube.com/results?search_query=%s' },
  { name: 'Google Translate', url: 'https://translate.google.com/?sl=auto&tl=zh-CN&text=%s' },
  { name: 'Amazon', url: 'https://www.amazon.com/s?k=%s' },
  { name: 'eBay', url: 'https://www.ebay.com/sch/i.html?_nkw=%s' },
  { name: 'Google News', url: 'https://news.google.com/search?q=%s' },
  { name: 'Google Scholar', url: 'https://scholar.google.com/scholar?q=%s' },

  // Privacy-focused and alternative search engines
  { name: 'Swisscows', url: 'https://swisscows.com/web?query=%s' },                // Privacy-focused search engine
  { name: 'Qwant', url: 'https://www.qwant.com/?q=%s' },                          // French privacy search engine
  { name: 'Mojeek', url: 'https://www.mojeek.com/search?q=%s' },                 // UK independent index search
  { name: 'Brave Search', url: 'https://search.brave.com/search?q=%s' },         // Privacy search by Brave browser
  { name: 'Perplexity AI', url: 'https://www.perplexity.ai/search?q=%s' },       // AI-powered Q&A search
  { name: 'Wolfram Alpha', url: 'https://www.wolframalpha.com/input?i=%s' },     // Computational knowledge engine
  { name: 'Internet Archive', url: 'https://web.archive.org/web/*/%s' },         // Internet archive search

  // Code and academic related
  { name: 'Gitee (Chinese GitHub)', url: 'https://search.gitee.com/?q=%s' },     // Chinese GitHub alternative
  { name: 'Archive.org Texts', url: 'https://archive.org/search.php?query=%s' }, // Public document search
  { name: 'ScienceDirect', url: 'https://www.sciencedirect.com/search?qs=%s' },  // Academic database
  { name: 'arXiv', url: 'https://arxiv.org/search/?query=%s&searchtype=all' },   // Preprint papers

  // Image and design
  { name: 'Pexels (Images)', url: 'https://www.pexels.com/search/%s/' },         // Free stock photos
  { name: 'Unsplash (Images)', url: 'https://unsplash.com/s/photos/%s' },        // Free stock photos
  { name: 'Freepik', url: 'https://www.freepik.com/search?format=search&query=%s' }, // Design resources
  { name: 'Dribbble', url: 'https://dribbble.com/search/%s' },                   // Designer portfolio
  { name: 'Behance', url: 'https://www.behance.net/search?search=%s' },          // Design platform
  { name: 'Pinterest', url: 'https://www.pinterest.com/search/pins/?q=%s' },     // Inspiration search

  // Video and entertainment
  { name: 'IMDb', url: 'https://www.imdb.com/find?q=%s' },                      // Movie database
  { name: 'Flickr', url: 'https://www.flickr.com/search/?text=%s' }             // Photo sharing platform
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


function extractMainDomain(url) {
  try {
    const parsedUrl = new URL(url);
    let domain = parsedUrl.hostname;
    
    if (/^\d+\.\d+\.\d+\.\d+$/.test(domain)) {
      return domain;
    }
    
    const parts = domain.split('.');
    if (parts.length > 2) {
      return parts.slice(-2).join('.');
    }
    
    return domain;
  } catch (e) {
    console.error('Invalid URL:', url);
    return '';
  }
}

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
      this.showNotification('Please enter a name and URL', 'error');
      return;
    }
    
    const exists = [...this.engines, ...this.customEngines].some(
      e => e.name === name || e.url === url
    );
    
    if (exists) {
      this.showNotification('This search engine already exists', 'error');
      return;
    }
    
    this.customEngines.push({ name, url });
    localStorage.setItem('custom_engines', JSON.stringify(this.customEngines));
    this.renderEngines();
    
    nameInput.value = '';
    urlInput.value = '';
    
    this.showNotification(`Search Engine Added: ${name}`, 'success');
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
    
    setTimeout(() => {
      notification.classList.remove('translate-x-full');
    }, 10);
    
    setTimeout(() => {
      notification.classList.add('translate-x-full');
      setTimeout(() => {
        document.body.removeChild(notification);
      }, 300);
    }, 3000);
  }
}

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
    this.searchInput.addEventListener('keypress', e => {
      if (e.key === 'Enter') this.doSearch();
    });
    
    const searchButton = document.getElementById('search-button');
    if (searchButton) {
      searchButton.addEventListener('click', () => this.doSearch());
    }
    
    const voiceButton = document.getElementById('voice-button');
    if (voiceButton) {
      voiceButton.addEventListener('click', () => this.startVoice());
    }
  }
  
  doSearch() {
    if (!this.searchInput) return;
    
    const query = this.searchInput.value.trim();
    if (!query) {
      this.showNotification('Please enter your search keywords', 'error');
      return;
    }
    
    const engineUrl = localStorage.getItem('engine') || defaultEngines[0]?.url;
    if (!engineUrl) {
      this.showNotification('No search engine configured', 'error');
      return;
    }
    
    window.open(engineUrl.replace('%s', encodeURIComponent(query)), '_blank');
    this.saveHistory(query);
  }
  
  saveHistory(query) {
    if (!query || !this.historyBox) return;
    
    let history = JSON.parse(localStorage.getItem('search_history') || '[]');
    
    const index = history.indexOf(query);
    if (index !== -1) {
      history.splice(index, 1);
    }
    
    history.unshift(query);
    
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
      emptyMsg.textContent = 'No search history';
      this.historyBox.appendChild(emptyMsg);
      return;
    }
    
    const title = document.createElement('div');
    title.className = 'text-gray-500 text-sm mb-1';
    title.textContent = 'Search History：';
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
      this.showNotification('The browser does not support speech recognition', 'error');
      return;
    }
    
    const recognition = new webkitSpeechRecognition();
    recognition.lang = 'us-EN';
    recognition.continuous = false;
    
    recognition.onresult = e => {
      if (this.searchInput) {
        this.searchInput.value = e.results[0][0].transcript;
        this.doSearch();
      }
    };
    
    recognition.onerror = e => {
      console.error('Speech recognition errors', e);
      this.showNotification('Voice recognition failed, please try again', 'error');
    };
    
    recognition.start();
    
    this.showNotification('Listening...', 'info');
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
    
    setTimeout(() => {
      notification.classList.remove('translate-x-full');
    }, 10);
    
    setTimeout(() => {
      notification.classList.add('translate-x-full');
      setTimeout(() => {
        document.body.removeChild(notification);
      }, 300);
    }, 3000);
  }
}

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
    const addSiteBtn = document.getElementById('add-site');
    if (addSiteBtn) {
      addSiteBtn.addEventListener('click', () => this.openAddModal());
    }
    
    const toggleEditBtn = document.getElementById('toggle-edit-btn');
    if (toggleEditBtn) {
      toggleEditBtn.addEventListener('click', () => this.toggleEditButtons());
    }
    
    const toggleDeleteBtn = document.getElementById('toggle-delete-btn');
    if (toggleDeleteBtn) {
      toggleDeleteBtn.addEventListener('click', () => this.toggleDeleteButtons());
    }
    
    const filterCategory = document.getElementById('filter-category');
    if (filterCategory) {
      filterCategory.addEventListener('change', () => this.filterByCategory());
    }
    
    const submitSiteBtn = document.getElementById('submit-site');
    if (submitSiteBtn) {
      submitSiteBtn.addEventListener('click', () => this.submitSite());
    }
    
    const modalOverlay = document.getElementById('modal-overlay');
    const closeModalBtn = document.getElementById('close-modal');
    
    if (modalOverlay) {
      modalOverlay.addEventListener('click', this.closeModal.bind(this));
    }
    
    if (closeModalBtn) {
      closeModalBtn.addEventListener('click', this.closeModal.bind(this));
    }
    
    this.searchInput.addEventListener('input', () => {
      this.searchQuery = this.searchInput.value.trim().toLowerCase();
      this.filterSites();
    });
    
    const sidebarToggle = document.getElementById('sidebar-toggle');
    if (sidebarToggle) {
      sidebarToggle.addEventListener('click', () => {
        document.getElementById('sidebar')?.classList.toggle('hidden');
        document.getElementById('search-container')?.classList.toggle('ml-64');
        document.getElementById('custom-sites-panel')?.classList.toggle('ml-64');
      });
    }
    
    this.sitesContainer.addEventListener('click', (e) => {
      const h4 = e.target.closest('h4.sec-h4-a');
      if (h4) {
        const section = h4.parentElement;
        const ul = section.querySelector('ul');
        if (ul) {
          ul.classList.toggle('collapsed');
          section.classList.toggle('sec-collapsed');
          
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
      modalTitle.textContent = 'Edit Website';
      nameInput.value = site.name;
      urlInput.value = site.url;
      categoryInput.value = site.category || '';
    } else {
      modalTitle.textContent = 'Add a website';
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
      this.showNotification('Please enter the website name and URL', 'error');
      return;
    }
    
    let formattedUrl = url;
    if (!url.startsWith('http://') && !url.startsWith('https://')) {
      formattedUrl = 'https://' + url;
    }
    
    let sites = JSON.parse(localStorage.getItem('custom_sites') || '[]');
    const existingSiteIndex = sites.findIndex(site => site.url === formattedUrl);
    
    if (existingSiteIndex > -1) {
      sites[existingSiteIndex] = { name, url: formattedUrl, category };
      this.showNotification(`Updated website: ${name}`, 'success');
    } else {
      sites.push({ name, url: formattedUrl, category });
      this.showNotification(`Added website: ${name}`, 'success');
    }
    
    localStorage.setItem('custom_sites', JSON.stringify(sites));
    this.closeModal();
    this.filterSites();
    this.updateCategoryList();
  }
  
  deleteSite(urlToDelete) {
    if (!confirm('Are you sure you want to delete this site?')) return;
    
    let sites = JSON.parse(localStorage.getItem('custom_sites') || '[]');
    const siteToDelete = sites.find(site => site.url === urlToDelete);
    
    if (siteToDelete) {
      sites = sites.filter(site => site.url !== urlToDelete);
      localStorage.setItem('custom_sites', JSON.stringify(sites));
      this.filterSites();
      this.updateCategoryList();
      this.showNotification(`Deleted Site: ${siteToDelete.name}`, 'info');
    }
  }
  
  filterSites() {
    if (!this.sitesContainer) return;
    
    const filter = document.getElementById('filter-category')?.value || '';
    this.currentCategory = filter;
    const sites = JSON.parse(localStorage.getItem('custom_sites') || '[]');
    this.sitesContainer.innerHTML = '';
    
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
    
    const categorizedSites = sites.filter(s => {
      const hasCategory = s.category && s.category.trim() !== '';
      const categoryMatch = !filter || s.category === filter;
      const searchMatch = this.searchQuery === '' || 
                          (s.name && s.name.toLowerCase().includes(this.searchQuery)) || 
                          (s.url && s.url.toLowerCase().includes(this.searchQuery)) ||
                          (s.category && s.category.toLowerCase().includes(this.searchQuery));
      return hasCategory && categoryMatch && searchMatch;
    });
    
    const sitesByCategory = {};
    categorizedSites.forEach(site => {
      const category = site.category;
      if (!sitesByCategory[category]) {
        sitesByCategory[category] = [];
      }
      sitesByCategory[category].push(site);
    });
    
    Object.keys(sitesByCategory).forEach(category => {
      const section = this.createSection(category);
      sitesByCategory[category].forEach(site => this.addSiteToSection(section, site));
    });
    
    this.restoreSectionState();
  }
  
  filterByCategory() {
    this.currentCategory = document.getElementById('filter-category')?.value || '';
    this.filterSites();
    
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
    
    if (this.searchQuery && (
        (site.name && site.name.toLowerCase().includes(this.searchQuery)) || 
        (site.url && site.url.toLowerCase().includes(this.searchQuery)) ||
        (site.category && site.category.toLowerCase().includes(this.searchQuery))
      )) {
      li.classList.add('bg-yellow-50', 'dark:bg-yellow-900/30');
    }
    
    const a = document.createElement('a');
    a.href = site.url;
    a.target = '_blank';
    a.className = 'flex items-center w-full';
    a.title = site.name;
    
    const iconContainer = document.createElement('div');
    iconContainer.className = 'w-8 h-8 flex items-center justify-center rounded-md mr-3 bg-gray-100 dark:bg-gray-700';
    
    const img = document.createElement('img');
    img.src = `https://t3.gstatic.cn/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&size=128&url=${site.url}`;
    img.className = 'lazy favicon-icon w-5 h-5 object-cover';
    img.alt = site.name;
    img.title = site.name;
    img.onerror = function() {
      this.src = 'https://picsum.photos/200/200?random=' + site.name;
    };
    
    let name = site.name;
    if (this.searchQuery && name) {
      name = name.replace(new RegExp(this.searchQuery, 'gi'), match => {
        return `<span class="bg-yellow-200 dark:bg-yellow-700 rounded px-1">${match}</span>`;
      });
    }
    
    const nameSpan = document.createElement('span');
    nameSpan.innerHTML = name;
    
    const editBtn = document.createElement('button');
    editBtn.className = 'edit-btn management-button text-gray-500 hover:text-primary mr-2 hidden';
    editBtn.innerHTML = '<i class="fa-solid fa-pencil"></i>';
    editBtn.onclick = (e) => {
      e.stopPropagation();
      this.openAddModal(true, site);
    };
    
    const delBtn = document.createElement('button');
    delBtn.className = 'delete-btn management-button text-gray-500 hover:text-red-500 hidden';
    delBtn.innerHTML = '<i class="fa-solid fa-trash"></i>';
    delBtn.onclick = (e) => {
      e.stopPropagation();
      this.deleteSite(site.url);
    };
    
    const btnContainer = document.createElement('div');
    btnContainer.className = 'ml-auto flex items-center';
    btnContainer.appendChild(editBtn);
    btnContainer.appendChild(delBtn);
    
    iconContainer.appendChild(img);
    a.appendChild(iconContainer);
    a.appendChild(nameSpan);
    li.appendChild(a);
    li.appendChild(btnContainer);
    
    section.querySelector('ul')?.appendChild(li);
  }
  
  createSection(category) {
    if (!this.sitesContainer) return null;
    
    const section = document.createElement('section');
    section.id = this.sanitizeId(category);
    section.className = 'mb-6';
    
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
    const categories = new Set(['']); 
    
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
      item.textContent = category || 'All Bookmarks';
      
      item.addEventListener('click', () => {
        const filterCategory = document.getElementById('filter-category');
        if (filterCategory) {
          filterCategory.value = category;
        }
        
        this.filterByCategory();
        
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
    
    setTimeout(() => {
      notification.classList.remove('translate-x-full');
    }, 10);
    
    setTimeout(() => {
      notification.classList.add('translate-x-full');
      setTimeout(() => {
        document.body.removeChild(notification);
      }, 300);
    }, 3000);
  }
}

class ThemeManager {
  constructor() {
    this.toggleBtn = document.getElementById('toggle-theme');
  }
  
  init() {
    if (!this.toggleBtn) return;
    
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      this.applyTheme(true);
    } else if (savedTheme === 'light') {
      this.applyTheme(false);
    } else {
      this.applyTheme(false);
    }
    
    this.toggleBtn.addEventListener('click', () => {
      this.applyTheme(!document.body.classList.contains('dark'));
    });
  }
  
  applyTheme(dark) {
    document.body.classList.toggle('dark', dark);
    document.body.classList.toggle('light', !dark);
    
    localStorage.setItem('theme', dark ? 'dark' : 'light');
    
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

class BookmarksManager {
  constructor() {
    this.toggleBtn = document.getElementById('toggle-sidebar');
  }
  
  init() {
    if (!this.toggleBtn) return;
    
    const savedState = localStorage.getItem('bookmarks');
    if (savedState === 'hide') {
      this.applyState(true);
    } else if (savedState === 'display') {
      this.applyState(false);
    } else {
      this.applyState(false);
    }
    
    this.toggleBtn.addEventListener('click', () => {
      this.applyState(!document.body.classList.contains('sidebar-hidden'));
    });
  }
  
  applyState(hide) {
    document.body.classList.toggle('sidebar-hidden', hide);
    document.body.classList.toggle('sidebar-visible', !hide);
    
    localStorage.setItem('bookmarks', hide ? 'hide' : 'display');
    
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

class ConfigPanelManager {
  constructor() {
    this.panel = document.getElementById('config-panel');
    this.toggleBtn = document.getElementById('config-toggle');
  }
  
  init() {
    if (!this.toggleBtn) return;
    
    this.toggleBtn.addEventListener('click', () => this.toggleConfigPanel());
    
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

class BackgroundManager {
  constructor() {
    this.panel = document.getElementById('bg-settings-panel');
    this.settingsBtn = document.getElementById('bg-settings-btn');
  }
  
  init() {
    if (!this.settingsBtn) return;
    
    this.settingsBtn.addEventListener('click', () => {
      if (this.panel) {
        this.panel.style.display = this.panel.style.display === 'block' ? 'none' : 'block';
      }
    });
    
    this.loadSavedSettings();
    
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
    
    const saveBtn = document.getElementById('save-bg-settings');
    if (saveBtn) {
      saveBtn.addEventListener('click', () => {
        this.saveCustomSettings();
      });
    }
    
    const resetBtn = document.getElementById('reset-bg-settings');
    if (resetBtn) {
      resetBtn.addEventListener('click', () => {
        if (confirm('Are you sure you want to reset background settings?')) {
          this.resetSettings();
        }
      });
    }
    
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
        
        localStorage.setItem('background_settings', JSON.stringify({
          type: 'bing'
        }));
        
        this.showNotification('Set as Bing daily wallpaper', 'success');
      })
      .catch(err => {
        console.error('Failed to load Bing background', err);
        this.showNotification('Failed to obtain Bing wallpaper, using default background', 'error');
        this.setSolidBackground('#f8f9fa');
      });
  }
  
  setSolidBackground(color) {
    document.body.style.backgroundColor = color;
    document.body.style.backgroundImage = '';
    document.body.style.opacity = '1';
    
    localStorage.setItem('background_settings', JSON.stringify({
      type: 'solid',
      color
    }));
    
    this.showNotification(`Solid color background set: ${color}`, 'success');
  }
  
  setGradientBackground(colors) {
    document.body.style.backgroundImage = `linear-gradient(45deg, ${colors.join(',')})`;
    document.body.style.backgroundColor = '';
    document.body.style.opacity = '1';
    
    localStorage.setItem('background_settings', JSON.stringify({
      type: 'gradient',
      colors
    }));
    
    this.showNotification('Gradient background set', 'success');
  }
  
  previewCustomBackground() {
    const bgColor = document.getElementById('bg-color')?.value || '#ffffff';
    const bgImageUrl = document.getElementById('bg-image-url')?.value || '';
    const bgOpacity = (document.getElementById('bg-opacity')?.value || 100) / 100;
    const bgPosition = document.getElementById('bg-position')?.value || 'center';
    const bgRepeat = document.getElementById('bg-repeat')?.value || 'no-repeat';
    
    document.body.style.backgroundColor = bgColor;
    
    if (bgImageUrl) {
      document.body.style.backgroundImage = `url(${bgImageUrl})`;
      document.body.style.backgroundPosition = bgPosition === 'cover' ? 'center' : bgPosition;
      document.body.style.backgroundRepeat = bgRepeat;
      document.body.style.backgroundSize = bgPosition === 'cover' ? 'cover' : 'auto';
    } else {
      document.body.style.backgroundImage = '';
    }
    
    document.body.style.opacity = bgOpacity;
  }
  
  saveCustomSettings() {
    const bgColor = document.getElementById('bg-color')?.value || '#ffffff';
    const bgImageUrl = document.getElementById('bg-image-url')?.value || '';
    const bgOpacity = document.getElementById('bg-opacity')?.value || 100;
    const bgPosition = document.getElementById('bg-position')?.value || 'center';
    const bgRepeat = document.getElementById('bg-repeat')?.value || 'no-repeat';
    
    localStorage.setItem('background_settings', JSON.stringify({
      type: 'custom',
      color: bgColor,
      imageUrl: bgImageUrl,
      opacity: bgOpacity,
      position: bgPosition,
      repeat: bgRepeat
    }));
    
    this.showNotification('Background settings saved！', 'success');
  }
  
  resetSettings() {
    localStorage.removeItem('background_settings');
    
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
    
    this.setBingBackground();
    
    this.showNotification('Background settings reset！', 'info');
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
    
    setTimeout(() => {
      notification.classList.remove('translate-x-full');
    }, 10);
    
    setTimeout(() => {
      notification.classList.add('translate-x-full');
      setTimeout(() => {
        document.body.removeChild(notification);
      }, 300);
    }, 3000);
  }
}

class BookmarkManager {
  static exportBookmarks() {
    const sites = JSON.parse(localStorage.getItem('custom_sites') || '[]');
    if (sites.length === 0) {
      alert('No bookmarks to export');
      return;
    }
    
    const timestamp = Math.floor(Date.now() / 1000);
    let html = `<!DOCTYPE NETSCAPE-Bookmark-file-1>
    <META HTTP-EQUIV="Content-Type" CONTENT="text/html; charset=UTF-8">
    <TITLE>Aggregate search collection</TITLE>
    <H1>Aggregate search collection</H1>
    <DL><p>
      <DT><H3 ADD_DATE="${timestamp}">Aggregate search import</H3>
      <DL><p>`;
    
    const sitesByCategory = {};
    sites.forEach(site => {
      const category = site.category || 'Uncategorized';
      if (!sitesByCategory[category]) {
        sitesByCategory[category] = [];
      }
      sitesByCategory[category].push(site);
    });
    
    Object.keys(sitesByCategory).forEach(category => {
      const categorySites = sitesByCategory[category];
      html += `<DT><H3 ADD_DATE="${timestamp}">${category}</H3>\n`;
      html += `<DL><p>\n`;
      
      categorySites.forEach(site => {
        html += `<DT><A HREF="${site.url}" ADD_DATE="${timestamp}">${site.name}</A>\n`;
      });
      
      html += `</DL><p>\n`;
    });
    
    html += `</DL><p>
    </DL><p>`;
    
    const blob = new Blob([html], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'aggregator-bookmarks.html';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    alert(`Exported ${sites.length} bookmarks into ${Object.keys(sitesByCategory).length} categories successfully.`);
  }
  
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
  
  static parseBookmarkHTML(html) {
    try {
      const parser = new DOMParser();
      const doc = parser.parseFromString(html, 'text/html');
      const allNodes = Array.from(doc.querySelectorAll('dt, h3, a'));
      
      if (allNodes.length === 0) {
        alert('No valid bookmark link found');
        return;
      }
      
      const newSites = [];
      let currentCategory = 'Uncategorized';
      
      allNodes.forEach(node => {
        if (node.tagName === 'H3') {
          currentCategory = node.textContent.trim() || 'Uncategorized';
        } else if (node.tagName === 'A' && node.hasAttribute('href')) {
          const name = node.textContent.trim() || 'Unnamed website';
          let url = node.getAttribute('href').trim();
          
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
        alert('No valid bookmarks found');
        return;
      }
      
      let existingSites = JSON.parse(localStorage.getItem('custom_sites') || '[]');
      const uniqueSites = existingSites.filter(s => 
        !newSites.some(n => n.url === s.url)
      );
      
      uniqueSites.push(...newSites);
      localStorage.setItem('custom_sites', JSON.stringify(uniqueSites));
      
      const siteManager = new SiteManager();
      siteManager.filterSites();
      siteManager.updateCategoryList();
      
      alert(`Imported ${newSites.length} bookmarks into ${new Set(newSites.map(s => s.category)).size} categories successfully.`);
      
    } catch (error) {
      console.error('Bookmark parsing failed', error);
      alert('Bookmark format parsing failed. Please make sure that the uploaded bookmark file is exported from Chrome/Edge.');
    }
  }
}

class ViewManager {
  constructor() {
    this.viewMode = localStorage.getItem('view_mode') || 'grid';
    this.toggleBtn = document.getElementById('sites-by-Waterfall');
  }
  
  init() {
    if (!this.toggleBtn) return;
    
    this.applyViewMode(this.viewMode);
    
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
    
    sitesContainer.classList.remove('sites-by-grid', 'sites-by-list', 'sites-by-waterfall');
    
    sitesContainer.classList.add(`sites-by-${mode}`);
    
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

window.onload = () => {
  if (!document.getElementById('search-container')) {
    console.error('Missing search container element');
    return;
  }
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

  const viewManager = new ViewManager();
  viewManager.init();
  
  const exportBtn = document.getElementById('export-bookmarks');
  const importBtn = document.getElementById('import-bookmarks');
  
  if (exportBtn) {
    exportBtn.addEventListener('click', () => BookmarkManager.exportBookmarks());
  }
  
  if (importBtn) {
    importBtn.addEventListener('click', () => BookmarkManager.importBookmarks());
  }
  
  document.addEventListener('keydown', (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
      e.preventDefault();
      const searchInput = document.getElementById('search');
      if (searchInput) {
        searchInput.focus();
      }
    }
    
    if ((e.ctrlKey || e.metaKey) && e.key === 'b') {
      e.preventDefault();
      const toggleBtn = document.getElementById('toggle-sidebar');
      if (toggleBtn) {
        toggleBtn.click();
      }
    }
    
    if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === 'i') {
      e.preventDefault();
      const configToggle = document.getElementById('config-toggle');
      if (configToggle) {
        configToggle.click();
      }
    }
    
    if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === 'b') {
      e.preventDefault();
      const bgSettingsBtn = document.getElementById('bg-settings-btn');
      if (bgSettingsBtn) {
        bgSettingsBtn.click();
      }
    }
  });
  
  const initHotKeys = () => {
    const hotKeys = [
      "Artificial Intelligence", "Python Tutorial", "Front-end Development", "Machine Learning", "Big Data", "Java Programming", "Linux Commands", "Cybersecurity", "Blockchain", "Web Development"
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
          const searchManager = new SearchManager();
          searchManager.doSearch();
        }
      };
      hotKeysContainer.appendChild(span);
    });
  };
  
  initHotKeys();
  
  window.addEventListener('resize', () => {
    const sitesContainer = document.getElementById('sites-by-category');
    if (sitesContainer) {
      const sections = sitesContainer.querySelectorAll('section');
      sections.forEach(section => {
        const ul = section.querySelector('ul');
        if (ul && ul.classList.contains('collapsed')) {
          section.classList.add('sec-collapsed');
        }
      });
    }
  });
  
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

const goToTopButton = document.getElementById('go-to-top'); 
const goToBottomButton = document.getElementById('go-to-bottom');


function smoothScrollTo(targetY) {
    if ('scrollBehavior' in document.documentElement.style) {
        window.scrollTo({
            top: targetY,
            behavior: 'smooth'
        });
    } else {
        const startY = window.scrollY;
        const distance = targetY - startY;
        const duration = 800; 
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

goToTopButton.addEventListener('click', () => {
    smoothScrollTo(0);
});

goToBottomButton.addEventListener('click', () => {
    const bottomY = document.documentElement.scrollHeight - window.innerHeight;
    smoothScrollTo(bottomY);
});

window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;
    
    if (scrollY > 300) {
        goToTopButton.classList.add('visible');
        goToTopButton.classList.remove('hidden');
    } else {
        goToTopButton.classList.remove('visible');
        goToTopButton.classList.add('hidden');
    }
    
    if (scrollY + windowHeight < documentHeight - 100) {
        goToBottomButton.classList.add('visible');
        goToBottomButton.classList.remove('hidden');
    } else {
        goToBottomButton.classList.remove('visible');
        goToBottomButton.classList.add('hidden');
    }
});

    const engineTabs = document.getElementById('engine-tabs');
    
    engineTabs.addEventListener('wheel', (e) => {
      e.preventDefault();
      engineTabs.scrollBy({
        left: e.deltaY > 0 ? 100 : -100,
        behavior: 'smooth'
      });
    });
    
    let isDragging = false;
    let startX;
    let scrollLeft;
    
    engineTabs.addEventListener('mousedown', (e) => {
      isDragging = true;
      engineTabs.classList.add('cursor-grabbing');
      startX = e.pageX - engineTabs.offsetLeft;
      scrollLeft = engineTabs.scrollLeft;
    });
    
    engineTabs.addEventListener('mouseleave', () => {
      isDragging = false;
      engineTabs.classList.remove('cursor-grabbing');
    });
    
    engineTabs.addEventListener('mouseup', () => {
      isDragging = false;
      engineTabs.classList.remove('cursor-grabbing');
    });
    
    engineTabs.addEventListener('mousemove', (e) => {
      if (!isDragging) return;
      e.preventDefault();
      const x = e.pageX - engineTabs.offsetLeft;
      const walk = (x - startX) * 1.5; 
      engineTabs.scrollLeft = scrollLeft - walk;
    });
    
    const tabs = engineTabs.querySelectorAll('button');
    tabs.forEach(tab => {
      tab.addEventListener('click', () => {
        tabs.forEach(t => t.classList.remove('text-white'));
        tab.classList.add('text-white');
      });
    });
    
    function handleResponsiveScroll() {
      const containerWidth = engineTabs.clientWidth;
      const contentWidth = engineTabs.scrollWidth;
      
      const scrollHint = engineTabs.parentElement.querySelector('.absolute.bottom-0');
      if (contentWidth <= containerWidth) {
        if (scrollHint) scrollHint.style.display = 'none';
      } else {
        if (scrollHint) scrollHint.style.display = 'block';
      }
    }
    
    window.addEventListener('load', handleResponsiveScroll);
    window.addEventListener('resize', handleResponsiveScroll);
