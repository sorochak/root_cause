$(document).ready(function (){
    $('.quizContainer').hide(); //hide all cards, then below, show only the starting card
    $('#0').show();


    $('#submit7').click( () => {
        $('#camCheck').hide(); //take this out when done
    });

        $('#submitQ1').click( () => { //home landing page
        let category =  $('input[name="problemCategory"]:checked').val();
        console.log(category);

            // $('#camCheck').show();  un comment out later when finish

        switch (category) {
            case "power": //incomplete - need gen cards
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
             $('#0').hide();
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
            $('#1_1').hide();
        }

    }); //END POWER CARD  landing page

            $('#submit1_A').click( () => { //wind turbine card: determines if case needed
                let  wintT1=  $('#windT1').val();
                let  wintT2=  $('#windT2').val();
                let  wintT3=  $('#windT3').val();
                let  wintT4=  $('#windT4').val();

                if (wintT3 === "") //does not let wind speed be blank
                    $('#1_A').prepend(`<span> Please Complete all fields.</span>`);
                else {
                    if (wintT1 && wintT2 === "Yes") //data from other WTG avail +  is producing power
                        $('#createCase').show();

                    else if (wintT4 === "No") //wtg not moving in same direction
                        $('#createCase').show();

                    else if ((wintT1 === "No") && (wintT3 > 4))//no data for other wtg but winds are strong
                        $('#createCase').show();

                    else
                        $('#everythingOkay').show();

                    $('#1_A').hide();
                }
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

                $('#1_B').hide();
            }); // END solar power page


            $('#submit1_C').click( () => { //Gen Fuel Cell card: determines if case needed






            });


            $('#submit1_D').click( () => { //Gen Diesel card: determines if case needed






            });


    $('#submit2_1').click( () => { //safety card landing page
        let safeCat =  $('input[name="safeCat"]:checked').val();
        console.log(safeCat);

        switch (safeCat) {
            case "1": //Water Level Sensor
                $('#2_A').show();
                console.log("i'm in case one");
                break;
            case "2":// Hatch Intrusion
                $('#2_B').show();
                break;
            case "3": //OffPos
                $('#2_C').show();
                break;
            default:
                $('#2_1').append('<div class="errorText">Please select an option to continue</div>');
            //category = 0;
        }// end switch safety landing
        if (safeCat != undefined) {
            $('#2_1').hide();
        }
    }); //end safety landing card


            $('#submit2_A').click( () => { //WLS LOGIC CARD
                let value1 = $('#WLS1').val();
                let value2 = $('#WLS2').val();
                let value3 = $('#WLS3').val(); //which compartment will be used for adding info into smartsheet.

                if (value1 < value2) //it's not sunny or night
                    $('#createCase').show();
                else
                    $('#everythingOkay').show();

                $('#2_A').hide();
            }); // END WLS LOGIC CARD


            $('#submit2_B').click( () => { //Hatch Card
                let value1 = $('#checkHatch').val();

                if (value1 === "Yes") //it's not sunny or night
                    $('#createCase').show();
                else
                    $('#everythingOkay').show();

                $('#2_B').hide();
            }); // END Hatch LOGIC CARD

            $('#submit2_C').click( () => { //Off Pos Logic card
                let value1 = $('#offPos1').val();
                let value2 = $('#offPos2').val();


                if (value1 && value2 === "Yes" ) //buoy might be floating away
                    $('#2_C_2').show();
                else
                    $('#2_C_3').show(); //check DMS coordinates

                $('#2_C').hide();
            }); // END Off Pos Logic card

                    $('#submit2_C_2').click( () => { //Off Alerts checking severity pt1
                        let value1 = $('#oPos1').val();
                        let value2 = $('#oPos2').val();

                        console.log(value1 + " is val1 2c2");
                        console.log(value2+ " is val2");

                        if (value1 === "Yes" && value2 === "Yes" ) { //buoy might be floating away
                            $('#createCase').show();
                            $('#createCase').append(`<span> CALL MAX </span> <br>`);
                        }

                        else
                            $('#2_C_3').show(); //check DMS coordinates

                        $('#2_C_2').hide();
                    }); // END Off Pos Logic card


                    $('#submit2_C_3').click( () => { //checking DMS settings
                        let value1 = $('#oPos3').val();
                        let value2 = $('#oPos4').val();

                        if (value1 === "Yes" && value2 === "No" ) { //buoy had the incorrect watchCircle set.
                            $('#everythingOkay').show();
                            $('#everythingOkay').prepend(`It appears that the Watch Circle had the incorrect coordinates set. <br>
                                Continue to monitor the off-position messages to ensure the new coordinate message takes. `);
                        }

                        else
                        { // check comms? //
                             }

                        $('#submit2_C_3').hide();
                    }); // END Off Pos Logic card


    $('#submit3_1').click( () => { //safety card landing page
        let metCat =  $('input[name="metCat"]:checked').val();
        console.log(metCat);

        switch (metCat) {
            case "1": //Water Level Sensor
                $('#3_A').show();
                console.log("i'm in case one");
                break;
            case "2":// Hatch Intrusion
                $('#3_B').show();
                break;
            case "3": //OffPos
                $('#3_C').show();
                break;
            case "4": //OffPos
                $('#3_D').show();
                break;
            case "5": //OffPos
                $('#3_E').show();
                break;
            default:
                $('#3_1').append('<div class="errorText">Please select an option to continue</div>');
            //category = 0;
        }// end switch safety landing
        if (metCat != undefined) {
            //$('#3_1').hide();
        }
    }); //end safety landing card

        $('#submit3_A').click( () => { //Humidity Logic
            let value1 = $('#hum1').val();
            let value2 = $('#hum2').val();

            if (value1  && value2 === "Yes") //if sensor 100% and data is missing from the FTP
                $('#createCase').show();
            else
                $('#everythingOkay').show();

            $('#3_A').hide();
        }); // END Humidity Logic  CARD

        $('#submit3_B').click( () => { //AirTemp Logic
            let value1 = $('#atemp1').val();
            let value2 = $('#atemp2').val();

            if (value1 === "Yes" || value2 === "Yes") //If the thermometer is not reading correctly OR data missing on FTP
                $('#createCase').show();
            else
                $('#everythingOkay').show();

            $('#3_B').hide();
        }); // ENDAirTemp Logic  CARD

        $('#submit3_C').click( () => { //baro Logic
            let value1 = $('#baro').val();

            if (value1 === "Yes") //If the thermometer is not reading correctly OR data missing on FTP
                $('#createCase').show();
            else
                $('#everythingOkay').show();

            $('#3_C').hide();
        }); // ENDbaro Logic  CARD

        $('#submit3_D').click( () => { //cam Logic
            let value1 = $('#cam1').val(); //collect answers for SmartSheet integration
            let value2 = $('#cam2').val();
            let value3 = $('#cam3').val(); //collect answers for SmartSheet integration

            if (value2 === "Yes") { //Buoy on Essentials. No problem
                $('#everythingOkay').show();
                $('#everythingOkay').prepend(`<h3>It appears that the buoy is on power saving mode.
                It is expected for the camera files to be missing while power saving mode is turned on.</h3> <br>`);
            }
            else
                $('#createCase').show();

            $('#3_D').hide();
        }); // END cam logic  CARD



});//end document on ready
