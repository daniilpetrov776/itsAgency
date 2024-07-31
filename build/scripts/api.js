// source/scripts/api.js
var errorText = "\u041D\u0435 \u0443\u0434\u0430\u043B\u043E\u0441\u044C \u0441\u0432\u044F\u0437\u0430\u0442\u044C\u0441\u044F \u0441 \u0441\u0435\u0440\u0432\u0435\u0440\u043E\u043C";
var fetchData = () => fetch("https://66a77b8e53c13f22a3cfe81e.mockapi.io/card").then((response) => {
  if (!response.ok) {
    throw new Error();
  }
  return response.json();
}).catch(() => {
  throw new Error(errorText);
});
var getData = () => fetchData();
export {
  getData
};
//# sourceMappingURL=api.js.map
