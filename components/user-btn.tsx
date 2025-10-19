import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

import type { User } from "@supabase/supabase-js";

export default function UserBtn({user}: { user: User | null }) {
	return (
		<Popover>
			<PopoverTrigger asChild>
				<Button variant="ghost" className="h-auto !p-0 hover:bg-transparent cursor-pointer">
					<Avatar>
						<AvatarImage src="/images/photo_placeholder.png" alt="Profile image" />
						<AvatarFallback>JD</AvatarFallback>
					</Avatar>
				</Button>
			</PopoverTrigger>
			<PopoverContent collisionPadding={{ right: 20}} className="w-80 p-1 bg-background">
				<div className="rounded-md px-3 py-2 text-sm transition-colors hover:bg-accent">
					<div className="relative flex items-start gap-3 pe-3">
						<img
							className="size-9 rounded-md"
							src="/images/photo_placeholder.png"
							width={32}
							height={32}
							alt="Profile image"
						/>
						<div className="flex-1 space-y-1">
							<span className="font-medium text-foreground">{user?.user_metadata.full_name}</span>
							<div className="text-xs text-muted-foreground">{user?.email}</div>
						</div>
					</div>
				</div>
			</PopoverContent>
		</Popover>
	);
}
