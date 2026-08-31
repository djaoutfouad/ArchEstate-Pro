import { 
  AmortizationRow, 
  CalculationSummaryStep, 
  ResultItem 
} from '../types/calculator';

/**
 * Utility helper to safely format currencies, numbers, and percentages
 */
export const formatCurrency = (val: number): string => {
  if (isNaN(val) || !isFinite(val)) return '$0';
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(val);
};

export const formatCurrencyExact = (val: number): string => {
  if (isNaN(val) || !isFinite(val)) return '$0.00';
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(val);
};

export const formatNumber = (val: number, decimals: number = 2): string => {
  if (isNaN(val) || !isFinite(val)) return '0';
  return new Intl.NumberFormat('en-US', {
    minimumFractionDigits: decimals === 0 ? 0 : 0,
    maximumFractionDigits: decimals,
  }).format(val);
};

export const formatPercent = (val: number, decimals: number = 2): string => {
  if (isNaN(val) || !isFinite(val)) return '0%';
  return `${val.toFixed(decimals)}%`;
};

// 1. BA13 Drywall Ceiling Calculator
export const calculateBA13Ceiling = (inputs: Record<string, number>) => {
  const length = Math.max(0.1, inputs.roomLength || 5.0);
  const width = Math.max(0.1, inputs.roomWidth || 4.0);
  const boardW = Math.max(0.1, inputs.boardWidth || 1.2);
  const boardL = Math.max(0.1, inputs.boardLength || 2.5);
  const wastage = Math.max(0, inputs.wastagePct || 10);
  const channelSpacing = Math.max(0.1, inputs.channelSpacing || 0.5);
  const hangerSpacing = Math.max(0.1, inputs.hangerSpacing || 1.0);
  const compoundRate = Math.max(0.01, inputs.compoundRate || 0.55);

  const ceilingArea = length * width;
  const boardArea = boardW * boardL;
  const wastageFactor = 1 + wastage / 100;
  
  const effectiveArea = ceilingArea * wastageFactor;
  const ba13Sheets = Math.ceil(effectiveArea / boardArea);
  
  // Channels: run along length at channelSpacing intervals
  const channelRuns = Math.ceil(width / channelSpacing) + 1;
  const totalChannelMeters = channelRuns * length * 1.08;
  const f530Channels = Math.ceil(totalChannelMeters / 3.0); // standard 3m profiles
  
  // Suspension hangers
  const hangersPerRun = Math.ceil(length / hangerSpacing) + 1;
  const suspensionHangers = Math.ceil(channelRuns * hangersPerRun * 1.1);
  
  // Perimeter angle (28/27 or L-profile)
  const perimeter = 2 * (length + width);
  const perimeterMeters = perimeter * 1.05;
  const perimeterWallAngle = Math.ceil(perimeterMeters / 3.0); // 3m profiles
  
  // Joint compound (kg)
  const jointCompoundKg = ceilingArea * compoundRate * wastageFactor;
  const screwsCount = ba13Sheets * 32; // ~30-35 screws per board

  const primaryResult: ResultItem = {
    id: 'sheets',
    label: 'BA13 Drywall Sheets',
    value: ba13Sheets,
    formatted: `${ba13Sheets} sheets`,
    unit: 'sheets',
    isPrimary: true,
    highlight: 'emerald',
    description: `Includes ${wastage}% cut allowance on ${boardL}m × ${boardW}m boards (${boardArea.toFixed(2)} m² ea).`,
  };

  const secondaryResults: ResultItem[] = [
    {
      id: 'area',
      label: 'Ceiling Surface Area',
      value: ceilingArea,
      formatted: `${formatNumber(ceilingArea, 2)} m²`,
      unit: 'm²',
      highlight: 'neutral',
      description: `Gross footprint: ${length}m × ${width}m`,
    },
    {
      id: 'f530',
      label: 'F530 Furring Channels (3m)',
      value: f530Channels,
      formatted: `${f530Channels} pcs`,
      unit: 'pcs (3m)',
      highlight: 'emerald',
      description: `${formatNumber(totalChannelMeters, 1)} linear meters @ ${channelSpacing}m on-center.`,
    },
    {
      id: 'hangers',
      label: 'Suspension Hangers & Rods',
      value: suspensionHangers,
      formatted: `${suspensionHangers} units`,
      unit: 'units',
      highlight: 'neutral',
      description: `Anchor points @ ${hangerSpacing}m grid intervals with 10% safety buffer.`,
    },
    {
      id: 'angle',
      label: 'Perimeter Wall Angle (3m)',
      value: perimeterWallAngle,
      formatted: `${perimeterWallAngle} pcs`,
      unit: 'pcs (3m)',
      highlight: 'neutral',
      description: `${formatNumber(perimeterMeters, 1)}m boundary support around perimeter.`,
    },
    {
      id: 'compound',
      label: 'Joint Compound Ready-Mix',
      value: jointCompoundKg,
      formatted: `${formatNumber(jointCompoundKg, 1)} kg`,
      unit: 'kg',
      highlight: 'amber',
      description: `Approx ${Math.ceil(jointCompoundKg / 25)} standard 25kg tubs for taping and finishing coats.`,
    },
    {
      id: 'screws',
      label: 'Drywall Screws (25mm)',
      value: screwsCount,
      formatted: `${screwsCount} pcs`,
      unit: 'screws',
      highlight: 'neutral',
      description: `Bugle-head drywall screws spaced 20-25cm along framing profiles.`,
    },
  ];

  const summarySteps: CalculationSummaryStep[] = [
    { label: 'Room Footprint Area', formula: `${length}m × ${width}m`, value: `${formatNumber(ceilingArea, 2)} m²` },
    { label: 'Board Gross Coverage', formula: `${formatNumber(ceilingArea, 2)} m² × ${wastageFactor.toFixed(2)} wastage ÷ ${boardArea.toFixed(2)} m²`, value: `${ba13Sheets} boards` },
    { label: 'F530 Channels', formula: `${channelRuns} runs × ${length}m ÷ 3m length`, value: `${f530Channels} bars (3m)` },
    { label: 'Perimeter Boundary', formula: `2 × (${length}m + ${width}m) × 1.05 ÷ 3m`, value: `${perimeterWallAngle} bars (3m)` },
  ];

  return { primaryResult, secondaryResults, summarySteps };
};

// 2. PVC Panel Ceiling Calculator
export const calculatePVCCeiling = (inputs: Record<string, number>) => {
  const length = Math.max(0.1, inputs.roomLength || 4.5);
  const width = Math.max(0.1, inputs.roomWidth || 3.2);
  const panelW = Math.max(0.05, (inputs.panelWidth || 250) / 1000); // mm to m
  const panelL = Math.max(0.5, inputs.panelLength || 3.95);
  const wastage = Math.max(0, inputs.wastagePct || 8);
  const battenSpacing = Math.max(0.1, inputs.battenSpacing || 0.4);

  const ceilingArea = length * width;
  const panelArea = panelW * panelL;
  const wastageFactor = 1 + wastage / 100;
  
  const effectiveArea = ceilingArea * wastageFactor;
  const pvcPanels = Math.ceil(effectiveArea / panelArea);
  
  // Perimeter U-trim (molding channel)
  const perimeter = 2 * (length + width);
  const uTrimMeters = perimeter * 1.06;
  const uTrimPieces = Math.ceil(uTrimMeters / 3.0); // 3m standard trims
  
  // Supporting battens (perpendicular to panels)
  const battenRuns = Math.ceil(length / battenSpacing) + 1;
  const totalBattenMeters = battenRuns * width * 1.08;
  const battenPieces = Math.ceil(totalBattenMeters / 3.0); // 3m timber/metal battens
  const clips = pvcPanels * Math.ceil(length / battenSpacing) * 1.1;

  const primaryResult: ResultItem = {
    id: 'panels',
    label: 'PVC Tongue-and-Groove Panels',
    value: pvcPanels,
    formatted: `${pvcPanels} panels`,
    unit: 'panels',
    isPrimary: true,
    highlight: 'emerald',
    description: `Calculated for ${(panelW * 1000).toFixed(0)}mm × ${panelL}m panels with ${wastage}% offcut allowance.`,
  };

  const secondaryResults: ResultItem[] = [
    {
      id: 'area',
      label: 'Ceiling Surface Area',
      value: ceilingArea,
      formatted: `${formatNumber(ceilingArea, 2)} m²`,
      unit: 'm²',
      highlight: 'neutral',
      description: `${length}m × ${width}m total span.`,
    },
    {
      id: 'utrim',
      label: 'Perimeter U-Trim / Crown Moldings (3m)',
      value: uTrimPieces,
      formatted: `${uTrimPieces} pcs`,
      unit: 'pcs (3m)',
      highlight: 'emerald',
      description: `${formatNumber(uTrimMeters, 1)} linear meters around room boundaries.`,
    },
    {
      id: 'battens',
      label: 'Sub-Framing Battens (3m pieces)',
      value: battenPieces,
      formatted: `${battenPieces} pcs`,
      unit: 'pcs (3m)',
      highlight: 'neutral',
      description: `${formatNumber(totalBattenMeters, 1)}m total grid @ ${battenSpacing}m centers.`,
    },
    {
      id: 'clips',
      label: 'Concealed Fastener Clips / Screws',
      value: Math.ceil(clips),
      formatted: `${Math.ceil(clips)} pcs`,
      unit: 'clips',
      highlight: 'amber',
      description: `Stainless fastening clips to fix tongue edges directly to battens.`,
    },
  ];

  const summarySteps: CalculationSummaryStep[] = [
    { label: 'Surface Dimension', formula: `${length}m × ${width}m`, value: `${formatNumber(ceilingArea, 2)} m²` },
    { label: 'Panel Count', formula: `${formatNumber(ceilingArea, 2)} m² × ${wastageFactor.toFixed(2)} ÷ ${(panelArea).toFixed(3)} m²`, value: `${pvcPanels} units` },
    { label: 'Perimeter Finishing Trim', formula: `2 × (${length}m + ${width}m) ÷ 3m`, value: `${uTrimPieces} bars (3m)` },
  ];

  return { primaryResult, secondaryResults, summarySteps };
};

// 3. 60x60 Acoustic Grid Ceiling Estimator
export const calculateAcousticGridCeiling = (inputs: Record<string, number>) => {
  const length = Math.max(0.1, inputs.roomLength || 6.0);
  const width = Math.max(0.1, inputs.roomWidth || 4.8);
  const tileSize = Math.max(0.3, inputs.tileSize || 0.60); // 600mm = 0.6m
  const wastage = Math.max(0, inputs.wastagePct || 8);
  const mainRunnerSpacing = Math.max(0.6, inputs.mainRunnerSpacing || 1.2);
  const crossTeeSpacing = Math.max(0.3, inputs.crossTeeSpacing || 0.6);

  const ceilingArea = length * width;
  const tileArea = tileSize * tileSize;
  const wastageFactor = 1 + wastage / 100;
  
  const tilesCount = Math.ceil((ceilingArea * wastageFactor) / tileArea);
  const boxes = Math.ceil(tilesCount / 16); // standard 16 tiles/box for 60x60
  
  // T24 Main Runners (typically 3.6m long placed every 1.2m)
  const runnerRuns = Math.ceil(width / mainRunnerSpacing);
  const totalRunnerMeters = runnerRuns * length * 1.05;
  const mainRunners = Math.ceil(totalRunnerMeters / 3.6);
  
  // Cross Tees 1.2m & 0.6m
  const crossTees120 = Math.ceil((ceilingArea / 0.72) * 1.05);
  const crossTees60 = Math.ceil((ceilingArea / 0.72) * 1.05);
  
  // Perimeter Wall Angle (3.0m)
  const perimeter = 2 * (length + width) * 1.05;
  const wallAngle = Math.ceil(perimeter / 3.0);
  
  // Suspension wire points (every 1.2m on main runners)
  const hangers = Math.ceil((length / 1.2) * runnerRuns * 1.1);

  const primaryResult: ResultItem = {
    id: 'tiles',
    label: '60×60 Acoustic Ceiling Tiles',
    value: tilesCount,
    formatted: `${tilesCount} tiles`,
    unit: 'tiles',
    isPrimary: true,
    highlight: 'emerald',
    description: `Equivalent to ${boxes} commercial cartons (16 tiles/carton @ 5.76 m² per box).`,
  };

  const secondaryResults: ResultItem[] = [
    {
      id: 'area',
      label: 'Total Grid Area',
      value: ceilingArea,
      formatted: `${formatNumber(ceilingArea, 2)} m²`,
      unit: 'm²',
      highlight: 'neutral',
      description: `${length}m × ${width}m suspended space.`,
    },
    {
      id: 'mainRunners',
      label: 'T24 Main Runners (3.6m)',
      value: mainRunners,
      formatted: `${mainRunners} pcs`,
      unit: 'pcs (3.6m)',
      highlight: 'emerald',
      description: `Heavy-duty slotted runners hung on ${mainRunnerSpacing}m parallel centers.`,
    },
    {
      id: 'crossTees120',
      label: 'Cross Tees (1.2m)',
      value: crossTees120,
      formatted: `${crossTees120} pcs`,
      unit: 'pcs (1.2m)',
      highlight: 'neutral',
      description: `Primary interlocking cross members.`,
    },
    {
      id: 'crossTees60',
      label: 'Cross Tees (0.6m)',
      value: crossTees60,
      formatted: `${crossTees60} pcs`,
      unit: 'pcs (0.6m)',
      highlight: 'neutral',
      description: `Sub-dividing modules to form standard 600×600mm pockets.`,
    },
    {
      id: 'wallAngle',
      label: 'Perimeter Wall Angle (3.0m)',
      value: wallAngle,
      formatted: `${wallAngle} pcs`,
      unit: 'pcs (3.0m)',
      highlight: 'neutral',
      description: `${formatNumber(perimeter, 1)}m edge support along structural walls.`,
    },
    {
      id: 'hangers',
      label: 'Suspension Hangers & Wire',
      value: hangers,
      formatted: `${hangers} sets`,
      unit: 'sets',
      highlight: 'amber',
      description: `Galvanized 2mm quick-adjust wire hangers and soffit cleats.`,
    },
  ];

  const summarySteps: CalculationSummaryStep[] = [
    { label: 'Room Net Footprint', formula: `${length}m × ${width}m`, value: `${formatNumber(ceilingArea, 2)} m²` },
    { label: 'Tile Quantities', formula: `(${formatNumber(ceilingArea, 2)} m² × ${wastageFactor.toFixed(2)}) ÷ 0.36 m²`, value: `${tilesCount} tiles (${boxes} boxes)` },
    { label: 'Main Runners (3.6m)', formula: `${runnerRuns} runs × ${length}m ÷ 3.6m`, value: `${mainRunners} pcs` },
    { label: 'Wall Trim Line', formula: `2 × (${length}m + ${width}m) ÷ 3m`, value: `${wallAngle} pcs` },
  ];

  return { primaryResult, secondaryResults, summarySteps };
};

// 4. Multi-Level & LED Cove Ceiling Estimator
export const calculateCoveCeiling = (inputs: Record<string, number>) => {
  const length = Math.max(0.1, inputs.roomLength || 5.5);
  const width = Math.max(0.1, inputs.roomWidth || 4.2);
  const dropDepth = Math.max(0.05, (inputs.dropDepth || 18) / 100); // cm to m
  const framingSpacing = Math.max(0.1, inputs.framingSpacing || 0.4);
  const wastage = Math.max(0, inputs.wastagePct || 10);
  const coveRun = Math.max(1, inputs.covePerimeter || 2 * (length + width) - 1.6);
  const stripWastage = Math.max(0, inputs.stripWastage || 8);

  const baseCeilingArea = length * width;
  const wastageFactor = 1 + wastage / 100;
  
  // Vertical fascia and light trough drywall area
  const verticalFasciaArea = coveRun * (dropDepth + 0.12) * wastageFactor; // drop face + light shelf
  const totalDrywallArea = (baseCeilingArea + verticalFasciaArea) * wastageFactor;
  const drywallSheets = Math.ceil(totalDrywallArea / 3.0); // 2.5m x 1.2m = 3m²
  
  // Framing metal profiles (studs + track for bulkheads)
  const bulkheadFramingMeters = coveRun * 3.6 * 1.08;
  const framingProfiles = Math.ceil(bulkheadFramingMeters / 3.0);
  
  // Aluminum LED channel and Diffuser (2m pieces standard)
  const ledChannelMeters = coveRun * 1.05;
  const aluminumChannels = Math.ceil(ledChannelMeters / 2.0); // 2m channels
  
  // LED Strip continuous roll
  const ledStripLength = coveRun * (1 + stripWastage / 100);
  const ledRolls5m = Math.ceil(ledStripLength / 5.0); // 5m standard rolls
  const driverWattage = Math.ceil(ledStripLength * 14.4 * 1.25); // ~14.4 W/m with 25% safety headroom

  const primaryResult: ResultItem = {
    id: 'ledStrip',
    label: 'LED Strip Total Length',
    value: ledStripLength,
    formatted: `${formatNumber(ledStripLength, 1)} meters`,
    unit: 'meters',
    isPrimary: true,
    highlight: 'emerald',
    description: `Requires ${ledRolls5m} standard 5m rolls. Recommended power supply: ${driverWattage}W (24V DC).`,
  };

  const secondaryResults: ResultItem[] = [
    {
      id: 'channel',
      label: 'Aluminum LED Profiles + Diffusers (2m)',
      value: aluminumChannels,
      formatted: `${aluminumChannels} pcs`,
      unit: 'pcs (2m)',
      highlight: 'emerald',
      description: `${formatNumber(ledChannelMeters, 1)}m surface-mount or flanged extruded channel.`,
    },
    {
      id: 'sheets',
      label: 'Drywall Sheets (Main + Drop Fascia)',
      value: drywallSheets,
      formatted: `${drywallSheets} sheets`,
      unit: 'sheets (2.5×1.2m)',
      highlight: 'neutral',
      description: `Covers ${formatNumber(baseCeilingArea, 1)} m² soffit + ${formatNumber(verticalFasciaArea, 1)} m² stepped fascia.`,
    },
    {
      id: 'framing',
      label: 'Bulkhead Metal Studs/Track (3m)',
      value: framingProfiles,
      formatted: `${framingProfiles} pcs`,
      unit: 'pcs (3m)',
      highlight: 'neutral',
      description: `${formatNumber(bulkheadFramingMeters, 1)}m reinforced framing for drop shelf.`,
    },
    {
      id: 'dropArea',
      label: 'Vertical Drop Fascia Height',
      value: dropDepth * 100,
      formatted: `${(dropDepth * 100).toFixed(0)} cm`,
      unit: 'cm',
      highlight: 'amber',
      description: `Architectural step-down drop with concealed uplight lip.`,
    },
  ];

  const summarySteps: CalculationSummaryStep[] = [
    { label: 'Cove Perimeter Run', formula: `Configured continuous run`, value: `${formatNumber(coveRun, 2)} linear meters` },
    { label: 'LED Channel & Strip', formula: `${formatNumber(coveRun, 1)}m × ${(1 + stripWastage / 100).toFixed(2)} buffer`, value: `${formatNumber(ledStripLength, 1)}m (${ledRolls5m} × 5m reels)` },
    { label: 'Power Supply Sizing', formula: `${formatNumber(ledStripLength, 1)}m × 14.4W/m × 1.25 factor`, value: `${driverWattage} Watts (24V DC)` },
  ];

  return { primaryResult, secondaryResults, summarySteps };
};

// 5. Traditional Plaster & Staff Ceiling Estimator
export const calculatePlasterCeiling = (inputs: Record<string, number>) => {
  const length = Math.max(0.1, inputs.roomLength || 5.0);
  const width = Math.max(0.1, inputs.roomWidth || 4.0);
  const plasterCoverage = Math.max(1, inputs.plasterCoverage || 11.5); // kg per m²
  const fiberRate = Math.max(0.05, inputs.fiberRate || 0.35); // kg per m²
  const cornicePieceLength = Math.max(0.5, inputs.cornicePieceLength || 2.0); // 2m standard
  const wastage = Math.max(0, inputs.wastagePct || 10);

  const ceilingArea = length * width;
  const wastageFactor = 1 + wastage / 100;
  
  // Plaster total weight & 25kg bags
  const totalPlasterKg = ceilingArea * plasterCoverage * wastageFactor;
  const plasterBags25kg = Math.ceil(totalPlasterKg / 25);
  
  // Hemp fiber (filasse) in kg
  const hempFiberKg = ceilingArea * fiberRate * wastageFactor;
  
  // Cornices / staff moldings along perimeter
  const perimeter = 2 * (length + width);
  const corniceMeters = perimeter * 1.08;
  const cornicePieces = Math.ceil(corniceMeters / cornicePieceLength);

  const primaryResult: ResultItem = {
    id: 'plasterBags',
    label: 'Moulding Plaster (25kg Bags)',
    value: plasterBags25kg,
    formatted: `${plasterBags25kg} bags`,
    unit: 'bags (25kg)',
    isPrimary: true,
    highlight: 'emerald',
    description: `Total dry mass: ${formatNumber(totalPlasterKg, 1)} kg for staff / traditional gypsum coats.`,
  };

  const secondaryResults: ResultItem[] = [
    {
      id: 'area',
      label: 'Ceiling Surface Area',
      value: ceilingArea,
      formatted: `${formatNumber(ceilingArea, 2)} m²`,
      unit: 'm²',
      highlight: 'neutral',
      description: `${length}m × ${width}m continuous flat surface.`,
    },
    {
      id: 'fiber',
      label: 'Natural Hemp Fiber (Filasse)',
      value: hempFiberKg,
      formatted: `${formatNumber(hempFiberKg, 1)} kg`,
      unit: 'kg',
      highlight: 'emerald',
      description: `Structural vegetable hemp fiber for arming and staff suspension wicks.`,
    },
    {
      id: 'cornices',
      label: 'Perimeter Cornice Moldings',
      value: cornicePieces,
      formatted: `${cornicePieces} pcs`,
      unit: `pcs (${cornicePieceLength}m)`,
      highlight: 'neutral',
      description: `${formatNumber(corniceMeters, 1)}m perimeter run with corner mitre allowance.`,
    },
    {
      id: 'water',
      label: 'Estimated Mixing Water',
      value: totalPlasterKg * 0.7,
      formatted: `${formatNumber(totalPlasterKg * 0.7, 0)} Liters`,
      unit: 'Liters',
      highlight: 'amber',
      description: `Standard 70-80% water-to-plaster ratio for optimal casting and bond strength.`,
    },
  ];

  const summarySteps: CalculationSummaryStep[] = [
    { label: 'Surface Plane Area', formula: `${length}m × ${width}m`, value: `${formatNumber(ceilingArea, 2)} m²` },
    { label: 'Gypsum Material Yield', formula: `${formatNumber(ceilingArea, 2)} m² × ${plasterCoverage} kg/m² × ${wastageFactor.toFixed(2)}`, value: `${formatNumber(totalPlasterKg, 0)} kg (${plasterBags25kg} bags)` },
    { label: 'Reinforcing Hemp Ratio', formula: `${formatNumber(ceilingArea, 2)} m² × ${fiberRate} kg/m² × ${wastageFactor.toFixed(2)}`, value: `${formatNumber(hempFiberKg, 1)} kg` },
    { label: 'Cornice Strip Count', formula: `2 × (${length}m + ${width}m) × 1.08 ÷ ${cornicePieceLength}m`, value: `${cornicePieces} pieces` },
  ];

  return { primaryResult, secondaryResults, summarySteps };
};

// 6. Room Paint & Primer Calculator
export const calculatePaintPrimer = (inputs: Record<string, number>) => {
  const length = Math.max(0.1, inputs.roomLength || 4.5);
  const width = Math.max(0.1, inputs.roomWidth || 3.5);
  const wallHeight = Math.max(0.5, inputs.wallHeight || 2.7);
  const openingsArea = Math.max(0, inputs.openingsArea || 4.2);
  const finishCoats = Math.max(1, inputs.finishCoats || 2);
  const paintCoverage = Math.max(1, inputs.paintCoverage || 10.5); // m²/liter
  const primerCoats = Math.max(0, inputs.primerCoats || 1);
  const primerCoverage = Math.max(1, inputs.primerCoverage || 11.0); // m²/liter
  const includeCeiling = inputs.includeCeiling !== 0;

  const grossWallArea = 2 * (length + width) * wallHeight;
  const ceilingArea = length * width;
  const netWallArea = Math.max(0, grossWallArea - openingsArea);
  const totalPaintArea = netWallArea + (includeCeiling ? ceilingArea : 0);

  const finishPaintLiters = (totalPaintArea * finishCoats) / paintCoverage;
  const primerLiters = primerCoats > 0 ? (totalPaintArea * primerCoats) / primerCoverage : 0;
  
  // Standard can packages: 10L, 5L, 2.5L, 1L
  const finish10LCans = Math.floor(finishPaintLiters / 10);
  const finishRem5L = Math.ceil((finishPaintLiters % 10) / 5);

  const primaryResult: ResultItem = {
    id: 'paintLiters',
    label: 'Finish Paint Required',
    value: finishPaintLiters,
    formatted: `${formatNumber(finishPaintLiters, 1)} Liters`,
    unit: 'Liters',
    isPrimary: true,
    highlight: 'emerald',
    description: `Covers ${formatNumber(totalPaintArea, 1)} m² with ${finishCoats} coats (@ ${paintCoverage} m²/L).`,
  };

  const secondaryResults: ResultItem[] = [
    {
      id: 'primerLiters',
      label: 'Sealer / Primer Required',
      value: primerLiters,
      formatted: `${formatNumber(primerLiters, 1)} Liters`,
      unit: 'Liters',
      highlight: primerCoats > 0 ? 'emerald' : 'neutral',
      description: primerCoats > 0 
        ? `${primerCoats} coat (@ ${primerCoverage} m²/L) over fresh or patched surfaces.`
        : 'Primer omitted.',
    },
    {
      id: 'netArea',
      label: 'Net Paintable Surface Area',
      value: totalPaintArea,
      formatted: `${formatNumber(totalPaintArea, 2)} m²`,
      unit: 'm²',
      highlight: 'neutral',
      description: `Walls (${formatNumber(netWallArea, 1)} m²) ${includeCeiling ? `+ Ceiling (${formatNumber(ceilingArea, 1)} m²)` : ''}`,
    },
    {
      id: 'wallArea',
      label: 'Gross Wall Area',
      value: grossWallArea,
      formatted: `${formatNumber(grossWallArea, 2)} m²`,
      unit: 'm²',
      highlight: 'neutral',
      description: `Perimeter (${formatNumber(2 * (length + width), 1)}m) × Height (${wallHeight}m)`,
    },
    {
      id: 'openings',
      label: 'Deducted Doors & Windows',
      value: openingsArea,
      formatted: `${formatNumber(openingsArea, 2)} m²`,
      unit: 'm²',
      highlight: 'amber',
      description: `Subtracted from paintable surface calculation.`,
    },
    {
      id: 'ceilingArea',
      label: 'Ceiling Surface',
      value: ceilingArea,
      formatted: `${formatNumber(ceilingArea, 2)} m²`,
      unit: 'm²',
      highlight: 'neutral',
      description: `${length}m × ${width}m horizontal surface.`,
    },
  ];

  const summarySteps: CalculationSummaryStep[] = [
    { label: 'Gross Walls', formula: `2 × (${length}m + ${width}m) × ${wallHeight}m`, value: `${formatNumber(grossWallArea, 2)} m²` },
    { label: 'Net Area', formula: `${formatNumber(grossWallArea, 2)} m² - ${openingsArea} m² + ${includeCeiling ? formatNumber(ceilingArea, 2) : 0} m²`, value: `${formatNumber(totalPaintArea, 2)} m²` },
    { label: 'Finish Paint Liters', formula: `(${formatNumber(totalPaintArea, 2)} m² × ${finishCoats} coats) ÷ ${paintCoverage} m²/L`, value: `${formatNumber(finishPaintLiters, 2)} Liters` },
    { label: 'Primer Liters', formula: `(${formatNumber(totalPaintArea, 2)} m² × ${primerCoats} coats) ÷ ${primerCoverage} m²/L`, value: `${formatNumber(primerLiters, 2)} Liters` },
  ];

  return { primaryResult, secondaryResults, summarySteps };
};

// 7. Floor & Wall Tile Estimator
export const calculateTiles = (inputs: Record<string, number>) => {
  const length = Math.max(0.1, inputs.surfaceLength || 5.0);
  const width = Math.max(0.1, inputs.surfaceWidth || 3.8);
  const tileW = Math.max(1, inputs.tileWidth || 60); // cm
  const tileL = Math.max(1, inputs.tileLength || 60); // cm
  const wastage = Math.max(0, inputs.wastagePct || 10);
  const groutRate = Math.max(0.05, inputs.groutRate || 0.45); // kg/m²

  const surfaceArea = length * width;
  const tileAreaM2 = (tileW / 100) * (tileL / 100);
  const wastageFactor = 1 + wastage / 100;
  
  const purchasedCoverage = surfaceArea * wastageFactor;
  const tileQuantity = Math.ceil(purchasedCoverage / tileAreaM2);
  const groutQuantity = surfaceArea * groutRate * 1.08;
  
  // Boxes calculation: typical tile packaging
  const tilesPerBox = tileAreaM2 >= 0.5 ? 2 : (tileAreaM2 >= 0.3 ? 4 : 8);
  const boxes = Math.ceil(tileQuantity / tilesPerBox);
  const adhesiveBags25kg = Math.ceil((purchasedCoverage * 4.5) / 25); // ~4.5kg mortar per m²

  const primaryResult: ResultItem = {
    id: 'tilesCount',
    label: 'Total Tiles Required',
    value: tileQuantity,
    formatted: `${tileQuantity} tiles`,
    unit: 'tiles',
    isPrimary: true,
    highlight: 'emerald',
    description: `Provides ${formatNumber(purchasedCoverage, 2)} m² total coverage (${wastage}% cut allowance included).`,
  };

  const secondaryResults: ResultItem[] = [
    {
      id: 'coverage',
      label: 'Purchased Tile Coverage',
      value: purchasedCoverage,
      formatted: `${formatNumber(purchasedCoverage, 2)} m²`,
      unit: 'm²',
      highlight: 'emerald',
      description: `Net floor/wall area: ${formatNumber(surfaceArea, 2)} m².`,
    },
    {
      id: 'boxes',
      label: 'Estimated Tile Boxes',
      value: boxes,
      formatted: `${boxes} boxes`,
      unit: 'boxes',
      highlight: 'neutral',
      description: `Based on standard packaging of ~${tilesPerBox} tiles (${(tilesPerBox * tileAreaM2).toFixed(2)} m²) per box.`,
    },
    {
      id: 'grout',
      label: 'Tile Grout Compound',
      value: groutQuantity,
      formatted: `${formatNumber(groutQuantity, 1)} kg`,
      unit: 'kg',
      highlight: 'amber',
      description: `For 2-3mm joints (${Math.ceil(groutQuantity / 5)} standard 5kg pouches).`,
    },
    {
      id: 'adhesive',
      label: 'Flexible Tile Adhesive (25kg)',
      value: adhesiveBags25kg,
      formatted: `${adhesiveBags25kg} bags`,
      unit: 'bags (25kg)',
      highlight: 'neutral',
      description: `Assuming thin-set mortar bed with 8-10mm notched trowel application.`,
    },
  ];

  const summarySteps: CalculationSummaryStep[] = [
    { label: 'Surface Plane', formula: `${length}m × ${width}m`, value: `${formatNumber(surfaceArea, 2)} m²` },
    { label: 'Individual Tile Area', formula: `${tileW}cm × ${tileL}cm ÷ 10,000`, value: `${formatNumber(tileAreaM2, 4)} m²` },
    { label: 'Purchased Coverage', formula: `${formatNumber(surfaceArea, 2)} m² × ${wastageFactor.toFixed(2)}`, value: `${formatNumber(purchasedCoverage, 2)} m²` },
    { label: 'Tile Count', formula: `${formatNumber(purchasedCoverage, 2)} m² ÷ ${formatNumber(tileAreaM2, 4)} m²`, value: `${tileQuantity} units (${boxes} boxes)` },
  ];

  return { primaryResult, secondaryResults, summarySteps };
};

// 8. Concrete Volume & Slab Calculator
export const calculateConcrete = (inputs: Record<string, number>) => {
  const length = Math.max(0.1, inputs.length || 6.0);
  const width = Math.max(0.1, inputs.width || 4.0);
  const thicknessCm = Math.max(1, inputs.thickness || 12); // cm
  const wastage = Math.max(0, inputs.wastagePct || 8);
  const bagSize = Math.max(10, inputs.bagSize || 25); // kg (25kg or 40kg)

  const thicknessM = thicknessCm / 100;
  const baseVolumeM3 = length * width * thicknessM;
  const wastageFactor = 1 + wastage / 100;
  const concreteM3 = baseVolumeM3 * wastageFactor;
  const concreteYd3 = concreteM3 * 1.30795;
  
  // Premix bag yields approx 0.0115 m³ per 25kg bag or 0.019 m³ per 40kg bag (approx 2150 kg/m³ yield)
  const bagYieldM3 = bagSize / 2150;
  const premixBags = Math.ceil(concreteM3 / bagYieldM3);
  const totalWeightTonnes = concreteM3 * 2.4; // standard wet concrete ~2400 kg/m³

  const primaryResult: ResultItem = {
    id: 'volumeM3',
    label: 'Concrete Required (m³)',
    value: concreteM3,
    formatted: `${formatNumber(concreteM3, 2)} m³`,
    unit: 'm³',
    isPrimary: true,
    highlight: 'emerald',
    description: `Includes ${wastage}% grade irregularity and compaction buffer (${formatNumber(concreteYd3, 2)} cubic yards).`,
  };

  const secondaryResults: ResultItem[] = [
    {
      id: 'volumeYd3',
      label: 'Volume in Cubic Yards',
      value: concreteYd3,
      formatted: `${formatNumber(concreteYd3, 2)} yd³`,
      unit: 'yd³',
      highlight: 'emerald',
      description: `Imperial standard for ready-mix batch truck ordering.`,
    },
    {
      id: 'baseVolume',
      label: 'Theoretical Net Volume',
      value: baseVolumeM3,
      formatted: `${formatNumber(baseVolumeM3, 2)} m³`,
      unit: 'm³',
      highlight: 'neutral',
      description: `Exact geometric slab dimensions: ${length}m × ${width}m × ${thicknessCm}cm.`,
    },
    {
      id: 'premixBags',
      label: `Premix Bags (${bagSize}kg)`,
      value: premixBags,
      formatted: `~${premixBags} bags`,
      unit: `bags (${bagSize}kg)`,
      highlight: 'amber',
      description: `Approximation: Premix bag yields vary by manufacturer and water ratio.`,
    },
    {
      id: 'weight',
      label: 'Estimated Cured Weight',
      value: totalWeightTonnes,
      formatted: `${formatNumber(totalWeightTonnes, 1)} tonnes`,
      unit: 'tonnes',
      highlight: 'neutral',
      description: `Density benchmark: ~2,400 kg/m³ for standard structural mix.`,
    },
  ];

  const summarySteps: CalculationSummaryStep[] = [
    { label: 'Slab Geometric Volume', formula: `${length}m × ${width}m × ${(thicknessM).toFixed(3)}m`, value: `${formatNumber(baseVolumeM3, 3)} m³` },
    { label: 'Factored Order Volume', formula: `${formatNumber(baseVolumeM3, 3)} m³ × ${wastageFactor.toFixed(2)}`, value: `${formatNumber(concreteM3, 2)} m³ (${formatNumber(concreteYd3, 2)} yd³)` },
    { label: 'Premix Bag Approximation', formula: `${formatNumber(concreteM3, 2)} m³ ÷ ${(bagYieldM3).toFixed(5)} m³/bag`, value: `~${premixBags} bags (${bagSize}kg)` },
  ];

  return { primaryResult, secondaryResults, summarySteps };
};

// 9. Brick & Block Wall Calculator
export const calculateBricks = (inputs: Record<string, number>) => {
  const length = Math.max(0.1, inputs.wallLength || 8.0);
  const height = Math.max(0.1, inputs.wallHeight || 2.6);
  const unitLengthCm = Math.max(5, inputs.unitLength || 20); // cm
  const unitHeightCm = Math.max(3, inputs.unitHeight || 10); // cm
  const mortarFactorMm = Math.max(0, inputs.mortarJoint || 10); // 10mm standard joint
  const wastage = Math.max(0, inputs.wastagePct || 5);

  const wallArea = length * height;
  const effectiveLengthM = (unitLengthCm + mortarFactorMm / 10) / 100;
  const effectiveHeightM = (unitHeightCm + mortarFactorMm / 10) / 100;
  const effectiveUnitArea = effectiveLengthM * effectiveHeightM;
  
  const wastageFactor = 1 + wastage / 100;
  const bricksCount = Math.ceil((wallArea / effectiveUnitArea) * wastageFactor);
  
  // Mortar volume estimate: ~0.025 m³ per m² of single-skin masonry wall
  const mortarVolumeM3 = wallArea * 0.022 * wastageFactor;
  const cementBags50kg = Math.ceil(mortarVolumeM3 * 7.5); // ~7-8 bags per m³ of mortar
  const masonrySandTonnes = mortarVolumeM3 * 1.4;

  const primaryResult: ResultItem = {
    id: 'bricksCount',
    label: 'Masonry Units Required',
    value: bricksCount,
    formatted: `${bricksCount} units`,
    unit: 'units',
    isPrimary: true,
    highlight: 'emerald',
    description: `Includes ${wastage}% breakage/cutting allowance with ${mortarFactorMm}mm joint lines.`,
  };

  const secondaryResults: ResultItem[] = [
    {
      id: 'wallArea',
      label: 'Gross Masonry Wall Area',
      value: wallArea,
      formatted: `${formatNumber(wallArea, 2)} m²`,
      unit: 'm²',
      highlight: 'neutral',
      description: `${length}m span × ${height}m elevation.`,
    },
    {
      id: 'mortarVol',
      label: 'Mortar Allowance',
      value: mortarVolumeM3,
      formatted: `${formatNumber(mortarVolumeM3, 2)} m³`,
      unit: 'm³',
      highlight: 'emerald',
      description: `Total mixed laying mortar for horizontal bed and vertical head joints.`,
    },
    {
      id: 'cementBags',
      label: 'Masonry Cement (50kg Bags)',
      value: cementBags50kg,
      formatted: `${cementBags50kg} bags`,
      unit: 'bags (50kg)',
      highlight: 'amber',
      description: `For standard 1:4 or 1:5 cement-to-sand mortar mix.`,
    },
    {
      id: 'sand',
      label: 'Washed Building Sand',
      value: masonrySandTonnes,
      formatted: `${formatNumber(masonrySandTonnes, 1)} tonnes`,
      unit: 'tonnes',
      highlight: 'neutral',
      description: `Fine building aggregate for mortar blend.`,
    },
  ];

  const summarySteps: CalculationSummaryStep[] = [
    { label: 'Wall Surface Elevation', formula: `${length}m × ${height}m`, value: `${formatNumber(wallArea, 2)} m²` },
    { label: 'Unit Effective Footprint', formula: `(${unitLengthCm} + ${mortarFactorMm/10}cm) × (${unitHeightCm} + ${mortarFactorMm/10}cm) ÷ 10,000`, value: `${formatNumber(effectiveUnitArea, 4)} m²` },
    { label: 'Units with Breakage', formula: `(${formatNumber(wallArea, 2)} m² ÷ ${formatNumber(effectiveUnitArea, 4)} m²) × ${wastageFactor.toFixed(2)}`, value: `${bricksCount} bricks/blocks` },
    { label: 'Laying Mortar Volume', formula: `${formatNumber(wallArea, 2)} m² × 0.022 m³/m² × ${wastageFactor.toFixed(2)}`, value: `${formatNumber(mortarVolumeM3, 2)} m³` },
  ];

  return { primaryResult, secondaryResults, summarySteps };
};

// 10. Air Conditioner BTU Size Calculator
export const calculateACSize = (inputs: Record<string, number>) => {
  const length = Math.max(0.1, inputs.roomLength || 5.0);
  const width = Math.max(0.1, inputs.roomWidth || 4.0);
  const height = Math.max(1.8, inputs.roomHeight || 2.7);
  const climateMultiplier = inputs.climateMultiplier || 1.15; // 1.0 moderate, 1.15 warm, 1.30 tropical
  const occupants = Math.max(1, inputs.occupants || 2);
  const sunExposure = inputs.sunExposure || 1.0; // 0.9 shade, 1.0 normal, 1.15 heavy sun
  const insulationFactor = inputs.insulationFactor || 1.0; // 0.9 modern, 1.0 standard, 1.2 poor

  const roomArea = length * width;
  const roomVolume = roomArea * height;

  // Base rule of thumb: ~350-400 BTU per m² adjusted for volume, insulation, occupants, solar load
  const baseBTU = roomArea * 360 * climateMultiplier * sunExposure * insulationFactor;
  const occupantBTU = (occupants > 2 ? (occupants - 2) : 0) * 600;
  const ceilingHeightCorrection = height > 2.5 ? (height - 2.5) * roomArea * 60 : 0;
  
  const rawBTU = baseBTU + occupantBTU + ceilingHeightCorrection;
  // Round to standard HVAC nominal capacity tiers (9000, 12000, 18000, 24000, 30000, 36000, etc.)
  const recommendedBTU = Math.max(7000, Math.ceil(rawBTU / 1000) * 1000);
  const tons = recommendedBTU / 12000;
  const coolingKW = recommendedBTU * 0.000293071;

  const primaryResult: ResultItem = {
    id: 'btu',
    label: 'Recommended Cooling Capacity',
    value: recommendedBTU,
    formatted: `${formatNumber(recommendedBTU, 0)} BTU/h`,
    unit: 'BTU/h',
    isPrimary: true,
    highlight: 'emerald',
    description: `Approx ${formatNumber(tons, 2)} Tons (${formatNumber(coolingKW, 2)} kW electrical thermal power).`,
  };

  const secondaryResults: ResultItem[] = [
    {
      id: 'tons',
      label: 'Refrigeration Tonnage',
      value: tons,
      formatted: `${formatNumber(tons, 2)} Tons`,
      unit: 'Tons',
      highlight: 'emerald',
      description: `1 Ton = 12,000 BTU/h nominal rating.`,
    },
    {
      id: 'volume',
      label: 'Total Air Volume',
      value: roomVolume,
      formatted: `${formatNumber(roomVolume, 1)} m³`,
      unit: 'm³',
      highlight: 'neutral',
      description: `${formatNumber(roomArea, 1)} m² floor span × ${height}m ceiling height.`,
    },
    {
      id: 'coolingKW',
      label: 'Output Power Equivalent',
      value: coolingKW,
      formatted: `${formatNumber(coolingKW, 2)} kW`,
      unit: 'kW',
      highlight: 'neutral',
      description: `Thermal cooling capacity in metric kilowatts.`,
    },
    {
      id: 'disclaimer',
      label: 'Engineering Verification',
      value: 'Required',
      formatted: 'Manual J Required',
      unit: '',
      highlight: 'amber',
      description: `Planning estimate only. Complex ducting, window glazing U-values, and equipment loads require certified HVAC engineering verification.`,
    },
  ];

  const summarySteps: CalculationSummaryStep[] = [
    { label: 'Enclosed Room Volume', formula: `${length}m × ${width}m × ${height}m`, value: `${formatNumber(roomVolume, 1)} m³` },
    { label: 'Thermal Base Load', formula: `${formatNumber(roomArea, 1)} m² × 360 × ${climateMultiplier} × ${sunExposure}`, value: `${formatNumber(baseBTU, 0)} BTU/h` },
    { label: 'Occupant & Height Offsets', formula: `+${formatNumber(occupantBTU, 0)} BTU (occupants) +${formatNumber(ceilingHeightCorrection, 0)} BTU (volume)`, value: `${formatNumber(rawBTU, 0)} BTU/h` },
    { label: 'Commercial Tier Selection', formula: `Nearest standard capacity rounded`, value: `${formatNumber(recommendedBTU, 0)} BTU/h (${formatNumber(tons, 2)} Tons)` },
  ];

  return { primaryResult, secondaryResults, summarySteps };
};

// 11. Mortgage Amortization & PITI Calculator
export const calculateMortgagePITI = (inputs: Record<string, number>) => {
  const purchasePrice = Math.max(1000, inputs.purchasePrice || 450000);
  const downPayment = Math.max(0, Math.min(purchasePrice, inputs.downPayment || 90000));
  const interestRate = Math.max(0.01, inputs.interestRate || 6.5); // %
  const loanTermYears = Math.max(1, inputs.loanTerm || 30);
  const propertyTaxPct = Math.max(0, inputs.propertyTaxRate || 1.2); // % per year
  const annualInsurance = Math.max(0, inputs.annualInsurance || 1400);
  const monthlyHOA = Math.max(0, inputs.monthlyHOA || 150);

  const loanAmount = Math.max(0, purchasePrice - downPayment);
  const monthlyRate = (interestRate / 100) / 12;
  const totalMonths = loanTermYears * 12;

  let monthlyPrincipalInterest = 0;
  if (loanAmount > 0) {
    if (monthlyRate > 0) {
      monthlyPrincipalInterest = (loanAmount * (monthlyRate * Math.pow(1 + monthlyRate, totalMonths))) / (Math.pow(1 + monthlyRate, totalMonths) - 1);
    } else {
      monthlyPrincipalInterest = loanAmount / totalMonths;
    }
  }

  const monthlyPropertyTax = (purchasePrice * (propertyTaxPct / 100)) / 12;
  const monthlyInsurance = annualInsurance / 12;
  const monthlyPITI = monthlyPrincipalInterest + monthlyPropertyTax + monthlyInsurance + monthlyHOA;
  const totalLoanRepayment = monthlyPrincipalInterest * totalMonths;
  const totalInterest = Math.max(0, totalLoanRepayment - loanAmount);
  const ltvRatio = (loanAmount / purchasePrice) * 100;

  // Generate full 360 / n-months amortization schedule
  const amortizationSchedule: AmortizationRow[] = [];
  let remainingBalance = loanAmount;
  let accumulatedInterest = 0;

  for (let m = 1; m <= totalMonths; m++) {
    const interestPayment = remainingBalance * monthlyRate;
    const principalPayment = Math.min(remainingBalance, monthlyPrincipalInterest - interestPayment);
    remainingBalance = Math.max(0, remainingBalance - principalPayment);
    accumulatedInterest += interestPayment;

    amortizationSchedule.push({
      month: m,
      payment: monthlyPrincipalInterest,
      principal: principalPayment,
      interest: interestPayment,
      totalInterest: accumulatedInterest,
      balance: remainingBalance,
    });
  }

  const primaryResult: ResultItem = {
    id: 'piti',
    label: 'Total Monthly PITI Payment',
    value: monthlyPITI,
    formatted: formatCurrencyExact(monthlyPITI),
    unit: '/month',
    isPrimary: true,
    highlight: 'emerald',
    description: `Principal, Interest, Property Tax, Homeowners Insurance, and HOA dues.`,
  };

  const secondaryResults: ResultItem[] = [
    {
      id: 'pi',
      label: 'Principal & Interest (P&I)',
      value: monthlyPrincipalInterest,
      formatted: formatCurrencyExact(monthlyPrincipalInterest),
      unit: '/mo',
      highlight: 'emerald',
      description: `${loanTermYears}-year fixed amortization @ ${interestRate.toFixed(2)}% APR.`,
    },
    {
      id: 'loan',
      label: 'Total Loan Amount',
      value: loanAmount,
      formatted: formatCurrency(loanAmount),
      unit: '',
      highlight: 'neutral',
      description: `${(100 - ltvRatio).toFixed(1)}% down payment (${formatCurrency(downPayment)}). LTV: ${ltvRatio.toFixed(1)}%.`,
    },
    {
      id: 'tax',
      label: 'Monthly Property Tax',
      value: monthlyPropertyTax,
      formatted: formatCurrencyExact(monthlyPropertyTax),
      unit: '/mo',
      highlight: 'neutral',
      description: `Based on ${propertyTaxPct.toFixed(2)}% annual assessed rate (${formatCurrency(purchasePrice * propertyTaxPct / 100)}/yr).`,
    },
    {
      id: 'insurance',
      label: 'Monthly Insurance & HOA',
      value: monthlyInsurance + monthlyHOA,
      formatted: formatCurrencyExact(monthlyInsurance + monthlyHOA),
      unit: '/mo',
      highlight: 'neutral',
      description: `Insurance: ${formatCurrencyExact(monthlyInsurance)}/mo | HOA: ${formatCurrencyExact(monthlyHOA)}/mo.`,
    },
    {
      id: 'totalInterest',
      label: 'Total Lifetime Interest',
      value: totalInterest,
      formatted: formatCurrency(totalInterest),
      unit: '',
      highlight: 'amber',
      description: `Total amount paid over ${loanTermYears} years: ${formatCurrency(totalLoanRepayment + downPayment)}.`,
    },
  ];

  const summarySteps: CalculationSummaryStep[] = [
    { label: 'Mortgage Financed', formula: `${formatCurrency(purchasePrice)} - ${formatCurrency(downPayment)}`, value: formatCurrency(loanAmount) },
    { label: 'Monthly Debt Service (P&I)', formula: `Amortized formula (${interestRate}% over ${loanTermYears} yrs)`, value: formatCurrencyExact(monthlyPrincipalInterest) },
    { label: 'Monthly Escrow (Taxes & Ins)', formula: `${formatCurrencyExact(monthlyPropertyTax)} (Tax) + ${formatCurrencyExact(monthlyInsurance)} (Ins) + ${formatCurrencyExact(monthlyHOA)} (HOA)`, value: formatCurrencyExact(monthlyPropertyTax + monthlyInsurance + monthlyHOA) },
    { label: 'Total Monthly Outflow', formula: `P&I + Escrow Items`, value: formatCurrencyExact(monthlyPITI) },
  ];

  return { primaryResult, secondaryResults, summarySteps, amortizationSchedule };
};

// 12. Rental Yield, Cap Rate & ROI Estimator
export const calculateRentalYield = (inputs: Record<string, number>) => {
  const purchasePrice = Math.max(1000, inputs.purchasePrice || 360000);
  const downPayment = Math.max(1000, inputs.downPayment || 72000);
  const monthlyRent = Math.max(0, inputs.monthlyRent || 2500);
  const vacancyPct = Math.max(0, inputs.vacancyPct || 5);
  const annualOpex = Math.max(0, inputs.annualOpex || 5800);
  const appreciationPct = Math.max(0, inputs.appreciationPct || 3.5);

  const annualGrossRent = monthlyRent * 12;
  const vacancyAllowance = annualGrossRent * (vacancyPct / 100);
  const effectiveGrossIncome = annualGrossRent - vacancyAllowance;
  const noi = effectiveGrossIncome - annualOpex;
  
  const grossYield = purchasePrice > 0 ? (annualGrossRent / purchasePrice) * 100 : 0;
  const netYield = purchasePrice > 0 ? (noi / purchasePrice) * 100 : 0;
  const capRate = netYield; // Cap rate is NOI / Purchase Price
  
  // Approximate Cash-on-Cash ROI proxy: assuming 80% LTV financed at 6.5% standard
  const loanAmount = Math.max(0, purchasePrice - downPayment);
  const annualDebtService = loanAmount > 0 ? loanAmount * 0.0758 : 0; // ~6.5% 30yr rate constant
  const annualCashFlow = noi - annualDebtService;
  const cashOnCashROI = downPayment > 0 ? (annualCashFlow / downPayment) * 100 : 0;
  
  const annualAppreciation = purchasePrice * (appreciationPct / 100);

  const primaryResult: ResultItem = {
    id: 'capRate',
    label: 'Capitalization Rate (Cap Rate)',
    value: capRate,
    formatted: formatPercent(capRate, 2),
    unit: '%',
    isPrimary: true,
    highlight: 'emerald',
    description: `Net Operating Income of ${formatCurrency(noi)} / Purchase Price of ${formatCurrency(purchasePrice)}.`,
  };

  const secondaryResults: ResultItem[] = [
    {
      id: 'noi',
      label: 'Net Operating Income (NOI)',
      value: noi,
      formatted: formatCurrency(noi),
      unit: '/year',
      highlight: 'emerald',
      description: `Gross rent minus ${vacancyPct}% vacancy allowance (${formatCurrency(vacancyAllowance)}) and opex.`,
    },
    {
      id: 'grossYield',
      label: 'Gross Rental Yield',
      value: grossYield,
      formatted: formatPercent(grossYield, 2),
      unit: '%',
      highlight: 'neutral',
      description: `Annual gross rent of ${formatCurrency(annualGrossRent)} divided by asset cost.`,
    },
    {
      id: 'cashOnCash',
      label: 'Cash-on-Cash Return (Est)',
      value: cashOnCashROI,
      formatted: formatPercent(cashOnCashROI, 2),
      unit: '%',
      highlight: cashOnCashROI >= 0 ? 'emerald' : 'amber',
      description: `Annual net cash flow (${formatCurrency(annualCashFlow)}) divided by ${formatCurrency(downPayment)} initial equity.`,
    },
    {
      id: 'appreciation',
      label: 'Projected Annual Capital Growth',
      value: annualAppreciation,
      formatted: formatCurrency(annualAppreciation),
      unit: '/year',
      highlight: 'neutral',
      description: `Based on ${appreciationPct.toFixed(1)}% annual property value appreciation.`,
    },
    {
      id: 'grossRent',
      label: 'Annual Gross Rental Income',
      value: annualGrossRent,
      formatted: formatCurrency(annualGrossRent),
      unit: '/year',
      highlight: 'neutral',
      description: `${formatCurrency(monthlyRent)}/month potential gross revenue.`,
    },
  ];

  const summarySteps: CalculationSummaryStep[] = [
    { label: 'Gross Annual Rent', formula: `${formatCurrency(monthlyRent)} × 12 months`, value: formatCurrency(annualGrossRent) },
    { label: 'Effective Gross Income', formula: `${formatCurrency(annualGrossRent)} - ${vacancyPct}% Vacancy (${formatCurrency(vacancyAllowance)})`, value: formatCurrency(effectiveGrossIncome) },
    { label: 'Net Operating Income (NOI)', formula: `${formatCurrency(effectiveGrossIncome)} - ${formatCurrency(annualOpex)} (Opex)`, value: formatCurrency(noi) },
    { label: 'Unleveraged Cap Rate', formula: `(${formatCurrency(noi)} ÷ ${formatCurrency(purchasePrice)}) × 100`, value: formatPercent(capRate, 2) },
  ];

  return { primaryResult, secondaryResults, summarySteps };
};

// 13. Home Affordability & Maximum Purchase Calculator
export const calculateAffordability = (inputs: Record<string, number>) => {
  const grossIncome = Math.max(1000, inputs.grossAnnualIncome || 115000);
  const monthlyDebts = Math.max(0, inputs.monthlyDebts || 450);
  const interestRate = Math.max(0.1, inputs.interestRate || 6.5);
  const loanTermYears = Math.max(5, inputs.loanTerm || 30);
  const downPayment = Math.max(0, inputs.downPayment || 65000);
  const propertyTaxPct = Math.max(0, inputs.propertyTaxRate || 1.2);
  const annualInsurance = Math.max(0, inputs.annualInsurance || 1350);
  const monthlyHOA = Math.max(0, inputs.monthlyHOA || 100);

  const monthlyGrossIncome = grossIncome / 12;
  
  // 28% Front-end ceiling (Housing only)
  const housingCeiling28 = monthlyGrossIncome * 0.28;
  
  // 36% Back-end ceiling (Housing + existing debt)
  const totalDebtCeiling36 = monthlyGrossIncome * 0.36;
  const housingCeiling36 = Math.max(0, totalDebtCeiling36 - monthlyDebts);
  
  // Maximum allowable monthly housing payment under strict conventional underwriting
  const maxHousingPayment = Math.min(housingCeiling28, housingCeiling36);
  
  // Monthly non-loan housing obligations
  const fixedMonthlyInsurance = annualInsurance / 12;
  const fixedMonthlyHOA = monthlyHOA;
  
  // Available budget for P&I + Property Tax
  const monthlyRate = (interestRate / 100) / 12;
  const totalMonths = loanTermYears * 12;
  
  // P&I factor per dollar of loan
  const piFactor = (monthlyRate * Math.pow(1 + monthlyRate, totalMonths)) / (Math.pow(1 + monthlyRate, totalMonths) - 1);
  
  // Solve for Max Purchase Price:
  // MaxHousingPayment = (Price - DownPayment) * piFactor + (Price * TaxRate / 12) + Insurance/12 + HOA
  // MaxHousingPayment - Insurance/12 - HOA + DownPayment * piFactor = Price * (piFactor + TaxRate / 12)
  const availableBudget = maxHousingPayment - fixedMonthlyInsurance - fixedMonthlyHOA;
  
  let maxPurchasePrice = 0;
  let maxLoan = 0;
  
  const taxFactor = (propertyTaxPct / 100) / 12;
  if (availableBudget > 0 && (piFactor + taxFactor) > 0) {
    maxPurchasePrice = (availableBudget + downPayment * piFactor) / (piFactor + taxFactor);
    maxPurchasePrice = Math.max(0, maxPurchasePrice);
    maxLoan = Math.max(0, maxPurchasePrice - downPayment);
  }

  const primaryResult: ResultItem = {
    id: 'maxPurchase',
    label: 'Estimated Maximum Purchase Price',
    value: maxPurchasePrice,
    formatted: formatCurrency(maxPurchasePrice),
    unit: '',
    isPrimary: true,
    highlight: 'emerald',
    description: `Based on 28/36 underwriting standards with ${formatCurrency(downPayment)} down payment.`,
  };

  const secondaryResults: ResultItem[] = [
    {
      id: 'maxLoan',
      label: 'Estimated Maximum Mortgage Loan',
      value: maxLoan,
      formatted: formatCurrency(maxLoan),
      unit: '',
      highlight: 'emerald',
      description: `${loanTermYears}-year term @ ${interestRate.toFixed(2)}% interest rate.`,
    },
    {
      id: 'maxPayment',
      label: 'Maximum Allowable Monthly Payment',
      value: maxHousingPayment,
      formatted: formatCurrencyExact(maxHousingPayment),
      unit: '/month',
      highlight: 'neutral',
      description: `Constrained by the ${housingCeiling28 < housingCeiling36 ? '28% Front-End' : '36% Back-End Debt'} ceiling rule.`,
    },
    {
      id: 'frontEnd',
      label: '28% Front-End Housing Cap',
      value: housingCeiling28,
      formatted: formatCurrencyExact(housingCeiling28),
      unit: '/mo',
      highlight: 'neutral',
      description: `28% of gross monthly income (${formatCurrencyExact(monthlyGrossIncome)}).`,
    },
    {
      id: 'backEnd',
      label: '36% Back-End Debt Cap',
      value: housingCeiling36,
      formatted: formatCurrencyExact(housingCeiling36),
      unit: '/mo',
      highlight: 'neutral',
      description: `36% limit (${formatCurrencyExact(totalDebtCeiling36)}) minus ${formatCurrencyExact(monthlyDebts)} existing debt.`,
    },
    {
      id: 'disclaimer',
      label: 'Underwriting Advisory',
      value: 'Estimate Only',
      formatted: 'Planning Estimate',
      unit: '',
      highlight: 'amber',
      description: `Not a pre-approval. Actual loan limits depend on credit score, DTI tolerances, PMI requirements, and lender policies.`,
    },
  ];

  const summarySteps: CalculationSummaryStep[] = [
    { label: 'Gross Monthly Income', formula: `${formatCurrency(grossIncome)} ÷ 12`, value: formatCurrencyExact(monthlyGrossIncome) },
    { label: '28% Housing Ceiling', formula: `${formatCurrencyExact(monthlyGrossIncome)} × 0.28`, value: formatCurrencyExact(housingCeiling28) },
    { label: '36% Debt Ceiling (Net)', formula: `(${formatCurrencyExact(monthlyGrossIncome)} × 0.36) - ${formatCurrencyExact(monthlyDebts)}`, value: formatCurrencyExact(housingCeiling36) },
    { label: 'Binding Housing Payment', formula: `Min(${formatCurrencyExact(housingCeiling28)}, ${formatCurrencyExact(housingCeiling36)})`, value: formatCurrencyExact(maxHousingPayment) },
  ];

  return { primaryResult, secondaryResults, summarySteps };
};

// 14. Real Estate Closing Costs & Notary Estimator
export const calculateClosingCosts = (inputs: Record<string, number>) => {
  const propertyPrice = Math.max(1000, inputs.propertyPrice || 420000);
  const transferTaxPct = Math.max(0, inputs.transferTaxPct || 3.5); // 3.5% default assumption
  const titleClosingPct = Math.max(0, inputs.titleClosingPct || 0.75); // %
  const notaryLegalPct = Math.max(0, inputs.notaryLegalPct || 1.10); // %
  const otherClosingPct = Math.max(0, inputs.otherClosingPct || 0.65); // %
  const downPayment = Math.max(0, inputs.downPayment || 84000);

  const transferTax = propertyPrice * (transferTaxPct / 100);
  const titleClosing = propertyPrice * (titleClosingPct / 100);
  const notaryLegal = propertyPrice * (notaryLegalPct / 100);
  const otherCosts = propertyPrice * (otherClosingPct / 100);

  const totalClosingCosts = transferTax + titleClosing + notaryLegal + otherCosts;
  const closingCostPct = propertyPrice > 0 ? (totalClosingCosts / propertyPrice) * 100 : 0;
  const totalCashRequired = downPayment + totalClosingCosts;

  const primaryResult: ResultItem = {
    id: 'totalClosing',
    label: 'Total Estimated Closing Costs',
    value: totalClosingCosts,
    formatted: formatCurrency(totalClosingCosts),
    unit: '',
    isPrimary: true,
    highlight: 'emerald',
    description: `Equals ${closingCostPct.toFixed(2)}% of the purchase price (${formatCurrency(propertyPrice)}).`,
  };

  const secondaryResults: ResultItem[] = [
    {
      id: 'cashRequired',
      label: 'Total Cash Required to Close',
      value: totalCashRequired,
      formatted: formatCurrency(totalCashRequired),
      unit: '',
      highlight: 'emerald',
      description: `Includes ${formatCurrency(downPayment)} down payment + ${formatCurrency(totalClosingCosts)} closing fees.`,
    },
    {
      id: 'transferTax',
      label: `Transfer Tax & Stamp Duty (${transferTaxPct.toFixed(1)}%)`,
      value: transferTax,
      formatted: formatCurrency(transferTax),
      unit: '',
      highlight: 'neutral',
      description: `Government conveyance and land registry stamp tax.`,
    },
    {
      id: 'notaryLegal',
      label: `Notary & Conveyance Legal (${notaryLegalPct.toFixed(2)}%)`,
      value: notaryLegal,
      formatted: formatCurrency(notaryLegal),
      unit: '',
      highlight: 'neutral',
      description: `Notary public fee schedule, deed execution, and attorney review.`,
    },
    {
      id: 'titleClosing',
      label: `Title Search & Settlement (${titleClosingPct.toFixed(2)}%)`,
      value: titleClosing,
      formatted: formatCurrency(titleClosing),
      unit: '',
      highlight: 'neutral',
      description: `Title insurance policy and settlement disbursement charges.`,
    },
    {
      id: 'other',
      label: `Recording & Admin Fees (${otherClosingPct.toFixed(2)}%)`,
      value: otherCosts,
      formatted: formatCurrency(otherCosts),
      unit: '',
      highlight: 'neutral',
      description: `Municipal recording, appraisal, survey, and courier fees.`,
    },
    {
      id: 'disclaimer',
      label: 'Jurisdictional Notice',
      value: 'Variable',
      formatted: 'Regional Variation',
      unit: '',
      highlight: 'amber',
      description: `Transfer taxes and notary tariffs vary significantly across countries, states, and municipalities. The 3.5% transfer tax assumption is a baseline estimate.`,
    },
  ];

  const summarySteps: CalculationSummaryStep[] = [
    { label: 'Government Transfer Tax', formula: `${formatCurrency(propertyPrice)} × ${transferTaxPct.toFixed(2)}%`, value: formatCurrency(transferTax) },
    { label: 'Notary & Legal Execution', formula: `${formatCurrency(propertyPrice)} × ${notaryLegalPct.toFixed(2)}%`, value: formatCurrency(notaryLegal) },
    { label: 'Title & Settlement Services', formula: `${formatCurrency(propertyPrice)} × ${titleClosingPct.toFixed(2)}%`, value: formatCurrency(titleClosing) },
    { label: 'Total Transaction Fees', formula: `Sum of all closing lines`, value: formatCurrency(totalClosingCosts) },
  ];

  return { primaryResult, secondaryResults, summarySteps };
};

// 15. Wallpaper Roll & Pattern Calculator
export const calculateWallpaper = (inputs: Record<string, number>) => {
  const wallWidth = Math.max(0.1, inputs.wallWidth || 4.8);
  const wallHeight = Math.max(0.5, inputs.wallHeight || 2.6);
  const rollWidthCm = Math.max(10, inputs.rollWidth || 53); // cm (standard 53cm)
  const rollLengthM = Math.max(1, inputs.rollLength || 10.05); // m (standard 10.05m)
  const wastage = Math.max(0, inputs.wastagePct || 10);
  const patternRepeatCm = Math.max(0, inputs.patternRepeat || 32); // cm (0 for random/plain match)

  const rollWidthM = rollWidthCm / 100;
  const patternRepeatM = patternRepeatCm / 100;
  const trimAllowanceM = 0.10; // 10cm top/bottom trimming

  // Pattern adjusted drop length
  let dropLengthM = wallHeight + trimAllowanceM;
  if (patternRepeatM > 0) {
    const repeatsNeeded = Math.ceil(dropLengthM / patternRepeatM);
    dropLengthM = repeatsNeeded * patternRepeatM;
  }

  // Number of vertical drops across wall
  const dropsRequired = Math.ceil(wallWidth / rollWidthM);
  
  // Usable drops per single roll
  const dropsPerRoll = Math.max(1, Math.floor(rollLengthM / dropLengthM));
  
  // Base rolls required
  const baseRolls = Math.ceil(dropsRequired / dropsPerRoll);
  const wastageFactor = 1 + wastage / 100;
  const totalRolls = Math.ceil(baseRolls * wastageFactor);
  
  const totalWallArea = wallWidth * wallHeight;
  const totalPurchasedArea = totalRolls * (rollWidthM * rollLengthM);

  const primaryResult: ResultItem = {
    id: 'rolls',
    label: 'Wallpaper Rolls Required',
    value: totalRolls,
    formatted: `${totalRolls} rolls`,
    unit: 'rolls',
    isPrimary: true,
    highlight: 'emerald',
    description: `Based on standard ${rollWidthCm}cm × ${rollLengthM}m rolls with ${patternRepeatCm}cm pattern match repeat.`,
  };

  const secondaryResults: ResultItem[] = [
    {
      id: 'drops',
      label: 'Vertical Drops Required',
      value: dropsRequired,
      formatted: `${dropsRequired} drops`,
      unit: 'drops',
      highlight: 'emerald',
      description: `Across ${wallWidth}m total wall width (@ ${rollWidthCm}cm strip width).`,
    },
    {
      id: 'dropLength',
      label: 'Pattern-Adjusted Drop Length',
      value: dropLengthM,
      formatted: `${formatNumber(dropLengthM, 2)} meters`,
      unit: 'm',
      highlight: 'neutral',
      description: `Wall height (${wallHeight}m) aligned to ${patternRepeatCm}cm vertical repeat increments + trimming margin.`,
    },
    {
      id: 'dropsPerRoll',
      label: 'Usable Drops Per Roll',
      value: dropsPerRoll,
      formatted: `${dropsPerRoll} drops/roll`,
      unit: 'drops',
      highlight: 'neutral',
      description: `Yields ${dropsPerRoll} full-height strips from each ${rollLengthM}m roll.`,
    },
    {
      id: 'coverage',
      label: 'Net Wall Surface Area',
      value: totalWallArea,
      formatted: `${formatNumber(totalWallArea, 2)} m²`,
      unit: 'm²',
      highlight: 'neutral',
      description: `Purchased roll coverage: ${formatNumber(totalPurchasedArea, 2)} m².`,
    },
    {
      id: 'paste',
      label: 'Wallpaper Paste / Adhesive',
      value: Math.ceil(totalRolls * 0.5),
      formatted: `${Math.ceil(totalRolls * 0.5)} kg powder`,
      unit: 'kg',
      highlight: 'amber',
      description: `Flake powder mix (~250g box per 3-4 standard rolls).`,
    },
  ];

  const summarySteps: CalculationSummaryStep[] = [
    { label: 'Drops Across Wall', formula: `${wallWidth}m width ÷ ${(rollWidthM).toFixed(2)}m roll width`, value: `${dropsRequired} vertical drops` },
    { label: 'Adjusted Drop Length', formula: `Ceil((${wallHeight}m + 0.10m) ÷ ${(patternRepeatM).toFixed(2)}m) × ${(patternRepeatM).toFixed(2)}m`, value: `${formatNumber(dropLengthM, 2)} meters` },
    { label: 'Yield Per Roll', formula: `Floor(${rollLengthM}m ÷ ${formatNumber(dropLengthM, 2)}m)`, value: `${dropsPerRoll} usable drops/roll` },
    { label: 'Factored Rolls', formula: `(${dropsRequired} drops ÷ ${dropsPerRoll} yield) × ${wastageFactor.toFixed(2)}`, value: `${totalRolls} rolls` },
  ];

  return { primaryResult, secondaryResults, summarySteps };
};
