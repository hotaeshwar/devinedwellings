import React, { useState, useEffect, useRef } from 'react';
import AashianaImg from '../assets/images/Aashiana.jpeg';
import {
  Zap, Shield, Phone, Trees, Building2, Home,
  MapPin, Train, Clock, ChevronDown, ChevronUp,
  IndianRupee, CheckCircle2, Info, ArrowLeft, ArrowRight,
  Mountain, Layers
} from 'lucide-react';

// ── Scroll-reveal hook ────────────────────────────────────────────────────────
function useScrollReveal(threshold = 0.15) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  const triggered = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const onScroll = () => {
      if (triggered.current) return;
      const rect = el.getBoundingClientRect();
      if (rect.top <= window.innerHeight * (1 - threshold)) {
        setVisible(true);
        triggered.current = true;
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, [threshold]);

  return [ref, visible];
}

// ── Count-up hook ─────────────────────────────────────────────────────────────
function useCountUp(target, duration = 1800, startWhen = false) {
  const [count, setCount] = useState(0);
  const rafRef = useRef(null);

  useEffect(() => {
    if (!startWhen) return;
    if (typeof target !== 'number') return; // skip non-numeric stats

    let startTime = null;
    const step = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * target));
      if (progress < 1) {
        rafRef.current = requestAnimationFrame(step);
      } else {
        setCount(target);
      }
    };

    rafRef.current = requestAnimationFrame(step);
    return () => cancelAnimationFrame(rafRef.current);
  }, [startWhen, target, duration]);

  return count;
}

// ── Animated Stat Item ────────────────────────────────────────────────────────
function StatItem({ stat, index }) {
  const [ref, visible] = useScrollReveal(0.1);
  // Parse numeric part from value like "1+", "3 BHK", "HP"
  const numericMatch = stat.value.match(/^(\d+)/);
  const numericTarget = numericMatch ? parseInt(numericMatch[1], 10) : null;
  const suffix = numericMatch ? stat.value.slice(numericMatch[1].length) : null;

  const count = useCountUp(numericTarget, 1600, visible);

  return (
    <div
      ref={ref}
      className="text-center"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(24px)',
        transition: `opacity 0.7s ease ${index * 150}ms, transform 0.7s ease ${index * 150}ms`,
      }}
    >
      <div
        className="text-2xl sm:text-3xl font-bold text-yellow-400"
        style={{
          opacity: visible ? 1 : 0,
          transition: `opacity 0.4s ease ${index * 150 + 200}ms`,
        }}
      >
        {numericTarget !== null ? `${count}${suffix}` : stat.value}
      </div>
      <div
        className="text-xs text-yellow-700 tracking-widest uppercase mt-0.5"
        style={{
          opacity: visible ? 1 : 0,
          transform: visible ? 'translateY(0)' : 'translateY(8px)',
          transition: `opacity 0.6s ease ${index * 150 + 350}ms, transform 0.6s ease ${index * 150 + 350}ms`,
        }}
      >
        {stat.label}
      </div>
    </div>
  );
}

// ── Accordion Item ────────────────────────────────────────────────────────────
function AccordionItem({ title, icon: Icon, children, defaultOpen = false, delay = 0 }) {
  const [open, setOpen] = useState(defaultOpen);
  const [ref, visible] = useScrollReveal();

  return (
    <div
      ref={ref}
      className={`border border-yellow-600 rounded-2xl overflow-hidden mb-4 transition-all duration-700 ${
        visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      }`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {/* Header */}
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-5 sm:px-7 py-4 sm:py-5 bg-gradient-to-r from-gray-900 to-black hover:from-yellow-900/30 hover:to-black transition-all duration-300 group"
      >
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-gradient-to-br from-yellow-400 to-yellow-600 flex items-center justify-center flex-shrink-0 shadow-lg shadow-yellow-900/40">
            <Icon className="w-4 h-4 sm:w-5 sm:h-5 text-black" />
          </div>
          <span className="text-base sm:text-lg font-semibold text-yellow-400 tracking-wide text-left">
            {title}
          </span>
        </div>
        <div className="text-yellow-500 transition-transform duration-300 flex-shrink-0 ml-2">
          {open ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
        </div>
      </button>

      {/* Body */}
      <div
        className={`overflow-hidden transition-all duration-500 ease-in-out ${
          open ? 'max-h-[2000px] opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="px-5 sm:px-7 py-5 sm:py-6 bg-black/80 border-t border-yellow-600/30">
          {children}
        </div>
      </div>
    </div>
  );
}

// ── Aashiana Hills Detail View ────────────────────────────────────────────────
function AashianaHills({ onBack }) {
  const [heroRef, heroVisible] = useScrollReveal(0);

  const features = [
    { icon: Zap, label: '24x7 Power Backup' },
    { icon: Shield, label: 'CCTV Security' },
    { icon: Phone, label: 'Intercom' },
    { icon: Trees, label: 'Landscape / Green Area' },
    { icon: Building2, label: 'Elevators' },
    { icon: Home, label: 'One Flat 2 Flat' },
  ];

  const nearbyDistances = [
    { place: 'Railway Station', time: '05 Min' },
    { place: 'Timber Irall', time: '45 Min' },
    { place: 'Shimla', time: '01 Hour' },
    { place: 'Solan', time: '15 Min' },
    { place: 'Pinjore Garden', time: '01 Hour' },
    { place: 'Monkey Point', time: '45 Min' },
    { place: 'Hospital', time: '10 Min' },
    { place: 'University', time: '25 Min' },
    { place: 'Church', time: '45 Min' },
  ];

  const constructionPlan = [
    { milestone: 'Booking', amount: '11 Lac' },
    { milestone: 'With in 1 Month', amount: '25 Lac (Including Booking)' },
    { milestone: 'On Stilt Floor', amount: '10 Lac' },
    { milestone: 'On 1st Floor', amount: '10 Lac' },
    { milestone: 'On 2nd Floor', amount: '10 Lac' },
    { milestone: 'On 3rd Floor', amount: '10 Lac' },
    { milestone: 'On 4th Floor', amount: '10 Lac' },
    { milestone: 'On Sanitary/Electrical/Tile/Plaster Work', amount: '20 Lac' },
    { milestone: 'Road + Lift + Outdoor Work', amount: '20 Lac' },
    { milestone: 'On Possession / Registry', amount: 'Balance Amount of the deal' },
  ];

  const timePlan = [
    { milestone: 'Booking', amount: '25 Lac' },
    { milestone: 'After 4 Months', amount: '20 Lac' },
    { milestone: 'After 8 Months', amount: '20 Lac' },
    { milestone: 'After 12 Months', amount: '20 Lac' },
    { milestone: 'After 16 Months', amount: '20 Lac' },
    { milestone: 'On Possession / Registry', amount: 'Balance Amount of the deal' },
  ];

  const termsAndConditions = [
    'These Instalments are not subsequent & shall Become payable on demand Irrespective of the sequence on which they are listed above.',
    'All applicable Govt charges, Taxes, Cess like EDC, Development Charges, GST etc at present or in future or any enhancement there of shall be borne by the applicant/allottee.',
    'Stamp Duty Registration Charges & other Govt Charges as Applicable are Extra.',
    'Fee charges of 11B Approval paid by allottee.',
    'Price mention above are subject to change without any prior notice at the sole decision of the company.',
    'Interest will be charged 18% PA in all delayed payments.',
  ];

  return (
    <div className="min-h-screen bg-black font-serif">

      {/* ── Back Button ── */}
      <div className="sticky top-0 z-50 bg-black/80 backdrop-blur-md border-b border-yellow-600/20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center gap-3">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-yellow-400 hover:text-yellow-300 transition-colors duration-200 group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform duration-200" />
            <span className="text-sm font-medium tracking-wide">All Projects</span>
          </button>
          <span className="text-yellow-600/40 text-sm">/</span>
          <span className="text-yellow-600 text-sm tracking-wide">Aashiana Hills</span>
        </div>
      </div>

      {/* ── Hero ── */}
      <section className="relative overflow-hidden">
        {/* Background image with overlay */}
        <div className="absolute inset-0">
          <img
            src={AashianaImg}
            alt="Aashiana Hills"
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black" />
        </div>

        <div
          ref={heroRef}
          className={`relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28 lg:py-36 text-center transition-all duration-1000 ${
            heroVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
          }`}
        >
          {/* Badge */}
          <span className="inline-block px-4 py-1.5 mb-5 text-xs sm:text-sm tracking-[0.3em] uppercase text-yellow-400 border border-yellow-600/60 rounded-full bg-yellow-900/20 backdrop-blur-sm">
            Aashiana Developers · Barog, Himachal Pradesh
          </span>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-4">
            Aashiana{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-600">
              Hills
            </span>
          </h1>

          <p className="text-lg sm:text-xl text-yellow-300 font-medium mb-3 tracking-wide">
            Artfully Crafted Homes With Extraordinary Lifestyle
          </p>

          <p className="text-sm sm:text-base text-gray-300 max-w-2xl mx-auto leading-relaxed">
            A pacific hill station amidst mesmerizing gardens and beautiful green valleys.
            Escape the chaos of city life and embrace nature's beauty as a way of life.
          </p>

          {/* Key specs */}
          <div className="mt-10 flex flex-wrap justify-center gap-4 sm:gap-6">
            {[
              { label: 'Configuration', value: 'Stilt + 4 Floors' },
              { label: 'Super Area', value: '1600 Sq Ft' },
              { label: 'MRP', value: '₹10,000/Sq Ft' },
            ].map((s, i) => (
              <div
                key={i}
                className="bg-black/60 border border-yellow-600/50 rounded-xl px-5 py-3 backdrop-blur-sm"
              >
                <div className="text-xs text-yellow-500 tracking-widest uppercase mb-0.5">{s.label}</div>
                <div className="text-base sm:text-lg font-bold text-yellow-300">{s.value}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Accordion Sections ── */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-0">

        {/* About the Project */}
        <AccordionItem title="A Perfect Place With Natural Beauty" icon={Trees} defaultOpen={true} delay={0}>
          <div className="space-y-4 text-yellow-300 text-sm sm:text-base leading-relaxed">
            <p>
              Dagshai Hills is a cluster of villages amongst the mountains. It is located at an altitude of more than 5650 ft. above sea level at Solan district of Himachal Pradesh.
            </p>
            <p>
              The magical climate varies between a temperature of 16°C to 24°C in summers and a temperature -20°C to 16°C in winters. This place is a spellbound town with 80% humidity, foggy water falls, scenic views, hill top temples, valleys, nature parks and lakes — making the stay life-enriching and refreshing.
            </p>
            <p className="text-yellow-400 font-semibold text-base sm:text-lg border-l-2 border-yellow-500 pl-4 italic">
              "The Next Level of Comfortable Living"
            </p>
            <p>
              The privacy that comes with Aashiana Hills, Barog is unparalleled. It is a great choice for those looking for a way to escape the hustle and bustle of life. Given the scenic backdrops, booming hospitality industry and a lifestyle centred around wellness, Aashiana Hills seems like an ideal pick.
            </p>
            <p>
              Picturesque views of the hill and a well maintained green landscape — this charming property offers easy access to prime destinations of the city and is impeccable designed. It is a rare opportunity to own a piece of paradise in one of India's most sought-after locations. 3 BHK flats are home to luxurious amenities such as intercom facilities, CCTV surveillance, 24x7 power backup, Elevators, 3 side Open Flat and much more.
            </p>
          </div>
        </AccordionItem>

        {/* Features & Amenities */}
        <AccordionItem title="Features & Amenities" icon={CheckCircle2} defaultOpen={false} delay={80}>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {features.map((f, i) => (
              <div
                key={i}
                className="flex items-center gap-3 bg-gray-900/60 border border-yellow-600/30 rounded-xl px-4 py-3 hover:border-yellow-500 hover:bg-yellow-900/10 transition-all duration-300"
              >
                <div className="w-9 h-9 rounded-full bg-gradient-to-br from-yellow-400 to-yellow-600 flex items-center justify-center flex-shrink-0">
                  <f.icon className="w-4 h-4 text-black" />
                </div>
                <span className="text-yellow-300 font-medium text-sm sm:text-base">{f.label}</span>
              </div>
            ))}
          </div>
        </AccordionItem>

        {/* Location Map */}
        <AccordionItem title="Location & Nearby Distances" icon={MapPin} defaultOpen={false} delay={160}>
          <div className="space-y-5">
            <p className="text-yellow-300 text-sm sm:text-base">
              <span className="font-semibold text-yellow-400">Site Office:</span> Aashiana Hills, Barog, Distt. Solan Himachal Pradesh (M) 9653280001
            </p>

            {/* Distance grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {nearbyDistances.map((d, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between gap-2 bg-gray-900/60 border border-yellow-600/30 rounded-xl px-4 py-3 hover:bg-yellow-900/10 hover:border-yellow-500 transition-all duration-300"
                >
                  <div className="flex items-center gap-2">
                    <Train className="w-4 h-4 text-yellow-500 flex-shrink-0" />
                    <span className="text-yellow-300 text-sm font-medium">{d.place}</span>
                  </div>
                  <div className="flex items-center gap-1 text-yellow-500 text-xs font-bold tracking-wider">
                    <Clock className="w-3 h-3" />
                    {d.time}
                  </div>
                </div>
              ))}
            </div>

            {/* Nearby landmarks list */}
            <div className="bg-gray-900/40 border border-yellow-600/20 rounded-xl p-4">
              <p className="text-yellow-500 text-xs tracking-widest uppercase font-semibold mb-3">Nearby Landmarks</p>
              <div className="flex flex-wrap gap-2">
                {['Barog', 'Tapan Motors', 'Barista', 'Toyota Dealership', 'DPS School', 'Chandigarh', 'Panchkula', 'Pinjore', 'Morni', 'Nahan', 'Ambala', 'Delhi'].map((l, i) => (
                  <span key={i} className="text-xs text-yellow-300 border border-yellow-700/50 rounded-full px-3 py-1 bg-black/40">
                    {l}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </AccordionItem>

        {/* Payment Plan */}
        <AccordionItem title="Payment Plan" icon={IndianRupee} defaultOpen={false} delay={240}>
          <div className="space-y-6">

            {/* Property Details Summary */}
            <div className="grid grid-cols-3 gap-3 mb-2">
              {[
                { label: 'Floor', value: 'Stilt + 4' },
                { label: 'Super Area', value: '1600 Sq Ft' },
                { label: 'MRP', value: '₹10,000/Sq Ft' },
              ].map((d, i) => (
                <div key={i} className="bg-gray-900/60 border border-yellow-600/30 rounded-xl p-3 text-center">
                  <div className="text-xs text-yellow-500 tracking-wider uppercase mb-1">{d.label}</div>
                  <div className="text-yellow-300 font-bold text-xs sm:text-sm">{d.value}</div>
                </div>
              ))}
            </div>

            {/* Plan 1 — Construction Linked */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <div className="h-0.5 w-5 bg-yellow-500 rounded" />
                <h4 className="text-yellow-400 font-bold text-sm sm:text-base tracking-widest uppercase">
                  1. Construction Linked Plan
                </h4>
              </div>
              <div className="rounded-xl overflow-hidden border border-yellow-600/30">
                {constructionPlan.map((row, i) => (
                  <div
                    key={i}
                    className={`flex items-center justify-between px-4 py-3 text-xs sm:text-sm border-b border-yellow-600/10 last:border-b-0 transition-colors hover:bg-yellow-900/10 ${
                      i % 2 === 0 ? 'bg-gray-900/40' : 'bg-black/60'
                    }`}
                  >
                    <span className="text-yellow-300 font-medium">{row.milestone}</span>
                    <span className="text-yellow-400 font-bold text-right ml-4">{row.amount}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Plan 2 — DP */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <div className="h-0.5 w-5 bg-yellow-500 rounded" />
                <h4 className="text-yellow-400 font-bold text-sm sm:text-base tracking-widest uppercase">
                  2. DP Plan
                </h4>
              </div>
              <div className="bg-gray-900/40 border border-yellow-600/30 rounded-xl px-4 py-4 text-center">
                <span className="text-yellow-300 font-bold text-base sm:text-xl tracking-wider">18% Yearly</span>
              </div>
            </div>

            {/* Plan 3 — Time Linked */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <div className="h-0.5 w-5 bg-yellow-500 rounded" />
                <h4 className="text-yellow-400 font-bold text-sm sm:text-base tracking-widest uppercase">
                  3. Time Linked Plan
                </h4>
              </div>
              <div className="rounded-xl overflow-hidden border border-yellow-600/30">
                {timePlan.map((row, i) => (
                  <div
                    key={i}
                    className={`flex items-center justify-between px-4 py-3 text-xs sm:text-sm border-b border-yellow-600/10 last:border-b-0 transition-colors hover:bg-yellow-900/10 ${
                      i % 2 === 0 ? 'bg-gray-900/40' : 'bg-black/60'
                    }`}
                  >
                    <span className="text-yellow-300 font-medium">{row.milestone}</span>
                    <span className="text-yellow-400 font-bold text-right ml-4">{row.amount}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* GST Note */}
            <div className="flex items-center gap-2 bg-yellow-900/20 border border-yellow-600/40 rounded-xl px-4 py-3">
              <Info className="w-4 h-4 text-yellow-400 flex-shrink-0" />
              <span className="text-yellow-300 text-xs sm:text-sm font-medium">
                GST will be paid Extra with every Instalment
              </span>
            </div>
          </div>
        </AccordionItem>

        {/* Terms & Conditions */}
        <AccordionItem title="Terms & Conditions" icon={Info} defaultOpen={false} delay={320}>
          <ol className="space-y-3 list-none">
            {termsAndConditions.map((term, i) => (
              <li key={i} className="flex items-start gap-3 text-xs sm:text-sm text-yellow-300 leading-relaxed">
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-gradient-to-br from-yellow-400 to-yellow-600 text-black text-xs font-bold flex items-center justify-center mt-0.5">
                  {i + 1}
                </span>
                <span>{term}</span>
              </li>
            ))}
          </ol>

          {/* Disclaimer */}
          <div className="mt-5 pt-4 border-t border-yellow-600/20">
            <p className="text-gray-500 text-xs leading-relaxed italic">
              Disclaimer: Any information contained herein is for the guidance and should not be relied upon as being a statement or representation of fact. The developer reserves the right to alter any part of the specification, without notice. These particulars are prepared for guidance. Stock images are for representative purposes only.
            </p>
          </div>
        </AccordionItem>

      </section>

      {/* ── CTA Footer ── */}
      <section className="py-12 px-4 text-center bg-gradient-to-t from-gray-900 to-black">
        <p className="text-yellow-400 text-lg sm:text-xl font-semibold mb-2 tracking-wide">
          Don't miss this chance to make your dream home a reality!
        </p>
        <p className="text-yellow-600 text-sm mb-6">Promoted by SRS Group</p>
        <a
          href="tel:9653280001"
          className="inline-flex items-center gap-2 bg-gradient-to-r from-yellow-400 to-yellow-600 text-black font-bold px-8 py-3 rounded-full text-base sm:text-lg shadow-lg shadow-yellow-900/40 hover:scale-105 hover:shadow-yellow-600/30 transition-all duration-300"
        >
          <Phone className="w-5 h-5" />
          Call: 9653280001
        </a>
      </section>
    </div>
  );
}

// ── Project Card ──────────────────────────────────────────────────────────────
function ProjectCard({ project, onSelect, delay = 0 }) {
  const [ref, visible] = useScrollReveal();

  return (
    <div
      ref={ref}
      className={`group relative overflow-hidden rounded-2xl border border-yellow-600/30 bg-gray-900/40 cursor-pointer transition-all duration-700 hover:border-yellow-500 hover:shadow-xl hover:shadow-yellow-900/20 hover:-translate-y-1 ${
        visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      }`}
      style={{ transitionDelay: `${delay}ms` }}
      onClick={() => onSelect(project.id)}
    >
      {/* Image */}
      <div className="relative h-52 overflow-hidden">
        <img
          src={project.image}
          alt={project.name}
          className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />

        {/* Status badge */}
        <span className="absolute top-3 left-3 px-3 py-1 text-xs font-bold tracking-widest uppercase rounded-full bg-yellow-400 text-black">
          {project.status}
        </span>
      </div>

      {/* Content */}
      <div className="p-5">
        <div className="flex items-start justify-between gap-3 mb-3">
          <div>
            <h3 className="text-lg font-bold text-yellow-300 leading-tight">{project.name}</h3>
            <div className="flex items-center gap-1.5 mt-1">
              <MapPin className="w-3 h-3 text-yellow-600" />
              <span className="text-xs text-yellow-600 tracking-wide">{project.location}</span>
            </div>
          </div>
          <div className="flex-shrink-0 w-9 h-9 rounded-full bg-gradient-to-br from-yellow-400/20 to-yellow-600/20 border border-yellow-600/40 flex items-center justify-center group-hover:from-yellow-400 group-hover:to-yellow-600 group-hover:border-yellow-400 transition-all duration-300">
            <ArrowRight className="w-4 h-4 text-yellow-500 group-hover:text-black transition-colors duration-300" />
          </div>
        </div>

        {/* Specs row */}
        <div className="flex flex-wrap gap-2 mb-4">
          {project.specs.map((spec, i) => (
            <span key={i} className="text-xs text-yellow-400 border border-yellow-700/40 rounded-full px-2.5 py-0.5 bg-black/40">
              {spec}
            </span>
          ))}
        </div>

        {/* Price */}
        <div className="flex items-center justify-between pt-3 border-t border-yellow-600/20">
          <span className="text-xs text-yellow-600 uppercase tracking-widest font-semibold">Starting From</span>
          <span className="text-base font-bold text-yellow-400">{project.price}</span>
        </div>
      </div>
    </div>
  );
}

// ── Projects Listing (Home) ───────────────────────────────────────────────────
function ProjectsListing({ onSelectProject }) {
  const [headerRef, headerVisible] = useScrollReveal(0);

  const projects = [
    {
      id: 'aashiana-hills',
      name: 'Aashiana Hills',
      location: 'Barog, Himachal Pradesh',
      image: AashianaImg,
      status: 'New Launch',
      specs: ['3 BHK', 'Stilt + 4 Floors', '1600 Sq Ft'],
      price: '₹1.6 Cr',
      type: 'Hill Residences',
      icon: Mountain,
    },
    // Future projects will go here
  ];

  return (
    <div className="min-h-screen bg-black font-serif">

      {/* ── Header ── */}
      <div className="relative overflow-hidden border-b border-yellow-600/20 bg-gradient-to-b from-gray-950 to-black">
        {/* Decorative background grid */}
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: 'linear-gradient(#ca8a04 1px, transparent 1px), linear-gradient(90deg, #ca8a04 1px, transparent 1px)',
            backgroundSize: '60px 60px',
          }}
        />

        <div
          ref={headerRef}
          className={`relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-14 transition-all duration-1000 ${
            headerVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          {/* Eyebrow */}
          <div className="flex items-center gap-3 mb-6">
            <div className="h-px flex-1 max-w-[40px] bg-gradient-to-r from-transparent to-yellow-600" />
            <span className="text-xs tracking-[0.35em] uppercase text-yellow-600 font-semibold">SRS Group</span>
            <div className="h-px flex-1 max-w-[40px] bg-gradient-to-l from-transparent to-yellow-600" />
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight mb-4 text-center">
            Our{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-600">
              Projects
            </span>
          </h1>

          <p className="text-center text-gray-400 text-sm sm:text-base max-w-xl mx-auto leading-relaxed">
            Handpicked properties across prime locations — crafted for those who seek more than just a home.
          </p>

          {/* Stats strip — animated count-up */}
          <div className="mt-10 flex flex-wrap justify-center gap-6 sm:gap-10">
            {[
              { value: '1+', label: 'Active Projects' },
              { value: 'HP', label: 'Himachal Pradesh' },
              { value: '3 BHK', label: 'Configurations' },
            ].map((s, i) => (
              <StatItem key={i} stat={s} index={i} />
            ))}
          </div>
        </div>
      </div>

      {/* ── Filter bar (ready for future projects) ── */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-2">
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-hide">
          {['All', 'Hill Residences', 'City Apartments', 'Plots'].map((filter, i) => (
            <button
              key={i}
              className={`flex-shrink-0 px-4 py-1.5 rounded-full text-xs font-semibold tracking-wider uppercase border transition-all duration-200 ${
                i === 0
                  ? 'bg-yellow-500 border-yellow-500 text-black'
                  : 'border-yellow-700/40 text-yellow-600 hover:border-yellow-500 hover:text-yellow-400 bg-transparent'
              }`}
            >
              {filter}
            </button>
          ))}
        </div>
      </div>

      {/* ── Project Grid ── */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {projects.map((project, i) => (
            <ProjectCard
              key={project.id}
              project={project}
              onSelect={onSelectProject}
              delay={i * 100}
            />
          ))}

          {/* Coming Soon placeholder */}
          <div className="relative overflow-hidden rounded-2xl border border-dashed border-yellow-700/30 bg-gray-900/20 flex flex-col items-center justify-center p-8 min-h-[300px]">
            <div className="w-12 h-12 rounded-full border border-yellow-700/40 flex items-center justify-center mb-4">
              <Layers className="w-5 h-5 text-yellow-700" />
            </div>
            <p className="text-yellow-700 text-sm font-semibold tracking-widest uppercase text-center">More Projects</p>
            <p className="text-yellow-800 text-xs text-center mt-1">Coming Soon</p>
          </div>
        </div>
      </section>

      {/* ── Footer strip ── */}
      <div className="border-t border-yellow-600/10 py-6 text-center">
        <p className="text-yellow-800 text-xs tracking-widest uppercase">© SRS Group · All Rights Reserved</p>
      </div>
    </div>
  );
}

// ── Main Component ────────────────────────────────────────────────────────────
const Project = () => {
  const [activeProject, setActiveProject] = useState(null);

  const handleSelectProject = (id) => {
    setActiveProject(id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBack = () => {
    setActiveProject(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (activeProject === 'aashiana-hills') {
    return <AashianaHills onBack={handleBack} />;
  }

  return <ProjectsListing onSelectProject={handleSelectProject} />;
};

export default Project;