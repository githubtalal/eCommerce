
document.querySelectorAll(".products .show-mode").forEach(function (elem, index, arr) {
    elem.addEventListener('click', function () {
        document.querySelector(".products .show-mode.active").classList.remove('active')
        this.classList.add('active')
        localStorage.setItem('showMode', this.id)
        // show product in current mode
        showProductsInMode(this.id)
    })
})


document.querySelectorAll(".products .filter-list .links a").forEach(function (elem, index, arr) {
    elem.addEventListener('click', function () {
        document.querySelector(".products .filter-list .links a.active").classList.remove('active')
        this.classList.add('active')
    })

})

function showProductsInMode(modeId) {
    switch (modeId) {
        case '2-line':
            document.querySelectorAll('.products .row > div').forEach(function (elem, index, arr) {
                elem.className = 'col-lg-6'
            })
            document.querySelector(".products .row").classList.remove('horMode')
            break
        case '3-line':
            document.querySelectorAll('.products .row > div').forEach(function (elem, index, arr) {
                elem.className = 'col-lg-4'
            })
            document.querySelector(".products .row").classList.remove('horMode')
            break
        case 'vertical':
            document.querySelectorAll('.products .row > div').forEach(function (elem, index, arr) {
                elem.className = 'col-lg-12'
            })
            document.querySelector(".products .row").classList.remove('horMode')
            break
        default:
            document.querySelectorAll('.products .row > div').forEach(function (elem, index, arr) {
                elem.className = 'col-lg-12'
            })

            document.querySelector(".products .row").classList.add('horMode')
            break
    }
}

