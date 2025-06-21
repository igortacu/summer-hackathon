import React, { useState } from 'react';
import Layout from '@/components/layout/Layout';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Slider } from '@/components/ui/slider';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { SearchIcon, FilterIcon, Beaker, Activity, Atom, Gauge, Award, Users, Flame } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { useNavigate } from 'react-router-dom';
import ExperimentCard from '@/components/experiments/ExperimentCard';
import { experimentCategories, experiments } from '@/data/experimentsData';
import AnimatedText from '@/components/animations/AnimatedText';
import ShinyText from '@/components/animations/ShinyText';

const Experiments = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const navigate = useNavigate();
  
  const filteredExperiments = experiments.filter(exp => {
    const matchesSearch = exp.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         exp.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || exp.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8 mt-16">
        {/* Hero section */}
        <div className="mb-10">
          <div className="text-center mb-8">
            <AnimatedText 
              text="Virtual Laboratory" 
              className="text-4xl font-bold mb-4" 
              tag="h1"
              animationType="focus"
              threshold={0.5}
            />
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Explore our collection of interactive physics experiments. Adjust variables, 
              observe outcomes, and <ShinyText text="earn achievements" /> as you learn.
            </p>
          </div>
        </div>

        {/* Filter controls */}
        <div className="mb-8 flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="relative w-full md:w-1/3">
            <SearchIcon className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search experiments..."
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          <div className="flex gap-2 flex-wrap">
            <Badge 
              className={`cursor-pointer text-sm px-3 py-1 ${selectedCategory === 'all' ? 'bg-virtlab-blue text-white' : 'bg-secondary hover:bg-virtlab-blue/20'}`} 
              onClick={() => setSelectedCategory('all')}
            >
              All
            </Badge>
            {experimentCategories.map(category => (
              <Badge
              key={category.id}
              className={`
                cursor-pointer
                text-sm
                px-3 py-1
                border border-virtlab-blue
                transition-colors duration-200
                ${selectedCategory === category.id
                  ? 'bg-virtlab-blue text-white'
                  : 'bg-transparent text-virtlab-blue hover:bg-virtlab-blue hover:text-white'}
              `}
              onClick={() => setSelectedCategory(category.id)}
            >
              {category.name}
            </Badge>
            
            ))}
          </div>
        </div>

        {/* Experiments grid */}
        {filteredExperiments.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredExperiments.map(experiment => (
              <ExperimentCard 
                key={experiment.id} 
                experiment={experiment} 
                onClick={() => navigate(`/experiment/${experiment.id}`)}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <Beaker className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-xl font-medium mb-2">No experiments found</h3>
            <p className="text-muted-foreground">Try adjusting your search or filter criteria</p>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Experiments;
