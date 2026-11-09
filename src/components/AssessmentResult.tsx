import React, { useState } from 'react';
import { AssessmentResultData, CaseState } from '../types/jeugdhulp';
import { 
  CheckCircle, 
  AlertTriangle, 
  ShieldAlert, 
  FileCheck, 
  Scale, 
  Copy, 
  Check, 
  Printer, 
  ChevronDown, 
  ChevronUp, 
  Info,
  BookOpen,
  ArrowRight
} from 'lucide-react';

interface AssessmentResultProps {
  result: AssessmentResultData;
  state: CaseState;
  onPrint: () => void;
  onOpenForm: () => void;
}

export const AssessmentResult: React.FC<AssessmentResultProps> = ({
  result,
  state,
  onPrint,
  onOpenForm
}) => {
  const [copied, setCopied] = useState(false);
  const [expandedArticle, setExpandedArticle] = useState<string | null>(null);

  const handleCopyDossier = () => {
    const text = `=== TOESTEMMINGSBEOORDELING JEUGDHULP (WGBO & JEUGDWET) ===
Datum toetsing: ${new Date().toLocaleDateString('nl-NL')}
Leeftijdscategorie: ${state.ageCategory} (${state.exactAge ? state.exactAge + ' jaar' : ''})
Gezagssituatie: ${state.custodyType}
Wilsbekwaamheid: ${state.competenceStatus === 'competent' ? 'Wilsbekwaam ter zake' : 'Wilsonbekwaam'}
Aard hulp: ${state.assistanceType}

HOOFDCONCLUSIE:
${result.primaryVerdictTitle}
${result.primaryVerdictSummary}

VEREISTE HANDTEKENINGEN:
${result.requiredParties.map(p => `- ${p.party} [${p.isRequired ? 'VEREIST' : 'NIET VEREIST'}]: ${p.statusText}`).join('\n')}

JURIDISCHE GRONDSLAG & RECHT:
- ${result.ageRuleExplanation}
- ${result.custodyRuleExplanation}

INFORMATIERECHT & BEROEPSGEHEIM:
- Ouder zonder gezag: ${result.informationRights.nonCustodialParent}
- Ouders bij 16/17 jr: ${result.informationRights.parentsOfOlderMinor}
- Geheimhouding: ${result.informationRights.confidentialityNote}

ESCALATIE / STAPPENPLAN:
${result.escalationPlan.steps.map((s, i) => `${i + 1}. ${s}`).join('\n')}
${result.escalationPlan.courtOption ? '\nRECHTERLIJKE ROUTE: ' + result.escalationPlan.courtOption : ''}
============================================================`;

    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const isConflict = result.escalationPlan.hasConflict;
  const isEmergency = state.assistanceType === 'emergency';

  return (
    <div className="space-y-6">
      {/* 1. Main Assessment Banner */}
      <div className={`rounded-xl border p-6 transition-all ${
        isEmergency
          ? 'bg-red-50/70 border-red-200'
          : isConflict
          ? 'bg-amber-50/70 border-amber-200'
          : 'bg-emerald-50/70 border-emerald-200'
      }`}>
        <div className="flex flex-col gap-5">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              {isEmergency ? (
                <ShieldAlert className="w-6 h-6 text-red-600 shrink-0" />
              ) : isConflict ? (
                <AlertTriangle className="w-6 h-6 text-amber-600 shrink-0" />
              ) : (
                <CheckCircle className="w-6 h-6 text-emerald-600 shrink-0" />
              )}
              <span className="text-xs font-bold uppercase tracking-wider text-slate-600">
                Juridisch Toetsingsadvies
              </span>
            </div>

            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 leading-tight">
              {result.primaryVerdictTitle}
            </h2>
            <p className="text-sm sm:text-base text-slate-700 leading-relaxed max-w-3xl">
              {result.primaryVerdictSummary}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={handleCopyDossier}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold rounded-lg bg-white border border-slate-300 text-slate-800 hover:bg-slate-50 transition-colors shadow-2xs whitespace-nowrap"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4 text-slate-600" />}
              <span>{copied ? 'Gekopieerd!' : 'Kopieer naar Dossier (EPD)'}</span>
            </button>
            <button
              onClick={onOpenForm}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors shadow-2xs whitespace-nowrap"
            >
              <FileCheck className="w-4 h-4" />
              <span>Maak Toestemmingsformulier</span>
            </button>
          </div>
        </div>
      </div>

      {/* 2. Signature and Consent Matrix Table */}
      <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-xs">
        <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between">
          <div>
            <h3 className="text-base font-bold text-slate-900">Wie moet toestemming geven?</h3>
            <p className="text-xs text-slate-500 mt-0.5">Overzicht van vereiste handtekeningen en juridische status</p>
          </div>
          <span className="text-xs text-slate-500">Statusoverzicht</span>
        </div>

        <div className="divide-y divide-slate-100">
          {result.requiredParties.map((party, index) => (
            <div key={index} className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-slate-50/50 transition-colors">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-sm text-slate-900">{party.party}</span>
                  <span className="text-xs text-slate-400">·</span>
                  <span className="text-xs text-slate-500">{party.role}</span>
                </div>
                <p className="text-xs text-slate-600">{party.statusText}</p>
              </div>

              <div className="shrink-0 flex items-center">
                {party.isRequired ? (
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-semibold bg-walnoot text-wit">
                    <CheckCircle className="w-3.5 h-3.5 text-emerald-700" />
                    Toestemming Vereist
                  </span>
                ) : party.badgeStyle === 'conditional' ? (
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-semibold bg-kaneel text-wit">
                    <AlertTriangle className="w-3.5 h-3.5 text-amber-700" />
                    Voorwaardelijk / Uitzondering
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium bg-slate-100 text-slate-600">
                    Niet vereist
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 3. Juridische Grondslag & Uitleg */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs">
          <div className="flex items-center gap-2 mb-2 text-blue-900">
            <Scale className="w-4 h-4 text-blue-600" />
            <h4 className="text-sm font-bold">Leeftijdsregel (WGBO / Jeugdwet)</h4>
          </div>
          <p className="text-xs text-slate-600 leading-relaxed">
            {result.ageRuleExplanation}
          </p>
        </div>

        <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs">
          <div className="flex items-center gap-2 mb-2 text-blue-900">
            <Info className="w-4 h-4 text-blue-600" />
            <h4 className="text-sm font-bold">Gezag & Wettelijke Vertegenwoordiging</h4>
          </div>
          <p className="text-xs text-slate-600 leading-relaxed">
            {result.custodyRuleExplanation}
          </p>
        </div>
      </div>

      {/* 4. Escalatieladder & Handelingsprotocol */}
      <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-md bg-slate-100 text-slate-800 flex items-center justify-center font-bold text-xs">
              §
            </div>
            <h3 className="text-base font-bold text-slate-900">{result.escalationPlan.title}</h3>
          </div>
          <span className="text-xs text-slate-500">Stap-voor-stap protocol</span>
        </div>

        <div className="space-y-3">
          {result.escalationPlan.steps.map((step, idx) => (
            <div key={idx} className="flex items-start gap-3 text-xs sm:text-sm text-slate-700">
              <span className="w-5 h-5 rounded-full bg-slate-100 text-slate-700 text-xs font-semibold flex items-center justify-center shrink-0 mt-0.5">
                {idx + 1}
              </span>
              <p className="leading-relaxed whitespace-pre-line">{step}</p>
            </div>
          ))}
        </div>

        {result.escalationPlan.courtOption && (
          <div className="mt-3 p-3.5 bg-blue-50/70 border border-blue-200 rounded-lg text-xs text-blue-900 flex items-start gap-2.5">
            <Scale className="w-4 h-4 text-blue-700 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold">Rechterlijke procedure: </span>
              {result.escalationPlan.courtOption}
            </div>
          </div>
        )}
      </div>

      {/* 5. Informatierecht & Beroepsgeheim */}
      <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs">
        <h3 className="text-base font-bold text-slate-900 mb-3 flex items-center gap-2">
          <BookOpen className="w-4 h-4 text-slate-600" />
          Informatierecht & Beroepsgeheim
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div className="p-3.5 bg-slate-50 rounded-lg border border-slate-200">
            <span className="font-bold text-slate-900 block mb-1">Ouder zonder gezag (art. 1:377b BW):</span>
            <p className="text-slate-600 leading-relaxed">{result.informationRights.nonCustodialParent}</p>
          </div>

          <div className="p-3.5 bg-slate-50 rounded-lg border border-slate-200">
            <span className="font-bold text-slate-900 block mb-1">Inzagerecht ouders bij 16/17-jarigen:</span>
            <p className="text-slate-600 leading-relaxed">{result.informationRights.parentsOfOlderMinor}</p>
          </div>
        </div>

        <p className="text-xs text-slate-500 mt-3 italic">
          Let op: {result.informationRights.confidentialityNote}
        </p>
      </div>

      {/* 6. Relevante Wetsartikelen (Uitklapbaar) */}
      <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs">
        <h3 className="text-sm font-bold text-slate-900 mb-3 flex items-center gap-2">
          <Scale className="w-4 h-4 text-slate-600" />
          Relevante Wetsartikelen (Wetteksten)
        </h3>

        <div className="space-y-2">
          {result.legalBasis.map((article, i) => (
            <div key={i} className="border border-slate-200 rounded-lg overflow-hidden">
              <button
                onClick={() => setExpandedArticle(expandedArticle === article.title ? null : article.title)}
                className="w-full px-4 py-2.5 text-left text-xs font-semibold text-slate-800 hover:bg-slate-50 flex items-center justify-between transition-colors"
              >
                <span>{article.title}</span>
                {expandedArticle === article.title ? (
                  <ChevronUp className="w-4 h-4 text-slate-500" />
                ) : (
                  <ChevronDown className="w-4 h-4 text-slate-500" />
                )}
              </button>
              {expandedArticle === article.title && (
                <div className="px-4 py-3 bg-slate-50/70 border-t border-slate-200 text-xs space-y-2">
                  <p className="text-slate-600 italic font-mono bg-white p-2.5 rounded border border-slate-200">
                    "{article.content}"
                  </p>
                  <p className="text-slate-700 font-medium">Toelichting: {article.summary}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
