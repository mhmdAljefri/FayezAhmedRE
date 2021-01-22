export const MOBILE_NUMBER = process.env.NEXT_PUBLIC_MOBILE_NUMBER
export const WHATSAPP_NUMBER = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER

export const EXPLOARE_TYPES_TEXT = {
  dontMissitGallery: "لايفوتك",
  getInspiredGallery: "استمد الالهام",
  exploreGallery: "أكتشف",
}

export const ZOD_MESSAGES_TRANSLATIONS = {
  Required: "الحقل مطلوب",
}

export const PROJECT_STATUS = [
  { id: "completed", name: "مكتمل" },
  { id: "inprogress", name: "قيد التطوير" },
  { id: "resell", name: "اعادة بيع" },
  { id: "installment", name: "جاهز وتقسيط" },
  { id: "compatible_installment", name: "تقسيط مريح" },
  { id: "ocean_view", name: "اطلالات بحرية" },
]

export const TURKEY_PROJECT_STATUS = [
  ...PROJECT_STATUS,
  { id: "granted_by_gov", name: "بضمان حكومي" },
]

export const PRICE_RANG = [
  { id: [50000, 100000], name: "50k - 100k" },
  { id: [100000, 150000], name: "100k - 150k" },
  { id: [150000, 250000], name: "150k - 250k" },
  { id: [250000, 400000], name: "250k - 400k" },
  { id: [400000, 600000], name: "400k - 600k" },
  { id: [600000, 1000000], name: "600k - 1M" },
  { id: [1000000, 2000000], name: "1M - 2M" },
  { id: [2000000, 100000000], name: "+2M" },
]

export const PRICE_RANG_QATAR = [
  { id: [0, 1000000], name: "0 - 1M" },
  { id: [1000000, 2000000], name: "1M - 2M" },
  { id: [2000000, 3000000], name: "2M - 3M" },
  { id: [3000000, 4000000], name: "3M - 4M" },
  { id: [4000000, 5000000], name: "4M - 5M" },
  { id: [5000000, 6000000], name: "5M - 6M" },
  { id: [6000000, 60000000], name: "+6M" },
]
