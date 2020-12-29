//require("<name>") to use a specific lib
// const fs = require("fs");
//Chalk lib to make the terminal less boring by adding colors
const chalk = require("chalk");
// console.log(chalk.bgCyan("TEST CHALK"));
//run by type node <file's name> in the terminal
// console.log("Hello Nodejs");
//Test func WriteFileSync of the fs lib
//fs.writeFileSync("note.txt", "Demo WriteFileSync");
//=================O==========================//
/**TASK MANAGEMENT (CRUD => (Create - Read - Update - Delete))
 * 1. Add task
 * 2. Remove task
 * 3. Update task
 * 4. List all tasks
 * 5. List task detail
 */
//Yargs lib to receive user's input (the same as Console in C#)
//1. Define a command: command
//2. Send required information : builder
//3. Define a function to handle something: handler
const yargs = require("yargs");
// const taskFunc = require("./task");
//sử dụng object destructuring
const {
  addTask,
  deleteTask,
  updateTask,
  listAllTask,
  listDetailTask,
} = require("./task");
//ADD TASK
yargs.command({
  command: "add",
  builder: {
    title: {
      type: "string",
      demandOption: true,
    },
    description: {
      type: "string",
      demandOption: true,
    },
  },
  handler: function (args) {
    // console.log("Add task", args);
    //destructuring (bóc tách phần tử)
    const { title, description } = args;
    addTask(title, description);
  },
});
//DELETE TASK
yargs.command({
  command: "delete",
  builder: {
    title: {
      type: "string",
      demandOption: true,
    },
  },
  handler: function (args) {
    // console.log("Task Deleted");
    deleteTask(args.title);
  },
});
//UPDATE TASK
yargs.command({
  command: "update",
  builder: {
    title: {
      type: "string",
      demandOption: true,
    },
    description: {
      type: "string",
      demandOption: true,
    },
  },
  handler: function ({ title, description }) {
    // console.log("Task Updated");
    updateTask(title, description);
  },
});
//LIST ALL TASKS
yargs.command({
  command: "list",
  builder: {},
  handler: function (args) {
    // console.log("list all tasks");
    listAllTask();
  },
});
//LIST TASK DETAIL
yargs.command({
  command: "detail",
  builder: {
    title: {
      type: "string",
      demandOption: true,
    },
  },
  handler: function (args) {
    // console.log("show task detail");
    listDetailTask(args.title);
  },
});
//Nếu không log hoặc parse thì sẽ ko chạy
//console.log(yargs.argv);
yargs.parse();
