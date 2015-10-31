
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

    // load wikipedia data
    var wikiUrl = 'http://en.wikipedia.org/w/api.php?action=opensearch&search=' + city + '&format=json&callback=wikiCallback';
    var wikiRequestTimeout = setTimeout(function(){
      $wikiElem.text("failed to get wikipedia resources");
    }, 8000);
    // Using jQuery
$.ajax( {
    url: wikiUrl,
    dataType: 'jsonp',
    jsonp: 'callback',
    success: function(response) {
       var wikiArticles = response[1];

       for (var i = 0; i<wikiArticles.length; i++) {
         wikiArticle = wikiArticles[i];
         var url = 'http://en.wikipedia.org/wiki/' + wikiArticle;
         $wikiElem.append('<li><a href=' + url + '">' + wikiArticle + '</a></li>' );

       }

       clearTimeout(wikiRequestTimeout);
    }
} );



    return false;
}



$('#form-container').submit(loadData);
