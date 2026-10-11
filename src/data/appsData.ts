import { AppItem } from '../types';

// Initial App Catalog
// To add new apps directly in code, simply append a new object to this array,
// or use the in-app "App Manager" to add, edit, or remove apps interactively.

export const initialApps: AppItem[] = [
  {
    id: 'math-master-trivia',
    name: 'Math Master: Trivia Challenge',
    packageName: 'com.aurapulse.mathmaster',
    iconUrl: '/src/assets/images/icon_math_master_1791704588291.jpg',
    shortDescription: 'Sharpen your mental math and speed through captivating arithmetic puzzles and timed trivia challenges.',
    fullDescription: 'Math Master: Trivia Challenge turns daily mathematical practice into an electrifying brain-training experience. Designed for learners, puzzle enthusiasts, and trivia buffs of all ages, you will advance through progressively challenging arithmetic, algebraic reasoning, and pattern recognition levels under dynamic time pressure.\n\nFeaturing multiple gameplay modes including Speed Sprint, Endless Marathon, and Daily Brain IQ, the game offers a distraction-free learning environment with zero unnecessary permissions.',
    category: 'Education',
    tags: ['Quiz Game', 'Brain Training', 'Mental Math', 'Education'],
    googlePlayUrl: '', // Developer can insert actual Google Play URL in App Manager
    screenshots: [
      '/src/assets/images/screenshot_math_master_1791704626042.jpg',
      '/src/assets/images/icon_math_master_1791704588291.jpg'
    ],
    privacyPolicyUrl: '', // Can link to site privacy policy or external URL
    privacyPolicyText: 'Math Master: Trivia Challenge does not require account registration or collect personally identifiable information. Gameplay progress and high scores are saved locally on your Android device. If non-personalized ads are displayed via Google AdMob, Google may collect anonymous device diagnostics in accordance with Google Play developer policies.',
    supportEmail: 'pratibhakumari2219@gmail.com',
    publicationStatus: 'Coming Soon', // 'Coming Soon' | 'Published'
    keyFeatures: [
      'Over 500+ progressively challenging mental arithmetic and logic questions',
      'Adaptive difficulty engine calibrated to your solving speed and accuracy',
      'Daily trivia challenges with streak multipliers and achievement badges',
      'Offline play capability — enjoy full gameplay without an active internet connection',
      'Sleek modern dark-mode aesthetic engineered for high contrast and visual comfort'
    ],
    version: '1.0.0',
    minAndroidVersion: 'Android 8.0 (API 26) or higher',
    contentRating: 'Everyone (PEGI 3)',
    sizeMb: '28 MB',
    featured: true,
    releaseDate: 'Expected Q4 2026'
  },
  {
    id: 'glow-circuit-light-puzzle',
    name: 'Glow Circuit: Light Puzzle',
    packageName: 'com.aurapulse.glowcircuit',
    iconUrl: '/src/assets/images/icon_glow_circuit_1791704600961.jpg',
    shortDescription: 'Route luminous beams of light across complex circuit boards to illuminate energy nodes and solve intricate spatial puzzles.',
    fullDescription: 'Glow Circuit: Light Puzzle is a soothing yet stimulating spatial puzzle game where you align optical conduits, rotate laser splitters, and channel radiant photons to energize dormant core terminals.\n\nFeaturing an immersive ambient electronic soundtrack and handcrafted puzzle boards, each level challenges your spatial thinking and strategic planning. Start with simple linear pathways and progress toward multifaceted multi-colored photonic routing matrices.',
    category: 'Puzzle',
    tags: ['Puzzle Game', 'Spatial Logic', 'Minimalist', 'Neon Visuals'],
    googlePlayUrl: '', // Developer can insert actual Google Play URL in App Manager
    screenshots: [
      '/src/assets/images/screenshot_glow_circuit_1791704636828.jpg',
      '/src/assets/images/icon_glow_circuit_1791704600961.jpg'
    ],
    privacyPolicyUrl: '',
    privacyPolicyText: 'Glow Circuit: Light Puzzle respects user privacy. The application does not collect personal identity, precise location, or contact lists. Game state and unlocked levels are stored in local device storage. Third-party advertising partners such as Google AdMob comply with Google Play Families Policy guidelines when applicable.',
    supportEmail: 'pratibhakumari2219@gmail.com',
    publicationStatus: 'Coming Soon',
    keyFeatures: [
      '120+ handcrafted light-routing puzzle levels spanning 6 unique energy sectors',
      'Satisfying haptic feedback and ambient audio designed for relaxed gameplay',
      'No timers or punitive move limits — solve at your own deliberate pace',
      'Intuitive touch-and-rotate controls optimized for one-handed mobile play',
      'Full offline capability with smooth 60fps performance on all Android devices'
    ],
    version: '1.0.0',
    minAndroidVersion: 'Android 8.0 (API 26) or higher',
    contentRating: 'Everyone (PEGI 3)',
    sizeMb: '36 MB',
    featured: true,
    releaseDate: 'Expected Q4 2026'
  }
];

// Helper template for developers creating new applications
export const blankAppTemplate: Omit<AppItem, 'id'> = {
  name: 'New Android App / Game',
  packageName: 'com.aurapulse.newapp',
  iconUrl: '/src/assets/images/hero_mobile_showcase_1791704615584.jpg',
  shortDescription: 'Short engaging summary of the application for Google Play store listings.',
  fullDescription: 'Comprehensive description detailing game mechanics, tools, advantages, and instructions.',
  category: 'Games',
  tags: ['Android', 'Mobile'],
  googlePlayUrl: '',
  screenshots: [],
  privacyPolicyUrl: '',
  privacyPolicyText: 'This application respects user privacy. Device storage is utilized solely for offline preferences and saved data.',
  supportEmail: 'pratibhakumari2219@gmail.com',
  publicationStatus: 'Coming Soon',
  keyFeatures: [
    'Feature 1: Fast and responsive mobile interface',
    'Feature 2: Secure local data storage with zero telemetry',
    'Feature 3: Regular updates and continuous optimizations'
  ],
  version: '1.0.0',
  minAndroidVersion: 'Android 8.0 or higher',
  contentRating: 'Everyone (PEGI 3)',
  sizeMb: '25 MB',
  featured: false,
  releaseDate: 'Coming Soon'
};
