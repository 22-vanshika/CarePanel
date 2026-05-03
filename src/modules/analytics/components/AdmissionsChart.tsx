import { memo } from 'react';
import type { ChartDataPoint } from '../types';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface AdmissionsChartProps {
    data: ChartDataPoint[];
    title: string;
}

export const AdmissionsChart = memo<AdmissionsChartProps>(function AdmissionsChart({ data, title }) {
    return (
        <div className="card p-6 w-full h-[400px] flex flex-col">
            <h3 className="text-lg font-semibold text-[var(--color-text)] mb-6">{title}</h3>
            <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={data} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--color-border)" />
                        <XAxis dataKey="label" axisLine={false} tickLine={false} tick={{ fill: 'var(--color-text-muted)', fontSize: 12 }} dy={10} />
                        <YAxis axisLine={false} tickLine={false} tick={{ fill: 'var(--color-text-muted)', fontSize: 12 }} dx={-10} />
                        <Tooltip 
                            contentStyle={{ 
                                backgroundColor: 'var(--color-surface)', 
                                borderColor: 'var(--color-border)', 
                                borderRadius: 'var(--radius-md)', 
                                color: 'var(--color-text)' 
                            }}
                            itemStyle={{ color: 'var(--color-text)' }}
                        />
                        <Line type="monotone" dataKey="value" stroke="#3b82f6" strokeWidth={3} dot={{ r: 4, fill: '#3b82f6', strokeWidth: 2, stroke: '#ffffff' }} activeDot={{ r: 6 }} />
                    </LineChart>
            </ResponsiveContainer>
        </div>
    );
});
