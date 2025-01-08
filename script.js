// Initialize mood data array in localStorage if it doesn't exist
if (!localStorage.getItem('moodData')) {
    localStorage.setItem('moodData', JSON.stringify([]));
  }
  
  // Retrieve mood data from localStorage
  let moodData = JSON.parse(localStorage.getItem('moodData'));
  
  // Select DOM elements
  const moodSelect = document.getElementById('mood');
  const thoughtsTextarea = document.getElementById('thoughts');
  const saveButton = document.getElementById('saveMood');
  const moodChart = document.getElementById('moodChart');
  
  // Event listener to save mood entry
  saveButton.addEventListener('click', function() {
    const mood = moodSelect.value;
    const thoughts = thoughtsTextarea.value;
    const date = new Date().toLocaleDateString();
  
    // Add new mood entry to the data array
    moodData.push({ date, mood, thoughts });
  
    // Save the updated mood data to localStorage
    localStorage.setItem('moodData', JSON.stringify(moodData));
  
    // Clear input fields
    moodSelect.value = 'happy';
    thoughtsTextarea.value = '';
  
    // Update the chart with the latest data
    updateMoodChart();
  });
  
  // Function to update the mood chart
  function updateMoodChart() {
    const moodCounts = {
      happy: 0,
      sad: 0,
      anxious: 0,
      excited: 0,
      hurt: 0,
      angry: 0
    };
  
    // Count mood entries
    moodData.forEach(entry => {
      moodCounts[entry.mood]++;
    });
  
    // Prepare data for the chart
    const chartData = {
      labels: ['Happy', 'Sad', 'Anxious', 'Excited', 'Hurt', 'Angry'],
      datasets: [{
        label: 'Mood Count',
        data: [
          moodCounts.happy, 
          moodCounts.sad, 
          moodCounts.anxious, 
          moodCounts.excited, 
          moodCounts.hurt, 
          moodCounts.angry
        ],
        backgroundColor: [
          '#4CAF50',  // Happy
          '#F44336',  // Sad
          '#FFEB3B',  // Anxious
          '#2196F3',  // Excited
          '#9E9E9E',  // Hurt
          '#D32F2F'   // Angry
        ],
        borderColor: [
          '#388E3C',  // Happy
          '#D32F2F',  // Sad
          '#FBC02D',  // Anxious
          '#1976D2',  // Excited
          '#616161',  // Hurt
          '#C62828'   // Angry
        ],
        borderWidth: 1
      }]
    };
  
    // Initialize chart
    if (window.moodChartInstance) {
      window.moodChartInstance.destroy(); // Destroy previous chart instance
    }
  
    window.moodChartInstance = new Chart(moodChart, {
      type: 'bar',
      data: chartData,
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
          },
          tooltip: {
            callbacks: {
              label: function(tooltipItem) {
                return tooltipItem.raw + ' entries';
              }
            }
          }
        }
      }
    });
  }
  
  // Initial chart update on page load
  updateMoodChart();
  