# 🎛️ Arena Manager - 智能模型管理助手

> **告别混乱的模型列表！** Arena Manager 是一个为 [Arena](https://arena.ai) 量身定制的高级管理工具，助你轻松筛选、分类和管理上百个 AI 模型。支持 **Text**、**Code**、**Image** 等多种模式的独立管理与排序。

# ✨ 核心特性

- **🚀 多模式归属系统 (v4.4 新增)**：一个模型可以同时属于 Text 和 Code 面板，支持在不同场景下独立管理显隐和排序。
- **🎯 "所见即所得" 精准扫描**：严格基于页面上下文识别模型类型，不再依赖不可靠的名字猜测，杜绝分类错误。
- **🏢 智能厂商识别**：内置规则自动识别 **60+ 家**主流 AI 组织（OpenAI, Google, Anthropic, DeepSeek 等）。
- **📂 智能折叠**：自动收纳非核心组织，保持列表清爽；在模型较少的模式下自动展开。
- **🔄 自定义排序**：支持拖拽调整组织顺序，把你喜欢的厂商排在最前。
- **☁️ 配置本地+云同步**：支持导出/导入 JSON 配置、基于Github Gist的云同步，多设备轻松同步。

## 📸 截图预览

![主界面](https://raw.githubusercontent.com/JimAchievo/Arena-Manager/main/screenshots/edit.png)
![效果](https://raw.githubusercontent.com/JimAchievo/Arena-Manager/main/screenshots/result.png)

## 🎮 支持的 Arena 模式

脚本完美适配 Arena 的所有评测模式：

| 模式 | 图标 | 说明 |
|------|------|------|
| Text | 💬 | 标准文本对话 |
| Search | 🔍 | 联网搜索增强 |
| Image | 🎨 | 图像生成模型 |
| Code | 💻 |代码编程专用 |
| Video | 🎬 | 视频生成模型（预留） |

## 🚀 使用方法

1. 访问 [Arena](https://arena.ai)
2. 点击页面上的模型选择下拉框（让模型列表加载），即可自动扫描
3. 点击右上角 **🎛️** 按钮 或按 **Ctrl+Shift+M**开启管理面板
4。 **单击**模型卡片切换显示/隐藏
5。 **已启动**中调整模型顺序
6. 其余功能欢迎自行探索！

## ⌨️ 快捷键

| 快捷键 | 功能 |
|--------|------|
| `Ctrl+Shift+M` | 打开/关闭管理面板 |
| `Esc` | 关闭当前弹窗 |

## 🏢 支持的组织

<details>
<summary>点击展开完整列表</summary>

### 📝 Text
**主要组织**：Google, Anthropic, xAI, OpenAI, Baidu, Z.ai, Alibaba, Moonshot, DeepSeek, Mistral, MiniMax  
**更多组织**：Meituan, Amazon, Xiaomi, Tencent, Microsoft AI, Prime Intellect, Cohere, Nvidia, Ant Group, StepFun, Meta, Allen AI, Inception AI, IBM, 01 AI, NexusFlow

### 🔍 Search
**全部组织**：Google, OpenAI, xAI, Anthropic, Perplexity, Diffbot

### 🎨 Image
**主要组织**：OpenAI, Google, Tencent, Bytedance, Alibaba, Black Forest Labs, Z.ai  
**更多组织**：Shengshu, Pruna, Microsoft AI, Ideogram, Luma AI, Recraft, Leonardo AI, Reve

### 💻 Code
**主要组织**：Anthropic, OpenAI, Google, xAI, DeepSeek, Z.ai, Moonshot, Alibaba, MiniMax  
**更多组织**：Xiaomi, KwaiKAT, Mistral

### 🎬 Video
*暂无专属组织（预留分类）*

</details>

## Star History

[![Star History Chart](https://api.star-history.com/svg?repos=JimAchievo/LMArena-Manager&type=date&legend=top-left)](https://www.star-history.com/#JimAchievo/LMArena-Manager&type=date&legend=top-left)

## 📝 更新日志

### v4.6.2 (2025-01-29)
- **🔧修复Github Gist 云同步相关bug**：优化逻辑，现在云同步已确认可用
- **补全国际化**

### v4.6.1 (2025-01-29)

#### 🔧 紧急修复
- **适配 Arena 新域名**：LMArena 更名为 Arena，域名从 `lmarena.ai` 迁移至 `arena.ai`
- **修复模式检测失效**：适配新 UI 的按钮激活状态类名变更（`bg-surface-secondary` → `bg-surface-primary`）
- **修复 URL 模式检测**：支持新的查询参数格式（`?chat-modality=image`）
- **修复特性图标检测**：适配新 SVG 内联图标结构，通过 path 特征识别 Vision/RIU/Generation 能力
- **修复语言切换不完整**：扫描按钮在点击后切换语言时文字现在会立即更新

### v4.6.0 (2025-01-28)

#### 🎉 核心亮点
- **🌍 多语言支持**：新增 9 种语言界面（简体中文、English、繁體中文、日本語、한국어、Español、Français、Deutsch、Русский）
- **☁️ GitHub Gist 云同步**：支持通过 GitHub Gist 在多设备间同步配置数据
- **🎯 多选模式**：全新批量操作体验，支持批量显示/隐藏/添加至分组
- **🔧 严重 Bug 修复**：修复模型下拉框排序后无法点击选择的问题

---

#### ✨ 新增功能

1. **多语言国际化 (i18n)**
   - 设置中可切换界面语言，即时生效
   - 支持语言：简体中文、English、繁體中文、日本語、한국어、Español、Français、Deutsch、Русский

2. **GitHub Gist 云同步**
   - 设置中配置 GitHub Token 和 Gist ID
   - 一键上传/下载配置，多设备无缝同步

3. **多选模式**
   - 点击「多选」按钮进入多选模式
   - 支持操作：显示、隐藏、添加至分组、全选/取消、反选、还原
   - 切换上栏标签页时保持多选状态
   - 关闭面板自动还原未保存的更改

4. **搜索增强**
   - 多关键词搜索（空格分隔 = AND 逻辑）
   - 正则表达式搜索（`/pattern/flags` 格式）

5. **视图切换**
   - 三种视图模式：网格 ⊞ / 紧凑 ⊟ / 列表 ☰
   - 紧凑模式隐藏标签，适合快速浏览

6. **自定义分组**
   - 顶栏「📁 分组」管理分组（创建/重命名/删除）
   - 模型可属于多个分组
   - 上栏显示分组标签页，快速筛选

7. **键盘导航**
   - `/` 聚焦搜索框
   - `Enter` 跳转第一个搜索结果
   - `Esc` 关闭当前弹窗

8. **完整设置面板**
   - 语言选择
   - 新模型提示开关
   - GitHub Gist 云同步配置
   - 重置所有数据（危险操作需确认）

---

#### 🔧 重要改进

1. **模型卡片交互优化**
   - 显示状态：蓝色边框 + 正常颜色
   - 隐藏状态：普通边框 + 褪色效果
   - 移除默认勾选框，改用「多选」按钮触发

2. **数据结构简化**
   - 移除 `categories` 和 `categoriesManual` 字段
   - `vision` 字段合并：非 Image 模型为 `true/false`，Image 模型为 `'universal'/'t2i'/'i2i'`
   - 移除时间戳字段，精简存储

3. **编辑模型精简**
   - 移除「Arena 模式」选项（基于页面自动识别，无需手动修改）
   - 移除「类型标签」选项（已删除分类功能）

4. **左侧栏精简**
   - 仅 Image 模式保留「按类型」过滤（综合/仅文生图/仅图生图）
   - 其他模式移除类型过滤
   - 「Vision」更名为「视觉」（随语言变化）

5. **空分组提示优化**
   - 自建分组为空时，仅显示「📭 没有匹配的模型」
   - 不再提示「请打开模型下拉框以触发自动扫描」

---

#### 🐛 问题修复

- **【严重】修复模型无法选择**：使用 CSS `order` 属性替代 DOM 移动，避免破坏框架事件绑定
- **修复语言切换不完整**：扫描按钮在点击后切换语言时文字不更新

---

#### ⚙️ 技术优化

- 新增 `I18N` 国际化系统，支持动态切换
- 重构 `applyFilters()`：使用 `flex` + `order` 实现排序，不移动 DOM 节点
- 新增 `createSettingsModal()`、`createGroupSelectModal()` 等模态框
- 多选模式状态管理：`isMultiSelectMode`、`selectedModels`、`multiSelectBackup`

### v4.5.1 (2026-01-27)

- 添加了“molmo”特征词至“Allen AI”组织
- 紧急修复Side by Side模式下只有一个下拉栏被展示的严重漏洞

### v4.5.0 (2026-01-26)

#### 🎉 核心亮点
- **🏢 组织化管理体系升级**：全面用“组织”替代“公司”，各模式拥有独立的组织排序与显示规则。
- **🖼️ 图像模型智能分类**：Image 模式下自动识别 Vision/RIU 标记，细分为“综合”、“仅文生图”、“仅图生图”三类。
- **🔄 全面支持 Arena 新界面**：完美兼容下拉栏与抽屉式两种布局，修复隐藏失效问题。
- **🧩 排序与自定义功能增强**：新增组织顺序、模型顺序及模型属性的“恢复默认”功能。

---

#### ✨ 新增功能

1. **组织化配置体系**
   - 为 Text、Search、Image、Code、Video 分别定义独立的组织排序与折叠规则。
   - 新增 Pruna、01 AI、NexusFlow 等组织，更新组织名称与图标（如 LongCat → Meituan，Flux → Black Forest Labs）。

2. **图像模型深度分类**
   - Image 模式下，左侧栏新增“按类型”分类，根据 Vision 与 RIU 标记自动分为：
     - 🔄 **综合**：带 Vision 但不带 RIU（图生文理解）
     - ✨ **仅文生图**：无 Vision 且无 RIU
     - 🖼️ **仅图生图**：同时带 Vision 和 RIU（图生图编辑）
   - “已启用”列表内，Image 模型按上述类型分组排序，组内遵循组织顺序。

3. **排序重置功能**
   - 组织排序模式下新增 **“重置”按钮**，一键恢复该模式默认组织顺序。
   - 模型自定义排序模式下新增 **“重置”按钮**，一键清除自定义顺序。
   - 模型编辑窗口新增 **“恢复默认”按钮**，一键重置该模型的组织、模式、标签为自动识别结果。

4. **兼容性强化**
   - 完全支持 Arena 新增的 **抽屉式布局**（纵横比过大时触发），模型隐藏与排序功能在两种布局下均正常生效。
   - 扫描器与过滤器自动识别当前 UI 模式，确保操作一致。

---

#### 🔧 重要改进

1. **组织识别逻辑优化**
   - 将特征词匹配优先级提至图标匹配之前，识别更准确。
   - 新增特征词：`seededit` 归入 Bytedance；`p-image` 归入 Pruna；`yi-` 归入 01 AI；`athene` 归入 NexusFlow。

2. **排序规则统一**
   - “已启用”列表默认严格遵循 **组织顺序**，同组织内按名称排序。
   - Image 模式下，“已启用”列表先按类型分组，组内按组织排序。

3. **UI 与交互优化**
   - 左侧栏分类逻辑细化：Text/Code 显示“按类型”，Image 显示“按类型”（图像分类），其他模式按需显示 Vision 过滤。
   - 模型卡片标签扩展：新增图像类型标签、Vision 标签。
   - 修复界面细节，确保各类标签颜色主题适配深色/浅色模式。

4. **数据架构升级**
   - 存储键升级至 `lmarena_manager_v5`，独立管理各模式的组织顺序。
   - 模型数据新增 `imageType`、`hasVision` 字段，支持图像分类与过滤。

---

#### 🐛 问题修复

- **修复隐藏功能失效**：完全重写扫描器与过滤器，兼容 Arena 新下拉栏架构与抽屉布局。
- **修复组织名称不一致**：统一处理“Z.ai”（原 Zhipu、Zhipu AI）、“Qwen”归入“Alibaba”、“Microsoft”归入“Microsoft AI”等。
- **修复排序漂移**：确保自定义模型排序保存与应用更稳定。
- **修复 Vision 标记识别**：准确读取 SVG 图标类名，过滤更精准。

---

#### ⚙️ 技术优化

- **选择器重构**：`SELECTORS` 区分 `dropdown` 与 `drawer` 模式，提升鲁棒性。
- **模式检测增强**：优先检测新版本 Arena 模式按钮组，后备 URL 分析。
- **代码模块化**：`MODE_ORG_CONFIG` 集中管理各模式的组织配置，便于维护。
- **样式更新**：新增图像类型、Vision 等标签样式，保持 UI 统一。

### v4.4.2 (2026-01-19)

**🎉 重磅更新：多模式归属与精准扫描**

*   **✨ 多模式归属 (Multi-Mode Attribution)**
    *   底层数据结构重构，支持一个模型同时属于多个模式。
    *   例如：`GPT-4o` 既可以在 Chat 面板管理，也可以在 Code 面板独立管理，互不冲突。
*   **🎯 严格上下文扫描**
    *   移除基于名称正则的猜测逻辑，完全基于 DOM 按钮状态判断当前模式。
    *   在 Code 页面扫到的就是 Code 模型，绝无误判。
*   **💄 UI/UX 精修**
    *   **防抖动**：锁定顶栏高度，防止滚动条出现时布局微小跳动。
    *   **对齐修复**：优化下拉框 Emoji 图标对齐，视觉更舒适。
*   **🐛 Bug 修复**
    *   修复了 Code 模式下混合显示 Chat 模型时，自定义排序失效的问题。

### v4.3.0 (2026-01-17)

#### 🌟 新增与优化
*   **智能折叠逻辑优化**
    *   现在“📁 更多公司”折叠夹仅在 `All` 和 `LLM` 模式下启用。
    *   切换到模型较少的 `Search`、`Image`、`Code`、`Video` 模式时，所有公司将自动展开，方便直接查找。
*   **上栏布局重构**
    *   上栏按钮现在支持自动换行，彻底去除了横向滚动条。
    *   优化了按钮尺寸和间距，布局更紧凑、美观。
    *   主面板宽度限制适当增大，适应更多内容显示。
*   **排序功能增强**
    *   **修复了折叠夹内无法排序的问题**：现在支持在“更多公司”文件夹内部拖拽调整公司顺序。

#### 🐛 问题修复
*   **界面修复**：修复了左侧栏“更多公司”行与其他公司行的统计数字无法垂直对齐的视觉瑕疵。
*   **图标修复**：修复了 **MicrosoftAI** (Copilot/Bing) 图标无法正常显示的问题。
*   **代码清理**：优化了部分内部逻辑。

### v4.1.0 (2026-01-10)
*   ✨ 支持5种Arena模式切换。
*   ✨ 智能识别60+公司。
*   ✨ 新增公司拖拽排序与模型手动编辑。
*   🐛 修复Code模式分类逻辑。

### v1.0.0
- 初始版本

## 🙏 致谢

- [Arena](https://arena.ai) - 模型评测平台

**如果这个脚本对你有帮助，请不要吝啬你的好评！⭐⭐⭐⭐⭐**
