//Récupérer toutes les entrèes de l'utilisateur depuis la barre de recherche
const searchBar = document.querySelector('.search-bar-input');

//Ecouter l'événement keyup de chaque entrée de caractère
searchBar.addEventListener('keyup', getSearchResult);


//Fonction de callback de l'événement keyup
function getSearchResult() {
    //Chercher dans les noms d'une recette les mots entrès dans la barre de recherche
    const namesSuggestion = getSearchInNames();
    //Chercher dans les descriptions d'une recette les mots entrès dans la barre de recherche
    const descriptionsSuggestion = getSearchInDescription();
    //Chercher dans les ingrédients d'une recette les mots entrès dans la barre de recherche
    const ingredientsSuggestion = getSearchInIngredients();
    
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
