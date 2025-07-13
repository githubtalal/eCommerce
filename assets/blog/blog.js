window.onload = function () {
    showProductsInMode(localStorage.getItem('showMode'))
}



document.querySelectorAll(".content > div > div:first-of-type a").forEach(function (elem, index, arr) {
    elem.addEventListener('click', function () {
        document.querySelector(".content > div > div:first-of-type a.active").classList.remove('active')
        this.classList.add('active')
    })
})

document.querySelectorAll(".content .show-mode").forEach(function (elem, index, arr) {
    elem.addEventListener('click', function () {
        document.querySelector(".content .show-mode.active").classList.remove('active')
        this.classList.add('active')
        localStorage.setItem('showMode', this.id)
        // show product in current mode
        showProductsInMode(this.id)
    })
})


function showProductsInMode(modeId) {
    switch (modeId) {
        case '2-line':
            document.querySelectorAll('.content .row > div').forEach(function (elem, index, arr) {
                elem.className = 'col-lg-6'
            })
            document.querySelector(".content .row").classList.remove('horMode')
            break
        case '3-line':
            document.querySelectorAll('.content .row > div').forEach(function (elem, index, arr) {
                elem.className = 'col-lg-4'
            })
            document.querySelector(".content .row").classList.remove('horMode')
            break
        case 'vertical':
            document.querySelectorAll('.content .row > div').forEach(function (elem, index, arr) {
                elem.className = 'col-lg-12'
            })
            document.querySelector(".content .row").classList.remove('horMode')
            break
        default:
            document.querySelectorAll('.content .row > div').forEach(function (elem, index, arr) {
                elem.className = 'col-lg-12'
            })

            document.querySelector(".content .row").classList.add('horMode')
            break
    }
}