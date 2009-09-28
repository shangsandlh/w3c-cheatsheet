 /* Removes redundant elements from the array */
make_unique = function(b)
 {
     var a=[],i;
     b.sort();
     for(i=0;i<b.length;i++)
     {
         if(b[i]!==b[i+1])
         {
             a[a.length]=b[i];
         }
     }
     return a;
 }

keywordSources = {
	"CSS":[{"list":cssProperties,"details":cssPropertiesDetails,"name":"CSS Property"}], 
	"HTML":[
	{"list":htmlElements,"details":htmlElementsDetails,"name":"HTML Element"},
	{"list":htmlAttributes,"details":htmlAttributesDetails,"name":"HTML attribute"}],
	"SVG":[{"list":svgAttributes,"details":svgAttributesDetails,"name":"SVG attribute"},	
	{"list":svgElements,"details":svgElementsDetails,"name":"SVG Element"}],
	"XPath":[{"list":xpathFunctions,"details":xpathFunctionsDetails,"name":"XPath functions"}]
};
keywordsMatch = Array();
keywords = Array();
for (var topic in keywordSources) {
for (var i in keywordSources[topic]) {
  source = keywordSources[topic][i];
  for (var j in source["list"]) {
	var keyword = source["list"][j];
	if (!keywordsMatch[keyword]) {
	   keywordsMatch[keyword]={};
	}
	if (!keywordsMatch[keyword][source["name"]]) {
	   keywordsMatch[keyword][source["name"]] = Array();
	}
	for (var k in source["details"][keyword]) {
 	  keywordsMatch[keyword][source["name"]].push(source["details"][keyword][k]);
	}
  }
}
}

function makeReplacingAccordion(accordion) {
  accordion.css("position","relative");
  accordion.accordion('option','navigation', true);
  accordion.accordion('option','autoHeight','false');
  accordion.accordion('option','collapsible',true);
  accordion.accordion('option','animated',false);
  accordion.bind('accordionchangestart', function() {
if ($(".ui-state-active",accordion).length) {
   $(".ui-state-default",accordion).parent().css("z-index","-1");
   $(".ui-state-default",accordion).parent().css("position","relative");
   $(".ui-state-active",accordion).parent().css("z-index",1);
   $(".ui-state-active",accordion).parent().css("position","absolute");
   $(".ui-state-active",accordion).parent().animate({top:0})
 } else {
   $(".ui-state-default",accordion).parent().css("z-index","0")
   $(".ui-state-default",accordion).parent().css("position","relative");
   $(".ui-state-default",accordion).parent().animate({top:"auto"})
 }
});
}

jQuery(document).ready(function($) {
  // Tabs
  $('#content').css("overflow","hidden");
  //$('#content').css("height","480px");
  $('#content').tabs();
  $(".accordion").accordion({header:'div >h3',active:false,autoHeight:false});
  makeReplacingAccordion($(".accordion"));

  $("#search").autocomplete(keywords);
  $("input.source").change(function() {
	keywords = [];
	$("input.source:checked").each(function() {
	  for (var i in keywordSources[$(this).val()]) {
	    keywords = keywords.concat(keywordSources[$(this).val()][i]["list"]);
	  }
	});
	keywords = make_unique(keywords);
	$("#search").setOptions({"data":keywords});
  }).change();
  $("#search").result(function(e,d,f) {	
	var details = keywordsMatch[d];
	if ($("#details").accordion) {
          $("#details").accordion("destroy");
        }
	$("#details").html("");
	for (var i in details) {
	  div = $("<div></div>").appendTo($("#details"));
	  div.append("<h2>" + i + " <code>" + d + "</code></h2>");
  	  for (var j in details[i]) {
	   var dl = $("<dl></dl>").appendTo(div);

	   for (var k in details[i][j]) {
	    if (k!="source") {
	     var dt = $("<dt></dt>").appendTo(dl);
	     dt.text(k);
	     var dd = $("<dd></dd>").appendTo(dl);
             dd.text(details[i][j][k]);
            } else {
	     dl.append("<dt><a href='" + details[i][j][k] + "'>source</a></dt>");
	    }
	   }
	  }
        }
	$("#details").accordion({header:'div>h2',autoHeight:false});
	makeReplacingAccordion($("#details"));
 	
  });

});