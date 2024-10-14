// Initialize variables
let startTime = 0;
let currentTime = 0;
let lapTimes = [];
let intervalId = null;

// Add event listeners to buttons
document.getElementById('start-btn').addEventListener('click', startStopwatch);
document.getElementById('pause-btn').addEventListener('click', pauseStopwatch);
document.getElementById('reset-btn').addEventListener('click', resetStopwatch);
document.getElementById('lap-btn').addEventListener('click', lapTime);

// Function to start the stopwatch
function startStopwatch() {
    // Record the start time
    startTime = new Date().getTime();
    // Start the interval to update the time display
    intervalId = setInterval(updateTime, 1000);
    // Disable the start button and enable the pause button
    document.getElementById('start-btn').disabled = true;
    document.getElementById('pause-btn').disabled = false;
}

// Function to pause the stopwatch
function pauseStopwatch() {
    // Clear the interval to stop updating the time display
    clearInterval(intervalId);
    // Disable the pause button and enable the start button
    document.getElementById('start-btn').disabled = false;
    document.getElementById('pause-btn').disabled = true;
}

// Function to reset the stopwatch
function resetStopwatch() {
    // Reset the start time, current time, and lap times
    startTime = 0;
    currentTime = 0;
    lapTimes = [];
    // Reset the time display and lap times list
    document.getElementById('time-display').innerHTML = '00:00:00';
    document.getElementById('lap-times-list').innerHTML = '';
    // Disable the pause button and enable the start button
    document.getElementById('start-btn').disabled = false;
    document.getElementById('pause-btn').disabled = true;
}

// Function to record a lap time
function lapTime() {
    // Calculate the lap time
    const lapTime = currentTime - startTime;
    // Add the lap time to the list of lap times
    lapTimes.push(lapTime);
    // Format the lap time and add it to the lap times list
    const lapTimeDisplay = formatTime(lapTime);
    const lapTimeListItem = document.createElement('li');
    lapTimeListItem.textContent = lapTimeDisplay;
    document.getElementById('lap-times-list').appendChild(lapTimeListItem);
}

// Function to update the time display
function updateTime() {
    // Calculate the current time
    currentTime = new Date().getTime() - startTime;
    // Format the current time and update the time display
    const timeDisplay = formatTime(currentTime);
    document.getElementById('time-display').innerHTML = timeDisplay;
}

// Function to format a time in hours, minutes, and seconds
function formatTime(time) {
    // Calculate the hours, minutes, and seconds
    const hours = Math.floor((time / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((time / (1000 * 60)) % 60);
    const seconds = Math.floor((time / 1000) % 60);
    // Format the time as a string
    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}