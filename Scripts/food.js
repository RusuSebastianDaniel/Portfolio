
const apiKey = `174a689d542542b19b195d61b948ce03`;
const apiUrl = `https://api.spoonacular.com/recipes/random?apiKey=${apiKey}&number=1`;
const foodCardPage = document.querySelector(`.food-card-page`);
const foodOpenButton = document.querySelector(`.food-open-btn`);
const foodIcon = document.querySelector(`.fa-utensils`);
const foodSection = document.querySelector('.food-card-section');
const foodCardPageCoords = foodCardPage.getBoundingClientRect();
const foodCardPageMiddleX = foodCardPageCoords.x + foodCardPageCoords.width / 2;
const foodCardPageMiddleY = foodCardPageCoords.y + foodCardPageCoords.height / 2;

//animation for the food card

foodSection.addEventListener("mousemove", (e) => {
    e.stopImmediatePropagation()
    rotateElement(e, foodCardPage, foodCardPageMiddleX, foodCardPageMiddleY);
});
//expand card on click
foodOpenButton.addEventListener(`click`, () => {
  foodCardPage.classList.toggle(`expanded`)
  foodIcon.classList.toggle(`fa-utensils`)
  foodCardPage.classList.toggle(`food-card-page`)
  foodOpenButton.textContent = foodCardPage.classList.contains(`expanded`) ? `Close` : `Open`;
  if (foodCardPage.classList.contains(`expanded`)) {
    getRecipe();
  } else {
    foodCardPage.removeChild(foodCardPage.lastChild);
  }
})

async function getRecipe() {
 // fetch the data from the api
  await fetch(apiUrl)
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      const {
        title,
        readyInMinutes,
        image,
        summary,
        instructions,
      } = data.recipes[0];

     //filter the html tags and links
      const instructionsFiltered = instructions.replace(/<[^>]*>?/gm, ``);
      const summaryFiltered = summary.replace(/<[^>]*>?/gm, ``);
      
      const { extendedIngredients: ingredients } = data.recipes[0];
      const ingredientsList = ingredients.map((ingredient) => {
        return `<li class="steps">${ingredient.original}</li>`;
      });
      createCard(
        title,
        readyInMinutes,
        image,
        summaryFiltered,
        instructionsFiltered,
        ingredientsList,
      );
    })
    .catch((err) => {
      console.error(err);
    });
}

function createCard(
  title,
  readyInMinutes,
  image,
  summary,
  instructions,
  ingredientsList,
) {
  const cardDiv = createElem(`div`, null, `card`);
  const cardHeaderDiv = createElem(`div`, null, `title`);
  const cardBodyDiv = createElem(`div`, null, `main`);
  const titleH2 = createElem(`h2`, title, `title`);
  const readyInMinutesH3 = createElem(`h3`, `Ready in ${readyInMinutes} minutes`);
  const imageImg = createImg(image, `food`);
  const summaryH3 = createElem(`h3`, `Summary`);
  const summaryP = createElem(`p`, summary);
  const instructionsH3 = createElem(`h3`, `Instructions`);
  const instructionsP = createElem(`p`, instructions);
  const stepsAndIngredientsDiv = createElem(`div`, null, `steps-and-ingredients`);
  const ingredientsH3 = createElem(`h3`, `Ingredients`);
  const ingredientsUl = document.createElement(`ul`);
  ingredientsUl.innerHTML = ingredientsList;
  ingredientsUl.classList.add(`steps`);
  //append the elements to the html
  cardHeaderDiv.appendChild(titleH2);
  cardHeaderDiv.appendChild(readyInMinutesH3);
  cardHeaderDiv.appendChild(imageImg);
  cardBodyDiv.appendChild(summaryH3);
  cardBodyDiv.appendChild(summaryP);
  cardBodyDiv.appendChild(instructionsH3);
  cardBodyDiv.appendChild(instructionsP);
  stepsAndIngredientsDiv.appendChild(ingredientsH3);
  stepsAndIngredientsDiv.appendChild(ingredientsUl);
  cardDiv.appendChild(stepsAndIngredientsDiv);
  cardDiv.appendChild(cardHeaderDiv);
  cardDiv.appendChild(cardBodyDiv);
  foodCardPage.appendChild(cardDiv);
}









