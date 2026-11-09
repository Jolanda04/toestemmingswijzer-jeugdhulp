import { PracticeScenario } from '../types/jeugdhulp';

export const PRACTICE_SCENARIOS: PracticeScenario[] = [
  {
    id: 'divorce_refusing_father',
    title: 'Vechtscheiding: Moeder wil hulp voor kind (8 jr), vader weigert',
    subtitle: 'Kind 8 jaar · Gezamenlijk gezag · Eén weigerende ouder',
    tag: 'Echtscheiding & Weigering',
    description: 'De ouders zijn gescheiden en hebben gezamenlijk gezag. Moeder meldt haar 8-jarige zoon aan voor psychologische diagnostiek wegens ernstige driftbuien en angst. Vader weigert categorisch zijn handtekening te zetten, omdat hij stelt dat het probleem bij moeder ligt.',
    state: {
      exactAge: 8,
      ageCategory: 'under_12',
      custodyType: 'joint_divorced',
      competenceStatus: 'competent',
      assistanceType: 'diagnostic',
      stanceOfParties: 'one_parent_refuses'
    },
    keyTakeaway: 'Hulpverlener mag NIET starten zonder akkoord van vader. Moeder kan bij de kinderrechter vervangende toestemming vragen op grond van art. 1:253a BW.'
  },
  {
    id: 'teen_secret_depression',
    title: 'Jongere (14 jr) zoekt hulp bij somberheid, ouders mogen niets weten',
    subtitle: 'Jongere 14 jaar · Gezamenlijk gezag · Weloverwogen wens',
    tag: 'Dubbele toestemming & Uitzondering',
    description: 'Een 14-jarig meisje meldt zich bij het wijkteam/jeugd-GGZ voor ernstige somberheidsklachten en angst. Ze durft haar ouders niet in te lichten omdat haar ouders streng religieus zijn en psychische hulp afwijzen. Ze vreest verstoting en escalatie thuis.',
    state: {
      exactAge: 14,
      ageCategory: 'age_12_15',
      custodyType: 'joint_married',
      competenceStatus: 'competent',
      assistanceType: 'specialist_ggz',
      stanceOfParties: 'child_wants_secret'
    },
    keyTakeaway: 'De hulpverlener kan de hulp rechtmatig starten zónder medeweten van de ouders op grond van art. 7:450 lid 2 BW (ernstig nadeel voorkomen & weloverwogen wens wilsbekwame jongere).'
  },
  {
    id: 'teen_16_privacy_records',
    title: 'Jongere 16 jaar in traject, ouders eisen inzage in dossier',
    subtitle: 'Jongere 16 jaar · Ouders eisen dossierinzage',
    tag: 'Beroepsgeheim & Zelfstandigheid',
    description: 'Een 16-jarige jongen volgt individuele ambulante jeugdhulp. Zijn ouders bellen boos naar de praktijk: zij zijn immers de gezaghebbende ouders en eisen onmiddellijke afschriften van alle behandelverslagen en aantekeningen.',
    state: {
      exactAge: 16,
      ageCategory: 'age_16_17',
      custodyType: 'joint_married',
      competenceStatus: 'competent',
      assistanceType: 'ambulatory',
      stanceOfParties: 'both_parents_refuse'
    },
    keyTakeaway: 'Ouders hebben GEEN recht op dossierinzage. De jongere is zelfstandig bevoegd (art. 7:447 BW) en het medisch beroepsgeheim geldt onverkort tegenover de ouders (art. 7:457 BW).'
  },
  {
    id: 'sole_custody_angry_father',
    title: 'Moeder heeft eenhoofdig gezag, vader zonder gezag eist stopzetting',
    subtitle: 'Kind 10 jaar · Eenhoofdig gezag moeder · Boze vader',
    tag: 'Eenhoofdig gezag & Informatierecht',
    description: 'Moeder heeft na gerechtelijke uitspraak het eenhoofdig gezag verkregen over haar 10-jarige dochter. Zij start speltherapie. De biologische vader (zonder gezag) stuurt een sommatiebrief waarin hij eist dat de therapie direct wordt gestaakt.',
    state: {
      exactAge: 10,
      ageCategory: 'under_12',
      custodyType: 'sole_mother',
      competenceStatus: 'competent',
      assistanceType: 'ambulatory',
      stanceOfParties: 'both_agree'
    },
    keyTakeaway: 'Vader zonder gezag heeft geen enkel toestemmingsrecht en kan de hulp niet tegenhouden. Hij heeft op verzoek wel recht op beknopte globale feitelijke info (art. 1:377b BW).'
  },
  {
    id: 'emergency_crisis_suicide',
    title: 'Acute suïcidale crisis bij 13-jarige: Ouders onbereikbaar',
    subtitle: 'Kind 13 jaar · Crisisdienst / Spoed · Geen wachttijd voor toestemming',
    tag: 'Acute Nood & Spoedrecht',
    description: 'Een 13-jarige meldt zich op school met acute suïcideplannen en zelfbeschadiging. De crisisdienst jeugd wordt ingeschakeld. Ouders zijn telefonisch met geen mogelijkheid bereikbaar en wonen in het buitenland.',
    state: {
      exactAge: 13,
      ageCategory: 'age_12_15',
      custodyType: 'joint_married',
      competenceStatus: 'competent',
      assistanceType: 'emergency',
      stanceOfParties: 'parent_unreachable'
    },
    keyTakeaway: 'Op grond van art. 7:466 BW mag onmiddellijk worden gehandeld ter afwending van ernstig nadeel. Het ontbreken van ouderlijke toestemming mag levensreddende zorg niet vertragen.'
  },
  {
    id: 'ots_refusing_parent',
    title: 'Ondertoezichtstelling (OTS): Ouder weigert intensieve GGZ',
    subtitle: 'Kind 11 jaar · OTS van toepassing · Gezinsvoogd betrokken',
    tag: 'Jeugdbescherming & OTS',
    description: 'Het kind staat onder toezicht van een Gecertificeerde Instelling (GI). De gezinsvoogd vindt traumabehandeling noodzakelijk. Vader weigert mee te werken omdat hij de GI wantrouwt.',
    state: {
      exactAge: 11,
      ageCategory: 'under_12',
      custodyType: 'ots',
      competenceStatus: 'competent',
      assistanceType: 'specialist_ggz',
      stanceOfParties: 'one_parent_refuses'
    },
    keyTakeaway: 'Ouders behouden bij OTS formeel het gezag. Als vader blijft weigeren, kan de GI een schriftelijke aanwijzing geven of de kinderrechter verzoeken om vervangende toestemming.'
  },
  {
    id: 'unreachable_father_joint',
    title: 'Vader al 5 jaar uit beeld, maar op papier nog gezamenlijk gezag',
    subtitle: 'Kind 7 jaar · Ouder onvindbaar / Geen reactie',
    tag: 'Onbereikbare ouder & Formaliteiten',
    description: 'Moeder meldt haar 7-jarige zoon aan. Ouders hebben gezamenlijk gezag op papier, maar vader heeft 5 jaar geleden het land verlaten en reageert nooit op post of berichten. Moeder kan hem niet bereiken.',
    state: {
      exactAge: 7,
      ageCategory: 'under_12',
      custodyType: 'joint_divorced',
      competenceStatus: 'competent',
      assistanceType: 'ambulatory',
      stanceOfParties: 'parent_unreachable'
    },
    keyTakeaway: 'De hulpverlener moet minimaal 2 aantoonbare schriftelijke pogingen documenteren. Kan vader niet worden bereikt en is hulp dringend? Vervangende toestemming of gezagswijziging naar eenhoofdig gezag is de zuiverste route.'
  },
  {
    id: 'intellectual_disability_17',
    title: '17-jarige met ernstige verstandelijke beperking (Wilsonbekwaam)',
    subtitle: 'Jongere 17 jaar · Wilsonbekwaam ter zake · Residentiële plaatsing',
    tag: 'Wilsbekwaamheid ter zake',
    description: 'Een 17-jarige jongere met een ernstig ontwikkelingsniveau van een peuter heeft specialistische intensieve dagbehandeling nodig. De jongere kan de strekking en het doel van de hulp niet begrijpen.',
    state: {
      exactAge: 17,
      ageCategory: 'age_16_17',
      custodyType: 'joint_married',
      competenceStatus: 'incompetent',
      assistanceType: 'residential',
      stanceOfParties: 'both_agree'
    },
    keyTakeaway: 'Vanwege wilsonbekwaamheid ter zake geldt niet de zelfstandige bevoegdheid van 16+, maar beslissen de wettelijke gezagsouders op grond van art. 7:465 lid 1 BW.'
  }
];
