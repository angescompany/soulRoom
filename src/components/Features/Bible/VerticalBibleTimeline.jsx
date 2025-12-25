import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Virtuoso } from 'react-virtuoso';
import { ArrowLeft, Crown, Flame, BookOpen, Swords } from 'lucide-react';
import clsx from 'clsx';

/**
 * @typedef {Object} TimelineEvent
 * @property {string} id
 * @property {number} [year] - Single year for central events
 * @property {number} [startYear] - Start year for reign periods
 * @property {number} [endYear] - End year for reign periods
 * @property {'split'|'prophet'|'battle'|'israel'|'judah'} type - Event type determines positioning
 * @property {'israel'|'judah'} [kingdom] - Kingdom for king events
 * @property {string} title
 * @property {string} description
 * @property {string} [biblicalRef] - Bible reference
 */

// Sample data for the Divided Kingdom period
const timelineData = [
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
        id: "k_israel_4",
        startYear: 886,
        endYear: 885,
        type: "israel",
        kingdom: "israel",
        title: "Ela",
        description: "Hijo de Baasa, asesinado por Zimri.",
        biblicalRef: "1 Reyes 16:8-10"
    },
    {
        id: "k_israel_5",
        startYear: 885,
        endYear: 885,
        type: "israel",
        kingdom: "israel",
        title: "Zimri",
        description: "Reinó solo 7 días, se suicidó.",
        biblicalRef: "1 Reyes 16:15-20"
    },
    {
        id: "k_israel_6",
        startYear: 885,
        endYear: 874,
        type: "israel",
        kingdom: "israel",
        title: "Omri",
        description: "Fundó Samaria como capital.",
        biblicalRef: "1 Reyes 16:23-28"
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
        id: "k_israel_8",
        startYear: 853,
        endYear: 852,
        type: "israel",
        kingdom: "israel",
        title: "Ocozías",
        description: "Hijo de Acab, murió por una caída.",
        biblicalRef: "1 Reyes 22:51 - 2 Reyes 1"
    },
    {
        id: "k_israel_9",
        startYear: 852,
        endYear: 841,
        type: "israel",
        kingdom: "israel",
        title: "Joram",
        description: "Hermano de Ocozías, asesinado por Jehú.",
        biblicalRef: "2 Reyes 3:1-9:26"
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
        id: "k_judah_5",
        startYear: 848,
        endYear: 841,
        type: "judah",
        kingdom: "judah",
        title: "Joram de Judá",
        description: "Casado con hija de Acab, hizo lo malo.",
        biblicalRef: "2 Reyes 8:16-24"
    },
    {
        id: "k_judah_6",
        startYear: 841,
        endYear: 841,
        type: "judah",
        kingdom: "judah",
        title: "Ocozías de Judá",
        description: "Reinó un año, asesinado por Jehú.",
        biblicalRef: "2 Reyes 8:25-9:29"
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
        id: "k_israel_10",
        startYear: 841,
        endYear: 814,
        type: "israel",
        kingdom: "israel",
        title: "Jehú",
        description: "Ungido por Eliseo, destruyó el culto a Baal.",
        biblicalRef: "2 Reyes 9-10"
    },
    {
        id: "k_judah_7",
        startYear: 841,
        endYear: 835,
        type: "judah",
        kingdom: "judah",
        title: "Atalía",
        description: "Única reina, usurpó el trono.",
        biblicalRef: "2 Reyes 11:1-16"
    },
    {
        id: "k_judah_8",
        startYear: 835,
        endYear: 796,
        type: "judah",
        kingdom: "judah",
        title: "Joás de Judá",
        description: "Restauró el templo en su juventud.",
        biblicalRef: "2 Reyes 11:21-12:21"
    }
];

// Sort events by year for proper timeline order
const sortedData = [...timelineData].sort((a, b) => {
    const yearA = a.year || a.startYear;
    const yearB = b.year || b.startYear;
    return yearB - yearA; // Descending (older events first visually)
});

const EventCard = ({ event, onSelect }) => {
    const isIsrael = event.kingdom === 'israel' || event.type === 'israel';
    const isJudah = event.kingdom === 'judah' || event.type === 'judah';
    const isCentral = event.type === 'split' || event.type === 'prophet' || event.type === 'battle';

    const getIcon = () => {
        switch (event.type) {
            case 'split': return <Swords size={20} />;
            case 'prophet': return <Flame size={20} />;
            case 'battle': return <Swords size={20} />;
            default: return <Crown size={20} />;
        }
    };

    const getYearDisplay = () => {
        if (event.year) return `${event.year} a.C.`;
        if (event.startYear && event.endYear) {
            return `${event.startYear} - ${event.endYear} a.C.`;
        }
        return '';
    };

    return (
        <div
            className={clsx(
                'timeline-card',
                isIsrael && 'timeline-card-israel',
                isJudah && 'timeline-card-judah',
                isCentral && 'timeline-card-central'
            )}
            onClick={() => onSelect(event)}
        >
            <div className="timeline-card-header">
                <span className="timeline-card-icon">{getIcon()}</span>
                <span className="timeline-card-year">{getYearDisplay()}</span>
            </div>
            <h4 className="timeline-card-title">{event.title}</h4>
            <p className="timeline-card-desc">{event.description}</p>
            {event.biblicalRef && (
                <div className="timeline-card-ref">
                    <BookOpen size={14} />
                    <span>{event.biblicalRef}</span>
                </div>
            )}
        </div>
    );
};

const TimelineRow = ({ event, onSelect }) => {
    const isIsrael = event.kingdom === 'israel' || event.type === 'israel';
    const isJudah = event.kingdom === 'judah' || event.type === 'judah';
    const isCentral = event.type === 'split' || event.type === 'prophet' || event.type === 'battle';

    return (
        <div className="timeline-row">
            {/* Israel Column (Left) */}
            <div className="timeline-col timeline-col-left">
                {isIsrael && <EventCard event={event} onSelect={onSelect} />}
            </div>

            {/* Central Axis */}
            <div className="timeline-col timeline-col-center">
                <div className="timeline-axis">
                    <div className="timeline-axis-dot" />
                </div>
                {isCentral && <EventCard event={event} onSelect={onSelect} />}
            </div>

            {/* Judah Column (Right) */}
            <div className="timeline-col timeline-col-right">
                {isJudah && <EventCard event={event} onSelect={onSelect} />}
            </div>
        </div>
    );
};

const VerticalBibleTimeline = () => {
    const navigate = useNavigate();
    const [selectedEvent, setSelectedEvent] = useState(null);

    const handleEventSelect = (event) => {
        setSelectedEvent(event);
        // Future: Open Bottom Sheet with event details
        console.log('Event selected:', event);
    };

    const handleBack = () => {
        navigate('/read');
    };

    return (
        <div className="timeline-container">
            {/* Fixed Header */}
            <header className="timeline-header">
                <button className="timeline-back-btn" onClick={handleBack}>
                    <ArrowLeft size={24} />
                </button>
                <div className="timeline-header-content">
                    <h1>Cronología Bíblica</h1>
                    <p>El Reino Dividido (931-586 a.C.)</p>
                </div>
            </header>

            {/* Kingdom Labels */}
            <div className="timeline-labels">
                <div className="timeline-label timeline-label-israel">
                    <span>Israel (Norte)</span>
                </div>
                <div className="timeline-label timeline-label-center">
                    <span>Eje</span>
                </div>
                <div className="timeline-label timeline-label-judah">
                    <span>Judá (Sur)</span>
                </div>
            </div>

            {/* Virtualized Timeline */}
            <Virtuoso
                className="timeline-list"
                data={sortedData}
                itemContent={(index, event) => (
                    <TimelineRow
                        key={event.id}
                        event={event}
                        onSelect={handleEventSelect}
                    />
                )}
            />

            {/* Event Detail Modal (Simple version for now) */}
            {selectedEvent && (
                <div className="timeline-modal-overlay" onClick={() => setSelectedEvent(null)}>
                    <div className="timeline-modal" onClick={(e) => e.stopPropagation()}>
                        <h3>{selectedEvent.title}</h3>
                        <p>{selectedEvent.description}</p>
                        {selectedEvent.biblicalRef && (
                            <div className="timeline-modal-ref">
                                <BookOpen size={16} />
                                <span>{selectedEvent.biblicalRef}</span>
                            </div>
                        )}
                        <button
                            className="btn-primary"
                            onClick={() => setSelectedEvent(null)}
                        >
                            Cerrar
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default VerticalBibleTimeline;
