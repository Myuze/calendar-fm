var hoursInDay = 24;
var hourStart = 0;
var containerEl = $('.container');

// Show current date and time
setInterval( function() {
  var currentDay = moment().format('MM/DD/YYYY hh:mm:ss a');
  $('#currentDay').text(currentDay)
}, 1000);

// Create table based on hours in the day
var tableEl = $('<table>').addClass('table table-bordered');
var tBodyEl = $('<tbody>');

for (i = 0; i < hoursInDay; i++) {
  var tRowEl = $('<tr>');
  var tHeadEl = $('<th>').attr('scope', 'row').text(moment().hour(i).format('h:00 a'));
  var tRowEventEl = $('<td>');
  var tRowLockEl = $('<td>');
  
  tRowEl.append(tHeadEl);
  tRowEl.append(tRowEventEl);
  tRowEl.append(tRowLockEl);
  tBodyEl.append(tRowEl);
}

tableEl.append(tBodyEl);
containerEl.append(tableEl);


// Fill the first column dynamically by amount of hours in the day

// Color code the hours in the event using bootstrap based off the current time
$('tr').children('td').addClass('table-secondary')

// Clicking on the table row triggers an bootstrap enter event modal

// The Event is stored in localstorage



  
