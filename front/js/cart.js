// CREATE GLOBAL VARIABLE CART TO GET THE PRODUCTVALUES IF IT EXISTS IN THE LOCALSTORAGE 
let cart = JSON.parse(localStorage.getItem("allProducts"));

//This condition display a message when the card is empty
if (cart === null) {

    const cartItem = document.createElement('article');
    cartItem.textContent = "Votre panier est vide";
    document.querySelector('#cart__items').appendChild(cartItem);
    cartItem.className = "cart__item";

    const contactForm = document.querySelector('.cart__order');
    contactForm.style.display = "none";

    const cartPrice = document.querySelector('.cart__price');
    cartPrice.style.display = "none";

} else {
    getDataOrder();
}


// FETCH METHOD TO GET THE DATA OF THE API AND THE LOCALSTORAGE
async function getDataOrder() {

    const dataOrder = `http://localhost:3000/api/products`;

    await fetch(dataOrder)

        .then((response) =>
            response.json())

        .then(function (value) {

            let api = value;

            showCartProducts(api, cart);
            totalProductsInCart();
            totalPriceProductsInCart(api, cart);
            removeProductInCart();
            modifyItemQty(cart);
            getForm(cart);
            // postForm(cart);
        })

        .catch(function (error) {
            alert(error);
        });
}
//--------------------------------------------------------------------
/* THIS FONCTION DISPLAY THE PRODUCTS IN THE CART
WITH THE INFORMATIONS OF EACH PRODUCTS COMING FROM
THE DATA API AND THE LOCALSTORAGE*/
function showCartProducts(api, cart) {

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
            productPrice.textContent = Intl.NumberFormat('fr-FR').format(dataApi.price) + " €";
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
    totalProducts.textContent = `${totalPrice}`;


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
        });
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
                alert("Vous ne pouvez pas commander plus de 100 exemplaires d'un produit");
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
        });
    }
}
modifyItemQty();


//=================================== F O R M U L A I R E ==============================
//THIS FUNCTION CHECKS THE VALIDITY OF THE FORM DATA
function getForm(cart) {

    if (cart === null) {
        alert("Votre panier est vide. Veuillez ajouter un produit.");
    }
    else {

        const form = document.querySelector("cart__order__form");
        console.log(form);


        // VERIF FIRSTNAME ----------------------------------------------------------
        let firstName = document.querySelector("#firstName");

        console.log(firstName);

        //Listen the value of the firsName field - RegExp to verify if firstName is validate
        firstName.addEventListener("change", function () {
            validFirstName(firstName);
        });

        const validFirstName = function (inputFirstName) {
            //RegExp to validate first name
            let firstNameRegExp = new RegExp(
                '^[a-zA-Z,.\'-]{2,50}$'
            );

            let testFirstName = firstNameRegExp.test(inputFirstName.value);
            let firstNameErrorMsg = inputFirstName.nextElementSibling;

            if (testFirstName) {
                firstNameErrorMsg.innerHTML = "Format de prénom valide";
                firstNameErrorMsg.classList.remove('text-alert');
                firstNameErrorMsg.classList.add('text-success');
            } else {
                firstNameErrorMsg.innerHTML = "Format de prénom non valide";
                firstNameErrorMsg.classList.remove('text-success');
                firstNameErrorMsg.classList.add('text-alert');
            }

            console.log(firstName);
        };


        // VERIF LASTNAME ----------------------------------------------------------
        let lastName = document.querySelector("#lastName");

        console.log(lastName);

        //Listen the value of the lastName field - RegExp to verify if firstName is validate
        lastName.addEventListener("change", function () {
            validLastName(lastName);
        });

        const validLastName = function (inputLastName) {
            //RegExp to validate last name
            let lastNameRegExp = new RegExp(
                '^[a-zA-Z,.\'-]{2,50}$'
            );

            let testLastName = lastNameRegExp.test(inputLastName.value);
            let lastNameErrorMsg = inputLastName.nextElementSibling;

            if (testLastName) {
                lastNameErrorMsg.innerHTML = "Format de nom valide";
                lastNameErrorMsg.classList.remove('text-alert');
                lastNameErrorMsg.classList.add('text-success');
            } else {
                lastNameErrorMsg.innerHTML = "Format de nom non valide";
                lastNameErrorMsg.classList.remove('text-success');
                lastNameErrorMsg.classList.add('text-alert');
            }

            console.log(testLastName);
        };

        // VERIF ADRESSE ----------------------------------------------------------
        let address = document.querySelector("#address");

        console.log(address);

        //Listen the value of the firsName field - RegExp to verify if firstName is validate
        address.addEventListener("change", function () {
            validAddress(address);
        });

        const validAddress = function (inputAddress) {
            //RegExp to validate Adresse
            let addressRegExp = new RegExp(
                '^[a-zA-Z0-9\',.-]{2,50}$'
            );

            let testAddress = addressRegExp.test(inputAddress.value);
            let addressErrorMsg = inputAddress.nextElementSibling;

            if (testAddress) {
                addressErrorMsg.innerHTML = "Adresse valide";
                addressErrorMsg.classList.remove('text-alert');
                addressErrorMsg.classList.add('text-success');
            } else {
                addressErrorMsg.innerHTML = "Format d'adresse non valide";
                addressErrorMsg.classList.remove('text-success');
                addressErrorMsg.classList.add('text-alert');
            }

            console.log(testAddress);
        };

        // VERIF CITY ----------------------------------------------------------
        let city = document.querySelector("#city");

        console.log(city);

        //Listen the value of the firsName field - RegExp to verify if firstName is validate
        city.addEventListener("change", function () {
            validCity(city);
        });

        const validCity = function (inputCity) {
            //RegExp to validate City
            let cityRegExp = new RegExp(
                '^[a-zA-Z,.\'-]{2,50}$'
            );

            let testCity = cityRegExp.test(inputCity.value);
            let cityErrorMsg = inputCity.nextElementSibling;

            if (testCity) {
                cityErrorMsg.innerHTML = "Ville valide";
                cityErrorMsg.classList.remove('text-alert');
                cityErrorMsg.classList.add('text-success');
            } else {
                cityErrorMsg.innerHTML = "Format de ville non valide";
                cityErrorMsg.classList.remove('text-success');
                cityErrorMsg.classList.add('text-alert');
            }

            console.log(testCity);
        };

        // VERIF EMAIL ----------------------------------------------------------
        let email = document.querySelector("#email");

        console.log(email);

        //Listen the value of the Email field - RegExp to verify if EMAIL is validate
        email.addEventListener("change", function () {
            validEmail(email);
        });

        const validEmail = function (inputEmail) {
            //RegExp to validate email
            const emailRegExp = '^[a-zA-Z]+[a-z-A-Z.-_\d]+?@[a-zA-Z]+\.[a-z]{2,4}$';

            let testEmail = emailRegExp.test(inputEmail.value);
            let emailErrorMsg = inputEmail.nextElementSibling;

            if (testEmail) {
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
    }
}
getForm();

/*THIS FUNCTION CHECKS THE FORM VALUES TO POST THEM IN THE LOCALSTORAGE
/*PUT AN ADDEVENTLISTNER TO LISTEN WHEN THE ORDER BUTTON IS CLICKED */
function postForm() {

    const form = document.querySelector("form");


    form.addEventListener("submit", (event) => {
        event.preventDefault();

        let inputFirstName = document.querySelector("#firstName");
        let inputLastName = document.querySelector("#lastName");
        let inputAddress = document.querySelector("#address");
        let inputCity = document.querySelector("#city");
        let inputEmail = document.querySelector("#email");

        //new cart to store the products of the cart
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
    );
}
postForm();