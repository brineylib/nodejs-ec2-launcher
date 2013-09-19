(function($) {
    $("#btn_persona_sign_in_with").click(function(event){
        //if(console && console.log) {console.log("persona_sign_in* clicked");}
        event.preventDefault();
        navigator.id.get(function(assertion) {
            if (assertion) {
                $("input").val(assertion);
                $("form").submit();
            } else {
                location.reload();
            }
        });
    });
})(Zepto);