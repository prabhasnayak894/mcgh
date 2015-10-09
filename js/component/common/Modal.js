/* ========================================================================
 * Modal: Object Declaration
 * @author: Irfan Tamboli
 * ========================================================================
 * Purpose of this object to show jquery revel modal pop-up
 * when ever required in form-tool application. This modal pop-up
 * have ok button callback & cancel button callback.
 * ======================================================================== */

var Modal = function(options){ 
	this.id = null;
	this.elementId = null;
	this.headingText = null;
	this.containtText = null;
	
	this.okActionEvent=null;
	this.cancelActionEvent=null;
	this.closeActionEvent = null;
	this._confirmationOk = Modal.BindAsEventListener( this, this.confirmationOk );
	this._confirmationCancel = Modal.BindAsEventListener( this, this.confirmationCancel );
	this._closeHelpModal = Modal.BindAsEventListener(this,this.closeHelpModal);
	$.extend(this, options);
};

Modal.addEvent = function(oTarget, sEventType, fnHandler,args) {
	$("#"+oTarget).unbind(sEventType);
	$("#"+oTarget).bind(sEventType,args,fnHandler);
};

Modal.BindAsEventListener = function(object, fun) {
    return function(event) {
    	event.stopImmediatePropagation();
        return fun.call(object, (event || window.event));
    };
};

Modal.prototype = {
		/**
		 * gets id of modal
		 * @returns {String} id
		 */
		getId: function( ){
            return this.id;  
	     },
	     /**
			 * sets id of modal
			 * @param id
			 */
	     setId: function(id){
	         this.id =  id;
	     },
	     /**
			 * gets  element id of modal
			 * @returns {String} elementId
			 */
	     getElementId : function(){
	    	 return this.elementId;
	     },
	     /**
			 * sets element id of modal
			 * @param elementId
			 */
	     setElementId : function(elementId){
	    	 this.elementId = elementId;
	     },
	     /**
			 * gets  heading text of modal
			 * @returns {String} headingText
			 */
	     getHeadingText : function(){
	    	 return this.headingText;
	     },
	     /**
			 * sets  heading text of modal
			 * @param headingText
			 */
	     setHeadingText : function(headingText){
	    	 this.headingText = headingText;
	     },
	     /**
			 * gets  body containt text of modal
			 * @returns {String} containtText
			 */
	     getcontaintText : function(){
	    	 return this.containtText;
	     },
	     /**
			 * sets  body containt text of modal
			 * @param containtTextt
			 */
	     setContaintText : function(containtText){
	    	 this.containtText = containtText;
	     },
	     /**
			 * Create new warning modal pop-up and appends its HTML 
			 * to formToolCanvasId. It will add heading text for warning pop-up & body text 
			 * assigned in headingText & containtText respectively.
			 * 
			 */
	     getWarningModal: function(closeBranch){
	     	if(!$('#warningModalId').length){
	     		$("#formToolCanvasId").append(this.getWarningModalLayout(closeBranch));
	     	}
		   	 var topPos=200+"px";
	    	 $(".reveal-modal").css('top',topPos);
    
	    	 if(this.headingText != null && null != this.containtText){
	    		 $("#warningModalId").find("h3").html(this.headingText);
		         $("#warningModalId").find("p").html(this.containtText);
	    	 }
	    	 $("#modalDivId").show();
	    	 $('#warningModalId').reveal({
			     animation: 'none',                  
			     animationspeed: 300,                       
			     closeonbackgroundclick: true,
			     dismissmodalclass: 'close-reveal-modal'
			});
	    	 $("#cancelButtonId").hide();
			 $("#okButtonId").hide();
			 var closeAction = this.closeActionEvent;
	    	 $(".close-reveal-modal").bind("click",function(){
	    		
	    		 if(closeAction!=null ){
	    			 closeAction.call();
	      		}
	    		 $("#modalDivId").hide();
	    	 });
	     },
	     getWarningModalMerge: function(){
		     	if(!$('#warningModalId').length){
		     		$("#formToolCanvasId").append(this.getWarningModalMergeLayout());
		     	}
		     	 var topPos=200+"px";
		    	 $(".reveal-modal").css('top',topPos);
		    	 if(this.headingText != null && null != this.containtText){
		    		 $("#warningModalId").find("h3").html(this.headingText);
			         $("#warningModalId").find("p").html(this.containtText);
		    	 }
		    	 $("#modalDivId").show();
		    	 $('#warningModalId').reveal({
				     animation: 'none',                  
				     animationspeed: 300,                       
				     closeonbackgroundclick: true,             
				     dismissmodalclass: 'close-reveal-modal'
				});
		    	 $("#cancelButtonId").hide();
				 $("#okButtonId").hide();
				 var closeAction = this.closeActionEvent;
		    	 $(".close-reveal-modal").bind("click",function(){
		    		
		    		 if(closeAction!=null ){
		    			 closeAction.call();
		      		}
		    		$("#modalDivId").hide();
		    	 });
		     },
	     getWarningModalForStudent: function(){	
	    	 if(!$('#warningModalId').length){
	    		 $("#formToolStudentId").append(this.getWarningModalLayout());
	    	 }
	    	 var topPos=($(parent).scrollTop())+"px";
	    	 $(".reveal-modal").css('top',topPos);
	    
	    	 if(this.headingText != null && null != this.containtText){	
	    		 $("#warningModalId").find("h3").html(this.headingText);
		         $("#warningModalId").find("p").html(this.containtText);
	    	 }
	    	 this.afterWarningModalLayout();
	    	 $("#modalDivId").show();
	    	 $('#warningModalId').reveal({
			     animation: 'fadeAndPop',                  
			     animationspeed: 0,                       
			     closeonbackgroundclick: true,             
			     dismissmodalclass: 'close-reveal-modal'    
			});
	    	 $("#cancelButtonId").hide();
			 $("#okButtonId").hide();
	    	 var closeAction = this.closeActionEvent;
	    	 $(".close-reveal-modal").bind("click",function(){
	    		 $("#modalDivId").hide();
	    		 if(closeAction!=null ){
	    			 closeAction.call();
	      		}
	    	 });
	    	
	     },
	     getConfirmationModal : function(closeBranch){
	    	 this.getWarningModal(closeBranch);
	    	 this.afterWarningModalLayout();
	    	 $("#warningModalId").css('top','300px');
	    	 $("#cancelButtonId").show();
			 $("#okButtonId").show();
			 $("#okButtonId").focus();
	     },
	     getConfirmationModalImport : function(){
	    	 this.getWarningModal();
	    	 this.afterWarningModalLayout();
	    	 $("#warningModalId").css('top','300px');
	    	 $("#okButtonId").text("Ok");
	    	 $("#cancelButtonId").show();
			 $("#okButtonId").show();
			 $("#okButtonId").focus();
	     },
	     getConfirmationModalMerge : function(){
	    	 this.getWarningModalMerge();
	    	 this.afterWarningModalLayout();
	    	 $("#warningModalId").css('top','300px');
	    	 $("#cancelButtonId").show();
			 $("#okButtonId").show();
			 $("#okButtonId").focus();
	     },
	     
	     /**
			 * Create layout for warning modal pop-up
			 * return its HTML
			 * @returns {String} HTML layout
			 */
	     getWarningModalLayout : function(closeBranch){
	     	var buttonText = "Yes, delete";
	     	if(closeBranch == "closeBranch"){
	     		buttonText = "Yes, Close";
	     	}
	    	 var html = '';
	    	 html += '<div id="warningModalId" class="reveal-modal" style="max-height:300px; overflow-y:auto;">';
	    	 html += '   <br>';
	    	 html += '     	<h3>Warning ! </h3>';
	    	 html += '   		 <br>';
	    	 html += '    		<p>Are you sure ? This will erase your content and cannot be undone. </p>';
	    	 html += '    			<div style="padding: 40px 0px 0px 100px">';
	    	 html += '     				<button  id="cancelButtonId" class="btn-cancel" type="button" tabindex="2">Cancel</button>';
	    	 html += '					<button id="okButtonId" class="btn-ok" type="button" tabindex="1">'+buttonText+'</button>';
	    	 html += '   			 </div>';
	         html += '     <a class="close-reveal-modal">&#215;</a>';
	         html += '</div>';
	        return html;
	     },
	     getWarningModalMergeLayout : function(){
	    	 var html = '';
	    	 html += '<div id="warningModalId" class="reveal-modal" style="max-height:300px; overflow-y:auto;">';
	    	 html += '   <br>';
	    	 html += '     	<h3>Warning ! </h3>';
	    	 html += '   		 <br>';
	    	 html += '    		<p>Are you sure ? This will erase your content and cannot be undone. </p>';
	    	 html += '    			<div style="padding: 40px 0px 0px 100px">';
	    	 html += '     				<button  id="cancelButtonId" class="btn-cancel" type="button" tabindex="2">Cancel</button>';
	    	 html += '					<button id="okButtonId" class="btn-ok" type="button" tabindex="1">Merge</button>';
	    	 html += '   			 </div>';
	         html += '     <a class="close-reveal-modal">&#215;</a>';
	         html += '</div>';
	        return html;
	     },
	     /**
	      * Function to bind events on ok button
	      * & cancel button.
	      * */
	     afterWarningModalLayout : function(){
	    	 Modal.addEvent("okButtonId","click",this._confirmationOk);
	    	 Modal.addEvent("cancelButtonId","click",this._confirmationCancel);
	     },
	     /**
	      * Function will called when user click ok button 
	      * on warning modal
	      * */
	     confirmationOk : function(){
     		$('#warningModalId').trigger('reveal:close');
     		$("#warningModalId").remove();
     		if(this.okActionEvent!=null){
     			this.okActionEvent.call();
     		}
     		$("#modalDivId").hide();
	     },
	     /**
	      * Function will called when user click cancel button 
	      * on warning modal
	      * */
	     confirmationCancel : function(){
	    	 $('#warningModalId').trigger('reveal:close');
	     	 $("#warningModalId").remove();
	     	if(this.cancelActionEvent!=null){
     			this.cancelActionEvent.call();
     		}
	     	$("#modalDivId").hide();
	     },
	     /**
			 * Create new help modal pop-up and appends its HTML 
			 * to formToolCanvasId. It will add heading text for warning pop-up & body text 
			 * assigned in headingText & containtText respectively.
			 * 
			 */
	     openHelpModal : function(){
	    	 if(!$('#helpModalId').length){
	    		 $("#formToolCanvasId").append(this.getHelpModalLayout());
	    	 }
	    	 this.afterHelpModalLayout();
	    	 $('#helpModalId').find("h3").html(this.headingText);
	    	 $('#helpModalId').find("p").html(this.containtText);
	    	 $("#modalDivId").show();
	    	 $('#helpModalId').reveal({
			     animation: 'none',                  
			     animationspeed: 300,                       
			     closeonbackgroundclick: true,             
			     dismissmodalclass: 'close-reveal-modal'    
			});
	    	 $(".close-reveal-modal").bind("click",function(){
	    		 $("#helpModalId").hide();
	    	 });
	     },
	     /**
			 * Create layout for help modal pop-up
			 * return its HTML
			 * @returns {String} HTML layout
			 */
	     getHelpModalLayout : function(){
	    	 var html  = '';
	    	 html+= '<div id="helpModalId" class="reveal-modal" style="height: 400px">';
	    	 html+= '	<br>';
	         html+= '		<h3>Help Header Text</h3>';
	         html+= '		<br>';
	         html+= '		<p>Help Body Containt Here</p>';
	         html+= '			<a id="closeModal" class="close-reveal-modal">&#215;</a >';
	         html+= '</div>';
	    	 return html;
	     },
	     /**
	      * Function to bind close event for help modal
	      * */
	     afterHelpModalLayout : function(){
	    	 Modal.addEvent("closeModal","click",this._closeHelpModal);
	     },
	     /**
	      * Function to remove help modal pop-up html from canvas.
	      * */
	     closeHelpModal : function(){
	    	 $("#helpModalId").remove();
	    	 $("#modalDivId").hide();
	     }
};
$( document ).on( 'keydown', function ( e ) {
    if ( e.keyCode === 27 ) { // ESC
        $("#modalDivId").hide();
    }
});
