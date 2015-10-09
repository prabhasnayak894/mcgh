var stack=null;/*for custom undo/redo*/
var page= null;
var gradedcounter=0;
var mode="";
var util = new Util();
var message = new Messages();
var question = new Question({qId:1});
var gtCommon = new GTCommon({id:"clr-palette"});
var MODE_TEST           =     "test";
var MODE_PREGRADE       =     "sample";
var MODE_PREVIEW        =     "preview";
var MODE_POST_TEST      =     "review";
var MODE_DESIGN         =     "design";
var POLICY_INDICATOR = EZ.policy("p_indicators");
var POLICY_FEEDBACK = 'feedback';//EZ.policy("p_posttest");
var ROLE;
var currentDropElement;
    
function startApp(theState) {
	if(theState!=undefined && theState!=''){
		question.deserialize(theState);
	}
	if(EZ.mode==MODE_DESIGN){
		var html = util.getTemplate({url : "views/ft_author_design.html"});
		$("#loadingImg").hide();
		$("#modalDivId").hide();
		$("#wrapper").html(html);
		question.mode= MODE_DESIGN;
		
		/* code for handling copy functionality */
		$("#menubarcopyBtn").on('click', function (e) {
	    	e.preventDefault();	    		
		}).zclip({
	        path: 'http://www.steamdev.com/zclip/js/ZeroClipboard.swf',
	    	copy: function () {
	        	var selected_text = "";
	        	var iframe = window.parent.document.getElementById("Q_EXTERNAL");
	        	//get previous focused element from iframe
	        	if(typeof iframe.contentWindow.prevFocus != "undefined"){
	        		selected_text = getIframeSelectionText(iframe);
	        	}   		  	    
	        	return selected_text;
	    	}
		});
		
		attachUndoRedo();
		
		//question.setActivePage(question.pages.length>0?question.pages[0]:null);
		question.setActivePage(question.activePage==null?question.pages[0]:question.activePage);
		if(question.pages.length==0){
			question.addNewPage();
		}
		page=question.activePage;
		$("#formToolCanvasId").wysiwyg();
		
		function GetAllElementsAt(y) {
			var cur;
			$('.selectedComp').remove();
		    $(".pageSection").map(function() {
		        var offset = $(this).offset();
		        var t = offset.top;
		        var h = $(this)[0].clientHeight;
		        var maxy = t + h;
		        if(y <= maxy && y >= t) {
		        	cur = $(this);
		        	$('<div class="selectedComp"></div>').insertAfter(this);
		        	return;
		        }
		    });
		    return cur;
		}
		
		$(".dragComponent").draggable({		
	        revert: false,
	        opacity: 0.4,
			helper: "clone",
			drag: function(event, ui) {
				currentDropElement = GetAllElementsAt(event.clientY);
			}
	   });

	   $( "#formToolCanvasId" ).droppable({
			 drop: function( event, ui ) {
				$(".allComponent").css("visibility","");
				 switch(ui.draggable[0].id){
				 case "checkbox":
					 question.activePage.addCheckBoxComponent(event);
					 break;
				 case "multiplechoice":
					 question.activePage.addMultipleChoiceComponent(event);
					 break;
				 case "scale":
					 question.activePage.addScaleComponent(event);
					 break;
				 case "inputField":
					 question.activePage.addInputFieldComponent(event);
					 break;
				 case "basictable":
					 question.activePage.addTableComponent(event);
					 break;
				default:
					break;
				 }
			}
		 });
	  		  gtCommon.colorPickerLayout();
	  		  
	  		$("#canvasWidth").val(frameWidth);  
	  		$("#canvasHeight").val(frameHeight); 
	  		//$("#canvas-wrap").css('min-height',frameHeight+'px');
	  		  gtCommon.drawRuler();
  		
  		$("#formToolCanvasId").resize(function(e){
  	        //$("#canvasWidth").val(jQuery(this).width());
  	        if(jQuery(this).height()>frameHeight){
  	          $("#canvasHeight").val(Math.ceil(jQuery(this).height()));
  	        //$("#canvas-wrap").css('min-height',Math.ceil(jQuery(this).height())+'px');
  	          gtCommon.drawRuler();
  	        }else{
  	          $("#canvasHeight").val(frameHeight);
  	        //$("#canvas-wrap").css('min-height',frameHeight+'px');
  	         gtCommon.drawRuler();
  	        }
  	     
  	     });
  	     
  	     $('#btn-fake-import').click(function(){
			$('#files').trigger('click');
		});
		
		$('#files').on('change', function(e){
			var fileTobeRead = document.getElementById('files').files[0];
			var fileReader = new FileReader();

			fileReader.onload = function(event) {
			
				if($("#formToolCanvasId").html()!="")
				{			
					new Modal(
		  	   			      {
		  	   			    	  id : 1,headingText : "Validation Error",
		  	   			    	  containtText : "Importing file will lost existing data!",
		  	   			    	  okActionEvent:function(){
		  	   			    		$("#FTState").val(event.target.result);
		  							startApp(event.target.result);
		  	   			    	  }
		  	   			      }).getConfirmationModalImport();
				}
				else
				{
					$("#FTState").val(event.target.result);
					startApp(event.target.result);				
				}
		    };
		    
		    fileReader.readAsText(fileTobeRead); 
		});
	}else if(EZ.mode==MODE_PREVIEW){
		$("#wrapper").html(util.getTemplate({url : "views/local_test_connect_view.html"}));
		/*adjustment done to hide scroll bars*/
		//$("#wrapper").css({"position":"absolute", "top":"0", "bottom":"0", "right":"-18px"});
		$("#wrapper").css({"position":"absolute", "overflow-y":"auto", "top":"0", "bottom":"0", "right":"-18px"});
		var html = util.getTemplate({url : "views/ft_instructor_preview.html"});
		$("#loadingImg").hide();
		$("#modalDivId").hide();
		html= decodeURIComponent(escape(html));
		$("#wrapper").append(html);
		question.mode= MODE_PREVIEW;
		ROLE=EZ.policy("role");
		question.setActivePage(question.pages.length>0?question.pages[0]:null);
		var spacesToAdd = 5;
		var biggestLength = 0;
		$(".dropDownOption option").each(function(){
		var len = $(this).text().length;
		    if(len > biggestLength){
		        biggestLength = len;
		    }
		});
		var padLength = biggestLength + spacesToAdd;
		$(".dropDownOption option").each(function(){
			if( $(this).text().trim().length>0){				
				 var parts = $(this).text().split('~');
				    var strLength = parts[0].length;
				    for(var x=0; x<(padLength-strLength); x++){
				        parts[0] = parts[0]+' '; 
				    }
				    $(this).text(parts[0].replace(/ /g, '\u00a0')+parts[1]).text;
				
			}
		   
		});
		$("#formToolInstructorId a").attr("target","_blank");
		$('.overallFeedOpen ').each(function (){
			$.each($(this).find('font'),function(index,fontEle ){
				$(fontEle).css('line-height', $(fontEle).css('font-size'));
			});
			
        });
		$('.feedBackOpen ').each(function (){
			$.each($(this).find('font'),function(index,fontEle ){
				$(fontEle).css('line-height', $(fontEle).css('font-size'));
			});
			
        });
		//var ht=0;			
		
		var ht = $("#formToolInstructorId").height();
		//alert("ht"+ht);
		
		var myHeight= 900;
		
		if(ht>900)
		{
		 myHeight = ht+150;
		}		
		console.log(myHeight);
		EZ.resize(1125,myHeight);
	}else if(EZ.mode==MODE_TEST){
		$("#wrapper").html(util.getTemplate({url : "views/local_test_connect_view.html"}));
		/*adjustment done to hide scroll bars*/
		//$("#wrapper").css({"position":"absolute", "top":"0", "bottom":"0", "right":"-25px"});
		//$("#wrapper").css({"position":"absolute", "overflow-y":"auto", "top":"0", "bottom":"0", "right":"-25px"});//commented for issue 1624 scroll bar
		var html = util.getTemplate({url : "views/ft_student.html"});
		$("#loadingImg").hide();
		$("#modalDivId").hide();		
		try{
		  html = decodeURIComponent(escape(html));
		}catch(exp){
		  console.log(exp);
		}		
		$("#wrapper").append(html);
		question.mode= MODE_TEST;
		question.setActivePage(question.pages.length>0?question.pages[0]:null);
		$("#formToolStudentId a").attr("target","_blank");	
		
		//ht=question.activePage.components.length*180;		
		var myHeight= 900;
		if(jQuery(this).height()>900)
		 myHeight = jQuery(this).height();
		EZ.resize(1120,myHeight);	
		$('.stdQueLabel').each(function (){
			$.each($(this).find('font'),function(index,fontEle ){
				$(fontEle).css('line-height', $(fontEle).css('font-size'));
			});
        });		
	}
	else if(EZ.mode==MODE_PREGRADE){
		$("#wrapper").html(util.getTemplate({url : "views/local_test_connect_view.html"}));
		/*adjustment done to hide scroll bars*/
		//$("#wrapper").css({"position":"absolute", "top":"0", "bottom":"0", "right":"-25px"});
		$("#wrapper").css({"position":"absolute", "overflow-y":"auto", "top":"0", "bottom":"0", "right":"-25px"});
		var html = util.getTemplate({url : "views/ft_checkmywork.html"});
		$("#loadingImg").hide();
		$("#modalDivId").hide();
		$("#wrapper").append("This feature is not supported for this content");
		question.mode= MODE_PREGRADE;
		question.setActivePage(question.pages.length>0?question.pages[0]:null);
	}else if(EZ.mode==MODE_POST_TEST){
		$("#wrapper").html(util.getTemplate({url : "views/local_test_connect_view.html"}));
		/*adjustment done to hide scroll bars*/
		//$("#wrapper").css({"position":"absolute", "top":"0", "bottom":"0", "right":"-25px"});
		$("#wrapper").css({"position":"absolute", "overflow-y":"auto", "top":"0", "bottom":"0", "right":"-25px"});
		var html = util.getTemplate({url : "views/ft_postsubmission_review.html"});
		$("#loadingImg").hide();
		$("#modalDivId").hide();
		try{
		  html = decodeURIComponent(escape(html));
		}catch(exp){
		  console.log(exp);
		}
		$("#wrapper").append(html);
		question.mode= MODE_POST_TEST;
		question.setActivePage(question.pages.length>0?question.pages[0]:null);
		$("#formToolPostSubmissionId a").attr("target","_blank");
		//var ht=0;		
		var ht = $("#formToolPostSubmissionId").height();
		//alert("MODE_POST_TEST"+ht);
		var myHeight= 900;
		
		if(ht>900)
		{
		 myHeight = ht+150;
		}		
		EZ.resize(1125,myHeight);	
		$("#formToolPostSubmissionId").text().myReplace('Â','');
		$("#formToolPostSubmissionId").text().myReplace('&#160;','');
		
		$("#formToolPostSubmissionId").text().fakeReplace('Â','');
		$("#formToolPostSubmissionId").text().fakeReplace('&#160;','');
		/*
		$( ".prevQuestOpts a" ).click(function() {
		 $( this ).toggleClass( "feedOpen" );
		 var parentElementX = $(this).closest('.prevQuestOpts a');
		 $(parentElementX).closest('.prevQuestOpts').find(".feedBackOpen").not(parentElementX).slideToggle( "slow" );
		});*/
		$('.overallFeedOpen ').each(function (){
			$.each($(this).find('font'),function(index,fontEle ){
				$(fontEle).css('line-height', $(fontEle).css('font-size'));
			});
        });
		$('.feedBackOpen ').each(function (){
			$.each($(this).find('font'),function(index,fontEle ){
				$(fontEle).css('line-height', $(fontEle).css('font-size'));
			});
			
        });
	}  
}

String.prototype.fakeReplace=function(str, newstr) {
    return this.split(str).join(newstr);
};

String.prototype.myReplace = function(pattern, nw) {
	   var curidx = 0, len = this.length, patlen = pattern.length, res = "";
	   while(curidx < len) {
	       var nwidx = this.indexOf(pattern, curidx);
	       console.log(nwidx);
	       if(nwidx == -1) {
	           break;
	       }
	       res = res + this.substr(curidx, nwidx - curidx);
	       res = res + nw;
	       curidx = nwidx + patlen;
	   }
	   return res;
	};
function startAppInConnectView(theState){
	var html = util.getTemplate({url : "views/coming_soon.html"});
	$("#loadingImg").hide();
	$("#modalDivId").hide();
	$("#wrapper").html(html);
}

(function ($) {
	$(document).on('change keydown keypress input', '*[data-placeholder]', function() {
		if (this.textContent) {
			this.setAttribute('data-div-placeholder-content', 'true');
		}
		else {
			this.removeAttribute('data-div-placeholder-content');
		}
		
	});
	
})(jQuery);

$(document).on("keypress",function(e){
	//console.log("key is pressed prevent key press");
	if($(".reveal-modal").css('visibility') == 'visible'){
		if (e.keyCode == 27){
			 $("#modalDivId").hide();
			 $(".close-reveal-modal").trigger('click');
		}
		e.preventDefault();
		return false;
	}
	if($("#myModal").css('display') == 'block'){
		if (e.keyCode == 27){
			//alert("escape");
			e.preventDefault();
			return false;
		}
	}
});


function clickIMDone(){ 
	$(".loadingImg").show();

	util.reArrangeComponent(question.activePage);
	
	if(EZ.mode==MODE_TEST){
		var i, 
			j, 
			k;
		i = 0;
		for (i in question.pages) {
			var j = 0;
			var newArray = [];
			for (j in question.pages[i].reCompArray) {
				k = 0;
				for(k in question.pages[i].components) {
					if(question.pages[i].reCompArray[j].id == question.pages[i].components[k].id)
					newArray[j] = question.pages[i].components[k];
				}
			}
			question.pages[i].reCompArray = newArray;
		}
		 //setTimeout(function(){
			 $("#score").val(question.calculateTotalScore());
			 $("#FTState").val(question.serialize());
			 $(".loadingImg").hide();
		 //}
		 //,timeout+100);	 
	}
	else if(EZ.mode==MODE_DESIGN){
		 setTimeout(function(){
			 util.gatherData();
			 	 var validator=question.validateQuestion();
				if(!validator.flag){
					$("#FTState").val(question.serialize());
					//question.setActivePage(question.pages.length>0?question.pages[0]:null);
					$(".loadingImg").hide();
				}else{
					$(".loadingImg").hide();
					if(validator.completeFlag){
						validator.errorMsg += "<br> All fields must contain valid text.";
					}
					var closeActionEventFunction = validator.field!=undefined?function(){
							$('#'+validator.field).trigger("focus");
					}:null; 
					question.displayMessageModal("Validation Error", validator.errorMsg, closeActionEventFunction);
				}
		 },timeout+100);
	}
}

function clickColorPicker(ok){
	if(ok){
		var hexCode = $("#colorPickerValueId").val();
		$("#selectedColorValueId").val(hexCode);
		if($("#typeOfPalletId").val()==true || $("#typeOfPalletId").val()=='true'){
			$("#colorButtonId").trigger( "click" );
		}else{
			$("#backColorButtonId").trigger("click");
		}
	}
	for(var i=0;i<$.jPicker.List.length;i++){
		$.jPicker.List[i].destroy();
		$('span.jPicker').remove();
	}
	$("#"+gtCommon.id).hide();
}
$(document).click(function(event) {
    if (event.target !== $("#"+gtCommon.id)) {
    	$("#"+gtCommon.id).hide();
    }
});

function showHelpModal(infoType){
	var heading='';
	var text ='';
	if(infoType=='part'){
		heading = message.getPartHeading();
		text= message.getPartMsg();
	}else if(infoType=='size'){
		heading = message.getSizeHeading();
		text= message.getSizeMsg();
	}else if(infoType=='compType'){
		heading =message.getCompTypeHeading();
		text=message.getCompTypeMsg();
	}
	 new Modal({id : 1,headingText :heading,containtText :text}).openHelpModal();
}
function changeFont(value){
	var arr = value.split("_");
	$("#fontValueId").val(arr[1]+" pt");
	$("li span").removeClass("glyphicon glyphicon-ok glyphicon-posi");
	$("a#"+value).addClass("btn-info");
	$("a#"+value+" span").addClass("glyphicon glyphicon-ok glyphicon-posi");
}

function changeIndentOutdent(value){
	$("#indentOutdentMeasure").val(value+" pt");
	$("#indentOutdentMeasure").parent().find("li span").removeClass("glyphicon glyphicon-ok glyphicon-posi");
	var currentlink = $("#indentOutdentMeasure").parent().find("a#indentOutdent_"+value);
	currentlink.addClass("btn-info");
	currentlink.find("span").addClass("glyphicon glyphicon-ok glyphicon-posi");
}
function applylineSpacing(spaceVal){
	spaceVal = (spaceVal != null) ? spaceVal : "";	
	$("#linespaceMeasure").val(spaceVal+" pt");	
	$("#linespaceMeasure").parent().find("ul li span").removeClass("glyphicon glyphicon-ok glyphicon-posi");		
	var link_id = "linespace_"+spaceVal.replace(".","pt");
	var currentlink = $("#linespaceMeasure").parent().find("a#"+link_id);
	currentlink.addClass("btn-info");
	currentlink.find("span").addClass("glyphicon glyphicon-ok glyphicon-posi");
}
function changeBorder(value){
	$("#borderSelector").addClass("t-"+value);
}
function changeTimeout(time){
	timeout = time;
}
(function($) {
    $.fn.extend( {
        limiter: function(limit, elem) {
            
        }
    });
})(jQuery);
/* for getting selected text within iframe */
function getIframeSelectionText(iframe) {
    var win = iframe.contentWindow;
	var doc = iframe.contentDocument || win.document;

	if (win.getSelection) {
	  return win.getSelection().toString();
	} else if (doc.selection && doc.selection.createRange) {
	  return doc.selection.createRange().text;
	}
}
/* code for handling paste functionality */
var prevFocus;     
var caretPos = 0;
function pasteData(){
	if(typeof prevFocus != "undefined"){
        var prevHTML="", updatedHTMl = "";
       	prevHTML = $(prevFocus).text();

       	//if(prevHTML !== ""){
       		var clipboardText = window.ZeroClipboard.clients["1"].clipText;
       	    updatedHTMl = prevHTML.substring(0, caretPos) + clipboardText + prevHTML.substring(caretPos);
       	    $(prevFocus).text(updatedHTMl);
       	//}
       	$(prevFocus).trigger("change");
 		prevFocus = undefined;
    }
    return false;
}
/* check for chrome browser */
var isChrome = navigator.userAgent.toLowerCase().indexOf('chrome') > -1;
/*holding previous focused object*/
function focusHandler(obj){
	obj.click();
	prevFocus = obj;
	/*code to display line-height in toolbar*/
	var itsLinespaceBlock = $(obj).find("div.linespaceBlock");
	var pxLineHeight,pxfontSize;
	pxfontSize = parseFloat($(obj).css("font-size"));
	if(itsLinespaceBlock.length>0){		
		/*calculate line-height*/
		pxLineHeight = parseFloat($(itsLinespaceBlock[0]).css("line-height"));		
		displayLineHeight(pxLineHeight, pxfontSize);
	}else{
	 if($(obj).hasClass("inputDummyQuestionStem")){/*for question stem*/
		/*calculate line-height*/
		pxLineHeight = parseFloat($(obj).css("line-height"));
	 }else if($(obj).hasClass("inputDummy")){/*for answer stem*/
		/*calculate line-height*/
		pxLineHeight = parseFloat($(obj).css("line-height"));
	 }
	 displayLineHeight(pxLineHeight, pxfontSize);
	}
}
/*show linespace value in toolbar according to focus element */
function displayLineHeight(pxLineHeight, pxfontSize){
	if(pxLineHeight!=undefined && pxfontSize!=undefined){
		var lineHeightVal =  pxLineHeight /  pxfontSize;
		if(lineHeightVal>0 && !isNaN(lineHeightVal)){
			/*convert to string with decimal values*/
			var dummyVal = lineHeightVal.toFixed(2);
			if(dummyVal=="1.15"){
			  lineHeightVal = dummyVal;	
			}else{
			  lineHeightVal =lineHeightVal.toFixed(1);
			}
						
			applylineSpacing(lineHeightVal);
		}
	}
}
/*holding previous focused object's carret position*/
function mouseupKeyupHandler(obj){
  caretPos = getCaretCharacterOffsetWithin(obj);  
  gCaretPos = caretPos;
  if(isChrome){/*to remove unwanted tags from editor in chrome*/
	 if(obj!=undefined){
	   if(obj.textContent.length==0){
		 $(obj).empty();/*to remove unwanted tags from editor when there is no text*/
	   }
	 }
  }
}
/*to handle undo-redo data*/
function keyPressHandler(obj){
	var text = $(obj),
	startValue = text.html(),
	timer;
	clearTimeout(timer);
			timer = setTimeout(function() {
				var newValue = text.html();
				// ignore meta key presses
				if (newValue != startValue) {
					// this could try and make a diff instead of storing snapshots
					stack.execute(new EditCommand(text, startValue, newValue));
					startValue = newValue;
				}
			}, 250);
}
/*get caret position of passed element*/
function getCaretCharacterOffsetWithin(element) {
    var caretOffset = 0;
    var doc = element.ownerDocument || element.document;
    var win = doc.defaultView || doc.parentWindow;
    var sel;
    if (typeof win.getSelection != "undefined") {
        var range = win.getSelection().getRangeAt(0);
        var preCaretRange = range.cloneRange();
        preCaretRange.selectNodeContents(element);
        preCaretRange.setEnd(range.endContainer, range.endOffset);
        caretOffset = preCaretRange.toString().length;
    } else if ( (sel = doc.selection) && sel.type != "Control") {
        var textRange = sel.createRange();
        var preCaretTextRange = doc.body.createTextRange();
        preCaretTextRange.moveToElementText(element);
        preCaretTextRange.setEndPoint("EndToEnd", textRange);
        caretOffset = preCaretTextRange.text.length;
    }
    return caretOffset;
}

function exportDataToFile() {
    var data = $('#FTState').val();
    var exportLink = document.createElement('a');
	try{
    exportLink.setAttribute('href', 'data:text/text;base64,' + window.btoa(unescape(encodeURIComponent(data))));
	}
	catch(exp){
		 exportLink.setAttribute('href', 'data:text/text;base64,' + window.btoa(data));
	}
    exportLink.appendChild(document.createTextNode('test.txt'));
    window.open($(exportLink).attr('href'));
}

/*return html encoded string for special characters */
function customHtmlEncode(givenStr){
  var elem = document.createElement("div");
  elem.innerText = elem.textContent = givenStr;
  givenStr = elem.innerHTML;  
  return givenStr;
}

function doResize()
{
	var myHeight= 900;
	if(jQuery(this).height()>900)
	 myHeight = jQuery(this).height();
	EZ.resize(1120,myHeight);
}
/*custom code for undo redo*/
function attachUndoRedo() {
	stack = new Undo.Stack(),
		EditCommand = Undo.Command.extend({
			constructor: function(textarea, oldValue, newValue) {
				this.textarea = textarea;
				this.oldValue = oldValue;
				this.newValue = newValue;
			},
			execute: function() {
			},
			undo: function() {
				this.textarea.html(this.oldValue);
				$(this.textarea).trigger("change");
			},
			
			redo: function() {
				this.textarea.html(this.newValue);
				$(this.textarea).trigger("change");
			}
		});
	stack.changed = function() {
		stackUI();
	};
	
	var undo = $(".undo"),
		redo = $(".redo");
	function stackUI() {
		undo.attr("disabled", !stack.canUndo());
		redo.attr("disabled", !stack.canRedo());
	}
	stackUI();
	
	$(document.body).delegate(".undo, .redo", "click", function() {
		var what = $(this).attr("data-edit");
		stack[what]();
		return false;
	});
	
	$(document).keydown(function(event) {
		if (!event.metaKey || event.keyCode != 90) {
			return;
		}
		event.preventDefault();
		if (event.shiftKey) {
			stack.canRedo() && stack.redo()
		} else {
			stack.canUndo() && stack.undo();
		}
	});
}
