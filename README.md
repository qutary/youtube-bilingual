<div align="center">

# YouTube Bilingual

适用于 iPhone / iPad 上的 YouTube 官方 App · Quantumult X / Shadowrocket · 自备 AI API

[English](README.en.md) · [开始安装](#install) · [翻译设置](#settings) · [常见问题](#faq)

</div>

> 当前正式版：**v2.1.0**（2026-11-10）。[更新说明](releases/v2.1.0.md) · [历史版本](https://github.com/qutary/youtube-bilingual/releases)。

## 功能

- **双语字幕**：译文在上、原文在上、仅译文，三种方式按需切换。
- **界面翻译**：翻译已适配的标题、简介、推荐、评论与回复、频道、帖子、播放列表、历史记录及部分 Shorts 文字。
- **支持语言**：中文、英语、日语、韩语、法语、俄语、德语、葡萄牙语、西班牙语、意大利语、印地语、泰语、阿拉伯语。
- **四类翻译接口**：DeepSeek、火山方舟、OpenRouter、自定义 OpenAI 兼容 API，均接入字幕与界面翻译。
- **缓存与去广告**：复用已完成的译文，并集成 YouTube 广告处理。

字幕需要视频本身提供字幕轨；本项目不从音频生成字幕。界面翻译针对支持的文字内容，不识别图片或视频画面中的文字。

## 翻译示例

### 字幕显示

<p align="center">
  <a href="docs/images/youtube-subtitle-comparison.png"><img src="docs/images/youtube-subtitle-comparison.png" alt="字幕显示示例：上方为中英双语，下方为仅中文" width="760"></a>
</p>

上：中英双语；下：仅中文。

### 界面翻译

<p align="center">
  <a href="docs/images/youtube-ui-translation-example.jpg"><img src="docs/images/youtube-ui-translation-example.jpg" alt="YouTube 首页视频标题翻译为中文的示例" width="760"></a>
</p>

示例：首页视频标题译为中文，缩略图内的文字保持原样。

<a id="install"></a>

## 开始安装

你需要：YouTube 官方 App、**QX 或 Shadowrocket 中的一款**、可用的翻译 API Key，以及能正常播放 YouTube 并访问翻译接口的网络。API 费用由所选服务商收取。

安装分为三步：**添加模块／重写 → 添加 BoxJS 设置 → 填写 Key 并选择字幕**。

### 1. 添加模块或重写

只安装你正在使用的代理工具对应的版本。停用旧版或其他重复的 YouTube 字幕、界面翻译和去广告规则，保留 BoxJS 基础规则。

**Quantumult X**：将下面地址添加为「重写 → 引用」，并启用。

```text
https://raw.githubusercontent.com/qutary/youtube-bilingual/main/qx/YouTube.Bilingual.snippet
```

**Shadowrocket**：将下面地址添加为模块，并启用。翻译参数统一在 BoxJS 设置。

```text
https://raw.githubusercontent.com/qutary/youtube-bilingual/main/shadowrocket/YouTube.Bilingual.shadowrocket.module
```

**保持代理连接、模块／重写和 HTTPS 解密（MitM）开启，并确认对应证书已安装、已信任。** 仅导入链接不会自动完成这些设置。

### 2. 添加 BoxJS 设置

两款代理工具都通过 BoxJS 配置本项目。已有能正常打开的 BoxJS，可直接添加下方的项目订阅；尚未安装的，先展开安装说明。

<details>
<summary>首次安装 BoxJS</summary>

在当前代理工具中添加对应的 BoxJS 基础规则，并按 [BoxJS 官方文档](https://docs.boxjs.app/)完成设置。

QX 基础重写：

```text
https://raw.githubusercontent.com/chavyleung/scripts/master/box/rewrite/boxjs.rewrite.quanx.conf
```

Shadowrocket 基础模块：

```text
https://raw.githubusercontent.com/chavyleung/scripts/master/box/rewrite/boxjs.rewrite.surge.sgmodule
```

保持代理工具运行，在浏览器打开：

```text
http://boxjs.com
```

</details>

在 BoxJS「订阅」中添加以下地址，**中文、英文任选一份**；同一份订阅可用于 QX 或 Shadowrocket。

**中文设置**

```text
https://raw.githubusercontent.com/qutary/youtube-bilingual/main/qx/youtube-bilingual.boxjs.json
```

**English settings**

```text
https://raw.githubusercontent.com/qutary/youtube-bilingual/main/qx/youtube-bilingual.en.boxjs.json
```

中英文只改变设置页文字，不改变翻译目标语言。**QX 与 Shadowrocket 分别保存数据，Key 和其他设置不会跨应用自动同步。**

### 3. 填写 Key，开始使用

1. 在 BoxJS 的「字幕设置」中选择翻译平台，再进入对应的服务配置，填写 **API Key 和模型 ID**。自定义接口还需填写完整接口地址。
2. 选择目标语言和显示方式。「字幕源语言」建议先保持「自动识别」，保存设置。
3. 打开 YouTube 视频，在 **CC／字幕**中选择视频已有的原字幕轨，例如 English 或 English (auto-generated)。手动指定源语言时，应与所选字幕轨一致。

界面翻译默认开启。你可以在 BoxJS「界面翻译」中关闭不需要的类别；保存后重新进入相关页面，让新的请求使用新设置。

<a id="settings"></a>

## 翻译设置

### 选择翻译服务

推荐使用 **DeepSeek**。也可以按已有账号选择火山方舟、OpenRouter 或自定义 API。

| 服务 | 需要填写 | 支持内容 |
| --- | --- | --- |
| [DeepSeek](https://platform.deepseek.com/) | API Key、模型 ID | 字幕与界面 |
| [火山方舟](https://console.volcengine.com/ark) | API Key、模型 ID 或接入点 ID | 字幕与界面 |
| [OpenRouter](https://openrouter.ai/) | API Key、含提供商前缀的完整模型 ID | 字幕与界面 |
| 自定义 API | Key、模型 ID、完整 HTTPS Chat Completions 地址 | 字幕与界面；需接口兼容 |

字幕和界面使用当前所选平台的配置，不会在失败后自动改用另一个平台。自定义地址应填写完整请求路径，例如 `https://你的域名/v1/chat/completions`，不能只填域名。

### 常用操作

| 想要的效果 | 在 BoxJS 中调整 |
| --- | --- |
| 译文在上，原文在下 | 字幕显示方式 → 双语：目标译文在上、源字幕在下 |
| 原文在上，译文在下 | 字幕显示方式 → 双语：原文在上、目标译文在下 |
| 只看译文 | 字幕显示方式 → 仅译文 |
| 更换翻译语言 | 字幕目标语言；字幕与界面共用 |
| 只翻译视频字幕 | 关闭「启用界面翻译」 |
| 只翻译界面内容 | 关闭「开启字幕翻译」 |
| 少翻译某类内容 | 在「界面翻译」关闭对应类别 |

字幕与界面共用显示方式；关闭任一翻译开关，不影响另一项或集成去广告。频道名、播放量和发布时间默认保持原样，不送入翻译，也不新增开关；频道简介仍可翻译。

<details>
<summary>进阶设置：并发、等待时间与缓存</summary>

- **并发数**：每个平台默认 20，范围 1–256。字幕和界面分别按当前平台的设置执行；遇到限流可调低，并非越大越快。
- **字幕等待时间**：默认 6.3 秒，可设为 3–10 秒。这是脚本处理预算，不包含上游 YouTube 网络耗时，也不控制界面翻译的等待时间。
- **推理策略**：四类接口统一自动处理，不提供开关。能关闭时优先关闭；模型强制要求时使用最低可识别档位。接口未提供足够能力信息时保留原文，避免擅自启用高档推理。旧的推理强度设置不再生效。
- **JSON 输出模式**：通常保持自动。只有在模型不兼容或有明确需要时修改；接口拒绝该参数时可关闭。
- **译文缓存**：已完成的译文可供后续请求复用；界面缓存区分目标语言、平台、接口地址和模型。更换服务或目标后，无须先清空全部缓存。
- **清空缓存**：开启「清空全部翻译缓存（一次）」并保存，下次 YouTube 请求执行，成功后自动复位，Key 和其他设置保留。两个「当前语言」清理选项则需手动改回「开启」。

清缓存不会刷新 YouTube 已加载的页面或字幕。修改设置后，保存并重新进入视频或相关页面。

</details>

## 更新与回退

**更新时同时更新本项目的模块／重写与 BoxJS 订阅，并保留已保存的数据。** 本页提供正式订阅地址，后续更新可刷新订阅；使用旧测试链接的用户需先替换成本页地址。

旧版 Shadowrocket 的模块参数不会自动迁入 BoxJS，首次切换需在 Shadowrocket 的 BoxJS 保存原 Key、模型等设置；已保存在本应用 BoxJS 中的值可继续使用。更换中英文设置订阅也不需要重填 Key。

正式版和历史回退入口以 [Releases](https://github.com/qutary/youtube-bilingual/releases)为准；回退时先停用当前规则。

<a id="faq"></a>

## 常见问题

**没有译文，先检查什么？** 依次确认 YouTube 本身能播放、代理连接和模块／重写已开启、MitM 证书已信任，再检查当前平台的 Key、模型与额度。字幕还需选择可用的原字幕轨；界面翻译需开启对应类别。

**为什么只翻译了一部分？** 接口超时、限流、模型输出或页面适配都可能导致部分原文保留。已完成的译文会缓存，后续请求可以补齐缺失内容；播放器已加载的字幕不会实时更新。简介可先显示已完成片段，其他较长内容也可能需要后续请求。

**提示「加载字幕时出错」怎么办？** 若刚进入视频就立即报错，先尝试更换节点；长视频加载时可先等待约 5–6 秒，再退出视频重新进入。仍有问题时，确认没有重复字幕规则，并用较短视频排查。

**接口返回 401／403／429？** 401／403 检查 Key、模型权限及服务商返回的信息；429 检查余额、额度与限流要求，必要时降低并发。不要反复更换无关设置。

**BoxJS 打不开或订阅显示「格式错误」？** 先确认 BoxJS 基础规则和代理连接正常，再刷新订阅、检查地址能否下载完整内容。若仍失败，请提供脱敏的 BoxJS 报错，不要清空全部应用数据。

**导入英文订阅后仍显示中文？** 从 BoxJS 应用列表进入新的 **Caption settings** 页面，不要停留在旧中文页面。项目设置语言、BoxJS 自身导航语言和字幕目标语言是三项独立设置。

## 使用范围与隐私

界面翻译依赖 YouTube 请求中的文字字段，不同客户端布局、部分 Shorts 或新页面仍可能漏译；长视频、网络和模型速度也会影响完成程度。十三语言和四类接口已接入，具体模型、语言方向与页面效果仍以实际使用为准。

需要翻译的字幕与已开启类别的界面文字会发送给你选择的 API 服务商；评论、帖子和历史标题也可能包含个人信息，请按需启用。本地会保存译文缓存，可在 BoxJS 清理。

遇到问题可[提交反馈](https://github.com/qutary/youtube-bilingual/issues/new)。请附设备与系统、YouTube／代理工具版本、服务商和模型、视频或页面链接、复现步骤；分享前去除 **API Key、Cookie、Authorization、签名参数和个人标识**。

## 致谢

[Maasea / sgmodule](https://github.com/Maasea/sgmodule) 提供 YouTube 广告处理，相关代码保留 Apache-2.0 许可声明。

本项目与 YouTube / Google 无官方关联。
