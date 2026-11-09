import { CaseState, AssessmentResultData, RequiredConsentParty, LegalArticle } from '../types/jeugdhulp';

export const LEGAL_ARTICLES: Record<string, LegalArticle> = {
  art_1_253a: {
    title: 'Artikel 1:253a Burgerlijk Wetboek (Geschillenregeling gezag)',
    source: 'Burgerlijk Wetboek Boek 1',
    summary: 'Geschillen over de uitoefening van het gezamenlijk gezag kunnen worden voorgelegd aan de kinderrechter.',
    content: 'Geschillen omtrent de gezamenlijke uitoefening van het gezag kunnen op verzoek van de ouders of van een van hen aan de rechtbank worden voorgelegd. De kinderrechter kan dan "vervangende toestemming" verlenen indien een ouder weigert.'
  },
  art_1_377b: {
    title: 'Artikel 1:377b Burgerlijk Wetboek (Informatierecht ouder zonder gezag)',
    source: 'Burgerlijk Wetboek Boek 1',
    summary: 'De ouder zonder gezag heeft recht op globale, feitelijke informatie over belangrijke zaken van het kind.',
    content: 'De ouder zonder gezag wordt op verzoek door derden (zoals hulpverleners en scholen) geïnformeerd over gewichtige aangelegenheden betreffende de persoon en het vermogen van het kind, tenzij het belang van het kind zich daartegen verzet.'
  },
  art_7_450: {
    title: 'Artikel 7:450 Burgerlijk Wetboek (WGBO - Toestemmingsvereiste)',
    source: 'Burgerlijk Wetboek Boek 7 (WGBO)',
    summary: 'Voor verrichtingen ter uitvoering van een behandelingsovereenkomst is de toestemming van de patiënt vereist.',
    content: 'Voor verrichtingen is toestemming vereist. Is de patiënt minderjarig en heeft hij de leeftijd van twaalf maar nog niet die van zestien jaren bereikt, dan is tevens de toestemming van de ouders met gezag vereist (dubbele toestemming).'
  },
  art_7_450_lid2: {
    title: 'Artikel 7:450 lid 2 Burgerlijk Wetboek (Uitzondering 12-15 jaar)',
    source: 'Burgerlijk Wetboek Boek 7 (WGBO)',
    summary: 'Hulp aan 12-15 jarigen kan zonder ouders plaatsvinden bij ernstig nadeel of weloverwogen wens.',
    content: 'De verrichting kan toch zonder toestemming van de ouders geschieden indien: a) zij kennelijk nodig is teneinde ernstig nadeel voor de patiënt te voorkomen, of b) de patiënt de verrichting ook na overleg weloverwogen blijft wensen.'
  },
  art_7_447: {
    title: 'Artikel 7:447 Burgerlijk Wetboek (Bekwaamheid 16 en 17 jarigen)',
    source: 'Burgerlijk Wetboek Boek 7 (WGBO)',
    summary: 'Minderjarigen van 16 en 17 jaar zijn zelfstandig bekwaam tot het aangaan van de behandelingsovereenkomst.',
    content: 'Een minderjarige die de leeftijd van zestien jaren heeft bereikt, is bekwaam tot het aangaan van een behandelingsovereenkomst ten behoeve van zichzelf, alsmede tot het verrichten van rechtshandelingen die met de overeenkomst rechtstreeks verband houden.'
  },
  art_7_465: {
    title: 'Artikel 7:465 Burgerlijk Wetboek (Wettelijke vertegenwoordiging bij wilsonbekwaamheid)',
    source: 'Burgerlijk Wetboek Boek 7 (WGBO)',
    summary: 'Regelt wie optreedt indien de minderjarige of meerderjarige niet in staat is tot een redelijke waardering.',
    content: 'Indien een patiënt die de leeftijd van zestien of achttien jaren heeft bereikt niet in staat kan worden geacht tot een redelijke waardering van zijn belangen ter zake, worden zijn rechten uitgeoefend door de wettelijke vertegenwoordiger of curator/mentor.'
  },
  art_7_466: {
    title: 'Artikel 7:466 Burgerlijk Wetboek (Verrichtingen in acute nood/spoed)',
    source: 'Burgerlijk Wetboek Boek 7 (WGBO)',
    summary: 'In spoedgevallen kan direct gehandeld worden zonder voorafgaande toestemming.',
    content: 'Verrichtingen kunnen zonder toestemming van de patiënt of diens vertegenwoordiger worden uitgevoerd indien de tijd voor het vragen van toestemming ontbreekt en onverwijlde uitvoering kennelijk nodig is om ernstig nadeel voor de patiënt te voorkomen.'
  },
  art_jeugdwet_7_3_1: {
    title: 'Artikel 7.3.1 - 7.3.11 Jeugdwet (Rechtspositie en toestemming)',
    source: 'Jeugdwet (Hoofdstuk 7)',
    summary: 'De Jeugdwet sluit voor hulp en dossiervorming aan bij de waarborgen en leeftijdsgrenzen van de WGBO.',
    content: 'De bepalingen over toestemming, dossierplicht en geheimhouding in de Jeugdwet sluiten aan bij de WGBO. De jeugdige en diens wettelijke vertegenwoordigers genieten dezelfde rechtsbescherming en privacywaarborgen.'
  }
};

export function evaluateConsent(state: CaseState): AssessmentResultData {
  const { ageCategory, custodyType, competenceStatus, assistanceType, stanceOfParties } = state;
  const isEmergency = assistanceType === 'emergency';
  const isIncompetent = competenceStatus === 'incompetent';

  // Base flags for custody
  const isJointCustody = custodyType === 'joint_married' || custodyType === 'joint_divorced';
  const isSoleMother = custodyType === 'sole_mother';
  const isSoleFather = custodyType === 'sole_father';
  const isSoleCustody = isSoleMother || isSoleFather;
  const isGuardianshipGI = custodyType === 'guardianship_gi';
  const isGuardianshipPerson = custodyType === 'guardianship_person';
  const isGuardianship = isGuardianshipGI || isGuardianshipPerson;
  const isOTS = custodyType === 'ots';

  // 1. EVALUATION FOR EMERGENCY CRISIS CARE
  if (isEmergency) {
    return {
      primaryVerdictTitle: 'Directe hulpverlening toegestaan (Spoed / Crisis)',
      primaryVerdictSummary: 'Bij acute nood of direct gevaar voor ernstig fysiek of psychisch nadeel mag onverwijld worden gehandeld zónder voorafgaande toestemming van ouders of voogd.',
      requiredParties: [
        {
          party: 'Hulpverlener / Arts / Crisisdienst',
          role: 'Acute interventie',
          isRequired: true,
          statusText: 'Handelt direct ter afwending van ernstig nadeel (art. 7:466 BW)',
          badgeStyle: 'required'
        },
        {
          party: 'Gezaghebbende ouder(s) / Voogd',
          role: 'Wettelijk vertegenwoordiger',
          isRequired: false,
          statusText: 'Voorafgaande toestemming niet vereist; zo spoedig mogelijk achteraf informeren',
          badgeStyle: 'conditional'
        },
        {
          party: 'Minderjarige',
          role: 'Patiënt / Cliënt',
          isRequired: false,
          statusText: 'Informeren naar vermogen en passend bij leeftijd en toestand',
          badgeStyle: 'optional'
        }
      ],
      ageRuleExplanation: 'In een noodsituatie treedt het wettelijke spoedrecht in werking. De hulpverleningsplicht om ernstig nadeel te voorkomen weegt op dat moment zwaarder dan het toestemmingsvereiste.',
      custodyRuleExplanation: 'Wie het gezag heeft is in acute crisis niet doorslaggevend voor het starten van de levensreddende of crisisinterventie. Gezaghebbenden moeten wel z.s.m. op de hoogte worden gebracht.',
      escalationPlan: {
        hasConflict: false,
        title: 'Crisishandelen & Vervolgstappen',
        steps: [
          'Verleen onmiddellijk de noodzakelijke hulp en stabiliseer de situatie.',
          'Leg in het dossier nauwkeurig vast waarom sprake was van een acute noodsituatie en het afwachten van toestemming ernstig nadeel zou berokkenen (art. 7:466 BW).',
          'Breng de gezaghebbende ouder(s) of voogd zo snel als de situatie toelaat op de hoogte van de verrichting en de toestand van het kind.',
          'Zodra de acute situatie voorbij is, gelden weer de reguliere toestemmingsregels voor het vervolgtraject.'
        ]
      },
      informationRights: {
        nonCustodialParent: 'Mag achteraf globaal worden geïnformeerd indien deze erom vraagt, tenzij het belang van het kind zich daartegen verzet.',
        parentsOfOlderMinor: 'Bij jongeren van 16+ wordt de jongere geïnformeerd; ouders worden alleen ingelicht als de jongere toestemt of in levensbedreigende toestand verkeert.',
        confidentialityNote: 'Dossiervoering over de crisisbeslissing is wettelijk verplicht.'
      },
      legalBasis: [LEGAL_ARTICLES.art_7_466, LEGAL_ARTICLES.art_jeugdwet_7_3_1],
      practicalTips: [
        'Documenteer tijdstippen van pogingen om ouders te bereiken.',
        'Overleg waar mogelijk kort met een collega of leidinggevende (vier-ogen-principe).'
      ]
    };
  }

  // 2. AGE CATEGORY: UNDER 12 YEARS (<12 jaar)
  if (ageCategory === 'under_12') {
    const requiredParties: RequiredConsentParty[] = [];

    if (isJointCustody || isOTS) {
      requiredParties.push({
        party: 'Beide ouders met gezag (Moeder & Vader)',
        role: 'Gezamenlijk gezag',
        isRequired: true,
        statusText: stanceOfParties === 'one_parent_refuses' 
          ? 'Let op: één ouder weigert. Hulp mag niet zomaar starten!' 
          : stanceOfParties === 'parent_unreachable'
          ? 'Eén ouder onbereikbaar: inspanning aantoonbaar documenteren'
          : 'Beide handtekeningen / akkoorden zijn vereist voor de start van de hulp',
        badgeStyle: stanceOfParties === 'one_parent_refuses' ? 'required' : 'required'
      });
    } else if (isSoleMother) {
      requiredParties.push({
        party: 'Moeder (heeft eenhoofdig gezag)',
        role: 'Wettelijk vertegenwoordiger',
        isRequired: true,
        statusText: 'Alleen moeder geeft rechtsgeldig toestemming',
        badgeStyle: 'required'
      });
      requiredParties.push({
        party: 'Vader (zonder gezag)',
        role: 'Ouder zonder gezag',
        isRequired: false,
        statusText: 'Geen toestemmingsrecht. Heeft wel informatierecht (art. 1:377b BW)',
        badgeStyle: 'not_required'
      });
    } else if (isSoleFather) {
      requiredParties.push({
        party: 'Vader (heeft eenhoofdig gezag)',
        role: 'Wettelijk vertegenwoordiger',
        isRequired: true,
        statusText: 'Alleen vader geeft rechtsgeldig toestemming',
        badgeStyle: 'required'
      });
      requiredParties.push({
        party: 'Moeder (zonder gezag)',
        role: 'Ouder zonder gezag',
        isRequired: false,
        statusText: 'Geen toestemmingsrecht. Heeft wel informatierecht (art. 1:377b BW)',
        badgeStyle: 'not_required'
      });
    } else if (isGuardianshipGI) {
      requiredParties.push({
        party: 'Gecertificeerde Instelling (Voogd / Jeugdbeschermer)',
        role: 'Voogdijhouder',
        isRequired: true,
        statusText: 'De GI neemt de beslissing en verleent toestemming',
        badgeStyle: 'required'
      });
      requiredParties.push({
        party: 'Biologische ouders (gezag ontnomen/beëindigd)',
        role: 'Geen wettelijk gezag',
        isRequired: false,
        statusText: 'Geen toestemmingsrecht. Worden door de GI naar passendheid betrokken',
        badgeStyle: 'not_required'
      });
    } else if (isGuardianshipPerson) {
      requiredParties.push({
        party: 'Aangewezen Voogd (particulier / pleegouder)',
        role: 'Wettelijk voogd',
        isRequired: true,
        statusText: 'De voogd beslist en tekent namens de minderjarige',
        badgeStyle: 'required'
      });
    }

    requiredParties.push({
      party: 'Het kind (jonger dan 12 jaar)',
      role: 'Cliënt / Minderjarige',
      isRequired: false,
      statusText: 'Geen formeel toestemmingsrecht; wel recht op begrijpelijke uitleg naar ontwikkelingsniveau',
      badgeStyle: 'optional'
    });

    let primaryVerdictTitle = 'Toestemming van gezaghebbende ouder(s) vereist';
    let primaryVerdictSummary = 'Kinderen onder de 12 jaar geven zelf geen juridische toestemming. De gezaghebbende ouder(s) of voogd beslissen volledig namens het kind.';

    if (isJointCustody && stanceOfParties === 'one_parent_refuses') {
      primaryVerdictTitle = 'Blokkade: Beide ouders met gezag moeten instemmen';
      primaryVerdictSummary = 'Omdat één gezagsouder weigert, mag het hulptraject in principe NIET starten. Starten zonder toestemming van de weigerende ouder is tuchtrechtelijk en civielrechtelijk verwijtbaar, tenzij de kinderrechter vervangende toestemming geeft.';
    } else if (isJointCustody && stanceOfParties === 'parent_unreachable') {
      primaryVerdictTitle = 'Gezamenlijk gezag: Ouder onbereikbaar';
      primaryVerdictSummary = 'Er mag niet direct worden gestart. De hulpverlener moet aantoonbare actieve pogingen doen om de andere ouder te bereiken via telefoon, post en/of e-mail.';
    } else if (isSoleCustody) {
      primaryVerdictTitle = `Alleen toestemming van de gezagsouder (${isSoleMother ? 'moeder' : 'vader'}) vereist`;
      primaryVerdictSummary = `Omdat sprake is van eenhoofdig gezag, is de instemming van de ouder zonder gezag NIET vereist. De hulp mag met akkoord van de gezagsouder gewoon van start gaan.`;
    } else if (isGuardianship) {
      primaryVerdictTitle = 'Toestemming van de voogd vereist';
      primaryVerdictSummary = 'Het gezag berust bij de voogd (of de Gecertificeerde Instelling). Deze beslist over de start en inhoud van de jeugdhulp.';
    }

    const hasConflict = isJointCustody && (stanceOfParties === 'one_parent_refuses' || stanceOfParties === 'both_parents_refuse');

    return {
      primaryVerdictTitle,
      primaryVerdictSummary,
      requiredParties,
      ageRuleExplanation: 'Op grond van art. 7:450 lid 1 BW en de Jeugdwet zijn kinderen tot 12 jaar handelingsonbekwaam voor het aangaan van een behandelingsovereenkomst. Hun wettelijke vertegenwoordigers treden op.',
      custodyRuleExplanation: isJointCustody
        ? 'Bij gezamenlijk gezag (art. 1:251 & 1:253a BW) oefenen beide ouders het gezag gezamenlijk uit. Voor ingrijpende hulp, diagnostiek of behandeling is uitdrukkelijke toestemming van beide ouders noodzakelijk. Toestemming mag alleen worden verondersteld bij alledaagse, niet-ingrijpende handelingen.'
        : isSoleCustody
        ? 'Bij eenhoofdig gezag (art. 1:247 BW) oefent één ouder alle bevoegdheden uit. De niet-gezaghebbende ouder kan de hulpverlening juridisch niet tegenhouden.'
        : 'Bij voogdij oefent de rechtspersoon (GI) of de natuurlijke voogd het gezag uit over de minderjarige.',
      escalationPlan: {
        hasConflict,
        title: hasConflict ? 'Stappenplan bij weigerende gezagsouder (<12 jaar)' : 'Aandachtspunten voor de start van de hulp',
        steps: hasConflict ? [
          'Ga in gesprek met de weigerende ouder: onderzoek de bezwaren en geef neutrale voorlichting over doel en noodzaak van de hulp.',
          'Stuur een schriftelijk verzoek per aangetekende brief/mail met een duidelijke reactietermijn (bijv. 2 weken) en nodig uit voor toelichting.',
          'Beoordeel of er sprake is van "kennelijk ernstig nadeel" voor de ontwikkeling of veiligheid van het kind als de hulp NIET plaatsvindt.',
          'Adviseer de instemmende ouder om vervangende toestemming te vragen aan de kinderrechter (art. 1:253a BW). Dit kan vaak via een snelle procedure met of zonder advocaat.'
        ] : [
          'Controleer het Gezagsregister (gratis uittreksel bij rechtbank) om te verifiëren of het gezag actueel is.',
          'Laat het formele toestemmingsformulier door de bevoegde gezagsdrager(s) ondertekenen vóór aanvang van de intake/diagnostiek.',
          'Betrek het kind op een kindvriendelijke manier bij de uitleg van het hulptraject.'
        ],
        courtOption: hasConflict ? 'De instemmende ouder (of bij OTS de GI) kan de kinderrechter verzoeken om vervangende toestemming op grond van artikel 1:253a BW.' : undefined
      },
      informationRights: {
        nonCustodialParent: isSoleCustody 
          ? 'De ouder zonder gezag heeft op grond van art. 1:377b BW recht op globale, feitelijke informatie over het kind (bijv. schoolprestaties, algemene gezondheidstoestand), mits hij hier zelf om vraagt. Geen inzage in het gehele dossier. Weigeren mag alleen bij zwaarwegend nadeel voor het kind.'
          : 'Niet van toepassing (beide ouders hebben gezag).',
        parentsOfOlderMinor: 'Niet van toepassing (kind is onder de 12 jaar, ouders hebben volledig inzagerecht).',
        confidentialityNote: 'Beide gezagsouders hebben recht op inzage in het dossier van hun kind onder de 12 jaar, tenzij dit ernstig in strijd is met het belang van het kind.'
      },
      legalBasis: [
        LEGAL_ARTICLES.art_7_450,
        LEGAL_ARTICLES.art_1_253a,
        ...(isSoleCustody ? [LEGAL_ARTICLES.art_1_377b] : []),
        LEGAL_ARTICLES.art_jeugdwet_7_3_1
      ],
      practicalTips: [
        'Vraag altijd een actueel uittreksel uit het Gezagsregister op bij gescheiden ouders om verrassingen te voorkomen.',
        'Laat je als hulpverlener niet voor het karretje van één van de ouders spannen bij een vechtscheiding.',
        'In het intakeverslag expliciet noteren dat beide gezagsouders op de hoogte zijn en akkoord hebben gegeven.'
      ]
    };
  }

  // 3. AGE CATEGORY: 12 T/M 15 JAAR
  if (ageCategory === 'age_12_15') {
    if (isIncompetent) {
      // Minor 12-15 is wilsonbekwaam ter zake
      return {
        primaryVerdictTitle: 'Wilsonbekwaam kind (12-15 jr): Gezaghebbenden beslissen',
        primaryVerdictSummary: 'Omdat het kind ter zake wilsonbekwaam is geoordeeld (niet in staat tot een redelijke waardering van zijn belangen), beslissen uitsluitend de wettelijke vertegenwoordigers (gezagsouders of voogd).',
        requiredParties: [
          {
            party: isJointCustody ? 'Beide ouders met gezag' : isSoleMother ? 'Moeder (eenhoofdig gezag)' : isSoleFather ? 'Vader (eenhoofdig gezag)' : 'De voogd / GI',
            role: 'Wettelijk vertegenwoordiger',
            isRequired: true,
            statusText: 'Neemt de beslissing en verleent toestemming namens de minderjarige',
            badgeStyle: 'required'
          },
          {
            party: 'Het kind (12-15 jr, wilsonbekwaam)',
            role: 'Cliënt',
            isRequired: false,
            statusText: 'Recht op begrijpelijke uitleg; verzet van het kind telt wel mee (tenzij ernstig nadeel)',
            badgeStyle: 'optional'
          }
        ],
        ageRuleExplanation: 'Bij wilsonbekwaamheid ter zake vervalt het dubbele toestemmingsvereiste en treden de wettelijke vertegenwoordigers op grond van art. 7:465 lid 1 BW op.',
        custodyRuleExplanation: isJointCustody ? 'Beide gezagsouders moeten instemmen.' : 'De gezagsouder of voogd beslist.',
        escalationPlan: {
          hasConflict: false,
          title: 'Zorgvuldige wilsbekwaamheidsbeoordeling',
          steps: [
            'Leg de gronden voor wilsonbekwaamheid ter zake expliciet vast in het dossier (begrijpt het kind de gevolgen van de hulp?).',
            'Herbeoordeel de wilsbekwaamheid periodiek als de situatie verandert.',
            'Luister ook bij wilsonbekwaamheid serieus naar wensen en weerstanden van het kind.'
          ]
        },
        informationRights: {
          nonCustodialParent: isSoleCustody ? 'Recht op globale feitelijke info op verzoek (art. 1:377b BW).' : 'Niet van toepassing.',
          parentsOfOlderMinor: 'Gezagsouders hebben volledig inzagerecht.',
          confidentialityNote: 'Het belang van de minderjarige staat altijd voorop.'
        },
        legalBasis: [LEGAL_ARTICLES.art_7_465, LEGAL_ARTICLES.art_7_450],
        practicalTips: ['Wilsonbekwaamheid is altijd "ter zake": een kind kan wilsonbekwaam zijn voor een zware ingreep, maar wel bekwaam voor lichte gesprekshulp.']
      };
    }

    // Wilsbekwaam 12-15 jaar: DUBBELE TOESTEMMING (met uitzonderingen)
    const childWantsSecret = stanceOfParties === 'child_wants_secret';
    const oneParentRefuses = stanceOfParties === 'one_parent_refuses';
    const bothParentsRefuse = stanceOfParties === 'both_parents_refuse';
    const childRefuses = stanceOfParties === 'child_refuses';

    const requiredParties: RequiredConsentParty[] = [
      {
        party: 'Het kind / De jongere (12 t/m 15 jaar)',
        role: 'Zelfstandige toestemmingsdrager',
        isRequired: true,
        statusText: childRefuses 
          ? 'Kind weigert: hulp mag NIET starten tegen de wil van het wilsbekwame kind!' 
          : 'Toestemming van de jongere is wettelijk verplicht',
        badgeStyle: childRefuses ? 'required' : 'required'
      }
    ];

    if (isJointCustody || isOTS) {
      requiredParties.push({
        party: 'Beide ouders met gezag (Moeder & Vader)',
        role: 'Gezagsdragers (Dubbele toestemming)',
        isRequired: !childWantsSecret,
        statusText: (oneParentRefuses || bothParentsRefuse)
          ? 'Ouder(s) weigeren: uitzonderingsclausule art. 7:450 lid 2 BW mogelijk van toepassing!'
          : childWantsSecret
          ? 'Uitzondering: hulp zonder medeweten ouders onder strikte voorwaarden'
          : 'Toestemming van beide gezagsouders vereist',
        badgeStyle: (childWantsSecret || oneParentRefuses) ? 'conditional' : 'required'
      });
    } else if (isSoleMother || isSoleFather) {
      const parentName = isSoleMother ? 'Moeder' : 'Vader';
      requiredParties.push({
        party: `${parentName} (met eenhoofdig gezag)`,
        role: 'Wettelijk vertegenwoordiger',
        isRequired: !childWantsSecret,
        statusText: (oneParentRefuses || childWantsSecret)
          ? 'Uitzondering mogelijk indien kind weloverwogen blijft wensen of bij ernstig nadeel'
          : 'Toestemming vereist naast die van het kind',
        badgeStyle: (childWantsSecret || oneParentRefuses) ? 'conditional' : 'required'
      });
    } else if (isGuardianship) {
      requiredParties.push({
        party: isGuardianshipGI ? 'GI (Voogdij)' : 'Voogd',
        role: 'Wettelijk vertegenwoordiger',
        isRequired: !childWantsSecret,
        statusText: 'Moet in principe instemmen naast de jongere',
        badgeStyle: childWantsSecret ? 'conditional' : 'required'
      });
    }

    let verdictTitle = 'Hoofdregel: Dubbele toestemming vereist (Kind én Ouders)';
    let verdictSummary = 'In de leeftijd van 12 t/m 15 jaar moeten ZOWEL het kind als de gezaghebbende ouder(s) of voogd toestemming geven. Beiden moeten akkoord gaan.';

    if (childRefuses) {
      verdictTitle = 'Hulp geblokkeerd: Kind (12-15 jr) weigert';
      verdictSummary = 'Een wilsbekwaam kind tussen 12 en 15 jaar kan niet tegen zijn wil worden behandeld of geholpen, zelfs niet als beide ouders wél toestemming geven (art. 7:450 lid 1 BW). Gedwongen hulp kan alleen via een rechterlijke maatregel (bijv. gesloten jeugdhulp).';
    } else if (oneParentRefuses || bothParentsRefuse || childWantsSecret) {
      verdictTitle = 'Uitzondering mogelijk: Hulp zónder ouderlijke toestemming (art. 7:450 lid 2 BW)';
      verdictSummary = 'Wanneer ouder(s) weigeren of het kind de ouders niet wil inlichten, kan de hulpverlener toch rechtmatig starten zónder toestemming van de ouders, mits voldaan is aan de wettelijke uitzonderingscriteria van de WGBO/Jeugdwet.';
    }

    return {
      primaryVerdictTitle: verdictTitle,
      primaryVerdictSummary: verdictSummary,
      requiredParties,
      ageRuleExplanation: 'Artikel 7:450 lid 2 BW schrijft voor jongeren van 12 tot 16 jaar "dubbele toestemming" voor. De wet erkent echter dat een opgroeiend kind een eigen wil heeft en beschermt het kind via een cruciale uitzondering.',
      custodyRuleExplanation: 'In de basis moeten alle gezaghebbende ouders tekenen. Maar als ouders dwarsliggen en het kind wil wél, krijgt de wens van het kind onder voorwaarden juridische voorrang.',
      escalationPlan: {
        hasConflict: oneParentRefuses || bothParentsRefuse || childWantsSecret || childRefuses,
        title: childRefuses 
          ? 'Hoe om te gaan met een weigerend kind (12-15 jr)?' 
          : 'Stappenplan: Toepassing uitzondering art. 7:450 lid 2 BW',
        steps: childRefuses ? [
          'Onderzoek de reden van de weigering in een vertrouwelijk gesprek met de jongere.',
          'De hulpverlening kan niet worden afgedwongen. Zonder intrinsieke motivatie is het traject bovendien professioneel zelden effectief.',
          'Bied laagdrempelige alternatieven aan of wacht tot de jongere er wel aan toe is.',
          'Is er acuut levensgevaar of ernstige verwaarlozing? Overweeg consultatie met Veilig Thuis of de Raad voor de Kinderbescherming.'
        ] : [
          'Stap 1: Toetsing wilsbekwaamheid ter zake. Is de jongere in staat de gevolgen van het wel of niet starten van de jeugdhulp te overzien?',
          'Stap 2: Tracht alsnog ouders te betrekken en toestemming te verkrijgen, tenzij het kind gegronde redenen heeft (bijv. vrees voor mishandeling of verstoting).',
          'Stap 3: Toets aan de twee wettelijke uitzonderingsgronden van art. 7:450 lid 2 BW:\n  • Grond A: De hulp is kennelijk nodig om ernstig nadeel voor het kind te voorkomen (bijv. suïcidaliteit, ernstige trauma-escalatie, zware angststoornis).\n  • Grond B: De jongere blijft de hulp weloverwogen wensen, ook na overleg over de positie van de ouders.',
          'Stap 4: Dossiervoering: Noteer expliciet de afweging en leg vast waarom de uitzondering van art. 7:450 lid 2 BW van toepassing is verklaard.',
          'Stap 5: Alternatief voor de instemmende ouder: De kinderrechter kan tevens vervangende toestemming verlenen op grond van art. 1:253a BW.'
        ],
        courtOption: 'Bij een weigerende ouder kan de andere ouder ook vervangende toestemming aan de kinderrechter vragen (art. 1:253a BW).'
      },
      informationRights: {
        nonCustodialParent: 'Heeft geen toestemmingsrecht. Informatierecht (art. 1:377b BW) is beperkt en mag worden geweigerd als de jongere bezwaar maakt en dit strijdt met diens belang.',
        parentsOfOlderMinor: 'Ouders hebben inzagerecht, MAAR als de hulp onder art. 7:450 lid 2 BW zonder toestemming van ouders plaatsvindt, kan de hulpverlener op grond van goed hulpverlenerschap en het beroepsgeheim besluiten om de ouders géén informatie of inzage te geven ter bescherming van het kind.',
        confidentialityNote: 'Het beroepsgeheim van de hulpverlener kan in het belang van de 12-15 jarige prevaleren boven het inzagerecht van ouders.'
      },
      legalBasis: [
        LEGAL_ARTICLES.art_7_450,
        LEGAL_ARTICLES.art_7_450_lid2,
        LEGAL_ARTICLES.art_1_253a,
        LEGAL_ARTICLES.art_jeugdwet_7_3_1
      ],
      practicalTips: [
        'Laat de jongere altijd zijn/haar eigen handtekening zetten op het intake- en behandelplan.',
        'Leg bij toepassing van art. 7:450 lid 2 BW altijd een collegiaal consult (vier-ogen-principe) vast in het dossier.',
        'Veiligheid van de jongere staat juridisch en tuchtrechtelijk voorop: een weigerende ouder mag geen blokkade vormen voor noodzakelijke hulp.'
      ]
    };
  }

  // 4. AGE CATEGORY: 16 EN 17 JAAR
  if (ageCategory === 'age_16_17') {
    if (isIncompetent) {
      return {
        primaryVerdictTitle: 'Wilsonbekwame 16/17-jarige: Ouders of voogd beslissen',
        primaryVerdictSummary: 'Hoewel 16- en 17-jarigen normaal zelfstandig beslissen, is deze jongere ter zake wilsonbekwaam. Daarom beslissen de wettelijke vertegenwoordigers (ouders met gezag of voogd) op grond van art. 7:465 BW.',
        requiredParties: [
          {
            party: isJointCustody ? 'Beide gezagsouders' : isSoleCustody ? 'Gezagsouder' : 'Voogd',
            role: 'Wettelijk vertegenwoordiger',
            isRequired: true,
            statusText: 'Geeft toestemming namens de wilsonbekwame jongere',
            badgeStyle: 'required'
          },
          {
            party: 'De jongere (16/17 jaar, wilsonbekwaam)',
            role: 'Cliënt',
            isRequired: false,
            statusText: 'Zoveel mogelijk betrekken; bij verzet geldt een zware terughoudendheid',
            badgeStyle: 'optional'
          }
        ],
        ageRuleExplanation: 'Art. 7:465 lid 1 BW regelt de plaatsvervangende toestemming wanneer de 16- of 17-jarige niet in staat is tot een redelijke waardering van zijn belangen.',
        custodyRuleExplanation: 'De gezagsdragers treden op namens de jongere.',
        escalationPlan: {
          hasConflict: false,
          title: 'Wilsbekwaamheidscriteria 16/17 jaar',
          steps: [
            'Stel de wilsonbekwaamheid specifiek voor dit type hulpverlening vast.',
            'Onderzoek of met extra ondersteuning de jongere alsnog tot wilsbekwaamheid kan komen.',
            'Vastlegging in het dossier.'
          ]
        },
        informationRights: {
          nonCustodialParent: 'Informatierecht conform art. 1:377b BW.',
          parentsOfOlderMinor: 'De vertegenwoordigende ouders hebben inzagerecht.',
          confidentialityNote: 'Privacy en waardigheid van de jongere blijven gewaarborgd.'
        },
        legalBasis: [LEGAL_ARTICLES.art_7_465, LEGAL_ARTICLES.art_7_447],
        practicalTips: ['Wilsonbekwaamheid mag nooit zomaar worden aangenomen; de wet veronderstelt wilsbekwaamheid vanaf 16 jaar.']
      };
    }

    // Wilsbekwaam 16-17 jaar: Volledig zelfstandig beslissingsbevoegd!
    return {
      primaryVerdictTitle: 'De jongere beslist zelfstandig (Géén toestemming ouders nodig)',
      primaryVerdictSummary: 'Een wilsbekwame jongere van 16 of 17 jaar is op grond van artikel 7:447 BW zelfstandig bevoegd om de hulpverleningsovereenkomst aan te gaan. De ouders hebben GEEN toestemmingsrecht!',
      requiredParties: [
        {
          party: 'De jongere (16 of 17 jaar)',
          role: 'Patiënt / Cliënt (Zelfstandig bevoegd)',
          isRequired: true,
          statusText: 'Uitsluitend de jongere tekent het toestemmingsformulier en behandelplan',
          badgeStyle: 'required'
        },
        {
          party: 'Ouders / Gezagsdragers',
          role: 'Ouders',
          isRequired: false,
          statusText: 'Geen toestemming vereist. Ouders kunnen de hulpverlening NIET verbieden of stoppen.',
          badgeStyle: 'not_required'
        }
      ],
      ageRuleExplanation: 'Artikel 7:447 BW bepaalt dat een minderjarige van 16 of 17 jaar volledig bekwaam is tot het aangaan van een behandelingsovereenkomst ten behoeve van zichzelf. Het gezagsrecht van de ouders wijkt hier voor de zelfbeschikking van de jongere.',
      custodyRuleExplanation: 'De gezagsvorm (gezamenlijk, eenhoofdig of voogdij) speelt voor de TOESTEMMING bij een wilsbekwame 16/17-jarige GEEN rol meer. De jongere heeft het exclusieve beslissingsrecht.',
      escalationPlan: {
        hasConflict: stanceOfParties === 'both_parents_refuse' || stanceOfParties === 'one_parent_refuses',
        title: (stanceOfParties === 'both_parents_refuse' || stanceOfParties === 'one_parent_refuses')
          ? 'Wat als ouders fel protesteren tegen de hulp?'
          : 'Professionele handelwijze bij 16/17-jarigen',
        steps: [
          'De hulpverlener heeft een beroepsgeheim ten opzichte van IEDEREEN, inclusief de ouders van de 16/17-jarige (art. 7:457 lid 1 BW).',
          'Als ouders protesteren of eisen dat de hulp stopt: leg rustig en neutraal uit dat de wet (art. 7:447 BW) de beslissingsbevoegdheid exclusief bij de jongere legt.',
          'Stimuleer de jongere wel om (indien veilig en constructief) de ouders te informeren, want een steunend thuisfront bevordert het resultaat van de hulp.',
          'Indien de jongere weigert dat ouders worden geïnformeerd, MOET de hulpverlener dit geheimhoudingsverzoek respecteren. Ouders mogen het dossier NIET inzien.'
        ]
      },
      informationRights: {
        nonCustodialParent: 'Geen informatierecht zolang de jongere daar geen toestemming voor geeft.',
        parentsOfOlderMinor: 'Ouders (met of zonder gezag) hebben GEEN recht op inzage in het dossier van een 16- of 17-jarige zonder uitdrukkelijke schriftelijke toestemming van de jongere zelf (art. 7:457 BW).',
        confidentialityNote: 'Het beroepsgeheim geldt onverkort jegens de ouders. Informatieverstrekking aan ouders zonder toestemming van de jongere levert een schending van het medisch beroepsgeheim op.'
      },
      legalBasis: [LEGAL_ARTICLES.art_7_447, LEGAL_ARTICLES.art_jeugdwet_7_3_1],
      practicalTips: [
        'Vraag de jongere expliciet: "Vind je het goed als we je ouders informeren of betrekken?" en noteer het antwoord in het dossier.',
        'Laat ouders géén medische of behandelovereenkomsten ondertekenen voor 16/17-jarigen; uitsluitend de jongere is contractpartij.',
        'Financiering / Jeugdwetbeschikking: De gemeente kan een toewijzing afgeven zonder dat ouders de inhoudelijke diagnose hoeven in te zien.'
      ]
    };
  }

  // 5. AGE CATEGORY: 18 JAAR EN OUDER (Adult)
  return {
    primaryVerdictTitle: 'Meerderjarig (18+ jaar): Volledige zelfbeschikking',
    primaryVerdictSummary: 'Vanaf 18 jaar is de cliënt volgens de wet volwassen. Ouders hebben noch gezag, noch toestemmingsrecht, noch informatierecht.',
    requiredParties: [
      {
        party: 'De jongvolwassene (18+)',
        role: 'Volledig handelingsbekwaam',
        isRequired: true,
        statusText: 'Beslist volledig zelfstandig',
        badgeStyle: 'required'
      },
      {
        party: 'Ouders / Voormalige voogden',
        role: 'Geen juridische status',
        isRequired: false,
        statusText: 'Geen toestemmings- of inzagerecht',
        badgeStyle: 'not_required'
      }
    ],
    ageRuleExplanation: 'Vanaf de 18e verjaardag eindigt het minderjarigenrecht en het ouderlijk gezag van rechtswege (art. 1:245 BW).',
    custodyRuleExplanation: 'Er is geen sprake meer van ouderlijk gezag of voogdij, tenzij er sprake is van een door de kantonrechter ingesteld curatele, bewind of mentorschap.',
    escalationPlan: {
      hasConflict: false,
      title: 'Zorg voor jongvolwassenen (Verlengde Jeugdhulp)',
      steps: [
        'Valt de hulp onder verlengde jeugdhulp (tot 21 jaar)? Dan beslist de jongvolwassene alsnog volledig zelf.',
        'Informatieverstrekking aan derden (inclusief ouders) mag uitsluitend met schriftelijke machtiging van de jongere.'
      ]
    },
    informationRights: {
      nonCustodialParent: 'Geen enkel recht.',
      parentsOfOlderMinor: 'Geen recht op inzage of informatie.',
      confidentialityNote: 'Strikt beroepsgeheim.'
    },
    legalBasis: [LEGAL_ARTICLES.art_7_447, LEGAL_ARTICLES.art_jeugdwet_7_3_1],
    practicalTips: ['Indien er sprake is van een civielrechtelijk mentorschap of curatele, beslist de mentor/curator.']
  };
}
