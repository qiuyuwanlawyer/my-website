from pathlib import Path
import re
import shutil
import sys

from docx import Document
from docx.document import Document as DocumentType
from docx.table import Table
from docx.text.paragraph import Paragraph
from docx.oxml.ns import qn


def iter_blocks(parent):
    body = parent.element.body if isinstance(parent, DocumentType) else parent._tc
    for child in body.iterchildren():
        if child.tag == qn("w:p"):
            yield Paragraph(child, parent)
        elif child.tag == qn("w:tbl"):
            yield Table(child, parent)


def escape_cell(text):
    return re.sub(r"\s+", " ", text).strip().replace("|", "\\|")


def paragraph_images(paragraph, document, image_dir, counter):
    refs = paragraph._p.xpath(".//a:blip/@r:embed")
    items = []
    for ref in refs:
        part = document.part.related_parts[ref]
        ext = Path(part.partname).suffix or ".png"
        filename = f"figure-{counter:02d}{ext}"
        (image_dir / filename).write_bytes(part.blob)
        items.append(filename)
        counter += 1
    return items, counter


def convert(input_path, output_dir, slug):
    output_root = Path(output_dir)
    article_dir = output_root / slug
    image_dir = article_dir / "images"
    image_dir.mkdir(parents=True, exist_ok=True)
    document = Document(input_path)
    lines = []
    image_counter = 1

    for block in iter_blocks(document):
        if isinstance(block, Paragraph):
            text = block.text.strip()
            images, image_counter = paragraph_images(block, document, image_dir, image_counter)
            for image in images:
                lines.append(f"![正文配图](images/{image})")
            if not text:
                continue

            style = (block.style.name or "").lower()
            if "title" in style:
                lines.append(f"# {text}")
            elif "heading 1" in style or "标题 1" in style:
                lines.append(f"## {text}")
            elif "heading 2" in style or "标题 2" in style:
                lines.append(f"### {text}")
            elif "heading 3" in style or "标题 3" in style:
                lines.append(f"#### {text}")
            elif "list" in style or block._p.xpath("./w:pPr/w:numPr"):
                lines.append(f"- {text}")
            else:
                lines.append(text)
        else:
            rows = [[escape_cell(cell.text) for cell in row.cells] for row in block.rows]
            if not rows or not rows[0]:
                continue
            width = max(len(row) for row in rows)
            rows = [row + [""] * (width - len(row)) for row in rows]
            lines.append("| " + " | ".join(rows[0]) + " |")
            lines.append("| " + " | ".join(["---"] * width) + " |")
            for row in rows[1:]:
                lines.append("| " + " | ".join(row) + " |")

    normalized = []
    for index, line in enumerate(line for line in lines if line.strip()):
        if index == 0 and not line.startswith("#"):
            line = f"# {line}"
        elif re.match(r"^[一二三四五六七八九十]+、", line):
            line = f"## {line}"
        elif re.match(r"^\d+\.\d+(?:\s|$)", line):
            line = f"### {line}"
        elif re.match(r"^（[一二三四五六七八九十]+）", line):
            line = f"### {line}"
        elif line in {"引言", "导语", "案情回顾", "庭审情况", "案件结果", "结语"}:
            line = f"## {line}"
        elif re.match(r"^情形[一二三四五六七八九十]+：", line):
            line = f"#### {line}"
        normalized.append(line)

    content = "\n\n".join(normalized)
    content = re.sub(r"\n{3,}", "\n\n", content).strip() + "\n"

    if slug == "electronic-signature":
        extras_root = Path("/Users/qiuyuwan/Downloads/法律工作文件夹/天驰君泰微信文章/数字指纹，契约新章：电子签章效力实务解析/illustrations")
        extras = [
            ("01-comparison-invalid-scenarios.png", "电子签章无效高频情形"),
            ("02-infographic-case-summary.png", "电子签章裁判案例总结"),
            ("03-framework-valid-logic.png", "可靠电子签章效力判断框架"),
        ]
        markers = [
            "通过对近年裁判文书的梳理",
            "第二部分",
            "## 结语",
        ]
        for (filename, alt), marker in zip(extras, markers):
            shutil.copy2(extras_root / filename, image_dir / filename)
            image_markdown = f"\n\n![{alt}](images/{filename})\n\n"
            if marker in content:
                content = content.replace(marker, image_markdown + marker, 1)
            else:
                content += image_markdown

    (article_dir / "article.md").write_text(content, encoding="utf-8")


if __name__ == "__main__":
    if len(sys.argv) != 4:
        raise SystemExit("usage: extract-docx-articles.py INPUT OUTPUT_DIR SLUG")
    convert(sys.argv[1], sys.argv[2], sys.argv[3])
