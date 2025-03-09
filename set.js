const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiY0tIMjZEYXhYVHhJL2Z5VnUvN0JmWWZEcGhoaXpEc2tsWmNRVjJ0ckkycz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoibktOTTdubTN3RnNRSVh2ZnNsWFRBdTJibmNFKzlnU0svSVdhZkVmbE1Yaz0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJPQlR6U1NKZ3FtTGdpRjdzZUFabDg5eC8yazlLS1hhRFpxRUxUKzg2TEdFPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJITWJQZ1Bhb0graW16MWVGRndMb2Ywd2VIeHdsZzBDN2x0KzRjeVJmY25JPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkdEaUIzNUZqeG0vNFNMYUpDcE9oOFdhcnJESTBIWk1JN0hTb2h1SlZsbkE9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Ikd2Q1BRUXBqRlRLRDdtQnMza2lHRGVQd2RscGFtWXRLNFNvbElKL2lwaTQ9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiMEQycG81aWhnZkRramdPVlRUMG1VQXhZekEwN0QzSy9mdHVaS0lGQlAxcz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiT0pTR0RaTUZlb0t5eFBGRzVMU3RaeVNqWHdTSWlJR1ZMZGZNb1NtbWRGTT0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IldMb29RSGpIdGlLekx0WXh6cUxMcFBpQ2FTYVNwdVBBaEtJczJPVTJoRWw2YjI0dzhxYUk4UVVzMFNKSHZGaVQrSlZSYW9sVDZOSjhURU5pbGkxakNBPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MTMsImFkdlNlY3JldEtleSI6IjcyRlU5SU11RzRQc3lCeW1DeW9mb0JrK29JUmJhditmczRQbDhudjI4cTg9IiwicHJvY2Vzc2VkSGlzdG9yeU1lc3NhZ2VzIjpbXSwibmV4dFByZUtleUlkIjozMSwiZmlyc3RVbnVwbG9hZGVkUHJlS2V5SWQiOjMxLCJhY2NvdW50U3luY0NvdW50ZXIiOjAsImFjY291bnRTZXR0aW5ncyI6eyJ1bmFyY2hpdmVDaGF0cyI6ZmFsc2V9LCJkZXZpY2VJZCI6IkxDS0J0X0RaUm9HbEVLb2lqOU9QeGciLCJwaG9uZUlkIjoiNDkxNmNhN2MtOGJmMS00MTBkLTk2NTAtYmU0NDUzMmFlMzE5IiwiaWRlbnRpdHlJZCI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6InZiVXpsMU02M2pkMlp2REUyY1oyZjcwU1RXST0ifSwicmVnaXN0ZXJlZCI6dHJ1ZSwiYmFja3VwVG9rZW4iOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJZZVZDSFBBNW1pU3hVQlpJS3JwRWZIUFlUME09In0sInJlZ2lzdHJhdGlvbiI6e30sInBhaXJpbmdDb2RlIjoiUzFRUFE0M1ciLCJtZSI6eyJpZCI6IjI3NjQzNzc5MDY0OjlAcy53aGF0c2FwcC5uZXQiLCJuYW1lIjoic2lyY3lsZWVvYnNlc3NlZHdpdGhoaXN0ZWRkeWJlYXIifSwiYWNjb3VudCI6eyJkZXRhaWxzIjoiQ1A2L29LQUhFSkQwdEw0R0dBTWdBQ2dBIiwiYWNjb3VudFNpZ25hdHVyZUtleSI6ImhvQ0ZwTmJMbWdmb0ZVY0kxSHhQeXo4aUdBcS9Zc3NCMXF0SWhzZ3Y0Vk09IiwiYWNjb3VudFNpZ25hdHVyZSI6Im83K1hsWXJXdmFKRFg0OWo1Q0MzajYydWpFTVZwU1QxRTUyRnRQTGhwcTJWSElxL2g4TS9XZ3BXRmYwZXNBWWpsWWFIVFgrdVVYNkpxSEpPWndRTEFnPT0iLCJkZXZpY2VTaWduYXR1cmUiOiJPUnljdVRselByREdGd2pmS2k5Mk1INUpnU3RCTWtMYk5aaEtGalAvbXd3aEovUGRTUytycU43ZWNHRTA5K0tFeFgvLzl1aXlRblFlT084eC9OWHNBZz09In0sInNpZ25hbElkZW50aXRpZXMiOlt7ImlkZW50aWZpZXIiOnsibmFtZSI6IjI3NjQzNzc5MDY0OjlAcy53aGF0c2FwcC5uZXQiLCJkZXZpY2VJZCI6MH0sImlkZW50aWZpZXJLZXkiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJCWWFBaGFUV3k1b0g2QlZIQ05SOFQ4cy9JaGdLdjJMTEFkYXJTSWJJTCtGVCJ9fV0sInBsYXRmb3JtIjoic21iYSIsImxhc3RBY2NvdW50U3luY1RpbWVzdGFtcCI6MTc0MTUwMzAwNSwibXlBcHBTdGF0ZUtleUlkIjoiQUFBQUFHaUsifQ==',
    PREFIXE: process.env.PREFIX || ".",
    OWNER_NAME: process.env.OWNER_NAME || "Cadillac Cylee",
    NUMERO_OWNER : process.env.NUMERO_OWNER || "27835039725",              
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "yes",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || 'no',
    BOT : process.env.BOT_NAME || 'LUMINA-V1',
    URL : process.env.BOT_MENU_LINKS || 'https://files.catbox.moe/ezbwuq.mp4',
    MODE: process.env.PUBLIC_MODE || "yes",
    PM_PERMIT: process.env.PM_PERMIT || 'yes',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME,
    HEROKU_APY_KEY : process.env.HEROKU_APY_KEY ,
    WARN_COUNT : process.env.WARN_COUNT || '3' ,
    ETAT : process.env.PRESENCE || '',
    CHATBOT : process.env.PM_CHATBOT || 'no',
    DP : process.env.STARTING_BOT_MESSAGE || "yes",
                  ANTIDELETE2 : process.env.ANTIDELETE2 || "yes",
                  ANTIDELETE1 : process.env.ANTIDELETE1 || "yes",
    ADM : process.env.ANTI_DELETE_MESSAGE || 'yes',
    ANYWAY_MD : process.env.AUTO_LIKE_STATUS || 'yes',
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgresql://postgres:bKlIqoOUWFIHOAhKxRWQtGfKfhGKgmRX@viaduct.proxy.rlwy.net:47738/railway" : "postgresql://postgres:bKlIqoOUWFIHOAhKxRWQtGfKfhGKgmRX@viaduct.proxy.rlwy.net:47738/railway",
   
};

let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`mise à jour ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});
