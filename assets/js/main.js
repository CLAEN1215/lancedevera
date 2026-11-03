/* ── Scroll reveal (Intersection Observer) ───────────── */
const observerOptions = {
    root: null,
    rootMargin: "0px",
    threshold: 0.1
};

const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            obs.unobserve(entry.target);
        }
    });
}, observerOptions);

document.querySelectorAll(".fade-up").forEach(elem => observer.observe(elem));

/* ── Hero photo 3D parallax tilt ─────────────────────── */
const tiltContainer = document.getElementById("hero-img-container");
if (tiltContainer) {
    tiltContainer.addEventListener("mousemove", e => {
        const rect = tiltContainer.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateX = ((y - centerY) / centerY) * -10;
        const rotateY = ((x - centerX) / centerX) * 10;
        tiltContainer.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    });

    tiltContainer.addEventListener("mouseleave", () => {
        tiltContainer.style.transform = "rotateX(0) rotateY(0)";
    });
}

/* ── Accordion (proof panels) ────────────────────────── */
function toggleAccordion(button) {
    const item = button.parentElement;
    const allItems = document.querySelectorAll(".accordion-item");

    // Close all others
    allItems.forEach(i => {
        if (i !== item) i.classList.remove("active");
    });

    // Toggle current
    item.classList.toggle("active");
}

/* ── Email copy to clipboard + toast ─────────────────── */
function copyEmail() {
    const emailText = document.getElementById("email-text").innerText;
    navigator.clipboard.writeText(emailText).then(() => {
        const toast = document.getElementById("toast");
        toast.classList.add("show");
        setTimeout(() => toast.classList.remove("show"), 3000);
    });
}

/* ── Light / Dark / System theme toggle ──────────────── */
function toggleTheme() {
    const html = document.documentElement;

    if (!document.startViewTransition) {
        html.classList.toggle("dark");
        html.classList.toggle("light");
        return;
    }

    // Circular reveal wipe using View Transitions API
    document.startViewTransition(() => {
        html.classList.toggle("dark");
        html.classList.toggle("light");
    });
}

/* ── Mobile Menu Toggle ──────────────────────────────── */
function toggleMobileMenu() {
    const menu = document.getElementById("mobile-menu");
    if (menu.classList.contains("translate-x-full")) {
        menu.classList.remove("translate-x-full");
        document.body.style.overflow = "hidden"; // Prevent scrolling
    } else {
        menu.classList.add("translate-x-full");
        document.body.style.overflow = ""; // Restore scrolling
    }
}
