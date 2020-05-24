// 
document.addEventListener('DOMContentLoaded', function() {
  // 
  const baseRestApiUrl = 'http://localhost:4000/'
  // Создание отладочной переменной, содержащей
  // массив демонстрационных моделей с данными для карточек
  let products = {
    data: []
  }
  
  // Определение функции рисования всех карточек
  function renderProducts (products) {
    //Готовим шаблон списка при помощи библиотеки Hogan
    let template = Hogan.compile(
      `{{#data}}
        <div class="col s12 xl6">
          <div class="card">
            <div class="card-image">
              {{#image}}
                <img src="{{image}}">
              {{/image}}
              {{^image}}
                <img src="../images/image_1.jpeg">
              {{/image}}
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
  function fetchProducts () {
    // 
    const url = baseRestApiUrl + 'api/product'
    const requestData = {
      method: 'GET'
    }
    const request = new Request(url, requestData)
    fetch(request).then(function (response) {
      return response.json()
    }).then(function (response) {
      if (response.data && response.data.length > 0) {
        // Если очередная порция данных пришла не пустой -
        // пополняем ею массив локального состояния
        products.data = response.data
        // 
        renderProducts(products)
      }
    }).catch(function (e) {
      alert('Products fetching error: ' + e)
    })
  }
  // 
  fetchProducts()
  // 
	const modal = document.querySelectorAll('.modal')
  const instances = M.Modal.init(modal, {})
  // 
  let imageBase64 = ''
  image.onchange = function (ev) {
    //console.log($('form#create-offer-form input#image-input'));
    const file = ev.target.files[0];
    // 
    ImageTools.resize(file, {
        width: 300, // maximum width
        height: 300 // maximum height
      }, function(blob, didItResize) {
       // didItResize will be true if it managed to resize it, otherwise false
       // (and will return the original file as 'blob')
       var reader = new FileReader()
       reader.onloadend = function() {
        imageBase64 = reader.result
        preview.setAttribute('src', imageBase64)
       }
       reader.readAsDataURL(blob);
      })
  }
  const submit = document.querySelector('#newProductModal form button')
  // console.log(submit)
  submit.onclick = function(eventArgs){
    // 
    eventArgs.preventDefault()
    // 
    const newProduct = {
      "title": title.value,
      "description": description.value,
      "price": 0,
      "quantity": 0,
      "image": imageBase64
    }
    const url = baseRestApiUrl + 'api/product'
    const requestData = {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newProduct)
    }
    const request = new Request(url, requestData)
    fetch(request).then(function (response) {
      return response.status
    }).then(function (status) {
      if (status == 201) {
        // Если очередная порция данных пришла не пустой -
        // пополняем ею массив локального состояния
        fetchProducts()
      } else {
        alert('Product creating error')
      }
    }).catch(function (e) {
      alert('Products creating error: ' + e)
    })
  }
})