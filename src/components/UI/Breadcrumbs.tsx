import { Link, useLocation } from "react-router-dom";
import { ChevronRight, Home } from "lucide-react";
import { cn } from "../../lib/utils";

export default function Breadcrumbs() {
  const location = useLocation();
  const pathnames = location.pathname.split("/").filter((x) => x);

  if (location.pathname === "/") return null;

  return (
    <div className="pt-24 pb-0 bg-[#F8F9FA]">
      <div className="container-custom">
        <nav className="flex" aria-label="Breadcrumb">
          <ol className="flex items-center space-x-2 text-[10px] font-bold uppercase tracking-[0.2em] bg-white px-6 py-3 rounded-full shadow-sm border border-steel-100">
            <li>
              <Link 
                to="/" 
                className="text-steel-400 hover:text-steel-950 transition-colors flex items-center gap-2"
              >
                <Home size={12} />
                <span>Home</span>
              </Link>
            </li>
            {pathnames.map((value, index) => {
              const last = index === pathnames.length - 1;
              const to = `/${pathnames.slice(0, index + 1).join("/")}`;

              return (
                <li key={to} className="flex items-center space-x-2">
                  <ChevronRight size={10} className="text-steel-200" />
                  {last ? (
                    <span className="text-steel-950">{value.replace(/-/g, ' ')}</span>
                  ) : (
                    <Link 
                      to={to} 
                      className="text-steel-400 hover:text-steel-950 transition-colors"
                    >
                      {value.replace(/-/g, ' ')}
                    </Link>
                  )}
                </li>
              );
            })}
          </ol>
        </nav>
      </div>
    </div>
  );
}
