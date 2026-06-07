/* ============================================
   VANILLA INN - COMPLETE JAVASCRIPT
   Cafe & Bakery | Freshly Baked, Made with Love
   ============================================ */

document.addEventListener('DOMContentLoaded', function() {
    
    // ========== MOBILE SIDEBAR TOGGLE ==========
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
    
    // ========== TOAST NOTIFICATION SYSTEM ==========
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
    
    // ========== ACTIVE NAVIGATION LINK ==========
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.desktop-nav a, .sidebar-nav a').forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentPage) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
    
    // ========== ADD TO CART BUTTONS (All Pages) ==========
    document.querySelectorAll('.add-to-cart').forEach(btn => {
        btn.addEventListener('click', function(e) {
            const itemName = this.getAttribute('data-item') || 'Item';
            showToast(`✓ ${itemName} added to cart!`);
        });
    });
    
    // ========== CONTACT FORM SUBMIT ==========
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
            
            if (document.getElementById('contactName')) document.getElementById('contactName').value = '';
            if (document.getElementById('contactEmail')) document.getElementById('contactEmail').value = '';
            if (document.getElementById('contactMsg')) document.getElementById('contactMsg').value = '';
        });
    }
    
    console.log('VANILLA INN - Website loaded successfully!');
});
