const client_id = "Ov23li0Xs3giaZ1IJ4VU";
const client_secret = process.env.GITHUB_CLIENT_SECRET;

exports.handler = async (event: any) => {
  // Parse the code from query string
  let code = event.queryStringParameters?.code;
  
  // Also check URL parameters in case they come through differently
  if (!code && event.rawUrl) {
    const url = new URL(event.rawUrl);
    code = url.searchParams.get("code");
  }

  if (!code) {
    console.error("No code found in request", event.queryStringParameters);
    return {
      statusCode: 400,
      body: JSON.stringify({ error: "No authorization code provided" }),
    };
  }

  if (!client_secret) {
    console.error("Missing GITHUB_CLIENT_SECRET environment variable");
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Missing GITHUB_CLIENT_SECRET" }),
    };
  }

  try {
    console.log("Exchanging code for token...");
    
    // Exchange code for access token
    const tokenResponse = await fetch(
      "https://github.com/login/oauth/access_token",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          client_id,
          client_secret,
          code,
        }),
      }
    );

    const tokenData: any = await tokenResponse.json();

    if (tokenData.error) {
      console.error("GitHub token error:", tokenData.error);
      return {
        statusCode: 401,
        body: JSON.stringify({ error: tokenData.error }),
      };
    }

    // Get user info
    const userResponse = await fetch("https://api.github.com/user", {
      headers: {
        Authorization: `Bearer ${tokenData.access_token}`,
        Accept: "application/vnd.github.v3+json",
      },
    });

    const userData: any = await userResponse.json();

    // Return auth data in format Decap CMS expects
    return {
      statusCode: 200,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        token: tokenData.access_token,
        provider: "github",
        user: {
          login: userData.login,
          avatar_url: userData.avatar_url,
        },
      }),
    };
  } catch (error) {
    console.error("Auth error:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Authentication failed", details: String(error) }),
    };
  }
};
