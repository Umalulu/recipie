$(document).ready(function () {
  $("#search").click(function () {
    var query = $("#query").val();

    $.ajax({
      method: "GET",
      url: "https://www.themealdb.com/api/json/v1/1/search.php?s=" + query,
      success: function (result) {
        $("#results").empty();

        for (var i = 0; i < result.meals.length; i++) {
          var meal = result.meals[i];
          var html =
            '<div class="recipe-container shadow-2xl rounded-lg overflow-hidden mb-4 flex flex-col p-2 bg-gray-100 bg-opacity-10"> ';

          // Recipe title
          html +=
            '<h2 class="recipe-title text-2xl font-bold mb-4 px-6 pt-4 text-white underline decoration-blue-400"> ' +
            meal.strMeal +
            "</h2>";

          // Recipe card for image and details
          html +=
            '<div class="recipe-card-container flex flex-grow px-6 pb-6">';

          html += '<div class="flex">'; // Nested flexbox for image and details

          // Recipe image
          html +=
            '<img src="' +
            meal.strMealThumb +
            '" alt="Recipe Image" class="recipe-image mr-4 w-64 h-64 rounded-lg">';

          // Recipe details
          html += '<div class="flex-grow px-2">';

          // Display full instructions
          html +=
            '<p class="instructions mb-4 w-full text-white"><strong class="text-teal-500">Instructions:</strong> ' +
            meal.strInstructions +
            "</p>";

          // Area information
          html +=
            '<p class="text-gray-200"><strong class="text-gray-400">Origin:</strong> ' +
            meal.strArea +
            "</p>";

          html += "</div>"; // Close recipe details

          html += "</div>";

          //Vertical divider
          html +=
            '<div class="divider border-gray-300 border-l-2 ml-4 "></div>';

          html +=
            '<div class="ingredient-container w-48 px-6 flex justify-end">'; // width and padding

          html += '<div class="mb-4 w-32">';
          html += '<p class="font-bold text-cyan-300 mb-3">Ingredients:</p>';
          html += '<ul class="ingredient-list list-disc list-outside ">';

          // Add ingredients to the list
          for (var j = 1; j <= 20; j++) {
            var ingredient = meal["strIngredient" + j];
            if (ingredient) {
              html +=
                '<li class="ingredient-list-item flex flex-none text-indigo-200"> ' +
                ingredient +
                "</li>";
            } else {
              break;
            }
          }

          html += "</ul>";
          html += "</div>";
          html += "</div>"; // Close ingredient container

          html += "</div>"; // Close recipe card container

          $("#results").append(html);
        }
      },
      error: function (jqXHR, textStatus, errorThrown) {
        console.error("Error: ", textStatus, errorThrown);
        $("#results").append(
          '<p class="error-message text-red-500">An error occurred while fetching recipes. Please try again later.</p>'
        );
      },
    });
  });
});
