function importTheme(){

    let ajax = new XMLHttpRequest();
    ajax.open("GET","http://localhost:3000/settings");
    ajax.setRequestHeader("content-type","application/json");
    ajax.onprogress=function(){};
    ajax.onload=function(){

    let settings = JSON.parse(this.response);  
    localStorage.setItem('theme',JSON.stringify(settings));
    theme();
    }
    ajax.send();

}

function theme(){

    let settings = JSON.parse(localStorage.getItem('theme'));
    var colorScheme = document.documentElement.style;
    colorScheme.setProperty('--background-color', settings.theme.background_color);
    colorScheme.setProperty('--color', settings.theme.color);
    colorScheme.setProperty('--font-size', settings.theme.font_size);
    colorScheme.setProperty('--font-family', settings.theme.font_family);
    colorScheme.setProperty('--header-background', settings.theme.header_background);
    colorScheme.setProperty('--header-font-size', settings.theme.header_font_size);
    colorScheme.setProperty('--header-color', settings.theme.header_color);
    colorScheme.setProperty('--header-hover', settings.theme.header_hover);
    colorScheme.setProperty('--header-cart-color', settings.theme.header_cart_color);
    colorScheme.setProperty('--header-cart-dropdown-background', settings.theme.header_cart_dropdown_background);
    colorScheme.setProperty('--header-cart-dropdown-color', settings.theme.header_cart_dropdown_color);
    colorScheme.setProperty('--header-dropdown-background', settings.theme.header_dropdown_background);
    colorScheme.setProperty('--header-dropdown-color', settings.theme.header_dropdown_color);
    colorScheme.setProperty('--header-dropdown-hover', settings.theme.header_dropdown_hover);
    colorScheme.setProperty('--banner-image', settings.theme.banner_image);
    colorScheme.setProperty('--banner-color', settings.theme.banner_color);
    colorScheme.setProperty('--banner-font-size', settings.theme.banner_font_size);
    colorScheme.setProperty('--btn-background', settings.theme.btn_background);
    colorScheme.setProperty('--btn-color', settings.theme.btn_color);
    colorScheme.setProperty('--btn-hover', settings.theme.btn_hover);
    colorScheme.setProperty('--btn-hover-color', settings.theme.btn_hover_color);
    colorScheme.setProperty('--pagination-color', settings.theme.pagination_color);
    colorScheme.setProperty('--btn-top-background', settings.theme.btn_top_background);
    colorScheme.setProperty('--btn-top-color', settings.theme.btn_top_color);
    colorScheme.setProperty('--btn-top-hover', settings.theme.btn_top_hover);
    colorScheme.setProperty('--btn-top-hover-color', settings.theme.btn_top_hover_color);
    colorScheme.setProperty('--breadcrumb-color', settings.theme.breadcrumb_color);
    colorScheme.setProperty('--breadcrumb-hover', settings.theme.breadcrumb_hover);
    colorScheme.setProperty('--breadcrumb-font-size', settings.theme.breadcrumb_font_size);
    colorScheme.setProperty('--sidebar-title-color', settings.theme.sidebar_title_color);
    colorScheme.setProperty('--sidebar-title-font-size', settings.theme.sidebar_title_font_size);
    colorScheme.setProperty('--product-font-family', settings.theme.product_font_family);
    colorScheme.setProperty('--product-font-size', settings.theme.product_font_size);
    colorScheme.setProperty('--product-color', settings.theme.product_color);
    
    colorScheme.setProperty('--price-color', settings.theme.price_color);
    colorScheme.setProperty('--price-font-size', settings.theme.price_font_size);
    colorScheme.setProperty('--footer-top-background', settings.theme.footer_top_background);
    colorScheme.setProperty('--footer-bottom-background', settings.theme.footer_bottom_background);
    colorScheme.setProperty('--footer-title-color', settings.theme.footer_title_color);
    colorScheme.setProperty('--footer-p-color', settings.theme.footer_p_color);
    colorScheme.setProperty('--footer-p-font-size', settings.theme.footer_p_font_size);
    colorScheme.setProperty('--footer-social-background', settings.theme.footer_social_background);
    colorScheme.setProperty('--footer-social-color', settings.theme.footer_social_color);
    colorScheme.setProperty('--footer-social-hover', settings.theme.footer_social_hover);


    colorScheme.setProperty('--product-details-name-color', settings.theme.product_details_name_color);
    colorScheme.setProperty('--product-details-name-hover', settings.theme.product_details_name_hover);
    colorScheme.setProperty('--product-details-name-font-size', settings.theme.product_details_name_font_size);
    colorScheme.setProperty('--product-details-price-font-size', settings.theme.product_details_price_font_size);
    colorScheme.setProperty('--product-details-p-color', settings.theme.product_details_p_color);
    colorScheme.setProperty('--product-details-star', settings.theme.product_details_star);
    
    colorScheme.setProperty('--homepage-banner1', settings.theme.homepage_banner1);
    colorScheme.setProperty('--homepage-banner2', settings.theme.homepage_banner2);
    colorScheme.setProperty('--homepage-banner3', settings.theme.homepage_banner3);

    colorScheme.setProperty('--slider-color', settings.theme.slider_color);
    colorScheme.setProperty('--slider-p-color', settings.theme.slider_p_color);
    colorScheme.setProperty('--slider-btn-border', settings.theme.slider_btn_border);
    colorScheme.setProperty('--slider-btn-color', settings.theme.slider_btn_color);
    colorScheme.setProperty('--slider-btn-background', settings.theme.slider_btn_background);
    colorScheme.setProperty('--slider-btn-hover-color', settings.theme.slider_btn_hover_color);

    colorScheme.setProperty('--newsletter-background', settings.theme.newsletter_background);
    colorScheme.setProperty('--newsletter-color', settings.theme.newsletter_color);
    colorScheme.setProperty('--newsletter-p-color', settings.theme.newsletter_p_color);





    document.getElementById('logo').src = settings.theme.logo;

}
