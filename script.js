// Homepage search
const searchInput = document.getElementById("siteSearch");

if (searchInput) {
    searchInput.addEventListener("input", function () {
        const query = this.value.toLowerCase();

        document.querySelectorAll(".searchable").forEach(item => {
            const text = item.innerText.toLowerCase();

            item.style.display =
                text.includes(query) ? "block" : "none";
        });
    });
}


// Character counter
const textInput = document.getElementById("textInput");
const charCount = document.getElementById("charCount");

if (textInput && charCount) {
    textInput.addEventListener("input", function () {
        charCount.textContent = this.value.length;
    });
}


// Fancy text generator
const fancyInput = document.getElementById("fancyInput");
const fancyOutput = document.getElementById("fancyOutput");

if (fancyInput && fancyOutput) {
    fancyInput.addEventListener("input", function () {
        const text = this.value;

        const boldText = text.split("").map(c => {
            const code = c.charCodeAt(0);

            if (code >= 65 && code <= 90) {
                return String.fromCodePoint(0x1D400 + code - 65);
            }

            if (code >= 97 && code <= 122) {
                return String.fromCodePoint(0x1D41A + code - 97);
            }

            return c;
        }).join("");

        fancyOutput.textContent =
            boldText || "Your fancy text will appear here.";
    });
}
