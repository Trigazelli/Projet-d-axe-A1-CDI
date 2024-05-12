let params = new URLSearchParams(document.location.search);
let slug = params.get("slug");
let img = document.querySelector(".character");
let nameperso = document.querySelector(".name");
let info = document.querySelector(".infos");
let title = document.querySelector("title")
let footer = document.querySelector("footer")
let home = document.querySelector(".title")

let user = null;
console.log("https://hp-api.lainocs.fr/characters/" + slug);
fetch("https://hp-api.lainocs.fr/characters/" + slug)
.then((response) => response.json())
.then((e) => {
    console.log(e);
    fetch("http://10.0.4.8:3000/house", {
    method: "POST",
    headers: {
        "Content-Type": "application/json",
    },
    body: JSON.stringify({ house: e.house }),
    }).then(() => console.log("ok"));
    title.innerHTML = e.name
    img.src = e.image
    if (e.house == "") {
        img.style.backgroundImage = `url(../images/no_house.jpg)`
    } else {
        img.style.backgroundImage = `url(../images/${e.house}.jpg)`
    }
    nameperso.innerHTML = e.name
    info.innerHTML = `<li>Eyes: ${e.eyes}</li>
                    <li>Hairs: ${e.hairs}</li>
                    <li>Birthday: ${e.birthday}</li>
                    <li>Blood: ${e.blood}</li>
                    <li>Wand: ${e.wand}</li>
                    <li>Patronus: ${e.patronus}</li>
                    <li>Role:${e.role}</li>
                    <li>house:${e.house}</li>
                    <li>actor:${e.actor}</li>
                    `
    footer.innerHTML = `${e.name} is played by ${e.actor}`
})
.catch((e) => console.log(e));

home.addEventListener("click", function() {
    window.location.href = "index.html"
})