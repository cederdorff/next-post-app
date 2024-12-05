import { updateSession } from "./app/auth";

export async function middleware(request) {
  return await updateSession(request);
}
