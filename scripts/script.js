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
    const videoContainer = document.getElementById("video-container");
    const noVideo = document.getElementById("no-video");
    // making videoContainer clear
    videoContainer.innerText = "";

    if (videos.length) {
        noVideo.classList.add("hidden");
        videos.forEach((video) => {
            displayVideos(video);
        })
    }
    else {
        noVideo.classList.remove("hidden");
    }

}

// load categoryVideos
function loadCategoryVideos(id) {
    fetch(`https://openapi.programming-hero.com/api/phero-tube/category/${id}`)
        .then(response => response.json())
        .then(data => loadVideos(data.category));
}

// load details
async function loadDetails(videoId) {
    const uri = `https://openapi.programming-hero.com/api/phero-tube/video/${videoId}`;
    const response = await fetch(uri);
    const detailsObject = await response.json();
    displayDetails(detailsObject.video)
}

// display details
function displayDetails(videoDetails) {
    console.log(videoDetails);
    let modalContent = document.getElementById("modal-content");
    modalContent.innerHTML = `
      <img src=${videoDetails.thumbnail} alt="" id="modal-img">
      <h1 class="font-bold mt-2">Details:</h1>
      <p id="modal-details" class="">${videoDetails.description}</p>
      <p id="views" class="font-semibold mt-2">${videoDetails.others.views} Views</p>
    `;

    document.getElementById("detailsModal").showModal();
}



// checking verified profile
function isVarified(str) {
    // console.log("hello")
    if (str) {
        const verifiedIcon = `<img width="24" height="24" src="https://img.icons8.com/color/48/verified-badge.png" alt="verified-badge"/>`;
        return verifiedIcon;
    } else return "";
}

// displaying videos
function displayVideos(video) {
    // console.log("Checking video", video, typeof video)
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
        
        <div class="video-content flex items-center gap-3">
            <div class="author-img w-[50px] h-[50px] ">
                <img src="${video.authors[0].profile_picture}" alt=" "class="w-full h-full rounded-full object-cover">
            </div>
            <div class="video-des flex flex-col space-y-1">
                <h1 class="video-title font-bold">${video.title}</h1>
                <div class="flex gap-1">
                <h5 class="author-name ">${video.authors[0].profile_name}</h5>
                ${isVarified(video.authors[0].verified)}
                </div>
    
                 <div>
                     <button onclick="loadDetails('${video.video_id}')" class="btn  bg-red-500 text-white">Details</button>
                </div>
            </div>
           
     
        </div>
    `
    //<p class="views">${video.others.views} views</p>
    // adding each video card to the video-container
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

    // adding event on category buttons
    categoryBtn.addEventListener('click', (event) => {
        // loading and displaying category videos
        loadCategoryVideos(category.category_id);
        const btns = document.getElementsByClassName('category-btns');
        // remove active class
        for (const btn of btns) {
            btn.classList.remove('active');
        }
        event.target.classList.add("active");

    })
}
