import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/components/theme-provider";
import { ThemeToggle } from "@/components/theme-toggle";
import Dashboard from "@/pages/dashboard";
import NotFound from "@/pages/not-found";
import { Activity } from "lucide-react";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Dashboard} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="dark">
        <TooltipProvider>
          <div className="min-h-screen bg-background">
            {/* Header */}
            <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur">
              <div className="max-w-2xl mx-auto px-4 h-16 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex items-center justify-center h-8 w-8 rounded-md bg-primary text-primary-foreground">
                    <Activity className="h-5 w-5" />
                  </div>
                  <div>
                    <h1 className="text-base font-semibold text-foreground">
                      Nightbot Counter
                    </h1>
                    <p className="text-xs text-muted-foreground">Manta Tracker</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-2 px-3 py-1.5 rounded-md bg-card border">
                    <div className="h-2 w-2 rounded-full bg-status-online animate-pulse" />
                    <span className="text-xs font-medium text-foreground">Live</span>
                  </div>
                  <ThemeToggle />
                </div>
              </div>
            </header>

            {/* Main Content */}
            <Router />
          </div>
          <Toaster />
        </TooltipProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
