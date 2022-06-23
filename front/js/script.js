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
        console.log(products);

        for (let product of products) {

        const newLink = document.createElement('a');
        const newArticle = document.createElement('article');
        const newURL = "http://localhost:3000/images/";
        const img = document.createElement('img');
        const newName = document.createElement('h3');
        const newDescription = document.createElement('p');

        newLink.setAttribute("href", "./product.html");
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
        
        let newLocation = window.location;
        newLocation = product._id;
        console.log(newLocation);
        }

        


        let linkProducts = document.querySelectorAll('#items a');
        // console.log(linkProducts);

        for (let linkProduct of linkProducts) {
            document.addEventListener('click', () => {
                console.log(linkProducts);

                window.location = `product.html?${linkProducts._id}`;
            })
        }
        
    })
    
    .catch(function(error) {
        alert(error);
    });

    
    
    


   