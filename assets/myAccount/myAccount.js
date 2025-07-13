function fillTheWishlistTable() {
    let wishlistProdIds = JSON.parse(localStorage.getItem('favouriteProductIds')) || []

    if (wishlistProdIds !== []) {
        let wishlistProducts = ''
        wishlistProdIds.forEach(function (elem, index, arr) {
            let favouritePro = JSON.parse(localStorage.getItem(`favProd-${elem}`))
            wishlistProducts += `<tr id="favProd-${elem}">
                                        <td>
                                            <div class="d-flex align-items-center" style="gap: 10px;">
                                                <p class="close-icon" id="close-${elem}">
                                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path fill-rule="evenodd" clip-rule="evenodd" d="M5.29289 5.29289C5.68342 4.90237 6.31658 4.90237 6.70711 5.29289L12 10.5858L17.2929 5.29289C17.6834 4.90237 18.3166 4.90237 18.7071 5.29289C19.0976 5.68342 19.0976 6.31658 18.7071 6.70711L13.4142 12L18.7071 17.2929C19.0976 17.6834 19.0976 18.3166 18.7071 18.7071C18.3166 19.0976 17.6834 19.0976 17.2929 18.7071L12 13.4142L6.70711 18.7071C6.31658 19.0976 5.68342 19.0976 5.29289 18.7071C4.90237 18.3166 4.90237 17.6834 5.29289 17.2929L10.5858 12L5.29289 6.70711C4.90237 6.31658 4.90237 5.68342 5.29289 5.29289Z" fill="#6C7275"/>
                                                    </svg>
                                                </p>
                                                <img src="${favouritePro.prodImgSrc}" alt="" id="img-${elem}"/>
                                                <div data-price="$${favouritePro.prodPrice}">
                                                    <h6 id="name-${elem}">${favouritePro.prodName}</h6>
                                                    <p>Color: black</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td id="price-${elem}">$${favouritePro.prodPrice}</td>
                                        <td><button id="addFavProd-${elem}">Add to cart</button></td>
                                      </tr>`
        })

        document.querySelector('.wishlist table tbody').innerHTML = wishlistProducts
    }
}

function removeFavouriteProductIdFromLocalStorage(product_id) {
    let favProductIds = JSON.parse(localStorage.getItem('favouriteProductIds'))
    favProductIds.splice(favProductIds.indexOf(product_id), 1)
    localStorage.setItem('favouriteProductIds', JSON.stringify(favProductIds))
}

function removeFavouriteProductFromLocalStorage(product_id) {
    localStorage.removeItem(`favProd-${product_id}`)
}

function removeFavouriteProductFromWishlistTable(product_id) {
    document.getElementById(`favProd-${product_id}`).remove()
}

function handleRemovingProductsFromFavouriteList() {
    document.querySelectorAll('.wishlist table tbody .close-icon').forEach(function (elem, index, arr) {
        elem.addEventListener('click', function () {
            // remove favourite product id from local storage
            removeFavouriteProductIdFromLocalStorage(this.id.split('-')[1])

            // remove favourite product from local storage
            removeFavouriteProductFromLocalStorage(this.id.split('-')[1])

            // remove favourite product from wishlist table
            removeFavouriteProductFromWishlistTable(this.id.split('-')[1])
        })
    })
}

function handleAddingFavouriteProductsToCart() {
    document.querySelectorAll('.wishlist table tbody button').forEach(function (elem, index, arr) {
        elem.addEventListener('click', function () {
            // add product id to added product ids
            if (!productExist(this.id.split('-')[1])) {
                prepareProductDetails(this.id.split('-')[1])
                // notify local storage that we have new product in cart
                pushNewProductId(this.id.split('-')[1])
            } else {
                adjustProductQty(this.id.split('-')[1], 'incProd')
                adjustProductTotal(this.id.split('-')[1])
            }
        })
    })
}

document.querySelectorAll('.account-menu > div:last-of-type span').forEach(function (elem, index, arr) {
    elem.addEventListener('click', function () {
        // show the target account section
        document.querySelector('.account-details.active').classList.remove('active')
        document.querySelector(`.${elem.getAttribute('data-target')}`).classList.add('active')

        if (elem.getAttribute('data-target') === 'wishlist') {
            // fill the wishlist 
            fillTheWishlistTable()

            // handle removing products from favourite list
            handleRemovingProductsFromFavouriteList()

            // handle adding favourite products to cart
            handleAddingFavouriteProductsToCart()
        }

        // activate the cuurent tab
        document.querySelector('.account-menu > div:last-of-type span.active').classList.remove('active')
        this.classList.add('active')
    })
})


document.querySelector('.account-menu select').addEventListener('change', function () {
    document.querySelector('.account-details.active').classList.remove('active')

    document.querySelector(`.${this.value}`).classList.add('active')

    if (this.value === 'wishlist') {
        // fill the wishlist 
        fillTheWishlistTable()

        // handle removing products from favourite list
        handleRemovingProductsFromFavouriteList()

        // handle adding favourite products to cart
        handleAddingFavouriteProductsToCart()
    }
})