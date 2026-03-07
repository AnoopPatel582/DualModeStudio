export default function AuthorityAndAdvantageSection() {
    return (
      <section className="relative w-full py-16">
        <div className="mx-auto max-w-[1200px] px-6">
          
          {/* ================= Authority Statement ================= */}
          <div className="mx-auto max-w-[1100px] text-center">
            <h2 className="text-4xl font-semibold leading-tight tracking-tight text-white md:text-5xl lg:text-6xl">
              We don’t just produce content.
              <br />
              We engineer performance.
            </h2>
  
            <p className="mt-10 text-xl leading-relaxed text-white/70 md:text-2xl">
              Every strategy is intentional.
              <br />
              Every frame is optimized.
              <br />
              Every decision is backed by data.
              <br />
              <br />
              This isn’t content creation.
              <br />
              It’s channel architecture.
            </p>
          </div>
  
          {/* ================= The DualMode Advantage ================= */}
          <div className="mt-16">
            <div className="mb-16 text-center">
              <h3 className="text-3xl font-semibold tracking-tight text-white md:text-4xl">
                The DualMode Advantage
              </h3>
            </div>
  
            <div className="grid gap-16 md:grid-cols-3">
              
              <div>
                <h4 className="mb-4 text-xl font-semibold text-white">
                  Data-Driven Execution
                </h4>
                <p className="text-white/60 leading-relaxed">
                  We don’t rely on assumptions. Every strategy is tested,
                  measured, and continuously refined for measurable performance.
                </p>
              </div>
  
              <div>
                <h4 className="mb-4 text-xl font-semibold text-white">
                  Scalable Systems
                </h4>
                <p className="text-white/60 leading-relaxed">
                  Structured production and optimization workflows designed to
                  scale beyond individual uploads and sustain long-term growth.
                </p>
              </div>
  
              <div>
                <h4 className="mb-4 text-xl font-semibold text-white">
                  Long-Term Growth Architecture
                </h4>
                <p className="text-white/60 leading-relaxed">
                  We focus on sustainable brand expansion and revenue scalability
                  — not short-term viral spikes.
                </p>
              </div>
  
            </div>
          </div>
  
        </div>
      </section>
    );
  }