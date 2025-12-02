class Http {
  static async request(url, { method = "GET", token = null, body = null, headers = {} } = {}) {
    const config = { method, headers: { ...headers } };

    if (token) config.headers["Authorization"] = `Bearer ${token}`;
    if (body !== null) {
      config.headers["Content-Type"] = "application/json";
      config.body = JSON.stringify(body);
    }

    const res = await fetch(url, config);

    let data = null;
    try {
      data = await res.json();
    } catch (e) {
      throw new Error(`Respuesta inválida del servidor: ${url}`);
    }

    if (!res.ok) {
      const msg = data?.message || data?.error || JSON.stringify(data);
      throw new Error(msg);
    }

    return data;
  }
}

window.Http = Http;