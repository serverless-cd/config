## 字段描述

环境变量都可透传到项目中，常量可通过环境变量配置的方式覆盖

### 常量

```
TASK_STATUS: engine 运行的所有状态
UID_TOKEN: uid 生成 token 字段
UID_TOKEN_UPPERCASE: uid 生成 token 字段（包含大写）
PROVIDER: 支持的仓库托管平台
ROLE: 用户在团队的角色
TABLE: 数据库表名称
DEFAULT_UNSET_ENVS: worker 运行时需要脱敏的字段
OWNER_ROLE_KEYS: 团队拥有者字段枚举
ADMIN_ROLE_KEYS: 团队管理者字段枚举
WEBHOOK_EVENTS: webhook 事件支持
EXCLUDE_AUTH_URL: 不验证登陆的路由, ['/', '/auth/login', '/auth/signUp']

CD_PIPELINE_YAML: worker 运行的配置文件, 默认值: serverless-pipeline.yaml
DOWNLOAD_CODE_DIR: 代码下载的本地路径，默认临时目录
SESSION_EXPIRATION: 过期时间，默认7天
LOG_LOCAL_PATH_PREFIX: engine 运行日志本地存放路径
```

### ENV 配置

```
JWT_SECRET: 计算登陆的密钥
GITHUB_REDIRECT_URI: GitHub登陆回调地址
GITHUB_CLIENT_ID: Github登陆的应用ID
GITHUB_CLIENT_SECRET: Github登陆的应用密钥
WEBHOOK_URL: 创建 webhook 的回调地址，一般是 master 函数的访问地址
```

CREDENTIALS: aliyun 密钥配置
```
ACCOUNT_ID,ACCESS_KEY_ID,ACCESS_KEY_SECRET,SECURITY_TOKEN: 阿里云密钥配置
```

OSS_CONFIG: OSS 配置
```
REGION: 函数部署的地区
OSS_BUCKET: oss 支持，目前是投递日志到 oss
```
FC:
```
REGION: 函数部署的地区
OSS_BUCKET: oss 支持，目前是投递日志到 oss
SERVICE_NAME: 部署到函数计算的服务名称
WORKER_FUNCTION_NAME: 运行 engine 的函数名称, worker
```
