import React, { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { usePatients } from '../hooks/usePatients';
import { usePatientStore, selectViewMode } from '../store/patientStore';
import { ViewToggle } from '../components/ViewToggle';
import { PatientCard } from '../components/PatientCard';
import { PatientListItem } from '../components/PatientListItem';
import { useNotifications } from '../../notifications/hooks/useNotifications';

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
      <div className="p-8 flex flex-col items-center justify-center text-center bg-white rounded-xl shadow-sm border border-slate-200 mt-6 mx-6">
        <div className="text-red-500 mb-4">
          <svg className="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
        </div>
        <h3 className="text-lg font-semibold text-slate-900 mb-2">Failed to load patients</h3>
        <p className="text-slate-500 mb-6">{error}</p>
        <button 
          onClick={handleRetry}
          className="btn-primary"
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Patients</h1>
          <p className="text-sm text-slate-500 mt-1">Manage and view patient directory</p>
          <p className="text-xs text-slate-400 mt-1">Click 'Demo Notification' to test the Service Worker integration</p>
        </div>
        <div className="flex items-center space-x-4">
          <button onClick={triggerTestNotification} className="btn-secondary">
            🔔 Demo Notification
          </button>
          <ViewToggle viewMode={viewMode} onToggle={setViewMode} />
        </div>
      </div>

      {isLoading ? (
        <div className={viewMode === 'GRID' ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" : "space-y-4"}>
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="animate-pulse bg-slate-100 rounded-xl h-48 w-full"></div>
          ))}
        </div>
      ) : patients.length === 0 ? (
        <div className="p-12 text-center bg-white rounded-xl border border-slate-200">
          <h3 className="text-lg font-medium text-slate-900 mb-2">No patients found</h3>
          <p className="text-slate-500">There are no patients matching your current criteria.</p>
        </div>
      ) : (
        <div className={viewMode === 'GRID' ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" : "space-y-4"}>
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
