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
          await contactsDb.removeContact(id)
          break

        case "add":
          await contactsDb.addContact(name, email, phone)
          break

        default:
            throw new Error("Unknown action")
    }
}

invokeAction(argv);