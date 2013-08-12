//global variables
var score = 100;
window.util.patchFnBind();
window.util.patchRequestAnimationFrame();
this.accelerometer = new Accelerometer();
this.accelerometer.startListening();
var isGrey;
var timer1;
var timer2;

setter();

function setter()
{
	timer1 = setInterval(decrementScore, 1000);
	timer2 = setInterval(observedAndDiff, 50);
}

function start()
{
	randomTargets();
}

function decrementScore()
{
	if(score > 0)
		score--;
	$('#score').html("Score: " + score);
}

function randomize()
{	
	if(score - 20 >= 0)
		score = score - 20;
	else
		score = 0;

	$('#score').html("Score: " + score);
	randomTargets();
}

function startOver()
{
	score = 100;
	var input_score = $('#score');
	input_score.html("Score: " + score);
	randomTargets();
}

function updateScore()
{
	clearTimeout(timer1);
	clearTimeout(timer2);
	score = score + 100;
	$('#score').html("Score: " + score);
	randomTargets();
	$('body').css('background', 'green');
	setTimeout(highlight1, 1000);
	setTimeout(setter, 1000);
}

function randomTargets()
{
	var number;

	var targetX = $('#target1');
	number = (Math.floor(Math.random() * 21) - 10);
	targetX.html(number);
	window.targetX = number;

	var targetY = $('#target2');
	number = (Math.floor(Math.random() * 21) - 10);
	targetY.html(number);
	window.targetY = number;

	var targetZ = $('#target3');
	number = (Math.floor(Math.random() * 21) - 10);
	targetZ.html(number);
	window.targetZ = number;
	greyOut();
}

function highlight1()
{
    $('body').css('background', '#66CCEE');
}

function greyOut()
{
	var color = $('body').css('background-color');

	for(var i = 1; i < 4; i++)
	{
		var diff = $('#diff' + i);
		diff.css('background', color);
	}

	window.greyout = Math.floor(Math.random() * 3) + 1;
	isGrey = $('#diff' + greyout);
	isGrey.css('background', 'grey');
}

function observedAndDiff()
{
	var acceleration = this.accelerometer.getLast();

	var obs1 = acceleration.x.toFixed(1);
	var obs2 = acceleration.y.toFixed(1);
	var obs3 = acceleration.z.toFixed(1);

	$('#obs1').html(obs1);
	$('#obs2').html(obs2);
	$('#obs3').html(obs3);
	var diff1 = (window.targetX.toFixed(1) - obs1).toFixed(1);
	var diff2 = (window.targetY.toFixed(1) - obs2).toFixed(1);
	var diff3 = (window.targetZ.toFixed(1) - obs3).toFixed(1);

	var adiff1 = Math.abs(diff1);
	var adiff2 = Math.abs(diff2);
	var adiff3 = Math.abs(diff3);

	$('#diff1').html(diff1);
	$('#diff2').html(diff2);
	$('#diff3').html(diff3);

	if(window.greyout === 1)
	{
		if(adiff2 > 3)
			$('#diff2').css("background-color", "red");
		else if(adiff2 > 1 && adiff2 <= 3.0)
			$('#diff2').css("background-color", "orange");
		else if(adiff2 > 0.5 && adiff2 < 1)
			$('#diff2').css("background-color", "yellow");
		else if(adiff2 >= 0 && adiff2 <= 0.5)
			$('#diff2').css("background-color", "green");

		if(adiff3 > 3)
			$('#diff3').css("background-color", "red");
		else if(adiff3 > 1 && adiff3 <= 3.0)
			$('#diff3').css("background-color", "orange");
		else if(adiff3 > 0.5 && adiff3 < 1)
			$('#diff3').css("background-color", "yellow");
		else if(adiff3 >= 0 && adiff3 <= 0.5)
			$('#diff3').css("background-color", "green");

		if(checkWin(adiff2, adiff3))
			updateScore();
	}
	else if(window.greyout === 2)
	{
		if(adiff1 > 3)
			$('#diff1').css("background-color", "red");
		else if(adiff1 > 1 && adiff1 <= 3.0)
			$('#diff1').css("background-color", "orange");
		else if(adiff1 > 0.5 && adiff1 < 1)
			$('#diff1').css("background-color", "yellow");
		else if(adiff1 >= 0 && adiff1 <= 0.5)
			$('#diff1').css("background-color", "green");

		if(adiff3 > 3)
			$('#diff3').css("background-color", "red");
		else if(adiff3 > 1 && adiff3 <= 3.0)
			$('#diff3').css("background-color", "orange");
		else if(adiff3 > 0.5 && adiff3 < 1)
			$('#diff3').css("background-color", "yellow");
		else if(adiff3 >= 0 && adiff3 <= 0.5)
			$('#diff3').css("background-color", "green");

		if(checkWin(adiff1, adiff3))
			updateScore();
	}
	else if(window.greyout === 3)
	{
		if(adiff1 > 3)
			$('#diff1').css("background-color", "red");
		else if(adiff1 > 1 && adiff1 <= 3.0)
			$('#diff1').css("background-color", "orange");
		else if(adiff1 > 0.5 && adiff1 < 1)
			$('#diff1').css("background-color", "yellow");
		else if(adiff1 >= 0 && adiff1 <= 0.5)
			$('#diff1').css("background-color", "green");

		if(adiff2 > 3)
			$('#diff2').css("background-color", "red");
		else if(adiff2 > 1 && adiff2 <= 3.0)
			$('#diff2').css("background-color", "orange");
		else if(adiff2 > 0.5 && adiff2 < 1)
			$('#diff2').css("background-color", "yellow");
		else if(adiff2 >= 0 && adiff2 <= 0.5)
			$('#diff2').css("background-color", "green");

		if(checkWin(adiff1, adiff2))
			updateScore();
	}
}

function checkWin(a, b)
{
	if(a <= 0.5 && b <= 0.5)
		return true;

	return false;
}