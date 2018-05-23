export class Auth {
  protected readonly ClientId = "dfb8f4b1-1962-4e2b-bd83-8e8e09e024fb";
  protected readonly AuthRedirectUrl = process.env.ONENOTE_AUTH_REDIRECT_URI;
  public readonly AuthTokenUrl = "https://login.microsoftonline.com/common/oauth2/token";
  public readonly RefreshTokenUrl = "https://login.microsoftonline.com/common/oauth2/token";
  public readonly GetUserUrl = "https://graph.microsoft.com/v1.0/me";

  public GraphTokenContent(code: string) {
    return this.TokenContent(code, "https://graph.microsoft.com");
  }

  public OneNoteTokenContent(code: string) {
    return this.TokenContent(code, "https://onenote.com/");
  }

  private TokenContent(code: string, resource: string) {
    return {
      grant_type: "authorization_code",
      client_id: this.ClientId,
      code: code,
      redirect_uri: this.AuthRedirectUrl,
      resource: resource,
    };
  }

  public GraphRefreshTokenContent(code: string) {
    return this.RefreshTokenContent(code, "https://graph.microsoft.com");
  }

  public OneNoteRefreshTokenContent(code: string) {
    return this.RefreshTokenContent(code, "https://onenote.com/");
  }

  public RefreshTokenContent(refreshToken: string, resource: string) {
    return {
      grant_type: "refresh_token",
      client_id: this.ClientId,
      redirect_uri: this.AuthRedirectUrl,
      refresh_token: refreshToken,
      resource: resource,
    };
  }

  public existsFilter(guid: string) {
    return {
      guid: guid,
      email: { $exists: true, $ne: null },
      access_token: { $exists: true, $ne: null },
      refresh_token: { $exists: true, $ne: null },
      onenote_token: { $exists: true, $ne: null },
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
