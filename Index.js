const { Client, GatewayIntentBits, ActivityType } = require('discord.js');
const fs = require('fs');
require('dotenv').config();

const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent] });

client.once('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
    
    client.guilds.cache.forEach(guild => {
        console.log(`Connected to server: ${guild.name} with ID: ${guild.id}`);
    });
    
// Presence status of the bot
    client.user.setPresence({
        activities: [{
            name: '/fenno_stinks',
            type: ActivityType.Streaming,
            url: 'https://twitch.tv/K_Nein_200'
        }],
        status: 'online'
    });
});




client.on('interactionCreate', async interaction => {
    if (!interaction.isCommand()) return;

    const { commandName, user } = interaction;

    console.log(`Received command: ${commandName} from user: ${user.username}`);

    // Read the current command counts
    let commandCounts;
    try {
        commandCounts = JSON.parse(fs.readFileSync('./commandCounts.json', 'utf8'));
        console.log('Successfully read commandCounts.json');
    } catch (error) {
        console.error('Error reading commandCounts.json:', error);
        return;
    }

    if (commandName === "fenno_stinks") {  
        console.log(`Processing "fenno_stinks" command for user: ${user.username}`);

        // Check if the user ID is new
        if (!commandCounts.fenno.users.includes(user.id)) {
            // Increment the count for the "fenno" command
            commandCounts.fenno.count += 1;
            // Add the user ID to the list
            commandCounts.fenno.users.push(user.id);

            // Save the updated counts back to the JSON file
            try {
                fs.writeFileSync('./commandCounts.json', JSON.stringify(commandCounts, null, 2));
                console.log('Updated commandCounts.json successfully');
            } catch (error) {
                console.error('Error writing to commandCounts.json:', error);
                return;
            }
                 // Respond to the user if they haven't voted yet
            await interaction.reply(`${user.username} voted that <@548476592083697675> is a stinky fox!`);
        } else { //if the user has already voted
            await interaction.reply("You already voted");
        }
    } else if (commandName === "yes") {  
        console.log(`Processing "yes" command for user: ${user.username}`);
        await interaction.reply(`No`);
    } else if (commandName === "fenno_stinks_count") {
        console.log(`Processing "fenno_stinks_count" command for user: ${user.username}`);
        await interaction.reply(`The current amount of people who think <@548476592083697675> is a stinky fox is: ${commandCounts.fenno.count}\nIf you also think he is stinky use /fenno_stinks`);
        };
});













client.login(process.env.DISCORDBOTTOKEN);