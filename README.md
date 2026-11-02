# YouTube Bilingual Subtitles

> 在 **YouTube 原生 iOS App** 中使用高质量的中英双语字幕，无须浏览器扩展，也无须更换播放器。

通过 [Quantumult X](https://quantumult.app/) 拦截并重写 YouTube 英文字幕响应，由用户选择的翻译 API 生成简体中文；在 [BoxJS](https://docs.boxjs.app/) 中管理翻译服务、字幕显示和缓存设置。

- **两种字幕模式**：中英双语（中文在上、英文在下），或仅显示中文字幕。
- **多种翻译服务**：DeepSeek、火山方舟、OpenRouter、自定义 OpenAI 兼容 Chat Completions API。
- **字幕时轴对齐**：基于英文原字幕时间信息处理长句与中文意群，尽量保持阅读连贯、减少断句。
- **长视频支持**：按请求预算尽量翻译整条字幕轨道；未完成部分保留源字幕，再次载入可利用已完成缓存补齐。
- **节省 Token**：本机保存译文，最近使用的字幕最多保留 20 条；较长字幕自动分块存储，切换双语/仅译文可复用缓存。


## 安装与配置

### 准备工作

需要 iPad、YouTube 官方 App、Quantumult X，以及所选平台的有效 API Key。BoxJS 用于图形化管理配置，建议先按照 [BoxJS 官方指南](https://docs.boxjs.app/)完成安装；具备同类条件的 iPhone 可能可用，但主要使用场景为 iPad。

Quantumult X 应启用 **重写（Rewrite）**，对字幕相关域名配置 **MitM（HTTPS 解密）** 并在设备上正确安装和信任证书。若尚未了解 MitM 的作用和风险，请先阅读 Quantumult X 的使用说明。

### 1. 添加 Quantumult X 字幕订阅

在 Quantumult X 的「重写 → 引用」添加下面的地址，启用并更新资源与脚本：

```text
https://raw.githubusercontent.com/qutary/youtube-bilingual-subtitles/main/YouTube.Bilingual.snippet
```

**同一时间只启用一个 YouTube 字幕重写规则**，避免其他字幕插件与本项目同时改写 `/api/timedtext`。

### 2. 添加 BoxJS 配置订阅

在 BoxJS 中添加以下订阅，打开 **YouTube Bilingual Subtitles** 应用：

```text
https://raw.githubusercontent.com/qutary/youtube-bilingual-subtitles/main/youtube-bilingual.boxjs.json
```

选择翻译平台，填写该平台对应的 **API Key** 和 **模型 ID**，然后保存。DeepSeek 已预设模型 ID 与 API 地址；其他平台按照各自控制台的实际配置填写。**无需把 API Key 写入 GitHub 仓库、重写订阅或 JavaScript 文件。**

请注意：Quantumult X 订阅负责拦截与生成字幕，BoxJS 订阅只负责显示配置页面；两者都需要设置。

### 3. 在 YouTube 开启字幕

在 YouTube App 中打开视频，点击 **CC**，选择 **English** 或 **English (auto-generated)** 英文字幕轨道。不要选择 YouTube 自带的“自动翻译 → 中文”，否则可能不匹配本项目的字幕处理流程。

如果第一次进入视频只有一部分中文，可以重新打开视频以发起新的字幕请求。已经被 YouTube 加载的字幕不会随着缓存增长而自动替换。

## BoxJS 配置说明

| 设置 | 用途 |
| --- | --- |
| 开启翻译 | 关闭时原样返回原始字幕，不调用翻译 API。 |
| 字幕显示方式 | **双语**：中文在上、英文在下；**仅译文**：优先显示中文。缺失译文时仍保留英文源字幕。 |
| 翻译 API 平台 | DeepSeek、火山方舟、OpenRouter 或自定义接口，各平台的配置互相独立。 |
| JSON 输出模式 | 默认为自动；如果兼容接口不支持 `response_format` 参数，可设为关闭。 |
| 字幕响应等待预算 | **安全 3.2 秒 / 均衡 6.3 秒（默认） / 延长 9.5 秒**。 |
| 临时绕过译文缓存 | 默认关闭；仅在确认新 Key 或调试接口时短暂开启，否则可能重复消耗 Token。 |
| 译文缓存版本 | 默认 `1`；通常不要修改，否则旧译文可能无法复用。 |

#### 翻译接口

| 平台 | API 地址 | 模型设置 |
| --- | --- | --- |
| DeepSeek | `https://api.deepseek.com/chat/completions` | 预设 `deepseek-flash`，可根据端点支持情况调整。 |
| 火山方舟 | `https://ark.cn-beijing.volces.com/api/v3/chat/completions` | 填写对应模型或推理接入点 ID。 |
| OpenRouter | `https://openrouter.ai/api/v1/chat/completions` | 填写完整模型 ID（含提供商前缀）。 |
| 自定义 | 用户填写 HTTPS Chat Completions 地址 | 需支持 Bearer 鉴权、`messages` 与 `choices[0].message.content`。 |

所选接口会收到用于翻译的英文字幕及必要上下文，API 费用由用户在对应服务商的账户承担。不同兼容端点对 JSON 模式、模型参数、速率限制的支持可能有所不同。

## 缓存与长视频

翻译完成的字幕会保存在 Quantumult X 的本机偏好存储中，便于重复播放时减少请求。缓存按翻译平台、接口、模型和字幕内容等信息区分，显示模式之间可以复用相同译文。

- 最近使用的字幕按 LRU 方式管理：**每类字幕缓存最多保留 20 条记录**，另有总容量限制，因此实际保存数量可能不足 20 条。
- 较大的字幕缓存会拆分成多块存储；已保存的翻译单元可在后续请求中继续补齐，不必每次从头翻译。
- 请求时间耗尽、API 响应不完整或个别句子未通过校验时，仅缺失片段回退为原英文字幕。
- 更改模型、端点或缓存版本可能产生新的缓存记录；开启“绕过译文缓存”将跳过既有译文。

**等待预算不等于 YouTube App 保证接受的时间。** 9.5 秒档有利于覆盖字幕量大的视频，但在网络波动或播放器提前取消请求时仍可能失败。长视频可能需要重新进入若干次才能补全，插件不会在后台持续翻译，也不会实时改写已经载入的字幕。

## 常见问题

**为什么只有英文，没有中文？**  
检查 QX 是否启用了重写和 MitM、BoxJS 中是否已保存有效 Key 与模型、YouTube 是否选中了英文源轨，以及是否有其他插件同时处理字幕。原视频本身没有可用英文字幕时无法凭空生成原字幕。

**为什么有些视频只翻译了前半部分？**  
字幕量较大或模型响应较慢时，插件会优先按预算返回已完成的部分，避免让播放器持续等待。重新打开视频通常能复用此前的翻译进度。如果问题持续，可在 BoxJS 中调整预算档位。

**为什么修改设置后没有马上变化？**  
BoxJS 的修改会在 **下一次字幕网络请求**中生效；已经缓存到 YouTube App 播放器中的字幕可能需要关闭视频再重新进入。

**升级后需要重新填写 Key 吗？**  
如果此前使用的是带 BoxJS 配置的版本，原有 `QXYTB_BETA_` 本机配置键与译文缓存继续兼容，不要清除它们。从旧 `v1.3.0` 升级的用户则需在 BoxJS 里填写 Key：旧本地脚本保存的 `QXYTB_DEEPSEEK_KEY` **不会被自动读取或迁移**。这样可以避免未经确认地复用旧凭据。

**其他 API 服务都能使用吗？**  
需要模型与接口兼容本项目使用的 JSON 翻译协议；服务商的具体模型、计费政策和参数兼容性应以其官方文档为准。

## 隐私与安全

- API Key 由用户填写并保存在本机 Quantumult X/BoxJS 设置中，不应提交到 GitHub、公开日志或分享截图；导出配置与备份时同样需要保护 Key。
- 只有用户选中的翻译接口会收到相应的 Key 与待翻译字幕。第三方中转站的安全与隐私责任需由使用者自行评估。
- 本项目只对识别为 YouTube 原生 iOS App 的字幕请求尝试翻译，浏览器或未知客户端原则上直接放行。
- 请遵守所用服务的使用条款；本项目不承诺所有视频、设备和网络环境都能稳定加载。

欢迎通过 GitHub Issues 提交使用反馈和改进建议。报告问题时请去除 API Key、授权请求头、签名 URL 等敏感信息。

BoxJS 接入参考：[官方安装说明](https://docs.boxjs.app/)、[官方订阅配置文档](https://docs.boxjs.app/dev/configure)、[DualSubs BoxJS 配置示例](https://github.com/DualSubs/BoxJs/blob/main/DualSubs.BoxJs.json)。本项目为非官方第三方工具，与 YouTube、Google、Quantumult X 及各 API 平台无隶属关系。
