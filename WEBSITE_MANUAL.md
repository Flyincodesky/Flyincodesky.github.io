# 网站使用、维护说明文档

## 1. 网站基本操作

### 启动与预览
在对网站进行修改后，建议在本地预览确认无误后再发布。

*   **启动网站**：
    双击项目根目录下的 `启动网站.bat` 脚本（或在终端运行 `docker compose up`）。
    启动成功后，在浏览器访问 `http://localhost:4000` 或 `http://127.0.0.1:4000`。
*   **停止网站**：
    双击 `停止网站.bat`，或在终端按 `Ctrl+C` 并在提示时输入 `docker compose down`。

### 发布更新（同步到云端）
当您确认本地修改无误后，需要将改动推送到 GitHub 以更新线上网站。请参考根目录下的 `oftenuse.txt` 或执行以下命令：

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

## 2. 论文展示部分 (Publications)

### 如何添加新论文
1.  打开文件：`_bibliography/papers.bib`。
2.  按照 BibTeX 格式在文件顶部添加新的条目。
3.  **必填字段**：`title`, `author`, `year`, `booktitle` (或 `journal`)。
4.  **特殊功能开关**：
    *   `bibtex_show={true}`: 显示 BibTeX 引用按钮。
    *   `selected={true}`: **重要！** 将此论文展示在首页 "Selected Publications" 区域。

### 如何添加论文资源按钮 (PDF/Code/Website)
在 `papers.bib` 的对应条目中添加以下字段：

*   **PDF 下载**：
    *   方法 A（推荐）：将 PDF 文件放入 `assets/pdf/` 文件夹（如 `mypaper.pdf`），然后在 bib文件中设置 `pdf={mypaper.pdf}`。
    *   方法 B：直接粘贴外部链接 `pdf={https://arxiv.org/pdf/...}`。
*   **代码链接**：
    *   `code={https://github.com/username/repo}`
*   **其他按钮**：
    *   支持 `abstract`, `supp`, `poster`, `slides`, `video`, `website` 等字段，直接赋值链接或文本即可。

### 如何为论文添加概览图 (Preview Image)
此功能让论文列表左侧显示动态或静态的缩略图。

1.  **准备图片**：
    将图片文件（推荐 .gif, .jpg, .png，建议比例 1:1 或 4:3）放入文件夹：
    `assets/img/publication_preview/`
2.  **修改 BibTeX 文件**：
    打开 `papers.bib`，在对应论文条目中添加 `preview` 字段，值为文件名。
    *示例*：
    ```bibtex
    @article{my_paper_2025,
      ...
      preview={my_demo.gif},
      ...
    }
    ```

---

## 3. 核心项目部分 (Projects)

### 如何修改主页 "Key Projects" (重点项目)
主页的重点项目展示位于 `_pages/about.md` 文件中。
1.  打开 `_pages/about.md`。
2.  找到 `<div class="container">` 内部的代码块。
3.  直接修改 HTML 卡片中的文本内容、图片路径和链接。
    *   *注意：主页这部分目前是定制的 HTML 结构，修改时请保留 `div` 标签结构，仅替换文字。*

### 如何添加“项目”页面的新项目
除了主页，网站还有一个专门的 Projects页（`_projects/` 文件夹），用于列出所有项目。

1.  **新建文件**：在 `_projects/` 文件夹下新建 `.md` 文件（如 `project_x_name.md`）。
2.  **填写头部信息 (Front Matter)**：
    复制以下模板到文件开头：
    ```markdown
    ---
    layout: page
    title: 项目名称
    description: 项目简短描述（显示在列表中）
    img: assets/img/project_thumbnail.jpg  # 缩略图路径
    importance: 1  # 排序优先级，数字越小越靠前
    category: 在研项目  # 分类名称（如：在研项目、已完成项目）
    ---
    ```
3.  **编写正文**：在 `---` 下方使用 Markdown 编写项目详细介绍。

---

## 4. 新闻与公告 (News)

### 如何发布新动态
网站首页和 News 页面会显示最新的动态列表。

1.  **新建文件**：在 `_news/` 文件夹下创建一个新的 `.md` 文件（推荐命名格式：`announcement_xxx.md`）。
2.  **填写内容**：
    ```markdown
    ---
    layout: post
    date: 2026-01-22 10:00:00-0400  # 注意：必须填写日期，排序以此为准
    inline: true  # true表示仅作为一条简讯显示，不创建单独详情页
    ---

    这里写新闻内容，支持 **加粗** 和 [链接](url)。
    ```

---

## 5. 个人简历与团队 (CV & Team)

### 更新在线简历 (CV)
网站的 CV 页面由数据驱动，无需排版，只需修改数据。
1.  打开文件：`_data/cv.yml`。
2.  按照层级结构（Education, Experience 等）添加或修改列表项。
3.  保存后，网页会自动重新渲染排版。

### 更新团队成员
1.  打开文件：`_pages/team.md`（或 `about.md` 中如果包含团队部分）。
2.  如果团队页面使用了 HTML 排版，直接替换 `<img src="...">` 中的照片路径和文字介绍。
3.  **上传照片**：将成员照片放入 `assets/img/` 目录。

### 更新个人简介 (Bio)
1.  打开 `_pages/about.md`。
2.  顶部的 `profile` 区域控制头像和个人信息：
    *   修改 `image: prof_pic.jpg` 可更换左侧大头像（图片需存放在 `assets/img/`）。
    *   修改 `address` 修改办公室地址。
3.  正文区域（`news` 上方）即为个人简介文本。

---

## 6. 其他设置

### 修改全局信息
*   **网站标题/页脚信息**：打开 `_config.yml`，查找 `title`, `email`, `footer_text` 等字段进行修改。
*   **社交媒体链接**：打开 `_data/socials.yml`，填入您的 Google Scholar, GitHub, LinkedIn 等链接。

---

**遇到问题？**
*   图片不显示？请检查文件名大小写是否完全一致（`Logo.png` 和 `logo.png` 是不同的）。
*   更新没生效？请确认是否执行了 `git push`，并等待了约 3 分钟的构建时间。
