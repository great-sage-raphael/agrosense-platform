"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Beaker, CheckCircle, AlertTriangle, XCircle, ArrowRight } from "lucide-react";
import { Input } from "@/components/ui/input";
import { apiClient } from "@/lib/api-client";

const OLIVE = '#519A66';
const OLIVE_DARK = '#3d7a4f';
const CREAM = '#FEFAE0';
const WARM_TAN = '#B99470';

const glassCard = {
    background: "rgba(254,250,224,0.55)",
    backdropFilter: "blur(14px)",
    WebkitBackdropFilter: "blur(14px)",
    border: "1px solid rgba(255,255,255,0.60)",
    boxShadow: "0 8px 32px rgba(81,154,102,0.10), inset 0 1px 0 rgba(255,255,255,0.55)",
    borderRadius: "1rem",
};

type MicronutrientResult = {
    symbol: string; name: string; prediction_raw: number;
    status: "Deficient" | "Sufficient" | "Toxic"; recommendation: string;
};

export const MicronutrientSuite = () => {
    const [loading, setLoading] = useState(false);
    const [results, setResults] = useState<MicronutrientResult[] | null>(null);
    const [formData, setFormData] = useState({ N: "", P: "", K: "", ph: "", EC: "", crop_label: "Pomegranate" });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
        setFormData({ ...formData, [e.target.name]: e.target.value });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault(); setLoading(true);
        try {
            const payload = {
                N: parseFloat(formData.N), P: parseFloat(formData.P), K: parseFloat(formData.K),
                ph: parseFloat(formData.ph), EC: parseFloat(formData.EC), crop_label: formData.crop_label
            };
            const response = await apiClient.post<Record<string, number>>("/predict/micronutrients", payload);
            const nutrients = [
                { sym: 'B', name: 'Boron' }, { sym: 'Cu', name: 'Copper' }, { sym: 'Fe', name: 'Iron' },
                { sym: 'Mn', name: 'Manganese' }, { sym: 'S', name: 'Sulphur' }, { sym: 'Zn', name: 'Zinc' }
            ];
            setResults(nutrients.map(n => {
                const val = response[n.sym] || 0;
                const status: "Deficient" | "Sufficient" | "Toxic" = val < 0.5 ? "Deficient" : val > 50 ? "Toxic" : "Sufficient";
                return { symbol: n.sym, name: n.name, prediction_raw: val, status, recommendation: `Level: ${val} ppm` };
            }));
        } catch (err) { console.error(err); } finally { setLoading(false); }
    };

    return (
        <div className="space-y-8">
            {/* Form */}
            <div className="p-8" style={glassCard}>
                <div className="flex items-center gap-3 mb-7">
                    <div className="h-10 w-10 rounded-xl flex items-center justify-center"
                        style={{ background: `${OLIVE}18`, border: `1px solid ${OLIVE}25` }}>
                        <Beaker className="h-6 w-6" style={{ color: OLIVE }} />
                    </div>
                    <div>
                        <h2 className="text-lg font-bold" style={{ color: OLIVE }}>Soil Composition Analysis</h2>
                        <p className="text-xs mt-0.5" style={{ color: 'rgba(81,154,102,0.55)' }}>Enter primary soil metrics and crop type.</p>
                    </div>
                </div>

                <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-3 gap-7">
                    {[['N', 'Nitrogen (N)', 'mg/kg'], ['P', 'Phosphorus (P)', 'mg/kg'], ['K', 'Potassium (K)', 'mg/kg'],
                    ['ph', 'Soil pH', '0–14'], ['EC', 'EC (dS/m)', 'Electrical Conductivity']].map(([name, label, placeholder]) => (
                        <div key={name} className="space-y-1.5">
                            <label className="text-[10px] font-bold uppercase tracking-widest" style={{ color: 'rgba(81,154,102,0.50)' }}>{label}</label>
                            <Input name={name} type="number" placeholder={placeholder}
                                value={(formData as any)[name]} onChange={handleInputChange} required
                                step={name === 'ph' ? '0.1' : name === 'EC' ? '0.01' : undefined} />
                        </div>
                    ))}
                    <div className="space-y-1.5">
                        <label className="text-[10px] font-bold uppercase tracking-widest" style={{ color: 'rgba(81,154,102,0.50)' }}>Target Crop</label>
                        <select name="crop_label" value={formData.crop_label} onChange={handleInputChange}
                            className="flex h-11 w-full rounded-xl px-4 py-2 text-sm font-medium focus:outline-none"
                            style={{ background: 'rgba(254,250,224,0.50)', border: '1px solid rgba(255,255,255,0.60)', color: OLIVE }}>
                            {['Pomegranate', 'Grapes', 'Mango', 'Mulberry', 'Potato', 'Ragi'].map(c =>
                                <option key={c} value={c}>{c}</option>)}
                        </select>
                    </div>
                    <div className="flex items-end md:col-span-3">
                        <button type="submit" disabled={loading}
                            className="w-full h-12 font-bold rounded-xl transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
                            style={{ background: OLIVE, color: CREAM }}
                            onMouseEnter={e => (e.currentTarget.style.background = OLIVE_DARK)}
                            onMouseLeave={e => (e.currentTarget.style.background = OLIVE)}>
                            {loading ? "Analyzing..." : <>Analyze Soil <ArrowRight className="h-4 w-4" /></>}
                        </button>
                    </div>
                </form>
            </div>

            {/* Results */}
            <AnimatePresence>
                {results && (
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                        {results.map((item) => (
                            <div key={item.symbol} className="p-6 flex flex-col relative overflow-hidden group transition-all"
                                style={glassCard}
                                onMouseEnter={e => (e.currentTarget.style.background = 'rgba(254,250,224,0.72)')}
                                onMouseLeave={e => (e.currentTarget.style.background = 'rgba(254,250,224,0.55)')}>
                                <div className="absolute top-0 right-0 p-4 opacity-[0.07] font-extrabold text-6xl group-hover:opacity-[0.14] transition-opacity select-none"
                                    style={{ color: OLIVE }}>{item.symbol}</div>
                                <div className="flex justify-between items-start z-10 mb-4">
                                    <div>
                                        <h3 className="text-lg font-bold" style={{ color: OLIVE }}>{item.name}</h3>
                                        <p className="text-sm font-semibold mt-1" style={{ color: 'rgba(81,154,102,0.65)' }}>
                                            {item.prediction_raw.toFixed(2)} ppm
                                        </p>
                                    </div>
                                    <StatusBadge status={item.status} />
                                </div>
                                <div className="z-10 mt-auto pt-4" style={{ borderTop: '1px dashed rgba(81,154,102,0.15)' }}>
                                    <p className="text-sm leading-relaxed" style={{ color: 'rgba(81,154,102,0.60)' }}>{item.recommendation}</p>
                                </div>
                            </div>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

const StatusBadge = ({ status }: { status: string }) => {
    if (status === "Deficient") return (
        <span className="flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold border bg-red-50 text-red-700 border-red-100">
            <AlertTriangle className="h-3 w-3" /> Deficient
        </span>
    );
    if (status === "Toxic") return (
        <span className="flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold border bg-orange-50 text-orange-700 border-orange-100">
            <XCircle className="h-3 w-3" /> Toxic
        </span>
    );
    return (
        <span className="flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold border"
            style={{ background: 'rgba(81,154,102,0.10)', color: '#519A66', borderColor: 'rgba(81,154,102,0.20)' }}>
            <CheckCircle className="h-3 w-3" /> Sufficient
        </span>
    );
};
