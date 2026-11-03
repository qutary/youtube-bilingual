# Shadowrocket 版本（Preview 3）

这是 YouTube Bilingual Subtitles 的 Shadowrocket 初始移植版。翻译、字幕解析、语义分段、双语渲染、长视频批次调度与缓存逻辑沿用 QX v1.5.0；运行时改用 Shadowrocket 的 `$httpClient`、`$persistentStore`、`$argument` 和 `$done` 接口。

## 测试版模块（请优先安装此地址）

在 PR 合并前使用以下测试版订阅地址：

```text
https://raw.githubusercontent.com/qutary/youtube-bilingual-subtitles/feature/shadowrocket-support/shadowrocket/YouTube.Bilingual.shadowrocket.preview.module
```

正式模块订阅地址指向 `main` 分支，合并 PR 前尚未生效；测试模块则固定加载当前开发分支。

## 安装

模块订阅地址：

```text
https://raw.githubusercontent.com/qutary/youtube-bilingual-subtitles/main/shadowrocket/YouTube.Bilingual.shadowrocket.module
```

1. 在 Shadowrocket 中打开「配置 → 模块 → +」，添加上面的模块地址。已安装旧版时，在模块页执行「更新模块」或重新导入测试版。
2. 对当前使用的配置启用 HTTPS 解密，安装并信任 Shadowrocket CA 证书。
3. 在模块「编辑参数」中填写当前平台的 API Key（将 `PASTE_API_KEY_HERE` 替换为真实密钥）。默认 DeepSeek；如使用火山方舟、OpenRouter 或自定义 API，则仅开启对应的一个开关并填写模型 ID。
4. 打开 YouTube 原生 App，在 CC 中选择 English 或 English (auto-generated) 原字幕轨。
5. 首次先用短视频验证，再测试长视频与缓存复用。

## 配置

- 字幕显示：**「仅显示中文字幕」关闭**时显示双语（中文在上、英文在下），**开启**时只显示中文字幕。无需手动输入英文模式值。
- 翻译平台：默认使用 DeepSeek；切换至火山方舟、OpenRouter、自定义接口时，仅开启对应的一个开关，其余保持关闭。
- API Key：在「编辑参数」中找到 `DeepSeekKey` 等相应字段，将灰色默认占位符 `PASTE_API_KEY_HERE` 替换成真实 API Key；不要把密钥公开。
- 响应预算：3–30 秒，默认 6.3 秒；预算越长，播放器放弃加载的风险也越高。
- 并发、JSON 输出模式、OpenRouter 推理强度/路由偏好、火山方舟快速服务等选项通过模块参数调整；并发范围为 1–64，以控制 iOS 网络扩展内存占用。
- Shadowrocket 缓存键使用 `QXYTB_SR_` 前缀，与 QX 的缓存隔离。

## 当前限制与验证状态

- Preview 3 尚未在真实 iOS Shadowrocket + YouTube 原生 App 环境完成端到端验证；特别需要验证模块参数注入、脚本请求超时、字幕大响应体上限及长视频并发稳定性。
- 响应体超过模块的 2 MiB 上限时，Shadowrocket 会跳过脚本处理，原字幕应保持透传。
- Shadowrocket 的持久化接口没有使用 QX 的删除 API；清理缓存时将旧值写为空字符串，缓存清单仍负责控制有效条目。
- HTTPS 解密只追加 YouTube 字幕相关域名，不会要求替换用户现有 MITM 主机列表。
- API Key 只通过本机模块参数传递；不要分享包含密钥的模块参数、配置导出或日志。

## 排障信息

若字幕未翻译，先检查 HTTPS 解密/证书信任、模块是否启用、原字幕轨是否为英文、当前平台的 API Key 和模型是否填写正确。提交日志前请删除 API Key、Authorization、Cookie、视频 URL 中的签名参数及其他令牌。
