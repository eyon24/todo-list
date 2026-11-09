export const projectPage = () => {
  const projectsList = [];
  const contentDiv = document.querySelector(".content");

  const projectContainer = document.createElement("div");
  projectContainer.className = "projectContainer";
  contentDiv.appendChild(projectContainer);

  const newProjectBtn = document.createElement("button");
  newProjectBtn.className = "projectBtn";
  newProjectBtn.textContent = "New Project";
  projectContainer.appendChild(newProjectBtn);

  newProjectBtn.addEventListener("click", () => {
    newProject();
  });

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

    const submitBtn = document.createElement("button");
    submitBtn.type = "submit";
    submitBtn.textContent = "Submit";
    newProjectModalForm.appendChild(submitBtn);

    newProjectModal.appendChild(newProjectModalForm);
    contentDiv.append(newProjectModal);

    newProjectModalForm.addEventListener("submit", (e) => {
      e.preventDefault();

      const newProjectObj = {
        title: newProjectModalForm_title.value,
        todos: [],
      };

      projectsList.push(newProjectObj);

      updateProjects();
      contentDiv.removeChild(newProjectModal);
    });
  };

  const updateProjects = () => {
    projectDisplayContainer.replaceChildren();

    projectsList.forEach((element) => {
      const projectCard = document.createElement("div");
      projectCard.className = "projectCard";
      projectDisplayContainer.appendChild(projectCard);

      const projectCardTitle = document.createElement("div");
      projectCardTitle.className = "projectCardTitle";
      projectCardTitle.textContent = element.title;
      projectCard.appendChild(projectCardTitle);

      const projectsCardTodoList = document.createElement("ul");
      projectCard.appendChild(projectsCardTodoList);
      projectsCardTodoList.className = "projectsCardTodosList";
      for (let i = 0; i < element.todos.length; i++) {
        const projectCardTodo = document.createElement("li");
        projectCardTodo.textContent = element.todo[i];
        projectsCardTodoList.append(projectCardTodo);
      }
    });
  };
};
