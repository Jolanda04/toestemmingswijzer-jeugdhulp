import React from 'react';
import { CaseState, AgeCategory, CustodyType, CompetenceStatus, AssistanceType, StanceOfParties } from '../types/jeugdhulp';
import { User, Shield, Brain, Stethoscope, AlertTriangle, CheckCircle2, HelpCircle } from 'lucide-react';

interface DecisionWizardProps {
  state: CaseState;
  onChange: (newState: CaseState) => void;
}

export const DecisionWizard: React.FC<DecisionWizardProps> = ({ state, onChange }) => {
  const handleAgeCategoryChange = (category: AgeCategory) => {
    let exactAge = state.exactAge;
    if (category === 'under_12') exactAge = 8;
    else if (category === 'age_12_15') exactAge = 14;
    else if (category === 'age_16_17') exactAge = 16;
    else if (category === 'adult_18_plus') exactAge = 18;

    onChange({
      ...state,
      ageCategory: category,
      exactAge
    });
  };

  const handleExactAgeInput = (val: string) => {
    const ageNum = parseInt(val, 10);
    if (isNaN(ageNum)) {
      onChange({ ...state, exactAge: undefined });
      return;
    }
    let cat: AgeCategory = 'under_12';
    if (ageNum >= 18) cat = 'adult_18_plus';
    else if (ageNum >= 16) cat = 'age_16_17';
    else if (ageNum >= 12) cat = 'age_12_15';
    else cat = 'under_12';

    onChange({
      ...state,
      exactAge: ageNum,
      ageCategory: cat
    });
  };

  return (
    <div className="space-y-6">
      {/* Step 1: Leeftijd minderjarige */}
      <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs transition-all">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <span className="flex items-center justify-center w-6 h-6 rounded-full bg-blue-100 text-blue-800 text-xs font-bold">1</span>
            <h3 className="text-base font-semibold text-slate-900">Leeftijd van het kind / de jongere</h3>
          </div>
          <div className="flex items-center gap-2 text-xs text-slate-500">
            <span>Exacte leeftijd:</span>
            <input
              type="number"
              min="0"
              max="25"
              value={state.exactAge !== undefined ? state.exactAge : ''}
              onChange={(e) => handleExactAgeInput(e.target.value)}
              placeholder="bijv. 13"
              className="w-16 px-2 py-1 border border-slate-300 rounded text-center font-mono tabular-nums text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <span>jaar</span>
          </div>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5">
          <button
            type="button"
            onClick={() => handleAgeCategoryChange('under_12')}
            className={`p-3 text-left rounded-lg border transition-all ${
              state.ageCategory === 'under_12'
                ? 'border-blue-600 bg-blue-50/60 ring-1 ring-blue-600'
                : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="text-sm font-semibold text-slate-900">0 t/m 11 jaar</span>
              {state.ageCategory === 'under_12' && <CheckCircle2 className="w-4 h-4 text-blue-600" />}
            </div>
            <p className="text-xs text-slate-600 mt-1">Ouders/voogd beslissen. Geen eigen toestemming kind.</p>
          </button>

          <button
            type="button"
            onClick={() => handleAgeCategoryChange('age_12_15')}
            className={`p-3 text-left rounded-lg border transition-all ${
              state.ageCategory === 'age_12_15'
                ? 'border-blue-600 bg-blue-50/60 ring-1 ring-blue-600'
                : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="text-sm font-semibold text-slate-900">12 t/m 15 jaar</span>
              {state.ageCategory === 'age_12_15' && <CheckCircle2 className="w-4 h-4 text-blue-600" />}
            </div>
            <p className="text-xs text-slate-600 mt-1">Dubbele toestemming: Kind én gezagsouder(s).</p>
          </button>

          <button
            type="button"
            onClick={() => handleAgeCategoryChange('age_16_17')}
            className={`p-3 text-left rounded-lg border transition-all ${
              state.ageCategory === 'age_16_17'
                ? 'border-blue-600 bg-blue-50/60 ring-1 ring-blue-600'
                : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="text-sm font-semibold text-slate-900">16 en 17 jaar</span>
              {state.ageCategory === 'age_16_17' && <CheckCircle2 className="w-4 h-4 text-blue-600" />}
            </div>
            <p className="text-xs text-slate-600 mt-1">Zelfstandig bekwaam. Alleen de jongere beslist!</p>
          </button>

          <button
            type="button"
            onClick={() => handleAgeCategoryChange('adult_18_plus')}
            className={`p-3 text-left rounded-lg border transition-all ${
              state.ageCategory === 'adult_18_plus'
                ? 'border-blue-600 bg-blue-50/60 ring-1 ring-blue-600'
                : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="text-sm font-semibold text-slate-900">18+ jaar</span>
              {state.ageCategory === 'adult_18_plus' && <CheckCircle2 className="w-4 h-4 text-blue-600" />}
            </div>
            <p className="text-xs text-slate-600 mt-1">Meerderjarig. Volledige zelfbeschikking.</p>
          </button>
        </div>
      </div>

      {/* Step 2: Gezagsvorm */}
      <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <span className="flex items-center justify-center w-6 h-6 rounded-full bg-blue-100 text-blue-800 text-xs font-bold">2</span>
            <h3 className="text-base font-semibold text-slate-900">Gezagsvorm & Juridische situatie</h3>
          </div>
          <span className="text-xs text-slate-500">Zie Gezagsregister rechtbank</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2.5">
          <button
            type="button"
            onClick={() => onChange({ ...state, custodyType: 'joint_married' })}
            className={`p-3 text-left rounded-lg border transition-all ${
              state.custodyType === 'joint_married'
                ? 'border-blue-600 bg-blue-50/60 ring-1 ring-blue-600'
                : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="text-sm font-semibold text-slate-900">Gezamenlijk (Samen)</span>
              {state.custodyType === 'joint_married' && <CheckCircle2 className="w-4 h-4 text-blue-600" />}
            </div>
            <p className="text-xs text-slate-600 mt-0.5">Ouders gehuwd, geregistreerd partner of samenwonend met gezamenlijk gezag.</p>
          </button>

          <button
            type="button"
            onClick={() => onChange({ ...state, custodyType: 'joint_divorced' })}
            className={`p-3 text-left rounded-lg border transition-all ${
              state.custodyType === 'joint_divorced'
                ? 'border-blue-600 bg-blue-50/60 ring-1 ring-blue-600'
                : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="text-sm font-semibold text-slate-900">Gezamenlijk (Gescheiden)</span>
              {state.custodyType === 'joint_divorced' && <CheckCircle2 className="w-4 h-4 text-blue-600" />}
            </div>
            <p className="text-xs text-slate-600 mt-0.5">Ouders zijn uit elkaar maar hebben beiden het juridisch ouderlijk gezag behouden.</p>
          </button>

          <button
            type="button"
            onClick={() => onChange({ ...state, custodyType: 'sole_mother' })}
            className={`p-3 text-left rounded-lg border transition-all ${
              state.custodyType === 'sole_mother'
                ? 'border-blue-600 bg-blue-50/60 ring-1 ring-blue-600'
                : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="text-sm font-semibold text-slate-900">Eenhoofdig gezag Moeder</span>
              {state.custodyType === 'sole_mother' && <CheckCircle2 className="w-4 h-4 text-blue-600" />}
            </div>
            <p className="text-xs text-slate-600 mt-0.5">Alleen moeder heeft gezag. Vader heeft geen gezag (wel informatierecht).</p>
          </button>

          <button
            type="button"
            onClick={() => onChange({ ...state, custodyType: 'sole_father' })}
            className={`p-3 text-left rounded-lg border transition-all ${
              state.custodyType === 'sole_father'
                ? 'border-blue-600 bg-blue-50/60 ring-1 ring-blue-600'
                : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="text-sm font-semibold text-slate-900">Eenhoofdig gezag Vader</span>
              {state.custodyType === 'sole_father' && <CheckCircle2 className="w-4 h-4 text-blue-600" />}
            </div>
            <p className="text-xs text-slate-600 mt-0.5">Alleen vader heeft gezag. Moeder heeft geen gezag (wel informatierecht).</p>
          </button>

          <button
            type="button"
            onClick={() => onChange({ ...state, custodyType: 'ots' })}
            className={`p-3 text-left rounded-lg border transition-all ${
              state.custodyType === 'ots'
                ? 'border-blue-600 bg-blue-50/60 ring-1 ring-blue-600'
                : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="text-sm font-semibold text-slate-900">Ondertoezichtstelling (OTS)</span>
              {state.custodyType === 'ots' && <CheckCircle2 className="w-4 h-4 text-blue-600" />}
            </div>
            <p className="text-xs text-slate-600 mt-0.5">Ouders behouden gezag, maar GI / jeugdbeschermer voert regie over de hulp.</p>
          </button>

          <button
            type="button"
            onClick={() => onChange({ ...state, custodyType: 'guardianship_gi' })}
            className={`p-3 text-left rounded-lg border transition-all ${
              state.custodyType === 'guardianship_gi'
                ? 'border-blue-600 bg-blue-50/60 ring-1 ring-blue-600'
                : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="text-sm font-semibold text-slate-900">Voogdij (GI / Voogd)</span>
              {state.custodyType === 'guardianship_gi' && <CheckCircle2 className="w-4 h-4 text-blue-600" />}
            </div>
            <p className="text-xs text-slate-600 mt-0.5">Gezag ouders beëindigd of overleden. Voogdij ligt bij een gecertificeerde instelling.</p>
          </button>
        </div>
      </div>

      {/* Step 3: Wilsbekwaamheid ter zake */}
      <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <span className="flex items-center justify-center w-6 h-6 rounded-full bg-blue-100 text-blue-800 text-xs font-bold">3</span>
            <h3 className="text-base font-semibold text-slate-900">Wilsbekwaamheid van de minderjarige</h3>
          </div>
          <span className="text-xs text-slate-500">Altijd beoordeeld "ter zake"</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <button
            type="button"
            onClick={() => onChange({ ...state, competenceStatus: 'competent' })}
            className={`p-3.5 text-left rounded-lg border transition-all ${
              state.competenceStatus === 'competent'
                ? 'border-emerald-600 bg-emerald-50/60 ring-1 ring-emerald-600'
                : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="text-sm font-semibold text-slate-900">Wilsbekwaam ter zake (Standaard)</span>
              {state.competenceStatus === 'competent' && <CheckCircle2 className="w-4 h-4 text-emerald-600" />}
            </div>
            <p className="text-xs text-slate-600 mt-1">
              Het kind/de jongere kan de strekking en gevolgen van de hulpverlening redelijkerwijs begrijpen en afwegen.
            </p>
          </button>

          <button
            type="button"
            onClick={() => onChange({ ...state, competenceStatus: 'incompetent' })}
            className={`p-3.5 text-left rounded-lg border transition-all ${
              state.competenceStatus === 'incompetent'
                ? 'border-amber-600 bg-amber-50/60 ring-1 ring-amber-600'
                : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="text-sm font-semibold text-slate-900">Wilsonbekwaam ter zake</span>
              {state.competenceStatus === 'incompetent' && <CheckCircle2 className="w-4 h-4 text-amber-600" />}
            </div>
            <p className="text-xs text-slate-600 mt-1">
              Kan de belangen bij dit besluit niet overzien (bijv. ernstige verstandelijke beperking, acute psychose of coma).
            </p>
          </button>
        </div>
      </div>

      {/* Step 4: Aard van de hulp / Type verrichting */}
      <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <span className="flex items-center justify-center w-6 h-6 rounded-full bg-blue-100 text-blue-800 text-xs font-bold">4</span>
            <h3 className="text-base font-semibold text-slate-900">Aard van het hulptraject</h3>
          </div>
          <span className="text-xs text-slate-500">Impact op noodzaak formele toestemming</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
          <button
            type="button"
            onClick={() => onChange({ ...state, assistanceType: 'ambulatory' })}
            className={`p-3 text-left rounded-lg border transition-all ${
              state.assistanceType === 'ambulatory'
                ? 'border-blue-600 bg-blue-50/60 ring-1 ring-blue-600'
                : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="text-sm font-semibold text-slate-900">Ambulant / Gesprekken</span>
              {state.assistanceType === 'ambulatory' && <CheckCircle2 className="w-4 h-4 text-blue-600" />}
            </div>
            <p className="text-xs text-slate-600 mt-0.5">Laagdrempelige gesprekken, psycho-educatie, opvoedondersteuning.</p>
          </button>

          <button
            type="button"
            onClick={() => onChange({ ...state, assistanceType: 'diagnostic' })}
            className={`p-3 text-left rounded-lg border transition-all ${
              state.assistanceType === 'diagnostic'
                ? 'border-blue-600 bg-blue-50/60 ring-1 ring-blue-600'
                : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="text-sm font-semibold text-slate-900">Diagnostisch onderzoek</span>
              {state.assistanceType === 'diagnostic' && <CheckCircle2 className="w-4 h-4 text-blue-600" />}
            </div>
            <p className="text-xs text-slate-600 mt-0.5">Psychologisch/psychiatrisch onderzoek, intelligentie- of ADHD/autisme-test.</p>
          </button>

          <button
            type="button"
            onClick={() => onChange({ ...state, assistanceType: 'specialist_ggz' })}
            className={`p-3 text-left rounded-lg border transition-all ${
              state.assistanceType === 'specialist_ggz'
                ? 'border-blue-600 bg-blue-50/60 ring-1 ring-blue-600'
                : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="text-sm font-semibold text-slate-900">Specialistische GGZ / Behandeling</span>
              {state.assistanceType === 'specialist_ggz' && <CheckCircle2 className="w-4 h-4 text-blue-600" />}
            </div>
            <p className="text-xs text-slate-600 mt-0.5">Intensieve traumabehandeling (EMDR), psychotherapie, angstbehandeling.</p>
          </button>

          <button
            type="button"
            onClick={() => onChange({ ...state, assistanceType: 'medication' })}
            className={`p-3 text-left rounded-lg border transition-all ${
              state.assistanceType === 'medication'
                ? 'border-blue-600 bg-blue-50/60 ring-1 ring-blue-600'
                : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="text-sm font-semibold text-slate-900">Medicamenteus / Medisch</span>
              {state.assistanceType === 'medication' && <CheckCircle2 className="w-4 h-4 text-blue-600" />}
            </div>
            <p className="text-xs text-slate-600 mt-0.5">Starten van psychofarmaca (methylfenidaat, antidepressiva) door arts/psychiater.</p>
          </button>

          <button
            type="button"
            onClick={() => onChange({ ...state, assistanceType: 'residential' })}
            className={`p-3 text-left rounded-lg border transition-all ${
              state.assistanceType === 'residential'
                ? 'border-blue-600 bg-blue-50/60 ring-1 ring-blue-600'
                : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="text-sm font-semibold text-slate-900">Verblijf / Residentieel</span>
              {state.assistanceType === 'residential' && <CheckCircle2 className="w-4 h-4 text-blue-600" />}
            </div>
            <p className="text-xs text-slate-600 mt-0.5">Opname in jeugdinstelling, pleeggezin, gezinshuis of kliniek.</p>
          </button>

          <button
            type="button"
            onClick={() => onChange({ ...state, assistanceType: 'emergency' })}
            className={`p-3 text-left rounded-lg border transition-all ${
              state.assistanceType === 'emergency'
                ? 'border-red-600 bg-red-50/60 ring-1 ring-red-600'
                : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="text-sm font-semibold text-red-900 flex items-center gap-1.5">
                <AlertTriangle className="w-4 h-4 text-red-600" />
                Acute Spoed / Crisis
              </span>
              {state.assistanceType === 'emergency' && <CheckCircle2 className="w-4 h-4 text-red-600" />}
            </div>
            <p className="text-xs text-slate-600 mt-0.5">Levensgevaar, acute suïcidaliteit, ernstig nadeel voorkomen (art. 7:466 BW).</p>
          </button>
        </div>
      </div>

      {/* Step 5: Standpunt van betrokken partijen */}
      <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <span className="flex items-center justify-center w-6 h-6 rounded-full bg-blue-100 text-blue-800 text-xs font-bold">5</span>
            <h3 className="text-base font-semibold text-slate-900">Standpunt & Bereidheid van partijen</h3>
          </div>
          <span className="text-xs text-slate-500">Wat is de feitelijke situatie?</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2.5">
          <button
            type="button"
            onClick={() => onChange({ ...state, stanceOfParties: 'both_agree' })}
            className={`p-3 text-left rounded-lg border transition-all ${
              state.stanceOfParties === 'both_agree'
                ? 'border-emerald-600 bg-emerald-50/60 ring-1 ring-emerald-600'
                : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="text-sm font-semibold text-slate-900">Iedereen is akkoord</span>
              {state.stanceOfParties === 'both_agree' && <CheckCircle2 className="w-4 h-4 text-emerald-600" />}
            </div>
            <p className="text-xs text-slate-600 mt-0.5">Beide gezagsouders en het kind (indien van toepassing) stemmen in.</p>
          </button>

          <button
            type="button"
            onClick={() => onChange({ ...state, stanceOfParties: 'one_parent_refuses' })}
            className={`p-3 text-left rounded-lg border transition-all ${
              state.stanceOfParties === 'one_parent_refuses'
                ? 'border-amber-600 bg-amber-50/60 ring-1 ring-amber-600'
                : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="text-sm font-semibold text-slate-900">Eén gezagsouder weigert</span>
              {state.stanceOfParties === 'one_parent_refuses' && <CheckCircle2 className="w-4 h-4 text-amber-600" />}
            </div>
            <p className="text-xs text-slate-600 mt-0.5">Eén ouder met gezag wil de hulpverlening uitdrukkelijk niet toelaten of tekenen.</p>
          </button>

          <button
            type="button"
            onClick={() => onChange({ ...state, stanceOfParties: 'both_parents_refuse' })}
            className={`p-3 text-left rounded-lg border transition-all ${
              state.stanceOfParties === 'both_parents_refuse'
                ? 'border-rose-600 bg-rose-50/60 ring-1 ring-rose-600'
                : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="text-sm font-semibold text-slate-900">Beide gezagsouders weigeren</span>
              {state.stanceOfParties === 'both_parents_refuse' && <CheckCircle2 className="w-4 h-4 text-rose-600" />}
            </div>
            <p className="text-xs text-slate-600 mt-0.5">Ouders weigeren de hulp, maar kind of school/hulpverlener signaleert noodzaak.</p>
          </button>

          <button
            type="button"
            onClick={() => onChange({ ...state, stanceOfParties: 'parent_unreachable' })}
            className={`p-3 text-left rounded-lg border transition-all ${
              state.stanceOfParties === 'parent_unreachable'
                ? 'border-indigo-600 bg-indigo-50/60 ring-1 ring-indigo-600'
                : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="text-sm font-semibold text-slate-900">Ouder is onbereikbaar</span>
              {state.stanceOfParties === 'parent_unreachable' && <CheckCircle2 className="w-4 h-4 text-indigo-600" />}
            </div>
            <p className="text-xs text-slate-600 mt-0.5">Eén gezagsouder reageert niet op brieven, telefoon of verblijft in buitenland.</p>
          </button>

          <button
            type="button"
            onClick={() => onChange({ ...state, stanceOfParties: 'child_wants_secret' })}
            className={`p-3 text-left rounded-lg border transition-all ${
              state.stanceOfParties === 'child_wants_secret'
                ? 'border-purple-600 bg-purple-50/60 ring-1 ring-purple-600'
                : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="text-sm font-semibold text-slate-900">Jongere wil hulp zónder ouders</span>
              {state.stanceOfParties === 'child_wants_secret' && <CheckCircle2 className="w-4 h-4 text-purple-600" />}
            </div>
            <p className="text-xs text-slate-600 mt-0.5">Jongere (12-15 jr) wil absoluut niet dat ouders worden ingelicht (angst/schaamte).</p>
          </button>

          <button
            type="button"
            onClick={() => onChange({ ...state, stanceOfParties: 'child_refuses' })}
            className={`p-3 text-left rounded-lg border transition-all ${
              state.stanceOfParties === 'child_refuses'
                ? 'border-red-600 bg-red-50/60 ring-1 ring-red-600'
                : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="text-sm font-semibold text-slate-900">Kind / Jongere weigert</span>
              {state.stanceOfParties === 'child_refuses' && <CheckCircle2 className="w-4 h-4 text-red-600" />}
            </div>
            <p className="text-xs text-slate-600 mt-0.5">Ouders willen het wel, maar kind vanaf 12 jaar verzet zich tegen het traject.</p>
          </button>
        </div>
      </div>
    </div>
  );
};
