window.onload = function viewCategory(){

    if(localStorage.getItem('theme')){
        theme();
    }else{
        importTheme();
    } 
   
    let display="";
    let ajax = new XMLHttpRequest();
    ajax.open("GET","http://localhost:3000/category")
    ajax.setRequestHeader("content-type", "application/json")
    ajax.onprogress = function(){

    }
    ajax.onload = function(){
        
        let showCategory = JSON.parse(this.response);
        
        for(let i=0; i<=showCategory.length-1; i++){
            
            display=display +`<li><a onclick="viewSubCategory(${showCategory[i].id})">${showCategory[i].name}</a></li>`
            
        }

        
        
        document.getElementById('category').innerHTML = display;

        }
    ajax.send();

    showProducts();

    let cart = getCartFromLocalStorage();
    document.getElementById('productCount').innerHTML = cart !=undefined ? cart.products.length : 0;
    recentProducts();
}

function show(id,parent_id){
    console.log("hello",id);
    window.location.href="product-details.html?id="+id+"&category="+parent_id;
}


function viewSubCategory(data){

    id = data;
    let display1="";
    let ajax = new XMLHttpRequest();
    ajax.open("GET","http://localhost:3000/sub_category?parent_id="+id)
    ajax.setRequestHeader("content-type", "application/json")
    ajax.onprogress = function(){

    }
    ajax.onload = function(){
        
        let showSubCategory = JSON.parse(this.response);
        
        console.log(showSubCategory);
        let subCategoryText = `<h3 class="sidebar-title">Sub-Category</h3>
        <ul class="sidebar-menu" id="subcategory">`
        for(let i=0; i<=showSubCategory.length-1; i++){
            
            display1=display1 +`<li><a href="#" onclick="showSelectedSubCategoryProducts(${showSubCategory[i].id})">${showSubCategory[i].name}</a></li></ul>`
            
        }
        console.log(showSubCategory)

        document.getElementById('subCategoryText').innerHTML = subCategoryText;
        document.getElementById('subcategory').innerHTML = display1;

        }
    ajax.send();
}

function showProducts(){
    let displayProducts="";
    let ajax = new XMLHttpRequest();
    ajax.open("GET","http://localhost:8080/api/products/onlineproducts")
    ajax.setRequestHeader("content-type", "application/json")
    ajax.onprogress = function(){

    }
    ajax.onload = function(){
        
        let showProducts = JSON.parse(this.response)
        console.log(showProducts.result)

        let productList = [];
        

        for(let p of showProducts.result){
            
            let obj = {
                id:p.id,
                name:p.name,
                price:p.price,
                img:p.image,
                categoryId:p.categoryId
              

            }

        productList.push(obj);
        }

        
        
        for(let i=0; i<=productList.length-1; i++){
           //debugger;
            displayProducts=displayProducts +`<div class="col-md-4 col-sm-4">
            <div class="single-product">
            <div class="product-img">
            <a onclick="show('${productList[i].id}','${productList[i].parent_id}')" >
            <img style="width:262px; height:335px" src="${productList[i].img}" alt="" />
           
            </a>
            <span class="tag-line">new</span>
            <div class="product-action">
            <div class="button-top">
            <a href="#" data-toggle="modal" data-target="#productModal"><i class="fa fa-search"></i></a>
            <a href="#"><i class="fa fa-heart"></i></a>
            </div>
            <div class="button-cart">
        
            </div>
            </div>
            </div>
            <div class="product-content">
            <h3><a onclick="show('${productList[i].id}','${productList[i].categoryId}')">${productList[i].name}</a></h3>
            <div class="price">
            <span>Rs ${productList[i].price}</span>
            <span class="old">$80.11</span>
            </div>
            </div>
            </div>
            </div>`
            
        }
        
        document.getElementById('products').innerHTML = displayProducts;

        

        }
    ajax.send();
}

function showProductsForPageTwo(){
    let displayProducts="";
    let ajax = new XMLHttpRequest();
    ajax.open("GET","http://localhost:3000/products?_page=2&_limit=9")
    ajax.setRequestHeader("content-type", "application/json")
    ajax.onprogress = function(){

    }
    ajax.onload = function(){
        
        let showProducts = JSON.parse(this.response)

        let productList = [];

        for(let p of showProducts){
            
            let obj = {
                id:p.id,
                name:p.name,
                price:p.price,
                img:p.img,
                product_other_images:p.product_other_images,
                quantity:p.quantity,
                stock:p.stock,
                parent_id:p.parent_id,
                size:p.size,
                color:p.color

            }

        productList.push(obj);


    }
        
        for(let i=0; i<=productList.length-1; i++){
            
            displayProducts=displayProducts +`<div class="col-md-4 col-sm-4">
            <div class="single-product">
            <div class="product-img">
            <a onclick="show('${productList[i].id}','${productList[i].parent_id}')">
            <img style="width:262px; height:335px" src="${productList[i].img}" alt="" />
            <img class="secondary-img" style="width:262px; height:335px" src="${productList[i].product_other_images[0]}" alt="" />
            </a>
            <span class="tag-line">new</span>
            <div class="product-action">
            <div class="button-top">
            <a href="#" data-toggle="modal" data-target="#productModal"><i class="fa fa-search"></i></a>
            <a href="#"><i class="fa fa-heart"></i></a>
            </div>
            <div class="button-cart">
            <button onclick=addToCart('${JSON.stringify(productList[i])}')><i class="fa fa-shopping-cart"></i> add to cart</button>
            </div>
            </div>
            </div>
            <div class="product-content">
            <h3><a onclick="show('${productList[i].id}','${productList[i].parent_id}')">${productList[i].name}</a></h3>
            <div class="price">
            <span>Rs ${productList[i].price}</span>
            <span class="old">$80.11</span>
            </div>
            </div>
            </div>
            </div>`
            
        }
        
        document.getElementById('products').innerHTML = displayProducts;
        

        }
    ajax.send();
}

function showProductsForPageThree(){
    let displayProducts="";
    let ajax = new XMLHttpRequest();
    ajax.open("GET","http://localhost:3000/products?_page=3&_limit=9")
    ajax.setRequestHeader("content-type", "application/json")
    ajax.onprogress = function(){

    }
    ajax.onload = function(){
        
        let showProducts = JSON.parse(this.response)
        
        let productList = [];

        for(let p of showProducts){
            
            let obj = {
                id:p.id,
                name:p.name,
                price:p.price,
                img:p.img,
                product_other_images:p.product_other_images,
                quantity:p.quantity,
                stock:p.stock,
                parent_id:p.parent_id,
                size:p.size,
                color:p.color

            }

        productList.push(obj);


    }

        for(let i=0; i<=productList.length-1; i++){
            
            displayProducts=displayProducts +`<div class="col-md-4 col-sm-4">
            <div class="single-product">
            <div class="product-img">
            <a onclick="show('${productList[i].id}','${productList[i].parent_id}')">
            <img style="width:262px; height:335px" src="${productList[i].img}" alt="" />
            <img class="secondary-img" style="width:262px; height:335px" src="${productList[i].product_other_images[0]}" alt="" />
            </a>
            <span class="tag-line">new</span>
            <div class="product-action">
            <div class="button-top">
            <a href="#" data-toggle="modal" data-target="#productModal"><i class="fa fa-search"></i></a>
            <a href="#"><i class="fa fa-heart"></i></a>
            </div>
            <div class="button-cart">
            <button onclick=addToCart('${JSON.stringify(productList[i])}')><i class="fa fa-shopping-cart"></i> add to cart</button>
            </div>
            </div>
            </div>
            <div class="product-content">
            <h3><a onclick="show('${productList[i].id}','${productList[i].parent_id}')">${productList[i].name}</a></h3>
            <div class="price">
            <span>Rs ${productList[i].price}</span>
            <span class="old">$80.11</span>
            </div>
            </div>
            </div>
            </div>`
            
        }
        
        document.getElementById('products').innerHTML = displayProducts;

        }
    ajax.send();
}

function showSelectedSubCategoryProducts(data){
    let id = data;
    let displaySubCategoryProducts="";
    let ajax = new XMLHttpRequest();
    ajax.open("GET","http://localhost:3000/products?parent_id="+id)
    ajax.setRequestHeader("content-type", "application/json")
    ajax.onprogress = function(){

    }
    ajax.onload = function(){
        
        let showSubCategoryProducts = JSON.parse(this.response)
        console.log(showSubCategoryProducts)

        let productList = [];

        for(let p of showSubCategoryProducts){
            
            let obj = {
                id:p.id,
                name:p.name,
                price:p.price,
                img:p.img,
                product_other_images:p.product_other_images,
                quantity:p.quantity,
                stock:p.stock,
                parent_id:p.parent_id,
                size:p.size,
                color:p.color

            }

        productList.push(obj);


    }

        for(let i=0; i<=productList.length-1; i++){
            
            displaySubCategoryProducts=displaySubCategoryProducts +`<div class="col-md-4 col-sm-4">
            <div class="single-product">
            <div class="product-img">
            <a onclick="show('${productList[i].id}','${productList[i].parent_id}')">
            <img style="width:262px; height:335px" src="${productList[i].img}" alt="" />
            <img class="secondary-img" style="width:262px; height:335px" src="${productList[i].product_other_images[0]}" alt="" />
            </a>
            <span class="tag-line">new</span>
            <div class="product-action">
            <div class="button-top">
            <a href="#" data-toggle="modal" data-target="#productModal"><i class="fa fa-search"></i></a>
            <a href="#"><i class="fa fa-heart"></i></a>
            </div>
            <div class="button-cart">
            <button onclick=addToCart('${JSON.stringify(productList[i])}')><i class="fa fa-shopping-cart"></i> add to cart</button>
            </div>
            </div>
            </div>
            <div class="product-content">
            <h3><a onclick="show('${productList[i].id}','${productList[i].parent_id}')">${productList[i].name}</a></h3>
            <div class="price">
            <span>Rs ${productList[i].price}</span>
            <span class="old">$80.11</span>
            </div>
            </div>
            </div>
            </div>`
            
        }
        
        document.getElementById('products').innerHTML = displaySubCategoryProducts;

        }
    ajax.send();
}

function search(){
    
    var searchedItems = "";
    var searchItem = document.getElementById('searchItems').value;

    let ajax = new XMLHttpRequest();
    ajax.open("GET", "http://localhost:3000/products?name_like="+searchItem)
    ajax.setRequestHeader("content-type", "application/json")
    // ajax.getResponseHeader("content-type")
    ajax.onprogress = function () {
        // console.log("the call is in pr")
    }
    ajax.onload = function () {

        let searchedProducts = JSON.parse(this.response);

        let productList = [];

        for(let p of searchedProducts){
            
            let obj = {
                id:p.id,
                name:p.name,
                price:p.price,
                img:p.img,
                product_other_images:p.product_other_images,
                quantity:p.quantity,
                stock:p.stock,
                parent_id:p.parent_id,
                size:p.size,
                color:p.color

            }

        productList.push(obj);


    }

        for (var i = 0; i <= productList.length - 1; i++) {
            
                searchedItems = searchedItems + `<div class="col-md-4 col-sm-4">
                <div class="single-product">
                <div class="product-img">
                <a onclick="show('${productList[i].id}','${productList[i].parent_id}')">
                <img style="width:262px; height:335px" src="${productList[i].img}" alt="" />
                <img class="secondary-img" style="width:262px; height:335px" src="${productList[i].product_other_images[0]}" alt="" />
                </a>
                <span class="tag-line">new</span>
                <div class="product-action">
                <div class="button-top">
                <a href="#" data-toggle="modal" data-target="#productModal"><i class="fa fa-search"></i></a>
                <a href="#"><i class="fa fa-heart"></i></a>
                </div>
                <div class="button-cart">
                <button onclick=addToCart('${JSON.stringify(productList[i])}')><i class="fa fa-shopping-cart"></i> add to cart</button>
                </div>
                </div>
                </div>
                <div class="product-content">
                <h3><a onclick="show('${productList[i].id}','${productList[i].parent_id}')">${productList[i].name}</a></h3>
                <div class="price">
                <span>Rs ${productList[i].price}</span>
                <span class="old">$80.11</span>
                </div>
                </div>
                </div>
                </div>`
        }

        document.getElementById('products').innerHTML = searchedItems;

        //alert("Product is added")
    }

    ajax.send()
    document.getElementById('clickcloseButton').click();
    
}

function sort(){
    
    var sortedItems = "";

    var sortItem = document.getElementById('sortByPrice');
    var selectedValue = sortItem.options[sortItem.selectedIndex].value;

    

    let ajax = new XMLHttpRequest();
    if(selectedValue == 'new'){
        ajax.open("GET", "http://localhost:3000/products?_sort=id&_order=desc&_limit=6")
    }
    else{
        ajax.open("GET", "http://localhost:3000/products?_sort=price&_order="+selectedValue)
    }
    ajax.setRequestHeader("content-type", "application/json")
    // ajax.getResponseHeader("content-type")
    ajax.onprogress = function () {
        // console.log("the call is in pr")
    }
    ajax.onload = function () {
        let sortedProducts = JSON.parse(this.response);
       

        let productList = [];

        for(let p of sortedProducts){
            
            let obj = {
                id:p.id,
                name:p.name,
                price:p.price,
                img:p.img,
                product_other_images:p.product_other_images,
                quantity:p.quantity,
                stock:p.stock,
                parent_id:p.parent_id,
                size:p.size,
                color:p.color

            }

        productList.push(obj);

        }

        for (var i = 0; i <= productList.length - 1; i++) {
            sortedItems = sortedItems + `<div class="col-md-4 col-sm-4">
            <div class="single-product">
            <div class="product-img">
            <a onclick="show('${productList[i].id}','${productList[i].parent_id}')">
            <img style="width:262px; height:335px" src="${productList[i].img}" alt="" />
            <img class="secondary-img" style="width:262px; height:335px" src="${productList[i].product_other_images[0]}" alt="" />
            </a>
            <span class="tag-line">new</span>
            <div class="product-action">
            <div class="button-top">
            <a href="#" data-toggle="modal" data-target="#productModal"><i class="fa fa-search"></i></a>
            <a href="#"><i class="fa fa-heart"></i></a>
            </div>
            <div class="button-cart">
            <button onclick=addToCart('${JSON.stringify(productList[i])}')><i class="fa fa-shopping-cart"></i> add to cart</button>
            </div>
            </div>
            </div>
            <div class="product-content">
            <h3><a onclick="show('${productList[i].id}','${productList[i].parent_id}')">${productList[i].name}</a></h3>
            <div class="price">
            <span>Rs ${productList[i].price}</span>
            <span class="old">$80.11</span>
            </div>
            </div>
            </div>
            </div>`
        }

        document.getElementById('products').innerHTML = sortedItems;

        //alert("Product is added")
    }

    ajax.send()

}


function recentProducts(){
    let recentProductsDisplay="";
    let ajax = new XMLHttpRequest();
    ajax.open("GET","http://localhost:3000/products?_sort=id&_order=desc")
    ajax.setRequestHeader("content-type", "application/json")
    ajax.onprogress = function(){

    }
    ajax.onload = function(){
        
        let showProducts = JSON.parse(this.response)
        
        let productList = [];

        for(let p of showProducts){
            
            let obj = {
                id:p.id,
                name:p.name,
                price:p.price,
                img:p.img,
                product_other_images:p.product_other_images,
                quantity:p.quantity,
                stock:p.stock,
                parent_id:p.parent_id,
                size:p.size,
                color:p.color

            }

        productList.push(obj);


    }

        for(let i=0; i<=2; i++){
            
            recentProductsDisplay=recentProductsDisplay +`<div class="single-product">
            <div class="product-img">
            <a href="product-details.html" onclick="show('${productList[i].id}','${productList[i].parent_id}')">
            <img src="${productList[i].img}" alt="" />
            <img class="secondary-img" src="${productList[i].product_other_images[0]}" alt="" />
            </a>
            </div>
            <div class="product-content">
            <h3><a onclick="show('${productList[i].id}','${productList[i].parent_id}')">${productList[i].name}</a></h3>
            <div class="price">
            <span>Rs ${productList[i].price}</span>
            <span class="old">$90.11</span>
            </div>
            </div>
            </div>`
            
        }
        
        document.getElementById('showrecentproduct').innerHTML = recentProductsDisplay;

        }
    ajax.send();
}




function addToCart(product){

    let parsedProduct = JSON.parse(product);   
    let cart = getCartFromLocalStorage();
    // console.log("=======>",cart);
    
    // if(cart){
    //     cart.push(parsedProduct)
    //     localStorage.setItem("producstArray",JSON.stringify(cart))
    
    // }
    // else{
    //     let cartArray = []
    //     cartArray.push(parsedProduct)
    //     localStorage.setItem("producstArray",JSON.stringify(cartArray));
    // }
    

    

    if(cart != null && cart != {}){

        processForCartDistinctProduct(parsedProduct);
        // let requestBody = processForCartDistinctProduct(parsedProduct);
         
        // let ajax = new XMLHttpRequest();
        // ajax.open("PUT","http://localhost:3000/cart/"+requestBody.id);
        // ajax.setRequestHeader("content-type","application/json");
        // ajax.onprogress = function(){

        // };
        // ajax.onload = function(){      
        // }
        // ajax.send(JSON.stringify(requestBody));
    }else{  
            // parsedProduct.stock--;
            // let obj = {
            //     "amount": parsedProduct.price,
            //     "products":[parsedProduct]
            // } 
            // let ajax = new XMLHttpRequest();
            // ajax.open("POST","http://localhost:3000/cart");
            // ajax.setRequestHeader("content-type","application/json");
            // ajax.onprogress = function(){};
            // ajax.onload = function(){
            //     let cart = JSON.parse(this.response);
            //     localStorage.setItem("cart",JSON.stringify(cart));
            //     document.getElementById('productCount').innerHTML = cart !=undefined ? cart.products.length : 0;
            // }    
            // ajax.send(JSON.stringify(obj));
           let cart = {
                "amount": parsedProduct.price,
                "products":[parsedProduct]
            }  
            localStorage.setItem("cart",JSON.stringify(cart));
        }

    

}



function processForCartDistinctProduct(parsedProduct){
        
    let cart = getCartFromLocalStorage();
    if(cart.products.find(el=> el.id == parsedProduct.id)){
        let ind = cart.products.findIndex(el=> el.id == parsedProduct.id);
        // cart.products[ind].quantity++;
        // cart.products[ind].stock--;
        cart.amount += cart.products[ind].price;
        localStorage.setItem('cart',JSON.stringify(cart));

        return cart ;

        debugger;

    }else{

    //  parsedProduct.stock--;   
     cart.products.push(parsedProduct);
     cart.amount += parsedProduct.price;
     
     localStorage.setItem("cart",JSON.stringify(cart));
     document.getElementById('productCount').innerHTML = cart !=undefined ? cart.products.length : 0;
     return cart;
     debugger;
     
    }


 }




