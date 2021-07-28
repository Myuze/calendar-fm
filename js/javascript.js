// Global Definitions
const hoursInDay = 24;
const hourStart = 0;
const workHoursStart = 9;
const containerEl = $('.container');
const eventInfoCache = {};

// Event Object
var eventInfo = {
  timeStart: 0,
  content: "",

  save: function() {
    eventInfoCache[this.timeStart] = this.content;
    console.log('EIC After: ', eventInfoCache)
    localStorage.setItem('eventInfo', JSON.stringify(eventInfoCache))
  },

  load: function() {
    eventInfoCache = JSON.parse(localStorage.getItem('eventInfo'))
    console.log('eventInfo JSON: ', eiJSON)

    for (const [key, value] of Object.entries(eventInfoCache)) {
      var thEl = $(`th:contains('${key}')`)
      thEl.siblings('.col-event').text(value) 
    }

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
$('table').on('click', '.saveBtn', function(event) {
  // Save Event Text
  eventInfo.timeStart = $(event.target).siblings('.hour').text();
  eventInfo.content = $(event.target).siblings('.col-event').text();
  eventInfo.save();
})

eventInfo.load();