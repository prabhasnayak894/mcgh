/* ========================================================================
 * PartInfo: Object Declaration
 * @author: Debasmita Sahoo
 * ========================================================================
 * Purpose of this object to have properties of respective page information. 
 * ======================================================================== */
var PartInfo = function(options) {
	this.id = null;
	this.pageId=null;
	this.enabled = false;
	this.visited = false;
	this.idPrefix = null;
	this.active=false;
	this.name = null;
	$.extend(this, options);
	this._markActive = PartInfo.BindAsEventListener(this,this.markActive);
};
// add event helper method
PartInfo.addEvent = function(oTarget, sEventType, fnHandler, args) {
	$("#" + oTarget).unbind(sEventType);
	$("#" + oTarget).bind(sEventType, args, fnHandler);
};
// use call to borrow context
PartInfo.BindAsEventListener = function(object, fun) {
	return function(event) {
		if(object.enabled==false){
			return;
		}else{
			event.stopImmediatePropagation();
			return fun.call(object, (event || window.event));
		}
		
	};
};
PartInfo.prototype = { 
		 markActive: function(){
			 if($(".reveal-modal").css('visibility') != 'visible'){
				 var i=0;
				 for(i in  question.pages){
					 if(question.pages[i].id==this.pageId){
						 question.setActivePage(question.pages[i]);
					 }
				 }
				 var i=0;
				 for(i in  question.progressBar.parts){
					 if(question.progressBar.parts[i].id==this.id){
						 question.progressBar.parts[i].active=true;
					 }else{
						 if(question.progressBar.parts[i].active==true){
							 question.progressBar.parts[i].visited=true;
							 question.progressBar.parts[i].active=false;
						 }
						
					 }
				 }
	
				 $("#top_paggerId").html(question.pageLayout("top"));
				 $("#paggerId").html(question.pageLayout("bottom"));
				 question.afterPageLayout();
				 var position=$(".saveNexit1").position();
				 if(position!=undefined)
				 {
					 window.scrollTo(0,(position.top+60));
					 parent.scrollTo(0,(position.top+200));
				 }
				 var myHeight= 1000;
				 var ht = 0;
				 if(question.mode==MODE_TEST)
				 {
					 ht = $("#formToolStudentId").height()+150;
					 //ht=jQuery(this).height();
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
					doResize();
				 
			 }
	     },
	     setEnable:function(flag){
	    	 this.enabled=flag;
	     },
	     layout:function(){
	    	 var htmlelement='';
	    	 var css=this.enabled?"partEnabled":"partDisabled";
	    	 css +=(this.enabled && this.visited)?" partVisited":" ";
	    	 css +=(this.enabled && this.active)?" partActive":" ";
	    	 var dissabled = this.enabled?"":"disabled";	   
	    	 
	    	 //var title = this.name.replace(/"/g, '\\"').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/<br>/g,'');
	    	 /*remove all tags from title and extract only text */
	    	 var titleDiv = $("<div class='dummyTitleDiv'>");
			 var editorText = this.name;
			 try{
				  editorText = decodeURIComponent(escape(editorText));
				}catch(exp){
				  console.log(exp);
				}
	    	 titleDiv.html(editorText);
	    	 var title = titleDiv.text();
	    	 htmlelement +='<div  id='+this.idPrefix+this.id+' title="'+title+'" class="colPageSection part '+css+'" '+dissabled+'>'+this.pageId+'</div>';
	    	 return htmlelement;
	     },
	     afterLayout : function(){
	    	 if(this.active){	    		
	    		 var left=0;	 
	    		 var allParts = question.pages.length;	    		 
	    		 var devider = allParts%19;	    		 
	    		 var newsection = allParts - devider;
	    		 devider = newsection>=this.id?19:devider;	    		
	    		 var mod = parseInt((this.id)/20);	    		 
	    		 if(devider < 19)
	    			 left = parseInt((this.id)/19)*760;	
	    		 else
	    			 left = (mod-1)*760 + (devider*40);
	    		
		    	 $("#topscroll").scrollLeft(left);
				 $("#bottomscroll").scrollLeft(left);
				 $(".bubble").html(this.name);				 
				 if(question.pages.length>1)
				 {
	                 var bubbleLeft = $("#top"+this.id).position().left;
	                 bubbleLeft = ($("#top"+this.id).position().left - $(window).scrollLeft()) + 17;
	                 bubbleLeft = ( $('#paggerId').find('.navigation').size() == 0 ) ? bubbleLeft : (bubbleLeft+25)-left;
	                
					 $(".bubble").css("left",bubbleLeft);
				}
	    	 }
	    	 
	    	 ProgressBar.addEvent("top"+this.id,"click",this._markActive);
	    	 ProgressBar.addEvent("bottom"+this.id,"click",this._markActive);
	     },
};