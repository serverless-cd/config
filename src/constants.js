const os = require('os');

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

const TASK_STATUS = {
  SUCCESS: 'success',
  FAILURE: 'failure',
  CANCEL: 'cancelled',
  RUNNING: 'running',
  PENING: 'pending',
  ERROR_WITH_CONTINUE: 'error-with-continue',
  SKIP: 'skipped',
};

const UID_TOKEN = '1234567890abcdefghijklmnopqrstuvwxyz';
const UID_TOKEN_UPPERCASE = '1234567890abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';


module.exports = {
  // task 运行的状态
  TASK_STATUS,
  // uid 生成 token 字段
  UID_TOKEN,
  // uid 生成 token 字段（包含大写）
  UID_TOKEN_UPPERCASE,
  // 支持的仓库托管平台
  PROVIDER,
  // 用户在团队的角色
  ROLE,
  // 数据库表名称
  TABLE,
  // 需要 unset 的字段
  DEFAULT_UNSET_ENVS,
  // 团队拥有者字段枚举
  OWNER_ROLE_KEYS: [ROLE.OWNER],
  // 团队管理者字段枚举
  ADMIN_ROLE_KEYS: [ROLE.OWNER, ROLE.ADMIN],
  // webhook 事件支持
  WEBHOOK_EVENTS: ['push', 'pull_request'],
  // 不验证登陆的路由
  EXCLUDE_AUTH_URL: ['/', '/auth/login', '/auth/signUp'],
  // 运行 engine 的函数名称
  WORKER_FUNCTION_NAME: 'worker',

  // 默认值
  CD_PIPELINE_YAML: 'serverless-pipeline.yaml',
  DOWNLOAD_CODE_DIR: os.tmpdir(),
  LOG_LOCAL_PATH_PREFIX: '/logs',
}
