// Global Definitions
const hoursInDay = 24;
const hourStart = 0;
const workHoursStart = 9;
const containerEl = $('.container');
var eventInfoCache = {};

// Event Object
var eventInfo = {
  timeStart: 0,
  content: "",

  save: function() {
    eventInfoCache[this.timeStart] = this.content;
    localStorage.setItem('eventInfo', JSON.stringify(eventInfoCache))
  },

  load: function() {
    eventInfoCache = JSON.parse(localStorage.getItem('eventInfo'))

    if (eventInfoCache != null) {
      for (const [key, value] of Object.entries(eventInfoCache)) {
        var thEl = $(`th:contains('${key}')`)
        thEl.siblings('.col-event').text(value) 
      }
    } else { eventInfoCache = {} }
  } 
}

// Show current date and time
var time = moment().format('dddd, MMMM Do YYYY, hh:mm:ss a');
$('#currentDay').text(time);

setInterval( function() {
  time = moment().format('dddd, MMMM Do YYYY, hh:mm:ss a');
  $('#currentDay').text(time);
}, 1000);

// Dynamically create table based on hours in the day
const tableEl = $('<table>').addClass('table');
const tBodyEl = $('<tbody>');

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
$('table').on('click', '.saveBtn', function(event) {
  eventInfo.timeStart = $(event.target).siblings('.hour').text();
  eventInfo.content = $(event.target).siblings('.col-event').text();
  eventInfo.save();
})

// Load existing events on page load
eventInfo.load();