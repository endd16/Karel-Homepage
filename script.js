// 1. JAM DIGITAL, SAPAAN OTOMATIS & TANGGAL
function updateClock() {
    const now = new Date();
    const hour = now.getHours();
    let greetingText = "";

    if (hour >= 4 && hour <= 10) {
        greetingText = "Selamat Pagi, Karel! ☀️";
    } else if (hour >= 11 && hour <= 14) {
        greetingText = "Selamat Siang, Karel! 🌤️";
    } else if (hour >= 15 && hour <= 17) {
        greetingText = "Selamat Sore, Karel! 🌇";
    } else {
        greetingText = "Selamat Malam, Karel! 🌙";
    }

    const time = now.toLocaleTimeString('id-ID', {
        hour12: false
    }).replace(/\./g, ':');

    const date = now.toLocaleDateString('id-ID', {
        weekday: 'long',
        day: 'numeric',
        month: 'long',
        year: 'numeric'
    });

    document.getElementById("greeting").textContent = greetingText;
    document.getElementById("clock").textContent = time;
    document.getElementById("date").textContent = date;
}

setInterval(updateClock, 1000);
updateClock();

// 2. TOMBOL EXPLORE DI HERO -> SCROLL HALUS KE BAGIAN ABOUT
const exploreBtn = document.getElementById("exploreBtn");
const aboutSection = document.getElementById("about");

if (exploreBtn && aboutSection) {
    exploreBtn.addEventListener("click", () => {
        aboutSection.scrollIntoView({ behavior: "smooth" });
    });
}

// 3. TOMBOL SALIN EMAIL DI BAGIAN CONTACT
const copyEmailBtn = document.getElementById("copyEmailBtn");

if (copyEmailBtn) {
    copyEmailBtn.addEventListener("click", async () => {
        const email = "karel7424@gmail.com";
        try {
            await navigator.clipboard.writeText(email);
            copyEmailBtn.textContent = "Email Tersalin! ✅";
        } catch {
            copyEmailBtn.textContent = "Email: " + email;
        }

        setTimeout(() => {
            copyEmailBtn.textContent = "Salin Email 📋";
        }, 2200);
    });
}

// 4. FORM KONTAK -> LANGSUNG BUKA GMAIL PENGUNJUNG
const contactForm = document.getElementById("contactForm");
const formStatus = document.getElementById("formStatus");

if (contactForm && formStatus) {
    contactForm.addEventListener("submit", (event) => {
        event.preventDefault();

        const senderName = document.getElementById("senderName").value.trim();
        const senderEmailInput = document.getElementById("senderEmail");
        const senderEmail = senderEmailInput.value.trim();
        const senderMessage = document.getElementById("senderMessage").value.trim();

        if (!senderName || !senderEmail || !senderMessage) {
            formStatus.className = "form-status error";
            formStatus.textContent = "Tolong lengkapi nama, email, dan pesan dulu ya.";
            return;
        }

        if (!senderEmailInput.checkValidity()) {
            formStatus.className = "form-status error";
            formStatus.textContent = "Format email belum valid. Contoh: nama@gmail.com";
            senderEmailInput.focus();
            return;
        }

        const recipient = "karel7424@gmail.com";
        const subject = `Pesan dari ${senderName} (Website Dunia Karel)`;
        const body = `Halo Karel,\n\nNama: ${senderName}\nEmail: ${senderEmail}\n\nPesan:\n${senderMessage}`;
        const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(recipient)}&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

        window.open(gmailUrl, "_blank", "noopener,noreferrer");

        formStatus.className = "form-status success";
        formStatus.textContent = `Siap! Gmail untuk mengirim pesan ke ${recipient} sedang dibuka. Jika tab baru tidak terbuka otomatis, klik: `;

        const fallbackLink = document.createElement("a");
        fallbackLink.href = gmailUrl;
        fallbackLink.target = "_blank";
        fallbackLink.rel = "noopener noreferrer";
        fallbackLink.textContent = "Buka Gmail di sini";
        formStatus.appendChild(fallbackLink);

        contactForm.reset();
    });
}

// 5. TOMBOL KEMBALI KE ATAS
const backToTopBtn = document.getElementById("backToTop");

if (backToTopBtn) {
    window.addEventListener("scroll", () => {
        if (window.scrollY > 300) {
            backToTopBtn.classList.add("visible");
        } else {
            backToTopBtn.classList.remove("visible");
        }
    });

    backToTopBtn.addEventListener("click", () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    });
}
