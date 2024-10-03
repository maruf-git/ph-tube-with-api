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
    videos.forEach((video) => {
        displayVideos(video);
    })
}

// displaying videos
// {
//     "category_id": "1001",
//     "video_id": "aaaa",
//     "thumbnail": "https://i.ibb.co/L1b6xSq/shape.jpg",
//     "title": "Shape of You",
//     "authors": [
//         {
//             "profile_picture": "https://i.ibb.co/D9wWRM6/olivia.jpg",
//             "profile_name": "Olivia Mitchell",
//             "verified": ""
//         }
//     ],
//     "others": {
//         "views": "100K",
//         "posted_date": "16278"
//     },
//     "description": "Dive into the rhythm of 'Shape of You,' a captivating track that blends pop sensibilities with vibrant beats. Created by Olivia Mitchell, this song has already gained 100K views since its release. With its infectious melody and heartfelt lyrics, 'Shape of You' is perfect for fans looking for an uplifting musical experience. Let the music take over as Olivia's vocal prowess and unique style create a memorable listening journey."
// }

function displayVideos(video) {
    console.log(video, typeof video)
    const videoContianer = document.getElementById("video-container");
    const videoCard = document.createElement("div");
    videoCard.classList = "video-car flex flex-col gap-5";
    console.log('profile: ', video.authors[0].profile_picture)
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
    const categoriesContainer = document.getElementById('categories-container');
    // creating category button
    const categoryBtn = document.createElement('button');
    categoryBtn.innerText = category.category;
    categoryBtn.classList = "btn font-bold"
    categoriesContainer.appendChild(categoryBtn);
}
