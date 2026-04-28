import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { usePatient } from '../hooks/usePatient';

const PatientDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { patient, isLoading, error } = usePatient(id);

  const handleBack = () => navigate('/patients');

  if (isLoading) {
    return (
      <div className="p-6 max-w-4xl mx-auto space-y-6 animate-pulse">
        <div className="h-8 bg-slate-200 w-24 rounded-md mb-8"></div>
        <div className="card p-8 h-64"></div>
        <div className="card p-8 h-48"></div>
      </div>
    );
  }

  if (error || !patient) {
    return (
      <div className="p-6 max-w-4xl mx-auto mt-12">
        <div className="text-center card p-12">
          <h3 className="text-xl font-semibold text-slate-900 mb-2">Patient Not Found</h3>
          <p className="text-slate-500 mb-8">{error || "The patient record could not be found."}</p>
          <button 
            onClick={handleBack}
            className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            Back to Patients
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <button 
        onClick={handleBack}
        className="text-sm font-medium text-slate-500 hover:text-slate-900 mb-6 flex items-center"
      >
        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
        </svg>
        Back to Directory
      </button>

      <div className="card overflow-hidden mb-6">
        <div className="p-8 border-b border-slate-200 flex justify-between items-start">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">
              {patient.firstName} {patient.lastName}
            </h1>
            <p className="text-slate-500 mt-2">
              Patient ID: {patient.id} • Last Visit: {new Date(patient.lastVisit).toLocaleDateString()}
            </p>
          </div>
          <span className="px-4 py-1.5 text-sm font-semibold rounded-full bg-slate-100 text-slate-800 uppercase tracking-wider">
            {patient.status}
          </span>
        </div>

        <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-lg font-semibold text-slate-900 mb-4 border-b border-slate-100 pb-2">
              Demographics
            </h3>
            <div className="space-y-4">
              <div className="flex">
                <span className="text-sm font-medium text-slate-500 w-32">Age</span>
                <span className="text-sm text-slate-900">{patient.age}</span>
              </div>
              <div className="flex">
                <span className="text-sm font-medium text-slate-500 w-32">Gender</span>
                <span className="text-sm text-slate-900">{patient.gender}</span>
              </div>
              <div className="flex">
                <span className="text-sm font-medium text-slate-500 w-32">Blood Type</span>
                <span className="text-sm text-slate-900">{patient.bloodType}</span>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-slate-900 mb-4 border-b border-slate-100 pb-2">
              Clinical Info
            </h3>
            <div className="space-y-4">
              <div className="flex">
                <span className="text-sm font-medium text-slate-500 w-32">Diagnosis</span>
                <span className="text-sm text-slate-900">{patient.diagnosis}</span>
              </div>
              <div className="flex">
                <span className="text-sm font-medium text-slate-500 w-32">Attending</span>
                <span className="text-sm text-slate-900">{patient.assignedDoctor}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="card overflow-hidden">
        <div className="p-8">
          <h3 className="text-lg font-semibold text-slate-900 mb-4 border-b border-slate-100 pb-2">
            Contact Information
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <div className="flex">
                <span className="text-sm font-medium text-slate-500 w-32">Phone</span>
                <span className="text-sm text-slate-900">{patient.contactInfo.phone}</span>
              </div>
              <div className="flex">
                <span className="text-sm font-medium text-slate-500 w-32">Email</span>
                <span className="text-sm text-slate-900">{patient.contactInfo.email}</span>
              </div>
            </div>
            <div className="space-y-4">
              <div className="flex">
                <span className="text-sm font-medium text-slate-500 w-32">Address</span>
                <span className="text-sm text-slate-900">{patient.contactInfo.address}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatientDetailPage;
