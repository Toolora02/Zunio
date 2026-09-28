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

    const styles = {

        bold: {
            name: "Bold",
            convert: text => convertUnicode(text, 0x1D400, 0x1D41A)
        },

        italic: {
            name: "Italic",
            convert: text => convertUnicode(text, 0x1D434, 0x1D44E)
        },

        boldItalic: {
            name: "Bold Italic",
            convert: text => convertUnicode(text, 0x1D468, 0x1D482)
        },

        sans: {
            name: "Sans",
            convert: text => convertUnicode(text, 0x1D5A0, 0x1D5BA)
        },

        sansBold: {
            name: "Sans Bold",
            convert: text => convertUnicode(text, 0x1D5D4, 0x1D5EE)
        },

        monospace: {
            name: "Monospace",
            convert: text => convertUnicode(text, 0x1D670, 0x1D68A)
        },

        double: {
            name: "Double Struck",
            convert: text => convertUnicode(text, 0x1D538, 0x1D552)
        },

        fraktur: {
            name: "Fraktur",
            convert: text => convertUnicode(text, 0x1D504, 0x1D51E)
        },

        boldFraktur: {
            name: "Bold Fraktur",
            convert: text => convertUnicode(text, 0x1D56C, 0x1D586)
        },

        circled: {
            name: "Circled",
            convert: text => circleText(text)
        },

        fullwidth: {
            name: "Fullwidth",
            convert: text => fullWidthText(text)
        },

        smallCaps: {
            name: "Small Caps",
            convert: text => smallCapsText(text)
        },

        strikethrough: {
            name: "Strikethrough",
            convert: text => strikethroughText(text)
        },

        underline: {
            name: "Underline",
            convert: text => underlineText(text)
        }
    };


    function convertUnicode(text, upperStart, lowerStart) {

        return text.split("").map(char => {

            const code = char.charCodeAt(0);

            if (code >= 65 && code <= 90) {
                return String.fromCodePoint(
                    upperStart + code - 65
                );
            }

            if (code >= 97 && code <= 122) {
                return String.fromCodePoint(
                    lowerStart + code - 97
                );
            }

            return char;

        }).join("");
    }


    function circleText(text) {

        return text.split("").map(char => {

            const code = char.toUpperCase().charCodeAt(0);

            if (code >= 65 && code <= 90) {
                return String.fromCodePoint(
                    0x24B6 + code - 65
                );
            }

            return char;

        }).join("");
    }


    function fullWidthText(text) {

        return text.split("").map(char => {

            const code = char.charCodeAt(0);

            if (code >= 33 && code <= 126) {
                return String.fromCharCode(code + 0xFEE0);
            }

            if (char === " ") {
                return "　";
            }

            return char;

        }).join("");
    }


    function smallCapsText(text) {

        const smallCaps = {
            a: "ᴀ", b: "ʙ", c: "ᴄ", d: "ᴅ",
            e: "ᴇ", f: "ғ", g: "ɢ", h: "ʜ",
            i: "ɪ", j: "ᴊ", k: "ᴋ", l: "ʟ",
            m: "ᴍ", n: "ɴ", o: "ᴏ", p: "ᴘ",
            q: "ǫ", r: "ʀ", s: "s", t: "ᴛ",
            u: "ᴜ", v: "ᴠ", w: "ᴡ", x: "x",
            y: "ʏ", z: "ᴢ"
        };

        return text.split("").map(char => {
            return smallCaps[char.toLowerCase()] || char;
        }).join("");
    }


    function strikethroughText(text) {

        return text.split("").map(char => {
            return char + "\u0336";
        }).join("");
    }


    function underlineText(text) {

        return text.split("").map(char => {
            return char + "\u0332";
        }).join("");
    }


    function createStyleCard(name, text) {

        const card = document.createElement("div");

        card.className = "fancy-style";

        const title = document.createElement("strong");
        title.textContent = name;

        const result = document.createElement("div");
        result.className = "fancy-style-text";
        result.textContent = text;

        const copyButton = document.createElement("button");
        copyButton.textContent = "Copy";

        copyButton.addEventListener("click", async function () {

            try {

                await navigator.clipboard.writeText(text);

                copyButton.textContent = "Copied!";

                setTimeout(() => {
                    copyButton.textContent = "Copy";
                }, 1500);

            } catch (error) {

                copyButton.textContent = "Copy failed";

                setTimeout(() => {
                    copyButton.textContent = "Copy";
                }, 1500);

            }

        });

        card.appendChild(title);
        card.appendChild(result);
        card.appendChild(copyButton);

        fancyOutput.appendChild(card);
    }


    fancyInput.addEventListener("input", function () {

        const text = this.value;

        fancyOutput.innerHTML = "";

        if (!text) {

            const message = document.createElement("p");

            message.textContent =
                "Your fancy text will appear here.";

            fancyOutput.appendChild(message);

            return;
        }


        Object.values(styles).forEach(style => {

            const converted = style.convert(text);

            function createStyleCard(name, text) {

    const card = document.createElement("div");
    card.className = "fancy-style";

    const title = document.createElement("strong");
    title.textContent = name;

    const result = document.createElement("div");
    result.className = "fancy-style-text";
    result.textContent = text;
    result.title = "Tap to copy";

    const hint = document.createElement("small");
    hint.textContent = "Tap to copy";

    result.addEventListener("click", async function () {

        try {

            await navigator.clipboard.writeText(text);

            hint.textContent = "✓ Copied!";

            setTimeout(() => {
                hint.textContent = "Tap to copy";
            }, 1500);

        } catch (error) {

            hint.textContent = "Copy failed";

            setTimeout(() => {
                hint.textContent = "Tap to copy";
            }, 1500);

        }

    });

    card.appendChild(title);
    card.appendChild(result);
    card.appendChild(hint);

    fancyOutput.appendChild(card);
            }
                style.name,
                converted
            );

        });

    });

}
