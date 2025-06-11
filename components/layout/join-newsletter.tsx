"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Icons } from "@/components/icons";

const JoinNewsletterForm = () => {
  return (
    <div className="flex flex-col items-center justify-center gap-8 py-[100px] px-12 bg-accent">
      <Icons.heart className="w-[200px] text-brand-700" />
      <div className="flex flex-col items-center justify-center gap-4">
        <h3 className="text-center text-3xl font-medium font-epilogue tracking-[.009rem]">
          Subscribe to receive our newsletter!
        </h3>
        <p className="text-center text-sm leading-7 tracking-wide font-epilogue text-muted-foreground max-w-[400px] font-normal">
          The week&apos;s best stories, handpicked by our editors, in your inbox
          every Tuesday and Friday.
        </p>
      </div>
      <div className="max-w-[400px] w-full mx-auto">
        <form
          className="flex justify-between items-center gap-1 p-1 pl-5 rounded-[100px] bg-white"
          aria-label="Newsletter Form"
        >
          <Input
            className="!text-base bg-transparent w-full !outline-none !border-none !shadow-none !ring-transparent"
            placeholder="name@example.com"
            type="email"
            id="newsletter-email"
          />
          <Button
            disabled={false}
            className="bg-[hsl(240_100%_5%)] text-white w-auto rounded-full py-2 px-4 text-sm transition-all hover:opacity-60"
          >
            {false ? "Subscribing" : "Subscribe"}
          </Button>
        </form>
      </div>
    </div>
  );
};
export default JoinNewsletterForm;
