$(window).ready(function() {
    const auth = Boolean(sessionStorage.getItem('auth'))

    console.log(auth)

    if(!auth) {

        const container = `<img class="avatar" src="/img/avatar.png" alt="Fiy Verification avatar">
        <h1>Verificação</h1>
        <a href="https://discord.com/api/oauth2/authorize?client_id=784503145237446696&redirect_uri=http%3A%2F%2Flocalhost%3A3333%2Fauth&response_type=code&scope=identify%20guilds" class="button">
            Entrar com 
            <img src="/img/discord.svg" alt="Discord">
        </a>

        <p>Clique no botão acima para entrar com sua conta Discord. Certifique-se de que você está conectado à conta Discord correta no site do Discord antes de verificar.</p>`

        document.getElementById('container').innerHTML = container
    }else {
        const container = `<img class="avatar" src="/img/avatar.png" alt="Fiy Verification avatar">
        <h1>Você foi verificado</h1>
        <img class="checked" src="/img/checked.png" alt="Checked">

        <p>Você foi verificado, basta utilizar o comando !verify.</p>`

        document.getElementById('container').innerHTML = container
    }
});