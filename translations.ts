
export type Language = 'en';

export const TRANSLATIONS: Record<Language, any> = {
  en: {
    dir: 'ltr',
    brand: 'StrongTools',
    navHome: 'Home',
    navAbout: 'About',
    navContact: 'Contact',
    heroTag: 'Free Online Developer Tools',
    heroTitle: 'Smart Tools for Web Developers',
    heroSub: 'An essential collection of utilities for your daily workflow Fast secure and private',
    searchPlaceholder: 'Search for a tool like JSON Password or Word Counter',
    footerSub: 'Simple and powerful tools for developers designers and digital creators',
    registryLabel: 'StrongTools Sovereign Edition',
    common: {
      copy: 'Copy',
      copied: 'Copied',
      clear: 'Clear',
      calculate: 'Calculate',
      upload: 'Upload File',
      deploy: 'Use Tool',
      results: 'Results',
      loading: 'Loading',
      howToUse: 'How to use',
      privacyProtocol: 'Private and Secure',
      about: 'About this tool',
      usage: 'Instructions',
      benefits: 'Features',
      faq: 'Questions'
    },
    tools: {
      'word-counter': {
        name: 'Word Counter',
        internal: { placeholder: 'Start typing...', words: 'Words', chars: 'Chars', sentences: 'Sentences', time: 'Time' },
        doc: {
          about: 'The Word Counter is a professional lexical instrument designed to evaluate the structural magnitude of any written manuscript This utility utilize standardized linguistic logic to determine the exact volume of characters and lexical units ensuring absolute transparency for your professional writing archives',
          usage: 'Inject your text manuscript into the primary analysis terminal The engine will automatically synthesize the structural metrics and manifest the counts in the secondary result registry for immediate observation allowing you to monitor your creative progress without interruption',
          benefits: 'This module provide immediate structural momentum by removing manual counting barriers while ensuring your metrics adhere to global standards for high level content assessment It maintain absolute data sovereignty as every logical cycle occurs within your local browser buffer memory avoiding external network logging',
          faq: 'Can I perform multiple evaluations Yes the engine allow for unlimited creative cycles based on your input parameters Is it safe for sensitive manuscripts Absolute privacy is guaranteed since all logic execute within the isolated sandbox of your local machine'
        }
      },
      'word-counter-per-page': {
        name: 'Words to Pages',
        internal: { title: 'Words to Pages', sub: 'Page Estimator', preset: 'Style', totalPages: 'Pages', wordCount: 'Words', chars: 'Chars', paragraphs: 'Paras' },
        doc: {
          about: 'The Words to Pages architect is a professional structural instrument designed to estimate the physical volume of a manuscript when rendered in standard print formats This utility utilize precise spacing logic to forecast the total number of sequential pages based on established archival standards',
          usage: 'Inject your text into the primary ingestion terminal and select the desired document style from the configuration node The engine will automatically synthesize the page count and manifest the metrics in the secondary result registry for immediate review',
          benefits: 'This module provide immediate structural momentum by removing manual estimation barriers while ensuring your metrics adhere to global standards for high level document assessment It maintain absolute data sovereignty as every logical cycle occurs within your local browser buffer memory',
          faq: 'Does it support various fonts The architect uses standardized metric mappings for dominant archival typefaces ensuring high fidelity projections across common professional manuscripts'
        }
      },
      'bmi-calc': {
        name: 'BMI Analyzer',
        desc: 'Biometric equilibrium scale',
        doc: {
          about: 'The BMI Analyzer is a professional biometric instrument designed to evaluate the physical equilibrium of an individual based on the relationship between mass and stature This utility utilize standardized physiological logic to determine your categorical position within the global health registry ensuring absolute transparency for your personal wellness archives',
          usage: 'Adjust the mass coordinate using the primary control nodes Calibrate the vertical stature metric to align with your physical reality The engine will automatically synthesize the biometric ratio and manifest your categorical status in the secondary result registry for immediate observation',
          benefits: 'This module provide immediate diagnostic momentum by removing manual calculation barriers while ensuring your metrics adhere to global standards for high level health assessment It maintain absolute data sovereignty as every logical cycle occurs within your local browser buffer memory avoiding external network logging',
          faq: 'Can I perform multiple evaluations Yes the engine allow for unlimited creative cycles based on your input parameters Is it safe for sensitive personal data Absolute privacy is guaranteed since all logic execute within the isolated sandbox of your local machine'
        }
      },
      'qr-gen': {
        name: 'Archival QR Architect',
        internal: { label: 'Data Ingestion', placeholder: 'Enter URL or raw manuscript', btnDownload: 'Export QR Manuscript' },
        doc: {
          about: 'The Archival QR Architect is a professional matrix synthesizer designed to transform raw digital data into high fidelity visual codes This utility utilize standardized encoding logic to ensure that your digital manuscripts are readable across all modern optical scanners and archival devices',
          usage: 'Inject your URL or data manuscript into the ingestion panel and the engine will immediately manifest the corresponding matrix in the viewport Select the export option to archive the visual code as a portable asset for physical or digital deployment',
          benefits: 'This instrument provides immediate operational momentum by removing manual encoding barriers while ensuring your codes meet global standards for high performance data retrieval It maintain absolute data sovereignty as all logic cycle execute locally',
          faq: 'Are these codes permanent Yes the matrix remains valid as long as the underlying data coordinate remains active and accessible'
        }
      },
      'pwd-gen': {
        name: 'Entropy Pass Architect',
        internal: { title: 'Entropy Forge', sub: 'Cryptographic Node', complexity: 'Complexity', capture: 'Capture Node', caps: 'Upper', alpha: 'Lower', numeric: 'Digits', glyphs: 'Symbols' },
        doc: {
          about: 'The Entropy Pass Architect is a professional cryptographic instrument designed to synthesize high strength authentication manuscripts This utility utilize advanced hardware based entropy to generate unique character sequences that resist traditional decryption attempts ensuring absolute security for your digital vaults',
          usage: 'Adjust the complexity slider to define the required character depth select the desired logical subsets and trigger the generation cycle to manifest a new cryptographic key in the registry viewport ready for immediate deployment',
          benefits: 'This module provides immediate security momentum by removing predictable pattern barriers while ensuring your keys adhere to global standards for high level encryption It maintain absolute privacy as every key is generated in local RAM',
          faq: 'Can I generate multiple keys Yes the engine allow for unlimited creative cycles Is the process truly random The architect uses browser native hardware entropy sources to ensure maximum unpredictability'
        }
      },
      'unit-calc': {
        name: 'Sovereign Unit Transmuter',
        doc: {
          about: 'The Sovereign Unit Transmuter is a professional metric architect designed to convert between global measurement standards with absolute precision This utility ensures that dimensional manuscripts remain accurate across diverse international jurisdictions by maintaining logical integrity during the transmutation process',
          usage: 'Inject your source metric into the primary ingestion node and select the target dimension category Trigger the transmutation cycle to manifest the equivalent values across the comprehensive registry for immediate archival review',
          benefits: 'This module provides immediate structural momentum by eliminating manual calculation errors It ensures absolute data sovereignty as every logical cycle occurs within your local browser buffer memory avoiding external network logging',
          faq: 'Does it support scientific units The architect is calibrated to handle dominant global units including standard length and mass metrics'
        }
      },
      'ai-humanizer': {
        name: 'AI Text Humanizer',
        doc: {
          about: 'The AI Text Humanizer is a sophisticated neural refactoring instrument designed to transmute automated prose into high fidelity human like manuscripts This utility utilize advanced linguistic analysis to reconfigure tone and structural variety ensuring your content resonates with professional aesthetic standards',
          usage: 'Inject your automated manuscript into the source terminal and select the desired stylistic aura Trigger the refinement cycle to manifest the polished humanized prose in the secondary registry ready for immediate archival',
          benefits: 'This module provides immediate creative momentum by removing automated artifacts from your text It ensures absolute data sovereignty as all neural cycles occur within your browser isolated sandbox avoiding external logging',
          faq: 'Does it change the meaning The architect is calibrated to maintain semantic integrity while improving the aesthetic flow of your manuscript'
        }
      },
      'grammar-fixer': {
        name: 'Grammar Checker',
        internal: { original: 'Source', corrected: 'Refined', btn: 'Execute Audit' },
        doc: {
          about: 'The Grammar Checker is a professional linguistic auditor designed to identify and correct structural regressions in written manuscripts This utility utilize advanced syntactic analysis to ensure your professional correspondence meets global standards for clarity and precision',
          usage: 'Inject your raw manuscript into the ingestion panel and trigger the audit protocol The engine will automatically manifest the refined text and a brief logic summary in the secondary registry for immediate deployment',
          benefits: 'This instrument provides immediate structural momentum by removing linguistic barriers while ensuring your prose adheres to global professional standards It maintain absolute data sovereignty as all logic cycle execute locally',
          faq: 'Does it support multiple languages The architect is calibrated for diverse global manuscripts and automatically detects the linguistic root for optimal refinement'
        }
      },
      'case-converter': {
        name: 'Case Converter',
        doc: {
          about: 'The Case Converter is a professional typographic instrument designed to transmute the character topology of any text manuscript This utility utilize standardized structural logic to reconfigure capitalization patterns ensuring absolute consistency across your professional archives',
          usage: 'Inject your text into the ingestion viewport and select the desired topological protocol from the configuration panel The engine will immediately manifest the transformed manuscript ready for archival or deployment',
          benefits: 'This module provides immediate creative momentum by eliminating manual editing barriers while ensuring your text meets professional styling standards It maintain absolute data sovereignty as all logical cycles occur locally',
          faq: 'Can I undo changes The interface allows for immediate re transmutation between all available topological styles'
        }
      },
      'text-cleaner': {
        name: 'Text Sanitizer',
        internal: { protocols: 'Protocols', emptyLines: 'Purge Lines', whitespace: 'Trim Edges', duplicates: 'Unique Only', html: 'Strip Code', special: 'Alpha Only' },
        doc: {
          about: 'The Text Sanitizer is a professional archival instrument designed to purge manuscripts of structural noise and redundant data This utility utilize standardized logical filters to ensure your text archives remain clean and performant for further processing',
          usage: 'Inject your source manuscript into the terminal and select the desired sanitation protocols Trigger the purification cycle to manifest the refined text in the secondary registry ready for immediate deployment',
          benefits: 'This instrument provides immediate structural momentum by removing manual cleaning barriers while ensuring your data adheres to global standards for high level archival It maintain absolute privacy as all logic execute locally',
          faq: 'Does it support large files The architect is calibrated to handle various manuscript volumes within the constraints of your local hardware memory'
        }
      },
      'number-extractor': {
        name: 'Number Extractor',
        doc: {
          about: 'The Number Extractor is a professional data harvesting instrument designed to isolate numerical coordinates from complex manuscripts This utility utilize advanced pattern matching logic to identify and extract digits ensuring absolute transparency for your data archives',
          usage: 'Inject your text into the ingestion viewport and calibrate the extraction protocols Trigger the harvesting cycle to manifest the isolated digits in the secondary registry ready for immediate archival',
          benefits: 'This module provides immediate operational momentum by removing manual extraction barriers while ensuring your data meets global standards for high level analysis It maintain absolute sovereignty as all logic execute locally',
          faq: 'Does it handle decimals Yes the engine is calibrated to recognize and preserve fractional coordinates based on your configuration'
        }
      },
      'lang-extractor': {
        name: 'Language Filter',
        doc: {
          about: 'The Language Filter is a professional linguistic instrument designed to isolate specific script archetypes from mixed manuscripts This utility utilize advanced character mapping to separate diverse global languages ensuring absolute clarity for your data archives',
          usage: 'Inject your mixed manuscript into the terminal and select the scripts you wish to preserve Trigger the isolation cycle to manifest the filtered text in the secondary registry for immediate deployment',
          benefits: 'This instrument provides immediate creative momentum by removing linguistic noise while ensuring your text meets professional archival standards It maintain absolute data sovereignty as all logic cycle execute locally',
          faq: 'Does it handle punctuation Yes the architect preserves structural marks to ensure the semantic integrity of the remaining manuscript'
        }
      },
      'email-extractor': {
        name: 'Email Extractor',
        internal: { label: 'Source', result: 'Registry', placeholder: 'Paste mixed data...' },
        doc: {
          about: 'The Email Extractor is a professional data harvesting instrument designed to isolate electronic communication coordinates from complex manuscripts This utility utilize standardized pattern logic to identify and extract email addresses ensuring absolute clarity for your contact archives',
          usage: 'Inject your text into the ingestion viewport and trigger the harvesting protocol The engine will automatically manifest the isolated addresses in the secondary registry ready for immediate deployment',
          benefits: 'This module provides immediate operational momentum by removing manual extraction barriers while ensuring your data meets global standards for high level archival It maintain absolute privacy as all logic execute locally',
          faq: 'Can I sort the results Yes the architect includes options for unique filtering and alphabetical arrangement within the local buffer'
        }
      },
      'domain-extractor': {
        name: 'Domain Extractor',
        doc: {
          about: 'The Domain Extractor is a professional data harvesting instrument designed to isolate hostname coordinates from complex manuscripts This utility utilize advanced pattern recognition to identify and extract web domains ensuring absolute transparency for your digital archives',
          usage: 'Inject your source text into the terminal and select the desired extension filters Trigger the harvesting cycle to manifest the isolated domains in the secondary registry ready for immediate deployment',
          benefits: 'This instrument provides immediate operational momentum by removing manual extraction barriers while ensuring your data adheres to professional archival standards It maintain absolute privacy as all logic execute locally',
          faq: 'Does it handle subdomains Yes the architect can be calibrated to include or exclude specific hostname segments based on your requirements'
        }
      },
      'keyword-density': {
        name: 'Keyword Auditor',
        doc: {
          about: 'The Keyword Auditor is a professional lexical instrument designed to evaluate the distribution of terms within a manuscript This utility utilize standardized linguistic logic to determine term frequency ensuring your content adheres to global standards for structural balance',
          usage: 'Inject your text into the ingestion viewport and select the phrase length for analysis The engine will automatically synthesize the density metrics and manifest the results in the secondary registry for immediate review',
          benefits: 'This module provides immediate creative momentum by identifying repetitive patterns while ensuring your manuscript meets professional standards for content assessment It maintain absolute sovereignty as all logic execute locally',
          faq: 'Does it exclude common terms Yes the architect utilizes a built in registry of common stop words to focus on meaningful lexical nodes'
        }
      },
      'cv-maker': {
        name: 'CV Architect',
        doc: {
          about: 'The CV Architect is a professional identity forge designed to synthesize high fidelity career manuscripts This utility utilize standardized structural logic to ensure your professional history is rendered with absolute clarity and aesthetic consistency for archival purposes',
          usage: 'Navigate through the sequential data nodes to input your personal career and scholastic history Observe the live preview to verify the visual alignment Trigger the finalization cycle to manifest a print ready manuscript',
          benefits: 'This instrument provides immediate professional momentum by removing manual formatting barriers while ensuring your identity meets global standards for career documentation It maintain absolute privacy as all data remains in local memory',
          faq: 'Can I save my progress Yes the architect automatically synchronizes your data with the local browser registry for future sessions'
        }
      },
      'lesson-plan': {
        name: 'Lesson Architect',
        doc: {
          about: 'The Lesson Architect is a professional pedagogical instrument designed to synthesize comprehensive instructional frameworks This utility utilize advanced structural logic to ensure your educational manuscripts meet global standards for clarity and instructional effectiveness',
          usage: 'Inject your subject matter concept into the terminal and calibrate the level and duration nodes Trigger the synthesis cycle to manifest a detailed lesson manuscript ready for immediate deployment in an academic environment',
          benefits: 'This module provides immediate instructional momentum by removing manual planning barriers while ensuring your framework adheres to professional standards for high level pedagogy It maintain absolute privacy as all logic execute locally',
          faq: 'Can I change the language Yes the engine supports multiple linguistic archetypes for global pedagogical alignment'
        }
      },
      'exam-planner': {
        name: 'Exam Meridian',
        doc: {
          about: 'The Exam Meridian is a professional temporal architect designed to synthesize high intensity study schedules This utility utilize standardized study logic to ensure your preparation manuscripts are optimized for maximum cognitive retention over a defined period',
          usage: 'Inject your subjects and difficulty matrix into the ingestion node and define the temporal limit Trigger the synthesis cycle to manifest a comprehensive day by day schedule in the secondary registry for immediate review',
          benefits: 'This instrument provides immediate academic momentum by removing manual planning barriers while ensuring your schedule meets professional standards for efficient preparation It maintain absolute privacy as all logic execute locally',
          faq: 'Can I adjust the schedule Yes the engine allow for unlimited creative cycles to accommodate changes in your study requirements'
        }
      },
      'yt-script-gen': {
        name: 'YouTube Script Forge',
        doc: {
          about: 'The YouTube Script Forge is a professional narrative synthesizer designed to create high engagement manuscripts for digital media This utility utilize advanced structural analysis to ensure your video content meets global standards for audience retention and clarity',
          usage: 'Inject your concept into the ingestion terminal and calibrate the audience and tone nodes Trigger the synthesis cycle to manifest a comprehensive video manuscript in the secondary registry ready for immediate production',
          benefits: 'This module provides immediate creative momentum by removing manual scripting barriers while ensuring your narrative adheres to professional standards for high performance media It maintain absolute privacy as all logic execute locally',
          faq: 'Does it include visual cues Yes the architect provides integrated visual and pacing markers within the generated manuscript'
        }
      },
      'yt-tag-extractor': {
        name: 'YouTube Tag Extractor',
        internal: { label: 'URL', placeholder: 'Paste link...', btn: 'Extract', extracting: 'Analyzing...', authority: 'Registry' },
        doc: {
          about: 'The YouTube Tag Extractor is a professional metadata deconstruction instrument designed to isolate SEO keywords from digital media This utility utilize search grounded logic to identify high performance anchors for your own video manuscripts',
          usage: 'Inject the target video URL into the terminal and trigger the extraction protocol The engine will automatically manifest the isolated tags and authority title in the secondary registry for immediate review',
          benefits: 'This instrument provides immediate strategic momentum by identifying successful metadata patterns while ensuring your own content meets professional standards for reach It maintain absolute privacy as all logic execute locally',
          faq: 'Does it work for all videos The architect is calibrated for public media assets accessible via standard digital coordinates'
        }
      },
      'yt-hook-gen': {
        name: 'YouTube Hook Forge',
        doc: {
          about: 'The YouTube Hook Forge is a professional engagement instrument designed to synthesize high retention opening sequences for digital media This utility utilize advanced psychological logic to ensure your content captures audience attention within the primary temporal window',
          usage: 'Inject your video concept into the terminal and select the desired psychological trigger Trigger the synthesis cycle to manifest multiple viral openers in the secondary registry ready for immediate deployment',
          benefits: 'This module provides immediate creative momentum by removing engagement barriers while ensuring your content meets professional standards for high performance media It maintain absolute privacy as all logic execute locally',
          faq: 'Does it support multiple languages Yes the engine supports various linguistic archetypes for global audience alignment'
        }
      },
      'yt-thumbnail-forge': {
        name: 'AI Thumbnail Forge',
        doc: {
          about: 'The AI Thumbnail Forge is a professional visual synthesizer designed to create high impact previews for digital media This utility utilize advanced neural analysis to generate cinematic and engaging imagery that meets global standards for visual reach',
          usage: 'Inject your visual concept into the terminal and trigger the forge cycle The engine will first enhance the conceptual prompt and then synthesize the final visual asset in the registry viewport for immediate export',
          benefits: 'This instrument provides immediate creative momentum by removing manual design barriers while ensuring your previews meet professional standards for high fidelity imagery It maintain absolute privacy as all logic execute locally',
          faq: 'Can I generate multiple variants Yes the engine allow for unlimited creative cycles based on your input parameters'
        }
      },
      'insta-caption': {
        name: 'Instagram Caption Forge',
        doc: {
          about: 'The Instagram Caption Forge is a professional creative instrument designed to synthesize high engagement social copy This utility utilize neural analysis of visual and conceptual data to ensure your social media presence meets global standards for aesthetic consistency',
          usage: 'Inject your visual asset or post concept into the terminal and select the desired stylistic aura Trigger the synthesis cycle to manifest the refined copy and strategic hashtags in the secondary registry',
          benefits: 'This module provides immediate creative momentum by removing manual copywriting barriers while ensuring your posts meet professional standards for high level engagement It maintain absolute privacy as all logic execute locally',
          faq: 'Does it handle multiple languages Yes the engine is calibrated for various global linguistic archetypes'
        }
      },
      'insta-grid': {
        name: 'Grid Architect',
        doc: {
          about: 'The Grid Architect is a professional visual simulator designed to evaluate the aesthetic symmetry of social media registries This utility utilize standardized spatial logic to ensure your visual assets are aligned with professional branding standards',
          usage: 'Inject your visual assets into the simulator to populate the virtual grid nodes Observe the spatial arrangement to verify the aesthetic balance and remove any nodes that disrupt the symmetry',
          benefits: 'This instrument provides immediate creative momentum by identifying visual inconsistencies while ensuring your registry meets professional standards for high level design It maintain absolute privacy as all assets remain in local memory',
          faq: 'How many nodes can I simulate The architect is calibrated for a standard twelve node registry for comprehensive visual planning'
        }
      },
      'tweet-to-image': {
        name: 'Tweet to Image',
        doc: {
          about: 'The Tweet to Image architect is a professional visual synthesizer designed to transform text based manuscripts into high impact social assets This utility utilize standardized design logic to ensure your narratives are rendered with absolute aesthetic consistency',
          usage: 'Inject your manuscript into the terminal and calibrate the identity and stylistic parameters Trigger the export cycle to manifest the visual asset in the registry viewport ready for immediate distribution',
          benefits: 'This module provides immediate creative momentum by removing manual design barriers while ensuring your assets meet global standards for high fidelity imagery It maintain absolute privacy as all logic execute locally',
          faq: 'Does it support high resolution Yes the architect utilizes advanced scaling nodes to ensure sub pixel clarity for professional displays'
        }
      },
      'tweet-thread': {
        name: 'Thread Master Scribe',
        doc: {
          about: 'The Thread Master Scribe is a professional narrative partitioning instrument designed to transform long form manuscripts into sequential social nodes This utility utilize standardized linguistic boundaries to ensure your narratives remain engaging and coherent',
          usage: 'Inject your long form manuscript into the ingestion terminal and the engine will automatically synthesize the sequential nodes Manifest the results in the secondary registry for individual or collective export',
          benefits: 'This instrument provides immediate creative momentum by removing manual partitioning barriers while ensuring your narrative meets professional standards for digital engagement It maintain absolute privacy as all logic execute locally',
          faq: 'Can I adjust the partitioning Yes the architect allow for manual refinements within the ingestion terminal before final synthesis'
        }
      },
      'tiktok-voiceover': {
        name: 'TikTok Script Synth',
        doc: {
          about: 'The TikTok Script Synth is a professional acoustic instrument designed to synthesize high retention scripts for short form digital media This utility utilize advanced temporal logic to ensure your narratives meet global standards for auditory engagement',
          usage: 'Inject your narrative concept into the terminal and select the desired trend archetype Trigger the synthesis cycle to manifest the acoustic manuscript and estimated duration in the secondary registry',
          benefits: 'This module provides immediate creative momentum by removing manual scripting barriers while ensuring your content meets professional standards for high performance media It maintain absolute privacy as all logic execute locally',
          faq: 'Does it include timing markers Yes the architect provides integrated pacing and pause indicators within the generated script'
        }
      },
      'tiktok-trend': {
        name: 'Trend Oracle',
        doc: {
          about: 'The Trend Oracle is a professional strategic instrument designed to evaluate viral signals within specific digital niches This utility utilize advanced algorithmic analysis to identify emerging concepts ensuring your media presence remains at the forefront of global engagement',
          usage: 'Inject your niche coordinate into the terminal and trigger the analysis protocol The engine will automatically manifest predicted trend concepts and viral openers in the secondary registry for immediate review',
          benefits: 'This instrument provides immediate strategic momentum by identifying emerging engagement patterns while ensuring your content meets professional standards for high level reach It maintain absolute privacy as all logic execute locally',
          faq: 'Does it predict future trends Yes the engine is calibrated to analyze current velocity and extrapolate upcoming conceptual shifts'
        }
      },
      'linkedin-post': {
        name: 'LinkedIn Architect',
        doc: {
          about: 'The LinkedIn Architect is a professional creative instrument designed to synthesize high impact thought leadership manuscripts This utility utilize advanced structural analysis to ensure your professional presence meets global standards for executive authority',
          usage: 'Inject your thought coordinate into the terminal and trigger the synthesis cycle The engine will automatically manifest a structured executive manuscript in the secondary registry ready for immediate distribution',
          benefits: 'This module provides immediate professional momentum by removing manual copywriting barriers while ensuring your content adheres to professional standards for high level networking It maintain absolute privacy as all logic execute locally',
          faq: 'Can I generate multiple variants Yes the engine allow for unlimited creative cycles based on your input parameters'
        }
      },
      'linkedin-bio': {
        name: 'LinkedIn Bio Architect',
        doc: {
          about: 'The LinkedIn Bio Architect is a professional identity forge designed to synthesize authoritative personal narratives This utility utilize advanced structural logic to ensure your professional identity is rendered with absolute clarity and consistency for executive networking',
          usage: 'Inject your skill coordinates and tenure history into the ingestion terminal Trigger the synthesis cycle to manifest a compelling identity manuscript in the secondary registry for immediate review',
          benefits: 'This instrument provides immediate professional momentum by removing manual writing barriers while ensuring your identity meets global standards for executive documentation It maintain absolute privacy as all data remains in local memory',
          faq: 'Does it use professional tone Yes the architect is calibrated to produce an executive authoritative tone for all identity manuscripts'
        }
      },
      'bio-gen': {
        name: 'Identity Bio Architect',
        doc: {
          about: 'The Identity Bio Architect is a professional creative instrument designed to synthesize magnetic social narratives This utility utilize advanced linguistic analysis to ensure your digital presence meets global standards for aesthetic and professional consistency',
          usage: 'Inject your personal traits into the ingestion terminal and select the desired persona aura Trigger the forge cycle to manifest a concise identity manuscript in the secondary registry ready for immediate deployment',
          benefits: 'This module provides immediate creative momentum by removing manual writing barriers while ensuring your presence meets professional standards for digital engagement It maintain absolute privacy as all logic execute locally',
          faq: 'Does it include emojis Yes the architect is calibrated to include relevant visual markers to enhance the aesthetic appeal of your bio'
        }
      },
      'hashtag-gen': {
        name: 'Hashtag Forge',
        doc: {
          about: 'The Hashtag Forge is a professional semantic instrument designed to synthesize high engagement anchors for digital media This utility utilize advanced linguistic analysis to identify viral nodes that ensure your content reaches its target demographic with absolute precision',
          usage: 'Inject your narrative concept into the terminal and trigger the forge cycle The engine will automatically manifest a comprehensive registry of strategic anchors grouped by their potential reach for immediate deployment',
          benefits: 'This instrument provides immediate strategic momentum by identifying high performance semantic nodes while ensuring your content meets professional standards for digital reach It maintain absolute privacy as all logic execute locally',
          faq: 'Can I generate tags for any topic Yes the forge is calibrated to handle diverse global concepts across all digital niches'
        }
      },
      'email-sig': {
        name: 'Email Sig Architect',
        doc: {
          about: 'The Email Sig Architect is a professional identity forge designed to synthesize high fidelity communication signatures This utility utilize standardized structural logic to ensure your professional identity is consistently rendered across all digital correspondence',
          usage: 'Inject your identity parameters and communication nodes into the configuration terminal Observe the live preview to verify the visual alignment Trigger the forge cycle to manifest a portable HTML signature manuscript',
          benefits: 'This instrument provides immediate professional momentum by removing manual design barriers while ensuring your identity meets global standards for digital documentation It maintain absolute privacy as all data remains in local memory',
          faq: 'Can I use it with any email client Yes the synthesized HTML manuscript is designed for maximum compatibility with all dominant professional communication platforms'
        }
      },
      'json-to-ts': {
        name: 'JSON to TypeScript',
        doc: {
          about: 'The JSON to TypeScript architect is a professional structural transmuter designed to convert data manuscripts into type safe programming logic This utility ensures that your application architecture remains robust and maintainable by maintaining absolute logical integrity during the transmutation process',
          usage: 'Inject your source JSON manuscript into the terminal and trigger the synthesis cycle The engine will automatically manifest the corresponding TypeScript interfaces in the secondary registry for immediate archival review',
          benefits: 'This module provides immediate structural momentum by eliminating manual type definition barriers while ensuring your logic adheres to global standards for high level programming It maintain absolute data sovereignty as every logical cycle occurs locally',
          faq: 'Does it handle nested objects Yes the architect utilizes recursive depth parsing to capture even the most complex hierarchical structures'
        }
      },
      'json-yaml': {
        name: 'JSON-YAML Shift',
        doc: {
          about: 'The JSON-YAML Shift is a professional structural transmuter designed to convert data between dominant scripting formats This utility ensures that configuration manuscripts remain compatible across diverse development environments by maintaining absolute logical integrity during the transmutation process',
          usage: 'Inject your primary data manuscript into the source terminal and select the desired transmutation path Trigger the cycle to manifest the refined output in the secondary registry ready for immediate deployment',
          benefits: 'This module provides immediate operational momentum by eliminating manual syntax rewriting while ensuring your data adheres to global standards for structural consistency It maintain absolute data sovereignty as all logic cycle execute locally',
          faq: 'Can I switch directions Yes the engine supports bidirectional flows between both structured formats ensuring high fidelity across all scripting environments'
        }
      },
      'sql-to-laravel': {
        name: 'SQL to Laravel',
        doc: {
          about: 'The SQL to Laravel Architect is a professional structural transmuter designed to convert traditional database query manuscripts into modern object relational mapping logic This utility ensure that your data retrieval logic remains elegant and maintainable within contemporary development frameworks',
          usage: 'Inject your raw database query manuscript into the primary processing terminal and trigger the synthesis cycle The engine will automatically manifest the refined programming code in the secondary registry ready for immediate production',
          benefits: 'This module provide immediate structural momentum by eliminating manual translation barriers while ensuring your logic adheres to global standards for high level programming It maintain absolute data sovereignty as every logical cycle occurs within your local browser buffer memory avoiding external network logging',
          faq: 'Can I generate multiple variants Yes the engine allow for unlimited creative cycles based on your input parameters Does it support complex joins The architect is calibrated to handle various relational structures including intricate horizontal joins and nested conditions'
        }
      },
      'html-to-tailwind': {
        name: 'HTML to Tailwind',
        doc: {
          about: 'The HTML to Tailwind Architect is a professional refactoring instrument engineered to transmute standard markup into high performance utility classes This utility utilize advanced structural analysis to reconfigure your visual components for modern styling frameworks ensuring absolute logical alignment and aesthetic consistency',
          usage: 'Inject your legacy markup manuscript into the primary processing terminal Select the desired styling intensity from the configuration node Trigger the transmutation cycle to manifest the refined utility based manuscript in the secondary registry ready for immediate deployment',
          benefits: 'This module provide immediate operational momentum by removing manual styling barriers while ensuring your code meets global standards for rapid interface development It maintain absolute data sovereignty as every logical cycle occurs within your local browser buffer memory avoiding external network logging',
          faq: 'Can I generate multiple variants Yes the engine allow for unlimited creative cycles based on your input parameters Does it handle complex nesting The architect is calibrated to handle various structural depths and intricate layout coordinates while maintaining semantic integrity'
        }
      },
      'docker-gen': {
        name: 'Docker Node Forge',
        doc: {
          about: 'The Docker Node Forge is a professional structural architect designed to synthesize containerization manuscripts for server environments This instrument utilize isolated logical parameters to transform your deployment requirements into high performance virtual blueprints that ensure absolute environment consistency across global networks',
          usage: 'Select your preferred software foundation version from the configuration terminal Calibrate the network port exposure and operating system aura Trigger the synthesis cycle to manifest a comprehensive deployment manuscript ready for immediate archival within your production registry',
          benefits: 'This module provide immediate operational momentum by removing manual configuration barriers while ensuring your container logic adheres to global standards for high level cloud architecture It maintain absolute data sovereignty as every logical cycle occurs within your local browser buffer memory avoiding external logging',
          faq: 'Can I generate multiple variants Yes the engine allow for unlimited creative cycles based on your input parameters Is it compatible with multiple systems The forge is calibrated to handle various linux distributions ensuring high fidelity across different hardware nodes'
        }
      },
      'regex-tester': {
        name: 'RegEx Architect',
        doc: {
          about: 'The RegEx Architect is a professional logical instrument designed to evaluate and explain regular expression patterns This utility utilize standardized syntactic analysis to ensure your search patterns are mathematically sound and performant across global development environments',
          usage: 'Inject your pattern logic and subject manuscript into the analysis terminal and trigger the evaluation cycle The engine will automatically manifest any matches and a comprehensive logical explanation in the viewport for immediate review',
          benefits: 'This instrument provides immediate operational momentum by identifying logical regressions while ensuring your patterns meet professional standards for high performance data retrieval It maintain absolute privacy as all logic execute locally',
          faq: 'Can I use various flags Yes the architect supports global and case insensitive flags to calibrate the sensitivity of your logical search'
        }
      },
      'jwt-debugger': {
        name: 'JWT Manuscript Debug',
        doc: {
          about: 'The JWT Manuscript Debug is a sophisticated analytical instrument engineered to deconstruct and inspect cryptographic tokens used in secure digital authentication This utility utilize advanced base sixty four decoding logic to reveal hidden claims and header parameters ensuring absolute structural transparency for secure session management',
          usage: 'Inject your encoded cryptographic token into the primary analysis terminal The engine will automatically partition the manuscript into its constituent header and payload segments Observe the decoded data structures within the secondary registries to verify administrative claims and signature algorithms',
          benefits: 'This module provide immediate diagnostic momentum by revealing encrypted logic without the need for server side decoding it ensure absolute data sovereignty as every analytical cycle occurs within your local browser buffer memory avoiding external network logging or transmission',
          faq: 'Can I modify the token Yes the interface allow for direct editing of the decoded claims to test architectural variations Is it safe for sensitive keys Absolute privacy is guaranteed since all logic execute within the isolated sandbox of your local machine'
        }
      },
      'cap-rate': {
        name: 'Cap Rate Oracle',
        doc: {
          about: 'The Cap Rate Oracle is a specialized institutional instrument designed to evaluate the potential yield of real estate assets This utility utilizes advanced fiscal logic to determine the relationship between net operating income and the acquisition value of property ensuring absolute transparency for your investment archives',
          usage: 'Enter the acquisition value of the property into the primary analysis terminal Define the expected recurring yield and subtract the operational overhead from the configuration panel Trigger the evaluation cycle to manifest the capitalization percentage in the secondary registry',
          benefits: 'This module provides immediate strategic momentum by revealing the underlying efficiency of capital deployment It ensures absolute data sovereignty as every logical cycle occurs within your local browser buffer memory avoiding any external network logging or transmission',
          faq: 'Can I simulate various scenarios Yes the engine allow for unlimited creative cycles based on your input parameters Is it safe for sensitive financial data Absolute privacy is guaranteed since all logic execute within the isolated sandbox of your local machine'
        }
      },
      'perc-calc': {
        name: 'Percentage Master',
        internal: { title: 'Percentage Master', sub: 'Mathematical Node', label1: 'Value A', label2: 'Value B', result: 'Delta Result' },
        doc: {
          about: 'The Percentage Master is a professional mathematical instrument designed to evaluate relative ratios and changes between numerical nodes This utility utilize standardized arithmetic logic to determine exact percentage values ensuring absolute transparency for your data archives',
          usage: 'Adjust the numerical coordinates using the primary control nodes to define the target values The engine will automatically synthesize the percentage ratio and manifest the result in the secondary registry for immediate review',
          benefits: 'This module provide immediate operational momentum by removing manual calculation barriers while ensuring your metrics meet global standards for high level arithmetic It maintain absolute privacy as all logic execute locally',
          faq: 'Can I perform multiple calculations Yes the engine allow for unlimited creative cycles based on your input parameters'
        }
      },
      'stopwatch-timer': {
        name: 'Chronos Meridian',
        internal: { stopwatch: 'Stopwatch', timer: 'Timer', active: 'Active Pulse', hours: 'Hours', mins: 'Mins', secs: 'Secs' },
        doc: {
          about: 'The Chronos Meridian is a professional temporal instrument designed to measure and manage time intervals with absolute precision This utility utilize standardized chronometric logic to ensure your temporal manuscripts are accurate across all professional environments',
          usage: 'Select the desired temporal mode from the configuration node and trigger the countdown or measurement cycle Observe the live registry to monitor the active pulse and manage your temporal archives with absolute clarity',
          benefits: 'This instrument provides immediate operational momentum by removing manual timing barriers while ensuring your metrics meet professional standards for high level chronometry It maintain absolute privacy as all logic execute locally',
          faq: 'Can I use it on mobile Yes the architect is calibrated for high fidelity performance across all responsive nodes'
        }
      },
      'binary-cipher': {
        name: 'Binary Cipher',
        internal: { title: 'Binary Cipher', sub: 'Bitstream Transmuter', switch: 'Shift Flow', placeholderText: 'Manuscript...', placeholderBin: 'Bitstream...' },
        doc: {
          about: 'The Binary Cipher is a professional structural transmuter designed to convert data between human readable manuscripts and bitstream formats This utility ensures that your archival data remains compatible across diverse digital environments by maintaining absolute logical integrity',
          usage: 'Inject your manuscript or bitstream into the primary terminal and select the desired shift flow Trigger the transmutation cycle to manifest the refined output in the secondary registry for immediate archival review',
          benefits: 'This module provide immediate creative momentum by eliminating manual encoding barriers while ensuring your data meets professional standards for digital documentation It maintain absolute privacy as all logic execute locally',
          faq: 'Does it support special characters Yes the architect is calibrated to handle various linguistic nodes within the standard binary registry'
        }
      },
      'notepad': {
        name: 'online notepad',
        doc: {
          about: 'The Online Notepad is a professional drafting instrument designed for high fidelity text composition within a secure local sandbox This utility utilize standardized archival logic to ensure your digital manuscripts are preserved without the need for external network transmission',
          usage: 'Inject your thoughts and professional prose directly into the primary terminal node The engine will automatically synchronize your progress with the local browser registry allowing you to return to your work at any temporal coordinate',
          benefits: 'This module provides immediate creative momentum by eliminating automated artifacts from your text It ensures absolute data sovereignty as all archival cycles occur within your browser isolated sandbox avoiding external logging',
          faq: 'Is my data safe Yes the architect ensures that your manuscripts remain entirely within your local hardware buffer memory adhering to the strict privacy pact'
        }
      },
      'inflation-calc': {
        name: 'Inflation Oracle',
        doc: {
          about: 'The Inflation Oracle is a sophisticated fiscal instrument designed to evaluate the erosion of purchasing power over time This utility utilize standardized macroeconomic logic to forecast future expenditure requirements ensuring absolute transparency for your financial archives',
          usage: 'Inject your current expenditure coordinates and select the target jurisdiction and temporal horizon Trigger the evaluation cycle to manifest the future cost projections and strategic advice in the secondary registry',
          benefits: 'This module provides immediate strategic momentum by revealing the underlying efficiency of capital deployment It ensures absolute data sovereignty as every logical cycle occurs within your local browser buffer memory avoiding external logging',
          faq: 'Can I simulate various rates Yes the engine allow for custom rate inputs to test diverse economic scenarios'
        }
      }
    }
  }
};

export const T = TRANSLATIONS.en;
