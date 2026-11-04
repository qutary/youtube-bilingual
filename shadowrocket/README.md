# Shadowrocket 安装与使用

[项目首页](../README.md) · [常见问题](../README.md#常见问题) · [Quantumult X 教程](../qx/README.md)

在 YouTube 官方 iPhone / iPad App 中使用双语字幕，通过模块参数配置，不需要 BoxJS。

## 安装

### 1. 添加模块

复制下面的地址，在 **Shadowrocket → 配置 → 模块 → ＋** 中添加并启用：

```text
https://raw.githubusercontent.com/qutary/youtube-bilingual-subtitles/main/shadowrocket/YouTube.Bilingual.shadowrocket.module
```

添加后，模块列表中应出现 `YouTube Bilingual Subtitles · Shadowrocket`。菜单名称可能随应用版本略有变化。

### 2. 开启 HTTPS 解密（若已完成配置请跳过）

在当前配置中找到 **HTTPS 解密 / MitM**，打开开关，并按应用提示生成、安装 CA 证书。

如果系统提示已下载描述文件，进入系统「设置」完成安装。随后打开：

**设置 → 通用 → 关于本机 → 证书信任设置**

为刚安装的 Shadowrocket 证书开启完全信任。

### 3. 填写 API Key

点击模块，打开 **编辑参数**。默认使用 DeepSeek：

| 参数 | 填写方式 |
| --- | --- |
| 启用翻译 | 开启 |
| DeepSeekKey | 把 `PASTE_API_KEY_HERE` 替换成自己的 Key |
| DeepSeekModel | 默认 `deepseek-flash`，如账号不能调用，换成可用的模型 ID |
| 仅显示中文字幕 | 关闭：双语；开启：仅中文 |
| 使用火山方舟 / 使用OpenRouter / 使用自定义API | 使用 DeepSeek 时全部关闭 |

### 4. 开启连接，选择字幕

1. 返回 Shadowrocket 首页，选择合适节点，打开连接开关，确认 YouTube 可以正常播放。
2. 进入一个带英文字幕的视频，打开 **CC / 字幕** 菜单。
3. 选择 **English** 或 **English (auto-generated)**，等待字幕加载。

**每次使用都需要保持 Shadowrocket 连接开启。** 流量走代理还是直连由当前配置的分流规则决定；本模块不提供节点。

## 更换翻译服务

| 服务 | 开关 | 需要填写 |
| --- | --- | --- |
| DeepSeek | 其他平台开关全部关闭 | `DeepSeekKey`、`DeepSeekModel` |
| 火山方舟 | 仅开启「使用火山方舟」 | `火山Key`、`火山Model` |
| OpenRouter | 仅开启「使用OpenRouter」 | `OpenRouterKey`、`OpenRouterModel` |

只使用一家平台，不要同时开启多个开关。`ENTER_MODEL_ID` 是占位文本，需要换成服务商提供的模型 ID。

**自定义 API 尚未测试，不能确认是否可用。** 模块中保留了 `CustomKey`、`CustomModel`、`CustomEndpoint` 等字段，暂不作为安装教程的一部分。

## 高级设置

正常使用时保留默认值即可。

| 参数 | 默认值 / 范围 | 说明 |
| --- | --- | --- |
| DeepSeek并发 | 默认 20，范围 1–64 | 增大并发可能触发限流，也会增加设备负担 |
| ResponseBudget | 默认 6.3 秒 | 本次字幕请求等待翻译的时间，不要超过 10 秒 |
| BypassCache | 默认关闭 | 排查缓存时临时使用，可能产生重复翻译费用 |

译文缓存在 Shadowrocket 内保存，与 QX 不共用。重新进入视频可以复用已完成的结果，但不保证每次都能翻译完整。

字幕文本会发送到所选 AI 服务。提交反馈前请去除 Key、Authorization、Cookie 和 URL 签名参数。[反馈问题](https://github.com/qutary/youtube-bilingual-subtitles/issues/new)
