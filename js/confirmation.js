const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const orderId = urlParams.get("orderId");

const spanOrder = document.getElementById("orderId");
spanOrder.innerText = orderId;