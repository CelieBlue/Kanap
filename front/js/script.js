/**
 * Send a request to the local API of products with Fetch()
 * if response -> return JSON
 * Send products in the page
 */

const urlProducts = `http://localhost:3000/api/products`;

fetch(urlProducts)
    .then(response =>
         response.json())
    
    .then(products => {
        console.table(products);

        for (let product of products) {
        
        const newLink = document.createElement('a');
        const newArticle = document.createElement('article');
        const newURL = "http://localhost:3000/images/";
        const img = document.createElement('img');
        const newName = document.createElement('h3');
        const newDescription = document.createElement('p');

        // newLink.href = `product.html?id=${products[product]._id}`;
        // newLink.setAttribute("href", "./product.html?id=${product._id}");
        newArticle.textContent = "";
        img.src = product.imageUrl;
        img.alt = product.altTxt;
        newName.textContent = product.name;
        newDescription.textContent = product.description;

        // console.log(newName);

        document.querySelector('#items').appendChild(newLink);
        newLink.appendChild(newArticle);
        newArticle.appendChild(img);
        newArticle.appendChild(newName);
        newArticle.appendChild(newDescription);

        
        // for (let linkProduct of linkProducts) {
        //     let oneProduct = linkProducts[linkProduct];
        //     oneProduct.addEventListener('click', () => {
        //         // console.log(linkProducts);

        //         window.location   = `product.html?${linkProducts._id}`;
        //     })
        // }  

        // let newLocation = window.location;
        // newLocation = product._id;
        // console.log(newLocation);
        }
    })
    
    .catch(function(error) {
        alert(error);
    });

    
    
    


   