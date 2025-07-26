import { Link, useLocation } from "wouter";
import { Twitter, Linkedin, Github } from "lucide-react";

export default function Footer() {
  const [location, setLocation] = useLocation();
  
  const categoryLinks = [
    { name: "Artificial Intelligence", href: "/?category=AI" },
    { name: "Startups", href: "/?category=Startups" },
    { name: "Hardware", href: "/?category=Hardware" },
    { name: "Security", href: "/?category=Security" },
  ];

  const companyLinks = [
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
    { name: "Privacy Policy", href: "/privacy" },
    { name: "Terms of Service", href: "/terms" },
  ];

  const handleLinkClick = (href: string) => {
    setLocation(href);
  };

  return (
    <footer className="bg-white border-t border-slate-200 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-2xl font-bold text-slate-800 mb-4">
              <span className="text-primary">Tech</span>Daily
            </h3>
            <p className="text-slate-600 mb-4 max-w-md">
              Your trusted source for the latest technology news, insights, and analysis. 
              Stay informed about the innovations shaping our digital future.
            </p>
            <div className="flex space-x-4">
              <a
                href="#"
                className="text-slate-400 hover:text-primary transition-colors"
                aria-label="Twitter"
              >
                <Twitter className="h-6 w-6" />
              </a>
              <a
                href="#"
                className="text-slate-400 hover:text-primary transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-6 w-6" />
              </a>
              <a
                href="#"
                className="text-slate-400 hover:text-primary transition-colors"
                aria-label="GitHub"
              >
                <Github className="h-6 w-6" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-slate-800 mb-4">Categories</h4>
            <ul className="space-y-2">
              {categoryLinks.map((link) => (
                <li key={link.name}>
                  <span 
                    onClick={() => handleLinkClick(link.href)}
                    className="text-slate-600 hover:text-primary transition-colors cursor-pointer"
                  >
                    {link.name}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-slate-800 mb-4">Company</h4>
            <ul className="space-y-2">
              {companyLinks.map((link) => (
                <li key={link.name}>
                  <span 
                    onClick={() => handleLinkClick(link.href)}
                    className="text-slate-600 hover:text-primary transition-colors cursor-pointer"
                  >
                    {link.name}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-200 mt-8 pt-8 text-center">
          <p className="text-slate-500">© 2025 TechDaily. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
