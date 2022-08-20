const axios = require("axios");
const { Rabbit } = require("crypto-js");
const api_domain = "https://api.spoonacular.com/recipes";
const user_utils = require("./user_utils");
/**
 * Get recipes list from spooncular response and extract the relevant recipe data for preview
 * @param {*} recipes_info 
 */
async function getRecipeInformation(recipe_id) {
    return await axios.get(`${api_domain}/${recipe_id}/information`, {
        params: {
            includeNutrition: false,
            apiKey: process.env.spooncular_apiKey
        }
    });
}
// /**
//  * Get IngredientsImg
//  * @param {*} recipes_info 
//  */
// async function getIngredientsImg(recipe_id) {
//     return await axios.get(`${api_domain}/${recipe_id}/ingredientWidget.png`, {
//         params: {
//             measure: metric,
//             apiKey: process.env.spooncular_apiKey
//         }
//     });
// }

/**
 * Get Recipe Full Details acording to recipe_id
 */
async function getFullRecipe(recipe_id) {
    let recipe_info = await getRecipeInformation(recipe_id);
    let ingredients = [];
    let { id, title, readyInMinutes, image, aggregateLikes, vegan, vegetarian, glutenFree, servings, instructions } = recipe_info.data;
    recipe_info.data.extendedIngredients.map((ingredient) =>{
        let recipeIngridient = {'name':ingredient.name, 'amount': ingredient.amount, 'unit': ingredient.unit}
        ingredients.push(recipeIngridient)
    })
    // we may need to add .data to extarct the image
    // let ingredientsImg = await getIngredientsImg(recipe_id);
    return {
        id: id,
        title: title,
        readyInMinutes: readyInMinutes,
        image: image,
        popularity: aggregateLikes,
        vegan: vegan,
        vegetarian: vegetarian,
        glutenFree: glutenFree,
        servings: servings,
        instructions: instructions,
        // ingredientsImg: ingredientsImg,
        ingredients: ingredients
    }
}

/**
 * Get Recipe Preview Details acording to recipe_id
 */
async function extarctRecipesPreviewDetails(user_id, recipes_info) {
    var lastWatchedReceipes;
    var recipes_id;
    let favoriteRecipes = [];
    if(typeof user_id !== "undefined" ){
        lastWatchedReceipes = await user_utils.getLastWatchedRecipes(user_id);
        recipes_id = await user_utils.getFavoriteRecipes(user_id);
        recipes_id.map((element) => favoriteRecipes.push(element.recipe_id));
    }
    return recipes_info.map((recipe_info) => {
        let data = recipe_info;
        if (recipe_info.data) {
            data = recipe_info.data;
        }
        const {
            id,
            title,
            readyInMinutes,
            image,
            aggregateLikes,
            vegan,
            vegetarian,
            glutenFree,
        } = data;
        let recipeid = id.toString();
        let lastWatched = false;
        let favoriteRecipe = false;
        if(typeof user_id !== "undefined"){
            if (typeof lastWatchedReceipes !== "undefined" && (lastWatchedReceipes.recipe_id_1 === recipeid || lastWatchedReceipes.recipe_id_2 === recipeid || lastWatchedReceipes.recipe_id_3 === recipeid)) {
                lastWatched = true;
            }
            if (typeof favoriteRecipes !== "undefined" && favoriteRecipes.includes(recipeid)) {
                favoriteRecipe = true;
            }
        }
        return {
            id: id,
            title: title,
            readyInMinutes: readyInMinutes,
            image: image,
            popularity: aggregateLikes,
            vegan: vegan,
            vegetarian: vegetarian,
            glutenFree: glutenFree,
            lastWatched: lastWatched,
            favoriteRecipe: favoriteRecipe
        }
    })
}

async function getRandomRecipes() {
    // rand leeter
    const response = await axios.get(`${api_domain}/random`, {
        params: {
            number: 3,
            apiKey: process.env.spooncular_apiKey
        }
    });
    return response;
}


async function getRandomThreeRecipes(user_id) {
    // let random_pool = await getRandomRecipes();
    // let filterd_random_pool = random_pool.data.recipes.filter((random) => (random.instructions != "") && (random.image && random.title
    //     && random.readyInMinutes && random.servings && random.extendedIngredients && random.servings && random.aggregateLikes
    //     && random.vegan && random.vegetarian && random.glutenFree));
    // if (filterd_random_pool.length < 3) {
    //     return getRandomThreeRecipes(user_id);
    // }
    // return extarctRecipesPreviewDetails(user_id, [filterd_random_pool[0], filterd_random_pool[1], filterd_random_pool[2]]);
    // let random_3_recipe = [];
    // while (random_3_recipe.length<3){
    //     let rand_recepie = getRandomRecipe()
    //     if (rand_recepie.instructions !=="" && rand_recepie.image && rand_recepie.title
    //     && rand_recepie.readyInMinutes && rand_recepie.servings && rand_recepie.extendedIngredients && rand_recepie.servings && rand_recepie.aggregateLikes
    //     && rand_recepie.vegan && rand_recepie.vegetarian && rand_recepie.glutenFree){
    //         random_3_recipe.push(rand_recepie)
    //     }
    // } 
    let data = await getRandomRecipes();

    let random_3_recipes = data.data.recipes;
    return extarctRecipesPreviewDetails(user_id, [random_3_recipes[0], random_3_recipes[1], random_3_recipes[2]]);
}

//for favorites
async function getRecipesPreview(user_id, recipes_id_array) {
    //Is the user watch this recipe , Is the user save this recipe as favorite, indection that the user can press the image
    let recipesPreviewInfo = [];
    recipes_id_array.map((id) => {
        recipesPreviewInfo.push(getRecipeInformation(id));
    });
    let info_res = await Promise.all(recipesPreviewInfo);
    return extarctRecipesPreviewDetails(user_id, info_res)

}

exports.getFullRecipe = getFullRecipe;
exports.getRecipesPreview = getRecipesPreview;
exports.getRandomThreeRecipes = getRandomThreeRecipes;
exports.extarctRecipesPreviewDetails = extarctRecipesPreviewDetails;





