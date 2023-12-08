$('document').ready(() => {
  $('input:checkbox:checked').prop('checked', false);

  let amenityArray = [];
  $('li input:checkbox').on('change', () => {
    amenityArray = $('li input:checkbox:checked').map((_, obj) => $(obj).data('name')).get();
    // console.log(amenityArray);
    $('.amenities h4').text(amenityArray.join(', '));
    if ($('.amenities h4').is(':empty')) $('.amenities h4').text('\xA0');
  });

  $.get('http://0.0.0.0:5001/api/v1/status/', (dump) => {
    return dump.status === 'OK'
      ? $('div#api_status').addClass('available')
      : $.get('http://127.0.0.1:5001/api/v1/status/', (dump) => {
        return dump.status === 'OK'
          ? $('div#api_status').addClass('available')
          : $('div#api_status').removeClass('available');
      });
  });
});
