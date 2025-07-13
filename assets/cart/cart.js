window.onload = function () {

    // retrive products from local storage into first section
    retrivePorductsIntoFirstSection()

    // adjust all products total and suptotal in cart list 
    adjustPorductsTotalAndSubtotalInCartList()

    document.querySelectorAll(".cart .cart-summary .fees").forEach(function (elem, index, arr) {
        elem.addEventListener('click', function () {
            
            document.querySelector(".cart .cart-summary .fees.active input").checked = 0
            document.querySelector(".cart .cart-summary .fees.active").classList.remove('active')
            this.classList.add('active')
            document.getElementById(`radio-${this.id.split('-')[1]}`).checked = 1
            
        })
    })

    document.querySelectorAll(".personal-info > div > div:last-of-type .form-check").forEach(function (elem, index, arr) {
        elem.addEventListener('click', function () {

            document.querySelector(".personal-info > div > div:last-of-type .form-check.active input").checked = 0
            document.querySelector(".personal-info > div > div:last-of-type .form-check.active").classList.remove('active')
            this.classList.add('active')
            document.getElementById(`radioPayment-${this.id.split('-')[1]}`).checked = 1

        })
    })

}


function showProductAmountInProductsList(product_id) {
    document.getElementById(`canvAmount-${product_id}`).textContent = JSON.parse(localStorage.getItem(product_id)).prodAmount
}

function showProductAmountInOrderSummary(product_id) {
    document.getElementById(`orderAmount-${product_id}`).textContent = JSON.parse(localStorage.getItem(product_id)).prodAmount
}


function showProductQtyInCartList(product_id) {
    document.getElementById(`cartProductAmount-${product_id}`).textContent = JSON.parse(localStorage.getItem(product_id)).prodAmount
}

function showProductTotalInProductsList(product_id) {
    document.getElementById(`canvPrice-${product_id}`).textContent = JSON.parse(localStorage.getItem(product_id)).prodTotal
}

function showProductTotalInOrderSummary(product_id) {
    document.getElementById(`orderPrice-${product_id}`).textContent = JSON.parse(localStorage.getItem(product_id)).prodTotal
}

function showProductTotalInCartList(product_id) {
    document.querySelectorAll(".cart table tbody tr").forEach(function (elem, index, arr) {
        if (elem.id === product_id) {
            elem.lastChild.textContent = JSON.parse(localStorage.getItem(product_id)).prodTotal
        }
    })
}


document.querySelectorAll(".title > div > div").forEach(function (elem, index, arr) {
    elem.addEventListener('click', function () {
        if (this.id.split('-')[1] > 1) {
            for (i = 1; i < this.id.split('-')[1]; i++) {
                document.getElementById(`checkOutStep-${i}`).classList.add('visited')
            }
        } else {
            for (i = 2; i <= document.querySelectorAll(".title > div > div").length; i++) {
                document.getElementById(`checkOutStep-${i}`).classList.remove('visited')
            }
        }
        document.querySelector(".title > div > div.active").classList.remove('active')
        this.classList.add('active')
        this.classList.remove('visited')
        
        // show the correponding cart section
        document.querySelector(".cart > div:not(:first-of-type).active").classList.remove('active')
        document.getElementById(`cartDetail-${this.id.split('-')[1]}`).classList.add('active')
        
        // retrive products from local storage into sections
        if (this.id.split('-')[1] == 1) {
            retrivePorductsIntoFirstSection()
            // adjust all products total and suptotal 
            adjustPorductsTotalAndSubtotalInCartList()


        } else if (this.id.split('-')[1] == 2) {
            retriveProductIntoSecondCartSection()
            // adjust total and suptotal of all products
            adjustPorductsTotalAndSubtotalInOrderSummary()
        } else {
            // type the head the description of cart last page
            typeTheHeadAndDescMsgSmoothly()

            retriveProductIntoThirdCartSection()
        }
    })
})


if (document.querySelector(".cart .cart-detail.active .product-list") !== null) {

    // adjust product amount and total in order summary
    document.querySelectorAll(".cart .adjustQty").forEach(function (elem, index, arr) {
        elem.addEventListener('click', function () {

            // adjust product amount in local storage 
            let op = this.id.split('-')[0]
            adjustProductQty(this.id.split('-')[1], op)

            // adjust product total in local storage
            adjustProductTotal(this.id.split('-')[1])

            // show product amount in products list
            showProductAmountInProductsList(this.id.split('-')[1])

            // show product total in products list
            showProductTotalInProductsList(this.id.split('-')[1])

            // remove product from products list
            removeProductFromProductList(this.id.split('-')[1])

        })
    })
    
    // add actions on remove product from product list
    document.querySelectorAll(".cart .cart-detail.active table .close-icon").forEach(function (elem, index, arr) {

        elem.addEventListener('click', function () {
            // remove product from local storage
            removeProductFromLocalStorage(this.id.split('-')[1])

            // remove product id from added products
            removeProductIdFromProductsList(this.id.split('-')[1])

            // remove product from cart table
            removeProductFromProductList(this.id.split('-')[1])
        })

    })
}


function typeTheHeadAndDescMsgSmoothly() {
    let thankMessage = 'Thank you! 🎉'
    let descMessage = 'Your order has been received'
    let i = 0
    let typingThankMsg = setInterval(() => {
        document.querySelector('.cart > div:nth-child(4).active h5').textContent = thankMessage.slice(0, i++)
        // if fulfilled the whole text clear the interval and type description text
        if (i > thankMessage.length) {
            clearInterval(typingThankMsg)
            i = 0
            let DescriptionMsg = setInterval(() => {
                document.querySelector('.cart > div:nth-child(4) h1').textContent = descMessage.slice(0, i++)
                if (i > descMessage.length) {
                    clearInterval(DescriptionMsg)
                }
            }, 100)
        }
    }, 100)

}

function removeProductFromProductList(product_id) {
    document.getElementById(`prod-${product_id}`).remove()
}

function retrivePorductsIntoFirstSection() {
    let product_ids = JSON.parse(localStorage.getItem('productIds'))
    let tbody = ''
    if (product_ids !== null) {
        product_ids.forEach(function (elem, index, arr) {
            let product = JSON.parse(localStorage.getItem(elem))
            let td_1 = `
                      <div class="d-flex align-items-center">
                        <div style="height: auto; width: auto; margin-right: 12px;">
                            <img src="${product.prodImgSrc}" alt="" style="height: 120px; width: 120px; object-fit: containt !important;"/>
                        </div>
                        <div>
                            <h6>${product.prodName}</h6>
                            <p style="color: #6C7275;">Color: Black</p>
                            <svg width="83" height="25" viewBox="0 0 83 25" fill="none" xmlns="http://www.w3.org/2000/svg" class="close-icon" id="remove-${elem}" >
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M5.29289 5.79289C5.68342 5.40237 6.31658 5.40237 6.70711 5.79289L12 11.0858L17.2929 5.79289C17.6834 5.40237 18.3166 5.40237 18.7071 5.79289C19.0976 6.18342 19.0976 6.81658 18.7071 7.20711L13.4142 12.5L18.7071 17.7929C19.0976 18.1834 19.0976 18.8166 18.7071 19.2071C18.3166 19.5976 17.6834 19.5976 17.2929 19.2071L12 13.9142L6.70711 19.2071C6.31658 19.5976 5.68342 19.5976 5.29289 19.2071C4.90237 18.8166 4.90237 18.1834 5.29289 17.7929L10.5858 12.5L5.29289 7.20711C4.90237 6.81658 4.90237 6.18342 5.29289 5.79289Z" fill="#6C7275"/>
                                <path d="M29.0043 17.5V7.31818H32.8224C33.6046 7.31818 34.2609 7.45407 34.7912 7.72585C35.3248 7.99763 35.7275 8.37879 35.9993 8.86932C36.2744 9.35653 36.4119 9.92495 36.4119 10.5746C36.4119 11.2275 36.2727 11.7943 35.9943 12.2749C35.7192 12.7521 35.3132 13.1217 34.7763 13.3835C34.2393 13.642 33.5798 13.7713 32.7976 13.7713H30.0781V12.2401H32.549C33.0064 12.2401 33.3809 12.1771 33.6726 12.0511C33.9643 11.9219 34.1797 11.7346 34.3189 11.4893C34.4614 11.2408 34.5327 10.9358 34.5327 10.5746C34.5327 10.2133 34.4614 9.90507 34.3189 9.64986C34.1764 9.39134 33.9593 9.19579 33.6676 9.06321C33.3759 8.92732 32.9998 8.85938 32.5391 8.85938H30.8487V17.5H29.0043ZM34.2642 12.8864L36.7848 17.5H34.7266L32.2507 12.8864H34.2642ZM41.3015 17.6491C40.5359 17.6491 39.8746 17.4901 39.3178 17.1719C38.7643 16.8504 38.3384 16.3963 38.0401 15.8097C37.7418 15.2197 37.5927 14.5253 37.5927 13.7266C37.5927 12.9411 37.7418 12.2517 38.0401 11.6584C38.3417 11.0618 38.7627 10.5978 39.3029 10.2663C39.8432 9.93158 40.4779 9.7642 41.207 9.7642C41.6777 9.7642 42.1218 9.84044 42.5394 9.9929C42.9603 10.142 43.3316 10.3741 43.6531 10.6889C43.9779 11.0038 44.2331 11.4048 44.4187 11.892C44.6043 12.3759 44.6971 12.9527 44.6971 13.6222V14.174H38.4379V12.9609H42.9719C42.9686 12.6162 42.8941 12.3097 42.7482 12.0412C42.6024 11.7694 42.3986 11.5556 42.1367 11.3999C41.8782 11.2441 41.5766 11.1662 41.2319 11.1662C40.864 11.1662 40.5408 11.2557 40.2624 11.4347C39.984 11.6103 39.7669 11.8423 39.6112 12.1307C39.4587 12.4157 39.3808 12.7289 39.3775 13.0703V14.1293C39.3775 14.5734 39.4587 14.9545 39.6211 15.2727C39.7835 15.5876 40.0105 15.8295 40.3022 15.9986C40.5939 16.1643 40.9353 16.2472 41.3263 16.2472C41.5882 16.2472 41.8252 16.2107 42.0373 16.1378C42.2494 16.0616 42.4334 15.9505 42.5891 15.8047C42.7449 15.6589 42.8626 15.4782 42.9421 15.2628L44.6225 15.4517C44.5165 15.8958 44.3143 16.2836 44.016 16.6151C43.721 16.9432 43.3432 17.1984 42.8825 17.3807C42.4218 17.5597 41.8948 17.6491 41.3015 17.6491ZM46.2196 17.5V9.86364H47.9398V11.1612H48.0293C48.1884 10.7237 48.4519 10.3823 48.8198 10.1371C49.1877 9.88849 49.6268 9.7642 50.1373 9.7642C50.6543 9.7642 51.0901 9.89015 51.4448 10.142C51.8027 10.3906 52.0546 10.7304 52.2005 11.1612H52.28C52.449 10.737 52.7341 10.3989 53.1351 10.147C53.5395 9.89181 54.0184 9.7642 54.5719 9.7642C55.2746 9.7642 55.848 9.98627 56.2921 10.4304C56.7362 10.8745 56.9583 11.5225 56.9583 12.3743V17.5H55.1536V12.6527C55.1536 12.1787 55.0276 11.8324 54.7757 11.6136C54.5239 11.3916 54.2156 11.2805 53.851 11.2805C53.4168 11.2805 53.0771 11.4164 52.8319 11.6882C52.5899 11.9567 52.4689 12.3063 52.4689 12.7372V17.5H50.704V12.5781C50.704 12.1837 50.5847 11.8688 50.3461 11.6335C50.1107 11.3982 49.8025 11.2805 49.4213 11.2805C49.1628 11.2805 48.9275 11.3468 48.7154 11.4794C48.5033 11.6087 48.3342 11.7926 48.2083 12.0312C48.0823 12.2666 48.0194 12.5417 48.0194 12.8565V17.5H46.2196ZM62.1151 17.6491C61.3693 17.6491 60.723 17.4851 60.1761 17.157C59.6293 16.8288 59.205 16.3698 58.9034 15.7798C58.6051 15.1899 58.456 14.5005 58.456 13.7116C58.456 12.9228 58.6051 12.2318 58.9034 11.6385C59.205 11.0452 59.6293 10.5845 60.1761 10.2564C60.723 9.92827 61.3693 9.7642 62.1151 9.7642C62.8608 9.7642 63.5071 9.92827 64.054 10.2564C64.6009 10.5845 65.0234 11.0452 65.3217 11.6385C65.6233 12.2318 65.7741 12.9228 65.7741 13.7116C65.7741 14.5005 65.6233 15.1899 65.3217 15.7798C65.0234 16.3698 64.6009 16.8288 64.054 17.157C63.5071 17.4851 62.8608 17.6491 62.1151 17.6491ZM62.125 16.2074C62.5294 16.2074 62.8674 16.0964 63.1392 15.8743C63.411 15.6489 63.6132 15.3473 63.7457 14.9695C63.8816 14.5916 63.9496 14.1707 63.9496 13.7067C63.9496 13.2393 63.8816 12.8168 63.7457 12.4389C63.6132 12.0578 63.411 11.7545 63.1392 11.5291C62.8674 11.3037 62.5294 11.1911 62.125 11.1911C61.7107 11.1911 61.366 11.3037 61.0909 11.5291C60.8191 11.7545 60.6153 12.0578 60.4794 12.4389C60.3468 12.8168 60.2805 13.2393 60.2805 13.7067C60.2805 14.1707 60.3468 14.5916 60.4794 14.9695C60.6153 15.3473 60.8191 15.6489 61.0909 15.8743C61.366 16.0964 61.7107 16.2074 62.125 16.2074ZM73.8629 9.86364L71.1435 17.5H69.1548L66.4354 9.86364H68.3544L70.1094 15.5362H70.1889L71.9489 9.86364H73.8629ZM78.2292 17.6491C77.4636 17.6491 76.8024 17.4901 76.2456 17.1719C75.6921 16.8504 75.2662 16.3963 74.9679 15.8097C74.6696 15.2197 74.5204 14.5253 74.5204 13.7266C74.5204 12.9411 74.6696 12.2517 74.9679 11.6584C75.2695 11.0618 75.6904 10.5978 76.2306 10.2663C76.7709 9.93158 77.4056 9.7642 78.1348 9.7642C78.6054 9.7642 79.0495 9.84044 79.4672 9.9929C79.8881 10.142 80.2593 10.3741 80.5808 10.6889C80.9056 11.0038 81.1608 11.4048 81.3464 11.892C81.532 12.3759 81.6248 12.9527 81.6248 13.6222V14.174H75.3656V12.9609H79.8997C79.8964 12.6162 79.8218 12.3097 79.676 12.0412C79.5301 11.7694 79.3263 11.5556 79.0645 11.3999C78.8059 11.2441 78.5043 11.1662 78.1596 11.1662C77.7917 11.1662 77.4686 11.2557 77.1902 11.4347C76.9118 11.6103 76.6947 11.8423 76.5389 12.1307C76.3864 12.4157 76.3085 12.7289 76.3052 13.0703V14.1293C76.3052 14.5734 76.3864 14.9545 76.5488 15.2727C76.7112 15.5876 76.9383 15.8295 77.2299 15.9986C77.5216 16.1643 77.863 16.2472 78.2541 16.2472C78.5159 16.2472 78.7529 16.2107 78.965 16.1378C79.1771 16.0616 79.3611 15.9505 79.5169 15.8047C79.6726 15.6589 79.7903 15.4782 79.8699 15.2628L81.5502 15.4517C81.4442 15.8958 81.242 16.2836 80.9437 16.6151C80.6487 16.9432 80.2709 17.1984 79.8102 17.3807C79.3495 17.5597 78.8225 17.6491 78.2292 17.6491Z" fill="#6C7275"/>
                            </svg>
                            <div class="d-flex justify-content-between align-items-center d-none">
                                <span class="minus adjustQty text-center" style="cursor: pointer; font-size: 28px;" id="decProd-${elem}">-</span>
                                <span class="amount" id="cartProductAmount-${elem}" style="font-size: 17px; font-weight: 500;">${product.prodAmount}</span>
                                <span class="plus adjustQty text-center" style="cursor: pointer; font-size: 28px;" id="incProd-${elem}">+</span>
                            </div>
                        </div>
                      </div>
                        <div class="d-none">
                            <h6>$${product.prodPrice}</h6>
                            <p class="close-icon" id="close-${elem}">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M5.29289 5.29289C5.68342 4.90237 6.31658 4.90237 6.70711 5.29289L12 10.5858L17.2929 5.29289C17.6834 4.90237 18.3166 4.90237 18.7071 5.29289C19.0976 5.68342 19.0976 6.31658 18.7071 6.70711L13.4142 12L18.7071 17.2929C19.0976 17.6834 19.0976 18.3166 18.7071 18.7071C18.3166 19.0976 17.6834 19.0976 17.2929 18.7071L12 13.4142L6.70711 18.7071C6.31658 19.0976 5.68342 19.0976 5.29289 18.7071C4.90237 18.3166 4.90237 17.6834 5.29289 17.2929L10.5858 12L5.29289 6.70711C4.90237 6.31658 4.90237 5.68342 5.29289 5.29289Z" fill="#6C7275"/>
                                </svg>
                            </p>
                        </div>`
                      

            let td_2 = `
                    <div class="d-flex justify-content-between align-items-center" style="width: 80%;">
                       <span class="minus adjustQty text-center" style="cursor: pointer; font-size: 28px;" id="decProd-${elem}">-</span>
                       <span class="amount" id="cartProductAmount-${elem}" style="font-size: 17px; font-weight: 500;">${product.prodAmount}</span>
                       <span class="plus adjustQty text-center" style="cursor: pointer; font-size: 28px;" id="incProd-${elem}">+</span>
                    </div>`

            tbody += `<tr id="${elem}"><td>${td_1}</td><td style="vertical-align: middle;">${td_2}</td><td style="vertical-align: middle;">$${product.prodPrice}</td><td style="vertical-align: middle; font-weight: 500;">$${product.prodTotal}</td></tr>`


        })
    }
    

    document.querySelector(".cart table tbody").innerHTML = tbody

    // Adjust product amount and total
    document.querySelectorAll('.cart table tbody .adjustQty').forEach(function (elem, index, arr) {
        elem.addEventListener('click', function () {

            // adjust product amount in local storage 
            let op = this.id.split('-')[0]
            adjustProductQty(this.id.split('-')[1], op)

            // adjust product total in local storage
            adjustProductTotal(this.id.split('-')[1])

            // adjust all products total and suptotal 
            adjustPorductsTotalAndSubtotalInCartList()

            // show product quantity in cart list
            showProductQtyInCartList(this.id.split('-')[1])

            // show product total in cart list
            showProductTotalInCartList(this.id.split('-')[1])
        })
    })

    // remove product from cart list
    this.document.querySelectorAll(".cart table tbody svg").forEach(function (elem, index, arr) {
        elem.addEventListener('click', function () {

            // remove product from local storage
            removeProductFromLocalStorage(this.id.split('-')[1])

            // remove product id from added products
            removeProductIdFromProductsList(this.id.split('-')[1])

            // adjust all products total and suptotal 
            adjustPorductsTotalAndSubtotalInCartList()

            // remove product from cart list
            elem.closest('tr').remove()
        })
    })

    // show products amount in cart number icon
    showProductsQtyInCartIcon()
}


function retriveProductIntoSecondCartSection() {
    product_ids = JSON.parse(localStorage.getItem('productIds'))
    cartProducts = ''
    if (product_ids !== null) {
        product_ids.forEach(function (elem, index, arr) {
            let product = JSON.parse(localStorage.getItem(elem))
            cartProducts += `<div class='d-flex align-items-center' style="margin-bottom: 20px; border-bottom: 1px solid #bfb5b5; padding-bottom: 30px;" id="prod-${elem}">
                        <div style="height: auto; width: auto; margin-right: 6px;">
                            <img src='${product.prodImgSrc}' alt='' style="height: 120px; width: 120px; object-fit: containt !important;"/> 
                        </div>   
                        <div class='d-flex justify-content-between' style="width: 60%;">                  
                            <div>
                                <h6>${product.prodName}</h6>
                                <p>Color: black</p>
                                <div class="d-flex justify-content-between align-items-center" style="width: 100px">
                                    <span class="minus adjustQty text-center" style="cursor: pointer; font-size: 28px;" id="decProd-${elem}">-</span>
                                    <span class="amount" id="orderAmount-${elem}" style="font-size: 17px; font-weight: 500;">${product.prodAmount}</span>
                                    <span class="plus adjustQty text-center" style="cursor: pointer; font-size: 28px;" id="incProd-${elem}">+</span>
                                </div>
                            </div>
                            <div class="text-center">
                                <h6 id="orderPrice-${elem}" class="prod-price">$${product.prodTotal}</h6>
                            </div>
                        </div>
                     </div>`
        })
    }
    

    document.querySelector(".personal-info .order-summary .products").innerHTML = cartProducts

    // adjust product amount and total in order summary
    document.querySelectorAll(".cart .adjustQty").forEach(function (elem, index, arr) {
        elem.addEventListener('click', function () {

            // adjust product amount in local storage 
            let op = this.id.split('-')[0]
            adjustProductQty(this.id.split('-')[1], op)

            // adjust product total in local storage
            adjustProductTotal(this.id.split('-')[1])

            // show product amount in order summary
            showProductAmountInOrderSummary(this.id.split('-')[1])

            // show product total in order summary
            showProductTotalInOrderSummary(this.id.split('-')[1])

            // adjust total and suptotal of all products
            adjustPorductsTotalAndSubtotalInOrderSummary()

        })
    })
}

function adjustPorductsTotalAndSubtotalInOrderSummary() {
    let total = 0
    if (JSON.parse(localStorage.getItem('productIds')) !== null) {
        JSON.parse(localStorage.getItem('productIds')).forEach(function (elem, index, arr) {
            total += parseFloat(document.getElementById(`orderPrice-${elem}`).textContent.slice(1))
        })
    }


    document.querySelector(".order-summary > div:nth-child(6) h5").textContent = '$' + total
    document.querySelector(".order-summary > div:nth-child(7) h4:last-of-type").textContent = '$' + total
}


function adjustPorductsTotalAndSubtotalInCartList() {
    let total = 0
    if (JSON.parse(localStorage.getItem('productIds')) !== null) {
        JSON.parse(localStorage.getItem('productIds')).forEach(function (elem, index, arr) {
            total += parseFloat(document.getElementById(elem).lastChild.innerHTML.slice(1))
        })
    }


    document.querySelector(".cart-detail .cart-summary > div:nth-child(5) span:last-of-type").textContent = '$' + total
    document.querySelector(".cart-detail .cart-summary > div:nth-child(6) h5:last-of-type").textContent = '$' + total
}

function retriveProductIntoThirdCartSection() {
    product_ids = JSON.parse(localStorage.getItem('productIds'))
    products = ''
    product_ids.forEach(function (elem, index, arr) {
        let product = JSON.parse(localStorage.getItem(elem))
        products += `<div style="width: 96px; height: 112px;">
                        <img src="${product.prodImgSrc}" alt="" style="height: 100%; width: 100%;"/>
                        <span>${product.prodAmount}</span>
                     </div>`
    })

    document.querySelector('.cart > div:nth-child(4) .products').innerHTML = products
}