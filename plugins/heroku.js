/*
██╗  ██╗ ██████╗ ████████╗ █████╗ ██████╗  ██████╗       ███╗   ███╗██████╗ 
██║  ██║██╔═══██╗╚══██╔══╝██╔══██╗██╔══██╗██╔═══██╗      ████╗ ████║██╔══██╗
███████║██║   ██║   ██║   ███████║██████╔╝██║   ██║█████╗██╔████╔██║██║  ██║
██╔══██║██║   ██║   ██║   ██╔══██║██╔══██╗██║   ██║╚════╝██║╚██╔╝██║██║  ██║
██║  ██║╚██████╔╝   ██║   ██║  ██║██║  ██║╚██████╔╝      ██║ ╚═╝ ██║██████╔╝
╚═╝  ╚═╝ ╚═════╝    ╚═╝   ╚═╝  ╚═╝╚═╝  ╚═╝ ╚═════╝       ╚═╝     ╚═╝╚═════╝
 By : Taira Makino
 Github : https://github.com/anonphoenix007
 WhatsApp : https://wa.me/2347080968564
*/                                                                                                                                                    


const got = require("got");
const Heroku = require("heroku-client");
const { command, isPrivate } = require("../lib/");
const Config = require("../config");
const heroku = new Heroku({ token: Config.HEROKU_API_KEY });
const baseURI = "/apps/" + Config.HEROKU_APP_NAME;
const { secondsToDHMS } = require("../lib/functions");
const { delay } = require("@whiskeysockets/baileys");
const isVPS = !(__dirname.startsWith("/HOTARO-MD") || __dirname.startsWith("/HOTARO-MD"));
const isHeroku = __dirname.startsWith("/HOTARO-MD");
const { update } = require("../lib/koyeb");

async function fixHerokuAppName(message = false){
            if (!HEROKU.API_KEY && message) return await message.send
             eply(`_You have not provided HEROKU_API_KEY\n\nPlease fill the HEROKU-API-KEY vars or,get api key from heroku account settings_`)
            let apps = await heroku.get('/apps')
            let app_names = apps.map(e=>e.name)
            if (!HEROKU.APP_NAME || !app_names.includes(Config.HEROKU.APP_NAME)){
            function findGreatestNumber(e){let t=e[0];for(let n=1;n<e.length;n++)e[n]>t&&(t=e[n]);return t}
            let times = apps.map(e=>new Date(e.updated_at).getTime())
            let latest = findGreatestNumber(times)
            let index = times.indexOf(latest)
            let app_name = apps[index].name
            Config.HEROKU.APP_NAME = app_name
            process.env.HEROKU_APP_NAME = app_name
            baseURI = '/apps/' + app_name;
            if (message) await message.reply(`_You provided an incorrect heroku app name, and I have corrected your app name to "${app_name}"_\n\n_Please retry this command after restart!_`)    
            Config.HEROKU.APP_NAME = app_name
                return await setVar("HEROKU_APP_NAME",app_name,message)
            }
}

async function setVar(key,value,message = false){
        key = key.toUpperCase().trim()
        value = value.trim()
        let setvarAction = isHeroku ? "restarting" : isVPS ? "rebooting" : "redeploying";
        var set_ = `_⚙ Successfully set ${key} to ${value}, {}.._`;
        set_ = key == "ANTI_BOT" ? `AntiBot activated, bots will be automatically kicked, {}` : key == "ANTI_SPAM" ? `AntiSpam activated, spammers will be automatically kicked, {}` :key == "CHATBOT" ? `AI Chatbot turned ${value}, {}` : key == "MODE" ? `Mode switched to ${value}, {}`:set_;
        set_ = set_.format(setvarAction)
        let m = message;
        if (isHeroku) {
            await fixHerokuAppName(message)
            await heroku.patch(baseURI + '/config-vars', {
                body: {
                    [key]: value
                }
            }).then(async (app) => {
                if (message){
                return await message.reply(set_)
                }
            });
        }
if (isVPS){
        try { 
        var envFile = fs.readFileSync(`../config.env`,'utf-8')
        const lines = envFile.trim().split('\n');
        let found = false;
        for (let i = 0; i < lines.length; i++) {
        const line = lines[i];
        if (line.startsWith(`${key}=`)) {
            lines[i] = `${key}="${value}"`;
            found = true;
            break;
        }
        }
        if (!found) {
        lines.push(`${key}="${value}"`);
        }
fs.writeFileSync('./config.env', lines.join('\n'));
        if (message){
        await message.reply(set_)
        }
        if (key == "SESSION_ID"){
        await require('fs-extra').removeSync('../lib/auth_info_baileys'); 
        }
        process.exit(0)    
    } catch(e){
        if (message) return await message.reply("_Unable to set var._\n"+e.message);
        }
        } 
        if (__dirname.startsWith("/HOTARO-MD")) {
            let set_res = await update(key,value)
            if (set_res && message) return await message.reply(set_)
            else throw "Error!"
        }   
         }
command(
  {
    pattern: "restart",
    fromMe: true,
    type: "heroku",
    desc: "Restart Dyno",
    type: "heroku",
  },
  async (message) => {
    await message.reply(`_☬ ʜᴏᴛᴀʀᴏ-ᴍᴅ ☬ is Restarting_`);
    if (Config.HEROKU) {
      if (Config.HEROKU_APP_NAME === "") {
        return await message.reply("Add `HEROKU_APP_NAME` env variable");
      }
      if (Config.HEROKU_API_KEY === "") {
        return await message.reply("Add `HEROKU_API_KEY` env variable");
      }
      await heroku.delete(baseURI + "/dynos").catch(async (error) => {
        await message.reply(`HEROKU : ${error.body.message}`);
      });
    } else {
      require("child_process").exec(
        "pm2 restart "+Config.PROCESSNAME,
        (error, stdout, stderr) => {
          if (error) {
            return message.sendMessage(message.jid, `Error: ${error}`);
          }
          return;
        }
      );
    }
  }
);
command(
  {
    pattern: "shutdown",
    fromMe: true,
    type: "heroku",
    desc: "Dyno off",
    type: "heroku",
  },
  async (message) => {
    if (Config.HEROKU) {
      if (Config.HEROKU_APP_NAME === "") {
        return await message.reply("Add `HEROKU_APP_NAME` env variable");
      }
      if (Config.HEROKU_API_KEY === "") {
        return await message.reply("Add `HEROKU_API_KEY` env variable");
      }
      await heroku
        .get(baseURI + "/formation")
        .then(async (formation) => {
          await message.reply(`_☬ ʜᴏᴛᴀʀᴏ-ᴍᴅ ☬ is shutting down._`);
          await heroku.patch(baseURI + "/formation/" + formation[0].id, {
            body: {
              quantity: 0,
            },
          });
        })
        .catch(async (error) => {
          await message.reply(`HEROKU : ${error.body.message}`);
        });
    } else {
      await message.reply(`_☬ ʜᴏᴛᴀʀᴏ-ᴍᴅ ☬ is shutting down._`);
      await delay(1000).then(() => process.exit(0));
    }
  }
);
