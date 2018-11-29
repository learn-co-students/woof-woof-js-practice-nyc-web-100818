document.addEventListener("DOMContentLoaded", function() {
  let controller = new DogController();
  const dogContainer = document.getElementById("dog-summary-container");

  const goodDogFilter = document.getElementById("good-dog-filter");
  bool = false;

  function renderView() {
    controller.loadDogsFromApi()
      .then( content => {
        console.log(dogContainer);
        dogContainer.innerHTML = content;
      })
  }

  function renderFilteredView() {
    dogContainer.innerHTML = ""
    dogContainer.innerHTML += controller.filterDogs();
  }

  let view = false;
  function Toggle() {
    view = !view;
  }

  goodDogFilter.addEventListener('click', event => {
    renderFilteredView();
    Toggle(view);

    if(!view) {
      renderFilteredView();
    }

    else {
      renderView()
    }
  })

  renderView()
});