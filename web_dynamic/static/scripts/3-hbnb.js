// const $ = require('jquery');

const amenities = {};
$(document).ready(function () {
	$.get('http://localhost:5001/api/v1/status/').then((data) => {
		if (data.status === 'OK') {
			$('#api_status').addClass('available');
		} else {
			$('#api_status').removeClass('available');
		}
	});
	$.ajax({
		url: 'http://localhost:5001/api/v1/places_search/',
		type: 'POST',
		contentType: 'application/json',
		data: JSON.stringify({}),
		success: (data) => {
			data.forEach(place => {
				$('section.places').append(
					`<article>
					<div class="title_box">
						<h2>${place.name}</h2>
						<div class="price_by_night">$${place.price_by_night}</div>
					</div>
					<div class="information">
						<div class="max_guest">${place.max_guest} Guest${place.max_guest > 1 ? 's' : ''}</div>
						<div class="number_rooms">${place.number_rooms} Bedroom${place.number_rooms > 1 ? 's' : ''}</div>
						<div class="number_bathrooms">${place.number_bathrooms} Bathroom${place.number_bathrooms > 1 ? 's' : ''}</div>
					</div>
					<div class="description">
						${place.description}
					</div>
				</article>`
				);
			});
		}
	}
	);

	$('input[type="checkbox"]').change(function () {
		if ($(this).is(':checked')) {
			amenities[$(this).attr('data-id')] = $(this).attr('data-name');
		} else {
			delete amenities[$(this).attr('data-id')];
		}
		$('.amenities h4').text(Object.values(amenities).join(', '));
	});
});
