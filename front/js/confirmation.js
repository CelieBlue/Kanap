//Return the value of urlSearchParams : the order id
const url = new URL(location.href);
orderId = url.searchParams.get("orderId");
//Display the orderId
const orderIdElement = document.querySelector("#orderId");
orderIdElement.innerText = orderId;