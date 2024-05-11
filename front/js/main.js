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
        let house = button.getAttribute("id")
        // console.log(house);
        characters.forEach(function(character){
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


//mise en page dynamique pour le nom et les images de fond pour les li
// characters.forEach(async function(character) {
    // const data = await fetchCharacter()
    // console.log(data);
    // character.innerHTML =  
    // `<div class="name"><h1>${data.name}</h1></div>
    // <div class="back"></div>`
    // `<div class="flip-card-inner">
    //     <div class="flip-card-front">
    //     <div class="name"><h1>${data.name}</h1></div>
    //     </div>
    //     <div class="flip-card-back">
    //     <p> Test </p>
    //     </div>
    // </div>`
    // le code ci-dessous choisit le fond de la carte en fonction de la maison inscrite dans l'API
    // if (data.house == "") {
    //     character.style.backgroundImage = `url(${data.image}), url(./images/no_house.jpg)`
    // } else {
    //     character.classList.add(`${data.house}`)
    //     character.style.backgroundImage = `url(${data.image}), url(./images/${data.house}.jpg)`
    // }

//    character.addEventListener("click",()=>window.location.href = "./uniqueCard.html?slug=" + data.slug )
//})

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
    })
}

async function addClick() {
    await displayAll()
    let persos = document.querySelectorAll(".personnage")
    console.log(persos);
    persos.forEach(function(perso) {
        perso.addEventListener("click", function() {
            window.location.href = "./uniqueCard.html?slug=" + perso.getAttribute('id')
        })
    })
}

addClick()

// Ci dessous des fonctions de test et de debug avant que le ForEach ne fonctionne, elles sont conservées si besoin

// function fetchCharacter(character) {

//     return fetch("https://hp-api.lainocs.fr/characters/" + character)

//     .then((response) => response.json())

//     .then((data) => {
//         console.log(data)
//     })

// }

// fetchCharacter("harry-potter")

// async function displayCharacter(id) {
//     const data = await fetchCharacter(id)
//     console.log(data[0].name);
//     document.getElementById(id).innerHTML = `
//     <h1>${data[0].name}<h1/>
//     <img src="${data[0].image}" alt="${data[0].name}"/>`
// }
