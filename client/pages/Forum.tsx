import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Navigation from "@/components/Navigation";
import { MessageCircle, Users, Sparkles, Bot, User, Send, X } from 'lucide-react';
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
  relatedTopics?: string[];
}

export default function Forum() {
  const [activeTab, setActiveTab] = useState<'discussions' | 'ai'>('discussions');
  const [showAIChat, setShowAIChat] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "1",
      text: "Hi! I'm the IGSA AI assistant. I can help you with questions about events, housing, resources, and more. What would you like to know?",
      sender: "bot",
      timestamp: new Date()
    }
  ]);
  const [inputText, setInputText] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [showNewPost, setShowNewPost] = useState(false);
  const giscusRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (activeTab === 'discussions' && giscusRef.current) {
      // Clear any existing content
      giscusRef.current.innerHTML = '';
      
      // Load Giscus
      const script = document.createElement('script');
      script.src = 'https://giscus.app/client.js';
      script.setAttribute('data-repo', 'psuigsa/psuigsa.github.io');
      script.setAttribute('data-repo-id', 'R_kgDONLqKkA'); // You'll need to get this from giscus.app
      script.setAttribute('data-category', 'Q&A');
      script.setAttribute('data-category-id', 'DIC_kwDONLqKkM4CkqS0'); // You'll need to get this from giscus.app
      script.setAttribute('data-mapping', 'title');
      script.setAttribute('data-strict', '0');
      script.setAttribute('data-reactions-enabled', '1');
      script.setAttribute('data-emit-metadata', '0');
      script.setAttribute('data-input-position', 'top');
      script.setAttribute('data-theme', 'preferred_color_scheme');
      script.setAttribute('data-lang', 'en');
      script.setAttribute('crossorigin', 'anonymous');
      script.async = true;

      giscusRef.current.appendChild(script);
    }
  }, [activeTab]);

  // Simple AI response generator (completely free)
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
      return "There are many ways to get involved with IGSA! You can join committees, volunteer for events, attend monthly meetings, or run for executive positions. Visit our Get Involved section or contact our VP of Internal Affairs for current opportunities.";
    }
    
    return "That's a great question! For detailed information, I recommend checking our Resources section which has comprehensive guides for pre-arrival, post-arrival, and living in State College. You can also post this question in our community discussions where other students and IGSA members can share their experiences and advice.";
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

  const getCategoryIcon = (categoryName: string) => {
    const category = categories.find(cat => cat.name === categoryName);
    return category ? category.icon : MessageCircle;
  };

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
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Connect, discuss, and share experiences with fellow Indian graduate students
            </p>
          </div>
        </div>
      </section>

      {/* Search and Actions */}
      <section className="py-8 bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="flex-1 max-w-md">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search discussions..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-igsa-blue focus:border-transparent"
                />
              </div>
            </div>
            <div className="flex gap-3">
              <button className="flex items-center px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50">
                <Filter className="w-4 h-4 mr-2" />
                Filter
              </button>
              <button 
                onClick={() => setShowNewPost(true)}
                className="flex items-center px-6 py-2 bg-gradient-to-r from-igsa-saffron to-igsa-orange text-white rounded-lg hover:shadow-lg transition-shadow"
              >
                <Plus className="w-4 h-4 mr-2" />
                New Post
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-6 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap gap-3 justify-center">
            {categories.map((category, index) => {
              const IconComponent = category.icon;
              return (
                <button
                  key={index}
                  onClick={() => setSelectedCategory(category.name)}
                  className={`flex items-center px-4 py-2 rounded-full font-medium transition-all ${
                    selectedCategory === category.name 
                      ? category.color 
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
                >
                  <IconComponent className="w-4 h-4 mr-2" />
                  {category.name} ({category.count})
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Forum Posts */}
      <section className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-4">
            {filteredPosts.map((post) => {
              const CategoryIcon = getCategoryIcon(post.category);
              return (
                <div key={post.id} className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow p-6">
                  <div className="flex items-start space-x-4">
                    {/* Post Icon */}
                    <div className={`p-2 rounded-lg bg-gray-100 flex-shrink-0 ${post.isPinned ? 'bg-igsa-saffron/10' : ''}`}>
                      {post.isPinned ? (
                        <Pin className="w-5 h-5 text-igsa-saffron" />
                      ) : (
                        <CategoryIcon className={`w-5 h-5 ${getCategoryColor(post.category)}`} />
                      )}
                    </div>

                    {/* Post Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center space-x-2 mb-2">
                        {post.isPinned && (
                          <span className="bg-igsa-saffron/10 text-igsa-saffron px-2 py-1 rounded text-xs font-medium">
                            Pinned
                          </span>
                        )}
                        <span className={`px-2 py-1 rounded text-xs font-medium ${getCategoryColor(post.category)} bg-current bg-opacity-10`}>
                          {post.category}
                        </span>
                      </div>

                      <h3 className="text-lg font-semibold text-gray-900 mb-2 hover:text-igsa-blue cursor-pointer">
                        {post.title}
                      </h3>

                      <p className="text-gray-600 mb-3 line-clamp-2">
                        {post.content}
                      </p>

                      {/* Tags */}
                      <div className="flex flex-wrap gap-2 mb-3">
                        {post.tags.map((tag, tagIndex) => (
                          <span key={tagIndex} className="bg-gray-100 text-gray-600 px-2 py-1 rounded text-xs">
                            #{tag}
                          </span>
                        ))}
                      </div>

                      {/* Post Meta */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4 text-sm text-gray-500">
                          <span className="font-medium">{post.author}</span>
                          <div className="flex items-center">
                            <Clock className="w-4 h-4 mr-1" />
                            {post.timeAgo}
                          </div>
                        </div>

                        <div className="flex items-center space-x-4 text-sm text-gray-500">
                          <button className="flex items-center hover:text-igsa-saffron transition-colors">
                            <Heart className="w-4 h-4 mr-1" />
                            {post.likes}
                          </button>
                          <button className="flex items-center hover:text-igsa-blue transition-colors">
                            <Reply className="w-4 h-4 mr-1" />
                            {post.replies}
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {filteredPosts.length === 0 && (
            <div className="text-center py-12">
              <MessageSquare className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No posts found</h3>
              <p className="text-gray-600">Try adjusting your search or category filter.</p>
            </div>
          )}
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
                <MessageSquare className="w-8 h-8 text-igsa-green mx-auto mb-2" />
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

      {/* New Post Modal */}
      <Dialog open={showNewPost} onOpenChange={setShowNewPost}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Create New Post</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
              <select className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-igsa-blue">
                <option>Select a category</option>
                <option>Academic</option>
                <option>Housing</option>
                <option>Jobs</option>
                <option>General</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
              <input
                type="text"
                placeholder="Enter your post title..."
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-igsa-blue"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Content</label>
              <textarea
                rows={6}
                placeholder="Share your thoughts, questions, or information..."
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-igsa-blue"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Tags</label>
              <input
                type="text"
                placeholder="Add tags separated by commas..."
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-igsa-blue"
              />
            </div>
            <div className="flex justify-end gap-3 pt-4">
              <button
                onClick={() => setShowNewPost(false)}
                className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                Cancel
              </button>
              <button className="px-6 py-2 bg-gradient-to-r from-igsa-saffron to-igsa-orange text-white rounded-lg hover:shadow-lg">
                Post Discussion
              </button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Floating AI Chat Button (always visible) */}
      <Button
        onClick={() => setShowAIChat(true)}
        className="fixed bottom-6 right-6 rounded-full h-14 w-14 shadow-lg bg-igsa-saffron hover:bg-igsa-orange"
        size="icon"
      >
        <MessageCircle className="h-6 w-6" />
      </Button>

      {/* Floating AI Chat Window */}
      {showAIChat && (
        <div className="fixed bottom-20 right-6 w-80 h-96 bg-white border rounded-lg shadow-xl flex flex-col z-50">
          <div className="p-4 border-b bg-igsa-blue text-white rounded-t-lg flex justify-between items-center">
            <h3 className="font-semibold">Quick AI Help</h3>
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => setShowAIChat(false)}
              className="text-white hover:bg-white/20"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
          
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            <div className="flex items-start gap-2">
              <div className="rounded-full p-1 bg-igsa-saffron">
                <Bot className="h-3 w-3 text-white" />
              </div>
              <div className="bg-gray-100 rounded-lg p-2 text-sm">
                Hi! Ask me anything about IGSA, events, housing, or student life!
              </div>
            </div>
          </div>

          <div className="p-3 border-t">
            <div className="flex gap-2">
              <Input
                placeholder="Quick question..."
                className="flex-1 text-sm"
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    // Switch to main AI tab and close floating chat
                    setActiveTab('ai');
                    setShowAIChat(false);
                  }
                }}
              />
              <Button 
                size="sm" 
                className="bg-igsa-blue hover:bg-igsa-blue/90"
                onClick={() => {
                  setActiveTab('ai');
                  setShowAIChat(false);
                }}
              >
                <Send className="h-3 w-3" />
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}