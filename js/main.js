/* ============================================
   VANILLA INN - COMPLETE JAVASCRIPT
   Cafe & Bakery | Freshly Baked, Made with Love
   ============================================ */

document.addEventListener('DOMContentLoaded', function() {
    
    // ========== 1. MOBILE SIDEBAR TOGGLE ==========
    const mobileSidebar = document.getElementById('mobileSidebar');
    const sidebarOverlay = document.getElementById('sidebarOverlay');
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const closeSidebarBtn = document.getElementById('closeSidebarBtn');
    
    function openSidebar() {
        if (mobileSidebar) mobileSidebar.classList.add('open');
        if (sidebarOverlay) sidebarOverlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
    
    function closeSidebar() {
        if (mobileSidebar) mobileSidebar.classList.remove('open');
        if (sidebarOverlay) sidebarOverlay.classList.remove('active');
        document.body.style.overflow = '';
    }
    
    if (mobileMenuBtn) mobileMenuBtn.addEventListener('click', openSidebar);
    if (closeSidebarBtn) closeSidebarBtn.addEventListener('click', closeSidebar);
    if (sidebarOverlay) sidebarOverlay.addEventListener('click', closeSidebar);
    
    // Close sidebar when clicking any navigation link
    document.querySelectorAll('.sidebar-nav a, .sidebar-order-btn').forEach(link => {
        link.addEventListener('click', closeSidebar);
    });
    
    // ========== 2. TOAST NOTIFICATION SYSTEM ==========
    window.showToast = function(message, duration = 2500) {
        let toast = document.getElementById('toastMsg');
        if (!toast) {
            toast = document.createElement('div');
            toast.id = 'toastMsg';
            toast.className = 'toast-msg';
            document.body.appendChild(toast);
        }
        toast.textContent = message;
        toast.classList.add('show');
        setTimeout(function() {
            toast.classList.remove('show');
        }, duration);
    };
    
    // ========== 3. ACTIVE NAVIGATION LINK ==========
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.desktop-nav a, .sidebar-nav a').forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentPage) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
    
    // ========== 4. ADD TO CART BUTTONS (All Pages) ==========
    document.querySelectorAll('.add-to-cart').forEach(btn => {
        btn.addEventListener('click', function(e) {
            const itemName = this.getAttribute('data-item') || 'Item';
            showToast(`✓ ${itemName} added to cart!`);
        });
    });
    
    // ========== 5. CONTACT FORM SUBMIT ==========
    const sendContactBtn = document.getElementById('sendContactBtn');
    if (sendContactBtn) {
        sendContactBtn.addEventListener('click', function() {
            const name = document.getElementById('contactName')?.value.trim();
            const email = document.getElementById('contactEmail')?.value.trim();
            const message = document.getElementById('contactMsg')?.value.trim();
            
            if (!name || !email || !message) {
                showToast('⚠️ Please fill all fields (Name, Email, Message)');
                return;
            }
            
            if (!email.includes('@')) {
                showToast('⚠️ Please enter a valid email address');
                return;
            }
            
            showToast('📨 Message sent! We\'ll reply within 24 hours.');
            
            // Clear form
            if (document.getElementById('contactName')) document.getElementById('contactName').value = '';
            if (document.getElementById('contactEmail')) document.getElementById('contactEmail').value = '';
            if (document.getElementById('contactMsg')) document.getElementById('contactMsg').value = '';
        });
    }
    
    // ========== 6. REGULAR ORDER FORM SUBMIT ==========
    const submitOrderBtn = document.getElementById('submitOrderBtn');
    if (submitOrderBtn) {
        submitOrderBtn.addEventListener('click', function() {
            const name = document.getElementById('orderName')?.value.trim();
            const phone = document.getElementById('orderPhone')?.value.trim();
            const address = document.getElementById('orderAddress')?.value.trim();
            
            if (!name || !phone || !address) {
                showToast('⚠️ Please fill Name, Phone, and Address');
                return;
            }
            
            showToast(`✨ Thanks ${name}! Your order has been placed. We'll call you to confirm.`);
            
            // Clear form
            if (document.getElementById('orderName')) document.getElementById('orderName').value = '';
            if (document.getElementById('orderPhone')) document.getElementById('orderPhone').value = '';
            if (document.getElementById('orderEmail')) document.getElementById('orderEmail').value = '';
            if (document.getElementById('orderAddress')) document.getElementById('orderAddress').value = '';
            if (document.getElementById('specialInstructions')) document.getElementById('specialInstructions').value = '';
        });
    }
    
    // ========== 7. CATERING/BULK INQUIRY BUTTONS (Scroll to form) ==========
    document.querySelectorAll('.catering-inquiry, .bulk-inquiry').forEach(btn => {
        btn.addEventListener('click', function() {
            const formSection = document.getElementById('cateringForm') || document.getElementById('bulkForm');
            if (formSection) {
                formSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
                showToast('📋 Please fill out the form below');
            } else {
                showToast('📋 Please contact us for more information');
            }
        });
    });
    
    // ========== 8. CARD ANIMATION ON SCROLL ==========
    const animateCards = document.querySelectorAll('.product-card');
    if (animateCards.length > 0) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });
        
        animateCards.forEach(card => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px)';
            card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
            observer.observe(card);
        });
    }
    
    console.log('VANILLA INN - Website loaded successfully!');
});
