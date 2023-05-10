const Discord = require('discord.js');
const ayarlar = require("./artimcim.json");


const neckless = [];
for (let index = 0; index < ayarlar.neckwelcometokenler.length; index++) {
    const token = ayarlar.neckwelcometokenler[index];
    const client = new Discord.Client();
    client.login(token);

    let artimcim;
    client.on('ready', async () => {
        setInterval(() => {
        const welcomeaktivite = Math.floor(Math.random() * (ayarlar.botdinliyor.length));
        client.user.setActivity(`${ayarlar.botdinliyor[welcomeaktivite]}`, {type: "LISTENING"});
    }, 10000);
        client.user.setStatus("idle"); ////////SEC BIRINI IDLE,DND,ONLINE
        console.log(`${client.user.tag} olarak giriş yapıldı.`);
        artimcim = await client.channels.cache.get(ayarlar.welcomeseskanalları[index]).join().catch(err => console.error("Botların Welcome Sesine Girerken Sorun Oluştu."));
    });

    let ses;
    client.on('voiceStateUpdate', async (prev, cur) => {
        if (cur.member.user.bot) return;
        if (cur.channel && (cur.channel.id === ayarlar.welcomeseskanalları[index])) {
            if (cur.channelID === prev.channelID) return;
            if (neckless.includes(cur.member.id) && (cur.member.roles.highest.rawPosition < cur.guild.roles.cache.get(ayarlar.enaltyetkili).rawPosition)) {
                ses = await artimcim.play('Neck Sesler/neck kız welcome.mp3');
                return;
            }
            if ((cur.member.roles.highest.rawPosition < cur.guild.roles.cache.get(ayarlar.enaltyetkili).rawPosition)) {
                ses = await artimcim.play('Neck Sesler/neck kız welcome.mp3');
                neckless.push(cur.member.user.id);
            } else if (cur.member.roles.highest.rawPosition > cur.guild.roles.cache.get(ayarlar.enaltyetkili).rawPosition) {
                ses = await artimcim.play('Neck Sesler/yetkili.');
                neckless.push(cur.member.user.id);
            }
        }
        if (prev.channel && (prev.channel.id === ayarlar.welcomeseskanalları[index]) && (prev.channel.members.size === 1) && ses) ses.end();
    });
    
    client.on('voiceStateUpdate', async (cur) => {
        if (cur.member.id === client.user.id) artimcim = await client.channels.cache.get(ayarlar.welcomeseskanalları[index]).join();
    })

    client.on('voiceStateUpdate', async (___, newState) => {
        if (
        newState.member.user.bot &&
        newState.channelID &&
        newState.member.user.id == client.user.id &&
        !newState.selfDeaf
        ) {
        newState.setSelfDeaf(true);
        }
        });

}
