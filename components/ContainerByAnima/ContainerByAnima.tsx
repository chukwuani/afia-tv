import Link from "next/link";
import React from "react";

export const ContainerByAnima = () => {
  // Data for quick links section
  const quickLinks = [
    { title: "About us" },
    { title: "Work" },
    { title: "Services" },
    { title: "How it work" },
    { title: "Contact us" },
    { title: "Error 404" },
  ];

  // Data for contact section
  const contactInfo = [
    { title: "testing@gmail.com" },
    { title: "+123 456 789" },
    { title: "Amsterdem, USA" },
  ];

  // Data for social media section
  const socialMedia = [
    {
      title: "Twitter",
      icon: "/xfq0rd6wvtvcd8sha4hrdqa5r0-svg.svg",
    },
    {
      title: "Linkedin",
      icon: "/zyabjj2o4rwyuvzeyhow7fdsi3c-svg.svg",
    },
    {
      title: "Facebook",
      icon: "/h9gqhyuscgf1vsvn5eywrg5n59a-svg.svg",
    },
  ];

  return (
    <div className="flex flex-col w-full items-start font-inter">
      <footer className="flex flex-col items-center justify-center w-full bg-transparent">
        <div className="flex flex-col w-full items-start gap-11 p-6 sm:p-12 sm:pb-4 bg-imaginative-timing-328979framerappoutrageous-orange">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-10 w-full">
            <div className="flex flex-col items-start gap-4">
              <h3 className="font-medium text-white text-xl tracking-[-0.90px] leading-[33px] font-inter">
                Quick Links
              </h3>

              {quickLinks.map((link, index) => (
                <a
                  key={index}
                  href="#"
                  className="w-full font-medium text-white text-[17.6px] tracking-[-0.72px] leading-[27px] font-inter hover:underline"
                >
                  {link.title}
                </a>
              ))}
            </div>

            {/* Quick Links section */}
            <div className="flex flex-col items-start gap-4">
              <h3 className="font-medium text-white text-xl tracking-[-0.90px] leading-[33px] font-inter">
                Quick Links
              </h3>

              {quickLinks.map((link, index) => (
                <a
                  key={index}
                  href="#"
                  className="w-full font-medium text-white text-[17.6px] tracking-[-0.72px] leading-[27px] font-inter hover:underline"
                >
                  {link.title}
                </a>
              ))}
            </div>

            {/* Contact section */}
            <div className="flex flex-col items-start gap-4">
              <h3 className="font-medium text-white text-xl tracking-[-0.90px] leading-[33px] font-inter">
                Contact
              </h3>

              {contactInfo.map((info, index) => (
                <div key={index} className="w-full">
                  <p className="font-medium text-white text-[17.6px] tracking-[-0.72px] leading-[27px] font-inter">
                    {info.title}
                  </p>
                </div>
              ))}
            </div>

            {/* Contact section */}
            <div className="flex flex-col items-start gap-4">
              <h3 className="font-medium text-white text-xl tracking-[-0.90px] leading-[33px] font-inter">
                Contact
              </h3>

              {contactInfo.map((info, index) => (
                <div key={index} className="w-full">
                  <p className="font-medium text-white text-[17.6px] tracking-[-0.72px] leading-[27px] font-inter">
                    {info.title}
                  </p>
                </div>
              ))}
            </div>

            {/* Follow us section */}
            <div className="flex flex-col items-start gap-4">
              <h3 className="font-medium text-white text-xl tracking-[-0.90px] leading-[33px] font-inter">
                Follow us
              </h3>

              {socialMedia.map((social, index) => (
                <a
                  key={index}
                  href="#"
                  className="flex items-center gap-2 w-full hover:underline"
                >
                  <div className="w-4 h-4">
                    <img
                      className="w-full h-full"
                      alt={social.title}
                      src={social.icon}
                    />
                  </div>
                  <span className="font-medium text-white text-base tracking-[-0.48px] leading-6 font-inter">
                    {social.title}
                  </span>
                </a>
              ))}
            </div>
          </div>

          <div className="container mx-auto py-4 flex flex-col md:flex-row-reverse justify-between">
            <div className="flex flex-col md:flex-row flex-wrap gap-4 text-sm mb-4">
              <Link
                href="#"
                className="font-medium text-white text-[17.6px] tracking-[-0.72px] leading-[27px] font-inter hover:underline"
              >
                Advertise With Us
              </Link>
              <Link
                href="#"
                className="font-medium text-white text-[17.6px] tracking-[-0.72px] leading-[27px] font-inter hover:underline"
              >
                Cookies
              </Link>
              <Link
                href="#"
                className="font-medium text-white text-[17.6px] tracking-[-0.72px] leading-[27px] font-inter hover:underline"
              >
                Terms of Use
              </Link>
              <Link
                href="#"
                className="font-medium text-white text-[17.6px] tracking-[-0.72px] leading-[27px] font-inter hover:underline"
              >
                Privacy
              </Link>
              <Link
                href="#"
                className="font-medium text-white text-[17.6px] tracking-[-0.72px] leading-[27px] font-inter hover:underline"
              >
                Digital Accessibility
              </Link>
              <Link
                href="#"
                className="font-medium text-white text-[17.6px] tracking-[-0.72px] leading-[27px] font-inter hover:underline"
              >
                Site Feedback
              </Link>
            </div>

            <p className="font-medium text-white text-[17.6px] tracking-[-0.72px] leading-[27px] font-inter hover:underline">
              © 2025 Afia. All rights reserved
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};
