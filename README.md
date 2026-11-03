<div align="center">
  <h1>🎬 YouTube Bilingual Subtitles</h1>
  <p><strong>在 YouTube 原生 iOS App 中，直接观看中英双语字幕。</strong></p>
  <p>无需更换播放器、安装浏览器扩展，也不需要搭建独立翻译服务器。<br />
  支持 Quantumult X 与 Shadowrocket，使用自己的 AI 翻译 API。</p>

<p>
  <img src="https://img.shields.io/badge/Platform-iOS%20%2F%20iPadOS-365EAA?style=flat-square" alt="iOS / iPadOS" />
  <img src="https://img.shields.io/badge/Quantumult%20X-Supported-29875B?style=flat-square" alt="Quantumult X" />
  <img src="https://img.shields.io/badge/Shadowrocket-Supported-29875B?style=flat-square" alt="Shadowrocket" />
  <img src="https://img.shields.io/badge/Translation-Bring%20Your%20Own%20API-7256B8?style=flat-square" alt="自备翻译 API" />
</p>

<p>
  <a href="#-快速安装"><strong>快速安装</strong></a> ·
  <a href="#-核心功能">功能介绍</a> ·
  <a href="#-常见问题">常见问题</a> ·
  <a href="https://github.com/qutary/youtube-bilingual-subtitles/issues">问题反馈</a>
</p>

</div>

---

## 📺 字幕效果

<div align="center">
  <p><strong>宇宙远比我们想象的更加广阔。</strong><br />
  <sub>The universe is far larger than we imagine.</sub></p>
  <sub>中英双语显示示意 · 中文在上，英文在下</sub>
</div>

也可以切换为**仅中文字幕**。字幕会尽量沿用 YouTube 原始时间轴；如果某个片段没有及时翻译完成，将保留原始英文，避免整段字幕消失。

## 🚀 快速安装

请选择你正在使用的代理工具。**两种版本只需安装其中一种**：Quantumult X 使用 BoxJS 管理参数；Shadowrocket 在模块内直接编辑参数。

### 方式一：Shadowrocket

**[Shadowrocket 模块订阅地址](https://raw.githubusercontent.com/qutary/youtube-bilingual-subtitles/main/shadowrocket/YouTube.Bilingual.shadowrocket.module)**

```text
https://raw.githubusercontent.com/qutary/youtube-bilingual-subtitles/main/shadowrocket/YouTube.Bilingual.shadowrocket.module
```

1. 打开 **Shadowrocket → 配置 → 模块 → +**，添加上述模块地址并启用。
2. 为当前配置开启 **HTTPS 解密（MitM）**，安装并信任 Shadowrocket CA 证书。
3. 点击模块进入 **编辑参数**。默认使用 DeepSeek，将 `DeepSeekKey` 中的 `PASTE_API_KEY_HERE` 替换成自己的 API Key。
4. 打开 YouTube 官方 App，选择 **English / English (auto-generated)** 字幕轨。

在模块参数中，**「仅显示中文字幕」关闭表示双语、开启表示仅中文**。若需要火山方舟、OpenRouter 或自定义接口，只开启对应的一个平台开关，并填写该平台的 Key 和模型 ID。

[查看 Shadowrocket 详细使用指南](shadowrocket/README.md)

### 方式二：Quantumult X

需要安装 **Quantumult X + BoxJS** 两部分：QX 负责拦截和改写字幕响应，BoxJS 负责配置翻译参数。

**① 添加 QX 字幕重写订阅**

```text
https://raw.githubusercontent.com/qutary/youtube-bilingual-subtitles/main/qx/YouTube.Bilingual.snippet
```

在 Quantumult X **重写 → 引用** 中添加并启用，同时配置字幕域名 MitM，安装并信任 HTTPS 解密证书。

**② 添加 BoxJS 配置订阅**

```text
https://raw.githubusercontent.com/qutary/youtube-bilingual-subtitles/main/qx/youtube-bilingual.boxjs.json
```

安装 [BoxJS](https://docs.boxjs.app/) 后，在其 **订阅** 中添加上述地址并刷新。前往 **应用 → 🎬 常用设置** 选择字幕显示方式与翻译平台，等待时间、长视频和缓存等选项也在此页面。然后打开对应的 **DeepSeek / 火山方舟 / OpenRouter / 自定义 API · 服务配置** 页面填写 API Key 和模型。保存后重新进入视频生效。

**③ 打开 YouTube 字幕**

在 YouTube 官方 App 的 **CC** 菜单里选择 **English / English (auto-generated)**，重新进入视频以触发字幕加载。

> [!IMPORTANT]
> 两个版本都依赖 HTTPS 解密和一个有效的翻译 API Key。请勿同时启用多个 YouTube 字幕改写模块，也不要把 API Key 填入公开仓库、截图或日志。

## ✨ 核心功能

| 能力 | 说明 |
| --- | --- |
| **双语 / 仅译文** | 中文在上、英文在下；也可只显示中文，尽量保留原字幕时间轴。 |
| **上下文翻译** | 对英文自动字幕进行语义分段，减少直接逐行翻译造成的断句问题。 |
| **长视频处理** | 分批并发调用翻译接口，支持长句处理及按响应预算返回已完成的内容。 |
| **字幕缓存** | 已完成的译文可在再次进入视频时复用，未完成片段有机会继续补齐。 |
| **多种 AI 服务** | 支持 DeepSeek、火山方舟、OpenRouter 和自定义 OpenAI 兼容接口。 |
| **原生 App 体验** | 字幕直接交给 YouTube iOS 播放器显示，无需额外悬浮字幕窗口。 |

### 支持的翻译服务

| 服务 | 默认模型 / 配置 |
| --- | --- |
| **DeepSeek** | 默认 `deepseek-flash`，可自行修改 |
| **火山方舟** | 填写可用的模型 ID 或接入点 ID |
| **OpenRouter** | 填写完整模型 ID |
| **自定义 API** | 填写兼容 Chat Completions 的 HTTPS 地址及模型 ID |

使用费用、可选模型与响应速度取决于你所选的服务商。

<details>
<summary><strong>查看进阶参数</strong></summary>

| 参数 | Quantumult X | Shadowrocket |
| --- | --- | --- |
| 设置入口 | BoxJS | 模块「编辑参数」 |
| 并发范围 | 1–256 | 1–64 |
| 响应预算 | 3–30 秒 | 3–30 秒 |
| 默认响应预算 | 6.3 秒 | 6.3 秒 |
| 译文缓存 | QX 独立存储 | Shadowrocket 独立存储 |

提高并发数不一定能提高实际字幕加载速度，反而可能增加请求费用和内存压力。延长字幕响应预算也有可能导致 YouTube 播放器提前结束等待。建议先保留默认值，确认正常后再逐步调整。

</details>

## ❓ 常见问题

<details>
<summary><strong>只看到英文字幕，没有出现中文？</strong></summary>

确认 YouTube 已选择英文原字幕轨、当前配置的 MitM 已启用、翻译模块已启用，以及 API Key / 模型 ID 是否正确。Shadowrocket 的 `PASTE_API_KEY_HERE` 只是占位文本，并不是真实 Key。若仅有部分英文，可能是对应翻译批次尚未完成。

</details>

<details>
<summary><strong>YouTube 提示「加载字幕时出错」？</strong></summary>

可能是上游字幕响应、翻译 API 或字幕改写等待时间引起。可先保留默认 6.3 秒响应预算，退出视频后重新进入。如果仍然失败，请提供经过脱敏的代理日志、脚本诊断记录及复现步骤。

</details>

<details>
<summary><strong>为什么再次进入视频后，中文变多了？</strong></summary>

首次加载可能只完成部分翻译。脚本会缓存已接受的译文，后续请求可以复用缓存并尝试补齐剩余片段；**已在播放器中加载的字幕不会被实时替换**。缓存容量有限，且切换模型或接口可能无法复用原缓存。

</details>

<details>
<summary><strong>会影响 YouTube 网页版，或者自动翻译所有视频吗？</strong></summary>

本项目面向 **YouTube 官方 iOS App** 的英文字幕请求，不保证支持网页端、没有英文字幕轨的视频，或 YouTube 后续新增的所有字幕格式。

</details>

## 🔒 隐私与使用说明

插件在设备上的代理脚本环境中处理字幕；**待翻译的字幕文本会发送至你选择的第三方 AI 服务**，因此请自行了解服务商的数据处理和费用政策。使用 MitM 需要信任并管理自己的 HTTPS 解密证书。

本项目是独立的社区工具，**与 YouTube / Google 无官方关联**。实际字幕加载与翻译覆盖率受网络、模型响应、字幕格式及 YouTube 客户端行为影响，无法保证每次都完整翻译。

## 📚 文档与反馈

- [Shadowrocket 使用指南](shadowrocket/README.md)
- [提交问题或建议](https://github.com/qutary/youtube-bilingual-subtitles/issues)

欢迎提交可复现的问题、改进建议和 Pull Request。提供日志时，请先去除 API Key、Authorization、Cookie 以及 URL 中的签名参数。
