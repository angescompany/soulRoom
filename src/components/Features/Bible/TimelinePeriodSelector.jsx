import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
    ArrowLeft,
    Globe,
    Tent,
    Flame,
    Swords,
    Scale,
    Crown,
    Split,
    Link2,
    Building2,
    Cross,
    Church,
    Sparkles
} from 'lucide-react';
import { getPeriods } from './timelineData';

// Map icon names to Lucide components
const iconMap = {
    'globe': Globe,
    'tent': Tent,
    'flame': Flame,
    'swords': Swords,
    'scale': Scale,
    'crown': Crown,
    'split': Split,
    'chains': Link2,
    'building': Building2,
    'cross': Cross,
    'church': Church,
    'sparkles': Sparkles
};

const PeriodCard = ({ period, onClick }) => {
    const IconComponent = iconMap[period.icon] || Globe;

    return (
        <div
            className="period-card"
            onClick={() => onClick(period.id)}
            style={{
                '--period-color': period.color
            }}
        >
            <div className="period-card-icon">
                <IconComponent size={28} />
            </div>
            <div className="period-card-content">
                <h3>{period.title}</h3>
                <p>{period.description}</p>
                <span className="period-card-date">{period.dateRange}</span>
            </div>
        </div>
    );
};

const TimelinePeriodSelector = () => {
    const navigate = useNavigate();
    const periods = getPeriods();

    const oldTestament = periods.filter(p => p.testament === 'old');
    const newTestament = periods.filter(p => p.testament === 'new');

    const handlePeriodClick = (periodId) => {
        navigate(`/bible-timeline/${periodId}`);
    };

    const handleBack = () => {
        navigate('/read');
    };

    return (
        <div className="period-selector-container">
            {/* Header */}
            <header className="period-selector-header">
                <button className="timeline-back-btn" onClick={handleBack}>
                    <ArrowLeft size={24} />
                </button>
                <div className="timeline-header-content">
                    <h1>Cronología Bíblica</h1>
                    <p>Explora la historia desde Génesis hasta Apocalipsis</p>
                </div>
            </header>

            {/* Content */}
            <div className="period-selector-content">
                {/* Old Testament Section */}
                <section className="period-section">
                    <div className="period-section-header">
                        <h2>📜 Antiguo Testamento</h2>
                        <span className="period-section-count">{oldTestament.length} períodos</span>
                    </div>
                    <div className="period-grid">
                        {oldTestament.map(period => (
                            <PeriodCard
                                key={period.id}
                                period={period}
                                onClick={handlePeriodClick}
                            />
                        ))}
                    </div>
                </section>

                {/* New Testament Section */}
                <section className="period-section">
                    <div className="period-section-header">
                        <h2>✝️ Nuevo Testamento</h2>
                        <span className="period-section-count">{newTestament.length} períodos</span>
                    </div>
                    <div className="period-grid">
                        {newTestament.map(period => (
                            <PeriodCard
                                key={period.id}
                                period={period}
                                onClick={handlePeriodClick}
                            />
                        ))}
                    </div>
                </section>
            </div>
        </div>
    );
};

export default TimelinePeriodSelector;
