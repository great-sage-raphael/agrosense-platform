"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { LayoutDashboard, Sprout, Droplets, Leaf, ThermometerSun, Settings, LogOut } from "lucide-react";
import { motion } from "framer-motion";

const sidebarItems = [
    { title: "Dashboard", href: "/dashboard", icon: <LayoutDashboard className="h-5 w-5" /> },
    { title: "Crop Recommender", href: "/dashboard/crop-recommender", icon: <Sprout className="h-5 w-5" /> },
    { title: "Fertilizer Advisor", href: "/dashboard/fertilizer-advisor", icon: <Droplets className="h-5 w-5" /> },
    { title: "Micronutrients", href: "/dashboard/micronutrients", icon: <Leaf className="h-5 w-5" /> },
    { title: "Sensor Analytics", href: "/dashboard/sensors", icon: <ThermometerSun className="h-5 w-5" /> },
];

export const Sidebar = () => {
    const pathname = usePathname();

    return (
        <aside
            className="fixed left-0 top-0 h-screen w-64 flex flex-col justify-between z-50 border-r"
            style={{
                background: "rgba(254,250,224,0.45)",
                backdropFilter: "blur(20px)",
                WebkitBackdropFilter: "blur(20px)",
                borderColor: "rgba(255,255,255,0.55)",
                boxShadow: "4px 0 24px rgba(81,154,102,0.08)",
            }}
        >
            {/* Brand */}
            <div>
                <div className="p-7 pb-5">
                    <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-xl overflow-hidden flex-shrink-0 shadow-md ring-2 ring-white/60">
                            <Image src="/logo.png" alt="Root Net Logo" width={40} height={40} className="object-contain" />
                        </div>
                        <div>
                            <h1 className="text-xl font-bold tracking-tight" style={{ color: '#519A66' }}>Root Net</h1>
                            <p className="text-[9px] font-semibold tracking-widest uppercase mt-0.5" style={{ color: 'rgba(81,154,102,0.55)' }}>
                                Precision Agriculture AI
                            </p>
                        </div>
                    </div>
                </div>

                <div className="mx-6 h-px mb-4" style={{ background: 'rgba(81,154,102,0.12)' }} />

                <nav className="px-4 space-y-1">
                    {sidebarItems.map((item) => {
                        const isActive = pathname === item.href;
                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={cn(
                                    "flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group relative overflow-hidden",
                                    !isActive && "hover:bg-white/40"
                                )}
                                style={isActive ? {} : { color: 'rgba(81,154,102,0.65)' }}
                            >
                                {isActive && (
                                    <motion.div
                                        layoutId="activeTab"
                                        className="absolute inset-0 rounded-xl z-0"
                                        style={{ background: '#519A66' }}
                                        initial={false}
                                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                    />
                                )}
                                <span className="relative z-10" style={isActive ? { color: '#FEFAE0' } : {}}>
                                    {item.icon}
                                </span>
                                <span
                                    className="relative z-10 font-semibold text-sm"
                                    style={isActive ? { color: '#FEFAE0' } : {}}
                                >
                                    {item.title}
                                </span>
                            </Link>
                        );
                    })}
                </nav>
            </div>

            {/* Footer */}
            <div className="p-4" style={{ borderTop: '1px solid rgba(81,154,102,0.10)' }}>
                <button className="flex items-center gap-3 px-4 py-3 w-full rounded-xl transition-all text-sm font-medium hover:bg-white/40"
                    style={{ color: 'rgba(81,154,102,0.60)' }}>
                    <Settings className="h-5 w-5" /><span>Settings</span>
                </button>
                <button className="flex items-center gap-3 px-4 py-3 w-full rounded-xl transition-all mt-1 text-sm font-medium hover:bg-red-50/60"
                    style={{ color: 'rgba(81,154,102,0.60)' }}
                    onMouseEnter={e => (e.currentTarget.style.color = '#c0392b')}
                    onMouseLeave={e => (e.currentTarget.style.color = 'rgba(81,154,102,0.60)')}>
                    <LogOut className="h-5 w-5" /><span>Logout</span>
                </button>
            </div>
        </aside>
    );
};
