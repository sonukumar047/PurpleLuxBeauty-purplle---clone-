// let cart=JSON.parse(localStorage.getItem("cart"))||[];

// //get the data

// const getData=async()=>{
//     try{
//         const response=await fetch("http://127.0.0.1:9090/products");
//         const data=await response.json();
//         console.log(data);
//         append(data)
//     }catch(error){
//         console.log(error);
//     }
// };
// getData();

// const append = (data) => {
//     //catch the target
//     const container=document.querySelector(".products_div");
//     container.innerHTML=null;

//     data.map((el)=>{
//         //1.create all htmls
//         const div=document.createElement("div");
//         const img=document.createElement("img");
//         const productName=document.createElement("h3");
//         const price=document.createElement("p");
//         const offer=document.createElement("p")
//         const addToCart=document.createElement("button");
   

//         //2.giving style and attribute to the tag
//         img.src=el.image;
//         productName.innerText=el.productName;
//         price.innerText=`Price-${el.price}`;
//        offer.innertext=`Offer-${el.offer}`;
//         addToCart.innerText="Add To Cart";
      

//         //3.add EventListener

//        addToCart.addEventListener("click", ()=>{
//         if(checkDuplicate(el)){
//             alert("product already in cart")
//         }else{
//             cart.push({...el, qty:1})
//             localStorage.setItem("cart",JSON.stringify(cart))
//             alert("Product added to Cart")
//         }
//        })

//     //    Adding eventlistner on buy button

//     buy.addEventListener("click", ()=>{
//         alert("Please Select The Payment Mode");
//     })



//         //4.Append
//         div.append(img,productName,price,offer,addToCart)
//         container.append(div);
//     })
// }

// function checkDuplicate(el){
//     for(let i=0; i<cart.length; i++){
//         if(cart[i].id == el.id){
//             return true;
//         }
//     }
//     return false;
// }





let userId=Number(JSON.parse(localStorage.getItem("userId")))
//JSON.parse(localStorage.getItem("userId"))
console.log(userId);
let cart = JSON.parse(localStorage.getItem("cart")) || [];
let products =[]


const getData = async () => {
  try {
    const response = await fetch("http://127.0.0.1:9090/products");
    const data = await response.json();
    console.log(data);
    products = data
    append(data);
  } catch (error) {
    console.log(error);
  }
};
getData();

const append = (data) => {

  const container = document.querySelector(".products_div");
  container.innerHTML = null;

  data.forEach((el) => {
    if (el.elite==false) {
        return;
    }
    const div = document.createElement("div");
    const img = document.createElement("img");
    const productName = document.createElement("h3");
    const newprice=document.createElement("p")
    newprice.classList.add("newprice")
    const price = document.createElement("p");
    // const category = document.createElement("p");
   const addToCart = document.createElement("button");
   const wrap =document.createElement("div");
 wrap.classList.add("hoveryimage");
   addToCart.classList.add("cartandimage");


    img.src = el.image;
    productName.innerText = el.productName;
    newprice.innerText=` ₹${((el.price)-(el.offer))}`
    price.innerText =  el.price 
    // category.innerText = `Category: ${el.category}`;
    addToCart.innerText = "Add To Cart";
    addToCart.dataset[`id`] =el.id

addToCart.addEventListener("click",gotocart)

wrap.append(img,addToCart)

    div.append(
    //   img,
    wrap,
      productName,
      newprice,
      price,
    // category,
    // addToCart
    );
    container.append(div);
  });
};
async function gotocart(e){
    prodId =e.target.dataset.id
    let product =null
     products.forEach((ele)=>{
        if(ele.id==prodId){
            product=ele
        }
     })
    console.log(userId,product);
    let res =await fetch("http://127.0.0.1:9090/cart",{
        method:"POST",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify({userId,product})
    })
    console.log(res)
    let data = await res.json()
    console.log(data);
}

function checkDuplicate(el) {
  for (let i = 0; i < cart.length; i++) {
    if (cart[i].id == el.id) {
      return true;
    }
  }
  return false;
}
async function getProductsByAscPrice(){
    let res = await fetch(`http://127.0.0.1:9090/products?_sort=price&_order=asc`)
    let data =await res.json()
    append(data)
    
}
async function getProductsByAscPrice(){
    let res = await fetch(`http://127.0.0.1:9090/products?_sort=price&_order=desc`)
    let data =await res.json()
    append(data)
    
}
async function getproductByCtaegory(e){
    let category = e.target.dataset.category
    let res = await fetch(`http://127.0.0.1:9090/products?category=${category}`)
    let response = await res.json()
    append(response)

}
