// Функция воспроизведения звука в зависимости от нажатой кнопки
function makeSound(key) {
    let audio;
    switch (key) {
        case "w":
            audio = new Audio("sounds/tom.wav");
            break;
        case "a":
            audio = new Audio("sounds/clap.wav");
            break;
        case "s":
            audio = new Audio("sounds/hihat.wav");
            break;
        case "d":
            audio = new Audio("sounds/openhat.wav");
            break;
        case "j":
            audio = new Audio("sounds/snare.wav");
            break;
        case "k":
            audio = new Audio("sounds/kick.wav");
            break;
        case "l":
            audio = new Audio("sounds/boom.wav");
            break;
        default:
            console.log("Unknown key: " + key);
            return;  // Выходим, если нажата неизвестная клавиша
    }
    if (audio) {
        audio.currentTime = 0;  // Сбрасываем звук, если он уже воспроизводится
        audio.play();  // Воспроизводим звук
    }
}

// Добавление событий по клику на кнопки
document.querySelectorAll(".drum").forEach(function(button) {
    button.addEventListener("click", function() {
        const buttonInnerHTML = this.innerHTML;
        makeSound(buttonInnerHTML);
        buttonAnimation(buttonInnerHTML);
    });
});

// Добавление событий при нажатии клавиш
document.addEventListener("keydown", function(event) {
    makeSound(event.key);
    buttonAnimation(event.key);
});

// Анимация нажатия кнопок
function buttonAnimation(currentKey) {
    const activeButton = document.querySelector("." + currentKey);
    if (activeButton) {
        activeButton.classList.add("pressed");

        setTimeout(function() {
            activeButton.classList.remove("pressed");
        }, 100);
    }
}