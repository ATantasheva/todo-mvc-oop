export default class Model {
   constructor() {
      this.tasks = [];
      this.loadFromLocalStorage()
   }
   //для загрузки обновлений из локалстор
   loadFromLocalStorage() {
      //возвращаем json-строчку под ключем tasks
      const data = localStorage.getItem('tasks');
      if (data) {
         // запишем получен данные в массив таскс
         //parse(data) делаем из строчки массив
         this.tasks = JSON.parse(data);
      }
   }
   //сохранение в локалстор чтобы при обновлении данные не удалялись
   saveToLocalStorage() {
      localStorage.setItem("tasks", JSON.stringify(this.tasks));
   }
   //добавление задач
   addTask(text) {
      let id = 1;

      if (this.tasks.length > 0) {
         //узнаем знаечние последнео эл и прибавляем +1
         id = this.tasks[this.tasks.length - 1]['id'] + 1;
      }
      const newTask = {
         id: id,
         status: "active",
         text: text,
      };
      this.tasks.push(newTask);
      this.saveToLocalStorage();
      return newTask;
   }

   //поиск задачи по id
   findTask(id) {
    const task = this.tasks.find(function (task) {
         if (task.id === parseInt(id)) {
            return true;
         }
      })

      return task;
   }


   //отметить как сделано
   changeStatus(task) {

      if (task.status === 'active') {
          task.status = 'done';
      } else {
          task.status = 'active';
      }
      
      this.saveToLocalStorage();
 }
   //удалить задачу
   removeTask(task) {
      //узнаем индекс
      const index = this.tasks.indexOf(task);
      this.tasks.splice(index, 1);
      this.saveToLocalStorage();
   }
}

// кажд задача описана как объект
//tasks = ['Дело 1','Дело 2','Дело 3'] - было
//стало
// tasks = [
//     {
//         status:'active',
//         text: 'Дело 1'
//     },
//     {
//         status:'done',
//         text: 'Дело 2'
//     },
//     {
//         status:'done',
//         text: 'Дело 3'
//     }
// ]
