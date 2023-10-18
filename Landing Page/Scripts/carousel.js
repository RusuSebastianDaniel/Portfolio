const buttons = document.querySelectorAll("[data-carousel-button]")

buttons.forEach(button => {
  button.addEventListener("click", () => {
    const offset = button.dataset.carouselButton === "next" ? 1 : -1 // go to next or previous slide
    const slides = button // find the slides container
      .closest("[data-carousel]") // go up to the carousel container
      .querySelector("[data-slides]") // find the slides container

    const activeSlide = slides.querySelector("[data-active]") // find the active slide
    let newIndex = [...slides.children].indexOf(activeSlide) + offset // find the new slide index
    if (newIndex < 0) newIndex = slides.children.length - 1 // if the new index is less than 0, go to the last slide
    if (newIndex >= slides.children.length) newIndex = 0 // if the new index is greater than the number of slides, go to the first slide

    slides.children[newIndex].dataset.active = true // set the new slide to active
    delete activeSlide.dataset.active
  })
})


