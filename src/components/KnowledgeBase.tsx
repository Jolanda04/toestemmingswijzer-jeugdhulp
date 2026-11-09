import React, { useState } from 'react';
import { GLOSSARY_ITEMS } from '../data/glossary';
import { GlossaryItem } from '../types/jeugdhulp';
import { Search, BookOpen, ExternalLink, Scale, CheckCircle2, ChevronRight } from 'lucide-react';

export const KnowledgeBase: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [activeGuideTab, setActiveGuideTab] = useState<'gezagsregister' | 'refusal' | 'competence' | 'non_custodial'>('gezagsregister');

  const categories = ['all', 'Gezag & Recht', 'Wilsbekwaamheid', 'Informatie & Geheimhouding', 'Procedures'];

  const filteredGlossary = GLOSSARY_ITEMS.filter((item) => {
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    const matchesSearch = 
      item.term.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.shortDefinition.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.fullExplanation.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="space-y-8">
      {/* Intro Header */}
      <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs">
        <div className="max-w-3xl">
          <h2 className="text-xl font-bold text-slate-900">
            Juridische Kennisbank & Handelingsprotocollen
          </h2>
          <p className="text-sm text-slate-600 mt-1">
            Wet- en regelgeving, jurisprudentie en praktische protocollen voor jeugdhulpverleners, artsen, 
            wijkteams en juridisch adviseurs over het ouderlijk gezag, de WGBO en de Jeugdwet.
          </p>
        </div>
      </div>

      {/* 4 Practical Step-by-Step Interactive Guides */}
      <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-xs">
        <div className="px-6 py-4 border-b border-slate-100 flex flex-wrap items-center justify-between gap-4">
          <div>
            <h3 className="text-base font-bold text-slate-900">Praktijkwijzers & Protocollen</h3>
            <p className="text-xs text-slate-500 mt-0.5">Stapsgewijze instructies voor formele situaties</p>
          </div>

          <div className="flex flex-wrap gap-1 bg-slate-100 p-1 rounded-lg text-xs">
            <button
              onClick={() => setActiveGuideTab('gezagsregister')}
              className={`px-3 py-1.5 font-medium rounded-md transition-colors whitespace-nowrap shrink-0 ${
                activeGuideTab === 'gezagsregister' ? 'bg-white text-slate-900 shadow-2xs font-semibold' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Gezagsregister Check
            </button>
            <button
              onClick={() => setActiveGuideTab('refusal')}
              className={`px-3 py-1.5 font-medium rounded-md transition-colors whitespace-nowrap shrink-0 ${
                activeGuideTab === 'refusal' ? 'bg-white text-slate-900 shadow-2xs font-semibold' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Weigerende Ouder
            </button>
            <button
              onClick={() => setActiveGuideTab('competence')}
              className={`px-3 py-1.5 font-medium rounded-md transition-colors whitespace-nowrap shrink-0 ${
                activeGuideTab === 'competence' ? 'bg-white text-slate-900 shadow-2xs font-semibold' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Wilsbekwaamheid Toetsen
            </button>
            <button
              onClick={() => setActiveGuideTab('non_custodial')}
              className={`px-3 py-1.5 font-medium rounded-md transition-colors whitespace-nowrap shrink-0 ${
                activeGuideTab === 'non_custodial' ? 'bg-white text-slate-900 shadow-2xs font-semibold' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Ouder Zonder Gezag
            </button>
          </div>
        </div>

        <div className="p-6">
          {activeGuideTab === 'gezagsregister' && (
            <div className="space-y-4 text-xs sm:text-sm text-slate-700">
              <h4 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <Scale className="w-4 h-4 text-blue-600" />
                Hoe vraag je een uittreksel uit het Gezagsregister aan?
              </h4>
              <p className="text-slate-600 leading-relaxed">
                Het Gezagsregister is openbaar en kosteloos te raadplegen. Als jeugdhulpverlener voorkom je tuchtrechtelijke klachten door bij gescheiden ouders vooraf te verifiëren wie het gezag uitoefent.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-2">
                <div className="p-4 bg-slate-50 rounded-lg border border-slate-200 space-y-1.5">
                  <span className="font-bold text-slate-900 block text-xs">Stap 1: Verzamelen gegevens</span>
                  <p className="text-xs text-slate-600">Volledige voor- en achternaam, geboortedatum en geboorteplaats van het kind.</p>
                </div>
                <div className="p-4 bg-slate-50 rounded-lg border border-slate-200 space-y-1.5">
                  <span className="font-bold text-slate-900 block text-xs">Stap 2: Schriftelijk / Digitaal verzoek</span>
                  <p className="text-xs text-slate-600">Dien het verzoek in bij de griffie van de rechtbank in het arrondissement waar het kind woont.</p>
                </div>
                <div className="p-4 bg-slate-50 rounded-lg border border-slate-200 space-y-1.5">
                  <span className="font-bold text-slate-900 block text-xs">Stap 3: Resultaat & Dossier</span>
                  <p className="text-xs text-slate-600">Geen aantekening? Bij gehuwde ouders betekent dit van rechtswege gezamenlijk gezag. Wel aantekening? Volg de uitspraak van de rechter.</p>
                </div>
              </div>
            </div>
          )}

          {activeGuideTab === 'refusal' && (
            <div className="space-y-4 text-xs sm:text-sm text-slate-700">
              <h4 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <Scale className="w-4 h-4 text-amber-600" />
                Stappenplan: Eén ouder met gezag weigert toestemming
              </h4>
              <p className="text-slate-600 leading-relaxed">
                Bij gezamenlijk gezag mag je als hulpverlener NIET zomaar starten als één van beide ouders weigert. Tuchtrechters leggen regelmatig maatregelen op aan hulpverleners die zonder toestemming van vader of moeder aan de slag gaan.
              </p>
              <ol className="list-decimal pl-5 space-y-2 text-xs text-slate-700">
                <li><strong>Onderzoek de bezwaren:</strong> Neem telefonisch of persoonlijk contact op met de weigerende ouder. Leg uit dat de intake of hulp neutraal in het belang van het kind is.</li>
                <li><strong>Aangetekende brief met termijn:</strong> Stuur een zakelijke brief met toelichting op het doel van de hulp en geef een reactietermijn van 14 dagen.</li>
                <li><strong>Toetsing ernstig nadeel:</strong> Leid het staken of niet-starten van de zorg tot direct en ernstig gevaar voor het kind (bijv. suïciderisico of fysiek letsel)? Dan kan art. 7:466 BW of art. 7:450 lid 2 BW gelden.</li>
                <li><strong>Vervangende toestemming kinderrechter:</strong> Wijs de bereidwillige ouder op art. 1:253a BW. De kinderrechter kan de handtekening van de weigerende ouder vervangen.</li>
              </ol>
            </div>
          )}

          {activeGuideTab === 'competence' && (
            <div className="space-y-4 text-xs sm:text-sm text-slate-700">
              <h4 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <Scale className="w-4 h-4 text-emerald-600" />
                Vier criteria voor wilsbekwaamheid ter zake (KNMG)
              </h4>
              <p className="text-slate-600 leading-relaxed">
                Wilsbekwaamheid is een professioneel oordeel over de vraag of de minderjarige in staat is zijn/haar belangen bij deze specifieke beslissing redelijk te waarderen.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-xs">
                <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
                  <span className="font-bold text-slate-900 block mb-1">1. Informatie begrijpen:</span>
                  Kan de jongere de uitleg over het traject in eigen woorden navertellen?
                </div>
                <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
                  <span className="font-bold text-slate-900 block mb-1">2. Relevantie beseffen:</span>
                  Beseft de jongere wat de hulp voor zijn/haar eigen dagelijks leven en toekomst betekent?
                </div>
                <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
                  <span className="font-bold text-slate-900 block mb-1">3. Risico's en alternatieven afwegen:</span>
                  Kan de jongere motiveren waarom hij/zij de hulp wel of juist niet wil?
                </div>
                <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
                  <span className="font-bold text-slate-900 block mb-1">4. Vrijwillige beslissing:</span>
                  Is de keuze van de jongere niet het gevolg van ongeoorloofde druk door één van de ouders?
                </div>
              </div>
            </div>
          )}

          {activeGuideTab === 'non_custodial' && (
            <div className="space-y-4 text-xs sm:text-sm text-slate-700">
              <h4 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <Scale className="w-4 h-4 text-blue-600" />
                Informatierecht van de ouder zonder gezag (art. 1:377b BW)
              </h4>
              <p className="text-slate-600 leading-relaxed">
                Een ouder die geen gezag heeft, kan geen toestemming geven of de hulp verbieden, maar heeft wél een wettelijk recht op informatie door derden.
              </p>
              <div className="space-y-2 text-xs text-slate-700">
                <p><strong>Wel verstrekken:</strong> Globale, feitelijke informatie over belangrijke aangelegenheden (bijv. dat het kind jeugdhulp ontvangt, algemene vorderingen en schoolprestaties).</p>
                <p><strong>Niet verstrekken:</strong> Geen afschrift van het volledige dossier, geen vertrouwelijke gespreksverslagen of adressen van de andere ouder.</p>
                <p><strong>Weigeringsgrond:</strong> Alleen weigeren indien het verstrekken van informatie in strijd is met zwaarwegende belangen van het kind (bijv. veiligheid bij huiselijk geweld).</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Searchable Glossary Section */}
      <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h3 className="text-base font-bold text-slate-900">Begrippenlijst & Juridische Artikelen</h3>
            <p className="text-xs text-slate-500 mt-0.5">Zoek op termen zoals Gezagsregister, Wilsbekwaamheid, OTS of Beroepsgeheim</p>
          </div>

          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Zoek term of artikel..."
              className="w-full pl-9 pr-3 py-1.5 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* Category Pills / Filter Buttons */}
        <div className="flex flex-wrap gap-1.5 pt-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1 text-xs font-medium rounded-lg transition-colors whitespace-nowrap shrink-0 ${
                selectedCategory === cat
                  ? 'bg-slate-900 text-white font-semibold'
                  : 'bg-slate-100 text-slate-600 hover:text-slate-900 hover:bg-slate-200'
              }`}
            >
              {cat === 'all' ? 'Alle categorieën' : cat}
            </button>
          ))}
        </div>

        {/* Glossary Items List */}
        <div className="divide-y divide-slate-100 pt-2">
          {filteredGlossary.map((item) => (
            <div key={item.id} className="py-4 space-y-2">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                <div className="flex items-center gap-2">
                  <h4 className="text-sm font-bold text-slate-900">{item.term}</h4>
                  {item.legalArticle && (
                    <span className="text-[11px] font-mono text-blue-600 bg-blue-50 px-2 py-0.5 rounded">
                      {item.legalArticle}
                    </span>
                  )}
                </div>
                <span className="text-[11px] text-slate-400">{item.category}</span>
              </div>

              <p className="text-xs text-slate-800 font-medium">
                {item.shortDefinition}
              </p>
              <p className="text-xs text-slate-600 leading-relaxed">
                {item.fullExplanation}
              </p>

              {item.actionableAdvice && (
                <div className="p-2.5 bg-emerald-50/60 border border-emerald-100 rounded-md text-xs text-emerald-950 mt-1">
                  <strong className="text-emerald-900">Praktijktip voor de professional:</strong> {item.actionableAdvice}
                </div>
              )}
            </div>
          ))}

          {filteredGlossary.length === 0 && (
            <div className="py-8 text-center text-xs text-slate-500">
              Geen begrippen gevonden voor "{searchQuery}". Probeer een andere zoekterm.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
