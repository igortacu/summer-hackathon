
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Award, ArrowLeft, Beaker, Share2, Trophy, Users, Star, Activity, Sliders, Gauge, Atom, Flame, Play } from 'lucide-react';
import AnimatedText from '@/components/animations/AnimatedText';
import { experiments } from '@/data/experimentsData';
import { useToast } from '@/hooks/use-toast';
import PhysicsSimulation from '@/components/experiments/PhysicsSimulation';
import ResultsChart from '@/components/experiments/ResultsChart';
import NotFound from './NotFound';
import CompletionBadge from '@/components/gamification/CompletionBadge';
import VideoContent from '@/components/experiments/VideoContent';

const ExperimentDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const experiment = experiments.find(exp => exp.id === Number(id));
  
  const [step, setStep] = useState(1);
  const [isCompleted, setIsCompleted] = useState(false);
  const [showBadge, setShowBadge] = useState(false);
  const [simulationSettings, setSimulationSettings] = useState({
    gravity: 9.8,
    velocity: 10,
    mass: 1.0,
    angle: 45,
    airResistance: 0.1,
    time: 5
  });
  const [results, setResults] = useState<any>(null);
  
  // If experiment not found
  if (!experiment) {
    return <NotFound />;
  }
  
  const hasVideo = experiment.hasVideo && experiment.videoUrl;
  const totalSteps = hasVideo ? 3 : 5;
  
  const handleSettingChange = (setting: string, value: number | number[]) => {
    // For slider components that return an array with a single value
    const actualValue = Array.isArray(value) ? value[0] : value;
    
    setSimulationSettings(prev => ({
      ...prev,
      [setting]: actualValue
    }));
  };
  
  const handleNextStep = () => {
    if (step < totalSteps) {
      setStep(step + 1);
      window.scrollTo(0, 0);
    }
  };
  
  const handlePreviousStep = () => {
    if (step > 1) {
      setStep(step - 1);
      window.scrollTo(0, 0);
    }
  };
  
  const handleRunSimulation = () => {
    // In a real app, this would run actual physics calculations
    // For now, we'll just simulate a delay and generate example results
    toast({
      title: "Running simulation...",
      description: "Please wait while we calculate the results",
      duration: 2000,
    });
    
    setTimeout(() => {
      // Generate some sample data based on the settings
      const sampleData = Array.from({ length: 20 }, (_, i) => ({
        time: i * (simulationSettings.time / 20),
        height: simulationSettings.velocity * Math.sin(simulationSettings.angle * Math.PI / 180) * i * (simulationSettings.time / 20) - 
                0.5 * simulationSettings.gravity * Math.pow(i * (simulationSettings.time / 20), 2),
        distance: simulationSettings.velocity * Math.cos(simulationSettings.angle * Math.PI / 180) * i * (simulationSettings.time / 20)
      })).filter(point => point.height >= 0);
      
      setResults({
        maxHeight: Math.max(...sampleData.map(d => d.height)),
        maxDistance: sampleData[sampleData.length - 1]?.distance || 0,
        flightTime: sampleData[sampleData.length - 1]?.time || 0,
        trajectory: sampleData
      });
      
      toast({
        title: "Simulation complete!",
        description: "View your results and continue to the next step",
        duration: 3000,
      });
    }, 1500);
  };
  
  const handleCompleteExperiment = () => {
    // In a real app, this would update the database
    setIsCompleted(true);
    setShowBadge(true);
    
    toast({
      title: "Experiment completed!",
      description: `You've earned ${experiment.xp} XP and unlocked a new badge`,
      duration: 5000,
    });
    
    // After showing the badge for a few seconds, close it
    setTimeout(() => {
      setShowBadge(false);
    }, 5000);
  };
  
  const handleShareResults = () => {
    // In a real app, this would generate a shareable link
    toast({
      title: "Challenge sent!",
      description: "Your friends will receive your challenge",
      duration: 3000,
    });
  };
  
  const getCategoryIcon = () => {
    switch(experiment.category) {
      case 'mechanics': return <Gauge className="h-8 w-8" />;
      case 'waves': return <Beaker className="h-8 w-8" />;
      case 'optics': return <Activity className="h-8 w-8" />;
      case 'electricity': return <Atom className="h-8 w-8" />;
      case 'thermodynamics': return <Flame className="h-8 w-8" />;
      default: return <Beaker className="h-8 w-8" />;
    }
  };
  
  return (
    <Layout>
      <div className="container mx-auto px-4 py-8 mt-16">
        {/* Header with navigation */}
        <div className="mb-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div className="flex items-center gap-3">
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => navigate('/experiments')}
              className="rounded-full"
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div>
              <h1 className="text-2xl font-bold flex items-center gap-3">
                {experiment.title}
                {experiment.completed && (
                  <Badge className="bg-green-500 text-white">Completed</Badge>
                )}
              </h1>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Badge variant="outline">{experiment.category}</Badge>
                <span>•</span>
                <Badge variant="outline">{experiment.difficulty}</Badge>
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <Progress 
              value={(step / totalSteps) * 100} 
              className="w-32 h-2 md:h-2.5" 
            />
            <span className="text-sm font-medium">Step {step}/{totalSteps}</span>
          </div>
        </div>
        
        {/* Main content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left column - Steps and simulation */}
          <div className="lg:col-span-2 space-y-6">
            {/* Current step card */}
            <Card>
              <CardHeader>
                <CardTitle>
                  {hasVideo ? (
                    <>
                      {step === 1 && "Introduction"}
                      {step === 2 && "Video & Theory"}
                      {step === 3 && "Conclusion"}
                    </>
                  ) : (
                    <>
                      {step === 1 && "Introduction"}
                      {step === 2 && "Setup Parameters"}
                      {step === 3 && "Run Simulation"}
                      {step === 4 && "Analysis"}
                      {step === 5 && "Conclusion"}
                    </>
                  )}
                </CardTitle>
              </CardHeader>
              <CardContent>
                {/* Step 1: Introduction */}
                {step === 1 && (
                  <div className="space-y-4">
                    <div className="flex items-center gap-4 mb-6">
                      <div className="bg-virtlab-softblue/30 text-virtlab-blue p-3 rounded-lg">
                        {getCategoryIcon()}
                      </div>
                      <div>
                        <AnimatedText 
                          text={experiment.title} 
                          className="text-xl font-semibold" 
                          tag="h2"
                          animationType="focus"
                          threshold={0.5}
                        />
                        <p className="text-sm text-muted-foreground">{experiment.category} • {experiment.difficulty}</p>
                      </div>
                    </div>
                    
                    <div className="relative h-64 rounded-lg overflow-hidden mb-6">
                      <img 
                        src={experiment.image} 
                        alt={experiment.title} 
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
                    </div>
                    
                    <div className="prose max-w-none">
                      <h3>Experiment Overview</h3>
                      <p>{experiment.description}</p>
                      
                      {hasVideo ? (
                        <>
                          <h3>What You'll Learn</h3>
                          <p>
                            This experiment introduces you to the principles of thermodynamics and mechanical
                            engineering through an exploration of the internal combustion engine. You'll understand the
                            four-stroke cycle, thermodynamic processes, and the key components that make these
                            engines work.
                          </p>
                        </>
                      ) : (
                        <>
                          <h3>Learning Objectives</h3>
                          <ul>
                            <li>Understand how gravity affects the vertical motion of a projectile</li>
                            <li>Analyze the relationship between launch angle and projectile range</li>
                            <li>Interpret trajectory data and graphs</li>
                            <li>Apply the equations of motion to predict projectile behavior</li>
                          </ul>
                        </>
                      )}
                    </div>
                  </div>
                )}
                
                {/* Step 2: Video & Theory (for video experiments) */}
                {step === 2 && hasVideo && experiment.videoUrl && (
                  <VideoContent 
                    videoUrl={experiment.videoUrl}
                    theory={experiment.theory}
                  />
                )}
                
                {/* Step 2: Setup Parameters (for simulation experiments) */}
                {step === 2 && !hasVideo && (
                  <div className="space-y-6">
                    <div className="prose max-w-none mb-6">
                      <h3>Experiment Parameters</h3>
                      <p>
                        Adjust the parameters below to see how they affect the trajectory of the projectile.
                        Try different combinations to see what produces the longest range or highest peak.
                      </p>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div className="space-y-6">
                        <div className="space-y-3">
                          <div className="flex justify-between">
                            <label className="text-sm font-medium">Initial Velocity (m/s)</label>
                            <span className="text-sm">{simulationSettings.velocity} m/s</span>
                          </div>
                          <Slider 
                            value={[simulationSettings.velocity]} 
                            min={1} 
                            max={30} 
                            step={0.5}
                            onValueChange={(value) => handleSettingChange('velocity', value)}
                          />
                        </div>
                        
                        <div className="space-y-3">
                          <div className="flex justify-between">
                            <label className="text-sm font-medium">Launch Angle (degrees)</label>
                            <span className="text-sm">{simulationSettings.angle}°</span>
                          </div>
                          <Slider 
                            value={[simulationSettings.angle]} 
                            min={0} 
                            max={90} 
                            step={1}
                            onValueChange={(value) => handleSettingChange('angle', value)}
                          />
                        </div>
                        
                        <div className="space-y-3">
                          <div className="flex justify-between">
                            <label className="text-sm font-medium">Object Mass (kg)</label>
                            <span className="text-sm">{simulationSettings.mass} kg</span>
                          </div>
                          <Slider 
                            value={[simulationSettings.mass]} 
                            min={0.1} 
                            max={10} 
                            step={0.1}
                            onValueChange={(value) => handleSettingChange('mass', value)}
                          />
                        </div>
                      </div>
                      
                      <div className="space-y-6">
                        <div className="space-y-3">
                          <div className="flex justify-between">
                            <label className="text-sm font-medium">Gravity (m/s²)</label>
                            <span className="text-sm">{simulationSettings.gravity} m/s²</span>
                          </div>
                          <Slider 
                            value={[simulationSettings.gravity]} 
                            min={1} 
                            max={20} 
                            step={0.1}
                            onValueChange={(value) => handleSettingChange('gravity', value)}
                          />
                        </div>
                        
                        <div className="space-y-3">
                          <div className="flex justify-between">
                            <label className="text-sm font-medium">Air Resistance Coefficient</label>
                            <span className="text-sm">{simulationSettings.airResistance}</span>
                          </div>
                          <Slider 
                            value={[simulationSettings.airResistance]} 
                            min={0} 
                            max={1} 
                            step={0.01}
                            onValueChange={(value) => handleSettingChange('airResistance', value)}
                          />
                        </div>
                        
                        <div className="space-y-3">
                          <div className="flex justify-between">
                            <label className="text-sm font-medium">Simulation Time (s)</label>
                            <span className="text-sm">{simulationSettings.time} s</span>
                          </div>
                          <Slider 
                            value={[simulationSettings.time]} 
                            min={1} 
                            max={15} 
                            step={0.5}
                            onValueChange={(value) => handleSettingChange('time', value)}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                
                {/* Step 3 differs between video and simulation experiments */}
                {step === 3 && hasVideo && (
                  <div className="space-y-6">
                    <div className="prose max-w-none mb-6">
                      <h3>Experiment Conclusion</h3>
                      <p>
                        Congratulations on completing this learning module on internal combustion engines! 
                        Let's summarize the key concepts you've explored.
                      </p>
                      
                      <h3>Key Takeaways</h3>
                      <ul>
                        <li>The four-stroke combustion cycle (intake, compression, power, exhaust) converts chemical energy into mechanical work</li>
                        <li>Precise timing of valves, pistons and ignition is essential for engine efficiency</li>
                        <li>Thermodynamic principles govern the energy conversion process</li>
                        <li>Modern engines incorporate various technologies to improve efficiency and reduce emissions</li>
                      </ul>
                      
                      <h3>Real-World Applications</h3>
                      <p>
                        The principles you've learned apply to numerous fields:
                      </p>
                      <ul>
                        <li>Automotive engineering</li>
                        <li>Power generation</li>
                        <li>Marine propulsion</li>
                        <li>Aircraft engines</li>
                      </ul>
                    </div>
                    
                    <div className="bg-gradient-to-br from-virtlab-blue/10 to-virtlab-softblue/30 p-6 rounded-lg border">
                      <div className="flex items-center gap-4 mb-4">
                        <div className="bg-virtlab-blue text-white p-3 rounded-full">
                          <Trophy className="h-6 w-6" />
                        </div>
                        <div>
                          <h3 className="font-bold text-lg">Experiment Complete!</h3>
                          <p className="text-sm text-muted-foreground">You've successfully completed this experiment</p>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                        <div className="bg-white rounded-lg p-4 shadow-sm">
                          <h4 className="text-sm font-medium text-muted-foreground mb-1">XP Earned</h4>
                          <div className="flex items-center gap-2">
                            <Star className="h-5 w-5 text-yellow-500" />
                            <span className="text-xl font-bold">+{experiment.xp} XP</span>
                          </div>
                        </div>
                        <div className="bg-white rounded-lg p-4 shadow-sm">
                          <h4 className="text-sm font-medium text-muted-foreground mb-1">New Badge</h4>
                          <div className="flex items-center gap-2">
                            <Award className="h-5 w-5 text-virtlab-blue" />
                            <span className="text-xl font-bold">Thermodynamics Expert</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex flex-col sm:flex-row gap-3">
                        {!isCompleted && (
                          <Button 
                            className="flex-1" 
                            onClick={handleCompleteExperiment}
                            size="lg"
                          >
                            <Award className="h-5 w-5 mr-2" />
                            Complete & Claim Rewards
                          </Button>
                        )}
                        <Button 
                          variant="outline" 
                          className="flex-1"
                          onClick={handleShareResults}
                          size="lg"
                        >
                          <Share2 className="h-5 w-5 mr-2" />
                          Challenge Friends
                        </Button>
                      </div>
                    </div>
                  </div>
                )}
                
                {/* Step 3: Run Simulation (for simulation experiments) */}
                {step === 3 && !hasVideo && (
                  <div className="space-y-6">
                    <div className="prose max-w-none mb-6">
                      <h3>Run Your Experiment</h3>
                      <p>
                        Now that you've set up your parameters, it's time to run the simulation and observe the results.
                        The visualization below will show the trajectory of your projectile.
                      </p>
                    </div>
                    
                    <div className="bg-slate-50 p-4 rounded-lg border">
                      <div className="bg-white rounded-lg overflow-hidden shadow-sm border h-80 flex items-center justify-center">
                        <PhysicsSimulation 
                          settings={simulationSettings}
                          results={results}
                        />
                      </div>
                    </div>
                    
                    <div className="flex justify-center">
                      <Button 
                        onClick={handleRunSimulation}
                        className="flex items-center gap-2"
                        size="lg"
                      >
                        <Sliders className="h-5 w-5" />
                        Run Simulation
                      </Button>
                    </div>
                    
                    {results && (
                      <div className="mt-6 bg-slate-50 p-6 rounded-lg border">
                        <h3 className="text-lg font-medium mb-4">Simulation Results</h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                          <Card className="bg-white">
                            <CardContent className="p-4">
                              <div className="text-sm text-muted-foreground">Maximum Height</div>
                              <div className="text-2xl font-bold">{results.maxHeight.toFixed(2)} m</div>
                            </CardContent>
                          </Card>
                          <Card className="bg-white">
                            <CardContent className="p-4">
                              <div className="text-sm text-muted-foreground">Maximum Distance</div>
                              <div className="text-2xl font-bold">{results.maxDistance.toFixed(2)} m</div>
                            </CardContent>
                          </Card>
                          <Card className="bg-white">
                            <CardContent className="p-4">
                              <div className="text-sm text-muted-foreground">Flight Time</div>
                              <div className="text-2xl font-bold">{results.flightTime.toFixed(2)} s</div>
                            </CardContent>
                          </Card>
                        </div>
                      </div>
                    )}
                  </div>
                )}
                
                {/* Steps 4-5 only exist for simulation experiments */}
                {step === 4 && !hasVideo && (
                  <div className="space-y-6">
                    <div className="prose max-w-none mb-6">
                      <h3>Analyze Your Results</h3>
                      <p>
                        Let's analyze the results of your experiment. The charts below show the trajectory of 
                        your projectile and how height and distance change over time.
                      </p>
                    </div>
                    
                    {results ? (
                      <div className="space-y-8">
                        <Tabs defaultValue="trajectory" className="w-full">
                          <TabsList className="grid grid-cols-3 mb-6">
                            <TabsTrigger value="trajectory">Trajectory</TabsTrigger>
                            <TabsTrigger value="height">Height vs. Time</TabsTrigger>
                            <TabsTrigger value="distance">Distance vs. Time</TabsTrigger>
                          </TabsList>
                          
                          <TabsContent value="trajectory" className="bg-white p-4 rounded-lg border">
                            <div className="h-80">
                              <ResultsChart 
                                data={results.trajectory}
                                xKey="distance"
                                yKey="height"
                                xLabel="Distance (m)"
                                yLabel="Height (m)"
                              />
                            </div>
                          </TabsContent>
                          
                          <TabsContent value="height" className="bg-white p-4 rounded-lg border">
                            <div className="h-80">
                              <ResultsChart 
                                data={results.trajectory}
                                xKey="time"
                                yKey="height"
                                xLabel="Time (s)"
                                yLabel="Height (m)"
                              />
                            </div>
                          </TabsContent>
                          
                          <TabsContent value="distance" className="bg-white p-4 rounded-lg border">
                            <div className="h-80">
                              <ResultsChart 
                                data={results.trajectory}
                                xKey="time"
                                yKey="distance"
                                xLabel="Time (s)"
                                yLabel="Distance (m)"
                              />
                            </div>
                          </TabsContent>
                        </Tabs>
                        
                        <div className="bg-slate-50 p-6 rounded-lg border">
                          <h3 className="text-lg font-medium mb-4">Key Observations</h3>
                          <ul className="space-y-2">
                            <li className="flex items-start gap-2">
                              <div className="h-5 w-5 rounded-full bg-virtlab-blue text-white flex items-center justify-center text-xs flex-shrink-0 mt-0.5">1</div>
                              <div>The maximum height was reached at approximately {(results.flightTime / 2).toFixed(2)} seconds.</div>
                            </li>
                            <li className="flex items-start gap-2">
                              <div className="h-5 w-5 rounded-full bg-virtlab-blue text-white flex items-center justify-center text-xs flex-shrink-0 mt-0.5">2</div>
                              <div>The projectile traveled a total distance of {results.maxDistance.toFixed(2)} meters.</div>
                            </li>
                            <li className="flex items-start gap-2">
                              <div className="h-5 w-5 rounded-full bg-virtlab-blue text-white flex items-center justify-center text-xs flex-shrink-0 mt-0.5">3</div>
                              <div>The launch angle of {simulationSettings.angle}° gave us this specific parabolic trajectory.</div>
                            </li>
                            <li className="flex items-start gap-2">
                              <div className="h-5 w-5 rounded-full bg-virtlab-blue text-white flex items-center justify-center text-xs flex-shrink-0 mt-0.5">4</div>
                              <div>With different gravity settings, the trajectory would change significantly.</div>
                            </li>
                          </ul>
                        </div>
                      </div>
                    ) : (
                      <div className="bg-slate-50 p-8 rounded-lg border text-center">
                        <Beaker className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                        <h3 className="text-lg font-medium mb-2">No data available</h3>
                        <p className="text-muted-foreground mb-6">Go back to Step 3 to run your simulation</p>
                        <Button onClick={() => setStep(3)}>Go to Simulation</Button>
                      </div>
                    )}
                  </div>
                )}
                
                {/* Step 5: Conclusion (for simulation experiments) */}
                {step === 5 && !hasVideo && (
                  <div className="space-y-6">
                    <div className="prose max-w-none mb-6">
                      <h3>Experiment Conclusion</h3>
                      <p>
                        Congratulations on completing this experiment! Let's summarize what you've learned and the 
                        principles you've observed in action.
                      </p>
                      
                      <h3>Summary of Findings</h3>
                      <p>
                        In this experiment, you explored projectile motion and observed how various parameters 
                        affect the trajectory of a projectile:
                      </p>
                      <ul>
                        <li><strong>Gravity:</strong> Higher gravity values reduce the maximum height and range.</li>
                        <li><strong>Initial velocity:</strong> Higher velocities increase both height and range.</li>
                        <li><strong>Launch angle:</strong> 45° typically provides maximum range on flat ground.</li>
                        <li><strong>Air resistance:</strong> Reduces the overall range and peak height.</li>
                      </ul>
                      
                      <h3>Real-World Applications</h3>
                      <p>
                        The principles of projectile motion that you've just explored have numerous real-world applications:
                      </p>
                      <ul>
                        <li>Sports (basketball, football, golf, etc.)</li>
                        <li>Ballistics and military applications</li>
                        <li>Rocket launches and space exploration</li>
                        <li>Theme park ride design</li>
                      </ul>
                    </div>
                    
                    <div className="bg-gradient-to-br from-virtlab-blue/10 to-virtlab-softblue/30 p-6 rounded-lg border">
                      <div className="flex items-center gap-4 mb-4">
                        <div className="bg-virtlab-blue text-white p-3 rounded-full">
                          <Trophy className="h-6 w-6" />
                        </div>
                        <div>
                          <h3 className="font-bold text-lg">Experiment Complete!</h3>
                          <p className="text-sm text-muted-foreground">You've successfully completed this experiment</p>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                        <div className="bg-white rounded-lg p-4 shadow-sm">
                          <h4 className="text-sm font-medium text-muted-foreground mb-1">XP Earned</h4>
                          <div className="flex items-center gap-2">
                            <Star className="h-5 w-5 text-yellow-500" />
                            <span className="text-xl font-bold">+{experiment.xp} XP</span>
                          </div>
                        </div>
                        <div className="bg-white rounded-lg p-4 shadow-sm">
                          <h4 className="text-sm font-medium text-muted-foreground mb-1">New Badge</h4>
                          <div className="flex items-center gap-2">
                            <Award className="h-5 w-5 text-virtlab-blue" />
                            <span className="text-xl font-bold">Physics Explorer</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex flex-col sm:flex-row gap-3">
                        {!isCompleted && (
                          <Button 
                            className="flex-1" 
                            onClick={handleCompleteExperiment}
                            size="lg"
                          >
                            <Award className="h-5 w-5 mr-2" />
                            Complete & Claim Rewards
                          </Button>
                        )}
                        <Button 
                          variant="outline" 
                          className="flex-1"
                          onClick={handleShareResults}
                          size="lg"
                        >
                          <Share2 className="h-5 w-5 mr-2" />
                          Challenge Friends
                        </Button>
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
              <CardFooter className="flex justify-between pt-6">
                <Button 
                  variant="outline" 
                  onClick={handlePreviousStep}
                  disabled={step === 1}
                >
                  Previous Step
                </Button>
                <Button 
                  onClick={handleNextStep}
                  disabled={step === totalSteps || (step === 3 && !hasVideo && !results)}
                >
                  {step === totalSteps ? "Finish" : "Next Step"}
                </Button>
              </CardFooter>
            </Card>
          </div>
          
          {/* Right column - Info and navigation */}
          <div className="space-y-6">
            {/* Experiment info */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">About This Experiment</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="bg-virtlab-softblue/30 text-virtlab-blue p-2 rounded-lg">
                    {getCategoryIcon()}
                  </div>
                  <div>
                    <h3 className="font-medium">{experiment.title}</h3>
                    <p className="text-sm text-muted-foreground">{experiment.category}</p>
                  </div>
                </div>
                
                <div className="text-sm">
                  {experiment.description}
                </div>
                
                <div className="pt-4 border-t">
                  <h4 className="text-sm font-medium mb-3">Experiment Steps</h4>
                  <ul className="space-y-3">
                    <li className={`flex items-center gap-3 p-2 rounded-md ${step === 1 ? 'bg-virtlab-softblue/20 text-virtlab-blue' : ''}`}>
                      <div className={`h-6 w-6 rounded-full flex items-center justify-center text-xs ${step > 1 ? 'bg-green-500 text-white' : (step === 1 ? 'bg-virtlab-blue text-white' : 'bg-muted text-muted-foreground')}`}>
                        {step > 1 ? '✓' : '1'}
                      </div>
                      <span className={step > 1 ? 'line-through text-muted-foreground' : ''}>Introduction</span>
                    </li>
                    
                    <li className={`flex items-center gap-3 p-2 rounded-md ${step === 2 ? 'bg-virtlab-softblue/20 text-virtlab-blue' : ''}`}>
                      <div className={`h-6 w-6 rounded-full flex items-center justify-center text-xs ${step > 2 ? 'bg-green-500 text-white' : (step === 2 ? 'bg-virtlab-blue text-white' : 'bg-muted text-muted-foreground')}`}>
                        {step > 2 ? '✓' : '2'}
                      </div>
                      <span className={step > 2 ? 'line-through text-muted-foreground' : ''}>{hasVideo ? 'Video & Theory' : 'Setup Parameters'}</span>
                    </li>
                    
                    {!hasVideo && (
                      <>
                        <li className={`flex items-center gap-3 p-2 rounded-md ${step === 3 ? 'bg-virtlab-softblue/20 text-virtlab-blue' : ''}`}>
                          <div className={`h-6 w-6 rounded-full flex items-center justify-center text-xs ${step > 3 ? 'bg-green-500 text-white' : (step === 3 ? 'bg-virtlab-blue text-white' : 'bg-muted text-muted-foreground')}`}>
                            {step > 3 ? '✓' : '3'}
                          </div>
                          <span className={step > 3 ? 'line-through text-muted-foreground' : ''}>Run Simulation</span>
                        </li>
                        
                        <li className={`flex items-center gap-3 p-2 rounded-md ${step === 4 ? 'bg-virtlab-softblue/20 text-virtlab-blue' : ''}`}>
                          <div className={`h-6 w-6 rounded-full flex items-center justify-center text-xs ${step > 4 ? 'bg-green-500 text-white' : (step === 4 ? 'bg-virtlab-blue text-white' : 'bg-muted text-muted-foreground')}`}>
                            {step > 4 ? '✓' : '4'}
                          </div>
                          <span className={step > 4 ? 'line-through text-muted-foreground' : ''}>Analysis</span>
                        </li>
                      </>
                    )}
                    
                    <li className={`flex items-center gap-3 p-2 rounded-md ${step === (hasVideo ? 3 : 5) ? 'bg-virtlab-softblue/20 text-virtlab-blue' : ''}`}>
                      <div className={`h-6 w-6 rounded-full flex items-center justify-center text-xs ${step === (hasVideo ? 3 : 5) ? 'bg-virtlab-blue text-white' : 'bg-muted text-muted-foreground'}`}>
                        {hasVideo ? '3' : '5'}
                      </div>
                      <span>Conclusion</span>
                    </li>
                  </ul>
                </div>
              </CardContent>
            </Card>
            
            {/* Related experiments */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Related Experiments</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {experiments
                  .filter(exp => exp.category === experiment.category && exp.id !== experiment.id)
                  .slice(0, 3)
                  .map(related => (
                    <div 
                      key={related.id} 
                      className="flex items-center gap-3 p-3 rounded-lg border hover:bg-gray-50 transition-colors cursor-pointer"
                      onClick={() => navigate(`/experiment/${related.id}`)}
                    >
                      <img 
                        src={related.image} 
                        alt={related.title}
                        className="h-12 w-12 rounded object-cover"
                      />
                      <div>
                        <h4 className="font-medium text-sm">{related.title}</h4>
                        <p className="text-xs text-muted-foreground">{related.difficulty}</p>
                      </div>
                    </div>
                  ))}
              </CardContent>
            </Card>
            
            {/* Community leaderboard */}
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Leaderboard</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-2.5 rounded-md bg-virtlab-blue/10">
                    <div className="flex items-center gap-3">
                      <div className="bg-yellow-500 text-white w-6 h-6 rounded-full flex items-center justify-center text-xs">1</div>
                      <div>
                        <div className="font-medium">Alex</div>
                        <div className="text-xs text-muted-foreground">325 XP</div>
                      </div>
                    </div>
                    <Badge className="bg-yellow-500/20 text-yellow-700">Gold</Badge>
                  </div>
                  
                  <div className="flex items-center justify-between p-2.5 rounded-md">
                    <div className="flex items-center gap-3">
                      <div className="bg-gray-300 text-white w-6 h-6 rounded-full flex items-center justify-center text-xs">2</div>
                      <div>
                        <div className="font-medium">Taylor</div>
                        <div className="text-xs text-muted-foreground">290 XP</div>
                      </div>
                    </div>
                    <Badge className="bg-gray-200 text-gray-700">Silver</Badge>
                  </div>
                  
                  <div className="flex items-center justify-between p-2.5 rounded-md">
                    <div className="flex items-center gap-3">
                      <div className="bg-amber-700 text-white w-6 h-6 rounded-full flex items-center justify-center text-xs">3</div>
                      <div>
                        <div className="font-medium">Jordan</div>
                        <div className="text-xs text-muted-foreground">270 XP</div>
                      </div>
                    </div>
                    <Badge className="bg-amber-500/20 text-amber-700">Bronze</Badge>
                  </div>
                  
                  <div className="flex items-center justify-between p-2.5 rounded-md">
                    <div className="flex items-center gap-3">
                      <div className="bg-gray-100 text-muted-foreground w-6 h-6 rounded-full flex items-center justify-center text-xs">4</div>
                      <div>
                        <div className="font-medium">Riley</div>
                        <div className="text-xs text-muted-foreground">245 XP</div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
        
        {/* Badge popup */}
        {showBadge && (
          <CompletionBadge 
            title="Physics Explorer"
            description="Completed your first projectile motion experiment"
            onClose={() => setShowBadge(false)}
          />
        )}
      </div>
    </Layout>
  );
};

export default ExperimentDetail;
