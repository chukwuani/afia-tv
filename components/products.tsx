import Link from "next/link";

import { PRODUCTS } from "@/config";

export default function Products() {
  return (
    <section className="flex flex-col gap-[72px] p-6 md:p-12" id="about">
      <h2 className="font-eb text-5xl font-normal max-w-[450px] tracking-[-2px]">
        A cloud for your entire journey
      </h2>

      <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 w-auto gap-[4.5rem]">
        {PRODUCTS.map((product) => (
          <li className="flex flex-col gap-8" key={product.title}>
            <product.icon color="#007D2E" size={60} />

            <section className="flex flex-col gap-5 max-w-[500px]">
              <h3 className="text-2xl font-normal">{product.title}</h3>

              <p className="text-base font-normal lg:text-lg text-muted-foreground text-pretty">
                {product.description}
              </p>

              <Link
                href={product.href}
                className="underline underline-offset-2 text-lg text-muted-foreground font-light"
              >
                Learn more
              </Link>
            </section>
          </li>
        ))}
      </ul>
    </section>
  );
}
