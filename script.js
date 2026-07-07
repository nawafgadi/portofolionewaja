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
        selected_works: 'Karya Terpilih',
        works_description: 'Berikut adalah beberapa proyek yang telah saya kerjakan, mencakup berbagai aspek pengembangan web dan aplikasi. Setiap proyek mencerminkan komitmen saya terhadap kualitas, inovasi, dan solusi yang efektif.',
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
        selected_works: 'Selected works',
        works_description: 'Here are some projects I have worked on, covering various aspects of web and application development. Each project reflects my commitment to quality, innovation, and effective solutions.',
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
        selected_works: 'الأعمال المختارة',
        works_description: 'فيما يلي بعض المشاريع التي عملت عليها، تغطي جوانب مختلفة من تطوير الويب والتطبيقات. يعكس كل مشروع التزامي بالجودة والابتكار والحلول الفعالة.',
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
        selected_works: '精选作品',
        works_description: '以下是我完成的一些项目，涵盖Web和应用开发的各个方面。每个项目都反映了我对质量、创新和有效解决方案的承诺。',
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

// Load saved language (default: Indonesian)
let currentLang = localStorage.getItem('language') || 'id';
langToggle.textContent = currentLang.toUpperCase();

// Mark active language option
document.querySelectorAll('.lang-option').forEach(opt => {
    opt.classList.remove('active');
    if (opt.getAttribute('data-lang') === currentLang) {
        opt.classList.add('active');
    }
});

langToggle.addEventListener('click', () => {
    langDropdown.classList.toggle('active');
});

// Close dropdown when clicking outside
document.addEventListener('click', (e) => {
    if (!langDropdown.contains(e.target)) {
        langDropdown.classList.remove('active');
    }
});

langOptions.forEach(option => {
    option.addEventListener('click', () => {
        currentLang = option.getAttribute('data-lang');
        localStorage.setItem('language', currentLang);
        
        langOptions.forEach(opt => opt.classList.remove('active'));
        option.classList.add('active');
        langToggle.textContent = currentLang.toUpperCase();
        
        updateLanguage(currentLang);
        langDropdown.classList.remove('active');
    });
});

function updateLanguage(lang) {
    // Update elements with data-key attributes (main translation system)
    document.querySelectorAll('[data-key]').forEach(element => {
        const key = element.getAttribute('data-key');
        if (key && translations[lang] && translations[lang][key]) {
            element.textContent = translations[lang][key];
        }
    });
    
    // Update navigation links with data-{lang} attributes
    document.querySelectorAll('.nav-link').forEach(link => {
        const text = link.getAttribute(`data-${lang}`);
        if (text) {
            link.textContent = text;
        }
    });
    
    // Update input placeholders
    document.querySelectorAll('[data-placeholder-key]').forEach(element => {
        const key = element.getAttribute('data-placeholder-key');
        if (key && translations[lang] && translations[lang][key]) {
            element.placeholder = translations[lang][key];
        }
    });
}

// Initialize language
updateLanguage(currentLang);

// Mobile menu toggle
const navToggle = document.getElementById('nav-toggle');
const navMenu = document.getElementById('nav-menu');

navToggle.addEventListener('click', function() {
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
    });
});

// Active link highlighting
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (pageYOffset >= sectionTop - 150) {
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
        e.preventDefault();
        
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for animation
document.querySelectorAll('.work-item, .about-content, .contact-item').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'all 0.8s ease-out';
    observer.observe(el);
});

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

    function addMessage(text, sender, save) {
        save = save !== false;
        const msgDiv = document.createElement('div');
        msgDiv.className = 'chat-message ' + sender;
        msgDiv.innerHTML = 
            '<div class="message-content">' +
                '<p>' + text.replace(/\n/g, '<br>') + '</p>' +
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
            msgDiv.innerHTML = 
                '<div class="message-content">' +
                    '<p>' + msg.text.replace(/\n/g, '<br>') + '</p>' +
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

        addMessage(greeting + '! Saya ERA AI, asisten virtual yang dibuat oleh Nawaf Gadi Alfatih. Anda bisa bertanya apa saja tentang isi website ini, termasuk lokasi, proyek, skill, dan kontak. 😊', 'bot');
    }

    const hasHistory = loadHistory();
    if (!hasHistory) {
        const lastSeen = localStorage.getItem('nawaf_chat_seen');
        if (!lastSeen) setTimeout(function() { badge.classList.remove('hidden'); }, 3000);
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
        return Math.min(800 + text.length * 30, 3500);
    }

    function createPageKnowledge() {
        const sections = ['home', 'work', 'about', 'contact'];
        const knowledge = { pageText: '' };

        sections.forEach(function(id) {
            const section = document.getElementById(id);
            if (section) {
                knowledge[id] = section.innerText.trim().replace(/\s+/g, ' ');
                knowledge.pageText += ' ' + knowledge[id].toLowerCase();
            }
        });

        const projects = [];
        document.querySelectorAll('.work-item .work-title').forEach(function(el) {
            const text = el.textContent.trim();
            if (text) projects.push(text);
        });
        if (projects.length) {
            knowledge.projects = projects.join(', ');
            knowledge.pageText += ' ' + knowledge.projects.toLowerCase();
        }

        return knowledge;
    }

    const pageKnowledge = createPageKnowledge();

    function answerFromPageContent(input) {
        const lower = input.toLowerCase();

        if (/lokasi|alamat|tempat|kroya|cilacap/.test(lower)) {
            return 'Berdasarkan website, Nawaf berada di Kroya, Cilacap, Jawa Tengah. Informasi kontak lengkap ada di bagian Contact.';
        }

        if (/email|e-mail|mail|telepon|phone|whatsapp|wa|kontak|hubungi/.test(lower)) {
            return 'Kontak Nawaf di website ini: Email: nawaf52626@gmail.com, Telepon: +62 882-3938-6759, Lokasi: Kroya, Cilacap, Jawa Tengah.';
        }

        if (/skill|keahlian|bisa|javascript|react|html|css|kotlin|python|laravel|android|ui ux|ui\/ux|design|figma|canva/.test(lower)) {
            return 'Website ini menyebutkan bahwa Nawaf menguasai UI/UX Design, Frontend Development, JavaScript, React, HTML & CSS, Kotlin, Python, Laravel, Figma, dan Canva.';
        }

        if (/project|proyek|karya|portofolio|web|aplikasi|apps|website|bank sampah|web tiket|idulfitri|ecashier|pertanian|bank awan|pos|luxe/.test(lower)) {
            return 'Beberapa project Nawaf di website ini: Web Tiket, Bank Sampah, Ucapan Idulfitri, E-Cashier, Pertanian, Bank Awan, aplikasi Prediksi Stunting, POS mobile, dan Luxe mobile.';
        }

        if (/siapa|tentang|profil|biodata|diri|nawaf|nama/.test(lower)) {
            return 'Nawaf Gadi Alfatih adalah siswa Rekayasa Perangkat Lunak (RPL) fokus pada pengembangan web dan aplikasi Android, dengan minat dalam IT Support dan problem solving.';
        }

        // Search text in page content for exact matches
        const pageText = pageKnowledge.pageText || '';
        if (pageText.includes(lower)) {
            if (lower.includes('nawaf')) {
                return 'Nawaf adalah siswa RPL yang membuat website ini. Detail tentang dirinya ada di bagian About.';
            }
            if (lower.includes('contact') || lower.includes('kontak') || lower.includes('email') || lower.includes('telepon')) {
                return 'Bagian Contact menampilkan email, telepon, dan lokasi Nawaf di Kroya, Cilacap.';
            }
            if (lower.includes('project') || lower.includes('portofolio')) {
                return 'Website menampilkan portofolio dengan beberapa project web development dan UI/UX design.';
            }
        }

        return null;
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

    // ERA AI Response Database
    const responseDB = [
        {
            keywords: ['tentang','nawaf','siapa','profile','profil','biodata','diri','orang'],
            responses: [
                'Nawaf Gadi Alfatih adalah siswa Rekayasa Perangkat Lunak (RPL) yang fokus pada pengembangan web dan aplikasi Android. Ia memiliki passion di bidang IT Support dan bercita-cita menjadi Help Desk Support Manager. 🎯',
                'Nawaf adalah seorang developer muda berbakat dari Kroya, Cilacap. Dengan 2+ tahun pengalaman dan 20+ project, ia terus berkembang di bidang teknologi. 🚀',
                'Kenalan yuk! Nawaf Gadi Alfatih - siswa RPL, web & mobile developer, dan calon Help Desk Support Manager profesional. 💻'
            ]
        },
        {
            keywords: ['project','proyek','karya','portofolio','web','aplikasi','apps','website','hasil kerja'],
            responses: [
                'Nawaf telah mengerjakan berbagai project menarik:\n\n• Web Tiket - Sistem pemesanan tiket online\n• Bank Sampah - Manajemen sampah digital\n• Ucapan Idulfitri - Web greeting interaktif\n• E-Cashier, Pertanian, Bank Awan - UI/UX Design\n• Prediksi Stunting - Aplikasi prediksi kesehatan\n\nSemua project menunjukkan komitmen pada kualitas! ⭐',
                'Beberapa project unggulan Nawaf:\n🎫 Web Tiket\n♻️ Bank Sampah\n🌙 Ucapan Idulfitri\n💳 E-Cashier (UI/UX)\n🌾 Pertanian (UI/UX)\n☁️ Bank Awan (UI/UX)\n📊 Prediksi Stunting\n\nIngin lihat detailnya? Cek bagian Work! 🔍'
            ]
        },
        {
            keywords: ['skill','keahlian','bisa','teknologi','tech','stack','bahasa pemrograman','framework','tool','tools'],
            responses: [
                'Skill teknologi Nawaf:\n\n🎨 UI/UX Design\n💻 Frontend Development\n⚡ JavaScript & React\n📄 HTML & CSS\n📱 Kotlin (Android)\n🐍 Python\n🎨 Figma & Canva\n\nDan masih terus belajar! 📚',
                'Tech stack yang dikuasai Nawaf:\n• Frontend: HTML, CSS, JavaScript, React\n• Mobile: Kotlin, Android Studio\n• Backend: Laravel, Python\n• Design: Figma, Canva\n• Lainnya: Git, problem solving\n\nVersatile banget kan? 😎'
            ]
        },
        {
            keywords: ['kontak','contact','hubungi','email','telepon','phone','nomor','alamat','lokasi','where','address'],
            responses: [
                'Hubungi Nawaf di:\n\n📧 Email: nawaf52626@gmail.com\n📱 Telepon: +62 882-3938-6759\n📍 Lokasi: Kroya, Cilacap, Jawa Tengah\n\nAtau kirim pesan lewat form Contact di website ini! 💬',
                'Mau kolaborasi? Hubungi Nawaf:\n✉️ nawaf52626@gmail.com\n☎️ +62 882-3938-6759\n📍 Kroya, Cilacap, Jateng\n\nRespons cepat di jam kerja! ⚡'
            ]
        },
        {
            keywords: ['email','e-mail','mail'],
            responses: ['Email Nawaf: nawaf52626@gmail.com 📧']
        },
        {
            keywords: ['telepon','phone','hp','whatsapp','wa'],
            responses: ['Nomor telepon Nawaf: +62 882-3938-6759 📱']
        },
        {
            keywords: ['lokasi','location','tempat','tinggal','daerah','alamat','kroya','cilacap'],
            responses: ['Nawaf berada di Kroya, Cilacap, Jawa Tengah. Asli orang Jawa Tengah nih! 🏠']
        },
        {
            keywords: ['sekolah','school','pelajar','siswa','smk','rpl','jurusan','kelas'],
            responses: ['Nawaf adalah siswa jurusan Rekayasa Perangkat Lunak (RPL). Belajar pemrograman sejak SMK dan terus mengasah skill! 🎓']
        },
        {
            keywords: ['pengalaman','experience','lama','tahun','berapa','karir','career'],
            responses: ['Nawaf memiliki pengalaman 2+ tahun di bidang pengembangan software dan telah menyelesaikan 20+ project. Perjalanan yang luar biasa! 🚀']
        },
        {
            keywords: ['laravel','php','backend'],
            responses: ['Nawaf memiliki pengalaman mengerjakan project berbasis Laravel. Framework PHP favorit untuk project skala menengah! 🔧']
        },
        {
            keywords: ['android','kotlin','mobile','apk','play store'],
            responses: ['Nawaf mengembangkan aplikasi Android menggunakan Android Studio dan Kotlin. Siap bantu buat aplikasi mobile kamu! 📱']
        },
        {
            keywords: ['help desk','it support','support','manager'],
            responses: ['Nawaf bercita-cita menjadi Help Desk Support Manager profesional. Dengan background IT yang kuat, ia siap memimpin tim support dengan baik! 👨‍💼']
        },
        {
            keywords: ['ui ux','ui/ux','design','desain','figma','canva','mockup','wireframe'],
            responses: ['Nawaf mahir dalam UI/UX Design menggunakan Figma dan Canva. Setiap desain dibuat dengan memperhatikan user experience terbaik! 🎨']
        },
        {
            keywords: ['react','frontend','javascript','js','html','css'],
            responses: ['Frontend stack Nawaf: React, JavaScript ES6+, HTML5, CSS3, dan responsive design. Modern dan clean! ⚡']
        },
        {
            keywords: ['python','django','flask','data'],
            responses: ['Nawaf juga menguasai Python untuk berbagai keperluan: scripting, data processing, dan backend development. 🐍']
        },
        {
            keywords: ['harga','biaya','cost','price','fee','bayar','mahal','murah','budget','rp','rupiah'],
            responses: ['Untuk informasi harga dan budget project, silakan hubungi Nawaf langsung via email atau WhatsApp. Setiap project memiliki estimasi berbeda sesuai kompleksitasnya! 💰']
        },
        {
            keywords: ['hire','kerja','freelance','part time','full time','job','lowongan','rekrut'],
            responses: ['Nawaf terbuka untuk kesempatan freelance, part-time, atau kolaborasi project. Hubungi via email untuk diskusi lebih lanjut! 🤝']
        },
        {
            keywords: ['jam','time','waktu','kapan','fast','cepat','respons'],
            responses: ['Nawaf biasanya aktif dan merespons pesan di jam 08:00 - 22:00 WIB. Untuk urgen, silakan telepon atau WhatsApp! ⏰']
        },
        {
            keywords: ['sosial media','social media','instagram','linkedin','github','twitter','x','sosmed','follow'],
            responses: ['Follow Nawaf di sosial media:\n\n📸 Instagram: @nwfgal_\n💼 LinkedIn: Nawaf Gadi Al Fatih\n🐙 GitHub: @nawafgadi\n🐦 X/Twitter: @NawafgadiA65406\n\nJangan lupa connect ya! 🔗']
        },
        {
            keywords: ['cv','resume','portofolio','portfolio','lamaran','apply'],
            responses: ['Portofolio lengkap Nawaf ada di website ini! Untuk CV/resume formal, silakan request via email. Siap kirim dalam format PDF! 📄']
        },
        {
            keywords: ['halo','hai','hello','hi','hey','selamat'],
            responses: [
                'Hai! Ada yang bisa saya bantu? 😊',
                'Halo! Saya ERA AI siap membantu. Mau tanya apa nih? 🤖',
                'Hello! Welcome to Nawaf portfolio. How can I help you today? 🌟'
            ]
        },
        {
            keywords: ['terima kasih','thanks','thank you','makasih','tq','thx'],
            responses: [
                'Sama-sama! Senang bisa membantu. Jika ada pertanyaan lain, silakan tanya saja. 😊',
                'With pleasure! Jangan ragu untuk kembali bertanya kapan saja. 👍',
                'You are welcome! Have a great day! 🌟'
            ]
        },
        {
            keywords: ['bye','goodbye','dadah','sampai jumpa','selamat tinggal','see you'],
            responses: [
                'Sampai jumpa! Semoga harimu menyenangkan. 👋',
                'Bye! Thanks for visiting Nawaf portfolio. Have a wonderful day! 🌈',
                'Dadah! Jangan lupa kembali lagi ya. Take care! 💫'
            ]
        },
        {
            keywords: ['bantu','help','bantuan','gimana','how','cara'],
            responses: [
                'Saya bisa bantu jawab tentang:\n• Siapa Nawaf\n• Project yang pernah dibuat\n• Skill & teknologi\n• Cara kontak\n• Informasi lainnya\n\nTanya aja! 🤗',
                'Butuh bantuan? Coba ketik keyword seperti: tentang, project, skill, kontak, email, atau lokasi. Saya siap bantu! 💪'
            ]
        },
        {
            keywords: ['dibuat','buat','creator','creator','owner','punya','milik','siapa yang buat'],
            responses: [
                'Saya ERA AI, asisten virtual yang dibuat oleh Nawaf Gadi Alfatih. Nawaf adalah developer muda dari Kroya, Cilacap yang fokus pada web dan mobile development. 🤖✨',
                'ERA AI ini dibuat oleh Nawaf Gadi Alfatih! Beliau adalah siswa RPL dengan passion di bidang IT Support dan software development. 💻'
            ]
        }
    ];

    const defaultResponses = [
        'Maaf, saya belum memahami pertanyaan tersebut. Anda bisa bertanya tentang: Nawaf, project, skill, kontak, pengalaman, atau teknologi yang dikuasai. 🤔',
        'Hmm, saya belum punya jawaban untuk itu. Coba tanya tentang:\n• Siapa Nawaf\n• Projectnya\n• Skill teknologi\n• Cara hubungi\n\nSaya siap bantu! 🙋',
        'Saya masih belajar nih! Saat ini saya bisa jawab tentang Nawaf, project, skill, dan kontak. Mau tanya yang mana? 😅'
    ];

    function findBestResponse(input) {
        const lower = input.toLowerCase();
        let bestMatch = null;
        let maxScore = 0;

        for (let i = 0; i < responseDB.length; i++) {
            const item = responseDB[i];
            let score = 0;
            for (let j = 0; j < item.keywords.length; j++) {
                if (lower.indexOf(item.keywords[j]) !== -1) {
                    score += item.keywords[j].length;
                }
            }
            if (score > maxScore) {
                maxScore = score;
                bestMatch = item;
            }
        }

        if (bestMatch) {
            const responses = bestMatch.responses;
            return responses[Math.floor(Math.random() * responses.length)];
        }

        return defaultResponses[Math.floor(Math.random() * defaultResponses.length)];
    }

    const suggestionSets = {
        default: [
            { msg: 'Ceritakan tentang Nawaf', label: 'Tentang Nawaf' },
            { msg: 'Project apa yang pernah dibuat?', label: 'Project' },
            { msg: 'Skill teknologi apa yang dikuasai?', label: 'Skill' }
        ],
        about: [
            { msg: 'Project apa yang pernah dibuat?', label: 'Lihat Project' },
            { msg: 'Skill teknologi apa yang dikuasai?', label: 'Lihat Skill' },
            { msg: 'Bagaimana cara kontak?', label: 'Kontak' }
        ],
        project: [
            { msg: 'Ceritakan tentang Nawaf', label: 'Tentang Nawaf' },
            { msg: 'Skill teknologi apa yang dikuasai?', label: 'Lihat Skill' },
            { msg: 'Berapa harga project?', label: 'Harga' }
        ],
        skill: [
            { msg: 'Project apa yang pernah dibuat?', label: 'Lihat Project' },
            { msg: 'Bagaimana cara kontak?', label: 'Kontak' },
            { msg: 'Pengalaman kerja berapa lama?', label: 'Pengalaman' }
        ],
        contact: [
            { msg: 'Ceritakan tentang Nawaf', label: 'Tentang Nawaf' },
            { msg: 'Project apa yang pernah dibuat?', label: 'Lihat Project' },
            { msg: 'Jam operasional?', label: 'Jam Operasional' }
        ],
        creator: [
            { msg: 'Siapa yang membuat ERA AI?', label: 'Siapa Creator?' },
            { msg: 'Ceritakan tentang Nawaf', label: 'Tentang Nawaf' },
            { msg: 'Project apa yang pernah dibuat?', label: 'Lihat Project' }
        ]
    };

    function updateSuggestions(context) {
        const set = suggestionSets[context] || suggestionSets.default;
        let html = '';
        for (let i = 0; i < set.length; i++) {
            html += '<button class="suggestion-btn" data-msg="' + set[i].msg + '">' + set[i].label + '</button>';
        }
        chatSuggestions.innerHTML = html;
    }

    function detectContext(input) {
        const lower = input.toLowerCase();
        if (lower.match(/dibuat|buat|creator|owner|punya|milik|siapa yang buat/)) return 'creator';
        if (lower.match(/nawaf|siapa|tentang|profile/)) return 'about';
        if (lower.match(/project|proyek|karya|web|aplikasi/)) return 'project';
        if (lower.match(/skill|teknologi|bisa|tech/)) return 'skill';
        if (lower.match(/kontak|hubungi|email|telepon|lokasi/)) return 'contact';
        return 'default';
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
                        if (data.suggestions) {
                            let html = '';
                            for (let i = 0; i < data.suggestions.length; i++) {
                                html += '<button class="suggestion-btn" data-msg="' + data.suggestions[i].msg + '">' + data.suggestions[i].label + '</button>';
                            }
                            chatSuggestions.innerHTML = html;
                            chatSuggestions.style.display = 'flex';
                        }
                    } else {
                        addMessage(data.error || 'Maaf, terjadi kesalahan. Silakan coba lagi.', 'bot');
                    }
                })
                .catch(function() {
                    usePythonAPI = false;
                    const pageReply = answerFromPageContent(text);
                    const reply = pageReply || findBestResponse(text);
                    setTimeout(function() {
                        hideTyping();
                        addMessage(reply, 'bot');
                        const context = detectContext(text);
                        updateSuggestions(context);
                        chatSuggestions.style.display = 'flex';
                    }, smartDelay(reply));
                });
        } else {
            const pageReply = answerFromPageContent(text);
            const reply = pageReply || findBestResponse(text);
            setTimeout(function() {
                hideTyping();
                addMessage(reply, 'bot');
                const context = detectContext(text);
                updateSuggestions(context);
                chatSuggestions.style.display = 'flex';
            }, smartDelay(reply));
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
        if (e.target === chatPanel || e.target.classList.contains('chat-messages')) {
            chatInput.focus();
        }
    });

    checkPythonAPI().then(function(available) {
        if (available) {
            usePythonAPI = true;
            console.log('Python API connected!');
        } else {
            console.log('Using local fallback responses');
        }
    });
})();
