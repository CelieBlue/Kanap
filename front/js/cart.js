// CREATE GLOBAL VARIABLE CART TO GET THE PRODUCTVALUES IF IT EXISTS IN THE LOCALSTORAGE 
let cart = JSON.parse(localStorage.getItem("allProducts"));

function saveCart() {
    localStorage.setItem("allProducts", JSON.stringify(cart));
}

const productPrices = {};

function storeProductsPrices(apiProducts) {
    for (let product of apiProducts) {
        productPrices[product._id] = product.price;
    }
}

function emptyCart() {
    const cartItem = document.createElement('article');
    cartItem.textContent = "Votre panier est vide";
    document.querySelector('#cart__items').appendChild(cartItem);
    cartItem.className = "cart__item";

    const contactForm = document.querySelector('.cart__order');
    contactForm.style.display = "none";

    const cartPrice = document.querySelector('.cart__price');
    cartPrice.style.display = "none";
}

/*Condition 1: Remove the form when the basket is empty
Condition 2: Call the getDataOrder to display the products of the cart*/
if (cart === null || cart.length === 0) {
    emptyCart();
} else {
    getDataOrder();
    /*The sort() function sorts the products by their id
    The localeCompare() function is used to sort on strings*/
    cart.sort((a, b) => a._id.localeCompare(b._id));
}

// FETCH METHOD TO GET THE DATA OF THE API AND THE LOCALSTORAGE
async function getDataOrder() {

    const dataOrder = `http://localhost:3000/api/products`;
    await fetch(dataOrder)
        .then((response) =>
            response.json())
        .then(function (value) {

            let api = value;

            saveCart();
            storeProductsPrices(api);
            showCartProducts(api, cart);
            totalProductsInCart();
            totalPriceProductsInCart();
            removeProductInCart();
            modifyItemQty();
            postForm();
        })
        .catch(function (error) {
            alert(error);
        });
}
//--------------------------------------------------------------------
/* THIS FONCTION DISPLAY THE PRODUCTS IN THE CART
WITH THE INFORMATIONS OF EACH PRODUCTS COMING FROM
THE DATA API (name, price, description) AND THE LOCALSTORAGE (id, color, quantity)*/
function showCartProducts(api) {

    for (let product of cart) {

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

        /*Inject the API data (dataApi) and localStorage data 
        (product.color & quantity) in the elements */
        cartItem.textContent = "";
        cartItemImg.textContent = "";
        img.src = dataApi.imageUrl;
        img.alt = dataApi.altTxt;
        cartItemContent.textContent = "";
        cartItemContentDescription.textContent = "";
        productName.textContent = dataApi.name;
        productPrice.textContent = Intl.NumberFormat('fr-FR').format(dataApi.price) + " €";
        productColor.textContent = `${product.color}`;
        cartItemContentSettings.textContent = "";
        cartItemContentSettingsQuantity.textContent = "";
        productQty.textContent = 'Qté :';
        inputQuantity.type = "number";
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
//--------------------------------------------------------------------
//THIS FUNCTION COUNTS AND RETURN THE TOTAL PRODUCTS IN THE CART
function totalProductsInCart() {
    let totalQty = 0;

    for (let product of cart) {
        totalQty += product.quantity;
    }

    //DISPLAY THE TOTAL QUANTITY OF PRODUCTS IN THE CART
    const totalQuantity = document.querySelector("#totalQuantity");
    totalQuantity.textContent = totalQty;
}
//--------------------------------------------------------------------
//THIS FUNCTION COUNTS AND RETURN THE TOTAL PRICE OF THE PRODUCTS
function totalPriceProductsInCart() {
    let totalPrice = 0;

    for (const product of cart) {
        const productPrice = productPrices[product._id];
        totalPrice += productPrice * product.quantity;
    }
    //DISPLAY THE TOTAL PRICE OF THE PRODUCTS IN THE CART
    const totalPriceProducts = document.querySelector("#totalPrice");
    totalPriceProducts.textContent = Intl.NumberFormat('fr-FR').format(totalPrice);
}
//--------------------------------------------------------------------
//THIS FUNCTION REMOVES A PRODUCT IN THE CART WITH THE FILTER() METHOD
function removeProductInCart() {

    const btnRemove = document.querySelectorAll(".deleteItem");

    for (let i = 0; i < btnRemove.length; i++) {

        btnRemove[i].addEventListener("click", (event) => {
            event.preventDefault();
            
            if (confirm("Êtes-vous sûr de vouloir supprimer ce produit de votre panier ?")) {
                //The closest() method find the parent of the input: article
                const closestArticle = event.target.closest("article");

                //The dataset propriety accesses the values of the attribute id or color 
                const targetProductId = closestArticle.dataset.id;
                const targetProductColor = closestArticle.dataset.color;

                // the filter() method find and delete the element with the same color and the same id in the localStorage
                cart = cart.filter(element => element._id !== targetProductId || element.color !== targetProductColor);
                alert("Le produit a bien été supprimé du panier");
                if (cart === 0 || cart.length === 0) {
                    // The remove() method remove the product from the DOM
                    closestArticle.remove();
                    totalProductsInCart();
                    totalPriceProductsInCart(cart);
                    saveCart();
                    emptyCart();
                } else {
                    // The remove() method remove the product from the DOM
                    closestArticle.remove();
                    totalProductsInCart();
                    totalPriceProductsInCart(cart);
                    saveCart();
                }
            }
        });
    }
}
// --------------------------------------------------------------------
/* THIS FUNCTION MODIFIES THE QUANTITY VALUE IN THE CART AND IN THE LOCALSTORAGE
IF THE QUANTITY VALUE IS NEGATIVE, THE PRODUCT IS REMOVED*/
function modifyItemQty() {

    let itemValue = document.querySelectorAll(".itemQuantity");

    for (let i = 0; i < itemValue.length; i++) {

        itemValue[i].addEventListener("change", (event) => {
            event.preventDefault();

            let itemQty = Number(event.target.value);

            let verifyQuantity = () => {
                if (itemQty < 1) {
                    alert("Entrez une quantité entre 1 et 100");
                    return false;
                } else if (itemQty > 100) {
                    alert("Vous ne pouvez pas commander plus de 100 exemplaires du même produit");
                    return false;
                } else {
                    return itemQty;
                }
            };

            if (itemQty < 1 || itemQty >= 100) {
                verifyQuantity();

            } else {
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
                totalProductsInCart();
                totalPriceProductsInCart(cart);
                saveCart();
            }
        });
    }
}
modifyItemQty();
//========================================== F O R M ===========================================
//THIS FUNCTION CHECKS THE VALIDITY OF THE FORM DATA
function postForm() {

        const form = document.querySelector(".cart__order__form");

        // VERIF FIRSTNAME ----------------------------------------------------------
        let firstName = document.querySelector("#firstName");

        //Listen the value of the firsName field - RegExp to verify if firstName is validate
        form.firstName.addEventListener("change", function () {
            validFirstName(firstName);
        });

        const validFirstName = function (inputFirstName) {
            //RegExp to validate first name
            let firstNameRegExp = new RegExp(
                "^[a-zA-ZáàâäãåçéèêëíìîïñóòôöõúùûüýÿæœÁÀÂÄÃÅÇÉÈÊËÍÌÎÏÑÓÒÔÖÕÚÙÛÜÝŸÆŒ,.' -]{2,50}$"
            );

            let firstNameErrorMsg = inputFirstName.nextElementSibling;

            if (firstNameRegExp.test(inputFirstName.value)) {
                firstNameErrorMsg.innerHTML = 'Format de prénom valide';
                firstNameErrorMsg.style.color = '';
                return true;
            } else {
                firstNameErrorMsg.innerHTML = 'Format de prénom non valide';
                firstNameErrorMsg.style.color = 'red';
                return false;
            }
        };

        // VERIF LASTNAME ----------------------------------------------------------
        let lastName = document.querySelector("#lastName");

        //Listen the value of the lastName field - RegExp to verify if firstName is validate
        form.lastName.addEventListener("change", function () {
            validLastName(lastName);
        });

        const validLastName = function (inputLastName) {
            //RegExp to validate last name
            let lastNameRegExp = new RegExp(
                "^[a-zA-ZáàâäãåçéèêëíìîïñóòôöõúùûüýÿæœÁÀÂÄÃÅÇÉÈÊËÍÌÎÏÑÓÒÔÖÕÚÙÛÜÝŸÆŒ,.' -]{2,50}$"
            );

            let lastNameErrorMsg = inputLastName.nextElementSibling;

            if (lastNameRegExp.test(inputLastName.value)) {
                lastNameErrorMsg.innerHTML = 'Format de nom valide';
                lastNameErrorMsg.style.color = '';
                return true;
            } else {
                lastNameErrorMsg.innerHTML = 'Format de nom non valide';
                lastNameErrorMsg.classList.remove('text-success');
                lastNameErrorMsg.style.color = 'red';
                return false;
            }
        };

        // VERIF ADRESSE ----------------------------------------------------------
        let address = document.querySelector("#address");

        //Listen the value of the firsName field - RegExp to verify if firstName is validate
        form.address.addEventListener("change", function () {
            validAddress(address);
        });

        const validAddress = function (inputAddress) {
            //RegExp to validate Adresse
            let addressRegExp = new RegExp(
                "^[a-zA-Z0-9áàâäãåçéèêëíìîïñóòôöõúùûüýÿæœÁÀÂÄÃÅÇÉÈÊËÍÌÎÏÑÓÒÔÖÕÚÙÛÜÝŸÆŒ,.' -]{5,100}$"
            );

            let addressErrorMsg = inputAddress.nextElementSibling;

            if (addressRegExp.test(inputAddress.value)) {
                addressErrorMsg.innerHTML = 'Adresse valide';
                addressErrorMsg.style.color = '';
                return true;
            } else {
                addressErrorMsg.innerHTML = 'Format adresse non valide';
                addressErrorMsg.style.color = 'red';
                return false;
            }
        };

        // VERIF CITY ----------------------------------------------------------
        let city = document.querySelector("#city");

        //Listen the value of the firsName field - RegExp to verify if firstName is validate
        form.city.addEventListener("change", function () {
            validCity(city);
        });

        const validCity = function (inputCity) {
            //RegExp to validate City
            let cityRegExp = new RegExp(
                "^[a-zA-Z0-9áàâäãåçéèêëíìîïñóòôöõúùûüýÿæœÁÀÂÄÃÅÇÉÈÊËÍÌÎÏÑÓÒÔÖÕÚÙÛÜÝŸÆŒ,.' -]{2,50}$"
            );

            let cityErrorMsg = inputCity.nextElementSibling;

            if (cityRegExp.test(inputCity.value)) {
                cityErrorMsg.innerHTML = 'Ville valide';
                cityErrorMsg.style.color = '';
                return true;
            } else {
                cityErrorMsg.innerHTML = 'Format de ville non valide';
                cityErrorMsg.style.color = 'red';
                return false;
            }
        };

        // VERIF EMAIL ----------------------------------------------------------
        let email = document.querySelector("#email");

        //Listen the value of the Email field - RegExp to verify if EMAIL is validate
        form.email.addEventListener("change", function () {
            validEmail(email);
        });

        const validEmail = function (inputEmail) {
            //RegExp to validate email
            let emailRegExp = new RegExp(
                 "^[a-zA-Z]+[a-z-A-Z.-_\d]+?@[a-zA-Z]+.[a-z]{2,4}$"
            );

            let emailErrorMsg = inputEmail.nextElementSibling;

            if (emailRegExp.test(inputEmail.value)) {
                emailErrorMsg.innerHTML = 'Adresse email valide';
                emailErrorMsg.style.color = '';
                return true;
            } else {
                emailErrorMsg.innerHTML = 'Format adresse email non valide';
                emailErrorMsg.style.color = 'red';
                return false;
            }
    }

/*CHECKS THE FORM VALUES TO POST THEM IN THE LOCALSTORAGE
/*PUT AN ADDEVENTLISTNER TO LISTEN WHEN THE ORDER BUTTON IS CLICKED */

    const btnform = document.querySelector("form");

    btnform.addEventListener("submit", (event) => {
        event.preventDefault();

        if (validFirstName(firstName) == false) {
                alert(" Veuillez saisir un Prénom sans nombres, ni caractères spéciaux, de 2 caractères minimum");
            }
        else if (validLastName(lastName) == false) {
                alert("Veuillez saisir un Nom sans nombres, ni caractères spéciaux, de 2 caractères minimum");
            }
        else if (validAddress(address) == false) {
                alert("Veuillez saisir une adresse valide de 5 lettres minimum");
            }
        else if (validCity(city) == false) {
                alert("Veuillez saisir une Ville et/ou un code postal valide. Les caractères spéciaux ne sont pas autorisés");
            }
        else if (validEmail(email) == false) {
                alert("Veuillez entrer une adresse email valide. Ex.: Dupont@domaine.com");
            }
        else {
        
        let inputFirstName = document.querySelector("#firstName");
        let inputLastName = document.querySelector("#lastName");
        let inputAddress = document.querySelector("#address");
        let inputCity = document.querySelector("#city");
        let inputEmail = document.querySelector("#email");

       
        let newCart = [];

        for (let product of cart) {
            newCart.push(product._id);
        }
        console.log(newCart);

        const order = {
            contact: {
                firstName: inputFirstName.value,
                lastName: inputLastName.value,
                address: inputAddress.value,
                city: inputCity.value,
                email: inputEmail.value
            },
            products: newCart,
        };

        const postInfos = {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                "Content-type": 'application/json'
            },
            body: JSON.stringify(order),
        };

        fetch("http://localhost:3000/api/products/order", postInfos)
            .then((response) => response.json())
            .then((orderData) => {
                localStorage.clear();
                document.location.href = "confirmation.html?orderId=" + orderData.orderId;
            })
            .catch(error => { console.log(error); });
        }
    })
}
