// jQuery(function($) {
//     $(document).ready( function() {
//     $('.navigation').stickUp();
//     });
//  });
//
//  var fullwidth=false;
//
// $('#nav-toggle').on("click",function(){
//     if (fullwidth===false){
//     $('.categories-li').css("width","100%");
//     fullwidth=true;
//     return
//     }
//
//     if (fullwidth===true){
//     $('.categories-li').css("width","25%");
//     fullwidth=false;
//     return
//     }
//
// });


$('.cl4').on("mouseover", function () {
    var width=$(this).outerWidth();
    var height=$(this).outerHeight();

    $('.sub-menu').css("left",width);
    $('.sub-menu').css("top",3*height);

    $('.sub-li').css("width",width);

})

