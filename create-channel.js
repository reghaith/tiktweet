require('dotenv').config();
const { Client, GatewayIntentBits, PermissionFlagsBits } = require('discord.js');

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

        // Check bot's permissions
        const botMember = await guild.members.fetch(client.user.id);
        const permissions = botMember.permissions;
        console.log(`📋 Bot has permissions: ${permissions.has(PermissionFlagsBits.ManageChannels) ? '✅ Manage Channels' : '❌ No Manage Channels'}`);

        // Try to create channel
        const channel = await guild.channels.create({
            name: 'media-storage',
            type: 0 // GUILD_TEXT
        });

        console.log(`✅ Successfully created channel: #media-storage`);
        console.log(`🆔 Channel ID: ${channel.id}`);

    } catch (error) {
        if (error.code === 50013) {
            console.log('❌ Bot missing "Manage Channels" permission.');
            console.log('');
            console.log('💡 To fix this:');
            console.log('1. Go to https://discord.com/developers/applications');
            console.log('2. Select your bot application');
            console.log('3. Go to "Bot" section → "Privileged Gateway Intents"');
            console.log('4. Enable: ✅ Message Content Intent');
            console.log('5. Go to "OAuth2 → URL Generator"');
            console.log('6. Add permission: ✅ Manage Channels (0x0000000010)');
            console.log('7. Copy generated URL');
            console.log('8. Re-invite bot to server');
            process.exit(1);
        } else if (error.code === 50003) {
            console.log('⚠️ Channel named "media-storage" already exists!');
            console.log('');
            console.log('💡 Find the channel manually:');
            console.log('1. Look for #media-storage in your server');
            console.log('2. Right-click the channel → Copy Channel ID');
            console.log('');
            console.log('💡 Or create a new channel:');
            console.log('1. Create a text channel named "media-storage-2"');
            console.log('2. Right-click → Copy Channel ID');
            console.log('3. Update STORAGE_CHANNEL_ID in .env file');
            process.exit(1);
        } else {
            console.error('❌ Error creating channel:', error.message);
            process.exit(1);
        }
    }
});

client.login(process.env.DISCORD_TOKEN);

process.on('unhandledRejection', error => {
    console.error('❌ Unhandled promise rejection:', error);
    process.exit(1);
});
