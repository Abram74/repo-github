//Основной задачей для меня было реализовать код, не заглядывая в решение, поэтому,
//вероятнее всего, мой код будет смутным для читателя, так как многие моменты
//кажутся нерациональными. Хотя я считаю все же лучше сделать именно так и использовать
//только те знания, которые я накопил в процессе курса.
//ОБРАЩАЮ ВНИМАНИЕ, что я реализовал просмотр добавленных товаров как бы в режиме
//предпросмотра, то есть див с товарами вылазит при наведении на корзину, при ЩЕЛЧКЕ
//корзина будет открываться в обычном режиме.
'use strict';
let arrOfBtn = document.getElementsByClassName('overlay-btn');
//В этот див я буду выводить товары:
let el = document.getElementsByClassName('cartPreview');
//Сохраняю таблицу в переменную, в нее я буду вставлять добавляемые товары
let table = document.getElementsByClassName('tg');

// Добавляю объект, в который буду сохранять количество кликов для каждого товара
//При этом я понимаю, что в реальной ситуации, при добавлении нового товара в каталог
//магазина пришлось бы все эти объекты редактировать, но в рамках тренировочного кода
// абстрагируемся от "а что если в будущем будет вот так"
let clickCounts = {
    product1: 0,
    product2: 0,
    product3: 0,
    product4: 0,
    product5: 0,
    product6: 0,
    product7: 0,
    product8: 0,
    product9: 0,
}

//Добавляю объект, в котором будут храниться номера товаров в том порядке, в котором на них
//щелкают
let seqNum = {
    product1: 0,
    product2: 0,
    product3: 0,
    product4: 0,
    product5: 0,
    product6: 0,
    product7: 0,
    product8: 0,
    product9: 0,
}
//Переменная elements будет повышаться на единицу с каждым кликом и передавать значение
//в объект выше (seqNum)
let elements = 0;
//По хорошему цена товара должна изначально храниться в объекте, но так как у меня была
//уже готовая верстка и цены были прописаны в html структуре, я пошел от обратного:
//т.е. буду считывать с разметки и записывать в данный объект цену на каждый товар
let prices = {
    product1: 0,
    product2: 0,
    product3: 0,
    product4: 0,
    product5: 0,
    product6: 0,
    product7: 0,
    product8: 0,
    product9: 0,
}
//Итоговая сумма товаров
let tPrice = 0;
//С помощью цикла for реализую слушатель событий, который:
for (let i = 0; i < arrOfBtn.length; i++) {
    arrOfBtn[i].addEventListener('click', function (event) {
        // считывает количество кликов на каждую кнопку
        let clicks = ++clickCounts[`product${i + 1}`];
        // Записывает в переменную name ВСЕ элементы с классом tableHeadingName
        let name = document.getElementsByClassName('tableHeadingName');
        //С помощью условия ЕСЛИ я проверяю, добавлялся ли товар в корзину ранее используя
        //функцию check()
        if (check(name, i)) {
            //Если true, то я в таблицу вставляю новую строку с товаром, которая содержит:
            // имя товара arrOfBtn[i].parentNode.parentNode.getElementsByClassName('itemHeading')[0].innerText
            //количество штук, которое изначально пустое, а вставлять количество я буду позже
            //цену товара за штуку arrOfBtn[i].parentNode.parentNode.getElementsByClassName('prices')[0].innerText
            //итоговую цену, которая изначально пустая, а вставлять её я буду позднее
            table[0].insertAdjacentHTML("beforeend", `
        <tr>
        <td class="tableHeadingName">${arrOfBtn[i].parentNode.parentNode.getElementsByClassName('itemHeading')[0].innerText}</td>
        <td class="tableHeadingQuantity"> шт.</td>
        <td class="tableHeading">${arrOfBtn[i].parentNode.parentNode.getElementsByClassName('prices')[0].innerText}</td>
        <td class="tableHeadingPrice"></td>
    </tr>
        `);
            //Здесь присваиваю каждому товару порядковый номер клика
            seqNum[`product${i + 1}`] = ++elements;

        }
        //Если добавляемый продукт первый, то добавить параграф с общей суммой
        //То есть на второй и последующий добавляемые товары данная строка не вставляется
        if (seqNum[`product${i + 1}`] === 1 && clickCounts[`product${i + 1}`] === 1) {
            table[0].insertAdjacentHTML("afterend", `
            <p class = "totalPrice"></p>
            `);
        }

        // Записываю порядковый номер клика в переменную SN (чтоб передать в функцию)
        let SN = seqNum[`product${i + 1}`];
        //Нахожу на странице ячейки, в который должно содержаться количество штук товара
        //и записываю в переменную
        let quantity = document.getElementsByClassName('tableHeadingQuantity');
        //Вызываю функцию, которая будет считать количество штук товара
        insertQ(quantity, clicks, SN);
        //Записываю в переменную ячейки, в которых должна содержаться суммарная цена за все
        //единицы каждого товара
        let price = document.getElementsByClassName('tableHeadingPrice');
        //В ячейку с ценой записываю результат суммы за один товар помноженную на количество кликов
        price[SN - 1].innerText = `$` + prices[`product${i + 1}`] * clicks;
        //Высчитываем общую стоимость товаров
        tPrice += prices[`product${i + 1}`];
        //Записываю в переменную место, куда мне нужно будет вставить итоговую сумму покупок
        //имя переменной имеет одинаковое имя как и у класса элемента. Это критично?
        let totalPrice = document.getElementsByClassName('totalPrice');
        totalPrice[0].innerText = `Всего товаров на сумму: $${tPrice}`
        //После клика кнопка приобретает надпись "В корзине"
        event.target.innerText = "В корзине";
    });
}
//Функция проверяет, добавлялся ли ранее товар в корзину. Это сделано для того, чтобы
//не создавать две строки с одним и тем же товаром.
function check(name, i) {
    //Изначально переменная "имя не найдено" содержит истину
    let nameNotFound = true;
    for (let k = 0; k < name.length; k++) {
        if (name[k].innerText == arrOfBtn[i].parentNode.parentNode.getElementsByClassName('itemHeading')[0].innerText) {
            //если в таблице такой товар найден, то "имя не найдено" приобретает значение ложь
            nameNotFound = false;
            break;
        }
    }
    //Возвращаем результат проверки наличия ранее добавленного товара и возвращаем
    //false или true
    return nameNotFound;
}
//Функция рассчитывает и вставляет в разметку количество товаров одной модели в зависимости
//от количества кликов
function insertQ(quantity, clicks, SN) {
    quantity[SN - 1].innerText = `${clicks} шт.`
}

//Цикл с разметки считывает цену товара и записывает её в объеки с ценами
for (let i = 0; i < arrOfBtn.length; i++) {
    //Так как в разметке цена прописана с стоящим перед ней знаком доллара, то
    //я отделяю этот знаке с помощью метода slice()
    prices[`product${i + 1}`] = Number(arrOfBtn[i].parentNode.parentNode.getElementsByClassName('prices')[0].innerText.slice(1));
}


/*ВЫВОД: основная поставленная задача была выполнена без необходимости просмотра решения, но
при этом код получился очень хаотичным. Сложности, с которыми столкнулся при написании кода:
1 Непонятно, в каких случаях тот или иной кусок кода нужно переносить в отдельную функцию.
Учитывая, что при создании отдельной функции, её вызов во всем коде будет производиться лишь
единожды, а значит смысла переноса кода в отдельную функцию нет.
2 Большая проблема с придумыванием названий переменных, особенно когда несколько разных переменных
имеют отношение к чему то единому, например у меня в коде:
- итоговая сумма товаров tPrice
- место в разметке, куда нужно вставлять итоговую сумму totalPrice
- название класса элемента, куда нужно вставлять итоговую сумму totalPrice.*/