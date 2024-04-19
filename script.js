$(document).ready(function() {
  $('#search').click(function() {
    var query = $('#query').val();

    $.ajax({
      method: 'GET',
      url: 'https://www.themealdb.com/api/json/v1/1/search.php?s=' + query,
      success: function(result) {
        $('#results').empty();

        for (var i = 0; i < result.meals.length; i++) {
          var meal = result.meals[i];
          var html = '<div class="recipe-container shadow-lg rounded-lg overflow-hidden mb-4 flex flex-col p-2 bg-gray-100 bg-opacity-10"> '; // Use flex-col for vertical layout

          // Recipe title at the top
          html += '<h2 class="recipe-title text-2xl font-bold mb-4 px-6 pt-4 text-white"> ' + meal.strMeal + '</h2>';

          // Recipe card container with flexbox for image and details
          html += '<div class="recipe-card-container flex flex-grow px-6 pb-6">'; // Set width and flex-grow

          html += '<div class="flex">'; // Nested flexbox for image and details

            // Recipe image
            html += '<img src="' + meal.strMealThumb + '" alt="Recipe Image" class="recipe-image mr-4 w-64 h-64 rounded-lg">';

            // Recipe details
            html += '<div class="flex-grow px-2">';

              // Display full instructions
              html += '<p class="instructions mb-4 w-full text-white"><strong class="text-teal-500">Instructions:</strong> ' + meal.strInstructions + '</p>';

              

              // Area information
              html += '<p class="text-gray-200"><strong class="text-gray-300">Area:</strong> ' + meal.strArea + '</p>';

            html += '</div>'; // Close recipe details

          html += '</div>'; // Close nested flexbox

          // **Vertical divider with background color**
          html += '<div class="divider border-gray-300 border-l-2 ml-4 "></div>'; // Add background-color

          // Ingredient list container with increased width
          html += '<div class="ingredient-container w-48 px-6 flex justify-end">'; // Assign width and padding

          html += '<div class="mb-4 w-32">';
          html += '<p class="font-bold text-cyan-300">Ingredients:</p></br>';
          html += '<ul class="ingredient-list list-disc list-outside ">';

          // Add ingredients to the list (each on a single line)
          for (var j = 1; j <= 20; j++) {
            var ingredient = meal['strIngredient' + j];
            if (ingredient) {
              html += '<li class="ingredient-list-item flex flex-none text-neutral-400"> ' + ingredient + '</li>'; // Add flex-1 class
            } else {
              break;
            }
          }

          html += '</ul>';
          html += '</div>';
          html += '</div>'; // Close ingredient container

          html += '</div>'; // Close recipe card container

          $('#results').append(html);
        }
      },
      error: function(jqXHR, textStatus, errorThrown) {
        console.error('Error: ', textStatus, errorThrown);
        $('#results').append('<p class="error-message text-red-500">An error occurred while fetching recipes. Please try again later.</p>');
      }
    });
  });
});







  
  
  
  
  
  
  
  
  