"use client";
import { MicronutrientSuite } from "@/components/agriculture/micronutrient-suite";

export default function MicronutrientsPage() {
    return (
        <div className="w-full h-full">
            <header className="mb-8">
                <p className="text-[10px] tracking-widest uppercase text-[#465626]/50 font-bold mb-1">Trace Elements</p>
                <h2 className="text-4xl font-bold text-[#465626] tracking-tight">Micronutrient Intelligence</h2>
                <p className="text-[#465626]/60 mt-2 text-sm">Comprehensive analysis of essential trace elements.</p>
            </header>
            <MicronutrientSuite />
        </div>
    );
}
