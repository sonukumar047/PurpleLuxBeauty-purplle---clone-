









 //let data = JSON.parse(localStorage.getItem("cart")) || [];
let userId = (JSON.parse(localStorage.getItem("userId")))
console.log(userId);
 var data =[]
 let products=[]
async function getdata(){
    let res = await fetch(`http://127.0.0.1:9090/cart?userId=${userId}`)
      products = await res.json()
      console.log(products);
   data =products[0].products
    console.log(data);
    append(data); 
}

getdata()

const append = (products) => {
    const container = document.querySelector(".div4");
    container.innerHTML = null;

    products.forEach((el) => {
     
        const div = document.createElement("div");
   div.classList.add("parent")
        const img = document.createElement("img");
        const div1=document.createElement("div");
        div.classList.add("div1")
        const h3 = document.createElement("h3");
        const price=document.createElement("p");
        price.classList.add("price1")
        const priceP = document.createElement("p");
        priceP.classList.add("price")
        const offer=document.createElement("p");
        offer.classList.add("offer")
       let qty = document.createElement("p");
        const remove = document.createElement("button");
        remove.classList.add("remove")
        const movetowishlist=document.createElement("button")
        movetowishlist.classList.add("movetowishlist")
        movetowishlist.setAttribute("data-id","wishlist")
        movetowishlist.setAttribute("data-id",el.id)
        img.src = el.image;
        h3.innerText = el.productName;
        price.innerText=`₹${el.price}`
        priceP.innerText = `₹${(el.price-el.offer)}`
        offer.innerText=`₹${el.offer}`

   

        remove.innerText = "Remove";
        movetowishlist.innerText="Move to Wishlist"
       

        let drop = document.createElement("select")
        let opt1 =document.createElement("option")
        let opt2 =document.createElement("option")
        let opt3 =document.createElement("option")
        let opt4 =document.createElement("option")
        let opt5 =document.createElement("option")
        opt1.innerText=1
        opt2.innerText=2
        opt3.innerText =3
        opt4.innerText=4
        opt5.innerText=5
        drop.append(opt1,opt2,opt3,opt4,opt5)
        drop.addEventListener("change",changeQuantity)

        function changeQuantity(e){
            // console.log(e.target.value);
            let quantity = e.target.value
            totalPrice(products, quantity)

        }



 drop.classList.add("drop")
        remove.addEventListener("click", () => {
            products = products.filter((ele) => {
                return ele.id !== el.id;
            })
            localStorage.setItem("cart", JSON.stringify(products))
            append(products)
         
        })

function totalPrice(products, quantity=1 ) {
        
        const totalMRP = products.reduce((acc, el) => acc + Number(el.price), 0)*quantity;
        const totalOffer = products.reduce((acc, el) => acc + Number(el.offer), 0);
       const ship=Number(50)
    
    
        const totalContainer = document.querySelector(".totalmrp");
         const totalOffercont=document.querySelector(".savingonmrp");
         const subtotal=document.querySelector(".subtotal");
         const shippingcharges=document.querySelector(".shippingcharges");
         const ordertotal=document.querySelector(".ordertotal");
         const yousave=document.querySelector(".yousave")
        totalContainer.innerHTML = `₹${Number(totalMRP)}`;
        totalOffercont.innerHTML= `₹${totalOffer}`;
        subtotal.innerHTML=`₹${totalMRP-totalOffer}`;
        shippingcharges.innerHTML=`₹${ship}`;
        ordertotal.innerHTML=`₹${totalMRP-totalOffer+ship}`;
        yousave.innerHTML=`₹${totalOffer}`

}
totalPrice(products)



        movetowishlist.addEventListener("click",gotowishlist)
       div1.append(h3,drop,movetowishlist,remove)
        div.append(img,div1, priceP,price,offer)
        container.append(div);
    })
}
async function gotowishlist(e){
    prodId =e.target.dataset.id
    let product =null
    console.log(prodId);
    products[0].products.forEach((ele)=>{
        if(ele.id==prodId){
            product=ele
        }
     })
    console.log(product);
    let res =await fetch("http://127.0.0.1:9090/wishlist",{
        method:"POST",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify({userId,product})
    })
    let data = await res.json()
    console.log(data);
}































// let data = JSON.parse(localStorage.getItem("cart")) || [];

// // const totalPrice = (data) => {
// //     let total = 0;
// //     data.map((el) => {
// //         total += el.price * el.qty;
// //     })
// //     const span = document.querySelector("#totalPriceSpan")
// //     span.innerText = total;
// // }
// // totalPrice(data);
// let userId = JSON.parse(localStorage.getItem("userId"))
// async function getdata(){
//     let res = await fetch(`http://127.0.0.1:9090/cart?id=${userId}`)
//     data = await res.json()
//     console.log(data);
// }
// getdata()
// const append = (data) => {
//     const container = document.querySelector(".div4");
//     container.innerHTML = null;

//     data.forEach((el) => {
//         //1.create all htmls
//         const div = document.createElement("div");

//         const img = document.createElement("img");
//         const div1=document.createElement("div");
//         const h3 = document.createElement("h3");
//         const priceP = document.createElement("p");
     
//         const qty = document.createElement("button");
//         const remove = document.createElement("button");
//         const movetowishlist=document.createElement("button")
   

//         //2.giving style and attribute to the tag
//         img.src = el.image;
        
//         h3.innerText = el.productName;
//         priceP.innerText = `Price-${el.price}`;
//        // brandP.innerText = `Brand Name-${el.brand}`
//         qty.innerText = `Qty - ${el.qty}`
//         remove.innerText = "Remove";
//         movetowishlist.innerText="Move to Wishlist"
    

//         // Adding eventlistener on remove button
//         remove.addEventListener("click", () => {
//             data = data.filter((ele) => {
//                 return ele.id !== el.id;
//             })
//             localStorage.setItem("cart", JSON.stringify(data))
//             append(data)
//             totalPrice(data);
//         })

//         // // Addind eventlistener on increase button
//         // increment.addEventListener("click", () => {
//         //     el = el.qty++;
//         //     localStorage.setItem("cart", JSON.stringify(data))
//         //     append(data);
//         //     totalPrice(data);
//         // })

//         // // Addind eventlistener on deccrease button
//         // decrement.addEventListener("click", () => {
//         //     if (el.qty > 1) {
//         //         el = el.qty--;
//         //         localStorage.setItem("cart", JSON.stringify(data))
//         //         append(data);
//         //         totalPrice(data);
//         //     }
//         // })

//         movetowishlist.addEventListener("click", () => {
//             // Code to move item to wishlist
//           });

//        div1.append(h3,qty,remove,movetowishlist)

//         //4.Append
//         div.append(img,div1, priceP,remove)
//         container.append(div);
//     })
// }

// //append(data);