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

    }
    
    
    
} 

function orderDetails(){
    let trackId = document.getElementById("trackId").value;


    let ajax = new XMLHttpRequest();
    ajax.open("GET", "http://localhost:3000/order?trackId="+trackId)
    ajax.setRequestHeader("content-type", "application/json")
    ajax.onprogress = function(){}
    ajax.onload = function(){

        let order = JSON.parse(this.response);
        let a = `<p>Order Status= ${order[0].orderStatus} </p>
                <p>Order Amount= ${order[0].orderAmount}</p>
                <p>Order Date= ${order[0].orderDate}</p>
                <p>Full Name= ${order[0].fname} ${order[0].lname} </p>
                <p>Address= ${order[0].address}</p>
                <p>City= ${order[0].city}</p>
                <p>Country= ${order[0].country}</p>
                <p>Post Code= ${order[0].postcode}</p>
                <p>Email= ${order[0].email}</p>
                <p>Phone= ${order[0].phone}</p>`

        document.getElementById('orderDetails').innerHTML = a ;
        
        debugger;
        

    }
    ajax.send();
}
