/* ========================================================================
 * ProgressBar: Object Declaration
 * @author: Debasmita Sahoo
 * ========================================================================
 * Purpose of this object to have all parts of question with the progress 
 * indicator like active, visited, not visited, disabled etc. 
 * ======================================================================== */
var ProgressBar = function(options){ 
	this.id=null;
	this.idPrefix=null;
	this.noOfPagesToShow=19;
	this.parts=[];
	$.extend(this, options);
	this._moveRight = PartInfo.BindAsEventListener(this,this.moveRight);
	this._moveLeft = PartInfo.BindAsEventListener(this,this.moveLeft);
};

ProgressBar.addEvent = function(oTarget, sEventType, fnHandler,args) {
	$("#"+oTarget).unbind(sEventType);
	$("#"+oTarget).bind(sEventType,args,fnHandler);
};

ProgressBar.BindAsEventListener = function(object, fun) {
    return function(event) {
    	event.stopImmediatePropagation();
        return fun.call(object, (event || window.event));
    };
};
ProgressBar.prototype = { 
		 getId: function( ){
             return this.id;  
	     },
	     setId: function(id){
	         this.id =  id;
	     },
	     getParts: function( ){
             return this.parts;  
	     },
	     setParts: function(parts){
	         this.parts =  parts;
	     },
	     layout:function(){
	    	 var htmlelement='';
	    	 if(this.parts.length>1){
		    		 htmlelement +='<div class="bubble textleft"></div>';
	    		 htmlelement +='<div class="colPageSection ">';
	    		 if(this.parts.length>this.noOfPagesToShow){
	    			 htmlelement +='<div id="'+this.idPrefix+'_prevPart" class="colPageSection  navigation navDisabled">&laquo;</div>';
	    		 }
	    		 htmlelement +='<div id="'+this.idPrefix+'scroll" class="colPageSection  progressBar">';
				 var totalNoPages = parseInt((this.parts.length/this.noOfPagesToShow) + ((this.parts.length%this.noOfPagesToShow)>= 1? 1 : 0));
	    		 var widthOfContainer = (totalNoPages*this.noOfPagesToShow)*40;
	    		
	    		 widthOfContainer = widthOfContainer + 4;
	    		 
	    		 var widthOfLine = this.parts.length*40;
	    		 	    		 
				 htmlelement +='<div class="parts rowPageSection" style="width:'+widthOfContainer+';">';
		    	 htmlelement +='<div class=" progressBarBg" style="width:'+widthOfLine+';"></div>';
		    	 var i=0;
		    	 for(i in this.parts){
		    		htmlelement += this.parts[i].layout();
		    	 }
		    	 htmlelement +='</div>';
		    	 htmlelement +='</div>';
		    	 if(this.parts.length>this.noOfPagesToShow){
		    		 htmlelement +='<div id="'+this.idPrefix+'_nextPart" class="colPageSection  navigation">&raquo;</div>';
	    		 }
		    	 htmlelement +='</div>';
	    	 }
	    	
	    	 return htmlelement;
	     },
	     afterLayout : function(){
	    	 ProgressBar.addEvent("top"+"_prevPart","click",this._moveLeft);
	    	 ProgressBar.addEvent("top"+"_nextPart","click",this._moveRight);
	    	 ProgressBar.addEvent("bottom"+"_prevPart","click",this._moveLeft);
	    	 ProgressBar.addEvent("bottom"+"_nextPart","click",this._moveRight);
	    	 var i=0;
	    	 for(i in this.parts){
	    		this.parts[i].afterLayout();
	    	 }
	    	 var left =  $("#topscroll").scrollLeft();
	    	 var maxLeft=((this.parts.length-this.noOfPagesToShow)*40);
	    	 if(left>=maxLeft || (maxLeft-left)<10){
	    		 $("#top_nextPart").addClass("navDisabled");
	    		 $("#bottom_nextPart").addClass("navDisabled");
	    	 }else{
	    		 $("#top_nextPart").removeClass("navDisabled");
	    		 $("#bottom_nextPart").removeClass("navDisabled");
	    	 }
	    	 if(left<=0)
    		 {
	    		 $("#top_prevPart").addClass("navDisabled");
		    	 $("#bottom_prevPart").addClass("navDisabled");
    		 }
	    	 else
    		 {
	    		 $("#top_prevPart").removeClass("navDisabled");
		    	 $("#bottom_prevPart").removeClass("navDisabled");
    		 }
	     },
	     moveRight:function(){	    	 
	    	 var left =  $("#topscroll").scrollLeft() +( 40*19);
	    	 if(left>=((this.parts.length-this.noOfPagesToShow)*40)){
	    		 $("#top_nextPart").addClass("navDisabled");
	    		 $("#bottom_nextPart").addClass("navDisabled");
	    	 }else{
	    		 $("#top_nextPart").removeClass("navDisabled");
	    		 $("#bottom_nextPart").removeClass("navDisabled");
	    	 }
	    	 $("#topscroll").scrollLeft(left);
			 $("#bottomscroll").scrollLeft(left);			 
			 this.calculateBubbleLeft();
	    	  $("#top_prevPart").removeClass("navDisabled");
	    	  $("#bottom_prevPart").removeClass("navDisabled");
	    	 
	     },
	     moveLeft:function(){
	    	 var left =  $("#topscroll").scrollLeft() - (40*19);
	    	 if(left<=0){
	    		 left=0;
	    		 $("#top_prevPart").addClass("navDisabled");
	    		 $("#bottom_prevPart").addClass("navDisabled");
	    	 }else{
	    		 $("#top_prevPart").removeClass("navDisabled");
	    		 $("#bottom_prevPart").removeClass("navDisabled");
	    		 
	    		 if(left<40){
	    			 left=40;
	    		 }
	    	 }	    	 
	    	 $("#topscroll").scrollLeft(left);
	    	 $("#bottomscroll").scrollLeft(left);	    	 
	    	 this.calculateBubbleLeft();	    	
	    	 $("#top_nextPart").removeClass("navDisabled");
	    	 $("#bottom_nextPart").removeClass("navDisabled");
	    	 
	     },
	     calculateBubbleLeft:function(){
	    	 var activeId=1;
	    	 var i=0;
	    	 for(i in this.parts)
    		 {
	    		 if(this.parts[i].active==true){
	    			 activeId=this.parts[i].id;
	    			 break;
	    			 }
    		 
    		 }
	    	 var left =$("#topscroll").scrollLeft();	    		
	    	 var bubbleLeft = 17 + ((activeId-1)*40);
			 bubbleLeft = ( $('#paggerId').find('.navigation').size() == 0 ) ? bubbleLeft : (bubbleLeft+25)-left;
			 $(".bubble").css("left",bubbleLeft);
			 
			 if(bubbleLeft>780||bubbleLeft<40){
	    		 $(".bubble").css("visibility","hidden");
	    	 }else{
	    		 $(".bubble").css("visibility","visible");
	    	 }
	     }
	     
};