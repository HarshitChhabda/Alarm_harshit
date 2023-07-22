// Function to update the timer display
function updateTimerDisplay(timerElement, timeRemaining) {
    const hours = Math.floor(timeRemaining / 3600);
    const minutes = Math.floor((timeRemaining % 3600) / 60);
    const seconds = timeRemaining % 60;
  
    timerElement.innerHTML = `
      <span>Time Left:</span>
      <div class="timer-input">
        <b>${hours} hr :</b>
        <b>${minutes} min :</b>
        <b>${seconds} sec</b>
      </div>
      <button class="delete">Delete</button>
    `;
  }
  
  // Function to handle individual timers
  function startTimer(timeRemaining, timerElement) {
    const interval = setInterval(function () {
      timeRemaining--;
      if (timeRemaining >= 0) {
        updateTimerDisplay(timerElement, timeRemaining);
      } else {
        clearInterval(interval);
        timerElement.innerHTML =
          "<b>TIMER IS UP!</b> <button class='delete'>Delete</button>";
        timerElement.style.backgroundColor = "darkgoldenrod";
        window.speechSynthesis.speak(new SpeechSynthesisUtterance("Time is up"));
      }
    }, 1000);
  }
  
  // Event listener for the "Set" button
  setTimerBtn.addEventListener("click", () => {
    // Get user input for the timer
    const hr = parseInt(hour.value, 10) || 0;
    const min = parseInt(minute.value, 10) || 0;
    const sec = parseInt(second.value, 10) || 0;
  
    const timeRemaining = hr * 3600 + min * 60 + sec;
  
    if (timeRemaining <= 0) {
      alert("Please enter a valid time.");
      return;
    }
  
    // Create a new timer display element
    const timerDiv = document.createElement("div");
    timerDiv.className = "active-timer";
    document.getElementById("timer-container").appendChild(timerDiv);
  
    // Start the timer
    startTimer(timeRemaining, timerDiv);
  });
  
  // Event delegation for deleting timers
  document.getElementById("timer-container").addEventListener("click", (event) => {
    if (event.target.classList.contains("delete")) {
      const timerDiv = event.target.parentElement;
      clearInterval(timerDiv.interval);
      timerDiv.remove();
    }
  });