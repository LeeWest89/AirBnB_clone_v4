#!/usr/bin/node
$('document').ready(() => {
  $('input:checkbox:checked').prop('checked', false);
  let amenityArray = [];
  $('li input:checkbox').on('change', () => {
    amenityArray = $('li input:checkbox:checked').map((_, obj) => $(obj).data('name')).get();
    $('.amenities h4').text(amenityArray.join(', '));
    if ($('.amenities h4').is(':empty')) $('.amenities h4').text('\xA0');
  });
});
