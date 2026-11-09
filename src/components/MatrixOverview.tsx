import React from 'react';
import { CaseState, AgeCategory } from '../types/jeugdhulp';
import { Check, ShieldCheck, Scale, ArrowRight, AlertCircle, FileText } from 'lucide-react';

interface MatrixOverviewProps {
  currentState: CaseState;
  onSelectCategory: (category: AgeCategory) => void;
}

export const MatrixOverview: React.FC<MatrixOverviewProps> = ({
  currentState,
  onSelectCategory
}) => {
  return (
    <div className="space-y-6">
      {/* Intro Header */}
      <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs">
        <div className="max-w-3xl">
          <h2 className="text-xl font-bold text-slate-900">
            Wettelijk Schema Toestemming & Gezag Jeugdhulp
          </h2>
          <p className="text-sm text-slate-600 mt-1">
            Overzicht van het drieledig stelsel in de Nederlandse wetgeving (WGBO Boek 7 BW, Jeugdwet en Burgerlijk Wetboek Boek 1). 
            Klik op een leeftijdscategorie om direct te toetsen.
          </p>
        </div>
      </div>

      {/* 4 Age Columns Comparison */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Tier 1: 0 - 11 jaar */}
        <div 
          onClick={() => onSelectCategory('under_12')}
          className={`cursor-pointer bg-white rounded-xl border p-5 shadow-xs transition-all relative ${
            currentState.ageCategory === 'under_12'
              ? 'border-blue-600 ring-2 ring-blue-600/20'
              : 'border-slate-200 hover:border-slate-300'
          }`}
        >
          {currentState.ageCategory === 'under_12' && (
            <span className="absolute -top-2.5 right-4 px-2 py-0.5 bg-blue-600 text-white text-[10px] font-bold rounded-full uppercase tracking-wider">
              Geselecteerd
            </span>
          )}
          <div className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">Categorie 1</div>
          <h3 className="text-lg font-bold text-slate-900">0 t/m 11 jaar</h3>
          <div className="mt-3 space-y-2 text-xs text-slate-600">
            <div className="p-2.5 bg-slate-50 rounded-lg">
              <span className="font-semibold text-slate-800 block">Wie beslist?</span>
              Alleen gezagsouder(s) of voogd.
            </div>
            <div className="p-2.5 bg-slate-50 rounded-lg">
              <span className="font-semibold text-slate-800 block">Positie van het kind:</span>
              Recht op begrijpelijke uitleg naar vermogen; geen formele toestemming vereist.
            </div>
            <div className="p-2.5 bg-slate-50 rounded-lg">
              <span className="font-semibold text-slate-800 block">Gezamenlijk gezag:</span>
              Beide ouders moeten akkoord gaan. Eén weigerende ouder blokkeert de hulp (tenzij rechter vervangt).
            </div>
          </div>
          <div className="mt-4 pt-3 border-t border-slate-100 text-[11px] font-mono text-slate-500">
            Art. 7:450 lid 1 & Art. 7:465 lid 1 BW
          </div>
        </div>

        {/* Tier 2: 12 - 15 jaar */}
        <div 
          onClick={() => onSelectCategory('age_12_15')}
          className={`cursor-pointer bg-white rounded-xl border p-5 shadow-xs transition-all relative ${
            currentState.ageCategory === 'age_12_15'
              ? 'border-blue-600 ring-2 ring-blue-600/20'
              : 'border-slate-200 hover:border-slate-300'
          }`}
        >
          {currentState.ageCategory === 'age_12_15' && (
            <span className="absolute -top-2.5 right-4 px-2 py-0.5 bg-blue-600 text-white text-[10px] font-bold rounded-full uppercase tracking-wider">
              Geselecteerd
            </span>
          )}
          <div className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">Categorie 2</div>
          <h3 className="text-lg font-bold text-slate-900">12 t/m 15 jaar</h3>
          <div className="mt-3 space-y-2 text-xs text-slate-600">
            <div className="p-2.5 bg-slate-50 rounded-lg">
              <span className="font-semibold text-slate-800 block">Wie beslist?</span>
              <strong className="text-slate-900">Dubbele toestemming:</strong> Zowel het kind als de gezagsouders.
            </div>
            <div className="p-2.5 bg-slate-50 rounded-lg">
              <span className="font-semibold text-slate-800 block">Uitzonderingsclausule:</span>
              Hulp kan doorgaan zónder ouders bij ernstig nadeel OF weloverwogen wens van het kind!
            </div>
            <div className="p-2.5 bg-slate-50 rounded-lg">
              <span className="font-semibold text-slate-800 block">Als kind weigert:</span>
              Behandeling mag NIET plaatsvinden tegen de wil van een wilsbekwaam kind.
            </div>
          </div>
          <div className="mt-4 pt-3 border-t border-slate-100 text-[11px] font-mono text-slate-500">
            Art. 7:450 lid 2 BW (WGBO)
          </div>
        </div>

        {/* Tier 3: 16 & 17 jaar */}
        <div 
          onClick={() => onSelectCategory('age_16_17')}
          className={`cursor-pointer bg-white rounded-xl border p-5 shadow-xs transition-all relative ${
            currentState.ageCategory === 'age_16_17'
              ? 'border-blue-600 ring-2 ring-blue-600/20'
              : 'border-slate-200 hover:border-slate-300'
          }`}
        >
          {currentState.ageCategory === 'age_16_17' && (
            <span className="absolute -top-2.5 right-4 px-2 py-0.5 bg-blue-600 text-white text-[10px] font-bold rounded-full uppercase tracking-wider">
              Geselecteerd
            </span>
          )}
          <div className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">Categorie 3</div>
          <h3 className="text-lg font-bold text-slate-900">16 en 17 jaar</h3>
          <div className="mt-3 space-y-2 text-xs text-slate-600">
            <div className="p-2.5 bg-slate-50 rounded-lg">
              <span className="font-semibold text-slate-800 block">Wie beslist?</span>
              <strong className="text-slate-900">Alleen de jongere:</strong> Zelfstandig bevoegd tot handelen.
            </div>
            <div className="p-2.5 bg-slate-50 rounded-lg">
              <span className="font-semibold text-slate-800 block">Positie van ouders:</span>
              Geen toestemmingsrecht. Ouders kunnen de hulp niet verbieden of stopzetten.
            </div>
            <div className="p-2.5 bg-slate-50 rounded-lg">
              <span className="font-semibold text-slate-800 block">Inzagerecht dossier:</span>
              Ouders krijgen géén inzage zonder schriftelijke toestemming van de 16/17-jarige.
            </div>
          </div>
          <div className="mt-4 pt-3 border-t border-slate-100 text-[11px] font-mono text-slate-500">
            Art. 7:447 & Art. 7:457 BW
          </div>
        </div>

        {/* Tier 4: 18+ jaar */}
        <div 
          onClick={() => onSelectCategory('adult_18_plus')}
          className={`cursor-pointer bg-white rounded-xl border p-5 shadow-xs transition-all relative ${
            currentState.ageCategory === 'adult_18_plus'
              ? 'border-blue-600 ring-2 ring-blue-600/20'
              : 'border-slate-200 hover:border-slate-300'
          }`}
        >
          {currentState.ageCategory === 'adult_18_plus' && (
            <span className="absolute -top-2.5 right-4 px-2 py-0.5 bg-blue-600 text-white text-[10px] font-bold rounded-full uppercase tracking-wider">
              Geselecteerd
            </span>
          )}
          <div className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">Categorie 4</div>
          <h3 className="text-lg font-bold text-slate-900">18 jaar en ouder</h3>
          <div className="mt-3 space-y-2 text-xs text-slate-600">
            <div className="p-2.5 bg-slate-50 rounded-lg">
              <span className="font-semibold text-slate-800 block">Wie beslist?</span>
              Volledig handelingsbekwaam volwassene.
            </div>
            <div className="p-2.5 bg-slate-50 rounded-lg">
              <span className="font-semibold text-slate-800 block">Verlengde jeugdhulp:</span>
              Ook bij verlengde jeugdwetzorg beslist de jongvolwassene zelf.
            </div>
            <div className="p-2.5 bg-slate-50 rounded-lg">
              <span className="font-semibold text-slate-800 block">Rol ouders:</span>
              Geen enkel juridisch recht op bemoeienis of informatie.
            </div>
          </div>
          <div className="mt-4 pt-3 border-t border-slate-100 text-[11px] font-mono text-slate-500">
            Art. 1:245 Burgerlijk Wetboek
          </div>
        </div>
      </div>

      {/* Comprehensive Custody Matrix Table */}
      <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-xs">
        <div className="px-5 py-4 border-b border-slate-100">
          <h3 className="text-base font-bold text-slate-900">Matrix: Gezagsvorm vs. Toestemmingsvereiste</h3>
          <p className="text-xs text-slate-500 mt-0.5">Wat betekent elke juridische gezagsstatus in de praktijk?</p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-slate-700">
                <th className="py-3 px-4 font-bold">Gezagssituatie</th>
                <th className="py-3 px-4 font-bold">Toestemming & Handtekening</th>
                <th className="py-3 px-4 font-bold">Positie niet-toestemmende partij</th>
                <th className="py-3 px-4 font-bold">Informatierecht derden</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              <tr className="hover:bg-slate-50/50">
                <td className="py-3 px-4 font-semibold text-slate-900">Gezamenlijk gezag (getrouwd of partners)</td>
                <td className="py-3 px-4">Beide ouders moeten instemmen (bij ingrijpende hulp/diagnostiek)</td>
                <td className="py-3 px-4">Eén weigerende ouder blokkeert de hulpverlening</td>
                <td className="py-3 px-4">Beide ouders hebben volledig inzagerecht (&lt;16 jr)</td>
              </tr>
              <tr className="hover:bg-slate-50/50">
                <td className="py-3 px-4 font-semibold text-slate-900">Gezamenlijk gezag (gescheiden ouders)</td>
                <td className="py-3 px-4">Beide ouders moeten instemmen. Verplichting om elkaar te informeren</td>
                <td className="py-3 px-4">Instemmende ouder kan vervangende toestemming vragen (art. 1:253a BW)</td>
                <td className="py-3 px-4">Beide ouders hebben recht op dezelfde informatie</td>
              </tr>
              <tr className="hover:bg-slate-50/50">
                <td className="py-3 px-4 font-semibold text-slate-900">Eenhoofdig gezag (moeder óf vader)</td>
                <td className="py-3 px-4">Uitsluitend de gezagsouder beslist en tekent</td>
                <td className="py-3 px-4">Ouder zonder gezag kan de hulp juridisch niet tegenhouden</td>
                <td className="py-3 px-4">Ouder zonder gezag heeft informatierecht (art. 1:377b BW) op verzoek</td>
              </tr>
              <tr className="hover:bg-slate-50/50">
                <td className="py-3 px-4 font-semibold text-slate-900">Ondertoezichtstelling (OTS)</td>
                <td className="py-3 px-4">Ouders behouden gezag, maar GI voert regie en kan aanwijzing geven</td>
                <td className="py-3 px-4">GI kan schriftelijke aanwijzing geven of kinderrechter inschakelen</td>
                <td className="py-3 px-4">GI heeft wettelijk inzagerecht; ouders conform hun gezagsstatus</td>
              </tr>
              <tr className="hover:bg-slate-50/50">
                <td className="py-3 px-4 font-semibold text-slate-900">Voogdij (Gecertificeerde Instelling of particulier)</td>
                <td className="py-3 px-4">Uitsluitend de voogd (GI-medewerker of voogd) verleent toestemming</td>
                <td className="py-3 px-4">Ouders hebben geen gezag meer en hebben geen stem</td>
                <td className="py-3 px-4">Biologische ouders worden naar inzicht van de voogd betrokken</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
