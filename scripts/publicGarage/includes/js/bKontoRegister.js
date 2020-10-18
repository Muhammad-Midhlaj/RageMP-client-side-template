$('#KontoRegisterButton').click(() => {

    $('.alert').remove();
    mp.trigger('bKontoRegisterToServer', $('#BankPinLogin').val(), $('#BankPinLoginw').val());
});


$('#CloseButton').click(() => {

    $('.alert').remove();
    mp.trigger('CloseMenu');
});