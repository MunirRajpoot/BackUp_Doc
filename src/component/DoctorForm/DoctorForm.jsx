"use client";
import DoctorPhase1 from './DoctorPhase1';
import DoctorPhase2 from './DoctorPhase2';
import DoctorPhase3 from './DoctorPhase3';
import React, { useState } from 'react';
const DoctorForm = () => {
    const [currentPhase, setCurrentPhase] = useState(1);

    const nextPhase = () => setCurrentPhase((prev) => prev + 1);
    const prevPhase = () => setCurrentPhase((prev) => prev - 1);

    return (
        <div className="max-w-3xl mx-auto">
            {currentPhase === 1 && <DoctorPhase1 onContinue={nextPhase} />}
            {currentPhase === 2 && <DoctorPhase2 onContinue={nextPhase} onBack={prevPhase} />}
            {currentPhase === 3 && <DoctorPhase3 onBack={prevPhase} />}
        </div>
    );
};

export default DoctorForm;