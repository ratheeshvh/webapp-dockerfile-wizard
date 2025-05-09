
import { WizardConfig } from "@/types/dockerfile";

export function generateDockerfile(config: WizardConfig): string {
  const lines: string[] = [];
  
  // Base image
  lines.push(`FROM ${config.baseImage}`);
  lines.push("");
  
  // Working directory
  lines.push(`WORKDIR ${config.workdir}`);
  lines.push("");
  
  // Environment variables
  if (config.env.length > 0) {
    for (const env of config.env) {
      lines.push(`ENV ${env.key}=${env.value}`);
    }
    lines.push("");
  }
  
  // MongoDB specific configuration
  if (config.baseImage.includes("mongo")) {
    // MongoDB doesn't need build or copy commands typically
    // Just ensure proper environment variables and ports
    
    if (!config.env.some(env => env.key === "MONGO_INITDB_ROOT_USERNAME")) {
      lines.push("# Default MongoDB root username if not provided");
      lines.push("ENV MONGO_INITDB_ROOT_USERNAME=root");
      lines.push("");
    }
    
    if (!config.env.some(env => env.key === "MONGO_INITDB_ROOT_PASSWORD")) {
      lines.push("# Default MongoDB root password if not provided");
      lines.push("ENV MONGO_INITDB_ROOT_PASSWORD=example");
      lines.push("");
    }
    
    if (!config.ports.some(port => port.internal === "27017")) {
      lines.push("# Expose default MongoDB port");
      lines.push("EXPOSE 27017");
      lines.push("");
    }
    
    // MongoDB volume for data persistence
    if (!config.volumes.some(vol => vol.destination === "/data/db")) {
      lines.push("# Create volume for MongoDB data");
      lines.push("VOLUME [\"/data/db\"]");
      lines.push("");
    }
    
    // Usually MongoDB images don't need a start command as they have an entrypoint
    return lines.join("\n");
  }
  
  // Copy package files for Node.js projects
  if (config.baseImage.includes("node")) {
    lines.push("# Copy package.json and package-lock.json (if available)");
    lines.push("COPY package*.json ./");
    lines.push("");
  }
  
  // Copy requirements for Python projects
  if (config.baseImage.includes("python")) {
    lines.push("# Copy requirements.txt for pip install");
    lines.push("COPY requirements.txt ./");
    lines.push("");
  }
  
  // Install dependencies
  if (config.installCommand) {
    lines.push("# Install dependencies");
    lines.push(`RUN ${config.installCommand}`);
    lines.push("");
  }
  
  // Copy project files
  lines.push("# Copy project files");
  lines.push(`COPY ${config.copyFiles} .`);
  lines.push("");
  
  // Build step (if provided)
  if (config.buildCommand && config.buildCommand !== 'N/A' && config.buildCommand !== 'none') {
    lines.push("# Build the application");
    lines.push(`RUN ${config.buildCommand}`);
    lines.push("");
  }
  
  // Expose ports
  if (config.ports.length > 0) {
    lines.push("# Expose port(s)");
    for (const port of config.ports) {
      lines.push(`EXPOSE ${port.internal}`);
    }
    lines.push("");
  }
  
  // Start command
  if (config.startCommand) {
    lines.push("# Start the application");
    lines.push(`CMD ${formatCommand(config.startCommand)}`);
  }
  
  return lines.join("\n");
}

function formatCommand(command: string): string {
  // Format command as JSON array if it contains spaces and isn't already in brackets
  if (command.includes(" ") && !command.startsWith("[")) {
    const parts = command.split(" ");
    return JSON.stringify(parts);
  }
  return command;
}
