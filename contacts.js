const fs = require('fs/promises');
const path = require('path');
const { nanoid } = require("nanoid");

const contactsPath = path.resolve(__dirname, "./db/contacts.json");

const getListContacts = async () => {
    const contacts = await fs.readFile(contactsPath);
    const parsedContacts = JSON.parse(contacts);
    return parsedContacts;
}

const getContactById = async (contactId) => {
    const contacts = await getListContacts();
    const result = contacts.find(contact => contact.id === contactId);
    if (!result) {
        return null;
    }
    return result;
}

const removeContact = async (contactId) => {
    const contacts = await getListContacts();
    const result = contacts.filter(contact => contact.id !== contactId);
    await fs.writeFile(contactsPath, JSON.stringify(result));
    return result;
}

const addContact = async (name, email, phone) => {
    const contacts = await getListContacts();
    const newContact = { id: nanoid(2), name, email, phone };
    contacts.push(newContact);
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
    return newContact;
}

module.exports = {
    getListContacts,
    getContactById,
    removeContact,
    addContact,
}