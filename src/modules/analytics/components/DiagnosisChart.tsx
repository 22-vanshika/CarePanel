import React from 'react';
import type { ChartDataPoint } from '../types';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface DiagnosisChartProps {
    data: ChartDataPoint[];
    title: string;
}

export const DiagnosisChart: React.FC<DiagnosisChartProps> = ({ data, title }) => {
    return (
        <div className="card p-6 w-full h-[400px] flex flex-col">
            <h3 className="text-lg font-semibold text-[var(--color-text)] mb-6">{title}</h3>
            <div className="flex-1 min-h-0">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={data} margin={{ top: 5, right: 20, bottom: 5, left: 0 }} layout="vertical">
                        <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#f1f5f9" />
                        <XAxis type="number" axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} />
                        <YAxis dataKey="label" type="category" axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} width={100} />
                        <Tooltip 
                            contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)' }}
                            itemStyle={{ color: '#0f172a', fontWeight: 600 }}
                            cursor={{ fill: '#f8fafc' }}
                        />
                        <Bar dataKey="value" fill="#8b5cf6" radius={[0, 4, 4, 0]} />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};
