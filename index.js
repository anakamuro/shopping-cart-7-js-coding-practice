let cartBtn = document.querySelectorAll('.add-cart');
let products = [
    {
        name: 'Fish Fry',
        tag: 'fishFry', 
        img: 'image/1.png',
        price: 20, 
        incart: 0
    },
    {
        name: 'Fish Fry',
        tag: 'fishFry', 
        img: 'image/10.png',
        price: 20, 
        incart: 0
    },
    {
        name: 'Noodles',
        tag: 'noddles', 
        img: 'image/12.png',
        price: 40, 
        incart: 0
    },
    {
        name: 'paneer Noodles',
        tag: 'paneerNoodle', 
        img: 'image/2.jpg',
        price: 120, 
        incart: 0
    },
    {
        name: 'Fried Rice',
        tag: 'friedRice', 
        img: 'image/20.webp',
        price: 50, 
        incart: 0
    },
    {
        name: 'chiken Rice',
        tag: 'chikenfry', 
        img: 'image/3.jpg',
        price: 200, 
        incart: 0
    },
    {
        name: 'burger',
        tag: 'burger', 
        img: 'image/4.jpg',
        price: 100, 
        incart: 0
    },
];

for(let i = 0; i < cartBtn.length; i++){
    cartBtn[i].addEventListener('click', (e)=> {
        e.preventDefault();
        //console.log('add to cart');
        cartNumbers(products[i]);
        totalCost(products[i])
    })
}

const onLoadCartNumbers = () =>{
    let productNumbers = localStorage.getItem('cartNumbers');
    if(productNumbers){
        document.querySelector('.cart span').innerHTML = productNumbers;
        console.log(productNumbers)
    }
}

// adding products to cart using localstorage
const cartNumbers = (product) => {
    let productNumbers = localStorage.getItem('cartNumbers');
    productNumbers = parseInt(productNumbers);

    if(productNumbers){
        localStorage.setItem('cartNumbers', productNumbers + 1);
        document.querySelector('.cart span').innerHTML = productNumbers + 1;
    } else {
        localStorage.setItem('cartNumbers', 1);
        document.querySelector('.cart span').innerHTML = 1;
    }
    setItems(product)
}

let setItems = (product) => {
    let cartItems = localStorage.getItem('productInCart');
    cartItems = JSON.parse(cartItems);
    if(cartItems != null ){
        if(cartItems[product.tag] == undefined){
            cartItems = {
                ...cartItems, 
                [product.tag]: product
            }
        }
        cartItems[product.tag].incart += 1;
    } else {
        product.incart = 1;
        cartItems = {
            [product.tag]: product
        }
    }
    localStorage.setItem('productInCart', JSON.stringify(cartItems))
}

// calculating total cost of cart

const totalCost = (productCost) => {
    let cartCost = localStorage.getItem('totalCost');
    if(cartCost != null){
        cartCost = parseInt(cartCost);
        localStorage.setItem('totalCost', cartCost + productCost.price)
    } else {
        localStorage.setItem('totalCost', productCost.price)
    }
}

// display products in cart page

const displayCartItems = () => {
    let cartItems = localStorage.getItem('productInCart');
    cartItems = JSON.parse(cartItems);
    let productContainer = document.querySelector('.product-container');
    console.log(productContainer)
    let cartCost = localStorage.getItem('totalCost');
    if(cartItems && productContainer){
        productContainer.innerHTNL = '';
        Object.values(cartItems).map(item => {
            productContainer.innerHTML += `
            <div class="product-item">
            <div class="product">
                <p>&times</p>
                <img src="./${item.img}" alt="">
                <span>${item.name}</span>
            </div>
            <div class="price">$ ${item.price}</div>
            <div class="quantity">
                <p>+</p>
                <span>${item.incart}</span>
                <p>-</p>
            </div>
            <div class="total">$${item.incart * item.price}.00/-</div>
        </div>
            `;
        })
        productContainer.innerHTML += `
        <div class="basketTotalContainer">
            <h4 class="basketTotal-title">Basket Total Price</h4>
            <h4 class="basket-total">${cartCost}.00/-</h4>
        </div>
    `
    }
}
onLoadCartNumbers()
displayCartItems()