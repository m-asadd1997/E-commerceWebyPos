window.onload = function(){

    let t_id = JSON.parse(localStorage.getItem('trackId'));
    document.getElementById('track').innerHTML = t_id ;
    

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



