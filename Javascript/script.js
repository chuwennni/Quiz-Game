const loader = document.querySelector('.loader')
const darkmodeIcon = document.getElementById('dark-mode-icon')

window.onload = () => {
  loader.classList.add('loader-hidden')

  loader.addEventListener('transtionend', () => {
    loader.style.display = 'none'
  })
}

let darkmode = localStorage.getItem('darkmode')

const DarkmodeToggle = () => {
  document.documentElement.setAttribute("data-theme", "dark")
  localStorage.setItem('darkmode', "active")
  darkmodeIcon.classList.replace('fa-moon', 'fa-sun')
}

const DarkmodeUnToggle = () => {
  document.documentElement.setAttribute("data-theme", "light");
  localStorage.setItem('darkmode', null)
  darkmodeIcon.classList.replace('fa-sun', 'fa-moon')
}

function toggleTheme() {
  const currentTheme = document.documentElement.getAttribute("data-theme");
  if (currentTheme === "dark") {
    DarkmodeUnToggle()
  } else {
    DarkmodeToggle()
  }
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

  
if(darkmode === "active") DarkmodeToggle();