//Récupérer toutes les entrèes de l'utilisateur depuis la barre de recherche
const searchBar = document.querySelector('.search-bar-input');
const recipesContainer = document.querySelector('.recipes-container');

//Ecouter l'événement keyup de chaque entrée de caractère
searchBar.addEventListener('keyup', getSearchResult);


//Fonction de callback de l'événement keyup qui récupére toutes les recettes filtrèes
function getSearchResult() {
    //Chercher dans les noms ou ingredients ou description d'une recette
    //les mots entrès dans la barre de recherche
    const inputSuggestion = getSearchInNamesDescriptionIngredients();
    console.log(inputSuggestion);
    getCardRecipe(inputSuggestion);
}

//Création d'une carte de recette
function getCardRecipe(inputSuggestion) {
    for( let i = 0; i < inputSuggestion.length; i++) {
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
        const ingredientsBloc = document.createElement('div');
        ingredientsBloc.setAttribute('class', 'ingredients-bloc');
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
        title.innerHTML = inputSuggestion[i].name;
        time.innerHTML = inputSuggestion[i].time + " " + "min";
        //Création de l'élément ingrédients
        for(let j = 0; j < inputSuggestion[i].ingredients.length; j++) {
            const ingredients = document.createElement('div');
            ingredients.setAttribute('class', 'ingredients-ingredient-quantity-unit');
            let ingredient = document.createElement('p');
            ingredient.setAttribute('class', 'ingredient');
            const quantityUnit = document.createElement('div');
            quantityUnit.setAttribute('class', 'quantity-unit');
            let quantity = document.createElement('p');
            quantity.setAttribute('class', 'quantity');
            let unit = document.createElement('p');
            unit.setAttribute('class', 'unit');
            ingredientsDescription.appendChild(ingredients);
            ingredients.appendChild(ingredient);
            quantityUnit.appendChild(quantity)
            quantityUnit.appendChild(unit);
            ingredients.appendChild(quantityUnit);
            ingredientsBloc.appendChild(ingredients);
            ingredient.innerHTML = inputSuggestion[i].ingredients[j].ingredient + ":";
            quantity.innerHTML = inputSuggestion[i].ingredients[j].quantity;
            unit.innerHTML = inputSuggestion[i].ingredients[j].unit;
            //Tester le cas ou il n'ya pas d'unité
             if(unit.innerHTML === "undefined") {
                unit.innerHTML = "";
            }
            //Tester le cas ou il n'ya pas de quantité
            if(quantity.innerHTML === "undefined") {
                quantity.innerHTML = "";
                ingredient.innerHTML = inputSuggestion[i].ingredients[j].ingredient;
            }
        }
        description.innerHTML = inputSuggestion[i].description;
        ingredientsDescription.appendChild(ingredientsBloc);
        ingredientsDescription.appendChild(description);
        recipeCard.appendChild(recipeHeader);
        recipeCard.appendChild(recipeText);
    }
}

/*Fonctions qui cherchent des mots dans les titres, les descriptions et les ingrédeints
d'une recette*/
function getSearchInNamesDescriptionIngredients() {
    const searchBarInput = searchBar.value;
    //Filtrer les données du tableau des recettes qui inclus les entrèes de notre input
    //totalLowerCase ne fait pas la différence entre miniscule et majuscule
    //Includes() permet de comparer les données et les entrèes input
    const inputSuggestion = recipes.filter((item => item.name.toLocaleLowerCase()
    .includes(searchBarInput.toLocaleLowerCase())) || (item => item.description.toLocaleLowerCase()
    .includes(searchBarInput.toLocaleLowerCase())) || (item => item.ingredients.toLocaleLowerCase()
    .includes(searchBarInput.toLocaleLowerCase())));
    return inputSuggestion;
}

function getSearchInIngredients() {
    const searchBarInput = searchBar.value;
    let ingredient = recipes.filter(item => item.ingredients.filter(item => item.ingredient
    .toLocaleLowerCase().includes(searchBarInput.toLocaleLowerCase()))
    .toLocaleLowerCase().includes(searchBarInput.toLocaleLowerCase()));
    return ingredient;
}

//Afficher les recettes par rapport aux mots entrés
function displayRecipes(inputSuggestion) {
}

/*const test = getSearchInIngredients();
console.log(test);*/
