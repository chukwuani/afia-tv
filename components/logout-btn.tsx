"use client";

import { Button } from "@/components/ui/button";
import { supabase } from "@/lib/supabase";
import { unknownError } from "@/lib/utils";

import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { toast } from "sonner";

function LogoutBtn() {
	const router = useRouter();
	const [isLoading, startTransition] = useTransition();

	const handleSignOut = () => {
		startTransition(async () => {
			try {
				const { error } = await supabase.auth.signOut();

				if (error) {
					toast.error("Error!", {
						description: error.message,
					});

					return;
				}

				router.refresh();
			} catch (error) {
				// TODO
				// console.log(error);

				toast.error("Error!", {
					description: unknownError,
				});
			}
		});
	};
	return (
		<Button disabled={isLoading} onClick={handleSignOut} variant="outline" size="sm">
			Log Out
		</Button>
	);
}

export default LogoutBtn;
