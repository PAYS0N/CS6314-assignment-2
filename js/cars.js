window.addEventListener("load", () => {
    setupContactListeners()
    // developDom()
});

function developDom() {
    const main = document.querySelector("#main")
    const form = document.createElement("form")
    form.id = "cars-form"
    main.appendChild(form)
    form.appendChild(makeStandardFormGroup("text", "city", "City: "))
    form.appendChild(makecarDropdown())
    form.appendChild(makeStandardFormGroup("date", "checkin-date", "Check-in: "))
    form.appendChild(makeStandardFormGroup("date", "checkout-date", "Check-out: "))
    
}

function makeStandardFormGroup(type, name, labeltext) {
    const group = document.createElement("div")
    group.classList.add("form-group")
    const label = document.createElement("label")
    label.for = name
    label.textContent = labeltext
    group.appendChild(label)
    const input = document.createElement("input")
    input.type = type
    input.id = name
    input.name = name
    input.required = true
    group.appendChild(input)
    return group
}

function setupContactListeners() {
    document.querySelector('#cars-form').addEventListener("submit", (e) => {
        submitContactForm(e)
    })
}

function isValidDate(dateStr) {
    const givenDate = new Date(dateStr)
    const startDate = new Date("2024-09-01")
    const endDate = new Date("2024-12-01")
    return givenDate >= startDate && givenDate <= endDate
}

function displayContactResults(c, t, chi, cho) {
    const outputDiv = document.querySelector("#cars-output")
    outputDiv.textContent = "City: " + c + "\nType: " + t + "\nCheck in: " + chi + "\nCheck Out: " + cho
}

function submitContactForm(e) {
    e.preventDefault()
    const formData = new FormData(document.querySelector("#cars-form"));
    const city = formData.get("city")
    const type = formData.get("car-type")
    const checkin = formData.get("checkin-date")
    const checkout = formData.get("checkout-date")

    if (!isValidDate(checkin)) {
        alert("Must check in from Sep 1, 2024 to Dec 1, 2024.")
    }
    else if (!isValidDate(checkout)) {
        alert("Must check in from Sep 1, 2024 to Dec 1, 2024.")
    }
    else {
        displayContactResults(city, type, checkin, checkout)
    }
}
