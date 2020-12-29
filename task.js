//File chỉ chứa các hàm xử lý task
const fs = require("fs");
const chalk = require("chalk");
//expression func
//funcion name(){}
//declaration func
//HÀM ADD TASK
const addTask = (title, description) => {
  //0. Lấy taskArr cũ từ file
  const taskArr = getTasks();
  //1. Kiểm tra tồn tại task
  const foundedTask = taskArr.find((item) => {
    return item.title === title;
  });
  //truthy and falsy(null, 0, undefine, "", '', NaN, false) in javascript
  if (foundedTask) {
    console.log(chalk.bgRedBright("Task already existed"));
    return;
  }
  //2. Push task vào taskArr
  taskArr.push({ title, description });
  //3. Lưu taskArr vào file task.json
  //hàm writeFile có thể ghi đè dữ liệu cũ nên phải validate trước, phải lưu chuỗi nếu ko sẽ báo lỗi
  fs.writeFileSync("task.json", JSON.stringify(taskArr));
};
//HÀM GET TASK
const getTasks = () => {
  try {
    //Buffer là 1 chuỗi số nhị phân được fs.readFile trả về nên phải chuyển về kiểu dữ liệu mong muốn
    const buffer = fs.readFileSync("task.json");
    //Chuyển kiểu nhị phân sang kiểu chuỗi
    const taskJSON = buffer.toString();
    //Ngược lại stringify, hàm dc dùng để chuyển từ kiểu string sang kiểu JSON
    const taskArr = JSON.parse(taskJSON);
    return taskArr;
  } catch (error) {
    return [];
  }
};
//HÀM DELETE TASK
const deleteTask = (title) => {
  const taskArr = getTasks();
  const foundedIndex = taskArr.findIndex((item) => item.title === title);
  if (foundedIndex === -1) {
    console.log(chalk.bgRedBright("Task not founded"));
    return;
  }
  taskArr.splice(foundedIndex, 1);
  fs.writeFileSync("task.json", JSON.stringify(taskArr));
};
//HÀM UPDATE TASK
const updateTask = (title, description) => {
  const taskArr = getTasks();
  const foundedTask = taskArr.find((item) => item.title === title);
  if (!foundedTask) {
    console.log(chalk.bgRed("Task not found!"));
    return;
  }
  foundedTask.description = description;
  fs.writeFileSync("task.json", JSON.stringify(taskArr));
};
//HÀM LIST ALL
const listAllTask = () => {
  const taskArr = getTasks();
  taskArr.forEach(({ title, description }) =>
    console.log(
      chalk.yellow(
        `Title: ${chalk.green(title)} - Description: ${chalk.cyan(description)}`
      )
    )
  );
  fs.writeFileSync("task.json", JSON.stringify(taskArr));
};
//HÀM LIST DETAIL
const listDetailTask = (title) => {
  const taskArr = getTasks();
  const foundedTask = taskArr.find((item) => item.title === title);
  console.log(
    `Title: ${chalk.bgMagenta(foundedTask.title)} - Description: ${chalk.bgBlueBright(
      foundedTask.description
    )}`
  );
};
//Cú pháp export của Nodejs
module.exports = {
  //hoặc a: addTask => đặt tên rút gọn tùy ý
  addTask,
  deleteTask,
  updateTask,
  listAllTask,
  listDetailTask
};
