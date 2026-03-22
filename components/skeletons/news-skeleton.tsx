import { Skeleton } from "../ui/skeleton";

const NewsSkeleton = () => {
	return (
		<section className="group cols-span-1 gap-2 w-full">
			<section className="flex flex-col items-end gap-4">
				<Skeleton className="w-full aspect-[14/9] rounded-none object-cover" />

				<section className="gap-3 flex flex-col py-2 w-full">
					<Skeleton className="h-[10px] w-3/4 rounded-none mt-3 mb-2" />

					<Skeleton className="h-[10px] w-full rounded-none" />

					<Skeleton className="h-[10px] w-full rounded-none mb-2" />

					<Skeleton className="h-[10px] w-20 rounded-none" />
				</section>
			</section>
		</section>
	);
};

export default NewsSkeleton;
