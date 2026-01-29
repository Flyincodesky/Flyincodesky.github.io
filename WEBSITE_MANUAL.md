# 网站使用、维护说明文档

## 1. 网站基本操作

### Windows 本地Docker环境配置步骤

#### 第一步：安装 Docker Desktop
1.  下载 Docker Desktop for Windows
  - 访问 Docker 官网下载页
  - 或直接下载：https://desktop.docker.com/win/main/amd64/Docker%20Desktop%20Installer.exe
2.  系统要求
  - Windows 10 64位：专业版、企业版或教育版（Build 19041或更高版本）
  - Windows 11 64位
  - 必须启用 WSL 2 功能
3.  安装步骤
  - 双击运行 Docker Desktop Installer.exe
  - 确保勾选 "Use WSL 2 instead of Hyper-V"（推荐）
  - 按照安装向导完成安装
  - 安装完成后重启电脑
4.  首次启动配置
  - 启动 Docker Desktop
  - 接受服务条款
  - 可以跳过登录（或者注册 Docker Hub 账号）
  - 等待 Docker 引擎启动（系统托盘图标变为绿色）

#### 第二步：启用 WSL 2（如果尚未启用，记得先下载 WSL）
以管理员身份打开 PowerShell，运行以下命令：
```powershell
# 启用 WSL
dism.exe /online /enable-feature /featurename:Microsoft-Windows-Subsystem-Linux /all /norestart

# 启用虚拟机平台
dism.exe /online /enable-feature /featurename:VirtualMachinePlatform /all /norestart

# 重启电脑后，设置 WSL 2 为默认版本
wsl --set-default-version 2
```

#### 第三步：验证 Docker 安装并启动 Docker
```bash
docker --version
docker compose version

# 拉取预构建的 Docker 镜像
docker compose pull

# 启动容器（首次启动会下载约 400MB 镜像）
docker compose up

# 后台运行（不占用终端）
docker compose up -d

# 查看运行日志
docker compose logs -f

# 停止容器
docker compose down

# 重新构建并启动（当 Gemfile 或配置文件改变时）
docker compose up --build

# 进入容器内部调试
docker compose exec jekyll /bin/bash

# 清理并重新开始
docker compose down --volumes
docker compose up --build --force-recreate
```

### 启动与预览
在对网站进行修改后，建议在本地预览确认无误后再发布。

*   **启动网站**：
    双击项目根目录下的 `启动网站.bat` 脚本（或在终端运行 `docker compose up`）。
    启动成功后，在浏览器访问 `http://localhost:4000` 或 `http://127.0.0.1:4000`。
*   **停止网站**：
    双击 `停止网站.bat`，或在终端按 `Ctrl+C` 并在提示时输入 `docker compose down`。

### 发布更新（同步到云端）
当您确认本地修改无误后，需要将改动推送到 GitHub 以更新线上网站。请参考根目录下的 `oftenuse.txt` 或执行以下命令：

建议使用 Git 进行网站源代码管理，并为管理人员分配 Git 仓库权限。日常更新维护只需修改仓库代码并提交即可完成版本管理。

1.  **查看状态**（可选）：
    ```bash
    git status
    ```
2.  **添加更改**：
    ```bash
    git add .
    ```
3.  **提交更改**：
    ```bash
    git commit -m "更新说明：这里填写具体的修改内容（如：新增2025年论文）"
    ```
4.  **推送至 GitHub**：
    ```bash
    git push origin main
    ```
    *推送成功后，GitHub Actions 会自动构建并部署，线上网站通常会在 2-5 分钟内生效。*

---

## 2. 首页样式详细修改指南

本节说明如何修改首页各部分的**文字内容**、**字体样式**、**颜色**、**背景**等。

### 2.1 实验室简介部分

**位置：** 首页顶部，"实验室简介"标题下的段落文字。

#### 修改文字内容
1. 打开文件：`_pages/about.md`
2. 找到 `## 实验室简介` 这一行
3. 下方的段落就是显示的文字内容，直接修改即可
   ```markdown
   ## 实验室简介

   欢迎来到可信智能医疗实验室...（直接修改这里的文字）
   ```

#### 修改字体大小和样式
实验室简介使用的是**全局字体设置**（Times New Roman + 宋体）。如果要单独修改这部分的样式：

1. 打开文件：`_pages/about.md`
2. 在 `## 实验室简介` 上方添加 HTML 样式标签：
   ```markdown
   <div style="font-size: 18px; line-height: 1.8;">

   ## 实验室简介

   欢迎来到可信智能医疗实验室...

   </div>
   ```
   - `font-size: 18px` - 控制字体大小（默认16px）
   - `line-height: 1.8` - 控制行间距

#### 修改背景颜色
如果要给实验室简介添加独立的背景框：
```markdown
<div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px;">

## 实验室简介

欢迎来到可信智能医疗实验室...

</div>
```

---

### 2.2 导师简介部分

**位置：** 首页"导师简介"标题下的卡片，包含照片和文字。

#### 修改导师照片
1. 将新照片放入 `assets/img/` 文件夹（如 `shixiaoshuang_new.jpg`）
2. 打开 `_pages/about.md`
3. 找到这一行：
   ```liquid
   {% include figure.liquid path="assets/img/shixiaoshuang.jpg" ... %}
   ```
4. 修改 `path="assets/img/shixiaoshuang_new.jpg"`

#### 修改导师姓名和职位
在 `_pages/about.md` 中找到：
```html
<h4>石小爽 教授 (Xiaoshuang Shi)</h4>
<p><strong>教授、博士生导师、国家青年特聘专家</strong></p>
```
直接修改标签内的文字。

#### 修改导师简介文字
找到 `<p>` 标签中的段落，直接修改内容：
```html
<p>
    石小爽是电子科技大学教授...（修改这里）
</p>
```

#### 修改联系方式链接
找到底部的链接部分：
```html
<p>
    <a href="/cv/">查看完整简历</a> | 
    <a href="mailto:xsshi2021@uestc.edu.cn">xsshi2021@uestc.edu.cn</a> |
    <a href="https://scholar.google.com/..." target="_blank">Google Scholar</a>
</p>
```
- 修改 `href="/cv/"` 可以改变简历页面链接
- 修改 `mailto:` 后面的邮箱地址
- 修改 Google Scholar 链接的 URL

#### 修改导师卡片的样式
如果要修改导师简介卡片的背景色、边框等，需要在 `_pages/about.md` 中添加样式：

```html
<div id="shixiaoshuang" class="row mt-3" style="background-color: #ffffff; padding: 30px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
    <div class="col-sm-3 mt-3 mt-md-0 text-center">
        {% include figure.liquid path="assets/img/shixiaoshuang.jpg" ... %}
    </div>
    ...
</div>
```
- `background-color: #ffffff` - 背景色（白色）
- `padding: 30px` - 内边距
- `border-radius: 10px` - 圆角大小
- `box-shadow: ...` - 阴影效果

---

### 2.3 重点项目展示部分

**位置：** 首页"重点项目"标题下的卡片列表。

#### 修改项目标题和内容
在 `_pages/about.md` 中找到项目卡片代码：
```html
<div class="card hoverable">
  <div class="card-body">
    <h5 class="card-title">视觉图像特征编码和理解</h5> <!-- 项目标题 -->
    <p class="card-text">
      针对降低大数据计算和存储成本...（项目描述）
    </p>
    <p class="card-text"><small class="text-muted">2023.01-2025.12 | 国家自然科学基金项目</small></p> <!-- 时间和来源 -->
    <a href="/projects/" class="btn btn-sm btn-primary">了解更多</a> <!-- 按钮链接 -->
  </div>
</div>
```
直接修改对应标签内的文字。

#### 添加新项目卡片
复制一个现有的 `<div class="col-sm-6 mt-3">...</div>` 整个块，修改内容。

#### 修改项目卡片样式
项目卡片的颜色由全局CSS控制。如果要单独修改某个卡片：
```html
<div class="card hoverable" style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white;">
  <div class="card-body">
    <h5 class="card-title">项目名称</h5>
    ...
  </div>
</div>
```

#### 修改"了解更多"按钮
```html
<a href="/projects/" class="btn btn-sm btn-primary" style="background-color: #28a745; border-color: #28a745;">了解更多</a>
```
- 修改 `href` 更换跳转链接
- 修改 `background-color` 更换按钮颜色

---

### 2.4 近期代表性论文部分

**位置：** 首页底部，"近期代表性论文"标题下的论文列表。

#### 控制哪些论文显示在首页
首页只显示 `_bibliography/papers.bib` 中标记了 `selected={true}` 的论文。

1. 打开 `_bibliography/papers.bib`
2. 找到想要显示在首页的论文
3. 在该论文的条目中添加或确认有 `selected = {true}`：
   ```bibtex
   @article{shi2021loss,
     title = {...},
     author = {...},
     selected = {true},  ← 添加这一行
     ...
   }
   ```

#### 控制显示论文的数量
在 `_config.yml` 文件中查找 `max_selected_papers` 设置：
```yaml
max_selected_papers: 5  # 首页最多显示5篇论文
```

#### 修改论文卡片样式
论文列表的样式由 `_layouts/bib.liquid` 和 CSS 文件控制。如果要全局修改论文卡片的背景色、边框等：

1. 打开 `_sass/_base.scss`
2. 搜索 `.bibliography` 相关样式
3. 修改对应的CSS属性

**示例：**修改论文卡片背景色
```scss
.bibliography li {
  background-color: #f8f9fa;  // 修改为浅灰色背景
  padding: 15px;
  border-radius: 8px;
  margin-bottom: 20px;
}
```

---

### 2.5 News (新闻动态) 部分

**位置：** 首页右侧边栏，"Latest News"下的滚动列表。

#### 添加新新闻
详见本文档【第7节：活动与新闻页面详细修改指南】。

#### 控制显示的新闻数量
在 `_pages/about.md` 顶部的配置中：
```yaml
announcements:
  enabled: true
  scrollable: true
  limit: 10  # 修改这个数字控制显示多少条新闻
```

#### 修改新闻列表样式
新闻列表的样式在 `_includes/news.liquid` 和相关CSS中定义。

**修改新闻列表背景色：**
在 `_sass/_base.scss` 中添加或修改：
```scss
.news {
  background-color: #ffffff;  // 白色背景
  padding: 20px;
  border-radius: 8px;
  max-height: 400px;  // 控制滚动区域高度
}
```

---

### 2.6 底部社交链接和页脚

**位置：** 每个页面底部的图标链接和版权信息。

#### 修改社交媒体图标链接
1. 打开 `_data/socials.yml`
2. 修改或添加社交媒体链接：
   ```yaml
   email: xsshi2021@uestc.edu.cn
   github_username: yourusername
   scholar_userid: BWGQt3YAAAAJ
   ```

#### 修改页脚版权文字
1. 打开 `_config.yml`
2. 找到 `footer_text` 字段：
   ```yaml
   footer_text: >
     可信智能医疗实验室 (Trust Intelligent Medical Lab) - 电子科技大学
   ```

#### 隐藏某些社交图标
在 `_config.yml` 中找到对应的开关：
```yaml
enable_navbar_social: false  # 导航栏不显示社交图标
social: true  # 页面底部显示社交图标
```

---

### 2.7 全局字体和颜色设置

如果要修改整个网站的字体、背景色、主题色等：

#### 修改全局字体
1. 打开 `_sass/_base.scss`
2. 找到 `body` 或 `.container` 的字体设置：
   ```scss
   body {
     font-family: "Times New Roman", "SimSun", "宋体", "STSong", serif;
   }
   ```
3. 修改字体列表（按优先级从左到右）

#### 修改全局背景渐变色
1. 打开 `_sass/_themes.scss`
2. 找到 `--global-body-bg-gradient-from` 和 `--global-body-bg-gradient-to`：
   ```scss
   :root {
     --global-body-bg-gradient-from: #e3f2fd;  // 渐变起始色
     --global-body-bg-gradient-to: #bbdefb;    // 渐变结束色
   }
   ```

#### 修改暗色模式的颜色
在 `_sass/_themes.scss` 中找到 `html[data-theme="dark"]` 部分，修改对应的颜色变量。

---

## 3. 常见问题排查

### 修改后页面没有变化怎么办？
1. **确认保存文件** - 确保修改的文件已保存
2. **重启Docker** - 停止网站后重新启动：`docker-compose down` → `docker-compose up`
3. **清除浏览器缓存** - 按 `Ctrl+F5` 强制刷新页面
4. **检查语法错误** - 特别是YAML文件（`---` 包围的部分）的缩进必须正确

### 如何找到对应的文件？
- **首页内容** → `_pages/about.md`
- **论文数据** → `_bibliography/papers.bib`
- **团队页面** → `_pages/team.md`
- **新闻动态** → `_news/` 文件夹
- **样式颜色** → `_sass/` 文件夹

### 如何撤销错误的修改？
如果改错了想恢复：
```bash
git checkout -- 文件路径  # 恢复单个文件
git reset --hard HEAD     # 恢复所有未提交的修改（慎用！）
```

---

## 4. 团队成员页面详细修改指南

本节说明如何修改团队成员页面（`/team/`）的各个部分，包括导师信息、博士生、硕士生等。

### 4.1 团队成员页面整体结构

**文件位置：** `_pages/team.md`

**页面结构：**
```
---
页面配置（标题、导航等）
---

<style>
样式定义（卡片样式、照片样式等）
</style>

---

## 导师
（导师卡片）

---

## 博士在读
（博士生卡片列表）

---

## 硕士在读
（硕士生卡片列表）
```

---

### 4.2 修改导师信息

#### 更换导师照片
1. 将新照片放入 `assets/img/` 文件夹（建议命名为 `shixiaoshuang.jpg`）
2. 在 `_pages/team.md` 中找到导师部分的照片代码：
   ```liquid
   {% include figure.liquid path="assets/img/shixiaoshuang.jpg" class="member-photo" %}
   ```
3. 如果使用不同的文件名，修改 `path="assets/img/新文件名.jpg"`

**照片要求：**
- 推荐尺寸：至少 300x300 像素
- 格式：JPG 或 PNG
- 建议比例：1:1（正方形）

#### 修改导师姓名和职位
找到导师卡片中的姓名部分：
```html
<h4>石小爽 教授 (Xiaoshuang Shi)</h4>
<p class="member-meta">教授、博士生导师、国家青年特聘专家</p>
<p class="member-meta">电子科技大学计算机科学与工程学院（网络空间安全学院）</p>
```
直接修改标签内的文字。

#### 修改研究方向
找到研究方向部分：
```html
<div class="member-research">
  <p><strong>研究方向：</strong>机器学习、模式识别、医学数据分析</p>
</div>
```
修改冒号后面的内容。

#### 修改个人简介
找到 `.member-bio` 部分：
```html
<div class="member-bio">
  <p>
    石小爽是电子科技大学教授...（修改这里的文字）
  </p>
  <p>
    在哈希编码优化...（可以添加多个段落）
  </p>
</div>
```

#### 修改联系方式
找到 `.member-contact` 部分：
```html
<div class="member-contact">
  <a href="/cv/"><i class="fas fa-file-alt"></i> 完整简历</a>
  <a href="mailto:xsshi2021@uestc.edu.cn"><i class="fas fa-envelope"></i> xsshi2021@uestc.edu.cn</a>
  <a href="https://scholar.google.com/..." target="_blank"><i class="ai ai-google-scholar"></i> Google Scholar</a>
</div>
```
- 修改 `href="/cv/"` 更改简历页面链接
- 修改 `mailto:` 后面的邮箱地址
- 修改 Google Scholar 链接

---

### 4.3 添加新的博士生

#### 步骤1：准备照片
1. 将学生照片放入 `assets/img/team_member/` 文件夹
2. 命名建议：使用拼音（如 `zhangsan.jpg`）

#### 步骤2：复制模板并修改
在 `## 博士在读` 部分，复制一个现有的学生卡片代码块：

```html
<div class="team-member">
  <div class="row">
    <div class="col-md-3 text-center">
      {% include figure.liquid path="assets/img/team_member/学生照片.jpg" class="member-photo" %}
    </div>
    <div class="col-md-9">
      <div class="member-info">
        <h4>学生姓名</h4>
        <p class="member-meta">2024级 博士生</p>
        
        <div class="member-research">
          <p><strong>研究方向：</strong>具体研究方向</p>
        </div>
        
        <p>
          个人简介和研究成果...
        </p>
        
        <div class="member-contact">
          <a href="mailto:student@email.com"><i class="fas fa-envelope"></i> student@email.com</a>
        </div>
      </div>
    </div>
  </div>
</div>
```

#### 步骤3：填写学生信息
- **照片路径**：修改 `path="assets/img/team_member/学生照片.jpg"`
- **姓名**：修改 `<h4>学生姓名</h4>`
- **年级**：修改 `2024级 博士生`
- **研究方向**：修改 `<strong>研究方向：</strong>` 后面的内容
- **个人简介**：在 `<p>` 标签中填写学生的研究成果、论文发表等
- **联系方式**：修改邮箱地址

---

### 4.4 添加新的硕士生

添加硕士生的步骤与添加博士生完全相同，只需在 `## 硕士在读` 部分复制模板并修改：

```html
<div class="team-member">
  <div class="row">
    <div class="col-md-3 text-center">
      {% include figure.liquid path="assets/img/team_member/硕士生照片.jpg" class="member-photo" %}
    </div>
    <div class="col-md-9">
      <div class="member-info">
        <h4>硕士生姓名</h4>
        <p class="member-meta">2025级 硕士生</p>
        
        <div class="member-research">
          <p><strong>研究方向：</strong>研究方向描述</p>
        </div>
        
        <p>
          个人简介...
        </p>
        
        <div class="member-contact">
          <a href="mailto:student@email.com"><i class="fas fa-envelope"></i> student@email.com</a>
        </div>
      </div>
    </div>
  </div>
</div>
```

---

### 4.5 删除已毕业的学生

如果学生已经毕业，需要从当前列表中删除：

1. 打开 `_pages/team.md`
2. 找到该学生的整个卡片代码块（从 `<div class="team-member">` 到对应的 `</div>`）
3. 删除整个代码块

**建议：** 可以先将代码复制到单独的文件保存，以备日后需要时参考。

---

### 4.6 添加新的学生分类

如果需要添加新的学生类别（如"已毕业学生"、"访问学者"等）：

#### 步骤1：添加分类标题
在适当位置添加：
```markdown
---

## 已毕业学生

<div class="team-section">
```

#### 步骤2：添加学生卡片
使用与博士生/硕士生相同的卡片模板。

#### 步骤3：关闭区域
在该分类的所有学生卡片后添加：
```html
</div>
```

---

### 4.7 修改卡片样式

团队成员卡片的样式在 `_pages/team.md` 顶部的 `<style>` 标签中定义。

#### 修改照片大小
找到 `.member-photo` 样式：
```css
.member-photo {
  width: 150px;      /* 照片宽度 */
  height: 150px;     /* 照片高度 */
  object-fit: cover;
  border-radius: 8px;  /* 圆角大小 */
  margin-right: 2rem;
}
```

#### 修改卡片背景和边框
找到 `.team-member` 样式：
```css
.team-member {
  margin-bottom: 2.5rem;
  padding: 1.5rem;         /* 内边距 */
  border: 1px solid #dee2e6;  /* 边框颜色 */
  border-radius: 8px;      /* 圆角大小 */
  transition: box-shadow 0.3s;
}

.team-member:hover {
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);  /* 鼠标悬停阴影 */
}
```

**示例：** 修改卡片为白色背景带阴影
```css
.team-member {
  margin-bottom: 2.5rem;
  padding: 1.5rem;
  background-color: #ffffff;  /* 添加白色背景 */
  border: none;               /* 移除边框 */
  border-radius: 12px;        /* 增大圆角 */
  box-shadow: 0 2px 8px rgba(0,0,0,0.08);  /* 添加默认阴影 */
  transition: box-shadow 0.3s;
}

.team-member:hover {
  box-shadow: 0 8px 20px rgba(0,0,0,0.15);  /* 鼠标悬停加深阴影 */
}
```

#### 修改姓名标题样式
找到 `.member-info h4` 样式：
```css
.member-info h4 {
  margin-top: 0;
  color: #2c3e50;      /* 姓名颜色 */
  font-size: 1.5rem;   /* 姓名字体大小 */
  font-weight: bold;   /* 加粗 */
}
```

#### 修改次要信息（年级、职位）的样式
找到 `.member-meta` 样式：
```css
.member-meta {
  color: #7f8c8d;        /* 文字颜色（灰色）*/
  font-size: 0.95rem;    /* 字体大小 */
  margin-bottom: 0.5rem;
}
```

---

### 4.8 修改联系方式图标

联系方式使用 Font Awesome 图标：

**可用图标：**
- `<i class="fas fa-envelope"></i>` - 邮箱
- `<i class="fas fa-phone"></i>` - 电话
- `<i class="fas fa-home"></i>` - 主页
- `<i class="fab fa-github"></i>` - GitHub
- `<i class="ai ai-google-scholar"></i>` - Google Scholar
- `<i class="fab fa-linkedin"></i>` - LinkedIn

**添加新的联系方式：**
```html
<div class="member-contact">
  <a href="/cv/"><i class="fas fa-file-alt"></i> 完整简历</a>
  <a href="mailto:email@example.com"><i class="fas fa-envelope"></i> Email</a>
  <a href="https://github.com/username"><i class="fab fa-github"></i> GitHub</a>
</div>
```

---

### 4.9 批量修改学生信息的技巧

如果需要批量修改多个学生的信息格式：

#### 使用查找替换
1. 在 VS Code 中按 `Ctrl+H` 打开查找替换
2. 在"查找"框输入要替换的内容
3. 在"替换为"框输入新内容
4. 点击"全部替换"

**示例：** 将所有"2024级"改为"2025级"
- 查找：`2024级`
- 替换为：`2025级`

#### 使用多光标编辑
1. 按住 `Alt` 键，鼠标点击多个位置
2. 同时在多个位置编辑相同的内容

---

### 4.10 团队成员页面常见问题

#### 照片显示不出来？
1. 检查照片文件是否放在 `assets/img/team_member/` 文件夹
2. 检查文件名大小写是否完全匹配（`photo.jpg` 和 `Photo.jpg` 是不同的）
3. 检查文件格式是否正确（推荐 `.jpg` 或 `.png`）

#### 卡片排版混乱？
1. 检查 HTML 标签是否完整闭合（每个 `<div>` 都要有对应的 `</div>`）
2. 检查是否漏掉了 `<div class="row">` 或 `<div class="col-md-9">` 等结构性标签

#### 样式不生效？
1. 确保 `<style>` 标签在文件顶部的 `---` 之后
2. 检查 CSS 语法是否正确（每个属性后要有分号 `;`）
3. 重启 Docker：`docker-compose down` → `docker-compose up`

#### 如何调整学生的显示顺序？
直接在 `_pages/team.md` 中调整学生卡片的代码顺序，最上面的会最先显示。

---

## 5. 研究项目页面详细修改指南

本节说明如何管理项目展示页面（`/projects/`）。

### 5.1 项目页面结构

项目页面由两部分组成：
1.  **主控文件**：`_pages/projects.md` - 控制页面的布局、分类显示。
2.  **项目内容文件**：`_projects/` 文件夹下的所有 `.md` 文件 - 每个文件代表一个项目卡片。

### 5.2 添加新项目

要在项目中添加一个新的条目，无需修改页面代码，只需新建一个文件。

1.  在 `_projects/` 文件夹下新建一个 Markdown 文件，例如 `project_new.md`。
2.  复制以下内容的模板：
    ```markdown
    ---
    layout: page
    title: 项目名称
    description: 简短的一句话描述（显示在卡片上）
    img: assets/img/project.jpg
    importance: 1
    category: 在研项目
    ---

    这里写项目的详细介绍（Markdown格式）。
    如果不需要详情页，上面的 layout 可以不填。
    ```

**关键参数说明：**
*   `title`: 项目标题。
*   `description`: 卡片上显示的简短文字。
*   `img`: 卡片缩略图，图片需放在 `assets/img/` 目录下。
*   `importance`: 排序用的数字，数字越小排在越前面。
*   `category`: 分类名称，必须与主页面的分类设置一致（如：在研项目、已完成项目）。

### 5.3 修改项目分类

默认分类为"在研项目"和"已完成项目"。如果要修改或添加分类：

1.  打开 `_pages/projects.md`。
2.  找到 `display_categories` 设置：
    ```markdown
    display_categories: [在研项目, 已完成项目]
    ```
3.  修改列表中的名称。
4.  **注意**：修改后，`_projects/` 下各个项目文件的 `category` 字段也必须对应修改，否则无法显示。

### 5.4 修改项目卡片样式

项目卡片的样式由 `_includes/projects.liquid` 和 CSS 控制。

*   **修改文字颜色/大小**：需要修改 `_sass/_base.scss` 中的 `.card-title` 和 `.card-text`。
*   **修改图片显示**：默认图片包含在 `.card-img` 中，可以在 CSS 中调整高度或填充方式。

---

## 6. 论文成果页面详细修改指南

本节说明如何管理论文列表页面（`/publications/`）。

### 6.1 论文数据源

所有论文数据都存储在唯一的 BibTeX 文件中：`_bibliography/papers.bib`。
页面会自动读取该文件并按年份排序生成列表。

### 6.2 必填与推荐字段

在 `papers.bib` 中添加条目时：

*   **必填**：
    *   `title`: 论文标题
    *   `author`: 作者列表（用 `and` 分隔，如 `San Zhang and Si Li`）
    *   `year`: 发表年份
    *   `journal` 或 `booktitle`: 期刊或会议名称

*   **推荐**：
    *   `abbr`: 会议/期刊缩写（如 CVPR, TPAMI），显示在左侧。
    *   `bibtex_show={true}`: 显示 BibTeX 引用代码框。
    *   `pdf={filename.pdf}`: 关联 PDF 文件（需放入 `assets/pdf/`）。
    *   `website={url}`: 跳转到项目主页。
    *   `selected={true}`: **设为精选（会在首页显示）**。

### 6.3 常见问题：作者名字加粗

系统会自动识别 `_config.yml` 中设置的实验室名字并加粗。

1.  打开 `_config.yml`。
2.  找到 `scholar` 配置块：
    ```yaml
    scholar:
      last_name: [Shi]
      first_name: [Xiaoshuang]
    ```
3.  如果论文中使用了名字的变体（如 `Shi, X.S.`），也需要在这里添加，否则不会加粗。

### 6.4 修改论文列表样式

*   **修改列表间距**：在 CSS 中调整 `li.bibliography` 的 margin。
*   **修改缩写标签颜色**：在 `_sass/_base.scss` 中查找 `abbr` 样式，修改 `background-color`。

---

## 7. 活动与新闻页面详细修改指南

本站包含两个"动态"相关的页面，用途不同：
1.  **活动与新闻 (`/activities/`)**：用于展示学术讲座、会议、科研项目进展等详细图文内容（手动排版）。
2.  **News 动态 (`/news/`)**：用于发布简短的时间线公告（自动生成）。

### 7.1 修改活动页面 (Activities)

**文件位置**：`_pages/activities.md`

这是一个自定义排版的页面。

#### 添加新活动
复制一个现有的 `.activity-item` 代码块并修改：

```html
<div class="activity-item">
  <div class="activity-header">
    <div>
      <!-- 标签类型：可选 type-project, type-paper, type-award, type-visit -->
      <span class="activity-type type-project">活动类型</span>
      <h3 class="activity-title">活动/新闻标题</h3>
    </div>
    <span class="activity-date">2026.01.01</span>
  </div>
  
  <div class="activity-content">
    <p>这里写活动的详细内容...</p>
  </div>
  
  <!-- 如果有图片 -->
  <div class="activity-images">
    <img src="/assets/img/activity.jpg" class="img-fluid rounded" style="max-height: 300px;">
  </div>
</div>
```

#### 修改标签颜色
在页面顶部的 `<style>` 标签中，可以找到并修改不同类型的颜色：
```css
.type-seminar { background: #3498db; }  /* 蓝色 */
.type-award { background: #f39c12; }    /* 橙色 */
```

### 7.2 发布 News 公告

**文件位置**：`_news/` 文件夹

#### 发布步骤
1.  在 `_news/` 中新建 Markdown 文件（如 `news_2026_01.md`）。
2.  填写内容：
    ```markdown
    ---
    layout: post
    date: 2026-01-28 15:00:00-0800
    inline: true
    ---

    祝贺实验室发表了一篇 CVPR 论文！
    ```

**注意**：这些 News 会自动显示在首页的右边栏（如果有开启）和 `/news/` 页面。

---

## 8. 联系我们页面详细修改指南

**文件位置**：`_pages/contact.md`

### 8.1 修改联系卡片信息

找到对应的 `.contact-card` 代码块：

*   **修改地址**：
    找到 `<i class="fas fa-map-marker-alt"></i>` 下方的文字进行修改。
*   **修改邮箱**：
    找到 `<a href="mailto:...">` 标签修改邮箱链接和显示文本。

### 8.2 嵌入新地图

页面底部通常包含一个地图区域。如果是使用百度/高德/谷歌地图的嵌入代码：

1.  在地图服务商官网生成"嵌入代码"（iframe）。
2.  在 `_pages/contact.md` 中找到 `.map-container`：
    ```html
    <div class="map-container">
      <!-- 在这里粘贴新的 iframe 代码 -->
      <iframe src="..." width="100%" height="100%" ...></iframe>
    </div>
    ```

### 8.3 修改页面样式

该页面使用了内部样式表（`<style>`），可以直接在文件顶部修改：
*   `.contact-card`: 修改卡片背景颜色、边框。
*   `.contact-icon`: 修改图标颜色（默认蓝色 `#3498db`）。

---

## 9. 导师CV页面详细修改指南

CV 页面通常有两种实现方式，本模板使用的是**数据驱动模式**。

**数据文件**：`_data/cv.yml`
**页面文件**：`_pages/cv.md` (通常不需要修改此文件，除非要改标题)

### 9.1 修改简历内容

打开 `_data/cv.yml`，这是一个 YAML 格式文件，**缩进非常重要（通常是2个空格）**。

#### 修改基本介绍
找到第一个 `title: 个人介绍` 的块：
```yaml
- title: 个人介绍
  type: map
  contents:
    - name: 简介
      value: 这里修改简介文字...
```

#### 添加教育/工作经历
复制 `type: time_table` 下的 `contents` 条目：
```yaml
    - title: 新的职位/学位
      institution: 机构名称
      year: 时间段
      description: 
        - 描述点1
        - 描述点2
```

#### 添加论文列表
在 `title: 代表性文章` 下，`items` 是一个列表：
```yaml
    - title: 深度神经网络可解释性研究
      items:
        - "1. 论文引用格式文本..."
        - "2. 第二篇论文..."
```
*注意：论文内容需要用双引号包围，如果有特殊字符可能需要转义。*

### 9.2 CV页面常见错误

*   **页面显示空白或报错**：通常是 `cv.yml` 格式错误。
    *   检查冒号后面是否有了空格。
    *   检查缩进是否对齐。
    *   检查文本中是否包含了未转义的特殊字符（如冒号），如果有，必须把整段文字用引号包起来。

## 10. 搜索功能维护说明

本模板内置了全局搜索功能，支持搜索页面内容、博客文章和项目。

### 10.1 开启/关闭搜索
1.  打开 `_config.yml` 文件。
2.  找到 `search_enabled` 选项：
    ```yaml
    search_enabled: true  # true开启，false关闭
    ```

### 10.2 搜索范围配置
在 `_config.yml` 中还可以配置搜索包含的内容：
```yaml
socials_in_search: true  # 是否搜索社交媒体链接
posts_in_search: false   # 是否搜索博客文章
bib_search: true         # 是否开启论文专用搜索
```

### 10.3 故障排查
如果你发现新添加的内容搜不到：
1.  **等待构建完成**：GitHub Pages 需要几分钟更新搜索索引。
2.  **本地运行**：如果是本地预览，搜索功能依赖 JavaScript 生成的索引文件，确保没有任何报错。
3.  **关键词匹配**：搜索是基于关键词匹配的，确保文章中确实包含该词。

---

## 11. 主题切换 (暗色模式) 说明

网站支持明亮 (Light) 和暗色 (Dark) 两种模式，并能根据系统偏好自动切换。

### 11.1 开启/关闭主题切换按钮
如果不希望用户切换主题（例如强制使用明亮模式）：
1.  打开 `_config.yml`。
2.  找到 `enable_darkmode`：
    ```yaml
    enable_darkmode: false  # 设置为false将隐藏切换按钮
    ```

### 11.2 修改主题颜色
如果您觉得暗色模式太黑，或者明亮模式颜色不对：
1.  打开 `_sass/_themes.scss`。
2.  这里定义了两种模式的所有颜色变量。
    *   `:root { ... }` 定义了明亮模式的颜色。
    *   `html[data-theme="dark"] { ... }` 定义了暗色模式的颜色。
    *   修改对应的颜色值（如 `--global-bg-color` 是背景色，`--global-text-color` 是文字颜色）。

---

## 12. 顶部导航栏 (Navbar) 修改指南

顶部导航栏的链接是根据页面设置自动生成的。

### 12.1 添加页面到导航栏
任何在 `_pages/` 目录下的 `.md` 文件，只要添加了以下 front matter，就会出现在导航栏：

```markdown
---
layout: page
title: 页面标题  # 导航栏显示的文字
nav: true       # 必须为 true
nav_order: 3    # 排序，数字越小越靠左
---
```

### 12.2 创建下拉菜单 (Dropdown)
如果您想创建一个包含子菜单的导航项（如"更多"）：

1.  新建一个页面文件（如 `_pages/more.md`）。
2.  配置 front matter：
    ```markdown
    ---
    layout: page
    title: 更多
    nav: true
    nav_order: 5
    dropdown: true  # 开启下拉菜单
    children:       # 定义子菜单项
      - title: 书单
        permalink: /books/
      - title: divider  # 分割线
      - title: 博客
        permalink: /blog/
    ---
    ```

### 12.3 修改网站标题 (Logo文字)
导航栏左上角的文字通常显示实验室名称或教授名字。
1.  打开 `_config.yml`。
2.  修改 `title` 字段：
    ```yaml
    title: TIM Lab  # 这里修改显示的文字
    ```
    *注意：如果 `title` 留空，系统会尝试组合 `first_name` 和 `last_name`。*

### 12.4 固定导航栏
如果希望导航栏随页面滚动而移动（不固定在顶部）：
在 `_config.yml` 中设置：
```yaml
navbar_fixed: false
```

---

## 13. 底部栏 (Footer) 修改指南

### 13.1 修改版权信息
底部显示的 "© 2026 可信智能医疗实验室..." 文字。
1.  打开 `_config.yml`。
2.  找到 `footer_text`：
    ```yaml
    footer_text: >
      © 2026 可信智能医疗实验室. All rights reserved.
    ```
    *您可以在这里添加 HTML 代码，例如添加备案号链接。*

### 13.2 固定底部栏
如果页面内容很少，底部栏可能会"飘"在中间。可以设置将其固定在屏幕底部：
在 `_config.yml` 中设置：
```yaml
footer_fixed: true
```

### 13.3 显示最后更新时间
要在底部显示网站最后一次更新的日期：
在 `_config.yml` 中设置：
```yaml
last_updated: true
```

---

**文档结束**
本手册涵盖了网站日常维护的绝大部分场景。建议在修改前备份相关文件。


