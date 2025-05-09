
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { WizardConfig } from "@/types/dockerfile";
import { useEffect } from "react";

interface BuildCommandsProps {
  config: WizardConfig;
  updateConfig: (updates: Partial<WizardConfig>) => void;
}

export function BuildCommands({ config, updateConfig }: BuildCommandsProps) {
  // Set appropriate default commands based on the selected base image
  useEffect(() => {
    if (config.baseImage.includes("mongo")) {
      // MongoDB doesn't need typical build commands
      updateConfig({
        installCommand: "N/A",
        buildCommand: "N/A",
        startCommand: "mongod",
      });
    }
  }, [config.baseImage]);

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium mb-2">Build Commands</h3>
        <p className="text-slate-500 dark:text-slate-400 mb-4">
          Configure how your application is built and started
        </p>
      </div>
      
      <div className="space-y-6">
        <div>
          <Label htmlFor="install-cmd">Install Dependencies Command</Label>
          <Input
            id="install-cmd"
            value={config.installCommand}
            onChange={(e) => updateConfig({ installCommand: e.target.value })}
            placeholder="npm install"
            className="font-mono mt-1.5"
            disabled={config.baseImage.includes("mongo")}
          />
          <p className="text-xs text-slate-500 mt-1.5">
            Command to install dependencies (e.g., npm install, yarn, pip install -r requirements.txt)
          </p>
        </div>
        
        <div>
          <Label htmlFor="build-cmd">Build Command</Label>
          <Input
            id="build-cmd"
            value={config.buildCommand}
            onChange={(e) => updateConfig({ buildCommand: e.target.value })}
            placeholder="npm run build"
            className="font-mono mt-1.5"
            disabled={config.baseImage.includes("mongo")}
          />
          <p className="text-xs text-slate-500 mt-1.5">
            Command to build your application (e.g., npm run build, yarn build)
          </p>
        </div>
        
        <div>
          <Label htmlFor="start-cmd">Start Command</Label>
          <Input
            id="start-cmd"
            value={config.startCommand}
            onChange={(e) => updateConfig({ startCommand: e.target.value })}
            placeholder="npm start"
            className="font-mono mt-1.5"
          />
          <p className="text-xs text-slate-500 mt-1.5">
            Command to start your application (e.g., npm start, node server.js, mongod)
          </p>
        </div>
        
        <div className="bg-slate-50 dark:bg-slate-900 p-4 rounded-lg mt-2">
          <h4 className="font-medium mb-2">Common Commands by Technology</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
            <div>
              <h5 className="text-sm font-medium mb-1">Node.js (npm)</h5>
              <div className="text-xs text-slate-500 dark:text-slate-400">
                <div>Install: <span className="font-mono">npm install</span></div>
                <div>Build: <span className="font-mono">npm run build</span></div>
                <div>Start: <span className="font-mono">npm start</span></div>
              </div>
            </div>
            
            <div>
              <h5 className="text-sm font-medium mb-1">Node.js (yarn)</h5>
              <div className="text-xs text-slate-500 dark:text-slate-400">
                <div>Install: <span className="font-mono">yarn</span></div>
                <div>Build: <span className="font-mono">yarn build</span></div>
                <div>Start: <span className="font-mono">yarn start</span></div>
              </div>
            </div>
            
            <div>
              <h5 className="text-sm font-medium mb-1">Python</h5>
              <div className="text-xs text-slate-500 dark:text-slate-400">
                <div>Install: <span className="font-mono">pip install -r requirements.txt</span></div>
                <div>Start: <span className="font-mono">python app.py</span></div>
              </div>
            </div>
            
            <div>
              <h5 className="text-sm font-medium mb-1">MongoDB</h5>
              <div className="text-xs text-slate-500 dark:text-slate-400">
                <div>Install: <span className="font-mono">N/A</span></div>
                <div>Start: <span className="font-mono">mongod</span></div>
              </div>
            </div>
            
            <div>
              <h5 className="text-sm font-medium mb-1">Ruby on Rails</h5>
              <div className="text-xs text-slate-500 dark:text-slate-400">
                <div>Install: <span className="font-mono">bundle install</span></div>
                <div>Start: <span className="font-mono">rails server -b 0.0.0.0</span></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
