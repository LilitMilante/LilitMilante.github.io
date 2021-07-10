window.history.pushState('','', window.location.pathname)
let payForm = document.getElementById('pay-form')
let priceListForm = document.getElementById('price-list-form')
let continueBtn = document.getElementById('continue-btn')
let products = document.getElementsByName('products')
let productsDiv = document.getElementById('products')
let payBtn = document.getElementById('pay-btn')
let successForm = document.getElementById('success-form')
let failedForm = document.getElementById('failed-form')
let countProducts = 5



const setOnClickToDelBtns = () => {
    let deleteBtns = document.getElementsByName('delete-btn')
    for (let i = 0; i <= deleteBtns.length - 1; i++) {
        deleteBtns[i].onclick = (e) => {
            deleteProduct(e)
        }
    }
}

const calcPaySum = () => {

    switch (String(countProducts)) {
        case '5': 
            payBtn.innerHTML = 'Submit and Pay 80 USD'
            break
        
        case '4': 
            payBtn.innerHTML = 'Submit and Pay 72 USD'
            break
        
        case '3': 
            payBtn.innerHTML = 'Submit and Pay 60 USD'
            break
        
        case '2': 
            payBtn.innerHTML = 'Submit and Pay 44 USD'
            break
        
        case '1': 
            payBtn.innerHTML = 'Submit and Pay 24.99 USD'
            break

        default: 
         console.log('попали в default', countProducts)
    }
}

const deleteProduct = (event) => {
    let productToDelete = event.path[3]
    console.log(productToDelete)
    productToDelete.parentNode.removeChild(productToDelete);
    countProducts = countProducts - 1
    calcPaySum()
}

const showMoreProducts = () => {
    payForm.classList.add('d-none')
    priceListForm.classList.remove('d-none')
}

for (let i = 0; i <= products.length - 1; i++) {
    products[i].onclick = (e) => {
        countProducts = e.target.id
    }
}

continueBtn.onclick = () => {
    productsDiv.innerHTML = `<h3 class="mb-12">Info</h3>
    <label for="email" class="mb-12">Enter your email address</label>
    <input type="email" class="mb-25" id="email" placeholder="team@checkforpatent.com">
    
    <div class="product-item" id="product-1">
        <h3 class="mb-12">Product 1</h3>
        <label for="keyword-1" class="mb-12">Enter main keyword for the product</label>
        <input type="text" class="mb-25" id="keyword-1" placeholder="for example, sylicon wine cup">

        <label for="link" class="mb-12">Enter link to the similar product as a reference</label>
        <input type="url" class="mb-25" id="link" placeholder="https://...">
    </div>`
    for (let i = 2; i <= countProducts; i++) {
        productsDiv.insertAdjacentHTML(
            'beforeend',
            `<div class="product-item" id="product-${i}">
            <h3 class="mb-12">Product ${i} <button class="btn-add" name="delete-btn"><img src="./img/x-mark.svg" alt=""></button></h3>
            <label for="keyword-${i}" class="mb-12">Enter main keyword for the product</label>
            <input type="text" class="mb-25" id="keyword-${i}" placeholder="for example, sylicon wine cup">

            <label for="link" class="mb-12">Enter link to the similar product as a reference</label>
            <input type="url" class="mb-25" id="link" placeholder="https://...">
        </div>`
        )


    }
    setOnClickToDelBtns()
    calcPaySum()

    priceListForm.classList.add('d-none')
    payForm.classList.remove('d-none')
}

payBtn.onclick = () => {
    payBtn.innerHTML = '<div class="spinner"></div>'
   let randomNumb = Math.random() 
    setTimeout(() => {
        payForm.classList.add('d-none')
        if (randomNumb <= 0.5) {
            window.history.pushState('','', window.location.pathname + '?paymentsuccess');
            successForm.classList.remove('d-none')
        } else {
            window.history.pushState('','', window.location.pathname + '?paymenterror');
            failedForm.classList.remove('d-none')
        }
    }, 3000)

}

