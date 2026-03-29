"use client";
import { LiveSensor } from "@/components/agriculture/live-sensor";

export default function SensorsPage() {
    return (
        <div className="w-full h-full">
            <header className="mb-8">
                <p className="text-[10px] tracking-widest uppercase text-[#465626]/50 font-bold mb-1">Live Data</p>
                <h2 className="text-4xl font-bold text-[#465626] tracking-tight">Sensor Analytics</h2>
                <p className="text-[#465626]/60 mt-2 text-sm">Real-time telemetry from your field sensors.</p>
            </header>
            <LiveSensor />
        </div>
    );
}
