const url = 'https://localhost:7266/api/Account';

//Get

function getItems() {
    fetch(url)
        .then(response => {
            if (!response.ok) {
                const error = response.status;
                _displayErrorGet("Unable to get Accounts", error);

                return Promise.reject(error);
            }
            Promise.resolve(response.json()).then(data => _displayItems(data));
        })
        .catch(error => console.log('Unable to get Accounts.', error));
}


function _displayErrorGet() {
        document.getElementById("getError").innerHTML = `${message}, Status Code: ${error}`;
        document.getElementById("getError").display = "block";
}

function _displayItems(data) {

    const table = document.getElementById('accountsTableInput');

    if (table.hasChildNodes) {
        var child = table.lastElementChild;
        while (child) {
            table.removeChild(child);
            child = table.lastElementChild;
        }
    }

    let i = 0; 

    data.forEach(Account => {
        let tr = table.insertRow();

        let td0 = tr.insertCell(0);
        let textNode0 = document.createTextNode(data[i].accountId);
        td0.appendChild(textNode0);

        let td1 = tr.insertCell(1);
        let textNode1 = document.createTextNode(data[i].accountCode);
        td1.appendChild(textNode1);

        let td2 = tr.insertCell(2);
        let textNode2 = document.createTextNode(data[i].accountName);
        td2.appendChild(textNode2);

        let td3 = tr.insertCell(3);
        let textNode3 = document.createTextNode(data[i].address);
        td3.appendChild(textNode3);

        let td4 = tr.insertCell(4);
        let textNode4 = document.createTextNode(data[i].phoneNumber);
        td4.appendChild(textNode4);

        let td5 = tr.insertCell(5);
        let textNode5 = document.createTextNode(data[i].emailAddress);
        td5.appendChild(textNode5);

        let td6 = tr.insertCell(6);
        let textNode6 = document.createTextNode(data[i].paymentTerms);
        td6.appendChild(textNode6);

        let td7 = tr.insertCell(7);
        let textNode7 = document.createTextNode(data[i].termsType);
        td7.appendChild(textNode7);

        i++
    });

}

let getButton = document.getElementById("get");
let table = document.getElementById("table")
getButton.addEventListener('click', showTable);

function showTable() { 
    table.style.display = 'block';
}

//Get by id

function getById() {
    let id = document.getElementById("get-Id").value;
    id = parseInt(id);
    fetch(`${url}/Get/${id}`, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
    })
        .then(response =>  {
            if (!response.ok) {
                const error = response.status;
                _displayErrorGetById("Unable to get Account", error);
                return Promise.reject(error);
            }
            return Promise.resolve(response.json());
        })
        .then(data => _displayItemsById(data))
        .catch(error => console.log('Unable to get Account.', error));
}

function _displayErrorGetById(message, error) {
    document.getElementById("getByIdError").innerHTML = `${message}, Status Code: ${error}`;
    document.getElementById("getByIdError").display = "block";
}

function _displayItemsById(data) {

    const table = document.getElementById('accountByIdTableInput');

    if (table.hasChildNodes) {
        var child = table.lastElementChild;
        while (child) {
            table.removeChild(child);
            child = table.lastElementChild;
        }
    }

    let tr = table.insertRow();

    let td0 = tr.insertCell(0);
    let textNode0 = document.createTextNode(data.accountId);
    td0.appendChild(textNode0);

    let td1 = tr.insertCell(1);
    let textNode1 = document.createTextNode(data.accountCode);
    td1.appendChild(textNode1);

    let td2 = tr.insertCell(2);
    let textNode2 = document.createTextNode(data.accountName);
    td2.appendChild(textNode2);

    let td3 = tr.insertCell(3);
    let textNode3 = document.createTextNode(data.address);
    td3.appendChild(textNode3);

    let td4 = tr.insertCell(4);
    let textNode4 = document.createTextNode(data.phoneNumber);
    td4.appendChild(textNode4);

    let td5 = tr.insertCell(5);
    let textNode5 = document.createTextNode(data.emailAddress);
    td5.appendChild(textNode5);

    let td6 = tr.insertCell(6);
    let textNode6 = document.createTextNode(data.paymentTerms);
    td6.appendChild(textNode6);

    let td7 = tr.insertCell(7);
    let textNode7 = document.createTextNode(data.termsType);
    td7.appendChild(textNode7);



    document.getElementById("IdTable").style.display = "block";
    document.getElementById("getByIdError").innerHTML = null;
}

//Create

function _clearInputsPost() {
    const clearAccountCode = document.getElementById('add-accountCode');
    const clearAccountName = document.getElementById('add-accountName');
    const clearAddress = document.getElementById('add-address');
    const clearPhoneNumber = document.getElementById('add-phoneNumber');
    const clearEmailAddress = document.getElementById('add-emailAddress');
    const clearPaymentTerms = document.getElementById('add-paymentTerms');
    const clearTermsType = document.getElementById('add-termsType');

    clearAccountCode.value = null;
    clearAccountName.value = null;
    clearAddress.value = null;
    clearPhoneNumber.value = null;
    clearEmailAddress.value = null;
    clearPaymentTerms.value = null;
    clearTermsType.value = null;

    document.getElementById("createError").innerHTML = null;
}

function addItem() {
    const addAccountCode = document.getElementById('add-accountCode').value.trim();
    const addAccountName = document.getElementById('add-accountName').value.trim();
    const addAddress = document.getElementById('add-address').value.trim();
    const addPhoneNumber = document.getElementById('add-phoneNumber').value.trim();
    const addEmailAddress = document.getElementById('add-emailAddress').value.trim();
    const addPaymentTerms = document.getElementById('add-paymentTerms').value.trim();
    const addTermsType = document.getElementById('add-termsType').value.trim();

    const item = {
        accountCode: addAccountCode,
        accountName: addAccountName,
        address: addAddress,
        phoneNumber: addPhoneNumber,
        emailAddress: addEmailAddress,
        paymentTerms: addPaymentTerms,
        termsType: addTermsType
    };

    fetch(url, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(item)
    })
        .then(response => {
            if (!response.ok) {
                const error = response.status;
                _displayErrorCreate("Unable to create Account", error);
                return Promise.reject(error);
            }
            response.json()
        })
        .then(() => _clearInputsPost())
        .catch(error => console.error('Unable to create item.', error));
}

function _displayErrorCreate(message, error) {
    document.getElementById("createError").innerHTML = `${message}, Status Code: ${error}. <br /> <br /> Please note that the fields Account Code, Account Name, Payment Terms and Terms Type are required.`;
    document.getElementById("createError").display = "block";
}

//Update

function _clearInputsUpdate() {
    const clearAccountCode = document.getElementById('update-accountCode');
    const clearAccountName = document.getElementById('update-accountName');
    const clearAddress = document.getElementById('update-address');
    const clearPhoneNumber = document.getElementById('update-phoneNumber');
    const clearEmailAddress = document.getElementById('update-emailAddress');
    const clearPaymentTerms = document.getElementById('update-paymentTerms');
    const clearTermsType = document.getElementById('update-termsType');

    clearAccountCode.value = null;
    clearAccountName.value = null;
    clearAddress.value = null;
    clearPhoneNumber.value = null;
    clearEmailAddress.value = null;
    clearPaymentTerms.value = null;
    clearTermsType.value = null;

    document.getElementById("updateError").innerHTML = null;
}

function updateItem() {
    const updateAccountCode = document.getElementById('update-accountCode').value.trim();
    const updateAccountName = document.getElementById('update-accountName').value.trim();
    const updateAddress = document.getElementById('update-address').value.trim();
    const updatePhoneNumber = document.getElementById('update-phoneNumber').value.trim();
    const updateEmailAddress = document.getElementById('update-emailAddress').value.trim();
    const updatePaymentTerms = document.getElementById('update-paymentTerms').value.trim();
    const updateTermsType = document.getElementById('update-termsType').value.trim();

    const item = {
        accountId: 0,
        accountCode: updateAccountCode,
        accountName: updateAccountName,
        address: updateAddress,
        phoneNumber: updatePhoneNumber,
        emailAddress: updateEmailAddress,
        paymentTerms: updatePaymentTerms,
        termsType: updateTermsType
    };

    fetch(url, {
        method: 'Put',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(item)
    })
        .then(response => {
            if (!response.ok) {
                const error = response.status;
                _displayErrorUpdate("Unable to update Account", error);
                return Promise.reject(error);
            }
        })
        .then(() => _clearInputsUpdate())
        .catch(error => console.error('Unable to update item.', error));
}

function _displayErrorUpdate(message, error) {
    document.getElementById("updateError").innerHTML = `${message}, Status Code: ${error}`;
    document.getElementById("updateError").display = "block";
}

// Delete

function _clearInputsDelete() {
    const deleteAccountCode = document.getElementById("delete-accountCode");

    deleteAccountCode.value = null;

    document.getElementById("deleteError").innerHTML = null;
}

function deleteItem() {
    const deleteAccountCode = document.getElementById("delete-accountCode").value.trim();

    const item = {
        accountCode: deleteAccountCode
    }

    fetch(`${url}/${item.accountCode}`, {
        method: 'Delete',
        body: JSON.stringify(item)
    })
        .then(response => {
            if (!response.ok) {
                const error = response.status;
                _displayErrorDelete("Unable to delete Account", error);
                return Promise.reject(error);
            }
        })
        .then(() => _clearInputsDelete())
        .catch(error => console.error('Unable to delete item.', error));
}

function _displayErrorDelete(message, error) {
    document.getElementById("deleteError").innerHTML = `${message}, Status Code: ${error}`;
    document.getElementById("deleteError").display = "block";
}