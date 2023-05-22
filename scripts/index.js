
function search() {
      // Get the search query from the input element
      var query = document.getElementById("searchInput").value;

      // Perform the search using the query (replace this with your own search function)
      var results = performSearch(query);

      // Display the search results (replace this with your own display function)
      displayResults(results);
    }

    function performSearch(query) {
      // Replace this with your own search function that returns an array of search results
      return [
        "Result 1",
        "Result 2",
        "Result 3"
      ];
    }

    function displayResults(results) {
      // Get the search results element
      var resultsElement = document.getElementById("searchResults");

      // Clear any previous search results
      resultsElement.innerHTML = "";

      // Add each result to the search results list
      for (var i = 0; i < results.length; i++) {
        var li = document.createElement("li");
        li.appendChild(document.createTextNode(results[i]));
        resultsElement.appendChild(li);
      }
    }

async function FetchData(){
    try{
        let res = await fetch(`http://makeup-api.herokuapp.com/api/v1/products.json?brand=maybelline`)
        res = await res.json()
        console.log(res)
        DisplayData(res)   
    } catch(err){
        console.log("error", err)
    }
}
//FetchData();

let Brand = document.querySelector(".card")

Brand.addEventListener("click", ()=>{
   // FetchData();
   window.location.href="./product.html"
})

let Cart = JSON.parse(localStorage.getItem("cart"))||[]

let Container = document.querySelector("body")

function DisplayData(data){
    Container.innerHTML = ""

    data.forEach((product) => {
        let Card = document.createElement("div")
        let Image = document.createElement("img")
        let Name = document.createElement("h3")
        let Price = document.createElement("h4")
        let Type = document.createElement("h4")
        let AddtoCart = document.createElement("button")

        Image.src = product.image_link;
        Name.textContent = product.name;
        Price.textContent = `₹${product.price}`
        Type.textContent = product.product_type;
        AddtoCart.textContent = "Add To Cart"

        AddtoCart.addEventListener("click", ()=>{
            Cart.push(product)
            localStorage.setItem("cart", JSON.stringify(Cart))
            alert("product added to cart")
        })
        Card.append(Image,Name,Price,Type,AddtoCart)
        Container.append(Card)

    });
}

// script for slideshow

var imgArray = [
  'https://media6.ppl-media.com/tr:w-1280,c-at_max,pr-true,dpr-2/mediafiles/ecomm/misc/1680153474_web.jpg',
  'https://media6.ppl-media.com/tr:w-1280,c-at_max,pr-true,dpr-2/mediafiles/ecomm/misc/1680168530_web-banner.jpg',
  'https://media6.ppl-media.com/tr:w-1280,c-at_max,pr-true,dpr-2,f-gif/mediafiles/ecomm/misc/1680184656_1294x418.gif',
  'https://media6.ppl-media.com/tr:w-1280,c-at_max,pr-true,dpr-2/mediafiles/ecomm/misc/1676992171_web-banner-1.jpg',
  'https://media6.ppl-media.com/tr:w-1280,c-at_max,pr-true,dpr-2,f-gif/mediafiles/ecomm/misc/1679914902_pu_webhp.gif',
  'https://media6.ppl-media.com/tr:w-1280,c-at_max,pr-true,dpr-2,f-gif/mediafiles/ecomm/misc/1680259192_confession-web-banner.gif',
  'https://media6.ppl-media.com/tr:w-1280,c-at_max,pr-true,dpr-2,f-gif/mediafiles/ecomm/misc/1678426468_k-beauty_web_hp.gif'
];
var curIndex = 0;
var imgDuration = 3000;

function slideShow() {
  document.getElementById('image1').src = imgArray[curIndex];
  curIndex++;
  if (curIndex == imgArray.length) { curIndex = 0; }
  setTimeout("slideShow()", imgDuration);
}
slideShow();

// slide show ends here