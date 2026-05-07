// js/components/Layout.js
import Auth from '../auth.js';

class Layout {
    constructor() {
        this.auth = new Auth();
    }

    async render() {
        const user = this.auth.getCurrentUser();
        
        document.getElementById('app').innerHTML = `
            <!-- Mobile Overlay -->
            <div id="mobileOverlay" class="mobile-overlay"></div>

            <!-- Sidebar -->
            <aside id="sidebar" class="w-64 sidebar-gradient flex flex-col shadow-xl text-white">
                <div class="px-6 py-6 flex flex-col space-y-6">
                    <div class="mb-4">
                        <h1 class="text-2xl font-bold text-white">Kampus Riset</h1>
                        <p class="text-sm text-blue-200 mt-1">by Hcelerate</p>
                        <div class="h-1 w-full bg-blue-400 mt-3 rounded-full"></div>
                    </div>
                    
                    <nav class="flex flex-col space-y-1" id="sidebar-nav">
                        ${this.renderNavigation()}
                    </nav>
                </div>
                
                <div class="mt-auto px-6 py-4 border-t border-blue-500/30 flex items-center justify-between">
                    <div class="flex items-center space-x-2">
                        <div class="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white font-semibold">
                            ${user?.full_name?.charAt(0) || user?.email?.charAt(0).toUpperCase() || 'U'}
                        </div>
                        <div>
                            <span class="text-white font-medium block text-sm">${user?.full_name || user?.email || 'User'}</span>
                            <span class="text-blue-200 text-xs">${user?.institution || ''}</span>
                        </div>
                    </div>
                    <button id="logoutBtn" class="text-red-300 hover:text-red-200 transition">
                        <ion-icon name="log-out-outline"></ion-icon>
                    </button>
                </div>
            </aside>

            <!-- Main Content -->
            <div class="main-content min-h-screen">
                <header class="bg-white shadow-sm px-4 md:px-6 py-4 flex justify-between items-center border-b border-gray-200">
                    <h1 class="text-lg md:text-xl font-bold text-gray-900">Onboarding Kampus Riset</h1>
                    <button id="toggleSidebar" class="px-3 py-2 text-blue-700 font-semibold border border-blue-700 rounded-lg hover:bg-blue-700 hover:text-white transition md:hidden">
                        ☰ Menu
                    </button>
                </header>

                <main id="content" class="p-4 md:p-6"></main>
            </div>
        `;

        this.setupEventListeners();
    }

    renderNavigation() {
        const navItems = [
            { tab: 'dashboard', icon: 'home-outline', label: 'Dashboard' },
            { tab: 'materi', icon: 'book-outline', label: 'Materi Asinkron' },
            // { tab: 'template', icon: 'document-text-outline', label: 'Template Penulisan' }, // HAPUS
            { tab: 'final', icon: 'checkmark-done-outline', label: 'List Jurnal & Final Assignment' },
            { tab: 'sinkronus', icon: 'videocam-outline', label: 'Sesi Sinkronus' },
            { tab: 'attendance', icon: 'calendar-outline', label: 'Presensi' }
        ];

        return navItems.map(item => `
            <button class="tab-btn flex items-center space-x-3 px-3 py-3 rounded-lg hover:bg-blue-600/30 ${item.tab === 'dashboard' ? 'active' : ''}" 
                    data-tab="${item.tab}">
                <ion-icon name="${item.icon}" class="text-lg"></ion-icon>
                <span>${item.label}</span>
            </button>
        `).join('');
    }

    setupEventListeners() {
        // Toggle sidebar for mobile
        const toggleBtn = document.getElementById('toggleSidebar');
        if (toggleBtn) {
            toggleBtn.addEventListener('click', () => {
                const sidebar = document.getElementById('sidebar');
                const overlay = document.getElementById('mobileOverlay');
                if (sidebar) sidebar.classList.toggle('hidden');
                if (overlay) overlay.classList.toggle('active');
            });
        }

        // Close sidebar when clicking on overlay
        const overlay = document.getElementById('mobileOverlay');
        if (overlay) {
            overlay.addEventListener('click', () => {
                const sidebar = document.getElementById('sidebar');
                if (sidebar) sidebar.classList.add('hidden');
                overlay.classList.remove('active');
            });
        }

        // Logout functionality
        const logoutBtn = document.getElementById('logoutBtn');
        if (logoutBtn) {
            logoutBtn.addEventListener('click', () => {
                this.auth.logout();
            });
        }

        // Handle window resize
        window.addEventListener('resize', () => {
            const sidebar = document.getElementById('sidebar');
            const overlay = document.getElementById('mobileOverlay');
            if (window.innerWidth >= 768) {
                if (sidebar) sidebar.classList.remove('hidden');
                if (overlay) overlay.classList.remove('active');
            }
        });
    }
}

export default Layout;
