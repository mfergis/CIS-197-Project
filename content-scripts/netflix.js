// Add bubble to the top of the page.
var popUpDOM = document.createElement('div');
popUpDOM.setAttribute('class', 'popUp');
document.body.appendChild(popUpDOM);

// OMDb API 
var baseUrl = 'https://www.omdbapi.com/?t=';

window.onload = function () {

	$('.mainView').on('mouseenter', '.title-card-container', function () {
		var top = $(this).offset().top;
		var left = $(this).offset().left;
		var name = $(this).find("div[id^='title-card-'],div[id*=' title-card-']").attr('aria-label');
		renderPopUp(top, left, name);
	});

};

// Move that pop up to the appropriate location.
function renderPopUp(positionX, positionY, name) {

	var x = positionX + 10;
	var y = positionY + 10;
	var jquery = '<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.5.1/jquery.min.js"></script>';
	var title = '<b><center><font size="5">' + name + '</font></center></b>';
	var ratingIcon = '<img src="https://cdn0.iconfinder.com/data/icons/small-n-flat/24/678064-star-128.png" ' 
		+ 'width="25" height="25" alt="image" style="vertical-align:middle">';
	var awardsIcon = '<img src="https://cdn1.iconfinder.com/data/icons/hawcons/32/699900-icon-33-award-128.png" ' 
		+ 'width="25" height="25" alt="image" style="vertical-align:middle">';
	var votesIcon = '<img src="https://pixabay.com/static/uploads/photo/2015/12/09/22/26/people-1085695_960_720.png" ' 
		+ 'width="25" height="25" alt="image" style="vertical-align:middle">';
	var linkIcon = '<img src="http://icon-park.com/imagefiles/link_icon_white.png" ' 
		+ 'width="25" height="25" alt="image" style="vertical-align:middle">';

	var rating = 'N/A';
	var votes = 'None';
	var awards = 'None';
	var more = '';


	// Send off the query
	$.ajax({
		url: baseUrl + encodeURI(name) + '&y=&plot=short&r=json',
		success: function searchCallback(data) {
			rating = data.imdbRating;
			votes = data.imdbVotes;
			awards = data.Awards;
			more = 'title/' + data.imdbID;

			if (typeof rating === 'undefined') {
				rating = 'N/A';
				votes = 'N/A';
				awards = 'N/A';
				more = '';
			} else if (awards === 'N/A') {
				awards = 'None';
			}

			var link = '<a href=https://www.imdb.com/' + more + '>Click here for more info</a>';

			popUpDOM.innerHTML = jquery + title + '<p>' + ratingIcon + '	Rating: <b><font size="5">' + rating + '</font></b></p>' 
				+ '<p>' + votesIcon + '	Votes: <b>' + votes + '</b></p>' 
				+ '<p>' + awardsIcon + '	Awards: <b>' + awards + '</b></p>' 
				+ '<p>' + linkIcon + '	<b><u>' + link + '</u></b></p>';
			popUpDOM.style.top = x + 'px';
			popUpDOM.style.left = y + 'px';
			popUpDOM.style.visibility = 'visible';

		}
	});
}





