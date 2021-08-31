$(document).ready(function (){
    $('.quizContainer').hide(); //hide all cards, then below, show only the starting card
    $('#0').show();

    let visCards = []; //array of type string that hold the ID's of all visited cards.
    let counter = 0; //total elements in the card array

    let buoyQuestions = { //this object will show the relevant info about the buoy, and the questions answered + the responses.
        buoyName: "null",
        operatorName: "null", // AS added operator name
        mainCategory: "null",
        subCategory: "null"
    }
        function addCardToArray(){

            let arr = [];

            var ele = document.querySelectorAll('[id]'); //grabs all ID divs on whole html DOM

            for (var i = 0; i < ele.length; i++){ //for loop gets all visible divs
                if($(ele[i]).is(":visible"))
                    arr.push(ele[i]);
            }

            visCards.push(arr[2].id); //the card div is always the second one in the visible array. push the k value pair of ID to VisCard arr
            counter++;

        };

        function pairResponses(arrOfAnswerVals){  //pairs questions with answers then adds both to the object above.
            //the param passed in is an array of ANSWERS from the active card.
            //the below functions pairs the questions from top to bottom to the ANSWERS from the user and adds it into the final object

            let arr = []; //here array is an array of the h2 objects.

            var ele = document.querySelectorAll('h2'); //grabs all h2 divs on whole html DOM?

            for (var i = 0; i < ele.length; i++){ //for loop gets all visible h2 on current card
                if($(ele[i]).is(":visible"))
                    arr.push(ele[i].innerText);
            }
            console.log(arr);
            console.log(arr.length + " is arr length");

            for (var i = 0; i < arr.length; i++){
                buoyQuestions[arr[i]] = arrOfAnswerVals[i];

            }

            console.log(buoyQuestions);
           // console.log(arr);
            //console.log(arrOfAnswerVals);


        }


        $('.goBack').click(() => { //a listener for all go back buttons (hopefully)
            $('.quizContainer').hide();  //hide all cards
            counter--;
            $(`#${visCards[counter]}`).show(); //go to the card saved in the array -1;

        });

    $('#submit7').click( () => {
        $('#camCheck').hide(); //take this out when done
    });

    $('#submitQ1').click( () => { //home landing page
        addCardToArray();
        let category =  $('input[name="problemCategory"]:checked').val();
        let buoyName = $('#buoyID').val();
        let operatorName = $('#operator').val();
        console.log(buoyName);
        // $('#camCheck').show();  un comment out later when finish

        buoyQuestions.buoyName = buoyName;
        buoyQuestions.operatorName = operatorName;
        buoyQuestions.mainCategory = category;

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
            case "comms":
                $('#6_1').show();
                break;
            default:
                $('#0').append('<div class="errorText">Please select an option to continue</div>');

        }// end switch q0
        if (category != undefined) {
             $('#0').hide();
        }
    }); // end click function q0



    $('#n1_1').click( () => { //power card landing page
        addCardToArray();
        let powerCat =  $('input[name="powerCat"]:checked').val();
        let subCat = $('input[name="powerCat"]:checked').attr('id');
        buoyQuestions.subCategory = subCat;
        console.log(buoyQuestions);
        switch (powerCat) {
            case "1": //Wind Turbine //complete -- could use some error handling
                $('#1_A').show();
                console.log("i'm in case one");
                break;
            case "2":// Solar //incomplete
                $('#1_B').show();
                break;
            case "3": //Gen Fuel Cell //incomplete
                $('#1_D').show();
                break;
            case "4": //Gen Diesel //incomplete
                $('#1_C').show();
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
                addCardToArray();
                let  wintT1=  $('#windT1').val();
                let  wintT2=  $('#windT2').val();
                let  wintT3=  $('#windT3').val();
                let  wintT4=  $('#windT4').val();

                let toGetPassed = [wintT1, wintT2 , wintT3 , wintT4];
                pairResponses(toGetPassed);

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
                        $('#1_E').show();

                    $('#1_A').hide();
                }
            }); //END wind turbine page

            $('#submit1_B').click( () => { //solar power card: determines if case needed
                addCardToArray();
                let solarP1 = $('#solarP1').val();
                let solarP2 = $('#solarP2').val();
                let solarP3 = $('#solarP3').val();
                let solarP4 = $('#solarP4').val();
                let solarP5 = $('#solarP5').val();

                let toGetPassed = [solarP1, solarP2, solarP3, solarP4, solarP5]
                pairResponses(toGetPassed);

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
                addCardToArray();

                let fuelC1 = $('#fuelC1').val();
                let fuelC2 = $('#fuelC2').val();

                if (fuelC1 === "No")
                    $('#createCase').show();

                else if (fuelC1 === "Yes" && fuelC2 ==="No")
                    $('#1_E').show();

                // else
                //     $('#everythingOkay').show();

                $('#1_C').hide();

            }); // END fuel cell page


            $('#submit1_D').click( () => { //Gen Diesel card: determines if case needed
                addCardToArray();





            });


    $('#submit2_1').click( () => { //safety card landing page
        addCardToArray();
        let safeCat =  $('input[name="safeCat"]:checked').val();
        let subCat = $('input[name="safeCat"]:checked').attr('id');
        buoyQuestions.subCategory = subCat;
        console.log(buoyQuestions);
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
                addCardToArray();
                let value1 = $('#WLS1').val();
                let value2 = $('#WLS2').val();
                let value3 = $('#WLS3').val(); //which compartment will be used for adding info into smartsheet.

                let toGetPassed = [value1, value2, value3];
                pairResponses(toGetPassed);


                if (value1 < value2) //it's not sunny or night
                    $('#createCase').show();
                else
                    $('#everythingOkay').show();

                $('#2_A').hide();
            }); // END WLS LOGIC CARD


            $('#submit2_B').click( () => { //Hatch Card
                addCardToArray();
                let value1 = $('#checkHatch').val();

                let toGetPassed = [value1];
                pairResponses(toGetPassed);

                if (value1 === "Yes") //it's not sunny or night
                    $('#createCase').show();
                else
                    $('#everythingOkay').show();

                $('#2_B').hide();
            }); // END Hatch LOGIC CARD

            $('#submit2_C').click( () => { //Off Pos Logic card
                addCardToArray();
                let value1 = $('#offPos1').val();
                let value2 = $('#offPos2').val();


                let toGetPassed = [value1, value2];
                pairResponses(toGetPassed);

                if (value1 && value2 === "Yes" ) //buoy might be floating away
                    $('#2_C_2').show();
                else
                    $('#2_C_3').show(); //check DMS coordinates

                $('#2_C').hide();
            }); // END Off Pos Logic card

                    $('#submit2_C_2').click( () => { //Off Alerts checking severity pt1
                        addCardToArray();
                        let value1 = $('#oPos1').val();
                        let value2 = $('#oPos2').val();

                        let toGetPassed = [value1, value2];
                        pairResponses(toGetPassed);

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
                        addCardToArray();
                        let value1 = $('#oPos3').val();
                        let value2 = $('#oPos4').val();

                        let toGetPassed = [value1, value2];
                        pairResponses(toGetPassed);

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


    $('#submit3_1').click( () => { //MET card landing page
        addCardToArray();
        let metCat =  $('input[name="metCat"]:checked').val();
        let subCat = $('input[name="metCat"]:checked').attr('id');
        buoyQuestions.subCategory = subCat;
        console.log(buoyQuestions);

        switch (metCat) {
            case "1": //Humidity Logic
                $('#3_A').show();
                console.log("i'm in case one");
                break;
            case "2":// /AirTemp Logic
                $('#3_B').show();
                break;
            case "3": //baro Logic
                $('#3_C').show();
                break;
            case "4": //cam Logic
                $('#3_D').show();
                break;
            case "5": //gill Logic
                $('#3_E').show();
                break;
            default:
                $('#3_1').append('<div class="errorText">Please select an option to continue</div>');
            //category = 0;
        }// end switch safety landing
        if (metCat != undefined) {
            $('#3_1').hide();
        }
    }); //end MET landing card

        $('#submit3_A').click( () => { //Humidity Logic
            addCardToArray();
            let value1 = $('#hum1').val();
            let value2 = $('#hum2').val();

            let toGetPassed = [value1, value2];
            pairResponses(toGetPassed);

            if (value1  && value2 === "Yes") //if sensor 100% and data is missing from the FTP
                $('#createCase').show();
            else
                $('#everythingOkay').show();

            $('#3_A').hide();
        }); // END Humidity Logic  CARD

        $('#submit3_B').click( () => { //AirTemp Logic
            addCardToArray();
            let value1 = $('#atemp1').val();
            let value2 = $('#atemp2').val();

            let toGetPassed = [value1, value2];
            pairResponses(toGetPassed);

            if (value1 === "Yes" || value2 === "Yes") //If the thermometer is not reading correctly OR data missing on FTP
                $('#createCase').show();
            else
                $('#everythingOkay').show();

            $('#3_B').hide();
        }); // ENDAirTemp Logic  CARD

        $('#submit3_C').click( () => { //baro Logic
            addCardToArray();
            let value1 = $('#baro').val();

            if (value1 === "Yes") //If the thermometer is not reading correctly OR data missing on FTP
                $('#createCase').show();
            else
                $('#everythingOkay').show();

            $('#3_C').hide();
        }); // ENDbaro Logic  CARD

        $('#submit3_D').click( () => { //cam Logic
            addCardToArray();
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

        $('#submit3_E').click( () => { //gill Logic
            addCardToArray();
            let value1 = $('#gill1').val(); //collect answers for SmartSheet integration
            let value2 = $('#gill').val();
            let value3 = $('#gill3').val(); //collect answers for SmartSheet integration

            // if (value2 === "Yes") { //Buoy on Essentials. No problem
            //     $('#everythingOkay').show();
            //     $('#everythingOkay').prepend(`<h3>It appears that the buoy is on power saving mode.
            //         It is expected for the camera files to be missing while power saving mode is turned on.</h3> <br>`);
            // }
            // else
            //     $('#createCase').show();

            //Edith will help with logic

            $('#3_E').hide();
        }); // END cam logic  CARD

    $('#submit4_1').click( () => { //Zeoh card landing page
        addCardToArray();
        let zCat =  $('input[name="zCat"]:checked').val();
        let subCat = $('input[name="zCat"]:checked').attr('id');
        buoyQuestions.subCategory = subCat;
        console.log((buoyQuestions));

        switch (zCat) {
            case "1": //Raw Files missing Data
                $('#4_B').show();
                console.log("i'm in case one");
                break;
            case "2"://Processed Files missing Data
                $('#4_A').show();
                break;
            case "3": //Critical Error Flag
                $('#createCase').show();
                $('#createCase').prepend(`<span> If this is a new instance of a Critical Error Flag, be sure to bring this information up in the afternoon scrum.</span>`)
                break;
            default:
                $('#4_1').append('<div class="errorText">Please select an option to continue</div>');
            //category = 0;
        }// end switch safety landing
        if (zCat != undefined) {
            $('#4_1').hide();
        }
    }); //end safety landing card


            $('#submit4_A').click( () => { //zeph Processed Logic  COMPLETE ME!!!!!!!!
                addCardToArray();
                let value1 = $('#zpro1').val(); //collect answers for SmartSheet integration
                let value2 = $('#zpro2').val();
                let value3 = $('#zpro3').val(); //collect answers for SmartSheet integration

                if (value2 === "No") { //True Heading Issue
                    $('#4_AB').show();
                }
                else if(value1 === "Yes"){ //Gill Data missing
                    $('#createCase').show();
                }

                else
                    console.log("else");
                $('#4_A').hide();
            }); // END zeph Processed Logic  CARD

                $('#submit4_AB').click( () => { //True Heading Missing Logic
                    addCardToArray();

                    $('#createCase').show();

                    $('#4_AB').hide();
                }); // END True Heading Missing Logic  CARD


            $('#submit4_B').click( () => { //zeph raw Logic  COMPLETE ME!!!!!!!!
                addCardToArray();
                let value1 = $('#zraw1').val(); //collect answers for SmartSheet integration
                let value2 = $('#zraw2').val();
                let value3 = $('#zraw3').val(); //collect answers for SmartSheet integration

                 if (value2 === "No") { //True Heading Issue
                    $('#4_AB').show();
                }
                else if(value1 === "Yes"){ //Gill Data missing
                    $('#createCase').show();
                }

                else
                    console.log("else");
                $('#4_B').hide();
            }); // END zeph Processed Logic  CARD


    $('#submit5_1').click( () => { //Zeoh card landing page
        addCardToArray();
        let wc =  $('input[name="wc"]:checked').val();
        let subCat = $('input[name="wc"]:checked').attr('id');
        buoyQuestions.subCategory = subCat;
        console.log((buoyQuestions));

        switch (wc) {
            case "1": //Raw Files missing Data
                $('#5_A').show();
                console.log("i'm in case one");
                break;
            case "2"://Processed Files missing Data
                $('#5_A').show();
                break;
            default:
                $('#5_1').append('<div class="errorText">Please select an option to continue</div>');
            //category = 0;
        }// end switch safety landing
        if (wc != undefined) {
            $('#5_1').hide();
        }
    }); //end safety landing card


        $('#submit5_A').click( () => { //windcube trouble card
            addCardToArray();

            $('#createCase').show();

            $('#5_A').hide();
        }); // END windcube trouble card CARD


    $('#submit6_1').click( () => { //comms landing page
        addCardToArray();
        let com =  $('input[name="com"]:checked').val();
        let subCat = $('input[name="com"]:checked').attr('id');
        buoyQuestions.subCategory = subCat;
        console.log((buoyQuestions));

        switch (com) {
            case "1": //Missing FTP
                $('#6_A').show();
                console.log("i'm in case one");
                break;
            case "2"://Missing SmartWeb
                $('#6_B').show();
                break;
            default:
                $('#6_1').append('<div class="errorText">Please select an option to continue</div>');
            //category = 0;
        }// end switch safety landing
        if (com != undefined) {
            $('#6_1').hide();
        }
    }); //end comms landing card


    $('#submit6_B').click( () => { //Comms Logic Card
        addCardToArray();
        let value1 = $('#sw1').val(); //Status message coming in?
        let value2 = $('#sw2').val(); //Off Pos message coming in ?

        if (value1 === "No") { //TCP Comms Issue
            $('#6_C').show();
        }
        else if(value2 === "No") { // IDP COMMS ISSUE- Card missing I think
            $('#6_D').show();
        }

        else
            $('#everythingOkay').show();
        $('#6_B').hide();
    }); // END Comms Logic Card


    $('#submit6_C').click( () => { //smartweb messages missing
        addCardToArray();
        $('#createCase').prepend(`<span>In your case creation, make sure you include all categories where messages are missing.  </span>`);
        $('#createCase').show();

        $('#6_C').hide();
    }); // END //smartweb messages missing


    $('#submit6_D').click( () => { //IDP issues
        addCardToArray();
        $('#createCase').prepend(`<span>In your case creation, make sure you note include the results of checking the IDP viewer.  </span>`);
        $('#createCase').show();

        $('#6_D').hide();
    }); // END //smartweb messages missing

});//end document on ready
