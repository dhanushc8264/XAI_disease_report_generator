import React, { useState } from 'react';
import { Heart, Activity, User, DollarSign, Shield, Info } from 'lucide-react';

const DiabetesForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    // Vitals
    systolicBP: '',
    diastolicBP: '',
    cholesterolLevel: '',
    bmi: '',
    
    // Lifestyle
    smokingStatus: '',
    physicalActivity: '',
    heavyAlcoholUse: '',
    
    // Medical History
    heartDisease: '',
    difficultyWalking: '',
    stroke: '',
    cholesterolCheck: '',
    
    // Demographics
    sex: '',
    age: '',
    annualIncome: '',
    generalHealth: ''
  });

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = () => {
    onSubmit(formData);
  };

  const incomeRanges = [
    '<10k', '10k–20k', '20k–30k', '30k–40k', '40k–50k', 
    '50k–60k', '60k–70k', '>70k'
  ];

  const Tooltip = ({ text, children }) => (
    <div className="relative group">
      {children}
      <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-gray-800 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-10 shadow-lg">
        {text}
        <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-gray-800"></div>
      </div>
    </div>
  );

  return (
    <div className="space-y-8">
      {/* Vitals Section */}
      <div className="bg-white rounded-xl shadow-lg p-6 border border-blue-200">
        <div className="flex items-center gap-3 mb-6">
          <div className="bg-blue-100 p-2 rounded-lg">
            <Heart className="w-5 h-5 text-blue-600" />
          </div>
          <h2 className="text-xl font-semibold text-gray-800">Vitals</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Systolic Blood Pressure (mmHg)
              <Tooltip text="The upper number in your blood pressure reading. Normal is usually around 120 mmHg.">
                <Info className="inline w-4 h-4 ml-1 text-gray-400 cursor-help" />
              </Tooltip>
            </label>
            <input
              type="number"
              placeholder="120"
              value={formData.systolicBP}
              onChange={(e) => handleInputChange('systolicBP', e.target.value)}
              className="w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 placeholder-gray-500"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Diastolic Blood Pressure (mmHg)
              <Tooltip text="The lower number in your blood pressure reading. Normal is usually around 80 mmHg.">
                <Info className="inline w-4 h-4 ml-1 text-gray-400 cursor-help" />
              </Tooltip>
            </label>
            <input
              type="number"
              placeholder="80"
              value={formData.diastolicBP}
              onChange={(e) => handleInputChange('diastolicBP', e.target.value)}
              className="w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 placeholder-gray-500"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Cholesterol Level (mg/dL)
              <Tooltip text="Total cholesterol level. Normal is usually less than 200 mg/dL.">
                <Info className="inline w-4 h-4 ml-1 text-gray-400 cursor-help" />
              </Tooltip>
            </label>
            <input
              type="number"
              placeholder="200"
              value={formData.cholesterolLevel}
              onChange={(e) => handleInputChange('cholesterolLevel', e.target.value)}
              className="w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 placeholder-gray-500"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              BMI (Body Mass Index)
              <Tooltip text="Weight in kg divided by height in meters squared. Normal range is 18.5-24.9.">
                <Info className="inline w-4 h-4 ml-1 text-gray-400 cursor-help" />
              </Tooltip>
            </label>
            <input
              type="number"
              step="0.1"
              placeholder="25.0"
              value={formData.bmi}
              onChange={(e) => handleInputChange('bmi', e.target.value)}
              className="w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 placeholder-gray-500"
            />
            <p className="text-xs text-gray-500 mt-1">
              Calculate BMI: Weight (kg) ÷ Height (m)²
            </p>
          </div>
        </div>
      </div>

      {/* Lifestyle Section */}
      <div className="bg-white rounded-xl shadow-lg p-6 border border-green-200">
        <div className="flex items-center gap-3 mb-6">
          <div className="bg-green-100 p-2 rounded-lg">
            <Activity className="w-5 h-5 text-green-600" />
          </div>
          <h2 className="text-xl font-semibold text-gray-800">Lifestyle</h2>
        </div>
        
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Do you currently smoke or have you smoked in the past 12 months?
            </label>
            <div className="flex gap-4">
              <label className="flex items-center">
                <input
                  type="radio"
                  name="smokingStatus"
                  value="yes"
                  checked={formData.smokingStatus === 'yes'}
                  onChange={(e) => handleInputChange('smokingStatus', e.target.value)}
                  className="w-4 h-4 text-blue-600 focus:ring-blue-500 bg-white border-gray-300"
                />
                <span className="ml-2 text-sm text-gray-700">Yes</span>
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="smokingStatus"
                  value="no"
                  checked={formData.smokingStatus === 'no'}
                  onChange={(e) => handleInputChange('smokingStatus', e.target.value)}
                  className="w-4 h-4 text-blue-600 focus:ring-blue-500 bg-white border-gray-300"
                />
                <span className="ml-2 text-sm text-gray-700">No</span>
              </label>
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Do you get at least some form of regular physical activity or exercise?
            </label>
            <div className="flex gap-4">
              <label className="flex items-center">
                <input
                  type="radio"
                  name="physicalActivity"
                  value="yes"
                  checked={formData.physicalActivity === 'yes'}
                  onChange={(e) => handleInputChange('physicalActivity', e.target.value)}
                  className="w-4 h-4 text-blue-600 focus:ring-blue-500 bg-white border-gray-300"
                />
                <span className="ml-2 text-sm text-gray-700">Yes</span>
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="physicalActivity"
                  value="no"
                  checked={formData.physicalActivity === 'no'}
                  onChange={(e) => handleInputChange('physicalActivity', e.target.value)}
                  className="w-4 h-4 text-blue-600 focus:ring-blue-500 bg-white border-gray-300"
                />
                <span className="ml-2 text-sm text-gray-700">No</span>
              </label>
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Do you consume more than 14 (men) or 7 (women) alcoholic drinks per week?
            </label>
            <div className="flex gap-4">
              <label className="flex items-center">
                <input
                  type="radio"
                  name="heavyAlcoholUse"
                  value="yes"
                  checked={formData.heavyAlcoholUse === 'yes'}
                  onChange={(e) => handleInputChange('heavyAlcoholUse', e.target.value)}
                  className="w-4 h-4 text-blue-600 focus:ring-blue-500 bg-white border-gray-300"
                />
                <span className="ml-2 text-sm text-gray-700">Yes</span>
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="heavyAlcoholUse"
                  value="no"
                  checked={formData.heavyAlcoholUse === 'no'}
                  onChange={(e) => handleInputChange('heavyAlcoholUse', e.target.value)}
                  className="w-4 h-4 text-blue-600 focus:ring-blue-500 bg-white border-gray-300"
                />
                <span className="ml-2 text-sm text-gray-700">No</span>
              </label>
            </div>
          </div>
        </div>
      </div>

      {/* Medical History Section */}
      <div className="bg-white rounded-xl shadow-lg p-6 border border-red-200">
        <div className="flex items-center gap-3 mb-6">
          <div className="bg-red-100 p-2 rounded-lg">
            <Shield className="w-5 h-5 text-red-600" />
          </div>
          <h2 className="text-xl font-semibold text-gray-800">Medical History</h2>
        </div>
        
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Have you ever been told by a doctor that you had a heart attack, coronary heart disease, or angina?
            </label>
            <div className="flex gap-4">
              <label className="flex items-center">
                <input
                  type="radio"
                  name="heartDisease"
                  value="yes"
                  checked={formData.heartDisease === 'yes'}
                  onChange={(e) => handleInputChange('heartDisease', e.target.value)}
                  className="w-4 h-4 text-blue-600 focus:ring-blue-500 bg-white border-gray-300"
                />
                <span className="ml-2 text-sm text-gray-700">Yes</span>
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="heartDisease"
                  value="no"
                  checked={formData.heartDisease === 'no'}
                  onChange={(e) => handleInputChange('heartDisease', e.target.value)}
                  className="w-4 h-4 text-blue-600 focus:ring-blue-500 bg-white border-gray-300"
                />
                <span className="ml-2 text-sm text-gray-700">No</span>
              </label>
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Do you have serious difficulty walking or climbing stairs?
            </label>
            <div className="flex gap-4">
              <label className="flex items-center">
                <input
                  type="radio"
                  name="difficultyWalking"
                  value="yes"
                  checked={formData.difficultyWalking === 'yes'}
                  onChange={(e) => handleInputChange('difficultyWalking', e.target.value)}
                  className="w-4 h-4 text-blue-600 focus:ring-blue-500 bg-white border-gray-300"
                />
                <span className="ml-2 text-sm text-gray-700">Yes</span>
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="difficultyWalking"
                  value="no"
                  checked={formData.difficultyWalking === 'no'}
                  onChange={(e) => handleInputChange('difficultyWalking', e.target.value)}
                  className="w-4 h-4 text-blue-600 focus:ring-blue-500 bg-white border-gray-300"
                />
                <span className="ml-2 text-sm text-gray-700">No</span>
              </label>
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Have you ever had a stroke?
            </label>
            <div className="flex gap-4">
              <label className="flex items-center">
                <input
                  type="radio"
                  name="stroke"
                  value="yes"
                  checked={formData.stroke === 'yes'}
                  onChange={(e) => handleInputChange('stroke', e.target.value)}
                  className="w-4 h-4 text-blue-600 focus:ring-blue-500 bg-white border-gray-300"
                />
                <span className="ml-2 text-sm text-gray-700">Yes</span>
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="stroke"
                  value="no"
                  checked={formData.stroke === 'no'}
                  onChange={(e) => handleInputChange('stroke', e.target.value)}
                  className="w-4 h-4 text-blue-600 focus:ring-blue-500 bg-white border-gray-300"
                />
                <span className="ml-2 text-sm text-gray-700">No</span>
              </label>
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Have you had your cholesterol checked in the past 5 years?
            </label>
            <div className="flex gap-4">
              <label className="flex items-center">
                <input
                  type="radio"
                  name="cholesterolCheck"
                  value="yes"
                  checked={formData.cholesterolCheck === 'yes'}
                  onChange={(e) => handleInputChange('cholesterolCheck', e.target.value)}
                  className="w-4 h-4 text-blue-600 focus:ring-blue-500 bg-white border-gray-300"
                />
                <span className="ml-2 text-sm text-gray-700">Yes</span>
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="cholesterolCheck"
                  value="no"
                  checked={formData.cholesterolCheck === 'no'}
                  onChange={(e) => handleInputChange('cholesterolCheck', e.target.value)}
                  className="w-4 h-4 text-blue-600 focus:ring-blue-500 bg-white border-gray-300"
                />
                <span className="ml-2 text-sm text-gray-700">No</span>
              </label>
            </div>
          </div>
        </div>
      </div>

      {/* Demographics Section */}
      <div className="bg-white rounded-xl shadow-lg p-6 border border-purple-200">
        <div className="flex items-center gap-3 mb-6">
          <div className="bg-purple-100 p-2 rounded-lg">
            <User className="w-5 h-5 text-purple-600" />
          </div>
          <h2 className="text-xl font-semibold text-gray-800">Demographics</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Sex
            </label>
            <div className="flex gap-4">
              <label className="flex items-center">
                <input
                  type="radio"
                  name="sex"
                  value="male"
                  checked={formData.sex === 'male'}
                  onChange={(e) => handleInputChange('sex', e.target.value)}
                  className="w-4 h-4 text-blue-600 focus:ring-blue-500 bg-white border-gray-300"
                />
                <span className="ml-2 text-sm text-gray-700">Male</span>
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="sex"
                  value="female"
                  checked={formData.sex === 'female'}
                  onChange={(e) => handleInputChange('sex', e.target.value)}
                  className="w-4 h-4 text-blue-600 focus:ring-blue-500 bg-white border-gray-300"
                />
                <span className="ml-2 text-sm text-gray-700">Female</span>
              </label>
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Age
            </label>
            <input
              type="number"
              placeholder="35"
              value={formData.age}
              onChange={(e) => handleInputChange('age', e.target.value)}
              className="w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 placeholder-gray-500"
            />
          </div>
          
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Annual Income
            </label>
            <select
              value={formData.annualIncome}
              onChange={(e) => handleInputChange('annualIncome', e.target.value)}
              className="w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
            >
              <option value="">Select income range</option>
              {incomeRanges.map(range => (
                <option key={range} value={range}>{range}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* General Health Section */}
      <div className="bg-white rounded-xl shadow-lg p-6 border border-orange-200">
        <div className="flex items-center gap-3 mb-6">
          <div className="bg-orange-100 p-2 rounded-lg">
            <DollarSign className="w-5 h-5 text-orange-600" />
          </div>
          <h2 className="text-xl font-semibold text-gray-800">General Health</h2>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            How would you rate your general health?
          </label>
          <div className="space-y-2">
            {[
              { value: '1', label: 'Excellent' },
              { value: '2', label: 'Very Good' },
              { value: '3', label: 'Good' },
              { value: '4', label: 'Fair' },
              { value: '5', label: 'Poor' }
            ].map(option => (
              <label key={option.value} className="flex items-center">
                <input
                  type="radio"
                  name="generalHealth"
                  value={option.value}
                  checked={formData.generalHealth === option.value}
                  onChange={(e) => handleInputChange('generalHealth', e.target.value)}
                  className="w-4 h-4 text-blue-600 focus:ring-blue-500 bg-white border-gray-300"
                />
                <span className="ml-2 text-sm text-gray-700">{option.label}</span>
              </label>
            ))}
          </div>
        </div>
      </div>

      {/* Submit Button */}
      <div className="flex justify-center">
        <button
          onClick={handleSubmit}
          className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transform hover:scale-105 transition-all duration-200 shadow-lg"
        >
          Submit Assessment
        </button>
      </div>
    </div>
  );
};

export default DiabetesForm;