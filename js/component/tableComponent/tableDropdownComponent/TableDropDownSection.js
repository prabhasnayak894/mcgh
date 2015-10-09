/* ========================================================================
 * TableDropDownSection: Object Declaration
 * ========================================================================
 * Purpose of this object to have all component section specific properties like 
 * holds the options, editor question text for this component
 * ======================================================================== */

var TableDropDownSection = function(options){ 
	this.id=null;
	this.idPrefix="G";
	this.componentId=null;
	this.componentIdPrefix=null;	
	this.cellId=null;
	this.options=[];
	$.extend(this, options);
	this.editor = new Editor({id:this.componentIdPrefix+this.componentId+this.cellId+this.idPrefix+this.id});
	this._update = TableDropDownSection.BindAsEventListener( this, this.update );
	this._filter = TableDropDownSection.BindAsEventListener( this, this.filter );
	this._addSection = TableDropDownSection.BindAsEventListener( this, this.addSection);
	this._removeSection = TableDropDownSection.BindAsEventListener( this, this.removeSection);
	this._populateEditorProperties = TableDropDownSection.BindAsEventListener( this, this.populateEditorProperties );
	this._updateStudentResponse = TableDropDownSection.BindAsEventListener( this, this.updateStudentResponse );
	this._updateEditor= TableDropDownSection.BindAsEventListener( this, this.updateEditor );
};
//add event helper method
TableDropDownSection.addEvent = function(oTarget, sEventType, fnHandler,args) {
	$("#"+oTarget).unbind(sEventType);
	$("#"+oTarget).bind(sEventType,args,fnHandler);
};
//use call to borrow context
TableDropDownSection.BindAsEventListener = function(object, fun) {
    return function(event) {
    	event.stopImmediatePropagation();
        return fun.call(object, (event || window.event));
    };
};
TableDropDownSection.prototype = { 
        getIdPrefix: function( ){
            return this.idPrefix;  
	     },
	     setIdPrefix: function( idPrefix){
	         this.idPrefix =  idPrefix;
	     },
         getId: function( ){
            return this.id;  
	     },
	     setId: function(id){
	         this.id =  id;
	     },
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
         * gets section text editor
         */
         getEditor:function(){
        	 this.editor;
         },
         /**
          * sets section text editor
          * @param editor
          */
         setEditor:function(editor){
        	 this.editor=editor;
         },
         /**
          * gets options for section
          * @returns options
          */
          getOptions: function( ){
                  return this.options;  
          },
          /**
           * sets options for section
           * @param options
           */
          setOptions: function(  options ){
              this.options =  options;
          },
          /**
           * adds option for check box component
           * @param option
           */
          addOption:function(option ){
              this.options.push(option);
          },
          /**
           * removes option from check box component
           * @param option
           */
          removeOption:function(option){
         	 var j=0;
         	 for(j in this.options){
 	    			if(this.options[j].getId()==option.getId()){
 	    				this.options.splice(j, 1);
 	    			}
 	    		}
  		    
          },
          /**
           * updates editor text
           */
          update: function(e){
        	  this.editor.update();
        	  var i=0;
        	  for( i in this.options){
        		  this.options[i].update();
        	  }
          },
          /**
           * layouts  editor in design mode
           * @returns {String}
           */
          layout:function(flag,type,pointBasedResponse){
        	 var htmlelement="";
        	 if(!flag){
              	htmlelement+='<div class="section-devider"></div>';
              	}
          	 htmlelement+= this.editorLayout(flag,type);
          	 var lastOption=this.options[this.options.length-1];
        	 var i=0;
         	 for( i in this.options){
         		 if(this.options[i].id==lastOption.id){
         			 htmlelement+=  this.options[i].layout(true,pointBasedResponse);
         		 }
         		 else{
         			 htmlelement+=  this.options[i].layout(false,pointBasedResponse); 
         		 }
         	 }
         	htmlelement+='<div class="clear"></div>';
        	 return htmlelement;
          },
          /**
           * layouts section editor in design mode
           * @returns {String}
           */
          editorLayout:function(isFirst,type){   
	    	 var dataDivAttr = this.editor.text !='' ? 'data-div-placeholder-content' : '';
	    	 var htmlelement="";
	    	 htmlelement+='<div class="rowPagesection-1">';
	    	 htmlelement+=' <div class="eachCol-3">';
	    	 //var minusCss = !isFirst?' style="display: block;"':' style="display: none;"';
        	 //htmlelement+=' <div class="minusBtn" '+minusCss+'><a title="Remove Section" id="sec_minus_'+this.componentIdPrefix+this.componentId+this.idPrefix+this.id+'"><img src="img/minus.png"></a></div>';
             //htmlelement+='<div class="pull-right"><a title="Add Section" id="sec_plus_'+this.componentIdPrefix+this.componentId+this.idPrefix+this.id+'"><img src="img/plus.png"></a></div>';
        	
	    	 //htmlelement+='<a href="#"><img src="img/getPicture.png"></a>' ;
	    	 htmlelement+='</div>'	;
	    	 htmlelement+='   <div class="colPageSection secondColPic">';
	    	 htmlelement+='     <div>';
	    	 htmlelement+='<div class="editableDivTitle">';
        	 htmlelement+=' <h6 class="pull-right font10 tagtext"></h6> ';
        	 htmlelement+=' <h6 class="pull-right font10 inputhead"></h6></div>';
        	 //htmlelement+='<div class="inputDummy"'+dataDivAttr+' data-placeholder="Enter text" contentEditable=true onFocus="focusHandler(this)" onmouseup="mouseupKeyupHandler(this)" onkeyup="mouseupKeyupHandler(this)" id="'+(this.editor.id)+'"  data-maxlength="'+this.editor.maxLength+'" >'+this.editor.text+'</div>';
        	 /*changes done to remove adding select box default text editor */
        	 this.editor.text = "Please Select";
        	 htmlelement+='<div style="display: none;" class="inputDummy"'+dataDivAttr+' data-placeholder="Enter text" contentEditable=true onFocus="focusHandler(this)" onkeypress="keyPressHandler(this)" onmouseup="mouseupKeyupHandler(this)" onkeyup="mouseupKeyupHandler(this)" id="'+(this.editor.id)+'"  data-maxlength="'+this.editor.maxLength+'" >'+this.editor.text+'</div>';
        	 htmlelement+='</div>';
        	 htmlelement+='</div>';
        	 htmlelement+='<div class="colPageSection ">';
        	 htmlelement+='<div class="eachCol">';        	
        	 htmlelement+='</div>';	
        	 htmlelement+='<div>';
        	 htmlelement+='</div>';
        	 htmlelement+='</div>';
             htmlelement+='</div>';
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
        	   	 return htmlelement;
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
      		TableDropDownSection.addEvent( "insertHelp"+this.editor.id,"click",this._openHelpModalForInsertHyperlink);
      		TableDropDownSection.addEvent( "insert_"+this.editor.id, "click", this._updateEditor);
      		 
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
 	      * adds event handlers for html  elements after the layout done in design mode
 	      */
          afterLayout:function(){ 
        	  var i=0;
     		  for( i in this.options){
          		 this.options[i].afterLayout();
          	 } 
     		TableDropDownSection.addEvent( this.editor.id, "blur", this._update );	
     		TableDropDownSection.addEvent( this.editor.id, "paste", this._filter );
     		TableDropDownSection.addEvent( this.editor.id, "click", this._populateEditorProperties );
     		TableDropDownSection.addEvent("sec_plus_"+this.componentIdPrefix+this.componentId+this.idPrefix+this.id, "click", this._addSection );	
     		TableDropDownSection.addEvent("sec_minus_"+this.componentIdPrefix+this.componentId+this.idPrefix+this.id, "click", this._removeSection);
     		if(this.options.length==1){
     			$("#ans_"+this.options[0].editor.id).find(".colPageSection").find(".eachCol").find(".minusBtn").hide();
     		}
          },
          
          /**
           * hide and show point base layout
           */
          togglePonits:function(pointflag){        	  
        	  $.each(this.options,function(i,optionObj){
    			  optionObj.togglePonits(pointflag);
    		  });
          },
          /**
  	      * Validate if section is complete
  	      */
          isSectionComplete:function(pointBasedResponse){
		        var isFilled = true;
				var i = 0;
				var isQuestionTextFilled = true;
				$("#htmlToTextConvertor").html(this.editor.text);
				var questionText = $("#htmlToTextConvertor").text();
				if (questionText.length <= 0) {
					isQuestionTextFilled = false;
				}
				if (pointBasedResponse) {
					// var isPointFilled=true;
					for (i in this.options) {
						isFilled = isQuestionTextFilled && isFilled
								&& this.options[i].isOptionAnswerPointValueFilled()
								&& this.options[i].isOptionFilled();
					}
				} else {
					for (i in this.options) {
						isFilled = isQuestionTextFilled && isFilled
								&& this.options[i].isOptionFilled();
					}
				}
				return isFilled;  
          },
          /**
   	      * Validate if right answer is not selected
   	      */
          isRightAnswerSelected:function(binaryAnswer){
        	  var rightAnswerSelected=true;
        	  var i=0;
        	  if(binaryAnswer){
        		  for (i in this.options) {
            		  rightAnswerSelected = rightAnswerSelected && this.options[i].isRightAnswerSelected();
    				} 
        	  }else{
        		  var cnt=0;
        		  for (i in this.options) {
            		  if(this.options[i].answers[0].right){
            			  cnt++;
            		  }
    				} 
        		  rightAnswerSelected=(cnt==0)?false:true;
        	  }
        	  
        	  return rightAnswerSelected;
          },
          /**
			 * Function to add new section to multiple choice question
			 */
          addSection : function(){        
        	var i=0;
        	  for(i in question.activePage.components){
        		if(question.activePage.components[i].id==this.componentId){
        			var newId = question.activePage.components[i].sections[question.activePage.components[i].sections.length-1].getId()+1;
        			var config = {
        					id:newId,
        					componentId : this.componentId,
        					componentIdPrefix : this.componentIdPrefix
        			};
        			var newSection = new TableDropDownSection(config);
        			var secOptions = new Array();
        			
        			$.each(this.options,function(index,option){
        				var optAnswers= new Array();
        				var optConfig = {
        						 id : option.id,
        						 sectionId : newSection.id,
        						 sectionIdPrefix : newSection.componentIdPrefix+newSection.componentId+newSection.idPrefix,
        						 componentId : newSection.componentId,
             					componentIdPrefix : newSection.componentIdPrefix
        				};	
        				var j=0;
        				for(j in option.answers){
        					var rightFlag = false;
        					if( j == 0 ){
        						rightFlag = page.components[i].binaryAnswer?true:page.components[i].acceptAnyAnswer;
        					}
        					var optionAnswersConfig = {
        							id:option.answers[j].id,
        							optionId : option.id,
        							optionIdPrefix : option.sectionIdPrefix+optConfig.sectionId+option.idPrefix,
        							componentId : option.componentId,
                  					componentIdPrefix : option.componentIdPrefix,
                  					sectionId : newSection.id,
        	    					sectionIdPrefix : newSection.idPrefix,
        							label : option.answers[j].label,
        							right : rightFlag
        						};
        					optAnswers.push(new TableDropDownOptionAnswer(optionAnswersConfig));
        				}
        				var optionObj = new TableDropDownOption(optConfig);
        				optionObj.setAnswers(optAnswers);
        				secOptions.push(optionObj);
        			});
        			newSection.options = secOptions;
        			question.activePage.components[i].addSection(newSection);
        			question.activePage.doLayout(); 
        			question.activePage.components[i].populateComp();
        		    break;
        		}
        	}
          },
          removeSection : function(){
        	  var i=0;
        	  for(i in question.activePage.components){
        			if(question.activePage.components[i].id==this.componentId){
        				for(j in question.activePage.components[i].sections){
        					if(question.activePage.components[i].sections[j].id==this.id){
        						question.activePage.components[i].sections.splice(parseInt(j),1);
        						question.activePage.components[i].updateMinMaxPoint();
        						question.activePage.doLayout();
        						question.activePage.components[i].showSolutionIndicator();
        	        		    break;
        					}
        				}
        			}
        	  }
        	  
         },
         /**
          * filter out html
          * @param event
          */
        filter:function(event){
      		util.removePasteImage(event.originalEvent.clipboardData,event);
      	},
      	/**
         * layouts in instructor mode
         * @returns {String}
         */
        instructorLayout:function(graded,binaryAnswer,subType,orientation,acceptAnyAnswer,pointBasedResponse){
	       	var htmlelement='';
	       	var bgcss=binaryAnswer?"binaryAnswerBg":"";
	       	var markCompulsary=(graded)?"<span class='starHide'>*</span>":"";
	   		if(subType=='radio'){
	   			htmlelement +='<div class="prevQuestOpt '+bgcss+'">';
		   		var i=0;
		   		for( i in this.options){
		   			
			   		htmlelement +=this.options[i].instructorLayout(binaryAnswer,subType,i==0?true:false,acceptAnyAnswer,pointBasedResponse,orientation);
			   		
		   			if(binaryAnswer){
		   			 htmlelement+='<div class="clear"></div>';
		   			}else{
		   				if(orientation==1){
		   	   			 htmlelement+='<div class="clear"></div>';
		   	   			}else if(orientation==3){
		   	   				if((parseInt(i)+1)%2==0){
		   	   				 htmlelement+='<div class="clear"></div>';
		   	   				}
		   	   			}
		   			}
		       	}
		   		htmlelement +='</div">';
	   		}else{
	   			 htmlelement+='<div class="rowPagesection prevQuestOpts  tableColWidth">';
  				 htmlelement+='<select id="option_'+this.editor.id+'" style="width:95%; text-overflow: ellipsis;" class="newDropDownOption" name="options">';
  				 var opts="";
  				 var opts='<option value="-1" id="opt_none">'+this.editor.text+'</option>';
  				var feedbackText = '';
  				 var j=0;
  				 for(j in this.options){
  					if( this.options[j].answers[0].feedback.text != '' ){
  						feedbackText += '<div class="feedOptiontext"><strong>Option ' + (parseInt(j)+1) + ' Feedback:</strong> ' + this.options[j].answers[0].feedback.text + '</div>';
  					}
  					var selectedproperty= !acceptAnyAnswer && this.options[j].answers[0].right?"selected":""; 
  					var optionText = this.options[j].editor.text;
  					if(pointBasedResponse){
  						optionText +=this.options[j].answers[0].pointsValueEditor.text;
  						optionText +=(parseFloat(this.options[j].answers[0].pointsValueEditor.text)>1)?" pts":" pt";
  					}
  					opts +='<option "="" value="'+j+'" id="opt_'+j+'" '+selectedproperty+'  disabled>'+optionText+'</option>';
  				 }
  				 
  				 htmlelement+= opts;
  				 htmlelement+= '</select>';
  				 /*
  				 if( feedbackText != '' ) {
  					htmlelement +='<label><a class="feedClose">See feedback</a></label>';
  					htmlelement +='<div style="display:none;" class="feedBackOpen">';
  					htmlelement += feedbackText;
  					htmlelement +='</div>';
  				 }
  				 */
  				 htmlelement+= markCompulsary+'</div>';
  			}
  			
	   		return htmlelement;
        },
        /**
         * layouts in student test mode
         * @returns {String}
         */
        studentLayout:function(binaryAnswer,subType,orientation,acceptAnyAnswer,pointBasedResponse,showPointsToStudents){
        	var htmlelement='';
        	var bgcss=binaryAnswer?"binaryAnswerBg":"";
	   		if(subType=='radio'){
	   			htmlelement +='<div class="prevQuestOpt '+bgcss+'">';
		   		var i=0;
		   		for( i in this.options){
		   		 
			   		htmlelement +=this.options[i].studentLayout(binaryAnswer,subType,i==0?true:false,orientation,acceptAnyAnswer,pointBasedResponse,showPointsToStudents);
			   		
			   		if(binaryAnswer){
		   			 htmlelement+='<div class="clear"></div>';
		   			}else{
		   				if(orientation==1){
		   	   			 htmlelement+='<div class="clear"></div>';
		   	   			}else if(orientation==3){
		   	   				if((parseInt(i)+1)%2==0){
		   	   				 htmlelement+='<div class="clear"></div>';
		   	   				}
		   	   			}
		   			}
		   			
		       	}
		   		htmlelement +='</div">';
	   		}else{
  				 htmlelement+='<div class="rowPagesection tableColWidth">';
  				 htmlelement+='<select id="option_'+this.editor.id+'" style="width: 100% !important;  text-overflow: ellipsis;" class=" dropDownOption" name="options">';
  				 var opts='<option value="-1" id="opt_none">'+this.editor.text+'</option>';
  				 var j=0;
  				 for(j in this.options){
  					opts += this.options[j].studentLayout(binaryAnswer,subType,j==0?true:false,acceptAnyAnswer,pointBasedResponse,orientation,showPointsToStudents);
  				 }
  				 htmlelement+= opts;
  				 htmlelement+= '</select>';
  				 htmlelement+= '</div>';
  			}
  			
	   		return htmlelement;
        },
        /**
         * add event handers to html elements after the layout done in student test mode
         * @returns {String}
         */
        afterStudentLayout:function(subType){   
        	if(subType=='radio'){
        		var j=0;
	   	   		 for(j in this.options){
	   	   			 this.options[j].afterStudentLayout();
	   	   		 }
        	}else{
        		TableDropDownSection.addEvent( "option_"+this.editor.id, "change", this._updateStudentResponse );	
        	}
        	$('.stdQueLabel').each(function (){
    			$(this).find('font').css('line-height', $(this).find('font').css('font-size'));
            });
	   	},
	   	resetAll : function(){
	   	 for(j in this.options){
	   		this.options[j].answers[0].studentResponse = null;
	   	 }
	   	},
	    updateStudentResponse : function(){
	    	var j=0;
  	   		 for(j in this.options){
  	   			if($("#option_"+this.editor.id).val() == '-1'){
  	   				this.resetAll();
  	   				question.updateProgressBar();
  	   			}else{
	  	   			if( this.options[j].id==$("#option_"+this.editor.id).val()){
		  	   			this.options[j].answers[0].resetStudentResponse();
		  		    	this.options[j].answers[0].studentResponse = true;
		  		    	question.updateProgressBar();
	  	   			}
	  	   			else{
	  	   			    this.options[j].answers[0].resetStudentResponse();
	  	   				this.options[j].answers[0].studentResponse = false;
	  	   			    question.updateProgressBar();
	  	   			}
  	   			}
  	   		 }
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
        postSubmissionReviewLayout:function(graded,binaryAnswer,subType,orientation,acceptAnyAnswer,pointBasedResponse,isStudentChecked,showPointsToStudents){
        	var htmlelement='';
        	var bgcss=binaryAnswer?"binaryAnswerBgPostSubView":"";
        	var markCompulsary=(graded)?"<span class='compulsary starHide'>*</span>":"";
	   		if(subType=='radio'){
	   			htmlelement +='<div class="prevQuestOpt '+bgcss+'">';
		   		var i=0;
		   		for( i in this.options){
		   			
			   		htmlelement +=this.options[i].postSubmissionReviewLayout(binaryAnswer,subType,i==0?true:false,acceptAnyAnswer,pointBasedResponse,orientation,isStudentChecked,showPointsToStudents);
			   		
		   			if(binaryAnswer){
		   			 htmlelement+='<div class="clear"></div>';
		   			}else{
		   				if(orientation==1){
		   	   			 htmlelement+='<div class="clear"></div>';
		   	   			}else if(orientation==3){
		   	   				if((parseInt(i)+1)%2==0){
		   	   				 htmlelement+='<div class="clear"></div>';
		   	   				}
		   	   			}
		   			}
		       	}
		   		htmlelement +='</div">';
	   		}else{
  				 htmlelement+='<div class="rowPagesection prevQuestOpts tableColWidth">';
  				 var correctAnsCnt= this.calTotalCrctAnswersGivenByStudent(binaryAnswer);
  				 var css= (acceptAnyAnswer) ? '' : correctAnsCnt==1?"correct":this.isStudentAnswered(binaryAnswer)?"wrong":"";
  				// htmlelement+= '<div id="showCorrect_'+this.editor.id+'" class=" '+css+'" ></div>';
  				 htmlelement+='<select id="option_'+this.editor.id+'" style="text-overflow: ellipsis; width: 90% !important; margin-bottom:4px; margin-left:2px;" class="dropDownOption" name="options">';
  				 var opts="";
  				/* if(acceptAnyAnswer){
  					opts +='<option "="" value="-1" id="opt_none" disabled ></option>';
  				 }*/
  				if(css == "correct" || css == ""){
  					 $("#"+this.componentIdPrefix+this.componentId+this.cellId).addClass("correct");
  				 }
  				 else{
  					 $("#"+this.componentIdPrefix+this.componentId+this.cellId).addClass("inCorrectCell");
  				 }
  				 opts +='<option "="" value="-1" disabled>'+this.editor.text+'</option>';
  				 var feedbackText = '';
  				 var correctAnswer = '';
  				 
  				 var j=0;
  				 for(j in this.options){
  					var selectedproperty = '';
  					if( !acceptAnyAnswer && this.options[j].answers[0].right ){
						correctAnswer = this.options[j].editor.text;  
						correctAnswer=decodeURIComponent(escape(correctAnswer));
  					}
  					if( this.options[j].answers[0].studentResponse ){
  						selectedproperty = 'selected';
  						 						
  					} 
  					var optionText = this.options[j].editor.text;
  					optionText=util.getImageLayout(optionText);
  					if(pointBasedResponse && showPointsToStudents){
  						optionText +="~"+this.options[j].answers[0].pointsValueEditor.text ;
  						optionText +=(parseFloat(this.options[j].answers[0].pointsValueEditor.text)>1)?" pts":" pt";
  					}
  					opts +='<option "="" value="'+j+'" id="opt_'+j+'" '+selectedproperty+'  disabled>'+optionText+'</option>';
  					
  					if( this.options[j].answers[0].studentResponse ){
  						feedbackText = this.options[j].answers[0].feedback.text;
  					}
  				 }
  				 htmlelement+= opts;
  				 htmlelement+= '</select>';
  				 
  				 if( !acceptAnyAnswer && this.isStudentAnswered(binaryAnswer) && correctAnsCnt!=1 ) {
  					htmlelement+= '<div class="correctAnswerText">Correct Answer: ' + correctAnswer + '</div>';
  				 }	
  				 
  				 if( feedbackText != '' ){
  					htmlelement +='<label><a class="feedClose">See feedback</a></label>';
  					htmlelement +='<div style="display:none;" class="feedBackOpen">';
  					htmlelement += ' <strong>Feedback:</strong>'+feedbackText;
  					htmlelement +='</div>';
  				 }
  				 htmlelement+= markCompulsary+'</div>';
  			}
  			
	   		return htmlelement;
        },
        /**
		 * check if question is answered
		 */

        isStudentAnswered:function(binaryAnswer){
             var i=0;
             var validflag=false;
   			 for( i in this.options){
   				validflag= this.options[i].isStudentAnswered(binaryAnswer);
   				if(binaryAnswer){
   					if(!validflag){
   	   					break;
   	   				}
   				} else {
   					if(validflag){
   	   					break;
   	   				}
   				}
   				
   			 }
			return validflag;
	},
	/**
	 * calculate points for student
	 */
	calculatePoints:function(){
		var points=0;
		 var i=0;
		 for( i in this.options){
			 points += this.options[i].calculatePoints();
			
		 }
		return points;
	},
	/**
	 * calculate Correct Answers
	 */
	calTotalCrctAnswersGivenByStudent:function(binaryAnswer){
		var count=0;
		 if(binaryAnswer){
			 var i=0;
			 var correctFlag=false;
			 for( i in this.options){
				 if((this.options[i].answers[0].right && this.options[i].answers[0].studentResponse) || (this.options[i].answers[1].right && this.options[i].answers[1].studentResponse)){
					 correctFlag=true;
				 }else{
					 correctFlag=false;
				 }
				 count +=(correctFlag)?1:0;
			 }
		 }else{
			 var i=0;
			 var correctFlag=false;
			 for( i in this.options){
				 if(this.options[i].answers[0].right && this.options[i].answers[0].studentResponse){
					 correctFlag=true;
				 }
			 }
			 count=(correctFlag)?1:0;
		}
		return count;
	},
	/**
	 * calculate Wrong Answers
	 */
	calTotalWrngAnswersGivenByStudent:function(binaryAnswer){
		
		var count=0;
		 if(binaryAnswer){
			 var i=0;
			 var correctFlag=false;
			 for( i in this.options){
				 if(this.options[i].answers[0].studentResponse!=null || this.options[i].answers[1].studentResponse!=null){
					 if((this.options[i].answers[0].right && this.options[i].answers[0].studentResponse) || (this.options[i].answers[1].right && this.options[i].answers[1].studentResponse)){
						 correctFlag=true;
					 }else{
						 correctFlag=false;
					 } 
				 }else{
					 correctFlag=true;
				 }
				 
				 count +=(correctFlag)?0:1;
			 }
		 }else{
			 var i=0;
			 var correctFlag=false;
			 for( i in this.options){
				 if(this.options[i].answers[0].right && this.options[i].answers[0].studentResponse){
					 correctFlag=true;
				 }
			 }
			 count=(correctFlag)?0:1;
		}
		 
		
		return count;
	}
};  