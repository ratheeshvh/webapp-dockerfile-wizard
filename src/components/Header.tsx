
import { Github } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Header() {
  return (
    <header className="border-b bg-white dark:bg-slate-950 shadow-sm">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="rounded-md bg-gradient-to-r from-blue-500 to-teal-500 p-1.5 text-white">
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              width="22" 
              height="22" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            >
              <path d="M21 18v-2a4 4 0 0 0-4-4H7a4 4 0 0 0-4 4v2"></path>
              <rect x="3" y="4" width="18" height="8" rx="1"></rect>
              <path d="M4 12h16"></path>
            </svg>
          </div>
          <h1 className="font-bold text-xl text-slate-800 dark:text-white">DockerWiz</h1>
        </div>
        <div className="flex items-center gap-2">
          <a 
            href="https://github.com/topics/dockerfile" 
            target="_blank" 
            rel="noopener noreferrer"
          >
            <Button variant="outline" size="sm" className="gap-2">
              <Github size={16} />
              <span className="hidden md:inline">GitHub</span>
            </Button>
          </a>
        </div>
      </div>
    </header>
  );
}
