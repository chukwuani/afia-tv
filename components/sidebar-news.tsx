import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";

export function SidebarNews() {
	return (
		<div className="space-y-6">
			<Card className="border-0 shadow-none">
				<CardContent className="p-0">
					<Image
						src="https://media-cldnry.s-nbcnews.com/image/upload/t_focal-762x508,f_auto,q_auto:best/rockcms/2025-01/250122-Lynn-Ban-ch-1604-87b85f.jpg"
						alt="Argentina World Cup celebration"
						width={400}
						height={300}
						className="w-full h-48 object-cover mb-4"
					/>
					<h3 className="text-lg font-bold mb-2 truncate leading-6">
						Argentina won the Fifa World Cup
					</h3>
					<p className="text-sm text-gray-600">
						Argentina vs France, FIFA World Cup 2023 Argentina bested France 4-2 penalties to win
						their third World Cup, after 36 years.
					</p>
				</CardContent>
			</Card>

			<Card className="border-0 shadow-none">
				<CardContent className="p-0">
					<Image
						src="https://media-cldnry.s-nbcnews.com/image/upload/t_focal-762x508,f_auto,q_auto:best/rockcms/2025-01/250121-khan-younis-mb-0922-a885eb.jpg"
						alt="Elon Musk"
						width={400}
						height={300}
						className="w-full h-48 object-cover mb-4"
					/>
					<h3 className="text-lg font-bold mb-2 truncate leading-6">
						Twitter users vote to oust Musk, CEO
					</h3>
					<p className="text-sm text-gray-600">
						Twitter users voted to call for Elon Musk to step down as chief executive of media.
					</p>
				</CardContent>
			</Card>
		</div>
	);
}
