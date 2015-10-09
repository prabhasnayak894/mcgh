
var caretPos=0, gCaretPos = 0;
/**
*JSON array to store specialCharacter value
*/
var spclCharJSON = [];

//JSON Array for special characters 
var specialCharacters = [{
    'entityName': "exclamation",
    'numberCode': "&#33;"
}, {
    'entityName': "commercialAt",
    'numberCode': "&#64;"
}, {
    'entityName': "numberSign",
    'numberCode': "&#35;"
}, {
    'entityName': "dollor;",
    'numberCode': "&#36;"
}, {
    'entityName': "percentSign",
    'numberCode': "&#37;"
}, {
    'entityName': "pow",
    'numberCode': "&#94;"
}, {
    'entityName': "ampersand",
    'numberCode': "&#38;"
}, {
    'entityName': "asterisk",
    'numberCode': "&#42;"
}, {
    'entityName': "leftParanthesis",
    'numberCode': "&#40;"
}, {
    'entityName': "rightParanthesis",
    'numberCode': "&#41;"
}, {
    'entityName': "lowLine",
    'numberCode': "&#95;"
}, {
    'entityName': "quot",
    'numberCode': "&#34;"
}, {
    'entityName': "solidus",
    'numberCode': "&#47;"
}, {
    'entityName': "fullStop",
    'numberCode': "&#46;"
}, {
    'entityName': "hyphen",
    'numberCode': "&#45;"
}, {
    'entityName': "apostrophe",
    'numberCode': "&#39;"
}, {
    'entityName': "colon",
    'numberCode': "&#58;"
}, {
    'entityName': "questionMark",
    'numberCode': "&#63;"
}, {
    'entityName': "multiplication",
    'numberCode': "&#215;"
}, {
    'entityName': "leftSquareBracket",
    'numberCode': "&#91;"
}, {
    'entityName': "rightSquareBracket",
    'numberCode': "&#93;"
}, {
    'entityName': "leftCurlyBracket",
    'numberCode': "&#123;"
}, {
    'entityName': "rightCurlyBracket",
    'numberCode': "&#125;"
}];

var objspclCharJSON = {
    'charType': 'specialCharacters',
    'characters': specialCharacters
};
spclCharJSON.push(objspclCharJSON);

//JSON Array for symbol
var symbols = [{
    'entityName': "sect;",
    'numberCode': "&#167;"
}, {
    'entityName': "copy;",
    'numberCode': "&#169;"
}, {
    'entityName': "brvbar;",
    'numberCode': "&#166;"
}, {
    'entityName': "yen;",
    'numberCode': "&#165;"
}, {
    'entityName': "not;",
    'numberCode': "&#172;"
}, {
    'entityName': "reg;",
    'numberCode': "&#174;"
}, {
    'entityName': "deg;",
    'numberCode': "&#176;"
}, {
    'entityName': "plusmn;",
    'numberCode': "&#177;"
}, {
    'entityName': "sup2;",
    'numberCode': "&#178;"
}, {
    'entityName': "sup3;",
    'numberCode': "&#179;"
}, {
    'entityName': "slash;",
    'numberCode': "&#216;"
}, {
    'entityName': "frac14;",
    'numberCode': "&#188;"
}, {
    'entityName': "frac12;",
    'numberCode': "&#189;"
}, {
    'entityName': "frac34;",
    'numberCode': "&#190;"
}, {
    'entityName': "iquest;",
    'numberCode': "&#191;"
}, {
    'entityName': "uml;",
    'numberCode': "&#168;"
}, {
    'entityName': "Alt+2605",
    'numberCode': "&#9733;"
}, {
    'entityName': "Alt+266B",
    'numberCode': "&#9835;"
}, {
    'entityName': "euro;",
    'numberCode': "&#8364;"
}, {
    'entityName': "Alt+260E",
    'numberCode': "&#9742;"
}];
var objspclCharSymbolJSON = {
    'charType': 'Symbol',
    'characters': symbols
};
spclCharJSON.push(objspclCharSymbolJSON);

//JSON Array for punctuation
var punctuation = [{
        'entityName': "invertedExclamationPoint",
        'numberCode': "&#161;"
    }, {
        'entityName': "exclamation",
        'numberCode': "&#33;"
    }, {
        'entityName': "invertedQuestionMark",
        'numberCode': "&#191;"
    }, {
        'entityName': "QuestionMark",
        'numberCode': "&#63;"
    }, {
        'entityName': "INTERROBANG",
        'numberCode': "&#8253;"
    }, {
        'entityName': "LeftDoubleQuote",
        'numberCode': "&#147;"
    }, {
        'entityName': "RightDoubleQuote",
        'numberCode': "&#148;"
    }, {
        'entityName': "LeftSingleQuote",
        'numberCode': "&#8216;"
    }, {
        'entityName': "RightSingleQuote",
        'numberCode': "&#8217;"
    }, {
        'entityName': "singleHighReserved",
        'numberCode': "&#8219;"
    }, {
        'entityName': "doubleHighReserved",
        'numberCode': "&#8223;"
    }, {
        'entityName': "oneDotLeader",
        'numberCode': "&#8228;"
    }, {
        'entityName': "singleQuotationMark",
        'numberCode': "&#8218;"
    }, {
        'entityName': "doubleLowQuotationMark",
        'numberCode': "&#8222;"
    }, {
        'entityName': "SingleQuote",
        'numberCode': "&#39;"
    }, {
        'entityName': "DoubleQuote",
        'numberCode': "&#34;"
    }, {
        'entityName': "prime",
        'numberCode': "&#8242;"
    }, {
        'entityName': "doublePrime",
        'numberCode': "&#8243;"
    }, {
        'entityName': "caret",
        'numberCode': "&#8248;"
    }, {
        'entityName': "degree",
        'numberCode': "&#176;"
    }, {
        'entityName': "DIAERESIS",
        'numberCode': "&#168;"
    }, {
        'entityName': "FeminineOrdinalIndicator",
        'numberCode': "&#170;"
    }, {
        'entityName': "MasculineOrdinalIndicator",
        'numberCode': "&#186;"
    }, {
        'entityName': "Elipsis",
        'numberCode': "&#133;"
    }, {
        'entityName': "colon",
        'numberCode': "&#58;"
    }, {
        'entityName': "semiColon",
        'numberCode': "&#59;"
    }, {
        'entityName': "Ampersand",
        'numberCode': "&#38;"
    }, {
        'entityName': "lowLine",
        'numberCode': "&#95;"
    }, {
        'entityName': "macron",
        'numberCode': "&#175;"
    }, {
        'entityName': "EnDash",
        'numberCode': "&#150;"
    }, {
        'entityName': "EmDash",
        'numberCode': "&#151;"
    }, {
        'entityName': "underscore",
        'numberCode': "&#95;"
    },{
        'entityName': "sectionMark",
        'numberCode': "&#167;"
    }, {
        'entityName': "numberSign",
        'numberCode': "&#35;"
    }, {
        'entityName': "notSign",
        'numberCode': "&#172;"
    }, {
        'entityName': "Pilcrow",
        'numberCode': "&#182;"
    }, {
        'entityName': "Dagger",
        'numberCode': "&#134;"
    }, {
        'entityName': "DoubleDagger",
        'numberCode': "&#135;"
    }, {
        'entityName': "atSign",
        'numberCode': "&#64;"
    }, {
        'entityName': "percentSign",
        'numberCode': "&#37;"
    }, {
        'entityName': "perMille",
        'numberCode': "&#8240;"
    }, {
        'entityName': "perTenThousand",
        'numberCode': "&#8241;"
    }, {
        'entityName': "brockenVerticalBar",
        'numberCode': "&#166;"
    }, {
        'entityName': "verticalBar",
        'numberCode': "&#124;"
    }, {
        'entityName': "forwordSlash",
        'numberCode': "&#47;"
    }, {
        'entityName': "backwordSlash",
        'numberCode': "&#92;"
    }, {
        'entityName': "circumflexAccent",
        'numberCode': "&#94;"
    }, {
        'entityName': "caron",
        'numberCode': "&#780;"
    }, {
        'entityName': "smallTidle",
        'numberCode': "&#732;"
    }, {
        'entityName': "CyrillicCapitalLetterZHE",
        'numberCode': "&#1046;"
    }, {
        'entityName': "doubleExclamation",
        'numberCode': "&#8252;"
    }, {
        'entityName': "doubleQuestionMark",
        'numberCode': "&#8263;"
    }, {
        'entityName': "questionExclamation",
        'numberCode': "&#8264;"
    }, {
        'entityName': "exclamationQuestion",
        'numberCode': "&#8265;"
    }

];
var objspclCharPunctuation = {
    'charType': 'punctuation',
    'characters': punctuation
};
spclCharJSON.push(objspclCharPunctuation);

//JSON Array for mathematical symbols
var mathSymbols = [{
    'entityName': "minus",
    'numberCode': "&#8722;"
}, {
    'entityName': "plus",
    'numberCode': "&#43;"
}, {
    'entityName': "multiplication",
    'numberCode': "&#215;"
}, {
    'entityName': "division",
    'numberCode': "&#247;"
}, {
    'entityName': "bullet",
    'numberCode': "&#8729;"
}, {
    'entityName': "plusMinus",
    'numberCode': "&#177;"
}, {
    'entityName': "degree",
    'numberCode': "&#176;"
}, {
    'entityName': "lessThan",
    'numberCode': "&#60;"
}, {
    'entityName': "greaterThan",
    'numberCode': "&#62;"
}, {
    'entityName': "equal",
    'numberCode': "&#61;"
}, {
    'entityName': "notEqual",
    'numberCode': "&#8800;"
}, {
    'entityName': "lessThanEqual",
    'numberCode': "&#8804;"
}, {
    'entityName': "greaterThanEqual",
    'numberCode': "&#8805;"
}, {
    'entityName': "asymptoticallyEqual",
    'numberCode': "&#8771;"
}, {
    'entityName': "asymptoticallyNotEqual",
    'numberCode': "&#8772;"
}, {
    'entityName': "pi",
    'numberCode': "&#960;"
}, {
    'entityName': "EmDash",
    'numberCode': "&#151;"
},{
    'entityName': "almostEqual",
    'numberCode': "&#8776;"
}, {
    'entityName': "identicalTo",
    'numberCode': "&#8801;"
}, {
    'entityName': "notIdenticalTo",
    'numberCode': "&#8802;"
},  {
    'entityName': "infinity",
    'numberCode': "&#8734;"
}, {
    'entityName': "proportionalTo",
    'numberCode': "&#8733;"
}, {
    'entityName': "squareRoot",
    'numberCode': "&#8730;"
}, {
    'entityName': "fractionOneByFour",
    'numberCode': "&#188;"
}, {
    'entityName': "fractionOneByTwo",
    'numberCode': "&#189;"
}, {
    'entityName': "fractionOneByThree",
    'numberCode': "&#8531;"
}, {
    'entityName': "fractionThreeByFour",
    'numberCode': "&#190;"
}, {
    'entityName': "EnDash",
    'numberCode': "&#150;"
}, {
    'entityName': "scriptSmallE",
    'numberCode': "&#8495;"
}, {
    'entityName': "elementOf",
    'numberCode': "&#8712;"
}, {
    'entityName': "subSetOf",
    'numberCode': "&#8834;"
},{
    'entityName': "smallLessThan",
    'numberCode': "&#65124;"
}, {
    'entityName': "upArrow",
    'numberCode': "&#8593;"
}, {
    'entityName': "smallGreaterThan",
    'numberCode': "&#65125;"
}, {
    'entityName': "downwordArrow",
    'numberCode': "&#8595;"
}, {
    'entityName': "upDownArrow",
    'numberCode': "&#8597;"
}];
var objspclCharMathSymbols = {
    'charType': 'Math',
    'characters': mathSymbols
};
spclCharJSON.push(objspclCharMathSymbols);

//JSON Array for subscript characters
var subScript = [{
    'entityName': "subScriptZero",
    'numberCode': "0"
}, {
    'entityName': "subScriptOne",
    'numberCode': "1"
}, {
    'entityName': "subScriptTwo",
    'numberCode': "2"
}, {
    'entityName': "subScriptThree",
    'numberCode': "3"
}, {
    'entityName': "subScriptFour",
    'numberCode': "4"
}, {
    'entityName': "subScriptFive",
    'numberCode': "5"
}, {
    'entityName': "subScriptSix",
    'numberCode': "6"
}, {
    'entityName': "subScriptSeven",
    'numberCode': "7"
}, {
    'entityName': "subScriptEight",
    'numberCode': "8"
}, {
    'entityName': "subScriptNine",
    'numberCode': "9"
}, {
    'entityName': "subScriptPlus",
    'numberCode': "+"
}, {
    'entityName': "subScriptMinus",
    'numberCode': "-"
}, {
    'entityName': "subScriptEqual",
    'numberCode': "="
}, {
    'entityName': "subScriptOpenParan",
    'numberCode': "("
}, {
    'entityName': "subScriptCloseParan",
    'numberCode': ")"
}, {
    'entityName': "subScriptA",
    'numberCode': "a"
}, {
    'entityName': "subScriptE",
    'numberCode': "e"
}, {
    'entityName': "subScriptO",
    'numberCode': "o"
}, {
    'entityName': "subScriptX",
    'numberCode': "x"
}];
var objspclCharSubScript = {
    'charType': 'subScript',
    'characters': subScript
};
spclCharJSON.push(objspclCharSubScript);

//JSON Array for superscript characters
var superScript = [{
    'entityName': "superScriptZero",
    'numberCode': "0"
}, {
    'entityName': "superScriptOne",
    'numberCode': "1"
}, {
    'entityName': "superScriptTwo",
    'numberCode': "2"
}, {
    'entityName': "superScriptThree",
    'numberCode': "3"
}, {
    'entityName': "superScriptFour",
    'numberCode': "4"
}, {
    'entityName': "superScriptFive",
    'numberCode': "5"
}, {
    'entityName': "superScriptSix",
    'numberCode': "6"
}, {
    'entityName': "superScriptSeven",
    'numberCode': "7"
}, {
    'entityName': "superScriptEight",
    'numberCode': "8"
}, {
    'entityName': "superScriptNine",
    'numberCode': "9"
}, {
    'entityName': "superScriptPlus",
    'numberCode': "+"
}, {
    'entityName': "superScriptMinus",
    'numberCode': "-"
}, {
    'entityName': "superScriptEqual",
    'numberCode': "="
}, {
    'entityName': "superScriptOpenParan",
    'numberCode': "("
}, {
    'entityName': "superScriptCloseParan",			
    'numberCode': ")"
}, {
    'entityName': "lessThan",
    'numberCode': "<"
}, {
    'entityName': "greaterThan",
    'numberCode': ">"
}, {
    'entityName': "caret",
    'numberCode': "&#39"
}, {
    'entityName': "superScriptDot",
    'numberCode': "."
}, {
    'entityName': "superScriptA",
    'numberCode': "a"
}, {
    'entityName': "superScriptB",
    'numberCode': "b"
},{
    'entityName': "superScriptC",
    'numberCode': "c"
},{
    'entityName': "superScriptD",
    'numberCode': "d"
}, {
    'entityName': "superScriptE",
    'numberCode': "e"
},{
    'entityName': "superScriptH",
    'numberCode': "h"
}, {
    'entityName': "superScriptI",
    'numberCode': "i"
}, {
    'entityName': "superScriptJ",
    'numberCode': "j"
}, {
    'entityName': "superScriptK",
    'numberCode': "k"
}, {
    'entityName': "superScriptL",
    'numberCode': "l"
}, {
    'entityName': "superScriptM",
    'numberCode': "m"
}, {
    'entityName': "superScriptN",
    'numberCode': "n"
}, {
    'entityName': "superScriptO",
    'numberCode': "o"
}, {
    'entityName': "superScriptP",
    'numberCode': "p"
}, {
    'entityName': "superScriptR",
    'numberCode': "r"
}, {
    'entityName': "superScriptS",
    'numberCode': "s"
}, {
    'entityName': "superScriptT",
    'numberCode': "t"
}, {
    'entityName': "superScriptU",
    'numberCode': "u"
}, {
    'entityName': "superScriptV",
    'numberCode': "v"
}, {
    'entityName': "superScriptW",
    'numberCode': "w"
}, {
    'entityName': "superScriptY",
    'numberCode': "y"
}];
var objspclCharSuperScript = {
    'charType': 'superScript',
    'characters': superScript
};
spclCharJSON.push(objspclCharSuperScript);

//JSON Array for french symbols
var french = [{
    'entityName': "lowerA_Grave",
    'numberCode': "&#224;"
}, {
    'entityName': "lowerA_CircumFlex",
    'numberCode': "&#226;"
}, {
    'entityName': "lowerA_diaeresis",
    'numberCode': "&#228;"
}, {
    'entityName': "lowerE_Grave",
    'numberCode': "&#232;"
}, {
    'entityName': "lowerE_Acute",
    'numberCode': "&#233;"
}, {
    'entityName': "lowerE_CircumFlex",
    'numberCode': "&#234;"
}, {
    'entityName': "lowerE_Umlaut",
    'numberCode': "&#235;"
}, {
    'entityName': "lowercaseC_Cedilla",
    'numberCode': "&#231;"
}, {
    'entityName': "lowerI_CircumFlex",
    'numberCode': "&#238;"
}, {
    'entityName': "lowerI_Umlaut",
    'numberCode': "&#239;"
}, {
    'entityName': "lowerO_CircumFlex",
    'numberCode': "&#244;"
}, {
    'entityName': "lowerO_diaeresis",
    'numberCode': "&#246;"
}, {
    'entityName': "lowerO_E",
    'numberCode': "&#156;"
}, {
    'entityName': "lowerU_Grave",
    'numberCode': "&#249;"
}, {
    'entityName': "lowerU_CircumFlex",
    'numberCode': "&#251;"
}, {
    'entityName': "lowerU_Umlaut",
    'numberCode': "&#252;"
}, {
    'entityName': "leftAngleQuote",
    'numberCode': "&#171;"
}, {
    'entityName': "rightAngleQuote",
    'numberCode': "&#187;"
}, {
    'entityName': "euro",
    'numberCode': "&#128;"
}];
var objspclCharFrench = {
    'charType': 'french',
    'characters': french
};
spclCharJSON.push(objspclCharFrench);

//JSON Array for italian symbols
var italiano = [{
    'entityName': "lowerA_diaeresis",
    'numberCode': "&#228;"
}, {
    'entityName': "lowerE_Grave",
    'numberCode': "&#232;"
}, {
    'entityName': "lowerE_Acute",
    'numberCode': "&#233;"
}, {
    'entityName': "lowerI_Grave",
    'numberCode': "&#236;"
}, {
    'entityName': "lowerO_Grave",
    'numberCode': "&#242;"
}, {
    'entityName': "lowerU_Grave",
    'numberCode': "&#249;"
}, {
    'entityName': "leftAngleQuote",
    'numberCode': "&#171;"
}, {
    'entityName': "rightAngleQuote",
    'numberCode': "&#187;"
}, {
    'entityName': "euro",
    'numberCode': "&#128;"
}];
var objspclCharItaliano = {
    'charType': 'italiano',
    'characters': italiano
};
spclCharJSON.push(objspclCharItaliano);

//JSON Array for deutsch symbols
var deutsch = [{
    'entityName': "lowerA_Grave",
    'numberCode': "&#224;"
}, {
    'entityName': "lowerE_Acute",
    'numberCode': "&#233;"
}, {
    'entityName': "lowerO_diaeresis",
    'numberCode': "&#246;"
}, {
    'entityName': "lowerU_Umlaut",
    'numberCode': "&#252;"
}, {
    'entityName': "SZ_ligature",
    'numberCode': "&#223;"
}, {
    'entityName': "leftLower",
    'numberCode': "&#132;"
}, {
    'entityName': "leftQuot",
    'numberCode': "&#147;"
}, {
    'entityName': "euro",
    'numberCode': "&#128;"
}];
var objspclCharDeutsch = {
    'charType': 'deutsch',
    'characters': deutsch
};
spclCharJSON.push(objspclCharDeutsch);

//JSON Array for greek symbols
var greek = [{
    'entityName': "alpha",
    'numberCode': "&#945;"
}, {
    'entityName': "beta",
    'numberCode': "&#946;"
}, {
    'entityName': "gamma",
    'numberCode': "&#947;"
}, {
    'entityName': "delta",
    'numberCode': "&#948;"
}, {
    'entityName': "epsilon",
    'numberCode': "&#949;"
}, {
    'entityName': "zeta",
    'numberCode': "&#950;"
}, {
    'entityName': "eta",
    'numberCode': "&#951;"
}, {
    'entityName': "theta",
    'numberCode': "&#952;"
}, {
    'entityName': "lota",
    'numberCode': "&#953;"
}, {
    'entityName': "kappa",
    'numberCode': "&#954;"
}, {
    'entityName': "lambda",
    'numberCode': "&#955;"
}, {
    'entityName': "mu",
    'numberCode': "&#956;"
}, {
    'entityName': "nu",
    'numberCode': "&#957;"
}, {
    'entityName': "xi",
    'numberCode': "&#958;"
}, {
    'entityName': "omicron",
    'numberCode': "&#959;"
}, {
    'entityName': "pi",
    'numberCode': "&#960;"
}, {
    'entityName': "rho",
    'numberCode': "&#961;"
}, {
    'entityName': "sigma",
    'numberCode': "&#963;"
}, {
    'entityName': "tau",
    'numberCode': "&#964;"
}, {
    'entityName': "psi",
    'numberCode': "&#968;"
}, {
    'entityName': "chi",
    'numberCode': "&#967;"
}, {
    'entityName': "omega",
    'numberCode': "&#969;"
}, {
    'entityName': "finalSigma",
    'numberCode': "&#962;"
}, {
    'entityName': "phi",
    'numberCode': "&#966;"
}];
var objspclCharGreek = {
    'charType': 'greek',
    'characters': greek
};
spclCharJSON.push(objspclCharGreek);


//JSON Array for spanish symbols

var spanish = [{
    'entityName': "lowerA_acute",
    'numberCode': "&#225;"
}, {
    'entityName': "lowerE_Acute",
    'numberCode': "&#233;"
}, {
    'entityName': "lowerI_Acute",
    'numberCode': "&#237;"
}, {
    'entityName': "lowerO_Acute",
    'numberCode': "&#243;"
}, {
    'entityName': "lowerU_Acute",
    'numberCode': "&#250;"
}, {
    'entityName': "lowerU_diaeresis",
    'numberCode': "&#252;"
}, {
    'entityName': "lowerN_Tidle",
    'numberCode': "&#241;"
}, {
    'entityName': "invertedExclamationPoint",
    'numberCode': "&#161;"
}, {
    'entityName': "invertedQuestionMark",
    'numberCode': "&#191;"
}, {
    'entityName': "leftAngleQuote",
    'numberCode': "&#171;"
}, {
    'entityName': "rightAngleQuote",
    'numberCode': "&#187;"
}, ];
var objspclCharSpanish = {
    'charType': 'spanish',
    'characters': spanish
};
spclCharJSON.push(objspclCharSpanish);

function retainCaret(event){
	event.preventDefault();
	var sel = window.getSelection();
	caretPos = sel.getRangeAt(0);
}

function retainCaretOnSelectBox(event){
	if($(document.activeElement).attr("contenteditable")){
		var sel = window.getSelection();
		caretPos = sel.getRangeAt(0).endOffset;
	}
}

function retainCaretOnClick(event){
	
	if($(document.activeElement).attr("contenteditable")){
		caretPos = window.getSelection().getRangeAt(0).endOffset;
	}
	gCaretPos =  caretPos;
	
}
function updateCursorPos() {
	caretPos = window.getSelection().getRangeAt(0).endOffset;
	gCaretPos =  caretPos;
}
function populateSpclCharPallete() {
    var currentObj = $(document.activeElement).attr("id");
     $(document.activeElement).on( "change", updateCursorPos);
    if($(document.activeElement).attr("contenteditable")){
    
	    $("#divSpclChar").remove();
	    var divHtml = "<div style='height:73px;width: 318px;  margin-top:0px; display:inline-block;background:#CCCCCC;' id='divSpclChar'>" +
	        " 	<p class='txtediting' style='margin-top : 10px; margin-left : 10px;'>Insert special character</p> " +
	        " 	<div class='tabContent'>" +
	        " 		<div class='btn-group customDropdown'> " +
	        "		  <div style='padding:10px; background:#CCCCCC; width: 318px;'>" +
	        " 			<select  class='dropDownSpclChar' id='" + currentObj + "_select'  onmousedown='retainCaretOnSelectBox(event);'  onchange='populateSpclChars(event);'>" +
	        " 				<option value='-1' onmousedown='retainCaretOnClick(event);' >Select type</option>" +
	        " 				<option value='0' onmousedown='retainCaretOnClick(event);'>Special characters</option>" +
	        " 				<option value='1' onmousedown='retainCaretOnClick(event);' >Symbols</option>" +
	        " 				<option value='2' onmousedown='retainCaretOnClick(event);' >punctuation</option>" +
	        " 				<option value='3' onmousedown='retainCaretOnClick(event);' >math</option>" +
	        " 				<option value='4' onmousedown='retainCaretOnClick(event);' >Subscript</option>" +
	        " 				<option value='5' onmousedown='retainCaretOnClick(event);' >Superscript</option>" +
	        " 				<option value='6' onmousedown='retainCaretOnClick(event);' >french</option>" +
	        " 				<option value='7' onmousedown='retainCaretOnClick(event);' >italiano</option>" +
	        " 				<option value='8' onmousedown='retainCaretOnClick(event);' >deutsch</option>" +
	        " 				<option value='9' onmousedown='retainCaretOnClick(event);' >greek</option>" +
	        " 				<option value='10' onmousedown='retainCaretOnClick(event);'>spanish</option>" +
	        " 			 </select>" +
	        " 			<a  id='closePallete' onclick='removeSpclCharPallete(event);' >close</a>" +
	        "		  </div>" +
	        " 		<div class='specialCharPallete'  style='width:400px; display:none; position:relative; z-index:1; '></div>" +
	        "     </div>" +
	        "   </div>" +
	        " </div> ";
	    $(document.activeElement).parent().append(divHtml);
    }
}

/**
*on selection of special character type populate curresponding special characters into palette
*/
function populateSpclChars(event) {
    var currentObjId = $(event.target).attr("id").split("_")[0].toString();
    var currentObj = $("#" + currentObjId);
    var typeOfSpclCharId = currentObj.parent().find(".dropDownSpclChar :selected").val();
    var divHtml = "";
    for (var index = 0; index < spclCharJSON[typeOfSpclCharId].characters.length; index++) {
        var specialChar = spclCharJSON[typeOfSpclCharId].characters[index];
        console.log("specialChar.numberCode::"+specialChar.numberCode);
        divHtml = divHtml + "<input class='' style='min-height: 28px; width:20px; height:5px; display: inline-block; margin:3px; color:black;' value='" + specialChar.numberCode + "' type='button' onmousedown='retainCaretOnSelectBox(event);' onclick='getSpclChar(" + typeOfSpclCharId + ", " + index + ", " + currentObjId + ");'/>";
    }
    currentObj.parent().find(".specialCharPallete").html(divHtml);
    currentObj.parent().find(".specialCharPallete").slideDown();
}

/**
*Append selected special character and close palette
*/
function getSpclChar(typeOfSpclCharId, indexSpclChar, currentObjId) {
    var currentObj = $(currentObjId);
    var charCode = spclCharJSON[typeOfSpclCharId].characters[indexSpclChar].numberCode;
    var charCode2="";
    
  
   // console.log("getSpclChar"+charCode);
    var str = currentObj.html();
    str=str.replace("&nbsp;","");
    if (str == "") {
        currentObj.attr("data-placeholder","");
    }
    if( spclCharJSON[typeOfSpclCharId].charType=="subScript"){
    	charCode2= "<sub>"+charCode+"</sub>"+"&nbsp";
    	str = str.substr(0,str.length) + charCode2 + str.substr(str.length, str.length);
    }else if(spclCharJSON[typeOfSpclCharId].charType=="superScript"){
    	charCode2= "<sup>"+charCode+"</sup>"+"&nbsp";
    	str = str.substr(0,str.length) + charCode2 + str.substr(str.length, str.length);
    }else{
    	str = str.substr(0,str.length) + charCode + str.substr(str.length, str.length);
    }
    
	currentObj.html("");
	currentObj.html(str);
	gCaretPos++;
	caretPos++;
	/*for numeric field validation */
	var itsParentClass = currentObj.parent().attr("class");
	if(typeof itsParentClass!="undefined"){
		/*check for point value fields, ptsValue-All point fields and ptsRangeValue-Ranges point fields*/
		if(itsParentClass.indexOf("ptsValue") != -1 || itsParentClass.indexOf("ptsRangeValue") != -1){
		  currentObj.focus();
		}
	}
}

/**
*Remove special character palette
*/
function removeSpclCharPallete(e) {
    if ($(e.target).parent().parent().parent().parent().length) {
        $(e.target).parent().parent().parent().parent().remove();
    }
}