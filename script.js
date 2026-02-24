console.log("Quote Application Loaded");

let editIndex = null;
const quoteItems = [];

const savedItems = localStorage.getItem("quoteItems");

if (savedItems) {
  quoteItems.push(...JSON.parse(savedItems));
}

const boardNameInput = document.getElementById("boardName");
const lengthInput = document.getElementById("length");
const widthInput = document.getElementById("width");
const quantityInput = document.getElementById("quantity");
const materialInput = document.getElementById("material");
const addBtn = document.getElementById("addBtn");
const tableBody = document.getElementById("quoteTableBody");

addBtn.addEventListener("click", addItem);


function addItem() {
  const boardName = boardNameInput.value.trim();
  const length = Number(lengthInput.value);
  const width = Number(widthInput.value);
  const quantity = Number(quantityInput.value);
  const material = materialInput.value;

  if (!boardName) {
    alert("Board name is required");
    return;
  }

  if (length <= 0 || width <= 0) {
    alert("Length and width must be greater than 0");
    return;
  }

  if (quantity <= 0) {
    alert("Quantity must be at least 1");
    return;
  }

  if (!material) {
    alert("Please select a material");
    return;
  }

  const item = { boardName, length, width, quantity, material };

  if (editIndex !== null) {
  quoteItems[editIndex] = item;
  editIndex = null;
  addBtn.textContent = "Add to Quote";
} else {
  quoteItems.push(item);
}

saveToStorage();
renderTable();
clearForm();
}

function renderTable() {
  tableBody.innerHTML = "";

  quoteItems.forEach((item, index) => {
    const row = document.createElement("tr");

    row.innerHTML = `
      <td>${item.boardName}</td>
      <td>${item.length}</td>
      <td>${item.width}</td>
      <td>${item.quantity}</td>
      <td>${item.material}</td>
      <td>
        <button onclick="editItem(${index})">Edit</button>
        <button onclick="deleteItem(${index})">Delete</button>
      </td>
    `;

    tableBody.appendChild(row);
  });
}
function clearForm() {
  boardNameInput.value = "";
  lengthInput.value = "";
  widthInput.value = "";
  quantityInput.value = 1;
  materialInput.value = "";
  editIndex = null;
  addBtn.textContent = "Add to Quote";
}

function saveToStorage() {
  localStorage.setItem("quoteItems", JSON.stringify(quoteItems));
}

function editItem(index) {
  const item = quoteItems[index];

  boardNameInput.value = item.boardName;
  lengthInput.value = item.length;
  widthInput.value = item.width;
  quantityInput.value = item.quantity;
  materialInput.value = item.material;

  editIndex = index;
  addBtn.textContent = "Update Item";
}

function deleteItem(index) {
  if (!confirm("Delete this item?")) return;

  quoteItems.splice(index, 1);
  saveToStorage();
  renderTable();
}

renderTable();