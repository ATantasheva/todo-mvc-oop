import Model from "./model.js";
import View from "./view.js";

const model = new Model();
//model.tasks - передаем все задачи
const view = new View(model.tasks);

//Добавление задачи
view.elements.form.addEventListener('submit', function (e){
   e.preventDefault();
  const newTask = model.addTask(view.elements.input.value);
   view.renderTask(newTask);
   view.clearInput();
})
//Нажали на чекбокс или кнопку удалить
view.elements.taskList.addEventListener('click', function(e){
console.log(e.target);
//проверяем клик внутри эл
if(e.target.getAttribute('type') === 'checkbox') {
  const id = e.target.closest('.todo-item').dataset.id;
  const task = model.findTask(id);
  model.changeStatus(task);

  view.changeStatus(task);
}
//клик по кнопке удалить
if(e.target.hasAttribute('data-delete')) {
   const id = e.target.closest('.todo-item').dataset.id;
   const task = model.findTask(id);
   model.removeTask(task);
   view.removeTask(task);
}
})


// model.addTask("Дело1");
// model.addTask("Дело2");
// model.addTask("Дело3");


// model.doneTask(model.tasks[1]); //второй задаче поставили статус done
// console.log(model.tasks);

// // model.removeTask(model.tasks[0]);
// // console.log(model);

// view.renderTask(model.tasks[0])
// view.renderTask(model.tasks[1])