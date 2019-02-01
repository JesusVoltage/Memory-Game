$(document).ready(function () {

    $.ajax({
        url: 'colores.json',
        dataType: 'json',
        success: function (datos) {
            colores = datos;
            $(document).ready(function () {
                for (i = 0; i < 9; i++) {
                    $('#tablero').append(
                        '<div class="col-sm-2 text-center"> \
                            <div class="color flip"> \
                                <div class="polaroid flip-1"> \
                                    <div class="arriba bg-dark"></div> \
                                    <div class="abajo"> \
                                    </div> \
                                </div> \
                                <div class="polaroid flip-2"> \
                                    <div class="arriba" style="background:' + colores[0].codigo + ';"></div> \
                                    <div class="abajo"> \
                                    </div> \
                                </div> \
                            </div> \
                        </div>'
                    );
                }

                $(".color").click(function () {
                    $('.color').css('transform', 'perspective(600px) rotateY(-180deg) translateX(100%)');
                });
            });
        }
    });
});