$(document).ready(function () {
    //map for storing info of dragged items
    var mapForUniqueElement = new Object();
    var mapForSameElement = new Object();
    var x = null;
    //Make element draggable
    $(".drag").draggable({
        helper: 'clone',
        cursor: 'move',
        tolerance: 'fit',
        stack: '.drag',
        revert: "invalid",
        addClasses: false
    });
    $("#droppable").droppable({
        drop: function (e, ui) {
            var idOfDrag = $(ui.draggable)[0].id.split('-');
            if (mapForUniqueElement[idOfDrag[0]] != 1 && idOfDrag.length==1) {
                mapForUniqueElement[idOfDrag[0]]=1;
                //clone the element
                x = ui.helper.clone();
                var pos = ui.offset;
                /*Add a number to id so that if same element is dragged
                 it can be differentiated using this number
                 */
                var id = idOfDrag[0]+"-"+"1".toString();
                //set the map with number of same element in droppable area
                //initially it will be set to 1 when a new element is dragged
                mapForSameElement[idOfDrag[0]]=1;
                x.attr('id',id);
                //remove the cloned element
                ui.helper.remove();
                x.draggable({
                    helper: 'original',
                    containment: '#droppable',
                    tolerance: 'fit',
                    stack: '.drag',
                    addClasses: false
                }).rotatable();
                x.resizable({
                });
                x.css({left:"0px",top:"0px"});
                x.appendTo('#droppable');
            }else if(mapForUniqueElement[idOfDrag[0]] == 1 && idOfDrag.length==1){
                x = ui.helper.clone();
                var pos = ui.offset;
                //increment the mapForSameElement by one
                mapForSameElement[idOfDrag]+=1;
                //add the number of same element to id
                var id = idOfDrag[0]+"-"+mapForSameElement[idOfDrag[0]].toString();
                x.attr('id',id);
                ui.helper.remove();
                x.draggable({
                    helper: 'original',
                    containment: '#droppable',
                    tolerance: 'fit',
                    stack: '.drag',
                    addClasses: false
                }).rotatable();
                x.resizable({
                });
                x.css({left:"0px",top:"0px"});
                x.appendTo('#droppable');
            }
        }
    });
});
$(document).click(function(e) {
    //first hide all functions
    $("#droppable").find(".ui-resizable-handle").hide();
    $("#tools").hide();
    $("#droppable").find(".ui-rotatable-handle").hide();

    // matches all children of droppable, change selector as needed
    if( $(e.target).closest(".drag").length > 0 ) {
        $(e.target).closest(".drag").find(".ui-resizable-handle").show();
        $("#tools").show();
        $(e.target).closest(".drag").find(".ui-rotatable-handle").show();
        $('#toolId').val(e.target.parentNode.id);
    }
    else {
        $("#droppable").find(".ui-resizable-handle").hide();
        $("#tools").hide();
        $("#droppable").find(".ui-rotatable-handle").hide();
    }
});


$(function(){
    $('#flip').click(function(e){
        $("#"+$("#toolId")).toggleClass('flip');
    });
});
$(function(){
    $('#remove').click(function(e){
        $("#"+$("#toolId").val()).remove();
    });
});