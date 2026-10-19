import { useState } from "react";
import { Download, LoaderCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import cvAsset from "@/assets/amir-askari-cv.pdf.asset.json";

export function CvDownload() {
  const [downloading, setDownloading] = useState(false);
  const [error, setError] = useState(false);

  async function download() {
    setDownloading(true);
    setError(false);
    try {
      const response = await fetch(cvAsset.url);
      if (!response.ok) throw new Error("CV unavailable");
      const file = await response.blob();
      if (!(await file.slice(0, 5).text()).startsWith("%PDF-")) {
        throw new Error("Response is not a PDF");
      }
      const url = URL.createObjectURL(new Blob([file], { type: "application/pdf" }));
      const link = document.createElement("a");
      link.href = url;
      link.download = "Amir-Askari-CV.pdf";
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.setTimeout(() => URL.revokeObjectURL(url), 60_000);
    } catch {
      setError(true);
    } finally {
      setDownloading(false);
    }
  }

  return (
    <div className="flex flex-col items-start gap-2">
      <Button
        type="button"
        onClick={download}
        disabled={downloading}
        className="h-auto gap-3 bg-accent px-5 py-3 font-mono text-[11px] uppercase tracking-[0.2em] text-background hover:bg-accent-2"
      >
        {downloading ? "Downloading CV" : "Download CV"}
        {downloading ? <LoaderCircle className="animate-spin" /> : <Download />}
      </Button>
      {error ? (
        <p role="alert" className="max-w-64 text-xs text-muted">
          Download unavailable. <a href={cvAsset.url} target="_blank" rel="noreferrer" className="text-accent underline">Open CV</a> or try again.
        </p>
      ) : null}
    </div>
  );
}