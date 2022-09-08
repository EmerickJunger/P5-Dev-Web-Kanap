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

                result.forEach(product => {

                    console.log(product);

                    const section = document.getElementById("items");

                    let baliseA = document.createElement("a");
                    let article = document.createElement ("article");
                    let img = document.createElement("img");
                    let h3 = document.createElement("h3");
                    let p = document.createElement("p");

                    h3.className = "productName";
                    p.className = "productDescription";

                    h3.innerText = product.name;
                    p.innerText = product.description;

                    img.setAttribute("src", product.imageUrl);
                    img.setAttribute("alt", product.altTxt);
                    baliseA.setAttribute("href", "product.html?id=" + product._id);

                    article.appendChild(img);
                    article.appendChild(h3);                   
                    article.appendChild(p);

                    baliseA.appendChild(article);
                    section.appendChild(baliseA);
                })
            }
        )
    } catch (error) {
        console.error(error);
    }
}