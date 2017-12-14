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

$('.atc').on("click", function () {
    var itemName=$(this).attr("data-name");
    var itemPrice=$(this).attr("data-price");
    addItemToCart(itemName,itemPrice);
    console.log(cart);
})