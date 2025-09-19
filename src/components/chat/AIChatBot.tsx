import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { Send, MessageSquare, Bot, User, Mic } from "lucide-react";

interface Message {
  id: string;
  content: string;
  sender: "user" | "ai";
  timestamp: Date;
  type?: "text" | "query" | "alert";
}

export function AIChatBot() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content: "Hello! I'm your RailFlow AI assistant. I can help you with train operations, schedules, alerts, and system analytics. What would you like to know?",
      sender: "ai",
      timestamp: new Date(),
      type: "text"
    }
  ]);
  
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const quickQueries = [
    "Show me current delays",
    "Train RT-4401 status",
    "Network efficiency report",
    "Active alerts summary"
  ];

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputValue,
      sender: "user",
      timestamp: new Date(),
      type: "query"
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue("");
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        content: generateAIResponse(inputValue),
        sender: "ai", 
        timestamp: new Date(),
        type: "text"
      };
      
      setMessages(prev => [...prev, aiResponse]);
      setIsTyping(false);
    }, 1500);
  };

  const generateAIResponse = (query: string): string => {
    const lowerQuery = query.toLowerCase();
    
    if (lowerQuery.includes("delay")) {
      return "Currently, there are 3 trains with delays: RT-4402 (+12 min), RT-4407 (+8 min), RT-4412 (+5 min). The delays are primarily due to track maintenance on Sector 7. Would you like detailed information about any specific train?";
    }
    
    if (lowerQuery.includes("rt-4401")) {
      return "Train RT-4401 is currently operating on schedule. Speed: 85 km/h, Location: Junction B-7, Next station: Central Hub (ETA: 14:23). All systems nominal.";
    }
    
    if (lowerQuery.includes("efficiency")) {
      return "Current network efficiency is 97.2% (+0.8% from yesterday). 94% of trains are on schedule. Average delay time: 3.2 minutes. Peak efficiency sectors: A1-A5 (99.1%). Areas for improvement: Sector 7 (track maintenance).";
    }
    
    if (lowerQuery.includes("alert")) {
      return "Active alerts: 1) Track maintenance on Sector 7 (Priority: Medium), 2) Signal check required at Junction C-3 (Priority: Low). All critical systems operational. No collision risks detected.";
    }
    
    return "I understand you're asking about railway operations. Could you be more specific? I can help with train status, delays, scheduling, alerts, or system analytics.";
  };

  const handleQuickQuery = (query: string) => {
    setInputValue(query);
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', { 
      hour12: false, 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  return (
    <Card className="flex flex-col h-[600px] border-border bg-card">
      <CardHeader className="border-b border-border">
        <CardTitle className="flex items-center gap-2 font-heading">
          <Bot className="h-5 w-5 text-success" />
          AI Assistant
          <Badge variant="outline" className="ml-auto text-xs">
            <div className="status-indicator online mr-1" />
            Online
          </Badge>
        </CardTitle>
      </CardHeader>

      <CardContent className="flex-1 flex flex-col p-0">
        <ScrollArea className="flex-1 p-4">
          <div className="space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex gap-3 ${
                  message.sender === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`flex gap-2 max-w-[80%] ${
                    message.sender === "user" ? "flex-row-reverse" : "flex-row"
                  }`}
                >
                  <div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${
                    message.sender === "user" 
                      ? "bg-primary text-primary-foreground" 
                      : "bg-success text-success-foreground"
                  }`}>
                    {message.sender === "user" ? (
                      <User className="h-4 w-4" />
                    ) : (
                      <Bot className="h-4 w-4" />
                    )}
                  </div>
                  
                  <div className={`rounded-lg px-3 py-2 ${
                    message.sender === "user"
                      ? "bg-primary text-primary-foreground"
                      : "bg-secondary text-secondary-foreground"
                  }`}>
                    <p className="text-sm">{message.content}</p>
                    <p className="text-xs opacity-70 mt-1">
                      {formatTime(message.timestamp)}
                    </p>
                  </div>
                </div>
              </div>
            ))}
            
            {isTyping && (
              <div className="flex gap-3 justify-start">
                <div className="flex gap-2">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-success text-success-foreground">
                    <Bot className="h-4 w-4" />
                  </div>
                  <div className="rounded-lg px-3 py-2 bg-secondary text-secondary-foreground">
                    <div className="flex items-center gap-1">
                      <div className="flex gap-1">
                        <div className="h-2 w-2 rounded-full bg-muted-foreground animate-bounce" />
                        <div className="h-2 w-2 rounded-full bg-muted-foreground animate-bounce" style={{ animationDelay: "0.1s" }} />
                        <div className="h-2 w-2 rounded-full bg-muted-foreground animate-bounce" style={{ animationDelay: "0.2s" }} />
                      </div>
                      <span className="text-xs text-muted-foreground ml-2">AI is typing...</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </ScrollArea>

        <div className="border-t border-border p-4 space-y-3">
          <div className="flex flex-wrap gap-2">
            {quickQueries.map((query, index) => (
              <Button
                key={index}
                variant="outline"
                size="sm"
                className="text-xs"
                onClick={() => handleQuickQuery(query)}
              >
                {query}
              </Button>
            ))}
          </div>
          
          <div className="flex gap-2">
            <Input
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Ask about train operations, schedules, alerts..."
              onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
              className="flex-1"
            />
            <Button variant="ghost" size="sm" className="h-10 w-10 p-0">
              <Mic className="h-4 w-4" />
            </Button>
            <Button 
              onClick={handleSendMessage}
              size="sm"
              className="h-10 w-10 p-0"
              disabled={!inputValue.trim() || isTyping}
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}