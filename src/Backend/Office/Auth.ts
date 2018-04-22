export class Auth {
  protected readonly ClientId = "dfb8f4b1-1962-4e2b-bd83-8e8e09e024fb";
  protected readonly AuthRedirectUrl = process.env.ONENOTE_AUTH_REDIRECT_URI;
  public readonly AuthTokenUrl = "https://login.microsoftonline.com/common/oauth2/token";
  public readonly RefreshTokenUrl = "https://login.microsoftonline.com/common/oauth2/token";

  public TokenContent(code: string) {
    return {
      grant_type: "authorization_code",
      client_id: this.ClientId,
      code: code,
      redirect_uri: this.AuthRedirectUrl,
    };
  }

  public RefreshTokenContent(refreshToken: string) {
    return {
      grant_type: "refresh_token",
      client_id: this.ClientId,
      redirect_uri: this.AuthRedirectUrl,
      refresh_token: refreshToken,
    };
  }
  private buildMap(obj) {
    let map = new Map();
    Object.keys(obj).forEach(key => {
      map.set(key, obj[key]);
    });
    return map;
  }
}
