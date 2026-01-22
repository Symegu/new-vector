const API_BASE =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3001";

export async function apiFetch(
  endpoint: string,
  options: RequestInit = {},
  retryCount = 0,
) {
  const accessToken = localStorage.getItem("access_token");
  console.log(`apiFetch ${endpoint} token:`, accessToken ? "yes" : "no"); // debug

  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    ...(options?.headers as Record<string, string>),
  };

  if (accessToken) {
    headers["Authorization"] = `Bearer ${accessToken}`;
  }

  let response = await fetch(`${API_BASE}${endpoint}`, {
    ...options,
    credentials: "include", // ← Всегда!
    headers,
  });

  console.log(`${endpoint} status:`, response.status); // debug

  if (response.status === 401 && retryCount < 1) {
    console.log("401 → refresh...");
    try {
      const refreshRes = await fetch(`${API_BASE}/api/admin/auth/refresh`, {
        method: "POST",
        credentials: "include", // refresh по cookies
      });
      console.log("refresh status:", refreshRes.status);

      if (!refreshRes.ok) {
        localStorage.removeItem("access_token");
        throw new Error("Refresh failed");
      }

      const { accessToken: newToken } = await refreshRes.json();
      console.log("new token saved");
      localStorage.setItem("access_token", newToken);

      // Retry С НОВЫМ ТОКеном + credentials
      const retryHeaders = {
        "Content-Type": "application/json",
        ...(options?.headers as Record<string, string>),
        Authorization: `Bearer ${newToken}`,
      };

      console.log("retry...", endpoint);
      response = await fetch(`${API_BASE}${endpoint}`, {
        ...options,
        credentials: "include", // ← КРИТИЧНО!
        headers: retryHeaders,
      });
      console.log(`${endpoint} retry status:`, response.status);
    } catch (refreshError) {
      console.error("Refresh failed:", refreshError);
      localStorage.removeItem("access_token");
      window.location.href = "/admin/login"; // force
      throw new Error("Auth failed");
    }
  }

  if (!response.ok) {
    console.error(`${endpoint} final error:`, response.status);
    throw new Error(`API: ${response.status}`);
  }

  const data = await response.json();
  console.log(`${endpoint} success:`, data);
  return data;
}
