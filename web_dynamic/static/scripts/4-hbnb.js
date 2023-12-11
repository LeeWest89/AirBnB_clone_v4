#!/usr/bin/node
const url = `http://${window.location.hostname}`;
$('document').ready(() => {
  $('input:checkbox:checked').prop('checked', false);

  let amenityThing = [];
  let amenityArray = [];
  let amenityDict = {};
  $('li input:checkbox').on('change', () => {
    amenityThing = $('li input:checkbox:checked').map((_, obj) => $(obj).data('id')).get();
    amenityArray = $('li input:checkbox:checked').map((_, obj) => $(obj).data('name')).get();
    amenityDict = amenityThing.reduce((obj, key, idx) => ({ ...obj, [key]: amenityArray[idx] }), {});
    console.log(amenityDict);
    $('.amenities h4').text(amenityArray.join(', '));
    if ($('.amenities h4').is(':empty')) $('.amenities h4').text('\xA0');
  });

  $.get(`${url}:5001/api/v1/status/`, (dump) => {
    return dump.status === 'OK'
      ? $('div#api_status').addClass('available')
      : $('div#api_status').removeClass('available');
  });

  $('button').on('click', () => {
    const amId = Object.keys(amenityDict);
    console.log(amId);
    $.ajax({
      type: 'POST',
      url: `${url}:5001/api/v1/places_search/`,
      contentType: 'application/json',
      data: JSON.stringify({ amenities: amId }),
      success: function (data) {
        const dataSort = data.sort((a, b) => a.name > b.name ? 1 : b.name > a.name ? -1 : 0);
        $('section.places').empty();
        for (const place of dataSort) {
          let guestS = 's';
          let bedsS = 's';
          let bathsS = 's';
          if (place.max_guest === 1) guestS = '';
          if (place.number_rooms === 1) bedsS = '';
          if (place.number_bathrooms === 1) bathsS = '';
          $('section.places').append(
            `<article>
              <div class="title_box">
                <h2>${place.name}</h2>
                <div class="price_by_night">$${place.price_by_night}</div>
              </div>
              <div class="information">
                <div class="max_guest">${place.max_guest} Guest${guestS}</div>
                <div class="number_rooms">${place.number_rooms} Bedroom${bedsS}</div>
                <div class="number_bathrooms">${place.number_bathrooms} Bathroom${bathsS}</div>
              </div>
              <div class="description">
                ${place.description}
              </div>
            </article>`
          );
        }
      }
    });
  });
});
