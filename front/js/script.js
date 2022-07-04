/**
 * Send a request to the local API of products with Fetch()
 * if response -> return data in javaScript .JSON
 * Second promise "products" -> return data in "Products"
 */

function getProducts(products) {

const urlProducts = `http://localhost:3000/api/products`;

fetch(urlProducts)
    .then(response =>
         response.json())
    
    .then(products => {
        console.table(products);
        showProducts(products);

    })
    
    .catch(function(error) {
        alert(error);
    });
}

function showProducts(products) {

        for (let product of products) {
        
        //Create all the elements in the section "Items"    

        let newLink = document.createElement('a');
        let newArticle = document.createElement('article');
        let newURL = "http://localhost:3000/images/";
        let img = document.createElement('img');
        let newName = document.createElement('h3');
        let newDescription = document.createElement('p');

        //Inject the API data in the elements

        newLink.href = `./product.html?id=${product._id}`;
        console.log(newLink.href);
        newArticle.textContent = "";
        img.src = product.imageUrl;
        img.alt = product.altTxt;
        newName.textContent = product.name;
        newDescription.textContent = product.description;

        //Construct the nodes of the elements

        document.querySelector('#items').appendChild(newLink);
        newLink.appendChild(newArticle);
        newArticle.appendChild(img);
        newArticle.appendChild(newName);
        newArticle.appendChild(newDescription);

        }
    }

    getProducts();
    showProducts();

    
    
    


   