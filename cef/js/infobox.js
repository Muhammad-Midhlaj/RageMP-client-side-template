var boxdata = [
    `<p> Principiante </p>
    <p> ¡Bienvenido a Los Santos! </p>
    <p> Puedes conseguir un trabajo en el Ayuntamiento, </p>
    <p> Puede llegar llamando a un taxi, esperando el autobús o alquilando un scooter. </p>
    <p> Obtenga una licencia para conducir vehículos, puede ingresar a una escuela de manejo y aprobar el "examen de manejo". </p>
    <p> Puede obtener una licencia de armas de la Policía. </p>
    <br>
    <p> Trabajos </p>
    <br>
    <p> El cortacésped está disponible desde el nivel 0 </p>
    <p> Electrician está disponible desde el nivel 1 </p>
    <p> Cartero está disponible desde el nivel 2 </p>
    <p> Busman está disponible desde el nivel 3 </p>
    <p> La mecánica automática está disponible desde el nivel 3 </p>
    <p> Un taxista está disponible desde el nivel 3 </p>
    <p> El colector está disponible desde el nivel 4 </p>
    <p> Trucker está disponible desde el nivel 5 </p>
    <br>
    <p> Equipos </p>
    <br>
    <p> / me [acción]: realiza alguna acción, "/ me mira al cielo". </p>
    <p> / do [event] - Descripción del evento, "/ do empieza a llover". </p>
    <p> / try [action] - La solución a la controvertida situación, "/ intenta reparar la máquina (con éxito)". </p>
    <p> / buybiz - compre un negocio. </p>
    <p> / f - fracciones de chat. </p>
    <p> / expulsar [identificación del jugador] - tirar del auto </p>
    <br>
    <p> Pandillas </p>
    <br>
    <p> / capture - iniciar captura. </p>
    <br>
    <p> Mafia </p>
    <br>
    <p> / bizwar: inicia una guerra por los negocios. </p>
    <br>
    <p> Policía </p>
    <br>
    <p> / pull - sacar de la máquina. </p>
    <p> / incar - poner en el auto. </p>
    <p> / rfp - liberación de la prisión. </p>
    <p> / arresto - encarcelado. </p>
    <p> / su - poner en la lista de buscados. </p>
    <p> / pd: acepta la llamada. </p>
    <br>
    <p> Doctores </p>
    <br>
    <p> / heal [id] [price] - cura al jugador. </p>
    <p> / medkit [id] [price]: vende un botiquín de primeros auxilios a un jugador. </p>
    <p> / ems: acepta la llamada. </p>
    <br>
    <p> Camioneros </p>
    <br>
    <p> / orders - lista de pedidos </p>
    <br>
    <p> Mecánica </p>
    <br>
    <p> / repair - sugerir reparación </p>
    <br>
    <p> Ayuda </p>
    <br>
    <p> / report - escribe una queja sobre un jugador. </p>
    <p> / help: solicite ayuda a la administración del servidor. </p> `,
]

var infobox = new Vue({
    el: '.infobox',
    data: {
        active: false,
        content: "",
        header: "Test",
    },
    methods: {
        set: function(head, id){
            this.header = head
            this.content = boxdata[id]
            this.active = true
        },
        exit: function(){
            this.active = false
            mp.trigger("ib-exit");
        }
    }
})