export interface providers {
  readonly email: emailProviders
}

export interface emailProviders {
  readonly callbackUrl: string
  readonly id: string
  readonly name: string
  readonly signinUrl: string
  readonly type: string
}