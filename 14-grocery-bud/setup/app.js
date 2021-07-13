// ****** SELECT ITEMS **********
const alert = document.querySelector('.alert');
const form = document.querySelector('.grocery-form');
const grocery = document.getElementById('grocery');
const submitBtn = document.querySelector('.submit-btn');
const container = document.querySelector('.grocery-container');
const list = document.querySelector('.grocery-list');
const clearBtn = document.querySelector('.clear-btn');

// edit option
let editElement;
let editFlag = false;
let editID = "";

// ****** EVENT LISTENERS **********
form.addEventListener('submit', addItem);
clearBtn.addEventListener('click', clearItems);

// ****** FUNCTIONS **********
function addItem(e) {
    e.preventDefault();

    const value = grocery.value;
    const id = new Date().getTime().toString();

    if (value && !editFlag) {
        const element = document.createElement('article');
        element.classList.add('grocery-item');

        const attrib = document.createAttribute('data-id');
        attrib.value = id;

        element.setAttributeNode(attrib);
        element.innerHTML = `
        <p class="title">item</p>
        <div class="btn-container">
            <button class="edit-btn" type="button">
                <i class="fas fa-edit"></i>
            </button>
            <button class="delete-btn" type="button">
                <i class="fas fa-trash"></i>
            </button>
        </div>`;

        const editBtn = element.querySelector('.edit-btn');
        const deleteBtn = element.querySelector('.delete-btn');

        editBtn.addEventListener('click', editItem);
        deleteBtn.addEventListener('click', deleteItem);

        list.appendChild(element);
        displayAlert("item added to the list", "success");
        container.classList.add('show-container');

        addToLocalStorage(id, value);
        setBackToDefault();
    }
    else if (value && editFlag) {
        editElement.innerHTML = value;
        displayAlert("value changed", "success");

        editLocalStorage(editID, value);
        setBackToDefault();
    }
    else {
        displayAlert('please enter value', 'danger');
    }
}

function displayAlert(text, action) {
    alert.textContent = text;
    alert.classList.add(`alert-${action}`);

    setTimeout(() => {
        alert.textContent = '';
        alert.classList.remove(`alert-${action}`);
    }, 1000);
}

function clearItems() {
    const items = document.querySelectorAll('.grocery-item');

    if (items.length > 0) {
        items.forEach(function (item) {
            list.removeChild(item);
        });
    }

    container.classList.remove('show-container');
    displayAlert("empty list", "danger");
    setBackToDefault();
    // localStorage.removeItem('list')
}

function editItem(e) {
    const element = e.currentTarget.parentElement.parentElement;
    editElement = e.currentTarget.parentElement.previousElementSibling;
    grocery.value = editElement.innerHTML;
    editFlag = true;
    editID = element.dataset.id;
    submitBtn.textContent = 'edit';
}

function deleteItem(e) {
    const element = e.currentTarget.parentElement.parentElement;
    const id = element.dataset.id;
    list.removeChild(element);

    if (list.children.length === 0) {
        container.classList.remove('show-container');
    }

    displayAlert("item removed", "danger");
    setBackToDefault();
    removeFromLocalStorage(id);
}

function setBackToDefault() {
    grocery.value = '';
    editFlag = false;
    editID = '';
    submitBtn.textContent = "submit";
}
// ****** LOCAL STORAGE **********
function addToLocalStorage(id, value) {

}

function editLocalStorage(id, value) {
    
}

function removeFromLocalStorage(id) {

}
// ****** SETUP ITEMS **********
