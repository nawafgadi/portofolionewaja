// Navbar scroll effect
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

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

        addMessage(greeting + '! Saya ERA AI, asisten virtual yang dibuat oleh Nawaf Gadi Alfatih. Ada yang bisa saya bantu? 😊', 'bot');
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

    function checkPythonAPI() {
        return fetch(PYTHON_API_URL + '/health', { method: 'GET' })
            .then(function(res) { return res.ok; })
            .catch(function() { return false; });
    }

    function sendToPythonAPI(text) {
        return fetch(PYTHON_API_URL + '/chat', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ message: text })
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
                    const reply = findBestResponse(text);
                    setTimeout(function() {
                        hideTyping();
                        addMessage(reply, 'bot');
                        const context = detectContext(text);
                        updateSuggestions(context);
                        chatSuggestions.style.display = 'flex';
                    }, smartDelay(reply));
                });
        } else {
            const reply = findBestResponse(text);
            const delay = smartDelay(reply);
            setTimeout(function() {
                hideTyping();
                addMessage(reply, 'bot');
                const context = detectContext(text);
                updateSuggestions(context);
                chatSuggestions.style.display = 'flex';
            }, delay);
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
