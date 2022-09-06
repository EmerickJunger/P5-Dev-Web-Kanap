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
    // traitement creation html
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