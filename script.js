document.addEventListener("DOMContentLoaded", function () {
    swapContent('.nav', '.right-info-bar');

    let radius = 1;
    calculateAreaOfCircle(radius, '.left-info-bar')
});

window.addEventListener("load", function () {
    showCookieDialog();
});


//////////////////////////////////////////////////////////////////////////

function swapContent(selector1, selector2) {
    var element1 = document.querySelector(selector1);
    var element2 = document.querySelector(selector2);

    if (element1 && element2) {
        var tempContent = element1.innerHTML;
        element1.innerHTML = element2.innerHTML;
        element2.innerHTML = tempContent;
    } else {
        console.warn("Element(-s) not founded.");
    }
}

//////////////////////////////////////////////////////////////////////////

function calculateAreaOfCircle(r, selector) {
    let area = Math.PI * r * r;
    let text = "<p>The area of the circle with radius " + r + " is " + area + "</p>";
    let elementForResult = document.querySelector(selector);
    if (elementForResult) {
        elementForResult.insertAdjacentHTML('beforeend', text);
    } else {
        console.warn("Cannot find such element.");
    }
}

//////////////////////////////////////////////////////////////////////////

function showCookieDialog() {
    if (getCookie("minDigit")) {
        var savedMinDigit = getCookie("minDigit");
        var userChoice = confirm("You have data:" +
            "min digit - " + savedMinDigit + "Save it?");

        if (userChoice) {
            alert("Data saved in cookies. Please, reload the page.");
            document.getElementById('number-input').style.display = 'none';
        } else {
            deleteCookie("minDigit");
            document.getElementById('number-input').style.display = 'block';
            location.reload();
        }
    }
    else {
        console.log("Hello, World!");
    }
}

function findMinDigit() {
    console.log("Hello, World!");
    var input = document.getElementById('number-input').value;
    if (!input || input < 0) {
        alert("Please, enter int value.");
        return;
    }

    var minDigit = Math.min(...input.split('').map(Number));
    alert("Min digit: " + minDigit);

    setCookie("minDigit", minDigit, 1);
}

function setCookie(name, value, days) {
    var date = new Date();
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
    var expires = "expires=" + date.toUTCString();
    document.cookie = name + "=" + value + "; " + expires + "; path=/";
}

function getCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i].trim();
        if (c.indexOf(nameEQ) == 0) {
            return c.substring(nameEQ.length);
        }
    }
    return null;
}

function deleteCookie(name) {
    document.cookie = name + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
}

//////////////////////////////////////////////////////////////////////////


