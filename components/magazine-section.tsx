import { Separator } from "@/components/ui/separator";

export default function MagazineSection() {
  const newsFeed = [
    {
      id: 1,
      imgSrc:
        "https://cdn.theatlantic.com/thumbor/ljZBSAzNGpC9ygADanxG_VASHWs=/431x3:5047x3075/296x197/media/img/mt/2025/05/2025_05_01_Thunderbolts_Review/original.jpg",
      title: "How to Get Rid of a Double Chin & Turkey Neck",
      description:
        "With timeless designs and high-quality materials, a wooden bed frame is a solid investment into coziness.",
    },
    {
      id: 2,
      imgSrc:
        "https://cdn.theatlantic.com/thumbor/tMpoxoxRobo8cPpUqoyjr31KdKw=/155x1:1842x1124/296x197/media/img/mt/2025/05/tattoos3/original.jpg",
      title: "Why Microchaneling Outdoes Microneedling Every Time",
      description:
        "Much more cost-effective than renovating, freshen up your space by swapping out your counter stools.",
    },
    {
      id: 3,
      imgSrc:
        "https://cdn.theatlantic.com/thumbor/J9OIm97vOY48IMeymeWob7hlQRY=/396x3:4631x2822/296x197/media/img/mt/2025/05/2025_04_25_Books_Briefing_Books_that_make_you_want_to_leave_the_house/original.jpg",
      title: "Sunlighten Full Spectrum Infrared Sauna Explained by Inventor",
      description:
        "A wicker chair outside is a comfortable sight to see, but there's a natural warmth that the look brings inside.",
    },
    {
      id: 4,
      imgSrc:
        "https://cdn.theatlantic.com/thumbor/s66-hICZi-Pk7ZYeGSNSUNhGP9w=/71x2:3928x2569/296x197/media/img/mt/2025/04/14_B_General-1/original.jpg",
      title: "Sunlighten Full Spectrum Infrared Sauna Explained by Inventor",
      description:
        "A wicker chair outside is a comfortable sight to see, but there's a natural warmth that the look brings inside.",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-16 sm:px-12">
      <section className="py-10 md:col-span-2">
        <h1 className="text-3xl font-epilogue mb-5 max-sm:px-6 uppercase tracking-[.009rem]">
          RECOMMENDED FOR YOU
        </h1>
        <Separator className="mb-8 h-0.5 bg-border" />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {newsFeed.map((item) => (
            <div key={item.id} className="flex flex-col-reverse lg:flex-col">
              <img
                src={item.imgSrc}
                alt="Skincare Blog"
                className="w-full aspect-video object-cover rounded-lg mb-4 bg-muted"
              />

              <section className="max-sm:px-6">
                <p className="text-muted-foreground font-epilogue text-sm mb-2">
                  Jan 16, 2023
                </p>
                <h4 className="text-2xl font-haffer mb-3">{item.title}</h4>
                <p className="text-sm leading-7 tracking-wide font-epilogue text-muted-foreground mb-4 line-clamp-3">
                  {item.description}
                </p>
              </section>
            </div>
          ))}
        </div>
      </section>

      <section className="py-10 md:col-span-1">
        <h1 className="text-3xl font-epilogue mb-5 max-sm:px-6 uppercase tracking-[.009rem]">
          Archive
        </h1>
        <Separator className="mb-8 h-0.5 bg-border" />

        <div className="grid grid-cols-1 gap-8 max-sm:px-6">
          {newsFeed.map((item) => (
            <div key={item.id}>
              <p className="text-muted-foreground font-epilogue text-sm mb-2">
                Jan 16, 2023
              </p>
              <h4 className="text-2xl font-haffer mb-3">{item.title}</h4>
              <p className="text-sm leading-7 tracking-wide font-epilogue text-muted-foreground mb-4 line-clamp-3">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
