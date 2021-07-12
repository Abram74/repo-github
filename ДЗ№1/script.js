'use strict';
const goods = [
    { title: 'Shirt', price: 150 },
    { title: 'Socks', price: 50 },
    { title: 'Jacket', price: 350 },
    { title: 'Shoes', price: 250 },
];

const renderGoodsItem = (title, price) => {
    return `<div class="goods-item"><h3>${title}</h3><p>${price}</p></div>`;
};
//В качестве аргумента функции задаем list со значением по умолчанию в виде массива с 
//объектом
const renderGoodsList = (list = [{ title: 'Jeans', price: 100 }]) => {
    //Метод map выполняет назначенную операцию с каждым объектом массива, при этом
    //отделяя каждый полученный результат запятой.
    //Для устранения запятых пользуемся методом join, в качестве аргумента передаем методу
    //пустые кавычки, так как нам необходимо ликвидировать всевозможные разделители
    //между карточками товаров
    let goodsList = (list.map(item => renderGoodsItem(item.title, item.price))).join('');
    document.querySelector('.goods-list').innerHTML = goodsList;
};

renderGoodsList(goods);