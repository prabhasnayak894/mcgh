/* ========================================================================
 * MultipleChoiceSubCategoryRange: Object Declaration
 * ========================================================================
 * Purpose of this object to have all range specific properties like min value 
 * editor, max value editor, range feedback editor
 * ======================================================================== */
var MultipleChoiceSubCategoryRange = function(options){ 
	this.id=null;
	this.idPrefix='SCF';
	this.componentId = null;
	this.componentIdPrefix=null;
	this.subCategoryId=null;
	this.subCategories=[];
	this.ranges=[];
	this.minPoint=0;
	this.maxPoint=0;
	$.extend(this, options);
	this._update = MultipleChoiceSubCategoryRange.BindAsEventListener( this, this.update );
	this._collapseRangedBasedFeedback = MultipleChoiceSubCategoryRange.BindAsEventListener( this, this.toggleRangedBasedFeedback);
	this._addRangeFeedback = MultipleChoiceSubCategoryRange.BindAsEventListener( this, this.addRangeFeedback);
	this._removeRangeFeedback = MultipleChoiceSubCategoryRange.BindAsEventListener( this, this.removeRangeFeedback);
	this._selectSubCategory= MultipleChoiceSubCategoryRange.BindAsEventListener( this, this.selectSubCategory );
};

//add event helper method
MultipleChoiceSubCategoryRange.addEvent = function(oTarget, sEventType, fnHandler,args) {
	$("#"+oTarget).unbind(sEventType);
	$("#"+oTarget).bind(sEventType,args,fnHandler);
};
//use call to borrow context
MultipleChoiceSubCategoryRange.BindAsEventListener = function(object, fun) {
    return function(event) {
    	event.stopImmediatePropagation();
        return fun.call(object, (event || window.event));
    };
};
MultipleChoiceSubCategoryRange.prototype = { 
		/**
		 * gets id of range
		 * @returns {Integer} id
		 */
		getId:function(){
			return this.id;
        },
        /**
         * sets id of range
         * @param id
         */
        setId:function(id){
       	 this.id=id;
        },
        /**
		 * gets componentId of range
		 * @returns {Integer} componentId
		 */
		getComponentId:function(){
			return this.componentId;
        },
        /**
         * sets componentId of range
         * @param componentId
         */
        setComponentId:function(componentId){
       	 this.componentId=componentId;
        },
        /**
		 * gets componentIdPrefix of range
		 * @returns {String} componentIdPrefix
		 */
		getComponentIdPrefix:function(){
			return this.componentIdPrefix;
        },
        /**
         * sets componentIdPrefix of range
         * @param componentIdPrefix
         */
        setComponentIdPrefix:function(componentIdPrefix){
       	 this.componentIdPrefix=componentIdPrefix;
        },
       
        /**
		 * gets subCategories of range
		 * @returns {Editor} subCategories
		 */
		getSubCategories:function(){
			return this.subCategories;
        },
        /**
         * sets subCategories of range
         * @param subCategories
         */
        setSubCategories:function(subCategories){
       	 this.subCategories=subCategories;
        },
        /**
         * gets ranges for multiplechoice component
         * @returns ranges
         */
         getRanges: function( ){
                 return this.ranges;  
         },
         /**
          * sets ranges for multiplechoice component
          * @param ranges
          */
         setRanges: function(ranges){
             this.ranges =  ranges;
         },
        /**
         * updates editor text
         */
        update: function(event){
        	try{
        		this.updateMinMaxPoint();
        	}catch(err){}
        	var j=0;
        	for( j in this.ranges){
    			this.ranges[j].update();
    		}
        },
        /**
         * populate drop Down options
         */
        setdropDownOptions:function(){
        	var optionsAsString = "",sectionSubcategory="";
        	var selectedCategories = this.getAvailableCategories();
        	for(var i = 0; i < this.subCategories.length; i++) {
        		if(this.subCategories[i].subCategory.trim().length>0){
        			var disabled = jQuery.inArray(this.subCategories[i].subCategoryId, selectedCategories )!= -1 ? 'disabled="disabled"' : "";
        			optionsAsString += '<option id="'+this.subCategories[i].subCategoryId+'" value="'+this.subCategories[i].subCategoryId+'" '+disabled+' ">'+this.subCategories[i].subCategory+'</option>';
        			sectionSubcategory += '<option id="'+this.subCategories[i].subCategoryId+'" value="'+this.subCategories[i].subCategoryId+'">'+this.subCategories[i].subCategory+'</option>';
        	    }
        	}
        	$("#feedbackCategories"+this.componentIdPrefix+this.componentId+this.idPrefix+this.id ).find('option')
            .remove()
            .end()
            .append(optionsAsString)
            .val(this.subCategoryId);
        	if(sectionSubcategory !== ""){
        		$(".subcategories_statement_"+this.componentIdPrefix+this.componentId).find('option:not(:first)')
        			.remove()
        			.end()
        			.append(sectionSubcategory);
        			//.val(this.subCategoryId);        		
        	}
        	for(i in question.activePage.components){
	       		if(question.activePage.components[i].id==this.componentId){
	       			var currentMultipleChoiceComponent = question.activePage.components[i];
	       			var j=0;
	       			for(j in currentMultipleChoiceComponent.subCategoryRanges){
	       				if(currentMultipleChoiceComponent.subCategoryRanges[j].subCategoryId!= null){
	       	        		var $object = currentMultipleChoiceComponent.subCategoryRanges[j];
	       					$.each($("#feedbackCategories"+$object.componentIdPrefix+$object.componentId+$object.idPrefix+$object.id ).find('option'),function(i,obj){
	       	        			var id = $(obj).attr("id");
	       	        			if($object.subCategoryId==parseInt(id)){
	       	        				$(obj).attr('disabled',false);
	       	        			}
	       	        		});
	       	        	}
	       			}
	       		}
        	}
        },
        
        setsectionSubCategories: function(){
        	var totalSubCategories = this.subCategories;
        	$('span.subCategoryName').each(function(){
        		var curElement = $(this);
        		var deletedSubCategory = true;
        		$.each(totalSubCategories, function (index, value){
        			if( curElement.attr('id').replace('subCategoryName_', '') == value.subCategoryId ) {
        				var categoryName = ( value.subCategory.length > 15 ) ? value.subCategory.substring( 0, 15 ) + '...' : value.subCategory;
        				curElement.text(categoryName);
        				deletedSubCategory = false;
        				return false;
        			} else {
        				deletedSubCategory = true;
        			}
        		});
        		if( deletedSubCategory ) {
        			curElement.text('No Category Assigned');
        		}
        	});
        },
        
        /**
         * adds range for multiplechoice component
         * @param range
         */
        addRange:function(range){
        	this.ranges.push(range);
        },
        /**
         * removes section for multiplechoice component
         * @param section
         */
        removeRange:function(range){
        	 var i=0;
        	 for(i in this.ranges){
	    			if(this.ranges[j].getId()==range.getId()){
	    				this.ranges.splice(i, 1);
	    			}
	    	 }
        },
        removeRangeForFrequency:function(range){
       	 var i=0;
       	 for(i in this.ranges){
	    			if(this.ranges[i].getId()==range.getId()){
	    				this.ranges.splice(i, 1);
	    			}
	    	 }
       },
        /**
         *  layout subcategory feedback
         * @param isFirst
         * @returns {String}
         */
        layout:function(isLast, feedbackScoringType){
        	 //range feedback
        	 var css = isLast?' style="display: block;"':' style="display: none;"';
        	var htmlelement='';
        	htmlelement+='<div id="rangeFeedback'+this.componentIdPrefix+this.componentId+this.idPrefix+this.id+'">';
         	htmlelement+= '	<div class="pageSectionBody range-feedback">'; 
         	htmlelement+= '		<div class="headSection">';
       		htmlelement+= '			<h6 class="pull-left font18 inputhead tophead">Subcategory feedback  </h6>';
       		htmlelement+= '			<h6 class=" font14 tagtext"><a id="rangeCollapse_'+this.componentIdPrefix+this.componentId+this.idPrefix+this.id+'">Collapse subcategory feedback</a></h6>';
       		htmlelement+= '			<div class="clear"></div>';
       		htmlelement+= '			<h6 class="pull-left font18 inputhead tophead">Scoring: '+feedbackScoringType+  ' </h6>';
       		htmlelement+= '		</div>';
       		htmlelement+='		<div class="clear"></div>';
       		htmlelement+='		<div id="rangeFeedback_'+this.componentIdPrefix+this.componentId+this.idPrefix+this.id+'">';
       		htmlelement+='			<div  style="float: left; margin-top: -17px;">';
       		htmlelement+='				<div class="addCategory">';
       		htmlelement+=' 					<div class="minusBtn" ><img src="img/minus.png" id="minus_'+this.componentIdPrefix+this.componentId+this.idPrefix+this.id+'" title="Delete Subcategory Feedback"></div>';
       		htmlelement+=' 					<div class="pull-right" '+css+'><a href="#"><img src="img/plus.png" id="plus_'+this.componentIdPrefix+this.componentId+this.idPrefix+this.id+'" title="Add Subcategory Feedback"></a></div>';
       		htmlelement+='				</div>';
       		htmlelement+=this.subCatDropDownLayout()+'<span class="rangeFeedbackVales"> Min. points: </span><span id="min_'+this.componentIdPrefix+this.componentId+this.idPrefix+this.id+'"> '+this.minPoint+' </span> <span class="rangeFeedbackVales"> Max. points: </span><span id="max_'+this.componentIdPrefix+this.componentId+this.idPrefix+this.id+'"> '+this.maxPoint+' </span></div>';
       		var showMinus=true;
	       	if(this.ranges.length==1){
	       		showMinus=false; 
	       	}
       		for( j in this.ranges){
          		 if(j==this.ranges.length-1){
          			 htmlelement+=  this.ranges[j].rangeBasedLayoutFeedback(true,j,showMinus);
          		 }
          		 else{
          			 htmlelement+=  this.ranges[j].rangeBasedLayoutFeedback(false,j,showMinus); 
          		 }
          	 }
       		htmlelement+= '</div></div></div>';
       	    htmlelement+='<div class="clear"></div>';
       	    return htmlelement;
        },
        /**
         *  layout sub-category feedback for frequency score type
         */
        frequencyLayout:function(isLast,markers,feedbackScoringType,binaryAnswer, choice1, choice2){
        	var css = isLast?' style="display: block;"':' style="display: none;"';
        	var htmlelement='';
        	htmlelement+='<div id="rangeFeedback'+this.componentIdPrefix+this.componentId+this.idPrefix+this.id+'">';
        	htmlelement+= '<div class="pageSectionBody range-feedback">'; 
        	htmlelement+= '<div class="headSection">';
        	htmlelement+= '<h6 class="pull-left font18 inputhead tophead">Subcategory feedback  </h6>';
        	htmlelement+= '<h6 class="pull-left font14 tagtext" style="left: 45%;position: absolute;"><a id="rangeCollapse_'+this.componentIdPrefix+this.componentId+this.idPrefix+this.id+'">Collapse subcategory feedback</a></h6>';
        	htmlelement+='<div class="clear"></div>';
        	htmlelement+= '<h6 class="pull-left font18 inputhead tophead">Scoring: '+feedbackScoringType+  ' </h6>';
        	htmlelement+= '</div>';
        	htmlelement+='<div class="clear"></div>';
        	htmlelement+='<div id="rangeFeedback_'+this.componentIdPrefix+this.componentId+this.idPrefix+this.id+'">';
        	htmlelement+='<div  style="float: left; margin-top: -17px;">';
        	htmlelement+='<div class="addCategory">';
        	htmlelement+=' 		<div class="minusBtn" ><img src="img/minus.png" id="minus_'+this.componentIdPrefix+this.componentId+this.idPrefix+this.id+'" title="Delete Subcategory Feedback"></div>';
        	htmlelement+=' <div class="pull-right" '+css+'><a href="#"><img src="img/plus.png" id="plus_'+this.componentIdPrefix+this.componentId+this.idPrefix+this.id+'" title="Add Subcategory Feedback"></a></div>';
        	htmlelement+='</div>';
        	htmlelement+=this.subCatDropDownLayout();
        	htmlelement+='</div>';      		
        	var j=0;
        	for( j in this.ranges){
            	if(!binaryAnswer){
        		  try{
        			htmlelement+=  this.ranges[j].rangeBasedLayoutFrequencyFeedback(false,j,false,[],markers);
        		  }catch(err){}
            	}
        	}
        	
        	if(binaryAnswer){
        	  var choiceVals = [choice1, choice2];
        	  for(var c=0; c<2; c++){
  			    htmlelement+=  this.ranges[c].rangeBasedSubCategoriesBinaryLayoutFrequencyFeedback(choiceVals[c], c);
        	  }
        	}
        	htmlelement+= '</div></div></div>';
        	htmlelement+='<div class="clear"></div>';
        	return htmlelement;
       },
        
        subCatDropDownLayout :function(){
		    var htmlelement = "";
		    var value = this.subCategoryId != null ? this.subCategoryId : 0;
			htmlelement += '<select name="subCategories" style="width: 80px" id="feedbackCategories'+this.componentIdPrefix+this.componentId+this.idPrefix+this.id+'">';
			$.each(this.subCategories,function(index, subCategory) {
				if ($("<div>" + subCategory + "</div>")
						.text().length > 0) {
					htmlelement += ' <option  id="'
							+ subCategory.subCategoryId + '"value="'
							+ subCategory.subCategoryId + '">'
							+ subCategory.subCategory + '</option>';
				}
			});
			htmlelement += '</select>';
			return htmlelement;
        },
        /**
	      * adds event handlers for html  elements after the layout done in design mode
	      */
        afterLayout:function(){
     	   MultipleChoiceSubCategoryRange.addEvent( "plus_"+this.componentIdPrefix+this.componentId+this.idPrefix+this.id, "click", this._addRangeFeedback );
     	   MultipleChoiceSubCategoryRange.addEvent( "minus_"+this.componentIdPrefix+this.componentId+this.idPrefix+this.id, "click", this._removeRangeFeedback );
     	   MultipleChoiceSubCategoryRange.addEvent( "rangeCollapse_"+this.componentIdPrefix+this.componentId+this.idPrefix+this.id, "click", this._collapseRangedBasedFeedback );
     	   MultipleChoiceSubCategoryRange.addEvent("feedbackCategories"+this.componentIdPrefix+this.componentId+this.idPrefix+this.id,"change", this._selectSubCategory);
     	   $.each(this.ranges ,function(index,range){
				range.afterLayout();	
     	   });
     	   this.setdropDownOptions();
     	   this.setsectionSubCategories();
     	  $("#feedbackCategories"+this.componentIdPrefix+this.componentId+this.idPrefix+this.id).val(this.subCategoryId);
        },
        /**
         * select subCategory
         */
        selectSubCategory:function(){
        	var value = $("#feedbackCategories"+this.componentIdPrefix+this.componentId+this.idPrefix+this.id+" option:selected").val();
        	this.subCategoryId= parseInt(value);
        	this.updateMinMaxPoint();
        	this.subCategoryDropDownUpdate();
        	this.updateSubCategoryRangeFeedbacks(this.subCategoryId);
        },
        /**
         * toggle hide/show feedback
         */
        toggleRangedBasedFeedback : function(){
       	 var $divObj = $("#rangeFeedback_"+this.componentIdPrefix+this.componentId+this.idPrefix+this.id);
       	 if($divObj.is(":visible")){
       		 $("#rangeCollapse_"+this.componentIdPrefix+this.componentId+this.idPrefix+this.id).html("Expand subcategory feedback");
       		 $divObj.hide("slow");
       	 }else{
       		 $("#rangeCollapse_"+this.componentIdPrefix+this.componentId+this.idPrefix+this.id).html("Collapse subcategory feedback");
       		 $divObj.show("slow");
       	 }
        },
    	 /**
    		 * adds new range for component
    		 */
    	 addRangeFeedback:function(){
    	     var i=0;
	       	  for(i in question.activePage.components){
	       		if(question.activePage.components[i].id==this.componentId){
	       			if(question.activePage.components[i].subCategoryRanges.length<question.activePage.components[i].subCategories.length){
	       				var newId = question.activePage.components[i].subCategoryRanges[question.activePage.components[i].subCategoryRanges.length-1].getId()+1;
	    	       		var subCatRangeConfig = {
	    						id : newId,
	    						componentId : this.componentId,
	    						componentIdPrefix : this.componentIdPrefix,
	    						subCategories:this.subCategories
	    					};
	    				var subCategoryRange = new MultipleChoiceSubCategoryRange(subCatRangeConfig);
	    				var range=new Array();
	    				var rangeConfig = {
	    						componentId : this.componentId,
	    						componentIdPrefix :  this.componentIdPrefix+this.componentId+subCategoryRange.idPrefix,
	    						parent:{type:'subCategoryFeedback',id:subCategoryRange.id},
	    						allowNegative:true
	    					};
	    				var maxCounter = 0;
	    				if(question.activePage.components[i].feedbackScoringType==="frequency"){
	    					for(key in question.activePage.components[i].sections){  
		    		       	  if(maxCounter < question.activePage.components[i].sections[key].options.length){
		    		       	   	maxCounter = question.activePage.components[i].sections[key].options.length; 
		    		       	  }
		    		       }
	    				}else{
	    				   maxCounter = 3;
	    				}	    				
	    				
	    				for (var cnt=1;cnt<=maxCounter;cnt++){
	    					rangeConfig.id=cnt;
	    					range.push(new Range(rangeConfig));	
	    				}
	    				subCategoryRange.setRanges(range);
	    				question.activePage.components[i].subCategoryRanges.push(subCategoryRange);
	    				question.activePage.doLayout();
	       			    question.activePage.components[i].populateComp();
	       			    this.subCategoryDropDownUpdate();
	       			}else{
	       				new Modal({
	       					id : 1,
	       					headingText : "Validation Error",
		     			    containtText : "Number of sub-category feedback should be less or equal to number of subcategories"
	       				}).getWarningModal();
	       			}
	       		
	       		}
	       	 } 
	       	  return false;
    	 },
    	 /**
    	  * removes current range from component
    	  */
    	 removeRangeFeedback:function(){
	    	 var i=0;
	       	  for(i in question.activePage.components){
	       			if(question.activePage.components[i].id==this.componentId){
	       				var j=0;
	       				for(j in question.activePage.components[i].subCategoryRanges){
	       					if(question.activePage.components[i].subCategoryRanges[j].id==this.id){
	       						question.activePage.components[i].subCategoryRanges.splice(parseInt(j),1);
	       						question.activePage.doLayout();
	       						question.activePage.components[i].populateComp();
	       						if(question.activePage.components[i].subCategoryRanges.length==1){
	       							$("#minus_"+this.componentIdPrefix+this.componentId+this.idPrefix+question.activePage.components[i].subCategoryRanges[0].id).hide();
	       						}
	       						this.subCategoryDropDownUpdate();
	       						break;
	       					}
	       				}
	       			}
	       	  }
    	 },
	     /*
		     * calculate and update min max points for multiplechoice feedback
		     */
	updateMinMaxPoint:function(){
		var i = 0;
		var currentComponent = null;
		var subCat = null;
		for (i in question.activePage.components) {
			if (question.activePage.components[i].id == this.componentId) {
				currentComponent = question.activePage.components[i];
			}
		}
		for( index in currentComponent.subCategories){      
			if(currentComponent.subCategories[index].id == this.subCategoryId){
				subCat = currentComponent.subCategories[index];
				//currentComponent.subCategories[index].minPoint = chkminPoint;
				//currentComponent.subCategories[index].maxPoint = chkmaxPoint;
			}
		}
		if(currentComponent.feedbackType == 'rangedBasedSubcategories') {
    		var minPoint=0;
    		var maxPoint=0;
    		var i=0;        
    		var subCategoryId =""+this.subCategoryId;
    		for( i in currentComponent.sections){
    			var points=[];
    			var j=0;
    			
				if (subCategoryId == currentComponent.sections[i].subCategoryId) {
	        		for( j in currentComponent.sections[i].options){
	        			var k=0;
	        			var optionPoints=[];
	            		for( k in currentComponent.sections[i].options[j].answers){
	            			var pointsVal = currentComponent.sections[i].options[j].answers[k].pointsValueEditor.text!=""?parseFloat(currentComponent.sections[i].options[j].answers[k].pointsValueEditor.text):0;
	            				optionPoints.push(pointsVal);
	            	    }
	            		if(!currentComponent.binaryAnswer ){
	            			if(optionPoints.length>0){	            				
	            				points.push(optionPoints[0]);
	            			}	            			
	            		}
	        	    }
	        		
				}
				if(points.length>0){
        			points=points.sort(function (a, b) {
        				   return a > b ? 1 : a < b ? -1 : 0;
        			}); 
            		minPoint+=points[0];
            		maxPoint+=points[points.length-1];
        		}
    		}
    		subCat.minPoint = minPoint;
    		subCat.maxPoint = maxPoint;
    		if(currentComponent.feedbackScoringType === 'average'){
    			if(!currentComponent.binaryAnswer){
    				
		       		var counter = 0;
		       		for(key in currentComponent.sections){ 
		       			if(subCategoryId == currentComponent.sections[key].subCategoryId){
		       				counter++;
		       			}
		       	    }
		       		
		       		if(counter !=0 ){
		       			minPoint = minPoint / counter; 
	        			maxPoint = maxPoint / counter;
		       		}    
		       		
		       	}        			
				
    		}
    		var multiplier = Math.pow(10, 2);
			minPoint = Math.round(minPoint * multiplier) / multiplier;
			maxPoint = Math.round(maxPoint * multiplier) / multiplier;
			
			
    		if(currentComponent.binaryAnswer){
    			var i=0;        
        		var subCategoryId =""+this.subCategoryId;
        		var chkminPoint = 0, chkmaxPoint = 0;
        		var matchOptionCounter = 0;
        		for( i in currentComponent.sections){        			
        			var j=0;
        			for( j in currentComponent.sections[i].options){        				
        				if(currentComponent.sections[i].options[j].subCategoryId == subCategoryId){
        					var binaryOptpnts=[];
	        				for( k in currentComponent.sections[i].options[j].answers){
		            			var pointsVal = currentComponent.sections[i].options[j].answers[k].pointsValueEditor.text!=""?parseFloat(currentComponent.sections[i].options[j].answers[k].pointsValueEditor.text):0;
		            			binaryOptpnts.push(pointsVal);
		            	    }  
	        				if(binaryOptpnts.length>0){
	        					binaryOptpnts=binaryOptpnts.sort(function (a, b) {
	                				   return a > b ? 1 : a < b ? -1 : 0;
	                   			}); 
	        					chkminPoint+=binaryOptpnts[0];
	        					chkmaxPoint+=binaryOptpnts[binaryOptpnts.length-1];
	            			}
	        				matchOptionCounter++;
            			}
    	        	}   				
        		}
    			
        		//minPoint = chkminPoint;
        		//maxPoint = chkmaxPoint;
    			subCat.minPoint = chkminPoint;
        		subCat.maxPoint = chkmaxPoint;
        		if(currentComponent.feedbackScoringType === 'average'){
        			if(matchOptionCounter>0){
        				chkminPoint = chkminPoint/matchOptionCounter;
        				chkmaxPoint = chkmaxPoint/matchOptionCounter;
        			}
        		}
        		
        		var multiplier = Math.pow(10, 2);
				chkminPoint = Math.round(chkminPoint * multiplier) / multiplier;
				chkmaxPoint = Math.round(chkmaxPoint * multiplier) / multiplier;
				
        		minPoint = chkminPoint;
        		maxPoint = chkmaxPoint;
    			
    		}
    		
    		this.minPoint=minPoint;
    		this.maxPoint=maxPoint;
    		
    		$("#min_"+this.componentIdPrefix+this.componentId+this.idPrefix+this.id).text(this.minPoint);
    		$("#max_"+this.componentIdPrefix+this.componentId+this.idPrefix+this.id).text(this.maxPoint);
    		
    	}
		
	},
	subCategoryDropDownUpdate : function(){
		var availableCategories = new Array();
		 for(i in question.activePage.components){
	       		if(question.activePage.components[i].id==this.componentId){
	       			var currentMultipleChoiceComponent = question.activePage.components[i];
	       			availableCategories = this.getAvailableCategories();
	       			for(var i=0;i<currentMultipleChoiceComponent.subCategoryRanges.length;i++){
	       				var currentRange=currentMultipleChoiceComponent.subCategoryRanges[i];
	       				if(currentRange.id != this.id){
	       				    var selectedValue = currentRange.subCategoryId;
	       				    var $newCatDropdrown =  $("#feedbackCategories"+currentRange.componentIdPrefix+currentRange.componentId+currentRange.idPrefix+currentRange.id ).find("option");
	       				     $.each($newCatDropdrown,function(i,obj){
	       				    	$(obj).attr('disabled',false);
	       				    	var id = $(obj).attr("id");
	       				    	if(jQuery.inArray(parseInt(id), availableCategories )!= -1 && parseInt(id) != selectedValue){
	       				    		$(obj).attr('disabled',true);
	       				    	}
	       				     });
	       				}
	       			}
	       		}
		 }
		},
		/**
		 * Method to get selected categories array
		 * **/
		getAvailableCategories : function(){
			var selectedCategories = new Array();
			 for(i in question.activePage.components){
		       		if(question.activePage.components[i].id==this.componentId){
		       			var currentMultipleChoiceComponent = question.activePage.components[i];
		       			$.each(currentMultipleChoiceComponent.subCategoryRanges,function(i,obj){
		       				if(obj.subCategoryId != null){
		       					selectedCategories.push(obj.subCategoryId);
		       				}
		       			});
		       		}
			 	}
			 return selectedCategories;
		},
		/**
         * layouts in instructor mode
         * @returns {String}
         */
        instructorLayout:function(feedbackScoringType, binaryAnswer){
	   		var htmlelement = '';
	   		var currSubCategoryId = this.subCategoryId;
	   		var curSubCategoryName = '';
	   		$.each(this.subCategories, function( index, subCategoryVal ){
	   			if( subCategoryVal.subCategoryId == currSubCategoryId ){
	   				curSubCategoryName = '<div action="#" class="feedbackTxt"><b>'+subCategoryVal.subCategory+'</b> </div>';
	   			}
	   		});
        	
	   		if(feedbackScoringType === "frequency"){
	   			var x=0;
	   			var markers = [];
	   			
	   			var pointsVal = [];
	   			var i=0;
	    		for (i in question.activePage.components) {
	    			if (question.activePage.components[i].id == this.componentId) {
	    				markers = question.activePage.components[i].sections[0].markers;
	    				pointsVal[0] = question.activePage.components[i].choiceOptionVal1;
	    				pointsVal[1] = question.activePage.components[i].choiceOptionVal2;
	    			}
	    		}
	   			
		   		for(x in this.ranges){
		   			htmlelement +=this.ranges[x].instructorFrequencyFeedbackLayout(x,markers,binaryAnswer,pointsVal);
		   		}	   			
	   		}else{
	   			var x=0;
		   		for(x in this.ranges){		   			
		   			htmlelement +=this.ranges[x].instructorLayout();
		   		}
	   		}        	
	   		
	   		if( htmlelement != '' ){
	   			return curSubCategoryName + htmlelement;
	   		} else {
	   			return '';
	   		}
        },
        layoutForFrequency : function (isLast){
       		var css = isLast?' style="display: block;"':' style="display: none;"';
        	var htmlelement='';
        	htmlelement+='<div id="rangeFeedback'+this.componentIdPrefix+this.componentId+this.idPrefix+this.id+'">';
         	htmlelement+= '<div class="pageSectionBody range-feedback">'; 
         	htmlelement+= '<div class="headSection">';
       		htmlelement+= '</div>';
       		htmlelement+='<div class="clear"></div>';
       		htmlelement+='<div id="rangeFeedback_'+this.componentIdPrefix+this.componentId+this.idPrefix+this.id+'">';
       		htmlelement+='<div  style="float: left; margin-top: -17px;">';
       		htmlelement+='<div class="addCategory">';
       		htmlelement+=' 		<div class="minusBtn" ><img src="img/minus.png" id="minus_'+this.componentIdPrefix+this.componentId+this.idPrefix+this.id+'" title="Delete Subcategory Feedback"></div>';
       		htmlelement+=' <div class="pull-right" '+css+'><a href="#"><img src="img/plus.png" id="plus_'+this.componentIdPrefix+this.componentId+this.idPrefix+this.id+'" title="Add Subcategory Feedback"></a></div>';
       		htmlelement+='</div>';
       		htmlelement+=this.subCatDropDownLayout();//+'<span id="min_'+this.componentIdPrefix+this.componentId+this.idPrefix+this.id+'"> '+this.minPoint+' </span> <span id="max_'+this.componentIdPrefix+this.componentId+this.idPrefix+this.id+'"> '+this.maxPoint+' </span></div>';
       		htmlelement+='</div>';
       		var showMinus=true;
	       	if(this.ranges.length==1){
	       		showMinus=false; 
	       	}       		
       		htmlelement+= '</div></div></div>';
       	    htmlelement+='<div class="clear"></div>';
       	    return htmlelement;
        },
    	/*
    	 * update sub category range feedbacks, on selected category in section dropdown
    	 * when feedbackScoringType = frequency
    	 * */
    	updateSubCategoryRangeFeedbacks : function(subCatId){
    		var i=0;
    		for (i in question.activePage.components) {
    				if (question.activePage.components[i].id == this.componentId) {
    					$.each(question.activePage.components[i].subCategoryRanges ,function(index,subCategoryRange){
    							
    					 if(question.activePage.components[i].feedbackScoringType ==="frequency"){
    						if(subCategoryRange.subCategoryId == subCatId){
    							var obj = [];
    							 try{
    				                  obj = question.activePage.components[i].sections.filter(function(e){
    				                     return e.subCategoryId == subCatId;
    				                  });
    				              
    				                  
    				              }catch(err){
    				                 obj = [];
    				              }
    				              
    				              if(obj.length > 0){
    				            	  	
    				            	  var range=new Array();
    				            	  var rangeConfig = {
    				    						componentId : this.componentId,
    				    						componentIdPrefix :  this.componentIdPrefix+this.componentId+subCategoryRange.idPrefix,
    				    						parent:{type:'subCategoryFeedback',id:subCategoryRange.id},
    				    						allowNegative:true
    				    					};
    				            	  var maxCounter = 0;
    				    			 	   for(key in obj){  
    					    		       	  if(maxCounter < obj[key].options.length){
    					    		       	   	maxCounter = obj[key].options.length; 
    					    		       	  }
    					    		       }
    				    					    			  
    				    				   for (var x=1;x<=maxCounter;x++){
    					    					rangeConfig.id=x;
    					    					range.push(new Range(rangeConfig));	
    					    				}
    				    				   subCategoryRange.setRanges(range);
    					    			   subCategoryRange.update();
    				    		     
    				              }
    						}
    					 }
    					});
    				}
    		  }
    		 question.activePage.doLayout();
    	}
	};  