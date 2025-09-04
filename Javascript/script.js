const loader = document.querySelector('.loader')
const darkmodeIcon = document.getElementById('dark-mode-icon')
const registerContainer = document.querySelector('.register');
const loginContainer = document.querySelector('.Login');
const switchBtn = document.getElementById('switch');
const switchBackBtn = document.getElementById('switch-back');

window.onload = () => {
  loader.classList.add('loader-hidden')

  loader.addEventListener('transtionend', () => {
    loader.style.display = 'none'
  })
}



const dropDownBtn = document.querySelectorAll('.dropdown-btn');
const DropDownInput = document.querySelectorAll('.dropdown input[type="radio"]');

dropDownBtn.forEach(btn => {
      btn.addEventListener('click', () => {
        const parent = btn.parentElement;
        parent.classList.toggle('open');
      });
    });

DropDownInput.forEach(radio => {
  radio.addEventListener('change', function () {
    const dropdown = this.closest('.dropdown');
    const button = dropdown.querySelector('.dropdown-btn');
    button.textContent = this.value; 
    dropdown.classList.remove('open');
  });
});

window.addEventListener('click', (e) => {
  document.querySelectorAll('.dropdown').forEach(drop => {
    if (!drop.contains(e.target)) {
      drop.classList.remove('open');
    }
  });
})

let darkmode = localStorage.getItem('darkmode')

const DarkmodeToggle = () => {
  document.documentElement.setAttribute("data-theme", "dark")
  localStorage.setItem('darkmode', "active")
  darkmodeIcon.classList.replace('fa-moon', 'fa-sun')
}

const DarkmodeUnToggle = () => {
  document.documentElement.setAttribute("data-theme", "light");
  localStorage.setItem('darkmode', "inactive") // instead of null
  darkmodeIcon.classList.replace('fa-sun', 'fa-moon')
}

// Load saved theme on page refresh
if (darkmode === "active") {
  DarkmodeToggle();
} else {
  DarkmodeUnToggle(); // keep consistent
}


function toggleTheme() {
  const currentTheme = document.documentElement.getAttribute("data-theme");
  if (currentTheme === "dark") {
    DarkmodeUnToggle()
  } else {
    DarkmodeToggle()
  }
}