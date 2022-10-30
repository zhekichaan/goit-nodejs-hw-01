const fs = require("fs/promises");
const { nanoid } = require("nanoid");
const path = require("path")

const contactsPath = path.join(__dirname, "./db/contacts.json");

async function listContacts() {
  const dbRaw = await fs.readFile(contactsPath)
  const db = JSON.parse(dbRaw)
  return db
}
  
async function getContactById(contactId) {
  const dbRaw = await fs.readFile(contactsPath)
  const db = JSON.parse(dbRaw)
  const contact = db.find(contact => contact.id === contactId);
  if(!contact) {
    return null
  }
  return contact
}
  
async function removeContact(contactId) {
  const dbRaw = await fs.readFile(contactsPath);
  const db = JSON.parse(dbRaw);
  const contact = db.find((item) => item.id === contactId)
  if(!contact) {
    return null
  }
  const contacts = db.filter((item) => item.id !== contactId)
  await fs.writeFile(contactsPath, JSON.stringify(contacts))
  return contact;
}
  
async function addContact(name, email, phone) {
  const id = nanoid()
  const contact = { id, name, email, phone }
  const dbRaw = await fs.readFile(contactsPath)
  const db = JSON.parse(dbRaw)
  db.push(contact)
  await fs.writeFile(contactsPath, JSON.stringify(db))
  return contact;
}
  
module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact
}