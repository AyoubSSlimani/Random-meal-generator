const button = document.querySelector("button");
const title = document.querySelector(".meal-name");
const list = document.querySelector(".ingredient");
const instructions = document.querySelector(".instruction");
const img = document.querySelector("img");
const video = document.querySelector("iframe");




let result;
button.addEventListener("click", generateRandomMeal);

async function generateRandomMeal() {
  try {
    const response = await fetch(
      "https://www.themealdb.com/api/json/v1/1/random.php"
    );
    const responseJSON = await response.json();
    result = responseJSON.meals[0];
    title.textContent = result.strMeal;
    img.src = result.strMealThumb;
    instructions.textContent += result.strInstructions;
    video.src = result.strYoutube.replace("watch?v=", "embed/");
    for (let i = 1; i <= 20; i++) {
      if (result[`strIngredient${i}`]) {
        const li = document.createElement("li");
        li.textContent = result[`strIngredient${i}`] + " " + result[`strMeasure${i}`];
        list.appendChild(li);
      }
    }
  } catch (err) {
    console.log(err);
  }
}

window.addEventListener("load", async () => {
  await generateRandomMeal();
});
