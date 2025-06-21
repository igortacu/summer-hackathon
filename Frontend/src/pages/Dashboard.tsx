
import React, { useEffect, useState } from 'react';
import Layout from '@/components/layout/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { Award, Beaker, BookOpen, Star, TrendingUp, User } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { ScrollArea } from '@/components/ui/scroll-area';
import { ProgressCircle } from '@/components/ui/progress-circle';
import TypedText from '@/components/animations/TypedText';
import gravity from '../data/gravity.png';
import chemistry from '../data/chemistry.png';
import biology from '../data/biology.png';

// Mock data - in a real application, this would come from your backend
const mockUserData = {
  name: "User",
  xp: 250,
  level: 3,
  nextLevelXp: 500,
  completedExperiments: 5,
  totalExperiments: 20,
};

const mockAchievements = [
  {
    id: 1,
    name: "First Steps",
    description: "Complete your first experiment",
    progress: 100,
    achieved: true,
    icon: <Award className="h-8 w-8" />
  },
  {
    id: 2,
    name: "Curious Mind",
    description: "Complete 5 different experiments",
    progress: 100,
    achieved: true,
    icon: <Star className="h-8 w-8" />
  },
  {
    id: 3,
    name: "Persistent Scientist",
    description: "Login for 5 consecutive days",
    progress: 60,
    achieved: false,
    icon: <TrendingUp className="h-8 w-8" />
  },
];

const mockExperiments = [
  {
    id: 1,
    title: "Gravity Simulation",
    description: "Explore how objects fall under different conditions",
    difficulty: "Beginner",
    completed: true,
    image: gravity,
  },
  {
    id: 2,
    title: "Chemical Reactions",
    description: "Mix compounds and observe the reactions",
    difficulty: "Intermediate",
    completed: true,
    image: chemistry,
  },
  {
    id: 3,
    title: "DNA Structure",
    description: "Build and explore the structure of DNA",
    difficulty: "Advanced",
    completed: false,
    image: biology,
  },
];

const Dashboard = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [userData, setUserData] = useState(mockUserData);
  const [achievements, setAchievements] = useState(mockAchievements);
  const [experiments, setExperiments] = useState(mockExperiments);
  const navigate = useNavigate();
  
  useEffect(() => {
    // Simulate loading data
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);
  
  const calculateProgress = (value: number, max: number) => {
    return Math.min(100, Math.round((value / max) * 100));
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8 mt-16">
        {isLoading ? (
          // Loading skeleton
          <div className="space-y-6">
            <div className="h-20 bg-gray-200 animate-pulse rounded-lg"></div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="h-40 bg-gray-200 animate-pulse rounded-lg"></div>
              <div className="h-40 bg-gray-200 animate-pulse rounded-lg"></div>
              <div className="h-40 bg-gray-200 animate-pulse rounded-lg"></div>
            </div>
          </div>
        ) : (
          <>
            {/* Welcome Banner with animated text */}
            <Card className="mb-8 bg-gradient-to-r from-virtlab-blue via-blue-400 to-blue-500 text-white shadow-xl overflow-hidden">
              <CardContent className="p-8 relative">
                <div className="absolute top-0 left-0 w-full h-full opacity-10">
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(255,255,255,0.3),_transparent_60%)]"></div>
                </div>
                <div className="flex flex-col md:flex-row justify-between items-center relative z-10">
                  <div>
                    <h1 className="text-3xl font-bold mb-4">
                      Welcome back, {userData.name}! 🚀
                    </h1>
                    <TypedText 
                      text={[
                        "Ready for your next scientific discovery?",
                        "What will you explore today?",
                        "Let's continue your scientific journey!"
                      ]}
                      className="text-white/90 text-lg font-medium"
                      speed={50}
                      delay={1500}
                      loop={true}
                    />
                  </div>
                  <div className="mt-6 md:mt-0">
                    <Button 
                      variant="outline" 
                      className="text-white border-white hover:bg-white text-virtlab-blue transition-all shadow-md"
                      onClick={() => navigate('/experiments')}
                    >
                      <Beaker className="mr-2 h-4 w-4" /> Start Experimenting
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
              {/* Left Column - Stats & Progress */}
              <div className="space-y-8 lg:col-span-1">
                {/* User Profile Card */}
                <Card className="overflow-hidden transition-all duration-300 hover:shadow-md">
                  <CardHeader className="pb-2 bg-gradient-to-r from-virtlab-blue/10 to-transparent">
                    <CardTitle className="flex items-center">
                      <User className="h-5 w-5 mr-2 text-virtlab-blue" />
                      Your Profile
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-6">
                    <div className="flex items-center space-x-4">
                      <div className="bg-gradient-to-br from-virtlab-blue to-blue-500 rounded-full p-4 text-white shadow-md">
                        <User className="h-8 w-8" />
                      </div>
                      <div>
                        <p className="font-medium text-lg">{userData.name}</p>
                        <Badge className="bg-virtlab-blue/20 text-virtlab-blue font-medium mt-1">
                          Level {userData.level} Explorer
                        </Badge>
                      </div>
                    </div>
                    
                    <div className="mt-6 space-y-3">
                      <div className="flex justify-between text-sm mb-1">
                        <span className="font-medium">XP Progress</span>
                        <span className="text-virtlab-blue font-medium">{userData.xp}/{userData.nextLevelXp} XP</span>
                      </div>
                      <Progress 
                        value={calculateProgress(userData.xp, userData.nextLevelXp)} 
                        className="h-2.5 bg-gray-100" 
                      />
                      <p className="text-xs text-muted-foreground mt-1">
                        {userData.nextLevelXp - userData.xp} XP until Level {userData.level + 1}
                      </p>
                    </div>
                  </CardContent>
                </Card>
                
                {/* Stats Overview */}
                <Card className="transition-all duration-300 hover:shadow-md overflow-hidden">
                  <CardHeader className="pb-2 bg-gradient-to-r from-virtlab-mint/30 to-transparent">
                    <CardTitle className="flex items-center">
                      <TrendingUp className="h-5 w-5 mr-2 text-virtlab-blue" />
                      Your Stats
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-6">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-virtlab-yellow/10 p-4 rounded-lg text-center flex flex-col items-center">
                        <div className="font-bold text-2xl text-virtlab-blue">{mockUserData.completedExperiments}</div>
                        <div className="text-sm text-muted-foreground">Completed</div>
                      </div>
                      <div className="bg-virtlab-mint/10 p-4 rounded-lg text-center flex flex-col items-center">
                        <div className="font-bold text-2xl text-virtlab-blue">{achievements.filter(a => a.achieved).length}</div>
                        <div className="text-sm text-muted-foreground">Achievements</div>
                      </div>
                    </div>
                    
                    <div className="mt-4 pt-4 border-t">
                      <div className="flex justify-between text-sm mb-1">
                        <span className="font-medium">Total Progress</span>
                        <span>{mockUserData.completedExperiments}/{mockUserData.totalExperiments}</span>
                      </div>
                      <Progress 
                        value={calculateProgress(mockUserData.completedExperiments, mockUserData.totalExperiments)} 
                        className="h-2.5 bg-gray-100" 
                      />
                    </div>
                  </CardContent>
                </Card>
                
                {/* Achievements */}
                <Card className="transition-all duration-300 hover:shadow-md overflow-hidden">
                  <CardHeader className="pb-2 bg-gradient-to-r from-virtlab-yellow/30 to-transparent">
                    <CardTitle className="flex items-center">
                      <Award className="h-5 w-5 mr-2 text-virtlab-blue" />
                      Achievements
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-0">
                    <ScrollArea className="h-[300px] pr-4">
                      <div className="space-y-0 divide-y">
                        {achievements.map(achievement => (
                          <div key={achievement.id} className="p-4 hover:bg-gray-50 transition-colors">
                            <div className="flex items-center space-x-3">
                              <div className={`rounded-full p-2 ${achievement.achieved ? 'bg-virtlab-blue text-white' : 'bg-gray-200'}`}>
                                {achievement.icon}
                              </div>
                              <div className="flex-1">
                                <div className="flex items-center">
                                  <h4 className="font-medium">{achievement.name}</h4>
                                  {achievement.achieved && (
                                    <Badge className="ml-2 bg-virtlab-blue/20 text-virtlab-blue">Earned</Badge>
                                  )}
                                </div>
                                <p className="text-xs text-muted-foreground">{achievement.description}</p>
                                {!achievement.achieved && (
                                  <div className="mt-1 flex items-center gap-2">
                                    <Progress value={achievement.progress} className="h-1.5 flex-1 bg-gray-100" />
                                    <span className="text-xs text-muted-foreground">{achievement.progress}%</span>
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                      <div className="p-4">
                        <Button variant="ghost" className="w-full text-virtlab-blue" size="sm" onClick={() => navigate('/achievements')}>
                          View All Achievements
                        </Button>
                      </div>
                    </ScrollArea>
                  </CardContent>
                </Card>
              </div>
              
              {/* Right Column - Content */}
              <div className="lg:col-span-3 space-y-8">
                {/* Main Content Tabs */}
                <Tabs defaultValue="experiments" className="w-full">
                  <TabsList className="grid grid-cols-3 mb-8 p-1">
                    <TabsTrigger value="experiments" className="data-[state=active]:bg-virtlab-blue data-[state=active]:text-white">
                      <Beaker className="h-4 w-4 mr-2" />
                      Experiments
                    </TabsTrigger>
                    <TabsTrigger value="progress" className="data-[state=active]:bg-virtlab-blue data-[state=active]:text-white">
                      <TrendingUp className="h-4 w-4 mr-2" />
                      Your Progress
                    </TabsTrigger>
                    <TabsTrigger value="recommended" className="data-[state=active]:bg-virtlab-blue data-[state=active]:text-white">
                      <Star className="h-4 w-4 mr-2" />
                      Recommended
                    </TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="experiments" className="space-y-6 mt-0">
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="text-xl font-semibold">Available Experiments</h3>
                      <Button variant="outline" size="sm">
                        <BookOpen className="h-4 w-4 mr-2" /> Browse All
                      </Button>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {experiments.map(exp => (
                        <Card key={exp.id} className="overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-lg cursor-pointer group">
                          <div className="relative">
                            <img 
                              src={exp.image} 
                              alt={exp.title}
                              className="w-full h-40 object-cover transition-transform duration-300 group-hover:scale-105"
                            />
                            {exp.completed && (
                              <Badge className="absolute top-2 right-2 bg-green-500">Completed</Badge>
                            )}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                            <Badge className="absolute bottom-2 left-2 bg-virtlab-blue/90">{exp.difficulty}</Badge>
                          </div>
                          <CardContent className="p-4">
                            <h4 className="font-medium mb-1 text-lg">{exp.title}</h4>
                            <p className="text-sm text-muted-foreground mb-3">{exp.description}</p>
                            <Button 
                              className="w-full"
                              variant={exp.completed ? "outline" : "default"}
                            >
                              {exp.completed ? "Review Again" : "Start Experiment"}
                            </Button>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="progress" className="mt-0">
                    <Card className="overflow-hidden">
                      <CardContent className="p-6">
                        <h3 className="text-lg font-semibold mb-6">Your Learning Journey</h3>
                        <div className="space-y-8">
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                            <Card className="bg-gradient-to-br from-blue-50 to-white shadow-sm">
                              <CardContent className="p-4 flex flex-col items-center">
                                <h4 className="text-sm font-medium text-muted-foreground mb-2">Physics</h4>
                                <ProgressCircle value={25} size="lg" className="text-virtlab-blue">
                                  <span className="font-bold">25%</span>
                                </ProgressCircle>
                                <p className="text-xs mt-2 text-center">2 of 8 experiments completed</p>
                              </CardContent>
                            </Card>
                            
                            <Card className="bg-gradient-to-br from-green-50 to-white shadow-sm">
                              <CardContent className="p-4 flex flex-col items-center">
                                <h4 className="text-sm font-medium text-muted-foreground mb-2">Chemistry</h4>
                                <ProgressCircle value={50} size="lg" className="text-virtlab-blue">
                                  <span className="font-bold">50%</span>
                                </ProgressCircle>
                                <p className="text-xs mt-2 text-center">3 of 6 experiments completed</p>
                              </CardContent>
                            </Card>
                            
                            <Card className="bg-gradient-to-br from-yellow-50 to-white shadow-sm">
                              <CardContent className="p-4 flex flex-col items-center">
                                <h4 className="text-sm font-medium text-muted-foreground mb-2">Biology</h4>
                                <ProgressCircle value={0} size="lg" className="text-virtlab-blue">
                                  <span className="font-bold">0%</span>
                                </ProgressCircle>
                                <p className="text-xs mt-2 text-center">0 of 6 experiments completed</p>
                              </CardContent>
                            </Card>
                          </div>
                          
                          <div className="pt-4 border-t">
                            <h4 className="font-medium mb-4 text-lg">Recently Completed</h4>
                            <ul className="space-y-3">
                              <li className="flex items-center p-3 rounded-lg border hover:bg-gray-50 transition-colors">
                                <div className="h-2.5 w-2.5 rounded-full bg-green-500 mr-3"></div>
                                <div className="flex-1">
                                  <span className="font-medium">Gravity Simulation</span>
                                  <p className="text-xs text-muted-foreground">Completed with 95% accuracy</p>
                                </div>
                                <span className="text-xs text-muted-foreground bg-gray-100 px-2 py-1 rounded">2 days ago</span>
                              </li>
                              <li className="flex items-center p-3 rounded-lg border hover:bg-gray-50 transition-colors">
                                <div className="h-2.5 w-2.5 rounded-full bg-green-500 mr-3"></div>
                                <div className="flex-1">
                                  <span className="font-medium">Chemical Reactions</span>
                                  <p className="text-xs text-muted-foreground">Completed with 87% accuracy</p>
                                </div>
                                <span className="text-xs text-muted-foreground bg-gray-100 px-2 py-1 rounded">5 days ago</span>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>
                  
                  <TabsContent value="recommended" className="mt-0">
                    <Card className="overflow-hidden">
                      <CardContent className="p-6">
                        <div className="flex items-center justify-between mb-6">
                          <div>
                            <h3 className="text-xl font-semibold">Recommended For You</h3>
                            <p className="text-muted-foreground text-sm">Based on your progress and interests</p>
                          </div>
                          <Badge className="bg-virtlab-blue">Personalized</Badge>
                        </div>
                        
                        <div className="space-y-4">
                          <div className="flex items-start space-x-4 p-4 rounded-lg border hover:bg-gray-50 transition-colors">
                            <div className="bg-gradient-to-br from-virtlab-blue to-blue-500 rounded p-3 text-white shadow-sm">
                              <Beaker className="h-6 w-6" />
                            </div>
                            <div className="flex-1">
                              <h4 className="font-medium text-lg">Quantum Mechanics Basics</h4>
                              <p className="text-sm text-muted-foreground mb-3">Explore the strange world of quantum physics</p>
                              <div className="flex items-center space-x-2">
                                <Badge variant="outline">Physics</Badge>
                                <Badge variant="outline">Advanced</Badge>
                                <Badge className="bg-yellow-500/20 text-yellow-700 hover:bg-yellow-500/30">+25 XP</Badge>
                              </div>
                              <Button size="sm" className="mt-3">View Experiment</Button>
                            </div>
                          </div>
                          
                          <div className="flex items-start space-x-4 p-4 rounded-lg border hover:bg-gray-50 transition-colors">
                            <div className="bg-gradient-to-br from-virtlab-mint to-green-300 rounded p-3 text-white shadow-sm">
                              <Beaker className="h-6 w-6" />
                            </div>
                            <div className="flex-1">
                              <h4 className="font-medium text-lg">Sound Wave Properties</h4>
                              <p className="text-sm text-muted-foreground mb-3">Understand how sound travels through different mediums</p>
                              <div className="flex items-center space-x-2">
                                <Badge variant="outline">Physics</Badge>
                                <Badge variant="outline">Beginner</Badge>
                                <Badge className="bg-yellow-500/20 text-yellow-700 hover:bg-yellow-500/30">+15 XP</Badge>
                              </div>
                              <Button size="sm" className="mt-3">View Experiment</Button>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>
                </Tabs>
              </div>
            </div>
          </>
        )}
      </div>
    </Layout>
  );
};

export default Dashboard;
