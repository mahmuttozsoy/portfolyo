"use client";

import { useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import React from "react";

export default function AnimatedPage({ children }: { children: React.ReactNode }) {
    const { pathname } = useLocation();

    return (
        <AnimatePresence mode="wait">
            <motion.div
                key={pathname}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.36, ease: "easeOut" }}
            >
                {children}
            </motion.div>
        </AnimatePresence>
    );
}
