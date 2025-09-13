const brand = JSON.parse(localStorage.getItem('brand')) || {};
const foods = JSON.parse(localStorage.getItem('foods')) || [];

document.getElementById('brandNameInput').value = brand.name || '';
document.getElementById('primaryColorInput').value = brand.primary || '#FF7043';
document.getElementById('btnColorInput').value = brand.btnBg || '#FFA726';
document.getElementById('whatsappInput').value = brand.whatsapp || '';
document.getElementById('callInput').value = brand.call || '';
document.getElementById('instagramInput').value = brand.instagram || '';
if (brand.logo) document.getElementById('logoPreview').src = brand.logo;

['brandNameInput','primaryColorInput','btnColorInput','whatsappInput','callInput','instagramInput'].forEach(id => {
  document.getElementById(id).addEventListener('input', () => {
    brand.name = document.getElementById('brandNameInput').value;
    brand.primary = document.getElementById('primaryColorInput').value;
    brand.btnBg = document.getElementById('btnColorInput').value;
    brand.whatsapp = document.getElementById('whatsappInput').value;
    brand.call = document.getElementById('callInput').value;
    brand.instagram = document.getElementById('instagramInput').value;
    localStorage.setItem('brand', JSON.stringify(brand));
  });
});

document.getElementById('logoInput').addEventListener('change', e => {
  const file = e.target.files[0];
  const reader = new FileReader();
  reader.onload = () => {
    brand.logo = reader.result;
    document.getElementById('logoPreview').src = reader.result;
    localStorage.setItem('brand', JSON.stringify(brand));
  };
  reader.readAsDataURL(file);
});

function addFood() {
  const name = document.getElementById('foodName').value.trim();
  const desc = document.getElementById('foodDesc').value.trim();
  const price = document.getElementById('foodPrice').value.trim();
  const imgFile = document.getElementById('foodImg').files[0];
  if (!name || !price) return alert('نام و قیمت الزامی‌ست');
  const reader = new FileReader();
  reader.onload