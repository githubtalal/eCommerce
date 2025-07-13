let newX = 0, newY = 0, startX = 0, startY = 0

let loc = document.getElementById('location');

loc.addEventListener('mousedown', mouseDown)

function mouseDown(e) {
    // where the mouse currently is
    startX = e.clientX
    startY = e.clientY

    document.addEventListener('mousemove', mouseMove)
    document.addEventListener('mouseup', mouseUp)
}

function mouseMove(e) {
    newX = startX - e.clientX
    newY = startY - e.clientY

    startX = e.clientX
    startY = e.clientY

    loc.style.top = (loc.offsetTop - newY) + 'px'
    loc.style.left = (loc.offsetLeft - newX) + 'px'
}

function mouseUp(e) {
    document.removeEventListener('mousemove', mouseMove)
}