const brand = JSON.parse(localStorage.getItem('brand')) || {};
const foods = JSON.parse(localStorage.getItem('foods')) || [];

document.getElementById('brandName').textContent = brand.name || 'رستوران شما';
document.getElementById('brandLogo').src = brand.logo || 'assets/images/logo.svg';
document.getElementById('heroImg').src = brand.hero || 'assets/images/hero.jpg';
document.getElementById('heroDesc').textContent = brand.heroDesc || 'یک انتخاب عالی برای وعده‌ی شما';
document.documentElement.style.setProperty('--primary', brand.primary || '#FF7043');
document.documentElement.style.setProperty('--btn-bg', brand.btnBg || '#FFA726');

const container = document.getElementById('menuContainer');
if (!foods.length) container.innerHTML = '<p>ه