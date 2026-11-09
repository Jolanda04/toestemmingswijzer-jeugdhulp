import React, { useState } from 'react';
import { PRACTICE_SCENARIOS } from '../data/scenarios';
import { PracticeScenario, CaseState } from '../types/jeugdhulp';
import { BookOpen, ArrowRight, CheckCircle2, Filter } from 'lucide-react';

interface ScenarioLibraryProps {
  onLoadScenario: (state: CaseState) => void;
}

export const ScenarioLibrary: React.FC<ScenarioLibraryProps> = ({ onLoadScenario }) => {
  const [filterTag, setFilterTag] = useState<string>('all');

  const tags = ['all', 'Echtscheiding & Weigering', 'Dubbele toestemming & Uitzondering', 'Beroepsgeheim & Zelfstandigheid', 'Acute Nood & Spoedrecht'];

  const filteredScenarios = filterTag === 'all' 
    ? PRACTICE_SCENARIOS 
    : PRACTICE_SCENARIOS.filter(s => s.tag === filterTag);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs">
        <div className="max-w-3xl">
          <h2 className="text-xl font-bold text-slate-900">Praktijkcasussen & Veelvoorkomende Situaties</h2>
          <p className="text-sm text-slate-600 mt-1">
            Kies een herkenbare praktijksituatie uit de jeugdhulpverlening. 
            Klik op "Open in Beslisboom" om het juridisch stappenplan en de wetsartikelen direct te analyseren.
          </p>
        </div>

        {/* Interactive filter control */}
        <div className="flex flex-wrap gap-1.5 mt-4 pt-4 border-t border-slate-100">
          {tags.map((tag) => (
            <button
              key={tag}
              onClick={() => setFilterTag(tag)}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap shrink-0 ${
                filterTag === tag
                  ? 'bg-slate-900 text-white font-semibold'
                  : 'bg-slate-100 text-slate-600 hover:text-slate-900 hover:bg-slate-200'
              }`}
            >
              {tag === 'all' ? 'Alle casussen' : tag}
            </button>
          ))}
        </div>
      </div>

      {/* Grid of Scenarios */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredScenarios.map((scenario) => (
          <div
            key={scenario.id}
            className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs flex flex-col justify-between hover:border-slate-300 transition-all space-y-4"
          >
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-xs text-slate-500">
                <span>{scenario.tag}</span>
                <span aria-hidden="true">·</span>
                <span>{scenario.subtitle}</span>
              </div>

              <h3 className="text-base font-bold text-slate-900 leading-snug">
                {scenario.title}
              </h3>

              <p className="text-xs text-slate-600 leading-relaxed">
                {scenario.description}
              </p>

              <div className="p-3 bg-blue-50/60 border border-blue-100 rounded-lg text-xs text-blue-950 mt-2">
                <span className="font-bold text-blue-900 block mb-0.5">Kernadvies:</span>
                {scenario.keyTakeaway}
              </div>
            </div>

            <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
              <span className="text-xs font-mono text-slate-400">
                {scenario.state.exactAge} jaar · {scenario.state.custodyType}
              </span>
              <button
                onClick={() => onLoadScenario(scenario.state)}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded-lg transition-colors"
              >
                <span>Toets in Beslisboom</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
