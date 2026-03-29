"use client";

import React, { useState } from "react";
import { apiClient } from "@/lib/api-client";
import { motion } from "framer-motion";
import { Input } from "../ui/input";
import { Sprout, ArrowRight } from "lucide-react";

const OLIVE = '#519A66';
const OLIVE_DARK = '#3d7a4f';
const CREAM = '#FEFAE0';

const glassCard = {
    background: "rgba(254,250,224,0.55)",
    backdropFilter: "blur(14px)",
    WebkitBackdropFilter: "blur(14px)",
    border: "1px solid rgba(255,255,255,0.60)",
    boxShadow: "0 8px 32px rgba(81,154,102,0.10), inset 0 1px 0 rgba(255,255,255,0.55)",
    borderRadius: "1rem",
};

const fields = [
    { label: "Nitrogen (N)", name: "N", placeholder: "kg/ha" },
    { label: "Phosphorus (P)", name: "P", placeholder: "kg/ha" },
    { label: "Potassium (K)", name: "K", placeholder: "kg/ha" },
    { label: "Temperature (°C)", name: "temperature", placeholder: "°C" },
    { label: "Humidity (%)", name: "humidity", placeholder: "%" },
    { label: "pH Level", name: "ph", placeholder: "0–14" },
    { label: "Rainfall (mm)", name: "rainfall", placeholder: "mm" },
];

export const CropRecommender = () => {
    const [formData, setFormData] = useState({ N: 0, P: 0, K: 0, temperature: 0, humidity: 0, ph: 0, rainfall: 0 });
    const [result, setResult] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
        setFormData({ ...formData, [e.target.name]: parseFloat(e.target.value) });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault(); setLoading(true);
        try {
            const response = await apiClient.post<{ recommendation: string }>('/predict/crop', formData);
            setResult(response.recommendation);
        } catch (err) { console.error(err); } finally { setLoading(false); }
    };

    return (
        <div className="w-full max-w-4xl mx-auto">
            <div className="p-8" style={glassCard}>
                <div className="flex items-center gap-3 mb-7">
                    <div className="h-10 w-10 rounded-xl flex items-center justify-center"
                        style={{ background: `${OLIVE}18`, border: `1px solid ${OLIVE}25` }}>
                        <Sprout className="h-6 w-6" style={{ color: OLIVE }} />
                    </div>
                    <div>
                        <h2 className="text-lg font-bold" style={{ color: OLIVE }}>Soil & Environmental Parameters</h2>
                        <p className="text-xs mt-0.5" style={{ color: 'rgba(81,154,102,0.55)' }}>Enter your field readings for an AI crop recommendation.</p>
                    </div>
                </div>

                <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-7">
                    {fields.map((field) => (
                        <div key={field.name} className="space-y-1.5">
                            <label className="text-[10px] font-bold uppercase tracking-widest" style={{ color: 'rgba(81,154,102,0.50)' }}>
                                {field.label}
                            </label>
                            <Input type="number" name={field.name} placeholder={field.placeholder} onChange={handleChange} required />
                        </div>
                    ))}
                    <div className="md:col-span-2 flex justify-center mt-2">
                        <button type="submit" disabled={loading}
                            className="px-10 py-3 rounded-xl font-bold transition-all disabled:opacity-50 flex items-center gap-2 group"
                            style={{ background: OLIVE, color: CREAM }}
                            onMouseEnter={e => (e.currentTarget.style.background = OLIVE_DARK)}
                            onMouseLeave={e => (e.currentTarget.style.background = OLIVE)}>
                            {loading ? "Analyzing..." : (<>Get Recommendation <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" /></>)}
                        </button>
                    </div>
                </form>
            </div>

            {result && (
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                    className="mt-6 p-8 rounded-2xl text-center"
                    style={{ background: 'rgba(81,154,102,0.08)', border: '1px solid rgba(81,154,102,0.15)' }}>
                    <p className="text-[10px] tracking-widest uppercase font-bold mb-2" style={{ color: 'rgba(81,154,102,0.45)' }}>AI Recommendation</p>
                    <h3 className="text-5xl font-extrabold tracking-tight mt-2" style={{ color: OLIVE }}>{result}</h3>
                </motion.div>
            )}
        </div>
    );
};
