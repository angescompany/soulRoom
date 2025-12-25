/**
 * Timeline Data for Complete Bible Chronology
 * Organized by biblical periods from Genesis to Revelation
 */

// Period definitions with metadata
export const periods = [
    {
        id: 'creation',
        title: 'Creación y Caída',
        description: 'Los orígenes del mundo y la humanidad',
        dateRange: '~4000 a.C.',
        testament: 'old',
        icon: 'globe',
        color: '#10b981' // green
    },
    {
        id: 'patriarchs',
        title: 'Los Patriarcas',
        description: 'Abraham, Isaac, Jacob y José',
        dateRange: '2000-1800 a.C.',
        testament: 'old',
        icon: 'tent',
        color: '#f59e0b' // amber
    },
    {
        id: 'exodus',
        title: 'Éxodo y Desierto',
        description: 'Liberación de Egipto y peregrinación',
        dateRange: '1446-1406 a.C.',
        testament: 'old',
        icon: 'flame',
        color: '#ef4444' // red
    },
    {
        id: 'conquest',
        title: 'Conquista de Canaán',
        description: 'Josué y la tierra prometida',
        dateRange: '1406-1375 a.C.',
        testament: 'old',
        icon: 'swords',
        color: '#8b5cf6' // purple
    },
    {
        id: 'judges',
        title: 'Los Jueces',
        description: 'Débora, Gedeón, Sansón y otros',
        dateRange: '1375-1050 a.C.',
        testament: 'old',
        icon: 'scale',
        color: '#6366f1' // indigo
    },
    {
        id: 'united-kingdom',
        title: 'Reino Unido',
        description: 'Saúl, David y Salomón',
        dateRange: '1050-931 a.C.',
        testament: 'old',
        icon: 'crown',
        color: '#eab308' // yellow
    },
    {
        id: 'divided-kingdom',
        title: 'Reino Dividido',
        description: 'Israel y Judá separados',
        dateRange: '931-586 a.C.',
        testament: 'old',
        icon: 'split',
        color: '#ec4899' // pink
    },
    {
        id: 'exile',
        title: 'Exilio y Cautiverio',
        description: 'Cautividad en Babilonia',
        dateRange: '586-538 a.C.',
        testament: 'old',
        icon: 'chains',
        color: '#64748b' // slate
    },
    {
        id: 'return',
        title: 'Retorno y Reconstrucción',
        description: 'Esdras, Nehemías y el templo',
        dateRange: '538-400 a.C.',
        testament: 'old',
        icon: 'building',
        color: '#14b8a6' // teal
    },
    {
        id: 'jesus',
        title: 'Vida de Jesús',
        description: 'El Mesías prometido',
        dateRange: '4 a.C. - 33 d.C.',
        testament: 'new',
        icon: 'cross',
        color: '#dc2626' // red-600
    },
    {
        id: 'early-church',
        title: 'Iglesia Primitiva',
        description: 'Hechos y las Epístolas',
        dateRange: '33-100 d.C.',
        testament: 'new',
        icon: 'church',
        color: '#2563eb' // blue-600
    },
    {
        id: 'revelation',
        title: 'Profecía y Apocalipsis',
        description: 'El fin de los tiempos',
        dateRange: 'Futuro',
        testament: 'new',
        icon: 'sparkles',
        color: '#7c3aed' // violet
    }
];

// Events organized by period
const eventsByPeriod = {
    'creation': [
        {
            id: 'c1',
            year: 4000,
            type: 'split',
            title: 'La Creación',
            description: 'Dios crea los cielos, la tierra y todo lo que hay en ellos en 6 días.',
            biblicalRef: 'Génesis 1-2'
        },
        {
            id: 'c2',
            year: 3950,
            type: 'prophet',
            title: 'Adán y Eva',
            description: 'Dios crea al hombre y la mujer a su imagen.',
            biblicalRef: 'Génesis 2:7, 21-22'
        },
        {
            id: 'c3',
            year: 3900,
            type: 'battle',
            title: 'La Caída',
            description: 'Adán y Eva desobedecen a Dios, el pecado entra al mundo.',
            biblicalRef: 'Génesis 3'
        },
        {
            id: 'c4',
            year: 3850,
            type: 'battle',
            title: 'Caín y Abel',
            description: 'Caín mata a su hermano Abel por envidia.',
            biblicalRef: 'Génesis 4:1-16'
        },
        {
            id: 'c5',
            year: 2400,
            type: 'split',
            title: 'El Diluvio',
            description: 'Dios envía un diluvio universal, Noé y su familia son salvados.',
            biblicalRef: 'Génesis 6-9'
        },
        {
            id: 'c6',
            year: 2300,
            type: 'prophet',
            title: 'Pacto con Noé',
            description: 'Dios hace pacto con Noé, el arcoíris como señal.',
            biblicalRef: 'Génesis 9:8-17'
        },
        {
            id: 'c7',
            year: 2200,
            type: 'battle',
            title: 'Torre de Babel',
            description: 'Dios confunde las lenguas y dispersa a la humanidad.',
            biblicalRef: 'Génesis 11:1-9'
        }
    ],
    'patriarchs': [
        {
            id: 'p1',
            year: 2091,
            type: 'split',
            title: 'Llamado de Abraham',
            description: 'Dios llama a Abram a dejar Ur y ir a Canaán.',
            biblicalRef: 'Génesis 12:1-3'
        },
        {
            id: 'p2',
            year: 2080,
            type: 'prophet',
            title: 'Pacto con Abraham',
            description: 'Dios promete descendencia numerosa y la tierra.',
            biblicalRef: 'Génesis 15'
        },
        {
            id: 'p3',
            year: 2067,
            type: 'battle',
            title: 'Destrucción de Sodoma',
            description: 'Sodoma y Gomorra destruidas, Lot escapa.',
            biblicalRef: 'Génesis 19'
        },
        {
            id: 'p4',
            year: 2066,
            type: 'prophet',
            title: 'Nacimiento de Isaac',
            description: 'El hijo de la promesa nace de Sara.',
            biblicalRef: 'Génesis 21:1-7'
        },
        {
            id: 'p5',
            year: 2050,
            type: 'battle',
            title: 'Sacrificio de Isaac',
            description: 'Abraham es probado, Dios provee un carnero.',
            biblicalRef: 'Génesis 22'
        },
        {
            id: 'p6',
            year: 2006,
            type: 'prophet',
            title: 'Jacob y Esaú',
            description: 'Nacen los gemelos, Jacob obtiene la primogenitura.',
            biblicalRef: 'Génesis 25:19-34'
        },
        {
            id: 'p7',
            year: 1990,
            type: 'split',
            title: 'Sueño de Jacob',
            description: 'Jacob ve la escalera al cielo en Betel.',
            biblicalRef: 'Génesis 28:10-22'
        },
        {
            id: 'p8',
            year: 1980,
            type: 'prophet',
            title: 'Jacob se convierte en Israel',
            description: 'Jacob lucha con el ángel y recibe nuevo nombre.',
            biblicalRef: 'Génesis 32:22-32'
        },
        {
            id: 'p9',
            year: 1915,
            type: 'prophet',
            title: 'José vendido',
            description: 'Sus hermanos lo venden como esclavo a Egipto.',
            biblicalRef: 'Génesis 37'
        },
        {
            id: 'p10',
            year: 1885,
            type: 'split',
            title: 'José gobernador de Egipto',
            description: 'José interpreta sueños y es exaltado por Faraón.',
            biblicalRef: 'Génesis 41'
        },
        {
            id: 'p11',
            year: 1876,
            type: 'prophet',
            title: 'Israel desciende a Egipto',
            description: 'Jacob y sus hijos se establecen en Gosén.',
            biblicalRef: 'Génesis 46'
        }
    ],
    'exodus': [
        {
            id: 'e1',
            year: 1526,
            type: 'prophet',
            title: 'Nacimiento de Moisés',
            description: 'Moisés nace y es rescatado de las aguas por la hija de Faraón.',
            biblicalRef: 'Éxodo 2:1-10'
        },
        {
            id: 'e2',
            year: 1486,
            type: 'split',
            title: 'La Zarza Ardiente',
            description: 'Dios llama a Moisés desde la zarza en Horeb.',
            biblicalRef: 'Éxodo 3'
        },
        {
            id: 'e3',
            year: 1446,
            type: 'battle',
            title: 'Las 10 Plagas',
            description: 'Dios envía plagas sobre Egipto para liberar a su pueblo.',
            biblicalRef: 'Éxodo 7-12'
        },
        {
            id: 'e4',
            year: 1446,
            type: 'split',
            title: 'La Pascua',
            description: 'Institución de la Pascua, el ángel pasa sobre Israel.',
            biblicalRef: 'Éxodo 12'
        },
        {
            id: 'e5',
            year: 1446,
            type: 'battle',
            title: 'Cruce del Mar Rojo',
            description: 'Dios abre el mar, Israel cruza, Egipto es destruido.',
            biblicalRef: 'Éxodo 14'
        },
        {
            id: 'e6',
            year: 1446,
            type: 'prophet',
            title: 'Maná del Cielo',
            description: 'Dios provee maná diario para alimentar al pueblo.',
            biblicalRef: 'Éxodo 16'
        },
        {
            id: 'e7',
            year: 1446,
            type: 'split',
            title: 'Los 10 Mandamientos',
            description: 'Dios entrega la Ley a Moisés en el Monte Sinaí.',
            biblicalRef: 'Éxodo 20'
        },
        {
            id: 'e8',
            year: 1445,
            type: 'battle',
            title: 'El Becerro de Oro',
            description: 'Israel cae en idolatría mientras Moisés está en el monte.',
            biblicalRef: 'Éxodo 32'
        },
        {
            id: 'e9',
            year: 1445,
            type: 'prophet',
            title: 'El Tabernáculo',
            description: 'Construcción del lugar de adoración móvil.',
            biblicalRef: 'Éxodo 35-40'
        },
        {
            id: 'e10',
            year: 1444,
            type: 'battle',
            title: 'Los 12 Espías',
            description: '10 espías dan mal informe, solo Josué y Caleb creen.',
            biblicalRef: 'Números 13-14'
        },
        {
            id: 'e11',
            year: 1407,
            type: 'prophet',
            title: 'Muerte de Moisés',
            description: 'Moisés ve la tierra prometida pero no entra.',
            biblicalRef: 'Deuteronomio 34'
        }
    ],
    'conquest': [
        {
            id: 'cq1',
            year: 1406,
            type: 'split',
            title: 'Cruce del Jordán',
            description: 'Israel cruza el río Jordán en seco bajo Josué.',
            biblicalRef: 'Josué 3-4'
        },
        {
            id: 'cq2',
            year: 1406,
            type: 'battle',
            title: 'Caída de Jericó',
            description: 'Los muros caen después de 7 días de marcha.',
            biblicalRef: 'Josué 6'
        },
        {
            id: 'cq3',
            year: 1405,
            type: 'battle',
            title: 'Derrota en Hai',
            description: 'Pecado de Acán causa derrota inicial.',
            biblicalRef: 'Josué 7'
        },
        {
            id: 'cq4',
            year: 1405,
            type: 'battle',
            title: 'Victoria en Hai',
            description: 'Después de limpiar el pecado, Israel conquista Hai.',
            biblicalRef: 'Josué 8'
        },
        {
            id: 'cq5',
            year: 1404,
            type: 'split',
            title: 'El Sol se Detiene',
            description: 'Dios detiene el sol para que Israel derrote a los amorreos.',
            biblicalRef: 'Josué 10:12-14'
        },
        {
            id: 'cq6',
            year: 1400,
            type: 'prophet',
            title: 'División de la Tierra',
            description: 'Josué reparte la tierra entre las 12 tribus.',
            biblicalRef: 'Josué 13-21'
        },
        {
            id: 'cq7',
            year: 1375,
            type: 'prophet',
            title: 'Discurso Final de Josué',
            description: '"Escogeos hoy a quién sirváis... yo y mi casa serviremos a Jehová."',
            biblicalRef: 'Josué 24:14-15'
        }
    ],
    'judges': [
        {
            id: 'j1',
            year: 1370,
            type: 'battle',
            title: 'Otoniel',
            description: 'Primer juez, libra a Israel de Mesopotamia.',
            biblicalRef: 'Jueces 3:7-11'
        },
        {
            id: 'j2',
            year: 1309,
            type: 'battle',
            title: 'Aod',
            description: 'Juez zurdo que mata al rey Eglón de Moab.',
            biblicalRef: 'Jueces 3:12-30'
        },
        {
            id: 'j3',
            year: 1209,
            type: 'prophet',
            title: 'Débora',
            description: 'Profetisa y jueza, Barac derrota a Sísara.',
            biblicalRef: 'Jueces 4-5'
        },
        {
            id: 'j4',
            year: 1162,
            type: 'split',
            title: 'Gedeón',
            description: 'Con 300 hombres derrota a los madianitas.',
            biblicalRef: 'Jueces 6-8'
        },
        {
            id: 'j5',
            year: 1120,
            type: 'battle',
            title: 'Jefté',
            description: 'Derrota a los amonitas, hace voto trágico.',
            biblicalRef: 'Jueces 11'
        },
        {
            id: 'j6',
            year: 1075,
            type: 'split',
            title: 'Sansón',
            description: 'Hombre de gran fuerza, lucha contra los filisteos.',
            biblicalRef: 'Jueces 13-16'
        },
        {
            id: 'j7',
            year: 1100,
            type: 'prophet',
            title: 'Rut y Booz',
            description: 'Historia de redención, antepasados de David.',
            biblicalRef: 'Rut 1-4'
        },
        {
            id: 'j8',
            year: 1070,
            type: 'prophet',
            title: 'Samuel',
            description: 'Último juez y profeta, unge a Saúl y David.',
            biblicalRef: '1 Samuel 1-16'
        }
    ],
    'united-kingdom': [
        {
            id: 'uk1',
            year: 1050,
            type: 'split',
            title: 'Israel Pide un Rey',
            description: 'El pueblo rechaza a Dios como rey, pide uno humano.',
            biblicalRef: '1 Samuel 8'
        },
        {
            id: 'uk2',
            startYear: 1050,
            endYear: 1010,
            type: 'israel',
            kingdom: 'israel',
            title: 'Rey Saúl',
            description: 'Primer rey de Israel, benjamita, alto y guapo.',
            biblicalRef: '1 Samuel 9-31'
        },
        {
            id: 'uk3',
            year: 1025,
            type: 'battle',
            title: 'David y Goliat',
            description: 'El joven David mata al gigante filisteo.',
            biblicalRef: '1 Samuel 17'
        },
        {
            id: 'uk4',
            year: 1010,
            type: 'battle',
            title: 'Muerte de Saúl',
            description: 'Saúl muere en batalla contra los filisteos.',
            biblicalRef: '1 Samuel 31'
        },
        {
            id: 'uk5',
            startYear: 1010,
            endYear: 970,
            type: 'judah',
            kingdom: 'judah',
            title: 'Rey David',
            description: 'El hombre conforme al corazón de Dios.',
            biblicalRef: '2 Samuel; 1 Crónicas'
        },
        {
            id: 'uk6',
            year: 1000,
            type: 'split',
            title: 'Jerusalén Capital',
            description: 'David conquista Jerusalén y la hace capital.',
            biblicalRef: '2 Samuel 5:6-10'
        },
        {
            id: 'uk7',
            year: 995,
            type: 'prophet',
            title: 'Pacto Davídico',
            description: 'Dios promete a David un trono eterno.',
            biblicalRef: '2 Samuel 7'
        },
        {
            id: 'uk8',
            startYear: 970,
            endYear: 931,
            type: 'judah',
            kingdom: 'judah',
            title: 'Rey Salomón',
            description: 'El más sabio, construye el Templo.',
            biblicalRef: '1 Reyes 1-11'
        },
        {
            id: 'uk9',
            year: 966,
            type: 'split',
            title: 'Construcción del Templo',
            description: 'Salomón edifica el Templo de Jerusalén.',
            biblicalRef: '1 Reyes 6-8'
        },
        {
            id: 'uk10',
            year: 950,
            type: 'prophet',
            title: 'Visita Reina de Sabá',
            description: 'La reina viene a ver la sabiduría de Salomón.',
            biblicalRef: '1 Reyes 10'
        }
    ],
    'divided-kingdom': [
        {
            id: "ev1",
            year: 931,
            type: "split",
            title: "El Reino se Divide",
            description: "Roboam y Jeroboam separan las tribus.",
            biblicalRef: "1 Reyes 12"
        },
        {
            id: "k_israel_1",
            startYear: 931,
            endYear: 910,
            type: "israel",
            kingdom: "israel",
            title: "Jeroboam I",
            description: "Primer rey del norte. Hizo dos becerros de oro.",
            biblicalRef: "1 Reyes 12:20"
        },
        {
            id: "k_judah_1",
            startYear: 931,
            endYear: 913,
            type: "judah",
            kingdom: "judah",
            title: "Roboam",
            description: "Hijo de Salomón. Rey del sur.",
            biblicalRef: "1 Reyes 14:21"
        },
        {
            id: "k_judah_2",
            startYear: 913,
            endYear: 911,
            type: "judah",
            kingdom: "judah",
            title: "Abías",
            description: "Breve reinado, victorioso contra Israel.",
            biblicalRef: "1 Reyes 15:1-8"
        },
        {
            id: "k_israel_2",
            startYear: 910,
            endYear: 909,
            type: "israel",
            kingdom: "israel",
            title: "Nadab",
            description: "Hijo de Jeroboam, asesinado por Baasa.",
            biblicalRef: "1 Reyes 15:25-28"
        },
        {
            id: "k_judah_3",
            startYear: 911,
            endYear: 870,
            type: "judah",
            kingdom: "judah",
            title: "Asa",
            description: "Rey piadoso que quitó los ídolos.",
            biblicalRef: "1 Reyes 15:9-24"
        },
        {
            id: "k_israel_3",
            startYear: 909,
            endYear: 886,
            type: "israel",
            kingdom: "israel",
            title: "Baasa",
            description: "Usurpó el trono, hizo lo malo.",
            biblicalRef: "1 Reyes 15:27-34"
        },
        {
            id: "k_israel_7",
            startYear: 874,
            endYear: 853,
            type: "israel",
            kingdom: "israel",
            title: "Acab",
            description: "Casado con Jezabel, introdujo el culto a Baal.",
            biblicalRef: "1 Reyes 16:29-22:40"
        },
        {
            id: "p_elijah",
            year: 870,
            type: "prophet",
            title: "Profeta Elías",
            description: "Ministerio profético contra el culto a Baal. Confrontación en el Monte Carmelo.",
            biblicalRef: "1 Reyes 17-19"
        },
        {
            id: "k_judah_4",
            startYear: 870,
            endYear: 848,
            type: "judah",
            kingdom: "judah",
            title: "Josafat",
            description: "Rey piadoso, aliado con Israel.",
            biblicalRef: "1 Reyes 22:41-50"
        },
        {
            id: "p_elisha",
            year: 850,
            type: "prophet",
            title: "Profeta Eliseo",
            description: "Sucesor de Elías, realizó muchos milagros.",
            biblicalRef: "2 Reyes 2-13"
        },
        {
            id: "battle_jehu",
            year: 841,
            type: "battle",
            title: "Revolución de Jehú",
            description: "Jehú mata a los reyes de Israel y Judá.",
            biblicalRef: "2 Reyes 9-10"
        },
        {
            id: "k_judah_hezekiah",
            startYear: 715,
            endYear: 686,
            type: "judah",
            kingdom: "judah",
            title: "Ezequías",
            description: "Gran reformador, Dios derrota a Asiria.",
            biblicalRef: "2 Reyes 18-20"
        },
        {
            id: "p_isaiah",
            year: 700,
            type: "prophet",
            title: "Profeta Isaías",
            description: "El profeta evangélico, profetizó sobre el Mesías.",
            biblicalRef: "Isaías"
        },
        {
            id: "k_judah_josiah",
            startYear: 640,
            endYear: 609,
            type: "judah",
            kingdom: "judah",
            title: "Josías",
            description: "Último rey piadoso, encuentra el libro de la Ley.",
            biblicalRef: "2 Reyes 22-23"
        },
        {
            id: "p_jeremiah",
            year: 626,
            type: "prophet",
            title: "Profeta Jeremías",
            description: "El profeta llorón, advierte sobre el exilio.",
            biblicalRef: "Jeremías"
        },
        {
            id: "fall_israel",
            year: 722,
            type: "battle",
            title: "Caída de Israel (Norte)",
            description: "Asiria conquista Samaria, las 10 tribus dispersadas.",
            biblicalRef: "2 Reyes 17"
        },
        {
            id: "fall_judah",
            year: 586,
            type: "battle",
            title: "Caída de Judá (Sur)",
            description: "Babilonia destruye Jerusalén y el Templo.",
            biblicalRef: "2 Reyes 25"
        }
    ],
    'exile': [
        {
            id: 'ex1',
            year: 605,
            type: 'battle',
            title: 'Primera Deportación',
            description: 'Daniel y otros jóvenes llevados a Babilonia.',
            biblicalRef: 'Daniel 1'
        },
        {
            id: 'ex2',
            year: 597,
            type: 'battle',
            title: 'Segunda Deportación',
            description: 'Ezequiel y más judíos deportados.',
            biblicalRef: '2 Reyes 24:10-16'
        },
        {
            id: 'ex3',
            year: 586,
            type: 'battle',
            title: 'Destrucción de Jerusalén',
            description: 'El Templo quemado, tercera deportación.',
            biblicalRef: '2 Reyes 25'
        },
        {
            id: 'ex4',
            year: 586,
            type: 'prophet',
            title: 'Lamentaciones',
            description: 'Jeremías llora la destrucción de Jerusalén.',
            biblicalRef: 'Lamentaciones'
        },
        {
            id: 'ex5',
            year: 593,
            type: 'prophet',
            title: 'Visión de Ezequiel',
            description: 'Ezequiel ve la gloria de Dios junto al río Quebar.',
            biblicalRef: 'Ezequiel 1'
        },
        {
            id: 'ex6',
            year: 553,
            type: 'split',
            title: 'Sueño de las Bestias',
            description: 'Daniel ve los 4 imperios mundiales.',
            biblicalRef: 'Daniel 7'
        },
        {
            id: 'ex7',
            year: 539,
            type: 'battle',
            title: 'Caída de Babilonia',
            description: 'La escritura en la pared, Persia conquista.',
            biblicalRef: 'Daniel 5'
        },
        {
            id: 'ex8',
            year: 538,
            type: 'split',
            title: 'Edicto de Ciro',
            description: 'Ciro permite el regreso de los judíos.',
            biblicalRef: 'Esdras 1'
        }
    ],
    'return': [
        {
            id: 'r1',
            year: 538,
            type: 'split',
            title: 'Primer Retorno',
            description: 'Zorobabel lidera el primer grupo de regreso.',
            biblicalRef: 'Esdras 1-2'
        },
        {
            id: 'r2',
            year: 536,
            type: 'prophet',
            title: 'Fundamento del Templo',
            description: 'Se pone el fundamento del segundo templo.',
            biblicalRef: 'Esdras 3'
        },
        {
            id: 'r3',
            year: 520,
            type: 'prophet',
            title: 'Hageo y Zacarías',
            description: 'Profetas animan a completar el templo.',
            biblicalRef: 'Hageo; Zacarías'
        },
        {
            id: 'r4',
            year: 516,
            type: 'split',
            title: 'Templo Completado',
            description: 'El segundo templo es dedicado.',
            biblicalRef: 'Esdras 6:13-18'
        },
        {
            id: 'r5',
            year: 478,
            type: 'prophet',
            title: 'Ester es Reina',
            description: 'Ester se convierte en reina de Persia.',
            biblicalRef: 'Ester 2'
        },
        {
            id: 'r6',
            year: 473,
            type: 'battle',
            title: 'Ester Salva a su Pueblo',
            description: 'Amán derrotado, fiesta de Purim instituida.',
            biblicalRef: 'Ester 7-9'
        },
        {
            id: 'r7',
            year: 458,
            type: 'prophet',
            title: 'Esdras llega a Jerusalén',
            description: 'Esdras trae la Ley e inicia reformas.',
            biblicalRef: 'Esdras 7-10'
        },
        {
            id: 'r8',
            year: 445,
            type: 'split',
            title: 'Nehemías Reconstruye Muros',
            description: 'Los muros de Jerusalén terminados en 52 días.',
            biblicalRef: 'Nehemías 1-6'
        },
        {
            id: 'r9',
            year: 432,
            type: 'prophet',
            title: 'Profeta Malaquías',
            description: 'Último profeta del AT, anuncia al mensajero.',
            biblicalRef: 'Malaquías'
        }
    ],
    'jesus': [
        {
            id: 'j1',
            year: -5,
            type: 'split',
            title: 'Nacimiento de Jesús',
            description: 'El Verbo se hace carne, nace en Belén.',
            biblicalRef: 'Mateo 1-2; Lucas 2'
        },
        {
            id: 'j2',
            year: -4,
            type: 'prophet',
            title: 'Visita de los Magos',
            description: 'Sabios del oriente adoran al niño Jesús.',
            biblicalRef: 'Mateo 2:1-12'
        },
        {
            id: 'j3',
            year: 8,
            type: 'prophet',
            title: 'Jesús en el Templo',
            description: 'A los 12 años, Jesús enseña a los doctores.',
            biblicalRef: 'Lucas 2:41-52'
        },
        {
            id: 'j4',
            year: 26,
            type: 'split',
            title: 'Bautismo de Jesús',
            description: 'Juan bautiza a Jesús, el Espíritu desciende.',
            biblicalRef: 'Mateo 3:13-17'
        },
        {
            id: 'j5',
            year: 26,
            type: 'battle',
            title: 'Tentación en el Desierto',
            description: 'Jesús vence las tentaciones de Satanás.',
            biblicalRef: 'Mateo 4:1-11'
        },
        {
            id: 'j6',
            year: 27,
            type: 'prophet',
            title: 'Primer Milagro',
            description: 'Jesús convierte el agua en vino en Caná.',
            biblicalRef: 'Juan 2:1-11'
        },
        {
            id: 'j7',
            year: 28,
            type: 'split',
            title: 'Sermón del Monte',
            description: 'Las Bienaventuranzas y enseñanzas del Reino.',
            biblicalRef: 'Mateo 5-7'
        },
        {
            id: 'j8',
            year: 29,
            type: 'prophet',
            title: 'Alimenta a los 5000',
            description: 'Jesús multiplica panes y peces.',
            biblicalRef: 'Juan 6:1-14'
        },
        {
            id: 'j9',
            year: 29,
            type: 'split',
            title: 'Transfiguración',
            description: 'Jesús transfigurado ante Pedro, Jacobo y Juan.',
            biblicalRef: 'Mateo 17:1-9'
        },
        {
            id: 'j10',
            year: 30,
            type: 'prophet',
            title: 'Resurrección de Lázaro',
            description: 'Jesús resucita a Lázaro después de 4 días.',
            biblicalRef: 'Juan 11'
        },
        {
            id: 'j11',
            year: 33,
            type: 'split',
            title: 'Entrada Triunfal',
            description: 'Jesús entra a Jerusalén como Rey.',
            biblicalRef: 'Mateo 21:1-11'
        },
        {
            id: 'j12',
            year: 33,
            type: 'prophet',
            title: 'Última Cena',
            description: 'Jesús instituye la Cena del Señor.',
            biblicalRef: 'Mateo 26:17-30'
        },
        {
            id: 'j13',
            year: 33,
            type: 'battle',
            title: 'Crucifixión',
            description: 'Jesús muere en la cruz por nuestros pecados.',
            biblicalRef: 'Mateo 27; Juan 19'
        },
        {
            id: 'j14',
            year: 33,
            type: 'split',
            title: 'Resurrección',
            description: '¡Jesús resucita al tercer día!',
            biblicalRef: 'Mateo 28; Juan 20'
        },
        {
            id: 'j15',
            year: 33,
            type: 'prophet',
            title: 'Ascensión',
            description: 'Jesús asciende al cielo desde el Monte de los Olivos.',
            biblicalRef: 'Hechos 1:9-11'
        }
    ],
    'early-church': [
        {
            id: 'ec1',
            year: 33,
            type: 'split',
            title: 'Pentecostés',
            description: 'El Espíritu Santo desciende, nace la Iglesia.',
            biblicalRef: 'Hechos 2'
        },
        {
            id: 'ec2',
            year: 34,
            type: 'battle',
            title: 'Martirio de Esteban',
            description: 'Primer mártir cristiano, apedreado.',
            biblicalRef: 'Hechos 7'
        },
        {
            id: 'ec3',
            year: 35,
            type: 'split',
            title: 'Conversión de Pablo',
            description: 'Saulo encuentra a Jesús camino a Damasco.',
            biblicalRef: 'Hechos 9'
        },
        {
            id: 'ec4',
            year: 40,
            type: 'prophet',
            title: 'Pedro y Cornelio',
            description: 'El evangelio llega a los gentiles.',
            biblicalRef: 'Hechos 10'
        },
        {
            id: 'ec5',
            year: 47,
            type: 'prophet',
            title: 'Primer Viaje Misionero',
            description: 'Pablo y Bernabé predican en Asia Menor.',
            biblicalRef: 'Hechos 13-14'
        },
        {
            id: 'ec6',
            year: 49,
            type: 'split',
            title: 'Concilio de Jerusalén',
            description: 'Se decide que gentiles no necesitan circuncidarse.',
            biblicalRef: 'Hechos 15'
        },
        {
            id: 'ec7',
            year: 50,
            type: 'prophet',
            title: 'Segundo Viaje Misionero',
            description: 'Pablo lleva el evangelio a Europa (Filipos).',
            biblicalRef: 'Hechos 15:36-18:22'
        },
        {
            id: 'ec8',
            year: 53,
            type: 'prophet',
            title: 'Tercer Viaje Misionero',
            description: 'Pablo en Éfeso, escribe varias epístolas.',
            biblicalRef: 'Hechos 18:23-21:17'
        },
        {
            id: 'ec9',
            year: 58,
            type: 'battle',
            title: 'Pablo Arrestado',
            description: 'Pablo arrestado en Jerusalén, apela a César.',
            biblicalRef: 'Hechos 21-26'
        },
        {
            id: 'ec10',
            year: 60,
            type: 'prophet',
            title: 'Pablo en Roma',
            description: 'Pablo llega a Roma, predica bajo arresto.',
            biblicalRef: 'Hechos 28'
        },
        {
            id: 'ec11',
            year: 64,
            type: 'battle',
            title: 'Persecución de Nerón',
            description: 'Gran persecución contra los cristianos en Roma.',
            biblicalRef: '1 Pedro; 2 Timoteo'
        },
        {
            id: 'ec12',
            year: 67,
            type: 'battle',
            title: 'Martirio de Pedro y Pablo',
            description: 'Los apóstoles mueren como mártires en Roma.',
            biblicalRef: '2 Timoteo 4:6-8'
        },
        {
            id: 'ec13',
            year: 70,
            type: 'battle',
            title: 'Destrucción de Jerusalén',
            description: 'Roma destruye el Templo, cumpliendo la profecía de Jesús.',
            biblicalRef: 'Mateo 24:1-2'
        }
    ],
    'revelation': [
        {
            id: 'rv1',
            year: 95,
            type: 'prophet',
            title: 'Juan en Patmos',
            description: 'Juan recibe la revelación de Jesucristo.',
            biblicalRef: 'Apocalipsis 1'
        },
        {
            id: 'rv2',
            year: 95,
            type: 'split',
            title: 'Cartas a las 7 Iglesias',
            description: 'Mensajes a las iglesias de Asia Menor.',
            biblicalRef: 'Apocalipsis 2-3'
        },
        {
            id: 'rv3',
            year: 0,
            type: 'prophet',
            title: 'El Trono de Dios',
            description: 'Visión del cielo y la adoración eterna.',
            biblicalRef: 'Apocalipsis 4-5'
        },
        {
            id: 'rv4',
            year: 0,
            type: 'battle',
            title: 'Los 7 Sellos',
            description: 'Juicios sobre la tierra.',
            biblicalRef: 'Apocalipsis 6-8'
        },
        {
            id: 'rv5',
            year: 0,
            type: 'battle',
            title: 'Las 7 Trompetas',
            description: 'Más juicios y advertencias.',
            biblicalRef: 'Apocalipsis 8-11'
        },
        {
            id: 'rv6',
            year: 0,
            type: 'battle',
            title: 'Las 7 Copas',
            description: 'Los juicios finales de la ira de Dios.',
            biblicalRef: 'Apocalipsis 15-16'
        },
        {
            id: 'rv7',
            year: 0,
            type: 'battle',
            title: 'Caída de Babilonia',
            description: 'El sistema mundial anti-Dios es destruido.',
            biblicalRef: 'Apocalipsis 17-18'
        },
        {
            id: 'rv8',
            year: 0,
            type: 'split',
            title: 'Segunda Venida de Cristo',
            description: 'Jesús regresa como Rey de reyes.',
            biblicalRef: 'Apocalipsis 19:11-21'
        },
        {
            id: 'rv9',
            year: 0,
            type: 'prophet',
            title: 'El Milenio',
            description: 'Cristo reina por 1000 años.',
            biblicalRef: 'Apocalipsis 20:1-6'
        },
        {
            id: 'rv10',
            year: 0,
            type: 'battle',
            title: 'Juicio Final',
            description: 'El Gran Trono Blanco, juicio de los muertos.',
            biblicalRef: 'Apocalipsis 20:11-15'
        },
        {
            id: 'rv11',
            year: 0,
            type: 'split',
            title: 'Cielos Nuevos y Tierra Nueva',
            description: 'Dios hace nuevas todas las cosas.',
            biblicalRef: 'Apocalipsis 21:1-8'
        },
        {
            id: 'rv12',
            year: 0,
            type: 'prophet',
            title: 'La Nueva Jerusalén',
            description: 'La ciudad de Dios desciende del cielo.',
            biblicalRef: 'Apocalipsis 21:9-22:5'
        },
        {
            id: 'rv13',
            year: 0,
            type: 'split',
            title: '¡Ven, Señor Jesús!',
            description: '"El Espíritu y la Esposa dicen: Ven."',
            biblicalRef: 'Apocalipsis 22:17-21'
        }
    ]
};

/**
 * Get all periods
 */
export const getPeriods = () => periods;

/**
 * Get a single period by ID
 */
export const getPeriodById = (periodId) => {
    return periods.find(p => p.id === periodId);
};

/**
 * Get events for a specific period
 */
export const getEventsByPeriod = (periodId) => {
    const events = eventsByPeriod[periodId] || [];
    // Sort by year (descending for timeline display)
    return [...events].sort((a, b) => {
        const yearA = a.year || a.startYear;
        const yearB = b.year || b.startYear;
        return yearB - yearA;
    });
};

/**
 * Get all events (for search or global timeline)
 */
export const getAllEvents = () => {
    return Object.values(eventsByPeriod).flat();
};
