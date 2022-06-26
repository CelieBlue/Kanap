const urlProduct = `http://localhost:3000/api/products`;

fetch(urlProduct)
    .then(response =>
         response.json())
    
    .then(product => {
        console.table(product);

        let linkProducts = document.querySelectorAll('#items a');
        console.log(linkProducts);


        // let searchParams = new URLSearchParams(window.location.search);

        // if (searchParams.has('_id')) {
        //     let productId = searchParams.get('_id');
        //     console.log(productId);
        //     let value = searchParams.get(productId)
        //     console.log(value)
        // } else {
        //     console.log("ça marche pas !!")
        // }

        // } else {
        //     window.location.pathname = "./product.html";
        // }
        // console.log();
    
        
      
    })