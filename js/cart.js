//recuperer le local Storage

//boucle for reccrer le html

// recuperer le prix avec fetch a l'api

//function prend param id
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
for(let i = 0; i < cart.lenght; i++){
    // html
    
    const section = document.getElementById("cart__items");
   
    let article = document.createElement("article");
    let div1 = document.createElement("div");
    let img1 = document.createElement("img"); 
    let div2 = document.createElement("div");
    let div3 = document.createElement("div");
    let h2 = document.createElement("h2");
    let p1 = document.createElement("p");
    let p2 = document.createElement("p");
    let div4 = document.createElement("div");
    let div5 = document.createElement("div");
    let p3 = document.createElement("p");
    let input = document.createElement("input");
    let div6 = document.createElement("div");
    let p4 = document.createElement("p");

    article.className = "cart__item";
    div1.className = "cart__item__img";
    div2.className = "cart__item__content";
    div3.className = "cart__item__content__description";
    div4.className = "cart__item__content__settings";
    div5.className = "cart__item__content__settings__quantity";
    input.className = "itemQuantity";
    div6.className = "cart__item__content__settings__delete";
    p4.className = "deleteItem"
    
    h2.innerText = cart.name;
    p1.innerText = cart.color;
    p2.innerText = cart.price;
    p3.innerText = cart.quantity;
    p4.innerText = cart.delete;

    article.setAttribute("data-id", "data-color");
    img1.setAttribute("src", cart.imageUrl);
    img1.setAttribute("alt", cart.altTxt);

    price = await getPrice(cart[i].id);
    // afficher price * cart[i].quantity
    fullPrice += price * cart[i].quantity;
}

async function getPrice(id){
    fetch(baseUrl + id)
    .then(response => response.json())
    .then(result => {
        return result.price;
    })
}