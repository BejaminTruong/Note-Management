const chalk = require("chalk");
const fs = require("fs");
//GET NOTE
const getNote = () => {
  try {
    return JSON.parse(fs.readFileSync("note.json").toString());
  } catch (error) {
    console.log("File not founded");
    return [];
  }
};
//ADD NOTE
const addNote = (id, type, title, content) => {
  const noteArr = getNote();
  const existedNote = noteArr.find((item) => item.id === id);
  if (existedNote) {
    console.log(chalk.bgRed(chalk.yellow("Note existed")));
    return;
  }
  if (id === "" || type === "" || title === "" || content === "") {
    console.log("Fields must not be blank");
    return;
  }
  noteArr.push({ id, type, title, content });
  fs.writeFileSync("note.json", JSON.stringify(noteArr));
  console.log("Note added");
};
//DELETE NOTE
const deleteNote = (id) => {
  const noteArr = getNote();
  const index = noteArr.findIndex((item) => item.id === id);
  if (!index) {
    console.log("Note not founded");
    return;
  }
  noteArr.splice(index, 1);
  fs.writeFileSync("note.json", JSON.stringify(noteArr));
  console.log("Note deleted");
};
//UPDATE NOTE
const updateNote = (id, type, title, content) => {
  const noteArr = getNote();
  let foundedNote = noteArr.find((item) => item.id === id);
  if (!foundedNote) {
    console.log("Note not founded");
    return;
  }
  foundedNote.type = type;
  foundedNote.title = title;
  foundedNote.content = content;
  console.log(foundedNote);
  fs.writeFileSync("note.json", JSON.stringify(noteArr));
  console.log("Note updated");
};
//VIEW ALL NOTES
const viewAllNotes = () => {
  const noteArr = getNote();
  noteArr.forEach((item) => {
    console.log(
      `ID: ${item.id} | Type: ${item.type} | Title: ${item.title} | Content: ${item.content}`
    );
  });
};
//VIEW SPECIFIC NOTE
const viewSpecNote = (sid) => {
  const noteArr = getNote();
  const foundedNote = noteArr.find((item) => item.id === sid);
  if (!foundedNote) {
    console.log("Note not founded");
    return;
  }
  console.log("Note founded: \n");
  const { id, type, title, content } = foundedNote;
  console.log(
    `ID: ${id} | Type: ${type} | Title: ${title} | Content: ${content}`
  );
};
//VIEW NOTE DUE TO TYPE
const viewDueType = (type) => {
  const noteArr = getNote();
  let flag = false;
  noteArr.forEach((item) => {
    if (item.type === type) {
      console.log(
        `ID: ${item.id} | Type: ${item.type} | Title: ${item.title} | Content: ${item.content}`
      );
      flag = true;
    }
  });
  if (!flag) {
    console.log("Type not founded");
    return;
  }
};
module.exports = {
  addNote,
  deleteNote,
  updateNote,
  viewAllNotes,
  viewSpecNote,
  viewDueType,
};
