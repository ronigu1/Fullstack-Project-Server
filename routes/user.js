var express = require("express");
var router = express.Router();
const DButils = require("./utils/DButils");
const user_utils = require("./utils/user_utils");
const recipe_utils = require("./utils/recipes_utils");
console.log("Im in users");
/**
 * Authenticate all incoming requests by middleware
 */
router.use(async function (req, res, next) {
  console.log("Im in router users");
  if (req.session && req.session.user_id) {
    DButils.execQuery("SELECT user_id FROM users").then((users) => {
      if (users.find((x) => x.user_id === req.session.user_id)) {
        req.user_id = req.session.user_id;
        next();
      }
    }).catch(err => next(err));
  } else {
    res.sendStatus(401);
  }
});


/**
 * This path gets body with recipeId and save this recipe in the favorites list of the logged-in user
 */
router.post('/favorites', async (req, res, next) => {
  try {
    console.log("post favorites");
    const user_id = req.session.user_id;
    const recipe_id = req.body.recipeId;

    console.log("user_id " + user_id);
    console.log("recipe_id " + recipe_id);

    await user_utils.markAsFavorite(user_id, recipe_id);
    res.status(200).send("The Recipe successfully saved as favorite");
  } catch (error) {
    next(error);
  }
})

/**
 * This path returns the favorites recipes that were saved by the logged-in user
 */
router.get('/favorites', async (req, res, next) => {
  try {
    console.log("get favorites");
    
    const user_id = req.session.user_id;
    const recipes_id = await user_utils.getFavoriteRecipes(user_id);
    
    console.log("user_id " + user_id);
    
    let recipes_id_array = [];
    recipes_id.map((element) => recipes_id_array.push(element.recipe_id)); //extracting the recipe ids into array
    const results = await recipe_utils.getRecipesPreview(user_id, recipes_id_array);
    res.status(200).send(results);
  } catch (error) {
    next(error);
  }
});


/**
 * This path delete favorites recipes that were saved by the logged-in user
 */
router.delete('/favorites/:recipeId', async (req, res, next) => {
  try {
    console.log("delete favorites");
    const user_id = req.session.user_id;
    const recipe_id = req.params.recipeId;

    console.log("user_id " + user_id);
    console.log("recipe_id " + recipe_id);
    await user_utils.removeFavorite(user_id, recipe_id);
    res.status(200).send("The Recipe successfully removed from favorites");
  } catch (error) {
    next(error);
  }
});

/**
 * This path gets body with recipeId and save this recipe in the last watched list of the logged-in user
 */
router.post('/watchedRecipes', async (req, res, next) => {
  try {
    const user_id = req.session.user_id;
    const recipe_id_1 = req.body.recipeId1;
    const recipe_id_2 = req.body.recipeId2;
    const recipe_id_3 = req.body.recipeId3;
    await user_utils.markAsLastWatched(user_id, recipe_id_1, recipe_id_2, recipe_id_3);
    res.status(200).send("The Recipes successfully saved as last watched");
  } catch (error) {
    next(error);
  }
})

/**
 * This path returns the last watched recipes that were saved by the logged-in user
 */
router.get('/watchedRecipes', async (req, res, next) => {
  try {
    const user_id = req.session.user_id;
    const lastWatched = await user_utils.getLastWatchedRecipes(user_id);
    let recipes_id_array = [];
    if (lastWatched.recipe_id_1 != null)
      recipes_id_array.push(lastWatched.recipe_id_1);
    if (lastWatched.recipe_id_2 != null)
      recipes_id_array.push(lastWatched.recipe_id_2);
    if (lastWatched.recipe_id_3 != null)
      recipes_id_array.push(lastWatched.recipe_id_3);
    const results = await recipe_utils.getRecipesPreview(user_id, recipes_id_array);
    res.status(200).send(results);
  } catch (error) {
    next(error);
  }
});
module.exports = router;


/**
 * This path saves this user recipe in the user recipe list of the logged-in user
 */
router.post('/myrecipes', async (req, res, next) => {
  try {
    const user_id = req.session.user_id;
    const recipeDetails = req.body;
    await user_utils.addUserRecipe(recipeDetails, user_id);
    res.status(200).send("The Recipe successfully to user's recipes");
  } catch (error) {
    next(error);
  }
})

router.get('/myrecipes', async (req, res, next) => {
  try {
    const user_id = req.session.user_id;
    recipes = await user_utils.getUserRecipes(user_id);
    if (recipes.length == 0){
      res.sendStatus(404)
    }
    else{
      res.status(200).send(recipes);
    }
  } catch (error) {
    next(error);
  }
})