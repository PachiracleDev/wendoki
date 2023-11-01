import { GoogleSpreadsheet } from "google-spreadsheet";

const doc = new GoogleSpreadsheet(process.env.DOC_ID_GOOGLESHEET);

export async function DocumentGoogleSheet() {
	await doc.useServiceAccountAuth({
		client_email: `${process.env.CLIENT_EMAIL_GOOGLESHEET}`
			.split(String.raw`\n`)
			.join("\n"),
		private_key: `${process.env.PRIVATE_KEY_GOOGLESHEET}`
			.split(String.raw`\n`)
			.join("\n"),
	});

	await doc.loadInfo();
	return doc;
}
