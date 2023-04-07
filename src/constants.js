const os = require('os');

const ROLE = {
  OWNER: 'owner',
  ADMIN: 'admin',
  MEMBER: 'member',
  VIEWER: 'viewer',
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
  'accessKeyID',
  'securityToken',
  'accessKeySecret',
  'FC_ACCOUNT_ID',
  'ALIBABA_CLOUD_SECURITY_TOKEN',
  'ALIBABA_CLOUD_ACCESS_KEY_ID',
  'ALIBABA_CLOUD_ACCESS_KEY_SECRET',
];

const TASK_STATUS = {
  SUCCESS: 'success',
  FAILURE: 'failure',
  CANCEL: 'cancelled',
  RUNNING: 'running',
  PENDING: 'pending',
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
  // 数据库表名称
  TABLE,
  // 需要 unset 的字段
  DEFAULT_UNSET_ENVS,
  // 用户在团队的角色
  ROLE,
  ROLE_KEYS: Object.values(ROLE),
  // 身份给整个组织使用
  OWNER_ROLE_KEYS: [ROLE.OWNER],
  // 组织管理者: 添加/删除成员，删除应用
  ADMIN_ROLE_KEYS: [ROLE.OWNER, ROLE.ADMIN],
  // 应用管理者: 应用内部相关 部署应用，添加环境
  MEMBER_ROLE_KEYS: [ROLE.OWNER, ROLE.ADMIN, ROLE.MEMBER],
  // webhook 事件支持
  WEBHOOK_EVENTS: ['push', 'pull_request'],
  // 不验证登陆的路由
  EXCLUDE_AUTH_URL: ['/', '/api/auth/login', '/api/auth/signUp', '/api/common/init', '/api/common/webhookTriggered', '/api/auth/callback/github', '/api/auth/callback/gitee', '/api/auth/callback/auth', '/api/auth/updata'],
  // 运行 engine 的函数名称
  WORKER_FUNCTION_NAME: 'worker',

  // 默认值
  CD_PIPELINE_YAML: 'serverless-pipeline.yaml',
  DOWNLOAD_CODE_DIR: os.tmpdir(),
  LOG_LOCAL_PATH_PREFIX: '/logs',
}
