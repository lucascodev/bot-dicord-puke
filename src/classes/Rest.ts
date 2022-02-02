import { SlashCommandBuilder } from "@discordjs/builders";
import { REST } from "@discordjs/rest";
import { Routes } from "discord-api-types";
import Command from "../interfaces/Command";
class Rest {
  private rest: REST;
  private commands: Command[] = [];
  constructor(private token: string, private cliendId: string) {
    this.rest = new REST({ version: "9" }).setToken(this.token);
  }
  registerCommands(commands: Command[]) {
    this.commands = commands;
  }
  async start() {
    try {
      console.log("Recarregando os comandos de barra...");
      await this.rest.put(Routes.applicationCommands(this.cliendId), {
        body: this.commands.map((command) => {
          const data = new SlashCommandBuilder()
            .setName(command.name.toLowerCase())
            .setDescription(command.description);
          return data.toJSON();
        }),
      });
      console.log(
        "Os commandos dee barra da aplicação foram recarregados com sucesso!"
      );
    } catch (error) {
      console.error(error);
    }
  }
}

export default Rest;
