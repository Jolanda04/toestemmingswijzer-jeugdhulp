export type AgeCategory = 'under_12' | 'age_12_15' | 'age_16_17' | 'adult_18_plus';

export type CustodyType = 
  | 'joint_married'         // Gezamenlijk gezag (gehuwd / geregistreerd / samenwonend met gezamenlijk gezag)
  | 'joint_divorced'        // Gezamenlijk gezag na scheiding
  | 'sole_mother'           // Eenhoofdig gezag moeder
  | 'sole_father'           // Eenhoofdig gezag vader
  | 'guardianship_gi'       // Voogdij gecertificeerde instelling (GI)
  | 'guardianship_person'   // Voogdij natuurlijk persoon (bijv. pleegouder/familie)
  | 'ots';                  // Gezamenlijk/eenhoofdig gezag met Ondertoezichtstelling (OTS)

export type CompetenceStatus = 'competent' | 'incompetent'; // Wilsbekwaam ter zake vs Wilsonbekwaam

export type AssistanceType = 
  | 'ambulatory'            // Reguliere ambulante jeugdhulp / gesprekken / opvoedondersteuning
  | 'diagnostic'            // Psychologisch / psychiatrisch onderzoek (diagnostiek)
  | 'specialist_ggz'        // Specialistische jeugd-GGZ / intensieve behandeling
  | 'medication'            // Medicamenteuze behandeling / medische ingreep
  | 'residential'           // Residentiële plaatsing / uithuisplaatsing
  | 'emergency';            // Acute crisis / spoedeisende zorg

export type StanceOfParties = 
  | 'both_agree'            // Beide ouders/gezagsdragers en kind akkoord
  | 'one_parent_refuses'    // Eén gezagsouder weigert (de andere wil wel)
  | 'both_parents_refuse'   // Beide gezagsouders weigeren
  | 'parent_unreachable'    // Eén ouder onvindbaar / reageert herhaaldelijk niet
  | 'child_refuses'         // Kind (vanaf 12 jaar) weigert
  | 'child_wants_secret';   // Kind (12-15 jaar) wil hulp buiten medeweten van ouders

export interface CaseState {
  exactAge?: number;
  ageCategory: AgeCategory;
  custodyType: CustodyType;
  competenceStatus: CompetenceStatus;
  assistanceType: AssistanceType;
  stanceOfParties: StanceOfParties;
}

export interface RequiredConsentParty {
  party: string;
  role: string;
  isRequired: boolean;
  statusText: string;
  badgeStyle: 'required' | 'optional' | 'not_required' | 'conditional';
}

export interface LegalArticle {
  title: string;
  source: string;
  summary: string;
  content: string;
}

export interface AssessmentResultData {
  primaryVerdictTitle: string;
  primaryVerdictSummary: string;
  requiredParties: RequiredConsentParty[];
  ageRuleExplanation: string;
  custodyRuleExplanation: string;
  escalationPlan: {
    hasConflict: boolean;
    title: string;
    steps: string[];
    courtOption?: string;
  };
  informationRights: {
    nonCustodialParent: string;
    parentsOfOlderMinor: string;
    confidentialityNote: string;
  };
  legalBasis: LegalArticle[];
  practicalTips: string[];
}

export interface PracticeScenario {
  id: string;
  title: string;
  subtitle: string;
  tag: string;
  description: string;
  state: CaseState;
  keyTakeaway: string;
}

export interface GlossaryItem {
  id: string;
  term: string;
  category: 'Gezag & Recht' | 'Wilsbekwaamheid' | 'Informatie & Geheimhouding' | 'Procedures';
  shortDefinition: string;
  fullExplanation: string;
  legalArticle?: string;
  actionableAdvice?: string;
}
