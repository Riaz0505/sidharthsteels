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
          <ol className="flex items-center space-x-2 text-[8px] md:text-[10px] font-bold uppercase tracking-[0.2em] text-steel-400">
            <li>
              <Link 
                to="/" 
                className="hover:text-primary transition-colors flex items-center gap-1.5"
              >
                <Home size={14} />
                <span>Home</span>
              </Link>
            </li>
            {pathnames.map((value, index) => {
              const last = index === pathnames.length - 1;
              const to = `/${pathnames.slice(0, index + 1).join("/")}`;
              
              // Custom title mapping
              let displayTitle = value.replace(/-/g, ' ');
              if (value === 'services' && service) {
                // If it's the services part and we have a specific service, 
                // we might want to show "Services / Title"
              }

              return (
                <li key={to} className="flex items-center space-x-2">
                  <span className="text-steel-200">/</span>
                  {last && !service ? (
                    <span className="text-primary font-black uppercase truncate max-w-[120px] md:max-w-none">{displayTitle}</span>
                  ) : (
                    <Link 
                      to={to} 
                      className={cn(
                        "hover:text-primary transition-colors uppercase truncate max-w-[100px] md:max-w-none",
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
              <li className="flex items-center space-x-2">
                <span className="text-steel-200">/</span>
                <span className="text-primary font-black uppercase truncate max-w-[150px] md:max-w-none">
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
