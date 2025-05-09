
import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Plus, X } from "lucide-react";
import { WizardConfig } from "@/types/dockerfile";

interface EnvironmentConfigProps {
  config: WizardConfig;
  updateConfig: (updates: Partial<WizardConfig>) => void;
}

export function EnvironmentConfig({ config, updateConfig }: EnvironmentConfigProps) {
  const [newEnvKey, setNewEnvKey] = useState("");
  const [newEnvValue, setNewEnvValue] = useState("");
  
  const handleAddEnv = () => {
    if (newEnvKey.trim()) {
      const newEnv = [...config.env, { key: newEnvKey, value: newEnvValue }];
      updateConfig({ env: newEnv });
      setNewEnvKey("");
      setNewEnvValue("");
    }
  };
  
  const handleRemoveEnv = (index: number) => {
    const newEnv = [...config.env];
    newEnv.splice(index, 1);
    updateConfig({ env: newEnv });
  };
  
  const handleUpdateEnv = (index: number, key: string, value: string) => {
    const newEnv = [...config.env];
    newEnv[index] = { key, value };
    updateConfig({ env: newEnv });
  };
  
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium mb-2">Environment Variables</h3>
        <p className="text-slate-500 dark:text-slate-400 mb-4">
          Configure environment variables for your container
        </p>
      </div>
      
      <div className="space-y-4">
        {config.env.map((env, index) => (
          <div key={index} className="flex gap-3">
            <Input
              value={env.key}
              onChange={(e) => handleUpdateEnv(index, e.target.value, env.value)}
              placeholder="KEY"
              className="font-mono"
            />
            <Input
              value={env.value}
              onChange={(e) => handleUpdateEnv(index, env.key, e.target.value)}
              placeholder="value"
              className="font-mono"
            />
            <Button 
              variant="outline" 
              size="icon" 
              onClick={() => handleRemoveEnv(index)}
              className="shrink-0"
            >
              <X size={16} />
            </Button>
          </div>
        ))}
      </div>
      
      <div className="pt-2">
        <Label className="text-sm font-medium">Add New Variable</Label>
        <div className="flex gap-3 mt-1.5">
          <Input
            value={newEnvKey}
            onChange={(e) => setNewEnvKey(e.target.value)}
            placeholder="KEY"
            className="font-mono"
          />
          <Input
            value={newEnvValue}
            onChange={(e) => setNewEnvValue(e.target.value)}
            placeholder="value"
            className="font-mono"
          />
          <Button 
            variant="outline"
            onClick={handleAddEnv}
            className="gap-1.5 shrink-0"
          >
            <Plus size={16} />
            Add
          </Button>
        </div>
      </div>
      
      <div className="bg-slate-50 dark:bg-slate-900 p-4 rounded-lg mt-6">
        <h4 className="font-medium mb-2">Common Environment Variables</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <Button 
            variant="outline" 
            className="justify-start text-sm"
            onClick={() => {
              const existing = config.env.some(e => e.key === "NODE_ENV");
              if (!existing) {
                updateConfig({ 
                  env: [...config.env, { key: "NODE_ENV", value: "production" }] 
                });
              }
            }}
          >
            NODE_ENV=production
          </Button>
          <Button 
            variant="outline"
            className="justify-start text-sm"
            onClick={() => {
              const existing = config.env.some(e => e.key === "PORT");
              if (!existing) {
                updateConfig({ 
                  env: [...config.env, { key: "PORT", value: "3000" }] 
                });
              }
            }}
          >
            PORT=3000
          </Button>
          <Button 
            variant="outline"
            className="justify-start text-sm"
            onClick={() => {
              const existing = config.env.some(e => e.key === "MONGODB_URI");
              if (!existing) {
                updateConfig({ 
                  env: [...config.env, { key: "MONGODB_URI", value: "mongodb://mongodb:27017/mydatabase" }] 
                });
              }
            }}
          >
            MONGODB_URI=mongodb://...
          </Button>
          <Button 
            variant="outline"
            className="justify-start text-sm"
            onClick={() => {
              const existing = config.env.some(e => e.key === "DEBUG");
              if (!existing) {
                updateConfig({ 
                  env: [...config.env, { key: "DEBUG", value: "app:*" }] 
                });
              }
            }}
          >
            DEBUG=app:*
          </Button>
          <Button 
            variant="outline"
            className="justify-start text-sm"
            onClick={() => {
              const existing = config.env.some(e => e.key === "DATABASE_URL");
              if (!existing) {
                updateConfig({ 
                  env: [...config.env, { key: "DATABASE_URL", value: "postgresql://user:password@localhost:5432/db" }] 
                });
              }
            }}
          >
            DATABASE_URL=postgresql://...
          </Button>
          <Button 
            variant="outline"
            className="justify-start text-sm"
            onClick={() => {
              const existing = config.env.some(e => e.key === "MONGO_INITDB_ROOT_USERNAME");
              if (!existing) {
                updateConfig({ 
                  env: [...config.env, { key: "MONGO_INITDB_ROOT_USERNAME", value: "root" }] 
                });
              }
            }}
          >
            MONGO_INITDB_ROOT_USERNAME=root
          </Button>
          <Button 
            variant="outline"
            className="justify-start text-sm"
            onClick={() => {
              const existing = config.env.some(e => e.key === "MONGO_INITDB_ROOT_PASSWORD");
              if (!existing) {
                updateConfig({ 
                  env: [...config.env, { key: "MONGO_INITDB_ROOT_PASSWORD", value: "example" }] 
                });
              }
            }}
          >
            MONGO_INITDB_ROOT_PASSWORD=example
          </Button>
        </div>
      </div>
    </div>
  );
}
