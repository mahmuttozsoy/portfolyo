"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

interface Profile {
    fullName: string;
    title: string;
    bio: string;
    location: string;
    email: string; // From User or Profile? Profile has no email in schema but User does.
    // Actually Profile schema I wrote doesn't have email. User has.
    // Let's use what I defined in schema: bio, location, title.
}

export default function AboutSection() {
    const [profile, setProfile] = useState<Profile | null>(null);

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const res = await fetch('/api/profile');
                if (res.ok) {
                    const data = await res.json();
                    setProfile(data.data.profile);
                }
            } catch (error) {
                console.error("Failed to fetch profile", error);
            }
        };
        fetchProfile();
    }, []);

    return (
        <section id="about" className="py-20 bg-zinc-900/30">
            <div className="max-w-4xl mx-auto px-6">
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-3xl font-bold mb-8 text-emerald-400"
                >
                    Hakkımda
                </motion.h2>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 }}
                    className="space-y-6 text-gray-300 leading-relaxed text-lg"
                >
                    {profile ? (
                        <>
                            <p className="whitespace-pre-line">{profile.bio}</p>
                            <div className="flex gap-4 mt-6 text-sm text-gray-500">
                                {profile.location && <span>📍 {profile.location}</span>}
                                {profile.title && <span>💼 {profile.title}</span>}
                            </div>
                        </>
                    ) : (
                        <p>Yükleniyor...</p>
                    )}
                </motion.div>
            </div>
        </section>
    );
}
