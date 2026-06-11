import { Question, Tribe } from './types';

export const QUESTIONS: Question[] = [
  {
    id: 'q1',
    text: "You're at a busy birthday party. Where would we most likely find you?",
    options: [
      { id: 'a1-1', text: "In the middle of the games or the dance floor.", scores: { [Tribe.SkyWing]: 10, [Tribe.RainWing]: 5 } },
      { id: 'a1-2', text: "Helping the host organize the schedule and keep things tidy.", scores: { [Tribe.HiveWing]: 10, [Tribe.MudWing]: 8 } },
      { id: 'a1-3', text: "Quietly watching the party from a comfortable corner.", scores: { [Tribe.NightWing]: 10, [Tribe.IceWing]: 8, Animus: 2 } },
      { id: 'a1-4', text: "Outside in the garden or backyard exploring the trees.", scores: { [Tribe.LeafWing]: 10, [Tribe.SeaWing]: 5 } },
      { id: 'a1-5', text: "Hanging out near the snacks, making sure everyone is fed.", scores: { [Tribe.MudWing]: 10, [Tribe.SandWing]: 5 } },
    ]
  },
  {
    id: 'q2',
    text: "A friend or sibling takes your favorite toy without asking. What's your reaction?",
    options: [
      { id: 'a2-1', text: "I get really loud and demand they give it back immediately.", scores: { [Tribe.SkyWing]: 10, [Tribe.HiveWing]: 5 } },
      { id: 'a2-2', text: "I stay calm and remind them of the official house rules.", scores: { [Tribe.IceWing]: 10, [Tribe.HiveWing]: 10 } },
      { id: 'a2-3', text: "I don't mind much, as long as they don't break it.", scores: { [Tribe.RainWing]: 10, [Tribe.SilkWing]: 10 } },
      { id: 'a2-4', text: "I find a clever way to get it back later without them knowing.", scores: { [Tribe.NightWing]: 10, [Tribe.SeaWing]: 5, Animus: 3 } },
      { id: 'a2-5', text: "I protect my space and tell them why it hurt my feelings.", scores: { [Tribe.LeafWing]: 10, [Tribe.MudWing]: 8 } },
    ]
  },
  {
    id: 'q3',
    text: "It's a rainy Saturday and you can't go outside. How do you spend your time?",
    options: [
      { id: 'a3-1', text: "Curled up with a book or writing secret codes.", scores: { [Tribe.NightWing]: 10, Animus: 2 } },
      { id: 'a3-2', text: "Drawing, painting, or making colorful bracelets.", scores: { [Tribe.RainWing]: 10, [Tribe.SilkWing]: 10 } },
      { id: 'a3-3', text: "Building a complex LEGO city with perfect order.", scores: { [Tribe.HiveWing]: 10, [Tribe.IceWing]: 5 } },
      { id: 'a3-4', text: "Building a cozy fort for me and my siblings.", scores: { [Tribe.MudWing]: 10 } },
      { id: 'a3-5', text: "Doing a science experiment or researching plants.", scores: { [Tribe.LeafWing]: 10, [Tribe.NightWing]: 5 } },
    ]
  },
  {
    id: 'q4',
    text: "Which 'Best Student' award would you be most proud to win at school?",
    options: [
      { id: 'a4-1', text: "The 'Master of Mystery' for solving hard problems.", scores: { [Tribe.NightWing]: 10, [Tribe.SeaWing]: 5, Animus: 3 } },
      { id: 'a4-2', text: "The 'Ultimate Helper' for being a loyal classmate.", scores: { [Tribe.MudWing]: 10, [Tribe.SilkWing]: 8 } },
      { id: 'a4-3', text: "The 'Fastest Sprinter' for winning Field Day.", scores: { [Tribe.SkyWing]: 10, [Tribe.SandWing]: 10 } },
      { id: 'a4-4', text: "The 'Garden Guardian' for caring about nature.", scores: { [Tribe.LeafWing]: 10 } },
      { id: 'a4-5', text: "The 'Perfect Marks' for following every rule exactly.", scores: { [Tribe.HiveWing]: 10, [Tribe.IceWing]: 10 } },
    ]
  },
  {
    id: 'q5',
    text: "If you were an animal in our world (not a dragon), which would you be?",
    options: [
      { id: 'a5-1', text: "A busy bee working in a perfectly run hive.", scores: { [Tribe.HiveWing]: 10 } },
      { id: 'a5-2', text: "A strong bear protecting its forest home.", scores: { [Tribe.LeafWing]: 10, [Tribe.MudWing]: 5 } },
      { id: 'a5-3', text: "A clever fox who knows all the shortcuts.", scores: { [Tribe.SandWing]: 10, [Tribe.NightWing]: 5 } },
      { id: 'a5-4', text: "A beautiful butterfly with colorful wings.", scores: { [Tribe.SilkWing]: 10, [Tribe.RainWing]: 5 } },
      { id: 'a5-5', text: "A fast dolphin playing in the ocean waves.", scores: { [Tribe.SeaWing]: 10, Animus: 2 } },
    ]
  },
  {
    id: 'q6',
    text: "You find a hidden door in the back of your closet. Where do you hope it leads?",
    options: [
      { id: 'a6-1', text: "To a secret underwater kingdom with glowing lights.", scores: { [Tribe.SeaWing]: 10, Animus: 2 } },
      { id: 'a6-2', text: "To a massive treehouse in a jungle filled with fruit.", scores: { [Tribe.RainWing]: 10, [Tribe.LeafWing]: 8 } },
      { id: 'a6-3', text: "To a high-tech lab where everything is organized and efficient.", scores: { [Tribe.HiveWing]: 10, [Tribe.IceWing]: 5 } },
      { id: 'a6-4', text: "To a library that holds the answers to every mystery.", scores: { [Tribe.NightWing]: 10, Animus: 5 } },
      { id: 'a6-5', text: "To a warm camp where I can stay with my best friends.", scores: { [Tribe.MudWing]: 10, [Tribe.SandWing]: 5 } },
    ]
  },
  {
    id: 'q7',
    text: "When you're working on a group project, what's your role?",
    options: [
      { id: 'a7-1', text: "The Leader who tells everyone exactly what to do.", scores: { [Tribe.SkyWing]: 10, [Tribe.HiveWing]: 8 } },
      { id: 'a7-2', text: "The Artist who makes the poster look amazing and colorful.", scores: { [Tribe.RainWing]: 10, [Tribe.SilkWing]: 10 } },
      { id: 'a7-3', text: "The Researcher who finds all the hard-to-find facts.", scores: { [Tribe.NightWing]: 10, [Tribe.LeafWing]: 5 } },
      { id: 'a7-4', text: "The Peacemaker who makes sure everyone is getting along.", scores: { [Tribe.MudWing]: 10, [Tribe.SilkWing]: 5 } },
      { id: 'a7-5', text: "The Editor who fixes all the mistakes and keeps it perfect.", scores: { [Tribe.IceWing]: 10, [Tribe.HiveWing]: 8 } },
    ]
  },
  {
    id: 'q8',
    text: "What's your favorite part of the playground?",
    options: [
      { id: 'a8-1', text: "The highest slide or the tallest climbing wall.", scores: { [Tribe.SkyWing]: 10, [Tribe.SandWing]: 5 } },
      { id: 'a8-2', text: "The quiet area under the trees or near the flowers.", scores: { [Tribe.LeafWing]: 10, [Tribe.SilkWing]: 8 } },
      { id: 'a8-3', text: "The sandbox where I can build tunnels and forts.", scores: { [Tribe.MudWing]: 10, [Tribe.SandWing]: 8 } },
      { id: 'a8-4', text: "The water fountain or the splash pad.", scores: { [Tribe.SeaWing]: 10 } },
      { id: 'a8-5', text: "I like making up my own secret game in the corner.", scores: { [Tribe.NightWing]: 10, [Tribe.RainWing]: 5, Animus: 2 } },
    ]
  },
  {
    id: 'q9',
    text: "If you were starting a school club, what would it be for?",
    options: [
      { id: 'a9-1', text: "Chess or Strategy games.", scores: { [Tribe.NightWing]: 10, [Tribe.HiveWing]: 8 } },
      { id: 'a9-2', text: "Gardening and protecting the environment.", scores: { [Tribe.LeafWing]: 10 } },
      { id: 'a9-3', text: "Cooking and sharing snacks with friends.", scores: { [Tribe.MudWing]: 10, [Tribe.SandWing]: 5 } },
      { id: 'a9-4', text: "Swimming or Water Sports.", scores: { [Tribe.SeaWing]: 10 } },
      { id: 'a9-5', text: "Debate or Law where we follow the rules.", scores: { [Tribe.IceWing]: 10, [Tribe.HiveWing]: 10 } },
    ]
  },
  {
    id: 'q10',
    text: "Pick the 'real world' superpower you'd actually use the most:",
    options: [
      { id: 'a10-1', text: "Being able to breathe underwater in a lake.", scores: { [Tribe.SeaWing]: 10 } },
      { id: 'a10-2', text: "Being able to change the color of my clothes instantly.", scores: { [Tribe.RainWing]: 10, [Tribe.SilkWing]: 5 } },
      { id: 'a10-3', text: "Being able to make plants grow just by touching them.", scores: { [Tribe.LeafWing]: 10 } },
      { id: 'a10-4', text: "Having a built-in internal clock and perfect memory.", scores: { [Tribe.HiveWing]: 10, [Tribe.NightWing]: 8 } },
      { id: 'a10-5', text: "Being completely immune to heat or cold.", scores: { [Tribe.SandWing]: 10, [Tribe.IceWing]: 10 } },
    ]
  },
  {
    id: 'q11',
    text: "You discover you have a power that could change the whole world, but it might change you too. What do you do?",
    options: [
      { id: 'a11-1', text: "Use it immediately to fix every problem I see.", scores: { [Tribe.SkyWing]: 5, Animus: 15 } },
      { id: 'a11-2', text: "Only use it for small things to help my family and friends.", scores: { [Tribe.MudWing]: 10, Animus: 5 } },
      { id: 'a11-3', text: "Write down strict rules for when and how I'm allowed to use it.", scores: { [Tribe.IceWing]: 10, [Tribe.HiveWing]: 10, Animus: 8 } },
      { id: 'a11-4', text: "Hide it and never use it. It's too dangerous for anyone to have.", scores: { [Tribe.NightWing]: 5, [Tribe.SeaWing]: 5, Animus: 2 } },
      { id: 'a11-5', text: "Find someone wise and ask them to help me use it safely.", scores: { [Tribe.LeafWing]: 5, [Tribe.SilkWing]: 5, Animus: 10 } },
    ]
  }
];

export const TRIBE_DESCRIPTIONS: Record<Tribe, string> = {
  [Tribe.MudWing]: "Heavily built with thick scales, usually brown, amber, or gold. They have flat heads and nostrils on top. They love family and the mud.",
  [Tribe.SandWing]: "Pale gold or white scales the color of desert sand. They have a poisonous barbed tail and can breathe fire. They are survivalists.",
  [Tribe.SkyWing]: "Enormous wings and red, gold, or orange scales. They are powerful fliers and fighters with grumpy tempers.",
  [Tribe.SeaWing]: "Blue or green or aquamarine scales. They have webs between their claws, gills, and bioluminescent scales for 'Aquatic' language.",
  [Tribe.RainWing]: "Scales that can change color like a chameleon. They have prehensile tails and shoot venom. They are peaceful and artistic.",
  [Tribe.IceWing]: "Silvery scales like ice or pale blue. They have rigid, serrated claws and narrow heads. They breathe frostbreath and live in the cold.",
  [Tribe.NightWing]: "Purplish-black scales with silver scales on the underside of their wings that look like stars. Some have mind-reading or prophecy powers.",
  [Tribe.SilkWing]: "Butterfly-like wings and vibrant colors. They can spin silk from their wrists. They are calm and cooperative.",
  [Tribe.HiveWing]: "Red, yellow, or orange scales with black stripes like a bee. They have various stingers or chemical weapons.",
  [Tribe.LeafWing]: "Green and brown scales with leaf-shaped wings. Some can communicate with plants (Leafspeak).",
  [Tribe.Hybrid]: "A unique combination of two tribes, sharing physical traits and abilities from both lineages."
};