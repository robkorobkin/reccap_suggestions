

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
					'answers' : ['Yes', 'Yes']
				},
				{
					'text' : 'Is satisfied with the involvement with family',
					'answers' : ['Yes', 'Yes']
				},

			]				
		}

	]

}




// WRITE ASSESSMENT HTML
// 	- READS - reccap_records object from global namespace, schema above
//	- GENERATES - Dynamic HTML for GUI canvas, filtering against the current state of the controls
// 	- POPULATES - Canvas element with the HTML generated

Reccap_writeAssessmentHTML = function (){

	var html = '';


	reccap_records.sections.forEach(reccap_section => { 

		displayingAtLeastOne = false;

		sectionHtml = 

			'<div class="reccap_section">' +
				'<div class="header">' +
					'<div class="col1">' + reccap_section.title + '</div>';

					reccap_records.test_dates.forEach(date => sectionHtml += '<div class="data_col date">' + date + '</div>');
		
		sectionHtml +=	'</div>' +
				'<div class="body">';


		reccap_section.questions.forEach(question => {

				if(!Reccap_testQuestion(question)) return;

				displayingAtLeastOne = true;

				sectionHtml += '<div class="row">' +
							'<div class="col1">' + question.text + '</div>';

							question.answers.forEach(answer => {
								sectionHtml += '<div class="data_col"><span class="btn ' + answer + '">' + answer + '</span></div>';
							})

				sectionHtml += '</div>';
			}
		);

		sectionHtml += '</div></div>';

		if(displayingAtLeastOne) html += sectionHtml;

	});

	document.getElementById('canvas').innerHTML = html;
}


// RECCAP - Test Question
// 	@param 	- reccap_question object (schema above)
// 	READS 	- current view state from controls HTML
// 	TESTS 	- reccap_question against view state
// 	RETURNS - true/false if question should display	


function Reccap_testQuestion(question) {

	var reccap_viewState = {
		search_string : document.getElementById('search_str').value.toUpperCase(),
		selected_set : document.getElementById('filter1').value,
		change_status : document.getElementById('filter2').value
	}

	var goAhead = true;


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
		if(question.answers.slice(-1) != 'Yes') return false;
	}
	if(selected_set == 'Current Challenges'){
		if(question.answers.slice(-1) != 'No') return false;
	}
	if(selected_set == 'Original Successes'){
		if(question.answers[0] != 'Yes') return false;
	}
	if(selected_set == 'Original Challenges'){
		if(question.answers[0] != 'No') return false;
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



	// if you made it to here, green light
	return true;

}

window.onload = function(){
	Reccap_writeAssessmentHTML();
}

