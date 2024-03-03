$(document).ready(function() {
        const amenities = {};

        $('.amenityCheckbox').change(function () {
                const amenityId = $(this).attr('data-id');
                const amenityName = $(this).attr('data-name');
                if ($(this).prop('checked')) {
                        amenities[amenityId] = amenityName;
                } else {
                        delete amenities[amenityId];
                }

                if (Object.keys(amenities).length === 0) {
                        $('div.amenities h4').html('&nbsp');
                } else {
                        $('div.amenities h4').text(Object.values(amenities).join(', '));
                }
        });

        const states = {};

        $('.stateCheckBox').change(function () {
                const stateId = $(this).attr('data-id');
                const stateName = $(this).attr('data-name');
                if ($(this).prop('checked')) {
                        states[stateId] = stateName;
                } else {
                        delete states[stateId];
                }

                if (Object.keys(states).length === 0) {
                        $('div.locations h4').html('&nbsp');
                } else {
                        $('div.locations h4').text(Object.values(states).join(', '));
                }
        });

        const cities = {};

        $('.cityCheckBox').change(function () {
                const cityId = $(this).attr('data-id');
                const cityName = $(this).attr('data-name');
                if ($(this).prop('checked')) {
                        cities[cityId] = cityName;
                } else {
                        delete cities[cityId];
                }

                if (Object.keys(cities).length === 0) {
                        $('div.locations h4').html('&nbsp');
                } else {
                        $('div.locations h4').text(Object.values(cities).join(', '));
                }
        });

        $.ajax({
                url: 'http://127.0.0.1:5001/api/v1/status/',
                type: 'GET',
                success: function () {
                        $('#api_status').addClass('available');
                }
        });

        $.ajax({
                url: 'http://127.0.0.1:5001/api/v1/places_search/',
                type: 'POST',
                data: '{}',
                contentType: 'application/json',
                dataType: 'json',
                success: function (data) {
                        for (const i in data) {
                                let g = 'Guest';
                                let b = 'Bathroom';
                                if (data[i]['max_guest'] !== 1) {
                                        g = 'Guests'
                                }
                                if (data[i]['number_bathrooms'] !== 1) {
                                        b = 'Bathrooms';
                                }
                                $('.places').append(
                                        '<article><div class="title_box"><h2>' +
                                        data[i]['name'] + '</h2><div class="price_by_night">' +
                                        data[i]['price_by_night'] + '</div></div><div class="information"><div class="max_guest">' +
                                        data[i]['max_guest'] + g + '</div><div class="number_bathrooms">' +
                                        data[i]['number_bathrooms'] + b + '</div></div><div class="user"><b>Owner:</b>' + '</div><div class="description">' +
                                        data[i]['description'] + '</div><div class=reviews><h2>Reviews <span class="reviewSpan" data-id="' +
                                        data[i]['id'] + '" >show</span></h2><ul></ul></div></article>'
                                );
                        }
                } 
        })

        $(':button').on('click', function () {
                let clicked = {'amenities': amenities, 'states': states, 'cities': cities}
                $.ajax ({
                        url: 'http://127.0.0.1:5001/api/v1/places_search/',
                        type: 'POST',
                        data: JSON.stringify(clicked),
                        contentType: 'application/json',
                        dataType: 'json',
                        success: function (data) {
                                $('.places article').remove();
                                for (const i in data) {
                                        let g = 'Guest';
                                        let b = 'Bathroom';
                                        if (data[i]['max_guest'] !== 1) {
                                                g = 'Guests'
                                        }
                                        if (data[i]['number_bathrooms'] !== 1) {
                                                b = 'Bathrooms';
                                        }
                                        $('.places').append(
                                                '<article><div class="title_box"><h2>' +
                                                data[i]['name'] + '</h2><div class="price_by_night">' +
                                                data[i]['price_by_night'] + '</div></div><div class="information"><div class="max_guest">' +
                                                data[i]['max_guest'] + g + '</div><div class="number_bathrooms">' +
                                                data[i]['number_bathrooms'] + b + '</div></div><div class="user"><b>Owner:</b>' + '</div><div class="description">' +
                                                data[i]['description'] + '</div><div class=reviews><h2>Reviews <span class="reviewSpan" data-id="' +
                                                data[i]['id'] + '" >show</span></h2><ul></ul></div></article>'
                                        );
                                }
                        }
                });
        });

        $(document).on('click', '.reviewSpan', function() {
                const placeId = $(this).data('id');
                const reviewsContainer = $(this).closest('.reviews').find('ul');
                const reviewSpn = $(this).closest('.reviewSpan')
        
                if ($(this).text() === 'show') {
                    $.ajax({
                        url: `http://127.0.0.1:5001/api/v1/places/${placeId}/reviews`,
                        type: 'GET',
                        success: function (data) {
                            for (const review of data) {
                                reviewsContainer.append(`<li>${review.text}</li>`);
                            }
                        }
                    });
        
                    $(reviewSpn).text('hide');
                } else {
                    reviewsContainer.empty();
                    $(reviewSpn).text('show');
                }
            });

});
