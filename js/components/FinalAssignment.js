// js/components/FinalAssignment.js

class FinalAssignment {
    static async render() {
        return `
            <div class="max-w-7xl mx-auto">
                <div class="bg-white shadow-lg rounded-xl md:rounded-2xl overflow-hidden">
                    <div class="p-4 md:p-6 border-b border-gray-200">
                        <h1 class="text-lg md:text-xl lg:text-2xl font-bold text-gray-900">Daftar Jurnal Ilmiah</h1>
                        <p class="text-gray-600 mt-1 text-sm md:text-base">Referensi jurnal untuk publikasi penelitian</p>
                    </div>
                    

                        <!-- Journals Content -->
                        <div class="space-y-10 md:space-y-12">
                            <!-- Info -->
                            <div class="bg-blue-50 rounded-xl p-4 md:p-6 border border-blue-200">
                                <div class="flex items-start space-x-3">
                                    <div class="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center flex-shrink-0">
                                        <ion-icon name="information-circle-outline" class="text-blue-600"></ion-icon>
                                    </div>
                                    <div>
                                        <h3 class="font-semibold text-blue-800 text-lg md:text-xl mb-2">Panduan Penggunaan</h3>
                                        <p class="text-blue-700 text-sm md:text-base">
                                            Daftar jurnal ini berisi referensi untuk publikasi penelitian Anda. Silakan download file Excel untuk melihat daftar lengkap dan filter berdasarkan kriteria yang Anda butuhkan.
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <!-- Scopus Journals -->
                            <div class="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300">
                                <div class="bg-gradient-to-r from-purple-700 to-indigo-700 p-4 md:p-6">
                                    <div class="flex flex-col md:flex-row md:items-center justify-between gap-4">
                                        <div class="flex-1">
                                            <h2 class="text-xl md:text-2xl font-bold text-white mb-2">Jurnal Scopus Q1-Q4</h2>
                                            <p class="text-purple-100">Daftar lengkap jurnal terindeks Scopus dari Quartile 1 hingga Quartile 4</p>
                                        </div>
                                        <a href="https://hcelerate.id/wp-content/uploads/2026/01/V1_DAFTAR-JURNAL-ILMIAH-SCOPUS-Q1-Q4.xlsx" 
                                           download="DAFTAR-JURNAL-SCOPUS-Q1-Q4.xlsx"
                                           class="inline-flex items-center justify-center space-x-2 bg-white text-purple-700 hover:bg-purple-50 font-semibold py-3 px-4 md:px-6 rounded-lg transition duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">
                                            <ion-icon name="download-outline" class="text-lg"></ion-icon>
                                            <span>Download Excel Lengkap</span>
                                        </a>
                                    </div>
                                    <div class="mt-3 flex items-center text-purple-200 text-sm">
                                        <ion-icon name="stats-chart" class="mr-2"></ion-icon>
                                        <span>200+ jurnal • Update Oktober 2025 • Semua Quartile</span>
                                    </div>
                                </div>
                                
                                <div class="p-4 md:p-6">
                                    <!-- Header Preview -->
                                    <div class="mb-4 flex items-center justify-between">
                                        <h3 class="font-semibold text-gray-800 text-lg">Preview Data (3 dari 200+ jurnal)</h3>
                                        <span class="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">Semua kolom ditampilkan</span>
                                    </div>
                                    
                                    <!-- Preview Table Full Columns -->
                                    <div class="mb-6 overflow-x-auto rounded-lg border border-gray-200 shadow-sm">
                                        <table class="min-w-full divide-y divide-gray-200 text-xs md:text-sm">
                                            <thead class="bg-gray-50">
                                                <tr>
                                                    <th class="px-3 py-3 text-left font-semibold text-gray-700 bg-purple-50 whitespace-nowrap border-r border-gray-200">NO.</th>
                                                    <th class="px-3 py-3 text-left font-semibold text-gray-700 bg-purple-50 whitespace-nowrap border-r border-gray-200">NAMA JURNAL</th>
                                                    <th class="px-3 py-3 text-left font-semibold text-gray-700 bg-purple-50 whitespace-nowrap border-r border-gray-200">BIDANG</th>
                                                    <th class="px-3 py-3 text-left font-semibold text-gray-700 bg-purple-50 whitespace-nowrap border-r border-gray-200">SCOPE</th>
                                                    <th class="px-3 py-3 text-left font-semibold text-gray-700 bg-purple-50 whitespace-nowrap border-r border-gray-200">NAMA PENERBIT</th>
                                                    <th class="px-3 py-3 text-left font-semibold text-gray-700 bg-purple-50 whitespace-nowrap border-r border-gray-200">INDEKS</th>
                                                    <th class="px-3 py-3 text-left font-semibold text-gray-700 bg-purple-50 whitespace-nowrap border-r border-gray-200">WAKTU TERBIT</th>
                                                    <th class="px-3 py-3 text-left font-semibold text-gray-700 bg-purple-50 whitespace-nowrap border-r border-gray-200">BIAYA</th>
                                                    <th class="px-3 py-3 text-left font-semibold text-gray-700 bg-purple-50 whitespace-nowrap border-r border-gray-200">CATATAN</th>
                                                    <th class="px-3 py-3 text-left font-semibold text-gray-700 bg-purple-50 whitespace-nowrap border-r border-gray-200">WEBSITE</th>
                                                    <th class="px-3 py-3 text-left font-semibold text-gray-700 bg-purple-50 whitespace-nowrap">SCIMAGO JR</th>
                                                </tr>
                                            </thead>
                                            <tbody class="divide-y divide-gray-200 bg-white">
                                                <!-- Row 1 -->
                                                <tr class="hover:bg-gray-50">
                                                    <td class="px-3 py-3 text-gray-600 whitespace-nowrap border-r border-gray-100 font-medium">1</td>
                                                    <td class="px-3 py-3 text-gray-800 font-semibold border-r border-gray-100">Acta Historica Tallinnensia</td>
                                                    <td class="px-3 py-3 text-gray-600 border-r border-gray-100">Arts and Humanities</td>
                                                    <td class="px-3 py-3 text-gray-600 border-r border-gray-100">History of the Eastern Europe, of the Baltic Sea region and of the Baltic States</td>
                                                    <td class="px-3 py-3 text-gray-600 border-r border-gray-100">"Estonian Academy Publishers"</td>
                                                    <td class="px-3 py-3 border-r border-gray-100">
                                                        <span class="inline-flex items-center px-2 py-1 rounded-full text-xs font-semibold bg-blue-100 text-blue-800">SCOPUS Q4</span>
                                                    </td>
                                                    <td class="px-3 py-3 text-gray-600 border-r border-gray-100">Biannual/ Semi-annual</td>
                                                    <td class="px-3 py-3 text-gray-600 border-r border-gray-100">
                                                        <span class="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-green-100 text-green-800">
                                                            $0.00
                                                        </span>
                                                    </td>
                                                    <td class="px-3 py-3 text-gray-500 border-r border-gray-100 italic">-</td>
                                                    <td class="px-3 py-3 border-r border-gray-100">
                                                        <a href="https://kirj.ee/acta-editorial-policy/?v=b718adec73e0" 
                                                           target="_blank"
                                                           class="text-blue-600 hover:text-blue-800 hover:underline flex items-center">
                                                            <ion-icon name="link-outline" class="mr-1 text-xs"></ion-icon>
                                                            <span class="truncate max-w-[120px]">Visit Website</span>
                                                        </a>
                                                    </td>
                                                    <td class="px-3 py-3">
                                                        <a href="https://www.scimagojr.com/journalsearch.php?q=19400156801&tip=sid" 
                                                           target="_blank"
                                                           class="text-purple-600 hover:text-purple-800 hover:underline flex items-center">
                                                            <ion-icon name="bar-chart-outline" class="mr-1 text-xs"></ion-icon>
                                                            <span class="truncate max-w-[120px]">SCIMAGO</span>
                                                        </a>
                                                    </td>
                                                </tr>
                                                
                                                <!-- Row 2 -->
                                                <tr class="hover:bg-gray-50 bg-gray-50">
                                                    <td class="px-3 py-3 text-gray-600 whitespace-nowrap border-r border-gray-100 font-medium">2</td>
                                                    <td class="px-3 py-3 text-gray-800 font-semibold border-r border-gray-100">Acta IMEKO</td>
                                                    <td class="px-3 py-3 text-gray-600 border-r border-gray-100">Science and Engineering</td>
                                                    <td class="px-3 py-3 text-gray-600 border-r border-gray-100">The main goal of this journal is the enhancement of academic activities of IMEKO and a wider dissemination of scientific output from IMEKO TC events.</td>
                                                    <td class="px-3 py-3 text-gray-600 border-r border-gray-100">International Measurement Confederation (IMEKO)</td>
                                                    <td class="px-3 py-3 border-r border-gray-100">
                                                        <span class="inline-flex items-center px-2 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-800">SCOPUS Q3</span>
                                                    </td>
                                                    <td class="px-3 py-3 text-gray-600 border-r border-gray-100">Quarterly</td>
                                                    <td class="px-3 py-3 text-gray-600 border-r border-gray-100">
                                                        <span class="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-green-100 text-green-800">
                                                            $0.00
                                                        </span>
                                                    </td>
                                                    <td class="px-3 py-3 text-gray-500 border-r border-gray-100 italic">-</td>
                                                    <td class="px-3 py-3 border-r border-gray-100">
                                                        <a href="https://acta.imeko.org/index.php/acta-imeko/about" 
                                                           target="_blank"
                                                           class="text-blue-600 hover:text-blue-800 hover:underline flex items-center">
                                                            <ion-icon name="link-outline" class="mr-1 text-xs"></ion-icon>
                                                            <span class="truncate max-w-[120px]">Visit Website</span>
                                                        </a>
                                                    </td>
                                                    <td class="px-3 py-3">
                                                        <a href="https://www.scimagojr.com/journalsearch.php?q=21100407601&tip=sid" 
                                                           target="_blank"
                                                           class="text-purple-600 hover:text-purple-800 hover:underline flex items-center">
                                                            <ion-icon name="bar-chart-outline" class="mr-1 text-xs"></ion-icon>
                                                            <span class="truncate max-w-[120px]">SCIMAGO</span>
                                                        </a>
                                                    </td>
                                                </tr>
                                                
                                                <!-- Row 3 -->
                                                <tr class="hover:bg-gray-50">
                                                    <td class="px-3 py-3 text-gray-600 whitespace-nowrap border-r border-gray-100 font-medium">3</td>
                                                    <td class="px-3 py-3 text-gray-800 font-semibold border-r border-gray-100">Advances in Aerodynamics (AIA)</td>
                                                    <td class="px-3 py-3 text-gray-600 border-r border-gray-100">Science and Engineering</td>
                                                    <td class="px-3 py-3 text-gray-600 border-r border-gray-100">Scientific and technological advances in aerodynamics from the aspects of academic research, industrial development, and engineering applications</td>
                                                    <td class="px-3 py-3 text-gray-600 border-r border-gray-100">Springer Nature</td>
                                                    <td class="px-3 py-3 border-r border-gray-100">
                                                        <span class="inline-flex items-center px-2 py-1 rounded-full text-xs font-semibold bg-purple-100 text-purple-800">SCOPUS Q1</span>
                                                    </td>
                                                    <td class="px-3 py-3 text-gray-600 border-r border-gray-100">Annual (Desember)</td>
                                                    <td class="px-3 py-3 text-gray-600 border-r border-gray-100">
                                                        <span class="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-green-100 text-green-800">
                                                            $0.00
                                                        </span>
                                                    </td>
                                                    <td class="px-3 py-3 text-gray-500 border-r border-gray-100 italic">-</td>
                                                    <td class="px-3 py-3 border-r border-gray-100">
                                                        <a href="https://aia.springeropen.com/submission-guidelines/fees-and-funding" 
                                                           target="_blank"
                                                           class="text-blue-600 hover:text-blue-800 hover:underline flex items-center">
                                                            <ion-icon name="link-outline" class="mr-1 text-xs"></ion-icon>
                                                            <span class="truncate max-w-[120px]">Visit Website</span>
                                                        </a>
                                                    </td>
                                                    <td class="px-3 py-3">
                                                        <a href="https://www.scimagojr.com/journalsearch.php?q=21101060204&tip=sid&clean=0" 
                                                           target="_blank"
                                                           class="text-purple-600 hover:text-purple-800 hover:underline flex items-center">
                                                            <ion-icon name="bar-chart-outline" class="mr-1 text-xs"></ion-icon>
                                                            <span class="truncate max-w-[120px]">SCIMAGO</span>
                                                        </a>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                    
                                    <!-- Note -->
                                    <div class="bg-gradient-to-r from-purple-50 to-indigo-50 rounded-lg p-4 border border-purple-200">
                                        <div class="flex items-start">
                                            <div class="flex-shrink-0 mt-0.5">
                                                <ion-icon name="alert-circle-outline" class="text-purple-600"></ion-icon>
                                            </div>
                                            <div class="ml-3">
                                                <p class="text-purple-700 text-sm">
                                                    <span class="font-semibold">Data Lengkap:</span> Preview di atas menampilkan 3 jurnal dari total 200+ jurnal Scopus. 
                                                    Download file Excel untuk mengakses seluruh data termasuk filter, sorting, dan analisis lengkap.
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <!-- Sinta Journals -->
                            <div class="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300">
                                <div class="bg-gradient-to-r from-emerald-700 to-green-700 p-4 md:p-6">
                                    <div class="flex flex-col md:flex-row md:items-center justify-between gap-4">
                                        <div class="flex-1">
                                            <h2 class="text-xl md:text-2xl font-bold text-white mb-2">Jurnal SINTA 1-6</h2>
                                            <p class="text-emerald-100">Daftar lengkap jurnal terakreditasi SINTA dari peringkat 1 hingga 6</p>
                                        </div>
                                        <a href="https://hcelerate.id/wp-content/uploads/2026/01/V1_DAFTAR-JURNAL-ILMIAH-SINTA-1-6.xlsx" 
                                           download="DAFTAR-JURNAL-SINTA-1-6.xlsx"
                                           class="inline-flex items-center justify-center space-x-2 bg-white text-emerald-700 hover:bg-emerald-50 font-semibold py-3 px-4 md:px-6 rounded-lg transition duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">
                                            <ion-icon name="download-outline" class="text-lg"></ion-icon>
                                            <span>Download Excel Lengkap</span>
                                        </a>
                                    </div>
                                    <div class="mt-3 flex items-center text-emerald-200 text-sm">
                                        <ion-icon name="school" class="mr-2"></ion-icon>
                                        <span>150+ jurnal • Update Juli 2025 • SINTA 1-6</span>
                                    </div>
                                </div>
                                
                                <div class="p-4 md:p-6">
                                    <!-- Header Preview -->
                                    <div class="mb-4 flex items-center justify-between">
                                        <h3 class="font-semibold text-gray-800 text-lg">Preview Data (3 dari 150+ jurnal)</h3>
                                        <span class="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">Semua kolom ditampilkan</span>
                                    </div>
                                    
                                    <!-- Preview Table Full Columns -->
                                    <div class="mb-6 overflow-x-auto rounded-lg border border-gray-200 shadow-sm">
                                        <table class="min-w-full divide-y divide-gray-200 text-xs md:text-sm">
                                            <thead class="bg-gray-50">
                                                <tr>
                                                    <th class="px-3 py-3 text-left font-semibold text-gray-700 bg-emerald-50 whitespace-nowrap border-r border-gray-200">NO.</th>
                                                    <th class="px-3 py-3 text-left font-semibold text-gray-700 bg-emerald-50 whitespace-nowrap border-r border-gray-200">NAMA JURNAL</th>
                                                    <th class="px-3 py-3 text-left font-semibold text-gray-700 bg-emerald-50 whitespace-nowrap border-r border-gray-200">BIDANG</th>
                                                    <th class="px-3 py-3 text-left font-semibold text-gray-700 bg-emerald-50 whitespace-nowrap border-r border-gray-200">FOKUS</th>
                                                    <th class="px-3 py-3 text-left font-semibold text-gray-700 bg-emerald-50 whitespace-nowrap border-r border-gray-200">AKREDITASI/INDEKS</th>
                                                    <th class="px-3 py-3 text-left font-semibold text-gray-700 bg-emerald-50 whitespace-nowrap border-r border-gray-200">NAMA PENERBIT</th>
                                                    <th class="px-3 py-3 text-left font-semibold text-gray-700 bg-emerald-50 whitespace-nowrap border-r border-gray-200">HADIAH</th>
                                                    <th class="px-3 py-3 text-left font-semibold text-gray-700 bg-emerald-50 whitespace-nowrap border-r border-gray-200">BIAYA PUBLIKASI</th>
                                                    <th class="px-3 py-3 text-left font-semibold text-gray-700 bg-emerald-50 whitespace-nowrap border-r border-gray-200">WAKTU TERBIT</th>
                                                    <th class="px-3 py-3 text-left font-semibold text-gray-700 bg-emerald-50 whitespace-nowrap">WEBSITE/OJS</th>
                                                </tr>
                                            </thead>
                                            <tbody class="divide-y divide-gray-200 bg-white">
                                                <!-- Row 1 -->
                                                <tr class="hover:bg-gray-50">
                                                    <td class="px-3 py-3 text-gray-600 whitespace-nowrap border-r border-gray-100 font-medium">1</td>
                                                    <td class="px-3 py-3 text-gray-800 font-semibold border-r border-gray-100">Aksara</td>
                                                    <td class="px-3 py-3 text-gray-600 border-r border-gray-100">Humaniora, Pendidikan</td>
                                                    <td class="px-3 py-3 text-gray-600 border-r border-gray-100">Linguistic, applied linguistic, interdisciplinary linguistic studies, theoretical literary studies, interdisciplinary literary studies, literature and identity politics, philology, and oral tradition</td>
                                                    <td class="px-3 py-3 border-r border-gray-100">
                                                        <span class="inline-flex items-center px-2 py-1 rounded-full text-xs font-semibold bg-orange-100 text-orange-800">SINTA 2</span>
                                                    </td>
                                                    <td class="px-3 py-3 text-gray-600 border-r border-gray-100">Balai Bahasa Bali, Badan Pengembangan dan Pembinaan Bahasa, Kementerian Pendidikan dan Kebudayaan</td>
                                                    <td class="px-3 py-3 text-gray-600 border-r border-gray-100">
                                                        <span class="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-100 text-blue-800">
                                                            Rp0.00
                                                        </span>
                                                    </td>
                                                    <td class="px-3 py-3 text-gray-600 border-r border-gray-100">
                                                        <span class="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-green-100 text-green-800">
                                                            Rp0.00
                                                        </span>
                                                    </td>
                                                    <td class="px-3 py-3 text-gray-600 border-r border-gray-100">Juni dan Desember</td>
                                                    <td class="px-3 py-3">
                                                        <a href="https://aksara.kemdikbud.go.id/index.php/aksara/index" 
                                                           target="_blank"
                                                           class="text-emerald-600 hover:text-emerald-800 hover:underline flex items-center">
                                                            <ion-icon name="link-outline" class="mr-1 text-xs"></ion-icon>
                                                            <span class="truncate max-w-[120px]">Visit OJS</span>
                                                        </a>
                                                    </td>
                                                </tr>
                                                
                                                <!-- Row 2 -->
                                                <tr class="hover:bg-gray-50 bg-gray-50">
                                                    <td class="px-3 py-3 text-gray-600 whitespace-nowrap border-r border-gray-100 font-medium">2</td>
                                                    <td class="px-3 py-3 text-gray-800 font-semibold border-r border-gray-100">Al-Qalam</td>
                                                    <td class="px-3 py-3 text-gray-600 border-r border-gray-100">Humaniora, Keagamaan</td>
                                                    <td class="px-3 py-3 text-gray-600 border-r border-gray-100">Religious Communities and Religious Services, Religious Education as well as Religious Matters, Contemporary religious script, socio-religious history, religious archeology, Archipelago Religious Arts and Culture</td>
                                                    <td class="px-3 py-3 border-r border-gray-100">
                                                        <span class="inline-flex items-center px-2 py-1 rounded-full text-xs font-semibold bg-orange-100 text-orange-800">SINTA 2</span>
                                                    </td>
                                                    <td class="px-3 py-3 text-gray-600 border-r border-gray-100">Balai Penelitian dan Pengembangan Agama Makassar</td>
                                                    <td class="px-3 py-3 text-gray-600 border-r border-gray-100">
                                                        <span class="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-100 text-blue-800">
                                                            Rp0.00
                                                        </span>
                                                    </td>
                                                    <td class="px-3 py-3 text-gray-600 border-r border-gray-100">
                                                        <span class="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-green-100 text-green-800">
                                                            Rp0.00
                                                        </span>
                                                    </td>
                                                    <td class="px-3 py-3 text-gray-600 border-r border-gray-100">Juni dan November</td>
                                                    <td class="px-3 py-3">
                                                        <a href="https://www.jurnalalqalam.or.id/index.php/Alqalam/index" 
                                                           target="_blank"
                                                           class="text-emerald-600 hover:text-emerald-800 hover:underline flex items-center">
                                                            <ion-icon name="link-outline" class="mr-1 text-xs"></ion-icon>
                                                            <span class="truncate max-w-[120px]">Visit OJS</span>
                                                        </a>
                                                    </td>
                                                </tr>
                                                
                                                <!-- Row 3 -->
                                                <tr class="hover:bg-gray-50">
                                                    <td class="px-3 py-3 text-gray-600 whitespace-nowrap border-r border-gray-100 font-medium">3</td>
                                                    <td class="px-3 py-3 text-gray-800 font-semibold border-r border-gray-100">Analisa: Journal of Social Science and Religion</td>
                                                    <td class="px-3 py-3 text-gray-600 border-r border-gray-100">Keagamaan, Hukum, Sosial dan Politik, Ekonomi dan Bisnis, Pendidikan, Humaniora</td>
                                                    <td class="px-3 py-3 text-gray-600 border-r border-gray-100">Anthropology of Religion; Religious Studies; Sociology of Religion; Political Religion; Religious Education; Religious Law; and Economics of Religion</td>
                                                    <td class="px-3 py-3 border-r border-gray-100">
                                                        <span class="inline-flex items-center px-2 py-1 rounded-full text-xs font-semibold bg-orange-100 text-orange-800">SINTA 2</span>
                                                    </td>
                                                    <td class="px-3 py-3 text-gray-600 border-r border-gray-100">Balai Penelitian dan Pengembangan Agama Semarang</td>
                                                    <td class="px-3 py-3 text-gray-600 border-r border-gray-100">
                                                        <span class="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-100 text-blue-800">
                                                            Rp0.00
                                                        </span>
                                                    </td>
                                                    <td class="px-3 py-3 text-gray-600 border-r border-gray-100">
                                                        <span class="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-green-100 text-green-800">
                                                            Rp0.00
                                                        </span>
                                                    </td>
                                                    <td class="px-3 py-3 text-gray-600 border-r border-gray-100">Juli dan Desember</td>
                                                    <td class="px-3 py-3">
                                                        <a href="https://journal.blasemarang.id/index.php/analisa" 
                                                           target="_blank"
                                                           class="text-emerald-600 hover:text-emerald-800 hover:underline flex items-center">
                                                            <ion-icon name="link-outline" class="mr-1 text-xs"></ion-icon>
                                                            <span class="truncate max-w-[120px]">Visit OJS</span>
                                                        </a>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                    
                                    <!-- Note -->
                                    <div class="bg-gradient-to-r from-emerald-50 to-green-50 rounded-lg p-4 border border-emerald-200">
                                        <div class="flex items-start">
                                            <div class="flex-shrink-0 mt-0.5">
                                                <ion-icon name="alert-circle-outline" class="text-emerald-600"></ion-icon>
                                            </div>
                                            <div class="ml-3">
                                                <p class="text-emerald-700 text-sm">
                                                    <span class="font-semibold">Data Lengkap:</span> Preview di atas menampilkan 3 jurnal dari total 150+ jurnal SINTA. 
                                                    Download file Excel untuk mengakses seluruh data termasuk filter berdasarkan bidang, akreditasi, dan informasi lengkap lainnya.
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <!-- Download CTA -->
                            <div class="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl p-6 md:p-8 text-center">
                                <div class="max-w-3xl mx-auto">
                                    <h3 class="text-xl md:text-2xl font-bold text-white mb-3">Download Daftar Lengkap Sekarang</h3>
                                    <p class="text-indigo-100 mb-6">Akses seluruh data 350+ jurnal (Scopus + SINTA) dalam format Excel yang siap digunakan untuk analisis dan filter</p>
                                    
                                    <div class="flex flex-col sm:flex-row gap-4 justify-center">
                                        <a href="https://hcelerate.id/wp-content/uploads/2026/01/V1_DAFTAR-JURNAL-ILMIAH-SCOPUS-Q1-Q4.xlsx" 
                                           download="DAFTAR-JURNAL-SCOPUS-Q1-Q4.xlsx"
                                           class="inline-flex items-center justify-center space-x-2 bg-white text-indigo-600 hover:bg-indigo-50 font-bold py-3 px-6 rounded-lg transition duration-200 shadow-lg hover:shadow-xl">
                                            <ion-icon name="download-outline" class="text-lg"></ion-icon>
                                            <span>Download Scopus</span>
                                        </a>
                                        
                                        <a href="https://hcelerate.id/wp-content/uploads/2026/01/V1_DAFTAR-JURNAL-ILMIAH-SINTA-1-6.xlsx" 
                                           download="DAFTAR-JURNAL-SINTA-1-6.xlsx"
                                           class="inline-flex items-center justify-center space-x-2 bg-emerald-500 text-white hover:bg-emerald-600 font-bold py-3 px-6 rounded-lg transition duration-200 shadow-lg hover:shadow-xl">
                                            <ion-icon name="download-outline" class="text-lg"></ion-icon>
                                            <span>Download SINTA</span>
                                        </a>
                                    </div>
                                    
                                    <p class="text-indigo-200 text-sm mt-4">
                                        <ion-icon name="information-circle-outline" class="mr-1"></ion-icon>
                                        File Excel dapat dibuka di Microsoft Excel, Google Sheets, atau software spreadsheet lainnya
                                    </p>
                                </div>
                            </div>

                            <!-- Tips -->
                            <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                <!-- Tips Scopus -->
                                <div class="bg-gradient-to-br from-purple-50 to-white rounded-xl p-5 border border-purple-100 shadow-sm">
                                    <div class="flex items-center mb-4">
                                        <div class="w-10 h-10 rounded-lg bg-purple-100 flex items-center justify-center mr-3">
                                            <ion-icon name="star-outline" class="text-purple-600"></ion-icon>
                                        </div>
                                        <h3 class="font-bold text-purple-800 text-lg">Tips Memilih Jurnal Scopus</h3>
                                    </div>
                                    <ul class="space-y-3">
                                        <li class="flex items-start">
                                            <ion-icon name="checkmark-circle" class="text-green-500 mt-0.5 mr-2 flex-shrink-0"></ion-icon>
                                            <span class="text-gray-700 text-sm">Perhatikan <strong>Quartile (Q1-Q4)</strong> sebagai indikator kualitas dan impact factor</span>
                                        </li>
                                        <li class="flex items-start">
                                            <ion-icon name="checkmark-circle" class="text-green-500 mt-0.5 mr-2 flex-shrink-0"></ion-icon>
                                            <span class="text-gray-700 text-sm">Cek <strong>acceptance rate</strong> dan waktu review di website jurnal</span>
                                        </li>
                                        <li class="flex items-start">
                                            <ion-icon name="checkmark-circle" class="text-green-500 mt-0.5 mr-2 flex-shrink-0"></ion-icon>
                                            <span class="text-gray-700 text-sm">Pastikan scope jurnal sesuai dengan topik penelitian Anda</span>
                                        </li>
                                        <li class="flex items-start">
                                            <ion-icon name="checkmark-circle" class="text-green-500 mt-0.5 mr-2 flex-shrink-0"></ion-icon>
                                            <span class="text-gray-700 text-sm">Perhatikan biaya APC (Article Processing Charge) jika ada</span>
                                        </li>
                                    </ul>
                                </div>
                                
                                <!-- Tips SINTA -->
                                <div class="bg-gradient-to-br from-emerald-50 to-white rounded-xl p-5 border border-emerald-100 shadow-sm">
                                    <div class="flex items-center mb-4">
                                        <div class="w-10 h-10 rounded-lg bg-emerald-100 flex items-center justify-center mr-3">
                                            <ion-icon name="ribbon-outline" class="text-emerald-600"></ion-icon>
                                        </div>
                                        <h3 class="font-bold text-emerald-800 text-lg">Tips Memilih Jurnal SINTA</h3>
                                    </div>
                                    <ul class="space-y-3">
                                        <li class="flex items-start">
                                            <ion-icon name="checkmark-circle" class="text-green-500 mt-0.5 mr-2 flex-shrink-0"></ion-icon>
                                            <span class="text-gray-700 text-sm">Prioritaskan jurnal <strong>SINTA 1 & 2</strong> untuk kualitas terbaik</span>
                                        </li>
                                        <li class="flex items-start">
                                            <ion-icon name="checkmark-circle" class="text-green-500 mt-0.5 mr-2 flex-shrink-0"></ion-icon>
                                            <span class="text-gray-700 text-sm">Cek <strong>akreditasi terbaru</strong> di website sinta.ristekbrin.go.id</span>
                                        </li>
                                        <li class="flex items-start">
                                            <ion-icon name="checkmark-circle" class="text-green-500 mt-0.5 mr-2 flex-shrink-0"></ion-icon>
                                            <span class="text-gray-700 text-sm">Perhatikan <strong>waktu terbit</strong> untuk perencanaan publikasi</span>
                                        </li>
                                        <li class="flex items-start">
                                            <ion-icon name="checkmark-circle" class="text-green-500 mt-0.5 mr-2 flex-shrink-0"></ion-icon>
                                            <span class="text-gray-700 text-sm">Verifikasi di OJS apakah jurnal masih aktif menerima submission</span>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    static async init() {
        // Tambahkan event listener untuk tracking download
        const downloadButtons = document.querySelectorAll('a[download]');
        downloadButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                const fileName = e.target.getAttribute('download') || e.target.href.split('/').pop();
                console.log(`User downloading journal list: ${fileName}`);
                
                // Bisa tambahkan analytics di sini
                // Contoh: trackEvent('journal_download', { file_name: fileName });
            });
        });
        
        // Tambahkan tooltip untuk kolom yang panjang
        const tableCells = document.querySelectorAll('td');
        tableCells.forEach(cell => {
            if (cell.scrollWidth > cell.clientWidth) {
                cell.title = cell.textContent;
            }
        });
    }
}

export default FinalAssignment;