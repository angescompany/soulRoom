const API_KEY = 'XFbZvIeSRLnktLk31JcZQ'; // Should be env var in production

export const BIBLE_BOOKS = [
    // Old Testament
    { id: 'genesis', name: 'Génesis', chapters: 50, test: 'AT' },
    { id: 'exodus', name: 'Éxodo', chapters: 40, test: 'AT' },
    { id: 'leviticus', name: 'Levítico', chapters: 27, test: 'AT' },
    { id: 'numbers', name: 'Números', chapters: 36, test: 'AT' },
    { id: 'deuteronomy', name: 'Deuteronomio', chapters: 34, test: 'AT' },
    { id: 'joshua', name: 'Josué', chapters: 24, test: 'AT' },
    { id: 'judges', name: 'Jueces', chapters: 21, test: 'AT' },
    { id: 'ruth', name: 'Rut', chapters: 4, test: 'AT' },
    { id: '1samuel', name: '1 Samuel', chapters: 31, test: 'AT' },
    { id: '2samuel', name: '2 Samuel', chapters: 24, test: 'AT' },
    { id: '1kings', name: '1 Reyes', chapters: 22, test: 'AT' },
    { id: '2kings', name: '2 Reyes', chapters: 25, test: 'AT' },
    { id: '1chronicles', name: '1 Crónicas', chapters: 29, test: 'AT' },
    { id: '2chronicles', name: '2 Crónicas', chapters: 36, test: 'AT' },
    { id: 'ezra', name: 'Esdras', chapters: 10, test: 'AT' },
    { id: 'nehemiah', name: 'Nehemías', chapters: 13, test: 'AT' },
    { id: 'esther', name: 'Ester', chapters: 10, test: 'AT' },
    { id: 'job', name: 'Job', chapters: 42, test: 'AT' },
    { id: 'psalms', name: 'Salmos', chapters: 150, test: 'AT' },
    { id: 'proverbs', name: 'Proverbios', chapters: 31, test: 'AT' },
    { id: 'ecclesiastes', name: 'Eclesiastés', chapters: 12, test: 'AT' },
    { id: 'songofsolomon', name: 'Cantares', chapters: 8, test: 'AT' },
    { id: 'isaiah', name: 'Isaías', chapters: 66, test: 'AT' },
    { id: 'jeremiah', name: 'Jeremías', chapters: 52, test: 'AT' },
    { id: 'lamentations', name: 'Lamentaciones', chapters: 5, test: 'AT' },
    { id: 'ezekiel', name: 'Ezequiel', chapters: 48, test: 'AT' },
    { id: 'daniel', name: 'Daniel', chapters: 12, test: 'AT' },
    { id: 'hosea', name: 'Oseas', chapters: 14, test: 'AT' },
    { id: 'joel', name: 'Joel', chapters: 3, test: 'AT' },
    { id: 'amos', name: 'Amós', chapters: 9, test: 'AT' },
    { id: 'obadiah', name: 'Abdías', chapters: 1, test: 'AT' },
    { id: 'jonah', name: 'Jonás', chapters: 4, test: 'AT' },
    { id: 'micah', name: 'Miqueas', chapters: 7, test: 'AT' },
    { id: 'nahum', name: 'Nahúm', chapters: 3, test: 'AT' },
    { id: 'habakkuk', name: 'Habacuc', chapters: 3, test: 'AT' },
    { id: 'zephaniah', name: 'Sofonías', chapters: 3, test: 'AT' },
    { id: 'haggai', name: 'Hageo', chapters: 2, test: 'AT' },
    { id: 'zechariah', name: 'Zacarías', chapters: 14, test: 'AT' },
    { id: 'malachi', name: 'Malaquías', chapters: 4, test: 'AT' },

    // New Testament
    { id: 'matthew', name: 'Mateo', chapters: 28, test: 'NT' },
    { id: 'mark', name: 'Marcos', chapters: 16, test: 'NT' },
    { id: 'luke', name: 'Lucas', chapters: 24, test: 'NT' },
    { id: 'john', name: 'Juan', chapters: 21, test: 'NT' },
    { id: 'acts', name: 'Hechos', chapters: 28, test: 'NT' },
    { id: 'romans', name: 'Romanos', chapters: 16, test: 'NT' },
    { id: '1corinthians', name: '1 Corintios', chapters: 16, test: 'NT' },
    { id: '2corinthians', name: '2 Corintios', chapters: 13, test: 'NT' },
    { id: 'galatians', name: 'Gálatas', chapters: 6, test: 'NT' },
    { id: 'ephesians', name: 'Efesios', chapters: 6, test: 'NT' },
    { id: 'philippians', name: 'Filipenses', chapters: 4, test: 'NT' },
    { id: 'colossians', name: 'Colosenses', chapters: 4, test: 'NT' },
    { id: '1thessalonians', name: '1 Tesalonicenses', chapters: 5, test: 'NT' },
    { id: '2thessalonians', name: '2 Tesalonicenses', chapters: 3, test: 'NT' },
    { id: '1timothy', name: '1 Timoteo', chapters: 6, test: 'NT' },
    { id: '2timothy', name: '2 Timoteo', chapters: 4, test: 'NT' },
    { id: 'titus', name: 'Tito', chapters: 3, test: 'NT' },
    { id: 'philemon', name: 'Filemón', chapters: 1, test: 'NT' },
    { id: 'hebrews', name: 'Hebreos', chapters: 13, test: 'NT' },
    { id: 'james', name: 'Santiago', chapters: 5, test: 'NT' },
    { id: '1peter', name: '1 Pedro', chapters: 5, test: 'NT' },
    { id: '2peter', name: '2 Pedro', chapters: 3, test: 'NT' },
    { id: '1john', name: '1 Juan', chapters: 5, test: 'NT' },
    { id: '2john', name: '2 Juan', chapters: 1, test: 'NT' },
    { id: '3john', name: '3 Juan', chapters: 1, test: 'NT' },
    { id: 'jude', name: 'Judas', chapters: 1, test: 'NT' },
    { id: 'revelation', name: 'Apocalipsis', chapters: 22, test: 'NT' }
];

// Helper to map simplified IDs to API.Bible IDs 
// Note: Extending this map is needed for full support, effectively passing through 3-letter codes for standard ones
const mapToApiBibleBookId = (internalId) => {
    const map = {
        'genesis': 'GEN', 'exodus': 'EXO', 'leviticus': 'LEV', 'numbers': 'NUM', 'deuteronomy': 'DEU',
        'joshua': 'JOS', 'judges': 'JDG', 'ruth': 'RUT', '1samuel': '1SA', '2samuel': '2SA',
        '1kings': '1KI', '2kings': '2KI', '1chronicles': '1CH', '2chronicles': '2CH', 'ezra': 'EZR',
        'nehemiah': 'NEH', 'esther': 'EST', 'job': 'JOB', 'psalms': 'PSA', 'proverbs': 'PRO',
        'ecclesiastes': 'ECC', 'songofsolomon': 'SNG', 'isaiah': 'ISA', 'jeremiah': 'JER',
        'lamentations': 'LAM', 'ezekiel': 'EZE', 'daniel': 'DAN', 'hosea': 'HOS', 'joel': 'JOL',
        'amos': 'AMO', 'obadiah': 'OBA', 'jonah': 'JON', 'micah': 'MIC', 'nahum': 'NAM',
        'habakkuk': 'HAB', 'zephaniah': 'ZEP', 'haggai': 'HAG', 'zechariah': 'ZEC', 'malachi': 'MAL',
        'matthew': 'MAT', 'mark': 'MRK', 'luke': 'LUK', 'john': 'JHN', 'acts': 'ACT',
        'romans': 'ROM', '1corinthians': '1CO', '2corinthians': '2CO', 'galatians': 'GAL',
        'ephesians': 'EPH', 'philippians': 'PHP', 'colossians': 'COL', '1thessalonians': '1TH',
        '2thessalonians': '2TH', '1timothy': '1TI', '2timothy': '2TI', 'titus': 'TIT',
        'philemon': 'PHM', 'hebrews': 'HEB', 'james': 'JAS', '1peter': '1PE', '2peter': '2PE',
        '1john': '1JN', '2john': '2JN', '3john': '3JN', 'jude': 'JUD', 'revelation': 'REV'
    };
    return map[internalId] || 'GEN';
};

const getDemoVerses = (bookId, chapter) => {
    return [
        { verse: '1', text: `Contenido de demostración para ${bookId} capítulo ${chapter}.` },
        { verse: '2', text: 'La versión completa se cargará cuando el servidor esté disponible.' },
        { verse: '3', text: 'Dios es fiel en todo tiempo.' }
    ];
};

export const fetchBibleChapter = async (version, bookId, chapter) => {
    // 1. API.Bible Flow (Official Versions)
    const apiBibleVersions = {
        'es-rv09': '592420522e16049f-01',   // Reina Valera 1909
        'es-bes': 'b32b9d1b64b4ef29-01',    // Biblia en Español Sencillo
        'kjv': 'de4e12af7f28f599-01'        // KJV Oficial
    };

    if (apiBibleVersions[version]) {
        try {
            const apiId = apiBibleVersions[version];
            const apiBookId = mapToApiBibleBookId(bookId);
            const url = `https://rest.api.bible/v1/bibles/${apiId}/chapters/${apiBookId}.${chapter}`;

            const response = await fetch(url, {
                headers: { 'api-key': API_KEY }
            });

            if (!response.ok) throw new Error(`API Status: ${response.status}`);

            const data = await response.json();



            // Parse HTML content to extract verses for consistent styling
            const parser = new DOMParser();
            const doc = parser.parseFromString(data.data.content, 'text/html');
            const verses = [];

            // API.Bible usually marks verses with <span data-number="1" class="v">1</span>
            // Strategy: Iterate over elements, find verse markers, accumulate text
            const allElements = doc.body.querySelectorAll('*');
            let currentVerse = null;
            let currentText = '';

            // Helper to flush current verse
            const flushVerse = () => {
                if (currentVerse) {
                    verses.push({
                        verse: currentVerse,
                        text: currentText.trim()
                    });
                }
            };

            // First pass: Try to find standard .v markers
            const verseMarkers = doc.body.querySelectorAll('.v, [data-number]');

            if (verseMarkers.length > 0) {
                verseMarkers.forEach((marker, index) => {
                    // Flush previous
                    if (index > 0) flushVerse(); // Flush previous before starting new

                    // Start new verse
                    currentVerse = marker.textContent.trim() || marker.getAttribute('data-number');
                    currentText = '';

                    // Get text content following this marker until the next marker
                    let nextNode = marker.nextSibling;
                    while (nextNode) {
                        // If we hit another verse marker, stop (it will be handled in next iteration)
                        if (nextNode.nodeType === 1 && (nextNode.classList.contains('v') || nextNode.hasAttribute('data-number'))) {
                            break;
                        }

                        currentText += nextNode.textContent;
                        nextNode = nextNode.nextSibling;
                    }

                    // Also check if text is inside the parent paragraph but not directly next sibling 
                    // (Simple sibling traversal covers most cases in API.Bible)
                });
                // Flush last
                flushVerse();
            } else {
                // Fallback: If no markers found, try to regex parse the raw text
                const rawText = doc.body.textContent;
                const matches = rawText.matchAll(/(\d+)\s+([^\d]+)/g);
                for (const match of matches) {
                    verses.push({ verse: match[1], text: match[2].trim() });
                }
            }

            // If parsing failed completely, fallback to raw html but wrapped in a single verse
            if (verses.length === 0) {
                return {
                    type: 'html',
                    content: data.data.content,
                    copyright: data.data.copyright
                };
            }

            return {
                type: 'json',
                verses: verses,
                copyright: data.data.copyright
            };

        } catch (error) {
            console.warn('API.Bible failed, falling back to demo', error);
            return {
                type: 'json',
                verses: getDemoVerses(bookId, chapter),
                error: true
            };
        }
    }

    // 2. Bible-API.com Flow (Public Domain / Web)
    try {
        const url = `https://bible-api.com/${bookId}+${chapter}?translation=${version}`;
        const response = await fetch(url);
        if (!response.ok) throw new Error('Bible-API failed');

        const data = await response.json();
        return {
            type: 'json',
            verses: data.verses.map(v => ({ verse: v.verse, text: v.text })),
            text: data.text
        };
    } catch (error) {
        console.warn('Bible-API failed, falling back to demo', error);
        return {
            type: 'json',
            verses: getDemoVerses(bookId, chapter),
            error: true
        };
    }
};
