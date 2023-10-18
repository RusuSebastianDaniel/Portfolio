

let activeIndex = 0;

const slides = document.getElementsByTagName("article");

const handleLeftClick = () => {
    const nextIndex = activeIndex - 1 >= 0 ? activeIndex - 1 : slides.length - 1; // go to next or previous slide

    const currentSlide = document.querySelector(`[data-index="${activeIndex}"]`), // find the slides container
        nextSlide = document.querySelector(`[data-index="${nextIndex}"]`); // find the active slide

    currentSlide.dataset.status = "after"; 

    nextSlide.dataset.status = "becoming-active-from-before"; 

    //timeout for animation
    setTimeout(() => { 
        nextSlide.dataset.status = "active";
        activeIndex = nextIndex;
    });
};

const handleRightClick = () => {
    //look at the left click function for comments

    const nextIndex = activeIndex + 1 <= slides.length - 1 ? activeIndex + 1 : 0;

    const currentSlide = document.querySelector(`[data-index="${activeIndex}"]`),
        nextSlide = document.querySelector(`[data-index="${nextIndex}"]`);

    currentSlide.dataset.status = "before";

    nextSlide.dataset.status = "becoming-active-from-after";

    setTimeout(() => {
        nextSlide.dataset.status = "active";
        activeIndex = nextIndex;
    });
};


