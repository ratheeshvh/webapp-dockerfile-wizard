
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { WizardConfig } from "@/types/dockerfile";

const popularImages = [
  { name: "Node.js 18", image: "node:18", description: "JavaScript runtime" },
  { name: "Node.js 16", image: "node:16", description: "JavaScript runtime" },
  { name: "Python 3.10", image: "python:3.10", description: "Python runtime" },
  { name: "Python 3.9", image: "python:3.9", description: "Python runtime" },
  { name: "Ruby 3.2", image: "ruby:3.2", description: "Ruby runtime" },
  { name: "PHP 8.2", image: "php:8.2-apache", description: "PHP with Apache" },
  { name: "MongoDB 6.0", image: "mongo:6.0", description: "MongoDB database" },
  { name: "MongoDB 5.0", image: "mongo:5.0", description: "MongoDB database" },
  { name: "Nginx", image: "nginx:alpine", description: "Lightweight web server" },
  { name: "Ubuntu", image: "ubuntu:22.04", description: "Ubuntu base OS" },
];

interface BaseImageSelectorProps {
  config: WizardConfig;
  updateConfig: (updates: Partial<WizardConfig>) => void;
}

export function BaseImageSelector({ config, updateConfig }: BaseImageSelectorProps) {
  const handleSelectImage = (image: string) => {
    updateConfig({ baseImage: image });
  };
  
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium mb-2">Select Base Image</h3>
        <p className="text-slate-500 dark:text-slate-400 mb-4">
          Choose a starting point for your Docker container
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
        {popularImages.map((item) => (
          <Card 
            key={item.image} 
            className={`cursor-pointer transition-all hover:border-blue-400 ${
              config.baseImage === item.image ? 'border-blue-500 ring-2 ring-blue-500/20' : ''
            }`}
            onClick={() => handleSelectImage(item.image)}
          >
            <CardContent className="p-4">
              <div className="font-medium">{item.name}</div>
              <div className="text-xs text-slate-500 dark:text-slate-400">{item.description}</div>
              <div className="text-xs mt-2 text-slate-600 dark:text-slate-300 font-mono">{item.image}</div>
            </CardContent>
          </Card>
        ))}
      </div>
      
      <div className="pt-4">
        <Label htmlFor="custom-image">Custom Base Image</Label>
        <div className="flex gap-3 mt-1.5">
          <Input 
            id="custom-image"
            value={config.baseImage}
            onChange={(e) => updateConfig({ baseImage: e.target.value })}
            placeholder="e.g., node:18-alpine"
            className="font-mono"
          />
          <Button 
            variant="outline"
            className="shrink-0"
            onClick={() => updateConfig({ baseImage: "" })}
          >
            Clear
          </Button>
        </div>
        <p className="text-xs text-slate-500 mt-1.5">
          Enter a custom Docker image name from Docker Hub
        </p>
      </div>
      
      <div className="pt-4">
        <Label htmlFor="workdir">Working Directory</Label>
        <Input 
          id="workdir"
          value={config.workdir}
          onChange={(e) => updateConfig({ workdir: e.target.value })}
          placeholder="/app"
          className="font-mono mt-1.5"
        />
        <p className="text-xs text-slate-500 mt-1.5">
          Directory inside the container where your app will be placed
        </p>
      </div>
      
      <div className="pt-4">
        <Label htmlFor="copy-files">Files to Copy</Label>
        <Input 
          id="copy-files"
          value={config.copyFiles}
          onChange={(e) => updateConfig({ copyFiles: e.target.value })}
          placeholder="."
          className="font-mono mt-1.5"
        />
        <p className="text-xs text-slate-500 mt-1.5">
          Files to copy from your local system to the container (use "." for all files)
        </p>
      </div>
    </div>
  );
}
