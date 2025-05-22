import { siteConfig } from "@/config";
import { Facebook } from "lucide-react";
import Image from "next/image";

const FooterSection = () => {
  return (
    <section className="bg-brand">
      <footer className="FooterLarge_container__emTx7">
        <div className="FooterLarge_grid__CbGYH grid-cols-1 md:!grid-cols-6 max-md:gap-2">
          <div className="FooterLarge_center__I37pj grid-cols-1 md:grid-cols-5 !col-span-1 md:!col-span-5">
            {siteConfig.footerNav.map((item) => (
              <div key={item.title} className="Links_container__D_Yp5">
                <p className="Links_label__XW3o8">{item.title}</p>

                <div className="Links_content__pYJLB">
                  {item.items.map((link) => (
                    <span key={link.title}>
                      {link.href ? (
                        <a
                          href={link.href}
                          target={link?.external ? "_blank" : undefined}
                          rel={link?.external ? "noreferrer" : undefined}
                          className="Links_item__shUex"
                        >
                          {link.title}
                          <span className="sr-only">{link.title}</span>
                        </a>
                      ) : (
                        <p className="text-sm text-balance text-muted-foreground transition-colors">
                          {link.title}
                        </p>
                      )}
                    </span>
                  ))}
                </div>
              </div>
            ))}

            <div className="Links_container__D_Yp5">
              <p className="Links_label__XW3o8">Resources</p>
              <div className="Links_content__pYJLB">
                <a className="Links_item__shUex" href="/" target="_blank">
                  Advertise with us
                  <span className="sr-only">
                    (opens a different website in new window)
                  </span>
                  <svg
                    className="Links_icon__ySWbY"
                    viewBox="0 0 16 16"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M14 6.5C14 6.63261 13.9473 6.75979 13.8536 6.85355C13.7598 6.94732 13.6326 7 13.5 7C13.3674 7 13.2402 6.94732 13.1464 6.85355C13.0527 6.75979 13 6.63261 13 6.5V3.7075L8.85437 7.85375C8.76055 7.94757 8.63331 8.00028 8.50062 8.00028C8.36794 8.00028 8.2407 7.94757 8.14688 7.85375C8.05305 7.75993 8.00035 7.63268 8.00035 7.5C8.00035 7.36732 8.05305 7.24007 8.14688 7.14625L12.2925 3H9.5C9.36739 3 9.24021 2.94732 9.14645 2.85355C9.05268 2.75979 9 2.63261 9 2.5C9 2.36739 9.05268 2.24021 9.14645 2.14645C9.24021 2.05268 9.36739 2 9.5 2H13.5C13.6326 2 13.7598 2.05268 13.8536 2.14645C13.9473 2.24021 14 2.36739 14 2.5V6.5ZM11.5 8C11.3674 8 11.2402 8.05268 11.1464 8.14645C11.0527 8.24021 11 8.36739 11 8.5V13H3V5H7.5C7.63261 5 7.75979 4.94732 7.85355 4.85355C7.94732 4.75979 8 4.63261 8 4.5C8 4.36739 7.94732 4.24021 7.85355 4.14645C7.75979 4.05268 7.63261 4 7.5 4H3C2.73478 4 2.48043 4.10536 2.29289 4.29289C2.10536 4.48043 2 4.73478 2 5V13C2 13.2652 2.10536 13.5196 2.29289 13.7071C2.48043 13.8946 2.73478 14 3 14H11C11.2652 14 11.5196 13.8946 11.7071 13.7071C11.8946 13.5196 12 13.2652 12 13V8.5C12 8.36739 11.9473 8.24021 11.8536 8.14645C11.7598 8.05268 11.6326 8 11.5 8Z"
                      fill="currentcolor"
                    ></path>
                  </svg>
                </a>

                <a className="Links_item__shUex" href="/" target="_blank">
                  Site Feedback
                  <span className="sr-only">
                    (opens a different website in new window)
                  </span>
                  <svg
                    className="Links_icon__ySWbY"
                    viewBox="0 0 16 16"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M14 6.5C14 6.63261 13.9473 6.75979 13.8536 6.85355C13.7598 6.94732 13.6326 7 13.5 7C13.3674 7 13.2402 6.94732 13.1464 6.85355C13.0527 6.75979 13 6.63261 13 6.5V3.7075L8.85437 7.85375C8.76055 7.94757 8.63331 8.00028 8.50062 8.00028C8.36794 8.00028 8.2407 7.94757 8.14688 7.85375C8.05305 7.75993 8.00035 7.63268 8.00035 7.5C8.00035 7.36732 8.05305 7.24007 8.14688 7.14625L12.2925 3H9.5C9.36739 3 9.24021 2.94732 9.14645 2.85355C9.05268 2.75979 9 2.63261 9 2.5C9 2.36739 9.05268 2.24021 9.14645 2.14645C9.24021 2.05268 9.36739 2 9.5 2H13.5C13.6326 2 13.7598 2.05268 13.8536 2.14645C13.9473 2.24021 14 2.36739 14 2.5V6.5ZM11.5 8C11.3674 8 11.2402 8.05268 11.1464 8.14645C11.0527 8.24021 11 8.36739 11 8.5V13H3V5H7.5C7.63261 5 7.75979 4.94732 7.85355 4.85355C7.94732 4.75979 8 4.63261 8 4.5C8 4.36739 7.94732 4.24021 7.85355 4.14645C7.75979 4.05268 7.63261 4 7.5 4H3C2.73478 4 2.48043 4.10536 2.29289 4.29289C2.10536 4.48043 2 4.73478 2 5V13C2 13.2652 2.10536 13.5196 2.29289 13.7071C2.48043 13.8946 2.73478 14 3 14H11C11.2652 14 11.5196 13.8946 11.7071 13.7071C11.8946 13.5196 12 13.2652 12 13V8.5C12 8.36739 11.9473 8.24021 11.8536 8.14645C11.7598 8.05268 11.6326 8 11.5 8Z"
                      fill="currentcolor"
                    ></path>
                  </svg>
                </a>

                <a className="Links_item__shUex" href="/cookies">
                  Cookies
                </a>

                <a className="Links_item__shUex" href="/tou">
                  Terms of Use
                </a>

                <a className="Links_item__shUex" href="/privacy">
                  Privacy
                </a>
              </div>
            </div>
          </div>

          <div className="FooterLarge_right__Tsov5 md:!col-span-1">
            <div className="">
              <p className="Follow_heading__8r7JP">Follow us</p>
              <div className="Follow_buttons__wm2FF">
                <a
                  className="Follow_button__5rd4x"
                  href={siteConfig.links.x}
                  target="_blank"
                >
                  <span className="sr-only">
                    Follow Origin on X (opens in new window)
                  </span>
                  <svg
                    className="Follow_icon__XNozr Follow_x__CI_E0"
                    viewBox="0 0 20 18"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="m11.93 7.58 6.85-7.4h-2.03l-5.73 6.19L6.43.23 6.39.17H.5l7.26 9.71-7.35 7.94h2.03l6.23-6.73 4.99 6.67.04.06h5.89L11.93 7.58zM5.64 1.67l10.97 14.66h-2.16L3.48 1.67h2.16z"
                      fill="currentcolor"
                    ></path>
                  </svg>
                </a>

                <a
                  className="Follow_button__5rd4x"
                  href={siteConfig.links.linkedin}
                  target="_blank"
                >
                  <span className="sr-only">
                    Follow Afia on LinkedIn (opens in new window)
                  </span>
                  <svg
                    className="Follow_icon__XNozr Follow_linkedin__SV9zB"
                    viewBox="0 0 18 18"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      clipRule="evenodd"
                      d="M.32 6.02h3.82v11.49H.32zM2.25.48C.94.48.09 1.34.09 2.47c0 1.1.83 1.99 2.11 1.99h.02c1.33 0 2.16-.88 2.16-1.99C4.36 1.34 3.56.48 2.25.48zM13.51 5.75c-2.03 0-2.94 1.12-3.44 1.9v.04h-.03c.01-.01.02-.03.03-.04V6.02H6.25c.05 1.08 0 11.49 0 11.49h3.82V11.1c0-.34.02-.69.13-.93.28-.69.9-1.4 1.96-1.4 1.38 0 1.94 1.05 1.94 2.6v6.15h3.82v-6.59c-.01-3.53-1.89-5.18-4.41-5.18z"
                      fillRule="evenodd"
                      fill="currentcolor"
                    ></path>
                  </svg>
                </a>

                <a
                  className="Follow_button__5rd4x"
                  href={siteConfig.links.instagram}
                  target="_blank"
                >
                  <span className="sr-only">
                    Follow Origin on Instagram (opens in new window)
                  </span>
                  <svg
                    className="Follow_icon__XNozr Follow_instagram__0XHpW"
                    viewBox="0 0 26 26"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M13 7c-1.2 0-2.3.4-3.3 1s-1.8 1.6-2.2 2.7c-.5 1.1-.6 2.3-.4 3.5.2 1.2.8 2.2 1.6 3.1.8.8 1.9 1.4 3.1 1.6 1.2.2 2.4.1 3.5-.3 1.1-.5 2-1.2 2.7-2.2s1-2.1 1-3.3c0-1.6-.6-3.1-1.8-4.2C16.1 7.6 14.6 7 13 7zm0 10c-.8 0-1.6-.2-2.2-.7-.7-.4-1.2-1.1-1.5-1.8-.3-.7-.4-1.5-.2-2.3.2-.8.5-1.5 1.1-2 .6-.6 1.3-.9 2-1.1.8-.2 1.6-.1 2.3.2.7.3 1.4.8 1.8 1.5.4.7.7 1.4.7 2.2 0 1.1-.4 2.1-1.2 2.8-.7.8-1.7 1.2-2.8 1.2zm6-17H7C5.1 0 3.4.7 2.1 2.1.7 3.4 0 5.1 0 7v12c0 1.9.7 3.6 2.1 4.9C3.4 25.3 5.1 26 7 26h12c1.9 0 3.6-.7 4.9-2.1 1.3-1.3 2.1-3.1 2.1-4.9V7c0-1.9-.7-3.6-2.1-4.9C22.6.7 20.9 0 19 0zm5 19c0 1.3-.5 2.6-1.5 3.5-.9 1-2.2 1.5-3.5 1.5H7c-1.3 0-2.6-.5-3.5-1.5-1-.9-1.5-2.2-1.5-3.5V7c0-1.3.5-2.6 1.5-3.5C4.4 2.5 5.7 2 7 2h12c1.3 0 2.6.5 3.5 1.5 1 .9 1.5 2.2 1.5 3.5v12zM21 6.5c0 .3-.1.6-.3.8-.2.2-.4.4-.7.6-.2.1-.5.1-.8.1-.3-.1-.6-.2-.8-.4-.2-.2-.4-.5-.4-.8-.1-.3 0-.6.1-.9.1-.3.3-.5.6-.7.2-.1.5-.2.8-.2.4 0 .8.2 1.1.4.2.3.4.7.4 1.1z"
                      fill="currentcolor"
                    ></path>
                  </svg>
                </a>

                <a
                  className="Follow_button__5rd4x"
                  href={siteConfig.links.facebook}
                  target="_blank"
                >
                  <span className="sr-only">
                    Follow Origin on Facebook (opens in new window)
                  </span>
                  <Facebook className="Follow_icon__XNozr Follow_reddit__MsnuJ" />
                </a>

                <a
                  className="Follow_button__5rd4x"
                  href={siteConfig.links.youtube}
                  target="_blank"
                >
                  <span className="sr-only">
                    Subscribe to Afia on YouTube (opens in new window)
                  </span>
                  <svg
                    className="Follow_icon__XNozr Follow_youtube__dy2IG"
                    viewBox="0 0 22 16"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="m13 8.001-3.5 2v-4z"
                      fill="currentcolor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1.5"
                      stroke="currentcolor"
                    ></path>
                    <path
                      d="M1 8.708V7.293c0-2.895 0-4.343.905-5.274S4.236 1.047 7.087.967C8.438.929 9.818.901 10.999.901s2.561.027 3.912.066c2.851.081 4.277.121 5.182 1.052s.905 2.379.905 5.274v1.415c0 2.895 0 4.343-.905 5.274-.906.932-2.331.972-5.182 1.052-1.351.038-2.731.066-3.912.066s-2.561-.027-3.912-.066c-2.851-.081-4.277-.121-5.182-1.052S1 11.603 1 8.708Z"
                      fill="none"
                      strokeWidth="1.5"
                      stroke="currentcolor"
                    ></path>
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>

        <a className="Lockup_container__nF3YQ !h-auto" href="/">
          <Image
            className="w-[100px] max-w-none"
            width={100}
            height={40}
            src="/images/afia_logo.svg"
            alt="Afia Logo"
          />

          <span className="sr-only">Afia</span>
        </a>

        <div className="">
          <div className="Legal_copy__W5POK">
            <p>Copyright 2025 © Afia media.</p>
          </div>
        </div>
      </footer>
    </section>
  );
};

export default FooterSection;
