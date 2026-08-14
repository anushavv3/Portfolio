const menuToggle=document.querySelector(".menu-toggle");
const navLinks=document.querySelector(".nav-links");

menuToggle.addEventListener('click',function(){
    navLinks.classList.toggle("open");
});

const navLinkItems = document.querySelectorAll('.nav-links a');

navLinkItems.forEach(link => {
    link.addEventListener('click', function() {
        navLinks.classList.remove('open');
    });
});


const sections = document.querySelectorAll('section[id]');
const navLinksAll = document.querySelectorAll('.nav-links a');
const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const id = entry.target.id;

            navLinksAll.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === '#' + id) {
                    link.classList.add('active');
                }
            });
        }
    });
}, { threshold: 0.4 });

sections.forEach(section => observer.observe(section));


const form = document.querySelector('form');
const nameInput = document.querySelector('#name');
const emailInput = document.querySelector('#email');
const messageInput = document.querySelector('#message');

form.addEventListener('submit', function(event) {
    event.preventDefault();

    let isValid = true;

   
    document.querySelectorAll('.error-msg').forEach(el => el.remove());

    if (nameInput.value.trim() === '') {
        showError(nameInput, 'Please enter your name');
        isValid = false;
    }

    if (emailInput.value.trim() === '' || !emailInput.value.includes('@')) {
        showError(emailInput, 'Please enter a valid email');
        isValid = false;
    }

    if (messageInput.value.trim() === '') {
        showError(messageInput, 'Please write a short message');
        isValid = false;
    }

    if (isValid) {
    fetch('https://formspree.io/f/xaewbqrw', {   
        method: 'POST',
        body: new FormData(form),
        headers: {
            'Accept': 'application/json'
        }
    })
    .then(response => {
        if (response.ok) {
            alert('Message sent! I\'ll get back to you soon.');
            form.reset();
        } else {
            alert('Something went wrong. Please try again.');
        }
    })
    .catch(error => {
        alert('Something went wrong. Please try again.');
    });
}
});

function showError(inputEl, message) {
    const error = document.createElement('p');
    error.className = 'error-msg';
    error.textContent = message;
    error.style.color = '#F5A524';
    error.style.fontSize = '12px';
    error.style.marginTop = '6px';
    inputEl.insertAdjacentElement('afterend', error);
}

document.querySelector('#year').textContent = new Date().getFullYear();