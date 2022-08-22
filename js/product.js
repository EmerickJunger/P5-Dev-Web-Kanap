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
        //fetchFromApi(window.location.search.split("?id=")[1]).then(
        
        const queryString = window.location.search;
        console.log(queryString);
        const urlParams = new URLSearchParams(queryString);
        

            result => {
                //console.log(result);
                const imgDiv = document.querySelector(".item__img");
                let img = document.createElement("img");

                img.src = result.imageUrl;
                img.alt = result.altTxt;
                imgDiv.appendChild(img)

                const title = document.querySelector("title");
                title.innerText = result.name;
                
                const price = document.getElementById("price");
                price.innerText = result.price;

                const description = document.getElementById("description");
                description.innerText = result.description;

                
                for (let i=0; i<result.colors.length;i++){
                    console.log(result.colors[i])
                    const colors = document.getElementById("colors");
                    let option = document.createElement("option");
                    option.value = result.colors[i];
                    option.innerText = result.colors[i];
                    colors.appendChild(option);
                }
            }
        //)
        const button = document.getElementById("addToCart");
        button.addEventListener('click', function(){
            localStorage.setItem("color","blue");
        });
    } catch (error) {
        console.error(error);
    } 
}
