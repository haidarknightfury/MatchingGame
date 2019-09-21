function CardGame(gridSize) {
    this.size = (gridSize * gridSize) / 2;
    this.cardElements = [];

    const addCardItem = (i) => {
        let cardItem = new CardElement(i + 1, `${i + 1}.png`);
        let cardItem2 = new CardElement(i + 1, `${i + 1}.png`);
        this.cardElements.push(cardItem);
        this.cardElements.push(cardItem2);
    }

    for (let i = 0; i < this.size; i++) {
        addCardItem(i);
    }

    this.getCardItems = function () {
        return this.cardElements;
    }

}

CardGame.prototype.shuffle = function () {
    for (let i = 0; i < this.cardElements.length; i++) {
        let randomIndex = Math.floor(Math.random() * this.cardElements.length);
        [this.cardElements[i], this.cardElements[randomIndex]] = [this.cardElements[randomIndex], this.cardElements[i]];
    }
    console.log(`Shuffle correctly ? ${this.verify(this.cardElements)}`);
}

CardGame.prototype.verify = function (elements) {
    let verificationMap = {};
    elements.forEach(function (val) {
        if (!verificationMap[val.cardNumber]) {
            verificationMap[val.cardNumber] = 1;
        } else {
            verificationMap[val.cardNumber] += 1;
        }
    });
    let valid = true;
    Object.keys(verificationMap).forEach((k) => {
        if (verificationMap[k] !== 2) {
            valid = false;
        }
    });
    return valid;
}

function CardElement(cardNumber, imgSrc) {
    const path = "assets/"
    this.cardNumber = cardNumber;
    this.hidden = false;
    this.imgSrc = path + imgSrc;
}
CardElement.prototype.changeNumber = function (anotherNumber) {
    this.cardNumber = anotherNumber;
}

CardElement.prototype.toggleHidden = function () {
    this.hidden = !this.hidden;
}