# Shadowrocket 版本（Preview 1）

这是 YouTube Bilingual Subtitles 的 Shadowrocket 初始移植版。翻译、字幕解析、语义分段、双语渲染、长视频批次调度与缓存逻辑沿用 QX v1.5.0；运行时改用 Shadowrocket 的 `$httpClient`、`$persistentStore`、`$argument` 和 `$done` 接口。

## Preview module for testing this branch

Before this pull request is merged, import the branch-pinned preview module:

```text
https://raw.githubusercontent.com/qutary/youtube-bilingual-subtitles/feature/shadowrocket-support/shadowrocket/YouTube.Bilingual.shadowrocket.preview.module
```

The regular module URL above points to `main` and is intended for use after the pull request is merged. The preview module explicitly loads its script from this feature branch, so it can be tested before merge.

## 安装

模块订阅地址：

```text
https://raw.githubusercontent.com/qutary/youtube-bilingual-subtitles/main/shadowrocket/YouTube.Bilingual.shadowrocket.module
```

1. 在 Shadowrocket 中打开「配置 → 模块 → +」，添加上面的模块地址。
2. 对当前使用的配置启用 HTTPS 解密，安装并信任 Shadowrocket CA 证书。
3. 在模块的「编辑参数」中选择翻译平台，填写该平台的 API Key 和模型 ID；其他平台可以留空。
4. 打开 YouTube 原生 App，在 CC 中选择 English 或 English (auto-generated) 原字幕轨。
5. 首次先用短视频验证，再测试长视频与缓存复用。

## 配置

- 字幕模式：`bilingual`（中文在上、英文在下）或 `translation`（仅中文）。
- 平台：`deepseek`、`volcengine`、`openrouter`、`custom`。
- 响应预算：3–30 秒，默认 6.3 秒；预算越长，播放器放弃加载的风险也越高。
- 并发、JSON 输出模式、OpenRouter 推理强度/路由偏好、火山方舟快速服务等选项通过模块参数调整；并发范围为 1–64，以控制 iOS 网络扩展内存占用。
- Shadowrocket 缓存键使用 `QXYTB_SR_` 前缀，与 QX 的缓存隔离。

## 当前限制与验证状态

- Preview 1 尚未在真实 iOS Shadowrocket + YouTube 原生 App 环境完成端到端验证；特别需要验证模块参数注入、脚本请求超时、字幕大响应体上限及长视频并发稳定性。
- 响应体超过模块的 2 MiB 上限时，Shadowrocket 会跳过脚本处理，原字幕应保持透传。
- Shadowrocket 的持久化接口没有使用 QX 的删除 API；清理缓存时将旧值写为空字符串，缓存清单仍负责控制有效条目。
- HTTPS 解密只追加 YouTube 字幕相关域名，不会要求替换用户现有 MITM 主机列表。
- API Key 只通过本机模块参数传递；不要分享包含密钥的模块参数、配置导出或日志。

## 排障信息

若字幕未翻译，先检查 HTTPS 解密/证书信任、模块是否启用、原字幕轨是否为英文、当前平台的 API Key 和模型是否填写正确。提交日志前请删除 API Key、Authorization、Cookie、视频 URL 中的签名参数及其他令牌。
