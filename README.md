# YouTube Bilingual Subtitles

在 **iPad / iPhone 的 YouTube 原生 App** 中通过 **Quantumult X** 显示中英双语或仅中文字幕，无需更换播放器。

支持 **DeepSeek、火山方舟、OpenRouter** 和自定义 OpenAI 兼容接口。通过 **BoxJS** 配置 API Key、模型、并发数与字幕响应时间。

> 当前正式版：**v1.5.0**。由 Preview.18 功能升级而来；长视频的加载速度、实际中文覆盖率仍受模型、网络及 YouTube 播放器影响。

## 功能

- **双语 / 仅译文**：双语时中文在上、英文在下；翻译失败的片段保留英文。
- **长视频翻译**：按响应预算并行翻译，长句独立对齐；火山方舟与 OpenRouter 可对超长字幕自动调整翻译批次。
- **缓存复用**：最近使用的字幕最多缓存 20 条（受容量限制）；超长字幕分块存储，再次进入视频可继续补齐。
- **平台独立配置**：四类接口分别保存 Key、模型和端点；切换平台不清空其他配置。

## 安装

需要 YouTube 官方 iOS App、Quantumult X、BoxJS 和一个可用的翻译 API Key。

1. 在 Quantumult X 启用 **Rewrite**，为字幕相关域名配置 **MitM**，并安装、信任自己的 HTTPS 解密证书。可参考 Quantumult X 的说明。
2. 在 QX「重写 → 引用」添加下列**正式版字幕订阅**，启用后更新资源：

   ```text
   https://raw.githubusercontent.com/qutary/youtube-bilingual-subtitles/main/YouTube.Bilingual.snippet
   ```

3. 安装 [BoxJS](https://docs.boxjs.app/)，在其「订阅」添加**正式版配置**：

   ```text
   https://raw.githubusercontent.com/qutary/youtube-bilingual-subtitles/main/youtube-bilingual.boxjs.json
   ```

4. 在 BoxJS「应用 → YouTube Bilingual Subtitles」选择平台，填写 **API Key** 与模型 ID，点击保存；在 YouTube 播放器的 **CC** 中选择 **English / English (auto-generated)** 原字幕轨。

**注意：** QX 字幕订阅负责执行重写；BoxJS 订阅只提供配置界面，二者都要安装。同一时间**只启用一个** YouTube 字幕重写，请停用旧测试版或其他同类脚本，避免互相覆盖。不需要运行旧版的 `set-deepseek-local.js`。

## Shadowrocket 版本（Preview 1）

仓库新增独立的 Shadowrocket 移植版，使用 Shadowrocket 原生 Module 参数配置，不需要 BoxJS。翻译核心沿用 QX v1.5.0；网络请求、持久化和参数读取改为 Shadowrocket 原生接口。当前为 **Preview 3**，翻译平台及字幕显示使用中文开关，API Key 参数提供可编辑占位符；尚待真实 iOS 设备端到端验证。

当前 PR 分支可先使用 [Shadowrocket Preview 模块](https://raw.githubusercontent.com/qutary/youtube-bilingual-subtitles/feature/shadowrocket-support/shadowrocket/YouTube.Bilingual.shadowrocket.preview.module) 进行真机验证；正式模块地址将在 PR 合并后生效。

模块订阅地址：

```text
https://raw.githubusercontent.com/qutary/youtube-bilingual-subtitles/main/shadowrocket/YouTube.Bilingual.shadowrocket.module
```

1. 在 Shadowrocket「配置 → 模块 → +」中添加模块地址。
2. 对当前配置启用 HTTPS 解密，安装并信任 Shadowrocket CA 证书。
3. 打开模块「编辑参数」，默认使用 DeepSeek，并将 `DeepSeekKey` 的 `PASTE_API_KEY_HERE` 改为自己的 API Key；按需开启「仅显示中文字幕」。其他平台使用相应中文开关切换。
4. 在 YouTube 原生 App 中选择 English / English (auto-generated) 原字幕轨。

Shadowrocket 版本不使用 BoxJS，缓存使用独立的 `QXYTB_SR_` 前缀。详细说明与已知限制见 [Shadowrocket README](shadowrocket/README.md)。

## 常用设置

| 设置 | 说明 |
| --- | --- |
| 字幕显示 | 双语（中文上 / 英文下）或仅译文 |
| 翻译平台 | DeepSeek / 火山方舟 / OpenRouter / 自定义 |
| 并发数 | 可手动填写 **1–256**；DeepSeek 默认 20，火山和 OpenRouter 默认 10 |
| 字幕响应时间 | 手动填写 **3–30 秒**，默认 **6.3 秒**，支持 `7.7`、`9.5` 等小数 |
| 长视频优化 | 火山方舟和 OpenRouter 默认启用自适应批次、长句可靠分段；必要时可关闭做对照 |
| 绕过译文缓存 | 默认关闭；只在排查 Key 或测试性能时短暂开启 |

**高并发不一定更快。** 可根据设备、模型与实际字幕量逐步调整；极高并发会增加连接、内存和 API 费用。字幕响应时间越长，也越可能遇到 YouTube 客户端提前结束等待的问题。

### 接口与模型

| 平台 | 默认接口 | 模型 |
| --- | --- | --- |
| DeepSeek | `https://api.deepseek.com/chat/completions` | 默认 `deepseek-flash`，可自行修改 |
| 火山方舟 | `https://ark.cn-beijing.volces.com/api/v3/chat/completions` | 填写支持的模型或接入点 ID |
| OpenRouter | `https://openrouter.ai/api/v1/chat/completions` | 填写完整模型 ID，例如 `openai/gpt-6-luna` |
| 自定义 | 自行填写完整 HTTPS Chat Completions 地址 | 填写端点支持的模型 ID |

各接口的模型可用性、参数兼容性及费用以服务商实际配置为准。OpenRouter 的 GPT-6 Luna 默认使用低延迟推理配置，可在 BoxJS 中调整。

## 使用说明与常见问题

**只有英文或部分中文字幕？** 检查字幕源是否为英文、QX 的 Rewrite/MitM 是否生效，以及 BoxJS 中所选平台的 Key、模型是否正确。未完成的字幕会保留英文；退出再进入视频可复用已经翻译的缓存并继续补齐。

**提示“加载字幕时出错”？** 字幕量过大、请求失败或响应等待过长都可能导致播放器放弃加载。尝试缩短字幕响应时间（例如从 9.5 秒降到 6.3 秒），再重新进入视频。插件无法保证 YouTube 一定等待到翻译完成。

**设置没变化？** BoxJS 配置在下一次字幕网络请求时生效；播放器已载入的字幕不会实时刷新，需要重新进入视频。

**如何避免重复收费？** 正常使用时关闭「绕过译文缓存」。变更模型、接口或缓存版本可能让原有译文无法复用。缓存按平台/模型等信息隔离，最多保留最近 20 条记录，仍受容量限制。

**升级后 Key 会消失吗？** v1.5.0 继续沿用原有的 `QXYTB_BETA_` 配置键与译文缓存标识，以保留 Preview 版本已保存的设置。旧式 `QXYTB_DEEPSEEK_KEY` 不会自动导入。若 BoxJS 同时保留测试和正式订阅，请只使用正式版应用入口，避免重名。

## 隐私与限制

API Key 仅应填写在自己的 BoxJS / QX 配置中，**不要上传至 GitHub、公开 HAR、截图或日志**。所选翻译服务会收到待翻译的英文字幕及必要上下文。MitM 会解密指定域名的 HTTPS 流量，请确保理解并自行管理证书。

此工具面向 **YouTube 原生 iOS App**，并不保证支持网页端或所有字幕格式。它不是官方 YouTube 产品。**脚本日志显示完成翻译，不等于播放器一定已成功加载字幕**；已有播放器字幕也不会随着缓存写入而实时更新。

## 版本

- **v1.5.0**：正式整合 Preview.18；三家平台手动并发、手动响应时间、超长字幕自适应批次、长句可靠分段与 OpenRouter 低延迟配置。
- 测试分支：[`preview-boxjs-v1`](https://github.com/qutary/youtube-bilingual-subtitles/tree/preview-boxjs-v1)，用于后续实验，正常使用建议订阅 `main`。
