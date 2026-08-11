// Mock AI engine — simulates an LLM product co-designer.
// Swap `analyzeIdea` with a real API call later; the shape stays the same.

export type Spec = {
  productType: string;
  useCase: string;
  style: string;
  budget: number;
  quality: string;
  interpretation: string;
};

export type Design = {
  id: "A" | "B" | "C";
  name: string;
  tagline: string;
  cost: number;
  materials: string;
  dimensions: string;
  quality: string;
  score: number;
};

export type Material = {
  name: string;
  stars: number;
  durability: number;
  cost: string;
  fit: number;
  why: string;
};

const KEYWORDS: { match: string[]; type: string; use: string; dims: string }[] = [
  {
    match: ["طاولة", "table"],
    type: "طاولة مقهى",
    use: "استخدام تجاري يومي",
    dims: "120 × 70 × 75 سم",
  },
  { match: ["كرسي", "chair"], type: "كرسي مقهى", use: "جلوس تجاري مكثف", dims: "45 × 50 × 90 سم" },
  { match: ["رف", "شيلف"], type: "رف عرض", use: "عرض منتجات داخلي", dims: "180 × 40 × 200 سم" },
  { match: ["مكتب"], type: "مكتب عمل", use: "استخدام مكتبي يومي", dims: "140 × 70 × 75 سم" },
  { match: ["كاونتر", "بار"], type: "كاونتر خدمة", use: "تشغيل أمامي مستمر", dims: "200 × 60 × 105 سم" },
];

function detect(idea: string) {
  const found = KEYWORDS.find((k) => k.match.some((m) => idea.includes(m)));
  return found ?? { type: "منتج مخصص", use: "استخدام تجاري", dims: "110 × 60 × 75 سم" };
}

export function analyzeIdea(idea: string): Spec {
  const d = detect(idea);
  const budgetMatch = idea.match(/(\d{3,6})/);
  const budget = budgetMatch ? Number(budgetMatch[1]) : 800;
  const style = /كلاسيك|تراث/.test(idea)
    ? "Classic"
    : /صناع|اندست|industrial/i.test(idea)
      ? "Industrial"
      : "Modern";
  const quality = budget >= 1500 ? "Premium" : budget >= 600 ? "High" : "Standard";

  return {
    productType: d.type,
    useCase: d.use,
    style,
    budget,
    quality,
    interpretation: `فهم النظام أنك تحتاج ${d.type} بطابع ${style} مخصص لـ${d.use}، بميزانية تقديرية ${budget} ريال ومستوى جودة ${quality}. تم ترجيح المواد المقاومة للاستخدام المتكرر، مع أبعاد قياسية ${d.dims} لتقليل الهدر في القص وتسريع التصنيع.`,
  };
}

export function generateDesigns(spec: Spec): Design[] {
  const b = spec.budget;
  const dims = detect(spec.productType).dims;
  return [
    {
      id: "A",
      name: "Smart Essential",
      tagline: "أقل تكلفة تشغيلية مع أداء موثوق",
      cost: Math.round(b * 0.65),
      materials: "MDF مقاوم للرطوبة + قاعدة معدنية مطلية",
      dimensions: dims,
      quality: "جيدة",
      score: 97,
    },
    {
      id: "B",
      name: "Balanced Premium",
      tagline: "التوازن الأمثل بين الشكل والتكلفة",
      cost: Math.round(b * 0.86),
      materials: "MDF مقاوم للرطوبة + قشرة خشب طبيعي",
      dimensions: dims,
      quality: "عالية",
      score: 94,
    },
    {
      id: "C",
      name: "Premium Design",
      tagline: "خامات فاخرة وتفاصيل تصنيع دقيقة",
      cost: Math.round(b * 1.03),
      materials: "خشب Oak صلب + تشطيب زيتي",
      dimensions: dims,
      quality: "فاخرة",
      score: 88,
    },
  ];
}

export const MATERIALS: Material[] = [
  {
    name: "MDF مقاوم للرطوبة",
    stars: 5,
    durability: 88,
    cost: "منخفضة",
    fit: 94,
    why: "يوفر أعلى نسبة أداء مقابل التكلفة لبيئة المقاهي، ويتحمل التنظيف المتكرر والرطوبة، كما أن سهولة قصه تقلل زمن التصنيع والهدر.",
  },
  {
    name: "Oak Wood",
    stars: 5,
    durability: 97,
    cost: "مرتفعة",
    fit: 91,
    why: "أعلى متانة وقيمة بصرية، لكنه يرفع التكلفة ووقت التشطيب، ويُنصح به عند أولوية العمر التشغيلي الطويل.",
  },
  {
    name: "Plywood",
    stars: 4,
    durability: 90,
    cost: "متوسطة",
    fit: 93,
    why: "خيار وسط ممتاز من ناحية الثبات الهيكلي ومقاومة الالتواء، مناسب عند الحاجة لخفة الوزن.",
  },
];

export const FEASIBILITY_CHECKS = [
  "الأبعاد قابلة للتنفيذ",
  "المادة متوفرة",
  "التصميم مناسب لعمليات التصنيع",
  "لا توجد تعارضات رئيسية",
  "التكلفة ضمن النطاق",
];

export const OPTIMIZATION_STEPS = [
  "تغيير المادة في جزء غير مؤثر",
  "تقليل كمية المادة",
  "تبسيط جزء من التصميم",
  "تحسين طريقة التصنيع",
];

export function optimizeCost(current: number, budget: number) {
  const target = Math.min(current, Math.round(budget * 0.993));
  return {
    newCost: target,
    formRetained: 93,
    functionRetained: 95,
    qualityRetained: 90,
  };
}

export function productId() {
  return `SA-2026-00128`;
}
