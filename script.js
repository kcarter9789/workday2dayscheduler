// JavaScript should load after HTML and CSS
$(function() {
  // HELPER FUNCTIONS
  // suffixes helper function to make dates like 1st, 2nd, 3rd, 4th...
  function addSuffixToDates(day) {
    let suffix = '';
    if (day >= 11 && day <= 13) {
      suffix = 'th';
    } else {
      switch (day % 10) {
        case 1:
          suffix = 'st';
          break;
        case 2:
          suffix = 'nd';
          break;
        case 3:
          suffix = 'rd';
          break;
        default:
          suffix = 'th';
          break;
      }
    }
    return day + suffix;
  }

  // get current hour and set the background color to the time blocks
  function setTimeBlocksBackground() {
    // Get the current hour
    let currentHour = dayjs().hour();
    // loop through time blocks
    $(".time-block").each(function() {
      let timeBlockHour = parseInt($(this).attr("id").split("-")[1]);

      // add past, present or future classes to paint the UI accordingly
      if (timeBlockHour < currentHour) {
        $(this).addClass("past");
      } else if (timeBlockHour === currentHour) {
        $(this).removeClass("past");
        $(this).addClass("present");
      } else {
        $(this).removeClass("past");
        $(this).removeClass("present");
        $(this).addClass("future");
      }
    });
  }

  // retrieve saved tasks and show them to the DOM
  function retrieveAndShowLocalStorageTasks() {
    // Loop over time blocks
    $(".time-block").each(function() {
      let timeBlockId = $(this).attr("id");
      $(this).children(".description").val(localStorage.getItem(timeBlockId));
    });
  }
  // Get current date 
  let currentDayElement = $("#currentDay");

  // format current date using dayjs
  let currentTime = dayjs().format('dddd, MMMM ') + addSuffixToDates(dayjs().date());

  // show current date in the DOM using text() function
  currentDayElement.text(currentTime);

  // add click event listener to the save button
  $(".saveBtn").on("click", function() {
    let taskText = $(this).siblings(".description").val();
    let taskId = $(this).parent().attr("id");
    // save task text in local storage
    localStorage.setItem(taskId, taskText);
  });


  setTimeBlocksBackground();


  retrieveAndShowLocalStorageTasks();
});