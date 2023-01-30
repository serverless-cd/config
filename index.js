require('./env');

const {
  // 用于支持 github 登陆
  GITHUB_CLIENT_ID,
  GITHUB_CLIENT_SECRET,
  GITHUB_REDIRECT_URI,
  // 创建 webhook 的回调地址
  WEBHOOK_URL,
  // 用于调用函数计算函数，需要用到的点：重新部署、使用了 OTS、读 TASK
  ACCOUNT_ID,
  ACCESS_KEY_ID,
  ACCESS_KEY_SECRET,
  // 查询 Task 存储在 OSS 的日志
  OSS_BUCKET,
  // 函数部署的地区和服务名称
  REGION,
  SERVICE_NAME,
  // 运行engine的函数名称
  WORKER_FUNCTION_NAME,
  // JWT 鉴权 Token
  COOKIE_SECRET: JWT_SECRET,
  // 配置文件
  CD_PIPELINE_YAML = 'serverless-pipeline.yaml',
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

const constants = {
  // 用户在组织的角色
  ROLE,
  // 支持代码仓库
  PROVIDER,
  // 数据库表名称
  TABLE,
  // cd 的 pipeline 文件名称
  CD_PIPELINE_YAML,
  // 组织拥有者字段枚举
  OWNER_ROLE_KEYS: [ROLE.OWNER],
  // 组织管理者字段枚举
  ADMIN_ROLE_KEYS: [ROLE.OWNER, ROLE.ADMIN],
  // 登陆超时时间
  SESSION_EXPIRATION: 7 * 24 * 60 * 60 * 1000,
  // webhook 事件支持
  WEBHOOK_EVENTS: ['push', 'pull_request'],
  // 不验证登陆的路由
  EXCLUDE_AUTH_URL: ['/auth/login', '/auth/signUp'],
};

const supportGithubLogin = !(
  !GITHUB_CLIENT_ID ||
  GITHUB_CLIENT_ID.startsWith('${env.') ||
  !GITHUB_CLIENT_SECRET ||
  GITHUB_CLIENT_SECRET.startsWith('${env.')
);

module.exports = {
  ...constants,
  GITHUB: {
    clientId: GITHUB_CLIENT_ID,
    secret: GITHUB_CLIENT_SECRET,
    redirectUrl: `https://github.com/login/oauth/authorize?client_id=${GITHUB_CLIENT_ID}&redirect_uri=${GITHUB_REDIRECT_URI}`
  },
  WEBHOOK_URL: WEBHOOK_URL || `http://${process.env.DOMAIN}`,
  CREDENTIALS: {
    accountId: ACCOUNT_ID,
    accessKeyId: ACCESS_KEY_ID,
    accessKeySecret: ACCESS_KEY_SECRET,
  },
  OSS_CONFIG: {
    bucket: OSS_BUCKET,
    region: `oss-${REGION}`,
  },
  FC: {
    workerFunction: {
      region: REGION,
      serviceName: SERVICE_NAME,
      functionName: WORKER_FUNCTION_NAME,
    },
  },
  SUPPORT_LOGIN: {
    github: supportGithubLogin,
    account: true,
  },
  JWT_SECRET,
}
