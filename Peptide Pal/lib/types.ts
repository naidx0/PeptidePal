export interface FormData {
  email: string
  phone: string
  preferredIngestion: string
  name: string
  age: string
  heightFt: string
  heightIn: string
  weight: string
  biologicalSex: string
  goals: string[]
  activityLevel: string
  healthConditions: string
  medications: string
}

export interface PeptideRecommendation {
  name: string
  mechanism: string
  whyItFits: string
  typicalDosage: string
  frequency: string
  bestTimeToAdminister: string
  stackingOptions: string
  contraindications: string
}
