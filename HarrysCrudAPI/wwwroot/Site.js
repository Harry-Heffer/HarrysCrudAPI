const uriAccount = 'https://localhost:7266/api/Account';
const uriInvoice = 'https://localhost:7266/api/Invoice';

//Account Functions
//Get

function getItems() {
    fetch(uriAccount)
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
    fetch(`${uriAccount}/${id}`, {
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

    fetch(uriAccount, {
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

    fetch(uriAccount, {
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
                _displayErrorUpdate("Some Account Fields are missing: Account Name, Payment Terms and Terms Type are Required", error);
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

    fetch(`${uriAccount}/${item.accountCode}`, {
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

//Invoice Functions
//Get

function getItemsInvoices() {
    fetch(uriInvoice)
        .then(response => {
            if (!response.ok) {
                const error = response.status;
                _displayErrorGetInvoices("Unable to get Invoices", error);

                return Promise.reject(error);
            }
            Promise.resolve(response.json()).then(data => _displayItemsInvoices(data));
        })
        .catch(error => console.log('Unable to get Invoices.', error));
}


function _displayErrorGetInvoices(message, error) {
    document.getElementById("getErrorInvoices").innerHTML = `${message}, Status Code: ${error}`;
    document.getElementById("getErrorInvoices").display = "block";
}

function _displayItemsInvoices(data) {

    const table = document.getElementById('invoicesTableInput');

    if (table.hasChildNodes) {
        var child = table.lastElementChild;
        while (child) {
            table.removeChild(child);
            child = table.lastElementChild;
        }
    }

    let i = 0;

    data.forEach(Invoice => {
        let tr = table.insertRow();

        let td0 = tr.insertCell(0);
        let textNode0 = document.createTextNode(data[i].invoiceId);
        td0.appendChild(textNode0);

        let td1 = tr.insertCell(1);
        let textNode1 = document.createTextNode(data[i].invoiceNumber);
        td1.appendChild(textNode1);

        let td2 = tr.insertCell(2);
        let textNode2 = document.createTextNode(data[i].invoiceDate);
        td2.appendChild(textNode2);

        let td3 = tr.insertCell(3);
        let textNode3 = document.createTextNode(data[i].invoiceDueDate);
        td3.appendChild(textNode3);

        let td4 = tr.insertCell(4);
        let textNode4 = document.createTextNode(data[i].net);
        td4.appendChild(textNode4);

        let td5 = tr.insertCell(5);
        let textNode5 = document.createTextNode(data[i].vat);
        td5.appendChild(textNode5);

        let td6 = tr.insertCell(6);
        let textNode6 = document.createTextNode(data[i].gross);
        td6.appendChild(textNode6);

        let td7 = tr.insertCell(7);
        let textNode7 = document.createTextNode(data[i].description);
        td7.appendChild(textNode7);

        let td8 = tr.insertCell(8);
        let textNode8 = document.createTextNode(data[i].accountCode);
        td8.appendChild(textNode8);

        let td9 = tr.insertCell(9);
        let textNode9 = document.createTextNode(data[i].accountName);
        td9.appendChild(textNode9);

        let td10 = tr.insertCell(10);
        let textNode10 = document.createTextNode(data[i].status);
        td10.appendChild(textNode10);

        i++
    });

}

let getButtonInvoices = document.getElementById("getInvoices");
let tableInvoices = document.getElementById("tableInvoices")
getButtonInvoices.addEventListener('click', showTableInvoices);

function showTableInvoices() {
    tableInvoices.style.display = 'block';
}

//Get by id

function getByAccountCodeInvoices() {
    let AccountCode = document.getElementById("get-AccountCodeInvoices").value;
    fetch(`${uriInvoice}/${AccountCode}`, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
    })
        .then(response => {
            if (!response.ok) {
                const error = response.status;
                _displayErrorGetByAccountCodeInvoices("Unable to get Invoices", error);
                return Promise.reject(error);
            }
            return Promise.resolve(response.json()).then(data => _displayItemsByAccountCodeInvoices(data));
        })
        .catch(error => console.log('Unable to get Invoices.', error));
}

function _displayErrorGetByAccountCodeInvoices(message, error) {
    document.getElementById("getByAccountCodeErrorInvoices").innerHTML = `${message}, Status Code: ${error}`;
    document.getElementById("getByAccountCodeErrorInvoices").display = "block";
}

function _displayItemsByAccountCodeInvoices(data) {

    const table = document.getElementById('accountCodeInvoicesTableInput');

    if (table.hasChildNodes) {
        var child = table.lastElementChild;
        while (child) {
            table.removeChild(child);
            child = table.lastElementChild;
        }
    }

    let i = 0;

    data.forEach(Invoice => {
        let tr = table.insertRow();

        let td0 = tr.insertCell(0);
        let textNode0 = document.createTextNode(data[i].invoiceId);
        td0.appendChild(textNode0);

        let td1 = tr.insertCell(1);
        let textNode1 = document.createTextNode(data[i].invoiceNumber);
        td1.appendChild(textNode1);

        let td2 = tr.insertCell(2);
        let textNode2 = document.createTextNode(data[i].invoiceDate);
        td2.appendChild(textNode2);

        let td3 = tr.insertCell(3);
        let textNode3 = document.createTextNode(data[i].invoiceDueDate);
        td3.appendChild(textNode3);

        let td4 = tr.insertCell(4);
        let textNode4 = document.createTextNode(data[i].net);
        td4.appendChild(textNode4);

        let td5 = tr.insertCell(5);
        let textNode5 = document.createTextNode(data[i].vat);
        td5.appendChild(textNode5);

        let td6 = tr.insertCell(6);
        let textNode6 = document.createTextNode(data[i].gross);
        td6.appendChild(textNode6);

        let td7 = tr.insertCell(7);
        let textNode7 = document.createTextNode(data[i].description);
        td7.appendChild(textNode7);

        let td8 = tr.insertCell(8);
        let textNode8 = document.createTextNode(data[i].accountCode);
        td8.appendChild(textNode8);

        let td9 = tr.insertCell(9);
        let textNode9 = document.createTextNode(data[i].accountName);
        td9.appendChild(textNode9);

        let td10 = tr.insertCell(10);
        let textNode10 = document.createTextNode(data[i].status);
        td10.appendChild(textNode10);

        i++
    });


    document.getElementById("accountCodeInvoicesTable").style.display = "block";
    document.getElementById("getByAccountCodeErrorInvoices").innerHTML = null;
}

//Create

function _clearInputsPostInvoice() {
    const clearAccountCode = document.getElementById('add-accountCodeInvoice');
    const clearInvoiceNumber = document.getElementById('add-invoiceNumber');
    const clearInvoiceDate = document.getElementById('add-invoiceDate');
    const clearInvoiceDueDate = document.getElementById('add-invoiceDueDate');
    const clearNet = document.getElementById('add-net');
    const clearVat = document.getElementById('add-vat');
    const clearGross = document.getElementById('add-gross');
    const clearDescription = document.getElementById('add-description');
    const clearStatus = document.getElementById('add-status');

    clearAccountCode.value = null;
    clearInvoiceNumber.value = null;
    clearInvoiceDate.value = null;
    clearInvoiceDueDate.value = null;
    clearNet.value = null;
    clearVat.value = null;
    clearGross.value = null;
    clearDescription.value = null;
    clearStatus.value = null;

    document.getElementById("createErrorInvoice").innerHTML = null;
}

function addItemInvoice() {
    const addAccountCode = document.getElementById('add-accountCodeInvoice').value.trim();
    const addInvoiceNumber = document.getElementById('add-invoiceNumber').value.trim();
    const addInvoiceDate = document.getElementById('add-invoiceDate').value.trim();
    const addInvoiceDueDate = document.getElementById('add-invoiceDueDate').value.trim();
    const addNet = document.getElementById('add-net').value.trim();
    const addVat = document.getElementById('add-vat').value.trim();
    const addGross = document.getElementById('add-gross').value.trim();
    const addDescription = document.getElementById('add-description').value.trim();
    const addStatus = document.getElementById('add-status').value.trim();


    const item = {
        accountCode: addAccountCode,
        invoiceNumber: addInvoiceNumber,
        invoiceDate: addInvoiceDate,
        invoiceDueDate: addInvoiceDueDate,
        net: addNet,
        vat: addVat,
        gross: addGross,
        description: addDescription,
        status: addStatus,
        accountName: ''
    };

    fetch(uriInvoice, {
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
                _displayErrorCreateInvoice("Unable to create Invoice", error);
                return Promise.reject(error);
            }
            response.json()
        })
        .then(() => _clearInputsPostInvoice())
        .catch(error => console.error('Unable to create Invoice.', error));
}

function _displayErrorCreateInvoice(message, error) {
    document.getElementById("createErrorInvoice").innerHTML = `${message}, Status Code: ${error}. <br /> <br /> Please note that the fields Account Code, Account Name, Payment Terms and Terms Type are required.`;
    document.getElementById("createErrorInvoice").display = "block";
}