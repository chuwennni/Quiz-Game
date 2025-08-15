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

if(darkmode === "active") DarkmodeToggle()