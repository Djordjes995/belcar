var cart=[]
var item=function (name, price, count=1) {
    this.name=name;
    this.price=price;
    this.count=count;
}

var itemCount=1;

function addItemToCart(name, price, count){
    for (var i in cart){
        if (cart[i].name===name){
            cart[i].count++;
            itemCount=cart[i].count;
            return;
        } else {
            itemCount=cart[i].count;
        }
    }
    var _item=new item(name,price,count);
    cart.push(_item);
}



function prolazKrozCart(imezaproveru){
    for (var i in cart){
        if (cart[i].name===imezaproveru) {
            return true;
        } else {
            return false;
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
    for (var i in cart){
        if (cart[i]===name){
            cart[i].count--;
            if (cart[i].count===0){
                cart.splice(i,1);
            }
            break;
        }
    }
}

function removeItemFromCartAll() {
    for (var i in cart){
        cart.splice(i,1);
    }
}

var jsoncart=[]
function saveCart() {
    jsoncart=JSON.stringify(cart);
    localStorage.setItem("jsoncart", jsoncart);
}

function removeEverything() {
    cart=[];
    saveCart();
}

function loadCart() {
    cart=JSON.parse(localStorage.getItem("jsoncart"));
}


$('.dropdown-menu').fadeOut(1);

$('.atc').on("click", function () {
    var itemName=$(this).attr("data-name");
    var itemPrice=$(this).attr("data-price");
    var count=cartCount();
    addItemToCart(itemName,itemPrice);
    console.log(cart);
    $('.notif').css("visibility","visible");
    $('.notif').html(count+1);

    $('.cart-list').append('<li class="cart-li'+' '+itemName+'" ><div class="row"><div class="col-3 img-col"></div><div class="col-7"><div class="iname">' + itemName + '</div><div class="icount">'+itemCount+ ' '+ 'x'+ itemPrice+'</div><div class="iprice">' + itemPrice + ' $'+ '</div></div><div class="col-2 iksic"><i class="fa fa-times" data-name='+itemName+' aria-hidden="true"></i></div></div></li>');
})

$('.fa-times').on("click", function () {
    var dataname=$(this).attr("data-name");
    for (var i in cart) {
        if (cart[i].name===dataname) {
            cart[i].count=cart[i].count-1;
        }
    }
    $('.'+dataname).remove();
})

$('.cart-click').on("click", function () {
    $('.cart-list').toggle(200);
})