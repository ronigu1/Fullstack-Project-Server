var express = require("express");
var router = express.Router();
const recipes_utils = require("./utils/recipes_utils");
const search_util = require("./utils/search_util");
const alphabet = "abcdefghijklmnopqrstuvwxyz";

console.log("in /recipes")
router.get("/", (req, res) => res.send("im here"));


/**
 * This path returns preview detailes abput 3 recipes
 */
router.get("/random", async (req, res, next) => {
  let randomChar = alphabet[Math.floor(Math.random() * alphabet.length)]
  let search_params = {};
  search_params.query = randomChar;  //search_params = {query: a/b/c..../z, ..}
  search_params.number = 20;
  search_params.instructionsRequired = true;
  search_params.addRecipeInformation = true;
  search_params.fillIngredients = true;
  search_params.apiKey = process.env.spooncular_apiKey;
  try {
    const random_3_recipe = await search_util.getRandomThreeRecipes(req.session.user_id, search_params);
    res.send(random_3_recipe);

  } catch (error) {
    next(error);
  }
});

/**
 * This path returns a full details of a recipe by its id
 */
 router.get("/recipesBulk", async (req, res, next) => {
  console.log("in recipesBulk");
  try {
    const user_id = req.session.user_id;
    const recipes = await recipes_utils.getRecipeInformationBulk(user_id, req.query.recipesIds);
    res.send(recipes);
  } catch (error) {
    next(error);
  }
});

/**
 * This path returns a full details of a recipe by its id
 */
router.get("/:recipeId", async (req, res, next) => {
  try {
    const recipe = await recipes_utils.getFullRecipe(req.params.recipeId);
    res.send(recipe);
  } catch (error) {
    next(error);
  }
});



/**
 * Serach for recipes by a search query.
 * Will return resuslts from spoonacular API, according to number param, which can be filtered by Cusine, diet, intolerance.
 * Result will be preview recipes.
 */
//"/search/query/:searchQuery = query(RecipeName or FoodName) /amount/:num ? Cusine='' & diet=''.'' & intolerance='' "
router.get("/search/query/:searchQuery/amount/:num", async (req, res, next) => {
  const { searchQuery, num } = req.params;
  // set search params
  let search_params = {};
  search_params.query = searchQuery;  //search_params = {query: pasta, ..}
  search_params.number = num;
  search_params.instructionsRequired = true;
  search_params.addRecipeInformation = true;
  search_params.fillIngredients = true;
  search_params.apiKey = process.env.spooncular_apiKey;

  //gives a defult num
  if (num != 5 && num != 10 && num != 15) {
    search_params.number = 5;
  }
  //check if query params exists (cuisine / diet / intolerances) and add them to search_params

  try {
    const user_id = req.session.user_id;
    search_util.extractQueryParams(req.query, search_params)
    const recipes = await search_util.searchForRecipes(user_id, search_params)
    res.send(recipes)
  } catch (error) {
    next(error);
  }
});


module.exports = router;

