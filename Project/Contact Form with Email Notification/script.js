
document.getElementById('contact-form')
.addEventListener('submit', function(event) {
    event.preventDefault();
    emailjs.sendForm('YOUR_SERVICE_ID',
        'YOUR_TEMPLATE_ID',this)
        .then(function() {
            document.getElementById('status').innerText
            = 'Message sent successfully!';
            }, function(error) {
                document.getElementById('status').innerText
                = 'Failed to send message. Please try again.';
                });
                this.reset()
                });
