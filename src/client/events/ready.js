module.exports = (client) => {
    const status = [
        {
            name: "Tem alguma dúvida ou encontrou algum bug? Vá no meu servidor de suporte!",
        },
        {
            name: "Bot em BETA!",
        }
    ];

    function setStats() {
        var randomStatus = status[Math.floor(Math.random() * status.length)];
        client.user.setActivity(randomStatus.name);
    }

    client.user.setStatus('dnd')
    
    setStats();
    setInterval(() => {
        setStats();
    }, 10 * 1000);
};
