import projectileImage from '../data/projectileM.png';
import pendulum from '../data/pendulum.png';
import circuit from '../data/electric.png';
import refraction from '../data/refraction.png';
import newton from '../data/newtons.png';
import sound from '../data/sounds.png';
import engine from '../data/engine.png';

export const experimentCategories = [
  {
    id: 'mechanics',
    name: 'Mechanics',
    icon: 'CircleGauge'
  },
  {
    id: 'waves',
    name: 'Waves',
    icon: 'Beaker'
  },
  {
    id: 'electricity',
    name: 'Electricity',
    icon: 'Atom'
  },
  {
    id: 'optics',
    name: 'Optics',
    icon: 'Flask'
  },
  {
    id: 'thermodynamics',
    name: 'Thermodynamics',
    icon: 'Flame'
  }
];

export const experiments = [
  {
    id: 1,
    title: 'Projectile Motion',
    description: 'Simulate and analyze the trajectory of objects launched at different angles and velocities.',
    category: 'mechanics',
    difficulty: 'Beginner',
    completed: false,
    progress: 0,
    image: projectileImage,
    xp: 25
  },
  {
    id: 2,
    title: 'Pendulum Waves',
    description: 'Explore the fascinating patterns created by multiple pendulums of different lengths.',
    category: 'waves',
    difficulty: 'Intermediate',
    completed: false,
    progress: 0,
    image: pendulum,
    xp: 35
  },
  {
    id: 3,
    title: 'Electric Circuits',
    description: 'Build and analyze various electric circuits to understand current, voltage, and resistance.',
    category: 'electricity',
    difficulty: 'Intermediate',
    completed: false,
    progress: 0,
    image: circuit,
    xp: 30
  },
  {
    id: 4,
    title: 'Light Refraction',
    description: 'Investigate how light bends when passing through different mediums.',
    category: 'optics',
    difficulty: 'Beginner',
    completed: false,
    progress: 0,
    image: refraction,
    xp: 20
  },
  {
    id: 5,
    title: 'Newton\'s Laws',
    description: 'Interactive experiments demonstrating Newton\'s three laws of motion.',
    category: 'mechanics',
    difficulty: 'Beginner',
    completed: false,
    progress: 0,
    image: newton,
    xp: 25
  },
  {
    id: 6,
    title: 'Sound Wave Properties',
    description: 'Explore frequency, amplitude, and interference patterns of sound waves.',
    category: 'waves',
    difficulty: 'Intermediate',
    completed: false,
    progress: 0,
    image: sound,
    xp: 30
  },
  {
    id: 7,
    title: 'Internal Combustion Engine',
    description: 'Explore the principles of thermodynamics and mechanics in a four-stroke internal combustion engine.',
    category: 'thermodynamics',
    difficulty: 'Advanced',
    completed: false,
    progress: 0,
    image: engine,
    xp: 40,
    hasVideo: true,
    videoUrl: 'https://www.youtube.com/embed/Ooc6cr7li1A',
    theory: [
      {
        title: 'Four-Stroke Cycle',
        content: 'The four-stroke cycle consists of intake, compression, power, and exhaust strokes. During the intake stroke, the piston moves downward while the intake valve opens, drawing air-fuel mixture into the cylinder. In the compression stroke, both valves close as the piston moves upward, compressing the mixture. The power stroke begins when the spark plug ignites the compressed mixture, forcing the piston downward and generating mechanical energy. Finally, the exhaust stroke expels burned gases as the piston moves upward with the exhaust valve open.'
      },
      {
        title: 'Thermodynamic Principles',
        content: 'Internal combustion engines operate on the principles of thermodynamics, converting chemical energy from fuel into mechanical work. The Otto cycle, which models the four-stroke gasoline engine, consists of isentropic compression, constant-volume heat addition, isentropic expansion, and constant-volume heat rejection. The efficiency of this cycle is determined by the compression ratio and the specific heat ratio of the working fluid.'
      },
      {
        title: 'Engine Components',
        content: 'Key components include the cylinder block (engine body), pistons (moving components that transfer force), crankshaft (converts linear piston motion into rotation), camshaft (controls valve timing), valves (regulate gas flow), and spark plugs (ignite the fuel mixture). The precise coordination of these components is essential for efficient engine operation.'
      },
      {
        title: 'Environmental Considerations',
        content: 'Modern internal combustion engines implement various technologies to reduce emissions, including catalytic converters, exhaust gas recirculation, and advanced fuel injection systems. Despite these improvements, concerns about air pollution and climate change have accelerated the development of alternative propulsion technologies like electric motors and hydrogen fuel cells.'
      }
    ]
  }
];
