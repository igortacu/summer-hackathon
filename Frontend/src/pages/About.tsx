import React from 'react';
import Layout from '@/components/layout/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Award, 
  BookOpen, 
  Globe, 
  Heart, 
  Lightbulb, 
  Rocket, 
  Target, 
  Users, 
  Zap,
  ArrowRight,
  CheckCircle,
  Star,
  TrendingUp,
  Shield,
  Clock,
  Microscope,
  Brain,
  Atom
} from 'lucide-react';
import AnimatedText from '@/components/animations/AnimatedText';
import ShinyText from '@/components/animations/ShinyText';
import { useNavigate } from 'react-router-dom';
import CountUp from '@/components/ui/CountUp';

const About = () => {
  const navigate = useNavigate();

  const values = [
    {
      icon: <Lightbulb className="h-8 w-8" />,
      title: "Innovation",
      description: "We constantly push the boundaries of what's possible in virtual education, pioneering new technologies and methodologies."
    },
    {
      icon: <Heart className="h-8 w-8" />,
      title: "Accessibility",
      description: "Quality education should be available to everyone, everywhere. We break down barriers to make learning truly universal."
    },
    {
      icon: <Target className="h-8 w-8" />,
      title: "Excellence",
      description: "We maintain the highest standards in everything we do, from our technology to our educational content and user experience."
    },
    {
      icon: <Users className="h-8 w-8" />,
      title: "Community",
      description: "Learning is better together. We foster a global community of learners, educators, and innovators working toward common goals."
    }
  ];

  const milestones = [
    {
      year: "03/03/2025",
      title: "Foundation",
      description: "VirtLab was founded with a vision to revolutionize science education through virtual reality and AI.",
      icon: <Rocket className="h-6 w-6" />
    },
    {
      year: "01/09/2025",
      title: "First Platform Launch",
      description: "Launched our first virtual laboratory with 10 physics experiments, serving 1,000 students.",
      icon: <Microscope className="h-6 w-6" />
    },
  ];

const leadership = [
  {
    name: 'Tacu Igor',
    role: 'CEO & Co-Founder',
    photo: '/igor.jpg',
    tagline: 'I believe every student deserves a chance to experiment - safely and affordably',
    linkedin: 'https://linkedin.com/in/igor-tacu'
  },
  {
    name: 'Toderita Loredana',
    role: 'CFO & Co-Founder',
    photo: '/loredana.jpg',
    tagline: 'Precision in budgeting and analytics to fuel growth.',
    linkedin: 'https://linkedin.com/in/loredana-toderita'
  }
];

const coreTeam = [
  {
    name: 'Temciuc Adelina',
    role: 'CMO & Head of Design',
    photo: '/adelina.jpg',
    tagline: 'Data-driven storytelling that turns experiments into journeys.',
    linkedin: 'https://linkedin.com/in/adelina-temciuc'
  },
  {
    name: 'Canter Daniel',
    role: 'CIO',
    photo: '/daniel.jpg',
    tagline: 'Bullet-proof infrastructure for seamless learning.',
    linkedin: 'https://linkedin.com/in/daniel-canter'
  },
  {
    name: 'Pancenco Ina',
    role: 'COO',
    photo: '/ina.jpg',
    tagline: 'Flawless QA & process design for every lab.',
    linkedin: 'https://linkedin.com/in/ina-pancenco'
  }
];
const renderCard = (member) => (
    <div className="relative group">
      <Card className="pt-14 pb-8 px-6 rounded-2xl shadow-lg hover:shadow-2xl transition-transform transform-gpu group-hover:-translate-y-2 bg-white">
        {/* Avatar */}
        <div className="absolute -top-12 left-1/2 transform -translate-x-1/2">
          <div className="w-32 h-32 p-1 rounded-full bg-gradient-to-br from-purple-500 to-blue-500">
            <img
              src={member.photo}
              alt={member.name}
              className="w-full h-full object-cover rounded-full border-2 border-white"
            />
          </div>
        </div>

        <CardContent className="mt-8 text-center">
          <h3 className="text-xl font-bold text-gray-900">{member.name}</h3>
          <p className="text-sm text-muted-foreground mb-4">{member.role}</p>
          <p className="text-gray-600 italic mb-6">“{member.tagline}”</p>
          <Button
            variant="outline"
            size="sm"
            asChild
            className="border-gray-300 hover:border-gray-400"
          >
            <a
              href={member.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2"
            >
              <Users className="h-4 w-4 text-gray-600" />
              Connect
            </a>
          </Button>
        </CardContent>
      </Card>
    </div>
  );

const stats = [
   { value: 500000, suffix: '+',  label: "Active Students", icon: <Users className="h-6 w-6" /> },
   { value: 10000,  suffix: '+',  label: "Educators",      icon: <BookOpen className="h-6 w-6" /> },
   { value: 50,     suffix: '+',  label: "Countries",      icon: <Globe className="h-6 w-6" /> },
   { value: 200,    suffix: '+',  label: "Experiments",    icon: <Microscope className="h-6 w-6" /> },
   { value: 99,     suffix: '%',  label: "Uptime",         icon: <Shield className="h-6 w-6" /> },
   { value: 4,     suffix: '/5', label: "User Rating",    icon: <Star className="h-6 w-6" /> }
 ];


  return (
    <Layout>
      <div className="container mx-auto px-4 py-8 mt-16">
        {/* Hero Section */}
        <section className="text-center mb-20">
          <Badge variant="outline" className="mb-6 py-2 px-4">
            🌟 Our Story
          </Badge>
          <AnimatedText 
            text="Transforming Education" 
            className="text-4xl md:text-6xl font-bold mb-6" 
            tag="h1"
            animationType="focus"
            threshold={0.3}
          />
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
            We're on a mission to make <ShinyText text="world-class science education" /> accessible to every student, 
            everywhere. Through cutting-edge technology and innovative pedagogy, we're building the future of learning.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" onClick={() => navigate('/experiments')}>
              <Rocket className="mr-2 h-5 w-5" />
              Start Learning
            </Button>
<Button
  variant="outline"
  size="lg"
  onClick={() => navigate('/features')}
>
  <Users className="mr-2 h-5 w-5" />
  Join Our Community
</Button>

          </div>
        </section>

        {/* Mission Statement */}
        <section className="mb-20">
          <Card className="p-8 md:p-12 bg-gradient-to-br from-virtlab-blue/5 to-blue-50 border-0">
            <div className="text-center">
              <h2 className="text-3xl font-bold mb-6">Our Mission</h2>
              <p className="text-xl text-muted-foreground leading-relaxed max-w-4xl mx-auto">
                To democratize access to high-quality science education by creating immersive, 
                interactive virtual laboratories that make complex scientific concepts accessible, 
                engaging, and safe for learners worldwide. We believe that every student deserves 
                the opportunity to explore, experiment, and discover the wonders of science, 
                regardless of their location or resources.
              </p>
            </div>
          </Card>
        </section>

        {/* Values */}
        <section className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Our Values</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              The principles that guide everything we do and shape our vision for the future of education
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <Card key={index} className="text-center p-6 hover:shadow-lg transition-all duration-300 hover:-translate-y-2">
                <div className="flex justify-center mb-4">
                  <div className="p-3 rounded-xl bg-gradient-to-br from-virtlab-blue to-blue-500 text-white">
                    {value.icon}
                  </div>
                </div>
                <h3 className="text-xl font-bold mb-3">{value.title}</h3>
                <p className="text-muted-foreground">{value.description}</p>
              </Card>
            ))}
          </div>
        </section>

        {/* Stats */}
        {/*<section className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Impact by Numbers</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              See how VirtLab is making a difference in education worldwide
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {stats.map((stat, index) => (
              <Card key={index} className="text-center p-6 bg-gradient-to-br from-white to-gray-50">
                <div className="flex justify-center mb-3">
                  <div className="p-2 rounded-lg bg-virtlab-blue/10 text-virtlab-blue">
                    {stat.icon}
                  </div>
                </div>
                <div className="text-2xl font-bold text-virtlab-blue mb-1">
                 <CountUp
                   from={0}
                   to={stat.value}
                   separator=","
                   duration={1.5}
                   className="inline-block"
                 />
                 {stat.suffix}
               </div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </Card>
            ))}
          </div>
        </section>*/}

        {/* Timeline */}
        <section className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Our Journey</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              From a simple idea to a global platform transforming education
            </p>
          </div>

          <div className="relative">
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-virtlab-blue/20 hidden md:block"></div>
            
            <div className="space-y-12">
              {milestones.map((milestone, index) => (
                <div key={index} className={`flex items-center ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                  <div className={`flex-1 ${index % 2 === 0 ? 'md:pr-8' : 'md:pl-8'}`}>
                    <Card className="p-6 hover:shadow-lg transition-shadow duration-300">
                      <div className="flex items-center gap-4 mb-4">
                        <div className="p-2 rounded-lg bg-virtlab-blue text-white">
                          {milestone.icon}
                        </div>
                        <div>
                          <Badge className="mb-2">{milestone.year}</Badge>
                          <h3 className="text-xl font-bold">{milestone.title}</h3>
                        </div>
                      </div>
                      <p className="text-muted-foreground">{milestone.description}</p>
                    </Card>
                  </div>
                  
                  <div className="hidden md:flex w-4 h-4 bg-virtlab-blue rounded-full border-4 border-white shadow-lg z-10"></div>
                  
                  <div className="flex-1"></div>
                </div>
              ))}
            </div>
          </div>
        </section>

      {/* Meet Our Team */}
        <section>
          <div className="text-center mb-12">
            <h2 className="text-5xl font-extrabold mb-4">Meet Our Team</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              The passionate innovators driving VirtLab forward
            </p>
          </div>

          {/* Leadership */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-20">
            {leadership.map(renderCard)}
          </div>

          {/* Core Team */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
            {coreTeam.map(renderCard)}
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default About;