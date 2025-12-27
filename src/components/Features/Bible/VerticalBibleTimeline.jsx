import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Virtuoso } from 'react-virtuoso';
import { ArrowLeft, Crown, Flame, BookOpen, Swords } from 'lucide-react';
import clsx from 'clsx';
import { getEventsByPeriod, getPeriodById } from './timelineData';

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

const EventCard = ({ event, onSelect, periodId }) => {
    const isIsrael = event.kingdom === 'israel' || event.type === 'israel';
    const isJudah = event.kingdom === 'judah' || event.type === 'judah';
    const isCentral = event.type === 'split' || event.type === 'prophet' || event.type === 'battle';

    // For periods other than divided-kingdom, use single-column layout
    const isDividedKingdom = periodId === 'divided-kingdom' || periodId === 'united-kingdom';

    const getIcon = () => {
        switch (event.type) {
            case 'split': return <Swords size={20} />;
            case 'prophet': return <Flame size={20} />;
            case 'battle': return <Swords size={20} />;
            default: return <Crown size={20} />;
        }
    };

    const getYearDisplay = () => {
        if (event.year) {
            if (event.year <= 0) {
                return event.year < 0 ? `${Math.abs(event.year)} a.C.` : 'Futuro';
            }
            return event.year > 100 ? `${event.year} a.C.` : `${event.year} d.C.`;
        }
        if (event.startYear && event.endYear) {
            const suffix = event.startYear > 100 ? 'a.C.' : 'd.C.';
            return `${event.startYear} - ${event.endYear} ${suffix}`;
        }
        return '';
    };

    // Determine card style based on period and event type
    const getCardClass = () => {
        if (isDividedKingdom) {
            if (isIsrael) return 'timeline-card-israel';
            if (isJudah) return 'timeline-card-judah';
            if (isCentral) return 'timeline-card-central';
        }
        // For other periods, use central style
        return 'timeline-card-central';
    };

    return (
        <div
            className={clsx('timeline-card', getCardClass())}
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

const TimelineRow = ({ event, onSelect, periodId }) => {
    const isIsrael = event.kingdom === 'israel' || event.type === 'israel';
    const isJudah = event.kingdom === 'judah' || event.type === 'judah';
    const isCentral = event.type === 'split' || event.type === 'prophet' || event.type === 'battle';

    // Only use 3-column layout for divided-kingdom and united-kingdom
    const isDividedKingdom = periodId === 'divided-kingdom' || periodId === 'united-kingdom';

    if (!isDividedKingdom) {
        // Single column layout for most periods
        return (
            <div className="timeline-row timeline-row-single">
                <div className="timeline-col timeline-col-center">
                    <div className="timeline-axis">
                        <div className="timeline-axis-dot" />
                    </div>
                </div>
                <div className="timeline-col timeline-col-content">
                    <EventCard event={event} onSelect={onSelect} periodId={periodId} />
                </div>
            </div>
        );
    }

    // 3-column layout for divided kingdom
    return (
        <div className="timeline-row">
            {/* Israel Column (Left) */}
            <div className="timeline-col timeline-col-left">
                {isIsrael && <EventCard event={event} onSelect={onSelect} periodId={periodId} />}
            </div>

            {/* Central Axis */}
            <div className="timeline-col timeline-col-center">
                <div className="timeline-axis">
                    <div className="timeline-axis-dot" />
                </div>
                {isCentral && <EventCard event={event} onSelect={onSelect} periodId={periodId} />}
            </div>

            {/* Judah Column (Right) */}
            <div className="timeline-col timeline-col-right">
                {isJudah && <EventCard event={event} onSelect={onSelect} periodId={periodId} />}
            </div>
        </div>
    );
};

const VerticalBibleTimeline = () => {
    const navigate = useNavigate();
    const { periodId } = useParams();
    const [selectedEvent, setSelectedEvent] = useState(null);

    // Get period info and events
    const period = getPeriodById(periodId);
    const events = getEventsByPeriod(periodId);

    // Check if this period uses 3-column layout
    const isDividedKingdom = periodId === 'divided-kingdom' || periodId === 'united-kingdom';

    const handleEventSelect = (event) => {
        setSelectedEvent(event);
        console.log('Event selected:', event);
    };

    const handleBack = () => {
        navigate('/bible-timeline');
    };

    // If period not found, show error
    if (!period) {
        return (
            <div className="timeline-container">
                <header className="timeline-header">
                    <button className="timeline-back-btn" onClick={handleBack}>
                        <ArrowLeft size={24} />
                    </button>
                    <div className="timeline-header-content">
                        <h1>Período no encontrado</h1>
                    </div>
                </header>
            </div>
        );
    }

    return (
        <div className="timeline-container">
            {/* Fixed Header */}
            <header className="timeline-header">
                <button className="timeline-back-btn" onClick={handleBack}>
                    <ArrowLeft size={24} />
                </button>
                <div className="timeline-header-content">
                    <h1>{period.title}</h1>
                    <p>{period.dateRange}</p>
                </div>
            </header>

            {/* Kingdom Labels - only for divided kingdom */}
            {isDividedKingdom && (
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
            )}

            {/* Event count indicator */}
            <div className="timeline-event-count">
                <span>{events.length} eventos</span>
            </div>

            {/* Virtualized Timeline */}
            <Virtuoso
                className="timeline-list"
                data={events}
                itemContent={(index, event) => (
                    <TimelineRow
                        key={event.id}
                        event={event}
                        onSelect={handleEventSelect}
                        periodId={periodId}
                    />
                )}
                components={{
                    Footer: () => <div style={{ height: '120px' }} />
                }}
            />

            {/* Event Detail Modal */}
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
