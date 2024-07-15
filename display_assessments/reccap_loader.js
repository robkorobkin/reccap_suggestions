



ReccapLoader_readFile = function(){
	var file = document.getElementById("sourcefileNode").files[0];
	if (file) {
		var reader = new FileReader();
		reader.readAsText(file, "UTF-8");
		reader.onload = function (evt) {
			var dataFileStr = evt.target.result;
			ReccapLoader_processFile(dataFileStr);
		}
		reader.onerror = function (evt) {
			console.log("error reading file");
		}
	}
}

ReccapLoader_loadDummy = function(){
	reccap_dummy = reccap_dummy.replaceAll("---", "\n");
	ReccapLoader_processFile(reccap_dummy);
	loadClient(5110437);
}


ReccapLoader_processFile = function(dataFileStr){
	var dataFileArray = CSVToArray(dataFileStr, ",");
	reccap_data = dataFileArray;
	datafileKeys = reccap_data[0];

	// // COMPILE LIST OF PEOPLE
	test_takers = {};
	test_takersArray = [];

	reccap_data.forEach(assessment => {
		var client_id = assessment[datafileKeys.indexOf('client_id')];
		var client_name = assessment[datafileKeys.indexOf('client_name')];
		if(!(client_id in test_takers) && (client_name != 'client_name')){
			test_takers[client_id] = client_name;
			test_takersArray.push({
				client_id : client_id,
				client_name : client_name
			})
		}
	})


	test_takersArray.sort(function(a,b){ return a.client_name > b.client_name})


	var client_selector_html = '<option>Select a resident...</option>';
	test_takersArray.forEach(client => {
		client_selector_html += '<option value="' + client.client_id + '">' + client.client_name + '</option>';		
	})
	document.getElementById('clientSelector').innerHTML = client_selector_html;

	document.getElementById('clientSelector').style.display = 'block';
	document.getElementById('sourcefileNode').style.display = 'none';

}




// ref: http://stackoverflow.com/a/1293163/2343
// This will parse a delimited string into an array of
// arrays. The default delimiter is the comma, but this
// can be overriden in the second argument.
function CSVToArray( strData, strDelimiter ){
    // Check to see if the delimiter is defined. If not,
    // then default to comma.
    strDelimiter = (strDelimiter || ",");

    // Create a regular expression to parse the CSV values.
    var objPattern = new RegExp(
        (
            // Delimiters.
            "(\\" + strDelimiter + "|\\r?\\n|\\r|^)" +

            // Quoted fields.
            "(?:\"([^\"]*(?:\"\"[^\"]*)*)\"|" +

            // Standard fields.
            "([^\"\\" + strDelimiter + "\\r\\n]*))"
        ),
        "gi"
        );


    // Create an array to hold our data. Give the array
    // a default empty first row.
    var arrData = [[]];

    // Create an array to hold our individual pattern
    // matching groups.
    var arrMatches = null;


    // Keep looping over the regular expression matches
    // until we can no longer find a match.
    while (arrMatches = objPattern.exec( strData )){

        // Get the delimiter that was found.
        var strMatchedDelimiter = arrMatches[ 1 ];

        // Check to see if the given delimiter has a length
        // (is not the start of string) and if it matches
        // field delimiter. If id does not, then we know
        // that this delimiter is a row delimiter.
        if (
            strMatchedDelimiter.length &&
            strMatchedDelimiter !== strDelimiter
            ){

            // Since we have reached a new row of data,
            // add an empty row to our data array.
            arrData.push( [] );

        }

        var strMatchedValue;

        // Now that we have our delimiter out of the way,
        // let's check to see which kind of value we
        // captured (quoted or unquoted).
        if (arrMatches[ 2 ]){

            // We found a quoted value. When we capture
            // this value, unescape any double quotes.
            strMatchedValue = arrMatches[ 2 ].replace(
                new RegExp( "\"\"", "g" ),
                "\""
                );

        } else {

            // We found a non-quoted value.
            strMatchedValue = arrMatches[ 3 ];

        }


        // Now that we have our value string, let's add
        // it to the data array.
        arrData[ arrData.length - 1 ].push( strMatchedValue );
    }

    // Return the parsed data.
    return( arrData );
}

