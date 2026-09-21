// app/page.tsx or wherever you're rendering
import ProjectCarousel from '@/components/ProjectCarousel';

export default function Home() {
  return (
    <div className="py-20">
      <h2 className="text-3xl font-bold text-center mb-8">My Projects</h2>
      <ProjectCarousel />
    </div>
  );
}