
import { TOOLS } from "../constants";

export interface ArchivalRecord {
  title: string;
  content: string;
  imageUrl: string | null;
  type: 'MASTER' | 'PRO' | 'DRAFT';
  timestamp: number;
}

const getDetailedManuscript = (toolId: string) => {
  const tool = TOOLS.find(t => t.id === toolId);
  const name = tool ? tool.name : 'Digital Utility';

  return {
    title: `${name}: Comprehensive Guide`,
    content: `
      <h2>The Utility of ${name}</h2>
      <p>The <strong>${name}</strong> serves as a critical node in our sovereign vault, designed specifically to address the complex needs of modern creators and developers.</p>
      <h3>Strategic Applications</h3>
      <p>Utilizing this tool allows professionals to maintain a seamless creative rhythm. Whether you are conducting a deep lexical audit or calibrating visual assets, the underlying logic is tuned to global computational benchmarks.</p>
      <ul>
        <li>Precision Verified Logic</li>
        <li>Privacy-First Sandbox Protocol</li>
        <li>Aesthetic Rigor in Design</li>
      </ul>
      <p>Engagement with this module ensures the pinnacle of web-based precision for your professional archives.</p>
    `
  };
};

export const getArchivedContent = async (toolId: string): Promise<ArchivalRecord | null> => {
  const manuscript = getDetailedManuscript(toolId);
  return {
    title: manuscript.title,
    content: manuscript.content,
    imageUrl: null,
    type: 'MASTER',
    timestamp: Date.now()
  };
};

// Fix: Added missing exported member 'getDailyChronicles'
export const getDailyChronicles = async () => {
  return TOOLS.slice(0, 6).map(tool => ({
    id: tool.id,
    title: `${tool.name} Optimization Protocol`,
    excerpt: `Deep dive into the mathematical foundation and professional application of the ${tool.name} node.`,
    content: `<h2>Executive Summary</h2><p>The ${tool.name} represents a milestone in digital precision.</p>`,
    date: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
    category: tool.category,
    author: "Scribe Alpha"
  }));
};

// Fix: Added missing exported member 'getDetailedArticle'
export const getDetailedArticle = async (id: string) => {
  const tool = TOOLS.find(t => t.id === id) || TOOLS[0];
  return {
    id: tool.id,
    title: `${tool.name}: Technical Deep Dive`,
    content: `
      <h2>The Genesis of ${tool.name}</h2>
      <p>Our archival records indicate that ${tool.name} was synthesized to bridge the gap between raw computational power and professional usability.</p>
      <h3>Algorithmic Standards</h3>
      <p>Every node follows strict adherence to the Sovereign Registry standards of MMXXV.</p>
    `,
    date: "January 2025"
  };
};

export const getCycleMetadata = () => ({ cycleString: "Sovereign Registry MMXXV" });
