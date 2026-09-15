/**
 * Script Interaktivitas Portofolio Muhamad Alif Rahmat
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Header Scroll Shadow
  const header = document.getElementById('siteHeader');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });

  // 2. Mobile Menu Toggle
  const mobileToggle = document.getElementById('mobileToggle');
  const navMenu = document.getElementById('navMenu');
  const navLinks = document.querySelectorAll('.nav-link');

  if (mobileToggle && navMenu) {
    mobileToggle.addEventListener('click', () => {
      navMenu.classList.toggle('open');
      const icon = mobileToggle.querySelector('i');
      if (navMenu.classList.contains('open')) {
        icon.classList.remove('fa-bars-staggered');
        icon.classList.add('fa-xmark');
      } else {
        icon.classList.remove('fa-xmark');
        icon.classList.add('fa-bars-staggered');
      }
    });

    // Tutup menu mobile ketika link di-klik
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('open');
        const icon = mobileToggle.querySelector('i');
        if (icon) {
          icon.classList.remove('fa-xmark');
          icon.classList.add('fa-bars-staggered');
        }
      });
    });
  }

  // 3. Active Link on Scroll (ScrollSpy)
  const sections = document.querySelectorAll('section[id]');
  window.addEventListener('scroll', () => {
    const scrollY = window.pageYOffset;

    sections.forEach(current => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop - 120;
      const sectionId = current.getAttribute('id');

      if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
        document.querySelector(`.nav-menu a[href*='${sectionId}']`)?.classList.add('active');
      } else {
        document.querySelector(`.nav-menu a[href*='${sectionId}']`)?.classList.remove('active');
      }
    });
  });

  // 4. Filter Pengalaman Organisasi
  const filterBtns = document.querySelectorAll('.filter-btn');
  const orgCards = document.querySelectorAll('.org-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // Ubah button aktif
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');

      orgCards.forEach(card => {
        if (filterValue === 'all' || card.getAttribute('data-category') === filterValue) {
          card.style.display = 'flex';
          card.style.animation = 'fadeInUp 0.4s ease forwards';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  // 5. Contact Form Simulation (mailto opener / confirmation)
  const contactForm = document.getElementById('contactForm');
  const formFeedback = document.getElementById('formFeedback');

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = document.getElementById('senderName').value;
      const email = document.getElementById('senderEmail').value;
      const subject = document.getElementById('senderSubject').value;
      const message = document.getElementById('senderMessage').value;

      // Siapkan mailto link ke email Gmail Alif Rahmat
      const mailtoUrl = `mailto:muhamadlifrahmat12@gmail.com?subject=${encodeURIComponent(`[Portofolio UNJ] ${subject} - ${name}`)}&body=${encodeURIComponent(`Halo Muhamad Alif Rahmat,\n\nNama: ${name}\nEmail: ${email}\n\nPesan:\n${message}`)}`;

      // Buka aplikasi email
      window.location.href = mailtoUrl;

      // Tampilkan notifikasi konfirmasi
      if (formFeedback) {
        formFeedback.className = 'form-feedback success';
        formFeedback.innerHTML = `<i class="fa-solid fa-circle-check"></i> Terima kasih <strong>${name}</strong>, draft pesan telah disiapkan di email Anda untuk dikirim ke <em>muhamadlifrahmat12@gmail.com</em>.`;
      }

      contactForm.reset();
    });
  }
});
