# Quantumult X 安装与使用

[项目首页](../README.md) · [常见问题](../README.md#常见问题) · [Shadowrocket 教程](../shadowrocket/README.md)

QX 负责处理 YouTube 字幕请求，BoxJS 用来填写 API Key 和调整设置。两部分都需要安装，观看时不需要一直打开 BoxJS 页面。

## 安装

### 1. 添加字幕重写

在 Quantumult X 的 **重写 → 引用** 中添加下面的地址，并启用订阅和重写功能：

```text
https://raw.githubusercontent.com/qutary/youtube-bilingual-subtitles/main/qx/YouTube.Bilingual.snippet
```

### 2. 配置 MitM 与证书（若已完成配置请跳过）

在 QX 中开启 **MitM**，按应用提示生成、安装 CA 证书。系统如提示已下载描述文件，进入「设置」完成安装，再打开：

**设置 → 通用 → 关于本机 → 证书信任设置**

为刚安装的 QX 证书开启完全信任。

### 3. 安装 BoxJS

如果还没有 BoxJS，先按 [BoxJS 文档](https://docs.boxjs.app/)完成它本身的安装，确认能打开设置页面。

### 4. 添加配置订阅

打开 BoxJS，在 **订阅** 中添加下面的地址并刷新：

```text
https://raw.githubusercontent.com/qutary/youtube-bilingual-subtitles/main/qx/youtube-bilingual.boxjs.json
```

进入 **应用**，找到本项目的设置页：

| 页面 | 用途 |
| --- | --- |
| 🎬 常用设置 | 翻译开关、字幕显示方式、翻译平台、等待时间和缓存选项 |
| 🔷 DeepSeek · 服务配置 | DeepSeek 的 Key、模型和并发 |
| 🌋 火山方舟 · 服务配置 | 火山方舟的 Key、模型 / 接入点和并发 |
| 🌐 OpenRouter · 服务配置 | OpenRouter 的 Key、完整模型 ID 和并发 |
| 🔌 自定义 API · 服务配置 | 预留入口，尚未测试 |

### 5. 填写翻译参数

以 DeepSeek 为例：

1. 在「常用设置」开启字幕翻译，选择双语显示，翻译平台选择 DeepSeek。
2. 进入「DeepSeek · 服务配置」，填写自己的 API Key。
3. 核对模型 ID。当前默认 `deepseek-flash`，如账号不能调用，换成可用模型。
4. 保存设置，其他选项先保持默认。

使用火山方舟或 OpenRouter 时，在「常用设置」选择对应平台，再到相应配置页填写 Key 和模型。只需配置正在使用的一家，其他页面可以留空。

### 6. 开启连接，选择字幕

选择合适节点，开启 QX 连接，确认 YouTube 可以正常播放。在视频的 **CC / 字幕** 菜单中选择 **English** 或 **English (auto-generated)**。

连接开启后，请求走代理还是直连由现有分流规则决定。本项目不提供节点。

## 使用与更新

- 双语 / 仅中文：在 BoxJS「常用设置」修改「字幕显示方式」。
- 修改配置后：保存，退出视频再进入，让 YouTube 重新请求字幕。
- 更新：更新 QX 重写订阅，同时刷新 BoxJS 的配置订阅，检查原有 Key 和模型是否保留。
- 停用：关闭 BoxJS「开启字幕翻译」，或停用本项目重写。
- 移除：删除本项目重写订阅，按需移除 BoxJS 配置订阅。

## 高级设置

| 设置 | 默认值 / 范围 | 说明 |
| --- | --- | --- |
| 并发数 | DeepSeek 默认 20，火山方舟 / OpenRouter 默认 10；范围 1–256 | 上限过高可能触发限流或增加设备负担 |
| 字幕等待时间 | 默认 6.3 秒 | 使用时不要超过 10 秒，等待过长可能无法加载字幕 |
| 绕过译文缓存 | 默认关闭 | 排查缓存时临时使用，可能产生重复翻译费用 |

长视频、JSON 模式和缓存版本等选项位于「常用设置」下方。先确认基础安装能正常工作，再根据具体问题调整。

**自定义 API 尚未测试，不能确认是否可用。** 虽然 BoxJS 保留了 Key、模型与地址字段，本教程暂不提供可用性承诺。

译文缓存在 QX 内保存，与 Shadowrocket 不共用。字幕文本会发送给所选 AI 服务。提交日志前请去除 Key、Authorization、Cookie 和 URL 签名参数。[反馈问题](https://github.com/qutary/youtube-bilingual-subtitles/issues/new)
