// STEP 0: Define product array
// Purpose: Store all added product objects in a single array.
const storedProducts = JSON.parse(localStorage.getItem('products'));
let products = storedProducts || [];

renderListItems();

// STEP 1: Define function renderListItems()
// Purpose: Display all products and the total cost.
// STEP 1.1: Select the HTML element with id "listContainer".
// STEP 1.2: Clear the existing innerHTML inside "listContainer".
// STEP 1.3: Create a variable "totalCost" to track total price.
// STEP 1.4: Loop through each product in the products array.
// STEP 1.4.1: For each product, call ListItem() and pass its info.
// STEP 1.4.2: Add the returned HTML to "listContainer" using innerHTML +=
// STEP 1.4.3: Multiply price by count and add it to totalCost.
// STEP 1.5: After the loop, select the element with id "totalDisplay".
// STEP 1.6: Set its textContent to show the total cost in dollars.
function renderListItems(){
    const listContainer = document.getElementById('listContainer');
    listContainer.innerHTML = '';
    let totalCost = 0;

    const storedProducts = JSON.parse(localStorage.getItem('products'));
    products.forEach((p, index) => {
        const item =listItem(index, p.name, p.price, p.image, p.count);
        listContainer.innerHTML += item;
        totalCost += (p.price*p.count);
    })
    const totalDisplay = document.getElementById('totalDisplay');
    totalDisplay.textContent = `TOTAL: $ ${parseFloat(totalCost).toFixed(2)}`;
}

// STEP 2: Define function ListItem(index, name, price, image, count)
// Purpose: Return an HTML string representing a product item.
// STEP 2.1: Show product name and its price x quantity.
// STEP 2.2: Include an image element using the given URL.
// STEP 2.3: Add a "+" button that calls increaseCount() with index and count.
// STEP 2.4: Add a "Remove" button that calls removeItem() using index.
function listItem(index, name, price, imageUrl, count){
    const itemDiv = `
        <div id='item-${index}' class='itemContainer'>
            <img class='itemImg' src="${imageUrl}">
            <div class="itemInfoContainer">
                <span class="itemName">${name}</span> 
                <span class="itemPrice">$${price}</span>
            </div>
            <div class="itemCountContainer">
                <span class='itemCount'>${count}</span>
                <div class='itemBtns'>
                <button onclick='decreaseCount(${index})' class="countBtn decreaseCountBtn">-</button>
                <button onclick='increaseCount(${index})' class="countBtn increaseCountBtn">+</button>
                <button class='removeItemBtn' onclick='removeItem(${index})'>REMOVE</button>
                </div>
            </div>
        </div>`
    return itemDiv;
}



// Using push() to add products
// We use products.push({ name, price, image, count }) to insert new products into the cart array.

// STEP 4: Add product with validation when "+" button is clicked
// STEP 4.1: Add event listener to "addButton".
// STEP 4.2: Inside the event, get values from input fields.
// STEP 4.3: Trim product name and image, and parse price as float.
// STEP 4.4: If name is empty, price is invalid, or image is empty, show alert.
// STEP 4.5: If valid, use push() to add the product object to products array.
// STEP 4.6: Save updated array to localStorage using JSON.stringify().
// STEP 4.7: Call renderListItems() to update UI.
const addItemBtn = document.getElementById('addButton');
addItemBtn.addEventListener('click', () => {
    const productName = document.getElementById('productName');
    const productPrice = document.getElementById('productPrice');
    const productImage = document.getElementById('productImage');
    console.log(productName, productPrice, productImage);
    if(productName.value.trim() === '' || 
        parseFloat(productPrice.value).toFixed(2) < 0 || productImage.value.trim() === '')
    {
        alert('INVALID INPUT')
    }
    else{
        products.push({
            'name': productName.value.trim(),
            'price': parseFloat(productPrice.value).toFixed(2),
            'image': productImage.value.trim(),
            'count': 1
        })
    }
    productName.value = '';
    productPrice.value = '';
    productImage.value = '';
    localStorage.setItem('products', JSON.stringify(products));
    renderListItems();
})


// Using splice() to remove products
// We use products.splice(index, 1) to delete a product from the array.
function removeItem(index){
    products.splice(index, 1);
    localStorage.setItem('products', JSON.stringify(products));
    renderListItems();
}

// STEP 5: Prevent user from adding more than 10 of same product
// STEP 5.1: Define function increaseCount(idx, count)
// STEP 5.2: If count is already 10 or more, show alert and return.
// STEP 5.3: If less than 10, increase count by 1.
// STEP 5.4: Update the count of that product in the array.
// STEP 5.5: Save updated array to localStorage.
// STEP 5.6: Call renderListItems() to refresh display.
function increaseCount(index){
    let product = products.at(index);
    if(product.count < 10){
        product.count += 1;
        products.splice(index,1, product);
        localStorage.setItem('products', JSON.stringify(products));
        renderListItems();
    }else{
        alert('TOO MANY ITEMS');
    }
}


function decreaseCount(index){
    let product =products.at(index);
    if(product.count > 0){
        product.count -= 1;
        products.splice(index,1,product);
        localStorage.setItem('products', JSON.stringify(products));
        renderListItems();
    }else{
        alert('TOO LESS ITEMS');
    }
}

// STEP 7: Create a "Clear Saved Cart" button
// STEP 7.1: Create a button element using document.createElement()
// STEP 7.2: Set its textContent to "Clear Saved Cart".
// STEP 7.3: Set an onclick function that does the following:
// STEP 7.3.1: Remove "products" from localStorage.
// STEP 7.3.2: Set products = [].
// STEP 7.3.3: Call renderListItems().
// STEP 7.4: Append the button to the document body.
const clearBtn = document.createElement('button');
clearBtn.textContent = 'CLEAR SAVED CART';
clearBtn.onclick = function(){
    localStorage.removeItem('products');
    products = [];
    renderListItems();
   
}
const btnWrapper = document.getElementById('clearCartBtnWrapper');
btnWrapper.appendChild(clearBtn);