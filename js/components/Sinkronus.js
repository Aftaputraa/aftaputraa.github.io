import { sessionAttendanceService } from '../config/supabase.js';

class Sinkronus {
    static currentTab = 'onboarding';
    static currentVideoIndex = 0;
    static isInitialized = false;

    static async render() {
        // Untuk angkatan 2, tampilkan halaman "Coming Soon"
        return `
            <div class="max-w-6xl mx-auto">
                <div class="bg-white shadow-lg rounded-xl md:rounded-2xl overflow-hidden">
                    <div class="p-4 md:p-6 border-b border-gray-200">
                        <h1 class="text-lg md:text-xl lg:text-2xl font-bold text-gray-900">Rekaman Sesi Sinkronus</h1>
                        <p class="text-gray-600 mt-1 text-sm md:text-base">Rekaman sesi live dan coaching clinic</p>
                    </div>
                    
                    <div class="p-8 md:p-12 text-center">
                        <div class="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
                            <ion-icon name="time-outline" class="text-3xl text-blue-600"></ion-icon>
                        </div>
                        <h3 class="text-xl font-bold text-gray-900 mb-2">Coming Soon</h3>
                        <p class="text-gray-600 mb-4 max-w-md mx-auto">
                            Sesi sinkronus untuk Kampus Riset Angkatan 2 akan segera hadir. 
                            Jadwal dan rekaman sesi akan tersedia sesuai timeline program.
                        </p>
                        <p class="text-blue-600 font-medium">
                            Stay tuned untuk informasi lebih lanjut!
                        </p>
                    </div>
                </div>
            </div>
        `;
    }

    static async init() {
        // Tidak ada inisialisasi event karena halaman coming soon
        const content = await this.render();
        document.getElementById('content').innerHTML = content;
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