import { profile } from "@/lib/profile";

export function Skills() {
  return (
    <section id="skills" className="container-page py-8">
      <div className="card p-6 sm:p-8">
        <p className="eyebrow">Toolbox</p>
        <div className="mt-5 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {profile.skillGroups.map((group) => (
            <div key={group.label}>
              <h3 className="text-sm font-semibold">{group.label}</h3>
              <ul className="mt-3 flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <li key={item} className="chip">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
