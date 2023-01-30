const path = require('path');
const fs = require('fs');
const dotenv = require('dotenv');

// 项目根目录 env 文件
let envPath = path.join(__dirname, '..', '..', '..', '.env');
if (fs.existsSync(envPath)) {
  dotenv.config({ path: envPath });
}

// Serverless-Devs 目录的 env 文件
envPath = path.join(__dirname, '..', '..', '..', '..', '.env');
if (fs.existsSync(envPath)) {
  dotenv.config({ path: envPath });
}
