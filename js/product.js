const baseUrl = "http://localhost:3000/api/products/";

async function fetchFromApi(id = "") {
    const url = baseUrl + id;

    const response = await fetch(url);
    const result = await response.json();
    return result;
};
    

function getProduct() {
    console.log(window.location);
    try {
        fetchFromApi(window.location.search.split("?id=")[1]).then(
        

            result => {
                console.log(result);
                const imgDiv = document.querySelector(".item__img");
                let img = document.createElement("img");

                img.src = result.imageUrl;
                img.alt = result.altTxt;
                imgDiv.appendChild(img);

                const title = document.querySelector("title");
                title.innerText = result.name;
                
                const price = document.getElementById("price");
                price.innerText = result.price;

                const description = document.getElementById("description");
                description.innerText = result.description;

                
                for (let i=0; i<result.colors.length;i++){
                    console.log(result.colors[i]);
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
                    name: title.innerText,
                    price: parseFloat(price.innerText),
                    quantity: parseFloat(isValidQuantity),
                    id: window.location,
                };
            }
        }
        )
        // pas de prix stocké dans le localstorage
    } catch (error) {
        console.error(error);
    } 
}

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

function verifyColor(color){
    let span = document.createElement("span");
    console.log(color);
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