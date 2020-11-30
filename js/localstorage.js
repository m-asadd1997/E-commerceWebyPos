function getCartFromLocalStorage(){
    return JSON.parse(localStorage.getItem('cart'));
}

function getSettingsFromLocalStorage(){
    return JSON.parse(localStorage.getItem('theme'));
}

function getCartIdFromCart(){
    let cart = JSON.parse(localStorage.getItem('cart'));
    if(cart!=null){
        let cart_id = cart.id;
        return cart_id;
    }
    else{
        return null;
    }
}

function headerCart(){
    
    
    let cart = getCartFromLocalStorage();
    if(!cart || cart.amount == 0){

        document.getElementById('cartBox').innerHTML = `<li><img src="https://www.razencustoms.com/includes/img/empty-cart.png"></li>`
        return;
    }
    let headerCart="";

    for(let i=0;i<=cart.products.length-1;i++)
    {
    
        headerCart = headerCart + `<li>
                                        <div class="cart-img">
                                            <a href="#"><img alt="" src="${cart.products[i].img}"></a>   
                                        </div>
                                        <div class="cart-info">
                                            <h4><a href="#">${cart.products[i].name}</a></h4>
                                            <span>Rs ${cart.products[i].price} <span>x ${cart.products[i].quantityOnline}</span></span>
                                        </div>
                                        <div class="del-icon">
                                            <i onclick="deleteCartProduct(${cart.products[i].id})" class="fa fa-times-circle"></i>
                                        </div>
                                    </li>`
    }

    headerCart = headerCart + `<li class="cart-border">
                                    <div class="subtotal-text">Subtotal: </div>
                                    <div class="subtotal-price">Rs ${cart.amount}</div>
                                </li> 
                                <li>
                                    <a class="cart-button" href="cart.html">view cart</a>
                                    <a class="checkout" href="checkout.html">checkout</a>
                                </li>`

    document.getElementById('cartBox').innerHTML = headerCart;


}


function deleteCartProduct(productId){
    
    let cart = getCartFromLocalStorage();
    let ind = cart.products.findIndex(el=> el.id == productId);
    let quantity = cart.products[ind].quantityOnline ;
    for(let i=1;i<=quantity;i++)
    {
        cart.amount -= cart.products[ind].price;
        cart.products[ind].stock++;
    }

    cart.products.splice(ind,1);
    if(cart.products.length!=0){
        localStorage.setItem('cart',JSON.stringify(cart));
    }else{
        cart.products = [];
        localStorage.setItem('cart',JSON.stringify(cart));
    }


    
    document.getElementById('productCount').innerHTML = cart !=undefined ? cart.products.length : 0;

    let ajax = new XMLHttpRequest();
            ajax.open("PUT","http://localhost:3000/cart/"+cart.id);
            ajax.setRequestHeader("content-type","application/json");
            ajax.onprogress = function(){};
            ajax.onload = function(){
                
                cart = JSON.parse(this.response);
                localStorage.setItem('cart',JSON.stringify(cart));

            }
            ajax.send(JSON.stringify(cart));
    

    
    headerCart();

}