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

exports.getLastWatchedRecipes = getLastWatchedRecipes;
exports.markAsLastWatched = markAsLastWatched;
exports.markAsFavorite = markAsFavorite;
exports.getFavoriteRecipes = getFavoriteRecipes;
