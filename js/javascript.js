// Global Definitions
var hoursInDay = 24;
var hourStart = 0;
var containerEl = $('.container');

// Show current date and time
setInterval( function() {
  var time = moment().format('MM/DD/YYYY hh:mm:ss a');
  $('#currentDay').text(time)
}, 1000);

// Create table based on hours in the day
var tableEl = $('<table>').addClass('table table-bordered');
var tBodyEl = $('<tbody>');

for (hour = 0 + hourStart; hour < hoursInDay + hourStart; hour++) {
  var cellHour = moment().subtract(moment().format('HH') - hour, 'H')
  var tRowEl = $('<tr>');
  var tHeadEl = $('<th>').attr('scope', 'row').text(cellHour.format('hh:00 a'));
  var tRowEventEl = $('<td>');
  var tRowLockEl = $('<td>').addClass('lock');

  // Color Cells depending on time
  if (moment(cellHour).isBefore(moment(), 'h')) {
    tRowEventEl.addClass('past');
    
  } else if (moment(cellHour).isSame(moment(), 'h')) {
    tHeadEl.addClass('past');
    tRowEventEl.addClass('present');
    
  } else if (moment(cellHour).isAfter(moment(), 'h')) {
    tRowEventEl.addClass('future')
  }
  
  tRowEl.append(tHeadEl);
  tRowEl.append(tRowEventEl);
  tRowEl.append(tRowLockEl);
  tBodyEl.append(tRowEl);
}

tableEl.append(tBodyEl);
containerEl.append(tableEl);


// Fill the first column dynamically by amount of hours in the day


// Color code the hours in the event using bootstrap based off the current time
// $('tbody').children().eq(5).addClass('present')
$('tr').children('td').addClass('table-secondary')

// Clicking on the table row triggers an bootstrap enter event modal

// The Event is stored in localstorage