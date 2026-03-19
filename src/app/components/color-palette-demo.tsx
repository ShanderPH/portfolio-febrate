export function ColorPaletteDemo() {
  const colorGroups = [
    {
      title: "Earth Stone Scale",
      colors: [
        { name: "stone-50", class: "bg-[var(--stone-50)]", textClass: "text-[var(--stone-900)]" },
        { name: "stone-100", class: "bg-[var(--stone-100)]", textClass: "text-[var(--stone-900)]" },
        { name: "stone-200", class: "bg-[var(--stone-200)]", textClass: "text-[var(--stone-900)]" },
        { name: "stone-300", class: "bg-[var(--stone-300)]", textClass: "text-[var(--stone-900)]" },
        { name: "stone-400", class: "bg-[var(--stone-400)]", textClass: "text-[var(--stone-900)]" },
        { name: "stone-500", class: "bg-[var(--stone-500)]", textClass: "text-[var(--stone-50)]" },
        { name: "stone-600", class: "bg-[var(--stone-600)]", textClass: "text-[var(--stone-50)]" },
        { name: "stone-700", class: "bg-[var(--stone-700)]", textClass: "text-[var(--stone-50)]" },
        { name: "stone-800", class: "bg-[var(--stone-800)]", textClass: "text-[var(--stone-50)]" },
        { name: "stone-900", class: "bg-[var(--stone-900)]", textClass: "text-[var(--stone-50)]" },
        { name: "stone-950", class: "bg-[var(--stone-950)]", textClass: "text-[var(--stone-50)]" },
      ],
    },
    {
      title: "Semantic Colors",
      colors: [
        { name: "background", class: "bg-background", textClass: "text-foreground" },
        { name: "foreground", class: "bg-foreground", textClass: "text-background" },
        { name: "surface", class: "bg-surface", textClass: "text-foreground" },
        { name: "default", class: "bg-default", textClass: "text-foreground" },
        { name: "muted", class: "bg-muted", textClass: "text-white" },
        { name: "accent", class: "bg-accent", textClass: "text-accent-foreground" },
      ],
    },
    {
      title: "Status Colors",
      colors: [
        { name: "success", class: "bg-success", textClass: "text-[var(--success-foreground)]" },
        { name: "warning", class: "bg-warning", textClass: "text-[var(--warning-foreground)]" },
        { name: "danger", class: "bg-danger", textClass: "text-[var(--danger-foreground)]" },
      ],
    },
  ];

  return (
    <section className="mb-12 sm:mb-16">
      <h2 className="mb-6 text-2xl font-semibold sm:mb-8">Color Palette</h2>
      
      {colorGroups.map((group) => (
        <div key={group.title} className="mb-8">
          <h3 className="mb-4 text-lg font-medium text-muted">{group.title}</h3>
          <div className="grid gap-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
            {group.colors.map((color) => (
              <div
                key={color.name}
                className={`flex h-20 items-end rounded-xl p-3 transition-transform hover:scale-105 ${color.class}`}
              >
                <span className={`text-xs font-medium ${color.textClass}`}>
                  {color.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      ))}

      <div className="mt-8 rounded-2xl bg-surface p-6 shadow-surface">
        <h3 className="mb-4 text-lg font-medium">Surface & Shadow Demo</h3>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <div className="rounded-xl bg-surface p-4 shadow-surface">
            <p className="font-medium">Surface Shadow</p>
            <p className="text-sm text-muted">Cards, accordions</p>
          </div>
          <div className="rounded-xl bg-overlay p-4 shadow-overlay">
            <p className="font-medium">Overlay Shadow</p>
            <p className="text-sm text-muted">Modals, popovers</p>
          </div>
          <div className="rounded-xl bg-default p-4">
            <p className="font-medium">Default Background</p>
            <p className="text-sm text-muted">Neutral containers</p>
          </div>
        </div>
      </div>
    </section>
  );
}
