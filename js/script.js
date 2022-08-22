const baseUrl = "http://localhost:3000/api/products/";

async function fetchFromApi(id = "") {
    const url = baseUrl + id;

    const response = await fetch(url);
    const result = await response.json();
    return result;
};

function getAllProducts() {
    try {
        fetchFromApi().then(
            result => {
                const itemsElt = document.getElementById("items");
                let cards = "";
                result.forEach(product => {

                    console.log(product);
                    const section = document.getElementById("items");

                    let baliseA = document.createElement("a");

                    let article = document.createElement ("article");


                    let img = document.createElement("img");

                    img.src = "images/logo.png";
                    img.alt ="photo";

                    article.apprendChild(img);

                    let h3 = document.createElement("h3");

                    h3.className= "productName";
                    h3.innerText ="titre";

                    article.appendChild(h3)

                    let p = document.createElement("p");

                    p.className = "productDescription";
                    p.innerText = "ceci est un paragraphe";

                    article.appendChild(p);

                    baliseA.apprendChild(article)
                    section.apprendChild(baliseA)

                    const card =
                    
                    cards += card;
                })

                itemsElt.innerText = cards;
            }
        )
    } catch (error) {
        console.error(error);
    }
}