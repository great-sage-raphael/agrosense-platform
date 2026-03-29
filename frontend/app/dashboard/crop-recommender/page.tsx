"use client";
import { CropRecommender } from "@/components/agriculture/crop-recommender";

export default function CropRecommenderPage() {
    return (
        <div className="w-full max-w-4xl mx-auto">
            <header className="mb-10">
                <p className="text-[10px] tracking-widest uppercase text-[#465626]/50 font-bold mb-1">AI Model</p>
                <h2 className="text-4xl font-bold text-[#465626] tracking-tight">Crop Recommender</h2>
                <p className="text-[#465626]/60 mt-2 text-sm">Input your soil parameters to get AI-powered crop suggestions.</p>
            </header>
            <CropRecommender />
        </div>
    );
}
