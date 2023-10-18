const left = document.querySelector("#left-side")
const header = document.querySelector("header")

const handleSideOnMove = e => {
    const percentage = e.clientX / window.innerWidth * 100; // get the percentage of the mouse position relative to the window width
    
    left.style.width = `${percentage}%` // set the width of the left side to the percentage
}

header.addEventListener("mousemove", handleSideOnMove)
header.addEventListener("touchmove", handleSideOnMove)


function rotateElement(event, element, middlex, middley) {

    const x = event.clientX;
    const y = event.clientY;
    // get the mouse position
    

    const middleX = middlex;
    const middleY = middley;
    // get the middle of the element

    const offsetX = ((x - middleX) / middleX) * 35;
    const offsetY = ((y - middleY) / middleY) * 35;
    // get the offset of the mouse position relative to the middle of the element
    

    element.style.setProperty("--rotateX",  offsetX + "deg");
    element.style.setProperty("--rotateY", -1 * offsetY + "deg");
}

const footer = document.querySelector(`footer`)

const footerObserver = new IntersectionObserver((entry) => {
    if (entry[0].isIntersecting) { // if the footer is intersecting the viewport
        entry[0].target.classList.add(`show-footer`) // add the show-footer class
    }
}, {threshold: 0.5}) // when 50% of the footer is visible

footerObserver.observe(footer)




