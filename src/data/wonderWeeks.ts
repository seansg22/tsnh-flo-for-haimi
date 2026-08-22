// Onset weeks are measured from the estimated due date (EDD), not birth date —
// leap timing tracks gestational/adjusted age.
export interface Leap {
  number: number;
  startWeek: number;
  endWeek: number;
  name: string;
  description: string;
  level: 1 | 2 | 3; // 1=mild, 2=moderate, 3=intense
  tips: string[];
}

export const leaps: Leap[] = [
  {
    number: 1, startWeek: 4, endWeek: 5, level: 1,
    name: 'Sensations',
    description: 'Baby becomes aware of new sensations all at once — touch, light, sound feel vivid and intense for the first time.',
    tips: [
      'Dim lights and keep the room quiet — senses are on overdrive.',
      'Respond immediately to cries; you cannot spoil a newborn.',
      'Try skin-to-skin and babywearing for calm; hold high-contrast cards 20 cm from face.',
    ],
  },
  {
    number: 2, startWeek: 7, endWeek: 9, level: 1,
    name: 'Patterns',
    description: 'Baby starts detecting recurring structure — visual patterns, rhythmic sounds, and daily routine sequences become fascinating.',
    tips: [
      'Embrace repetition: same songs and phrases every day wire the pattern-detection circuits.',
      'Keep awake windows to 45–90 minutes; overtiredness hits fast this leap.',
      'Start a simple 3-step bedtime routine now — bath, feed, song — baby\'s brain will register it.',
    ],
  },
  {
    number: 3, startWeek: 11, endWeek: 12, level: 1,
    name: 'Smooth Transitions',
    description: 'Baby perceives gradual change as a continuous experience — smooth motion, pitch glides, and flowing light all become fascinating. First laugh often appears.',
    tips: [
      'The stormy phase is short (~1 week) — hold freely and it passes quickly.',
      'Begin swaddle transition (one arm out) as the Moro reflex is fading.',
      'Try the airplane game: hold baby and swoop smoothly through the room.',
    ],
  },
  {
    number: 4, startWeek: 14, endWeek: 19, level: 2,
    name: 'Events',
    description: 'Baby understands events — things have a beginning, middle, and end. This is also the 14–19 week sleep regression: sleep cycles permanently restructure to adult architecture.',
    tips: [
      'Always say goodbye before leaving the room; never sneak away — it worsens separation anxiety.',
      'Complete the swaddle transition now (rolling starts — safety risk if still swaddled).',
      'This is the hardest leap of year one (5–6 weeks). Lower expectations and plan active support.',
    ],
  },
  {
    number: 5, startWeek: 22, endWeek: 26, level: 2,
    name: 'Relationships',
    description: 'Baby grasps distance and spatial relationships. Separation anxiety peaks — baby now understands you can walk away and be far from them.',
    tips: [
      'Meet clinginess with closeness — extra cuddles and babywearing are appropriate now.',
      'Always narrate departures: "Mama is going to the kitchen, I\'ll be right back."',
      'Introduce a comfort object (soft toy with your scent) to ease nighttime anxiety.',
    ],
  },
  {
    number: 6, startWeek: 33, endWeek: 37, level: 2,
    name: 'Categories',
    description: 'Baby begins sorting the world into categories — hard/soft, big/small, animal/not animal. Baby starts recognizing that objects belong to groups.',
    tips: [
      'Name categories during play: "This is a dog — dogs say woof. This is also a dog."',
      'Sort toys together by color or shape; make it a game.',
      'Read simple picture books with one object per page to reinforce groupings.',
    ],
  },
  {
    number: 7, startWeek: 41, endWeek: 46, level: 3,
    name: 'Sequences',
    description: 'Baby understands that actions follow each other in a logical order to reach a goal. Early problem-solving and deliberate play emerge.',
    tips: [
      'Let baby "help" with simple sequences: putting toys away, stacking, opening lids.',
      'Narrate multi-step tasks: "First we put on socks, then shoes, then we go outside."',
      'Expect frustration when sequences are interrupted — validate the feeling, then help.',
    ],
  },
  {
    number: 8, startWeek: 51, endWeek: 55, level: 3,
    name: 'Programs',
    description: 'Toddler combines sequences into flexible programs to achieve different results. Early creativity and experimentation with cause-and-effect chains appear.',
    tips: [
      'Offer open-ended toys — blocks, cups, balls — that support experimenting with sequences.',
      'Follow toddler\'s lead in play; resist the urge to show "the right way."',
      'Tantrums peak here as toddler has plans but limited words — acknowledge the frustration.',
    ],
  },
  {
    number: 9, startWeek: 59, endWeek: 64, level: 3,
    name: 'Principles',
    description: 'Toddler discovers that rules and principles govern the world — cause and effect, fairness, and "mine vs yours" all become real concepts.',
    tips: [
      'Be consistent with rules — toddler is now testing principles to understand them.',
      'Simple cause-and-effect explanations land now: "We wash hands so germs don\'t make us sick."',
      'Expect strong opinions and pushback — this is healthy principle-testing, not defiance.',
    ],
  },
  {
    number: 10, startWeek: 71, endWeek: 75, level: 3,
    name: 'Systems',
    description: 'Toddler understands that the world is made up of systems — family, society, and nature — and begins to grasp their own place within them.',
    tips: [
      'Talk about family and community systems: "Our family does X. Our neighbors do Y."',
      'Simple role-play games (doctor, shop, kitchen) help toddler explore social systems.',
      'Toddler may ask "why" constantly — this is real systems-thinking curiosity, worth answering.',
    ],
  },
];
