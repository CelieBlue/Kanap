main();

function main() {
    const products = getProducts();
    showProducts(products);
}

function getProducts() {
    fetch("http://localhost:3000/api/products") 

        .then(response => response.json())

        .then(products => console.log(products))
    
    return"products";
}

function showProducts() {
    return"";
}