import React from "react";

export default function Loader() {
    return (
        <div className="min-h-[50vh] flex items-center justify-center w-full">
            <div className="text-center">
                {/* Minimal manga-style loader */}
                <div className="relative inline-block">
                    {/* Simple rotating circle */}
                    <div className="w-16 h-16 border-4 border-gray-200 border-t-black rounded-full animate-spin"></div>
                </div>

                {/* Minimal text */}
                <div className="mt-6">
                    <p className="text-sm uppercase tracking-widest text-gray-400 font-medium">
                        読み込み中
                    </p>
                    <p className="text-xs text-gray-300 mt-1">Loading...</p>
                </div>
            </div>
        </div>
    );
}
