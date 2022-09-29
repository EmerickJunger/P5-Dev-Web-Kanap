const baseUrl = "http://localhost:3000/api/products/";

async function fetchFromApi(id = "") {
    const url = baseUrl + id;

    const response = await fetch(url);
    const result = await response.json();
    return result;
};

let cart = JSON.parse(localStorage.getItem("products"));
let price = 0; 
let fullPrice = 0;

async function getPrice(id){

    const response = await fetch(baseUrl + id);
    const product = await response.json();
    return product.price;
}

async function getPanier(){

    let totalQuantity = 0;
    let totalPrice = 0;

    for(let i = 0; i < cart.length; i++){
    
        let price = await getPrice(cart[i].id);

        const section = document.getElementById("cart__items");
       
        let article = document.createElement("article");
        let divCartItemImg = document.createElement("div");
        let img = document.createElement("img"); 
        let divCartItemContent = document.createElement("div");
        let divCartItemContentDescription = document.createElement("div");
        let h2 = document.createElement("h2");
        let pColor = document.createElement("p");
        let pPrice = document.createElement("p");
        let divCartItemContentSettings = document.createElement("div");
        let divCartItemContentSettingsQuantity = document.createElement("div");
        let pQuantity = document.createElement("p");
        let input = document.createElement("input");
        let divCartItemContentSettingsDelete = document.createElement("div");
        let pDelete = document.createElement("p");
    
        article.className = "cart__item";
        divCartItemImg.className = "cart__item__img";
        divCartItemContent.className = "cart__item__content";
        divCartItemContentDescription.className = "cart__item__content__description";
        divCartItemContentSettings.className = "cart__item__content__settings";
        divCartItemContentSettingsQuantity.className = "cart__item__content__settings__quantity";
        input.className = "itemQuantity";
        divCartItemContentSettingsDelete.className = "cart__item__content__settings__delete";
        pDelete.className = "deleteItem";
        
        h2.innerText = cart[i].name;
        pColor.innerText = cart[i].color;
        pPrice.innerText = price;
        pQuantity.innerText = "Qté : ";
        pDelete.innerText = "Supprimer";
        input.value = cart[i].quantity;
    
        article.setAttribute("data-id", "data-color");
        img.setAttribute("src", cart[i].img);
        img.setAttribute("alt", cart[i].alt);
        input.setAttribute("type", "number");
        input.setAttribute("min", "1");
        input.setAttribute("max", "100");
    
        divCartItemImg.appendChild(img);
        divCartItemContentDescription.appendChild(h2);
        divCartItemContentDescription.appendChild(pColor);
        divCartItemContentDescription.appendChild(pPrice);
    
        divCartItemContentSettingsQuantity.appendChild(pQuantity);
        divCartItemContentSettingsQuantity.appendChild(input);
    
        divCartItemContentSettingsDelete.appendChild(pDelete);
    
        divCartItemContentSettings.appendChild(divCartItemContentSettingsQuantity);
        divCartItemContentSettings.appendChild(divCartItemContentSettingsDelete);
    
        divCartItemContent.appendChild(divCartItemContentDescription);
        divCartItemContent.appendChild(divCartItemContentSettings);
    
        article.appendChild(divCartItemImg);
        article.appendChild(divCartItemContent);
        
        section.appendChild(article);

        totalQuantity += cart[i].quantity;
        totalPrice += cart[i].quantity * price;

        pDelete.addEventListener('click', function(){
            deleteProduct(cart[i].id, cart[i].color);
        });

        input.addEventListener('change', function(){
            modifyQuantity(cart[i].id, cart[i].color);
        })
    } 
    const spanTotal = document.getElementById("totalQuantity");
    spanTotal.innerText = totalQuantity;

    const spanTotalPrice = document.getElementById("totalPrice");
    spanTotalPrice.innerText = totalPrice;
}
getPanier();

function deleteProduct(id, color){

    let cart = JSON.parse(localStorage.getItem("products"));
    let newCart = [];

    for(let i = 0; i < cart.length; i++){
        if(cart[i].id !== id && cart[i].color !== color){
            newCart.push(cart[i]);
        }
        localStorage.setItem("products", JSON.stringify(newCart));
        window.location.reload();
    }
    
}
function modifyQuantity(id, color){

    let cart = JSON.parse(localStorage.getItem("products"));
    let quantities = document.querySelectorAll(".itemQuantity");
    for(let i = 0; i < cart.length; i++){
        
        if(cart[i].id == id && cart[i].color == color){
            cart[i].quantity = Number(quantities[i].value);
        }
    }
    localStorage.setItem("products", JSON.stringify(cart));
    window.location.reload();
};

//let orderId = 1

const btnOrder = document.getElementById("order");
btnOrder.addEventListener('click', (event) => {
  event.preventDefault();

    // requete api

    let contact = {
    firstName: document.getElementById("firstName").value,
    lastName: document.getElementById("lastName").value,
    address: document.getElementById("address").value,
    city: document.getElementById("city").value,
    email: document.getElementById("email").value,

  };

  const emailRegex = (value) => {
    return /^[_a-z0-9-]+(.[_a-z0-9-]+)*@[a-z0-9-]+(.[a-z0-9-]+)*(.[a-z]{2,4})$/.test(value);
  };

  const adressRegex = (value) => {
    return /^[a-zA-Z0-9.,-_ ]{5,50}[ ]{0,2}$/.test(value);
  };

  const firstNameRegex = (value) => {
    return /^[A-Z][A-Za-z\é\è\ê\-]+$/.test(value);
  };
  
  const lastNameRegex = (value) => {
    return /^[A-Z][A-Za-z\é\è\ê\-]+$/.test(value);
  };
  
  const cityRegex = (value) => {
    return /^[A-Z][A-Za-z\é\è\ê\-]+$/.test(value);
  };

  function firstNameControl() {
    const prenom = contact.firstName;
    let inputFirstName = document.getElementById("firstName");
    if (firstNameRegex(prenom)) {

      document.getElementById("firstNameErrorMsg").textContent = "";
      return true;

    } else {

      document.getElementById("firstNameErrorMsg").textContent = "Veuillez remplir avec un prénom valide";
      return false;

    };
  };

  function lastNameControl() {
    const nom = contact.lastName;
    let inputLastName = document.getElementById("lastName");
    if (lastNameRegex(nom)) {

      document.getElementById("lastNameErrorMsg").textContent = "";
      return true;

    } else {

      document.getElementById("lastNameErrorMsg").textContent =
        "Veuillez remplir avec un nom valide";
      return false;

    };
  };

  function emailControl() {
    const email = contact.email;
    let inputMail = document.getElementById("email");
    if (emailRegex(email)) {

      document.getElementById("emailErrorMsg").textContent = "";
      return true;

    } else {

      document.getElementById("emailErrorMsg").textContent =
        "Veuillez remplir avec un email valide";
      return false;

    };
  };

  function addressControl() {
    const adress = contact.address;
    let inputAddress = document.getElementById("address");
    if (adressRegex(adress)) {

      document.getElementById("addressErrorMsg").textContent = "";
      return true;

    } else {

      document.getElementById("addressErrorMsg").textContent =
        "Veuillez remplir avec une adresse valide";
      return false;

    };
  };

  function cityControl() {
    const ville = contact.city;
    let inputCity = document.getElementById("city");
    if (cityRegex(ville)) {

      document.getElementById("cityErrorMsg").textContent = "";
      return true;

    } else {

      document.getElementById("cityErrorMsg").textContent =
        "Veuillez remplir avec un nom de ville valide";
      return false;

    };
  };

  if (firstNameControl() && lastNameControl() && addressControl() && cityControl() && emailControl())
    {
      localStorage.setItem("contact", JSON.stringify(contact));
      sendToServer();

  }

  function sendToServer() {
    let idProducts = [];
    for(let i=0; i<cart.length; i++){
      idProducts.push(cart[i].id);
    }
    const requestBody = {
      contact: contact, 
      products: idProducts,
    }; 
    const sendToServer = fetch("http://localhost:3000/api/products/order", {
      method: "POST",
      body: JSON.stringify(requestBody),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((server) => {
        orderId = server.orderId;

        if (orderId != "") {
          location.href = "confirmation.html?orderId=" + orderId;
        }
      });
  }
});

let dataFormulaire = JSON.parse(localStorage.getItem("contact"));

if (dataFormulaire) {
  localStorage.clear();
}
//verifier