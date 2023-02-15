
// 1. 适配低版本的 s 解析机制，空无法转换的情况
// 2. json 串转成 json 格式
const transformEnv = () => {
  const envs = Object.entries(JSON.parse(JSON.stringify(process.env)));
  const data = {};
  envs.forEach(([key, value]) => {
    if (!(value.startsWith('${env.') || value.startsWith('${vars.'))) {
      try {
        data[key] = JSON.parse(value);
      } catch (e) {
        data[key] = value;
      }
    }
  });
  return data;
};

module.exports = {
  transformEnv,
}
