export const WORD_BANK:string[]=[
    'time', 'year', 'people', 'way', 'day', 'thing', 'man', 'world', 'life',
    'hand', 'part', 'child', 'eye', 'place', 'work', 'week', 'case', 'point',
    'fact', 'month', 'story', 'water', 'room', 'friend', 'reason', 'chance',
    'family', 'system', 'moment', 'letter', 'level', 'office', 'body', 'idea',
    'field', 'group', 'music', 'light', 'order', 'plan', 'money', 'power',
    'value', 'city', 'street', 'book', 'issue', 'side', 'kind', 'head',
];

export function generateWords(count : number) : string[]{
    const words:string[]=[];
    for(let i=0;i<count;i++){
        const randomIndex=Math.floor(Math.random()*WORD_BANK.length);
        words.push(WORD_BANK[randomIndex]);
    }
    return words;
}