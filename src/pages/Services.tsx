import { useEffect } from "react";
import { SERVICES } from "../constants";
import { CheckCircle2, ArrowRight, ShieldCheck, Tag, Layers, HelpCircle, ArrowLeft } from "lucide-react";
import { Link, useSearchParams } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";

// Professional subcategories mapping for Sidharth Steels
const SUBCATEGORIES_DATA: Record<string, { title: string; desc: string; specs: string }[]> = {
  "sheets-coils": [
    { title: "Stainless Steel Sheets", desc: "Premium flat-rolled sheets available in Cold-Rolled (2B, BA, No.4, HL, Mirror) and Hot-Rolled (No.1) finishes with strong surface protection.", specs: "Thickness: 0.3mm to 10mm | Formats: 1000x2000, 1219x2438, 1500x3000, Custom length" },
    { title: "Stainless Steel Coils", desc: "High-integrity coils sourced from lead global mills, providing uniform gauge and perfect mechanical properties for custom rolling or stamping.", specs: "Width: 1000mm, 1219mm, 1500mm | Grade variants: 304L, 316L, 430" },
    { title: "Stainless Steel Shim Sheets", desc: "Ultra-thin precision gauges for chemical vessels, high-tolerance tooling setups, valve alignments, and critical industrial spacers.", specs: "Thickness: 0.05mm to 1.5mm | Grade selection: 304, 316" },
    { title: "Perforated & Chequered Sheets", desc: "Slip-resistant floor plates, decorative screens, and acoustic filters with various perforation patterns (round, square, slotted).", specs: "Thickness: 1.0mm to 8.0mm | Tear-drop, diamond patterns" }
  ],
  "plates": [
    { title: "Hot Rolled Heavy Plates", desc: "Structural grade thick plates for heavy structural engineering, boilers, chemical reaction columns, and pressure vessel fabrication.", specs: "Thickness: 3.0mm to 100mm | Standards: ASTM A240 / SA240" },
    { title: "Cold Rolled Fine Plates", desc: "Polished plates with flat tolerances and accurate dimensions, utilized in food processing systems and high-vacuum chambers.", specs: "Surface finish: 2B | Thickness: 3.0mm to 6.0mm" },
    { title: "Quenched & High-Tensile Plates", desc: "Wear-resistant high-carbon steel plates designed to survive extremely abrasive environments, shredders, or chemical silos.", specs: "Grades: 310S (High Heat), 904L (Severe Acids), Duplex 2205" },
    { title: "Custom Profiling & Shear Plates", desc: "Plates custom cut to exact drawings and tolerances using state-of-the-art Bandsaw, waterjet, or plasma tooling machines.", specs: "Precision cuts, circle shearing, edge preparation available" }
  ],
  "pipes-tubes": [
    { title: "Seamless Technical Pipes", desc: "Hot-extruded heavy-duty conduits with no seam line, critical for high-pressure boilers, refineries, gas transmission, and chemicals.", specs: "Sizes: 1/4\" NB to 16\" NB | Schedule: SCH 10S to SCH 160S" },
    { title: "Welded & ERW Pipes", desc: "Cost-friendly standard piping networks with robust weld-integrity, suitable for water treatment, drainage, and utility supply lines.", specs: "Standards: ASTM A312, ASME SA312 | Sizes up to 24\" NB" },
    { title: "Hollow Structural Sections (HSS)", desc: "Square and rectangular tubes with heavy wall thicknesses, ideal for modern architectural trusses, equipment mainframes, and handrails.", specs: "Formats: Square, Rectangular | Finishes: Satin, Hairline, Mill" },
    { title: "Instrumentation Tubes", desc: "Satin-finished micro-gauge tubing engineered to ensure sterile flow lines inside pharma, dairy processing, and automation circuits.", specs: "Outer Diameter: 1/4\" to 1\" | Wall thickness: 0.035\" to 0.083\"" }
  ],
  "bars-rods": [
    { title: "Bright Round Bars", desc: "Premium cold-drawn and centerless ground rods with precise, straight tolerances, perfect for automatic lathe feeding and drive shafts.", specs: "Diameter: 3.0mm to 150mm | Tolerance: h9, h11" },
    { title: "Hexagonal & Square Bars", desc: "Sturdy geometric profiles designed for high-strength industrial bolts, nuts, threaded studs, valve stems, and custom machining elements.", specs: "Grades: 303 (Free Machining), 304L, 316L, 410" },
    { title: "Pickled Flat Bars", desc: "Slit-rolled or hot-rolled flat bars with pickled finishes, utilized in supporting framework brackets, steps, scales, and machinery parts.", specs: "Width: 12mm to 150mm | Thickness: 3mm to 20mm" },
    { title: "Angle & Channel Bars", desc: "L-shaped angle bars and C-Channels with exceptional load distribution capacity for crane runways, foundations, and reinforcing.", specs: "Sizes: 20x20mm to 100x100mm | Thickness: 3.0mm to 10.0mm" }
  ],
  "fittings": [
    { title: "Buttweld Pipe Fittings", desc: "ASME B16.9 standard elbows, tees, reducers, and stub-ends, carefully processed for flawless pipe welding and continuous flow lines.", specs: "Grades: WP304/L, WP316/L | Schedules matching pipes" },
    { title: "Forged Flanges", desc: "Slip-On, Weld-Neck, Blind, and Socket-Weld flanges engineered for secure bolt-tight locking interfaces on industrial pressure vessels.", specs: "Class: 150#, 300#, 600#, 1500# | Standards: ANSI B16.5" },
    { title: "Threaded Socket Fittings", desc: "Forged high-pressure elbows, couplings, nipples, unions, and caps with accurate NPT or BSP screw threads for utility piping.", specs: "Rating: 3000 LBS, 6000 LBS | Standard: ASME B16.11" },
    { title: "Sanitary Tri-Clover Fittings", desc: "Specially mirror-polished and hygienic fittings with silicone/EPDM seals, ideal for food-processing, pharma, and dairy systems.", specs: "Finish: Inside polished Ra < 0.4µm | Clean-in-place (CIP)" }
  ]
};
export default function Services() {
  const [searchParams, setSearchParams] = useSearchParams();
  const serviceId = searchParams.get("id") || "sheets-coils";

  useEffect(() => {
    // Set dynamic SEO tags for the Catalog page (PDF Page 5/6)
    if (serviceId) {
      const active = SERVICES.find(s => s.id === serviceId);
      document.title = active ? `${active.title} Specifications | Sidharth Steels` : "Our Stainless Steel Inventory | Sidharth Steels";
    } else {
      document.title = "Our Stainless Steel Inventory & Specifications | Sidharth Steels";
    }

    const metaDesc = document.querySelector('meta[name="description"]');
    const contentText = "Browse Sidharth Steels' full catalog of certified stainless steel sheets, coils, plates, pipes, bars & fittings. Direct mill pricing and MTC reports supplied.";
    if (metaDesc) {
      metaDesc.setAttribute("content", contentText);
    } else {
      const meta = document.createElement("meta");
      meta.name = "description";
      meta.content = contentText;
      document.head.appendChild(meta);
    }
  }, [serviceId]);

  // Handle scrolling to top when view shifts (e.g., clicking on other material buttons)
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [serviceId]);

  // If a specific service id is selected, find the active service
  const activeService = serviceId ? SERVICES.find((s) => s.id === serviceId) : null;
  const activeSubcategories = activeService ? SUBCATEGORIES_DATA[activeService.id] || [] : [];

  if (activeService) {
    // Render individual dedicated service detail page
    const otherServices = SERVICES.filter(s => s.id !== activeService.id);

    return (
      <div id="services-page-root" className="min-h-screen bg-[#FDFDFD] font-sans pb-16">
        {/* Title Header Section */}
        <header id="service-header" className="pt-6 pb-2 px-4 bg-white border-b border-steel-100">
          <div className="container-custom">
            <span className="text-primary font-bold tracking-[0.25em] uppercase text-[10px] md:text-xs mb-1.5 block">
              MATERIAL DIVISION
            </span>
            <h1 id="service-title" className="font-display text-2xl sm:text-3.5xl md:text-4xl font-extrabold text-steel-950 tracking-tight uppercase leading-tight">
              {activeService.title}
            </h1>
            {activeService.subtitle && (
              <p className="text-steel-400 font-semibold text-xs md:text-sm tracking-[0.10em] uppercase mt-2">
                {activeService.subtitle}
              </p>
            )}
          </div>
        </header>

        {/* Single Dedicated Content View */}
        <div className="py-5 md:py-8 px-4">
          <div className="container-custom">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
              
              {/* Left Column: Product Info & Subcategories & FAQs */}
              <div className="lg:col-span-7 space-y-6">
                <p className="text-steel-600 text-sm md:text-base leading-relaxed font-semibold">
                  {activeService.description}
                </p>

                {/* Subcategories Breakdown - Placed inside individual page */}
                {activeSubcategories.length > 0 && (
                  <div className="space-y-4 pt-5 border-t border-steel-100">
                    <div className="flex items-center gap-2 mb-2">
                      <Layers className="text-primary" size={18} />
                      <h3 className="font-display text-xs md:text-sm font-black text-steel-950 uppercase tracking-wider">
                        Available Classifications & formats:
                      </h3>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                      {activeSubcategories.map((sub, sIdx) => (
                        <div
                          key={sIdx}
                          className="p-4 bg-white rounded-2xl border border-steel-200/50 shadow-sm hover:shadow-md transition-all group relative overflow-hidden flex flex-col justify-between"
                        >
                          <div className="absolute top-0 left-0 w-1 bg-primary h-full opacity-60 group-hover:opacity-100 transition-opacity" />
                          <div>
                            <h4 className="font-display text-xs md:text-sm font-black text-steel-950 uppercase mb-2 group-hover:text-primary transition-colors flex items-center gap-2">
                              <CheckCircle2 size={13} className="text-primary" />
                              {sub.title}
                            </h4>
                            <p className="text-steel-500 text-[11px] md:text-xs leading-relaxed font-semibold mb-3 leading-normal">
                              {sub.desc}
                            </p>
                          </div>
                          <div className="bg-steel-50/70 px-3 py-2 rounded-xl flex items-center gap-1.5 border border-steel-100/50 mt-auto">
                            <Tag size={11} className="text-steel-400 shrink-0" />
                            <span className="text-steel-700 font-mono text-[9px] md:text-[10px] font-bold tracking-tight">
                              {sub.specs}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* FAQs Panel */}
                {activeService.faqs && activeService.faqs.length > 0 && (
                  <div className="pt-6 border-t border-steel-100 space-y-4">
                    <div className="flex items-center gap-2">
                      <HelpCircle className="text-primary" size={18} />
                      <h3 className="font-display text-xs md:text-sm font-black text-steel-950 uppercase tracking-wider">
                        Common FAQs for {activeService.title.replace("Stainless Steel ", "")}
                      </h3>
                    </div>
                    <div className="space-y-3.5">
                      {activeService.faqs.map((faq, fIdx) => (
                        <div key={fIdx} className="bg-steel-50/60 rounded-2xl p-4 border border-steel-200/30">
                          <h4 className="text-[12px] md:text-xs font-black text-steel-950 uppercase tracking-wide flex items-start gap-2">
                            <span className="text-primary text-[10px] font-bold">Q:</span>
                            {faq.question}
                          </h4>
                          <p className="text-steel-600 text-xs font-normal leading-relaxed mt-1.5 pl-4 border-l border-primary/25">
                            {faq.answer}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Right Column: Specification Table, Image & Custom CTAs */}
              <div className="lg:col-span-5 space-y-5">
                {/* Compact Product Image */}
                <div className="relative rounded-[24px] overflow-hidden border border-steel-200/50 shadow-md h-[180px] md:h-[240px] bg-steel-100">
                  <img
                    src={activeService.image}
                    alt={activeService.title}
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute bottom-3 left-3 bg-steel-950/95 text-white border border-white/10 text-[9px] font-black uppercase tracking-widest px-2.5 py-1 rounded">
                    MTC Cert Traceable
                  </div>
                </div>

                {/* Clean Technical Specification table */}
                <div className="bg-white border border-steel-200/60 rounded-[20px] overflow-hidden shadow-sm">
                  <div className="bg-steel-50 px-4 py-3.5 border-b border-steel-200/50 flex items-center justify-between">
                    <h4 className="font-display text-xs font-black text-steel-950 uppercase tracking-wider flex items-center gap-2">
                      <ShieldCheck size={16} className="text-primary" />
                      Technical Specifications
                    </h4>
                    <span className="text-[9px] font-mono font-bold text-green-600 uppercase">MTC Verified</span>
                  </div>
                  <table className="w-full border-collapse text-left text-xs">
                    <tbody className="divide-y divide-steel-100 text-steel-700">
                      {Object.entries(activeService.technical).map(([key, value]) => {
                        const label = key === 'grades' ? 'Primary Grades' :
                                      key === 'thickness' ? 'Thickness' :
                                      key === 'finish' ? 'Surface Finishes' :
                                      key === 'standards' ? 'Applicable Standards' :
                                      key === 'usage' ? 'Common Usage' :
                                      key === 'width' ? 'Width Formats' :
                                      key === 'processing' ? 'Processing Options' :
                                      key === 'types' ? 'Form Types' :
                                      key === 'size' ? 'Available Sizes' :
                                      key === 'schedule' ? 'Wall Schedules' :
                                      key === 'forms' ? 'Cross Sections' :
                                      key === 'shape' ? 'Standard Profiles' :
                                      key === 'items' ? 'Fittings Catalog' :
                                      key === 'connection' ? 'Joint Selection' : key;
                        
                        return (
                          <tr key={key} className="hover:bg-steel-50/20 transition-colors">
                            <td className="px-4 py-3 font-bold uppercase tracking-wider text-steel-500 w-2/5 text-[10px]">
                              {label}
                            </td>
                            <td className="px-4 py-3 font-mono text-[11px] font-semibold leading-normal text-steel-950 whitespace-pre-wrap">
                              {Array.isArray(value) ? value.join(", ") : value}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>

                {/* Call-to-action enquiry box */}
                <div className="bg-steel-950 text-white rounded-[24px] p-6 border border-steel-800 shadow-lg relative overflow-hidden">
                  <div className="relative z-10 space-y-3.5">
                    <h4 className="font-display text-xs md:text-sm font-black text-primary uppercase tracking-wider">
                      Request Sizing & Pricing Quotes
                    </h4>
                    <p className="text-steel-300 text-[11px] md:text-xs font-bold leading-relaxed">
                      Sidharth Steels guarantees immediate mill-direct commercial pricing with trace verified standards for all custom profiles.
                    </p>
                    <Link
                      to="/contact"
                      className="w-full py-3 bg-primary hover:bg-primary/90 text-white font-black rounded-xl items-center justify-center gap-2 transition-all uppercase tracking-widest text-[11px] flex shadow-md shadow-primary/20 cursor-pointer"
                    >
                      Enquire for Pricing <ArrowRight size={13} />
                    </Link>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    );
  }

  // Else, render the premium Material catalog Landing Hub (grid of 5 categories)
  return (
    <div id="services-page-root" className="min-h-screen bg-[#FDFDFD] font-sans pb-16">
      {/* Premium Hero Title Header Section */}
      <section id="services-header-section" className="pt-6 pb-4 px-4 bg-white border-b border-steel-100 text-center">
        <div className="container-custom max-w-4xl mx-auto">
          <span className="text-primary font-bold tracking-[0.25em] uppercase text-[10px] md:text-xs mb-2 block">
            SIDHARTH STEELS CATALOG
          </span>
          <h1 id="services-page-title" className="font-display text-2xl sm:text-3.5xl md:text-4.5xl font-black text-steel-950 tracking-tight leading-none uppercase">
            Product Material Hub
          </h1>
          <p id="services-page-desc" className="text-steel-500 font-bold text-xs md:text-sm tracking-[0.05em] leading-relaxed uppercase mt-3 max-w-2xl mx-auto">
            Choose a Division to Browse Specifications, Sizing, Grades, and Mill Authenticated Inventory.
          </p>
        </div>
      </section>

      {/* Main Material Divisions Cards List - Grid/Bento Layout */}
      <section className="py-6 px-4">
        <div className="container-custom max-w-5xl mx-auto space-y-6">
          {SERVICES.map((service, idx) => {
            const subcategories = SUBCATEGORIES_DATA[service.id] || [];
            
            return (
              <div
                key={service.id}
                className="bg-white rounded-[24px] border border-steel-200/70 p-5 md:p-7 shadow-sm hover:shadow-md transition-all group flex flex-col md:flex-row gap-6 md:gap-8 items-center"
              >
                {/* Card Thumbnail Image Area */}
                <div className="w-full md:w-64 h-44 md:h-48 rounded-2xl overflow-hidden shrink-0 relative bg-steel-100 border border-steel-100">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-3 left-3 bg-steel-950/90 text-white border border-white/10 text-[9px] font-black uppercase tracking-widest px-2.5 py-1 rounded">
                    MTC Cert Verified
                  </div>
                </div>

                {/* Content specifications and listing of items included inside it */}
                <div className="flex-grow space-y-4 w-full">
                  <div>
                    <span className="text-[9px] font-bold text-primary uppercase tracking-widest block mb-1">
                      DIVISION 0{idx + 1}
                    </span>
                    <h3 className="font-display text-lg md:text-xl font-black text-steel-950 uppercase group-hover:text-primary transition-colors">
                      {service.title}
                    </h3>
                    <p className="text-steel-500 font-semibold text-[10px] md:text-[11px] uppercase tracking-wider mt-0.5 leading-tight">
                      {service.subtitle}
                    </p>
                  </div>

                  <p className="text-steel-500 text-[11.5px] leading-relaxed line-clamp-2 md:line-clamp-3">
                    {service.description}
                  </p>

                  {/* Little Pills showing items inside this service */}
                  {subcategories.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 pt-2">
                      {subcategories.map((sub, sIdx) => (
                        <span
                          key={sIdx}
                          className="px-2.5 py-1 bg-steel-50 hover:bg-steel-100 duration-150 rounded-lg text-[9px] font-black text-steel-600 uppercase border border-steel-200/30 font-display"
                        >
                          {sub.title.replace("Stainless Steel ", "")}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                {/* Action arrow button column */}
                <div className="w-full md:w-auto shrink-0 pt-2 md:pt-0">
                  <button
                    onClick={() => setSearchParams({ id: service.id })}
                    className="w-full md:w-auto px-5 py-3 md:py-4 bg-steel-950 text-white font-black hover:bg-primary transition-colors text-[10.5px] uppercase tracking-wider rounded-xl flex items-center justify-center gap-2 group cursor-pointer"
                  >
                    View Catalog <ArrowRight size={13} className="text-primary group-hover:translate-x-1 group-hover:text-white transition-all" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Certification Trust Seal Footer */}
      <section className="py-8 bg-steel-50/50 border-t border-b border-steel-100 text-center px-4">
        <div className="container-custom max-w-3xl mx-auto flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-12">
          <div>
            <span className="font-mono text-xs font-black text-steel-800 tracking-wider">100% TRACEABLE MILL SHIPPED</span>
            <p className="text-[10px] text-steel-400 mt-1 font-bold uppercase">All flat-rolled and extruded metals comply with ASTM / ASME mechanical and chemical parameters.</p>
          </div>
          <div className="w-px h-10 bg-steel-200 hidden sm:block" />
          <div>
            <span className="font-mono text-xs font-black text-steel-800 tracking-wider">QUALITY ASSURANCE PACK</span>
            <p className="text-[10px] text-steel-400 mt-1 font-bold uppercase">Trace verified components. Premium grade sheets, rods, and heavy plates with secure logistics packaging.</p>
          </div>
        </div>
      </section>
    </div>
  );
}
