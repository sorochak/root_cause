$(document).ready(function (){
    $('.quizContainer').hide(); //hide all cards, then below, show only the starting card
    $('#0').show();

    // $('#createCase').show(); Case or Continue monitoring cards.
    // $('#everythingOkay').show();


    // $('#submitQ1').click( () => { //home landing page
    //     let category =  $('input[name="problemCategory"]:checked').val();
    //     while (category == undefined)
    //         $('#0').append('<div class="errorText">Please select an option to continue</div>');
    //
    //
    //
    // }); // end click function q0

    $('#submit7').click( () => {
        $('#camCheck').hide();
    });

        $('#submitQ1').click( () => { //home landing page
        let category =  $('input[name="problemCategory"]:checked').val();
        console.log(category);

            // $('#camCheck').show();  un comment out later when finish

        switch (category) {
            case "power": //incomplete
                $('#1_1').show();
                break;
            case "safety": //incomplete
                $('#2_1').show();
                break;
            case "met": //incomplete
                $('#3_1').show();
                break;
            case "zephir": //incomplete
                $('#4_1').show();
                break;
            case "windcube": //incomplete
                $('#5_1').show();
                break;
            default:
                $('#0').append('<div class="errorText">Please select an option to continue</div>');

        }// end switch q0
        if (category != undefined) {
            // $('#0').hide();
        }
    }); // end click function q0











    $('#n1_1').click( () => { //power card landing page
        let powerCat =  $('input[name="powerCat"]:checked').val();
        console.log(powerCat);

        switch (powerCat) {
            case "1": //Wind Turbine //complete -- could use some error handling
                $('#1_A').show();
                console.log("i'm in case one");
                break;
            case "2":// Solar //incomplete
                $('#1_B').show();
                break;
            case "3": //Gen Fuel Cell //incomplete
                $('#1_C').show();
                break;
            case "4": //Gen Diesel //incomplete
                $('#1_D').show();
                break;
            default:
                $('#1_1').append('<div class="errorText">Please select an option to continue</div>');
            //category = 0;
        }// end switch q0
        if (powerCat != undefined) {
            //$('#1_1').hide();
        }

    }); //END POWER CARD  landing page

            $('#submit1_A').click( () => { //wind turbine card: determines if case needed
                let  wintT1=  $('#windT1').val();
                let  wintT2=  $('#windT2').val();
                let  wintT3=  $('#windT3').val();
                let  wintT4=  $('#windT4').val();


                if (wintT1 && wintT2 === "Yes") //data from other WTG avail +  is producing power
                    $('#createCase').show();

                else if (wintT4 === "No") //wtg not moving in same direction
                    $('#createCase').show();

                else if ((wintT1 === "No" ) && (wintT3 > 4) )//no data for other wtg but winds are strong
                    $('#createCase').show();

                else
                    $('#everythingOkay').show();

            }); //END wind turbine page



            $('#submit1_B').click( () => { //solar power card: determines if case needed
                let solarP1 = $('#solarP1').val();
                let solarP2 = $('#solarP2').val();
                let solarP3 = $('#solarP3').val();
                let solarP4 = $('#solarP4').val();
                let solarP5 = $('#solarP5').val();

                if (solarP3 === "No") //it's not sunny or night
                    $('#everythingOkay').show();

                else if (solarP1 && solarP2 && solarP3 ==="Yes" & solarP4 ==="No") //other panel shows power being produced + sun
                    $('#createCase').show();

                else if(solarP3 && solarP4 && solarP5 ==="Yes") //sunny and net power stats low
                    $('#createCase').show();

                else
                    $('#everythingOkay').show();


            }); // END solar power page



            $('#submit1_C').click( () => { //Gen Fuel Cell card: determines if case needed






            });




            $('#submit1_D').click( () => { //Gen Diesel card: determines if case needed






            });


});//end document on ready
