import Image from "next/image";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

export function FeaturedArticle() {
	return (
		<Card className="border-0 shadow-none">
			<CardHeader className="p-0">
				<Image
					src={`https://media-cldnry.s-nbcnews.com/image/upload/t_focal-762x508,f_auto,q_auto:best/rockcms/2025-01/250122-elon-musk-ch-1132-9b8ec2.jpg`}
					alt="Women and children affected by war in Ukraine"
					width={600}
					height={400}
					className="w-full h-full object-cover mb-4"
				/>
			</CardHeader>
			<CardContent className="p-0">
				<h2 className="text-2xl font-bold mb-4">
					In Focus : War in Ukraine is going to crisis for women and girls
				</h2>
				<p className="text-gray-600 mb-4 leading-7">
					The war has severely impacted social cohesion, community security and resilience of local
					communities, especially women and girls. Lack of access to social services including
					schools & strained community resources has increased the care burden of local women who
					responsible for the care for children.
				</p>
			</CardContent>
		</Card>
	);
}
