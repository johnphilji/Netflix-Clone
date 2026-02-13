/**
 * NETFLIX CLONE - JavaScript Features
 * Features Implemented (per requirements):
 * 3. Dynamic Content Change - Theme toggle (light/dark) and Read more/Read less
 * 4. Show / Hide Sections - Mobile menu, FAQ answers, Section toggles
 * 6. Image Gallery/Slider - Enhanced image slider with button interactions
 * 7. Local Storage - Theme preference, username, visit count
 */

// ============================================
// FEATURE 3: DYNAMIC CONTENT CHANGE
// ============================================

/**
 * Theme Toggle - Light/Dark Mode
 */
const initThemeToggle = () => {
    const themeToggle = document.getElementById('themeToggle');
    if (!themeToggle) return;

    // Load saved theme from localStorage
    const savedTheme = localStorage.getItem('theme') || 'dark';
    applyTheme(savedTheme);

    themeToggle.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme') || 'dark';
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        applyTheme(newTheme);
        localStorage.setItem('theme', newTheme);
    });
};

const applyTheme = (theme) => {
    document.documentElement.setAttribute('data-theme', theme);
    const themeToggle = document.getElementById('themeToggle');
    
    if (theme === 'light') {
        // Light theme colors
        document.documentElement.style.setProperty('--netflix-red', '#e50914');
        document.documentElement.style.setProperty('--bg-black', '#f5f5f5');
        document.documentElement.style.setProperty('--text-white', '#1a1a1a');
        document.documentElement.style.setProperty('--gray-text', '#555555');
        if (themeToggle) themeToggle.textContent = '🌙'; // Moon icon for dark mode
    } else {
        // Dark theme colors
        document.documentElement.style.setProperty('--netflix-red', '#e50914');
        document.documentElement.style.setProperty('--bg-black', '#000000');
        document.documentElement.style.setProperty('--text-white', '#ffffff');
        document.documentElement.style.setProperty('--gray-text', '#b3b3b3');
        if (themeToggle) themeToggle.textContent = '☀️'; // Sun icon for light mode
    }
};

/**
 * Read More / Read Less Toggle
 */
const initReadMoreToggle = () => {
    const readMoreBtns = document.querySelectorAll('.read-more-btn');
    
    readMoreBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            const reasonCard = e.target.closest('.reason-card');
            const extraText = reasonCard.querySelector('.reason-extra');
            const isHidden = extraText.style.display === 'none';

            if (isHidden) {
                // Show the extra text
                extraText.style.display = 'block';
                extraText.style.animation = 'slideDown 0.3s ease';
                btn.textContent = 'Read Less';
            } else {
                // Hide the extra text
                extraText.style.display = 'none';
                btn.textContent = 'Read More';
            }
        });
    });
};

// ============================================
// FEATURE 4: SHOW / HIDE SECTIONS
// ============================================

/**
 * Mobile Navigation Menu Toggle
 */
const initMobileMenu = () => {
    // Create mobile menu HTML if it doesn't exist
    const mobileMenuHTML = `
        <button class="mobile-menu-toggle" id="mobileMenuToggle">
            <span></span>
            <span></span>
            <span></span>
        </button>
        <nav class="mobile-menu" id="mobileMenu">
            <button class="mobile-menu-close" id="mobileMenuClose">&times;</button>
            <ul>
                <li><a href="#trending">Trending</a></li>
                <li><a href="#reasons">Why Netflix</a></li>
                <li><a href="#faq">FAQ</a></li>
                <li><button class="change-theme-btn">Change Theme</button></li>
            </ul>
        </nav>
    `;

    // Insert mobile menu into header
    const navbar = document.querySelector('.navbar');
    if (navbar && !document.getElementById('mobileMenuToggle')) {
        navbar.insertAdjacentHTML('afterend', mobileMenuHTML);
    }

    // Mobile menu toggle
    const menuToggle = document.getElementById('mobileMenuToggle');
    const mobileMenu = document.getElementById('mobileMenu');
    const menuClose = document.getElementById('mobileMenuClose');

    if (menuToggle && mobileMenu) {
        menuToggle.addEventListener('click', () => {
            mobileMenu.classList.toggle('active');
            document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : 'auto';
        });

        menuClose.addEventListener('click', () => {
            mobileMenu.classList.remove('active');
            document.body.style.overflow = 'auto';
        });

        // Close menu when clicking a link
        mobileMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.remove('active');
                document.body.style.overflow = 'auto';
            });
        });

        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!mobileMenu.contains(e.target) && !menuToggle.contains(e.target)) {
                mobileMenu.classList.remove('active');
                document.body.style.overflow = 'auto';
            }
        });

        // Theme change button in mobile menu
        const changeThemeBtn = document.querySelector('.change-theme-btn');
        if (changeThemeBtn) {
            changeThemeBtn.addEventListener('click', () => {
                const themeToggle = document.getElementById('themeToggle');
                if (themeToggle) themeToggle.click();
            });
        }
    }
};

/**
 * Section Show/Hide by ID
 */
const initSectionToggle = () => {
    // Add IDs to sections for targeting
    const trendingSection = document.querySelector('.trending-section');
    if (trendingSection && !trendingSection.id) {
        trendingSection.id = 'trending';
    }

    const reasonsSection = document.querySelector('.reasons-section');
    if (reasonsSection && !reasonsSection.id) {
        reasonsSection.id = 'reasons';
    }

    const faqSection = document.querySelector('.faq-section');
    if (faqSection && !faqSection.id) {
        faqSection.id = 'faq';
    }
};

// ============================================
// FEATURE 6: IMAGE GALLERY / SLIDER
// ============================================

/**
 * Enhanced Slider with Hover Effects and Image Gallery
 */
const initEnhancedSlider = () => {
    const trendingCards = document.querySelectorAll('.trending-card');

    trendingCards.forEach(card => {
        // Hover effect
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'scale(1.08)';
            card.style.zIndex = '20';
            card.style.transition = 'all 0.3s ease';
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'scale(1)';
            card.style.zIndex = '5';
        });

        // Click to change/expand image
        card.addEventListener('click', () => {
            const img = card.querySelector('img');
            if (img) {
                // Create modal to show larger image
                showImageModal(img.src, img.alt);
            }
        });
    });

    // Add keyboard navigation for slider
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') {
            scrollSlider(-1);
        } else if (e.key === 'ArrowRight') {
            scrollSlider(1);
        }
    });
};

/**
 * Show image in modal/lightbox
 */
const showImageModal = (imageSrc, altText) => {
    // Remove existing modal if present
    const existingModal = document.getElementById('imageModal');
    if (existingModal) existingModal.remove();

    const modal = document.createElement('div');
    modal.id = 'imageModal';
    modal.className = 'image-modal';
    modal.innerHTML = `
        <div class="image-modal-content">
            <button class="image-modal-close">&times;</button>
            <img src="${imageSrc}" alt="${altText}" />
        </div>
    `;

    document.body.appendChild(modal);

    // Close on X click
    modal.querySelector('.image-modal-close').addEventListener('click', () => {
        modal.remove();
    });

    // Close on outside click
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.remove();
        }
    });

    // Close on ESC key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && document.getElementById('imageModal')) {
            modal.remove();
        }
    });
};

// ============================================
// FEATURE 7: LOCAL STORAGE
// ============================================

/**
 * Initialize Local Storage for preferences
 */
const initLocalStorage = () => {
    // Load and apply saved theme
    const savedTheme = localStorage.getItem('theme') || 'dark';
    applyTheme(savedTheme);

    // Save username if provided
    const saveUsername = () => {
        const username = prompt('Enter your username:');
        if (username && username.trim()) {
            localStorage.setItem('username', username);
            console.log(`Welcome, ${username}!`);
        }
    };

    // Track visit count
    const visitCount = parseInt(localStorage.getItem('visitCount') || '0') + 1;
    localStorage.setItem('visitCount', visitCount);
    
    // Log visit information
    if (visitCount === 1) {
        console.log('Welcome to Netflix Clone! This is your first visit.');
    } else {
        console.log(`Welcome back! This is your visit #${visitCount}`);
        const savedUsername = localStorage.getItem('username');
        if (savedUsername) {
            console.log(`User: ${savedUsername}`);
        }
    }

    // Display saved preferences in console
    console.log('=== Local Storage Data ===');
    console.log('Theme:', localStorage.getItem('theme'));
    console.log('Username:', localStorage.getItem('username') || 'Not set');
    console.log('Visit Count:', visitCount);
    console.log('========================');

    // Optional: Add button to set username
    const signInBtn = document.querySelector('.btn-signin');
    if (signInBtn) {
        const originalText = signInBtn.textContent;
        const savedUsername = localStorage.getItem('username');
        if (savedUsername) {
            signInBtn.textContent = `👤 ${savedUsername}`;
        }

        signInBtn.addEventListener('click', () => {
            saveUsername();
            // Update button with new username
            const newUsername = localStorage.getItem('username');
            if (newUsername) {
                signInBtn.textContent = `👤 ${newUsername}`;
            }
        });
    }
};

/**
 * Clear Local Storage (for testing)
 */
const clearAllPreferences = () => {
    if (confirm('Clear all saved preferences?')) {
        localStorage.clear();
        console.log('All preferences cleared!');
        window.location.reload();
    }
};

// ============================================
// INITIALIZATION
// ============================================

/**
 * Initialize all features when DOM is ready
 */
const initializeApp = () => {
    console.log('🎬 Netflix Clone - Initializing JavaScript Features...');
    
    // Feature 3: Dynamic Content Change
    initThemeToggle();
    initReadMoreToggle();
    
    // Feature 4: Show/Hide Sections
    initSectionToggle();
    initMobileMenu();
    
    // Feature 6: Image Gallery/Slider
    initEnhancedSlider();
    
    // Feature 7: Local Storage
    initLocalStorage();

    console.log('✅ All Features Loaded Successfully!');
    console.log('Features: Theme Toggle | Read More | Mobile Menu | Image Gallery | Local Storage');
};

// Run when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeApp);
} else {
    initializeApp();
}
