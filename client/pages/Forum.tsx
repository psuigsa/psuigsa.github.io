import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Navigation from "@/components/Navigation";
import { 
  MessageCircle, 
  Users, 
  Bot, 
  User, 
  Send, 
  X, 
  Search,
  Filter,
  Plus,
  Pin,
  BookOpen,
  HelpCircle,
  Briefcase,
  Home,
  Heart,
  Reply,
  Clock
} from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface ChatMessage {
  id: string;
  text: string;
  sender: "user" | "bot";
  timestamp: Date;
}

export default function Forum() {
  const [showAIChat, setShowAIChat] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "1",
      text: "Hi! I'm the IGSA AI assistant. I am still being developed, I will do my best to help you with any questions you have about IGSA, events, housing, or student life!",
      sender: "bot",
      timestamp: new Date()
    }
  ]);
  const [inputText, setInputText] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [showNewPost, setShowNewPost] = useState(false);

  // Simple AI response generator
  const generateAIResponse = (query: string): string => {
    const queryLower = query.toLowerCase();
    
    if (queryLower.includes('event') || queryLower.includes('when')) {
      return "IGSA hosts monthly social events and quarterly academic workshops. Check our Events page for the latest schedule. We announce events 2 weeks in advance via newsletter and social media. You can also join our community discussions to stay updated!";
    }
    
    if (queryLower.includes('housing') || queryLower.includes('apartment') || queryLower.includes('live')) {
      return "For housing, popular options include Beaver Hill graduate housing, private apartments near campus, and shared housing. Start your search 3-4 months before arrival. Check our Living in State College guide under Resources for detailed recommendations and tips from other students.";
    }
    
    if (queryLower.includes('visa') || queryLower.includes('immigration')) {
      return "For visa and immigration questions, check our Pre-Arrival resources which include visa guidelines and essential documents. The International Student Services office at Penn State is also a great resource for official guidance.";
    }
    
    if (queryLower.includes('job') || queryLower.includes('work') || queryLower.includes('employment')) {
      return "International students can work on-campus and may be eligible for CPT/OPT. Check our Academic Resources section and consult with International Student Services for work authorization details.";
    }
    
    if (queryLower.includes('bank') || queryLower.includes('ssn') || queryLower.includes('social security')) {
      return "For banking and SSN applications, check our Post-Arrival guide. You'll typically need to wait for your SSN before opening most bank accounts. Some banks offer accounts for international students without SSN initially.";
    }
    
    if (queryLower.includes('health') || queryLower.includes('insurance') || queryLower.includes('medical')) {
      return "Penn State requires all students to have health insurance. Check our Post-Arrival resources for health insurance information and local healthcare providers in State College.";
    }
    
    if (queryLower.includes('transport') || queryLower.includes('bus') || queryLower.includes('car')) {
      return "State College has CATA bus system for public transportation. Many students also use bikes or cars. Check our Living in State College guide for transportation tips and options.";
    }
    
    if (queryLower.includes('food') || queryLower.includes('grocery') || queryLower.includes('restaurant')) {
      return "State College has diverse dining options and several grocery stores. Check our Living in State College guide for restaurant recommendations and grocery shopping tips for international students.";
    }
    
    if (queryLower.includes('involve') || queryLower.includes('volunteer') || queryLower.includes('committee')) {
      return "There are many ways to get involved with IGSA! You can join committees, volunteer for events, attend monthly meetings, or run for executive positions. Visit our About section or contact our VP of Internal Affairs for current opportunities.";
    }
    
    return "That's a great question! For detailed information, I recommend checking our Resources section which has comprehensive guides for pre-arrival, post-arrival, and living in State College. You can also explore our Events page to see upcoming activities and networking opportunities.";
  };

  const handleSendMessage = () => {
    if (!inputText.trim()) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      text: inputText,
      sender: "user",
      timestamp: new Date()
    };

    const response = generateAIResponse(inputText);
    const botMessage: ChatMessage = {
      id: (Date.now() + 1).toString(),
      text: response,
      sender: "bot",
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage, botMessage]);
    setInputText("");
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const categories = [
    { name: "All", count: 24, icon: MessageCircle, color: "bg-gray-100 text-gray-700" },
    { name: "Academic", count: 8, icon: BookOpen, color: "bg-igsa-blue/10 text-igsa-blue" },
    { name: "Housing", count: 6, icon: Home, color: "bg-igsa-green/10 text-igsa-green" },
    { name: "Jobs", count: 4, icon: Briefcase, color: "bg-igsa-saffron/10 text-igsa-saffron" },
    { name: "General", count: 6, icon: HelpCircle, color: "bg-igsa-orange/10 text-igsa-orange" }
  ];

  const forumPosts = [
    {
      id: 1,
      title: "Best places for grocery shopping near campus?",
      content: "I'm a new graduate student and looking for recommendations on where to shop for groceries, especially Indian ingredients. Any suggestions?",
      author: "Priya S.",
      category: "General",
      replies: 12,
      likes: 8,
      timeAgo: "2 hours ago",
      isPinned: false,
      tags: ["grocery", "food", "campus"]
    },
    {
      id: 2,
      title: "TA positions in Computer Science department",
      content: "Has anyone heard about TA openings for Spring 2025? I'm particularly interested in undergraduate courses.",
      author: "Rahul M.",
      category: "Academic",
      replies: 5,
      likes: 15,
      timeAgo: "4 hours ago",
      isPinned: true,
      tags: ["TA", "computer-science", "spring-2025"]
    },
    {
      id: 3,
      title: "Roommate wanted for Spring semester",
      content: "Looking for a graduate student roommate to share a 2BR apartment in Vairo Village. Rent is $750/month. DM if interested!",
      author: "Ankit P.",
      category: "Housing",
      replies: 3,
      likes: 6,
      timeAgo: "6 hours ago",
      isPinned: false,
      tags: ["roommate", "vairo-village", "spring"]
    },
    {
      id: 4,
      title: "Summer internship experiences at tech companies",
      content: "Can we share our summer internship experiences? I'm particularly curious about the application process and interview tips.",
      author: "Meera K.",
      category: "Jobs",
      replies: 18,
      likes: 25,
      timeAgo: "1 day ago",
      isPinned: true,
      tags: ["internship", "tech", "career"]
    },
    {
      id: 5,
      title: "Diwali celebration planning - volunteers needed!",
      content: "We're organizing this year's Diwali celebration and need volunteers for various committees. Please comment if you're interested!",
      author: "IGSA Cultural Team",
      category: "General",
      replies: 22,
      likes: 34,
      timeAgo: "2 days ago",
      isPinned: true,
      tags: ["diwali", "volunteer", "cultural"]
    },
    {
      id: 6,
      title: "Research collaboration opportunities",
      content: "I'm working on machine learning applications in healthcare. Looking for collaborators from related fields.",
      author: "Suresh V.",
      category: "Academic",
      replies: 7,
      likes: 12,
      timeAgo: "3 days ago",
      isPinned: false,
      tags: ["research", "ML", "healthcare"]
    }
  ];

  const filteredPosts = forumPosts.filter(post => {
    const matchesCategory = selectedCategory === "All" || post.category === selectedCategory;
    const matchesSearch = searchTerm === "" || 
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const getCategoryColor = (categoryName: string) => {
    switch(categoryName) {
      case "Academic": return "text-igsa-blue";
      case "Housing": return "text-igsa-green";
      case "Jobs": return "text-igsa-saffron";
      case "General": return "text-igsa-orange";
      default: return "text-gray-600";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-24 pb-16 bg-gradient-to-r from-igsa-blue/10 to-igsa-green/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Community <span className="text-igsa-blue">Forum</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              Connect, discuss, and share experiences with fellow Indian graduate students
            </p>
            <div className="flex justify-center">
              <Button
                onClick={() => setShowAIChat(true)}
                className="bg-gradient-to-r from-igsa-saffron to-igsa-orange hover:shadow-lg text-lg px-8 py-4 rounded-full"
              >
                <Bot className="w-5 h-5 mr-2" />
                Chat with AI Assistant
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Quick AI Preview */}
      <section className="py-8 bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-r from-igsa-blue/5 to-igsa-green/5 rounded-xl p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-igsa-saffron rounded-full flex items-center justify-center">
                  <Bot className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">IGSA AI Assistant</h3>
                  <p className="text-gray-600">Get instant answers about housing, events, resources, and student life</p>
                </div>
              </div>
              <Button
                onClick={() => setShowAIChat(true)}
                className="bg-igsa-blue hover:bg-igsa-blue/90"
              >
                Start Chat
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Community Stats */}
      <section className="py-16 bg-gradient-to-r from-igsa-blue/5 to-igsa-green/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Community Activity</h2>
            <p className="text-xl text-gray-600">Building connections through meaningful discussions</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="bg-white rounded-lg p-6 shadow-md">
                <Users className="w-8 h-8 text-igsa-blue mx-auto mb-2" />
                <div className="text-2xl font-bold text-gray-900">1,250+</div>
                <div className="text-gray-600">Active Members</div>
              </div>
            </div>
            <div className="text-center">
              <div className="bg-white rounded-lg p-6 shadow-md">
                <MessageCircle className="w-8 h-8 text-igsa-green mx-auto mb-2" />
                <div className="text-2xl font-bold text-gray-900">850+</div>
                <div className="text-gray-600">Discussions</div>
              </div>
            </div>
            <div className="text-center">
              <div className="bg-white rounded-lg p-6 shadow-md">
                <Reply className="w-8 h-8 text-igsa-saffron mx-auto mb-2" />
                <div className="text-2xl font-bold text-gray-900">3,200+</div>
                <div className="text-gray-600">Replies</div>
              </div>
            </div>
            <div className="text-center">
              <div className="bg-white rounded-lg p-6 shadow-md">
                <Heart className="w-8 h-8 text-igsa-orange mx-auto mb-2" />
                <div className="text-2xl font-bold text-gray-900">5,100+</div>
                <div className="text-gray-600">Helpful Reactions</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Floating AI Chat Button */}
      <Button
        onClick={() => setShowAIChat(true)}
        className="fixed bottom-6 right-6 rounded-full h-14 w-14 shadow-lg bg-igsa-saffron hover:bg-igsa-orange z-50"
        size="icon"
      >
        <Bot className="h-6 w-6 text-white" />
      </Button>

      {/* AI Chat Modal */}
      <Dialog open={showAIChat} onOpenChange={setShowAIChat}>
        <DialogContent className="max-w-2xl max-h-[80vh] flex flex-col">
          <DialogHeader>
            <DialogTitle className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-igsa-saffron rounded-full flex items-center justify-center">
                <Bot className="w-4 h-4 text-white" />
              </div>
              <span>IGSA AI Assistant</span>
            </DialogTitle>
          </DialogHeader>
          
          <div className="flex-1 overflow-y-auto p-4 space-y-4 min-h-[400px] max-h-[500px] border rounded-lg bg-gray-50">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex items-start gap-3 ${
                  message.sender === 'user' ? 'flex-row-reverse' : 'flex-row'
                }`}
              >
                <div className={`rounded-full p-2 ${
                  message.sender === 'user' 
                    ? 'bg-igsa-blue' 
                    : 'bg-igsa-saffron'
                }`}>
                  {message.sender === 'user' ? (
                    <User className="h-4 w-4 text-white" />
                  ) : (
                    <Bot className="h-4 w-4 text-white" />
                  )}
                </div>
                <div className={`max-w-[75%] rounded-lg p-3 ${
                  message.sender === 'user'
                    ? 'bg-igsa-blue text-white ml-auto'
                    : 'bg-white border shadow-sm'
                }`}>
                  <p className="text-sm whitespace-pre-wrap">{message.text}</p>
                  <p className={`text-xs mt-1 ${
                    message.sender === 'user' ? 'text-blue-100' : 'text-gray-500'
                  }`}>
                    {message.timestamp.toLocaleTimeString([], { 
                      hour: '2-digit', 
                      minute: '2-digit' 
                    })}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="border-t pt-4">
            <div className="flex gap-2">
              <Input
                placeholder="Ask me anything about IGSA, events, housing, or student life..."
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyPress={handleKeyPress}
                className="flex-1"
              />
              <Button 
                onClick={handleSendMessage}
                disabled={!inputText.trim()}
                className="bg-igsa-saffron hover:bg-igsa-orange"
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
            <p className="text-xs text-gray-500 mt-2">
              Press Enter to send, Shift+Enter for new line
            </p>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}