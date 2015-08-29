/**
 * Created by rajesh.sharma on 2015/08/26.
 */
$(document).ready(function () {
    //Make new elements draggable
    $(".drag").draggable({
        helper:"clone",
        cursor: 'move',
        tolerance: 'fit',
        stack: '.drag',
        revert: "invalid"
    });
    $( "#droppable" ).droppable({
        accept : ".drag",
        drop:function (e, ui) {
            x = ui.helper.clone();
            var pos = ui.position;
            //deduct the size of left panel if dragged div goes outside
            if(pos.left>=$("#products").width()){
                pos.left-=$("#products").width();
            }
            if(pos.top>=$("#products").height()){
                pos.top-=$("#products").height();
            }
            ui.helper.remove();
            x.draggable({
                helper: 'original',
                containment: '#droppable',
                tolerance: 'fit',
                stack: '.drag'
            }).rotatable();
            x.resizable({
            });
            x.removeClass("drag");
            x.addClass("dragged");
            x.css({left:pos.left,top:pos.top});
            x.appendTo('#droppable');
            //hide the handlers
            $("#droppable").find(".ui-resizable-handle").hide();
            $("#droppable").find(".ui-rotatable-handle").hide();
            $("#tools").hide();
        }
    });

});
$(document).click(function(e) {

    // matches all children of droppable, change selector as needed
    if( $(e.target).closest(".dragged").length > 0 ) {
        //hide other handlers
        $("#droppable, #droppable1").find(".ui-resizable-handle").hide();
        $("#droppable, #droppable1").find(".ui-rotatable-handle").hide();
        //remove the id of last active item
        $("#activeItem").removeAttr("id");
        $(e.target).closest(".dragged").find(".ui-resizable-handle").show();
        $("#tools").show();
        $(e.target).closest(".dragged").find(".ui-rotatable-handle").show();
        //set the id of active element
        $(e.target).closest(".dragged").attr("id","activeItem");
    }
    else {
        //hide the handlers
        $("#droppable, #droppable1").find(".ui-resizable-handle").hide();
        $("#tools").hide();
        $("#droppable, #droppable1").find(".ui-rotatable-handle").hide();
        $("#activeItem").removeAttr("id");
    }
});


$(function(){
    $('#remove').click(function(e){
        $("#activeItem").remove();
    });
});


$(function() {
    var setJson = {data: {}};
    $("#publish").on("click", function () {
        $("#droppable .dragged").each(function (containerKey,containerValue) {
            var elements = {},subElements = {};
            elements["class"] = containerValue.className;
            elements["id"] = containerValue.id;
            elements["style"] = containerValue.style;
            elements["subelements"] = {};

            //traverse all children of the draggable div
            $(this).children().each(function (key, value) {
                switch (key) {
                    case 0:
                        var itemImage = {};
                        itemImage["class"] = value.className;
                        itemImage["src"] = value.src;
                        itemImage["height"] = value.height;
                        itemImage["width"] = value.width;

                        //add the image element to jsonData
                        elements["subelements"][key] = itemImage;
                        break;
                    default:
                        var handlers = {};
                        handlers["class"] = value.className;
                        handlers["style"] = value.style;
                        //add handlers to jsonData
                        elements["subelements"][key] = handlers;
                }
            });


            //add whole drag div to jsonData
            setJson.data[containerKey] = elements;

        });
        console.log(setJson);
        publishCollection(setJson)
    });
    function publishCollection(jsonData){

        var data = jsonData.data;
        for (collectionCount in data) {
            var collection = '<div id="'+ data[collectionCount].id+'"'
                +' class="'+ data[collectionCount].class+'"'
                +' style="'+ data[collectionCount].style.cssText+'"'
                +'>';
            var collectionElements = data[collectionCount].subelements;
            for ( subelements in  collectionElements) {
                if (subelements == 0) {
                    collection += '<img src="'+ collectionElements[subelements].src+'"'
                        +' height="'+ collectionElements[subelements].height+'"'
                        +' width="'+ collectionElements[subelements].width+'"'
                        +' class="'+ collectionElements[subelements].class+'"'
                        +'>';

                }// else {
                //    collection += '<div class="'+ collectionElements[subelements].class+'"'
                //        +' style="'+ collectionElements[subelements].style.cssText+'"></div>';
                //}
            }
            collection+='</div>';
            console.log(collection);
            $("#droppable1").append(collection);
            $("#droppable1 .dragged").draggable({
                helper: 'original',
                containment: '#droppable1',
                tolerance: 'fit',
                stack: '.drag'
            }).rotatable().resizable({});
        }

    }
});
