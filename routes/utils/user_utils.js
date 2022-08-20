const DButils = require("./DButils");

async function markAsFavorite(user_id, recipe_id) {
    await DButils.execQuery(`INSERT INTO FavoriteRecipes (user_id, recipe_id) VALUES ('${user_id}', '${recipe_id}')`)
}

async function removeFavorite(user_id, recipe_id) {
    console.log("deleting recepie=" + recipe_id + "of user=" + user_id)
    await DButils.execQuery(`DELETE FROM FavoriteRecipes WHERE (user_id='${user_id}') and (recipe_id='${recipe_id}')`)
}


async function getFavoriteRecipes(user_id) {
    const recipes_id = await DButils.execQuery(`select recipe_id from FavoriteRecipes where user_id='${user_id}'`)
    return recipes_id;
}

async function markAsLastWatched(user_id, recipe_id_1, recipe_id_2, recipe_id_3) {
    // await DButils.execQuery(`INSERT INTO watchedrecipes (user_id, recipe_id_1, recipe_id_2, recipe_id_3) VALUES ('${user_id}', '${recipe_id_1}', '${recipe_id_2}', '${recipe_id_3}')`)
    await DButils.execQuery(`INSERT INTO watchedrecipes (user_id, recipe_id_1, recipe_id_2, recipe_id_3) 
                            VALUES ('${user_id}', '${recipe_id_1}', '${recipe_id_2}', '${recipe_id_3}') 
                            ON DUPLICATE KEY UPDATE recipe_id_1='${recipe_id_1}', recipe_id_2='${recipe_id_2}', recipe_id_3='${recipe_id_3}'`)
}

async function getLastWatchedRecipes(user_id) {
    const recipes_id = await DButils.execQuery(`select * from watchedrecipes where user_id='${user_id}'`)
    return recipes_id[0];
}

async function addUserRecipe(recipeDetails, user_id) {
    const {
    title,
    readyInMinutes,
    image,
    popularity,
    vegan,
    vegetarian,
    glutenFree,
    FullRecipe
    // servings,
    // instructions,
    // ingredients
    } = recipeDetails
    // const ingredients = JSON.stringify(ingredientsRec) 
    const servings = FullRecipe.servings;
    const instructions = FullRecipe.instructions;
    const ingredients = JSON.stringify(FullRecipe.ingredients);
    const veganBit = vegan==='true' ? 1 : 0;
    const vegetarianBit = vegetarian==='true' ? 1 : 0;
    const glutenFreeBit = glutenFree==='true' ? 1 : 0;
    //Add new recipe to DB
    await DButils.execQuery(`INSERT INTO recipes (user_id, title, image, readyInMinutes, popularity, vegan, vegetarian, glutenFree, instructions, ingredients, servings) VALUES ('${user_id}', '${title}', '${image}', '${readyInMinutes}', '${popularity}', '${veganBit}', '${vegetarianBit}', '${glutenFreeBit}', '${instructions}', '${ingredients}', '${servings}')`)
}

async function getUserRecipes(user_id) {
    const user_recipes = await DButils.execQuery(`select * from recipes where user_id='${user_id}'`)
    let recipes =[]
    user_recipes.map((userRecipe) => recipes.push(createUserRecipe(userRecipe)))
    return recipes;
}

function createUserRecipe(userRecipe) {
    let recipe = {};
    recipe.id = userRecipe.id;
    recipe.user_id = userRecipe.user_id;
    recipe.title = userRecipe.title;
    recipe.readyInMinutes = userRecipe.readyInMinutes;
    recipe.image = userRecipe.image;
    recipe.popularity = userRecipe.popularity;
    recipe.glutenFree = userRecipe.glutenFree==1 ? true : false;
    recipe.vegetarian = userRecipe.vegetarian==1 ? true : false;
    recipe.vegan = userRecipe.vegan==1 ? true : false;
    let servings = userRecipe.servings==1 ? true : false;
    let instructions = userRecipe.instructions;
    let ingredients =JSON.parse(userRecipe.ingredients); 
    let FullRecipe = {
        servings: servings,
        instructions: instructions,
        ingredients: ingredients
    }
    recipe.FullRecipe = FullRecipe;
    return recipe;
}

exports.getLastWatchedRecipes = getLastWatchedRecipes;
exports.markAsLastWatched = markAsLastWatched;
exports.markAsFavorite = markAsFavorite;
exports.getFavoriteRecipes = getFavoriteRecipes;
exports.addUserRecipe = addUserRecipe;
exports.getUserRecipes = getUserRecipes;
exports.removeFavorite = removeFavorite;
