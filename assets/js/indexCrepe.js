let nombre = 1
let elements = [
    {
        name: "Oeuf",
        image: "assets/images/oeufs.jpg",
        base: 1,
        unit: " oeuf",
        soldBy: 6
    },
    {
        name: "Farine",
        image: "assets/images/farine.jpg",
        base: 63,
        unit: "g",
        soldBy: 500
    },
    {
        name: "Lait",
        image: "assets/images/lait.jpg",
        base: 0.2,
        unit: "L",
        soldBy: 1.5
    },
    {
        name: "Beurre",
        image: "assets/images/beurre.jpg",
        base: 13,
        unit: "g",
        soldBy: 200
    },
]
let ingredients = document.getElementById('ingredients')
let courses = document.getElementById('listeCourses')
let invites = document.getElementById('number')


// création élément html EZ
function setElement(tag, params={class: undefined, id: undefined, text: undefined, title: undefined, href:undefined, html:undefined, onClick: undefined, src: undefined, alt: undefined}, destination=null) {
    let newTag = document.createElement(tag)
    if (params.class !== undefined) newTag.classList.add(params.class)
    if (params.id !== undefined) newTag.id = params.id
    if (params.text !== undefined) newTag.innerText = params.text
    if (params.html !== undefined) newTag.innerHTML = params.html
    if (params.title !== undefined) newTag.setAttribute("title", params.title)
    if (params.href !== undefined) newTag.href = params.href
    if (params.onClick !== undefined) newTag.addEventListener("click", params.onClick)
    if (params.src !== undefined) newTag.src = params.src
    if (params.alt !== undefined) newTag.alt = params.alt
    if (params.style !== undefined) newTag.style = params.style


    if (destination !== null) destination.appendChild(newTag)
    return newTag
}


// calculer liste de course par élément
function howMany(element) {
    let result = 1
    const getHowMany = (element, howMuch=1) => {
        if (element.base * invites.value <= element.soldBy * howMuch) {
            result = howMuch
        } else {
            getHowMany(element, howMuch + 1)
        }
    }
    getHowMany(element)
    return result
}

// refresh datas
function refresh() {
    if (Number(invites.value) < 0) {
        invites.value = 0
    } else {
        for (let i = 0; i < elements.length; i++) {
            let ing = document.getElementById(elements[i].name + "-ing")
            ing.innerText = elements[i].name === "Lait" ? (elements[i].base * invites.value).toFixed(2) : elements[i].base * invites.value + elements[i].unit
            let cou = document.getElementById(elements[i].name + "-cou")
            cou.innerText = `${howMany(elements[i])} x ${elements[i].soldBy} ${elements[i].unit}`
        }
    }
}


// v-for type ingrédients
for (let i = 0; i < elements.length; i++) {
    let upperCol = setElement("div", {class: "col", style:"margin: 0;"}, ingredients)
    let card = setElement("div", {class: "card"}, upperCol)
    let row = setElement("div", {class: "row"}, card)
    let col1 = setElement("div", {class: "col", style:"margin: 0; padding: 0; align-items: center"}, row)
    let col2 = setElement("div", {class: "col", style:"margin: 0; padding: 0, align-items: center"}, row)
    let name = setElement("h5", {html:elements[i].name + '<br/>'}, col1)
    let num = setElement("p", {id:elements[i].name + "-ing", text: elements[i].name === "Lait" ? (elements[i].base * nombre).toFixed(2) : elements[i].base * nombre + elements[i].unit}, col1)
    let img = setElement("img", {src: elements[i].image, style:"width: 50px; height:50px"}, col2)
}

// v-for type courses
for (let i = 0; i < elements.length; i++) {
    let upperCol = setElement("div", {class: "col", style:"margin: 0;"}, courses)
    let card = setElement("div", {class: "card"}, upperCol)
    let row = setElement("div", {class: "row"}, card)
    let col1 = setElement("div", {class: "col", style:"margin: 0; padding: 0; align-items: center"}, row)
    let col2 = setElement("div", {class: "col", style:"margin: 0; padding: 0, align-items: center"}, row)
    let name = setElement("h5", {html:elements[i].name}, col1)
    let num = setElement("p", {id:elements[i].name + "-cou", text: `${howMany(elements[i])} x ${elements[i].soldBy} ${elements[i].unit}`}, col1)
    let img = setElement("img", {src: elements[i].image, style:"width: 50px; height:50px"}, col2)
}

// events
invites.addEventListener("change", () => {refresh()})
plus.addEventListener("click", () => {invites.value = Number(invites.value) + 1; refresh()})
minus.addEventListener("click", () => {invites.value = Number(invites.value) - 1; refresh()})
