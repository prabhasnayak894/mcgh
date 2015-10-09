/* ========================================================================
 * InputFieldSection: Object Declaration
 * @author: Debasmita Sahoo
 * ========================================================================
 * Purpose of this object to have all component section specific properties like 
 * holds the options, editor question text for this component
 * ======================================================================== */

var InputFieldSection = function(options){ 
	this.id=null;
	this.idPrefix="G";
	this.componentId=null;
	this.componentIdPrefix=null;	
	this.authorEntries=[];
	this.studentEntries=null;
	$.extend(this, options);
	this._update = InputFieldSection.BindAsEventListener( this, this.update );
	this._filter = InputFieldSection.BindAsEventListener( this, this.filter );
	this._addSection = InputFieldSection.BindAsEventListener( this, this.addSection);
	this._removeSection = InputFieldSection.BindAsEventListener( this, this.removeSection);
	this.isBranched = false;   //Set to true if this used as source
	this.isBranchDest = false;    //set true if this used as destination for path mapping
	this.destBranchId = null;		// set branch id into destination
	this.showToStud=true;//check for student/postsubmission layout

};
//add event helper method
InputFieldSection.addEvent = function(oTarget, sEventType, fnHandler,args) {
	$("#"+oTarget).unbind(sEventType);
	$("#"+oTarget).bind(sEventType,args,fnHandler);
};
//use call to borrow context
InputFieldSection.BindAsEventListener = function(object, fun) {
    return function(event) {
    	event.stopImmediatePropagation();
        return fun.call(object, (event || window.event));
    };
};
InputFieldSection.prototype = { 
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
	      * get authorEntries
	      * @returns {Array}
	      */
          getAuthorEntries: function( ){
                  return this.authorEntries;  
          },
          /**
           * sets authorEntries for section
           * @param authorEntries
           */
          setAuthorEntries: function(  authorEntries ){
              this.authorEntries =  authorEntries;
          },
          /**
 	      * get studentEntries
 	      * @returns {Array}
 	      */
           getStudentEntries: function( ){
                   return this.studentEntries;  
           },
           /**
            * sets studentEntries for section
            * @param studentEntries
            */
           setStudentEntries: function(  studentEntries ){
               this.studentEntries =  studentEntries;
           },
          /**
           * adds authorEntry
           * @param authorEntry
           */
          addAuthorEntry:function(  authorEntry ){
              this.authorEntries.push(authorEntry);
          },
          /**
           * removes authorEntry 
           * @param authorEntry
           */
          removeAuthorEntry:function(authorEntry){
         	 var j=0;
         	 for(j in this.authorEntries){
 	    			if(this.authorEntries[j].getId()==authorEntry.getId()){
 	    				this.authorEntries.splice(j, 1);
 	    			}
 	    		}
  		    
          },
          
          /**
           * adds studentEntry
           * @param studentEntry
           */
          addStudentEntry:function(studentEntry ){
              this.studentEntries.push(studentEntry);
          },
          /**
           * removes studentEntry 
           * @param studentEntry
           */
          removeStudentEntry:function(studentEntry){
         	 var j=0;
         	 for(j in this.studentEntries){
 	    			if(this.studentEntries[j].getId()==studentEntry.getId()){
 	    				this.studentEntries.splice(j, 1);
 	    			}
 	    		}
  		    
          },
          /* branch options */
          getIsBranched:function(){
           return this.isBranched;
          },
          setIsBranched:function(isBranched){
            this.isBranched = isBranched;
          },
          getIsBranchDest:function(){
            return this.isBranchDest;
          },
          setIsBranchDest:function(isBranchDest){
            this.isBranchDest = isBranchDest;
          },
          /* for branch id in destination */
      	   getDestBranchId:function(){
              	return this.destBranchId;
          },
          setDestBranchId:function(destBranchId){
          	this.destBranchId = destBranchId;
          },
          /* for showToStud flag*/
      	   getShowToStud:function(){
              	return this.showToStud;
          },
          setShowToStud:function(showToStud){
          	this.showToStud = showToStud;
          },
          /**
           * updates editor text
           */
          update: function(){
        	  var i=0;
        	  for( i in this.authorEntries){
        		  this.authorEntries[i].update();
        	  }
        	  if(this.studentEntries!=null){
        		  var j=0;
            	  for( j in this.studentEntries){
            		  this.studentEntries[j].update();
            	  }
        	  }
      		  
          },
          /**
           * layouts  editor in design mode
           * @returns {String}
           */
          layout:function(flag,type,index, isSectionMore){
        	  var htmlelement='';
        	 
        	  if(type=='label'){
        		htmlelement += this.labelLayout(type);
        	  }else if(type=='inputField'){
        		htmlelement += this.inputFieldLayout(flag,type,index, isSectionMore);
        	  }else if(type=='fillInTheBlank'){
        		htmlelement += this.fillInTheBlankLayout(flag,type,index, isSectionMore);
        	  }
        	 
        	 return htmlelement;
          },
          /**
           * Label Element Layout
           */
          labelLayout:function(type){
        	 var htmlelement="";
        	 htmlelement+='<div  class="rowPagesection ">';
 	    	 var firstAuthorEntry=this.authorEntries[this.authorEntries.length-1];
        	 var isfirstAuthorEntry=false;
        	 $.each(this.authorEntries ,function(index,authorEntry){
        		 if(firstAuthorEntry.id==authorEntry.id){
        			 isfirstAuthorEntry=true;
        		 }
        		 htmlelement+=authorEntry.layout(isfirstAuthorEntry);
        		
 			 });
        	 htmlelement+='</div>';
        	 htmlelement+='<div class="clear"></div>';
        	 return htmlelement;
          },
          /**
           * Input Field Element Layout
           */
          inputFieldLayout:function(flag,type,index,isSectionMore){
        	 var minusCss = flag?"invisible" : "";
        	 
        	 var htmlelement="";
        	 htmlelement+='<div  class="rowPagesection ">';
        	 if(index > 0){
        		 htmlelement+='<div class="section-devider"></div>';
        	 }
 	    	 htmlelement+=' <div class="labelEditField">';
 	    	 htmlelement+='	<div class="pull-left"><a title="Add Section" id="sec_plus_'+this.componentIdPrefix+this.componentId+this.idPrefix+this.id+'"><img src="img/plus.png"></a></div>';
 	    	 htmlelement+=' <div class="minusBtn '+minusCss+'" style="margin-left: 3px;"><a title="Remove Section" id="sec_minus_'+this.componentIdPrefix+this.componentId+this.idPrefix+this.id+'"><img src="img/minus.png"></a></div>';
 	    	 var fSectionClass = (!isSectionMore)?'hideIt':'';
             htmlelement+=' <div class="colPageSectionidMchoice '+fSectionClass+'">';
             htmlelement+='   <h6 style="float:right;" class="font10">ID # '+this.componentIdPrefix+this.componentId+this.idPrefix+this.id+'</h6>';
             htmlelement+=' </div>';
 	    	 htmlelement+='</div>'	;
 	    	 htmlelement+='<div class="clear"></div>';
 	    	 var firstAuthorEntry=this.authorEntries[this.authorEntries.length-1];
        	 var isfirstAuthorEntry=false;
        	
        	 $.each(this.authorEntries ,function(index,authorEntry){
        		 if(firstAuthorEntry.id==authorEntry.id){
        			 isfirstAuthorEntry=true;
        		 }
        		 htmlelement+=authorEntry.layout(isfirstAuthorEntry);
        		
 			 });
        	 
        	 if( this.studentEntries!=null){
        		 htmlelement+='<div class="clear"></div>';
        		 var lastStudentEditor=this.studentEntries[this.studentEntries.length-1];
            	 var isLastStudentEditor=false;
            	 var showMinus=true;
            	 if(this.studentEntries.length==1){
            		 showMinus=false; 
            	 }
            	 $.each(this.studentEntries ,function(index,studentEntry){
            		 if(lastStudentEditor.id==studentEntry.id){
            			 isLastStudentEditor=true;
            		 }
            		 htmlelement+=studentEntry.layout(isLastStudentEditor,type,showMinus);
     			 });
        	 }
        	 htmlelement+='</div>';
        	 htmlelement+='<div class="clear"></div>';
        	 return htmlelement;
          },
          /**
           * Fill In The Blank Element Layout
           */
          fillInTheBlankLayout:function(flag,type,index,isSectionMore){
        	  var minusCss = flag?"invisible" : "";
        	  var htmlelement="";
        	 
 	    	 htmlelement+='<div  class="fillInTheBlankcolPagesection">';
 	    	 htmlelement+=' <div>';
 	    	 htmlelement+='	<div class="pull-left"><a title="Add Section" id="sec_plus_'+this.componentIdPrefix+this.componentId+this.idPrefix+this.id+'"><img src="img/plus.png"></a></div>';
 	    	 htmlelement+=' <div class="minusBtn '+minusCss+'" style="margin-left: 3px;"><a title="Remove Section" id="sec_minus_'+this.componentIdPrefix+this.componentId+this.idPrefix+this.id+'"><img src="img/minus.png"></a></div>';
 	    	 var fSectionClass = (!isSectionMore)?'hideIt':'';
             htmlelement+=' <div class="colPageSectionidMchoice '+fSectionClass+'">';
             htmlelement+='   <h6 style="float:right;" class="font10">ID # '+this.componentIdPrefix+this.componentId+this.idPrefix+this.id+'</h6>';
             htmlelement+=' </div>';
 	    	 htmlelement+='</div>'	;
 	    	htmlelement+='<div class="clear"></div>';
 	    	 var firstAuthorEntry=this.authorEntries[0];
 	    	 var secondAuthorEntry=this.authorEntries[1];
        	 var studentEntry=this.studentEntries[0];
        	 htmlelement+=firstAuthorEntry.layout(null,'first',studentEntry.orientation);
        	 htmlelement+='<div class="clear"></div>';
        	 htmlelement+=studentEntry.layout(null,type);
        	 htmlelement+='<div class="clear"></div>';
        	 htmlelement+=secondAuthorEntry.layout(null,'second',studentEntry.orientation);
        	 htmlelement+='<div class="clear"></div>';
        	 htmlelement+=studentEntry.layoutFeedbackEditor(type);
        	 
        	 htmlelement+='</div>';
        	        	
        	 return htmlelement;
          },
          /**
 	      * adds event handlers for html  elements after the layout done in design mode
 	      */
          afterLayout:function(subType){ 
          	  $.each(this.authorEntries ,function(index,authorEntry){
        			  authorEntry.afterLayout();	
        	 });
        	  if(subType!="label" ){
        		  $.each(this.studentEntries ,function(index,studentEntry){
        			  studentEntry.afterLayout();	
        		 });
          	 }
          	InputFieldSection.addEvent("sec_plus_"+this.componentIdPrefix+this.componentId+this.idPrefix+this.id,"click",this._addSection);
          	InputFieldSection.addEvent("sec_minus_"+this.componentIdPrefix+this.componentId+this.idPrefix+this.id,"click",this._removeSection);
          },
          /**
           * show/hide answer field
           */
          updateAnswerLayout:function(acceptAnyAnswer){
        	  $.each(this.studentEntries ,function(index,studentEntry){
    			  studentEntry.updateAnswerLayout(acceptAnyAnswer);	
    		 });
          },
          /**
           * show/hide answer field
           */
          updateAnswerLayout:function(acceptAnyAnswer){
        	  $.each(this.studentEntries ,function(index,studentEntry){
    			  studentEntry.updateAnswerLayout(acceptAnyAnswer);	
    		 });
          },
         
          /**
			 * Function to add new section to input field question
			 */
          addSection : function(event){ 
        	var i=0;
        	  for(i in question.activePage.components){
        		if(question.activePage.components[i].id==this.componentId){
        			var inputComp =question.activePage.components[i];
        			var newId = inputComp.sections[inputComp.sections.length-1].getId()+1;
        			var config = {
        					id:newId,
        					componentId : this.componentId,
        					componentIdPrefix : this.componentIdPrefix
        			};
        			var newSection = new InputFieldSection(config);
        			if(question.activePage.components[i].isBranched && question.activePage.components[i].sections.length == 1){
        				question.activePage.components[i].isBranched = false;
        				question.activePage.components[i].sections[0].isBranched = true;
        			}
        			inputComp.addSection(newSection);
        			if(event.type=='click'){
        				var newAtrEntries = new Array();
        				$.each(this.authorEntries,function(index,authorEntry){
        					var newAthrConf = {
        						id : 	authorEntry.id,
        						componentId : authorEntry.componentId,
        						componentIdPrefix : authorEntry.componentIdPrefix,
        						sectionId : newId,
        						type:authorEntry.type
        					};
        					newAtrEntries.push(new AuthorEntry(newAthrConf));
        				});
        				newSection.setAuthorEntries(newAtrEntries);
        				var newStudentEntries = new Array();
        				$.each(this.studentEntries,function(index,studentEntry){
        					var stdConf = {
        							id : 	studentEntry.id,
            						componentId : studentEntry.componentId,
            						componentIdPrefix : studentEntry.componentIdPrefix,
            						sectionId : newId
        					};
        					var studentEntrynew= new StudentEntry(stdConf);
        					//replicate orientation of previous student entry in case of Fill in the Blanks only
        					if(inputComp.subType=='fillInTheBlank' ){
        						studentEntrynew.orientation=studentEntry.orientation;
        					}
        					newStudentEntries.push(studentEntrynew);
        				});
        				newSection.setStudentEntries(newStudentEntries);
                	}
        			question.activePage.doLayout(); 
        			inputComp.populateComp();
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
        						if(question.activePage.isBranchDest 
        								|| question.activePage.components[i].isBranchDest
        								|| question.activePage.components[i].isBranched
        								|| question.activePage.components[i].sections[j].isBranchDest 
        								|| question.activePage.components[i].sections[j].isBranched){
    								new Modal({
    									id : 1,
    									headingText : "Warning ! ",
    									containtText : "This Section is a part of path mapping logic and cannot be deleted.",
    								}).getWarningModal();
    								return false;
    							}
        						else{
        							question.activePage.components[i].sections.splice(parseInt(j),1);
            						question.activePage.doLayout();
            	        		    break;
        						}
        					}
        				}
        				question.activePage.components[i].populateComp(); 
        				if( question.activePage.components[i].sections.length == 1 && question.activePage.components[i].sections[0].isBranched){
            				question.activePage.components[i].isBranched = true;
            				question.activePage.components[i].sections[0].isBranched = false;
            			}
        			}
        	  }
        	  
          },
          isSectionComplete:function(){
		        var validObj={};
		        var isFilled=true;
				var i = 0;
				for (i in this.authorEntries) {
					isFilled = isFilled && this.authorEntries[i].isAuthorEntryFilled();
					if(!isFilled){
						break;
					}
				}
				if(isFilled && this.studentEntries !=null){
					var j = 0;
					for (j in this.studentEntries) {
						var validatorObj = this.studentEntries[j].isStudentEntryFilled();
						isFilled = isFilled && validatorObj.status;
						validObj.message = validatorObj.message;
						validObj.field=validatorObj.field;
						if(!isFilled){
							break;
						}
					}
				}
				validObj.status =isFilled;
				return validObj;  
          },
          filter:function(event){
      		util.removePasteImage(event.originalEvent.clipboardData,event);
      	 },
      	 /**
 		 * check if question is answered
 		 */

        isStudentAnswered:function(){
     	    var i=0;
            var validflag=true;
        	for( i in this.studentEntries){
        		validflag=validflag && this.studentEntries[i].editor.text.trim().length>0;
        		if(validflag){
        		   var text=this.studentEntries[i].editor.text; 
        		   if(text!=""){
					   if(this.studentEntries[i].contentFormat.type=='number' || this.studentEntries[i].contentFormat.type=='percentage'){
						   text=text.replace(/,/g,'');
			    	   }
					   text=text.trim();
				   }
        			validflag= this.studentEntries[i].isValidAnswerOrStudentResponse(text);
        			if(!validflag){
        				//this.studentEntries[i].validateStudentResponse({data:{id:this.studentEntries[i].editor.id}});
        				break;
        			}
        		}
  			 }
  			 
 			return validflag;
        },
      	 /**
          * layouts in instructor mode
          * @returns {String}
          */
         instructorLayout:function(subType,acceptAnyAnswer,graded){
        	var htmlelement="";
        	switch(subType){
        	case "label":
        		htmlelement+=this.instructorLabelLayout();
        		break;
        	case "inputField":
        		htmlelement+=this.instructorInputFieldLayout(acceptAnyAnswer,graded);
        		break;
        	case "fillInTheBlank":
        		htmlelement+=this.instructorFillInTheBlankLayout(acceptAnyAnswer,graded);
        		break;
        	}
        	
     		return htmlelement;
         },
         /**
          * layouts in instructor mode
          * @returns {String}
          */
         instructorLabelLayout:function(){
        	var htmlelement="";
        	var col2Count=0;
        	var col3Count=0;
        	var i=0;
        	for (i in this.authorEntries){
        		if(this.authorEntries[i].orientation==1){
        			htmlelement+='<div class="clear"></div>';
        		}
        		htmlelement+=this.authorEntries[i].instructorLayout();
        		if(this.authorEntries[i].orientation==1){
        			htmlelement+='<div class="clear"></div>';
        		}else if(this.authorEntries[i].orientation==2){
        			col2Count++;
        		}else{
        			col3Count++;
        		}
        		if((col2Count==2 && col3Count==0)|| (col2Count==1 && col3Count==1)||col3Count==3){
        			htmlelement+='<div class="clear"></div>';
        			col2Count=0;
        			col3Count=0;
        		}
        	}
        	
     		return htmlelement;
         },
         /**
          * layouts input field in instructor mode
          * @returns {String}
          */
         instructorInputFieldLayout:function(acceptAnyAnswer,graded){
        	var htmlelement="";
        	htmlelement+=this.instructorLabelLayout();
        	htmlelement+='<div class="clear"></div>';
        	var i=0;
        	var col2Count=0;
        	var col3Count=0;
        	for (i in this.studentEntries){
        		if(this.studentEntries[i].orientation==1){
        			htmlelement+='<div class="clear"></div>';
        		}
        		htmlelement+=this.studentEntries[i].instructorLayout(acceptAnyAnswer,graded);
        		if(this.studentEntries[i].orientation==1){
        			htmlelement+='<div class="clear"></div>';
        		}else if(this.studentEntries[i].orientation==2){
        			col2Count++;
        		}else{
        			col3Count++;
        		}
        		if((col2Count==2 && col3Count==0)|| (col2Count==1 && col3Count==1)||col3Count==3){
        			htmlelement+='<div class="clear"></div>';
        			col2Count=0;
        			col3Count=0;
        		}
        	}
        	htmlelement+='<div class="clear"></div>';
     		return htmlelement;
         },
         /**
          * layouts input field in instructor mode
          * @returns {String}
          */
         instructorFillInTheBlankLayout:function(acceptAnyAnswer,graded){
        	var htmlelement="";
        	var cssColumnLayout="column-"+this.studentEntries[0].orientation;
        	var displayStyle = "";
         	if(question.mode != MODE_DESIGN)
         	{
         		displayStyle= "display: inline-flex;";
         	}
        	htmlelement+=' <div class="colPageSection '+cssColumnLayout+'" style="'+displayStyle+'">';
         	htmlelement+=this.authorEntries[0].instructorLayout(this.studentEntries[0].orientation);
         	htmlelement+='<div class="fibDivider"></div>';
         	htmlelement+=this.authorEntries[1].instructorLayout(this.studentEntries[0].orientation);
         	htmlelement+='</div>';
        	htmlelement+='<div class="clear"></div>';
        	htmlelement+=this.studentEntries[0].instructorLayout(acceptAnyAnswer,graded);
        	htmlelement+='<div class="clear"></div>';
     		return htmlelement;
         },
         /**
          * layouts in student test mode
          * @returns {String}
          */
         studentLayout:function(subType,graded){
        	var htmlelement="";
         	switch(subType){
         	case "label":
         		htmlelement+=this.instructorLabelLayout();
         		break;
         	case "inputField":
         		htmlelement+=this.studentInputFieldLayout(graded);
         		break;
         	case "fillInTheBlank":
         		htmlelement+=this.studentFillInTheBlankLayout(graded);
         		break;
         	}
         	
      		return htmlelement;
         },
        
         
         /**
          * layouts input field student test mode
          * @returns {String}
          */
         studentInputFieldLayout:function(graded){
			 console.log("graded"+graded);
        	var htmlelement="";
        	htmlelement+=this.instructorLabelLayout();
        	htmlelement+='<div class="clear"></div>';
        	var i=0;
        	var col2Count=0;
        	var col3Count=0;
        	for (i in this.studentEntries){
        		if(this.studentEntries[i].orientation==1){
        			htmlelement+='<div class="clear"></div>';
        		}
        		htmlelement+=this.studentEntries[i].studentLayout(graded);
        		if(this.studentEntries[i].orientation==1){
        			htmlelement+='<div class="clear"></div>';
        		}else if(this.studentEntries[i].orientation==2){
        			col2Count++;
        		}else{
        			col3Count++;
        		}
        		if((col2Count==2 && col3Count==0)|| (col2Count==1 && col3Count==1)||col3Count==3){
        			htmlelement+='<div class="clear"></div>';
        			col2Count=0;
        			col3Count=0;
        		}
        	}
        	htmlelement+='<div class="clear"></div>';
     		return htmlelement;
         },
         studentFillInTheBlankLayout:function(graded){
			  console.log("graded"+graded);
        	 var htmlelement="<div>";
        	 var cssColumnLayout="column-"+this.studentEntries[0].orientation;
        	 var displayStyle = "";
          	if(question.mode != MODE_DESIGN)
          	{
          		displayStyle= "display: inline-flex;";
          	}
         	htmlelement+=' <div class="colPageSection '+cssColumnLayout+'" style="'+displayStyle+'">';
         	htmlelement+=this.authorEntries[0].instructorLayout(this.studentEntries[0].orientation);
         	htmlelement+='<div class="fibDivider"></div>';
         	htmlelement+=this.authorEntries[1].instructorLayout(this.studentEntries[0].orientation);
         	htmlelement+='</div>';
         	htmlelement+='<div class="clear"></div>';
         	htmlelement+=this.studentEntries[0].studentLayout(graded);
         	htmlelement+='<div class="clear"></div>';
         	
         	htmlelement+='</div>';
      		return htmlelement;
          },
         /**
          * add event handers to html elements after the layout done in student test mode
          * @returns {String}
          */
         afterStudentLayout:function(){
        	var i=0;
           	for (i in this.studentEntries){
           	this.studentEntries[i].afterStudentLayout();
           	}
        	$('.stdQueLabel').each(function (){
    			$(this).find('font').css('line-height', $(this).find('font').css('font-size'));
            });
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
         postSubmissionReviewLayout:function(subType,acceptAnyAnswer,graded){
        	 var htmlelement="";
          	switch(subType){
          	case "label":
          		htmlelement+=this.instructorLabelLayout();
          		break;
          	case "inputField":
          		htmlelement+=this.postSubmissionInputFieldLayout(acceptAnyAnswer,subType,graded);
          		break;
          	case "fillInTheBlank":
          		htmlelement+=this.postSubmissionFillInTheBlankLayout(acceptAnyAnswer,subType,graded);
          		break;
          	}
          	
       		return htmlelement;
         },
         /**
          * layouts input field postSubmission review mode
          * @returns {String}
          */
         postSubmissionInputFieldLayout:function(acceptAnyAnswer,subType,graded){
        	var htmlelement="";
        	//TODO: write wrong css calculation
        	htmlelement+=this.instructorLabelLayout();
        	htmlelement+='<div class="clear"></div>';
        	var i=0;
        	var col2Count=0;
        	var col3Count=0;
        	for (i in this.studentEntries){
        		if(this.studentEntries[i].orientation==1){
        			htmlelement+='<div class="clear"></div>';
        		}
        		
        		htmlelement+=this.studentEntries[i].postSubmissionReviewLayout(acceptAnyAnswer,subType,graded);
        		if(this.studentEntries[i].orientation==1){
        			htmlelement+='<div class="clear"></div>';
        		}else if(this.studentEntries[i].orientation==2){
        			col2Count++;
        		}else{
        			col3Count++;
        		}
        		if((col2Count==2 && col3Count==0)|| (col2Count==1 && col3Count==1)||col3Count==3){
        			htmlelement+='<div class="clear"></div>';
        			col2Count=0;
        			col3Count=0;
        		}
        	}
        	htmlelement+='<div class="clear"></div>';
     		return htmlelement;
         },
         /**
          * layouts fill In the blank field postSubmission review mode
          * @returns {String}
          */
         postSubmissionFillInTheBlankLayout:function(acceptAnyAnswer,subType,graded){
        	 var htmlelement="<div>";
        	 var cssColumnLayout="column-"+this.studentEntries[0].orientation;
        	 var css = this.studentEntries[0].isCorrectAnswerGiven(acceptAnyAnswer)?"correct":"wrong";
        	 //TODO: write wrong css calculation
        	 var displayStyle = "";
          	if(question.mode != MODE_DESIGN)
          	{
          		displayStyle= "display: inline-flex;";
          	}
         	htmlelement+=' <div class="colPageSection '+cssColumnLayout+'" style="'+displayStyle+'">';
        	htmlelement +='<div class="answerTick '+css+'" ></div>';
         	htmlelement+=this.authorEntries[0].instructorLayout(this.studentEntries[0].orientation);
         	htmlelement+='<div class="fibDivider"></div>';
         	htmlelement+=this.authorEntries[1].instructorLayout(this.studentEntries[0].orientation);
         	htmlelement+='</div>';
         	htmlelement+='<div class="clear"></div>';
         	htmlelement+=this.studentEntries[0].postSubmissionReviewLayout(acceptAnyAnswer,subType,graded);
         	htmlelement+='<div class="clear"></div>';
         	
         	htmlelement+='</div>';
      		return htmlelement;
          },
         /**
      	 * calculate Correct Answers
      	 */
      	 calTotalCrctAnswersGivenByStudent:function(acceptAnyAnswer){
      		var count=0;
      			 var i=0;
      			 var correctFlag=false;
      			 for( i in this.studentEntries){
      				 if(this.studentEntries[i].isCorrectAnswerGiven(acceptAnyAnswer)){
      					 correctFlag=true;
      				 }else{
      					 correctFlag=false;
      				 }
      				 count +=(correctFlag)?1:0;
      			 }
      		return count;
      	}, 
      	 /**
      	 * calculate Correct Answers
      	 */
      	 calTotalWrngAnswersGivenByStudent:function(acceptAnyAnswer){
      		var count=0;
      			 var i=0;
      			 var correctFlag=false;
      			 for( i in this.studentEntries){
      				 if(this.studentEntries[i].isCorrectAnswerGiven(acceptAnyAnswer)){
      					 correctFlag=true;
      				 }else{
      					 correctFlag=false;
      				 }
      				 count +=(!correctFlag)?1:0;
      			 }
      		return count;
      	}, 
};