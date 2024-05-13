let personnages = document.querySelector(".personnages")
let buttons = document.querySelectorAll(".house")
let modal = document.querySelector(".modal")
let form = document.querySelector(".modifiable")
let modal_button = document.querySelector(".modal_button")
let ExchangedCard = document.querySelector("#ExchangedCard")
let close = document.querySelector(".fa-solid.fa-x")
let bars = document.querySelector(".fa-solid.fa-bars")


// va chercher les données dans l'API
function fetchCharacter() {
    return fetch("https://hp-api.lainocs.fr/characters/")

    .then((response) => response.json())
}

// Sert à filtrer les personnages selon leur maison, et en appyant sur l'icône en haut à droite on revient à une version non filtrée
buttons.forEach(function(button) {
    button.addEventListener("click", function() {
        const house = button.getAttribute("id")
        const no_house = ["viktor-krum", "alastor-moody", "fleur-delacour"]
        // console.log(house);
        const persos = document.querySelectorAll(".personnage")
        persos.forEach(function(character){
            console.log("dose", character.classList.contains(house), character.id);
            if (house == "all") {
                character.style.display = "flex"
            } else if (house == "") {
                if (no_house.includes(character.id)) {
                    character.style.display = "flex"
                } else {
                    character.style.display = "none"
                }
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
        <li class="personnage ${perso.house}" id="${perso.slug}">
        <i class="fa-solid fa-heart"></i>
        <div class="name"><h1>${perso.name}</h1></div>
        </li>`
        let zone = document.querySelector(`#${perso.slug}`)
        if (perso.house == "") {
        zone.style.backgroundImage = `url(${perso.image}), url(../images/no_house.jpg)`
    } else {
        zone.style.backgroundImage = `url(${perso.image}), url(../images/${perso.house}.jpg)`
    }
    })
    let persos = document.querySelectorAll(".personnage")
    persos.forEach(function(perso) {
        let heart = perso.querySelector(".fa-solid.fa-heart")
        perso.addEventListener("dblclick", function() {
            window.location.href = "./uniqueCard.html?slug=" + perso.getAttribute('id')
        })
        heart.addEventListener("click", function() {
            heart.classList.toggle("added")
        })
        ExchangedCard.innerHTML += `<option value="${perso.id}">${perso.id}</option>`
    })
}

modal_button.addEventListener("click", function() {
    console.log("in modal");
    close.classList.add("visible")
    close.classList.remove("hidden")
    modal_button.classList.add("hidden")
    modal.classList.add("open")
    form.classList.add("visible")
    form.classList.remove("hidden")
})

close.addEventListener("click", function() {
    console.log("in close");
    close.classList.remove("visible")
    close.classList.add("hidden")
    modal_button.classList.remove("hidden")
    modal.classList.remove("open")
    form.classList.remove("visible")
    form.classList.add("hidden")
})

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