
// --- Career Pathways App (Expanded) ---
// Includes 50+ attributes and 100+ mining-related careers

import { useState } from "react";

// Step 1: Expanded questions
const questions = [
  {
    id: "interests",
    label: "Which of these do you find interesting?",
    options: [
      { value: "science", label: "Science and the natural world" },
      { value: "engineering", label: "Engineering and design" },
      { value: "environment", label: "Nature and the environment" },
      { value: "machinery", label: "Machines and engines" },
      { value: "computers", label: "Technology and computers" },
      { value: "outdoors", label: "Working outdoors" },
      { value: "data", label: "Numbers, data and analysis" },
      { value: "communication", label: "Communicating and explaining ideas" },
      { value: "leadership", label: "Leading or organising people" },
      { value: "building", label: "Building and construction" }
    ]
  },
  {
    id: "skills",
    label: "Which of these are you good at or enjoy?",
    options: [
      { value: "maths", label: "Maths and problem solving" },
      { value: "manual", label: "Manual work or tool use" },
      { value: "detail", label: "Noticing small details" },
      { value: "people", label: "Working with people" },
      { value: "writing", label: "Writing and documentation" },
      { value: "coding", label: "Coding and software" },
      { value: "drawing", label: "Drawing or technical diagrams" },
      { value: "research", label: "Investigating and researching" },
      { value: "design", label: "Designing solutions or layouts" },
      { value: "project", label: "Managing tasks and projects" }
    ]
  },
  {
    id: "style",
    label: "How do you like to work?",
    options: [
      { value: "team", label: "As part of a team" },
      { value: "solo", label: "Independently" },
      { value: "routine", label: "With clear routines and structure" },
      { value: "variety", label: "With variety and change" },
      { value: "physical", label: "Physically active roles" },
      { value: "quiet", label: "In a quiet, focused setting" },
      { value: "fast", label: "In a fast-paced setting" },
      { value: "mobile", label: "In different locations each day" }
    ]
  },
  {
    id: "location",
    label: "Where would you prefer to work?",
    options: [
      { value: "remote", label: "Remote or rural sites" },
      { value: "local", label: "Close to home" },
      { value: "fifo", label: "Fly-in Fly-out (FIFO)" },
      { value: "office", label: "In an office" },
      { value: "lab", label: "In a lab or workshop" },
      { value: "field", label: "In the field, outdoors or underground" }
    ]
  }
];

import careers from "../data/combined-careers.json";

export default function CareerPathApp() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState({});
  const currentQuestion = questions[step];

  const handleAnswer = (id, value) => {
    const current = answers[id] || [];
    const updated = current.includes(value)
      ? current.filter((v) => v !== value)
      : [...current, value];
    setAnswers({ ...answers, [id]: updated });
  };

  const getMatches = () => {
    const traits = Object.values(answers).flat();
    return careers.filter((career) =>
      career.traits.every((trait) => traits.includes(trait))
    );
  };

  return (
    <div className="p-6 max-w-xl mx-auto bg-white shadow-lg rounded-md border border-gray-200">
      <div className="flex justify-between items-center mb-4">
        <img src="/coat-of-arms.png" alt="Queensland Coat of Arms" className="h-10" />
        <img src="/delivering-qld-wordmark.png" alt="Delivering for Queensland" className="h-8" />
      </div>
      <h1 className="text-2xl font-bold mb-6 text-blue-900 font-sans">Discover Your Mining or Manufacturing Career Path</h1>

      {step < questions.length ? (
        <div>
          <p className="text-lg mb-4">{currentQuestion.label}</p>
          {currentQuestion.options.map((opt) => (
            <div key={opt.value} className="flex items-center space-x-2 py-1">
              <input
                type="checkbox"
                id={opt.value}
                value={opt.value}
                checked={answers[currentQuestion.id]?.includes(opt.value) || false}
                onChange={() => handleAnswer(currentQuestion.id, opt.value)}
              />
              <label htmlFor={opt.value}>{opt.label}</label>
            </div>
          ))}
          <button className="mt-4 px-4 py-2 bg-blue-800 text-white rounded" onClick={() => setStep(step + 1)}>Next</button>
        </div>
      ) : (
        <div>
          <h2 className="text-xl font-semibold mb-2">Recommended Careers</h2>
          {getMatches().length > 0 ? (
            getMatches().map((career) => (
              <div key={career.title} className="p-4 border rounded mb-4">
                <h3 className="font-semibold text-lg">{career.title}</h3>
                <p className="text-sm my-2">{career.description}</p>
                <p className="text-sm italic">Pathway: {career.pathway}</p>
                {career.pathway?.toLowerCase().includes("manufacturing") && (
                  <p className="text-sm mt-2">
                    <a className="text-blue-700 underline" href="https://www.qld.gov.au/manufacturing" target="_blank" rel="noopener noreferrer">
                      More on manufacturing careers
                    </a>
                  </p>
                )}
                {(career.pathway?.toLowerCase().includes("mining") || career.pathway?.toLowerCase().includes("resources")) && (
                  <p className="text-sm mt-2">
                    <a className="text-blue-700 underline" href="https://www.qld.gov.au/resources" target="_blank" rel="noopener noreferrer">
                      More on mining and resources careers
                    </a>
                  </p>
                )}
              </div>
            ))
          ) : (
            <p>No exact matches found. Try changing some responses.</p>
          )}
        </div>
      )}
    </div>
  );
}
