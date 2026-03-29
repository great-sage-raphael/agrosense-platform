import { Sidebar } from "@/components/ui/sidebar";

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="min-h-screen w-full flex relative overflow-hidden" style={{ background: '#FEFAE0' }}>
            {/* === Vivid organic blobs — essential for visible glassmorphism === */}

            {/* Top-left: large sage green blob */}
            <div
                aria-hidden="true"
                className="pointer-events-none absolute -top-48 -left-48 w-[700px] h-[700px] rounded-full"
                style={{
                    background: "radial-gradient(circle, rgba(169,179,136,0.75) 0%, rgba(169,179,136,0.20) 55%, transparent 75%)",
                }}
            />
            {/* Top-right: warm tan/brown blob */}
            <div
                aria-hidden="true"
                className="pointer-events-none absolute -top-24 right-0 w-[550px] h-[550px] rounded-full"
                style={{
                    background: "radial-gradient(circle, rgba(185,148,112,0.65) 0%, rgba(185,148,112,0.15) 55%, transparent 75%)",
                }}
            />
            {/* Center: subtle sage mid blob */}
            <div
                aria-hidden="true"
                className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] rounded-full"
                style={{
                    background: "radial-gradient(ellipse, rgba(169,179,136,0.30) 0%, transparent 70%)",
                }}
            />
            {/* Bottom-right: warm tan blob */}
            <div
                aria-hidden="true"
                className="pointer-events-none absolute -bottom-32 right-1/4 w-[600px] h-[400px] rounded-full"
                style={{
                    background: "radial-gradient(circle, rgba(185,148,112,0.50) 0%, transparent 70%)",
                }}
            />
            {/* Bottom-left: sage green blob */}
            <div
                aria-hidden="true"
                className="pointer-events-none absolute bottom-0 -left-24 w-[450px] h-[450px] rounded-full"
                style={{
                    background: "radial-gradient(circle, rgba(169,179,136,0.55) 0%, transparent 70%)",
                }}
            />

            {/* Sidebar */}
            <Sidebar />

            {/* Main Content Area */}
            <main className="flex-1 ml-64 p-8 md:p-12 overflow-y-auto h-screen relative z-10">
                <div className="max-w-7xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500">
                    {children}
                </div>
            </main>
        </div>
    );
}
