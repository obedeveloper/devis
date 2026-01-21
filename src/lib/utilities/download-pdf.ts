export async function DownloadPDF(title: string, ids: string[]) {
  const res = await fetch('/get-pdf', {
    method: 'post',
    body: JSON.stringify(ids),
  });

  const blob = await res.blob();
  const url = URL.createObjectURL(blob);

  const a = document.createElement('a');
  a.href = url;
  a.download = `${title}.pdf`;
  document.body.appendChild(a);
  a.click();

  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
