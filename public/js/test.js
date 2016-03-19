var styleSelector = document.querySelector('.style-selector');

styleSelector.addEventListener('change', function () {
  document.body.className = '';
  document.body.classList.add(styleSelector.value); 
})
