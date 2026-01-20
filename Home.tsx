
import React, { useState, useMemo } from 'react';
import { TOOLS } from '../constants';
import { ToolModal } from '../components/ToolModal';
import { ToolCategory } from '../types';
import { Search, ChevronRight, Zap, Layout as LayoutIcon, Sparkles } from 'lucide-react';
import * as LucideIcons from 'lucide-react';
import { useLanguage } from '../components/LanguageContext';

// استيراد المكونات البرمجية للأدوات
import { WordCounter } from '../components/tools/WordCounter';
import { WordCounterPerPage } from '../components/tools/WordCounterPerPage';
import { BMICalculator } from '../components/tools/BMICalculator';
import { QRGenerator } from '../components/tools/QRGenerator';
import { PasswordGenerator } from '../components/tools/PasswordGenerator';
import { UnitConverter } from '../components/tools/UnitConverter';
import { AIHumanizer } from '../components/tools/AIHumanizer';
import { GrammarFixer } from '../components/tools/GrammarFixer';
import { CaseConverter } from '../components/tools/CaseConverter';
import { TextCleaner } from '../components/tools/TextCleaner';
import { NumberExtractor } from '../components/tools/NumberExtractor';
import { EmailExtractor } from '../components/tools/EmailExtractor';
import { DomainExtractor } from '../components/tools/DomainExtractor';
import { KeywordDensityChecker } from '../components/tools/KeywordDensityChecker';
import { CVMaker } from '../components/tools/CVMaker';
import { LessonPlanGen } from '../components/tools/LessonPlanGen';
import { ExamPlanner } from '../components/tools/ExamPlanner';
import { FakeAddressGenerator } from '../components/tools/FakeAddressGenerator';
import { DimensionForge } from '../components/tools/DimensionForge';
import { AIBackgroundRemover } from '../components/tools/AIBackgroundRemover';
import { AIPhotoEnhancer } from '../components/tools/AIPhotoEnhancer';
import { BackgroundShifter } from '../components/tools/BackgroundShifter';
import { BackgroundArchitect } from '../components/tools/BackgroundArchitect';
import { HairColorArchitect } from '../components/tools/HairColorArchitect';
import { GroomingSimulator } from '../components/tools/GroomingSimulator';
import { ImageStoryteller } from '../components/tools/ImageStoryteller';
import { CollageMaker } from '../components/tools/CollageMaker';
import { SocialResizer } from '../components/tools/SocialResizer';
import { ColorPickerFromImage } from '../components/tools/ColorPickerFromImage';
import { ColorGenerator } from '../components/tools/ColorGenerator';
import { FaviconGenerator } from '../components/tools/FaviconGenerator';
import { WebPToPNG } from '../components/tools/WebPToPNG';
import { YouTubeScriptGen } from '../components/tools/YouTubeScriptGen';
import { YouTubeTagExtractor } from '../components/tools/YouTubeTagExtractor';
import { AIHookGenerator } from '../components/tools/AIHookGenerator';
import { AIThumbnailForge } from '../components/tools/AIThumbnailForge';
import { InstagramCaptionGen } from '../components/tools/InstagramCaptionGen';
import { InstaGridPlanner } from '../components/tools/InstaGridPlanner';
import { TweetToImageConverter } from '../components/tools/TweetToImageConverter';
import { TweetThreadGen } from '../components/tools/TweetThreadGen';
import { TikTokVoiceoverGen } from '../components/tools/TikTokVoiceoverGen';
import { AITikTokTrendOracle } from '../components/tools/AITikTokTrendOracle';
import { LinkedInPostArchitect } from '../components/tools/LinkedInPostArchitect';
import { AILinkedInBioArchitect } from '../components/tools/AILinkedInBioArchitect';
import { BioGenerator } from '../components/tools/BioGenerator';
import { HashtagGenerator } from '../components/tools/HashtagGenerator';
import { EmailSignatureGenerator } from '../components/tools/EmailSignatureGenerator';
import { JSONConverter } from '../components/tools/JSONConverter';
import { JSONToTypeScript } from '../components/tools/JSONToTypeScript';
import { JSONYamlTransmuter } from '../components/tools/JSONYamlTransmuter';
import { SQLFormatter } from '../components/tools/SQLFormatter';
import { SQLToLaravel } from '../components/tools/SQLToLaravel';
import { HTMLToTailwind } from '../components/tools/HTMLToTailwind';
import { DockerNodeGen } from '../components/tools/DockerNodeGen';
import { RegexTester } from '../components/tools/RegexTester';
import { JWTDebugger } from '../components/tools/JWTDebugger';
import { CryptoPLCalc } from '../components/tools/CryptoPLCalc';
import { PersonalInflationCalculator } from '../components/tools/PersonalInflationCalculator';
import { CapRateCalculator } from '../components/tools/CapRateCalculator';
import { GPACalculator } from '../components/tools/GPACalculator';
import { OnlineNotepad } from '../components/tools/OnlineNotepad';

export const renderToolLogic = (id: string) => {
  switch (id) {
    case 'word-counter': return <WordCounter />;
    case 'word-counter-per-page': return <WordCounterPerPage />;
    case 'bmi-calc': return <BMICalculator />;
    case 'qr-gen': return <QRGenerator />;
    case 'pwd-gen': return <PasswordGenerator />;
    case 'unit-calc': return <UnitConverter />;
    case 'ai-humanizer': return <AIHumanizer />;
    case 'grammar-fixer': return <GrammarFixer />;
    case 'case-converter': return <CaseConverter />;
    case 'text-cleaner': return <TextCleaner />;
    case 'number-extractor': return <NumberExtractor />;
    case 'email-extractor': return <EmailExtractor />;
    case 'domain-extractor': return <DomainExtractor />;
    case 'keyword-density': return <KeywordDensityChecker />;
    case 'cv-maker': return <CVMaker />;
    case 'lesson-plan': return <LessonPlanGen />;
    case 'exam-planner': return <ExamPlanner />;
    case 'fake-address': return <FakeAddressGenerator />;
    case 'dimension-forge': return <DimensionForge />;
    case 'bg-remover': return <AIBackgroundRemover />;
    case 'photo-enhancer': return <AIPhotoEnhancer />;
    case 'bg-shifter': return <BackgroundShifter />;
    case 'bg-architect': return <BackgroundArchitect />;
    case 'hair-architect': return <HairColorArchitect />;
    case 'grooming-sim': return <GroomingSimulator />;
    case 'image-storyteller': return <ImageStoryteller />;
    case 'collage-maker': return <CollageMaker />;
    case 'social-resizer': return <SocialResizer />;
    case 'color-picker': return <ColorPickerFromImage />;
    case 'color-gen': return <ColorGenerator />;
    case 'favicon-gen': return <FaviconGenerator />;
    case 'webp-to-png': return <WebPToPNG />;
    case 'yt-script-gen': return <YouTubeScriptGen />;
    case 'yt-tag-extractor': return <YouTubeTagExtractor />;
    case 'yt-hook-gen': return <AIHookGenerator />;
    case 'yt-thumbnail-forge': return <AIThumbnailForge />;
    case 'insta-caption': return <InstagramCaptionGen />;
    case 'insta-grid': return <InstaGridPlanner />;
    case 'tweet-to-image': return <TweetToImageConverter />;
    case 'tweet-thread': return <TweetThreadGen />;
    case 'tiktok-voiceover': return <TikTokVoiceoverGen />;
    case 'tiktok-trend': return <AITikTokTrendOracle />;
    case 'linkedin-post': return <LinkedInPostArchitect />;
    case 'linkedin-bio': return <AILinkedInBioArchitect />;
    case 'bio-gen': return <BioGenerator />;
    case 'hashtag-gen': return <HashtagGenerator />;
    case 'email-sig': return <EmailSignatureGenerator />;
    case 'json-converter': return <JSONConverter />;
    case 'json-to-ts': return <JSONToTypeScript />;
    case 'json-yaml': return <JSONYamlTransmuter />;
    case 'sql-formatter': return <SQLFormatter />;
    case 'sql-to-laravel': return <SQLToLaravel />;
    case 'html-to-tailwind': return <HTMLToTailwind />;
    case 'docker-gen': return <DockerNodeGen />;
    case 'regex-tester': return <RegexTester />;
    case 'jwt-debugger': return <JWTDebugger />;
    case 'crypto-calc': return <CryptoPLCalc />;
    case 'inflation-calc': return <PersonalInflationCalculator />;
    case 'cap-rate': return <CapRateCalculator />;
    case 'gpa-calc': return <GPACalculator />;
    case 'notepad': return <OnlineNotepad />;
    default: return <div className="p-8 text-center text-[#7d6e6e] italic">This digital node is under calibration.</div>;
  }
};

const AdPlaceholder = ({ type }: { type: 'grid' | 'wide' } & React.Attributes) => (
  <div className={`p-8 rounded-2xl bg-[#fdfaf3] border-2 border-dashed border-[#e7d8c5] flex flex-col items-center justify-center text-center space-y-4 ${type === 'wide' ? 'col-span-full h-32 md:h-40 my-6 shadow-sm' : 'h-full min-h-[300px]'}`}>
    <div className="flex items-center gap-3 text-[#b7a896] opacity-30">
      <LayoutIcon size={type === 'wide' ? 40 : 32} />
      <Sparkles size={type === 'wide' ? 24 : 16} />
    </div>
    <div className="space-y-1">
      <p className="text-[10px] font-black uppercase tracking-[0.4em] text-[#b7a896] italic">
        {type === 'wide' ? 'Horizontal Archive Display Ad' : 'In-Feed Registry Display Ad'}
      </p>
      <p className="text-[8px] font-bold text-[#b7a896]/50 uppercase tracking-widest">
        Responsive Ad Placement Node MMXXV
      </p>
    </div>
  </div>
);

export const Home: React.FC = () => {
  const { t } = useLanguage();
  const [selectedToolId, setSelectedToolId] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState<string>('All');
  
  const categories = useMemo(() => {
    return ['All', ...Object.values(ToolCategory).filter(cat => cat !== ToolCategory.TIME)];
  }, []);
  
  const filteredTools = useMemo(() => {
    return TOOLS.filter(tool => {
      const toolInfo = t.tools?.[tool.id] || { name: tool.name, desc: tool.description };
      const name = (toolInfo.name || tool.name).toLowerCase();
      const desc = (toolInfo.desc || tool.description).toLowerCase();
      const matchesSearch = name.includes(searchTerm.toLowerCase()) || desc.includes(searchTerm.toLowerCase());
      const matchesCategory = activeCategory === 'All' || tool.category === activeCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchTerm, activeCategory, t.tools]);

  const selectedTool = TOOLS.find(t => t.id === selectedToolId);

  return (
    <div className="min-h-screen bg-[#f3ece0]">
      {/* Hero Section */}
      <section className="pt-24 pb-16 px-6 bg-[#fdf6e3] border-b border-[#e7d8c5]">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-[#b45309]/10 text-[#b45309] text-xs font-bold uppercase tracking-wide border border-[#b45309]/20">
             {t.heroTag}
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold text-[#3c2f2f] tracking-tight leading-[1.1] italic">
            {t.heroTitle}
          </h1>
          <p className="text-[#7d6e6e] text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
            {t.heroSub}
          </p>
          
          <div className="relative max-w-2xl mx-auto mt-12 group">
            <LucideIcons.Search className="absolute left-6 top-1/2 -translate-y-1/2 text-[#b7a896] group-focus-within:text-[#b45309] transition-colors" size={22} />
            <input 
              type="text" 
              placeholder={t.searchPlaceholder}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-[#fdfaf3] border border-[#e7d8c5] rounded-2xl py-5 pl-16 pr-6 text-[#3c2f2f] text-lg focus:bg-white focus:ring-4 focus:ring-[#b45309]/5 focus:border-[#b45309] outline-none transition-all shadow-sm"
            />
          </div>
        </div>
      </section>

      {/* Filter Bar */}
      <div className="sticky top-16 md:top-20 z-40 bg-[#fdf6e3]/90 backdrop-blur-md border-b border-[#e7d8c5]">
        <div className="max-w-7xl mx-auto px-6 py-4 flex gap-4 overflow-x-auto no-scrollbar scroll-smooth">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-5 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest whitespace-nowrap transition-all border ${
                activeCategory === cat ? 'bg-[#3c2f2f] text-[#fdf6e3] border-[#3c2f2f] shadow-lg' : 'bg-[#fdfaf3] text-[#7d6e6e] border-[#e7d8c5] hover:border-[#b7a896] hover:text-[#3c2f2f]'
              }`}
            >
              {t.categories?.[cat] || cat}
            </button>
          ))}
        </div>
      </div>

      {/* Tools Grid with Interstitial Ads */}
      <main className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredTools.map((tool, index) => {
            const info = t.tools?.[tool.id] || { name: tool.name, desc: tool.description };
            const Icon = (LucideIcons as any)[tool.icon] || Zap;
            
            const results = [];

            // Ad Slot: Wide after index 4
            if (index === 4 && !searchTerm) {
              results.push(<AdPlaceholder key="ad-wide-main" type="wide" />);
            }

            // Ad Slot: Grid item after index 8
            if (index === 8 && !searchTerm) {
              results.push(<AdPlaceholder key="ad-grid-mid" type="grid" />);
            }

            results.push(
              <button 
                key={tool.id}
                onClick={() => setSelectedToolId(tool.id)}
                className="tool-card group p-8 rounded-[2rem] text-left shadow-sm flex flex-col h-full hover:shadow-xl transition-all border border-[#e7d8c5]"
              >
                <div className="w-12 h-12 rounded-xl bg-[#b45309]/10 flex items-center justify-center text-[#b45309] mb-6 group-hover:bg-[#b45309] group-hover:text-white transition-all shadow-sm">
                  <Icon size={24} />
                </div>
                <h3 className="text-xl font-black text-[#3c2f2f] mb-3 tracking-tight group-hover:text-[#b45309] transition-colors italic">{info.name}</h3>
                <p className="text-sm text-[#7d6e6e] line-clamp-2 leading-relaxed flex-grow italic">"{info.desc}"</p>
                <div className="mt-8 flex items-center gap-1 text-[10px] font-black text-[#b45309] uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-all translate-x-[-10px] group-hover:translate-x-0">
                  {t.common?.deploy} <ChevronRight size={14} />
                </div>
              </button>
            );

            return results;
          })}
        </div>
        
        {filteredTools.length === 0 && (
          <div className="text-center py-32 bg-[#fdfaf3] rounded-[3rem] border-4 border-dashed border-[#e7d8c5]">
             <LucideIcons.Search size={64} className="mx-auto text-[#e7d8c5] mb-6" />
             <p className="text-[#7d6e6e] font-black uppercase tracking-[0.4em] italic">No instruments match your search coordinates</p>
          </div>
        )}
      </main>

      {selectedTool && (
        <ToolModal 
          isOpen={!!selectedToolId} 
          onClose={() => setSelectedToolId(null)} 
          title={t.tools?.[selectedTool.id]?.name || selectedTool.name} 
          toolId={selectedTool.id}
        >
          {/* Ad inside Modal */}
          <div className="mb-10 w-full h-20 bg-black/[0.02] border border-dashed border-[#e7d8c5] rounded-2xl flex items-center justify-center">
             <span className="text-[8px] font-black uppercase tracking-[0.6em] text-[#b7a896] text-center px-4">Institutional Registry Display Node (In-Modal)</span>
          </div>
          
          {renderToolLogic(selectedTool.id)}
        </ToolModal>
      )}
    </div>
  );
};
