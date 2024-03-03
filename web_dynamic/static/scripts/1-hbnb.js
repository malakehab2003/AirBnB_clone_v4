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

});
