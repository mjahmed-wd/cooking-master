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
                <ul class="listing">
                <li>${listing.strMeasure1} ${listing.strIngredient1}</li>
                <li>${listing.strMeasure2} ${listing.strIngredient2}</li>
                <li>${listing.strMeasure3} ${listing.strIngredient3}</li>
                <li>${listing.strMeasure4} ${listing.strIngredient4}</li>
                <li>${listing.strMeasure5} ${listing.strIngredient5}</li>
                <li>${listing.strMeasure6} ${listing.strIngredient6}</li>
                <li>${listing.strMeasure7} ${listing.strIngredient7}</li>
                <li>${listing.strMeasure8} ${listing.strIngredient8}</li>
                <li>${listing.strMeasure9} ${listing.strIngredient9}</li>
                <li>${listing.strMeasure10} ${listing.strIngredient10}</li>
                <li>${listing.strMeasure11} ${listing.strIngredient11}</li>
                <li>${listing.strMeasure12} ${listing.strIngredient12}</li>
                <li>${listing.strMeasure13} ${listing.strIngredient13}</li>
                <li>${listing.strMeasure14} ${listing.strIngredient14}</li>
                <li>${listing.strMeasure15} ${listing.strIngredient15}</li>
                <li>${listing.strMeasure16} ${listing.strIngredient16}</li>
                <li>${listing.strMeasure17} ${listing.strIngredient17}</li>
                <li>${listing.strMeasure18} ${listing.strIngredient18}</li>
                <li>${listing.strMeasure19} ${listing.strIngredient19}</li>
                <li>${listing.strMeasure20} ${listing.strIngredient20}</li></ul>`

                document.getElementById("ingredientList").innerHTML = ingredientItems
                document.getElementById("modalImage").src = listing.strMealThumb
                removeEmptyLi()
                    // console.log(fixP)
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



// const findAllLi = document.getElementsByTagName('li')
const removeEmptyLi = () => {
    const findAllLi = [...document.getElementsByTagName('li')]
    findAllLi.forEach((item, index, arr) => {
        const element = arr[index];
        if (element.innerText == "") {
            element.style.display = "none";
        }
    })
}