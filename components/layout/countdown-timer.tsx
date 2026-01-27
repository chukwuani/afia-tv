"use client";

import React from "react";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

import Countdown from "react-countdown";
import dayjs from "dayjs";

const renderer = ({
	days,
	hours,
	minutes,
	seconds,
	completed,
}: {
	days: number;
	hours: number;
	minutes: number;
	seconds: number;
	completed: boolean;
}) => {
	if (completed) {
		return <p>Completed!</p>;
	} else {
		return (
			<Card className="w-full fixed top-0 left-0 bg-background flex flex-col gap-8 justify-center overflow-hidden border-0 shadow-none p-6 lg:p-14 lg:py-8 rounded-none">
				

				<CardContent className="flex items-center justify-center gap-6 lg:gap-8 w-full px-0">
					<DigitUnit
						number={days}
						unit="day"
					/>
					<DigitUnit
						number={hours}
						unit="hour"
					/>
					<DigitUnit
						number={minutes}
						unit="minute"
					/>
					<DigitUnit
						number={seconds}
						unit="second"
					/>
				</CardContent>
			</Card>
		);
	}
};

function CountdownTimer() {
	const countFromDate = dayjs("2026-02-17").toDate();

	return (
		<Countdown
			date={countFromDate}
			renderer={renderer}
		/>
	);
}

export default CountdownTimer;

export const DigitUnit = ({
	number,
	unit,
}: {
	number: number;
	unit: "day" | "hour" | "minute" | "second";
}) => {
	const [num, setNum] = React.useState(0);

	React.useEffect(() => {
		setNum(number);
	}, [number]);

	return (
		<section className="flex flex-col gap-6 items-center max-md:w-full">
			<section className="relative w-full max-md:max-w-[7rem] md:w-[10rem] aspect-square rounded-md shadow-[0px_10px_0px_0px_rgba(15,15,17,1)] bg-muted text-[1.7rem] sm:text-[2.25rem] md:text-[4.5rem] fcc__digit_block flex items-center justify-center text-center">
				<p>{num?.toString().padStart(2, "0")}</p>
			</section>

			<p className="uppercase text-xs sm:text-sm text-muted-foreground font-bold tracking-widest w-fit">
				{unit + "s"}
			</p>
		</section>
	);
};
