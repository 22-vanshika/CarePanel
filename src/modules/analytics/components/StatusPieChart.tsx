import React from 'react';
import type { ChartDataPoint } from '../types';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';

interface StatusPieChartProps {
    data: ChartDataPoint[];
    title: string;
}

const COLORS: Record<string, string> = {
    ACTIVE: 'var(--color-success)',
    CRITICAL: 'var(--color-error)',
    OBSERVATION: 'var(--color-warning)',
    DISCHARGED: 'var(--color-secondary)',
};

export const StatusPieChart: React.FC<StatusPieChartProps> = ({ data, title }) => {
    return (
        <div className="card p-6 w-full h-[400px] flex flex-col">
            <h3 className="text-lg font-semibold text-[var(--color-text)] mb-6">{title}</h3>
            <div className="flex-1 min-h-0">
                <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                        <Pie
                            data={data}
                            cx="50%"
                            cy="50%"
                            innerRadius={60}
                            outerRadius={100}
                            paddingAngle={5}
                            dataKey="value"
                            nameKey="label"
                        >
                            {data.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[entry.label] || '#cbd5e1'} />
                            ))}
                        </Pie>
                        <Tooltip 
                            contentStyle={{ 
                                backgroundColor: 'var(--color-surface)', 
                                borderColor: 'var(--color-border)', 
                                borderRadius: 'var(--radius-md)', 
                                color: 'var(--color-text)' 
                            }}
                            itemStyle={{ color: 'var(--color-text)' }}
                        />
                        <Legend verticalAlign="bottom" height={36} iconType="circle" />
                    </PieChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};
