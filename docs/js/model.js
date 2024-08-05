let budget = getFromLocalStorage();

function getBudget() {
  return budget;
}

function createRecord(formData) {
  //Расчет id
  let id = 1;
  if (budget.length > 0) {
    const lastElement = budget[budget.length - 1];
    const lastElId = lastElement.id;
    id = lastElId + 1;
  }

  //Формируем запись
  const record = {
    id: id,
    type: formData.type,
    title: formData.title.trim(),
    value: +formData.value,
  };

  //Добавляем запись в данные
  budget.push(record);

  return record;
}

function deleteRecord(id) {
  const index = budget.findIndex(function (element) {
    if (+id === element.id) {
      return true;
    }
  });

  budget.splice(index, 1);
}

function calcBudget() {
  const totalIncome = budget.reduce(function (total, element) {
    if (element.type === "inc") {
      return total + element.value;
    } else {
      return total;
    }
  }, 0);

  const totalExpense = budget.reduce(function (total, element) {
    if (element.type === "exp") {
      return total + element.value;
    } else {
      return total;
    }
  }, 0);

  const totalBudget = totalIncome - totalExpense;

  let expensePercents = 0;
  if (totalIncome) {
    expensePercents = Math.round((totalExpense * 100) / totalIncome);
  }

  return {
    totalIncome: totalIncome,
    totalExpense: totalExpense,
    totalBudget: totalBudget,
    expensePercents: expensePercents,
  };
}

function getTestData() {
  const testData = [
    { type: "inc", title: "Фриланс", value: 1500 },
    { type: "inc", title: "Зарплата", value: 2000 },
    { type: "inc", title: "Бизнес", value: 2000 },
    { type: "inc", title: "Рента", value: 1000 },
    { type: "exp", title: "Продукты", value: 300 },
    { type: "exp", title: "Кафе", value: 200 },
    { type: "exp", title: "Транспорт", value: 200 },
    { type: "exp", title: "Квартира", value: 500 },
  ];

  function getRandoInt(max) {
    return Math.floor(Math.random() * max);
  }
  const randomIndex = getRandoInt(testData.length);
  return testData[randomIndex];
}

function getMonthYear() {
  const now = new Date();
  const year = now.getFullYear();
  const timeFormatter = new Intl.DateTimeFormat("ru-RU", {
    month: "long",
  });
  const month = timeFormatter.format(now);

  return { month, year };
}

//Сохраняю данные в localStorage
function saveToLocalStorage() {
  localStorage.setItem("budget", JSON.stringify(budget));
}

function getFromLocalStorage() {
  let data = localStorage.getItem("budget");

  if (data) {
    return JSON.parse(data);
  } else {
    return [];
  }
}

//Очистить localStorage по ключу 'budget' и перезагрузить страницу
function clearToLocalStorage() {
  if (window.confirm("Все данные будут удалены. Продолжить?")) {
    localStorage.removeItem("budget");
    location.reload();
  }
}

export {
  createRecord,
  deleteRecord,
  calcBudget,
  getTestData,
  getMonthYear,
  saveToLocalStorage,
  getBudget,
  clearToLocalStorage,
};
