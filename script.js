document.addEventListener('DOMContentLoaded', () => {
    const faqButtons = document.querySelectorAll('.faq-button');

    faqButtons.forEach(button => {
        const content = button.nextElementSibling;
        const icon = button.querySelector('svg');
        
        if (content && icon) {
            content.style.maxHeight = '0px';
            content.classList.add('overflow-hidden', 'transition-all', 'duration-300');
            icon.style.transition = 'transform 0.3s ease';
            icon.style.transform = 'rotate(0deg)';
        }

        button.addEventListener('click', () => {
            const isActive = !content.classList.contains('hidden');

            // Close all other open FAQs
            faqButtons.forEach(otherButton => {
                const otherContent = otherButton.nextElementSibling;
                const otherIcon = otherButton.querySelector('svg');

                if (otherContent !== content) {
                    otherContent.style.maxHeight = '0px';
                    otherContent.classList.add('hidden');
                    otherIcon.style.transform = 'rotate(0deg)';
                }
            });

            if (isActive) {
                content.style.maxHeight = '0px';
                content.classList.add('hidden');
                icon.style.transform = 'rotate(0deg)';
            } else {
                content.classList.remove('hidden');
                const scrollHeight = content.scrollHeight;
                content.style.maxHeight = scrollHeight + 'px';
                icon.style.transform = 'rotate(180deg)';
            }
        });
    });
});
document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('wa-form');
    const resultSection = document.getElementById('result');
    const waLinkInput = document.getElementById('wa-link');
    const copyButton = document.getElementById('copy-button');
    const phoneInput = document.getElementById('phone');
  
    // Phone number validation
    phoneInput.addEventListener('input', (e) => {
        let value = e.target.value.replace(/[^\d+]/g, '');
        if (!value.startsWith('+')) value = '+' + value;
        e.target.value = value;
    });
  
    form.addEventListener('submit', (e) => {
        e.preventDefault();
  
        const phone = phoneInput.value.trim().replace(/[^\d+]/g, '');
        const message = document.getElementById('message').value.trim();
        const utm = document.getElementById('utm').value.trim();
        const includePageInfo = document.getElementById('includePageInfo').checked;
  
        if (!phone || !phone.startsWith('+')) {
            Swal.fire({
                icon: 'error',
                title: 'Invalid Phone Number',
                text: 'Please enter a valid phone number with country code (e.g., +216 4567890)',
                position: 'center',
                showConfirmButton: true,
                timer: 3000
            });
            return;
        }
  
        let fullMessage = message;
  
        if (includePageInfo) {
            const pageTitle = document.title;
            const pageURL = window.location.href;
            fullMessage += `\n\nPage: ${pageTitle}\nURL: ${pageURL}`;
        }
  
        if (utm) {
            fullMessage += `\n\nCampaign: ${utm}`;
        }
  
        const encodedMessage = encodeURIComponent(fullMessage);
        const waLink = `https://wa.me/${phone.substring(1)}?text=${encodedMessage}`;
  
        waLinkInput.value = waLink;
        resultSection.classList.remove('hidden');

        // Show success message
        Swal.fire({
            icon: 'success',
            title: 'WhatsApp URL Generated!',
            text: 'Your URL is ready to be copied.',
            position: 'center',
            showConfirmButton: false,
            timer: 1500
        });
    });
  
    copyButton.addEventListener('click', () => {
        waLinkInput.select();
        navigator.clipboard.writeText(waLinkInput.value)
            .then(() => {
                Swal.fire({
                    icon: 'success',
                    title: 'Copied!',
                    text: 'URL copied to clipboard',
                    position: 'center',
                    showConfirmButton: false,
                    timer: 1500,
                    toast: true
                });
            })
            .catch(err => {
                Swal.fire({
                    icon: 'error',
                    title: 'Copy Failed',
                    text: 'Failed to copy URL to clipboard',
                    position: 'center',
                    showConfirmButton: true
                });
                console.error('Failed to copy:', err);
            });
    });
});