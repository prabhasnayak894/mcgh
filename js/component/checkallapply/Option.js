/* ========================================================================
 * Option: Object Declaration

 * @author: Debasmita Sahoo
 * ========================================================================
 * Purpose of this object to have all option specific properties like 
 * componentId (to which component it belongs), right/wrong, type author/student,
 * student response. holds the option 
 * text editor , feedback editor 
 * ======================================================================== */
var Option  = function(options){
	this.id=null;
	this.componentId=null;
	this.componentIdPrefix=null;
	this.feedback=null;
	this.editor=null;
	this.idPrefix='E';
	this.sectionId = null;
	this.sectionIdPrefix = null;
	this.pointsValuePrefix="P";
	this.feedbackIdPrefix='F';
	this.studentIdPrefix='S';
	this.right=true;
	this.studentResponse=false;
	this.type='auth';
    this.feedbackType = null;
	$.extend(this, options);
	this.pointsValueEditor = new NumericEditor({id:this.sectionIdPrefix+this.sectionId+this.pointsValuePrefix+this.id,placeholder:"",allowNegative:true});
	this.editor = new OptionEditor({id:this.sectionIdPrefix+this.sectionId+this.idPrefix+this.id});
	this.studentEditor = new Editor({id:this.sectionIdPrefix+this.sectionId+this.idPrefix+this.id+this.studentIdPrefix});
	this.feedback = new Editor({id:this.sectionIdPrefix+this.sectionId+this.idPrefix+this.id+this.feedbackIdPrefix});
	
	this._markRight = Option.BindAsEventListener( this, this.markRight );
	this._markWrong = Option.BindAsEventListener( this, this.markWrong );
	this._showFeedback = Option.BindAsEventListener( this, this.showFeedback );
	this._hideFeedback = Option.BindAsEventListener( this, this.hideFeedback );
	this._populateEditorProperties = Option.BindAsEventListener( this, this.populateEditorProperties );
	this._populateFeedbackEditorProperties = Option.BindAsEventListener( this, this.populateFeedbackEditorProperties );
	this._populateStudentEditorProperties = Option.BindAsEventListener( this, this.populateStudentEditorProperties );
	this._update = Option.BindAsEventListener( this, this.update );
	this._addOption= Option.BindAsEventListener( this, this.addOption );
	this._removeOption= Option.BindAsEventListener( this, this.removeOption );
	this._updateEditor= Option.BindAsEventListener( this, this.updateEditor );
	this._changeMode= Option.BindAsEventListener( this, this.changeMode );
	
	this._updateStudentEditor= Option.BindAsEventListener( this, this.updateStudentEditor );
	this._updateFeedBackEditor= Option.BindAsEventListener( this, this.updateFeedbackEditor );
	this._openHelpModalForCharLimit = Option.BindAsEventListener(this,this.openHelpModalForCharLimit);
	this._openHelpModalForInsertHyperlink = Option.BindAsEventListener(this,this.openHelpModalForInsertHyperlink);
	this._openHelpModalForEntryType = Option.BindAsEventListener(this,this.openHelpModalForEntryType);
	
	this._selectOption= Option.BindAsEventListener( this, this.selectOption );
	this._updateStudentText = Option.BindAsEventListener( this, this.updateStudentText );
	this._filter =Option.BindAsEventListener( this, this.filter );
	this._restrictEvent=Option.BindAsEventListener( this, this.restrictEvent);
};

//add event helper method
Option.addEvent = function(oTarget, sEventType, fnHandler,args) {
	$("#"+oTarget).unbind(sEventType);
	$("#"+oTarget).bind(sEventType,args,fnHandler);
};
//use call to borrow context
Option.BindAsEventListener = function(object, fun) {
    return function(event) {
    	//TODO:[Debasmita? why if condition]
	    //if(event.target.nodeName=='div'||event.target.nodeName=='DIV') {    
	    	event.stopImmediatePropagation();
	    //}
        return fun.call(object, (event || window.event));
    };
};
Option.prototype = {  
		/**
		 * gets feedback editor
		 * @returns
		 */
		 getFeedback: function(){
             return this.feedback;
         },
         /**
          * sets feedback editor
          * @returns
          */
         setFeedback: function(feedback){
              this.feedback=feedback;
         },
         /**
          * gets component Id to which this option belong
          * @returns
          */
         getComponentId: function(){
             return this.componentId;  
	     },
	     /**
	      * sets the componentId for this option
	      * @param componentId
	      */
	     setComponentId: function( componentId ){
	            this.componentId =  componentId;
	     },
	     /**
	      * gets id of option
	      * @returns
	      */
         getId: function(){
             return this.id;  
	     },
	     /**
	      * sets id of option
	      * @param id
	      */
	     setId: function(id){
	            this.id =  id;
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
	      * gets type of option editor
	      * @returns {String}
	      */
	     getType: function(){
             return this.type;  
	     },
	     /**
	      * sets type of option editor
	      * @param type
	      */
	     setType: function(type){
	            this.type =type;
	     },
	     /**
	      *  updates text of content editable divs to the object's editor text
	      */
         update:function(e){
        	 	this.editor.update();
            this.pointsValueEditor.updateVal();
        		this.feedback.update();
            var i = 0;
            for (i in question.activePage.components) {
              if (question.activePage.components[i].id == this.componentId) {     
                question.activePage.components[i].updateMinMaxPoint();
                break;
              }
            }
            /*
        		Commented As per request from client
        		if(e!=undefined && e.currentTarget.id.indexOf("F")==-1 && e.currentTarget.textContent==""){
           		 	question.displayMessageModal("Validation Error","" + e.currentTarget.id + " can not be empty");
           	 	} */       		
         },
         /**
          * gets the option text editor
          * @returns
          */
         getEditor: function(){
             return this.editor;
         },
         /**
          * sets the option text editor
          * @param editor
          */
         setEditor: function(editor){
             this.editor=editor;
         },
         /**
          * gets the option student editor
          * @returns
          */
         getStudentEditor: function(){
             return this.studentEditor;
         },
         /**
          * sets the option student editor
          * @param studentEditor
          */
         setStudentEditor: function(studentEditor){
             this.studentEditor=studentEditor;
         },
         /**
          * gets the option is right/ wrong 
          * @returns {Boolean}
          */
         isRight: function(){
             return this.right;
         },
         /**
          * set the option as right/wrong
          * @param right
          */
         setRight: function(right){
             this.right=right;
         },
         /**
          * gets the option is set right by student
          * @returns {Boolean}
          */
         isStudentResponse: function(){
             return this.studentResponse;
         },
         /**
          * sets the option as right for student
          * @param right
          */
         setStudentResponse: function(studentResponse){
             this.studentResponse=studentResponse;
         },
         /**
     	 * gets pointsValueEditor of Multiple Choice option
     	 * @returns  pointsValueEditor
     	 */
     	 getPointsValueEditor : function(){
     		return this.pointsValueEditor;
     	 },
     	 /**
          * sets pointsValueEditor of Multiple Choice Option
          * @param pointsValueEditor
          */
     	 setPointsValueEditor : function(pointsValueEditor){
     		this.pointsValueEditor = pointsValueEditor;
     	 },
         /**
          * layouts in design mode
          * @param isLast is the last optio
          * @returns {String}
          */
         layout: function(isLast, feedbackType){
          this.feedbackType = feedbackType;
        	 var css = isLast?' style="display: block;"':' style="display: none;"';
        	 var ptsCss='style="display:none;"';
       	     if(feedbackType == 'rangedBased' || feedbackType == 'rangedBasedSubcategories'){
       	    	ptsCss='style="display:block;"';
       	     }
        	 var currentComp=null;
        	 var i=0;
 		     for( i in question.activePage.components){
 		    	if(question.activePage.components[i].getId()==this.componentId){
 		    		currentComp=question.activePage.components[i];
 		    	}
 	        }
        	 var hidden = currentComp.acceptAnyAnswer ? 'style="visibility: hidden;"' : "";
        	 var htmlelement='';
        	 var activeRightCss= this.right ?"active":"";
        	 var activeWrongCss=  !this.right?"active":"";
        	 htmlelement+='<div id="ans_'+this.editor.id+'" class="rowPagesection tickCheck">';
        	 htmlelement+='   <div class="colPageSection">';
        	 htmlelement+='       <div class="eachCol" '+hidden+'>';
        	 htmlelement+='           <div class="btn-group pull-left indt-mrgn">';
        	 htmlelement+='              <label class="btn btn-grey  btn-xs btn-bullet btn-bullet1 btnTick '+activeRightCss+'" id="right_'+this.editor.id+'" >';
        	 htmlelement+='                   <input type="checkbox" id="right'+this.editor.id+'">';
        	 htmlelement+='                   <img src="img/tick.png">';
        	 htmlelement+='               </label>';
        	 htmlelement+='               <label class="btn btn-grey  btn-xs btn-bullet btn-bullet2 btnTickWrong '+activeWrongCss+'" id="wrong_'+this.editor.id+'"  style="padding-bottom:0px;padding-top:0px;">';
        	 htmlelement+='                   <input type="checkbox" id="wrong'+this.editor.id+'">';
        	 htmlelement+='                   <img src="img/tickwrong.png">';
        	 htmlelement+='               </label>';
        	 htmlelement+='           </div>';
        	 htmlelement+='       </div>';
        	 htmlelement+='   </div>';
        	 
        	 htmlelement+=this.layoutEditor();
        	 htmlelement+=' <div  class="colPageSection ">';
           htmlelement+='   <div class="form-group ptsValue-1" id="Point'+this.pointsValueEditor.id+'" '+ptsCss+'>';
           htmlelement+=      this.pointsValueEditor.layout();
           htmlelement+='   </div>';

             if(feedbackType == 'rangedBased' || feedbackType == 'rangedBasedSubcategories'){
              htmlelement+='  <span style="padding-left: 8px;position: relative;top: 15px;">points</span>';
             }
             htmlelement+=' </div>';
             
        	 htmlelement+='  <div class="colPageSection rangeBasedpageSection">';
        	 htmlelement+='       <div class="eachCol">';
        	 htmlelement+='           <div class="plusBtn" '+css+' > ';
        	 htmlelement+='               <a title="Add Option">';
        	 htmlelement+='                   <img  id="plus_'+this.editor.id+'" src="img/plus.png">';
        	 htmlelement+='               </a>';
        	 htmlelement+='           </div>';
        	 htmlelement+='       	  <div class="minusBtn">';
        	 htmlelement+='                <a  title="Delete Option">';
        	 htmlelement+='                   <img id="minus_'+this.editor.id+'" src="img/minus.png">';
        	 htmlelement+='               </a>';
        	 htmlelement+='           </div>';
        	 htmlelement+='      </div>';
        	 htmlelement+='  </div>';
        	 htmlelement+=this.layoutFeedback();
        	 htmlelement+='</div>';
        	 return htmlelement;
         },
         /**
          * layouts option editor in design mode
          * @returns {String}
          */
         layoutEditor:function(){
        	 var htmlelement="";
        	 var editFeedbackHtml = '<h6 class="pull-right font10">ID# '+this.editor.id+'<a id="editfb'+this.feedback.id+'">| Expand feedback</a></h6>';
        	 var dataDivAttr = this.editor.text !='' ? 'data-div-placeholder-content' : '';
        	 if(this.type=='auth'){	    		
	    		 htmlelement+='   <div id="author'+this.editor.id+'" class="colPageSection secondColPic">';
	        	 htmlelement+='       <div>';
	        	 htmlelement+='           <div class="editableDivTitle">';
	        	 htmlelement+=	editFeedbackHtml;
	        	 htmlelement+='          </div>';
	        	 htmlelement+='          <div contenteditable="true"  onFocus="focusHandler(this)" onkeypress="keyPressHandler(this)" onmouseup="mouseupKeyupHandler(this)" onkeyup="mouseupKeyupHandler(this)" data-placeholder="Enter text" id="'+this.editor.id+'"  data-maxlength="'+this.editor.maxLength+'" class="inputDummy inputDummyMaxWidth " '+dataDivAttr+'>'+this.editor.text+'</div>';
	        	 htmlelement+='      </div>';
	        	 htmlelement+='   </div>';
	    	 }else{
	    		 htmlelement+='  <div  id="stud'+this.editor.id+'" class="colPageSection secondColPic">';
	        	 htmlelement+='       <div>';
	        	 htmlelement+='          <div class="editableDivTitle">';
	        	 htmlelement+= editFeedbackHtml;
	        	 htmlelement+='          </div>';
	        	 htmlelement+='           <div class="innerinputDummy">';
	        	 htmlelement+='               <div contenteditable="true"  onFocus="focusHandler(this)" onkeypress="keyPressHandler(this)" onmouseup="mouseupKeyupHandler(this)" onkeyup="mouseupKeyupHandler(this)" data-placeholder="Enter text"  id="'+this.editor.id+'" data-maxlength="'+this.editor.maxLength+'" class="inputDummyFirst" '+dataDivAttr+'>'+this.editor.text+'</div>';
	        	 htmlelement+='              <div contenteditable="false" data-placeholder="Student entry"   id="'+this.studentEditor.id+'" data-maxlength="'+this.studentEditor.maxLength+'" class="inputDummySecond"></div>';
	        	 htmlelement+='           </div>';
	        	 htmlelement+='       </div>';
	        	 htmlelement+='   </div>';
	    	 }
        	 
	    	 return htmlelement;
         },
         /**
          * layouts option feedback editor in design mode
          * @returns {String}
          */
         layoutFeedback:function(){
        	 var htmlelement="";
        	 var dataDivAttr = this.feedback.text !='' ? 'data-div-placeholder-content' : '';
        	 htmlelement+='  <div class="rowPagesection " id="feedback'+this.feedback.id+'" style="display: none;">';
        	 htmlelement+='       <div class="colPageSection">';
        	 htmlelement+='         <div class="eachCol firstColPic"></div>';
        	 htmlelement+='     </div>';
        	 htmlelement+='     <div class="colPageSection secondColPic">';
        	 htmlelement+='     <div>';
        	 htmlelement+='            <div class="editableDivTitle">';
        	 htmlelement+='                 <h6 class="pull-right font10">ID# '+this.feedback.id+' | <a  id="hide'+this.feedback.id+'" >Collapse feedback</a></h6>';
        	 htmlelement+='            </div>';
        	 htmlelement+='             <div contenteditable="true" onFocus="focusHandler(this)" onkeypress="keyPressHandler(this)" onmouseup="mouseupKeyupHandler(this)" onkeyup="mouseupKeyupHandler(this)" data-placeholder="Enter text" data-maxlength="'+this.feedback.maxLength+'" id="'+this.feedback.id+'" class="inputDummy feedbackInputBaground" '+dataDivAttr+'>'+this.feedback.text+'</div>';
        	 htmlelement+='         </div>';
        	 htmlelement+='      </div>';
        	 htmlelement+='     <div class="colPageSection invisible">';
        	 htmlelement+='         <div class="eachCol">';
        	 htmlelement+='             <a>';
        	 htmlelement+='                  <img src="img/getPicture.png">';
        	 htmlelement+='              </a>';
        	 htmlelement+='          </div>';
        	 htmlelement+='          <div></div>';
        	 htmlelement+='      </div>';
        	 htmlelement+='  </div>';
	    	 return htmlelement;
         },
         /**
          * marks current option as right
          * @param event
          */
         markRight:function(){
        		 if(!this.right && $("#wrong_"+this.editor.id).hasClass("active")){
    				$("#wrong_"+this.editor.id).removeClass("active");
    				$("#right_"+this.editor.id).addClass("active");
    				this.setRight(true);
        		}
         },
         /**
          * marks current option as wrong
          * @param event
          */
         markWrong:function(){
        	 if (this.right && $("#right_" + this.editor.id).hasClass("active")) {
        		 $("#right_" + this.editor.id).removeClass("active");
				 $("#wrong_" + this.editor.id).addClass("active");
					 this.right = false;					 
				} 
      },
      /**
		 * adds new option for component
		 */
      addOption:function(){   
    	  var i=0;
		    for( i in page.components){
		    	if(page.components[i].getId()==this.componentId){
            var j = 0;
            for(j in page.components[i].sections){
              if(this.sectionId==page.components[i].sections[j].id){
                var newId = page.components[i].sections[j].options[page.components[i].sections[j].options.length-1].getId()+1;
                var option = new Option({id:newId,sectionId:this.sectionId, sectionIdPrefix:this.sectionIdPrefix,componentId : this.componentId,componentIdPrefix : this.componentIdPrefix  });             
                var newType = page.components[i].sections[j].options[page.components[i].sections[j].options.length-1].type;
                if(newType=='stud'){
                    option.type='stud';
                }
                page.components[i].sections[j].addOption(option);
                var $lastOption=$("#ans_"+this.editor.id);
                if( $lastOption.find(".colPageSection").find(".eachCol").find(".plusBtn").is(":visible"))
                  $lastOption.find(".colPageSection").find(".eachCol").find(".plusBtn").hide();
                $lastOption.after(option.layout(true, this.feedbackType));
                $lastOption.find(".colPageSection").find(".eachCol").find(".minusBtn").show();                
                option.afterLayout();      
              }
            }
          }
	       }
      },
      /**
       * removes current option from component
       */
      removeOption:function(){
    	  var i=0;
        for( i in page.components){
          var last= false;
          if(page.components[i].getId()==this.componentId){
            for(j in page.components[i].sections){     
             if(this.sectionId==page.components[i].sections[j].id){     
	    		for(k in page.components[i].sections[j].options){
	    			if(page.components[i].sections[j].options[k].getId()==this.id){
	    			   $( "#ans_"+this.editor.id).remove();
	    			   page.components[i].sections[j].removeOption(page.components[i].sections[j].options[k]);
	    			}
	    		}
	    		var $lastOption=$("#ans_"+page.components[i].sections[j].options[page.components[i].sections[j].options.length-1].editor.id);
	    		$lastOption.find(".colPageSection").find(".eachCol").find(".plusBtn").show();
	    		if(page.components[i].sections[j].options.length<=1){
	    			last = true;
	    			$lastOption.find(".colPageSection").find(".eachCol").find(".minusBtn").hide();
	    		}
             }
           }
           this.layout(last, this.feedbackType);
           page.components[i].updateMinMaxPoint();
	    }
	   }
    },
    /**
     * populate option text editor properties
     */
    populateEditorProperties:function(){	    
    	$("#elementProperties").html(this.editorPropertyLayout());
      
      /* Media object creates here for that component */
      var compId = this.sectionIdPrefix+this.sectionId+'E'+this.id;
    	var newMedia = new Media({id:compId});
      $("#mediaProperties").html(newMedia.layout());
      $("#mediaProperties").show();
      newMedia.afterLayout();
      util.checkMediaInEditMode();

 			$("#elementProperties").show();     			
 			$("#properties").hide();
 			if(this.editor.type=='auth')
 				{$("#mode").html("Authored text  <span class='caret caretDrop'></span>");}
 			else{$("#mode").html("Student entry  <span class='caret caretDrop'></span>");}
 			
 			this.afterEditorPropertyLayout();
 			$("#activeHyperlink").text("");
    },
    /**
     * populate option student text editor properties
     */
    populateStudentEditorProperties:function(){	
    	$("#elementProperties").html(this.studentEditorPropertyLayout());
     			$("#elementProperties").show();
     			$("#properties").hide();
     			this.afterStudentEditorPropertyLayout();
    },
    /**
     * populate option feedback text editor properties
     */
    populateFeedbackEditorProperties:function(){	
    	$("#elementProperties").html(this.editorFeedbackPropertyLayout());
    			$("#elementProperties").show();
     			$("#properties").hide();

      /* Media object creates here for that component */
      var compId = this.componentIdPrefix+this.componentId+'E'+this.id+'F';
      var newMedia = new Media({id:compId});
      $("#mediaProperties").html(newMedia.layout());
      $("#mediaProperties").show();
      newMedia.afterLayout();
      util.checkMediaInEditMode();

     	this.afterEditorFeedbackPropertyLayout();
    },
    /**
     * layouts the editor property pane
     */
    editorPropertyLayout:function(){
    	var htmlelement="";
	   	 htmlelement+='    <div class="tabContent tabProContent">';
	   	 htmlelement+='        <p>Component: Checkbox</p>';//
	   	 htmlelement+='        <p>Element: Input field</p>';
	   	 htmlelement+='        <p id="elementid">ID# '+this.editor.id+'</p>';
	   	 htmlelement+='    </div>';
	   	 htmlelement+='    <div class="clear"></div>';
	   	
	   	 htmlelement+='    <div id="entryType">';
    	 htmlelement+='        <div class="head-info typeInput">';
    	 htmlelement+='            <a id="entryTypeHelp'+this.editor.id+'" class="info-icon"></a>Entry type:';
    	 htmlelement+='        </div>';
    	 htmlelement+='       <div class="tabContent tabProContent">';
    	 htmlelement+='           <div class="btn-group customDropdown">';
    	 htmlelement+='                <button data-toggle="dropdown" id="mode" class="btn btn-default btn-authorText dropdown-toggle" type="button">';
    	 htmlelement+='                    Author Text<span class="caret caretDrop"></span>';
    	 htmlelement+='                </button>';
    	 htmlelement+='                <ul class="dropdown-menu">';
    	 htmlelement+='                    <li id="mode_stud_'+this.editor.id+'"><a>Student entry</a>';
    	 htmlelement+='                    </li>';
    	 htmlelement+='                    <li class="divider"></li>';
    	 htmlelement+='                    <li id="mode_author_'+this.editor.id+'"><a>Authored text</a>';
    	 htmlelement+='                    </li>';
    	 htmlelement+='                </ul>';
    	 htmlelement+='            </div>';
    	 htmlelement+='        </div>';
    	 htmlelement+='    </div>';
    	 htmlelement+='    <div class="clear"></div>';
	   	 htmlelement+='    <div class="gap10"></div>';
	   	 htmlelement+='    <div class="head-info typeInput insertHyperlinkText">';
	   	 htmlelement+='        <a id="insertHelp'+this.editor.id+'" class="info-icon"></a>Insert a hyperlink:';
	   	 htmlelement+='    </div>';
	   	 htmlelement+='    <div class="tabContent tabProContent customInput insertHyperlink">';
	   	 htmlelement+='        <div class="form-group">';
	   	 htmlelement+='            <label class="font11" for="exampleInputEmail1">Display text:</label>';
	   	 htmlelement+='            <input type="Text" placeholder="Enter Display Text" id="linkText_'+this.editor.id+'">';
	   	 htmlelement+='        </div>';
	   	 htmlelement+='        <div class="form-group">';
	   	 htmlelement+='            <label class="font11" for="exampleInputPassword1">Link address:</label>';
	   	 htmlelement+='            <input type="Text" placeholder="Enter Link" id="linkAddress_'+this.editor.id+'">';
	   	 htmlelement+='        </div>';
	   	 htmlelement+='        <button id="insert_'+this.editor.id+'" class="btn btn-primary btn-xs btn-Insert pull-right" type="submit">Insert</button>';
	   	 htmlelement+='        <div class="clear"></div>';
	   	 htmlelement+='    </div>';
	   	 htmlelement+='    <div class="clear"></div>';

   	return htmlelement;

    },
    /**
     * layouts the student editor property pane
     */
    studentEditorPropertyLayout:function(){
    	var htmlelement="";
    	var maxLengthval = this.studentEditor.maxLength.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
	   	 htmlelement+='    <div class="tabContent tabProContent">';
	   	 htmlelement+='        <p>Checkbox input field </p>';
	   	 htmlelement+='        <p id="elementid">ID# '+this.studentEditor.id+'</p>';
	   	 htmlelement+='    </div>';
	   	 htmlelement+='    <div class="clear"></div>';
	   	 htmlelement+='    <div class="tabContent tabProContent customInput charLimit">';
	   	 htmlelement+='        <form role="form">';
	   	 htmlelement+='            <div class="form-group">';
	   	 htmlelement+='                <a id="charLimitHelp'+this.studentEditor.id+'" class="info-icon"></a>';
	   	 htmlelement+='                <label class="font11" for="exampleInputEmail1">Charector Limit</label>';
	   	 htmlelement+='                <input type="Text" placeholder="15,000" value="'+maxLengthval+'" id="txtmaxLenght_'+this.studentEditor.id+'">';
	   	 htmlelement+='            </div>';
	   	 htmlelement+='            <div class="clear"></div>';
	   	 htmlelement+='        </form>';
	   	 htmlelement+='    </div>';
	   	 htmlelement+='    <div class="clear"></div>';

   	return htmlelement;

    },

    /**
     * layouts the feedback editor property pane
     */
    editorFeedbackPropertyLayout:function(){
    	var htmlelement="";
	   	 htmlelement+='    <div class="tabContent tabProContent">';
	   	 htmlelement+='        <p>Checkbox feedback</p>';
	   	 htmlelement+='        <p id="elementid">ID# '+this.feedback.id+'</p>';
	   	 htmlelement+='    </div>';
	   	 htmlelement+='    <div class="clear"></div>';
//	   	 htmlelement+='    <div class="tabContent tabProContent customInput charLimit">';
//	   	 htmlelement+='        <form role="form">';
//	   	 htmlelement+='            <div class="form-group">';
//	   	 htmlelement+='                <a id="charLimitHelp'+this.feedback.id+'" class="info-icon" href="#"></a>';
//	   	 htmlelement+='                <label class="font11" for="exampleInputEmail1">Charector Limit</label>';
//	   	 htmlelement+='                <input type="Text" placeholder="15,000" value="'+this.feedback.maxLength+'" id="txtmaxLenght_'+this.feedback.id+'">';
//	   	 htmlelement+='            </div>';
//	   	 htmlelement+='            <div class="clear"></div>';
//	   	 htmlelement+='        </form>';
//	   	 htmlelement+='    </div>';
//	   	 htmlelement+='    <div class="clear"></div>';
	   	 htmlelement+='    <div class="gap10"></div>';
	   	 htmlelement+='    <div class="head-info typeInput insertHyperlinkText">';
	   	 htmlelement+='        <a id="insertHelp'+this.feedback.id+'" class="info-icon"></a>Insert a hyperlink:';
	   	 htmlelement+='    </div>';
	   	 htmlelement+='    <div class="tabContent tabProContent customInput insertHyperlink">';
	   	 htmlelement+='        <div class="form-group">';
	   	 htmlelement+='            <label class="font11" for="exampleInputEmail1">Display text:</label>';
	   	 htmlelement+='            <input type="Text" placeholder="Enter Display Text" id="linkText_'+this.feedback.id+'">';
	   	 htmlelement+='        </div>';
	   	 htmlelement+='        <div class="form-group">';
	   	 htmlelement+='            <label class="font11" for="exampleInputPassword1">Link address:</label>';
	   	 htmlelement+='            <input type="Text" placeholder="Enter Link" id="linkAddress_'+this.feedback.id+'">';
	   	 htmlelement+='        </div>';
	   	 htmlelement+='        <button class="btn btn-primary btn-xs btn-Insert pull-right" id="insert_'+this.feedback.id+'" type="submit">Insert</button>';
	   	 htmlelement+='        <div class="clear"></div>';
	   	 htmlelement+='    </div>';
	   	 htmlelement+='    <div class="clear"></div>';
    	 return htmlelement;

    },
    /**
     * shows the option feedback
     */
    showFeedback:function(){
        		$("#editfb"+this.feedback.id).hide("slow");
        		$("#feedback"+this.feedback.id).show("slow");		
    },
    /**
     * hides the option feedback
     */
    hideFeedback:function(){
		$("#editfb"+this.feedback.id).show("slow");
		$("#feedback"+this.feedback.id).hide("slow");		
	},
	/**
     * updates editor properties
     */
	updateEditor:function(event){    	
			var linkText=$("#linkText_"+this.editor.id).val();
			var linkAddress=$("#linkAddress_"+this.editor.id).val();
			var url=$("#linkAddress_"+this.editor.id).val();	 		
	 	
	 		//validate URL with format like: "http://www.google.com/";
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
     * 
     * @param event
     */
	changeMode : function(event){
	    	if(typeof event.data ==='undefined'){
				this.type='auth';
			}else{
				this.type=event.data.type;			
				if(this.type=='auth'){				
					this.editor.type='auth';				
					page.doLayout();
					$("#"+this.editor.id).trigger('click');
					$("#mode").html("Authored text  <span class='caret caretDrop'></span>");
			    }else{		    	
			    	this.editor.type='stud';		    	
			    	page.doLayout();
			    	$("#"+this.editor.id).trigger('click');
					$("#mode").html("Student entry  <span class='caret caretDrop'></span>");					
				}
				 var i=0;
				    for( i in page.components){
				    	if(page.components[i].getId()==this.componentId){
				    		page.components[i].populateComp(); 
				    	}
			       }
				$("#"+this.editor.id).focus();			
			}
	    },
	/**
     * updates editor properties
     */
	updateStudentEditor:function(event){ 
		this.studentEditor.maxLength=$("#txtmaxLenght_"+this.studentEditor.id).val();
		if( this.studentEditor.maxLength != '' ) {
			this.studentEditor.maxLength = parseInt(this.studentEditor.maxLength.replace(/[^0-9]+/g, ""));
		}
		var displayMaxLengthValue = this.studentEditor.maxLength;
		if( this.studentEditor.maxLength != '' ) {
			displayMaxLengthValue = this.studentEditor.maxLength.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
		}
		$("#txtmaxLenght_" + this.studentEditor.id).val(displayMaxLengthValue);

	},	
	/**
     * opens modal popup for character limit
     */
    openHelpModalForCharLimit:function(event){
   	 new Modal({id : 1,headingText : message.getcharLimitHeader(),containtText : message.getcharLimitHeader()}).openHelpModal(); 
    },
    /**
     * opens modal popup for Insert a hyperlink
     */
    openHelpModalForInsertHyperlink:function(event){
   	 new Modal({id : 1,headingText : message.getinsertHyperlinkHeader(),containtText : message.getinsertHyperlinkMsg()}).openHelpModal(); 
    }, 
    /**
     * opens modal popup for EntryType
     */
    openHelpModalForEntryType:function(event){
    	 new Modal({id : 1,headingText : message.getentryTypeHeader(),containtText : message.getentryTypeMsg()}).openHelpModal();     
    },
    /**
     * updates feedback editor properties
     */
	updateFeedbackEditor:function(){
		
		var linkText=$("#linkText_"+this.feedback.id).val();
		var url=$("#linkAddress_"+this.feedback.id).val();
 	
 		//validate URL with format like: "http://www.google.com/";
		if(/^(https?|s?ftp):\/\/(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i.test(url)) {
			if(linkText != ""){
				if(url.slice(-1)==="/")
	 			{
	 			url=url.substring(0,url.length-1);
	 			}
				var linkAddress=url;
				//this.evaluateUrl(linkAddress, linkText, this.feedback.id);
				util.evaluateUrl(linkAddress, linkText, this.feedback.id);
	 		
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
	 * adds events for html elements related to current option
	 */
	afterLayout:function(){
		
		Option.addEvent( "right_"+this.editor.id, "click", this._markRight );
		Option.addEvent( "wrong_"+this.editor.id, "click", this._markWrong );
		
		Option.addEvent( "editfb"+this.feedback.id, "click", this._showFeedback );
		Option.addEvent( "hide"+this.feedback.id, "click", this._hideFeedback );
		Option.addEvent( this.editor.id, "click", this._populateEditorProperties );
		Option.addEvent( this.studentEditor.id, "click", this._populateStudentEditorProperties );
		Option.addEvent( this.feedback.id, "click", this._populateFeedbackEditorProperties );
		Option.addEvent( this.editor.id, "blur", this._update );
		Option.addEvent( this.feedback.id, "blur", this._update );
		Option.addEvent( this.feedback.id, "paste", this._filter );
		Option.addEvent( this.editor.id, "paste", this._filter);
		Option.addEvent( "plus_"+this.editor.id, "click", this._addOption );
		Option.addEvent( "minus_"+this.editor.id, "click", this._removeOption );
		this.editor.afterOptionEditorlayout();
		this.feedback.afterEditorlayout();
    this.afterPointLayout();
	 },
	 /**
	  * adds events for html elements of current option student editor property pane
	  */
	 afterStudentEditorPropertyLayout:function(){
		 Option.addEvent( "charLimitHelp"+this.studentEditor.id, "click", this._openHelpModalForCharLimit);
		 Option.addEvent( "txtmaxLenght_"+this.studentEditor.id, "blur", this._updateStudentEditor);
		 Option.addEvent("txtmaxLenght_"+this.studentEditor.id,"keypress",this._restrictEvent);
	 },
	 /**
	  * adds events for html elements of current option editor property pane
	  */
	 afterEditorPropertyLayout:function(){
		 Option.addEvent( "insertHelp"+this.editor.id,"click",this._openHelpModalForInsertHyperlink);
		 Option.addEvent( "entryTypeHelp"+this.editor.id, "click", this._openHelpModalForEntryType);
		 Option.addEvent( "mode_stud_"+this.editor.id, "click", this._changeMode,{"type":"stud"});
		 Option.addEvent( "mode_author_"+this.editor.id, "click", this._changeMode,{"type":"auth"});
		 Option.addEvent( "insert_"+this.editor.id, "click", this._updateEditor);
		 
	 },
	 /**
	  * adds events for html elements of current option feedback editor property pane
	  */
	 afterEditorFeedbackPropertyLayout:function(){
		 Option.addEvent( "insertHelp"+this.feedback.id,"click",this._openHelpModalForInsertHyperlink);			
		 Option.addEvent( "insert_"+this.feedback.id, "click", this._updateFeedBackEditor);
	 },
   /**
     * adds events for html elements related to point base response
     */
    afterPointLayout:function(){       
      MultipleChoiceOptionAnswer.addEvent(this.pointsValueEditor.id, "blur", this._update );
      this.pointsValueEditor.afterNumericEditorlayout();
    },
	 /**
      * layouts in instructor mode
      * @returns {String}
      */
	 instructorLayout:function(answerOptionOrientation,acceptAnyAnswer,showPointsToStudents){
		 var css = this.right?"correct":"wrong";
		 var checkproperty=this.right && !acceptAnyAnswer?"checked='checked'":"";
		var hideanswer=!acceptAnyAnswer?"style='visibility:visible'":"style='visibility:hidden'";
		 
		 var htmlelement='';
         var styleClassMain=(answerOptionOrientation==3)?"column-2-main":(answerOptionOrientation==2)?"defaultMCOptionPreview-main":"";
		 htmlelement +='<div class="prevQuestOpts '+styleClassMain+'">';
		 htmlelement+='<div class="colPageSection">';
		 htmlelement +='<div id="showCorrect_'+this.editor.id+'" class="answerTick '+css+'" style="display: none;"></div>';
		 htmlelement +='<input id="option'+this.editor.id+'" name="cc" type="checkbox" "" '+checkproperty+' disabled>';
		 htmlelement +='</div>';
		 var styleClass=(answerOptionOrientation==3)?"column-2":(answerOptionOrientation==2)?"defaultMCOptionPreview":""; 
		 var stqLblClass = "";
		 if(answerOptionOrientation!=1){
			 htmlelement+='<div class="colPageSection '+styleClass+'">';
			 stqLblClass = "stdQueLabel-column-2";
		 }
		 else
			 htmlelement+='<div class="colPageSection secondColPic">';
		 
		 var pointText=" ";
		 pointText = showPointsToStudents?this.pointsValueEditor.text:"";
		 
		 if(pointText != ""){
			 pointText = parseFloat(pointText);
			 pointText +=(pointText>1)?" pts.":" pt.";
		 }
		 
         /* function to render images in layout */
         var editorText = util.getImageLayout(this.editor.text);
         editorText = util.getVideoLayout(editorText);

  		 htmlelement +='<label for="option'+this.editor.id+'"><span class="pull-left lblLeft"></span></label><div class="stdQueLabel '+stqLblClass+'">'+editorText+' <span class="boldclass">'+pointText+'</span>';
		 if(this.feedback.text!='' && this.feedback.text!='&nbsp;'){
			 var feedPdiv = '';
			 if(styleClassMain != "defaultMCOptionPreview-main"){
				 feedPdiv = '</div><div class="stdQueLabelFeedback">';
			 }
			 htmlelement += '<div class="clear"></div>';
			 htmlelement +=feedPdiv+'<label class="feedbackLinkPosition"><a  class="feedClose">Feedback</a></label>';
			 htmlelement +=' <div style="display: none; margin-top:20px;" class="feedBackOpen">';

         var feedText = util.getImageLayout(this.feedback.text);
           feedText = util.getVideoLayout(feedText);
			 htmlelement +=' <strong>Feedback:</strong>'+feedText;
			 htmlelement +='</div>';
		 }
		 htmlelement +='</div>';
		 htmlelement +='</div>';
		 htmlelement +='</div>';
		 return htmlelement.replace(/&nbsp;/gi,'');
	 },
	 /**
      * layouts in student test mode
      * @returns {String}
      */
	 studentLayout:function(answerOptionOrientation, acceptAnyAnswer,feedbackType,showPointsToStudents, feedbackScoringType, notApplicable){
		 var studentResponse = this.studentResponse && !notApplicable ? "checked='checked'" : "";
		 var disabled=(this.type=='stud' && this.studentResponse)?"" : "disabled='disabled'";
		
    	 var htmlelement="";
    	 htmlelement+='<div class="prevQuestOpts">';	
    	 
    	 htmlelement+='<div class="colPageSection">';
		 htmlelement +='<div class="answerTick wrong" style="display: none;"></div>';
		 htmlelement+='<input class="studentViewCheckbox" id="checkAnswer_'+this.editor.id+'"  type="checkbox" '+studentResponse+'/>';
		 htmlelement +='</div>';
		 
		 var styleClass=(answerOptionOrientation==3)?"column-2":(answerOptionOrientation==2)?"defaultMCOptionPreview":"";
		 var stqLblClass = "";
		 if(answerOptionOrientation!=1){
			 htmlelement+='<div class="colPageSection '+styleClass+'">';
			 stqLblClass = "stdQueLabel-column-2";
		 }
		 else
			 htmlelement+='<div class="colPageSection secondColPic">';
    	 
         /* function to render images in layout */
         var editorText = util.getImageLayout(this.editor.text);
             editorText = util.getVideoLayout(editorText);
           
        var pointText = " ";
			pointText = this.pointsValueEditor.text;
  		 
  		 if(pointText != ""){
  			 pointText = parseFloat(pointText);
  			 pointText +=(pointText>1)?" pts.":" pt.";
  		 }
         if(!showPointsToStudents)
        	 pointText="";
        	   
    	 htmlelement+='<label id="option_'+this.editor.id+'" for="checkAnswer_'+this.editor.id+'"></label><div class="stdQueLabel '+stqLblClass+'">'+editorText+' <span class="boldclass">'+pointText+'</span></div>';
    	 if(this.type=='stud'){
    		 htmlelement+='&nbsp;<input type="text" maxlength="'+this.studentEditor.maxLength+'"  value="'+this.studentEditor.text+'" id="student_'+this.studentEditor.id+'" '+disabled+' style="display:inline;border-color: #AFAFAF;border-radius: 3px;border-style: solid;border-width: 1px;box-shadow: 0 0 5px #CFCFCF inset;width: 250px;"/>';
    	 }
    	 htmlelement+='</div>';
    	 htmlelement+='</div>';
   	
    	 return htmlelement.replace(/&nbsp;/gi,'');
     },
     
     /**
      * adds event handlers to html element in student layout mode
      */
     afterStudentLayout:function(){    	
 		Option.addEvent( "checkAnswer_"+this.editor.id, "change", this._selectOption );
 		Option.addEvent( "student_"+this.studentEditor.id, "blur", this._updateStudentText );
 	 }, 
 	 /**
 	  * updates student entered text
 	  */
 	updateStudentText:function(){
 		this.studentEditor.text=$("#student_"+this.studentEditor.id).val();
 		question.updateProgressBar();
	},
 	 /**
 	  * Selects the current option as student selected response
 	  */
 	 selectOption:function(){
 		if($("#checkAnswer_"+this.editor.id).prop("checked")==true){
 			this.studentResponse=true; 			
 			
 			if(this.type=='stud'){
 				$("#student_"+this.studentEditor.id).show();
 				$("#student_"+this.studentEditor.id).prop('disabled', false);
 			}
 			
 		}else{
 			var totalPoints = 0;
 			var currentComponent=null;
 			for (i in question.activePage.components) {
 				if (question.activePage.components[i].id == this.componentId) {
 					currentComponent = question.activePage.components[i];
 				}
 			 }
 			
 			if(currentComponent.feedbackType == 'rangedBased' || currentComponent.feedbackType == 'rangedBasedSubcategories'){
 	 			
 	   			var stdScoreTypeTextElem = $("#stdSideCheckallScore_"+currentComponent.id).find('.stdScoreTypeText');
 	   		 	var stdScorePointTextElem = $("#stdSideCheckallScore_"+currentComponent.id).find('.stdScorePointText');
 	   		 	if(stdScoreTypeTextElem.length>0 && stdScorePointTextElem.length>0){
 			 		var stdScorePointText = 'Total Score : '+ totalPoints +' pts.';
 			 		/*if(totalPoints==0){
 			 			stdScorePointText = '';
 			 		}*/
 			 		$("#stdSideCheckallScore_2").hide();
 	   		 	}

 	 		}
 			
 			
 			this.studentResponse=false;
 			if(this.type=='stud'){
 				$("#student_"+this.studentEditor.id).prop('disabled', true);
 			}
 		}
 		/*changes for branching based on responses*/
  		 var currentComponent = null;
		 for (i in question.activePage.components) {
			if (question.activePage.components[i].id == this.componentId) {
				currentComponent = question.activePage.components[i];
			}
		 }
		 this.checkMapping(currentComponent);
		 /*go for component branching check */
/*		 if(currentComponent.isBranched){
		 	to display score in student side if component is branched 
	   		this.displayTotalScoreStudentSide(currentComponent);
	   		for (j in currentComponent.sections) {
	   			if (currentComponent.sections[j].id == this.sectionId) {
	   				var score=this.calculateSectionScore(currentComponent,currentComponent.sections[j]);
	   				var secId= currentComponent.sections[j].componentIdPrefix+currentComponent.sections[j].componentId+currentComponent.sections[j].idPrefix+currentComponent.sections[j].id;
	   				$("#sectionDivScore_"+secId).text(score);
	   				//console.log("sectionscore"+score);
	   			}
	   		}
	   		
		 }else{
			 var j = 0;
				for (j in currentComponent.sections) {
					if (currentComponent.sections[j].id == this.sectionId) {
						if (currentComponent.sections[j].isBranched) {
							console.log("display section score");
							this.displayTotalScoreStudentSide(currentComponent);
							var score=this.calculateSectionScore(currentComponent,currentComponent.sections[j]);
							var secId= currentComponent.sections[j].componentIdPrefix+currentComponent.sections[j].componentId+currentComponent.sections[j].idPrefix+currentComponent.sections[j].id;
			   				if(score == 0)
			   				{
			   					$("#sectionDivScore_"+secId).text("");
			   				}
			   				else
			   				{
			   					$("#sectionDivScore_"+secId).text("Section Score: "+score);
				   				$("#sectionDivScore_"+secId).css("float","left")
			   				}
						}
					}
				}
		 }*/
		 question.updateProgressBar();
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
	},
	displayTotalScoreStudentSide:function(currentComponent){
		var totalPoints = 0;
		var totalPointsSubcat = 0;
		var rangeBasedNACheck = false;  // range base NA check for avoiding avg calculation as we directly catch min/max
		var i=0;
		
		for(var index in question.branches)
	     {
	    	var branch = question.branches[index];
			if (branch.mappingIndicator == "answerOption")
			{
				$(".stdScorePointText").hide();
			}		
		 }
		
		if( currentComponent.feedbackType == 'rangedBasedSubcategories') {
			for(k in currentComponent.subCategories){
				totalPointsSubcat = 0;
				var NAflag=false;
				if(currentComponent.subCategories[k].sectionIds.length>0){
     				if(currentComponent.subCategories[k].notApplicableStudentResponse){
     					var z=0;
     					for (z in currentComponent.subCategoryRanges){
		   					if (currentComponent.subCategories[k].id == currentComponent.subCategoryRanges[z].subCategoryId){
		   						totalPointsSubcat=currentComponent.subCategories[k].awardPoints=='Max'?currentComponent.subCategoryRanges[z].maxPoint :currentComponent.subCategoryRanges[z].minPoint;
		   					}
		   				}
     					NAflag=true;
 					}
     				
     				for( i in currentComponent.sections){
    		   			if(currentComponent.sections[i].subCategoryId == currentComponent.subCategories[k].id) {
    		   				if(!NAflag)
    		   				 totalPointsSubcat += currentComponent.sections[i].calculatePoints(currentComponent.feedBackScoringSelectionType);
    		   			}
	     			}
	     			totalPoints += totalPointsSubcat;
	     			if(currentComponent.feedbackScoringType == "average" && !NAflag){
	     				totalPointsSubcat = totalPointsSubcat / currentComponent.subCategories[k].sectionIds.length;
		   				var multiplier = Math.pow(10, 2);
		   				totalPointsSubcat = Math.round(totalPointsSubcat * multiplier) / multiplier;
		 			}
	     			else{
	     				var multiplier = Math.pow(10, 2);
		   				totalPointsSubcat = Math.round(totalPointsSubcat * multiplier) / multiplier;
	     			}
	     			//currentComponent.subCategories[k].score = totalPointsSubcat;
	     			//scoreHtm +='<div> Total Score : '+ totalPointsSubcat +' pts.</div>';
	   			}
  	   		}
     	}else {	
 			var NAflag=false;
 			if(currentComponent.notApplicableStudentResponse){     					    					
 				totalPoints=currentComponent.awardMaximum?currentComponent.maxPoint :currentComponent.minPoint;		   						
				NAflag=true;
				rangeBasedNACheck = true;
			}
 			for( i in currentComponent.sections){
 				if(!NAflag)
 					totalPoints += currentComponent.sections[i].calculatePoints(currentComponent.feedBackScoringSelectionType);
 			}
 			
		}
 		if(currentComponent.feedbackScoringType == "average" && !rangeBasedNACheck){
			totalPoints = totalPoints / currentComponent.sections.length;
			var multiplier = Math.pow(10, 2);
			totalPoints = Math.round(totalPoints * multiplier) / multiplier;
		}
 		else{
 			var multiplier = Math.pow(10, 2);
			totalPoints = Math.round(totalPoints * multiplier) / multiplier;
 		}
 		if(currentComponent.feedbackType == 'rangedBased' || currentComponent.feedbackType == 'rangedBasedSubcategories'){
 			/*display total points accordingly*/
   		 	var stdScoreTypeTextElem = $("#stdSideCheckallScore_"+currentComponent.id).find('.stdScoreTypeText');
   		 	var stdScorePointTextElem = $("#stdSideCheckallScore_"+currentComponent.id).find('.stdScorePointText');
   		 	if(stdScoreTypeTextElem.length>0 && stdScorePointTextElem.length>0){
   		 		//var stdScoreTypeText = 'Feedback is calculated by the '+ currentComponent.feedbackScoringType +'  of all selections';
		 		var stdScorePointText = 'Total Score : '+ totalPoints +' pts.';
	
		 		/*if(totalPoints==0){
		 			stdScorePointText = '';
		 		}*/
		 			
		 		//stdScoreTypeTextElem.text(stdScoreTypeText);
		 		stdScorePointTextElem.text(stdScorePointText);
		 		
   		 	}
 		}
	},
	calculateSectionScore:function(currentComponent,section){
		var totalPoints = 0;
		var NAflag=false;
			if(currentComponent.notApplicableStudentResponse){     					    					
				totalPoints=currentComponent.awardMaximum?currentComponent.maxPoint :currentComponent.minPoint;		   						
			NAflag=true;
			rangeBasedNACheck = true;
		}
			if(!NAflag){
				totalPoints += section.calculatePoints(currentComponent.feedBackScoringSelectionType);	
			}
				
			var multiplier = Math.pow(10, 2);
			totalPoints = Math.round(totalPoints * multiplier) / multiplier;
			return totalPoints;
	},
	checkMapping : function(currentComponent) {
		//console.log("check mapping");
		var fullCmpId = currentComponent.pageIdPrefix + currentComponent.pageId
				+ currentComponent.idPrefix + currentComponent.id;
		/* go for compoenet branching check */
		var isFrequency = false;
		if (currentComponent.feedbackScoringType == "frequency") {
			isFrequency = true;
		}
		// check if component is branched
		var selectedOpts = [];
		var isCompBranched = false;
		var isComBranched=false;
		var isSectionBrnched=false;
		var sectionBranchedlen=0;
		var visibleSection=0;
		var validflag=0;
			for(i in currentComponent.sections){
					if(currentComponent.sections[i].showToStud || currentComponent.sections[i].showToStud==undefined){
						validflag =( currentComponent.sections[i].isStudentAnswered(currentComponent.sections[i]))?(validflag+1):validflag;
						visibleSection=visibleSection+1;
	  			}
			}
		if (currentComponent.isBranched
				&& currentComponent.sections.length == 1) {
			sectionBranchedlen=1;
			for (j in currentComponent.sections) {
				var currenrtSection = currentComponent.sections[0];
				var x = 0;
				for (x in currenrtSection.options) {
					var currentOption = currenrtSection.options[x];
					if (currentOption.studentResponse) {
						selectedOpts.push(currenrtSection.options[x].id);
					}
					
					this.setMappedEntities(fullCmpId, false, currentOption.id,
							parseFloat(currentOption.pointsValueEditor.text),
							isFrequency, currenrtSection);
				}
				var totalPoints = 0;
				if (this.feedbackType == 'rangedBasedSubcategories'
						|| this.feedbackType == 'rangedBased') {
					if(currentComponent.notApplicableStudentResponse){
						totalPoints = currentComponent.awardMaximum?currentComponent.maxPoint :currentComponent.minPoint;
					}else{
						totalPoints = currenrtSection
							.calculatePoints(currentComponent.feedBackScoringSelectionType);
					}
				}		
				
				this.setMappedEntities(fullCmpId, true, selectedOpts,
						totalPoints, isFrequency, currenrtSection);
			}
			isCompBranched = true;
			isComBranched=true;
		} else {// else section is branched
			if(!currentComponent.isBranched){
				var j = 0;
				for (j in currentComponent.sections) {
					sectionBranchedlen=(currentComponent.sections[j].isBranched)?sectionBranchedlen+1:sectionBranchedlen;
					//if (currentComponent.sections[j].id == this.sectionId) {
						if (currentComponent.sections[j].isBranched) {
							var currenrtSection = currentComponent.sections[j];
							var x = 0;
							for (x in currenrtSection.options) {
								var currentOption = currenrtSection.options[x];
								if (currentOption.studentResponse) {
									selectedOpts
											.push(currenrtSection.options[x].id);
								}											
								this.setMappedEntities(fullCmpId,false,currentOption.id,
												parseFloat(currentOption.pointsValueEditor.text),
												isFrequency, currenrtSection);
							}
							var totalPoints = 0;
							if (this.feedbackType == 'rangedBasedSubcategories'
									|| this.feedbackType == 'rangedBased') {
								if(currentComponent.notApplicableStudentResponse){
									totalPoints = currentComponent.awardMaximum?currentComponent.maxPoint :currentComponent.minPoint;
								}else{
									totalPoints = currenrtSection
										.calculatePoints(currentComponent.feedBackScoringSelectionType);
								}
								
							}		
							//console.log(33333)
							this.setMappedEntities(fullCmpId, true, selectedOpts,
									totalPoints, isFrequency, currenrtSection);
						}
						else
						{						
							if(!currentComponent.isStudentAnswered())
							{
								for(var index in question.branches){
								 var branch = question.branches[index]; 
								 for(var i in branch.pathMaps){										
									this.setResetFlag(branch, false,i);
								 }
							 }
							}
						}
					//}
					
				}
				isCompBranched = true;
				isSectionBrnched=true;
			}
			
		}
		if(currentComponent.isBranched && currentComponent.sections.length>1){
			 sectionBranchedlen=1;
			 var scoreComp=0;
			 var totalPoints = 0;
			 for(var index in question.branches){
				 var branch = question.branches[index]; 
				 this.setResetFlag(branch, false);
			 }
				for (j in currentComponent.sections) {
					var currenrtSection = currentComponent.sections[j];
					var x = 0;
					for (x in currenrtSection.options) {
						var currentOption = currenrtSection.options[x];
						if (currentOption.studentResponse) {
							selectedOpts.push(currenrtSection.options[x].id);
						}
						
						this.setMappedEntities(fullCmpId, false, currentOption.id,
								parseFloat(currentOption.pointsValueEditor.text),
								isFrequency, currenrtSection);
					}
					if (this.feedbackType == 'rangedBasedSubcategories'
							|| this.feedbackType == 'rangedBased') {
						if(currentComponent.notApplicableStudentResponse){
							totalPoints += currentComponent.awardMaximum?currentComponent.maxPoint :currentComponent.minPoint;
						}else{
							totalPoints += currenrtSection
								.calculatePoints(currentComponent.feedBackScoringSelectionType);
						}
					}					
					
						this.setMappedEntities(fullCmpId, true, selectedOpts,
							totalPoints, isFrequency, currenrtSection);											
						
					}
				
				isCompBranched = true;
				isComBranched=true;		
		}
		 //for multiCriteria branching
		 var bId = 0;
		 for(bId in question.branches){
			 if(question.branches[bId].criteria == "multi" && (question.branches[bId].cId == fullCmpId || question.branches[bId].cId_2 == fullCmpId)){
				 util.checkMultiCriteriaMapping(question.branches[bId]);
				 isCompBranched = true;
			 }
		 }
		 if(currentComponent.isBranched){
				isComBranched=true;
				isSectionBrnched=false;
			}
		
			
		if(isCompBranched){
			question.updatePages();
			 //console.log("is compo andwer"+currentComponent.isStudentAnswered());
			if(currentComponent.isStudentAnswered()){				
				question.actvPageShowHide(true);
			}else{
				if(visibleSection==validflag){					
					question.actvPageShowHide(true);
				}else{
					for(var index in question.branches ){
						var branch=question.branches[index];
						if(branch.cId==fullCmpId && branch.criteria == "single"){
							//this.setResetFlag(branch, false);
							for(var index in question.branches){
								 var branch = question.branches[index]; 
								 for(var i in branch.pathMaps){
									this.setResetFlag(branch, false,i);
																	
								 }
							 }
						}
					}
					question.actvPageShowHide(false);
				}
				
			}
		}
		 if( currentComponent.feedbackType!="standard"){
			 if(isComBranched && currentComponent.isStudentAnswered()){
				 $("#stdSideCheckallScore_"+currentComponent.id).css("display","block");
				 this.displayTotalScoreStudentSide(currentComponent); 
			 }else{
				$("#stdSideCheckallScore_"+currentComponent.id).css("display","none"); 				
				for(var index in question.branches){//why this block code? 
					 var branch = question.branches[index]; 
					 for(var i in branch.pathMaps){
						//this.setResetFlag(branch, false,i);// commented the line for issue(1466)  Check All That Apply: Section to Section Branching: Branched question is vanishing,if we navigate b/w the questions
														
					 }
				 }
			 }
	    	
	   	 var j = 0;
			for (j in currentComponent.sections) {
				var secId=0;
				var score=0;
				secId= currentComponent.sections[j].componentIdPrefix+currentComponent.sections[j].componentId+currentComponent.sections[j].idPrefix+currentComponent.sections[j].id;
				score=this.calculateSectionScore(currentComponent,currentComponent.sections[j]);
				if (currentComponent.sections[j].id == this.sectionId) {
					if (currentComponent.sections[j].isBranched) {
						var oldSection = currentComponent.sections[j];
						 
						
		   				var scoreDiv='<div>'+score+'</div>';
		   				if(score == 0)
		   				{						
		   				//	$("#sectionDivScore_"+secId).text("");
		   				}
		   				else
		   				{	if(isSectionBrnched){
		   					for(var index in question.branches){
		   					var branch = question.branches[index];
		   					if (branch.mappingIndicator == "answerOption")
		   						{
		   							$("#sectionDivScore_"+secId).text("");
		   						}
		   					else
		   						{		   						
		   							$("#sectionDivScore_"+secId).text("Section Score: "+score+" pts.");
		   							$("#sectionDivScore_"+secId).css("float","left")
		   						}
		   					}
		   					
		   					}
		   				}
		   				if(oldSection.isStudentAnswered()){
		   					//console.log(secId+"111")
							//$("#"+fullCmpId).find(".secScore").css("display","block");
		   					$("#sectionDivScore_"+secId).css("display","block");	
		   				}else{
		   					//$("#"+fullCmpId).find(".secScore").css("display","none");
		   					$("#sectionDivScore_"+secId).css("display","none");
		   					//console.log(secId)
		   				}
					}
					
				}
				else
					{						
						if(score==0)
						$("#sectionDivScore_"+secId).css("display","none");
					}
				
			}
	     }

		question.updateProgressBar();
		
	},
	displaySectionScore:function(currentComponent){
		for (j in currentComponent.sections)
		{
		var score=this.calculateSectionScore(currentComponent,currentComponent.sections[j]);
		var secId= currentComponent.sections[j].componentIdPrefix+currentComponent.sections[j].componentId+currentComponent.sections[j].idPrefix+currentComponent.sections[j].id;
		if(score == 0)
		{
			
			$("#sectionDivScore_"+secId).text("");
		}
		else
		{
			if(currentComponent.sections[j].isBranched){
				for(var index in question.branches){
   					var branch = question.branches[index];
   					if (branch.mappingIndicator == "answerOption")
   						{
   							$("#sectionDivScore_"+secId).text("");
   						}
   					else
   						{
   							$("#sectionDivScore_"+secId).text("Section Score: "+score+" pts.");
   							$("#sectionDivScore_"+secId).css("float","left")
   						}
   					}
			}
		
		}	
	}
	},
	setMappedEntities:function(cId, flag, optId, pointVal, isFrequency, currenrtSection){
	   	 for(var index in question.branches){
	   		var secId = question.branches[index].sectionId;
	   	 	var compId = question.branches[index].cId;
	   	 	
	   	 	var isEleBranched = compId == cId ? currenrtSection != undefined ? secId == currenrtSection.id ? true : false : true : false;
		   	 if(secId==0){
			 		isEleBranched=true;	
			 	}
				
		 	if(isEleBranched){
		    	   var branch = question.branches[index];		    	   
		    	   this.setResetFlag(branch, false);		    	   
		    	   for(var i in branch.pathMaps){
			    	   if(!flag){
		    				if(branch.pathMaps[i].id == optId){		    					
		    					this.setResetFlag(branch, flag, i); 
		    				}		    				
		    			}else{
			    			if (branch.mappingIndicator == "answerOption"
									|| isFrequency) {
								var pathMapOPtion = branch.pathMaps[i].idRange
										.slice(0);
								if(jQuery.inArray( branch.pathMaps[i].id,pathMapOPtion ) == -1 ){
									pathMapOPtion.push(branch.pathMaps[i].id);
								}
								//pathMapOPtion.push(branch.pathMaps[i].id);
								pathMapOPtion = pathMapOPtion.filter(function(val) { return val !== null; });
								if (optId.length == pathMapOPtion.length) {
									// if all options are checked related to pathmap
									// then show all paths related to that pathmap
									
									if (JSON.stringify(optId.sort()) == JSON.stringify(pathMapOPtion.sort())) {
										this.setResetFlag(branch, true, i);
										
									}
								}
							}else{ /* for score range */
					  	    	 for(var i in branch.pathMaps){
					  	    		 var minVal = parseFloat(branch.pathMaps[i].range[0].minRangeEditor.text);
					  	    		 var maxVal = parseFloat(branch.pathMaps[i].range[0].maxRangeEditor.text);
					  	    		//if any option is selected and its score fall into any criteria then setFlag					  	    		 
					  	    		if((optId.length != 0) && (pointVal >= minVal && pointVal <= maxVal)){
					  	    			if(currenrtSection.isStudentAnswered() && (currenrtSection.showToStud || currenrtSection.showToStud==undefined))// && currenrtSection.showToStud
					  	    				this.setResetFlag(branch, flag, i);		
					  	    			else
					  	    				this.setResetFlag(branch, false, i);
					    			 }
					  	    		else
				  	    			{
				  	    				this.setResetFlag(branch, false, i);					  	    			
				  	    			}
					  			  }
					  	    	
					  	    }
		    			}
		    	   }
	   	     }
		 }
    },
    setResetFlag : function(branch, flag, index){    	
    	 for ( var i in branch.pathMaps) {
 			var loopCondition  =  (!flag && i == index) ? true : (flag && i == index)? true : false; 
 			
 			if(loopCondition){
 				 for(var j in branch.pathMaps[i].paths){
 					var partId, compId, secId;
 					partId = branch.pathMaps[i].paths[j].partId;
 					compId = branch.pathMaps[i].paths[j].compId;
 					secId  = branch.pathMaps[i].paths[j].sectionId;
					isSubCategory=(secId!=null)?(secId.split("_")[0]=="s")?true:false:false;
 					/* loop from pages to compoenents to sections */
 					if(partId != null){
 						for(var index1 in question.pages){
 							if(partId == question.pages[index1].id){
 								if(question.pages[index1].isBranchDest){
 									question.pages[index1].showToStud = flag;										
 								} else{
 									for(var index2 in question.pages[index1].components){
 										var comp = question.pages[index1].components[index2];
 										if(compId == comp.id){
 											if(comp.isBranchDest){
 												//if(comp.id==2)
 												//	console.log("Component2------"+ flag);
 												comp.showToStud = flag;	  												
 											} else{
 												if(comp.sections != undefined && !isSubCategory){
 													for(var index3 in comp.sections){
 														if(comp.sections[index3].id == secId){
 															if(comp.sections[index3].isBranchDest){
 																comp.sections[index3].showToStud = flag;
 															}
 														}
 													}
 												}else{
													if(comp.sections != undefined){
															for(var index3 in comp.sections){
																var subCat=secId.split("_")[1];
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
	/**
	  * Selects the current option as student selected response
	  */
	disableStudentSelection:function(flag){
		if(flag){
			$("#checkAnswer_"+this.editor.id).prop('disabled', true);
			$("#checkAnswer_"+this.editor.id).prop("checked", false);
			this.studentResponse=true;
		}
		else{
			$("#checkAnswer_"+this.editor.id).prop('disabled', false);
			//$("#checkAnswer_"+this.editor.id).prop("checked", false);
			this.studentResponse=false;
		}
    },
	
	/**
	 * shows the option is selected by student or not
	 */
	showAnswers:function(){		
		 if(EZ.mode==MODE_TEST){
			 if(this.studentResponse!=null){
				 $("#checkAnswer_"+this.editor.id).prop('checked', true);
			 }else{
				 $("#checkAnswer_"+this.editor.id).prop('checked', false);
			 }
			 
		 }else if(EZ.mode==MODE_PREVIEW){
			 $("#showCorrect_"+this.editor.id).fadeOut("slow");
			 if(this.studentResponse!=null){
				 $("#option"+this.editor.id).prop('checked', true);
			 }else{
				 $("#option"+this.editor.id).prop('checked', false);
			 }
		 }
	},
	/**
	 * shows the current option is marked as right/wrong by author in design mode
	 */
	showCorrectAnswers:function(){
			$("#showCorrect_"+this.editor.id).fadeIn("slow");
			$("#showCorrect_"+this.editor.id).css("visibility","visible");
	},
	/**
	 * Layouts in Check my work mode
	 * @returns {String}
	 */
	CheckMyWorkLayout:function(){	
		 var css = this.right?"correct":"wrong";
		 var checkproperty=this.studentResponse?"checked='checked'":"";
		 var hideanswer=this.studentResponse?"style='visibility:visible'":"style='visibility:hidden'";
		 var htmlelement='';
		 htmlelement +='<div class="prevQuestOpts">';
		 htmlelement+='<div class="colPageSection">';
		 htmlelement +='<div '+hideanswer+' class="answerTick '+css+'"></div>';
		 htmlelement +='<input id="checkAnswer_'+this.editor.id+'"  name="cc" type="checkbox" '+checkproperty+' disabled>';
		 htmlelement +='</div>';
		 
		 htmlelement +='<div class=" colPageSection secondColPic">';
		
		 htmlelement +='<label for="checkAnswer_'+this.editor.id+'"><span class="pull-left lblLeft"></span></label><div class="stdQueLabel">'+this.editor.text+'</div>';
		 if(this.type=='stud' && this.studentResponse && this.studentEditor.text!=''){
    		 htmlelement+='&nbsp;<input type="text" maxlength="'+this.studentEditor.maxLength+'" value="'+this.studentEditor.text+'" id="student_'+this.studentEditor.id+'" readonly/>';
    	 }
		 htmlelement +='</div>';
		 htmlelement +='</div>';
		 htmlelement+='<div class="clear"></div>';
		 return htmlelement;
	},
	/**
	 * Layouts in Post submission review mode
	 * @returns {String}
	 */
	postSubmissionReviewLayout:function(answerOptionOrientation, acceptAnyAnswer, feedbackType,showPointsToStudents,feedbackScoringType, hideSubCategoriesfromStudents, notApplicable){
		
		 var css = this.right?"correct":"wrong";
		 var checkproperty=this.studentResponse && !notApplicable? "checked='checked'":"";
		 var hideanswer=this.studentResponse && !acceptAnyAnswer?"style='style='visibility:visible'":"style='visibility:hidden'";

		 var htmlelement='';
		 var text = this.editor.text;
		 text = text.replace(/\Â/g," ");
		
		 var styleClassMain=(answerOptionOrientation==3)?"column-2-main":(answerOptionOrientation==2)?"defaultMCOptionPreview-main":"";
         htmlelement +='<div class="prevQuestOpts '+styleClassMain+'">';
		 htmlelement +='<div '+hideanswer+' id="showCorrect_'+this.editor.id+'" class="answerTick '+css+'" ></div>';
		 htmlelement+='<div class="colPageSection">';
		
		 htmlelement +='<input id="option'+this.editor.id+'" name="cc" type="checkbox" disabled '+checkproperty+'>';
		 htmlelement +='</div>';
		 var styleClass=(answerOptionOrientation==3)?"column-2 column-2-postsubm":(answerOptionOrientation==2)?"defaultMCOptionPostSubmission":"";
		 var stqLblClass = "";
		 if(answerOptionOrientation!=1){
			 htmlelement+='<div class="colPageSection '+styleClass+'">';
			 stqLblClass = "stdQueLabel-column-2";
		 }
		 else
			 htmlelement+='<div class="colPageSection secondColPic">';
		 
		 /* function to render images and video in layout */
		 var editorText = util.getImageLayout(this.editor.text);
             editorText = util.getVideoLayout(editorText);

             var pointText=" ";
      		 pointText = this.pointsValueEditor.text;
      		 
      		 if(pointText != ""){
      			 pointText = parseFloat(pointText);
      			 pointText +=(pointText>1)?" pts.":" pt.";
      		 }
               
               
               if(!showPointsToStudents)
            	   pointText="";
               
		 htmlelement +='<label for="option'+this.editor.id+'"><span class="pull-left lblLeft"></span></label><div class="stdQueLabel '+stqLblClass+'">'+editorText+' <span class="boldclass">'+pointText+'</span>';
		 if(this.type=='stud'&& this.studentResponse && this.studentEditor.text!=''){
    		 htmlelement+='&nbsp;<input type="text" maxlength="'+this.studentEditor.maxLength+'" value="'+this.studentEditor.text+'" id="student_'+this.studentEditor.id+'" readonly/>';
    	 }		 
		 
		 if(this.studentResponse && this.feedback.text!='' && this.feedback.text!='&nbsp;' && !notApplicable){
			 var feedPdiv = '';
			 if(styleClassMain != "defaultMCOptionPreview-main"){
				 feedPdiv = '</div><div class="stdQueLabelFeedback">';
			 }
			 htmlelement += '<div class="clear"></div>';
			 htmlelement += feedPdiv+'<label class="feedbackLinkPosition"><a class="feedClose">Feedback</a></label>';
			 htmlelement +=' <div style="display: none; margin-top:20px;" class="feedBackOpen '+styleClass+'">';
			 var feedbackText = this.feedback.text;
			 feedbackText = feedbackText.replace(/\Â/g," ");
			 var feedText = util.getImageLayout(feedbackText);
             feedText = util.getVideoLayout(feedText);
			 htmlelement +=' <strong>Feedback:</strong>'+feedText;
			 htmlelement +='</div>';
		 }else{
		 }
		 htmlelement +='</div>';
		 htmlelement +='</div>';
		 htmlelement +='</div>';
		 
		 return htmlelement.replace(/&nbsp;/gi,'');
	 },
	 
	 /**
		 * check if option is filled
		 * 
		 */
	 isOptionFilled:function(){
		 $("#htmlToTextConvertor").html(this.editor.text);
		 var optionText =  $("#htmlToTextConvertor").text();
		 if(optionText.length<=0){
			return false; 
		 }else{
			return true;
		}		 
	},
	/**
     * check if ponit editor is filled
     */
	  isPointValueFilled:function(){
	  	$("#htmlToTextConvertor").html(this.pointsValueEditor.text);
			var optionText = $("#htmlToTextConvertor").text();
			if(optionText.length<=0) {
			    return false; 
			  }else{
			    return true;
		  }	
	  },
		
	 /**
	 * check if studentOption is filled
	 * 
	 */
	 isStudentOptionFilled:function(){
			  if(this.type=='stud'){  
			  if((this.studentEditor.text).length>0){
				 return true;	
			}
		 }
		return false;  
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
	
	filter:function(event){
		util.removePasteImage(event.originalEvent.clipboardData,event);
	}

}; 
//TODO:[debasmita:] student text editor?