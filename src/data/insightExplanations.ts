export type InsightCategory = 'motor' | 'cognitive' | 'social' | 'sensory';

interface ExplanationInput {
  category: InsightCategory;
  item: string;
  week: number;
}

type Rule = {
  pattern: RegExp;
  explain: string | ((week: number) => string);
};

function ageBand(week: number): 'newborn' | 'infant' | 'mobileInfant' | 'toddler' | 'preschooler' {
  if (week < 8) return 'newborn';
  if (week < 28) return 'infant';
  if (week < 52) return 'mobileInfant';
  if (week < 104) return 'toddler';
  return 'preschooler';
}

const motorRules: Rule[] = [
  {
    pattern: /reflex|rooting|sucking|moro|startle|stepping|grasping|tight fist/i,
    explain:
      'These early movements are mostly automatic reflexes. They help with feeding, protection, and early body organization while the brain and nerves are still learning to send deliberate movement signals.',
  },
  {
    pattern: /head|neck|tummy|forearm|push|chest|wobble/i,
    explain:
      'Head control is the first major step in the head-to-toe pattern of motor development. Each lift during tummy time strengthens the neck, shoulders, and upper back needed later for sitting, crawling, and walking.',
  },
  {
    pattern: /sit|sitting|seated/i,
    explain:
      'Sitting asks the core, back, vision, and balance systems to work together. Once sitting is steadier, both hands are free for reaching, play, and self-feeding practice.',
  },
  {
    pattern: /roll|rolling|side|pivot|scoot|crawl|cruises|cruising|walk|walking|run|runs|jump|hop|climb|stairs|pedal|tricycle/i,
    explain: (week) =>
      week < 52
        ? 'Mobility grows through small linked steps: shifting weight, rotating the trunk, coordinating opposite sides of the body, and judging distance. More movement also means a bigger need for floor-level safety checks.'
        : 'This is whole-body coordination in progress. Balance, leg strength, motor planning, and visual-spatial judgment are being refined through repeated practice, including the normal stumbles.',
  },
  {
    pattern: /kick|leg|bear weight|bounces|standing|stands|step/i,
    explain:
      'Lower-body practice builds strength and balance before independent standing or walking. Supported standing and kicking are useful rehearsals, as long as the child is steady and supervised.',
  },
  {
    pattern: /hand|hands|finger|rattle|toy|midline|reach|grasps|grabs|pincer|crayon|pencil|scissor|spoon|fork|utensil|cup|page|blocks?|stack|draw|scribble|shapes?|catches|throws|kicks ball/i,
    explain: (week) =>
      week < 52
        ? 'This is fine-motor control moving from reflexive grasping toward intentional hand use. Vision, touch, and motor planning are joining up so the hands can explore, hold, release, and transfer objects.'
        : 'Fine-motor control is becoming more precise. The same hand strength, finger isolation, and eye-hand coordination used here support feeding, drawing, dressing, and later writing.',
  },
  {
    pattern: /toilet|dress|undress|zippers|buttons/i,
    explain:
      'Self-care skills combine body awareness, sequencing, language comprehension, and fine-motor control. Progress is usually uneven because several systems have to mature at the same time.',
  },
];

const cognitiveRules: Rule[] = [
  {
    pattern: /voice|face|smell|familiar|mother|caregiver|high-contrast|8.?12|patterns?|colorful|primary colors/i,
    explain:
      'Early learning is sensory and relationship-based. Familiar voices, faces, smells, contrast, and color help the brain build recognition pathways through repeated everyday exposure.',
  },
  {
    pattern: /track|tracks|moving|visual|distance|across|field|midline|object off|dropped|fallen/i,
    explain:
      'Visual tracking shows the eyes and brain are coordinating. As focus and distance vision improve, your baby can follow movement, compare objects, and prepare for more accurate reaching.',
  },
  {
    pattern: /routine|anticipates|associate|feeding|bath|bedtime|consequences|up/i,
    explain:
      'Predictable routines teach memory and cause-and-effect. Repeated patterns help your child understand what comes next and feel more secure during transitions.',
  },
  {
    pattern: /coo|vocalizing|mouth|imitates? .*sound|aah|ooh|speech|sentences?|words?|vocabulary|language|name|questions?|why|what|past|future|grammar/i,
    explain: (week) =>
      week < 52
        ? 'Understanding comes before speaking. Listening, watching mouths, copying sounds, and hearing warm back-and-forth talk build the pathways that later turn into words.'
        : 'Language is expanding from labels into meaning. Short phrases, questions, and stories show your child is linking memory, grammar, and social purpose in one system.',
  },
  {
    pattern: /cause|effect|rattle|banging|bangs|button|opens|problem|solve|experiments|gravity|drops|gadgets/i,
    explain:
      'This is early problem-solving. Repeating an action and watching the result helps the brain connect cause, effect, memory, and prediction.',
  },
  {
    pattern: /object permanence|hidden|out of sight|searches|finds|cloth/i,
    explain:
      'Object permanence means your child is learning that people and things still exist when hidden. This supports memory, separation confidence, and more complex games like peekaboo and hide-and-seek.',
  },
  {
    pattern: /imitates?|household|pretend|symbolic|block becomes|doll|using objects|function|pictures?|book|stories|events/i,
    explain: (week) =>
      week < 78
        ? 'Imitation is how babies turn observation into learning. Copying gestures, sounds, and object use helps them practice the same everyday sequences they see adults do.'
        : 'Pretend and symbolic play show abstract thinking: one object or action can stand for another. That same representational skill supports language, storytelling, and early literacy.',
  },
  {
    pattern: /sort|categor|match|same|different|opposites|colors?|shapes?|counts?|one|many|first|then|last|letters?|written name|print/i,
    explain:
      'Sorting, counting, matching, and sequencing are early concept-building skills. Your child is learning that objects and words can belong to groups, orders, and patterns.',
  },
  {
    pattern: /body parts|self|own name|reflection/i,
    explain:
      'Self-knowledge is becoming more concrete. Naming body parts, recognizing a reflection, or responding to a name helps build a stable sense of "me."',
  },
  {
    pattern: /attention|studies|fascinated|remembers|recognizes|looks from object to face/i,
    explain:
      'Attention and memory strengthen through repetition. When your child studies something, they are comparing details, storing patterns, and deciding what is worth exploring again.',
  },
];

const socialRules: Rule[] = [
  {
    pattern: /calm|comfort|swaddled|touch|voice|heartbeat|song|routine|secure|attachment/i,
    explain:
      'Warm, repeated responses teach safety. Being held, soothed, and answered helps your baby build trust and gradually learn emotional regulation.',
  },
  {
    pattern: /eye contact|gazes|face|smile|laugh|giggle|joy|expressions?|surprise/i,
    explain:
      'Face-to-face exchange is social learning. Smiles, eye contact, and laughter teach your child that their actions can invite a response from someone they love.',
  },
  {
    pattern: /cry|cries|fuss|needs|hunger|discomfort|wake windows/i,
    explain:
      'Crying and body cues are communication, not manipulation. Responding consistently helps your child feel understood while you learn the difference between hunger, fatigue, discomfort, and overstimulation.',
  },
  {
    pattern: /coo|vocal|babbl|sounds|mama|dada|words|communicate|gestures|points|pointing|language/i,
    explain:
      'These are early conversations. Sounds, gestures, pointing, and first words let your child practice taking turns, getting help, and sharing attention before speech is fluent.',
  },
  {
    pattern: /stranger|separation|cling|jealous|preference|familiar|caregiver|reaches for/i,
    explain:
      'Preference for familiar people reflects stronger memory and attachment. Anxiety around strangers or separation often means your child can clearly tell "my people" from everyone else.',
  },
  {
    pattern: /peekaboo|games|turn-taking|give-and-take|claps|waves|bye|approval|look/i,
    explain:
      'Social games teach shared rules. Waving, clapping, turn-taking, and showing you something all practice the back-and-forth structure of communication.',
  },
  {
    pattern: /no|limits|tantrums|mine|preferences|independent|ownership|sharing|rules|bargains|negotiates/i,
    explain:
      'Big preferences are part of selfhood. Toddlers can want control before they can reliably manage impulses, so calm limits and simple choices do more than long explanations.',
  },
  {
    pattern: /empathy|affection|hugs|kisses|concern|comforts|feelings|moral|fair|complex emotions/i,
    explain:
      "Emotional understanding is widening. Your child is beginning to notice other people's feelings and practice care, even though regulation and perspective-taking are still immature.",
  },
  {
    pattern: /parallel|peers|children|cooperative|friend|play with|alongside|group|imaginary/i,
    explain:
      'Peer play develops gradually: watching nearby, playing beside others, then sharing roles and rules. Each stage builds social confidence and perspective-taking.',
  },
  {
    pattern: /self|own first name|photo|reflection|shows objects|describes events/i,
    explain:
      'A clearer sense of self is emerging. Naming themselves, recognizing photos, and telling others what happened all connect identity, memory, and relationship.',
  },
];

const sensoryRules: Rule[] = [
  {
    pattern: /bright|light|contrast|black|white|colors?|red|blue|primary|visual|tracks|faces|eyes|distance|mirror|reflection|photos/i,
    explain:
      'Vision matures quickly in the first year. Contrast, faces, color, tracking, and mirrors give the brain rich visual information to connect with memory and movement.',
  },
  {
    pattern: /sound|voice|music|singing|songs?|tone|rhythm|claps|stomps|instruments|dancing|swaying|bouncing/i,
    explain:
      'Hearing supports both comfort and language. Familiar voices, rhythm, songs, and emotional tone help your child organize sound into meaning and social connection.',
  },
  {
    pattern: /smell|taste|sweet|bitter|sour|food|foods|texture of food|mouths|mouthing|oral|temperature/i,
    explain:
      'Taste, smell, and mouth exploration are serious learning tools. They help your child identify comfort, feeding cues, textures, and eventually new foods.',
  },
  {
    pattern: /touch|warmth|closeness|cold|wetness|swaddled|rocked|motion|white noise|soothed/i,
    explain:
      'Touch and rhythm are powerful regulators. Smooth contact, warmth, rocking, and steady sound can calm an immature nervous system when the world feels too intense.',
  },
  {
    pattern: /texture|sand|water|mud|playdough|sensory|pressing|smearing|paint|messy|outdoor|nature|soil|bins|pouring|splashing/i,
    explain:
      'Hands-on sensory play lets your child compare weight, temperature, resistance, sound, and texture. Messy exploration is how the brain turns raw sensation into concepts.',
  },
  {
    pattern: /containers?|fills|dumps|drops|gravity|cause-effect|tools?|spoon|brush|gadgets|details|angles|sorts|small objects|pincer/i,
    explain:
      'Repeated object play is experimentation. Filling, dumping, dropping, turning, sorting, and using tools teach size, space, sound, weight, and cause-and-effect.',
  },
  {
    pattern: /drawing|scribbles|scissors|pencils|brushes|writing|letters|numbers|patterns|constructions|role play|pretend|dress-up/i,
    explain:
      'Sensory play is becoming symbolic and skilled. Marks, tools, costumes, letters, numbers, and constructions let your child combine touch, vision, imagination, and planning.',
  },
  {
    pattern: /routine|familiar|emotional tone|changes/i,
    explain:
      'Sensitivity to routine and emotional tone is normal. Your child uses predictable patterns and caregiver cues to decide whether a situation feels safe.',
  },
];

const fallbackByCategory: Record<InsightCategory, Record<ReturnType<typeof ageBand>, string>> = {
  motor: {
    newborn:
      'Early movement is still jerky because the nervous system is immature. Practice, touch, and short awake play help the brain gradually turn reflexes into voluntary control.',
    infant:
      'Motor skills build in layers: head control, trunk strength, reaching, rolling, and sitting. Each small practice session prepares the body for the next skill.',
    mobileInfant:
      'Movement now combines strength, balance, vision, and curiosity. Exploration is useful learning, but the environment needs to stay one step ahead of new mobility.',
    toddler:
      'Toddler movement can look chaotic because balance and judgment are still developing. Running, climbing, and carrying objects are how coordination becomes reliable.',
    preschooler:
      'At this age, movement is becoming planned and purposeful. Ball play, drawing, dressing, and climbing all refine coordination and confidence.',
  },
  cognitive: {
    newborn:
      'Newborn learning happens through repeated sensory patterns: your face, voice, smell, touch, and routines. These experiences begin wiring memory and communication pathways.',
    infant:
      'Infant thinking is built through repetition and response. Looking, listening, copying, and trying again help the brain connect action with outcome.',
    mobileInfant:
      'Your baby is becoming a small problem-solver. Searching, imitating, pointing, and testing objects show memory and cause-and-effect are getting stronger.',
    toddler:
      'Toddler thinking grows through play, language, and imitation. Everyday routines become lessons in sequence, categories, problem-solving, and self-understanding.',
    preschooler:
      'Preschool thinking is more symbolic. Stories, pretend play, counting, sorting, and questions show memory, language, and reasoning working together.',
  },
  social: {
    newborn:
      'Early social development is attachment work. Consistent feeding, soothing, eye contact, and gentle handling teach your baby that people are safe and responsive.',
    infant:
      'Social skills grow through back-and-forth moments. Smiles, sounds, pauses, and playful imitation teach your baby that communication is shared.',
    mobileInfant:
      'Older babies use gestures, expressions, and caregiver cues to navigate the world. Attachment, stranger awareness, and shared attention are all developing together.',
    toddler:
      'Toddler social behavior reflects a growing sense of self with still-limited impulse control. Clear routines, simple choices, and warm limits help them practice.',
    preschooler:
      'Social play is becoming more cooperative and imaginative. Friendship, turn-taking, conflict, and feelings are now major parts of daily learning.',
  },
  sensory: {
    newborn:
      "Your baby's senses are active from birth but still organizing. Familiar voices, soft touch, contrast, rhythm, and scent help the world feel understandable.",
    infant:
      'Sensory input and movement develop together. Reaching, mouthing, tracking, listening, and touching all help your baby learn what objects and people are like.',
    mobileInfant:
      'Sensory exploration becomes more active as mobility grows. Your baby learns by dumping, mouthing, banging, crawling toward, and inspecting things closely.',
    toddler:
      'Toddlers use their whole bodies to investigate. Texture, sound, water, dirt, tools, and movement help them build concepts through direct experience.',
    preschooler:
      'Sensory skills now support more complex play. Drawing, cutting, rhythm, role play, and construction combine perception with planning and imagination.',
  },
};

const rulesByCategory: Record<InsightCategory, Rule[]> = {
  motor: motorRules,
  cognitive: cognitiveRules,
  social: socialRules,
  sensory: sensoryRules,
};

export function getInsightExplanation({ category, item, week }: ExplanationInput): string {
  const rule = rulesByCategory[category].find(({ pattern }) => pattern.test(item));

  if (!rule) {
    return fallbackByCategory[category][ageBand(week)];
  }

  return typeof rule.explain === 'function' ? rule.explain(week) : rule.explain;
}
