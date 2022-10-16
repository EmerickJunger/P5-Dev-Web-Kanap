const baseUrl = "http://localhost:3000/api/products/";

async function fetchFromApi(id = "") {
    const url = baseUrl + id;

    const response = await fetch(url);
    const result = await response.json();
    return result;
};
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const id = urlParams.get("id");

let productName = "";
let imgSrc = "";
let imgAlt = "";
//affichage d'un produit
function getProduct() {
    try {
        fetch(baseUrl+id)
        .then(response=>response.json())
        .then(
        
            result => {

                const imgDiv = document.querySelector(".item__img");
                let img = document.createElement("img");

                imgSrc = result.imageUrl; 
                imgAlt = result.altTxt;
                img.src = imgSrc;
                img.alt = imgAlt;
                imgDiv.appendChild(img);

                const title = document.querySelector("title");
                title.innerText = result.name;
                productName = result.name;

                const price = document.getElementById("price");
                price.innerText = result.price;

                const description = document.getElementById("description");
                description.innerText = result.description;

                for (let i=0; i<result.colors.length;i++){
                    const colors = document.getElementById("colors");
                    let option = document.createElement("option");
                    option.value = result.colors[i];
                    option.innerText = result.colors[i];
                    colors.appendChild(option);
                }
            }
        )
        const button = document.getElementById("addToCart");
        button.addEventListener('click', function(){
            let isValidQuantity = true;
            const quantity = document.getElementById('quantity');
            isValidQuantity = verifyQuantity(quantity.value);

            let isValidColor = true;
            const select = document.getElementById('colors');
            const color = select.options[select.selectedIndex].text;
            isValidColor = verifyColor(color);
            
            if (isValidQuantity && isValidColor){
                //Gestion localStorage
                let addToCart = {
                    img: imgSrc,
                    alt: imgAlt,
                    name: productName,
                    color: color,
                    quantity: Number(quantity.value),
                    id: id,
                };
                
                let cart = JSON.parse(localStorage.getItem("products"));
                if (cart){
                    let isExist = false;
                    for (let i = 0; i<cart.length; i++){
                        if(color == cart[i].color && id == cart[i].id){
                            cart[i].quantity += Number(quantity.value);
                            isExist = true;
                        }
                    }
                    if(!isExist){
                        cart.push(addToCart);
                    }
                    localStorage.setItem("products",JSON.stringify(cart));

                } else {
                    cart = [];
                    cart.push(addToCart);
                    localStorage.setItem("products",JSON.stringify(cart));     
                }
                window.location.href = "cart.html";
            }
        }
        )
    } catch (error) {
        console.error(error);
    } 
}
//vérifier si la quantité à été choisi avec un un renvoi de message d'erreur si non effectué
function verifyQuantity(quantity){
    let span = document.createElement("span");
    if (Number(quantity)<1){
        
        span.style.color = "red";
        span.innerText = "La quantité doit être supérieur à 0";
        const divItemContentSettingsQuantity = document.querySelector(".item__content__settings__quantity");
        const br = document.createElement("br");
        divItemContentSettingsQuantity.appendChild(br);
        divItemContentSettingsQuantity.appendChild(span);
        return false;
    
    } else 
    {
        span.remove(span);
        return true;
    };
}
//vérifier si la couleur à été choisi avec un un renvoi de message d'erreur si non effectué
function verifyColor(color){
    let span = document.createElement("span");
    if (color.includes("--SVP, choisissez une couleur --")){
        
        span.style.color = "red";
        span.innerText = "Veuillez choisir une couleur";
        const divItemContentSettingsQuantity = document.querySelector(".item__content__settings__quantity");
        const br = document.createElement("br");
        divItemContentSettingsQuantity.appendChild(br);
        divItemContentSettingsQuantity.appendChild(span);
        return false;

    } else
    {
        span.remove(span);
        return true;
    }
}