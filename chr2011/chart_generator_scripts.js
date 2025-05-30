// Инициализируем таблицу
// replayTable.magic();
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOMContentLoaded вызван');
    try {
        console.log('Вызываю replayTable.magic()');
        replayTable.magic();
        console.log('replayTable.magic() вызван');
        // Проверяем, что таблица создана
        setTimeout(function() {
            const table = document.querySelector('.table-container table');
            if (table) {
                console.log('Таблица найдена в DOM');
            } else {
                console.error('Таблица не найдена в DOM после вызова replayTable.magic()');
            }
        }, 1000);
    } catch (e) {
        console.error('Ошибка инициализации replayTable:', e);
    }
    // Проверка загрузки CSV
    const tableContainer = document.querySelector('.table-container[data-source]');
    if (tableContainer) {
        const src = tableContainer.getAttribute('data-source');
        console.log('Найден контейнер таблицы с data-source:', src);
        if (src) {
            fetch(src)
                .then(resp => {
                    if (!resp.ok) throw new Error('HTTP ' + resp.status);
                    return resp.text();
                })
                .then(text => {
                    if (!text.trim()) {
                        console.error('CSV-файл пустой:', src);
                    } else {
                        console.log('CSV-файл успешно загружен:', src);
                    }
                })
                .catch(err => {
                    console.error('Ошибка загрузки CSV:', src, err);
                });
        }
    } else {
        console.error('Контейнер таблицы не найден');
    }
});

// Добавляем скрипт для дополнительного центрирования и адаптивности
window.addEventListener('load', function() {
    // Находим все контейнеры таблицы и центрируем их
    const tableContainers = document.querySelectorAll('.table-container, .controls-container');
    tableContainers.forEach(container => {
        container.style.marginLeft = 'auto';
        container.style.marginRight = 'auto';
        container.style.width = '100%';
        container.style.maxWidth = '900px';
    });
    
    // Добавляем обработчик изменения размера окна для адаптивности
    function handleResize() {
        const isMobile = window.innerWidth <= 768;
        const isVerySmall = window.innerWidth <= 480;
        
        // Находим таблицу
        const table = document.querySelector('.table-container table');
        if (table) {
            // Настраиваем стили в зависимости от размера экрана
            if (isVerySmall) {
                table.style.fontSize = '0.8rem';
            } else if (isMobile) {
                table.style.fontSize = '0.9rem';
            } else {
                table.style.fontSize = '1rem';
            }
        }
    }
    
    // Вызываем функцию при загрузке и при изменении размера окна
    handleResize();
    window.addEventListener('resize', handleResize);
});
