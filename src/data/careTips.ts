import type { CareTips } from '../types';

interface CareTipsEntry extends CareTips {
  week: number;
}

const careTipsData: CareTipsEntry[] = [
  {
    week: 0,
    feeding: [
      'Feed on demand, every 1.5–3 hours. 8–12 feeds per day is normal and healthy.',
      'Hunger cues come BEFORE crying: rooting, sucking fists, turning head. Crying is a late signal.',
      'After each feed, hold baby upright for 10–20 min to reduce reflux and help release trapped air.',
    ],
    sleep: [
      'Safe sleep every time: firm flat surface, on their back, alone — no pillows, blankets, or bumpers.',
      'Swaddling mimics the womb and prevents the startle reflex from waking them. Wrap snugly but not too tight around the hips.',
      'Newborns can\'t distinguish day from night. Keep daytime bright and social; nights dark, quiet, and boring.',
    ],
    soothing: [
      'The 5 S\'s: Swaddle, Side/Stomach position (when holding), Shush, Swing, Suck. Use them together for maximum effect.',
      'White noise at 65–70 dB (fan, app, or shushing) mimics the constant sound inside the womb.',
      'If you\'re stressed, baby senses it. Put them down safely and take 5 minutes to breathe — it will help both of you.',
    ],
    health: [
      'Fever in a newborn under 8 weeks (38°C / 100.4°F or higher) is a medical emergency — go to the ER immediately.',
      'Jaundice (yellow skin/eyes) is common at days 2–5. Mild jaundice resolves on its own; severe jaundice needs treatment.',
      'Umbilical cord stump: keep dry, fold nappy below it, and let it fall off naturally (1–3 weeks). Never pull it.',
      'Watch for: fewer than 6 wet nappies per day, no stool in 48h, difficulty breathing, extreme lethargy — call your doctor.',
    ],
  },
  {
    week: 4,
    feeding: [
      'A feeding is complete when baby pulls off voluntarily, looks satisfied, and has wet diapers regularly.',
      'Growth spurts (common at 3–4 weeks) mean more frequent feeds for 2–3 days. Follow baby\'s cues.',
      'If bottle feeding, use paced feeding: hold bottle horizontal and let baby control the flow.',
    ],
    sleep: [
      'Watch for tired cues before crying: yawning, zoning out, rubbing eyes, losing interest in surroundings.',
      'Cap awake windows at 45–75 minutes. Overtiredness makes falling asleep harder, not easier.',
      'A consistent sleep environment (same place, same white noise) helps baby understand where sleep happens.',
    ],
    soothing: [
      'Baby wearing in a carrier keeps baby calm and your hands free. The warmth and motion are very soothing.',
      'For a fussy baby who has fed and been changed: try a warm bath, skin-to-skin, or a gentle car ride.',
      'It\'s safe to respond quickly to crying at this age. You cannot spoil a baby under 6 months.',
    ],
    health: [
      'First vaccines are typically given at 6–8 weeks. Check your local schedule and book the appointment now.',
      'Fever rule changes at 8 weeks: 38°C+ still needs a same-day doctor call, but is less automatically an emergency.',
      'Cradle cap (flaky scalp) is harmless. Massage with baby oil, leave 20 minutes, then brush gently with a soft brush.',
      'If baby has reflux signs (arching back, spitting up frequently, crying after feeds), mention it at the 6-week checkup.',
    ],
  },
  {
    week: 8,
    feeding: [
      'Feeding sessions may shorten (5–10 min) as baby gets more efficient — this is normal, not a supply issue.',
      'If breastfeeding, your supply is established. Feed on demand rather than by the clock.',
      'Some fussiness at the breast is normal — gas, reflux, or a fast/slow letdown. Try different positions.',
    ],
    sleep: [
      'Start a simple bedtime routine: feed → bath → song → sleep. Consistency matters more than length.',
      'Try putting baby down drowsy but awake — this is the first step toward self-settling.',
      'The 4th trimester ends soon. Expect some improvement around 12 weeks, but every baby is different.',
    ],
    soothing: [
      'Evening fussiness ("witching hour") often peaks around 6–8 weeks and typically resolves by 12 weeks.',
      'If colic is severe, try: bicycle legs, tummy massage in circles, gripe water, or warm bath.',
      'Tag team: take shifts so neither parent becomes depleted. Even 3 hours of uninterrupted sleep helps enormously.',
    ],
    health: [
      '8-week vaccines are due: typically DTaP, polio, Hib, PCV, rotavirus. Mild fever and fussiness for 24–48h is normal afterward.',
      'Give paracetamol (per weight) if baby has post-vaccine fever above 38°C and seems uncomfortable.',
      'Eczema often appears now — use fragrance-free moisturiser twice daily and avoid bubble baths.',
      'Normal at this age: sneezing (clearing airways), hiccups, noisy breathing, and occasional cross-eyes.',
    ],
  },
  {
    week: 12,
    feeding: [
      'Feeds may space out to every 3–4 hours as baby\'s stomach grows. This is a normal developmental shift.',
      'Baby may become easily distracted during feeds. Try a quiet, dimmer room with fewer stimuli.',
      'Breast milk or formula is all the nutrition needed. No water, juice, or solids until 6 months.',
    ],
    sleep: [
      'Consider a 3-nap schedule: morning nap, midday nap, late afternoon catnap. Watch wake windows of 90 min.',
      'If baby wakes in the night, wait 1–2 minutes before responding — they may resettle on their own.',
      'Room temperature 18–20°C is ideal for sleep. Use a sleep sack instead of blankets.',
    ],
    soothing: [
      'Baby is becoming more social and responsive. Sustained eye contact and talking are powerful calming tools.',
      'Gentle "shush-pat" while baby is in crib can help them resettle without being picked up every time.',
      'Teething can start any time from 3 months. Cold teether, silicone finger brush, or gentle gum rub helps.',
    ],
    health: [
      '3-month checkup: weight, length, head circumference — ask any questions you\'ve been storing up.',
      'Teething can start from 3 months but first teeth typically appear at 4–7 months. Drooling and chewing are early signs.',
      'Postpartum depression can peak at 3 months, not just the first weeks. If you\'re struggling, please tell your doctor.',
      'Sun protection: keep baby out of direct sun. After 6 months, SPF 30+ is safe. Before 6 months, use shade and clothing.',
    ],
  },
  {
    week: 16,
    feeding: [
      '4-month sleep regression often causes more night waking and increased feeding — this is temporary.',
      'Solid foods are NOT recommended yet. The World Health Organization recommends exclusive milk until 6 months.',
      'If introducing a bottle, 4 months is a good window — earlier is easier than later for bottle acceptance.',
    ],
    sleep: [
      'The 4-month sleep regression is real. Baby\'s sleep cycles have matured — they now wake between cycles like adults.',
      'If baby wakes frequently, check: overtiredness, undertiredness, hungry, too hot/cold, or developmental leap.',
      'Avoid rocking or feeding to sleep every time if you can — teaching self-settling will pay dividends now.',
    ],
    soothing: [
      'Babies this age love standing on your lap. The leg press activates calming proprioceptive input.',
      'A consistent response to crying (rather than ignoring) builds trust and actually reduces crying over time.',
      'If you\'re feeling burned out, ask for help. Parental wellbeing is not separate from baby\'s wellbeing.',
    ],
    health: [
      '4-month vaccines due: booster doses of DTaP, polio, Hib, PCV. Book the appointment now.',
      'Watch for ear infection signs: tugging ear, unusually fussy, fever, trouble sleeping — see your doctor.',
      'Flat spots on baby\'s head (positional plagiocephaly) can develop. Increase tummy time and alternate which end of the cot baby\'s head is.',
      'Respiratory syncytial virus (RSV) causes cold-like symptoms but can be serious in babies. Keep sick visitors away.',
    ],
  },
  {
    week: 20,
    feeding: [
      'Signs of solid food readiness (target 6 months): sitting with support, lost tongue-thrust reflex, interest in food.',
      'Continue breast milk or formula as the primary nutrition source — solids complement, not replace.',
      'If introducing solids early on medical advice, start with smooth single-ingredient purees.',
    ],
    sleep: [
      'Most 5-month-olds do 2–3 naps. Transition to 2 naps usually happens between 6–9 months.',
      'If sleep has improved since the 4-month regression — enjoy it. If not, consistent sleep training is now appropriate.',
      'Establish a wind-down ritual: dim lights 30 min before bed, quiet play, warm bath, feed, song.',
    ],
    soothing: [
      'Baby is becoming aware of strangers — some anxiety is starting. Always introduce new people slowly.',
      'Separation anxiety is beginning. A consistent goodbye ritual (short, cheerful, always followed by return) builds trust.',
      'Distraction is highly effective now: a new toy, changing rooms, or going outside can quickly shift mood.',
    ],
    health: [
      'No scheduled vaccines at 5 months in most countries — but check your local schedule.',
      'Baby-proofing: now is the time to start. Rolling leads to crawling faster than you think.',
      'Never leave baby unattended on a raised surface — rolling happens suddenly and without warning.',
      'If baby is drooling heavily, that\'s teething preparation. Keep skin dry to avoid drool rash.',
    ],
  },
  {
    week: 24,
    feeding: [
      'Start solid foods if baby shows readiness signs. Begin with 1–2 teaspoons once daily of smooth purees.',
      'Introduce one new food every 3 days to watch for allergic reactions. Common allergens can be introduced early.',
      'Never force feed. Turning away, closing mouth, or crying are clear "I\'m done" signals.',
    ],
    sleep: [
      'Most 6-month-olds can sleep 6–8 hours without a feed. Longer night feeds may now be habit rather than hunger.',
      'If needed, sleep training methods like Ferber, chair method, or fading are effective and safe at 6 months.',
      'Introduce a comfort object (lovey) now if you like — a small stuffed animal that always goes to sleep with them.',
    ],
    soothing: [
      'Teething pain peaks around 6–8 months (lower front teeth). Chilled teether, cold washcloth, or teething gel helps.',
      'Separation anxiety is increasing. Peek-a-boo games directly teach "I leave, I come back" — play it often.',
      'Baby\'s growing independence means some frustration when they can\'t do things yet. Narrate their feelings.',
    ],
    health: [
      '6-month checkup and vaccines due: boosters + flu vaccine (first time needs 2 doses, 4 weeks apart).',
      'First teeth arriving: start brushing twice daily with a smear of fluoride toothpaste as soon as the first tooth appears.',
      'Introduce common allergens (peanut, egg, dairy, wheat) one at a time from 6 months — early introduction reduces allergy risk.',
      'Choking hazard review: any object smaller than a toilet paper roll is a choking risk. Check floors and low surfaces.',
    ],
  },
  {
    week: 28,
    feeding: [
      'Move from purees to mashed and lumpy textures to encourage chewing development.',
      'Introduce a sippy cup or open cup with water at mealtimes. It\'s a skill — expect mess.',
      'Baby may suddenly refuse a food they loved last week. Keep offering — it takes 10–15 exposures for acceptance.',
    ],
    sleep: [
      'The 8-month sleep regression often disrupts sleep just when things were going well. It\'s temporary.',
      'If baby is crawling or pulling to stand in the crib, night waking to practice is common. Reassure briefly and leave.',
      'Avoid long stretches awake before bed — overtired babies fight sleep harder.',
    ],
    soothing: [
      'Separation anxiety peaks around 8–10 months. Always say goodbye — sneaking out makes anxiety worse.',
      'Predictable routines are your best tool. When baby knows what\'s next, they feel safe.',
      'Baby is testing cause-and-effect with everything including your reactions. Stay calm and consistent.',
    ],
    health: [
      'No new vaccines at 7 months in most schedules — but flu vaccine second dose may be due.',
      'Baby-proof urgently if you haven\'t: crawling means access to everything at floor level.',
      'Water safety: never leave baby unattended near any water — baths, buckets, pools. Drowning is silent and fast.',
      'Signs of ear infection: fever, tugging ear, waking more at night, fussier than usual after a cold. See your doctor.',
    ],
  },
  {
    week: 32,
    feeding: [
      'Finger foods begin: soft pieces of banana, avocado, cooked carrot. Pincer grasp is developing — let them try.',
      'Gagging is normal and different from choking. Gagging = normal protective reflex; choking = silent, unable to breathe.',
      'Family mealtimes together are the single best predictor of lifelong healthy eating. Eat together when possible.',
    ],
    sleep: [
      'Most 8-month-olds do 2 naps (morning + afternoon). Some nights may still have 1–2 wake-ups.',
      'A consistent 7–8pm bedtime works well for most babies this age.',
      'If night waking is for feeding, consider a "dream feed" at 10–11pm to extend the longest stretch.',
    ],
    soothing: [
      'A comfort object (stuffed animal, small blanket) is now very helpful for self-soothing. Make sure it\'s safe.',
      'Loud sounds or sudden changes can cause distress now. Prepare baby verbally before transitions.',
      'When baby is frustrated, naming the emotion + offering an alternative is more effective than distraction alone.',
    ],
    health: [
      '9-month checkup due: developmental screening, iron levels, and lead screening in some areas.',
      'Know infant choking first aid: 5 back blows + 5 chest thrusts for babies under 1 year. Save the video now.',
      'Baby teeth: brush morning and night with a smear of fluoride toothpaste. Avoid sugary drinks, even juice.',
      'Cold and flu season: hand washing is the most effective prevention. Keep hand sanitiser at every entry point.',
    ],
  },
  {
    week: 36,
    feeding: [
      'Move toward 3 mini-meals with family foods plus snacks. Continue breast milk or formula 2–3 times daily.',
      'Avoid added salt, sugar, and honey (honey not until 12 months due to botulism risk).',
      'Let baby self-feed as much as possible — it\'s messy but critical for developing food competence.',
    ],
    sleep: [
      '9-month sleep regression is common. It\'s developmental — their growing brain is working overtime.',
      'Avoid letting baby fall asleep on breast/bottle every time if possible — it can become a sleep association.',
      'If nap is being skipped, move bedtime earlier (6:30pm is not too early for a 9-month-old).',
    ],
    soothing: [
      'Baby will look to you for emotional cues ("social referencing"). Model calm in uncertain situations.',
      'Physical movement is deeply soothing — swing, rock, bounce, or go for a walk when upset.',
      'First words are forming in baby\'s mind. Respond to all their vocalizations to encourage language.',
    ],
    health: [
      'Update your baby-proofing: pulling to stand means tables, bookshelves, and TVs are now accessible.',
      'Anchor all tall furniture to the wall — tip-over accidents are a leading cause of infant injury.',
      'Vision check: baby should be tracking objects smoothly. Persistent squinting or eye turning needs assessment.',
      'Dental first visit is recommended by 12 months or when the first tooth appears, whichever comes first.',
    ],
  },
  {
    week: 44,
    feeding: [
      'Transition from purees completely to soft family foods. Baby can eat most of what you eat now.',
      'Whole cow\'s milk can replace formula at 12 months. Introduce gradually — offer in a cup.',
      'If baby refuses a meal, offer water and remove the plate. Don\'t replace with preferred food — that teaches refusal.',
    ],
    sleep: [
      'Most 10-month-olds sleep 10–12 hours at night with 2 naps, transitioning to 1 nap around 12–15 months.',
      'Some night crying is normal and doesn\'t always need a response. Wait 2–3 minutes before going in.',
      'Beware of overtiredness — a 7pm bedtime is better than 9pm for preventing night waking.',
    ],
    soothing: [
      'Baby is now very attached to you. This is healthy and means the attachment relationship is secure.',
      'Tantrums are just starting. Acknowledge the feeling, hold a boundary, offer comfort after — in that order.',
      'Reading together every night is both soothing and one of the highest-ROI activities for development.',
    ],
    health: [
      'Almost time for the 12-month checkup — it includes MMR, varicella, and Hep A vaccines in most schedules.',
      'Walking practice: soft-soled shoes or bare feet are best for indoor walking. Hard soles reduce proprioceptive feedback.',
      'Check car seat: at 12 months, most children should still be rear-facing. Check your country\'s guidelines.',
      'Avoid screen time before age 2 (except video calls). Even background TV affects language development.',
    ],
  },
  {
    week: 52,
    feeding: [
      'Transition to whole cow\'s milk at 12 months if not breastfeeding. Limit to 16–24 oz per day.',
      'Baby can now eat almost all family foods. Avoid: hard round foods (choking hazard), honey, added salt/sugar.',
      'Let go of purees entirely — lumpy and textured foods encourage jaw development and reduce pickiness.',
    ],
    sleep: [
      'Most 1-year-olds sleep 10–12 hours at night plus 1–2 daytime naps totaling 2–3 hours.',
      'Separation anxiety at bedtime is common at 12 months. A consistent, warm bedtime routine helps enormously.',
      'If sleep has regressed around the birthday, it\'s a developmental sleep regression — usually resolves in 2–4 weeks.',
    ],
    soothing: [
      'Tantrums will increase over the next year as toddler\'s desires outpace their language. Stay calm and empathetic.',
      'Acknowledge feelings before addressing behavior: "You\'re so upset. It\'s hard when we have to stop playing."',
      'Physical activity during the day leads to better sleep at night. Daily outdoor time is highly recommended.',
    ],
    health: [
      '12-month checkup: MMR, varicella, Hep A vaccines. Also iron screening, developmental check, and lead test.',
      'Dental: schedule the first dentist appointment if you haven\'t. Clean teeth twice daily with fluoride toothpaste (smear).',
      'Stair gates must be at top and bottom of all stairs. Walking toddlers fall — often.',
      'Pool and bath safety: never leave alone near water. Drowning can happen in 2 inches of water in under 30 seconds.',
    ],
  },
  {
    week: 61,
    feeding: [
      'Serve meals on a predictable schedule — 3 meals + 2 snacks. Toddlers eat better when they know when food is coming.',
      'Offer variety even after rejection. It can take 15–20 exposures to a new food before acceptance — keep going.',
      'Avoid using food as reward or punishment. "Eat your vegetables to get dessert" increases vegetable rejection.',
    ],
    sleep: [
      'Toddlers 13–18 months need 11–14 hours total. A consistent 7–7:30pm bedtime is ideal.',
      'Nap transition (2 to 1 nap) typically happens 13–18 months. Signs: nap refusal, trouble falling asleep at bedtime.',
      'Bedtime stalling is starting. Set a clear, short routine (20 min max) and stick to it without negotiation.',
    ],
    soothing: [
      'When a tantrum starts, don\'t try to reason — the rational brain is offline. Stay near, stay calm, wait for the storm to pass.',
      'Consistency is everything. Rules enforced only sometimes are enforced never — pick your battles wisely.',
      'Physical activity is a natural mood regulator. If toddler is fussy, try 20 minutes of active outdoor play.',
    ],
    health: [
      '15-month checkup due: DTaP booster, Hib booster, PCV booster, varicella booster, Hep A second dose.',
      'Toddler-proof the home: move cleaning products, medications, and sharp objects out of reach permanently.',
      'Screen time: World Health Organization recommends zero screens (except video calls) under 2 years old.',
      'Dental: toothbrushing can be a battle. Let them hold the brush first, then you do the actual cleaning.',
    ],
  },
  {
    week: 78,
    feeding: [
      'Food jags (eating only one food) peak around 18 months. Continue offering variety alongside the preferred food.',
      '18-month vocabulary explosion includes food words. Name every food enthusiastically at every meal.',
      'Avoid screens during mealtimes — distracted eating disconnects toddlers from their hunger signals.',
    ],
    sleep: [
      '18-month sleep regression is real and driven by developmental leaps. It typically lasts 2–6 weeks.',
      'Most 18-month-olds are on 1 nap. Transition if: taking forever to fall asleep for nap, OR night sleep is affected.',
      'Sleep training is still effective at 18 months. Consistency over 3–5 nights is usually enough.',
    ],
    soothing: [
      'The "terrible twos" start now for many toddlers. Language frustration (wanting to say more than they can) drives many tantrums.',
      'Offer choices: "Red cup or blue cup?" Real choices reduce power struggles without sacrificing structure.',
      'Validate first, redirect second: "I know you\'re angry. You can\'t hit. Would you like to stomp your feet instead?"',
    ],
    health: [
      '18-month checkup: hepatitis A second dose, influenza vaccine, developmental and autism screening.',
      'Language milestone: 18-month-olds should have at least 10–20 words. Fewer than 10 words warrants a speech referral.',
      'Iron-rich foods are important now: red meat, beans, fortified cereals. Toddlers are at risk of iron deficiency.',
      'Sun safety: SPF 30+ on all exposed skin, re-apply every 2 hours. A rash guard + hat is better than sunscreen alone.',
    ],
  },
  {
    week: 95,
    feeding: [
      'Most 22-month-olds can use a fork and spoon. Let them — even if it\'s slower and messier.',
      'Involve toddler in simple food prep: washing vegetables, stirring, tearing bread. They\'ll eat what they helped make.',
      'A predictable mealtime environment (same chairs, same time, no screens) significantly reduces mealtime battles.',
    ],
    sleep: [
      'If nap is still happening, protect it — toddlers who skip nap are often overtired and harder to put to bed.',
      'Nighttime fears can start at this age. A small nightlight and brief check-ins are appropriate responses.',
      'Bedtime should be early enough that toddler wakes naturally (not dragged out of bed) at the desired morning time.',
    ],
    soothing: [
      'Emotional coaching: name the feeling, validate it, then help solve. "You\'re sad the park is over. That\'s hard. What would help?"',
      'Natural consequences work better than punishment at this age: "You threw the toy, so toy goes away for now."',
      'Give a 5-minute warning before transitions ("In 5 minutes we leave the park"). Toddlers can\'t read clocks but they feel fairness.',
    ],
    health: [
      '2-year checkup is coming up — a big developmental assessment. Note any speech, behavior, or physical concerns beforehand.',
      'Toilet training readiness signs: staying dry for 1–2 hours, interest in the toilet, able to pull pants up/down.',
      'Vision: if toddler frequently holds things close, squints, or avoids puzzles/books, ask for a vision screen.',
      'Dental checkup every 6 months. Brush twice daily — make it fun with songs, timers, or a special toothbrush.',
    ],
  },
  {
    week: 104,
    feeding: [
      'A toddler\'s stomach is about the size of their fist — portions are small. Avoid pressure to eat more.',
      'At 2 years, toddlers can eat everything the family eats. Adventurous eating is shaped by variety, not insistence.',
      'Transition from whole milk to 2% if desired at 2 years. Continue limiting milk to 16–20 oz per day.',
    ],
    sleep: [
      'Most 2-year-olds need 11–14 hours total sleep. A consistent 7–7:30pm bedtime leads to earlier, easier wake-up.',
      'Toddler bed transition: wait until 2–2.5 years if possible, or until baby climbs out of crib. Later is usually easier.',
      'Bedtime fears and delay tactics increase around 2. Keep the routine firm and warm: read, song, lights out.',
    ],
    soothing: [
      'Language is exploding — use it. "I can see you\'re very frustrated. Can you use your words to tell me?"',
      'Time-outs are most effective at 2+ years. Keep them short: 1 minute per year of age (2 min at 2 years).',
      'Toddlers regulate emotions through co-regulation with you. Your calm face literally calms their nervous system.',
    ],
    health: [
      '2-year checkup: full developmental assessment including speech, motor, social-emotional, and autism screening.',
      'Speech milestone: 2-year-olds should have 50+ words and be combining 2 words. Fewer warrants a speech referral.',
      'Dental: first dental X-rays may be taken at this visit. Ensure brushing twice daily with a pea-sized amount of fluoride toothpaste.',
      'Physical activity: WHO recommends at least 180 minutes of physical activity per day at this age (including active play).',
    ],
  },
  {
    week: 117,
    feeding: [
      'The "why" phase extends to food. Answer honestly: "We eat vegetables because they make our bodies strong."',
      'Model adventurous eating yourself. Toddlers are far more influenced by what they see you eat than what you tell them.',
      'If mealtimes are battles, try family-style serving (everyone serves themselves) — autonomy improves eating.',
    ],
    sleep: [
      'Some 27-month-olds begin resisting naps. Offer "quiet time" (30–60 min in their room) whether they sleep or not.',
      'Night terrors can start around 2–3 years. Different from nightmares: child seems awake but isn\'t. Don\'t wake them — stay calm, keep them safe.',
      'Move bedtime earlier if nap was skipped — overtired toddlers fall asleep badly and wake more at night.',
    ],
    soothing: [
      'Imaginative play is rich now. Playing out scenarios ("the baby is scared") helps toddlers process emotions safely.',
      'Logical consequences are landing now: "You pushed your friend, so we\'re leaving the playdate."',
      'If tantrums are getting bigger, check for triggers: hunger, tiredness, overstimulation, transition stress.',
    ],
    health: [
      'Toilet training: most children train between 2–3 years. Pressure and punishment slow the process — patience and praise work.',
      'Screen time: WHO recommends limiting to 1 hour per day for 2–5 year olds. Choose high-quality, co-viewed content.',
      'Road safety: always hold hands near roads. Model looking both ways every single time — they\'re watching.',
      'Hearing: if toddler isn\'t following instructions or seems to ignore you often, ask for a hearing test.',
    ],
  },
  {
    week: 130,
    feeding: [
      'Involve toddler in meal planning ("Should we have carrots or peas?"). Ownership improves eating.',
      'Eating together as a family — even once a day — is the strongest predictor of healthy eating habits long-term.',
      'Avoid the "clean plate club." Toddlers have natural appetite regulation — honor it.',
    ],
    sleep: [
      'Nap may be dropping now for some 2.5-year-olds. Replace with mandatory quiet time — still beneficial for rest.',
      'Nighttime potty training typically begins around 2.5–3. Use a waterproof mattress cover. Wait until consistently dry at nap.',
      'Consistent bedtime + wake time leads to more regulated sleep hormones and fewer bedtime battles.',
    ],
    soothing: [
      'Problem-solving together: "You\'re upset your tower fell. What can we do?" Builds self-regulation and resilience.',
      'Acknowledge positives: "I noticed how gently you shared that toy." Positive attention is more powerful than correction.',
      'Watch your own reaction to mistakes — toddlers model how you handle frustration.',
    ],
    health: [
      'Dental checkup every 6 months. Some children need fissure sealants — ask your dentist.',
      'Sun protection year-round: UV damage accumulates. Hat + SPF 30+ on all exposed skin whenever outdoors.',
      'Handwashing: make it a non-negotiable before meals and after toileting. 20 seconds minimum.',
      'Sleep hygiene: bedroom should be for sleep only — remove toys and screens from the sleep environment.',
    ],
  },
  {
    week: 143,
    feeding: [
      'By 33 months, toddlers can use cutlery well. Let them serve themselves — it builds independence and appetite.',
      'Introduce new foods alongside familiar favorites. The new food has a better chance when stress is low.',
      'Smoothies and soups are effective ways to include vegetables if texture is still an issue.',
    ],
    sleep: [
      'Many 33-month-olds drop the nap or take it irregularly. Move bedtime to 6:30–7pm on no-nap days.',
      'Nighttime fears are common now. A consistent reassurance ritual ("I check on you, you\'re safe") is more effective than a long chat.',
      'Keep the bedroom calm, cool (18–20°C), and dark. A small nightlight is fine if it helps.',
    ],
    soothing: [
      'At this age, "calm-down corner" works better than time-out: a cozy spot with soft things to go to when overwhelmed.',
      'Teach deep breathing: "Let\'s smell the flowers (in) and blow out the candles (out)." They can use it.',
      'Preschool transition may be coming — talk about it positively, visit beforehand, and read books about starting school.',
    ],
    health: [
      '3-year checkup is coming up: vision screening, hearing screen, blood pressure, developmental assessment.',
      'Preschool vaccines: check your schedule for DTaP booster, polio, MMR, and varicella boosters around age 4–5.',
      'Dental: twice daily brushing, 6-monthly checkups, limit sugary snacks and drinks.',
      'Physical activity: 180+ minutes per day including at least 60 minutes of energetic play. Limit sitting to under 1 hour at a stretch.',
    ],
  },
  {
    week: 156,
    feeding: [
      'By 3 years, most children eat what the family eats with no modification. This is the goal — you\'re there!',
      'Encourage helping in the kitchen: stirring, pouring, washing. Early cooks become less picky eaters.',
      'Model a healthy relationship with food. Avoid labeling foods "good" or "bad" — use "everyday" and "sometimes" foods.',
    ],
    sleep: [
      'Most 3-year-olds sleep 10–13 hours. A regular schedule matters more than exact hours.',
      'If the nap has dropped, move bedtime earlier (6:30–7pm) to prevent overtiredness.',
      'At 3, children can understand simple sleep rules. A visual "bedtime routine chart" gives them ownership.',
    ],
    soothing: [
      'Three-year-olds have enough language to talk through feelings. "Tell me what happened. How did that feel?" is very effective.',
      'Physical activity every day is as important as sleep for mood regulation — aim for at least 1 hour of active outdoor play.',
      'You\'ve been doing this for 3 years. Trust your instincts — they\'ve gotten you here.',
    ],
    health: [
      '3-year checkup: vision and hearing screening, developmental and behavioral assessment, blood pressure.',
      'Vision: 3 is the age for a formal eye exam before preschool. Amblyopia ("lazy eye") is treatable if caught early.',
      'Dental: pea-sized fluoride toothpaste now (up from smear). 6-monthly checkups. Limit juice to 4 oz per day.',
      'Preschool readiness: ensure vaccines are up to date before enrollment. Check your school\'s requirements.',
    ],
  },
];

const careTipsMap = new Map(careTipsData.map(e => [e.week, e]));

export function getCareTips(week: number): CareTips {
  const clamped = Math.min(week, 156);
  if (careTipsMap.has(clamped)) {
    const { feeding, sleep, soothing, health } = careTipsMap.get(clamped)!;
    return { feeding, sleep, soothing, health };
  }
  for (let w = clamped - 1; w >= 0; w--) {
    if (careTipsMap.has(w)) {
      const { feeding, sleep, soothing, health } = careTipsMap.get(w)!;
      return { feeding, sleep, soothing, health };
    }
  }
  const { feeding, sleep, soothing, health } = careTipsData[0];
  return { feeding, sleep, soothing, health };
}

export function getSoothingLabel(week: number): string {
  if (week >= 104) return 'Wellbeing';
  if (week >= 52)  return 'Settling';
  return 'Soothing';
}
