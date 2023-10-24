import { nanoid } from "nanoid";

class ResponseError extends Error {
  response: Response;

  constructor(message: string, res: Response) {
    super(message);
    this.response = res;
  }
}

export async function fetchWorkflowService(
  url: string,
  {
    body,
  }: {
    body: Record<string, unknown>;
  }
) {
  const response = await fetch(url, {
    method: "POST",
    body: JSON.stringify(body),
    mode: "cors",
    headers: {
      "X-Request-Id": nanoid(),
      "access-control-request-headers": "content-type",
      "Content-Type": "application/json",
    },
  });
  if (!response.ok) {
    throw new ResponseError("Bad response", response);
  }

  return (await response.json()) as unknown;
}
