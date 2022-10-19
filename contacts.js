const fs = require('fs').promises;
const path = require('path');

const contactsPath = path.resolve('./db/contacts.json');

async function listContacts() {
  try {
    const fileData = await fs.readFile(contactsPath);
    const parsedFileData = JSON.parse(fileData);
    console.table(parsedFileData);
  } catch (error) {
    console.error(error.message);
  }
}

async function getContactById(contactId) {
  try {
    const fileData = await fs.readFile(contactsPath);
    const parsedFileData = JSON.parse(fileData);
    const chosenContactData = parsedFileData.find(({ id }) => id === contactId);
    if (!chosenContactData) {
      console.log(`There is no contact with such an ID.`);
      return;
    }
    console.log('Chosen contact ', chosenContactData);
  } catch (error) {
    console.error(error.message);
  }
}

async function removeContact(contactId) {
  try {
    const fileData = await fs.readFile(contactsPath);
    const parsedFileData = JSON.parse(fileData);

    if (parsedFileData.find(({ id }) => id === contactId)) {
      const filteredContacts = parsedFileData.filter(
        ({ id }) => id !== contactId
      );
      fs.writeFile(contactsPath, JSON.stringify(filteredContacts));
      console.log(`Contact with ${contactId} has been successfully removed.`);
      return;
    }
    console.log(`There is no contact with ${contactId} ID.`);
  } catch (error) {
    console.error(error.message);
  }
}

async function addContact(name, email, phone) {
  try {
    const fileData = await fs.readFile(contactsPath);
    const parsedFileData = JSON.parse(fileData);
    if (
      parsedFileData.find(
        contact => contact.name.toLowerCase() === name.toLowerCase()
      )
    ) {
      console.log(`${name} is already in contacts`);
      return;
    } else if (
      parsedFileData.find(
        contact => contact.email.toLowerCase() === email.toLowerCase()
      )
    ) {
      console.log(`${email} is already in contacts`);
      return;
    } else if (parsedFileData.find(contact => contact.phone === phone)) {
      console.log(`${phone} is already in contacts`);
      return;
    }
    const generatedContactId =
      Number(parsedFileData[parsedFileData.length - 1].id) + 1;
    const contact = { id: generatedContactId.toString(), name, email, phone };
    const newContactList = [...parsedFileData, contact];
    console.log(`Contact ${contact.name} has been successfully added.`);
    fs.writeFile(contactsPath, JSON.stringify(newContactList));
    return;
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
