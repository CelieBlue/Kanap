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
        // saveProductInLocalStorage(product);
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

// CREATE VARIABLE CART TO GET THE ITEM IN THE LOCALSTORAGE 

let item = JSON.parse(localStorage.getItem("productValues"));

// PUT AN ADDEVENTISLISTENER ON THE BUTTON
    let btnAddToCart = document.querySelector("#addToCart");
    btnAddToCart.addEventListener("click", ()=>  {

        const colorOption = document.querySelector("#colors").value;
        const quantity = document.querySelector("#quantity").value;


        let productValues = {
            id: id,
            color: colorOption,
            quantity: quantity
        };

        localStorage.setItem("productValues", JSON.stringify(productValues));
    });

getDataProduct();                     