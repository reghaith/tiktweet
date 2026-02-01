require('dotenv').config();
const { Client, GatewayIntentBits } = require('discord.js');

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
    ]
});

client.once('ready', async () => {
    console.log(`✅ Logged in as ${client.user.tag}`);

    try {
        const guildId = process.env.GUILD_ID;
        const guild = await client.guilds.fetch(guildId);

        if (!guild) {
            console.log('❌ Guild not found. Check your GUILD_ID.');
            process.exit(1);
        }

        console.log(`🏠 Connected to server: ${guild.name}`);
        console.log(`📊 Server has ${guild.channels.cache.size} channels`);

        // Find the media-storage channel
        const channel = guild.channels.cache.find(ch => 
            ch.name === 'media-storage' && 
            ch.type === 0
        );

        if (!channel) {
            console.log('❌ Channel "media-storage" not found.');
            console.log('');
            console.log('Please make sure:');
            console.log('1. Channel name is exactly "media-storage" (lowercase)');
            console.log('2. It is a text channel in this server');
            process.exit(1);
        }

        console.log(`✅ Found channel: #${channel.name}`);
        console.log(`🆔 CHANNEL ID: ${channel.id}`);
        console.log('');
        console.log('💡 Update your .env file:');
        console.log(`STORAGE_CHANNEL_ID=${channel.id}`);

    } catch (error) {
        console.error('❌ Error:', error.message);
        process.exit(1);
    }
});

client.login(process.env.DISCORD_TOKEN);

process.on('unhandledRejection', error => {
    console.error('❌ Unhandled promise rejection:', error);
    process.exit(1);
});
