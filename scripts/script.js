let cart = []

function openModal(productID) {
    document.getElementById("productModal" + productID).style.display = "block";
}

// Function to close the modal
function closeModal(productID) {
    document.getElementById("productModal" + productID).style.display = "none";
}

function addToCart(event, productID) {
    event.stopPropagation()

    let productTitle = event.target.closest('.card').querySelector('.card-content h2').innerHTML
    let productPrice = event.target.closest('.card').querySelector('.product-price').value

    let product = {
        id: productID,
        title: productTitle,
        price: parseInt(productPrice)
    }

    cart.push(product)

    console.log(cart)
    // updateCart()
}

// function updateCart(){
//     const
// }


// Close the modal if the user clicks outside of it
window.onclick = function (event) {
    for (let i = 1; i <= 16; i++) {
        let modal = document.getElementById("productModal" + i);
        if (event.target == modal) {
            closeModal(i)
        }

    }
}
