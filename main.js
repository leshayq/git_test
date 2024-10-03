function firstScript() {
    const firstRow = prompt('Введіть перший рядок:');
    const secondRow = prompt('Введіть другий рядок:');
    const letter = prompt('Введіть літеру для підрахунку:');

    function countLetter(str, letter) {
        let count = 0;
        for (let i = 0; i < str.length; i++) {
            if (str.charAt(i) === letter) {
                count++;
            }
        }
        return count;
    }

    function compareString(firstRow, secondRow, letter) {
        const countFirstRow = countLetter(firstRow, letter);
        const countSecondRow = countLetter(secondRow, letter);

        return countFirstRow > countSecondRow ? firstRow : secondRow;
    }

    const result = compareString(firstRow, secondRow, letter);
    alert('Більше літер "' + letter + '" у рядку: "' + result + '"');
}
function secondScript() {
    function formattedPhone(phone) {
        let cleanedPhone = phone.replace(/\D/g, '');

        if (cleanedPhone.length === 10) {
            cleanedPhone = '38' + cleanedPhone;
        } else if (cleanedPhone.length === 11 && cleanedPhone.startsWith('8')) {
            cleanedPhone = '3' + cleanedPhone;
        } else if (cleanedPhone.length === 12 && cleanedPhone.startsWith('38')) {
        } else {
            return 'Неправильний формат номера телефону';
        }

        return `+${cleanedPhone.slice(0, 2)} (${cleanedPhone.slice(2, 5)}) ${cleanedPhone.slice(5, 8)}-${cleanedPhone.slice(8, 10)}-${cleanedPhone.slice(10)}`;
    }

    const phoneInput = prompt('Введіть номер телефону:');
    const result = formattedPhone(phoneInput);
    alert(result);
}

document.getElementById('button1').onclick = firstScript;
document.getElementById('button2').onclick = secondScript;