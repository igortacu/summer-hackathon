
import React from 'react';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { ExperimentData } from '@/types/experiments';
import { Beaker, Gauge, Activity, Atom, Trophy, Star, Flame, Play } from 'lucide-react';

interface ExperimentCardProps {
  experiment: ExperimentData;
  onClick?: () => void;
}

const ExperimentCard: React.FC<ExperimentCardProps> = ({ experiment, onClick }) => {
  const { title, description, category, difficulty, completed, progress, image, xp, hasVideo } = experiment;
  
  const getCategoryIcon = () => {
    switch(category) {
      case 'mechanics': return <Gauge className="h-4 w-4" />;
      case 'waves': return <Beaker className="h-4 w-4" />;
      case 'optics': return <Activity className="h-4 w-4" />;
      case 'electricity': return <Atom className="h-4 w-4" />;
      case 'thermodynamics': return <Flame className="h-4 w-4" />;
      default: return <Beaker className="h-4 w-4" />;
    }
  };
  
  return (
    <Card 
      className="overflow-hidden hover:shadow-md transition-shadow cursor-pointer h-full flex flex-col"
      onClick={onClick}
    >
      <div className="relative h-40">
        <img 
          src={image} 
          alt={title} 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
        <div className="absolute bottom-3 left-3 right-3 flex justify-between items-center">
          <Badge className="bg-black/60 hover:bg-black/60 text-white">{difficulty}</Badge>
          {completed && (
            <Badge className="bg-green-500 hover:bg-green-600 text-white">Completed</Badge>
          )}
        </div>
        {hasVideo && (
          <div className="absolute top-3 right-3">
            <div className="bg-red-500 rounded-full p-1.5 text-white">
              <Play className="h-4 w-4" />
            </div>
          </div>
        )}
      </div>
      
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <h3 className="font-semibold text-lg">{title}</h3>
          <Badge variant="outline" className="flex items-center gap-1.5">
            {getCategoryIcon()}
            {category}
          </Badge>
        </div>
      </CardHeader>
      
      <CardContent className="py-2 flex-grow">
        <p className="text-sm text-muted-foreground line-clamp-3">
          {description}
        </p>
      </CardContent>
      
      <CardFooter className="pt-2 flex flex-col space-y-3">
        {progress !== undefined && (
          <div className="w-full space-y-1">
            <div className="flex justify-between text-xs">
              <span className="text-muted-foreground">Progress</span>
              <span className="font-medium">{progress}%</span>
            </div>
            <Progress value={progress} className="h-1.5" />
          </div>
        )}
        
        <div className="flex justify-between items-center w-full">
          <div className="flex items-center gap-1.5">
            <Star className="h-4 w-4 text-amber-500" />
            <span className="font-medium text-sm">{xp} XP</span>
          </div>
          <Button variant="default" size="sm">
            {completed ? 'View Results' : 'Start'}
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default ExperimentCard;
