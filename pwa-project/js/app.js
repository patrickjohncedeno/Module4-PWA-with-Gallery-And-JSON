function saveLastFunction(funcName) {
    localStorage.setItem('lastFunction', funcName);
    setActiveNav(funcName);
}

function loadLastFunction() {
    const lastFunction = localStorage.getItem('lastFunction');
    if (lastFunction) {
        setActiveNav(lastFunction);
        if (lastFunction === 'loadGallery') {
            loadGallery(1);
        } else {
            window[lastFunction]();
        }
    } else {
        setActiveNav('loadHome');
        loadHome();
    }
}

function setActiveNav(funcName) {
    document.querySelectorAll('.nav-item').forEach(item => item.classList.remove('active'));
    if (funcName === 'loadHome') {
        document.getElementById('nav-home').classList.add('active');
    } else if (funcName === 'loadGallery') {
        document.getElementById('nav-gallery').classList.add('active');
    } else if (funcName === 'loadAbout') {
        document.getElementById('nav-about').classList.add('active');
    }
}

// Function to generate acronym from a name
function getAcronym(name) {
    const words = name.split(' ');
    const acronym = words.map(word => word.charAt(0)).join('');
    return acronym.toUpperCase();
}

function loadHome() {
    var contentDiv = document.getElementById("content");

    contentDiv.classList.remove("body");
    // Get the <nav> element
    var navElement = document.querySelector('nav[aria-label="Page navigation"]');

    // Check if the <nav> element exists
    if(navElement) {
        // Hide the <nav> element
        navElement.style.display = 'none';
    }
    fetch('https://jsonplaceholder.typicode.com/users')
        .then(response => response.json())
        .then(users => {
            let content = `
                <h1 class="d-flex mt-5 justify-content-center">Users</h1>
                <div class="page-content page-container mt-5" id="page-content">
                    <div class="padding">
                        <div class="row">
                            <div class="col-12"> 
                                <div class="list list-row block">
                                    <div class="list-item" data-id="">
                                        <div class="col-1"><a href="#" data-abc="true"></a></div>
                                        <div class="flex col-3 item-except text-muted">
                                            <h5>Name and Email</h5>
                                        </div>
                                        <div class="col-3 item-except text-muted"><h5>Address</h5></div>
                                        <div class="col-3 item-except text-muted"><h5>Phone Number</h5></div>
                                        <div class="col-2 item-except text-muted"><h5>Website</h5></div>
                                    </div>`;
            
            users.forEach(user => {
                const acronym = getAcronym(user.name); // Generate acronym
                content += `<div class="list-item style" data-id="${user.id}">
                                <div class="col-1"><span class="w-48 avatar gd-warning">${acronym}</span></a></div>
                                <div class="flex col-3">
                                    <div class="item-except text-muted text-sm h-1x"><h6>${user.name}</h6></div>
                                    <div class="item-except text-muted text-sm h-1x">${user.email}</div>
                                </div>
                                <div class="col-3 item-except text-muted text-sm h-1">${user.address.street + ', ' + user.address.city}</div>
                                <div class="col-3 item-except text-muted text-sm h-1">${user.phone}</div>
                                <div class="col-2 item-except text-muted text-sm h-1">${user.website}</div>
                            </div>`;
            });

            content += `        </div>
                            </div>
                        </div>
                    </div>
                </div>`;
            
            document.getElementById('content').innerHTML = content;
        });
}

function loadGallery(albumId) {
    var contentDiv = document.getElementById("content");

    contentDiv.classList.remove("body");
    // Get the <nav> element
    var navElement = document.querySelector('nav[aria-label="Page navigation"]');

    // Check if the <nav> element exists
    if(navElement) {
        // Hide the <nav> element
        navElement.style.display = 'block';
    }
    const totalPages = 100;
    const initialPage = 1;
    createPagination(totalPages, initialPage);

    fetch('https://jsonplaceholder.typicode.com/photos?')
    .then(response => response.json())
    .then(photos => {
        let content = '<h1 class="d-flex mt-5 mb-5 justify-content-center">Gallery</h1><div class="row">';
        photos.forEach(photo => {
            if (photo.albumId === albumId) {
                content += `
                    <div class="col-md-2">
                        <div class="card mb-4">
                            <img src="${photo.thumbnailUrl}" class="card-img-top" alt="${photo.title}">
                            <div class="card-body">
                                <h6 class="card-title">${photo.title}</h6>
                            </div>
                        </div>
                    </div>
                `;
            }
        });
        content += '</div>';
        document.getElementById('content').innerHTML = content;
    });
}

function createPagination(totalPages, currentPage) {
    let pagination = document.getElementById('pagination');
    pagination.innerHTML = '';

    const maxVisiblePages = 7;
    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

    if (startPage > 1) {
        pagination.innerHTML += `
            <li class="page-item"><a class="page-link" href="#" data-page="1"><<</a></li>
            <li class="page-item"><a class="page-link" href="#" data-page="${currentPage - 1}"><</a></li>
        `;
    }

    for (let i = startPage; i <= endPage; i++) {
        pagination.innerHTML += `
            <li class="page-item ${i === currentPage ? 'active' : ''}">
                <a class="page-link" href="#" data-page="${i}">${i}</a>
            </li>
        `;
    }

    if (endPage < totalPages) {
        pagination.innerHTML += `
            <li class="page-item"><a class="page-link" href="#" data-page="${currentPage + 1}">></a></li>
            <li class="page-item"><a class="page-link" href="#" data-page="${totalPages}">>></a></li>
        `;
    }

    Array.from(pagination.querySelectorAll('.page-link')).forEach(link => {
        link.addEventListener('click', (event) => {
            event.preventDefault();
            const page = parseInt(event.target.getAttribute('data-page'));
            loadGallery(page);
            createPagination(totalPages, page);
        });
    });
}

function loadAbout() {
    var contentDiv = document.getElementById("content");

    contentDiv.classList.add("body");
    // Get the <nav> element
    var navElement = document.querySelector('nav[aria-label="Page navigation"]');

    // Check if the <nav> element exists
    if(navElement) {
        // Hide the <nav> element
        navElement.style.display = 'none';
    }
    const content = `
    <div class="body container pt-5 ">
    <div class="row d-flex flex-column-reverse flex-lg-row mt-lg-0 mt-sm-5">
        <div class="image col-xl-6 col-lg-5 col-12 d-flex" >
            <img src="prof.png" class="container-fluid me-lg-0 ms-auto" style="max-width: 450px;" alt="">
        </div>
        <div class="info col-xl-6 col-lg-7 col-12">
            <div class="intro pt-5">
                <div class="name pb-5" id="fname"> PATRICK JOHN</div>
                <div class="name pb-5"> MENDOZA CEDEÑO</div>
            </div>
            <div class="state">
                <div class="talk">
                Hi there! I'm Patrick John Mendoza Cedeño, a third-year BS Information Technology student. Passionate about technology and its endless possibilities, I'm on a journey to explore the fascinating world of information technology and its applications. From coding to problem-solving, I'm eager to learn and contribute to the ever-evolving tech landscape.
                </div>
            </div>
            <div class="acc d-flex mt-3">
                <div class="soc"> <a href="https://web.facebook.com/patrickjohn.cedeno.88" class="nav-link"> <i class='bx bxl-facebook-circle'></i></a></div>
                <div class="soc ms-4"> <a href="https://www.instagram.com/cmjppp/" class="nav-link">  <i class='bx bxl-instagram'></i></a></div>
            </div>
        </div>
    </div>
</div>
        
    `;
    document.getElementById('content').innerHTML = content;
}

// Load last function or default to Home
loadLastFunction(); 
