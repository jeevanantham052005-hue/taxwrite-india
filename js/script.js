/* TaxWrite India - Production Ready JS
   Efficient, no heavy libs, respects reduced motion
   JS ORGANISATION:
   Global
   Navigation
   Mobile Menu
   Scroll Reveal
   Service Card Interaction
   Service Modals
   FAQ
   Contact Form
   Mobile Touch Interaction
   Accessibility
   Performance Utilities
*/
(() => {
  /* Global */
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const isTouch = ('ontouchstart' in window) || navigator.maxTouchPoints > 0;

  /* Scroll Reveal — enhanced with slide-in + fade for all cards */
  document.addEventListener('DOMContentLoaded', () => {
    const revealSelector = '.reveal, .who-card, .quick-card, .contact-form-card, .quick-contact-panel, .faq-item, .cta, .hero-main-card, .info-card';
    if (!prefersReduced) {
      const io = new IntersectionObserver((entries) => {
        entries.forEach(ent => {
          if (ent.isIntersecting) { ent.target.classList.add('in'); io.unobserve(ent.target); }
        });
      }, { threshold: 0.14, rootMargin: '0px 0px -10% 0px' });
      document.querySelectorAll(revealSelector).forEach(el => {
        // ensure reveal base for cards that didn't have it
        if (!el.classList.contains('reveal')) el.classList.add('reveal');
        io.observe(el);
      });
    } else {
      document.querySelectorAll(revealSelector).forEach(el => {
        el.classList.add('in');
        el.classList.add('reveal');
      });
    }

    // Button glow follows cursor — for glowing colour effect
    document.querySelectorAll('.btn, .aws-cta').forEach(btn => {
      btn.addEventListener('mousemove', (e) => {
        const rect = btn.getBoundingClientRect();
        const mx = ((e.clientX - rect.left) / rect.width) * 100;
        const my = ((e.clientY - rect.top) / rect.height) * 100;
        btn.style.setProperty('--mx', mx + '%');
        btn.style.setProperty('--my', my + '%');
      });
    });

    // FAQ accordion - supports both .faq-q and details/summary
    document.querySelectorAll('.faq-item').forEach(item => {
      const btn = item.querySelector('.faq-q');
      if (!btn) return;
      btn.addEventListener('click', () => {
        const open = item.classList.contains('is-open');
        // close others in same list if needed? Keep multiple open allowed, but spec says accordion - close others
        const list = item.closest('.faq-list');
        if (list) list.querySelectorAll('.faq-item.is-open').forEach(i => { if (i !== item) i.classList.remove('is-open'); });
        item.classList.toggle('is-open', !open);
        btn.setAttribute('aria-expanded', String(!open));
      });
      btn.setAttribute('aria-expanded', 'false');
    });

    // Contact form — premium conversion UX
    const form = document.getElementById('contactForm');
    const statusEl = document.getElementById('formStatus');
    if (form && statusEl) {
      const statusIcon = statusEl.querySelector('.status-icon');
      const statusText = statusEl.querySelector('.status-text') || statusEl;
      function showStatus(type, message, icon) {
        statusEl.classList.remove('success','error','show');
        void statusEl.offsetWidth;
        statusEl.classList.add(type,'show');
        if (statusIcon) statusIcon.textContent = icon || (type === 'success' ? '✓' : '!');
        if (statusText) statusText.textContent = message;
        else statusEl.textContent = message;
        statusEl.scrollIntoView({ behavior:'smooth', block:'nearest' });
      }
      function setFieldError(id, msg){
        const input = document.getElementById(id);
        const errEl = document.getElementById(id+'-error');
        if (input) input.classList.add('input-error');
        if (errEl) errEl.textContent = msg || '';
      }
      function clearFieldError(id){
        const input = document.getElementById(id);
        const errEl = document.getElementById(id+'-error');
        if (input) input.classList.remove('input-error');
        if (errEl) errEl.textContent = '';
      }
      function clearAllErrors(){
        ['name','phone','email','businessType','service','message'].forEach(clearFieldError);
      }
      // clear on input
      form.querySelectorAll('.input').forEach(inp=>{
        inp.addEventListener('input', ()=>clearFieldError(inp.id));
        inp.addEventListener('change', ()=>clearFieldError(inp.id));
      });
      form.addEventListener('submit', e => {
        e.preventDefault();
        clearAllErrors();
        const data = new FormData(form);
        const name = (data.get('name')||'').toString().trim();
        const phone = (data.get('phone')||'').toString().trim();
        const email = (data.get('email')||'').toString().trim();
        const businessType = (data.get('businessType')||'').toString().trim();
        const service = (data.get('service')||'').toString().trim();
        const message = (data.get('message')||'').toString().trim();
        const submitBtn = form.querySelector('button[type="submit"]');
        let firstInvalid = null;
        let hasError = false;

        if (!name) { setFieldError('name','Please enter your full name.'); if(!firstInvalid) firstInvalid=document.getElementById('name'); hasError=true; }
        if (!phone || phone.replace(/\D/g,'').length < 10) { setFieldError('phone','Please enter a valid 10-digit mobile number.'); if(!firstInvalid) firstInvalid=document.getElementById('phone'); hasError=true; }
        if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { setFieldError('email','Please enter a valid email address.'); if(!firstInvalid) firstInvalid=document.getElementById('email'); hasError=true; }
        if (!service) { setFieldError('service','Please select a service.'); if(!firstInvalid) firstInvalid=document.getElementById('service'); hasError=true; }
        if (!message || message.length < 10) { setFieldError('message','Please tell us briefly what you need help with.'); if(!firstInvalid) firstInvalid=document.getElementById('message'); hasError=true; }

        if (hasError) {
          showStatus('error','Please fix the highlighted fields and try again.','!');
          if (firstInvalid) firstInvalid.focus();
          return;
        }
        if (submitBtn) { submitBtn.disabled = true; submitBtn.textContent = 'Sending...'; submitBtn.style.opacity = '.7'; }

        // === WORKING FORM WITHOUT PHP — Google Sheet "taxwrite new leads" + Email ===
        // 1. Saves to Google Sheet titled "taxwrite new leads"
        // 2. Sends email to official@taxwrite.org
        // See GOOGLE_SHEET_SETUP.md for setup instructions

        // !!! REPLACE THIS WITH YOUR DEPLOYED WEB APP URL FROM GOOGLE APPS SCRIPT !!!
        const GOOGLE_SHEET_URL = "https://script.google.com/macros/s/AKfycbxCtO8JhrvJNdX8SAeKS7KO2cebuFnAh1ZYonFumjFqcjcHSEqxVdum1djKKFwIud7M_g/exec";
        // Example: const GOOGLE_SHEET_URL = "https://script.google.com/macros/s/AKfycb.../exec";

        const formData = new FormData(form);
        formData.append('_timestamp', new Date().toISOString());
        formData.append('page_url', window.location.href);
        formData.append('phone_display', '+91 7200215338');
        formData.append('userAgent', navigator.userAgent);

        // Helper to show success
        function handleSuccess() {
          showStatus('success','Thank you. We’ve received your consultation request. Our team will review your requirement and contact you at +91 7200215338 / official@taxwrite.org','✓');
          let actions = statusEl.querySelector('.success-actions');
          if (!actions) {
            actions = document.createElement('div');
            actions.className = 'success-actions';
            actions.style.cssText = 'display:flex;gap:10px;margin-top:12px;flex-wrap:wrap';
            actions.innerHTML = '<a class="btn btn-whatsapp" href="https://wa.me/917200215338" target="_blank" style="min-height:40px;padding:0 16px;font-size:13px">Start WhatsApp Chat</a><a class="btn btn-secondary" href="services.html" style="min-height:40px;padding:0 16px;font-size:13px">Back to Services</a>';
            statusEl.appendChild(actions);
          }
          form.reset();
        }

        // If Google Sheet URL is configured, use it (saves to Excel sheet "taxwrite new leads" + emails)
        // Using no-cors mode to avoid Google redirect CORS issues - data still saves
        if (GOOGLE_SHEET_URL && GOOGLE_SHEET_URL.startsWith("https://script.google.com/")) {
          // Try Google Sheet first with no-cors (opaque response, but saves to sheet)
          fetch(GOOGLE_SHEET_URL, {
            method: 'POST',
            body: formData,
            mode: 'no-cors'
          })
          .then(() => {
            console.log('Google Sheet submission sent (no-cors)');
            handleSuccess();
            // Backup email via FormSubmit - fire and forget, don't block success
            const emailData = new FormData(form);
            emailData.append('_subject', 'New Lead - TaxWrite India');
            emailData.append('_captcha', 'false');
            fetch('https://formsubmit.co/ajax/official@taxwrite.org', {
              method: 'POST',
              body: emailData,
              headers: { 'Accept': 'application/json' }
            }).then(r=>r.json()).then(d=>console.log('FormSubmit backup:', d)).catch(e=>console.log('FormSubmit backup failed (needs confirmation first time):', e));
          })
          .catch(error => {
            console.error('Google Sheet submit error:', error);
            // Fallback to FormSubmit only for email
            fetch('https://formsubmit.co/ajax/official@taxwrite.org', {
              method: 'POST',
              body: formData,
              headers: { 'Accept': 'application/json' }
            })
            .then(async response => {
              const result = await response.json().catch(()=>({}));
              if (!response.ok) throw new Error(result.message || 'Submission failed');
              handleSuccess();
            })
            .catch(err => {
              console.error('Form submit error:', err);
              // Even if both fail, check if it's FormSubmit confirmation issue
              // FormSubmit requires first-time email confirmation - show helpful message
              if (err.message && err.message.includes("confirmation")) {
                showStatus('success','Thank you! Your request is noted. Please check official@taxwrite.org inbox to confirm FormSubmit (first time only), or contact us directly at +91 7200215338','✓');
                form.reset();
              } else {
                showStatus('error','We couldn\'t send your request. Please try WhatsApp +91 7200215338 or email official@taxwrite.org directly.','!');
              }
            });
          })
          .finally(() => {
            if (submitBtn) { submitBtn.disabled = false; submitBtn.textContent = 'Get Started'; submitBtn.style.opacity = '1'; }
          });
        } else {
          // No Google Sheet URL yet - use FormSubmit only (email to official@taxwrite.org)
          // This works immediately without any setup
          fetch('https://formsubmit.co/ajax/official@taxwrite.org', {
            method: 'POST',
            body: formData,
            headers: { 'Accept': 'application/json' }
          })
          .then(async response => {
            const result = await response.json().catch(()=>({}));
            if (!response.ok) throw new Error(result.message || 'Submission failed');
            handleSuccess();
          })
          .catch(error => {
            console.error('Form submit error:', error);
            showStatus('error','We couldn\'t send your request. Please try WhatsApp +91 7200215338 or email official@taxwrite.org directly.','!');
          })
          .finally(() => {
            if (submitBtn) { submitBtn.disabled = false; submitBtn.textContent = 'Get Started'; submitBtn.style.opacity = '1'; }
          });
        }
      });

      // Quick contact cards cursor glow
      document.querySelectorAll('.quick-card').forEach(card=>{
        if (card.classList.contains('location-card')) return;
        card.addEventListener('mousemove', (e)=>{
          const rect = card.getBoundingClientRect();
          const x = ((e.clientX - rect.left)/rect.width)*100;
          const y = ((e.clientY - rect.top)/rect.height)*100;
          card.style.setProperty('--mx', x+'%');
          card.style.setProperty('--my', y+'%');
        });
      });
    }

    // db-plus buttons
    document.querySelectorAll('.db-plus').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const contactSection = document.getElementById('contact');
        if (contactSection) contactSection.scrollIntoView({ behavior:'smooth' });
        else window.location.href = 'contact.html';
      });
    });
  });

  // Navigation
  document.addEventListener('DOMContentLoaded', () => {
    const hamburger = document.getElementById('hamburger');
    const mobileMenu = document.getElementById('mobileMenu');
    if (!hamburger || !mobileMenu) return;
    let menuOpen = false;
    function toggleMenu(open) {
      menuOpen = open ?? !menuOpen;
      hamburger.classList.toggle('is-open', menuOpen);
      mobileMenu.classList.toggle('is-open', menuOpen);
      hamburger.setAttribute('aria-expanded', String(menuOpen));
      document.body.style.overflow = menuOpen ? 'hidden' : '';
    }
    hamburger.addEventListener('click', () => toggleMenu());
    mobileMenu.querySelectorAll('a').forEach(a => a.addEventListener('click', () => toggleMenu(false)));
    document.addEventListener('keydown', e => { if (e.key === 'Escape' && menuOpen) toggleMenu(false) });
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.aws-primary-nav a, .mobile-links a').forEach(link => {
      const href = link.getAttribute('href');
      if (href && (currentPage === href || (currentPage === '' && href === 'index.html'))) {
        link.classList.add('active');
        link.setAttribute('aria-current','page');
      }
    });
  });

  // Gradient cards - efficient with rAF, only while hovered, disabled on touch/reduced
  // Supports both legacy .db-card-wrap and new .svc-new-card-wrap
  document.addEventListener('DOMContentLoaded', () => {
    const allWraps = document.querySelectorAll('.db-card-wrap, .svc-new-card-wrap, .who-card');
    if (prefersReduced || isTouch) {
      // touch feedback only — slight scale + short glow, no tilt
      allWraps.forEach(wrap => {
        let card = wrap.querySelector('.svc-card, .svc-overview-card, .svc-new-card');
        if (!card && wrap.classList.contains('who-card')) card = wrap;
        const glow = wrap.dataset.glow || 'rgba(13,39,64,.14)';
        if (card) card.style.setProperty('--glow', glow);
        wrap.addEventListener('touchstart', () => wrap.classList.add('is-active'), { passive: true });
        wrap.addEventListener('touchend', () => setTimeout(() => wrap.classList.remove('is-active'), 600));
        // tap on card opens modal (if has data-service)
        wrap.addEventListener('click', e => {
          // ignore if clicking explicit buttons/links
          if (e.target.closest('button, a')) return;
          const sid = wrap.dataset.service || wrap.querySelector('[data-service]')?.dataset.service;
          if (sid) {
            const btn = wrap.querySelector(`[data-service="${sid}"]`);
            if (btn) btn.click();
          }
        });
      });
      return;
    }

    allWraps.forEach(wrap => {
      let card = wrap.querySelector('.svc-card, .svc-overview-card, .svc-new-card');
      if (!card && wrap.classList.contains('who-card')) card = wrap;
      const glow = wrap.dataset.glow || 'rgba(13,39,64,.14)';
      if (card) card.style.setProperty('--glow', glow);

      let rafId = null;
      let pending = null;

      function applyTransform() {
        if (!pending) return;
        const { px, py, rx, ry } = pending;
        wrap.style.setProperty('--rx', rx + 'deg');
        wrap.style.setProperty('--ry', ry + 'deg');
        if (card) {
          card.style.setProperty('--mx', px + '%');
          card.style.setProperty('--my', py + '%');
          card.style.setProperty('--mouse-x', px + '%');
          card.style.setProperty('--mouse-y', py + '%');
        }
        rafId = null;
        pending = null;
      }

      wrap.addEventListener('mousemove', e => {
        const rect = wrap.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const px = (x / rect.width) * 100;
        const py = (y / rect.height) * 100;
        // subtle tilt max 3-4 deg as spec
        const rx = ((y / rect.height) - 0.5) * -4;
        const ry = ((x / rect.width) - 0.5) * 6;
        pending = { px, py, rx, ry };
        if (!rafId) rafId = requestAnimationFrame(applyTransform);
      });

      wrap.addEventListener('mouseleave', () => {
        if (rafId) cancelAnimationFrame(rafId);
        rafId = null;
        pending = null;
        wrap.style.setProperty('--rx', '0deg');
        wrap.style.setProperty('--ry', '0deg');
        if (card) {
          card.style.setProperty('--mx', '50%');
          card.style.setProperty('--my', '50%');
          card.style.setProperty('--mouse-x', '50%');
          card.style.setProperty('--mouse-y', '50%');
        }
      });

      // click anywhere on card (except buttons handled separately) opens modal
      wrap.addEventListener('click', e => {
        if (e.target.closest('button, a')) return;
        const sid = wrap.dataset.service;
        if (sid) {
          const btn = document.querySelector(`.svc-learn-btn[data-service="${sid}"], .svc-plus-btn[data-service="${sid}"], .read-more-btn[data-service="${sid}"]`);
          if (btn) btn.click();
        }
      });
    });

    // hero card spotlight with rAF
    const heroCard = document.getElementById('heroCard');
    if (heroCard) {
      let raf = null;
      let pos = null;
      heroCard.addEventListener('mousemove', e => {
        const r = heroCard.getBoundingClientRect();
        pos = { x: e.clientX - r.left, y: e.clientY - r.top };
        if (!raf) raf = requestAnimationFrame(() => {
          if (pos) {
            heroCard.style.setProperty('--mx', pos.x + 'px');
            heroCard.style.setProperty('--my', pos.y + 'px');
          }
          raf = null;
        });
      });
    }
  });

  // Services modal with guide link
  document.addEventListener('DOMContentLoaded', () => {
    if (!document.body.classList.contains('services-page')) return;

    const serviceData = {
      "private-limited": { title: "Private Limited Company Registration", intro: "A Private Limited Company is a structured business entity commonly chosen by startups and growing businesses that want a separate legal identity and a formal ownership structure.", what: "A Private Limited Company is incorporated as a separate legal entity from its shareholders. Ownership is represented through shares, and the company operates according to applicable corporate compliance requirements.", who: ["Startups","Businesses with two or more shareholders","Companies planning structured growth","Businesses considering external investment","Founders who want a formal corporate structure"], why: ["Separate legal identity","Limited liability, subject to applicable law","Structured ownership","Better continuity","Suitable for scalable models"], how: "TaxWrite India can assist with understanding the registration process, organising required information, preparing incorporation documentation and coordinating related registration requirements.", cta: "Discuss Private Limited Registration", guide: "private-limited-company-registration-tamil-nadu.html" },
      "llp": { title: "Limited Liability Partnership (LLP) Registration", intro: "An LLP combines features of a partnership with limited liability and can be suitable for professional, consulting and service-oriented businesses.", what: "A Limited Liability Partnership is a separate legal structure in which designated partners manage the business while liability is generally governed by the applicable LLP framework.", who: ["Professional firms","Consulting businesses","Service businesses","Partnerships","Flexible management structure"], why: ["Separate legal identity","Limited liability framework","Flexible partner-based management","Suitable for professional businesses"], how: "We can help explain the LLP setup process, organise partner and business information, prepare relevant documentation and assist through the registration process.", cta: "Discuss LLP Registration", guide: "llp-registration-tamil-nadu.html" },
      "opc": { title: "One Person Company (OPC) Registration", intro: "An OPC provides eligible individual entrepreneurs with an option to operate through a corporate structure with a single member.", what: "A One Person Company is a corporate structure designed for a single eligible owner while maintaining a separate company identity.", who: ["Solo entrepreneurs","Individual founders","Consultants","Professionals","Business owners wanting corporate structure"], why: ["Separate business identity","Corporate structure for individual founder","Limited liability framework","Foundation for future growth"], how: "TaxWrite India can assist with understanding eligibility, documentation requirements and the incorporation process.", cta: "Discuss OPC Registration", guide: "company-registration-tamil-nadu.html" },
      "proprietorship": { title: "Proprietorship Business Setup", intro: "A proprietorship is one of the simplest structures for an individual to start and operate a business.", what: "A proprietorship is owned and operated by one individual. The business and owner are generally not treated as separate legal entities in the same way as an incorporated company.", who: ["Individual business owners","Freelancers","Consultants","Small retailers","Local service providers","Professionals beginning independently"], why: ["Straightforward structure","Simple ownership","Suitable for smaller operations","Easier starting point"], how: "We can help identify the registrations that may be relevant to the proprietorship, such as GST, MSME/Udyam or other applicable business registrations.", cta: "Discuss Proprietorship Setup", guide: "company-registration-tamil-nadu.html" },
      "partnership": { title: "Partnership Registration", intro: "A partnership can be considered when two or more people want to operate a business together and share agreed responsibilities.", what: "A partnership is formed between partners who agree on ownership, responsibilities and other terms governing the business.", who: ["Family businesses","Small businesses with multiple owners","Professional partnerships","Trading businesses","Service businesses"], why: ["Shared ownership","Defined partner responsibilities","Suitable for businesses operated jointly"], how: "We can assist with understanding the registration process, organising partner information and coordinating the required documentation.", cta: "Discuss Partnership Registration", guide: "company-registration-tamil-nadu.html" },
      "startup": { title: "Startup Registration Support", intro: "Starting a new venture may involve several registrations depending on the business structure, industry and future plans.", what: "Startup requirements may involve choosing a business structure, company or LLP registration, GST registration where applicable, MSME/Udyam registration, Startup India/DPIIT-related assistance where eligible, and industry-specific licences.", who: ["New founders","Early-stage startups","Technology businesses","Product businesses","Service startups","First-time entrepreneurs"], why: ["Helps organise multiple registrations","Clearer understanding of requirements","Structured documentation support"], how: "We help founders understand the registrations that may be relevant and coordinate documentation across different startup requirements.", cta: "Discuss Your Startup", guide: "company-registration-tamil-nadu.html" },
      "gst-registration": { title: "GST Registration", intro: "GST registration may be required or voluntarily considered depending on the nature, turnover and activities of a business.", what: "GST registration allows an eligible or required business to operate under the Goods and Services Tax framework.", who: ["Businesses based on turnover","Nature of supplies","Business activity","Interstate transactions","Ecommerce activities","Other GST provisions"], why: ["Correct information makes future filing easier","Helps maintain organised compliance"], how: "We can help review basic registration requirements, organise documents and assist with the GST registration application process.", cta: "Discuss GST Registration", guide: "gst-registration-tamil-nadu.html" },
      "gst-return": { title: "GST Return Filing", intro: "GST-registered businesses may have periodic return filing responsibilities based on their registration and applicable requirements.", what: "GST filing may involve sales information, purchase information, output tax details, eligible input information, reconciliation and return preparation.", who: ["Businesses already registered under GST"], why: ["Regular filing helps maintain organised compliance","Reduces risk of unresolved issues"], how: "We can support businesses with GST return preparation, records organisation and related compliance processes.", cta: "Discuss GST Filing", guide: "gst-filing-tamil-nadu.html" },
      "income-tax": { title: "Income Tax Return Filing", intro: "Income tax filing requirements vary depending on the taxpayer, business structure, income and other applicable factors.", what: "Filing may involve income details, business information, expense records, financial information and tax-related documents.", who: ["Proprietors","Professionals","Businesses","Partners","Eligible individuals"], why: ["Organised filing based on applicable requirements","Clearer financial records"], how: "We can help organise relevant information and assist with applicable income tax return filing requirements.", cta: "Discuss Income Tax Filing", guide: "tax-consultant-tamil-nadu.html" },
      "tds": { title: "TDS Compliance Support", intro: "Certain payments may be subject to Tax Deducted at Source requirements under applicable tax provisions.", what: "Support may include TDS-related documentation, deduction records, applicable return preparation, payment information organisation and compliance coordination.", who: ["Businesses making specified payments","Employers","Businesses with contractor payments"], why: ["Helps organise TDS records","Supports applicable filing requirements"], how: "We can help businesses organise TDS-related records and applicable filing requirements.", cta: "Discuss TDS Requirements", guide: "tax-consultant-tamil-nadu.html" },
      "gst-amendments": { title: "GST Registration Amendments", intro: "Changes in business information may require updates to an existing GST registration.", what: "Common changes may include business address, contact information, business details, additional place of business and other eligible registration information.", who: ["Businesses with changed address","Updated contact details","Adding new place of business"], why: ["Keeps GST records aligned","Helps avoid mismatch"], how: "We can assist with identifying the relevant amendment process and preparing the required information.", cta: "Discuss GST Amendment", guide: "gst-registration-tamil-nadu.html" },
      "compliance-support": { title: "GST Compliance Support", intro: "Ongoing GST compliance involves documentation, filing coordination and responding to applicable notices.", what: "Support may include GST documentation organisation, notice handling guidance, record organisation and periodic compliance coordination.", who: ["GST-registered businesses","Businesses seeking organised records","Businesses needing notice handling"], why: ["Maintains organised documentation","Helps track compliance"], how: "TaxWrite India can assist with organising GST-related documents and coordinating compliance information.", cta: "Discuss GST Compliance", guide: "gst-filing-tamil-nadu.html" },
      "bookkeeping": { title: "Accounting & Bookkeeping", intro: "Bookkeeping helps keep day-to-day business financial transactions organised and easier to review.", what: "Records may include sales, purchases, expenses, receipts, payments and other business transactions.", who: ["Startups","SMEs","Retailers","Service businesses","Businesses wanting organised records"], why: ["Foundation for taxation","Supports GST and reporting","Helps with business decisions"], how: "We can help businesses maintain structured transaction records based on the information provided.", cta: "Discuss Bookkeeping", guide: "accounting-services-tamil-nadu.html" },
      "monthly-accounting": { title: "Monthly Accounting Support", intro: "Updating accounts regularly helps prevent large volumes of unorganised records from accumulating at year-end.", what: "Support may include monthly transaction updates, expense classification, ledger organisation, account reviews and periodic summaries.", who: ["Startups","SMEs","Retail businesses","Service companies","Ecommerce businesses"], why: ["Regular updates improve visibility","Reduces year-end workload","Better prepared for taxation"], how: "We help keep business accounts updated regularly based on available information.", cta: "Discuss Monthly Accounting", guide: "accounting-services-tamil-nadu.html" },
      "bank-reconciliation": { title: "Bank Reconciliation", intro: "Bank reconciliation compares transactions recorded in the accounts with transactions appearing in bank statements.", what: "It can help identify missing entries, duplicate entries, recording differences, unmatched payments and unmatched receipts.", who: ["Businesses with regular bank transactions","Businesses wanting accurate records","SMEs and startups"], why: ["Improves accuracy","Helps identify discrepancies early"], how: "We can assist with organising and reconciling available transaction records.", cta: "Discuss Reconciliation", guide: "accounting-services-tamil-nadu.html" },
      "financial-statements": { title: "Financial Statement Preparation Support", intro: "Financial statements help present the financial performance and position of a business in a structured format.", what: "Reports may include Profit & Loss Statement, Balance Sheet, supporting schedules, financial summaries and cash-flow-related information where applicable.", who: ["Businesses needing structured financial information","Preparing for taxation","Seeking clarity on performance"], why: ["Helps understand performance","Supports taxation and compliance"], how: "We can help prepare structured financial information based on available records.", cta: "Discuss Financial Statements", guide: "accounting-services-tamil-nadu.html" },
      "business-reporting": { title: "Business Financial Reporting", intro: "Good accounting information should help business owners understand what is happening inside their business.", what: "Reporting may help review revenue, expenses, profitability, outstanding receivables, outstanding payables and financial trends.", who: ["Business owners wanting clearer insights","SMEs and growing businesses","Startups tracking performance"], why: ["Better understanding of performance","Supports informed decisions"], how: "We can help organise accounting information into clearer business reports based on available records.", cta: "Discuss Business Reporting", guide: "accounting-services-tamil-nadu.html" },
      "audit-support": { title: "Audit Documentation Support", intro: "Well-organised accounting records can make audit preparation and professional review easier.", what: "Support may include ledger organisation, financial schedules, supporting documents, reconciliation records and audit information coordination.", who: ["Businesses preparing for audit","Needing organised financial schedules","Coordinating with auditors"], why: ["Organised records support smoother preparation","Reduces last-minute issues"], how: "We provide audit documentation support, audit preparation support and audit coordination support. We do not claim to perform statutory audits unless that service and professional qualification are specifically confirmed.", cta: "Discuss Audit Support", guide: "accounting-services-tamil-nadu.html" },
      "msme-udyam": { title: "MSME / Udyam Registration", intro: "Udyam Registration provides eligible micro, small and medium enterprises with recognition under the MSME framework.", what: "MSME/Udyam registration recognises eligible enterprises under the MSME framework based on applicable criteria.", who: ["Small businesses","Manufacturers","Service businesses","Startups","Eligible enterprises"], why: ["Recognition under MSME framework","Applicable benefits subject to eligibility"], how: "We can assist with understanding the registration process, organising required business details and preparing the application.", cta: "Discuss Udyam Registration", guide: "msme-registration-tamil-nadu.html" },
      "fssai": { title: "FSSAI Registration & Licence Support", intro: "Eligible businesses involved in food activities may require an appropriate FSSAI registration or licence.", what: "FSSAI registration or licence may be required based on the nature and scale of food-related business activities.", who: ["Restaurants","Cafes","Bakeries","Food manufacturers","Caterers","Home food businesses","Food retailers","Food ecommerce businesses"], why: ["Helps meet applicable food business requirements","Organised documentation"], how: "We can assist with understanding the relevant category, organising documentation and preparing the registration or licence application.", cta: "Discuss FSSAI", guide: "fssai-registration-tamil-nadu.html" },
      "iec": { title: "Import Export Code (IEC)", intro: "IEC is commonly required for eligible businesses involved in import and export activities.", what: "Import Export Code is a registration that may be required for businesses engaged in import and export of goods or services.", who: ["Importers","Exporters","Manufacturers","International traders","Ecommerce exporters"], why: ["Required for eligible import/export activities","Enables international trade compliance"], how: "We can assist with application information, documentation and the relevant IEC registration process.", cta: "Discuss IEC Registration", guide: "company-registration-tamil-nadu.html" },
      "trademark": { title: "Trademark Registration Assistance", intro: "A trademark can help distinguish eligible brand names, logos or other identifiers used by a business.", what: "Trademark registration involves application and examination procedures for eligible brand identifiers under applicable trademark law.", who: ["Businesses with brand names","Businesses with logos","Startups building brand identity","Product businesses","Service businesses"], why: ["May help establish and protect brand identity","Subject to trademark law"], how: "We can assist with application-related documentation and filing coordination. We do not promise trademark approval.", cta: "Discuss Trademark Assistance", guide: "company-registration-tamil-nadu.html" },
      "pan-tan": { title: "PAN & TAN Assistance", intro: "PAN and TAN serve different tax-related identification purposes for businesses and taxpayers.", what: "Support may include application assistance, relevant documentation, corrections or updates where applicable and information preparation.", who: ["New businesses","Businesses needing corrections","Individuals and entities requiring tax identification"], why: ["Essential tax identification","Organised application process"], how: "We can help with PAN and TAN application information and documentation.", cta: "Discuss PAN / TAN", guide: "tax-consultant-tamil-nadu.html" },
      "dsc": { title: "Digital Signature Certificate (DSC)", intro: "Digital Signature Certificates are commonly used for secure electronic authentication in various corporate and regulatory filings.", what: "DSC is used for secure authentication in electronic filings and may be required for directors, partners and authorised signatories.", who: ["Directors","Partners","Authorised signatories","Business owners","Professionals"], why: ["Required for many electronic filings","Secure authentication"], how: "We can assist with DSC-related documentation, application guidance and verification requirements.", cta: "Discuss DSC", guide: "company-registration-tamil-nadu.html" },
      "professional-tax": { title: "Professional Tax Registration Support", intro: "Professional Tax requirements vary depending on applicable state rules, business structure, employment and other circumstances.", what: "Professional Tax registration may be applicable based on state, employment and business circumstances.", who: ["Employers in applicable states","Businesses with employees","Professionals where applicable"], why: ["Helps meet applicable state requirements","Organised registration support"], how: "We can assist businesses in understanding applicable registration requirements and organising relevant documentation.", cta: "Discuss Professional Tax", guide: "tax-consultant-tamil-nadu.html" },
      "accounting-software": { title: "Accounting Software Setup", intro: "Accounting software helps businesses keep transactions organised and generate useful reports.", what: "Setup may include software selection guidance, chart of accounts organisation, initial transaction setup and basic training for day-to-day use.", who: ["Startups","SMEs","Retail businesses","Service businesses"], why: ["Organised bookkeeping","Easier GST and tax preparation","Clearer financial visibility"], how: "We help with software selection, initial setup and organising opening information based on available records.", cta: "Discuss Software Setup", guide: "accounting-services-tamil-nadu.html" },
      "shops-establishments": { title: "Shops & Establishments Registration", intro: "Shops and Establishments registration may be applicable for eligible shops, offices and commercial establishments under state rules.", what: "Registration may be required based on business location, activity and applicable state Shops and Establishments Act.", who: ["Shops","Offices","Commercial establishments","Service centres"], why: ["Helps meet applicable state requirements","Organised registration"], how: "We assist with understanding applicability, organising documents and preparing the application.", cta: "Discuss Shops & Establishments", guide: "company-registration-tamil-nadu.html" },
      "trade-licence": { title: "Trade Licence Support", intro: "Trade licence requirements vary based on local municipal or panchayat norms and business activity.", what: "Trade licence may be required for eligible businesses operating within a local authority jurisdiction.", who: ["Retail shops","Food businesses","Service businesses","Traders"], why: ["Local authority compliance","Organised documentation"], how: "We help understand applicable local requirements and organise required information.", cta: "Discuss Trade Licence", guide: "company-registration-tamil-nadu.html" },
      "registration-amendments": { title: "Registration Amendments", intro: "Changes in business information may require updates to existing registrations or licences.", what: "Amendments may include address change, business activity change, addition of place, contact updates and other eligible changes.", who: ["Businesses with changed address","Changed activity","New branch or place"], why: ["Keeps records aligned","Avoids mismatch across registrations"], how: "We help identify relevant amendment processes and prepare required information.", cta: "Discuss Amendments", guide: "company-registration-tamil-nadu.html" },
      "licence-renewals": { title: "Licence Renewals", intro: "Many business licences and registrations require timely renewal to remain valid.", what: "Renewal involves verifying current details, organising supporting information and filing renewal application within applicable timelines.", who: ["Food businesses","Shops","Establishments","Other licence holders"], why: ["Maintains valid registration","Avoids late fees or issues"], how: "We help track renewal timelines and organise renewal documentation.", cta: "Discuss Renewals", guide: "company-registration-tamil-nadu.html" }
    };

    const modal = document.getElementById('serviceModal');
    if (!modal) return;
    const modalTitle = document.getElementById('modalTitle');
    const modalBody = document.getElementById('modalBody');
    const modalPrimaryCta = document.getElementById('modalPrimaryCta');
    const modalGuideLink = document.getElementById('modalGuideLink');
    const closeButtons = modal.querySelectorAll('[data-close-modal]');
    let lastFocused = null;

    function buildModalContent(data) {
      let html = `<p class="modal-intro">${data.intro}</p>`;
      if (data.what) html += `<h3>What is this service?</h3><p>${data.what}</p>`;
      if (data.who && data.who.length) { html += `<h3>Who is it suitable for?</h3><ul>`; data.who.forEach(i => html += `<li>${i}</li>`); html += `</ul>`; }
      if (data.why && data.why.length) { html += `<h3>Why can it be useful?</h3><ul>`; data.why.forEach(i => html += `<li>${i}</li>`); html += `</ul>`; }
      if (data.how) html += `<h3>How TaxWrite India can help</h3><p>${data.how}</p>`;
      return html;
    }

    function openModal(serviceId, triggerBtn) {
      const data = serviceData[serviceId];
      if (!data) return;
      lastFocused = triggerBtn || document.activeElement;
      modalTitle.textContent = data.title;
      modalBody.innerHTML = buildModalContent(data);
      if (modalPrimaryCta) {
        modalPrimaryCta.textContent = data.cta || "Speak with TaxWrite India";
        modalPrimaryCta.setAttribute('aria-label', data.cta || "Speak with TaxWrite India");
      }
      if (modalGuideLink) {
        if (data.guide) { modalGuideLink.href = data.guide; modalGuideLink.style.display = "inline-flex"; modalGuideLink.textContent = "View Complete Guide"; }
        else modalGuideLink.style.display = "none";
      }
      modal.hidden = false;
      modal.setAttribute('aria-hidden','false');
      void modal.offsetWidth;
      modal.classList.add('is-open');
      document.body.classList.add('modal-open');
      if (triggerBtn) triggerBtn.setAttribute('aria-expanded','true');
      const closeBtn = modal.querySelector('.modal-close');
      if (closeBtn) closeBtn.focus();
      modalBody.scrollTop = 0;
      // analytics ready
      window.dataLayer && window.dataLayer.push({ event: 'service_read_more', service: serviceId });
    }

    function closeModal() {
      modal.classList.remove('is-open');
      document.body.classList.remove('modal-open');
      setTimeout(() => {
        modal.hidden = true;
        modal.setAttribute('aria-hidden','true');
        if (lastFocused) { lastFocused.setAttribute('aria-expanded','false'); lastFocused.focus(); lastFocused = null; }
      }, 220);
    }

    // Handle both legacy .read-more-btn and new .svc-learn-btn / .svc-plus-btn
    const modalTriggers = document.querySelectorAll('.read-more-btn, .svc-learn-btn, .svc-plus-btn');
    modalTriggers.forEach(btn => {
      btn.addEventListener('click', e => {
        e.preventDefault(); e.stopPropagation();
        const serviceId = btn.getAttribute('data-service');
        if (!serviceId) return;
        openModal(serviceId, btn);
      });
      btn.addEventListener('mousemove', e => e.stopPropagation());
    });

    closeButtons.forEach(btn => btn.addEventListener('click', closeModal));
    modal.addEventListener('click', e => { if (e.target === modal || e.target.classList.contains('service-modal-backdrop')) closeModal(); });
    document.addEventListener('keydown', e => { if (e.key === 'Escape' && modal.classList.contains('is-open')) closeModal(); });

    // guide click tracking
    if (modalGuideLink) {
      modalGuideLink.addEventListener('click', () => {
        window.dataLayer && window.dataLayer.push({ event: 'service_guide_click', href: modalGuideLink.href });
      });
    }
  });

  // About carousel
  document.addEventListener('DOMContentLoaded', () => {
    if (!document.body.classList.contains('about-page')) return;
    const carousel = document.getElementById('connectedCarousel');
    const prevBtn = document.getElementById('connectedPrev');
    const nextBtn = document.getElementById('connectedNext');
    if (!carousel) return;
    let autoScrollInterval;
    let isHovered = false;
    const scrollAmount = 340;
    function startAutoScroll() {
      stopAutoScroll();
      autoScrollInterval = setInterval(() => {
        if (isHovered) return;
        if (carousel.scrollLeft + carousel.clientWidth >= carousel.scrollWidth - 10) {
          carousel.scrollTo({ left: 0, behavior: 'smooth' });
        } else {
          carousel.scrollBy({ left: scrollAmount, behavior: 'smooth' });
        }
      }, 3000);
    }
    function stopAutoScroll() { if (autoScrollInterval) clearInterval(autoScrollInterval); }
    if (nextBtn) nextBtn.addEventListener('click', () => { carousel.scrollBy({ left: scrollAmount, behavior: 'smooth' }); stopAutoScroll(); startAutoScroll(); });
    if (prevBtn) prevBtn.addEventListener('click', () => { carousel.scrollBy({ left: -scrollAmount, behavior: 'smooth' }); stopAutoScroll(); startAutoScroll(); });
    carousel.addEventListener('mouseenter', () => isHovered = true);
    carousel.addEventListener('mouseleave', () => isHovered = false);
    carousel.addEventListener('touchstart', () => { isHovered = true; stopAutoScroll(); }, { passive: true });
    carousel.addEventListener('touchend', () => { isHovered = false; startAutoScroll(); });
    startAutoScroll();
    document.addEventListener('visibilitychange', () => { if (document.hidden) stopAutoScroll(); else startAutoScroll(); });
  });

  // Mobile sticky bar hide when footer visible
  document.addEventListener('DOMContentLoaded', () => {
    const stickyBar = document.querySelector('.mobile-sticky-bar');
    const footer = document.querySelector('.footer');
    if (!stickyBar || !footer || prefersReduced) return;
    const io = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) stickyBar.style.transform = 'translateY(100%)';
        else stickyBar.style.transform = 'translateY(0)';
      });
    }, { threshold: 0.1 });
    io.observe(footer);
  });

  // Conversion tracking ready (no actual GA yet, just dataLayer pushes)
  document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('a[href*=\"wa.me\"]').forEach(a => {
      a.addEventListener('click', () => {
        window.dataLayer && window.dataLayer.push({ event: 'whatsapp_click', href: a.href });
      });
    });
    document.querySelectorAll('a[href^=\"tel:\"]').forEach(a => {
      a.addEventListener('click', () => {
        window.dataLayer && window.dataLayer.push({ event: 'call_click', href: a.href });
      });
    });
    document.querySelectorAll('a.btn-primary[href=\"contact.html\"], a.aws-cta').forEach(a => {
      a.addEventListener('click', () => {
        window.dataLayer && window.dataLayer.push({ event: 'consultation_click', href: a.href });
      });
    });
  });
})();
