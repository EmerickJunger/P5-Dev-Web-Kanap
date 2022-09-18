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
        /*input.name = "itemQuantity";
        input.min = "1";
        input.max = "100";
        input.type = Number;*/
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

        pQuantity.addEventListener('change', function(){
            modifyQuantity(cart[i].quantity);
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
function modifyQuantity(id, color, quantity){

    let cart = JSON.parse(localStorage.getItem("products"));
    for(let i = 0; i < cart.length; i++){
        
        if(cart[i].id === id && cart[i].color === color){
            cart[i].quantity = quantity;
        }
        window.location.reload();
    }
    localStorage.setItem("products", JSON.stringify(cart));
}