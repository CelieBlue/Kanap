//*************   CART    *************

// CREATE GLOBAL VARIABLE CART TO GET THE PRODUCTVALUES IF IT EXISTS IN THE LOCALSTORAGE 
let cart = JSON.parse(localStorage.getItem("allProducts"));
console.log(cart);


window.addEventListener('load', getDataOrder);

// const cartData = localStorage.getItem(localStorage.key(i));
// console.log(cartData);


// const cartItems = document.querySelector("#cart__items");

// FETCH METHOD TO GET THE DATA IN THE API

async function getDataOrder() {
    
    const dataOrder = `http://localhost:3000/api/products`;
    
    await fetch(dataOrder)
    
    .then((response)=> 
        response.json())
    
    .then((product)=> {
        console.log(product);
        showCartProducts(product);
        // localStorage.clear();
    })
    
    .catch(function(error) {
        alert(error);  
    });
}


function showCartProducts() {

    if (cart === null) {
        
        let cartItem = document.createElement('article');
        cartItem.textContent = "Votre panier est vide";
        document.querySelector('#cart__items').appendChild(cartItem);
        cartItem.className = "cart__item";

    } else {

        for (let product of cart) {

            console.log(product._id);

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
        img.src = `${product.imageUrl}`;
        img.alt = `${product.altTxt}`;
        cartItemContent.textContent = "";
        cartItemContentDescription.textContent = "";
        productName.textContent = `${product.name}`;
        productPrice.textContent = `${product.price}`+" €";
        productColor.textContent = `${product.color}`;
        cartItemContentSettings.textContent = "";
        cartItemContentSettingsQuantity.textContent = "";
        productQty.textContent = 'Qté :';
        // inputQuantity.setAttribute = product.quantity;
        inputQuantity.type = "number";
        inputQuantity.classList.add("itemQuantity");
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

        // // DELETE ITEM
        cartItemContent.appendChild(cartItemContentSettings);
        cartItemContentSettings.appendChild(cartItemContentSettingsDelete);
        cartItemContentSettingsDelete.className = "cart__item__content__settings__delete";
        cartItemContentSettingsDelete.appendChild(deleteItem);
        }
    }
}

// getDataOrder();
// showCartProducts();
