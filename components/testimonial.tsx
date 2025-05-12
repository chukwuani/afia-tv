import { Icons } from "./icons";

export default function TestimonialsSection() {
  return (
    <section className="w-full py-16 px-4 md:px-6 lg:px-8 bg-white">
      <div className="max-w-[1200px] mx-auto">
        {/* Header */}
        <div className="text-center mb-16 max-w-[650px] mx-auto">
          <h1 className="text-4xl sm:text-6xl text-pretty font-garamond font-normal tracking-tight text-zinc-800 text-center">
            What our users say about their experience
          </h1>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Testimonial 1 */}
          <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm relative">
            <div className="flex justify-between items-start mb-6">
              <div className="flex items-center gap-3">
                <img
                  src="https://framerusercontent.com/images/8PvlnJskoG5QDTxcMv1OGOhkzEw.jpg"
                  alt="Daniel Brooks"
                  width={48}
                  height={48}
                  className="rounded-full"
                />
                <div>
                  <h3 className="font-semibold text-[#222222]">
                    Daniel Brooks
                  </h3>
                  <p className="text-sm text-[#5c5c5c]">@Danieltech</p>
                </div>
              </div>
              <Icons.x className="w-5 h-5 text-[#000000]" />
            </div>
            <p className="font-imaginative-timing-328979-framer-app-semantic-button font-[number:var(--imaginative-timing-328979-framer-app-semantic-button-font-weight)] text-imaginative-timing-328979framerappboulder text-[length:var(--imaginative-timing-328979-framer-app-semantic-button-font-size)] tracking-[var(--imaginative-timing-328979-framer-app-semantic-button-letter-spacing)] leading-[var(--imaginative-timing-328979-framer-app-semantic-button-line-height)] [font-style:var(--imaginative-timing-328979-framer-app-semantic-button-font-style)]">
              This template is a powerhouse! With its modern layout and smooth
              performance, Plexora is a must-have for professionals.
            </p>
          </div>

          {/* Testimonial 2 */}
          <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm relative">
            <div className="flex justify-between items-start mb-6">
              <div className="flex items-center gap-3">
                <img
                  src="https://framerusercontent.com/images/8PvlnJskoG5QDTxcMv1OGOhkzEw.jpg"
                  alt="Emma Cole"
                  width={48}
                  height={48}
                  className="rounded-full"
                />
                <div>
                  <h3 className="font-semibold text-[#222222]">Emma Cole</h3>
                  <p className="text-sm text-[#5c5c5c]">@Emmadigital</p>
                </div>
              </div>
              <Icons.x className="w-5 h-5 text-[#000000]" />
            </div>
            <p className="font-imaginative-timing-328979-framer-app-semantic-button font-[number:var(--imaginative-timing-328979-framer-app-semantic-button-font-weight)] text-imaginative-timing-328979framerappboulder text-[length:var(--imaginative-timing-328979-framer-app-semantic-button-font-size)] tracking-[var(--imaginative-timing-328979-framer-app-semantic-button-letter-spacing)] leading-[var(--imaginative-timing-328979-framer-app-semantic-button-line-height)] [font-style:var(--imaginative-timing-328979-framer-app-semantic-button-font-style)]">
              Plexora helped us launch a stunning and fully optimized website in
              record time. It&apos;s incredibly intuitive, highly responsive,
              and
              <br />
              <br />
              packed with useful features that make website building and
              management easier than ever before!
            </p>
          </div>

          {/* Testimonial 3 */}
          <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm relative">
            <div className="flex justify-between items-start mb-6">
              <div className="flex items-center gap-3">
                <img
                  src="https://framerusercontent.com/images/8PvlnJskoG5QDTxcMv1OGOhkzEw.jpg"
                  alt="Mason Gray"
                  width={48}
                  height={48}
                  className="rounded-full"
                />
                <div>
                  <h3 className="font-semibold text-[#222222]">Mason Gray</h3>
                  <p className="text-sm text-[#5c5c5c]">@Masonbuilds</p>
                </div>
              </div>
              <Icons.x className="w-5 h-5 text-[#000000]" />
            </div>
            <p className="font-imaginative-timing-328979-framer-app-semantic-button font-[number:var(--imaginative-timing-328979-framer-app-semantic-button-font-weight)] text-imaginative-timing-328979framerappboulder text-[length:var(--imaginative-timing-328979-framer-app-semantic-button-font-size)] tracking-[var(--imaginative-timing-328979-framer-app-semantic-button-letter-spacing)] leading-[var(--imaginative-timing-328979-framer-app-semantic-button-line-height)] [font-style:var(--imaginative-timing-328979-framer-app-semantic-button-font-style)]">
              Absolutely love Plexora! It&apos;s efficient, well-structured, and
              takes the hassle out of website creation.
            </p>
          </div>

          {/* Testimonial 4 */}
          <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm relative md:col-span-1 lg:col-span-1">
            <div className="flex justify-between items-start mb-6">
              <div className="flex items-center gap-3">
                <img
                  src="https://framerusercontent.com/images/8PvlnJskoG5QDTxcMv1OGOhkzEw.jpg"
                  alt="Sophia Reed"
                  width={48}
                  height={48}
                  className="rounded-full"
                />
                <div>
                  <h3 className="font-semibold text-[#222222]">Sophia Reed</h3>
                  <p className="text-sm text-[#5c5c5c]">@Sophiacreates</p>
                </div>
              </div>
              <Icons.x className="w-5 h-5 text-[#000000]" />
            </div>
            <p className="font-imaginative-timing-328979-framer-app-semantic-button font-[number:var(--imaginative-timing-328979-framer-app-semantic-button-font-weight)] text-imaginative-timing-328979framerappboulder text-[length:var(--imaginative-timing-328979-framer-app-semantic-button-font-size)] tracking-[var(--imaginative-timing-328979-framer-app-semantic-button-letter-spacing)] leading-[var(--imaginative-timing-328979-framer-app-semantic-button-line-height)] [font-style:var(--imaginative-timing-328979-framer-app-semantic-button-font-style)]">
              Plexora makes website management effortless. The sleek design and
              user-friendly interface make it a perfect choice for any business.
            </p>
          </div>

          {/* Testimonial 5 - Middle Bottom */}
          <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm relative md:col-span-1 lg:col-span-1">
            <div className="flex justify-between items-start mb-6">
              <div className="flex items-center gap-3">
                <img
                  src="https://framerusercontent.com/images/8PvlnJskoG5QDTxcMv1OGOhkzEw.jpg"
                  alt="Liam Carter"
                  width={48}
                  height={48}
                  className="rounded-full"
                />
                <div>
                  <h3 className="font-semibold text-[#222222]">Liam Carter</h3>
                  <p className="text-sm text-[#5c5c5c]">@Liamweb</p>
                </div>
              </div>
              <Icons.x className="w-5 h-5 text-[#000000]" />
            </div>
            <p className="font-imaginative-timing-328979-framer-app-semantic-button font-[number:var(--imaginative-timing-328979-framer-app-semantic-button-font-weight)] text-imaginative-timing-328979framerappboulder text-[length:var(--imaginative-timing-328979-framer-app-semantic-button-font-size)] tracking-[var(--imaginative-timing-328979-framer-app-semantic-button-letter-spacing)] leading-[var(--imaginative-timing-328979-framer-app-semantic-button-line-height)] [font-style:var(--imaginative-timing-328979-framer-app-semantic-button-font-style)]">
              From design to performance, Plexora delivers a seamless
              experience. Our team loves how easy it is to customize.
            </p>
          </div>

          {/* Testimonial 6 - Right Bottom */}
          <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm relative md:col-span-1 lg:col-span-1">
            <div className="flex justify-between items-start mb-6">
              <div className="flex items-center gap-3">
                <img
                  src="https://framerusercontent.com/images/8PvlnJskoG5QDTxcMv1OGOhkzEw.jpg"
                  alt="Olivia Hayes"
                  width={48}
                  height={48}
                  className="rounded-full"
                />
                <div>
                  <h3 className="font-semibold text-[#222222]">Olivia Hayes</h3>
                  <p className="text-sm text-[#5c5c5c]">@Olivia-studio</p>
                </div>
              </div>
              <Icons.x className="w-5 h-5 text-[#000000]" />
            </div>
            <p className="font-imaginative-timing-328979-framer-app-semantic-button font-[number:var(--imaginative-timing-328979-framer-app-semantic-button-font-weight)] text-imaginative-timing-328979framerappboulder text-[length:var(--imaginative-timing-328979-framer-app-semantic-button-font-size)] tracking-[var(--imaginative-timing-328979-framer-app-semantic-button-letter-spacing)] leading-[var(--imaginative-timing-328979-framer-app-semantic-button-line-height)] [font-style:var(--imaginative-timing-328979-framer-app-semantic-button-font-style)]">
              Plexora is a game-changer! The perfect balance of style and
              functionality, making our website look professional and polished
              easily.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
