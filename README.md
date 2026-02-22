# 🎛️ Arena Manager - 智能模型管理助手

> **告别混乱的模型列表！** Arena Manager 是一个为 [Arena](https://arena.ai) 量身定制的高级管理工具，助你轻松筛选、分类和管理上百个 AI 模型。支持 **Text**、**Code**、**Image** 等多种模式的独立管理与排序。

📖 **[查看完整使用说明书](./MANUAL.md)**

## ✨ 核心特性

- **🚀 多模式归属系统**：一个模型可以同时属于 Text 和 Code 面板，支持在不同场景下独立管理显隐和排序。
- **🎯 "所见即所得" 精准扫描**：严格基于页面上下文识别模型类型，不再依赖不可靠的名字猜测，杜绝分类错误。
- **🏢 智能厂商识别**：内置规则自动识别 **60+ 家**主流 AI 组织（OpenAI, Google, Anthropic, DeepSeek 等），并自动加载官方 Logo。
- **🔍 模型特性检测**：自动识别模型的视觉（Vision）和 PDF 上传能力，支持按特性筛选。
- **📂 智能折叠**：自动收纳非核心组织，保持列表清爽；在模型较少的模式下自动展开。
- **🔄 自定义排序**：支持拖拽调整组织顺序，把你喜欢的厂商排在最前。
- **📋 模型详情**：查看和编辑模型的组织、图标、备注等信息。
- **⭐ 推荐配置**：一键导入作者推荐的模型设置，支持差异对比和选择性合并，不会覆盖你的个人偏好。
- **☁️ 配置本地+云同步**：支持导出/导入 JSON 配置、基于 GitHub Gist 的云同步（含自动同步），多设备轻松同步。
- **🌍 多语言支持**：支持 9 种语言界面（简体中文、English、繁體中文、日本語、한국어、Español、Français、Deutsch、Русский）。

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
| Code | 💻 | 代码编程专用 |
| Video | 🎬 | 视频生成模型（预留） |

## 🚀 使用方法

1. 访问 [Arena](https://arena.ai)
2. 点击页面上的模型选择下拉框（让模型列表加载），即可自动扫描
3. 点击页面右侧 **🎛️** 按钮（可拖动调整位置）或按 **Ctrl+Shift+M** 开启管理面板
4. **单击**模型卡片切换显示/隐藏
5. **双击**模型卡片打开模型详情
6. 在**已启用**中调整模型顺序
7. 其余功能欢迎自行探索！

### ☁️ GitHub Gist 云同步配置指南

#### 步骤 1：创建 GitHub Personal Access Token

1. 登录 [GitHub](https://github.com)
2. 点击右上角头像 → **Settings**
3. 左侧菜单滚动到底部 → **Developer settings**
4. 点击 **Personal access tokens** → **Tokens (classic)**
5. 点击 **Generate new token** → **Generate new token (classic)**
6. 设置：
   - **Note**：`Arena Manager GitHub Gist 云同步`（或任意名称）
   - **Expiration**：建议选择 `No expiration`（永不过期）
   - **Select scopes**：勾选 `gist`（仅需此权限）
7. 点击 **Generate token**
8. ⚠️ **立即复制 Token**（页面刷新后将无法再次查看！）

#### 步骤 2：在脚本中配置

1. 打开 Arena Manager 面板
2. 点击顶栏 **⚙️ 设置**
3. 在 **GitHub Gist 云同步** 区域：
   - **GitHub Token**：粘贴刚才复制的 Token
   - **Gist ID**：首次使用请**留空**（将自动创建）
4. 点击 **上传到云端**

#### 步骤 3：多设备同步

在其他设备上：
1. 安装脚本并打开设置
2. 输入**相同的 Token**
3. 输入**首次同步时生成的 Gist ID**（可在 [gist.github.com](https://gist.github.com) 查看）
4. 点击同步即可拉取配置

#### 自动云同步（可选）

在设置中开启「自动云同步」后，可选择：
- **变更时同步**：每次数据变更后自动上传
- **定时同步**：每隔指定分钟数自动上传（1-60 分钟）

> 💡 **安全提示**：
> 引用 GitHub 文档[《确保 API 凭据安全》](https://docs.github.com/zh/rest/authentication/keeping-your-api-credentials-secure#store-your-authentication-credentials-securely)内容：
>> **不要将未加密的身份验证凭据（如令牌或密钥）推送到任何存储库，即使存储库是专用存储库。**
>
> 亲测，GitHub 扫描到该做法后会撤销该 Token，导致 Token 失效。
>
> 脚本郑重承诺：Personal Access Token 仅在 Tampermonkey GM_setValue 中存储，不会出现在本地导出的和上传至 Gist 的 JSON 中。

## ⌨️ 快捷键

| 快捷键 | 功能 |
|--------|------|
| `Ctrl+Shift+M` | 打开/关闭管理面板 |
| `/` | 聚焦搜索框（面板打开时） |
| `Esc` | 关闭当前弹窗 |

## 🏢 支持的组织

<details>
<summary>点击展开完整列表</summary>

### 📝 Text
**主要组织**：Google, xAI, Anthropic, OpenAI, Baidu, Moonshot, Z.ai, Alibaba, DeepSeek, Mistral, MiniMax, Bytedance
**更多组织**：Meituan, Amazon, Xiaomi, Tencent, Microsoft AI, Prime Intellect, Cohere, Nvidia, Ant Group, StepFun, Meta, Allen AI, Inception AI, IBM, 01 AI, NexusFlow

### 🔍 Search
**全部组织**：Google, OpenAI, xAI, Anthropic, Perplexity, Diffbot

### 🎨 Image
**主要组织**：OpenAI, Google, Black Forest Labs, Tencent, Bytedance, Alibaba, xAI, Z.ai  
**更多组织**：Shengshu, Pruna, Microsoft AI, Ideogram, Luma AI, Recraft, Leonardo AI, Reve

### 💻 Code
**主要组织**：Anthropic, OpenAI, Google, Moonshot, Z.ai, MiniMax, DeepSeek, Bytedance
**更多组织**：Xiaomi, Alibaba, KwaiKAT, xAI, Mistral

### 🎬 Video
*暂无专属组织（预留分类）*

</details>

## Star History

[![Star History Chart](https://api.star-history.com/svg?repos=JimAchievo/Arena-Manager&type=date&legend=top-left)](https://www.star-history.com/#JimAchievo/Arena-Manager&type=date&legend=top-left)

## 📝 更新日志

### v4.7.4 (2026-02-22)

#### 🎉 新增功能
- **🏢 组织官方 Logo**：模型卡片和侧边栏中的 emoji 图标替换为组织官方 Logo（SVG/PNG），首次加载后本地缓存，加载失败自动回退为 emoji
- **📂 跨 Tier 拖拽排序**：排序模式下，组织可以跨越 Tier 1 / Tier 2 分界线自由拖拽，重新分配所属层级

#### 🔧 改进
- 模型详情面板中，内置组织的图标改为只读显示官方 Logo；手动匹配的组织（Other）仍可编辑自定义图标

### v4.7.2 (2026-02-15)

#### 🎉 新增功能
- **⭐ 推荐模型配置**：设置面板新增「推荐模型配置」区域
  - 一键从 GitHub 仓库下载作者推荐的模型设置
  - **差异对比面板**：下载后自动与本地数据比较，分类展示差异
  - **选择性合并**：可见性、排序、收藏、模型信息（备注/图标/组织）、分组五大类别独立勾选
  - 不会覆盖用户个人设置（语言、Token 等）
  - 本地不存在的模型会自动添加，本地多出的模型不会删除
  - 显示本地已导入版本日期和最新可用版本日期（精确到分钟）

#### 🔧 修复
- 修复 GitHub raw 文件 CDN 缓存导致刚上传的配置无法立即读取的问题

### v4.7.1 (2026-02-06)

#### ✨ 新增功能
- **📄 PDF Upload 特性检测**：自动识别支持 PDF 上传的模型（Text/Code/Search 模式），左侧栏特性区域新增筛选项，模型卡片和详情面板中显示 📄 标签

#### 🔧 改进
- **同步间隔验证**：定时同步间隔现在会正确校验 1-60 范围，输入非法值时弹出提示
- **移除"最新添加"排序**：该排序选项从未正常工作，已移除

#### ⚙️ 技术优化
- 内部参数 `imageFlags` 重命名为 `featureFlags`，更准确地反映其跨模式用途

### v4.7.0 (2026-02-04)

#### 🎉 核心亮点
- **🎯 悬浮按钮可拖动**：按钮默认位于页面右侧中央，支持拖动调整位置，位置自动记忆
- **📋 模型详情升级**：原「编辑模型」更名为「模型详情」，展示更丰富的信息
- **📝 模型备注功能**：支持为模型添加备注，在卡片上直接显示
- **📤 分组导出**：支持单独导出某个分组的数据
- **🔄 自动云同步**：支持变更时或定时自动同步到云端

#### ✨ 新增功能

1. **悬浮按钮优化**
   - 默认位置改为页面右侧中央（避免与 Arena 新增的 Archive 按钮冲突）
   - 支持拖动调整位置，位置自动记忆
   - 设置中可锁定按钮位置

2. **模型详情面板**
   - 显示完整信息：可见状态、排序位置、组织、图标、模式、收藏、视觉特性、分组、备注
   - 图标可编辑（输入单个字符/emoji）
   - 组织手动修改后显示「重置」按钮
   - 备注可编辑，会显示在卡片上（非紧凑视图）

3. **分组导出**
   - 分组管理面板中每个分组旁新增 📤 导出按钮
   - 导出的 JSON 仅包含该分组的模型数据

4. **自动云同步**
   - 设置中可开启自动云同步
   - 支持两种模式：变更时同步 / 定时同步（1-60 分钟）
   - 定时输入非法值时会弹出提示

#### 🔧 重要修复

- **修复 Token 丢失问题**：云同步下载后 Token 不再丢失
- **修复 syncError 翻译缺失**：所有语言已补充该翻译
- **修复排序下拉框图标**：每个选项现在使用正确的图标（🏢/⭐/🔤/🕐）
- **修复 MutationObserver 未断开**：优化内存管理
- **删除未使用的筛选器字段**：代码清理

#### ⚙️ 技术优化

- 搜索框添加防抖优化（150ms）
- 视图模式标签添加翻译

---

### v4.6.2 (2026-01-29)
- **🔧修复 GitHub Gist 云同步相关 bug**：优化逻辑，现在云同步已确认可用
- **补全国际化**

### v4.6.1 (2026-01-29)

#### 🔧 紧急修复
- **适配 Arena 新域名**：LMArena 更名为 Arena，域名从 `lmarena.ai` 迁移至 `arena.ai`
- **修复模式检测失效**：适配新 UI 的按钮激活状态类名变更（`bg-surface-secondary` → `bg-surface-primary`）
- **修复 URL 模式检测**：支持新的查询参数格式（`?chat-modality=image`）
- **修复特性图标检测**：适配新 SVG 内联图标结构，通过 path 特征识别 Vision/RIU/Generation 能力
- **修复语言切换不完整**：扫描按钮在点击后切换语言时文字现在会立即更新

### v4.6.0 (2026-01-28)

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

<details>
<summary>查看更早版本</summary>

### v4.5.1 (2026-01-27)

- 添加了"molmo"特征词至"Allen AI"组织
- 紧急修复 Side by Side 模式下只有一个下拉栏被展示的严重漏洞

### v4.5.0 (2026-01-26)

#### 🎉 核心亮点
- **🏢 组织化管理体系升级**：全面用"组织"替代"公司"，各模式拥有独立的组织排序与显示规则。
- **🖼️ 图像模型智能分类**：Image 模式下自动识别 Vision/RIU 标记，细分为"综合"、"仅文生图"、"仅图生图"三类。
- **🔄 全面支持 Arena 新界面**：完美兼容下拉栏与抽屉式两种布局，修复隐藏失效问题。
- **🧩 排序与自定义功能增强**：新增组织顺序、模型顺序及模型属性的"恢复默认"功能。

### v4.4.2 (2026-01-19)

**🎉 重磅更新：多模式归属与精准扫描**

*   **✨ 多模式归属 (Multi-Mode Attribution)**
    *   底层数据结构重构，支持一个模型同时属于多个模式。
*   **🎯 严格上下文扫描**
    *   移除基于名称正则的猜测逻辑，完全基于 DOM 按钮状态判断当前模式。

### v4.3.0 (2026-01-17)

*   **智能折叠逻辑优化**：切换到模型较少的模式时，所有公司将自动展开。
*   **上栏布局重构**：上栏按钮现在支持自动换行。
*   **排序功能增强**：修复了折叠夹内无法排序的问题。

### v4.1.0 (2026-01-10)
*   ✨ 支持5种Arena模式切换。
*   ✨ 智能识别60+公司。
*   ✨ 新增公司拖拽排序与模型手动编辑。

### v1.0.0
- 初始版本

</details>

## 🙏 致谢

- [Arena](https://arena.ai) - 模型评测平台

**如果这个项目对你有帮助，欢迎 ⭐ Star！**
