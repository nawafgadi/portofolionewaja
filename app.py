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
    """Advanced AI Chatbot for Nawaf's Portfolio"""
    
    def __init__(self):
        self.responses = self._load_responses()
        self.greetings = [
            "Halo! Senang bertemu dengan Anda. Ada yang bisa saya bantu tentang Nawaf? 😊",
            "Hai! Asisten AI Nawaf siap membantu. Mau tahu apa nih? 🤖",
            "Hello! Welcome to Nawaf's portfolio. How can I help you today? 🌟",
            "Selamat datang! Saya asisten virtual Nawaf. Mau tanya apa? ✨"
        ]
        self.thanks = [
            "Sama-sama! Senang bisa membantu. Jika ada pertanyaan lain, silakan tanya saja. 😊",
            "With pleasure! Jangan ragu untuk kembali bertanya kapan saja. 👍",
            "You're welcome! Have a great day! 🌟"
        ]
        self.farewells = [
            "Sampai jumpa! Semoga harimu menyenangkan. 👋",
            "Bye! Thanks for visiting Nawaf's portfolio. Have a wonderful day! 🌈",
            "Dadah! Jangan lupa kembali lagi ya. Take care! 💫"
        ]
        self.unknown = [
            "Maaf, saya belum memahami pertanyaan tersebut. Anda bisa bertanya tentang: Nawaf, project, skill, kontak, pengalaman, atau teknologi yang dikuasai. 🤔",
            "Hmm, saya belum punya jawaban untuk itu. Coba tanya tentang:\n• Siapa Nawaf\n• Projectnya\n• Skill teknologi\n• Cara hubungi\n\nSaya siap bantu! 🙋",
            "Saya masih belajar nih! Saat ini saya bisa jawab tentang Nawaf, project, skill, dan kontak. Mau tanya yang mana? 😅"
        ]
    
    def _load_responses(self):
        """Load response database"""
        return {
            'about': {
                'keywords': ['tentang', 'nawaf', 'siapa', 'profile', 'profil', 'biodata', 'diri', 'orang', 'nama'],
                'responses': [
                    "Nawaf Gadi Alfatih adalah siswa Rekayasa Perangkat Lunak (RPL) yang fokus pada pengembangan web dan aplikasi Android. Ia memiliki passion di bidang IT Support dan bercita-cita menjadi Help Desk Support Manager. 🎯",
                    "Nawaf adalah seorang developer muda berbakat dari Kroya, Cilacap. Dengan 2+ tahun pengalaman dan 20+ project, ia terus berkembang di bidang teknologi. 🚀",
                    "Kenalan yuk! Nawaf Gadi Alfatih - siswa RPL, web & mobile developer, dan calon Help Desk Support Manager profesional. 💻"
                ]
            },
            'projects': {
                'keywords': ['project', 'proyek', 'karya', 'portofolio', 'web', 'aplikasi', 'apps', 'website', 'hasil kerja', 'aplikasi'],
                'responses': [
                    "Nawaf telah mengerjakan berbagai project menarik:\n\n• Web Tiket - Sistem pemesanan tiket online\n• Bank Sampah - Manajemen sampah digital\n• Ucapan Idulfitri - Web greeting interaktif\n• E-Cashier, Pertanian, Bank Awan - UI/UX Design\n• Prediksi Stunting - Aplikasi prediksi kesehatan\n\nSemua project menunjukkan komitmen pada kualitas! ⭐",
                    "Beberapa project unggulan Nawaf:\n🎫 Web Tiket\n♻️ Bank Sampah\n🌙 Ucapan Idulfitri\n💳 E-Cashier (UI/UX)\n🌾 Pertanian (UI/UX)\n☁️ Bank Awan (UI/UX)\n📊 Prediksi Stunting\n\nIngin lihat detailnya? Cek bagian Work! 🔍",
                    "Nawaf sudah membangun 20+ project! Dari web development sampai UI/UX design, semua dikerjakan dengan dedikasi tinggi. Project favoritnya? Web Tiket dan Bank Sampah! 🏆"
                ]
            },
            'skills': {
                'keywords': ['skill', 'keahlian', 'bisa', 'teknologi', 'tech', 'stack', 'bahasa pemrograman', 'framework', 'tool', 'tools', 'pandai'],
                'responses': [
                    "Skill teknologi Nawaf:\n\n🎨 UI/UX Design\n💻 Frontend Development\n⚡ JavaScript & React\n📄 HTML & CSS\n📱 Kotlin (Android)\n🐍 Python\n🎨 Figma & Canva\n\nDan masih terus belajar! 📚",
                    "Tech stack yang dikuasai Nawaf:\n• Frontend: HTML, CSS, JavaScript, React\n• Mobile: Kotlin, Android Studio\n• Backend: Laravel, Python\n• Design: Figma, Canva\n• Lainnya: Git, problem solving\n\nVersatile banget kan? 😎",
                    "Nawaf mahir di:\n🌐 Web Development\n📱 Android Development\n🎨 UI/UX Design\n🔧 IT Support\n\nTools: VS Code, Android Studio, Figma, Git, Laravel"
                ]
            },
            'contact': {
                'keywords': ['kontak', 'contact', 'hubungi', 'email', 'telepon', 'phone', 'nomor', 'alamat', 'lokasi', 'where', 'address', 'hubung'],
                'responses': [
                    "Hubungi Nawaf di:\n\n📧 Email: nawaf52626@gmail.com\n📱 Telepon: +62 882-3938-6759\n📍 Lokasi: Kroya, Cilacap, Jawa Tengah\n\nAtau kirim pesan lewat form Contact di website ini! 💬",
                    "Mau kolaborasi? Hubungi Nawaf:\n✉️ nawaf52626@gmail.com\n☎️ +62 882-3938-6759\n📍 Kroya, Cilacap, Jateng\n\nRespons cepat di jam kerja! ⚡"
                ]
            },
            'school': {
                'keywords': ['sekolah', 'school', 'pelajar', 'siswa', 'smk', 'rpl', 'jurusan', 'kelas', 'pendidikan'],
                'responses': [
                    "Nawaf adalah siswa jurusan Rekayasa Perangkat Lunak (RPL). Belajar pemrograman sejak SMK dan terus mengasah skill! 🎓",
                    "Nawaf menempuh pendidikan di jurusan RPL (Rekayasa Perangkat Lunak). Fokus pada software development dan IT. 📚"
                ]
            },
            'experience': {
                'keywords': ['pengalaman', 'experience', 'lama', 'tahun', 'berapa', 'karir', 'career', 'kerja'],
                'responses': [
                    "Nawaf memiliki pengalaman 2+ tahun di bidang pengembangan software dan telah menyelesaikan 20+ project. Perjalanan yang luar biasa! 🚀",
                    "Dengan 2+ tahun pengalaman dan 20+ project completed, Nawaf terus berkembang menjadi developer profesional. 💪"
                ]
            },
            'laravel': {
                'keywords': ['laravel', 'php', 'backend', 'server'],
                'responses': ["Nawaf memiliki pengalaman mengerjakan project berbasis Laravel. Framework PHP favorit untuk project skala menengah! 🔧"]
            },
            'android': {
                'keywords': ['android', 'kotlin', 'mobile', 'apk', 'play store', 'hp'],
                'responses': ["Nawaf mengembangkan aplikasi Android menggunakan Android Studio dan Kotlin. Siap bantu buat aplikasi mobile kamu! 📱"]
            },
            'price': {
                'keywords': ['harga', 'biaya', 'cost', 'price', 'fee', 'bayar', 'mahal', 'murah', 'budget', 'rp', 'rupiah', 'berapa'],
                'responses': ["Untuk informasi harga dan budget project, silakan hubungi Nawaf langsung via email atau WhatsApp. Setiap project memiliki estimasi berbeda sesuai kompleksitasnya! 💰"]
            },
            'hire': {
                'keywords': ['hire', 'kerja', 'freelance', 'part time', 'full time', 'job', 'lowongan', 'rekrut', 'rekrutmen'],
                'responses': ["Nawaf terbuka untuk kesempatan freelance, part-time, atau kolaborasi project. Hubungi via email untuk diskusi lebih lanjut! 🤝"]
            },
            'social': {
                'keywords': ['sosial media', 'social media', 'instagram', 'linkedin', 'github', 'twitter', 'x', 'sosmed', 'follow', 'ig'],
                'responses': [
                    "Follow Nawaf di sosial media:\n\n📸 Instagram: @nwfgal_\n💼 LinkedIn: Nawaf Gadi Al Fatih\n🐙 GitHub: @nawafgadi\n🐦 X/Twitter: @NawafgadiA65406\n\nJangan lupa connect ya! 🔗"
                ]
            },
            'help': {
                'keywords': ['bantu', 'help', 'bantuan', 'gimana', 'how', 'cara', 'apa', 'what'],
                'responses': [
                    "Saya bisa bantu jawab tentang:\n• Siapa Nawaf\n• Project yang pernah dibuat\n• Skill & teknologi\n• Cara kontak\n• Informasi lainnya\n\nTanya aja! 🤗",
                    "Butuh bantuan? Coba ketik keyword seperti: tentang, project, skill, kontak, email, atau lokasi. Saya siap bantu! 💪"
                ]
            }
        }
    
    def get_greeting(self):
        hour = datetime.now().hour
        if hour < 11:
            greeting = "Selamat pagi"
        elif hour < 15:
            greeting = "Selamat siang"
        elif hour < 18:
            greeting = "Selamat sore"
        else:
            greeting = "Selamat malam"
        return f"{greeting}! {random.choice(self.greetings.split('! ')[1] if '! ' in random.choice(self.greetings) else random.choice(self.greetings))}"
    
    def process_message(self, message):
        """Process user message and return AI response"""
        if not message or not message.strip():
            return "Silakan ketik pesan Anda. Saya siap membantu! 😊"
        
        msg_lower = message.lower().strip()
        
        # Check for greetings
        if any(word in msg_lower for word in ['halo', 'hai', 'hello', 'hi', 'hey', 'selamat']):
            return random.choice(self.greetings)
        
        # Check for thanks
        if any(word in msg_lower for word in ['terima kasih', 'thanks', 'thank you', 'makasih', 'tq', 'thx']):
            return random.choice(self.thanks)
        
        # Check for farewell
        if any(word in msg_lower for word in ['bye', 'goodbye', 'dadah', 'sampai jumpa', 'selamat tinggal', 'see you']):
            return random.choice(self.farewells)
        
        # Score-based matching
        best_match = None
        max_score = 0
        
        for category, data in self.responses.items():
            score = 0
            for keyword in data['keywords']:
                if keyword in msg_lower:
                    score += len(keyword)  # Longer keyword = higher score
            
            # Bonus for exact word match
            words = re.findall(r'\b\w+\b', msg_lower)
            for keyword in data['keywords']:
                if keyword in words:
                    score += 5
            
            if score > max_score:
                max_score = score
                best_match = data['responses']
        
        if best_match:
            return random.choice(best_match)
        
        return random.choice(self.unknown)
    
    def get_suggestions(self, message):
        """Get contextual suggestions based on message"""
        msg_lower = message.lower()
        
        if any(w in msg_lower for w in ['nawaf', 'siapa', 'tentang', 'profile']):
            return [
                {"msg": "Project apa yang pernah dibuat?", "label": "Lihat Project"},
                {"msg": "Skill teknologi apa yang dikuasai?", "label": "Lihat Skill"},
                {"msg": "Bagaimana cara kontak?", "label": "Kontak"}
            ]
        elif any(w in msg_lower for w in ['project', 'proyek', 'karya', 'web', 'aplikasi']):
            return [
                {"msg": "Ceritakan tentang Nawaf", "label": "Tentang Nawaf"},
                {"msg": "Skill teknologi apa yang dikuasai?", "label": "Lihat Skill"},
                {"msg": "Berapa harga project?", "label": "Harga"}
            ]
        elif any(w in msg_lower for w in ['skill', 'teknologi', 'bisa', 'tech']):
            return [
                {"msg": "Project apa yang pernah dibuat?", "label": "Lihat Project"},
                {"msg": "Bagaimana cara kontak?", "label": "Kontak"},
                {"msg": "Pengalaman kerja berapa lama?", "label": "Pengalaman"}
            ]
        elif any(w in msg_lower for w in ['kontak', 'hubungi', 'email', 'telepon', 'lokasi']):
            return [
                {"msg": "Ceritakan tentang Nawaf", "label": "Tentang Nawaf"},
                {"msg": "Project apa yang pernah dibuat?", "label": "Lihat Project"},
                {"msg": "Jam operasional?", "label": "Jam Operasional"}
            ]
        
        return [
            {"msg": "Ceritakan tentang Nawaf", "label": "Tentang Nawaf"},
            {"msg": "Project apa yang pernah dibuat?", "label": "Project"},
            {"msg": "Skill teknologi apa yang dikuasai?", "label": "Skill"}
        ]


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
        
        # Process message with AI
        bot_response = ai.process_message(user_message)
        suggestions = ai.get_suggestions(user_message)
        reported = False

        if bot_response in ai.unknown:
            user_agent = request.headers.get('User-Agent')
            reported = notify_unanswered_question(user_message, user_agent=user_agent)
            if reported:
                bot_response = (
                    'Maaf, saya belum bisa menjawab pertanyaan itu dengan tepat saat ini. '
                    'Saya sudah mengirim informasi ini ke email pemilik agar bisa ditinjau dan diperbaiki. '
                    'Silakan tunggu pembaruan selanjutnya.'
                )

        # Save to history
        save_chat_history(user_message, bot_response)
        
        logger.info(f"User: {user_message} | Bot: {bot_response[:50]}... reported={reported}")
        
        return jsonify({
            'success': True,
            'message': bot_response,
            'suggestions': suggestions,
            'reported': reported,
            'timestamp': datetime.now().isoformat(),
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
