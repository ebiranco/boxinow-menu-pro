// داده نمونه محصولات (در حالت واقعی باید از سرور یا دیتابیس دریافت شود)
let products = [
    {id: 1, name: {fa: "پیش‌غذا", en: "Appetizer"}, desc: {fa: "توضیح پیش‌غذا", en: "Appetizer description"}, category: "appetizers", price: "100,000"},
    {id: 2, name: {fa: "غذای اصلی", en: "Main Course"}, desc: {fa: "توضیح غذای اصلی", en: "Main course description"}, category: "main-courses", price: "250,000"},
    {id: 3, name: {fa: "دسر", en: "Dessert"}, desc: {fa: "توضیح دسر", en: "Dessert description"}, category: "desserts", price: "80,000"}
];

let lang = "fa"; // زبان پیش‌فرض

// عناصر DOM
const menuSection = document.querySelector('.menu');
const categoryDropdown = document.getElementById('categoryDropdown');
const floatingButton = document.querySelector('.floating-button');
const header = document.querySelector('.header');
const footer = document.querySelector('.footer');

// نمایش اعلان (Toast)
function showToast(message, type = "success") {
    let toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.innerText = message;
    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), 3000);
}

// رندر منو با فیلتر و جستجو
function renderMenu(filter="all", search="") {
    menuSection.innerHTML = '';
    let filtered = products.filter(p =>
        (filter === "all" || p.category === filter) &&
        (p.name[lang].includes(search) || p.desc[lang].includes(search))
    );
    filtered.forEach(product => {
        let card = document.createElement('div');
        card.className = 'product-card animated-card';
        card.innerHTML = `
            <h3>${product.name[lang]}</h3>
            <p>${product.desc[lang]}</p>
            <span>${product.price}</span>
        `;
        card.addEventListener('click', () => {
            card.classList.toggle('expanded');
            if(card.classList.contains('expanded')) {
                card.innerHTML += `<div class="details">${lang === "fa" ? "جزئیات بیشتر" : "More details"}</div>`;
            } else {
                card.querySelector('.details').remove();
            }
        });
        menuSection.appendChild(card);
    });
}

// فیلتر دسته‌بندی
categoryDropdown.addEventListener('change', e => {
    renderMenu(e.target.value, document.getElementById('searchInput')?.value || "");
});

// دکمه شناور افزودن محصول جدید
floatingButton.addEventListener('click', () => {
    showAddProductForm();
});

// فرم پاپ‌آپ افزودن محصول
function showAddProductForm() {
    let form = document.createElement('div');
    form.className = 'popup-form';
    form.innerHTML = `
        <form>
            <label>${lang === "fa" ? "نام محصول" : "Product Name"}:</label>
            <input type="text" id="newName" required>
            <label>${lang === "fa" ? "توضیحات" : "Description"}:</label>
            <input type="text" id="newDesc" required>
            <label>${lang === "fa" ? "دسته‌بندی" : "Category"}:</label>
            <select id="newCategory">
                <option value="appetizers">${lang === "fa" ? "پیش‌غذا" : "Appetizers"}</option>
                <option value="main-courses">${lang === "fa" ? "غذای اصلی" : "Main Courses"}</option>
                <option value="desserts">${lang === "fa" ? "دسر" : "Desserts"}</option>
            </select>
            <label>${lang === "fa" ? "قیمت" : "Price"}:</label>
            <input type="text" id="newPrice" required>
            <button type="submit">${lang === "fa" ? "افزودن" : "Add"}</button>
            <button type="button" id="cancelBtn">${lang === "fa" ? "لغو" : "Cancel"}</button>
        </form>
    `;
    document.body.appendChild(form);

    form.querySelector('form').addEventListener('submit', (e) => {
        e.preventDefault();
        let name = form.querySelector('#newName').value.trim();
        let desc = form.querySelector('#newDesc').value.trim();
        let category = form.querySelector('#newCategory').value;
        let price = form.querySelector('#newPrice').value.trim();
        if(name && desc && price) {
            // افزودن محصول
            let newProduct = {
                id: products.length + 1,
                name: {fa: lang==="fa"?name:"", en: lang==="en"?name:""},
                desc: {fa: lang==="fa"?desc:"", en: lang==="en"?desc:""},
                category, price
            };
            if(lang==="fa") {
                newProduct.name.en = "";
                newProduct.desc.en = "";
            } else {
                newProduct.name.fa = "";
                newProduct.desc.fa = "";
            }
            products.push(newProduct);
            renderMenu(category);
            showToast(lang === "fa" ? "محصول با موفقیت افزوده شد!" : "Product added!", "success");
            form.remove();
        } else {
            showToast(lang === "fa" ? "همه فیلدها را پر کنید." : "Please fill all fields.", "error");
        }
    });
    form.querySelector('#cancelBtn').addEventListener('click', () => form.remove());
}

// جستجوی زنده
function addSearchBox() {
    let searchBox = document.createElement('input');
    searchBox.type = 'text';
    searchBox.id = 'searchInput';
    searchBox.placeholder = lang === "fa" ? "جستجو..." : "Search...";
    searchBox.addEventListener('input', e => {
        renderMenu(categoryDropdown.value, e.target.value);
    });
    header.appendChild(searchBox);
}

// سوئیچ زبان
function addLangSwitcher() {
    let langBtn = document.createElement('button');
    langBtn.className = 'lang-switcher';
    langBtn.innerText = lang === "fa" ? "EN" : "FA";
    langBtn.addEventListener('click', () => {
        lang = lang==="fa" ? "en" : "fa";
        langBtn.innerText = lang === "fa" ? "EN" : "FA";
        header.querySelector('h1').innerText = lang === "fa" ? "منوی باکسی‌نو" : "Boxinow Menu";
        footer.querySelector('p').innerText = lang === "fa" ? "تمام حقوق محفوظ است © باکسی‌نو 2023" : "© 2023 Boxinow. All Rights Reserved.";
        renderMenu(categoryDropdown.value, document.getElementById('searchInput')?.value || "");
        header.querySelector('#searchInput').placeholder = lang === "fa" ? "جستجو..." : "Search...";
    });
    header.appendChild(langBtn);
}

// راه‌اندازی اولیه
window.onload = () => {
    renderMenu();
    addSearchBox();
    addLangSwitcher();
};
