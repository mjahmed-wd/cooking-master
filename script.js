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
                <ul class="listing">
                <li>${listing.strMeasure1} ${listing.strIngredient1}</li>
                <li>${listing.strMeasure2} ${listing.strIngredient2}</li>
                <li>${listing.strMeasure3} ${listing.strIngredient3}</li>
                <li>${listing.strMeasure4} ${listing.strIngredient4}</li> </ul>`

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