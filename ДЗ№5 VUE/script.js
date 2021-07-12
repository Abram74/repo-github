'use strict';

//ДЗ№1
// const goods = [
//     { title: 'Shirt', price: 150 },
//     { title: 'Socks', price: 50 },
//     { title: 'Jacket', price: 350 },
//     { title: 'Shoes', price: 250 },
// ];

// const renderGoodsItem = (title, price) => {
//     return `<div class="goods-item"><h3>${title}</h3><p>${price}</p></div>`;
// };
// //В качестве аргумента функции задаем list со значением по умолчанию в виде массива с 
// //объектом
// const renderGoodsList = (list = [{ title: 'Jeans', price: 100 }]) => {
//     //Метод map выполняет назначенную операцию с каждым объектом массива, при этом
//     //отделяя каждый полученный результат запятой.
//     //Для устранения запятых пользуемся методом join, в качестве аргумента передаем методу
//     //пустые кавычки, так как нам необходимо ликвидировать всевозможные разделители
//     //между карточками товаров
//     let goodsList = (list.map(item => renderGoodsItem(item.title, item.price))).join('');
//     document.querySelector('.goods-list').innerHTML = goodsList;
// };

// renderGoodsList(goods);


//ДЗ№2

// class GoodsItem {
//     constructor(product_name, price) {
//         this.product_name = product_name;
//         this.price = price;
//     }
//     render() {
//         return `<div class="goods-item"><h3>${this.product_name}</h3><p class="itemPrice">${this.price}</p></div>`;
//     }
// }

// const API_URL = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';



// function makeGETRequest(url, callback) {
//     let xhr;
//     if (window.XMLHttpRequest) {
//         xhr = new XMLHttpRequest();
//     } else if (window.ActiveXObject) {
//         xhr = new ActiveXObject("Microsoft.XMLHTTP");
//     }

//     xhr.onreadystatechange = function () {
//         if (xhr.readyState === 4) {
//             callback(xhr.responseText);
//         }
//     }

//     xhr.open('GET', url, true);
//     xhr.send();
// }



// class GoodsList {
//     constructor() {
//         this.goods = [];
//         this.filteredGoods = [];
//     }
//     fetchGoods(banana) {
//         makeGETRequest(`${API_URL}/catalogData.json`, (goods) => {
//             this.goods = JSON.parse(goods);
//             this.filteredGoods = JSON.parse(goods);
//             banana();
//         })
//     }
//     render() {
//         let listHtml = '';
//         this.filteredGoods.forEach(good => {
//             const goodItem = new GoodsItem(good.product_name, good.price);
//             listHtml += goodItem.render();
//         });
//         document.querySelector('.goods-list').innerHTML = listHtml;
//     }
//     //Метод для расчета суммарной стоимости товаров на странице
//     totalPrice() {
//         let itemsOnPage = document.querySelectorAll('.itemPrice');
//         let totalPrice = 0;
//         itemsOnPage.forEach((item) => {
//             totalPrice += parseInt(item.innerText);
//         });
//         console.log(`Суммарная стоимость всех товаров: ${totalPrice}`);
//     }
//     filterGoods(value) {
//         let searchRequest = new RegExp(value, "i");
//         this.filteredGoods = this.goods.filter(good => searchRequest.test(good.product_name));
//         this.render();
//     }
// }


// document.querySelector(".search-button").addEventListener('click', (e) => {
//     const value = document.querySelector('.goods-search').value;
//     list.filterGoods(value);
//     alert("сработало")
// });

// //Класс для корзины товаров
// class Cart {

//     //Метод для удаления всех товаров из корзины
//     clearCart() {

//     }
// }
// //Класс для элемента корзины товаров
// class GoodOfCart {

//     //Метод для удаления одного товара из корзины
//     deleteGood() {

//     }
//     //Метод для увеличения количества определенного товара на единицу
//     increaseQuantityOfGood() {

//     }
//     //Метод для уменьшения количества определенного товара на единицу
//     decreaseQuantityOfGood() {

//     }

// }

// const list = new GoodsList();
// list.fetchGoods(() => {
//     list.render();
//     list.totalPrice();
// });
// //На данной строке основной код заканчивается и далее идут прочие задания

// //Замена одинарных кавычек на двойные
// let text = document.querySelector('.dialogue');
// let quotes = /\'[^s]/g;
// let newText = text.innerText.replace(quotes, '"');
// text.insertAdjacentHTML("afterend", `<p>${newText}</p>`);


// //Валидация формы
// document.querySelector('.btn').addEventListener('click', function () {
//     let name = document.querySelector('.name');
//     let phone = document.querySelector('.phone');
//     let mail = document.querySelector('.mail');
//     let nameCheck = /^[a-zA-Z]+$/;
//     let phoneCheck = /^\+7\(\d{3}\)\d{3}\-\d{4}$/;
//     let mailCheck = /^[a-zA-Z]+(\.|\-)?[a-zA-Z]+\@mail.ru$/;
//     error(name, nameCheck);
//     error(phone, phoneCheck);
//     error(mail, mailCheck);
// });

// //Функция для окрашивания рамки инпута в красный при неправильном вводе
// function error(item, itemCheck) {
//     if (!itemCheck.test(item.value)) {
//         item.classList.remove("black");
//         item.classList.add("red");
//         alert("Поле заполнено неправильно!")
//     }
//     else {
//         item.classList.remove("red");
//         item.classList.add("black");
//     }
// }



// Переводим на vue

const API_URL = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';
const app = new Vue({
    el: '#app',
    data: {
        goods: [],
        filteredGoods: [],
        searchLine: '',
        searchLine: '',
        isVisibleCart: "false",
    },
    methods: {
        makeGETRequest(url, callback) {
            var xhr;
            if (window.XMLHttpRequest) {
                xhr = new XMLHttpRequest();
            } else if (window.ActiveXObject) {
                xhr = new ActiveXObject("Microsoft.XMLHTTP");
            }

            xhr.onreadystatechange = function () {
                if (xhr.readyState === 4) {
                    callback(xhr.responseText);
                }
            }

            xhr.open('GET', url, true);
            xhr.send();
        },
        mounted() {
            this.makeGETRequest(`${API_URL}/catalogData.json`, (goods) => {
                this.goods = JSON.parse(goods);
                this.filteredGoods = JSON.parse(goods);
            });

        },
        filterGoods() {
            let request = new RegExp(this.searchLine, "i");
            this.filteredGoods = this.goods.filter(good => request.test(good.product_name));
        },
        toCart(event) {
            event.target.parentNode.classList.add("in-cart");
            event.target.innerText = "В корзине";
            document.querySelector(".cart").innerHTML += `${event.target.parentNode.children[0].innerText} ${event.target.parentNode.children[1].innerText} <br>`;

        },
        showCart() {
            if (this.isVisibleCart == "false") {
                document.querySelector(".cart").style.display = "block";
                this.isVisibleCart = "true";
            }
            else {
                document.querySelector(".cart").style.display = "none";
                this.isVisibleCart = "false";
            }

        }

    }
});

app.mounted();










