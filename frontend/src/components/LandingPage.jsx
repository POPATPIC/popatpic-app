import React from 'react';
import { useNavigate } from 'react-router-dom';

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#f7f9fb] text-[#191c1e] overflow-x-hidden">
      {/* Navbar */}
      <header className="fixed top-0 z-50 w-full bg-white/70 backdrop-blur-xl shadow-[0_4px_30px_rgba(139,92,246,0.15)] border-b border-white/40">
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 md:px-10">
          <div className="text-2xl font-bold tracking-tighter text-[#6b38d4]">
            Pop@Pic!
          </div>

          <nav className="hidden items-center gap-8 md:flex">
            <a href="#gallery" className="text-[#494454] transition-colors hover:text-[#6b38d4]">
              Gallery
            </a>
            <a href="#frames" className="text-[#494454] transition-colors hover:text-[#6b38d4]">
              Frames
            </a>
            <a href="#about" className="text-[#494454] transition-colors hover:text-[#6b38d4]">
              About
            </a>
          </nav>

          <button
            onClick={() => navigate('/select-frame')}
            className="hidden rounded-full bg-gradient-to-r from-[#6b38d4] to-[#fd56a7] px-6 py-3 font-bold text-white transition-all hover:scale-105 md:block"
          >
            Start Session
          </button>

          <button className="text-[#6b38d4] md:hidden" aria-label="Open menu">
            ☰
          </button>
        </div>
      </header>

      {/* Main */}
      <main className="pt-24 pb-20">
        {/* Hero */}
        <section className="relative mx-auto flex min-h-[820px] max-w-7xl items-center px-5 md:px-10">
          <div className="absolute left-1/4 top-1/4 -z-10 h-64 w-64 rounded-full bg-[#6b38d4]/20 blur-[80px]" />
          <div className="absolute bottom-1/4 right-1/4 -z-10 h-80 w-80 rounded-full bg-[#fd56a7]/20 blur-[100px]" />

          <div className="flex w-full flex-col items-center gap-12 md:flex-row">
            <div className="flex-1 text-center md:text-left">
              <div className="mb-6 inline-flex items-center rounded-full border border-[#6b38d4]/20 bg-[#6b38d4]/10 px-4 py-1.5 font-semibold text-[#6b38d4]">
                <span className="mr-2 inline-block h-2 w-2 animate-pulse rounded-full bg-[#fd56a7]" />
                Live Photobooth Experience
              </div>

              <h1 className="mb-6 text-5xl font-extrabold tracking-tighter leading-tight md:text-[72px]">
                <span className="bg-gradient-to-r from-[#6b38d4] to-[#fd56a7] bg-clip-text text-transparent">
                  Pop@Pic!
                </span>
                <br />
                Snap. Style.
                <br />
                Share.
              </h1>

              <p className="mx-auto mb-10 max-w-lg text-lg text-[#494454] md:mx-0">
                Turn ordinary moments into electric memories. Choose your vibe, strike a pose,
                and instantly share high-energy photos with our premium digital booth.
              </p>

              <div className="flex flex-col justify-center gap-4 sm:flex-row md:justify-start">
                <button
                  onClick={() => navigate('/select-frame')}
                  className="flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#6b38d4] to-[#fd56a7] px-8 py-4 text-lg font-bold text-white shadow-lg transition-all hover:scale-105"
                >
                  <span></span>
                  Start Session
                </button>

                <button className="rounded-full border-2 border-[#6b38d4] bg-white/60 px-8 py-4 font-bold text-[#6b38d4] backdrop-blur-sm transition-colors hover:bg-[#6b38d4]/5">
                  Explore Frames
                </button>
              </div>
            </div>

            <div className="relative w-full max-w-md flex-1">
              <div className="rotate-3 rounded-[2rem] border border-white/50 bg-white/70 p-4 shadow-[0_4px_30px_rgba(139,92,246,0.15)] backdrop-blur-[20px] transition-transform duration-500 hover:rotate-0">
                <div className="relative aspect-[3/4] overflow-hidden rounded-2xl">
                  <img
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuAL_ZDqduBGpy7sbYDkTJeSjccWGuCvw1rYqGgAHgCczprDq29_cRJkrheUR9bXktMubNjTAC3CHtNzeWOW01h5CAAIj7OZgfFN2fKQ6ls6h7VU_fMRj8dh5Vcp1M05SNE55fQM718iZbBqyfVVEfOHRdOi6eqYlinZQ503vmFmxtf-f6-8JhtktamtbGQcSSJYNuWQipHWAbixb_ZP7Nc0OvT0epmvf-VprZJhNv5HqMOaEBsUQ7ekpLEVUtr0BKSNmAdt_9CiqMZk"
                    alt="A lively photo booth snapshot of three friends laughing and posing playfully."
                    className="h-full w-full object-cover"
                  />
                  <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between">
                    <div className="flex items-center gap-1.5 rounded-full border border-white/40 bg-white/70 px-3 py-1.5 backdrop-blur-sm">
                      <span className="h-2 w-2 rounded-full bg-[#fd56a7]" />
                      <span className="text-[12px] font-semibold text-[#191c1e]">Recording</span>
                    </div>
                    <div className="rounded-full bg-white/70 p-2 text-[#6b38d4] backdrop-blur-sm">
                      ♥
                    </div>
                  </div>
                </div>
              </div>

              <div className="absolute -bottom-8 -left-8 rounded-xl border border-white/50 bg-white/70 p-3 shadow-[0_4px_30px_rgba(139,92,246,0.15)] backdrop-blur-[20px]">
                <img
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuBMUJh7f4fJtpXMoWHMTNEMbKnZKxecxjp0kyervi9H63xuN4kdM5IWt3mdWLmppO8UN6ZPJhOSlcbToDLOSyfRZik6ikhEzB73ajFjR01r31dG1eXgr4wJvBzXVaJqOEg1ZqjukUnmApYmTwmJLKvQwgP6eRZ1qjcUMb-aTBwV1tGTlEQTtK0kn60P_nQQ5Yg-n9_5_lREKUXSjAHJvEVG8aO3KyDBSS1xflcaheFqY2BeEuU_hrsDIri0GH1Nvj3XruTAFlF-Ci2c"
                  alt="A smiling person wearing stylish sunglasses."
                  className="h-24 w-24 rounded-lg object-cover"
                />
              </div>

              <div className="absolute -right-6 -top-6 rounded-xl border border-white/50 bg-white/70 p-3 shadow-[0_4px_30px_rgba(139,92,246,0.15)] backdrop-blur-[20px]">
                <img
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuD0BNfMHun62gBMiPCe6MZLbH7A1lXQjyZWqkABOZT7rz77w4dYK1ahfjsWkicRw68iT4rPx2lBE0qRvZmbewhrTiU1jKUnWydjWGAX4M4lT_m-wWy_WhshlyKpgFIqF_v_XElax7qtIPPlz35mTgIVK8OJx_zJnhNFIlAGX3JY_I8WYZngOiux2ZPYGEfhEXi1-thI_iENEo2wSRQcBb_1wadI1ma3P02MioQyfA92VyKfdMSxYMWWlUXyYCL_wwOulNMxkS0qAjiM"
                  alt="Two friends making silly faces in a bright photo booth setting."
                  className="h-20 w-20 rounded-lg object-cover"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Frames */}
        <section id="frames" className="mx-auto mt-20 max-w-7xl px-5 md:px-10">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold text-[#191c1e] md:text-[32px]">
              Curated Aesthetics
            </h2>
            <p className="mx-auto max-w-2xl text-[#494454]">
              Choose from our collection of premium, social-ready frames to match your energy.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 md:auto-rows-[300px] md:grid-cols-3">
            <div className="group relative flex cursor-pointer flex-col overflow-hidden rounded-[2rem] border border-white/50 bg-white/70 p-6 shadow-[0_4px_30px_rgba(139,92,246,0.15)] backdrop-blur-[20px] transition-all hover:shadow-[0_8px_40px_rgba(253,86,167,0.3)] md:col-span-2 md:flex-row md:gap-6">
              <div className="relative flex-1 overflow-hidden rounded-xl">
                <img
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuCBrpeXR9lYXK6GkTsgGO7rKIoD7y6pa8eqVZ5JCQ2cmDcT2AdeUMAaanD6Dl4aguhzXVxs2MaYGkQYNpgCuHFpMwsdu_v-qr0w74MiNpV2Oe2CifYaAXBE_8-I-oYliXQ3pdSV2eRBXpKRNfrThQJdSLTOOBpsIbU1x_Yjg_OQpWL0VbyQF_WQZ7yP1eYFNCfHOdNASL5-o2C1Mzoqk7MxXEWWKQpm-v2O-Jg79Sm5yLx79gz_8uSzPWTL7nid1Zux1GF1jgMZslRA"
                  alt="A vibrant concert or party scene with raised hands and bright pink and purple stage lights."
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>

              <div className="flex flex-1 flex-col justify-center">
                <div className="mb-3 inline-block w-fit rounded-full bg-[#fd56a7]/10 px-3 py-1 text-[12px] font-bold text-[#fd56a7]">
                  Trending
                </div>
                <h3 className="mb-2 text-[24px] font-bold text-[#191c1e]">Neon Nights</h3>
                <p className="mb-6 text-[#494454]">
                  Electric purples and vibrant pinks for that high-energy main character vibe.
                </p>
                <button className="flex items-center gap-2 font-bold text-[#6b38d4]">
                  Try this frame <span>→</span>
                </button>
              </div>
            </div>

            <div className="group flex cursor-pointer flex-col rounded-[2rem] border border-white/50 bg-white/70 p-4 shadow-[0_4px_30px_rgba(139,92,246,0.15)] backdrop-blur-[20px] transition-all hover:shadow-[0_8px_40px_rgba(253,86,167,0.3)]">
              <div className="mb-4 h-40 overflow-hidden rounded-xl">
                <img
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuDWRIIPyHLIM-Qk7WuG5zP3SCHAmdM8Oyo4Mxa1U9USN2XmOgtB_Y7cU34aDlcMx1B2xDS-f7JhOxW-5rYZ2ugq0crF3ZzXtPEIpS3SbA4aWU_x20cjXYF91_2jOXRt5qRguAXVHnlj_nuRKgipsxw8iyGMCISuzw_08PwmkLG6hKErV7YOpQxPkL83Wr_R0uJPPwYcX5cTo_emSBHWjjjADo9Oy_HzyS2WXyAD-VQIUOziss2KXjU-DUaVNy8xRMtvsS-6GkU5DDdg"
                  alt="A clean minimalist portrait against a white background."
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <h3 className="mb-1 text-[20px] font-bold text-[#191c1e]">Classic White</h3>
              <p className="text-sm text-[#494454]">Clean, minimal, timeless.</p>
            </div>

            <div className="group flex cursor-pointer flex-col rounded-[2rem] border border-white/50 bg-white/70 p-4 shadow-[0_4px_30px_rgba(139,92,246,0.15)] backdrop-blur-[20px] transition-all hover:shadow-[0_8px_40px_rgba(253,86,167,0.3)]">
              <div className="mb-4 h-40 overflow-hidden rounded-xl">
                <img
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuBgBXIvbywiLASh4X_7reavpigxIHNN_cjRWg-jXpPZ4RuOw9YQurJSYo6Tq-HHlX4VvAXilT2MMt3YX5WJEQxqfYSD65ZHCkViTW93KyQrknL1rJ0cF4bcqzldIzwM7SQQxHaMqby5xjvitbokmlqZhhJAka00ALLAo7aqGZoOXbZmcYRxHEA1UzEHyvPVOT4ikQLC3kiAQObMujmwAF_dWN1hTK7EtMf3yxGgCDiAZJj8G-Ty_XBnJ8kQKpVkKezjPxJEL_lYCbs7"
                  alt="A moody image with deep shadows and bright cyan and purple highlights."
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <h3 className="mb-1 text-[20px] font-bold text-[#191c1e]">Cyber Pop</h3>
              <p className="text-sm text-[#494454]">Glitchy, bold, digital.</p>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-[#cbc3d7] bg-white/60 px-5 py-12 backdrop-blur-sm md:px-10">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 md:flex-row">
          <div className="text-2xl font-bold tracking-tighter text-[#fd56a7]">Pop@Pic!</div>
          <div className="flex gap-6">
            <a href="#privacy" className="text-[#494454] transition-colors hover:text-[#6b38d4]">
              Privacy Policy
            </a>
            <a href="#terms" className="text-[#494454] transition-colors hover:text-[#6b38d4]">
              Terms of Service
            </a>
            <a href="#help" className="text-[#494454] transition-colors hover:text-[#6b38d4]">
              Help Center
            </a>
          </div>
          <div className="text-[#b4136d]">© 2026 Pop@Pic!. Electric moments captured.</div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;