//recuperer le local Storage

//boucle for reccrer le html

// recuperer le prix avec fetch a l'api

//function prend param id
let baseurl = '';
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