class CartManager {
  constructor() {
    this.cartUrl = '/cart.js';
    this.cartAddUrl = '/cart/add.js';
    this.cartUpdateUrl = '/cart/update.js';
    this.cartChangeUrl = '/cart/change.js';
    this.cartClearUrl = '/cart/clear.js';
    this.cart
  }

  async getCart() {
    try {
      const response = await fetch(this.cartUrl, { method: 'GET', headers: { 'Content-Type': 'application/json' } });
      const cartData = await response.json();
      this.cart = cartData;
      return cartData;
    } catch (error) {
      console.error('Error fetching cart:', error);
      return null;
    }
  }

async addItem(variantId, quantity = 1, customProperties = {}) {
  try {
    const lineItem = { id: variantId, quantity, properties: customProperties };
    const response = await fetch(this.cartAddUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        items: [lineItem],
      }),
    });
    const cartData = await response.json();
    this.cart = cartData;
    console.log('Item added to cart:', cartData);
    return cartData;
  } catch (error) {
    console.error('Error adding item to cart:', error);
    return null;
  }
}


async removeItem(identifier) {
    try {
      // Check if the identifier is a variant ID or key
      const isVariantId = !isNaN(identifier);

      const updateData = {
        updates: {},
      };

      if (isVariantId) {
        // If it's a variant ID, update the quantity to 0
        updateData.updates[identifier] = 0;
      } else {
        // If it's a key, find the corresponding item and update its quantity to 0
        const itemToRemove = this.cart.items.find(item => item.key === identifier);
        if (itemToRemove) {
          updateData.updates[itemToRemove.id] = 0;
        } else {
          console.error('Cart item with key not found:', identifier);
          return null;
        }
      }

      const response = await fetch(this.cartUpdateUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updateData),
      });
      const cartData = await response.json();
      this.cart = cartData;
      console.log('Item removed from cart:', cartData);
      return cartData;
    } catch (error) {
      console.error('Error removing item from cart:', error);
      return null;
    }
  }


  // Update a cart item by key or variantId with a new quantity and optional custom properties
async updateCartItem(identifier, newQuantity, newProperties = {}) {
    if (!this.cart) {
      console.error('Cart not fetched. Call fetchCart() first.');
      return;
    }

    // Find the cart item based on key or variantId
    const itemToUpdate = this.cart.items.find(
      item => item.key === identifier || item.variant_id.toString() === identifier
    );

    if (itemToUpdate) {
      // Prepare the data for updating the item
      const updateData = {
        updates: {}
      };

      // Set the new quantity if provided
      if (newQuantity !== undefined) {
        updateData.updates[identifier] = newQuantity;
      }

      // Set the new properties if provided
      if (Object.keys(newProperties).length > 0) {
        updateData.note_attributes = [];
        for (const key in newProperties) {
          updateData.note_attributes.push({
            name: key,
            value: newProperties[key]
          });
        }
      }

      try {
        const response = await fetch(this.cartUpdateUrl, {
          method: 'POST',
          body: JSON.stringify(updateData),
          headers: {
            'Content-Type': 'application/json'
          }
        });
        const updatedCart = await response.json();
        this.cart = updatedCart;
        console.log('Cart item updated:', updatedCart);
        // Handle success, e.g., update the cart UI
      } catch (error) {
        console.error('Error updating cart:', error);
        // Handle error
        throw error;
      }
    } else {
      console.error('Cart item with key or variantId not found:', identifier);
      // Handle the case where the item with the specified key or variantId is not in the cart
    }
}
  
  async patchCartItem(identifier, variantId, quantity = 1, customProperties = {}) {
    try {
      // Find the cart item based on key or variantId
      const itemToUpdate = this.cart.items.find(
        item => item.key === identifier || item.variant_id.toString() === identifier
      );

      const lineItem = { id: variantId, quantity, properties: customProperties };

      if (itemToUpdate) {
        // If the item already exists, update it
        const updateData = {
          updates: {
            [identifier]: quantity,
          },
        };

        if (Object.keys(customProperties).length > 0) {
          updateData.note_attributes = [];
          for (const key in customProperties) {
            updateData.note_attributes.push({
              name: key,
              value: customProperties[key],
            });
          }
        }

        const response = await fetch(this.cartUpdateUrl, {
          method: 'POST',
          body: JSON.stringify(updateData),
          headers: {
            'Content-Type': 'application/json',
          },
        });
        const updatedCart = await response.json();
        this.cart = updatedCart;
        console.log('Cart item updated:', updatedCart);
        return updatedCart;
      } else {
        // If the item doesn't exist, add it
        const response = await fetch(this.cartUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            items: [lineItem],
          }),
        });
        const cartData = await response.json();
        this.cart = cartData;
        console.log('Item added to cart:', cartData);
        return cartData;
      }
    } catch (error) {
      console.error('Error patching cart:', error);
      return null;
    }
  }

async clearCart() {
    try {
      const response = await fetch(this.cartClearUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ updates: {} }), // Set all quantities to 0 to clear the cart
      });
      const cartData = await response.json();
      this.cart = cartData;
      console.log('Cart cleared:', cartData);
      return cartData;
    } catch (error) {
      console.error('Error clearing cart:', error);
      return null;
    }
  }
}
export default CartManager;
// // Example usage:
// const cartManager = new CartManager();

// // Get cart items
// cartManager.getCart().then(cartData => {
//   console.log('Cart Data:', cartData);
// });

// // Add item to cart
// cartManager.addItem('123456789', 2).then(cartData => {
//   console.log('Added to Cart:', cartData);
// });

// Add item to cart with custom line item properties
// const customProperties = {
//   color: 'Red',
//   size: 'Large',
//   customField: 'Value',
// };

// cartManager.addItem('123456789', 2, customProperties).then(cartData => {
//   console.log('Added to Cart with Custom Properties:', cartData);
// });
// // Remove item from cart
// cartManager.removeItem('123456789').then(cartData => {
//   console.log('Removed from Cart:', cartData);
// });

// // Update item quantity in cart
// cartManager.updateItem('123456789', 3).then(cartData => {
//   console.log('Updated Cart:', cartData);
// });


// Fetch the cart
// cartManager.fetchCart().then(() => {
//   // Update a cart item by key
//   cartManager.updateItem('your_item_key_here', 2, { custom_property: 'new_value' });

//   // Or update a cart item by variantId
//   cartManager.updateItem('your_variant_id_here', 3, { custom_property: 'another_value' });
// });

// cartManager.patchCartItem('your-identifier', 'your-variant-id', 2, { customProperty: 'value' });
