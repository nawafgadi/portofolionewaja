// Navbar scroll effect
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// ========== DARK MODE THEME TOGGLE ==========
const themeToggle = document.getElementById('theme-toggle');
const htmlElement = document.documentElement;

// Load saved theme
const savedTheme = localStorage.getItem('theme') || 'light';
if (savedTheme === 'dark') {
    document.body.classList.add('dark-mode');
    themeToggle.textContent = '☀️';
} else {
    document.body.classList.remove('dark-mode');
    themeToggle.textContent = '🌙';
}

themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    const isDark = document.body.classList.contains('dark-mode');
    themeToggle.textContent = isDark ? '☀️' : '🌙';
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
});

// ========== LANGUAGE TRANSLATIONS ==========
const translations = {
    id: {
        home: 'Beranda',
        work: 'Karya',
        about: 'Tentang',
        contact: 'Kontak',
        subtitle_home: 'Frontend Development',
        title_home: 'Membangun Solusi Digital yang Berdampak',
        description_home: 'Saya Nawaf Gadi AL fatih, siswa Rekayasa Perangkat Lunak (RPL) yang fokus pada pengembangan web dan aplikasi Android, serta memiliki minat dalam bidang IT Support dan problem solving.',
        view_work: 'Lihat Karya',
        get_in_touch: 'Hubungi Saya',
        portfolio: 'PORTFOLIO',
        selected_works: 'Karya & Proyek GitHub',
        works_description: 'Berikut adalah seluruh proyek dan repositori GitHub saya yang disinkronkan secara otomatis. Anda dapat mencari proyek, memfilter berdasarkan kategori teknologi, atau langsung membuka live demo dan kode sumber.',
        filter_all: 'Semua',
        filter_web: 'Web Dev',
        filter_mobile: 'Mobile Apps',
        filter_ai: 'AI & ML',
        filter_game: 'Game 2D',
        filter_design: 'UI/UX Design',
        filter_interactive: 'Interactive & Tools',
        search_placeholder: 'Cari nama project, bahasa, topik...',
        showing_prefix: 'Menampilkan',
        projects_count_label: 'proyek',
        live_demo: 'Live Demo',
        github_repo: 'GitHub Repo',
        figma_design: 'Lihat di Figma',
        no_projects_title: 'Tidak Ada Proyek Ditemukan',
        no_projects_desc: 'Coba gunakan kata kunci pencarian yang lain atau ganti pilihan filter kategori.',
        reset_filter: 'Tampilkan Semua Proyek',
        about_me: 'TENTANG SAYA',
        learn_grow: 'Belajar, Berkembang, dan Menciptakan Solusi yang Bermanfaat',
        about_description: 'Sebagai siswa RPL, saya memiliki passion dalam dunia pemrograman dan pengembangan sistem. Saya percaya bahwa teknologi bukan hanya tentang menulis kode, tetapi tentang menciptakan solusi yang bermanfaat dan efisien. Saya memiliki pengalaman mengerjakan proyek berbasis Laravel, membangun tampilan interaktif dengan HTML, CSS, dan JavaScript, serta mengembangkan aplikasi menggunakan Android Studio. Saya terus meningkatkan kemampuan teknis dan problem solving untuk mencapai cita-cita menjadi Help Desk Support Manager yang profesional.',
        years_experience: 'Tahun Pengalaman',
        projects_completed: 'Proyek Selesai',
        contact_me: 'HUBUNGI SAYA',
        get_in_touch_title: 'Hubungi Saya',
        contact_description: 'Saya terbuka untuk peluang dan kolaborasi baru. Jangan ragu untuk menghubungi jika Anda memiliki pertanyaan!',
        email: 'Email',
        location: 'Lokasi',
        phone: 'Telepon',
        your_name: 'Nama Anda',
        your_email: 'Email Anda',
        your_message: 'Pesan Anda',
        send_message: 'Kirim Pesan',
        view_project: 'Lihat Proyek',
        project_in_github: 'Lihat Proyek di GitHub',
        creating_experiences: 'Menciptakan pengalaman digital yang bermakna.',
        all_rights: '© 2026 Nawaf Gadi Alfatih. Semua hak dilindungi.',
        web_development: 'PENGEMBANGAN WEB',
        ui_ux_design: 'Desain UI/UX',
        placeholder_ask: 'Tanyakan tentang Nawaf...'
    },
    en: {
        home: 'Home',
        work: 'Work',
        about: 'About',
        contact: 'Contact',
        subtitle_home: 'Frontend Development',
        title_home: 'Building Impactful Digital Solutions',
        description_home: 'I am Nawaf Gadi AL fatih, a Software Engineering student (RPL) focused on web and Android application development, with interest in IT Support and problem-solving.',
        view_work: 'View Work',
        get_in_touch: 'Get in Touch',
        portfolio: 'PORTFOLIO',
        selected_works: 'Works & GitHub Projects',
        works_description: 'Here are all my GitHub projects and repositories automatically synced in real time. You can search projects, filter by tech category, or directly open live demos and source code.',
        filter_all: 'All',
        filter_web: 'Web Dev',
        filter_mobile: 'Mobile Apps',
        filter_ai: 'AI & ML',
        filter_game: '2D Game',
        filter_design: 'UI/UX Design',
        filter_interactive: 'Interactive & Tools',
        search_placeholder: 'Search project name, language, topic...',
        showing_prefix: 'Showing',
        projects_count_label: 'projects',
        live_demo: 'Live Demo',
        github_repo: 'GitHub Repo',
        figma_design: 'View in Figma',
        no_projects_title: 'No Projects Found',
        no_projects_desc: 'Try searching with different keywords or switch category filter.',
        reset_filter: 'Show All Projects',
        about_me: 'ABOUT ME',
        learn_grow: 'Learning, Growing, and Creating Beneficial Solutions',
        about_description: 'As an RPL student, I have a passion for programming and system development. I believe that technology is not just about writing code, but about creating useful and efficient solutions. I have experience working on Laravel-based projects, building interactive interfaces with HTML, CSS, and JavaScript, and developing applications using Android Studio. I am continually improving my technical skills and problem-solving abilities to achieve my dream of becoming a professional Help Desk Support Manager who can lead an IT Support team effectively.',
        years_experience: 'Years Experience',
        projects_completed: 'Projects Completed',
        contact_me: 'CONTACT ME',
        get_in_touch_title: 'Get in Touch',
        contact_description: 'I am currently open to new opportunities and collaborations. Feel free to reach out if you have any questions or just want to say hello!',
        email: 'Email',
        location: 'Location',
        phone: 'Phone',
        your_name: 'Your Name',
        your_email: 'Your Email',
        your_message: 'Your Message',
        send_message: 'Send Message',
        view_project: 'View Project',
        project_in_github: 'View Project in github',
        creating_experiences: 'Creating digital experiences that matter.',
        all_rights: '© 2026 Nawaf Gadi Alfatih. All rights reserved.',
        web_development: 'WEB DEVELOPMENT',
        ui_ux_design: 'UI/UX Design',
        placeholder_ask: 'Ask about Nawaf...'
    },
    ar: {
        home: 'الرئيسية',
        work: 'العمل',
        about: 'حول',
        contact: 'تواصل',
        subtitle_home: 'تطوير الواجهة الأمامية',
        title_home: 'بناء حلول رقمية مؤثرة',
        description_home: 'أنا ناوف جاضي الفتيح، طالب هندسة البرمجيات (RPL) أركز على تطوير الويب والتطبيقات الأندرويد، ولدي اهتمام بمجال دعم تكنولوجيا المعلومات وحل المشاكل.',
        view_work: 'عرض الأعمال',
        get_in_touch: 'تواصل معي',
        portfolio: 'المحفظة',
        selected_works: 'الأعمال ومشاريع جيت هاب',
        works_description: 'فيما يلي جميع مشاريعي ومستودعات جيت هاب التي تتم مزامنتها تلقائيًا. يمكنك البحث وتصفية المشاريع حسب الفئة التقنية أو فتح المعاينة المباشرة.',
        filter_all: 'الكل',
        filter_web: 'تطوير الويب',
        filter_mobile: 'تطبيقات الجوال',
        filter_ai: 'الذكاء الاصطناعي',
        filter_game: 'ألعاب ثنائية الأبعاد',
        filter_design: 'تصميم الواجهات',
        filter_interactive: 'أدوات وتفاعلية',
        search_placeholder: 'ابحث عن اسم المشروع، التقنية...',
        showing_prefix: 'عرض',
        projects_count_label: 'مشروع',
        live_demo: 'معاينة حية',
        github_repo: 'جيت هاب',
        figma_design: 'فيغما',
        no_projects_title: 'لم يتم العثور على مشاريع',
        no_projects_desc: 'جرب كلمات بحث أخرى أو اختر فئة مختلفة.',
        reset_filter: 'إظهار جميع المشاريع',
        about_me: 'عني',
        learn_grow: 'التعلم والنمو وإنشاء حلول مفيدة',
        about_description: 'كطالب في قسم الهندسة البرمجية، أملك شغفاً بعالم البرمجة وتطوير الأنظمة. أؤمن بأن التكنولوجيا ليست مجرد كتابة أكواد بل عن إنشاء حلول مفيدة وفعالة. لدي خبرة في العمل على مشاريع Laravel، وبناء واجهات تفاعلية باستخدام HTML و CSS و JavaScript، وتطوير تطبيقات باستخدام Android Studio. أعمل باستمرار على تحسين مهاراتي التقنية وقدرات حل المشاكل.',
        years_experience: 'سنوات من الخبرة',
        projects_completed: 'المشاريع المنجزة',
        contact_me: 'تواصل معي',
        get_in_touch_title: 'تواصل',
        contact_description: 'أنا مفتوح حالياً لفرص جديدة والتعاون. لا تتردد في التواصل معي إذا كان لديك أي أسئلة!',
        email: 'البريد الإلكتروني',
        location: 'الموقع',
        phone: 'الهاتف',
        your_name: 'اسمك',
        your_email: 'بريدك الإلكتروني',
        your_message: 'رسالتك',
        send_message: 'إرسال الرسالة',
        view_project: 'عرض المشروع',
        project_in_github: 'عرض المشروع في جيت هاب',
        creating_experiences: 'إنشاء تجارب رقمية ذات معنى.',
        all_rights: '© 2026 ناوف جاضي الفتيح. جميع الحقوق محفوظة.',
        web_development: 'تطوير الويب',
        ui_ux_design: 'تصميم الواجهة والتجربة',
        placeholder_ask: 'اسأل عن ناوف...'
    },
    zh: {
        home: '主页',
        work: '作品',
        about: '关于',
        contact: '联系',
        subtitle_home: '前端开发',
        title_home: '构建有影响力的数字解决方案',
        description_home: '我是Nawaf Gadi AL fatih，一名软件工程学生(RPL)，专注于Web和Android应用开发，对IT支持和问题解决感兴趣。',
        view_work: '查看作品',
        get_in_touch: '联系我',
        portfolio: '作品集',
        selected_works: '精选作品与GitHub项目',
        works_description: '以下是我所有自动同步的GitHub项目与代码库。您可以按技术分类筛选、实时搜索，或直接打开在线演示与源代码。',
        filter_all: '全部',
        filter_web: 'Web开发',
        filter_mobile: '移动应用',
        filter_ai: '人工智能',
        filter_game: '2D游戏',
        filter_design: 'UI/UX设计',
        filter_interactive: '交互与工具',
        search_placeholder: '搜索项目名称、语言或主题...',
        showing_prefix: '显示',
        projects_count_label: '个项目',
        live_demo: '在线演示',
        github_repo: 'GitHub',
        figma_design: 'Figma设计',
        no_projects_title: '未找到相关项目',
        no_projects_desc: '请尝试其他搜索关键词或切换分类筛选。',
        reset_filter: '显示所有项目',
        about_me: '关于我',
        learn_grow: '学习、成长和创建有用的解决方案',
        about_description: '作为RPL学生，我对编程和系统开发充满热情。我相信技术不仅是写代码，更是创建有用和高效的解决方案。我有使用Laravel进行项目开发的经验，使用HTML、CSS和JavaScript构建交互式界面，以及使用Android Studio开发应用的经验。我不断提高技术技能和解决问题的能力。',
        years_experience: '年工作经验',
        projects_completed: '完成项目数',
        contact_me: '联系我',
        get_in_touch_title: '保持联系',
        contact_description: '我目前开放新机会和合作。如有任何问题，请随时与我联系！',
        email: '电子邮件',
        location: '位置',
        phone: '电话',
        your_name: '你的名字',
        your_email: '你的邮箱',
        your_message: '你的信息',
        send_message: '发送信息',
        view_project: '查看项目',
        project_in_github: '在GitHub查看项目',
        creating_experiences: '创建有意义的数字体验。',
        all_rights: '© 2026 Nawaf Gadi Alfatih。保留所有权利。',
        web_development: '网络开发',
        ui_ux_design: '用户界面/用户体验设计',
        placeholder_ask: '问关于Nawaf的问题...'
    }
};

// ========== LANGUAGE SWITCHING ==========
const langToggle = document.getElementById('lang-toggle');
const langDropdown = document.getElementById('lang-dropdown');
const langMenu = document.getElementById('lang-menu');
const langOptions = document.querySelectorAll('.lang-option');

let currentLang = localStorage.getItem('language') || 'id';
if (langToggle) langToggle.textContent = currentLang.toUpperCase();

document.querySelectorAll('.lang-option').forEach(opt => {
    opt.classList.remove('active');
    if (opt.getAttribute('data-lang') === currentLang) {
        opt.classList.add('active');
    }
});

if (langToggle && langDropdown) {
    langToggle.addEventListener('click', () => {
        langDropdown.classList.toggle('active');
    });

    document.addEventListener('click', (e) => {
        if (!langDropdown.contains(e.target)) {
            langDropdown.classList.remove('active');
        }
    });
}

langOptions.forEach(option => {
    option.addEventListener('click', () => {
        currentLang = option.getAttribute('data-lang');
        localStorage.setItem('language', currentLang);
        
        langOptions.forEach(opt => opt.classList.remove('active'));
        option.classList.add('active');
        if (langToggle) langToggle.textContent = currentLang.toUpperCase();
        
        updateLanguage(currentLang);
        if (langDropdown) langDropdown.classList.remove('active');
    });
});

function updateLanguage(lang) {
    document.querySelectorAll('[data-key]').forEach(element => {
        const key = element.getAttribute('data-key');
        if (key && translations[lang] && translations[lang][key]) {
            element.textContent = translations[lang][key];
        }
    });
    
    document.querySelectorAll('.nav-link').forEach(link => {
        const text = link.getAttribute(`data-${lang}`);
        if (text) {
            link.textContent = text;
        }
    });
    
    document.querySelectorAll('[data-placeholder-key]').forEach(element => {
        const key = element.getAttribute('data-placeholder-key');
        if (key && translations[lang] && translations[lang][key]) {
            element.placeholder = translations[lang][key];
        }
    });

    if (window.renderPortfolioProjects) {
        window.renderPortfolioProjects();
    }
}

// ========== GITHUB PROJECTS AUTOMATION & MANAGER ==========
/**
 * Custom image mapping for repositories.
 * The user can easily add any image file in the project folder and map it here,
 * or simply name the image as <repo-name>.png / <repo-name>.jpg!
 */
const CUSTOM_PROJECT_IMAGES = {
    'web-tiket': 'tiket.png',
    'xipplg4_03_banksampah': 'BANK SAMPAH.png',
    'game_mk2_PAS': 'Gemini_Generated_Image_kmt6ewkmt6ewkmt6.png',
    'APPHP-STORE': 'Luxe mobile.png',
    'idulfitri': 'ucapan idulfitri.png',
    'kasirApp': 'pos.png',
    'pertanian': 'pertanian.png',
    'admin-tiket': 'admin tkiket.png',
    'e-cashier-figma': 'e-cashier.png',
    'bank-awan-figma': 'bankawan.png',
    'pertanian-figma': 'pertanian.png',
    'kartu-tani': 'Gemini_Generated_Image_mu34k6mu34k6mu34.jfif',
    'Plazio_e-commerce': 'Gemini_Generated_Image_7dnzvp7dnzvp7dnz (1).jfif',
    'plazio_e-commerce': 'Gemini_Generated_Image_7dnzvp7dnzvp7dnz (1).jfif',
    'CBPR': 'Gemini_Generated_Image_37gazo37gazo37ga.jfif',
    'cbpr': 'Gemini_Generated_Image_37gazo37gazo37ga.jfif'
};

const GITHUB_USERNAME = 'nawafgadi';
const GITHUB_API_URL = `https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=100`;

// Complete repository dataset with rich metadata (works offline, instant load, live API sync)
const BASE_PROJECTS = [
    {
        id: 'kartu-tani',
        name: 'kartu-tani',
        title: 'Kartu Tani - Smart Agriculture System',
        category: 'web',
        language: 'Python & Django',
        description: 'Sistem digital manajemen kartu tani dan pengawasan alokasi pupuk bersubsidi berbasis Python/Django untuk inisiatif Smart Agriculture.',
        tags: ['Python', 'Django', 'Smart Agriculture', 'Farmer ID', 'Management'],
        image: 'Gemini_Generated_Image_mu34k6mu34k6mu34.jfif',
        liveUrl: null,
        githubUrl: 'https://github.com/nawafgadi/kartu-tani',
        stars: 0,
        forks: 0,
        updated: '2026-08-16'
    },
    {
        id: 'Plazio_e-commerce',
        name: 'Plazio_e-commerce',
        title: 'Plazio E-Commerce Platform',
        category: 'web',
        language: 'JavaScript & PHP',
        description: 'Platform e-commerce modern untuk belanja online, katalog produk terintegrasi, keranjang belanja, checkout, dan manajemen produk.',
        tags: ['E-Commerce', 'Web Dev', 'Online Store', 'Shopping Cart'],
        image: 'Gemini_Generated_Image_7dnzvp7dnzvp7dnz (1).jfif',
        liveUrl: null,
        githubUrl: 'https://github.com/lastfound/Plazio_e-commerce',
        stars: 0,
        forks: 0,
        updated: '2026-08-16'
    },
    {
        id: 'CBPR',
        name: 'CBPR',
        title: 'CBPR - Content-Based Product Recommendation',
        category: 'ai',
        language: 'Python & Flask',
        description: 'Sistem rekomendasi produk cerdas berbasis konten (Content-Based) menggunakan Natural Language Processing (NLP), TF-IDF feature extraction, dan Machine Learning.',
        tags: ['Python', 'Flask', 'Machine Learning', 'NLP', 'Recommendation System', 'TF-IDF'],
        image: 'Gemini_Generated_Image_37gazo37gazo37ga.jfif',
        liveUrl: null,
        githubUrl: 'https://github.com/KyyTzy09/CBPR',
        stars: 0,
        forks: 0,
        updated: '2026-08-16'
    },
    {
        id: 'web-tiket',
        name: 'web-tiket',
        title: 'Web Tiket Online',
        category: 'web',
        language: 'CSS & JavaScript',
        description: 'Sistem pemesanan tiket online modern dengan antarmuka responsif dan alur booking instan.',
        tags: ['HTML5', 'CSS3', 'JavaScript', 'Booking'],
        image: 'tiket.png',
        liveUrl: 'https://nawafgadi.github.io/web-tiket/',
        githubUrl: 'https://github.com/nawafgadi/web-tiket',
        stars: 0,
        forks: 0,
        updated: '2026-07-03'
    },
    {
        id: 'admin-tiket',
        name: 'web-tiket-admin',
        title: 'Admin Dashboard Tiket',
        category: 'web',
        language: 'JavaScript',
        description: 'Dashboard administratif untuk mengelola jadwal keberangkatan, transaksi tiket, dan data penumpang.',
        tags: ['Dashboard', 'JavaScript', 'Admin Panel'],
        image: 'admin tkiket.png',
        liveUrl: 'https://nawafgadi.github.io/web-tiket/admin',
        githubUrl: 'https://github.com/nawafgadi/web-tiket',
        stars: 0,
        forks: 0,
        updated: '2026-07-03'
    },
    {
        id: 'xipplg4_03_banksampah',
        name: 'xipplg4_03_banksampah',
        title: 'Bank Sampah Digital',
        category: 'web',
        language: 'HTML5 & CSS',
        description: 'Aplikasi manajemen dan edukasi bank sampah digital untuk pengelolaan limbah plastik, kertas, dan kompos.',
        tags: ['HTML5', 'CSS3', 'Edukasi Lingkungan', 'Landing Page'],
        image: 'BANK SAMPAH.png',
        liveUrl: 'https://nawafgadi.github.io/xipplg4_03_banksampah/',
        githubUrl: 'https://github.com/nawafgadi/xipplg4_03_banksampah',
        stars: 0,
        forks: 0,
        updated: '2025-08-29'
    },
    {
        id: 'pengukur-stanting-',
        name: 'pengukur-stanting-',
        title: 'Deteksi Stunting AI (KNN)',
        category: 'ai',
        language: 'Python & Flask',
        description: 'Sistem deteksi dini risiko stunting pada balita menggunakan Machine Learning algoritma K-Nearest Neighbors (KNN).',
        tags: ['Python', 'Flask', 'Machine Learning', 'KNN', 'Healthcare'],
        image: '',
        liveUrl: 'https://nawafgadi.github.io/pengukur-stanting-/',
        githubUrl: 'https://github.com/nawafgadi/pengukur-stanting-',
        stars: 0,
        forks: 0,
        updated: '2026-04-24'
    },
    {
        id: 'kasirApp',
        name: 'kasirApp',
        title: 'Kasir POS Mobile App',
        category: 'mobile',
        language: 'Kotlin',
        description: 'Aplikasi Point of Sale (POS) Android berbasis Kotlin dengan integrasi API backend dan manajemen transaksi lengkap.',
        tags: ['Kotlin', 'Android Studio', 'POS', 'REST API'],
        image: 'pos.png',
        liveUrl: 'https://nawafgadi.github.io/kasirApp/',
        githubUrl: 'https://github.com/nawafgadi/kasirApp',
        stars: 0,
        forks: 0,
        updated: '2026-06-10'
    },
    {
        id: 'game_mk2_PAS',
        name: 'game_mk2_PAS',
        title: 'Curious Chimpanzee 2D',
        category: 'game',
        language: 'C# & Unity',
        description: 'Game platformer petualangan 2D dengan mekanisme pengumpulan pisang, pause manager, dan stage level progression.',
        tags: ['C#', 'Unity', '2D Platformer', 'Game Development'],
        image: 'Gemini_Generated_Image_kmt6ewkmt6ewkmt6.png',
        liveUrl: null,
        githubUrl: 'https://github.com/nawafgadi/game_mk2_PAS',
        stars: 0,
        forks: 0,
        updated: '2026-06-06'
    },
    {
        id: 'APPHP-STORE',
        name: 'APPHP-STORE',
        title: 'Luxe Phone Mobile Store',
        category: 'web',
        language: 'JavaScript',
        description: 'Aplikasi katalog toko smartphone dan gadget modern dengan antarmuka interaktif dan shopping workflow.',
        tags: ['JavaScript', 'E-Commerce', 'Mobile UI'],
        image: 'Luxe mobile.png',
        liveUrl: null,
        githubUrl: 'https://github.com/nawafgadi/APPHP-STORE',
        stars: 0,
        forks: 0,
        updated: '2026-04-28'
    },
    {
        id: 'Astra-Chiller',
        name: 'Astra-Chiller',
        title: 'Astra Chiller Cooling Web',
        category: 'web',
        language: 'HTML & CSS',
        description: 'Website katalog sistem pendingin industri dengan modul autentikasi login, profil produk, dan pemesanan unit.',
        tags: ['HTML5', 'CSS3', 'JavaScript', 'Industrial'],
        image: '',
        liveUrl: 'https://nawafgadi.github.io/Astra-Chiller/',
        githubUrl: 'https://github.com/nawafgadi/Astra-Chiller',
        stars: 0,
        forks: 0,
        updated: '2024-11-08'
    },
    {
        id: 'keturunan',
        name: 'keturunan',
        title: 'Silsilah Keturunan Keluarga',
        category: 'web',
        language: 'HTML & JavaScript',
        description: 'Aplikasi visualisasi pohon silsilah keluarga interaktif untuk melacak relasi generasi dan data biografi anggota keluarga.',
        tags: ['HTML5', 'JavaScript', 'Genealogy Tree'],
        image: '',
        liveUrl: 'https://nawafgadi.github.io/keturunan/',
        githubUrl: 'https://github.com/nawafgadi/keturunan',
        stars: 0,
        forks: 0,
        updated: '2026-06-04'
    },
    {
        id: 'nadiaprofile',
        name: 'nadiaprofile',
        title: 'Nadia Halia Accountant Portfolio',
        category: 'web',
        language: 'JavaScript & CSS',
        description: 'Website portofolio profesional akuntan publik dengan tata letak modern, integrasi CV PDF, dan keahlian finansial.',
        tags: ['JavaScript', 'CSS3', 'Personal Branding', 'CV'],
        image: '',
        liveUrl: 'https://nawafgadi.github.io/nadiaprofile/',
        githubUrl: 'https://github.com/nawafgadi/nadiaprofile',
        stars: 0,
        forks: 0,
        updated: '2026-03-13'
    },
    {
        id: 'nadiaproject',
        name: 'nadiaproject',
        title: 'Nadia Halia Project Showcase',
        category: 'web',
        language: 'JavaScript',
        description: 'Showcase pencapaian dan laporan proyek profesional bidang akuntansi dan manajemen keuangan.',
        tags: ['JavaScript', 'CSS3', 'Showcase'],
        image: '',
        liveUrl: 'https://nawafgadi.github.io/nadiaproject/',
        githubUrl: 'https://github.com/nawafgadi/nadiaproject',
        stars: 0,
        forks: 0,
        updated: '2026-01-12'
    },
    {
        id: 'idulfitri',
        name: 'idulfitri',
        title: 'Kartu Ucapan Idul Fitri',
        category: 'interactive',
        language: 'JavaScript & CSS',
        description: 'Kartu ucapan digital interaktif Hari Raya Idul Fitri dengan animasi visual islami dan pemutar audio.',
        tags: ['JavaScript', 'CSS Animation', 'Greeting Card'],
        image: 'ucapan idulfitri.png',
        liveUrl: 'https://nawafgadi.github.io/idulfitri/',
        githubUrl: 'https://github.com/nawafgadi/idulfitri',
        stars: 0,
        forks: 0,
        updated: '2025-03-29'
    },
    {
        id: 'ulangtahun',
        name: 'ulangtahun',
        title: 'Birthday Celebration Card',
        category: 'interactive',
        language: 'CSS & JavaScript',
        description: 'Halaman ucapan selamat ulang tahun interaktif dilengkapi galeri foto kenangan, efek balon, dan pesan hangat.',
        tags: ['CSS Animation', 'JavaScript', 'Interactive Web'],
        image: '',
        liveUrl: 'https://nawafgadi.github.io/ulangtahun/',
        githubUrl: 'https://github.com/nawafgadi/ulangtahun',
        stars: 0,
        forks: 0,
        updated: '2025-03-23'
    },
    {
        id: 'romantis',
        name: 'romantis',
        title: 'Romantic Interactive Card',
        category: 'interactive',
        language: 'HTML & CSS',
        description: 'Website kartu pesan romantis interaktif dengan animasi efek hati dan sentuhan tipografi estetis.',
        tags: ['HTML5', 'CSS Animation', 'Interactive Card'],
        image: '',
        liveUrl: 'https://nawafgadi.github.io/romantis/',
        githubUrl: 'https://github.com/nawafgadi/romantis',
        stars: 0,
        forks: 0,
        updated: '2024-12-15'
    },
    {
        id: 'promsibaju',
        name: 'promsibaju',
        title: 'Katalog Promosi Baju & Fashion',
        category: 'web',
        language: 'HTML & CSS',
        description: 'Website katalog promosi produk busana dan fashion apparel dengan form pemesanan langsung.',
        tags: ['HTML5', 'Fashion', 'Branding', 'Catalog'],
        image: '',
        liveUrl: 'https://nawafgadi.github.io/promsibaju/',
        githubUrl: 'https://github.com/nawafgadi/promsibaju',
        stars: 0,
        forks: 0,
        updated: '2024-08-27'
    },
    {
        id: 'pertanian',
        name: 'pertanian',
        title: 'Portal Informasi Pertanian',
        category: 'web',
        language: 'HTML & Python',
        description: 'Portal agrikultur pintar untuk pemantauan komoditas pertanian dan edukasi budidaya tanaman modern.',
        tags: ['HTML5', 'Agriculture', 'Smart Farming'],
        image: 'pertanian.png',
        liveUrl: 'https://nawafgadi.github.io/pertanian/',
        githubUrl: 'https://github.com/nawafgadi/pertanian',
        stars: 0,
        forks: 0,
        updated: '2025-09-15'
    },
    {
        id: 'AINawaf',
        name: 'AINawaf',
        title: 'Nawaf AI Chatbot System',
        category: 'ai',
        language: 'Python & JS',
        description: 'Sistem asisten kecerdasan buatan cerdas untuk memandu pengunjung portofolio dengan dukungan multi-bahasa.',
        tags: ['AI Assistant', 'NLP', 'Chatbot'],
        image: '',
        liveUrl: null,
        githubUrl: 'https://github.com/nawafgadi/AINawaf',
        stars: 0,
        forks: 0,
        updated: '2026-07-06'
    },
    {
        id: 'kalender',
        name: 'kalender',
        title: 'Kalender Interaktif & Agenda',
        category: 'interactive',
        language: 'JavaScript',
        description: 'Aplikasi kalender interaktif untuk mencatat agenda penting dan jadwal aktivitas harian.',
        tags: ['JavaScript', 'Productivity', 'Calendar'],
        image: '',
        liveUrl: null,
        githubUrl: 'https://github.com/nawafgadi/kalender',
        stars: 0,
        forks: 0,
        updated: '2026-02-25'
    },
    {
        id: 'umur',
        name: 'umur',
        title: 'Kalkulator Umur & Countdown',
        category: 'interactive',
        language: 'JavaScript',
        description: 'Alat penghitung usia presisi hari, jam, detik dengan hitung mundur hari ulang tahun berikutnya.',
        tags: ['JavaScript', 'Tools', 'Calculator'],
        image: '',
        liveUrl: null,
        githubUrl: 'https://github.com/nawafgadi/umur',
        stars: 0,
        forks: 0,
        updated: '2025-09-04'
    },
    {
        id: 'mk3',
        name: 'mk3',
        title: 'Laravel MK3 Application',
        category: 'web',
        language: 'Blade & PHP',
        description: 'Aplikasi web enterprise berbasis framework Laravel dengan manajemen database relasional dan Blade template.',
        tags: ['Laravel', 'PHP', 'Blade', 'MVC'],
        image: '',
        liveUrl: null,
        githubUrl: 'https://github.com/nawafgadi/mk3',
        stars: 0,
        forks: 0,
        updated: '2026-03-10'
    },
    {
        id: 'my-websitenawaf',
        name: 'my-websitenawaf',
        title: 'Web Platform Nawaf',
        category: 'web',
        language: 'Blade & PHP',
        description: 'Sistem website dinamis terstruktur dengan arsitektur Laravel dan manajemen konten.',
        tags: ['Laravel', 'Blade', 'Fullstack'],
        image: '',
        liveUrl: null,
        githubUrl: 'https://github.com/nawafgadi/my-websitenawaf',
        stars: 0,
        forks: 0,
        updated: '2025-11-17'
    },
    {
        id: 'PSAJ',
        name: 'PSAJ',
        title: 'Sistem Penilaian PSAJ',
        category: 'web',
        language: 'Web System',
        description: 'Sistem aplikasi pendukung penilaian akhir jenjang sekolah berbasis web.',
        tags: ['Assessment', 'School System', 'Web'],
        image: '',
        liveUrl: null,
        githubUrl: 'https://github.com/nawafgadi/PSAJ',
        stars: 0,
        forks: 0,
        updated: '2026-08-07'
    },
    {
        id: 'portofolionewaja',
        name: 'portofolionewaja',
        title: 'Portfolio Modern v2',
        category: 'web',
        language: 'JavaScript',
        description: 'Versi website portfolio personal modern dengan dark mode, AI chat, dan integrasi GitHub API.',
        tags: ['JavaScript', 'Portfolio', 'Responsive'],
        image: '',
        liveUrl: 'https://nawafgadi.github.io/portofolionewaja/',
        githubUrl: 'https://github.com/nawafgadi/portofolionewaja',
        stars: 0,
        forks: 0,
        updated: '2026-07-07'
    },
    {
        id: 'protofolio-nawaf-baru',
        name: 'protofolio-nawaf-baru',
        title: 'Portfolio Nawaf Baru',
        category: 'web',
        language: 'HTML5 & CSS',
        description: 'Eksplorasi desain portofolio dengan tata letak minimalis dan interaksi visual halus.',
        tags: ['HTML5', 'CSS3', 'Portfolio'],
        image: '',
        liveUrl: 'https://nawafgadi.github.io/protofolio-nawaf-baru/',
        githubUrl: 'https://github.com/nawafgadi/protofolio-nawaf-baru',
        stars: 0,
        forks: 0,
        updated: '2026-02-18'
    },
    {
        id: 'protofolio-anyar',
        name: 'protofolio-anyar',
        title: 'Portfolio Versi Anyar',
        category: 'web',
        language: 'HTML5',
        description: 'Desain web portfolio dengan fokus pada showcase keahlian frontend dan project.',
        tags: ['HTML5', 'CSS3', 'Showcase'],
        image: '',
        liveUrl: 'https://nawafgadi.github.io/protofolio-anyar/',
        githubUrl: 'https://github.com/nawafgadi/protofolio-anyar',
        stars: 0,
        forks: 0,
        updated: '2026-02-12'
    },
    {
        id: 'cv-nawaf',
        name: 'cv-nawaf',
        title: 'Curriculum Vitae Web Nawaf',
        category: 'web',
        language: 'CSS & HTML',
        description: 'Halaman Curriculum Vitae digital interaktif memuat riwayat pendidikan, pengalaman, dan keahlian.',
        tags: ['CSS3', 'CV Digital', 'Resume'],
        image: '',
        liveUrl: 'https://nawafgadi.github.io/cv-nawaf/',
        githubUrl: 'https://github.com/nawafgadi/cv-nawaf',
        stars: 0,
        forks: 0,
        updated: '2025-03-01'
    },
    {
        id: 'webpersonal',
        name: 'webpersonal',
        title: 'Web Personal Nawaf',
        category: 'web',
        language: 'CSS & HTML',
        description: 'Website profil personal simpel dan elegan.',
        tags: ['HTML5', 'CSS3', 'Personal Web'],
        image: '',
        liveUrl: 'https://nawafgadi.github.io/webpersonal/',
        githubUrl: 'https://github.com/nawafgadi/webpersonal',
        stars: 0,
        forks: 0,
        updated: '2025-03-07'
    },
    {
        id: 'untuk',
        name: 'untuk',
        title: 'Special Interactive Note',
        category: 'interactive',
        language: 'CSS & HTML',
        description: 'Web interaktif kartu pesan personal dengan animasi CSS murni.',
        tags: ['CSS Animation', 'Interactive'],
        image: '',
        liveUrl: 'https://nawafgadi.github.io/untuk/',
        githubUrl: 'https://github.com/nawafgadi/untuk',
        stars: 0,
        forks: 0,
        updated: '2025-03-27'
    },
    // Figma UI/UX Design Works
    {
        id: 'e-cashier-figma',
        name: 'e-cashier-design',
        title: 'E-Cashier POS UI/UX Design',
        category: 'design',
        language: 'Figma Design',
        description: 'Desain antarmuka aplikasi kasir modern dengan tata letak kasir intuitif dan alur transaksi cepat.',
        tags: ['Figma', 'UI/UX Design', 'POS System', 'Mobile App'],
        image: 'e-cashier.png',
        liveUrl: null,
        figmaUrl: 'https://www.figma.com/design/JWHD0JHaiRrBuRPFh6NZKa/Untitled?node-id=0-1&t=uJojoAxmUMySJaLi-1',
        githubUrl: null,
        stars: 0,
        forks: 0,
        updated: '2026-06-01'
    },
    {
        id: 'pertanian-figma',
        name: 'pertanian-design',
        title: 'Pertanian Smart Farming UI/UX',
        category: 'design',
        language: 'Figma Design',
        description: 'Konsep desain aplikasi mobile pertanian cerdas untuk pemantauan tanaman dan hasil panen.',
        tags: ['Figma', 'UI/UX', 'Smart Farming', 'Clean Design'],
        image: 'pertanian.png',
        liveUrl: null,
        figmaUrl: 'https://www.figma.com/design/mfu2VDxJmQBWbR4jpHgQEz/Untitled?node-id=0-1&t=KtYQrvw5dJh1cwDo-1',
        githubUrl: null,
        stars: 0,
        forks: 0,
        updated: '2026-05-15'
    },
    {
        id: 'bank-awan-figma',
        name: 'bank-awan-design',
        title: 'Bank Awan Mobile Banking UI/UX',
        category: 'design',
        language: 'Figma Design',
        description: 'Desain antarmuka mobile banking modern bernuansa Cloud Blue dengan fitur transfer, mutasi, dan QRIS.',
        tags: ['Figma', 'Fintech', 'Mobile Banking', 'UI/UX'],
        image: 'bankawan.png',
        liveUrl: null,
        figmaUrl: 'https://www.figma.com/design/hcH86dph4JlYAAGW6F96GN/Untitled?node-id=0-1&t=Bk0SakxepBt9mIJP-1',
        githubUrl: null,
        stars: 0,
        forks: 0,
        updated: '2026-05-10'
    }
];

let allProjectsData = [...BASE_PROJECTS];
let currentFilter = 'all';
let currentSearchQuery = '';

function classifyRepoCategory(repo) {
    const name = (repo.name || '').toLowerCase();
    const lang = (repo.language || '').toLowerCase();
    const desc = (repo.description || '').toLowerCase();
    
    if (name.includes('game') || lang.includes('c#')) return 'game';
    if (name.includes('stunting') || name.includes('ai') || desc.includes('machine learning') || desc.includes('ai')) return 'ai';
    if (lang.includes('kotlin') || lang.includes('java') || name.includes('kasir') || name.includes('android')) return 'mobile';
    if (name.includes('idulfitri') || name.includes('ulangtahun') || name.includes('romantis') || name.includes('kalender') || name.includes('umur') || name.includes('ucapan') || name.includes('untuk')) return 'interactive';
    if (name.includes('figma') || desc.includes('ui/ux') || desc.includes('design')) return 'design';
    return 'web';
}

function getTechIcon(lang, category) {
    const l = (lang || '').toLowerCase();
    const c = (category || '').toLowerCase();
    
    if (c === 'design' || l.includes('figma')) return { icon: 'ri-palette-line', color: '#f24e1e', gradient: 'linear-gradient(135deg, #1e1b4b 0%, #311042 100%)' };
    if (c === 'game' || l.includes('c#') || l.includes('unity')) return { icon: 'ri-gamepad-line', color: '#10b981', gradient: 'linear-gradient(135deg, #064e3b 0%, #022c22 100%)' };
    if (c === 'ai' || l.includes('python')) return { icon: 'ri-brain-line', color: '#38bdf8', gradient: 'linear-gradient(135deg, #0c4a6e 0%, #082f49 100%)' };
    if (c === 'mobile' || l.includes('kotlin') || l.includes('android')) return { icon: 'ri-smartphone-line', color: '#a855f7', gradient: 'linear-gradient(135deg, #581c87 0%, #3b0764 100%)' };
    if (l.includes('typescript')) return { icon: 'ri-code-s-slash-line', color: '#60a5fa', gradient: 'linear-gradient(135deg, #1e3a8a 0%, #172554 100%)' };
    if (l.includes('blade') || l.includes('php') || l.includes('laravel')) return { icon: 'ri-terminal-box-line', color: '#f87171', gradient: 'linear-gradient(135deg, #7f1d1d 0%, #450a0a 100%)' };
    if (c === 'interactive') return { icon: 'ri-sparkling-line', color: '#fbbf24', gradient: 'linear-gradient(135deg, #78350f 0%, #451a03 100%)' };
    return { icon: 'ri-code-line', color: '#c7a84b', gradient: 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)' };
}

function formatDateDisplay(dateString) {
    if (!dateString) return '';
    try {
        const d = new Date(dateString);
        return d.toLocaleDateString(currentLang === 'id' ? 'id-ID' : 'en-US', { month: 'short', year: 'numeric' });
    } catch (e) {
        return dateString;
    }
}

function updateFilterCounts() {
    const counts = {
        all: allProjectsData.length,
        web: 0,
        mobile: 0,
        ai: 0,
        game: 0,
        design: 0,
        interactive: 0
    };

    allProjectsData.forEach(p => {
        const cat = p.category || 'web';
        if (counts[cat] !== undefined) counts[cat]++;
    });

    Object.keys(counts).forEach(cat => {
        const el = document.getElementById(`count-${cat}`);
        if (el) el.textContent = counts[cat];
    });
}

function renderProjects() {
    const grid = document.getElementById('work-grid');
    const emptyState = document.getElementById('work-empty-state');
    const visibleCountEl = document.getElementById('visible-count');
    if (!grid) return;

    const filtered = allProjectsData.filter(project => {
        const matchesCategory = (currentFilter === 'all') || (project.category === currentFilter);
        
        let matchesSearch = true;
        if (currentSearchQuery) {
            const query = currentSearchQuery.toLowerCase();
            const titleMatch = (project.title || '').toLowerCase().includes(query);
            const nameMatch = (project.name || '').toLowerCase().includes(query);
            const descMatch = (project.description || '').toLowerCase().includes(query);
            const langMatch = (project.language || '').toLowerCase().includes(query);
            const tagsMatch = (project.tags || []).some(t => t.toLowerCase().includes(query));
            matchesSearch = titleMatch || nameMatch || descMatch || langMatch || tagsMatch;
        }

        return matchesCategory && matchesSearch;
    });

    if (visibleCountEl) {
        visibleCountEl.textContent = filtered.length;
    }

    if (filtered.length === 0) {
        grid.innerHTML = '';
        if (emptyState) emptyState.classList.remove('hidden');
        return;
    }

    if (emptyState) emptyState.classList.add('hidden');

    const t = translations[currentLang] || translations.id;

    grid.innerHTML = filtered.map(item => {
        const techInfo = getTechIcon(item.language, item.category);
        const resolvedImage = item.image || CUSTOM_PROJECT_IMAGES[item.name] || CUSTOM_PROJECT_IMAGES[item.id] || '';
        
        // Category Label
        let catLabel = item.category.toUpperCase();
        if (item.category === 'web') catLabel = t.filter_web || 'WEB DEV';
        if (item.category === 'mobile') catLabel = t.filter_mobile || 'MOBILE';
        if (item.category === 'ai') catLabel = t.filter_ai || 'AI & ML';
        if (item.category === 'game') catLabel = t.filter_game || 'GAME 2D';
        if (item.category === 'design') catLabel = t.filter_design || 'UI/UX DESIGN';
        if (item.category === 'interactive') catLabel = t.filter_interactive || 'INTERACTIVE';

        // Badges
        let badgeHtml = '';
        if (item.liveUrl) {
            badgeHtml = `<span class="work-media-badge badge-live"><i class="ri-record-circle-line"></i> Live</span>`;
        } else if (item.figmaUrl) {
            badgeHtml = `<span class="work-media-badge badge-figma"><i class="ri-palette-line"></i> Figma</span>`;
        } else if (item.githubUrl) {
            badgeHtml = `<span class="work-media-badge badge-github"><i class="ri-github-fill"></i> Repo</span>`;
        }

        // Tags
        const tagsHtml = (item.tags || []).map(tag => `<span class="work-tag">#${tag}</span>`).join('');

        // Action buttons
        let actionsHtml = '';
        if (item.liveUrl) {
            actionsHtml += `<a href="${item.liveUrl}" target="_blank" rel="noopener noreferrer" class="work-card-btn btn-demo" title="${t.live_demo}"><i class="ri-external-link-line"></i> ${t.live_demo}</a>`;
        }
        if (item.figmaUrl) {
            actionsHtml += `<a href="${item.figmaUrl}" target="_blank" rel="noopener noreferrer" class="work-card-btn btn-figma" title="${t.figma_design}"><i class="ri-palette-line"></i> ${t.figma_design}</a>`;
        }
        if (item.githubUrl) {
            actionsHtml += `<a href="${item.githubUrl}" target="_blank" rel="noopener noreferrer" class="work-card-btn btn-repo" title="${t.github_repo}"><i class="ri-github-line"></i> ${t.github_repo}</a>`;
        }

        const dateDisplay = formatDateDisplay(item.updated);

        // Fallback initials monogram
        const monogram = (item.title || item.name || 'PR').split(' ').map(w => w[0]).join('').substring(0, 3).toUpperCase();

        return `
            <div class="work-card" data-category="${item.category}">
                <div class="work-card-media" style="background: ${techInfo.gradient};">
                    ${badgeHtml}
                    ${resolvedImage ? `
                        <img 
                            src="${resolvedImage}" 
                            alt="${item.title || item.name}" 
                            class="work-card-img" 
                            loading="lazy"
                            onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';"
                        >
                    ` : ''}
                    <div class="work-card-banner" style="display: ${resolvedImage ? 'none' : 'flex'};">
                        <i class="${techInfo.icon} banner-tech-icon" style="color: ${techInfo.color};"></i>
                        <span class="banner-monogram">${monogram}</span>
                    </div>
                </div>
                <div class="work-card-body">
                    <div class="work-card-meta">
                        <span class="work-card-category">${catLabel}</span>
                        <span class="work-card-lang"><span class="lang-dot" style="background: ${techInfo.color};"></span> ${item.language || 'Code'}</span>
                    </div>
                    <h3 class="work-card-title">${item.title || item.name}</h3>
                    <p class="work-card-desc">${item.description || 'Repositori project terbuka di GitHub oleh Nawaf Gadi Alfatih.'}</p>
                    <div class="work-card-tags">
                        ${tagsHtml}
                    </div>
                    <div class="work-card-footer">
                        <div class="work-card-stats">
                            ${dateDisplay ? `<span class="work-card-stat" title="Terakhir diperbarui"><i class="ri-time-line"></i> ${dateDisplay}</span>` : ''}
                            ${item.stars ? `<span class="work-card-stat" title="Bintang GitHub"><i class="ri-star-line"></i> ${item.stars}</span>` : ''}
                        </div>
                        <div class="work-card-actions">
                            ${actionsHtml}
                        </div>
                    </div>
                </div>
            </div>
        `;
    }).join('');
}

window.renderPortfolioProjects = renderProjects;

// Fetch all repositories dynamically from GitHub API
function syncGitHubRepositories() {
    const syncIndicator = document.getElementById('work-sync-indicator');
    const syncLabel = document.getElementById('sync-label');

    fetch(GITHUB_API_URL)
        .then(res => {
            if (!res.ok) throw new Error(`GitHub API HTTP ${res.status}`);
            return res.json();
        })
        .then(repos => {
            if (!Array.isArray(repos) || repos.length === 0) return;

            
            const existingMap = new Map();
            BASE_PROJECTS.forEach(p => existingMap.set(p.name, p));

            const dynamicProjects = repos.map(repo => {
                const existing = existingMap.get(repo.name);
                const category = existing ? existing.category : classifyRepoCategory(repo);
                const title = existing ? existing.title : repo.name.replace(/[-_]/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
                const desc = existing && existing.description ? existing.description : (repo.description || `Proyek repositori ${repo.name} yang dikembangkan dengan ${repo.language || 'teknologi modern'}.`);
                const lang = existing && existing.language ? existing.language : (repo.language || 'Web Code');
                const hasPages = repo.has_pages;
                const liveUrl = existing && existing.liveUrl !== undefined ? existing.liveUrl : (hasPages ? `https://${GITHUB_USERNAME}.github.io/${repo.name}/` : repo.homepage);
                const tags = existing && existing.tags ? existing.tags : [repo.language || 'Code', 'GitHub'].filter(Boolean);
                const image = existing ? existing.image : (CUSTOM_PROJECT_IMAGES[repo.name] || '');

                return {
                    id: repo.name,
                    name: repo.name,
                    title: title,
                    category: category,
                    language: lang,
                    description: desc,
                    tags: tags,
                    image: image,
                    liveUrl: liveUrl || null,
                    figmaUrl: existing ? existing.figmaUrl : null,
                    githubUrl: existing && existing.githubUrl ? existing.githubUrl : repo.html_url,
                    stars: repo.stargazers_count || 0,
                    forks: repo.forks_count || 0,
                    updated: repo.updated_at ? repo.updated_at.split('T')[0] : ''
                };
            });

            // Preserve special items like standalone Figma projects and external/collaborative repositories that aren't in GitHub repos API
            const nonApiItems = BASE_PROJECTS.filter(p => !repos.some(r => r.name.toLowerCase() === (p.name || '').toLowerCase()));
            
            allProjectsData = [...dynamicProjects, ...nonApiItems];
            
            // Sort by updated date descending
            allProjectsData.sort((a, b) => (b.updated || '').localeCompare(a.updated || ''));

            updateFilterCounts();
            renderProjects();

            if (syncLabel) syncLabel.textContent = `GitHub Sync (${repos.length} Repos)`;
            if (syncIndicator) syncIndicator.classList.add('synced');
        })
        .catch(err => {
            console.warn('GitHub API sync note (using cached curated dataset):', err.message);
            updateFilterCounts();
            renderProjects();
            if (syncLabel) syncLabel.textContent = 'GitHub Cached Mode';
        });
}

// Setup Event Listeners for Filters & Search
function setupProjectControls() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const searchInput = document.getElementById('project-search-input');
    const clearBtn = document.getElementById('search-clear-btn');
    const resetBtn = document.getElementById('reset-filter-btn');

    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            filterButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            currentFilter = btn.getAttribute('data-filter') || 'all';
            renderProjects();
        });
    });

    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            currentSearchQuery = e.target.value.trim();
            if (clearBtn) {
                clearBtn.classList.toggle('hidden', currentSearchQuery.length === 0);
            }
            renderProjects();
        });
    }

    if (clearBtn && searchInput) {
        clearBtn.addEventListener('click', () => {
            searchInput.value = '';
            currentSearchQuery = '';
            clearBtn.classList.add('hidden');
            searchInput.focus();
            renderProjects();
        });
    }

    if (resetBtn && searchInput) {
        resetBtn.addEventListener('click', () => {
            searchInput.value = '';
            currentSearchQuery = '';
            if (clearBtn) clearBtn.classList.add('hidden');
            currentFilter = 'all';
            filterButtons.forEach(b => {
                b.classList.toggle('active', b.getAttribute('data-filter') === 'all');
            });
            renderProjects();
        });
    }
}

// Initialize Project Controls and Data Safely
let projectControlsInitialized = false;
function initPortfolio() {
    updateFilterCounts();
    renderProjects();
    if (!projectControlsInitialized) {
        setupProjectControls();
        projectControlsInitialized = true;
    }
    syncGitHubRepositories();
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initPortfolio);
} else {
    initPortfolio();
}

// Mobile menu toggle
const navToggle = document.getElementById('nav-toggle');
const navMenu = document.getElementById('nav-menu');

if (navToggle && navMenu) {
    navToggle.addEventListener('click', function() {
        navMenu.classList.toggle('active');
    });
}

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        if (navMenu) navMenu.classList.remove('active');
    });
});

// Active link highlighting
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        if (window.pageYOffset >= sectionTop - 150) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').substring(1) === current) {
            link.classList.add('active');
        }
    });
});

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const targetId = this.getAttribute('href');
        if (targetId && targetId !== '#') {
            const target = document.querySelector(targetId);
            if (target) {
                e.preventDefault();
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        }
    });
});

// Optional subtle scroll reveal for about and contact
try {
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.about-content, .contact-item').forEach(el => {
        revealObserver.observe(el);
    });
} catch(e) {
    // Fallback if observer not supported
}

// Parallax effect for home section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const homeTitle = document.querySelector('.home-title');
    if (homeTitle) {
        homeTitle.style.transform = `translateY(${scrolled * 0.3}px)`;
    }
});

// Python Backend API Configuration
const PYTHON_API_URL = 'http://localhost:5000/api';

// AI Chat Widget - ERA AI
(function() {
    const chatToggle = document.getElementById('chat-toggle');
    const chatPanel = document.getElementById('chat-panel');
    const chatClose = document.getElementById('chat-close');
    const chatClear = document.getElementById('chat-clear');
    const chatInput = document.getElementById('chat-input');
    const chatSend = document.getElementById('chat-send');
    const chatMessages = document.getElementById('chat-messages');
    const chatSuggestions = document.getElementById('chat-suggestions');
    const STORAGE_KEY = 'nawaf_chat_history';
    
    let usePythonAPI = false;
    let isOpen = false;

    // Notification badge
    const badge = document.createElement('div');
    badge.className = 'chat-notification hidden';
    badge.textContent = '1';
    chatToggle.appendChild(badge);

    function toggleChat() {
        isOpen = !isOpen;
        chatPanel.classList.toggle('open', isOpen);
        chatToggle.classList.toggle('hidden', isOpen);
        if (isOpen) {
            chatInput.focus();
            badge.classList.add('hidden');
            localStorage.setItem('nawaf_chat_seen', Date.now());
        }
    }

    chatToggle.addEventListener('click', toggleChat);
    chatClose.addEventListener('click', toggleChat);

    function getTime() {
        return new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' });
    }

    function formatBotMessage(text) {
        if (!text) return '';
        // Convert markdown links [Text](url)
        let formatted = text.replace(/\[([^\]]+)\]\(([^)]+)\)/g, function(match, label, url) {
            if (url.startsWith('#')) {
                return `<a href="${url}" class="chat-inline-link chat-nav-link">${label}</a>`;
            }
            return `<a href="${url}" target="_blank" rel="noopener noreferrer" class="chat-inline-link">${label} ↗</a>`;
        });
        
        // Bold **text**
        formatted = formatted.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
        
        // Code `text`
        formatted = formatted.replace(/`([^`]+)`/g, '<code class="chat-inline-code">$1</code>');
        
        // Line breaks
        formatted = formatted.replace(/\n/g, '<br>');
        
        return formatted;
    }

    function addMessage(text, sender, save) {
        save = save !== false;
        const msgDiv = document.createElement('div');
        msgDiv.className = 'chat-message ' + sender;
        const content = sender === 'bot' ? formatBotMessage(text) : text.replace(/\n/g, '<br>');
        msgDiv.innerHTML = 
            '<div class="message-content">' +
                '<p>' + content + '</p>' +
                '<span class="message-time">' + getTime() + '</span>' +
            '</div>';
        chatMessages.appendChild(msgDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;

        if (save) saveMessage(text, sender);
        if (sender === 'bot' && !isOpen) badge.classList.remove('hidden');
    }

    function saveMessage(text, sender) {
        const history = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
        history.push({ text: text, sender: sender, time: Date.now() });
        localStorage.setItem(STORAGE_KEY, JSON.stringify(history.slice(-50)));
    }

    function loadHistory() {
        const history = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
        if (history.length === 0) return false;
        history.forEach(function(msg) {
            const msgDiv = document.createElement('div');
            msgDiv.className = 'chat-message ' + msg.sender;
            const time = new Date(msg.time).toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' });
            const content = msg.sender === 'bot' ? formatBotMessage(msg.text) : msg.text.replace(/\n/g, '<br>');
            msgDiv.innerHTML = 
                '<div class="message-content">' +
                    '<p>' + content + '</p>' +
                    '<span class="message-time">' + time + '</span>' +
                '</div>';
            chatMessages.appendChild(msgDiv);
        });
        chatMessages.scrollTop = chatMessages.scrollHeight;
        return true;
    }

    function clearChat() {
        if (!confirm('Hapus semua percakapan?')) return;
        localStorage.removeItem(STORAGE_KEY);
        chatMessages.innerHTML = '';
        showWelcome();
        if (usePythonAPI) {
            fetch(PYTHON_API_URL + '/clear', { method: 'POST' })
                .catch(function(e) { console.log('Clear server history failed', e); });
        }
    }

    if (chatClear) chatClear.addEventListener('click', clearChat);

    function showWelcome() {
        const hour = new Date().getHours();
        let greeting = 'Halo';
        if (hour < 11) greeting = 'Selamat pagi';
        else if (hour < 15) greeting = 'Selamat siang';
        else if (hour < 18) greeting = 'Selamat sore';
        else greeting = 'Selamat malam';

        const welcomeMsgs = {
            id: `${greeting}! Saya **ERA AI**, asisten cerdas portofolio **Nawaf Gadi Alfatih**. 🤖✨\n\nSaya bisa membantu Anda mencari tahu tentang **proyek terbaru** (seperti Kartu Tani, Plazio, CBPR AI), **keahlian teknologi**, **jasa pembuatan web/aplikasi**, hingga **kontak & kolaborasi**. Ada yang ingin ditanyakan?`,
            en: `Hello! I am **ERA AI**, the smart assistant for **Nawaf Gadi Alfatih's** portfolio. 🤖✨\n\nI can assist you with details about **featured projects** (like Kartu Tani, Plazio E-commerce, CBPR Recommendation AI), **skills & tech stack**, **services**, and **contact information**. How can I help you today?`,
            ar: `مرحباً! أنا **ERA AI**، المساعد الذكي لمحفظة **ناوف جاضي الفتيح**. 🤖✨\n\nيمكنني مساعدتك في استكشاف **المشاريع** (مثل Kartu Tani و Plazio و CBPR AI) و**المهارات** ومعلومات **الاتصال**. كيف يمكنني مساعدتك؟`,
            zh: `您好！我是 **ERA AI**，**Nawaf Gadi Alfatih** 作品集的智能助手。🤖✨\n\n我可以为您介绍**精选项目**（如Kartu Tani、Plazio、CBPR推荐AI）、**技术栈**以及**联系方式**。请问有什么我可以帮您的？`
        };

        addMessage(welcomeMsgs[currentLang] || welcomeMsgs.id, 'bot');
        updateSuggestions('welcome');
    }

    const hasHistory = loadHistory();
    if (!hasHistory) {
        showWelcome();
        const lastSeen = localStorage.getItem('nawaf_chat_seen');
        if (!lastSeen) setTimeout(function() { badge.classList.remove('hidden'); }, 3000);
    } else {
        updateSuggestions('default');
    }

    function showTyping() {
        const typingDiv = document.createElement('div');
        typingDiv.className = 'typing-indicator';
        typingDiv.id = 'typing-indicator';
        typingDiv.innerHTML = '<span></span><span></span><span></span>';
        chatMessages.appendChild(typingDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    function hideTyping() {
        const typing = document.getElementById('typing-indicator');
        if (typing) typing.remove();
    }

    function smartDelay(text) {
        return Math.min(600 + text.length * 15, 2000);
    }

    // =========================================================================
    // ADVANCED SMART NLU & COMPREHENSIVE KNOWLEDGE ENGINE (ERA AI 2.0)
    // =========================================================================
    const SMART_KNOWLEDGE = [
        // --- 1. SPECIFIC PROJECTS ---
        {
            id: 'project_kartu_tani',
            context: 'project_kartu_tani',
            patterns: [/kartu\s*tani/, /tani/, /pupuk\s*subsidi/, /smart\s*agriculture/, /petani/],
            response: {
                id: `🌾 **Project: Kartu Tani (Smart Agriculture System)**\n\n` +
                    `Platform web digital berbasis **Python & Django** untuk digitalisasi manajemen kartu identitas petani dan pengawasan distribusi alokasi pupuk bersubsidi.\n\n` +
                    `**Fitur Utama:**\n` +
                    `• Registrasi & Onboarding Digital Petani (Farmer ID Card)\n` +
                    `• Subsidy Allocation Management (Distribusi pupuk tepat sasaran)\n` +
                    `• Transaction Monitoring Real-time untuk Pengecer & Dinas Pertanian\n` +
                    `• Rekapitulasi Data Hasil Panen Komoditas\n\n` +
                    `🔗 **Kode Sumber:** [GitHub: nawafgadi/kartu-tani](https://github.com/nawafgadi/kartu-tani)\n` +
                    `🖼️ Cek kartu proyeknya di bagian [Karya & Proyek](#work)!`,
                en: `🌾 **Project: Kartu Tani (Indonesian Farmer Card System)**\n\n` +
                    `A **Python/Django** web application built for digital farmer management and real-time monitoring of subsidized fertilizer distribution.\n\n` +
                    `**Key Highlights:**\n` +
                    `• Digital Farmer Onboarding & ID Verification\n` +
                    `• Demand-Driven Fertilizer Subsidy Allocation\n` +
                    `• Real-time Retailer & Ministry Transaction Monitoring\n` +
                    `• Harvest Data Logging & Analytics\n\n` +
                    `🔗 **Source Code:** [GitHub: nawafgadi/kartu-tani](https://github.com/nawafgadi/kartu-tani)`,
                ar: `🌾 **مشروع: بطاقة المزارع الذكية (Kartu Tani)**\n\nتطبيق ويب مبني باستخدام **Python و Django** لإدارة بطاقات المزارعين ومراقبة توزيع الأسمدة المدعومة رقمياً.\n\n🔗 **المستودع:** [GitHub: nawafgadi/kartu-tani](https://github.com/nawafgadi/kartu-tani)`,
                zh: `🌾 **项目: 智能农民卡系统 (Kartu Tani)**\n\n基于 **Python & Django** 的智能农业Web系统，用于农民数字身份管理和化肥补贴分发监控。\n\n🔗 **代码仓库:** [GitHub: nawafgadi/kartu-tani](https://github.com/nawafgadi/kartu-tani)`
            },
            suggestions: {
                id: [
                    { msg: "Jelaskan project CBPR AI", label: "Project CBPR AI" },
                    { msg: "Jelaskan project Plazio E-Commerce", label: "Project Plazio" },
                    { msg: "Skill teknologi apa yang dikuasai?", label: "Lihat Skill" }
                ],
                en: [
                    { msg: "Explain the CBPR AI project", label: "CBPR AI Project" },
                    { msg: "Tell me about Plazio E-Commerce", label: "Plazio Store" },
                    { msg: "What technologies do you use?", label: "Skills" }
                ]
            }
        },
        {
            id: 'project_plazio',
            context: 'project_plazio',
            patterns: [/plazio/, /plazio_e-commerce/, /e-commerce/, /toko\s*online/, /belanja\s*online/, /shopping\s*cart/],
            response: {
                id: `🛍️ **Project: Plazio E-Commerce Platform**\n\n` +
                    `Aplikasi web toko online modern untuk memfasilitasi transaksi belanja digital yang cepat, responsif, dan terstruktur.\n\n` +
                    `**Fitur Utama:**\n` +
                    `• Katalog Produk Interaktif dengan multi-kategori pakaian & fashion\n` +
                    `• Sistem Keranjang Belanja Dinamis (Add to Cart, Update Qty, Subtotal)\n` +
                    `• Integrasi Alur Checkout dan Manajemen Data Pesanan\n` +
                    `• Desain Responsif Desktop & Mobile\n\n` +
                    `🔗 **Kode Sumber:** [GitHub: lastfound/Plazio_e-commerce](https://github.com/lastfound/Plazio_e-commerce)\n` +
                    `💡 Lihat selengkapnya di bagian [Karya](#work)!`,
                en: `🛍️ **Project: Plazio E-Commerce Platform**\n\n` +
                    `A modern online store web application featuring dynamic catalog management, interactive shopping cart, and smooth checkout workflows.\n\n` +
                    `• Interactive Product Grid & Filtering\n` +
                    `• Dynamic Shopping Cart & Order Summary\n` +
                    `• Full Mobile-Responsive Architecture\n\n` +
                    `🔗 **Repository:** [GitHub: lastfound/Plazio_e-commerce](https://github.com/lastfound/Plazio_e-commerce)`,
                ar: `🛍️ **مشروع: منصة التجارة الإلكترونية Plazio**\n\nمنصة تسوق إلكتروني متكاملة تحتوي على كتالوج منتجات تفاعلي وسلة تسوق رقمية.\n\n🔗 [GitHub: lastfound/Plazio_e-commerce](https://github.com/lastfound/Plazio_e-commerce)`,
                zh: `🛍️ **项目: Plazio 电子商务平台**\n\n具有现代界面的电商Web应用，支持动态产品目录、购物车管理和结算流程。\n\n🔗 [GitHub: lastfound/Plazio_e-commerce](https://github.com/lastfound/Plazio_e-commerce)`
            },
            suggestions: {
                id: [
                    { msg: "Jelaskan project CBPR AI", label: "Project CBPR" },
                    { msg: "Bisa buat website toko online?", label: "Jasa Website" },
                    { msg: "Berapa harga pembuatan project?", label: "Estimasi Biaya" }
                ],
                en: [
                    { msg: "Explain CBPR AI system", label: "CBPR Project" },
                    { msg: "Can you build an e-commerce website?", label: "Hire Web Dev" },
                    { msg: "What is your pricing?", label: "Pricing" }
                ]
            }
        },
        {
            id: 'project_cbpr',
            context: 'project_cbpr',
            patterns: [/cbpr/, /content[- ]*based/, /rekomendasi/, /recommendation/, /nlp/, /tf[- ]*idf/],
            response: {
                id: `🤖 **Project: CBPR (Content-Based Product Recommendation)**\n\n` +
                    `Sistem rekomendasi produk cerdas berbasis **Machine Learning & NLP (Natural Language Processing)** yang dibangun menggunakan **Python & Flask**.\n\n` +
                    `**Cara Kerja & Arsitektur:**\n` +
                    `1. **Text Input & Preprocessing:** Tokenisasi dan pembersihan teks deskripsi & nama produk.\n` +
                    `2. **Feature Extraction (TF-IDF):** Mengonversi teks menjadi representasi vektor numerik berbobot.\n` +
                    `3. **Cosine Similarity Model:** Menghitung skor kemiripan antar produk untuk menghasilkan rekomendasi paling relevan secara akurat.\n` +
                    `4. **Flask Web API:** Menyajikan endpoint rekomendasi ke antarmuka web.\n\n` +
                    `🔗 **Kode Sumber:** [GitHub: KyyTzy09/CBPR](https://github.com/KyyTzy09/CBPR)\n` +
                    `🧠 Jelajahi kategori filter [AI & ML](#work) pada portofolio!`,
                en: `🤖 **Project: CBPR (Content-Based Product Recommendation)**\n\n` +
                    `A smart product recommendation engine utilizing **Machine Learning & NLP (Natural Language Processing)** with **Python & Flask**.\n\n` +
                    `**How it works:**\n` +
                    `1. **Text Preprocessing:** Tokenizes and cleans product titles and descriptions.\n` +
                    `2. **TF-IDF Vectorization:** Extracts weighted numerical feature vectors.\n` +
                    `3. **Cosine Similarity Matching:** Computes product similarity matrices to serve personalized recommendations.\n\n` +
                    `🔗 **Repository:** [GitHub: KyyTzy09/CBPR](https://github.com/KyyTzy09/CBPR)`,
                ar: `🤖 **مشروع: نظام توصية المنتجات CBPR**\n\nنظام توصيات ذكي يعتمد على معالجة اللغة الطبيعية (NLP) وخوارزميات TF-IDF مع Python و Flask.\n\n🔗 [GitHub: KyyTzy09/CBPR](https://github.com/KyyTzy09/CBPR)`,
                zh: `🤖 **项目: CBPR (基于内容的商品推荐系统)**\n\n基于 **Python & Flask** 和自然语言处理(NLP)与TF-IDF特征提取的智能商品推荐系统。\n\n🔗 [GitHub: KyyTzy09/CBPR](https://github.com/KyyTzy09/CBPR)`
            },
            suggestions: {
                id: [
                    { msg: "Apa saja project AI Nawaf?", label: "Semua Project AI" },
                    { msg: "Skill Python Nawaf apa saja?", label: "Skill Python" },
                    { msg: "Project Kartu Tani", label: "Kartu Tani" }
                ],
                en: [
                    { msg: "Show all AI projects", label: "AI Projects" },
                    { msg: "Tell me about Python skills", label: "Python Skills" },
                    { msg: "Kartu Tani Project", label: "Kartu Tani" }
                ]
            }
        },
        {
            id: 'project_stunting',
            context: 'project_stunting',
            patterns: [/stunting/, /pengukur-stanting/, /knn/, /kesehatan/, /balita/, /gizi/],
            response: {
                id: `📊 **Project: Deteksi Stunting AI (K-Nearest Neighbors)**\n\n` +
                    `Sistem deteksi dini risiko stunting pada balita menggunakan Machine Learning algoritma **KNN (K-Nearest Neighbors)** berbasis Python & Flask.\n\n` +
                    `• Menghitung status gizi berdasarkan tinggi badan, berat badan, dan usia balita.\n` +
                    `• Memberikan rekomendasi tindakan pencegahan stunting secara cepat.\n\n` +
                    `🌐 [Live Demo Aplikasi](https://nawafgadi.github.io/pengukur-stanting-/) | 🔗 [GitHub Repo](https://github.com/nawafgadi/pengukur-stanting-)`,
                en: `📊 **Project: AI Stunting Detection (KNN)**\n\nEarly screening tool for child stunting risks using Machine Learning K-Nearest Neighbors (KNN) algorithm with Python & Flask.\n\n🌐 [Live Demo](https://nawafgadi.github.io/pengukur-stanting-/) | 🔗 [GitHub Repo](https://github.com/nawafgadi/pengukur-stanting-)`
            },
            suggestions: {
                id: [
                    { msg: "Jelaskan project CBPR AI", label: "Project CBPR" },
                    { msg: "Skill AI & Python Nawaf?", label: "Skill Python" },
                    { msg: "Lihat karya lainnya", label: "Semua Karya" }
                ]
            }
        },
        {
            id: 'project_tiket',
            context: 'project_tiket',
            patterns: [/tiket/, /web[- ]*tiket/, /travel/, /booking/, /admin[- ]*tiket/],
            response: {
                id: `🎫 **Project: Web Tiket Online & Admin Panel**\n\n` +
                    `Aplikasi pemesanan tiket online modern dengan alur pemesanan instan, pemilihan rute/kursi, serta dashboard admin untuk mengelola jadwal armada dan manifest penumpang.\n\n` +
                    `🌐 [Live Demo Tiket](https://nawafgadi.github.io/web-tiket/) | 🌐 [Admin Dashboard](https://nawafgadi.github.io/web-tiket/admin) | 🔗 [GitHub Repo](https://github.com/nawafgadi/web-tiket)`,
                en: `🎫 **Project: Online Ticket Booking & Admin Panel**\n\nModern transport ticketing web app with instant booking workflow and administrator manifest management.\n\n🌐 [Live Demo](https://nawafgadi.github.io/web-tiket/) | 🔗 [GitHub Repo](https://github.com/nawafgadi/web-tiket)`
            },
            suggestions: {
                id: [
                    { msg: "Project Bank Sampah Digital", label: "Bank Sampah" },
                    { msg: "Bisa buatkan website custom?", label: "Jasa Web" },
                    { msg: "Bagaimana cara kontak Nawaf?", label: "Kontak" }
                ]
            }
        },
        {
            id: 'project_banksampah',
            context: 'project_banksampah',
            patterns: [/bank\s*sampah/, /sampah/, /xipplg4_03_banksampah/, /limbah/, /lingkungan/],
            response: {
                id: `♻️ **Project: Bank Sampah Digital**\n\n` +
                    `Platform edukasi lingkungan dan kalkulator tabungan sampah terintegrasi untuk membantu pengelolaan limbah anorganik, plastik, dan daur ulang.\n\n` +
                    `🌐 [Live Demo Bank Sampah](https://nawafgadi.github.io/xipplg4_03_banksampah/) | 🔗 [GitHub Repo](https://github.com/nawafgadi/xipplg4_03_banksampah)`,
                en: `♻️ **Project: Digital Waste Bank (Bank Sampah)**\n\nEnvironmental education and community waste-saving calculator web app.\n\n🌐 [Live Demo](https://nawafgadi.github.io/xipplg4_03_banksampah/) | 🔗 [GitHub Repo](https://github.com/nawafgadi/xipplg4_03_banksampah)`
            },
            suggestions: {
                id: [
                    { msg: "Project Kartu Tani", label: "Kartu Tani" },
                    { msg: "Project Web Tiket", label: "Web Tiket" },
                    { msg: "Lihat portofolio lengkap", label: "Portofolio" }
                ]
            }
        },
        {
            id: 'project_kasir',
            context: 'project_kasir',
            patterns: [/kasir/, /kasirapp/, /pos/, /point\s*of\s*sale/, /mobile\s*app/],
            response: {
                id: `📱 **Project: Kasir POS Mobile App (Android Kotlin)**\n\n` +
                    `Aplikasi Point of Sale (POS) Android berbasis **Kotlin & Android Studio** dengan arsitektur REST API untuk kasir toko, pencatatan transaksi, dan inventori barang.\n\n` +
                    `🔗 [GitHub Repo: kasirApp](https://github.com/nawafgadi/kasirApp)`,
                en: `📱 **Project: Cashier POS Mobile App (Kotlin)**\n\nAndroid Point of Sale mobile application developed with Kotlin and REST API integration for retail stores.\n\n🔗 [GitHub Repo: kasirApp](https://github.com/nawafgadi/kasirApp)`
            },
            suggestions: {
                id: [
                    { msg: "Skill Mobile & Kotlin Nawaf?", label: "Skill Kotlin" },
                    { msg: "Desain E-Cashier di Figma", label: "E-Cashier Figma" },
                    { msg: "Bisa buat aplikasi Android?", label: "Jasa Android" }
                ]
            }
        },
        {
            id: 'project_game',
            context: 'project_game',
            patterns: [/game/, /game_mk2_pas/, /chimpanzee/, /monyet/, /unity/, /2d/],
            response: {
                id: `🎮 **Project: Curious Chimpanzee 2D Platformer Game**\n\n` +
                    `Game petualangan 2D yang dibangun menggunakan **Unity Engine & C#**. Menghadirkan gameplay seru mengumpulkan pisang, menghindari rintangan, dan menyelesaikan stage level.\n\n` +
                    `🔗 [GitHub Repo: game_mk2_PAS](https://github.com/nawafgadi/game_mk2_PAS)`,
                en: `🎮 **Project: Curious Chimpanzee 2D (Unity & C#)**\n\n2D adventure platformer game featuring banana collection mechanics, pause managers, and physics obstacles.\n\n🔗 [GitHub Repo](https://github.com/nawafgadi/game_mk2_PAS)`
            },
            suggestions: {
                id: [
                    { msg: "Tampilkan semua project", label: "Semua Project" },
                    { msg: "Skill pemrograman apa saja?", label: "Skill" }
                ]
            }
        },
        {
            id: 'project_figma',
            context: 'project_figma',
            patterns: [/figma/, /ui\s*\/\s*ux/, /desain\s*ui/, /mockup/, /wireframe/, /e-cashier/, /bank\s*awan/],
            response: {
                id: `🎨 **Karya UI/UX Design di Figma:**\n\n` +
                    `1. **E-Cashier POS System UI/UX:** Antarmuka kasir modern dengan navigasi cepat.\n` +
                    `2. **Bank Awan Mobile Banking:** Desain fintech mobile modern bernuansa Cloud Blue dengan fitur QRIS & mutasi.\n` +
                    `3. **Pertanian Smart Farming UI:** Desain aplikasi mobile pemantauan tanaman.\n\n` +
                    `🎨 Jelajahi kategori filter [UI/UX Design](#work) untuk melihat preview desain Figma!`,
                en: `🎨 **UI/UX Design Works (Figma):**\n\n• E-Cashier POS System Design\n• Bank Awan Mobile Banking (Cloud Blue Fintech)\n• Smart Agriculture Mobile App\n\n🎨 Check out the [UI/UX Design](#work) section on the portfolio!`
            },
            suggestions: {
                id: [
                    { msg: "Bisa buat desain UI/UX aplikasi?", label: "Jasa UI/UX" },
                    { msg: "Skill Figma & Canva Nawaf?", label: "Skill Design" },
                    { msg: "Hubungi Nawaf", label: "Kontak" }
                ]
            }
        },

        // --- 2. CATEGORY-WIDE QUERIES ---
        {
            id: 'category_web',
            context: 'category_web',
            patterns: [/proyek\s*web/, /project\s*web/, /web\s*dev/, /website\s*apa\s*aja/],
            response: {
                id: `🌐 **Proyek Web Development Nawaf:**\n\n` +
                    `• **Kartu Tani:** Smart Agriculture & Alokasi Pupuk (Python/Django)\n` +
                    `• **Plazio E-Commerce:** Platform Toko Online (JS/PHP)\n` +
                    `• **Web Tiket Online:** Sistem Pemesanan & Admin Manifest (HTML/CSS/JS)\n` +
                    `• **Bank Sampah Digital:** Platform Edukasi Lingkungan\n` +
                    `• **Astra Chiller:** Katalog Sistem Pendingin Industri\n` +
                    `• **Silsilah Keturunan:** Visualisasi Pohon Keluarga Interaktif\n\n` +
                    `👉 Coba filter kategori **Web Dev** di bagian [Karya](#work)!`,
                en: `🌐 **Web Development Projects:**\n\n• **Kartu Tani:** Smart Agriculture Platform (Python/Django)\n• **Plazio:** Modern E-Commerce Store\n• **Web Tiket:** Online Ticket Booking & Admin\n• **Bank Sampah:** Digital Waste Management\n• **Astra Chiller & Silsilah Keturunan**\n\n👉 Filter by **Web Dev** in the [Work](#work) section!`
            },
            suggestions: {
                id: [
                    { msg: "Jelaskan project Kartu Tani", label: "Kartu Tani" },
                    { msg: "Jelaskan project Plazio", label: "Plazio Store" },
                    { msg: "Project AI apa saja?", label: "Project AI" }
                ]
            }
        },
        {
            id: 'category_ai',
            context: 'category_ai',
            patterns: [/proyek\s*ai/, /project\s*ai/, /machine\s*learning/, /kecerdasan\s*buatan/, /data\s*science/],
            response: {
                id: `🤖 **Proyek AI & Machine Learning Nawaf:**\n\n` +
                    `1. **CBPR (Content-Based Recommendation):** Sistem rekomendasi produk NLP & TF-IDF.\n` +
                    `2. **Deteksi Stunting AI:** Skrining risiko gizi balita dengan Machine Learning KNN.\n` +
                    `3. **ERA AI Assistant:** Asisten virtual cerdas portofolio multi-bahasa.\n\n` +
                    `👉 Cek filter [AI & ML](#work) pada bagian portfolio!`,
                en: `🤖 **AI & Machine Learning Projects:**\n\n1. **CBPR:** Content-Based Recommendation using NLP & TF-IDF.\n2. **Stunting Detection AI:** Toddler nutrition screening with KNN algorithm.\n3. **ERA AI Assistant:** Multilingual smart portfolio assistant.`
            },
            suggestions: {
                id: [
                    { msg: "Jelaskan cara kerja CBPR", label: "Cara Kerja CBPR" },
                    { msg: "Skill Python & AI Nawaf", label: "Skill Python" }
                ]
            }
        },
        {
            id: 'category_all_projects',
            context: 'category_all_projects',
            patterns: [/semua\s*proyek/, /daftar\s*project/, /project\s*apa\s*(saja|aja|pernah)/, /karya\s*apa\s*aja/, /portofolio\s*apa\s*aja/],
            response: {
                id: `🚀 **Daftar Karya & Proyek Unggulan Nawaf (20+ Projects):**\n\n` +
                    `🌾 **Smart Agriculture:** [Kartu Tani](https://github.com/nawafgadi/kartu-tani) (Python/Django)\n` +
                    `🛍️ **E-Commerce:** [Plazio](https://github.com/lastfound/Plazio_e-commerce) & Luxe Mobile\n` +
                    `🤖 **AI & ML:** [CBPR Recommendation](https://github.com/KyyTzy09/CBPR) & [Deteksi Stunting KNN](https://nawafgadi.github.io/pengukur-stanting-/)\n` +
                    `🎫 **Web App:** [Web Tiket Online](https://nawafgadi.github.io/web-tiket/) & [Bank Sampah](https://nawafgadi.github.io/xipplg4_03_banksampah/)\n` +
                    `📱 **Mobile App:** [Kasir POS Mobile (Kotlin)](https://github.com/nawafgadi/kasirApp)\n` +
                    `🎮 **Game 2D:** [Curious Chimpanzee](https://github.com/nawafgadi/game_mk2_PAS) (Unity C#)\n` +
                    `🎨 **UI/UX Design:** E-Cashier, Bank Awan, Pertanian di Figma\n\n` +
                    `Semua proyek dapat Anda filter dan cari langsung di bagian [Karya](#work)! 🔍`,
                en: `🚀 **Featured Projects by Nawaf (20+ Projects):**\n\n` +
                    `🌾 **Smart Agriculture:** [Kartu Tani](https://github.com/nawafgadi/kartu-tani)\n` +
                    `🛍️ **E-Commerce:** [Plazio](https://github.com/lastfound/Plazio_e-commerce)\n` +
                    `🤖 **AI & ML:** [CBPR](https://github.com/KyyTzy09/CBPR) & [Deteksi Stunting KNN](https://nawafgadi.github.io/pengukur-stanting-/)\n` +
                    `🎫 **Web App:** [Web Tiket](https://nawafgadi.github.io/web-tiket/)\n` +
                    `📱 **Mobile:** [Kasir POS (Kotlin)](https://github.com/nawafgadi/kasirApp)\n` +
                    `🎮 **Game 2D:** [Curious Chimpanzee](https://github.com/nawafgadi/game_mk2_PAS)\n\n` +
                    `Browse all live projects in the [Work](#work) section!`
            },
            suggestions: {
                id: [
                    { msg: "Ceritakan tentang Kartu Tani", label: "Kartu Tani" },
                    { msg: "Skill teknologi apa yang dikuasai?", label: "Skill Nawaf" },
                    { msg: "Bagaimana cara kontak Nawaf?", label: "Kontak" }
                ]
            }
        },

        // --- 3. SKILLS & TECH STACK ---
        {
            id: 'skills_tech',
            context: 'skills_tech',
            patterns: [/skill/, /keahlian/, /bisa\s*apa/, /teknologi/, /tech\s*stack/, /bahasa\s*pemrograman/, /framework/, /menguasai/],
            response: {
                id: `💻 **Keahlian & Tech Stack Nawaf Gadi Alfatih:**\n\n` +
                    `🎨 **UI/UX Design:** Figma, Canva, Wireframing, User Centered Design\n` +
                    `⚡ **Frontend:** HTML5, CSS3, JavaScript (ES6+), React, Responsive Layout\n` +
                    `🔧 **Backend & Database:** Python (Django, Flask), PHP (Laravel), REST API, MySQL\n` +
                    `📱 **Mobile Development:** Kotlin, Android Studio\n` +
                    `🧠 **AI & Machine Learning:** NLP, TF-IDF, K-Nearest Neighbors (KNN)\n` +
                    `🛠️ **Tools & Support:** Git/GitHub, VS Code, IT Troubleshooting, IT Help Desk\n\n` +
                    `Nawaf selalu belajar dan mengikuti perkembangan teknologi terbaru! 📚`,
                en: `💻 **Tech Stack & Skills mastered by Nawaf:**\n\n` +
                    `🎨 **UI/UX Design:** Figma, Canva, Wireframing\n` +
                    `⚡ **Frontend:** HTML5, CSS3, JavaScript, React\n` +
                    `🔧 **Backend:** Python (Django, Flask), PHP (Laravel), REST APIs\n` +
                    `📱 **Mobile:** Kotlin, Android Studio\n` +
                    `🧠 **AI/ML:** NLP, TF-IDF, KNN\n` +
                    `🛠️ **IT Support:** Troubleshooting, Help Desk, Ticket Management`
            },
            suggestions: {
                id: [
                    { msg: "Project apa yang pernah dibuat?", label: "Lihat Project" },
                    { msg: "Bisa buat website / aplikasi?", label: "Jasa Pembuatan" },
                    { msg: "Cita-cita Help Desk Manager?", label: "Help Desk Support" }
                ]
            }
        },
        {
            id: 'skills_helpdesk',
            context: 'skills_helpdesk',
            patterns: [/help\s*desk/, /it\s*support/, /support\s*manager/, /troubleshoot/, /problem\s*solving/],
            response: {
                id: `👨‍💼 **Aspirasi & Minat: IT Help Desk Support Manager**\n\n` +
                    `Selain coding, Nawaf memiliki minat mendalam pada **IT Support & Problem Solving** dengan visi menjadi **Help Desk Support Manager** profesional.\n\n` +
                    `**Kekuatan & Pendekatan:**\n` +
                    `• Analisis & troubleshooting masalah teknis (hardware, software, jaringan dasar)\n` +
                    `• Kemampuan komunikasi yang ramah, jelas, dan solutif kepada end-user\n` +
                    `• Pemahaman alur eskalasi tiket dan kepuasan pengguna (SLA)\n` +
                    `• Penguasaan teknis software development yang mempermudah koordinasi dengan tim teknis 🎯`,
                en: `👨‍💼 **Career Aspiration: IT Help Desk Support Manager**\n\nNawaf is passionate about IT Support and Problem Solving, aiming to become a professional Help Desk Support Manager who leads technical support teams effectively.`
            },
            suggestions: {
                id: [
                    { msg: "Ceritakan tentang profil Nawaf", label: "Tentang Nawaf" },
                    { msg: "Skill teknologi apa saja?", label: "Tech Stack" },
                    { msg: "Hubungi Nawaf", label: "Kontak" }
                ]
            }
        },

        // --- 4. SERVICES, HIRE & PRICING ---
        {
            id: 'services_hire',
            context: 'services_hire',
            patterns: [/jasa/, /bisa\s*bikin/, /bisa\s*buat/, /order/, /pesan/, /sewa/, /hire/, /freelance/, /kerjasama/, /kolaborasi/, /buatkan\s*web/],
            response: {
                id: `💼 **Layanan & Jasa yang Disediakan Nawaf:**\n\n` +
                    `1. 🌐 **Pembuatan Website:** Landing Page, Toko Online/E-commerce, Company Profile, Web App interaktif.\n` +
                    `2. 📱 **Pengembangan Aplikasi Android:** Aplikasi mobile berbasis Kotlin & Android Studio.\n` +
                    `3. 🎨 **Desain UI/UX:** Prototipe interaktif & mockup di Figma yang siap didevelop.\n` +
                    `4. 🛠️ **Konsultasi IT & Troubleshooting:** Solusi teknis dan implementasi sistem.\n\n` +
                    `Tertarik berkolaborasi? Anda bisa langsung kirim pesan melalui [Form Kontak](#contact) atau WhatsApp **+62 882-3938-6759**! 🤝`,
                en: `💼 **Services Offered by Nawaf:**\n\n1. 🌐 **Web Development:** Landing pages, online stores, interactive web apps.\n2. 📱 **Mobile Apps:** Android app development using Kotlin.\n3. 🎨 **UI/UX Design:** Interactive prototypes & mockups in Figma.\n\nFeel free to reach out via the [Contact Form](#contact) or WhatsApp!`
            },
            suggestions: {
                id: [
                    { msg: "Berapa harga / estimasi biaya?", label: "Estimasi Biaya" },
                    { msg: "Bagaimana cara kontak Nawaf?", label: "Kontak WhatsApp" },
                    { msg: "Lihat contoh project", label: "Lihat Project" }
                ]
            }
        },
        {
            id: 'pricing_cost',
            context: 'pricing_cost',
            patterns: [/harga/, /biaya/, /tarif/, /cost/, /price/, /budget/, /fee/, /bayar/, /mahal/, /murah/, /rp/, /rupiah/],
            response: {
                id: `💰 **Estimasi Biaya & Harga Proyek:**\n\n` +
                    `Biaya pengerjaan proyek bersifat **sangat fleksibel dan terjangkau**, disesuaikan dengan:\n` +
                    `• Kompleksitas fitur dan jumlah halaman\n` +
                    `• Kebutuhan integrasi backend / database / API\n` +
                    `• Timeline pengerjaan (deadline)\n\n` +
                    `💡 **Konsultasi Gratis!** Silakan diskusikan kebutuhan Anda langsung dengan Nawaf via WhatsApp **+62 882-3938-6759** atau email **nawaf52626@gmail.com** untuk penawaran terbaik! ✨`,
                en: `💰 **Pricing & Rates:**\n\nProject pricing is flexible and tailored to your project's scope, feature complexity, and deadline. Free consultation is available via email or WhatsApp!`
            },
            suggestions: {
                id: [
                    { msg: "Layanan apa saja yang bisa dibuat?", label: "Layanan" },
                    { msg: "Bagaimana cara kontak Nawaf?", label: "Kontak" }
                ]
            }
        },

        // --- 5. CONTACT, LOCATION & SOCIAL ---
        {
            id: 'contact_info',
            context: 'contact_info',
            patterns: [/kontak/, /contact/, /hubungi/, /email/, /telepon/, /phone/, /whatsapp/, /wa/, /nomor/, /alamat/, /lokasi/, /dimana/, /tinggal/],
            response: {
                id: `📫 **Informasi Kontak Nawaf Gadi Alfatih:**\n\n` +
                    `📧 **Email:** [nawaf52626@gmail.com](mailto:nawaf52626@gmail.com)\n` +
                    `📱 **Telepon / WhatsApp:** [+62 882-3938-6759](https://wa.me/6288239386759)\n` +
                    `📍 **Lokasi:** Kroya, Cilacap, Jawa Tengah, Indonesia\n` +
                    `⏰ **Jam Aktif:** 08:00 - 22:00 WIB\n\n` +
                    `Anda juga bisa langsung mengisi pesan di [Form Kontak](#contact) pada halaman ini! 💬`,
                en: `📫 **Contact Nawaf Gadi Alfatih:**\n\n📧 **Email:** nawaf52626@gmail.com\n📱 **Phone/WhatsApp:** +62 882-3938-6759\n📍 **Location:** Kroya, Cilacap, Central Java, Indonesia\n\nOr send a message via the [Contact Form](#contact)!`
            },
            suggestions: {
                id: [
                    { msg: "Apa akun media sosial Nawaf?", label: "Sosial Media" },
                    { msg: "Bisa minta CV / Resume?", label: "Minta CV" },
                    { msg: "Layanan apa saja yang disediakan?", label: "Layanan" }
                ]
            }
        },
        {
            id: 'social_media',
            context: 'social_media',
            patterns: [/sosial\s*media/, /social\s*media/, /instagram/, /ig/, /github/, /linkedin/, /twitter/, /x/, /sosmed/],
            response: {
                id: `🌐 **Akun Sosial Media Resmi Nawaf:**\n\n` +
                    `🐙 **GitHub:** [github.com/nawafgadi](https://github.com/nawafgadi)\n` +
                    `💼 **LinkedIn:** [Nawaf Gadi Al Fatih](https://www.linkedin.com/in/nawaf-gadi-al-fatih-904539346/)\n` +
                    `📸 **Instagram:** [@nwfgal_](https://www.instagram.com/nwfgal_/)\n` +
                    `🐦 **X / Twitter:** [@NawafgadiA65406](https://x.com/NawafgadiA65406)\n\n` +
                    `Yuk connect dan follow untuk update proyek terbaru! 🚀`,
                en: `🌐 **Official Social Media:**\n\n🐙 GitHub: [github.com/nawafgadi](https://github.com/nawafgadi)\n💼 LinkedIn: [Nawaf Gadi Al Fatih](https://www.linkedin.com/in/nawaf-gadi-al-fatih-904539346/)\n📸 Instagram: [@nwfgal_](https://www.instagram.com/nwfgal_/)\n🐦 X/Twitter: [@NawafgadiA65406](https://x.com/NawafgadiA65406)`
            },
            suggestions: {
                id: [
                    { msg: "Bagaimana cara kontak langsung?", label: "Kontak" },
                    { msg: "Lihat proyek GitHub", label: "Proyek GitHub" }
                ]
            }
        },
        {
            id: 'cv_resume',
            context: 'cv_resume',
            patterns: [/cv/, /resume/, /curriculum\s*vitae/, /biodata\s*lengkap/, /lamaran/],
            response: {
                id: `📄 **Curriculum Vitae (CV) & Resume:**\n\n` +
                    `Portofolio online lengkap dapat langsung diakses di website ini. Untuk dokumen CV formal format PDF (untuk keperluan rekrutmen, magang, atau freelance), Anda dapat meminta langsung via email **nawaf52626@gmail.com** atau WhatsApp! 📬`,
                en: `📄 **CV & Resume:**\n\nFor a formal PDF Resume/CV for job or internship opportunities, feel free to request it directly at **nawaf52626@gmail.com**!`
            },
            suggestions: {
                id: [
                    { msg: "Skill apa saja yang dikuasai?", label: "Skill" },
                    { msg: "Hubungi via email", label: "Email Nawaf" }
                ]
            }
        },

        // --- 6. ABOUT & BIO ---
        {
            id: 'about_bio',
            context: 'about_bio',
            patterns: [/siapa\s*(nawaf|kamu)/, /tentang\s*nawaf/, /profil/, /biodata/, /sekolah/, /smk/, /rpl/, /jurusan/, /umur/, /pengalaman/],
            response: {
                id: `👋 **Tentang Nawaf Gadi Alfatih:**\n\n` +
                    `Nawaf adalah siswa jurusan **Rekayasa Perangkat Lunak (RPL)** asal Kroya, Cilacap, Jawa Tengah. Ia memiliki pengalaman **2+ tahun** dan telah menyelesaikan **20+ proyek** dalam pengembangan website, aplikasi Android, dan kecerdasan buatan.\n\n` +
                    `💡 **Visi & Passion:** Fokus pada penciptaan solusi digital yang berdampak nyata serta bercita-cita menjadi **Help Desk Support Manager** yang profesional. 🎯\n\n` +
                    `Baca selengkapnya di bagian [Tentang Saya](#about)!`,
                en: `👋 **About Nawaf Gadi Alfatih:**\n\nNawaf is a Software Engineering (RPL) student from Kroya, Central Java. With **2+ years of experience** and **20+ completed projects**, he specializes in Web & Android development, with strong aspirations to become a professional **Help Desk Support Manager**.`
            },
            suggestions: {
                id: [
                    { msg: "Project apa saja yang dibuat?", label: "Lihat Project" },
                    { msg: "Skill teknologi apa yang dikuasai?", label: "Lihat Skill" },
                    { msg: "Bagaimana cara kontak Nawaf?", label: "Kontak" }
                ]
            }
        },

        // --- 7. CHIT-CHAT, GREETINGS & CASUAL ---
        {
            id: 'greetings',
            context: 'greetings',
            patterns: [/halo/, /hai/, /hello/, /hi\b/, /hey/, /pagi/, /siang/, /sore/, /malam/, /assalamu/],
            response: {
                id: `Halo! Senang bertemu dengan Anda. 😊 Ada yang bisa saya bantu tentang portofolio, proyek, keahlian, atau kontak Nawaf?`,
                en: `Hello! Nice to meet you. 😊 How can I assist you with Nawaf's projects, skills, or contact info?`,
                ar: `مرحباً بك! يسعدني التحدث معك. 😊 كيف يمكنني مساعدتك؟`,
                zh: `您好！很高兴为您服务。😊 有什么我可以帮您的？`
            },
            suggestions: {
                id: [
                    { msg: "Ceritakan tentang Nawaf", label: "Tentang Nawaf" },
                    { msg: "Project apa yang pernah dibuat?", label: "Lihat Project" },
                    { msg: "Skill apa yang dikuasai?", label: "Lihat Skill" }
                ]
            }
        },
        {
            id: 'thanks',
            context: 'thanks',
            patterns: [/terima\s*kasih/, /makasih/, /thanks/, /thank\s*you/, /tq/, /thx/, /syukron/, /nuhun/],
            response: {
                id: `Sama-sama! Senang sekali bisa membantu Anda. Jika ada pertanyaan lain mengenai proyek atau ingin berkolaborasi dengan Nawaf, jangan ragu untuk bertanya ya! 😊✨`,
                en: `You're very welcome! Glad I could help. Feel free to ask anytime if you need more details about Nawaf's work! 🌟`
            },
            suggestions: {
                id: [
                    { msg: "Bagaimana cara kontak Nawaf?", label: "Kontak Nawaf" },
                    { msg: "Lihat portofolio di bagian Karya", label: "Lihat Karya" }
                ]
            }
        },
        {
            id: 'compliment',
            context: 'compliment',
            patterns: [/pintar/, /cerdas/, /keren/, /hebat/, /bagus/, /mantap/, /cool/, /awesome/, /smart/],
            response: {
                id: `Terima kasih banyak atas apresiasinya! 😄 Semua ini berkat dedikasi dan kerja keras Nawaf dalam belajar software development dan kecerdasan buatan. Semoga harimu menyenangkan! 🚀`,
                en: `Thank you so much! 😄 That's all thanks to Nawaf's continuous dedication to learning software development and AI. Have an amazing day! 🚀`
            },
            suggestions: {
                id: [
                    { msg: "Project apa yang paling baru?", label: "Project Terbaru" },
                    { msg: "Hubungi Nawaf untuk kolaborasi", label: "Kolaborasi" }
                ]
            }
        },
        {
            id: 'creator',
            context: 'creator',
            patterns: [/siapa\s*(yang\s*bikin|pembuat|creator|owner)/, /era\s*ai/, /bot/],
            response: {
                id: `Saya **ERA AI**, asisten cerdas yang dibuat khusus oleh **Nawaf Gadi Alfatih** untuk memandu pengunjung website portofolio ini. 🤖💻`,
                en: `I am **ERA AI**, an intelligent assistant built by **Nawaf Gadi Alfatih** to guide visitors across this portfolio! 🤖💻`
            },
            suggestions: {
                id: [
                    { msg: "Ceritakan tentang Nawaf", label: "Tentang Nawaf" },
                    { msg: "Lihat proyek unggulan", label: "Proyek" }
                ]
            }
        },
        {
            id: 'farewell',
            context: 'farewell',
            patterns: [/bye/, /dadah/, /sampai\s*jumpa/, /selamat\s*tinggal/, /see\s*you/],
            response: {
                id: `Sampai jumpa! Terima kasih telah berkunjung ke portofolio Nawaf. Semoga harimu menyenangkan dan sukses selalu! 👋✨`,
                en: `Goodbye! Thanks for visiting Nawaf's portfolio. Have a wonderful day ahead! 👋✨`
            },
            suggestions: {
                id: [
                    { msg: "Halo!", label: "Mulai Lagi" }
                ]
            }
        }
    ];

    function smartNLU(input, lang) {
        const lower = input.toLowerCase().trim();
        let bestMatch = null;
        let highestScore = 0;

        for (let i = 0; i < SMART_KNOWLEDGE.length; i++) {
            const entry = SMART_KNOWLEDGE[i];
            let score = 0;

            for (let j = 0; j < entry.patterns.length; j++) {
                const pat = entry.patterns[j];
                if (pat.test(lower)) {
                    score += 15;
                    const match = lower.match(pat);
                    if (match && match[0]) {
                        score += match[0].length * 2;
                    }
                }
            }

            if (score > highestScore) {
                highestScore = score;
                bestMatch = entry;
            }
        }

        if (bestMatch && highestScore > 0) {
            const reply = (bestMatch.response[lang] || bestMatch.response.id || bestMatch.response.en);
            const suggs = (bestMatch.suggestions && (bestMatch.suggestions[lang] || bestMatch.suggestions.id || bestMatch.suggestions.en)) || null;
            return { reply, suggestions: suggs, context: bestMatch.context };
        }

        // Fallback: search in rendered page text
        const pageText = (document.body.innerText || '').toLowerCase();
        if (lower.length > 3 && pageText.includes(lower)) {
            return {
                reply: `Berdasarkan isi website, informasi mengenai "${input}" ada di halaman ini. Anda dapat menelusuri bagian [Karya & Proyek](#work), [Tentang Saya](#about), atau [Kontak](#contact) untuk detail lengkap. 📌`,
                suggestions: [
                    { msg: "Ceritakan tentang Nawaf", label: "Tentang Nawaf" },
                    { msg: "Project apa saja yang dibuat?", label: "Daftar Project" },
                    { msg: "Bagaimana cara kontak?", label: "Kontak" }
                ],
                context: 'default'
            };
        }

        // Default smart fallback
        const defaultResponses = {
            id: `Saya bisa membantu Anda dengan berbagai topik tentang Nawaf:\n` +
                `• **Proyek:** Kartu Tani, Plazio E-commerce, CBPR AI, Web Tiket, Kasir Mobile, dll.\n` +
                `• **Keahlian:** UI/UX Design, React, Python, Kotlin, Laravel, Help Desk IT\n` +
                `• **Layanan & Harga:** Pembuatan website, aplikasi Android, UI/UX\n` +
                `• **Kontak & Lokasi:** Email, WhatsApp, dan Sosial Media\n\n` +
                `Silakan pilih topik di bawah atau ketik pertanyaan Anda! 😊`,
            en: `I can assist you with:\n` +
                `• **Projects:** Kartu Tani, Plazio, CBPR AI, Web Tiket, POS Mobile\n` +
                `• **Skills:** UI/UX, React, Python, Kotlin, Help Desk IT\n` +
                `• **Services & Rates:** Web & mobile app development\n` +
                `• **Contact & Socials:** Email, WhatsApp, and GitHub\n\n` +
                `Feel free to pick a topic below or type your question! 😊`
        };

        return {
            reply: defaultResponses[lang] || defaultResponses.id,
            suggestions: [
                { msg: "Ceritakan tentang Nawaf", label: "Tentang Nawaf" },
                { msg: "Project unggulan apa saja?", label: "Project Unggulan" },
                { msg: "Skill teknologi apa yang dikuasai?", label: "Skill & Tech" }
            ],
            context: 'default'
        };
    }

    function checkPythonAPI() {
        return fetch(PYTHON_API_URL + '/health', { method: 'GET' })
            .then(function(res) { return res.ok; })
            .catch(function() { return false; });
    }

    function sendToPythonAPI(text) {
        return fetch(PYTHON_API_URL + '/chat', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ 
                message: text,
                language: currentLang
            })
        }).then(function(res) { return res.json(); });
    }

    function updateSuggestions(contextOrSuggestions) {
        let items = [];
        if (Array.isArray(contextOrSuggestions)) {
            items = contextOrSuggestions;
        } else {
            items = [
                { msg: 'Ceritakan tentang Nawaf', label: 'Tentang Nawaf' },
                { msg: 'Project apa yang pernah dibuat?', label: 'Project' },
                { msg: 'Skill teknologi apa yang dikuasai?', label: 'Skill' }
            ];
        }

        let html = '';
        for (let i = 0; i < items.length; i++) {
            html += '<button class="suggestion-btn" data-msg="' + items[i].msg + '">' + items[i].label + '</button>';
        }
        chatSuggestions.innerHTML = html;
        chatSuggestions.style.display = 'flex';
    }

    function sendMessage() {
        const text = chatInput.value.trim();
        if (!text) return;

        addMessage(text, 'user');
        chatInput.value = '';
        chatSuggestions.style.display = 'none';

        showTyping();

        if (usePythonAPI) {
            sendToPythonAPI(text)
                .then(function(data) {
                    hideTyping();
                    if (data.success) {
                        addMessage(data.message, 'bot');
                        if (data.suggestions && data.suggestions.length) {
                            updateSuggestions(data.suggestions);
                        } else {
                            const localResult = smartNLU(text, currentLang);
                            updateSuggestions(localResult.suggestions);
                        }
                    } else {
                        const localResult = smartNLU(text, currentLang);
                        addMessage(localResult.reply, 'bot');
                        updateSuggestions(localResult.suggestions);
                    }
                })
                .catch(function() {
                    usePythonAPI = false;
                    const localResult = smartNLU(text, currentLang);
                    setTimeout(function() {
                        hideTyping();
                        addMessage(localResult.reply, 'bot');
                        updateSuggestions(localResult.suggestions);
                    }, smartDelay(localResult.reply));
                });
        } else {
            const localResult = smartNLU(text, currentLang);
            setTimeout(function() {
                hideTyping();
                addMessage(localResult.reply, 'bot');
                updateSuggestions(localResult.suggestions);
            }, smartDelay(localResult.reply));
        }
    }

    chatSend.addEventListener('click', sendMessage);
    chatInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') sendMessage();
    });

    chatSuggestions.addEventListener('click', function(e) {
        if (e.target.classList.contains('suggestion-btn')) {
            chatInput.value = e.target.dataset.msg;
            sendMessage();
        }
    });

    chatPanel.addEventListener('click', function(e) {
        const link = e.target.closest('.chat-nav-link');
        if (link) {
            const href = link.getAttribute('href');
            if (href && href.startsWith('#')) {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            }
        }
        if (e.target === chatPanel || e.target.classList.contains('chat-messages')) {
            chatInput.focus();
        }
    });

    checkPythonAPI().then(function(available) {
        if (available) {
            usePythonAPI = true;
            console.log('Python AI API connected!');
        } else {
            console.log('Using enhanced client-side ERA AI 2.0 engine');
        }
    });
})();
