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
    // console.log(amenityThing);
    // console.log(amenityArray);
    console.log(amenityDict);
    $('.amenities h4').text(amenityArray.join(', '));
    if ($('.amenities h4').is(':empty')) $('.amenities h4').text('\xA0');
  });

  $.get(`${url}:5001/api/v1/status/`, (dump) => {
    return dump.status === 'OK'
      ? $('div#api_status').addClass('available')
      : $('div#api_status').removeClass('available');
  });

  $.ajax({
    type: 'POST',
    url: `${url}:5001/api/v1/places_search/`,
    contentType: 'application/json',
    data: '{}',
    success: function (data) {
      for (let place of data) {
        console.log(place);
        const guest_s = 's';
        const beds_s = 's';
        const baths_s = 's';
        // if (place.max_guest !== 1) { const guest_s = 's'; }
        // if (place.number_rooms !== 1) { const beds_s = 's'; }
        // if (place.number_bathrooms !== 1) { const baths_s = 's'; }
        $('section.places').append(
          `<article>
            <div class="title_box">
              <h2>${ place.name }</h2>
              <div class="price_by_night">$${place.price_by_night}</div>
            </div>
            <div class="information">
              <div class="max_guest">${place.max_guest} Guest${guest_s}</div>
                <div class="number_rooms">${place.number_rooms} Bedroom${beds_s}</div>
                <div class="number_bathrooms">${place.number_bathrooms} Bathroom${baths_s}</div>
            </div>
            <div class="description">
            ${place.description}
            </div>
          </article>`
        );
      };
    }
  });

});

// const placesSection = $('.places');
// for (let i = 0; i < data.length; i++) {
//   const place = data[i];
//   const placeArticle = $('<article>');
//   const boxDiv = $('<div class="title_box>');
//   boxDiv.append($('<h2>').text(place.name));
//   boxDiv.append($('<div class="price_by_night>').text(`$${place.price_by_night}`));
//   placeArticle.append(boxDiv);
//   const infoDiv = $('<div class="information>');
//   infoDiv.append($('<div class"max_guest">').text(`${place.max_guest} Guest${place.max_guest !== 1 ? 's' : ''}`));
//   infoDiv.append($('<div class="number_rooms">').text(`${place.number_rooms} Bedroom${place.number_rooms !== 1 ? 's' : ''}`));
//   infoDiv.append($('<div class="number_bathrooms">').text(`${place.number_bathrooms} Bathroom${place.number_bathrooms !== 1 ? 's' : ''}`));
//   placeArticle.append(infoDiv);
//   const userDiv = $('<div class="user>');
//   userDiv.append($(`<b>Owner:</b> ${place.user.first_name} ${place.user.last_name}`));
//   placeArticle.append(userDiv);
//   const descDiv = $('<div class="description">').html(place.description);
//   placeArticle.append(descDiv);
//   placesSection.append(placeArticle);
// }