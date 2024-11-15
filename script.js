document.addEventListener("DOMContentLoaded", function () {
    swapContent('.nav', '.right-info-bar-text');

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
        var userChoice = confirm("You have data: " +
            "min digit - " + savedMinDigit + " Save it?");

        if (userChoice) {
            alert("Data saved in cookies. Reload the page if you want to enter the next number");
            document.getElementById('number-form').style.display = 'none';
        } else {
            deleteCookie("minDigit");
            document.getElementById('number-form').style.display = 'block';
            location.reload();
        }
    }
}

function findMinDigit() {
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

const textBlock6 = document.getElementById('text-block-6');

const savedColor = localStorage.getItem('textBlock6Color');
if (savedColor) {
    textBlock6.style.color = savedColor;
}

textBlock6.addEventListener('select', function (event) {
    const userColor = prompt('Enter color (like "red" or "#ff0000"): ');
    if (userColor) {
        textBlock6.style.color = userColor;
        localStorage.setItem('textBlock6Color', userColor);
    }
});

//////////////////////////////////////////////////////////////////////////

document.querySelectorAll('.table-create').forEach(block => {
    block.addEventListener('mouseenter', function () {
        const form = block.querySelector('.form-container');
        form.style.display = 'block';
    });

    block.addEventListener('mouseleave', function () {
        const form = block.querySelector('.form-container');
        form.style.display = 'none';
    });
});

function createTable(blockNumber) {
    const cellsInput = document.getElementById(`cells${blockNumber}`).value;

    const cells = parseInt(cellsInput, 10);
    const rows = cells % 2 == 0 ? 2 : 1;

    if (isNaN(rows) || isNaN(cells) || cells <= 0) {
        alert("Please enter valid number of cells.");
        return;
    }

    const table = document.createElement('table');
    table.style.width = '100%';
    table.style.borderCollapse = 'collapse';

    for (let i = 0; i < rows; i++) {
        const tr = document.createElement('tr');
        for (let j = 0; j < cells / rows; j++) {
            const td = document.createElement('td');
            td.style.border = '1px solid black';
            td.style.padding = '10px';
            td.textContent = `Cell ${(j + 1)} in row`;
            tr.appendChild(td);
        }
        table.appendChild(tr);
    }

    const block = document.getElementById(`img-${blockNumber}`);
    const tableContainer = block.querySelector('.table-container');
    if (!tableContainer) {
        const newTableContainer = document.createElement('div');
        newTableContainer.classList.add('table-container');
        block.appendChild(newTableContainer);
    }
    block.querySelector('.table-container').appendChild(table);

    const tableData = {
        rows: rows,
        cells: cells,
        tableHTML: table.outerHTML
    };

    localStorage.setItem(`tableBlock${blockNumber}`, JSON.stringify(tableData));
}

window.onload = function () {
    document.querySelectorAll('.table-create').forEach(block => {
        const blockNumber = block.id.replace('img', '');
        const savedTableData = localStorage.getItem(`tableBlock${blockNumber}`);

        if (savedTableData) {
            const data = JSON.parse(savedTableData);
            const tableContainer = block.querySelector('.table-container');
            const table = document.createElement('table');
            table.innerHTML = data.tableHTML;
            tableContainer.appendChild(table);
        }
    });
};

window.onbeforeunload = function () {
    localStorage.removeItem("tableBlock1");
    localStorage.removeItem("tableBlock2");
};
