
import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { BaseImageSelector } from "@/components/wizard/BaseImageSelector";
import { EnvironmentConfig } from "@/components/wizard/EnvironmentConfig";
import { PortsAndVolumes } from "@/components/wizard/PortsAndVolumes";
import { BuildCommands } from "@/components/wizard/BuildCommands";
import { DockerfilePreview } from "@/components/wizard/DockerfilePreview";
import { generateDockerfile } from "@/lib/dockerfile-generator";
import { WizardConfig } from "@/types/dockerfile";

export function DockerfileWizard() {
  const { toast } = useToast();
  const [activeStep, setActiveStep] = useState("base-image");
  const [config, setConfig] = useState<WizardConfig>({
    baseImage: "node:18",
    workdir: "/app",
    copyFiles: ".",
    installCommand: "npm install",
    buildCommand: "npm run build",
    startCommand: "npm start",
    ports: [{ internal: "3000", external: "3000" }],
    volumes: [],
    env: [{ key: "NODE_ENV", value: "production" }]
  });
  
  const [dockerfile, setDockerfile] = useState("");
  
  useEffect(() => {
    setDockerfile(generateDockerfile(config));
  }, [config]);
  
  const steps = [
    { id: "base-image", label: "Base Image" },
    { id: "env-config", label: "Environment" },
    { id: "ports-volumes", label: "Ports & Volumes" },
    { id: "build-commands", label: "Build Commands" },
    { id: "preview", label: "Preview" }
  ];
  
  const currentStepIndex = steps.findIndex(step => step.id === activeStep);
  const isFirstStep = currentStepIndex === 0;
  const isLastStep = currentStepIndex === steps.length - 1;
  
  const handleNext = () => {
    if (!isLastStep) {
      setActiveStep(steps[currentStepIndex + 1].id);
    }
  };
  
  const handlePrevious = () => {
    if (!isFirstStep) {
      setActiveStep(steps[currentStepIndex - 1].id);
    }
  };
  
  const handleCopyDockerfile = () => {
    navigator.clipboard.writeText(dockerfile);
    toast({
      title: "Copied to clipboard",
      description: "Dockerfile content has been copied to your clipboard"
    });
  };
  
  const updateConfig = (updates: Partial<WizardConfig>) => {
    setConfig(prev => ({ ...prev, ...updates }));
  };
  
  return (
    <Card className="p-6 shadow-lg border border-slate-200 dark:border-slate-800 rounded-xl">
      <Tabs value={activeStep} onValueChange={setActiveStep} className="w-full">
        <TabsList className="grid grid-cols-5 mb-6">
          {steps.map((step) => (
            <TabsTrigger key={step.id} value={step.id} className="text-xs sm:text-sm">
              {step.label}
            </TabsTrigger>
          ))}
        </TabsList>
        
        <TabsContent value="base-image">
          <BaseImageSelector 
            config={config} 
            updateConfig={updateConfig} 
          />
        </TabsContent>
        
        <TabsContent value="env-config">
          <EnvironmentConfig 
            config={config} 
            updateConfig={updateConfig} 
          />
        </TabsContent>
        
        <TabsContent value="ports-volumes">
          <PortsAndVolumes 
            config={config} 
            updateConfig={updateConfig} 
          />
        </TabsContent>
        
        <TabsContent value="build-commands">
          <BuildCommands 
            config={config} 
            updateConfig={updateConfig} 
          />
        </TabsContent>
        
        <TabsContent value="preview">
          <DockerfilePreview dockerfile={dockerfile} onCopy={handleCopyDockerfile} />
        </TabsContent>
      </Tabs>
      
      <div className="flex justify-between mt-6 pt-4 border-t">
        <Button 
          variant="outline" 
          onClick={handlePrevious}
          disabled={isFirstStep}
        >
          Previous
        </Button>
        
        {isLastStep ? (
          <Button 
            onClick={handleCopyDockerfile}
            className="bg-gradient-to-r from-blue-500 to-teal-500 hover:from-blue-600 hover:to-teal-600"
          >
            Copy Dockerfile
          </Button>
        ) : (
          <Button 
            onClick={handleNext}
            className="bg-gradient-to-r from-blue-500 to-teal-500 hover:from-blue-600 hover:to-teal-600"
          >
            Next
          </Button>
        )}
      </div>
    </Card>
  );
}
