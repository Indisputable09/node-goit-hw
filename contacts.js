const fs = require('fs').promises;
const path = require('path');

const contactsPath = path.resolve('./db/contacts.json');

async function listContacts() {
  try {
    const fileData = await fs.readFile(contactsPath);
    const parsedFileData = JSON.parse(fileData);
    console.log('Contacts ', parsedFileData);
  } catch (error) {
    console.error(error.message);
  }
}

async function getContactById(contactId) {
  try {
    const fileData = await fs.readFile(contactsPath);
    const parsedFileData = JSON.parse(fileData);
    const chosenContactData = parsedFileData.find(
      ({ id }) => Number(id) === contactId
    );
    console.log('Chosen contact ', chosenContactData);
  } catch (error) {
    console.error(error.message);
  }
}

async function removeContact(contactId) {
  try {
    const fileData = await fs.readFile(contactsPath);
    const parsedFileData = JSON.parse(fileData);
    const filteredContacts = parsedFileData.filter(
      ({ id }) => Number(id) !== contactId
    );
    fs.writeFile(contactsPath, JSON.stringify(filteredContacts));
    console.log(`Contact with ${contactId} has been successfully removed.`);
  } catch (error) {
    console.error(error.message);
  }
}

async function addContact(name, email, phone) {
  try {
    const fileData = await fs.readFile(contactsPath);
    const parsedFileData = JSON.parse(fileData);
    const generatedContactId =
      Number(parsedFileData[parsedFileData.length - 1].id) + 1;
    const contact = { id: generatedContactId.toString(), name, email, phone };
    const newContactList = [...parsedFileData, contact];
    // fs.writeFile(contactsPath, JSON.stringify(newContactList));
  } catch (error) {
    console.error(error.message);
  }
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};

/*
[
  {
    "id": "1",
    "name": "Allen Raymond",
    "email": "nulla.ante@vestibul.co.uk",
    "phone": "(992) 914-3792"
  },
  {
    "id": "2",
    "name": "Chaim Lewis",
    "email": "dui.in@egetlacus.ca",
    "phone": "(294) 840-6685"
  },
  {
    "id": "3",
    "name": "Kennedy Lane",
    "email": "mattis.Cras@nonenimMauris.net",
    "phone": "(542) 451-7038"
  },
  {
    "id": "4",
    "name": "Wylie Pope",
    "email": "est@utquamvel.net",
    "phone": "(692) 802-2949"
  },
  {
    "id": "5",
    "name": "Cyrus Jackson",
    "email": "nibh@semsempererat.com",
    "phone": "(501) 472-5218"
  },
  {
    "id": "6",
    "name": "Abbot Franks",
    "email": "scelerisque@magnis.org",
    "phone": "(186) 568-3720"
  },
  {
    "id": "7",
    "name": "Reuben Henry",
    "email": "pharetra.ut@dictum.co.uk",
    "phone": "(715) 598-5792"
  },
  {
    "id": "8",
    "name": "Simon Morton",
    "email": "dui.Fusce.diam@Donec.com",
    "phone": "(233) 738-2360"
  },
  {
    "id": "9",
    "name": "Thomas Lucas",
    "email": "nec@Nulla.com",
    "phone": "(704) 398-7993"
  },
  {
    "id": "10",
    "name": "Alec Howard",
    "email": "Donec.elementum@scelerisquescelerisquedui.net",
    "phone": "(748) 206-2688"
  }
]
 */