const baseUrl = "http://localhost:3000/api/products/";

async function fetchFromApi(id = '') {
    const url = baseUrl + id;

    const response = await fetch(url);
    const result = await response.json();
    return result;
};

function getAllProducts() {
    try {
        fetchFromApi().then(
            result => {
                const itemsElt = document.getByElementId("items");
                let cards = "";
                result.forEach(product => {
                    console.log();
                    const card =
                    `<a href="product.html?id=${product._id}">
                        <article>
                        <img src="${product.imageUrl}"alt="${product.altTxt}" />
                        <h3 class="productName">${product.name}</h3>
                        <p class="productDescription">${product.description}</p>
                        </article>
                    <a/>`;
                    cards += card;
                })

                itemsElt.innerHTML = cards;
            }
        )
    } catch (error) {
        console.error(error);
    }
}