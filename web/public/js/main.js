// Получение управления элементом разметки с идентификатором
// "addProductButton" (главная плавающая кнопка)
// без указания селектора, а напрямую по идентификатору
// +
// установка обработчика события Клик
/* addProductButton.onclick = function() {
	alert('You clicked a floating button');
} */
document.addEventListener('DOMContentLoaded', function() {
  // Создание отладочной переменной, содержащей
  // массив демонстрационных моделей с данными для карточек
  let products = {
    data: [
      {
        "id":1,
        "title":"orcl",
        "description":"I am a very simple card. I am good at containing small bits of information. I am convenient because I require little markup to use effectively.",
        "price":"49.99",
        "quantity":50
      },
      {
        "id":2,
        "title":"msft",
        "description":"I am a very simple card. I am good at containing small bits of information. I am convenient because I require little markup to use effectively.",
        "price":"99.99",
        "quantity":30
      }
    ]
  }
  // Определение функции рисования всех карточек
  function renderProducts(products) {
    //Готовим шаблон списка при помощи библиотеки Hogan
    let template = Hogan.compile(
      `{{#data}}
        <div class="col s12 xl6">
          <div class="card">
            <div class="card-image">
              <img src="../images/image_1.jpeg">
              <a class="btn-floating halfway-fab waves-effect waves-light red"><i class="material-icons">add</i></a>
            </div>
            <div class="card-content">
              <span class="card-title">{{title}}</span>
              <p>{{description}}</p>
            </div>
          </div>
        </div>
      {{/data}}`
    )
    // Находим элемент основной разметки, внутрь которого нужно поместить
    // разметку карточек, заполненную данными
    let container = document.querySelector('#productsContainer > .row')
    // Заполняем шаблон данными и помещаем результат на веб-страницу
    container.innerHTML = template.render(products)
  }
  // 
  renderProducts(products)

	const modal = document.querySelectorAll('.modal')
    const instances = M.Modal.init(modal, {})

    const submit = document.querySelector('#newProductModal form button')
    // console.log(submit)
    submit.onclick = function(eventArgs){
    	// console.log(title.value)
      // console.log(description.value)
      eventArgs.preventDefault()
      products.data.unshift(
        {
          "id": -1,
          "title": title.value,
          "description": description.value,
          "price": "00.00",
          "quantity": 0
        }
      )
      renderProducts(products)
    }
})