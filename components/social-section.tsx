import { Separator } from "@/components/ui/separator";

export default function SocialSection() {
  return (
    <div className="gap-16 px-6 lg:px-12">
      <section className="py-10 pt-0">
        <h1 className="text-3xl font-garamond tracking-tight mb-5 uppercase">
          WATCH
        </h1>
        <Separator className="mb-8 h-0.5 bg-[#d0d0d0]" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Blog Post 1 */}
          <div className="flex flex-row-reverse">
            <img
              src="https://cdn.theatlantic.com/thumbor/EibJAngROsqof0j4bosnteVR50I=/85x28:4714x3109/296x197/media/img/2025/04/JJ00019_25_A_4_WEB/original.jpg"
              alt="Skincare Blog"
              className="w-fit max-w-[150px] aspect-video object-cover mr-4 bg-muted"
            />

            <h4 className="text-lg font-garamond mb-3">
              How to Get Rid of a Double Chin & Turkey Neck
            </h4>
          </div>

          {/* Blog Post 2 */}
          <div className="flex flex-row-reverse">
            <img
              src="https://cdn.theatlantic.com/thumbor/R0rc01V82jNmxK9sVFmNdJZrODo=/36x357:1963x1642/624x416/media/img/mt/2025/05/UhOhEconomy_1/original.png"
              alt="Skincare Blog"
              className="w-fit max-w-[150px] aspect-video object-cover mr-4 bg-muted"
            />

            <h4 className="text-lg font-garamond mb-3">
              Why Microchaneling Outdoes Microneedling Every Time
            </h4>
          </div>

          {/* Blog Post 3 */}
          <div className="flex flex-row-reverse">
            <img
              src="https://cdn.theatlantic.com/thumbor/srzQTe9VIG2hSHOxwkusL2-IMi8=/202x2:2632x1619/296x197/media/img/mt/2025/05/1_The_Atlantic/original.jpg"
              alt="Skincare Blog"
              className="w-fit max-w-[150px] aspect-video object-cover mr-4 bg-muted"
            />

            <h4 className="text-lg font-garamond mb-3">
              Sunlighten Full Spectrum Infrared Sauna Explained by Inventor
            </h4>
          </div>

          {/* Blog Post 1 */}
          <div className="flex flex-row-reverse">
            <img
              src="https://cdn.theatlantic.com/thumbor/cQcxUyiHIrbcVHKgoni-GHpqx6o=/269x0:1961x1125/200x133/media/img/mt/2025/04/25_4_29_Gornick_Mavis_Gallant_final_horizontal/original.jpg"
              alt="Skincare Blog"
              className="w-fit max-w-[150px] aspect-video object-cover mr-4 bg-muted"
            />

            <h4 className="text-lg font-garamond mb-3">
              How to Get Rid of a Double Chin & Turkey Neck
            </h4>
          </div>

          {/* Blog Post 2 */}
          <div className="flex flex-row-reverse">
            <img
              src="https://cdn.theatlantic.com/thumbor/QlamvvWN6UxaB9lA69gbalAnJbQ=/311x0:3694x2250/200x133/media/img/mt/2025/05/2025_05_02_LA_Port_Tariffs/original.jpg"
              alt="Skincare Blog"
              className="w-fit max-w-[150px] aspect-video object-cover mr-4 bg-muted"
            />

            <h4 className="text-lg font-garamond mb-3">
              Why Microchaneling Outdoes Microneedling Every Time
            </h4>
          </div>

          {/* Blog Post 3 */}
          <div className="flex flex-row-reverse">
            <img
              src="https://cdn.theatlantic.com/thumbor/StSH54XdKxHD6UX3BcuT1xs_Ftk=/178x394:4213x3077/200x133/media/img/mt/2025/05/GettyImages_169816088/original.jpg"
              alt="Skincare Blog"
              className="w-fit max-w-[150px] aspect-video object-cover mr-4 bg-muted"
            />

            <h4 className="text-lg font-garamond mb-3">
              Sunlighten Full Spectrum Infrared Sauna Explained by Inventor
            </h4>
          </div>
        </div>
      </section>
    </div>
  );
}
