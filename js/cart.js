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
}
/*let orderID = 1
const btnOrder = document.getElementById("order")
btnOrder.addEventListener('click', function(){
  let isValid = validForm();
  if (isValid){
    // requete api

    function makeJsonData() {
  let contact = {
    firstName: prenom.value,
    lastName: nom.value,
    address: adresse.value,
    city: ville.value,
    email: mail.value,
  };
  let items = getCart();
  let products = [];

  for (i = 0; i < items.length; i++) {
    if (products.find((e) => e == items[i][0])) {
      console.log("not found");
    } else {
      products.push(items[i][0]);
    }
  }
  let jsonData = JSON.stringify({ contact, products });
  return jsonData;
}

    // vider local storage
    
    localStorage.removeItem("products");
    window.location.href("confirmation.html?/orderId="+orderId)
  }
});*/

const prenom = document.getElementById("firstName");
const nom = document.getElementById("lastName");
const ville = document.getElementById("city");
const adresse = document.getElementById("address");
const mail = document.getElementById("email");

const emailErrorMsg = document.getElementById("emailErrorMsg");
function validateEmail(mail) {
  let emailRegex = new RegExp("^[a-zA-Z0-9.-_]+[@]{1}[a-zA-Z0-9.-_]+[.]{1}[a-z]{2,10}$");

  if (emailRegex.test(mail) == false) {
    return false;
  } else {
    emailErrorMsg.innerHTML = null;
    return true;
  }
}

const firstNameErrorMsg = document.getElementById("firstNameErrorMsg");
function validateFirstName(prenom) {
  let nameRegex = new RegExp ("/^[a-z][a-z '-.,]{1,31}$|^$/i");
  if (nameRegex.test(prenom) == false) {
    return false;
  } else {
    firstNameErrorMsg.innerHTML = null;
    return true;
  }
}

const lastNameErrorMsg = document.getElementById("lastNameErrorMsg");
function validateLastName(nom) {
  let lastNameRegex = new RegExp ("/^[a-z][a-z '-.,]{1,31}$|^$/i");
  if (lastNameRegex.test(nom) == false) {
    return false;
  } else {
    lastNameErrorMsg.innerHTML = null;
    return true;
  }
}

const cityErrorMsg = document.getElementById("cityErrorMsg");
function validateCity(ville) {
  let cityRegex = new RegExp ("/^[a-z][a-z '-.,]{1,31}$|^$/i");
  if (cityRegex.test(ville) == false) {
    return false;
  } else {
    cityErrorMsg.innerHTML = null;
    return true;
  }
}

const adressErrorMsg = document.getElementById("adressErrorMsg");
function validateAdress(adresse) {
  let adressRegex = new RegExp ("[0-9]{1,3}(?:(?:[,. ]){1}[-a-zA-Zàâäéèêëïîôöùûüç]+)+");
  if (adressRegex.test(adresse) == false) {
    return false;
  } else {
    adressErrorMsg.innerHTML = null;
    return true;
  }
}