

$(document).ready(function() {

  //search doctors by name
  $('#search-by-name').click(function() {
    let doctorName = $('#dr-name').val();
    $('#dr-name').val("");

    let request = new XMLHttpRequest();
    //search set to 30 miles
    let url = `https://api.betterdoctor.com/2016-03-01/doctors?name=${doctorName}&location=47.608%2C-122.335%2C30&user_location=47.608%2C-122.335&skip=0&limit=30&user_key=${
        process.env.exports.apikey
      }`;


    request.onreadystatechange = function() {
      if (this.readyState === 4 && this.status === 200) {
        let response = JSON.parse(this.responseText);
        getElements(response);
        $(".errors").hide();
      } else if (this.readyState === 4 && this.status !== 200){
        $(".errors").text("Uh oh! Something went wrong!");
      } else {
        $(".errors").text("loading resulsts...");
      }
    }

    request.open("GET", url, true);
    request.send();

    let getElements = function(response) {
      if (response.data != "") {
        $('.showDoctors').text(`Doctors with the name ${doctorName} in your area:`);
        response.data[0].practices.forEach(function(practiceInfo) {
          response.data[0].specialties.forEach(function(bio) {
            $('.showDoctors').append(`<ul><br><li><strong>${practiceInfo.name}</strong></li> <ul><li>Address: <ul><li>${practiceInfo.visit_address.street}</li> <li>${practiceInfo.visit_address.city}, ${practiceInfo.visit_address.state}</li> <li>${practiceInfo.visit_address.zip}</li></ul> <li>Phone Number: ${practiceInfo.phones[0].number}</li> <li> Website: ${practiceInfo.website}</li> <li>Accepting New Patients: ${practiceInfo.accepts_new_patients}</li><li>Bio: ${bio.description}</li></ul></ul>`);
          })
        })
      // } else if ($('#dr-name').val() == "") {
      //   $('.showDoctors').text('Search field empty;');
      } else {
        $('.showDoctors').text('Sorry, there are no Doctors in your area with that name.');
      }
    }
  });

//search by specialty
  $('#search-by-specialty').click(function() {
    let specialty = $('#specialty').val();
    $('#specialty').val("");

    let request = new XMLHttpRequest();
    //search set to 30 miles
    let url = `https://api.betterdoctor.com/2016-03-01/doctors?specialty_uid=${specialty}&location=47.608%2C-122.335%2C30&user_location=47.608%2C-122.335&skip=0&limit=30&user_key=${
        process.env.exports.apikey
      }`;


      request.onreadystatechange = function() {
        if (this.readyState === 4 && this.status === 200) {
          let response = JSON.parse(this.responseText);
          getElements(response);
          $(".errors").hide();
        } else if (this.readyState === 4 && this.status !== 200){
          $(".errors").text("Uh oh! Something went wrong!");
        } else {
          $(".errors").text("loading resulsts...");
        }
      }

    request.open("GET", url, true);
    request.send();

    let getElements = function(response) {
      if (response.data != "") {
        $('.showDoctors').text(`Doctors with the title of ${specialty} in your area:`);
        response.data[0].practices.forEach(function(practiceInfo) {
          response.data[0].specialties.forEach(function(bio) {
            $('.showDoctors').append(`<ul><br><li><strong>${practiceInfo.name}</strong></li> <ul><li>Address: <ul><li>${practiceInfo.visit_address.street}</li> <li>${practiceInfo.visit_address.city}, ${practiceInfo.visit_address.state}</li> <li>${practiceInfo.visit_address.zip}</li></ul> <li>Phone Number: ${practiceInfo.phones[0].number}</li> <li> Website: ${practiceInfo.website}</li> <li>Accepting New Patients: ${practiceInfo.accepts_new_patients}</li><li>Bio: ${bio.description}</li></ul></ul>`);
          })
        })
      // } else if ($('#specialty').val() == "") {
      //   $('.showDoctors').text('Search field empty;')
      } else {
        $('.showDoctors').text('Sorry, there are no Doctors in your area with that name.')
      }
    }
  });
});
