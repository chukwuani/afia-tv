import { Separator } from "@/components/ui/separator";

export default function MagazineSection() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-16 px-6 lg:px-12">
      <section className="py-10 pt-0 md:col-span-2">
        <h1 className="text-3xl font-garamond tracking-tight mb-5 uppercase">
          RECOMMENDED FOR YOU
        </h1>
        <Separator className="mb-8 h-0.5 bg-[#d0d0d0]" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Blog Post 1 */}
          <div>
            <img
              src="https://cdn.theatlantic.com/thumbor/ljZBSAzNGpC9ygADanxG_VASHWs=/431x3:5047x3075/296x197/media/img/mt/2025/05/2025_05_01_Thunderbolts_Review/original.jpg"
              alt="Skincare Blog"
              className="w-full aspect-video object-cover rounded-lg mb-4 bg-muted"
            />
            <p className="text-gray-500 text-sm mb-2">Jan 16, 2023</p>
            <h4 className="text-2xl font-garamond mb-3">
              How to Get Rid of a Double Chin & Turkey Neck
            </h4>
            <p className="text-gray-600 mb-4 line-clamp-3">
              With timeless designs and high-quality materials, a wooden bed
              frame is a solid investment into coziness.
            </p>
          </div>

          {/* Blog Post 2 */}
          <div>
            <img
              src="https://cdn.theatlantic.com/thumbor/tMpoxoxRobo8cPpUqoyjr31KdKw=/155x1:1842x1124/296x197/media/img/mt/2025/05/tattoos3/original.jpg"
              alt="Skincare Blog"
              className="w-full aspect-video object-cover rounded-lg mb-4 bg-muted"
            />
            <p className="text-gray-500 text-sm mb-2">Jan 5, 2023</p>
            <h4 className="text-2xl font-garamond mb-3">
              Why Microchaneling Outdoes Microneedling Every Time
            </h4>
            <p className="text-gray-600 mb-4 line-clamp-3">
              Much more cost-effective than renovating, freshen up your space by
              swapping out your counter stools.
            </p>
          </div>

          {/* Blog Post 3 */}
          <div>
            <img
              src="https://cdn.theatlantic.com/thumbor/J9OIm97vOY48IMeymeWob7hlQRY=/396x3:4631x2822/296x197/media/img/mt/2025/05/2025_04_25_Books_Briefing_Books_that_make_you_want_to_leave_the_house/original.jpg"
              alt="Skincare Blog"
              className="w-full aspect-video object-cover rounded-lg mb-4 bg-muted"
            />
            <p className="text-gray-500 text-sm mb-2">Dec 11, 2022</p>
            <h4 className="text-2xl font-garamond mb-3">
              Sunlighten Full Spectrum Infrared Sauna Explained by Inventor
            </h4>
            <p className="text-gray-600 mb-4 line-clamp-3">
              A wicker chair outside is a comfortable sight to see, but
              there&apos;s a natural warmth that the look brings inside.
            </p>
          </div>

          {/* Blog Post 4 */}
          <div>
            <img
              src="https://cdn.theatlantic.com/thumbor/s66-hICZi-Pk7ZYeGSNSUNhGP9w=/71x2:3928x2569/296x197/media/img/mt/2025/04/14_B_General-1/original.jpg"
              alt="Skincare Blog"
              className="w-full aspect-video object-cover rounded-lg mb-4 bg-muted"
            />
            <p className="text-gray-500 text-sm mb-2">Dec 11, 2022</p>
            <h4 className="text-xl font-garamond mb-3">
              Sunlighten Full Spectrum Infrared Sauna Explained by Inventor
            </h4>
            <p className="text-gray-600 mb-4 line-clamp-3">
              A wicker chair outside is a comfortable sight to see, but
              there&apos;s a natural warmth that the look brings inside.
            </p>
          </div>
        </div>
      </section>

      <section className="py-10 pt-0 md:col-span-1">
        <h1 className="text-3xl font-garamond tracking-tight mb-5 uppercase">
          Archive
        </h1>
        <Separator className="mb-8 h-0.5 bg-[#d0d0d0]" />
        <div className="grid grid-cols-1 gap-8">
          {/* Blog Post 1 */}
          <div>
            <p className="text-gray-500 text-sm mb-2">Jan 16, 2023</p>
            <h4 className="text-2xl font-garamond mb-3">
              How to Get Rid of a Double Chin & Turkey Neck
            </h4>
            <p className="text-gray-600 mb-4 line-clamp-3">
              With timeless designs and high-quality materials, a wooden bed
              frame is a solid investment into coziness.
            </p>
          </div>

          {/* Blog Post 2 */}
          <div>
            <p className="text-gray-500 text-sm mb-2">Jan 5, 2023</p>
            <h4 className="text-2xl font-garamond mb-3">
              Why Microchaneling Outdoes Microneedling Every Time
            </h4>
            <p className="text-gray-600 mb-4 line-clamp-3">
              Much more cost-effective than renovating, freshen up your space by
              swapping out your counter stools.
            </p>
          </div>

          {/* Blog Post 3 */}
          <div>
            <p className="text-gray-500 text-sm mb-2">Dec 11, 2022</p>
            <h4 className="text-2xl font-garamond mb-3">
              Sunlighten Full Spectrum Infrared Sauna Explained by Inventor
            </h4>
            <p className="text-gray-600 mb-4 line-clamp-3">
              A wicker chair outside is a comfortable sight to see, but
              there&apos;s a natural warmth that the look brings inside.
            </p>
          </div>

          {/* Blog Post 4 */}
          <div>
            <p className="text-gray-500 text-sm mb-2">Dec 11, 2022</p>
            <h4 className="text-xl font-garamond mb-3">
              Sunlighten Full Spectrum Infrared Sauna Explained by Inventor
            </h4>
            <p className="text-gray-600 mb-4 line-clamp-3">
              A wicker chair outside is a comfortable sight to see, but
              there&apos;s a natural warmth that the look brings inside.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
