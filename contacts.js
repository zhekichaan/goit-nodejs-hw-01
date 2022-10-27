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
  return contact
}
  
async function removeContact(contactId) {
  const dbRaw = await fs.readFile(contactsPath)
  const db = JSON.parse(dbRaw)

  const index = db.findIndex(contact => contact.id === contactId);
  if(index !== -1) {
    console.log(`Deleted contact: `);
    console.log(db[index]);
  db.splice(index, 1);
  await fs.writeFile(contactsPath, JSON.stringify(db))

  } else {
    console.log(`There is no contact with this id: ${contactId}`);
  }
}
  
async function addContact(name, email, phone) {
  const id = nanoid()
  const contact = { id, name, email, phone } 
  const dbRaw = await fs.readFile(contactsPath)
  const db = JSON.parse(dbRaw)
  db.push(contact)
  await fs.writeFile(contactsPath, JSON.stringify(db))
  console.log(`Added new contact`);
  console.log(contact);
}
  
module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact
}