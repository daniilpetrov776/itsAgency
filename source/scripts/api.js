// Пример функции для получения данных
async function fetchData() {
  try {
    const response = await fetch('http://localhost:3001');
    if (!response.ok) {
      throw new Error(`Сеть ответила с ошибкой: ${response.status}`);
    }
    const data = await response.json();
    console.log(data); // Обработка полученных данных
  } catch (error) {
    console.error('Ошибка при получении данных:', error);
  }
}

// Вызов функции
fetchData();
