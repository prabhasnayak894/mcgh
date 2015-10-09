var GTCommon = function(options){ 
	this.id=null;
	$.extend(this, options);
	this._showColorPicker = GTCommon.BindAsEventListener(this,this.showColorPicker);
	this._colorClickOk = GTCommon.BindAsEventListener(this,this.clickOk);
	this._colorClickCancel = GTCommon.BindAsEventListener(this,this.clickCancel);
	this._clickPallet = GTCommon.BindAsEventListener(this,this.clickPallet);
};

GTCommon.addEvent = function(oTarget, sEventType, fnHandler,args) {
	$("#"+oTarget).unbind(sEventType);
	$("#"+oTarget).bind(sEventType,args,fnHandler);
};

GTCommon.BindAsEventListener = function(object, fun) {
    return function(event) {
    	event.stopImmediatePropagation();
        return fun.call(object, (event || window.event));
    };
};
GTCommon.prototype = { 
		 getId: function( ){
             return this.id;  
	     },
	     setId: function(id){
	         this.id =  id;
	     },
	     colorPickerLayout : function(){
	    	 $('<ul class="dropdown-menu"  id="'+this.id+'" role="menu" aria-labelledby="dLabel"></ul>').insertAfter( "#font-colorJpicker" );
	    	this.afterColorLayout();
	     },
	     afterColorLayout : function(){
	    	 GTCommon.addEvent("font-colorJpicker","click",this._showColorPicker,{obj : this,flag : true});
	    	 GTCommon.addEvent("border-colorJpicker","click",this._showColorPicker,{obj : this,flag : false});
	    	 GTCommon.addEvent(this.id,"click",this._clickPallet);
	     },
	     showColorPicker : function(e){	    	 
	    	 $(".btn-group").removeClass("open");
	    	 if($("#"+this.id).is(":visible")){
	    		 for(var i=0;i<$.jPicker.List.length;i++){
 					$.jPicker.List[i].destroy();
 					$('span.jPicker').remove();
 				}
	    		 $('#'+this.id).hide();
	    	 }else{
	    		 $('#'+this.id).show();
	    		 $('#'+this.id).jPicker();
	    		 $("#typeOfPalletId").val(e.data.flag);
	    	 }
	     },
	     clickOk : function(){
	    	 var hexCode = $("#colorPickerValueId").val();
	 			$("#selectedColorValueId").val(hexCode);
	    	 for(var i=0;i<$.jPicker.List.length;i++){
					$.jPicker.List[i].destroy();
					$('span.jPicker').remove();
				}
	    	 $("#"+this.id).hide();
	     },
	     clickCancel : function(){
	    	 for(var i=0;i<$.jPicker.List.length;i++){
					$.jPicker.List[i].destroy();
					$('span.jPicker').remove();
				}
	    	 $("#"+this.id).hide();
	     },
	     clickPallet : function(event){
	    	 event.preventDefault();
	     },
	     drawRuler:function(){
	    	 $('#canvasTop').remove();
	    	 $('#canvasBottom').remove();
			
	    	 var canvasWidth = 800;
	    	 var canvasHeight = $("#canvasHeight").val();
			
	    	 var htmlContent = '<canvas id="canvasBottom" width='+(parseInt(canvasWidth)+20)+' height='+(parseInt(canvasHeight)+20)+'></canvas>';
	    	 htmlContent += '<canvas id="canvasTop" width='+parseInt(canvasWidth)+' height='+parseInt(canvasHeight)+'></canvas>';
	    	 $('#canvas-wrap').prepend(htmlContent);
			
	    	 var canvas = document.getElementById("canvasTop");
	    	 var canvas2 = document.getElementById("canvasBottom");
	    	 var ctx2 = canvas2.getContext("2d");
			
	    	 ctx2.beginPath();
	    	 ctx2.fillStyle="#eeeeee";
	    	 ctx2.fillRect(0,0,parseInt(canvasWidth)+20,20);
	    	 ctx2.fillRect(0,0,20,parseInt(canvasHeight)+20);
	    	 
	    	 ctx2.fillStyle='#666666';
		     ctx2.strokeStyle = '#999999';
	    	 for ( var i = 0; i < canvas.width; i += 5) {
			     var y = (i / 100 == parseInt(i / 100)) ? 0 : 13;
			     var pos50 = ((i % 50) == 0) && ((i % 100) != 0);
			     var pos5 = ((i % 5) == 0)&& ((i % 10) != 0)&& ((i % 50) != 0) && ((i % 100) != 0);
			     if (pos50) {
			    	 y = 8;
			     } else if (pos5) {
			    	 y = 16;			    	 
			     }
			     ctx2.moveTo(i + 20, y);
			     ctx2.lineTo(i + 20, 20);
			     ctx2.lineWidth = 0.5;
			     ctx2.textBaseline = "top";
			     ctx2.textAllign = "center"; 
			     if (i / 50 == parseInt(i / 50)) {
			    	 ctx2.fillText(i, i+20, 0);
			     }
			     ctx2.stroke();
	    	 }
			
	    	 for ( var i = 0; i < canvas.height; i += 5) {
	    		 var x = (i / 100 == parseInt(i / 100)) ? 0 : 13;
	    		 var pos50 = ((i % 50) == 0) && ((i % 100) != 0);
	    		 var pos5 = ((i % 5) == 0)&& ((i % 10) != 0)&& ((i % 50) != 0) && ((i % 100) != 0);
	    		 if (pos50) {
	    			 x = 8;
	    		 } else if (pos5) {
	    			 x = 16;
	    		 }
	    		 ctx2.moveTo(x, i + 20);
	    		 ctx2.lineTo(20, i + 20);
		    	 ctx2.lineWidth = 0.5;
	    		 ctx2.textBaseline = "top";
	    		 ctx2.textAllign = "center";
	    		 if (i / 50 == parseInt(i / 50)) {
	    			 ctx2.fillText(i, 0, i + 20);
	    		 }
	    		 ctx2.stroke();
	    	 }
	     }
};