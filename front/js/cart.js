//FETCH METHOD TO GET THE DATA IN THE API

async function getDataProduct(_dataProduct) {
    
    const dataOrder = `http://localhost:3000/api/products/order`;
    
    await fetch(dataOrder)
    
    .then((response)=> 
        response.json())
    
    .then((product)=> {
        console.log(product);
        showProductOrder(product);
        // localStorage.clear();
    })
    
    .catch(function(error) {
        alert(error);
    });
}