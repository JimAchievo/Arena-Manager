# 🎛️ LMArena Manager

> 智能管理 LMArena 模型显示的油猴脚本

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Tampermonkey](https://img.shields.io/badge/Tampermonkey-Ready-brightgreen.svg)](https://www.tampermonkey.net/)
[![GreasyFork](https://img.shields.io/badge/Install-Greasy%20Fork-red)](https://greasyfork.org/zh-CN/scripts/563029-lmarena-manager)

> **告别混乱的模型列表！** LMArena Manager 是一个为 [LMArena](https://lmarena.ai) 量身定制的高级管理工具，助你轻松筛选、分类和管理上百个 AI 模型。支持 **Text**、**Code**、**Image** 等多种模式的独立管理与排序。

# ✨ 核心特性

- **🚀 多模式归属系统 (v4.4 新增)**：一个模型（如 GPT-4o）可以同时属于 Text 和 Code 面板，支持在不同场景下独立管理显隐和排序。
- **🎯 "所见即所得" 精准扫描**：严格基于页面上下文识别模型类型，不再依赖不可靠的名字猜测，杜绝分类错误。
- **🏢 智能厂商识别**：内置规则自动识别 **60+ 家**主流 AI 公司（OpenAI, Google, Anthropic, DeepSeek 等）。
- **📂 智能折叠**：自动收纳非核心公司，保持列表清爽；在模型较少的模式下自动展开。
- **🔄 自定义排序**：支持拖拽调整公司顺序，把你喜欢的厂商排在最前。
- **🏷️ 智能标签**：自动打标 **⚡快速**、**🧠思考**、**👑旗舰**、**📱轻量**、**🔓开源** 等特性。
- **☁️ 配置同步**：支持导出/导入 JSON 配置，多设备轻松同步。

## 📸 截图预览

![主界面](./screenshots/edit.png)
![效果](./screenshots/result.png)

## 🎮 支持的 Arena 模式

脚本完美适配 LMArena 的所有评测模式：

| 模式 | 图标 | 说明 |
|------|------|------|
| Text | 💬 | 标准文本对话 |
| Search | 🔍 | 联网搜索增强 |
| Image | 🎨 | 图像生成模型 |
| Code | 💻 |代码编程专用 |
| Video | 🎬 | 视频生成模型（预留） |

## 📦 安装

### 前置要求
- 浏览器安装 [Tampermonkey](https://www.tampermonkey.net/) 或 [Violentmonkey](https://violentmonkey.github.io/)

### 安装方式

**方式一：从 Greasy Fork 安装（推荐）**

[![Install from Greasy Fork](https://img.shields.io/badge/Install-Greasy%20Fork-red)](https://greasyfork.org/zh-CN/scripts/563029-lmarena-manager)

**方式二：手动安装**

1. 点击浏览器扩展图标 → 添加新脚本
2. 复制 [`lmarena-manager.user.js`](./lmarena-manager.user.js) 内容
3. 保存并启用

## 🚀 使用方法

1. 访问 [LMArena](https://lmarena.ai)
2. 点击页面上的模型选择下拉框（让模型列表加载）
3. 点击右上角 **🎛️** 按钮 或按 **Ctrl+Shift+M**
4. 点击 **🔄 扫描** 获取模型列表
5. **单击**模型卡片切换显示/隐藏
6. **双击**模型卡片编辑详细信息
7. 点击 **✓ 应用** 使更改生效
8. 其余功能欢迎自行探索！

## ⌨️ 快捷键

| 快捷键 | 功能 |
|--------|------|
| `Ctrl+Shift+M` | 打开/关闭管理面板 |
| `Esc` | 关闭当前弹窗 |

## 🏢 支持的组织

<details>
<summary>点击展开完整列表</summary>

### 📝 Text（原Chat）
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

## 🏷️ 类型标签

| 标签 | 含义 | 匹配规则 |
|------|------|----------|
| ⚡ 快速 | 低延迟模型 | flash, fast, turbo, haiku |
| 🧠 思考 | 深度推理模型 | thinking, reasoner, o3, o4 |
| 👑 旗舰 | 顶级性能 | pro, max, ultra, high |
| 📱 轻量 | 轻量高效 | mini, nano, small |
| 🔓 开源 | 开源模型 | llama, qwen, glm, deepseek... |

## 📝 更新日志

### v4.5.0 (2026-01-26)

#### 🎉 核心亮点
- **🏢 组织化管理体系升级**：全面用“组织”替代“公司”，各模式拥有独立的组织排序与显示规则。
- **🖼️ 图像模型智能分类**：Image 模式下自动识别 Vision/RIU 标记，细分为“综合”、“仅文生图”、“仅图生图”三类。
- **🔄 全面支持 LMArena 新界面**：完美兼容下拉栏与抽屉式两种布局，修复隐藏失效问题。
- **🧩 排序与自定义功能增强**：新增组织顺序、模型顺序及模型属性的“恢复默认”功能。

---

#### ✨ 新增功能

1. **组织化配置体系**
   - 为 Text、Search、Image、Code、Video 分别定义独立的组织排序与折叠规则。
   - 新增（预留）Pruna、01 AI、NexusFlow 等组织，更新组织名称与图标（如 LongCat → Meituan，Flux → Black Forest Labs）。

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
   - 完全支持 LMArena 新增的 **抽屉式布局**（纵横比过大时触发），模型隐藏与排序功能在两种布局下均正常生效。
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

- **修复隐藏功能失效**：完全重写扫描器与过滤器，兼容 LMArena 新下拉栏架构与抽屉布局。
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

---

### v4.1.0 (2026-01-10)

*   ✨ **核心功能**：支持 5 种 Arena 模式切换 (LLM / Search / Image / Code / Video)。
*   ✨ **智能识别**：内置 60+ 家主流 AI 公司的识别规则。
*   ✨ **交互升级**：支持公司列表拖拽排序。
*   ✨ **自定义**：支持模型信息手动编辑。
*   ✨ **工具**：新增清空列表/重置功能。
*   🐛 **修复**：修正 Code 模式下的分类逻辑问题。


### v1.0.0
- 初始版本

## Star History

[![Star History Chart](https://api.star-history.com/svg?repos=JimAchievo/LMArena-Manager&type=date&legend=top-left)](https://www.star-history.com/#JimAchievo/LMArena-Manager&type=date&legend=top-left)

## 🤝 贡献

欢迎提交 Issue 和 Pull Request！

- 🐛 Bug 反馈请附带浏览器版本和控制台错误信息
- ✨ 新功能建议请描述使用场景

## 📄 许可证

[MIT License](./LICENSE)

## 🙏 致谢

- [LMArena](https://lmarena.ai) - 模型评测平台
- [Tampermonkey](https://www.tampermonkey.net/) - 用户脚本管理器


**如果这个项目对你有帮助，欢迎 ⭐ Star！**
