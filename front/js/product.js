function appendChild(anchor) {
    const items = document.querySelector('#items');

    if(items != null) {
        items.appendChild(anchor);
    }
}

function makeAnchor(id) {
    const anchor = document.createElement('a');

    anchor.href="./product.html?id=" + id;
}

function addProducts(data) {
    const id = data._id;

    const anchor = makeAnchor(id);
} 

const constString = window.location.search;
const urlParams = new URLSearchParams(constString);
const id = urlParams.get("id");
console.log({id});

fetch('http://localhost:3000/api/products')

.then((response)=> 
    response.json())

.then((data)=> {
    
    // const newId = data[4]._id;
    // console.log(newId);

    let _id = [];

    for (let i of data) {

        _id[i] = data._id; 
        console.log(_id[i]);
    }
   
    }
    

);