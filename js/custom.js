var MODE_TEST           =     "test";
var MODE_PREGRADE       =     "sample";
var MODE_PREVIEW        =     "preview";
var MODE_POST_TEST      =     "review";
var MODE_DESIGN         =     "design";
	
var componentId;
var idcount=1;
var counter;
var gradedObjectCounter = 0;
var stateObject = new Object();
stateObject.liveObject = new Object();
var currentObject = new Object();
var FTState = new Array();
var componentObject=new Object();

/*var FTState =[{
    "child": [{
        "id": "1001"
    }, {
        "id": "1002"
    }, {
        "id": "1004"
    }, {
        "id": "1006"
    }, {
        "id": "1008"
    }],
    "id": "100",
    "html": "<div class=\"pageSection\" onclick=\"populateId(100)\" id=\"100\"><div class=\"pageInnerSection\"><div class=\"pageSectionHeader\"><p></p><h6 class=\"pull-right font10\">ID #1000</h6><p></p></div><div class=\"pageSectionBody\"><div class=\"rowPagesection firstRowPageSection\" id=\"1001\"><div class=\"colPageSection\"><div class=\"eachCol\"><a href=\"#\"><img src=\"img/getPicture.png\"></a></div></div><div class=\"colPageSection\"><div><div class=\"editableDivTitle\"><h6 class=\"pull-right font10\">ID# 1001</h6></div><div class=\"inputDummy\" id=\"quetxt_1001\" onclick=\"populateProperties(this)\" data-placeholder=\"Enter Text\" contenteditable=\"true\"></div></div></div></div><div class=\"rowPagesection tickCheck\" id=\"1002\"><div class=\"colPageSection\"><div class=\"eachCol\"><div class=\"btn-group pull-left indt-mrgn\"><label data-toggle=\"buttons\" class=\"btn btn-grey  btn-xs btn-bullet btn-bullet1 btnTick active\"><input type=\"checkbox\"><img src=\"img/tick.png\"></label><label data-toggle=\"buttons\" style=\"padding-bottom:0px;padding-top:0px;\" class=\"btn btn-grey  btn-xs btn-bullet btn-bullet2 btnTickWrong\"><input type=\"checkbox\"><img src=\"img/tickwrong.png\"></label></div></div></div><div class=\"colPageSection secondColPic\" id=\"author1002\"><div><div class=\"editableDivTitle\"><h6 class=\"pull-right font10\">ID# 1002  <a id=\"editfb1002\" onclick=\"showFeedback(1002)\">| edit feedback</a></h6></div><div class=\"inputDummy\" id=\"txt_1002\" onclick=\"populateProperties(this)\" data-placeholder=\"Enter Text\" contenteditable=\"true\"></div></div></div><div class=\"colPageSection secondColPic\" id=\"stud1002\" style=\"display:none\"><div><div class=\"editableDivTitle\"><h6 class=\"pull-right font10\">ID# 1002<a id=\"editfb1002\" onclick=\"showFeedback(1002)\">| edit feedback</a></h6></div><div class=\"innerinputDummy\"><div class=\"inputDummyFirst\" id=\"authortxt_1002\" onclick=\"populateProperties(this)\" data-placeholder=\"Enter Text\" contenteditable=\"true\"></div><div class=\"inputDummySecond\" data-placeholder=\"Enter Text\" contenteditable=\"true\"></div></div></div></div><div class=\"colPageSection\"><div class=\"eachCol\"><div class=\"plusBtn 1002\"><a><img src=\"img/plus.png\" onclick=\"addElement(100)\"></a></div><div class=\"minusBtn\"><a href=\"#\"><img src=\"img/minus.png\" id=\"minus_1002\" onclick=\"deleteElement(100,this)\"></a></div></div></div><div id=\"feedback1002\" class=\"rowPagesection closeFeedback\"><div class=\"colPageSection\"><div class=\"eachCol firstColPic\"></div></div><div class=\"colPageSection secondColPic\"><div><div class=\"editableDivTitle\"><h6 class=\"pull-right font10\">ID# 1003 | <a onclick=\"hideFeedback(1003)\">close feedback</a></h6></div><div class=\"inputDummy\" id=\"fb_1003\" onclick=\"populateProperties(this)\" data-placeholder=\"Enter Text\" contenteditable=\"true\"></div></div></div><div class=\"colPageSection thirdColPic\"><div class=\"eachCol\"><a href=\"#\"><img src=\"img/getPicture.png\"></a></div><div></div></div></div></div><div class=\"rowPagesection tickCheck\" id=\"1004\"><div class=\"colPageSection\"><div class=\"eachCol\"><div class=\"btn-group pull-left indt-mrgn\"><label data-toggle=\"buttons\" class=\"btn btn-grey  btn-xs btn-bullet btn-bullet1 btnTick active\"><input type=\"checkbox\"><img src=\"img/tick.png\"></label><label data-toggle=\"buttons\" style=\"padding-bottom:0px;padding-top:0px;\" class=\"btn btn-grey  btn-xs btn-bullet btn-bullet2 btnTickWrong\"><input type=\"checkbox\"><img src=\"img/tickwrong.png\"></label></div></div></div><div class=\"colPageSection secondColPic\" id=\"author1004\"><div><div class=\"editableDivTitle\"><h6 class=\"pull-right font10\">ID# 1004  <a id=\"editfb1004\" onclick=\"showFeedback(1004)\">| edit feedback</a></h6></div><div class=\"inputDummy\" id=\"txt_1004\" onclick=\"populateProperties(this)\" data-placeholder=\"Enter Text\" contenteditable=\"true\"></div></div></div><div class=\"colPageSection secondColPic\" id=\"stud1004\" style=\"display:none\"><div><div class=\"editableDivTitle\"><h6 class=\"pull-right font10\">ID# 1004<a id=\"editfb1004\" onclick=\"showFeedback(1004)\">| edit feedback</a></h6></div><div class=\"innerinputDummy\"><div class=\"inputDummyFirst\" id=\"authortxt_1004\" onclick=\"populateProperties(this)\" data-placeholder=\"Enter Text\" contenteditable=\"true\"></div><div class=\"inputDummySecond\" data-placeholder=\"Enter Text\" contenteditable=\"true\"></div></div></div></div><div class=\"colPageSection\"><div class=\"eachCol\"><div class=\"plusBtn 1004\"><a><img src=\"img/plus.png\" onclick=\"addElement(100)\"></a></div><div class=\"minusBtn\"><a href=\"#\"><img src=\"img/minus.png\" id=\"minus_1004\" onclick=\"deleteElement(100,this)\"></a></div></div></div><div id=\"feedback1004\" class=\"rowPagesection closeFeedback\"><div class=\"colPageSection\"><div class=\"eachCol firstColPic\"></div></div><div class=\"colPageSection secondColPic\"><div><div class=\"editableDivTitle\"><h6 class=\"pull-right font10\">ID# 1005 | <a onclick=\"hideFeedback(1005)\">close feedback</a></h6></div><div class=\"inputDummy\" id=\"fb_1005\" onclick=\"populateProperties(this)\" data-placeholder=\"Enter Text\" contenteditable=\"true\"></div></div></div><div class=\"colPageSection thirdColPic\"><div class=\"eachCol\"><a href=\"#\"><img src=\"img/getPicture.png\"></a></div><div></div></div></div></div><div class=\"rowPagesection tickCheck\" id=\"1006\"><div class=\"colPageSection\"><div class=\"eachCol\"><div class=\"btn-group pull-left indt-mrgn\"><label data-toggle=\"buttons\" class=\"btn btn-grey  btn-xs btn-bullet btn-bullet1 btnTick active\"><input type=\"checkbox\"><img src=\"img/tick.png\"></label><label data-toggle=\"buttons\" style=\"padding-bottom:0px;padding-top:0px;\" class=\"btn btn-grey  btn-xs btn-bullet btn-bullet2 btnTickWrong\"><input type=\"checkbox\"><img src=\"img/tickwrong.png\"></label></div></div></div><div class=\"colPageSection secondColPic\" id=\"author1006\"><div><div class=\"editableDivTitle\"><h6 class=\"pull-right font10\">ID# 1006  <a id=\"editfb1006\" onclick=\"showFeedback(1006)\">| edit feedback</a></h6></div><div class=\"inputDummy\" id=\"txt_1006\" onclick=\"populateProperties(this)\" data-placeholder=\"Enter Text\" contenteditable=\"true\"></div></div></div><div class=\"colPageSection secondColPic\" id=\"stud1006\" style=\"display:none\"><div><div class=\"editableDivTitle\"><h6 class=\"pull-right font10\">ID# 1006<a id=\"editfb1006\" onclick=\"showFeedback(1006)\">| edit feedback</a></h6></div><div class=\"innerinputDummy\"><div class=\"inputDummyFirst\" id=\"authortxt_1006\" onclick=\"populateProperties(this)\" data-placeholder=\"Enter Text\" contenteditable=\"true\"></div><div class=\"inputDummySecond\" data-placeholder=\"Enter Text\" contenteditable=\"true\"></div></div></div></div><div class=\"colPageSection\"><div class=\"eachCol\"><div class=\"plusBtn 1006\"><a><img src=\"img/plus.png\" onclick=\"addElement(100)\"></a></div><div class=\"minusBtn\"><a href=\"#\"><img src=\"img/minus.png\" id=\"minus_1006\" onclick=\"deleteElement(100,this)\"></a></div></div></div><div id=\"feedback1006\" class=\"rowPagesection closeFeedback\"><div class=\"colPageSection\"><div class=\"eachCol firstColPic\"></div></div><div class=\"colPageSection secondColPic\"><div><div class=\"editableDivTitle\"><h6 class=\"pull-right font10\">ID# 1007 | <a onclick=\"hideFeedback(1007)\">close feedback</a></h6></div><div class=\"inputDummy\" id=\"fb_1007\" onclick=\"populateProperties(this)\" data-placeholder=\"Enter Text\" contenteditable=\"true\"></div></div></div><div class=\"colPageSection thirdColPic\"><div class=\"eachCol\"><a href=\"#\"><img src=\"img/getPicture.png\"></a></div><div></div></div></div></div><div class=\"rowPagesection tickCheck\" id=\"1008\"><div class=\"colPageSection\"><div class=\"eachCol\"><div class=\"btn-group pull-left indt-mrgn\"><label data-toggle=\"buttons\" class=\"btn btn-grey  btn-xs btn-bullet btn-bullet1 btnTick active\"><input type=\"checkbox\"><img src=\"img/tick.png\"></label><label data-toggle=\"buttons\" style=\"padding-bottom:0px;padding-top:0px;\" class=\"btn btn-grey  btn-xs btn-bullet btn-bullet2 btnTickWrong\"><input type=\"checkbox\"><img src=\"img/tickwrong.png\"></label></div></div></div><div class=\"colPageSection secondColPic\" id=\"author1008\"><div><div class=\"editableDivTitle\"><h6 class=\"pull-right font10\">ID# 1008  <a id=\"editfb1008\" onclick=\"showFeedback(1008)\">| edit feedback</a></h6></div><div class=\"inputDummy\" id=\"txt_1008\" onclick=\"populateProperties(this)\" data-placeholder=\"Enter Text\" contenteditable=\"true\"></div></div></div><div class=\"colPageSection secondColPic\" id=\"stud1008\" style=\"display:none\"><div><div class=\"editableDivTitle\"><h6 class=\"pull-right font10\">ID# 1008<a id=\"editfb1008\" onclick=\"showFeedback(1008)\">| edit feedback</a></h6></div><div class=\"innerinputDummy\"><div class=\"inputDummyFirst\" id=\"authortxt_1008\" onclick=\"populateProperties(this)\" data-placeholder=\"Enter Text\" contenteditable=\"true\"></div><div class=\"inputDummySecond\" data-placeholder=\"Enter Text\" contenteditable=\"true\"></div></div></div></div><div class=\"colPageSection\"><div class=\"eachCol\"><div class=\"plusBtn 1008\" style=\"display:block\"><a><img src=\"img/plus.png\" onclick=\"addElement(100)\"></a></div><div class=\"minusBtn\"><a href=\"#\"><img src=\"img/minus.png\" id=\"minus_1008\" onclick=\"deleteElement(100,this)\"></a></div></div></div><div id=\"feedback1008\" class=\"rowPagesection closeFeedback\"><div class=\"colPageSection\"><div class=\"eachCol firstColPic\"></div></div><div class=\"colPageSection secondColPic\"><div><div class=\"editableDivTitle\"><h6 class=\"pull-right font10\">ID# 1009 | <a onclick=\"hideFeedback(1009)\">close feedback</a></h6></div><div class=\"inputDummy\" id=\"fb_1009\" onclick=\"populateProperties(this)\" data-placeholder=\"Enter Text\" contenteditable=\"true\"></div></div></div><div class=\"colPageSection thirdColPic\"><div class=\"eachCol\"><a href=\"#\"><img src=\"img/getPicture.png\"></a></div><div></div></div></div></div><div class=\"clear\"></div><div class=\"pageSectionFooter\"><div class=\"clear\"></div><div class=\"editGenFeed\"><a id=\"editgeneralFb100\" onclick=\"showGeneralFeedback(100)\">edit general feedback</a></div><div style=\"display: none;\" id=\"genFb100\" class=\"generalFeedback\"><div class=\"rowPagesection\"><div class=\"colPageSection secondColPic\"><div><div class=\"editableDivTitle\"><h6 class=\"pull-left font10\">General feedback:</h6> <h6 class=\"pull-right font10\">ID# 1011</h6></div><div class=\"inputDummy\" id=\"txtgenFb_10011\" onclick=\"populateProperties(this)\" data-placeholder=\"Enter Text\" contenteditable=\"true\"></div></div></div><div class=\"colPageSection thirdColPic\"><div class=\"eachCol\"><a href=\"#\"><img src=\"img/getPicture.png\"></a></div><div></div></div></div><div class=\"rowPagesection\"><div class=\"colPageSection secondColPic\"><div><div class=\"editableDivTitle\"><h6 class=\"pull-left font10\">Overall feedback:</h6> <h6 class=\"pull-right font10\">ID# 1012</h6></div><input id=\"hdnCounter100\" name=\"counter\" value=\"1012\" type=\"hidden\"><div class=\"inputDummy\" id=\"txtallFb_10012\" onclick=\"populateProperties(this)\" data-placeholder=\"Enter Text\" contenteditable=\"true\"></div></div></div><div class=\"colPageSection thirdColPic\"><div class=\"eachCol\"><a href=\"#\"><img src=\"img/getPicture.png\"></a></div><div></div></div></div></div><div class=\"clear\"></div><div class=\"eachCol pull-right\"><div class=\"plusBtn 10012\" style=\"display:block\"><img src=\"img/plus.png\" onclick=\"addcheckBox()\"></div><div class=\"minusBtn\"><img src=\"img/minus.png\" onclick=\"deleteCheckbox(100)\"></div><div class=\"clear\"></div></div></div><div class=\"clear\"></div></div></div></div>"
},];*/

/*var componentObject=new Object();
componentObject.child = new Array();*/
var gradedObjectCount =0;
$(document).ready(function() {		 
	$("#formToolCanvasId").wysiwyg();	
	if(FTState.length > 0){
		renderStateObject();
	}
		
	$(".draggCheckbox").draggable({		
        revert: false,
        opacity: 0.4,
		 helper: "clone" 
   });	
	
  $( "#formToolCanvasId" ).droppable({
		 drop: function( event, ui ){
			addcheckBox();			
			}	
	 });
  $("#elementProperties").hide();
  $("#properties").show();
  $( "#txtmaxLenght" ).focusout(function(){
	  var maxvalue=$("#txtmaxLenght").val();
	  var elementid=stateObject.liveObject.id;
	  stateObject.liveObject.maxlenght=maxvalue;	
	  if(elementid.split("_")[0]=="txt")
		  {
		  id=elementid.split("_")[1];
		  $("#authortxt_"+id).attr('data-maxlength',maxvalue);
		  $("#authortxt_"+id).attr('contentEditable','true');
		  }
	  if(elementid.split("_")[0]=="authortxt")
		  {
		  $("#txt_"+id).attr('data-maxlength',maxvalue);
		  $("#txt_"+id).attr('contentEditable','true');
		  }
	  $("#"+elementid).attr('data-maxlength',maxvalue);	
	  $("#"+elementid).attr('contentEditable','true');
  });
  $(".indt-mrgn .btn" ).click(function(){
	  var parentElementX = $(this).closest('.btn');
	  $(parentElementX).closest('.btn-group').find(".btn").not(parentElementX).removeClass("active");
  });
  $(".grid>input[type='checkbox']").attr("disabled",true);
});

/* Function to add check box component on to canvas */

function addcheckBox(){
	
		componentObject.child = new Array();
		FTState.push(componentObject);
	 var htmlelement="";	 
	 var checkboxId=idcount+"00";
	 idcount++;
	 var elementId=1;
	 componentId=checkboxId;
	 htmlelement+='<div class="pageSection" id='+checkboxId+'><div class="pageInnerSection">';
	 componentObject.id = checkboxId;
	 htmlelement+='<div class="pageSectionHeader" ><p><h6 onclick=populateId('+checkboxId+') class="pull-right font10">ID #'+checkboxId+'0</h6></p></div>';
  	 htmlelement+='<div class="pageSectionBody">';
  	/*Question element*/
	 htmlelement+='<div class="rowPagesection firstRowPageSection" id='+(checkboxId+elementId)+'><div class="colPageSection"><div class="eachCol"><a href="#"><img src="img/getPicture.png"></a></div></div>';
	 htmlelement+='<div class="colPageSection"><div><div class="editableDivTitle"><h6 class="pull-right font10">ID# '+(checkboxId+elementId)+'</h6></div><div class="inputDummy"  onkeydown="checkmaxlength()" id=quetxt_'+(checkboxId+elementId)+' data-maxlength="" onclick="populateProperties(this)" contentEditable=true data-placeholder="Enter text" ></div>';
	 htmlelement+='</div></div></div>';
	 
	 var questionElement = new Object();
	 questionElement.id = (checkboxId+elementId);
	// questionElement.maxLength = $("#quetxt_"+(checkboxId+elementId)).attr("data-maxlength");
	 componentObject.child.push(questionElement);
	 elementId++;

	 
	 /*First element*/
	 
	 htmlelement+='<div class="rowPagesection tickCheck" id='+(checkboxId+elementId)+'><div class="colPageSection"><div class="eachCol"><div class="btn-group pull-left indt-mrgn">';
	 htmlelement+='<label data-toggle="buttons" class="btn btn-grey  btn-xs btn-bullet btn-bullet1 btnTick">';
	 htmlelement+='<input type="checkbox"><img src="img/tick.png">';
	 htmlelement+='</label>';
	 htmlelement+='<label data-toggle="buttons" style="padding-bottom:0px;padding-top:0px;" class="btn btn-grey  btn-xs btn-bullet btn-bullet2 btnTickWrong">';
	 htmlelement+='<input type="checkbox"><img src="img/tickwrong.png">';
	 htmlelement+='</label>';	
	 htmlelement+='</div>';
	 htmlelement+='</div>';		
	 htmlelement+='</div>';
	 
	 var firstElement = new Object();
	 	 firstElement.id = (checkboxId+elementId);
	 	 componentObject.child.push(firstElement);
	 htmlelement+='<div class="colPageSection secondColPic" id="author'+(checkboxId+elementId)+'">';
	 htmlelement+='<div>';
	 htmlelement+='<div class="editableDivTitle"><h6 class="pull-right font10">ID# '+(checkboxId+elementId)+'  <a id="editfb'+(checkboxId+elementId)+'" onclick="showFeedback('+(checkboxId+elementId)+')">| edit feedback</a></h6></div>';
	 htmlelement+='<div class="inputDummy" id=txt_'+(checkboxId+elementId)+' data-maxlength="" onkeydown="checkmaxlength()" onclick="populateProperties(this)" contentEditable=true data-placeholder="Enter text"></div></div>';
	 
	 htmlelement+='</div>'; 
	 htmlelement+='<div class="colPageSection secondColPic" id="stud'+(checkboxId+elementId)+'" style="display:none">';

	 htmlelement+='<div>';
     htmlelement+='<div class="editableDivTitle"><h6 class="pull-right font10">ID# '+(checkboxId+elementId)+'<a id="editfb'+(checkboxId+elementId)+'" onclick="showFeedback('+(checkboxId+elementId)+')">| edit feedback</a></h6></div>';
     htmlelement+='<div class="innerinputDummy">';
     htmlelement+='<div class="inputDummyFirst" id=authortxt_'+(checkboxId+elementId)+' data-maxlength="" onkeydown="checkmaxlength()" onclick="populateProperties(this)"  contentEditable=true data-placeholder="Enter text"></div>';
     htmlelement+='<div class="inputDummySecond"  contentEditable=true data-placeholder="Enter text"></div>';
     htmlelement+='</div></div></div>';
	 htmlelement+='<div class="colPageSection">';
	 htmlelement+='<div class="eachCol"><div class="plusBtn '+(checkboxId+elementId)+'" ><a><img src="img/plus.png" onclick=addElement('+componentId+')></a></div><div class="minusBtn"><a href="#"><img src="img/minus.png" id=minus_'+(checkboxId+elementId)+' onclick=deleteElement('+componentId+',this)></a></div></div>';	
	 htmlelement+='</div>';

	 htmlelement+='<div id="feedback'+(checkboxId+elementId)+'" class="rowPagesection closeFeedback">';
	 elementId++;
	 htmlelement+='<div class="colPageSection"><div class="eachCol firstColPic"></div></div>';
	 htmlelement+='<div class="colPageSection secondColPic">';
	 htmlelement+='<div><div class="editableDivTitle"><h6 class="pull-right font10">ID# '+(checkboxId+elementId)+' | <a onclick="hideFeedback('+(checkboxId+elementId)+')">close feedback</a></h6></div>';
	 htmlelement+='<div class="inputDummy" id=fb_'+(checkboxId+elementId)+' data-maxlength="" onkeydown="checkmaxlength()" onclick="populateProperties(this)" contentEditable=true data-placeholder="Enter text"></div></div></div>';
	
	 htmlelement+='<div class="colPageSection thirdColPic"><div class="eachCol">';
	 htmlelement+='<a href="#"><img src="img/getPicture.png"></a>'; 
	 htmlelement+='</div><div></div></div></div>';
	 elementId++;
	 
	 htmlelement+='</div>'; 	 
	 /*Third  element*/
	 htmlelement+='<div class="rowPagesection tickCheck" id='+(checkboxId+elementId)+'><div class="colPageSection"><div class="eachCol"><div class="btn-group pull-left indt-mrgn">';
	 htmlelement+='<label data-toggle="buttons" class="btn btn-grey  btn-xs btn-bullet btn-bullet1 btnTick">';
	 htmlelement+='<input type="checkbox"><img src="img/tick.png">';
	 htmlelement+='</label>';
	 htmlelement+='<label data-toggle="buttons" style="padding-bottom:0px;padding-top:0px;" class="btn btn-grey  btn-xs btn-bullet btn-bullet2 btnTickWrong">';
	 htmlelement+='<input type="checkbox"><img src="img/tickwrong.png">';
	 htmlelement+='</label>';	
	 htmlelement+='</div>';
	 htmlelement+='</div>';		
	 htmlelement+='</div>';
	 
	 var secondElement = new Object();
	 	 secondElement.id = (checkboxId+elementId);
 	     componentObject.child.push(secondElement);
	 
	 htmlelement+='<div class="colPageSection secondColPic" id="author'+(checkboxId+elementId)+'">';
	 htmlelement+='<div>';
	 htmlelement+='<div class="editableDivTitle"><h6 class="pull-right font10">ID# '+(checkboxId+elementId)+'  <a id="editfb'+(checkboxId+elementId)+'" onclick="showFeedback('+(checkboxId+elementId)+')">| edit feedback</a></h6></div>';
	 htmlelement+='<div class="inputDummy" onkeydown="checkmaxlength()" data-maxlength="" id=txt_'+(checkboxId+elementId)+' onclick="populateProperties(this)" contentEditable=true data-placeholder="Enter text"></div></div>';
	 
	 htmlelement+='</div>'; 
	 htmlelement+='<div class="colPageSection secondColPic" id="stud'+(checkboxId+elementId)+'" style="display:none">';
	 
	 htmlelement+='<div>';
     htmlelement+='<div class="editableDivTitle"><h6 class="pull-right font10">ID# '+(checkboxId+elementId)+'<a id="editfb'+(checkboxId+elementId)+'" onclick="showFeedback('+(checkboxId+elementId)+')">| edit feedback</a></h6></div>';
     htmlelement+='<div class="innerinputDummy">';
     htmlelement+='<div class="inputDummyFirst" id=authortxt_'+(checkboxId+elementId)+' onkeydown="checkmaxlength()" data-maxlength="" onclick="populateProperties(this)"  contentEditable=true data-placeholder="Enter text"></div>';
     htmlelement+='<div class="inputDummySecond"  contentEditable=true data-placeholder="Enter text"></div>';
     htmlelement+='</div></div></div>';
	 htmlelement+='<div class="colPageSection">';
	 htmlelement+='<div class="eachCol"><div class="plusBtn '+(checkboxId+elementId)+'" ><a><img src="img/plus.png" onclick=addElement('+componentId+')></a></div><div class="minusBtn"><a href="#"><img src="img/minus.png" id=minus_'+(checkboxId+elementId)+' onclick=deleteElement('+componentId+',this)></a></div></div>';	
	 htmlelement+='</div>';

	 htmlelement+='<div id="feedback'+(checkboxId+elementId)+'" class="rowPagesection closeFeedback">';
	 elementId++;
	 htmlelement+='<div class="colPageSection"><div class="eachCol firstColPic"></div></div>';
	 htmlelement+='<div class="colPageSection secondColPic">';
	 htmlelement+='<div><div class="editableDivTitle"><h6 class="pull-right font10">ID# '+(checkboxId+elementId)+' | <a onclick="hideFeedback('+(checkboxId+elementId)+')">close feedback</a></h6></div>';
	 htmlelement+='<div class="inputDummy" id=fb_'+(checkboxId+elementId)+' onkeydown="checkmaxlength()" data-maxlength="" onclick="populateProperties(this)" contentEditable=true data-placeholder="Enter text"></div></div></div>';
	 
	 htmlelement+='<div class="colPageSection thirdColPic"><div class="eachCol">';
	 htmlelement+='<a href="#"><img src="img/getPicture.png"></a>'; 
	 htmlelement+='</div><div></div></div></div>';
	 elementId++;
	 
	 htmlelement+='</div>'; 
	 
	 /*Fourth element*/
	 htmlelement+='<div class="rowPagesection tickCheck" id='+(checkboxId+elementId)+'><div class="colPageSection"><div class="eachCol"><div class="btn-group pull-left indt-mrgn">';
	 htmlelement+='<label data-toggle="buttons" class="btn btn-grey  btn-xs btn-bullet btn-bullet1 btnTick">';
	 htmlelement+='<input type="checkbox"><img src="img/tick.png">';
	 htmlelement+='</label>';
	 htmlelement+='<label data-toggle="buttons" style="padding-bottom:0px;padding-top:0px;" class="btn btn-grey  btn-xs btn-bullet btn-bullet2 btnTickWrong">';
	 htmlelement+='<input type="checkbox"><img src="img/tickwrong.png">';
	 htmlelement+='</label>';	
	 htmlelement+='</div>';
	 htmlelement+='</div>';		
	 htmlelement+='</div>';
	 
	 var thirdElement = new Object();
	 thirdElement.id = (checkboxId+elementId);
	 componentObject.child.push(thirdElement);
	 
	 htmlelement+='<div class="colPageSection secondColPic" id="author'+(checkboxId+elementId)+'">';
	 htmlelement+='<div>';
	 htmlelement+='<div class="editableDivTitle"><h6 class="pull-right font10">ID# '+(checkboxId+elementId)+'  <a id="editfb'+(checkboxId+elementId)+'" onclick="showFeedback('+(checkboxId+elementId)+')">| edit feedback</a></h6></div>';
	 htmlelement+='<div class="inputDummy" id=txt_'+(checkboxId+elementId)+' onkeydown="checkmaxlength()" data-maxlength="" onclick="populateProperties(this)" contentEditable=true data-placeholder="Enter text"></div></div>';
	 
	 htmlelement+='</div>'; 
	 htmlelement+='<div class="colPageSection secondColPic" id="stud'+(checkboxId+elementId)+'" style="display:none">';
     
	 htmlelement+='<div>';
     htmlelement+='<div class="editableDivTitle"><h6 class="pull-right font10">ID# '+(checkboxId+elementId)+'<a id="editfb'+(checkboxId+elementId)+'" onclick="showFeedback('+(checkboxId+elementId)+')">| edit feedback</a></h6></div>';
     htmlelement+='<div class="innerinputDummy">';
     htmlelement+='<div class="inputDummyFirst" id=authortxt_'+(checkboxId+elementId)+' onkeydown="checkmaxlength()" data-maxlength="" onclick="populateProperties(this)"  contentEditable=true data-placeholder="Enter text"></div>';
     htmlelement+='<div class="inputDummySecond"  contentEditable=true data-placeholder="Enter text"></div>';
     htmlelement+='</div></div></div>';
	 htmlelement+='<div class="colPageSection">';
	 htmlelement+='<div class="eachCol"><div class="plusBtn '+(checkboxId+elementId)+'" ><a><img src="img/plus.png" onclick=addElement('+componentId+')></a></div><div class="minusBtn"><a href="#"><img src="img/minus.png" id=minus_'+(checkboxId+elementId)+' onclick=deleteElement('+componentId+',this)></a></div></div>';	
	 htmlelement+='</div>';

	 htmlelement+='<div id="feedback'+(checkboxId+elementId)+'" class="rowPagesection closeFeedback">';
	 elementId++;
	 htmlelement+='<div class="colPageSection"><div class="eachCol firstColPic"></div></div>';
	 htmlelement+='<div class="colPageSection secondColPic">';
	 htmlelement+='<div><div class="editableDivTitle"><h6 class="pull-right font10">ID# '+(checkboxId+elementId)+' | <a onclick="hideFeedback('+(checkboxId+elementId)+')">close feedback</a></h6></div>';
	 htmlelement+='<div class="inputDummy" id=fb_'+(checkboxId+elementId)+' onkeydown="checkmaxlength()" data-maxlength="" onclick="populateProperties(this)" contentEditable=true data-placeholder="Enter text"></div></div></div>';
	 
	 htmlelement+='<div class="colPageSection thirdColPic"><div class="eachCol">';
	 htmlelement+='<a href="#"><img src="img/getPicture.png"></a>'; 
	 htmlelement+='</div><div></div></div></div>';
	 elementId++;
	 
	 htmlelement+='</div>'; 
	 
	 /*Fifth element*/
	 htmlelement+='<div class="rowPagesection tickCheck" id='+(checkboxId+elementId)+'><div class="colPageSection"><div class="eachCol"><div class="btn-group pull-left indt-mrgn">';
	 htmlelement+='<label data-toggle="buttons" class="btn btn-grey  btn-xs btn-bullet btn-bullet1 btnTick">';
	 htmlelement+='<input type="checkbox"><img src="img/tick.png">';
	 htmlelement+='</label>';
	 htmlelement+='<label data-toggle="buttons" style="padding-bottom:0px;padding-top:0px;" class="btn btn-grey  btn-xs btn-bullet btn-bullet2 btnTickWrong">';
	 htmlelement+='<input type="checkbox"><img src="img/tickwrong.png">';
	 htmlelement+='</label>';	
	 htmlelement+='</div>';
	 htmlelement+='</div>';		
	 htmlelement+='</div>';
	 
	 var fourthElement = new Object();
	 	fourthElement.id = (checkboxId+elementId);
	     componentObject.child.push(fourthElement);
	 
	 htmlelement+='<div class="colPageSection secondColPic" id="author'+(checkboxId+elementId)+'">';
	 htmlelement+='<div>';
	 htmlelement+='<div class="editableDivTitle"><h6 class="pull-right font10">ID# '+(checkboxId+elementId)+'  <a id="editfb'+(checkboxId+elementId)+'" onclick="showFeedback('+(checkboxId+elementId)+')">| edit feedback</a></h6></div>';
	 htmlelement+='<div class="inputDummy" id=txt_'+(checkboxId+elementId)+' onkeydown="checkmaxlength()" data-maxlength="" onclick="populateProperties(this)" contentEditable=true data-placeholder="Enter text"></div></div>';
 
	 htmlelement+='</div>'; 
	 htmlelement+='<div class="colPageSection secondColPic" id="stud'+(checkboxId+elementId)+'" style="display:none">';
	
	 htmlelement+='<div>';
     htmlelement+='<div class="editableDivTitle"><h6 class="pull-right font10">ID# '+(checkboxId+elementId)+'<a id="editfb'+(checkboxId+elementId)+'" onclick="showFeedback('+(checkboxId+elementId)+')">| edit feedback</a></h6></div>';
     htmlelement+='<div class="innerinputDummy">';
     htmlelement+='<div class="inputDummyFirst" id=authortxt_'+(checkboxId+elementId)+' onclick="populateProperties(this)" data-maxlength="" onkeydown="checkmaxlength()"  contentEditable=true data-placeholder="Enter text"></div>';
     htmlelement+='<div class="inputDummySecond"  contentEditable=true data-placeholder="Enter text"></div>';
     htmlelement+='</div></div></div>';
	 htmlelement+='<div class="colPageSection">';
	 htmlelement+='<div class="eachCol"><div class="plusBtn '+(checkboxId+elementId)+'" style="display:block"><a><img src="img/plus.png" onclick=addElement('+componentId+')></a></div><div class="minusBtn"><a href="#"><img src="img/minus.png" id=minus_'+(checkboxId+elementId)+' onclick=deleteElement('+componentId+',this)></a></div></div>';	
	 htmlelement+='</div>';

	 htmlelement+='<div id="feedback'+(checkboxId+elementId)+'" class="rowPagesection closeFeedback">';
	 elementId++;
	 htmlelement+='<div class="colPageSection"><div class="eachCol firstColPic"></div></div>';
	 htmlelement+='<div class="colPageSection secondColPic">';
	 htmlelement+='<div><div class="editableDivTitle"><h6 class="pull-right font10">ID# '+(checkboxId+elementId)+' | <a onclick="hideFeedback('+(checkboxId+elementId)+')">close feedback</a></h6></div>';
	 htmlelement+='<div class="inputDummy" id=fb_'+(checkboxId+elementId)+' onkeydown="checkmaxlength()" data-maxlength="" onclick="populateProperties(this)" contentEditable=true data-placeholder="Enter text"></div></div></div>';
 
	// htmlelement+='</div>';
	 htmlelement+='<div class="colPageSection thirdColPic"><div class="eachCol">';
	 htmlelement+='<a href="#"><img src="img/getPicture.png"></a>'; 
	 htmlelement+='</div><div></div></div></div>';
	 elementId++;
	 
	 htmlelement+='</div>'; 
	 
	 htmlelement+='<div class ="clear"></div>';
	 elementId++;
	 
	 /*checkbox footer*/
	 htmlelement+='<div class="pageSectionFooter">';
	 htmlelement+='<div class="clear"></div><div class="editGenFeed"><a id="editgeneralFb'+checkboxId+'" onclick="showGeneralFeedback('+checkboxId+')">edit general feedback</a></div>';
		 
	 /*General feedback*/
	 htmlelement+='<div id="genFb'+checkboxId+'" class="generalFeedback">';
	 htmlelement+='<div class="rowPagesection"><div class="colPageSection secondColPic">';
	// debugger;
	 htmlelement+='<div><div class="editableDivTitle"><h6 class="pull-left font10">General feedback:</h6> <h6 class="pull-right font10">ID# '+(checkboxId.substring(0,2)+elementId)+'</h6></div>';
	 htmlelement+='<div class="inputDummy" id=txtgenFb_'+(checkboxId.substring(0,2)+elementId)+' onkeydown="checkmaxlength()" data-maxlength="" onclick="populateProperties(this)" contentEditable=true data-placeholder="Enter text"></div></div></div>';
	 elementId++;
	 htmlelement+='<div class="colPageSection thirdColPic"><div class="eachCol"><a href="#"><img src="img/getPicture.png"></a></div><div></div></div></div>';
	 htmlelement+='<div class="rowPagesection"><div class="colPageSection secondColPic"><div>';
	 htmlelement+='<div class="editableDivTitle"><h6 class="pull-left font10">Overall feedback:</h6> <h6 class="pull-right font10">ID# '+(checkboxId.substring(0,2)+elementId)+'</h6></div>';
	 htmlelement+='<input type="hidden" id="hdnCounter'+checkboxId+'" name="counter" value="'+(checkboxId.substring(0,2)+elementId)+'"><div class="inputDummy" id=txtallFb_'+(checkboxId.substring(0,2)+elementId)+' data-maxlength="" onkeydown="checkmaxlength()" onclick="populateProperties(this)" contentEditable=true data-placeholder="Enter text"></div>';
	 htmlelement+='</div></div>';
	 htmlelement+='<div class="colPageSection thirdColPic"><div class="eachCol">';
	 htmlelement+='<a href="#"><img src="img/getPicture.png"></a></div><div></div></div></div></div>';
	 
	 /*Checkbox add/delete button*/
	 htmlelement+='<div class="clear"></div><div class="eachCol pull-right">';
	 htmlelement+='<div class="plusBtn '+(checkboxId+elementId)+'" style="display:block"><img src="img/plus.png" onclick=addcheckBox() ></div>';
	 htmlelement+='<div class="minusBtn"><img src="img/minus.png" onclick=deleteCheckbox('+componentId+')></div>';
	 htmlelement+='<div class="clear"></div></div></div>';	
	 htmlelement+='<div class="clear">'; 
	 htmlelement+='</div></div></div>';
	 
	 htmlelement+='<input type="hidden" id="grd_'+checkboxId+'" value="0" />';
	 htmlelement+='<input type="hidden" id="chkAll_'+checkboxId+'" value="0" />';
	 htmlelement+='<input type="hidden" id="actAny_'+checkboxId+'" value="1" />';
	 
	 $("#formToolCanvasId").append(htmlelement);
	 $("#checkboxID").html("ID# "+checkboxId+"0");		 
	 $("#genFb"+checkboxId).hide();
	 $("#elementProperties").hide();
	 $("#properties").show();
	 
	 $("#acptAnyAnsBtnId").prop("checked",true);
		 clickAcceptAnyAnswer();
		 addRadioButtonFunctinality();	 
//	 toggleCheckAllApplyButton();	 
	 checkboxId++;
	 $("#checkAllThatApplyBtnId").prop("checked",false);
	 $("#gradadedObjectBtnId").prop("checked",false);
	
	 componentObject.html = $(htmlelement).wrap('<div></div>').parent().html();
	 $(".grid>input[type='checkbox']").attr("disabled",false);
}

/*
 * function to add radio button style to check all that apply question buttons
 * 
 * */
function addRadioButtonFunctinality(){
	$(".btn-group .btn" ).click(function() {
		  var parentElement = $(this).closest('span');
		  var parentElementX = $(this).closest('.btn');
		  $(parentElement).closest('div').find("span").not(parentElement).removeClass("activex");
		  $(parentElementX).closest('.btn-group').find(".btn").not(parentElementX).removeClass("active");
	});
}
/*Function to delete distractor
 * @id Component Id
 * @eleid Element / Distractor id
 * 
 * */
function deleteElement(id,eleid){
	//alert(id);
	//alert($(eleid).attr("id"));
  	var countw=$("#"+id).find(".tickCheck ");
	var count=$("#"+id).find(".tickCheck ").length;
    var lastelement=countw[count-1].attributes[0].value;
    var elementid=(eleid.attributes[1].value).toString().substring(6);
    
    if(lastelement==elementid){
    	 var secondlastelement=countw[count-2].attributes[0].value;
    	 $("."+(secondlastelement)).show();
     }
	var elementid=(eleid.attributes[1].value).toString().substring(6);
	$("#"+elementid).remove();
	$("#feedback"+elementid).remove();
	if($("#"+id).find(".tickCheck ").length==1)
		countw.find(".minusBtn").css("display","none");
}

/*
 * Function to delete Component
 * @id  Component Id
 * */

function deleteCheckbox(id){
	var result = openWarnignPopup();
	stateObject.liveObject.id = id;
	//$("#"+id).remove();
}

/*Function to add element
 * @id Component Id
  * */

function addElement(id){

	var lastelement= $('#'+id).find('.tickCheck').last()[0].attributes[0].value;
	$('#'+lastelement).find('.plusBtn').css("display","none");
	if($('#'+lastelement).find('.minusBtn').css("display")=='none')
		$('#'+lastelement).find('.minusBtn').css("display","block");
	var eleId=Number($("#hdnCounter"+id).val())+1;
	var htmlelement="";	
	 htmlelement+='<div class="rowPagesection tickCheck" id='+(eleId)+'><div class="colPageSection"><div class="eachCol"><div class="btn-group pull-left indt-mrgn">';
	 htmlelement+='<label data-toggle="buttons" class="btn btn-grey  btn-xs btn-bullet btn-bullet1 btnTick">';
	 htmlelement+='<input type="checkbox"><img src="img/tick.png">';
	 htmlelement+='</label>';
	 htmlelement+='<label data-toggle="buttons" style="padding-bottom:0px;padding-top:0px;" class="btn btn-grey  btn-xs btn-bullet btn-bullet2 btnTickWrong">';
	 htmlelement+='<input type="checkbox"><img src="img/tickwrong.png">';
	 htmlelement+='</label>';	
	 htmlelement+='</div>';
	 htmlelement+='</div>';		
	 htmlelement+='</div>';
	 htmlelement+='<div class="colPageSection secondColPic" id="author'+(eleId)+'">';
	 htmlelement+='<div><div class="editableDivTitle">';
	 htmlelement+='<h6 class="pull-right font10">ID# '+(eleId)+'  <a id="editfb'+(eleId)+'" onclick="showFeedback('+(eleId)+')">| edit feedback</a></h6></div>';
	 htmlelement+='<div class="inputDummy" id=txt_'+eleId+' onkeydown="checkmaxlength()" data-maxlength="" onclick="populateProperties(this)" contentEditable=true data-placeholder="Enter text"></div>';
	 htmlelement+='</div></div>';
			 
	 var newElement = new Object();
	 newElement.id = eleId;
	 getObjectFromArray(id);
	// console.log(getObjectFromArray(id));
	 
	 
	/* var componentObject =  getObjectFromArray(id); 
	 var componentObject = {};
	 $.each(FTState, function( index, component ) {
			if(Number(component.id==id)){
				componentObject = component;
			}
		});
	 componentObject.child.push(newElement);
	 console.log(JSON.stringify(componentObject));*/
	 currentObject.child.push(newElement);
	 htmlelement+='<div class="colPageSection secondColPic" id="stud'+(eleId)+'" style="display:none">';
     htmlelement+='<div>';
     htmlelement+='<div class="editableDivTitle"><h6 class="pull-right font10">ID# '+(eleId)+'<a id="editfb'+(eleId)+'" onclick="showFeedback('+(eleId)+')">| edit feedback</a></h6></div>';
     htmlelement+='<div class="editableStEntry">';
     htmlelement+='<div class="inputDummyFirst" id=authortxt_'+(eleId)+' onclick="populateProperties(this)"  onkeydown="checkmaxlength()" data-maxlength="" contentEditable=true data-placeholder="Enter text" ></div>';
     htmlelement+='<div class="inputDummySecond"  contentEditable=true data-placeholder="Enter text"></div>';
     htmlelement+='</div></div></div>';
	 
	 htmlelement+='<div class="colPageSection">';
	 htmlelement+='<div class="eachCol"><div class="plusBtn '+(eleId)+'" style="display:block"><a><img src="img/plus.png" onclick=addElement('+componentId+')></a></div><div class="minusBtn"><a href="#"><img src="img/minus.png" id=minus_'+(eleId)+' onclick=deleteElement('+componentId+',this)></a></div></div>';	
	 htmlelement+='<div></div></div>';
	
	
	 htmlelement+='<div id="feedback'+eleId+'" class="rowPagesection closeFeedback">';
	eleId++;
	htmlelement+='<div class="colPageSection"><div class="eachCol firstColPic"></div></div>';
	htmlelement+='<div class="colPageSection secondColPic"><div>';
	htmlelement+='<div class="editableDivTitle"><h6 class="pull-right font10">ID# '+eleId+' |  <a onclick="hideFeedback('+eleId+')"> close feedback</a></h6></div>';
	htmlelement+='<div class="inputDummy" id=fb_'+eleId+'  onkeydown="checkmaxlength()" data-maxlength="" onclick="populateProperties(this)" contentEditable=true data-placeholder="Enter text"></div></div>';
		
	
	htmlelement+='</div>';
	htmlelement+='<div class="colPageSection thirdColPic"><div class="eachCol">';
	htmlelement+='<a href="#"><img src="img/getPicture.png"></a>'; 
	htmlelement+='</div><div></div></div></div><div class="clear"></div></div>';
	
	//$( htmlelement ).insertAfter( "#feedback"+lastelement);
	$( htmlelement ).insertAfter( $("#"+id).find(".pageSectionBody").find(".tickCheck").last() );
	//console.log($("#"+id).find(".pageSectionBody").find(".tickCheck").last());
	$("#hdnCounter"+id).val(eleId);
	var newElmtId = eleId-1;
	if($("#acptAnyAnsBtnId").prop("checked")==true){
		$("#"+newElmtId).find(".colPageSection").find(".btnTick").trigger("click");
	//console.log($("#"+newElmtId).find(".colPageSection"));
	}
//	toggleCheckAllApplyButton();
	currentObject.html = $("#"+id).wrap("<div></div>").parent().html();

}

/*function toggleCheckAllApplyButton(){
	 $(".btn-group .btn" ).click(function() {
		   var parentElementX = $(this).closest('.btn');
		   $(parentElementX).closest('.btn-group').find(".btn").not(parentElementX).removeClass("active");
		  });
}*/

function populateId(id){
	$("#elementProperties").hide();
	$("#properties").show();
	if($("#chkAll_"+id).val()=='1'||$("#chkAll_"+id).val()==1)
		$("#checkAllThatApplyBtnId").prop("checked",true);
	else
		$("#checkAllThatApplyBtnId").prop("checked",false);

	if($("#actAny_"+id).val()=='1' ||$("#actAny_"+id).val()==1){
		$("#acptAnyAnsBtnId").prop("checked",true);
	}else{
		$("#acptAnyAnsBtnId").prop("checked",false);
	}
	$("#acptAnyAnsBtnId").attr("checked","checked");
	if($("#grd_"+id).val()=='1' ||$("#grd_"+id).val()==1){
		$("#gradadedObjectBtnId").prop("checked",true);
	}else{
		$("#gradadedObjectBtnId").prop("checked",false);
	}		
	$("#checkboxID").html("ID# "+id+"0");	
}
function toggleSelector(){
	var componentHtml =$("#checkboxID").html();
	var componentId = componentHtml.split(" ")[1].substring(0,componentHtml.split(" ")[1].length-1);	
}

/*(function ($) {
	$(document).on('change keydown keypress input', '*[data-placeholder]', function() {
		if (this.textContent) {
			this.setAttribute('data-div-placeholder-content', 'true');
		}
		else {
			this.removeAttribute('data-div-placeholder-content');
		}
	});
})(jQuery);*/

function clickCheckAllThatApply(){	
	/*var componentHtml = $("#checkboxID").html();
	var componentId = componentHtml.split(" ")[1].substring(0,componentHtml.split(" ")[1].length-1);
	$("#"+componentId).find(".pageSectionBody").children().each(function () {
		   if(this.id!='' && this.id != undefined){
	        $("#chkAllApply_"+componentId).val(false);
	    	var $obejct = $("#"+this.id).find(".colPageSection").first().find(".btn-group").find(".btn");
	    	if($obejct.is(":visible")){
	    		$obejct.hide();
	    	}	
	    	else{
	    		$obejct.show();
	       	}
	    	if($("#chkAllApplyHidden").val()!= '1' || $("#chkAllApplyHidden").val()!= 1){
	    		$obejct.show();
	    	}else{
	    		$obejct.hide();
	    	}
	    	$obejct.removeClass('active');
	    }
		
	});
	if($("#chkAllApplyHidden").val()!= '1' || $("#chkAllApplyHidden").val()!= 1)
		$("#chkAllApplyHidden").val(0);
	else
		$("#chkAllApplyHidden").val(1);*/
	if($("#checkAllThatApplyBtnId").prop("checked")){
		$("#chkAll_"+componentId).val(1);
	}else{
		$("#chkAll_"+componentId).val(0);
	}
	$("#acptAnyAnsBtnId").trigger("click");
}
function populateProperties(id){
  stateObject.liveObject.id=$(id).attr('id'); 
  var maxlenght=$(id).attr('data-maxlength');
   $("#txtmaxLenght").val(maxlenght);
   var elementid= $(id).attr('id').split("_")[1];		
   var questionId=$(id).attr('id').split("_")[0];
	if(questionId=="quetxt"||questionId=="fb"||questionId=="txtgenFb"||questionId=="txtallFb"){
		$("#entryType").hide();
		}
	else{$("#entryType").show();}	
	$("#elementProperties").show();
	$("#properties").hide();
	$("#elementid").html("ID# "+elementid);
	
}

function clickAcceptAnyAnswer(){
	var componentHtml = $("#checkboxID").html();
	var componentId = componentHtml.split(" ")[1].substring(0,componentHtml.split(" ")[1].length-1);	
	if($("#acptAnyAnsBtnId").prop("checked")){
		$("#actAny_"+componentId).val(1);
		$("#"+componentId).find(".pageSectionBody").children().each(function (){		   
			if(this.id!='' && this.id != undefined){
		    $("#"+this.id).find(".colPageSection").first().find(".btnTick").removeClass( "active");		    	
		    }
		});
	}else{
		$("#actAny_"+componentId).val(0);
		$("#"+componentId).find(".pageSectionBody").children().each(function (){		   
			if(this.id!='' && this.id != undefined){
		    		$("#"+this.id).find(".colPageSection").first().find(".btnTick").addClass( "active");		    	
		    }
		});
	}	
}

function clickGradedObject(){
	var cmpId = $("#checkboxID").html().split(" ");
	var id = cmpId[1].substring(0,cmpId[1].length-1);
	if($("#gradadedObjectBtnId").prop("checked")){
		$("#grd_"+id).val(1);
		gradedObjectCounter++;		
	}else{
		$("#grd_"+id).val(0);
		gradedObjectCounter--;
	}
	$("#gdObjetPcHolder").html(gradedObjectCounter);
}

/*Function to show feedback
 * @elementId Element / Distractor id
  * */
function showFeedback(elementId){
	$("#editfb"+elementId).hide();
	$("#feedback"+elementId).fadeIn("slow");		
}

/*Function to hide feedback
 * @elementId Element / Distractor id
  * */
function hideFeedback(elementId){
	elementId=Number(elementId)-1;	
	$("#feedback"+elementId).fadeOut("slow");
	$("#editfb"+elementId).show();
	}

/*Function to show  General feedback
 * @id Component Id  
 * */
function showGeneralFeedback(id){
  	if($("#editgeneralFb"+id).html()=="edit general feedback"){
	$("#editgeneralFb"+id).html(" close general feedback");
 	$("#genFb"+id).fadeIn("slow");
	}
	else{
		   $("#editgeneralFb"+id).html("edit general feedback");
	 	   $("#genFb"+id).fadeOut("slow");
		}
}

/*
 * Function to Open Error Modal Popup
 * */
function openWarnignPopup(massage){
	if(massage==undefined)
		massage= "Are you sure ? This will erase your content and cannot be undone.";
	$('#warningModalId').find("p").html(massage);
	  $('#warningModalId').reveal({
		     animation: 'none',                   //fade, fadeAndPop, none
		     animationspeed: 300,                       //how fast animtions are
		     closeonbackgroundclick: true,              //if you click background will modal close?
		     dismissmodalclass: 'close-reveal-modal'    //the class of a button or element that will close an open modal
		});
}


function warningModalClickCancel(){
	$('#warningModalId').trigger('reveal:close');
	return false;
}
function warningModalClickOk(){
	$('#warningModalId').trigger('reveal:close');
	$("#"+stateObject.liveObject.id).remove();
	return true;
	}

/*
 * Function to show help modal popup
 * */
function showHelpModal(){
	$("#helpModalId").reveal({
	     animation: 'none',                   //fade, fadeAndPop, none
	     animationspeed: 300,                       //how fast animtions are
	     closeonbackgroundclick: true,              //if you click background will modal close?
	     dismissmodalclass: 'close-reveal-modal'    //the class of a button or element that will close an open modal
	});
}

function changeMode(mode){
   var id=$("#elementid").html().split(" ")[1];
 //  debugger;
   	if(mode=='student'){
		$("#mode").html("Student Text");
		$("#author"+id).hide();
		$("#stud"+id).show();
		$("#authortxt_"+id).html($("#txt_"+id).html());
		}
	else if(mode=='Author'){
		$("#mode").html("Author Text");
		$("#author"+id).show();
		$("#stud"+id).hide();
		$("#txt_"+id).html($("#authortxt_"+id).html());
		}	
}

function insertHyperlink(){
     var elementid=stateObject.liveObject.id ;
	 var linktext=$("#linkText").val();
	 var linkaddress=$("#linkAddress").val();
	 var linkhtml="";
	 linkhtml="<a href="+linkaddress+'>'+linktext+"</a>&nbsp;";
	 $("#"+elementid).attr('data-placeholder','');
	 $("#"+elementid).append(linkhtml);
	
}

function changeFont(value){
	var arr = value.split("_");
	$("#fontValueId").val(arr[1]+" pt");
	$("li span").removeClass("glyphicon glyphicon-ok glyphicon-posi");
	$("a#"+value).addClass("btn-info");
	$("a#"+value+" span").addClass("glyphicon glyphicon-ok glyphicon-posi");
}

function getObjectFromArray(id){
	$.each(FTState, function( index, component ){
		if(Number(component.id)==id){
			currentObject = component;
		}
	});
}

function checkmaxlength(){
	 elementid=stateObject.liveObject.id ;
	 maxlength=$("#"+elementid).attr('data-maxlength');	
	 text=$("#"+elementid).text();
	 var counter=$("#"+elementid).text().length;
	 if(counter>5){
		$("#"+elementid).css("overflow","hidden");
		}	
	}

function clickIMDone(){	
	$.each(FTState, function( index, component ){
		component.html = $("#"+component.id).wrap("<div></div>").parent().html();
	});	
	$("#stateObjectJSON").val(JSON.stringify(FTState));
}

function renderStateObject(){
	$.each(FTState, function( index, component ){
		$("#formToolCanvasId").append(component.html);
	});
}

function startApp(theState){
	/*alert(JSON.stingify(theState));
	if(theState != undefined && theState.length>0){
		FTState = theState;
		renderStateObject();
	}
$("#formToolCanvasId").wysiwyg();
	
	if(FTState.length > 0){
		renderStateObject();
	}
	
	
	$(".draggCheckbox").draggable({		
        revert: false,
        opacity: 0.4,
		 helper: "clone" 
   });	
	
  $( "#formToolCanvasId" ).droppable({
		 drop: function( event, ui ){
			addcheckBox();			
			}	
	 });
  $("#elementProperties").hide();
  $("#properties").show();
  $( "#txtmaxLenght" ).focusout(function(){
	  var maxvalue=$("#txtmaxLenght").val();
	  var elementid=stateObject.liveObject.id ;
	  stateObject.liveObject.maxlenght=maxvalue;
	  var id=$("#elementid").html().split(" ")[1];
	  
	  $("#txt_"+id).attr('data-maxlength',maxvalue);	
	  $("#txt_"+id).attr('contentEditable','true');
	  $("#authortxt_"+id).attr('data-maxlength',maxvalue);	
	  $("#authortxt_"+id).attr('contentEditable','true');
  });

  $(".indt-mrgn .btn" ).click(function(){
	  var parentElementX = $(this).closest('.btn');
	  $(parentElementX).closest('.btn-group').find(".btn").not(parentElementX).removeClass("active");
  });*/
}