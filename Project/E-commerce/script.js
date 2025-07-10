
  const menuToggle = document.getElementById('menu-toggle');
  const navLinks = document.getElementById('nav-links');

  menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('show');
  });


  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      if(navLinks.classList.contains('show')){
        navLinks.classList.remove('show');
      }
    });
  });

  const form = document.getElementById('contact-form');
  const formMessage = document.getElementById('form-message');

  form.addEventListener('submit', function(e) {
    e.preventDefault();
    formMessage.textContent = '';

    if(!form.name.value.trim() || !form.email.value.trim() || !form.message.value.trim()){
      formMessage.textContent = 'Please fill in all fields.';
      return;
    }

  
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if(!emailPattern.test(form.email.value.trim())){
      formMessage.textContent = 'Please enter a valid email address.';
      return;
    }

    formMessage.style.color = '#059669'; // green
    formMessage.textContent = 'Thanks for reaching out! I will get back to you soon.';

    form.reset();
  });