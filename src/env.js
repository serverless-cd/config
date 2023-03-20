const path = require('path');
const fs = require('fs');
const dotenv = require('dotenv');
const { transformEnv } = require('./util');

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

const envs = transformEnv();
const { WORKER_FUNCTION_NAME, OSS_BUCKET, GITHUB_REDIRECT_URI, SESSION_EXPIRATION } = envs;

// 获取密钥配置
const ACCOUNT_ID = envs.ACCOUNT_ID || envs.FC_ACCOUNT_ID;
const ACCESS_KEY_ID = envs.ACCESS_KEY_ID || envs.ALIBABA_CLOUD_ACCESS_KEY_ID;
const ACCESS_KEY_SECRET = envs.ACCESS_KEY_SECRET || envs.ALIBABA_CLOUD_ACCESS_KEY_SECRET;
const SECURITY_TOKEN = envs.SECURITY_TOKEN || (ACCESS_KEY_ID && ACCESS_KEY_ID.startsWith('STS.') ? envs.ALIBABA_CLOUD_SECURITY_TOKEN : undefined);

// 部署的地区信息
const REGION = envs.REGION || envs.FC_REGION;
const SERVICE_NAME = envs.SERVICE_NAME || envs.FC_SERVICE_NAME;

// 判断是否支持 github 登陆
const supportGithubLogin = !!(envs.GITHUB_CLIENT_ID && envs.GITHUB_CLIENT_SECRET);
// github 登陆的授权回调地址
const githubRedirectUrl = supportGithubLogin ? `https://github.com/login/oauth/authorize?client_id=${envs.GITHUB_CLIENT_ID}&redirect_uri=${GITHUB_REDIRECT_URI}` : undefined;
// 判断是否支持 gitee 登陆
const supportGiteeLogin = !!(envs.GITEE_CLIENT_ID && envs.GITEE_CLIENT_SECRET);
// gitee 登陆的授权回调地址
const giteeRedirectUrl = supportGiteeLogin ? `https://gitee.com/oauth/authorize?client_id=${envs.GITEE_CLIENT_ID}&redirect_uri=${GITEE_REDIRECT_URI}` : undefined;
// 是否存在 oss 配置
const ossConfig = OSS_BUCKET ? { bucket: OSS_BUCKET, region: `oss-${REGION}` } : undefined;
// jwt 过期时间
const expiration = SESSION_EXPIRATION ? Number(SESSION_EXPIRATION) : 7 * 24 * 60 * 60 * 1000;

// 将已经组合的字段从配置中删除
const deleteKeys = [
  'REGION',
  'FC_REGION',
  'SERVICE_NAME',
  'FC_SERVICE_NAME',
  'WORKER_FUNCTION_NAME',
  'OSS_BUCKET',
  'ACCOUNT_ID',
  'ACCESS_KEY_ID',
  'ACCESS_KEY_SECRET',
  'SECURITY_TOKEN',
  'GITHUB_REDIRECT_URI',
  'FC_ACCOUNT_ID',
  'ALIBABA_CLOUD_ACCESS_KEY_ID',
  'ALIBABA_CLOUD_ACCESS_KEY_SECRET',
  'ALIBABA_CLOUD_SECURITY_TOKEN',
];
deleteKeys.forEach(key => delete envs[key]);

module.exports = {
  // 支持的登陆方式
  SUPPORT_LOGIN: {
    github: supportGithubLogin,
    account: true,
  },
  ...envs,
  SESSION_EXPIRATION: expiration,
  // 配置
  GITHUB_REDIRECT_URI: githubRedirectUrl,
  GITEE_REDIRECT_URI: giteeRedirectUrl,
  // 用于和阿里云交互，需要用到的点：重新部署、使用了 OTS、读 TASK
  CREDENTIALS: {
    accountId: ACCOUNT_ID,
    accessKeyId: ACCESS_KEY_ID,
    accessKeySecret: ACCESS_KEY_SECRET,
    securityToken: SECURITY_TOKEN,
    stsToken: SECURITY_TOKEN,
  },
  // OSS 配置
  OSS_CONFIG: ossConfig,
  // FC 配置
  FC: {
    workerFunction: {
      region: REGION,
      serviceName: SERVICE_NAME,
      functionName: WORKER_FUNCTION_NAME || 'worker',
    },
  },
}

