export interface DiseaseInfo {
  id: string;
  name: string;
  scientificName?: string;
  description: string;
  symptoms: string[];
  causes: string[];
  severity: 'low' | 'medium' | 'high';
  affectedCrops: string[];
  treatments: {
    organic: Treatment[];
    chemical: Treatment[];
    biological: Treatment[];
  };
  prevention: string[];
  spreadMethod: string;
  optimalConditions: string;
}

export interface Treatment {
  name: string;
  type: 'fungicide' | 'bactericide' | 'insecticide' | 'fertilizer' | 'organic' | 'biological';
  activeIngredient?: string;
  dosage: string;
  applicationMethod: string;
  frequency: string;
  purchaseLinks: PurchaseLink[];
  price: string;
  effectiveness: number; // 1-10 scale
}

export interface PurchaseLink {
  retailer: string;
  url: string;
  price: string;
  availability: string;
}

export const diseaseDatabase: Record<string, DiseaseInfo> = {
  "tomato_early_blight": {
    id: "tomato_early_blight",
    name: "Tomato Early Blight",
    scientificName: "Alternaria solani",
    description: "Early blight is a common fungal disease that affects tomato plants, causing dark spots on leaves and reducing fruit quality. It thrives in warm, humid conditions and can severely impact crop yields if left untreated.",
    symptoms: [
      "Dark brown to black spots on lower leaves",
      "Concentric ring patterns in spots (target-like appearance)",
      "Yellowing around spots",
      "Leaf drop starting from bottom of plant",
      "Stem lesions with dark, sunken areas",
      "Fruit rot near the stem end"
    ],
    causes: [
      "Alternaria solani fungus",
      "High humidity (above 80%)",
      "Warm temperatures (75-85°F)",
      "Poor air circulation",
      "Overhead watering",
      "Plant stress from nutrient deficiency"
    ],
    severity: "medium",
    affectedCrops: ["Tomato", "Potato", "Eggplant", "Pepper"],
    treatments: {
      organic: [
        {
          name: "Neem Oil Spray",
          type: "organic",
          activeIngredient: "Azadirachtin",
          dosage: "2-3 tablespoons per gallon of water",
          applicationMethod: "Foliar spray",
          frequency: "Every 7-10 days",
          purchaseLinks: [
            {
              retailer: "Amazon",
              url: "https://amazon.com/neem-oil-organic",
              price: "$12.99",
              availability: "In Stock"
            },
            {
              retailer: "Home Depot",
              url: "https://homedepot.com/neem-oil",
              price: "$14.99",
              availability: "In Stock"
            }
          ],
          price: "$12.99 - $14.99",
          effectiveness: 7
        },
        {
          name: "Baking Soda Spray",
          type: "organic",
          activeIngredient: "Sodium bicarbonate",
          dosage: "1 tablespoon per gallon + 1 tsp dish soap",
          applicationMethod: "Foliar spray",
          frequency: "Every 5-7 days",
          purchaseLinks: [
            {
              retailer: "Local Grocery Store",
              url: "#",
              price: "$2.99",
              availability: "Widely Available"
            }
          ],
          price: "$2.99",
          effectiveness: 5
        }
      ],
      chemical: [
        {
          name: "Chlorothalonil Fungicide",
          type: "fungicide",
          activeIngredient: "Chlorothalonil",
          dosage: "2 tablespoons per gallon",
          applicationMethod: "Foliar spray",
          frequency: "Every 7-14 days",
          purchaseLinks: [
            {
              retailer: "Amazon",
              url: "https://amazon.com/chlorothalonil-fungicide",
              price: "$24.99",
              availability: "In Stock"
            },
            {
              retailer: "Farm Supply Store",
              url: "https://farmsupply.com/chlorothalonil",
              price: "$22.99",
              availability: "In Stock"
            }
          ],
          price: "$22.99 - $24.99",
          effectiveness: 9
        },
        {
          name: "Copper Sulfate Spray",
          type: "fungicide",
          activeIngredient: "Copper sulfate",
          dosage: "1-2 tablespoons per gallon",
          applicationMethod: "Foliar spray",
          frequency: "Every 10-14 days",
          purchaseLinks: [
            {
              retailer: "Amazon",
              url: "https://amazon.com/copper-sulfate-spray",
              price: "$16.99",
              availability: "In Stock"
            }
          ],
          price: "$16.99",
          effectiveness: 8
        }
      ],
      biological: [
        {
          name: "Bacillus subtilis Bio-fungicide",
          type: "biological",
          activeIngredient: "Bacillus subtilis",
          dosage: "1-2 tablespoons per gallon",
          applicationMethod: "Foliar spray and soil drench",
          frequency: "Every 7-10 days",
          purchaseLinks: [
            {
              retailer: "Amazon",
              url: "https://amazon.com/bacillus-subtilis-fungicide",
              price: "$19.99",
              availability: "In Stock"
            },
            {
              retailer: "Garden Center",
              url: "https://gardencenter.com/bio-fungicide",
              price: "$18.99",
              availability: "In Stock"
            }
          ],
          price: "$18.99 - $19.99",
          effectiveness: 7
        }
      ]
    },
    prevention: [
      "Ensure proper plant spacing for air circulation",
      "Water at soil level to avoid wetting leaves",
      "Remove and destroy infected plant debris",
      "Rotate crops annually",
      "Apply mulch to prevent soil splash",
      "Maintain adequate nutrition, especially potassium"
    ],
    spreadMethod: "Airborne spores and water splash",
    optimalConditions: "Warm temperatures (75-85°F) with high humidity"
  },

  "tomato_late_blight": {
    id: "tomato_late_blight",
    name: "Tomato Late Blight",
    scientificName: "Phytophthora infestans",
    description: "Late blight is a devastating fungal-like disease that can destroy entire tomato crops within days. It's the same pathogen that caused the Irish Potato Famine and remains one of the most serious threats to tomato production worldwide.",
    symptoms: [
      "Dark green to black water-soaked spots on leaves",
      "White fuzzy mold on undersides of leaves",
      "Rapid leaf death and plant collapse",
      "Dark brown lesions on stems",
      "Firm, dark brown rot on green and ripe fruits",
      "Entire plant can die within 7-14 days"
    ],
    causes: [
      "Phytophthora infestans oomycete",
      "Cool, wet weather (60-70°F)",
      "High humidity (above 90%)",
      "Poor air circulation",
      "Infected seed potatoes nearby",
      "Contaminated garden tools"
    ],
    severity: "high",
    affectedCrops: ["Tomato", "Potato", "Eggplant"],
    treatments: {
      organic: [
        {
          name: "Copper Hydroxide Organic Fungicide",
          type: "organic",
          activeIngredient: "Copper hydroxide",
          dosage: "2-3 tablespoons per gallon",
          applicationMethod: "Foliar spray",
          frequency: "Every 5-7 days in wet weather",
          purchaseLinks: [
            {
              retailer: "Amazon",
              url: "https://amazon.com/copper-hydroxide-organic",
              price: "$21.99",
              availability: "In Stock"
            },
            {
              retailer: "Organic Garden Supply",
              url: "https://organicgarden.com/copper-hydroxide",
              price: "$19.99",
              availability: "In Stock"
            }
          ],
          price: "$19.99 - $21.99",
          effectiveness: 8
        }
      ],
      chemical: [
        {
          name: "Mancozeb Fungicide",
          type: "fungicide",
          activeIngredient: "Mancozeb",
          dosage: "2 tablespoons per gallon",
          applicationMethod: "Foliar spray",
          frequency: "Every 7-10 days",
          purchaseLinks: [
            {
              retailer: "Amazon",
              url: "https://amazon.com/mancozeb-fungicide",
              price: "$28.99",
              availability: "In Stock"
            },
            {
              retailer: "Agricultural Supply",
              url: "https://agsupply.com/mancozeb",
              price: "$26.99",
              availability: "In Stock"
            }
          ],
          price: "$26.99 - $28.99",
          effectiveness: 9
        },
        {
          name: "Metalaxyl-M Fungicide",
          type: "fungicide",
          activeIngredient: "Metalaxyl-M",
          dosage: "1-2 tablespoons per gallon",
          applicationMethod: "Foliar spray and soil drench",
          frequency: "Every 10-14 days",
          purchaseLinks: [
            {
              retailer: "Farm Supply Store",
              url: "https://farmsupply.com/metalaxyl-m",
              price: "$34.99",
              availability: "In Stock"
            }
          ],
          price: "$34.99",
          effectiveness: 10
        }
      ],
      biological: [
        {
          name: "Trichoderma Bio-fungicide",
          type: "biological",
          activeIngredient: "Trichoderma harzianum",
          dosage: "1-2 tablespoons per gallon",
          applicationMethod: "Foliar spray and soil application",
          frequency: "Every 7-10 days",
          purchaseLinks: [
            {
              retailer: "Amazon",
              url: "https://amazon.com/trichoderma-fungicide",
              price: "$23.99",
              availability: "In Stock"
            }
          ],
          price: "$23.99",
          effectiveness: 7
        }
      ]
    },
    prevention: [
      "Plant resistant varieties when available",
      "Ensure excellent air circulation",
      "Avoid overhead watering",
      "Remove infected plants immediately",
      "Apply preventive fungicide sprays",
      "Monitor weather conditions closely"
    ],
    spreadMethod: "Airborne spores, especially in cool, wet conditions",
    optimalConditions: "Cool, wet weather (60-70°F) with high humidity"
  },

  "healthy": {
    id: "healthy",
    name: "Healthy Plant",
    description: "Your plant appears to be healthy with no visible signs of disease. Continue with regular care and monitoring to maintain plant health.",
    symptoms: [
      "Vibrant green foliage",
      "No spots or lesions",
      "Good plant structure",
      "Normal growth pattern"
    ],
    causes: ["Good plant health management"],
    severity: "low",
    affectedCrops: ["All crops"],
    treatments: {
      organic: [
        {
          name: "Organic Fertilizer",
          type: "fertilizer",
          activeIngredient: "Balanced NPK",
          dosage: "Follow package instructions",
          applicationMethod: "Soil application",
          frequency: "Monthly during growing season",
          purchaseLinks: [
            {
              retailer: "Amazon",
              url: "https://amazon.com/organic-fertilizer",
              price: "$15.99",
              availability: "In Stock"
            }
          ],
          price: "$15.99",
          effectiveness: 8
        }
      ],
      chemical: [],
      biological: []
    },
    prevention: [
      "Continue regular watering schedule",
      "Maintain good soil drainage",
      "Monitor for early signs of problems",
      "Ensure adequate nutrition",
      "Maintain proper spacing"
    ],
    spreadMethod: "N/A - Healthy plant",
    optimalConditions: "Optimal growing conditions maintained"
  },

  "potato_early_blight": {
    id: "potato_early_blight",
    name: "Potato Early Blight",
    scientificName: "Alternaria solani",
    description: "Early blight in potatoes causes significant yield losses by affecting foliage and tubers. The disease creates characteristic target-spot lesions and can reduce tuber quality.",
    symptoms: [
      "Dark brown spots with concentric rings on leaves",
      "Yellowing around leaf spots",
      "Defoliation starting from lower leaves",
      "Stem lesions with dark, sunken areas",
      "Tuber lesions that are dark and slightly sunken"
    ],
    causes: [
      "Alternaria solani fungus",
      "Warm, humid conditions",
      "Poor air circulation",
      "Plant stress",
      "Mechanical damage"
    ],
    severity: "medium",
    affectedCrops: ["Potato", "Tomato"],
    treatments: {
      organic: [
        {
          name: "Bordeaux Mixture",
          type: "organic",
          activeIngredient: "Copper sulfate + lime",
          dosage: "2-3 tablespoons per gallon",
          applicationMethod: "Foliar spray",
          frequency: "Every 7-10 days",
          purchaseLinks: [
            {
              retailer: "Amazon",
              url: "https://amazon.com/bordeaux-mixture",
              price: "$18.99",
              availability: "In Stock"
            }
          ],
          price: "$18.99",
          effectiveness: 8
        }
      ],
      chemical: [
        {
          name: "Azoxystrobin Fungicide",
          type: "fungicide",
          activeIngredient: "Azoxystrobin",
          dosage: "1-2 tablespoons per gallon",
          applicationMethod: "Foliar spray",
          frequency: "Every 10-14 days",
          purchaseLinks: [
            {
              retailer: "Farm Supply Store",
              url: "https://farmsupply.com/azoxystrobin",
              price: "$32.99",
              availability: "In Stock"
            }
          ],
          price: "$32.99",
          effectiveness: 9
        }
      ],
      biological: []
    },
    prevention: [
      "Plant certified disease-free seed potatoes",
      "Ensure proper spacing",
      "Avoid overhead irrigation",
      "Remove infected plant debris",
      "Crop rotation"
    ],
    spreadMethod: "Airborne spores and water splash",
    optimalConditions: "Warm, humid weather"
  },

  "corn_common_rust": {
    id: "corn_common_rust",
    name: "Corn Common Rust",
    scientificName: "Puccinia sorghi",
    description: "Common rust is a fungal disease that affects corn plants, causing small, reddish-brown pustules on leaves. While generally not devastating, it can reduce yields in severe infections.",
    symptoms: [
      "Small, reddish-brown pustules on leaves",
      "Pustules break open to release rust-colored spores",
      "Yellowing of affected leaves",
      "Premature leaf death in severe cases",
      "Reduced photosynthesis"
    ],
    causes: [
      "Puccinia sorghi fungus",
      "Cool, moist conditions",
      "High humidity",
      "Dense plant populations",
      "Susceptible corn varieties"
    ],
    severity: "medium",
    affectedCrops: ["Corn", "Sorghum"],
    treatments: {
      organic: [
        {
          name: "Sulfur Fungicide",
          type: "organic",
          activeIngredient: "Sulfur",
          dosage: "2-3 tablespoons per gallon",
          applicationMethod: "Foliar spray",
          frequency: "Every 7-10 days",
          purchaseLinks: [
            {
              retailer: "Amazon",
              url: "https://amazon.com/sulfur-fungicide",
              price: "$13.99",
              availability: "In Stock"
            }
          ],
          price: "$13.99",
          effectiveness: 7
        }
      ],
      chemical: [
        {
          name: "Propiconazole Fungicide",
          type: "fungicide",
          activeIngredient: "Propiconazole",
          dosage: "1-2 tablespoons per gallon",
          applicationMethod: "Foliar spray",
          frequency: "Every 14-21 days",
          purchaseLinks: [
            {
              retailer: "Agricultural Supply",
              url: "https://agsupply.com/propiconazole",
              price: "$38.99",
              availability: "In Stock"
            }
          ],
          price: "$38.99",
          effectiveness: 9
        }
      ],
      biological: []
    },
    prevention: [
      "Plant resistant varieties",
      "Ensure proper plant spacing",
      "Avoid overhead irrigation",
      "Remove infected plant debris",
      "Monitor weather conditions"
    ],
    spreadMethod: "Airborne spores",
    optimalConditions: "Cool, moist weather with high humidity"
  },

  "apple_scab": {
    id: "apple_scab",
    name: "Apple Scab",
    scientificName: "Venturia inaequalis",
    description: "Apple scab is one of the most important diseases of apple trees, causing significant economic losses. It affects leaves, fruits, and shoots, reducing both yield and fruit quality.",
    symptoms: [
      "Olive-green to black spots on leaves",
      "Velvety appearance on leaf spots",
      "Scab-like lesions on fruits",
      "Cracking and distortion of fruits",
      "Premature leaf drop",
      "Reduced fruit quality and storability"
    ],
    causes: [
      "Venturia inaequalis fungus",
      "Cool, wet spring weather",
      "High humidity",
      "Poor air circulation",
      "Infected fallen leaves"
    ],
    severity: "high",
    affectedCrops: ["Apple", "Pear", "Crabapple"],
    treatments: {
      organic: [
        {
          name: "Lime Sulfur Spray",
          type: "organic",
          activeIngredient: "Calcium polysulfide",
          dosage: "2-3 tablespoons per gallon",
          applicationMethod: "Foliar spray",
          frequency: "Every 7-10 days during wet weather",
          purchaseLinks: [
            {
              retailer: "Amazon",
              url: "https://amazon.com/lime-sulfur-spray",
              price: "$17.99",
              availability: "In Stock"
            }
          ],
          price: "$17.99",
          effectiveness: 8
        }
      ],
      chemical: [
        {
          name: "Captan Fungicide",
          type: "fungicide",
          activeIngredient: "Captan",
          dosage: "2 tablespoons per gallon",
          applicationMethod: "Foliar spray",
          frequency: "Every 7-14 days",
          purchaseLinks: [
            {
              retailer: "Farm Supply Store",
              url: "https://farmsupply.com/captan",
              price: "$29.99",
              availability: "In Stock"
            }
          ],
          price: "$29.99",
          effectiveness: 9
        }
      ],
      biological: []
    },
    prevention: [
      "Plant resistant varieties",
      "Ensure good air circulation",
      "Remove fallen leaves",
      "Prune for better air flow",
      "Apply dormant oil in spring"
    ],
    spreadMethod: "Airborne spores from infected leaves",
    optimalConditions: "Cool, wet weather in spring"
  }
};

export function getDiseaseInfo(diseaseId: string): DiseaseInfo | null {
  const normalizedId = diseaseId.toLowerCase().replace(/\s+/g, '_');
  
  // Try direct lookup first
  if (diseaseDatabase[normalizedId]) {
    return diseaseDatabase[normalizedId];
  }
  
  // Try to find by name matching
  for (const disease of Object.values(diseaseDatabase)) {
    if (disease.name.toLowerCase().includes(diseaseId.toLowerCase()) ||
        diseaseId.toLowerCase().includes(disease.name.toLowerCase())) {
      return disease;
    }
  }
  
  return null;
}

export function getAllDiseases(): DiseaseInfo[] {
  return Object.values(diseaseDatabase);
}

export function getDiseasesByCategory(category: 'low' | 'medium' | 'high'): DiseaseInfo[] {
  return Object.values(diseaseDatabase).filter(disease => disease.severity === category);
}

export function searchDiseases(query: string): DiseaseInfo[] {
  const lowercaseQuery = query.toLowerCase();
  return Object.values(diseaseDatabase).filter(disease => 
    disease.name.toLowerCase().includes(lowercaseQuery) ||
    disease.description.toLowerCase().includes(lowercaseQuery) ||
    disease.symptoms.some(symptom => symptom.toLowerCase().includes(lowercaseQuery)) ||
    disease.affectedCrops.some(crop => crop.toLowerCase().includes(lowercaseQuery))
  );
}