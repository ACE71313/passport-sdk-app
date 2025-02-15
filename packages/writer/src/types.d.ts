import { VerifiableCredential } from "@gitcoinco/passport-sdk-types";
import { Passport, Stamp, DID } from "@gitcoinco/passport-sdk-types";

export type CeramicStamp = {
  provider: string;
  credential: string;
};
export type CeramicPassport = {
  issuanceDate: string;
  expiryDate: string;
  stamps: CeramicStamp[];
};

export type ModelTypes = {
  schemas: {
    Passport: CeramicPassport;
    VerifiableCredential: VerifiableCredential;
  };
  definitions: {
    Passport: "Passport";
    VerifiableCredential: "VerifiableCredential";
  };
  tiles: Record<string, string>;
};

// Class used as a base for each DataStorage Type
// Implementations should enforce 1 Passport <-> 1 user
//  and it is assumed which Passport/user to act on when
//  calling createPassport, getPassport, addStamp
export abstract class DataStorageBase {
  abstract createPassport(): Promise<DID>;
  abstract getPassport(): Promise<Passport | undefined>;
  abstract addStamp(stamp: Stamp): Promise<void>;
}
