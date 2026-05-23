import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-[var(--bg-primary)] text-[var(--txt-dim)] border-t border-[var(--border)] py-16 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="bg-red-600 p-1 rounded-md">
                <img src="/removedbglogo.png" alt="Studia" className="h-5 w-5 brightness-0 invert" />
              </div>
              <h3 className="text-lg font-bold text-[var(--txt)]">Studia</h3>
            </div>
            <p className="text-sm leading-relaxed max-w-xs">
              The professional study platform for ambitious students. Join thousands of learners worldwide.
            </p>
          </div>

          {/* Product */}
          <div>
            <h4 className="font-bold mb-6 text-[var(--txt)] text-sm tracking-wider">PRODUCT</h4>
            <ul className="space-y-4">
              <li><a href="#" className="hover:text-red-500 transition-colors text-sm">Study Rooms</a></li>
              <li><a href="#" className="hover:text-red-500 transition-colors text-sm">Features</a></li>
              <li><a href="#" className="hover:text-red-500 transition-colors text-sm">Premium</a></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="font-bold mb-6 text-[var(--txt)] text-sm tracking-wider">SUPPORT</h4>
            <ul className="space-y-4">
              <li><a href="#" className="hover:text-red-500 transition-colors text-sm">Contact</a></li>
              <li><a href="#" className="hover:text-red-500 transition-colors text-sm">Community</a></li>
              <li><a href="#" className="hover:text-red-500 transition-colors text-sm">Privacy Policy</a></li>
            </ul>
          </div>

          {/* Report */}
          <div>
            <h4 className="font-bold mb-6 text-[var(--txt)] text-sm tracking-wider">LEGAL</h4>
            <ul className="space-y-4">
              <li><a href="#" className="hover:text-red-500 transition-colors text-sm">Terms of Use</a></li>
              <li><a href="#" className="hover:text-red-500 transition-colors text-sm">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-red-500 transition-colors text-sm">Cookie Policy</a></li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-[var(--border)] pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-medium">
          <p>© 2026 Studia, Inc. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-[var(--txt)] transition-colors">Twitter</a>
            <a href="#" className="hover:text-[var(--txt)] transition-colors">LinkedIn</a>
            <a href="#" className="hover:text-[var(--txt)] transition-colors">Instagram</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
