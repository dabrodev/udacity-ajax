
function loadData() {

    var $body = $('body');
    var $wikiElem = $('#wikipedia-links');
    var $nytHeaderElem = $('#nytimes-header');
    var $nytElem = $('#nytimes-articles');
    var $greeting = $('#greeting');

    // clear out old data before new request
    $wikiElem.text("");
    $nytElem.text("");

    // load streetview
    var street = $('#street').val();
    var city = $('#city').val();
    var cityTest = 'Berlin';
    var address = street + ", " + city;

    $greeting.text("So, you want to live at " + address + "?");

    var imgUrl = 'https://maps.googleapis.com/maps/api/streetview?size=600x300&location=' + address + '';
    $body.append('<img class="bgimg" src="' + imgUrl + '">');

    // load new york times articles
    var nytApiKey = 'db2475408dca56ab017625b732dc5855:11:73345523';
    var nytUrl = 'http://api.nytimes.com/svc/search/v2/articlesearch.json?q=' + city + '&sort=newest&api-key=' + nytApiKey + '';

    $.getJSON( nytUrl, function( data ) {

      $nytHeaderElem.text =('New York Times artciles about ' + city);

      articles = data.response.docs;
      for (var i = 0; i < articles.length; i++) {
        var article = articles[i];
        $nytElem.append('<li class="article">' +
          '<a href="' + article.web_url + '">' + article.headline.main + '</a>' +
          '<p>' + article.snippet + '</p>' +
          '</li>');
      }
    }).error(function(e){
        $nytHeaderElem.text('Failed to load New York Times Articles');
    });

    return false;
}



$('#form-container').submit(loadData);
