from flask import Flask, request, jsonify
from flask_cors import CORS
from datetime import datetime
import json
import os
import re
import random
import logging
import smtplib
import ssl
from email.message import EmailMessage

app = Flask(__name__)
CORS(app)  # Enable CORS for all domains

# Setup logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

# Ensure logs directory exists
os.makedirs('logs', exist_ok=True)

# Chat history storage (in production, use database)
HISTORY_FILE = 'logs/chat_history.json'
MAX_HISTORY = 100

EMAIL_HOST = os.environ.get('EMAIL_HOST', 'smtp.gmail.com')
EMAIL_PORT = int(os.environ.get('EMAIL_PORT', 587))
EMAIL_USER = os.environ.get('EMAIL_USER')
EMAIL_PASS = os.environ.get('EMAIL_PASS')
EMAIL_NOTIFY_TO = os.environ.get('EMAIL_NOTIFY_TO', EMAIL_USER)

class NawafAI:
    """Advanced AI Chatbot for Nawaf's Portfolio - Multilingual Support with Deep Knowledge"""
    
    def __init__(self):
        self.knowledge = self._load_knowledge()
    
    def _load_knowledge(self):
        """Load comprehensive knowledge dataset with rich metadata"""
        return [
            {
                'id': 'project_kartu_tani',
                'patterns': [r'kartu\s*tani', r'tani', r'pupuk\s*subsidi', r'smart\s*agriculture', r'petani'],
                'responses': {
                    'id': (
                        "🌾 **Project: Kartu Tani (Smart Agriculture System)**\n\n"
                        "Platform web digital berbasis **Python & Django** untuk digitalisasi manajemen kartu identitas petani dan pengawasan distribusi alokasi pupuk bersubsidi.\n\n"
                        "**Fitur Utama:**\n"
                        "• Registrasi & Onboarding Digital Petani (Farmer ID Card)\n"
                        "• Subsidy Allocation Management (Distribusi pupuk tepat sasaran)\n"
                        "• Transaction Monitoring Real-time untuk Pengecer & Dinas Pertanian\n"
                        "• Rekapitulasi Data Hasil Panen Komoditas\n\n"
                        "🔗 **Kode Sumber:** https://github.com/nawafgadi/kartu-tani"
                    ),
                    'en': (
                        "🌾 **Project: Kartu Tani (Indonesian Farmer Card System)**\n\n"
                        "A **Python/Django** web application built for digital farmer management and real-time monitoring of subsidized fertilizer distribution.\n\n"
                        "• Digital Farmer Onboarding & ID Verification\n"
                        "• Demand-Driven Fertilizer Subsidy Allocation\n"
                        "• Real-time Retailer & Ministry Transaction Monitoring\n\n"
                        "🔗 **Source Code:** https://github.com/nawafgadi/kartu-tani"
                    )
                },
                'suggestions': {
                    'id': [
                        {"msg": "Jelaskan project CBPR AI", "label": "Project CBPR AI"},
                        {"msg": "Jelaskan project Plazio E-Commerce", "label": "Project Plazio"},
                        {"msg": "Skill teknologi apa yang dikuasai?", "label": "Lihat Skill"}
                    ],
                    'en': [
                        {"msg": "Explain the CBPR AI project", "label": "CBPR AI Project"},
                        {"msg": "Tell me about Plazio E-Commerce", "label": "Plazio Store"},
                        {"msg": "What technologies do you use?", "label": "Skills"}
                    ]
                }
            },
            {
                'id': 'project_plazio',
                'patterns': [r'plazio', r'plazio_e-commerce', r'e-commerce', r'toko\s*online', r'belanja\s*online', r'shopping\s*cart'],
                'responses': {
                    'id': (
                        "🛍️ **Project: Plazio E-Commerce Platform**\n\n"
                        "Aplikasi web toko online modern untuk memfasilitasi transaksi belanja digital yang cepat, responsif, dan terstruktur.\n\n"
                        "**Fitur Utama:**\n"
                        "• Katalog Produk Interaktif multi-kategori pakaian & fashion\n"
                        "• Sistem Keranjang Belanja Dinamis (Add to Cart, Update Qty, Subtotal)\n"
                        "• Integrasi Alur Checkout dan Manajemen Pesanan\n\n"
                        "🔗 **Kode Sumber:** https://github.com/lastfound/Plazio_e-commerce"
                    ),
                    'en': (
                        "🛍️ **Project: Plazio E-Commerce Platform**\n\n"
                        "A modern online store web application featuring dynamic catalog management, interactive shopping cart, and smooth checkout workflows.\n\n"
                        "🔗 **Repository:** https://github.com/lastfound/Plazio_e-commerce"
                    )
                },
                'suggestions': {
                    'id': [
                        {"msg": "Jelaskan project CBPR AI", "label": "Project CBPR"},
                        {"msg": "Bisa buat website toko online?", "label": "Jasa Website"},
                        {"msg": "Berapa harga pembuatan project?", "label": "Estimasi Biaya"}
                    ],
                    'en': [
                        {"msg": "Explain CBPR AI system", "label": "CBPR Project"},
                        {"msg": "Can you build an e-commerce website?", "label": "Hire Web Dev"},
                        {"msg": "What is your pricing?", "label": "Pricing"}
                    ]
                }
            },
            {
                'id': 'project_cbpr',
                'patterns': [r'cbpr', r'content[- ]*based', r'rekomendasi', r'recommendation', r'nlp', r'tf[- ]*idf'],
                'responses': {
                    'id': (
                        "🤖 **Project: CBPR (Content-Based Product Recommendation)**\n\n"
                        "Sistem rekomendasi produk cerdas berbasis **Machine Learning & NLP (Natural Language Processing)** yang dibangun menggunakan **Python & Flask**.\n\n"
                        "**Cara Kerja & Arsitektur:**\n"
                        "1. **Text Input & Preprocessing:** Tokenisasi dan pembersihan teks deskripsi & nama produk.\n"
                        "2. **Feature Extraction (TF-IDF):** Mengonversi teks menjadi representasi vektor berbobot.\n"
                        "3. **Cosine Similarity Model:** Menghitung skor kemiripan antar produk untuk rekomendasi akurat.\n\n"
                        "🔗 **Kode Sumber:** https://github.com/KyyTzy09/CBPR"
                    ),
                    'en': (
                        "🤖 **Project: CBPR (Content-Based Product Recommendation)**\n\n"
                        "A smart product recommendation engine utilizing **Machine Learning & NLP (Natural Language Processing)** with **Python & Flask** and TF-IDF feature extraction.\n\n"
                        "🔗 **Repository:** https://github.com/KyyTzy09/CBPR"
                    )
                },
                'suggestions': {
                    'id': [
                        {"msg": "Apa saja project AI Nawaf?", "label": "Semua Project AI"},
                        {"msg": "Skill Python Nawaf apa saja?", "label": "Skill Python"},
                        {"msg": "Project Kartu Tani", "label": "Kartu Tani"}
                    ],
                    'en': [
                        {"msg": "Show all AI projects", "label": "AI Projects"},
                        {"msg": "Tell me about Python skills", "label": "Python Skills"},
                        {"msg": "Kartu Tani Project", "label": "Kartu Tani"}
                    ]
                }
            },
            {
                'id': 'project_tiket',
                'patterns': [r'tiket', r'web[- ]*tiket', r'booking', r'travel'],
                'responses': {
                    'id': (
                        "🎫 **Project: Web Tiket Online & Admin Panel**\n\n"
                        "Aplikasi pemesanan tiket online modern dengan alur booking cepat dan dashboard manajemen armada.\n\n"
                        "🌐 Live: https://nawafgadi.github.io/web-tiket/\n"
                        "🔗 GitHub: https://github.com/nawafgadi/web-tiket"
                    ),
                    'en': "🎫 Online ticket booking platform with live demo at https://nawafgadi.github.io/web-tiket/"
                },
                'suggestions': {
                    'id': [
                        {"msg": "Project Bank Sampah Digital", "label": "Bank Sampah"},
                        {"msg": "Bisa buatkan website custom?", "label": "Jasa Web"},
                        {"msg": "Bagaimana cara kontak Nawaf?", "label": "Kontak"}
                    ]
                }
            },
            {
                'id': 'project_stunting',
                'patterns': [r'stunting', r'knn', r'kesehatan', r'balita'],
                'responses': {
                    'id': (
                        "📊 **Project: Deteksi Stunting AI (KNN)**\n\n"
                        "Sistem deteksi dini risiko stunting pada balita menggunakan Machine Learning algoritma K-Nearest Neighbors (KNN) berbasis Python & Flask.\n\n"
                        "🔗 **Kode Sumber:** https://github.com/nawafgadi/pengukur-stanting-"
                    ),
                    'jv': (
                        "📊 **Proyek: Deteksi Stunting AI (KNN)**\n\n"
                        "Aplikasi pinter deteksi risiko stunting balita nganggo algoritma Machine Learning KNN berbasis Python & Flask.\n\n"
                        "🔗 **Kode Sumber:** https://github.com/nawafgadi/pengukur-stanting-"
                    ),
                    'en': "📊 AI-powered early stunting detection tool using KNN algorithm: https://github.com/nawafgadi/pengukur-stanting-"
                }
            },
            {
                'id': 'project_banksampah',
                'patterns': [r'bank\s*sampah', r'sampah', r'limbah'],
                'responses': {
                    'id': (
                        "♻️ **Project: Bank Sampah Digital**\n\n"
                        "Platform edukasi lingkungan dan kalkulator tabungan sampah terintegrasi.\n\n"
                        "🌐 Live: https://nawafgadi.github.io/xipplg4_03_banksampah/\n"
                        "🔗 GitHub: https://github.com/nawafgadi/xipplg4_03_banksampah"
                    )
                }
            },
            {
                'id': 'projects_all',
                'patterns': [r'project', r'proyek', r'karya', r'portofolio', r'hasil kerja', r'buat\s*apa\s*aja'],
                'responses': {
                    'id': (
                        "🚀 **Daftar Karya & Proyek Unggulan Nawaf:**\n\n"
                        "• **Kartu Tani:** Smart Agriculture & Alokasi Pupuk (Python/Django)\n"
                        "• **Plazio E-Commerce:** Platform Toko Online (JS/PHP)\n"
                        "• **CBPR AI:** Sistem Rekomendasi Produk NLP & TF-IDF (Python/Flask)\n"
                        "• **Web Tiket Online:** Sistem Pemesanan & Admin Manifest\n"
                        "• **Bank Sampah Digital:** Platform Edukasi Lingkungan\n"
                        "• **Kasir POS Mobile:** Android POS App (Kotlin)\n"
                        "• **Deteksi Stunting AI:** Machine Learning KNN\n"
                        "• **Curious Chimpanzee:** Game 2D Platformer (Unity C#)\n"
                        "• **UI/UX Design:** E-Cashier, Bank Awan, Pertanian di Figma\n\n"
                        "Semua proyek tersedia di bagian Karya pada portofolio! 🔍"
                    ),
                    'en': (
                        "🚀 **Featured Projects by Nawaf:**\n\n"
                        "• Kartu Tani (Smart Agriculture)\n"
                        "• Plazio (E-Commerce Platform)\n"
                        "• CBPR (Content-Based Recommendation AI)\n"
                        "• Web Tiket (Online Ticket Booking)\n"
                        "• Bank Sampah (Waste Management Web)\n"
                        "• Cashier POS Mobile (Kotlin Android)\n"
                        "• Stunting Detection AI (KNN)\n"
                        "• Curious Chimpanzee (2D Game)"
                    )
                },
                'suggestions': {
                    'id': [
                        {"msg": "Ceritakan tentang Kartu Tani", "label": "Kartu Tani"},
                        {"msg": "Skill teknologi apa yang dikuasai?", "label": "Skill Nawaf"},
                        {"msg": "Bagaimana cara kontak Nawaf?", "label": "Kontak"}
                    ]
                }
            },
            {
                'id': 'skills',
                'patterns': [r'skill', r'keahlian', r'teknologi', r'tech', r'stack', r'bahasa pemrograman', r'framework'],
                'responses': {
                    'id': (
                        "💻 **Skill & Tech Stack Nawaf:**\n\n"
                        "🎨 **UI/UX Design:** Figma, Canva, Wireframing\n"
                        "⚡ **Frontend:** HTML5, CSS3, JavaScript (ES6+), React\n"
                        "🔧 **Backend:** Python (Django, Flask), PHP (Laravel), REST API\n"
                        "📱 **Mobile:** Kotlin, Android Studio\n"
                        "🧠 **AI & ML:** NLP, TF-IDF, K-Nearest Neighbors (KNN)\n"
                        "🛠️ **IT Support:** Troubleshooting, Help Desk Management"
                    ),
                    'en': (
                        "💻 **Skills Mastered by Nawaf:**\n\n"
                        "• Frontend: React, JavaScript, HTML5, CSS3\n"
                        "• Mobile: Kotlin, Android Studio\n"
                        "• Backend: Python (Django/Flask), PHP (Laravel)\n"
                        "• AI/ML: NLP, TF-IDF, KNN\n"
                        "• Design: Figma, Canva\n"
                        "• IT Support & Help Desk Management"
                    )
                },
                'suggestions': {
                    'id': [
                        {"msg": "Project apa yang pernah dibuat?", "label": "Lihat Project"},
                        {"msg": "Bisa buat website / aplikasi?", "label": "Jasa Pembuatan"},
                        {"msg": "Cita-cita Help Desk Manager?", "label": "Help Desk Support"}
                    ]
                }
            },
            {
                'id': 'contact',
                'patterns': [r'kontak', r'contact', r'hubungi', r'email', r'telepon', r'phone', r'whatsapp', r'wa', r'lokasi', r'alamat'],
                'responses': {
                    'id': (
                        "📫 **Informasi Kontak Nawaf:**\n\n"
                        "📧 Email: nawaf52626@gmail.com\n"
                        "📱 Telepon/WhatsApp: +62 882-3938-6759\n"
                        "📍 Lokasi: Kroya, Cilacap, Jawa Tengah\n"
                        "🐙 GitHub: https://github.com/nawafgadi\n"
                        "💼 LinkedIn: Nawaf Gadi Al Fatih\n\n"
                        "Silakan hubungi untuk diskusi project atau kolaborasi! 💬"
                    ),
                    'en': (
                        "📫 **Contact Nawaf:**\n\n"
                        "📧 Email: nawaf52626@gmail.com\n"
                        "📱 Phone/WhatsApp: +62 882-3938-6759\n"
                        "📍 Location: Kroya, Cilacap, Central Java, Indonesia"
                    )
                },
                'suggestions': {
                    'id': [
                        {"msg": "Apa akun media sosial Nawaf?", "label": "Sosial Media"},
                        {"msg": "Bisa minta CV / Resume?", "label": "Minta CV"},
                        {"msg": "Layanan apa saja yang disediakan?", "label": "Layanan"}
                    ]
                }
            },
            {
                'id': 'services_pricing',
                'patterns': [r'jasa', r'bisa\s*bikin', r'bisa\s*buat', r'harga', r'biaya', r'tarif', r'cost', r'price', r'budget', r'hire', r'freelance'],
                'responses': {
                    'id': (
                        "💼 **Layanan & Jasa Pembuatan:**\n\n"
                        "1. 🌐 **Pembuatan Website:** Landing Page, Toko Online, Web App Interaktif.\n"
                        "2. 📱 **Aplikasi Android:** Native Kotlin & Android Studio.\n"
                        "3. 🎨 **Desain UI/UX:** Figma interactive prototype & mockup.\n\n"
                        "💰 **Harga & Konsultasi:** Estimasi biaya fleksibel dan gratis konsultasi. Hubungi WhatsApp +62 882-3938-6759!"
                    ),
                    'en': "💼 Web & Mobile Development services with flexible pricing. Contact via WhatsApp +62 882-3938-6759!"
                }
            },
            {
                'id': 'about',
                'patterns': [r'tentang', r'nawaf', r'siapa', r'profile', r'profil', r'biodata', r'smk', r'rpl', r'pengalaman'],
                'responses': {
                    'id': (
                        "👋 **Nawaf Gadi Alfatih** adalah siswa Rekayasa Perangkat Lunak (RPL) dari Kroya, Cilacap.\n\n"
                        "Dengan **2+ tahun pengalaman** dan **20+ proyek**, ia fokus pada web dev, aplikasi Android, dan bercita-cita menjadi **Help Desk Support Manager** profesional. 🎯"
                    ),
                    'en': (
                        "👋 **Nawaf Gadi Alfatih** is a Software Engineering (RPL) student from Kroya, Central Java with 2+ years of experience in Web and Mobile development."
                    )
                },
                'suggestions': {
                    'id': [
                        {"msg": "Project apa yang pernah dibuat?", "label": "Lihat Project"},
                        {"msg": "Skill teknologi apa saja?", "label": "Lihat Skill"},
                        {"msg": "Bagaimana cara kontak?", "label": "Kontak"}
                    ]
                }
            }
        ]
    
    def get_greeting(self, language='id'):
        """Get contextual greeting based on language and time"""
        hour = datetime.now().hour
        period = 'morning' if hour < 11 else 'afternoon' if hour < 15 else 'evening' if hour < 18 else 'night'
        
        greetings = {
            'id': {
                'morning': "Selamat pagi! Saya ERA AI, asisten virtual Nawaf Gadi Alfatih. Ada yang bisa saya bantu? 😊",
                'afternoon': "Selamat siang! Saya ERA AI siap membantu Anda mencari tahu tentang proyek dan skill Nawaf. 🤖",
                'evening': "Selamat sore! Senang bisa membantu Anda seputar portofolio Nawaf. 💬",
                'night': "Selamat malam! Asisten AI Nawaf siap membantu Anda. 🌙"
            },
            'jv': {
                'morning': "Sugeng enjang sedulur! Inyong ERA AI, asisten virtual Nawaf Gadi Alfatih. Ana sing teyeng inyong bantu? 😊",
                'afternoon': "Sugeng siang sedulur! Inyong ERA AI siap mbantu rika nggoleti proyek lan skill Nawaf. 🤖",
                'evening': "Sugeng sonten sedulur! Seneng teyeng mbantu rika bab portofolio Nawaf. 💬",
                'night': "Sugeng dalu sedulur! Asisten AI Nawaf siap mbantu rika. 🌙"
            },
            'en': {
                'morning': "Good morning! I am ERA AI, Nawaf's virtual assistant. How can I help you? 😊",
                'afternoon': "Good afternoon! How can I assist you regarding Nawaf's projects or skills? 🤖",
                'evening': "Good evening! Happy to help you with Nawaf's portfolio. 💬",
                'night': "Good night! Nawaf's AI assistant is ready to help. 🌙"
            }
        }
        
        lang_greetings = greetings.get(language, greetings['id'])
        return lang_greetings.get(period, lang_greetings['afternoon'])
    
    def process_message(self, message, language='id'):
        """Process user message using regex patterns and intelligent matching"""
        if not message or not message.strip():
            if language == 'jv':
                return "Mangga ketik pitakonane rika babagan Nawaf, proyek, utawa keahliane. Inyong siap mbantu! 😊"
            return "Silakan ketik pertanyaan Anda tentang Nawaf, proyek, atau keahlian. Saya siap membantu! 😊"
        
        msg_lower = message.lower().strip()
        
        # Detect Javanese keywords
        if any(w in msg_lower for w in ['inyong', 'nyong', 'rika', 'kowe', 'sapa', 'ngendi', 'kepriwe', 'piye', 'gawe', 'kesuwun', 'matur', 'suwun', 'sugeng']):
            language = 'jv'
        
        # Check greetings
        if any(g in msg_lower for g in ['halo', 'hai', 'hello', 'hi', 'hey', 'pagi', 'siang', 'sore', 'malam', 'assalamu', 'sugeng', 'pripun', 'kepriwe']):
            return self.get_greeting(language)
        
        # Check thanks
        if any(t in msg_lower for t in ['terima kasih', 'thanks', 'makasih', 'tq', 'thx', 'thank you', 'matur nuwun', 'kesuwun', 'suwun']):
            if language == 'jv':
                return "Sami-sami sedulur! Seneng pisan teyeng mbantu rika. Aja isin-isin takon maning ya! 😊✨"
            return "Sama-sama! Senang bisa membantu. Jangan ragu untuk bertanya hal lain tentang proyek Nawaf ya! 😊✨"
        
        # Check farewell
        if any(f in msg_lower for f in ['bye', 'dadah', 'sampai jumpa', 'selamat tinggal', 'see you', 'pamit']):
            if language == 'jv':
                return "Matur nuwun wis mampir maring portofolio Nawaf! Mugi-mugi sukses terus sedulur! 👋✨"
            return "Sampai jumpa! Terima kasih telah berkunjung ke portofolio Nawaf. Semoga sukses selalu! 👋✨"
        
        # Check knowledge entries with regex pattern matching
        best_entry = None
        max_score = 0
        
        for entry in self.knowledge:
            score = 0
            for pat in entry['patterns']:
                if re.search(pat, msg_lower):
                    score += 20
            if score > max_score:
                max_score = score
                best_entry = entry
        
        if best_entry and max_score > 0:
            resps = best_entry['responses']
            return resps.get(language, resps.get('id', resps.get('en', '')))
        
        # Default smart response
        if language == 'jv':
            return (
                "Inyong teyeng mbantu rika bab macem-macem topik babagan Nawaf:\n"
                "• **Proyek:** Kartu Tani, Plazio E-commerce, CBPR AI, Web Tiket, Kasir POS\n"
                "• **Keahlian:** Python, Laravel, JavaScript, Kotlin Android, Unity 2D, Figma UI/UX\n"
                "• **Jasa & Rega:** Gawe website, aplikasi Android, UI/UX\n"
                "• **Kontak & Panggonan:** Email, WhatsApp, lan Media Sosial\n\n"
                "Mangga ketik pitakonane rika! 😊"
            )
        return (
            "Saya bisa membantu Anda mencari tahu tentang:\n"
            "• **Proyek:** Kartu Tani, Plazio E-commerce, CBPR AI, Web Tiket, Kasir POS\n"
            "• **Keahlian:** UI/UX Design, React, Python, Kotlin, Laravel, Help Desk IT\n"
            "• **Layanan & Harga:** Pembuatan website, aplikasi Android, UI/UX\n"
            "• **Kontak & Lokasi:** Email, WhatsApp, dan Sosial Media\n\n"
            "Silakan ketik pertanyaan Anda! 😊"
        )
    
    def get_suggestions(self, message, language='id'):
        """Get contextual suggestions based on matched intent"""
        msg_lower = (message or '').lower().strip()
        
        for entry in self.knowledge:
            for pat in entry['patterns']:
                if re.search(pat, msg_lower):
                    suggs = entry.get('suggestions', {})
                    return suggs.get(language, suggs.get('id', suggs.get('en', [])))
        
        default_suggs = [
            {"msg": "Ceritakan tentang Nawaf", "label": "Tentang Nawaf"},
            {"msg": "Project unggulan apa saja?", "label": "Project Unggulan"},
            {"msg": "Skill teknologi apa yang dikuasai?", "label": "Skill & Tech"}
        ]
        return default_suggs


# Initialize AI
ai = NawafAI()


def save_chat_history(user_msg, bot_msg):
    """Save chat history to file"""
    try:
        history = []
        if os.path.exists(HISTORY_FILE):
            with open(HISTORY_FILE, 'r', encoding='utf-8') as f:
                history = json.load(f)
        
        history.append({
            'timestamp': datetime.now().isoformat(),
            'user': user_msg,
            'bot': bot_msg
        })
        
        # Keep only last MAX_HISTORY entries
        history = history[-MAX_HISTORY:]
        
        with open(HISTORY_FILE, 'w', encoding='utf-8') as f:
            json.dump(history, f, ensure_ascii=False, indent=2)
    except Exception as e:
        logger.error(f"Error saving history: {e}")


def send_email_notification(subject, body):
    if not EMAIL_USER or not EMAIL_PASS or not EMAIL_NOTIFY_TO:
        logger.warning('Email notification skipped because SMTP credentials are not configured.')
        return False

    message = EmailMessage()
    message['Subject'] = subject
    message['From'] = EMAIL_USER
    message['To'] = EMAIL_NOTIFY_TO
    message.set_content(body)

    context = ssl.create_default_context()
    try:
        with smtplib.SMTP(EMAIL_HOST, EMAIL_PORT) as server:
            server.starttls(context=context)
            server.login(EMAIL_USER, EMAIL_PASS)
            server.send_message(message)
        logger.info('Unanswered question email has been sent successfully.')
        return True
    except Exception as e:
        logger.error(f'Failed to send email notification: {e}')
        return False


def notify_unanswered_question(question, user_agent=None, source='website'):
    subject = 'AI Unanswered Question Notification'
    body = (
        f'Pertanyaan dari website belum bisa dijawab oleh AI.\n\n'
        f'Pertanyaan:\n{question}\n\n'
        f'Sumber: {source}\n'
        f'User-Agent: {user_agent or "unknown"}\n'
        f'Tanggal: {datetime.now().isoformat()}\n'
    )
    return send_email_notification(subject, body)


@app.route('/api/health', methods=['GET'])
def health_check():
    """Health check endpoint"""
    return jsonify({
        'status': 'healthy',
        'timestamp': datetime.now().isoformat(),
        'service': 'Nawaf AI Chatbot API'
    })


@app.route('/api/chat', methods=['POST'])
def chat():
    """Main chat endpoint"""
    try:
        data = request.get_json()
        
        if not data or 'message' not in data:
            return jsonify({
                'success': False,
                'error': 'Message is required'
            }), 400
        
        user_message = data['message'].strip()
        if not user_message:
            return jsonify({
                'success': False,
                'error': 'Message cannot be empty'
            }), 400
        
        # Get language from request (default: Indonesian)
        language = data.get('language', 'id')
        if language not in ['id', 'en', 'ar', 'zh', 'jv']:
            language = 'id'
        
        # Process message with AI in specified language
        bot_response = ai.process_message(user_message, language)
        suggestions = ai.get_suggestions(user_message, language)
        reported = False

        # Save to history
        save_chat_history(user_message, bot_response)
        
        logger.info(f"User ({language}): {user_message} | Bot: {bot_response[:50]}... reported={reported}")
        
        return jsonify({
            'success': True,
            'message': bot_response,
            'suggestions': suggestions,
            'reported': reported,
            'timestamp': datetime.now().isoformat(),
            'language': language,
            'context': 'nawaf_portfolio'
        })
    
    except Exception as e:
        logger.error(f"Error processing chat: {e}")
        return jsonify({
            'success': False,
            'error': 'Internal server error'
        }), 500


@app.route('/api/history', methods=['GET'])
def get_history():
    """Get chat history"""
    try:
        if os.path.exists(HISTORY_FILE):
            with open(HISTORY_FILE, 'r', encoding='utf-8') as f:
                history = json.load(f)
            return jsonify({
                'success': True,
                'history': history[-20:]  # Last 20 conversations
            })
        return jsonify({
            'success': True,
            'history': []
        })
    except Exception as e:
        logger.error(f"Error reading history: {e}")
        return jsonify({
            'success': False,
            'error': 'Failed to read history'
        }), 500


@app.route('/api/clear', methods=['POST'])
def clear_history():
    """Clear chat history"""
    try:
        if os.path.exists(HISTORY_FILE):
            os.remove(HISTORY_FILE)
        return jsonify({
            'success': True,
            'message': 'Chat history cleared'
        })
    except Exception as e:
        logger.error(f"Error clearing history: {e}")
        return jsonify({
            'success': False,
            'error': 'Failed to clear history'
        }), 500


if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5000))
    debug = os.environ.get('FLASK_DEBUG', 'False').lower() == 'true'
    app.run(host='0.0.0.0', port=port, debug=debug)
