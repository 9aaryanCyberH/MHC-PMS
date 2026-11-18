import React, { useState, useRef, useEffect } from 'react';
import { 
  HeartPulse, 
  Stethoscope, 
  ShieldCheck, 
  Building, 
  Users, 
  Calendar, 
  Clock, 
  FileText, 
  Pill, 
  FlaskConical, 
  CheckCircle2, 
  ArrowRight, 
  LogIn, 
  UserPlus, 
  ChevronRight, 
  Menu, 
  X, 
  Shield, 
  MapPin, 
  PhoneCall, 
  Sparkles,
  Activity,
  Award,
  Star,
  Search,
  Check,
  AlertCircle,
  ExternalLink,
  Heart,
  Smile,
  Brain,
  Moon,
  Sparkle
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { AarogyamLogo } from '../common/AarogyamLogo';

export const LandingView = () => {
  const { setPublicView, setCurrentRole, doctors } = useApp();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState('Bengaluru (Central Hub)');
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [selectedSearchCategory, setSelectedSearchCategory] = useState('All');
  const searchContainerRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchContainerRef.current && !searchContainerRef.current.contains(event.target)) {
        setIsSearchOpen(false);
      }
    };
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        setIsSearchOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const attendingDoctor = doctors[0] || {
    name: "Dr. Shashank Pandey",
    title: "Chief Consultant Psychiatrist & Clinical Director",
    speciality: "Adult & Neuropsychiatry",
    qualification: "MBBS, MD (Psychiatry - NIMHANS), DNB, FIPS",
    roomNumber: "OPD Suite 204, East Wing",
    timings: "09:00 AM - 04:00 PM (Mon - Sat)",
    consultationFee: 1200,
    experience: "15+ Years Experience",
    avatar: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=300"
  };

  const handleOpenLogin = (roleTarget = 'patient') => {
    setCurrentRole(roleTarget);
    setPublicView('login');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenRegister = () => {
    setPublicView('register');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToSection = (id) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Apollo-style Quick Action Tiles
  const quickActionTiles = [
    {
      id: "book-appointment",
      title: "Book In-Clinic Visit",
      desc: "Consult our senior psychiatrists at your nearest specialized center.",
      badge: "Same Day Available",
      icon: Calendar,
      action: () => handleOpenLogin('patient'),
      accent: "from-amber-400 to-amber-500 text-slate-950",
      cta: "Book Appointment"
    },
    {
      id: "specialist-opd",
      title: "Specialist OPD Clinic",
      desc: "In-person clinical evaluations with Chief Consultant Dr. Shashank Pandey.",
      badge: "OPD Suite 204",
      icon: Stethoscope,
      action: () => handleOpenLogin('patient'),
      accent: "from-sky-500 to-blue-600 text-white",
      cta: "Consult Specialist"
    },
    {
      id: "digital-pharmacy",
      title: "Pharmacy & Medicines",
      desc: "Doorstep delivery of authenticated prescribed psychiatric medications.",
      badge: "Verified Dispensing",
      icon: Pill,
      action: () => handleOpenLogin('patient'),
      accent: "from-emerald-500 to-teal-600 text-white",
      cta: "Order Prescriptions"
    },
    {
      id: "diagnostic-lab",
      title: "Diagnostic & Lab Tests",
      desc: "Standardized psychometric scales (PHQ-9, HAM-A), EEG & blood panels.",
      badge: "Accredited Labs",
      icon: FlaskConical,
      action: () => handleOpenLogin('patient'),
      accent: "from-purple-500 to-indigo-600 text-white",
      cta: "Schedule Test"
    },
    {
      id: "health-records",
      title: "Prescriptions & Care Notes",
      desc: "Access your active doctor prescriptions, dosage instructions, and test notes anytime.",
      badge: "100% Secure",
      icon: FileText,
      action: () => handleOpenLogin('patient'),
      accent: "from-indigo-600 to-blue-700 text-white",
      cta: "View Care Notes"
    },
    {
      id: "crisis-support",
      title: "24/7 Crisis Helpline",
      desc: "Immediate clinical intervention and emergency psychiatric de-escalation.",
      badge: "Emergency Hotline",
      icon: PhoneCall,
      action: () => window.open('tel:18005990019', '_self'),
      accent: "from-rose-500 to-red-600 text-white",
      cta: "Call 1800-599-0019"
    }
  ];

  // Clinical Specialties (Apollo Centers of Excellence)
  const clinicalSpecialties = [
    {
      name: "Adult Psychiatry & Mood Disorders",
      desc: "Evidence-based management of clinical depression, bipolar spectrum, and affective conditions.",
      icon: Brain,
      tag: "Specialty Clinic"
    },
    {
      name: "Anxiety, Panic & OCD Management",
      desc: "Personalized psychotherapy, somatic desensitization, and pharmacotherapy for panic disorders.",
      icon: Heart,
      tag: "High Recovery Rate"
    },
    {
      name: "Child & Adolescent Behavioral Health",
      desc: "Compassionate evaluation for ADHD, learning differences, and developmental milestones.",
      icon: Smile,
      tag: "Pediatric Center"
    },
    {
      name: "Sleep Medicine & Chronotherapy",
      desc: "Advanced circadian phase stabilization, chronic insomnia assessment, and sleep hygiene coaching.",
      icon: Moon,
      tag: "Specialized Lab"
    },
    {
      name: "Psychotherapy & Cognitive Restructuring (CBT)",
      desc: "Structured, goal-oriented talk therapy for stress resilience, grief, and emotional well-being.",
      icon: Users,
      tag: "Certified Counselors"
    },
    {
      name: "Neuropsychiatry & Memory Care",
      desc: "Targeted clinical support for cognitive health, organic neurological syndromes, and memory care.",
      icon: Activity,
      tag: "Consultant Care"
    }
  ];

  // Hospital Network Centers
  const hospitalCenters = [
    {
      name: "Central Advanced Psychiatric Hospital",
      city: "Bengaluru, Karnataka",
      address: "Indiranagar 100 Feet Road, Bengaluru - 560038",
      timings: "24x7 Emergency • OPD: 08:00 AM - 08:00 PM",
      contact: "+91 80 4969 8000",
      beds: "60 Inpatient Beds",
      type: "Main Tertiary Hub"
    },
    {
      name: "Kolkata Specialty Mental Health Centre",
      city: "Kolkata, West Bengal",
      address: "Salt Lake Sector V, Near College More, Kolkata - 700091",
      timings: "OPD: 09:00 AM - 07:00 PM (Mon - Sat)",
      contact: "+91 33 2357 9000",
      beds: "Day Care & Suite",
      type: "Regional Center"
    },
    {
      name: "South Suburban Outpatient Clinic",
      city: "Bengaluru, Karnataka",
      address: "Electronic City Phase 1, Hosur Road, Bengaluru - 560100",
      timings: "OPD: 09:00 AM - 05:00 PM (Mon - Sat)",
      contact: "+91 80 2852 4000",
      beds: "Outpatient Clinic",
      type: "Suburban Clinic"
    }
  ];

  // Patient Stories & Testimonials
  const patientStories = [
    {
      quote: "The personalized attention and compassionate care at Aarogyam helped me overcome acute anxiety that was paralyzing my career. The confidential digital portal made my consultations and medications effortless.",
      patient: "Corporate Executive, 32",
      treatment: "Generalized Anxiety & Sleep Stabilization",
      recovery: "Symptom-free at 6-month review"
    },
    {
      quote: "Finding a clinical psychiatrist who listened with zero judgment changed our family's life. The e-prescriptions and regular reviews gave us peace of mind and measurable progress.",
      patient: "Parent of Young Adult",
      treatment: "ADHD & Chronotherapy Protocol",
      recovery: "Remarkable academic & emotional stability"
    }
  ];

  // Comprehensive real healthcare search catalog for live search
  const searchableCatalog = [
    // 1. Doctors & Specialists
    {
      id: "doc-shashank",
      category: "Doctors",
      badge: "Chief Consultant",
      badgeColor: "bg-emerald-100 text-emerald-800 border-emerald-200",
      title: attendingDoctor.name,
      subtitle: attendingDoctor.title,
      department: attendingDoctor.speciality,
      qualification: attendingDoctor.qualification,
      experience: attendingDoctor.experience,
      timings: attendingDoctor.timings,
      fee: `₹${attendingDoctor.consultationFee}`,
      room: attendingDoctor.roomNumber,
      avatar: attendingDoctor.avatar,
      desc: "Available for OPD clinical psychiatry, pharmacotherapy management, and neuro-behavioral consultations.",
      keywords: ["doctor", "dr", "shashank", "pandey", "psychiatrist", "nimhans", "adult", "neuropsychiatry", "consultant", "opd", "physician", "depression", "anxiety", "adhd", "bipolar"],
      actionLabel: "Book In-Clinic Visit",
      action: () => handleOpenLogin('patient')
    },
    // 2. Clinical Specialties & Conditions
    {
      id: "spec-anxiety",
      category: "Specialties",
      badge: "High Recovery Rate",
      badgeColor: "bg-amber-100 text-amber-900 border-amber-300",
      title: "Anxiety, Panic & OCD Management",
      subtitle: "Personalized psychopharmacotherapy & somatic desensitization",
      department: "Attending: Dr. Shashank Pandey",
      qualification: "NIMHANS Protocol",
      experience: "Clinical Specialty",
      timings: "Daily Consultation Slots Available",
      desc: "Evidence-based management of panic attacks, generalized anxiety (GAD), somatic tension, and OCD.",
      keywords: ["anxiety", "panic", "ocd", "phobia", "fear", "gad", "stress", "worry", "somatic", "tension", "heart rate", "obsessive"],
      actionLabel: "Consult for Anxiety",
      action: () => handleOpenLogin('patient')
    },
    {
      id: "spec-depression",
      category: "Specialties",
      badge: "Specialty Clinic",
      badgeColor: "bg-amber-100 text-amber-900 border-amber-300",
      title: "Clinical Depression & Mood Disorders",
      subtitle: "Affective stabilization, psychotherapy & chronotherapy",
      department: "Attending: Dr. Shashank Pandey",
      qualification: "Evidence-Based Care",
      experience: "Clinical Specialty",
      timings: "Mon - Sat OPD",
      desc: "Comprehensive diagnostic evaluation and targeted therapies for major depression, dysthymia, and bipolar spectrum.",
      keywords: ["depression", "mood", "sad", "bipolar", "affective", "hopelessness", "energy", "clinical depression", "melancholia"],
      actionLabel: "Consult for Depression",
      action: () => handleOpenLogin('patient')
    },
    {
      id: "spec-adhd",
      category: "Specialties",
      badge: "Pediatric & Young Adult",
      badgeColor: "bg-amber-100 text-amber-900 border-amber-300",
      title: "Child & Adolescent Behavioral Health (ADHD)",
      subtitle: "Neurodevelopmental evaluations & executive stamina coaching",
      department: "Attending: Dr. Shashank Pandey",
      qualification: "Pediatric Psychiatry",
      experience: "Specialized Center",
      timings: "Mon - Sat OPD",
      desc: "Structured evaluation of executive function, attention deficit, working memory, and behavioral milestone guidance.",
      keywords: ["adhd", "attention", "focus", "hyperactivity", "child", "adolescent", "executive function", "concentration", "behavioral", "pediatric"],
      actionLabel: "Consult for ADHD",
      action: () => handleOpenLogin('patient')
    },
    {
      id: "spec-sleep",
      category: "Specialties",
      badge: "Specialized Lab",
      badgeColor: "bg-indigo-100 text-indigo-900 border-indigo-200",
      title: "Sleep Medicine & Chronotherapy Clinic",
      subtitle: "Circadian rhythm stabilization & chronic insomnia protocols",
      department: "Attending: Dr. Shashank Pandey",
      qualification: "Sleep Medicine Unit",
      experience: "Specialized Lab",
      timings: "OPD & Sleep EEG Diagnostics",
      desc: "Clinical sleep hygiene coaching, evening melatonin titration, sleep architecture polysomnography, and phase alignment.",
      keywords: ["sleep", "insomnia", "circadian", "night", "melatonin", "rest", "chronotherapy", "apnea", "drowsiness", "somnolence"],
      actionLabel: "Schedule Sleep Consult",
      action: () => handleOpenLogin('patient')
    },
    {
      id: "spec-cbt",
      category: "Specialties",
      badge: "Certified Counselors",
      badgeColor: "bg-emerald-100 text-emerald-900 border-emerald-200",
      title: "Psychotherapy & Cognitive Restructuring (CBT)",
      subtitle: "Structured, goal-oriented talk therapy for emotional resilience",
      department: "Clinical Director: Dr. Shashank Pandey",
      qualification: "Clinical Psychology",
      experience: "Certified Team",
      timings: "Online & In-Person Suites",
      desc: "Goal-oriented talk therapy for cognitive thought traps, autonomic relaxation drills, stress resilience, and grief recovery.",
      keywords: ["psychotherapy", "cbt", "therapy", "counseling", "counselor", "talk therapy", "cognitive", "trauma", "stress", "resilience"],
      actionLabel: "Book Psychotherapy",
      action: () => handleOpenLogin('patient')
    },
    {
      id: "spec-neuro",
      category: "Specialties",
      badge: "Consultant Care",
      badgeColor: "bg-sky-100 text-sky-900 border-sky-200",
      title: "Neuropsychiatry & Memory Care",
      subtitle: "Targeted clinical support for cognitive health & memory",
      department: "Attending: Dr. Shashank Pandey",
      qualification: "Fellowship Neuropsychiatry",
      experience: "Advanced Center",
      timings: "Consultant OPD",
      desc: "Specialized clinical diagnosis and longitudinal care for organic cognitive health, memory care, and neuro-behavioral conditions.",
      keywords: ["neuropsychiatry", "memory", "brain", "cognitive", "dementia", "neurological", "organic", "aging", "neuro"],
      actionLabel: "Consult Neuropsychiatry",
      action: () => handleOpenLogin('patient')
    },
    // 3. Diagnostic & Lab Tests
    {
      id: "lab-phq9",
      category: "Lab Tests",
      badge: "Standardized Scale",
      badgeColor: "bg-purple-100 text-purple-900 border-purple-200",
      title: "PHQ-9 Clinical Depression Severity Scale",
      subtitle: "Standardized clinical 9-parameter rating scale (Score 0-27)",
      department: "Accredited Psychometrics Lab",
      qualification: "ISO Accredited",
      experience: "Instant Scoring",
      timings: "Available Same Day",
      fee: "₹450",
      desc: "Evidence-based psychometric test evaluating depressive symptom intensity, sleep disturbances, fatigue, and recovery progression.",
      keywords: ["phq9", "phq-9", "depression test", "scale", "psychometric", "score", "lab", "test", "assessment", "diagnostic"],
      actionLabel: "Schedule PHQ-9 Scale",
      action: () => handleOpenLogin('patient')
    },
    {
      id: "lab-hama",
      category: "Lab Tests",
      badge: "Clinical Diagnostic",
      badgeColor: "bg-purple-100 text-purple-900 border-purple-200",
      title: "HAM-A Clinical Anxiety Rating Scale",
      subtitle: "Hamilton 14-parameter psychic and somatic anxiety score",
      department: "Accredited Psychometrics Lab",
      qualification: "Clinical Gold Standard",
      experience: "Doctor Administered",
      timings: "Available During OPD",
      fee: "₹500",
      desc: "Measures autonomic arousal, muscular tension, cardiovascular somatization, respiratory fears, and psychic anxiety.",
      keywords: ["hama", "ham-a", "anxiety test", "hamilton", "scale", "rating", "assessment", "lab", "test", "score"],
      actionLabel: "Schedule HAM-A Scale",
      action: () => handleOpenLogin('patient')
    },
    {
      id: "lab-blood",
      category: "Lab Tests",
      badge: "Pathology Panel",
      badgeColor: "bg-purple-100 text-purple-900 border-purple-200",
      title: "Comprehensive Neuro-Psychiatric Blood Panel",
      subtitle: "Complete Blood Count, Thyroid T3/T4/TSH, Vitamin B12, D3 & Electrolytes",
      department: "NABH Accredited Diagnostic Lab",
      qualification: "NABL & NABH Verified",
      experience: "Home Collection Avail.",
      timings: "07:00 AM - 07:00 PM",
      fee: "₹1,850",
      desc: "Full metabolic and endocrine panel to rule out organic thyroiditis, pernicious anemia, and metabolic contributors to fatigue and mood changes.",
      keywords: ["blood", "thyroid", "tsh", "t3", "t4", "b12", "vitamin", "cbc", "electrolytes", "lab", "pathology", "test", "panel"],
      actionLabel: "Schedule Blood Panel",
      action: () => handleOpenLogin('patient')
    },
    {
      id: "lab-tdm",
      category: "Lab Tests",
      badge: "Precision Dosing",
      badgeColor: "bg-purple-100 text-purple-900 border-purple-200",
      title: "Therapeutic Drug Monitoring (Serum Lithium & Anticonvulsants)",
      subtitle: "Precise quantitative therapeutic blood level analysis",
      department: "NABH Accredited Diagnostic Lab",
      qualification: "Precision Biochemistry",
      experience: "Same Day Fasting",
      timings: "08:00 AM - 02:00 PM",
      fee: "₹850",
      desc: "Therapeutic drug serum concentration tracking to ensure safety, efficacy, and avoid toxicity in mood stabilizer pharmacotherapy.",
      keywords: ["lithium", "valproate", "carbamazepine", "drug monitoring", "tdm", "serum", "therapeutic", "levels", "lab", "test", "toxicology"],
      actionLabel: "Schedule Drug Test",
      action: () => handleOpenLogin('patient')
    },
    {
      id: "lab-eeg",
      category: "Lab Tests",
      badge: "Neuro-Diagnostics",
      badgeColor: "bg-purple-100 text-purple-900 border-purple-200",
      title: "Sleep Architecture EEG & Polysomnography",
      subtitle: "Continuous electrophysiological brainwave recording & circadian analysis",
      department: "Specialized Sleep Diagnostic Suite",
      qualification: "Advanced Polysomnography",
      experience: "Overnight / Day Lab",
      timings: "By Appointment",
      fee: "₹4,200",
      desc: "Evaluates sleep staging (REM/NREM), micro-arousals, parasomnias, and electro-cortical phase synchronization.",
      keywords: ["eeg", "sleep study", "polysomnography", "brainwave", "circadian", "neurological", "sleep lab", "test", "neuro"],
      actionLabel: "Schedule Sleep EEG",
      action: () => handleOpenLogin('patient')
    },
    // 4. Hospital Network Centers
    {
      id: "center-bengaluru",
      category: "Centers",
      badge: "Tertiary Hub",
      badgeColor: "bg-sky-100 text-sky-900 border-sky-200",
      title: "Central Advanced Psychiatric Hospital",
      subtitle: "Bengaluru, Karnataka • 60 Inpatient Beds",
      department: "Indiranagar 100 Feet Road, Bengaluru - 560038",
      timings: "24x7 Emergency • OPD: 08:00 AM - 08:00 PM",
      contact: "+91 80 4969 8000",
      desc: "Full-service inpatient psychiatric facility, emergency crisis triage, day-care center, and outpatient consultation suites.",
      keywords: ["bengaluru", "bangalore", "indiranagar", "hospital", "center", "clinic", "emergency", "karnataka", "hub"],
      actionLabel: "View Center Details",
      action: () => scrollToSection('centers')
    },
    {
      id: "center-kolkata",
      category: "Centers",
      badge: "Regional Center",
      badgeColor: "bg-sky-100 text-sky-900 border-sky-200",
      title: "Kolkata Specialty Mental Health Centre",
      subtitle: "Kolkata, West Bengal • Day Care & Consultation Suites",
      department: "Salt Lake Sector V, Near College More, Kolkata - 700091",
      timings: "OPD: 09:00 AM - 07:00 PM (Mon - Sat)",
      contact: "+91 33 2357 9000",
      desc: "Specialized outpatient consultations, neuro-behavioral therapy suites, child behavioral guidance, and crisis intervention.",
      keywords: ["kolkata", "calcutta", "salt lake", "sector v", "west bengal", "hospital", "clinic", "center"],
      actionLabel: "View Center Details",
      action: () => scrollToSection('centers')
    },
    {
      id: "center-ecity",
      category: "Centers",
      badge: "Suburban Clinic",
      badgeColor: "bg-sky-100 text-sky-900 border-sky-200",
      title: "South Suburban Outpatient Clinic",
      subtitle: "Bengaluru, Karnataka • Rapid OPD & Outpatient Clinic",
      department: "Electronic City Phase 1, Hosur Road, Bengaluru - 560100",
      timings: "OPD: 09:00 AM - 05:00 PM (Mon - Sat)",
      contact: "+91 80 2852 4000",
      desc: "Corporate mental wellness triage, outpatient psychiatric reviews, prescription refills, and clinical assessment hub.",
      keywords: ["electronic city", "bengaluru", "bangalore", "hosur road", "clinic", "suburban", "outpatient"],
      actionLabel: "View Center Details",
      action: () => scrollToSection('centers')
    }
  ];

  const cleanQuery = searchQuery.trim().toLowerCase();

  const searchResults = searchableCatalog.filter(item => {
    if (cleanQuery) {
      const matchesQuery = 
        item.title.toLowerCase().includes(cleanQuery) ||
        item.subtitle.toLowerCase().includes(cleanQuery) ||
        (item.desc && item.desc.toLowerCase().includes(cleanQuery)) ||
        (item.department && item.department.toLowerCase().includes(cleanQuery)) ||
        (item.qualification && item.qualification.toLowerCase().includes(cleanQuery)) ||
        (item.keywords && item.keywords.some(k => k.toLowerCase().includes(cleanQuery) || cleanQuery.includes(k.toLowerCase())));
      
      if (!matchesQuery) return false;
    }
    
    if (selectedSearchCategory === 'All') return true;
    return item.category === selectedSearchCategory;
  });

  const categoryCounts = {
    All: searchableCatalog.filter(item => {
      if (!cleanQuery) return true;
      return item.title.toLowerCase().includes(cleanQuery) ||
        item.subtitle.toLowerCase().includes(cleanQuery) ||
        (item.desc && item.desc.toLowerCase().includes(cleanQuery)) ||
        (item.department && item.department.toLowerCase().includes(cleanQuery)) ||
        (item.qualification && item.qualification.toLowerCase().includes(cleanQuery)) ||
        (item.keywords && item.keywords.some(k => k.toLowerCase().includes(cleanQuery) || cleanQuery.includes(k.toLowerCase())));
    }).length,
    Doctors: searchableCatalog.filter(item => item.category === 'Doctors' && (
      !cleanQuery || item.title.toLowerCase().includes(cleanQuery) || item.keywords.some(k => k.toLowerCase().includes(cleanQuery) || cleanQuery.includes(k.toLowerCase()))
    )).length,
    Specialties: searchableCatalog.filter(item => item.category === 'Specialties' && (
      !cleanQuery || item.title.toLowerCase().includes(cleanQuery) || item.keywords.some(k => k.toLowerCase().includes(cleanQuery) || cleanQuery.includes(k.toLowerCase()))
    )).length,
    'Lab Tests': searchableCatalog.filter(item => item.category === 'Lab Tests' && (
      !cleanQuery || item.title.toLowerCase().includes(cleanQuery) || item.keywords.some(k => k.toLowerCase().includes(cleanQuery) || cleanQuery.includes(k.toLowerCase()))
    )).length,
    Centers: searchableCatalog.filter(item => item.category === 'Centers' && (
      !cleanQuery || item.title.toLowerCase().includes(cleanQuery) || item.keywords.some(k => k.toLowerCase().includes(cleanQuery) || cleanQuery.includes(k.toLowerCase()))
    )).length,
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans selection:bg-amber-400 selection:text-slate-950">
      
      {/* ========================================================================= */}
      {/* 1. TOP APOLLO-STYLE UTILITY & EMERGENCY HELPLINE BAR */}
      {/* ========================================================================= */}
      <div className="bg-slate-950 text-slate-300 text-[11px] sm:text-xs py-2 px-4 border-b border-slate-800">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2 text-center sm:text-left">
          
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3">
            {/* Location Selector */}
            <div className="flex items-center gap-1.5 text-slate-300">
              <MapPin className="w-3.5 h-3.5 text-amber-400" />
              <span className="font-semibold text-white">Your Nearest Center:</span>
              <select 
                value={selectedLocation} 
                onChange={(e) => setSelectedLocation(e.target.value)}
                className="bg-slate-900 border border-slate-700 text-amber-300 rounded-lg px-2 py-0.5 text-[11px] font-bold outline-none cursor-pointer"
              >
                <option value="Bengaluru (Central Hub)">Bengaluru (Indiranagar)</option>
                <option value="Kolkata Specialty Clinic">Kolkata (Salt Lake)</option>
                <option value="Electronic City Clinic">Bengaluru (Electronic City)</option>
              </select>
            </div>

            <span className="hidden md:inline text-slate-700">|</span>
            <span className="hidden md:inline text-slate-400">NABH Accredited Psychiatric Hospital Network</span>
          </div>

          <div className="flex flex-wrap items-center justify-center sm:justify-end gap-3 text-slate-300">
            <span className="text-amber-400 font-bold flex items-center gap-1.5 bg-amber-400/10 px-2.5 py-0.5 rounded-full border border-amber-400/30">
              <PhoneCall className="w-3.5 h-3.5 animate-bounce" />
              <span>24x7 Emergency Crisis: 1800-599-0019</span>
            </span>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 2. MAIN APOLLO-STYLE NAVIGATION HEADER */}
      {/* ========================================================================= */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          
          {/* Logo & Brand Identity */}
          <AarogyamLogo size="md" subtitle="Hospitals" />

          {/* Desktop Navigation Links (Apollo-style) */}
          <nav className="hidden lg:flex items-center gap-6 text-xs font-bold text-slate-700">
            <button onClick={() => scrollToSection('services')} className="hover:text-amber-600 transition cursor-pointer">
              Clinical Services
            </button>
            <button onClick={() => scrollToSection('specialties')} className="hover:text-amber-600 transition cursor-pointer">
              Specialties &amp; Clinics
            </button>
            <button onClick={() => scrollToSection('specialist')} className="hover:text-amber-600 transition cursor-pointer">
              Our Specialists
            </button>
            <button onClick={() => scrollToSection('centers')} className="hover:text-amber-600 transition cursor-pointer">
              Hospital Centers
            </button>
            <button onClick={() => scrollToSection('stories')} className="hover:text-amber-600 transition cursor-pointer">
              Patient Stories
            </button>
            <button onClick={() => scrollToSection('portals')} className="hover:text-amber-600 transition cursor-pointer">
              Staff Portals
            </button>
          </nav>

          {/* Right Action CTAs: Apollo Yellow CTA */}
          <div className="hidden sm:flex items-center gap-3">
            <button
              onClick={() => handleOpenLogin('patient')}
              className="px-3.5 py-2.5 rounded-xl text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 transition cursor-pointer flex items-center gap-1.5"
            >
              <LogIn className="w-3.5 h-3.5" />
              <span>Sign In</span>
            </button>

            <button
              onClick={() => handleOpenLogin('patient')}
              className="px-5 py-2.5 rounded-xl text-xs font-black text-slate-950 bg-amber-400 hover:bg-amber-300 shadow-md shadow-amber-400/25 transition cursor-pointer flex items-center gap-2"
            >
              <Calendar className="w-4 h-4 text-slate-950" />
              <span>Book Appointment</span>
            </button>
          </div>

          {/* Mobile Menu Hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-xl text-slate-600 hover:bg-slate-100 transition cursor-pointer"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-b border-slate-200 bg-white px-4 pt-3 pb-6 space-y-3 animate-in slide-in-from-top-2">
            <nav className="flex flex-col space-y-2 text-sm font-semibold text-slate-700">
              <button onClick={() => scrollToSection('services')} className="text-left py-2 px-3 rounded-lg hover:bg-slate-50">
                Clinical Services
              </button>
              <button onClick={() => scrollToSection('specialties')} className="text-left py-2 px-3 rounded-lg hover:bg-slate-50">
                Specialties &amp; Clinics
              </button>
              <button onClick={() => scrollToSection('specialist')} className="text-left py-2 px-3 rounded-lg hover:bg-slate-50">
                Our Specialists
              </button>
              <button onClick={() => scrollToSection('centers')} className="text-left py-2 px-3 rounded-lg hover:bg-slate-50">
                Hospital Centers
              </button>
              <button onClick={() => scrollToSection('portals')} className="text-left py-2 px-3 rounded-lg hover:bg-slate-50">
                Staff Portals
              </button>
            </nav>
            <div className="pt-2 border-t border-slate-100 flex flex-col gap-2">
              <button
                onClick={() => handleOpenLogin('patient')}
                className="w-full py-2.5 rounded-xl text-xs font-black text-center text-slate-950 bg-amber-400 shadow-sm"
              >
                Book Appointment
              </button>
              <button
                onClick={() => handleOpenLogin('patient')}
                className="w-full py-2.5 rounded-xl text-xs font-bold text-center text-slate-700 bg-slate-100"
              >
                Sign In to Portal
              </button>
            </div>
          </div>
        )}
      </header>

      {/* ========================================================================= */}
      {/* 3. APOLLO HERO BANNER WITH SMART SEARCH */}
      {/* ========================================================================= */}
      <section className="relative bg-slate-950 text-white pt-14 pb-20 md:pt-20 md:pb-28 overflow-hidden border-b border-slate-800">
        
        {/* Soft Ambient Gemini Glow */}
        <div className="absolute right-0 top-0 w-96 h-96 rounded-full bg-amber-500/10 blur-3xl pointer-events-none" />
        <div className="absolute left-1/4 bottom-0 w-80 h-80 rounded-full bg-amber-400/15 blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            
            {/* Accreditation Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-400/15 border border-amber-400/30 text-amber-300 text-xs font-bold mb-6">
              <Sparkle className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
              <span>India's Leading Psychiatric &amp; Mental Health Hospital Network</span>
            </div>

            <h1 className="text-3xl sm:text-5xl md:text-6xl font-black tracking-tight leading-[1.12] text-white">
              Compassionate Care for Your <span className="text-amber-400">Mind &amp; Emotional</span> Well-Being.
            </h1>

            <p className="mt-5 text-sm sm:text-base text-slate-300 leading-relaxed max-w-2xl mx-auto">
              Connect with India’s top psychiatrists, clinical psychologists, and neuropsychiatrists.
              Confidential in-person outpatient consultations and secure 24/7 digital care.
            </p>

            {/* Apollo-Style Smart Healthcare Search Bar */}
            <div ref={searchContainerRef} className="mt-8 bg-white/10 backdrop-blur-md p-2 rounded-2xl border border-white/20 shadow-2xl max-w-2xl mx-auto relative z-30 transition-all duration-200">
              <form 
                onSubmit={(e) => {
                  e.preventDefault();
                  setIsSearchOpen(true);
                }}
                className="flex flex-col sm:flex-row items-center gap-2"
              >
                <div className="relative w-full">
                  <Search className="w-5 h-5 text-slate-400 absolute left-3.5 top-3.5" />
                  <input
                    type="text"
                    value={searchQuery}
                    onFocus={() => setIsSearchOpen(true)}
                    onChange={(e) => {
                      setSearchQuery(e.target.value);
                      setIsSearchOpen(true);
                    }}
                    placeholder="Search doctor, condition, test, or clinic (e.g. Anxiety, Dr. Shashank)..."
                    className="w-full pl-11 pr-10 py-3 text-xs sm:text-sm bg-white text-slate-900 rounded-xl outline-none font-medium placeholder:text-slate-400 focus:ring-2 focus:ring-amber-400 shadow-inner"
                  />
                  {searchQuery && (
                    <button
                      type="button"
                      onClick={() => {
                        setSearchQuery('');
                        setSelectedSearchCategory('All');
                      }}
                      className="absolute right-3 top-3 p-1 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition cursor-pointer"
                      title="Clear search"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  )}
                </div>
                <button
                  type="submit"
                  onClick={() => setIsSearchOpen(true)}
                  className="w-full sm:w-auto px-6 py-3 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs sm:text-sm whitespace-nowrap transition cursor-pointer shadow-md shadow-amber-400/20 flex items-center justify-center gap-1.5"
                >
                  <Search className="w-4 h-4 text-slate-950" />
                  <span>Find Care</span>
                </button>
              </form>

              {/* Quick trending search pills */}
              <div className="mt-2.5 px-2 py-1 flex flex-wrap items-center justify-center sm:justify-start gap-1.5 text-[11px] text-slate-300">
                <span className="text-slate-400 font-semibold">Specialized Care:</span>
                {['Adult Psychiatry', 'Anxiety & Panic', 'Clinical Depression', 'ADHD', 'Sleep Medicine', 'Psychotherapy'].map(tag => (
                  <button
                    key={tag}
                    type="button"
                    onClick={() => {
                      setSearchQuery(tag);
                      setSelectedSearchCategory('All');
                      setIsSearchOpen(true);
                    }}
                    className="px-2 py-0.5 rounded-md bg-white/10 hover:bg-amber-400 hover:text-slate-950 transition cursor-pointer text-slate-200"
                  >
                    {tag}
                  </button>
                ))}
              </div>

              {/* ================================================================= */}
              {/* REAL LIVE SEARCH RESULTS EXPANDABLE PANEL */}
              {/* ================================================================= */}
              {isSearchOpen && (
                <div className="mt-3 bg-white text-slate-900 rounded-2xl p-4 sm:p-5 shadow-2xl border border-slate-200 text-left animate-in fade-in slide-in-from-top-2 duration-200">
                  
                  {/* Top Status Header */}
                  <div className="flex items-center justify-between pb-3 border-b border-slate-200">
                    <div className="flex items-center gap-2">
                      <span className="flex h-2.5 w-2.5 relative">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
                      </span>
                      <span className="text-xs font-black text-slate-900 tracking-tight">
                        {cleanQuery ? 'Live Healthcare Search Results' : 'Aarogyam Clinical Directory'}
                      </span>
                      <span className="text-[11px] font-semibold text-slate-500 hidden sm:inline">
                        ({searchResults.length} {searchResults.length === 1 ? 'match' : 'matches'} {cleanQuery ? `for "${searchQuery}"` : 'available'})
                      </span>
                    </div>

                    <button
                      type="button"
                      onClick={() => setIsSearchOpen(false)}
                      className="px-2 py-1 rounded-lg hover:bg-slate-100 text-slate-500 hover:text-slate-900 transition cursor-pointer flex items-center gap-1 text-[11px] font-bold"
                      title="Close results (Esc)"
                    >
                      <span>Close</span>
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {/* Filter Categories Tabs */}
                  <div className="flex items-center gap-1.5 overflow-x-auto py-2.5 border-b border-slate-100 no-scrollbar">
                    {[
                      { id: 'All', label: 'All Resources', count: categoryCounts.All, icon: Sparkles },
                      { id: 'Doctors', label: 'Doctors', count: categoryCounts.Doctors, icon: Stethoscope },
                      { id: 'Specialties', label: 'Specialties', count: categoryCounts.Specialties, icon: Brain },
                      { id: 'Lab Tests', label: 'Lab Tests', count: categoryCounts['Lab Tests'], icon: FlaskConical },
                      { id: 'Centers', label: 'Centers', count: categoryCounts.Centers, icon: Building }
                    ].map(tab => {
                      const TabIcon = tab.icon;
                      const isActive = selectedSearchCategory === tab.id;
                      return (
                        <button
                          key={tab.id}
                          type="button"
                          onClick={() => setSelectedSearchCategory(tab.id)}
                          className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition cursor-pointer flex items-center gap-1.5 shrink-0 ${
                            isActive 
                              ? 'bg-amber-400 text-slate-950 shadow-xs' 
                              : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                          }`}
                        >
                          <TabIcon className="w-3.5 h-3.5" />
                          <span>{tab.label}</span>
                          <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-black ${
                            isActive ? 'bg-slate-950/15 text-slate-950' : 'bg-slate-200 text-slate-600'
                          }`}>
                            {tab.count}
                          </span>
                        </button>
                      );
                    })}
                  </div>

                  {/* Results List */}
                  <div className="mt-3 max-h-[380px] sm:max-h-[420px] overflow-y-auto space-y-2.5 pr-1 divide-y divide-slate-100">
                    {searchResults.length > 0 ? (
                      searchResults.map((item) => (
                        <div
                          key={item.id}
                          className="pt-2.5 first:pt-0 pb-1 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 hover:bg-amber-50/40 p-2.5 rounded-2xl transition duration-150 border border-transparent hover:border-amber-200/60"
                        >
                          {/* Left Item Details */}
                          <div className="flex items-start gap-3.5 flex-1 min-w-0">
                            {item.avatar ? (
                              <div className="relative shrink-0">
                                <img
                                  src={item.avatar}
                                  alt={item.title}
                                  className="w-13 h-13 rounded-2xl object-cover ring-2 ring-emerald-400/40 shadow-xs"
                                />
                                <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 border-2 border-white rounded-full" />
                              </div>
                            ) : (
                              <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 border ${
                                item.category === 'Specialties' ? 'bg-amber-50 border-amber-200 text-amber-600' :
                                item.category === 'Lab Tests' ? 'bg-purple-50 border-purple-200 text-purple-600' :
                                'bg-sky-50 border-sky-200 text-sky-600'
                              }`}>
                                {item.category === 'Specialties' && <Brain className="w-6 h-6" />}
                                {item.category === 'Lab Tests' && <FlaskConical className="w-6 h-6" />}
                                {item.category === 'Centers' && <Building className="w-6 h-6" />}
                              </div>
                            )}

                            <div className="min-w-0 flex-1">
                              <div className="flex flex-wrap items-center gap-1.5 mb-1">
                                <span className={`text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full border ${item.badgeColor || 'bg-slate-100 text-slate-700 border-slate-200'}`}>
                                  {item.badge}
                                </span>
                                <span className="text-[10px] font-bold text-slate-500 bg-slate-100 px-2 py-0.5 rounded-full">
                                  {item.category}
                                </span>
                                {item.fee && (
                                  <span className="text-[10px] font-black text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-full border border-emerald-200">
                                    Fee: {item.fee}
                                  </span>
                                )}
                              </div>

                              <h4 className="text-sm font-black text-slate-900 truncate">
                                {item.title}
                              </h4>
                              
                              <p className="text-xs text-slate-600 line-clamp-1 mt-0.5">
                                {item.subtitle}
                              </p>

                              <div className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] text-slate-500">
                                {item.department && (
                                  <span className="flex items-center gap-1">
                                    <span className="font-semibold text-slate-700">{item.department}</span>
                                  </span>
                                )}
                                {item.timings && (
                                  <span className="flex items-center gap-1 text-slate-500">
                                    <Clock className="w-3 h-3 text-slate-400" />
                                    <span>{item.timings}</span>
                                  </span>
                                )}
                              </div>
                            </div>
                          </div>

                          {/* Right CTA */}
                          <div className="w-full sm:w-auto shrink-0 flex items-center justify-end">
                            <button
                              type="button"
                              onClick={() => {
                                setIsSearchOpen(false);
                                item.action();
                              }}
                              className={`w-full sm:w-auto px-4 py-2 rounded-xl text-xs font-black transition cursor-pointer flex items-center justify-center gap-1.5 shadow-xs ${
                                item.category === 'Doctors' 
                                  ? 'bg-amber-400 hover:bg-amber-300 text-slate-950' 
                                  : item.category === 'Specialties'
                                  ? 'bg-slate-900 hover:bg-slate-800 text-white'
                                  : item.category === 'Lab Tests'
                                  ? 'bg-purple-600 hover:bg-purple-700 text-white'
                                  : 'bg-sky-600 hover:bg-sky-700 text-white'
                              }`}
                            >
                              <span>{item.actionLabel}</span>
                              <ChevronRight className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      ))
                    ) : (
                      /* 0 Results Empty State */
                      <div className="py-8 px-4 text-center">
                        <div className="w-12 h-12 rounded-2xl bg-amber-50 border border-amber-200 flex items-center justify-center mx-auto text-amber-600 mb-3">
                          <AlertCircle className="w-6 h-6" />
                        </div>
                        <h4 className="text-sm font-black text-slate-900">
                          No clinical resources found matching "{searchQuery}"
                        </h4>
                        <p className="text-xs text-slate-500 max-w-md mx-auto mt-1">
                          We could not locate an exact match. Try selecting "All Resources" or choose one of our verified clinical services:
                        </p>

                        <div className="mt-4 flex flex-wrap items-center justify-center gap-1.5 max-w-lg mx-auto">
                          {[
                            { label: 'Dr. Shashank Pandey', query: 'Dr. Shashank' },
                            { label: 'Anxiety & Panic', query: 'Anxiety' },
                            { label: 'Clinical Depression', query: 'Depression' },
                            { label: 'ADHD Evaluation', query: 'ADHD' },
                            { label: 'Sleep Medicine', query: 'Sleep' },
                            { label: 'PHQ-9 Scale', query: 'PHQ-9' },
                            { label: 'Blood Panel', query: 'Blood' },
                            { label: 'Bengaluru Central', query: 'Bengaluru' }
                          ].map(s => (
                            <button
                              key={s.label}
                              type="button"
                              onClick={() => {
                                setSearchQuery(s.query);
                                setSelectedSearchCategory('All');
                              }}
                              className="px-2.5 py-1 rounded-lg text-xs font-bold bg-slate-100 hover:bg-amber-400 hover:text-slate-950 text-slate-700 transition cursor-pointer"
                            >
                              {s.label}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Bottom Footer Info */}
                  <div className="mt-3 pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between text-[11px] text-slate-500">
                    <span className="flex items-center gap-1 font-medium">
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                      <span>DISHA Certified • Confidential Healthcare Management</span>
                    </span>
                    <button
                      type="button"
                      onClick={() => {
                        setIsSearchOpen(false);
                        handleOpenLogin('patient');
                      }}
                      className="font-bold text-amber-600 hover:text-amber-700 flex items-center gap-1 cursor-pointer"
                    >
                      <span>Patient Health Portal</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <button
                onClick={() => handleOpenLogin('patient')}
                className="px-6 py-3.5 rounded-2xl bg-amber-400 hover:bg-amber-300 text-slate-950 text-xs sm:text-sm font-black shadow-lg shadow-amber-400/25 transition cursor-pointer flex items-center gap-2"
              >
                <Calendar className="w-4 h-4 text-slate-950" />
                <span>Book In-Clinic Consultation</span>
              </button>

              <button
                onClick={() => scrollToSection('specialist')}
                className="px-6 py-3.5 rounded-2xl bg-white/10 hover:bg-white/15 text-white border border-white/20 text-xs sm:text-sm font-bold shadow-xs transition cursor-pointer flex items-center gap-2"
              >
                <Stethoscope className="w-4 h-4 text-amber-400" />
                <span>Doctor Availability &amp; OPD</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 4. APOLLO-STYLE 6 QUICK-ACTION SERVICE TILES (FLOATING GRID) */}
      {/* ========================================================================= */}
      <section id="services" className="relative -mt-10 z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {quickActionTiles.map((tile) => {
            const Icon = tile.icon;
            return (
              <div
                key={tile.id}
                onClick={tile.action}
                className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-lg hover:shadow-xl hover:-translate-y-1 transition duration-200 cursor-pointer flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className={`w-12 h-12 rounded-2xl bg-linear-to-tr ${tile.accent} flex items-center justify-center shadow-md`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-full bg-slate-100 text-slate-700 border border-slate-200 group-hover:border-amber-400 transition">
                      {tile.badge}
                    </span>
                  </div>

                  <h3 className="text-base font-black text-slate-900 group-hover:text-amber-600 transition">
                    {tile.title}
                  </h3>
                  <p className="mt-1.5 text-xs text-slate-600 leading-relaxed">
                    {tile.desc}
                  </p>
                </div>

                <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-slate-800 group-hover:text-amber-600">
                  <span>{tile.cta}</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition" />
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 5. CLINICAL EXCELLENCE & HOSPITAL STATS COUNTER */}
      {/* ========================================================================= */}
      <section className="py-16 bg-white border-b border-slate-200/80 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            
            <div className="p-4 border-r border-slate-100 last:border-0">
              <p className="text-3xl sm:text-4xl font-black text-slate-900">50,000+</p>
              <p className="text-xs text-slate-500 font-bold uppercase tracking-wider mt-1">Consultations Completed</p>
            </div>

            <div className="p-4 border-r border-slate-100 last:border-0">
              <p className="text-3xl sm:text-4xl font-black text-amber-500">99.4%</p>
              <p className="text-xs text-slate-500 font-bold uppercase tracking-wider mt-1">Clinical Recovery &amp; Satisfaction</p>
            </div>

            <div className="p-4 border-r border-slate-100 last:border-0">
              <p className="text-3xl sm:text-4xl font-black text-slate-900">3 Regional</p>
              <p className="text-xs text-slate-500 font-bold uppercase tracking-wider mt-1">Hospital &amp; OPD Centers</p>
            </div>

            <div className="p-4">
              <p className="text-3xl sm:text-4xl font-black text-emerald-600">100%</p>
              <p className="text-xs text-slate-500 font-bold uppercase tracking-wider mt-1">Confidential Digital Health Records</p>
            </div>

          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 6. CLINICAL SPECIALTIES (APOLLO CENTRES OF EXCELLENCE) */}
      {/* ========================================================================= */}
      <section id="specialties" className="py-20 bg-slate-50 border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-black uppercase tracking-wider text-amber-600 bg-amber-100 px-3 py-1 rounded-full border border-amber-300">
              Specialties &amp; Clinics
            </span>
            <h2 className="mt-3 text-2xl sm:text-4xl font-black text-slate-950 tracking-tight">
              Centres of Clinical Excellence
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-2">
              Comprehensive psychiatric, psychometric, and behavioral health programs delivered by senior clinicians.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {clinicalSpecialties.map((spec, i) => {
              const Icon = spec.icon;
              return (
                <div key={i} className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs hover:shadow-md transition">
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 rounded-2xl bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-600">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-600">
                      {spec.tag}
                    </span>
                  </div>

                  <h3 className="text-base font-black text-slate-900">{spec.name}</h3>
                  <p className="mt-2 text-xs text-slate-600 leading-relaxed">{spec.desc}</p>

                  <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between">
                    <button
                      onClick={() => handleOpenLogin('patient')}
                      className="text-xs font-bold text-amber-600 hover:text-amber-700 flex items-center gap-1 cursor-pointer"
                    >
                      <span>Consult Specialist</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 7. OUR MEDICAL SPECIALISTS (APOLLO DOCTOR SHOWCASE) */}
      {/* ========================================================================= */}
      <section id="specialist" className="py-20 bg-white border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-black uppercase tracking-wider text-amber-600 bg-amber-100 px-3 py-1 rounded-full border border-amber-300">
              Medical Leadership
            </span>
            <h2 className="mt-3 text-2xl sm:text-4xl font-black text-slate-950 tracking-tight">
              Our Senior Medical Specialists
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-2">
              Trained at premier clinical institutions, bringing decades of diagnostic expertise and compassionate patient care.
            </p>
          </div>

          <div className="max-w-4xl mx-auto bg-slate-950 text-white rounded-3xl p-6 sm:p-10 shadow-2xl relative overflow-hidden border border-slate-800">
            
            {/* Background Ambient Glow */}
            <div className="absolute right-0 top-0 w-80 h-80 rounded-full bg-amber-500/10 blur-3xl pointer-events-none" />

            <div className="relative z-10 flex flex-col md:flex-row items-center md:items-start gap-8 justify-between">
              
              <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 text-center sm:text-left">
                <img
                  src={attendingDoctor.avatar}
                  alt={attendingDoctor.name}
                  className="w-32 h-32 sm:w-40 sm:h-40 rounded-3xl object-cover ring-4 ring-amber-400/40 shadow-xl shrink-0"
                />

                <div>
                  <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 mb-2">
                    <span className="px-3 py-1 rounded-full text-[11px] font-black bg-amber-400 text-slate-950">
                      Chief Consultant Psychiatrist
                    </span>
                    <span className="flex items-center gap-1 text-[11px] font-bold text-amber-300 bg-white/10 px-2.5 py-0.5 rounded-full">
                      <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                      4.9 (420+ Patient Reviews)
                    </span>
                  </div>

                  <h3 className="text-2xl sm:text-3xl font-black text-white">{attendingDoctor.name}</h3>
                  <p className="text-sm font-semibold text-amber-300 mt-0.5">{attendingDoctor.title}</p>
                  <p className="text-xs text-slate-300 mt-1">{attendingDoctor.qualification}</p>

                  <div className="mt-4 flex flex-wrap justify-center sm:justify-start gap-2.5 text-xs text-slate-300">
                    <span className="flex items-center gap-1.5 bg-slate-900 px-3 py-1.5 rounded-xl border border-slate-700">
                      <Clock className="w-3.5 h-3.5 text-amber-400" />
                      {attendingDoctor.experience}
                    </span>
                    <span className="flex items-center gap-1.5 bg-slate-900 px-3 py-1.5 rounded-xl border border-slate-700">
                      <MapPin className="w-3.5 h-3.5 text-sky-400" />
                      {attendingDoctor.roomNumber}
                    </span>
                    <span className="flex items-center gap-1.5 bg-slate-900 px-3 py-1.5 rounded-xl border border-slate-700">
                      <span className="font-black text-amber-400">₹{attendingDoctor.consultationFee}</span>
                      <span>OPD Fee</span>
                    </span>
                  </div>

                  <p className="mt-4 text-xs text-slate-400 leading-relaxed">
                    Available for comprehensive psychiatric evaluations, medication management, and specialized neuro-behavioral care.
                  </p>
                </div>
              </div>

              {/* Action Buttons for Specialist */}
              <div className="flex flex-col gap-2.5 w-full md:w-auto shrink-0">
                <button
                  onClick={() => handleOpenLogin('patient')}
                  className="w-full px-6 py-3.5 rounded-2xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs sm:text-sm shadow-md shadow-amber-400/25 transition cursor-pointer text-center"
                >
                  Book In-Clinic Visit
                </button>
                <button
                  onClick={() => scrollToSection('centers')}
                  className="w-full px-6 py-3 rounded-2xl bg-white/10 hover:bg-white/15 text-white border border-white/20 font-bold text-xs transition cursor-pointer text-center flex items-center justify-center gap-1.5"
                >
                  <MapPin className="w-4 h-4 text-amber-400" />
                  <span>View Hospital Centers</span>
                </button>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 8. OUR HOSPITAL & CLINIC LOCATIONS */}
      {/* ========================================================================= */}
      <section id="centers" className="py-20 bg-slate-50 border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-black uppercase tracking-wider text-amber-600 bg-amber-100 px-3 py-1 rounded-full border border-amber-300">
              Hospital Network
            </span>
            <h2 className="mt-3 text-2xl sm:text-4xl font-black text-slate-950 tracking-tight">
              Our Advanced Healthcare Centers
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-2">
              Integrated hospital facilities with inpatient suites, psychiatric day-care, and outpatient clinics.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {hospitalCenters.map((hub, i) => (
              <div key={i} className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs hover:shadow-md transition flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="px-2.5 py-0.5 text-[10px] font-black rounded-full bg-amber-100 text-amber-900 border border-amber-200">
                      {hub.type}
                    </span>
                    <span className="text-xs font-bold text-emerald-600 flex items-center gap-1">
                      <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                      Open Now
                    </span>
                  </div>

                  <h3 className="text-base font-black text-slate-900">{hub.name}</h3>
                  <p className="text-xs text-amber-600 font-bold mt-0.5">{hub.city}</p>
                  
                  <div className="mt-4 pt-3 border-t border-slate-100 space-y-2 text-xs text-slate-600">
                    <p className="flex items-start gap-2">
                      <MapPin className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                      <span>{hub.address}</span>
                    </p>
                    <p className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-slate-400 shrink-0" />
                      <span>{hub.timings}</span>
                    </p>
                    <p className="flex items-center gap-2">
                      <PhoneCall className="w-4 h-4 text-slate-400 shrink-0" />
                      <span className="font-semibold text-slate-900">{hub.contact}</span>
                    </p>
                  </div>
                </div>

                <div className="mt-6 pt-3 border-t border-slate-100">
                  <button
                    onClick={() => handleOpenLogin('patient')}
                    className="w-full py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs transition cursor-pointer"
                  >
                    View Center Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 9. PATIENT STORIES & RECOVERY JOURNEYS */}
      {/* ========================================================================= */}
      <section id="stories" className="py-20 bg-white border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-black uppercase tracking-wider text-amber-600 bg-amber-100 px-3 py-1 rounded-full border border-amber-300">
              Healing Journeys
            </span>
            <h2 className="mt-3 text-2xl sm:text-4xl font-black text-slate-950 tracking-tight">
              Real Experiences, Restored Lives
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-2">
              Patients share their clinical journey towards mental clarity, emotional resilience, and lifelong well-being.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {patientStories.map((story, i) => (
              <div key={i} className="bg-slate-50 rounded-3xl p-7 border border-slate-200/80 shadow-xs flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-1 text-amber-500 mb-3">
                    {[...Array(5)].map((_, idx) => (
                      <Star key={idx} className="w-4 h-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <p className="text-xs sm:text-sm text-slate-700 italic leading-relaxed">
                    "{story.quote}"
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-200 flex items-center justify-between">
                  <div>
                    <p className="text-xs font-black text-slate-900">{story.patient}</p>
                    <p className="text-[11px] text-slate-500">{story.treatment}</p>
                  </div>
                  <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full border border-emerald-200">
                    {story.recovery}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 10. CLINICAL STAFF & FRONT DESK ADMISSIONS PORTALS */}
      {/* ========================================================================= */}
      <section id="portals" className="py-20 bg-slate-50 border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-black uppercase tracking-wider text-amber-800 bg-amber-100 px-3.5 py-1 rounded-full border border-amber-300">
              Staff &amp; Clinical Portals
            </span>
            <h2 className="mt-3 text-2xl sm:text-4xl font-black text-slate-950 tracking-tight">
              Hospital Staff &amp; Clinical Desks
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-2 max-w-xl mx-auto">
              Dedicated, secure gateways engineered for attending medical specialists and outpatient front-desk reception coordination.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            
            {/* 1. Doctor & Specialist Suite */}
            <div className="bg-white rounded-3xl p-7 sm:p-8 border-2 border-emerald-400/30 hover:border-emerald-500 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-14 h-14 rounded-2xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold border border-emerald-200 group-hover:scale-105 transition-transform">
                    <Stethoscope className="w-7 h-7 text-emerald-700" />
                  </div>
                  <span className="text-[11px] font-bold text-emerald-800 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200 flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    Attending Clinicians
                  </span>
                </div>

                <h3 className="text-xl font-black text-slate-900">Doctor &amp; Specialist Suite</h3>
                <p className="text-xs text-emerald-700 font-bold mt-1">Clinical Consultations, E-Prescriptions &amp; Diagnostics</p>
                <p className="text-xs text-slate-600 mt-3 leading-relaxed">
                  Direct clinical console for reviewing patient queues, issuing tamper-proof digital prescriptions, accessing longitudinal psychological records, and ordering lab diagnostics.
                </p>

                {/* Capability Badges */}
                <div className="mt-4 flex flex-wrap gap-2 text-[11px]">
                  <span className="bg-slate-100 text-slate-700 px-2.5 py-1 rounded-lg font-semibold border border-slate-200">
                    Live Consultation Queue
                  </span>
                  <span className="bg-slate-100 text-slate-700 px-2.5 py-1 rounded-lg font-semibold border border-slate-200">
                    E-Prescription Pad
                  </span>
                  <span className="bg-slate-100 text-slate-700 px-2.5 py-1 rounded-lg font-semibold border border-slate-200">
                    Diagnostic Lab Orders
                  </span>
                </div>
              </div>

              <div className="mt-8 pt-5 border-t border-slate-100">
                <button
                  onClick={() => handleOpenLogin('doctor')}
                  className="w-full py-3.5 px-6 rounded-2xl bg-emerald-600 hover:bg-emerald-500 active:scale-[0.99] text-white font-extrabold text-xs sm:text-sm shadow-md shadow-emerald-600/20 transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Stethoscope className="w-4 h-4" />
                  <span>Doctor Sign In</span>
                  <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>

            {/* 2. Front Desk Reception & Admissions */}
            <div className="bg-white rounded-3xl p-7 sm:p-8 border-2 border-sky-400/30 hover:border-sky-500 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-14 h-14 rounded-2xl bg-sky-100 text-sky-800 flex items-center justify-center font-bold border border-sky-200 group-hover:scale-105 transition-transform">
                    <Building className="w-7 h-7 text-sky-700" />
                  </div>
                  <span className="text-[11px] font-bold text-sky-800 bg-sky-50 px-3 py-1 rounded-full border border-sky-200 flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-sky-500 animate-pulse" />
                    Front Desk Coordination
                  </span>
                </div>

                <h3 className="text-xl font-black text-slate-900">Reception &amp; Admissions Desk</h3>
                <p className="text-xs text-sky-700 font-bold mt-1">Outpatient Triage, Scheduling &amp; Billing Desk</p>
                <p className="text-xs text-slate-600 mt-3 leading-relaxed">
                  Front-desk coordination interface to register new walk-in patients, manage real-time appointments, track waiting room occupancy, and generate formal billing invoices.
                </p>

                {/* Capability Badges */}
                <div className="mt-4 flex flex-wrap gap-2 text-[11px]">
                  <span className="bg-slate-100 text-slate-700 px-2.5 py-1 rounded-lg font-semibold border border-slate-200">
                    Walk-In Patient Intake
                  </span>
                  <span className="bg-slate-100 text-slate-700 px-2.5 py-1 rounded-lg font-semibold border border-slate-200">
                    OPD Schedule Triage
                  </span>
                  <span className="bg-slate-100 text-slate-700 px-2.5 py-1 rounded-lg font-semibold border border-slate-200">
                    Billing &amp; Invoices
                  </span>
                </div>
              </div>

              <div className="mt-8 pt-5 border-t border-slate-100">
                <button
                  onClick={() => handleOpenLogin('receptionist')}
                  className="w-full py-3.5 px-6 rounded-2xl bg-sky-600 hover:bg-sky-500 active:scale-[0.99] text-white font-extrabold text-xs sm:text-sm shadow-md shadow-sky-600/20 transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Building className="w-4 h-4" />
                  <span>Receptionist Sign In</span>
                  <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 11. APOLLO-STYLE MEGA FOOTER */}
      {/* ========================================================================= */}
      <footer className="mt-auto bg-slate-950 text-slate-400 text-xs border-t border-slate-800 pt-16 pb-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 md:grid-cols-5 gap-10 pb-12 border-b border-slate-800">
            
            {/* Column 1: Brand Info */}
            <div className="md:col-span-2">
              <div className="mb-4">
                <AarogyamLogo size="md" variant="dark" subtitle="Hospitals" />
              </div>
              <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
                Aarogyam is India’s premier mental healthcare network dedicated to compassionate, evidence-based psychiatric consultations, neuro-behavioral therapy, and confidential digital health records.
              </p>

              <div className="mt-5 space-y-2 text-xs">
                <p className="text-amber-400 font-bold flex items-center gap-2">
                  <PhoneCall className="w-4 h-4" />
                  <span>24x7 Mental Crisis Helpline: 1800-599-0019</span>
                </p>
                <p className="text-slate-300 flex items-center gap-2">
                  <Building className="w-4 h-4 text-slate-500" />
                  <span>Central Healthcare Hub: Indiranagar, Bengaluru, KA</span>
                </p>
              </div>
            </div>

            {/* Column 2: Clinical Specialties */}
            <div>
              <p className="font-black text-white text-xs uppercase tracking-wider mb-4">Specialties</p>
              <ul className="space-y-2 text-xs text-slate-400">
                <li>Adult Mood &amp; Depression</li>
                <li>Anxiety, Panic &amp; OCD Clinic</li>
                <li>Child &amp; Adolescent Health</li>
                <li>Neuropsychiatry &amp; Memory</li>
                <li>Sleep Medicine &amp; Circadian</li>
                <li>Psychotherapy &amp; Counseling</li>
              </ul>
            </div>

            {/* Column 3: Patient Services */}
            <div>
              <p className="font-black text-white text-xs uppercase tracking-wider mb-4">Patient Services</p>
              <ul className="space-y-2 text-xs text-slate-400">
                <li>Book Doctor Consultation</li>
                <li>In-Clinic Consultations</li>
                <li>Pharmacy &amp; Prescription Refills</li>
                <li>Diagnostic Lab Tests</li>
                <li>Emergency Psychiatric Triage</li>
                <li>Confidential Health Records</li>
              </ul>
            </div>

            {/* Column 4: Hospital Quality & Standards */}
            <div>
              <p className="font-black text-white text-xs uppercase tracking-wider mb-4">Quality &amp; Safety</p>
              <ul className="space-y-2 text-xs text-slate-400">
                <li>NABH Accredited Care</li>
                <li>DISHA Health Standards</li>
                <li>Mental Healthcare Act (MHA)</li>
                <li>256-Bit Encrypted Data</li>
                <li>Zero-Stigma Clinical Dignity</li>
                <li>Patient Privacy Guarantee</li>
              </ul>
            </div>

          </div>

          <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500">
            <p>© 2026 Aarogyam Healthcare Systems Pvt. Ltd. All rights reserved.</p>
            <div className="flex gap-4">
              <span className="hover:text-slate-400 cursor-pointer">Privacy Policy</span>
              <span>•</span>
              <span className="hover:text-slate-400 cursor-pointer">Terms of Service</span>
              <span>•</span>
              <span className="hover:text-slate-400 cursor-pointer">Patient Bill of Rights</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};
