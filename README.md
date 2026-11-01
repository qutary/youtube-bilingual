# YouTube Bilingual Subtitles · 独立测试版

**版本：`v1.1.0-TestBlock.4`。正式主分支和正式订阅没有修改。**

## 本次修正

TestBlock.3 的实机日志确认版本运行正常、442条字幕全部命中缓存，但英文一行和两行时的顶部位置仍不一致。继续设定两个独立窗口的坐标不能保证实际间距。

本次修正单段字幕中的一个具体问题：TestBlock.1把换行放在两个 `<s>` 标签之间；这种独立空白可能被XML读取器归类为Whitespace节点而忽略。本次把换行写入**第一个样式段的文字内部**，用数值实体 `&#10;` 表示。两个语言span仍各自指定字号，并加入公开SRV3实现采用的零宽文字，保护多span的样式引用。

结构为：

```xml
<p t="原起点" d="原时长" wp="同一个窗口" ws="居中样式">
  <s p="中文样式">中文字幕&#10;</s>&#8203;<s p="英文样式">English subtitle</s>
</p>
```

上面的缩进仅用于说明；实际输出没有把必要换行放在标签之间。此方案让播放器按同一个段落计算中英文和软换行的行高，期望整组字幕保持自然行距。英文一行或多行时，整组可以一起适应底部空间，不再由两个独立窗口互相挤压。

## 保留的内容

- 中文在上、英文在下；段落请求居中。中文字号参数110、英文140，沿用TestBlock.2/3；实际视觉90%仍待校准。
- 翻译提示词、DeepSeek请求、8秒预算、自适应并发、36次请求上限、原时轴和已有交叠裁切不变。
- 复用TestBlock.1～3的测试缓存和本机已有Key，无需清缓存、重设Key或重译已完成字幕。正式缓存继续隔离。
- 未译英文保留其原始文字、硬换行与片段时间，只统一样式；纯音效过滤保留。
- 不使用按字符数估算行数的中文上移算法，不增加后台任务或其他翻译服务。

## 更新方式

原测试订阅地址不变：

```text
https://raw.githubusercontent.com/qutary/youtube-bilingual-subtitles/test-block-v1/YouTube.Bilingual.snippet
```

1. 更新这条测试重写订阅，并获取带 `?v=TestBlock.4` 的新脚本。
2. 正式订阅保留、开关关闭；字幕重写一次只启用一份。
3. 完全退出并重开YouTube，重新进入视频并选择英文字幕。需要新的timedtext请求，旧字幕画面不会自动替换。

日志应显示：

```text
v1.1.0-TestBlock.4
layout=text-break
SRV3 TEST text-break: blockBottom=95; zhSz=110, enSz=140
```

如果仍是TestBlock.3，应刷新QX脚本缓存。没有必要清理译文缓存。

## 验证与边界

已通过28组离线检查。新增检查使用.NET XML解析与节点类型处理，复现旧标签间换行消失，并在保留及忽略空白两种模式下验证新换行保留在样式文字中；短句、长句、转义文字共10次段落解析检查通过。其余检查覆盖请求及缓存与TestBlock.3完全一致、旧缓存复用、部分翻译、8秒、并发、调用上限、失败回退、源429、音效过滤及JSON3/VTT基线行为。

公开参考代码中，[ReadSections](https://github.com/arcusmaximus/YTSubConverter/blob/b186a40bc21e58a8c9651cf616cbb5e80425dfc6/YTSubConverter.Shared/Formats/YttDocument.cs#L281-L304)区分文字与元素节点；[格式样例](https://github.com/arcusmaximus/YTSubConverter/blob/b186a40bc21e58a8c9651cf616cbb5e80425dfc6/ytt.ytt#L186-L192)包含样式段内部的换行。这提供格式与解析依据，**不证明iPad内部使用完全相同的读取器**。

TestBlock.4尚无iPad实机结果。原生播放器是否保留此处换行、各行是否分别居中、字号是否合适以及整组长字幕是否遮挡画面，仍需实机观察。它是有针对性的修正，不应宣传为已彻底解决所有视频的排版问题。

## 切回正式版

关闭测试订阅，启用原正式订阅，退出并重开YouTube即可；Key和正式缓存保留。

```text
https://raw.githubusercontent.com/qutary/youtube-bilingual-subtitles/main/YouTube.Bilingual.snippet
```

所有旧测试版保留在Git历史中；本次只更新 `test-block-v1` 分支。
