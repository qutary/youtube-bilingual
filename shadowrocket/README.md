# Shadowrocket 使用指南

通过 Shadowrocket 的模块功能，在 **YouTube 官方 iOS App** 中显示中英双语或仅中文字幕，无需 BoxJS。

[返回项目主页](../README.md) · [反馈问题](https://github.com/qutary/youtube-bilingual-subtitles/issues)

## 安装模块

**模块订阅地址**

```text
https://raw.githubusercontent.com/qutary/youtube-bilingual-subtitles/main/shadowrocket/YouTube.Bilingual.shadowrocket.module
```

1. 打开 **Shadowrocket → 配置 → 模块 → +**，粘贴订阅地址并启用模块。
2. 在当前配置中开启 **HTTPS 解密（MitM）**，安装并信任 Shadowrocket CA 证书。
3. 返回模块列表，打开 **YouTube Bilingual Subtitles · Shadowrocket → 编辑参数**。
4. 将当前翻译平台的 API Key 占位符替换为真实 Key，保存设置。
5. 打开 **YouTube 官方 App**，选择 **English / English (auto-generated)** 原字幕轨。

> [!TIP]
> 已安装旧模块时，先尝试在 Shadowrocket 中更新模块。若参数界面没有更新，可以删除旧模块后重新添加以上正式订阅地址。

## 配置说明

默认使用 **DeepSeek**，不需要开启任何额外平台开关。最常用的参数如下：

| 参数 | 用途 |
| --- | --- |
| **启用翻译** | 关闭后保留原始字幕 |
| **仅显示中文字幕** | 关闭：中英双语；开启：只显示中文 |
| **DeepSeekKey** | 将 `PASTE_API_KEY_HERE` 替换为自己的 DeepSeek API Key |
| **DeepSeekModel** | 默认 `deepseek-flash` |
| **DeepSeek并发** | 默认 20，最大 64 |
| **ResponseBudget** | 等待翻译的预算，默认 6.3 秒，可设 3–30 秒 |

### 更换翻译平台

如需使用其他翻译服务，**只开启以下一个开关**，并填写对应的 Key 和模型 ID：

| 开关 | 需要配置 |
| --- | --- |
| **使用火山方舟** | `火山Key`、`火山Model` |
| **使用OpenRouter** | `OpenRouterKey`、`OpenRouterModel` |
| **使用自定义API** | `CustomKey`、`CustomModel`、`CustomEndpoint` |

不要同时启用多个平台开关。模型 ID 应使用服务商实际提供的名称；`ENTER_MODEL_ID` 是占位符，不是有效模型。自定义接口须使用完整的 HTTPS Chat Completions 地址。

### 高级参数

- **并发**：可设置 1–64；更高并发可能增大网络扩展内存压力和 API 请求费用。
- **ResponseBudget**：3–30 秒；等待过长时 YouTube 可能提前放弃加载。
- **BypassCache**：默认关闭。只有检查缓存或重新翻译时才建议临时开启。
- **缓存**：与 QX 版本分开保存；再次加载视频可复用已完成的字幕片段。

## 常见问题

**没有中文字幕：** 检查模块是否启用、证书是否受信任、MitM 是否生效、英文字幕轨是否已选择，以及 API Key 与模型是否填写正确。

**只有部分中文：** 翻译结果按响应预算返回，尚未完成的片段会保留英文。退出并重新进入视频可能复用缓存、继续补齐。

**提示「加载字幕时出错」：** 先使用默认的 6.3 秒预算，检查网络与翻译服务是否可用，再尝试重新进入视频。若持续失败，请在 [GitHub Issues](https://github.com/qutary/youtube-bilingual-subtitles/issues) 描述设备、系统版本、视频字幕类型和复现步骤。

> [!IMPORTANT]
> 本工具会对字幕相关 HTTPS 请求进行解密与改写。**待翻译的字幕文本会发送到你配置的 AI 服务**。请勿公开 API Key、包含 Key 的模块导出、完整 HAR 或未经脱敏的日志。该模块面向 YouTube iOS 原生 App，不保证在所有视频、字幕格式和客户端版本上正常工作。
