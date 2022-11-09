// CREATE GLOBAL VARIABLE CART TO GET THE PRODUCTVALUES IF IT EXISTS IN THE LOCALSTORAGE 
let cart = JSON.parse(localStorage.getItem("allProducts"));


/*EventListener on the load ot the page that call the function getDataOrder
to display the product stored in the localStorage  */
window.addEventListener('load', getDataOrder);


// FETCH METHOD TO GET THE DATA OF THE API AND THE LOCALSTORAGE
async function getDataOrder() {
    
    const dataOrder = `http://localhost:3000/api/products`;
    
    await fetch(dataOrder)
    
    .then((response)=> 
        response.json())
    
     .then(function(value) {

        let api = value;

        showCartProducts(api, cart);
        totalProductsInCart();
        totalPriceProductsInCart(api, cart);
        removeProductInCart();     
        changeItemQty(cart);
         // localStorage.clear();

    })
    
    .catch(function(error) {
        alert(error);  
    });
}
//--------------------------------------------------------------------
/* THIS FONCTION DISPLAY THE PRODUCTS IN THE CART
WITH THE INFORMATIONS OF EACH PRODUCTS COMING FROM
THE DATA API AND THE LOCALSTORAGE*/
function showCartProducts(api, cart) {

    if (cart === null) {
        
        const cartItem = document.createElement('article');
        cartItem.textContent = "Votre panier est vide";
        document.querySelector('#cart__items').appendChild(cartItem);
        cartItem.className = "cart__item";

        const contactForm = document.querySelector('.cart__order');
        contactForm.style.display="none";

    } else {

        for (let product of cart) {

        console.log(product._id);

        /*THE FIND METHOD IS USED TO FIND AN ID IN THE API THAT
        CORRESPONDS TO THE ID OF THE LOCALSTORAGE*/
   
        const dataApi = api.find((element) => element._id == product._id);

        // Create all the elements in the section "cart__Items"    

        let cartItem = document.createElement('article');
        let cartItemImg = document.createElement('div');
        let img = document.createElement('img');
        let cartItemContent = document.createElement('div');
        let cartItemContentDescription = document.createElement('div');
        let productName = document.createElement('h2');
        let productColor = document.createElement('p');
        let productPrice = document.createElement('p');
        let cartItemContentSettings = document.createElement('div');
        let cartItemContentSettingsQuantity = document.createElement('div');
        let productQty = document.createElement('p');
        let inputQuantity = document.createElement('input');
        let cartItemContentSettingsDelete = document.createElement('div');
        let deleteItem = document.createElement('p');


        //Inject the API data in the elements

        cartItem.textContent = "";
        cartItemImg.textContent = "";
        img.src = dataApi.imageUrl;
        img.alt = dataApi.altTxt;
        cartItemContent.textContent = "";
        cartItemContentDescription.textContent = "";
        productName.textContent = dataApi.name;
        productPrice.textContent = Intl.NumberFormat('fr-FR').format(dataApi.price)+" €";
        productColor.textContent = `${product.color}`;
        cartItemContentSettings.textContent = "";
        cartItemContentSettingsQuantity.textContent = "";
        productQty.textContent = 'Qté :';
        inputQuantity.type = "number";
        // inputQuantity.classList.add("itemQuantity");
        inputQuantity.name = "itemQuantity";
        inputQuantity.min = 1;
        inputQuantity.max = 100;
        inputQuantity .value = `${product.quantity}`;
        cartItemContentSettingsDelete.textContent = "";
        deleteItem.textContent = "Supprimer";


        //Construct the nodes of the elements
        // IMG
        document.querySelector('#cart__items').appendChild(cartItem);
        cartItem.className = "cart__item";
        cartItem.appendChild(cartItemImg);
        cartItemImg.appendChild(img);
        cartItemImg.className = "cart__item__img";

        // DESCRIPTION : NAME - COLOR - PRICE
        cartItem.appendChild(cartItemContent);
        cartItemContent.className = "cart__item__content";
        cartItemContent.appendChild(cartItemContentDescription);
        cartItemContentDescription.className = "cart__item__content__description";
        cartItemContentDescription.appendChild(productName);
        cartItemContentDescription.appendChild(productColor);
        cartItemContentDescription.appendChild(productPrice);

        // SETTINGS : QUANTITY - INPUT QUANTITY
        cartItemContent.appendChild(cartItemContentSettings);
        cartItemContentSettings.className = "cart__item__content__settings";
        cartItemContentSettings.appendChild(cartItemContentSettingsQuantity);
        cartItemContentSettingsQuantity.className = "cart__item__content__settings__quantity";
        cartItemContentSettingsQuantity.appendChild(productQty);
        productQty.appendChild(inputQuantity);
        inputQuantity.className = "itemQuantity";
        inputQuantity.setAttribute("type", "number");
        inputQuantity.setAttribute("min", "1");
        inputQuantity.setAttribute("max", "100");
        inputQuantity.setAttribute("name", "itemQuantity");
        cartItemContentSettingsQuantity.appendChild(inputQuantity);

        //DELETE ITEM
        cartItemContent.appendChild(cartItemContentSettings);
        cartItemContentSettings.appendChild(cartItemContentSettingsDelete);
        cartItemContentSettingsDelete.className = "cart__item__content__settings__delete";
        cartItemContentSettingsDelete.appendChild(deleteItem);
        deleteItem.className = "deleteItem";
        }
    }

    //DISPLAY THE QUANTITY OF PRODUCTS IN THE CART
    let totalQty = totalProductsInCart();
    let totalQuantity = document.querySelector("#totalQuantity");
    totalQuantity.textContent = `${totalQty}`;  

    //DISPLAY THE TOTAL PRICE OF THE PRODUCTS IN THE CART
    let totalPrice = totalPriceProductsInCart(api, cart);
    let totalProducts = document.querySelector("#totalPrice");
    totalProducts.textContent =`${totalPrice}`;  
}

 //--------------------------------------------------------------------
//THIS FUNCTION COUNTS AND RETURN THE TOTAL OF PRODUCTS IN THE CART
function totalProductsInCart() {
    let totalQty = 0;
    
    for (let product of cart) {
        totalQty += product.quantity;
    }
    console.log(totalQty);

    return totalQty;
}   

//--------------------------------------------------------------------
//THIS FUNCTION COUNTS AND RETURN THE TOTAL PRICE OF THE PRODUCTS
function totalPriceProductsInCart(api, cart) {
    let totalPrice = 0;

    for (let product of cart) {

        const dataApi = api.find((element) => element._id == product._id);

        totalPrice += dataApi.price * product.quantity;
    }
    console.log(totalPrice);

    return Intl.NumberFormat('fr-FR').format(totalPrice);
}

//--------------------------------------------------------------------
// function clearCart() {

// }


//--------------------------------------------------------------------
//THIS FUNCTION REMOVES A PRODUCT IN THE CART
function removeProductInCart() {

    const btnRemove = document.querySelectorAll(".deleteItem");
  
    for (let i = 0; i < btnRemove.length; i++) {
  
        btnRemove[i].addEventListener("click", (event) => {
        event.preventDefault();

            if (confirm("Êtes-vous sûr de vouloir supprimer ce produit de votre panier ?")) {
  
                let cartId = cart[i]._id;
                let cartColor = cart[i].color;
  
                let newCart = cart.filter(element => element._id !== cartId || element.color !== cartColor);
  
                localStorage.setItem("allProducts", JSON.stringify(newCart));

                alert("Le produit a bien été supprimé du panier");
  
                window.location.reload();
            }
        })
    }
}

//--------------------------------------------------------------------
//THIS FUNCTION MODIFIES THE QUANTITY VALUE IN THE CART AND IN THE LOCALSTORAGE
function changeItemQty(cart) {

    const itemValue = document.querySelectorAll(".itemQuantity");

        for (let i = 0; i < itemValue.length; i++) {

            itemValue[i].addEventListener("change", () => { 

                let itemQty = itemValue[i].value;
                    console.log(itemQty);

            if (itemQty > 100) {
                alert("Vous ne pouvez pas commander plus de 100 exemplaires d'un produit")
            }

            if (itemQty >= 1 || itemQty <= 100) { 
                const findProductInCart = cart.find(element => {
                    if (element._id === itemValue[i].id && element.color === itemValue[i].colorOption) {
                    return true;
                    }
                    return false;
                }); 

                if (findProductInCart) {
                    // findProductInCart.quantity = parseInt(itemQty);
                    alert("Le produit a bien été ajouté au panier");
                    localStorage.setItem("allProducts", JSON.stringify(cart));
                    window.location.reload();
                }
            }

            if (itemQty < 1) {
                if (confirm("Êtes-vous sûr de vouloir supprimer ce produit de votre panier ?")) {
   
                    let cartId = cart[i]._id;
                    let cartColor = cart[i].color;

                    let newCart = cart.filter(element => element._id !== cartId || element.color !== cartColor);
                    localStorage.setItem("allProducts", JSON.stringify(newCart));
                    alert("Le produit a bien été supprimé du panier");
                    window.location.reload();
                    }
                }
        })
    }
}