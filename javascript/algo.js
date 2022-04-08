//Récupérer toutes les entrèes de l'utilisateur depuis la barre de recherche
const searchBar = document.querySelector('.search-bar-input');
const recipesContainer = document.querySelector('.recipes-container');

//Ecouter l'événement keyup de chaque entrée de caractère
searchBar.addEventListener('keyup', getSearchResult);


//Fonction de callback de l'événement keyup
function getSearchResult() {
    //Chercher dans les noms d'une recette les mots entrès dans la barre de recherche
    const namesSuggestion = getSearchInNames();
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
        const time = document.createElement('p');
        time.setAttribute('class', 'time');
        const ingredientsDescription = document.createElement('div');
        ingredientsDescription.setAttribute('class', 'ingredients-description');
        const ingredients = document.createElement('div');
        ingredients.setAttribute('class', 'ingredients');
        const ingredient = document.createElement('p');
        ingredient.setAttribute('class', 'ingredient');
        const quantity = document.createElement('p');
        quantity.setAttribute('class', 'quantity');
        const unit = document.createElement('p');
        unit.setAttribute('class', 'unit');
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
        ingredients.appendChild(ingredient);
        ingredients.appendChild(quantity);
        title.innerHTML = namesSuggestion[i].name;
        time.innerHTML = namesSuggestion[i].time + " " + "min";
        ingredient.innerHTML = namesSuggestion[i].ingredients[i].ingredient;
        quantity.innerHTML = namesSuggestion[i].ingredients[i].quantity;
        description.innerHTML = namesSuggestion[i].description;
        recipeCard.appendChild(recipeHeader);
        recipeCard.appendChild(recipeText);
    }

    //Chercher dans les descriptions d'une recette les mots entrès dans la barre de recherche
    const descriptionsSuggestion = getSearchInDescription();
    //Chercher dans les ingrédients d'une recette les mots entrès dans la barre de recherche
    const ingredientsSuggestion = getSearchInIngredients();
}

//Afficher les recettes par rapport aux mots entrés
function displayRecipes() {

}

/*Fonctions qui cherchent des mots dans les titres, les descriptions et les ingrédeints
d'une recette*/
function getSearchInNames() {
    const searchBarInput = searchBar.value;
    //Filtrer les données du tableau des recettes qui inclus les entrèes de notre input
    //totalLowerCase ne fait pas la différence entre miniscule et majuscule
    //Includes() permet de comparer les données et les entrèes input
    const namesSuggestion = recipes.filter(item => item.name.toLocaleLowerCase()
    .includes(searchBarInput.toLocaleLowerCase()));
    return namesSuggestion;
}

function getSearchInDescription() {
    const searchBarInput = searchBar.value;
    const descriptionsSuggestion = recipes.filter(item => item.description.toLocaleLowerCase()
    .includes(searchBarInput.toLocaleLowerCase()));
    return descriptionsSuggestion;
}

function getSearchInIngredients() {
    const searchBarInput = searchBar.value;
    const ingredientsSuggestion = [];
    //Boucle for qui parcout tout le tableau recipes
    for(let i = 0; i < recipes.length; i++) {
        let ingredient = recipes[i].ingredients.filter(item => item.ingredient
        .toLocaleLowerCase().includes(searchBarInput.toLocaleLowerCase()));
        //Supprimer les tableaux d'ingrédients vides
        if(ingredient.length > 0) {
            ingredientsSuggestion.push(ingredient);
        }
    }
    return ingredientsSuggestion;
}
