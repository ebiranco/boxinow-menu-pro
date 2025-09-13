document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("menuForm");
  const logoInput = document.getElementById("logo");
  const logoPreview = document.getElementById("logoPreview");
  const addItemBtn = document.getElementById("addItemBtn");
  const menuItems = document.getElementById("menuItems");
  const msg = document.getElementById("menuMsg");
  let logoData = "";
  let items = [];

  logoInput.addEventListener("change", function (e) {
    const file = e.target.files[0];
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onload = function (ev) {
        logoData = ev.target.result;
        logoPreview.innerHTML = `<img src="${logoData}" class="avatar-preview" alt="Logo" style="animation:popAvatar 0.7s;">`;
      };
      reader.readAsDataURL(file);
    }
  });

  addItemBtn.onclick = function () {
    const idx = items.length;
    const itemDiv = document.createElement("div");
    itemDiv.className = "menu-item";
    itemDiv.innerHTML = `
      <input type="text" placeholder="نام آیتم" required id="item_name_${idx}">
      <input type="text" placeholder="دسته‌بندی" required id="item_cat_${idx}">
      <input type="number" placeholder="قیمت (تومان)" required id="item_price_${idx}">
      <textarea placeholder="توضیحات" id="item_desc_${idx}" rows="1"></textarea>
      <button type="button" class="btn-main btn-remove" title="حذف">❌</button>
      <hr>
    `;
    menuItems.appendChild(itemDiv);
    items.push(itemDiv);

    itemDiv.querySelector(".btn-remove").onclick = function () {
      itemDiv.remove();
      items = items.filter(i => i !== itemDiv);
    };
  };

  form.onsubmit = function (e) {
    e.preventDefault();
    const data = {
      restaurant: form.restaurant.value.trim(),
      manager: form.manager.value.trim(),
      phone: form.phone.value.trim(),
      address: form.address.value.trim(),
      desc: form.desc.value.trim(),
      logo: logoData,
      menu: []
    };
    items.forEach((itemDiv, idx) => {
      data.menu.push({
        name: itemDiv.querySelector(`#item_name_${idx}`).value.trim(),
        category: itemDiv.querySelector(`#item_cat_${idx}`).value.trim(),
        price: itemDiv.querySelector(`#item_price_${idx}`).value.trim(),
        desc: itemDiv.querySelector(`#item_desc_${idx}`).value.trim()
      });
    });
    if (data.menu.length === 0) {
      msg.textContent = "لطفاً حداقل یک آیتم منو اضافه کنید.";
      msg.className = "msg error show";
      setTimeout(() => msg.classList.remove("show"), 1600);
      return;
    }
    localStorage.setItem("menu_" + data.restaurant, JSON.stringify(data));
    msg.innerHTML = '<span style="font-size:1.3em;">✔️</span> منوی رستوران ثبت شد!';
    msg.className = "msg success show";
    setTimeout(function () {
      window.location.href = `menu.html#${data.restaurant}`;
    }, 1200);
  };

  // Ripple effect for buttons
  document.querySelectorAll(".btn-main").forEach(btn => {
    btn.addEventListener('click', function (e) {
      const ripple = document.createElement("span");
      ripple.className = "ripple";
      ripple.style.left = (e.offsetX) + "px";
      ripple.style.top = (e.offsetY) + "px";
      ripple.style.width = ripple.style.height = Math.max(btn.offsetWidth, btn.offsetHeight) + 'px';
      btn.appendChild(ripple);
      setTimeout(() => ripple.remove(), 500);
    });
  });
});
