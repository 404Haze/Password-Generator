// Elements
const copyButton = document.querySelector(".inputBox span");
const passwordIndicator = document.querySelector(".indicator");
const passwordInput = document.querySelector(".inputBox input");
const lengthSlider = document.querySelector(".passswordLength input");

const symbolsCheckbox = document.getElementById("symbols");
const numbersCheckbox = document.getElementById("numbers");
const lowercaseCheckbox = document.getElementById("lowercase");
const uppercaseCheckbox = document.getElementById("uppercase");
const ambiguityCheckbox = document.getElementById("avoidAmbiguity");

// Default characters set
const characters = {
    lowercase: "abcdefghijklmnopqrstuvwxyz",
    uppercase: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
    numbers: "0123456789",
    symbols: "^!$%&|[](){}:;.,*+-#@<>~",
}

// Non-ambigious characters set
const altCharacters = {
lowercase: "abcdefghijkmnopqrstuvwxyz",
uppercase: "ABCDEFGHJKLMNPQRSTUVWXYZ",
numbers: "123456789",
symbols: "^!$%&[](){}:;.,*+-#@<>~"
}

// Random password generator
const generatePassword = () => {
    const passwordLength = lengthSlider.value;
    const passwordCharacters = [];
    let password = "";

    // Function to shuffle an array
    const shuffleArray = (array) => {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    };

    // Conditional for checkboxes
    if (ambiguityCheckbox.checked) {
        // Use non-ambiguous characters set
        if (lowercaseCheckbox.checked) {
            passwordCharacters.push(...altCharacters.lowercase);
        }
        if (uppercaseCheckbox.checked) {
            passwordCharacters.push(...altCharacters.uppercase);
        }
        if (numbersCheckbox.checked) {
            passwordCharacters.push(...altCharacters.numbers);
        }
        if (symbolsCheckbox.checked) {
            passwordCharacters.push(...altCharacters.symbols);
        }
    } else {
        // Use regular characters set
        if (lowercaseCheckbox.checked) {
            passwordCharacters.push(...characters.lowercase);
        }
        if (uppercaseCheckbox.checked) {
            passwordCharacters.push(...characters.uppercase);
        }
        if (numbersCheckbox.checked) {
            passwordCharacters.push(...characters.numbers);
        }
        if (symbolsCheckbox.checked) {
            passwordCharacters.push(...characters.symbols);
        }
    }

    // Shuffle selected characters array
    shuffleArray(passwordCharacters);

    // Construct the random password
    for (let i = 0; i < passwordLength; i++) {
        password += passwordCharacters[Math.floor(Math.random() * passwordCharacters.length)];
    }

    // Pass the password
    passwordInput.value = password;
}

// Update password indicator based on length
const updatePassIndicator = (password) => {
    let score = 0;

    // Points for length (6 points for length up to 15 characters)
    score += Math.min(password.length, 15) * 6 / 15;

    // Points for uppercase
    if (/[A-Z]/.test(password)) {
        score += 1;
    }

    // Points for lowercase
    if (/[a-z]/.test(password)) {
        score += 1;
    }

    // Points for numbers
    if (/\d/.test(password)) {
        score += 1;
    }

    // Points for special characters
    if (/[^A-Za-z0-9]/.test(password)) {
        score += 1;
    }

    // Extra points 
    if (password.length > 15) {
        score += Math.min(password.length, 25) * 4 / 15;
    }

    // Map the score to the strength categories
    const strengthCategories = [
        "extremely-weak",
        "very-weak",
        "weak",
        "somewhat-weak",
        "medium",
        "somewhat-strong",
        "strong",
        "very-strong",
        "extremely-strong",
        "exceptionally-strong"
    ];

    // Finalize the score
    const strengthIndex = Math.floor((score / 15) * strengthCategories.length);
    if (strengthIndex >= 10) {
        strengthIndex = 10
    }
    passwordIndicator.id = strengthCategories[strengthIndex];
};

// Update slider value
const updateSlider = () => {
    document.querySelector(".passswordLength span").innerText = lengthSlider.value;
    generatePassword();
    updatePassIndicator(passwordInput.value);
}

// Copy password to clipboard
const copyPassword = () => {
    navigator.clipboard.writeText(passwordInput.value);
    copyButton.innerText = "check";
    copyButton.style.color = "#64f442";
    setTimeout(() => {
        copyButton.innerText = "copy_all";
        copyButton.style.color = "#ccc";
    }, 1500);
}

// Event listeners
copyButton.addEventListener("click", copyPassword);
lengthSlider.addEventListener("input", updateSlider);

// Initial setup
updateSlider();
