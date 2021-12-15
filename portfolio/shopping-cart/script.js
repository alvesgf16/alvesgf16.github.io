function createPriceDisplay() {
  const totalDisplay = document.querySelector('.total-display');

  const priceDisplay = document.createElement('strong');
  priceDisplay.className = 'total-price';
  priceDisplay.innerText = 0;
  
  totalDisplay.appendChild(priceDisplay);
}

function getCartContainer() {
  return document.querySelector('.cart__items');
}

function updateCartTotal() {
  const priceDisplay = document.querySelector('.total-price');
  
  const cartItems = Array.from(getCartContainer().childNodes)
    .filter((node) => node.className !== '.total-display');
  const cartPrices = cartItems.map((cartItem) => parseFloat(cartItem.innerText.split('$')[1], 10));
  const cartTotal = cartPrices.reduce((sum, price) => sum + price, 0).toFixed(2);

  priceDisplay.innerText = `$${cartTotal}`;
}

function storeCart() {
  localStorage.setItem('cart', getCartContainer().innerHTML);
}

function cartItemClickListener(event) {
  event.currentTarget.remove();
  updateCartTotal();
  storeCart();
}  

function getStoredCart() {
  const storedCart = localStorage.getItem('cart');
  
  const cartContainer = getCartContainer();
  cartContainer.innerHTML = storedCart;

  const cartItems = cartContainer.childNodes;
  cartItems.forEach((cartItem) => cartItem.addEventListener('click', cartItemClickListener));

  updateCartTotal();
}

function emptyCart() {
  const cartItems = getCartContainer().childNodes;

  while (cartItems.length > 0) {
    cartItems[0].remove();
  }

  updateCartTotal();
  storeCart();
}

function displayLoadingText() {
  const loadingDisplay = document.createElement('span');
  loadingDisplay.className = 'loading';
  loadingDisplay.innerText = 'Loading...';
  document.body.appendChild(loadingDisplay);
}

async function fetchFromApi(url) {
  displayLoadingText();
  const response = await fetch(url);
  const data = await response.json();
  document.querySelector('.loading').remove();
  return data;
}

function createCustomElement(element, className, innerText) {
  const e = document.createElement(element);
  e.className = className;
  e.innerText = innerText;
  return e;
}

function createProductImageElement(imageSource) {
  const img = document.createElement('img');
  img.className = 'item__image';
  img.src = imageSource;
  return img;
}

function createProductItemElement({ sku, name, image }) {
  const section = document.createElement('section');
  section.className = 'item';

  
  section.appendChild(createProductImageElement(image));
  section.appendChild(createCustomElement('span', 'item__sku', sku));
  section.appendChild(createCustomElement('span', 'item__title', name));
  section.appendChild(createCustomElement('button', 'item__add', 'Adicionar ao carrinho!'));

  return section;
}

function getSkuFromProductItem(item) {
  return item.querySelector('span.item__sku').innerText;
}

function createCartItemElement({ sku, name, salePrice }) {
  const cartItemTitle = document.createElement('h6');
  cartItemTitle.className = 'my-0';
  cartItemTitle.innerText = name;
  
  const cartItemId = document.createElement('small');
  cartItemId.className = 'text-muted';
  cartItemId.innerText = sku;
  
  const cartItemInfo = document.createElement('div');
  cartItemInfo.appendChild(cartItemTitle);
  cartItemInfo.appendChild(cartItemId);
  
  const cartItemPrice = document.createElement('span');
  cartItemPrice.className = 'text-muted';
  cartItemPrice.innerText = `$${salePrice.toFixed(2)}`
  
  const li = document.createElement('li');
  li.className = 'list-group-item d-flex justify-content-between lh-sm';
  li.appendChild(cartItemInfo);
  li.appendChild(cartItemPrice);
  li.addEventListener('click', cartItemClickListener);

  return li;
}

async function addItemToCart(event) {
  const productId = getSkuFromProductItem(event.target.parentElement);
  const productUrl = `https://api.mercadolibre.com/items/${productId}`;
  
  const cartContainer = getCartContainer();
    
  const { id, title, price } = await fetchFromApi(productUrl);
  const cartItem = { sku: id, name: title, salePrice: price };
  cartContainer.appendChild(createCartItemElement(cartItem));
  updateCartTotal();
  storeCart();
}

async function createProductList() {
  const queryTarget = 'computador';
  const queryUrl = `https://api.mercadolibre.com/sites/MLB/search?q=${queryTarget}`;
  
  const itemsDisplay = document.querySelector('.items');
  
  const { results } = await fetchFromApi(queryUrl);
  
  const productItems = results.map(({ id, title, thumbnail }) => ({
    sku: id,
    name: title,
    image: thumbnail }));

  productItems.forEach((productItem) => {
    const productItemElement = createProductItemElement(productItem);
    productItemElement.querySelector('.item__add').addEventListener('click', addItemToCart);
    itemsDisplay.appendChild(productItemElement);
  });
}

window.onload = async () => {
  createPriceDisplay();
  getStoredCart();
  document.querySelector('.empty-cart').addEventListener('click', emptyCart);
  await createProductList();
};
