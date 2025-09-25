if(document.readyState == 'loading'){
    document.addEventListener('DOMContentLoaded', ready)
} else {
    ready();
}

function ready(){
    // Remove button in cart
    var removeCartItemButtons = document.getElementsByClassName('btn-danger');
    for(var i = 0; i < removeCartItemButtons.length; i++){
        var button = removeCartItemButtons[i];
        button.addEventListener('click', removeCartItem);
    }

    // Quantity change in cart
    var quantityInputs = document.getElementsByClassName('cart-quantity-input');
    for(var i = 0; i < quantityInputs.length; i++){
        var input = quantityInputs[i];
        input.addEventListener('change', quantityChanged);
    }

    // Item add to cart
    var addToCartButton = document.getElementsByClassName('shop-item-button');
    for(var i = 0; i < addToCartButton.length; i++){
        var cartButton = addToCartButton[i];
        cartButton.addEventListener('click', addToCartClicked);
    }

    // Purchase button
    document.getElementsByClassName('btn-purchase')[0].addEventListener('click', purchaseButtonClicked);
}

function addToCartClicked(event){
    var button = event.target;
    var shopItem = button.parentElement.parentElement.parentElement.parentElement;
    var title = shopItem.getElementsByClassName('shop-item-title')[0].innerText;
    var price = shopItem.getElementsByClassName('shop-item-price')[0].innerText;
    var imageSrc = shopItem.getElementsByClassName('shop-item-image')[0].src;
    addItemToCart(title, price, imageSrc);
    updateCartTotal();
}

function addItemToCart(title, price, imageSrc){
    var cartRow = document.createElement('div');
    cartRow.classList.add('cart-row');
    var cartItems = document.getElementsByClassName('cart-items')[0];
    var cartItemNames = cartItems.getElementsByClassName('cart-item-title');

    // Check if item already exists
    for(var i = 0; i < cartItemNames.length; i++){
        if(cartItemNames[i].innerText == title){
            alert('This item is already added to the cart');
            return;
        }
    }

    var cartRowContents = `
        <div class="cart-item cart-column">
            <img src="${imageSrc}" width="100" height="100" alt="" class="cart-item-image">
            <span class="cart-item-title">${title}</span>
        </div>
        <span class="cart-price cart-column">${price}</span>
        <div class="cart-quantity cart-column">
            <input type="number" value="1" class="cart-quantity-input">
            <button class="btn btn-danger" type="button">Remove</button>
        </div>
    `;
    cartRow.innerHTML = cartRowContents;
    cartItems.append(cartRow);

    // Add event listeners
    cartRow.getElementsByClassName('btn-danger')[0].addEventListener('click', removeCartItem);
    cartRow.getElementsByClassName('cart-quantity-input')[0].addEventListener('change', quantityChanged);
}

function removeCartItem(event){
    var buttonClicked = event.target;
    buttonClicked.parentElement.parentElement.remove();
    updateCartTotal();
}

function quantityChanged(event){
    var input = event.target;
    if(isNaN(input.value) || input.value <= 0){
        input.value = 1;
    }
    updateCartTotal();
}

function updateCartTotal() {
    var cartItems = document.getElementsByClassName('cart-items')[0];
    var cartRows = cartItems.getElementsByClassName('cart-row');
    var total = 0;

    for (var i = 0; i < cartRows.length; i++) {
        var row = cartRows[i];
        var priceElement = row.querySelector('.cart-price');
        var quantityElement = row.querySelector('.cart-quantity-input');
        var price = parseFloat(priceElement.innerText.replace('₹', '').replace('$', ''));
        var quantity = parseInt(quantityElement.value);
        total += price * quantity;
    }

    total = Math.round(total * 100) / 100;
    document.querySelector('.cart-total-price').innerText = '₹' + total;

    return total; // <- make sure we return the number
}

function purchaseButtonClicked() {
    var total = updateCartTotal(); // <- will now correctly return the total price
    alert(`Thank you for your purchase! Total price is ₹${total}`);
    var cartItems = document.getElementsByClassName('cart-items')[0];
    while (cartItems.hasChildNodes()) {
        cartItems.removeChild(cartItems.firstChild);
    }
    updateCartTotal();
}

