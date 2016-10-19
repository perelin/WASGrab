var spotifyTrackPattern = /open.spotify.com\/track\/(.*)/g;

var spotifyTrackIDs = [];

function getPageTitle()
{
  return window.document.title;
}

function findAllMessages(doc)
{
  return doc.querySelectorAll('div.msg');
}

//var elements = document.querySelectorAll(selector);

function getMessageText(el, i) {
  //console.log(el.querySelectorAll('span.selectable-text'));
  textNode = el.querySelector('span.selectable-text');
  if (textNode != null) {
    spotifyTrackIdMatch = spotifyTrackPattern.exec(textNode.textContent)
    if(spotifyTrackIdMatch) {

      spotifyTrackIDs.push(spotifyTrackIdMatch[1])

      //console.log(i + " " + spotifyTrackIdMatch[1]);
      //getSpotifyTrackInfo(spotifyTrackIdMatch[1]);
    }
  }
}

function getSpotifyTrackInfo(spotifyTrackId)
{

  var request = new XMLHttpRequest();
  request.open('GET', 'https://api.spotify.com/v1/tracks/'+spotifyTrackId, true);

  request.onload = function() {
    if (this.status >= 200 && this.status < 400) {
      // Success!
      console.log("Success!")
      var data = JSON.parse(this.response);
      console.log(data)
    } else {
      // We reached our target server, but it returned an error
      console.log("Spotify error: We reached our target server, but it returned an error")
    }
  };

  request.onerror = function() {
    console.log("Spotify error: There was a connection error of some sort")
    // There was a connection error of some sort
  };

  request.send();

}

getPageTitle();
var messages = findAllMessages();
Array.prototype.forEach.call(messages, getMessageText);
console.log(spotifyTrackIDs);

---

function scrapeWhatsApp(event)
{
  alert("yeah!");
  console.log("yeah");
  console.log(event.currentTarget);
  if( event.currentTarget.onlyOnce )
  {
      return;
  }
  event.currentTarget.onlyOnce = true;

  var doc = event.currentTarget.document;
  console.log(doc);

  event.currentTarget.close();

  return doc.title;
}

var waTab = window.open("https://web.whatsapp.com/");
waTab.addEventListener( "load", scrapeWhatsApp, true );
