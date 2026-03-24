import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { Field, FieldGroup } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function DonateDialog() {
	return (
		<Dialog>
			<form autoComplete="off">
				<DialogTrigger asChild>
					<Button variant={"default"} className={"inline-flex text-base font-normal"}>
						Donate
					</Button>
				</DialogTrigger>
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
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button type="submit">Save changes</Button>
          </DialogFooter>
        </DialogContent>
			</form>
		</Dialog>
	);
}
