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
    """Advanced AI Chatbot for Nawaf's Portfolio - Multilingual Support"""
    
    def __init__(self):
        self.responses = self._load_responses()
    
    def _load_responses(self):
        """Load multilingual response database"""
        return {
            'about': {
                'keywords': ['tentang', 'nawaf', 'siapa', 'profile', 'profil', 'biodata', 'diri', 'orang', 'nama', 'about', 'who'],
                'id': [
                    "Nawaf Gadi Alfatih adalah siswa Rekayasa Perangkat Lunak (RPL) yang fokus pada pengembangan web dan aplikasi Android. Ia memiliki passion di bidang IT Support dan bercita-cita menjadi Help Desk Support Manager. 🎯",
                    "Nawaf adalah seorang developer muda berbakat dari Kroya, Cilacap. Dengan 2+ tahun pengalaman dan 20+ project, ia terus berkembang di bidang teknologi. 🚀",
                    "Kenalan yuk! Nawaf Gadi Alfatih - siswa RPL, web & mobile developer, dan calon Help Desk Support Manager profesional. 💻"
                ],
                'en': [
                    "Nawaf Gadi Alfatih is a Software Engineering (RPL) student focused on web and Android application development. He is passionate about IT Support and aspires to become a professional Help Desk Support Manager. 🎯",
                    "Nawaf is a talented young developer from Kroya, Cilacap. With 2+ years of experience and 20+ projects, he continues to grow in the technology field. 🚀",
                    "Meet Nawaf Gadi Alfatih - an RPL student, web & mobile developer, and aspiring professional Help Desk Support Manager. 💻"
                ],
                'ar': [
                    "ناوف جادي الفتيح طالب في هندسة البرمجيات (RPL) يركز على تطوير الويب والتطبيقات. لديه شغف بمجال دعم تكنولوجيا المعلومات ويطمح ليصبح مدير دعم Help Desk محترف. 🎯",
                    "ناوف مطور شاب موهوب من كروا، جيلاجاب. مع 2+ سنة من الخبرة و20+ مشروع، يستمر في التطور في مجال التكنولوجيا. 🚀",
                    "تعرّف على ناوف جادي الفتيح - طالب RPL، مطور ويب وتطبيقات، ومدير دعم Help Desk طموح. 💻"
                ],
                'zh': [
                    "Nawaf Gadi Alfatih 是一名软件工程(RPL)专业学生,专注于网络和安卓应用开发。他对IT支持充满热情,立志成为专业的Help Desk支持经理。🎯",
                    "Nawaf 是来自Kroya的年轻天才开发者。拥有2+年经验和20+个项目,他在科技领域不断成长。🚀",
                    "认识Nawaf Gadi Alfatih - RPL学生、网络和移动应用开发者、有志的Help Desk支持经理。💻"
                ]
            },
            'projects': {
                'keywords': ['project', 'proyek', 'karya', 'portofolio', 'web', 'aplikasi', 'apps', 'website', 'hasil kerja'],
                'id': [
                    "Nawaf telah mengerjakan berbagai project menarik:\n\n• Web Tiket - Sistem pemesanan tiket online\n• Bank Sampah - Manajemen sampah digital\n• Admin Ticket - Dashboard administratif\n• E-Cashier, Pertanian, Bank Awan - UI/UX Design\n• Curious Chimpanzee - Game 2D\n• Cashier Mobile - Aplikasi POS\n• Phone Mobile - E-commerce App\n\nSemua project menunjukkan komitmen pada kualitas! ⭐",
                    "Beberapa project unggulan Nawaf:\n🎫 Web Tiket\n♻️ Bank Sampah\n📊 Admin Ticket\n💳 E-Cashier (UI/UX)\n🌾 Pertanian (UI/UX)\n☁️ Bank Awan (UI/UX)\n🎮 Curious Chimpanzee\n📱 Cashier Mobile\n\nIngin lihat detailnya? Cek bagian Work! 🔍"
                ],
                'en': [
                    "Nawaf has worked on various interesting projects:\n\n• Web Tiket - Online ticket booking system\n• Bank Sampah - Digital waste management\n• Admin Ticket - Administrative dashboard\n• E-Cashier, Agriculture, Bank Awan - UI/UX Design\n• Curious Chimpanzee - 2D Game\n• Cashier Mobile - POS Application\n• Phone Mobile - E-commerce App\n\nAll projects demonstrate commitment to quality! ⭐",
                    "Some of Nawaf's flagship projects:\n🎫 Web Tiket\n♻️ Bank Sampah\n📊 Admin Ticket\n💳 E-Cashier (UI/UX)\n🌾 Agriculture (UI/UX)\n☁️ Bank Awan (UI/UX)\n🎮 Curious Chimpanzee\n📱 Cashier Mobile\n\nWant details? Check the Work section! 🔍"
                ],
                'ar': [
                    "عمل ناوف على عدة مشاريع مثيرة للاهتمام:\n\n• Web Tiket - نظام حجز التذاكر عبر الإنترنت\n• Bank Sampah - إدارة النفايات الرقمية\n• Admin Ticket - لوحة التحكم الإدارية\n• E-Cashier, الزراعة, Bank Awan - تصميم UI/UX\n• Curious Chimpanzee - لعبة ثنائية الأبعاد\n• Cashier Mobile - تطبيق نقاط البيع\n• Phone Mobile - تطبيق التجارة الإلكترونية\n\nجميع المشاريع تظهر الالتزام بالجودة! ⭐"
                ],
                'zh': [
                    "Nawaf 完成了许多有趣的项目:\n\n• Web Tiket - 在线订票系统\n• Bank Sampah - 数字废物管理\n• Admin Ticket - 管理仪表板\n• E-Cashier、农业、Bank Awan - UI/UX设计\n• Curious Chimpanzee - 2D游戏\n• Cashier Mobile - 销售点应用\n• Phone Mobile - 电商应用\n\n所有项目都体现了对质量的承诺! ⭐"
                ]
            },
            'skills': {
                'keywords': ['skill', 'keahlian', 'bisa', 'teknologi', 'tech', 'stack', 'bahasa pemrograman', 'framework'],
                'id': [
                    "Skill teknologi Nawaf:\n\n🎨 UI/UX Design\n💻 Frontend Development\n⚡ JavaScript & React\n📄 HTML & CSS\n📱 Kotlin (Android)\n🐍 Python\n🛠️ Laravel\n🎨 Figma & Canva\n\nDan masih terus belajar! 📚",
                    "Tech stack yang dikuasai Nawaf:\n• Frontend: HTML, CSS, JavaScript, React\n• Mobile: Kotlin, Android Studio\n• Backend: Laravel, Python\n• Design: Figma, Canva\n• Tools: Git, VS Code\n\nVersatile banget kan? 😎"
                ],
                'en': [
                    "Nawaf's technology skills:\n\n🎨 UI/UX Design\n💻 Frontend Development\n⚡ JavaScript & React\n📄 HTML & CSS\n📱 Kotlin (Android)\n🐍 Python\n🛠️ Laravel\n🎨 Figma & Canva\n\nAnd still learning! 📚",
                    "Tech stack mastered by Nawaf:\n• Frontend: HTML, CSS, JavaScript, React\n• Mobile: Kotlin, Android Studio\n• Backend: Laravel, Python\n• Design: Figma, Canva\n• Tools: Git, VS Code\n\nPretty versatile right? 😎"
                ],
                'ar': [
                    "مهارات ناوف التكنولوجية:\n\n🎨 تصميم UI/UX\n💻 تطوير الواجهة الأمامية\n⚡ JavaScript و React\n📄 HTML و CSS\n📱 Kotlin (Android)\n🐍 Python\n🛠️ Laravel\n🎨 Figma و Canva\n\nويستمر في التعلم! 📚"
                ],
                'zh': [
                    "Nawaf的技术技能:\n\n🎨 UI/UX设计\n💻 前端开发\n⚡ JavaScript和React\n📄 HTML和CSS\n📱 Kotlin (Android)\n🐍 Python\n🛠️ Laravel\n🎨 Figma和Canva\n\n还在继续学习! 📚"
                ]
            },
            'contact': {
                'keywords': ['kontak', 'contact', 'hubungi', 'email', 'telepon', 'phone', 'nomor', 'alamat', 'lokasi'],
                'id': [
                    "Hubungi Nawaf di:\n\n📧 Email: nawaf52626@gmail.com\n📱 Telepon: +62 882-3938-6759\n📍 Lokasi: Kroya, Cilacap, Jawa Tengah\n\nAtau kirim pesan lewat form Contact di website ini! 💬"
                ],
                'en': [
                    "Contact Nawaf at:\n\n📧 Email: nawaf52626@gmail.com\n📱 Phone: +62 882-3938-6759\n📍 Location: Kroya, Cilacap, Central Java\n\nOr send a message through the Contact form on this website! 💬"
                ],
                'ar': [
                    "اتصل بناوف على:\n\n📧 البريد الإلكتروني: nawaf52626@gmail.com\n📱 الهاتف: +62 882-3938-6759\n📍 الموقع: كروا، جيلاجاب، جاوة الوسطى\n\nأو أرسل رسالة عبر نموذج الاتصال على هذا الموقع! 💬"
                ],
                'zh': [
                    "联系Nawaf:\n\n📧 电子邮件: nawaf52626@gmail.com\n📱 电话: +62 882-3938-6759\n📍 位置: 克罗亚，济拉贾，中爪哇\n\n或通过本网站上的联系表单发送消息! 💬"
                ]
            },
            'experience': {
                'keywords': ['pengalaman', 'experience', 'lama', 'tahun', 'berapa', 'karir', 'career'],
                'id': [
                    "Nawaf memiliki pengalaman 2+ tahun di bidang pengembangan software dan telah menyelesaikan 20+ project. Perjalanan yang luar biasa! 🚀"
                ],
                'en': [
                    "Nawaf has 2+ years of experience in software development and has completed 20+ projects. An amazing journey! 🚀"
                ],
                'ar': [
                    "لدى ناوف 2+ سنة من الخبرة في تطوير البرمجيات واستكمل 20+ مشروع. رحلة مذهلة! 🚀"
                ],
                'zh': [
                    "Nawaf拥有2年以上的软件开发经验,已完成20多个项目。一段惊人的旅程! 🚀"
                ]
            }
        }
    
    def get_greeting(self, language='id'):
        """Get contextual greeting based on language and time"""
        hour = datetime.now().hour
        
        greetings = {
            'id': {
                'morning': "Selamat pagi! Senang bertemu dengan Anda. Ada yang bisa saya bantu tentang Nawaf? 😊",
                'afternoon': "Selamat siang! Ada yang bisa saya bantu tentang Nawaf? 🤖",
                'evening': "Selamat sore! Senang bisa membantu Anda. 💬",
                'night': "Selamat malam! Asisten AI Nawaf siap membantu. 🌙"
            },
            'en': {
                'morning': "Good morning! Nice to meet you. Can I help you with information about Nawaf? 😊",
                'afternoon': "Good afternoon! How can I assist you regarding Nawaf? 🤖",
                'evening': "Good evening! Happy to help you. 💬",
                'night': "Good night! Nawaf's AI assistant is ready to help. 🌙"
            },
            'ar': {
                'morning': "صباح الخير! يسعدني التعرف عليك. هل يمكنني مساعدتك بمعلومات عن ناوف؟ 😊",
                'afternoon': "مساء الخير! كيف يمكنني مساعدتك فيما يتعلق بناوف؟ 🤖",
                'evening': "تمام المساء! يسعدني مساعدتك. 💬",
                'night': "تصبح على خير! مساعد ناوف الذكي جاهز للمساعدة. 🌙"
            },
            'zh': {
                'morning': "早上好! 很高兴认识你。我可以帮你了解Nawaf吗? 😊",
                'afternoon': "下午好! 我能如何帮助你了解Nawaf? 🤖",
                'evening': "晚上好! 很高兴为你服务。💬",
                'night': "晚安! Nawaf的AI助手随时准备帮助。🌙"
            }
        }
        
        period = 'morning' if hour < 11 else 'afternoon' if hour < 15 else 'evening' if hour < 18 else 'night'
        
        lang_greetings = greetings.get(language, greetings['id'])
        return lang_greetings.get(period, lang_greetings['afternoon'])
    
    def process_message(self, message, language='id'):
        """Process user message and return AI response in specified language"""
        if not message or not message.strip():
            responses = {
                'id': "Silakan ketik pesan Anda. Saya siap membantu! 😊",
                'en': "Please type your message. I'm ready to help! 😊",
                'ar': "يرجى كتابة رسالتك. أنا مستعد للمساعدة! 😊",
                'zh': "请输入您的消息。我已准备就绪! 😊"
            }
            return responses.get(language, responses['id'])
        
        msg_lower = message.lower().strip()
        
        # Multilingual greeting patterns
        greetings_patterns = {
            'id': ['halo', 'hai', 'hello', 'selamat'],
            'en': ['hello', 'hi', 'hey', 'greetings'],
            'ar': ['مرحبا', 'السلام', 'صباح'],
            'zh': ['你好', '嗨', '问候']
        }
        
        thanks_patterns = {
            'id': ['terima kasih', 'thanks', 'makasih', 'tq'],
            'en': ['thank you', 'thanks', 'thx'],
            'ar': ['شكرا', 'شكراً', 'تشكر'],
            'zh': ['谢谢', '感谢', '谢了']
        }
        
        farewell_patterns = {
            'id': ['bye', 'dadah', 'sampai jumpa', 'selamat tinggal'],
            'en': ['bye', 'goodbye', 'see you'],
            'ar': ['باي', 'وداعا', 'إلى اللقاء'],
            'zh': ['再见', '拜拜', '回见']
        }
        
        # Check for greetings
        for pattern in greetings_patterns.get(language, []):
            if pattern in msg_lower:
                return self.get_greeting(language)
        
        # Thanks responses
        thanks_responses = {
            'id': [
                "Sama-sama! Senang bisa membantu. Jika ada pertanyaan lain, silakan tanya saja. 😊",
                "Dengan senang hati! Jangan ragu untuk kembali bertanya. 👍"
            ],
            'en': [
                "You're welcome! Happy to help. Feel free to ask anytime. 😊",
                "My pleasure! Don't hesitate to come back with more questions. 👍"
            ],
            'ar': [
                "على الرحب والسعة! يسعدني أن أساعدك. لا تتردد في السؤال مرة أخرى. 😊",
                "بكل سرور! لا تتردد في العودة بمزيد من الأسئلة. 👍"
            ],
            'zh': [
                "不客气! 很高兴为你服务。随时提问。 😊",
                "我的荣幸! 不要犹豫再次提问。 👍"
            ]
        }
        
        for pattern in thanks_patterns.get(language, []):
            if pattern in msg_lower:
                return random.choice(thanks_responses.get(language, thanks_responses['id']))
        
        # Farewell responses
        farewell_responses = {
            'id': [
                "Sampai jumpa! Semoga harimu menyenangkan. 👋",
                "Dadah! Terima kasih telah berkunjung. 💫"
            ],
            'en': [
                "Goodbye! Have a great day! 👋",
                "See you! Thanks for visiting. 💫"
            ],
            'ar': [
                "وداعاً! أتمنى لك يوماً رائعاً! 👋",
                "إلى اللقاء! شكراً لزيارتك. 💫"
            ],
            'zh': [
                "再见! 祝你有美好的一天! 👋",
                "拜拜! 感谢访问。💫"
            ]
        }
        
        for pattern in farewell_patterns.get(language, []):
            if pattern in msg_lower:
                return random.choice(farewell_responses.get(language, farewell_responses['id']))
        
        # Score-based keyword matching
        best_match = None
        max_score = 0
        
        for category, data in self.responses.items():
            score = 0
            for keyword in data['keywords']:
                if keyword in msg_lower:
                    score += len(keyword)
            
            if score > max_score:
                max_score = score
                best_match = data
        
        if best_match and language in best_match:
            return random.choice(best_match[language])
        
        # Unknown response
        unknown_responses = {
            'id': [
                "Maaf, saya belum memahami pertanyaan tersebut. Coba tanya tentang: Nawaf, project, skill, kontak, atau pengalaman. 🤔",
                "Hmm, saya belum punya jawaban untuk itu. Tanya yang lain yuk! 😅"
            ],
            'en': [
                "Sorry, I don't quite understand that question. Try asking about: Nawaf, projects, skills, contact, or experience. 🤔",
                "Hmm, I don't have an answer for that yet. Ask something else! 😅"
            ],
            'ar': [
                "أعتذر، لم أفهم السؤال بعد. حاول السؤال عن: ناوف، المشاريع، المهارات، الاتصال أو الخبرة. 🤔",
                "همم، ليس لدي جواب لذلك حتى الآن. اسأل شيئاً آخر! 😅"
            ],
            'zh': [
                "抱歉,我还不太理解那个问题。试试问关于: Nawaf、项目、技能、联系或经验。🤔",
                "嗯，我还没有答案。问些别的吧! 😅"
            ]
        }
        
        return random.choice(unknown_responses.get(language, unknown_responses['id']))
    
    def get_suggestions(self, message, language='id'):
        """Get contextual suggestions in specified language"""
        msg_lower = message.lower()
        
        suggestions_db = {
            'id': {
                'about': [
                    {"msg": "Project apa yang pernah dibuat?", "label": "Lihat Project"},
                    {"msg": "Skill teknologi apa saja?", "label": "Lihat Skill"},
                    {"msg": "Bagaimana cara kontak?", "label": "Kontak"}
                ],
                'project': [
                    {"msg": "Ceritakan tentang Nawaf", "label": "Tentang Nawaf"},
                    {"msg": "Skill teknologi apa saja?", "label": "Lihat Skill"},
                    {"msg": "Berapa harga project?", "label": "Harga"}
                ],
                'skill': [
                    {"msg": "Project apa yang pernah dibuat?", "label": "Lihat Project"},
                    {"msg": "Bagaimana cara kontak?", "label": "Kontak"},
                    {"msg": "Pengalaman kerja berapa lama?", "label": "Pengalaman"}
                ],
                'contact': [
                    {"msg": "Ceritakan tentang Nawaf", "label": "Tentang Nawaf"},
                    {"msg": "Project apa yang pernah dibuat?", "label": "Lihat Project"},
                    {"msg": "Apa skill yang dikuasai?", "label": "Skill"}
                ],
                'default': [
                    {"msg": "Ceritakan tentang Nawaf", "label": "Tentang Nawaf"},
                    {"msg": "Project apa saja?", "label": "Project"},
                    {"msg": "Skill teknologi apa?", "label": "Skill"}
                ]
            },
            'en': {
                'about': [
                    {"msg": "What projects have you done?", "label": "See Projects"},
                    {"msg": "What technologies do you know?", "label": "See Skills"},
                    {"msg": "How can I contact you?", "label": "Contact"}
                ],
                'project': [
                    {"msg": "Tell me about Nawaf", "label": "About Nawaf"},
                    {"msg": "What technologies do you know?", "label": "See Skills"},
                    {"msg": "What's your rate?", "label": "Pricing"}
                ],
                'skill': [
                    {"msg": "What projects have you done?", "label": "See Projects"},
                    {"msg": "How can I contact you?", "label": "Contact"},
                    {"msg": "How much experience do you have?", "label": "Experience"}
                ],
                'contact': [
                    {"msg": "Tell me about Nawaf", "label": "About Nawaf"},
                    {"msg": "What projects have you done?", "label": "See Projects"},
                    {"msg": "What technologies do you know?", "label": "See Skills"}
                ],
                'default': [
                    {"msg": "Tell me about Nawaf", "label": "About Nawaf"},
                    {"msg": "What projects?", "label": "Projects"},
                    {"msg": "What technologies?", "label": "Skills"}
                ]
            },
            'ar': {
                'about': [
                    {"msg": "ما المشاريع التي عملت عليها؟", "label": "شاهد المشاريع"},
                    {"msg": "ما التقنيات التي تعرفها؟", "label": "شاهد المهارات"},
                    {"msg": "كيف يمكنني الاتصال؟", "label": "اتصل"}
                ],
                'default': [
                    {"msg": "أخبرني عن ناوف", "label": "عن ناوف"},
                    {"msg": "ما المشاريع؟", "label": "المشاريع"},
                    {"msg": "ما المهارات؟", "label": "المهارات"}
                ]
            },
            'zh': {
                'about': [
                    {"msg": "你完成过哪些项目?", "label": "查看项目"},
                    {"msg": "你掌握哪些技术?", "label": "查看技能"},
                    {"msg": "我如何联系你?", "label": "联系"}
                ],
                'default': [
                    {"msg": "告诉我关于Nawaf的事", "label": "关于Nawaf"},
                    {"msg": "有哪些项目?", "label": "项目"},
                    {"msg": "有哪些技能?", "label": "技能"}
                ]
            }
        }
        
        lang_suggestions = suggestions_db.get(language, suggestions_db['id'])
        
        if any(w in msg_lower for w in ['nawaf', 'siapa', 'tentang', 'about', 'profile', 'who']):
            return lang_suggestions.get('about', lang_suggestions['default'])
        elif any(w in msg_lower for w in ['project', 'proyek', 'karya', 'web', 'aplikasi']):
            return lang_suggestions.get('project', lang_suggestions['default'])
        elif any(w in msg_lower for w in ['skill', 'teknologi', 'bisa', 'tech']):
            return lang_suggestions.get('skill', lang_suggestions['default'])
        elif any(w in msg_lower for w in ['kontak', 'hubungi', 'email', 'contact']):
            return lang_suggestions.get('contact', lang_suggestions['default'])
        
        return lang_suggestions.get('default', [])


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
        if language not in ['id', 'en', 'ar', 'zh']:
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
