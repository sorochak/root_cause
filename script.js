$(document).ready(function (){

    $('.quizContainer').hide(); //hide all cards, then below, show only the starting card
    $('#0').show();

    $('#submitQ1').click( () => {
        let category =  $('input[name="problemCategory"]:checked').val();
        console.log(category);
    });
});

