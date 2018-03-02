
$(document).ready(function(){
    
	var targetNumber = 50;
	
    // Loading data from memory
    var round = localStorage.getItem("Round");
    // Determining if this session is within the relaxed or stressed block
    var relaxedOrStressed = round == 4 ? "relaxed" : "stressed";
    var congruent = round == 4 ? true : false;
    var mousedata = "";
    var pool = ["BLUE", "GREEN", "ORANGE", "PURPLE", "RED", "YELLOW"];
    var correct = 0, wrong = 0;
    localStorage.setItem('fcwtlog_' + relaxedOrStressed, [correct,wrong]);
    var mousePos = { x: -1, y: -1 };
	var answerdata = "";
    var startTime = localStorage.getItem("startTime");
    var lastDropTime = -1;
	localStorage.setItem("timeStamps",localStorage.getItem("timeStamps") + ((new Date).getTime() - startTime) + ",");
	
    $(".close").click(function(){
        $(".modal").hide(); // When the user clicks on <span> (x), close the modal
    });
    
    // droppable actions
    $(".ui-widget-header").droppable({
        drop: function(event, ui) {
            $(this).css('background-color', 'white');
			var dropTime = lastDropTime;
            if ($(ui.draggable).data("content").answer == this.id) {
                correct++;
				answerdata += dropTime+","+'correct\n';
            }
            else {
                wrong++;
                if (!congruent) {
                    $("#alarm").get(0).play();
                    $("#performanceContainer").animate({color: 'red'},100).animate({color: 'black'},3000);
                }
				answerdata += dropTime+","+'wrong\n';
            }
			localStorage.setItem('answerFileLog_' + relaxedOrStressed, answerdata);
			localStorage.setItem('fcwtlog_' + relaxedOrStressed, [correct,wrong]);
			
            $("#correct").html(correct);
            $("#wrong").html(wrong);
            $("#total").html(correct+wrong);
            $(ui.draggable).remove();
            
			if (correct == targetNumber) {
				localStorage.setItem("timeStamps",localStorage.getItem("timeStamps") + ((new Date).getTime() - startTime) + ",");
				alert("Session Finished!")
				if (localStorage.getItem("Round") == 4) {
					localStorage.setItem("Round",5);
					window.location = "fileSystem.html";
				}
				else
					window.location = "end.html";
			}
        },
        over: function(event, ui) {
           $(this).css('background-color', '#C6E2FF');
        },
        out: function(event, ui) {
           $(this).css('background-color', 'white');
        }
    })
    .mouseenter(function() {
        $(this).css('background-color', '#C6E2FF');
    })
    .mouseleave(function() {
        $(this).css('background-color', 'white');
    });
    
    // create draggable elements
    for(i=0; i<150; i++) {
        $('<div>')
        .attr('id', i)
        .addClass("ui-widget-content")
        .appendTo('#sourceContainer')
        .prepend('<span><img class="imageIcon" src="resources/imageIcon.jpg">'+' '+('000'+i).slice(-3)+'.jpg</span>')
        .draggable({
            opacity: 0.35,
            revert: "invalid",
            revertDuration: 200,
            zIndex: 100,
            stack: ".products",
            helper: "clone",
            create: function(event, ui) {
                var select = Math.floor(Math.random() * 2); // 0 means select color, 1 means select word
                var color = pool[Math.floor(Math.random() * 6)];
                var word = congruent ? color : pool[Math.floor(Math.random() * 6)];
                $(this).data("content", {
                    color: color,
                    word: word,
                    select: select,
                    answer: select == 0 ? color : word
                });
            }
        })
        .dblclick(function(){
            $(".modal").show();
            $(".target").html($(this).data("content").word).css({'color': $(this).data("content").color});
            $("#option").html($(this).data("content").select == 0 ? "COLOR" : "WORD");
            if (congruent) $("#option").html("WORD");
        })
        .mouseenter(function() {
            $(this).css('background-color', '#C6E2FF');
        })
        .mouseleave(function() {
            $(this).css('background-color', 'white');
        });
    }
    
    // log mouse events
    $(this).mousemove(function(event) {
        mousePos.x = event.pageX;
        mousePos.y = event.pageY;
        var milliseconds = (new Date).getTime() - startTime;
        //$('#mouseInfo').html(milliseconds+","+mousePos.x+","+mousePos.y+',move');
        mousedata += milliseconds+","+mousePos.x+","+mousePos.y+',0\n';
        localStorage.setItem('mouseFileLog_' + relaxedOrStressed, mousedata);
    })
    .mousedown(function() {
        var milliseconds = (new Date).getTime() - startTime;
        // event.which == 1 indicates the left click
        if (event.which == 1) {
            //$('#mouseInfo').html(milliseconds+","+mousePos.x+","+mousePos.y+',down');
            mousedata += milliseconds+","+mousePos.x+","+mousePos.y+',2\n';
            localStorage.setItem('mouseFileLog_' + relaxedOrStressed, mousedata);
        }
        
    })
    .mouseup(function() {
        var milliseconds = (new Date).getTime() - startTime;
        if (event.which == 1) {
            //$('#mouseInfo').html(milliseconds+","+mousePos.x+","+mousePos.y+',up');
            mousedata += milliseconds+","+mousePos.x+","+mousePos.y+',1\n';
            localStorage.setItem('mouseFileLog_' + relaxedOrStressed, mousedata);
			lastDropTime = milliseconds;
        }
    });
})