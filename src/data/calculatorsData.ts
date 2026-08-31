import { 
  CalculatorCategory, 
  CalculatorDefinition, 
  CategoryInfo 
} from '../types/calculator';
import {
  calculateBA13Ceiling,
  calculatePVCCeiling,
  calculateAcousticGridCeiling,
  calculateCoveCeiling,
  calculatePlasterCeiling,
  calculatePaintPrimer,
  calculateTiles,
  calculateConcrete,
  calculateBricks,
  calculateACSize,
  calculateMortgagePITI,
  calculateRentalYield,
  calculateAffordability,
  calculateClosingCosts,
  calculateWallpaper
} from '../utils/calculations';

export const CATEGORIES: CategoryInfo[] = [
  {
    id: 'ceilings',
    name: 'False Ceilings & Drywall',
    shortName: 'Ceilings & Drywall',
    tagline: 'Drywall, PVC, Acoustic Grid & Architectural Coves',
    description: 'Precision estimators for drywall boards, acoustic modular tiles, metal framing grids, suspension hangers, and indirect lighting drops.',
    badge: '5 Calculators',
    iconName: 'Grid3X3',
    count: 5,
  },
  {
    id: 'construction',
    name: 'Construction & Finishing',
    shortName: 'Construction & Finishes',
    tagline: 'Structural Slabs, Masonry, Paint, Tiles & HVAC',
    description: 'Engineering-grade estimators for concrete volumes, masonry units, tiling grids, surface coatings, and thermal BTU cooling requirements.',
    badge: '5 Calculators',
    iconName: 'Building2',
    count: 5,
  },
  {
    id: 'real-estate',
    name: 'Real Estate & Financial Analytics',
    shortName: 'Real Estate & Finance',
    tagline: 'Mortgages, Cap Rates, Affordability & Closing Costs',
    description: 'Underwriting models for amortization schedules, rental capitalization rates, 28/36 qualifying ratios, and conveyance closing costs.',
    badge: '5 Calculators',
    iconName: 'TrendingUp',
    count: 5,
  },
];

export const CALCULATORS: CalculatorDefinition[] = [
  // 1. BA13 Drywall Ceiling Calculator
  {
    id: 'ba13-drywall-ceiling',
    slug: 'ba13-drywall-ceiling',
    title: 'BA13 Drywall Ceiling Calculator',
    subtitle: 'Standard Suspended Plasterboard & F530 Metal Framing Estimator',
    category: 'ceilings',
    categoryName: 'False Ceilings & Drywall',
    iconName: 'Layers',
    shortDescription: 'Calculate BA13 plasterboard sheets, F530 furring channels, perimeter wall angles, suspension hangers, and joint compound with cut wastage.',
    badge: 'Most Popular',
    keywords: ['drywall', 'ba13', 'plasterboard', 'gypsum', 'f530', 'ceiling', 'furring', 'hanger'],
    inputs: [
      { id: 'roomLength', label: 'Room Length', unit: 'm', defaultValue: 5.0, min: 0.5, max: 50, step: 0.1, category: 'dimensions' },
      { id: 'roomWidth', label: 'Room Width', unit: 'm', defaultValue: 4.0, min: 0.5, max: 50, step: 0.1, category: 'dimensions' },
      { id: 'boardLength', label: 'Board Length', unit: 'm', defaultValue: 2.5, min: 1.8, max: 3.6, step: 0.1, category: 'materials' },
      { id: 'boardWidth', label: 'Board Width', unit: 'm', defaultValue: 1.2, min: 0.6, max: 1.5, step: 0.1, category: 'materials' },
      { id: 'wastagePct', label: 'Wastage & Cut Allowance', unit: '%', defaultValue: 10, min: 0, max: 30, step: 1, category: 'parameters' },
      { id: 'channelSpacing', label: 'F530 Channel Spacing', unit: 'm', defaultValue: 0.50, min: 0.30, max: 0.60, step: 0.05, category: 'parameters' },
      { id: 'hangerSpacing', label: 'Suspension Hanger Spacing', unit: 'm', defaultValue: 1.0, min: 0.6, max: 1.5, step: 0.1, category: 'parameters' },
      { id: 'compoundRate', label: 'Joint Compound Consumption', unit: 'kg/m²', defaultValue: 0.55, min: 0.2, max: 1.5, step: 0.05, category: 'materials' },
    ],
    methodology: {
      howItWorks: 'The calculator computes total ceiling surface area, applies a user-defined offcut and jointing wastage factor, and divides by the exact surface of standard drywall boards (e.g. 2.5m × 1.2m = 3.0 m²). Secondary calculations model the linear structural grid of primary F530 furring channels spanning across the width on specified centers, calculate perimeter perimeter trim for edge resting, and determine the array of threaded rods/hangers fixed to the structural soffit.',
      whatIsIncluded: [
        'Total BA13 plasterboard sheets with safety cut buffer',
        'F530 furring channel linear meters and standard 3m profile count',
        'Perimeter wall angle (28/27 or L-profile) pieces',
        'Acoustic suspension hangers and anchor points',
        'Joint compound ready-mix dry weight and tub count',
        'Self-drilling bugle-head drywall screws (25mm)',
      ],
      importantAssumptions: [
        'Default drywall sheet is standard European/International BA13 (12.5mm thickness, 2500 × 1200 mm).',
        'Furring channels are spaced at 500mm (0.50m) on-center, compliant with standard transverse board fixing.',
        'Primary suspension points are calculated along channel lines every 1000mm (1.0m).',
        'Perimeter wall angles run continuously along all 4 boundary walls with a 5% overlap allowance.',
      ],
      professionalNote: 'Irregular room geometry (L-shapes, alcoves, diagonal walls) or ceiling recesses will increase cutting waste. In high-humidity environments (bathrooms, kitchens), substitute standard BA13 with moisture-resistant WR (green) drywall boards, and ensure channel centers do not exceed 400mm.',
    },
    faqs: [
      {
        question: 'What is the standard spacing for F530 furring channels?',
        answer: 'The standard on-center spacing for F530 channels in residential and commercial suspended ceilings is 50cm (500mm) for boards installed perpendicular to the framing. In wet areas or with double-board systems, channel spacing is reduced to 40cm (400mm) for increased rigidity.',
      },
      {
        question: 'Why should I include a 10% wastage allowance?',
        answer: 'Drywall installation involves cutting boards around corners, light fixtures, and wall perimeters. Offcuts under 300mm frequently cannot be reused. A 10% wastage buffer ensures you do not run out of materials mid-installation.',
      },
      {
        question: 'How much joint compound do I need for BA13 ceilings?',
        answer: 'A standard suspended ceiling requires between 0.50 kg and 0.65 kg of ready-mixed compound per square meter for 3 successive coats (embedding tape, filling, and final skim coat).',
      },
      {
        question: 'What type of screws should be used for ceiling drywall?',
        answer: 'Use 25mm fine-thread self-piercing phosphate drywall screws for standard 0.6mm gauge metal profiles (F530), spaced every 20cm to 25cm along the framing lines.',
      },
    ],
    relatedCalculatorIds: ['acoustic-grid-ceiling', 'cove-ceiling', 'paint-primer'],
    calculate: calculateBA13Ceiling,
  },

  // 2. PVC Panel Ceiling Calculator
  {
    id: 'pvc-panel-ceiling',
    slug: 'pvc-panel-ceiling',
    title: 'PVC Panel Ceiling Calculator',
    subtitle: 'Tongue & Groove Moisture-Resistant Plastic Soffit Estimator',
    category: 'ceilings',
    categoryName: 'False Ceilings & Drywall',
    iconName: 'LayoutGrid',
    shortDescription: 'Estimate interlocking PVC ceiling panels, perimeter U-channels, timber or metal sub-battens, and concealed fastener clips.',
    keywords: ['pvc', 'panel', 'ceiling', 'soffit', 'plastic', 'waterproof', 'u-trim', 'batten'],
    inputs: [
      { id: 'roomLength', label: 'Room Length', unit: 'm', defaultValue: 4.5, min: 0.5, max: 40, step: 0.1, category: 'dimensions' },
      { id: 'roomWidth', label: 'Room Width', unit: 'm', defaultValue: 3.2, min: 0.5, max: 40, step: 0.1, category: 'dimensions' },
      { id: 'panelWidth', label: 'Panel Width', unit: 'mm', defaultValue: 250, min: 100, max: 600, step: 25, category: 'materials' },
      { id: 'panelLength', label: 'Panel Length', unit: 'm', defaultValue: 3.95, min: 2.0, max: 6.0, step: 0.05, category: 'materials' },
      { id: 'wastagePct', label: 'Wastage Allowance', unit: '%', defaultValue: 8, min: 0, max: 25, step: 1, category: 'parameters' },
      { id: 'battenSpacing', label: 'Batten Spacing', unit: 'm', defaultValue: 0.40, min: 0.25, max: 0.60, step: 0.05, category: 'parameters' },
    ],
    methodology: {
      howItWorks: 'The algorithm determines the orientation of panels along the optimal axis, calculates the total square meters, and calculates the quantity of interlocking planks required based on the individual panel face width and manufactured length. It simultaneously models the perpendicular sub-framing grid of battens needed to anchor the panels securely.',
      whatIsIncluded: [
        'PVC tongue-and-groove planks with trimming buffer',
        'Perimeter U-trim molding / F-trim perimeter tracks',
        'Treated timber or galvanized metal sub-battens',
        'Concealed stainless fixing clips / pan-head screws',
      ],
      importantAssumptions: [
        'Panels are installed perpendicular to the supporting battens.',
        'Perimeter U-trim runs continuously around the entire room edge to conceal raw panel cut edges.',
        'Sub-framing battens are spaced at 400mm (0.4m) intervals for zero sag.',
      ],
      professionalNote: 'PVC expands and contracts with ambient room temperature shifts. Always leave a 5mm expansion clearance inside perimeter U-trims and never nail panels directly through the face—always use slotted fixing flanges or clips.',
    },
    faqs: [
      {
        question: 'Which direction should PVC ceiling panels run?',
        answer: 'Panels are traditionally installed parallel to the incoming natural light from windows or along the longest room dimension to reduce joint visibility and minimize scrap offcuts.',
      },
      {
        question: 'Are PVC ceilings completely waterproof?',
        answer: 'Yes, 100% waterproof. PVC tongue-and-groove ceilings will not rot, warp, or support mold growth, making them ideal for bathrooms, laundry rooms, and sheltered outdoor eaves.',
      },
      {
        question: 'How do I secure PVC panels to the framing?',
        answer: 'Fasten the tongue flange into the supporting battens using 20mm drywall screws, stainless staple clips, or proprietary hidden fixing brackets.',
      },
      {
        question: 'Can recessed spotlights be installed in PVC panels?',
        answer: 'Yes. Use low-heat LED recessed downlights. Cut holes using a bi-metal hole saw and verify that the fixture wattage does not exceed the thermal limits of the PVC material.',
      },
    ],
    relatedCalculatorIds: ['ba13-drywall-ceiling', 'acoustic-grid-ceiling', 'paint-primer'],
    calculate: calculatePVCCeiling,
  },

  // 3. 60x60 Acoustic Grid Ceiling Estimator
  {
    id: 'acoustic-grid-ceiling',
    slug: 'acoustic-grid-ceiling',
    title: '60×60 Acoustic Grid Ceiling Estimator',
    subtitle: 'Commercial T-Bar Suspended Mineral Fiber Tile & Grid Estimator',
    category: 'ceilings',
    categoryName: 'False Ceilings & Drywall',
    iconName: 'Grid',
    shortDescription: 'Calculate 600×600mm acoustic tiles, cartons, T24 main runners (3.6m), 1.2m cross tees, 0.6m cross tees, and perimeter wall angle.',
    keywords: ['acoustic', 'grid', '60x60', 't24', 'tiles', 'suspended', 'mineral fiber', 'office ceiling'],
    inputs: [
      { id: 'roomLength', label: 'Room Length', unit: 'm', defaultValue: 6.0, min: 1.0, max: 60, step: 0.2, category: 'dimensions' },
      { id: 'roomWidth', label: 'Room Width', unit: 'm', defaultValue: 4.8, min: 1.0, max: 60, step: 0.2, category: 'dimensions' },
      { id: 'tileSize', label: 'Tile Dimension', unit: 'm', defaultValue: 0.60, min: 0.30, max: 1.20, step: 0.30, category: 'materials' },
      { id: 'wastagePct', label: 'Cut Wastage %', unit: '%', defaultValue: 8, min: 0, max: 20, step: 1, category: 'parameters' },
      { id: 'mainRunnerSpacing', label: 'Main Runner Spacing', unit: 'm', defaultValue: 1.20, min: 0.60, max: 1.50, step: 0.1, category: 'parameters' },
      { id: 'crossTeeSpacing', label: 'Cross Tee Module', unit: 'm', defaultValue: 0.60, min: 0.30, max: 1.20, step: 0.1, category: 'parameters' },
    ],
    methodology: {
      howItWorks: 'Calculates the complete exposed T-Bar modular grid network. Main runners (3.6m / 3.7m) are positioned parallel on 1.2m centerlines, connected with 1.2m cross tees and 0.6m cross tees to create 600×600mm pocket openings. The tile count includes perimeter border cut pieces and packaging box conversions.',
      whatIsIncluded: [
        '600×600mm lay-in or tegular acoustic tiles and commercial cartons',
        'Heavy-duty T24 / T15 Main Runners (3.6m standard)',
        'Cross Tees 1200mm (1.2m)',
        'Cross Tees 600mm (0.6m)',
        'Perimeter L-angle wall trim (3.0m)',
        'Adjustable wire hangers with anchor eyelets',
      ],
      importantAssumptions: [
        'Standard packaging benchmark: 16 tiles per box (5.76 m² net coverage).',
        'Main runners suspended from concrete slab or steel purlins every 1.2m.',
        'Calculations assume a standard rectangular module centered for balanced edge tiles.',
      ],
      professionalNote: 'To maintain a balanced aesthetic, plan the layout so that border cut tiles on opposite walls are equal in width and never smaller than half a tile (300mm).',
    },
    faqs: [
      {
        question: 'How many 60×60 tiles are in a standard commercial box?',
        answer: 'Most manufacturers (such as Armstrong, Rockfon, Knauf, and USG) package 600×600mm ceiling tiles in boxes of 16 pieces, covering approximately 5.76 m².',
      },
      {
        question: 'What is the difference between T24 and T15 exposed grids?',
        answer: 'T24 has an exposed face width of 24mm (the commercial standard), offering maximum structural strength. T15 is a slimmer 15mm grid for a more minimalist, high-end architectural finish.',
      },
      {
        question: 'How often are suspension hangers required?',
        answer: 'Hang main runners every 1.2 meters using 2mm galvanized suspension wire or adjustable spring clips to avoid deflection under lighting and HVAC loads.',
      },
      {
        question: 'Can grid ceilings accommodate heavy light fixtures?',
        answer: 'Standard 600×600mm LED flat panels rest directly in the grid. However, heavy fixtures, emergency lighting units, and fan coils should be independently supported from the structural soffit.',
      },
    ],
    relatedCalculatorIds: ['ba13-drywall-ceiling', 'cove-ceiling', 'ac-btu-size'],
    calculate: calculateAcousticGridCeiling,
  },

  // 4. Multi-Level & LED Cove Ceiling Estimator
  {
    id: 'cove-ceiling',
    slug: 'cove-ceiling',
    title: 'Multi-Level & LED Cove Ceiling Estimator',
    subtitle: 'Architectural Stepped Bulkhead, Drop Fascia & Indirect Light Trough Estimator',
    category: 'ceilings',
    categoryName: 'False Ceilings & Drywall',
    iconName: 'Sparkles',
    shortDescription: 'Estimate drop fascia drywall, light shelf framing, aluminum LED extrusion channels, diffusers, continuous LED strip reels, and driver wattage.',
    badge: 'Luxury',
    keywords: ['cove', 'led', 'multi-level', 'drop ceiling', 'bulkhead', 'ambient lighting', 'architectural'],
    inputs: [
      { id: 'roomLength', label: 'Room Length', unit: 'm', defaultValue: 5.5, min: 1.0, max: 40, step: 0.1, category: 'dimensions' },
      { id: 'roomWidth', label: 'Room Width', unit: 'm', defaultValue: 4.2, min: 1.0, max: 40, step: 0.1, category: 'dimensions' },
      { id: 'dropDepth', label: 'Drop Step Depth', unit: 'cm', defaultValue: 18, min: 8, max: 60, step: 2, category: 'dimensions' },
      { id: 'covePerimeter', label: 'LED Cove Perimeter Run', unit: 'm', defaultValue: 17.8, min: 2, max: 150, step: 0.5, category: 'parameters' },
      { id: 'framingSpacing', label: 'Bulkhead Stud Spacing', unit: 'm', defaultValue: 0.40, min: 0.25, max: 0.60, step: 0.05, category: 'parameters' },
      { id: 'wastagePct', label: 'Drywall Wastage %', unit: '%', defaultValue: 10, min: 0, max: 25, step: 1, category: 'parameters' },
      { id: 'stripWastage', label: 'LED Strip Trim Wastage %', unit: '%', defaultValue: 8, min: 0, max: 20, step: 1, category: 'parameters' },
    ],
    methodology: {
      howItWorks: 'Computes material requirements for multi-tiered recessed ceilings. Calculates the horizontal soffit surface plus the vertical drop fascia face and upturned light trough lip. Evaluates aluminum profile extrusion lengths, frosted diffuser covers, 24V LED strip reel quantities, and recommended power supply (driver) capacity with a 25% safety headroom.',
      whatIsIncluded: [
        'Continuous LED strip length and standard 5m reel breakdown',
        'Recommended 24V constant voltage LED driver sizing (Watts)',
        'Extruded aluminum channel profiles (2m pieces) + snap-on diffusers',
        'Drywall board sheets for primary soffit + vertical drop face',
        'Heavy-duty metal stud & track framing for stepped bulkheads',
      ],
      importantAssumptions: [
        'Standard high-density COB or 2835 LED strip rated at 14.4 Watts per linear meter.',
        'Power supply calculation incorporates a 25% continuous duty headroom buffer.',
        'Extruded aluminum profiles are calculated in standard 2.0-meter lengths.',
      ],
      professionalNote: 'For LED runs exceeding 5 to 7 meters in series, feed power to both ends or run parallel power injection wires to avoid visible voltage drop and dimming at the far end of the cove.',
    },
    faqs: [
      {
        question: 'What is the recommended drop depth for a hidden LED cove?',
        answer: 'A drop height between 15cm and 20cm with a 5cm to 8cm light trough lip allows optimal diffuse light throw across the ceiling without exposing the bare LED diodes.',
      },
      {
        question: 'Why are aluminum channels recommended for LED cove lighting?',
        answer: 'Aluminum extrusions act as heat sinks that extend the operating lifespan of the LED diodes and provide a smooth flat mounting base, while frosted diffusers eliminate pixelated glare.',
      },
      {
        question: 'What voltage should I choose for long ceiling cove runs?',
        answer: 'Always specify 24V DC (or 48V DC for commercial runs over 20m) rather than 12V DC to minimize current draw, heat generation, and voltage drop across long runs.',
      },
      {
        question: 'How do I size the LED driver power supply?',
        answer: 'Multiply total linear meters by the strip’s rated wattage per meter (e.g. 14.4 W/m), then add a 20% to 25% safety overhead buffer to ensure the transformer operates coolly and reliably.',
      },
    ],
    relatedCalculatorIds: ['ba13-drywall-ceiling', 'paint-primer', 'ac-btu-size'],
    calculate: calculateCoveCeiling,
  },

  // 5. Traditional Plaster & Staff Ceiling Estimator
  {
    id: 'plaster-staff-ceiling',
    slug: 'plaster-staff-ceiling',
    title: 'Traditional Plaster & Staff Ceiling Estimator',
    subtitle: 'Moulding Gypsum, Natural Hemp Fiber (Filasse) & Cornice Estimator',
    category: 'ceilings',
    categoryName: 'False Ceilings & Drywall',
    iconName: 'Scroll',
    shortDescription: 'Estimate fine casting plaster 25kg bags, vegetal hemp reinforcement (filasse), mixing water ratio, and decorative plaster cornices.',
    keywords: ['plaster', 'staff', 'cornice', 'gypsum', 'filasse', 'moulding', 'ornamental', 'traditional ceiling'],
    inputs: [
      { id: 'roomLength', label: 'Room Length', unit: 'm', defaultValue: 5.0, min: 1.0, max: 40, step: 0.1, category: 'dimensions' },
      { id: 'roomWidth', label: 'Room Width', unit: 'm', defaultValue: 4.0, min: 1.0, max: 40, step: 0.1, category: 'dimensions' },
      { id: 'plasterCoverage', label: 'Plaster Consumption Rate', unit: 'kg/m²', defaultValue: 11.5, min: 5, max: 25, step: 0.5, category: 'materials' },
      { id: 'fiberRate', label: 'Hemp Fiber Rate (Filasse)', unit: 'kg/m²', defaultValue: 0.35, min: 0.1, max: 1.0, step: 0.05, category: 'materials' },
      { id: 'cornicePieceLength', label: 'Cornice Piece Length', unit: 'm', defaultValue: 2.0, min: 1.0, max: 3.0, step: 0.25, category: 'materials' },
      { id: 'wastagePct', label: 'Wastage Factor %', unit: '%', defaultValue: 10, min: 0, max: 25, step: 1, category: 'parameters' },
    ],
    methodology: {
      howItWorks: 'Estimates materials for traditional staff moulding and fibrous plaster ceilings. Uses material mass ratios: high-purity moulding plaster (semi-hydrate gypsum) blended with combed vegetable hemp fiber (filasse) soaked in plaster slip to form structural staff wicks and lightweight cast decorative cornices.',
      whatIsIncluded: [
        'Total high-grade moulding plaster (25kg bags)',
        'Natural unspun hemp fiber (filasse) mass in kilograms',
        'Decorative cornice moldings with corner mitre cuts',
        'Estimated batch water volume for mixing',
      ],
      importantAssumptions: [
        'Plaster consumption rate accounts for standard 10mm to 12mm cast staff thickness.',
        'Vegetal hemp fiber consumption benchmarked at 0.35 kg/m² for structural arming.',
        'Water-to-plaster ratio calibrated at ~70-75% for casting grade gypsum.',
      ],
      professionalNote: 'Staff plaster work requires skilled artisans. Surfaces must dry thoroughly (14 to 28 days depending on ambient ventilation) before applying sealers, oil primers, or waterborne ceiling paints.',
    },
    faqs: [
      {
        question: 'What is staff plaster work?',
        answer: 'Staff is a prefabricated fibrous plaster composition made of casting gypsum reinforced with vegetal sisal or hemp fibers (filasse), invented in France in the 19th century for lightweight, non-combustible ornamental ceilings.',
      },
      {
        question: 'Why is hemp fiber (filasse) essential in staff ceilings?',
        answer: 'Raw plaster has high compressive strength but low tensile strength. Intertwined hemp fibers provide exceptional tensile resilience, preventing cracking and allowing large ornate panels to be hung securely.',
      },
      {
        question: 'How are plaster cornices fixed to walls and ceilings?',
        answer: 'Plaster cornices are buttered with fresh casting plaster adhesive and temporarily screwed into studs, or secured with soaked staff wicks tied back to ceiling joists.',
      },
      {
        question: 'What type of plaster is required for mouldings?',
        answer: 'Use fine casting plaster (such as Plâtre fin de moulage or Moulding Plaster Alpha/Beta) with a fine mesh particle size and 15-25 minute initial setting window.',
      },
    ],
    relatedCalculatorIds: ['ba13-drywall-ceiling', 'cove-ceiling', 'paint-primer'],
    calculate: calculatePlasterCeiling,
  },

  // 6. Room Paint & Primer Calculator
  {
    id: 'paint-primer',
    slug: 'paint-primer',
    title: 'Room Paint & Primer Calculator',
    subtitle: 'Interior Wall, Ceiling & Opening Deduction Coating Estimator',
    category: 'construction',
    categoryName: 'Construction & Finishing',
    iconName: 'Paintbrush',
    shortDescription: 'Calculate net paintable wall and ceiling areas with window/door opening deductions, multi-coat paint liters, and dedicated primer sealer volumes.',
    badge: 'Essential',
    keywords: ['paint', 'primer', 'room', 'walls', 'ceiling', 'coating', 'liters', 'decorating'],
    inputs: [
      { id: 'roomLength', label: 'Room Length', unit: 'm', defaultValue: 4.5, min: 1.0, max: 40, step: 0.1, category: 'dimensions' },
      { id: 'roomWidth', label: 'Room Width', unit: 'm', defaultValue: 3.5, min: 1.0, max: 40, step: 0.1, category: 'dimensions' },
      { id: 'wallHeight', label: 'Wall Height', unit: 'm', defaultValue: 2.7, min: 1.8, max: 10, step: 0.1, category: 'dimensions' },
      { id: 'openingsArea', label: 'Doors & Windows Deduction', unit: 'm²', defaultValue: 4.2, min: 0, max: 50, step: 0.2, category: 'parameters' },
      { id: 'finishCoats', label: 'Finish Paint Coats', unit: 'coats', defaultValue: 2, min: 1, max: 4, step: 1, category: 'parameters' },
      { id: 'paintCoverage', label: 'Paint Coverage Rate', unit: 'm²/L', defaultValue: 10.5, min: 6, max: 16, step: 0.5, category: 'materials' },
      { id: 'primerCoats', label: 'Sealer / Primer Coats', unit: 'coats', defaultValue: 1, min: 0, max: 2, step: 1, category: 'parameters' },
      { id: 'primerCoverage', label: 'Primer Coverage Rate', unit: 'm²/L', defaultValue: 11.0, min: 6, max: 16, step: 0.5, category: 'materials' },
      { id: 'includeCeiling', label: 'Include Ceiling in Paint Area', unit: '1=Yes / 0=No', defaultValue: 1, min: 0, max: 1, step: 1, category: 'parameters' },
    ],
    methodology: {
      howItWorks: 'Calculates the gross vertical perimeter wall area ($2 \times (L+W) \times H$), subtracts unpainted openings (doors, windows, built-ins), and adds ceiling surface if selected. Divides the net square meters by manufacturer spread rates (m²/L) and multiplies across multiple coat applications.',
      whatIsIncluded: [
        'Total finish paint volume in Liters',
        'Dedicated primer/sealer volume in Liters',
        'Net paintable surface area breakdown (walls vs ceiling)',
        'Gross wall surface and deducted opening areas',
      ],
      importantAssumptions: [
        'Standard premium emulsion coverage: 10–12 m² per Liter per coat on primed surfaces.',
        'Drywall primer coverage: 10–11 m² per Liter.',
        'Doors and windows deducted at 1.8 m² per standard interior door and 1.5 m² per average window.',
      ],
      professionalNote: 'Unprimed bare plaster, drywall paper, or porous masonry will absorb significantly more paint on the first coat. Always apply an acrylic stabilizing primer before finish coats to prevent patchy sheen flashing.',
    },
    faqs: [
      {
        question: 'Why is a primer coat necessary on fresh drywall?',
        answer: 'Unpainted drywall paper and joint compound have different porosity. A primer seals the surface uniformly so the topcoat color and sheen dry consistently without suction spots.',
      },
      {
        question: 'How many coats of paint are typically needed?',
        answer: 'Two coats of premium emulsion over a primed surface provide full opacity, uniform color depth, and durable scrub resistance. Drastic color transitions may require three coats.',
      },
      {
        question: 'How much paint is inside standard commercial cans?',
        answer: 'Standard retail packaging includes 1 Liter, 2.5 Liters, 5 Liters, and 10 Liters (or 1 Gallon = 3.78L in imperial markets). Always round up to the nearest commercial can size.',
      },
      {
        question: 'How do I measure door and window deductions?',
        answer: 'A standard interior single door is roughly 0.9m × 2.0m = 1.8 m². A standard residential window is approximately 1.2m × 1.2m = 1.44 m².',
      },
    ],
    relatedCalculatorIds: ['wallpaper-roll', 'tiles-estimator', 'ba13-drywall-ceiling'],
    calculate: calculatePaintPrimer,
  },

  // 7. Floor & Wall Tile Estimator
  {
    id: 'tiles-estimator',
    slug: 'tiles-estimator',
    title: 'Floor & Wall Tile Estimator',
    subtitle: 'Porcelain, Ceramic, Wastage Margin & Grout Compound Estimator',
    category: 'construction',
    categoryName: 'Construction & Finishing',
    iconName: 'Grid2X2',
    shortDescription: 'Calculate tile piece quantities, total purchased square meters with cutting wastage, carton boxes, tile adhesive bags, and joint grout compound.',
    badge: 'Popular',
    keywords: ['tile', 'floor', 'wall', 'porcelain', 'ceramic', 'grout', 'adhesive', 'tiling'],
    inputs: [
      { id: 'surfaceLength', label: 'Surface Length', unit: 'm', defaultValue: 5.0, min: 0.5, max: 40, step: 0.1, category: 'dimensions' },
      { id: 'surfaceWidth', label: 'Surface Width', unit: 'm', defaultValue: 3.8, min: 0.5, max: 40, step: 0.1, category: 'dimensions' },
      { id: 'tileLength', label: 'Tile Length', unit: 'cm', defaultValue: 60, min: 10, max: 180, step: 5, category: 'materials' },
      { id: 'tileWidth', label: 'Tile Width', unit: 'cm', defaultValue: 60, min: 10, max: 180, step: 5, category: 'materials' },
      { id: 'wastagePct', label: 'Cutting & Breakage Wastage %', unit: '%', defaultValue: 10, min: 0, max: 25, step: 1, category: 'parameters' },
      { id: 'groutRate', label: 'Grout Consumption Rate', unit: 'kg/m²', defaultValue: 0.45, min: 0.1, max: 1.5, step: 0.05, category: 'materials' },
    ],
    methodology: {
      howItWorks: 'Computes total surface area ($L \times W$), scales by the selected wastage percentage (default 10%), and divides by the area of an individual tile unit ($TL \times TW$). Additional modules determine tile packaging box quantities, cementitious flexible adhesive mortar bed weight, and joint grout requirement.',
      whatIsIncluded: [
        'Total tile count in individual units',
        'Total purchased tile coverage (m²)',
        'Estimated manufacturer carton boxes',
        'Joint grout dry compound (kg)',
        'Flexible polymer-modified tile adhesive (25kg bags)',
      ],
      importantAssumptions: [
        'Default wastage is 10% for straight grid layouts. Diagonal or herringbone patterns require 15% to 20%.',
        'Standard tile adhesive consumption benchmarked at 4.5 kg/m² for an 8-10mm notched trowel bed.',
        'Grout consumption based on standard 2-3mm joint lines.',
      ],
      professionalNote: 'Always retain 1 full extra box of tiles from the same manufacturing batch (dye lot / caliber) for future repairs, plumbing access, or subfloor repairs.',
    },
    faqs: [
      {
        question: 'Why is 10% standard wastage recommended for tiling?',
        answer: 'Perimeter cuts, corner transitions, cuts around plumbing pipes, and occasional transit breakage consume 8% to 12% of material even with expert installers.',
      },
      {
        question: 'How much extra tile is required for herringbone or diagonal patterns?',
        answer: 'Diagonal and herringbone layouts generate continuous triangular perimeter offcuts that cannot be reused. Increase your wastage buffer to 15% or 20%.',
      },
      {
        question: 'How do I choose the correct tile grout width?',
        answer: 'Rectified porcelain tiles with sharp 90-degree edges can be set with 1.5mm to 2mm joints. Pressed ceramic or outdoor pavers require 3mm to 5mm joints for thermal movement.',
      },
      {
        question: 'How many bags of tile adhesive do I need?',
        answer: 'Thin-bed adhesive usage averages 4.5kg per square meter. A standard 25kg bag covers roughly 5.0 to 5.5 m² of floor area.',
      },
    ],
    relatedCalculatorIds: ['paint-primer', 'concrete-volume', 'wallpaper-roll'],
    calculate: calculateTiles,
  },

  // 8. Concrete Volume & Slab Calculator
  {
    id: 'concrete-volume',
    slug: 'concrete-volume',
    title: 'Concrete Volume & Slab Calculator',
    subtitle: 'Foundation Footing, Slab-on-Grade & Premix Bag Yield Estimator',
    category: 'construction',
    categoryName: 'Construction & Finishing',
    iconName: 'Boxes',
    shortDescription: 'Calculate slab and foundation concrete volumes in cubic meters (m³) and cubic yards (yd³), weight in tonnes, and approximate premix dry bags.',
    keywords: ['concrete', 'slab', 'volume', 'cubic meters', 'cubic yards', 'foundation', 'premix', 'cement'],
    inputs: [
      { id: 'length', label: 'Slab Length', unit: 'm', defaultValue: 6.0, min: 0.5, max: 100, step: 0.1, category: 'dimensions' },
      { id: 'width', label: 'Slab Width', unit: 'm', defaultValue: 4.0, min: 0.5, max: 100, step: 0.1, category: 'dimensions' },
      { id: 'thickness', label: 'Slab Thickness', unit: 'cm', defaultValue: 12, min: 5, max: 100, step: 1, category: 'dimensions' },
      { id: 'wastagePct', label: 'Spillage & Excavation Wastage %', unit: '%', defaultValue: 8, min: 0, max: 25, step: 1, category: 'parameters' },
      { id: 'bagSize', label: 'Premix Bag Weight', unit: 'kg', defaultValue: 25, min: 20, max: 40, step: 5, category: 'materials' },
    ],
    methodology: {
      howItWorks: 'Calculates the true geometric volume ($L \times W \times (T/100)$), incorporates a safety buffer for ground subbase deflection and formwork bowing, and converts cleanly into both metric cubic meters (m³) and imperial cubic yards (yd³). An approximation algorithm calculates dry premix bag counts based on manufacturer bulk density (~2150-2200 kg/m³ yield).',
      whatIsIncluded: [
        'Total concrete volume in cubic meters (m³)',
        'Equivalent volume in imperial cubic yards (yd³)',
        'Theoretical net volume vs. factored delivery order volume',
        'Estimated premix dry concrete bags (25kg or 40kg)',
        'Total cured concrete mass in tonnes',
      ],
      importantAssumptions: [
        'Wastage factor defaults to 8% to account for uneven subgrade and formwork deflection.',
        '1 cubic meter of wet consolidated structural concrete weighs approximately 2,400 kg (2.4 tonnes).',
        '1 cubic meter equals 1.30795 cubic yards.',
      ],
      professionalNote: 'Premix bag conversion is an approximation because actual consolidated yield varies by brand, aggregate gradation, and water content. For projects requiring over 1.5 m³, ready-mix batch truck delivery is generally far more cost-effective and structurally uniform.',
    },
    faqs: [
      {
        question: 'What thickness is recommended for a residential concrete slab?',
        answer: 'Pedestrian patios and walkways require 10cm (4 inches). Light vehicle driveways and garage slabs require at least 12cm to 15cm (5-6 inches) with steel mesh reinforcement.',
      },
      {
        question: 'How many 25kg bags of concrete premix make 1 cubic meter?',
        answer: 'It takes approximately 85 to 90 standard 25kg premix bags (or about 50 to 55 40kg bags) to mix 1 cubic meter of consolidated concrete.',
      },
      {
        question: 'Why should I add 8% to 10% extra concrete to my order?',
        answer: 'Subgrade soil is never perfectly flat, forms deflect slightly under hydrostatic wet concrete pressure, and residual concrete remains coated on the truck chute.',
      },
      {
        question: 'How long does concrete take to cure to full structural strength?',
        answer: 'Concrete reaches ~70% of its design compressive strength in 7 days, and achieves its specified 28-day standard cure strength under proper moist curing conditions.',
      },
    ],
    relatedCalculatorIds: ['bricks-blocks', 'tiles-estimator', 'paint-primer'],
    calculate: calculateConcrete,
  },

  // 9. Brick & Block Wall Calculator
  {
    id: 'bricks-blocks',
    slug: 'bricks-blocks',
    title: 'Brick & Block Wall Calculator',
    subtitle: 'Masonry Unit Quantity & Laying Mortar Allowance Estimator',
    category: 'construction',
    categoryName: 'Construction & Finishing',
    iconName: 'Wall',
    shortDescription: 'Calculate brick or concrete cinder block counts, effective mortar joint allowance, cement bags, and building sand for masonry walls.',
    keywords: ['brick', 'block', 'wall', 'masonry', 'cinder block', 'mortar', 'cement', 'sand'],
    inputs: [
      { id: 'wallLength', label: 'Wall Length', unit: 'm', defaultValue: 8.0, min: 0.5, max: 100, step: 0.2, category: 'dimensions' },
      { id: 'wallHeight', label: 'Wall Height', unit: 'm', defaultValue: 2.6, min: 0.5, max: 20, step: 0.1, category: 'dimensions' },
      { id: 'unitLength', label: 'Unit Length (Brick/Block)', unit: 'cm', defaultValue: 20, min: 10, max: 60, step: 1, category: 'materials' },
      { id: 'unitHeight', label: 'Unit Height (Brick/Block)', unit: 'cm', defaultValue: 10, min: 4, max: 30, step: 1, category: 'materials' },
      { id: 'mortarJoint', label: 'Mortar Joint Thickness', unit: 'mm', defaultValue: 10, min: 5, max: 20, step: 1, category: 'parameters' },
      { id: 'wastagePct', label: 'Cutting & Breakage %', unit: '%', defaultValue: 5, min: 0, max: 15, step: 1, category: 'parameters' },
    ],
    methodology: {
      howItWorks: 'Calculates the gross wall elevation area ($L \times H$). Determines the effective modular face area of each unit including the surrounding mortar joint line ($ (UL + MJ) \times (UH + MJ) $). Multiplies the required units by a breakage factor and models total laying mortar volume ($~0.022\text{ m}^3\text{/m}^2$) alongside cement and sand components.',
      whatIsIncluded: [
        'Total masonry units (bricks or hollow concrete blocks)',
        'Gross wall elevation area (m²)',
        'Laying mortar volume allowance (m³)',
        'Standard masonry cement (50kg bags)',
        'Fine building sand volume (tonnes)',
      ],
      importantAssumptions: [
        'Mortar joints are calculated at a standard 10mm bed and perp joint thickness.',
        'Calculations assume a single-wythe (single leaf) wall construction.',
        'Mortar mix ratio benchmarked at 1:4 cement to washed building sand.',
      ],
      professionalNote: 'Deduct large door and window openings manually or calculate separate wall segments. For structural retaining walls or multi-story loadbearing walls, consult a structural engineer for rebar and core-fill grout specifications.',
    },
    faqs: [
      {
        question: 'What is the standard size of a construction brick vs. hollow block?',
        answer: 'Standard international red clay bricks are typically 19–22cm length × 6.5–10cm height. Concrete cinder blocks (CMUs) are commonly 39cm length × 19cm height (40×20cm modular).',
      },
      {
        question: 'How thick should mortar joints be?',
        answer: 'Standard masonry specifications call for 10mm (3/8 inch) uniform horizontal bed joints and vertical head (perp) joints.',
      },
      {
        question: 'How much mortar is needed per 1000 bricks?',
        answer: 'Laying 1,000 standard bricks typically requires approximately 0.25 to 0.30 cubic meters of wet mixed mortar (~7-8 bags of 50kg cement and 0.4 tonnes of sand).',
      },
      {
        question: 'Why is a 5% wastage allowance included?',
        answer: 'Bricks frequently fracture during transit, handling, and while cutting half-bats for wall ends and bond interlocks.',
      },
    ],
    relatedCalculatorIds: ['concrete-volume', 'paint-primer', 'tiles-estimator'],
    calculate: calculateBricks,
  },

  // 10. Air Conditioner BTU Size Calculator
  {
    id: 'ac-btu-size',
    slug: 'ac-btu-size',
    title: 'Air Conditioner BTU Size Calculator',
    subtitle: 'Thermal Cooling Load, Refrigeration Tonnage & HVAC Capacity Estimator',
    category: 'construction',
    categoryName: 'Construction & Finishing',
    iconName: 'Wind',
    shortDescription: 'Estimate room thermal load in BTU/h, refrigeration tonnage, and metric kW cooling capacity based on dimensions, climate, sun exposure, and occupancy.',
    badge: 'HVAC',
    keywords: ['ac', 'air conditioner', 'btu', 'cooling', 'hvac', 'tonnage', 'climate', 'thermal load'],
    inputs: [
      { id: 'roomLength', label: 'Room Length', unit: 'm', defaultValue: 5.0, min: 1.0, max: 30, step: 0.1, category: 'dimensions' },
      { id: 'roomWidth', label: 'Room Width', unit: 'm', defaultValue: 4.0, min: 1.0, max: 30, step: 0.1, category: 'dimensions' },
      { id: 'roomHeight', label: 'Ceiling Height', unit: 'm', defaultValue: 2.7, min: 2.0, max: 6.0, step: 0.1, category: 'dimensions' },
      { 
        id: 'climateMultiplier', 
        label: 'Climate Zone', 
        unit: 'factor', 
        defaultValue: 1.15, 
        min: 1.0, 
        max: 1.35, 
        step: 0.05, 
        category: 'parameters',
        options: [
          { label: 'Moderate / Temperate (1.00x)', value: 1.00 },
          { label: 'Warm / Mediterranean (1.15x)', value: 1.15 },
          { label: 'Hot / Desert / Tropical (1.30x)', value: 1.30 }
        ]
      },
      { id: 'occupants', label: 'Typical Occupants', unit: 'persons', defaultValue: 2, min: 1, max: 20, step: 1, category: 'parameters' },
      { 
        id: 'sunExposure', 
        label: 'Solar Exposure', 
        unit: 'factor', 
        defaultValue: 1.0, 
        min: 0.9, 
        max: 1.2, 
        step: 0.05, 
        category: 'parameters',
        options: [
          { label: 'Heavily Shaded / North-facing (0.90x)', value: 0.90 },
          { label: 'Average Daylight (1.00x)', value: 1.00 },
          { label: 'Direct Afternoon Sun / West-facing (1.15x)', value: 1.15 }
        ]
      },
      { 
        id: 'insulationFactor', 
        label: 'Building Insulation Quality', 
        unit: 'factor', 
        defaultValue: 1.0, 
        min: 0.9, 
        max: 1.25, 
        step: 0.05, 
        category: 'parameters',
        options: [
          { label: 'Modern Double-Glazed / Insulated (0.95x)', value: 0.95 },
          { label: 'Standard Residential (1.00x)', value: 1.00 },
          { label: 'Poor / Single-Glazed / Uninsulated (1.20x)', value: 1.20 }
        ]
      },
    ],
    methodology: {
      howItWorks: 'Computes sensible and latent cooling demands based on room cubic volume, base area load (~350–400 BTU/m²), ambient climate zone coefficients, building envelope insulation efficiency, occupant metabolic heat dissipation (+600 BTU/h per extra person), and solar radiation factors. Rounds to standard commercial split-system capacities (9k, 12k, 18k, 24k, 30k, 36k BTU/h).',
      whatIsIncluded: [
        'Recommended commercial cooling capacity in BTU/h',
        'Refrigeration capacity in standard Tonnage (1 Ton = 12,000 BTU/h)',
        'Thermal cooling output in metric Kilowatts (kW)',
        'Total conditioned air volume in cubic meters (m³)',
      ],
      importantAssumptions: [
        'Calculations assume a standard residential living space or bedroom application.',
        '1 Ton of refrigeration equals 12,000 BTU/hr (approx 3.517 kW thermal).',
        'Ceiling heights exceeding 2.5m include volumetric compensation factors.',
      ],
      professionalNote: 'This tool provides a sizing estimate for preliminary planning. Final HVAC equipment selection, multi-split zone design, and commercial ducting require a certified Manual J / ASHRAE load calculation by a licensed mechanical engineer.',
    },
    faqs: [
      {
        question: 'What is a BTU and what does it measure?',
        answer: 'BTU stands for British Thermal Unit. In air conditioning, BTU/h measures the amount of thermal heat an AC unit can remove from an enclosed space within one hour.',
      },
      {
        question: 'What happens if I buy an oversized air conditioner?',
        answer: 'An oversized AC cools the room too quickly without running long enough to dehumidify the air, resulting in a cold, clammy room and excessive compressor short-cycling that wastes electricity.',
      },
      {
        question: 'How many BTUs are in 1 Ton of AC capacity?',
        answer: '1 Ton of air conditioning capacity equals exactly 12,000 BTU/h (approx 3.517 kW of thermal cooling). A 1.5 Ton system equals 18,000 BTU/h.',
      },
      {
        question: 'Does a kitchen or server room require higher BTU sizing?',
        answer: 'Yes. Kitchens generate intense heat from ovens and stoves (+4,000 BTU minimum), and server rooms require dedicated continuous cooling calculated based on computer hardware wattage.',
      },
    ],
    relatedCalculatorIds: ['cove-ceiling', 'paint-primer', 'concrete-volume'],
    calculate: calculateACSize,
  },

  // 11. Mortgage Amortization & PITI Calculator
  {
    id: 'mortgage-piti',
    slug: 'mortgage-piti',
    title: 'Mortgage Amortization & PITI Calculator',
    subtitle: 'Principal, Interest, Property Tax, Insurance & HOA Full Schedule Underwriter',
    category: 'real-estate',
    categoryName: 'Real Estate & Financial Analytics',
    iconName: 'Calculator',
    shortDescription: 'Calculate monthly PITI payments, loan principal vs. interest breakdown, total lifetime borrowing costs, and interactive monthly amortization schedule table.',
    badge: 'Underwriting',
    keywords: ['mortgage', 'piti', 'amortization', 'loan', 'interest', 'real estate', 'financing', 'property tax'],
    inputs: [
      { id: 'purchasePrice', label: 'Purchase Price', unit: '$', defaultValue: 450000, min: 10000, max: 10000000, step: 5000, category: 'financial' },
      { id: 'downPayment', label: 'Down Payment', unit: '$', defaultValue: 90000, min: 0, max: 10000000, step: 5000, category: 'financial' },
      { id: 'interestRate', label: 'Annual Interest Rate (APR)', unit: '%', defaultValue: 6.5, min: 0.1, max: 20, step: 0.1, category: 'financial' },
      { id: 'loanTerm', label: 'Loan Term', unit: 'years', defaultValue: 30, min: 5, max: 40, step: 5, category: 'financial' },
      { id: 'propertyTaxRate', label: 'Annual Property Tax Rate', unit: '%', defaultValue: 1.20, min: 0, max: 5.0, step: 0.05, category: 'parameters' },
      { id: 'annualInsurance', label: 'Annual Homeowners Insurance', unit: '$/yr', defaultValue: 1400, min: 0, max: 20000, step: 50, category: 'financial' },
      { id: 'monthlyHOA', label: 'Monthly HOA / Condo Dues', unit: '$/mo', defaultValue: 150, min: 0, max: 5000, step: 25, category: 'financial' },
    ],
    methodology: {
      howItWorks: 'Uses the standard fixed-rate compound amortization formula ($P \times \frac{r(1+r)^N}{(1+r)^N - 1}$) to compute monthly debt service. Accurately stacks escrow lines: assessed property tax (annual rate converted to monthly), hazard homeowners insurance, and mandatory HOA dues to determine the total monthly PITI outlay. Generates a month-by-month debt paydown schedule.',
      whatIsIncluded: [
        'Total all-in Monthly PITI Payment',
        'Principal & Interest (P&I) monthly debt service',
        'Monthly Property Tax and Hazard Insurance escrow breakdown',
        'Total lifetime interest paid over full loan maturity',
        'Full interactive month-by-month Amortization Schedule table',
      ],
      importantAssumptions: [
        'Calculations assume a standard fixed-rate fully amortizing mortgage loan.',
        'Property taxes are calculated against the purchase price assessment value.',
        'Private Mortgage Insurance (PMI) is not included in baseline P&I and applies if down payment is under 20%.',
      ],
      professionalNote: 'This calculation is a financial model for planning purposes. Actual mortgage offers depend on borrower credit scores, debt-to-income (DTI) underwriting, escrow reserves, and lender origination points.',
    },
    faqs: [
      {
        question: 'What does PITI stand for in real estate financing?',
        answer: 'PITI stands for Principal, Interest, Taxes, and Insurance. It represents the complete recurring monthly housing expense that mortgage lenders evaluate during underwriting.',
      },
      {
        question: 'How does loan term affect total lifetime interest?',
        answer: 'A 15-year mortgage has higher monthly payments than a 30-year mortgage, but drastically reduces total lifetime interest by amortizing principal twice as fast at typically lower interest rates.',
      },
      {
        question: 'What is Private Mortgage Insurance (PMI)?',
        answer: 'PMI is a monthly lender fee (typically 0.3% to 1.2% of the loan amount annually) required when conventional borrowers put down less than 20% equity.',
      },
      {
        question: 'How do extra principal payments accelerate mortgage payoff?',
        answer: 'Because monthly interest is calculated against the remaining principal balance, any additional principal payment directly reduces future interest compounding and shortens the loan term.',
      },
    ],
    relatedCalculatorIds: ['affordability-calc', 'rental-yield', 'closing-costs'],
    calculate: calculateMortgagePITI,
  },

  // 12. Rental Yield, Cap Rate & ROI Estimator
  {
    id: 'rental-yield',
    slug: 'rental-yield',
    title: 'Rental Yield, Cap Rate & ROI Estimator',
    subtitle: 'Commercial & Residential Income Property Valuation & Return Underwriter',
    category: 'real-estate',
    categoryName: 'Real Estate & Financial Analytics',
    iconName: 'LineChart',
    shortDescription: 'Calculate Gross & Net Rental Yields, Capitalization Rate (Cap Rate), Net Operating Income (NOI), Cash-on-Cash ROI, and capital growth appreciation.',
    badge: 'Investors',
    keywords: ['cap rate', 'rental yield', 'noi', 'roi', 'cash on cash', 'investment', 'real estate', 'property'],
    inputs: [
      { id: 'purchasePrice', label: 'Asset Acquisition Price', unit: '$', defaultValue: 360000, min: 10000, max: 20000000, step: 5000, category: 'financial' },
      { id: 'downPayment', label: 'Initial Cash Equity Invested', unit: '$', defaultValue: 72000, min: 1000, max: 20000000, step: 5000, category: 'financial' },
      { id: 'monthlyRent', label: 'Gross Monthly Rent', unit: '$/mo', defaultValue: 2500, min: 100, max: 100000, step: 50, category: 'financial' },
      { id: 'vacancyPct', label: 'Vacancy & Credit Loss %', unit: '%', defaultValue: 5.0, min: 0, max: 25, step: 0.5, category: 'parameters' },
      { id: 'annualOpex', label: 'Annual Operating Expenses', unit: '$/yr', defaultValue: 5800, min: 0, max: 200000, step: 100, category: 'financial' },
      { id: 'appreciationPct', label: 'Projected Annual Capital Growth', unit: '%', defaultValue: 3.5, min: 0, max: 15, step: 0.5, category: 'parameters' },
    ],
    methodology: {
      howItWorks: 'Evaluates real estate investment performance. Calculates Annual Gross Rent ($Rent \times 12$), deducts expected vacancy loss to find Effective Gross Income (EGI), and subtracts non-mortgage Operating Expenses (taxes, insurance, management, maintenance, reserves) to yield Net Operating Income (NOI). Derives un-leveraged Cap Rate ($NOI / Price$) and estimated Cash-on-Cash equity return.',
      whatIsIncluded: [
        'Capitalization Rate (Cap Rate %)',
        'Net Operating Income (NOI)',
        'Gross Rental Yield vs. Net Rental Yield',
        'Estimated Cash-on-Cash ROI proxy on invested equity',
        'Projected annual capital appreciation growth',
      ],
      importantAssumptions: [
        'Cap rate measures unleveraged property performance independent of individual financing structure.',
        'Operating expenses (Opex) include property taxes, insurance, repairs, and management, but exclude debt service.',
        'Cash-on-Cash proxy assumes standard amortized debt service on non-equity balance.',
      ],
      professionalNote: 'A higher Cap Rate indicates higher yield but often reflects higher market risk or deferred maintenance. Always stress-test investment properties against higher vacancy spikes and major capital expenditure (CapEx) events.',
    },
    faqs: [
      {
        question: 'What is the difference between Cap Rate and Cash-on-Cash ROI?',
        answer: 'Cap Rate measures the property’s unleveraged operating yield relative to total purchase price. Cash-on-Cash ROI measures the actual annual cash return relative to your specific cash equity invested after paying debt service.',
      },
      {
        question: 'What is considered a good Cap Rate for rental real estate?',
        answer: 'Typical residential and commercial cap rates range from 4% to 6% in prime tier-1 metropolitan markets and 7% to 10%+ in secondary or emerging markets with higher risk profiles.',
      },
      {
        question: 'What expenses should be included in Annual Opex?',
        answer: 'Include property taxes, landlord hazard insurance, property management fees (typically 8-10%), maintenance/repairs, utilities paid by owner, and replacement reserve funds.',
      },
      {
        question: 'What is Gross Yield vs. Net Yield?',
        answer: 'Gross Yield is simply total annual rent divided by purchase price. Net Yield subtracts all operating expenses and vacancy losses first, providing a far more realistic measure of income.',
      },
    ],
    relatedCalculatorIds: ['mortgage-piti', 'affordability-calc', 'closing-costs'],
    calculate: calculateRentalYield,
  },

  // 13. Home Affordability & Maximum Purchase Calculator
  {
    id: 'affordability-calc',
    slug: 'affordability-calc',
    title: 'Home Affordability & Maximum Purchase Calculator',
    subtitle: 'Conventional 28/36 Underwriting Ratio & Maximum Borrowing Capacity Engine',
    category: 'real-estate',
    categoryName: 'Real Estate & Financial Analytics',
    iconName: 'BadgeDollarSign',
    shortDescription: 'Estimate your maximum home purchase price and loan ceiling based on the standard 28% front-end and 36% back-end debt underwriting rules.',
    keywords: ['affordability', 'maximum purchase', '28 36 rule', 'qualifying income', 'dti', 'debt to income', 'home buying'],
    inputs: [
      { id: 'grossAnnualIncome', label: 'Gross Annual Household Income', unit: '$/yr', defaultValue: 115000, min: 10000, max: 2000000, step: 2500, category: 'financial' },
      { id: 'monthlyDebts', label: 'Existing Monthly Recurring Debts', unit: '$/mo', defaultValue: 450, min: 0, max: 20000, step: 50, category: 'financial' },
      { id: 'interestRate', label: 'Mortgage Interest Rate', unit: '%', defaultValue: 6.5, min: 0.1, max: 15, step: 0.1, category: 'financial' },
      { id: 'loanTerm', label: 'Loan Term', unit: 'years', defaultValue: 30, min: 10, max: 30, step: 5, category: 'financial' },
      { id: 'downPayment', label: 'Cash Available for Down Payment', unit: '$', defaultValue: 65000, min: 0, max: 2000000, step: 5000, category: 'financial' },
      { id: 'propertyTaxRate', label: 'Assumed Property Tax Rate', unit: '%', defaultValue: 1.20, min: 0, max: 4.0, step: 0.05, category: 'parameters' },
      { id: 'annualInsurance', label: 'Estimated Annual Insurance', unit: '$/yr', defaultValue: 1350, min: 0, max: 10000, step: 50, category: 'financial' },
      { id: 'monthlyHOA', label: 'Estimated Monthly HOA', unit: '$/mo', defaultValue: 100, min: 0, max: 2000, step: 25, category: 'financial' },
    ],
    methodology: {
      howItWorks: 'Applies conventional underwriting debt-to-income (DTI) constraints: the 28% Front-End Ceiling (housing payment cannot exceed 28% of gross monthly income) and the 36% Back-End Ceiling (housing payment + existing car loans, student debt, credit cards cannot exceed 36% of gross income). Solves the algebraic amortization and tax escrow equilibrium to determine maximum supported mortgage debt and total purchase price.',
      whatIsIncluded: [
        'Estimated Maximum Supported Purchase Price',
        'Estimated Maximum Mortgage Loan Borrowing Capacity',
        'Maximum Allowable Total Monthly Housing Payment',
        '28% Front-End and 36% Back-End underwriting caps comparison',
      ],
      importantAssumptions: [
        'Follows conventional Fannie Mae / Freddie Mac standard 28/36 qualifying guidelines.',
        'Monthly debt includes minimum credit card payments, student loans, auto loans, and personal loans.',
        'Down payment funds are assumed separate from closing cost cash reserves.',
      ],
      professionalNote: 'This tool provides a mathematical planning estimate and does not constitute a loan pre-approval. Some loan programs (such as FHA or VA loans) permit higher DTI ratios up to 43% to 50% with strong compensating factors.',
    },
    faqs: [
      {
        question: 'What is the 28/36 rule in mortgage qualifying?',
        answer: 'The 28/36 rule is a standard lending guideline where no more than 28% of your gross monthly income should go toward housing expenses (PITI), and no more than 36% toward total recurring debt obligations.',
      },
      {
        question: 'How do existing car loans or student debts impact my buying power?',
        answer: 'Every $100 of monthly debt reduces your allowable monthly housing payment under the 36% back-end rule, which can reduce your total borrowing capacity by approximately $15,000 to $18,000 at current interest rates.',
      },
      {
        question: 'What is considered gross income?',
        answer: 'Gross income is your total household earnings before federal, state, and payroll taxes are deducted, including verifiable base salary, bonuses, and steady self-employment income.',
      },
      {
        question: 'Can I qualify for a mortgage if my DTI is higher than 36%?',
        answer: 'Yes. Many modern conventional loans allow DTIs up to 45%, and government-backed FHA loans frequently approve DTIs up to 43%–50% depending on automated underwriting system (AUS) findings.',
      },
    ],
    relatedCalculatorIds: ['mortgage-piti', 'closing-costs', 'rental-yield'],
    calculate: calculateAffordability,
  },

  // 14. Real Estate Closing Costs & Notary Estimator
  {
    id: 'closing-costs',
    slug: 'closing-costs',
    title: 'Real Estate Closing Costs & Notary Estimator',
    subtitle: 'Conveyance Tax, Notary Fees, Title Settlement & Total Cash to Close Engine',
    category: 'real-estate',
    categoryName: 'Real Estate & Financial Analytics',
    iconName: 'FileCheck2',
    shortDescription: 'Calculate buyer conveyance transfer taxes, notary tariffs, title insurance, legal settlement fees, and total cash required at closing.',
    badge: 'Legal & Tax',
    keywords: ['closing costs', 'notary', 'transfer tax', 'stamp duty', 'title insurance', 'settlement', 'cash to close'],
    inputs: [
      { id: 'propertyPrice', label: 'Property Transaction Price', unit: '$', defaultValue: 420000, min: 10000, max: 10000000, step: 5000, category: 'financial' },
      { id: 'transferTaxPct', label: 'Conveyance / Transfer Tax Rate', unit: '%', defaultValue: 3.5, min: 0, max: 12, step: 0.1, category: 'parameters' },
      { id: 'notaryLegalPct', label: 'Notary & Legal Execution Rate', unit: '%', defaultValue: 1.10, min: 0.2, max: 4.0, step: 0.05, category: 'parameters' },
      { id: 'titleClosingPct', label: 'Title Search & Settlement Rate', unit: '%', defaultValue: 0.75, min: 0.1, max: 3.0, step: 0.05, category: 'parameters' },
      { id: 'otherClosingPct', label: 'Municipal Recording & Admin Fees', unit: '%', defaultValue: 0.65, min: 0, max: 3.0, step: 0.05, category: 'parameters' },
      { id: 'downPayment', label: 'Agreed Down Payment Equity', unit: '$', defaultValue: 84000, min: 0, max: 10000000, step: 5000, category: 'financial' },
    ],
    methodology: {
      howItWorks: 'Breaks down the transactional expenses required to finalize a real property conveyance. Computes government transfer taxes and stamp duty, statutory notary public deed fees, title search and lender title insurance policies, and municipal recording charges. Combines total transactional friction with equity down payment to yield Total Cash Required to Close.',
      whatIsIncluded: [
        'Total Estimated Closing Costs ($ and % of purchase price)',
        'Total Cash Required at Closing (Down Payment + Closing Fees)',
        'Government Conveyance Transfer Tax / Stamp Duty',
        'Notary Public & Legal Deed Execution Tariffs',
        'Title Search, Title Insurance & Settlement Charges',
      ],
      importantAssumptions: [
        'Default transfer tax rate is set to 3.5% as a general baseline benchmark.',
        'Buyer is responsible for standard buyer-side closing line items under local custom.',
        'Does not include prepaid interest or pro-rated annual property taxes.',
      ],
      professionalNote: 'Conveyance transfer taxes, stamp duties, and notary tariffs vary dramatically across international jurisdictions, states, and municipalities (ranging from under 1% to over 8% in some European regions). This tool is a planning estimate; always obtain an official Loan Estimate (LE) or preliminary closing statement from your closing officer.',
    },
    faqs: [
      {
        question: 'Who typically pays closing costs—buyer or seller?',
        answer: 'Both parties pay closing costs. Buyers typically pay loan origination fees, appraisal, lender title insurance, and mortgage recording fees. Sellers traditionally pay real estate brokerage commissions and transfer taxes in many regions, though customs vary locally.',
      },
      {
        question: 'Why is the 3.5% transfer tax assumption adjustable in this calculator?',
        answer: 'Transfer taxes are strictly local. Some US states charge zero transfer tax, while UK Stamp Duty (SDLT) or European notary/registration duties (such as France or Germany) can range from 3.5% to 7.5%+. The input is fully adjustable for your specific region.',
      },
      {
        question: 'What is title insurance and why is it required?',
        answer: 'Title insurance protects the buyer and lender against past ownership claims, undiscovered liens, forged deeds, or boundary encumbrances from previous property owners.',
      },
      {
        question: 'What is Cash to Close vs. Down Payment?',
        answer: 'Down Payment is the equity portion of the purchase price you are funding. Cash to Close is the total amount of money you must wire on closing day, which equals Down Payment plus all Closing Costs minus earnest money deposits.',
      },
    ],
    relatedCalculatorIds: ['mortgage-piti', 'affordability-calc', 'rental-yield'],
    calculate: calculateClosingCosts,
  },

  // 15. Wallpaper Roll & Pattern Calculator
  {
    id: 'wallpaper-roll',
    slug: 'wallpaper-roll',
    title: 'Wallpaper Roll & Pattern Calculator',
    subtitle: 'Pattern Match Repeat, Vertical Drop Trimming & Roll Quantity Estimator',
    category: 'construction',
    categoryName: 'Construction & Finishing',
    iconName: 'RollerCoaster',
    shortDescription: 'Calculate wallpaper rolls accounting for vertical pattern repeat drops, usable drops per roll, trimming margins, and adhesive paste powder.',
    keywords: ['wallpaper', 'rolls', 'pattern repeat', 'drop match', 'paste', 'decorating', 'wall covering'],
    inputs: [
      { id: 'wallWidth', label: 'Total Wall Width', unit: 'm', defaultValue: 4.8, min: 0.5, max: 50, step: 0.1, category: 'dimensions' },
      { id: 'wallHeight', label: 'Wall Height', unit: 'm', defaultValue: 2.6, min: 1.0, max: 10, step: 0.05, category: 'dimensions' },
      { id: 'rollWidth', label: 'Roll Width', unit: 'cm', defaultValue: 53, min: 45, max: 120, step: 1, category: 'materials' },
      { id: 'rollLength', label: 'Roll Length', unit: 'm', defaultValue: 10.05, min: 5, max: 50, step: 0.05, category: 'materials' },
      { id: 'patternRepeat', label: 'Vertical Pattern Repeat', unit: 'cm', defaultValue: 32, min: 0, max: 100, step: 1, category: 'materials' },
      { id: 'wastagePct', label: 'Handling & Trimming Wastage %', unit: '%', defaultValue: 10, min: 0, max: 25, step: 1, category: 'parameters' },
    ],
    methodology: {
      howItWorks: 'Wallpaper calculations must account for pattern matching rather than simple surface area. The algorithm computes the pattern-adjusted drop length by adding a 10cm top/bottom trimming margin and rounding up to the next integer multiple of the vertical pattern repeat. It determines the number of full drops needed across the wall width and the exact number of usable drops harvested per standard roll.',
      whatIsIncluded: [
        'Total Wallpaper Rolls required with pattern matching',
        'Total vertical drops required across wall width',
        'Pattern-adjusted drop length in meters',
        'Usable strips/drops harvested per individual roll',
        'Wallpaper paste adhesive powder in kg',
      ],
      importantAssumptions: [
        'Standard Euro-roll dimensions: 53cm width × 10.05m length (covering ~5.33 m² per unpatterned roll).',
        'A 10cm (0.10m) safety margin is added to wall height for top and bottom skirting trimming.',
        'If pattern repeat is 0cm (plain or random match), minimal drop waste occurs.',
      ],
      professionalNote: 'Large repeat patterns (e.g. 53cm or 64cm drop matches) cause substantial cut waste—often yielding only 3 drops per 10m roll on a 2.6m wall instead of 4 drops. Always verify batch/dye lot numbers match across all purchased rolls.',
    },
    faqs: [
      {
        question: 'What is a wallpaper pattern repeat?',
        answer: 'A pattern repeat is the vertical distance between identical design motifs along the roll. When hanging patterned wallpaper, adjacent drops must be shifted vertically to align the design, creating cutoff waste.',
      },
      {
        question: 'What is standard Euro-roll size vs. American double-roll?',
        answer: 'Standard European rolls are 53cm (21 inches) wide by 10.05m (33 feet) long. American wallpaper is commonly sold in double rolls measuring 27 inches (68.5cm) wide by 27 feet long.',
      },
      {
        question: 'Why should I not deduct window or door openings for wallpaper?',
        answer: 'Unless a window or door is exceptionally large (e.g. a wide patio sliding door), wallpaper drops must still bridge the wall space above and below the opening, requiring full drops to maintain pattern continuity.',
      },
      {
        question: 'How much wallpaper paste do I need?',
        answer: 'A standard 250g packet of methylcellulose wallpaper flake adhesive mixes with water to hang approximately 4 to 5 standard rolls of normal weight paper.',
      },
    ],
    relatedCalculatorIds: ['paint-primer', 'tiles-estimator', 'ba13-drywall-ceiling'],
    calculate: calculateWallpaper,
  },
];
