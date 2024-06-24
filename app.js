const nameInputElement = document.querySelector("#name");
const phoneInputElement = document.querySelector("#phone");
const addOrEditContactButton = document.querySelector(".add-contact-btn");

const phoneNumberDetails = [];

const table = document.querySelector("#phone-book-table");
const rows = table.querySelectorAll("tr");
console.log(rows);
for (let i = 1; i < rows.length - 1; i++) {
  phoneNumberDetails.push({
    name: rows[i].querySelector("td:nth-child(1)").innerHTML,
    phoneNumber: rows[i].querySelector("td:nth-child(2)").innerHTML,
  });
}

console.log(table.querySelectorAll("tr"));

const errorOutputParagraph = document.querySelector("#error-output");

let tableRowToBeEdited = null;

addOrEditContactButton.addEventListener("click", addOrEditContact);
phoneInputElement.addEventListener("keydown", addNewContactOnPressingEnterKey);

function addNewContactOnPressingEnterKey(e) {
  if (e.key === "Enter") {
    addNewContact();
  }
}
function addOrEditContact(e) {
  if (e.target.classList.contains("add-contact-btn")) {
    addNewContact();
  } else if (e.target.classList.contains("edit-contact-btn")) {
    editContact();
  }
}

function addNewContact() {
  const name = nameInputElement.value;
  const phoneNumber = phoneInputElement.value;

  if (name.length < 3 || phoneNumber.length < 3) {
    errorOutputParagraph.innerHTML =
      "The name and phone number should contain at least 3 characters!";
    errorOutputParagraph.style.color = "red";
    return;
  }

  if (phoneNumberDetails.length === 0) {
    const thead = createTableHeader();
    table.appendChild(thead);
  }

  phoneNumberDetails.push({
    name: name,
    phoneNumber: phoneNumber,
  });

  const tableBody = document.createElement("tbody");

  const tableRow = document.createElement("tr");
  const nameTabelData = document.createElement("td");
  nameTabelData.innerHTML =
    phoneNumberDetails[phoneNumberDetails.length - 1].name;

  const phoneNumberTableData = document.createElement("td");
  phoneNumberTableData.innerHTML =
    phoneNumberDetails[phoneNumberDetails.length - 1].phoneNumber;

  const editButtonElement = document.createElement("td");
  editButtonElement.innerHTML = '<i class="fa-solid fa-pen-to-square"></i>';

  const deteleButtonElement = document.createElement("td");
  deteleButtonElement.innerHTML = '<i class="fa-solid fa-trash"></i>';

  tableRow.appendChild(nameTabelData);
  tableRow.appendChild(phoneNumberTableData);
  tableRow.appendChild(editButtonElement);
  tableRow.appendChild(deteleButtonElement);

  tableBody.appendChild(tableRow);

  table.appendChild(tableBody);

  clearInputElement();
}

function createTableHeader() {
  const nameHeader = document.createElement("th");
  nameHeader.innerHTML = "Name";

  const phoneNumberHeader = document.createElement("th");
  phoneNumberHeader.innerHTML = "Phone Number";

  const editHeader = document.createElement("th");
  editHeader.innerHTML = "Edit";

  const deleteHeader = document.createElement("th");
  deleteHeader.innerHTML = "Delete";

  const thead = document.createElement("thead");
  thead.appendChild(nameHeader);
  thead.appendChild(phoneNumberHeader);
  thead.appendChild(editHeader);
  thead.appendChild(deleteHeader);

  return thead;
}

table.addEventListener("click", handleTableActions);

function handleTableActions(e) {
  if (e.target.classList.contains("fa-trash") === true) {
    e.target.parentElement.parentElement.remove();
  } else if (e.target.classList.contains("fa-pen-to-square")) {
    tableRowToBeEdited = e.target.parentElement.parentElement;
    const name = tableRowToBeEdited.querySelector("td:nth-child(1)").innerHtml;
    console.log(name);
    const phoneNumber =
      tableRowToBeEdited.querySelector("td:nth-child(2)").innerHtml;
    console.log(phoneNumber);

    nameInputElement.value = name;
    phoneInputElement.value = phoneNumber;

    addOrEditContactButton.innerHTML = "Edit contact";
    addOrEditContactButton.classList.remove("add-contact-btn");
    addOrEditContactButton.classList.add("edit-contact-btn");
  }
}

function editContact() {
  const name = nameInputElement.value;
  const phoneNumber = phoneInputElement.value;

  if (name.length < 3 || phoneNumber.length < 3) {
    errorOutputParagraph.innerHTML =
      "The name and phone number should contain at least 3 characters!";
    errorOutputParagraph.style.color = "red";
    return;
  }

  tableRowToBeEdited.querySelector("td:nth-child(1)").innerHtml = name;
  tableRowToBeEdited.querySelector("td:nth-child(2)").innerHtml = phoneNumber;

  addOrEditContactButton.innerHTML = "Add contact";
  addOrEditContactButton.classList.remove("edit-contact-btn");
  addOrEditContactButton.classList.add("add-contact-btn");

  clearInputElement();
}

function clearInputElement() {
  nameInputElement.value = "";
  phoneInputElement.value = "";
  errorOutputParagraph.innerHTML = "";
}
