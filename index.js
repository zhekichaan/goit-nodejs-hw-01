const contactsDb = require("./contacts.js")
const { Command } = require("commander");
const program = new Command();
program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse(process.argv);

const argv = program.opts();

async function invokeAction({action, id, name, email, phone}) {
    switch (action) {
        case "list":
            const contacts = await contactsDb.listContacts()
            console.table(contacts)
            break;
        case "get":
          const contact = await contactsDb.getContactById(id)
          console.log(contact);
          break
        case "remove":
          const removedContact = await contactsDb.removeContact(id)
          console.log(`Removed contact:`);
          console.log(removedContact);
          break

        case "add":
          const addedContact = await contactsDb.addContact(name, email, phone)
          console.log(`Added new contact:`);
          console.log(addedContact);
          break

        default:
            throw new Error("Unknown action")
    }
}

invokeAction(argv);