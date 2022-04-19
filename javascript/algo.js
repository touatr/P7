//Récupérer toutes les entrèes de l'utilisateur depuis la barre de recherche
const searchBar = document.querySelector('.search-bar-input');
let recipesContainer = document.querySelector('.recipes-container');
const tagIconDown = document.querySelectorAll('.fa-chevron-down');
const tagIconUp = document.querySelectorAll('.fa-angle-up');
const inputsTag = document.querySelectorAll('.input');
const labelsTag = document.getElementsByTagName('label');

//Afficher les recettes selon le mot entré
displayRecipes();
//Afficher les contenus des tag ingrédients, appareils et ustensils
displayTag(0);
displayTag(1);
displayTag(2);

//Masquer les contenus des tag ingrédients, appareils et ustensils
hiddenTag(0);
hiddenTag(1);
hiddenTag(2);

//Fonction de callback de l'événement input qui récupére toutes les recettes filtrèes
function getSearchResult() {
    recipesContainer.style.marginLeft = "-3rem";
    //Chercher dans les noms ou les ingredients ou la description d'une recette
    //les mots entrès dans la barre de recherche
    let inputSuggestion = getSearchBar();
    //Tester si la barre de recherche contient aux moins 3 caractères
    if(searchBar.value.length > 2) {
        //Vider le contenu des recettes
        recipesContainer.innerHTML = "";
        //Afficher les nouvelles recettes
        getCardRecipe(inputSuggestion);
        //let inputIngredients = getSearchIngredient();
    }
    else {
        recipesContainer.innerHTML = "";
    }
     //Afficher un message quand aucune recette trouvé
     if(inputSuggestion.length === 0) {
        recipesContainer.innerHTML = "Aucune recette ne correspond à votre critère… vous pouvez" +
        " chercher «tartes au pommes», «poisson», ect...";
        recipesContainer.style.marginLeft = "-1rem";
    }
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

/*Fonctions qui cherchent des mots dans les titres, les descriptions et les ingrédients
d'une recette*/
function getSearchBar() {
    const searchBarInput = searchBar.value;
    //Filtrer les données du tableau des recettes qui inclus les entrèes de notre input
    //totalLowerCase ne fait pas la différence entre miniscule et majuscule
    //Includes() permet de comparer les données et les entrèes input
    const inputSuggestion = recipes.filter((item => item.name.toLocaleLowerCase()
    .includes(searchBarInput.toLocaleLowerCase())) && (item => item.description.toLocaleLowerCase()
    .includes(searchBarInput.toLocaleLowerCase())) && (item => hasIngredient(searchBarInput, item)));
    console.log(inputSuggestion);
    return inputSuggestion;
}

//Filtrer dans les ingédients
function getSearchIngredient() {
    const searchBarInput = searchBar.value;
    const inputSuggestion = recipes.filter(item => hasIngredient(searchBarInput, item));
    console.log(inputSuggestion);
}

//Chercher si un mot est contenu dans un ingrédient
function hasIngredient(input, recipe) {
    for(const ingredient of recipe.ingredients) {
        if(ingredient.ingredient.toLocaleLowerCase().includes(input.toLocaleLowerCase()))
        return true;
    }
    return false;
}

//Afficher un tag en fonction de l'index
function displayTag(index) {
    tagIconDown[index].addEventListener('click', function() {
        tagIconDown[index].style.display = "none";
        tagIconUp[index].style.display = "block";
        inputsTag[index].style.display = "block";
        labelsTag[index].style.display = "none";
    });
}

//Masquer un tag en fonction de l'index
function hiddenTag(index) {
    tagIconUp[index].addEventListener('click', function() {
        tagIconDown[index].style.display = "block";
        tagIconUp[index].style.display = "none";
        inputsTag[index].style.display = "none";
        labelsTag[index].style.display = "block";
    });
}

//Afficher les recettes par rapport aux mots entrés
function displayRecipes() {
    //Ecouter l'événement input de chaque entrée de caractère
    searchBar.addEventListener('input', getSearchResult);
    //Empêcher le comportement de la touche Entrée pour ne pas actualiser la page
    searchBar.addEventListener('keydown', function(event) {
        if(event.key === "Enter") {
            event.preventDefault();
        }
    });
}

