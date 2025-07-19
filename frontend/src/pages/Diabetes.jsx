import React, { useState } from 'react';
import { Heart, Activity, User, DollarSign, Shield, Info, AlertTriangle, CheckCircle } from 'lucide-react';
import '../styles/diabetes-form-styles.css'; 
import { predictDiabetes } from '../api/diseaseApi';
import { useNavigate } from "react-router-dom";

// DiabetesForm Component
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
  const [errors, setErrors] = useState({});
 
  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    
    // Clear error on input
    if (errors[field]) {
      setErrors(prevErrors => ({
        ...prevErrors,
        [field]: ''
      }));
    }
  };

  const handleSubmit = () => {
    const newErrors = {};

    if (!formData.age) newErrors.age = "Age is required";
    if (!formData.sex) newErrors.sex = "Sex is required";
    if (!formData.systolicBP) newErrors.systolicBP = "Systolic BP is required";
    if (!formData.diastolicBP) newErrors.diastolicBP = "Diastolic BP is required";
    if (!formData.cholesterolLevel) newErrors.cholesterolLevel = "Cholesterol level is required";
    if (!formData.bmi) newErrors.bmi = "BMI is required";
    if (!formData.smokingStatus) newErrors.smokingStatus = "Smoking status is required";
    if (!formData.physicalActivity) newErrors.physicalActivity = "Physical activity info is required";
    if (!formData.heavyAlcoholUse) newErrors.heavyAlcoholUse = "Alcohol usage is required";
    if (!formData.heartDisease) newErrors.heartDisease = "Heart disease info is required";
    if (!formData.difficultyWalking) newErrors.difficultyWalking = "Difficulty walking info is required";
    if (!formData.stroke) newErrors.stroke = "Stroke history is required";
    if (!formData.cholesterolCheck) newErrors.cholesterolCheck = "Cholesterol check info is required";
    if (!formData.annualIncome) newErrors.annualIncome = "Income info is required";
    if (!formData.generalHealth) newErrors.generalHealth = "Health rating is required";

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      onSubmit(formData);
    }
  };

  const incomeRanges = [
    '<10k', '10k–20k', '20k–30k', '30k–40k', '40k–50k', 
    '50k–60k', '60k–70k', '>70k'
  ];

  const Tooltip = ({ text, children }) => (
    <div className="tooltip">
      {children}
      <div className="tooltip-content">
        {text}
      </div>
    </div>
  );

  return (
    <div className="form-sections">
      {/* Vitals Section */}
      <div className="section section-vitals">
        <div className="section-header">
          <div className="section-icon section-icon-vitals">
            <Heart />
          </div>
          <h2 className="section-title">Vitals</h2>
        </div>
        
        <div className="grid-2">
          <div className="form-group">
            <label className="form-label">
              Systolic Blood Pressure (mmHg)
              <Tooltip text="The upper number in your blood pressure reading. Normal is usually around 120 mmHg.">
                <span className="tooltip-trigger">
                  <Info />
                </span>
              </Tooltip>
            </label>
            <input
              type="number"
              placeholder="120"
              value={formData.systolicBP}
              onChange={(e) => handleInputChange('systolicBP', e.target.value)}
              className="form-input"
            />
            {errors.systolicBP && <p className="form-error">{errors.systolicBP}</p>}
          </div>
          
          <div className="form-group">
            <label className="form-label">
              Diastolic Blood Pressure (mmHg)
              <Tooltip text="The lower number in your blood pressure reading. Normal is usually around 80 mmHg.">
                <span className="tooltip-trigger">
                  <Info />
                </span>
              </Tooltip>
            </label>
            <input
              type="number"
              placeholder="80"
              value={formData.diastolicBP}
              onChange={(e) => handleInputChange('diastolicBP', e.target.value)}
              className="form-input"
            />
            {errors.diastolicBP && <p className="form-error">{errors.diastolicBP}</p>}
          </div>
          
          <div className="form-group">
            <label className="form-label">
              Cholesterol Level (mg/dL)
              <Tooltip text="Total cholesterol level. Normal is usually less than 200 mg/dL.">
                <span className="tooltip-trigger">
                  <Info />
                </span>
              </Tooltip>
            </label>
            <input
              type="number"
              placeholder="200"
              value={formData.cholesterolLevel}
              onChange={(e) => handleInputChange('cholesterolLevel', e.target.value)}
              className="form-input"
            />
            {errors.cholesterolLevel && <p className="form-error">{errors.cholesterolLevel}</p>}
          </div>
          
          <div className="form-group">
            <label className="form-label">
              BMI (Body Mass Index)
              <Tooltip text="Weight in kg divided by height in meters squared. Normal range is 18.5-24.9.">
                <span className="tooltip-trigger">
                  <Info />
                </span>
              </Tooltip>
            </label>
            <input
              type="number"
              step="0.1"
              placeholder="25.0"
              value={formData.bmi}
              onChange={(e) => handleInputChange('bmi', e.target.value)}
              className="form-input"
            />
            {errors.bmi && <p className="form-error">{errors.bmi}</p>}
            <p className="form-help-text">
              Calculate BMI: Weight (kg) ÷ Height (m)²
            </p>
          </div>
        </div>
      </div>

      {/* Lifestyle Section */}
      <div className="section section-lifestyle">
        <div className="section-header">
          <div className="section-icon section-icon-lifestyle">
            <Activity />
          </div>
          <h2 className="section-title">Lifestyle</h2>
        </div>
        
        <div className="form-sections">
          <div className="form-group">
            <label className="form-label">
              Do you currently smoke or have you smoked in the past 12 months?
            </label>
            <div className="radio-group">
              <div className="radio-item">
                <input
                  type="radio"
                  name="smokingStatus"
                  value="yes"
                  checked={formData.smokingStatus === 'yes'}
                  onChange={(e) => handleInputChange('smokingStatus', e.target.value)}
                  className="radio-input"
                />
                <label className="radio-label">Yes</label>
              </div>
              <div className="radio-item">
                <input
                  type="radio"
                  name="smokingStatus"
                  value="no"
                  checked={formData.smokingStatus === 'no'}
                  onChange={(e) => handleInputChange('smokingStatus', e.target.value)}
                  className="radio-input"
                />
                <label className="radio-label">No</label>
              </div>
            </div>
            {errors.smokingStatus && <p className="form-error">{errors.smokingStatus}</p>}
          </div>
          
          <div className="form-group">
            <label className="form-label">
              Do you get at least some form of regular physical activity or exercise?
            </label>
            <div className="radio-group">
              <div className="radio-item">
                <input
                  type="radio"
                  name="physicalActivity"
                  value="yes"
                  checked={formData.physicalActivity === 'yes'}
                  onChange={(e) => handleInputChange('physicalActivity', e.target.value)}
                  className="radio-input"
                />
                <label className="radio-label">Yes</label>
              </div>
              <div className="radio-item">
                <input
                  type="radio"
                  name="physicalActivity"
                  value="no"
                  checked={formData.physicalActivity === 'no'}
                  onChange={(e) => handleInputChange('physicalActivity', e.target.value)}
                  className="radio-input"
                />
                <label className="radio-label">No</label>
              </div>
            </div>
            {errors.physicalActivity && <p className="form-error">{errors.physicalActivity}</p>}
          </div>
          
          <div className="form-group">
            <label className="form-label">
              Do you consume more than 14 (men) or 7 (women) alcoholic drinks per week?
            </label>
            <div className="radio-group">
              <div className="radio-item">
                <input
                  type="radio"
                  name="heavyAlcoholUse"
                  value="yes"
                  checked={formData.heavyAlcoholUse === 'yes'}
                  onChange={(e) => handleInputChange('heavyAlcoholUse', e.target.value)}
                  className="radio-input"
                />
                <label className="radio-label">Yes</label>
              </div>
              <div className="radio-item">
                <input
                  type="radio"
                  name="heavyAlcoholUse"
                  value="no"
                  checked={formData.heavyAlcoholUse === 'no'}
                  onChange={(e) => handleInputChange('heavyAlcoholUse', e.target.value)}
                  className="radio-input"
                />
                <label className="radio-label">No</label>
              </div>
            </div>
            {errors.heavyAlcoholUse && <p className="form-error">{errors.heavyAlcoholUse}</p>}
          </div>
        </div>
      </div>

      {/* Medical History Section */}
      <div className="section section-medical">
        <div className="section-header">
          <div className="section-icon section-icon-medical">
            <Shield />
          </div>
          <h2 className="section-title">Medical History</h2>
        </div>
        
        <div className="form-sections">
          <div className="form-group">
            <label className="form-label">
              Have you ever been told by a doctor that you had a heart attack, coronary heart disease, or angina?
            </label>
            <div className="radio-group">
              <div className="radio-item">
                <input
                  type="radio"
                  name="heartDisease"
                  value="yes"
                  checked={formData.heartDisease === 'yes'}
                  onChange={(e) => handleInputChange('heartDisease', e.target.value)}
                  className="radio-input"
                />
                <label className="radio-label">Yes</label>
              </div>
              <div className="radio-item">
                <input
                  type="radio"
                  name="heartDisease"
                  value="no"
                  checked={formData.heartDisease === 'no'}
                  onChange={(e) => handleInputChange('heartDisease', e.target.value)}
                  className="radio-input"
                />
                <label className="radio-label">No</label>
              </div>
            </div>
            {errors.heartDisease && <p className="form-error">{errors.heartDisease}</p>}
          </div>
          
          <div className="form-group">
            <label className="form-label">
              Do you have serious difficulty walking or climbing stairs?
            </label>
            <div className="radio-group">
              <div className="radio-item">
                <input
                  type="radio"
                  name="difficultyWalking"
                  value="yes"
                  checked={formData.difficultyWalking === 'yes'}
                  onChange={(e) => handleInputChange('difficultyWalking', e.target.value)}
                  className="radio-input"
                />
                <label className="radio-label">Yes</label>
              </div>
              <div className="radio-item">
                <input
                  type="radio"
                  name="difficultyWalking"
                  value="no"
                  checked={formData.difficultyWalking === 'no'}
                  onChange={(e) => handleInputChange('difficultyWalking', e.target.value)}
                  className="radio-input"
                />
                <label className="radio-label">No</label>
              </div>
            </div>
            {errors.difficultyWalking && <p className="form-error">{errors.difficultyWalking}</p>}
          </div>
          
          <div className="form-group">
            <label className="form-label">
              Have you ever had a stroke?
            </label>
            <div className="radio-group">
              <div className="radio-item">
                <input
                  type="radio"
                  name="stroke"
                  value="yes"
                  checked={formData.stroke === 'yes'}
                  onChange={(e) => handleInputChange('stroke', e.target.value)}
                  className="radio-input"
                />
                <label className="radio-label">Yes</label>
              </div>
              <div className="radio-item">
                <input
                  type="radio"
                  name="stroke"
                  value="no"
                  checked={formData.stroke === 'no'}
                  onChange={(e) => handleInputChange('stroke', e.target.value)}
                  className="radio-input"
                />
                <label className="radio-label">No</label>
              </div>
            </div>
            {errors.stroke && <p className="form-error">{errors.stroke}</p>}
          </div>
          
          <div className="form-group">
            <label className="form-label">
              Have you had your cholesterol checked in the past 5 years?
            </label>
            <div className="radio-group">
              <div className="radio-item">
                <input
                  type="radio"
                  name="cholesterolCheck"
                  value="yes"
                  checked={formData.cholesterolCheck === 'yes'}
                  onChange={(e) => handleInputChange('cholesterolCheck', e.target.value)}
                  className="radio-input"
                />
                <label className="radio-label">Yes</label>
              </div>
              <div className="radio-item">
                <input
                  type="radio"
                  name="cholesterolCheck"
                  value="no"
                  checked={formData.cholesterolCheck === 'no'}
                  onChange={(e) => handleInputChange('cholesterolCheck', e.target.value)}
                  className="radio-input"
                />
                <label className="radio-label">No</label>
              </div>
            </div>
            {errors.cholesterolCheck && <p className="form-error">{errors.cholesterolCheck}</p>}
          </div>
        </div>
      </div>

      {/* Demographics Section */}
      <div className="section section-demographics">
        <div className="section-header">
          <div className="section-icon section-icon-demographics">
            <User />
          </div>
          <h2 className="section-title">Demographics</h2>
        </div>
        
        <div className="grid-2">
          <div className="form-group">
            <label className="form-label">
              Sex
            </label>
            <div className="radio-group">
              <div className="radio-item">
                <input
                  type="radio"
                  name="sex"
                  value="male"
                  checked={formData.sex === 'male'}
                  onChange={(e) => handleInputChange('sex', e.target.value)}
                  className="radio-input"
                />
                <label className="radio-label">Male</label>
              </div>
              <div className="radio-item">
                <input
                  type="radio"
                  name="sex"
                  value="female"
                  checked={formData.sex === 'female'}
                  onChange={(e) => handleInputChange('sex', e.target.value)}
                  className="radio-input"
                />
                <label className="radio-label">Female</label>
              </div>
            </div>
            {errors.sex && <p className="form-error">{errors.sex}</p>}
          </div>
          
          <div className="form-group">
            <label className="form-label">
              Age
            </label>
            <input
              type="number"
              placeholder="35"
              value={formData.age}
              onChange={(e) => handleInputChange('age', e.target.value)}
              className="form-input"
            />
            {errors.age && <p className="form-error">{errors.age}</p>}
          </div>
          
          <div className="form-group grid-full">
            <label className="form-label">
              Annual Income
            </label>
            <select
              value={formData.annualIncome}
              onChange={(e) => handleInputChange('annualIncome', e.target.value)}
              className="form-select"
            >
              <option value="">Select income range</option>
              {incomeRanges.map(range => (
                <option key={range} value={range}>{range}</option>
              ))}
            </select>
            {errors.annualIncome && <p className="form-error">{errors.annualIncome}</p>}
          </div>
        </div>
      </div>

      {/* General Health Section */}
      <div className="section section-health">
        <div className="section-header">
          <div className="section-icon section-icon-health">
            <DollarSign />
          </div>
          <h2 className="section-title">General Health</h2>
        </div>
        
        <div className="form-group">
          <label className="form-label">
            How would you rate your general health?
          </label>
          <div className="radio-group-vertical">
            {[
              { value: '1', label: 'Excellent' },
              { value: '2', label: 'Very Good' },
              { value: '3', label: 'Good' },
              { value: '4', label: 'Fair' },
              { value: '5', label: 'Poor' }
            ].map(option => (
              <div key={option.value} className="radio-item">
                <input
                  type="radio"
                  name="generalHealth"
                  value={option.value}
                  checked={formData.generalHealth === option.value}
                  onChange={(e) => handleInputChange('generalHealth', e.target.value)}
                  className="radio-input"
                />
                <label className="radio-label">{option.label}</label>
              </div>
            ))}
          </div>
          {errors.generalHealth && <p className="form-error">{errors.generalHealth}</p>}
        </div>
      </div>

      {/* Submit Button */}
      <div className="submit-container">
        <button
          onClick={handleSubmit}
          className="btn btn-primary"
        >
          Submit Assessment
        </button>
      </div>
    </div>
  );
};

// Helper function to parse markdown-style text
const parseExplanation = (text) => {
  if (!text) return [];
  
  const lines = text.split('\n');
  const sections = [];
  let currentSection = null;
  
  lines.forEach(line => {
    line = line.trim();
    if (!line) return;
    
    if (line.startsWith('**') && line.endsWith('**')) {
      // Main heading
      if (currentSection) sections.push(currentSection);
      currentSection = {
        type: 'heading',
        content: line.replace(/\*\*/g, ''),
        items: []
      };
    } else if (line.startsWith('*') && line.endsWith('*')) {
      // Subheading
      if (currentSection) {
        currentSection.items.push({
          type: 'subheading',
          content: line.replace(/\*/g, '')
        });
      }
    } else if (line.match(/^\d+\./)) {
      // Numbered list item
      if (currentSection) {
        currentSection.items.push({
          type: 'numbered',
          content: line.replace(/^\d+\.\s*/, '')
        });
      }
    } else if (line.startsWith('\t*') || line.startsWith('  *')) {
      // Sub-bullet point
      if (currentSection && currentSection.items.length > 0) {
        const lastItem = currentSection.items[currentSection.items.length - 1];
        if (!lastItem.subitems) lastItem.subitems = [];
        lastItem.subitems.push(line.replace(/^\s*\*\s*/, ''));
      }
    } else {
      // Regular paragraph
      if (currentSection) {
        currentSection.items.push({
          type: 'paragraph',
          content: line
        });
      }
    }
  });
  
  if (currentSection) sections.push(currentSection);
  return sections;
};

const ExplanationSection = ({ explanation }) => {
  const sections = parseExplanation(explanation);
  
  return (
    <div className="explanation-container">
      {sections.map((section, index) => (
        <div key={index} className="explanation-section">
          {section.type === 'heading' && (
            <h3 className="explanation-heading">{section.content}</h3>
          )}
          
          {section.items.map((item, itemIndex) => (
            <div key={itemIndex} className="explanation-item">
              {item.type === 'subheading' && (
                <h4 className="explanation-subheading">{item.content}</h4>
              )}
              
              {item.type === 'paragraph' && (
                <p className="explanation-paragraph">{item.content}</p>
              )}
              
              {item.type === 'numbered' && (
                <div className="explanation-numbered">
                  <strong>{item.content}</strong>
                  {item.subitems && (
                    <ul className="explanation-subitems">
                      {item.subitems.map((subitem, subIndex) => (
                        <li key={subIndex}>{subitem}</li>
                      ))}
                    </ul>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

// Main Diabetes Component
const convertIncomeToNumber = (range) => {
  const mapping = {
    '<10k': 5000,
    '10k–20k': 15000,
    '20k–30k': 25000,
    '30k–40k': 35000,
    '40k–50k': 45000,
    '50k–60k': 55000,
    '60k–70k': 65000,
    '>70k': 75000,
  };
  return mapping[range] || 0;
};

const Diabetes = () => {
  const [submitted, setSubmitted] = useState(false);
  const [formResults, setFormResults] = useState(null);
  const navigate = useNavigate();

  const handleFormSubmit = (formData) => {
    // ✅ Convert frontend form to match backend schema
    const payload = {
      systolic_bp: Number(formData.systolicBP),
      diastolic_bp: Number(formData.diastolicBP),
      cholesterol_mg_dl: Number(formData.cholesterolLevel),
      bmi: parseFloat(formData.bmi),

      smoker: formData.smokingStatus === 'yes',
      phys_activity: formData.physicalActivity === 'yes',
      hvy_alcohol_consump: formData.heavyAlcoholUse === 'yes',

      heart_disease_or_attack: formData.heartDisease === 'yes',
      diff_walk: formData.difficultyWalking === 'yes',
      stroke: formData.stroke === 'yes',
      chol_check: formData.cholesterolCheck === 'yes',

      sex: formData.sex === 'male' ? 'Male' : 'Female',
      age_years: Number(formData.age),

      annual_income: convertIncomeToNumber(formData.annualIncome),
      gen_health: Number(formData.generalHealth),
    };

    // ✅ Call the backend
    predictDiabetes(payload)
      .then((res) => {
        console.log('Diabetes prediction result:', res);
        setFormResults(res);
        setSubmitted(true);
      })
      .catch((err) => {
        console.error('Prediction error:', err);
        alert("Error while predicting. Please check your inputs and try again.");
      });
  };

  const resetForm = () => {
    setSubmitted(false);
    setFormResults(null);
  };

  return (
    <div className="diabetes-container">
      <div className="container">
        <div className="header">
          <div className="header-icon-container">
            <div className="header-icon"><Heart /></div>
          </div>
          <h1 className="main-title">Diabetes Risk Assessment</h1>
          <p className="subtitle">
            Complete this comprehensive health assessment to evaluate your diabetes risk factors.
          </p>
        </div>

        <div className="form-container">
          {!submitted ? (
            <DiabetesForm onSubmit={handleFormSubmit} />
          ) : (
            <div className="completion-screen">
              <div className={`completion-icon ${formResults?.prediction === 1 ? 'risk-high' : 'risk-low'}`}>
                {formResults?.prediction === 1 ? <AlertTriangle /> : <CheckCircle />}
              </div>
              
              <h2 className="completion-title">Assessment Completed!</h2>

              <div className="completion-summary">
                <div className={`result-badge ${formResults?.prediction === 1 ? 'result-positive' : 'result-negative'}`}>
                  <span className="result-label">Result: </span>
                  <strong>
                    {formResults?.prediction === 1 ? 'Diabetes Risk' : 'No Diabetes Risk'}
                  </strong>
                </div>
                
                {formResults?.probability && (
                  <div className="probability-display">
                    <span className="probability-label">Probability: </span>
                    <strong className={formResults?.prediction === 1 ? 'probability-high' : 'probability-low'}>
                      {(formResults.probability * 100).toFixed(2)}%
                    </strong>
                  </div>
                )}
              </div>

              {formResults?.top_contributors?.length > 0 && (
                <div className="contributors-section">
                  <h3 className="contributors-title">Top Contributing Factors</h3>
                  <div className="contributors-grid">
                    {formResults.top_contributors.map((item, index) => (
                      <div key={index} className="contributor-card">
                        <div className="contributor-header">
                          <span className="contributor-feature">{item.feature}</span>
                          <span className={`contributor-impact ${item.impact === 'increased' ? 'impact-increased' : 'impact-reduced'}`}>
                            {item.impact}
                          </span>
                        </div>
                        <div className="contributor-details">
                          <span className="contributor-value">Value: {item.value}</span>
                          <span className="contributor-shap">SHAP: {item.shap?.toFixed(3)}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {formResults?.explanation && (
                <ExplanationSection explanation={formResults.explanation} />
              )}

              <div className="completion-notice">
                <p>
                  <strong>Important Notice:</strong> This assessment is for informational purposes only and should not replace professional medical advice. Please consult with a healthcare provider for proper diagnosis and treatment.
                </p>
              </div>

              <div className="completion-actions">
                <button onClick={resetForm} className="btn btn-secondary">
                  Take Another Assessment
                </button>
                <button onClick={() => navigate('/')} className="btn btn-primary">
                  Return Home 🏡
                </button>
              </div>
            </div>
          )}
        </div>

        <div className="footer">
          <p>
            This assessment tool is designed to help evaluate diabetes risk factors based on established medical guidelines.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Diabetes;