const menu = document.getElementById("menu");

Array.from(document.getElementsByClassName("menu-item"))
  .forEach((item, index) => {
    item.onmouseover = () => {
      menu.dataset.activeIndex = index; // set the active index to the index of the item
    }
  });

const footer = document.getElementById("footer");

Array.from(document.getElementsByClassName("footer-item"))
  .forEach((item, index) => {
    item.onmouseover = () => {
      footer.dataset.activeIndex = index;
    }
  });