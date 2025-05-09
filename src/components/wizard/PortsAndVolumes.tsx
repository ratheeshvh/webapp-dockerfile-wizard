
import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Plus, X } from "lucide-react";
import { WizardConfig } from "@/types/dockerfile";

interface PortsAndVolumesProps {
  config: WizardConfig;
  updateConfig: (updates: Partial<WizardConfig>) => void;
}

export function PortsAndVolumes({ config, updateConfig }: PortsAndVolumesProps) {
  const [newPortInternal, setNewPortInternal] = useState("");
  const [newPortExternal, setNewPortExternal] = useState("");
  const [newVolumeSrc, setNewVolumeSrc] = useState("");
  const [newVolumeDest, setNewVolumeDest] = useState("");
  
  const handleAddPort = () => {
    if (newPortInternal && newPortExternal) {
      const newPorts = [...config.ports, { 
        internal: newPortInternal, 
        external: newPortExternal 
      }];
      updateConfig({ ports: newPorts });
      setNewPortInternal("");
      setNewPortExternal("");
    }
  };
  
  const handleRemovePort = (index: number) => {
    const newPorts = [...config.ports];
    newPorts.splice(index, 1);
    updateConfig({ ports: newPorts });
  };
  
  const handleAddVolume = () => {
    if (newVolumeSrc && newVolumeDest) {
      const newVolumes = [...config.volumes, { 
        source: newVolumeSrc, 
        destination: newVolumeDest 
      }];
      updateConfig({ volumes: newVolumes });
      setNewVolumeSrc("");
      setNewVolumeDest("");
    }
  };
  
  const handleRemoveVolume = (index: number) => {
    const newVolumes = [...config.volumes];
    newVolumes.splice(index, 1);
    updateConfig({ volumes: newVolumes });
  };
  
  return (
    <div className="space-y-8">
      <div>
        <h3 className="text-lg font-medium mb-6">Port Mappings</h3>
        
        <div className="space-y-4">
          {config.ports.map((port, index) => (
            <div key={index} className="flex gap-3 items-center">
              <Input
                value={port.internal}
                onChange={(e) => {
                  const newPorts = [...config.ports];
                  newPorts[index] = { ...port, internal: e.target.value };
                  updateConfig({ ports: newPorts });
                }}
                placeholder="Internal port"
                className="font-mono"
              />
              <span className="text-slate-400">→</span>
              <Input
                value={port.external}
                onChange={(e) => {
                  const newPorts = [...config.ports];
                  newPorts[index] = { ...port, external: e.target.value };
                  updateConfig({ ports: newPorts });
                }}
                placeholder="External port"
                className="font-mono"
              />
              <Button 
                variant="outline" 
                size="icon" 
                onClick={() => handleRemovePort(index)}
              >
                <X size={16} />
              </Button>
            </div>
          ))}
        </div>
        
        <div className="pt-4">
          <Label className="text-sm font-medium">Add New Port Mapping</Label>
          <p className="text-sm text-slate-500 dark:text-slate-400 mb-2">
            Map container internal ports to host external ports
          </p>
          <div className="flex gap-3 items-center">
            <Input
              value={newPortInternal}
              onChange={(e) => setNewPortInternal(e.target.value)}
              placeholder="Internal port"
              className="font-mono"
            />
            <span className="text-slate-400">→</span>
            <Input
              value={newPortExternal}
              onChange={(e) => setNewPortExternal(e.target.value)}
              placeholder="External port"
              className="font-mono"
            />
            <Button 
              variant="outline"
              onClick={handleAddPort}
              className="gap-1.5"
            >
              <Plus size={16} />
              Add
            </Button>
          </div>
        </div>
        
        <div className="bg-slate-50 dark:bg-slate-900 p-4 rounded-lg mt-6">
          <h4 className="font-medium mb-2">Common Ports</h4>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <Button 
              variant="outline" 
              className="justify-center text-sm"
              onClick={() => {
                const existing = config.ports.some(p => p.internal === "3000");
                if (!existing) {
                  updateConfig({ 
                    ports: [...config.ports, { internal: "3000", external: "3000" }] 
                  });
                }
              }}
            >
              3000:3000
            </Button>
            <Button 
              variant="outline"
              className="justify-center text-sm"
              onClick={() => {
                const existing = config.ports.some(p => p.internal === "8080");
                if (!existing) {
                  updateConfig({ 
                    ports: [...config.ports, { internal: "8080", external: "8080" }] 
                  });
                }
              }}
            >
              8080:8080
            </Button>
            <Button 
              variant="outline"
              className="justify-center text-sm"
              onClick={() => {
                const existing = config.ports.some(p => p.internal === "5000");
                if (!existing) {
                  updateConfig({ 
                    ports: [...config.ports, { internal: "5000", external: "5000" }] 
                  });
                }
              }}
            >
              5000:5000
            </Button>
            <Button 
              variant="outline"
              className="justify-center text-sm"
              onClick={() => {
                const existing = config.ports.some(p => p.internal === "80");
                if (!existing) {
                  updateConfig({ 
                    ports: [...config.ports, { internal: "80", external: "80" }] 
                  });
                }
              }}
            >
              80:80
            </Button>
            <Button 
              variant="outline"
              className="justify-center text-sm"
              onClick={() => {
                const existing = config.ports.some(p => p.internal === "27017");
                if (!existing) {
                  updateConfig({ 
                    ports: [...config.ports, { internal: "27017", external: "27017" }] 
                  });
                }
              }}
            >
              27017:27017
            </Button>
          </div>
        </div>
      </div>
      
      <div>
        <h3 className="text-lg font-medium mb-6">Volumes</h3>
        
        <div className="space-y-4">
          {config.volumes.map((volume, index) => (
            <div key={index} className="flex gap-3 items-center">
              <Input
                value={volume.source}
                onChange={(e) => {
                  const newVolumes = [...config.volumes];
                  newVolumes[index] = { ...volume, source: e.target.value };
                  updateConfig({ volumes: newVolumes });
                }}
                placeholder="Source path"
                className="font-mono"
              />
              <span className="text-slate-400">:</span>
              <Input
                value={volume.destination}
                onChange={(e) => {
                  const newVolumes = [...config.volumes];
                  newVolumes[index] = { ...volume, destination: e.target.value };
                  updateConfig({ volumes: newVolumes });
                }}
                placeholder="Destination path"
                className="font-mono"
              />
              <Button 
                variant="outline" 
                size="icon" 
                onClick={() => handleRemoveVolume(index)}
              >
                <X size={16} />
              </Button>
            </div>
          ))}
        </div>
        
        <div className="pt-4">
          <Label className="text-sm font-medium">Add New Volume</Label>
          <p className="text-sm text-slate-500 dark:text-slate-400 mb-2">
            Map host directories to container paths
          </p>
          <div className="flex gap-3 items-center">
            <Input
              value={newVolumeSrc}
              onChange={(e) => setNewVolumeSrc(e.target.value)}
              placeholder="./host/path"
              className="font-mono"
            />
            <span className="text-slate-400">:</span>
            <Input
              value={newVolumeDest}
              onChange={(e) => setNewVolumeDest(e.target.value)}
              placeholder="/container/path"
              className="font-mono"
            />
            <Button 
              variant="outline"
              onClick={handleAddVolume}
              className="gap-1.5"
            >
              <Plus size={16} />
              Add
            </Button>
          </div>
        </div>
        
        <div className="bg-slate-50 dark:bg-slate-900 p-4 rounded-lg mt-6">
          <h4 className="font-medium mb-2">Common Volumes</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <Button 
              variant="outline" 
              className="justify-start text-sm"
              onClick={() => {
                const existing = config.volumes.some(v => v.destination === "/app/node_modules");
                if (!existing) {
                  updateConfig({ 
                    volumes: [...config.volumes, { 
                      source: "./node_modules", 
                      destination: "/app/node_modules" 
                    }] 
                  });
                }
              }}
            >
              ./node_modules:/app/node_modules
            </Button>
            <Button 
              variant="outline"
              className="justify-start text-sm"
              onClick={() => {
                const existing = config.volumes.some(v => v.destination === "/app/data");
                if (!existing) {
                  updateConfig({ 
                    volumes: [...config.volumes, { 
                      source: "./data", 
                      destination: "/app/data" 
                    }] 
                  });
                }
              }}
            >
              ./data:/app/data
            </Button>
            <Button 
              variant="outline"
              className="justify-start text-sm"
              onClick={() => {
                const existing = config.volumes.some(v => v.destination === "/data/db");
                if (!existing) {
                  updateConfig({ 
                    volumes: [...config.volumes, { 
                      source: "./mongodb_data", 
                      destination: "/data/db" 
                    }] 
                  });
                }
              }}
            >
              ./mongodb_data:/data/db
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
