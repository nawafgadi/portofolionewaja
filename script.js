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

// Form submission (handled by Formspree, no custom JS needed)

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

// AI Chat Widget
(function() {
    const chatToggle = document.getElementById('chat-toggle');
    const chatPanel = document.getElementById('chat-panel');
    const chatClose = document.getElementById('chat-close');
    const chatInput = document.getElementById('chat-input');
    const chatSend = document.getElementById('chat-send');
    const chatMessages = document.getElementById('chat-messages');
    const chatSuggestions = document.getElementById('chat-suggestions');
    const chatIcon = document.getElementById('chat-icon');

    let isOpen = false;

    function toggleChat() {
        isOpen = !isOpen;
        chatPanel.classList.toggle('open', isOpen);
        chatToggle.classList.toggle('hidden', isOpen);
        if (isOpen) {
            chatInput.focus();
        }
    }

    chatToggle.addEventListener('click', toggleChat);
    chatClose.addEventListener('click', toggleChat);

    function getTime() {
        const now = new Date();
        return now.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' });
    }

    function addMessage(text, sender) {
        const msgDiv = document.createElement('div');
        msgDiv.className = `chat-message ${sender}`;
        msgDiv.innerHTML = `
            <div class="message-content">
                <p>${text}</p>
                <span class="message-time">${getTime()}</span>
            </div>
        `;
        chatMessages.appendChild(msgDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;
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

    const responses = {
        'tentang': 'Nawaf Gadi Alfatih adalah siswa Rekayasa Perangkat Lunak (RPL) yang fokus pada pengembangan web dan aplikasi Android. Ia memiliki passion di bidang IT Support dan bercita-cita menjadi Help Desk Support Manager.',
        'nawaf': 'Nawaf Gadi Alfatih adalah siswa Rekayasa Perangkat Lunak (RPL) yang fokus pada pengembangan web dan aplikasi Android. Ia memiliki passion di bidang IT Support dan bercita-cita menjadi Help Desk Support Manager.',
        'project': 'Nawaf telah mengerjakan berbagai project seperti: Web Tiket, Bank Sampah, Ucapan Idulfitri, E-Cashier (UI/UX), Pertanian (UI/UX), dan Bank Awan (UI/UX).',
        'proyek': 'Nawaf telah mengerjakan berbagai project seperti: Web Tiket, Bank Sampah, Ucapan Idulfitri, E-Cashier (UI/UX), Pertanian (UI/UX), dan Bank Awan (UI/UX).',
        'skill': 'Skill yang dikuasai Nawaf: UI/UX Design, Frontend Development, JavaScript, HTML & CSS, React, Kotlin, Python, Canva, dan Figma.',
        'skill teknologi': 'Skill yang dikuasai Nawaf: UI/UX Design, Frontend Development, JavaScript, HTML & CSS, React, Kotlin, Python, Canva, dan Figma.',
        'kontak': 'Anda bisa menghubungi Nawaf via: Email: nawaf52626@gmail.com | Telepon: +62 882-3938-6759 | Lokasi: Kroya, Cilacap, Jawa Tengah.',
        'contact': 'Anda bisa menghubungi Nawaf via: Email: nawaf52626@gmail.com | Telepon: +62 882-3938-6759 | Lokasi: Kroya, Cilacap, Jawa Tengah.',
        'email': 'Email Nawaf: nawaf52626@gmail.com',
        'telepon': 'Nomor telepon Nawaf: +62 882-3938-6759',
        'phone': 'Nomor telepon Nawaf: +62 882-3938-6759',
        'lokasi': 'Nawaf berada di Kroya, Cilacap, Jawa Tengah.',
        'location': 'Nawaf berada di Kroya, Cilacap, Jawa Tengah.',
        'sekolah': 'Nawaf adalah siswa jurusan Rekayasa Perangkat Lunak (RPL).',
        'sekolah': 'Nawaf adalah siswa jurusan Rekayasa Perangkat Lunak (RPL).',
        'pengalaman': 'Nawaf memiliki pengalaman 2+ tahun dan telah menyelesaikan 20+ project.',
        'experience': 'Nawaf memiliki pengalaman 2+ tahun dan telah menyelesaikan 20+ project.',
        'laravel': 'Nawaf memiliki pengalaman mengerjakan project berbasis Laravel.',
        'android': 'Nawaf mengembangkan aplikasi Android menggunakan Android Studio dan Kotlin.',
        'help desk': 'Nawaf bercita-cita menjadi Help Desk Support Manager profesional.',
        'it support': 'Nawaf memiliki minat besar di bidang IT Support dan problem solving.',
        'halo': 'Halo! Senang bertemu dengan Anda. Ada yang bisa saya bantu tentang Nawaf? 😊',
        'hai': 'Hai! Senang bertemu dengan Anda. Ada yang bisa saya bantu tentang Nawaf? 😊',
        'hello': 'Hello! Senang bertemu dengan Anda. Ada yang bisa saya bantu tentang Nawaf? 😊',
        'terima kasih': 'Sama-sama! Senang bisa membantu. Jika ada pertanyaan lain, silakan tanya saja. 😊',
        'thanks': 'Sama-sama! Senang bisa membantu. Jika ada pertanyaan lain, silakan tanya saja. 😊',
        'bye': 'Sampai jumpa! Semoga harimu menyenangkan. 👋',
        'selamat tinggal': 'Sampai jumpa! Semoga harimu menyenangkan. 👋',
    };

    function getResponse(input) {
        const lower = input.toLowerCase();
        for (const key in responses) {
            if (lower.includes(key)) {
                return responses[key];
            }
        }
        return 'Maaf, saya belum memahami pertanyaan tersebut. Anda bisa bertanya tentang: Nawaf, project, skill, kontak, pengalaman, atau teknologi yang dikuasai. 🤔';
    }

    function sendMessage() {
        const text = chatInput.value.trim();
        if (!text) return;

        addMessage(text, 'user');
        chatInput.value = '';
        chatSuggestions.style.display = 'none';

        showTyping();

        setTimeout(() => {
            hideTyping();
            const reply = getResponse(text);
            addMessage(reply, 'bot');
        }, 1500 + Math.random() * 1000);
    }

    chatSend.addEventListener('click', sendMessage);
    chatInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') sendMessage();
    });

    chatSuggestions.addEventListener('click', (e) => {
        if (e.target.classList.contains('suggestion-btn')) {
            chatInput.value = e.target.dataset.msg;
            sendMessage();
        }
    });
})();
