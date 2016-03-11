var styleSelector = document.querySelector('select');

styleSelector.addEventListener('change', function () {
  document.body.className = styleSelector.value;
  //a dokumentum bodijanak a class neve legyen ez...
})
