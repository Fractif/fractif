import type { NextApiRequest, NextApiResponse } from "next";
import mailchimp from "@mailchimp/mailchimp_marketing";

type Data = {
	email_address: string;
	status: string;
};

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse<Data>
) {
	const { email_address, status } = req.body;

	mailchimp.setConfig({
		apiKey: process.env.NEXT_PUBLIC_API_KEY,
		server: process.env.NEXT_PUBLIC_DATACENTER,
	});

	try {
		await mailchimp.lists.addListMember("acf1d97c25", {
			email_address,
			status,
			tags: ["newsletter"],
		});
	} catch (err : any) {
		return res.status(400).send(err);
	}
	res.status(200).json({ email_address, status });
}
