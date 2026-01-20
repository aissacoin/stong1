
import { Tool, ToolCategory } from './types';

export const TOOLS: Tool[] = [
  // --- PRODUCTIVITY & ASSISTANCE (1-15) ---
  { id: 'word-counter', name: 'Word Counter', description: 'Real-time word and character analytics.', category: ToolCategory.PRODUCTIVITY, icon: 'AlignLeft' },
  { id: 'word-counter-per-page', name: 'Words to Pages', description: 'Estimate page count based on word volume.', category: ToolCategory.PRODUCTIVITY, icon: 'BookOpen' },
  { id: 'notepad', name: 'online notepad', description: 'Secure local-first drafting terminal.', category: ToolCategory.PRODUCTIVITY, icon: 'FileText' },
  { id: 'ai-humanizer', name: 'AI Text Humanizer', description: 'Transform AI prose into human-like text.', category: ToolCategory.PRODUCTIVITY, icon: 'BrainCircuit' },
  { id: 'grammar-fixer', name: 'Grammar Checker', description: 'Universal linguistic correction node.', category: ToolCategory.PRODUCTIVITY, icon: 'Languages' },
  { id: 'case-converter', name: 'Case Converter', description: 'Transform text topology (Upper, Lower, Camel).', category: ToolCategory.PRODUCTIVITY, icon: 'Type' },
  { id: 'text-cleaner', name: 'Text Sanitizer', description: 'Purge special chars and empty lines.', category: ToolCategory.PRODUCTIVITY, icon: 'Eraser' },
  { id: 'number-extractor', name: 'Number Extractor', description: 'Harvest numerical data from raw text.', category: ToolCategory.PRODUCTIVITY, icon: 'FileDigit' },
  { id: 'lang-extractor', name: 'Language Filter', description: 'Isolate specific languages and scripts from mixed text sources.', category: ToolCategory.PRODUCTIVITY, icon: 'Globe' },
  { id: 'email-extractor', name: 'Email Extractor', description: 'Extract email coordinates from text.', category: ToolCategory.PRODUCTIVITY, icon: 'Mail' },
  { id: 'domain-extractor', name: 'Domain Extractor', description: 'Harvest URLs and hostnames from logs.', category: ToolCategory.PRODUCTIVITY, icon: 'Globe2' },
  { id: 'keyword-density', name: 'Keyword Auditor', description: 'Analyze lexical distribution for SEO.', category: ToolCategory.PRODUCTIVITY, icon: 'BarChart3' },
  { id: 'cv-maker', name: 'CV Architect', description: 'Generate professional professional registries.', category: ToolCategory.PRODUCTIVITY, icon: 'Layout' },
  { id: 'lesson-plan', name: 'Lesson Architect', description: 'AI-powered pedagogical framework forge.', category: ToolCategory.PRODUCTIVITY, icon: 'GraduationCap' },
  { id: 'exam-planner', name: 'Exam Meridian', description: 'Efficient study schedule synthesizer.', category: ToolCategory.PRODUCTIVITY, icon: 'Calendar' },

  // --- DESIGN & E-COMMERCE ASSISTANT (16-30) ---
  { id: 'fake-address', name: 'Fake Name Generator', description: 'Generate high-fidelity synthetic names, addresses, and personas for testing and privacy.', category: ToolCategory.CONVERSION, icon: 'UserCircle' },
  { id: 'dimension-forge', name: 'simple image to 3D', description: 'Make your products pop! Transform flat images into 360-style 3D renders, Ultra-HD 4K, or sleek 2D vectors for professional stores.', category: ToolCategory.CONVERSION, icon: 'Box' },
  { id: 'bg-remover', name: 'AI BG Remover', description: 'Pixel-perfect subject isolation for product catalogs.', category: ToolCategory.CONVERSION, icon: 'Focus' },
  { id: 'photo-enhancer', name: 'AI Photo ENhancer', description: 'Neural detail reconstruction core.', category: ToolCategory.CONVERSION, icon: 'Wand2' },
  { id: 'bg-shifter', name: 'Background Shifter', description: 'Neural background replacement node.', category: ToolCategory.CONVERSION, icon: 'Palette' },
  { id: 'bg-architect', name: 'BG Architect', description: 'Synthesize custom environments with AI.', category: ToolCategory.CONVERSION, icon: 'Mountain' },
  { id: 'hair-architect', name: 'Hair Color Architect', description: 'Neural pigment transmutation.', category: ToolCategory.CONVERSION, icon: 'Palette' },
  { id: 'grooming-sim', name: 'Grooming Simulator', description: 'Virtual professional barber node.', category: ToolCategory.CONVERSION, icon: 'UserRound' },
  { id: 'image-storyteller', name: 'Image Storyteller', description: 'Synthesize narratives from visuals.', category: ToolCategory.CONVERSION, icon: 'MessageSquareText' },
  { id: 'collage-maker', name: 'Collage Architect', description: 'Multi-asset visual synthesis.', category: ToolCategory.CONVERSION, icon: 'LayoutGrid' },
  { id: 'social-resizer', name: 'Social Resizer', description: 'Platform-standard pixel processing.', category: ToolCategory.CONVERSION, icon: 'Maximize' },
  { id: 'color-picker', name: 'Aureate Picker', description: 'Visual chromatic extraction node.', category: ToolCategory.CONVERSION, icon: 'Pipette' },
  { id: 'color-gen', name: 'Palette Forge', description: 'Chromatographic balance engine.', category: ToolCategory.CONVERSION, icon: 'Palette' },
  { id: 'favicon-gen', name: 'Favicon Architect', description: 'Multi-platform manifest forge.', category: ToolCategory.CONVERSION, icon: 'Layers' },
  { id: 'qr-gen', name: 'QR Architect', description: 'Archival QR generation node.', category: ToolCategory.CONVERSION, icon: 'QrCode' },
  { id: 'webp-to-png', name: 'WebP to PNG', description: 'Convert WebP assets to PNG format.', category: ToolCategory.CONVERSION, icon: 'RefreshCw' },

  // --- SOCIAL MEDIA & MARKETING (31-45) ---
  { id: 'yt-script-gen', name: 'YouTube Script Forge', description: 'Viral narrative generator.', category: ToolCategory.GENERATORS, icon: 'Youtube' },
  { id: 'yt-tag-extractor', name: 'YouTube Tag Extractor', description: 'Viral metadata deconstruction.', category: ToolCategory.GENERATORS, icon: 'TrendingUp' },
  { id: 'yt-hook-gen', name: 'YouTube Hook Forge', description: 'High-retention opener synthesis.', category: ToolCategory.GENERATORS, icon: 'Zap' },
  { id: 'yt-thumbnail-forge', name: 'AI Thumbnail Forge', description: 'Neural visual synthesis for YT.', category: ToolCategory.GENERATORS, icon: 'ImageIcon' },
  { id: 'insta-caption', name: 'Instagram Caption Forge', description: 'Neural social copy generator.', category: ToolCategory.GENERATORS, icon: 'MessageCircle' },
  { id: 'insta-grid', name: 'Grid Architect', description: 'Visual registry simulation.', category: ToolCategory.GENERATORS, icon: 'LayoutGrid' },
  { id: 'tweet-to-image', name: 'Tweet to Image', description: 'Visual narrative synthesis for X.', category: ToolCategory.GENERATORS, icon: 'Twitter' },
  { id: 'tweet-thread', name: 'Thread Master Scribe', description: 'Viral thread synthesis node.', category: ToolCategory.GENERATORS, icon: 'Share2' },
  { id: 'tiktok-voiceover', name: 'TikTok Script Synth', description: 'High-retention acoustic architect.', category: ToolCategory.GENERATORS, icon: 'Mic' },
  { id: 'tiktok-trend', name: 'Trend Oracle', description: 'Analyze viral signals with AI.', category: ToolCategory.GENERATORS, icon: 'Rocket' },
  { id: 'linkedin-post', name: 'LinkedIn Architect', description: 'Professional thought leadership forge.', category: ToolCategory.GENERATORS, icon: 'Linkedin' },
  { id: 'linkedin-bio', name: 'LinkedIn Bio Architect', description: 'Construct authority manuscripts.', category: ToolCategory.GENERATORS, icon: 'UserCircle' },
  { id: 'bio-gen', name: 'Identity Bio Architect', description: 'Short-form persona generator.', category: ToolCategory.GENERATORS, icon: 'UserCheck' },
  { id: 'hashtag-gen', name: 'Hashtag Forge', description: 'Extract viral semantic anchors.', category: ToolCategory.GENERATORS, icon: 'Hash' },
  { id: 'email-sig', name: 'Email Sig Architect', description: 'Institutional identity forge.', category: ToolCategory.GENERATORS, icon: 'PenLine' },

  // --- TECHNICAL & FINANCE (46-60) ---
  { id: 'json-converter', name: 'JSON to Excel', description: 'Structured data transformation.', category: ToolCategory.CONVERSION, icon: 'FileSpreadsheet' },
  { id: 'json-to-ts', name: 'JSON to TypeScript', description: 'Interface synthesis engine.', category: ToolCategory.CONVERSION, icon: 'Braces' },
  { id: 'json-yaml', name: 'JSON-YAML Shift', description: 'Data structure transmuter.', category: ToolCategory.CONVERSION, icon: 'RefreshCw' },
  { id: 'sql-formatter', name: 'SQL Beautifier', description: 'Advanced query logic node.', category: ToolCategory.CONVERSION, icon: 'DatabaseZap' },
  { id: 'sql-to-laravel', name: 'SQL to Laravel', description: 'Eloquent syntax synthesizer.', category: ToolCategory.CONVERSION, icon: 'Code' },
  { id: 'html-to-tailwind', name: 'HTML to Tailwind', description: 'UI refactor protocol.', category: ToolCategory.CONVERSION, icon: 'Layout' },
  { id: 'docker-gen', name: 'Docker Node Forge', description: 'Production environment architect.', category: ToolCategory.CONVERSION, icon: 'Container' },
  { id: 'regex-tester', name: 'RegEx Architect', description: 'Logical pattern validation node.', category: ToolCategory.KNOWLEDGE, icon: 'SearchCode' },
  { id: 'jwt-debugger', name: 'JWT Manuscript Debug', description: 'Cryptographic claim inspector.', category: ToolCategory.KNOWLEDGE, icon: 'Unlock' },
  { id: 'crypto-calc', name: 'Crypto P/L Auditor', description: 'Asset performance registry.', category: ToolCategory.FINANCE, icon: 'Bitcoin' },
  { id: 'inflation-calc', name: 'Inflation Oracle', description: 'Purchasing power erosion matrix.', category: ToolCategory.FINANCE, icon: 'TrendingUp' },
  { id: 'cap-rate', name: 'Cap Rate Oracle', description: 'Real estate equilibrium solver.', category: ToolCategory.FINANCE, icon: 'Building' },
  { id: 'gpa-calc', name: 'GPA Architect', description: 'Academic performance tracker.', category: ToolCategory.KNOWLEDGE, icon: 'GraduationCap' },
  { id: 'unit-calc', name: 'Sovereign Unit Transmuter', description: 'Universal metric registry.', category: ToolCategory.CONVERSION, icon: 'ArrowRightLeft' },
  { id: 'bmi-calc', name: 'BMI Analyzer', description: 'Bio-metric equilibrium scale.', category: ToolCategory.KNOWLEDGE, icon: 'Activity' }
];

export const CATEGORY_COLORS: Record<string, { bg: string, text: string, glow: string }> = {
  'Knowledge': { bg: 'bg-yellow-600', text: 'text-white', glow: 'shadow-yellow-600/50' },
  'Time': { bg: 'bg-cyan-700', text: 'text-white', glow: 'shadow-cyan-700/50' },
  'Finance': { bg: 'bg-emerald-800', text: 'text-white', glow: 'shadow-emerald-800/50' },
  'Conversion': { bg: 'bg-pink-700', text: 'text-white', glow: 'shadow-pink-700/50' },
  'Generators': { bg: 'bg-orange-800', text: 'text-white', glow: 'shadow-orange-800/50' },
  'Productivity': { bg: 'bg-blue-800', text: 'text-white', glow: 'shadow-blue-800/50' }
};
