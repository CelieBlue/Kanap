/*Find the "id" of the article with window.location.search
* and get it with URLSearchParams 
*/

 const idProduct = window.location.search;
 const urlParams = new URLSearchParams(idProduct);
 const id = urlParams.get("id");
 console.log({id});


// function getProductId() {
//     return new URL(location.href).searchParams.get("id");
// }

//FETCH METHOD TO GET THE DATA IN THE API

async function getDataProduct(_dataProduct) {
    
    const dataProduct = `http://localhost:3000/api/products/${id}`;
    
    await fetch(dataProduct)
    
    .then((response)=> 
        response.json())
    
    .then((product)=> {
        console.log(product);
        showOneProduct(product);
        saveProductInLocalStorage(product);
        // clearLocalStorage(product);

    })
    
    .catch(function(error) {
        alert(error);
    });
}

//*************   PRODUCT ELEMENTS    *************/

// DISPLAY THE ELEMENTS OF THE PRODUCT

function showOneProduct(product) {

    //Select the elements in the div "Article"     

    let imgURL = "http://localhost:3000/images/";
    let img = document.createElement("img");
    document.querySelector('.item__img').appendChild(img);
    let title = document.querySelector('#title');
    let price = document.querySelector('#price')
    let description = document.querySelector('#description');
    

    //Put the value of the API in the element

    img.src = product.imageUrl;
    img.alt = product.altTxt;
    title.textContent = product.name;
    price.textContent = product.price;
    description.textContent = product.description;


    // Select and display the option value of the color

    for (let color of product.colors) {

        console.log(color);

        let colorOption = document.createElement("option");
        document.querySelector("#colors").appendChild(colorOption);
        colorOption.textContent = color;
    }

    addProductToCart();
    
};

getDataProduct();


//*************   CART    *************/

// CREATE VARIABLES PRODUCT & CART TO GET THE ITEM IN THE LOCALSTORAGE

let products = JSON.parse(localStorage.getItem("products"));
let cart = JSON.parse(localStorage.getItem("cart"));

// SAVE THE CART IN THE LOCALSTORAGE

function saveProductInLocalStorage(product) {
    localStorage.setItem("products", JSON.stringify(product));

    // Verify if the cart array is in the localStorage
    if (localStorage.getItem("cart") == null){
         localStorage.setItem("cart", "[]");
     }
}

//FIND A PRODUCT BY ITS ID AND ADD IT IN THE CART 

//This function return the Id of the product found in products 
function addProductToCart(productId) {
    let product = products.find(function(product) {
        return product.id == productId;
    });

    // If the cart is empty, the push method put a product in the cart
    if(cart.length == 0) {
        cart.push(product);
    }
    else {
        // if the product exist, the find method return the product and
        // store it in the variable "res" 
        let res = cart.find(element => element.id == productId);
        // If the product doesn't exist, the find method return the value indefined    
        if(res == undefined) {
            // if the value is indefined, the push method put a product in the cart
            cart.push(product);
        }
    }
    // localStorage.setItem("cart", JSON.stringify(cart));
    saveProductInLocalStorage();
}





// FUNCTION TO REMOVE A PRODUCT IN THE LOCALSTORAGE

// function removeProductFromCart(product) {

// }

// FUNCTION TO CLEAR THE LOCALSTORAGE

// function clearLocalStorage(productId) {
//     localStorage.clear(productId)
// }

// FUNCTIONS TO GET THE COLOR VALUE AND THE QUANTITY
        
// function getColorValue() {
//     let color = document.querySelector("#colors");
//     return color.value;
// }

// function getQuantity() {
//     let quantity = document.querySelector("#quantity");
//     return quantity.value;
// }

// PUT AN ADDEVENTISLISTENER ON THE BUTTON

