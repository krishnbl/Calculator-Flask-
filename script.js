let display = document.getElementById("calc-display");

function appendValue(value) {
    display.value += value;
}

function clearDisplay() {
    display.value = "";
}

function calculate() {
    const expression = display.value;

    fetch("/calculate", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ expression: expression }),
    })
    .then((response) => response.json())
    .then((data) => {
        if (data.result !== undefined) {
            display.value = data.result;
            updateHistory(`${expression} = ${data.result}`);
        } else {
            display.value = "Error";
        }
    })
    .catch(() => {
        display.value = "Error";
    });
}

function updateHistory(entry) {
    const historyList = document.getElementById("history-list");
    const newEntry = document.createElement("li");
    newEntry.textContent = entry;
    historyList.appendChild(newEntry);
}

function clearHistory() {
    fetch("/clear_history", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
    })
    .then((response) => response.json())
    .then((data) => {
        const historyList = document.getElementById("history-list");
        historyList.innerHTML = ""; // Clear the list
        alert(data.message); // Notify the user
    })
    .catch(() => {
        alert("Error clearing history!");
    });
}

// Function to remove the last character entered
function deleteLast() {
    display.value = display.value.slice(0, -1);
}
