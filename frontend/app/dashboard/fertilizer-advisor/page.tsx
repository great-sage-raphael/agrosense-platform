"use client";
import { FertilizerOptimizer } from "@/components/agriculture/fertilizer-optimizer";

export default function FertilizerPage() {
    return (
        <div className="w-full h-full">
            <header className="mb-8">
                <p className="text-[10px] tracking-widest uppercase text-[#465626]/50 font-bold mb-1">AI Advisory</p>
                <h2 className="text-4xl font-bold text-[#465626] tracking-tight">Fertilizer Advisor</h2>
                <p className="text-[#465626]/60 mt-2 text-sm">Optimize your nutrient application strategy.</p>
            </header>
            <FertilizerOptimizer />
        </div>
    );
}
