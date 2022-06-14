const DButils = require("./DButils");

async function markAsFavorite(user_id, recipe_id) {
    await DButils.execQuery(`INSERT INTO FavoriteRecipes (user_id, recipe_id) VALUES ('${user_id}', '${recipe_id}')`)
}

async function getFavoriteRecipes(user_id) {
    const recipes_id = await DButils.execQuery(`select recipe_id from FavoriteRecipes where user_id='${user_id}'`)
    return recipes_id;
}

async function markAsLastWatched(user_id, recipe_id_1, recipe_id_2, recipe_id_3) {
    await DButils.execQuery(`INSERT INTO watchedrecipes (user_id, recipe_id_1, recipe_id_2, recipe_id_3) VALUES ('${user_id}', '${recipe_id_1}', '${recipe_id_2}', '${recipe_id_3}')`)
}

async function getLastWatchedRecipes(user_id) {
    const recipes_id = await DButils.execQuery(`select * from watchedrecipes where user_id='${user_id}'`)
    return recipes_id[0];
}

// async function addUserRecipe(recipeDetails, username) {
//     const {
//         title,
//         image,
//         readyInMinutes,
//         glutenFree,
//         isVegaterian,
//         ingredients,
//         instructions,
//         servings,
//         summary
//     } = recipeDetails

//     //Add new recipe to DB
//     pool = await poolPromise
//     result = await pool.request()
//         .input("user_id", sql.VarChar(10), user_id)
//         .input("title", sql.VarChar(4000), title)
//         .input("image", sql.VarChar(4000), image)
//         .input("readyInMinutes", sql.BigInt, readyInMinutes)
//         .input("aggregateLikes", sql.BigInt, 0)
//         .input("glutenFree", sql.Bit, glutenFree === 'true' ? 1 : 0)
//         .input("vegetarian", sql.Bit, isVegaterian === 'true' ? 1 : 0)
//         .input("ingredients", sql.NVarChar('max'), JSON.stringify(ingredients))
//         .input("instructions", sql.NVarChar('max'), JSON.stringify(instructions))
//         .input("servings", sql.NVarChar('max'), servings)
//         .input("summary", sql.NVarChar(4000), summary)
//         .execute("insertRecipe").then(function (recordSet) {
//             res.status(200).send({ message: 'Succsefully created a new recipe', sucess: 'true' })
//         })
// }

exports.getLastWatchedRecipes = getLastWatchedRecipes;
exports.markAsLastWatched = markAsLastWatched;
exports.markAsFavorite = markAsFavorite;
exports.getFavoriteRecipes = getFavoriteRecipes;
