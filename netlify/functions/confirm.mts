export const handler = async (event: any) => {
    console.log("Webhook payload:", event.body);
    return { statusCode: 200 };
  };
  