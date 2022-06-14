const axios = require("axios");
const { Rabbit } = require("crypto-js");
const api_domain = "https://api.spoonacular.com/recipes";

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
/**
 * Get IngredientsImg
 * @param {*} recipes_info 
 */
async function getIngredientsImg(recipe_id) {
    return await axios.get(`${api_domain}/${recipe_id}/ingredientWidget.png`, {
        params: {
            measure: metric,
            apiKey: process.env.spooncular_apiKey
        }
    });
}

/**
 * Get Recipe Full Details acording to recipe_id
 */
async function getRecipeDetails(recipe_id) {
    let recipe_info = await getRecipeInformation(recipe_id);
    let { id, title, readyInMinutes, image, aggregateLikes, vegan, vegetarian, glutenFree, servings, instructions } = recipe_info.data;
    // we may need to add .data to extarct the image
    let ingredientsImg = await getIngredientsImg(recipe_id);
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
        ingredientsImg: ingredientsImg
    }
}

/**
 * Get Recipe Preview Details acording to recipe_id
 */
function extarctRecipesPreviewDetails(recipes_info){
    return recipes_info.map((recipe_info) => {
        let data = recipe_info;
        if(recipe_info.data) {
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
        return{
            id: id,
            title: title,
            readyInMinutes: readyInMinutes,
            image: image,
            // popularity: popularity,
            popularity: aggregateLikes,
            vegan: vegan,
            vegetarian: vegetarian,
            glutenFree: glutenFree,
        }
    })    
}

async function getRandomRecipes() {
    const response = await axios.get(`${api_domain}/random`, {
        params: {
            number : 5,
            apiKey: process.env.spooncular_apiKey
        }
    });
    return response;
}

async function getRandomThreeRecipes(){
    let random_pool = await getRandomRecipes();
    let filterd_random_pool = random_pool.data.recipes.filter((random) => (random.instructions != "") && (random.image && random.title
         && random.readyInMinutes && random.servings && random.extendedIngredients && random.servings && random.aggregateLikes
         && random.vegan && random.vegetarian && random.glutenFree));
    if(filterd_random_pool.length < 3){
        return getRandomThreeRecipes();
    }
    return extarctRecipesPreviewDetails([filterd_random_pool[0],filterd_random_pool[1],filterd_random_pool[2]]);
}

//for favorites
async function getRecipesPreview(recipes_id_array) {
    //Is the user watch this recipe , Is the user save this recipe as favorite, indection that the user can press the image
        let recipesPreviewInfo = [] ;
        recipes_id_array.map((id) => {
            recipesPreviewInfo.push(getRecipeInformation(id));
        });
        let info_res = await Promise.all(recipesPreviewInfo);
        return extarctRecipesPreviewDetails(info_res)
    
    }

exports.getRecipeDetails = getRecipeDetails;
exports.getRecipesPreview = getRecipesPreview;
exports.getRandomThreeRecipes = getRandomThreeRecipes;
exports.extarctRecipesPreviewDetails = extarctRecipesPreviewDetails;





