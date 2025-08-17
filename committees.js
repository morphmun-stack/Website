// Committee Tab Functionality
document.addEventListener('DOMContentLoaded', function() {
    const tabButtons = document.querySelectorAll('.tab-btn');
    const committeeSections = document.querySelectorAll('.committee-section');

    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            const targetCategory = button.getAttribute('data-category');
            
            // Remove active class from all buttons and sections
            tabButtons.forEach(btn => btn.classList.remove('active'));
            committeeSections.forEach(section => section.classList.remove('active'));
            
            // Add active class to clicked button and target section
            button.classList.add('active');
            document.getElementById(targetCategory).classList.add('active');
        });
    });
});

// Country Matrix Filtering
document.addEventListener('DOMContentLoaded', function() {
    const committeeFilter = document.getElementById('committeeFilter');
    const matrixRows = document.querySelectorAll('.matrix-table tbody tr');

    committeeFilter.addEventListener('change', function() {
        const selectedCommittee = this.value;
        
        matrixRows.forEach(row => {
            const committeeCell = row.querySelector('td:nth-child(2)');
            if (committeeCell) {
                const committee = committeeCell.textContent.trim();
                
                if (selectedCommittee === '' || committee === selectedCommittee) {
                    row.style.display = '';
                } else {
                    row.style.display = 'none';
                }
            }
        });
    });
});

// Download Matrix Function
function downloadMatrix() {
    // Create CSV content
    let csvContent = "Country/Entity,Committee,Difficulty,Status\n";
    
    const matrixRows = document.querySelectorAll('.matrix-table tbody tr');
    matrixRows.forEach(row => {
        const cells = row.querySelectorAll('td');
        const rowData = [];
        
        cells.forEach((cell, index) => {
            if (index === 2 || index === 3) {
                // Get text content from span elements
                const span = cell.querySelector('span');
                rowData.push(span ? span.textContent : cell.textContent);
            } else {
                rowData.push(cell.textContent);
            }
        });
        
        csvContent += rowData.join(',') + '\n';
    });
    
    // Create and download file
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'morph-mun-2025-country-matrix.csv';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
}

// Animate committee cards on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

document.addEventListener('DOMContentLoaded', () => {
    const committeeCards = document.querySelectorAll('.committee-card');
    committeeCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });
});

// Search functionality for country matrix
function addSearchFunctionality() {
    const searchInput = document.createElement('input');
    searchInput.type = 'text';
    searchInput.placeholder = 'Search countries...';
    searchInput.className = 'matrix-filter';
    searchInput.style.marginRight = '1rem';
    
    const matrixControls = document.querySelector('.matrix-controls');
    matrixControls.insertBefore(searchInput, matrixControls.firstChild);
    
    searchInput.addEventListener('input', function() {
        const searchTerm = this.value.toLowerCase();
        const matrixRows = document.querySelectorAll('.matrix-table tbody tr');
        
        matrixRows.forEach(row => {
            const countryCell = row.querySelector('td:first-child');
            if (countryCell) {
                const country = countryCell.textContent.toLowerCase();
                if (country.includes(searchTerm)) {
                    row.style.display = '';
                } else {
                    row.style.display = 'none';
                }
            }
        });
    });
}

// Initialize search functionality
document.addEventListener('DOMContentLoaded', addSearchFunctionality);

// Committee card hover effects
document.addEventListener('DOMContentLoaded', function() {
    const committeeCards = document.querySelectorAll('.committee-card');
    
    committeeCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
});

// Smooth scrolling for anchor links
document.addEventListener('DOMContentLoaded', function() {
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    
    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
});

// Export matrix as PDF (placeholder function)
function exportMatrixPDF() {
    alert('PDF export functionality will be implemented soon!');
}

// Add loading animation for committee sections
function showLoadingAnimation() {
    const sections = document.querySelectorAll('.committee-section');
    sections.forEach(section => {
        if (!section.classList.contains('active')) {
            section.style.opacity = '0.5';
        }
    });
}

function hideLoadingAnimation() {
    const sections = document.querySelectorAll('.committee-section');
    sections.forEach(section => {
        section.style.opacity = '1';
    });
}

// Enhanced tab switching with loading animation
document.addEventListener('DOMContentLoaded', function() {
    const tabButtons = document.querySelectorAll('.tab-btn');
    const committeeSections = document.querySelectorAll('.committee-section');

    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            showLoadingAnimation();
            
            setTimeout(() => {
                const targetCategory = button.getAttribute('data-category');
                
                tabButtons.forEach(btn => btn.classList.remove('active'));
                committeeSections.forEach(section => section.classList.remove('active'));
                
                button.classList.add('active');
                document.getElementById(targetCategory).classList.add('active');
                
                hideLoadingAnimation();
            }, 300);
        });
    });
});
