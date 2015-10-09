/* ========================================================================

 * Range: Object Declaration
 * ========================================================================
 * Purpose of this object to have all range specific properties like min value 
 * editor, max value editor, range feedback editor
 * ======================================================================== */
var BranchRange = function(options){ 
	this.id=null;
	this.pathMapId = null;
	this.idPrefix='R';
	this.minRangePrefix ='L';
	this.maxRangePrefix ='H';
	this.feedbackPrefix='F';
	this.componentId = null;
	this.componentIdPrefix=null;
	this.parent={type:'branch'};
	this.allowNegative=false;
	this.idCriteriaFreq = null;
	$.extend(this, options);
	this.minRangeEditor = new NumericEditor({id:this.componentIdPrefix+this.componentId+this.idPrefix+this.minRangePrefix+this.pathMapId+this.id,allowNegative:true,text:""});
	this.maxRangeEditor = new NumericEditor({id:this.componentIdPrefix+this.componentId+this.idPrefix+this.maxRangePrefix+this.pathMapId+this.id,allowNegative:true,text:""});
	this._addRange=BranchRange.BindAsEventListener( this, this.addRange );	
	this._removeRange=BranchRange.BindAsEventListener( this, this.removeRange );
	this._validateMinMaxRangeLimits  = BranchRange.BindAsEventListener( this, this.validateMinMaxRangeLimits );
	this._filter = BranchRange.BindAsEventListener( this, this.filter );

};

//add event helper method
BranchRange.addEvent = function(oTarget, sEventType, fnHandler,args) {
	$("#"+oTarget).unbind(sEventType);
	$("#"+oTarget).bind(sEventType,args,fnHandler);
};
//use call to borrow context
BranchRange.BindAsEventListener = function(object, fun) {
    return function(event) {
    	event.stopImmediatePropagation();
        return fun.call(object, (event || window.event));
    };
};
BranchRange.prototype = { 
		/**
		 * gets id of BranchRange
		 * @returns {Integer} id
		 */
		getId:function(){
			return this.id;
        },
        /**
         * sets id of BranchRange
         * @param id
         */
        setId:function(id){
       	 this.id=id;
        },
        /**
		 * gets componentId of BranchRange
		 * @returns {Integer} componentId
		 */
		getComponentId:function(){
			return this.componentId;
        },
        /**
         * sets componentId of BranchRange
         * @param componentId
         */
        setComponentId:function(componentId){
       	 this.componentId=componentId;
        },
        /**
		 * gets componentIdPrefix of BranchRange
		 * @returns {String} componentIdPrefix
		 */
		getComponentIdPrefix:function(){
			return this.componentIdPrefix;
        },
        /**
         * sets componentIdPrefix of BranchRange
         * @param componentIdPrefix
         */
        setComponentIdPrefix:function(componentIdPrefix){
       	 this.componentIdPrefix=componentIdPrefix;
        },
        /**
		 * gets minRangeEditor of range
		 * @returns {Editor} minRangeEditor
		 */
		getMinRangeEditor:function(){
			return this.minRangeEditor;
        },
        /**
         * sets minRangeEditor of BranchRange
         * @param minRangeEditor
         */
        setMinRangeEditor:function(minRangeEditor){
       	 this.minRangeEditor=minRangeEditor;
        },
  
        /**
		 * gets maxRangeEditor of BranchRange
		 * @returns {Editor} maxRangeEditor
		 */
		getMaxRangeEditor:function(){
			return this.maxRangeEditor;
        },
        /**
         * sets maxRangeEditor of BranchRange
         * @param maxRangeEditor
         */
        setMaxRangeEditor:function(maxRangeEditor){
       	 this.maxRangeEditor=maxRangeEditor;
        },
        /**
         * updates editor text
         */
        update: function(event){
        	this.minRangeEditor.updateVal();
          	this.maxRangeEditor.updateVal(); 		 
        },
       
        rangeBasedLayout:function(isLast,index,showMinus){
        	 var htmlelement="";
        
        	 htmlelement+='<div class="rangeEditor">';
        	 htmlelement+='   <div class="tag-row">';

        	 htmlelement+='       <div class="colPageSectionBranch">';

        	 htmlelement+='           <div class="form-group ptsRangeValue ptsRange">';

        	 htmlelement+=this.minRangeEditor.layout();
        	 htmlelement+='            </div>';
        	 htmlelement+='          <div style="margin-left:5px;" class="form-group ptsRangeValue ptsRange">';

        	 htmlelement+=this.maxRangeEditor.layout();
        	 htmlelement+='           </div>';
        	 htmlelement+='      </div>';
        	
        	 htmlelement+='   </div>';
        	 htmlelement+='   <div class="feedbackSection  invisible">';
        	 htmlelement+='      <div class="eachCol-2">';
        	 htmlelement+='          <a>';
        	 htmlelement+='              <img src="img/getPicture.png">';
        	 htmlelement+='           </a>';
        	 htmlelement+='      </div>';
        	 htmlelement+='      <div>';
        	 htmlelement+='      </div>';
        	 htmlelement+='  </div>';
         	
        	 htmlelement+='</div>';
        	
        	return htmlelement;
        },
        
       
        /**
	      * adds event handlers for html  elements after the layout done in design mode
	      */
        afterLayout:function(){
        	
        	BranchRange.addEvent(this.minRangeEditor.id, "blur", this._validateMinMaxRangeLimits,{editor:'min'} );
        	BranchRange.addEvent(this.maxRangeEditor.id, "blur", this._validateMinMaxRangeLimits,{editor:'max'} );
        	BranchRange.addEvent( this.minRangeEditor.id, "paste", this._filter );
        	BranchRange.addEvent( this.maxRangeEditor.id, "paste", this._filter );
   	        this.minRangeEditor.afterNumericEditorlayout();
   	        this.maxRangeEditor.afterNumericEditorlayout();
        },
	     /**
	      * validate BranchRange
	      */
	     validateRange:function(event){
	    	 var branch = null;
    		 if(this.parent.type=='branch'){
    			 var brId = this.componentId;
    			 try{
    		   		 branch = question.branches.filter(function(e){
    	        	  		return e.id == brId;
    	        	  	});
	             }catch(err){
	            	 branch = null;
	             }
	             if(branch.length != 0 && branch != null){
	            	 branch = branch[0];
	             }else{
	            	 if(question.tempBranch.id == brId){
		             	branch = question.tempBranch;
		             }
	             }
 	    	 }
	    	 var validMinMaxRange =this.validateMinMaxRange();
	    	 if(validMinMaxRange.status){
	    		 var validRange=this.validateRangeInput();
	    		 if(validRange.status){
		    		 var validObj;
		    		 if(arguments[0] == "tableCellRange"){
		    			 validObj = this.isValidTblCellRange(); 
		    		 }else{
		    			 validObj =(branch.criteria=="multi")?this.isValidRangeMultiCriteria():this.isValidRange();
		    		 }
		          	  if(!validObj.status){
		          		validMinMaxRange.status=validObj.status;
		          		validMinMaxRange.field =validObj.field;
		          		validMinMaxRange.message = validObj.message;
		      	       	
		          	  }
		     		}else{
		     			validMinMaxRange.status=validRange.status;
		          		validMinMaxRange.field =validRange.field;
		          		validMinMaxRange.message = "The minimum value cannot exceed or equal the maximum value.";
		     		}  
	    	 }
	    	 else{
	    		 validMinMaxRange.status=validMinMaxRange.status;
	          	 validMinMaxRange.field =validMinMaxRange.field;
	          	 validMinMaxRange.message = "Please enter a value inside the range of the minimum and maximum points.";
	    	 }
	    	
	    	 return validMinMaxRange;
	     },
	     /**
    	  * validate range:toDo
    	  */
	     validateRangeInput:function(){
	    	 var minRange = this.minRangeEditor.text;
	    	 var maxRange = this.maxRangeEditor.text;
	    	 var isValid={status:true};
	    	 if(minRange!="" && maxRange!=""){
	    		 if(parseFloat(minRange)>parseFloat(maxRange)){
	    			 isValid.status=false;
	    			 isValid.field=this.minRangeEditor.id;
	    		 }
	    	 }
	       	return isValid;
	     },
	     validateMinMaxRange:function(){
	    	 var isValid={ status:true};
	       	return isValid;
	     },
	     isValidRangeMultiCriteria : function(){
	    	 var ranges =[];
    		 var branch = null;
    		 if(this.parent.type=='branch'){
    			 var brId = this.componentId;
    			 try{
    		   		 branch = question.branches.filter(function(e){
    	        	  		return e.id == brId;
    	        	  	});
	             }catch(err){
	            	 branch = null;
	             }
	             if(branch.length != 0 && branch != null){
	            	 branch = branch[0];
	             }else{
	            	 if(question.tempBranch.id == brId){
		             		branch = question.tempBranch;
		             }
	             }
 	    	 }
    		 var isValid={status:true};
    		 for(var index in branch.pathMaps){
    			 if(this.pathMapId == branch.pathMaps[index].id){
    				 ranges = branch.pathMaps[index].range;
    			 }
    	    	 var currentRange =this;
    	    	 if(ranges!=null){
    	    		var j=0;
    	     	    for(j in ranges){
    	     	       	  var pathRange=ranges[j];
    	     	       		//for(j in pathRange){
    		    			 if(pathRange.id !=currentRange.id && isValid){
    			    			 var minRange=pathRange.minRangeEditor.text;
    			    			 var maxRange=pathRange.maxRangeEditor.text;
    			    			 if(minRange!="" && maxRange!=""){
    			    				 
    			    				 if(currentRange.minRangeEditor.text!=''){
    			    					 var minRangeVal=parseFloat(currentRange.minRangeEditor.text);
    				    				 if(minRangeVal>=parseFloat(minRange) && minRangeVal<= parseFloat(maxRange)){
    			 							isValid.status=false;
    			 							isValid.field=currentRange.minRangeEditor.id;
    			 							isValid.message="Your ranges overlapped. Please enter a valid range.";
    			 							break;
    				    				 }
    			    				 }else if(currentRange.maxRangeEditor.text!=''){
    			    					 var maxRangeVal=parseFloat(currentRange.maxRangeEditor.text);
    				    				 if(maxRangeVal>=parseFloat(minRange) && maxRangeVal<= parseFloat(maxRange)){
    				    					 isValid.status=false;
    				 						 isValid.field=currentRange.maxRangeEditor.id;
    				 						 isValid.message="Your ranges overlapped. Please enter a valid range.";
    				 						break;
    				    				 }	
    			    				 }
    			    				 
    			    			 } else {
    			    				 if(minRange==''){
    			    					 isValid.field=pathRange.id;
    			    				 }else if(maxRange==''){
    			    					 isValid.field=pathRange.id;
    			    				 }else{
    			    					 isValid.field=pathRange.id;
    			    				 }		    				
    			    				 
    			    				 
    			    				 var x=0;
    			    				 var isPartPresent=false;
    			    				 
    			    				 var pathMaps=[];
    			    				 var compFeedbackScoringType=null;
    			    				 /*check for branch array presence*/
    			    				 if(branch[0]==undefined){
    			    				   pathMaps= branch.pathMaps; 
    			    				   compFeedbackScoringType=branch.activePageComp[0].feedbackScoringType;
    			    				 }else{
    			    				   if(branch.length != 0 && branch != null){		    		            	
    					    			pathMaps= branch[0].pathMaps;
    					    			compFeedbackScoringType=branch[0].activePageComp[0].feedbackScoringType;
    					    	       }
    			    				 }		    				 
    			    				 
    			    				 for(x in pathMaps){ 
    			    					 if(pathMaps[x].range.id == pathRange.id){
    			    						 var kk=0;
    			    						 for(kk in pathMaps[x].paths){
    			    							 var prtId = pathMaps[x].paths[kk].partId;
    			    							 /*check for part presence*/
    			    							 if(prtId!=null){
    			    								 isPartPresent=true; 
    			    								 break;
    			    							 }
    			    						 }
    			    					 }
    			    				 }
    			    				 
    			    				 if(compFeedbackScoringType!="frequency"){/*validate only for sum/avg - score ranges*/
    			    				   /*set flag false only if part is selected for empty ranges*/
    			    				   if(isPartPresent && (minRange=="" || maxRange=="")){
    			    					 isValid.status=false; 
    			    					 isValid.message="Ranges cannot be left empty";
    			    				   }
    			    				 }
    			    			 }
    		    			 }
    	     	       		//}
    		   		  	}
    	    		}
  	         }
    		
    		return isValid;	
	     },
	     /**
    	  * check if input range falls in already existing rangelimit
    	  */
    	isValidRange:function(){
    		 var ranges =[];
    		 var branch = null;
    		 if(this.parent.type=='branch'){
    			 var brId = this.componentId;
    			 try{
    		   		 branch = question.branches.filter(function(e){
    	        	  		return e.id == brId;
    	        	  	});
	             }catch(err){
	            	 branch = null;
	             }
	             if(branch.length != 0 && branch != null){
	            	
	            	 for(var index in branch[0].pathMaps){
		            	 ranges.push(branch[0].pathMaps[index].range);
		             }
	             }
	             else{
	            	 if(question.tempBranch.id == brId){
		             		branch = question.tempBranch;
		             }
	            	 for(var index in branch.pathMaps){
		            	 ranges.push(branch.pathMaps[index].range);
		             }
	             }
 	    	 }
  	       
    		var isValid={status:true};
    		var currentRange =this;
    		if(ranges!=null){
    			 var j=0;
     	       	  for(j in ranges){
     	       		  
     	       	  var pathRange=ranges[j];
     	       		for(j in pathRange){
	    			 if(pathRange[j].id !=currentRange.id && isValid){
		    			 var minRange=pathRange[j].minRangeEditor.text;
		    			 var maxRange=pathRange[j].maxRangeEditor.text;
		    			 if(minRange!="" && maxRange!=""){
		    				 
		    				 if(currentRange.minRangeEditor.text!=''){
		    					 var minRangeVal=parseFloat(currentRange.minRangeEditor.text);
			    				 if(minRangeVal>=parseFloat(minRange) && minRangeVal<= parseFloat(maxRange)){
		 							isValid.status=false;
		 							isValid.field=currentRange.minRangeEditor.id;
		 							isValid.message="Your ranges overlapped. Please enter a valid range.";
		 							break;
			    				 }
		    				 }else if(currentRange.maxRangeEditor.text!=''){
		    					 var maxRangeVal=parseFloat(currentRange.maxRangeEditor.text);
			    				 if(maxRangeVal>=parseFloat(minRange) && maxRangeVal<= parseFloat(maxRange)){
			    					 isValid.status=false;
			 						 isValid.field=currentRange.maxRangeEditor.id;
			 						 isValid.message="Your ranges overlapped. Please enter a valid range.";
			 						break;
			    				 }	
		    				 }
		    				 
		    			 } else {
		    				 if(minRange==''){
		    					 isValid.field=pathRange[j].id;
		    				 }else if(maxRange==''){
		    					 isValid.field=pathRange[j].id;
		    				 }else{
		    					 isValid.field=pathRange[j].id;
		    				 }		    				
		    				 
		    				 
		    				 var x=0;
		    				 var isPartPresent=false;
		    				 
		    				 var pathMaps=[];
		    				 var compFeedbackScoringType=null;
		    				 /*check for branch array presence*/
		    				 if(branch[0]==undefined){
		    				   pathMaps= branch.pathMaps; 
		    				   compFeedbackScoringType=branch.activePageComp[0].feedbackScoringType;
		    				 }else{
		    				   if(branch.length != 0 && branch != null){		    		            	
				    			pathMaps= branch[0].pathMaps;
				    			compFeedbackScoringType=branch[0].activePageComp[0].feedbackScoringType;
				    	       }
		    				 }		    				 
		    				 
		    				 for(x in pathMaps){ 
		    					 if(pathMaps[x].range.id == pathRange[j].id){
		    						 var kk=0;
		    						 for(kk in pathMaps[x].paths){
		    							 var prtId = pathMaps[x].paths[kk].partId;
		    							 /*check for part presence*/
		    							 if(prtId!=null){
		    								 isPartPresent=true; 
		    								 break;
		    							 }
		    						 }
		    					 }
		    				 }
		    				 
		    				 if(compFeedbackScoringType!="frequency"){/*validate only for sum/avg - score ranges*/
		    				   /*set flag false only if part is selected for empty ranges*/
		    				   if(isPartPresent && (minRange=="" || maxRange=="")){
		    					 isValid.status=false; 
		    					 isValid.message="Ranges cannot be left empty";
		    				   }
		    				 }
		    			 }
	    			 }
     	       		}
	   		  	}
    		}
    		return isValid;	
			
    	},
    	isValidTblCellRange : function(){
    		var isValid={status:true};
    		var ranges =null;
   		 	var a=0,
            tablecomp;
 	      var cellId = this.componentIdPrefix + this.componentId;
          for(a=0; a<question.pages.length; a++){
              var i=0;
              for(i=0; i<question.pages[a].components.length; i++){
            	var comp = question.pages[a].components[i];
            	var compIdPrefix = comp.pageIdPrefix + comp.pageId + comp.idPrefix + comp.id;
            	var rangeComponentIdPrefix = this.componentIdPrefix + (this.componentId).match(/(\d+|\D+)/g)[0];
                if(question.pages[a].components[i].type == "table" && rangeComponentIdPrefix == compIdPrefix){
                    tablecomp = question.pages[a].components[i];

                  var currentCellComponent = tablecomp.getItemValById(tablecomp.cellComponentCollection, cellId, "component");
                  ranges= currentCellComponent.ranges;
                  
                  var currentRange =this;

                  if(ranges!=null){
                     var j=0;
                      for(j in ranges){
                       if(ranges[j].id !=currentRange.id && isValid){
                         var minRange=ranges[j].minRangeEditor.text;
                         var maxRange=ranges[j].maxRangeEditor.text;
                         if(minRange!="" && maxRange!=""){
                           
                           if(currentRange.minRangeEditor.text!=''){
                             var minRangeVal=parseFloat(currentRange.minRangeEditor.text);
                             if(minRangeVal>=parseFloat(minRange) && minRangeVal<= parseFloat(maxRange)){
                            isValid.status=false;
                            isValid.field=currentRange.minRangeEditor.id;
                            break;
                             }  
                           }else if(currentRange.maxRangeEditor.text!=''){
                             var maxRangeVal=parseFloat(currentRange.maxRangeEditor.text);
                             if(maxRangeVal>=parseFloat(minRange) && maxRangeVal<= parseFloat(maxRange)){
                               isValid.status=false;
                             isValid.field=currentRange.maxRangeEditor.id;
                            break;
                             }  
                           }
                         }else {
		    				 if(minRange==''){
		    					 isValid.field=ranges[j].id;
		    				 }else if(maxRange==''){
		    					 isValid.field=ranges[j].id;
		    				 }else{
		    					 isValid.field=ranges[j].id;
		    				 }		    				
		    				 
		    				 var x=0;
		    				 var isPartPresent=false;
		    				 
		    				 var pathMaps=[];
		    				 var compFeedbackScoringType=null;
		    				 /*check for branch array presence*/
		    				 if(branch[0]==undefined){
		    				   pathMaps= branch.pathMaps; 
		    				   compFeedbackScoringType=branch.activePageComp[0].feedbackScoringType;
		    				 }else{
		    				   if(branch.length != 0 && branch != null){		    		            	
				    			pathMaps= branch[0].pathMaps;
				    			compFeedbackScoringType=branch[0].activePageComp[0].feedbackScoringType;
				    	       }
		    				 }		    				 
		    				 
		    				 for(x in pathMaps){ 
		    					 if(pathMaps[x].range.id == this.id){
		    						 var kk=0;
		    						 for(kk in pathMaps[x].paths){
		    							 var prtId = pathMaps[x].paths[kk].partId;
		    							 /*check for part presence*/
		    							 if(prtId!=null){
		    								 isPartPresent=true; 
		    								 break;
		    							 }
		    						 }
		    					 }
		    				 }
		    				 
		    				 if(compFeedbackScoringType!="frequency"){/*validate only for sum/avg - score ranges*/
		    				   /*set flag false only if part is selected for empty ranges*/
		    				   if(isPartPresent && (minRange=="" || maxRange=="")){
		    					 isValid.status=false; 
		    					 isValid.message="Ranges cannot be left empty";
		    				   }
		    				 }
		    				 
	 						 break;
		    			 }
                       }
                      
                    }
                  }
                }
              }
            }
            return isValid;	
    	},
    	filter:function(event){
    		util.removePasteImage(event.originalEvent.clipboardData,event);
    	},
     	 /**
         * layouts in instructor mode
         * @returns {String}
         */
        instructorLayout:function(){
        	if( this.minRangeEditor.text != '' && this.maxRangeEditor.text != '') {
        		var htmlelement='';
               	htmlelement += '<div class="parent_div">';
               	htmlelement += '	<div class="child_div">' + this.minRangeEditor.text + ' - ' + this.maxRangeEditor.text + 'pts.</div>';

                var rangFeedback = util.getImageLayout(this.rangeFeedbackEditor.text);
                    rangFeedback = util.getVideoLayout(rangFeedback);
                
                /* to prepend <b>FEEDBACK:</b> in rangFeedback for alignments */
                var rangFeedbackDOMObj = $('<div class="dumpHtml"></div>');   /*dump div created*/                  
                rangFeedbackDOMObj.html(rangFeedback);
                /* check for div[align]*/
                var isAlignDiv = rangFeedbackDOMObj.find("div[align]:first");
                if(isAlignDiv.length > 0){
                	isAlignDiv.prepend("<b>FEEDBACK:</b> ");
                	isAlignDiv.addClass("autoWidth");
                }else{
                	rangFeedbackDOMObj.prepend("<b>FEEDBACK:</b> ");
                }                
                rangFeedback = rangFeedbackDOMObj.html();	  /*update rangFeedback*/
                
                htmlelement += '	<div> ' + rangFeedback + '</div>';
               	htmlelement += '</div>';
           		return htmlelement;
        	} else {
        		return '';
        	}
        },
        validateMinMaxRangeLimits : function(e){
        	if(this.parent.type=='branch'){
        		var brId = this.componentId;
	   			try{
	   		   		 branch = question.branches.filter(function(e){
	   		   			 return e.id == brId;
	   	        	 });
	   		   		 
	            }catch(err){
	            	 branch = null;
	            }
	            if(branch != null && branch.length > 0){
	            	 branch = branch[0];
	            	 
	            }else{
	            	 if(question.tempBranch.id == brId){
	            		 branch = question.tempBranch;
		             } 
	            }
	    	}
        	
  
        	 this.minRangeEditor.updateVal();
           	 this.maxRangeEditor.updateVal(); 	
           	 var pathMapId = this.pathMapId;
           	 if(this.minRangeEditor != null){
           		 if(this.minRangeEditor.text == "" || this.maxRangeEditor.text == ""){
            		 if(branch.criteria == "multi"){
            			 $('#paths_'+pathMapId).find('#rangePaths_'+this.id).find("select").prop('disabled','disabled');
            			 $('#paths_'+pathMapId).find('#rangePaths_'+this.id).find("select").val("0").trigger('change');
            		 }else{
            			 $('#paths_'+this.id).find("select").prop('disabled','disabled');
                		 $('#paths_'+this.id).find("select").val("0").trigger('change');
            		 }
            	 }
            	 else{
            		 if(branch.criteria == "multi"){
            			 $('#paths_'+pathMapId).find('#rangePaths_'+this.id).find("select").removeAttr('disabled');
            			 
            		 }else{
            			 $('#paths_'+this.id).find("select").removeAttr('disabled');
            		 }
            	 }
           	 }
        
        	  
        }
	};  