import Image from "next/image";
import { HeroButtons } from "../ui/heroButtons";
import { HeroBenefits } from "../ui/heroBenefits";
import { HeroScrollIndicator } from "../ui/heroScroll";

export function HeroSection() {
  return (
    <section
      id="hero"
      className="relative flex min-h-screen items-center justify-center overflow-hidden pt-20 bg-nv-hero"
    >
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-nv-hero-overlay" />
        <Image
          src="/hero-bg.jpg"
          alt="Юрист консультирует клиента по вопросам долгов"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center opacity-20"
        />
      </div>

      <div className="relative z-10 nv-container text-center">
        <div className="flex flex-col items-center gap-3">
          <h1 className="mx-auto max-w-3xl text-4xl leading-tight tracking-tight text-on-dark md:text-5xl">
            Освободитесь от долгов{" "}
            <span className="bg-linear-to-r from-blue-400 to-amber-300 bg-clip-text text-transparent">
              законно и навсегда
            </span>
          </h1>

          <p className="mx-auto mb-4 max-w-2xl text-lg font-normal leading-relaxed text-on-dark-secondary">
            Помогаем пройти процедуру банкротства физических лиц спокойно и
            понятно, с личным сопровождением юриста на каждом этапе.
          </p>

          <HeroButtons />
          <HeroBenefits />
        </div>
      </div>

      <HeroScrollIndicator />
    </section>
  );
}