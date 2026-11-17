const catImage = document.getElementById("catImage");
const catGif = document.getElementById("catGif");

const blurIndexinput = document.getElementById("blurIndex");
const getCatBtn = document.getElementById("getCatBtn");
const filterSelect = document.getElementById("filterSelect");
const status = document.getElementById("status");

let currentFilter = "none";

// Get random cat photo and GIF
function getCatPhoto() {
  status.textContent = "Loading cats...";
  getCatBtn.disabled = true;

  const photo = new Image();
  const gif = new Image();

  let photoLoaded = false;
  let gifLoaded = false;

  function checkLoaded() {
    if (photoLoaded && gifLoaded) {
      catImage.src = photo.src;
      catGif.src = gif.src;

      applyFilter();

      status.textContent = "";
      getCatBtn.disabled = false;
    }
  }

  photo.onload = function () {
    photoLoaded = true;
    checkLoaded();
  };

  gif.onload = function () {
    gifLoaded = true;
    checkLoaded();
  };

  photo.onerror = function () {
    status.textContent = "Could not load cat photo!";
    getCatBtn.disabled = false;
  };

  gif.onerror = function () {
    status.textContent = "Could not load cat GIF!";
    getCatBtn.disabled = false;
  };

  const time = Date.now();

  photo.src = `https://cataas.com/cat?t=${time}`;

  gif.src = `https://cataas.com/cat/gif?t=${time}`;
}

// Apply filters to both images
function applyFilter() {
  let blur = blurIndexinput.value;

  let filter = "none";

  switch (currentFilter) {
    case "none":
      filter = "none";
      break;

    case "mono":
      filter = "grayscale(100%)";
      break;

    case "negative":
      filter = "invert(100%)";
      break;

    case "blur":
      filter = `blur(${blur}px)`;
      break;
  }

  catImage.style.filter = filter;
  catGif.style.filter = filter;
}

filterSelect.addEventListener("change", function () {
  currentFilter = filterSelect.value;

  applyFilter();
});

blurIndexinput.addEventListener("input", function () {
  applyFilter();
});

getCatBtn.addEventListener("click", function () {
  getCatPhoto();
});

getCatPhoto();
