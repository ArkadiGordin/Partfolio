// Получаем все кнопки
const buttons = document.querySelectorAll('.drum');

// Добавляем обработчик событий на каждую кнопку
buttons.forEach(button => {
  button.addEventListener('click', function() {
    // Получаем название звука из атрибута data-sound
    const sound = this.getAttribute('data-sound');
    
    // Находим соответствующий аудио элемент
    const audio = document.getElementById(sound);
    
    // Сбрасываем звук, если он уже воспроизводится
    audio.currentTime = 0;
    
    // Воспроизводим звук
    audio.play();
  });
});
