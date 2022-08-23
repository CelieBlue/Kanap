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
        // localStorage.clear();
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

// CREATE GLOBAL VARIABLE CART TO GET THE PRODUCTVALUES IF IT EXISTS IN THE LOCALSTORAGE 
let cart = JSON.parse(localStorage.getItem("allProducts"));

function addProductValuesToLocalStorage() {
    //TAKE THE VALUE OF THE COLOR AND THE QUANTITY THAT THE USER CHOOSE
    let colorOption = document.querySelector("#colors").value;
    let quantity = document.querySelector("#quantity").value;

     // CREATE AN OBJECT "productValues" WITH THE INFOS SELECTED BY THE USER AND STORE IT IN THE
    // LOCAL STORAGE AS A STRING
    let productValues = {
        _id:   id,
        color: colorOption,
        quantity: quantity
    };
    localStorage.setItem(id, JSON.stringify(productValues));

    let verifyColorAndQuantity = () => {
    if (colorOption == null || colorOption === "" ) {
        alert("Sélectionnez une couleur");
        return false;
    }
    if (quantity <= 0) {
        alert("Entrez une quantité");
        return false;
        } else if (quantity > 100) {
        alert("Vous ne pouvez pas commander plus de 100 exemplaires");
        return false;
        } else {
            return quantity;
        }
    }

    if (colorOption == null || colorOption ==="" || quantity <= 0 || quantity > 100) {
        verifyColorAndQuantity();
    }else {
    /* If the cart is null, an array is created
    the push method put the productValues in the cart
    */
    if (cart == null) {
        cart = [];
        // PUSH THE PRODUCTVALUES IN THE LOCALSTORAGE
        cart.push(productValues);
        alert("Le produit a bien été ajouté au panier");
    }
    /* If the cart is not null, the find method search if there is an element
    which has the same color and the same id
    If it finds one, it 
    */
    else if (cart != null) {

        const findProductInLocalStorage = cart.find(
            (element) => element._id === id && element.color === colorOption);
        
            if (findProductInLocalStorage) {
                console.log("id trouvé", findProductInLocalStorage);
                // cart.quantity += quantity;
            }
            else {
                cart.push(productValues);
                alert("Le produit a bien été ajouté au panier");
                console.log("produit ajouté nouvel id")
            }

            return cart;
    }
   
    // else {
    //     let findProductInLocalStorage = cart.find(
    //         (element) => element.id === id && element.color === colorOption);
    //         console.log("findResult est " .id);
        
    //         if (findProductInLocalStorage) {
    //             console.log("id trouvé");
    //             cart.quantity += quantity;
    //         }

    // return cart;
    // }
    }
    //STORE THE PORODUCTVALUES IN THE LOCALSTORAGE AS A STRING  
    localStorage.setItem("allProducts", JSON.stringify(cart));

}

// PUT AN ADDEVENTISLISTENER ON THE BUTTON "Ajouter au panier"
let btnAddToBasket = document.querySelector("#addToCart");
btnAddToBasket.addEventListener("click", ()=>  {
    
    addProductValuesToLocalStorage();
    //List of the products
    console.log(localStorage.getItem("allProducts"));
    //Last product
    console.log(localStorage.getItem("productValues"));
        
});
      

getDataProduct();                     