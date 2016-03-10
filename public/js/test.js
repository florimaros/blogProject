var styleSelector = document.querySelector('.style-selector');

styleSelector.addEventListener('change', function () {
  document.body.className = ''; // leszedi az eddigi classokat
  // document.body.className = styleSelector.value;
  document.body.classList.add(styleSelector.value); // rarakom az aktualis classt
})
