import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { categoryData } from "@/data/home/category";
import Heading from "../ui/heading";

export default function Category() {
    const { eyebrow, title, subtitle, cards } = categoryData;

    return (
        <section className="bg-white py-20">
            <div className="container container-narrow">

                {/* Heading */}
                <Heading
                    eyebrow={eyebrow}
                    title={title}
                    subtitle={subtitle}
                />

                {/* Cards */}
                <div className="grid grid-cols-1 gap-5 md:grid-cols-3">

                    {cards.map((card) => (
                        <Link
                            href={card.href}
                            key={card.title}
                            className="group relative aspect-[5/5] overflow-hidden rounded-2xl"
                        >

                            {/* Image */}
                            <Image
                                src={card.image}
                                alt={card.title}
                                fill
                                className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                                sizes="(max-width: 768px) 100vw, 33vw"
                            />

                            {/* Overlay */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                            {/* Content */}
                            <div className="absolute inset-x-0 bottom-0 flex items-center justify-between gap-5 p-6 md:p-7">

                                <div className="max-w-[75%] text-xl font-semibold text-white md:text-2xl">
                                    {card.title}
                                </div>

                                {/* White circle arrow */}
                                <div
                                    
                                    aria-label={`View ${card.title}`}
                                    className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-white text-black transition-all duration-300 group-hover:bg-primary group-hover:text-white"
                                >
                                    <ArrowUpRight
                                        size={21}
                                        strokeWidth={1.8}
                                    />
                                </div>

                            </div>

                        </Link>
                    ))}

                </div>

            </div>
        </section>
    );
}
