"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Droplets, ArrowRight, CheckCircle2, TrendingUp, AlertCircle } from "lucide-react";
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

type FertilizerResult = { Urea: number; DAP: number; MOP: number; };

export const FertilizerOptimizer = () => {
    const [loading, setLoading] = useState(false);
    const [results, setResults] = useState<FertilizerResult | null>(null);
    const [formData, setFormData] = useState({ N: "", P: "", K: "", crop: "wheat" });

    const crops = ["wheat", "rice", "maize", "sugarcane", "cotton", "soybean", "potato", "tomato", "chickpea"];

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
        setFormData({ ...formData, [e.target.name]: e.target.value });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            await new Promise(r => setTimeout(r, 1500));
            const baseN = parseFloat(formData.N) || 50;
            const baseP = parseFloat(formData.P) || 30;
            const baseK = parseFloat(formData.K) || 20;
            setResults({
                Urea: Math.max(0, 120 - baseN) * 2.17,
                DAP: Math.max(0, 60 - baseP) * 2.17,
                MOP: Math.max(0, 40 - baseK) * 1.66,
            });
        } catch (err) { console.error(err); }
        finally { setLoading(false); }
    };

    return (
        <div className="flex flex-col lg:flex-row gap-8">
            {/* Form */}
            <div className="w-full lg:w-1/3 p-8" style={glassCard}>
                <div className="flex items-center gap-3 mb-7">
                    <div className="h-10 w-10 rounded-xl flex items-center justify-center"
                        style={{ background: `${OLIVE}18`, border: `1px solid ${OLIVE}25` }}>
                        <Droplets className="h-6 w-6" style={{ color: OLIVE }} />
                    </div>
                    <div>
                        <h3 className="text-lg font-bold" style={{ color: OLIVE }}>Soil Profile</h3>
                        <p className="text-xs mt-0.5" style={{ color: 'rgba(81,154,102,0.60)' }}>Enter current nutrient levels.</p>
                    </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-1.5">
                        <label className="text-[10px] font-bold uppercase tracking-widest" style={{ color: 'rgba(81,154,102,0.50)' }}>Target Crop</label>
                        <select name="crop" value={formData.crop} onChange={handleInputChange}
                            className="flex h-11 w-full rounded-xl px-4 py-2 text-sm font-medium focus:outline-none capitalize"
                            style={{ background: 'rgba(254,250,224,0.50)', border: '1px solid rgba(255,255,255,0.60)', color: OLIVE }}>
                            {crops.map(c => <option key={c} value={c}>{c}</option>)}
                        </select>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        {[['N', 'Nitrogen (N)'], ['P', 'Phosphorus (P)']].map(([n, l]) => (
                            <div key={n} className="space-y-1.5">
                                <label className="text-[10px] font-bold uppercase tracking-widest" style={{ color: 'rgba(81,154,102,0.50)' }}>{l}</label>
                                <Input name={n} type="number" placeholder="kg/ha" value={(formData as any)[n]} onChange={handleInputChange} required />
                            </div>
                        ))}
                    </div>
                    <div className="space-y-1.5">
                        <label className="text-[10px] font-bold uppercase tracking-widest" style={{ color: 'rgba(81,154,102,0.50)' }}>Potassium (K)</label>
                        <Input name="K" type="number" placeholder="kg/ha" value={formData.K} onChange={handleInputChange} required />
                    </div>

                    <button type="submit" disabled={loading}
                        className="w-full mt-2 h-12 font-bold rounded-xl transition-all flex items-center justify-center gap-2 group disabled:opacity-50"
                        style={{ background: OLIVE, color: CREAM }}
                        onMouseEnter={e => (e.currentTarget.style.background = OLIVE_DARK)}
                        onMouseLeave={e => (e.currentTarget.style.background = OLIVE)}>
                        {loading ? "Calculating..." : (<>Optimize Fertilizers <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" /></>)}
                    </button>
                </form>
            </div>

            {/* Results */}
            <div className="w-full lg:w-2/3">
                <AnimatePresence mode="wait">
                    {!results && !loading && (
                        <motion.div key="empty" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                            className="h-full min-h-[400px] flex flex-col items-center justify-center rounded-2xl"
                            style={{ border: `2px dashed rgba(81,154,102,0.18)`, background: 'rgba(254,250,224,0.25)' }}>
                            <Droplets className="h-16 w-16 mb-4" style={{ color: 'rgba(81,154,102,0.20)' }} />
                            <p className="text-sm font-medium" style={{ color: 'rgba(81,154,102,0.45)' }}>Input soil parameters to generate recommendations</p>
                        </motion.div>
                    )}
                    {loading && (
                        <motion.div key="loading" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                            className="h-full min-h-[400px] flex flex-col items-center justify-center rounded-2xl" style={glassCard}>
                            <div className="relative w-20 h-20">
                                <motion.div className="absolute inset-0 rounded-full border-4"
                                    style={{ borderColor: `${OLIVE}25`, borderTopColor: OLIVE }}
                                    animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: "linear" }} />
                                <Droplets className="absolute inset-0 m-auto h-8 w-8 animate-pulse" style={{ color: OLIVE }} />
                            </div>
                            <p className="mt-6 font-bold tracking-wide text-sm" style={{ color: OLIVE }}>Synthesizing Nutritional Plan...</p>
                        </motion.div>
                    )}
                    {results && !loading && (
                        <motion.div key="results" initial={{ opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1 }}
                            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                            {Object.entries(results).map(([key, value], idx) => (
                                <motion.div key={key} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: idx * 0.1 }}
                                    className="p-6 relative overflow-hidden group transition-all"
                                    style={glassCard}
                                    onMouseEnter={e => (e.currentTarget.style.background = 'rgba(254,250,224,0.72)')}
                                    onMouseLeave={e => (e.currentTarget.style.background = 'rgba(254,250,224,0.55)')}>
                                    <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                                        <TrendingUp className="h-24 w-24" style={{ color: OLIVE }} />
                                    </div>
                                    <div className="relative z-10 flex flex-col h-full">
                                        <div className="flex justify-between items-start mb-6">
                                            <h4 className="text-xl font-bold" style={{ color: OLIVE }}>{key}</h4>
                                            <span className="flex items-center gap-1 text-xs font-bold px-2 py-1 rounded-full"
                                                style={{ color: OLIVE, background: `${OLIVE}15` }}>
                                                <CheckCircle2 className="h-3 w-3" /> Optimal
                                            </span>
                                        </div>
                                        <div className="mt-auto">
                                            <div className="flex items-baseline gap-1">
                                                <span className="text-4xl font-extrabold tracking-tight" style={{ color: OLIVE }}>
                                                    {Math.max(0, value).toFixed(1)}
                                                </span>
                                                <span className="text-sm font-medium" style={{ color: 'rgba(81,154,102,0.60)' }}>kg/ha</span>
                                            </div>
                                            <div className="w-full rounded-full h-1.5 mt-4 overflow-hidden"
                                                style={{ background: `${WARM_TAN}30` }}>
                                                <motion.div className="h-1.5 rounded-full"
                                                    style={{ background: WARM_TAN }}
                                                    initial={{ width: 0 }}
                                                    animate={{ width: `${Math.min(100, (value / 300) * 100)}%` }}
                                                    transition={{ duration: 1, delay: 0.5 + idx * 0.1 }} />
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
                                className="md:col-span-2 lg:col-span-3 p-6 flex gap-4 items-start rounded-2xl"
                                style={{ background: `${WARM_TAN}18`, border: `1px solid ${WARM_TAN}30` }}>
                                <div className="p-2 rounded-full shrink-0" style={{ background: `${WARM_TAN}30` }}>
                                    <AlertCircle className="h-5 w-5" style={{ color: WARM_TAN }} />
                                </div>
                                <div>
                                    <h5 className="font-bold text-sm uppercase tracking-wide" style={{ color: OLIVE }}>Application Note</h5>
                                    <p className="text-sm mt-1 leading-relaxed" style={{ color: 'rgba(81,154,102,0.65)' }}>
                                        Split nitrogen ({results.Urea.toFixed(0)} kg Urea) into three equal doses: basal, active tillering, and panicle initiation stages for maximum efficiency.
                                    </p>
                                </div>
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
};
