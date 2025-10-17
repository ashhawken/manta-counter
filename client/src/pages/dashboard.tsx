import { useQuery, useMutation } from "@tanstack/react-query";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { Copy, RotateCcw, Activity, Hash, TrendingUp, History, Egg } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { type Stats } from "@shared/schema";
import { queryClient, apiRequest } from "@/lib/queryClient";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

export default function Dashboard() {
  const { toast } = useToast();
  const baseUrl = window.location.origin;

  const { data: stats, isLoading } = useQuery<Stats>({
    queryKey: ["/api/stats"],
    refetchInterval: 2000,
  });

  const resetMutation = useMutation({
    mutationFn: () => apiRequest("POST", "/api/reset"),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/stats"] });
      toast({
        title: "Counter Reset",
        description: "The manta counter has been reset to 0.",
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to reset counter. Please try again.",
        variant: "destructive",
      });
    },
  });

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied!",
      description: `${label} copied to clipboard.`,
    });
  };

  if (isLoading || !stats) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
          <p className="text-sm text-muted-foreground">Loading counter...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-2xl mx-auto px-4 py-8 space-y-8">
        {/* Hero Counter Display */}
        <Card className="border-2" data-testid="card-counter-display">
          <CardContent className="p-12 text-center">
            <p className="text-sm font-medium text-muted-foreground mb-2">
              MANTA COUNT
            </p>
            <div className="text-6xl font-semibold text-foreground mb-4" data-testid="text-counter-value">
              {stats.value}
            </div>
            {stats.lastIncrement ? (
              <p className="text-sm text-muted-foreground" data-testid="text-last-increment">
                Last updated {formatDistanceToNow(new Date(stats.lastIncrement), { addSuffix: true })}
              </p>
            ) : (
              <p className="text-sm text-muted-foreground">Never incremented</p>
            )}
          </CardContent>
        </Card>

        {/* API Endpoints */}
        <div className="space-y-3">
          <h2 className="text-lg font-semibold text-foreground">Nightbot Commands</h2>
          <div className="grid gap-3">
            <Card data-testid="card-endpoint-manta">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <CardTitle className="text-base">!manta</CardTitle>
                      <Badge variant="secondary" className="text-xs">
                        GET
                      </Badge>
                    </div>
                    <CardDescription className="text-xs">
                      Display current counter value
                    </CardDescription>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => copyToClipboard(`${baseUrl}/api/manta`, "!manta endpoint")}
                    data-testid="button-copy-manta"
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="pb-4">
                <code className="text-xs font-mono bg-muted px-2 py-1 rounded block overflow-x-auto" data-testid="text-endpoint-manta">
                  {baseUrl}/api/manta
                </code>
              </CardContent>
            </Card>

            <Card data-testid="card-endpoint-mantaadd">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <CardTitle className="text-base">!mantaadd</CardTitle>
                      <Badge variant="secondary" className="text-xs">
                        GET
                      </Badge>
                    </div>
                    <CardDescription className="text-xs">
                      Increment counter by 1
                    </CardDescription>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => copyToClipboard(`${baseUrl}/api/mantaadd`, "!mantaadd endpoint")}
                    data-testid="button-copy-mantaadd"
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="pb-4">
                <code className="text-xs font-mono bg-muted px-2 py-1 rounded block overflow-x-auto" data-testid="text-endpoint-mantaadd">
                  {baseUrl}/api/mantaadd
                </code>
              </CardContent>
            </Card>

            <Card data-testid="card-endpoint-eggfound">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <CardTitle className="text-base">!eggfound</CardTitle>
                      <Badge variant="secondary" className="text-xs">
                        GET
                      </Badge>
                    </div>
                    <CardDescription className="text-xs">
                      Reset counter (saves to history)
                    </CardDescription>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => copyToClipboard(`${baseUrl}/api/eggfound`, "!eggfound endpoint")}
                    data-testid="button-copy-eggfound"
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="pb-4">
                <code className="text-xs font-mono bg-muted px-2 py-1 rounded block overflow-x-auto" data-testid="text-endpoint-eggfound">
                  {baseUrl}/api/eggfound
                </code>
              </CardContent>
            </Card>

            <Card data-testid="card-endpoint-setkills">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <CardTitle className="text-base">!setkills</CardTitle>
                      <Badge variant="secondary" className="text-xs">
                        GET
                      </Badge>
                    </div>
                    <CardDescription className="text-xs">
                      Set counter to specific value
                    </CardDescription>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => copyToClipboard(`${baseUrl}/api/setkills?count=$(query)`, "!setkills endpoint")}
                    data-testid="button-copy-setkills"
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="pb-4">
                <code className="text-xs font-mono bg-muted px-2 py-1 rounded block overflow-x-auto" data-testid="text-endpoint-setkills">
                  {baseUrl}/api/setkills?count=$(query)
                </code>
                <p className="text-xs text-muted-foreground mt-2">
                  Usage: !setkills &lt;number&gt;
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Stats */}
        <Card data-testid="card-stats">
          <CardHeader className="pb-3">
            <CardTitle className="text-base">Statistics</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-3 gap-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Activity className="h-4 w-4" />
                  <span className="text-xs font-medium">Total</span>
                </div>
                <p className="text-2xl font-semibold" data-testid="text-stat-total">
                  {stats.totalRequests}
                </p>
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Hash className="h-4 w-4" />
                  <span className="text-xs font-medium">Views</span>
                </div>
                <p className="text-2xl font-semibold" data-testid="text-stat-views">
                  {stats.mantaRequests}
                </p>
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <TrendingUp className="h-4 w-4" />
                  <span className="text-xs font-medium">Adds</span>
                </div>
                <p className="text-2xl font-semibold" data-testid="text-stat-adds">
                  {stats.mantaAddRequests}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Reset Button */}
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button
              variant="destructive"
              className="w-full"
              data-testid="button-reset-trigger"
            >
              <RotateCcw className="h-4 w-4 mr-2" />
              Reset Counter
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This will reset the manta counter to 0. This action cannot be undone.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel data-testid="button-reset-cancel">Cancel</AlertDialogCancel>
              <AlertDialogAction
                onClick={() => resetMutation.mutate()}
                data-testid="button-reset-confirm"
              >
                Reset
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>

        {/* History */}
        {stats.history.length > 0 && (
          <Card data-testid="card-history">
            <CardHeader className="pb-3">
              <div className="flex items-center gap-2">
                <History className="h-4 w-4 text-muted-foreground" />
                <CardTitle className="text-base">Counter History</CardTitle>
              </div>
              <CardDescription className="text-xs">
                Previous counter values before resets
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {stats.history.map((entry, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-3 rounded-md bg-muted/50 hover-elevate"
                    data-testid={`history-entry-${index}`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="flex items-center justify-center h-10 w-10 rounded-md bg-card border">
                        {entry.resetBy === "eggfound" ? (
                          <Egg className="h-5 w-5 text-primary" />
                        ) : (
                          <RotateCcw className="h-5 w-5 text-muted-foreground" />
                        )}
                      </div>
                      <div>
                        <p className="text-sm font-medium text-foreground">
                          Count: {entry.value}
                        </p>
                        <div className="text-xs text-muted-foreground">
                          {formatDistanceToNow(new Date(entry.resetAt), { addSuffix: true })}
                          {entry.resetBy === "eggfound" && (
                            <Badge variant="secondary" className="ml-2 text-xs">
                              Egg Found
                            </Badge>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Setup Instructions */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base">Setup Instructions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm text-muted-foreground">
            <div>
              <p className="font-medium text-foreground mb-1">1. Add !manta command</p>
              <p className="text-xs">
                In Nightbot, create a command named <code className="bg-muted px-1 py-0.5 rounded">!manta</code> with the URL above.
              </p>
            </div>
            <div>
              <p className="font-medium text-foreground mb-1">2. Add !mantaadd command</p>
              <p className="text-xs">
                Create another command named <code className="bg-muted px-1 py-0.5 rounded">!mantaadd</code> with its URL.
              </p>
            </div>
            <div>
              <p className="font-medium text-foreground mb-1">3. Add !eggfound command</p>
              <p className="text-xs">
                Create a command named <code className="bg-muted px-1 py-0.5 rounded">!eggfound</code> to reset the counter (saves to history).
              </p>
            </div>
            <div>
              <p className="font-medium text-foreground mb-1">4. Add !setkills command</p>
              <p className="text-xs">
                Create a command named <code className="bg-muted px-1 py-0.5 rounded">!setkills</code> with its URL to manually set the counter value.
              </p>
            </div>
            <div>
              <p className="font-medium text-foreground mb-1">5. You're ready!</p>
              <p className="text-xs">
                Your viewers can now use these commands in your Twitch chat.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
