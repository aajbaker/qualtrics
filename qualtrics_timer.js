/*
This code can be used to start a timer (20sec) that appears in the top right corner of a 
Qualtrics question. The timer will continue to other questions within the same block.
When the timer runs out, all unanswered responses will be filled with N/A and the next 
button will be clicked.
*/

Qualtrics.SurveyEngine.addOnload(function()
{ 
	//Sources: https://stackoverflow.com/questions/47317718/how-to-use-automatically-move-respondents-in-qualtrics-with-global-timer-for-blo; 
	
	//Create header and display objects to display the time on the pages
	var header = document.createElement("div");  
	header.className = "header"  
 	header.id = "header_1"; 
	
	var timeDisplay = document.createElement("div");  
 	timeDisplay.className = "timer";  
	timeDisplay.id = "timer_1";  
 	
	//CHANGE THE NUMBER BELOW IF YOU USE A DIFFERENT TIME
	timeDisplay.innerHTML = "Seconds Remaining: 20";
	
	header.appendChild(timeDisplay);
	document.body.insertBefore(header, document.body.firstChild);
	
	//Set the time remaining to the embedded data time
	var sec = parseInt("${e://Field/timeRemaining}");
	
	//Start counting down, changing the embedded data along the way, and clicking next if the timer runs out.
	var timer = setInterval(function(){
		//Decrement time and reset the embedded data to reflect that
		if (sec > 0) {sec--}
		Qualtrics.SurveyEngine.setEmbeddedData('timeRemaining', sec);
		//Update the display
		document.getElementById("timer_1").innerHTML = "Seconds Remaining: " + sec;
		//Clear timer and hit the next button if the timer runs out
		if (sec <= 0) {
			clearInterval(timer);
			$('NextButton').click();
		}
    }, 1000);

});

Qualtrics.SurveyEngine.addOnReady(function()
{
	
	//Source: https://www.qualtrics.com/community/discussion/10088/default-value-to-be-hidden
	
	//Fill any empty responses with "N/A" so the forced response doesn't keep the survey from advancing
	jQuery("#NextButton").on('click',function(){
		jQuery(".InputText").each(function(){
			if(jQuery(this).val().trim()==""){jQuery(this).val("N/A");}
		});
	});

});

Qualtrics.SurveyEngine.addOnUnload(function()
{
	/*Place your JavaScript here to run when the page is unloaded*/

});