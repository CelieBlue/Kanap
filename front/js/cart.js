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
        modifyItemQty(cart);
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

        const cartPrice = document.querySelector('.cart__price');
        cartPrice.style.display="none";

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
        inputQuantity.value = `${product.quantity}`;
        cartItemContentSettingsDelete.textContent = "";
        deleteItem.textContent = "Supprimer";


        //Construct the nodes of the elements
        // IMG
        document.querySelector('#cart__items').appendChild(cartItem);
        cartItem.className = "cart__item";
        cartItem.dataset.id = product._id;
        cartItem.dataset.color = product.color;
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

    //DISPLAY THE TOTAL QUANTITY OF PRODUCTS IN THE CART
    let totalQty = totalProductsInCart();
    let totalQuantity = document.querySelector("#totalQuantity");
    totalQuantity.textContent = `${totalQty}`;

    //DISPLAY THE TOTAL PRICE OF THE PRODUCTS IN THE CART
    let totalPrice = totalPriceProductsInCart(api, cart);
    let totalProducts = document.querySelector("#totalPrice");
    totalProducts.textContent =`${totalPrice}`;  
}

//--------------------------------------------------------------------
//THIS FUNCTION COUNTS AND RETURN THE TOTAL PRODUCTS IN THE CART
function totalProductsInCart() {
    let totalQty = 0;
    
    for (let product of cart) {
        totalQty += product.quantity;
    }
    console.log("Total de produits dans le panier : " + totalQty);

    return totalQty;
}   

//--------------------------------------------------------------------
//THIS FUNCTION COUNTS AND RETURN THE TOTAL PRICE OF THE PRODUCTS
function totalPriceProductsInCart(api, cart) {
    let totalPrice = 0;

    for (let product of cart) {


        // the find() method search an element with the same color and the same id
        const dataApi = api.find((element) => element._id == product._id);

        totalPrice += dataApi.price * product.quantity;
    }
    console.log("Prix total des produits : " + totalPrice);

    return Intl.NumberFormat('fr-FR').format(totalPrice);
}

//--------------------------------------------------------------------
// function clearCart() {

// }


//--------------------------------------------------------------------
//THIS FUNCTION REMOVES A PRODUCT IN THE CART WITH THE FILTER() METHOD
function removeProductInCart() {

    const btnRemove = document.querySelectorAll(".deleteItem");
  
    for (let i = 0; i < btnRemove.length; i++) {
  
        btnRemove[i].addEventListener("click", (event) => {
        event.preventDefault();

            if (confirm("Êtes-vous sûr de vouloir supprimer ce produit de votre panier ?")) {
  
                let cartId = cart[i]._id;
                let cartColor = cart[i].color;

                // the filter() method find and delete the element with the same color and the same id
                let newCart = cart.filter(element => element._id !== cartId || element.color !== cartColor);
  
                localStorage.setItem("allProducts", JSON.stringify(newCart));

                alert("Le produit a bien été supprimé du panier");
  
                window.location.reload();
            }
        })
    }
}

// --------------------------------------------------------------------
/* THIS FUNCTION MODIFIES THE QUANTITY VALUE IN THE CART AND IN THE LOCALSTORAGE
IF THE QUANTITY VALUE IS NEGATIVE, THE PRODUCT IS REMOVED*/
function modifyItemQty(cart) {

    let itemValue = document.querySelectorAll(".itemQuantity");

        for (let i = 0; i < itemValue.length; i++) {

            itemValue[i].addEventListener("change", (event) => { 
                event.preventDefault();

                let itemQty = Number(itemValue[i].value);
                    console.log(itemQty);

            if (itemQty > 100) {
                alert("Vous ne pouvez pas commander plus de 100 exemplaires d'un produit")
            }

            if (itemQty >= 1 || itemQty <= 100) { 

                //The closest() method find the parent of the input: article
                const closestArticle = itemValue[i].closest("article");

                //The dataset propriety accesses the values of the attribute id or color 
                const targetProductId = closestArticle.dataset.id;
                const targetProductColor = closestArticle.dataset.color;

                // the find() method search an element with the same color and the same id
                const findProductInCart = cart.find(element => {
                    return element._id === targetProductId && element.color === targetProductColor;
                });

                findProductInCart.quantity = itemQty;

                localStorage.setItem("allProducts", JSON.stringify(cart));
                       
                window.location.reload();
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
};
modifyItemQty();


//=================================== F O R M U L A I R E ==============================

// VERIF FIRSTNAME ----------------------------------------------------------
let formFirstName = document.querySelector("#firstName");

//Listen the value of the firsName field - RegExp to verify if firstName is validate
formFirstName.addEventListener("change", function() {
    validFirstName(formFirstName);
});

const validFirstName = function(inputFirstName) {
    //RegExp to validate first name
    let firstNameRegExp = new RegExp(
        '^(?=.{1,64}@)[A-Za-z0-9_-]+(\\.[A-Za-z0-9_-]+)*@[^-][A-Za-z0-9-]+(\\.[A-Za-z0-9-]+)*(\\.[A-Za-z]{2,})$, g'
    );

    let testFirstName = firstNameRegExp.test(inputFirstName.value);
    let emailErrorMsg = inputEmail.nextElementSibling;

    if(testEmail) {
        emailErrorMsg.innerHTML = "Adresse email valide";
        emailErrorMsg.classList.remove('text-alert');
        emailErrorMsg.classList.add('text-success');
    } else {
        emailErrorMsg.innerHTML = "Format d'adresse email non valide";
        emailErrorMsg.classList.remove('text-success');
        emailErrorMsg.classList.add('text-alert');
    }

    console.log(testEmail);

}

// VERIF LASTNAME ----------------------------------------------------------
let formLastName = document.querySelector("#lastName");

//Listen the value of the firsName field - RegExp to verify if firstName is validate
formLastName.addEventListener("change", function() {
    validLastName(formLastName);
});

const validlLstName = function() {

}

// VERIF ADRESSE ----------------------------------------------------------
let formAdress = document.querySelector("#address");

//Listen the value of the firsName field - RegExp to verify if firstName is validate
formAdress.addEventListener("change", function() {
    validAddress(formAdress);
});

const validAddress= function() {

}

// VERIF CITY ----------------------------------------------------------
let formCity = document.querySelector("#address");

//Listen the value of the firsName field - RegExp to verify if firstName is validate
formCity.addEventListener("change", function() {
    validCity(formCity);
});

const validCity= function() {

}

// VERIF EMAIL ----------------------------------------------------------
let formEmail = document.querySelector("#email");

console.log(formEmail);

//Listen the value of the Email field - RegExp to verify if EMAIL is validate
formEmail.addEventListener("change", function() {
    validEmail(formEmail);
});

const validEmail = function(inputEmail) {
    //RegExp to validate email
    let emailRegExp = new RegExp(
        '^(?=.{1,64}@)[A-Za-z0-9_-]+(\\.[A-Za-z0-9_-]+)*@[^-][A-Za-z0-9-]+(\\.[A-Za-z0-9-]+)*(\\.[A-Za-z]{2,})$, g'
    );

    let testEmail = emailRegExp.test(inputEmail.value);
    let emailErrorMsg = inputEmail.nextElementSibling;

    if(testEmail) {
        emailErrorMsg.innerHTML = "Adresse email valide";
        emailErrorMsg.classList.remove('text-alert');
        emailErrorMsg.classList.add('text-success');
    } else {
        emailErrorMsg.innerHTML = "Format d'adresse email non valide";
        emailErrorMsg.classList.remove('text-success');
        emailErrorMsg.classList.add('text-alert');
    }

    console.log(testEmail);
};


 




