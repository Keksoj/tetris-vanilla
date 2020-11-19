export const PAUSE_MESSAGES = [
    'Tetris was invented by Алексе́й Па́житнов',
    'Stop playing and stretch your neck.',
    'Strč prst skrz krk!',
    "Pas mal, non ? C'est français.",
    'Embauchez-moi !',
    // Saitama-sama atama ii desu ne!
    'サイタマ様頭いいですね!',
    'Harder, better, faster, stronger.',
    "L'inventeur de Cookie Clicker s'appelle Orteil.",
    'Love it or leave it.',
    'Pour la beauté du code !',
    'Pause toujours !',
    'Fun fact: an elephant has four kneels.',
    'Mann vermisse ich Deutsch.',
    'Prenez du temps pour vous.',
];

// inspired by legacy Tetris for Game Boy
export const LEVEL_TO_TICK_TIME = {
    0: 887,
    1: 820,
    2: 753,
    3: 686,
    4: 619,
    5: 552,
    6: 469,
    7: 368,
    8: 285,
    9: 184,
    10: 167,
    11: 151,
    12: 134,
    13: 117,
    14: 100,
    15: 100,
    16: 84,
    17: 84,
    18: 67,
    19: 50,
    20: 50,
};

// I would be glad to replace the gameOver() boilerplate with something like:
const SCORE_COMMENT = [
    { threshold: 80, comment: 'Are you God?' },
    { threshold: 60, comment: 'Really good' },
    { threshold: 40, comment: 'Fair game' },
    { threshold: 20, comment: 'At least you tried' },
    { threshold: 0, comment: 'You are a noob.' },
];
