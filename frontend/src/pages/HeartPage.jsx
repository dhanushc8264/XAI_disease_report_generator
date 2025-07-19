import React, { useState } from 'react';
import { Heart, User, Activity, Stethoscope, Zap, Info, AlertTriangle, CheckCircle } from 'lucide-react';
import "../styles/heart.css"
import { useNavigate } from "react-router-dom";
import { predictHeart } from '../api/diseaseApi';

const HeartDiseaseForm = ({ onSubmit }) => {

  const chestPainOptions = [
  {
    value: 'None',
    label: 'None (No chest pain or discomfort)'
  },
  {
    value: 'TA',
    label: 'Typical Angina (Chest pain during physical activity or stress, relieved by rest)'
  },
  {
    value: 'ATA',
    label: 'Atypical Angina (Chest discomfort not clearly linked to activity, may feel like burning or pressure)'
  },
  {
    value: 'NAP',
    label: 'Non-Anginal Pain (Chest pain not related to the heart — like indigestion or muscle pain)'
  },
  {
    value: 'ASY',
    label: 'Asymptomatic (No symptoms at all — silent heart issues)'
  }
];

  const [formData, setFormData] = useState({
    age: '',
    sex: '',
    chestPainType: '',
    restingBP: '',
    cholesterol: '',
    fastingBS: '',
    restingECG: '',
    maxHR: '',
    exerciseAngina: '',
    oldpeak: '',
    ST_Slope: ''
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

  const validateForm = () => {
    const newErrors = {};

    if (!formData.age) newErrors.age = 'Age is required.';
    if (!formData.sex) newErrors.sex = 'Sex is required.';
    if (!formData.chestPainType) newErrors.chestPainType = 'Chest pain type is required.';
    if (!formData.restingBP) newErrors.restingBP = 'Resting BP is required.';
    if (!formData.cholesterol) newErrors.cholesterol = 'Cholesterol is required.';
    if (formData.fastingBS === '') newErrors.fastingBS = 'Fasting blood sugar is required.';
    if (!formData.maxHR) newErrors.maxHR = 'Max heart rate is required.';
    if (!formData.exerciseAngina) newErrors.exerciseAngina = 'Exercise angina info is required.';
    if (formData.oldpeak === '') newErrors.oldpeak = 'ST depression (oldpeak) is required.';
    if (!formData.ST_Slope) newErrors.ST_Slope = 'ST segment slope is required.';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      onSubmit(formData);
    }
  };

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
      {/* Basic Info */}
      <div className="section section-basic">
        <div className="section-header">
          <div className="section-icon section-icon-basic">
            <User />
          </div>
          <h2 className="section-title">Basic Information</h2>
        </div>
        <div className="grid-2">
          <div className="form-group">
            <label className="form-label">
              Age
              <Tooltip text="Your current age in years">
                <span className="tooltip-trigger"><Info /></span>
              </Tooltip>
            </label>
            <input
              type="number"
              placeholder="45"
              value={formData.age}
              onChange={(e) => handleInputChange('age', e.target.value)}
              className="form-input"
            />
            {errors.age && <p className="error-text">{errors.age}</p>}
          </div>

          <div className="form-group">
            <label className="form-label">Biological Sex</label>
            <div className="radio-group">
              {['M', 'F'].map(sex => (
                <div className="radio-item" key={sex}>
                  <input
                    type="radio"
                    name="sex"
                    value={sex}
                    checked={formData.sex === sex}
                    onChange={(e) => handleInputChange('sex', e.target.value)}
                    className="radio-input"
                  />
                  <label className="radio-label">{sex === 'M' ? 'Male' : 'Female'}</label>
                </div>
              ))}
            </div>
            {errors.sex && <p className="error-text">{errors.sex}</p>}
          </div>
        </div>
      </div>

      {/* Symptoms */}
      <div className="section section-symptoms">
        <div className="section-header">
          <div className="section-icon section-icon-symptoms"><Heart /></div>
          <h2 className="section-title">Chest Pain Symptoms</h2>
        </div>
        <div className="form-group">
          <label className="form-label">
            Chest pain type
            <Tooltip text="Choose the option that best matches your experience">
              <span className="tooltip-trigger"><Info /></span>
            </Tooltip>
          </label>
         <div className="radio-group-vertical">
            {chestPainOptions.map(option => (
              <div className="radio-item" key={option.value}>
                <input
                  type="radio"
                  name="chestPainType"
                  value={option.value}
                  checked={formData.chestPainType === option.value}
                  onChange={(e) => handleInputChange('chestPainType', e.target.value)}
                  className="radio-input"
                />
                <label className="radio-label">{option.label}</label>
              </div>
            ))}
          </div>
          {errors.chestPainType && <p className="error-text">{errors.chestPainType}</p>}
        </div>
      </div>

      {/* Vitals */}
      <div className="section section-vitals">
        <div className="section-header">
          <div className="section-icon section-icon-vitals"><Stethoscope /></div>
          <h2 className="section-title">Vital Signs</h2>
        </div>
        <div className="grid-2">
          <div className="form-group">
            <label className="form-label">Resting BP</label>
            <input
              type="number"
              placeholder="120"
              value={formData.restingBP}
              onChange={(e) => handleInputChange('restingBP', e.target.value)}
              className="form-input"
            />
            {errors.restingBP && <p className="error-text">{errors.restingBP}</p>}
          </div>

          <div className="form-group">
            <label className="form-label">Cholesterol</label>
            <input
              type="number"
              placeholder="200"
              value={formData.cholesterol}
              onChange={(e) => handleInputChange('cholesterol', e.target.value)}
              className="form-input"
            />
            {errors.cholesterol && <p className="error-text">{errors.cholesterol}</p>}
          </div>

          <div className="form-group">
            <label className="form-label">High Fasting Blood Sugar?</label>
            <div className="radio-group">
              {['1', '0'].map(val => (
                <div className="radio-item" key={val}>
                  <input
                    type="radio"
                    name="fastingBS"
                    value={val}
                    checked={formData.fastingBS === val}
                    onChange={(e) => handleInputChange('fastingBS', e.target.value)}
                    className="radio-input"
                  />
                  <label className="radio-label">{val === '1' ? 'Yes' : 'No'}</label>
                </div>
              ))}
            </div>
            {errors.fastingBS && <p className="error-text">{errors.fastingBS}</p>}
          </div>

          <div className="form-group">
            <label className="form-label">Max HR</label>
            <input
              type="number"
              placeholder="150"
              value={formData.maxHR}
              onChange={(e) => handleInputChange('maxHR', e.target.value)}
              className="form-input"
            />
            {errors.maxHR && <p className="error-text">{errors.maxHR}</p>}
          </div>
        </div>
      </div>

      {/* Medical Tests */}
      <div className="section section-medical">
        <div className="section-header"><div className="section-icon section-icon-medical"><Activity /></div>
          <h2 className="section-title">Medical Tests</h2>
        </div>
        <div className="form-group">
          <label className="form-label">ST Depression (Oldpeak)</label>
          <input
            type="number"
            step="0.1"
            placeholder="0"
            value={formData.oldpeak}
            onChange={(e) => handleInputChange('oldpeak', e.target.value)}
            className="form-input"
          />
          {errors.oldpeak && <p className="error-text">{errors.oldpeak}</p>}
        </div>
      </div>

      {/* Exercise Section */}
      <div className="section section-exercise">
        <div className="section-header">
          <div className="section-icon section-icon-exercise"><Zap /></div>
          <h2 className="section-title">Exercise Related</h2>
        </div>
        <div className="form-group">
          <label className="form-label">Chest pain during exercise?</label>
          <div className="radio-group">
            {['Y', 'N'].map(val => (
              <div className="radio-item" key={val}>
                <input
                  type="radio"
                  name="exerciseAngina"
                  value={val}
                  checked={formData.exerciseAngina === val}
                  onChange={(e) => handleInputChange('exerciseAngina', e.target.value)}
                  className="radio-input"
                />
                <label className="radio-label">{val === 'Y' ? 'Yes' : 'No'}</label>
              </div>
            ))}
          </div>
          {errors.exerciseAngina && <p className="error-text">{errors.exerciseAngina}</p>}
        </div>

        <div className="form-group">
          <label className="form-label">ST Segment Slope</label>
          <div className="radio-group-vertical">
            {['Up', 'Flat', 'Down'].map(slope => (
              <div className="radio-item" key={slope}>
                <input
                  type="radio"
                  name="ST_Slope"
                  value={slope}
                  checked={formData.ST_Slope === slope}
                  onChange={(e) => handleInputChange('ST_Slope', e.target.value)}
                  className="radio-input"
                />
                <label className="radio-label">{slope}</label>
              </div>
            ))}
          </div>
          {errors.ST_Slope && <p className="error-text">{errors.ST_Slope}</p>}
        </div>
      </div>

      {/* Submit */}
      <div className="submit-container">
        <button onClick={handleSubmit} className="btn btn-primary">
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

const HeartPage = () => {
  const [submitted, setSubmitted] = useState(false);
  const [formResults, setFormResults] = useState(null);

  const handleFormSubmit = (data) => {
    const payload = {
      Age: Number(data.age),
      Sex: data.sex,
      ChestPainType: data.chestPainType,
      RestingBP: Number(data.restingBP),
      Cholesterol: Number(data.cholesterol),
      FastingBS: Number(data.fastingBS),
      MaxHR: Number(data.maxHR),
      ExerciseAngina: data.exerciseAngina,
      Oldpeak: parseFloat(data.oldpeak),
      ST_Slope: data.ST_Slope
    };

    predictHeart(payload)
  .then((res) => {
    setFormResults(res);
    setSubmitted(true);
    console.log("Heart Prediction Result:", res);
  })
  .catch((err) => {
    console.error("API Error:", err);
    alert("Something went wrong with prediction. Please try again.");
  });

    // const mockResponse = {
    //   prediction: 1,
    //   probability: 0.7024,
    //   label: "Heart Disease",
    //   top_contributors: [
    //     {
    //       feature: "ST_Slope_Up",
    //       value: 0,
    //       impact: "increased",
    //       shap: 0.34128648042678833
    //     },
    //     {
    //       feature: "MaxHR",
    //       value: 119.99999999999997,
    //       impact: "reduced",
    //       shap: -0.2918410003185272
    //     }
    //   ],
    //   explanation: "**Important Health Alert: Heart Disease Risk**\n\nBased on your medical data, our analysis predicts a 70.24% probability of Heart Disease. This is a significant risk, and we want to help you understand the factors contributing to this prediction and provide guidance on what you can do next.\n\n**Top Contributing Factors:**\n\n1. **ST Slope Up**: Your electrocardiogram (ECG) results show a flat ST slope, which is a concerning indicator of heart disease. This factor contributes significantly to your overall risk.\n2. **Chest Pain Type (ASY)**: You have reported asymptomatic chest pain, which increases your risk of heart disease.\n\n**What You Can Do Next:**\n\n1. **Schedule a Doctor's Appointment**: Consult with your primary care physician or a cardiologist to discuss your results and determine the best course of action.\n2. **Lifestyle Changes**: Make healthy lifestyle adjustments to reduce your risk of heart disease:\n\t* Quit smoking (if applicable)\n\t* Engage in regular physical activity (aim for 150 minutes/week)\n\t* Maintain a healthy diet (low in sodium, sugar, and saturated fats)\n\nRemember, a predicted probability of 70.24% is a significant risk, but it's not a guarantee. By working with your healthcare provider and making healthy lifestyle changes, you can reduce your risk of heart disease and improve your overall well-being."
    // };

    setFormResults(mockResponse);
    setSubmitted(true);
  };

  const resetForm = () => {
    setSubmitted(false);
    setFormResults(null);
  };
  const navigate = useNavigate();

  const navigateHome = () => {
    // Replace with actual navigation logic
    navigate('/')
  };

  return (
    <div className="heart-disease-container">
      <div className="container">
        <div className="header">
          <div className="header-icon-container">
            <div className="header-icon"><Heart /></div>
          </div>
          <h1 className="main-title">Heart Disease Risk Assessment</h1>
          <p className="subtitle">
            Complete this assessment to evaluate your heart disease risk factors.
          </p>
        </div>

        <div className="form-container">
          {!submitted ? (
            <HeartDiseaseForm onSubmit={handleFormSubmit} />
          ) : (
            <div className="completion-screen">
              <div className={`completion-icon ${formResults?.prediction === 1 ? 'risk-high' : 'risk-low'}`}>
                {formResults?.prediction === 1 ? <AlertTriangle /> : <CheckCircle />}
              </div>
              
              <h2 className="completion-title">Assessment Completed!</h2>

              <div className="completion-summary">
                <div className={`result-badge ${formResults?.prediction === 1 ? 'result-positive' : 'result-negative'}`}>
                  <span className="result-label">Result: </span>
                  <strong>{formResults?.label}</strong>
                </div>
                
                <div className="probability-display">
                  <span className="probability-label">Probability: </span>
                  <strong className={formResults?.prediction === 1 ? 'probability-high' : 'probability-low'}>
                    {(formResults?.probability * 100).toFixed(2)}%
                  </strong>
                </div>
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
                          <span className="contributor-shap">SHAP: {item.shap.toFixed(3)}</span>
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
                <button onClick={navigateHome} className="btn btn-primary">
                  Return Home 🏡
                </button>
              </div>
            </div>
          )}
        </div>

        <div className="footer">
          <p>This tool helps evaluate heart disease risk based on known factors.</p>
        </div>
      </div>
    </div>
  );
};

export default HeartPage;

/* Additional CSS for the enhanced completion screen */
const additionalStyles = `
/* Enhanced completion screen styles */
.completion-screen {
  max-width: 800px;
  margin: 0 auto;
}

.completion-icon.risk-high {
  background: #fee2e2;
}

.completion-icon.risk-high svg {
  color: #dc2626;
}

.completion-icon.risk-low {
  background: #dcfce7;
}

.completion-icon.risk-low svg {
  color: #16a34a;
}

.completion-summary {
  display: flex;
  justify-content: center;
  gap: 2rem;
  margin: 1.5rem 0;
  flex-wrap: wrap;
}

.result-badge {
  padding: 0.75rem 1.5rem;
  border-radius: 0.5rem;
  font-size: 1.1rem;
  font-weight: 600;
  text-align: center;
  min-width: 200px;
}

.result-badge.result-positive {
  background: #fee2e2;
  color: #dc2626;
  border: 2px solid #fca5a5;
}

.result-badge.result-negative {
  background: #dcfce7;
  color: #16a34a;
  border: 2px solid #86efac;
}

.probability-display {
  padding: 0.75rem 1.5rem;
  background: #f8fafc;
  border-radius: 0.5rem;
  font-size: 1.1rem;
  text-align: center;
  min-width: 200px;
  border: 2px solid #e2e8f0;
}

.probability-high {
  color: #dc2626;
}

.probability-low {
  color: #16a34a;
}

.contributors-section {
  margin: 2rem 0;
  padding: 1.5rem;
  background: #f8fafc;
  border-radius: 0.75rem;
  border: 1px solid #e2e8f0;
}

.contributors-title {
  font-size: 1.25rem;
  font-weight: 600;
  color: #1f2937;
  margin-bottom: 1rem;
  text-align: center;
}

.contributors-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1rem;
}

.contributor-card {
  background: white;
  padding: 1rem;
  border-radius: 0.5rem;
  border: 1px solid #d1d5db;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.contributor-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.5rem;
}

.contributor-feature {
  font-weight: 600;
  color: #1f2937;
  font-size: 0.9rem;
}

.contributor-impact {
  padding: 0.25rem 0.5rem;
  border-radius: 0.25rem;
  font-size: 0.75rem;
  font-weight: 500;
  text-transform: uppercase;
}

.impact-increased {
  background: #fee2e2;
  color: #dc2626;
}

.impact-reduced {
  background: #dcfce7;
  color: #16a34a;
}

.contributor-details {
  display: flex;
  justify-content: space-between;
  font-size: 0.8rem;
  color: #6b7280;
}

.explanation-container {
  margin: 2rem 0;
  padding: 1.5rem;
  background: white;
  border-radius: 0.75rem;
  border: 1px solid #e2e8f0;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.explanation-section {
  margin-bottom: 1.5rem;
}

.explanation-section:last-child {
  margin-bottom: 0;
}

.explanation-heading {
  font-size: 1.25rem;
  font-weight: 700;
  color: #dc2626;
  margin-bottom: 1rem;
  padding-bottom: 0.5rem;
  border-bottom: 2px solid #fee2e2;
}

.explanation-subheading {
  font-size: 1.1rem;
  font-weight: 600;
  color: #1f2937;
  margin: 1rem 0 0.5rem 0;
}

.explanation-paragraph {
  color: #4b5563;
  line-height: 1.6;
  margin-bottom: 1rem;
}

.explanation-numbered {
  margin-bottom: 1rem;
  padding-left: 1rem;
}

.explanation-numbered strong {
  color: #1f2937;
  display: block;
  margin-bottom: 0.5rem;
}

.explanation-subitems {
  margin-top: 0.5rem;
  margin-left: 1rem;
  list-style-type: disc;
}

.explanation-subitems li {
  color: #4b5563;
  margin-bottom: 0.25rem;
  line-height: 1.5;
}

.completion-notice {
  background: #fef3c7;
  border: 1px solid #fbbf24;
  padding: 1rem;
  border-radius: 0.5rem;
  margin: 2rem 0;
}

.completion-notice p {
  color: #92400e;
  font-size: 0.9rem;
  margin: 0;
  line-height: 1.5;
}

.completion-actions {
  display: flex;
  gap: 1rem;
  justify-content: center;
  margin-top: 2rem;
  flex-wrap: wrap;
}

@media (max-width: 768px) {
  .completion-summary {
    flex-direction: column;
    align-items: center;
  }
  
  .contributors-grid {
    grid-template-columns: 1fr;
  }
  
  .completion-actions {
    flex-direction: column;
    align-items: center;
  }
  
  .completion-actions .btn {
    width: 100%;
    max-width: 300px;
  }
}
`;

// Add styles to document head
if (typeof document !== 'undefined') {
  const styleElement = document.createElement('style');
  styleElement.textContent = additionalStyles;
  document.head.appendChild(styleElement);
}