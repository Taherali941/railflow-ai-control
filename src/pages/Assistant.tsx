import { useState } from "react";
import { MainLayout } from "@/components/layout/MainLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { MessageSquare, Send, Mic, BarChart3, Clock, TrendingUp } from "lucide-react";

const quickQueries = [
  "Show me current system status",
  "Which trains are delayed?", 
  "Generate today's performance report",
  "Check collision risk levels",
  "What's the weather impact?",
  "Show passenger load distribution"
];

const chatHistory = [
  {
    type: "user",
    message: "What's the current status of TR-002?",
    time: "14:32"
  },
  {
    type: "assistant", 
    message: "TR-002 (Northern Express) is currently delayed by 8 minutes due to signal issues at Junction 4B. Current speed: 45 km/h, Passengers: 180, Next station: North Terminal (ETA: 14:47). Would you like me to show optimization options?",
    time: "14:32"
  },
  {
    type: "user",
    message: "Yes, show me optimization options",
    time: "14:33"
  },
  {
    type: "assistant",
    message: "Based on current conditions, I recommend: 1) Reroute via Junction 5A (saves 3 min), 2) Increase speed to 65 km/h on clear sections, 3) Hold connecting trains at North Terminal for 2 additional minutes. This would reduce total delay to 3 minutes. Shall I implement these changes?",
    time: "14:33"
  }
];

export default function Assistant() {
  const [messages, setMessages] = useState(chatHistory);
  const [inputMessage, setInputMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const newMessage = {
      type: "user" as const,
      message: inputMessage,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, newMessage]);
    setInputMessage("");
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const aiResponse = {
        type: "assistant" as const,
        message: generateAIResponse(inputMessage),
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, aiResponse]);
      setIsTyping(false);
    }, 1500);
  };

  const generateAIResponse = (query: string): string => {
    const responses = [
      "I understand your query. Based on current system data, I recommend checking the real-time dashboard for the latest updates.",
      "Let me analyze the current railway operations... I've found some optimization opportunities that could improve efficiency by 12%.",
      "According to the latest data, all systems are operating within normal parameters. Would you like me to provide a detailed status report?",
      "I've processed your request and identified potential improvements. The suggested changes could reduce delays by up to 8 minutes.",
      "Based on historical patterns and current conditions, I recommend implementing route optimization on the Northern line."
    ];
    return responses[Math.floor(Math.random() * responses.length)];
  };

  const handleQuickQuery = (query: string) => {
    setInputMessage(query);
  };

  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-heading font-bold text-foreground">AI Assistant</h1>
            <p className="text-muted-foreground">Natural language interface for railway operations</p>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="gap-2">
              <div className="w-2 h-2 bg-status-success rounded-full animate-pulse" />
              AI Online
            </Badge>
          </div>
        </div>

        <Separator />

        <div className="grid gap-6 lg:grid-cols-3">
          {/* Chat Interface */}
          <div className="lg:col-span-2">
            <Card className="bg-card border-border h-[600px] flex flex-col">
              <CardHeader className="border-b border-border">
                <CardTitle className="flex items-center gap-2">
                  <MessageSquare className="h-5 w-5" />
                  Chat with AI Assistant
                </CardTitle>
              </CardHeader>
              <CardContent className="flex-1 flex flex-col p-0">
                {/* Chat Messages */}
                <div className="flex-1 overflow-auto p-4 space-y-4">
                  {messages.map((message, index) => (
                    <div key={index} className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                      <div className={`max-w-[80%] rounded-lg p-3 ${
                        message.type === 'user' 
                          ? 'bg-accent text-accent-foreground ml-4' 
                          : 'bg-muted text-muted-foreground mr-4'
                      }`}>
                        <p className="text-sm">{message.message}</p>
                        <p className="text-xs opacity-70 mt-1">{message.time}</p>
                      </div>
                    </div>
                  ))}
                  {isTyping && (
                    <div className="flex justify-start">
                      <div className="bg-muted text-muted-foreground rounded-lg p-3 mr-4">
                        <div className="flex items-center gap-1">
                          <div className="w-2 h-2 bg-current rounded-full animate-bounce"></div>
                          <div className="w-2 h-2 bg-current rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                          <div className="w-2 h-2 bg-current rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Chat Input */}
                <div className="border-t border-border p-4">
                  <div className="flex gap-2">
                    <Input 
                      placeholder="Ask me anything about railway operations..."
                      className="flex-1"
                      value={inputMessage}
                      onChange={(e) => setInputMessage(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                    />
                    <Button size="sm" variant="outline">
                      <Mic className="h-4 w-4" />
                    </Button>
                    <Button size="sm" onClick={handleSendMessage} disabled={!inputMessage.trim()}>
                      <Send className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Quick Actions & Info */}
          <div className="space-y-6">
            {/* Quick Queries */}
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="text-lg">Quick Queries</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {quickQueries.map((query, index) => (
                  <Button 
                    key={index}
                    variant="outline" 
                    size="sm" 
                    className="w-full justify-start text-left h-auto p-3"
                    onClick={() => handleQuickQuery(query)}
                  >
                    <span className="text-xs">{query}</span>
                  </Button>
                ))}
              </CardContent>
            </Card>

            {/* AI Capabilities */}
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="text-lg">AI Capabilities</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-start gap-3">
                  <BarChart3 className="h-5 w-5 text-accent mt-0.5" />
                  <div>
                    <p className="font-medium text-sm">Real-time Analysis</p>
                    <p className="text-xs text-muted-foreground">Instant insights from live data</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <TrendingUp className="h-5 w-5 text-accent mt-0.5" />
                  <div>
                    <p className="font-medium text-sm">Predictive Analytics</p>
                    <p className="text-xs text-muted-foreground">Forecast delays and issues</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <MessageSquare className="h-5 w-5 text-accent mt-0.5" />
                  <div>
                    <p className="font-medium text-sm">Natural Language</p>
                    <p className="text-xs text-muted-foreground">Ask questions in plain English</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Recent Insights */}
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="text-lg">Recent Insights</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="p-3 bg-muted/30 rounded-lg">
                  <div className="flex items-center gap-2 mb-1">
                    <Clock className="h-4 w-4 text-accent" />
                    <span className="font-medium text-sm">Performance Tip</span>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Adjusting departure times by 2-3 minutes could reduce delays by 15%
                  </p>
                </div>
                <div className="p-3 bg-muted/30 rounded-lg">
                  <div className="flex items-center gap-2 mb-1">
                    <TrendingUp className="h-4 w-4 text-accent" />
                    <span className="font-medium text-sm">Efficiency Gain</span>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Northern route optimization saved 12 minutes today
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}