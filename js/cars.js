window.addEventListener("load", () => {
    setupCarsListeners()
});

function setupCarsListeners() {
    document.querySelector('#cars-form').addEventListener("submit", (e) => {
        submitCarsForm(e)
    })
}

function isValidDate(dateStr) {
    const givenDate = new Date(dateStr)
    const startDate = new Date("2024-09-01")
    const endDate = new Date("2024-12-01")
    return givenDate >= startDate && givenDate <= endDate
}

function displayCarsResults(c, t, chi, cho) {
    const outputDiv = document.querySelector("#cars-output")
    outputDiv.textContent = "City: " + c + "\nType: " + t + "\nCheck in: " + chi + "\nCheck Out: " + cho
}

function submitCarsForm(e) {
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
        displayCarsResults(city, type, checkin, checkout)
    }
}
