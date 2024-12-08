/*
    REFERENCE/GUIDES
    StackOverFlow: used for debugging and solving error
    MDN Web Docs: The Javascript Documentation
    ChatGPT: for solving complex problem, THE GOAT!
    W3 Schools: for syntax, html, css and js
    Geeks 4 Geeks: bubble sort algorithm

    TOOLS/IDE
    WEBSTORM: ide used
    GIT: version manager
    GITHUB: for storing and uploading my code
    FIREFOX DEV: used for console

    TESTED ON:
                  -`                     haise@archlinux
                 .o+`                    ---------------
                `ooo/                    OS: Arch Linux x86_64
               `+oooo:                   Host: 83FQ (LOQ 15IAX9I)
              `+oooooo:                  Kernel: Linux 6.12.1-arch1-1
              -+oooooo+:                 Uptime: 4 hours, 3 mins
            `/:-:++oooo+:                Packages: 733 (pacman)
           `/++++/+++++++:               Shell: zsh 5.9
          `/++++++++++++++:              Display (AUO7EAD): 1920x1080 @ 144 Hz ]
         `/+++ooooooooooooo/`            DE: Xfce4 4.18
        ./ooosssso++osssssso+`           WM: Xfwm4 (X11)
       .oossssso-````/ossssss+`          WM Theme: Catppuccin-Dark-Frappe
      -osssssso.      :ssssssso.         Theme: Catppuccin-Dark-Frappe [GTK2/3/]
     :osssssss/        osssso+++.        Icons: Papirus-Dark [GTK2/3/4]
    /ossssssss/        +ssssooo/-        Font: Sans (10pt) [GTK2/3/4]
  `/ossssso+/:-        -:/+osssso+-      Cursor: Adwaita
 `+sso+:-`                 `.-/+oso:     Terminal: xfce4-terminal 1.1.3
`++:.                           `-/+/    Terminal Font: JetBrainsMono Nerd Font)
.`                                 `/    CPU: 12th Gen Intel(R) Core(TM) i5-124z
                                         GPU 1: Intel Arc A530M @ 2.30 GHz [Dis]
                                         GPU 2: Intel UHD Graphics @ 1.30 GHz []
                                         Memory: 6.42 GiB / 15.33 GiB (42%)
                                         Swap: 0 B / 4.00 GiB (0%)
                                         Disk (/): 26.74 GiB / 464.76 GiB (6%) s
                                         Battery (L23D4PK4): 77% [AC Connected]
                                         Locale: en_US.UTF-8

    FUNCTIONS USED


 */

/*
 initialized a cart that stores all of the users product

 the array structure

  id: productID,
  title: productTitle,
  price: parseInt(productPrice)
*/

let cart = []

//cart.forEach((item) => {
//  console.log(item.id, item.title, item.price);
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
}

// ==================================================================================================================================================================

function openCartModal() {
    document.getElementById('cartModal').style.display = 'block';
}

// ==================================================================================================================================================================

function closeCartModal() {
    document.getElementById('cartModal').style.display = 'none';
}

// ==================================================================================================================================================================

// the html button named "Add to Cart"
function addToCart(event, productID) {
    // added stopPropagation so that when the user clicks the button it will not trigger the function openModal
    // because the button is inside the div with a function openmodal
    event.stopPropagation()

    // gets the price and title from the nearest ancestor
    let productTitle = event.target.closest('.card').querySelector('.card-content h2').innerHTML
    let productPrice = event.target.closest('.card').querySelector('.product-price').value

    // console.log(productTitle)
    // console.log(productPrice)

    // stores the user data from a temporary array
    let product = {
        id: productID, title: productTitle, price: parseInt(productPrice)
    }

    // console.log(productID, productTitle, productPrice)

    // inserts the data from product to cart that i initialized from the top of the javascript file
    cart.push(product)

    // i get the length of the cart and converting the data type to integer and displays it beside the cart image
    document.getElementById('cart-value').innerHTML = parseInt(cart.length)

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
    const notificationContainer = document.getElementById('notificationContainer');

    // create a new notification element
    const notification = document.createElement('div');
    // added a class to the div element
    notification.classList.add('notification');
    // insert the product title from the addToCart function
    notification.innerText = message;

    // insert the notification to the container, a div that has no elements inside
    notificationContainer.appendChild(notification);

    // automatically remove the notification after for few seconds
    setTimeout(() => {
        notification.classList.add('fade');
        setTimeout(() => notification.remove(), 1000);
    }, 3000);
}

// ==================================================================================================================================================================

// everytime the user add new product this function is always being called by the addToCart function from above
function updateCartModal() {

    // get the elements id
    const cartItemsContainer = document.getElementById('cartItemsContainer');
    const cartTotalElement = document.getElementById('cartTotal');

    // implemented a bubble sort algorithm to sort the products by its ID
    // reference: https://www.geeksforgeeks.org/bubble-sort-algorithms-by-using-javascript/
    for (let i = 0; i < cart.length; i++) {
        for (let j = 0; j < (cart.length - 1); j++) {
            if (cart[j].id > cart[j + 1].id) {
                let temp = cart[j];
                cart[j] = cart[j + 1];
                cart[j + 1] = temp;
            }
        }
    }


    cartItemsContainer.innerHTML = '';

    // initialized the variable total that displays the total price of all the products inside the cart array
    let total = 0;

    // loops each item in cart
    // i did used forEach instead of while loop or for for it's simplicity
    cart.forEach((item) => {
        // console.log(item.id, item.title, item.price);
        // create a new html element for the product
        const cartItem = document.createElement('div');
        cartItem.classList.add('cart-item');
        cartItem.innerHTML = `
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
            closeModal(i)
        }

    }
}
