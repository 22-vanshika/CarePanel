import React, { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { usePatients } from '../hooks/usePatients';
import { usePatientStore, selectViewMode } from '../store/patientStore';
import { ViewToggle } from '../components/ViewToggle';
import { PatientCard } from '../components/PatientCard';
import { PatientListItem } from '../components/PatientListItem';
import { useNotifications } from '../../notifications/hooks/useNotifications';
import { Card } from '@shared/components/Card/Card';
import { Button } from '@shared/components/Button/Button';

const PatientsPage: React.FC = () => {
    const navigate = useNavigate();
    const { patients, isLoading, error } = usePatients();
    const viewMode = usePatientStore(selectViewMode);
    const setViewMode = usePatientStore(state => state.setViewMode);
    const { triggerTestNotification } = useNotifications();

    const handlePatientClick = useCallback((id: string) => {
        navigate(`/patients/${id}`);
    }, [navigate]);

    const resetFilters = usePatientStore(state => state.resetFilters);
    const handleRetry = () => resetFilters();

    if (error) {
        return (
            <Card className="p-[var(--space-8)] flex flex-col items-center justify-center text-center mt-[var(--space-6)] mx-[var(--space-6)]" padding="md" elevation="sm">
                <div className="text-[var(--color-error)] mb-[var(--space-4)]">
                    <svg className="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77 1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                </div>
                <h3 className="text-[var(--text-lg)] font-semibold text-[var(--color-text)] mb-[var(--space-2)]">Failed to load patients</h3>
                <p className="text-[var(--color-text-muted)] mb-[var(--space-6)]">{error}</p>
                <Button type="button" onClick={handleRetry} variant="primary" size="md">
                    Try Again
                </Button>
            </Card>
        );
    }

    return (
        <div className="p-[var(--space-6)] max-w-7xl mx-auto">
            <div className="flex justify-between items-center mb-[var(--space-6)]">
                <div>
                    <h1 className="text-[var(--text-2xl)] font-bold text-[var(--color-text)]">Patients</h1>
                    <p className="text-[var(--text-sm)] text-[var(--color-text-muted)] mt-[var(--space-1)]">Manage and view patient directory</p>
                    <p className="text-[var(--text-xs)] text-[var(--color-text-muted)] mt-[var(--space-1)]">Click 'Demo Notification' to test the Service Worker integration</p>
                </div>
                <div className="flex items-center space-x-[var(--space-4)]">
                    <Button type="button" onClick={triggerTestNotification} variant="secondary" size="sm">
                        🔔 Demo Notification
                    </Button>
                    <ViewToggle viewMode={viewMode} onToggle={setViewMode} />
                </div>
            </div>

            {isLoading ? (
                <div className={viewMode === 'GRID' ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[var(--space-6)]" : "space-y-[var(--space-4)]"}>
                    {Array.from({ length: 6 }).map((_, i) => (
                        <Card key={i} className="animate-pulse h-48 w-full bg-[var(--color-surface)]" padding="none" elevation="sm" />
                    ))}
                </div>
            ) : patients.length === 0 ? (
                <Card className="p-[var(--space-12)] text-center" padding="md" elevation="sm">
                    <h3 className="text-[var(--text-lg)] font-medium text-[var(--color-text)] mb-[var(--space-2)]">No patients found</h3>
                    <p className="text-[var(--color-text-muted)]">There are no patients matching your current criteria.</p>
                </Card>
            ) : (
                <div className={viewMode === 'GRID' ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[var(--space-6)] items-stretch" : "space-y-[var(--space-4)]"}>
                    {patients.map(patient => (
                        viewMode === 'GRID' ? (
                            <PatientCard key={patient.id} patient={patient} onClick={handlePatientClick} />
                        ) : (
                            <PatientListItem key={patient.id} patient={patient} onClick={handlePatientClick} />
                        )
                    ))}
                </div>
            )}
        </div>
    );
};

export default PatientsPage;
