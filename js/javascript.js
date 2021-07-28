// Global Definitions
var hoursInDay = 24;
var hourStart = 0;
var workHoursStart = 9;
var containerEl = $('.container');

// Event Object
var eventBlock = {
  timeStart: 0,
  timeEnd: 0,
  content: "",

  createEvent: function() {
    // Pass
  },

  eventsSave: function() {
    
    // localStorage.setItem('events', /*Array of Events*/)
  },

  eventsLoad: function() {
    
    // localStorage.getItem('events', /*Array of Events*/)
  }
}

// Show current date and time
var time = moment().format('dddd, MMMM Do YYYY, hh:mm:ss a');
$('#currentDay').text(time);

setInterval( function() {
  time = moment().format('dddd, MMMM Do YYYY, hh:mm:ss a');
  $('#currentDay').text(time);
}, 1000);

// Create table based on hours in the day
var tableEl = $('<table>').addClass('table');
var tBodyEl = $('<tbody>');

for (hour = 0 + hourStart; hour < hoursInDay + hourStart; hour++) {
  var cellHour = moment().subtract(moment().format('HH') - hour, 'H')
  var tRowEl = $('<tr>').addClass('time-block');
  var tHeadEl = $('<th>').attr('scope', 'row').addClass('hour align-middle').text(cellHour.format('hh:00 A'));
  var tRowEventEl = $('<td>').addClass('col-event text-break text-wrap text-left data-editable').attr('contenteditable', true);
  var tRowLockEl = $('<td>').addClass('col-lock align-middle saveBtn').text('🔒');

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

// The Event is stored in localstorage
$('table').on('click', '.saveBtn', function() {
  // Save Event Text
  console.log("SAVED, MAYBE?")
})
