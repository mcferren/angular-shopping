angular-shopping
================

First: clone repo

Second: bower install

Third: npm install


DESCRIPTION

1. Displays all products in products.json in a responsive grid format following these rules:
a. Each product box in the grid should be 200px wide with 10px of margin on all sides.
b. Max products per row=4. 
c. Minimum products per row=1.
d. If a product is not on sale just show the list price
e. If a product is on sale then cross out the list price and show the sales price highlighted in red. 
f. If a product is on sale then show the sale icon “icon_sale.png”  at the top right corner of the product thumbnail.
g. If a product is an “editor’s pick” then show the editor’s pick check icon “icon_editor.png” at the bottom of the product thumbnail.

2. Create a “shopping cart” area at the top of the page that:
a. Displays the cart item total, price total, shipping total, tax total, subtotal and total based on the values in cart.json
b. Displays each of the shipping methods in cart.json with a radio input to allow the user to select one of them.  
c. When a shipping method is selected update the UI totals to reflect that selection. (e.g., If the user selects shipping that costs $9.95 then the shipping total would be $9.95 and the total would be increased by 9.95.

3. Add a search box to the page and filter the products on the page using the keyword(s) entered in that field. Please search against all product fields (e.g., name, designer, merchant etc…)

4. Give each product an “add to cart” button and a quantity input field. When that button is clicked do the following:
a. Update the shopping cart ui to display the product name, price and quantity.
b. Update the cart totals to reflect the addition of the new item. 
c. Give each item in the cart a link to remove the item from the cart. When clicked this should do the reverse of adding the item to the cart.

5. If the product $ total is greater than $500 then set the “Ground Shipping” method as free. If the product $ total falls below $500 then set the “Ground Shipping” method at $9.95.
