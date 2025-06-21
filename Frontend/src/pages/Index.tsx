
import React, { useEffect, useState } from 'react';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import AtomAnimation from '@/components/animations/AtomAnimation';
import heroVideo from '../data/cody.mp4';
import FeatureCard from '@/components/ui/feature-card';
import AchievementBadge from '@/components/gamification/Badge';
import TypedText from '@/components/animations/TypedText';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import scienceIcon from '../data/find_expr.jpg';
import conduct from '../data/conduct.jpg';
import progress from '../data/progress.jpg';
import bostan from '../data/bostan.jpg';
import Chatbot from '@/components/ui/Chatbot';
import '../i18n';


const Index = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  
  useEffect(() => {
    // Simulate loading delay for animations
    setTimeout(() => {
      setIsLoaded(true);
    }, 300);
  }, []);
  
  const features = [
    {
      title: "Interactive 3D Models",
      description: "Manipulate molecular structures, explore anatomical specimens, and visualize physical concepts in real-time 3D.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10" />
          <path d="M16.2 7.8C14.4 9.6 12 12 12 12s2.4 2.4 4.2 4.2" />
          <path d="M7.8 7.8C9.6 9.6 12 12 12 12s-2.4 2.4-4.2 4.2" />
          <path d="M12 3v18" />
          <path d="M3 12h18" />
        </svg>
      )
    },
    {
      title: "Real-Time Experiments",
      description: "Conduct physics, chemistry, and biology experiments with accurate simulations and measurable results.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M10 2v8L4.72 20.55a1 1 0 0 0 .9 1.45h12.76a1 1 0 0 0 .9-1.45L14 10V2" />
          <path d="M8.5 2h7" />
          <path d="M7 16h10" />
        </svg>
      )
    },
    {
      title: "Progress Tracking",
      description: "Track learning progress with detailed analytics, achievements, and personalized feedback.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 20V10" />
          <path d="M18 20V4" />
          <path d="M6 20v-6" />
        </svg>
      )
    },
  ];
  
  const achievementBadges = [
    {
      name: "Atomic Pioneer",
      description: "Complete your first physics experiment",
      icon: <Badge className="h-8 w-8" />,
      progress: 0,
      maxProgress: 1,
      achieved: false
    },
    {
      name: "Chemical Mastermind",
      description: "Mix 5 chemical compounds successfully",
      icon: <Badge className="h-8 w-8" />,
      progress: 2,
      maxProgress: 5,
      achieved: false
    },
    {
      name: "Biology Explorer",
      description: "Identify all cell structures",
      icon: <Badge className="h-8 w-8" />,
      progress: 8,
      maxProgress: 8,
      achieved: true
    },
  ];
  
  const faqs = [
    {
      question: "How does VirtLab compare to physical labs?",
      answer: "VirtLab provides safe, cost-effective access to experiments that might be dangerous or impractical in physical settings. Our simulations are scientifically accurate and aligned with educational standards, allowing students to explore concepts without the limitations of physical resources."
    },
    {
      question: "Can teachers track student progress?",
      answer: "Yes! Teachers have access to a comprehensive dashboard showing student engagement, completion rates, quiz results, and more. You can assign specific experiments to students and receive detailed analytics on their performance."
    },
    {
      question: "Is VirtLab compatible with my school's curriculum?",
      answer: "VirtLab is designed to align with national science education standards and can complement various curricula. We offer customization options for schools to align our experiments with their specific educational frameworks."
    },
    {
      question: "What technology do I need to run VirtLab?",
      answer: "VirtLab runs in any modern web browser (Chrome, Firefox, Safari, Edge) without requiring any installation. It works on desktops, laptops, tablets, and even smartphones, though a larger screen provides a better experience for detailed experiments."
    },
  ];

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 md:pt-40 md:pb-32 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-br from-white to-virtlab-yellow/10" />
          <div className="absolute top-20 left-10 w-64 h-64 rounded-full bg-virtlab-blue/5 blur-3xl" />
          <div className="absolute bottom-10 right-10 w-80 h-80 rounded-full bg-virtlab-mint/10 blur-3xl" />
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="flex flex-col md:flex-row items-center">
            <div className="flex-1 text-center md:text-left mb-10 md:mb-0">
              <div className={`transition-all duration-1000 ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}>
                <Badge variant="outline" className="mb-4 py-1.5 px-4 text-sm font-medium">
                  Welcome to the Future of Science Education
                </Badge>
              </div>
              
              <h1 className={`text-4xl md:text-5xl lg:text-6xl font-bold mb-4 transition-all duration-1000 delay-100 ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}>
                <span className="gradient-text">Virtual Tools, Real Knowledge</span>
                <br />
                <TypedText 
                  text={["Experiment. Play. Master.", "Discover. Create. Learn.", "Observe. Analyze. Understand."]} 
                  className="text-3xl md:text-4xl mt-2"
                  speed={70}
                  delay={1500}
                  loop={true}
                />
              </h1>
              
              <p className={`text-lg text-muted-foreground mb-8 transition-all duration-1000 delay-200 ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}>
                Experience hands-on virtual science labs that make learning <br className="hidden md:block" />
                interactive, engaging, and accessible to everyone.
              </p>
              
              <div className={`flex flex-col sm:flex-row gap-4 justify-center md:justify-start transition-all duration-1000 delay-300 ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}>
                <Button size="lg" className="relative overflow-hidden group">
                  <span className="absolute inset-0 bg-gradient-to-r from-virtlab-blue to-blue-500 animate-gradient-x"></span>
                  <span className="relative z-10">Launch Your First Experiment</span>
                </Button>
                
                <Button variant="outline" size="lg" className="magnetic-button">
                  Watch Demo
                </Button>
              </div>
            </div>
            
            <div className="flex-1">
              <video
                src={heroVideo}
                autoPlay
                loop
                muted
                playsInline
                disablePictureInPicture
                disableRemotePlayback
                controls={false}
                controlsList="nodownload nofullscreen noremoteplayback"
                className={`${isLoaded ? 'translate-y-0 opacity-100 rotate-0' : 'translate-y-8 opacity-0 rotate-6'} transition-all duration-1000 delay-500 w-full`}
              />
            </div>

          </div>
        </div>
      </section>
      
      {/* About Section */}
      <section className="py-20 bg-gradient-to-b from-white to-virtlab-mint/10">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <Badge variant="outline" className="mb-4">Our Mission</Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              At VirtLab, we believe science should be 
              <span className="gradient-text"> seen, touched, understood</span>
            </h2>
            <p className="text-lg text-muted-foreground">
              We've reimagined how students interact with scientific concepts through immersive, 
              interactive experiences that foster curiosity and deep understanding.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div 
                key={index} 
                className={`transition-all duration-700 delay-${index * 100} animate-fade-in opacity-0`}
                style={{animationDelay: `${index * 0.1 + 0.3}s`, animationFillMode: 'forwards'}}
              >
                <FeatureCard
                  title={feature.title}
                  description={feature.description}
                  icon={feature.icon}
                />
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* How It Works Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <Badge variant="outline" className="mb-4">Simple Process</Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">How VirtLab Works</h2>
            <p className="text-lg text-muted-foreground">
              Our platform makes complex scientific concepts accessible through an intuitive, 
              engaging learning experience.
            </p>
          </div>
          
          <div className="relative">
            <div className="absolute top-0 left-1/2 h-full w-1 bg-virtlab-blue/20 transform -translate-x-1/2 hidden md:block"></div>
            
            <div className="space-y-12 md:space-y-24">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                <div className="order-2 md:order-1">
                  <div className="animate-fade-in opacity-0" style={{animationDelay: '0.3s', animationFillMode: 'forwards'}}>
                    <Badge className="mb-4 bg-virtlab-blue text-white">Step 1</Badge>
                    <h3 className="text-2xl font-bold mb-4">Choose Your Experiment</h3>
                    <p className="text-muted-foreground mb-6">
                      Browse our library of experiments across physics, chemistry, and biology. 
                      Filter by subject, difficulty level, or educational standards.
                    </p>
                    <Button variant="outline" className="magnetic-button">
                      Explore Experiments
                    </Button>
                  </div>
                </div>
                <div className="order-1 md:order-2 bg-gray-100 rounded-xl p-6 aspect-video flex items-center justify-center">
  <img src={scienceIcon} alt="Science Icon" className="w-45 h-55 animate-float" />
</div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                <div className="bg-gray-100 rounded-xl p-6 aspect-video flex items-center justify-center">
                <img src={conduct} alt="Science Icon" className="w-45 h-55 animate-float" />
                </div>
                <div>
                  <div className="animate-fade-in opacity-0" style={{animationDelay: '0.4s', animationFillMode: 'forwards'}}>
                    <Badge className="mb-4 bg-virtlab-blue text-white">Step 2</Badge>
                    <h3 className="text-2xl font-bold mb-4">Conduct Your Experiment</h3>
                    <p className="text-muted-foreground mb-6">
                      Follow step-by-step instructions to set up and run your experiment. 
                      Manipulate variables in real-time and observe the effects instantly.
                    </p>
                    <Button variant="outline" className="magnetic-button">
                      See Demo
                    </Button>
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                <div className="order-2 md:order-1">
                  <div className="animate-fade-in opacity-0" style={{animationDelay: '0.5s', animationFillMode: 'forwards'}}>
                    <Badge className="mb-4 bg-virtlab-blue text-white">Step 3</Badge>
                    <h3 className="text-2xl font-bold mb-4">Track Your Progress</h3>
                    <p className="text-muted-foreground mb-6">
                      Earn badges, track your learning journey, and challenge yourself with 
                      increasingly complex experiments. Share your achievements with friends and teachers.
                    </p>
                    <Button variant="outline" className="magnetic-button">
                      View Achievements
                    </Button>
                  </div>
                </div>
                <div className="order-1 md:order-2 bg-gray-100 rounded-xl p-6 aspect-video flex items-center justify-center">
                <img src={progress} alt="Science Icon" className="w-45 h-55 animate-float" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Gamification Section */}
      <section className="py-20 bg-gradient-to-b from-white to-virtlab-yellow/10">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <Badge variant="outline" className="mb-4">Achievement System</Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Earn Badges & Level Up</h2>
            <p className="text-lg text-muted-foreground">
              Track your progress and show off your scientific achievements with our 
              gamification system designed to make learning addictive and fun.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {achievementBadges.map((badge, index) => (
              <div 
                key={index}
                className="animate-fade-in opacity-0"
                style={{animationDelay: `${index * 0.1 + 0.3}s`, animationFillMode: 'forwards'}}
              >
                <AchievementBadge
                  name={badge.name}
                  description={badge.description}
                  icon={badge.icon}
                  progress={badge.progress}
                  maxProgress={badge.maxProgress}
                  achieved={badge.achieved}
                />
              </div>
            ))}
          </div>
          
          <div className="mt-12 text-center">
            <Button className="magnetic-button">
              View All Badges
            </Button>
          </div>
        </div>
      </section>
      
      {/* Testimonial Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <Badge variant="outline" className="mb-4">Testimonials</Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">What Our Users Say</h2>
            <p className="text-lg text-muted-foreground">
              Students and teachers love how VirtLab transforms the learning experience.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className="animate-fade-in opacity-0" style={{animationDelay: '0.3s', animationFillMode: 'forwards'}}>
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <img src={bostan} alt="Science Icon" className="w-10 h-10 bg-virtlab-blue text-white rounded-full flex items-center justify-center font-bold mr-3" />
                  <div>
                    <p className="font-medium">Viorel Bostan</p>
                    <p className="text-sm text-muted-foreground">Rector of TUM</p>
                  </div>
                </div>
                <p className="text-muted-foreground">
                  "Using VirtLab, my students have significantly improved their grasp of probability. Concepts that were once abstract are now much clearer, and their problem-solving skills have noticeably advanced."
                </p>
              </CardContent>
            </Card>
            
            <Card className="animate-fade-in opacity-0" style={{animationDelay: '0.4s', animationFillMode: 'forwards'}}>
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 bg-virtlab-blue text-white rounded-full flex items-center justify-center font-bold mr-3">M</div>
                  <div>
                    <p className="font-medium">Nikita Rusnac</p>
                    <p className="text-sm text-muted-foreground">9th Grade Student</p>
                  </div>
                </div>
                <p className="text-muted-foreground">
                  "Before VirtLab, I struggled with chemistry. Being able to see molecules interact in 3D and 
                  experiment freely without fear of making mistakes has made a huge difference in how I learn."
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
      
      {/* Pricing Section */}
      <section className="py-20 bg-gradient-to-b from-white to-virtlab-mint/10">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <Badge variant="outline" className="mb-4">Pricing</Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Simple, Transparent Pricing</h2>
            <p className="text-lg text-muted-foreground">
              Choose the plan that works best for your educational needs.
            </p>
          </div>
          
          <div className="max-w-5xl mx-auto">
            <Tabs defaultValue="monthly" className="w-full">
              <TabsList className="grid w-full max-w-md mx-auto grid-cols-2 mb-8">
                <TabsTrigger value="monthly">Monthly</TabsTrigger>
                <TabsTrigger value="annually">Annually <span className="ml-1.5 text-xs py-0.5 px-2 rounded-full bg-green-100 text-green-800">Save 20%</span></TabsTrigger>
              </TabsList>
              
              <TabsContent value="monthly" className="w-full">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  <Card className="animate-fade-in opacity-0" style={{animationDelay: '0.3s', animationFillMode: 'forwards'}}>
                    <CardContent className="p-6">
                      <h3 className="text-xl font-bold mb-2">Basic</h3>
                      <p className="text-muted-foreground text-sm mb-4">Free Access</p>
                      <div className="mb-6">
                        <span className="text-3xl font-bold">$0.00</span>
                        <span className="text-muted-foreground">/month</span>
                      </div>
                      <ul className="space-y-2 mb-6">
                        <li className="flex items-center">
                          <svg className="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          <span>Access to 6 experiments</span>
                        </li>
                        <li className="flex items-center">
                          <svg className="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          <span>Basic achievement system</span>
                        </li>
                        <li className="flex items-center">
                        </li>
                      </ul>
                      <Button variant="outline" className="w-full magnetic-button">
                        Choose Basic
                      </Button>
                    </CardContent>
                  </Card>
                  
                  <Card className="relative border-virtlab-blue animate-fade-in opacity-0" style={{animationDelay: '0.4s', animationFillMode: 'forwards'}}>
                    <div className="absolute -top-4 inset-x-0 flex justify-center">
                      <Badge className="bg-virtlab-blue text-white">Most Popular</Badge>
                    </div>
                    <CardContent className="p-6 pt-8">
                      <h3 className="text-xl font-bold mb-2">Pro</h3>
                      <p className="text-muted-foreground text-sm mb-4">Perfect for individual students</p>
                      <div className="mb-6">
                        <span className="text-3xl font-bold">$14.99</span>
                        <span className="text-muted-foreground">/month</span>
                      </div>
                      <ul className="space-y-2 mb-6">
                        <li className="flex items-center">
                          <svg className="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          <span>Access to 50+ experiments</span>
                        </li>
                        <li className="flex items-center">
                          <svg className="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          <span>Advanced achievement system</span>
                        </li>
                        <li className="flex items-center">
                          <svg className="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          <span>Personal Progress Tracking</span>
                        </li>
                        <li className="flex items-center">
                          <svg className="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          <span>Online Meetings</span>
                        </li>
                      </ul>
                      <Button className="w-full">
                        Choose Pro
                      </Button>
                    </CardContent>
                  </Card>
                  
                  <Card className="animate-fade-in opacity-0" style={{animationDelay: '0.5s', animationFillMode: 'forwards'}}>
                    <CardContent className="p-6">
                      <h3 className="text-xl font-bold mb-2">Enterprise</h3>
                      <p className="text-muted-foreground text-sm mb-4">For schools and districts</p>
                      <div className="mb-6">
                        <span className="text-3xl font-bold">Custom</span>
                      </div>
                      <ul className="space-y-2 mb-6">
                        <li className="flex items-center">
                          <svg className="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          <span>Access to all experiments</span>
                        </li>
                        <li className="flex items-center">
                          <svg className="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          <span>Custom curriculum integration</span>
                        </li>
                        <li className="flex items-center">
                          <svg className="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          <span>Unlimited student accounts</span>
                        </li>
                        <li className="flex items-center">
                          <svg className="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          <span>Advanced analytics & support</span>
                        </li>
                      </ul>
                      <Button variant="outline" className="w-full magnetic-button">
                        Contact Sales
                      </Button>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
              
              <TabsContent value="annually" className="w-full">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  <Card>
                    <CardContent className="p-6">
                      <h3 className="text-xl font-bold mb-2">Basic</h3>
                      <p className="text-muted-foreground text-sm mb-4">Free Access</p>
                      <div className="mb-6">
                        <span className="text-3xl font-bold">$0.00</span>
                        <span className="text-muted-foreground">/year</span>
                      </div>
                      <ul className="space-y-2 mb-6">
                        <li className="flex items-center">
                          <svg className="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          <span>Access to 6 experiments</span>
                        </li>
                        <li className="flex items-center">
                          <svg className="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          <span>Basic achievement system</span>
                        </li>
                        <li className="flex items-center">
                        </li>
                      </ul>
                      <Button variant="outline" className="w-full magnetic-button">
                        Choose Basic
                      </Button>
                    </CardContent>
                  </Card>
                  
                  <Card className="relative border-virtlab-blue">
                    <div className="absolute -top-4 inset-x-0 flex justify-center">
                      <Badge className="bg-virtlab-blue text-white">Most Popular</Badge>
                    </div>
                    <CardContent className="p-6 pt-8">
                      <h3 className="text-xl font-bold mb-2">Pro</h3>
                      <p className="text-muted-foreground text-sm mb-4">Perfect for individual students</p>
                      <div className="mb-6">
                        <span className="text-3xl font-bold">$160.00</span>
                        <span className="text-muted-foreground">/year</span>
                        <p className="text-sm text-green-600">Save $19.88</p>
                      </div>
                      <ul className="space-y-2 mb-6">
                        <li className="flex items-center">
                          <svg className="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          <span>Access to 50+ experiments</span>
                        </li>
                        <li className="flex items-center">
                          <svg className="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          <span>Advanced achievement system</span>
                        </li>
                        <li className="flex items-center">
                          <svg className="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          <span>Personal progress tracking</span>
                        </li>
                        <li className="flex items-center">
                          <svg className="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          <span>Online Meetings</span>
                        </li>
                      </ul>
                      <Button className="w-full">
                        Choose Pro
                      </Button>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardContent className="p-6">
                      <h3 className="text-xl font-bold mb-2">Enterprise</h3>
                      <p className="text-muted-foreground text-sm mb-4">For schools and districts</p>
                      <div className="mb-6">
                        <span className="text-3xl font-bold">Custom</span>
                      </div>
                      <ul className="space-y-2 mb-6">
                        <li className="flex items-center">
                          <svg className="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          <span>Access to all experiments</span>
                        </li>
                        <li className="flex items-center">
                          <svg className="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          <span>Custom curriculum integration</span>
                        </li>
                        <li className="flex items-center">
                          <svg className="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          <span>Unlimited student accounts</span>
                        </li>
                        <li className="flex items-center">
                          <svg className="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          <span>Advanced analytics & support</span>
                        </li>
                      </ul>
                      <Button variant="outline" className="w-full magnetic-button">
                        Contact Sales
                      </Button>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </section>
      
      {/* FAQ Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <Badge variant="outline" className="mb-4">Questions</Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Frequently Asked Questions</h2>
            <p className="text-lg text-muted-foreground">
              Have a question? Find quick answers to common questions below.
            </p>
          </div>
          
          <div className="max-w-3xl mx-auto">
            <Accordion type="single" collapsible className="w-full">
              {faqs.map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`} className="animate-fade-in opacity-0" style={{animationDelay: `${index * 0.1 + 0.3}s`, animationFillMode: 'forwards'}}>
                  <AccordionTrigger>{faq.question}</AccordionTrigger>
                  <AccordionContent>
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-b from-white to-virtlab-mint/10">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <Badge variant="outline" className="mb-4">Ready to start?</Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Begin Your Scientific Journey Today
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Join thousands of students and educators who are transforming how they learn and teach science.
            </p>
            <Button size="lg" className="magnetic-button relative overflow-hidden group">
              <span className="absolute inset-0 bg-gradient-to-r from-virtlab-blue to-blue-500 animate-gradient-x"></span>
              <span className="relative z-10">Try VirtLab for Free</span>
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
