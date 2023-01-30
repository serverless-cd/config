const path = require('path');
const fs = require('fs');
const dotenv = require('dotenv');

// Serverless-Devs 目录的 env 文件
let envPath = path.join(process.cwd(), '..', '.env');
if (fs.existsSync(envPath)) {
  dotenv.config({ path: envPath });
}

// 项目根目录 env 文件
envPath = path.join(process.cwd(), '.env');
if (fs.existsSync(envPath)) {
  dotenv.config({ path: envPath });
}
