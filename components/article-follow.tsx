"use client";

import { Button, buttonVariants } from "@/components/ui/button";
import { Icons } from "./icons";
import { siteConfig } from "@/config";

const ArticleFollow = () => {
	return (
		<section className="flex flex-col gap-4">
			<p className="text-xs font-medium uppercase font-azeret-mono">Follow us :</p>

			<section className="flex gap-2">
				{/* <a href="https://www.google.com/preferences/source?q=afiatv.net" target="_blank" rel="noopener noreferrer" className={buttonVariants({ variant: "outline", size: "lg" })}>
					<svg
						stroke="currentColor"
						fill="currentColor"
						strokeWidth="0"
						version="1.1"
						x="0px"
						y="0px"
						viewBox="0 0 48 48"
						enableBackground="new 0 0 48 48"
						className="h-5 w-5"
						height="1em"
						width="1em"
						xmlns="http://www.w3.org/2000/svg">
						<path
							fill="#FFC107"
							d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12
	c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24
	c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"></path>
						<path
							fill="#FF3D00"
							d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657
	C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"></path>
						<path
							fill="#4CAF50"
							d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36
	c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"></path>
						<path
							fill="#1976D2"
							d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571
	c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"></path>
					</svg>{" "}
					Google
				</a> */}

				<a href={siteConfig.links.whatsapp} target="_blank" rel="noopener noreferrer" className={buttonVariants({ variant: "outline", size: "lg" })}>
					<svg xmlns="http://www.w3.org/2000/svg" width="23" height="23" viewBox="0 0 720 720">
						<path
							fill="#25d366"
							d="M360,0C161.18,0,0,161.18,0,360c0,65.41,17.45,126.75,47.94,179.61L0,720l187.02-44.21c51.34,28.18,110.28,44.21,172.98,44.21,198.82,0,360-161.18,360-360S558.82,0,360,0ZM360,655.52c-60.17,0-116.13-17.98-162.82-48.87l-110.49,28.14,30.99-105.61c-33.53-47.93-53.2-106.26-53.2-169.19,0-163.21,132.31-295.52,295.52-295.52s295.52,132.31,295.52,295.52-132.31,295.52-295.52,295.52Z"
						/>
						<path
							fill="#25d366"
							d="M444.35,407.52l87.1,41.06c4,1.88,6.56,5.94,6.2,10.34-.94,11.46-5.54,34.43-26.13,55.02-58.12,58.12-162.49-7.64-166.74-10.18-25.67-13.79-50.06-32.24-73.19-55.36-23.12-23.12-41.58-47.52-55.37-73.19-2.55-4.24-68.31-108.61-10.18-166.74,20.59-20.59,43.56-25.19,55.02-26.13,4.41-.36,8.46,2.2,10.34,6.2l41.07,87.1c1.94,4.12,1.09,9.02-2.13,12.24l-30.61,30.61c-6.62,6.62-8.56,16.93-4,25.11,11.17,20.03,26.19,39.32,43.59,57.07,17.75,17.4,37.04,32.43,57.07,43.59,8.18,4.56,18.48,2.62,25.11-4l30.61-30.61c3.22-3.22,8.12-4.08,12.24-2.13Z"
						/>
					</svg>{" "}
					WhatsApp
				</a>
			</section>
		</section>
	);
};

export default ArticleFollow;




