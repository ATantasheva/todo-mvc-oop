export default class View { //отображение задач
   //принимает весь список задач tasks - обойдет циклом
   //и каждую отобразит как task
   constructor(tasks) {
      //стрелочная функ не имеет своего this
      //ссылается на тот в котором была описана
      tasks.forEach((task) => {
         this.renderTask(task);
      });
   }
   //описание свойств со страницы с которыми будем работать
   elements = {
      taskList: document.getElementById('taskList'),
      form: document.getElementById('form'),
      input: document.getElementById('newTask')
   }

   //метод - отрендерить задачи - показать
   renderTask(taskObject) {
      let completClass = '';
      //доб класс если задача сделана + усл
      if (taskObject.status === 'done') {
         completClass = 'completed';
      }
      //отметка чекбокса
      let checked = '';
      if (taskObject.status === 'done') {
         checked = 'checked';
      }
      const taskHtml = `<li class="todo-item" data-id="${taskObject.id}">
<label class="todo-item-label">
   <input class="checkbox" type="checkbox" ${checked} />
   <span class='${completClass}'>${taskObject.text}</span>
   <button data-delete class="btn btn-secondary btn-sm">Удалить</button>
</label>
</li>`;
      this.elements.taskList.insertAdjacentHTML('beforeend', taskHtml)
   }

   clearInput() {
      this.elements.input.value = '';
   }

   changeStatus(taskObject) {
      const taskElement = this.elements.taskList.querySelector(`[data-id="${taskObject.id}"]`)
      const taskTextEl = taskElement.querySelector('span');

      if (taskObject.status === 'done') {
         taskTextEl.classList.add('completed')
      } else {
         taskTextEl.classList.remove('completed');
      }

   }
   removeTask(taskObject){
      const taskElement = this.elements.taskList.querySelector(`[data-id="${taskObject.id}"]`)
   taskElement.remove();
   }
}