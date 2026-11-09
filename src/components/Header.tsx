import React from 'react';
import { RotateCcw, Printer } from 'lucide-react';
import logo from '../assets/logo.svg';

interface HeaderProps {
  activeTab: 'wizard' | 'scenarios' | 'matrix' | 'form_generator' | 'knowledge';
  setActiveTab: (tab: 'wizard' | 'scenarios' | 'matrix' | 'form_generator' | 'knowledge') => void;
  onReset: () => void;
  onPrint: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  onReset,
  onPrint
}) => {
  return (
    <header className="sticky top-0 z-40 bg-white border-b border-slate-200 shadow-xs no-print">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-8 h-20">
          {/* Zone 1: Single text wordmark */}
          <button 
            onClick={() => setActiveTab('wizard')}
            className="flex items-center gap-2.5 text-left text-slate-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 rounded-sm"
          >
            <img src={logo} alt="Jolanda Winters" className="h-9 w-auto shrink-0" />
            
          </button>

          {/* Zone 2: 4-5 clean single-line navigation links */}
          <nav className="hidden md:flex items-center gap-1 sm:gap-2">
            <button
              onClick={() => setActiveTab('wizard')}
              className={`px-3 py-1.5 text-sm font-medium rounded-md transition-colors whitespace-nowrap shrink-0 ${
                activeTab === 'wizard'
                  ? 'text-slate-900 border-b border-goud !rounded-none'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              Beslisboom
            </button>
            <button
              onClick={() => setActiveTab('scenarios')}
              className={`px-3 py-1.5 text-sm font-medium rounded-md transition-colors whitespace-nowrap shrink-0 ${
                activeTab === 'scenarios'
                  ? 'text-slate-900 border-b border-goud !rounded-none'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              Praktijkcasussen
            </button>
            <button
              onClick={() => setActiveTab('matrix')}
              className={`px-3 py-1.5 text-sm font-medium rounded-md transition-colors whitespace-nowrap shrink-0 ${
                activeTab === 'matrix'
                  ? 'text-slate-900 border-b border-goud !rounded-none'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              Wetsoverzicht
            </button>
            <button
              onClick={() => setActiveTab('form_generator')}
              className={`px-3 py-1.5 text-sm font-medium rounded-md transition-colors whitespace-nowrap shrink-0 ${
                activeTab === 'form_generator'
                  ? 'text-slate-900 border-b border-goud !rounded-none'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              Toestemmingsformulier
            </button>
            <button
              onClick={() => setActiveTab('knowledge')}
              className={`px-3 py-1.5 text-sm font-medium rounded-md transition-colors whitespace-nowrap shrink-0 ${
                activeTab === 'knowledge'
                  ? 'text-slate-900 border-b border-goud !rounded-none'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              Kennisbank & Wetten
            </button>
          </nav>

          {/* Zone 3: 1 primary action / utility */}
          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={onPrint}
              title="Print advies of sla op als PDF"
              className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors whitespace-nowrap shrink-0"
            >
              <Printer className="w-3.5 h-3.5 text-slate-600" />
              <span className="hidden sm:inline">Print Advies</span>
            </button>
            <button
              onClick={onReset}
              title="Herstel alle keuzes naar standaard"
              className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors whitespace-nowrap shrink-0"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Reset</span>
            </button>
          </div>
        </div>

        {/* Mobile Navigation Row */}
        <div className="md:hidden flex items-center justify-between overflow-x-auto py-2 border-t border-slate-100 gap-2 text-xs">
          <button
            onClick={() => setActiveTab('wizard')}
            className={`px-2.5 py-1 rounded whitespace-nowrap shrink-0 font-medium ${
              activeTab === 'wizard' ? 'text-slate-900 border-b border-goud' : 'text-slate-600'
            }`}
          >
            Beslisboom
          </button>
          <button
            onClick={() => setActiveTab('scenarios')}
            className={`px-2.5 py-1 rounded whitespace-nowrap shrink-0 font-medium ${
              activeTab === 'scenarios' ? 'text-slate-900 border-b border-goud' : 'text-slate-600'
            }`}
          >
            Casussen
          </button>
          <button
            onClick={() => setActiveTab('matrix')}
            className={`px-2.5 py-1 rounded whitespace-nowrap shrink-0 font-medium ${
              activeTab === 'matrix' ? 'text-slate-900 border-b border-goud' : 'text-slate-600'
            }`}
          >
            Schema
          </button>
          <button
            onClick={() => setActiveTab('form_generator')}
            className={`px-2.5 py-1 rounded whitespace-nowrap shrink-0 font-medium ${
              activeTab === 'form_generator' ? 'text-slate-900 border-b border-goud' : 'text-slate-600'
            }`}
          >
            Formulier
          </button>
          <button
            onClick={() => setActiveTab('knowledge')}
            className={`px-2.5 py-1 rounded whitespace-nowrap shrink-0 font-medium ${
              activeTab === 'knowledge' ? 'text-slate-900 border-b border-goud' : 'text-slate-600'
            }`}
          >
            Kennisbank
          </button>
        </div>
      </div>
    </header>
  );
};
