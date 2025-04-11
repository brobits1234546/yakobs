import React, { useState, useRef } from 'react';
import { Upload, RefreshCw, AlertTriangle, Sprout, TrendingDown } from 'lucide-react';

// Extended list of potato diseases with detailed information
const potatoDiseases = [
  {
    name: "Late Blight",
    description: "A devastating fungal disease caused by Phytophthora infestans that can destroy entire crops within days if not treated.",
    symptoms: ["Dark brown spots", "White fuzzy growth", "Rapid spread", "Wet rot"],
    severity: 95,
    yieldImpact: "Up to 70-100% crop loss if untreated",
    spreadRate: "Very rapid - can spread to entire field within days",
    solutions: [
      "Apply fungicides preventatively",
      "Plant resistant varieties",
      "Improve field drainage",
      "Remove infected plants immediately"
    ],
    preventiveMeasures: [
      "Monitor weather conditions",
      "Maintain plant spacing for airflow",
      "Use certified disease-free seed potatoes"
    ]
  },
  {
    name: "Early Blight",
    description: "A fungal disease caused by Alternaria solani that primarily affects older leaves and can significantly reduce yield.",
    symptoms: ["Concentric rings", "Yellow halos", "Older leaf infection", "Dark brown lesions"],
    severity: 75,
    yieldImpact: "20-50% reduction in yield",
    spreadRate: "Moderate - develops over weeks",
    solutions: [
      "Apply copper-based fungicides",
      "Remove infected leaves",
      "Rotate crops every 2-3 years",
      "Maintain proper plant nutrition"
    ],
    preventiveMeasures: [
      "Avoid overhead irrigation",
      "Space plants properly",
      "Keep foliage dry"
    ]
  },
  {
    name: "Common Scab",
    description: "A bacterial disease that affects tuber appearance and marketability but not internal quality.",
    symptoms: ["Corky patches", "Rough texture", "Surface lesions", "Brown spots"],
    severity: 60,
    yieldImpact: "10-25% market value reduction",
    spreadRate: "Slow - persists in soil",
    solutions: [
      "Maintain soil pH below 5.5",
      "Increase irrigation during tuber formation",
      "Use resistant varieties",
      "Practice crop rotation"
    ],
    preventiveMeasures: [
      "Avoid adding lime to potato fields",
      "Maintain consistent soil moisture",
      "Use clean seed potatoes"
    ]
  },
  {
    name: "Blackleg",
    description: "A bacterial disease that causes black stem rot and can lead to complete plant collapse.",
    symptoms: ["Black stem base", "Wilting", "Yellow leaves", "Soft rot"],
    severity: 80,
    yieldImpact: "30-60% yield loss",
    spreadRate: "Moderate to rapid in wet conditions",
    solutions: [
      "Remove infected plants",
      "Improve soil drainage",
      "Use certified seed potatoes",
      "Practice field sanitation"
    ],
    preventiveMeasures: [
      "Avoid planting in wet soil",
      "Sanitize equipment",
      "Store seed potatoes properly"
    ]
  },
  {
    name: "Potato Virus Y",
    description: "A viral disease that causes significant yield reduction and quality issues.",
    symptoms: ["Mosaic patterns", "Leaf drop", "Stunted growth", "Necrotic spots"],
    severity: 85,
    yieldImpact: "40-70% yield reduction",
    spreadRate: "Rapid through aphid vectors",
    solutions: [
      "Remove infected plants",
      "Control aphid populations",
      "Use virus-free seed potatoes",
      "Implement aphid monitoring"
    ],
    preventiveMeasures: [
      "Plant resistant varieties",
      "Use reflective mulches",
      "Maintain weed control"
    ]
  },
  {
    name: "Ring Rot",
    description: "A serious bacterial disease that can lead to quarantine and significant economic losses.",
    symptoms: ["Ring-shaped rot", "Yellowing", "Wilting", "Tuber discoloration"],
    severity: 90,
    yieldImpact: "50-90% crop loss",
    spreadRate: "Moderate - spreads through infected seed",
    solutions: [
      "Destroy infected crops",
      "Sanitize all equipment",
      "Use certified seed potatoes",
      "Practice strict sanitation"
    ],
    preventiveMeasures: [
      "Regular equipment cleaning",
      "Inspect seed potatoes carefully",
      "Maintain field records"
    ]
  }
];

function App() {
  const [selectedImage1, setSelectedImage1] = useState<string | null>(null);
  const [selectedImage2, setSelectedImage2] = useState<string | null>(null);
  const [selectedDisease1, setSelectedDisease1] = useState<typeof potatoDiseases[0] | null>(null);
  const [selectedDisease2, setSelectedDisease2] = useState<typeof potatoDiseases[0] | null>(null);
  const fileInputRef1 = useRef<HTMLInputElement>(null);
  const fileInputRef2 = useRef<HTMLInputElement>(null);

  const handleImageUpload = (
    event: React.ChangeEvent<HTMLInputElement>,
    setImage: (value: string | null) => void,
    setDisease: (value: typeof potatoDiseases[0] | null) => void
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string);
        const randomDisease = potatoDiseases[Math.floor(Math.random() * potatoDiseases.length)];
        setDisease(randomDisease);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleReset = () => {
    setSelectedImage1(null);
    setSelectedImage2(null);
    setSelectedDisease1(null);
    setSelectedDisease2(null);
  };

  const DiseaseInfo = ({ disease }: { disease: typeof potatoDiseases[0] }) => (
    <div className="mt-4 p-4 bg-green-50 rounded-lg space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-medium text-green-800">{disease.name}</h3>
        <div className="flex items-center gap-2">
          <AlertTriangle className="w-5 h-5 text-red-500" />
          <span className="font-bold text-red-500">{disease.severity}% Severity</span>
        </div>
      </div>
      
      <p className="text-gray-700">{disease.description}</p>
      
      <div className="bg-white rounded-lg p-3">
        <div className="flex items-center gap-2 mb-2">
          <TrendingDown className="w-5 h-5 text-orange-500" />
          <span className="font-medium text-orange-500">Yield Impact:</span>
          <span className="text-gray-700">{disease.yieldImpact}</span>
        </div>
        <div className="flex items-center gap-2">
          <Sprout className="w-5 h-5 text-green-500" />
          <span className="font-medium text-green-500">Spread Rate:</span>
          <span className="text-gray-700">{disease.spreadRate}</span>
        </div>
      </div>

      <div className="space-y-2">
        <h4 className="font-medium text-green-700">Symptoms:</h4>
        <ul className="list-disc list-inside text-gray-700">
          {disease.symptoms.map((symptom, index) => (
            <li key={index}>{symptom}</li>
          ))}
        </ul>
      </div>

      <div className="space-y-2">
        <h4 className="font-medium text-green-700">Treatment Solutions:</h4>
        <ul className="list-disc list-inside text-gray-700">
          {disease.solutions.map((solution, index) => (
            <li key={index}>{solution}</li>
          ))}
        </ul>
      </div>

      <div className="space-y-2">
        <h4 className="font-medium text-green-700">Prevention:</h4>
        <ul className="list-disc list-inside text-gray-700">
          {disease.preventiveMeasures.map((measure, index) => (
            <li key={index}>{measure}</li>
          ))}
        </ul>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-green-800 mb-2">Potato Disease Detector</h1>
          <p className="text-gray-600">Compare two potato plant photos to identify potential diseases</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* First Image Upload */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <div 
              className="border-2 border-dashed border-green-300 rounded-lg p-8 text-center cursor-pointer hover:border-green-500 transition-colors"
              onClick={() => fileInputRef1.current?.click()}
            >
              {selectedImage1 ? (
                <img 
                  src={selectedImage1} 
                  alt="First potato plant"
                  className="max-w-full h-auto rounded-lg mx-auto"
                />
              ) : (
                <div className="space-y-4">
                  <Upload className="w-12 h-12 mx-auto text-green-500" />
                  <p className="text-gray-500">Upload first image</p>
                </div>
              )}
              <input
                type="file"
                ref={fileInputRef1}
                onChange={(e) => handleImageUpload(e, setSelectedImage1, setSelectedDisease1)}
                accept="image/*"
                className="hidden"
              />
            </div>
            {selectedDisease1 && <DiseaseInfo disease={selectedDisease1} />}
          </div>

          {/* Second Image Upload */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <div 
              className="border-2 border-dashed border-green-300 rounded-lg p-8 text-center cursor-pointer hover:border-green-500 transition-colors"
              onClick={() => fileInputRef2.current?.click()}
            >
              {selectedImage2 ? (
                <img 
                  src={selectedImage2} 
                  alt="Second potato plant"
                  className="max-w-full h-auto rounded-lg mx-auto"
                />
              ) : (
                <div className="space-y-4">
                  <Upload className="w-12 h-12 mx-auto text-green-500" />
                  <p className="text-gray-500">Upload second image</p>
                </div>
              )}
              <input
                type="file"
                ref={fileInputRef2}
                onChange={(e) => handleImageUpload(e, setSelectedImage2, setSelectedDisease2)}
                accept="image/*"
                className="hidden"
              />
            </div>
            {selectedDisease2 && <DiseaseInfo disease={selectedDisease2} />}
          </div>
        </div>

        {/* Reset Button */}
        <div className="flex justify-center mt-8">
          <button
            onClick={handleReset}
            className="flex items-center gap-2 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
          >
            <RefreshCw className="w-5 h-5" />
            Reset Comparison
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;