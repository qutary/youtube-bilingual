# YouTube Bilingual Subtitles · 独立测试版

**版本：`v1.1.0-TestBlock.1`。仅供 iPad 实机对照，暂不替代稳定版。**

本分支基于稳定版 `v1.0.3-FullTrack`。正式主分支、正式脚本和正式订阅保持原样。

## 测试内容

1. **同窗字幕块**：在一个底部居中的 SRV3 段落内，按中文、真实换行、英文排列，分别引用 `sz=110/99` 的样式。以整块自然增高取代两种语言独立的固定高度；不根据字符数估算行数，也不动态大幅上移中文。
2. **更自然的字幕表达**：提示 DeepSeek 保留信息与每个 ID 边界，用简洁自然的中文和标点；缺失补翻时跳号 ID 不当作连续对白。是否改善译文需要同文对照，不能保证。
3. **隔离缓存**：复用本机已有 `QXYTB_DEEPSEEK_KEY`，测试译文和目录使用单独的偏好键，不读写或淘汰稳定版缓存。首次测试会重新产生翻译请求和相应 API 费用；切回正式版仍可使用其原缓存。

仍使用 DeepSeek，保留首批 12 条、后续最多 24 条、自适应最多 6～9 路、36 次调用上限与 8000 ms 预算。保留原字幕时间起点、稳定版已有的时间交叠裁切、音效过滤和失败保留原文，不进行跨条目重分句，不使用 YouTube 自动翻译或其他翻译服务。

## 在 Quantumult X 中测试

1. **保留正式订阅，临时关闭它的字幕重写开关。** 不删除、不覆盖正式订阅。
2. 在 **重写 → 引用** 添加并启用此测试订阅：

```text
https://raw.githubusercontent.com/qutary/youtube-bilingual-subtitles/test-block-v1/YouTube.Bilingual.snippet
```

3. 更新测试订阅与脚本缓存，完全退出并重新打开 YouTube。打开带英文字幕的视频，选择 English 或 English (auto-generated)。已有 Key 无需重新设置；不要选择 YouTube 自动翻译。

同一字幕响应一次只启用一份重写。两份同时启用可能冲突。日志应出现 `[QXYTB-TEST] v1.1.0-TestBlock.1`、`layout=block`，成功合成时另有 `SRV3 TEST block`。

## 观察重点

先看短句是否中文在上、英文在下、各行居中、间隔自然；再看英文两三行、中文多行、双方多行时是否底部裁切、叠字或明显遮挡画面。尽量用同一个视频、同一句话和同一播放状态与稳定版比较。

**当前 28 项离线检查通过，但尚无本测试版的 iPad 实机结果。** XML 和脚本检查不能证明原生播放器的真实换行、居中与字号效果。稳定版过去使用 Unicode 分隔符的单段字幕有居中兼容问题，本次改用不同样式的两个 span 与真实 LF；这一差别仍需实机验证。

长视频仍不保证首次全量翻译。拖动进度通常不触发新的 timedtext 请求；需要重新进入视频并发生新字幕请求，才能利用测试缓存补翻。切换版本或模式也需要新请求。

## 随时切回正在使用的版本

关闭本测试订阅，重新启用原正式订阅，完全退出并重开 YouTube。

正式订阅地址始终为：

```text
https://raw.githubusercontent.com/qutary/youtube-bilingual-subtitles/main/YouTube.Bilingual.snippet
```

不用重设 Key，不用删除缓存。测试分支的后续更新不会被正式订阅自动加载。

## 可选：只对照翻译表达

测试版保留旧双窗口渲染器，可由本地偏好 `QXYTB_TEST_LAYOUT` 切换：`block` 为本次默认；`dual` 为旧 `88/95` 布局。切换不必重译已缓存字幕。

如熟悉 QX 本地一次性任务，可临时运行下列代码切为 dual，然后删除临时任务：

```javascript
$prefs.setValueForKey("dual", "QXYTB_TEST_LAYOUT");
$done({});
```

把 `dual` 换成 `block` 后再执行可恢复默认实验布局。此偏好只被测试脚本读取，不影响正式版。需要重新进入视频触发字幕请求；日志显示实际模式。

## 验证记录

离线检查覆盖：JS 语法、SRV3/XML 解析、默认单窗和真实 LF、双窗口与稳定版输出逐字一致、原 pen 继承、部分翻译、XML 转义、缓存隔离与损坏目录保护、缓存补翻和三轨淘汰、8 秒截止、并发与调用上限、无 Key、翻译 401/429、坏 JSON、超时、上游 429 零调用、音效过滤、JSON3/VTT 基线行为。

未执行真实翻译请求，未测真实 API 速度、翻译质量或 iPad 布局。不将离线通过表述为已解决排版问题。

首次设置 Key 的用户可参考[稳定版安装说明](https://github.com/qutary/youtube-bilingual-subtitles#readme)。`set-deepseek-local.js` 仍是无真实密钥的本地模板；不要上传含明文 Key 的副本。
