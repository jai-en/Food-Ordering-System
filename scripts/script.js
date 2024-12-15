/*
 initialized a cart that stores all of the users product

 the array structure

  id: productID,
  title: productTitle,
  price: parseInt(productPrice)
  quantity: productQuantity
*/

let cart = [];

//cart.forEach((item) => {
//  console.log(item.id, item.title, item.price, item.quantity);
//})

// ==================================================================================================================================================================

// a function that when the user click the div that has image it makes the div apear using the css display
// the function asks for parameter productId
// all 16 products from html have a id of productModal1 up to productModal1
function openModal(productID) {
    // so in here i concatenate the productModal string and the value of the productId from html
    document.getElementById("productModal" + productID).style.display = "block"; //sets the modal to block from hidden
}

// ==================================================================================================================================================================

function closeModal(productID) {
    document.getElementById("productModal" + productID).style.display = "none"; // sets the modal to hidden from block
    document.getElementById("quantity" + productID).value = "1";
}

// ==================================================================================================================================================================

function openCartModal() {
    document.getElementById("cartModal").style.display = "block";
}

// ==================================================================================================================================================================

function closeCartModal() {
    document.getElementById("cartModal").style.display = "none";
}

// ==================================================================================================================================================================

function incrementQuantity(productID) {
    const input = document.getElementById(productID);
    const currentValue = parseInt(input.value, 10);
    input.value = currentValue + 1;
}

// ==================================================================================================================================================================

function decrementQuantity(productID) {
    const input = document.getElementById(productID);
    const currentValue = parseInt(input.value, 10);
    if (currentValue > 1) {
        input.value = currentValue - 1;
    }
}

// ==================================================================================================================================================================

// the html button named "Add to Cart"
function addToCart(productID) {
    let productTitle = document.getElementById("product" + productID).value;
    let productPrice = document.getElementById("price" + productID).value;
    // console.log(productTitle)
    // console.log(productPrice)

    // stores the user data from a temporary array
    let product = {
        id: productID,
        title: productTitle,
        price: parseInt(productPrice),
        quantity: parseInt(),
    };

    console.log(productID, productTitle, productPrice);

    // inserts the data from product to cart that i initialized from the top of the javascript file
    cart.push(product);

    // i get the length of the cart and converting the data type to integer and displays it beside the cart image
    document.getElementById("cart-value").innerHTML = parseInt(cart.length);

    // call the updateModal
    updateCartModal();

    // call the shownotif to notified that the user has successfully added his or her product
    // insert the variable productTitle which contains the title of that product
    showNotification(`${productTitle} added to cart successfully!`);
}

// ==================================================================================================================================================================

// a function that creates a notification that displays in html
function showNotification(message) {
    // first get the elementId from html
    const notificationContainer = document.getElementById(
        "notificationContainer"
    );

    // create a new notification element
    const notification = document.createElement("div");
    // added a class to the div element
    notification.classList.add("notification");
    // insert the product title from the addToCart function
    notification.innerText = message;

    // insert the notification to the container, a div that has no elements inside
    notificationContainer.appendChild(notification);

    // automatically remove the notification after for few seconds
    setTimeout(() => {
        notification.classList.add("fade");
        setTimeout(() => notification.remove(), 1000);
    }, 3000);
}

// ==================================================================================================================================================================

// everytime the user add new product this function is always being called by the addToCart function from above
function updateCartModal() {
    // get the elements id
    const cartItemsContainer = document.getElementById("cartItemsContainer");
    const cartTotalElement = document.getElementById("cartTotal");

    // implemented a bubble sort algorithm to sort the products by its ID
    // reference: https://www.geeksforgeeks.org/bubble-sort-algorithms-by-using-javascript/
    for (let i = 0; i < cart.length; i++) {
        for (let j = 0; j < cart.length - 1; j++) {
            if (cart[j].id > cart[j + 1].id) {
                let temp = cart[j];
                cart[j] = cart[j + 1];
                cart[j + 1] = temp;
            }
        }
    }

    cartItemsContainer.innerHTML = "";

    // initialized the variable total that displays the total price of all the products inside the cart array
    let total = 0;

    // loops each item in cart
    // i did used forEach instead of while loop or for for it's simplicity
    cart.forEach((item) => {
        // console.log(item.id, item.title, item.price);
        // create a new html element for the product
        const cartItem = document.createElement("div");
        cartItem.classList.add("cart-item");
        cartItem.innerHTML = `
            <p>${item.quantity}</p>
            <p>${item.title}</p>
            <p>$${item.price}</p>
        `;
        cartItemsContainer.appendChild(cartItem);
        // sum of all of the products
        total += item.price;
        // console.log(total);
    });

    // display the total price
    cartTotalElement.innerText = `Total: $${total}`;
}

// ==================================================================================================================================================================

// added to click function to all of the modals
window.onclick = function (event) {
    for (let i = 1; i <= 16; i++) {
        //  loop 16 times because i have 16 products in html
        let modal = document.getElementById("productModal" + i);
        if (event.target == modal) {
            closeModal(i);
        }
    }
};

// ==================================================================================================================================================================
