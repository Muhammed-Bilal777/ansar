import { DonationsSection } from "../Donations/DonationsSection";
import { CallToActionSection } from "../Home/CallToActionSection";

import { GallerySection } from "../Home/GallerySection";
import { HeroSection } from "../Home/HeroSection";
import { MissionSection } from "../Home/MissionSection";
import { NewsSection } from "../Home/NewsSection";
import { ServicesSection } from "../Home/ServicesSection";
import { StatsSection } from "../Home/StatsSection";
import { TeamSection } from "../Home/TeamSection";
import { TestimonialsSection } from "../Home/TestimonialsSection";



export function Home() {
    return (
        <div>
            <HeroSection />
            <ServicesSection />
            <DonationsSection />
            <CallToActionSection />
            <GallerySection />
            <MissionSection />
            <StatsSection />

            <TeamSection />
            <TestimonialsSection />
            <NewsSection />
        </div>
    )
}
