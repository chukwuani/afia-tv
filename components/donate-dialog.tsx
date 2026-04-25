import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import { Field, FieldGroup } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function DonateDialog({ open, onOpenChange }: { open: boolean; onOpenChange: (open: boolean) => void }) {
	return (
		<Dialog open={open} onOpenChange={onOpenChange}>
			<form autoComplete="off">
				<DialogContent className="sm:max-w-sm">
					<DialogHeader>
						<DialogTitle>Support our mission.</DialogTitle>
						<DialogDescription>
							Enter your email to be redirected to our secure donation portal.
						</DialogDescription>
					</DialogHeader>

					<FieldGroup>
						<Field>
							<Label htmlFor="email">Email</Label>
							<Input id="email" name="email" type="email" placeholder="m@example.com" />
						</Field>
					</FieldGroup>

					<DialogFooter>
						<Button type="submit">Save changes</Button>
					</DialogFooter>
				</DialogContent>
			</form>
		</Dialog>
	);
}
