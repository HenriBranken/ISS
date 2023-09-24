// Get the <p> Node Elements by ID name.
const par_lat = document.getElementById("latitude");
const par_lon = document.getElementById("longitude");
const par_time = document.getElementById("timestamp");

const X_MILLISECONDS = 5000;

function unixToHumanReadable(unixtimestamp) {
  // Get the milliseconds.
  // Create a new date object with the new Date() constructor method.
  // Use the .toLocaleString() function to convert the date object into human-friendly date string.
  let milliseconds = unixtimestamp * 1000;
  let dateObject = new Date(milliseconds);
  let humanDate = dateObject.toLocaleString();
  return humanDate;
}

async function getISSData() {
  try {
    const res = await fetch("http://api.open-notify.org/iss-now.json");
    const result = await res.json();

    // Extract latitude, longitude, and timestamp from `result`.
    let latitude = result["iss_position"]["latitude"];
    let longitude = result["iss_position"]["longitude"];
    let datetime = unixToHumanReadable(result["timestamp"]);

    // Populate the <p> Node Elements with data extracted from the API.
    par_lat.innerHTML = latitude;
    par_lon.innerHTML = longitude;
    par_time.innerHTML = datetime;
  } catch (error) {
    console.log(error);
  }
  // The Function Recursively calls itself every x milliseconds.
  setTimeout(getISSData, X_MILLISECONDS);
}

// Initiate the `getISSData()` function.
getISSData();
