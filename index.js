const contacts = require("./contacts");
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

const invokeAction = async ({ action, id, name, email, phone }) => {
  switch (action) {
    case "list":
      const getAllContacts = await contacts.listContacts();
      return console.table(getAllContacts);
      break;

    case "get":
      const getContact = await contacts.getContactById(id);
      return console.table(getContact);
      break;

    case "add":
      const newContact = await contacts.addContact(name, email, phone);
      return console.table(newContact);
      break;

    case "remove":
      const deleteContact = await contacts.removeContact(id);
      return console.table(deleteContact);
      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
};
console.log(argv);

invokeAction(argv);
