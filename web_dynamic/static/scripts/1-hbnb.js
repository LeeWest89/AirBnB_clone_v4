$('document').ready(() => {
  $('*:checkbox:checked').prop('checked', false);
  let amenity_array = [];
  $('li input:checkbox').on('change', () => {
    amenity_array = $('li input:checkbox:checked').map((_, obj) => $(obj).data('name')).get();
    // console.log(amenity_array);
    $('.amenities h4').text(amenity_array.join(', '));
    if ($('.amenities h4').is(':empty')) $('.amenities h4').text('\xA0');
  })
});
