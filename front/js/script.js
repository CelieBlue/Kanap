/**
 * Send a request to the local API of products with Fetch()
 * if response -> return JSON
 * Send products in the page
 */

let url = `http://localhost:3000/api/products`;

fetch(url)
    .then(response => 
        response.json())
    
    .then(products => {
        console.log(products);


        for (let product of products) {

        let newLink = document.createElement('a');
        let newArticle = document.createElement('article');
        const newURL = "http://localhost:3000/images/";
        let img = document.createElement('img');
        let newName = document.createElement('h3');
        let newDescription = document.createElement('p');

        newLink.textContent = "";
        newArticle.textContent = "";
        img.src = product.imageUrl;
        img.alt = product.altTxt;
        newName.textContent = product.name;
        newDescription.textContent = product.description;

        console.log(newName);

        document.querySelector('#items').appendChild(newLink);
        newLink.appendChild(newArticle);
        newArticle.appendChild(img);
        newArticle.appendChild(newName);
        newArticle.appendChild(newDescription);
        }
    })
    
    .catch(function(error) {
        alert(error);
    });