function getRecipes() {
  document.querySelector(".recipes").innerHTML = "";
  fetch(`api/recipes`)
    .then((response) => response.json())
    .then((recipes) => renderRecipes(recipes));
}

function renderRecipes(recipes) {
  recipes.forEach((recipe) => {
    let recipeEl = document.createElement("div");
    recipeEl.innerHTML = `
    <img src="img/${recipe.image}" alt="${recipe.title}" />
    <h3>${recipe.title}</h3>
    <p>${recipe.description}</p>
    `;
    document.querySelector(".recipes").append(recipeEl);
  });
}

function addRecipe(event) {
  event.preventDefault();

  const { title, image, description } = event.target;

  const recipe = {
    title: title.value,
    image: image.value,
    description: description.value,
  };

  fetch(`api/recipes`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(recipe),
  })
    .then((response) => response.json())
    .then(getRecipes);
}

const addForm = document.querySelector("#addForm");
addForm.addEventListener("submit", addRecipe);

getRecipes();
