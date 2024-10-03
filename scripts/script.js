console.log("script connected");

// fetching categories data
fetch('https://openapi.programming-hero.com/api/phero-tube/categories')
    .then(response => response.json())
    .then(data => loadCategories(data.categories));

// loading categories data
function loadCategories(categories) {
    categories.forEach((category) => {
        // console.log(category);
        displayCategories(category);
    })
}

function displayCategories(category) {
    const categoriesContainer = document.getElementById('categories-container');
    console.log(category);
    const categoryBtn=document.createElement('button');
    categoryBtn.innerText=category.category;
    categoryBtn.classList="btn font-bold"
    categoriesContainer.appendChild(categoryBtn);
}
