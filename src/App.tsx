import React, { useState } from 'react';
import { CaseState, AgeCategory } from './types/jeugdhulp';
import { evaluateConsent } from './data/legalRules';
import { Header } from './components/Header';
import { DecisionWizard } from './components/DecisionWizard';
import { AssessmentResult } from './components/AssessmentResult';
import { ScenarioLibrary } from './components/ScenarioLibrary';
import { MatrixOverview } from './components/MatrixOverview';
import { ConsentFormGenerator } from './components/ConsentFormGenerator';
import { KnowledgeBase } from './components/KnowledgeBase';
import { FileText } from 'lucide-react';
import patroon from './assets/patroon.svg';

const DEFAULT_STATE: CaseState = {
  exactAge: 13,
  ageCategory: 'age_12_15',
  custodyType: 'joint_divorced',
  competenceStatus: 'competent',
  assistanceType: 'ambulatory',
  stanceOfParties: 'both_agree'
};

export default function App() {
  const [activeTab, setActiveTab] = useState<'wizard' | 'scenarios' | 'matrix' | 'form_generator' | 'knowledge'>('wizard');
  const [caseState, setCaseState] = useState<CaseState>(DEFAULT_STATE);

  const evaluationResult = evaluateConsent(caseState);

  const handleReset = () => {
    setCaseState(DEFAULT_STATE);
  };

  const handlePrint = () => {
    window.print();
  };

  const handleLoadScenario = (loadedState: CaseState) => {
    setCaseState(loadedState);
    setActiveTab('wizard');
  };

  const handleSelectCategoryFromMatrix = (category: AgeCategory) => {
    let exactAge = caseState.exactAge;
    if (category === 'under_12') exactAge = 8;
    else if (category === 'age_12_15') exactAge = 14;
    else if (category === 'age_16_17') exactAge = 16;
    else if (category === 'adult_18_plus') exactAge = 18;

    setCaseState({
      ...caseState,
      ageCategory: category,
      exactAge
    });
    setActiveTab('wizard');
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans text-slate-900">
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onReset={handleReset}
        onPrint={handlePrint}
      />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {/* Active View Router */}
        {activeTab === 'wizard' && (
          <div className="space-y-6">
            {/* Quick Banner / Breadcrumb */}
            <div className="relative overflow-hidden bg-white border border-slate-200 rounded-xl px-6 py-8 sm:px-10 shadow-xs flex flex-col sm:flex-row sm:items-end justify-between gap-4">
              <img src={patroon} alt="" aria-hidden="true" className="pointer-events-none absolute -right-10 -top-24 h-[340px] w-auto opacity-30 no-print" />
              <div className="relative">
                <p className="jw-subkop mb-3">ToestemmingsWijzer Jeugdhulp</p>
                <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900">
                  Wie moet toestemming geven voor jeugdhulp?
                </h1>
                <div className="jw-lijn my-4" />
                <p className="text-xs sm:text-sm text-slate-600 mt-1">
                  Beantwoord de onderstaande vragen om direct het wettelijke toestemmingsvereiste en handelingsprotocol te bepalen.
                </p>
              </div>

              <div className="relative flex items-center gap-2 shrink-0">
                <button
                  onClick={() => setActiveTab('scenarios')}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors whitespace-nowrap"
                >
                  <FileText className="w-3.5 h-3.5" />
                  <span>Voorbeeldcasussen bekijken</span>
                </button>
              </div>
            </div>

            {/* 2-Column Split: Questions (Left) & Real-Time Verdict (Right) */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
              {/* Wizard Form Inputs */}
              <div className="lg:col-span-7">
                <DecisionWizard
                  state={caseState}
                  onChange={setCaseState}
                />
              </div>

              {/* Instant Legal Evaluation Result */}
              <div className="lg:col-span-5 sticky top-20">
                <AssessmentResult
                  result={evaluationResult}
                  state={caseState}
                  onPrint={handlePrint}
                  onOpenForm={() => setActiveTab('form_generator')}
                />
              </div>
            </div>
          </div>
        )}

        {activeTab === 'scenarios' && (
          <ScenarioLibrary onLoadScenario={handleLoadScenario} />
        )}

        {activeTab === 'matrix' && (
          <MatrixOverview
            currentState={caseState}
            onSelectCategory={handleSelectCategoryFromMatrix}
          />
        )}

        {activeTab === 'form_generator' && (
          <ConsentFormGenerator
            state={caseState}
            result={evaluationResult}
          />
        )}

        {activeTab === 'knowledge' && (
          <KnowledgeBase />
        )}
      </main>

      <footer className="mt-12 bg-white border-t border-slate-200 py-10 text-sm text-slate-600 no-print">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid gap-8 md:grid-cols-2">
          <div>
            <p className="jw-subkop mb-3">Over deze app</p>
            <p className="max-w-md">
              De ToestemmingsWijzer Jeugdhulp is een hulpmiddel van Jolanda Winters. De app is gebaseerd op de Jeugdwet, de WGBO (Boek 7 BW) en Boek 1 van het Burgerlijk Wetboek.
            </p>
          </div>
          <div id="privacy">
            <p className="jw-subkop mb-3">Privacy en gegevens</p>
            <div className="space-y-3 max-w-xl">
              <p>
                Wat je in deze app invult, blijft op je eigen scherm. De app slaat niets op en verstuurt niets. Er is geen database, geen account en er worden geen cookies geplaatst. Sluit of vernieuw je de pagina, dan is alles weg. Ook de lettertypes zitten in de app zelf, zodat er bij het openen geen verbinding met andere diensten wordt gemaakt.
              </p>
              <p>
                De app wordt gehost door Vercel Inc. Om de pagina te kunnen tonen, verwerkt Vercel bij elk bezoek technische gegevens zoals je IP-adres. Vercel is gevestigd in de Verenigde Staten en is gecertificeerd onder het EU-U.S. Data Privacy Framework.
              </p>
              <p>
                Wat je naar je dossier kopieert of afdrukt, valt vanaf dat moment onder de privacyregels van je eigen organisatie.
              </p>
              <p>
                Vragen over privacy: info@jolandawinters.nl
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
