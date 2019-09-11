//Create intial connection to the data.js data
var tableData = data;
console.log(data)

// Create a function to display the data using d3 to display the keys and values on a localized website.
function tableDisplay(ufoSightings) {
    var tbody = d3.select('tbody');
    ufoSightings.forEach(ufoRecord => {
        var row = tbody.append('tr');
        Object.entries(ufoRecord).forEach(([key, value]) => {
            var cell = row.append('td');
            cell.html(value);
        });
    });
};

// Call the initial function tableDisplay to show the data from tableData in a table format
tableDisplay(tableData);


// Function to clear all data when called
function deleteTbody() {
    d3.select('tbody')
        .selectAll('tr').remove()
        .selectAll('td').remove();
};

// Button connection to html to for the filter button, once click it wil call the handleSearch function 
button = d3.select("#filter-btn"); 
button.on("click", handleSearch) 

// The function that goes through inputted values in the search box criteria
function handleSearch() {
    d3.event.preventDefault();
    // Function to clear all data 
    deleteTbody();
    
    //Declare the input values in the input boxes to the right data variables
    var dateInput = d3.select("#datetime").property("value");
    var cityInput = d3.select("#city").property("value");
    var stateInput = d3.select("#state").property("value");
    var countryInput = d3.select("#country").property("value");
    var shapeInput = d3.select("#shape").property("value");
    
    // Set the initail data
    var filteredData = tableData;


    // If all input variables are empty then return all data
    if (dateInput.trim() === "" && cityInput.trim() === "" && stateInput.trim() === "" && countryInput.trim() === "" && shapeInput.trim() === "" ) {
        return filteredData;
    }
    
    // If input for date is not empty then filter
    if (dateInput.trim() != "") {
        var filteredData = filteredData.filter(ufoSightings => ufoSightings.datetime === dateInput.trim());
    }

    // If input for city is not empty then filter
    if (cityInput.trim() != "") {
        var filteredData = filteredData.filter(ufoSightings => ufoSightings.city === cityInput.trim());
    }
    

    // If input for state is not empty then filter
    if (stateInput.trim() != "") {
        var filteredData = filteredData.filter(ufoSightings => ufoSightings.state === stateInput.trim());
    }


    // If input for country is not empty then filter
    if (countryInput.trim() != "") {
        var filteredData = filteredData.filter(ufoSightings => ufoSightings.country === countryInput.trim());
    }


    // If input for shape is not empty then filter
    if (shapeInput.trim() != "") {
        var filteredData = filteredData.filter(ufoSightings => ufoSightings.shape === shapeInput.trim());
    }
    

    // If filteredData returns a 0 for length or no data return then it displays "No Record Found"
    if (filteredData.length == 0) {
        d3.select('tbody')
          .append('tr')
          .append('td')
            .attr('colspan', 7)
            .html('<h4>No Records Found</h4>');
    };

    //Print data to console and also calls tableDisplay function to show the table
    console.log(filteredData);
    tableDisplay(filteredData);

}