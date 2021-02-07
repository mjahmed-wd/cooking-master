//getting the value of the search field 
let searchInput = document.getElementById('input')

//calling the food container data 
function getFoodContainer() {
    document.getElementById('allFoodContainer').innerHTML = ""
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchInput.value}`)
        .then(response => response.json())
        .then(data => {
            food(data)
        })
        .catch(error => {
            document.getElementById('notification').style.display = "block"
        })
}

//printing the data from search results
const food = data => {
    const foodCategories = data.meals;
    document.getElementById('notification').style.display = "none";
    foodCategories.forEach((item, index, arr) => {
        const rank = arr[index];

        const box = `<div onclick="foodIngredients('${rank.idMeal}')" class="col" data-bs-toggle="modal" data-bs-target="#myModal">
                        <div class="card h-100">
                            <img src="${rank.strMealThumb}" class="card-img-top" alt="...">
                            <div class="card-body">
                                <h5 class="card-title">${rank.strMeal}</h5>
                            </div>
                        </div>
                    </div>`

        const allFoodContainer = document.getElementById('allFoodContainer')
        allFoodContainer.innerHTML += box
    })
}

//getting the data of clicked food item and printing it
const foodIngredients = foodName => {

    fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${foodName}`)
        .then(response => response.json())
        .then(data => {
            const meals = data.meals
            meals.forEach((item, index, arr) => {
                const listing = arr[index];

                const ingredientItems =
                    `<h5 id="foodName" class="card-title">${listing.strMeal}</h5>
                <h6>Ingredients</h6>
                <p>${listing.strMeasure1} ${listing.strIngredient1}</p>
                <p>${listing.strMeasure2} ${listing.strIngredient2}</p>
                <p>${listing.strMeasure3} ${listing.strIngredient3}</p>
                <p>${listing.strMeasure4} ${listing.strIngredient4}</p> `

                document.getElementById("ingredientList").innerHTML = ingredientItems
                document.getElementById("modalImage").src = listing.strMealThumb
            })
        })
}

//search button clicking with enter key
searchInput.addEventListener("keydown", function(event) {
    if (event.keyCode === 13) {
        event.preventDefault();
        document.getElementById("searchBtn").click();
    }
});