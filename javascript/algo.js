//Récupérer toutes les entrèes de l'utilisateur depuis la barre de recherche
const searchBar = document.querySelector('.search-bar-input');
const recipesContainer = document.querySelector('.recipes-container');

//Ecouter l'événement keyup de chaque entrée de caractère
searchBar.addEventListener('keyup', getSearchResult);


//Fonction de callback de l'événement keyup
function getSearchResult() {
    //Chercher dans les noms d'une recette les mots entrès dans la barre de recherche
    const namesSuggestion = getSearchInNamesDescriptionIngredients();
    console.log(namesSuggestion);
    for( let i = 0; i < namesSuggestion.length; i++) {
        //Création de la carte recette
        const recipeCard = document.createElement('div');
        recipeCard.setAttribute('class', 'recipe-card');
        recipesContainer.appendChild(recipeCard);
        const recipeHeader = document.createElement('div');
        recipeHeader.setAttribute('class', 'recipe-header');
        const recipeText = document.createElement('div');
        recipeText.setAttribute('class', 'recipe-text');
        const titleTime = document.createElement('div');
        titleTime.setAttribute('class', 'title-time');
        const title = document.createElement('h3');
        title.setAttribute('class', 'title');
        const timeRecipe = document.createElement('div');
        timeRecipe.setAttribute('class', 'time-recipe');
        const timeIcon = document.createElement('i');
        timeIcon.setAttribute('class', 'time-icon');
        timeIcon.setAttribute('class', 'fa-solid fa-clock');
        const time = document.createElement('p');
        time.setAttribute('class', 'time');
        const ingredientsDescription = document.createElement('div');
        ingredientsDescription.setAttribute('class', 'ingredients-description');
        const ingredients = document.createElement('div');
        ingredients.setAttribute('class', 'ingredients-bloc');
        const description = document.createElement('p');
        description.setAttribute('class', 'description');
        recipesContainer.appendChild(recipeCard);
        recipeCard.appendChild(recipeHeader);
        recipeCard.appendChild(recipeText);
        recipeText.appendChild(titleTime);
        recipeText.appendChild(ingredientsDescription);
        titleTime.appendChild(title);
        titleTime.appendChild(timeRecipe);
        timeRecipe.appendChild(timeIcon);
        timeRecipe.appendChild(time);
        ingredientsDescription.appendChild(ingredients);
        ingredientsDescription.appendChild(description);
        title.innerHTML = namesSuggestion[i].name;
        time.innerHTML = namesSuggestion[i].time + " " + "min";
        for(let j = 0; j < namesSuggestion[i].ingredients.length; j++) {
            let ingredient = document.createElement('p');
            ingredient.setAttribute('class', 'ingredient');
            const quantityUnit = document.createElement('div');
            quantityUnit.setAttribute('class', 'quantity-unit');
            let quantity = document.createElement('p');
            quantity.setAttribute('class', 'quantity');
            let unit = document.createElement('p');
            unit.setAttribute('class', 'unit');
            quantityUnit.appendChild(quantity)
            quantityUnit.appendChild(unit);
            ingredients.appendChild(ingredient);
            ingredients.appendChild(quantityUnit);
            ingredient.innerHTML = namesSuggestion[i].ingredients[j].ingredient + ":";
            quantity.innerHTML = namesSuggestion[i].ingredients[j].quantity;
            unit.innerHTML = namesSuggestion[i].ingredients[j].unit;
            //Tester les cas ou il n'ya pas d'unité
            unit.innerHTML = namesSuggestion[i].ingredients[j].unit;
             if(unit.innerHTML === "undefined") {
                unit.innerHTML = "";
            }
        }
        description.innerHTML = namesSuggestion[i].description;
        recipeCard.appendChild(recipeHeader);
        recipeCard.appendChild(recipeText);
    }
}

//Afficher les recettes par rapport aux mots entrés
function displayRecipes() {

}

/*Fonctions qui cherchent des mots dans les titres, les descriptions et les ingrédeints
d'une recette*/
function getSearchInNamesDescriptionIngredients() {
    const searchBarInput = searchBar.value;
    //Filtrer les données du tableau des recettes qui inclus les entrèes de notre input
    //totalLowerCase ne fait pas la différence entre miniscule et majuscule
    //Includes() permet de comparer les données et les entrèes input
    const namesSuggestion = recipes.filter((item => item.name.toLocaleLowerCase()
    .includes(searchBarInput.toLocaleLowerCase())) || (item => item.description.toLocaleLowerCase()
    .includes(searchBarInput.toLocaleLowerCase())) || (item => item.ingredients.toLocaleLowerCase()
    .includes(searchBarInput.toLocaleLowerCase())));
    return namesSuggestion;
}

function getSearchInIngredients() {
    const searchBarInput = searchBar.value;
    let ingredient = recipes.filter(item => item.ingredients.filter(item => item.ingredient
    .toLocaleLowerCase().includes(searchBarInput.toLocaleLowerCase()))
    .toLocaleLowerCase().includes(searchBarInput.toLocaleLowerCase()));
    return ingredient;
}

/*const test = getSearchInIngredients();
console.log(test);*/
