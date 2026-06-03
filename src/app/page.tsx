import { Hero } from "@/components/sections/hero";
import { LogoTicker } from "@/components/sections/logo-ticker";
import { Overview } from "@/components/sections/overview";
import { LiveOutcomes } from "@/components/sections/live-outcomes";
import { Testimonials } from "@/components/sections/testimonials";
import { FounderSlots } from "@/components/sections/founder-slots";
import { CustomBuild } from "@/components/sections/custom-build";
import { FinalCTA } from "@/components/sections/final-cta";

export default function Home() {
  return (
    <>
      <Hero />
      <LogoTicker />
      <Overview />
      <LiveOutcomes />
      <Testimonials />
      {/* Scarcity callout above the final CTA. Async server component —
          reads founder_slots_remaining from the dashboard's public stats
          endpoint and renders nothing if the cohort is full. */}
      <div className="mx-auto max-w-[1280px] px-6">
        <FounderSlots />
      </div>
      <CustomBuild />
      <FinalCTA />
    </>
  );
}
