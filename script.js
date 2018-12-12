const url = "https://idolrecognize.azurewebsites.net/api/Recognize?code=Y9rzvQiplGtzoDbWTLrufjpsNRIYUpLbBAaWq0fM9uE2X1cNabCvkg=="; 
$(function() {
    $("#btn-submit").click(function() {
        main(); 
    }); 

    $("#input-url").on('keyup', function(event) {
        if (event.keyCode == 13) {
            main();
        }
    })
})

function main() {
    $("#idol-face").remove();
    $("#link1").remove();
    $("#link2").remove();
    var imgUrl = $("#input-url").val(); 
    $("#img-result").attr("src", imgUrl);
    $.ajax({
        type: "GET", 
        contentType: "application/json", 
        url: url + "&url=" + imgUrl,
        beforeSend: function() {
            $('#loading').css("display", "flex"); 
        },
        success: function(data) {
            $.ajax({
                url: "https://en.wikipedia.org/w/api.php?action=opensearch&search=" + data[0].name + "&limit=1&namespace=0&format=json",
                beforeSend: function() {
                    $('loading').show(); 
                },
                success: function(data) {
                    if(data[3].length > 0) {
                        $('<a id="link1" href="' + data[3][0] + '" target="_blank" style="bottom: 50%">' + data[3][0] + '</a>').appendTo("#result");
                    }
                }
            });

            $.ajax({
                url: "https://vi.wikipedia.org/w/api.php?action=opensearch&search=" + data[0].name + "&limit=1&namespace=0&format=json",
                beforeSend: function() {
                    $('loading').show(); 
                },
                success: function(data) {
                    if(data[3].length > 0) {
                        $('<a id="link2" style="bottom: 40%" href="' + data[3][0] + '" target="_blank">' + data[3][0] + '</a>').appendTo("#result");
                    }
                }
            });

            if (data.length > 0) {
                $("#result").html("Idol bạn đang tìm kiếm tên là: " +  data[0].name + "<br /> <br /> THÔNG TIN THÊM CHO ANH EM"); 

                var width = data[0].face.width + "px"; 
                var height = data[0].face.height + "px";
                var left = data[0].face.left + "px";
                var top = data[0].face.top + "px";
                var $newIdolFace = $('<div id="idol-face" style="width:' + width + ';height: ' + height + ";top: " + top + ";left: " + left + ';position:absolute; border: 2px solid darkseagreen"></div>'); 
                $("#div-img").append($newIdolFace);
                $("#div-result").css("display", "flex");
            }
            else {
                $("#error").modal("show");  
            }
        },
        complete: function() {
          $("#loading").css("display", "none");  
        },
        error: function(data) {
            $("#error").modal("show"); 
        }
    })
}