import Bot from "./classes/Bot";
import { config } from "dotenv";
import Rest from "./classes/Rest";
import Commands from "./commands";
import commands from "./commands";
config();

const init = () => {
  if (!process.env.TOKEN) {
    console.error("O Token não foi encontrado!");
    return;
  }
  if (!process.env.CLIENT_ID) {
    console.error("O ClientId não foi encontrado!");
    return;
  }
  const bot = new Bot(process.env.TOKEN);
  const rest = new Rest(process.env.TOKEN, process.env.CLIENT_ID);
  rest.start();
  rest.registerCommands(commands);
  bot.start();
};
init();
