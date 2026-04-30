import type { PatientStatus } from '../../../shared/types/common';

// Exports strict TypeScript models for patient records.
export type { PatientStatus };

/**
 * Supported UI layouts for the patient directory
 */
export type ViewMode = 'GRID' | 'LIST';

/**
 * Comprehensive patient health and demographic record
 */
export interface Patient {
    /** Unique identifier (UUID or similar) */
    id: string;
    /** Legal first name */
    firstName: string;
    /** Legal last name */
    lastName: string;
    /** Current age in years */
    age: number;
    /** Biological gender */
    gender: string;
    /** Blood group and Rh factor */
    bloodType: string;
    /** Primary medical condition or reason for visit */
    diagnosis: string;
    /** Current clinical state in the facility */
    status: PatientStatus;
    /** ISO 8601 string of the most recent clinical encounter */
    lastVisit: string;
    /** Name of the physician overseeing care */
    assignedDoctor: string;
    /** Contact information and physical location */
    contactInfo: {
        /** Primary contact phone number */
        phone: string;
        /** Personal or billing email address */
        email: string;
        /** Full residential address */
        address: string;
    };
}
// interface was chosen because the Patient entity is likely to be extended with medical history or insurance sub-objects.

/**
 * Criteria used to filter and paginate the patient list
 */
export type PatientFilters = {
    /** Filter by specific clinical status */
    status?: PatientStatus;
    /** Search string for names or IDs */
    search?: string;
    /** Requested page number */
    page: number;
    /** Number of patients per page */
    pageSize: number;
};
// type was chosen to represent a transient state object used specifically for query parameters.