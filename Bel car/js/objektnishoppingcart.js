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

var newOrder;

var provera=0;

$('.atc').on("click",function () {
    var itemId=$(this).attr("data-id");
    var itemName=$(this).attr("data-name");
    var itemImg=$(this).attr("data-img");

    var prod=new Product(itemId,itemName,itemImg);
    if (provera===0){
        newOrder=new Order();
        provera=1;
    }
    newOrder.addItemToCart(prod);
    console.log(newOrder.items);

})

$('.atw').on("click",function () {
    var itemId=$(this).attr("data-id");

    newOrder.removeItemFromCart(itemId);
    console.log(newOrder.items);
})

