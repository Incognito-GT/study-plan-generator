import { generateText } from 'ai'

const generateChapterContent = async (subject: string, chapterName: string) => {
  const contentDatabase: Record<string, Record<string, any>> = {
    'ap calculus bc': {
      'chapter 1': {
        notes: 'Review limits, continuity, and asymptotic behavior. Understanding limits is foundational for derivatives and integrals in BC Calculus.',
        keyPoints: [
          'Limit definition: lim(x→a) f(x) = L means for every ε > 0, there exists δ > 0 such that |x - a| < δ implies |f(x) - L| < ε',
          'Left-hand limit: lim(x→a⁻) f(x) and Right-hand limit: lim(x→a⁺) f(x) must be equal for limit to exist',
          'Continuity at x = a: f must be defined at a, lim(x→a) f(x) exists, and lim(x→a) f(x) = f(a)',
          'Discontinuities: Removable (hole), Jump (left ≠ right limit), Infinite (vertical asymptote)',
          'Vertical asymptotes: Where denominator = 0 and numerator ≠ 0',
          'Horizontal asymptotes: lim(x→∞) f(x) = L, found by comparing degrees of numerator and denominator',
          'Oblique asymptotes: When degree(numerator) = degree(denominator) + 1',
          'Squeeze Theorem: If g(x) ≤ f(x) ≤ h(x) and lim g(x) = lim h(x) = L, then lim f(x) = L',
          'Special limit: lim(x→0) sin(x)/x = 1, lim(x→0) (cos(x) - 1)/x = 0',
          'Limit laws: Sum, difference, product, quotient, power, and root of limits',
        ],
        resources: [
          { title: 'Khan Academy - Calculus BC Limits', url: 'https://www.khanacademy.org/math/ap-calculus-bc' },
          { title: 'Paul\'s Online Math Notes - Limits', url: 'https://tutorial.math.lamar.edu/Classes/CalcI/Limits.aspx' },
          { title: 'Wikipedia - Limit of a Function', url: 'https://en.wikipedia.org/wiki/Limit_of_a_function' },
        ],
      },
      'chapter 2': {
        notes: 'Master derivatives and differentiation rules. This is crucial for finding rates of change, critical points, and optimization.',
        keyPoints: [
          'Derivative definition: f\'(x) = lim(h→0) [f(x+h) - f(x)]/h = instantaneous rate of change',
          'Power Rule: d/dx(xⁿ) = n·xⁿ⁻¹ and d/dx(√x) = 1/(2√x)',
          'Product Rule: d/dx[f(x)g(x)] = f\'(x)g(x) + f(x)g\'(x)',
          'Quotient Rule: d/dx[f(x)/g(x)] = [f\'(x)g(x) - f(x)g\'(x)]/[g(x)]²',
          'Chain Rule: d/dx[f(g(x))] = f\'(g(x))·g\'(x)',
          'Exponential: d/dx(eˣ) = eˣ, d/dx(aˣ) = aˣ·ln(a)',
          'Logarithmic: d/dx(ln|x|) = 1/x, d/dx(logₐ x) = 1/(x·ln(a))',
          'Trigonometric: d/dx(sin x) = cos x, d/dx(cos x) = -sin x, d/dx(tan x) = sec²x',
          'd/dx(cot x) = -csc²x, d/dx(sec x) = sec(x)tan(x), d/dx(csc x) = -csc(x)cot(x)',
          'Inverse trigonometric: d/dx(sin⁻¹x) = 1/√(1-x²), d/dx(tan⁻¹x) = 1/(1+x²)',
        ],
        resources: [
          { title: 'Khan Academy - Derivatives', url: 'https://www.khanacademy.org/math/ap-calculus-bc/bc-differentiation' },
          { title: 'Paul\'s Online Math Notes - Derivatives', url: 'https://tutorial.math.lamar.edu/Classes/CalcI/Derivatives.aspx' },
          { title: 'Wolfram Alpha Derivative Calculator', url: 'https://www.wolframalpha.com' },
        ],
      },
      'chapter 3': {
        notes: 'Study applications of derivatives including extrema, monotonicity, concavity, and optimization problems.',
        keyPoints: [
          'Critical numbers: Points where f\'(x) = 0 or f\'(x) is undefined',
          'First Derivative Test: If f\'(x) changes from + to -, local maximum; - to +, local minimum',
          'Increasing/Decreasing: f\'(x) > 0 → increasing, f\'(x) < 0 → decreasing',
          'Second derivative: f\'\'(x) measures concavity and acceleration of change',
          'Concavity: f\'\'(x) > 0 → concave up (∪), f\'\'(x) < 0 → concave down (∩)',
          'Inflection points: Where f\'\'(x) = 0 or undefined and changes sign',
          'Second Derivative Test: f\'\'(c) > 0 → local min, f\'\'(c) < 0 → local max',
          'Optimization: Set f\'(x) = 0, find critical numbers, evaluate at endpoints and critical points',
          'Related rates: Implicit differentiation with respect to time, d/dt both sides of equation',
          'Mean Value Theorem: If f is continuous on [a,b] and differentiable on (a,b), ∃c where f\'(c) = [f(b)-f(a)]/(b-a)',
        ],
        resources: [
          { title: 'Khan Academy - Applications of Derivatives', url: 'https://www.khanacademy.org/math/ap-calculus-bc/bc-applications-derivatives' },
          { title: 'Paul\'s Online Math Notes - Applications', url: 'https://tutorial.math.lamar.edu/Classes/CalcI/CriticalPoints.aspx' },
          { title: 'Optimization Problem Solver', url: 'https://www.wolframalpha.com' },
        ],
      },
      'chapter 4': {
        notes: 'Understand antiderivatives and indefinite integrals. This chapter builds the foundation for definite integrals.',
        keyPoints: [
          'Antiderivative: F(x) is antiderivative of f(x) if F\'(x) = f(x)',
          'Indefinite integral: ∫f(x)dx = F(x) + C (C is arbitrary constant)',
          'Power Rule: ∫xⁿdx = xⁿ⁺¹/(n+1) + C, (n ≠ -1)',
          'Special: ∫(1/x)dx = ln|x| + C',
          'Exponential: ∫eˣdx = eˣ + C, ∫aˣdx = aˣ/ln(a) + C',
          'Trigonometric: ∫sin(x)dx = -cos(x) + C, ∫cos(x)dx = sin(x) + C, ∫sec²(x)dx = tan(x) + C',
          '∫csc²(x)dx = -cot(x) + C, ∫sec(x)tan(x)dx = sec(x) + C, ∫csc(x)cot(x)dx = -csc(x) + C',
          'Inverse trig: ∫1/√(1-x²)dx = sin⁻¹(x) + C, ∫1/(1+x²)dx = tan⁻¹(x) + C',
          'Linearity: ∫[f(x) ± g(x)]dx = ∫f(x)dx ± ∫g(x)dx and ∫k·f(x)dx = k∫f(x)dx',
          'Substitution (u-substitution): ∫f(g(x))g\'(x)dx = ∫f(u)du where u = g(x)',
        ],
        resources: [
          { title: 'Khan Academy - Indefinite Integrals', url: 'https://www.khanacademy.org/math/ap-calculus-bc/bc-integration' },
          { title: 'Paul\'s Online Math Notes - Integrals', url: 'https://tutorial.math.lamar.edu/Classes/CalcI/Antiderivatives.aspx' },
        ],
      },
      'chapter 5': {
        notes: 'Study definite integrals and the Fundamental Theorem of Calculus. Learn to calculate areas and accumulated change.',
        keyPoints: [
          'Definite integral: ∫ₐᵇ f(x)dx = lim(n→∞) Σ f(xᵢ*)Δx (Riemann sum)',
          'Fundamental Theorem of Calculus Part 1: If F\'(x) = f(x), then ∫ₐᵇ f(x)dx = F(b) - F(a)',
          'Fundamental Theorem Part 2: d/dx[∫ₐˣ f(t)dt] = f(x)',
          'Properties: ∫ₐᵇ f(x)dx = -∫ᵇₐ f(x)dx, ∫ₐᵃ f(x)dx = 0',
          '∫ₐᶜ f(x)dx = ∫ₐᵇ f(x)dx + ∫ᵇᶜ f(x)dx (additive property)',
          'Area between curves: A = ∫ₐᵇ |f(x) - g(x)|dx',
          'Average value of f on [a,b]: f_avg = (1/(b-a))∫ₐᵇ f(x)dx',
          'U-Substitution for definite integrals: Change limits of integration when substituting',
          'Accumulation function: A(x) = ∫ₐˣ f(t)dt represents accumulated area from a to x',
          'Motion: Position = ∫velocity dt, Displacement = ∫ₐᵇ v(t)dt, Distance = ∫ₐᵇ |v(t)|dt',
        ],
        resources: [
          { title: 'Khan Academy - Definite Integrals', url: 'https://www.khanacademy.org/math/ap-calculus-bc/bc-integration' },
          { title: 'Paul\'s Online Math Notes - FTC', url: 'https://tutorial.math.lamar.edu/Classes/CalcI/FundThmCalc.aspx' },
        ],
      },
      'chapter 6': {
        notes: 'Master advanced integration techniques including integration by parts, partial fractions, and trigonometric substitution.',
        keyPoints: [
          'Integration by parts: ∫u·dv = u·v - ∫v·du (use LIATE rule for choosing u)',
          'LIATE: Logarithmic, Inverse trig, Algebraic, Trigonometric, Exponential (priority for u)',
          'Partial fractions: Break (P(x))/(Q(x)) into simpler fractions for easier integration',
          'Distinct linear factors: A/(x-a) + B/(x-b)',
          'Repeated linear factors: A/(x-a) + B/(x-a)² + C/(x-a)³',
          'Irreducible quadratic: (Ax+B)/(x²+bx+c)',
          'Trigonometric substitution: x = a·sin(θ) for √(a²-x²), x = a·tan(θ) for √(a²+x²), x = a·sec(θ) for √(x²-a²)',
          'Improper integrals: ∫ₐ^∞ f(x)dx = lim(b→∞) ∫ₐᵇ f(x)dx',
          'Convergence/divergence of improper integrals using limits',
          'Numerical integration: Trapezoidal rule, Simpson\'s rule for approximation',
        ],
        resources: [
          { title: 'Khan Academy - Integration by Parts', url: 'https://www.khanacademy.org/math/ap-calculus-bc/bc-integration' },
          { title: 'Paul\'s Online Math Notes - Advanced Integration', url: 'https://tutorial.math.lamar.edu/Classes/CalcII/IntegrationByParts.aspx' },
        ],
      },
      'chapter 7': {
        notes: 'Study differential equations, slope fields, and exponential growth/decay models.',
        keyPoints: [
          'Differential equation: Equation involving derivatives, e.g., dy/dx = f(x, y)',
          'Separable differential equations: dy/dx = f(x)g(y) → ∫(1/g(y))dy = ∫f(x)dx',
          'General solution: Family of curves satisfying the differential equation',
          'Particular solution: Specific curve passing through initial condition (x₀, y₀)',
          'Exponential growth/decay: dy/dt = ky → y = y₀·e^(kt)',
          'Newton\'s Law of Cooling: dT/dt = -k(T - Tₐ) where Tₐ is ambient temperature',
          'Logistic growth: dy/dt = k·y(L - y) → S-shaped curve with carrying capacity L',
          'Slope field (direction field): Visual representation of solutions using small line segments',
          'Euler\'s method: Numerical approximation using yₙ₊₁ = yₙ + f(xₙ, yₙ)·Δx',
          'Existence and uniqueness theorem: Solutions exist when f and ∂f/∂y are continuous',
        ],
        resources: [
          { title: 'Khan Academy - Differential Equations', url: 'https://www.khanacademy.org/math/ap-calculus-bc/bc-differential-equations' },
          { title: 'Paul\'s Online Math Notes - Differential Equations', url: 'https://tutorial.math.lamar.edu/Classes/DE/DE.aspx' },
        ],
      },
      'chapter 8': {
        notes: 'Understand infinite series, convergence tests, Taylor and Maclaurin series for function approximation.',
        keyPoints: [
          'Infinite series: Σ(n=1 to ∞) aₙ = a₁ + a₂ + a₃ + ...',
          'Partial sum: Sₙ = a₁ + a₂ + ... + aₙ',
          'Convergence: Series converges if lim(n→∞) Sₙ exists and is finite',
          'Divergence: Series diverges if sum = ∞ or limit doesn\'t exist',
          'Geometric series: Σ arⁿ converges to a/(1-r) if |r| < 1',
          'p-series: Σ 1/nᵖ converges if p > 1, diverges if p ≤ 1',
          'nth Term Test: If lim(n→∞) aₙ ≠ 0, series diverges',
          'Integral Test: Series and integral behave similarly if f is positive, continuous, decreasing',
          'Comparison Tests: Compare to known convergent/divergent series',
          'Ratio Test: Lim(n→∞) |aₙ₊₁/aₙ| < 1 → convergent, > 1 → divergent',
          'Root Test: Lim(n→∞) ⁿ√|aₙ| < 1 → convergent, > 1 → divergent',
          'Alternating Series Test: Σ(-1)ⁿbₙ converges if bₙ > 0, decreasing, lim bₙ = 0',
        ],
        resources: [
          { title: 'Khan Academy - Series and Convergence', url: 'https://www.khanacademy.org/math/ap-calculus-bc/bc-series' },
          { title: 'Paul\'s Online Math Notes - Series', url: 'https://tutorial.math.lamar.edu/Classes/CalcII/Series_Basics.aspx' },
        ],
      },
      'chapter 9': {
        notes: 'Study Taylor and Maclaurin series, power series representations, and radius of convergence.',
        keyPoints: [
          'Taylor series centered at x = a: f(x) = Σ [f⁽ⁿ⁾(a)/n!](x-a)ⁿ',
          'Maclaurin series (special case, a = 0): f(x) = Σ [f⁽ⁿ⁾(0)/n!]xⁿ',
          'eˣ = Σ xⁿ/n! = 1 + x + x²/2! + x³/3! + ...',
          'sin(x) = Σ (-1)ⁿx^(2n+1)/(2n+1)! = x - x³/3! + x⁵/5! - ...',
          'cos(x) = Σ (-1)ⁿx^(2n)/(2n)! = 1 - x²/2! + x⁴/4! - ...',
          '1/(1-x) = Σ xⁿ = 1 + x + x² + ... for |x| < 1',
          'ln(1+x) = Σ (-1)^(n+1)xⁿ/n for |x| ≤ 1 (x ≠ -1)',
          'Radius of convergence (R): Series converges for |x - a| < R',
          'Ratio test to find R: R = lim(n→∞) |aₙ/aₙ₊₁|',
          'Interval of convergence: Test endpoints to determine open (R) or closed [R] interval',
          'Power series operations: Can differentiate and integrate term-by-term within interval of convergence',
        ],
        resources: [
          { title: 'Khan Academy - Taylor Series', url: 'https://www.khanacademy.org/math/ap-calculus-bc/bc-series' },
          { title: 'Paul\'s Online Math Notes - Taylor Series', url: 'https://tutorial.math.lamar.edu/Classes/CalcII/Taylor_Series.aspx' },
        ],
      },
      'chapter 10': {
        notes: 'Explore parametric equations and polar coordinates for describing curves and areas.',
        keyPoints: [
          'Parametric equations: x = f(t), y = g(t) trace out a curve as t varies',
          'dy/dx (parametric): (dy/dx) = (dy/dt)/(dx/dt)',
          'd²y/dx² (parametric): [d/dt(dy/dx)] / (dx/dt)',
          'Arc length (parametric): L = ∫ₐᵇ √[(dx/dt)² + (dy/dt)²] dt',
          'Polar coordinates: x = r·cos(θ), y = r·sin(θ), r² = x² + y², tan(θ) = y/x',
          'Polar curve: r = f(θ) describes curve in polar form',
          'Slope in polar: dy/dx = [r\'·sin(θ) + r·cos(θ)] / [r\'·cos(θ) - r·sin(θ)]',
          'Area in polar: A = (1/2)∫ₐᵇ r² dθ',
          'Conversion: Rectangular ↔ Polar (know both coordinate systems)',
          'Common polar curves: r = a (circle), r = a·cos(θ), r = a·sin(θ) (circles), r = aθ (spiral), r = a(1 + cos θ) (cardioid)',
        ],
        resources: [
          { title: 'Khan Academy - Parametric & Polar', url: 'https://www.khanacademy.org/math/ap-calculus-bc/bc-parametric-equations-polar-coordinates' },
          { title: 'Desmos Graphing - Polar', url: 'https://www.desmos.com/calculator' },
        ],
      },
    },
    'ap calculus ab': {
      'chapter 1': {
        notes: 'Review limits, continuity, and their foundational role in calculus.',
        keyPoints: [
          'Limit definition: lim(x→a) f(x) = L means for every ε > 0, there exists δ > 0 such that |x - a| < δ implies |f(x) - L| < ε',
          'Left-hand limit: lim(x→a⁻) f(x) and Right-hand limit: lim(x→a⁺) f(x)',
          'Continuity at x = a: f(a) defined, lim(x→a) f(x) exists, and lim(x→a) f(x) = f(a)',
          'Intermediate Value Theorem: If f is continuous on [a,b], takes on all values between f(a) and f(b)',
          'Limits at infinity: lim(x→∞) f(x) = L indicates horizontal asymptote',
          'Special limits: lim(x→0) sin(x)/x = 1, lim(x→0) (cos(x) - 1)/x = 0',
          'Limit laws: Sum, difference, product, quotient, power, root',
          'Squeeze Theorem: If g(x) ≤ f(x) ≤ h(x) and lim g(x) = lim h(x) = L, then lim f(x) = L',
        ],
        resources: [
          { title: 'Khan Academy - Calculus AB Limits', url: 'https://www.khanacademy.org/math/ap-calculus-ab' },
          { title: 'Paul\'s Online Math Notes - Limits', url: 'https://tutorial.math.lamar.edu/Classes/CalcI/Limits.aspx' },
        ],
      },
      'chapter 2': {
        notes: 'Master derivatives and differentiation rules for rate of change.',
        keyPoints: [
          'Derivative definition: f\'(x) = lim(h→0) [f(x+h) - f(x)]/h',
          'Power Rule: d/dx(xⁿ) = n·xⁿ⁻¹',
          'Product Rule: d/dx[f(x)g(x)] = f\'(x)g(x) + f(x)g\'(x)',
          'Quotient Rule: d/dx[f(x)/g(x)] = [f\'(x)g(x) - f(x)g\'(x)]/[g(x)]²',
          'Chain Rule: d/dx[f(g(x))] = f\'(g(x))·g\'(x)',
          'd/dx(eˣ) = eˣ, d/dx(ln x) = 1/x',
          'd/dx(sin x) = cos x, d/dx(cos x) = -sin x',
        ],
        resources: [
          { title: 'Khan Academy - Derivatives', url: 'https://www.khanacademy.org/math/ap-calculus-ab/ab-differentiation' },
          { title: 'Paul\'s Online Math Notes - Derivatives', url: 'https://tutorial.math.lamar.edu/Classes/CalcI/Derivatives.aspx' },
        ],
      },
    },
    'ap chemistry': {
      'chapter 1': {
        notes: 'Understanding atomic structure, periodic trends, and electron configuration. Master the organization of elements and their properties.',
        keyPoints: [
          'Atomic structure: Protons (nucleus, positive), Neutrons (nucleus, neutral), Electrons (orbitals, negative)',
          'Atomic number (Z) = number of protons; Mass number (A) = protons + neutrons',
          'Isotopes: Same element, different mass numbers (different neutron counts)',
          'Electron configuration: 1s² 2s² 2p⁶ 3s² 3p⁶ 3d¹⁰ 4s² 4p⁶ 4d¹⁰ 5s² 5p⁶ 4f¹⁴ 5d¹⁰ 6s² 6p⁶ 7s²',
          'Orbital shapes: s (sphere), p (dumbbell), d (cloverleaf), f (complex)',
          'Aufbau Principle: Fill orbitals in order of increasing energy',
          'Pauli Exclusion Principle: Maximum 2 electrons per orbital with opposite spins',
          'Hund\'s Rule: Single electrons fill orbitals before pairing',
          'Periodic trends: Atomic radius increases down group, decreases across period',
          'Ionization energy, electronegativity, and electron affinity increase across period',
        ],
        resources: [
          { title: 'Khan Academy - Atomic Structure', url: 'https://www.khanacademy.org/science/ap-chemistry' },
          { title: 'Wikipedia - Periodic Table', url: 'https://en.wikipedia.org/wiki/Periodic_table' },
        ],
      },
      'chapter 2': {
        notes: 'Study ionic and covalent bonding, Lewis structures, and molecular geometry (VSEPR theory).',
        keyPoints: [
          'Ionic bond: Transfer of electrons between metal and nonmetal, forms cation and anion',
          'Covalent bond: Sharing of electrons between nonmetals, creates molecular compounds',
          'Electronegativity difference > 1.7: Ionic; 0.4-1.7: Polar covalent; < 0.4: Nonpolar covalent',
          'Lewis dot structures: Show valence electrons, use dots around element symbols',
          'Octet Rule: Atoms gain/lose/share electrons to achieve 8 valence electrons (ns²np⁶)',
          'VSEPR Theory: Electron pairs (bonding + lone pairs) repel, predict geometry',
          'Linear: 2 pairs, 180°; Trigonal planar: 3 pairs, 120°; Tetrahedral: 4 pairs, 109.5°',
          'Trigonal pyramidal: 3 bonds + 1 lone pair; Bent: 2 bonds + 2 lone pairs',
          'Polar molecule: Uneven electron distribution and asymmetric geometry',
          'Hydrogen bonding: Strong intermolecular force between H and N, O, or F',
        ],
        resources: [
          { title: 'Khan Academy - Chemical Bonding', url: 'https://www.khanacademy.org/science/ap-chemistry' },
          { title: 'Molecular Geometry Visualizer', url: 'https://www.molymods.com' },
        ],
      },
      'chapter 3': {
        notes: 'Understand stoichiometry, limiting reactants, percent yield, and empirical formulas.',
        keyPoints: [
          'Molar mass: Sum of atomic masses from periodic table (g/mol)',
          'Moles: n = mass/molar mass; particles = moles × Avogadro\'s number (6.022 × 10²³)',
          'Balanced equation coefficients: Show mole ratios between reactants and products',
          'Stoichiometric ratio: Use coefficients to convert between moles of different substances',
          'Limiting reactant: Reactant completely consumed, determines max product amount',
          'Find limiting reactant: Calculate moles of product from each reactant, smallest = limiting',
          'Theoretical yield: Maximum possible product based on limiting reactant',
          'Percent yield = (actual yield / theoretical yield) × 100%',
          'Empirical formula: Simplest whole number ratio of elements (lowest terms)',
          'Molecular formula: Actual subscripts; molecular formula = empirical formula × n',
        ],
        resources: [
          { title: 'Khan Academy - Stoichiometry', url: 'https://www.khanacademy.org/science/ap-chemistry' },
          { title: 'Stoichiometry Calculator', url: 'https://www.wolframalpha.com' },
        ],
      },
    },
    'ap physics 1': {
      'chapter 1': {
        notes: 'Master kinematics and one-dimensional motion with constant acceleration.',
        keyPoints: [
          'Displacement (Δx): Change in position, vector quantity (m)',
          'Velocity (v): v = Δx/Δt (m/s), slope of position-time graph',
          'Acceleration (a): a = Δv/Δt (m/s²), slope of velocity-time graph',
          'v = v₀ + at (velocity from acceleration)',
          'x = x₀ + v₀t + ½at² (position from acceleration)',
          'v² = v₀² + 2a(x - x₀) (velocity squared equation)',
          'Free fall: a = -9.8 m/s² (take downward as negative)',
          'v_avg = (v_initial + v_final)/2 for constant acceleration',
          'Graphs: Position curves, linear velocity, constant acceleration lines',
          'Two-body kinematics: Track multiple objects, set up equations for each',
        ],
        resources: [
          { title: 'Khan Academy - Kinematics', url: 'https://www.khanacademy.org/science/ap-physics-1' },
        ],
      },
      'chapter 2': {
        notes: 'Study Newton\'s Laws of Motion, forces, and free body diagrams.',
        keyPoints: [
          'Newton\'s First Law: Object at rest stays at rest, moving object continues unless acted upon',
          'Newton\'s Second Law: F_net = ma; ΣF = ma (sum of forces)',
          'Newton\'s Third Law: For every action, there is equal and opposite reaction',
          'Force: Measured in Newtons (N), 1 N = 1 kg·m/s²',
          'Weight: W = mg (9.8 N/kg on Earth)',
          'Friction: f_s ≤ μ_s·N (static), f_k = μ_k·N (kinetic)',
          'Normal force: Perpendicular to surface, often equals weight on horizontal surface',
          'Tension: Force in rope/string, same throughout rope (if massless)',
          'Free body diagram: Draw all forces acting on object, label magnitudes and directions',
          'Inclined planes: F_parallel = mg·sin(θ), F_perpendicular = mg·cos(θ)',
        ],
        resources: [
          { title: 'Khan Academy - Forces and Newton\'s Laws', url: 'https://www.khanacademy.org/science/ap-physics-1' },
        ],
      },
    },
    'ap macroeconomics': {
      'chapter 1': {
        notes: 'Introduction to macroeconomics, scarcity, opportunity cost, and economic systems.',
        keyPoints: [
          'Scarcity: Limited resources, unlimited wants force choices',
          'Opportunity cost: What you give up to get something else (next best alternative)',
          'Production Possibilities Frontier (PPF): Graph showing max production combinations',
          'Efficiency: Producing at PPF curve; inefficiency = inside curve',
          'Economic growth: PPF shifts outward (more resources or technology)',
          'Comparative advantage: Can produce with lower opportunity cost',
          'Absolute advantage: Can produce more with same resources',
          'Specialization and trade: Countries specialize in comparative advantage',
          'Types of economic systems: Command, market, mixed',
          'GDP (Gross Domestic Product): Total market value of final goods/services produced',
        ],
        resources: [
          { title: 'Khan Academy - Macroeconomics', url: 'https://www.khanacademy.org/economics-finance-domain/ap-macroeconomics' },
          { title: 'Wikipedia - Macroeconomics', url: 'https://en.wikipedia.org/wiki/Macroeconomics' },
        ],
      },
      'chapter 2': {
        notes: 'Study supply and demand, market equilibrium, elasticity, and price controls.',
        keyPoints: [
          'Law of demand: Higher price → lower quantity demanded (inverse relationship)',
          'Law of supply: Higher price → higher quantity supplied (direct relationship)',
          'Market equilibrium: Q_supplied = Q_demanded, no tendency to change',
          'Shortage: Q_demanded > Q_supplied, causes price to rise',
          'Surplus: Q_supplied > Q_demanded, causes price to fall',
          'Price elasticity of demand (PED): % change in Qd / % change in Price',
          'Elastic: |PED| > 1 (responsive to price), Inelastic: |PED| < 1 (not responsive)',
          'Total revenue test: If elastic, lower price increases total revenue',
          'Income elasticity: Normal good (positive), Inferior good (negative)',
          'Price ceiling: Maximum legal price (creates shortage if binding)',
          'Price floor: Minimum legal price (creates surplus if binding)',
        ],
        resources: [
          { title: 'Khan Academy - Supply, Demand, Elasticity', url: 'https://www.khanacademy.org/economics-finance-domain/ap-macroeconomics' },
        ],
      },
    },
    'ap us history': {
      'chapter 1': {
        notes: 'Native American societies, European exploration, and early colonization (1491-1607).',
        keyPoints: [
          'Native American civilizations: Ancestral Puebloans, Mississippi, Haudenosaunee Confederacy',
          'Columbian Exchange: Transfer of crops, animals, diseases between Old and New World',
          'European motivations: God (religion), gold (wealth), and glory (power)',
          'Mercantilism: European policy - colonies provide raw materials, buy finished goods',
          'Joint-stock companies: Virginia Company founded Jamestown (1607)',
          'Primogeniture: Inheritance law in England - eldest son inherits all',
          'Indentured servitude: Colonists work 4-7 years for passage to America',
          'Bacon\'s Rebellion (1676): Indentured servants and enslaved people revolt against governor',
          'Shift to slavery: Gradual replacement of indentured servants with enslaved Africans',
          'Headright system: Land grants in Virginia and Maryland to encourage settlement',
        ],
        resources: [
          { title: 'Khan Academy - US History', url: 'https://www.khanacademy.org/humanities/us-history' },
          { title: 'Wikipedia - Thirteen Colonies', url: 'https://en.wikipedia.org/wiki/Thirteen_Colonies' },
        ],
      },
      'chapter 2': {
        notes: 'Colonial growth, triangular trade, slavery expansion, and pre-Revolutionary tensions (1607-1750).',
        keyPoints: [
          'Triangular trade: Europe → Africa → Americas → Europe (slavery, molasses, sugar)',
          'Middle Passage: Brutal ship journey from Africa to Americas, 15-20% mortality',
          'Slavery expansion: By 1750, 40% of Southern colonies were enslaved Africans',
          'Plantation system: Large farms producing staple crops (tobacco, rice, indigo)',
          'Slave codes: Laws making slavery hereditary and for life',
          'Colonial economy: North (trade, small farms), South (plantations, slavery)',
          'Navigation Acts: British laws regulating colonial trade, tried to monopolize commerce',
          'Salutary neglect: Britain didn\'t enforce laws strictly, colonies governed themselves',
          'French and Indian War (1754-1763): Britain defeats France, expands territory',
          'Writs of Assistance: British documents allowing unlimited searches in colonies',
        ],
        resources: [
          { title: 'Khan Academy - Colonial America', url: 'https://www.khanacademy.org/humanities/us-history' },
        ],
      },
    },
    'ap statistics': {
      'chapter 1': {
        notes: 'Understand data collection, sampling methods, and experimental design to avoid bias.',
        keyPoints: [
          'Population: Entire group of interest; Sample: Subset of population',
          'Simple random sample: Every individual has equal chance of selection',
          'Stratified random sample: Divide population into strata, randomly sample each',
          'Systematic sampling: Select every kth individual from list',
          'Cluster sampling: Divide population into clusters, randomly select clusters',
          'Convenience sampling: Non-random, can introduce bias',
          'Observational study: Observe without intervention, cannot establish causation',
          'Experiment: Researcher controls independent variable, can establish causation',
          'Control group: Receives no treatment or placebo treatment',
          'Confounding variable: Affects outcome but wasn\'t controlled',
        ],
        resources: [
          { title: 'Khan Academy - AP Statistics', url: 'https://www.khanacademy.org/math/ap-statistics' },
          { title: 'Statistics Concepts', url: 'https://en.wikipedia.org/wiki/Statistics' },
        ],
      },
      'chapter 2': {
        notes: 'Summarize and visualize data using measures of central tendency and spread.',
        keyPoints: [
          'Mean (average): x̄ = Σx / n, affected by outliers',
          'Median: Middle value when ordered, resistant to outliers',
          'Mode: Most frequently occurring value',
          'Range: Max - Min, affected by outliers',
          'Variance: σ² = Σ(x - x̄)² / n, average squared deviation',
          'Standard deviation: σ = √variance, measures spread in same units as data',
          'Five-number summary: Min, Q1, Median, Q3, Max',
          'Interquartile range (IQR): Q3 - Q1, middle 50% of data',
          'Outliers: Values < Q1 - 1.5(IQR) or > Q3 + 1.5(IQR)',
          'Z-score: z = (x - x̄) / σ, standardized position',
        ],
        resources: [
          { title: 'Khan Academy - Statistics Basics', url: 'https://www.khanacademy.org/math/ap-statistics' },
        ],
      },
    },
    'ap microeconomics': {
      'chapter 1': {
        notes: 'Study consumer behavior, utility theory, and demand curves.',
        keyPoints: [
          'Utility: Satisfaction derived from consuming goods/services',
          'Total utility: Sum of satisfaction from all units consumed',
          'Marginal utility: Change in total utility from one more unit, MU = ΔTU/ΔQ',
          'Law of diminishing marginal utility: MU decreases as consumption increases',
          'Demand curve: Shows quantity demanded at each price, slopes downward',
          'Law of demand: Higher price → lower quantity demanded',
          'Income effect: Price change affects purchasing power',
          'Substitution effect: Price change affects relative prices',
          'Normal good: Demand increases with income',
          'Inferior good: Demand decreases with income',
        ],
        resources: [
          { title: 'Khan Academy - Microeconomics', url: 'https://www.khanacademy.org/economics-finance-domain/ap-microeconomics' },
        ],
      },
    },
    'ap english language': {
      'chapter 1': {
        notes: 'Analyze rhetorical strategies and argument structure in non-fiction texts.',
        keyPoints: [
          'Ethos: Appeal to credibility and character of the speaker',
          'Pathos: Appeal to emotions of the audience',
          'Logos: Appeal to logic and reasoning with evidence',
          'Rhetoric: Art of persuasive speaking and writing',
          'Audience: Target group the author is addressing',
          'Purpose: Author\'s goal: inform, persuade, entertain, express',
          'Tone: Author\'s attitude toward subject: sarcastic, formal, casual, etc.',
          'Diction: Word choice affecting meaning and tone',
          'Syntax: Sentence structure and arrangement of words',
          'Figurative language: Metaphor, simile, personification, hyperbole, understatement',
        ],
        resources: [
          { title: 'Khan Academy - AP English Language', url: 'https://www.khanacademy.org/humanities/ap-english-language' },
        ],
      },
    },
    'ap english literature': {
      'chapter 1': {
        notes: 'Analyze literary elements including character, plot, theme, and symbolism in fiction.',
        keyPoints: [
          'Character: Protagonist (main), Antagonist (opposes protagonist), static (unchanged), dynamic (changes)',
          'Plot: Exposition, rising action, climax, falling action, resolution',
          'Theme: Central idea or message about life (love, power, identity, etc.)',
          'Point of view: First person (I), second person (you), third person limited, omniscient',
          'Symbolism: Objects/actions representing abstract ideas (white dove = peace)',
          'Imagery: Sensory language creating mental pictures',
          'Tone: Attitude of narrator/author toward subject',
          'Irony: Situational (outcome unexpected), verbal (saying opposite), dramatic (audience knows more)',
          'Conflict: Internal (within character), External (with outside forces)',
          'Setting: Time, place, social environment where story occurs',
        ],
        resources: [
          { title: 'Khan Academy - AP English Literature', url: 'https://www.khanacademy.org/humanities/ap-english-literature' },
        ],
      },
    },
    'ap world history': {
      'chapter 1': {
        notes: 'Explore early human societies, agricultural revolution, and ancient civilizations.',
        keyPoints: [
          'Paleolithic era: Hunter-gatherer societies, oral traditions, cave paintings',
          'Neolithic Revolution (~10,000 BCE): Agriculture begins, permanent settlements, domestication',
          'Mesopotamia (~3500 BCE): Sumer, Akkad, city-states, cuneiform writing, Code of Hammurabi (1754 BCE)',
          'Ancient Egypt (~3100 BCE): Nile River dependent, pharaohs, pyramids, hieroglyphics',
          'Indus Valley Civilization (~2500 BCE): Planned cities, undeciphered script, trade networks',
          'Shang Dynasty China (~1600 BCE): Early writing system, oracle bones, ancestor worship',
          'Civilization characteristics: Centralized government, writing, cities, specialized labor, organized religion',
          'Bronze Age: Technology advance allowing stronger tools and weapons',
          'Trade networks: Early connections between civilizations via silk roads and maritime routes',
          'Religious foundations: Polytheism in early civilizations, monotheism develops',
        ],
        resources: [
          { title: 'Khan Academy - World History', url: 'https://www.khanacademy.org/humanities/world-history' },
          { title: 'Wikipedia - History of the World', url: 'https://en.wikipedia.org/wiki/History' },
        ],
      },
    },
    'ap european history': {
      'chapter 1': {
        notes: 'Study the Middle Ages, feudalism, and the transition to early modern Europe.',
        keyPoints: [
          'Medieval period (~500-1500 CE): Feudalism, limited literacy, Church dominance',
          'Feudalism: Hierarchical system - king → nobles → knights → peasants',
          'Manor system: Lord owns land, peasants work in exchange for protection',
          'Crusades (1096-1291): Religious wars between Christians and Muslims for Holy Land',
          'Black Death (1347-1353): Bubonic plague killed ~50% of Europe, labor shortage, social change',
          'Feudal decline: Centralized nations emerging, universities growing, merchant class rising',
          'Renaissance (~1350-1600): Revival of classical learning, humanism, art, literature',
          'Printing press (~1440): Gutenberg invention revolutionizes information spread',
          'Protestant Reformation (1517): Martin Luther challenges Catholic Church, denominational split',
          'Nation-states: England, France, Spain, Portugal consolidate power and expand overseas',
        ],
        resources: [
          { title: 'Khan Academy - European History', url: 'https://www.khanacademy.org/humanities/world-history/euro' },
          { title: 'Wikipedia - Medieval Europe', url: 'https://en.wikipedia.org/wiki/Medieval_Europe' },
        ],
      },
    },
    'ap u.s. government': {
      'chapter 1': {
        notes: 'Understand the US Constitution, federalism, and separation of powers.',
        keyPoints: [
          'Articles of Confederation (1781-1789): First US framework, too weak federal government',
          'Constitutional Convention (1787): Philadelphia, 55 delegates drafted new framework',
          'Federalism: Power divided between national and state governments',
          'Separation of powers: Executive (President), Legislative (Congress), Judicial (Courts)',
          'Checks and balances: Each branch limits power of others',
          'Executive: President enforces laws, commander-in-chief, treaties, cabinet',
          'Legislative: Congress (Senate + House) makes laws, can override veto with 2/3 vote',
          'Judicial: Supreme Court interprets laws, judicial review authority',
          'Bill of Rights (1791): First 10 amendments protecting individual liberties',
          'Amendment process: 2/3 Congress or 2/3 states call convention, 3/4 states ratify',
        ],
        resources: [
          { title: 'Khan Academy - US Government', url: 'https://www.khanacademy.org/humanities/us-government-and-civics' },
          { title: 'Constitution.gov', url: 'https://constitution.congress.gov' },
        ],
      },
    },
    'ap comparative government': {
      'chapter 1': {
        notes: 'Compare governmental systems across the United Kingdom, Russia, China, and Mexico.',
        keyPoints: [
          'Parliamentary system: Legislature chooses executive (Prime Minister), no separation of powers',
          'Presidential system: Voters choose executive and legislature separately with separation of powers',
          'United Kingdom: Constitutional monarchy, Prime Minister heads government, bicameral Parliament',
          'Russia: Federal semi-presidential system, President + Prime Minister, authoritarian tendencies',
          'China: One-party communist system, National People\'s Congress, General Secretary leads',
          'Mexico: Federal presidential republic, three branches, term limits prevent reelection',
          'Authoritarianism: Power concentrated in single leader/party with limited freedoms',
          'Democracy: Government by the people, elections, freedom of speech/press',
          'Unitary government: Central authority has all power (France, China, Russia)',
          'Federal government: Power divided between central and regional (USA, Mexico, Australia)',
        ],
        resources: [
          { title: 'Khan Academy - Comparative Government', url: 'https://www.khanacademy.org/humanities/ap-us-government-and-politics' },
        ],
      },
    },
    'ap psychology': {
      'chapter 1': {
        notes: 'Explore psychology foundations, research methods, and biological bases of behavior.',
        keyPoints: [
          'Psychology: Scientific study of behavior and mental processes',
          'Perspectives: Biological, cognitive, behavioral, humanistic, psychoanalytic, sociocultural',
          'Research method: Experiment (cause-effect), correlational (relationship), descriptive (observation)',
          'Neuron: Basic unit of nervous system - dendrites, soma, axon, axon terminals',
          'Action potential: Electrical signal (Na+ in, K+ out) travels along axon',
          'Neurotransmitters: Chemical messengers - dopamine, serotonin, acetylcholine, GABA, glutamate',
          'Brain structures: Frontal lobe (executive), parietal (sensation), temporal (memory), occipital (vision)',
          'Cerebrum vs cerebellum: Cerebrum (thinking, feeling), cerebellum (coordination, balance)',
          'Hemispheric specialization: Left (language, logic), right (spatial, emotional)',
          'Neuroplasticity: Brain\'s ability to reorganize and form new connections',
        ],
        resources: [
          { title: 'Khan Academy - AP Psychology', url: 'https://www.khanacademy.org/science/ap-psychology' },
        ],
      },
    },
    'ap human geography': {
      'chapter 1': {
        notes: 'Study spatial patterns, human cultures, and geography\'s influence on societies.',
        keyPoints: [
          'Geography: Study of places, humans, and human-environment relationships',
          'Scale: Local (neighborhood), regional (state), national (country), global',
          'Culture: Shared beliefs, values, practices of a group (language, religion, customs)',
          'Cultural diffusion: Spread of cultural traits through migration and contact',
          'Acculturation: Process of adopting new culture while maintaining own',
          'Religion: Major world religions - Christianity, Islam, Judaism, Buddhism, Hinduism, Sikhism',
          'Language families: Indo-European, Sino-Tibetan, Niger-Congo, Afro-Asiatic, Austronesian',
          'Politics: Nation-states, sovereignty, geopolitics, boundaries and borders',
          'Economy: Primary (agriculture), secondary (manufacturing), tertiary (service), quaternary (information)',
          'Urbanization: Migration to cities, megacities (>10 million), urban sprawl',
        ],
        resources: [
          { title: 'Khan Academy - Human Geography', url: 'https://www.khanacademy.org/humanities/ap-human-geography' },
        ],
      },
    },
    'ap organic chemistry': {
      'chapter 1': {
        notes: 'Learn organic compound structure, bonding, and nomenclature.',
        keyPoints: [
          'Hydrocarbons: Compounds with only carbon and hydrogen',
          'Alkanes (CₙH₂ₙ₊₂): Single C-C bonds, saturated, general formula',
          'Alkenes (CₙH₂ₙ): Double C=C bonds, unsaturated, trigonal planar geometry',
          'Alkynes (CₙH₂ₙ₋₂): Triple C≡C bonds, linear geometry',
          'IUPAC nomenclature: Identify longest carbon chain, number atoms, name substituents',
          'Functional groups: -OH (hydroxyl), -NH₂ (amine), -C=O (carbonyl), -COOH (carboxyl), -OR (ether)',
          'Isomers: Same molecular formula, different structure (structural, geometrical, optical)',
          'Stereochemistry: R/S configuration, E/Z notation, chiral centers',
          'Resonance structures: Multiple Lewis structures with delocalized electrons',
          'Aromaticity: Benzene and aromatic compounds with cyclic structure and alternating bonds',
        ],
        resources: [
          { title: 'Khan Academy - Organic Chemistry', url: 'https://www.khanacademy.org/science/organic-chemistry' },
          { title: 'Wikipedia - Organic Chemistry', url: 'https://en.wikipedia.org/wiki/Organic_chemistry' },
        ],
      },
    },
    'ap physics c': {
      'chapter 1': {
        notes: 'Master mechanics: kinematics, forces, and Newton\'s Laws.',
        keyPoints: [
          'Displacement: Δx = x_f - x_i (vector, has direction)',
          'Velocity: v = Δx/Δt (m/s), instantaneous v = dx/dt',
          'Acceleration: a = Δv/Δt (m/s²)',
          'Kinematics equations: v = v₀ + at, x = x₀ + v₀t + ½at², v² = v₀² + 2a(x - x₀)',
          'Newton\'s First Law: Object continues in motion unless acted upon',
          'Newton\'s Second Law: F_net = ma',
          'Newton\'s Third Law: F_AB = -F_BA',
          'Gravitational force: F = GMm/r² (universal gravitation)',
          'Centripetal acceleration: a_c = v²/r = ω²r (directed toward center)',
          'Free fall: a = -g = -9.8 m/s² (take downward as negative)',
        ],
        resources: [
          { title: 'Khan Academy - Physics C', url: 'https://www.khanacademy.org/science/ap-physics-c' },
        ],
      },
    },
    'ib higher level physics': {
      'chapter 1': {
        notes: 'Study mechanics at higher level: energy, momentum, and rotational motion.',
        keyPoints: [
          'Kinetic energy: KE = ½mv² (joules)',
          'Potential energy: PE = mgh (gravitational), PE = ½kx² (elastic)',
          'Work: W = F·d·cos(θ) (joules), W = ΔKE',
          'Power: P = W/t (watts), P = Fv',
          'Conservation of momentum: p₁ + p₂ = p₁\' + p₂\' (no external forces)',
          'Impulse: J = FΔt = Δp',
          'Torque: τ = r × F = rF·sin(θ) (N·m)',
          'Angular momentum: L = Iω = mvr (kg·m²/s)',
          'Moment of inertia: I = Σmr² or ∫r²dm',
          'Rotational KE: KE_rot = ½Iω²',
        ],
        resources: [
          { title: 'IB Physics Guide', url: 'https://www.ib.org' },
          { title: 'Khan Academy - Physics', url: 'https://www.khanacademy.org/science/physics' },
        ],
      },
    },
    'ib higher level chemistry': {
      'chapter 1': {
        notes: 'Explore atomic theory, bonding, and chemical equilibrium at higher level.',
        keyPoints: [
          'Atomic mass unit (u): 1 u = 1.66 × 10⁻²⁷ kg',
          'Relative atomic mass: Average mass of isotopes weighted by abundance',
          'Molar mass: Mass of 1 mole (g/mol), numerically equals atomic mass',
          'Avogadro\'s number: N_A = 6.022 × 10²³ particles/mol',
          'Mole: n = m/M = N/N_A',
          'Ionization energy: Energy to remove electron from gas atom, increases across period',
          'Electron affinity: Energy change when electron added to gas atom',
          'Electronegativity: Ability to attract electron pairs, Pauling scale (F = 4.0)',
          'Bond polarity: ΔEN > 1.7 (ionic), 0.4-1.7 (covalent)',
          'Oxidation states: Assign to track electron transfer in reactions',
        ],
        resources: [
          { title: 'IB Chemistry Guide', url: 'https://www.ib.org' },
          { title: 'Khan Academy - Chemistry', url: 'https://www.khanacademy.org/science/chemistry' },
        ],
      },
    },
    'ib higher level mathematics': {
      'chapter 1': {
        notes: 'Study functions, calculus, and advanced algebraic concepts.',
        keyPoints: [
          'Function: Relation where each input has exactly one output, f: X → Y',
          'Domain: Set of all input values; Range: Set of all output values',
          'Composition: (f ∘ g)(x) = f(g(x))',
          'Inverse function: f⁻¹(x), swaps domain and range',
          'Limit: lim(x→a) f(x) = L (formal definition with ε-δ)',
          'Derivative: f\'(x) = lim(h→0) [f(x+h) - f(x)]/h (instantaneous rate of change)',
          'Integral: ∫f(x)dx represents antiderivative',
          'Fundamental Theorem: ∫ₐᵇ f(x)dx = F(b) - F(a) where F\'(x) = f(x)',
          'Differential equations: dy/dx = f(x, y) with solutions',
          'Series: Convergence tests, Taylor series, power series representation',
        ],
        resources: [
          { title: 'IB Mathematics Guide', url: 'https://www.ib.org' },
          { title: 'Khan Academy - Calculus', url: 'https://www.khanacademy.org/math/calculus-1' },
        ],
      },
    },
    'ib higher level biology': {
      'chapter 1': {
        notes: 'Study cell biology, genetics, and biochemistry at higher level.',
        keyPoints: [
          'Cell membrane: Phospholipid bilayer (5-10 nm thick) with embedded proteins',
          'Membrane transport: Diffusion (passive, high→low), osmosis (water movement)',
          'Active transport: Uses ATP to move against concentration gradient',
          'Endocytosis: Cell membrane invaginates to engulf material',
          'Exocytosis: Vesicles fuse with membrane to release material',
          'Mitochondria: Site of cellular respiration, ATP production (30-32 ATP per glucose)',
          'Chloroplast: Light and dark reactions, produces glucose from CO₂ and H₂O',
          'DNA structure: Double helix, complementary base pairing (A-T, G-C)',
          'Transcription: DNA → mRNA in nucleus, mRNA leaves via nuclear pore',
          'Translation: mRNA → Protein at ribosome, tRNA brings amino acids',
        ],
        resources: [
          { title: 'IB Biology Guide', url: 'https://www.ib.org' },
          { title: 'Khan Academy - Biology', url: 'https://www.khanacademy.org/science/biology' },
        ],
      },
    },
    'honors precalculus': {
      'chapter 1': {
        notes: 'Master functions, trigonometry, and analytic geometry.',
        keyPoints: [
          'Function notation: f(x), domain restriction (x ≠ values where undefined)',
          'Polynomial degree: Highest power of x, determines end behavior and turning points',
          'Rational functions: Polynomial/polynomial, vertical asymptotes where denominator = 0',
          'Trigonometric functions: sin(θ), cos(θ), tan(θ), csc(θ), sec(θ), cot(θ)',
          'Unit circle: cos(θ) = x, sin(θ) = y for point (x,y) on circle radius 1',
          'Special angles: 0°, 30°, 45°, 60°, 90° - memorize sine/cosine values',
          'Trigonometric identities: sin²θ + cos²θ = 1, tan²θ + 1 = sec²θ',
          'Law of sines: a/sin(A) = b/sin(B) = c/sin(C)',
          'Law of cosines: c² = a² + b² - 2ab·cos(C)',
          'Analytic geometry: Circles (x-h)² + (y-k)² = r², ellipses, parabolas, hyperbolas',
        ],
        resources: [
          { title: 'Khan Academy - Precalculus', url: 'https://www.khanacademy.org/math/precalculus' },
        ],
      },
    },
    'honors chemistry': {
      'chapter 1': {
        notes: 'Comprehensive chemistry: atoms, bonding, reactions, and thermodynamics.',
        keyPoints: [
          'Atomic structure: Electrons in orbitals (1s, 2s, 2p, 3s, 3p, 3d, 4s, 4p, etc.)',
          'Quantum numbers: n (level), l (orbital type), m_l (orbital), m_s (spin)',
          'Periodic trends: Atomic radius decreases left→right, increases top→bottom',
          'Ionization energy: Energy to remove electron, increases left→right',
          'Electronegativity: Ability to attract electrons (Pauling: F = 4.0, Li = 0.98)',
          'Lewis structures: Dots represent valence electrons, lines are bonds',
          'Formal charge: (Valence e⁻) - (lone pairs) - ½(bonding e⁻)',
          'Molecular geometry: VSEPR predicts shape, affects polarity',
          'Chemical equation: aA + bB → cC + dD (must balance atoms)',
          'Stoichiometry: Coefficients show mole ratios, use for limiting reactant',
        ],
        resources: [
          { title: 'Khan Academy - Chemistry', url: 'https://www.khanacademy.org/science/chemistry' },
        ],
      },
    },
    'honors physics': {
      'chapter 1': {
        notes: 'Comprehensive physics: motion, forces, energy, and waves.',
        keyPoints: [
          'Displacement: Change in position (m), vector quantity',
          'Velocity: v = Δx/Δt (m/s), instantaneous v = dx/dt',
          'Acceleration: a = Δv/Δt (m/s²)',
          'Kinematic equations: v = v₀ + at, x = v₀t + ½at², v² = v₀² + 2ax',
          'Newton\'s Second Law: F_net = ma',
          'Weight: W = mg (9.8 N/kg on Earth)',
          'Work: W = Fd·cos(θ) (joules)',
          'Kinetic energy: KE = ½mv²',
          'Potential energy: PE = mgh',
          'Conservation of energy: KE + PE = constant (no friction)',
        ],
        resources: [
          { title: 'Khan Academy - Physics', url: 'https://www.khanacademy.org/science/physics' },
        ],
      },
    },
    'honors biology': {
      'chapter 1': {
        notes: 'Study life sciences: cells, genetics, evolution, and ecology.',
        keyPoints: [
          'Cell theory: All living things made of cells, cells from pre-existing cells',
          'Prokaryotic: No nucleus (bacteria, archaea), circular DNA',
          'Eukaryotic: Nucleus containing DNA, organelles for functions',
          'Mitochondria: Powerhouse, ATP production via cellular respiration',
          'Photosynthesis: 6CO₂ + 6H₂O + light energy → C₆H₁₂O₆ + 6O₂',
          'Cellular respiration: C₆H₁₂O₆ + 6O₂ → 6CO₂ + 6H₂O + 30-32 ATP',
          'DNA: Deoxyribose sugar, phosphate backbone, nitrogenous bases (A, T, G, C)',
          'Gene expression: DNA → (transcription) → mRNA → (translation) → Protein',
          'Photosynthesis location: Light reactions (thylakoid), Calvin cycle (stroma)',
          'Mendelian genetics: Dominant/recessive traits, alleles, Punnett squares',
        ],
        resources: [
          { title: 'Khan Academy - Biology', url: 'https://www.khanacademy.org/science/biology' },
        ],
      },
    },
    'linear algebra': {
      'chapter 1': {
        notes: 'Understand vectors, matrices, and linear transformations.',
        keyPoints: [
          'Vector: Ordered list of numbers (magnitude and direction)',
          'Scalar: Single number (magnitude only)',
          'Dot product: u · v = u₁v₁ + u₂v₂ + ... = ||u|| ||v|| cos(θ)',
          'Cross product: u × v = ||u|| ||v|| sin(θ) n̂ (3D only, perpendicular)',
          'Matrix: Rectangular array of numbers, m × n dimensions',
          'Matrix addition: Add corresponding elements',
          'Matrix multiplication: (m × k) × (k × n) = (m × n), dot products of rows and columns',
          'Determinant: Single number associated with square matrix, indicates invertibility',
          'Inverse matrix: A⁻¹ where AA⁻¹ = I (identity matrix)',
          'Eigenvalue/eigenvector: Aν = λν (scalar λ scales vector ν without changing direction)',
          'Rank: Maximum number of linearly independent rows/columns',
        ],
        resources: [
          { title: 'Khan Academy - Linear Algebra', url: 'https://www.khanacademy.org/math/linear-algebra' },
          { title: '3Blue1Brown - Essence of Linear Algebra', url: 'https://www.youtube.com/watch?v=fNk_zzaMoSY' },
        ],
      },
    },
    'multivariable calculus': {
      'chapter 1': {
        notes: 'Study functions of multiple variables, partial derivatives, and multiple integrals.',
        keyPoints: [
          'Multivariable function: f(x,y) or f(x,y,z) maps multiple inputs to output',
          'Partial derivative: ∂f/∂x treats y as constant, ∂f/∂y treats x as constant',
          'Gradient: ∇f = (∂f/∂x, ∂f/∂y) points in direction of maximum increase',
          'Directional derivative: D_u f = ∇f · û (rate of change in direction of unit vector û)',
          'Double integral: ∬ f(x,y) dA (volume under surface)',
          'Triple integral: ∭ f(x,y,z) dV (volume in 3D space)',
          'Fubini\'s theorem: Compute multiple integrals by iterated integration',
          'Jacobian: Determinant of partial derivatives, scaling factor in change of variables',
          'Polar coordinates: x = r cos(θ), y = r sin(θ), dA = r dr dθ',
          'Spherical coordinates: x = ρ sin(φ) cos(θ), y = ρ sin(φ) sin(θ), z = ρ cos(φ)',
        ],
        resources: [
          { title: 'Khan Academy - Multivariable Calculus', url: 'https://www.khanacademy.org/math/multivariable-calculus' },
        ],
      },
    },
    'differential equations': {
      'chapter 1': {
        notes: 'Solve ordinary differential equations and understand their applications.',
        keyPoints: [
          'Differential equation: Equation with derivatives, dy/dx = f(x,y)',
          'Order: Highest derivative power (first-order, second-order, etc.)',
          'Separable: dy/dx = f(x)g(y) → ∫(1/g(y))dy = ∫f(x)dx',
          'Integrating factor: Multiply equation by e^(∫P(x)dx) to make separable',
          'First-order linear: dy/dx + P(x)y = Q(x)',
          'Second-order linear: y\'\' + ay\' + by = f(x)',
          'Homogeneous solution: Solution to equation with f(x) = 0',
          'Particular solution: Specific solution satisfying initial/boundary conditions',
          'General solution: Homogeneous + particular solution',
          'Applications: Exponential growth/decay (y\' = ky), Newton\'s cooling (y\' = -k(y-T_a))',
          'Numerical methods: Euler\'s method, Runge-Kutta for approximation',
        ],
        resources: [
          { title: 'Khan Academy - Differential Equations', url: 'https://www.khanacademy.org/math/differential-equations' },
          { title: 'Paul\'s Online Math Notes - DE', url: 'https://tutorial.math.lamar.edu/Classes/DE/DE.aspx' },
        ],
      },
    },
    'biology': {
      'chapter 1': {
        notes: 'Learn about prokaryotic and eukaryotic cells, organelles, and their functions.',
        keyPoints: [
          'Prokaryotic cells lack a membrane-bound nucleus; eukaryotic cells contain a nucleus with DNA',
          'Cell membrane: Phospholipid bilayer with embedded proteins - selectively permeable',
          'Mitochondria: Powerhouse of cell, produces ATP through cellular respiration',
          'Nucleus: Contains DNA, site of transcription and gene expression',
          'Endoplasmic reticulum: Rough ER for protein synthesis, Smooth ER for lipid synthesis',
          'Golgi apparatus: Modifies and packages proteins for transport',
          'Ribosomes: rRNA + proteins, translate mRNA into proteins',
          'Lysosomes: Contain digestive enzymes to break down cellular waste',
          'Vacuoles: Storage organelles, central vacuole maintains turgor pressure in plants',
          'Chloroplasts: Contain chlorophyll, site of photosynthesis in plants and algae',
        ],
        resources: [
          { title: 'Khan Academy - Cell Structure', url: 'https://www.khanacademy.org/science/ap-biology' },
          { title: 'Wikipedia - Cell', url: 'https://en.wikipedia.org/wiki/Cell_(biology)' },
        ],
      },
      'cell structure': {
        notes: 'Learn about prokaryotic and eukaryotic cells, their structures (nucleus, mitochondria, chloroplasts), and their functions.',
        keyPoints: [
          'Prokaryotic cells lack a membrane-bound nucleus; eukaryotic cells contain a nucleus with DNA',
          'Cell membrane: Phospholipid bilayer with embedded proteins - controls what enters/exits',
          'Mitochondria (powerhouse): Site of ATP production via cellular respiration',
          'Nucleus: Contains DNA, site of transcription and replication',
          'Endoplasmic reticulum: Rough ER for protein synthesis, Smooth ER for lipid synthesis',
          'Golgi apparatus: Modifies and packages proteins for transport',
          'Ribosomes: rRNA + proteins, translate mRNA into proteins (70S in prokaryotes, 80S in eukaryotes)',
          'Lysosomes: Contain digestive enzymes to break down cellular waste',
          'Vacuoles: Storage organelles, large central vacuole in plant cells maintains turgor pressure',
          'Chloroplasts: Contain chlorophyll, site of photosynthesis in plants',
        ],
        resources: [
          { title: 'Khan Academy - Cell Structure and Function', url: 'https://www.khanacademy.org/science/ap-biology/cell-structure-and-function' },
          { title: 'Wikipedia - Eukaryotic Cell', url: 'https://en.wikipedia.org/wiki/Eukaryote' },
        ],
      },
    },
    'physics': {
      'chapter 1': {
        notes: 'Master kinematics: displacement, velocity, acceleration, and motion equations.',
        keyPoints: [
          'Displacement (Δx): Vector quantity, change in position (m)',
          'Velocity (v): v = Δx/Δt (m/s), slope of position vs time graph',
          'Acceleration (a): a = Δv/Δt (m/s²), slope of velocity vs time graph',
          'v = v₀ + at',
          'x = x₀ + v₀t + ½at²',
          'v² = v₀² + 2a(x - x₀)',
          'Free fall: a = -9.8 m/s² (constant)',
          'Average velocity: v_avg = (x_final - x_initial) / t',
          'Projectile motion: Horizontal velocity constant, vertical velocity changes at g = 9.8 m/s²',
          'Maximum height: h = (v₀·sin θ)² / (2g); Range: R = (v₀²·sin 2θ) / g',
        ],
        resources: [
          { title: 'Khan Academy - Physics', url: 'https://www.khanacademy.org/science/physics' },
          { title: 'Wikipedia - Kinematics', url: 'https://en.wikipedia.org/wiki/Kinematics' },
        ],
      },
      'kinematics': {
        notes: 'Study motion using kinematic equations: v = v₀ + at, x = v₀t + ½at², v² = v₀² + 2ax',
        keyPoints: [
          'Displacement (Δx): Vector quantity, magnitude with direction (meters)',
          'Velocity (v): v = Δx/Δt (m/s), instantaneous velocity = dx/dt',
          'Acceleration (a): a = Δv/Δt (m/s²), constant acceleration equations apply',
          'Kinematic equation 1: v = v₀ + at',
          'Kinematic equation 2: x = x₀ + v₀t + ½at²',
          'Kinematic equation 3: v² = v₀² + 2a(x - x₀)',
          'Kinematic equation 4: x = x₀ + ½(v + v₀)t',
          'Free fall: a = -9.8 m/s² (downward), v = gt, h = ½gt²',
          'Projectile motion: Horizontal (constant velocity) and vertical (constant acceleration) components',
          'Range: R = (v₀²sin(2θ))/g, Maximum height: h = (v₀²sin²θ)/(2g)',
        ],
        resources: [
          { title: 'Khan Academy - Kinematics', url: 'https://www.khanacademy.org/science/physics/one-dimensional-motion' },
          { title: 'Wikipedia - Kinematics', url: 'https://en.wikipedia.org/wiki/Kinematics' },
        ],
      },
    },
  }

  const subjectKey = subject.toLowerCase().replace(/\s+/g, ' ')
  const chapterKey = chapterName.toLowerCase()

  // Check if we have content for this subject and chapter
  if (contentDatabase[subjectKey]?.[chapterKey]) {
    return { ...contentDatabase[subjectKey][chapterKey] }
  }

  // Try partial matches within subject
  if (contentDatabase[subjectKey]) {
    for (const [key, value] of Object.entries(contentDatabase[subjectKey])) {
      if (chapterKey.includes(key) || key.includes(chapterKey)) {
        return { ...value }
      }
    }
  }

  // Fallback with generic content
  return {
    notes: `Study the concepts and principles covered in "${chapterName}" for ${subject}. Review all definitions, formulas, and key theories.`,
    keyPoints: [
      'Review all definitions and terminology',
      'Study examples and practice problems',
      'Understand core concepts and theories',
      'Make connections between topics',
      'Practice problems and self-assessment',
    ],
    resources: [
      { title: `Khan Academy - ${subject}`, url: 'https://www.khanacademy.org' },
      { title: `Wikipedia - ${chapterName}`, url: 'https://www.wikipedia.org' },
      { title: 'Coursera - Free Courses', url: 'https://www.coursera.org' },
    ],
  }
}

export async function POST(request: Request) {
  try {
    const { subject, chapters } = await request.json()

    const chapterDetails = await Promise.all(
      chapters.map(async (chapter: string) => ({
        name: chapter,
        ...(await generateChapterContent(subject, chapter)),
      }))
    )

    return Response.json({ chapterDetails })
  } catch (error) {
    console.error('[v0] Error researching course:', error)
    return Response.json(
      { error: 'Failed to research course' },
      { status: 500 }
    )
  }
}
