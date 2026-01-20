
import React, { useEffect, useState } from 'react';
import { BookOpen, Clock, ArrowRight, Search, Loader2, History } from 'lucide-react';
import { getDailyChronicles } from '../services/geminiService';

const BlogPostCard: React.FC<{ post: any }> = ({ post }) => {
  const articleLink = `#/blog/${post.id}`;

  return (
    <article className="bg-[#fdf6e3] rounded-[2.5rem] overflow-hidden group flex flex-col h-full border border-[#e7d8c5] hover:border-[#b45309]/30 transition-all shadow-sm hover:shadow-xl">
      <div className="p-10 flex flex-col flex-grow space-y-6">
        <div className="flex items-center gap-4 text-[#b45309]/60 text-[10px] font-black uppercase tracking-widest">
          <div className="flex items-center gap-1"><Clock size={12}/> {post.date}</div>
          <span className="bg-[#b45309]/10 px-3 py-1 rounded-full text-[#b45309]">{post.category}</span>
        </div>
        <h2 className="text-2xl font-black leading-tight text-[#3c2f2f] group-hover:text-[#b45309] transition-colors italic uppercase">
          {post.title}
        </h2>
        <p className="text-[#7d6e6e] text-sm italic flex-grow leading-relaxed">
          {post.excerpt}
        </p>
        <a 
          href={articleLink} 
          className="inline-flex items-center gap-2 text-[#b45309] font-black text-xs uppercase tracking-widest hover:text-[#3c2f2f] transition-all group/link underline decoration-[#b45309]/20 underline-offset-4"
        >
          Read Full Manuscript <ArrowRight size={16} className="group-hover/link:translate-x-2 transition-transform" />
        </a>
      </div>
    </article>
  );
};

export const Blog: React.FC = () => {
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    getDailyChronicles().then(data => {
      setPosts(data);
      setLoading(false);
    });
  }, []);

  const filteredPosts = posts.filter(p => 
    p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="bg-[#f3ece0] min-h-screen text-[#3c2f2f] py-32 px-6">
      <div className="max-w-7xl mx-auto space-y-16">
        <div className="text-center space-y-6">
          <div className="inline-flex items-center gap-3 px-6 py-2 rounded-full bg-[#b45309]/10 border border-[#b45309]/30 text-[#b45309] text-[10px] font-black uppercase tracking-[0.5em] mb-4">
            <History size={16} /> Knowledge Repository
          </div>
          <h1 className="text-6xl md:text-8xl font-black uppercase tracking-tighter italic text-white drop-shadow-[0_4px_3px_rgba(60,47,47,0.8)]">
            The <span className="text-[#b45309]">Articles</span>
          </h1>
          <p className="text-xl text-[#7d6e6e] italic max-w-2xl mx-auto leading-relaxed">
            "Deep technical insights and logical foundations for every sovereign instrument in our vault."
          </p>
          
          <div className="relative max-w-xl mx-auto mt-12 group">
            <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-[#b7a896] group-focus-within:text-[#b45309]" size={18} />
            <input 
              type="text" 
              placeholder="Filter manuscripts..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-[#fdfaf3] border border-[#e7d8c5] rounded-2xl py-4 pl-14 pr-6 text-[#3c2f2f] focus:border-[#b45309] outline-none transition-all shadow-sm"
            />
          </div>
        </div>

        {loading ? (
          <div className="py-40 text-center space-y-6">
            <Loader2 className="animate-spin mx-auto text-[#b45309]" size={64} />
            <p className="text-[10px] font-black uppercase tracking-widest text-[#b45309]/60 animate-pulse">Synchronizing with Knowledge Nodes...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {filteredPosts.map((post) => (
              <BlogPostCard key={post.id} post={post} />
            ))}
          </div>
        )}

        <div className="w-full h-32 bg-white/40 rounded-[2.5rem] flex items-center justify-center border border-[#e7d8c5] text-[8px] text-[#b7a896] uppercase tracking-widest mt-20 italic">
          Google AdSense In-Feed Ad Node
        </div>
      </div>
    </div>
  );
};
