import toast from "react-hot-toast"

export function getCart(){

    const cartString = localStorage.getItem("cart")

    if(cartString == null){
        localStorage.setItem("cart","[]") //cart is saved as a string
        return[]
    }else{
        const cart = JSON.parse(cartString) //converting cart string to array
        return cart
    }

}

export function addToCart(product,qty){
    const cart = getCart()
    const index = cart.findIndex(
        (item)=>{
            return item.productID == product.productID
        }
    )
    if(index == -1){
        cart.push({
            productID : product.productID,
            name : product.name,
            qty : qty,
            price : product.price,
            labeledprice : product.labeledPrice,
            image : product.images[0]
        })
        toast.success(`${product.name} added to cart`)
    }else{
        const newQty = cart[index].qty + qty
        if(newQty <= 0){
            cart.splice(index , 1)
            toast.success(`${product.name} removed from cart`)
        }else{
            cart[index].qty = newQty
            toast.success(`Updated ${product.name} qunatity to ${newQty}`)
        }
    }
    const cartString = JSON.stringify(cart)
    localStorage.setItem("cart" , cartString)

}

export function emptyCart(){
    localStorage.setItem("cart","[]") 
}

export function getTotal(){
    let total = 0
    const cart = getCart()

    cart.forEach((item) => {
        total += item.price * item.qty
    });
    return total
}