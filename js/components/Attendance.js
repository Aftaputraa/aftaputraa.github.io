import Auth from '../auth.js';

class Attendance {
    static auth = new Auth();

    static async render() {
        if (!this.auth.isAuthenticated()) {
            return '<div class="p-8 text-center text-red-600">Silakan login terlebih dahulu</div>';
        }

        return `
            <div class="max-w-6xl mx-auto">
                <div class="bg-white shadow-lg rounded-xl md:rounded-2xl overflow-hidden">
                    <div class="p-4 md:p-6 border-b border-gray-200">
                        <h1 class="text-lg md:text-xl lg:text-2xl font-bold text-gray-900">Presensi & Progress</h1>
                        <p class="text-gray-600 mt-1 text-sm md:text-base">Angkatan 3</p>
                    </div>
                    
                    <div class="p-12 md:p-20 text-center">
                        <div class="text-blue-600 mb-4">
                            <ion-icon name="construct-outline" style="font-size: 4rem;"></ion-icon>
                        </div>
                        <h2 class="text-xl md:text-2xl font-semibold text-gray-800">Segera</h2>
                        <p class="text-gray-500 mt-2">Fitur presensi menyusul</p>
                    </div>
                </div>
            </div>
        `;
    }

    static async init() {
        const content = await this.render();
        const contentElement = document.getElementById('content');
        if (contentElement) {
            contentElement.innerHTML = content;
        }
    }
}

export default Attendance;
