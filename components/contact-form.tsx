import { MailIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const ConatctForm = () => {
  return (
    <section className="flex items-center justify-center py-[58px] w-full">
      <div className="flex flex-col max-w-[1200px] items-center justify-center gap-[58px] px-[25px]">
        {/* Header Section */}
        <div className="flex flex-col max-w-[650px] w-full items-center justify-center gap-[18px]">
          <div className="flex flex-col w-full items-center">
            <h1 className="text-4xl sm:text-5xl text-pretty font-garamond font-normal tracking-tight text-primary text-center">
              Ready to Collaborate? Contact Us Today
            </h1>
          </div>
        </div>

        {/* Contact Card */}
        <Card className="flex w-full max-w-[1150px] rounded-[32px] overflow-hidden bg-[#ffffff0b] shadow-none border-none">
          <CardContent className="flex flex-col md:flex-row w-full p-6">
            {/* Form Section */}
            <div className="flex flex-col items-center gap-[42px] pl-4 py-6 pr-[50px] flex-1">
              <div className="flex flex-col w-full max-w-[667.33px] items-start gap-8">
                {/* Form Fields */}
                <div className="flex flex-col items-start justify-center gap-5 w-full">
                  {/* Name and Email Row */}
                  <div className="flex flex-col md:flex-row items-start justify-center gap-7 w-full">
                    <div className="flex flex-col w-full md:w-[319.66px] items-start gap-[11px]">
                      <label className="[font-family:'Inter',Helvetica] font-medium text-primary text-[13.6px] tracking-[-0.14px] leading-[16.8px]">
                        Full Name
                      </label>

                      <div className="relative w-full">
                        <Input
                          className="h-11 shadow-none border-0 border-b border-[#75757552] focus-visible:ring-0 focus-visible:border-white transition-all rounded-none px-0 py-3 text-imaginative-timing-328979framerappboulder placeholder:text-imaginative-timing-328979framerappboulder"
                          placeholder="John Doe"
                        />
                      </div>
                    </div>

                    <div className="flex flex-col w-full md:w-[319.67px] items-start gap-[11px]">
                      <label className="[font-family:'Inter',Helvetica] font-medium text-primary text-[13.1px] tracking-[-0.14px] leading-[16.8px]">
                        Email Address
                      </label>

                      <div className="relative w-full">
                        <Input
                          className="h-11 shadow-none border-0 border-b border-[#75757552] focus-visible:ring-0 focus-visible:border-white transition-all rounded-none px-0 py-3 font-imaginative-timing-328979-framer-app-semantic-input text-imaginative-timing-328979framerappboulder placeholder:text-imaginative-timing-328979framerappboulder"
                          placeholder="m@example.com"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Subject Row */}
                  <div className="flex flex-col w-full items-start gap-[11px]">
                    <label className="[font-family:'Inter',Helvetica] font-medium text-primary text-[13.1px] tracking-[-0.14px] leading-[16.8px]">
                      Subject
                    </label>

                    <div className="relative w-full">
                      <Input
                        className="h-11 w-full shadow-none border-0 border-b border-[#75757552] focus-visible:ring-0 focus-visible:border-white transition-all rounded-none px-0 py-3 font-imaginative-timing-328979-framer-app-semantic-input text-imaginative-timing-328979framerappboulder placeholder:text-imaginative-timing-328979framerappboulder"
                        placeholder="I would like to..."
                      />
                    </div>
                  </div>

                  {/* Message Textarea */}
                  <div className="flex flex-col w-full items-start gap-[10.99px]">
                    <label className="[font-family:'Inter',Helvetica] font-medium text-primary text-[13.1px] tracking-[-0.14px] leading-[16.8px]">
                      Message
                    </label>
                    <Textarea
                      className="min-h-[120px] shadow-none border-0 border-b border-[#75757552] focus-visible:ring-0 focus-visible:border-white transition-all rounded-none px-0 py-3 placeholder:text-imaginative-timing-328979framerappboulder text-imaginative-timing-328979framerappboulder resize-none"
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
              <div className="flex flex-col w-full max-w-[667.33px] items-start gap-[18px]">
                <p className="w-[300px] font-imaginative-timing-328979-framer-app-semantic-button text-imaginative-timing-328979framerappboulder">
                  For same-day reservations or special <br />
                  requests, feel free to give us a message!
                </p>

                <div className="flex items-center gap-2.5">
                  <div className="flex w-8 h-8 items-center justify-center bg-imaginative-timing-328979framerappoutrageous-orange rounded-[1000px] overflow-hidden">
                    <MailIcon className="w-[15px] h-[15px] text-white" />
                  </div>
                  <span className="[font-family:'Inter',Helvetica] font-medium text-primary text-[17.7px] tracking-[-0.72px] leading-[27px]">
                    business@afiatv.net
                  </span>
                </div>
              </div>
            </div>

            {/* Video Preview Section */}
            <div className="relative w-full md:w-[366.66px] rounded-[22px] overflow-hidden">
              <div className="relative w-full h-[614px]">
                <div className="absolute inset-0 bg-[url(/3yszehmv3xnlgln29d9y6akho-mp4.png)] bg-cover bg-center" />

                <div className="absolute bottom-[50px] left-6">
                  <div className="flex items-center gap-[3px] pl-2 pr-[15px] py-[7px] bg-imaginative-timing-328979framerappwhite-7 rounded-[1000px] backdrop-blur-[12.5px]">
                    <img
                      className="w-[18px] h-4"
                      alt="Pause icon"
                      src="/svg-10.svg"
                    />
                    <span className="[font-family:'Inter',Helvetica] font-medium text-white text-[13.6px] tracking-[-0.14px] leading-[16.8px]">
                      Pause
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default ConatctForm;
