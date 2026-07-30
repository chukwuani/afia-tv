import { sendZeptoMail } from "./zeptomail";

function wrapEmail(bodyHtml: string) {
	return `
	<div style="font-family: Arial, sans-serif; max-width: 560px; margin: 0 auto; color: #111;">
		<h2 style="margin-bottom: 4px;">My Enugu Story</h2>
		${bodyHtml}
		<p style="margin-top: 32px; font-size: 12px; color: #666;">
			This is an automated message — please don't reply directly to this email.
		</p>
	</div>`;
}

export async function sendSubmissionReceivedEmail(
	to: string,
	name: string,
	category: string,
	contestantId: number,
) {
	await sendZeptoMail({
		to,
		toName: name,
		subject: "We've received your entry",
		html: wrapEmail(`
			<p>Hi ${name},</p>
			<p>Thanks for submitting your <strong>${category}</strong> entry to My Enugu Story. Your
			contestant ID is <strong>${contestantId}</strong> — keep this for reference, especially if
			you enter more than one category.</p>
			<p>Our team will review your entry and get back to you.</p>
		`),
	});
}

export async function sendApprovedEmail(
	to: string,
	name: string,
	category: string,
	entryTitle: string,
) {
	await sendZeptoMail({
		to,
		toName: name,
		subject: `Your ${category} entry has been approved`,
		html: wrapEmail(`
			<p>Hi ${name},</p>
			<p>Good news — your entry "<strong>${entryTitle}</strong>" in the <strong>${category}</strong>
			category has been <strong style="color:#15803d;">approved</strong>.</p>
			<p>Thank you for participating, and good luck!</p>
		`),
	});
}

export async function sendRejectedEmail(
	to: string,
	name: string,
	category: string,
	entryTitle: string,
	canResubmit: boolean,
) {
	await sendZeptoMail({
		to,
		toName: name,
		subject: `Update on your ${category} entry`,
		html: wrapEmail(`
			<p>Hi ${name},</p>
			<p>Your entry "<strong>${entryTitle}</strong>" in the <strong>${category}</strong> category
			was not accepted.</p>
			${
				canResubmit
					? `<p>You're welcome to submit one more entry in this category if you'd like to try again.</p>`
					: `<p>You've now used your one resubmission for this category, so no further entries can be accepted here.</p>`
			}
		`),
	});
}

export async function sendDisqualifiedEmail(to: string, name: string) {
	await sendZeptoMail({
		to,
		toName: name,
		subject: "Regarding your competition entry",
		html: wrapEmail(`
			<p>Hi ${name},</p>
			<p>We're writing to let you know that you have been
			<strong style="color:#b91c1c;">disqualified</strong> from the competition and are no longer
			eligible to submit further entries.</p>
			<p>If you believe this is a mistake, please contact the organizing team directly.</p>
		`),
	});
}
