window.onload = function () {
    if (location.pathname.slice(location.pathname.lastIndexOf('/')) === '/product.html') {
        let decSeconds = setInterval(() => {
            let seconds = parseInt(document.querySelector('.seconds').textContent)
            if (seconds > 0) {
                --seconds
            } else {
                seconds = minuteOrMore() ? 59 : seconds
            }

            document.querySelector('.seconds').textContent = seconds < 10 ? '0' + seconds : seconds

            if (seconds === 0 && parseInt(document.querySelector('.minutes').textContent) === 0) {
                clearInterval(decSeconds)
            }

        }, 1000)

        function minuteOrMore() {
            let minutes = parseInt(document.querySelector('.minutes').textContent)
            let moreThanMinute = minutes > 0 ? true : false
            if (moreThanMinute) {
                --minutes
            }

            if (minutes === 0) {
                minutes = houreOrMore() ? 59 : minutes
            }

            document.querySelector('.minutes').textContent = minutes < 10 ? '0' + minutes : minutes

            return moreThanMinute
        }

        function houreOrMore() {
            let hours = parseInt(document.querySelector('.hours').textContent)
            let moreThanHour = hours > 0 ? true : false
            if (moreThanHour) {
                --hours
            }

            if (hours === 0) {
                hours = dayOrMore() ? 23 : hours
            }

            document.querySelector('.hours').textContent = hours < 10 ? '0' + hours : hours

            return moreThanHour
        }

        function dayOrMore() {
            let days = parseInt(document.querySelector('.days').textContent)
            let moreThanDay = days > 0 ? true : false
            if (moreThanDay) {
                --days
            }
            document.querySelector('.days').textContent = days < 10 ? '0' + days : days

            return moreThanDay
        }

    }

    if (this.location.pathname.slice(this.location.pathname.lastIndexOf('/')) === '/shop1.html') {
        // show product by selected mode
        let modeId = this.localStorage.getItem('showMode')
        if (modeId !== null) {
            document.querySelector(".products .show-mode.active").classList.remove('active')
            document.querySelectorAll(".products .show-mode").forEach(function (elem, index, arr) {
                if (elem.id === modeId) {
                    if (!elem.classList.contains('d-none')) {
                        elem.classList.add('active')
                    }
                }
            })
        } else {
            modeId = document.querySelector(".products .show-mode.active").id
        }

        showProductsInMode(modeId)
    }

    // show products amount in cart number icon
    showProductsQtyInCartIcon()

    if (document.querySelector(".product-carousel") !== null || document.querySelector(".products") !== null) {
        // tag the favourite products
        tagTheFavouriteProducts()
    }


    document.querySelectorAll(".product-carousel .swiper-slide .prod-card-head .badge svg").forEach(function (elem, index, arr) {
        elem.addEventListener('click', function () {
            this.classList.add('d-none')
            if (this.classList.contains('bi-heart')) {
                document.getElementById(`favIcon-${this.id.split('-')[1]}`).classList.remove('d-none')
                // add to favourite product id
                addToFavouriteId(this.id.split('-')[1])

                // add to favourite product
                addToFavouriteProducts(this.id.split('-')[1])
            } else {
                document.getElementById(`notFavIcon-${this.id.split('-')[1]}`).classList.remove('d-none')

                // remove from favourite product id
                removeFromFavouriteId(this.id.split('-')[1])

                // remove from favourite products
                removeFromFavouriteProducts(this.id.split('-')[1])
            }
        })
    })

}

function tagTheFavouriteProducts() {
    let favProductIds = JSON.parse(localStorage.getItem('favouriteProductIds'))
    if (favProductIds.length !== 0) {
        document.querySelectorAll("svg.bi-heart").forEach(function (elem, index, arr) {
            if (favProductIds.includes(elem.id.split('-')[1])) {
                elem.classList.add('d-none')
            } else {
                document.getElementById(`favIcon-${elem.id.split('-')[1]}`).classList.add('d-none')
            }
        })
    }
    
}

function addToFavouriteId(product_id) {
    let favouriteProductIds = JSON.parse(localStorage.getItem('favouriteProductIds')) || []
    favouriteProductIds.push(product_id)
    localStorage.setItem('favouriteProductIds', JSON.stringify(favouriteProductIds))
}

function removeFromFavouriteId(product_id) {
    let favouriteProductIds = JSON.parse(localStorage.getItem('favouriteProductIds'))
    if (favouriteProductIds !== null) {
        favouriteProductIds.splice(favouriteProductIds.indexOf(product_id), 1)
        localStorage.setItem('favouriteProductIds', JSON.stringify(favouriteProductIds))
    }
}

function addToFavouriteProducts(product_id) {
    let favouriteProduct = {
        'prodImgSrc': document.getElementById(`img-${product_id}`).getAttribute('src'),
        'prodName': document.getElementById(`name-${product_id}`).textContent,
        'prodPrice': parseFloat(document.getElementById(`price-${product_id}`).textContent.slice(1))
    }

    localStorage.setItem(`favProd-${product_id}`, JSON.stringify(favouriteProduct))
}

function removeFromFavouriteProducts(product_id) {
    localStorage.removeItem(`favProd-${product_id}`)
}

function showProductsQtyInCartIcon() {
    // get amount of all products
    let prodAmount = 0
    if (localStorage.getItem('productIds') !== null) {
        JSON.parse(this.localStorage.getItem('productIds')).forEach(function (elem, index, arr) {
            prodAmount += JSON.parse(localStorage.getItem(elem)).prodAmount
        })
    }

    document.querySelectorAll(".prod-num").forEach(function (elem, index, arr) {
        elem.textContent = prodAmount
    })
}

document.querySelectorAll('.sign-up svg').forEach(function (elem, index, arr) {
    elem.addEventListener('click', function () {
        if (this.classList.contains('bi-eye-slash')) {
            document.querySelector('svg.bi-eye').classList.remove('d-none')
            document.getElementById('password').setAttribute('type', 'text')
        } else {
            document.querySelector('svg.bi-eye-slash').classList.remove('d-none')
            document.getElementById('password').setAttribute('type', 'password')
        }

        this.classList.add('d-none')
    })
})

var addedProdIds = []
document.querySelectorAll(".product-carousel .prod-card .prod-card-head svg")
    .forEach(function (elem, index, arr) {
        elem.addEventListener("click", function () {
            this.classList.toggle('checked')
        })
    })

document.querySelectorAll(".navigation-bar .nav-item a").forEach(function (elem, index, arr) {
    elem.addEventListener("click", function () {
        document.querySelectorAll(".navigation-bar .nav-item a").forEach(function (currElem) {
            currElem.classList.remove('active')
        })

        this.classList.add("active")
    })
})

document.querySelectorAll('button[data-bs-target="#offcanvasRight"').forEach(function (elem, index, arr) {
    console.log(elem.parentElement.nextElementSibling.childNodes[5])
})

var productIds = JSON.parse(localStorage.getItem('productIds')) || []
document.querySelectorAll(".add-btn").forEach(function (elem, index, arr) {
    elem.addEventListener("click", function () {
        // increase the cart tag product amount
        adjustCartAmount('incProd')

        if (!productExist(this.getAttribute('data-num'))) {
            prepareProductDetails(this.getAttribute('data-num'))
            // notify local storage that we have new product in cart
            pushNewProductId(this.getAttribute('data-num'))
        } else {
            adjustProductQty(this.getAttribute('data-num'), 'incProd')
            adjustProductTotal(this.getAttribute('data-num'))
        }
    })
})

function adjustCartAmount(op) {
    let amount = parseInt(document.querySelector(".prod-num").textContent)
    op === 'incProd' ? ++amount : (amount > 0 ? --amount : 0)
    document.querySelectorAll(".prod-num").forEach(function (elem, index, arr) {
        elem.textContent = amount
    })
}

function pushNewProductId(prodId) {
    productIds.push(prodId)
    localStorage.setItem('productIds', JSON.stringify(productIds))
}

function adjustProductQty(prodId, op) {
    let product = JSON.parse(localStorage.getItem(prodId))
    op === 'incProd' ? ++product.prodAmount : (product.prodAmount > 1 ? --product.prodAmount : 1)
    localStorage.setItem(prodId, JSON.stringify(product))
}

function prepareProductDetails(prodId) {
    let imgSrc = document.getElementById(`img-${prodId}`).getAttribute('src')
    let prodPrice = parseFloat(document.getElementById(`price-${prodId}`).textContent.slice(1))
    let prodName = document.getElementById(`name-${prodId}`).textContent

    storeProductInLocalStorage(prodId, prodName, prodPrice, imgSrc, 1)
}

function productExist(prodId) {
    if (localStorage.getItem(prodId) !== null) {
        return true
    }

    return false
}

function storeProductInLocalStorage(prodId, prodName, prodPrice, imgSrc, prodAmount) {
    let newProduct = {
        'prodImgSrc': imgSrc,
        'prodName': prodName,
        'prodPrice': prodPrice,
        'prodAmount': prodAmount,
        'prodTotal': prodPrice
    }

    localStorage.setItem(prodId, JSON.stringify(newProduct))
}

function adjustProductTotal(product_id) {
    let product = JSON.parse(localStorage.getItem(product_id))
    let prodPrice = product.prodPrice
    product.prodTotal = Math.round(prodPrice * product.prodAmount)

    localStorage.setItem(product_id, JSON.stringify(product))
}

document.getElementById('cartIcon').addEventListener('click', function () {
    let products = ''
    let productIds = JSON.parse(localStorage.getItem('productIds'))
    productIds.forEach(function (elem, index, arr) {
        let product = JSON.parse(localStorage.getItem(elem));
        products += `<div class='d-flex align-items-center' style="margin-bottom: 20px; border-bottom: 1px solid #bfb5b5; padding-bottom: 30px;" id="prod-${elem}">
                        <div style="height: auto; width: auto; margin-right: 6px;">
                            <img src='${product.prodImgSrc}' alt='' style="height: 120px; width: 120px; object-fit: containt !important;"/> 
                        </div>   
                        <div class='d-flex justify-content-between' style="width: 60%;">                  
                            <div>
                                <h6>${product.prodName}</h6>
                                <p>Color: black</p>
                                <div class="d-flex justify-content-between align-items-center" style="width: 100px">
                                    <span class="minus adjustQty text-center" style="cursor: pointer; font-size: 28px;" id="decProd-${elem}">-</span>
                                    <span class="amount" id="canvAmount-${elem}" style="font-size: 17px; font-weight: 500;">${product.prodAmount}</span>
                                    <span class="plus adjustQty text-center" style="cursor: pointer; font-size: 28px;" id="incProd-${elem}">+</span>
                                </div>
                            </div>
                            <div class="text-center">
                                <h6 id="canvPrice-${elem}" class="prod-price">$${product.prodTotal}</h6>
                                <p class="close-icon" id="close-${elem}">
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path fill-rule="evenodd" clip-rule="evenodd" d="M5.29289 5.29289C5.68342 4.90237 6.31658 4.90237 6.70711 5.29289L12 10.5858L17.2929 5.29289C17.6834 4.90237 18.3166 4.90237 18.7071 5.29289C19.0976 5.68342 19.0976 6.31658 18.7071 6.70711L13.4142 12L18.7071 17.2929C19.0976 17.6834 19.0976 18.3166 18.7071 18.7071C18.3166 19.0976 17.6834 19.0976 17.2929 18.7071L12 13.4142L6.70711 18.7071C6.31658 19.0976 5.68342 19.0976 5.29289 18.7071C4.90237 18.3166 4.90237 17.6834 5.29289 17.2929L10.5858 12L5.29289 6.70711C4.90237 6.31658 4.90237 5.68342 5.29289 5.29289Z" fill="#6C7275"/>
                                    </svg>
                                </p>
                            </div>
                        </div>
                     </div>`
    })

    document.querySelector('#cartOffcanvasRight .offcanvas-body .offcanvas-products').innerHTML = products

    adjustTotal()
    document.querySelectorAll(".navigation-bar #cartOffcanvasRight .offcanvas-body .adjustQty").forEach(function (elem, index, arr) {
        elem.addEventListener('click', function () {
            let prodId = this.id.split('-')[1]

            // adjust amount of current porduct
            adjustAmount(prodId, this.id.split('-')[0])

            adjustTotal()
        })
    })


    document.querySelectorAll(".navigation-bar #cartOffcanvasRight .offcanvas-body .close-icon").forEach(function (elem, index, arr) {
        elem.addEventListener('click', function () {
            prod_id = this.id.split('-')[1]
            document.getElementById(`prod-${prod_id}`).remove()

            // remove product from local storage
            removeProductFromLocalStorage(prod_id)

            // remove product id from added products
            removeProductIdFromProductsList(prod_id)

            // remove product from cart table
            removeProductFromCartList(prod_id)

            // adjust amount and total in canvas form
            adjustTotal()

            // show products amount in cart number icon
            showProductsQtyInCartIcon()
        })
    })

})



function removeProductFromCartList(product_id) {
    document.querySelectorAll(`.cart table tbody tr`).forEach(function (elem, index, arr) {
        if (elem.id === product_id) {
            elem.remove()
        }
    })
}

function removeProductIdFromProductsList(product_id) {
    let product_ids = JSON.parse(localStorage.getItem('productIds'))
    let prodIndex = product_ids.indexOf(product_id)

    product_ids.splice(prodIndex, 1)
    localStorage.setItem('productIds', JSON.stringify(product_ids))
}

function removeProductFromLocalStorage(prod_id) {
    localStorage.removeItem(prod_id)
}

document.querySelectorAll(".product-loop > div:last-of-type > div:nth-child(2) > div:nth-child(4) > div > div").forEach(function (elem, index, arr) {
    elem.addEventListener('click', function () {
        document.querySelector(".product-loop > div:last-of-type > div:nth-child(2) > div:nth-child(4) > div > div.active").classList.remove('active')
        elem.classList.add('active')
    })

})

document.querySelectorAll(".product-loop > div:last-of-type > div:nth-child(2) > div:nth-child(5) > div > div .adjustQty").forEach(function (elem, index, arr) {
    elem.addEventListener('click', function () {
        if (this.classList.contains('minus')) {
            if (parseInt(document.querySelector(".product-loop > div:last-of-type > div:nth-child(2) > div:nth-child(5) > div > div .amount").textContent) > 1) {
                let amount = parseInt(document.querySelector(".product-loop > div:last-of-type > div:nth-child(2) > div:nth-child(5) > div > div .amount").textContent)
                document.querySelector(".product-loop > div:last-of-type > div:nth-child(2) > div:nth-child(5) > div > div .amount").textContent = --amount
            }
        } else {
            let amount = parseInt(document.querySelector(".product-loop > div:last-of-type > div:nth-child(2) > div:nth-child(5) > div > div .amount").textContent)
            document.querySelector(".product-loop > div:last-of-type > div:nth-child(2) > div:nth-child(5) > div > div .amount").textContent = ++amount
        }
    })
})

if (location.pathname.slice(location.pathname.lastIndexOf('/')) === '/product1.html') {
    document.querySelector(".product-loop > div > div:nth-child(2) > div:nth-child(3) > div button").addEventListener('click', function () {
        this.childNodes[1].classList.toggle('active')
    })

    document.querySelector(".product-loop > div > div:nth-child(2) > div:nth-child(3) > button")
        .addEventListener('click', function () {
            let prodName = 'Tray Table'
            let selectedProd = document.querySelector(".product-loop > div > div:nth-child(2) > div:nth-child(2) > div > div.active img")
            let prodImgSrc = selectedProd.getAttribute('src')
            let prodId = selectedProd.getAttribute('id')
            let prodAmount = parseInt(document.querySelector(".product-loop > div > div:nth-child(2) > div:nth-child(3) > div > div .amount").textContent)
            let prodPrice = parseInt(prodAmount) * 19
            initailProducts(prodId, prodImgSrc, prodName, prodPrice, prodAmount)
        })
}

function adjustProductTotalInCanvas(prodId) {
    let total = JSON.parse(localStorage.getItem(prodId)).prodTotal
    document.getElementById(`canvPrice-${prodId}`).textContent = '$' + total
}

function adjustAmount(prodId, op) {
    if (op === 'decProd') {
        if (parseInt(document.getElementById(`canvAmount-${prodId}`).textContent) > 1) {
            let prodTotal = parseInt(document.getElementById(`canvAmount-${prodId}`).textContent)
            document.getElementById(`canvAmount-${prodId}`).textContent = --prodTotal
        }
    } else {
        let prodTotal = parseInt(document.getElementById(`canvAmount-${prodId}`).textContent)
        document.getElementById(`canvAmount-${prodId}`).textContent = ++prodTotal
    }

    // adjust product amount in local storage 
    adjustProductQty(prodId, op)

    // adjust product total in local storage
    adjustProductTotal(prodId)

    // adjust product total in canvas form
    adjustProductTotalInCanvas(prodId)

    // adjust cart icon amount tag
    adjustCartAmount(op)

}

function adjustProdctTotal(product_id, total_price) {
    let product = JSON.parse(localStorage.getItem(product_id))
    product.prodPrice = total_price
    localStorage.setItem(product_id, JSON.stringify(product))
}

function adjustTotal() {
    let prodTotal = 0
    document.querySelectorAll(".navigation-bar #cartOffcanvasRight .offcanvas-body .offcanvas-products .prod-price").forEach(function (elem, index, arr) {
        prodTotal += parseFloat(elem.textContent.slice(1))
    })

    document.querySelector(".navigation-bar #cartOffcanvasRight .offcanvas-body .subtotal h5").textContent = '$' + Math.round(prodTotal)
    document.querySelector(".navigation-bar #cartOffcanvasRight .offcanvas-body .total h4:nth-child(2)").textContent = '$' + Math.round(prodTotal)
}


if (document.querySelector('.mySwiper') !== null) {
    var swiper = new Swiper(".mySwiper", {
        cssMode: true,
        navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
        },
        pagination: {
            el: ".swiper-pagination",
        },
        mousewheel: true,
        keyboard: true,
    });
}

if (document.querySelector('.mySwiper1') !== null) {
    var swiper = new Swiper(".mySwiper1", {

        slidesPerView: 2,
        spaceBetween: 30,
        scrollbar: {
            el: ".swiper-scrollbar",
            hide: true,
        },

        breakpoints: {
            500: {
                slidesPerView: 2,
                spaceBetween: 30
            },
            600: {
                slidesPerView: 3,
                spaceBetween: 20
            },
            1024: {
                slidesPerView: 4,
                spaceBetween: 10
            }
        }
    });
}

if (document.querySelector('.firstSwipper') !== null) {
    var swiper = new Swiper(".firstSwipper", {
        navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
        },
    });
}
