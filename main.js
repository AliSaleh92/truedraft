const banners = ['images/banner1.jpg', 'images/banner2.jpg', 'images/banner3.jpg', 'images/banner4.jpg', 'images/banner5.jpg', 'images/banner6.jpg', 'images/banner7.jpg', 'images/banner8.jpg', 'images/banner9.jpg', 'images/banner10.jpg'];
let currentSlide = 0;
let currentLang = localStorage.getItem('lang') || 'ar';

const translations = {
    ar: {
        home: 'الرئيسية', about: 'عن ترو درفت', projects: 'مشاريعنا', blog: 'المدونة', contact: 'تواصل معنا', careers: 'التوظيف',
        about_title: 'عن True Draft', about_text: 'تأسست True Draft على مبدأ أن كل مشروع مميز يبدأ من مسودة حقيقية… مسودة دقيقة، صادقة، وواضحة الاتجاه. نحن نصنع مشاريع تُبنى على رؤية أصلية لا تنحرف، وتفاصيل تُصاغ بعناية منذ اللحظة الأولى وحتى اكتمال التنفيذ.',
        vision_title: 'رؤيتنا', vision_text: 'أن نكون مرجعاً في صناعة التصميم والبناء، حيث تبدأ المشاريع من أساس صحيح وتكتمل بمعايير عالية تعكس أصالة الفكرة الأولى.',
        mission_title: 'رسالتنا', mission_text: 'تقديم رحلة تصميم وبناء شفافة ومدروسة، نحافظ فيها على روح المشروع منذ مخططه الأول وحتى تسليمه كمنجز متقن ورفيع.',
        goal_title: 'هدفنا', goal_text: 'صياغة حلول تصميم وبناء ترتكز على فكرة نقيّة وخطة محكمة، لتتحول إلى واقع يحمل نفس صدق وجودة المسودة الأولى.',
        contact_header: 'تواصل معنا', email_label: 'البريد الإلكتروني', phone_label: 'اتصل بنا', location_label: 'الموقع', location_val: 'الرياض، المملكة العربية السعودية',
        rights: 'جميع الحقوق محفوظة لشركة True Draft © 2025', privacy: 'سياسة الخصوصية', terms: 'الشروط والأحكام',
        careers_title: 'انضم إلى فريقنا', careers_subtitle: 'املأ النموذج أدناه وسيتم إرسال طلبك مباشرة.',
        form_name: 'الاسم', form_phone: 'رقم الجوال', form_email: 'البريد الإلكتروني', form_position: 'المسمى الوظيفي', form_message: 'الرسالة',
        form_send: 'إرسال', form_send_app: 'إرسال الطلب', select_position: 'اختر التخصص...',
        projects_title: 'مشاريعنا', blog_title: 'المدونة'
    },
    en: {
        home: 'Home', about: 'About Us', projects: 'Projects', blog: 'Blog', contact: 'Contact', careers: 'Careers',
        about_title: 'About True Draft', about_text: 'True Draft was founded on the principle that every distinctive project begins with a true draft... a precise, honest, and clear-direction draft. We craft projects built on an original vision that does not deviate, with details meticulously shaped from the very first moment until completion.',
        vision_title: 'Vision', vision_text: 'To be a benchmark in the design and build industry, where projects start from a correct foundation and complete with high standards reflecting the originality of the initial idea.',
        mission_title: 'Mission', mission_text: 'To deliver a transparent and thoughtful design and build journey, preserving the project\'s spirit from its first blueprint to its delivery as a refined accomplishment.',
        goal_title: 'Goal', goal_text: 'To formulate design and build solutions grounded in a pure idea and a solid plan, transforming into reality carrying the same honesty and quality of the first draft.',
        contact_header: 'Get in Touch', email_label: 'Email', phone_label: 'Call Us', location_label: 'Location', location_val: 'Riyadh, Saudi Arabia',
        rights: 'All rights reserved True Draft © 2025', privacy: 'Privacy Policy', terms: 'Terms & Conditions',
        careers_title: 'Join Our Team', careers_subtitle: 'Fill the form below to send your application.',
        form_name: 'Name', form_phone: 'Mobile', form_email: 'Email', form_position: 'Position', form_message: 'Message',
        form_send: 'Send', form_send_app: 'Submit Application', select_position: 'Select Position...',
        projects_title: 'Our Projects', blog_title: 'Blog'
    }
};

async function loadSharedComponents() {
    try {
        const headerRes = await fetch('header.html');
        if (headerRes.ok) {
            document.getElementById('header-placeholder').innerHTML = await headerRes.text();
        }
        
        const footerRes = await fetch('footer.html');
        if (footerRes.ok) {
            document.getElementById('footer-placeholder').innerHTML = await footerRes.text();
        }
        
        applyLanguage();
        updateLegalLang(); 
    } catch (e) { 
        console.error("Error loading components (Check if running on local server):", e); 
    }
}

function applyLanguage() {
    document.documentElement.lang = currentLang;
    document.documentElement.dir = currentLang === 'ar' ? 'rtl' : 'ltr';
    document.body.style.fontFamily = currentLang === 'ar' ? "'Cairo', sans-serif" : "'Manrope', sans-serif";
    
    const btnText = document.getElementById('lang-btn-text');
    if(btnText) btnText.textContent = currentLang === 'ar' ? 'EN' : 'عربي';
    
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if(translations[currentLang][key]) el.textContent = translations[currentLang][key];
    });
    updateLegalLang();
}

function toggleLanguage() {
    currentLang = currentLang === 'ar' ? 'en' : 'ar';
    localStorage.setItem('lang', currentLang);
    applyLanguage();
}

function updateLegalLang() {
    if (currentLang === 'ar') {
        document.querySelectorAll('.lang-ar').forEach(el => el.classList.remove('hidden'));
        document.querySelectorAll('.lang-en').forEach(el => el.classList.add('hidden'));
    } else {
        document.querySelectorAll('.lang-ar').forEach(el => el.classList.add('hidden'));
        document.querySelectorAll('.lang-en').forEach(el => el.classList.remove('hidden'));
    }
}

function initSlider() {
    const container = document.getElementById('slider-container');
    if(!container) return;
    
    // Clear existing content to prevent duplication if re-run
    container.innerHTML = '';
    
    banners.forEach((src, index) => {
        const div = document.createElement('div');
        div.className = `slide ${index === 0 ? 'active' : ''}`;
        const img = document.createElement('img');
        img.src = src; 
        img.alt = `Slide ${index + 1}`;
        img.onerror = function() { this.style.display = 'none'; }; 
        div.appendChild(img); 
        container.appendChild(div);
    });

    // Clear any existing intervals to avoid double-speed slider
    if (window.sliderInterval) clearInterval(window.sliderInterval);
    
    window.sliderInterval = setInterval(() => {
        const slides = document.querySelectorAll('.slide');
        if (slides.length > 0) {
            slides[currentSlide].classList.remove('active');
            currentSlide = (currentSlide + 1) % slides.length;
            slides[currentSlide].classList.add('active');
        }
    }, 5000);
}

function nextSlide() { 
    const s = document.querySelectorAll('.slide'); 
    if(s.length){ 
        s[currentSlide].classList.remove('active'); 
        currentSlide = (currentSlide + 1) % s.length; 
        s[currentSlide].classList.add('active'); 
    }
}

function prevSlide() { 
    const s = document.querySelectorAll('.slide'); 
    if(s.length){ 
        s[currentSlide].classList.remove('active'); 
        currentSlide = (currentSlide - 1 + s.length) % s.length; 
        s[currentSlide].classList.add('active'); 
    }
}

// Shared Globals attached to window so they can be called from HTML onclick
window.openModal = (id) => { 
    const modal = document.getElementById(id);
    if(modal) {
        modal.classList.remove('hidden'); 
        document.body.style.overflow = 'hidden'; 
    }
};

window.closeModal = (id) => { 
    const modal = document.getElementById(id);
    if(modal) {
        modal.classList.add('hidden'); 
        document.body.style.overflow = 'auto'; 
    }
};

window.toggleMenu = () => { 
    const m = document.getElementById('mobile-menu'); 
    if(m) {
        m.classList.toggle('hidden'); 
        m.classList.toggle('flex'); 
    }
};

window.submitCareerForm = (e) => { 
    e.preventDefault(); 
    const n = document.getElementById('career-name').value; 
    // Basic validation or processing here
    window.location.href=`mailto:hr@truedraft.com.sa?subject=Job Application: ${n}`; 
};

window.submitContactForm = (e) => { 
    e.preventDefault(); 
    const n = document.getElementById('contact-name').value; 
    window.location.href=`mailto:info@truedraft.com.sa?subject=Contact: ${n}`; 
};

window.toggleLanguage = toggleLanguage;
window.nextSlide = nextSlide;
window.prevSlide = prevSlide;

// Init
document.addEventListener('DOMContentLoaded', () => { 
    loadSharedComponents(); 
    initSlider(); 
});