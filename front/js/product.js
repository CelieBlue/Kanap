/*Find the "id" of the article with window.location.search
* and get it with URLSearchParams 
*/

 const idProduct = window.location.search;
 const urlParams = new URLSearchParams(idProduct);
 const id = urlParams.get("id");
 console.log({id});

 const coloris = document.querySelector('#colors');


// function getProductId() {
//     return new URL(location.href).searchParams.get("id");
// }


async function getDataProduct(_dataProduct) {
    
    const dataProduct = `http://localhost:3000/api/products/${id}`;
    
    await fetch(dataProduct)
    
    .then((response)=> 
        response.json())
    
    .then((product)=> {
        console.log(product);
        showDataProduct(product);
    })
    
    .catch(function(error) {
        alert(error);
    });
}


function showDataProduct(product) {

    //Select the elements in the div "Article"     

    let imgURL = "http://localhost:3000/images/";
    let img = document.createElement("img");
    document.querySelector('.item__img').appendChild(img);
    let title = document.querySelector('#title');
    let price = document.querySelector('#price')
    let description = document.querySelector('#description');
    

    //Put the value of the API in the element

    img.src = product.imageUrl;
    img.alt = product.altTxt;
    title.textContent = product.name;
    price.textContent = product.price;
    description.textContent = product.description;


    // Select the option value of the color

    for (let color of product.colors) {

        console.log(color);

        let colorOption = document.createElement("option");
        document.querySelector("#colors").appendChild(colorOption);
        // colorOption.value = product.colors;
        colorOption.textContent = color;
    }
    
};

getDataProduct();
        
       