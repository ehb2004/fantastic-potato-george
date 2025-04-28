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
                  <p class="card-text"><strong>Distance:</strong> ${run.distance}</p>
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
    });