const url = new URL(location.href);
orderId = url.searchParams.get("orderId");

const orderIdElement = document.querySelector("#orderId");
orderIdElement.innerText = orderId;