let personnages = document.querySelector(".personnages")
let buttons = document.querySelectorAll(".house")


// va chercher les données dans l'API
function fetchCharacter() {
    return fetch("https://hp-api.lainocs.fr/characters/")

    .then((response) => response.json())
}

// Sert à filtrer les personnages selon leur maison, et en appyant sur l'icône en haut à droite on revient à une version non filtrée
buttons.forEach(function(button) {
    button.addEventListener("click", function() {
        const house = button.getAttribute("id")
        // console.log(house);
        const persos = document.querySelectorAll(".personnage")
        persos.forEach(function(character){
            console.log("dose", character.classList.contains(house), character.id);
            if (house == "") {
                character.style.display = "flex"
            }
            else if (!character.classList.contains(house)) {
                character.style.display = "none"
            }
            else if (character.classList.contains(house)) {
                character.style.display = "flex"
            }
        });
    })
})

async function displayAll() {
    const data = await fetchCharacter()
    data.forEach(function(perso) {
        personnages.innerHTML += `
        <li class="personnage ${perso.house}" id="${perso.slug}" >
        <div class="name"><h1>${perso.name}</h1></div>
        <div class="back"></div>`
        let zone = document.querySelector(`#${perso.slug}`)
        if (perso.house == "") {
        zone.style.backgroundImage = `url(${perso.image}), url(../images/no_house.jpg)`
    } else {
        zone.style.backgroundImage = `url(${perso.image}), url(../images/${perso.house}.jpg)`
    }
    let persos = document.querySelectorAll(".personnage")
    persos.forEach(function(perso) {
        perso.addEventListener("click", function() {
            window.location.href = "./uniqueCard.html?slug=" + perso.getAttribute('id')
        })
    })
    })
}

displayAll()

// async function addClick() {
//     await displayAll()
//     let persos = document.querySelectorAll(".personnage")
//     console.log(persos);
//     persos.forEach(function(perso) {
//         perso.addEventListener("click", function() {
//             window.location.href = "./uniqueCard.html?slug=" + perso.getAttribute('id')
//         })
//     })
// }

//addClick()