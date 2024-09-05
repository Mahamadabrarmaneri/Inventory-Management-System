let inventory = [];
let currentId = 0;

// DOM elements
const itemForm = document.getElementById('itemForm');
const itemId = document.getElementById('itemId');
const itemName = document.getElementById('itemName');
const itemQuantity = document.getElementById('itemQuantity');
const itemPrice = document.getElementById('itemPrice');
const itemCategory = document.getElementById('itemCategory');
const inventoryBody = document.getElementById('inventoryBody');
const searchInput = document.getElementById('searchInput');
const sortSelect = document.getElementById('sortSelect');
const totalValueSpan = document.getElementById('totalValue');

// Event listeners
itemForm.addEventListener('submit', addOrUpdateItem);
searchInput.addEventListener('input', filterItems);
sortSelect.addEventListener('change', sortItems);

function addOrUpdateItem(e) {
    e.preventDefault();
    
    if (itemId.value) {
        // Update existing item
        const index = inventory.findIndex(item => item.id === parseInt(itemId.value));
        inventory[index] = {
            id: parseInt(itemId.value),
            name: itemName.value,
            quantity: parseInt(itemQuantity.value),
            price: parseFloat(itemPrice.value),
            category: itemCategory.value
        };
    } else {
        // Add new item
        const newItem = {
            id: ++currentId,
            name: itemName.value,
            quantity: parseInt(itemQuantity.value),
            price: parseFloat(itemPrice.value),
            category: itemCategory.value
        };
        inventory.push(newItem);
    }
    
    updateInventoryDisplay();
    itemForm.reset();
    itemId.value = '';
}

function deleteItem(id) {
    inventory = inventory.filter(item => item.id !== id);
    updateInventoryDisplay();
}

function editItem(id) {
    const item = inventory.find(item => item.id === id);
    itemId.value = item.id;
    itemName.value = item.name;
    itemQuantity.value = item.quantity;
    itemPrice.value = item.price;
    itemCategory.value = item.category;
}

function filterItems() {
    const searchTerm = searchInput.value.toLowerCase();
    const filteredItems = inventory.filter(item => 
        item.name.toLowerCase().includes(searchTerm) || 
        item.category.toLowerCase().includes(searchTerm)
    );
    updateInventoryDisplay(filteredItems);
}

function sortItems() {
    const sortBy = sortSelect.value;
    let sortedItems = [...inventory];
    
    if (sortBy === 'priceAsc') {
        sortedItems.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'priceDesc') {
        sortedItems.sort((a, b) => b.price - a.price);
    }
    
    updateInventoryDisplay(sortedItems);
}

function updateInventoryDisplay(items = inventory) {
    inventoryBody.innerHTML = '';
    let totalValue = 0;
    
    items.forEach(item => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${item.name}</td>
            <td>${item.quantity}</td>
            <td>₹${item.price.toFixed(2)}</td>
            <td>${item.category}</td>
            <td>
                <button onclick="editItem(${item.id})">Edit</button>
                <button onclick="deleteItem(${item.id})">Delete</button>
            </td>
        `;
        inventoryBody.appendChild(row);
        
        totalValue += item.quantity * item.price;
    });
    
    totalValueSpan.textContent = totalValue.toFixed(2);
}

// Initial display
updateInventoryDisplay();