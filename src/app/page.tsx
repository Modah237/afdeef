"use client";

import React, { useState } from "react";
import Image from "next/image";
import {
  Heart,
  Shield,
  FileText,
  Phone,
  Mail,
  MapPin,
  Download,
  Users,
  CheckCircle2,
  TrendingUp,
  Award,
  ArrowRight,
  ExternalLink,
  ChevronRight,
  Play,
  Share2,
  Calendar,
  Sparkles,
  DollarSign,
  Smartphone,
  CreditCard,
  Building2,
  AlertCircle,
  HelpCircle,
  Sun,
  Smile,
  Globe,
  Check,
  ChevronDown,
  Layers,
  Percent,
  BookOpen,
  Crown,
  BadgeCheck,
} from "lucide-react";

export default function HomePage() {
  // Currency: XAF, EUR, USD
  const [currency, setCurrency] = useState<"XAF" | "EUR" | "USD">("XAF");
  const currencyRates = { XAF: 1, EUR: 0.0015, USD: 0.0016 };
  const currencySymbols = { XAF: "FCFA", EUR: "€", USD: "$" };

  // Donation state
  const [donationFrequency, setDonationFrequency] = useState<"once" | "monthly">("once");
  const [selectedAmountXAF, setSelectedAmountXAF] = useState<number>(25000);
  const [customAmountXAF, setCustomAmountXAF] = useState<string>("");
  const [selectedProject, setSelectedProject] = useState<string>("burnout");
  const [paymentMethod, setPaymentMethod] = useState<"fapshi_momo" | "fapshi_om" | "card" | "bank">("fapshi_momo");
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);

  // Gallery active filter
  const [galleryFilter, setGalleryFilter] = useState<"all" | "tableronde" | "autonomie" | "gala">("all");

  // FAQ open states
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const presetAmountsXAF = [5000, 15000, 25000, 50000, 100000];

  const formatAmount = (xaf: number) => {
    if (currency === "XAF") {
      return new Intl.NumberFormat("fr-FR").format(xaf) + " FCFA";
    }
    const converted = xaf * currencyRates[currency];
    return `${converted.toFixed(currency === "EUR" ? 1 : 1)} ${currencySymbols[currency]}`;
  };

  const projects = [
    {
      id: "burnout",
      title: "Cellule d'Écoute & Lutte contre le Burn-Out Maternel",
      tag: "Santé Mentale & Sororité",
      targetXAF: 7500000,
      raisedXAF: 4350000,
      beneficiaries: "350 mères et leurs foyers",
      odd: "ODD 3 : Santé & Bien-être",
      accent: "#BE185D", // Rose rubis
      badgeColor: "bg-pink-100 text-[#BE185D] border-pink-200",
      description:
        "Permanences d'écoute psychologique confidentielles, ateliers de décompression pour mères surmenées et accompagnement médical bienveillant.",
      impactExample: "25 000 FCFA = 1 prise en charge psycho-émotionnelle complète d'une mère.",
      urgent: true,
    },
    {
      id: "agr",
      title: "Fonds Rotatif d'Autonomie Économique pour 100 Mères",
      tag: "Autonomie & Entrepreneuriat",
      targetXAF: 12000000,
      raisedXAF: 5200000,
      beneficiaries: "100 femmes cheffes de foyer",
      odd: "ODD 5 & 8 : Égalité & Travail Décent",
      accent: "#16A34A", // Vert émeraude
      badgeColor: "bg-emerald-100 text-emerald-800 border-emerald-200",
      description:
        "Micro-financements à taux zéro, formations pratiques en gestion commerciale et kits de démarrage pour activités génératrices de revenus.",
      impactExample: "50 000 FCFA = 1 kit d'amorçage commercial complet pour une micro-entreprise.",
      urgent: false,
    },
    {
      id: "enfants",
      title: "Caravane Éducation & Soutien aux Enfants Vulnérables",
      tag: "Protection & Orphelinats",
      targetXAF: 5000000,
      raisedXAF: 3600000,
      beneficiaries: "200 orphelins et enfants scolarisés",
      odd: "ODD 4 : Éducation de Qualité",
      accent: "#EA580C", // Orange safran
      badgeColor: "bg-amber-100 text-amber-800 border-amber-200",
      description:
        "Prise en charge des bourses et fournitures scolaires, distributions de denrées essentielles et accompagnement affectif des orphelinats partenaires.",
      impactExample: "15 000 FCFA = 1 pack scolaire complet (frais + livres + uniforme).",
      urgent: false,
    },
  ];

  const currentProject = projects.find((p) => p.id === selectedProject) || projects[0];

  const galleryItems = [
    {
      title: "Le Bureau Exécutif AFDEEF en Pleine Séance Officielle",
      category: "tableronde",
      image: "/images/panel_comite.jpg",
      caption: "Membres du bureau vêtues des gilets officiels, unies pour la résilience des familles.",
    },
    {
      title: "Prise de Notes & Recueillement des Participantes",
      category: "tableronde",
      image: "/images/assemblee_notes.jpg",
      caption: "Plus de 100 mères et femmes leaders réunies autour du livret officiel de décompression.",
    },
    {
      title: "Allocution Solennelle de la Présidente Fondatrice",
      category: "tableronde",
      image: "/images/presidente_discours.jpg",
      caption: "Mme Elvire FOKAM alerte sur la charge mentale et l'épuisement silencieux des épouses.",
    },
    {
      title: "Célébration, Élégance & Sororité Féminine",
      category: "gala",
      image: "/images/communaute_gala.jpg",
      caption: "Rayonnement, dignité et fierté de la femme africaine au cœur de nos actions.",
    },
    {
      title: "Santé Maternelle, Dépistage & Prévention Médicale",
      category: "autonomie",
      image: "/images/oratrice_burnout.jpg",
      caption: "Ateliers cliniques animés par nos praticiennes et médecins partenaires.",
    },
    {
      title: "L'Union Fait la Force pour nos Familles",
      category: "gala",
      image: "/images/celebration_femmes.jpg",
      caption: "Une sororité vivante et engagée qui transforme concrètement le quotidien des foyers.",
    },
  ];

  const filteredGallery =
    galleryFilter === "all" ? galleryItems : galleryItems.filter((i) => i.category === galleryFilter);

  const faqs = [
    {
      q: "Comment les fonds collectés par l'AFDEEF sont-ils contrôlés et utilisés ?",
      a: "L'AFDEEF applique un protocole de gouvernance stricte : 84% des fonds vont directement aux programmes d'aide sur le terrain (santé mentale, kits scolaires, micro-crédits AGR), 10% financent la permanence d'écoute et 6% couvrent l'administration et les audits légaux. Des rapports d'exécution semestriels sont transmis à tous nos partenaires.",
    },
    {
      q: "Les dons aux entreprises bénéficient-ils d'avantages fiscaux au Cameroun ?",
      a: "Oui. Conformément à l'Article 7 du Code Général des Impôts (CGI) du Cameroun, les dons et libéralités consentis aux associations à but non lucratif légalement déclarées (Récépissé N° 00000852/RDA) sont déductibles du résultat fiscal dans la limite légale autorisée.",
    },
    {
      q: "Comment faire un don depuis la diaspora (Europe, USA, Canada) ?",
      a: "Vous pouvez faire un don instantané par Carte Bancaire internationale (Visa / MasterCard) ou demander notre Relevé d'Identité Bancaire (RIB/IBAN officiel) pour un virement bancaire sécurisé vers le compte associatif de l'AFDEEF.",
    },
    {
      q: "Comment rejoindre l'AFDEEF en tant que membre ou bénévole ?",
      a: "Toute femme dynamique désireuse de s'engager pour l'épanouissement des foyers et la résilience collective peut adhérer en prenant contact directement via notre permanence WhatsApp au +237 678 04 64 26 ou en renseignant notre formulaire.",
    },
    {
      q: "Je me sens épuisée et au bord de la rupture : puis-je bénéficier d'une aide d'urgence ?",
      a: "Oui. Notre cellule d'écoute est anonyme, confidentielle et entièrement gratuite. Écrivez ou appelez notre ligne d'assistance au +237 678 04 64 26 pour être orientée vers nos praticiennes d'écoute et nos médecins conseils.",
    },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-[#FCFCFD] text-slate-800 antialiased selection:bg-pink-100 selection:text-pink-900">
      
      {/* 1. TOP BAR LUMINEUSE & DEVISE OFFICIELLE */}
      <div className="bg-gradient-to-r from-pink-50 via-amber-50/60 to-blue-50 text-slate-700 text-xs py-2.5 px-4 border-b border-pink-100">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
          
          <div className="flex items-center gap-2 flex-wrap">
            <span className="inline-flex items-center gap-1 font-black text-[#BE185D] bg-white px-3 py-0.5 rounded-full border border-pink-200 shadow-2xs">
              <Sparkles className="w-3.5 h-3.5 text-[#BE185D]" /> Organisation Reconnue d'Utilité Sociale
            </span>
            <span className="font-mono text-slate-800 font-bold">
              Récépissé N° 00000852/RDA/JO6/A2/SAAJP/BAPP
            </span>
            <span className="hidden md:inline text-slate-400">•</span>
            <span className="hidden md:inline text-slate-600 font-medium">Préfecture du Mfoundi • Yaoundé</span>
          </div>

          <div className="flex items-center gap-3">
            {/* Currency selector for Diaspora */}
            <div className="flex items-center gap-1 bg-white px-2.5 py-1 rounded-xl border border-pink-200 text-[11px] font-black text-slate-700 shadow-2xs">
              <Globe className="w-3.5 h-3.5 text-pink-500" />
              <span>Devise :</span>
              <button
                onClick={() => setCurrency("XAF")}
                className={`px-1.5 py-0.5 rounded-md transition-all cursor-pointer ${currency === "XAF" ? "bg-[#BE185D] text-white shadow-2xs" : "hover:text-[#BE185D]"}`}
              >
                FCFA
              </button>
              <button
                onClick={() => setCurrency("EUR")}
                className={`px-1.5 py-0.5 rounded-md transition-all cursor-pointer ${currency === "EUR" ? "bg-[#BE185D] text-white shadow-2xs" : "hover:text-[#BE185D]"}`}
              >
                EUR
              </button>
              <button
                onClick={() => setCurrency("USD")}
                className={`px-1.5 py-0.5 rounded-md transition-all cursor-pointer ${currency === "USD" ? "bg-[#BE185D] text-white shadow-2xs" : "hover:text-[#BE185D]"}`}
              >
                USD
              </button>
            </div>

            <span className="text-pink-300">|</span>

            <a
              href="https://wa.me/237678046426?text=Bonjour%20AFDEEF,%20je%20souhaite%20des%20informations%20sur%20vos%20programmes"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-[#BE185D] hover:text-pink-800 font-black transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-emerald-600" /> +237 678 04 64 26
            </a>
          </div>
        </div>
      </div>

      {/* 2. HEADER PRINCIPAL AVEC LOGO VECTORIEL VECTOR-CRISP SUBLIME */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-pink-100/70 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-24 flex items-center justify-between">
          
          {/* Logo Authentique Officiel AFDEEF */}
          <a href="#" className="flex items-center gap-3 group">
            <div className="relative h-16 sm:h-20 w-auto transition-transform group-hover:scale-102 flex items-center">
              <img
                src="/images/logo_afdeef_complet.png"
                alt="Logo Officiel AFDEEF — Association des Femmes Dynamiques Engagées pour l'Épanouissement de la Famille"
                className="h-full w-auto object-contain"
              />
            </div>
          </a>

          {/* Navigation standard raffinée */}
          <nav className="hidden lg:flex items-center gap-8 text-sm font-bold text-slate-700">
            <a href="#mission" className="hover:text-[#BE185D] transition-colors">
              Nos Piliers
            </a>
            <a href="#documentaire" className="hover:text-[#BE185D] transition-colors">
              Documentaire & Écoute
            </a>
            <a href="#projets" className="hover:text-[#BE185D] transition-colors">
              Projets Bailleurs
            </a>
            <a href="#galerie" className="hover:text-[#BE185D] transition-colors">
              Galerie Terrain
            </a>
            <a href="#transparence" className="hover:text-[#BE185D] transition-colors">
              Transparence & Statuts
            </a>
            <a href="#faq" className="hover:text-[#BE185D] transition-colors">
              FAQ
            </a>
          </nav>

          <div className="flex items-center gap-3">
            <a
              href="#partenaires"
              className="hidden sm:inline-flex items-center gap-1.5 text-xs font-black text-[#1D4ED8] bg-blue-50/80 hover:bg-blue-100 px-4 py-2.5 rounded-xl transition-all border border-blue-200"
            >
              <Building2 className="w-4 h-4 text-[#1D4ED8]" /> Espace RSE
            </a>
            <a
              href="#don"
              className="inline-flex items-center gap-2 text-sm font-black text-white bg-gradient-to-r from-[#BE185D] via-[#D946EF] to-[#1D4ED8] hover:opacity-95 px-6 py-3 rounded-2xl shadow-md transition-all hover:scale-102 hover:shadow-lg"
            >
              <Heart className="w-4 h-4 fill-white" /> Faire un Don
            </a>
          </div>
        </div>
      </header>

      {/* 3. HERO BANNER : ÉLÉGANCE, FEMMES & RAYONNEMENT FAMILIAL */}
      <section className="relative overflow-hidden bg-gradient-to-b from-pink-50/70 via-amber-50/30 to-white py-16 sm:py-24 border-b border-pink-100/50">
        {/* Cercles de lumière et rayonnement "Tokoss" */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-to-bl from-pink-200/40 via-purple-100/30 to-transparent rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-200/30 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-1/2 left-1/3 w-80 h-80 bg-amber-200/30 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Texte & Accroche */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white text-[#BE185D] text-xs font-black border-2 border-pink-200 shadow-2xs">
                <Crown className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                MOUVEMENT DES FEMMES ENGAGÉES POUR L'ÉPANOUISSEMENT FAMILIAL
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 leading-[1.15] tracking-tight">
                Quand une femme se relève, c'est toute la{" "}
                <span className="text-[#BE185D] bg-gradient-to-r from-pink-100/80 to-pink-50 px-2.5 py-0.5 rounded-2xl border border-pink-200 inline-block shadow-2xs">
                  famille
                </span>{" "}
                qui retrouve la force de{" "}
                <span className="text-[#1D4ED8] underline decoration-amber-400 decoration-wavy decoration-2">
                  rayonner
                </span>
                .
              </h1>

              <p className="text-lg text-slate-700 leading-relaxed max-w-2xl font-normal">
                Basée à Yaoundé, l’**AFDEEF** est la première organisation communautaire camerounaise à
                briser le tabou du **burn-out maternel**, à propulser l’**autonomie économique des
                mères** et à sécuriser la **scolarisation des enfants orphelins**.
              </p>

              {/* Boutons d'appel à l'action Tokoss */}
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <a
                  href="#don"
                  className="inline-flex items-center gap-2.5 font-black text-white bg-gradient-to-r from-[#BE185D] to-[#9D174D] hover:from-[#9D174D] hover:to-[#831843] px-7 py-4 rounded-2xl shadow-lg hover:shadow-xl transition-all"
                >
                  <Heart className="w-5 h-5 text-amber-200 fill-amber-200" />
                  Soutenir une Mère & son Foyer
                </a>
                <a
                  href="#documentaire"
                  className="inline-flex items-center gap-2 font-black text-slate-800 bg-white hover:bg-slate-50 px-6 py-4 rounded-2xl border-2 border-pink-200 shadow-2xs transition-all hover:scale-102"
                >
                  <Play className="w-4 h-4 text-[#BE185D] fill-[#BE185D]" />
                  Voir le Documentaire Officiel (16:9)
                </a>
              </div>

              {/* KPIs de confiance et d'impact */}
              <div className="pt-6 border-t border-slate-200/70 grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div className="p-4 bg-white rounded-2xl border-2 border-pink-100 shadow-2xs hover:border-pink-300 transition-colors">
                  <div className="text-3xl font-black text-[#BE185D]">+500</div>
                  <div className="text-xs text-slate-600 font-bold mt-1">Femmes & Foyers Soutenus</div>
                </div>
                <div className="p-4 bg-white rounded-2xl border-2 border-emerald-100 shadow-2xs hover:border-emerald-300 transition-colors">
                  <div className="text-3xl font-black text-[#16A34A]">84%</div>
                  <div className="text-xs text-slate-600 font-bold mt-1">Fonds Dédiés au Terrain</div>
                </div>
                <div className="p-4 bg-white rounded-2xl border-2 border-blue-100 shadow-2xs hover:border-blue-300 transition-colors">
                  <div className="text-3xl font-black text-[#1D4ED8]">100 Mères</div>
                  <div className="text-xs text-slate-600 font-bold mt-1">Micro-Entrepreneures</div>
                </div>
                <div className="p-4 bg-white rounded-2xl border-2 border-amber-100 shadow-2xs hover:border-amber-300 transition-colors">
                  <div className="text-3xl font-black text-[#EAB308]">Yaoundé</div>
                  <div className="text-xs text-slate-600 font-bold mt-1">Ngousso & Périphérie</div>
                </div>
              </div>
            </div>

            {/* Photo Héroïque Sublime / Tableau des Femmes du Bureau */}
            <div className="lg:col-span-5 relative">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white bg-slate-100 aspect-4/3 sm:aspect-5/4">
                <Image
                  src="/images/panel_comite.jpg"
                  alt="Comité Exécutif AFDEEF"
                  fill
                  className="object-cover"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-transparent to-transparent flex items-end p-6">
                  <div className="text-white space-y-1">
                    <span className="inline-block px-3 py-1 rounded-full bg-[#BE185D] text-white text-xs font-black uppercase tracking-wider shadow-2xs">
                      Femmes de Cœur & de Terrain
                    </span>
                    <h3 className="font-bold text-lg leading-snug">
                      Table Ronde AFDEEF sur le Burn-Out Maternel
                    </h3>
                    <p className="text-xs text-pink-200 font-medium">
                      Présidence de Mme Elvire FOKAM • Salle Ineska Mode, Yaoundé
                    </p>
                  </div>
                </div>
              </div>

              {/* Badge flottant d'accréditation */}
              <div className="absolute -bottom-5 -left-5 bg-white p-4 rounded-2xl shadow-xl border-2 border-pink-200 hidden sm:flex items-center gap-3 max-w-xs">
                <div className="w-12 h-12 rounded-xl bg-pink-100 text-[#BE185D] flex items-center justify-center shrink-0">
                  <Shield className="w-7 h-7" />
                </div>
                <div className="text-xs">
                  <p className="font-black text-slate-900">Organisation Déclarée</p>
                  <p className="text-slate-600 font-mono text-[11px]">Récépissé N° 00000852/RDA</p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 4. LE GRAND DOCUMENTAIRE OFFICIEL : « LE SILENCE DES MÈRES » */}
      <section id="documentaire" className="py-20 bg-gradient-to-br from-[#1E1B4B] via-[#0F172A] to-[#1E3A8A] text-white relative overflow-hidden">
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center max-w-3xl mx-auto space-y-4 mb-14">
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-pink-500/20 text-pink-300 text-xs font-black uppercase tracking-wider border border-pink-400/40">
              <Play className="w-3.5 h-3.5 fill-pink-300" /> Le Film Témoignage de Terrain
            </span>
            <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-white">
              « Le Silence des Mères » : Le Documentaire Officiel AFDEEF
            </h2>
            <p className="text-blue-100 text-base leading-relaxed">
              Quand la fatigue physique, mentale et financière épuise la femme au quotidien : découvrez
              les paroles sans fard, les diagnostics médicaux et les pistes de libération collective.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Lecteur / Vignette Vidéo */}
            <div className="lg:col-span-8">
              <div className="relative rounded-3xl overflow-hidden border-2 border-pink-400/30 bg-slate-900 shadow-2xl aspect-16/9 group">
                <Image
                  src="/images/assemblee_notes.jpg"
                  alt="Documentaire officiel AFDEEF"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-slate-950/65 backdrop-blur-[2px] flex flex-col items-center justify-center p-6 text-center">
                  <button
                    onClick={() => setIsVideoModalOpen(true)}
                    className="w-20 h-20 rounded-full bg-gradient-to-r from-[#BE185D] to-[#EA580C] text-white flex items-center justify-center shadow-2xl hover:scale-110 transition-all cursor-pointer ring-8 ring-pink-500/30"
                    aria-label="Visionner le documentaire"
                  >
                    <Play className="w-8 h-8 fill-white ml-1" />
                  </button>
                  <p className="mt-5 font-black text-xl text-white">
                    Visionner le Film Documentaire Officiel (Format 16:9)
                  </p>
                  <p className="text-xs text-amber-200 mt-1 font-medium">
                    Tournage exclusif à Yaoundé • Interventions de Mme Elvire FOKAM & Dr Alvin Dzoko
                  </p>
                </div>
              </div>
            </div>

            {/* Verbatims & Témoignages */}
            <div className="lg:col-span-4 space-y-4">
              <div className="p-6 rounded-2xl bg-white/10 backdrop-blur-md border border-white/15 shadow-2xs">
                <div className="flex items-center gap-2 text-pink-300 text-xs font-black uppercase tracking-wider mb-2">
                  <Award className="w-4 h-4 text-pink-400" /> Mme Elvire FOKAM — Présidente Fondatrice
                </div>
                <blockquote className="text-sm italic text-pink-50 leading-relaxed font-medium">
                  « Bien des femmes pensent que se faire plaisir est un péché. Elles portent la
                  scolarité, les soins, la nourriture et les angoisses sans jamais s’accorder une
                  pause. Sauver la mère, c’est préserver toute la famille. »
                </blockquote>
              </div>

              <div className="p-6 rounded-2xl bg-white/10 backdrop-blur-md border border-white/15 shadow-2xs">
                <div className="flex items-center gap-2 text-emerald-300 text-xs font-black uppercase tracking-wider mb-2">
                  <Shield className="w-4 h-4 text-emerald-400" /> Dr Alvin Dzoko — Médecin Conseil
                </div>
                <blockquote className="text-sm italic text-blue-50 leading-relaxed font-medium">
                  « Le stress prolongé et l’irritabilité matinale ne sont pas un défaut d'humeur, mais
                  les signaux cliniques de la somatisation. L'AFDEEF crée ce refuge d'écoute
                  indispensable. »
                </blockquote>
              </div>

              <div className="p-4 rounded-2xl bg-pink-500/20 border border-pink-400/40 flex items-center justify-between">
                <div>
                  <div className="text-[11px] font-black text-pink-300 uppercase">
                    Besoin d'une oreille attentive ?
                  </div>
                  <div className="text-xs font-bold text-white">Écoute Anonyme & Gratuite</div>
                </div>
                <a
                  href="https://wa.me/237678046426"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 rounded-xl bg-[#BE185D] hover:bg-[#9D174D] text-white text-xs font-bold transition-all inline-flex items-center gap-1.5 shadow-md"
                >
                  <Phone className="w-3.5 h-3.5" /> WhatsApp
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. LES 3 GRANDS PILIERS D'ACTION DE L'AFDEEF */}
      <section id="mission" className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
            <span className="inline-block px-3.5 py-1 rounded-full bg-pink-100 text-[#BE185D] text-xs font-black uppercase tracking-wider border border-pink-200">
              Nos Piliers Fondateurs
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
              3 Piliers d'Intervention pour l'Harmonie Familiale
            </h2>
            <p className="text-slate-600 text-base leading-relaxed">
              Une démarche holistique qui traite à la fois le bien-être psychologique de la femme,
              son indépendance financière et la protection durable des enfants.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Pilier 1 : Rose Rubis / Santé Mentale */}
            <div className="bg-white rounded-3xl p-8 border-2 border-pink-200 hover:shadow-xl transition-all flex flex-col justify-between group hover:-translate-y-1">
              <div className="space-y-4">
                <div className="w-16 h-16 rounded-2xl bg-pink-100 text-[#BE185D] flex items-center justify-center font-bold text-2xl group-hover:scale-110 transition-transform">
                  <Heart className="w-8 h-8 fill-[#BE185D] text-[#BE185D]" />
                </div>
                <span className="inline-block text-xs font-extrabold text-[#BE185D] bg-pink-50 px-3 py-1 rounded-full border border-pink-200">
                  ODD 3 • Santé & Bien-être
                </span>
                <h3 className="text-xl font-black text-slate-900">
                  Santé Mentale, Prévention du Burn-Out & Octobre Rose
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed font-normal">
                  Permanences d'écoute psychologique gratuites, ateliers de désamorçage de l'épuisement
                  maternel, campagnes de sensibilisation médicale (dépistage du cancer du sein) et
                  groupes de parole confidentiels.
                </p>
              </div>
              <ul className="mt-8 pt-6 border-t border-slate-100 space-y-2 text-xs text-slate-700 font-bold">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#16A34A]" /> Cellule d'assistance WhatsApp
                  24/7
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#16A34A]" /> Tables rondes thématiques
                  trimestrielles
                </li>
              </ul>
            </div>

            {/* Pilier 2 : Vert Émeraude / Autonomie Économique */}
            <div className="bg-white rounded-3xl p-8 border-2 border-emerald-200 hover:shadow-xl transition-all flex flex-col justify-between group hover:-translate-y-1">
              <div className="space-y-4">
                <div className="w-16 h-16 rounded-2xl bg-emerald-100 text-[#16A34A] flex items-center justify-center font-bold text-2xl group-hover:scale-110 transition-transform">
                  <TrendingUp className="w-8 h-8 text-emerald-700" />
                </div>
                <span className="inline-block text-xs font-extrabold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                  ODD 5 & 8 • Travail Décent & Autonomie
                </span>
                <h3 className="text-xl font-black text-slate-900">
                  Autonomie Économique & Fonds Rotatif Solidaire
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed font-normal">
                  Dotation de kits professionnels pour activités génératrices de revenus (AGR),
                  formations pratiques en gestion budgétaire et mise en place de tontines de
                  croissance pour l'émancipation financière des foyers.
                </p>
              </div>
              <ul className="mt-8 pt-6 border-t border-slate-100 space-y-2 text-xs text-slate-700 font-bold">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#16A34A]" /> Fonds de micro-crédits à taux
                  zéro
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#16A34A]" /> Accompagnement de 100 mères
                  entrepreneures
                </li>
              </ul>
            </div>

            {/* Pilier 3 : Orange Safran / Protection Enfants & Famille */}
            <div className="bg-white rounded-3xl p-8 border-2 border-orange-200 hover:shadow-xl transition-all flex flex-col justify-between group hover:-translate-y-1">
              <div className="space-y-4">
                <div className="w-16 h-16 rounded-2xl bg-orange-100 text-[#EA580C] flex items-center justify-center font-bold text-2xl group-hover:scale-110 transition-transform">
                  <Users className="w-8 h-8 text-orange-600" />
                </div>
                <span className="inline-block text-xs font-extrabold text-orange-700 bg-orange-50 px-3 py-1 rounded-full border border-orange-200">
                  ODD 4 & 10 • Protection & Enfance
                </span>
                <h3 className="text-xl font-black text-slate-900">
                  Protection de l’Enfant & Soutien aux Orphelinats
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed font-normal">
                  Prise en charge des bourses et fournitures scolaires pour orphelins, dons de denrées
                  de première nécessité, arbres de Noël solidaires et médiation familiale pour
                  restaurer l'affection au sein du foyer.
                </p>
              </div>
              <ul className="mt-8 pt-6 border-t border-slate-100 space-y-2 text-xs text-slate-700 font-bold">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#16A34A]" /> Bourses de scolarisation
                  directes
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#16A34A]" /> Partenariats avec orphelinats
                  de Yaoundé
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 6. PROJETS BANQUABLES EN CO-FINANCEMENT (POUR LES BAILLEURS) */}
      <section id="projets" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div>
              <span className="inline-block px-3.5 py-1 rounded-full bg-pink-100 text-[#BE185D] text-xs font-black uppercase tracking-wider mb-2 border border-pink-200">
                Fiches Projets Bailleurs & Partenariats RSE
              </span>
              <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
                Projets Ouverts au Financement Direct (2026-2027)
              </h2>
              <p className="text-slate-600 text-sm max-w-2xl mt-2 font-medium">
                Chaque initiative dispose d'un budget vérifié, d'indicateurs de résultat précis et d'un
                protocole de reporting remis à nos partenaires.
              </p>
            </div>

            <div className="shrink-0">
              <a
                href="#partenaires"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-[#BE185D] hover:bg-[#9D174D] text-white font-extrabold transition-all text-sm shadow-md"
              >
                <Download className="w-4 h-4" />
                Télécharger le Cahier des Projets (PDF)
              </a>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {projects.map((proj) => {
              const progressPct = Math.min(100, Math.round((proj.raisedXAF / proj.targetXAF) * 100));

              return (
                <div
                  key={proj.id}
                  className="bg-white rounded-3xl border-2 border-slate-200 shadow-sm p-7 flex flex-col justify-between hover:border-[#BE185D] hover:shadow-xl transition-all relative"
                >
                  {proj.urgent && (
                    <span className="absolute top-5 right-5 text-[10px] uppercase font-black tracking-wider bg-pink-100 text-[#BE185D] px-3 py-1 rounded-full border border-pink-200">
                      Urgence Terrain
                    </span>
                  )}

                  <div className="space-y-4">
                    <span className={`inline-block text-xs font-extrabold px-3 py-1 rounded-full border ${proj.badgeColor}`}>
                      {proj.odd}
                    </span>
                    <h3 className="text-xl font-black text-slate-900 leading-snug">{proj.title}</h3>
                    <p className="text-xs text-slate-600 leading-relaxed font-normal">{proj.description}</p>

                    <div className="p-4 bg-slate-50 rounded-2xl space-y-2 mt-4 border border-slate-100">
                      <div className="flex justify-between text-xs font-black">
                        <span className="text-slate-600">Financement Atteint :</span>
                        <span className="text-[#BE185D] font-mono text-sm">{progressPct}%</span>
                      </div>
                      <div className="w-full bg-slate-200 rounded-full h-3 overflow-hidden">
                        <div
                          className="bg-gradient-to-r from-[#BE185D] via-[#EA580C] to-[#16A34A] h-3 rounded-full"
                          style={{ width: `${progressPct}%` }}
                        />
                      </div>
                      <div className="flex justify-between text-[11px] text-slate-600 pt-1 font-semibold">
                        <span>Réuni : {formatAmount(proj.raisedXAF)}</span>
                        <span>Objectif : {formatAmount(proj.targetXAF)}</span>
                      </div>
                    </div>

                    <div className="text-xs text-slate-700 flex items-center gap-2 pt-1 font-bold">
                      <Users className="w-4 h-4 text-[#16A34A]" />
                      <span>Bénéficiaires directs : {proj.beneficiaries}</span>
                    </div>

                    <div className="text-[11px] text-[#BE185D] bg-pink-50 p-2.5 rounded-xl font-semibold border border-pink-100">
                      💡 {proj.impactExample}
                    </div>
                  </div>

                  <div className="mt-8 pt-5 border-t border-slate-100">
                    <button
                      onClick={() => {
                        setSelectedProject(proj.id);
                        const el = document.getElementById("don");
                        if (el) el.scrollIntoView({ behavior: "smooth" });
                      }}
                      className="w-full inline-flex items-center justify-center gap-2 font-black text-xs bg-gradient-to-r from-[#BE185D] to-[#9D174D] hover:from-[#9D174D] hover:to-[#831843] text-white py-3.5 px-4 rounded-xl transition-all cursor-pointer shadow-md"
                    >
                      Co-Financer ce Projet <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 7. BAROMÈTRE DE TRANSPARENCE FINANCIÈRE (STANDARD INTERNATIONAL) */}
      <section id="transparence" className="py-20 bg-gradient-to-b from-slate-50 to-pink-50/30 border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
            <span className="inline-block px-3.5 py-1 rounded-full bg-emerald-100 text-[#16A34A] text-xs font-black uppercase tracking-wider border border-emerald-200">
              Traçabilité & Éthique
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
              Où va chaque Franc CFA que vous nous confiez ?
            </h2>
            <p className="text-slate-600 text-base leading-relaxed">
              Une gouvernance rigoureuse alignée sur les exigences des auditeurs internationaux de
              subventions (AFD, UE, banques et fondations d'entreprises).
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Décomposition visuelle */}
            <div className="lg:col-span-6 space-y-4">
              <div className="p-6 rounded-3xl bg-white border-2 border-emerald-200 shadow-sm flex items-center justify-between">
                <div>
                  <div className="text-3xl font-black text-[#16A34A]">84%</div>
                  <div className="text-sm font-bold text-slate-900 mt-1">Actions & Programmes de Terrain Directs</div>
                  <div className="text-xs text-slate-500 mt-0.5">
                    Kits de démarrage AGR pour mères, scolarisation d'orphelins, campagnes de dépistage.
                  </div>
                </div>
              </div>

              <div className="p-6 rounded-3xl bg-white border-2 border-pink-200 shadow-sm flex items-center justify-between">
                <div>
                  <div className="text-3xl font-black text-[#BE185D]">10%</div>
                  <div className="text-sm font-bold text-slate-900 mt-1">Permanence d'Écoute & Soutien Psychologique</div>
                  <div className="text-xs text-slate-500 mt-0.5">
                    Cellule WhatsApp 24/7, praticiennes d'écoute, séances de groupe gratuites.
                  </div>
                </div>
              </div>

              <div className="p-6 rounded-3xl bg-white border-2 border-blue-200 shadow-sm flex items-center justify-between">
                <div>
                  <div className="text-3xl font-black text-[#1D4ED8]">6%</div>
                  <div className="text-sm font-bold text-slate-900 mt-1">Frais de Fonctionnement & Audits Légaux</div>
                  <div className="text-xs text-slate-500 mt-0.5">
                    Gestion administrative stricte, reporting certifié et conformité préfectorale.
                  </div>
                </div>
              </div>
            </div>

            {/* Téléchargements Bailleurs & Due Diligence */}
            <div className="lg:col-span-6 bg-white rounded-3xl p-8 border-2 border-pink-200 shadow-xl space-y-6">
              <div>
                <h3 className="text-xl font-black text-slate-900 mb-1">
                  Espace Téléchargement Bailleurs & RSE
                </h3>
                <p className="text-xs text-slate-500 font-medium">
                  Documents officiels certifiés conformes pour constitution de dossier de subvention.
                </p>
              </div>

              <div className="space-y-3">
                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 flex items-center justify-between hover:border-pink-300 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="w-11 h-11 rounded-xl bg-pink-100 text-[#BE185D] flex items-center justify-center font-black text-xs">
                      PDF
                    </div>
                    <div>
                      <p className="text-sm font-bold text-slate-900">Statuts & Règlement Intérieur AFDEEF</p>
                      <p className="text-[11px] text-slate-500 font-medium">Document juridique certifié • Yaoundé</p>
                    </div>
                  </div>
                  <a href="#contact" className="p-2.5 text-slate-500 hover:text-[#BE185D] transition-colors" title="Télécharger">
                    <Download className="w-5 h-5" />
                  </a>
                </div>

                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 flex items-center justify-between hover:border-pink-300 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="w-11 h-11 rounded-xl bg-pink-100 text-[#BE185D] flex items-center justify-center font-black text-xs">
                      PDF
                    </div>
                    <div>
                      <p className="text-sm font-bold text-slate-900">Récépissé Préfectoral N° 00000852 (Scan)</p>
                      <p className="text-[11px] text-slate-500 font-medium">Arrêté officiel de la Préfecture du Mfoundi</p>
                    </div>
                  </div>
                  <a href="#contact" className="p-2.5 text-slate-500 hover:text-[#BE185D] transition-colors" title="Télécharger">
                    <Download className="w-5 h-5" />
                  </a>
                </div>

                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 flex items-center justify-between hover:border-pink-300 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="w-11 h-11 rounded-xl bg-blue-100 text-[#1D4ED8] flex items-center justify-center font-black text-xs">
                      PDF
                    </div>
                    <div>
                      <p className="text-sm font-bold text-slate-900">Dossier de Partenariat & Mécénat RSE 2026</p>
                      <p className="text-[11px] text-slate-500 font-medium">Grille de sponsoring, déductions & visibilité</p>
                    </div>
                  </div>
                  <a href="#contact" className="p-2.5 text-slate-500 hover:text-[#1D4ED8] transition-colors" title="Télécharger">
                    <Download className="w-5 h-5" />
                  </a>
                </div>

                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 flex items-center justify-between hover:border-pink-300 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="w-11 h-11 rounded-xl bg-emerald-100 text-[#16A34A] flex items-center justify-center font-black text-xs">
                      PDF
                    </div>
                    <div>
                      <p className="text-sm font-bold text-slate-900">Actes & Synthèse de la Table Ronde 2026</p>
                      <p className="text-[11px] text-slate-500 font-medium">Livre blanc sur le burn-out familial au Cameroun</p>
                    </div>
                  </div>
                  <a href="#contact" className="p-2.5 text-slate-500 hover:text-[#1D4ED8] transition-colors" title="Télécharger">
                    <Download className="w-5 h-5" />
                  </a>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 8. GALERIE PHOTOS DE TERRAIN ENRICHE & FILTRABLE */}
      <section id="galerie" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div>
              <span className="inline-block px-3.5 py-1 rounded-full bg-pink-100 text-[#BE185D] text-xs font-black uppercase tracking-wider mb-2 border border-pink-200">
                La Preuve en Images
              </span>
              <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
                Instantanés de Terrain & Sororité
              </h2>
              <p className="text-slate-600 text-sm max-w-2xl mt-2 font-medium">
                Des actions réelles, des visages dignes et une présence active au contact direct des
                femmes et des familles à Yaoundé.
              </p>
            </div>

            {/* Filtres de la galerie */}
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setGalleryFilter("all")}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  galleryFilter === "all"
                    ? "bg-[#BE185D] text-white shadow-2xs"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
              >
                Tous
              </button>
              <button
                onClick={() => setGalleryFilter("tableronde")}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  galleryFilter === "tableronde"
                    ? "bg-[#BE185D] text-white shadow-2xs"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
              >
                Table Ronde
              </button>
              <button
                onClick={() => setGalleryFilter("autonomie")}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  galleryFilter === "autonomie"
                    ? "bg-[#BE185D] text-white shadow-2xs"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
              >
                Santé & Dépistage
              </button>
              <button
                onClick={() => setGalleryFilter("gala")}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  galleryFilter === "gala"
                    ? "bg-[#BE185D] text-white shadow-2xs"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
              >
                Célébrations & Fraternité
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredGallery.map((item, idx) => (
              <div
                key={idx}
                className="group relative rounded-3xl overflow-hidden border border-slate-200 shadow-sm bg-slate-100 aspect-4/3 flex flex-col justify-end p-5 transition-all hover:shadow-xl hover:border-pink-300"
              >
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent" />
                <div className="relative text-white space-y-1">
                  <h4 className="font-bold text-base leading-snug">{item.title}</h4>
                  <p className="text-xs text-pink-200 font-medium leading-relaxed">{item.caption}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 9. MODULE INTERACTIF DE DON AVEC SIMULATEUR D'IMPACT */}
      <section id="don" className="py-20 bg-gradient-to-b from-pink-50/60 via-amber-50/40 to-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-10">
            <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-pink-100 text-[#BE185D] text-xs font-black uppercase tracking-wider border border-pink-200">
              <Heart className="w-4 h-4 fill-[#BE185D]" /> Soutien Concret aux Familles
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
              Faites un Don pour l’Épanouissement d'un Foyer
            </h2>
            <p className="text-slate-600 text-sm max-w-xl mx-auto font-medium">
              Chaque don est transformé en soutien direct sur le terrain à Yaoundé. Règlement sécurisé
              par Mobile Money (MTN MoMo, Orange Money) ou Carte Bancaire internationale.
            </p>
          </div>

          <div className="bg-white rounded-3xl p-6 sm:p-10 border-2 border-pink-200 shadow-2xl space-y-8">
            {/* 1. Projet Cible */}
            <div className="space-y-3">
              <label className="text-xs font-black text-slate-800 uppercase tracking-wider block">
                1. Choisissez le Projet à Soutenir :
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {projects.map((p) => (
                  <button
                    key={p.id}
                    type="button"
                    onClick={() => setSelectedProject(p.id)}
                    className={`p-4 rounded-2xl border-2 text-left transition-all cursor-pointer ${
                      selectedProject === p.id
                        ? "border-[#BE185D] bg-pink-50/80 ring-2 ring-pink-500/20 shadow-2xs"
                        : "border-slate-200 hover:border-slate-300 bg-white"
                    }`}
                  >
                    <p className="text-xs font-black text-slate-900 leading-snug">{p.title}</p>
                    <p className="text-[11px] text-slate-500 font-semibold mt-1">{p.beneficiaries}</p>
                  </button>
                ))}
              </div>
            </div>

            {/* 2. Fréquence */}
            <div className="flex rounded-2xl bg-slate-100 p-1.5 max-w-xs mx-auto">
              <button
                type="button"
                onClick={() => setDonationFrequency("once")}
                className={`flex-1 py-2.5 text-xs font-black rounded-xl transition-all cursor-pointer ${
                  donationFrequency === "once"
                    ? "bg-white text-slate-900 shadow-2xs"
                    : "text-slate-500 hover:text-slate-900"
                }`}
              >
                Don Unique
              </button>
              <button
                type="button"
                onClick={() => setDonationFrequency("monthly")}
                className={`flex-1 py-2.5 text-xs font-black rounded-xl transition-all cursor-pointer ${
                  donationFrequency === "monthly"
                    ? "bg-[#BE185D] text-white shadow-2xs"
                    : "text-slate-500 hover:text-slate-900"
                }`}
              >
                Soutien Mensuel
              </button>
            </div>

            {/* 3. Choix du Montant */}
            <div className="space-y-3">
              <label className="text-xs font-black text-slate-800 uppercase tracking-wider block text-center">
                2. Sélectionnez votre Montant :
              </label>
              <div className="grid grid-cols-3 sm:grid-cols-5 gap-3">
                {presetAmountsXAF.map((amt) => (
                  <button
                    key={amt}
                    type="button"
                    onClick={() => {
                      setSelectedAmountXAF(amt);
                      setCustomAmountXAF("");
                    }}
                    className={`py-3.5 px-2 rounded-2xl text-sm font-black border-2 transition-all cursor-pointer ${
                      selectedAmountXAF === amt && !customAmountXAF
                        ? "border-[#BE185D] bg-pink-50 text-[#BE185D] ring-2 ring-pink-500/20 shadow-2xs"
                        : "border-slate-200 hover:border-slate-300 text-slate-700 bg-white"
                    }`}
                  >
                    {formatAmount(amt)}
                  </button>
                ))}
              </div>

              <div className="pt-2">
                <input
                  type="number"
                  placeholder="Ou entrez un montant personnalisé en FCFA..."
                  value={customAmountXAF}
                  onChange={(e) => {
                    setCustomAmountXAF(e.target.value);
                    if (e.target.value) {
                      setSelectedAmountXAF(parseInt(e.target.value, 10) || 0);
                    }
                  }}
                  className="w-full text-center text-sm font-bold py-3.5 px-4 rounded-2xl border-2 border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#BE185D] focus:border-transparent bg-slate-50"
                />
              </div>
            </div>

            {/* 4. Modes de Paiement */}
            <div className="space-y-3 pt-2 border-t border-slate-100">
              <label className="text-xs font-black text-slate-800 uppercase tracking-wider block">
                3. Choisissez votre Mode de Règlement Sécurisé :
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <button
                  type="button"
                  onClick={() => setPaymentMethod("fapshi_momo")}
                  className={`p-3.5 rounded-2xl border-2 text-center transition-all cursor-pointer flex flex-col items-center gap-1.5 ${
                    paymentMethod === "fapshi_momo"
                      ? "border-amber-500 bg-amber-50 ring-2 ring-amber-500/20 shadow-2xs"
                      : "border-slate-200 hover:border-slate-300 bg-white"
                  }`}
                >
                  <Smartphone className="w-6 h-6 text-amber-600" />
                  <span className="text-xs font-black text-slate-900">MTN MoMo</span>
                  <span className="text-[10px] text-slate-500 font-semibold">Cameroun & CEMAC</span>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod("fapshi_om")}
                  className={`p-3.5 rounded-2xl border-2 text-center transition-all cursor-pointer flex flex-col items-center gap-1.5 ${
                    paymentMethod === "fapshi_om"
                      ? "border-orange-500 bg-orange-50 ring-2 ring-orange-500/20 shadow-2xs"
                      : "border-slate-200 hover:border-slate-300 bg-white"
                  }`}
                >
                  <Smartphone className="w-6 h-6 text-orange-600" />
                  <span className="text-xs font-black text-slate-900">Orange Money</span>
                  <span className="text-[10px] text-slate-500 font-semibold">Cameroun & CEMAC</span>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod("card")}
                  className={`p-3.5 rounded-2xl border-2 text-center transition-all cursor-pointer flex flex-col items-center gap-1.5 ${
                    paymentMethod === "card"
                      ? "border-blue-500 bg-blue-50 ring-2 ring-blue-500/20 shadow-2xs"
                      : "border-slate-200 hover:border-slate-300 bg-white"
                  }`}
                >
                  <CreditCard className="w-6 h-6 text-blue-600" />
                  <span className="text-xs font-black text-slate-900">Carte Bancaire</span>
                  <span className="text-[10px] text-slate-500 font-semibold">Visa / Mastercard</span>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod("bank")}
                  className={`p-3.5 rounded-2xl border-2 text-center transition-all cursor-pointer flex flex-col items-center gap-1.5 ${
                    paymentMethod === "bank"
                      ? "border-emerald-500 bg-emerald-50 ring-2 ring-emerald-500/20 shadow-2xs"
                      : "border-slate-200 hover:border-slate-300 bg-white"
                  }`}
                >
                  <Building2 className="w-6 h-6 text-emerald-600" />
                  <span className="text-xs font-black text-slate-900">Virement Direct</span>
                  <span className="text-[10px] text-slate-500 font-semibold">RIB de l'Association</span>
                </button>
              </div>
            </div>

            {/* Validation & Attestation */}
            <div className="pt-4 border-t border-slate-100 space-y-4">
              <div className="bg-pink-50/80 p-4 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-3 text-xs border border-pink-200">
                <div className="text-slate-700">
                  Votre don de{" "}
                  <span className="font-black text-[#BE185D] text-sm">
                    {formatAmount(selectedAmountXAF || 25000)}
                  </span>{" "}
                  finance directement :{" "}
                  <span className="font-bold text-slate-900">« {currentProject.title} »</span>.
                </div>
                <div className="shrink-0 flex items-center gap-1.5 text-[#16A34A] font-bold">
                  <Shield className="w-4 h-4 text-[#16A34A]" /> Reçu fiscal certifié
                </div>
              </div>

              <a
                href={`https://wa.me/237678046426?text=Bonjour%20AFDEEF,%20je%20souhaite%20valider%20mon%20don%20de%20${encodeURIComponent(
                  formatAmount(selectedAmountXAF || 25000)
                )}%20pour%20le%20projet%20${encodeURIComponent(currentProject.title)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 font-black text-base text-white bg-gradient-to-r from-[#BE185D] to-[#9D174D] hover:from-[#9D174D] hover:to-[#831843] py-4 px-6 rounded-2xl shadow-xl transition-all cursor-pointer hover:scale-101"
              >
                <Heart className="w-5 h-5 fill-white" />
                Valider mon Don de {formatAmount(selectedAmountXAF || 25000)}
              </a>

              <p className="text-[11px] text-center text-slate-400 font-medium">
                Paiements certifiés SSL • Passerelle Mobile Money agréée BEAC / COBAC
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 10. PACKS MÉCÉNAT & FORMULAIRE BAILLEURS / RSE */}
      <section id="partenaires" className="py-20 bg-slate-900 text-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            <div className="lg:col-span-7 space-y-6">
              <span className="inline-block px-3.5 py-1 rounded-full bg-pink-500/20 text-pink-300 text-xs font-black uppercase tracking-wider border border-pink-500/30">
                Packs Mécénat & Investissement RSE
              </span>
              <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-white">
                Devenez Entreprise ou Institution Partenaire de l'AFDEEF
              </h2>
              <p className="text-slate-300 text-base leading-relaxed">
                Associez votre responsabilité sociétale d’entreprise (RSE) à un programme
                camerounais mesurable, audité et à fort impact communautaire.
              </p>

              {/* 3 Niveaux de Mécénat */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                <div className="p-4 rounded-2xl bg-slate-800/80 border border-slate-700 space-y-1">
                  <div className="text-xs font-black text-amber-400 uppercase tracking-wide">Pack Bronze</div>
                  <div className="text-base font-black text-white">500 000 FCFA</div>
                  <p className="text-[11px] text-slate-400 leading-snug">
                    Mention logo sur supports, rapport d'impact semestriel.
                  </p>
                </div>
                <div className="p-4 rounded-2xl bg-slate-800/80 border border-pink-500/40 space-y-1 ring-1 ring-pink-500/30">
                  <div className="text-xs font-black text-pink-400 uppercase tracking-wide">Pack Argent</div>
                  <div className="text-base font-black text-white">2 000 000 FCFA</div>
                  <p className="text-[11px] text-slate-400 leading-snug">
                    Co-branding sur caravanes de santé, visite terrain pour salariés.
                  </p>
                </div>
                <div className="p-4 rounded-2xl bg-slate-800/80 border border-emerald-500/40 space-y-1">
                  <div className="text-xs font-black text-emerald-400 uppercase tracking-wide">Grand Mécène Or</div>
                  <div className="text-base font-black text-white">5 000 000+ FCFA</div>
                  <p className="text-[11px] text-slate-400 leading-snug">
                    Parrainage de projet complet, tribune officielle, audit certifié.
                  </p>
                </div>
              </div>
            </div>

            {/* Formulaire de Contact Bailleurs */}
            <div id="contact" className="lg:col-span-5 bg-white text-slate-800 rounded-3xl p-8 shadow-2xl">
              <h3 className="text-lg font-black text-slate-900 mb-1">Prendre Contact avec la Direction</h3>
              <p className="text-xs text-slate-500 mb-6 font-medium">
                Pour toute convention de subvention, mécénat ou demande d'audit.
              </p>

              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  alert("Votre demande institutionnelle a été transmise à la présidence de l'AFDEEF.");
                }}
                className="space-y-4 text-xs font-bold"
              >
                <div>
                  <label className="block text-slate-700 mb-1">Votre Organisation / Entreprise :</label>
                  <input
                    type="text"
                    required
                    placeholder="Ex: Fondation d'entreprise, Ambassade, ONG..."
                    className="w-full p-3.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#BE185D]"
                  />
                </div>

                <div>
                  <label className="block text-slate-700 mb-1">Nom & Titre du Responsable :</label>
                  <input
                    type="text"
                    required
                    placeholder="Ex: Responsable RSE / Chargé(e) de Programmes"
                    className="w-full p-3.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#BE185D]"
                  />
                </div>

                <div>
                  <label className="block text-slate-700 mb-1">Email Professionnel :</label>
                  <input
                    type="email"
                    required
                    placeholder="direction@institution.org"
                    className="w-full p-3.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#BE185D]"
                  />
                </div>

                <div>
                  <label className="block text-slate-700 mb-1">Téléphone / WhatsApp :</label>
                  <input
                    type="tel"
                    placeholder="+237 6... / Format International"
                    className="w-full p-3.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#BE185D]"
                  />
                </div>

                <div>
                  <label className="block text-slate-700 mb-1">Niveau d'engagement souhaité :</label>
                  <select className="w-full p-3.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#BE185D]">
                    <option>Subvention de projet ciblé</option>
                    <option>Pack Mécène Or (5M+ FCFA)</option>
                    <option>Pack Mécène Argent (2M FCFA)</option>
                    <option>Pack Mécène Bronze (500k FCFA)</option>
                    <option>Demande d'audit / Due diligence</option>
                  </select>
                </div>

                <button
                  type="submit"
                  className="w-full py-4 px-4 rounded-xl font-black text-white bg-[#BE185D] hover:bg-[#9D174D] transition-all shadow-md cursor-pointer text-sm mt-2"
                >
                  Transmettre la Demande Institutionnelle
                </button>
              </form>
            </div>

          </div>
        </div>
      </section>

      {/* 11. FOIRE AUX QUESTIONS (ACCORDÉON INTERACTIF) */}
      <section id="faq" className="py-20 bg-slate-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-14">
            <span className="inline-block px-3.5 py-1 rounded-full bg-pink-100 text-[#BE185D] text-xs font-black uppercase tracking-wider border border-pink-200">
              Questions Fréquentes
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
              Tout ce que vous devez savoir sur l'AFDEEF
            </h2>
            <p className="text-slate-600 text-sm max-w-xl mx-auto font-medium">
              Transparence financière, déductions fiscales, adhésion et accompagnement d'urgence.
            </p>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div
                  key={idx}
                  className="bg-white rounded-2xl border-2 border-slate-200 overflow-hidden transition-all shadow-2xs"
                >
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                    className="w-full p-5 text-left font-bold text-slate-900 flex items-center justify-between gap-4 cursor-pointer hover:text-[#BE185D] transition-colors"
                  >
                    <span className="text-sm sm:text-base leading-snug">{faq.q}</span>
                    <ChevronDown
                      className={`w-5 h-5 text-slate-400 shrink-0 transition-transform duration-300 ${
                        isOpen ? "rotate-180 text-[#BE185D]" : ""
                      }`}
                    />
                  </button>
                  {isOpen && (
                    <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 12. FOOTER INSTITUTIONNEL AVEC LISERÉ FÉMININ & COORDONNÉES COMPLÈTES */}
      <footer className="bg-slate-950 text-slate-400 text-xs py-14 border-t-4 border-[#BE185D]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Col 1 */}
            <div className="space-y-4 md:col-span-1">
              <div className="bg-white p-3 rounded-2xl inline-block shadow-md border border-pink-100">
                <img
                  src="/images/logo_afdeef_complet.png"
                  alt="AFDEEF Logo Officiel"
                  className="h-12 w-auto object-contain"
                />
              </div>
              <p className="text-slate-300 text-xs leading-relaxed font-medium">
                Association des Femmes Dynamiques Engagées pour l'Épanouissement de la Famille.
              </p>
              <p className="text-pink-400 italic font-semibold text-xs">
                « L'union fait la force pour nos familles ♡ »
              </p>
            </div>

            {/* Col 2 */}
            <div className="space-y-2">
              <h4 className="text-white font-bold text-xs uppercase tracking-wider">
                Cadre Légal & Siège
              </h4>
              <p className="text-slate-400 leading-relaxed">
                Récépissé de Déclaration :<br />
                <span className="font-mono text-pink-300 font-semibold">
                  N° 00000852/RDA/JO6/A2/SAAJP/BAPP
                </span>
              </p>
              <p className="text-slate-400">
                Préfecture du Département du Mfoundi • Yaoundé
              </p>
              <p className="text-slate-400">Siège : Ngousso, Yaoundé, Cameroun</p>
            </div>

            {/* Col 3 */}
            <div className="space-y-2">
              <h4 className="text-white font-bold text-xs uppercase tracking-wider">
                Permanence & Écoute
              </h4>
              <p className="text-slate-300 flex items-center gap-2 font-bold">
                <Phone className="w-4 h-4 text-emerald-400" /> +237 678 04 64 26
              </p>
              <p className="text-slate-400 flex items-center gap-2">
                <Mail className="w-4 h-4 text-pink-400" /> contact@afdeef.org
              </p>
              <p className="text-slate-400 flex items-center gap-2">
                <MapPin className="w-4 h-4 text-amber-400" /> Yaoundé, Centre, Cameroun
              </p>
            </div>

            {/* Col 4 */}
            <div className="space-y-2">
              <h4 className="text-white font-bold text-xs uppercase tracking-wider">
                Navigation Rapide
              </h4>
              <ul className="space-y-1.5 text-slate-400 font-medium">
                <li>
                  <a href="#projets" className="hover:text-white transition-colors">
                    Projets en Co-financement
                  </a>
                </li>
                <li>
                  <a href="#transparence" className="hover:text-white transition-colors">
                    Statuts & Reçu Préfectoral
                  </a>
                </li>
                <li>
                  <a href="#documentaire" className="hover:text-white transition-colors">
                    Film Documentaire Officiel
                  </a>
                </li>
                <li>
                  <a href="#don" className="hover:text-white transition-colors">
                    Faire un Don Mobile Money
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500 font-medium">
            <p>© 2026 AFDEEF — Tous droits réservés.</p>
            <p className="text-slate-400">
              Plateforme institutionnelle dédiée à la mobilisation de financements et
              l’autonomisation communautaire des femmes et des familles.
            </p>
          </div>
        </div>
      </footer>

      {/* 13. WIDGET FLOTTANT PERMANENT D'URGENCE / WHATSAPP */}
      <div className="fixed bottom-6 right-6 z-50">
        <a
          href="https://wa.me/237678046426?text=Bonjour%20l'équipe%20AFDEEF,%20j'ai%20besoin%20d'une%20écoute%20ou%20d'un%20renseignement"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2.5 bg-[#25D366] hover:bg-[#20BA5C] text-white px-4 py-3 rounded-full shadow-2xl transition-all hover:scale-105 border-2 border-white cursor-pointer"
          title="Ligne d'écoute WhatsApp directe"
        >
          <Phone className="w-4 h-4 fill-white" />
          <span className="text-xs font-black hidden sm:inline">Écoute WhatsApp 24/7</span>
        </a>
      </div>

      {/* MODAL VIDÉO DOCUMENTAIRE PLEIN ÉCRAN */}
      {isVideoModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-4">
          <div className="relative w-full max-w-4xl bg-slate-900 rounded-3xl overflow-hidden shadow-2xl border-2 border-pink-400/40">
            <div className="flex items-center justify-between p-4 bg-slate-950 border-b border-slate-800">
              <h3 className="text-sm font-black text-white flex items-center gap-2">
                <Play className="w-4 h-4 text-[#BE185D] fill-[#BE185D]" />
                Documentaire Officiel AFDEEF — « Le Silence des Mères » (Novembre 2026)
              </h3>
              <button
                onClick={() => setIsVideoModalOpen(false)}
                className="text-slate-400 hover:text-white text-xl font-black px-2 py-1 cursor-pointer"
              >
                ✕
              </button>
            </div>
            <div className="relative aspect-16/9 bg-black flex items-center justify-center">
              <video
                controls
                autoPlay
                className="w-full h-full object-contain"
                src="/videos/AFDEEF_DOCUMENTAIRE_OFFICIEL_PAYSAGE_16X9.mp4"
              >
                Votre navigateur ne prend pas en charge la lecture de vidéos MP4.
              </video>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
