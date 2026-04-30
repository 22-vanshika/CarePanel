import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
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

import staffInsights from '../../../mocks/analytics/staff-insights.json';

export const DashboardPage: React.FC = () => {
    const user = useAuthStore(state => state.user);
    const doctorName = user?.displayName ? user.displayName.split(' ')[0] : 'Sharma';

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
        <div className="p-[var(--space-6)] md:p-[var(--space-8)] space-y-[var(--space-8)] max-w-7xl mx-auto">
            {/* GREETING HEADER */}
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
                <div>
                    <h1 className="page-title">
                        Good morning, <span className="text-[var(--color-primary)]">Dr. {doctorName}</span>
                    </h1>
                    <p className="page-subtitle">
                        {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })} — Here's what's happening today
                    </p>
                </div>
                <Button variant="secondary" className="bg-[var(--color-surface)] border-[var(--color-border)] text-[var(--color-text)]">
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
                    New Patient
                </Button>
            </div>

            {/* 5 STAT CARDS */}
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-[var(--space-6)]">
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
            <div className="flex flex-col xl:flex-row gap-[var(--space-6)] items-start">
                {/* LEFT COLUMN */}
                <div className="flex-1 space-y-[var(--space-6)] min-w-0 w-full">
                    {/* Patient Flow Chart */}
                    <Card padding="md" elevation="sm" className="flex flex-col h-[400px]">
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-lg font-semibold text-[var(--color-text)] tracking-tight font-display">Patient Flow</h2>
                            <div className="flex items-center gap-2">
                                <div className="flex items-center gap-4 mr-4 text-[10px] font-medium uppercase tracking-wider">
                                    <div className="flex items-center gap-1.5">
                                        <div className="w-2 h-2 rounded-full bg-[var(--color-primary)]" />
                                        <span className="text-[var(--color-text-muted)]">Admissions</span>
                                    </div>
                                    <div className="flex items-center gap-1.5">
                                        <div className="w-2 h-2 rounded-full bg-[var(--color-success)]" />
                                        <span className="text-[var(--color-text-muted)]">Discharges</span>
                                    </div>
                                </div>
                                <select className="bg-[var(--color-bg)] border border-[var(--color-border)] text-[var(--text-xs)] text-[var(--color-text)] rounded-[var(--radius-md)] px-3 py-1 outline-none focus:border-[var(--color-primary)] transition-colors">
                                    <option>This Week</option>
                                    <option>Last Week</option>
                                </select>
                            </div>
                        </div>
                        <div className="flex-1 min-h-0">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={stats.patientFlow} margin={{ top: 5, right: 0, left: -20, bottom: 5 }} barGap={8}>
                                    <defs>
                                        <linearGradient id="admissionGradient" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="0%" stopColor="var(--color-primary)" stopOpacity={0.8} />
                                            <stop offset="100%" stopColor="var(--color-primary)" stopOpacity={0.2} />
                                        </linearGradient>
                                        <linearGradient id="dischargeGradient" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="0%" stopColor="var(--color-success)" stopOpacity={0.8} />
                                            <stop offset="100%" stopColor="var(--color-success)" stopOpacity={0.2} />
                                        </linearGradient>
                                    </defs>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--color-border)" opacity={0.5} />
                                    <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fill: 'var(--color-text-muted)', fontSize: 11, fontWeight: 500 }} dy={10} />
                                    <YAxis axisLine={false} tickLine={false} tick={{ fill: 'var(--color-text-muted)', fontSize: 11, fontWeight: 500 }} />
                                    <Tooltip
                                        cursor={{ fill: 'var(--color-border)', opacity: 0.1 }}
                                        contentStyle={{ backgroundColor: 'var(--color-surface)', borderColor: 'var(--color-border)', borderRadius: 'var(--radius-md)', color: 'var(--color-text)', fontSize: '12px' }}
                                        itemStyle={{ color: 'var(--color-text)' }}
                                    />
                                    <Bar dataKey="admissions" name="Admissions" fill="url(#admissionGradient)" radius={[4, 4, 0, 0]} barSize={16} />
                                    <Bar dataKey="discharges" name="Discharges" fill="url(#dischargeGradient)" radius={[4, 4, 0, 0]} barSize={16} />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </Card>

                    {/* Recent Admissions Table */}
                    <Card padding="none" elevation="sm" className="overflow-hidden flex flex-col">
                        <div className="p-5 border-b border-[var(--color-border)] flex items-center justify-between bg-[var(--color-surface)]">
                            <h2 className="text-lg font-semibold text-[var(--color-text)] tracking-tight font-display">Recent Admissions</h2>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="text-[var(--color-text-muted)] text-[10px] uppercase tracking-widest border-b border-[var(--color-border)] bg-[var(--color-bg)]/30">
                                        <th className="px-6 py-3 font-semibold">Patient</th>
                                        <th className="px-6 py-3 font-semibold">Department</th>
                                        <th className="px-6 py-3 font-semibold">Time</th>
                                        <th className="px-6 py-3 font-semibold text-right">Status</th>
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

                    <div className="space-y-[var(--space-6)]">
                        {staffInsights.activeInsights.map(insight => (
                            <Card key={insight.id} padding="md" elevation="sm" className={insight.type === 'ALERT' ? 'bg-gradient-to-br from-[var(--color-surface)] to-[var(--color-primary)]/5' : ''}>
                                <div className="flex items-center gap-2 mb-4">
                                    <div className={`p-1.5 rounded-lg ${insight.type === 'ALERT' ? 'bg-[var(--color-primary)]/10 text-[var(--color-primary)]' : 'bg-[var(--color-success)]/10 text-[var(--color-success)]'}`}>
                                        {insight.type === 'ALERT' ? (
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                                        ) : (
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                        )}
                                    </div>
                                    <h2 className="text-lg font-semibold text-[var(--color-text)] tracking-tight font-display">{insight.title}</h2>
                                </div>
                                <div className="p-3 rounded-xl bg-[var(--color-bg)]/40 border border-[var(--color-border)]/5 space-y-2">
                                    <p className="text-[11px] text-[var(--color-text-muted)] leading-relaxed">{insight.description}</p>
                                    <div className="pt-2">
                                        <button className="text-[10px] font-bold text-[var(--color-primary)] uppercase tracking-widest hover:underline">{insight.actionLabel} →</button>
                                    </div>
                                </div>
                            </Card>
                        ))}
                    </div>
                </div>

                {/* RIGHT SIDEBAR */}
                <div className="xl:w-[340px] shrink-0 space-y-[var(--space-6)] w-full">
                    {/* Critical Alerts */}
                    <Card padding="md" elevation="sm">
                        <div className="flex items-center justify-between mb-5">
                            <h2 className="text-lg font-semibold text-[var(--color-text)] tracking-tight font-display">Critical Alerts</h2>
                            <span className="bg-[var(--color-error)]/10 text-[var(--color-error)] text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider border border-[var(--color-error)]/20">
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
                    <Card padding="md" elevation="sm">
                        <div className="flex items-center justify-between mb-5">
                            <h2 className="text-lg font-semibold text-[var(--color-text)] tracking-tight font-display">Upcoming</h2>
                            <Button type="button" variant="ghost" size="sm" className="text-[var(--color-text-muted)] hover:text-[var(--color-text)] transition-colors">
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
                    <div className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-[var(--radius-lg)] p-5 relative overflow-hidden group hover:border-[var(--color-error)]/30 transition-all duration-500">
                        <div className="absolute top-0 right-0 p-4 opacity-[0.03] group-hover:opacity-[0.08] transition-opacity">
                            <svg className="w-24 h-24 text-[var(--color-error)]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" /></svg>
                        </div>

                        <div className="flex gap-4 relative z-10">
                            <div className="shrink-0 w-10 h-10 rounded-xl bg-[var(--color-error)]/10 flex items-center justify-center text-[var(--color-error)]">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" /></svg>
                            </div>
                            <div className="flex-1">
                                <h2 className="text-lg font-semibold text-[var(--color-text)] mb-1 font-display">Lab Reports</h2>
                                <p className="text-[var(--text-sm)] text-[var(--color-text-muted)] mb-4 leading-snug">3 critical blood panels require your immediate attention.</p>
                                <Button variant="danger" className="w-full bg-[var(--color-error)]/10 text-[var(--color-error)] border border-[var(--color-error)]/20 hover:bg-[var(--color-error)]/20 transition-all font-medium py-2 h-auto text-xs">
                                    Review Now
                                </Button>
                            </div>
                        </div>
                    </div>

                    <Card padding="md" elevation="sm">
                        <div className="flex items-center justify-between mb-5">
                            <h2 className="text-lg font-semibold text-[var(--color-text)] tracking-tight font-display">Staff on Call</h2>
                            <span className="text-[10px] text-[var(--color-success)] font-bold uppercase tracking-wider">Active</span>
                        </div>
                        <div className="space-y-4">
                            {staffInsights.staffOnCall.map((staff) => (
                                <div key={staff.id} className="flex items-center gap-3 group cursor-pointer">
                                    <div className="w-9 h-9 rounded-full bg-[var(--color-primary)]/10 flex items-center justify-center text-[var(--color-primary)] font-bold text-xs">
                                        {staff.img}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="text-sm font-semibold text-[var(--color-text)] truncate">{staff.name}</p>
                                        <p className="text-[10px] text-[var(--color-text-muted)] truncate">{staff.role}</p>
                                    </div>
                                    <span className={`text-[10px] font-medium ${staff.statusColor || 'text-[var(--color-success)]'}`}>{staff.status}</span>
                                </div>
                            ))}
                        </div>
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default DashboardPage;