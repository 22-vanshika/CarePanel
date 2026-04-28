// Exports TypeScript interfaces strictly for analytics domain models.
export type TrendDirection = 'UP' | 'DOWN' | 'FLAT';
// type was chosen to define a specific union of literal strings.

/**
 * Data structure for an individual dashboard KPI card
 */
export interface MetricCard {
    /** Unique identifier for the metric */
    id: string;
    /** Human-readable name of the metric */
    label: string;
    /** Current numerical or string value */
    value: string | number;
    /** Unit of measurement (e.g., '%', 'days') */
    unit: string;
    /** Percentage change compared to previous period */
    trend: number;
    /** Visual indicator for the trend movement */
    trendDirection: TrendDirection;
}
// interface was chosen to allow adding UI-specific flags like 'colorSchema' or 'iconName' in the future.

/**
 * Single data point for visualization in charts
 */
export type ChartDataPoint = {
    /** Category or time label for the X-axis */
    label: string;
    /** Numerical value for the Y-axis */
    value: number;
};
// type was chosen because data points are simple, consistent structures used in arrays for mapping.

/**
 * Aggregated data summary for the main dashboard view
 */
export interface AnalyticsSummary {
    /** Count of all registered patients */
    totalPatients: number;
    /** Count of patients currently in 'ACTIVE' status */
    activePatients: number;
    /** Count of patients discharged within the current 24h window */
    dischargedToday: number;
    /** Collection of specific KPI metrics for display */
    metrics: MetricCard[];
}
// interface was chosen as the summary object may grow to include more complex breakdowns as the app evolves.