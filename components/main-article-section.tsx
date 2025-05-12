export default function MainArticleSection() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-16 px-6 lg:px-12">
      <section className="py-10 md:col-span-2">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Blog Post 1 */}
          <div>
            <img
              src="https://cdn.theatlantic.com/thumbor/3P7Uny9GrpmeZl3NK4DgBb-XS8Q=/155x1:1842x1124/296x197/media/img/mt/2025/04/2025_4_22_Laws_Are_Just_Culture_JA/original.jpg"
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
              src="https://cdn.theatlantic.com/thumbor/TN92iVT5C5rXHUVX6-vhcLj1hRw=/155x1:1842x1124/296x197/media/img/mt/2025/05/25_5_2_Jaouad_Love_and_death_final_horizontal/original.jpg"
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
        </div>
      </section>

      <section className="py-10 md:col-span-1">
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
        </div>
      </section>
    </div>
  );
}
