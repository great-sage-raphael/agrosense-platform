"use client";

import React, { useEffect, useState } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';

const OLIVE = '#519A66';
const SAGE = '#A9B388';
const WARM_TAN = '#B99470';
const CHART_TEXT = 'rgba(81,154,102,0.60)';
const GRID_COLOR = 'rgba(81,154,102,0.08)';

const TOOLTIP_STYLE = {
    backgroundColor: 'rgba(254,250,224,0.85)',
    backdropFilter: 'blur(8px)',
    borderColor: 'rgba(255,255,255,0.60)',
    borderRadius: '12px',
    fontSize: '12px',
    boxShadow: '0 4px 16px rgba(81,154,102,0.12)',
};

const glassPanel = {
    background: "rgba(254,250,224,0.55)",
    backdropFilter: "blur(14px)",
    WebkitBackdropFilter: "blur(14px)",
    border: "1px solid rgba(255,255,255,0.60)",
    boxShadow: "0 8px 32px rgba(81,154,102,0.10), inset 0 1px 0 rgba(255,255,255,0.55)",
    borderRadius: "1rem",
};

type SensorData = { time: string; n: number; p: number; k: number; ph: number; conductivity: number; moisture: number; temperature: number; };

export const LiveSensor = () => {
    const [data, setData] = useState<SensorData[]>([]);
    const [apiStatus, setApiStatus] = useState<"connecting" | "connected" | "error">("connecting");
    const [errorMsg, setErrorMsg] = useState<string>("");

    useEffect(() => {
        const fetchSensorData = async () => {
            try {
                const apiKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
                if (!apiKey) {
                    setApiStatus("error");
                    setErrorMsg("Missing API Key in .env.local");
                    return;
                }

                const res = await fetch(
                    "https://rwnhbmgjjluyuaxaiocc.supabase.co/rest/v1/sensor_readings?select=*&order=created_at.desc&limit=20",
                    {
                        headers: {
                            apikey: apiKey,
                            Authorization: `Bearer ${apiKey}`,
                        }
                    }
                );

                if (!res.ok) {
                    setApiStatus("error");
                    setErrorMsg(`API Error: ${res.status}`);
                    return;
                }

                const result = await res.json();
                setApiStatus("connected");
                setErrorMsg("");

                // Keep the most recent 20 readings, but reverse them to show chronologically left-to-right
                const mappedData: SensorData[] = [...result].reverse().map((item: any) => {
                    const date = item.created_at ? new Date(item.created_at) : new Date();
                    return {
                        time: `${date.getHours()}:${String(date.getMinutes()).padStart(2, '0')}:${String(date.getSeconds()).padStart(2, '0')}`,
                        n: Number(item.n || item.N || item.nitrogen || item.Nitrogen || 0),
                        p: Number(item.p || item.P || item.phosphorus || item.Phosphorus || 0),
                        k: Number(item.k || item.K || item.potassium || item.Potassium || 0),
                        ph: Number(item.ph || item.pH || item.PH || 0),
                        conductivity: Number(item.conductivity || item.ec || item.EC || 0),
                        moisture: Number(item.moisture || item.soil_moisture || item.Moisture || 0),
                        temperature: Number(item.temperature || item.temp || item.Temp || item.Temperature || 0),
                    };
                });

                setData(mappedData);
            } catch (err) {
                setApiStatus("error");
                setErrorMsg("Network Error");
            }
        };

        // Fetch immediately and then poll every 5 seconds
        fetchSensorData();
        const interval = setInterval(fetchSensorData, 5000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="flex flex-col h-full gap-4">
            <div className="flex justify-end items-center">
                {apiStatus === "connecting" && (
                    <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-yellow-500/10 border border-yellow-500/20 text-yellow-600 text-xs font-medium">
                        <div className="h-2 w-2 rounded-full bg-yellow-500 animate-pulse"></div>
                        Connecting...
                    </div>
                )}
                {apiStatus === "connected" && (
                    <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-green-500/10 border border-green-500/20 text-green-600 text-xs font-medium">
                        <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse"></div>
                        Live API Connected
                    </div>
                )}
                {apiStatus === "error" && (
                    <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-red-500/10 border border-red-500/20 text-red-600 text-xs font-medium" title={errorMsg}>
                        <div className="h-2 w-2 rounded-full bg-red-500"></div>
                        API Disconnected ({errorMsg})
                    </div>
                )}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 flex-1">
                {/* Moisture & EC */}
                <div className="p-6 flex flex-col" style={glassPanel}>
                    <p className="text-[10px] tracking-widest uppercase font-bold mb-1" style={{ color: 'rgba(81,154,102,0.45)' }}>Soil Telemetry</p>
                    <h3 className="text-lg font-bold mb-5" style={{ color: OLIVE }}>Real-time Moisture & EC</h3>
                    <div className="flex-1 min-h-[300px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={data}>
                                <defs>
                                    <linearGradient id="colorMoisture" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor={SAGE} stopOpacity={0.35} />
                                        <stop offset="95%" stopColor={SAGE} stopOpacity={0} />
                                    </linearGradient>
                                    <linearGradient id="colorEC" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor={WARM_TAN} stopOpacity={0.25} />
                                        <stop offset="95%" stopColor={WARM_TAN} stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={GRID_COLOR} />
                                <XAxis dataKey="time" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: CHART_TEXT }} />
                                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: CHART_TEXT }} />
                                <Tooltip contentStyle={TOOLTIP_STYLE} itemStyle={{ color: OLIVE }} />
                                <Area type="monotone" dataKey="moisture" stroke={SAGE} fillOpacity={1} fill="url(#colorMoisture)" strokeWidth={2.5} name="Moisture (%)" />
                                <Area type="monotone" dataKey="conductivity" stroke={WARM_TAN} fillOpacity={1} fill="url(#colorEC)" strokeWidth={2} name="EC (dS/m)" />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* NPK */}
                <div className="p-6 flex flex-col" style={glassPanel}>
                    <p className="text-[10px] tracking-widest uppercase font-bold mb-1" style={{ color: 'rgba(81,154,102,0.45)' }}>Macronutrients</p>
                    <h3 className="text-lg font-bold mb-5" style={{ color: OLIVE }}>Nutrient Levels (NPK)</h3>
                    <div className="flex-1 min-h-[300px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={data.slice(-5)}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={GRID_COLOR} />
                                <XAxis dataKey="time" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: CHART_TEXT }} />
                                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: CHART_TEXT }} />
                                <Tooltip cursor={{ fill: 'rgba(81,154,102,0.05)' }} contentStyle={TOOLTIP_STYLE} />
                                <Bar dataKey="n" fill={OLIVE} name="Nitrogen" radius={[4, 4, 0, 0]} />
                                <Bar dataKey="p" fill={SAGE} name="Phosphorus" radius={[4, 4, 0, 0]} />
                                <Bar dataKey="k" fill={WARM_TAN} name="Potassium" radius={[4, 4, 0, 0]} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* pH & Temperature */}
                <div className="p-6 flex flex-col justify-center" style={glassPanel}>
                    <p className="text-[10px] tracking-widest uppercase font-bold mb-1" style={{ color: 'rgba(81,154,102,0.45)' }}>Current Reading</p>
                    <div className="flex justify-between items-end mt-2">
                        <div>
                            <h3 className="text-lg font-bold" style={{ color: OLIVE }}>Soil pH Level</h3>
                            <span className="text-xs font-semibold px-2 py-1 rounded-full inline-block mt-1" style={{ background: `${WARM_TAN}20`, color: WARM_TAN }}>Mildly Acidic</span>
                        </div>
                        <div className="text-4xl font-extrabold tracking-tight font-mono" style={{ color: OLIVE }}>
                            {data.length > 0 ? data[data.length - 1].ph.toFixed(2) : "--"}
                        </div>
                    </div>
                </div>

                <div className="p-6 flex flex-col justify-center" style={glassPanel}>
                    <p className="text-[10px] tracking-widest uppercase font-bold mb-1" style={{ color: 'rgba(81,154,102,0.45)' }}>Current Reading</p>
                    <div className="flex justify-between items-end mt-2">
                        <div>
                            <h3 className="text-lg font-bold" style={{ color: OLIVE }}>Soil Temperature</h3>
                            <span className="text-xs font-semibold px-2 py-1 rounded-full inline-block mt-1" style={{ background: 'rgba(81,154,102,0.1)', color: OLIVE }}>Optimal</span>
                        </div>
                        <div className="text-4xl font-extrabold tracking-tight font-mono" style={{ color: OLIVE }}>
                            {data.length > 0 ? data[data.length - 1].temperature.toFixed(1) : "--"}<span className="text-2xl font-bold">°C</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
