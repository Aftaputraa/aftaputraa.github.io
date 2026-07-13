import { getWeekData } from '../../data/weekData.js';
import Auth from '../auth.js';
import { supabase } from '../config/supabase.js';

class Materi {
    static currentWeek = 11;
    static currentCourseIndex = 0;
    static currentVideoIndex = 0;
    static auth = new Auth();
    static listenersInitialized = false;
    
    // Whitelist email yang bisa akses semua week
    static whitelistEmails = [
        'admin@hcelerate.id',
        'mentor@hcelerate.id', 
        'reviewer@hcelerate.id',
        'testing@hcelerate.id',
        'setyo@gmail.com',
        'set@hcelerate.id',
        'kampusriset@hcelerate.id',
        'michaelparlie@gmail.com'
    ];
    
    // Variable untuk menentukan week mana yang terbuka untuk regular user
    static unlockedWeekForRegular = 11;
    
    // Flag untuk menandai apakah user whitelist
    static isWhitelisted = false;

    static async init() {
        const currentUserStr = localStorage.getItem('currentUser');
        if (currentUserStr) {
            try {
                const currentUser = JSON.parse(currentUserStr);
                const userEmail = currentUser.email;
                
                this.isWhitelisted = this.whitelistEmails.some(
                    whitelistEmail => whitelistEmail.toLowerCase() === userEmail.toLowerCase()
                );
            } catch (e) {
                console.error('Error parsing currentUser:', e);
            }
        }
        
        const content = await this.render();
        document.getElementById('content').innerHTML = content;

        if (!this.listenersInitialized) {
            this.listenersInitialized = true;
            this.setupGlobalEvents();
        }
    }

    // ==================== SUPABASE METHODS ====================
    
    static async getUserCourseIndexes(email) {
        if (this.currentWeek !== 4) return [];
        
        try {
            const { data, error } = await supabase
                .from('user_week4_choices')
                .select('course_index')
                .eq('email', email);
            
            if (error) throw error;
            return data.map(item => item.course_index);
        } catch (error) {
            console.error('Error fetching user courses:', error);
            return [1];
        }
    }
    
    static async saveUserCourseIndexes(email, indexes) {
        try {
            const optionalIndexes = indexes.filter(idx => idx >= 2 && idx <= 14);
            if (optionalIndexes.length > 5) {
                this.showNotification('Maksimal 5 course opsional!', 'error');
                return false;
            }
            
            // Cek apakah sudah pernah pilih
            const { data: existingSelections } = await supabase
                .from('user_week4_choices')
                .select('*')
                .eq('email', email);
            
            const hasOptionalSelections = existingSelections && 
                existingSelections.some(selection => selection.course_index >= 2);
            
            if (hasOptionalSelections) {
                this.showNotification('Anda sudah memilih course. Untuk perubahan, hubungi admin.', 'info');
                return false;
            }
            
            const allIndexes = [1, ...optionalIndexes];
            
            // Hapus semua (khusus untuk user baru)
            await supabase
                .from('user_week4_choices')
                .delete()
                .eq('email', email);
            
            // Insert baru
            const insertData = allIndexes.map(index => ({
                email,
                course_index: index
            }));
            
            const { error } = await supabase
                .from('user_week4_choices')
                .insert(insertData);
            
            if (error) throw error;
            
            return true;
        } catch (error) {
            console.error('Error saving courses:', error);
            this.showNotification('Gagal menyimpan pilihan', 'error');
            return false;
        }
    }
    
    static async getFilteredWeek4Courses(email) {
        const week4Data = getWeekData()[4];
        const userIndexes = await this.getUserCourseIndexes(email);
        
        if (userIndexes.length <= 1) {
            return week4Data.materials.filter(course => course.index === 1);
        }
        
        return week4Data.materials.filter(course => 
            userIndexes.includes(course.index)
        );
    }
    
    // ==================== MODAL METHODS ====================
    
    static async showCourseSelectionModal(email) {
        const week4Courses = getWeekData()[4].materials;
        const currentSelections = await this.getUserCourseIndexes(email);
        
        // Cek apakah sudah pernah pilih
        const hasOptionalSelections = currentSelections.some(idx => idx >= 2);
        
        if (hasOptionalSelections) {
            this.showNotification('Anda sudah memilih course. Untuk perubahan, hubungi admin.', 'info');
            return;
        }
        
        const mandatory = week4Courses.find(c => c.index === 1);
        const kuantitatif = week4Courses.filter(c => c.category === 'kuantitatif');
        const kualitatif = week4Courses.filter(c => 
            c.category === 'kualitatif' || 
            c.category === 'slr' || 
            c.category === 'bibliometrik'
        );
        
        const selectedOptionalCount = currentSelections.filter(idx => idx >= 2).length;
        
        const modalHTML = `
            <div class="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4" id="courseSelectionModal">
                <div class="bg-white rounded-xl p-6 max-w-2xl w-full max-h-[85vh] overflow-y-auto">
                    <div class="mb-6">
                        <h3 class="text-xl font-bold text-gray-900 mb-2">Pilih Course Pekan 4</h3>
                        <div class="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-3">
                            <div class="flex items-start">
                                <ion-icon name="information-circle" class="text-blue-600 mr-2 mt-0.5"></ion-icon>
                                <div>
                                    <p class="text-blue-800 text-sm">
                                        Pilih maksimal 5 course opsional. Pilihan dapat diubah dengan menghubungi admin.
                                    </p>
                                </div>
                            </div>
                        </div>
                        <p class="text-gray-600 mb-4">Pilih <span class="font-bold">maksimal 5 course opsional</span> sesuai kebutuhan penelitian Anda</p>
                    </div>
                    
                    <div class="mb-4 p-3 bg-blue-50 rounded-lg">
                        <div class="flex justify-between items-center">
                            <span>Course opsional terpilih:</span>
                            <span class="text-lg font-bold"><span id="selectedCount">${selectedOptionalCount}</span>/5</span>
                        </div>
                    </div>
                    
                    <!-- Wajib -->
                    <div class="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
                        <div class="flex items-center">
                            <input type="checkbox" checked disabled class="h-5 w-5 mr-3 text-green-600">
                            <div>
                                <div class="font-bold text-green-800">${mandatory.title}</div>
                                <div class="text-sm text-green-600 mt-1">(Wajib untuk semua peserta)</div>
                            </div>
                        </div>
                    </div>
                    
                    <p class="mb-4 font-medium text-gray-800">MATERI PILIHAN:</p>
                    
                    <!-- Opsional: KUANTITATIF -->
                    <div class="mb-6">
                        <h4 class="font-bold text-gray-800 mb-3 text-sm uppercase">Kuantitatif</h4>
                        <div class="space-y-2">
                            ${kuantitatif.map(course => `
                                <label class="course-option flex items-start p-3 border rounded hover:bg-blue-50 cursor-pointer ${
                                    currentSelections.includes(course.index) ? 'border-blue-500 bg-blue-50' : 'border-gray-200'
                                }">
                                    <input type="checkbox" 
                                           class="optional-checkbox h-5 w-5 mr-3 mt-1"
                                           value="${course.index}"
                                           ${currentSelections.includes(course.index) ? 'checked' : ''}>
                                    <div class="flex-1">
                                        <div class="font-medium">${course.title}</div>
                                        <div class="text-sm text-gray-500">${course.videos.length} sesi</div>
                                    </div>
                                </label>
                            `).join('')}
                        </div>
                    </div>
                    
                    <!-- Opsional: KUALITATIF -->
                    <div class="mb-6">
                        <h4 class="font-bold text-gray-800 mb-3 text-sm uppercase">Kualitatif</h4>
                        <div class="space-y-2">
                            ${kualitatif.map(course => `
                                <label class="course-option flex items-start p-3 border rounded hover:bg-purple-50 cursor-pointer ${
                                    currentSelections.includes(course.index) ? 'border-purple-500 bg-purple-50' : 'border-gray-200'
                                }">
                                    <input type="checkbox" 
                                           class="optional-checkbox h-5 w-5 mr-3 mt-1"
                                           value="${course.index}"
                                           ${currentSelections.includes(course.index) ? 'checked' : ''}>
                                    <div class="flex-1">
                                        <div class="font-medium">${course.title}</div>
                                        <div class="text-sm text-gray-500">${course.videos.length} sesi</div>
                                    </div>
                                </label>
                            `).join('')}
                        </div>
                    </div>
                    
                    <!-- Buttons -->
                    <div class="flex justify-end space-x-3 pt-4 border-t">
                        <button type="button" class="modal-cancel-btn px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                            Nanti Saja
                        </button>
                        <button type="button" class="modal-save-btn px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                            Simpan Pilihan
                        </button>
                    </div>
                </div>
            </div>
        `;
        
        // Hapus modal lama jika ada
        const existingModal = document.getElementById('courseSelectionModal');
        if (existingModal) existingModal.remove();
        
        document.body.insertAdjacentHTML('beforeend', modalHTML);
        this.setupModalEvents(email);
    }
    
    static setupModalEvents(email) {
        const modal = document.getElementById('courseSelectionModal');
        if (!modal) return;

        const updateSelectionCount = () => {
            const selected = modal.querySelectorAll('.optional-checkbox:checked').length;
            document.getElementById('selectedCount').textContent = selected;
            
            if (selected >= 5) {
                modal.querySelectorAll('.optional-checkbox:not(:checked)').forEach(cb => cb.disabled = true);
            } else {
                modal.querySelectorAll('.optional-checkbox').forEach(cb => cb.disabled = false);
            }
        };

        // Event untuk checkbox
        modal.addEventListener('change', (e) => {
            if (e.target.classList.contains('optional-checkbox')) {
                const selected = modal.querySelectorAll('.optional-checkbox:checked').length;
                if (selected > 5) {
                    e.target.checked = false;
                    this.showNotification('Maksimal 5 course opsional!', 'error');
                    return;
                }
                updateSelectionCount();
            }
        });

        // Save button
        modal.querySelector('.modal-save-btn').addEventListener('click', async () => {
            const checkboxes = modal.querySelectorAll('.optional-checkbox:checked');
            const indexes = Array.from(checkboxes).map(cb => parseInt(cb.value));
            
            if (indexes.length === 0) {
                this.showNotification('Pilih minimal 1 course opsional', 'error');
                return;
            }
            
            const success = await this.saveUserCourseIndexes(email, indexes);
            
            if (success) {
                modal.remove();
                this.showNotification('Pilihan berhasil disimpan! Untuk perubahan hubungi admin.', 'success');
                const content = await this.render();
                document.getElementById('content').innerHTML = content;
            }
        });

        // Cancel button
        modal.querySelector('.modal-cancel-btn').addEventListener('click', () => {
            modal.remove();
        });

        // Close modal outside click
        modal.addEventListener('click', (e) => {
            if (e.target === modal) modal.remove();
        });

        updateSelectionCount();
    }
    
    // ==================== MAIN RENDER METHODS ====================

    static setupGlobalEvents() {
        document.addEventListener('click', async (e) => {
            const tab = e.target.closest('.tab-button');
            if (tab) {
                await this.switchWeek(parseInt(tab.dataset.week));
                return;
            }

            const courseItem = e.target.closest('.course-item');
            if (courseItem) {
                await this.switchCourse(parseInt(courseItem.dataset.courseIndex));
                return;
            }

            if (e.target.closest('.video-nav-prev')) await this.previousVideo();
            if (e.target.closest('.video-nav-next')) await this.nextVideo();
            if (e.target.closest('.course-nav-prev')) await this.previousCourse();
            if (e.target.closest('.course-nav-next')) await this.nextCourse();

            const mc = e.target.closest('.mark-complete');
            if (mc) await this.markAsComplete();

            // Tombol "Pilih/Ubah Pilihan"
            const editBtn = e.target.closest('.edit-selections-btn');
            if (editBtn) {
                const currentUserStr = localStorage.getItem('currentUser');
                if (currentUserStr) {
                    const currentUser = JSON.parse(currentUserStr);
                    this.showCourseSelectionModal(currentUser.email);
                }
                return;
            }
            
            const switchWeekBtn = e.target.closest('.switch-week-btn');
            if (switchWeekBtn) {
                const weekId = parseInt(switchWeekBtn.dataset.week);
                await this.switchWeek(weekId);
                return;
            }
        });
    }

    static async switchWeek(weekId) {
        if (!this.isWhitelisted && weekId > this.unlockedWeekForRegular) {
            this.showNotification('Minggu ini terkunci. Materi akan dibuka sesuai jadwal program.', 'error');
            return;
        }
        
        this.currentWeek = parseInt(weekId);
        this.currentCourseIndex = 0;
        this.currentVideoIndex = 0;

        const content = await this.render();
        document.getElementById('content').innerHTML = content;
    }

    static async switchCourse(courseIndex) {
        this.currentCourseIndex = courseIndex;
        this.currentVideoIndex = 0;
        await this.rerenderCourseContent();
    }

    static async switchVideo(videoIndex) {
        this.currentVideoIndex = videoIndex;
        await this.rerenderCourseContent();
    }

    static async previousCourse() {
        if (this.currentCourseIndex > 0) {
            await this.switchCourse(this.currentCourseIndex - 1);
        }
    }

    static async nextCourse() {
        const currentUserStr = localStorage.getItem('currentUser');
        let materials = this.getCurrentWeekData().materials;
        
        if (this.currentWeek === 4 && currentUserStr) {
            try {
                const currentUser = JSON.parse(currentUserStr);
                materials = await this.getFilteredWeek4Courses(currentUser.email);
            } catch (e) {}
        }
        
        if (this.currentCourseIndex < materials.length - 1) {
            await this.switchCourse(this.currentCourseIndex + 1);
        }
    }

    static async previousVideo() {
        if (this.currentVideoIndex > 0) {
            await this.switchVideo(this.currentVideoIndex - 1);
        }
    }

    static async nextVideo() {
        const currentUserStr = localStorage.getItem('currentUser');
        let materials = this.getCurrentWeekData().materials;
        
        if (this.currentWeek === 4 && currentUserStr) {
            try {
                const currentUser = JSON.parse(currentUserStr);
                materials = await this.getFilteredWeek4Courses(currentUser.email);
            } catch (e) {}
        }
        
        const course = materials[this.currentCourseIndex];
        if (course && this.currentVideoIndex < course.videos.length - 1) {
            await this.switchVideo(this.currentVideoIndex + 1);
        }
    }

    static async render() {
        const progress = await this.auth.getCourseProgress();
        const weekData = getWeekData();

        const availableWeeks = Object.keys(weekData).filter(
            weekId => weekData[weekId].materials && weekData[weekId].materials.length > 0
        );

        let currentWeekData = weekData[this.currentWeek];
        let materialsToRender = currentWeekData.materials;
        let totalCount = currentWeekData.materials.length;
        
        if (this.currentWeek === 4) {
            const currentUserStr = localStorage.getItem('currentUser');
            if (currentUserStr) {
                try {
                    const currentUser = JSON.parse(currentUserStr);
                    materialsToRender = await this.getFilteredWeek4Courses(currentUser.email);
                    totalCount = materialsToRender.length;
                    
                    const userIndexes = await this.getUserCourseIndexes(currentUser.email);
                    const optionalCount = userIndexes.filter(idx => idx >= 2).length;
                    
                    if (optionalCount === 0 && !this.isWhitelisted) {
                        setTimeout(() => this.showCourseSelectionModal(currentUser.email), 500);
                    }
                } catch (e) {}
            }
        }

        const weekProgress = progress[this.currentWeek] || {};
        const completedCount = materialsToRender.filter(course => 
            weekProgress[course.title]
        ).length;

        return `
            <div class="max-w-6xl mx-auto">
                <div class="bg-white shadow-lg rounded-xl md:rounded-2xl overflow-hidden">
                    <div class="p-4 md:p-6 border-b border-gray-200">
                        <h1 class="text-lg md:text-xl lg:text-2xl font-bold text-gray-900">Materi Asinkron</h1>
                        <p class="text-gray-600 mt-1 text-sm md:text-base">Pelajari materi e-course sesuai roadmap yang telah ditentukan</p>
                    </div>
                    
                    <div class="border-b border-gray-200 bg-gray-50">
                        <div class="flex overflow-x-auto">
                            ${availableWeeks.map(weekId => {
                                const weekNum = parseInt(weekId);
                                const weekProgress = progress[weekId] || {};
                                const weekCompletedCount = Object.values(weekProgress).filter(Boolean).length;
                                const weekTotalCount = weekData[weekId].materials.length;
                                const isActive = weekId == this.currentWeek;
                                const isLocked = !this.isWhitelisted && weekNum > this.unlockedWeekForRegular;
                                
                                if (isLocked) {
                                    return `
                                    <button class="tab-button flex-shrink-0 px-4 py-3 font-medium text-sm border-b-2 border-transparent cursor-not-allowed opacity-60" 
                                            data-week="${weekId}">
                                        <div class="flex items-center space-x-2">
                                            <span>Pekan ${weekId}</span>
                                            <ion-icon name="lock-closed" class="text-gray-500"></ion-icon>
                                        </div>
                                    </button>`;
                                }
                                
                                return `
                                <button class="tab-button flex-shrink-0 px-4 py-3 font-medium text-sm border-b-2 border-transparent hover:bg-white hover:text-blue-600 transition ${
                                    isActive ? 'bg-white text-blue-600 border-blue-600' : 'text-gray-600'
                                }" data-week="${weekId}">
                                    <div class="flex items-center space-x-2">
                                        <span>Pekan ${weekId}</span>
                                        ${weekCompletedCount === weekTotalCount && weekTotalCount > 0 ? 
                                            '<span class="text-green-500">✓</span>' : 
                                            weekCompletedCount > 0 ? 
                                            `<span class="text-blue-500 text-xs">${weekCompletedCount}/${weekTotalCount}</span>` : 
                                            ''
                                        }
                                    </div>
                                </button>`;
                            }).join('')}
                        </div>
                    </div>
                    
                    ${!this.isWhitelisted && this.currentWeek > this.unlockedWeekForRegular ? `
                    <div class="p-8 md:p-12 text-center">
                        <div class="inline-flex items-center justify-center w-16 h-16 bg-yellow-100 rounded-full mb-4">
                            <ion-icon name="lock-closed" class="text-3xl text-yellow-600"></ion-icon>
                        </div>
                        <h3 class="text-xl font-bold text-gray-900 mb-2">Materi Terkunci</h3>
                        <p class="text-gray-600 mb-4 max-w-md mx-auto">
                            Materi Pekan ${this.currentWeek} akan dibuka sesuai timeline program.
                        </p>
                        <button class="switch-week-btn bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition font-medium"
                                data-week="${this.unlockedWeekForRegular}">
                            Kembali ke Pekan ${this.unlockedWeekForRegular}
                        </button>
                    </div>
                    ` : `
                    <div class="p-4 md:p-6">
                        <div class="mb-6 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-4 md:p-6 border border-blue-200">
                            <div class="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                                <div>
                                    <h2 class="text-xl md:text-2xl font-bold text-gray-900">${currentWeekData.title}</h2>
                                    <p class="text-gray-600 mt-1">${totalCount} e-course tersedia</p>
                                    ${this.currentWeek === 4 ? `
                                    <div class="flex items-center space-x-2 mt-2">
                                        <span class="text-sm text-gray-500">Personalized learning path</span>
                                        <button class="edit-selections-btn text-sm text-blue-600 hover:text-blue-800 font-medium">
                                            ✏️ Pilih/Edit Course
                                        </button>
                                    </div>
                                    ` : ''}
                                </div>
                                <div class="bg-white rounded-full px-4 py-2 border border-blue-200">
                                    <span class="text-blue-700 font-medium text-sm">
                                        ${completedCount}/${totalCount} selesai
                                    </span>
                                </div>
                            </div>
                        </div>

                        <div class="grid grid-cols-1 lg:grid-cols-4 gap-6 md:gap-8">
                            <div class="lg:col-span-1">
                                <div class="bg-gray-50 rounded-xl p-4 border border-gray-200">
                                    <h3 class="font-semibold text-gray-800 mb-3">Daftar E-Course</h3>
                                    <div class="space-y-2 max-h-96 overflow-y-auto">
                                        ${materialsToRender.map((course, index) => {
                                            const isCompleted = weekProgress[course.title] || false;
                                            const isActive = index === this.currentCourseIndex;
                                            const displayNumber = this.currentWeek === 4 ? course.index : index + 1;
                                            
                                            return `
                                            <button class="course-item w-full text-left p-3 rounded-lg transition ${
                                                isActive ? 'bg-blue-100 border border-blue-300 text-blue-700' : 'bg-white border border-gray-200 hover:bg-gray-50 text-gray-700'
                                            } ${isCompleted ? 'border-green-200' : ''}"
                                                    data-course-index="${index}">
                                                <div class="flex items-center space-x-3">
                                                    <div class="w-8 h-8 rounded-full flex items-center justify-center ${
                                                        isCompleted ? 'bg-green-500 text-white' : 
                                                        isActive ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-600'
                                                    }">
                                                        ${isCompleted ? '✓' : displayNumber}
                                                    </div>
                                                    <div class="flex-1 min-w-0">
                                                        <div class="font-medium text-sm truncate">${course.title}</div>
                                                        <div class="text-xs text-gray-500 mt-1">
                                                            ${course.videos.length} video
                                                        </div>
                                                    </div>
                                                </div>
                                            </button>`;
                                        }).join('')}
                                    </div>
                                </div>
                            </div>

                            <div class="lg:col-span-3">
                                <div>
                                    ${this.renderCourseContent(materialsToRender[this.currentCourseIndex], weekProgress, materialsToRender.length)}
                                </div>
                            </div>
                        </div>
                    </div>
                    `}
                </div>
            </div>
        `;
    }

    static renderCourseContent(course, weekProgress, totalMaterialsCount) {
        if (!course) {
            return `<div class="p-8 text-center"><p class="text-gray-500">Tidak ada course yang tersedia</p></div>`;
        }

        const isCompleted = weekProgress[course.title] || false;
        const currentVideo = course.videos[this.currentVideoIndex];

        return `
            <div class="bg-white border border-gray-200 rounded-xl overflow-hidden">
                <div class="border-b border-gray-200 p-4 md:p-6">
                    <div class="flex justify-between items-start">
                        <div>
                            <h3 class="text-lg md:text-xl font-bold text-gray-900 mb-2">${course.title}</h3>
                            <p class="text-gray-600 text-sm">${course.description}</p>
                        </div>
                        ${isCompleted ? `
                            <span class="inline-flex items-center space-x-1 bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                                <ion-icon name="checkmark-circle"></ion-icon>
                                <span>Selesai</span>
                            </span>
                        ` : ''}
                    </div>
                </div>

                <div class="bg-black">
                    <div class="video-wrapper-large">
                        <iframe src="${currentVideo.url}" 
                                frameborder="0" 
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                                allowfullscreen>
                        </iframe>
                    </div>
                </div>
                
                <div class="p-4 md:p-6 border-b border-gray-200">
                    <h3 class="text-lg md:text-xl font-bold text-gray-900 mb-2">${currentVideo.title}</h3>
                    <p class="text-gray-600 mb-4">Video ${this.currentVideoIndex + 1} dari ${course.videos.length}</p>
                    
                    <div class="flex gap-3">
                        <button class="video-nav-prev flex-1 bg-gray-600 text-white py-2 px-4 rounded-lg hover:bg-gray-700 transition font-medium disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center"
                                ${this.currentVideoIndex === 0 ? 'disabled' : ''}>
                            <ion-icon name="chevron-back-outline" class="mr-2"></ion-icon>
                            Video Sebelumnya
                        </button>
                        <button class="video-nav-next flex-1 bg-gray-600 text-white py-2 px-4 rounded-lg hover:bg-gray-700 transition font-medium disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center"
                                ${this.currentVideoIndex === course.videos.length - 1 ? 'disabled' : ''}>
                            Video Selanjutnya
                            <ion-icon name="chevron-forward-outline" class="ml-2"></ion-icon>
                        </button>
                    </div>
                </div>

                <div class="border-b border-gray-200 p-4 md:p-6 bg-blue-50">
                    <h4 class="font-semibold text-blue-800 mb-3">Materi Pendukung</h4>
                    <p class="text-blue-700 mb-4 text-sm">${course.description}</p>
                    <div class="flex flex-col sm:flex-row gap-3">
                        ${course.download.materi !== '#' ? `
                            <a href="${course.download.materi}" target="_blank" 
                               class="inline-flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition font-medium text-sm">
                                <ion-icon name="document-text-outline"></ion-icon>
                                <span>Download Materi</span>
                            </a>
                        ` : ''}
                        ${course.download.notulensi !== '#' ? `
                            <a href="${course.download.notulensi}" target="_blank" 
                               class="inline-flex items-center space-x-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition font-medium text-sm">
                                <ion-icon name="clipboard-outline"></ion-icon>
                                <span>Download Notulensi</span>
                            </a>
                        ` : ''}
                    </div>
                </div>

                <div class="p-4 md:p-6">
                    <div class="flex flex-col sm:flex-row gap-3">
                        <button class="course-nav-prev flex-1 bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition font-medium disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center"
                                ${this.currentCourseIndex === 0 ? 'disabled' : ''}>
                            <ion-icon name="chevron-back-outline" class="mr-2"></ion-icon>
                            Course Sebelumnya
                        </button>
                        
                        <button class="mark-complete flex-1 bg-green-600 text-white py-3 px-4 rounded-lg hover:bg-green-700 transition font-medium flex items-center justify-center"
                                data-course-title="${course.title}">
                            <ion-icon name="checkmark-circle-outline" class="mr-2"></ion-icon>
                            ${isCompleted ? '✓ Sudah Selesai' : 'Tandai Selesai Course'}
                        </button>
                        
                        <button class="course-nav-next flex-1 bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition font-medium disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center"
                                ${this.currentCourseIndex === (totalMaterialsCount - 1) ? 'disabled' : ''}>
                            Course Selanjutnya
                            <ion-icon name="chevron-forward-outline" class="ml-2"></ion-icon>
                        </button>
                    </div>
                </div>
            </div>
        `;
    }

    static async markAsComplete() {
        try {
            if (!this.isWhitelisted && this.currentWeek > this.unlockedWeekForRegular) {
                this.showNotification('Tidak dapat menandai course di minggu terkunci', 'error');
                return;
            }

            const currentUserStr = localStorage.getItem('currentUser');
            let materials = this.getCurrentWeekData().materials;
            
            if (this.currentWeek === 4 && currentUserStr) {
                try {
                    const currentUser = JSON.parse(currentUserStr);
                    materials = await this.getFilteredWeek4Courses(currentUser.email);
                } catch (e) {}
            }
            
            const currentCourse = materials[this.currentCourseIndex];
            
            await this.auth.recordCourseCompletion(
                parseInt(this.currentWeek), 
                currentCourse.title
            );
            
            this.showNotification(`"${currentCourse.title}" berhasil ditandai selesai!`, 'success');
            await this.rerenderCourseContent();
            
        } catch (error) {
            console.error('Error marking as complete:', error);
            this.showNotification('Gagal menandai course: ' + error.message, 'error');
        }
    }

    static async rerenderCourseContent() {
        const currentUserStr = localStorage.getItem('currentUser');
        let materialsToRender = this.getCurrentWeekData().materials;
        
        if (this.currentWeek === 4 && currentUserStr) {
            try {
                const currentUser = JSON.parse(currentUserStr);
                materialsToRender = await this.getFilteredWeek4Courses(currentUser.email);
            } catch (e) {}
        }
        
        const progress = await this.auth.getCourseProgress();
        const weekProgress = progress[this.currentWeek] || {};
        const course = materialsToRender[this.currentCourseIndex];

        const container = document.querySelector('.lg\\:col-span-3 > div');
        if (container) {
            container.innerHTML = this.renderCourseContent(course, weekProgress, materialsToRender.length);
        }

        this.updateCourseList();
    }

    static updateCourseList() {
        const courseItems = document.querySelectorAll('.course-item');
        courseItems.forEach((item, index) => {
            item.classList.remove('bg-blue-100', 'border-blue-300', 'text-blue-700');
            item.classList.add('bg-white', 'border-gray-200', 'text-gray-700');
            
            if (index === this.currentCourseIndex) {
                item.classList.remove('bg-white', 'border-gray-200', 'text-gray-700');
                item.classList.add('bg-blue-100', 'border-blue-300', 'text-blue-700');
            }
            
            const indicator = item.querySelector('.w-8');
            if (indicator) {
                const isCompleted = item.classList.contains('border-green-200');
                
                if (isCompleted) {
                    indicator.className = 'w-8 h-8 rounded-full flex items-center justify-center bg-green-500 text-white';
                    indicator.innerHTML = '✓';
                } else if (index === this.currentCourseIndex) {
                    indicator.className = 'w-8 h-8 rounded-full flex items-center justify-center bg-blue-500 text-white';
                    indicator.innerHTML = indicator.textContent;
                } else {
                    indicator.className = 'w-8 h-8 rounded-full flex items-center justify-center bg-gray-200 text-gray-600';
                    indicator.innerHTML = indicator.textContent;
                }
            }
        });
    }

    static getCurrentWeekData() {
        const weekData = getWeekData();
        return weekData[this.currentWeek];
    }

    static showNotification(message, type = 'info') {
        // Hapus notifikasi lama
        document.querySelectorAll('.notification').forEach(el => el.remove());
        
        const notification = document.createElement('div');
        notification.className = `notification fixed top-4 right-4 p-4 rounded-lg shadow-lg z-50 ${
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

    static setUnlockedWeekForRegular(newWeek) {
        this.unlockedWeekForRegular = newWeek;
        this.showNotification(`Pekan 1-${newWeek} sekarang terbuka untuk regular user`, 'info');
    }
}

const style = document.createElement('style');
style.textContent = `
    .video-wrapper-large {
        position: relative;
        width: 100%;
        height: 0;
        padding-bottom: 56.25%;
    }
    
    .video-wrapper-large iframe {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
    }
    
    .course-option:hover {
        transform: translateY(-1px);
        transition: transform 0.2s;
    }
    
    .modal-save-btn:hover {
        transform: translateY(-1px);
        box-shadow: 0 4px 12px rgba(37, 99, 235, 0.3);
    }
`;
document.head.appendChild(style);

export default Materi;
