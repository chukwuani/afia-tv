export default function MainArticleSection() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 lg:gap-16 sm:px-12">
      <section className="py-10 md:col-span-2">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Blog Post 1 */}
          <div className="flex flex-col-reverse lg:flex-col">
            <img
              src="https://cdn.theatlantic.com/thumbor/3P7Uny9GrpmeZl3NK4DgBb-XS8Q=/155x1:1842x1124/296x197/media/img/mt/2025/04/2025_4_22_Laws_Are_Just_Culture_JA/original.jpg"
              alt="Skincare Blog"
              className="w-full aspect-video object-cover rounded-lg mb-4 bg-muted"
            />

            <section className="max-sm:px-6">
              <p className="text-imaginative-timing-328979framerappboulder font-epilogue text-sm mb-2">
                Jan 16, 2023
              </p>
              <h4 className="text-2xl font-inter mb-3">
                How to Get Rid of a Double Chin & Turkey Neck
              </h4>
              <p className="text-sm leading-7 tracking-wide font-epilogue text-imaginative-timing-328979framerappboulder mb-4 line-clamp-3">
                With timeless designs and high-quality materials, a wooden bed
                frame is a solid investment into coziness.
              </p>
            </section>
          </div>

          {/* Blog Post 2 */}
          <div className="flex flex-col-reverse lg:flex-col">
            <img
              src="https://cdn.theatlantic.com/thumbor/TN92iVT5C5rXHUVX6-vhcLj1hRw=/155x1:1842x1124/296x197/media/img/mt/2025/05/25_5_2_Jaouad_Love_and_death_final_horizontal/original.jpg"
              alt="Skincare Blog"
              className="w-full aspect-video object-cover rounded-lg mb-4 bg-muted"
            />

            <section className="max-sm:px-6">
              <p className="text-imaginative-timing-328979framerappboulder font-epilogue text-sm mb-2">
                Jan 5, 2023
              </p>
              <h4 className="text-2xl font-inter mb-3">
                Why Microchaneling Outdoes Microneedling Every Time
              </h4>
              <p className="text-sm leading-7 tracking-wide font-epilogue text-imaginative-timing-328979framerappboulder mb-4 line-clamp-3">
                Much more cost-effective than renovating, freshen up your space
                by swapping out your counter stools.
              </p>
            </section>
          </div>
        </div>
      </section>

      <section className="py-10 md:col-span-1 max-lg:pt-0">
        <div className="grid grid-cols-1 gap-8 max-sm:px-6">
          {/* Blog Post 1 */}
          <div>
            <p className="text-imaginative-timing-328979framerappboulder font-epilogue text-sm mb-2">
              Jan 16, 2023
            </p>
            <h4 className="text-2xl font-inter mb-3">
              How to Get Rid of a Double Chin & Turkey Neck
            </h4>
            <p className="text-sm leading-7 tracking-wide font-epilogue text-imaginative-timing-328979framerappboulder mb-4 line-clamp-3">
              With timeless designs and high-quality materials, a wooden bed
              frame is a solid investment into coziness.
            </p>
          </div>

          {/* Blog Post 2 */}
          <div>
            <p className="text-imaginative-timing-328979framerappboulder font-epilogue text-sm mb-2">
              Jan 5, 2023
            </p>
            <h4 className="text-2xl font-inter mb-3">
              Why Microchaneling Outdoes Microneedling Every Time
            </h4>
            <p className="text-sm leading-7 tracking-wide font-epilogue text-imaginative-timing-328979framerappboulder mb-4 line-clamp-3">
              Much more cost-effective than renovating, freshen up your space by
              swapping out your counter stools.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
