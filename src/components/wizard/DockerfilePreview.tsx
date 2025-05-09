
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Check, Copy } from "lucide-react";

interface DockerfilePreviewProps {
  dockerfile: string;
  onCopy: () => void;
}

export function DockerfilePreview({ dockerfile, onCopy }: DockerfilePreviewProps) {
  const [copied, setCopied] = useState(false);
  
  const handleCopy = () => {
    onCopy();
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium mb-2">Dockerfile Preview</h3>
        <p className="text-slate-500 dark:text-slate-400 mb-4">
          Here's your generated Dockerfile
        </p>
      </div>
      
      <div className="relative">
        <pre className="bg-slate-950 text-slate-50 p-4 rounded-lg font-mono text-sm overflow-x-auto">
          <code>{dockerfile}</code>
        </pre>
        
        <div className="absolute top-2 right-2">
          <Button
            size="sm"
            variant="ghost"
            className="h-8 bg-slate-800/60 hover:bg-slate-700/70 text-slate-200"
            onClick={handleCopy}
          >
            {copied ? (
              <>
                <Check size={14} className="mr-1" /> Copied
              </>
            ) : (
              <>
                <Copy size={14} className="mr-1" /> Copy
              </>
            )}
          </Button>
        </div>
      </div>
      
      <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
        <h4 className="text-sm font-medium text-blue-800 dark:text-blue-300 mb-2">Next Steps</h4>
        <ol className="text-sm text-blue-700 dark:text-blue-300 space-y-1 list-decimal list-outside ml-5">
          <li>Save the Dockerfile to the root of your project</li>
          <li>To build the image: <span className="font-mono bg-blue-100 dark:bg-blue-900/40 px-1 rounded">docker build -t your-app-name .</span></li>
          <li>To run the container: <span className="font-mono bg-blue-100 dark:bg-blue-900/40 px-1 rounded">docker run -p [PORT]:[PORT] your-app-name</span></li>
        </ol>
      </div>
    </div>
  );
}
