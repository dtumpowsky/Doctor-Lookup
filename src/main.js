$(document).ready(function() {

  //search doctors by name
  $('#search-by-name').click(function() {
    let doctorName = $('#dr-name').val();
    $('#dr-name').val("");

    let request = new XMLHttpRequest();
    //search set to 30 miles
    let url = `https://api.betterdoctor.com/2016-03-01/doctors?name=${doctorName}&location=47.608%2C-122.335%2C30&user_location=47.608%2C-122.335&skip=0&limit=30&user_key=72c05386db77907794bc0f6168e4022c`;


    request.onreadystatechange = function() {
      if (this.readyState === 4 && this.status === 200) {
        let response = JSON.parse(this.responseText);
        getElements(response);
      } else if (this.readyState === 4 && this.status !== 200){
        $(".errors").text("Uh oh! Something went wrong!");
      }
    }

    request.open("GET", url, true);
    request.send();

    let getElements = function(response) {
      if (response.data != "") {
        $('.showDoctors').text(`These are the doctors with the name ${doctorName} in your area:`);
        response.data[0].practices.forEach(function(practiceInfo) {
          $('.showDoctors').append(`<ul><li>${practiceInfo.name}</li> <ul><li>Address: <ul><li>${practiceInfo.visit_address.street}</li> <li>${practiceInfo.visit_address.city}, ${practiceInfo.visit_address.state}</li> <li>${practiceInfo.visit_address.zip}</li></ul> <li>Phone Number: ${practiceInfo.phones[0].number}</li> <li> Website: ${practiceInfo.website}</li> <li>Accepting New Patients: ${practiceInfo.accepts_new_patients}</li></ul></ul>`);
      })
      } else {
        $('.showDoctors').text('Sorry, there are no Doctors in your area.')
      }
    }
  });

  $('#search-by-specialty').click(function() {
    let specialty = $('#specialty').val();
    $('#specialty').val("");

    let request = new XMLHttpRequest();
    //search set to 30 miles
    let url = `https://api.betterdoctor.com/2016-03-01/doctors?specialty_uid=${specialty}&location=37.773%2C-122.413%2C100&user_location=37.773%2C-122.413&skip=0&limit=10&user_key=72c05386db77907794bc0f6168e4022c`;


    request.onreadystatechange = function() {
      if (this.readyState === 4 && this.status === 200) {
        let response = JSON.parse(this.responseText);
        getElements(response);
      } else if (this.readyState === 4 && this.status !== 200){
        $(".errors").text("Uh oh! Something went wrong!");
      }
    }

    request.open("GET", url, true);
    request.send();

    let getElements = function(response) {
      if (response.data != "") {
        $('.showDoctors').text(`These are the doctors with the title of ${specialty} in your area:`);
        response.data[0].practices.forEach(function(practiceInfo) {
          $('.showDoctors').append(`<ul><li>${practiceInfo.name}</li> <ul><li>Address: <ul><li>${practiceInfo.visit_address.street}</li> <li>${practiceInfo.visit_address.city}, ${practiceInfo.visit_address.state}</li> <li>${practiceInfo.visit_address.zip}</li></ul> <li>Phone Number: ${practiceInfo.phones[0].number}</li> <li> Website: ${practiceInfo.website}</li> <li>Accepting New Patients: ${practiceInfo.accepts_new_patients}</li></ul></ul>`);
      })
      } else {
        $('.showDoctors').text('Sorry, there are no Doctors in your area.')
      }
    }
  });
});
