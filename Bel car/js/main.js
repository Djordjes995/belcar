
/* SUB MENU */

if ($(window).outerWidth()>990){
    $('.cl4').on("mouseover", function () {
        var width=$(this).outerWidth();
        var height=$(this).outerHeight();

        $('.sub-menu').css("left",width);
        $('.sub-menu').css("top",3*height);

        $('.sub-li').css("width",width);

    })
}

/* DONJI NAVBAR */


var cmw=$('.sub-menu').outerWidth;

if ($(window).outerWidth()>767) {
    $('.active').css("width",cmw);
}

$('.active').on("click", function () {
    $('.category-menu').toggle(200);
})

var strpr=0; //provera za strectch

$('.icon').on("click",function () {
    if (strpr===0){
        $('.strecth').css("display","block");
        strpr=1;
    } else if (strpr===1) {
        $('.strecth').css("display","none");
        strpr=0;
    }
})