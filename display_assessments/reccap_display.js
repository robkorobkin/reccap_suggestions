

var reccap_records = {

	'test_dates' : ['10/11/2023', '11/26/2023'],

	// array of reccap_section objects
	'sections' : [

		{
			'title' : 'Coping and Life Functioning',

			'questions' : [
				{
					'text' : 'Eats regularly and has a balanced diet',
					'answers' : ['No', 'No']
				},
				{
					'text' : 'Has sufficient privacy',
					'answers' : ['Yes', 'No']
				},
				{
					'text' : 'Promptly committed to obligations',
					'answers' : ['Yes', 'No']
				},
				{
					'text' : 'Is happy dealing with a range of professional people',
					'answers' : ['Yes', 'Yes']
				},
				{
					'text' : 'Does not let other people down',
					'answers' : ['No', 'No']
				},

			]				
		},

		{
			'title' : 'Social Support',

			'questions' : [
				{
					'text' : 'Gets a lot of support from friends' ,
					'answers' : ['Yes', 'Yes']
				},
				{
					'text' : 'Receives emotional help and support from family',
					'answers' : ['Yes', 'No']
				},
				{
					'text' : 'Has a special person to share joys and sorrows with',
					'answers' : ['Yes', 'No']
				},
				{
					'text' : 'Is happy with personal life',
					'answers' : ['No', 'Yes']
				},
				{
					'text' : 'Is satisfied with the involvement with family',
					'answers' : ['Yes', 'Yes']
				},

			]				
		},

		{
			'title' : 'Quality of Life and Satisfaction',

			'questions' : [
				{
					'text' 		: 'How good is your psychological health?' ,
					'answers' 	: ['12', '17'],
					'type'		: '20'
				},
				{
					'text' : 'How good is your physical health?',
					'answers' : ['18', '18'],
					'type'		: '20'
				},
				{
					'text' : 'How would you rate your overall quality of life?',
					'answers' : ['12', '9'],
					'type'		: '20'
				},
				{
					'text' : 'How would you rate the quality of your accommodation?',
					'answers' : ['19', '15'],
					'type'		: '20'
				},
				{
					'text' : 'How would you rate your support network?',
					'answers' : ['2', '18'],
					'type'		: '20'
				},

			]				
		}

	]

}



// calculate section scores - part of loading data object, could come from server too
function calculateSectionScores(){

	var total_scores = [];
	reccap_records.test_dates.forEach(date => total_scores.push([]));


	reccap_records.sections.forEach((reccap_section, sectionIndex) => { 

		reccap_section.open = false;

		// this is what we're updating in the data model
		reccap_section.scores = [];


		// 
		// hash scores by date
		// [
		// 	[s, s, ...] // date 1 - scores out of 1 (q1, q2, q3)
		// 	[s, s, ...] // date 2 - scores out of 1
		// ]


		// build out scratchpad object
		var score_scratchpad = [];
		reccap_records.test_dates.forEach(date => {
			score_scratchpad.push([]);
		});


		// populate it
		reccap_section.questions.forEach((question, questionIndex) => {

			question.goal = '';

			question.answerCats = [];
			question.answerScores = [];

			question.answers.forEach((answer, examIndex) => {
				if(answer == "No") {
					answerNum = 0;
					question.answerCats.push('low')
				}
				else if(answer == "Yes") {
					answerNum = 1;
					question.answerCats.push('high')
				}
				else {
					// if it's a number
					var aNum = parseFloat(answer);
					if(aNum){
						var denominator = parseFloat(question.type);
						var answerNum = aNum / denominator;

						if(answerNum < .33) question.answerCats.push('low');
						else if(answerNum > .67) question.answerCats.push('high');
						else question.answerCats.push('med')
					} 
				}

				question.answerScores.push(answerNum);

				total_scores[examIndex].push(answerNum);
				
				score_scratchpad[examIndex].push(answerNum);
			});
		});

		// average it and update data model
		score_scratchpad.forEach( (answers, dateIndex) => {
			var total = 0;
			answers.forEach(answer => total += answer);
			var score = total / answers.length;
			reccap_section.scores.push(Math.floor(score * 100));
		});
		

	});


	// GIVE ALL THE ASSESSMENTS AN OVERALL SCORE
	reccap_records.reccap_scores = [];
	reccap_records.reccap_scoreCats = [];
	total_scores.forEach( (answers, dateIndex) => {
		var total = 0;
		answers.forEach(answer => total += answer);
		var score = total / answers.length;
		reccap_records.reccap_scores.push(Math.floor(score * 100));

		// this could be a utility, we sure seem to be doing it a lot
		if(score < .33) reccap_records.reccap_scoreCats.push('low');
		else if(score > .67) reccap_records.reccap_scoreCats.push('high');
		else reccap_records.reccap_scoreCats.push('med')
	});
		

}
calculateSectionScores();



// RECCAP - Test Question
// 	@param 	- reccap_question object (schema above), ViewState (pulled from HTML Controls)
// 	TESTS 	- reccap_question against view state
// 	RETURNS - true/false if question should display	


function Reccap_testQuestion(question, reccap_viewState) {

	// search string
	var search_string = reccap_viewState.search_string;
	if(search_string != '') {
		if(question.text.toUpperCase().indexOf(search_string) == -1) {
			return false;
		}
	}

	// select set
	var selected_set = reccap_viewState.selected_set;
	if(selected_set == 'Current Successes'){
		if(question.answerCats.slice(-1) != 'high') return false;
	}
	if(selected_set == 'Current Challenges'){
		if(question.answerCats.slice(-1) != 'low') return false;
	}
	if(selected_set == 'Original Successes'){
		if(question.answerCats[0] != 'high') return false;
	}
	if(selected_set == 'Original Challenges'){
		if(question.answerCats[0] != 'low') return false;
	}


	// change status
	var change_status = reccap_viewState.change_status;
	if(change_status == 'Has Changed'){
		var goAhead = false;
		var original_state = question.answers[0];
		question.answers.forEach(answer => { if(answer != original_state) goAhead = true; });
		if(!goAhead) return false;
	}


	if(change_status == 'Has Not Changed'){
		var goAhead = true;
		var original_state = question.answers[0];
		question.answers.forEach(answer => { if(answer != original_state) goAhead = false; });
		if(!goAhead) return false;
	}


	
	var original_score 	= question.answerScores[0];
	var current_score 	= question.answerScores.slice(-1);

	
	if(change_status == 'Has Improved'){		
		if(current_score <= original_score) return false;
	}

	if(change_status == 'Has Gotten Worse'){
		if(current_score >= original_score) return false;
	}


	// goal status
	var goal_status = reccap_viewState.goal_status;
	if(goal_status == 'Has Goals'){		
		if(question.goal == '') return false;
	}

	if(goal_status == 'No Goals'){
		if(question.goal != '') return false;
	}	




	// if you made it to here, green light
	return true;

}


function Reccap_sortByDate(dateIndex, SortOrder){

	// sort the sections
	reccap_records.sections.sort(function(a, b){
		if(SortOrder == 'asc'){
			return (a.scores[dateIndex] < b.scores[dateIndex]);	
		}
		else return (a.scores[dateIndex] > b.scores[dateIndex]);
	});

	// sort the questions
	reccap_records.sections.forEach(section => {
		section.questions.sort(function(a, b){
			if(SortOrder == 'asc'){
				return (a.answerScores[dateIndex] < b.answerScores[dateIndex]);	
			}
			else return (a.answerScores[dateIndex] > b.answerScores[dateIndex]);
		});
	})

}




// WRITE ASSESSMENT HTML
// 	- READS - reccap_records object from global namespace, schema above
//	- GENERATES - Dynamic HTML for GUI canvas, filtering against the current state of the controls
// 	- POPULATES - Canvas element with the HTML generated



var SectionsCollapsed = false; // this should maybe be scoped somewhere

var ShowingGoals = true;

var SortOrder = 'desc';

var SortCol = -1; 


Reccap_writeAssessmentHTML = function (){

	var reccap_viewState = {
		search_string : document.getElementById('search_str').value.toUpperCase(),
		selected_set : document.getElementById('filter1').value,
		change_status : document.getElementById('filter2').value,
		goal_status :  document.getElementById('filter3').value,
	}

	QuestionsDisplayingArray = [];


	// CHART HEADER - DATE, OVER ALL SCORE, GLUE TO TOP
	var html = 	'<div id="chartHeader">' +
					'<div class="col1">&nbsp;</div>'; // burn one
	
					reccap_records.test_dates.forEach( (date, dateIndex) => {
						var score 		= reccap_records.reccap_scores[dateIndex];
						var scoreCat 	= reccap_records.reccap_scoreCats[dateIndex];

						html += '<div class="data_col" id="colheader_' + dateIndex + '" onclick="sortResults(' + dateIndex + ')">' + 
									'<div class="date">' + date + '</div>' +
									'<div class="headerScore ' + scoreCat + '">' + score + '%</div>' +
									// '<img src="triangle_default.png" onclick="sortBy(' + dateIndex + ', \'default\')"  />' +
									// '<img src="triangle_up.png"   onclick="sortBy(' + dateIndex + ', \'up\')" />' +
									// '<img src="triangle_down.png"  onclick="sortBy(' + dateIndex + ', \'down\')" />' +
								'</div>';
					});

	html += 	'</div>' +
				'<div id="innerCanvas">';





	// DYNAMIC - SHOWS ONLY THE SECTIONS AND QUESTIONS ALLOWED BY FILTER
	reccap_records.sections.forEach((reccap_section, sectionIndex) => { 


		displayingAtLeastOne = false;

		sectionHtml = 

			'<div class="reccap_section">' +
				'<div class="header" onclick="toggleSection(' + sectionIndex + ')">' +
					'<div class="col1">' + reccap_section.title + '</div>';

					reccap_records.test_dates.forEach((date, dateIndex) => {

						var score = reccap_section.scores[dateIndex];

						var scoreClass = "med";
						if(score < 34) scoreClass = "low";
						if(score > 65) scoreClass = "high";

						sectionHtml += 

							'<div class="data_col date">' + 
								'<div class="headerScore ' + scoreClass + '">' + score + '%</div>' +
							'</div>'
					});
		

		// exapand / collapse rows
		var displayRows = (reccap_section.open) ? 'block' : 'none';

		sectionHtml +=	
				'</div>' +
				'<div class="body reccap_section_body" id="reccap_section_body_' + sectionIndex + 
							'" style="display: ' + displayRows + '">';

		

		// GENERATE ROWS OF QUESTIONS
		var	displayingAtLeastOne = false;

		reccap_section.questions.forEach((question, questionIndex) => {

				if(!Reccap_testQuestion(question, reccap_viewState)) return;

				displayingAtLeastOne = true;

				var deeplinkStr = sectionIndex + '_' + questionIndex;
				QuestionsDisplayingArray.push(deeplinkStr);

				var noteTriggerStyle = (question.goal == '') ? 'default' : 'goalset';

				sectionHtml += '<div class="row">' +
								'<div class="col1 questionText" onclick="noteToggle(\'' + deeplinkStr + '\')">' + 
									'<span 	class="noteTrigger ' + noteTriggerStyle + '" id="noteTrigger_' + deeplinkStr + '">O</span>' +
									question.text + 
								'</div>';

							question.answers.forEach((answer, answerIndex) => {

								var answerClass = question.answerCats[answerIndex];

								sectionHtml += '<div class="data_col"><span class="btn ' + answerClass + '">' + answer + '</span></div>';
							})

				sectionHtml += '</div>';

				var displayNote = (question.goal == '' || !ShowingGoals) ? 'none' : 'block';
				var displayInput = (question.goal == '') ? 'inline-block' : 'none';

				sectionHtml += '<div class="row" id="goalLineRow_' + deeplinkStr + '" style="display: ' + displayNote + '">' +
									'<div class="col1 goalLine" id="goalLine_' + deeplinkStr + '">' + 
										'<span id="goalDisplayLine_' + deeplinkStr + '" onclick="openNote(\'' + deeplinkStr + '\')" />' +
											question.goal + 
										'</span>' + 
										'<input type="text" id="goalInputLine_' + deeplinkStr + '" ' + 
												'value="' + question.goal + '" placeholder="How will you take action?"' +
												'onblur="saveNote(\'' + deeplinkStr + '\')" onkeydown="keyupNote(event, \'' + deeplinkStr + '\')"' +
												' style="display: ' + displayInput + '" />' + 
									'</div>' + 
								'</div>';
			}
		);
		

		sectionHtml += '</div></div>';

		if(displayingAtLeastOne) html += sectionHtml;

	});

	html += '</div>';

	document.getElementById('canvas').innerHTML = html;

	


	document.getElementById('innerCanvas').style.height = (window.innerHeight - 310) + 'px';
}






// COLLAPSE / EXPAND OFF OF TOOLBAR
function toggleSections(){
	
	// If the sections are collapsed
	if(SectionsCollapsed){

		// change text on control
		document.getElementById('collapseCtrl').innerHTML = 'collapse';

		// close all the sections
		var questionSections = document.getElementsByClassName('reccap_section_body');
		for(var sectionIndex = 0; sectionIndex < questionSections.length; sectionIndex++){
			questionSections[sectionIndex].style.display = 'block';
			reccap_records.sections[sectionIndex].open = true;
		}

		SectionsCollapsed = false;

	}

	// If the sections are not collapsed (default)
	else {

		// change text on control
		document.getElementById('collapseCtrl').innerHTML = 'expand';

		// close all the sections
		var questionSections = document.getElementsByClassName('reccap_section_body');
		for(var sectionIndex = 0; sectionIndex < questionSections.length; sectionIndex++){
			questionSections[sectionIndex].style.display = 'none';
			reccap_records.sections[sectionIndex].open = false;
		}

		SectionsCollapsed = true;
	}

	document.getElementById('innerCanvas').style.height = (window.innerHeight - 310) + 'px';
}


// COLLAPSE / EXPAND OFF OF SECTION HEADER
function toggleSection(sectionIndex) {


	// select section of questions HTML
	var sectionQuestions = document.getElementById('reccap_section_body_' + sectionIndex);


	// show / hide
	if(sectionQuestions.style.display == 'block'  || sectionQuestions.style.display == '') {
		sectionQuestions.style.display = 'none';

		// update data model
		reccap_records.sections[sectionIndex].open = false;
	}
	else if(sectionQuestions.style.display == 'none') {
		sectionQuestions.style.display = 'block';

		// update data model
		reccap_records.sections[sectionIndex].open = true;
	}


	document.getElementById('innerCanvas').style.height = (window.innerHeight - 310) + 'px';
}





// NOTE STUFF
noteToggle = function(deeplinkStr){
	
	var noteStyle 	= document.getElementById('goalLineRow_' + deeplinkStr).style;

	if(noteStyle.display == 'none') {
		noteStyle.display = 'block';
		var inputNode = document.getElementById('goalInputLine_' + deeplinkStr);
		if(inputNode.style.display == 'inline-block') inputNode.focus();
	}
	else {		
		saveNote(deeplinkStr);
		noteStyle.display = 'none';
	}
}

openNote = function(deeplinkStr){
	var inputNode = document.getElementById('goalInputLine_' + deeplinkStr);
	inputNode.style.display = 'inline-block';
	inputNode.focus();

	document.getElementById('goalDisplayLine_' + deeplinkStr).style.display = 'none';
}

keyupNote = function(event, deeplinkStr){


	// are we paging through the interface?
	var direction = false;
	if(event.key == 'Enter' || event.key == 'ArrowDown' || event.key == 'Tab' ) direction = 'forward';
	if(event.key == 'ArrowUp') direction = 'back';
	if(direction) {	
		event.preventDefault(); // handle tab (default behavior is a blur)
		

		// save the one you're leaving
		saveNote(deeplinkStr);


		// select the next one \ previous one
		var i = QuestionsDisplayingArray.indexOf(deeplinkStr);
		if(direction == 'forward'){
			i++;
			if(i == QuestionsDisplayingArray.length) i = 0;
		}
		if(direction == 'back'){
			i--;
			if(i == -1) i = QuestionsDisplayingArray.length - 1;
		}		
		var newDeepLink = QuestionsDisplayingArray[i];


		// open the selected input
		document.getElementById('goalLineRow_' + newDeepLink).style.display = 'block';
		openNote(newDeepLink);

		
		// expand all the questions (prevents you from skipping to a hidden question in a collapsed setion)
		SectionsCollapsed = true;
		toggleSections();

	}
}

saveNote = function(deeplinkStr){

	var inputNode 	= document.getElementById('goalInputLine_' + deeplinkStr);
	var textNode = document.getElementById('goalDisplayLine_' + deeplinkStr);


	var noteText 		= inputNode.value;
	var sectionNum 		= deeplinkStr.split('_')[0];
	var questionNum 	= deeplinkStr.split('_')[1];


	// UPDATE DATA MODEL
	var question = reccap_records.sections[sectionNum].questions[questionNum];
	question.goal = noteText;


	// UPDATE SERVER VIA AJAX
	console.log('Calling Save Note API: ' + sectionNum + ' ' + questionNum + ' ' + noteText);


	// UPDATE HTML
	if(noteText == '') {
		document.getElementById('noteTrigger_' + deeplinkStr).classList.remove('goalset');
		return;
	}

	textNode.innerHTML = noteText; 
	textNode.style.display = 'inline-block';
	inputNode.style.display = 'none';

	document.getElementById('noteTrigger_' + deeplinkStr).classList.add('goalset');



}

showGoals = function(){
	ShowingGoals = document.getElementById('showGoals_trigger').checked;
	Reccap_writeAssessmentHTML();
}

sortResults = function(dateIndex){

	// if it's the column that's already selected, flip asc / desc
	if(dateIndex == SortCol){
		SortOrder = (SortOrder == 'desc') ? 'asc' : 'desc';
	}


	// sort data model
	Reccap_sortByDate(dateIndex, SortOrder);


	// redraw html
	Reccap_writeAssessmentHTML();


	// change chart header state


	// if it's a new column, keep the asc / desc, sort by the new column
	document.getElementById('colheader_' + dateIndex).classList.add(SortOrder);

	SortCol = dateIndex;
}




// This script only loads once the page is loaded - so call DOM stuff inline, not onload (since it's already loaded)
Reccap_writeAssessmentHTML();
toggleSections();

window.onresize = function(){
	document.getElementById('innerCanvas').style.height = (window.innerHeight - 310) + 'px';
}

