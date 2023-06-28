async function fetchProducts(minPrice, maxPrice) {
  const res = await fetch(`api.ecommerce.com/products/${minPrice}/${maxPrice}
    `);
  //I wasn't sure how exactly to write the url with those parameters
  const data = await res.json();
  return data;
}


let minPrice  = 0
let maxPrice = 100000
let products = []

async function scrapeProducts(minPrice, maxPrice) {
    let allProducts

    //Runs until the number of products in there response is less then the maxium. 
    //If products < 1000 we are on the final "page"
    while (true) {
        const { total, count, products: scrapedProducts } = await fetchProducts(minPrice, maxPrice);
        products = products.concat(scrapedProducts);
    
        if (count < 1000) {
          break;
        }
        allProducts = total
        minPrice = scrapedProducts[scrapedProducts.length - 1].price;
    }
    //If the first loop breaks and the total is less then the expected number returned this code will run until it gets the rest of the products.
    while (products.length < allProducts) {
        const { count, products: scrapedProducts } = await fetchProducts(minPrice, maxPrice);
        products = products.concat(scrapedProducts);
        maxPrice = scrapedProducts[scrapedProducts.length - 1].price;
      }
    };
