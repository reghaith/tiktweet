require('dotenv').config();
const { Client, GatewayIntentBits } = require('discord.js');

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
    ]
});

client.once('ready', async () => {
    console.log(`✅ Logged in as ${client.user.tag}`);
    console.log(`📋 Intents enabled:`);
    console.log(`   - Guilds: ${client.options.intents.has(GatewayIntentBits.Guilds)}`);
    console.log(`   - GuildMessages: ${client.options.intents.has(GatewayIntentBits.GuildMessages)}`);
    console.log(`   - MessageContent: ${client.options.intents.has(GatewayIntentBits.MessageContent)}`);

    try {
        const guildId = process.env.GUILD_ID;
        const guild = await client.guilds.fetch(guildId);

        if (!guild) {
            console.log('❌ Guild not found. Check your GUILD_ID.');
            process.exit(1);
        }

        console.log(`🏠 Connected to server: ${guild.name}`);
        console.log(`📊 Server has ${guild.channels.cache.size} channels`);

        const channel = guild.channels.cache.get(process.env.STORAGE_CHANNEL_ID);
        
        if (!channel) {
            console.log('❌ Channel not found. Check STORAGE_CHANNEL_ID.');
            process.exit(1);
        }

        console.log(`✅ Found channel: #${channel.name} (ID: ${channel.id})`);

        // Try to send a test message
        console.log('🧪 Sending test message to channel...');
        await channel.send('🧪 Bot test! If you see this, Discord is working perfectly!');

        console.log('✅ Test message sent successfully!');
        console.log('');
        console.log('💡 Discord bot is fully functional!');
        console.log('');
        console.log('📋 Next steps:');
        console.log('   1. Register a user: curl -X POST http://localhost:3000/register -H "Content-Type: application/json" -d \'{"username":"test"}\'');
        console.log('   2. Copy the unique_code from response');
        console.log('   3. Send that code to #media-storage channel');
        console.log('   4. Bot will link your Discord account!');

        process.exit(0);

    } catch (error) {
        console.error('❌ Error:', error.message);
        console.error('');
        console.log('💡 Troubleshooting:');
        console.log('1. Make sure Message Content Intent is ENABLED in Discord Developer Portal');
        console.log('2. Make sure you clicked "Save Changes"');
        console.log('3. Try re-inviting the bot if permissions were changed');
        console.log('4. Check that STORAGE_CHANNEL_ID is correct');
        process.exit(1);
    }
});

client.login(process.env.DISCORD_TOKEN);

process.on('unhandledRejection', error => {
    console.error('❌ Unhandled promise rejection:', error);
    process.exit(1);
});
