//getting the value of the search field 
let searchInput = document.getElementById('input')
let notify = document.getElementById('notification')

//calling the food container data 
function getFoodContainer() {
    document.getElementById('allFoodContainer').innerHTML = ""
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchInput.value}`)
        .then(response => response.json())
        .then(data => {
            food(data)
        })
        .catch(error => {
            notify.innerText = ` Sorry, we don't have "${searchInput.value}" at this moment. We will add that in near future. `
            notify.style.color = "tomato"
        })
}

//printing the data from search results
const food = data => {
    const foodCategories = data.meals;
    notify.style.display = "block";
    notify.style.color = "gray"
    notify.innerText = `Showing results for "${searchInput.value}"`
    foodCategories.forEach((item, index, arr) => {
        const rank = arr[index];

        const box = `<div class="col">
                        <div onclick="foodIngredients('${rank.idMeal}')" class="card h-100 foodModal" data-bs-toggle="modal" data-bs-target="#myModal">
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
                <hr>
                <div class="listing">
                <p>${listing.strMeasure1} ${listing.strIngredient1}</p>
                <p>${listing.strMeasure2} ${listing.strIngredient2}</p>
                <p>${listing.strMeasure3} ${listing.strIngredient3}</p>
                <p>${listing.strMeasure4} ${listing.strIngredient4}</p>
                <p>${listing.strMeasure5} ${listing.strIngredient5}</p>
                <p>${listing.strMeasure6} ${listing.strIngredient6}</p>
                <p>${listing.strMeasure7} ${listing.strIngredient7}</p>
                <p>${listing.strMeasure8} ${listing.strIngredient8}</p>
                <p>${listing.strMeasure9} ${listing.strIngredient9}</p>
                <p>${listing.strMeasure10} ${listing.strIngredient10}</p>
                <p>${listing.strMeasure11} ${listing.strIngredient11}</p>
                <p>${listing.strMeasure12} ${listing.strIngredient12}</p>
                <p>${listing.strMeasure13} ${listing.strIngredient13}</p>
                <p>${listing.strMeasure14} ${listing.strIngredient14}</p>
                <p>${listing.strMeasure15} ${listing.strIngredient15}</p>
                <p>${listing.strMeasure16} ${listing.strIngredient16}</p>
                <p>${listing.strMeasure17} ${listing.strIngredient17}</p>
                <p>${listing.strMeasure18} ${listing.strIngredient18}</p>
                <p>${listing.strMeasure19} ${listing.strIngredient19}</p>
                <p>${listing.strMeasure20} ${listing.strIngredient20}</p></div>`

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