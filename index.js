const os = require('os');
require('./env');

const {
  // 用于支持 github 登陆
  GITHUB_CLIENT_ID,
  GITHUB_CLIENT_SECRET,
  GITHUB_REDIRECT_URI,
  // 创建 webhook 的回调地址
  WEBHOOK_URL,
  // 阿里云密钥
  ACCOUNT_ID,
  ACCESS_KEY_ID,
  ACCESS_KEY_SECRET,
  SECURITY_TOKEN,
  // 查询 Task 存储在 OSS 的日志
  OSS_BUCKET,
  // 函数部署的地区和服务名称
  REGION,
  SERVICE_NAME,
  // 运行engine的函数名称
  WORKER_FUNCTION_NAME,
  // JWT 鉴权 Token
  JWT_SECRET,
  // 配置文件
  CD_PIPELINE_YAML = 'serverless-pipeline.yaml',
  DOWNLOAD_CODE_DIR = os.tmpdir(),
  // 链接数据库
  DATABASE_URL,
} = process.env;

const ROLE = {
  OWNER: 'owner',
  ADMIN: 'admin',
  MEMBER: 'member',
};

const PROVIDER = {
  GITHUB: 'github',
};

const TABLE = {
  USER: 'user',
  ORG: 'org',
  TASK: 'task',
  APPLICATION: 'application',
};

const supportGithubLogin = !(
  !GITHUB_CLIENT_ID ||
  GITHUB_CLIENT_ID.startsWith('${env.') ||
  !GITHUB_CLIENT_SECRET ||
  GITHUB_CLIENT_SECRET.startsWith('${env.')
);

const DEFAULT_UNSET_ENVS = [
  "DATABASE_URL",
  "JWT_SECRET",
  'CD_PIPELINE_YAML',
  'DOWNLOAD_CODE_DIR',
  'GITHUB_CLIENT_ID',
  'GITHUB_CLIENT_SECRET',
  'ACCOUNT_ID',
  'ACCESS_KEY_ID',
  'ACCESS_KEY_SECRET',
  'OSS_BUCKET',
  'REGION',
];

const UID_TOKEN = '1234567890abcdefghijklmnopqrstuvwxyz';
const UID_TOKEN_UPPERCASE = '1234567890abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';

module.exports = {
  DATABASE_URL,
  // uid 生成 token 字段
  UID_TOKEN,
  // uid 生成 token 字段（包含大写）
  UID_TOKEN_UPPERCASE,
  // 用户在组织的角色
  ROLE,
  // 支持代码仓库
  PROVIDER,
  // 数据库表名称
  TABLE,
  // cd 的 pipeline 文件名称
  CD_PIPELINE_YAML,
  // 下载代码本地路径
  DOWNLOAD_CODE_DIR,
  // 需要 unset 的字段
  DEFAULT_UNSET_ENVS,
  // 组织拥有者字段枚举
  OWNER_ROLE_KEYS: [ROLE.OWNER],
  // 组织管理者字段枚举
  ADMIN_ROLE_KEYS: [ROLE.OWNER, ROLE.ADMIN],
  // 登陆超时时间
  SESSION_EXPIRATION: 7 * 24 * 60 * 60 * 1000,
  // webhook 事件支持
  WEBHOOK_EVENTS: ['push', 'pull_request'],
  // 不验证登陆的路由
  EXCLUDE_AUTH_URL: ['/', '/auth/login', '/auth/signUp'],
  // 用于支持 github 登陆
  GITHUB: {
    clientId: GITHUB_CLIENT_ID,
    secret: GITHUB_CLIENT_SECRET,
    redirectUrl: `https://github.com/login/oauth/authorize?client_id=${GITHUB_CLIENT_ID}&redirect_uri=${GITHUB_REDIRECT_URI}`
  },
  // 创建 webhook 的回调地址
  WEBHOOK_URL: WEBHOOK_URL || `http://${process.env.DOMAIN}`,
  // 用于和阿里云交互，需要用到的点：重新部署、使用了 OTS、读 TASK
  CREDENTIALS: {
    accountId: ACCOUNT_ID,
    accessKeyId: ACCESS_KEY_ID,
    accessKeySecret: ACCESS_KEY_SECRET,
    securityToken: SECURITY_TOKEN,
  },
  // OSS 配置
  OSS_CONFIG: {
    bucket: OSS_BUCKET,
    region: `oss-${REGION}`,
  },
  // FC 配置
  FC: {
    workerFunction: {
      region: REGION,
      serviceName: SERVICE_NAME,
      functionName: WORKER_FUNCTION_NAME,
    },
  },
  // 支持的登陆方式
  SUPPORT_LOGIN: {
    github: supportGithubLogin,
    account: true,
  },
  JWT_SECRET,
}
