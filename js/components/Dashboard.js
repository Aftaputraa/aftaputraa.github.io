// js/components/Dashboard.js
import { getWeekData } from '../../data/weekData.js';
import { courseAttendanceService } from '../config/supabase.js';

class Dashboard {
    static unlockedWeek = 12; // Hanya week 1 yang terbuka

    static async render() {
        const progress = await courseAttendanceService.getUserCourseProgress();
        const weekData = getWeekData();
        
        // Filter hanya week yang unlocked
        const availableWeeks = Object.keys(weekData)
            .filter(weekId => parseInt(weekId) <= this.unlockedWeek)
            .sort((a, b) => parseInt(a) - parseInt(b));
        
        // Hitung progress hanya dari week yang unlocked
        let totalCourses = 0;
        let completedCourses = 0;
        
        availableWeeks.forEach(weekId => {
            const weekMaterials = weekData[weekId]?.materials || [];
            const weekProgress = progress[weekId] || {};
            
            totalCourses += weekMaterials.length;
            completedCourses += Object.values(weekProgress).filter(Boolean).length;
        });
        
        const percentage = totalCourses > 0 ? Math.round((completedCourses / totalCourses) * 100) : 0;
        
        const stats = {
            percentage: percentage,
            completedCourses: completedCourses,
            totalCourses: totalCourses
        };
        
        // Filter pekan yang memiliki materi dan unlocked
        const weeksWithMaterials = availableWeeks
            .filter(weekId => {
                const materials = weekData[weekId]?.materials || [];
                return materials.length > 0;
            });

        return `
            <div class="max-w-6xl mx-auto">
                <div class="bg-white shadow-lg rounded-xl md:rounded-2xl p-4 md:p-6 lg:p-8 space-y-6 md:space-y-8">
                    <!-- Welcome Section -->
                    <div class="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4 md:gap-6 lg:gap-8">
                        <div class="lg:flex-1">
                            <h1 class="text-xl md:text-2xl lg:text-3xl font-bold text-gray-900 mb-3 md:mb-4">Selamat Datang di Kampus Riset</h1>
                            <div class="text-gray-700 space-y-3 md:space-y-4 text-sm md:text-base">
                                <p class="leading-relaxed">
                                    Sekolah riset terstruktur untuk dosen, peneliti, dan mahasiswa akhir yang menuntun Anda dari 
                                    <strong>drafting → revising → editing → pre‑submit</strong>.
                                </p>
                                <p class="leading-relaxed">
                                    Terdiri dari <strong>20 e-course on-demand</strong> + <strong>4–6 Coaching Clinic (grup)</strong> + 
                                    <strong>1× konsultasi privat</strong>, lengkap dengan coaching clinic, konsultasi 1:1, submission kit 
                                    ke jurnal target (SINTA/Scopus), peer review, hingga pendampingan submission & korespondensi.
                                </p>
                                <p class="leading-relaxed">
                                    Berbasis praktik, etis, dan didukung <strong>Hcelerate AI (Research OS, bukan AI agregator)</strong>.
                                </p>
                            </div>
                        </div>
                        
                        <!-- Progress Stats -->
                        <div class="lg:w-64">
                            <div class="bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl p-4 md:p-5 text-white">
                                <h3 class="font-semibold mb-2">Progress Onboarding</h3>
                                <div class="text-2xl md:text-3xl font-bold mb-2">${stats.percentage}%</div>
                                <div class="text-blue-100 text-sm">
                                    ${stats.completedCourses} dari ${stats.totalCourses} course selesai
                                </div>
                                <div class="mt-3 bg-blue-400 rounded-full h-2">
                                    <div class="bg-white rounded-full h-2 transition-all duration-500" 
                                         style="width: ${stats.percentage}%"></div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Guidebook Section -->
                    <div class="mt-6 md:mt-8">
                        <h2 class="text-lg md:text-xl font-bold text-gray-800 mb-4 md:mb-6">Guidebook Kampus Riset</h2>
                        <div class="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-4 md:p-6 border-2 border-blue-200">
                            <div class="flex flex-col lg:flex-row gap-4 md:gap-6">
                                <div class="lg:w-2/3">
                                    <h3 class="font-bold text-gray-800 text-base md:text-lg mb-2">Panduan Lengkap Program</h3>
                                    <p class="text-gray-600 mb-3 md:mb-4 leading-relaxed text-sm md:text-base">
                                        Download guidebook untuk memahami alur program, timeline, dan resources yang tersedia di Kampus Riset.
                                    </p>
                                    <a href="https://hcelerate.id/wp-content/uploads/2026/05/Guidebook-Kampus-Riset-Bacth-3.pdf" 
                                       target="_blank" 
                                       class="inline-flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 md:px-5 md:py-2.5 rounded-lg hover:bg-blue-700 transition font-medium text-sm md:text-base">
                                        <ion-icon name="download-outline"></ion-icon>
                                        <span>Download Guidebook</span>
                                    </a>
                                </div>
                                <div class="lg:w-1/3">
                                    <div class="bg-white rounded-lg p-3 md:p-4 border border-gray-200">
                                        <div class="pdf-wrapper">
                                            <iframe src="https://hcelerate.id/wp-content/uploads/2026/05/Guidebook-Kampus-Riset-Bacth-3.pdf" 
                                                    frameborder="0">
                                            </iframe>
                                        </div>
                                        <p class="text-xs md:text-sm text-gray-500 text-center mt-2">Preview Guidebook</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Roadmap Section - Hanya Pekan 1 yang ditampilkan -->
                    <div class="mt-6 md:mt-8">
                        <h2 class="text-lg md:text-xl font-bold text-gray-800 mb-4 md:mb-6">Roadmap Onboarding</h2>
                        <div class="grid grid-cols-1 md:grid-cols-4 gap-4 md:gap-5">
                            ${weeksWithMaterials.map(weekId => {
                                const weekNum = parseInt(weekId);
                                const weekTitle = weekData[weekId]?.title || 'Materi akan segera tersedia';
                                const weekProgress = progress[weekId] || {};
                                const weekMaterials = weekData[weekId]?.materials || [];
                                const completedCount = Object.values(weekProgress).filter(Boolean).length;
                                const totalCount = weekMaterials.length;
                                const isCompleted = completedCount === totalCount && totalCount > 0;
                                const isInProgress = completedCount > 0 && completedCount < totalCount;
                                const isLocked = weekNum > this.unlockedWeek;
                                
                                return `
                                <div class="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-4 md:p-5 border-2 ${isCompleted?'border-green-400':isInProgress?'border-blue-400':'border-blue-200'} shadow-sm hover:shadow-md transition-shadow duration-300 ${isLocked ? 'opacity-60' : ''}">
                                    <div class="flex items-center justify-between mb-3 md:mb-4">
                                        <h3 class="font-bold text-gray-800 text-base md:text-lg">Pekan ${weekNum}</h3>
                                        <span class="text-lg md:text-xl ${isCompleted?'text-green-600':isInProgress?'text-blue-600':isLocked?'text-gray-400':'text-blue-500'}">
                                            ${isLocked ? '🔒' : isCompleted ? '✓' : isInProgress ? '⏳' : '📚'}
                                        </span>
                                    </div>
                                    <p class="text-gray-600 mb-3 md:mb-4 leading-relaxed text-sm md:text-base">${weekTitle}</p>
                                    <div class="text-xs md:text-sm ${isCompleted?'text-green-600':isInProgress?'text-blue-600':isLocked?'text-gray-500':'text-blue-600'} font-medium">
                                        ${isLocked ? '🔒 Terkunci' : isCompleted ? '✓ Selesai' : isInProgress ? `${completedCount}/${totalCount} Selesai` : '📚 Tersedia'}
                                    </div>
                                </div>`;
                            }).join('')}
                            
                            <!-- Card untuk pekan terkunci -->
                            ${this.unlockedWeek < Object.keys(weekData).length ? `
                            <div class="relative">
                                <div class="bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl p-4 md:p-5 border-2 border-gray-300 opacity-60 cursor-not-allowed">
                                    <div class="flex items-center justify-between mb-3 md:mb-4">
                                        <h3 class="font-bold text-gray-500 text-base md:text-lg">Pekan ${this.unlockedWeek + 1}</h3>
                                        <span class="text-lg md:text-xl text-gray-400">
                                            🔒
                                        </span>
                                    </div>
                                    <p class="text-gray-500 mb-3 md:mb-4 leading-relaxed text-sm md:text-base">Materi terkunci</p>
                                    <div class="text-xs md:text-sm text-gray-500 font-medium">
                                        🔒 Selesaikan Pekan ${this.unlockedWeek}
                                    </div>
                                </div>
                                <div class="absolute inset-0 flex items-center justify-center">
                                    <div class="bg-black bg-opacity-50 rounded-xl p-2 text-white text-xs font-medium">
                                        Selesaikan Pekan ${this.unlockedWeek}
                                    </div>
                                </div>
                            </div>
                            ` : ''}
                        </div>
                        
                        <!-- Informasi lock system -->
                        <div class="mt-4 md:mt-6 p-3 md:p-4 bg-blue-50 border border-blue-200 rounded-lg">
                            <p class="text-sm md:text-base text-blue-800">
                                <strong>Informasi:</strong> Materi akan terbuka secara bertahap. Selesaikan semua materi di <strong>Pekan ${this.unlockedWeek}</strong> untuk membuka pekan berikutnya.
                            </p>
                        </div>
                    </div>

                    <!-- Locked Weeks Preview -->
                    ${this.unlockedWeek < Object.keys(weekData).length ? `
                    <div class="mt-6 md:mt-8">
                        <h2 class="text-lg md:text-xl font-bold text-gray-800 mb-4 md:mb-6">Preview Pekan Berikutnya</h2>
                        <div class="p-4 md:p-6 bg-gradient-to-r from-yellow-50 to-orange-50 border-2 border-yellow-200 rounded-xl">
                            <div class="flex items-start gap-3 md:gap-4">
                                <div class="flex-shrink-0">
                                    <div class="w-10 h-10 md:w-12 md:h-12 bg-yellow-100 rounded-full flex items-center justify-center">
                                        <ion-icon name="lock-closed" class="text-xl md:text-2xl text-yellow-600"></ion-icon>
                                    </div>
                                </div>
                                <div>
                                    <h3 class="font-bold text-yellow-800 text-base md:text-lg mb-2">Akses Pekan Berikutnya</h3>
                                    <p class="text-yellow-700 mb-3 md:mb-4">
                                        Selesaikan semua materi di <strong>Pekan ${this.unlockedWeek}</strong> untuk membuka akses ke pekan berikutnya. 
                                        Sistem ini dirancang untuk memastikan Anda memahami konsep dasar sebelum melanjutkan.
                                    </p>
                                    <div class="flex items-center space-x-2 text-sm md:text-base">
                                        <span class="text-green-600 font-medium">✓</span>
                                        <span class="text-gray-700">Belajar bertahap dan terstruktur</span>
                                    </div>
                                    <div class="flex items-center space-x-2 text-sm md:text-base mt-2">
                                        <span class="text-green-600 font-medium">✓</span>
                                        <span class="text-gray-700">Pastikan pemahaman konsep dasar</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    ` : ''}
                </div>
            </div>
        `;
    }

    // Method untuk update unlocked week (bisa dipanggil dari Materi component)
    static updateUnlockedWeek(newWeek) {
        this.unlockedWeek = newWeek;
    }
}

export default Dashboard;
