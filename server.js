require('dotenv').config();
const express = require('express');
const { Client, GatewayIntentBits, Partials } = require('discord.js');
const crypto = require('crypto');
const db = require('./database');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

// --- HELPER FUNCTION ---
const generateUniqueCode = () => {
    return 'usr_' + crypto.randomBytes(4).toString('hex');
};

// --- ROUTE 1: REGISTER USER ---
app.post('/register', async (req, res) => {
    const { username } = req.body;

    if (!username) {
        return res.status(400).json({ error: 'Username is required' });
    }

    try {
        // Check if username already exists
        const { data, error } = await db
            .from('users')
            .select('*')
            .eq('username', username);

        if (error) throw error;
        if (data && data.length > 0) {
            return res.status(409).json({ error: 'Username is already taken.' });
        }

        // Generate unique code
        const uniqueCode = generateUniqueCode();

        // Insert user into Supabase
        const { data: insertData, error: insertError } = await db
            .from('users')
            .insert([
                { username, unique_code: uniqueCode }
            ]);

        if (insertError) throw insertError;

        console.log(`✅ New User Created: ${username} | Code: ${uniqueCode}`);

        res.json({
            success: true,
            message: "Account created successfully!",
            user: {
                username: username,
                unique_code: uniqueCode
            }
        });

    } catch (error) {
        console.error('❌ Registration error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// --- ROUTE 2: GET USER BY CODE ---
app.get('/user/:code', async (req, res) => {
    try {
        const { code } = req.params;
        
        const { data, error } = await db
            .from('users')
            .select('*')
            .eq('unique_code', code)
            .single();

        if (error) throw error;
        if (!data) {
            return res.status(404).json({ error: 'User not found' });
        }

        res.json({
            success: true,
            username: data.username
        });

    } catch (error) {
        console.error('❌ Get user error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// --- ROUTE 3: CHECK IF CODE EXISTS ---
app.get('/check-code/:code', async (req, res) => {
    try {
        const { code } = req.params;
        
        const { data, error } = await db
            .from('users')
            .select('*')
            .eq('unique_code', code)
            .single();

        res.json({
            exists: !!data,
            username: data ? data.username : null
        });

    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
});

// --- ROUTE 4: TEST DATABASE CONNECTION ---
app.get('/test-db', async (req, res) => {
    try {
        const { data, error } = await db
            .from('users')
            .select('*')
            .limit(1);

        if (error) throw error;

        res.json({ 
            success: true, 
            message: "Database connection successful!",
            data: data 
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, error: err.message });
    }
});

// --- DISCORD BOT EVENTS ---

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
    ],
    partials: [Partials.Message, Partials.Channel]
});

client.once('ready', () => {
    console.log(`✅ Discord bot logged in as ${client.user.tag}!`);
    console.log(`📊 Serving in ${client.guilds.cache.size} servers`);
});

client.on('messageCreate', async (message) => {
    if (message.author.bot) return;

    const storageChannelId = process.env.STORAGE_CHANNEL_ID;
    if (!storageChannelId || message.channelId !== storageChannelId) return;

    const codePattern = /^[A-Z0-9]{8}$/;
    if (!codePattern.test(message.content)) return;

    const { data } = await db
        .from('users')
        .select('*')
        .eq('unique_code', message.content);

    if (data && data.length > 0) {
        const user = data[0];
        
        try {
            await db
                .from('users')
                .update({ discord_message_id: message.id })
                .eq('unique_code', message.content);

            message.reply({
                content: `✅ **Account Linked Successfully!**\n\nWelcome, ${user.username}! Your account is now connected to this Discord account.`,
                ephemeral: false
            });

            console.log(`✅ User ${user.username} linked to Discord message ID: ${message.id}`);

        } catch (error) {
            console.error('❌ Error linking account:', error);
            message.reply({
                content: '❌ Error linking your account. Please try again.',
                ephemeral: false
            });
        }
    } else {
        message.reply({
            content: '⚠️ Invalid code. Make sure you have a valid unique code from the signup process.',
            ephemeral: false
        });
    }
});

// --- START SERVER & BOT ---

app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
    console.log(`📝 Supabase Database URL: ${process.env.SUPABASE_URL}`);
    console.log(`📝 Available endpoints:`);
    console.log(`   POST /register - Create new user account`);
    console.log(`   GET  /user/:code - Get user by unique code`);
    console.log(`   GET  /check-code/:code - Verify code exists`);
    console.log(`   GET  /test-db - Test Supabase connection`);
});

// Discord bot login - wrapped in try-catch to prevent server crash
client.login(process.env.DISCORD_TOKEN).catch(error => {
    console.log('⚠️ Discord bot login failed (server will continue without Discord):');
    console.error(error.message);
});

process.on('SIGINT', () => {
    console.log('\n🛑 Shutting down gracefully...');
    client.destroy();
    process.exit(0);
});
