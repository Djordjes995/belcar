function Order(id) {
    this.items=[];
    this._id=id;
}

Order.prototype.addItemToCart=function (prod) {
    for (var i in this.items){
        if (this.items[i]._product._qstock<1){
            alert("Ne mozete vise dodavati ovog proizvoda");
            return;
        }
        if(this.items[i]._product._id===prod._id){
            this.items[i]._product._qstock--;
            this.items[i]._quantity++;
            return false;
        }
    }
    var oi=new OrderItem(prod);
    this.items.push(oi);
    return true;
}

Order.prototype.removeItemFromCart=function (id) {
    for (var i in this.items){
        if(this.items[i]._product._id===id){
            this.items[i]._quantity--;
            this.items[i]._product._qstock++;
            if (this.items[i]._quantity===0){
                this.items.splice(i,1);
            }
        }
    }
}

Order.prototype.cartCount=function () {
    var totalCount=0;
    for (var i in this.items){
        totalCount+=this.items[i]._quantity;
    }
        return totalCount;
}

Order.prototype.itemCount=function (id) {
    var count=0;
    for (var i in this.items){
        if(this.items[i]._product._id===id) {
            return this.items[i]._quantity;
        }
    }
}

function OrderItem(product,quantity=1) {
    this._order=new Order();
    this._product=product;
    this._quantity=quantity;
}

function Product(id,name,image,qstock=19) {
    this._id=id;
    this._name=name;
    this._image=image;
    this._qstock=qstock;
}

function saveCart(){
    jsoncart=JSON.stringify(newOrder);
    localStorage.setItem('objektnicart',jsoncart);
}

function loadCart() {
    newOrder=JSON.parse(localStorage.getItem('objektnicart'));
}


var jsoncart=[]
var newOrder;
var provera=0;

$('.atc').on("click",function () {
    var itemId=$(this).attr("data-id");
    var itemName=$(this).attr("data-name");
    var itemImg=$(this).attr("data-img");
    var itemPrice=$(this).attr("data-price");

    var prod=new Product(itemId,itemName,itemImg);
    if (provera===0){
        newOrder=new Order();
        provera=1;
    }
    var isnew=newOrder.addItemToCart(prod);
    $('.notif').css("visibility","visible");
    $('.notif').html(newOrder.cartCount());

    if (isnew){
        $('.cart-list').append('<li data-name-unique="'+ itemName +'" class="cart-li'+' '+itemName+'" ><div class="row"><div class="col-4 img-col"></div><div class="col-6"><div class="iname">' + itemName + '</div><div class="icount">'+newOrder.itemCount(itemId)+ ' '+ 'x'+ itemPrice+'</div><div class="iprice">' + itemPrice + ' $'+ '</div></div><div class="col-2 iksic"><i class="fa fa-times" data-name='+itemName+' aria-hidden="true"></i></div></div></li>');
    } else {
        var productRow=$("li").find("[data-name-unique='" + itemName + "']");
        $(productRow.find(".icount")).html(newOrder.itemCount(itemId)+" x "+itemPrice+"$");
    }

    console.log(newOrder.items);

})

$('.atw').on("click",function () {
    var itemId=$(this).attr("data-id");

    newOrder.removeItemFromCart(itemId);
    console.log(newOrder.items);
})

$('#checkout').on("click",function () { //cuvanje
    saveCart();
    alert('Korpa je sacuvana');
})

$('#load').on("click",function () { //loadovanje
    loadCart();
    alert('Korpa ucitana!');
})

