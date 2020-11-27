window.onload = function showCart(){

    if(localStorage.getItem('theme')){
        theme();
    }else{
        importTheme();
    } 
    
    if(localStorage.getItem('cart')){
        calcualtingQuantityForEachProduct()
    }

    let cart = getCartFromLocalStorage();
    document.getElementById('productCount').innerHTML = cart !=undefined ? cart.products.length : 0;

    cartProducts();
    
}    

function calcualtingQuantityForEachProduct(){
    let cart = getCartFromLocalStorage();
    let count = [];
    if(cart){
        for(let i = 0; i < cart.products.length; i++){
            for(let j = 1; j < cart.products.length; j++){
                if(cart.products[i].id == cart.products[j].id) count++
            }
        } 
        // console.log(count)  
        
        
        
    }
}

function countDuplicateInCart(array){
    
}

function cartProducts(){
    
    let cart = getCartFromLocalStorage();
    
    var showProductsOnCart = "";

    if(!cart){
        return;
    }else{

        for(var i = 0; i <= cart.products.length-1; i++){
        showProductsOnCart = showProductsOnCart + `<tr>
        <td class="product-thumbnail"><a href="#"><img src="${cart.products[i].img}" alt="" /></a></td>
        <td class="product-name"><a href="#">${cart.products[i].name}</a></td>
        <td class="product-price"><span class="amount">Rs ${cart.products[i].price}</span></td>
        <td class="product-quantity"><input onchange=quantity('${JSON.stringify(cart.products[i])}') id="${cart.products[i].id}" min="1" type="number" value="${cart.products[i].quantity}" /></td>
        <td class="product-subtotal">Rs ${cart.products[i].price*cart.products[i].quantity}</td>
        <td class="product-remove"><a onclick="deleteCartProductMain(${cart.products[i].id})" href="#"><i class="fa fa-times"></i></a></td>
        </tr>`
        ;

        }
        document.getElementById('cartItems').innerHTML = showProductsOnCart;	
    }

    let settings = getSettingsFromLocalStorage();

var c =`<tr class="cart-subtotal">
<th>Subtotal</th>
<td><span class="amount">Rs ${cart.amount}</span></td>
</tr>
<tr class="shipping">
<th>Shipping</th>
<td><span class="amount">Rs ${settings.shipping}</span></p></td>
</tr>
<tr class="order-total">
<th>Total</th>
<td>
<strong><span class="amount">Rs ${(cart.amount)+(settings.shipping)}</span></strong>
</td>
</tr>`

        document.getElementById('total').innerHTML = c;

}


function deleteCartProductMain(productId){
    
    let cart = getCartFromLocalStorage();
    let ind = cart.products.findIndex(el=> el.id == productId);
    let quantity = cart.products[ind].quantity ;
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
    cartProducts();

}


function quantity(product) {
    debugger;
    let parsedProduct = JSON.parse(product);
    var x = document.getElementById(parsedProduct.id).value;
    

    if (x > parsedProduct.quantity) {
            let cart = getCartFromLocalStorage();
            let ind = cart.products.findIndex(el=> el.id == parsedProduct.id)
            cart.products[ind].quantity++;
            cart.products[ind].stock--;
            cart.amount += cart.products[ind].price;
            localStorage.setItem('cart',JSON.stringify(cart));


            let ajax = new XMLHttpRequest();
            ajax.open("PUT","http://localhost:3000/cart/"+cart.id);
            ajax.setRequestHeader("content-type","application/json");
            ajax.onprogress = function(){};
            ajax.onload = function(){
                
                cart = JSON.parse(this.response);
                localStorage.setItem('cart',JSON.stringify(cart));

            }
            ajax.send(JSON.stringify(cart));

            cartProducts();
    } else if(x < parsedProduct.quantity) {
        let cart = getCartFromLocalStorage();
            let ind = cart.products.findIndex(el=> el.id == parsedProduct.id)
            cart.products[ind].quantity--;
            cart.products[ind].stock++;
            cart.amount -= cart.products[ind].price;
            localStorage.setItem('cart',JSON.stringify(cart));

            let ajax = new XMLHttpRequest();
            ajax.open("PUT","http://localhost:3000/cart/"+cart.id);
            ajax.setRequestHeader("content-type","application/json");
            ajax.onprogress = function(){};
            ajax.onload = function(){
                
                cart = JSON.parse(this.response);
                localStorage.setItem('cart',JSON.stringify(cart));

            }
            ajax.send(JSON.stringify(cart));

            
            cartProducts();
      
    }else{
        cartProducts();
        return;
    }
  }

  function goToCheckoutAndSaveCart(){

            let cart = getCartFromLocalStorage();
            let cartListArray = []
            if(cart){
            cart.products.map(d=>{
                cartListArray.push({
                    product:d,
                    quantity:0
                })
            }) 
            let obj = {
                "amount": cart.amount,
                "productCartList":  cartListArray
                
            } 
            console.log("cart to send",obj)
        //     let ajax = new XMLHttpRequest();
        //     ajax.open("POST","http://localhost:8080/api/cart/");
        //     ajax.setRequestHeader("content-type","application/json");
        //     ajax.onprogress = function(){};
        //     ajax.onload = function(){
        //         // let cart = JSON.parse(this.response);
        //         // localStorage.setItem("cart",JSON.stringify(cart));
        //         document.getElementById('productCount').innerHTML = cart !=undefined ? cart.products.length : 0;
        //     }    
        //     ajax.send(JSON.stringify(obj));
        window.location.href = "checkout.html"
        }
  }
