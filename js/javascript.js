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
setInterval( function() {
  var time = moment().format('MM/DD/YYYY hh:mm:ss a');
  $('#currentDay').text(time)
}, 1000);

// Create table based on hours in the day
var tableEl = $('<table>').addClass('table');
var tBodyEl = $('<tbody>');

for (hour = 0 + hourStart; hour < hoursInDay + hourStart; hour++) {
  var cellHour = moment().subtract(moment().format('HH') - hour, 'H')
  var tRowEl = $('<tr>').addClass('time-block');
  var tHeadEl = $('<th>').attr('scope', 'row').addClass('hour').text(cellHour.format('hh:00 A'));
  var tRowEventEl = $('<td>').addClass('col-event text-wrap data-editable').attr('contenteditable', true);
  var tRowLockEl = $('<td>').addClass('col-lock saveBtn').text('🔒');

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
$('table').on('click', '.save-btn', function() {
  // Save Event Text
  console.log(this)
  console.log($(this).siblings('td').text())
})

// $('table').on('click', '.save-btn', function() {
//   var el = $(this);
//   var input = $('<input/>').val(el.text());
//   el.replaceWith(input);
//   var save = function() {
//     var p = $('<p data-editable />').text( input.val());
//     input.replaceWith(p);
//     var my = input.val()
//     console.log(my)
//   }
// })

// The Event is stored in localstorage