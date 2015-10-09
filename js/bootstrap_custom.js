/* http://github.com/mindmup/bootstrap-wysiwyg */
/*global jQuery, $, FileReader*/
/*jslint browser:true*/
(function ($) {
	'use strict';
	var readFileIntoDataUrl = function (fileInfo) {
		var loader = $.Deferred(),
			fReader = new FileReader();
		fReader.onload = function (e) {
			loader.resolve(e.target.result);
		};
		fReader.onerror = loader.reject;
		fReader.onprogress = loader.notify;
		fReader.readAsDataURL(fileInfo);
		return loader.promise();
	};
	$.fn.cleanHtml = function () {
		var html = $(this).html();
		return html && html.replace(/(<br>|\s|<div><br><\/div>|&nbsp;)*$/, '');

	};

	$.fn.wysiwyg = function (userOptions) {
		var editor = this,
			selectedRange,
			selectedCellRange,
			options,
			toolbarBtnSelector,
			updateToolbar = function () {
				if (options.activeToolbarClass) {
					$(options.toolbarSelector).find(toolbarBtnSelector).each(function () {
						var command = $(this).data(options.commandRole);
						var queryCommandState = null;
						try{
							queryCommandState = document.queryCommandState(command);
						} catch(err){}
						if (queryCommandState) {
							$(this).addClass(options.activeToolbarClass);
						} else {
							$(this).removeClass(options.activeToolbarClass);
						}
					});
				}
			},
			execCommand = function (commandWithArgs, valueArg) {
				var t = 0,colorFlag = false, indentOutdentSpace = 0, bgColor=false,lineSpace = 0;
				var commandArr = commandWithArgs.split(' '),
					command = commandArr.shift(),
					args = commandArr.join(' ') + (valueArg || '');
				
				/* check for chrome browser */
				var is_chrome = navigator.userAgent.toLowerCase().indexOf('chrome') > -1;
				
				/* custom code for table cell's range selection and functionality start */
				var isTableCellRange = false;
				if(selectedInstance != null){
					if(command =='border'){
						if(selectedInstance != null){
							if (selectedCellRange) {
								selectedInstance.selectCell(selectedCellRange[0],selectedCellRange[1],selectedCellRange[2],selectedCellRange[3]);
							}
						}
						if(selectedInstance.getSelected()){						
							if(currentSelectedCellId != ""){
								var selectedTable = selectedInstance.$table.parents(".spreadsheettableWrapper").attr("id").split("_")[1]
								var compnts = question.activePage.getComponents();
							    for(var ckey=0; ckey<compnts.length; ckey++){
							    	var comp = compnts[ckey];
							    	var compId = comp.pageIdPrefix+comp.pageId+comp.idPrefix+comp.id;
							    	if(compId == selectedTable){
							    		comp.applyBorders(args);
							    	}
							    }
							}
						}					
					} 
				}
				var range = window.getSelection().getRangeAt(0);
				
				var textAreaSel = "";
				var tblComponent = null;
				var currentSelectedCellId = "";
				var selectedCellComponentId = "";
				if( range.startContainer.className == "handsontableInput" || (is_chrome && range.startContainer.className == "handsontableInputHolder")) {
					var txtarea = $(".handsontableInput")[0];
				    var start = txtarea.selectionStart;
				    var finish = txtarea.selectionEnd;
				    textAreaSel = txtarea.value.substring(start, finish);
				    textAreaSel = customHtmlEncode(textAreaSel); // convert the special character text to html encoding form
				    
				    isTableCellRange = true;
				    
				    var cmpId = range.startContainer.parentElement.parentElement.getAttribute("data-compid");
				    var fullId = range.startContainer.parentElement.parentElement.id;
				    
				    if(is_chrome){
				    	cmpId = range.startContainer.parentElement.getAttribute("data-compid");
				    	fullId = range.startContainer.parentElement.id;
				    }
				    
				    var compnts = question.activePage.getComponents();
				    for(var ckey=0; ckey<compnts.length; ckey++){
				    	if(compnts[ckey].id == cmpId){
				    		tblComponent = compnts[ckey];
				    		break;
				    	}
				    }
				    
				    if(tblComponent != null){
				    	currentSelectedCellId = tblComponent.cellId;
				    	var selectedCell = $("#CellRepresentId_"+fullId).text();
				    	selectedCellComponentId = fullId+selectedCell;
				    	
				    	//add div wrapper if not present
				    	
				    	var activeDivWrapper = $("td#"+currentSelectedCellId).find("div[data-hold]");
				    	if(activeDivWrapper.length == 0){
				    		var updatedCellHtml = '<div data-hold="textWrapper">';
                            updatedCellHtml += textAreaSel;
                            updatedCellHtml += '</div>';
                            $("td#"+currentSelectedCellId).html(updatedCellHtml);
				    	}
				    }
				}
				/* custom code for table cell's range selection and functionality end */
				if(command =='justifycenter'){
					if(isTableCellRange){						
						if(currentSelectedCellId != ""){
							//var active_div = $('.htCore tbody tr').find('td.current div');
							//active_div.removeClass('is_left_align').removeClass('is_right_align').addClass('is_center_align');
							$('.htCore tbody tr').find('td#'+currentSelectedCellId+' div').removeClass('is_right_align').addClass('is_center_align');
							tblComponent.changeValById(tblComponent.cellHTMLCollection, currentSelectedCellId, "itsHtml", $("#"+currentSelectedCellId).html());
						}
					}					
				} else if(command =='justifyleft'){
					if(isTableCellRange){						
						if(currentSelectedCellId != ""){
							var active_div = $('.htCore tbody tr').find('td.current div');
							if(is_chrome){
								active_div = $('.htCore tbody tr').find('td#'+currentSelectedCellId+' div');
							}
							active_div.removeClass('is_center_align').removeClass('is_right_align').addClass('is_left_align');
						}
					}					
				} else if(command =='justifyright'){
					if(isTableCellRange){						
						if(currentSelectedCellId != ""){
							var active_div = $('.htCore tbody tr').find('td.current div');
							if(is_chrome){
								active_div = $('.htCore tbody tr').find('td#'+currentSelectedCellId+' div');
							}
							active_div.removeClass('is_left_align').removeClass('is_center_align').addClass('is_right_align');
						}
					}					
				} else if(command =='foreColor'){
					args = $("#selectedColorValueId").val();
					colorFlag = true;					
					/* custom code for table cell's start */
					if(isTableCellRange){						
						if(currentSelectedCellId != ""){
							var updated_html = "";
							var active_div = $('.htCore tbody tr').find('td#'+currentSelectedCellId+' div');
							var checkForFgColorWrapper = active_div.find("span.is_fgColor");
							if(checkForFgColorWrapper.length > 0){							
								checkForFgColorWrapper.attr("style","color:#"+args);
								updated_html = active_div.html();
							}else{
								updated_html = '<span class="is_fgColor" style="color:#'+args+'">'+active_div.html()+'</span>';
							} 
							active_div.html(updated_html);
							//$('.htCore tbody tr').find('td#'+currentSelectedCellId+' div').html('<span style="color:#'+args+'">'+textAreaSel+'</span>');
							tblComponent.changeValById(tblComponent.cellHTMLCollection, currentSelectedCellId, "itsHtml", $("#"+currentSelectedCellId).html());
						}
					}
					/* custom code for table cell's end */					
				}else if(command =='backColor'){
					args = $("#selectedColorValueId").val();
					bgColor = true;
					/* custom code for table cell's start */
					if(isTableCellRange){
						if(currentSelectedCellId != ""){
							var updated_html = "";
							var active_div = $('.htCore tbody tr').find('td#'+currentSelectedCellId+' div');
							var checkForBgColorWrapper = active_div.find("span.is_bgColor");
							if(checkForBgColorWrapper.length > 0){							
								checkForBgColorWrapper.attr("style","background:#"+args);
								updated_html = active_div.html();
								
							}else{
								updated_html = '<span class="is_bgColor" style="background:#'+args+'">'+active_div.html()+'</span>';
							}
							active_div.html(updated_html);
							//$('.htCore tbody tr').find('td#'+currentSelectedCellId+' div').html('<span style="background:#'+args+'">'+textAreaSel+'</span>');
							tblComponent.changeValById(tblComponent.cellHTMLCollection, currentSelectedCellId, "itsHtml", $("#"+currentSelectedCellId).html());
						}
					}
					/* custom code for table cell's end */
				}
				else if(command == "linespace"){
					lineSpace = $("#linespaceMeasure").val().replace(" pt","");
					var objId= $("#elementid").text().split(" ")[1];
					var currentObj = $("#"+objId)
					//check for empty text before apply
					if(currentObj.text() !== ""){						
						var range = window.getSelection().getRangeAt(0);
						var clonedSelection = range.cloneContents();
						var div = document.createElement('div');
				        div.appendChild(clonedSelection);
				        var linespaceObj = $(div).find("div.linespaceBlock").attr("style","line-height:"+lineSpace);
				        var selHtml = "";
						if(linespaceObj.length > 0 && linespaceObj.text() != ""){
							/* apply linespace to children divs in chrome */							
							if(is_chrome){
								if(currentObj.text() == $(div).text()){
								  currentObj.children("div.linespaceBlock").attr("style","line-height:"+lineSpace);
								  var chldDiv = $(div).children("div");
								  var cntr=0;
								  for(cntr;cntr<chldDiv.length;cntr++){
									  if(!$(chldDiv[cntr]).hasClass("linespaceBlock")){
										  $(chldDiv[cntr]).addClass("linespaceBlock");
										  $(chldDiv[cntr]).attr("style","line-height:"+lineSpace);
									  }
								  }
								}								
							}
					        var selectionContents = range.extractContents();
							var frag = range.createContextualFragment(div.innerHTML);
							range.insertNode(frag);
						}else{
							selHtml = div.innerHTML.replace(/\<li>/g, '<li><div class="linespaceBlock" style="line-height:' +lineSpace+ '">');
							selHtml = selHtml.replace(/\<\/li>/g, '</div></li>');
							selHtml = selHtml.replace(/\<br>/g, '</div><br><div class="linespaceBlock" style="line-height:' +lineSpace+ '">');
							if($(div).find("li").length == 0){
								selHtml = '<div class="linespaceBlock" style="line-height:' +lineSpace+ '">' + selHtml;
							}
							selHtml.replace(/\<li><\/li>/g, '');
							var selectionContents = range.extractContents();
							var frag = range.createContextualFragment(selHtml);
							range.insertNode(frag);
						}
						
						/* text reselection in  chrome */
						if(is_chrome){
						  var winSelection = window.getSelection();
						  winSelection.removeAllRanges();
						  winSelection.addRange(range);
						  
						  /* remove all empty divs */
						  var emptyDivs = currentObj.find("div");
						  emptyDivs.each(function(){
							 if($(this).html() == "" || typeof($(this).html())=="undefined" || $(this).text() == ""){
							    $(this).remove();
							 }  
						  });
						}
					}
					
				}/*else if(command == 'undo'){
					
					 CommandManager.undo();
					    
				}*/
				else if(command =='fontSize'){
					t = args;
					args=1;
					var fontSize = t;
					/* custom code for table cell's start */
					if(isTableCellRange){
						if(currentSelectedCellId != ""){							
							var updated_html = "";
							var active_div = $('.htCore tbody tr').find('td#'+currentSelectedCellId+' div');
							var lineHeightCss = "";
							if(fontSize > 48){
								lineHeightCss = "line-height: 0.8em;";
							}
							
							var checkForFontWrapper = active_div.find("font[style]");
							if(checkForFontWrapper.length > 0){							
								checkForFontWrapper.attr("style","font-size:"+fontSize+"px; "+lineHeightCss);
								updated_html = active_div.html();
							}else{
								updated_html = '<font style="font-size:'+fontSize+'px; '+lineHeightCss+'">'+active_div.html()+'</font>';
							}
							active_div.html(updated_html);
							tblComponent.changeValById(tblComponent.cellHTMLCollection, currentSelectedCellId, "itsHtml", $("#"+currentSelectedCellId).html());							
						}
					}
					else{/* custom code for table cell's end */
					var select = window.getSelection();
				 	var eleId = "";
			    	if (select.rangeCount > 0) {
			       		eleId = select.focusNode.id;
			    	}
			    	if(eleId == "" || eleId == undefined){
			    		eleId = select.focusNode.parentNode.id
			    	}
			    	if(eleId == "" || eleId == undefined){
			    		var pNode = select.focusNode.parentNode;
			    		eleId = $(pNode).parents(".inputDummy")[0].id
			    	}
			    	var currentObj = $("#"+eleId);
					//check for empty text before apply
					if(currentObj.text() !== ""){						
						
						var range = window.getSelection().getRangeAt(0);
						var clonedSelection = range.cloneContents();
						var div = document.createElement('div');
				        div.appendChild(clonedSelection);
				        var fontObj = $(div).find("font");
				        var selHtml = "";
						if(fontObj.length > 0 && fontObj.text() != ""){
							$(div).find("font").attr("style","font-size:"+fontSize+ 'px !important');
							$(div).find("font").children("div").attr("style","font-size:"+fontSize+ 'px !important');
							
							/* apply font-size to children divs in all */							
							if(currentObj.text() == $(div).text()){
							  /* apply font to children divs,b,i and u in chrome */							
							  if(is_chrome){
								$(div).children("div").attr("style","font-size:"+fontSize+ 'px !important');
								$(div).find("b").attr("style","font-size:"+fontSize+ 'px !important');
								$(div).find("i").attr("style","font-size:"+fontSize+ 'px !important');
								$(div).find("u").attr("style","font-size:"+fontSize+ 'px !important');
							  }								
								
							  selHtml = div.innerHTML.replace(/\<li>/g, '<li><font style="font-size:' +fontSize+ 'px !important">');
							  selHtml = selHtml.replace(/\<\/li>/g, '</font></li>');
							  selHtml = selHtml.replace(/\<br>/g, '</font><br><font style="font-size:' +fontSize+ 'px !important">');
							  if($(div).find("li").length == 0){
								selHtml = '<font style="font-size:' +fontSize+ 'px !important">' + selHtml;
							  }
							  selHtml.replace(/\<li><\/li>/g, '');						  
							}
							if(selHtml == ''){
								selHtml = div.innerHTML;
							}
					        var selectionContents = range.extractContents();
							var frag = range.createContextualFragment(selHtml);
							range.insertNode(frag);
						}else{
							
							/* apply font to children divs,b,i and u in chrome */							
							if(is_chrome){
								$(div).children("div").attr("style","font-size:"+fontSize+ 'px !important');
								$(div).find("b").attr("style","font-size:"+fontSize+ 'px !important');
								$(div).find("i").attr("style","font-size:"+fontSize+ 'px !important');
								$(div).find("u").attr("style","font-size:"+fontSize+ 'px !important');
							}
							
							selHtml = div.innerHTML.replace(/\<li>/g, '<li><font style="font-size:' +fontSize+ 'px !important">');
							selHtml = selHtml.replace(/\<\/li>/g, '</font></li>');
							selHtml = selHtml.replace(/\<br>/g, '</font><br><font style="font-size:' +fontSize+ 'px !important">');
							if($(div).find("li").length == 0){
								selHtml = '<font style="font-size:' +fontSize+ 'px !important">' + selHtml;
							}
							selHtml.replace(/\<li><\/li>/g, '');
							var selectionContents = range.extractContents();
							var frag = range.createContextualFragment(selHtml);
							range.insertNode(frag);
						}
						
						var emptyLiCollection = currentObj.find("li");
						if(emptyLiCollection.length > 0){
							//remove unwanted empty divs added when font applied
							emptyLiCollection.each(function(){
							    if($(this).html() == "" || typeof($(this).html())=="undefined" || $(this).text() == ""){
							     $(this).remove();
							    }
							});
						}
						
						/* text reselection in  chrome */
						if(is_chrome){
						  var winSelection = window.getSelection();
						  winSelection.removeAllRanges();
						  winSelection.addRange(range);
						}
						
					}
				   }
					/*if (window.getSelection) {
					  if (window.getSelection().empty) {  // Chrome
					    window.getSelection().empty();
					  } else if (window.getSelection().removeAllRanges) {  // Firefox
					    window.getSelection().removeAllRanges();
					  }
					} else if (document.selection) {  // IE?
					  document.selection.empty();
					}*/
				}
				if(command!="indent" && command!="fontSize" && command!="outdent" && command!="undo" && command!="redo"){
					/*check for part name editor to prevent order/unorder list in it*/
					if(command=='insertunorderedlist' || command=='insertorderedlist'){
						var partNameId = '';
						try{
						  partNameId = range.commonAncestorContainer.parentElement.id;
						  if(partNameId=="partNameNew"){
							  return false;
						  }
						}catch(exp){
						  console.log("Id error : "+exp);
						}
					}
					document.execCommand(command, 0, args);
					if(command=='insertunorderedlist'){
						var winSelection = window.getSelection();
						    winSelection.removeAllRanges();
						    winSelection.addRange(range);
					}
				}
				//Why following logic was here
//				if(colorFlag){
//					$("font[color="+args+"]").find('br').remove();
//					if( $("font[color="+args+"]").next().is('br')){
//						$("font[color="+args+"]").next().remove();
//					}
//				}
				if(bgColor){
					var $parent = $(".inputDummy span[style]").parent();
					if($parent.is("font")){
						var fontSzie = $parent.css("font-size");
						//$(".inputDummy span[style]").css("font-size",fontSzie);
					}
					
					//get max font-size
					
					var fontswithinSpan = $(".inputDummy span[style]").find("font");
					var maxFontSize = 0;
					if(fontswithinSpan.length > 0){
						$.each(fontswithinSpan,function(index,element){
							var fVal = parseInt($(element).css("font-size"));
							if(maxFontSize < fVal){
								maxFontSize = fVal;
							}
						});						
					}
					
					//to update parent span due to font size
					var spanWithfonts = $(".inputDummy span[style]").has("font");
					
					if(spanWithfonts.length >0){
					  $.each(spanWithfonts,function(index,element){
						  $(element).css("display","inline-block");
						  //to update background color effect based on different font sizes in parent and childs
						  var parentFontElement = $(element).parents("font");
						  if(parentFontElement.length > 0){
							  var childFontElement = $(element).children("font");
							  if(childFontElement.length > 0){
								//var pFontsize = parseInt($(parentFontElement).css("font-size"));
								var cFontSize = parseInt($(childFontElement).css("font-size"));
								var difference = maxFontSize - cFontSize;
								if(difference>0){									
									//calculate padding values based on 8:2 ratio
									var x = difference / 10;
									var topPadding = (8*x)+"px";
									var bottomPadding = (2*x)+"px";
									$(element).css("padding",(topPadding+" 0 "+bottomPadding));									
								}
							  }
							  
						  }
			     	  });
					}
				}
				if(t != 0){
					var range = window.getSelection().getRangeAt(0);
					var $fontSize = $("font[size]");
					$("font[size]").removeAttr("size").css("font-size", t+"px");
					var $parent = $("font").parent();
					if($parent.is("li")){
						$parent.css("margin-left", "40px");
						if(t>40){
							$parent.css("margin-left", t+"px");
						}
					}
					
					var bgColor = $fontSize.find("span").css("background-color");
					if(bgColor != undefined || bgColor != ''){
						$.each($fontSize.children(),function(i,child){
							if($(child).is("span") || $(child).is("font")){
								$(child).css("font-size", t+"px");
							}
							$(child).find("span").css("font-size", t+"px");
						});
					}
					
					//change "font" child elements font size
					var childFontElements = $($fontSize).has("font");
					if(childFontElements.length > 0){
					   $.each(childFontElements,function(index,element){
						  $(element).find("font").css("font-size",t+"px");
				       });
					}
					
					//change "bold" child elements font size
					var boldElements = $($fontSize).has("b");
					if(boldElements.length > 0){
					   $.each(boldElements,function(index,element){
						  $(element).find("b").css("font-size",t+"px");
				       });
					}
					//change "italic" child elements font size
					
					var clonedSelection = range.cloneContents();
					var div = document.createElement('div');
			        div.appendChild(clonedSelection);
					var italicElements = $(div).find("i");
					if(italicElements.length > 0){
					   $.each(italicElements,function(index,element){
						  $(element).css("font-size",t+"px");
				       });
					}
				}
				else if(command=='indent'){
					var indentOutdentSpace = $("#indentOutdentMeasure").val().replace(" pt","");
			         $("br[type='_moz']").remove();
			         var currentObj= $("#elementid").text().split(" ")[1];
			         var totalPadding = 0;
			         var maxWidth=($("#"+currentObj).outerWidth()-20);
			         maxWidth=Math.round(maxWidth / 10) * 10;		
			         var range = window.getSelection().getRangeAt(0);
						var clonedSelection = range.cloneContents();
						var div = document.createElement('div');
				        div.appendChild(clonedSelection);
				        var paddingObj = $(div).find(".div_Padding");
				        var selHtml = "";
				        if(paddingObj.length == 0){
				        	 if(totalPadding <= maxWidth){
					        	totalPadding = parseInt(indentOutdentSpace);
					        	/* apply padding to children divs in chrome */							
								if(is_chrome){
									$(div).children("div").attr("style","padding-left:"+totalPadding+ "px");
								}
					        	var html = "<div class='div_Padding' style='padding-left:" +totalPadding+ "px'>";
					        	selHtml = div.innerHTML.replace(/\<li>/g, '<li>'+html);
								selHtml = selHtml.replace(/\<\/li>/g, '</div></li>');
								selHtml = selHtml.replace(/\<br>/g, '</div><br>'+html);
								if($(div).find("li").length == 0){
									selHtml = "<div class='div_Padding' style='padding-left:" +totalPadding+ "px'>" + selHtml;
								}
								selHtml = selHtml.replace(/\<li><\/li>/g, '');
								selHtml = selHtml.replace(/\<ul><\/ul>/g, '');
								selHtml = selHtml.replace(/\<ol><\/ol>/g, '');
								var selectionContents = range.extractContents();
								var frag = range.createContextualFragment(selHtml);
								range.insertNode(frag);
				        	 }
				        }
				        else{
				      		//if padding is applied already then add extra padding in each div
		        			paddingObj.each(function(index,value) {
				        		totalPadding = parseInt($(paddingObj[index]).css("padding-left")) 
					        	+ parseInt(indentOutdentSpace);
				        		if(totalPadding <= maxWidth){
				        				$(paddingObj[index]).attr("style","padding-left:"+totalPadding+ "px");
				        				/* apply padding to children divs in chrome */							
										if(is_chrome){
											$(paddingObj[index]).children("div").attr("style","padding-left:"+totalPadding+ "px");
										}
							            var selectionContents = range.extractContents();
										var frag = range.createContextualFragment(div.innerHTML);
										range.insertNode(frag);
				        		}
					        });
		        			
				        	var brTags = $(div).find("br");
				        	var textArr = div.innerHTML.split("<br>");
				        	var html = "";
				        	for(var i=0; i<textArr.length; i++){
				        		
				        		if(textArr[i].indexOf("div_Padding") == -1){
				        			totalPadding = parseInt(indentOutdentSpace);
						        	html = html + "<div class='div_Padding' style='padding-left:" +totalPadding+ "px'>";
						        	html = html + textArr[i] + "</div>";
				        		}
				        		else{
				        			html = html + textArr[i];
				        		}
				        		if(i != (textArr.length - 1)){
				        			html = html + '<br>';	
				        		}
				        	}
				        	var selectionContents = range.extractContents();
							var frag = range.createContextualFragment(html);
							range.insertNode(frag);
							
							var divObj = $("#"+currentObj).find(".div_Padding");
				        	divObj.each(function(index,value) {
				        		if($(divObj[index]).text() == ''){
				        			$(divObj[index]).remove();
				        		}
					        });
			         }
				        
				     /*check for parent li and apply indent*/
				     var paddedDiv = $("#"+currentObj).find(".div_Padding");
				     if(paddedDiv.length > 0){
				    	 var prntLi = $(paddedDiv).parents("li");
			        	 if(prntLi.length > 0){
			        		totalPadding = parseInt(prntLi.css("margin-left")) 
					        	+ parseInt(indentOutdentSpace);
			        		if(totalPadding > 600){
								totalPadding = 600
							}
			        		prntLi.parent().css('list-style-position','inside');
			        	 	prntLi.css('margin-left',totalPadding+ 'px');
			        	 	paddedDiv.css('padding-left','0');
			        	 } 
				     }
				     
				     //remove unwanted empty divs added when li applied
		        	 var emptyLiCollection=$("#"+currentObj).find("li");
					 emptyLiCollection.each(function(){
					    if($(this).html() == "" || typeof($(this).html())=="undefined" || $(this).text() == ""){
					      $(this).remove();
					    }
					});
		        	 
		        		
				     /* text reselection in  chrome */
					 if(is_chrome){
					   var winSelection = window.getSelection();
					   winSelection.removeAllRanges();
					   winSelection.addRange(range);
					 }
			      }
 			      else if (command == 'outdent') {
 			    	  
 			    	 var indentOutdentSpace = $("#indentOutdentMeasure").val().replace(" pt","");
					var currentObj = $("#elementid").text().split(" ")[1];
					var maxWidth = ($("#" + currentObj).outerWidth());
					maxWidth = Math.round(maxWidth / 10) * 10;
					var range = window.getSelection().getRangeAt(0);
					var clonedSelection = range.cloneContents();
					var div = document.createElement('div');
			        div.appendChild(clonedSelection);
			        
					if ($(div).find(".div_Padding").length == 0) {
						totalPadding = parseInt(indentOutdentSpace);
						/* apply padding to children divs in chrome */							
						if(is_chrome){
							if (totalPadding >= 0) {
								if(totalPadding <= 5){
									totalPadding = 0
								}
								
								var prntDiv = $("#"+currentObj).find(".div_Padding");
								if(prntDiv.length==0){
									var dvHtml = "<div class='div_Padding' style='padding-left:" +totalPadding+ "px'>";
									dvHtml += div.innerHTML;
									dvHtml += '</div>'
								    var selectionContents = range.extractContents();
									var frag = range.createContextualFragment(dvHtml);
									range.insertNode(frag);
								}else{
									$("#"+currentObj).find(".div_Padding").attr("style","padding-left:"+totalPadding+ "px");
									$("#"+currentObj).find(".div_Padding").find("div").attr("style","padding-left:"+totalPadding+ "px");
								}
								
							}
												
						}
					} else {
						var paddingObj = $(div).find(".div_Padding");
						paddingObj.each(function(index,value) {
			        		totalPadding = parseInt($(paddingObj[index]).css("padding-left")) 
				        	- parseInt(indentOutdentSpace);
			        		if (totalPadding >= 0) {
								if(totalPadding <= 5){
									totalPadding = 0
								}
								$(paddingObj[index]).attr("style","padding-left:"+totalPadding+ "px");
								/* apply padding to children divs in chrome */							
								if(is_chrome){
									$(paddingObj[index]).children("div").attr("style","padding-left:"+totalPadding+ "px");
								}
								var selectionContents = range.extractContents();
								var frag = range.createContextualFragment(div.innerHTML);
								range.insertNode(frag);
							}
				        });
					}
					var divObj = $("#"+currentObj).find(".div_Padding");
		        	divObj.each(function(index,value) {
		        		if($(divObj[index]).text() == ''){
		        			$(divObj[index]).remove();
		        		}
			        });
		        	var liObj = $("#"+currentObj).find("li");
		        	liObj.each(function(index,value) {
		        		if($(liObj[index]).text() == ''){
		        			$(liObj[index]).remove();
		        		}
			        });
		        	
		        	/*check for parent li and apply outdent*/
				     if(divObj.length > 0){
				    	 var prntLi = $(divObj).parents("li");
			        	 if(prntLi.length > 0){
			        		totalPadding = parseInt(prntLi.css("margin-left")) 
					        	- parseInt(indentOutdentSpace);
			        		if(totalPadding < 0){
								totalPadding = -14
							}
			        		prntLi.parent().css('list-style-position','inside');
			        	 	prntLi.css('margin-left',totalPadding+ 'px');
			        	 	divObj.css('padding-left','0');
			        	 } 
				     }			    
		        	
		        	
		        	/* text reselection in  chrome */
					if(is_chrome){
					  var winSelection = window.getSelection();
					  winSelection.removeAllRanges();
					  winSelection.addRange(range);
					}
				}
				
				if(command=='bold'){
					/* custom code for table cell's start */
					if(isTableCellRange){
						var updated_text;
						var active_div = $('.htCore tbody tr').find('td.current div');						
						if(is_chrome){
							active_div = $('.htCore tbody tr').find('td#'+currentSelectedCellId+' div');
						}						
						if (active_div.hasClass('is_bold')){
							updated_text = active_div.html().replace('<b>', '').replace('</b>', '');
							active_div.html(updated_text).removeClass('is_bold');
						} else {
							
							var text = txtarea.value.substring(start, finish);
							var formulaIDs = util.getFormulas(text);
							// check for formula 
							if(formulaIDs.length > 0){
								active_div.html('<b>'+active_div.html()+'</b>');
							}else{
								updated_text = active_div.html().replace(textAreaSel, '<b>'+textAreaSel+'</b>');
								active_div.html(updated_text).addClass('is_bold');
							}
						}
						
						if(is_chrome){
							tblComponent.changeValById(tblComponent.cellHTMLCollection, currentSelectedCellId, "itsHtml", $("#"+currentSelectedCellId).html());
						}
					}
					else{ /* custom code for table cell's end */
						var range = window.getSelection().getRangeAt(0);
						var clonedSelection = range.cloneContents();
						
						var div = document.createElement('div');
				        div.appendChild(clonedSelection);
				        if($("#btnBold").hasClass("btn-info")){
							var selHtml = div.innerHTML.replace(/\<\/b><br><b>/g, '<br>');
							
							if(selHtml.indexOf('<br>')==0){
								selHtml.replace('<br>','');
							}
							
							if(selHtml.lastIndexOf('<br>')==selHtml.length-3){
								selHtml.slice(3,-1);
							}
							selHtml.replace(/\<li><\/li>/g, '');
							/*var selHtml = div.innerHTML.replace(/\<li>/g, '<b><li>');
							var selHtml = div.innerHTML.replace(/\<\/li>/g, '<\/b><\/li>');*/

						} else{
							var selHtml = div.innerHTML.replace(/\<br>/g, '</b><br><b>');
							selHtml.replace(/\<li><\/li>/g, '');

							/*var selHtml = div.innerHTML.replace(/\<b><li>/g, '<li>');
							var selHtml = div.innerHTML.replace(/\<\/b><\/li>/g, '<\/li>');*/
						}
				        
				        
				        var selectionContents = range.extractContents();
						
						var frag = range.createContextualFragment(selHtml);
						range.insertNode(frag);

						/*var div = document.createElement("b");
						var t = document.createTextNode(selHtml);
						div.appendChild(t);*/
						
						/*var $parent = $("b").parent().parent();
						if($parent.is("ul")||$parent.is("ol")){
							$parent.contents().wrap('<b />');
						}*/
						
						/* text reselection in  chrome */
						if(is_chrome){
						  var winSelection = window.getSelection();
						  winSelection.removeAllRanges();
						  winSelection.addRange(range);
						}
					}
				}
				if( command=='italic'){
					/* custom code for table cell's start */
					if(isTableCellRange){
						var updated_text;
						var active_div = $('.htCore tbody tr').find('td.current div');
						if(is_chrome){
							active_div = $('.htCore tbody tr').find('td#'+currentSelectedCellId+' div');
						}
						if (active_div.hasClass('is_italic')){
							updated_text = active_div.html().replace('<i>', '').replace('</i>', '');
							active_div.html(updated_text).removeClass('is_italic');
						} else {

							var text = txtarea.value.substring(start, finish);
							var formulaIDs = util.getFormulas(text);
							// check for formula 
							if(formulaIDs.length > 0){
								active_div.html('<i>'+active_div.html()+'</>');
							}else{
								updated_text = active_div.html().replace(textAreaSel, '<i>'+textAreaSel+'</>');
								active_div.html(updated_text).addClass('is_italic');
							}
							
						}
						
						if(is_chrome){
							tblComponent.changeValById(tblComponent.cellHTMLCollection, currentSelectedCellId, "itsHtml", $("#"+currentSelectedCellId).html());
						}
					}
					else{/* custom code for table cell's end */
					 var range = window.getSelection().getRangeAt(0);
					
					 var clonedSelection = range.cloneContents();
					
					 var div = document.createElement('div');
			         div.appendChild(clonedSelection);
			         if($("#btnItalic").hasClass("btn-info")){
						var selHtml = div.innerHTML.replace(/\<\/i><br><i>/g, '<br>');
					 } else{
						var selHtml = div.innerHTML.replace(/\<br>/g, '</i><br><i>');
					 }
			        
			         var selectionContents = range.extractContents();
					
					 var frag = range.createContextualFragment(selHtml);
					 range.insertNode(frag);
					 
					 /* text reselection in  chrome */
					 if(is_chrome){
					   var winSelection = window.getSelection();
					   winSelection.removeAllRanges();
					   winSelection.addRange(range);
					 }
					}
				}
				if( command=='underline'){
					/* custom code for table cell's start */
					if(isTableCellRange){
						var updated_text;
						var active_div = $('.htCore tbody tr').find('td.current div');
						if(is_chrome){
							active_div = $('.htCore tbody tr').find('td#'+currentSelectedCellId+' div');
						}
						if (active_div.hasClass('is_underline')){
							updated_text = active_div.html().replace('<u>', '').replace('</u>', '');
							active_div.html(updated_text).removeClass('is_underline');
						} else {
							var text = txtarea.value.substring(start, finish);
							var formulaIDs = util.getFormulas(text);
							// check for formula 
							if(formulaIDs.length > 0){
								active_div.html('<u>'+active_div.html()+'</u>');
							}else{
								updated_text = active_div.html().replace(textAreaSel, '<u>'+textAreaSel+'</u>');
								active_div.html(updated_text).addClass('is_underline');
							}
						}
						
						if(is_chrome){
							tblComponent.changeValById(tblComponent.cellHTMLCollection, currentSelectedCellId, "itsHtml", $("#"+currentSelectedCellId).html());
						}
					}
					else{/* custom code for table cell's end */
						var range = window.getSelection().getRangeAt(0);
						var clonedSelection = range.cloneContents();
						var div = document.createElement('div');
				        div.appendChild(clonedSelection);
						if($("#btnUnderline").hasClass("btn-info")){
							var selHtml = div.innerHTML.replace(/\<\/u><br><u>/g, '<br>');
						} else{
							var selHtml = div.innerHTML.replace(/\<br>/g, '</u><br><u>');
						}
				        var selectionContents = range.extractContents();
						var frag = range.createContextualFragment(selHtml);
						range.insertNode(frag);
						/* text reselection in  chrome */
						if(is_chrome){
						  var winSelection = window.getSelection();
						  winSelection.removeAllRanges();
						  winSelection.addRange(range);
						}
					}
				}
				if(command=='insertunorderedlist' || command=='insertorderedlist'){
					var currentObj = $("#elementid").text().split(" ")[1];
					var $parent = $("font").parent();
					if($parent.is("li")){
						$parent.css("font-size", $("font").css("font-size"));
						$parent.css("margin-left", "40px");
						if(t>40){
							$parent.css("margin-left", args+"px");
						}
					}
					var $child= $("font").children("br");
					$child.remove();
					var $olObejct = $("#editable_1 ol");
					if($olObejct.length>1){
						
						$olObejct.each(function(index,value) {
							if(index >0){
								var i = parseInt(index)+1;
								console.log(	$("#editable_1 ol : nth-child("+i+")"));
							}
						});
						/*$('#editable_1 ol > li').first().each(function(){
							console.log(this);
						});*/
					//	console.log($olObejct.first());
					}
					var range = window.getSelection().getRangeAt(0);
					var clonedSelection = range.cloneContents();
					var div = document.createElement('div');
			        div.appendChild(clonedSelection);
					if (options.activeToolbarClass) {
						var divObj = $(div).find(".div_Padding");
						if($(div).find("br").length == 0){
							divObj.each(function(index,value) {
				        		if(index != (divObj.length - 1)){
				        			$(divObj[index]).after("<br />");
				        		}
					        });
						}
					}
					
					var selectionContents = range.extractContents();
					var frag = range.createContextualFragment(div.innerHTML);
					range.insertNode(frag);
					
					/* text reselection in  chrome */
					if(is_chrome){
					  var winSelection = window.getSelection();
					  winSelection.removeAllRanges();
					  winSelection.addRange(range);
					}
					
					var liObj = $("#"+currentObj).find("li");
		        	liObj.each(function(index,value) {
		        		if($(liObj[index]).text() == ''){
		        			$(liObj[index]).remove();
		        		}
			        });
		        	var divObj = $("#"+currentObj).find(".div_Padding");
		        	divObj.each(function(index,value) {
		        		if($(divObj[index]).text() == ''){
		        			$(divObj[index]).remove();
		        		}
			        });
		        	
		        	/* apply font-size to children spans in chrome */							
					if(is_chrome){
					  if($("#"+currentObj).text() == $(div).text()){
						  var fSpanFsize = $("#"+currentObj).find("li:first").find("span").css("font-size");
						  if(typeof fSpanFsize !="undefined"){
							  $("#"+currentObj).find("li").find("span").css("font-size",fSpanFsize);
						  }						  
					  }					  
					}
		        	
				}
				//	$("#undoButtonId").prop("disabled",false);
			 	var select = window.getSelection();
			 	
			 	var eleId = "";
			 	if(!isTableCellRange){
		    	 if (select.rangeCount > 0) {
		       		eleId = select.focusNode.id;
		    	 }
		    	
		    	 if(eleId == "" || eleId == undefined){
		    		eleId = select.focusNode.parentNode.id;
		    	 }
		    	 if(eleId == "" || eleId == undefined){
		    		var pNode = select.focusNode.parentNode;
		    		if(typeof $(pNode).parents(".inputDummy")[0] != "undefined"){
		    			eleId = $(pNode).parents(".inputDummy")[0].id;
		    		}
		    	 }
		    	 
		    	 var currentObj = $("#"+eleId);

		    	 var emptyLiCollection = currentObj.find("li");
				 if(emptyLiCollection.length > 0){
					//remove unwanted empty li added when any command applied
					emptyLiCollection.each(function(){
					    if($(this).html() == "" || typeof($(this).html())=="undefined" || $(this).text() == ""){
					     $(this).remove();
					    }
					});
				 }
		    	 
		    	 $("#"+eleId).trigger("blur");
			 	}
				updateToolbar();
			},
			bindHotkeys = function (hotKeys) {
				$.each(hotKeys, function (hotkey, command) {
					editor.keydown(hotkey, function (e) {
						if (editor.attr('contenteditable') && editor.is(':visible')) {
							e.preventDefault();
							e.stopPropagation();
							execCommand(command);
						}
					}).keyup(hotkey, function (e) {
						if (editor.attr('contenteditable') && editor.is(':visible')) {
							e.preventDefault();
							e.stopPropagation();
						}
					});
				});
			},
			getSelectedCellRange = function () {
				if(selectedInstance != null ){
					return selectedInstance.getSelected();
				}
			},
			getCurrentRange = function () {
				var sel = window.getSelection();
				if (sel.getRangeAt && sel.rangeCount) {
					return sel.getRangeAt(0);
				}
			},
			saveSelection = function () {
				selectedRange = getCurrentRange();
				if(selectedInstance != null ){
					selectedCellRange =  getSelectedCellRange();
				}
			},
			restoreSelection = function () {
				var selection = window.getSelection();
				if (selectedRange) {
					try {
						selection.removeAllRanges();
						
					} catch (ex) {
						document.body.createTextRange().select();
						document.selection.empty();
					}

					selection.addRange(selectedRange);
				}
				
			},
			insertFiles = function (files) {
				editor.focus();
				$.each(files, function (idx, fileInfo) {
					if (/^image\//.test(fileInfo.type)) {
						$.when(readFileIntoDataUrl(fileInfo)).done(function (dataUrl) {
							execCommand('insertimage', dataUrl);
						}).fail(function (e) {
							options.fileUploadError("file-reader", e);
						});
					} else {
						options.fileUploadError("unsupported-file-type", fileInfo.type);
					}
				});
			},
			markSelection = function (input, color) {
				restoreSelection();
				if (document.queryCommandSupported('hiliteColor')) {
					document.execCommand('hiliteColor', 0, color || 'transparent');
				}
				saveSelection();
				input.data(options.selectionMarker, color);
			},
			bindToolbar = function (toolbar, options) {
				toolbar.find(toolbarBtnSelector).click(function (e) {
					restoreSelection();
					editor.focus();
					
					execCommand($(this).data(options.commandRole));
					saveSelection();
				});
				toolbar.find('[data-toggle=dropdown]').click(restoreSelection);

				toolbar.find('input[type=text][data-' + options.commandRole + ']').on('webkitspeechchange change', function () {
					var newValue = this.value; /* ugly but prevents fake double-calls due to selection restoration */
					this.value = '';
					restoreSelection();
					if (newValue) {
						editor.focus();
						execCommand($(this).data(options.commandRole), newValue);
					}
					saveSelection();
				}).on('focus', function () {
					var input = $(this);
					if (!input.data(options.selectionMarker)) {
						markSelection(input, options.selectionColor);
						input.focus();
					}
				}).on('blur', function () {
					var input = $(this);
					if (input.data(options.selectionMarker)) {
						markSelection(input, false);
					}
				});
				toolbar.find('input[type=file][data-' + options.commandRole + ']').change(function () {
					restoreSelection();
					if (this.type === 'file' && this.files && this.files.length > 0) {
						insertFiles(this.files);
					}
					saveSelection();
					this.value = '';
				});
			},
			initFileDrops = function () {
				editor.on('dragenter dragover', false)
					.on('drop', function (e) {
						var dataTransfer = e.originalEvent.dataTransfer;
						e.stopPropagation();
						e.preventDefault();
						if (dataTransfer && dataTransfer.files && dataTransfer.files.length > 0) {
							insertFiles(dataTransfer.files);
						}
					});
			};
		options = $.extend({}, $.fn.wysiwyg.defaults, userOptions);
		toolbarBtnSelector = 'a[data-' + options.commandRole + '],button[data-' + options.commandRole + '],input[type=button][data-' + options.commandRole + ']';
		bindHotkeys(options.hotKeys);
		if (options.dragAndDropImages) {
			initFileDrops();
		}
		bindToolbar($(options.toolbarSelector), options);
		editor.on('mouseup keyup mouseout', function () {
				saveSelection();
				updateToolbar();
			});
		$(window).bind('touchend', function (e) {
			var isInside = (editor.is(e.target) || editor.has(e.target).length > 0),
				currentRange = getCurrentRange(),
				clear = currentRange && (currentRange.startContainer === currentRange.endContainer && currentRange.startOffset === currentRange.endOffset);
			if (!clear || isInside) {
				saveSelection();
				updateToolbar();
			}
		});
		return this;
	};
	$.fn.wysiwyg.defaults = {
		hotKeys: {
			/*'ctrl+b meta+b': 'bold',
			'ctrl+i meta+i': 'italic',
			'ctrl+u meta+u': 'underline',
			'ctrl+z meta+z': 'undo',
			'ctrl+y meta+y meta+shift+z': 'redo',
			'ctrl+l meta+l': 'justifyleft',
			'ctrl+r meta+r': 'justifyright',
			'ctrl+e meta+e': 'justifycenter',
			'ctrl+j meta+j': 'justifyfull',
			'shift+tab': 'outdent',
			'tab': 'indent'*/
		},
		toolbarSelector: '[data-role=editor-toolbar]',
		commandRole: 'edit',
		activeToolbarClass: 'btn-info',
		selectionMarker: 'edit-focus-marker',
		selectionColor: 'darkgrey',
		dragAndDropImages: true,
		fileUploadError: function (reason, detail) { console.log("File upload error", reason, detail); }
	};
}(window.jQuery));
