function searchCountries() {
  $("#search").on("click", function(e) {
    e.preventDefault();
    let url = "https://restcountries.eu/rest/v2/name/";
    let query = $("#query").val();

    if (!query) {
      alert("Add a name to search the country.");
      return false;
    }
    url += query;

    $.ajax({
      url: url,
      method: "GET",
      dataType: "json",
      success: function(responseJSON) {
        console.log(responseJSON);
        displayResults(responseJSON);
      },
      error: function(err) {
        $(".js-search-results").empty();
        $(".js-search-results").append(`<h2> País no existente</h2>`);
        throw new Error(err);
      }
    });
  });
}
function displayResults(responseJSON) {
  console.log(responseJSON);
  $(".js-search-results").empty();
  $(".js-search-results").append(`
    <h1> Name: ${responseJSON[0].name}</h1>
    <p> Capital: ${responseJSON[0].capital} </p>
    <img src="${responseJSON[0].flag}"></img>
    <p>Population: ${responseJSON[0].population}</p>
    <p> Region: ${responseJSON[0].region} </p>
    `);
  $(".js-search-results").append("<h2>Timezones</h2>");

  for (var i = 0; i < responseJSON[0].timezones.length; ++i) {
    $(".js-search-results").append(` 
    <p> ${responseJSON[0].timezones[i]}</p>
`);
  }
  $(".js-search-results").append("<h2>Borders</h2>");

  for (var i = 0; i < responseJSON[0].borders.length; ++i) {
    $(".js-search-results").append(` 
    <p> ${responseJSON[0].borders[i]}</p>
`);
  }
}

function init() {
  searchCountries();
}

init();
