import 'dotenv/config';
import { REST, Routes, Client, Collection, Events, GatewayIntentBits, Interaction } from 'discord.js';
import fs from 'node:fs';
import path from 'node:path';

interface SlashCommand {
  data: {
    name: string;
    toJSON: () => any;
  };
  execute: (interaction: Interaction) => Promise<void>;
}

export interface CustomClient extends Client {
  commands: Collection<string, SlashCommand>;
}

const client = new Client({ intents: [GatewayIntentBits.Guilds] }) as CustomClient;

client.commands = new Collection<string, SlashCommand>();

const commands: any[] = [];

const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.ts') || file.endsWith('.js'));

for (const file of commandFiles) {
  const filePath = path.join(commandsPath, file);
  const command = require(filePath) as SlashCommand;

  if ('data' in command && 'execute' in command) {
    client.commands.set(command.data.name, command);
    commands.push(command.data.toJSON());
  }
}

client.once(Events.ClientReady, c => {
  console.log(`FUNCIONANDO! LOGADO COMO ${c.user.tag}`);
});

client.on(Events.InteractionCreate, async (interaction: Interaction) => {
  try {
    if (interaction.isChatInputCommand()) {
      const command = client.commands.get(interaction.commandName);
      if (!command) return;
      await command.execute(interaction);
    }
  } catch (err) {
    console.error('Erro ao lidar com interação:', err);
  }
});

const rest = new REST({ version: '10' }).setToken(process.env.DISCORD_TOKEN_DEV!);

(async () => {
  try {
    console.log(`Registrando ${commands.length} comandos...`);
    await rest.put(
      Routes.applicationCommands(process.env.CLIENT_ID_DEV!),
      { body: commands },
    );
    console.log('Comandos registrados com sucesso!');
  } catch (error) {
    console.error('Erro ao registrar comandos:', error);
  }
})();

client.login(process.env.DISCORD_TOKEN_DEV);

