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
    let qty = document.querySelector("#quantity").value;

    // CREATE AN OBJECT "productValues" WITH THE INFOS SELECTED BY THE USER
    let productValues = {
        _id:   id,
        color: colorOption,
        quantity: qty
    };
    //STORE THE OBJECT "PRODUCTVALUES" IN THE LOCALSTORAGE AS A STRING  
    localStorage.setItem(id, JSON.stringify(productValues));

    /*THIS FUNCTION VERIFY IF THE USER HAS CHOSEN A COLOR AND A QUANTITY < 0 AND > 100.
    IF NOT : THERE IS AN ALERT
    */
    let verifyColorAndQuantity = () => {
    if (colorOption == null || colorOption === "" ) {
        alert("Sélectionnez une couleur");
        return false;
    }
    if (qty <= 0) {
        alert("Entrez une quantité");
        return false;
        } else if (qty > 100) {
        alert("Vous ne pouvez pas commander plus de 100 exemplaires");
        return false;
        } else {
            return qty;
        }
    }

    if (colorOption == null || colorOption ==="" || qty <= 0 || qty > 100) {
        verifyColorAndQuantity();
    }else {
    /* If the cart is null, an array is created
    the push method put the productValues in the cart
    */
        if (cart == null) {
            cart = [];
            cart.push(productValues);
            //SAVE ALLPRODUCTS BACK TO LOCAL STORAGE  
            localStorage.setItem("allProducts", JSON.stringify(cart));
            alert("Le produit a bien été ajouté au panier");
        }
       
        /* If the cart is not null, the find method search if there is an element
        which has the same color and the same id
        If it finds one, it increase the quantity
        if it doesn'f find one, it push the new producValues in the cart
        */
        else if (cart != null) {

        // const findProductInCart = cart.find(
        //     (element) => element._id === id && element.color === colorOption);
        
        //     if (findProductInCart) {
        //         // findProductInLocalStorage.quantity = (Number(findProductInLocalStorage.quantity)) + (Number(findProductInLocalStorage.qty));
        //         findProductInCart.quantity = quantity;
        //         // console.log("id trouvé", findProductInCart.quantity);
        //     }
            const findProductInCart = cart.find(element => {
                if (element._id === id && element.color === colorOption) {
                    element.quantity += qty;
                    return true;
                }
                return false;
            });
        
            if (!findProductInCart) {
                cart.push(productValues);
                alert("Le produit a bien été ajouté au panier");
                console.log("produit ajouté nouvel id")
            }
            //SAVE ALLPRODUCTS BACK TO LOCALSTORAGE  
            localStorage.setItem("allProducts", JSON.stringify(cart));
        }
    }
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