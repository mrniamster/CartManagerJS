# Shopify Cart Manager JS

A mini Cart Management Vanilla Javascript  Library made for Shopify developers with No Dependency + Jquery.
The idea was initally mapped with CartJS.Org ,to make a cartjs library without Jquery and add-on Improvmenets

### Features

- Zero Dependency Shopify Javascript library for cart management.
- No requirement for jQuery.
- Methods like AddCartitem,updatecartitem,getCart,clearCart avaiable similar to CartJS.
- PatchCart Method added : Add products if it doesn't exist to cart or Update the cart qty.
- Small size.
- Returns Updated CartData with each request.
- Custom properties supported.
- Update/ Add product to cart Based upon variatnID / cart line item KEY
### Getting started

```
npm i cartmanagerjs
```

### Example usage:
```
const cartManager = new CartManager();

👀 Get cart items
cartManager.getCart().then(cartData => {
   console.log('Cart Data:', cartData);
 });

👀 Add item to cart
cartManager.addItem('123456789', 2).then(cartData => {
   console.log('Added to Cart:', cartData);
    });

👀 Add item to cart with custom line item properties
 const customProperties = {
   color: 'Red',
   size: 'Large',
   customField: 'Value',
 };

 cartManager.addItem('123456789', 2, customProperties).then(cartData => {
   console.log('Added to Cart with Custom Properties:', cartData);
 });

👀 Remove item from cart
cartManager.removeItem('123456789').then(cartData => {
   console.log('Removed from Cart:', cartData);
 });

👀 Update item quantity in cart
 cartManager.updateItem('123456789', 3).then(cartData => {
   console.log('Updated Cart:', cartData);
 });


👀 Fetch the cart
cartManager.fetchCart().then(() => {
   Update a cart item by key
    cartManager.updateItem('your_item_key_here', 2, { custom_property: 'new_value' });

   // Or update a cart item by variantId
   cartManager.updateItem('your_variant_id_here', 3, { custom_property: 'another_value' });
 });

👀  Patch the CartItem
cartManager.patchCartItem('your-identifier', 'your-variant-id', 2, { customProperty: 'value' });

```
### Improvement 
Please ⭐️ star this repo to add more frequest updates, PR's welcomes


### Todo
- [ ] Support for setNotes in CartJS