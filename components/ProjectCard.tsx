// components/ProjectCard.tsx
'use client';

import { useRef, useState } from 'react';

type ProjectCardProps = {
    title: string;
    description: string;
    url?: string;
    language?: string;
    techStack?: string[];
};

export default function ProjectCard({ title, description, techStack }: ProjectCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [transform, setTransform] = useState('rotateX(0deg) rotateY(0deg)');

  const handleMouseMove = (e: React.MouseEvent) => {
    const card = cardRef.current;
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left; // mouse X on card
    const y = e.clientY - rect.top;  // mouse Y on card

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    // How far from center, as a percentage of width/height
    const percentX = (x - centerX) / centerX;
    const percentY = (y - centerY) / centerY;

    const rotateY = percentX * 10; // Max tilt: 15deg
    const rotateX = percentY * -10;

    setTransform(`rotateX(${rotateX}deg) rotateY(${rotateY}deg)`);
  };

  const handleMouseLeave = () => {
    setTransform('rotateX(0deg) rotateY(0deg)');
  };

  return (
    <div
      ref={cardRef}
      className="bg-white shadow-xl rounded-2xl p-6 w-80 h-64 flex flex-col justify-between transition-transform duration-100 ease-out will-change-transform"
      style={{
        transform,
        transformStyle: 'preserve-3d',
        perspective: '100px',
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div>
        <h3 className="text-xl font-semibold">{title}</h3>
        <p className="text-sm mt-2 text-zinc-600">{description}</p>
      </div>
      <div className="flex flex-wrap gap-2 text-xs text-zinc-500 mt-4">
        {techStack?.length && techStack.map((t) => (
          <span
            key={t}
            className="bg-zinc-100 px-2 py-1 rounded-md border border-zinc-200"
          >
            {t}
          </span>
        ))}
      </div>
    </div>
  );
}