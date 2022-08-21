const baseUrl = "http://localhost:3000/api/products/";

async function fetchFromApi(id = "") {
    const url = baseUrl + id;

    const response = await fetch(url);
    const result = await response.json();
    return result;
};

function getProduct() {
    console.log(window.location)
    try {
        fetchFromApi(window.location.search.split("?id=")[1]).then(
            result => {
                console.log(result);
                const img = document.querySelector(".item__img");
                img.innerHTML = `<img src="${result.imageUrl}" alt="${result.altTxt}">`;

                const name = document.getElementById("title");
                name.innerHTML = result.name;

                const title = document.querySelector("title");
                title.innerHTML = result.name;
                
                const price = document.getElementById("price");
                price.innerHTML = `${result.price}`

                

            }
        )
    } catch (error) {
        console.error(error);
    } 
}
