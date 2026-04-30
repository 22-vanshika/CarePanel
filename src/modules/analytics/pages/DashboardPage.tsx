import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { useAuthStore } from '../../../app/store/authStore';
import { Card } from '../../../shared/components/Card/Card';
import { Button } from '../../../shared/components/Button/Button';
import { StatCard } from '../../../shared/components/StatCard/StatCard';
import { PatientRow } from '../../../shared/components/PatientRow/PatientRow';
import { AppointmentRow } from '../../../shared/components/AppointmentRow/AppointmentRow';
import { AlertRow } from '../../../shared/components/AlertRow/AlertRow';
import PageSkeleton from '../../../shared/components/PageSkeleton';

import { usePatientStats } from '../hooks/usePatientStats';
import { useCriticalAlerts } from '../hooks/useCriticalAlerts';
import { useTodayAppointments } from '../hooks/useTodayAppointments';
import { useRecentAdmissions } from '../hooks/useRecentAdmissions';


export const DashboardPage: React.FC = () => {
    const user = useAuthStore(state => state.user);
    const doctorName = user?.displayName ? user.displayName.split(' ')[0] : 'Smith';

    const statsQuery = usePatientStats();
    const alertsQuery = useCriticalAlerts();
    const appointmentsQuery = useTodayAppointments();
    const admissionsQuery = useRecentAdmissions();

    const isLoading = statsQuery.isLoading || alertsQuery.isLoading || appointmentsQuery.isLoading || admissionsQuery.isLoading;

    if (isLoading) {
        return <PageSkeleton />;
    }

    const stats = statsQuery.data;
    const alerts = alertsQuery.data || [];
    const appointments = appointmentsQuery.data || [];
    const admissions = admissionsQuery.data || [];

    if (!stats) return null;

    return (
        <div className="p-[var(--space-8)] space-y-[var(--space-6)] max-w-7xl mx-auto font-sans">
            {/* GREETING HEADER */}
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-[var(--space-4)]">
                <div>
                    <h1 className="text-[var(--text-2xl)] font-bold text-[var(--color-text)] opacity-85 mb-1 font-McLaren">
                        Good morning, <span className="text-[var(--color-primary)]">Dr. {doctorName}</span>
                    </h1>
                    <p className="text-[var(--color-text-muted)] opacity-45 text-[var(--text-sm)]">
                        {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })} — Here's what's happening today
                    </p>
                </div>
                <Button variant="primary" className="shadow-[var(--shadow-lg)] shadow-[var(--color-primary)]/20">
                    <svg className="w-5 h-5 mr-2 inline-block" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
                    New Patient
                </Button>
            </div>

            {/* 5 STAT CARDS */}
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-[var(--space-4)]">
                <StatCard
                    label="Total Patients"
                    value={stats.totalPatients.toLocaleString()}
                    accessory={{
                        type: 'delta',
                        value: stats.totalPatientsDelta.value,
                        trend: stats.totalPatientsDelta.trend
                    }}
                />

                <StatCard
                    label="Critical Alerts"
                    value={alerts.length}
                    variant="danger"
                    accessory={{ type: 'badge', label: 'Urgent', color: 'error' }}
                />

                <StatCard
                    label="Admissions Today"
                    value={stats.admissionsToday}
                    accessory={{
                        type: 'delta',
                        value: stats.admissionsTodayDelta.value,
                        trend: stats.admissionsTodayDelta.trend
                    }}
                />

                <StatCard
                    label="Bed Occupancy"
                    value={`${stats.bedOccupancy}%`}
                    accessory={{ type: 'progress', value: stats.bedOccupancy }}
                />

                <StatCard
                    label="Appointments Today"
                    value={stats.appointmentsToday}
                    accessory={{ type: 'footnote', label: `${stats.appointmentsRemaining} remaining` }}
                />
            </div>

            {/* MAIN CONTENT 2-COLUMN */}
            <div className="flex flex-col xl:flex-row gap-[var(--space-6)]">
                {/* LEFT COLUMN */}
                <div className="flex-1 space-y-[var(--space-6)] min-w-0">
                    {/* Patient Flow Chart */}
                    <Card padding="md" elevation="md" className="flex flex-col h-[380px]">
                        <div className="flex items-center justify-between mb-[var(--space-6)]">
                            <h2 className="text-[var(--text-lg)] font-semibold text-[var(--color-text)] ">Patient Flow</h2>
                            <select className="bg-[var(--color-bg)] border border-[var(--color-border)] text-[0.75rem] text-[var(--color-text)] opacity-95 rounded-[var(--radius-md)] px-[var(--space-2)] py-[var(--space-1)] outline-none">
                                <option>This Week</option>
                                <option>Last Week</option>
                            </select>
                        </div>
                        <div className="flex-1 min-h-0">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={stats.patientFlow} margin={{ top: 5, right: 0, left: -20, bottom: 5 }} barGap={6}>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--color-border)" />
                                    <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fill: 'var(--color-text-muted)', fontSize: 12 }} dy={10} />
                                    <YAxis axisLine={false} tickLine={false} tick={{ fill: 'var(--color-text-muted)', fontSize: 12 }} />
                                    <Tooltip
                                        cursor={{ fill: 'var(--color-bg)' }}
                                        contentStyle={{ backgroundColor: 'var(--color-surface)', borderColor: 'var(--color-border)', borderRadius: 'var(--radius-md)', color: 'var(--color-text)' }}
                                        itemStyle={{ color: 'var(--color-text)' }}
                                    />
                                    <Legend iconType="circle" wrapperStyle={{ fontSize: '12px', paddingTop: '20px' }} />
                                    <Bar dataKey="admissions" name="Admissions" fill="var(--color-primary)" fillOpacity={0.45} stroke="var(--color-primary)" strokeWidth={1} radius={[4, 4, 0, 0]} barSize={12} />
                                    <Bar dataKey="discharges" name="Discharges" fill="var(--color-success)" fillOpacity={0.45} stroke="var(--color-success)" strokeWidth={1} radius={[4, 4, 0, 0]} barSize={12} />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </Card>

                    {/* Recent Admissions Table */}
                    <Card padding="none" elevation="md" className="overflow-hidden flex flex-col">
                        <div className="p-[var(--space-5)] border-b border-[var(--color-border)] flex items-center justify-between">
                            <h2 className="text-[var(--text-lg)] font-semibold text-[var(--color-text)] opacity-85">Recent Admissions</h2>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="bg-[var(--color-bg)]/50 text-[var(--color-text-muted)] text-[0.75rem] uppercase tracking-wider border-b border-[var(--color-border)]">
                                        <th className="px-[var(--space-5)] py-[var(--space-3)] font-medium">Patient</th>
                                        <th className="px-[var(--space-5)] py-[var(--space-3)] font-medium">Department</th>
                                        <th className="px-[var(--space-5)] py-[var(--space-3)] font-medium">Time</th>
                                        <th className="px-[var(--space-5)] py-[var(--space-3)] font-medium text-right">Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {admissions.map((row) => (
                                        <PatientRow
                                            key={row.id}
                                            name={row.name}
                                            initials={row.initials}
                                            department={row.department}
                                            timeAgo={row.timeAgo}
                                            status={row.status}
                                        />
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </Card>
                </div>

                {/* RIGHT SIDEBAR */}
                <div className="xl:w-[320px] shrink-0 space-y-[var(--space-6)]">
                    {/* Critical Alerts */}
                    <Card padding="md" elevation="md">
                        <div className="flex items-center justify-between mb-[var(--space-4)]">
                            <h2 className="text-[var(--text-lg)] font-semibold text-[var(--color-text)] opacity-85">Critical Alerts</h2>
                            <span className="bg-[var(--color-error)]/[0.08] text-[var(--color-error)] opacity-80 text-[0.75rem] px-[var(--space-2)] py-[2px] rounded-full border border-[var(--color-error)]/[0.12]">
                                {alerts.length} New
                            </span>
                        </div>
                        <div className="space-y-[var(--space-3)]">
                            {alerts.map(alert => (
                                <AlertRow
                                    key={alert.id}
                                    patientName={alert.patientName}
                                    ward={alert.ward}
                                    readingLabel={alert.readingLabel}
                                    readingValue={alert.readingValue}
                                />
                            ))}
                        </div>
                    </Card>

                    {/* Today's Appointments */}
                    <Card padding="md" elevation="md">
                        <div className="flex items-center justify-between mb-[var(--space-4)]">
                            <h2 className="text-[var(--text-lg)] font-semibold text-[var(--color-text)] opacity-85">Upcoming</h2>
                            <Button type="button" variant="ghost" size="sm" className="text-[var(--color-text-muted)] opacity-45 hover:opacity-100 transition-opacity">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" /></svg>
                            </Button>
                        </div>
                        <div className="space-y-[var(--space-4)]">
                            {appointments.map(apt => (
                                <AppointmentRow
                                    key={apt.id}
                                    time={apt.time}
                                    patientName={apt.patientName}
                                    type={apt.type}
                                    accentColor={apt.accentColor}
                                />
                            ))}
                        </div>
                    </Card>

                    {/* Lab Results Pending */}
                    <div className="bg-[var(--color-error)]/[0.03] border border-[var(--color-error)]/20 rounded-[var(--radius-lg)] p-[var(--space-5)] shadow-[var(--shadow-md)] relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-[var(--space-4)] opacity-10">
                            <svg className="w-16 h-16 text-[var(--color-error)]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" /></svg>
                        </div>
                        <h2 className="text-[var(--text-lg)] font-semibold text-[var(--color-text)] opacity-85 mb-2 relative z-10">Lab Results Pending</h2>
                        <p className="text-[var(--text-sm)] text-[var(--color-text-muted)] opacity-45 mb-[var(--space-4)] relative z-10">3 critical blood panels require your immediate attention.</p>
                        <Button variant="danger" className="w-full relative z-10 bg-[var(--color-error)]/[0.08] text-[var(--color-error)] opacity-85 border border-[var(--color-error)]/20 hover:bg-[var(--color-error)]/[0.12]">
                            Review Now
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DashboardPage;