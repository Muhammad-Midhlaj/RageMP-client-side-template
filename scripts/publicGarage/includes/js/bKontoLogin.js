$('#KontoLoginButton').click(() => {

    $('.alert').remove();
    mp.trigger('bKontoLoginToServer', $('#BankPinLogin').val());
});


$('#CloseButton').click(() => {

    $('.alert').remove();
    mp.trigger('CloseMenu');
});