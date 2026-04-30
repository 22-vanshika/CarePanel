import React from 'react';
import { Card } from '@shared/components/Card/Card';
import { type LedgerEntry } from '../types';

interface OperationalLedgerProps {
    data: LedgerEntry[];
}

export const OperationalLedger: React.FC<OperationalLedgerProps> = ({ data }) => {
    return (
        <Card padding="none" className="overflow-hidden">
            <div className="p-6 border-b border-[var(--color-border)]">
                <h2 className="text-lg font-semibold text-[var(--color-text)]">Departmental Operational Ledger</h2>
                <p className="text-xs text-[var(--color-text-muted)] mt-1">Real-time efficiency metrics across all active wards</p>
            </div>
            <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="text-[var(--color-text-muted)] text-[var(--text-xs)] uppercase tracking-wider border-b border-[var(--color-border)]">
                            <th className="px-6 py-4 font-medium">Department</th>
                            <th className="px-6 py-4 font-medium">Total Staff</th>
                            <th className="px-6 py-4 font-medium">Wait Time</th>
                            <th className="px-6 py-4 font-medium">Efficiency</th>
                            <th className="px-6 py-4 font-medium text-right">Status</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-[var(--color-border)]/10">
                        {data.map((row, i) => (
                            <tr key={i} className="hover:bg-[var(--color-surface)]/50 transition-colors">
                                <td className="px-6 py-4 text-sm font-medium text-[var(--color-text)]">{row.department}</td>
                                <td className="px-6 py-4 text-sm text-[var(--color-text-muted)]">{row.staff} Personnel</td>
                                <td className="px-6 py-4 text-sm text-[var(--color-text-muted)]">{row.waitTime}</td>
                                <td className="px-6 py-4 min-w-[120px]">
                                    <div className="flex items-center gap-3">
                                        <div className="flex-1 h-1.5 bg-[var(--color-border)] rounded-full overflow-hidden">
                                            <div
                                                className={`h-full rounded-full ${row.efficiency > 80 ? 'bg-[var(--color-success)]' :
                                                        row.efficiency > 70 ? 'bg-[var(--color-warning)]' : 'bg-[var(--color-error)]'
                                                    }`}
                                                style={{ width: `${row.efficiency}%` }}
                                            />
                                        </div>
                                        <span className="text-xs text-[var(--color-text-muted)] w-8">{row.efficiency}%</span>
                                    </div>
                                </td>
                                <td className="px-6 py-4 text-right">
                                    <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold tracking-tight ${row.status === 'OPTIMAL' ? 'bg-[var(--color-success)]/10 text-[var(--color-success)]' :
                                            row.status === 'DELAYED' ? 'bg-[var(--color-warning)]/10 text-[var(--color-warning)]' :
                                                'bg-[var(--color-error)]/10 text-[var(--color-error)]'
                                        }`}>
                                        {row.status}
                                    </span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </Card>
    );
};
