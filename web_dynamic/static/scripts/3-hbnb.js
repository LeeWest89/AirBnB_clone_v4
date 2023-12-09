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
    data: JSON.stringify({}),
    success: function (data) {
      const placesSection = $('.places');
      for (let i = 0; i < data.length; i++) {
        const place = data[i];
        const placeArticle = $('<article>');
        const boxDiv = $('<div class="title_box>');
        boxDiv.append($('<h2>').text(place.name));
        boxDiv.append($('<div class="price_by_night>').text(`$${place.price_by_night}`));
        placeArticle.append(boxDiv);
        const infoDiv = $('<div class="information>');
        infoDiv.append($('<div class"max_guest">').text(`${place.max_guest} Guest${place.max_guest !== 1 ? 's' : ''}`));
        infoDiv.append($('<div class="number_rooms">').text(`${place.number_rooms} Bedroom${place.number_rooms !== 1 ? 's' : ''}`));
        infoDiv.append($('<div class="number_bathrooms">').text(`${place.number_bathrooms} Bathroom${place.number_bathrooms !== 1 ? 's' : ''}`));
        placeArticle.append(infoDiv);
        const userDiv = $('<div class="user>');
        userDiv.append($(`<b>Owner:</b> ${place.user.first_name} ${place.user.last_name}`));
        placeArticle.append(userDiv);
        const descDiv = $('<div class="description">').html(place.description);
        placeArticle.append(descDiv);
        placesSection.append(placeArticle);
      }
    }
  });
});
