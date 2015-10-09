/* ========================================================================
 * TableDropDownOption: Object Declaration
 * ========================================================================
 * Purpose of this object to have all multiple choice option specific properties like
 * idPrefix,sectionId,sectionIdPrefix,editor,pointsValueEditor,pointsValuePrefix
 * ======================================================================== */
var TableDropDownOption = function(options){
	this.id = null;
	this.idPrefix = "E";
	this.sectionId = null;
	this.sectionIdPrefix = null;
	this.componentId=null;
	this.componentIdPrefix=null;	
	this.editor = null;
	this.answers=new Array();
	$.extend(this, options);
	this.editor = new Editor({id:this.sectionIdPrefix+this.sectionId+this.idPrefix+this.id});
	this._showFeedback = TableDropDownOption.BindAsEventListener( this, this.showFeedback );
	this._update = TableDropDownOption.BindAsEventListener( this, this.update );
	this._addOption=TableDropDownOption.BindAsEventListener( this, this.addOption );	
	this._removeOption=TableDropDownOption.BindAsEventListener( this, this.removeOption );
	this._markRight = TableDropDownOption.BindAsEventListener( this, this.markRight );
	this._markWrong = TableDropDownOption.BindAsEventListener( this, this.markWrong );
	this._closeRangeFeedback = TableDropDownOption.BindAsEventListener( this, this.closeRangeFeedback );
	this._filter =TableDropDownOption.BindAsEventListener( this, this.filter );
	this._setRight = TableDropDownOption.BindAsEventListener( this, this.setRight );
	this._populateEditorProperties = TableDropDownOption.BindAsEventListener( this, this.populateEditorProperties );
	this._updateStudentResponse = TableDropDownOption.BindAsEventListener( this, this.updateStudentResponse );
	this._updateEditor= TableDropDownOption.BindAsEventListener( this, this.updateEditor );
};
//add event helper method on element id
TableDropDownOption.addEvent = function(oTarget, sEventType, fnHandler,args) {
	$("#"+oTarget).unbind(sEventType);
	$("#"+oTarget).bind(sEventType,args,fnHandler);
};
//add event helper method on element class
TableDropDownOption.addEventOnClass = function(oTarget, sEventType, fnHandler,args) {
	$("."+oTarget).unbind(sEventType);
	$("."+oTarget).bind(sEventType,args,fnHandler);
};

//use call to borrow context
TableDropDownOption.BindAsEventListener = function(object, fun) {
    return function(event) {
    	event.stopImmediatePropagation();
        return fun.call(object, (event || window.event));
    };
};
TableDropDownOption.prototype = { 
	  getComponentIdPrefix: function( ){
            return this.componentIdPrefix;  
	     },
	     setComponentIdPrefix: function( componentIdPrefix){
	         this.componentIdPrefix =  idPrefix;
	     },
	     getComponentId: function( ){
            return this.componentId;  
	     },
	     setComponentId: function( componentId){
	         this.componentId =  componentId;
	     },
		/**
	 * gets id of Multiple Choice option
	 * @returns  id
	 */
		getId : function(){
		return this.id;
	},
	/**
     * sets id of Multiple Choice Option
     * @param id
     */
	setId : function(id){
		this.id = id;
	},
	/**
	 * gets idPrefix of Multiple Choice option
	 * @returns  idPrefix
	 */
	getIdPrefix : function(){
		return this.idPrefix;
	},
	/**
     * sets idPrefix of Multiple Choice Option
     * @param idPrefix
     */
	setIdPrefix : function(idPrefix){
		this.idPrefix = idPrefix;
	},
	/**
	 * gets sectionId of Multiple Choice option
	 * @returns  sectionId
	 */
	getSectionId : function(){
		return this.sectionId;
	},
	/**
     * sets sectionId of Multiple Choice Option
     * @param sectionId
     */
	setSectionId : function(sectionId){
		this.sectionId = sectionId;
	},
	/**
	 * gets sectionIdPrefix of Multiple Choice option
	 * @returns  sectionIdPrefix
	 */
	getSectionIdPrefix : function(){
		return this.sectionIdPrefix;
	},
	/**
     * sets sectionIdPrefix of Multiple Choice Option
     * @param sectionIdPrefix
     */
	setSectionIdPrefix : function(sectionIdPrefix){
		this.sectionIdPrefix = sectionIdPrefix;
	},
	/**
	 * gets editor of Multiple Choice option
	 * @returns  editor
	 */
	getEditor : function(){
		return this.editor;
	},
	/**
     * sets editor of Multiple Choice Option
     * @param editor
     */
	setEditor : function(editor){
		this.editor = editor;
	},
	/**
	 * gets answers of Multiple Choice option
	 * @returns  answers
	 */
	getAnswers : function(){
		return this.answers;
	},
	/**
     * sets answers of Multiple Choice Option
     * @param answers
     */
	setAnswers : function(answers){
		this.answers = answers;
	},
	 /**
     * updates editor text
     */
    update: function(e){
  	  this.editor.update();
  	  var i=0;
  	  for( i in this.answers){
  		  this.answers[i].update();
  	  }
    },
	/**
     * layouts options  in design mode
     * @returns {String}
     */
	 layout: function(isLast,pointBasedResponse){
		 var css = isLast?' style="display: block;"':' style="display: none;"';

    	 var htmlelement='';
    	 var activeRightCss = "";
    	 var activeWrongCss = "";
    	 if( this.answers[0].right ){
    		 activeRightCss = 'active';
    		 activeWrongCss = '';
    	 } else {
    		 activeRightCss = '';
    		 activeWrongCss = 'active';
    	 }
    	 var groupName = this.editor.id;
    	 groupName = groupName.substring(0,6);
    	 htmlelement+='<div id="ans_'+this.editor.id+'" class="rowPagesection tickCheck">';
    	 htmlelement+='   <div class="colPageSection">';
    	 htmlelement+='       <div class="eachCol firstColPic" >';
    	 /*htmlelement+='           <div class="btn-group pull-left indt-mrgn">';
    	 htmlelement+='              <label class="btn btn-grey  btn-xs btn-bullet btn-bullet1 btnTick '+activeRightCss+'" id="right_'+this.editor.id+'" >';
    	 htmlelement+='                   <input type="checkbox" id="right_'+this.editor.id+'">';
    	 htmlelement+='                   <img src="img/tick1.png">';
    	 htmlelement+='               </label>';
    	 htmlelement+='               <label class="btn btn-grey  btn-xs btn-bullet btn-bullet2 btnTickWrongMul '+activeWrongCss+'" id="wrong_'+this.editor.id+'"  style="padding-bottom:0px;padding-top:0px;">';   
    	 htmlelement+='                   <input type="checkbox" id="wrong_'+this.editor.id+'">';
    	 htmlelement+='                   <img src="img/tick2.png">';
    	 htmlelement+='               </label>';
    	 htmlelement+='           </div>';*/
    	 
    	 htmlelement+=' 		<div class="radioOption" style="display:none;">';
    	 htmlelement+=' 				<input type="radio" name="'+groupName+'"  id="option_'+this.editor.id+'"  /><label for="option_'+this.editor.id+'"><span></span></label>';
    	 htmlelement+=' 		</div>';
    	 
    	 htmlelement+='       </div>';
    	 htmlelement+='   </div>';
    	 htmlelement+=this.layoutEditor();
    	     	 
    	 $.each(this.answers,function(i,value){
   		  htmlelement += value.layoutPoint(pointBasedResponse);
   	     });
    	 
    	 htmlelement+='   <div class="colPageSection">';
    	 htmlelement+='       <div class="eachCol">';
    	 htmlelement+='           <div class="plusBtn" '+css+' > ';
    	 htmlelement+='               <a  title="Add Option">';
    	 htmlelement+='                   <img  id="plus_'+this.editor.id+'" src="img/plus.png">';
    	 htmlelement+='               </a>';
    	 htmlelement+='           </div>';
    	 htmlelement+='       <div class="minusBtn">';
    	 htmlelement+='                <a title="Delete Option">';
    	 htmlelement+='                   <img id="minus_'+this.editor.id+'" src="img/minus.png">';
    	 htmlelement+='               </a>';
    	 htmlelement+='          </div>';
    	 htmlelement+='      </div>';
    	 htmlelement+='  </div>';
    	 htmlelement+=this.layoutFeedback();
    	 htmlelement+='</div>';
    	 return htmlelement;
     },
     /**
      * layouts option editor 
      * @returns {String}
      */
     layoutEditor:function(){
	 	 var htmlelement="";
	 	 var dataDivAttr = this.editor.text !='' ? 'data-div-placeholder-content' : '';	    		
    		 htmlelement+='   <div id="author'+this.editor.id+'" class="colPageSection secondColPic">';
        	 htmlelement+='       <div>';
        	 htmlelement+='           <div class="editableDivTitle">';
        	 //htmlelement+='				<h6 class="pull-right font10">ID# '+this.editor.id+'<a id="editfb_'+this.editor.id+'">| Expand feedback</a></h6>';
        	 htmlelement+='				<h6 class="pull-right font10">ID# '+this.editor.id+'</h6>';
        	 htmlelement+='          </div>';
        	 htmlelement+='		<div id="htmlToText'+this.editor.id+'" style="display:none;"></div>';
        	 htmlelement+='          <div contenteditable="true" onFocus="focusHandler(this)" onkeypress="keyPressHandler(this)" onmouseup="mouseupKeyupHandler(this)" onkeyup="mouseupKeyupHandler(this)" data-placeholder="Enter text" id="'+this.editor.id+'"  data-maxlength="'+this.editor.maxLength+'" class="inputDummy" '+dataDivAttr+'>'+this.editor.text+'</div>';
        	 htmlelement+='      </div>';
        	 htmlelement+='   </div>';
    	 return htmlelement;
      },
      
      
      editorPropertyLayout:function(){
      	     	
      	var htmlelement="";
      	//htmlelement+='<p style="display:none;" id="elementid">ID# '+this.editor.id+'</p>';
      	 var elementType ="Element: Input field";
      	 htmlelement+='    <div class="tabContent tabProContent">';
  	   	 htmlelement+='        <p>Component: Multiple Choice</p>';
  	   	 htmlelement+='        <p>'+elementType+'</p>';
  	   	 htmlelement+='        <p id="elementid">ID# '+this.editor.id+'</p>';
  	   	 htmlelement+='    </div>';
  	   	 htmlelement+='    <div class="clear"></div>';
  	   	 htmlelement+='    <div class="gap10"></div>';
  	   	 return htmlelement;
      },
      /**
       * marks current option as right
       * @param event
       */
      markRight:function(){      	
    	  this.answers[1].right=false;
    	  this.answers[0].right=true;  
    	  if(this.answers[0].right&& $("#wrong_"+this.editor.id).hasClass("active")){
				$("#wrong_"+this.editor.id).removeClass("active");
				$("#right_"+this.editor.id).addClass("active");
		}	    	  	
      },
      
      populateEditorProperties:function(){
      	$("#elementProperties").html(this.editorPropertyLayout());
      	$("#elementProperties").show();
		$("#properties").hide();
		this.afterEditorPropertyLayout();
		$("#activeHyperlink").text("");
       },
       
       /**
  	  * adds events for html elements of current option editor property pane
  	  */
  	 afterEditorPropertyLayout:function(){
  		 Option.addEvent( "insertHelp"+this.editor.id,"click",this._openHelpModalForInsertHyperlink);
  		 Option.addEvent( "insert_"+this.editor.id, "click", this._updateEditor);
  		 
  	 },
  	/**
      * updates editor properties
      */
  	 updateEditor:function(event){    	
  		var linkText=$("#linkText_"+this.editor.id).val();
			var linkAddress=$("#linkAddress_"+this.editor.id).val();
			var url=$("#linkAddress_"+this.editor.id).val();	 		
	 		
	 		//this.evaluateUrl(linkAddress, linkText, this.editor.id);
	 		
	 		if(/^(https?|s?ftp):\/\/(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i.test(url)) {
			if(linkText != ""){
				if(url.slice(-1)==="/"){
	 	 			url=url.substring(0,url.length-1);
	 	 		} 
	 	 		linkAddress=url;
	 	 		util.evaluateUrl(linkAddress, linkText, this.editor.id);
			}
			else{
				var currentEditor = ("linkText_"+this.editor.id);
				new Modal(
	  	   			      {
	  	   			    	  id : 1,headingText : "Validation Error",
	  	   			    	  containtText : "Please enter display text",
	  	   			    	  closeActionEvent:function(){
	  	   			    		  $('#'+currentEditor).trigger("focus");
	  	   			    		  $('#'+currentEditor).text("");
	  	   			    	  }
	  	   			      }).getWarningModal();
			}
			
		} else {
			var currentEditor = ("linkAddress_"+this.editor.id);
			new Modal(
  	   			      {
  	   			    	  id : 1,headingText : "Validation Error",
  	   			    	  containtText : "Please enter valid Url",
  	   			    	  closeActionEvent:function(){
  	   			    		  $('#'+currentEditor).trigger("focus");
  	   			    		  $('#'+currentEditor).text("");
  	   			    	  }
  	   			      }).getWarningModal();
		}
 	    },
      /**
       * Function to set radio button right/wrong
       * ***/
      setRight : function(event){
    	  event.stopPropagation();

    	  var isChecked =$("#option_"+this.editor.id).prop("checked");
    	  
    	  if(isChecked){
    		  this.answers[0].right=true;
    	  }
    	  else{
    		  this.answers[0].right=false;
    	  }
      },
      /**
       * marks current option as wrong
       * @param event
       */
      markWrong:function(){  
    	  this.answers[1].right=true;
    	  this.answers[0].right=false;
    	  if (this.answers[1].right && $("#right_" +this.editor.id).hasClass("active")) {
     		 $("#right_" +this.editor.id).removeClass("active");
				 $("#wrong_" +this.editor.id).addClass("active");
				} 
      },
      
      /**
       * layouts option feedback editor 
       * @returns {String}
       */
      layoutFeedback:function(){
    	  htmlelement="<div id='feedback_"+this.editor.id+"' style='display : none;'>";
    	  $.each(this.answers,function(i,value){
    		  htmlelement += value.layoutFeedback();
    	  });
    	  htmlelement +='</div>';
    	  return htmlelement;
       },
       /**
        * adds event handlers to html element for feedback
        */
       afterLayout:function(){
    	   TableDropDownOption.addEvent( "editfb_"+this.editor.id, "click", this._showFeedback );
    	   TableDropDownOption.addEvent( this.editor.id, "blur", this._update );
    	   TableDropDownOption.addEvent( this.editor.id, "paste", this._filter );
    	   TableDropDownOption.addEvent( "right_"+this.editor.id, "click", this._markRight );
    	   TableDropDownOption.addEvent( "wrong_"+this.editor.id, "click", this._markWrong );
    	   TableDropDownOption.addEvent( "plus_"+this.editor.id, "click", this._addOption,{id:this.editor.id} );
    	   TableDropDownOption.addEvent( "minus_"+this.editor.id, "click", this._removeOption,{id:this.editor.id} );
    	   TableDropDownOption.addEvent( "option_"+this.editor.id, "click", this._setRight);
    	   TableDropDownOption.addEvent( this.editor.id, "click", this._populateEditorProperties );
    	
     	   $("#option_"+this.editor.id).prop("checked",this.answers[0].right);
   	 },
   	/**
      * display option feedback
      */
   	 showFeedback:function(){
  		$("#editfb_"+this.editor.id).hide("slow");
  		$("#feedback_"+this.editor.id).show("slow");		
   	 },
   	 /**
      * hide and show point base layout
      */
     togglePonits:function(pointflag){
   	  $.each(this.answers,function(i,answerObj){
			  answerObj.togglePonits(pointflag);
		  });
     },
     /**
		 * check if option is filled
		 * 
		 */
	isOptionFilled:function(){
		$("#htmlToTextConvertor").html(this.editor.text);
		var optionText = $("#htmlToTextConvertor").text();
		 if(optionText.length<=0) {
			    return false; 
			  }else{
			    return true;
		  }		   
	},
	 /**
      * Validate if right answer is not selected
      */
     isRightAnswerSelected:function(){
	   	  var rightAnswerSelected=true;
	   	  rightAnswerSelected = (this.answers[0].right==true || this.answers[1].right==true)?true:false;
	   	  return rightAnswerSelected;
     },
	/**
	 * check if rangeBased values are entered 
	 * 
	 */
	isOptionAnswerPointValueFilled:function(){
		var isPointValueFilled=true;
		$.each(this.answers,function(i,answerObj){
			isPointValueFilled=isPointValueFilled && answerObj.isPointValueFilled();
		  });
		return isPointValueFilled;
	},
	/**
	 * adds new option for component
	 */
	addOption:function(event){
		var i=0;
	    for( i in page.components){
	    	if(page.components[i].id == this.componentId){
	    			var currentCellComponent = page.components[i].getItemValById(page.components[i].cellComponentCollection, page.components[i].cellId, "component");
		    		var newId = currentCellComponent.sections[0].options[currentCellComponent.sections[0].options.length-1].getId()+1;
		    		var option = new TableDropDownOption({id:newId,sectionId:this.sectionId, sectionIdPrefix:this.sectionIdPrefix,componentId : this.componentId,componentIdPrefix : this.componentIdPrefix	});		    			
		    		var optionAnswers = [];
		    		
					var optionAnswersConfig = {
							id:1,
							optionId : option.id,
							optionIdPrefix : option.sectionIdPrefix+option.sectionId+option.idPrefix,
							componentId : this.componentId,
							componentIdPrefix : this.componentIdPrefix,
							sectionId : option.sectionId,
	    					sectionIdPrefix : option.sectionIdPrefix,
	    					right:page.components[i].binaryAnswer?true:currentCellComponent.acceptAnyAnswer
						};				
					optionAnswers[0]=new TableDropDownOptionAnswer(optionAnswersConfig);					
					option.setAnswers(optionAnswers);
					currentCellComponent.sections[0].addOption(option);			
					var $lastOption=$("#ans_"+event.data.id);
					if( $lastOption.find(".colPageSection").find(".eachCol").find(".plusBtn").is(":visible"))
		    			 $lastOption.find(".colPageSection").find(".eachCol").find(".plusBtn").hide();
		    	     $lastOption.after(option.layout(true,page.components[i].pointBasedResponse));
		    	     //page.components[i].pointBaseResponse();
		    	     currentCellComponent.showSolutionIndicator();
		    	     $lastOption.find(".colPageSection").find(".eachCol").find(".minusBtn").show(); 			    	   
		    	     option.afterLayout();
	    	}
       }
	},
	
	/**
	 * removes current option from component
	 */
	removeOption:function(event){	
		var i=0;
	    for( i in page.components){
	    	if(page.components[i].id == this.componentId){
	    		var currentCellComponent = page.components[i].getItemValById(page.components[i].cellComponentCollection, page.components[i].cellId, "component");
			    			for(k in currentCellComponent.sections[0].options){
			    			if(currentCellComponent.sections[0].options[k].getId()==this.id){
			    				    currentCellComponent.sections[0].removeOption(currentCellComponent.sections[0].options[k]);
				    				var lastOption=("ans_"+currentCellComponent.sections[0].options[currentCellComponent.sections[0].options.length-1].editor.id);
				    				var id=event.data.id;
				    				var previous=$('#ans_'+id).prev('div').attr('id');
				    				$( "#ans_"+this.editor.id).remove();
					    			if(previous==lastOption){
				    					$("#"+previous).find(".colPageSection").find(".eachCol").find(".plusBtn").show();	    	    			
				    				}
					    			if(currentCellComponent.sections[0].options.length<=1){
				    					$('#'+lastOption).find(".colPageSection").find(".eachCol").find(".minusBtn").hide();
				    				}
					    			//currentCellComponent.updateMinMaxPoint();
			    				}		
			    			}
		    	}
		    }
	},
	/**
	 * resets point value
	 */
	resetPointValue:function(){
		$.each(this.answers,function(i,answerObj){
			$('#'+answerObj.pointsValueEditor.id).html="";
			answerObj.pointsValueEditor.text="";
		  });
	},
	/**
	 * reset answers
	 * @param flag
	 * @param binaryAns
	 */
	resetAnswer:function(flag,binaryAns){
		var editor = this.editor;
		$.each(this.answers,function(i,answerObj){
			answerObj.right = flag;
			if(!binaryAns){
				$("#option_"+editor.id).prop("checked",flag);
			}
		  });
	},
	/**
	 * filters html to remove img tag and non compatible formatting
	 * @param event
	 */
	filter:function(event){
		util.removePasteImage(event.originalEvent.clipboardData,event);
	},
	/**
     * layouts in instructor mode
     * @returns {String}
     */
    instructorLayout:function(binaryAnswer,subType,firstOption,acceptAnyAnswer,pointBasedResponse,orientation){
		 var htmlelement='';
		 htmlelement +='<div class="prevQuestOpts">';
		 
		 if(binaryAnswer){
				
			 if(firstOption){
				 var i=0;
				 for(i in this.answers){
					 htmlelement +='<div class="colPageSection minColPic" >'+((this.answers[i].label==null)?"":this.answers[i].label)+'</div>';
				 }
				 htmlelement+='<div class="clear"></div>';
			 }
		 }
		
		 var points=[];
		 var j=0;
		 var feedbackText=""; 
		 feedbackText +='<label class="feedbackLinkPosition"><a  class="feedClose">Feedback</a></label>';
		 var feedbackFlag=false;
		 for(j in this.answers){
			 var checkproperty=!acceptAnyAnswer && this.answers[j].right?"checked='checked'":"";
			 var binaryOptionGap=(binaryAnswer)?"minColPic":"";
			 htmlelement +='<div class="colPageSection '+binaryOptionGap+'" ><input id="option'+this.editor.id+'_'+j+'" name="mc'+this.editor.id+'" type="radio" '+checkproperty+' disabled></div>';
			 this.answers[j].feedback.text = this.answers[j].feedback.text.replace("&nbsp;","");
			 if(this.answers[j].feedback.text!=''){
				 feedbackText +=' <div  style="height:10px;"> </div>';
				 feedbackText +=' <div style="display: none;" class="feedBackOpen">';
				 if(binaryAnswer){
					 feedbackText +=' <strong>Option'+(parseInt(j)+1)+'feedback: </strong>'+this.answers[j].feedback.text;
				 }else{
					 feedbackText +=' <strong>feedback: </strong>'+this.answers[j].feedback.text;
				 }
				 feedbackText +='</div>'; 
				 feedbackFlag = true;
			 }
			 if(pointBasedResponse){
				 points.push(parseFloat(this.answers[j].pointsValueEditor.text));
				 pointText +=this.answers[j].pointsValueEditor.text ;
				 pointText +=(parseFloat(this.answers[j].pointsValueEditor.text)>1)?" pts.":" pt.";
			 }
		 }
		 
		 if(!feedbackFlag)
			 feedbackText=""; 
		 
		 var pointText=" ";
		 if(pointBasedResponse){
			 if(binaryAnswer){
				 	points =points.sort(function (a, b) {
	  				   return a > b ? 1 : a < b ? -1 : 0;
			  		 }); 
			      	 var  minPoint=points[0];
			         var  maxPoint=points[points.length-1];
			         pointText +=minPoint+" pts. | " ;
					 pointText +=maxPoint+" pts.";
			 }else{
				 pointText +=points[0] ;
				 pointText +=(points[0]>1)?" pts.":" pt.";
			 }
			 
		 }
		 try{
			 this.editor.text=this.editor.text.trim();
		 }
		 catch(ex){}
		 this.editor.text = this.editor.text.replace("&nbsp;","");
		if(orientation!=1 && !binaryAnswer ){
			var styleClass=(orientation==3)?"column-2":(orientation==2)?"defaultMCOptionPreview":"";
			 htmlelement +='<div class="colPageSection  '+styleClass+'" ><label for="option'+this.editor.id+'_1"><span class="pull-left lblLeft"><div class="stdQueLabel">'+this.editor.text+'<span class="boldclass">'+pointText+'</span>'+feedbackText+'</div></span></label></div>';
		}else{
			 htmlelement +='<div class="colPageSection secondColPic" ><label for="option'+this.editor.id+'_1"><span class="pull-left lblLeft"><div class="stdQueLabel">'+this.editor.text+'<span class="boldclass">'+pointText+'</span>'+feedbackText+'</div></span></label></div>';
		}
		htmlelement +='</div>';
		 return htmlelement;
    },
    /**
     * layouts in student test mode
     * @returns {String}
     */
    studentLayout:function(binaryAnswer,subType,firstOption,orientation,acceptAnyAnswer,pointBasedResponse,showPointsToStudents){
    	var htmlelement='';
    	if(subType=='radio'){
			 htmlelement +='<div class="prevQuestOpts">';
			 if(binaryAnswer){
					
				 if(firstOption){
					 var i=0;
					 for(i in this.answers){
						 htmlelement +='<div class="colPageSection minColPic" >'+((this.answers[i].label==null)?"":this.answers[i].label)+'</div>';
					 }
					 htmlelement+='<div class="clear"></div>';
				 }
			 }
			 var optionText = this.editor.text +" ";
			 var j=0;
			 for(j in this.answers){
				 htmlelement += this.answers[j].studentLayout(binaryAnswer);
			 }
			 
			 if(orientation!=1 && !binaryAnswer ){
				 var styleClass=(orientation==3)?"column-2":(orientation==2)?"defaultMCOptionPreview":"";
				 htmlelement +='<div class="colPageSection '+styleClass+'"><label for="option'+this.editor.id+'_1"><span class="pull-left lblLeft"><div class="stdQueLabel">'+optionText+'</div></span></label></div>';
			}else{
				 htmlelement +='<div class="colPageSection secondColPic" ><label for="option'+this.editor.id+'_1"><span class="pull-left lblLeft"><div class="stdQueLabel">'+optionText+'</div></span></label></div>';
			}
			
			 htmlelement+= '</div>';
    	} else {
    		var optionText = this.editor.text;
			
			var x = 0;
			var isSelected = '';
			for( x in this.answers ){
				if( this.answers[x].studentResponse ){
					isSelected = 'selected';
				}
			}
			htmlelement +='<option '+isSelected+' value="'+this.id+'" id="opt_'+this.editor.id+'">'+optionText+'</option>';
    	}
		 return htmlelement;
    },
    /**
     * add event handers to html elements after the layout done in student test mode
     * @returns {String}
     */
    afterStudentLayout:function(){   
    	var j=0;
		 for(j in this.answers){
			 this.answers[j].afterStudentLayout();
		 }
		 TableDropDownOption.addEvent( 'opt_'+this.editor.id, "change", this._updateStudentResponse );
		 $('.stdQueLabel').each(function (){
				$(this).find('font').css('line-height', $(this).find('font').css('font-size'));
	     });
    },
    updateStudentResponse : function(){
    	this.answers[0].resetStudentResponse();
    	this.answers[0].studentResponse = true;
    	question.updateProgressBar();
    },
    /**
     * layouts in check my work status mode
     * @returns {String}
     */
    checkMyWorkLayout:function(){        	
   	 
    },
    /**
     * builds the layout for post Submission Review mode
     * @returns {String} html element
     */
    postSubmissionReviewLayout:function(binaryAnswer,subType,firstOption,acceptAnyAnswer,pointBasedResponse,orientation,isStudentChecked,showPointsToStudents){
    	var htmlelement='';
		 htmlelement +='<div class="prevQuestOpts">';
		 
		 if(binaryAnswer){
				
			 if(firstOption){
				 var i=0;
				 htmlelement +='<div  class=" answerTick thirdColPic" ></div>';
				 for(i in this.answers){
					 htmlelement +='<div class="colPageSection minColPic" >'+((this.answers[i].label==null)?"":this.answers[i].label)+'</div>';
				 }
				 htmlelement+='<div class="clear"></div>';
			 }
		 }
		
		 var points=[];
		 var j=0;
		 var feedbackText=""; 
		 var css = (acceptAnyAnswer) ? '' : this.isCorrectAnswerGiven(binaryAnswer)?"correct":"inCorrectCell";
		 var hidden= this.answers[j].studentResponse!=null?"style='visibility:visible'":"style='visibility:hidden'";
		 if(css == "correct"){
			 $("#"+this.componentIdPrefix+this.componentId+this.cellId).addClass("correct");
		 }
		 else{
			 $("#"+this.componentIdPrefix+this.componentId+this.cellId).addClass("inCorrectCell");
		 }
		 htmlelement +='<div '+hidden+'  class="answerTick '+css+'" ></div>';
		 var isStudentAnswered = false;
		 for(j in this.answers){
			 var checkproperty= this.answers[j].studentResponse?"checked='checked'":"";
			 var binaryOptionGap=(binaryAnswer)?"minColPic":"";
			 htmlelement +='<div class="colPageSection '+binaryOptionGap+'" >';
			 htmlelement +='<input id="option'+this.editor.id+'_'+j+'" name="mc'+this.editor.id+'" type="radio" '+checkproperty+' disabled></div>';
			 this.answers[j].feedback.text = this.answers[j].feedback.text.replace("&nbsp;","");
			 if( this.answers[j].feedback.text!='' && this.answers[j].studentResponse){
				 feedbackText +='<label  class="feedbackLinkPosition"><a  class="feedClose">Feedback</a></label>';
				 feedbackText +=' <div  style="height:10px;"> </div>';
				 feedbackText +=' <div style="display: none;" class="feedBackOpen">';
				 if(binaryAnswer){
					 feedbackText +=' <strong>Option'+(parseInt(j)+1)+' feedback: </strong>'+this.answers[j].feedback.text;
				 }else{
					 feedbackText +=' <strong>Feedback: </strong>'+this.answers[j].feedback.text;
				 }
				 feedbackText +='</div>'; 
			 }
			 
			 if(pointBasedResponse && showPointsToStudents){
				 points.push(parseFloat(this.answers[j].pointsValueEditor.text));
				 pointText +=this.answers[j].pointsValueEditor.text ;
				 pointText +=(parseFloat(this.answers[j].pointsValueEditor.text)>1)?" pts.":" pt.";
			 }
			 
			 if( pointBasedResponse && this.answers[j].studentResponse ) {
				 isStudentAnswered = true; 
			 }
		 }	
		 
		 var pointText=" ";
		 if(pointBasedResponse && showPointsToStudents){
			 if(binaryAnswer){
				 	points =points.sort(function (a, b) {
	  				   return a > b ? 1 : a < b ? -1 : 0;
			  		 }); 
			      	 var  minPoint=points[0];
			         var  maxPoint=points[points.length-1];
			         pointText +=minPoint+" | " ;
					 pointText +=maxPoint+" pts.";
			 }else{
				 pointText +=points[0] ;
				 pointText +=(points[0]>1)?" pts.":" pt.";
			 }
			 
		 }
		 
		 var inCompleteText = '';
		 if( !isStudentAnswered && isStudentChecked && pointBasedResponse && binaryAnswer ){
			inCompleteText = '<span class="inCompleteAnswerBanner" >You did not complete this question.</span>';
		 }
		 feedbackText = feedbackText.replace(/\Â/g," ");
		 var text = this.editor.text;
		 text = text.replace(/\Â/g," ");
		 if(orientation!=1 && !binaryAnswer ){
			 var styleClass=(orientation==3)?"column-2":(orientation==2)?"defaultMCOptionPreview":"";
			 htmlelement +='<div class="colPageSection '+styleClass+'"><label for="option'+this.editor.id+'_1"><span class="pull-left lblLeft"><div class="stdQueLabel">'+text+'<span class="boldclass">'+pointText+'</span>'+feedbackText+'</div></span> ' +inCompleteText+ '</label></div>';
		 } else {
			 htmlelement +='<div class="colPageSection secondColPic" ><label for="option'+this.editor.id+'_1"><span class="pull-left lblLeft"><div class="stdQueLabel">'+text+'<span class="boldclass">'+pointText+'</span>'+feedbackText+'</div></span> '+inCompleteText+'</label></div>';
		 }
		 
		htmlelement +='</div>';
		 return htmlelement;
    },
    /**
     * check if correct answer given by student
     */
    isCorrectAnswerGiven:function(binaryAnswer){
    	var flag= false;
    	if(binaryAnswer){
    		 if((this.answers[0].right && this.answers[0].studentResponse) || (this.answers[1].right && this.answers[1].studentResponse)){
    			 flag=true;
			 }else{
				 flag=false;
			 }
    	}else{
    		if(this.answers[0].right && this.answers[0].studentResponse){
    			flag=true;
   		 }
    	} 
    	return flag;
    },
    /**
	 * check if question is answered
	 */

    isStudentAnswered:function(binaryAnswer){
         var validflag=false;
         if(binaryAnswer){
				if(this.answers[0].studentResponse!=null || this.answers[1].studentResponse!=null){
					validflag=true;
				}
			}else if(this.answers[0].studentResponse!=null){
				validflag=true;
			}
		return validflag;
    },
    /**
	 * calculate points for student
	 */
	calculatePoints:function(){
		var points=0;
		 var i=0;
		 for( i in this.answers){
			 if(this.answers[i].studentResponse){
				 points+=this.answers[i].pointsValueEditor.text!=""?parseFloat(this.answers[i].pointsValueEditor.text):0;
			 }
		 }	
		 return points;
			
	}
	
};