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
