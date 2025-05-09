#!/bin/bash

# Stop script execution if an error occurs
set -e

# Function to display an error message and exit
error_exit() {
    echo "Error: $1"
    exit 1
}

# Check if npm is installed
command -v npm >/dev/null 2>&1 || error_exit "npm is not installed. Please install Node.js and npm."

echo "Building the application..."

# Install dependencies
echo "Installing dependencies..."
npm install || error_exit "Failed to install dependencies."

# Build the project
echo "Building the project..."
npm run build || error_exit "Build process failed."

echo "Build completed successfully!"
