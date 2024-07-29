// async function fetchData() {
//   try {
//     const response = await fetch('https://66a77b8e53c13f22a3cfe81e.mockapi.io/card');
//     if (!response.ok) {
//       throw new Error(`Сеть ответила с ошибкой: ${response.status}`);
//     }
//     const data = await response.json();
//     console.log(data);
//   } catch (error) {
//     console.error('Ошибка при получении данных:', error);
//   }
// }
const errorText = 'Не удалось связаться с сервером';

const fetchData = () =>
  fetch('https://66a77b8e53c13f22a3cfe81e.mockapi.io/card')
    .then((response) => {
      if (!response.ok) {
        throw new Error();
      }
      return response.json();
    })
    .catch(() => {
      throw new Error(errorText);
    });

const getData = () => fetchData();

export { getData };
