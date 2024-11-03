document.addEventListener('DOMContentLoaded', () => {
      const taskInput = document.getElementById('taskInput');
      const addTaskButton = document.getElementById('addTask');
      const taskList = document.getElementById('taskList');

      loadTasks();

      addTaskButton.addEventListener('click', addTask);
            taskInput.addEventListener('keypress', (e) => {
                  if (e.key === 'Enter') addTask();
      });

      function addTask() {
            const taskText = taskInput.value.trim();
            if (taskText !== '') {
                  const li = createTaskElement(taskText);
                  taskList.appendChild(li);
                  saveTasks();
                  taskInput.value = '';
            }
      }

      function createTaskElement(taskText) {
            const li = document.createElement('li');
            li.innerHTML = `
                  <div class="checkbox" role="checkbox" tabindex="0" aria-checked="false"></div>
                  <span class="task-text">${taskText}</span>
                  <button class="delete-btn" aria-label="Delete task">
                        <svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round"  class="icon icon-tabler icons-tabler-outline icon-tabler-trash"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M4 7l16 0" /><path d="M10 11l0 6" /><path d="M14 11l0 6" /><path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12" /><path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3" /></svg>
                  </button>
      `;

      li.querySelector('.checkbox').addEventListener('click', toggleTask);
      li.querySelector('.checkbox').addEventListener('keypress', (e) => {
            if (e.key === 'Enter' || e.key === ' ') toggleTask(e);
      });
      li.querySelector('.delete-btn').addEventListener('click', deleteTask);
      return li;
      }

      function toggleTask(e) {
            const listItem = e.target.closest('li');
            const checkbox = e.target;
            listItem.classList.toggle('completed');
            checkbox.classList.toggle('checked');
            checkbox.setAttribute('aria-checked', checkbox.classList.contains('checked'));
            saveTasks();
      }

      function deleteTask(e) {
            const listItem = e.target.closest('li');
            listItem.remove();
            saveTasks();
      }

      function saveTasks() {
            const tasks = [];
            taskList.querySelectorAll('li').forEach(li => {
                  const taskText = li.querySelector('.task-text').textContent;
                  const completed = li.classList.contains('completed');
                  tasks.push({ text: taskText, completed });
            });
            localStorage.setItem('tasks', JSON.stringify(tasks));
      }

      function loadTasks() {
            const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
            tasks.forEach(task => {
                  const li = createTaskElement(task.text);
                  if (task.completed) {
                        li.classList.add('completed');
                        li.querySelector('.checkbox').classList.add('checked');
                        li.querySelector('.checkbox').setAttribute('aria-checked', 'true');
                  }
            taskList.appendChild(li);
      });
      }
});
