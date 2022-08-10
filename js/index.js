// 获取元素
let data = localStorage.getItem("todolist"); // 取出存储的数据
const arr = data ? JSON.parse(data) : [];
const title = document.querySelector("#title");
const donelist = document.querySelector("#donelist");
const todolist = document.querySelector("#todolist");
const todocount = document.querySelector("#todocount");
const donecount = document.querySelector("#donecount");

// 进入网页，就调用renderTodolistDonelist函数，把本地存储的数据渲染到页面
renderTodolistDonelist();

// 读取本地存储信息
function getData() {
  return arr;
}

// 创建todolist本地存储变量
function saveData(data) {
  // 值转化为JSON字符串
  // localStorage.setItem(“key”,“value”):存储名字为key的一个值value，如果key存在，就更新value
  localStorage.setItem("todolist", JSON.stringify(data));
}

// 正在进行和已完成列表的渲染函数
function renderTodolistDonelist() {
  let data = getData();
  // 先把页面清空 再追加元素
  todolist.innerHTML = "";
  donelist.innerHTML = "";
  // 计数器
  let todo = 0;
  let done = 0;
  // 从本地存储拿到的数据进行遍历 进行添加元素
  data.forEach(function (item, i) {
    //添加内容到 正在进行
    if (item.done) {
      donelist.insertAdjacentHTML(
        "afterbegin",`<li><input type='checkbox' id=${i} checked=${item.done}><p>${item.title}</p><a href='javascript:;' id=${i}></a></li>`
      );
      done++;
    } else {
      // 添加内容到已经完成
      todolist.insertAdjacentHTML(
        "afterbegin",`<li><input type='checkbox' id=${i}><p>${item.title}</p><a href='javascript:;' id=${i}></a></li>`
      );
      todo++;
    }
  });
  // 遍历结束之后，把计数器的值赋值给页面的todocount和donecount
  donecount.innerHTML = done;
  todocount.innerHTML = todo;

  //调用打钩完成事件
  setInputClick();
  //调用删除事件
  delClick();
}

// input框键盘事件
title.addEventListener("keyup", function (e) {
  if (e.keyCode === 13) {
    if (title.value === "") {
      return alert("请输入要做的事情");
    }
    let local = getData();
    // 输入的内容是data里面的title值，done是区分 todo 和 done
    // local是一个数组，可以往数组里面放对象
    local.push({ title: this.value, done: false });
    // 此时local传递给保存本地存储的值
    saveData(local);
    //   如果不为空要渲染页面，清空输入框内容
    renderTodolistDonelist();
    title.value = "";
  }
});

// 列表里面input框的复选框点击事件
function setInputClick() {
  let checkTodo = todolist.querySelectorAll("input");
  let checkDone = donelist.querySelectorAll("input");
  checkTodo.forEach(function (value) {
    // 把点击到的值改变done值
    changeDone(value);
  });
  checkDone.forEach(function (value) {
    changeDone(value);
  });
}

// 将选到的input框对应的列表内容保存到本地存储 并改变done值(false -> true或者 true -> false)
function changeDone(value) {
  value.addEventListener("click", function () {
    let data = getData();
    console.log(data);
    //  checked值改为赋值给  data数据对应索引的done值
    data[this.id].done = value.checked;
    // 数据保存给本地存储
    saveData(data);
    // 渲染列表页面
    renderTodolistDonelist();
  });
}

// 给a绑定点击事件，点击a删除li
function delClick() {
  let asTodo = todolist.querySelectorAll("a");
  let asDone = donelist.querySelectorAll("a");
  asTodo.forEach(function (value) {
    // 把点到的a 对应的值给封装的indexA函数
    indexA(value);
  });

  asDone.forEach(function (value) {
    indexA(value);
  });
}
// 点击到第几个删除键 就删除第几个的值
function indexA(value) {
  value.addEventListener("click", function () {
    let data = getData();
    // console.log(value.id);
    // 点击到的a对应的id值是几，就删除data里面的第几个元素；id和data里面的顺序相对应
    data.splice(value.id, 1);
    // splice(从哪个位置开始删除, 删除几个元素) 会改变原数组
    // 保存数据到本地
    saveData(data);
    // 5. 渲染数据
    renderTodolistDonelist();
  });
}
