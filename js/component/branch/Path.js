var Path = function(options){
	this.pathMapId = null;		
	this.id = null;
	this.partId = null;
	this.compId = null;
	this.branchId = null;
	this.sectionId = null;
	this.conditionId = null;
	this.secConditionId = null; //in case of Input - Input there are 2 conditions related to path
	this.rangeId = null;
	this.idPrefix = "P";
	$.extend(this,options);
	this._updateComponentList = Path.BindAsEventListener(this,this.updateComponentList);
	this._updateSectionList = Path.BindAsEventListener(this,this.updateSectionList);
	this._addOptionPath = Path.BindAsEventListener(this,this.addOptionPath);
	this._updateSectionSelection = Path.BindAsEventListener(this,this.updateSectionSelection);
	this._removePath = PathMap.BindAsEventListener(this,this.removePath);
};
var currentPathValidationElement='';/* to avoid stacking of path elements - causing previous validated element text clearing */
Path.addEvent = function(oTarget, sEventType, fnHandler,args) {
$("#"+oTarget).unbind(sEventType);
$("#"+oTarget).bind(sEventType,args,fnHandler);
};
//add event helper method by class name
Path.addEventByClassName = function(oTarget, sEventType, fnHandler,args) {
	$("."+oTarget).unbind(sEventType);
	$("."+oTarget).bind(sEventType,args,fnHandler);
};

//use call to borrow context
Path.BindAsEventListener = function(object, fun) {
    return function(event) {
	    if(event.target.nodeName=='div'||event.target.nodeName=='DIV') {    
	    	event.stopImmediatePropagation();
	    }
        return fun.call(object, (event || window.event));
    };
};

Path.prototype = {
	/** Get and set the current id of componet for which we are creating brancgin **/

	/** create and set new path id for created Path **/
	getId: function(){
		return this.id;
	},
	setId: function(pathid){
		this.id = pathid;
	},
	/** create and set new path id for created Path **/
	getConditionId: function(){
		return this.conditionId;
	},
	setConditionId: function(conditionId){
		this.conditionId = conditionId;
	},
	/* Function to create  Path Layout for author in design mode. */
	layout: function(mappingIndicator,disabled,showMinus){
		
		var html = "";
		html +=	'			<div class="col-sm-2  no-bottom-border">';
		html +=	'				<select '+disabled+' id="selectPart_'+this.pathMapId+'_'+this.id+'" class="form-control modalSelect selectPart">';
		html +=	'		  			<option value="0">No Path</option>';
		for(var i in question.pages){
			html +=	'	<option  id="" value="'+question.pages[i].id+'">'+question.pages[i].name+'</option>';
		}
		html +=	'				</select>';
		html +=	'			</div>';
	
		html +=	'			<div class="col-sm-2 smallFont no-bottom-border">';
		html +=	'				<select '+disabled+' class="form-control modalSelect selectComponent" id="selectComponent_'+this.pathMapId+'_'+this.id+'" class="form-control modalSelect">';
		html +=	'				  <option value="0">No Path</option>';
		html +=	'				</select>';
		html +=	'			</div>';
		html +=	'			<div class="col-sm-3 smallFont no-bottom-border">';
		html +=	'				<select '+disabled+' class="form-control modalSelect selectSection" id="selectSection_'+this.pathMapId+'_'+this.id+'" class="form-control modalSelect">';
		html +=	'				  <option value="0">No Path</option>';
		html +=	'				</select>';
		html +=	'			</div>';
		if(this.id > 1){
			html+='       <div class="minusBtn">';
			html+='                <a title="Delete Path">';
			html+='                   <img id="minus_'+this.pathMapId+'_'+this.id+'" src="img/minus.png">';
			html+='               </a>';
			html+='          </div>';
		}
		html +=	'			<div class="clear"></div>';
		return html;

	},


	afterLayout : function(){
		
		Path.addEvent( "selectPart_"+this.pathMapId+"_"+this.id, "change", this._updateComponentList);
		Path.addEvent( "selectComponent_"+this.pathMapId+"_"+this.id, "change", this._updateSectionList);
		Path.addEvent( "selectSection_"+this.pathMapId+"_"+this.id, "change", this._updateSectionSelection);
		Path.addEvent( "minus_"+this.pathMapId+"_"+this.id, "click", this._removePath);
		this.populateComp();
	},
	populateComp : function(){
		if (this.partId != null){
			$("#selectPart_"+this.pathMapId+"_"+this.id).val(this.partId);
			$("#selectPart_"+this.pathMapId+"_"+this.id).trigger("change");
		}		
			
		if (this.compId != null){
			$("#selectComponent_"+this.pathMapId+"_"+this.id).val(this.compId);
			$("#selectComponent_"+this.pathMapId+"_"+this.id).trigger("change");
		}		
		if (this.sectionId != null){
			$("#selectSection_"+this.pathMapId+"_"+this.id).val(this.sectionId);
		}
	},
	updateComponentList : function(e){
		var currentTarget = e.currentTarget;
		currentPathValidationElement=currentTarget; /*hold current targeted element for validation popus*/
		var elemId = e.currentTarget.id.split('_'); 
		var optionId = elemId[1];
		var pathId = elemId[2];
		var partId = $("#"+e.currentTarget.id+" option:selected").val();
		var html = "";
		
		if(partId == 0){
			html += "<option value='0'>No Path</option>";
			$('#selectComponent_'+optionId+"_"+pathId).html(html);
			$('#selectSection_'+optionId+"_"+pathId).html(html);
			this.partId = null;
			this.compId = null;
			this.sectionId = null;			
		}
		else{			
			var selectedBranchingCompId = $('#selectComponent option:selected').text();
			if(typeof selectedBranchingCompId != "undefined" && selectedBranchingCompId !=""){
				selectedBranchingCompId = selectedBranchingCompId.match(/\S+/g).pop();
			}
			for(var i in question.pages){
				if(question.pages[i].id == partId){
					if(question.pages[i].isBranchDest && this.partId != partId
						&& this.branchId != question.pages[i].destBranchId){
						new Modal({
    	                	id : 1,headingText : "Validation Error",
    	                  	containtText : "already mapped path",
    	                  	closeActionEvent:function(){
    	                		$(currentPathValidationElement).trigger("focus");
    	                		$(currentPathValidationElement).val(0);
    	                  	}
    	              	}).getWarningModal();
						return false;
					} else {
						if(this.partId!=partId){
						       /*reset component and section id*/
						       this.compId = null;
						       this.sectionId = null;
						}
						this.partId = partId;
						html += "<option value='0'>No Path</option>";
						for( j in question.pages[i].components){
							var comp = question.pages[i].components[j];
							var compId = comp.pageIdPrefix
										+ comp.pageId
										+ comp.idPrefix + comp.id;
							/*skip current selected branching id */
							html +=	'<option value="'+comp.id+'">ID# '+compId+'</option>';
				    	}
				    	$('#selectComponent_'+optionId+"_"+pathId).html(html);
				    	$('#selectSection_'+optionId+"_"+pathId).html("<option value='0'>No Path</option>");
					}
				}
			}	
		}
	},
	updateSectionList : function(e){
	
		var currentTarget = e.currentTarget;
		currentPathValidationElement=currentTarget; /*hold current targeted element for validation popus*/
		var elemId = e.currentTarget.id.split('_'); 
		var optionId = elemId[1];
		var pathId = elemId[2];
		var partId = $("#selectPart_"+optionId+"_"+pathId+" option:selected").val();
		var selectedComp = $("#"+e.currentTarget.id+" option:selected").val();
		var html = "";
		if(selectedComp == 0){
			html += "<option value='0'>No Path</option>";
			$('#selectSection_'+optionId+"_"+pathId).html(html);
			this.sectionId = null;
			this.compId = null;
		}
		else{
			var selectedBranchingCompId = $("#selectComponent option:selected").val();
			if(selectedBranchingCompId != undefined){
				selectedBranchingCompId = selectedBranchingCompId.replace('_','G');
			}
			/*skip current selected branching id */
			for(var p in question.pages){
				if(question.pages[p].id == partId){
					for( j in question.pages[p].components){
						//console.log(" question.pages[i]"+ question.pages.length+"i:"+p);
						var comp = question.pages[p].components[j];
						var compId = comp.pageIdPrefix + comp.pageId + comp.idPrefix + comp.id;
						
						if(comp.id == selectedComp && this.partId == comp.pageId){
							if (comp.isBranchDest && this.compId != selectedComp 
								&& this.branchId != comp.destBranchId) {
								
								new Modal({
		        	                id : 1,headingText : "Validation Error",
		        	                containtText : "already mapped path",
		        	                closeActionEvent:function(){
		        	            		$(currentPathValidationElement).trigger("focus");
		        	                	$(currentPathValidationElement).val(0);
		        	                }
		        	            }).getWarningModal();
		        	            return false;
							} else {
								var isCycle = this.checkCycle(compId, this.branchId); 
								if(isCycle){
									new Modal({
			        	                id : 1,headingText : "Validation Error",
			        	                containtText : "Path you are trying to create is generating cycle",
			        	                closeActionEvent:function(){
			        	                	$(currentPathValidationElement).trigger("focus");
			        	                	$(currentPathValidationElement).val(0);
			        	                }
			        	            }).getWarningModal();
			        	            return false;
								}
								else{
									this.compId = selectedComp;
									var k = 0;
									html += "<option value='0'>No Path</option>";
										if(comp.sections != undefined && comp.sections.length > 1){
											for(k in comp.sections){
												var generatedSectionId = compId+comp.sections[k].idPrefix+comp.sections[k].id;
												html +=	'<option type="Section" value="'+comp.sections[k].id+'">ID# '+generatedSectionId+'</option>';
											}
										}
										if(comp.feedbackType=="rangedBasedSubcategories" || comp.scaleType=="M"){
											var i=0;
											for(i in comp.subCategories){
												var subCatIdPrefix=(comp.type=="checkbox")?comp.subCategories[i].subCategoryIdPrefix:comp.subCategories[i].subCategoryIdPrefix;
												var generatedSubCateId = comp.subCategories[i].editor.text;//compId+subCatIdPrefix+comp.subCategories[i].id;
												var subVal="s_"+comp.subCategories[i].id
												html +=	'<option type="SubCat" id="'+comp.subCategories[i].id+'" value="'+subVal+'">ID# '+generatedSubCateId+'</option>';
							   	    	 }
										
										}
										else{
											var compIdSelect = 'P'+partId+'C'+selectedComp+'G1';
												if(compIdSelect == selectedBranchingCompId){
													new Modal({
										                id : 1,headingText : "Validation Error",
										                containtText : "Can not branch to itself",
										                closeActionEvent:function(){
										                	$(currentPathValidationElement).trigger("focus");
										                	$(currentPathValidationElement).val(0);
										                }
										            }).getWarningModal();
										            return false;
												}
												//this.sectionId = null;
											
								
										}

									$('#selectSection_'+optionId+"_"+pathId).html(html);
								}
							}
					    }
			    	}
				}
			}
		}
	},
	checkCycle : function(selectedDest, brId){
		var isCycle=false;
		//get current branch
		try{
	   		 branch = question.branches.filter(function(e){
       	  		return e.id == brId;
       	  	});
	    }catch(err){
	   	 branch = null;
	    }
	   if(branch != null && branch.length != 0){
		   branch = branch[0];
	   } else{
			if(question.tempBranch.id == brId){
				branch = question.tempBranch;
		    }
	   }
	   if(branch != null){
	   		var index1 = 0;
		   for(index1 in question.pages){
		   		var index2 = 0;
			    for(index2 in question.pages[index1].components){
				   var comp = question.pages[index1].components[index2];
				   var cmpId = comp.pageIdPrefix + comp.pageId+ comp.idPrefix + comp.id;
				   var sectionToCompare=null;
				   if(cmpId == branch.cId){
					   sectionToCompare= branch.sectionId;
				   }
				   if(cmpId == branch.cId_2){
					   sectionToCompare= branch.sectionId_2;
				   }
				   
				   if(cmpId == branch.cId || cmpId == branch.cId_2){
					   //if src is section
					   if(comp.sections !=undefined && ((branch.sectionId != null && branch.sectionId != 0) || (branch.sectionId_2 != null && branch.sectionId_2 != 0))  && comp.sections.length > 1){
			    			 for( j in comp.sections){
			    				 if(sectionToCompare== comp.sections[j].id){
			    					 var sectionId = cmpId + comp.sections[j].idPrefix + comp.sections[j].id;
			    					 //if src component is used as destination in some other branch
		    						 if(sectionId == selectedDest){
		    							 isCycle = true;
		    							 break;
		    						 }
		    						 else{
		    							 if(comp.sections[j].destBranchId != null){
		    								 if(comp.sections[j].isBranchDest){
		    									 isCycle = this.checkCycle(selectedDest, comp.sections[j].destBranchId);
		    								 }
		    								 else{
		    									 isCycle = false;
				    							 break;
		    								 }
		    							 }
		    						 }
		    					 }
			    			 }
			      	   }
					   else{
					   	//if src is component
						//if src component is used as destination in some other branch
						  	if(cmpId == selectedDest){
							  isCycle = true;
							  break;
							}
						 	else{
						 		if(comp.isBranchDest){
						 			isCycle = this.checkCycle(selectedDest, comp.destBranchId);
						 		}
						 		else{
									isCycle = false;
    								break;
								}
						 	}
					  	}
				    }
			   }
		   }
       }
	   return isCycle;
	},
	updateSectionSelection : function(e){
		console.log("update section");
		var currentTarget = e.currentTarget;
		currentPathValidationElement=currentTarget; /*hold current targeted element for validation popus*/
		var elemId = e.currentTarget.id.split('_'); 
		var optionId = elemId[1];
		var pathId = elemId[2];
		var isSubCategory=false;
		var partId = $("#selectPart_"+optionId+"_"+pathId+" option:selected").val();
		var selectedComp = $("#selectComponent_"+optionId+"_"+pathId+" option:selected").val();
		var selectedSection = $("#"+e.currentTarget.id+" option:selected").val();
		if(selectedSection == 0){
			this.sectionId = null;
		}
		if(selectedSection.split("_")[0]=="s"){
			isSubCategory=true;
		}
		/*skip current selected branching id */
		var selectedBranchingCompId = $("#selectComponent_1 option:selected").val();
			selectedBranchingCompId = selectedBranchingCompId.replace('_','G');
		var selectedBranchingCompId_2 = "";
		
		if($("#selectComponent_2").length > 0){
			selectedBranchingCompId_2 = $("#selectComponent_2 option:selected").val();
			selectedBranchingCompId_2 = selectedBranchingCompId_2.replace('_','G');
		}
		var sectionId =  'P'+partId+'C'+selectedComp+'G'+selectedSection;
		
		if(sectionId == selectedBranchingCompId || (selectedBranchingCompId_2 != "" && sectionId == selectedBranchingCompId_2)){
			new Modal({
                id : 1,headingText : "Validation Error",
                containtText : "Can not branch to itself",
                closeActionEvent:function(){
                	$(currentPathValidationElement).trigger("focus");
                	$(currentPathValidationElement).val(0);
                }
            }).getWarningModal();
            return false;
		}
		for(var p in question.pages){
			if(question.pages[p].id == partId){
				for( j in question.pages[p].components){
					var comp = question.pages[p].components[j];
					var compId = comp.pageIdPrefix
								+ comp.pageId
								+ comp.idPrefix + comp.id;
					if(comp.id == selectedComp){
						if(isSubCategory){
							var subCat=selectedSection.split("_")[1];
							for(i in comp.subCategories){
								if(comp.subCategories[i].id==subCat){
									var isBranchDest=(comp.type!="scale")?comp.sections[k].isBranchDest:comp.isBranchDest;
									if(isBranchDest && this.sectionId!= subCat 
											&& this.branchId !=  comp.sections[k].destBranchId){
										new Modal({
			        	                  	id : 1,headingText : "Validation Error",
			        	                  	containtText : "already mapped path",
			        	                  	closeActionEvent:function(){
			        	                		$(currentPathValidationElement).trigger("focus");
			        	                	  	$(currentPathValidationElement).val(0);
			        	                	}
			        	            	}).getWarningModal();
										return false;
									}else{
										this.sectionId = selectedSection;
									}
									
								}
			   	    	 	}
						}
						if(comp.sections != undefined){
							for(k in comp.sections){
								if(comp.sections[k].id == selectedSection){
									if(comp.sections[k].isBranchDest && this.sectionId!= selectedSection 
										&& this.branchId !=  comp.sections[k].destBranchId){
										
										new Modal({
			        	                  	id : 1,headingText : "Validation Error",
			        	                  	containtText : "already mapped path",
			        	                  	closeActionEvent:function(){
			        	                		$(currentPathValidationElement).trigger("focus");
			        	                	  	$(currentPathValidationElement).val(0);
			        	                	}
			        	            	}).getWarningModal();
										return false;
									}
									else{
										var isCycle = this.checkCycle(sectionId, this.branchId); 
										if(isCycle){
											new Modal({
					        	                id : 1,headingText : "Validation Error",
					        	                containtText : "Path you are trying to create is generating cycle",
					        	                closeActionEvent:function(){
					        	                	$(currentPathValidationElement).trigger("focus");
					        	                	$(currentPathValidationElement).val(0);
					        	                }
					        	            }).getWarningModal();
					        	        	return false;
										}
										else{
										}
										this.sectionId = selectedSection;
									}
								}
							}
						}
						
						
					}
				}
			}
		}
		
	},
	removePath : function(e){
		var branch = null;
		var brId = this.branchId;
		var pathMap = null;
		 try{
		   		 branch = question.branches.filter(function(e){
	        	  		return e.id == brId;
	        	  	});
         }catch(err){
        	 branch = null;
         }
        if(branch != null && branch.length != 0){
        	var pathMapId = this.pathMapId;
	        try{
			   		 pathMap = branch[0].pathMaps.filter(function(e){
		        	  		return e.id == pathMapId;
		        	  	});
	        }catch(err){
	        	pathMap = null;
	        }
        }
        else{
        	if(question.tempBranch.id == brId){
        		branch = question.tempBranch;
        	}
        	if(branch != null){
        		var pathMapId = this.pathMapId;
    	        try{
			   		 pathMap = branch.pathMaps.filter(function(e){
			   			 return e.id == pathMapId;
		        	 });
    	        }catch(err){
    	        	pathMap = null;
    	        }
    	     
        	}
        	
        }
        if(pathMap != null && pathMap.length != 0){
        	pathMap[0].removePath(this);
        	if(this.conditionId != null && this.rangeId==null){
        		$("#pathWrapper_"+this.pathMapId+"_"+this.conditionId).find('#path_'+this.id).remove();	
        		if($("#pathWrapper_"+this.pathMapId+"_"+this.conditionId).find('.path').length == 0){
        			pathMap[0].removeCondition(this);
        			$("#conditionWrapper_"+this.pathMapId+"_"+this.conditionId).remove();
        			/*change margin of condtionWrapper*/
    				$("#addConditionDiv_"+this.pathMapId).css("margin-left","18px");
        		}
        		console.log("length"+$("#conditionPathWrapper_"+this.pathMapId).find(".conditions").length);
        		if(($("#conditionPathWrapper_"+this.pathMapId).find(".conditions").length==1) && ($("#conditionPathWrapper_"+this.pathMapId).find(".conditionWrapper").find(".pathWrapper").find('.path').length == 1) && branch[0].criteria!="multi" ){
        			$("#addConditionDiv_"+this.pathMapId).css("margin-left","-100px");
        		}
        		/*if($("#pathWrapper_"+this.pathMapId+"_"+this.conditionId).find('.path').length == 1){
        			change margin of condtionWrapper
    				$("#addConditionDiv_"+this.pathMapId).css("margin-left","18px");
        		}*/
        	}
        	else{
        		if(this.rangeId!=null){
        			$("#pathWrapper_"+this.pathMapId+"_"+this.rangeId).find("#rangePaths_"+this.rangeId).find('#path_'+this.id).remove();
        			if($("#pathWrapper_"+this.pathMapId+"_"+this.rangeId).find("#rangePaths_"+this.rangeId).find('.path').length == 0){
        				pathMap[0].removeRangeMulti(this.rangeId);
        			}
        			
        		}else{
        			$("#pathWrapper_"+this.pathMapId).find('#path_'+this.id).remove();
        		}
        	}
        	
        }
        
	},
	getPathMap : function(){
		var pathMap = null;
		var brId = this.branchId;
		 try{
		   		 branch = question.branches.filter(function(e){
	        	  		return e.id == brId;
	        	  	});
        }catch(err){
       	 branch = null;
        }
       if(branch != null && branch.length != 0){
       	var pathMapId = this.pathMapId;
       	
	        try{
			   		 pathMap = branch[0].pathMaps.filter(function(e){
		        	  		return e.id == pathMapId;
		        	  	});
	        }catch(err){
	        	pathMap = null;
	        }
	        
       }
       else{
       	if(question.tempBranch.id == brId){
       		branch = question.tempBranch;
       	}
       	if(branch != null){
       		var pathMapId = this.pathMapId;
           
   	        try{
			   		 pathMap = branch.pathMaps.filter(function(e){
			   			 return e.id == pathMapId;
		        	 });
   	        }catch(err){
   	        	pathMap = null;
   	        }
   	        
       	}
       }
       if(pathMap != null && pathMap.length != 0){
       	pathMap = pathMap[0];
       }
       return pathMap;
       
	}
};