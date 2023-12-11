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
});
