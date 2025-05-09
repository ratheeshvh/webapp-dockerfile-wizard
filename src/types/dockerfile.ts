
export interface WizardConfig {
  baseImage: string;
  workdir: string;
  copyFiles: string;
  installCommand: string;
  buildCommand: string;
  startCommand: string;
  ports: PortMapping[];
  volumes: VolumeMapping[];
  env: EnvVariable[];
}

export interface PortMapping {
  internal: string;
  external: string;
}

export interface VolumeMapping {
  source: string;
  destination: string;
}

export interface EnvVariable {
  key: string;
  value: string;
}
