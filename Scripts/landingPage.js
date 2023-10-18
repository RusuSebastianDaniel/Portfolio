const landinPageCoords = document.querySelector('.landing-photo-page-card').getBoundingClientRect();
const landingPageMiddleX = landinPageCoords.x + landinPageCoords.width / 2;
const landingPageMiddleY = landinPageCoords.y + landinPageCoords.height / 2;
const landingPage = document.querySelector('.landing-photo-page-card');

//animation for the landing page

landingPage.addEventListener("mousemove", (e) => {
    e.stopImmediatePropagation()
    rotateElement(e, landingPage, landingPageMiddleX ,landingPageMiddleY);
});