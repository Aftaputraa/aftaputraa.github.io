import { sessionAttendanceService } from '../config/supabase.js';

class Sinkronus {
    static currentTab = 'onboarding_2';
    static currentVideoIndex = 0;
    static isInitialized = false;

    static async render() {
        // Data sessions - sekarang termasuk CGC#1
        const sessionsData = {
            onboarding_2: {
                title: "Onboarding Kampus Riset Angkatan 2",
                videos: [
                    { title: "Onboarding Kampus Riset Angkatan 2", youtube_url: "https://www.youtube.com/embed/gWiYMp4nOR8" }
                ]
            },
            coaching_clinic: {
                title: "Coaching Group Clinic",
                videos: [
                    { title: "CGC#1: Coaching Group Clinic 1", youtube_url: "https://www.youtube.com/embed/WEe7vJ08mZ8" }
                ]
            }
        };

        const currentSession = sessionsData[this.currentTab];
        const currentVideo = currentSession.videos[this.currentVideoIndex];

        return `
            <div class="max-w-6xl mx-auto">
                <div class="bg-white shadow-lg rounded-xl md:rounded-2xl overflow-hidden">
                    <div class="p-4 md:p-6 border-b border-gray-200">
                        <h1 class="text-lg md:text-xl lg:text-2xl font-bold text-gray-900">Rekaman Sesi Sinkronus</h1>
                        <p class="text-gray-600 mt-1 text-sm md:text-base">Rekaman sesi live dan coaching clinic</p>
                    </div>
                    
                    <!-- Tab Navigation -->
                    <div class="border-b border-gray-200 bg-gray-50">
                        <div class="flex overflow-x-auto">
                            <button class="tab-button flex-shrink-0 px-4 py-3 font-medium text-sm border-b-2 border-transparent hover:bg-white hover:text-blue-600 transition ${this.currentTab === 'onboarding_2' ? 'bg-white text-blue-600 border-blue-600' : 'text-gray-600'}" 
                                    data-tab="onboarding_2">
                                Onboarding Batch 2
                            </button>
                            <button class="tab-button flex-shrink-0 px-4 py-3 font-medium text-sm border-b-2 border-transparent hover:bg-white hover:text-blue-600 transition ${this.currentTab === 'coaching_clinic' ? 'bg-white text-blue-600 border-blue-600' : 'text-gray-600'}" 
                                    data-tab="coaching_clinic">
                                Coaching Group Clinic
                            </button>
                        </div>
                    </div>
                    
                    <div class="p-4 md:p-6">
                        <!-- Session Info & Attendance -->
                        <div class="mb-6 bg-blue-50 rounded-xl p-4 md:p-6 border border-blue-200">
                            <div class="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                                <div>
                                    <h2 class="text-xl md:text-2xl font-bold text-gray-900">${currentSession.title}</h2>
                                    <p class="text-gray-600 mt-1">${currentSession.videos.length} video rekaman</p>
                                </div>
                            </div>
                        </div>

                        <div class="grid grid-cols-1 lg:grid-cols-4 gap-6 md:gap-8">
                            <!-- Video List -->
                            <div class="lg:col-span-1">
                                <div class="bg-gray-50 rounded-xl p-4 border border-gray-200">
                                    <h3 class="font-semibold text-gray-800 mb-3">Daftar Video</h3>
                                    <div class="space-y-2 max-h-96 overflow-y-auto">
                                        ${currentSession.videos.map((video, index) => `
                                            <button class="video-item w-full text-left p-3 rounded-lg transition ${index === this.currentVideoIndex ? 'bg-blue-100 border border-blue-300 text-blue-700' : 'bg-white border border-gray-200 hover:bg-gray-50 text-gray-700'}"
                                                    data-video-index="${index}">
                                                <div class="flex items-center space-x-3">
                                                    <div class="w-8 h-8 rounded-full flex items-center justify-center ${index === this.currentVideoIndex ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-600'}">
                                                        ${index + 1}
                                                    </div>
                                                    <div class="flex-1 min-w-0">
                                                        <div class="font-medium text-sm truncate">${video.title}</div>
                                                    </div>
                                                </div>
                                            </button>
                                        `).join('')}
                                    </div>
                                </div>
                            </div>

                            <!-- Video Player & Navigation -->
                            <div class="lg:col-span-3">
                                <div class="bg-white border border-gray-200 rounded-xl overflow-hidden">
                                    <!-- Video Player -->
                                    <div class="bg-black">
                                        <div class="video-wrapper">
                                            <iframe src="${currentVideo.youtube_url}" 
                                                    frameborder="0" 
                                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                                                    allowfullscreen
                                                    id="main-video-player">
                                            </iframe>
                                        </div>
                                    </div>
                                    
                                    <!-- Video Info -->
                                    <div class="p-4 md:p-6">
                                        <h3 id="current-video-title" class="text-lg md:text-xl font-bold text-gray-900 mb-2">${currentVideo.title}</h3>
                                        <p id="current-session-title" class="text-gray-600 mb-4">${currentSession.title}</p>
                                        
                                        <!-- Simple Navigation -->
                                        <div class="flex gap-3">
                                            <button class="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition font-medium disabled:bg-gray-400 disabled:cursor-not-allowed prev-video"
                                                    ${this.currentVideoIndex === 0 ? 'disabled' : ''}>
                                                <ion-icon name="chevron-back-outline" class="mr-2"></ion-icon>
                                                Sebelumnya
                                            </button>
                                            <button class="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition font-medium disabled:bg-gray-400 disabled:cursor-not-allowed next-video"
                                                    ${this.currentVideoIndex === currentSession.videos.length - 1 ? 'disabled' : ''}>
                                                Selanjutnya
                                                <ion-icon name="chevron-forward-outline" class="ml-2"></ion-icon>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    static async init() {
        if (!this.isInitialized) {
            this.setupTabNavigation();
            this.setupVideoNavigation();
            this.setupVideoList();
            this.setupAttendance();
            this.isInitialized = true;
        }
        
        this.updateVideoList();
        this.updateNavigationButtons();
    }

    static setupTabNavigation() {
        document.addEventListener('click', (e) => {
            const tabButton = e.target.closest('.tab-button');
            if (tabButton) {
                const tabName = tabButton.dataset.tab;
                this.switchTab(tabName);
            }
        });
    }

    static async switchTab(tabName) {
        this.currentTab = tabName;
        this.currentVideoIndex = 0;
        
        const content = await this.render();
        document.getElementById('content').innerHTML = content;
        
        this.updateVideoList();
        this.updateNavigationButtons();
    }

    static setupVideoNavigation() {
        document.addEventListener('click', (e) => {
            const prevButton = e.target.closest('.prev-video');
            const nextButton = e.target.closest('.next-video');
            
            if (prevButton && !prevButton.disabled) {
                e.preventDefault();
                e.stopPropagation();
                this.previousVideo();
            }
            
            if (nextButton && !nextButton.disabled) {
                e.preventDefault();
                e.stopPropagation();
                this.nextVideo();
            }
        });
    }

    static setupVideoList() {
        document.addEventListener('click', (e) => {
            const videoItem = e.target.closest('.video-item');
            if (videoItem) {
                e.preventDefault();
                e.stopPropagation();
                const videoIndex = parseInt(videoItem.dataset.videoIndex);
                this.switchVideo(videoIndex);
            }
        });
    }

    static setupAttendance() {
        document.addEventListener('click', async (e) => {
            if (e.target.closest('.attend-session-btn')) {
                const button = e.target.closest('.attend-session-btn');
                const sessionTitle = button.dataset.sessionTitle;
                
                await this.recordAttendance(sessionTitle);
            }
        });
    }

    static switchVideo(videoIndex) {
        this.currentVideoIndex = videoIndex;
        
        // Update video player
        const sessionsData = this.getSessionsData();
        const currentSession = sessionsData[this.currentTab];
        const currentVideo = currentSession.videos[this.currentVideoIndex];
        
        // Update iframe source
        const videoPlayer = document.getElementById('main-video-player');
        if (videoPlayer) {
            videoPlayer.src = currentVideo.youtube_url;
        }
        
        // ✅ PERBAIKAN: Update judul video dan sesi
        const videoTitleElement = document.getElementById('current-video-title');
        const sessionTitleElement = document.getElementById('current-session-title');
        
        if (videoTitleElement) {
            videoTitleElement.textContent = currentVideo.title;
        }
        if (sessionTitleElement) {
            sessionTitleElement.textContent = currentSession.title;
        }
        
        // Update video list active state
        this.updateVideoList();
        
        // Update navigation buttons
        this.updateNavigationButtons();
    }

    static previousVideo() {
        if (this.currentVideoIndex > 0) {
            this.switchVideo(this.currentVideoIndex - 1);
        }
    }

    static nextVideo() {
        const sessionsData = this.getSessionsData();
        if (this.currentVideoIndex < sessionsData[this.currentTab].videos.length - 1) {
            this.switchVideo(this.currentVideoIndex + 1);
        }
    }

    static async recordAttendance(sessionTitle) {
        try {
            const sessionId = await this.getOrCreateSession(sessionTitle);
            await sessionAttendanceService.recordAttendance(sessionId, `Menghadiri sesi: ${sessionTitle}`);
            this.showNotification(`Kehadiran untuk "${sessionTitle}" berhasil dicatat!`, 'success');
        } catch (error) {
            console.error('Attendance error:', error);
            this.showNotification('Gagal mencatat kehadiran: ' + error.message, 'error');
        }
    }

    static async getOrCreateSession(sessionTitle) {
        const sessionId = this.hashString(sessionTitle);
        return sessionId;
    }

    static updateVideoList() {
        const videoItems = document.querySelectorAll('.video-item');
        videoItems.forEach((item, index) => {
            if (index === this.currentVideoIndex) {
                item.classList.add('bg-blue-100', 'border-blue-300', 'text-blue-700');
                item.classList.remove('bg-white', 'border-gray-200', 'text-gray-700');
            } else {
                item.classList.remove('bg-blue-100', 'border-blue-300', 'text-blue-700');
                item.classList.add('bg-white', 'border-gray-200', 'text-gray-700');
            }
        });
    }

    static updateNavigationButtons() {
        const sessionsData = this.getSessionsData();
        const prevButton = document.querySelector('.prev-video');
        const nextButton = document.querySelector('.next-video');
        
        if (prevButton) {
            prevButton.disabled = this.currentVideoIndex === 0;
        }
        
        if (nextButton) {
            nextButton.disabled = this.currentVideoIndex === sessionsData[this.currentTab].videos.length - 1;
        }
    }

    static getSessionsData() {
        return {
            onboarding_2: {
                title: "Onboarding Kampus Riset Angkatan 2",
                videos: [
                    { title: "Onboarding Kampus Riset Angkatan 2", youtube_url: "https://www.youtube.com/embed/gWiYMp4nOR8" }
                ]
            },
            coaching_clinic: {
                title: "Coaching Group Clinic",
                videos: [
                    { title: "CGC#1: Coaching Group Clinic 1", youtube_url: "https://www.youtube.com/embed/WEe7vJ08mZ8" }
                ]
            }
        };
    }

    static hashString(str) {
        let hash = 0;
        for (let i = 0; i < str.length; i++) {
            const char = str.charCodeAt(i);
            hash = ((hash << 5) - hash) + char;
            hash = hash & hash;
        }
        return 'session_' + Math.abs(hash).toString();
    }

    static showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `fixed top-4 right-4 p-4 rounded-lg shadow-lg z-50 ${
            type === 'success' ? 'bg-green-500 text-white' :
            type === 'error' ? 'bg-red-500 text-white' :
            'bg-blue-500 text-white'
        }`;
        notification.innerHTML = `
            <div class="flex items-center">
                <ion-icon name="${type === 'success' ? 'checkmark-circle' : type === 'error' ? 'close-circle' : 'information-circle'}" 
                         class="mr-2"></ion-icon>
                <span>${message}</span>
            </div>
        `;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.remove();
        }, 3000);
    }
}

export default Sinkronus;