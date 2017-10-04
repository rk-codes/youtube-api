const YOUTUBE_SEARCH_URL = 'https://www.googleapis.com/youtube/v3/search';
let nextPage = 0;
let prevPage = 0;
let query = "";
let pageCount = 0;

function getDataFromApi(searchTerm, callback, page) {
  console.log("getDataFromApi () "+ page);
    const params = {
    part: 'snippet',
    key: 'AIzaSyArySOG4MTzHdufypzKbBUrdesEvEdljYs',
    q: searchTerm,
    maxResults: 10,
    pageToken: page
  }
  $.getJSON(YOUTUBE_SEARCH_URL, params, callback);
}

function renderResult(result) {
   let imgUrl = result.snippet.thumbnails.medium.url;
   let videoId = result.id.videoId;
   let videoDescription = result.snippet.description;
   let title = result.snippet.title;
   let chId = result.snippet.channelId;
  
   return `
   
     <li><a href="https://www.youtube.com/watch?v=${videoId}"><img src = "${imgUrl}" class="img-thumbnail"
      alt="thumbnail of video"></a>
     <div class = "info">
        <span class="video-title">${title}</span>
        <p>${videoDescription}</p>
        <a href="https://www.youtube.com/channel/${chId}/videos">More from this channel</a>
     </div>
     </li>
    `
  
}

function displayYouTubeSearchData(data) {
   const results = data.items.map((item,index) => renderResult(item));
   nextPage = data.nextPageToken;
   prevPage = data.prevPageToken;
   $('.results').prop('hidden', false);
   $('h2').text(` ${data.pageInfo.totalResults} Results for "${query}"`);
   $('.js-search-results').html(results);
   $('.next-button').show();
   if(data.prevPageToken){
      $('.prev-button').show();
   }
   else{
     $('.prev-button').hide();
   }
}

function handleNextClick(){
  $('.next-button').click(function(event){
    getDataFromApi(query, displayYouTubeSearchData, nextPage);
  });
}
$(handleNextClick());

function handlePrevClick(){
  $('.prev-button').click(function(event){
     getDataFromApi(query, displayYouTubeSearchData, prevPage);
  });
}
$(handlePrevClick());

function watchSubmit() {
  $('.js-search-form').submit(event => {
    event.preventDefault();
    const queryTarget = $(event.currentTarget).find('.js-query');
    query = queryTarget.val();
    // clear out the input
    queryTarget.val("");
    getDataFromApi(query, displayYouTubeSearchData);
  });
}

$(watchSubmit);

function init(){
  $('.next-button').hide();
  $('.prev-button').hide();
}
$(init());
