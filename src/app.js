/**
 * Welcome to Pebble.js!
 *
 * This is where you write your app.
 */

var UI = require('ui');
var ajax = require('ajax');
//var Vector2 = require('vector2');

var weFeelApiEndpoint = "http://wefeel.csiro.au/api/emotions/primary/totals";

var emotionData = ajax({
  url: weFeelApiEndpoint,
  type: 'json',
},
launchMainPage,
function(error) {
  console.log(error);
  // ignore
});


function launchMainPage(data) {
  var negatives = ["sadness", "anger", "fear"];
  var total = 0;
  var negativecount = 0;
  for (var i in data) {
    if (i == "*") continue;
    if (negatives.indexOf(i) >= 0) {
      negativecount += data[i];
    }
    total += data[i];
  }
  var awfulThreshold = 0.5;
  var awfulnessRatio = negativecount / total;
  var tooawful = awfulnessRatio >= awfulThreshold;
  var main = new UI.Card({
    title: 'Pebble.js',
    icon: 'images/menu_icon.png',
    subtitle: tooawful? "Don't bother": "Fine, get up",
    body: "There were " + negativecount + " negative tweets, and " + (total - negativecount) + " positive tweets.",
  });
  main.show();
}
/*
main.on('click', 'up', function(e) {
  var menu = new UI.Menu({
    sections: [{
      items: [{
        title: 'Pebble.js',
        icon: 'images/menu_icon.png',
        subtitle: 'Can do Menus'
      }, {
        title: 'Second Item',
        subtitle: 'Subtitle Text'
      }]
    }]
  });
  menu.on('select', function(e) {
    console.log('Selected item #' + e.itemIndex + ' of section #' + e.sectionIndex);
    console.log('The item is titled "' + e.item.title + '"');
  });
  menu.show();
});

main.on('click', 'select', function(e) {
  var wind = new UI.Window();
  var textfield = new UI.Text({
    position: new Vector2(0, 50),
    size: new Vector2(144, 30),
    font: 'gothic-24-bold',
    text: 'Text Anywhere!',
    textAlign: 'center'
  });
  wind.add(textfield);
  wind.show();
});

main.on('click', 'down', function(e) {
  var card = new UI.Card();
  card.title('A Card');
  card.subtitle('Is a Window');
  card.body('The simplest window type in Pebble.js.');
  card.show();
});
*/
