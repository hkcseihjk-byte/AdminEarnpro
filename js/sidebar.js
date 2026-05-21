// ============================================================
// ADMIN SIDEBAR — shared across all admin pages
// ============================================================

function renderAdminSidebar(activePage) {
  const links = [
    { id:'dashboard', icon:'📊', label:'Dashboard',   href:'dashboard.html' },
    { id:'users',     icon:'👥', label:'Users',        href:'users.html'     },
    { id:'withdraw',  icon:'💸', label:'Withdrawals',  href:'withdraw.html', badge:true },
    { id:'tasks',     icon:'🎯', label:'Tasks',        href:'tasks.html'     },
    { id:'notices',   icon:'📢', label:'Notices',      href:'notices.html'   },
    { id:'settings',  icon:'⚙️', label:'Settings',     href:'settings.html'  },
  ];

  const sidebar = document.createElement('aside');
  sidebar.className = 'sidebar';
  sidebar.id = 'admin-sidebar';

  sidebar.innerHTML = `
    <div class="sidebar-brand">
      <div class="logo">🛡️</div>
      <div>
        <div class="brand-text">EarnZone</div>
        <div class="brand-sub">Admin Panel</div>
      </div>
    </div>
    <nav class="sidebar-nav">
      <div class="nav-section-label">Management</div>
      ${links.map(l=>`
        <a href="${l.href}" class="sidebar-link ${l.id===activePage?'active':''}">
          <span class="link-icon">${l.icon}</span>
          ${l.label}
          ${l.badge?`<span class="badge hidden" id="wd-badge">0</span>`:''}
        </a>
      `).join('')}
    </nav>
    <div class="sidebar-footer">
      <div class="admin-chip">
        <div class="ava" id="admin-ava">A</div>
        <div class="info">
          <div class="name" id="admin-name">Admin</div>
          <div class="role">Super Admin</div>
        </div>
        <button class="logout-btn" id="sidebar-logout" title="Logout">🚪</button>
      </div>
    </div>`;

  document.body.prepend(sidebar);

  // Load pending withdrawal count
  db.collection('withdrawals').where('status','==','pending').onSnapshot(snap=>{
    const badge=document.getElementById('wd-badge');
    if(badge){
      if(snap.size>0){ badge.textContent=snap.size; badge.classList.remove('hidden'); }
      else badge.classList.add('hidden');
    }
  });

  // Populate admin name
  auth.onAuthStateChanged(user=>{
    if(user){
      const ava=document.getElementById('admin-ava');
      const nm=document.getElementById('admin-name');
      if(ava) ava.textContent=(user.displayName||user.email||'A').substring(0,2).toUpperCase();
      if(nm)  nm.textContent=user.displayName||user.email||'Admin';
    }
  });

  document.getElementById('sidebar-logout').addEventListener('click', async ()=>{
    await auth.signOut();
    window.location.href='login.html';
  });

  // Mobile toggle
  const main=document.querySelector('.main');
  if(main){
    const toggle=document.querySelector('.menu-toggle');
    if(toggle){
      toggle.addEventListener('click',()=>sidebar.classList.toggle('open'));
    }
    main.addEventListener('click',()=>sidebar.classList.remove('open'));
  }
}
