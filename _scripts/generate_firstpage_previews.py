import os
import sys

# 尝试导入 PyMuPDF，如果没有安装则提示用户
try:
    import fitz  # PyMuPDF
except ImportError:
    print("需要安装 pymupdf 库才能运行此脚本。")
    print("请在终端运行: pip install pymupdf")
    sys.exit(1)

def generate_previews():
    # 设定基础路径
    # 假设脚本位于 _scripts 文件夹或根目录下，根据实际位置调整
    current_dir = os.path.dirname(os.path.abspath(__file__))
    
    # 向上寻找项目根目录 (假设 assets 文件夹在项目根目录)
    # 如果脚本在根目录：project_root = current_dir
    # 如果脚本在 _scripts：project_root = os.path.dirname(current_dir)
    if os.path.basename(current_dir) == '_scripts':
        project_root = os.path.dirname(current_dir)
    else:
        project_root = current_dir

    pdf_dir = os.path.join(project_root, 'assets', 'pdf')
    preview_dir = os.path.join(project_root, 'assets', 'img', 'publication_preview','first_page')

    # 确保预览图目录存在
    if not os.path.exists(preview_dir):
        os.makedirs(preview_dir)
        print(f"创建目录: {preview_dir}")

    # 检查 PDF 目录是否存在
    if not os.path.exists(pdf_dir):
        print(f"错误: 找不到 PDF 目录 {pdf_dir}")
        return

    # 获取所有 PDF 文件
    pdf_files = [f for f in os.listdir(pdf_dir) if f.lower().endswith('.pdf')]
    
    print(f"在 {pdf_dir} 中找到 {len(pdf_files)} 个 PDF 文件。")
    print("-" * 50)

    for pdf_file in pdf_files:
        pdf_path = os.path.join(pdf_dir, pdf_file)
        
        # 生成图片文件名 (例如 kong2024act.pdf -> kong2024act.jpg)
        image_filename = os.path.splitext(pdf_file)[0] + ".jpg"
        image_path = os.path.join(preview_dir, image_filename)

        try:
            # 打开 PDF
            doc = fitz.open(pdf_path)
            if len(doc) > 0:
                page = doc[0]  # 获取第一页
                
                # 设置缩放比例，150 DPI 通常足够清晰且文件不大
                # matrix = fitz.Matrix(2.0, 2.0) # 如果需要更高清可以用这个
                pix = page.get_pixmap(dpi=150)
                
                # 保存为图片
                pix.save(image_path)
                
                print(f"✅ 已生成预览图: {image_filename}")
                print(f"   请在 papers.bib 对应的条目中添加: preview={{{image_filename}}}")
            else:
                print(f"⚠️ 跳过空文件: {pdf_file}")
            
            doc.close()
            
        except Exception as e:
            print(f"❌ 处理 {pdf_file} 时出错: {e}")

    print("-" * 50)
    print("处理完成！所有预览图已保存到 assets/img/publication_preview/first_page/ 目录下。")

if __name__ == "__main__":
    generate_previews()
