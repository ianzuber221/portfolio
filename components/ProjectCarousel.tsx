// components/ProjectCarousel.tsx
'use client';

import { useEffect, useState } from 'react';
import ProjectCard from './ProjectCard';

const privateProjects = [
  {
    title: 'PassLink Cloud Web App',
    description: 'Lead developer for Bayer’s internal web platform. Angular, GCP, role-based routing.',
    techStack: ['Angular', 'GCP', 'NestJS', 'MongoDB'],
  },
  {
    title: 'PassLink API (Release 1)',
    description: 'Built the API from scratch using Node, Express, and MongoDB. Later migrated to AWS Lambda.',
    techStack: ['Node.js', 'Express', 'MongoDB', 'AWS Lambda'],
  },
  {
    title: 'PassLink Mobile',
    description: 'V&V support and bug fixing for Angular + Capacitor hybrid app.',
    techStack: ['Angular', 'Capacitor', 'V&V', 'Documentation'],
  },
];

export default function ProjectCarousel() {
  const [current, setCurrent] = useState(0);
  const [projects, setProjects] = useState([...privateProjects]);


  const prev = () => setCurrent((current - 1 + projects.length) % projects.length);
  const next = () => setCurrent((current + 1) % projects.length);

  useEffect(() => {
    const fetchProjects = async () => {
      const res = await fetch('/api/github-projects');
      const data = await res.json();
      setProjects((projects) => projects.concat(data));
    };
    fetchProjects();
  }, []);

  return (
    <div className="relative w-full flex items-center justify-center py-12 overflow-hidden">
      <div className="relative w-[800px] h-72 perspective">
        <div className="relative w-full h-full flex items-center justify-center">
          {projects.map((proj, index) => {
            const offset = index - current;
            const transform = `translateX(${offset * 300}px) rotateY(${offset * -30}deg) scale(${1 - Math.abs(offset) * 0.1})`;
            const zIndex = 10 - Math.abs(offset);
            const isCenter = offset === 0;

            return (
              <div
                key={index}
                className={`absolute transition-all duration-500 ease-in-out`}
                style={{
                  transform,
                  zIndex,
                  opacity: isCenter ? 1 : 0.6,
                  filter: isCenter ? 'none' : 'blur(1px)',
                }}
              >
                <ProjectCard {...proj} />
              </div>
            );
          })}
        </div>
      </div>

      {/* Navigation */}
      <button onClick={prev} className="absolute left-4 p-2 text-2xl">&#8592;</button>
      <button onClick={next} className="absolute right-4 p-2 text-2xl">&#8594;</button>
    </div>
  );
}