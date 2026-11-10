import { todoPage } from "./todoPage.js";

export const projectPage = () => {
  let projectsList = JSON.parse(localStorage.getItem("projectsList")) || [];
  const contentDiv = document.querySelector(".content");

  const projectContainer = document.createElement("div");
  projectContainer.className = "projectContainer";
  contentDiv.appendChild(projectContainer);

  const newProjectBtn = document.createElement("button");
  newProjectBtn.className = "newProjectBtn";
  newProjectBtn.textContent = "New Project";

  const projectNewBtnAndSpan = document.createElement("div");
  projectNewBtnAndSpan.className = "projectHeader";

  projectContainer.appendChild(projectNewBtnAndSpan);

  projectNewBtnAndSpan.appendChild(newProjectBtn);

  newProjectBtn.addEventListener("click", (e) => {
    e.preventDefault();
    newProject();
  });

  const informationalSpan = document.createElement("span");
  informationalSpan.className = "informationalSpan";
  informationalSpan.textContent =
    "To edit the tasks in a project, please click on the title of the project card.";
  projectNewBtnAndSpan.append(informationalSpan);

  const projectDisplayContainer = document.createElement("div");
  projectDisplayContainer.className = "projectDisplayContainer";
  projectContainer.appendChild(projectDisplayContainer);

  const newProject = () => {
    const contentDiv = document.querySelector(".content");

    const newProjectModal = document.createElement("div");
    newProjectModal.className = "newProjectModalContainer";

    const newProjectModalForm = document.createElement("form");
    newProjectModalForm.className = "newProjectModalForm";

    const newProjectModalForm_titleLabel = document.createElement("label");
    newProjectModalForm_titleLabel.className = "newProjectModalForm_titleLabel";
    newProjectModalForm_titleLabel.for = "projectModalForm_title";
    newProjectModalForm_titleLabel.textContent = "Title";
    newProjectModalForm.appendChild(newProjectModalForm_titleLabel);

    const newProjectModalForm_title = document.createElement("input");
    newProjectModalForm_title.className = "projectModalForm_title";
    newProjectModalForm_title.name = "projectModalForm_title";
    newProjectModalForm.appendChild(newProjectModalForm_title);

    const btnContainer = document.createElement("div");
    btnContainer.className = "btnContainer";
    newProjectModalForm.appendChild(btnContainer);

    const submitBtn = document.createElement("button");
    submitBtn.type = "submit";
    submitBtn.textContent = "Submit";
    btnContainer.appendChild(submitBtn);

    const cancelBtn = document.createElement("button");
    cancelBtn.type = "button";
    cancelBtn.textContent = "Cancel";
    btnContainer.appendChild(cancelBtn);

    cancelBtn.addEventListener("click", (e) => {
      e.preventDefault();
      contentDiv.removeChild(newProjectModal);
    });

    newProjectModal.appendChild(newProjectModalForm);
    contentDiv.append(newProjectModal);

    newProjectModalForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const newProjectObj = {
        id: Math.random().toString(16).slice(2),
        title: newProjectModalForm_title.value || "New Project",
        todos: [],
      };

      const lsList = JSON.parse(localStorage.getItem("projectsList")) || [];

      lsList.push(newProjectObj);
      localStorage.setItem("projectsList", JSON.stringify(lsList));

      displayProjects();
      contentDiv.removeChild(newProjectModal);
    });
  };

  const displayProjects = () => {
    projectDisplayContainer.replaceChildren();
    const lsProjectsList = JSON.parse(localStorage.getItem("projectsList"));

    lsProjectsList.forEach((element) => {
      const projectCard = document.createElement("div");
      projectCard.className = "projectCard";
      projectDisplayContainer.appendChild(projectCard);

      const handleClick = (e) => {
        e.preventDefault();
        localStorage.setItem("projectsList", JSON.stringify(lsProjectsList));
        contentDiv.replaceChildren();
        todoPage(element);
      };

      const projectCardTitle = document.createElement("div");
      projectCardTitle.className = "projectCardTitle";
      projectCardTitle.textContent = element.title;
      projectCard.appendChild(projectCardTitle);
      projectCardTitle.onclick = handleClick;

      const projectsCardTodoList = document.createElement("ul");
      projectCard.appendChild(projectsCardTodoList);
      projectsCardTodoList.className = "projectsCardTodosList";
      for (let i = 0; i < element.todos.length; i++) {
        const projectCardTodo = document.createElement("li");
        projectCardTodo.textContent = element.todos[i].task;
        projectsCardTodoList.append(projectCardTodo);
      }

      const projectCardEditBtn = document.createElement("button");
      projectCardEditBtn.className = "projectEditBtn";
      projectCardEditBtn.textContent = "Edit";
      projectCard.appendChild(projectCardEditBtn);

      projectCardEditBtn.addEventListener("click", (e) => {
        e.preventDefault();
        const newTitle = prompt("Enter the updated title.");

        if (
          newTitle === null ||
          newTitle === "" ||
          newTitle.trim().length === 0
        ) {
          return;
        }

        element.title = newTitle;

        const updatedList = lsProjectsList.map((pro) => {
          if (pro.id === element.id) {
            return element;
          }
          return pro;
        });

        localStorage.setItem("projectsList", JSON.stringify(updatedList));
        displayProjects();
      });

      const projectCardDeleteBtn = document.createElement("button");
      projectCardDeleteBtn.className = "projectDeleteBtn";
      projectCardDeleteBtn.textContent = "Delete";
      projectCard.appendChild(projectCardDeleteBtn);

      projectCardDeleteBtn.addEventListener("click", (e) => {
        e.preventDefault();
        if (confirm("Are you sure?")) {
          const filteredList = lsProjectsList.filter(
            (e) => e.id !== element.id,
          );

          localStorage.setItem("projectsList", JSON.stringify(filteredList));
          displayProjects();
        }
      });
    });
  };

  displayProjects();
};
