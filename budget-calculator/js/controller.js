import * as model from "./model.js";
import * as view from "./view.js";

//Start
init();

//Functions
function init() {
  displayMonth();
  insertTestData();
  view.renderBudget(model.calcBudget());
  addEventListeners();

  const budget = model.getBudget();
  budget.forEach(function (item) {
    view.renderRecord(item);
  });

  function addEventListeners() {
    view.elements.form.addEventListener("submit", createRecord);
    view.elements.resetBtn.addEventListener("click", model.clearToLocalStorage);
    document.body.addEventListener("click", function (e) {
      if (e.target.closest("button.item__remove")) {
        deleteRecord(e);
      }
    });
  }

  function createRecord(e) {
    e.preventDefault();

    const checkResult = view.checkEmptyFields();
    if (checkResult === false) {
      return;
    }

    const formData = view.getFormData();
    const record = model.createRecord(formData);

    //Отображаем запись на странице
    view.renderRecord(record);
    view.renderBudget(model.calcBudget()); //Посчитать бюджет

    view.clearForm();
    insertTestData(); //Запуск тестовых данных
    model.saveToLocalStorage();
  }

  function deleteRecord(e) {
    const id = view.removeRecord(e);
    model.deleteRecord(id);
    view.renderBudget(model.calcBudget());
  }

  function insertTestData() {
    const randomData = model.getTestData();
    view.renderTestData(randomData);
  }

  function displayMonth() {
    const monthYear = model.getMonthYear();
    view.renderMonth(monthYear.month, monthYear.year);
  }
}


createRecord(testData);