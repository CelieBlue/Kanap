/*Find the "id" of the article with window.location.search
* and get it with URLSearchParams 
*/

 const idProduct = window.location.search;
 const urlParams = new URLSearchParams(idProduct);
 const id = urlParams.get("id");
 console.log({id});

//FETCH METHOD TO GET THE DATA IN THE API

async function getDataProduct(_dataProduct) {
    
    const dataProduct = `http://localhost:3000/api/products/${id}`;
    
    await fetch(dataProduct)
    
    .then((response)=> 
        response.json())
    
    .then((product)=> {
        console.log(product);
        showOneProduct(product);
        localStorage.clear();
        // addToCart();
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
        colorOption.value = color;
    }
};


//*************   CART    *************/

// FUNCTION TO TEST AND GET THE COLOR VALUE OF THE PRODUCT
        
function getColorValue() {
    let colorOption = document.querySelector("#colors").value;

    if (colorOption == null || colorOption === "" ) {
        alert("Vous n'avez pas choisi de couleur");
    } else { 
        return colorOption;
    }
}

// FUNCTION TO TEST AND GET THE QUANTITY VALUE OF THE PRODUCT

function getQuantityValue() {
    let quantity = document.querySelector("#quantity").value;

    if (quantity == 0) {
        alert("Vous n'avez pas choisi une quantité");
    } else if (quantity > 100) {
        alert("Vous ne pouvez pas commander plus de 100 exemplaires");
    } else {
        return parseInt(quantity);
    }
}

function addToCart() {
    // CREATE VARIABLE ITEM TO GET THE ITEM IN THE LOCALSTORAGE 
    // CREATE VARIABLE CART TO STORE THE ITEMS IN A ARRAY IN LOCALSTORAGE
    let item = JSON.parse(localStorage.getItem("productValues"));
    let cart = JSON.parse(localStorage.getItem("allProducts"));
    
    //TAKE THE VALUE OF THE COLOR AND THE QUANTITY THAT THE USER CHOOSE
    let colorOption = document.querySelector("#colors").value;
    let quantity = document.querySelector("#quantity").value;

    // CREATE AN OBJECT WITH THE INFOS OF THE USER AND STORE IT IN THE
    // LOCAL STORAGE AS A STRING
    let productValues = {
        id: id,
        color: colorOption,
        quantity: quantity
    };
    localStorage.setItem(id, JSON.stringify(productValues));

    // If the cart is empty, an array is created
    // the push method put a product in the cart
    if (cart == null) {
        cart = [];

        // VERIFY IF A COLOR IS SELECTED & IF THE QUANTITY IS NOT > 100
        getColorValue();
        getQuantityValue();

        cart.push(productValues);
        localStorage.setItem("allProducts", JSON.stringify(cart));
        console.log(cart);
        alert("Le produit a bien été ajouté au panier");
    }
    else if (cart != null) {
        cart.push(productValues);
        localStorage.setItem("allProducts", JSON.stringify(cart));
        console.log(cart);
        alert("Le produit a bien été ajouté au panier");
    }
   
    else {
        // IF THE PRODUCT EXIST WITH THE SAME COLOR, ADD QUANTITY
        for (let i = 0; i < cart.length; i++) {
            if (cart.id === id && cart.color == colorOption) {
                cart.quantity += quantity;
            }
            else {
                cart.push(productValues);
                localStorage.setItem("allProducts", JSON.stringify(cart));
            }
        }
    return cart;
    }      

}



// PUT AN ADDEVENTISLISTENER ON THE BUTTON
let btnAddToCart = document.querySelector("#addToCart");
btnAddToCart.addEventListener("click", ()=>  {

    addToCart();
    //List of the products
    console.log(localStorage.getItem("allProducts"));
    // Last product
    console.log(localStorage.getItem("productValues"));
        
});
      

getDataProduct();                     