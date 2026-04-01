const myUrl = "shows.json"; //https://makerslab.em-lyon.com/dww/data/shows.json

const getData = async(doStuffs) => {
    try {
        const response = await fetch(myUrl);
        if(!response.ok){
            throw new Error("Network response not ok :" + response.statusText);
        }
        const data = await response.json();
        doStuffs(data);
    } catch(error) {
        console.error("Problem occurend while getting your data" + error);
    }
}

//J'ai repris toutes mes fonctions précédentes du HTML et je les ai mises dans le JS
getData((data) => {
    const grid = document.getElementById('main-grid');
    
    // création d'un objet global pour stocker les infos et les réutiliser dans les pop-ups
    window.allShowsData = {}; 

    // On fusionne les catégories du JSON (musicals, comedies, plays)
    const categories = Object.keys(data); // Récupère ["musicals", "comedies", "plays"]

    categories.forEach(cat => {
        data[cat].forEach((show, index) => {
            // On crée un identifiant unique
            const showId = `${cat}-${index}`;
            
            // On sauvegarde les infos dans notre "base de données" temporaire
            window.allShowsData[showId] = {
                title: show.title,
                cat: "Category: " + cat.charAt(0).toUpperCase() + cat.slice(1),
                desc: show.description,
                venue: show.location,
                dates: `From ${show.dates.from} to ${show.dates.to}`,
                price: `$${show.price} (${show.tickets_remaining} tickets remaining)`,
                img: show.image
            };

            // On génère le HTML de la carte, lié avec le fichier CSS
            const cardHTML = `
                <div class="show-card">
                    <img src="${show.image}" alt="${show.title}">
                    <div class="show-info">
                        <h3>${show.title}</h3>
                        <p>${show.dates.from} - ${show.dates.to}</p>
                        <button class="btn-more" onclick="openMoreInfo('${showId}')">More Info</button>
                        <button class="btn-buy" onclick="openBuyTickets('${showId}')">Buy Tickets</button>
                    </div>
                </div>
            `;
            grid.innerHTML += cardHTML;
        });
    });
});

// 3. mes fonctions 
function openMoreInfo(id) {
    const s = window.allShowsData[id];
    document.getElementById('info-title').innerText = s.title;
    document.getElementById('info-cat').innerText = s.cat;
    document.getElementById('info-desc').innerText = s.desc;
    document.getElementById('info-venue').innerText = s.venue;
    document.getElementById('info-dates').innerText = s.dates;
    document.getElementById('info-price').innerText = s.price;
    document.getElementById('info-img').src = s.img;
    document.getElementById('modal-info').style.display = 'flex';
    document.getElementById('btn-buy-from-info').onclick = () => openBuyTickets(id);
}

function openBuyTickets(id) {
    document.getElementById('buy-img').src = window.allShowsData[id].img;
    renderCalendar();
    document.getElementById('modal-buy').style.display = 'flex';
}

function closeModal(id) { 
    document.getElementById(id).style.display = 'none'; 
}

function renderCalendar() {
    const grid = document.getElementById('calendar-days');
    grid.innerHTML = "<span>Mo</span><span>Tu</span><span>We</span><span>Th</span><span>Fr</span><span>Sa</span><span>Su</span>";
    for (let i = 1; i <= 31; i++) {
        let d = document.createElement('span'); 
        d.className = 'day'; 
        d.innerText = i;
        d.onclick = function() { 
            document.querySelectorAll('.day').forEach(el => el.classList.remove('active')); 
            this.classList.add('active'); 
        };
        grid.appendChild(d);
    }
}
