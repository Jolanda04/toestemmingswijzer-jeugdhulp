import React, { useState } from 'react';
import { CaseState, AssessmentResultData } from '../types/jeugdhulp';
import { Printer, Copy, Check, FileCheck, ShieldCheck, Download } from 'lucide-react';

interface ConsentFormGeneratorProps {
  state: CaseState;
  result: AssessmentResultData;
}

export const ConsentFormGenerator: React.FC<ConsentFormGeneratorProps> = ({
  state,
  result
}) => {
  const [clientName, setClientName] = useState('Robin de Vries');
  const [birthDate, setBirthDate] = useState('2012-04-15');
  const [practitionerName, setPractitionerName] = useState('Drs. M. Bakker');
  const [organizationName, setOrganizationName] = useState('Praktijk voor Jeugd & Gezin');
  const [registerChecked, setRegisterChecked] = useState(true);
  const [registerCheckDate, setRegisterCheckDate] = useState(new Date().toISOString().split('T')[0]);
  const [copied, setCopied] = useState(false);

  const handlePrint = () => {
    window.print();
  };

  const generateEPDText = () => {
    return `=== DOSSIERAANTEKENING GEZAGSCONTROLE & TOESTEMMING JEUGDHULP ===
Datum vastlegging: ${new Date().toLocaleDateString('nl-NL')}
Cliënt: ${clientName || '[Naam cliënt]'} (Geb.datum: ${birthDate || '[Geboortedatum]'})
Hulpverlener: ${practitionerName} (${organizationName})

GEZAG & JURIDISCHE STATUS:
- Leeftijdscategorie: ${state.ageCategory}
- Gezagsvorm: ${state.custodyType}
- Gezagsregister geraadpleegd: ${registerChecked ? `JA, op ${registerCheckDate}` : 'Nog niet'}
- Wilsbekwaamheid minderjarige: ${state.competenceStatus === 'competent' ? 'Wilsbekwaam ter zake geoordeeld' : 'Wilsonbekwaam ter zake'}
- Aard traject: ${state.assistanceType}

WETTELIJK TOETSINGSADVIES:
${result.primaryVerdictTitle}
${result.primaryVerdictSummary}

VEREISTE HANDTEKENINGEN / INSTEMMING:
${result.requiredParties.map(p => `- ${p.party}: ${p.isRequired ? 'VEREIST' : 'Niet vereist'} (${p.statusText})`).join('\n')}

Wettelijke grondslag: WGBO (Boek 7 BW art. 7:446 e.v.) & Jeugdwet hoofdstuk 7.
Dossierstatus: Voldoet aan de vereisten voor start hulpverlening conform richtlijn SKJ/KNMG.
=================================================================`;
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(generateEPDText());
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="space-y-6">
      {/* Configuration Header */}
      <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs no-print">
        <div className="max-w-3xl">
          <h2 className="text-xl font-bold text-slate-900">
            Toestemmingsformulier & Dossieraantekening Generator
          </h2>
          <p className="text-sm text-slate-600 mt-1">
            Genereer een juridisch sluitende verklaring en dossieraantekening op basis van de huidige beslisboomkeuzes. 
            Geschikt voor opname in het EPD of om geprint te laten ondertekenen.
          </p>
          <p className="text-sm text-slate-700 mt-3 border-l border-goud pl-3">
            Wat je hier invult, blijft op je eigen scherm. Er wordt niets opgeslagen of verstuurd. Vernieuw je de pagina, dan zijn de gegevens weg.
          </p>
        </div>

        {/* Input Details */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-5 pt-4 border-t border-slate-100">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Naam cliënt / minderjarige</label>
            <input
              type="text"
              value={clientName}
              onChange={(e) => setClientName(e.target.value)}
              className="w-full px-3 py-1.5 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Volledige naam"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Geboortedatum</label>
            <input
              type="date"
              value={birthDate}
              onChange={(e) => setBirthDate(e.target.value)}
              className="w-full px-3 py-1.5 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Behandelend hulpverlener</label>
            <input
              type="text"
              value={practitionerName}
              onChange={(e) => setPractitionerName(e.target.value)}
              className="w-full px-3 py-1.5 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Drs. / Naam"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Organisatie / Praktijk</label>
            <input
              type="text"
              value={organizationName}
              onChange={(e) => setOrganizationName(e.target.value)}
              className="w-full px-3 py-1.5 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Praktijknaam"
            />
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-4 mt-4 pt-4 border-t border-slate-100">
          <label className="flex items-center gap-2 text-xs text-slate-700 cursor-pointer">
            <input
              type="checkbox"
              checked={registerChecked}
              onChange={(e) => setRegisterChecked(e.target.checked)}
              className="rounded text-blue-600 focus:ring-blue-500 h-4 w-4"
            />
            <span>Gezagsregister gecontroleerd bij de rechtbank</span>
          </label>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopy}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors shadow-2xs"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5 text-slate-600" />}
              <span>{copied ? 'Gekopieerd!' : 'Kopieer EPD Aantekening'}</span>
            </button>
            <button
              onClick={handlePrint}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold text-white bg-slate-900 rounded-lg hover:bg-slate-800 transition-colors shadow-2xs"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print Formulier (PDF)</span>
            </button>
          </div>
        </div>
      </div>

      {/* Printable / Viewable Form Document */}
      <div className="bg-white border border-slate-300 rounded-xl p-8 sm:p-10 shadow-sm max-w-4xl mx-auto font-sans text-slate-900 printable-document">
        {/* Document Header */}
        <div className="border-b-2 border-slate-900 pb-5 mb-6 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <span className="text-xs font-bold tracking-widest uppercase text-slate-500 block mb-1">
              Officiële Jeugdhulpverklaring
            </span>
            <h1 className="text-2xl font-bold tracking-tight text-slate-900">
              Toestemmingsverklaring & Gezagsbeoordeling
            </h1>
            <p className="text-xs text-slate-600 mt-1">
              In het kader van de Jeugdwet en de Wet op de geneeskundige behandelingsovereenkomst (WGBO)
            </p>
          </div>
          <div className="text-right text-xs text-slate-500 font-mono">
            Datum: {new Date().toLocaleDateString('nl-NL')}
          </div>
        </div>

        {/* Client & Organization Details */}
        <div className="grid grid-cols-2 gap-4 text-xs mb-6 p-4 bg-slate-50 rounded-lg border border-slate-200">
          <div>
            <span className="text-slate-500 block">Cliënt / Minderjarige:</span>
            <span className="font-bold text-slate-900 text-sm">{clientName || 'Nog in te vullen'}</span>
            <span className="text-slate-600 block mt-0.5">Geboortedatum: {birthDate || 'Onbekend'}</span>
          </div>
          <div>
            <span className="text-slate-500 block">Zorgaanbieder / Praktijk:</span>
            <span className="font-bold text-slate-900 text-sm">{organizationName || 'Onbekend'}</span>
            <span className="text-slate-600 block mt-0.5">Hulpverlener: {practitionerName || 'Onbekend'}</span>
          </div>
        </div>

        {/* Legal Assessment Summary */}
        <div className="mb-6 space-y-3">
          <h3 className="text-sm font-bold uppercase tracking-wider text-slate-900 border-b border-slate-200 pb-1">
            1. Juridische Gezagsstatus & Besluitvorming
          </h3>
          <p className="text-xs text-slate-700 leading-relaxed">
            Op basis van de leeftijd ({state.exactAge ? `${state.exactAge} jaar` : state.ageCategory}), 
            de gezagsvorm ({state.custodyType}) en de aard van het traject ({state.assistanceType}) is 
            vastgesteld dat de bevoegdheid tot het verlenen van toestemming als volgt is geregeld:
          </p>

          <div className="p-3.5 bg-slate-100 rounded-md border border-slate-200 text-xs">
            <span className="font-bold text-slate-900 block mb-1">Wettelijk Oordeel:</span>
            <p className="text-slate-800 font-medium">{result.primaryVerdictTitle}</p>
            <p className="text-slate-600 mt-1">{result.primaryVerdictSummary}</p>
          </div>

          {registerChecked && (
            <div className="flex items-center gap-2 text-xs text-emerald-800 bg-emerald-50 p-2.5 rounded border border-emerald-200">
              <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>
                Het Centraal Gezagsregister is geverifieerd op <strong>{registerCheckDate}</strong>. 
                De gezagsverhoudingen zijn conform de registratie overgenomen.
              </span>
            </div>
          )}
        </div>

        {/* Informed Consent Scope */}
        <div className="mb-6 space-y-3">
          <h3 className="text-sm font-bold uppercase tracking-wider text-slate-900 border-b border-slate-200 pb-1">
            2. Reikwijdte van de Toestemming (Informed Consent)
          </h3>
          <ul className="list-disc pl-5 text-xs text-slate-700 space-y-1.5 leading-relaxed">
            <li>Ondergetekenden zijn naar behoren geïnformeerd over het doel, de werkwijze en eventuele risico’s van de jeugdhulp.</li>
            <li>Toestemming wordt verleend voor het intakegesprek, onderzoek/behandeling en dossiervorming conform de Jeugdwet en WGBO.</li>
            <li>Informatie-uitwisseling met derden (zoals school of huisarts) geschiedt uitsluitend na aanvullende specifieke toestemming, behoudens wettelijke meldplichten.</li>
            <li>Toestemming kan te allen tijde schriftelijk worden herroepen, zonder nadelige gevolgen voor de overige zorgplicht.</li>
          </ul>
        </div>

        {/* Signature Blocks */}
        <div className="mt-8 space-y-4">
          <h3 className="text-sm font-bold uppercase tracking-wider text-slate-900 border-b border-slate-200 pb-1">
            3. Ondertekening door bevoegde partijen
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2">
            {/* Child Signature (if >= 12) */}
            {(state.ageCategory === 'age_12_15' || state.ageCategory === 'age_16_17' || state.ageCategory === 'adult_18_plus') && (
              <div className="border border-slate-200 rounded-lg p-4 bg-slate-50/50">
                <span className="text-xs font-bold text-slate-900 block">De Jeugdige ({clientName})</span>
                <span className="text-[11px] text-slate-500 block mb-8">
                  {state.ageCategory === 'age_16_17' ? 'Zelfstandig bevoegd (art. 7:447 BW)' : 'Dubbele toestemming (art. 7:450 lid 2 BW)'}
                </span>
                <div className="border-t border-dashed border-slate-400 pt-2 flex justify-between text-[11px] text-slate-500">
                  <span>Handtekening</span>
                  <span>Datum: ___ / ___ / 2026</span>
                </div>
              </div>
            )}

            {/* Parent 1 */}
            <div className="border border-slate-200 rounded-lg p-4 bg-slate-50/50">
              <span className="text-xs font-bold text-slate-900 block">Gezaghebbende Ouder 1 / Moeder / Voogd</span>
              <span className="text-[11px] text-slate-500 block mb-8">Naam: _______________________________</span>
              <div className="border-t border-dashed border-slate-400 pt-2 flex justify-between text-[11px] text-slate-500">
                <span>Handtekening</span>
                <span>Datum: ___ / ___ / 2026</span>
              </div>
            </div>

            {/* Parent 2 (if joint custody) */}
            {(state.custodyType === 'joint_married' || state.custodyType === 'joint_divorced' || state.custodyType === 'ots') && (
              <div className="border border-slate-200 rounded-lg p-4 bg-slate-50/50">
                <span className="text-xs font-bold text-slate-900 block">Gezaghebbende Ouder 2 / Vader</span>
                <span className="text-[11px] text-slate-500 block mb-8">Naam: _______________________________</span>
                <div className="border-t border-dashed border-slate-400 pt-2 flex justify-between text-[11px] text-slate-500">
                  <span>Handtekening</span>
                  <span>Datum: ___ / ___ / 2026</span>
                </div>
              </div>
            )}

            {/* Professional Signature */}
            <div className="border border-slate-200 rounded-lg p-4 bg-slate-50/50">
              <span className="text-xs font-bold text-slate-900 block">Behandelend Jeugdhulpverlener</span>
              <span className="text-[11px] text-slate-500 block mb-8">{practitionerName} ({organizationName})</span>
              <div className="border-t border-dashed border-slate-400 pt-2 flex justify-between text-[11px] text-slate-500">
                <span>Handtekening</span>
                <span>Datum: ___ / ___ / 2026</span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer legal note */}
        <div className="mt-8 pt-4 border-t border-slate-200 text-[10px] text-slate-500 text-center">
          Vastgelegd conform de Beroepscode voor Jeugd- en Gezinsprofessionals (SKJ) en KNMG Richtlijn inzake Toestemming Minderjarigen.
        </div>
      </div>
    </div>
  );
};
