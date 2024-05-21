window.Telegram.WebApp.ready();

document.getElementById('userForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const name = document.getElementById('name').value;
    const age = document.getElementById('age').value;
    const address = document.getElementById('address').value;

    const data = {
        name: name,
        age: age,
        address: address
    };

    Telegram.WebApp.sendData(JSON.stringify(data)); // Envia os dados para o bot do Telegram
});
