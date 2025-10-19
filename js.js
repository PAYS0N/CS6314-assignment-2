window.onload = () => {
 
    populateTime()

    setupListeners()

    updateBackgroundColor()
    updateBookForm()
}

function populateTime() {
    const timeDiv = document.querySelector("#time")
    requestAnimationFrame(() => {updateDateTime(timeDiv)});
}

function updateDateTime(div) {
    const now = new Date();
    const formatted = now.toLocaleString();
    div.textContent = formatted;
    requestAnimationFrame(() => {updateDateTime(div)});
}

function setupListeners() {
    const settingsDiv = document.querySelector("#settings")
    settingsDiv.addEventListener("click", () => {
        openSettingsDialog()
    })
    document.querySelector("#one-way-trip-radio").addEventListener("change", () => {
        updateBookForm()
    })
    document.querySelector("#round-trip-radio").addEventListener("change", () => {
        updateBookForm()
    })
    document.querySelector('#booking-form').addEventListener("submit", (e) => {
        submitBookForm(e)
    })
}

function updateBookForm() {
    tripIsOneWay = document.querySelector("#one-way-trip-radio").checked
    tripIsRound = document.querySelector("#round-trip-radio").checked
    returnDateGroup = document.querySelector("#return-date-group")
    returnDate = document.querySelector("#return-date")
    if (tripIsOneWay) {
        returnDateGroup.style.display = 'none';
        returnDate.value = '';
        returnDate.required = false
    } else if (tripIsRound) {
        returnDateGroup.style.display = 'block';
        returnDate.required = true
    }

}

function submitBookForm(e) {
    e.preventDefault()
    const formData = new FormData(document.querySelector("#booking-form"));
    const origin = formData.get("origin")
    const destination = formData.get("destination")
    const departure = formData.get("depart-date")
    const arrival = formData.get("return-date")
    const dateRegex = /^(2024-(09|10|11)-[0-3][0-9]|2024-12-01)$/
    const cityRegex = /^[A-Za-z\s]+,\s*(TX|CA)$/
    if (!cityRegex.test(origin)) {
        alert("Must start at a city in TX or CA.")
    }
    else if (!cityRegex.test(destination)) {
        alert("Must end at a city in TX or CA.")
    }
    else if (!dateRegex.test(departure)) {
        console.log(formData.get("depart-date"))
        alert("Must depart from Sep 1, 2024 to Dec 1st, 2024.")
    }
    else if (arrival != "") {
        if (!dateRegex.test(arrival)) {
            alert("Must return from Sep 1, 2024 to Dec 1st, 2024.")
        }
        else {
            displayBookResults(origin, destination, departure, arrival)
        }
    }
    else {
        displayBookResults(origin, destination, departure, arrival)
    }
}

function displayBookResults(o, des, dep, arr) {
    console.log(o)
    console.log(des)
    console.log(dep)
    console.log(arr)
}

function openSettingsDialog() {
    document.querySelector("#settings-dialog").classList.toggle("hidden")
}

function updateFontSize() {
    const textSelector = document.querySelector("#text-selector")
    if (textSelector.value == "large") {
        document.documentElement.style.fontSize = "1.5rem"
    }
    else if (textSelector.value == "medium") {
        document.documentElement.style.fontSize = "1rem"
    }
    else if (textSelector.value == "small") {
        document.documentElement.style.fontSize = ".66rem"
    }
}

function updateBackgroundColor() {
    const textSelector = document.querySelector("#color-selector")
    if (textSelector.value == "red") {
        document.querySelector("#main").style.backgroundColor = "rgba(230, 154, 154, 1)"
        document.querySelector("#side").style.backgroundColor = "rgba(185, 98, 98, 1)"
    }
    else if (textSelector.value == "blue") {
        document.querySelector("#main").style.backgroundColor = "rgba(143, 143, 204, 1)"
        document.querySelector("#side").style.backgroundColor = "rgba(84, 84, 172, 1)"
    }
    else if (textSelector.value == "green") {
        document.querySelector("#main").style.backgroundColor = "rgba(168, 212, 152, 1)"
        document.querySelector("#side").style.backgroundColor = "rgba(87, 161, 72, 1)"
    }
}