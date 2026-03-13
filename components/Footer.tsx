import Link from "next/link";

const Footer = () => {
  return (
    <footer className="bg-[#111] text-white py-12 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-10">
        {/* Brand Column */}
        <div className="space-y-4">
          <div className="flex flex-col leading-none">
            <span className="text-2xl font-bold text-[#FFB800] italic">lotus</span>
            <span className="text-[8px] tracking-[0.2em]">PHARMACEUTICAL</span>
          </div>
          <p className="text-gray-400 text-sm leading-relaxed">
            Advancing healthcare through innovation and global excellence.
          </p>
        </div>

        {/* Links Columns */}
        <div>
          <h4 className="font-bold mb-4 uppercase text-xs tracking-widest text-gray-500">Explore</h4>
          <ul className="space-y-2 text-sm text-gray-300">
            <li><Link href="/products" className="hover:text-white">Product Portfolio</Link></li>
            <li><Link href="/investors" className="hover:text-white">Investor Relations</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-bold mb-4 uppercase text-xs tracking-widest text-gray-500">Legal</h4>
          <ul className="space-y-2 text-sm text-gray-300">
            <li><Link href="#" className="hover:text-white">Privacy Policy</Link></li>
            <li><Link href="#" className="hover:text-white">Terms of Use</Link></li>
          </ul>
        </div>

        {/* Newsletter/Contact */}
        <div>
          <h4 className="font-bold mb-4 uppercase text-xs tracking-widest text-gray-500">Global Office</h4>
          <p className="text-sm text-gray-400">123 Pharma Way, Tech City<br/>Bangalore, India</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 mt-12 pt-8 border-t border-white/5 text-center text-xs text-gray-500">
        © {new Date().getFullYear()} Lotus Pharmaceutical. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;