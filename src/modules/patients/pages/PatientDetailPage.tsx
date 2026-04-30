import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { usePatient } from '../hooks/usePatient';
import { Card } from '@shared/components/Card/Card';
import { Button } from '@shared/components/Button/Button';
import { StatusBadge } from '@shared/components/StatusBadge/StatusBadge';

const PatientDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { patient, isLoading, error } = usePatient(id);

  const handleBack = () => navigate('/patients');

  if (isLoading) {
    return (
      <div className="p-[var(--space-6)] max-w-4xl mx-auto space-y-[var(--space-6)] animate-pulse">
        <div className="h-8 bg-[var(--color-surface)] w-24 rounded-[var(--radius-md)] mb-[var(--space-8)]"></div>
        <Card className="h-64" padding="md" elevation="sm" />
        <Card className="h-48" padding="md" elevation="sm" />
      </div>
    );
  }

  if (error || !patient) {
    return (
      <div className="p-[var(--space-6)] max-w-4xl mx-auto mt-[var(--space-12)]">
        <Card className="text-center" padding="lg">
          <h3 className="text-[var(--text-xl)] font-semibold text-[var(--color-text)] mb-[var(--space-2)]">Patient Not Found</h3>
          <p className="text-[var(--color-text-muted)] mb-[var(--space-8)]">{error || "The patient record could not be found."}</p>
          <Button type="button" onClick={handleBack} variant="primary" size="md">
            Back to Patients
          </Button>
        </Card>
      </div>
    );
  }

  return (
    <div className="p-[var(--space-6)] max-w-4xl mx-auto">
      <Button
        type="button"
        variant="ghost"
        size="sm"
        className="mb-[var(--space-6)] inline-flex items-center gap-[var(--space-2)] text-[var(--color-text-muted)] hover:text-[var(--color-text)]"
        onClick={handleBack}
      >
        <span className="inline-flex items-center gap-[var(--space-2)]">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to Directory
        </span>
      </Button>

      <Card className="overflow-hidden mb-[var(--space-6)]" padding="none">
        <div className="p-[var(--space-6)] md:p-[var(--space-8)] border-b border-[var(--color-border)] flex justify-between items-start">
          <div>
            <h1 className="text-[var(--text-2xl)] font-semibold text-[var(--color-text)] tracking-tight">
              {patient.firstName} {patient.lastName}
            </h1>
            <p className="text-[var(--text-sm)] text-[var(--color-text-muted)] mt-[var(--space-2)]">
              Patient ID: {patient.id} • Last Visit: {new Date(patient.lastVisit).toLocaleDateString()}
            </p>
          </div>
          <StatusBadge status={patient.status} className="uppercase tracking-wider" />
        </div>

        <div className="p-[var(--space-6)] md:p-[var(--space-8)] grid grid-cols-1 md:grid-cols-2 gap-[var(--space-8)] bg-[var(--color-bg)]/30">
          <div>
            <h3 className="text-[var(--text-base)] font-semibold text-[var(--color-text)] mb-[var(--space-4)] border-b border-[var(--color-border)] pb-[var(--space-2)]">
              Demographics
            </h3>
            <div className="space-y-[var(--space-3)]">
              <div className="flex">
                <span className="text-[var(--text-sm)] text-[var(--color-text-muted)] w-32">Age</span>
                <span className="text-[var(--text-sm)] text-[var(--color-text)] font-medium">{patient.age}</span>
              </div>
              <div className="flex">
                <span className="text-[var(--text-sm)] text-[var(--color-text-muted)] w-32">Gender</span>
                <span className="text-[var(--text-sm)] text-[var(--color-text)] font-medium">{patient.gender}</span>
              </div>
              <div className="flex">
                <span className="text-[var(--text-sm)] text-[var(--color-text-muted)] w-32">Blood Type</span>
                <span className="text-[var(--text-sm)] text-[var(--color-text)] font-medium">{patient.bloodType}</span>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-[var(--text-base)] font-semibold text-[var(--color-text)] mb-[var(--space-4)] border-b border-[var(--color-border)] pb-[var(--space-2)]">
              Clinical Info
            </h3>
            <div className="space-y-[var(--space-3)]">
              <div className="flex">
                <span className="text-[var(--text-sm)] text-[var(--color-text-muted)] w-32">Diagnosis</span>
                <span className="text-[var(--text-sm)] text-[var(--color-text)] font-medium">{patient.diagnosis}</span>
              </div>
              <div className="flex">
                <span className="text-[var(--text-sm)] text-[var(--color-text-muted)] w-32">Attending</span>
                <span className="text-[var(--text-sm)] text-[var(--color-text)] font-medium">{patient.assignedDoctor}</span>
              </div>
            </div>
          </div>
        </div>
      </Card>

      <Card padding="none">
        <div className="p-[var(--space-6)] md:p-[var(--space-8)]">
          <h3 className="text-[var(--text-base)] font-semibold text-[var(--color-text)] mb-[var(--space-4)] border-b border-[var(--color-border)] pb-[var(--space-2)]">
            Contact Information
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-[var(--space-8)]">
            <div className="space-y-[var(--space-3)]">
              <div className="flex">
                <span className="text-[var(--text-sm)] text-[var(--color-text-muted)] w-32">Phone</span>
                <span className="text-[var(--text-sm)] text-[var(--color-text)] font-medium">{patient.contactInfo.phone}</span>
              </div>
              <div className="flex">
                <span className="text-[var(--text-sm)] text-[var(--color-text-muted)] w-32">Email</span>
                <span className="text-[var(--text-sm)] text-[var(--color-text)] font-medium">{patient.contactInfo.email}</span>
              </div>
            </div>
            <div className="space-y-[var(--space-3)]">
              <div className="flex">
                <span className="text-[var(--text-sm)] text-[var(--color-text-muted)] w-32">Address</span>
                <span className="text-[var(--text-sm)] text-[var(--color-text)] font-medium">{patient.contactInfo.address}</span>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default PatientDetailPage;
