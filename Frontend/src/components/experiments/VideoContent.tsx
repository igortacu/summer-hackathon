
import React from 'react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { TheorySection } from '@/types/experiments';
import { Card } from '@/components/ui/card';
import { Book } from 'lucide-react';

interface VideoContentProps {
  videoUrl: string;
  theory?: TheorySection[];
}

const VideoContent: React.FC<VideoContentProps> = ({ videoUrl, theory = [] }) => {
  // Process YouTube URL to extract video ID and add parameters to hide branding
  const getEmbedUrl = (url: string) => {
    // Extract video ID from YouTube URL
    let videoId = '';
    
    if (url.includes('youtu.be/')) {
      videoId = url.split('youtu.be/')[1].split('?')[0];
    } else if (url.includes('youtube.com/watch')) {
      const urlParams = new URLSearchParams(url.split('?')[1]);
      videoId = urlParams.get('v') || '';
    } else if (url.includes('youtube.com/embed/')) {
      videoId = url.split('youtube.com/embed/')[1].split('?')[0];
    } else {
      // If it's already a video ID
      videoId = url;
    }
    
    // Clean up any remaining parameters or hash
    videoId = videoId.split('&')[0].split('#')[0];
    
    // Create embed URL with parameters to hide branding and related videos
    return `https://www.youtube.com/embed/${videoId}?rel=0&modestbranding=1&showinfo=0&controls=1&color=white&iv_load_policy=3`;
  };

  return (
    <div className="space-y-6">
      <div className="bg-slate-50 p-4 rounded-lg border">
        <div className="aspect-video overflow-hidden rounded-lg">
          <iframe 
            src={getEmbedUrl(videoUrl)}
            title="Experiment Video"
            className="w-full h-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            frameBorder="0"
          />
        </div>
      </div>
      
      {theory && theory.length > 0 && (
        <Card className="p-6">
          <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <Book className="h-5 w-5 text-virtlab-blue" /> 
            Theoretical Framework
          </h3>
          
          <Accordion type="single" collapsible className="w-full">
            {theory.map((section, index) => (
              <AccordionItem key={index} value={`section-${index}`}>
                <AccordionTrigger className="text-lg font-medium py-4">
                  {section.title}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed pt-2 pb-4">
                  {section.content}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </Card>
      )}
    </div>
  );
};

export default VideoContent;
