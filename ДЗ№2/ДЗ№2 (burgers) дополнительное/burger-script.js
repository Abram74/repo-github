/* Не понял как добавить два топпинга (реализовал добавление только одного)*/
'use strict';
class Hamburger {
    constructor(size = "большой", stuffing = "сыр") {
        this.size = size;
        this.stuffing = stuffing;
    }
    addTopping(topping) {    // Добавить добавку
        this.topping = topping;
    }
    removeTopping() { // Убрать добавку
        this.topping = 0;
    }
    getToppings(topping) {   // Получить список добавок
        return this.topping;
    }
    getSize() {              // Узнать размер гамбургера
        console.log(this.size);
    }
    getStuffing() {          // Узнать начинку гамбургера
        return this.stuffing;
    }
    calculatePrice() {       // Узнать цену
        let totalPrice = 0;
        if (this.size == 'большой') {
            totalPrice += 100;
        }
        if (this.size == 'маленький') {
            totalPrice += 50;
        }

        if (this.stuffing == 'сыр') {
            totalPrice += 10;
        }
        if (this.stuffing == 'салат') {
            totalPrice += 20;
        }
        if (this.stuffing == 'картофель') {
            totalPrice += 15;
        }
        if (this.topping == 'приправа') {
            totalPrice += 15;
        }
        if (this.topping == 'майонез') {
            totalPrice += 20;
        }
        return totalPrice;
    }
    calculateCalories() {    // Узнать калорийность
        let totalCalories = 0;
        if (this.size == 'большой') {
            totalCalories += 40;
        }
        if (this.size == 'маленький') {
            totalCalories += 20;
        }

        if (this.stuffing == 'сыр') {
            totalCalories += 20;
        }
        if (this.stuffing == 'салат') {
            totalCalories += 5;
        }
        if (this.stuffing == 'картофель') {
            totalCalories += 10;
        }
        if (this.topping == 'приправа') {
            totalCalories += 0;
        }
        if (this.topping == 'майонез') {
            totalCalories += 5;
        }
        return totalCalories;
    }
}
let burger1 = {};
let clicked = false;//Данную переменную добавляю для того чтобы счетчик не срабатывал
//при повторном клике
let burgers = document.querySelectorAll(".burger");
burgers.forEach((burger) => {
    burger.addEventListener('click', function (event) {
        burger.classList.add('burger-chosen');
        if (burger.id == "big" && clicked == false) {
            burger1 = new Hamburger("большой");
            document.getElementById("small").classList.add("hidden");
        }
        if (burger.id == "small" && clicked == false) {
            burger1 = new Hamburger("маленький");
            document.getElementById("big").classList.add("hidden");
        }
        insertToppings(); //Функция меняет содержимое карточки бургера на выбор топпинга


    })
});

function fillInfo(burger1) {
    document.querySelector(".totalPrice").innerText = burger1.calculatePrice();
    document.querySelector(".totalCalories").innerText = burger1.calculateCalories();
}

function insertToppings() {
    if (clicked == false) {
        document.querySelector(".burger-chosen").insertAdjacentHTML('beforeend', `<div class="steps"><h3>Выберите топпинг:</h3>
        <p class="topping" id="spices">Приправа</p>
        <p class="topping" id="mayo">Майонез</p>
        </div>
        `);
        clicked = true;
        chooseToppings(burger1);//Функция позволяет выбрать топпинг
    }
}

function chooseToppings(burger1) {
    document.querySelectorAll('.topping').forEach((el) => {
        el.addEventListener('click', function () {
            if (el.id == "spices") {
                burger1.addTopping("приправа");//метод addTopping не срабатывает отсюда
            }
            if (el.id == "mayo") {
                burger1.addTopping("майонез");//метод addTopping не срабатывает отсюда
            }
            chooseStuffing();//Функция позволяет выбрать начинку бургера
        });
    });
}

function chooseStuffing() {
    document.querySelector(".steps").innerHTML = `
    <p>Начинка:</p>
    <p class="stuffing" id="cheese">Сыр</p>
    <p class="stuffing" id="salad">Cалат</p>
    <p class="stuffing" id="potato">Картофель</p>
    `;
    document.querySelectorAll(".stuffing").forEach((el) => {
        el.addEventListener("click", function () {
            if (el.id == "cheese") {
                burger1.stuffing = "сыр"
            }
            if (el.id == "salad") {
                burger1.stuffing = "салат"
            }
            if (el.id == "potato") {
                burger1.stuffing = "картофель"
            }
            summary();//функция меняет содержимое карточки с отображением итогового выбора
        })
    })
}

function summary() {
    document.querySelector(".steps").innerHTML = `
    <p>Начинка:</p>
    ${burger1.getStuffing()}
    <p>Добавка:</p>
    ${burger1.getToppings()}
    `;
    fillInfo(burger1);//Функция заполняет карточку "ИНФО" с ценой и каллориями
}











