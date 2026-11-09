import { GlossaryItem } from '../types/jeugdhulp';

export const GLOSSARY_ITEMS: GlossaryItem[] = [
  {
    id: 'gezagsregister',
    term: 'Gezagsregister (Centraal Gezagsregister)',
    category: 'Gezag & Recht',
    shortDefinition: 'Openbaar register bij de rechtbank waarin staat wie het ouderlijk gezag of de voogdij over een minderjarig kind uitoefent.',
    fullExplanation: 'In het gezagsregister staat aangetekend of ouders na een echtscheiding gezamenlijk het gezag hebben behouden, of dat één van de ouders het eenhoofdig gezag heeft verkregen, of dat er een voogdijmaatregel van kracht is. Als ouders gehuwd waren bij de geboorte van het kind, ontstaat gezag van rechtswege en staat er vaak géén aantekening in het register (dan geldt het huwelijk/geboorteakte als bewijs).',
    legalArticle: 'Art. 1:244 BW',
    actionableAdvice: 'Als jeugdhulpverlener kun je gratis een uittreksel uit het Gezagsregister opvragen bij de griffie van de bevoegde rechtbank of via rechtspraak.nl. Doe dit altijd bij twijfel of vechtscheidingen!'
  },
  {
    id: 'wilsbekwaamheid',
    term: 'Wilsbekwaamheid ter zake',
    category: 'Wilsbekwaamheid',
    shortDefinition: 'Het vermogen van de minderjarige om de informatie over de jeugdhulp te begrijpen en een weloverwogen beslissing te nemen over de eigen belangen.',
    fullExplanation: 'Wilsbekwaamheid is niet "alles of niets", maar altijd gerelateerd aan de specifieke beslissing ("ter zake") en het moment. Een 13-jarige kan wilsbekwaam zijn om te beslissen over gesprekstherapie voor somberheid, maar wilsonbekwaam voor een complexe psychiatrische ziekenhuisopname. De wet gaat bij jongeren vanaf 12 jaar in beginsel uit van wilsbekwaamheid, tenzij er duidelijke aanwijzingen zijn voor het tegendeel.',
    legalArticle: 'Art. 7:465 BW / WGBO',
    actionableAdvice: 'Toetsing gebeurt aan de hand van vier criteria: 1) Begrijpt de jongere de informatie? 2) Kan de jongere de gevolgen en risico’s overzien? 3) Is de keuze rationeel gemotiveerd? 4) Is de keuze vrijwillig en zonder ongeoorloofde dwang tot stand gekomen?'
  },
  {
    id: 'vervangende_toestemming',
    term: 'Vervangende toestemming kinderrechter',
    category: 'Procedures',
    shortDefinition: 'Een gerechtelijke beslissing van de kinderrechter die de ontbrekende toestemming van een weigerende ouder vervangt.',
    fullExplanation: 'Wanneer ouders met gezamenlijk gezag het niet eens worden over de noodzaak van jeugdhulp of diagnostiek, en één ouder weigert principieel zijn medewerking te verlenen, kan de andere ouder (of bij een ondertoezichtstelling de GI) een verzoekschrift indienen bij de rechtbank. De kinderrechter toetst of de hulpverlening in het zwaarwegend belang van het kind is en kan dan vervangende toestemming verlenen.',
    legalArticle: 'Art. 1:253a BW',
    actionableAdvice: 'Wijs de bereidwillige ouder op de mogelijkheid om via een advocaat (of bij spoed via kort geding) de kinderrechter in te schakelen. Rechters verlenen vervangende toestemming over het algemeen als een deskundige (zoals een huisarts of school) de noodzaak van diagnostiek/hulp onderschrijft.'
  },
  {
    id: 'ernstig_nadeel',
    term: 'Kennelijk ernstig nadeel (Criterium art. 7:450 lid 2 BW)',
    category: 'Gezag & Recht',
    shortDefinition: 'Wettelijke noodrem waardoor noodzakelijke hulp aan een 12-15 jarige mag doorgaan zonder toestemming van de ouders.',
    fullExplanation: 'De wetgever heeft in art. 7:450 lid 2 BW bepaald dat een kind tussen 12 en 16 jaar niet het slachtoffer mag worden van weigerachtige of ruziënde ouders. Indien het achterwege laten van de behandeling kennelijk ernstig nadeel voor de minderjarige zou opleveren (bijv. toename van suïciderisico, ernstige ontwikkelingsachterstand, lichamelijk verval), mag de hulpverlener ook zonder ouderlijke toestemming behandelen.',
    legalArticle: 'Art. 7:450 lid 2 sub a BW',
    actionableAdvice: 'Motiveer in het dossier concreet welk concreet nadeel zal ontstaan bij uitstel of weigering. Bespreek dit altijd vooraf in een collegiaal overleg (vier-ogen-principe).'
  },
  {
    id: 'ouder_zonder_gezag',
    term: 'Rechten van de ouder zonder gezag',
    category: 'Informatie & Geheimhouding',
    shortDefinition: 'De biologische of juridische ouder die geen gezag (meer) heeft, heeft GEEN zeggenschap maar wel een beperkt informatierecht.',
    fullExplanation: 'De ouder zonder gezag hoeft géén toestemming te geven voor jeugdhulp en kan de start van een traject juridisch niet tegenhouden. Wel heeft deze ouder op grond van art. 1:377b BW recht om op verzoek door derden (hulpverleners) globaal en feitelijk geïnformeerd te worden over belangrijke zaken. Deze informatieverstrekking mag alleen worden geweigerd als het belang van het kind zich daartegen verzet of als de geheimhoudingsplicht jegens een 16+ jongere geldt.',
    legalArticle: 'Art. 1:377b BW',
    actionableAdvice: 'Als de ouder zonder gezag belt of schrijft: geef geen medisch-inhoudelijke details of inzage in behandelnotities, maar wel een neutrale feitelijke mededeling over het bestaan van het traject, tenzij de veiligheid van het kind in het geding is.'
  },
  {
    id: 'beroepsgeheim_vs_gezag',
    term: 'Beroepsgeheim vs. Ouderlijk inzagerecht',
    category: 'Informatie & Geheimhouding',
    shortDefinition: 'De spanning tussen de geheimhoudingsplicht van de professional en het inzagerecht van gezaghebbende ouders.',
    fullExplanation: 'Bij kinderen onder de 12 jaar hebben gezagsouders in principe recht op inzage in het dossier. Bij jongeren van 12 t/m 15 jaar hebben ouders ook inzagerecht, tenzij het kind zwaarwegende bezwaren heeft of goed hulpverlenerschap eist dat informatie geheim blijft. Bij jongeren van 16 en 17 jaar geldt het beroepsgeheim volledig tegenover de ouders: zonder schriftelijke toestemming van de jongere mag NIETS worden gedeeld.',
    legalArticle: 'Art. 7:457 BW & KNMG-richtlijn',
    actionableAdvice: 'Maak tijdens de intake duidelijke afspraken met jongere en ouders over wat wel en niet wordt teruggekoppeld. Voorkom vertrouwensbreuk.'
  },
  {
    id: 'schriftelijke_aanwijzing',
    term: 'Schriftelijke aanwijzing (bij OTS)',
    category: 'Procedures',
    shortDefinition: 'Een dwingende instructie van de gezinsvoogd (GI) aan de gezaghebbende ouders en minderjarige.',
    fullExplanation: 'Bij een ondertoezichtstelling (OTS) kan de gecertificeerde instelling de ouders een schriftelijke aanwijzing geven over de verzorging en opvoeding van het kind. Dit kan ook inhouden dat ouders moeten meewerken aan een hulptraject. Als een ouder de aanwijzing niet opvolgt, kan de GI de kinderrechter vragen de aanwijzing te bekrachtigen.',
    legalArticle: 'Art. 1:263 BW & Jeugdwet',
    actionableAdvice: 'Een schriftelijke aanwijzing is een zwaar middel. Als hulpverlener stem je altijd nauw af met de toegewezen jeugdbeschermer van de GI.'
  }
];
