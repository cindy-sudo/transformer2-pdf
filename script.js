// 監聽表單送出
document.getElementById("transformerForm").addEventListener("submit", function (e) {
  e.preventDefault();          // 不跳轉
  generatePDF();               // 產出 PDF
});

// 把整個表單截圖 → 存成 PDF
function generatePDF() {
  const { jsPDF } = window.jspdf;        // 取 jsPDF
  const form = document.getElementById("transformerForm");

  // 用 html2canvas 把表單轉成 Canvas
  html2canvas(form).then(canvas => {
    const imgData = canvas.toDataURL("image/png");
    const pdf     = new jsPDF({
      orientation: "p",
      unit: "mm",
      format: "a4"
    });

    // 將圖片塞進 A4，等比例縮放
    const pageWidth  = pdf.internal.pageSize.getWidth();
    const pageHeight = (canvas.height * pageWidth) / canvas.width;
    pdf.addImage(imgData, "PNG", 0, 0, pageWidth, pageHeight);

    // 下載
    pdf.save("transformer_report.pdf");
  }).catch(err => {
    console.error(err);
    alert("產生 PDF 失敗，請再試一次！");
  });
}
