import type { NextApiRequest, NextApiResponse } from "next";
import mailchimp from "@mailchimp/mailchimp_marketing";

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	const { email_address, status } = req.body;

	mailchimp.setConfig({
		apiKey: process.env.NEXT_PUBLIC_API_KEY,
		server: process.env.NEXT_PUBLIC_DATACENTER,
	});
	if (process.env.NEXT_PUBLIC_AUDIENCE_ID){
		try {
			await mailchimp.lists.addListMember(process.env.NEXT_PUBLIC_AUDIENCE_ID.toString(), {
				email_address,
				status,
				tags: ["newsletter"],
			});
		} catch (err) {
			return res.status(400).send("Mailchimp error.")
		}
		res.status(200).json({ email_address, status });
	} else {
		return res.status(400).send("Error parsing mailchimp audience id.");
	}
}
