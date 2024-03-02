// const $ = require('jquery');

const amenities = {};
const cities = {};
const states = {};
$(document).ready(function () {
	$.get('http://localhost:5001/api/v1/status/').then((data) => {
		if (data.status === 'OK') {
			$('#api_status').addClass('available');
		} else {
			$('#api_status').removeClass('available');
		}
	});
	$('button').on('click', () => {
		let body;
		if (Object.keys(amenities).length === 0
			&& Object.keys(cities).length === 0
			&& Object.keys(states).length === 0) {
			body = [];
		} else {
			const aIds = [];
			for (const key in amenities) {
				aIds.push(key);
			}
			body = {
				'amenities': aIds,
				'states': Object.keys(states),
				'cities': Object.keys(cities)
			};
		}
		$.ajax({
			url: 'http://localhost:5001/api/v1/places_search/',
			type: 'POST',
			contentType: 'application/json',
			data: JSON.stringify(body),
			success: (data) => {
				$('section.places').empty();
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
	})
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

	$('input[type="checkbox"].states').change(function () {
		if ($(this).is(':checked')) {
			states[$(this).attr('data-id')] = $(this).attr('data-name');
		} else {
			delete states[$(this).attr('data-id')];
		}
		$('.locations h4').text([...Object.values(states), ...Object.values(cities)].join(', '));
	});
	$('input[type="checkbox"].cities').change(function () {
		if ($(this).is(':checked')) {
			cities[$(this).attr('data-id')] = $(this).attr('data-name');
		} else {
			delete cities[$(this).attr('data-id')];
		}
		$('.locations h4').text([...Object.values(states), ...Object.values(cities)].join(', '));
	});
	$('input[type="checkbox"].amenities').change(function () {
		if ($(this).is(':checked')) {
			amenities[$(this).attr('data-id')] = $(this).attr('data-name');
		} else {
			delete amenities[$(this).attr('data-id')];
		}
		$('.amenities h4').text(Object.values(amenities).join(', '));
	});
});
