console.log("script connected");

// fetching categories data
fetch('https://openapi.programming-hero.com/api/phero-tube/categories')
    .then(response => response.json())
    .then(data => loadCategories(data.categories));

// fetching videos data
fetch('https://openapi.programming-hero.com/api/phero-tube/videos')
    .then(response => response.json())
    .then(data => loadVideos(data.videos));

// loading categories data
function loadCategories(categories) {
    categories.forEach((category) => {
        // console.log(category);
        displayCategories(category);
    })
}

// loading videos data
function loadVideos(videos) {
    console.log("load videos:", videos, typeof videos);
    const videoContianer = document.getElementById("video-container");
    console.log("Video contaner: ",videoContianer);
    videoContianer.innerText="";
    videos.forEach((video) => {
        displayVideos(video);
    })
}

// load categoryVideos

function loadCategoryVideos(id) {

    fetch(`https://openapi.programming-hero.com/api/phero-tube/category/${id}`)
        .then(response => response.json())
        .then(data => loadVideos(data.category));
}

function displayVideos(video) {

    const videoContianer = document.getElementById("video-container");
    // creating video card
    const videoCard = document.createElement("div");
    videoCard.classList = "video-card flex flex-col gap-5";

    videoCard.innerHTML = `
        <div class="video-banner w-[300px] h-[200px] relative">
            <img src="${video.thumbnail}" alt="" class="w-full h-full object-cover">
            <h5 class="text-white bg-slate-400 rounded px-1 absolute bottom-4 right-2">
                5Days 8hours 20 minutes ago
            </h5>
        </div>
        
        <div class="video-content flex gap-3">
            <div class="author-img w-[50px] h-[50px] ">
                <img src="${video.authors[0].profile_picture}" alt=" "class="w-full h-full rounded-full object-cover">
            </div>
            <div class="video-des flex flex-col space-y-1">
                <h1 class="video-title font-bold">${video.title}</h1>
                <h5 class="author-name ">${video.authors[0].profile_name}</h5>
                <p class="views">${video.others.views} views</p>
            </div>
        </div>
    `
    videoContianer.appendChild(videoCard);
}



// displaying categories
function displayCategories(category) {
    // console.log("HEllo");
    console.log("category: ", category)
    const categoriesContainer = document.getElementById('categories-container');
    // creating category button
    const categoryBtn = document.createElement('button');
    categoryBtn.innerText = category.category;
    categoryBtn.classList = `btn category-btns category-btn${category.category_id} font-bold`;
    categoriesContainer.appendChild(categoryBtn);
    categoryBtn.addEventListener('click', (event) => {
        loadCategoryVideos(category.category_id);
        const btns = document.getElementsByClassName('category-btns');
        
        // remove activeBtn
        console.log("category btns:",btns);
        for(const btn of btns)
        {
            btn.classList.remove('active');
        }
        event.target.classList.add("active");
        // console.log("target:",event.target);
        // document.getElementById(`category-btn${category.category_id}`).classList.add('active');
    })
}


// category-btn events

// const categoryBtns = document.getElementsByClassName('category-btns');
// console.log(categoryBtns)
// for (const categoryBtn of categoryBtns) {
//     console.log(categoryBtn);
// }