import { MailIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const ConatctForm = () => {
  return (
    <section className="px-6 md:px-10 lg:px-12 py-[58px]">
      <div className="flex flex-col items-center justify-center gap-[58px]">
        {/* Header Section */}
        <div className="flex flex-col w-full items-center justify-center gap-[18px]">
          <h2
            className="text-pretty text-[2.5rem] leading-[4rem] -tracking-[.053rem] lg:text-[4rem] lg:leading-[5rem] lg:-tracking-[.078rem] text-center font-epilogue font-normal mx-auto
        "
          >
            Ready to Collaborate?
            <br />
            Contact Us Today
          </h2>
        </div>

        {/* Contact Card */}
        <Card className="flex w-full max-w-[1150px] rounded-[32px] overflow-hidden bg-[#ffffff0b] shadow-none border-none">
          <CardContent className="flex flex-col xl:flex-row w-full p-6">
            {/* Form Section */}
            <div className="flex flex-col items-center gap-[42px] md:px-4 py-6 flex-1">
              <div className="flex flex-col w-full items-start gap-8">
                {/* Form Fields */}
                <div className="flex flex-col items-start justify-center gap-5 w-full">
                  {/* Name and Email Row */}
                  <div className="flex flex-col md:flex-row items-start gap-7 w-full">
                    <div className="flex flex-col w-full items-start gap-[11px]">
                      <label className="font-epilogue font-medium text-primary text-[13.6px] tracking-[-0.14px] leading-[16.8px]">
                        Full Name
                      </label>

                      <div className="relative w-full">
                        <Input
                          className="h-11 shadow-none border-0 border-b border-[#75757552] focus-visible:ring-0 focus-visible:border-white transition-all rounded-none px-0 py-3 text-muted-foreground placeholder:text-muted-foreground "
                          placeholder="John Doe"
                        />
                      </div>
                    </div>

                    <div className="flex flex-col w-full items-start gap-[11px]">
                      <label className="font-epilogue font-medium text-primary text-[13.1px] tracking-[-0.14px] leading-[16.8px]">
                        Email Address
                      </label>

                      <div className="relative w-full">
                        <Input
                          className="h-11 shadow-none border-0 border-b border-[#75757552] focus-visible:ring-0 focus-visible:border-white transition-all rounded-none px-0 py-3 font-epilogue text-muted-foreground placeholder:text-muted-foreground "
                          placeholder="m@example.com"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Subject Row */}
                  <div className="flex flex-col w-full items-start gap-[11px]">
                    <label className="font-epilogue font-medium text-primary text-[13.1px] tracking-[-0.14px] leading-[16.8px]">
                      Subject
                    </label>

                    <div className="relative w-full">
                      <Input
                        className="h-11 w-full shadow-none border-0 border-b border-[#75757552] focus-visible:ring-0 focus-visible:border-white transition-all rounded-none px-0 py-3 font-epilogue text-muted-foreground placeholder:text-muted-foreground "
                        placeholder="I would like to..."
                      />
                    </div>
                  </div>

                  {/* Message Textarea */}
                  <div className="flex flex-col w-full items-start gap-[10.99px]">
                    <label className="font-epilogue font-medium text-primary text-[13.1px] tracking-[-0.14px] leading-[16.8px]">
                      Message
                    </label>
                    <Textarea
                      className="min-h-[120px] shadow-none border-0 border-b border-[#75757552] focus-visible:ring-0 focus-visible:border-white transition-all rounded-none px-0 py-3 placeholder:text-muted-foreground text-muted-foreground resize-none"
                      placeholder="Please provide a detailed description of your request"
                    />
                  </div>

                  {/* Submit Button */}
                  <Button className="h-12 px-6 py-0 bg-brand rounded-[1000px] text-primary">
                    Submit your request
                  </Button>
                </div>
              </div>

              {/* Contact Info */}
              <div className="flex flex-col w-full items-start gap-[18px]">
                <p className="w-[300px] text-sm font-dm-sans text-muted-foreground ">
                  For same-day reservations or special <br />
                  requests, feel free to give us a message!
                </p>

                <div className="flex items-center gap-2.5">
                  <div className="flex w-8 h-8 items-center justify-center bg-brand rounded-[1000px] overflow-hidden">
                    <MailIcon className="w-[15px] h-[15px] text-white" />
                  </div>

                  <p className="font-epilogue font-medium text-primary text-[17.7px] tracking-[-0.72px] leading-[27px]">
                    business@afiatv.net
                  </p>
                </div>
              </div>
            </div>

            {/* Image Preview Section */}
            <div className="relative xl:w-2/6 rounded-[22px] overflow-hidden">
              <div className="relative w-full h-[614px]">
                <div className="absolute inset-0 bg-[url(/images/contact-img.png)] bg-cover bg-center" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default ConatctForm;
