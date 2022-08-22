const section = document.getElementById("items");

let baliseA =document.createElement("a");

let article =document.createElement ("article");


let img =document.createElement("img");

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


`<a href="product.html?id=${product._id}">
                        <article>
                            <img src="${product.imageUrl}"alt="${product.altTxt}" />
                            <h3 class="productName">${product.name}</h3>
                            <p class="productDescription">${product.description}</p>
                        </article>
                    <a/>`;


                    