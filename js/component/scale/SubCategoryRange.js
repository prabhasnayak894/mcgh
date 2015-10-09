/* ========================================================================
 * SubCategoryRange: Object Declaration
 * @author: Debasmita Sahoo
 * ========================================================================
 * Purpose of this object to have all range specific properties like min value 
 * editor, max value editor, range feedback editor
 * ======================================================================== */
var SubCategoryRange = function(options){ 
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
	this._update = SubCategoryRange.BindAsEventListener( this, this.update );
	this._collapseRangedBasedFeedback = ScaleSubCategory.BindAsEventListener( this, this.toggleRangedBasedFeedback);
	this._addRangeFeedback = ScaleSubCategory.BindAsEventListener( this, this.addRangeFeedback);
	this._removeRangeFeedback = ScaleSubCategory.BindAsEventListener( this, this.removeRangeFeedback);
	this._selectSubCategory= Statement.BindAsEventListener( this, this.selectSubCategory );
};

//add event helper method
SubCategoryRange.addEvent = function(oTarget, sEventType, fnHandler,args) {
	$("#"+oTarget).unbind(sEventType);
	$("#"+oTarget).bind(sEventType,args,fnHandler);
};
//use call to borrow context
SubCategoryRange.BindAsEventListener = function(object, fun) {
    return function(event) {
    	event.stopImmediatePropagation();
        return fun.call(object, (event || window.event));
    };
};
SubCategoryRange.prototype = { 
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
         * gets ranges for scale component
         * @returns ranges
         */
         getRanges: function( ){
                 return this.ranges;  
         },
         /**
          * sets ranges for scale component
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
        	var optionsAsString = "",statementSubcategory="";
        	var selectedCategories = this.getAvailableCategories();
        	for(var i = 0; i < this.subCategories.length; i++) {
        		if(this.subCategories[i].subCategory.trim().length>0){
        			var disabled = jQuery.inArray(this.subCategories[i].subCategoryId, selectedCategories )!= -1 ? 'disabled="disabled"' : "";
        			optionsAsString += '<option id="'+this.subCategories[i].subCategoryId+'" value="'+this.subCategories[i].subCategoryId+'" '+disabled+' ">'+this.subCategories[i].subCategory+'</option>';
        			statementSubcategory += '<option id="'+this.subCategories[i].subCategoryId+'" value="'+this.subCategories[i].subCategoryId+'">'+this.subCategories[i].subCategory+'</option>';
        	    }
        	}
        	$("#feedbackCategories"+this.componentIdPrefix+this.componentId+this.idPrefix+this.id ).find('option')
            .remove()
            .end()
            .append(optionsAsString)
            .val(this.subCategoryId);
        	if(statementSubcategory !== ""){
        		$(".subcategories_statement_"+this.componentIdPrefix+this.componentId).find('option:not(:first)')
        			.remove()
        			.end()
        			.append(statementSubcategory);
        			//.val(this.subCategoryId);        		
        	}
        	for(i in question.activePage.components){
	       		if(question.activePage.components[i].id==this.componentId){
	       			var currentScaleComponent = question.activePage.components[i];
	       			var j=0;
	       			for(j in currentScaleComponent.subCategoryRanges){
	       				if(currentScaleComponent.subCategoryRanges[j].subCategoryId!= null){
	       	        		var $object = currentScaleComponent.subCategoryRanges[j];
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
        
        setStatementSubCategories: function(){
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
         * adds range for scale component
         * @param range
         */
        addRange:function(range){
        	this.ranges.push(range);
        },
        /**
         * removes statement for scale component
         * @param statement
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
        layout:function(isLast){
        	 //range feedback
        	 var css = isLast?' style="display: block;"':' style="display: none;"';
        	var htmlelement='';
        	htmlelement+='<div id="rangeFeedback'+this.componentIdPrefix+this.componentId+this.idPrefix+this.id+'">';
         	htmlelement+= '<div class="pageSectionBody range-feedback">'; 
         	htmlelement+= '<div class="headSection">';
       		htmlelement+= '<h6 class="pull-left font18 inputhead tophead">Subcategory feedback  </h6>';
       		htmlelement+= '<h6 class="pull-left font14 tagtext" style="position:absolute; left:45%"><a id="rangeCollapse_'+this.componentIdPrefix+this.componentId+this.idPrefix+this.id+'">Collapse subcategory feedback</a></h6>';
       		htmlelement+= '<div class="clear"></div>';
       		htmlelement+= '<h6 class="clear pull-left font18 inputhead tophead">Scoring: '+ question.getActiveScaleType() +  ' </h6>';
       		htmlelement+= '</div>';
       		htmlelement+='<div class="clear"></div>';
       		htmlelement+='<div id="rangeFeedback_'+this.componentIdPrefix+this.componentId+this.idPrefix+this.id+'">';
       		htmlelement+='<div  style="float: left; margin-top: -17px;">';
       		htmlelement+='<div class="addCategory">';
       		htmlelement+=' 		<div class="minusBtn" ><img src="img/minus.png" id="minus_'+this.componentIdPrefix+this.componentId+this.idPrefix+this.id+'" title="Delete Subcategory Feedback"></div>';
       		htmlelement+=' <div class="pull-right" '+css+'><a href="#"><img src="img/plus.png" id="plus_'+this.componentIdPrefix+this.componentId+this.idPrefix+this.id+'" title="Add Subcategory Feedback"></a></div>';
       		htmlelement+='</div>';
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
        frequencyLayout:function(isLast,criterias,markers){
        	var css = isLast?' style="display: block;"':' style="display: none;"';
        	var htmlelement='';
        	htmlelement+='<div id="rangeFeedback'+this.componentIdPrefix+this.componentId+this.idPrefix+this.id+'">';
        	htmlelement+= '<div class="pageSectionBody range-feedback">'; 
        	htmlelement+= '<div class="headSection">';
        	htmlelement+= '<h6 class="pull-left font18 inputhead tophead">Subcategory feedback  </h6>';
        	htmlelement+= '<h6 class="pull-left font14 tagtext" style="left: 45%;position: absolute;"><a id="rangeCollapse_'+this.componentIdPrefix+this.componentId+this.idPrefix+this.id+'">Collapse subcategory feedback</a></h6>';
        	htmlelement+='<div class="clear"></div>';
        	htmlelement+= '<h6 class="pull-left font18 inputhead tophead">Scoring: '+ question.getActiveScaleType() +  ' </h6>';
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
        	
        	/*modify ranges count according to criterias count*/
        	if(this.ranges.length < criterias.length){
        		/*get currentComponent*/
        		var currentComp=null;
        		var z=0;
        		for(z in question.activePage.components){
        			if(question.activePage.components[z].id == this.componentId){
        				currentComp=question.activePage.components[z];
        			}
        		}
        		if(currentComp!=null){
        			var count = criterias.length - this.ranges.length;
        			var x=1;
        			for(x;x<=count;x++){
            			var rangeConfig = {
            				componentId : currentComp.id,
            				componentIdPrefix :  currentComp.pageIdPrefix+currentComp.pageId+currentComp.idPrefix+currentComp.id+this.idPrefix,
            				parent:{type:'subCategoryFeedback',id:this.id},
            				allowNegative:true
            			};
            			
            			rangeConfig.id=this.ranges.length+x;
            			this.ranges.push(new Range(rangeConfig));	
            		}
        		}
        		
        	}
        	
        	var j=0;
        	for( j in this.ranges){
        		try{
        			htmlelement+=  this.ranges[j].rangeBasedLayoutFrequencyFeedback(false,j,false,criterias,markers);
        		}catch(err){}
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
     	   SubCategoryRange.addEvent( "plus_"+this.componentIdPrefix+this.componentId+this.idPrefix+this.id, "click", this._addRangeFeedback );
     	   SubCategoryRange.addEvent( "minus_"+this.componentIdPrefix+this.componentId+this.idPrefix+this.id, "click", this._removeRangeFeedback );
     	   SubCategoryRange.addEvent( "rangeCollapse_"+this.componentIdPrefix+this.componentId+this.idPrefix+this.id, "click", this._collapseRangedBasedFeedback );
     	   SubCategoryRange.addEvent("feedbackCategories"+this.componentIdPrefix+this.componentId+this.idPrefix+this.id,"change", this._selectSubCategory);
     	   $.each(this.ranges ,function(index,range){
				range.afterLayout();	
     	   });
     	   this.setdropDownOptions();
     	   this.setStatementSubCategories();
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
	    				var subCategoryRange = new SubCategoryRange(subCatRangeConfig);
	    				var range=new Array();
	    				var rangeConfig = {
	    						componentId : this.componentId,
	    						componentIdPrefix :  this.componentIdPrefix+this.componentId+subCategoryRange.idPrefix,
	    						parent:{type:'subCategoryFeedback',id:subCategoryRange.id},
	    						allowNegative:true
	    					};
	    				var rangesLength = 3;
	    				if(question.activePage.components[i].feedbackScoringType==="frequency"){
	    					rangesLength = question.activePage.components[i].criterias.length;
	    				}
	    				for (var cnt=1;cnt<=rangesLength;cnt++){
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
		     * calculate and update min max points for scale feedback
		     */
	updateMinMaxPoint:function(){
		var i = 0;
		for (i in question.activePage.components) {
			if (question.activePage.components[i].id == this.componentId) {
				var minCriteriaPoint = 0;
				var maxCriteriaPoint = 0;
				var criteriaPoints = [];
				var j = 0;
				for (j in question.activePage.components[i].criterias) {
					if (question.activePage.components[i].criterias[j].pointEditor.text != '') {
						criteriaPoints
								.push(parseFloat(question.activePage.components[i].criterias[j].pointEditor.text));
					}
				}
				criteriaPoints = criteriaPoints.sort(function(a, b) {
					return a > b ? 1 : a < b ? -1 : 0;
				});
				minCriteriaPoint = criteriaPoints[0];
				maxCriteriaPoint = criteriaPoints[criteriaPoints.length - 1];
				var k = 0;
				var minPoint = 0;
				var maxPoint = 0;
				for (k in question.activePage.components[i].statements) {
					var subCategoryId =""+this.subCategoryId;
					if (jQuery
							.inArray(
									subCategoryId,
									question.activePage.components[i].statements[k].subCategoryIds)!=-1) {
						if(parseFloat(question.activePage.components[i].statements[k].weightEditor.text)<0)
						{
							minPoint += maxCriteriaPoint
							* parseFloat(question.activePage.components[i].statements[k].weightEditor.text);
							maxPoint += minCriteriaPoint
							* parseFloat(question.activePage.components[i].statements[k].weightEditor.text);
						}
						else
						{						
							minPoint += minCriteriaPoint
									* parseFloat(question.activePage.components[i].statements[k].weightEditor.text);
							maxPoint += maxCriteriaPoint
									* parseFloat(question.activePage.components[i].statements[k].weightEditor.text);
						}
					}
				}
				var noOfStatements = 0;
				try{
					var subCatId = this.subCategoryId;
		   		   	var subCat = question.activePage.components[i].subCategories.filter(function(e){
        	        	  	return e.id == subCatId;
        	        });
 	            }catch(err){
 	            	subCat = {};
 	            }
     	        try{
					noOfStatements = subCat[0].statementIds.length;					
				}catch(err){
					noOfStatements = question.activePage.components[i].statements.length;
				}
				this.minPoint = minPoint<=maxPoint?minPoint:maxPoint;
				this.maxPoint = maxPoint>=minPoint?maxPoint:minPoint;
				this.minPoint = !isNaN(this.minPoint) ? this.minPoint : 0;
				this.maxPoint = !isNaN(this.maxPoint) ? this.maxPoint : 0;
				
				
				
				
				if(question.activePage.components[i].feedbackScoringType === "average"){
					this.minPoint = this.minPoint / noOfStatements; 
					this.maxPoint = this.maxPoint / noOfStatements;
					
				}
				
					var multiplier = Math.pow(10, 2);
					this.minPoint = Math.round(this.minPoint * multiplier) / multiplier;
					this.maxPoint = Math.round(this.maxPoint * multiplier) / multiplier;
					if(isNaN(this.minPoint) || isNaN(this.minPoint)){
						this.minPoint = 0;
						this.maxPoint = 0;
					}
				
				$("#min_" + this.componentIdPrefix+this.componentId+this.idPrefix+this.id).text(this.minPoint);
				$("#max_" + this.componentIdPrefix+this.componentId+this.idPrefix+this.id).text(this.maxPoint);
			}
		}
	},
	subCategoryDropDownUpdate : function(){
		var availableCategories = new Array();
		 for(i in question.activePage.components){
	       		if(question.activePage.components[i].id==this.componentId){
	       			var currentScaleComponent = question.activePage.components[i];
	       			availableCategories = this.getAvailableCategories();
	       			for(var i=0;i<currentScaleComponent.subCategoryRanges.length;i++){
	       				var currentRange=currentScaleComponent.subCategoryRanges[i];
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
		       			var currentScaleComponent = question.activePage.components[i];
		       			$.each(currentScaleComponent.subCategoryRanges,function(i,obj){
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
        instructorLayout:function(){
	   		var htmlelement = '';
	   		var currSubCategoryId = this.subCategoryId;
	   		var curSubCategoryName = '';
	   		$.each(this.subCategories, function( index, subCategoryVal ){
	   			if( subCategoryVal.subCategoryId == currSubCategoryId ){
	   				curSubCategoryName = '<div action="#" class="feedbackTxt"><b>'+subCategoryVal.subCategory+'</b> </div>';
	   			}
	   		});
        	
        	var x=0;
	   		for(x in this.ranges){
	   			htmlelement +=this.ranges[x].instructorLayout();
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
        }
	};  