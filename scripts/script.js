$(document).ready(function () {
    let runData = [];

    //https://github.com/barrycumbie/jubilant-garbanzo-easy-read
    fetch('./data/runs.json')
    .then(response => response.json())
    .then(data => {
      runData = data.runningData;
      displayRuns(runData);
    })
    .catch(error => console.error('Error loading run data:', error));
    function displayRuns(runs) {
        const container = $('#runEntries');
        container.empty();
    
        runs.forEach((run, index) => {
          const card = `
            <div class="col-md-6 col-lg-4 mb-4">
              <div class="card shadow-md h-100">
                <div class="card-body">
                  <h5 class="card-title">${run.date}</h5>
                  <p class="card-text"><strong>Distance:</strong> ${run.distance} miles</p>
                  <p class="card-text"><strong>Time:</strong> ${run.time}</p>
                  <p class="card-text"><strong>Pace:</strong> ${run.pace}</p>
                  <p class="card-text"><strong>Note:</strong> ${run.note}</p>
                  <button class="btn btn-md edit-btn" data-index="${index}">Edit</button>
                  <button class="btn btn-md delete-btn" data-index="${index}">Delete</button>
                </div>
              </div>
            </div>
          `;
          container.append(card);
        });
      }

    //   Adding our new runs!!
    $('#runForm').on('submit', function (event) {
        event.preventDefault();
    
        const newRun = {
          date: $('#date').val(),
          distance: $('#distance').val(),
          time: $('#time').val(),
          pace: $('#pace').val(),
          note: $('#note').val()
        };
    
        runData.push(newRun);
        displayRuns(runData);
        $(this).trigger('reset');
      });

       //adding sample run data
    $('#loadSampleData').on('click', function () {
        $('#date').val('2025-05-01');
        $('#distance').val('2.0');
        $('#time').val('19 minutes 0 seconds');
        $('#pace').val('8:30 min/mile');
        $('#note').val('I am super fast!');
      });

      let deleteIndex = null; // Global to store which run to delete

      // delete run with confirmation modal
      $('#runEntries').on('click', '.delete-btn', function () {
          deleteIndex = $(this).data('index'); // Save the index
          $('#deleteConfirmationModal').modal('show'); // Open the modal
      });
      
      $('#confirmDeleteBtn').on('click', function () {
          if (deleteIndex !== null) {
              runData.splice(deleteIndex, 1); // Delete the correct run
              displayRuns(runData); // Refresh displayed runs
              deleteIndex = null; // Reset after delete
              $('#deleteConfirmationModal').modal('hide'); // ✅ Correct one #, not ##
          }
      });

      // edit run entries using the add run 
        $('#runEntries').on('click', '.edit-btn', function () {
            const index = $(this).data('index');
            const run = runData[index];
        
            $('#date').val(run.date);
            $('#distance').val(run.distance);
            $('#time').val(run.time);
            $('#pace').val(run.pace);
            $('#note').val(run.note);
        
            // Change the form to update mode
            $('#runForm').off('submit').on('submit', function (event) {
            event.preventDefault();
        
            runData[index] = {
                date: $('#date').val(),
                distance: $('#distance').val(),
                time: $('#time').val(),
                pace: $('#pace').val(),
                note: $('#note').val()
            };
        
            displayRuns(runData);
            $(this).trigger('reset');
            // Reset the form submission handler
            resetForm();
            });
        });

        function resetForm() {
            $('#runForm').off('submit').on('submit', function (event) {
              event.preventDefault();
          
              const newRun = {
                date: $('#date').val(),
                distance: parseFloat($('#distance').val()).toFixed(2),
                time: $('#time').val(),
                pace: $('#pace').val(),
                note: $('#note').val()
              };
          
              runData.push(newRun);
              displayRuns(runData);
              $(this).trigger('reset');
            });
          }

      // for exporting runs to console!
        $('#exportRuns').on('click', function () {
            const runDataString = JSON.stringify(runData, null, 2);
            console.log(runDataString);
        });

// log in 
  let loggedInUser = null;

// Handle login form submission
$('#loginForm').on('submit', function(event) {
  event.preventDefault();
  
  const username = $('#username').val().trim();
  if (username !== '') {
    loggedInUser = username;
    $('#loginModal').modal('hide');
    updateLoginButton();
    $('#loginForm')[0].reset();
  }
});

// Function to update the login/logout button
function updateLoginButton() {
  if (loggedInUser) {
    $('#loginButton')
      .removeAttr('data-bs-toggle')
      .removeAttr('data-bs-target')
      .text(`Well hey there, ${loggedInUser} (Click here to logout)`)
      .off('click')
      .on('click', function() {
        loggedInUser = null;
        resetLoginButton();
      });
  }
}

// Reset the login button back to Login
function resetLoginButton() {
  $('#loginButton')
    .attr('data-bs-toggle', 'modal')
    .attr('data-bs-target', '#loginModal')
    .text('Login')
    .off('click');
}
    });
