import { BentoGrid, BentoGridItem } from "@/components/ui/bento-grid";
import { Sprout, Droplets, Leaf, ThermometerSun, TrendingUp } from "lucide-react";
import Link from 'next/link';

const OLIVE = '#519A66';
const OLIVE_MID = 'rgba(81,154,102,0.70)';
const OLIVE_FAINT = 'rgba(81,154,102,0.08)';

export default function DashboardPage() {
    return (
        <div className="space-y-8">
            <header className="flex justify-between items-end pb-6" style={{ borderBottom: '1px solid rgba(81,154,102,0.10)' }}>
                <div>
                    <p className="text-[9px] tracking-widest uppercase font-bold mb-1" style={{ color: 'rgba(81,154,102,0.45)' }}>Overview</p>
                    <h2 className="text-4xl font-bold tracking-tight" style={{ color: OLIVE }}>Farm Intelligence</h2>
                    <p className="mt-2 text-sm" style={{ color: OLIVE_MID }}>
                        Welcome back. Here&apos;s your field&apos;s latest intelligence report.
                    </p>
                </div>
                <div className="flex gap-3">
                    {[
                        { label: 'Soil Moisture', value: '62%', sub: 'avg' },
                        { label: 'Next Harvest', value: '14 Days', sub: '' },
                    ].map(chip => (
                        <div key={chip.label} className="px-5 py-3 rounded-xl"
                            style={{
                                background: 'rgba(254,250,224,0.55)',
                                backdropFilter: 'blur(14px)',
                                WebkitBackdropFilter: 'blur(14px)',
                                border: '1px solid rgba(255,255,255,0.60)',
                                boxShadow: '0 4px 16px rgba(81,154,102,0.08)',
                            }}>
                            <span className="text-[9px] uppercase font-bold tracking-widest block" style={{ color: 'rgba(81,154,102,0.45)' }}>
                                {chip.label}
                            </span>
                            <div className="text-lg font-bold mt-0.5" style={{ color: OLIVE }}>
                                {chip.value} {chip.sub && <span className="text-xs font-normal" style={{ color: OLIVE_MID }}>{chip.sub}</span>}
                            </div>
                        </div>
                    ))}
                </div>
            </header>

            <BentoGrid className="md:auto-rows-[250px]">
                <Link href="/dashboard/crop-recommender" className="md:col-span-1 md:row-span-1 h-full">
                    <BentoGridItem
                        title="Crop Recommender"
                        description="Analyze soil samples to predict optimal crop yield."
                        header={
                            <div className="h-full w-full rounded-xl flex items-center justify-center transition-colors"
                                style={{ background: OLIVE_FAINT }}>
                                <Sprout className="h-10 w-10" style={{ color: OLIVE_MID }} />
                            </div>
                        }
                        icon={<TrendingUp className="h-4 w-4" />}
                        className="h-full"
                    />
                </Link>

                <Link href="/dashboard/micronutrients" className="md:col-span-2 md:row-span-1 h-full">
                    <BentoGridItem
                        title="Micronutrient Health"
                        description="Deep dive into trace elements: B, Cu, Fe, Mn, S, Zn."
                        header={
                            <div className="flex gap-3 h-full items-center justify-around rounded-xl p-4"
                                style={{ background: OLIVE_FAINT }}>
                                {['B', 'Cu', 'Fe', 'Mn', 'S', 'Zn'].map(el => (
                                    <div key={el} className="h-12 w-12 rounded-full flex items-center justify-center font-bold text-sm"
                                        style={{
                                            background: 'rgba(254,250,224,0.70)',
                                            border: '1px solid rgba(255,255,255,0.70)',
                                            color: OLIVE,
                                            boxShadow: '0 2px 8px rgba(81,154,102,0.10)',
                                        }}>
                                        {el}
                                    </div>
                                ))}
                            </div>
                        }
                        className="h-full"
                    />
                </Link>

                <Link href="/dashboard/sensors" className="md:col-span-2 md:row-span-1 h-full">
                    <BentoGridItem
                        title="Live Field Telemetry"
                        description="Real-time sensor data — NPK, pH, moisture, conductivity."
                        header={
                            <div className="h-full w-full rounded-xl flex items-center justify-center" style={{ background: OLIVE_FAINT }}>
                                <ThermometerSun className="h-12 w-12" style={{ color: 'rgba(81,154,102,0.30)' }} />
                            </div>
                        }
                        className="h-full"
                    />
                </Link>

                <Link href="/dashboard/fertilizer-advisor" className="md:col-span-1 md:row-span-1 h-full">
                    <BentoGridItem
                        title="Fertilizer Advisor"
                        description="Optimize nutrient delivery for your target crop."
                        header={
                            <div className="h-full w-full rounded-xl flex items-center justify-center" style={{ background: OLIVE_FAINT }}>
                                <Droplets className="h-10 w-10" style={{ color: OLIVE_MID }} />
                            </div>
                        }
                        className="h-full"
                    />
                </Link>
            </BentoGrid>
        </div>
    );
}
