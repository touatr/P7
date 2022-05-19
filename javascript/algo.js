//Récupérer toutes les entrèes de l'utilisateur depuis la barre de recherche
const searchBar = document.querySelector('.search-bar-input');
let recipesContainer = document.querySelector('.recipes-container');
const tagIconDown = document.querySelectorAll('.fa-chevron-down');
const tagIconUp = document.querySelectorAll('.fa-angle-up');
const inputsTag = document.querySelectorAll('.input');
const labelsTag = document.getElementsByTagName('label');
let sections = document.getElementsByTagName('section');
let currentRecipes = [];


//Afficher les recettes selon le mot entré
displayRecipes();
//Afficher les ingrédients selon le mot entré
displayIngredients();
//Afficher les appareils selon le mot entré
displayAppliances();
//Afficher les ustensils selon le mot entré
displayUtensils();

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
        //Vider le contenu des tags
        sections[0].innerHTML = "";
        sections[1].innerHTML = "";
        sections[2].innerHTML = "";
        //Afficher les nouvelles recettes en fontion de la recherche principale
        setCardRecipe(inputSuggestion);
        //Afficher la liste des ingrédients
        setIngredientsTag(inputSuggestion, 0);
        //Afficher la liste des appareils
        setAppliancesTag(inputSuggestion, 1);
        //Afficher la liste des ustensiles
        setUtensilsTag(inputSuggestion, 2);
    }
    else {
        //Vider les contenu de la barre de recherche et le contenu des tags
        recipesContainer.innerHTML = "";
        //Vider le contenu des tags
        sections[0].innerHTML = "";
        sections[1].innerHTML = "";
        sections[2].innerHTML = "";
    }
     //Afficher un message quand aucune recette trouvé
     if(inputSuggestion.length === 0) {
        recipesContainer.innerHTML = "Aucune recette ne correspond à votre critère… vous pouvez" +
        " chercher «tartes au pommes», «poisson», ect...";
        recipesContainer.style.marginLeft = "-1rem";
    }
}

//Fonction de callback de l'événement input qui récupére la liste des ingrédients
function getSearchIngredientsResult() {
    //Chercher dans les ingrédients 
    let inputIngredients = getSearchIngredients();
    //Tester si la barre des ingrédients contient aux moins 3 caractères
    if(inputsTag[0].value.length > 2) {
        //Vider le contenu du tag
        sections[0].innerHTML = "";
        //Afficher la liste des ingrédients
        setIngredientsTag(inputIngredients, 0);
    }
    else {
        //Vider le contenu du tag
        sections[0].innerHTML = "";
    }
    //Afficher un message quand aucun ingrédiant na été trouvé
    if(inputIngredients.length === 0) {
        sections[0].innerHTML = "Aucun ingrédient ne correspond à votre critère !";
    }
}

//Fonction de callback de l'événement input qui récupére la liste des appareils
function getSearchAppliancesResult() {
    //Chercher dans les appareils
    let inputAppliances = getSearchAppliances();
    //Tester si la barre des ingrédients contient aux moins 3 caractères
    if(inputsTag[1].value.length > 2) {
        //Vider le contenu du tag
        sections[1].innerHTML = "";
        //Afficher la liste des appareils
        setAppliancesTag(inputAppliances, 1);
    }
    else {
        //Vider le contenu du tag
        sections[1].innerHTML = "";
    }
    //Afficher un message quand aucun appareil na été trouvé
    if(inputAppliances.length === 0) {
        sections[1].innerHTML = "Aucun appareil ne correspond à votre critère !";
    }
}

//Fonction de callback de l'événement input qui récupére la liste des ustensils
function getSearchUtensilsResult() {
    //Chercher dans les ingrédients 
    let inputUtensils = getSearchUtensils();
    //Tester si la barre des ingrédients contient aux moins 3 caractères
    if(inputsTag[2].value.length > 2) {
        //Vider le contenu du tag
        sections[2].innerHTML = "";
        //Afficher la liste des ingrédients
        setUtensilsTag(inputUtensils, 2);
    }
    else {
        //Vider le contenu du tag
        sections[2].innerHTML = "";
    }
    //Afficher un message quand aucun ustensil na été trouvé
    if(inputUtensils.length === 0) {
        sections[2].innerHTML = "Aucun ustensil ne correspond à votre critère !";
    }
}

//Création d'une carte de recette
function setCardRecipe(inputSuggestion) {
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

function ingredientIsInCurrentRecipes(ingredient) {
    //Vérifier si ingrédient est dans currentRecipes retourner true ou false en fonction

}
//Création de la liste des ingrédients
function setIngredientsTag(inputTag, index) {
    //Tableau qui va contenir que les ingrédients trouvé
    let containTag = [];
    const blocText = document.createElement('div');
    blocText.setAttribute('class', 'text');
    sections[index].appendChild(blocText);
    //Parcourir le tableau des inputTag contenant le résulat de recherche
    let col = document.createElement('div');
    col.setAttribute('class', 'col');
    for(let i = 0; i < inputTag.length; i++) {
        //Parcourir le tableau des ingrédients
        for(let j = 0; j < inputTag[i].ingredients.length; j++) {
            //Ajouter chaque ingrédient dans la tag Ingrédients
            const ingredient = inputTag[i].ingredients[j].ingredient;
            //Vérifier si l'ingrédient est dans le bloc text
            if(!containTag.includes(ingredient)) {
                const text = document.createElement('p');
                text.innerHTML = ingredient;
                containTag.push(ingredient);
                col.appendChild(text);
                //Créer un nouveau élément col tous les 10 ingrédients
                if(col.children.length > 9) {
                    blocText.appendChild(col);
                    col = document.createElement('div');
                    col.setAttribute('class', 'col');
                }
            }
        }  
    }
    if(col.children.length > 0) {
        blocText.appendChild(col);
    }
    //Filtrer les résulats du tag en fonction du mot entré dans le champs ingrédients
    const ingredientInput = inputsTag[index].value;
    result = containTag.filter(word => word.toLocaleLowerCase().includes(ingredientInput));
    //Afficher les ingrédients s'ils contiennent le mot entré
    blocText.innerHTML = "";
    const blocTextBis = document.createElement('div');
    for(let i = 0 ; i < result.length; i++) {
        const text = document.createElement('p');
        text.innerHTML = result[i];
        blocTextBis.appendChild(text);
        blocTextBis.style.flexDirection = 'column';
        sections[index].appendChild(blocTextBis);
    }
}

//Création de la liste des appareils
function setAppliancesTag(inputTag, index) {
    let containTag = [];
    const blocText = document.createElement('div');
    blocText.setAttribute('class', 'text');
    sections[index].appendChild(blocText);
    let col = document.createElement('div');
    col.setAttribute('class', 'col');
    for(let i = 0; i < inputTag.length; i++) {
        const appliance = inputTag[i].appliance;
        if(!containTag.includes(appliance)) {
            const text = document.createElement('p');
            text.innerHTML = appliance;
            containTag.push(appliance);
            col.appendChild(text);
            if(col.children.length > 9) {
                blocText.appendChild(col);
                col = document.createElement('div');
                col.setAttribute('class', 'col');
            }
        }
    }
    if(col.children.length > 0) {
        blocText.appendChild(col);
    }
}

//Création de la liste des ustensiles
function setUtensilsTag(inputTag, index) {
    let containTag = [];
    const blocText = document.createElement('div');
    blocText.setAttribute('class', 'text');
    sections[index].appendChild(blocText);
    let col = document.createElement('div');
    col.setAttribute('class', 'col');
    for(let i = 0; i < inputTag.length; i++) {
        for(let j = 0; j < inputTag[i].ustensils.length; j++) {
            const ustensil = inputTag[i].ustensils[j];
            if(!containTag.includes(ustensil)) {
                const text = document.createElement('p');
                text.innerHTML = ustensil;
                containTag.push(ustensil);
                col.appendChild(text);
                if(col.children.length > 9) {
                    blocText.appendChild(col);
                    col = document.createElement('div');
                    col.setAttribute('class', 'col');
                }
            }
        }  
    }
     if(col.children.length > 0) {
        blocText.appendChild(col);
    }
    //Filtrer les résulats du tag en fonction du mot entré dans le champs ustensils
    const ustensilInput = inputsTag[2].value;
    result = containTag.filter(word => word.toLocaleLowerCase().includes(ustensilInput));
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
    currentRecipes = inputSuggestion;
    return inputSuggestion;
}

//Chercher les mots dans les ingédients
function getSearchIngredients() {
    const ingredientsInput = inputsTag[0].value;
    const inputSuggestion = recipes.filter(item => hasIngredient(ingredientsInput, item));
    return inputSuggestion;
}

//Chercher les mots dans les appliances
function getSearchAppliances() {
    const appliancesInput = inputsTag[1].value;
    const inputSuggestion = recipes.filter(item => item.appliance.toLocaleLowerCase()
    .includes(appliancesInput.toLocaleLowerCase()));
    return inputSuggestion;
}

//Chercher les mots dans les ustensiles
function getSearchUtensils() {
    const utensilsInput = inputsTag[2].value;
    const inputSuggestion = recipes.filter(item => hasUtensil(utensilsInput, item));
    return inputSuggestion;
}

//Chercher si un mot est contenu dans un ingrédient
function hasIngredient(input, recipe) {
    for(const ingredient of recipe.ingredients) {
        if(ingredient.ingredient.toLocaleLowerCase().includes(input.toLocaleLowerCase()))
        return true;
    }
    return false;
}

function hasIngredientBis(input, recipe) {
    for(const ingredient of recipe.ingredients) {
        if(ingredient.ingredient.toLocaleLowerCase() === input)
        return true;
    }
    return false;
}

//Chercher si un mot est contenu dans un ustensil
function hasUtensil(input, recipe) {
    for(let i = 0; i < recipe.ustensils.length; i++) {
        if(recipe.ustensils[i].toLocaleLowerCase().includes(input.toLocaleLowerCase()))
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
        sections[index].style.display = "block";
    });
}

//Masquer un tag en fonction de l'index
function hiddenTag(index) {
    tagIconUp[index].addEventListener('click', function() {
        tagIconDown[index].style.display = "block";
        tagIconUp[index].style.display = "none";
        inputsTag[index].style.display = "none";
        labelsTag[index].style.display = "block";
        sections[index].style.display = "none";
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

//Afficher la liste des ingrédients par rapport aux mots entrés
function displayIngredients() {
    //Ecouter l'événement input de chaque entrée de caractère
    inputsTag[0].addEventListener('input', getSearchIngredientsResult);
    //Empêcher le comportement de la touche Entrée pour ne pas actualiser la page
    inputsTag[0].addEventListener('keydown', function(event) {
        if(event.key === "Enter") {
            event.preventDefault();
        }
    });
}

//Afficher la liste des appareils par rapport aux mots entrés
function displayAppliances() {
    //Ecouter l'événement input de chaque entrée de caractère
    inputsTag[1].addEventListener('input', getSearchAppliancesResult);
    //Empêcher le comportement de la touche Entrée pour ne pas actualiser la page
    inputsTag[1].addEventListener('keydown', function(event) {
        if(event.key === "Enter") {
            event.preventDefault();
        }
    });
}

//Afficher la liste des ustensils par rapport aux mots entrés
function displayUtensils() {
    //Ecouter l'événement input de chaque entrée de caractère
    inputsTag[2].addEventListener('input', getSearchUtensilsResult);
    //Empêcher le comportement de la touche Entrée pour ne pas actualiser la page
    inputsTag[2].addEventListener('keydown', function(event) {
        if(event.key === "Enter") {
            event.preventDefault();
        }
    });
}