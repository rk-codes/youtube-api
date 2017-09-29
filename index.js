const YOUTUBE_SEARCH_URL = 'https://www.googleapis.com/youtube/v3/search';

function getDataFromApi(searchTerm, callback) {
  const params = {
    part: 'snippet',
    key: 'AIzaSyArySOG4MTzHdufypzKbBUrdesEvEdljYs',
    q: searchTerm,
    maxResults: 10
  }
  $.getJSON(YOUTUBE_SEARCH_URL, params, callback);
}

function renderResult(result) {
   let imgUrl = result.snippet.thumbnails.default.url;
   let videoId = result.id.videoId;
   let videoDescription = result.snippet.description;
   let title = result.snippet.title;
   let chId = result.snippet.channelId;
   console.log("ID:" + result.id.videoId);
   return `
   <div class = "result-box">
     <a href="https://www.youtube.com/watch?v=${videoId}"><img src = "${imgUrl}" class="img-thumbnail"></a>
     <div class = "info">
        <span class="video-title">"${title}"</span>
        <p>"${videoDescription}"</p>
        <a href="https://www.youtube.com/channel/${chId}">More from this channel</a>
     </div>
     
    </div`
  
}

function displayYouTubeSearchData(data) {
  console.log("Length:" +data.items.length);
  console.log(data.items);
   console.log(data.items[0].snippet.thumbnails.default);
   const results = data.items.map((item,index) => renderResult(item));
   $('.js-search-results').html(results);
}

function watchSubmit() {
  $('.js-search-form').submit(event => {
    event.preventDefault();
    const queryTarget = $(event.currentTarget).find('.js-query');
    const query = queryTarget.val();
    // clear out the input
    queryTarget.val("");
    getDataFromApi(query, displayYouTubeSearchData);
  });
}

$(watchSubmit);
