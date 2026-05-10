# Hittoken

一个随机返回语句的 API 服务，数据主要来自周杰伦歌曲歌词。

## 快速开始

```bash
npm install
npm start
```

服务启动后访问 `http://localhost:3000` 即可获取随机语句。

## 部署

项目已配置 Vercel，可直接部署至 Vercel 或其他支持 Node.js 的平台。

## API

### GET /

返回随机语句，格式如下：

```json
{
  "hitokoto": "雨下整夜，我的爱溢出就像雨水",
  "from": "七里香"
}
```

## License

MIT