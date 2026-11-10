// Small helpers shared by several components.

// "Alkaline Earth Metal" -> "cat-alkaline-earth-metal"
// The CSS file uses these class names to color each category.
export function categoryClass(category) {
  return "cat-" + category.toLowerCase().replace(/\s+/g, "-");
}
