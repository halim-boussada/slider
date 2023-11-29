var gallery = [
  {
    url: "https://fabskill.s3.eu-west-3.amazonaws.com/avatars/9c40f5341269a0a772d1670eb52d76b1.png",
    text: "hahahaha",
  },
  {
    url: "https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885_1280.jpg",
    text: "hahahah 22",
  },
  {
    url: "https://img.freepik.com/free-photo/painting-mountain-lake-with-mountain-background_188544-9126.jpg?size=626&ext=jpg&ga=GA1.1.1803636316.1701043200&semt=sph",
    text: "hahah mmmmm",
  },
  {
    url: "https://fabskill.s3.eu-west-3.amazonaws.com/avatars/9c40f5341269a0a772d1670eb52d76b1.png",
    text: "hahahaha",
  },
  {
    url: "https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885_1280.jpg",
    text: "hahahah 22",
  },
  {
    url: "https://img.freepik.com/free-photo/painting-mountain-lake-with-mountain-background_188544-9126.jpg?size=626&ext=jpg&ga=GA1.1.1803636316.1701043200&semt=sph",
    text: "hahah mmmmm",
  },
];

function render() {
  var dashs = ``;
  for (var i = 0; i < gallery.length; i++) {
    dashs += `<div class="stories-dash"></div>`;
  }
  var wrapper = document.getElementById("wrapper");
  wrapper.innerHTML = `
    <div class="carousel" id="carousel"></div>
    <div class="dashs" id="dashs">
       ${dashs}
    </div>`;

  var carousel = document.getElementById("carousel");
  for (var i = 0; i < gallery.length; i++) {
    carousel.innerHTML += `<img
        src="${gallery[i].url}"
        alt="img"
        draggable="false"   
      />`;
  }
}

render();

const carousel = document.querySelector(".carousel"),
  firstImg = carousel.querySelectorAll("img")[0],
  arrowIcons = document.querySelectorAll(".wrapper i");

let isDragStart = false,
  isDragging = false,
  prevPageX,
  prevScrollLeft,
  positionDiff;

const showHideIcons = () => {
  // showing and hiding prev/next icon according to carousel scroll left value
  let scrollWidth = carousel.scrollWidth - carousel.clientWidth; // getting max scrollable width
  arrowIcons[0].style.display = carousel.scrollLeft == 0 ? "none" : "block";
  arrowIcons[1].style.display =
    carousel.scrollLeft == scrollWidth ? "none" : "block";
};

arrowIcons.forEach((icon) => {
  icon.addEventListener("click", () => {
    let firstImgWidth = firstImg.clientWidth + 14; // getting first img width & adding 14 margin value
    // if clicked icon is left, reduce width value from the carousel scroll left else add to it
    carousel.scrollLeft += icon.id == "left" ? -firstImgWidth : firstImgWidth;
    setTimeout(() => showHideIcons(), 60); // calling showHideIcons after 60ms
  });
});

const autoSlide = () => {
  // if there is no image left to scroll then return from here
  if (
    carousel.scrollLeft - (carousel.scrollWidth - carousel.clientWidth) > -1 ||
    carousel.scrollLeft <= 0
  )
    return;

  positionDiff = Math.abs(positionDiff); // making positionDiff value to positive
  let firstImgWidth = firstImg.clientWidth + 14;
  // getting difference value that needs to add or reduce from carousel left to take middle img center
  let valDifference = firstImgWidth - positionDiff;

  if (carousel.scrollLeft > prevScrollLeft) {
    // if user is scrolling to the right
    return (carousel.scrollLeft +=
      positionDiff > firstImgWidth / 3 ? valDifference : -positionDiff);
  }
  // if user is scrolling to the left
  carousel.scrollLeft -=
    positionDiff > firstImgWidth / 3 ? valDifference : -positionDiff;
};

const dragStart = (e) => {
  console.log(e);
  // updatating global variables value on mouse down event
  isDragStart = true;
  prevPageX = e.pageX || e.touches[0].pageX;
  prevScrollLeft = carousel.scrollLeft;
};

const dragging = (e) => {
  // scrolling images/carousel to left according to mouse pointer
  if (!isDragStart) return;
  e.preventDefault();
  isDragging = true;
  carousel.classList.add("dragging");
  positionDiff = (e.pageX || e.touches[0].pageX) - prevPageX;
  carousel.scrollLeft = prevScrollLeft - positionDiff;
  showHideIcons();
};

const dragStop = () => {
  isDragStart = false;
  carousel.classList.remove("dragging");

  if (!isDragging) return;
  isDragging = false;
  autoSlide();
};

carousel.addEventListener("mousedown", dragStart);
carousel.addEventListener("touchstart", dragStart);

document.addEventListener("mousemove", dragging);
carousel.addEventListener("touchmove", dragging);

document.addEventListener("mouseup", dragStop);
carousel.addEventListener("touchend", dragStop);
