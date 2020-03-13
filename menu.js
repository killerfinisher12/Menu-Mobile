var ran = Math.random().toString(36).substr(4,8)
document.getElementById("order-num").innerHTML =  ran


var cash = document.getElementById("total-cash")
cash.addEventListener("input", trans)

function trans() {
    var cash1 = document.getElementById("total-cash")
    var totals = document.getElementsByClassName("cart-total-price")[0]
    var totalcash = parseFloat(cash1.value)
    var totalAmount = parseFloat(totals.innerText.replace('₱', ''))

    change1 = parseFloat(totalcash - totalAmount) || 0
    document.getElementById("item-change").innerHTML = "₱" + change1;
    
    
}

var selects = document.getElementsByClassName("btn-selects")
        selects[0].addEventListener("click", menu)
        selects[1].addEventListener("click", menu1)
    
        function menu() {

            var pops1=document.getElementById("beer")
            pops1.style.display="block"
           var pops = document.getElementById("pulutan")
            pops.style.display="none"
        } 
        

        function menu1() {
            var pops = document.getElementById("pulutan")
            pops.style.display="block"
            
            var pops1=document.getElementById("beer")
            pops1.style.display="none"
        }

        


    var removeCartItemButtons = document.getElementsByClassName('btn-danger')
    for (var i = 0; i < removeCartItemButtons.length; i++) {
        var button = removeCartItemButtons[i]
        button.addEventListener('click', removeCartItem)
    }

    var quantityInputs = document.getElementsByClassName('cart-quantity-input')
    for (var i = 0; i < quantityInputs.length; i++) {
        var input = quantityInputs[i]
        input.addEventListener('change', quantityChanged)
    }

    var addToCartButtons = document.getElementsByClassName('shop-item-image')
    for (var i = 0; i < addToCartButtons.length; i++) {
        var button = addToCartButtons[i]
        button.addEventListener('click', addToCartClicked)
    }

    document.getElementById('btn-buy').addEventListener('click', purchaseClicked)

    
    
    

        


function purchaseClicked() {
    var change = document.getElementById("item-change").innerText.replace('₱', '')
    if (change<0) {
    alert('Purchase Unsuccessfully')
    }
    else {
        var cartItems = document.getElementsByClassName('cart-items')[0]
        while (cartItems.hasChildNodes()) {
        cartItems.removeChild(cartItems.firstChild)
    } 
        document.getElementById('total-cash').value = " "
        updateCartTotal()
        alert('Purchase Successfully')
    }

    
}




function removeCartItem(event) {
    var buttonClicked = event.target
    buttonClicked.parentElement.parentElement.remove()
    updateCartTotal()
}

function quantityChanged(event) {
    var input = event.target
    if (isNaN(input.value) || input.value <= 0) {
        input.value = 1
    }
    updateCartTotal()
}

function addToCartClicked(event) {
    var button = event.target
    var shopItem = button.parentElement
    var price = shopItem.getElementsByClassName('shop-item-price')[0].innerText
    var imageSrc = shopItem.getElementsByClassName('shop-item-image')[0].src
    addItemToCart(price, imageSrc)
    updateCartTotal()
}

function addItemToCart(price, imageSrc) {
    var cartRow = document.createElement('div')
    cartRow.classList.add('cart-row')
    var cartItems = document.getElementsByClassName('cart-items')[0]
    var cartItemImages = cartItems.getElementsByClassName('cart-item-image')
    for (var i = 0; i < cartItemImages.length; i++) {
        if (cartItemImages[i].src == imageSrc) {
            alert('This item is already added to the cart')
            return
        }
    }
    var cartRowContents = `
    <div class="row cart-item cart-column">
        <img class="col-3 cart-item-image item-image" src="${imageSrc}" width="100" height="100">
    </div>
        <span class="cart-price cart-column">${price}</span>
    <div class="cart-quantity cart-column">
        <input class=" cart-quantity-input" type="number" value="1" style="width:30px; font-size: 10px; text-align:left;" >
        <button class=" btn btn-danger" type="button">REMOVE</button>
    </div>`
    cartRow.innerHTML = cartRowContents
    cartItems.append(cartRow)
    cartRow.getElementsByClassName('btn-danger')[0].addEventListener('click', removeCartItem)
    cartRow.getElementsByClassName('cart-quantity-input')[0].addEventListener('change', quantityChanged)
}

function updateCartTotal() {
    var cartItemContainer = document.getElementsByClassName('cart-items')[0]
    var cartRows = cartItemContainer.getElementsByClassName('cart-row')
    var total = 0
    for (var i = 0; i < cartRows.length; i++) {
        var cartRow = cartRows[i]
        var priceElement = cartRow.getElementsByClassName('cart-price')[0]
        var quantityElement = cartRow.getElementsByClassName('cart-quantity-input')[0]
        var price = parseFloat(priceElement.innerText.replace('₱', ''))
        var quantity = quantityElement.value
        total = total + (price * quantity)
    }
    total = Math.round(total * 100) / 100
    document.getElementsByClassName('cart-total-price')[0].innerText = '₱' + total
    trans()
}







