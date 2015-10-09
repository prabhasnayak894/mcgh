/* ========================================================================
 * StudentEntry: Object Declaration
 * @author: Manali Gaikwad
 * ========================================================================
 * Purpose of this object to have all component section specific properties like 
 * holds the answer, feedback for this component
 * ======================================================================== */

var TableStudentEntry = function(options){ 
	this.id=null;
	this.idPrefix = "SE";
	this.answerIdPrefix = "A";
	this.feedbackIdPrefix = "F";
	this.orientation=1;
	this.componentId=null;
	this.componentIdPrefix=null;
	this.sectionId=null;
	this.sectionIdPrefix="G";
	this.type="";
	this.contentFormat=new ContentFormatEnum().ALPHANUMERIC;
	this.cellId = null;
	$.extend(this, options);
	this.editor = new Editor({id:this.componentIdPrefix+this.componentId+this.idPrefix+this.id+this.cellId});
	this.answer = new Editor({id:this.componentIdPrefix+this.componentId+this.sectionIdPrefix+this.sectionId+this.answerIdPrefix+this.id});
	this._validateAnswer=TableStudentEntry.BindAsEventListener( this, this.validateAnswer);
	this._validateStudentResponse=TableStudentEntry.BindAsEventListener( this, this.validateStudentResponse);
	this._updateEditor= TableStudentEntry.BindAsEventListener( this, this.updateEditor );
	this._update =TableStudentEntry.BindAsEventListener( this, this.update );
	this._restrictEvent=TableStudentEntry.BindAsEventListener( this, this.restrictEvent);
	this._updateStudentResponse= TableStudentEntry.BindAsEventListener( this, this.updateStudentResponse );
	this._filter =TableStudentEntry.BindAsEventListener( this, this.filter );
	this._updateCharacterCount =TableStudentEntry.BindAsEventListener( this, this.updateCharacterCount );
};
//add event helper method
TableStudentEntry.addEvent = function(oTarget, sEventType, fnHandler,args) {
	$("#"+oTarget).unbind(sEventType);
	$("#"+oTarget).bind(sEventType,args,fnHandler);
};
TableStudentEntry.removeEvent = function(oTarget, sEventType, fnHandler,args) {
	$("#"+oTarget).unbind(sEventType);
};
//use call to borrow context
TableStudentEntry.BindAsEventListener = function(object, fun) {
    return function(event) {
    	event.stopImmediatePropagation();
        return fun.call(object, (event || window.event));
    };
};
TableStudentEntry.prototype = {
		/**
		* gets orientation of InputField component
		* @returns  orientation
		*/
		getOrientation : function(){
			return this.orientation;
		},
		/**
		 * set orientation of InputField component
		 * @param orientation
		 */
		setOrientation : function(orientation){
			this.orientation = orientation;
		},
		/**
	* gets id of InputField component
	* @returns  id
	*/
	getId : function() {
		return this.id;
	},
	/**
	 * set id of InputField component
	 * @param id
	 */
	setId : function(id) {
		this.id = id;
	},
	/**
	 * gets componentId of InputField component
	 * @returns componentId
	 */
	getComponentId: function( ){
        return this.componentId;  
    },
    /**
     * set componentId of InputField component
     * @param componentId
     */
    setComponentId: function( componentId){
         this.componentId =  componentId;
    },
    /**
     * gets componentIdPrefix of InputField component
     * @returns
     */
	getComponentIdPrefix : function() {
		return this.componentIdPrefix;
	},
	/**
	 * set componentIdPrefix of InputField component
	 * @param componentIdPrefix
	 */
	setComponentIdPrefix : function(componentIdPrefix) {
		this.componentIdPrefix = idPrefix;
	},
	/**
    * gets component text editor
    */
    getEditor:function(){
   	 	this.editor;
    },
    /**
     * sets component text editor
     * @param editor
     */
    setEditor:function(editor){
   	 	this.editor=editor;
    },    
    /**
     * gets component answer
     */
     getAnswer:function(){
    	 this.answer;
     },
     /**
      * sets component answer
      * @param editor
      */
     setAnswer:function(answer){
    	 this.answer=answer;
     },
     /**
      * gets component feedback
      */
      getFeedback:function(){
     	 this.feedback;
      },
      /**
       * sets component feedback
       * @param editor
       */
      setFeedback:function(feedback){
     	 this.feedback=feedback;
      },
      /**
       * gets TableStudentEntry contentFormat
       */
       getContentFormat:function(){
      	 this.contentFormat;
       },
       /**
        * sets TableStudentEntry contentFormat
        * @param editor
        */
       setContentFormat:function(contentFormat){
      	 this.contentFormat=contentFormat;
       },
      /**
       * layouts in design mode
       * @param isLast is the last option
       * @returns {String}
       */
      layout:function(){
    	  var htmlelement = "";
    	  htmlelement += this.layoutEditor();
    	 
    	 return htmlelement;
      },
      /**
       * layouts TableStudentEntry editor in design mode
       * @returns {String}
       */
      layoutEditor:function(){
      	var css ="";//= showMinus?(isLast && !showMinus )?'style="display: block;"':'style="display: none;"':' style="display: none;"';
      	var dataDivAttr = this.editor.text !='' ? 'data-div-placeholder-content' : '';
       	var htmlelement='';
       	htmlelement+='<div style="display:none;">';
      	htmlelement+='    <div id="'+this.editor.id+'" class="inputDummy StudentEntryInput-'+this.orientation+'" '+dataDivAttr+' data-placeholder="Student entry"></div>';
  	  	htmlelement+='</div>';
  	    return htmlelement;
      },
      
       
      /**
	      *  updates text of content editable divs to the object's editor text
	      */
      update:function(){
		  var selectedText = window.getSelection().toString() ;
     	 if(selectedText.length <=0 ){
     	 	this.editor.update();
     	 	this.updateAnswer();
     	 	this.feedback.update();
     	 	question.updateFormulaDestinations(this.feedback.id,util.getFormulas(this.feedback.textWithoutFormatting));
     	 	util.updateFormula(this.feedback);
     	 }
      },
      /**
	      * form comma  seperated number 
	      */
      updateAnswer:function(){
    	  if(this.contentFormat.type=='number' || this.contentFormat.type=='percentage'){
			  this.answer.text=$("#"+this.answer.id).text().replace(/,/g,'');			  
    		  var answerText = this.answer.text;
	       		if( this.answer.text != '' ) {
	       			answerText = this.roundOff(parseFloat(answerText),this.contentFormat.decimalPlaces);	
	       			if(this.contentFormat.showThousandSeparator){
	       				var commaText = answerText.toString().split(".");
	       				commaText [0] = commaText [0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
	       				answerText=commaText.join(".");
	       			}
	       		}
	       		$("#" + this.answer.id).text(answerText);
		  }else{
			  this.answer.update(); 
		  }  
      },
     
      validateAnswer:function(e){
    	  if(e.data.id==this.answer.id){
	    	  var text=$('#'+this.answer.id).text().trim(); 
			   if(text==""){
				   text=$('#'+this.answer.id).val().trim();
			   }else{
				   if(this.contentFormat.type=='number' || this.contentFormat.type=='percentage'){
					   text=text.replace(/,/g,'');
		    		  }
			   }
	    	  var valid=this.isValidAnswerOrStudentResponse(text);
	    	  if(!valid){
	    		  var editorId =e.data.id;
	    		  new Modal({
		   			    	  id : 1,headingText : "Validation Error",
		   			    	  containtText : "Content is in wrong format",
		   			    	  closeActionEvent:function(){
		   			    		 $('#'+editorId).trigger("focus");
		   			    	  }
		  	  	    		}).getWarningModal();
	    	  }
	    	  else
	    		  this.updateAnswer(); 
    	  }
      },
      
      roundOff:function(number,decimal)
      {
    	  if(number.toString().indexOf('.') == -1) {
    		  number = number.toFixed(decimal);
		  }else{
			 var strEvaluatedValue =  number.toString().split(".");
			 if(strEvaluatedValue[1].length < decimal){
				 number = number.toFixed(decimal);
			 }else{
				 var multiplier = Math.pow(10, decimal);
				 number = (Math.round(number * multiplier) / multiplier);
				 if(number.toString().indexOf('.') == -1) {
			    		number = number.toFixed(decimal);
				 }else{
					 var str =  number.toString().split(".");
					 if(str[1].length < decimal){
						 number = number.toFixed(decimal);
					 }
				 }
			 }
		  }
    	  return number;
      },
      /**
       * validate student entry
       */
      validateStudentResponse:function(e){
    	
    	  try{
    		  e.explicitOriginalTarget.click();
    	  }catch(err){}
    	  
    	  var text=$('#'+this.editor.id).text().trim(); 
    	  var text2=$('#'+this.editor.id).text().trim();
    	      	 
		   if(text==""){
			   if($('#'+this.editor.id).val() != undefined){
				   text=$('#'+this.editor.id).val().trim();
				   text2=$('#'+this.editor.id).val().trim();
			   }			   
		   }
		  // text2=text2.replace("*","");
		   if(text != ""){
			   var valid=this.isValidAnswerOrStudentResponse(text);
		    	  if(!valid){
		    		  var editorId =this.editor.id;
		    		  var containtText ="Content is in wrong format";
					  if(this.contentFormat.type=="date"){
							var dateFormat=this.contentFormat.dateFormat=="monthDayYear"?"MM/DD/":"DD/MM/";
							dateFormat +=this.contentFormat.yearFomat==4 ?"YYYY":"YY";
							containtText = "You have entered an invalid value for date. Use "+dateFormat+" format.";
					  }else if(this.contentFormat.type=="time"){
							containtText = "You have entered an invalid value for time. Use HH:MM:SS format.";
						}
					  if($(".reveal-modal").css('visibility') != 'visible'){
						new Modal(
				   			      {
				   			    	  id : 1,headingText : "Validation Error",
				   			    	  containtText : containtText,
				   			    	  closeActionEvent:function(){
				   			    		 if($('#'+editorId).hasClass("hasDatepicker")){
				   			    			$.datepicker._clearDate('#'+editorId);
				   			    		 }
				   			    		 $('#'+editorId).trigger("focus");
										 $(".close-reveal-modal").unbind("click");
										
				   			    	  }
				   			      }).getWarningModalForStudent();
						setTimeout(function(){
							$(".reveal-modal").find(".close-reveal-modal").trigger("click");
							$("#modalDivId").hide();
						},3000);
					  }
		    	  }else{
		    		  if((question.mode==MODE_TEST || question.mode==MODE_PREVIEW) && this.contentFormat.type=="alphanumeric"){
		    			  try{
		    				  var enteredTextLength = $("#"+this.editor.id).text().length;
		    				  var textLimit = parseInt($("#charLimit_" + this.editor.id ).text());
		    				  if(enteredTextLength > textLimit){
		    						 var editor = this;
		    						 new Modal(
		    	    		   			    {
		    	    		   			      id : editorId,headingText : "Validation Error",
		    	    		   			      containtText : "Character Limit Exceeded",
		    	    		   			      closeActionEvent:function(){
		    	    		   			    	editor.highlightText(editor.editor.id);
		    	    		   			      }
		    	    		   			    }).getWarningModalForStudent();
		    					 }
		    			  }catch(err){console.log(JSON.stringify(err));}
		    		  }
		    		  else{
		   			   if(this.contentFormat.type=='number' || this.contentFormat.type=='percentage'){				  
		   				   text=text.replace(/,/g,'');				  
		   				   if( text != '' ) {			  
		   					   text = this.roundOff(parseFloat(text),this.contentFormat.decimalPlaces);
		   					   var displayText=text;
		   					   if(this.contentFormat.showThousandSeparator){
		   						   var commaText = text.toString().split(".");
		   						   commaText [0] = commaText [0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
		   						   displayText=commaText.join(".");
		   					   }
		   					$("#" + this.editor.id).text(displayText);
		   		       		}
		   			   }
		   			   else if(this.contentFormat.type=='currency'){
		   				    var displayText =text.replace(/,/g,'');
			   				displayText=parseFloat(displayText);
			   				$("#" + this.editor.id).text(displayText);
		   			   }
		   		   }
		    	   this.updateStudentResponse(e);
		  		  }
		    	 this.validateFormulas();
		    	 var responseText = this.editor.text; 
	    		 responseText = responseText.substring(0, this.editor.maxLength);
	    		 util.checkTableFormulaCell(responseText);
	    		 this.activateBranching(responseText);
	    		 
	    		 var myHeight= 1000;
				 var ht = 0;
				 if(question.mode==MODE_TEST)
				 {
					 ht = $("#formToolStudentId").height();
				 }
				 if(question.mode==MODE_PREVIEW)
				 {
					 ht = $("#formToolInstructorId").height();
				 }
				 if(question.mode==MODE_POST_TEST)
				 {
					 ht = $("#formToolPostSubmissionId").height();
				 }
					
					
					
					if(ht>900)
					{
					 myHeight = ht+150;
					}				
					
					EZ.resize(1125,myHeight);
		  		 return valid;
		   }
		   else{
			   $('#'+this.editor.id).html("");
			   this.editor.text="";
			   question.updateProgressBar();			   
			   var authorEntries = $("h6 .formula");
			   var cellId = this.componentIdPrefix+this.componentId + this.cellId;
			   for(var i=0; i<authorEntries.length;i++){
				   	if(authorEntries[i].innerHTML.indexOf(cellId) != -1){
				   		authorEntries[i].nextSibling.innerHTML = "= _";
				   		authorEntries[i].nextSibling.nextSibling.innerHTML="_";
				   		for(var j = 0; j < authorEntries[i].childNodes.length; j++)
						{
							var childNode = authorEntries[i].childNodes[j];
							if(childNode.className == cellId){
								childNode.innerHTML="_";
							}
						}
				   	}
			   }
			   this.validateFormulas();
			   this.activateBranching("");
			   var myHeight= 1000;
				 var ht = 0;
				 if(question.mode==MODE_TEST)
				 {
					 ht = $("#formToolStudentId").height();
				 }
				 if(question.mode==MODE_PREVIEW)
				 {
					 ht = $("#formToolInstructorId").height();
				 }
				 if(question.mode==MODE_POST_TEST)
				 {
					 ht = $("#formToolPostSubmissionId").height();
				 }
					
					
					//var ht1 = $("#wrapper").height();
					
					if(ht>900)
					{
					 myHeight = ht+150;
					}				
					
					EZ.resize(1125,myHeight);
		   }
      },
      /**
       * validate student entry
       */
      isValidAnswerOrStudentResponse:function(text){
    	  if(this.contentFormat.type=='number' || this.contentFormat.type=='percentage'){
    		  text=text.replace(/,/g,'');  
    	  }    	  	
  			if(this.contentFormat.type=="date"){
  				if (this.contentFormat.yearFomat == 4) {
	  	          if (this.contentFormat.dateFormat=='monthDayYear') {
                    this.contentFormat.regExp = /^(0[1-9]|1[012])[-\/.](0[1-9]|[12][0-9]|3[01])[- \/.]([0-9]{4})$/;
                  }
                  else{
                    this.contentFormat.regExp = /^(0[1-9]|[12][0-9]|3[01])[- \/.](0[1-9]|1[012])[-\/.]([0-9]{4})$/;
                  }
	  	        } else if (this.contentFormat.yearFomat == 2) {
	  	          if (this.contentFormat.dateFormat=='monthDayYear') {
                    this.contentFormat.regExp = /^(0[1-9]|1[012])[-\/.](0[1-9]|[12][0-9]|3[01])[- \/.]([0-9]{2})$/;
                  }
                  else{
                    this.contentFormat.regExp = /^(0[1-9]|[12][0-9]|3[01])[- \/.](0[1-9]|1[012])[-\/.]([0-9]{2})$/;
                  }
	  	        }
  			}
  			var regExpression=this.contentFormat.regExp;  			
  			var valid =true;
  			if (text.trim().length>0) {
  				if(regExpression.test(text)){
  					if(this.contentFormat.type=="date"){
  	  					var matcher = text.split(/[-\/.]/);
  	  					var month ="";
  	  					var day="";
  	  					var year="";
  	  						 year = matcher[2];
  	  						if(this.contentFormat.dateFormat=="monthDayYear"){
  	  	  						 month = matcher[0];
  	  	  						 day =matcher[1];
  	  	  					}else{
  	  	  						 month = matcher[1];
  	  	  						 day = matcher[0];
  	  	  					}
  	  						
  	  						 if(day >31 || month > 12){
  	  							valid =false;
  	  						 }else{
  	  						 if (day=="31" && 
  	  								  (month=="4" || month =="6" || month=="9" ||
  	  						                  month=="11" || month=="04" || month =="06" ||
  	  						                  month=="09")) {
  	  							 		valid= false; // only 1,3,5,7,8,10,12 has 31 days
  	  							     } else if (month=="2" || month=="02") {
  	  						                  //leap year
  	  							    	  if( year.length<4){
  	  							    		year = "20"+year;  
  	  							    	  }
  		  								  if(year % 4==0){
  		  									  if(day=="30" || day=="31"){
  		  										valid= false;
  		  									  }else{
  		  										valid= true;
  		  									  }
  		  								  }else{
  		  								         if(day=="29"||day=="30"||day=="31"){
  		  								        	valid= false;
  		  								         }else{
  		  								        	valid= true;
  		  								         }
  		  								  }
  	  							      }else{				 
  	  							    	valid= true;				 
  	  							      }
  	  						 }
  	  						   
  	  					}
  				}else{
  					valid=false;
  					}
  				}
  			
  			return valid;
      },
      /**
       * is filled
       * @returns {Boolean}
       */
	  	isStudentEntryFilled:function(){
	  		var isFilled = {status:true};
	  		if($("#answerDiv_"+this.answer.id).css('display') == 'block'){
	  			$("#htmlToTextConvertor").html(this.answer.text);
		  		var studentEntryText = $("#htmlToTextConvertor").text();
		  		if(studentEntryText.trim().length !=0){
		  			var regExpression=this.contentFormat.regExp;
		  			if (studentEntryText.trim().length>0 && !regExpression.test(studentEntryText)) {
		  				isFilled.status=false;
		  				isFilled.message= "Content is in wrong format";
		  				isFilled.field = this.answer.id;
		  			}
		  		}else{
		  			isFilled.status=false;
		  		}
		  		
	  		}
	  		return isFilled;
	  		 	   
	  	},
      /**
       * after layout bind events
       */
      afterLayout:function(){
    	
          if(this.contentFormat.type=='number'){
        	  this.contentFormat.updateFormatter();
          }
          if(this.contentFormat.type=='currency'){
        	  $("#"+this.editor.id).addClass("currency-"+this.contentFormat.currencyType+"-Symbol");
        	  $("#"+this.answer.id).addClass("currency-"+this.contentFormat.currencyType+"-Symbol");
          }
          if(this.contentFormat.type=='percentage' && this.contentFormat.showSymbol){
        	  if(this.contentFormat.showSymbol){
	 				 $("#"+this.editor.id).addClass("percentSymbol");
	 				 $("#"+this.answer.id).addClass("percentSymbol");
	 			 }
        	  this.contentFormat.updateFormatter();
          }
          if(this.contentFormat.type=='time'){
			 $('#'+this.editor.id).attr('data-placeholder', 'Student entry hh:mm:ss');
          }
          if(this.contentFormat.type=='date'){
        	  if(this.contentFormat.dateFormat=="monthDayYear"){
        		  $('#'+this.editor.id).attr('data-placeholder', 'Student entry mm/dd/yy');
        	  }else{
        		  $('#'+this.editor.id).attr('data-placeholder', 'Student entry dd/mm/yy');
        	  }
        	 // this.contentFormat.updateFormatter();
          }
          TableStudentEntry.addEvent(this.answer.id, "blur", this._validateAnswer,{id:this.answer.id} );
          TableStudentEntry.addEvent(this.feedback.id, "blur", this._update );
          TableStudentEntry.addEvent(this.answer.id, "paste", this._filter );
          TableStudentEntry.addEvent(this.feedback.id, "paste", this._filter );
          this.feedback.afterEditorlayout();
      },
      /**
       * after studentlayout bind events
       */
      afterStudentLayout:function(){
    	 this.validateFormulas();
    	 TableStudentEntry.addEvent(this.editor.id, "blur", this._validateStudentResponse,{id:this.editor.id} );
         TableStudentEntry.addEvent(this.editor.id, "paste", this._filter );
     	/*var elem = $("#"+this.editor.id+"_chars");*/
     	
      	if(this.contentFormat.type=='date'){
      		var dateFormat=this.contentFormat.dateFormat=="monthDayYear"?"mm/dd/":"dd/mm/";
    		dateFormat +=this.contentFormat.yearFomat==4 ?"yy":"y";
    		var currentEditor=this.editor;
    		var object=this;
    		$("#"+this.editor.id).datepicker({
  			dateFormat: dateFormat,
  			onSelect: function(dateText, inst) {
  				inst.dateFormat=dateFormat;
  				$("#"+currentEditor.id).val( dateText );
  				object.updateStudentResponse();
  			},
  			beforeShow: function(input) {
  				$("#"+currentEditor.id).unbind('blur');
			},
			onClose: function(dateText, inst) {
				TableStudentEntry.addEvent(object.editor.id, "blur", object._validateStudentResponse,{id:object.editor.id} );
			}
    		});
    		TableStudentEntry.addEvent(object.editor.id, "keyup", object._updateStudentResponse,{id:object.editor.id} );
      		
      	}else{
      		 TableStudentEntry.addEvent(this.editor.id, "keyup", this._updateStudentResponse );
      	}
      	if(this.contentFormat.type=='alphanumeric'){
     		this.updateCharacterCount();
     		TableStudentEntry.addEvent(this.editor.id, "focus keyup keypress blur", this._updateCharacterCount );
     		//TableStudentEntry.addEvent(this.editor.id, "keyup", this._updateStudentResponse );
     	}
      	if(this.contentFormat.type=='number'|| this.contentFormat.type=='percentage'){
      		this.contentFormat.updateFormatter();
      	}
      	
      	$('.stdQueLabel').each(function (){
			$(this).find('font').css('line-height', $(this).find('font').css('font-size'));
        });
      },
      /**
       * after studentlayout bind events
       */
      afterInstructorLayout:function(){
    	  this.afterStudentLayout();
      },
      /**
       * update char count after layout
       */
      updateCount:function(){
              /*var chars = $("#"+this.editor.id).text().length;
              var limit= this.editor.maxLength;
              if (chars > limit) {
                var  beforeSpan = $("#"+this.editor.id).text().substr(0, limit);
                var afterSpan=$("#"+this.editor.id).text().substr(limit, $("#"+this.editor.id).text().length);
                $("#"+this.editor.id).html(beforeSpan+"<span>"+afterSpan+"</span>");
              }
              var count= limit - chars ;
              var text="/"+limit.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
              $("#"+this.editor.id+"_chars").html(  count.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")+" "+ text);*/
      },
      filter:function(event){
        util.removePasteImage(event.originalEvent.clipboardData,event);
    	  /*if(question.mode==MODE_TEST){
    		  util.cleanHtml(event.originalEvent.clipboardData,event);
    	  }else{
    		  util.removePasteImage(event.originalEvent.clipboardData,event);
    	  }*/
  		
  	  },
      /**
       * updates student Response
       */
      updateStudentResponse: function(e){
    	  if(this.contentFormat.type=='date'){
         	this.editor.text=$("#"+this.editor.id).val();
    	  }else{
    		  this.editor.update();
    		  var responseText = this.editor.text;    		 
    		  responseText = responseText.substring(0, this.editor.maxLength);
    		  this.editor.text = responseText;
    	  }
    	  if(question.mode==MODE_TEST){
    		  question.updateProgressBar();
    	  }
      },
      activateBranching:function(responseText){
    	  if(question.mode==MODE_TEST){
             /*changes for branching based on responses*/
             var currentComponent = null;
     		 for (i in question.activePage.components) {
     			if (question.activePage.components[i].id == this.componentId) {
     				currentComponent = question.activePage.components[i];
     			}
     		 }
     		 if(currentComponent.isBranched){
     			 var fullCmpId = currentComponent.pageIdPrefix+currentComponent.pageId+currentComponent.idPrefix+currentComponent.id; 
     			 
     			//reset all paths
     			for ( var index in question.branches) {
     				if (question.branches[index].cId == fullCmpId) {
     					var branch = question.branches[index];
     					this.setRestFlag(branch, false);
     				}
     			}
     			if(currentComponent.notApplicableFlag){
     				this.setMappedEntities(fullCmpId,"","");
     			 }else{
     				for(cellIndex  in currentComponent.cellComponentCollection){
	   	        		 var cellComponent = currentComponent.cellComponentCollection[cellIndex].component;
	   	        		 if(cellComponent != ""){
	   	        			 if(cellComponent.type == "Label"){
	   	        				//set path for updated formula values
	   	                    	 for(var index = 0 ; index < question.formulas.length; index++){
	   	                    		 var cellId = currentComponent.getFullComponentId() + cellComponent.cellId;
	   	                    		 if($.inArray(cellId, question.formulas[index].destinations) != -1){
	   	                    			 var result = $("#"+cellId).find(".formulaResult").text();
	   	                    			 this.setMappedEntities(fullCmpId,cellComponent.cellId,result);
	   	                    		 }
	   	                    	 }
	   	                     }else if(cellComponent.type == "Input field"){
	   	                    	//set path for current inputField
	   	                    	 var contentType = cellComponent.contentFormat.type;
	   		                      if(contentType == "number" || contentType == "currency" || contentType == "percentage"){
	   		                    	  var result = cellComponent.studentEntries[0].editor.text;
	   			                      this.setMappedEntities(fullCmpId,cellComponent.cellId,result);
	   		                      }
	   	                     }
	   	        		 }
     				} 
     			 }
     			 var bId = 0;
 				 for(bId in question.branches){
 					 if(question.branches[bId].criteria == "multi" && (question.branches[bId].cId == fullCmpId || question.branches[bId].cId_2 == fullCmpId)){
 						 util.checkMultiCriteriaMapping(question.branches[bId]);
 					 }
 				 }
         		 question.updateProgressBar();
   				 question.actvPageShowHide();
     		 }
     		 question.updateProgressBar();
    	  }  
      },      
      setMappedEntities:function(cId, studentEntryId, studentResponse){
    	  studentResponse = studentResponse.replace(/,/g , "");
    	  for ( var index in question.branches) {
			if (question.branches[index].cId == cId) {
				var branch = question.branches[index];
				if (branch.mappingIndicator == "answerOption") {
					for ( var i in branch.pathMaps) {
						if (branch.pathMaps[i].compOptionId == studentEntryId) {
							var satisfiedConditionIds = [];
							if(studentResponse==""){
								satisfiedConditionIds=[];
	 	  	  	    		}
							for ( var index in branch.pathMaps[i].condition) {
								var conditionIdVal = branch.pathMaps[i].condition[index].selectConditionVal;
								var conditionId = branch.pathMaps[i].condition[index].id;
								/*remove all non numeric characters except decimal */
								studentResponse = studentResponse.replace(/[^\/\d\.]/g,'');
								studentReponse = parseFloat(studentResponse);
								var autherEntryVal = parseFloat(branch.pathMaps[i].condition[index].authorEntryVal);
								switch (conditionIdVal) {
									case "1":
										if (studentResponse == autherEntryVal) {
											satisfiedConditionIds.push(conditionId);
										}
										break;
									case "2":
										if (studentResponse < autherEntryVal) {
											satisfiedConditionIds.push(conditionId);
										}
										break;
									case "3":
										if (studentResponse > autherEntryVal) {
											satisfiedConditionIds.push(conditionId);
										}
										break;
									case "4":
										if (studentResponse >= autherEntryVal) {
											satisfiedConditionIds.push(conditionId);
										}
										break;
									case "5":
										if (studentResponse <= autherEntryVal) {
											satisfiedConditionIds.push(conditionId);
										}
										break;
								}
							}
							
							for ( var j in branch.pathMaps[i].paths) {
								if(satisfiedConditionIds.length != 0){
									var idIndex = 0;
									for(idIndex = 0; idIndex < satisfiedConditionIds.length; idIndex++){
										if(branch.pathMaps[i].paths[j].conditionId == satisfiedConditionIds[idIndex] && studentResponse != ""){
											 this.setRestFlag(branch, true, i, j);
				  						}
									}
		  						}
								
							}
						}
					}
				}
			}
		}
      },
      setRestFlag : function(branch, flag, pathmapIndex, pathIndex){
    	  for ( var i in branch.pathMaps) {
    		  for(var j in branch.pathMaps[i].paths){
    			  var loopCondition  =  (!flag) ? true : (flag && pathmapIndex == i && pathIndex == j)? true : false; 
  				  if(loopCondition){
  					var partId, compId, secId;
					partId = branch.pathMaps[i].paths[j].partId;
					compId = branch.pathMaps[i].paths[j].compId;
					secId = branch.pathMaps[i].paths[j].sectionId;
					isSubCategory=(secId!=null)?(secId.split("_")[0]=="s")?true:false:false;
					  /* loop from pages to compoenents to sections */
					if (partId != null) {
						for ( var index1 in question.pages) {
							if (partId == question.pages[index1].id) {
								if (question.pages[index1].isBranchDest) {
									question.pages[index1].showToStud = flag;
								} else {
									for ( var index2 in question.pages[index1].components) {
										var comp = question.pages[index1].components[index2];
										if (compId == comp.id) {
											if (comp.isBranchDest) {
												comp.showToStud = flag;
											} else {
												if (comp.sections != undefined && !isSubCategory) {
													for ( var index3 in comp.sections) {
														if (comp.sections[index3].id == secId) {
															if (comp.sections[index3].isBranchDest) {
																comp.sections[index3].showToStud = flag;
															}
														}
													}
												}else{
													if(comp.sections != undefined){
														for(var index3 in comp.sections){
														var subCat=secId.split("_")[1]
															if(comp.sections[index3].subCategoryId == subCat){
														
															if(comp.sections[index3].isBranchDest){
																//console.log("subcat"+flag+"i"+i+"ind"+index)
																comp.sections[index3].showToStud = flag;
															}
													}
												}
											}
												}
											}
										}
									}
								}
							}
						}
					}
  				}
  			}
    	  }
      },
      cleanWhitespace: function(element) {
    	 
    	  for (var i = 0; i < element[0].childNodes.length; i++) {
    	    var node = element[0].childNodes[i];
    	    if (node.nodeType == 3 && !/\S/.test(node.nodeValue))
    	      Element.remove(node);
    	  }
    	 },
    
      /**
		 * updates editor properties
		 */
      updateEditor: function (event) {
    	    var cellId = this.cellId;
			if (this.contentFormat.type == "alphanumeric") {
				var maxLengthValue = $("#txtmaxLenght_" + cellId).val();
				if( maxLengthValue != '' ) {
					maxLengthValue = parseInt(maxLengthValue.replace(/[^0-9]+/g, ""));
				}
				
				this.editor.maxLength = maxLengthValue;
				if(this.editor.maxLength>15000){
					var editor ="#txtmaxLenght_" +cellId;
					new Modal(
		  	   			      {
		  	   			    	  id : 1,headingText : "Validation Error",
		  	   			    	  containtText : "Max Length should be less or equal to 15,000",
		  	   			    	  closeActionEvent:function(){
		  	   			    		 $(editor).trigger("focus");
		  	   			    	  }
		  	   			      }).getWarningModal();
		  	  			 $("#warningModalId").css('top','300px');
				}
				
				var displayMaxLengthValue = this.editor.maxLength;
				if( this.editor.maxLength != '' ) {
					displayMaxLengthValue = this.editor.maxLength.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
				}
				$("#txtmaxLenght_" + this.editor.id).val(displayMaxLengthValue);
			} else if (this.contentFormat.type == "number") {
				var decimalPlaces =$("#txtdecimal_"+cellId).val();
				
				this.contentFormat.decimalPlaces = decimalPlaces.trim().length>0?parseInt(decimalPlaces.trim()):2;
				if(this.contentFormat.decimalPlaces<0 && this.contentFormat.decimalPlaces>6){
					var editor ="#txtdecimal_" +this.editor.id;
					new Modal(
		  	   			      {
		  	   			    	  id : 1,headingText : "Validation Error",
		  	   			    	  containtText : "Decimal places should be in between 0 -6",
		  	   			    	  closeActionEvent:function(){
		  	   			    		 $(editor).trigger("focus");
		  	   			    	  }
		  	   			      }).getWarningModal();
		  	  			 $("#warningModalId").css('top','300px');
				}
				this.contentFormat.updateFormatter();
				
				var answerText = this.answer.text;
				answerText = this.roundOff(parseFloat(answerText),this.contentFormat.decimalPlaces);
				answerText = (isNaN(answerText))?"":answerText;
				$("#" + this.answer.id).text(answerText);
				
				this.contentFormat.showThousandSeparator = $('#showSeparatorLabelBtnId'+cellId).prop('checked');
			} else if (this.contentFormat.type == "currency") {
			} else if (this.contentFormat.type == "percentage") {
				var decimalPlaces =$("#txtdecimal_"+cellId).val();
				
				this.contentFormat.decimalPlaces = decimalPlaces.trim().length>0?parseInt(decimalPlaces.trim()):2;
				if(this.contentFormat.decimalPlaces<0 && this.contentFormat.decimalPlaces>6){
					var editor ="#txtdecimal_" +this.editor.id;
					new Modal(
		  	   			      {
		  	   			    	  id : 1,headingText : "Validation Error",
		  	   			    	  containtText : "Decimal places should be in between 0 -6",
		  	   			    	  closeActionEvent:function(){
		  	   			    		 $(editor).trigger("focus");
		  	   			    	  }
		  	   			      }).getWarningModal();
		  	  			 $("#warningModalId").css('top','300px');
				}
				this.contentFormat.updateFormatter();
				this.contentFormat.showSymbol = $('#showPercentLabelBtnId'+this.editor.id).prop('checked');
			} else if (this.contentFormat.type == "date") {
				this.contentFormat.yearFomat = $("#4"+cellId).prop("checked");
				this.contentFormat.yearFomat = $("#2"+cellId).prop("checked");
			} else if (this.contentFormat.type == "time") {
			}       
      },
  
  
  	restrictEvent:function(e){
  		if (e.which == "13"){ 
			e.preventDefault();
		}
  		var regexNumber = new RegExp("^[,0-9 ]+$");
  		if( !regexNumber.test(String.fromCharCode(e.which)) && ( e.which != 0 && e.which != 8 )) {
  			e.preventDefault();
  		}
  	},
  	 /**
     * layouts in instructor mode
     * @returns {String}
     */
    instructorLayout:function(acceptAnyAnswer,graded){
    	var htmlelement='';
    	htmlelement+=this.studentLayout(acceptAnyAnswer,graded);
    	return htmlelement.replace(/\Â/g,"");
    },
    /**
     * layouts in student test mode
     * @returns {String}
     */
    studentLayout:function(acceptAnyAnswer,graded){
    	var htmlelement='';
		var cssColumnLayout="column-"+this.orientation;
		var placeHolder="";
		var markCompulsary=(graded && EZ.mode!=MODE_TEST)?"<span class='compulsaryTbl starHide'>*</span>":"";
		//var markCompulsary=(graded)?"":"";
		var asterisk=(graded)?"":"";//asteriskSymbol

		var component = null;
		for(var i=0;i<question.pages.length;i++){
  			var components = question.pages[i].components;
  			for(var j=0;j<components.length;j++){
  				var comp = components[j];
	  			if (comp.getId() == this.componentId && this.componentIdPrefix == comp.pageIdPrefix+comp.pageId+comp.idPrefix) {
	  				component = comp;
	  			}
			}
  		}
		
		var inputComponent = component.getItemValById(component.cellComponentCollection, this.componentIdPrefix+this.componentId+this.cellId, "component");
		var answer = inputComponent.answer;
		var answerText=answer.text;

		if(this.contentFormat.type=='time'){
			placeHolder="HH:MM:SS";
          }
		else if(this.contentFormat.type=='date'){
        	  placeHolder=this.contentFormat.dateFormat=="monthDayYear"?"MM/DD/":"DD/MM/";
        	  placeHolder +=this.contentFormat.yearFomat==4 ?"YYYY":"YY";
 			
          }
		
        placeHolder=(placeHolder=="" && this.type=='fillInTheBlank')?"Fill in the blank":placeHolder;
		var symbolClass= "";
		if(this.contentFormat.symbol!=null){
			if(this.contentFormat.type=='percentage' && this.contentFormat.showSymbol){
				symbolClass="percentSymbol";
			}else if(this.contentFormat.type=='currency'){
				symbolClass="currency-"+this.contentFormat.currencyType+"-Symbol";
			}
		}
		var studentEditor="";
		var contentEditableFlag = true;
		if((this.contentFormat.type =='alphanumeric' || this.contentFormat.type == 'time' || this.contentFormat.type == 'date') && question.mode==MODE_PREVIEW){
			contentEditableFlag = false;
		}		
		if(ROLE=="student")
			contentEditableFlag = false;
		var editorText=(question.mode==MODE_POST_TEST)?"&nbsp":this.editor.text;
		if(this.contentFormat.type=='date'){
			if(!contentEditableFlag){
				studentEditor='<input disabled="'+!contentEditableFlag+'" type="text" id="'+this.editor.id+'" placeholder="'+placeHolder+'" class="preview_AAA  column-wid '+cssColumnLayout+'  '+symbolClass+' stdcolumn-1" value="'+editorText+'" maxlength="'+this.editor.maxLength+' "/>'+markCompulsary;
			}
			else{
				studentEditor='<input style="height: inherit !important;" type="text" id="'+this.editor.id+'" placeholder="'+placeHolder+'" class="preview_AAA  '+cssColumnLayout+'  '+symbolClass+' stdcolumn-1" value="'+editorText+'" maxlength="'+this.editor.maxLength+' '+markCompulsary+'"/>';
			}
			
		}else{
			var dataDivAttr = this.editor.text !='' ? 'data-div-placeholder-content' : '';
			var inputFieldStudentEntryClass = (this.contentFormat.type=='percentage')? "inputFieldStudentEntryPercentage":"inputFieldStudentEntryOther";
			if(question.mode == "preview" && !acceptAnyAnswer){
				studentEditor +='<div  contenteditable="'+contentEditableFlag+'" id="'+this.editor.id+'" data-placeholder="'+placeHolder+'" class="tableColWidth preview_AAA inputFieldStudentEntryPreview '+inputFieldStudentEntryClass+' stdinputFieldStudentEntry tableCellComponent noBorder stdCurrencyInput '+cssColumnLayout+'  '+symbolClass+'" '+dataDivAttr+' >';
				
			}else{
				studentEditor +='<div  contenteditable="'+contentEditableFlag+'" id="'+this.editor.id+'" data-placeholder="'+placeHolder+'" class="tableColWidth preview_AAA inputFieldStudentEntry '+inputFieldStudentEntryClass+' stdinputFieldStudentEntry tableCellComponent noBorder stdCurrencyInput '+cssColumnLayout+'  '+symbolClass+'" '+dataDivAttr+' >';
				
			}
			
	/*		var txt=this.editor.text.replace("*","");
			  txt=txt.replace(/<\/?span[^>]*>/g,"");
			studentEditor += "<span class='spnWid'>"+txt+"</span>"+ markCompulsary+'</div>';*/
			if(question.mode==MODE_POST_TEST || question.mode==MODE_PREVIEW)
				studentEditor ="";
			else
				studentEditor += editorText+ markCompulsary+'</div>';
		}
		if(question.mode == "preview" && !acceptAnyAnswer){
    		answerText =answerText.replace(/\Â/g," ");
    		studentEditor+='<div class="preview_AAA '+cssColumnLayout+'"><strong>Answer: </strong>'+answerText+'</div>';
    	}
		var maxLengthval = this.editor.maxLength.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

        htmlelement+= studentEditor;
        htmlelement+='    <div class="clear"></div>';
        if(this.contentFormat.type=='alphanumeric'){
        	 /*htmlelement+='		<div style="float:right display: none;" id="'+this.editor.id+'_chars">'+maxLengthval+'</div>';*/
             htmlelement+='    <div class="clear"></div>';
             htmlelement+='		<div id="isHighlighted_'+this.editor.id+'" style="display:none;">false</div>';
             htmlelement+='		<div id="charLimit_'+this.editor.id+'" style="display:none;">'+maxLengthval.replace(',','')+'</div>';
        }
       
        htmlelement+='    <div class="clear"></div>';
       // htmlelement+='</div>';
      //  htmlelement+='</div>';
      //  htmlelement+='</div>';
		return htmlelement.replace(/\Â/g," ");
		
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
    postSubmissionReviewLayout:function(acceptAnyAnswer,showNotApplicable,graded){
    	var htmlelement='';
		var cssColumnLayout="column-"+this.orientation;
		var symbolClass= "";
		var component = null;
		var symbol=null;
		var markCompulsary=(graded)?"<span class='compulsaryTbl starHide'>*</span>":"";
		for(var i=0;i<question.pages.length;i++){
  			var components = question.pages[i].components;
  			for(var j=0;j<components.length;j++){
  				var comp = components[j];
	  			if (comp.getId() == this.componentId && this.componentIdPrefix ==  comp.pageIdPrefix+comp.pageId+comp.idPrefix) {
	  				component = comp;
	  			}
			}
  		}
		
		var inputComponent = component.getItemValById(component.cellComponentCollection, this.componentIdPrefix+this.componentId+this.cellId, "component");
		var answer = inputComponent.answer;		
		var answerText=answer.text;
		answerText= decodeURIComponent(escape(answerText));
		var studentResponse=this.editor.text.trim();  
		if(this.contentFormat.type=='number' || this.contentFormat.type=='percentage'){
			if(studentResponse==null || studentResponse==""){				
				studentResponse="0";
			}		
		}
		if(answerText!=''){
			if(this.contentFormat.type=='number' || this.contentFormat.type=='percentage'){
				answerText = answerText.replace(/,/g , "");
				answerText = ((answerText!=null)&&(answerText!=''))?parseFloat(answerText).toFixed(this.contentFormat.decimalPlaces):"";
				
				if(this.contentFormat.showThousandSeparator){
					var commaText = answerText.toString().split(".");
					commaText [0] = commaText [0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
					answerText=commaText.join(".");
				}
			}
			if(this.contentFormat.symbol!=null){
				if(this.contentFormat.type=='percentage' && this.contentFormat.showSymbol){		
					symbol=this.contentFormat.symbol;
					symbolClass="percentSymbol";					
					//answerText=answerText+this.contentFormat.symbol;
				}else if(this.contentFormat.type=='currency'){		
					symbol=this.contentFormat.symbol;
					symbolClass="currency-"+this.contentFormat.currencyType+"-Symbol";
					//answerText=this.contentFormat.symbol+answerText;
				}
			}
		}
		else
		{
			if(this.contentFormat.symbol!=null){
				if(this.contentFormat.type=='percentage' && this.contentFormat.showSymbol){
					symbol=this.contentFormat.symbol;
					symbolClass="percentSymbol";					
				}else if(this.contentFormat.type=='currency'){
					symbol=this.contentFormat.symbol;
					symbolClass="currency-"+this.contentFormat.currencyType+"-Symbol";					
				}
			}
		}
        
    	studentResponse = studentResponse.replace(/\Â/gi, "").replace(/" "/gi,'');
    	answerText = answerText.replace(/\Â/gi, "").replace(/" "/gi,'');
		
    	if(!showNotApplicable)
    	{
	    	if(studentResponse != ""){
				var isCrect=this.isCorrectAnswerGiven(acceptAnyAnswer, answer);
				if(!isCrect){
					$("#"+this.componentIdPrefix+this.componentId+this.cellId).addClass("inCorrectCell");
				}
				else{
					$("#"+this.componentIdPrefix+this.componentId+this.cellId).addClass("correct");
				}
			}
			else{
				$("#"+this.componentIdPrefix+this.componentId+this.cellId).addClass("incompleteCell");
			}
    	}
		
       //URLs starting with http://, https://, or ftp://
        var replacePattern1 = /(\b(https?|ftp):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/gim,
        //URLs starting with "www." (without // before it, or it'd re-link the ones done above).
        replacePattern2 = /(^|[^\/])(www\.[\S]+(\b|$))/gim;
        studentResponse = studentResponse.replace(replacePattern1, "<a href='$1' target='_blank'>$1</a>");
        studentResponse = studentResponse.replace(replacePattern2, "$1<a href=\"http://$2\" target=\"_blank\">$2</a>");
        var marginPoint = 2;
        if(this.contentFormat.type=='date' || this.contentFormat.type=='time'){
			marginPoint = 0;
        }
		if(this.contentFormat.type=='percentage' || this.contentFormat.type=='number')
        { 
        	studentResponse = studentResponse.replace(/,/g , "");
        	var response = studentResponse;
        	if(!isNaN(studentResponse))
        		response =	((studentResponse!=null)&&(studentResponse!=''))?parseFloat(studentResponse).toFixed(this.contentFormat.decimalPlaces):"";
        	if(this.contentFormat.showThousandSeparator){
        		var commaText = response.toString().split(".");
        		commaText [0] = commaText [0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        		response=commaText.join(".");
        	}
        	if(symbol!=null)
        		response = response+symbol;  
        	//htmlelement+='<div id="'+this.editor.id+'" class="inputFieldStudentEntry postSubmission divBorder tableCellComponent noBorder '+cssColumnLayout+'" ><span style="margin-left: '+marginPoint+'px; background-color: transparent;">'+ response +'</span></div>';
        	htmlelement+='<div id="'+this.editor.id+'" class="inputFieldStudentEntry postSubmission divBorder tableCellComponent noBorder '+cssColumnLayout+'" ><span class="spanWid" style="margin-left: '+marginPoint+'px;  background-color: transparent;">'+ response +'</span>'+markCompulsary+'</div>';
        }
        else{
        	if(symbol!=null){
        	switch (this.contentFormat.currencyType){
        	case "dollar":
        		symbol = "&#36;";
        		break;
        	case "euro":
        		symbol = "&#8364;";
        		break;
        	case "yen":
        		symbol = "&#165;";
        		break;
        	case "pound":
        		symbol = "&#163;";
        		break;
        	default:
        	}        		
        		studentResponse =symbol+studentResponse;
        		answerText = symbol+answerText;
    		}
        	//htmlelement+='<div id="'+this.editor.id+'" class="inputFieldStudentEntry postSubmission divBorder tableCellComponent noBorder '+cssColumnLayout+'" ><span style="margin-left: '+marginPoint+'px; background-color: transparent;">'+studentResponse+'</span></div>';        	
        	htmlelement+='<div id="'+this.editor.id+'" class="inputFieldStudentEntry postSubmission divBorder tableCellComponent noBorder '+cssColumnLayout+'" ><span  class="spanWid" style="margin-left: '+marginPoint+'px; background-color: transparent;">'+studentResponse+'</span>'+markCompulsary+'</div>';        	
        }
        //htmlelement+='    <div class="clear"></div>';
        if(answer.text!="" && !acceptAnyAnswer){
        	
        	answerText =answerText.replace(/\Â/g," "); 
        	 var chromeSpace="clearBoth";
        	 htmlelement+='		<div class="'+cssColumnLayout+' clearBoth"><strong>Answer: </strong></br>'+answerText+'</div>';
             htmlelement+='    <div class="clear"></div>';
        }

        //htmlelement+='    <div class="clear"></div>';
   		return htmlelement.replace(/\Â/g," ");
    },
    /**
     * check if correct answer given by student
     */
    isCorrectAnswerGiven:function(acceptAnyAnswer, answer){
    	var flag= false;
    	var studentResponse=this.editor.text.trim();  
    	studentResponse = studentResponse.replace("&nbsp;","");
    	
    	var substr=studentResponse.substring(studentResponse.length-4,studentResponse.length);    	
    	if(substr=="<br>")
    		studentResponse = studentResponse.substring(0,studentResponse.length-4);
    	var answerText =null;
    	
    	
    	if(studentResponse!="")
    	{
	    	 if(this.contentFormat.type=='number' || this.contentFormat.type=='percentage'){
	    		 answerText= answer.text;
	    		 studentResponse = studentResponse.replace(/,/g , "");
	    	 }
	    	 else    		 
	    		 answerText= answer.text;  	    	 
	    	
	    	var formatType=this.contentFormat.type;
	    	var valid = this.isValidAnswerOrStudentResponse(studentResponse);
	    	
	    	if(acceptAnyAnswer && valid){
	    		 flag=true;
	    	}else{
	    		if(formatType=='alphanumeric'){
	    			studentResponse = studentResponse.replace(/&amp;/g, '&');
					studentResponse = studentResponse.replace(/&lt;/g, '<');
					studentResponse = studentResponse.replace(/&gt;/g, '>');
					try{
		    			if((studentResponse!="") && (new String(studentResponse.toLowerCase())==(new
		        				String(answerText)).toLowerCase())){
		    				
		        			flag=true;
		       		 }
					 }
					 catch(err)
					 {
						 console.log(err);
					 }
	    		} else if(formatType == "date" || formatType == "time"){
	    			if(studentResponse == answerText){
	    				flag = true;
	    			}
	    		} else{
		    		if((studentResponse!="") && (parseFloat(studentResponse)==parseFloat(answerText))){
	    				flag=true;
	    			}
	    		}
	    		
	    	} 
    	}
    	
    	return flag;
    },
    /**
     * Function to highlight characters from student entry  
     * @param editorId = student entry editor id 		 
     */    
    highlightText : function(editorId){
  	  	 var editorElement =  $("#"+editorId);
		 var enteredText = editorElement.text();
		 var textLimit = parseInt($("#charLimit_" + editorId ).text());
		 var inRangeText = enteredText.substring(0,textLimit);
		 var outRangeText = enteredText.substring(textLimit,enteredText.length);
		 var outRangeSpan = "<span id='outRangeSpan_"+ editorId +"'>" + outRangeText + "</span>";
		 $("#isHighlighted_" +  editorId).text("true");
		 editorElement.empty();
		 editorElement.html(inRangeText+outRangeSpan);
    },
    /***
     * Function to update Count of charcters in student entry  
     * This function is called on "focus keyup keypress" events of editor       * 
     */
    updateCharacterCount:function(e){
  	  var src = $("#"+this.editor.id);
        var chars = src.text().length;                
        var count= this.editor.maxLength - chars ;
        var textLimit =this.editor.maxLength.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        var textCount = count.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        var textCountSpan = textCount; 
        if(count < 0){
        	textCountSpan = "<span style='color:red;'>" +textCount+ " </span>";
        }
	  var countElement = $("#"+this.editor.id+"_chars");
	  countElement.html(textCountSpan + " /" +  textLimit);
	  this.removeTextHighlight();
	  this.updateStudentResponse(e);
    },
    /***
     * Function to remove highlight of charcters in student entry
     */
    removeTextHighlight : function(){    	  
  	  var editorId = this.editor.id;
  	  if($("#isHighlighted_" + editorId).text() != "true"){
  		  return;
  	  }           	
  	  $("#isHighlighted_" + editorId).text("false");                	
  	  var src = $("#"+editorId);
  	  var enteredText =  src.text();
  	  src.empty(); 
  	  src.text(enteredText);   
    },
    /***
  	 * Function to show Caution Icon near Formula when Any Formula is affected 
  	 * @param studentEntryId{String} : studentEntryId
  	 * @param source {String} : Source for showing caution icon. It may be "removeEntry" or "changeFormat"
  	 */
	showCautionIcon : function(studentEntryId, source){
		var questionFormulas = JSON.stringify(question.formulas);
		var messageContentText = "",messageHeader="";
		if(source == "removeEntry"){
			messageContentText = "Deleting " + studentEntryId + " has affected the following formulas: <br>";
			messageHeader = "Deletion Notice";
		}else if(source == "changeFormat"){
			messageContentText = "Updating Format of " + studentEntryId + " has affected the following formulas: <br>";
			messageHeader = "Updation Notice";
		}
		if(questionFormulas.indexOf(studentEntryId) != -1){
			var showCautionIconFlg = false;
			for(var i=0 ; i < question.formulas.length ; i++){
				var formulaString = JSON.stringify(question.formulas[i]);
				if(formulaString.indexOf(studentEntryId) != -1){
					question.formulas[i].setCautionIconStyle("inline-block");
					messageContentText += "<br>" + question.formulas[i].getName();
					showCautionIconFlg = true;
				}
			}			 
			question.displayMessageModal(messageHeader,messageContentText);
			if(showCautionIconFlg){
				question.layout();
			}
		}
	},
	/***
  	 * Function to hide Caution Icon near Formula  
  	 * Note : This function hides caution icon only if formula is validated successfully
  	 */
	hideCautionIcon : function(studentEntryId){
		var questionFormulas = JSON.stringify(question.formulas);
		if(questionFormulas.indexOf(studentEntryId) != -1){
			var showCautionIconFlg = false;
			for(var i=0 ; i < question.formulas.length ; i++){
				var formulaString = JSON.stringify(question.formulas[i]);
				if(formulaString.indexOf(studentEntryId) != -1 && question.formulas[i].validateFormula(question)=="success"){
						question.formulas[i].setCautionIconStyle("none");
						showCautionIconFlg = true;							
				}
			}		
			if(showCautionIconFlg){
				question.layout();
			}
		}
	},
	/***
  	 * Function to validate Formulas in author entry  
  	 */
	validateFormulas : function() {
		for(var i=0;i<question.pages.length;i++){
  			var components = question.pages[i].components;
  			for(var j=0;j<components.length;j++){  				
  				if(components[j].type=='table'){
	  				this.evaluateFormulas();
  				}
  			}
  		}
	},
	/***
  	 * Function to evaluate Formulas in author entry  
  	 */
	evaluateFormulas : function() {
		var authorEntries = $(".formula");
		for(var i=0; i<authorEntries.length;i++){
			var decimalPlaces= $(authorEntries[i]).attr("deci");
			for(var j=0; j<authorEntries[i].children.length;j++){				
				var studentEntryId = authorEntries[i].children[j].className.trim();
				var studentEntriesInFormula = $("."+studentEntryId);
				for(var k=0; k<studentEntriesInFormula.length;k++){
					var sEntry=question.getStudentEntry(studentEntryId);
					
					if(sEntry!= null && sEntry.editor.text!=="" && sEntry.editor.text!=="&nbsp;")
						{
							if(sEntry.contentFormat.type=="percentage"){
								studentEntriesInFormula[k].innerHTML = eval((sEntry.editor.text.replace(/,/g , ""))/100);
							}
							else						
								studentEntriesInFormula[k].innerHTML = sEntry.editor.text;
						}						
				}
			}
			this.showResult(authorEntries[i],decimalPlaces);
		}
	},
	/***
  	 * Function to show Dynamically Generated Result of Formula 
  	 */
	showResult : function(authorFormulaEntry,decimalPlaces) {
		var formulaValues = authorFormulaEntry.textContent.replace(/,/g,"");
		var flag= /\d/.test(formulaValues);
		var decimalPlaces= $(authorFormulaEntry).attr("deci");			
		var evaluatedValue="";
		try{
			if((formulaValues != "" && (formulaValues.indexOf("_")==-1)) || flag )
			{				
				formulaValues= (formulaValues.indexOf("_")==-1)? eval(formulaValues):formulaValues.replace(/_/g,0);
				evaluatedValue = eval(formulaValues);
				if(isNaN(evaluatedValue) || evaluatedValue=="Infinity")
					evaluatedValue=0;
				if(decimalPlaces!='null'){
					evaluatedValue = this.roundOff(evaluatedValue,decimalPlaces);
				}else{
					evaluatedValue = this.roundOff(evaluatedValue,0);
				}
				if(evaluatedValue>1){
					var newvalues=evaluatedValue.toString().split(".");
					if(newvalues.length>1){
						newvalues[0]=newvalues[0].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");						
						evaluatedValue = newvalues[0]+"."+newvalues[1];//evaluatedValue.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
					}
					else
						evaluatedValue=evaluatedValue.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");	
				}
				authorFormulaEntry.nextSibling.innerHTML=" = " + evaluatedValue;
				authorFormulaEntry.nextSibling.nextSibling.innerHTML=evaluatedValue;
			}else{
				authorFormulaEntry.nextSibling.innerHTML="= _";
				authorFormulaEntry.nextSibling.nextSibling.innerHTML="_";
			}
		}catch(err){
			console.log("err : "+JSON.stringify(err));
			authorFormulaEntry.nextSibling.innerHTML="= _";
			authorFormulaEntry.nextSibling.nextSibling.innerHTML="_";
		}		
	}
};
String.prototype.fakeReplace=function(str, newstr) {
    return this.split(str).join(newstr);
};

String.prototype.myReplace = function(pattern, nw) {
   var curidx = 0, len = this.length, patlen = pattern.length, res = "";
   while(curidx < len) {
       var nwidx = this.indexOf(pattern, curidx);
       if(nwidx == -1) {
           break;
       }
       res = res + this.substr(curidx, nwidx - curidx);
       res = res + nw;
       curidx = nwidx + patlen;
   }
   return res;
};
	
