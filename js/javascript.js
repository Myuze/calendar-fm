// Show current date and time
setInterval( function() {
  var currentDay = moment().format('MM/DD/YYYY hh:mm:ss a');
  $('#currentDay').text(currentDay)
}, 1000);

console.log($('tr'))
console.log($('<tr>'))

$('td').text('1')
