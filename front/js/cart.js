//*************   CART    *************/

// CREATE GLOBAL VARIABLE CART TO GET THE PRODUCTVALUES IF IT EXISTS IN THE LOCALSTORAGE 
let cart = JSON.parse(localStorage.getItem("allProducts"));

//FETCH METHOD TO GET THE DATA IN THE API

async function getDataOrder(_orderProducts) {
    
    const dataOrder = `http://localhost:3000/api/products/`;
    
    await fetch(dataOrder)
    
    .then((response)=> 
        response.json())
    
    .then((orderProducts)=> {
        console.log(orderProducts);
        showOrderProducts(orderProducts);
        // localStorage.clear();
    })
    
    .catch(function(error) {
        alert(error);
    });
}


function showOrderProducts(orderProducts) {

    for (let product of orderProducts) {
    
    //Create all the elements in the section "cart__Items"    

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
    let itemQuantity = document.createElement('p');
    let cartItemContentSettingsDelete = document.createElement('div');
    let deleteItem = document.createElement('p');


    //Inject the API data in the elements

    cartItem.textContent = "";
    cartItemImg.textContent = "";
    img.src = product.imageUrl;
    img.alt = product.altTxt;
    cartItemContent.textContent = "";
    cartItemContentDescription.textContent = "";
    productName.textContent = product.name;
    productPrice.textContent = product.price+" €";
    // productColor.textContent = product.color;
    productColor.textContent = `${cart.color}`;
    cartItemContentSettings.textContent = "";
    cartItemContentSettingsQuantity.textContent = "";
    productQty.textContent = product.quantity;
    itemQuantity.textContent = product.itemQty;
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
    productQty.className = "itemQuantity";
    productQty.setAttribute("type", "number");
    productQty.setAttribute("min", "1");
    productQty.setAttribute("max", "100");
    productQty.setAttribute("name", "itemQuantity");
    cartItemContentSettingsQuantity.appendChild(itemQuantity);

    // // DELETE ITEM
    // cartItemContent.appendChild(cartItemContentSettings);
    cartItemContentSettings.appendChild(cartItemContentSettingsDelete);
    cartItemContentSettingsDelete.className = "cart__item__content__settings__delete";
    cartItemContentSettingsDelete.appendChild(deleteItem);
    }
}

getDataOrder();

