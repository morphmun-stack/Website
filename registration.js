// Registration Tab Functionality
document.addEventListener('DOMContentLoaded', function() {
    const typeButtons = document.querySelectorAll('.type-btn');
    const registrationSections = document.querySelectorAll('.registration-section');

    typeButtons.forEach(button => {
        button.addEventListener('click', () => {
            const targetType = button.getAttribute('data-type');
            
            // Remove active class from all buttons and sections
            typeButtons.forEach(btn => btn.classList.remove('active'));
            registrationSections.forEach(section => section.classList.remove('active'));
            
            // Add active class to clicked button and target section
            button.classList.add('active');
            document.getElementById(targetType).classList.add('active');
        });
    });
});

// Form Validation Functions
function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function validatePhone(phone) {
    const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
    return phoneRegex.test(phone.replace(/\s/g, ''));
}

function validateRequired(value) {
    return value.trim().length > 0;
}

function showError(input, message) {
    const formGroup = input.closest('.form-group');
    formGroup.classList.add('error');
    
    // Remove existing error message
    const existingError = formGroup.querySelector('.error-message');
    if (existingError) {
        existingError.remove();
    }
    
    // Add new error message
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.textContent = message;
    formGroup.appendChild(errorDiv);
}

function removeError(input) {
    const formGroup = input.closest('.form-group');
    formGroup.classList.remove('error');
    
    const errorMessage = formGroup.querySelector('.error-message');
    if (errorMessage) {
        errorMessage.remove();
    }
}

function showSuccess(input) {
    const formGroup = input.closest('.form-group');
    formGroup.classList.add('success');
    formGroup.classList.remove('error');
    
    const errorMessage = formGroup.querySelector('.error-message');
    if (errorMessage) {
        errorMessage.remove();
    }
}

// Real-time validation for delegate form
document.addEventListener('DOMContentLoaded', function() {
    const delegateForm = document.getElementById('delegateForm');
    if (delegateForm) {
        const inputs = delegateForm.querySelectorAll('input, select, textarea');
        
        inputs.forEach(input => {
            input.addEventListener('blur', function() {
                validateField(this);
            });
            
            input.addEventListener('input', function() {
                if (this.classList.contains('error')) {
                    validateField(this);
                }
            });
        });
        
        delegateForm.addEventListener('submit', function(e) {
            e.preventDefault();
            if (validateForm(this)) {
                submitForm(this, 'delegate');
            }
        });
    }
});

// Real-time validation for delegation form
document.addEventListener('DOMContentLoaded', function() {
    const delegationForm = document.getElementById('delegationForm');
    if (delegationForm) {
        const inputs = delegationForm.querySelectorAll('input, select, textarea');
        
        inputs.forEach(input => {
            input.addEventListener('blur', function() {
                validateField(this);
            });
            
            input.addEventListener('input', function() {
                if (this.classList.contains('error')) {
                    validateField(this);
                }
            });
        });
        
        delegationForm.addEventListener('submit', function(e) {
            e.preventDefault();
            if (validateForm(this)) {
                submitForm(this, 'delegation');
            }
        });
    }
});

// Real-time validation for EB form
document.addEventListener('DOMContentLoaded', function() {
    const ebForm = document.getElementById('ebForm');
    if (ebForm) {
        const inputs = ebForm.querySelectorAll('input, select, textarea');
        
        inputs.forEach(input => {
            input.addEventListener('blur', function() {
                validateField(this);
            });
            
            input.addEventListener('input', function() {
                if (this.classList.contains('error')) {
                    validateField(this);
                }
            });
        });
        
        ebForm.addEventListener('submit', function(e) {
            e.preventDefault();
            if (validateForm(this)) {
                submitForm(this, 'eb');
            }
        });
    }
});

// Real-time validation for press form
document.addEventListener('DOMContentLoaded', function() {
    const pressForm = document.getElementById('pressForm');
    if (pressForm) {
        const inputs = pressForm.querySelectorAll('input, select, textarea');
        
        inputs.forEach(input => {
            input.addEventListener('blur', function() {
                validateField(this);
            });
            
            input.addEventListener('input', function() {
                if (this.classList.contains('error')) {
                    validateField(this);
                }
            });
        });
        
        pressForm.addEventListener('submit', function(e) {
            e.preventDefault();
            if (validateForm(this)) {
                submitForm(this, 'press');
            }
        });
    }
});

// Field validation function
function validateField(field) {
    const value = field.value.trim();
    const type = field.type;
    const name = field.name;
    
    // Remove existing error/success states
    removeError(field);
    field.classList.remove('success');
    
    // Required field validation
    if (field.hasAttribute('required') && !validateRequired(value)) {
        showError(field, 'This field is required');
        return false;
    }
    
    // Email validation
    if (type === 'email' && value && !validateEmail(value)) {
        showError(field, 'Please enter a valid email address');
        return false;
    }
    
    // Phone validation
    if (type === 'tel' && value && !validatePhone(value)) {
        showError(field, 'Please enter a valid phone number');
        return false;
    }
    
    // Select validation
    if (field.tagName === 'SELECT' && field.hasAttribute('required') && value === '') {
        showError(field, 'Please select an option');
        return false;
    }
    
    // File validation
    if (type === 'file' && field.hasAttribute('required')) {
        if (!field.files || field.files.length === 0) {
            showError(field, 'Please select a file');
            return false;
        }
        
        const file = field.files[0];
        const maxSize = 5 * 1024 * 1024; // 5MB
        
        if (file.size > maxSize) {
            showError(field, 'File size must be less than 5MB');
            return false;
        }
    }
    
    // If all validations pass
    if (value) {
        showSuccess(field);
    }
    
    return true;
}

// Form validation function
function validateForm(form) {
    const inputs = form.querySelectorAll('input, select, textarea');
    let isValid = true;
    
    inputs.forEach(input => {
        if (!validateField(input)) {
            isValid = false;
        }
    });
    
    return isValid;
}

// Form submission function
function submitForm(form, type) {
    const submitButton = form.querySelector('button[type="submit"]');
    const originalText = submitButton.textContent;
    
    // Show loading state
    submitButton.textContent = 'Submitting...';
    submitButton.disabled = true;
    
    // Simulate form submission (replace with actual submission logic)
    setTimeout(() => {
        // Show success message
        showSuccessMessage(type);
        
        // Reset form
        form.reset();
        
        // Reset button
        submitButton.textContent = originalText;
        submitButton.disabled = false;
        
        // Remove success states
        const inputs = form.querySelectorAll('input, select, textarea');
        inputs.forEach(input => {
            input.classList.remove('success');
        });
    }, 2000);
}

// Success message function
function showSuccessMessage(type) {
    const messages = {
        delegate: 'Thank you for registering! You will receive a confirmation email shortly.',
        delegation: 'Thank you for your delegation registration! We will contact you soon.',
        eb: 'Thank you for your Executive Board application! We will review and get back to you.',
        press: 'Thank you for your press application! We will contact you soon.'
    };
    
    // Create success notification
    const notification = document.createElement('div');
    notification.className = 'success-notification';
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas fa-check-circle"></i>
            <p>${messages[type]}</p>
            <button class="notification-close">&times;</button>
        </div>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: #38a169;
        color: white;
        padding: 1rem;
        border-radius: 10px;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
        z-index: 10000;
        animation: slideIn 0.3s ease;
    `;
    
    // Add animation styles
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideIn {
            from { transform: translateX(100%); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
        }
        .notification-content {
            display: flex;
            align-items: center;
            gap: 0.5rem;
        }
        .notification-close {
            background: none;
            border: none;
            color: white;
            font-size: 1.5rem;
            cursor: pointer;
            margin-left: 1rem;
        }
    `;
    document.head.appendChild(style);
    
    // Add to page
    document.body.appendChild(notification);
    
    // Close button functionality
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', () => {
        notification.remove();
    });
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.remove();
        }
    }, 5000);
}

// File upload preview
document.addEventListener('DOMContentLoaded', function() {
    const fileInputs = document.querySelectorAll('input[type="file"]');
    
    fileInputs.forEach(input => {
        input.addEventListener('change', function() {
            const file = this.files[0];
            if (file) {
                const formGroup = this.closest('.form-group');
                const existingPreview = formGroup.querySelector('.file-preview');
                
                if (existingPreview) {
                    existingPreview.remove();
                }
                
                const preview = document.createElement('div');
                preview.className = 'file-preview';
                preview.innerHTML = `
                    <i class="fas fa-file"></i>
                    <span>${file.name}</span>
                    <small>(${(file.size / 1024 / 1024).toFixed(2)} MB)</small>
                `;
                
                preview.style.cssText = `
                    display: flex;
                    align-items: center;
                    gap: 0.5rem;
                    margin-top: 0.5rem;
                    padding: 0.5rem;
                    background: #f7fafc;
                    border-radius: 5px;
                    font-size: 0.9rem;
                    color: #4a5568;
                `;
                
                formGroup.appendChild(preview);
            }
        });
    });
});

// Auto-save form data
document.addEventListener('DOMContentLoaded', function() {
    const forms = document.querySelectorAll('.registration-form');
    
    forms.forEach(form => {
        const formId = form.id;
        
        // Load saved data
        const savedData = localStorage.getItem(`form_${formId}`);
        if (savedData) {
            const data = JSON.parse(savedData);
            Object.keys(data).forEach(key => {
                const field = form.querySelector(`[name="${key}"]`);
                if (field) {
                    field.value = data[key];
                }
            });
        }
        
        // Save data on input
        const inputs = form.querySelectorAll('input, select, textarea');
        inputs.forEach(input => {
            input.addEventListener('input', function() {
                const formData = {};
                inputs.forEach(field => {
                    if (field.type === 'file') {
                        formData[field.name] = field.files.length > 0 ? field.files[0].name : '';
                    } else {
                        formData[field.name] = field.value;
                    }
                });
                localStorage.setItem(`form_${formId}`, JSON.stringify(formData));
            });
        });
    });
});

// Clear saved data on successful submission
function clearSavedData(formId) {
    localStorage.removeItem(`form_${formId}`);
}
