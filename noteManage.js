const yargs = require("yargs");
const {
  addNote,
  deleteNote,
  updateNote,
  viewAllNotes,
  viewSpecNote,
  viewDueType,
} = require("./note");
//ADD NOTE
yargs.command({
  command: "add",
  builder: {
    id: {
      type: "string",
      demandOption: true,
    },
    type: {
      type: "string",
      demandOption: true,
    },
    title: {
      type: "string",
      demandOption: true,
    },
    content: {
      type: "string",
      demandOption: true,
    },
  },
  handler: ({ id, type, title, content }) => {
    addNote(id, type, title, content);
  },
});
//DELETE NOTE
yargs.command({
  command: "delete",
  builder: {
    id: {
      type: "string",
      demandOption: true,
    },
  },
  handler: ({ id }) => {
    deleteNote(id);
  },
});
//UPDATE NOTE
yargs.command({
  command: "update",
  builder: {
    id: {
      type: "string",
      demandOption: true,
    },
  },
  handler: ({ id, type, title, content }) => {
    updateNote(id, type, title, content);
  },
});
//VIEW ALL
yargs.command({
  command: "viewall",
  builder: {},
  handler: (args) => {
    viewAllNotes();
  },
});
//VIEW SPECIFIC
yargs.command({
  command: "viewspec",
  builder: {
    id: {
      type: "string",
      demandOption: true,
    },
  },
  handler: ({ id }) => {
    viewSpecNote(id);
  },
});
//VIEW DUE TO TYPE
yargs.command({
  command: "viewduetype",
  builder: {
    type: {
      type: "string",
      demandOption: true,
    },
  },
  handler: ({ type }) => {
    viewDueType(type);
  },
});
yargs.parse();
