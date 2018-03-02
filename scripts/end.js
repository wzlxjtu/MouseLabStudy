$(document).ready(function(){
	$('#btn_endsession').click(function () {
		var outputFile = "Participant Summary\n"
		outputFile = outputFile + "Start Time: " + localStorage["startTime"] + "\n";
		outputFile = outputFile + "Session Timestamps: " + localStorage["timeStamps"] + "\n";
		outputFile = outputFile + "CAT-relaxed Number of Correct and Wrong: " + localStorage["catlog_relaxed"] + "\n";
		outputFile = outputFile + "CAT-stressed Number of Correct and Wrong: " + localStorage["catlog_stressed"] + "\n";
		outputFile = outputFile + "FCWT-relaxed Number of Correct and Wrong: " + localStorage["fcwtlog_relaxed"] + "\n";
		outputFile = outputFile + "FCWT-stressed Number of Correct and Wrong: " + localStorage["fcwtlog_stressed"] + "\n";
		outputFile = outputFile + "-------------------ANSWER-CAT-RELAXED-------------------\n";
		outputFile = outputFile + localStorage["answerCatLog_relaxed"] + "\n";
		outputFile = outputFile + "-------------------ANSWER-CAT-STRESSED-------------------\n";
		outputFile = outputFile + localStorage["answerCatLog_stressed"] + "\n";
		outputFile = outputFile + "-------------------MOUSE-CAT-RELAXED-------------------\n";
		outputFile = outputFile + localStorage["mouseCatLog_relaxed"] + "\n";
		outputFile = outputFile + "-------------------MOUSE-CAT-STRESSED-------------------\n";
		outputFile = outputFile + localStorage["mouseCatLog_stressed"] + "\n";
		outputFile = outputFile + "-------------------ANSWER-FILE-RELAXED-------------------\n";
		outputFile = outputFile + localStorage["answerFileLog_relaxed"] + "\n";
		outputFile = outputFile + "-------------------ANSWER-FILE-STRESSED-------------------\n";
		outputFile = outputFile + localStorage["answerFileLog_stressed"] + "\n";
		outputFile = outputFile + "-------------------MOUSE-FILE-RELAXED-------------------\n";
		outputFile = outputFile + localStorage["mouseFileLog_relaxed"] + "\n";
		outputFile = outputFile + "-------------------MOUSE-FILE-STRESSED-------------------\n";
		outputFile = outputFile + localStorage["mouseFileLog_stressed"] + "\n";
		
		
		
		var textFile = null,
		makeTextFile = function (text) {
			var data = new Blob([text], {type: 'text/plain'});
			
			if (textFile !== null) {
			  window.URL.revokeObjectURL(textFile);
			}

			textFile = window.URL.createObjectURL(data);
			return textFile;
		};		
		
		var filename = "participant"; 
		
		var link = $("#summary");
		link.attr('download', filename);
		link.attr('href', makeTextFile(outputFile));
		link.css("visibility", "visible");
	});	
});