import Auth from '../auth.js';
import { getWeekData } from '../../data/weekData.js';

class Attendance {
    static activeTab = 'e-course';
    static auth = new Auth();

    static async render() {
        if (!this.auth.isAuthenticated()) {
            return '<div class="p-8 text-center text-red-600">Silakan login terlebih dahulu</div>';
        }

        return `
            <div class="max-w-6xl mx-auto">
                <div class="bg-white shadow-lg rounded-xl md:rounded-2xl overflow-hidden">
                    <div class="p-4 md:p-6 border-b border-gray-200">
                        <h1 class="text-lg md:text-xl lg:text-2xl font-bold text-gray-900">Progress E-Course</h1>
                        <p class="text-gray-600 mt-1 text-sm md:text-base">Penyelesaian materi e-course</p>
                    </div>
                    
                    <div class="p-4 md:p-6">
                        ${await this.renderECourse()}
                    </div>
                </div>
            </div>
        `;
    }

    static async renderECourse() {
        try {
            const weekData = getWeekData();
            const progress = await this.auth.getCourseProgress();

            return `
                <div class="space-y-6">
                    <h2 class="text-xl font-bold text-gray-900 mb-4">Form Penyelesaian E-Course</h2>
                    
                    <div class="space-y-6">
                        ${Object.entries(weekData).map(([weekNumber, week]) => {
                            if (!week.materials || week.materials.length === 0) return '';
                            
                            const weekProgress = progress[weekNumber] || {};
                            const totalCourses = week.materials.length;
                            const completedCourses = Object.values(weekProgress).filter(Boolean).length;
                            
                            return `
                            <div class="bg-white border border-gray-200 rounded-xl p-6">
                                <div class="flex items-center justify-between mb-4">
                                    <h3 class="font-semibold text-gray-900 text-lg">Pekan ${weekNumber}: ${week.title}</h3>
                                    <span class="text-sm ${completedCourses === totalCourses ? 'text-green-600' : 'text-gray-500'}">
                                        ${completedCourses}/${totalCourses} selesai
                                    </span>
                                </div>
                                
                                <div class="w-full bg-gray-200 rounded-full h-2 mb-4">
                                    <div class="bg-green-600 h-2 rounded-full transition-all duration-300" style="width: ${(completedCourses/totalCourses)*100}%"></div>
                                </div>
                                
                                <div class="space-y-3">
                                    ${week.materials.map(material => {
                                        const isCompleted = weekProgress[material.title];
                                        return `
                                        <label class="flex items-center space-x-3 p-3 border ${isCompleted ? 'border-green-200 bg-green-50' : 'border-gray-200'} rounded-lg hover:bg-gray-50 cursor-pointer transition">
                                            <input type="checkbox" ${isCompleted ? 'checked disabled' : ''}
                                                   class="course-checkbox text-green-600 focus:ring-green-500"
                                                   data-week="${weekNumber}" data-course="${material.title}">
                                            <span class="${isCompleted ? 'text-green-700' : 'text-gray-700'} flex-1 text-sm">
                                                ${material.title}
                                            </span>
                                            ${isCompleted ? '<span class="text-green-600 text-sm font-medium">✓ Selesai</span>' : ''}
                                        </label>
                                        `;
                                    }).join('')}
                                </div>
                                
                                ${completedCourses < totalCourses ? `
                                    <button class="w-full mt-4 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition font-medium save-progress"
                                            data-week="${weekNumber}">
                                        Simpan Progress Pekan ${weekNumber}
                                    </button>
                                ` : `
                                    <div class="w-full mt-4 bg-green-600 text-white py-2 px-4 rounded-lg text-center font-medium">
                                        ✓ Semua Course Selesai
                                    </div>
                                `}
                            </div>
                            `;
                        }).join('')}
                    </div>
                </div>
            `;
        } catch (error) {
            console.error('Error loading e-course progress:', error);
            return '<div class="text-center py-8 text-red-600">Error loading e-course progress. Silakan refresh halaman.</div>';
        }
    }

    static async init() {
        document.addEventListener('click', (e) => {
            if (e.target.closest('.save-progress')) {
                const button = e.target.closest('.save-progress');
                this.saveWeekProgress(parseInt(button.dataset.week));
            }
        });
    }

    static async saveWeekProgress(weekNumber) {
        try {
            const checkboxes = document.querySelectorAll(`.course-checkbox[data-week="${weekNumber}"]:checked`);
            const completedCourses = Array.from(checkboxes).map(cb => cb.dataset.course);
            
            if (completedCourses.length === 0) {
                this.showNotification('Pilih minimal satu course!', 'error');
                return;
            }

            // Show loading state on button
            const button = document.querySelector(`.save-progress[data-week="${weekNumber}"]`);
            const originalText = button.textContent;
            button.textContent = 'Menyimpan...';
            button.disabled = true;

            for (const courseTitle of completedCourses) {
                await this.auth.recordCourseCompletion(weekNumber, courseTitle);
            }

            this.showNotification(`Progress pekan ${weekNumber} berhasil disimpan!`, 'success');
            
            // Refresh the page to show updated progress
            setTimeout(() => {
                this.refreshView();
            }, 1000);
            
        } catch (error) {
            console.error('Error saving progress:', error);
            this.showNotification('Gagal menyimpan progress. Coba lagi.', 'error');
            
            // Reset button if there's an error
            const button = document.querySelector(`.save-progress[data-week="${weekNumber}"]`);
            if (button) {
                button.textContent = `Simpan Progress Pekan ${weekNumber}`;
                button.disabled = false;
            }
        }
    }

    static async refreshView() {
        const content = await this.render();
        const contentDiv = document.getElementById('content');
        if (contentDiv) {
            contentDiv.innerHTML = content;
            await this.init();
        }
    }

    static showNotification(message, type = 'info') {
        // Remove any existing notification
        const existingNotification = document.querySelector('.notification-toast');
        if (existingNotification) {
            existingNotification.remove();
        }
        
        const notification = document.createElement('div');
        notification.className = `notification-toast fixed top-4 right-4 p-4 rounded-lg shadow-lg z-50 transition-all duration-300 ${
            type === 'success' ? 'bg-green-500 text-white' :
            type === 'error' ? 'bg-red-500 text-white' :
            'bg-blue-500 text-white'
        }`;
        notification.innerHTML = `<div class="flex items-center space-x-2"><span>${message}</span></div>`;
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.style.opacity = '0';
            setTimeout(() => notification.remove(), 300);
        }, 4000);
    }
}

export default Attendance;
