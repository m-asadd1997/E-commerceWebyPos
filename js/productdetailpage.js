var productD;
var productDetail;
function getParams (url) {
    var params = {};
    var parser = document.createElement('a');
    parser.href = url;
    var query = parser.search.substring(1);
    var vars = query.split('&');
    for (var i = 0; i < vars.length; i++) {
        var pair = vars[i].split('=');
        params[pair[0]] = decodeURIComponent(pair[1]);
    }
    return params;
};

window.onload = function showProductDetails(){    

    if(localStorage.getItem('theme')){
        theme();
    }else{
        importTheme();
    } 
    
    let cart = getCartFromLocalStorage();
    // document.getElementById('productCount').innerHTML = cart !=undefined ? cart.products.length : 0;

    let ajax = new XMLHttpRequest();
    let obj = this.getParams(window.location.href);
    
    
    ajax.open("GET", "http://localhost:8080/api/products/onlineproductbyid/"+obj.id)
    ajax.setRequestHeader("content-type", "application/json")
    ajax.onprogress = function(){

    }
    ajax.onload = function(){
        productDetail = JSON.parse(this.response);
        console.log("Details======>",productDetail.result[0].productGalleryImages)
        
        let obj = {
            id:productDetail.result[0].id,
            name:productDetail.result[0].name,
            price:productDetail.result[0].price,
            quantity:productDetail.result[0].qty,
            img:productDetail.result[0].image,
            parent_id:productDetail.result[0].category.id,
            // size:productDetail.size,
            // color:productDetail.color

        }
        // console.log(obj);

        // debugger;
        
        // let parameterUse = JSON.stringify(productDetail)
        let productOtherImages = "";

        // let productReviews="";
        // let countStars =0;
        
        // let totalReviews = productDetail.reviews.length;
        // console.log(productDetail.reviews)
        
        // for(let i =0; i<=productDetail.reviews.length-1; i++){
        // countStars = countStars+productDetail.reviews[i].stars;

        // }
        // let averageStars = Math.round(countStars/totalReviews);

        // let displayAverageStars = "";
        // for(let i=0; i<= averageStars-1; i++){
        //     displayAverageStars= displayAverageStars+`<i class="fa fa-star"></i>`
            
        // }
        

        // if(averageStars==1){    
        //     displayAverageStars = displayAverageStars+ `<i class="fa fa-star-o"></i><i class="fa fa-star-o"></i><i class="fa fa-star-o"></i><i class="fa fa-star-o"></i>`
        // }
        // else if(averageStars==2){
        //     displayAverageStars = displayAverageStars+ `<i class="fa fa-star-o"></i><i class="fa fa-star-o"></i><i class="fa fa-star-o"></i>`
        // }
        // else if(averageStars==3){
        //     displayAverageStars = displayAverageStars+ `<i class="fa fa-star-o"></i><i class="fa fa-star-o"></i>`
        // }
        // else if(averageStars==4){
        //     displayAverageStars = displayAverageStars+ `<i class="fa fa-star-o"></i>`
        // }
        // else{
        //     displayAverageStars = displayAverageStars;
        // }

        // for(let i=0; i<= productDetail.reviews.length-1;i++){
        //     productReviews = productReviews+`<li>
        //     <div class="product-comments">
        //     <img src="img/author.jpg" alt="" />
        //     <div class="product-comments-content">
        //     <p><strong>${productDetail.reviews[i].name}</strong> -
            
        //     <span class="pro-comments-rating">
        //     ${productDetail.reviews[i].stars} stars
        //     </span>
        //     </p>
        //     <div class="desc">
        //     ${productDetail.reviews[i].comment}
        //     </div>
        //     </div>
        //     </div>
        //     </li>`
        // }

        debugger
        for(let i=0; i<=productDetail.result[0].productGalleryImages.length-1; i++){
            productOtherImages = productOtherImages+`<ul class="single-product-tab" role="tablist">
            <li role="presentation" class="active"><a href="#home" aria-controls="home" role="tab" data-toggle="tab"><img src="${productDetail.result[0].productGalleryImages[i].image}"  alt="" /></a></li>
            </ul>`
        }
        
        
        productD =`<div class="row">
        <div class="col-md-5 col-sm-5 col-xs-12">
        <div class="single-pro-tab-content">
        
        <div class="tab-content">
        <div role="tabpanel" class="tab-pane active" id="home"><a href="#"><img class="zoom" src="${productDetail.result[0].image}" data-zoom-image="img/product/15.jpg" alt="" /></a></div>
        <div role="tabpanel" class="tab-pane" id="profile"><a href="#"><img class="zoom" src="${productDetail.result[0].image}" data-zoom-image="img/product/9.jpg" alt="" /></a></div>
        <div role="tabpanel" class="tab-pane" id="messages"><a href="#"><img class="zoom" src="${productDetail.result[0].image}" data-zoom-image="img/product/3.jpg" alt="" /></a></div>
        <div role="tabpanel" class="tab-pane" id="settings"><a href="#"><img class="zoom" src="${productDetail.result[0].image}" data-zoom-image="img/product/4.jpg" alt="" /></a></div>
        <div role="tabpanel" class="tab-pane" id="settingss"><a href="#"><img class="zoom" src="${productDetail.result[0].image}" data-zoom-image="img/product/4.jpg" alt="" /></a></div>
        </div>
        ${productOtherImages}
        </div>
        </div>
        <div class="col-md-7 col-sm-7 col-xs-12 shop-list shop-details">
        <div class="product-content">
        <h3><a href="product-details.html">${productDetail.result[0].name}</a></h3>
        <div class="price">
        <span>Rs ${productDetail.result[0].price}</span>
        <span class="old">$90.11</span>
        </div>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam fringilla augue nec est tristique auctor. Donec non est at libero vulputate rutrum. Morbi ornare lectus quis justo gravida semper. Nulla tellus mi, vulputate adipiscing cursus eu, suscipit id nulla.</p>
        <div class="pro-size">
        <label>size <span>*</span></label>
        <select>
        <option value="1">Default</option>
        <option value="1">small</option>
        <option value="1">Medium</option>
        <option value="1">Large</option>
        <option value="1">extra large</option>
        </select>
        </div>
        <div class="pro-size">
        <label>color <span>*</span></label>
        <select>
        <option value="1">Black</option>
        <option value="1">White</option>
        <option value="1">Red</option>
        <option value="1">Yellow</option>
        <option value="1">Pink</option>
        </select>
        </div>
        <div class="product-action">
        <div class="button-top">
        <a href="#"><i class="fa fa-heart"></i></a>
        </div>
        <div class="button-cart">
        <button type="button" onclick=addToCart('${JSON.stringify(obj)}')><i class="fa fa-shopping-cart"></i> add to cart</button>
        </div>
        </div>
        <div class="product-share">
        <label>Share:</label>
        <span>
        <a href="#"><i class="fa fa-facebook"></i></a>
        <a href="#"><i class="fa fa-twitter"></i></a>
        <a href="#"><i class="fa fa-google-plus"></i></a>
        <a href="#"><i class="fa fa-linkedin"></i></a>
        <a href="#"><i class="fa fa-pinterest"></i></a>
        </span>
        </div>
        </div>
        </div>
        </div>
      `

    document.getElementById('details').innerHTML = productD;

    }
    ajax.send();   
    showRelatedProducts();
    headerCart();
}



function showRelatedProducts(){
let xhr = new XMLHttpRequest();
let obj = this.getParams(window.location.href);
console.log(obj.category);
xhr.open("GET", "http://localhost:3000/products/?parent_id="+obj.category)
xhr.getResponseHeader("content-type", "application.json")
xhr.onprogress = function(){

}
xhr.onload = function(){
    let relatedProduct = JSON.parse(this.response)
    debugger
    let relatedProductsCards="";
    
    for(let i = 0; i<=relatedProduct.length-1; i++){
        relatedProductsCards = relatedProductsCards +`<div class="single-product">
         <div class="product-img">
         <a onclick="show('${relatedProduct[i].id}','${relatedProduct[i].parent_id}')">
         <img src="${relatedProduct[i].img}" alt="" />
         <img class="secondary-img" src="${relatedProduct[i].product_other_images[0]}" alt="" />
         </a>
         </div>
         <div class="product-content">
         <h3><a onclick="show('${relatedProduct[i].id}','${relatedProduct[i].parent_id}')" >${relatedProduct[i].name}</a></h3>
         <div class="price">
         <span>$${relatedProduct[i].price}</span>
         <span class="old">$90.11</span>
         </div>
         </div>
         </div>`
    }
    
    document.getElementById('relatedproducts').innerHTML = relatedProductsCards;
}
xhr.send();
}

function submitReview(){
    let data = productDetail
    // let id = data;
    // debugger
    // var UpdateReview = {}
    // UpdateReview.name = data.name
    // UpdateReview.img = data.img
    // UpdateReview.size = data.size
    // UpdateReview.color = data.color
    // UpdateReview.price = data.price
    // UpdateReview.quantity = data.quantity
    // UpdateReview.description = data.description
    // UpdateReview.reviews = []
    // UpdateReview.reviews = data.reviews
    
    // var name = document.getElementById('reviewname').value;
   // var email = document.getElementById('email').value;
   //  var comment = document.getElementById('product-message').value;
    var seletectionOfStars = document.getElementById('selectStars');
    var selectedValue = seletectionOfStars.options[seletectionOfStars.selectedIndex].value;
   // UpdateReview.reviews.stars = selectedValue;
    let newReview = {
        name: document.getElementById('reviewname').value,
        email:  document.getElementById('email').value,
        comment: document.getElementById('product-message').value,
        stars: parseInt(selectedValue)
    }

    data.reviews.push(newReview)
    var request = JSON.stringify(data);
    debugger;
    let ajax = new XMLHttpRequest();
    ajax.open("PUT", "http://localhost:3000/products/"+data.id)
    ajax.setRequestHeader("content-type", "application/json")
    ajax.onprogress = function(){

    } 
    ajax.onload = function(){
        var items = this.response;
        alert("Product is updated")
    }
    ajax.send(request);
}