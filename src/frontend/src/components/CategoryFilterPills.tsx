import { Cpu, Music, UtensilsCrossed } from "lucide-react";
import { Category } from "../types";

interface CategoryFilterPillsProps {
  selected: Category[];
  onChange: (categories: Category[]) => void;
  counts?: Record<Category, number>;
}

const PILL_CONFIG: {
  category: Category;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  activeClass: string;
}[] = [
  {
    category: Category.Music,
    label: "Music",
    icon: Music,
    activeClass:
      "bg-purple-500/20 text-purple-300 border-purple-500/50 shadow-sm shadow-purple-500/10",
  },
  {
    category: Category.Tech,
    label: "Tech",
    icon: Cpu,
    activeClass:
      "bg-blue-500/20 text-blue-300 border-blue-500/50 shadow-sm shadow-blue-500/10",
  },
  {
    category: Category.Food,
    label: "Food",
    icon: UtensilsCrossed,
    activeClass:
      "bg-accent/20 text-accent border-accent/50 shadow-sm shadow-accent/10",
  },
];

export function CategoryFilterPills({
  selected,
  onChange,
  counts,
}: CategoryFilterPillsProps) {
  const toggle = (cat: Category) => {
    if (selected.includes(cat)) {
      onChange(selected.filter((c) => c !== cat));
    } else {
      onChange([...selected, cat]);
    }
  };

  const clearAll = () => onChange([]);

  return (
    <div
      className="flex items-center gap-2 flex-wrap"
      data-ocid="category.filter_section"
    >
      <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider mr-1">
        Filter:
      </span>

      {PILL_CONFIG.map(({ category, label, icon: Icon, activeClass }) => {
        const isActive = selected.includes(category);
        const count = counts?.[category];
        return (
          <button
            key={category}
            type="button"
            onClick={() => toggle(category)}
            aria-pressed={isActive}
            data-ocid={`category.filter_pill.${label.toLowerCase()}`}
            className={`
              inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-sm font-medium
              border transition-smooth cursor-pointer select-none
              focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring
              ${
                isActive
                  ? activeClass
                  : "bg-muted/50 text-muted-foreground border-border hover:bg-muted hover:text-foreground"
              }
            `}
          >
            <Icon className="w-3.5 h-3.5 shrink-0" />
            {label}
            {count !== undefined && (
              <span
                className={`
                  ml-0.5 inline-flex items-center justify-center min-w-[1.25rem] h-5 px-1
                  rounded-full text-[10px] font-bold tabular-nums leading-none
                  ${isActive ? "bg-white/20 text-current" : "bg-border text-muted-foreground"}
                `}
                data-ocid={`category.count_badge.${label.toLowerCase()}`}
              >
                {count}
              </span>
            )}
          </button>
        );
      })}

      {selected.length > 0 && (
        <button
          type="button"
          onClick={clearAll}
          data-ocid="category.clear_button"
          className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-full text-xs font-medium text-muted-foreground border border-transparent hover:border-border hover:text-foreground hover:bg-muted/50 transition-smooth focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          Clear all
        </button>
      )}
    </div>
  );
}
