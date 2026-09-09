import { EducationalContent } from '../types/calculator';

export const CALCULATOR_EDUCATIONAL_CONTENT: Record<string, EducationalContent> = {
  // 1. BA13 Drywall Ceiling Calculator
  'ba13-drywall-ceiling': {
    whatItDoes: 'Calculates the complete bill of materials for standard suspended gypsum board (BA13 / 12.5mm) ceilings, including panels, primary CD60 carrying channels, perimeter UD28 runners, suspension hangers, self-tapping drywall screws, joint compound, and reinforcing paper tape.',
    whenToUse: [
      'Preparing cost estimates and purchasing orders for residential or commercial drywall ceilings.',
      'Checking material take-offs submitted by drywall subcontractors on renovation projects.',
      'Estimating structural grid hardware needed for horizontal flat drywall ceiling installations.'
    ],
    inputExplanations: [
      {
        fieldId: 'roomLength',
        label: 'Room Length (m)',
        purpose: 'Defines the primary span dimension of the room ceiling plane.',
        howToMeasure: 'Measure the finished wall-to-wall distance at the intended ceiling height using a laser measure or tape measure.'
      },
      {
        fieldId: 'roomWidth',
        label: 'Room Width (m)',
        purpose: 'Defines the secondary cross dimension of the room ceiling plane.',
        howToMeasure: 'Measure perpendicular to the length at the intended installation elevation.'
      },
      {
        fieldId: 'wastagePct',
        label: 'Wastage Margin (%)',
        purpose: 'Accounts for perimeter cut-offs, staggered joint offsets, and minor handling breakage.',
        howToMeasure: 'Use 8-10% for rectangular rooms; increase to 12-15% for rooms with alcoves, columns, or diagonal walls.'
      },
      {
        fieldId: 'hangerSpacing',
        label: 'Hanger Spacing (m)',
        purpose: 'Determines the distance along CD60 primary rails between ceiling anchor suspension drops.',
        howToMeasure: 'Standard residential specifications dictate 0.90m to 1.00m intervals. For double-layer boards, decrease to 0.70m.'
      }
    ],
    workedExample: {
      scenarioTitle: 'Standard Living Room (5.0m × 4.0m, 20 m²)',
      inputsDescription: 'Room Length = 5.0m, Room Width = 4.0m, Wastage = 10%, Hanger Spacing = 0.9m',
      stepByStepMath: [
        'Net ceiling area = 5.0m × 4.0m = 20.00 m².',
        'Factored area with 10% wastage = 20.00 m² × 1.10 = 22.00 m².',
        'Gypsum boards (1.2m × 2.5m = 3.0 m² each) = 22.00 ÷ 3.0 = 7.33 → rounded up to 8 sheets.',
        'Perimeter UD28 runners = 2 × (5.0 + 4.0) = 18.0m perimeter ÷ 3.0m per profile = 6 lengths.',
        'Primary CD60 channels @ 50cm grid spacing = ~42 linear meters ÷ 3.0m length = 14 profiles.',
        'Suspension hangers @ 0.9m spacing = ~24 hanger assemblies with acoustic anchor clips.'
      ],
      finalOutputSummary: 'Requires 8 BA13 plasterboards, 14 CD60 profiles (3m), 6 UD28 runners (3m), 24 suspension drops, ~400 drywall screws, and 17kg joint compound.'
    },
    plainLanguageFormula: 'Total Sheets = Ceil((Length × Width × (1 + Wastage / 100)) ÷ Sheet Area). Frame profiles and fasteners follow linear grid density rules of 2.1m CD60 and 0.9m UD28 per square meter.',
    assumptionsAndDefaults: [
      'Assumes standard European/International metric drywall sheets measuring 1.20m × 2.50m (3.0 m² area).',
      'Assumes single-layer 12.5mm (BA13) gypsum board application with standard CD60 profile cross grid @ 500mm centers.',
      'Perimeter UD28 track assumes 3.0m manufactured profile lengths anchored at 60cm wall intervals.'
    ],
    roundingAndUnits: 'Dimensions in meters (m); sheet goods and profiles rounded UP to the nearest integer purchase unit.',
    whatResultExcludes: [
      'Secondary drops, perimeter light coves, stepped bulkheads, or curved decorative shapes.',
      'Thermal/acoustic mineral wool insulation battens placed above the ceiling plenum.',
      'Final prime coats, finish ceiling paint, or access hatch inspection doors.'
    ],
    commonMistakes: [
      'Forgetting to add wastage margin for non-square rooms where off-cuts cannot be reused.',
      'Placing hangers too far apart (>1.0m), causing noticeable ceiling sagging over time.',
      'Omitting perimeter sealing tape between UD28 wall channels and masonry walls.'
    ],
    whenToConsultProfessional: 'Consult a structural engineer or acoustic consultant if installing double-layer fire-rated boards (DF), heavy surface-mounted chandeliers, or suspended ceiling spans exceeding 6 meters without expansion joints.',
    lastReviewed: '2026-03-01'
  },

  // 2. PVC Suspended Ceiling Calculator
  'pvc-suspended-ceiling': {
    whatItDoes: 'Calculates the required quantity of waterproof PVC tongue-and-groove ceiling slats, perimeter finishing U-trim moulding, battens/furring rails, and corrosion-resistant fasteners for moisture-prone areas.',
    whenToUse: [
      'Estimating ceiling finishing materials for bathrooms, commercial kitchens, laundries, covered patios, and basements.',
      'Comparing PVC panel lengths against room dimensions to minimize cross-cut waste.'
    ],
    inputExplanations: [
      {
        fieldId: 'roomLength',
        label: 'Room Length (m)',
        purpose: 'Defines room length parallel to the direction of PVC slat installation.',
        howToMeasure: 'Measure the maximum wall-to-wall distance where panels will run.'
      },
      {
        fieldId: 'roomWidth',
        label: 'Room Width (m)',
        purpose: 'Defines the width across which PVC panel strips are accumulated.',
        howToMeasure: 'Measure perpendicular to the installation direction.'
      },
      {
        fieldId: 'panelWidthCm',
        label: 'Panel Width (cm)',
        purpose: 'The visible face width of each tongue-and-groove slat (typically 20cm or 25cm).',
        howToMeasure: 'Check the manufacturer specification sheet for visible exposure width excluding the tongue.'
      },
      {
        fieldId: 'panelLengthM',
        label: 'Manufactured Panel Length (m)',
        purpose: 'The raw length of purchased PVC slats (standard 3.0m or 4.0m lengths).',
        howToMeasure: 'Verify supplier stock lengths to minimize trimming scraps.'
      }
    ],
    workedExample: {
      scenarioTitle: 'En-Suite Master Bathroom (3.2m × 2.4m, 7.68 m²)',
      inputsDescription: 'Length = 3.2m, Width = 2.4m, Panel Width = 20cm, Stock Length = 4.0m, Wastage = 8%',
      stepByStepMath: [
        'Running 4.0m panels along 3.2m span leaves 0.8m unusable drop.',
        'Number of panels needed across 2.4m width = 2.4m ÷ 0.20m = 12 panels.',
        'Applying 8% handling buffer: 12 × 1.08 = 12.96 → rounded up to 13 panels (4m each).',
        'Perimeter U-trim = 2 × (3.2 + 2.4) = 11.2 linear meters ÷ 3m profile = 4 trims.',
        'Furring batten grid @ 40cm centers perpendicular to slats = 22 linear meters.'
      ],
      finalOutputSummary: 'Requires 13 PVC panels (4m × 20cm), 4 perimeter U-edge mouldings (3m), 22m framing rails, and ~120 wafer-head screws.'
    },
    plainLanguageFormula: 'Panels Required = Ceil((Accumulation Width ÷ Panel Visible Width) × (1 + Wastage / 100)). Perimeter trims equal room perimeter divided by 3m profile length.',
    assumptionsAndDefaults: [
      'Standard residential tongue-and-groove hollow-core PVC slat density.',
      'Supports installed perpendicular to panel direction at maximum 400mm spacing.',
      'Stainless steel or zinc-plated fasteners to prevent rust in high-humidity atmospheres.'
    ],
    roundingAndUnits: 'Panel counts rounded up to next integer; trims rounded to whole 3m commercial lengths.',
    whatResultExcludes: [
      'Recessed downlight cutouts, exhaust fan duct adapters, and electrical wiring.',
      'Thermal insulation batts above the PVC ceiling plenum.'
    ],
    commonMistakes: [
      'Running panels perpendicular to the light source, accentuating visible joint lines.',
      'Fastening PVC slats too tightly without allowing thermal expansion margin at wall trims.'
    ],
    whenToConsultProfessional: 'Consult local fire regulations if installing in commercial kitchens, public buildings, or boiler rooms where specific flame-spread ratings (Class 1/Class A) are legally required.',
    lastReviewed: '2026-03-01'
  },

  // 3. Acoustic 60x60 Grid Ceiling Calculator
  'acoustic-grid-ceiling-60x60': {
    whatItDoes: 'Determines the quantities of exposed T-bar grid components (Main Runners 3.6m, Cross Tees 1.2m, Cross Tees 0.6m, Wall Angle 3.0m) and 600mm × 600mm mineral fiber acoustic ceiling tiles.',
    whenToUse: [
      'Office fit-outs, educational facilities, healthcare clinics, and retail commercial spaces.',
      'Standardizing suspended grid material orders to standard industry packaging ratios.'
    ],
    inputExplanations: [
      {
        fieldId: 'roomLength',
        label: 'Room Length (m)',
        purpose: 'Longest dimension of the commercial space.',
        howToMeasure: 'Measure interior finished column-to-column or wall-to-wall distance.'
      },
      {
        fieldId: 'roomWidth',
        label: 'Room Width (m)',
        purpose: 'Perpendicular span dimension of the space.',
        howToMeasure: 'Measure finished wall-to-wall width.'
      },
      {
        fieldId: 'wastagePct',
        label: 'Border Tile Wastage (%)',
        purpose: 'Accounts for perimeter border tiles that must be trimmed on-site.',
        howToMeasure: 'Use 8% for open rectangular grids; use 12-15% for spaces with multiple columns or irregular angles.'
      }
    ],
    workedExample: {
      scenarioTitle: 'Commercial Open Office (8.0m × 6.0m, 48 m²)',
      inputsDescription: 'Length = 8.0m, Width = 6.0m, Grid Module = 600×600mm, Wastage = 8%',
      stepByStepMath: [
        'Net ceiling area = 8.0m × 6.0m = 48.0 m².',
        'Tile count = (48.0 m² ÷ 0.36 m² per tile) × 1.08 = 133.3 × 1.08 = 144 tiles (approx. 8-10 commercial boxes).',
        'Main Runners (3.6m) @ 1.2m centers = 48 m² × 0.23 = 11 runners.',
        'Cross Tees (1.2m) @ 0.6m centers = 48 m² × 1.40 = 68 tees.',
        'Cross Tees (0.6m) = 48 m² × 1.40 = 68 tees.',
        'Perimeter Wall Angle = 28 linear meters ÷ 3.0m = 10 lengths.'
      ],
      finalOutputSummary: 'Requires 144 acoustic tiles (600×600mm), 11 Main Runners (3.6m), 68 Cross Tees (1.2m), 68 Cross Tees (0.6m), 10 Wall Angles (3m), and 40 wire hangers.'
    },
    plainLanguageFormula: 'Tile Count = Ceil((Area ÷ 0.36) × (1 + Wastage / 100)). T-grid structural profiles are calculated from CISCA/ASTM standard linear density coefficients per square meter.',
    assumptionsAndDefaults: [
      'Standard 15/16-inch (24mm) or 9/16-inch (15mm) exposed T-grid suspension system.',
      'Main runners spaced at 1200mm intervals, suspended at 1200mm hanger wire intervals.',
      'Acoustic mineral fiber or fiberglass lay-in ceiling tiles.'
    ],
    roundingAndUnits: 'Area in square meters (m²); grid members and tile packs rounded to whole commercial package increments.',
    whatResultExcludes: [
      'Seismic hold-down clips, diagonal sway braces, or category D/E/F seismic perimeter spreads.',
      'Special fixture yokes for troffer light integration and HVAC diffuser framing.'
    ],
    commonMistakes: [
      'Starting layout with full tile against one wall, creating tiny slivers on the opposite wall.',
      'Overloading main runners by mounting heavy luminaires directly to T-bars without independent hanger wires.'
    ],
    whenToConsultProfessional: 'Consult an architect or MEP engineer for seismic restraint engineering, air-return plenum regulations, or fire-rated floor-ceiling assembly ratings.',
    lastReviewed: '2026-03-01'
  },

  // 4. Cove Light Perimeter Bulkhead
  'cove-light-perimeter-bulkhead': {
    whatItDoes: 'Calculates the structural framing studs, tracks, gypsum fascia, horizontal soffit boards, and LED strip lighting lengths required for dropped perimeter light coves.',
    whenToUse: [
      'Designing modern architectural indirect ceiling lighting details in residential salons, suites, and hotel lobbies.',
      'Calculating linear metal framing and board cuts for multi-tier suspended bulkheads.'
    ],
    inputExplanations: [
      {
        fieldId: 'perimeterLength',
        label: 'Cove Perimeter Length (m)',
        purpose: 'Total linear run along the walls where the light cove bulkhead will be suspended.',
        howToMeasure: 'Sum the lengths of all walls receiving the decorative dropped bulkhead.'
      },
      {
        fieldId: 'coveDropCm',
        label: 'Cove Vertical Drop (cm)',
        purpose: 'Vertical depth from primary ceiling down to cove soffit (typically 15-25cm).',
        howToMeasure: 'Specify based on architectural section drawings and ceiling height.'
      },
      {
        fieldId: 'coveWidthCm',
        label: 'Cove Horizontal Width (cm)',
        purpose: 'Horizontal projection from wall out into the room (typically 30-50cm).',
        howToMeasure: 'Determine based on aesthetic proportions and room scale.'
      }
    ],
    workedExample: {
      scenarioTitle: 'Master Bedroom Perimeter Cove (18m perimeter)',
      inputsDescription: 'Perimeter = 18m, Drop = 20cm, Width = 40cm, Lip Height = 7cm, Wastage = 10%',
      stepByStepMath: [
        'Total developed gypsum width = Drop (20cm) + Soffit (40cm) + Upstand Lip (7cm) = 67cm (0.67m).',
        'Total developed drywall surface = 18m × 0.67m = 12.06 m² × 1.10 = 13.27 m².',
        'Gypsum boards (3.0 m² each) = 13.27 ÷ 3.0 = 4.42 → 5 boards.',
        'Linear track profiles (3m each) for top, bottom, and lip = 4 runs × 18m = 72m ÷ 3m = 24 tracks.',
        'LED strip requirement = 18m + 10% connection margin = ~20 meters with driver.'
      ],
      finalOutputSummary: 'Requires 5 gypsum boards, 24 metal tracks (3m), ~45 stud brackets, 20m LED strip lighting, and 36m corner beads.'
    },
    plainLanguageFormula: 'Drywall Area = Perimeter × (Drop + Soffit Width + Lip Upstand) × (1 + Wastage / 100). Framing profiles track multiple parallel wall and fascia lines.',
    assumptionsAndDefaults: [
      'Standard residential dry-lining stud and track profiles (CW50/UW50 or equivalent).',
      'Continuous concealed LED channel with protective frosted diffuser lens.'
    ],
    roundingAndUnits: 'Lengths in meters; board materials rounded up to full sheets.',
    whatResultExcludes: [
      'Low-voltage transformers, dimmers, controllers, and wiring conduits.',
      'Primary suspension rods if cove hangs independently from intermediate floor slab.'
    ],
    commonMistakes: [
      'Making the cove opening too narrow (<10cm), preventing hands from accessing LED strips for maintenance.',
      'Omitting the light shield lip, which exposes individual LED diode hot-spots to viewers below.'
    ],
    whenToConsultProfessional: 'Consult an electrical contractor for driver load calculations and heat dissipation in enclosed cove cavities.',
    lastReviewed: '2026-03-01'
  },

  // 5. Gypsum Cornice & Plaster Staff
  'gypsum-cornice-plaster-staff': {
    whatItDoes: 'Calculates the linear meters of ornamental plaster cornices, corner miter joints, adhesive bonding compound, and acrylic painter caulk needed for classical ceiling trim.',
    whenToUse: [
      'Specifying decorative crown mouldings, staff plaster mouldings, and perimeter transitions between walls and ceilings.'
    ],
    inputExplanations: [
      {
        fieldId: 'roomPerimeter',
        label: 'Room Perimeter (m)',
        purpose: 'Total continuous wall boundary length.',
        howToMeasure: 'Measure all wall segments at crown height and sum together.'
      },
      {
        fieldId: 'cornersCount',
        label: 'Number of 90° Corners',
        purpose: 'Determines the number of mitered angle cuts required.',
        howToMeasure: 'Count all inside and outside wall corners in the room.'
      }
    ],
    workedExample: {
      scenarioTitle: 'Dining Room with 4 Inside Corners (16m perimeter)',
      inputsDescription: 'Perimeter = 16.0m, Corners = 4, Moulding Stick Length = 2.0m, Wastage = 10%',
      stepByStepMath: [
        'Gross perimeter with 10% cutting margin = 16.0m × 1.10 = 17.6m.',
        'Cornice sticks (2.0m commercial length) = 17.6 ÷ 2.0 = 8.8 → 9 pieces.',
        'Miter adhesive and joint compound = ~1kg per 3 linear meters = ~6 kg plaster adhesive.',
        'Corner caulking and finishing = 2 tubes elastomeric painter caulk.'
      ],
      finalOutputSummary: 'Requires 9 cornice sections (2m), 6kg cornice adhesive, and 2 tubes of acrylic caulk.'
    },
    plainLanguageFormula: 'Cornice Pieces = Ceil((Perimeter × (1 + Wastage / 100)) ÷ Section Length). Miter allowance adds ~15cm per corner cut.',
    assumptionsAndDefaults: [
      'Standard 2.0m manufactured staff or fibrous plaster moulding lengths.',
      'Solid adhesion to primed drywall or cured masonry substrate.'
    ],
    roundingAndUnits: 'Perimeter in meters; moulding units rounded up to full commercial lengths.',
    whatResultExcludes: [
      'Decorative center ceiling roses, wall medallions, or multi-member architectural friezes.'
    ],
    commonMistakes: [
      'Cutting 45° miters without confirming wall corners are square (most room corners are 88°-92°).',
      'Using silicone instead of paintable acrylic caulk along the bottom seam.'
    ],
    whenToConsultProfessional: 'For heavy fibrous plaster profiles exceeding 150mm projection, mechanical screw anchoring into wall studs is mandatory.',
    lastReviewed: '2026-03-01'
  },

  // 6. Wall Paint & Primer
  'wall-paint-primer': {
    whatItDoes: 'Calculates the volume of primer/undercoat and finish wall paint required based on wall surface area, coat count, door/window subtractions, and paint spread rate.',
    whenToUse: [
      'Budgeting and ordering interior or exterior paint supplies for room renovations and new builds.'
    ],
    inputExplanations: [
      {
        fieldId: 'wallLength',
        label: 'Total Wall Length (m)',
        purpose: 'Sum of all wall spans to be painted.',
        howToMeasure: 'Measure continuous wall perimeters inside the room.'
      },
      {
        fieldId: 'wallHeight',
        label: 'Ceiling Height (m)',
        purpose: 'Vertical distance from finished floor to ceiling.',
        howToMeasure: 'Measure with tape or laser at room corners.'
      },
      {
        fieldId: 'openingsArea',
        label: 'Doors & Windows Area (m²)',
        purpose: 'Non-painted opening surfaces subtracted from gross wall area.',
        howToMeasure: 'Multiply height by width for each door and window, then sum.'
      },
      {
        fieldId: 'coats',
        label: 'Number of Finish Coats',
        purpose: 'Typically 2 coats for uniform coverage and color saturation.',
        howToMeasure: 'Select 1 for refreshing identical color; select 2-3 for bare drywall or drastic color shifts.'
      }
    ],
    workedExample: {
      scenarioTitle: 'Standard Bedroom (4m × 3.5m, 2.7m ceiling)',
      inputsDescription: 'Wall Perimeter = 15.0m, Height = 2.7m, Openings = 4.5 m², Coats = 2, Spread = 10 m²/L',
      stepByStepMath: [
        'Gross wall area = 15.0m × 2.7m = 40.5 m².',
        'Net paintable surface = 40.5 - 4.5 = 36.0 m².',
        'Primer required (1 coat @ 10 m²/L) = 36.0 ÷ 10 = 3.6L → ~4L can.',
        'Finish paint (2 coats @ 10 m²/L) = (36.0 × 2) ÷ 10 = 7.2L → rounded up to 8L (or 2 × 5L cans).'
      ],
      finalOutputSummary: 'Requires ~4 liters of penetrating primer and ~8 liters of premium finish emulsion paint.'
    },
    plainLanguageFormula: 'Paint Liters = ((Gross Wall Area - Deductions) × Number of Coats × (1 + Wastage / 100)) ÷ Spread Rate (m²/L).',
    assumptionsAndDefaults: [
      'Standard high-solids acrylic or latex emulsion paint with average 10-12 m²/liter theoretical spread rate.',
      'Porous new drywall requires a dedicated sealing primer before finish coats.'
    ],
    roundingAndUnits: 'Volumes in liters (L); rounded up to standard retail packaging sizes (1L, 2.5L, 5L, 10L).',
    whatResultExcludes: [
      'Ceiling paint, door/window frame trim enamels, sanding paper, and masking tape.'
    ],
    commonMistakes: [
      'Skipping the primer coat on raw drywall patches, leading to uneven sheen and flashing.',
      'Failing to subtract large glass patio doors, resulting in significant over-purchasing.'
    ],
    whenToConsultProfessional: 'Consult a coatings specialist when dealing with severe water stains, nicotine bleed, or moisture mildew issues requiring stain-blocking shellac primers.',
    lastReviewed: '2026-03-01'
  },

  // 7. Tile & Grout Flooring
  'tile-grout-flooring': {
    whatItDoes: 'Calculates the number of ceramic or porcelain floor tiles, cardboard packaging boxes, adhesive mortar bags, and cementitious grout powder required for floor or wall tiling.',
    whenToUse: [
      'Procuring floor tiles, adhesive thin-set mortar, and grout for bathroom, kitchen, or living room projects.'
    ],
    inputExplanations: [
      {
        fieldId: 'floorLength',
        label: 'Room Length (m)',
        purpose: 'Longest floor dimension.',
        howToMeasure: 'Measure floor slab from wall to wall.'
      },
      {
        fieldId: 'floorWidth',
        label: 'Room Width (m)',
        purpose: 'Perpendicular floor dimension.',
        howToMeasure: 'Measure wall to wall across the room width.'
      },
      {
        fieldId: 'tileLengthCm',
        label: 'Tile Length (cm)',
        purpose: 'Manufactured length of individual tile (e.g., 60cm).',
        howToMeasure: 'From tile carton specification.'
      },
      {
        fieldId: 'tileWidthCm',
        label: 'Tile Width (cm)',
        purpose: 'Manufactured width of individual tile (e.g., 60cm or 30cm).',
        howToMeasure: 'From tile carton specification.'
      }
    ],
    workedExample: {
      scenarioTitle: 'Kitchen Floor (4.0m × 3.0m, 12 m²)',
      inputsDescription: 'Floor = 12.0 m², Tile = 60cm × 60cm (0.36 m² each), Wastage = 10%, Grout Joint = 3mm',
      stepByStepMath: [
        'Net floor area = 4.0m × 3.0m = 12.00 m².',
        'Factored area with 10% cutting waste = 12.00 × 1.10 = 13.20 m².',
        'Individual tile count = 13.20 ÷ 0.36 = 36.67 → 37 tiles.',
        'Boxes (assuming 1.44 m² / 4 tiles per box) = 13.20 ÷ 1.44 = 9.16 → 10 boxes.',
        'Thin-set mortar @ 5kg/m² = 12.0 × 5 = 60kg ÷ 25kg bag = 3 bags.',
        'Grout powder @ 3mm joint = ~4.5 kg.'
      ],
      finalOutputSummary: 'Requires 10 boxes of 60×60cm tiles (14.4 m²), 3 bags of 25kg tile adhesive, and 5kg grout.'
    },
    plainLanguageFormula: 'Tile Count = Ceil((Room Area ÷ Tile Area) × (1 + Wastage / 100)). Adhesive consumption follows 4.5-5.5 kg/m² benchmark.',
    assumptionsAndDefaults: [
      'Straight-lay tiling pattern. For herringbone or diagonal 45° patterns, increase wastage to 15-18%.',
      'Flat subfloor with notch trowel application (~5kg adhesive/m²).'
    ],
    roundingAndUnits: 'Area in square meters; tiles and boxes rounded up to whole units.',
    whatResultExcludes: [
      'Self-leveling underlayment compound, waterproofing perimeter membranes, and tile trim transition strips.'
    ],
    commonMistakes: [
      'Using inadequate wastage allowance on diagonal layouts or large-format tiles (>80×80cm).',
      'Forgetting to keep 1-2 spare boxes from the same production dye-lot for future repairs.'
    ],
    whenToConsultProfessional: 'For wet-room shower pans or outdoor balconies, always consult waterproofing standards to ensure proper slope and drainage membranes.',
    lastReviewed: '2026-03-01'
  },

  // 8. Reinforced Concrete Volume
  'reinforced-concrete-volume': {
    whatItDoes: 'Calculates the volume of concrete in cubic meters (m³) and cubic yards (yd³) for structural foundation slabs, footing pads, or suspended floors, including ready-mix batching and premix bag estimates.',
    whenToUse: [
      'Ordering ready-mix concrete trucks for patio slabs, driveways, house footings, or basement floors.',
      'Checking mixer truck tickets against structural drawings.'
    ],
    inputExplanations: [
      {
        fieldId: 'length',
        label: 'Slab Length (m)',
        purpose: 'Longest outer edge dimension of the concrete pour.',
        howToMeasure: 'Measure inside formwork dimensions.'
      },
      {
        fieldId: 'width',
        label: 'Slab Width (m)',
        purpose: 'Perpendicular edge dimension of the formwork.',
        howToMeasure: 'Measure inside formwork.'
      },
      {
        fieldId: 'thickness',
        label: 'Slab Thickness (cm)',
        purpose: 'Depth of the pour (typically 10-15cm for patios/driveways; 20-30cm for raft foundations).',
        howToMeasure: 'Check structural engineering plans.'
      },
      {
        fieldId: 'wastagePct',
        label: 'Spillage & Compaction Buffer (%)',
        purpose: 'Compensates for uneven subbase excavation, formwork deflection, and pumping hose waste.',
        howToMeasure: 'Use 8-10% for ground slabs; 5% for rigid watertight formwork.'
      }
    ],
    workedExample: {
      scenarioTitle: 'Backyard Patio Slab (6.0m × 4.0m × 12cm thick)',
      inputsDescription: 'Length = 6.0m, Width = 4.0m, Thickness = 12cm (0.12m), Wastage = 8%',
      stepByStepMath: [
        'Geometric slab volume = 6.0m × 4.0m × 0.12m = 2.88 m³.',
        'Factored volume with 8% waste = 2.88 m³ × 1.08 = 3.11 m³.',
        'Imperial equivalent = 3.11 m³ × 1.30795 = 4.07 cubic yards.',
        'Wet cured weight = 3.11 m³ × 2.4 tonnes/m³ = 7.46 tonnes.'
      ],
      finalOutputSummary: 'Requires 3.15 m³ (~4.1 cubic yards) of ready-mix concrete (~half a standard 6-8 m³ truck load).'
    },
    plainLanguageFormula: 'Volume (m³) = Length (m) × Width (m) × Thickness (m) × (1 + Wastage / 100). Cubic Yards = m³ × 1.30795.',
    assumptionsAndDefaults: [
      'Standard cured reinforced concrete density of 2,400 kg/m³.',
      'Uniform slab depth across compacted gravel subbase.'
    ],
    roundingAndUnits: 'Volumes expressed to two decimal places; ready-mix orders generally round up to nearest 0.5 m³.',
    whatResultExcludes: [
      'Steel rebar mesh (welded wire fabric), expansion joint fillers, gravel subbase, and vapor barrier plastic.'
    ],
    commonMistakes: [
      'Measuring thickness from formwork top rather than actual excavated subgrade depth, leading to concrete shortages.',
      'Not ordering a 0.5 m³ buffer when using a concrete boom pump truck.'
    ],
    whenToConsultProfessional: 'Always consult a licensed structural engineer for load-bearing building foundations, retaining walls, or suspended structural slabs.',
    lastReviewed: '2026-03-01'
  },

  // 9. Brick & Block Masonry
  'brick-block-masonry-mortar': {
    whatItDoes: 'Calculates the number of standard masonry bricks or hollow concrete blocks, mortar volume, sand weight, and cement bags required for building single-skin walls.',
    whenToUse: [
      'Planning boundary perimeter walls, room partition walls, or structural blockwork.'
    ],
    inputExplanations: [
      {
        fieldId: 'wallLength',
        label: 'Wall Length (m)',
        purpose: 'Linear horizontal run of the masonry wall.',
        howToMeasure: 'Measure total running wall length.'
      },
      {
        fieldId: 'wallHeight',
        label: 'Wall Height (m)',
        purpose: 'Total vertical height of the wall.',
        howToMeasure: 'Measure from footing top to wall plate height.'
      },
      {
        fieldId: 'unitType',
        label: 'Masonry Unit Type',
        purpose: 'Selects standard clay brick (215×102.5×65mm) vs hollow concrete block (400×200×200mm).',
        howToMeasure: 'Select material based on structural specification.'
      }
    ],
    workedExample: {
      scenarioTitle: 'Garden Boundary Wall in Concrete Blocks (10m long × 2m high)',
      inputsDescription: 'Length = 10.0m, Height = 2.0m, Area = 20.0 m², Block Type = 20×20×40cm, Wastage = 5%',
      stepByStepMath: [
        'Wall face area = 10.0m × 2.0m = 20.0 m².',
        'Blocks per m² (including 10mm mortar joint) = ~12.5 blocks/m².',
        'Total blocks = 20.0 m² × 12.5 = 250 blocks × 1.05 = 263 blocks.',
        'Mortar volume needed = ~0.40 m³.',
        'Cement required = ~4-5 bags (25kg), Sand = ~700kg.'
      ],
      finalOutputSummary: 'Requires 263 concrete blocks (20×20×40cm), 5 bags of Portland cement, and 0.7 tonnes of builder sand.'
    },
    plainLanguageFormula: 'Units = Ceil((Wall Net Area × Units Per m²) × (1 + Wastage / 100)). Mortar volume follows bed and perp joint thickness rules.',
    assumptionsAndDefaults: [
      'Standard 10mm bed and perpendicular mortar joints.',
      'Single-leaf stretcher bond wall configuration.'
    ],
    roundingAndUnits: 'Dimensions in meters; block and brick counts rounded up to integer units.',
    whatResultExcludes: [
      'Concrete footing foundation, reinforcement rebar rods in bond beams, and damp-proof course (DPC) rolls.'
    ],
    commonMistakes: [
      'Not factoring wall deductions for openings over 1 m².',
      'Underestimating mortar wastage when filling block cores.'
    ],
    whenToConsultProfessional: 'Freestanding boundary walls exceeding 1.2m height must be designed by a structural engineer to resist wind overturning forces.',
    lastReviewed: '2026-03-01'
  },

  // 10. HVAC Cooling BTU Load
  'hvac-cooling-btu-load': {
    whatItDoes: 'Estimates cooling capacity requirements in BTU/hour and refrigeration tons using thermal heat gain factors including room volume, sun orientation, window exposure, and occupant load.',
    whenToUse: [
      'Sizing ductless split air conditioners, portable AC units, or window AC units for residential and light commercial rooms.'
    ],
    inputExplanations: [
      {
        fieldId: 'roomLength',
        label: 'Room Length (m)',
        purpose: 'Interior room length dimension.',
        howToMeasure: 'Measure interior wall-to-wall distance.'
      },
      {
        fieldId: 'roomWidth',
        label: 'Room Width (m)',
        purpose: 'Interior room width dimension.',
        howToMeasure: 'Measure interior width.'
      },
      {
        fieldId: 'ceilingHeight',
        label: 'Ceiling Height (m)',
        purpose: 'Air volume multiplier; high ceilings increase cooling load.',
        howToMeasure: 'Measure from floor to ceiling.'
      },
      {
        fieldId: 'sunExposure',
        label: 'Sun Exposure Factor',
        purpose: 'Accounts for solar radiation heat gain (North, East, West, or Top Floor Roof).',
        howToMeasure: 'Identify window facing direction and whether room sits under an uninsulated flat roof.'
      },
      {
        fieldId: 'occupants',
        label: 'Number of Occupants',
        purpose: 'Human body heat dissipation adds ~400-600 BTU/h per person.',
        howToMeasure: 'Typical maximum simultaneous occupancy.'
      }
    ],
    workedExample: {
      scenarioTitle: 'Sunny Master Bedroom (5.0m × 4.0m, West-Facing, 2 Occupants)',
      inputsDescription: 'Floor Area = 20 m², Height = 2.8m, Sun = Heavy West Sun (+15%), Occupants = 2',
      stepByStepMath: [
        'Base cooling requirement = 20 m² × 550 BTU/m² = 11,000 BTU/h.',
        'High ceiling adjustment (2.8m vs 2.5m standard) = +10% → 12,100 BTU/h.',
        'West solar exposure premium = +15% → 13,915 BTU/h.',
        'Occupant sensible heat (2 persons @ 500 BTU) = +1,000 BTU/h.',
        'Total heat load = 14,915 BTU/h → Nearest standard commercial AC tier = 18,000 BTU/h (1.5 Tons).'
      ],
      finalOutputSummary: 'Requires an 18,000 BTU/h (1.5 Ton) split air conditioning unit for reliable summer cooling.'
    },
    plainLanguageFormula: 'BTU/h = (Area × Base Coefficient × Height Factor × Sun Factor) + (Occupants × 500) + Appliance Load. Tons = BTU/h ÷ 12,000.',
    assumptionsAndDefaults: [
      'Standard residential envelope insulation levels with double-glazed windows.',
      'Design conditions assume 35°C outdoor summer temperature and 24°C indoor comfort setpoint.'
    ],
    roundingAndUnits: 'Cooling capacity in BTU/hour and Refrigeration Tons (1 Ton = 12,000 BTU/h).',
    whatResultExcludes: [
      'Commercial kitchen ventilation hoods, high-density server rack heat, and fresh air ERV/HRV loads.'
    ],
    commonMistakes: [
      'Undersizing units for top-floor rooms directly under uninsulated concrete slab roofs.',
      'Oversizing significantly, which causes rapid cycling and poor dehumidification, leaving rooms cold and clammy.'
    ],
    whenToConsultProfessional: 'Commercial buildings and central ducted HVAC systems require a certified Manual J or ASHRAE cooling load calculation performed by an HVAC mechanical engineer.',
    lastReviewed: '2026-03-01'
  },

  // 11. Mortgage PITI & Amortization
  'mortgage-piti-amortization': {
    whatItDoes: 'Calculates the complete monthly mortgage payment (PITI: Principal, Interest, Property Taxes, Homeowners Insurance, and HOA dues), total interest cost over the loan term, and full amortization schedule.',
    whenToUse: [
      'Budgeting home purchases, evaluating refinancing offers, and analyzing true monthly homeownership carrying costs.'
    ],
    inputExplanations: [
      {
        fieldId: 'purchasePrice',
        label: 'Home Purchase Price ($)',
        purpose: 'Total agreed transaction purchase price.',
        howToMeasure: 'From purchase agreement or target listing price.'
      },
      {
        fieldId: 'downPayment',
        label: 'Down Payment ($)',
        purpose: 'Initial cash equity paid up front (affects Loan-to-Value ratio).',
        howToMeasure: 'Available buyer savings dedicated to equity.'
      },
      {
        fieldId: 'interestRate',
        label: 'Annual Interest Rate (%)',
        purpose: 'Annual percentage rate (APR) charged by the lender (supports 0% promo or conventional rates).',
        howToMeasure: 'From current lender quote or mortgage rate index.'
      },
      {
        fieldId: 'loanTerm',
        label: 'Loan Term (Years)',
        purpose: 'Repayment period in years (typically 15, 20, or 30 years).',
        howToMeasure: 'Loan agreement term.'
      }
    ],
    workedExample: {
      scenarioTitle: 'Standard Home Purchase ($400,000 @ 6.5% for 30 Years)',
      inputsDescription: 'Price = $400,000, Down Payment = $80,000 (20%), Rate = 6.5%, Term = 30 Yrs, Tax = 1.2%, Ins = $1,400/yr',
      stepByStepMath: [
        'Financed loan amount = $400,000 - $80,000 = $320,000.',
        'Monthly interest rate = 6.5% ÷ 12 = 0.005417; Total periods = 360 months.',
        'Monthly Principal & Interest (P&I) = $2,022.62.',
        'Monthly property tax ($400k × 1.2% ÷ 12) = $400.00.',
        'Monthly insurance ($1,400 ÷ 12) = $116.67.',
        'Total Monthly Housing Outflow (PITI) = $2,022.62 + $400.00 + $116.67 = $2,539.29.',
        'Total interest paid over 30 years = ($2,022.62 × 360) - $320,000 = $408,143.'
      ],
      finalOutputSummary: 'Monthly P&I is $2,022.62; Total monthly payment (PITI) is $2,539.29. Lifetime interest paid is $408,143.'
    },
    plainLanguageFormula: 'Monthly P&I = Loan × [r(1+r)^n] ÷ [(1+r)^n - 1] where r = monthly interest rate and n = total months. For 0% interest, Monthly P&I = Loan ÷ n.',
    assumptionsAndDefaults: [
      'Fixed-rate fully amortizing loan structure without balloon payments.',
      'Escrow accounts distribute annual taxes and insurance evenly across 12 monthly payments.'
    ],
    roundingAndUnits: 'Monetary values formatted to nearest dollar or exact cent; percentages displayed to two decimals.',
    whatResultExcludes: [
      'Private Mortgage Insurance (PMI) fees typically required if down payment is under 20%.',
      'One-time settlement closing costs and loan origination points.'
    ],
    commonMistakes: [
      'Comparing loans based only on Principal & Interest while forgetting property taxes and insurance, which can add 25-40% to monthly housing cost.',
      'Not factoring the long-term cost difference between a 15-year and 30-year amortization.'
    ],
    whenToConsultProfessional: 'Consult a licensed mortgage loan officer or financial advisor for official loan estimates, underwriting debt-to-income approval, and interest rate locks.',
    lastReviewed: '2026-03-01'
  },

  // 12. Rental Yield & Cap Rate
  'rental-yield-cap-rate-roi': {
    whatItDoes: 'Calculates Gross Rental Yield, Capitalization Rate (Cap Rate), Net Operating Income (NOI), and leveraged Cash-on-Cash Return for investment real estate.',
    whenToUse: [
      'Screening buy-to-let residential properties, multifamily acquisitions, and commercial real estate investments.'
    ],
    inputExplanations: [
      {
        fieldId: 'purchasePrice',
        label: 'Property Acquisition Price ($)',
        purpose: 'Total purchase cost of the real estate asset.',
        howToMeasure: 'Contract purchase price including immediate capital improvements.'
      },
      {
        fieldId: 'monthlyRent',
        label: 'Gross Monthly Rent ($)',
        purpose: 'Anticipated monthly rental income from tenants.',
        howToMeasure: 'Market rental comparables for equivalent neighborhood units.'
      },
      {
        fieldId: 'vacancyPct',
        label: 'Vacancy & Credit Loss (%)',
        purpose: 'Allowance for tenant turnover and uncollected rent (typically 5-8%).',
        howToMeasure: 'Local submarket historical vacancy rate.'
      },
      {
        fieldId: 'annualOpex',
        label: 'Annual Operating Expenses ($)',
        purpose: 'Property management, repairs, insurance, taxes, and maintenance fees (excluding debt service).',
        howToMeasure: 'Sum of operating budget lines.'
      }
    ],
    workedExample: {
      scenarioTitle: 'Duplex Residential Rental ($350,000 Purchase)',
      inputsDescription: 'Price = $350,000, Down Payment = $70,000, Rent = $2,600/mo, Vacancy = 5%, Opex = $6,200/yr',
      stepByStepMath: [
        'Gross annual scheduled rent = $2,600 × 12 = $31,200.',
        'Vacancy allowance (5%) = $31,200 × 0.05 = $1,560.',
        'Effective gross income = $31,200 - $1,560 = $29,640.',
        'Net Operating Income (NOI) = $29,640 - $6,200 = $23,440.',
        'Gross Rental Yield = ($31,200 ÷ $350,000) × 100 = 8.91%.',
        'Cap Rate = ($23,440 ÷ $350,000) × 100 = 6.70%.'
      ],
      finalOutputSummary: 'Gross Yield is 8.91%, Net Operating Income is $23,440/yr, and the unleveraged Cap Rate is 6.70%.'
    },
    plainLanguageFormula: 'Gross Yield = (Annual Gross Rent ÷ Price) × 100. NOI = Effective Rent - Opex. Cap Rate = (NOI ÷ Price) × 100.',
    assumptionsAndDefaults: [
      'Cap rate reflects unleveraged asset yield independent of financing structure.',
      'Opex excludes income taxes, depreciation, and mortgage debt service.'
    ],
    roundingAndUnits: 'Financial rates expressed in percentages (%) with two decimals; values in local currency.',
    whatResultExcludes: [
      'Tenant leasing commissions, major capital expenditure (CapEx) roof/HVAC replacements, and individual investor tax brackets.'
    ],
    commonMistakes: [
      'Relying solely on Gross Yield while ignoring high local property taxes or special HOA assessments that devastate Net Operating Income.',
      'Assuming zero vacancy throughout a multi-year hold period.'
    ],
    whenToConsultProfessional: 'Consult a commercial real estate broker or certified CPA for commercial lease audits, pro-forma due diligence, and 1031 tax-deferred exchanges.',
    lastReviewed: '2026-03-01'
  },

  // 13. Home Affordability & Debt Ratio
  'home-affordability-debt-ratio': {
    whatItDoes: 'Calculates maximum affordable home purchase price and loan amount based on conventional 28% front-end and 36% back-end debt-to-income (DTI) underwriting guidelines.',
    whenToUse: [
      'Determining realistic home purchasing power before house hunting or applying for pre-approval.'
    ],
    inputExplanations: [
      {
        fieldId: 'grossAnnualIncome',
        label: 'Gross Annual Household Income ($)',
        purpose: 'Pre-tax annual income from wages, self-employment, and reliable bonuses.',
        howToMeasure: 'From tax returns (W-2, 1099, or corporate earnings).'
      },
      {
        fieldId: 'monthlyDebts',
        label: 'Monthly Recurring Debt Payments ($)',
        purpose: 'Total monthly obligations for auto loans, student loans, credit card minimums, and personal loans.',
        howToMeasure: 'Sum all monthly minimum debt payments appearing on credit reports.'
      },
      {
        fieldId: 'downPayment',
        label: 'Available Down Payment ($)',
        purpose: 'Cash equity allocated to the purchase.',
        howToMeasure: 'Liquid savings minus planned closing reserve.'
      },
      {
        fieldId: 'interestRate',
        label: 'Anticipated Interest Rate (%)',
        purpose: 'Prevailing mortgage interest rate.',
        howToMeasure: 'Current market rate for borrower credit tier.'
      }
    ],
    workedExample: {
      scenarioTitle: 'Household with $115,000 Income & $450 Monthly Debts',
      inputsDescription: 'Gross Income = $115,000/yr ($9,583/mo), Debts = $450/mo, Down Payment = $65,000, Rate = 6.5%, Term = 30 Yrs',
      stepByStepMath: [
        'Monthly gross income = $115,000 ÷ 12 = $9,583.33.',
        'Front-end ceiling (28%) = $9,583.33 × 0.28 = $2,683.33.',
        'Back-end ceiling (36%) = ($9,583.33 × 0.36) - $450 = $3,450.00 - $450 = $3,000.00.',
        'Binding monthly housing payment cap = Min($2,683.33, $3,000.00) = $2,683.33.',
        'Deducting escrow taxes and insurance yields available budget for P&I.',
        'Estimated maximum purchase price = ~$450,000 with $65,000 down payment.'
      ],
      finalOutputSummary: 'Maximum qualifying monthly housing payment is $2,683/mo; estimated maximum purchase price is ~$450,000.'
    },
    plainLanguageFormula: 'Max Housing Payment = Min(Gross Monthly × 28%, Gross Monthly × 36% - Other Debts). Solves backwards for maximum principal loan supportable.',
    assumptionsAndDefaults: [
      'Standard conforming conventional underwriting ratios of 28% front-end / 36% back-end.',
      'Down payment remains fully intact for equity.'
    ],
    roundingAndUnits: 'Values formatted to nearest integer currency amount.',
    whatResultExcludes: [
      'Closing costs, loan origination points, credit score risk-based pricing adjustments, and reserve requirements.'
    ],
    commonMistakes: [
      'Calculating affordability based on net take-home pay rather than pre-tax gross income (mortgage lenders evaluate gross income).',
      'Ignoring student loans on deferred payment plans that lenders still factor at 0.5% or 1% of balance.'
    ],
    whenToConsultProfessional: 'Consult an approved mortgage lender to verify actual debt-to-income tolerances, which may reach 43-50% for FHA, VA, or strong automated underwriting cases.',
    lastReviewed: '2026-03-01'
  },

  // 14. Real Estate Closing Costs
  'closing-costs-notary-fee': {
    whatItDoes: 'Estimates property buyer transaction settlement costs, including government transfer taxes, stamp duty, notary/legal conveyance fees, title insurance, and recording charges.',
    whenToUse: [
      'Calculating total liquid cash required to close a property purchase beyond the down payment.'
    ],
    inputExplanations: [
      {
        fieldId: 'propertyPrice',
        label: 'Property Purchase Price ($)',
        purpose: 'Contract transaction price upon which transfer taxes and legal tariffs are assessed.',
        howToMeasure: 'From sales agreement or purchase contract.'
      },
      {
        fieldId: 'transferTaxPct',
        label: 'Transfer Tax / Stamp Duty Rate (%)',
        purpose: 'Government conveyance or deed transfer tax rate (varies by country, state, or municipality).',
        howToMeasure: 'Check local land registry or municipal tax schedule (typically 1.5% to 5.0%).'
      },
      {
        fieldId: 'downPayment',
        label: 'Down Payment ($)',
        purpose: 'Buyer cash equity paid towards purchase price.',
        howToMeasure: 'Agreed contract equity.'
      }
    ],
    workedExample: {
      scenarioTitle: 'Residential Property Purchase ($420,000)',
      inputsDescription: 'Price = $420,000, Down Payment = $84,000 (20%), Transfer Tax = 3.5%, Notary/Legal = 1.1%, Title = 0.75%, Admin = 0.65%',
      stepByStepMath: [
        'Transfer tax / stamp duty (3.5%) = $420,000 × 0.035 = $14,700.',
        'Notary & conveyance legal (1.1%) = $420,000 × 0.011 = $4,620.',
        'Title search & settlement (0.75%) = $420,000 × 0.0075 = $3,150.',
        'Recording & admin fees (0.65%) = $420,000 × 0.0065 = $2,730.',
        'Total estimated closing costs = $14,700 + $4,620 + $3,150 + $2,730 = $25,200 (6.0% of price).',
        'Total cash required at closing = $84,000 down payment + $25,200 closing = $109,200.'
      ],
      finalOutputSummary: 'Closing fees total $25,200 (6.0% of purchase price); total cash required to close is $109,200.'
    },
    plainLanguageFormula: 'Total Closing Costs = Sum of (Price × Category Percentage). Total Cash at Closing = Down Payment + Total Closing Costs.',
    assumptionsAndDefaults: [
      'Standard residential transaction tariffs under normal statutory conveyance rules.',
      'Buyer pays customary buyer-side conveyance and title insurance fees.'
    ],
    roundingAndUnits: 'Monetary sums formatted to nearest whole currency unit.',
    whatResultExcludes: [
      'Ongoing escrow pre-paids (initial 3-6 months tax and hazard insurance reserves).',
      'Move-in costs, utility connection deposits, and HOA transfer transfer fees.'
    ],
    commonMistakes: [
      'Assuming the down payment is the only liquid cash required at closing, resulting in last-minute funding shortfalls.',
      'Failing to check municipal transfer tax exemptions for first-time buyers.'
    ],
    whenToConsultProfessional: 'Consult a local notary, real estate conveyance attorney, or escrow officer for an official Closing Disclosure (CD) or Settlement Statement with exact regional fee schedules.',
    lastReviewed: '2026-03-01'
  },

  // 15. Wallpaper Rolls & Pattern Repeat
  'wallpaper-rolls-pattern-repeat': {
    whatItDoes: 'Calculates the number of wallpaper rolls required for a room wall, accounting for roll width, roll length, trimming margins, and pattern repeat match drop wastage.',
    whenToUse: [
      'Ordering European or American standard wallpaper rolls for feature accent walls or full room papering.'
    ],
    inputExplanations: [
      {
        fieldId: 'wallWidth',
        label: 'Total Wall Width (m)',
        purpose: 'Continuous width of the wall or walls to be papered.',
        howToMeasure: 'Measure horizontally along the baseboard or crown.'
      },
      {
        fieldId: 'wallHeight',
        label: 'Wall Height (m)',
        purpose: 'Floor-to-ceiling vertical drop distance.',
        howToMeasure: 'Measure vertical height at several points and use the maximum.'
      },
      {
        fieldId: 'rollWidth',
        label: 'Roll Width (cm)',
        purpose: 'Width of wallpaper roll (Euro standard is 53cm; American standard is 68.6cm).',
        howToMeasure: 'From wallpaper manufacturer label.'
      },
      {
        fieldId: 'rollLength',
        label: 'Roll Length (m)',
        purpose: 'Total length of wallpaper per roll (Euro standard is 10.05m).',
        howToMeasure: 'From wallpaper manufacturer label.'
      },
      {
        fieldId: 'patternRepeat',
        label: 'Pattern Repeat / Match (cm)',
        purpose: 'Vertical repeat interval (0 for plain/free match; 32-64cm for patterned wallpapers).',
        howToMeasure: 'Indicated on wallpaper roll label as "Pattern Repeat" or "Rapport".'
      }
    ],
    workedExample: {
      scenarioTitle: 'Living Room Feature Wall (4.8m wide × 2.6m high, Pattern Repeat 32cm)',
      inputsDescription: 'Width = 4.8m, Height = 2.6m, Roll = 53cm × 10.05m, Repeat = 32cm, Wastage = 10%',
      stepByStepMath: [
        'Base drop with 10cm trim allowance = 2.6m + 0.10m = 2.70m.',
        'With 32cm repeat, repeats per drop = Ceil(2.70m ÷ 0.32m) = 9 repeats.',
        'Pattern-adjusted drop length = 9 × 0.32m = 2.88m.',
        'Number of vertical drops across 4.8m width = Ceil(4.8m ÷ 0.53m) = 10 drops.',
        'Usable drops per 10.05m roll = Floor(10.05m ÷ 2.88m) = 3 drops per roll.',
        'Base rolls = Ceil(10 drops ÷ 3 drops/roll) = 4 rolls.',
        'Applying 10% safety buffer = 4 × 1.10 = 4.4 → 5 rolls.'
      ],
      finalOutputSummary: 'Requires 5 rolls of wallpaper (53cm × 10.05m), 10 vertical drops, and ~2.5kg of wallpaper paste.'
    },
    plainLanguageFormula: 'Drop Length = Ceil((Height + 0.1m) ÷ Repeat) × Repeat. Drops = Ceil(Width ÷ Roll Width). Yield = Floor(Roll Length ÷ Drop Length). Rolls = Ceil(Drops ÷ Yield).',
    assumptionsAndDefaults: [
      'Standard Euro roll dimensions (53cm wide × 10.05m long) unless custom entered.',
      'Straight match pattern alignment with 10cm top and bottom trimming safety allowance.'
    ],
    roundingAndUnits: 'Dimensions in meters; roll counts rounded up to whole rolls.',
    whatResultExcludes: [
      'Wallpaper primer/sizing, smoothing spatulas, seam rollers, and specialty vinyl paste.'
    ],
    commonMistakes: [
      'Ignoring the vertical pattern repeat, resulting in running out of wallpaper because patterns must be aligned horizontally.',
      'Not purchasing all rolls from the exact same batch/lot number, leading to subtle shade variations.'
    ],
    whenToConsultProfessional: 'For delicate grasscloth, silk, or hand-painted murals, professional wallpaper hanging specialists should be hired to prevent seam staining.',
    lastReviewed: '2026-03-01'
  }
};
