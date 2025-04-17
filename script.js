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