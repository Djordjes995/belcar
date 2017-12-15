var cart=[]
var item=function (name, price, count=1) {
    this.name=name;
    this.price=price;
    this.count=count;
}

var itemCount=1;
var pocetak=0;

function addItemToCart(name, price, count){
    for (var i in cart){
        if (cart[i].name===name){
            cart[i].count++;
            itemCount=cart[i].count;
            return false;
        } else {
            if (pocetak===0){
                itemCount=1;
                pocetak=1;
            } else {
                itemCount=cart[i].count;
            }
        }
    }
    var _item=new item(name,price,count);
    cart.push(_item);
    return true;
}



function prolazKrozCart(imezaproveru){
    for (var i in cart){
        if (cart[i].name===imezaproveru) {
            return cart[i];
        }
    }
}

function cartCount() {
    var totalCount=0;
    for (var i in cart){
        totalCount+=cart[i].count;
    }
    return totalCount;
}

function cartCost() {
    var totalCost=0;
    for (var i in cart){
        totalCost+=cart[i].price*cart[i].count;
    }
    return totalCost;
}

function removeItemFromCart(name) {
    for (var i in cart) {
        if (cart[i].name === name) {
            cart[i].count--;
            if (cart[i].count === 0) {
                cart.splice(i, 1);
            }
            break;
        }
    }
    saveCart();
}

function removeItemFromCartAll() {
    for (var i in cart){
        cart.splice(i,1);
    }
}

var jsoncart=[]
function saveCart() {
    jsoncart=JSON.stringify(cart);
    localStorage.setItem("belcarcart", jsoncart);
}

function removeEverything() {
    cart=[];
    saveCart();
}

function loadCart() {
    cart=JSON.parse(localStorage.getItem("belcarcart"));
}


$('.dropdown-menu').hide(1);

$('.atc').on("click", function () {
    var itemName=$(this).attr("data-name");
    var itemPrice=$(this).attr("data-price");
    var count=cartCount();
    var isNEw=addItemToCart(itemName,itemPrice);
    console.log(cart);
    $('.notif').css("visibility","visible");
    $('.notif').html(count+1);

    if (isNEw){
        $('.cart-list').append('<li data-name-unique="'+ itemName +'" class="cart-li'+' '+itemName+'" ><div class="row"><div class="col-3 img-col"></div><div class="col-7"><div class="iname">' + itemName + '</div><div class="icount">'+prolazKrozCart(itemName).count+ ' '+ 'x'+ itemPrice+'</div><div class="iprice">' + itemPrice + ' $'+ '</div></div><div class="col-2 iksic"><i class="fa fa-times" data-name='+itemName+' aria-hidden="true"></i></div></div></li>');
    } else {
        var productRow=$("li").find("[data-name-unique='" + itemName + "']");
        $(productRow.find(".icount")).html(itemCount+" x "+itemPrice+"$");
    }

    alert(itemName+" je dodat u korpu!");
})

$(document).on("click", '.fa-times',function () {
    var dataname=$(this).attr("data-name");

    var cartitem=prolazKrozCart(dataname);
    removeItemFromCart(dataname);

    if(cartitem.count>0) {
        $("li").find("[data-name-unique='" + dataname + "']").find(".icount").html(cartitem.count+" x " + cartitem.price+" $");
    } else {
        $("li").find("[data-name-unique='" + dataname + "']").remove();
    }

    $('.notif').html(cartCount());
})

$('.vecifa').on("click", function () {
    $('.cart-list').toggle(200);
})

$('#checkout').on("click",function () {
    saveCart();
    if (cart===[]) {
        alert('Korpa je prazna');
    } else {
        alert('Korpa je sacuvana');
    }
})

$('#load').on("click",function () {
    loadCart();
    alert('Korpa ucitana!');
})

$('#clear-cart').on("click",function () {
    removeEverything();
    $('.cart-list').empty();
    alert('Korpa je izbrisana');
    $('.notif').fadeOut(200);
})