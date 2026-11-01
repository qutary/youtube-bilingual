# YouTube Bilingual Subtitles

**让 iPad 原生 YouTube，也能用上 DeepSeek 中英双语字幕。**

YouTube Bilingual Subtitles 是一款面向 **Quantumult X** 的轻量级字幕增强脚本。它拦截 YouTube 原生 App 加载的英文字幕，通过 **DeepSeek API** 翻译成简体中文，并按照原有时间轴合成为**中文在上、英文在下**的双语字幕。

不需要更换播放器、安装浏览器扩展或运行后台翻译任务，只需一条远程重写订阅和你自己的 DeepSeek API Key。

> **适用平台：** iPad · YouTube 原生 App · Quantumult X  
> **翻译引擎：** DeepSeek API（自备 Key）  
> **当前版本：** `v1.0.3-FullTrack`（自适应并发 / 8 秒翻译预算）  
> **说明：** 这是非官方第三方项目，与 YouTube、Google、DeepSeek、Quantumult X 官方无隶属关系。

## ✨ 主要功能

- **原生双语字幕**：无需离开 YouTube，中文在上、英文在下，尽量保持字幕居中与原始时间轴。
- **DeepSeek 翻译**：按字幕 ID 处理文本，并参考前后语境，减少自动字幕断句造成的翻译问题。
- **尽可能翻译整条字幕轨道**：不再只处理视频开头的少量字幕；能否一次完成整条轨道取决于响应时间。
- **自适应并发**：根据字幕轨道大小调整 DeepSeek 请求数量，在覆盖率与加载速度之间取得平衡。
- **本地缓存与失败回退**：保存已完成译文；再次请求同一字幕时复用缓存，失败或超时的部分保留英文。
- **字幕清理与排版**：过滤音乐、掌声等非对话标记，采用双窗口呈现，英文使用相对更小的字号参数。

**仅使用 DeepSeek 进行翻译**。没有设置有效 API Key 时，直接保留原有英文字幕，不会自动切换成 YouTube 机器翻译。

## 🚀 快速安装

### 使用条件

需要 iPad、YouTube 原生 App、Quantumult X，以及有效的 [DeepSeek API Key](https://platform.deepseek.com/api_keys)。Quantumult X 需正确配置重写规则、相关 YouTube 字幕域名的 HTTPS 解密（MitM）和已信任的证书。

### ① 添加远程重写

在 **Quantumult X → 重写 → 引用** 中添加：

```text
https://raw.githubusercontent.com/qutary/youtube-bilingual-subtitles/main/YouTube.Bilingual.snippet
```

这是**唯一维护的订阅地址**。如果安装过其他 YouTube 字幕重写，先停用冲突规则，避免同一字幕响应被重复处理。

### ② 保存 DeepSeek API Key

已经在本地设置过 `QXYTB_DEEPSEEK_KEY` 的用户可以跳过本步。

首次使用时，下载 [`set-deepseek-local.js`](./set-deepseek-local.js)，保存到 iPad Quantumult X 本地 Scripts 目录，**只在本机**把 `PASTE_YOUR_KEY_HERE` 替换为自己的 Key。然后在 QX 配置 `[task_local]` 中临时加入：

```ini
0 0 1 1 * set-deepseek-local.js, tag=设置DeepSeek字幕Key, enabled=true
```

添加并保存配置后，按下面的步骤**手动执行一次**：

1. 保持 Quantumult X 的 VPN（Tunnel）已连接，然后回到 QX 首页。
2. 从首页下方工具栏进入 **「HTTP 请求」**；如果没有看到入口，可点右下角**风车 → 设置 → 工具与分析 → HTTP 请求**。
3. 在任务列表中找到 **「设置DeepSeek字幕Key」**，向左滑动该任务，点击**执行（运行）**按钮。不同版本的按钮图标可能略有区别。
4. 打开 Quantumult X 的**「日志」**，确认出现 `[QXYTB] DeepSeek API key stored in Quantumult X local prefs.`，代表 Key 已写入本地偏好设置。
5. **立即删除**刚才在 `[task_local]` 中添加的临时任务，以及包含明文 Key 的本地脚本副本；已保存的 Key 不会因此消失，日常观看也**不需要定时任务**。

如果任务列表没有出现该条目，先检查配置文件是否已保存、`set-deepseek-local.js` 是否放在 QX 的 `Scripts` 目录，以及任务是否已启用。

### ③ 开始播放

更新重写订阅，完全退出并重新打开 YouTube App。播放带英文字幕的视频，在 CC 菜单选择 **English** 或 **English (auto-generated)**，不要选择 YouTube 的「自动翻译 → 中文」。

## ⚙️ 工作原理

```text
YouTube 请求英文字幕
         ↓
Quantumult X 拦截响应
         ↓
DeepSeek 分批并发翻译
         ↓
校验字幕 ID / 缓存成功译文
         ↓
按照原时间轴合成中英字幕
         ↓
交还 YouTube 原生播放器
```

当前版本采用 **8 秒翻译预算**：首批优先翻译 12 条，后续每批最多 24 条，按轨道规模自适应使用最多 6～9 路并发，单次响应最多发起 36 次 DeepSeek 请求。达到截止时间后，直接返回已完成的译文，其余对白继续显示英文。

**需要了解的限制：** YouTube 原生 App 可能一次下载整条字幕轨道，拖动进度条时不会重新请求字幕。因此，本脚本不属于播放位置驱动的实时字幕翻译器，也**不保证任何长视频首次打开就达到 100% 中文覆盖**。如果之后重新请求相同字幕，缓存机制可以继续补翻。

## 📊 iPad 实机测试

以下数据来自 Quantumult X 日志，不是模拟结果：

| 测试字幕轨道 | 已翻译条数 | DeepSeek 请求 | 备注 |
|---|---:|---:|---|
| A | 252 / 252 | 13 次 | 全部翻译 |
| B | 325 / 326 | 15 次 | 其余 1 条为纯音效字幕 |
| 缓存补翻 | 164 / 188 → 188 / 188 | 两次加载 | 证明缓存补翻有效 |

这些是特定视频和网络条件下的测试，**不构成速度、费用或翻译完整率保证**。

## ❓ 常见问题

**为什么后半段仍是英文？**  
通常是第一次获取字幕时部分 DeepSeek 请求尚未在 8 秒内完成。只有播放器再次请求相同字幕时，脚本才能复用缓存补翻；单纯拖动进度条一般不能触发新请求。

**为什么出现“加载字幕时出错”？**  
先临时关闭重写，确认原生英文字幕是否正常。若日志显示 `origin status=429`，意味着上游 YouTube 字幕接口返回了限制响应，而不是 DeepSeek 已翻译失败。若字幕源返回 HTTP 200，再检查冲突规则、脚本版本及截止日志。

**怎样确认它已经运行？**  
打开 Quantumult X「日志」，搜索 `[QXYTB]`、`v1.0.3-FullTrack` 以及 `FullTrack finished: translated=.../...`。

**使用需要付费吗？**  
需要自行承担 DeepSeek API 的 token 费用。字幕越长、重试越多，请求与费用通常越高；以 DeepSeek 官方定价与账户余额为准。

## 🔐 隐私与安全

本项目**不内置或公开任何用户 API Key**。密钥保存在 Quantumult X 本机 `$prefs`，仅向 DeepSeek 发起认证请求时读取；需要翻译的英文字幕会发送到 DeepSeek API 处理。

## 📁 项目文件

```text
qx-youtube-bilingual/
├── YouTube.Bilingual.snippet    # Quantumult X 远程重写订阅
├── youtube-bilingual.js         # 核心字幕翻译脚本
├── set-deepseek-local.js        # 本地 API Key 设置模板（可选）
└── README.md                    # 使用文档
```

项目仅维护一套配置，不需要额外的 Beta 脚本、预翻译 Worker 或后台任务。

---

欢迎分享给同样希望在 **iPad 原生 YouTube** 中观看中英双语字幕的用户。代码公开可查看和学习，但实际体验仍取决于 YouTube 字幕接口、Quantumult X 的网络环境以及 DeepSeek API 的性能与额度。

[项目主页](https://github.com/qutary/youtube-bilingual-subtitles) · [DeepSeek API](https://platform.deepseek.com/)
