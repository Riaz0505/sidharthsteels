import { Link, useLocation, useSearchParams } from "react-router-dom";
import { ChevronRight, Home } from "lucide-react";
import { cn } from "../../lib/utils";
import { SERVICES } from "../../constants";

export default function Breadcrumbs() {
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const pathnames = location.pathname.split("/").filter((x) => x);

  if (location.pathname === "/") return null;

  // Resolve service title if we are on the services page
  const serviceId = searchParams.get('id');
  const service = serviceId ? SERVICES.find(s => s.id === serviceId) : null;

  return (
    <div id="breadcrumbs-container" className="pt-4 pb-2 bg-[#F8F9FA]/50">
      <div className="container-custom">
        <nav className="flex" aria-label="Breadcrumb">
          <ol className="flex items-center flex-wrap gap-y-2 text-[10px] md:text-[11px] font-bold uppercase tracking-[0.2em] text-steel-400">
            <li>
              <Link 
                to="/" 
                className="hover:text-primary transition-colors flex items-center gap-1.5"
              >
                <Home size={14} />
                <span className="hidden xs:inline">Home</span>
              </Link>
            </li>
            {pathnames.map((value, index) => {
              const last = index === pathnames.length - 1;
              const to = `/${pathnames.slice(0, index + 1).join("/")}`;
              
              // Custom title mapping
              let displayTitle = value.replace(/-/g, ' ');

              return (
                <li key={to} className="flex items-center">
                  <ChevronRight size={12} className="mx-2 text-steel-200" />
                  {last && !service ? (
                    <span className="text-primary font-black uppercase">
                      {displayTitle}
                    </span>
                  ) : (
                    <Link 
                      to={to} 
                      className={cn(
                        "hover:text-primary transition-colors uppercase",
                        last && service ? "text-steel-400" : ""
                      )}
                    >
                      {displayTitle}
                    </Link>
                  )}
                </li>
              );
            })}
            
            {/* Additional segment for specific service */}
            {location.pathname === '/services' && service && (
              <li className="flex items-center">
                <ChevronRight size={12} className="mx-2 text-steel-200" />
                <span className="text-primary font-black uppercase">
                  {service.title}
                </span>
              </li>
            )}
          </ol>
        </nav>
      </div>
    </div>
  );
}
