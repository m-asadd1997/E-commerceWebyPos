window.onload = function homepage(){
    importTheme();

    let cart = getCartFromLocalStorage();
    document.getElementById('productCount').innerHTML = cart !=undefined ? cart.products.length : 0;
    // const urlParams = new URLSearchParams(window.location.search);
    // const reload = urlParams.get('reload');
    // debugger;
    // if(reload != "false"){
    //     let ajax = new XMLHttpRequest();
    //     ajax.open("GET","http://localhost:3000/settings");
    //     ajax.setRequestHeader("contant-type","application/json");
    //     ajax.onprogress=function(){};
    //     ajax.onload=function(){
    
    //         let homepage=JSON.parse(this.response);
    //         debugger;
    //         window.location.href=homepage.theme.homepage;
    //         window.location.href=homepage.theme.homepage+"?reload=false";
           
            
            
    //     }
    //     ajax.send();
    // }
    
}