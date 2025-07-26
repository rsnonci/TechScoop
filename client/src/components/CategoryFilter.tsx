import { Button } from "@/components/ui/button";

interface CategoryFilterProps {
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
}

export default function CategoryFilter({ selectedCategory, onCategoryChange }: CategoryFilterProps) {
  const categories = [
    { id: "", name: "All", count: null },
    { id: "AI", name: "AI", count: null },
    { id: "Startups", name: "Startups", count: null },
    { id: "Hardware", name: "Hardware", count: null },
    { id: "Security", name: "Security", count: null },
    { id: "Software", name: "Software", count: null },
  ];

  return (
    <section className="mb-8">
      <div className="flex flex-wrap gap-3">
        {categories.map((category) => (
          <Button
            key={category.id}
            onClick={() => onCategoryChange(category.id)}
            variant={selectedCategory === category.id ? "default" : "outline"}
            size="sm"
            className={
              selectedCategory === category.id
                ? "bg-primary text-white hover:bg-primary/90"
                : "bg-white border-slate-200 text-slate-700 hover:border-primary hover:text-primary"
            }
          >
            {category.name}
          </Button>
        ))}
      </div>
    </section>
  );
}
