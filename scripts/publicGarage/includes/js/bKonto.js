$('#EinzahlenBtn').click(() => {

    $('.alert').remove();
    mp.trigger('bKontoEinzahlen', $('#EinzahlenSumme').val());
});

$('#AuszahlenBtn').click(() => {

    $('.alert').remove();
    mp.trigger('bKontoAuszahlen', $('#AuszahlenSumme').val());
});

$('#UeberweisenBtn').click(() => {

    $('.alert').remove();
    mp.trigger('bKontoUeberweisen', $('#UeberweisenNamen').val(), $('#UeberweisenSumme').val());
});
