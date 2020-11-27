window.onload = function(){

    if(localStorage.getItem('theme')){
        theme();
    }else{
        importTheme();
    } 

    let cart = getCartFromLocalStorage();
    if(!cart){
        return
    }else{

    
    document.getElementById('productCount').innerHTML = cart !=undefined ? cart.products.length : 0;
    checkout();
    }

    

}    


function checkout(){
        
        let cartProduct = "";
        let cart = getCartFromLocalStorage();
        let settings = getSettingsFromLocalStorage();

        for(let i=0;i<=cart.products.length-1;i++){

            cartProduct = cartProduct + `<tr class="cart_item">
                    <td class="product-name">${cart.products[i].name} <strong class="product-quantity">x ${cart.products[i].quantity}</strong></td>
                    <td class="product-total" ><span class="amount">Rs ${(cart.products[i].price)*(cart.products[i].quantity)}</span></td>
                 </tr>`    

            
        }

        document.getElementById('checkout_products').innerHTML = cartProduct;
        document.getElementById('subTotal').innerHTML = cart.amount; 
        document.getElementById('shipping').innerHTML = settings.shipping;
        document.getElementById('orderTotal').innerHTML = (cart.amount+settings.shipping);



}






function placeOrder(){
    debugger;

    

    let trackId = uuid();

    let cart = getCartFromLocalStorage();
    let settings = getSettingsFromLocalStorage();

    let orderAmount = cart.amount+settings.shipping ;

    class placeOrder{

        cartId = cart.id;
        orderAmount = orderAmount;
        orderStatus = "New";
        orderDate = new Date();
        trackId = trackId;



        constructor(fname,lname,address,city,country,postcode,email,phone){
            this.fname = fname ;
            this.lname = lname ;
            this.address = address ;
            this.city = city ;
            this.country = country ;
            this.postcode = postcode ;
            this.email = email ;
            this.phone = phone ;
            
        }
    }

   let fname = document.getElementById('fname').value ;
   let lname = document.getElementById('lname').value ;
   let address = document.getElementById('address').value ;
   let city = document.getElementById('city').value ;
   let country = document.getElementById('country').value ;
   let postcode = document.getElementById('postcode').value ;
   let email = document.getElementById('email').value ;
   let phone = document.getElementById('phone').value ;

   const obj = new placeOrder(fname,lname,address,city,country,postcode,email,phone);
   
    
   let ajax = new XMLHttpRequest();
   ajax.open("POST","http://localhost:3000/order");
   ajax.setRequestHeader("content-type","application/json");
   ajax.onprogress = function(){};
   ajax.onload = function(){

        let orderDetails = JSON.parse(this.response);
        // sms();
        debugger
        localStorage.setItem('trackId',JSON.stringify(orderDetails.trackId));
        localStorage.removeItem('cart');
        window.location.href = "thank_you.html";
   };
   ajax.send(JSON.stringify(obj));
   
 
}


  
  
function uuid() {
    return ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c =>
      (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
    );

}

function sms(){
    let ajax = new XMLHttpRequest();
    ajax.open("POST","https://sendpk.com/api/sms.php?username=923118966762&password=hdj12388&sender=ONS+COMPANY&mobile=923118966762&format=json&message=Assalam+o+Alikum");
    ajax.setRequestHeader("content-type","application/json");
    ajax.onprogress = function(){};
    ajax.onload = function(){
        console.log(this.response);
    };
    ajax.send();
}

