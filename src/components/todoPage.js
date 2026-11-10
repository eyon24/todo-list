import { projectPage } from "./projectPage.js";

export const todoPage = (project) => {
  const contentDiv = document.querySelector(".content");

  const todoListContainer = document.createElement("div");
  todoListContainer.className = "todoListContainer";
  contentDiv.appendChild(todoListContainer);

  const todoBtnContainer = document.createElement("div");
  todoBtnContainer.className = "todoBtnContainer";
  todoListContainer.appendChild(todoBtnContainer);

  const backBtn = document.createElement("button");
  todoBtnContainer.appendChild(backBtn);
  backBtn.textContent = "Back";

  const newBtn = document.createElement("button");
  todoBtnContainer.appendChild(newBtn);
  newBtn.textContent = "New Task";

  const todoContainer = document.createElement("div");
  todoContainer.className = "todoContainer";
  todoListContainer.appendChild(todoContainer);

  const todoTitle = document.createElement("h2");
  todoTitle.className = "todoTitle";
  todoTitle.textContent = project.title;
  todoContainer.appendChild(todoTitle);

  const todoList = document.createElement("ul");
  todoList.className = "todoList";
  todoContainer.appendChild(todoList);

  const displayTodos = () => {
    todoList.replaceChildren();

    const lsList = JSON.parse(localStorage.getItem("projectsList")) || [];
    const lsProject = lsList.find((element) => element.id === project.id);

    for (let i = 0; i < lsProject.todos.length; i++) {
      console.log(lsList);

      const todoDiv = document.createElement("li");

      todoDiv.className = "todoli";
      todoList.appendChild(todoDiv);

      const taskName = document.createElement("span");
      taskName.textContent = lsProject.todos[i].task;
      taskName.className = "taskName";
      todoDiv.append(taskName);

      const todoCompletedContainer = document.createElement("div");
      todoCompletedContainer.className = "todoCompletedContainer";
      todoDiv.appendChild(todoCompletedContainer);

      const completedLabel = document.createElement("label");
      completedLabel.textContent = "Completed?";
      completedLabel.for = "completed";
      todoCompletedContainer.appendChild(completedLabel);
      const todoComplete = document.createElement("input");
      todoComplete.type = "checkbox";
      todoComplete.checked = lsProject.todos[i].complete;
      todoComplete.id = "completed";

      todoComplete.onchange = (e) => {
        lsProject.todos[i].complete = e.target.checked;

        const updatedList = lsList.map((pro) => {
          if (pro.id === lsProject.id) {
            return lsProject;
          }
          return pro;
        });

        localStorage.setItem("projectsList", JSON.stringify(updatedList));
      };

      todoComplete.value = lsProject.todos[i].completed;
      todoCompletedContainer.appendChild(todoComplete);

      const editTask = document.createElement("button");
      todoDiv.appendChild(editTask);
      editTask.className = "editTaskBtn";
      editTask.textContent = "Edit";
      editTask.addEventListener("click", (e) => {
        e.preventDefault();
        const updatedTask = prompt("Please enter updated task.");

        if (
          updatedTask === null ||
          updatedTask === "" ||
          updatedTask.trim().length === 0
        ) {
          return;
        }

        lsProject.todos[i].task = updatedTask;

        const updatedList = lsList.map((pro) => {
          if (pro.id === lsProject.id) {
            return lsProject;
          }
          return pro;
        });

        localStorage.setItem("projectsList", JSON.stringify(updatedList));
        displayTodos();
      });

      const deleteBtn = document.createElement("button");
      deleteBtn.textContent = "Delete";
      todoDiv.appendChild(deleteBtn);
      deleteBtn.className = "todoDeleteBtn";

      deleteBtn.addEventListener("click", (e) => {
        e.preventDefault();
        if (confirm("Are you sure?")) {
          const updatedProjectTodos = lsProject.todos.filter(
            (e) => e.id !== lsProject.todos[i].id,
          );

          const updatedList = lsList.map((pro) => {
            if (pro.id === lsProject.id) {
              return {
                ...pro,
                todos: updatedProjectTodos,
              };
            }
            return pro;
          });

          localStorage.setItem("projectsList", JSON.stringify(updatedList));
          displayTodos();
        }
      });
    }
  };

  const todoModal = () => {
    const todoModal = document.createElement("div");
    contentDiv.appendChild(todoModal);
    todoModal.className = "todoModal";

    const todoForm = document.createElement("form");
    todoModal.appendChild(todoForm);
    todoForm.className = "todoForm";

    const todoLabel = document.createElement("label");
    todoForm.appendChild(todoLabel);

    todoLabel.for = "task";
    todoLabel.textContent = "Task: ";

    const todoTask = document.createElement("input");
    todoTask.required = true;
    todoTask.id = "task";
    todoForm.appendChild(todoTask);

    const todoBtn = document.createElement("button");
    todoBtn.textContent = "Submit";
    todoForm.appendChild(todoBtn);

    const todoCancelBtn = document.createElement("button");
    todoCancelBtn.textContent = "Cancel";
    todoForm.appendChild(todoCancelBtn);

    todoCancelBtn.addEventListener("click", (e) => {
      e.preventDefault();
      contentDiv.removeChild(todoModal);
    });

    todoForm.addEventListener("submit", (e) => {
      e.preventDefault();

      const lsList = JSON.parse(localStorage.getItem("projectsList")) || [];

      const updatedList = lsList.map((todo) => {
        if (todo.id === project.id) {
          return {
            ...todo,
            todos: [
              ...todo.todos,
              {
                id: Math.random().toString(16).slice(2),
                task: todoTask.value,
                complete: false,
              },
            ],
          };
        }
        return todo;
      });

      localStorage.setItem("projectsList", JSON.stringify(updatedList));

      displayTodos();
      contentDiv.removeChild(todoModal);
    });
  };

  newBtn.addEventListener("click", (e) => {
    e.preventDefault();
    todoModal();
  });

  backBtn.addEventListener("click", (e) => {
    e.preventDefault();
    contentDiv.replaceChildren();
    projectPage();
  });

  displayTodos();
};
